var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -72.647448602147,
            -15.626347804322576
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-72.647448602147, -15.626347804322576]),
    SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    poligono = ui.import && ui.import("poligono", "table", {
      "id": "users/eduardo2188/glaciares/Ampato"
    }) || ee.FeatureCollection("users/eduardo2188/glaciares/Ampato");
// Function to mask clouds using the quality band of Landsat 5.
var maskL5 = function(image) {
  var qa = image.select('BQA');
  /// Check that the cloud bit is off.
  // See https://www.usgs.gov/land-resources/nli/landsat/landsat-collection-1-level-1-quality-assessment-band
  var mask = qa.bitwiseAnd(1 << 4).eq(0);
  return image.updateMask(mask);
}
// Assign a common name to the sensor-specific bands.
var LC8_BANDS = ['BQA', 'B2', 'B3', 'B4', 'B5',  'B6', 'B7', 'B10']; //Landsat 8
var LC7_BANDS = ['BQA', 'B1', 'B2', 'B3', 'B4',  'B5', 'B7', 'B6_VCID_2']; //Landsat 7
var LC5_BANDS = ['BQA', 'B1', 'B2', 'B3', 'B4',  'B5', 'B7', 'B6']; //Llandsat 5
var STD_NAMES = ['BQA', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(LC8_BANDS, STD_NAMES).map(maskL5)// Landsat 8
print(l8, 'Landsat 8')
var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA').select(LC7_BANDS, STD_NAMES).map(maskL5) //Landsat 7
print(l7, 'Landsat 7')
var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA').select(LC5_BANDS, STD_NAMES).map(maskL5) //Landsat 5
print(l5, 'Landsat 5')
var composite = ee.ImageCollection(l5.merge(l7).merge(l8))
.filterDate('2004-01-01', '2005-12-31')
.median();
// hemos utilizado la paleta por defecto que contiene el GEE.
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
// vamos a generar el índice de NDVI para toda las zonas de las coordilleas del Perú 
// En este caso vamos a generar el NDVI en base al calculo de los  (A - B) / (A + B)
var ndvi = composite.normalizedDifference(['B4', 'B3']);
// vamos a generar el índice de NDSI para toda el área de trabajo 
// En este caso vamos a generar el NDSI en base al calculo de los  (A - B) / (A + B)
var ndsi = composite.normalizedDifference(['B2', 'B5']);
// vamos a generar el índice de NDWI para toda el área de trabajo 
// En este caso vamos a generar el NDWI en base al calculo de los  (A - B) / (A + B)
var ndwi = composite.normalizedDifference(['B3', 'B4']);
//Calculate slope using SRTM DEM
var SRTM = ee.Image(SRTM)
  .clip(poligono);
/**
* Calculate NDSI
* @param {ee.Image} image
* */
var NDSI = function(composite) {
 var ndsi = composite.expression('float(green - swir1)/(green + swir1)', {
 'green': composite.select('B2'),
 'swir1': composite.select('B5')
 });
 return ndsi.rename("ndsi");
};
/* Calculate NDSI
* @param {ee.Image} image
*/
var GLACIER = function(NDSI_Calc,composite) {
 var B1nir = composite.select('B4'); //nir
 var B2red = composite.select('B3'); //red
 var GELO = ee.Image(0);
 var SelecGELO = GELO.where(
 B1nir.gt(.11).and(ndwi.lt(0.2)).and(SRTM.gt(4840)).and(B2red.gt(0.1)).and(NDSI_Calc.gt(0.40)),1);
 var GLACIER= SelecGELO.updateMask(SelecGELO).rename('GLACIER');
 return GLACIER.rename("ndsi");
};
//------------------------------------------------------------------
var NDSI_Calc =NDSI(composite);
var AreaGlacier = GLACIER(NDSI_Calc,composite).clip(poligono);
Map.addLayer(poligono);
//Map.addLayer(ndwi.clip(poligono), {min: -1, max: 1, palette: palette}, 'NDWI');
Map.addLayer(ndsi.clip(poligono), {min: -1, max: 1, palette: palette}, 'NDSI');
//Map.addLayer(ndvi.clip(poligono), {min: -1, max: 1, palette: palette}, 'NDVI');
//Map.addLayer(SRTM.clip(poligono), {min: 3000, max: 7000, palette: palette}, 'SRTM');
Map.addLayer(composite.clip(poligono), {bands: ['B4', 'B3', 'B2'], max: 0.3},'Imagen');
Map.addLayer(AreaGlacier,{palette:['0000FF']}, 'glaciar');
//Map.addLayer(agua_mask.clip(poligono), {palette:['red']}, 'agua');
Map.setCenter(-72.647448602147,-15.626347804322576);
var GLACIER_class = AreaGlacier.gte(0)
var area_pxa = AreaGlacier.multiply(ee.Image.pixelArea()) 
                    .reduceRegion(ee.Reducer.sum(),poligono,30,null,null,false,1e13)
                    .get('ndsi')
 var area_pxa = ee.Number(area_pxa).divide(1e6)                 
 print ('Area using ee.Image.pixelArea (km²)', area_pxa)
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: AreaGlacier,
  description: 'Glaciar',
  scale: 30,
  region: poligono
});