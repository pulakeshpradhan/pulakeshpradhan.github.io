var kayapo = ui.import && ui.import("kayapo", "table", {
      "id": "users/shugh/amazon/Kayapo/KayapoBorder"
    }) || ee.FeatureCollection("users/shugh/amazon/Kayapo/KayapoBorder"),
    complexo = ui.import && ui.import("complexo", "table", {
      "id": "users/shugh/amazon/Kayapo/Merge_Bloco_Kayapo"
    }) || ee.FeatureCollection("users/shugh/amazon/Kayapo/Merge_Bloco_Kayapo"),
    east = ui.import && ui.import("east", "table", {
      "id": "users/shugh/amazon/Kayapo/KayapoEastBorder"
    }) || ee.FeatureCollection("users/shugh/amazon/Kayapo/KayapoEastBorder"),
    west = ui.import && ui.import("west", "table", {
      "id": "users/shugh/amazon/Kayapo/KayapoWestBorder"
    }) || ee.FeatureCollection("users/shugh/amazon/Kayapo/KayapoWestBorder"),
    hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6");
var glad = ee.ImageCollection("projects/glad/alert/UpdResult")
print(glad)
var glad = glad.filterMetadata('system:index', 'contains', 'SA');
var CRS=glad.first().projection().crs()
var SCALE=glad.first().projection().nominalScale().getInfo()
var TRANSFORM=glad.first().projection().getInfo()['transform']
var gladKayapo = glad.map(function(img){
              var img_clip = img.clip(kayapo)//.select('conf18')
              var img_clip2= img_clip.updateMask(img_clip.gte(2))
              return img_clip2
            })
print(gladKayapo)
var visNDVI = {min: 2, max: 3, 
                  palette: ['FFFFFF','011301']};
// Map.addLayer(complexo, {}, "complexo")
var palettes = require('users/gena/packages:palettes')  
var complexo_feat = complexo,
vis_complexo = {"opacity":1,"bands":["constant"],"max":5,"palette":palettes.colorbrewer.Spectral[6]},
empty = ee.Image().byte(),
palette = palettes.colorbrewer.Spectral[6];
var complexo_feat_Layer = empty.paint(complexo_feat, 'mc_numb').paint(complexo_feat, 0, 0).visualize(vis_complexo)
// Map.addLayer(complexo_feat_Layer, {}, 'Kayapo - Features');
// var complexo_raster = complexo.reduceToImage({
//     properties: ['mainclass'],
//     reducer: ee.Reducer.first()
// })
// Map.addLayer(complexo_raster, {palette: palettes.colorbrewer.Spectral[7]}, 'complexo raster')
//var animation = require('users/gena/packages:animation')
//animation.animate(gladKayapo, {vis: visNDVI})
// var gladKayapo18 = gladKayapo.map(function(img){
//               var img_clip = img.select('conf18')
//               var img_clip2= img.updateMask(img_clip.eq(2))
//               return img_clip2
//             })
// var gk2 = gladKayapo18.select('conf18').mosaic()
// var gladKayapo18 = gladKayapo.map(function(img){
//               var img_clip = img.select('conf18')
//               var img_clip2= img.updateMask(img_clip.eq(3))
//               return img_clip2
//             })
// var gk3 = gladKayapo18.select('conf18').mosaic()
// var gladKayapo18 = gladKayapo.map(function(img){
//               var img_clip = img.select('conf18')
//               var img_clip2= img.updateMask(img_clip.eq(3))
//               return img_clip2
//             })
// var gd3 = gladKayapo18.select('alertDate18').mosaic()
// Map.addLayer(gd3, {color:"orange"}, 'date18')
/*
var listOfImages = gladKayapo.toList(gladKayapo18.size());
var img1 = listOfImages.get(16)
print(img1)
// Map.centerObject(kayapo)
Map.addLayer(ee.Image(img1).randomVisualizer(), {}, "gladKayapo18")
// var myCollection = glad.filterMetadata('system:index', 'contains', 'SA');
// print(myCollection)
// TEST IMAGE
var first = ee.Image(listOfImages.get(0)).clip(kayapo).select('conf18')
var first = first.updateMask(first.gte(2))
Map.addLayer(first, {}, 'first')
// get image projection
var proj = first.select([0]).projection()
// get coordinates image
var latlon = ee.Image.pixelLonLat().reproject(proj).clip(kayapo)
var testband = first.addBands(latlon).updateMask(first.gte(2))
Map.addLayer(testband, {}, 'Image')
// put each lon lat in a list
var coords = testband.select(['longitude', 'latitude'])
                .reduceRegion({
  reducer: ee.Reducer.toList(),
  geometry: kayapo,
  scale: 30
})
// get lat & lon
var lat = ee.List(coords.get('latitude'))
var lon = ee.List(coords.get('longitude'))
// zip them. Example: zip([1, 3],[2, 4]) --> [[1, 2], [3,4]]
var point_list = lon.zip(lat)
// Create points
var mp = ee.Geometry.MultiPoint(point_list)
Map.addLayer(mp,{}, 'Points')
*/
//var palettes = require('users/gena/packages:palettes');
var loss = hansen.select('lossyear').clip(kayapo)
// Map.addLayer(loss.randomVisualizer(),{}, 'lossyear')
var lossYr17 = loss.updateMask(loss.eq(17))
//print('lossYr17',lossYr17)
// var loss17 = loss.updateMask(loss.lte(17))
// // var loss17 = loss.updateMask(loss.gt(0))
// // Map.addLayer(loss17.randomVisualizer(), {}, 'loss17')
// var yrList = ee.List.sequence(1,17,1);
// var filteredCol = yrList.map(function(i) {
//     i = ee.Number(i);
//   var filtered = loss.lte(i);
//   var yrLoss = loss.updateMask(filtered)
//   var yrLoss = yrLoss.updateMask(yrLoss.gt(0))
//   return yrLoss
// })
// var images = filteredCol.map(function(img) {
//         return ee.Image(img);
//       });//function to create images from a list
//     //Create an imageCollection from the ltmm images
// var lossIc= ee.ImageCollection.fromImages(images);
// print(images)
// animation.animate(lossIc, {vis: visNDVI, timeStep:300})
/*********************************************************************
 Analysis:
 Sum the number of alerts for the east and west sides for the various years.
 ********************************************************************/
