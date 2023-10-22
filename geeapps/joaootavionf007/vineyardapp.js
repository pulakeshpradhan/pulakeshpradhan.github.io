var Geom = ui.import && ui.import("Geom", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                115.99810395705362,
                -31.830719720656873
              ],
              [
                115.99860713179685,
                -31.830710605329603
              ],
              [
                115.99900678094006,
                -31.830710605329603
              ],
              [
                115.99921331103421,
                -31.830711744745557
              ],
              [
                115.99927500184155,
                -31.83069579292089
              ],
              [
                115.99936351473904,
                -31.83069579292089
              ],
              [
                115.9995003073988,
                -31.830715162993343
              ],
              [
                115.99949360187627,
                -31.83053285626805
              ],
              [
                115.99949226077176,
                -31.829923265540252
              ],
              [
                115.99869430358983,
                -31.829927823242876
              ],
              [
                115.99853873546697,
                -31.83007936672692
              ],
              [
                115.9979325562296,
                -31.830708326497657
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[115.99810395705362, -31.830719720656873],
          [115.99860713179685, -31.830710605329603],
          [115.99900678094006, -31.830710605329603],
          [115.99921331103421, -31.830711744745557],
          [115.99927500184155, -31.83069579292089],
          [115.99936351473904, -31.83069579292089],
          [115.9995003073988, -31.830715162993343],
          [115.99949360187627, -31.83053285626805],
          [115.99949226077176, -31.829923265540252],
          [115.99869430358983, -31.829927823242876],
          [115.99853873546697, -31.83007936672692],
          [115.9979325562296, -31.830708326497657]]]);
var Vineyeard = ee.FeatureCollection('users/joaootavionf007/UglyWines/Ugly_Ducklines_Wines_Area')
var Drone_img = ee.Image("users/joaootavionf007/UglyWines/Drone_img");
var Geom = /* color: #d63000 */ee.Geometry.Polygon(
        [[[115.99810395705362, -31.830719720656873],
          [115.99860713179685, -31.830710605329603],
          [115.99900678094006, -31.830710605329603],
          [115.99921331103421, -31.830711744745557],
          [115.99927500184155, -31.83069579292089],
          [115.99936351473904, -31.83069579292089],
          [115.9995003073988, -31.830715162993343],
          [115.99949360187627, -31.83053285626805],
          [115.99949226077176, -31.829923265540252],
          [115.99869430358983, -31.829927823242876],
          [115.99853873546697, -31.83007936672692],
          [115.9979325562296, -31.830708326497657]]]);
var id_list = []
var panel_login = ui.Panel();
panel_login.style().set({
  width: '400px',
  height: '300px',
  position: 'top-center'
});
Map.add(panel_login);
var logo_vine = ee.Image('users/joaootavionf007/UglyWines/Vine').visualize({
    bands:  ['b3', 'b2', 'b1'],
    min: 0,
    max: 255
    });
var thumb_vine = ui.Thumbnail({
    image: logo_vine,
    params: {
        dimensions: '320x320',
        format: 'png'
        },
    style: {height: '150px', width: '150px',position: 'top-center',margin: '0px 0px 0px 120px',}
    });
panel_login.add(thumb_vine);
var txb_username = ui.Textbox({placeholder: 'Username'});
txb_username.style().set({fontSize: '20px',padding:'0px 110px',})
panel_login.add(txb_username);
var txb_password = ui.Textbox({placeholder: 'Password'});
txb_password.style().set({fontSize: '20px',padding:'0px 110px',})
panel_login.add(txb_password);
var pnl_main = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '500px'}});
var pnl_date = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '500px'}});
var Products = {'Sentinel 2 NDVI' : 0,	  
              'NDVI Time Serie': 1,	  
              'CHIRPS Monthly Preciptation' : 2,	  
              'DEM 5 meters' : 3,
              'Chlorophyll Index': 4,
              'Drone Image': 5
}
var S2_MAIN = ee.ImageCollection('COPERNICUS/S2')
                            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 1))
                            .filterBounds(Geom)
