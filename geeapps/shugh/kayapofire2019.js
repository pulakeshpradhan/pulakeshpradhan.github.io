var raisg = ee.FeatureCollection("users/shugh/amazon/RAISG_boundary"),
    geometry = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-57.906327730842236, -4.4749792586781965],
          [-57.906327730842236, -12.122442558086519],
          [-48.633866793342236, -12.122442558086519],
          [-48.633866793342236, -4.4749792586781965]]], null, false),
    kayapo = ee.FeatureCollection("users/shugh/amazon/Kayapo/KayapoBoundaryWhole2"),
    villages = ee.FeatureCollection("users/shugh/amazon/Kayapo/KayapoVillages"),
    legal = ee.FeatureCollection("users/shugh/amazon/legal_amazon");
// var glad = ee.ImageCollection("projects/glad/alert/UpdResult")
// print(glad)
// var glad = glad.filterMetadata('system:index', 'contains', 'SA')
// .filter(ee.Filter.date ('2018-01-01, 2018-12-31'))
// var aoi = raisg
// var gladAoi = glad.map(function(img){
//               var img_clip = img.clip(aoi)
//               return img_clip
//             })
// print("gladAoi", gladAoi)
// var alert18 = gladAoi.select("alertDate18").mosaic()
// Map.centerObject(raisg,5);
// Map.addLayer(alert18, {}, 'alertDate18');
///////////////////////////////////////////////////////////////////////////////
// var collection = ee.ImageCollection("COPERNICUS/S2_SR").filterBounds(geometry)
// .filterDate('2019-07-01',ee.Date(Date.now())).sort('system:time_start',false);
// var CloudMaskS2 = function(image){
//   var QA = image.select('SCL')
//   var clouds = 9;
//   var cirrus = 8;
//   var thin_cirrus = 10;
//   var shadows = 3;
//   var snow = 11;
//   var mask = QA.neq(clouds).and(QA.neq(cirrus)).and(QA.neq(thin_cirrus)).and(QA.neq(shadows)).and(QA.neq(snow));
//   return image.updateMask(mask).set('system:time_start', image.get('system:time_start'));
// };
// var cloudFreeCollection = collection.map(CloudMaskS2);
// var reducedCollection = cloudFreeCollection.reduce(ee.Reducer.firstNonNull());
var visPar = {
  bands:['B12_first','B11_first','B8A_first'],
  min:0,
  max:5000,
}
Map.centerObject(kayapo);
//Map.addLayer(dataset.median(), rgbVis, 'RGB');
// var clipped = reducedCollection.clip(geometry);
// Map.addLayer(clipped, visPar, "Amazonia S2");
//var NBR = clipped.normalizedDifference(['B8', 'B12']);
//print(NBR);
//Map.addLayer(NBR, NBRVISPARAMS, "NBR");
///
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-07-01', ee.Date(Date.now()))).sort('system:time_start',false);
var fires = dataset.select('T21').map(function(image) {
      return image.clip(legal);
    });
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
//Kayapo outline parameters
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: kayapo,
  color: 1,
  width: 3
});
//landsat image
// var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterBounds(geometry)
// .filterDate('2016-07-01',ee.Date(Date.now())).sort('system:time_start',false);
// var mask = require('users/fitoprincipe/geetools:cloud_masks') 
// var mask_function = mask.landsatSR() // mask function
// //var cloudFreeCollection = collection.map(CloudMaskS2);
// var cloudFreeCollection = collection.map(mask_function);
// var viz = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
// var viz2 = {bands: ['B4_first', 'B3_first', 'B2_first'], min: 0, max: 3000};
// var viz3 = {bands: ['B4_last', 'B3_last', 'B2_last'], min: 0, max: 3000};
// var landsat19 = cloudFreeCollection.filterDate('2019-07-01',ee.Date(Date.now())).median()
// var landsat19last = cloudFreeCollection.filterDate('2019-07-01',ee.Date(Date.now())).reduce(ee.Reducer.lastNonNull())
// var landsat19first = cloudFreeCollection.filterDate('2019-07-01',ee.Date(Date.now())).reduce(ee.Reducer.firstNonNull())
//Map.setCenter(-119.086, 47.295, 6);
//Map.addLayer(landsat19, viz, "landsat")
// Map.addLayer(landsat19first, viz2, "landsat first")
// Map.addLayer(landsat19last, viz3, "landsat last")
Map.addLayer(outline, {palette: 'black'}, 'kayapo');
Map.addLayer(fires, firesVis, 'Fires');
Map.addLayer(villages, {color: "purple"}, "villages")
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Fire (Brightness Temperature - C)',
style: {
fontWeight: 'bold',
fontSize: '12 px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((firesVis.max-firesVis.min)/100.0).add(firesVis.min);
var legendImage = gradient.visualize(firesVis);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(firesVis['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'20x75'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(firesVis['min'])
],
});
legend.add(panel);
Map.add(legend);