// HELPER: SUM PIXEL VALUES WITHIN REGION 
var sum_region=function(im,geom,band){
  return ee.Number(im.toFloat().reduceRegion({
    reducer: ee.Reducer.count(),//sum().unweighted(), 
    geometry: geom, 
    crsTransform: TRANSFORM, 
    crs: CRS, 
    bestEffort: false, 
    maxPixels: 1e13, 
    tileScale: 1
  }).get(band))
}
var totalEast = sum_region(lossYr17.gt(0),east, "lossyear");
print('------------- Alerts for 2017 -----------------')
print('Total Alerts for East:', totalEast);
var totalWest = sum_region(lossYr17.gt(0),west, "lossyear");
print('Total Alerts for West:', totalWest);
var yrList = ee.List.sequence(1,18,1);
var lossAlerts = yrList.map(function(i) {
    i = ee.Number(i);
  var filtered = loss.eq(i);
  var yrLoss = loss.updateMask(filtered)
  var yrLoss = yrLoss.updateMask(yrLoss.gt(0))
  return yrLoss
})
var images = lossAlerts.map(function(img) {
        return ee.Image(img);
      });//function to create images from a list
    //Create an imageCollection from the ltmm images
var lossIc= ee.ImageCollection.fromImages(images);
// print(lossIc)
var lossMosaic = lossIc.mosaic()
// var point = ee.Geometry.Point(-51.05219774801958,-8.025269674483392)
// var year = ee.Image(lossMosaic).reduceRegion({
//     reducer: ee.Reducer.first(), 
//     geometry: point, 
//     scale: 30,
//   }).get('lossyear');
// print("year", ee.Number(year).add(2000))
var lossEast = lossMosaic.addBands(lossMosaic).clip(east).reduceRegion({
  reducer: ee.Reducer.count().group({
    groupField: 1,
    groupName: 'lossyear',
  }),
  geometry: kayapo,
  scale: 30,
  maxPixels: 1e10
});
print("lossEast", lossEast)
var asList = ee.List(lossEast.get('groups')).map(function (pair) {
  return ee.Feature(null, pair);
});
 print(asList)
var ely = ee.FeatureCollection(asList).aggregate_array("lossyear")
var ec = ee.FeatureCollection(asList).aggregate_array("count")
var lossWest = lossMosaic.addBands(lossMosaic).clip(west).reduceRegion({
  reducer: ee.Reducer.count().group({
    groupField: 1,
    groupName: 'lossyear',
  }),
  geometry: kayapo,
  scale: 30,
  maxPixels: 1e10
});
print("lossWest", lossWest)
var asList = ee.List(lossWest.get('groups')).map(function (pair) {
  return ee.Feature(null, pair);
});
 print(asList)