var lbl_product = ui.Label('Select Products:');	
lbl_product.style().set({fontSize: '16px', fontWeight: 'bold',padding: '5px 5px'	});
var selectProduct = ui.Select({items: Object.keys(Products), value: Object.keys(Products)[0], 
                                  onChange: function(){
                                  Map.clear();
                                  if (Products[selectProduct.getValue()] == 0){
                                    btn_slc_date_img.style().set({shown: true})
                                    selectMonths_ini.style().set({shown: true})  
                                    selectYear_ini.style().set({shown: true}) 
                                    selectMonths_fim.style().set({shown: true}) 
                                    selectYear_fim.style().set({shown: true}) 
                                  } 
                                  else
                                  if (Products[selectProduct.getValue()] == 1){  
                                    selectMonths_ini.style().set({shown: true})  
                                    selectYear_ini.style().set({shown: true}) 
                                    selectMonths_fim.style().set({shown: true}) 
                                    selectYear_fim.style().set({shown: true}) 
                                    btn_slc_date_img.style().set({shown: false})
                                    select_img.style().set({shown: false})
                                  }
                                  else
                                  if (Products[selectProduct.getValue()] == 2){  
                                    selectMonths_ini.style().set({shown: true})  
                                    selectYear_ini.style().set({shown: true}) 
                                    selectMonths_fim.style().set({shown: true}) 
                                    selectYear_fim.style().set({shown: true}) 
                                    btn_slc_date_img.style().set({shown: false})
                                    select_img.style().set({shown: false})
                                  }
                                  else
                                  if (Products[selectProduct.getValue()] == 3){  
                                    selectMonths_ini.style().set({shown: false})  
                                    selectYear_ini.style().set({shown: false}) 
                                    selectMonths_fim.style().set({shown: false}) 
                                    selectYear_fim.style().set({shown: false}) 
                                    btn_slc_date_img.style().set({shown: false})
                                    select_img.style().set({shown: false})
                                  }
                                  else
                                  if (Products[selectProduct.getValue()] == 4){  
                                    selectMonths_ini.style().set({shown: true})  
                                    selectYear_ini.style().set({shown: true}) 
                                    selectMonths_fim.style().set({shown: true}) 
                                    selectYear_fim.style().set({shown: true}) 
                                    btn_slc_date_img.style().set({shown: true})
                                  }
                                  else
                                  if (Products[selectProduct.getValue()] == 5){  
                                    selectMonths_ini.style().set({shown: false})  
                                    selectYear_ini.style().set({shown: false}) 
                                    selectMonths_fim.style().set({shown: false}) 
                                    selectYear_fim.style().set({shown: false}) 
                                    btn_slc_date_img.style().set({shown: false})
                                    select_img.style().set({shown: false})
                                  }
                                  },  
                                  style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}});
var select_img = ui.Select({items: id_list, value: id_list[0], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}});
select_img.style().set({shown: false})
var years = [ '2020','2019', '2018','2017'];
var months_ini = {'Janeiro' : ['01-01'],	  
                 'Fevereiro': ['02-01'],	  
                 'Março' : ['03-01',],	  
                 'Abril' : ['04-01',],   
                 'Maio' : ['05-01',], 
                 'Junho' : ['06-01',], 	  
                 'Julho' : ['07-01',], 	  
                 'Agosto' : ['08-01',], 	  
                 'Setembro' : ['09-01'],  
                 'Outubro' : ['10-01'], 
                 'Novembro' : ['11-01'],
                 'Dezembro' : ['12-01']};
var months_fim = {'Janeiro' : ['01-31'],	  
                 'Fevereiro': ['02-28'],	  
                 'Março' : ['03-31'],	  
                 'Abril' : ['04-30'],   
                 'Maio' : ['05-31'], 
                 'Junho' : ['06-30'], 	  
                 'Julho' : ['07-31'], 	  
                 'Agosto' : ['08-31'], 	  
                 'Setembro' : ['09-30'],  
                 'Outubro' : ['10-31'], 
                 'Novembro' : ['11-30'],
                 'Dezembro' : ['12-31']};
