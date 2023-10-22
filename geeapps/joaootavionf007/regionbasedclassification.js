var Class_list = []
var class_selected = '' 
var vectors = ee.FeatureCollection([])
var img = ee.Image([])
var Segment_classification_CART = ee.Image([])
var AOI = []
var palettes = ['00A600','63C600','E6E600','E9BD3A','ECB176','EFC2B3','0404B4','CC0013','33280D', '6F6F6F']
Map.drawingTools().layers().reset()
Map.drawingTools().setShown(false);
var year = ['2020', '2019', '2018', '2017', '2016'];
var range_ini = {'January' : '01-01',	  
                 'Februray': '02-01',	  
                 'March' : '03-01',	  
                 'April' : '04-01',   
                 'May' : '05-01', 
                 'June' : '06-01', 	  
                 'July' : '07-01', 	  
                 'August' : '08-01', 	  
                 'September' : '09-01',  
                 'October' : '10-01', 
                 'November' : '11-01',
                 'December' : '12-01'};
var range_fin = {'January' : '01-31',	  
                 'Februray': '02-28',	  
                 'March' : '03-31',	  
                 'April' : '04-30',   
                 'May' : '05-31', 
                 'June' : '06-30', 	  
                 'July' : '07-31', 	  
                 'August' : '08-31', 	  
                 'September' : '09-30',  
                 'October' : '10-31', 
                 'November' : '11-30',
                 'December' : '12-31'};
