var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.89646377712098,
                -25.03626882762947
              ],
              [
                -57.89646377712098,
                -25.67166384546422
              ],
              [
                -57.12192764430848,
                -25.67166384546422
              ],
              [
                -57.12192764430848,
                -25.03626882762947
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-57.89646377712098, -25.03626882762947],
          [-57.89646377712098, -25.67166384546422],
          [-57.12192764430848, -25.67166384546422],
          [-57.12192764430848, -25.03626882762947]]], null, false);
//alejandro.marambio@gmail.com
//agregar polígono en var roi/
/////////////////////////////////////////
Map.setCenter(-57.5402, -25.3428, 12);
Map.setOptions('ROADMAP'); //"ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"
Map.setControlVisibility(false);
Map.setControlVisibility({zoomControl: false, layerList: true, fullscreenControl: true }); //scaleControl: true
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// cloudmask
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(50);// max cloud probability
  return img.updateMask(isNotCloud);
}
//variables imagenes
var rgbVis = {min: 100, max: 3000, bands: ['B4', 'B3', 'B2']};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2020
var S2_20sr = ee.ImageCollection('COPERNICUS/S2_SR');
var S2_20clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_20date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2019-10-01', '2020-03-30'));
    S2_20sr = S2_20sr.filter(S2_20date);
    S2_20clouds = S2_20clouds.filter(S2_20date);
var S2_20SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_20sr,
  secondary: S2_20clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_20 = ee.ImageCollection(S2_20SrWithCloudMask).map(maskClouds).median().select('B2', 'B3', 'B4','B8','B8A','B11','B12');
var S2_20rgb = ee.ImageCollection(S2_20SrWithCloudMask).map(maskClouds).median().select('B2','B3', 'B4');
Map.addLayer( S2_20rgb.clip(roi),rgbVis, '2020', false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2021
var S2_21sr = ee.ImageCollection('COPERNICUS/S2_SR');
var S2_21clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_21date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2020-10-01', '2021-03-30')); //Invierno 12-21 / Otoño 09-21
    S2_21sr = S2_21sr.filter(S2_21date);
    S2_21clouds = S2_21clouds.filter(S2_21date);
var S2_21SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_21sr,
  secondary: S2_21clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_21 = ee.ImageCollection(S2_21SrWithCloudMask).map(maskClouds).median().select('B2', 'B3', 'B4','B8','B8A','B11','B12');
var S2_21rgb = ee.ImageCollection(S2_21SrWithCloudMask).map(maskClouds).median().select('B2','B3', 'B4');
Map.addLayer( S2_21rgb.clip(roi),rgbVis, '2021', false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2022
var S2_22sr = ee.ImageCollection('COPERNICUS/S2_SR');
var S2_22clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_22date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2021-10-01', '2022-03-30')); //Invierno 12-21 / Otoño 09-21
    S2_22sr = S2_22sr.filter(S2_22date);
    S2_22clouds = S2_22clouds.filter(S2_22date);
var S2_22SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_22sr,
  secondary: S2_22clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_22 = ee.ImageCollection(S2_22SrWithCloudMask).map(maskClouds).median().select('B2', 'B3', 'B4','B8','B8A','B11','B12');
var S2_22rgb = ee.ImageCollection(S2_22SrWithCloudMask).map(maskClouds).median().select('B2','B3', 'B4');
Map.addLayer( S2_22rgb.clip(roi),rgbVis, '2022', false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////NDVI //["B8","B4"] Normalized Difference Vegetation Index
var ndvi2020 = S2_20.normalizedDifference(["B8","B4"]).rename ('ndvi2020');
var ndvi2021 = S2_21.normalizedDifference(["B8","B4"]).rename ('ndvi2021');
var ndvi2022 = S2_22.normalizedDifference(["B8","B4"]).rename ('ndvi2022');
var RGBndvi = (ndvi2020.addBands(ndvi2021).addBands(ndvi2022)); // Red =cleared , blue = grown , white = no change
var ndvi2221diff = ndvi2022.subtract(ndvi2021).rename(['ndvi2221diff']);
var ndvi2120diff = ndvi2021.subtract(ndvi2020).rename(['ndvi2120diff']);
Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2021', 'ndvi2022', 'ndvi2022'], min: 0,  max: 0.7,  gamma: [1, 1, 1]}, '2020 vs 2021',false);
Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2020', 'ndvi2021', 'ndvi2021'], min: 0,  max: 0.7,  gamma: [1, 1, 1]}, '2021 vs 2022',false);
Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2020', 'ndvi2022', 'ndvi2022'], min: 0,  max: 0.7,  gamma: [1, 1, 1]}, '2020 vs 2022',true); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create and add the legend title.
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '10px 30px',
    color: 'black',
  }
});
var legendTitle = ui.Label({
  value: '2020 | 2021 | 2022',
  style: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 2px 0',
    padding: '0'
  }
});
var legendsubTitle = ui.Label({
  value: 'Monitoreo BID',
  style: {
    fontFamily: 'Arial',
    fontSize: '11px',
    margin: '0 0 2px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
legend.add(legendsubTitle);
Map.add(legend);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///PLACES
var places = {
  VillaAnita: [-57.56131, -25.36836, 15],
  Luque: [-57.48941, -25.26955, 15],
  B3: [-57.5402, -25.3428, 12],
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], places[key][2]);
  }
});
select.setPlaceholder('Elige un barrio...');
ui.Button();
Map.add(select);