var selectMonths_ini = ui.Select({items: Object.keys(months_ini), value: Object.keys(months_ini)[0], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}});
var selectYear_ini = ui.Select({items: years, value: years[0], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}	});	
var selectMonths_fim = ui.Select({items: Object.keys(months_fim), value: Object.keys(months_fim)[11], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}});
var selectYear_fim = ui.Select({items: years, value: years[0], style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}	});	
var btn_visual = ui.Button({label:'Run',	  
                           onClick: function(){
                            Map.clear();
                             if (Products[selectProduct.getValue()] == 0){
                               var start_data = select_img.getValue()
                               var end_date = ee.Date(select_img.getValue()).advance(1, 'day').format("yyyy-MM-dd")
                               var date_filter_new = ee.Filter.date(start_data,end_date);
                               var S2_img = S2_MAIN.filter(date_filter_new).first().clip(Geom)
                               var ndvi = S2_img.normalizedDifference(['B8', 'B4']).rename('NDVI')
                               var ndviParams = {min: 0, max: 0.8, palette: ['red', 'yellow', 'green']};
                                Map.addLayer(ndvi, ndviParams, 'ndvi');
                             }
                            if (Products[selectProduct.getValue()] == 1){
                              var date_filter = ee.Filter.date(selectYear_ini.getValue() + '-' + months_ini[selectMonths_ini.getValue()][0] ,selectYear_fim.getValue() + '-' + months_fim[selectMonths_fim.getValue()][0]);
                              var timeseries1 = ee.ImageCollection('COPERNICUS/S2')
                                .filter(date_filter)
                                // Pre-filter to get less cloudy granules.
                                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 1))
                                .filterBounds(Geom)
                              var addNDVI = function(image) {
                              return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI')).copyProperties(image, ['system:time_start']);
                              };
                              // Add NDVI band to image collection
                              timeseries1 = timeseries1.map(addNDVI);                  
                              var NDVI1 = ui.Chart.image.seriesByRegion(timeseries1, Geom,  ee.Reducer.mean(),'NDVI', 10, 'system:time_start').setOptions({
                                        title: 'NDVI Time Series',
                                        vAxis: {title: 'NDVI Time series'},});
                            var painel_NDVI = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px', height: '300px', position: 'bottom-right'}	});
                            Map.add(painel_NDVI);
                            Map.addLayer(Geom,{color: 'red'}, 'Area')
                            painel_NDVI.widgets().set(0, NDVI1);
                            }
                            if (Products[selectProduct.getValue()] == 2){
                              var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                              var startyear = selectYear_ini.getValue(); 
                              var endyear = selectYear_fim.getValue(); 
                              var startdate = ee.Date.fromYMD(startyear, 1, 1);
                              var enddate = ee.Date.fromYMD(endyear + 1, 1, 1);
                              var years = ee.List.sequence(startyear, endyear);
                              var months = ee.List.sequence(1, 12);
                              var monthlyPrecip =  ee.ImageCollection.fromImages(
                                years.map(function (y) {
                                  return months.map(function(m) {
                                    var w = chirps.filter(ee.Filter.calendarRange(y, y, 'year'))
                                                  .filter(ee.Filter.calendarRange(m, m, 'month'))
                                                  .sum();
                                    return w.set('year', y)
                                            .set('month', m)
                                            .set('system:time_start', ee.Date.fromYMD(y, m, 1));
                                  });
                                }).flatten()
                              );
                            var titleY = {
                                            title: 'Monthly precipitation',
                                            hAxis: {title: 'Time'},
                                            vAxis: {title: 'Precipitation (mm)'},
                                          };
                            var chartbyYear = ui.Chart.image.seriesByRegion({
                                              imageCollection: monthlyPrecip, 
                                              regions: Geom,
                                              reducer: ee.Reducer.mean(),
                                              band: 'precipitation',
                                              scale: 1000,
                                              xProperty: 'system:time_start',
                                              seriesProperty: 'SITE'
                                            }).setOptions(titleY)
                                              .setChartType('ColumnChart');
                            var painel_chart = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px', height: '300px', position: 'bottom-right'}	});
                            Map.add(painel_chart);
                            Map.addLayer(Geom,{color: 'red'}, 'Area')
                            painel_chart.widgets().set(0, chartbyYear);
                            }
                            if (Products[selectProduct.getValue()] == 3){
                              var dataset = ee.ImageCollection('AU/GA/AUSTRALIA_5M_DEM');
                              var elevation = dataset.select('elevation');
                              elevation = elevation.mean()
                              var elevation_clip = elevation.clip(Geom)
                              var elevationVis = {
                                min: 14.0,
                                max: 16.0,
                                palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff'],
                              };
                              Map.addLayer(elevation_clip, elevationVis, 'Elevation');
                              var max = ee.Number(elevation.reduceRegion({
                                reducer: ee.Reducer.max(),
                                geometry: Geom,
                                scale: 10,
                                maxPixels: 1e9
                              }).values().get(0));
                              var min = ee.Number(elevation.reduceRegion({
                                reducer: ee.Reducer.min(),
                                geometry: Geom,
                                scale: 10,
                                maxPixels: 1e9
                              }).values().get(0));
                              print(min)
                              print(max)
                              var lines = ee.List.sequence(min, max, 0.5)
                              var contourlines = lines.map(function(line) {
                              var mycontour = elevation
                              .convolve(ee.Kernel.gaussian(5, 3))
                              .subtract(ee.Image.constant(line)).zeroCrossing()
                              .multiply(ee.Image.constant(line)).toFloat();
                              return mycontour.mask(mycontour);
                              })
                              contourlines = ee.ImageCollection(contourlines).mosaic()
                              contourlines = contourlines.clip(Geom)
                              Map.addLayer(contourlines, {min: 14, max: 17, palette:['black']}, 'contours')
                              var elevclass = ee.Image(1).clip(Geom)
                                                    .where(elevation_clip.gt(14).and(elevation_clip.lte(14.5)), 0)
                                                    .where(elevation_clip.gt(14.5).and(elevation_clip.lte(15)), 1)
                                                    .where(elevation_clip.gt(15).and(elevation_clip.lte(15.5)), 2)
                                                    .where(elevation_clip.gt(15.5).and(elevation_clip.lte(16)), 3)
                                                    .where(elevation_clip.gt(16).and(elevation_clip.lte(16.5)), 4)
                                                    .where(elevation_clip.gt(16.5).and(elevation_clip.lte(17)), 5)
                              Map.addLayer(elevclass, {min: 0, max: 5, palette: ['blue','cyan' ,'green','yellow', 'orange', 'red']}, 'zones');
                            }
                            if (Products[selectProduct.getValue()] == 4){
                               var start_data = select_img.getValue()
                               var end_date = ee.Date(select_img.getValue()).advance(1, 'day').format("yyyy-MM-dd")
                               var date_filter_new = ee.Filter.date(start_data,end_date);
                               var S2_img = S2_MAIN.filter(date_filter_new).first().clip(Geom)
                               var ndvi = S2_img.normalizedDifference(['B8', 'B4']).rename('NDVI')  
                               var ndre = S2_img.normalizedDifference(['B8', 'B5']).rename('NDRE');
                               var ccci = ndre.divide(ndvi).rename('CCCI');
                               var ccciParams = {min: 0, max: 0.8, palette: ['red', 'yellow', 'green']};
                               Map.addLayer(ccci, ccciParams, 'ccci');
                               var cvi = S2_img.expression(
                                  '((B8 * B4) / (B3**2))', {
                                    'B8': S2_img.select('B8'),
                                    'B4': S2_img.select('B4'),
                                    'B3': S2_img.select('B3'),
                               }).rename('CVI');
                               var cviParams = {min: 2, max: 3, palette: ['red', 'yellow', 'green']};
                               Map.addLayer(cvi, cviParams, 'cvi');
                            }
                            if (Products[selectProduct.getValue()] == 5){
                              var trueColorVis = {
                                min: 0.0,
                                max: 255.0, 
                                bands:"b1,b2,b3"
                              };
Map.centerObject(Drone_img);
Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');  
                            }
                           },	    
                          style: {padding:'0px 0px 0px 10px',stretch: 'horizontal'}	
});
var btn_slc_date_img = ui.Button({label:'Visualize',	  
                           onClick: function(){
                            var date_filter = ee.Filter.date(selectYear_ini.getValue() + '-' + months_ini[selectMonths_ini.getValue()][0] ,selectYear_fim.getValue() + '-' + months_fim[selectMonths_fim.getValue()][0]);
                            var S2 = S2_MAIN.filter(date_filter)
                                // Pre-filter to get less cloudy granules.
                            print(S2)
                            var imageList = S2.toList(100);
                            id_list = imageList.map(function(item) {
                              return ee.Date(ee.Image(item).get('system:time_start')).format("yyyy-MM-dd")});
                            print(id_list)    
                            id_list = id_list.getInfo();
                            select_img.items().reset(id_list)
                            select_img.setValue(id_list[0])
                            select_img.style().set({shown: true})
                           },	    
                          style: {padding:'0px 0px 0px 10px',stretch: 'horizontal'}	
});
pnl_main.add(lbl_product);
pnl_main.add(selectProduct);
pnl_main.add(pnl_date);
pnl_date.add(ui.Panel([selectYear_ini, selectMonths_ini],ui.Panel.Layout.flow('horizontal')));
pnl_date.add(ui.Panel([selectYear_fim, selectMonths_fim],ui.Panel.Layout.flow('horizontal')));
pnl_date.add(btn_slc_date_img);
pnl_date.add(select_img);
pnl_main.add(btn_visual);
var btn_login = ui.Button({label:'LOGIN',	  
                           onClick: function(){
                             print('Login')
                             Map.clear()
                             ui.root.insert(0, pnl_main);
                             Map.setOptions('SATELLITE');
                             Map.centerObject(Vineyeard)
                             },	    
                          style: {padding:'0px 110px', shown: true} });
panel_login.add(btn_login);