var pnl_main = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px'}	});
var pnl_title = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),style: {width: '590', height: '250px'}});
var selectYearSta = ui.Select({items: year, value: year[0], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}	});	
var selectMonthsSta = ui.Select({items: Object.keys(range_ini), value: Object.keys(range_ini)[0], style: {stretch: 'horizontal'}});
var selectYearEnd = ui.Select({items: year, value: year[0], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}	});	
var selectMonthsEnd = ui.Select({items: Object.keys(range_fin), value: Object.keys(range_fin)[0], style: {stretch: 'horizontal'}});
var btn_visual = ui.Button({label:'Visualize Sentinel2 RGB',	  
                           onClick: function(){
                             Map.clear();
                             var string = txb_AOI.getValue(); 
                             AOI = ee.Geometry(ee.Deserializer.fromJSON(string)); 
                             var startDate = ee.Date(selectYearSta.getValue() + "-" + range_ini[selectMonthsSta.getValue()])
                             var endDate = ee.Date(selectYearEnd.getValue() + "-" + range_fin[selectMonthsEnd.getValue()])
                             var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI).filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1)
                             img = ee.Image(S2.median()).clip(AOI);
                             Map.addLayer(img, {min:0,max:2000,bands:"B4,B3,B2"}," Sentinel 2 True Color");
                             Map.centerObject(AOI);
                             Map.drawingTools().setShown(false);
                           },	    
                          style: {padding:'0px 5px',stretch: 'horizontal'}	
});
var btn_segmentar = ui.Button({label:'Run Segmentation',	  
                           onClick: function(){
                             while (Map.layers().length() > 1) {
                              var layer = Map.layers().get(1);
                              Map.layers().remove(layer);
                           }
                             img = img.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B11','B12'])
                             var bands = ['B2', 'B3', 'B4', 'B8'];
                             var img_segment = img.select(bands).float();
                             var seed = 30
                             if (txb_seg.getValue() !== '' && txb_seg.getValue() !== null && txb_seg.getValue() !== undefined){
                              seed = parseInt(txb_seg.getValue())
                             }
                             var seeds = ee.Algorithms.Image.Segmentation.seedGrid(seed);
                             var snic = ee.Algorithms.Image.Segmentation.SNIC({
                              image: img_segment, 
                              compactness: 0,
                              connectivity: 4,
                              neighborhoodSize: 128,
                              size: 10,
                              seeds: seeds
                             })
                           var clusters_snic = snic.select("clusters")
                           vectors = clusters_snic.reduceToVectors({
                            geometryType: 'polygon',
                            reducer: ee.Reducer.countEvery(),
                            scale: 10,
                            maxPixels: 1e10,
                            geometry: AOI,
                           });
                           var empty = ee.Image().byte();
                           var outline = empty.paint({
                            featureCollection: vectors,
                            color: 1,
                            width: 1
                           });
                           Map.addLayer(outline, {palette: 'FF0000'}, 'SNIC Segmentation')
                           txb_AOI.setValue('')
                           },	    
                          style: {padding:'0px 5px',stretch: 'horizontal'}	
});
var btn_classificar = ui.Button({label:'Run Classification',	  
                           onClick: function(){
                             var train_points = ee.FeatureCollection([])
                             for (var i=0; i < Map.drawingTools().layers().length(); i++) {
                                var layer =  Map.drawingTools().layers().get(i).getEeObject() 
                                layer = ee.Feature(layer).set('Class',i)
                                var feature = ee.FeatureCollection(layer)
                                train_points = train_points.merge(feature)
                             }
                            var train_polys = vectors.map(function(feat){
                            feat = ee.Feature(feat);
                            var point = feat.geometry();
                            var mappedPolys = train_points.map(function(poly){
                              var cls = poly.get("Class")
                              var intersects = poly.intersects(point, ee.ErrorMargin(1));
                              var property = ee.String(ee.Algorithms.If(intersects, 'TRUE', 'FALSE'));
                              return feat.set('belongsTo',  property).set('Class', cls);
                            });
                            return mappedPolys;
                            }).flatten().filter(ee.Filter.neq('belongsTo', 'FALSE')); 
                            var TrainingImage = img.clip(train_polys)
                            var Trainbands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B11','B12'];
                            var TrainingImage = TrainingImage.select(Trainbands).float();
                            var predictionBands = TrainingImage.bandNames();
                            var classifierTraining = TrainingImage.select(predictionBands).sampleRegions({collection: train_polys, properties: ['Class'], scale: 20 });
                            var CART = ee.Classifier.smileCart().train({features:classifierTraining, classProperty:'Class', inputProperties: predictionBands});
                            var predicts = vectors.map(function(feat){
                              feat = ee.Feature(feat);
                              var predictImage = img.clip(feat)
                              var classified_CART = predictImage.select(predictionBands).classify(CART);
                              var mode = ee.Number(classified_CART.reduceRegion({
                                reducer: ee.Reducer.mode(),
                                geometry: feat.geometry(),
                                scale: 20,
                                maxPixels: 1e10
                              }).values().get(0));
                              return feat.set('Pred',  mode);
                            })
                            Segment_classification_CART = predicts
                              .filter(ee.Filter.notNull(['Pred']))
                              .reduceToImage({
                                properties: ['Pred'],
                                reducer: ee.Reducer.first()
                            });  
                            Map.addLayer(Segment_classification_CART,{min: 0, max: Class_list.length,palette: palettes},"Segment_CART"); 
                            Map.drawingTools().layers().forEach(function(layer) {
                              layer.setShown(false);
                            });
                            pnl_main.add(ui.Panel([btn_export, urlLabel],ui.Panel.Layout.flow('horizontal')));
                           },	    
                          style: {padding:'0px 5px',stretch: 'horizontal'}	
});
var btn_addClass = ui.Button({label:'Add Class',	  
                           onClick: function(){
                             Class_list.push(txb_Class.getValue());
                             txb_Class.setValue("")
                             Map.drawingTools().setDrawModes(['point']);
                             Map.drawingTools().addLayer([]);
                             Map.drawingTools().setShape('point');
                             Map.drawingTools().setShown(false);
                             Map.drawingTools().stop() 
                           },	    
                          style: {padding:'0px 5px'}	
});
var btn_finalz = ui.Button({label:'Finalize',	  
                           onClick: function(){
                            var slt_Class = ui.Select({items: Class_list,	  
                              value: Class_list[0],	  
                              style:{padding: '0px 0px 0px 10px', 
                              stretch: 'horizontal'},
                            onChange: function(){
                              Map.drawingTools().draw();
                              class_selected = slt_Class.getValue()
                              Map.drawingTools().setSelected(Map.drawingTools().layers().get(Class_list.indexOf(class_selected)))
                            }  
                            })
                            class_selected = slt_Class.getValue()
                            Map.drawingTools().draw();
                            pnl_main.add(lbl_desc4);
                            pnl_main.add(slt_Class);
                            pnl_main.add(btn_reset);
                            pnl_main.add(lbl_desc5)
                            pnl_main.add(btn_classificar);
                           },	    
                          style: {padding:'0px 5px'}	
});
var btn_reset = ui.Button({label:'Reset Samples',	  
                           onClick: function(){
                          var lay_len = Map.drawingTools().layers().length()
                          for (var i=0; i < lay_len; i++) {
                            var geom_len = Map.drawingTools().layers().get(i).geometries().length()
                            for (var j=0; j < geom_len; j++) {
                              Map.drawingTools().layers().get(i).geometries().remove(Map.drawingTools().layers().get(i).geometries().get(0));
                            }
                          }
                             },	    
                          style: {padding:'0px 5px'}});