var wly = ee.FeatureCollection(asList).aggregate_array("lossyear");
var wc = ee.FeatureCollection(asList).aggregate_array("count");
var yValues = ee.Array.cat([wc,ec],1)
/*******************Adding UI**********************************/
// Make UI components.
var label = ui.Label('Click for Year');
var inspector = ui.Panel({
  widgets: [label],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Define callback functions.
function showElevation(elevation) {
  var titleLabel = ui.Label({
    value: 'year:',
    style: {
      fontWeight: 'bold',
      stretch: 'vertical',
    }
  });
  var elevationLabel = ui.Label(elevation, {stretch: 'vertical'});
  var closeButton = ui.Button({
    label: 'Close', 
    onClick: function() {
      inspector.clear();
      inspector.style().set('shown', false);
    }
  });
  inspector.clear();
  inspector.add(titleLabel);
  inspector.add(elevationLabel);
  inspector.add(closeButton);
}
function inspect(coords) {
  inspector.clear();
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  inspector.style().set('shown', true);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var elevation = lossMosaic.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30,
  }).get('lossyear');
  ee.Number(elevation).add(2000).evaluate(showElevation);
}
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: east,
  color: 1,
  width: 3
});
var empty1 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline1 = empty1.paint({
  featureCollection: west,
  color: 1,
  width: 3
});
var visNDVI = {min: 1, max: 18, palette: palettes.matplotlib.plasma[7]};
// Set up the map.
Map.centerObject(kayapo,7)
Map.addLayer(kayapo, {color:"00A83F"}, "Kayapo");
Map.addLayer(outline,{palette:"blue"},'east' )
Map.addLayer(outline1,{palette:"red"},'west' )
Map.addLayer(lossYr17, {palette:["orange"]}, 'loss17')
// Map.addLayer(gk3, {palette: "green"}, 'alerts18')
Map.addLayer(lossMosaic, visNDVI, 'lossMosaic')
Map.add(inspector);
Map.onClick(inspect);
Map.style().set('cursor', 'crosshair');
var intro = ui.Panel([
  ui.Label({
    value: 'Loss Counter',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect year of loss.')
]);
var yearLabel = ui.Label();
// var alert17 = ui.Panel([
//   ui.Label({
//     value: 'Loss Counts for 2017',
//     style: {fontSize: '12px', fontWeight: 'bold'}
//   }),
//   ui.Label('Total Alerts for West:' + totalWest.evaluate()),
//   ui.Label('Total Alerts for East:' + totalEast.evaluate())
// ]);
// Add the widgets to a new panel.
var panel = ui.Panel();
panel.add(intro);
panel.add(yearLabel);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
//Setup the map
// Map.centerObject(kayapo,7)
// Map.addLayer(kayapo, {color:"00A83F"}, "Kayapo");
// Map.addLayer(east,{color:"blue"},'east' )
// Map.addLayer(west,{color:"red"},'west' )
// Map.addLayer(lossYr17, {palette:["orange"]}, 'loss17')
// Map.addLayer(gk3, {palette: "green"}, 'alerts18')
// Map.addLayer(lossMosaic.randomVisualizer(), {}, 'lossMosaic')
// Map.onClick(function(coords) {
//     //yearLabel.setValue('lon: ' + coords.lon+ ' lat: ' + coords.lat);
//   var point = ee.Geometry.Point(coords.lon, coords.lat);
//   var year = lossMosaic.reduceRegion({
//     reducer: ee.Reducer.first(), 
//     geometry: point, 
//     scale: 30,
//   }).get('lossyear');
//   yearLabel.setValue("year:" + ee.Number(year).add(2000))
// });
// Map.style().set('cursor', 'crosshair');
var chart = ui.Chart.array.values(yValues, 0, wly)
    .setSeriesNames(['West', 'East'])
    .setChartType('ColumnChart')
    .setOptions({
      title: 'Loss Counts from 2001-2018',
      hAxis: {'title': 'Loss Year',
        ticks: [{v: 1, f: '2001'},
                {v: 4, f: '2004'},
                {v: 7, f: '2007'},
                {v: 10, f: '2010'},
                {v: 13, f: '2013'},
                {v: 16, f: '2016'},
                {v: 18, f: '2018'}]
      },
      vAxis: {'title': 'Count'},
      pointSize: 3,
      series:{
        0: {color: 'red'},
        1: {color: 'blue'}
      }
});
panel.widgets().set(3, chart)
//panel.add(alert17)
// // var chart = ui.Chart.feature.byFeature(
// //   ee.FeatureCollection(asList), 'lossyear')
// //       .setChartType('ColumnChart')
// //     .setOptions({
// //       title: 'Alerts in the West',
// //       hAxis: {
// //         title: 'Loss Year',
// //         ticks: [{v: 1, f: '2000'},
// //                 {v: 4, f: '2003'},
// //                 {v: 7, f: '2006'},
// //                 {v: 10, f: '2009'},
// //                 {v: 13, f: '2014'},
// //                 {v: 16, f: '2017'}]
// //       },
// //       vAxis: {
// //         title: 'Alert Count'
// //       },
// //       lineWidth: 1,
// //       pointSize: 3
// // });
// // print(chart)