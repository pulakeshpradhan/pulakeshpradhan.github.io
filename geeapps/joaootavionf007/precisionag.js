var Drone_img = ui.import && ui.import("Drone_img", "image", {
      "id": "users/joaootavionf007/SpaceAGDroneIMG/dron_RGB"
    }) || ee.Image("users/joaootavionf007/SpaceAGDroneIMG/dron_RGB"),
    Drone_NDVI = ui.import && ui.import("Drone_NDVI", "image", {
      "id": "users/joaootavionf007/SpaceAGDroneIMG/dron_NDVI"
    }) || ee.Image("users/joaootavionf007/SpaceAGDroneIMG/dron_NDVI"),
    AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.67780056956035,
                -13.928694632822356
              ],
              [
                -75.67745992901546,
                -13.928931536775085
              ],
              [
                -75.6773419118188,
                -13.928770129712785
              ],
              [
                -75.67722389462214,
                -13.928606119195264
              ],
              [
                -75.67712197067958,
                -13.92849938212925
              ],
              [
                -75.67701200010997,
                -13.928403058393197
              ],
              [
                -75.67639227104499,
                -13.927655493131647
              ],
              [
                -75.67581040961645,
                -13.926950501433286
              ],
              [
                -75.67609606487653,
                -13.926774774490347
              ],
              [
                -75.67635892135999,
                -13.927081971132814
              ],
              [
                -75.67649034960172,
                -13.92724598273231
              ],
              [
                -75.67659763796232,
                -13.92733189352369
              ],
              [
                -75.67676393492124,
                -13.92752454184879
              ],
              [
                -75.67710993988416,
                -13.92791504471772
              ],
              [
                -75.67748276693723,
                -13.928331580383729
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
        [[[-75.67780056956035, -13.928694632822356],
          [-75.67745992901546, -13.928931536775085],
          [-75.6773419118188, -13.928770129712785],
          [-75.67722389462214, -13.928606119195264],
          [-75.67712197067958, -13.92849938212925],
          [-75.67701200010997, -13.928403058393197],
          [-75.67639227104499, -13.927655493131647],
          [-75.67581040961645, -13.926950501433286],
          [-75.67609606487653, -13.926774774490347],
          [-75.67635892135999, -13.927081971132814],
          [-75.67649034960172, -13.92724598273231],
          [-75.67659763796232, -13.92733189352369],
          [-75.67676393492124, -13.92752454184879],
          [-75.67710993988416, -13.92791504471772],
          [-75.67748276693723, -13.928331580383729]]]);
Drone_img  =Drone_img.clip(AOI)
var trueColorVis = {
  min: 0.0,
  max: 255.0, 
  bands:"b1,b2,b3"
};
Map.centerObject(Drone_img);
Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
var VARI = Drone_img.expression('(G - R) / (G + R - B)', {
                                        'R': Drone_img.select('b1'),
                                        'G': Drone_img.select('b2'),
                                        'B': Drone_img.select('b3'),
                                  }).rename('VARI');
var TwoG_R = Drone_img.expression(
    '((2 * G) - (R + B))', {
      'R': Drone_img.select('b1'),
      'G': Drone_img.select('b2'),
      'B': Drone_img.select('b3'),
}).rename('TwoG_R');
var G_perc = Drone_img.expression(
    '( G / (R + G + B))', {
      'R': Drone_img.select('b1'),
      'G': Drone_img.select('b2'),
      'B': Drone_img.select('b3'),
}).rename('G_perc');
var training = TwoG_R.sample({
  scale: 1,
  numPixels: 1000000
});
var wekaKmeans = ee.Clusterer.wekaKMeans(2).train(training);
var result_Kmeans = TwoG_R.cluster(wekaKmeans);
var classes = result_Kmeans.eq(1)
var kernel = ee.Kernel.circle({radius: 2});
var opened = classes
             .focal_min({kernel: kernel, iterations: 2})
             .focal_max({kernel: kernel, iterations: 2});
var kernel2 = ee.Kernel.circle({radius: 1});
var closing = opened
             .focal_max({kernel: kernel2, iterations: 2})
             .focal_min({kernel: kernel2, iterations: 2});