var urlLabel = ui.Label('Download', {shown: false}); 
var btn_export = ui.Button({label:'Donwload Image (this can take a few minutes)',	  
                           onClick: function(){
                           var downloadArgs = {
                              name: 'LULC_map',
                              crs: 'EPSG:4326',
                              scale: 20,
                              region: AOI
                           };
                           var url = Segment_classification_CART.getDownloadURL(downloadArgs);
                           urlLabel.setUrl(url);
                           urlLabel.style().set({shown: true});
                             },	    
                          style: {padding:'0px 5px', shown: true} });
var logo_ufms = ee.Image('users/joaootavionf007/logos').visualize({
    bands:  ['b3', 'b2', 'b1'],
    min: 0,
    max: 255
    });
var thumb_ufms = ui.Thumbnail({
    image: logo_ufms,
    params: {
        dimensions: '1024x512',
        format: 'png'
        },
    style: {height: '230px', width: '550px',padding :'5px' , position: 'top-center'}
    });
var mapTitle = ui.Label('Region Based Supervised Classification -    Version 1.0.0');	
mapTitle.style().set('color', 'Red');	
mapTitle.style().set('fontWeight', 'bold');	
mapTitle.style().set({fontSize: '24px',padding: '5px'});
var lbl_devel = ui.Label('Developed by: João Otavio Nascimento Firigato - LASER - Universidade Federal de Mato Grosso do Sul - Três lagoas');	
lbl_devel.style().set({fontSize: '10px',padding: '5px 5px'	, color: 'Blue'});
var lbl_desc1 = ui.Label('1° Step: Add your AOI geometry, Start Date and End Date:');	
lbl_desc1.style().set({fontSize: '16px',padding: '5px 5px'	});
var lbl_descAOI = ui.Label('AOI geojson geometry:');
lbl_descAOI.style().set({padding:'2px 2px',stretch: 'both'})
var txb_AOI = ui.Textbox({placeholder: 'Ex: {"type" : "Polygon","coordinates": [[[-51.2,-20.9],[-51.6,-20.9],[-51.6,-20.7],[-51.7,-20.7],[-51.7,-20.9]]]}'});
txb_AOI.style().set({padding:'2px 2px',stretch: 'both'})
var lbl_Star_date = ui.Label('Start Date:');
lbl_Star_date.style().set({padding:'2px 2px',stretch: 'both'})
var lbl_End_date = ui.Label('End Date:');
lbl_End_date.style().set({padding:'2px 2px',stretch: 'both'})
var txb_seg = ui.Textbox({placeholder: 'Default: 30'});
txb_seg.style().set({padding:'2px 2px', stretch: 'both', width:'100px'})
var lbl_desc2 = ui.Label('2° Step: Add Seed for SNIC Segmentation:');	
lbl_desc2.style().set({fontSize: '16px',padding: '0px 10px'	});
var txb_Class = ui.Textbox({placeholder: 'Ex: Urban'});
txb_Class.style().set({padding:'5px 5px',stretch: 'both'})
var lbl_desc3 = ui.Label('3° Step: Add your Land Use and Land Cover Classes :');
lbl_desc3.style().set({fontSize: '16px',padding: '0px 10px'	});
var lbl_desc4 = ui.Label('4° Step: Collect regions samples for each LULC class');	
lbl_desc4.style().set({fontSize: '16px',padding: '0px 10px'	});
var lbl_desc5 = ui.Label('5° Step: Run Random Forest Classifier');	
lbl_desc5.style().set({fontSize: '16px',padding: '0px 10px'	});
pnl_title.add(thumb_ufms);
pnl_main.add(pnl_title);
pnl_main.add(lbl_devel);
pnl_main.add(mapTitle);
pnl_main.add(lbl_desc1);
pnl_main.add(lbl_descAOI);
pnl_main.add(txb_AOI);
pnl_main.add(lbl_Star_date);
pnl_main.add(ui.Panel([selectYearSta, selectMonthsSta], ui.Panel.Layout.flow('horizontal')));
pnl_main.add(lbl_End_date);
pnl_main.add(ui.Panel([selectYearEnd, selectMonthsEnd], ui.Panel.Layout.flow('horizontal')));
pnl_main.add(btn_visual);
pnl_main.add(lbl_desc2);
pnl_main.add(txb_seg);
pnl_main.add(btn_segmentar);
pnl_main.add(lbl_desc3);
pnl_main.add(txb_Class);
pnl_main.add(ui.Panel([btn_addClass, btn_finalz], ui.Panel.Layout.flow('horizontal')));
ui.root.insert(0, pnl_main);