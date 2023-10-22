var fl = ui.import && ui.import("fl", "imageCollection", {
      "id": "users/lizcanosandoval/Seagrass/Sentinel/FL_19_clean"
    }) || ee.ImageCollection("users/lizcanosandoval/Seagrass/Sentinel/FL_19_clean"),
    fwri = ui.import && ui.import("fwri", "table", {
      "id": "users/lizcanosandoval/Seagrass_Habitat_Florida"
    }) || ee.FeatureCollection("users/lizcanosandoval/Seagrass_Habitat_Florida"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -88.49833984375002,
                30.755713435861324
              ],
              [
                -88.49833984375002,
                23.970892282448037
              ],
              [
                -79.68730468750002,
                23.970892282448037
              ],
              [
                -79.68730468750002,
                30.755713435861324
              ]
            ]
          ],
          "geodesic": false,
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
        [[[-88.49833984375002, 30.755713435861324],
          [-88.49833984375002, 23.970892282448037],
          [-79.68730468750002, 23.970892282448037],
          [-79.68730468750002, 30.755713435861324]]], null, false),
    points = ui.import && ui.import("points", "table", {
      "id": "users/lizcanosandoval/ground-points/Ground-points-19"
    }) || ee.FeatureCollection("users/lizcanosandoval/ground-points/Ground-points-19"),
    final_product = ui.import && ui.import("final_product", "imageCollection", {
      "id": "users/lizcanosandoval/Seagrass/Sentinel/03_FinalProduct"
    }) || ee.ImageCollection("users/lizcanosandoval/Seagrass/Sentinel/03_FinalProduct");
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '350px'}	});
// Add description
var mapDesc = ui.Label('Seagrass classification using Sentinel-2 images from 2019 and the Support Vector Machine'+
    ' classifier. The classification used 32,118 points divided into three classes:'+
    ' Softbottom (15,092), hardbottom (2,529) and seagrass (14,497 - Yellow points). These points were collected by'+
    ' visual interpretation, previous studies and datasets from the region. The classification used'+
    ' 70% of the points for training and 30% for validation (and accuracy estimations).'+
    ' The IMARS seagrass map is mainly comparable to the continuous (dense) seagrass datasets by FWRI.'
    );	
var note = ui.Label('Note: The satellite images shown here are just a sample.'+
    ' The classification used several images (min: 2 - max: 12) per tile.'+
    ' See the different layers in the upper right corner.')
var author = ui.Label('By: Luis Lizcano-Sandoval \nInstitute for Marine Remote Sensing (IMARS) \nUniversity of South Florida \nluislizcanos@usf.edu',
            {whiteSpace: 'pre'});
//var accuracy = ui.Label('Validation Accuracies: \n80-95%',
//            {whiteSpace: 'pre'})
var areas1 = ui.Label('Seagrass area (IMARS-2019):\n7,073 km^2 ',
            {whiteSpace: 'pre'})
            // area of first mapped version 7,849.10
var areas2 = ui.Label('Seagrass area (FWRI):\nContinuous: 8,516.85 km^2 \nDiscontinuous: 4,533.75 km^2 \nTotal: 13,050.60 km^2 ',
            {whiteSpace: 'pre'})
mapDesc.style().set({fontSize:'13px', padding:'0px'});
panel.widgets().set(0,mapDesc); //Add description to panel
panel.widgets().set(1,note);
//panel.widgets().set(2,accuracy);
panel.widgets().set(3,areas1);
panel.widgets().set(4,areas2);
panel.widgets().set(5,author);
//List of images
var list = ['20190410T161839_20190410T163256_T16RDU',
         '20190917T161909_20190917T162652_T16REU',
         '20191121T162601_20191121T162602_T16RFT',
         '20191121T162601_20191121T162602_T16RFU',
         '20191118T161551_20191118T161929_T16RGT',
         '20190924T161009_20190924T162413_T16RGU',
         '20190228T160211_20190228T160836_T16RHN',
         '20190228T160211_20190228T160836_T17RKH',
         '20190223T160249_20190223T161327_T17RKL',
         '20190211T161411_20190211T162459_T17RKM',
         '20191118T161551_20191118T161929_T17RKN',
         '20190924T161009_20190924T162413_T17RKP',
         '20190228T160211_20190228T160836_T17RLH',
         '20190208T160421_20190208T161051_T17RLJ',
         '20190208T160421_20190208T161051_T17RLK',
         '20191120T160549_20191120T160546_T17RLL',
         '20190117T161619_20190117T162429_T17RLM',
         '20191120T160549_20191120T160546_T17RLN',
         '20190203T160459_20190203T160859_T17RMH',
         '20190302T160509_20190302T160509_T17RMH',
         '20190228T160211_20190228T160836_T17RMJ',
         '20191130T160619_20191130T160655_T17RMK',
         '20190228T160211_20190228T160836_T17RMN',
         '20191130T160619_20191130T160655_T17RMP',
         '20190411T160519_20190411T160516_T17RNH',
         '20191207T160509_20191207T160505_T17RNJ',
         '20190205T160511_20190205T160508_T17RNK',
         '20190205T160511_20190205T160508_T17RNL',
         '20191130T160619_20191130T160655_T17RNM',
         '20190208T160421_20190208T161051_T17RNN']
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
      .filter(ee.Filter.inList('system:index',list)).median()
var seagrass_points = points.filter(ee.Filter.eq('class',2))
// New collection
var newColl = final_product.filter(ee.Filter.eq('country','USA'))
          .filter(ee.Filter.eq('year',2019)).mosaic()
var newColl_mask = newColl.updateMask(newColl.gte(2))
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: fwri,
  color: 1,
  width: 3
});
// Palette
var rgb = {bands: ['B4','B3','B2'], min: 0, max: 2000, gamma: 2.3}
Map.centerObject(geometry,6)
Map.addLayer(collection,rgb,'RGB')
//Map.addLayer(coastline.draw({color: '#ff00f7', strokeWidth: 0}),{},'Coastline',true,0.3)
Map.addLayer(fwri,{},'Seagrass_FWRI',false,1)
Map.addLayer(fl.mosaic(),{palette: '#e400ff'},'Seagrass_IMARS',false)
Map.addLayer(newColl_mask,{palette: '#1bff00'},'Seagrass_IMARS_New')
//Map.addLayer(points.draw({color: 'red'}),{},'Ground-Points',true,0.8)
Map.addLayer(seagrass_points.draw({color: '#ffc800'}),{},'Seagrass Points',false,0.8)
/*
//Calculate area:
var getClass = fl.mosaic().gte(1)//.clip(spare)
var Area = getClass.multiply(ee.Image.pixelArea())
var reducerArea = Area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e15
  })
print(reducerArea)
var areaSqKm = ee.Number(
  reducerArea.get('constant')).divide(1e6)//.round()
print('Seagrass area (km^2):', areaSqKm)
*/
ui.root.insert(0, panel);