var Mode = opened.focal_mode(5);
var objectId = Mode.eq(1).connectedComponents({
  connectedness: ee.Kernel.plus(1),
  maxSize: 150
});
objectId = objectId.clip(AOI)
var vectors = objectId.reduceToVectors({
  scale: 0.3,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty: 'labels',
  reducer: ee.Reducer.first()
});
var empty = ee.Image().byte();
var outline = empty.paint({
              featureCollection: vectors,
              color: 1,
              width: 2
});
var centroid = vectors.map(function(feat){
  var centroid = feat.geometry().centroid(10);
  return ee.Feature(centroid)
})
var vec_ndvi = vectors.map(function(feat){
  var ndvi = Drone_NDVI.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feat.geometry(),
    scale: 0.079,
    });
  var tworg = TwoG_R.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feat.geometry(),
    scale: 0.079,
    });
  var gperc = G_perc.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feat.geometry(),
    scale: 0.079,
    });
  var area = ee.Number(Drone_img.gt(-1).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: feat.geometry(),
  scale: 0.079,
  maxPixels: 1e10
  }).get('b1')).divide(1000)
  return feat.set('ndvi_mean',ndvi.get('b1')).set('TwoG_R_mean',tworg.get('TwoG_R')).set('G_perc_mean',gperc.get('G_perc')).set('area',area)
})
var pnl_main = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '300px'}});
var Products = {'NDVI' : 0,	  
              'VARI': 1,	  
              'G_percent' : 2,	  
              '2G_R' : 3,
              'Canopy Area Chart': 4,
              'Count Plants': 5,
              'Stats by Plant': 6
}
var lbl_product = ui.Label('Select Products:');	
lbl_product.style().set({fontSize: '16px', fontWeight: 'bold',padding: '5px 5px'	});
var selectProduct = ui.Select({items: Object.keys(Products), placeholder: "Select Item...", 
                                  onChange: function(){
                                  Map.clear();
                                  if (Products[selectProduct.getValue()] == 0){
                                    var NDVI_Params = {min: 0, max: 0.8, palette: ['red', 'yellow', 'green']};
                                    Map.addLayer(Drone_NDVI, NDVI_Params, 'NDVI_drone');   
                                    Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                    var ndvi_chart = ui.Chart.feature
                                                        .byProperty({
                                                          features: vec_ndvi,
                                                          xProperties: 'ndvi_mean',
                                                          seriesProperty: 'labels'
                                                        })
                                                        .setChartType('ColumnChart')
                                                        .setOptions({
                                                          title: 'NDVI Mean by plant',
                                                          hAxis: {
                                                            title: 'ID',
                                                            titleTextStyle: {italic: false, bold: true}
                                                          },
                                                          vAxis: {
                                                            title: 'NDVI',
                                                            titleTextStyle: {italic: false, bold: true}
                                                          }
                                                        });
                                    var painel_chart = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px', height: '300px', position: 'bottom-right'}	});
                                    Map.add(painel_chart);
                                    painel_chart.widgets().set(0, ndvi_chart);
                                  } 
                                  else 
                                  if (Products[selectProduct.getValue()] == 1){
                                    var VARI_Params = {min: 0, max: 0.4, palette: ['red', 'yellow', 'green']};
                                    Map.addLayer(VARI, VARI_Params, 'VARI'); 
                                    Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                  } 
                                  else
                                  if (Products[selectProduct.getValue()] == 2){
                                    var G_perc_Params = {min: 0.2, max: 0.5, palette: ['red', 'yellow', 'green']};
                                    Map.addLayer(G_perc, G_perc_Params, 'G_perc');
                                    Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                    var G_perc_chart = ui.Chart.feature
                                                .byProperty({
                                                  features: vec_ndvi,
                                                  xProperties: 'G_perc_mean',
                                                  seriesProperty: 'labels'
                                                })
                                                .setChartType('ColumnChart')
                                                .setOptions({
                                                  title: 'TwoG_R Mean by plant',
                                                  hAxis: {
                                                    title: 'ID',
                                                    titleTextStyle: {italic: false, bold: true}
                                                  },
                                                  vAxis: {
                                                    title: 'G_perc',
                                                    titleTextStyle: {italic: false, bold: true}
                                                  }
                                                });
                                    var painel_chart = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px', height: '300px', position: 'bottom-right'}	});
                                    Map.add(painel_chart);
                                    painel_chart.widgets().set(0, G_perc_chart);
                                  }
                                  else
                                  if (Products[selectProduct.getValue()] == 3){
                                    var TwoG_R_Params = {min: 0, max: 100, palette: ['red', 'yellow', 'green']};
                                    Map.addLayer(TwoG_R, TwoG_R_Params, 'TwoG_R'); 
                                    Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                    var TwoG_R_chart = ui.Chart.feature
                                                .byProperty({
                                                  features: vec_ndvi,
                                                  xProperties: 'TwoG_R_mean',
                                                  seriesProperty: 'labels'
                                                })
                                                .setChartType('ColumnChart')
                                                .setOptions({
                                                  title: 'TwoG_R Mean by plant',
                                                  hAxis: {
                                                    title: 'ID',
                                                    titleTextStyle: {italic: false, bold: true}
                                                  },
                                                  vAxis: {
                                                    title: 'TwoG_R',
                                                    titleTextStyle: {italic: false, bold: true}
                                                  }
                                                });
                                    var painel_chart = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px', height: '300px', position: 'bottom-right'}	});
                                    Map.add(painel_chart);
                                    painel_chart.widgets().set(0, TwoG_R_chart);
                                  }
                                  else
                                  if (Products[selectProduct.getValue()] == 4){
                                    Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
                                    Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                    var area_chart = ui.Chart.feature
                                          .byProperty({
                                            features: vec_ndvi,
                                            xProperties: 'area',
                                            seriesProperty: 'labels'
                                          })
                                          .setChartType('ColumnChart')
                                          .setOptions({
                                            title: 'Canopy Area by plant',
                                            hAxis: {
                                              title: 'ID',
                                              titleTextStyle: {italic: false, bold: true}
                                            },
                                            vAxis: {
                                              title: 'Area (m²)',
                                              titleTextStyle: {italic: false, bold: true}
                                            }
                                          });
                                    var painel_chart = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '600px', height: '300px', position: 'bottom-right'}	});
                                    Map.add(painel_chart);
                                    painel_chart.widgets().set(0, area_chart); 
                                  }
                                  else
                                  if(Products[selectProduct.getValue()] == 5){
                                    Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
                                    Map.addLayer(centroid,{color:'cyan'}, 'centroid')
                                    var panel_count = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
                                    panel_count.style().set({
                                      width: '200px',
                                      height: '50px',
                                      position: 'top-center',
                                      stretch: 'horizontal'});
                                    var lbl_Title = ui.Label('Plant Count:');
                                    lbl_Title.style().set({fontSize: '20px',padding:'0px 0px',})
                                    panel_count.add(lbl_Title);
                                    var lbl_count = ui.Label(centroid.size().getInfo());
                                    lbl_count.style().set({fontSize: '20px',padding:'0px 0px',})
                                    panel_count.add(lbl_count);
                                    Map.add(panel_count);
                                  }
                                  else
                                  if(Products[selectProduct.getValue()] == 6){
                                    Map.style().set('cursor', 'crosshair');
                                    Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
                                    Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                    var inspector = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '300px', position: 'bottom-right'}	});
                                    var btn = ui.Button({ label: 'Return',
                                          onClick: function(){
                                          Map.clear()
                                          Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
                                          Map.addLayer(outline, {palette: 'blue'}, 'Plant Area');
                                          Map.onClick(function(coords) {
                                          var point = ee.Geometry.Point(coords.lon, coords.lat);
                                         var selected_poly = vectors.map(function(feat){
                                          var intersects = feat.intersects(point, ee.ErrorMargin(1));
                                          var property = ee.String(ee.Algorithms.If(intersects, 'TRUE', 'FALSE'));
                                          return feat.set('belongsTo',  property)
                                           }).filter(ee.Filter.neq('belongsTo', 'FALSE'));
                                           if (selected_poly.size().getInfo() != 0){
                                            Map.clear()
                                            Map.add(inspector);
                                            inspector.widgets().set(0, ui.Label({
                                              value: 'Loading...',
                                              style: {color: 'gray'}
                                            }));
                                            Map.centerObject(selected_poly)
                                            Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
                                            Map.addLayer(selected_poly, {color: 'blue',strokeWidth: 1}, 'selected')  
                                            var ndvi_plant = Drone_NDVI.reduceRegion({
                                              reducer: ee.Reducer.mean(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              });
                                            var tworg_plant = TwoG_R.reduceRegion({
                                              reducer: ee.Reducer.mean(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              });
                                            var gperc_plant = G_perc.reduceRegion({
                                              reducer: ee.Reducer.mean(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              });
                                            var area_plant = ee.Number(Drone_img.gt(-1).reduceRegion({
                                              reducer: ee.Reducer.sum(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              maxPixels: 1e10
                                              }).get('b1')).divide(1000)
                                           var dataTable2 = {
                                            cols: [{id: 'name', label: 'Stats', type: 'string'},
                                                   {id: 'Stats', label: 'Value', type: 'number'}],
                                            rows: [{c: [{v: 'NDVI'}, {v: ndvi_plant.get('b1').getInfo()}]},
                                                   {c: [{v: 'G_percent'}, {v: gperc_plant.get('G_perc').getInfo()}]}]
                                                  };
                                             var options2 = {
                                              title: 'Stats by plant',
                                              vAxis: {title: 'Index'},
                                              legend: {position: 'none'},
                                              hAxis: {
                                                title: 'NDVI/G_percent'
                                              }
                                            };
                                            inspector.widgets().set(0, ui.Label({value: selected_poly.first().get('ID').getInfo()}));
                                            inspector.widgets().set(1, ui.Chart(dataTable2, 'BarChart', options2));
                                           }  
                                    })
                                  }})
                                var evenclick = Map.onClick(function(coords) {
                                 var point = ee.Geometry.Point(coords.lon, coords.lat);
                                 var selected_poly = vectors.map(function(feat){
                                  var intersects = feat.intersects(point, ee.ErrorMargin(1));
                                  var property = ee.String(ee.Algorithms.If(intersects, 'TRUE', 'FALSE'));
                                  return feat.set('belongsTo',  property)
                                   }).filter(ee.Filter.neq('belongsTo', 'FALSE'));
                                   if (selected_poly.size().getInfo() != 0){
                                    Map.add(inspector)
                                    inspector.widgets().set(0, ui.Label({
                                              value: 'Loading...',
                                              style: {color: 'gray'}
                                            })); 
                                    Map.clear()
                                    Map.addLayer(Drone_img, trueColorVis, 'True Color Drone');
                                    Map.addLayer(selected_poly, {color: 'blue',strokeWidth: 1}, 'selected') 
                                    Map.add(inspector)
                                    inspector.widgets().set(0, ui.Label({
                                              value: 'Loading...',
                                              style: {color: 'gray'}
                                            }));
                                   var ndvi_plant = Drone_NDVI.reduceRegion({
                                              reducer: ee.Reducer.mean(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              });
                                            var tworg_plant = TwoG_R.reduceRegion({
                                              reducer: ee.Reducer.mean(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              });
                                            var gperc_plant = G_perc.reduceRegion({
                                              reducer: ee.Reducer.mean(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              });
                                            print(ndvi_plant)    
                                            var area_plant = ee.Number(Drone_img.gt(-1).reduceRegion({
                                              reducer: ee.Reducer.sum(),
                                              geometry: selected_poly,
                                              scale: 0.079,
                                              maxPixels: 1e10
                                              }).get('b1')).divide(1000)
                                           var dataTable = {
                                            cols: [{id: 'name', label: 'Stats', type: 'string'},
                                                   {id: 'Stats', label: 'Value', type: 'number'}],
                                            rows: [{c: [{v: 'NDVI'}, {v: ndvi_plant.get('b1').getInfo()}]},
                                                   {c: [{v: 'G_percent'}, {v: gperc_plant.get('G_perc').getInfo()}]}]
                                                  };
                                            var options = {
                                              title: 'Stats by plant',
                                              vAxis: {title: 'Index'},
                                              legend: {position: 'none'},
                                              hAxis: {
                                                title: 'NDVI/G_percent'
                                              }
                                            };
                                    inspector.widgets().set(0, ui.Label({value: selected_poly.first().get('ID').getInfo()}));
                                    inspector.widgets().set(1, ui.Chart(dataTable, 'BarChart', options));
                                    inspector.widgets().set(2, btn) 
                                   }
                                  });
                                  }
                                  },  
                  style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}});
pnl_main.add(lbl_product);
pnl_main.add(selectProduct);
ui.root.insert(0, pnl_main);