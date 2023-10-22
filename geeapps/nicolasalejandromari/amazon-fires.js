var Amazonia = ee.FeatureCollection("users/nicolasalejandromari/Amazonia"),
    NBRVISPARAMS = {"opacity":1,"bands":["nd"],"gamma":1},
    imageVisParam = {"opacity":1,"bands":["B11","B8","B4"],"min":0.12309608313892831,"max":0.19183285424404825,"gamma":1},
    imageVisParam2 = {"opacity":1,"bands":["B11","B8","B4"],"min":0.08715644595980891,"max":0.24564877580840438,"gamma":1},
    PRODES = ee.FeatureCollection("users/nicolasalejandromari/PRODES_deforestation"),
    imageVisParam3 = {"opacity":1,"bands":["B4","B3","B2"],"min":0.0552949994802475,"max":0.23045500218868256,"gamma":1},
    Brazil_indigenous_lands = ee.FeatureCollection("users/nicolasalejandromari/bra_land_rights");
Map.centerObject(Amazonia, 4);
Map.addLayer(Amazonia,{}, "Amazonia",false );
//////////////////////////////////////////////////////////////////////////
// FLAME DETECTION INDEX (FDI)
// Author: Dr. Andrea Markos
// Affiliation:'Chiquitano Dry Forest Watch'
// EMAIL: amarkos@fcbc.org.bo
// Website: https://obch.fcbc.org.bo/ 
// ACTIVE FIRES: thresholding at 3 false positives such as heated rocky formations and ensures you detected 
// EXTINGUISHED FIRES: are still a threat at 2.5, as wind can revive the fire
var FDI_threshold = 3;
var Start_S2 = ('2019-08-01');   
var End_S2 = ('2019-09-30');  
//var Alert = geometry; 
//Map.centerObject(Alert, 7);
var S2 = ee.ImageCollection('COPERNICUS/S2').filterBounds(Amazonia).filterDate(Start_S2, End_S2);
print("Imagen Sentinel 2: ", S2);
var S2 = ee.ImageCollection('COPERNICUS/S2').filterBounds(Amazonia).filterDate(Start_S2, End_S2).mosaic();
var image = S2.clip(Amazonia);
var FDI = image.expression("SWIR2/Redge", {Redge: image.select("B5"), SWIR2: image.select("B12")}).rename('FDI').gt(FDI_threshold);
var onlyFDI = FDI.updateMask(FDI.eq(1)).rename('onlyFDI');
var area = onlyFDI.multiply(ee.Image.pixelArea());
var stats_fire1 = area.reduceRegion({reducer: ee.Reducer.sum(),geometry: Amazonia, scale: 10, maxPixels: 1e13});
print('Active fire FDI (m2): ', stats_fire1.get('onlyFDI'));
Map.addLayer(image, {"bands": ["B12", "B8", "B4"],"min": 500,"max": 4000, gamma: 1.5, scale: 10}, "Sentinel 2 for Active Fires");
Map.addLayer(onlyFDI, {palette: 'red'}, 'FDI');
// CREATE YOUR OWN DRIVE TO EXPORT AND SHARE HI RES FIRE DATA:
Export.image.toDrive({image: onlyFDI, folder: 'HI_RES_FIRE_DETECTION', description: 'Only_FIRE', fileNamePrefix: '18_08_2019_', scale: 10, maxPixels: 1e13, region: Amazonia})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sentinel visualization of Burned Areas
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Map the function over a certain period of time of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-08-01', '2019-09-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds).filterBounds(Amazonia);
var rgbVis = {min: 0.0,max: 0.3,bands: ['B4', 'B3', 'B2'],};
var AmazoniaComp = dataset.median();
var AmazoniaComp = AmazoniaComp.clip(Amazonia);
Map.addLayer(AmazoniaComp, imageVisParam2, "Sentinel 2 for Burned Area");
//Map.addLayer(clipped, imageVisParam3, "Amazonia S2 - true color");
Map.addLayer (Brazil_indigenous_lands, {color:'4c8EFB'}, "Brazil indigenous lands",false)
Map.addLayer (PRODES,{color: '800080'}, 'Deforestation PRODES 2000-2015',false )
/////////////////////////////////////////////////////////////////////////
//  Hot Spot Detection MODIS //
var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-08-01', '2019-09-30'));
var fires = dataset.select('T21').map(function(image) {
      return image.clip(Amazonia);
    });
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
Map.addLayer(fires, firesVis, 'MODIS Hot Spots 1 KM');
//print (PRODES)
;