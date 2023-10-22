var planta_urbana = ui.import && ui.import("planta_urbana", "table", {
      "id": "users/santiagobanchero/curso-gee/planta_urbana"
    }) || ee.FeatureCollection("users/santiagobanchero/curso-gee/planta_urbana"),
    departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -63.416674870398964,
                -34.362714397555
              ],
              [
                -63.416674870398964,
                -35.87681518332467
              ],
              [
                -63.229907292273964,
                -36.05021365952318
              ],
              [
                -62.614672917273964,
                -35.58250546966083
              ],
              [
                -62.334521550086464,
                -35.814476755594015
              ],
              [
                -61.906054753211464,
                -35.53334820198641
              ],
              [
                -61.790698307898964,
                -35.62270262287328
              ],
              [
                -61.274340886023964,
                -35.21533609915074
              ],
              [
                -61.290820378211464,
                -35.152481704273725
              ],
              [
                -61.367724675086464,
                -35.085083788054185
              ],
              [
                -61.076586979773964,
                -34.84649843074608
              ],
              [
                -61.241381901648964,
                -34.580087559931144
              ],
              [
                -61.296313542273964,
                -34.380850444155286
              ],
              [
                -61.444628971961464,
                -34.26289598851942
              ],
              [
                -61.625903386023964,
                -34.24927519444861
              ],
              [
                -61.752246159461464,
                -34.35817977241649
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
        [[[-63.416674870398964, -34.362714397555],
          [-63.416674870398964, -35.87681518332467],
          [-63.229907292273964, -36.05021365952318],
          [-62.614672917273964, -35.58250546966083],
          [-62.334521550086464, -35.814476755594015],
          [-61.906054753211464, -35.53334820198641],
          [-61.790698307898964, -35.62270262287328],
          [-61.274340886023964, -35.21533609915074],
          [-61.290820378211464, -35.152481704273725],
          [-61.367724675086464, -35.085083788054185],
          [-61.076586979773964, -34.84649843074608],
          [-61.241381901648964, -34.580087559931144],
          [-61.296313542273964, -34.380850444155286],
          [-61.444628971961464, -34.26289598851942],
          [-61.625903386023964, -34.24927519444861],
          [-61.752246159461464, -34.35817977241649]]]);
//Provincias
var total = ee.FeatureCollection("users/joseserafinig/Argentina/provincias");
var roi = total.filterMetadata('provincia','equals','Buenos Aires');
var collection = ee.ImageCollection ("COPERNICUS/S2_SR")
    .filterDate('2020-08-20','2020-09-30')
Map.setOptions("HYBRID")
Map.setCenter(-59.4775, -34.0116, 11);   
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}
// Map the cloud masking function over one year of data
var s2filtered = s2.filterDate('2020-08-20','2020-09-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 35))
                  .map(maskS2clouds)
                  .select('B4', 'B8','B11');
var bands = ('B4', 'B8','B11');
var composite = s2filtered.median();
// Display the results.
var zona = composite.clip(roi)
Map.addLayer(zona, {bands: ['B8', 'B11', 'B4'], min: 0.01636, max: 0.398}, 'RGB');
var addNDVI = function(image) {
  var ndvi2 = image.expression("(nir-red) / (nir+red)", {
    nir : image.select("B8"),
    red : image.select("B4")
  }).rename("ndvi")
  return ndvi2
}
var withNDVI = collection.map(addNDVI)
var maxNDVI = withNDVI.reduce(ee.Reducer.max())
var maxiNDVI = maxNDVI.clip(roi);
// Shared visualization parameters.
var visParams_ndvi = {
  min: 0,
  max: 1,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
Map.addLayer(maxiNDVI,visParams_ndvi,'maxNDVI')
var threshold = maxiNDVI .gt(0.75)
var highNDVI = maxiNDVI .updateMask(threshold)
var threshold1 = maxiNDVI .gt(0.15)
var highNDVI1 = maxiNDVI .updateMask(threshold1)
var threshold2 = highNDVI1 .lt(0.40)
var barbNDVI = highNDVI1 .updateMask(threshold2)
Map.addLayer(barbNDVI,{palette: '#e0ffff'},"barbNDVI")
// Shared visualization parameters.
var visParams_hndvi = {
  min: 0.78,
  max: 0.99,
  palette: [
       '#ffff24','#ff9224','#db0000',"blue"
  ]
};
Map.addLayer(highNDVI,visParams_hndvi,'NDVIgraduado')
var area = threshold.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: roi,
  scale: 10,
  maxPixels:1e9,
  crs: "EPSG:4326" 
})
//////////////////////////////////////////////////////////////
// Asset List
//////////////////////////////////////////////////////////////
var gsw = ee.Image('JRC/GSW1_2/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var transicion = gsw.select('transition');
//////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['white','yellow','red','blue']
};
var VIS_WATER_MASK = {
  palette: ['white','blue']
};
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(0).unmask(0);
Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: 'Máxima Extensión',
  shown: false
});
Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2019)",
  visParams: VIS_OCCURRENCE
});
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: water_mask,
  description: 'imageocurrence',
  scale: 30,
  maxPixels: 1.0E13,
  region: geometry
});
var paleta = ['ffffff','0000ff','22b14c','d1102d','99d9ea','b5e61d','e6a1aa','ff7f27','ffc90e','7f7f7f','c3c3c3'];
var cobertura = ['Ningún cambio-0','Permanente-1','Nueva Permanente-2','Perdida Permanente-3','Estacional-4','Nueva Estacional-5','Perdida Estacional-6','Estacional a Permanente-7','Permanente a Estacional-8','Permanente Efimera-9','Efímera Estacional-10'];
Map.addLayer(transicion,{min:0, max:10, palette:paleta},"Clasific. del Cambio")
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("Color - Categoria de Agua ",{fontWeight: 'bold', fontSize: '18px', color: 'black'});
legend.add(title);
legend.add(descr);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ffffff', 'Ningún cambio-0'));
legend.add(makeRow('0000ff', 'Permanente-1'));
legend.add(makeRow('22b14c', 'Nueva Permanente-2'));
legend.add(makeRow('d1102d', 'Perdida Permanente-3'));
legend.add(makeRow('99d9ea', 'Estacional-4'));
legend.add(makeRow('b5e61d', 'Nueva Estacional-5'));
legend.add(makeRow('e6a1aa', 'Perdida Estacional-6'));
legend.add(makeRow('ff7f27', 'Estacional a Permanente-7'));
legend.add(makeRow('ffc90e', 'Permanente a Estacional-8'));
legend.add(makeRow('7f7f7f', 'Permanente Efimera-9'));
legend.add(makeRow('c3c3c3', 'Efímera Estacional-10'));
var paleta = ['ffffff','0000ff','22b14c','d1102d','99d9ea','b5e61d','e6a1aa','ff7f27','ffc90e','7f7f7f','c3c3c3'];
var cobertura = ['Ningún cambio-0','Permanente-1','Nueva Permanente-2','Perdida Permanente-3','Estacional-4','Nueva Estacional-5','Perdida Estacional-6','Estacional a Permanente-7','Permanente a Estacional-8','Permanente Efimera-9','Efímera Estacional-10'];
Map.add(legend);
Map.addLayer(highNDVI,{palette: '#8E44AD'},"highNDVI")
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: departamentos,
  color: 1,
  width: 2
});
Export.image.toDrive({
  image:maxNDVI.clip(roi),
  description: "maxNDVI",
  region:roi,
  maxPixels: 1.0E13,
  scale:30
})
Export.image.toDrive({
  image:highNDVI.clip(roi),
  description: "highNDVI",
  region:roi,
  maxPixels: 1.0E13,
  scale:30
})
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
 // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('8E44AD', 'Biomasa Fot. Muy Activa'));
legend.add(makeRow('e0ffff', 'Area de Barbechos sin Cober'));
legend.add(makeRow('db0000', 'Frecuencia de Anegamiento'));
legend.add(makeRow('54a800', 'Pasturas/CN'));
legend.add(makeRow('0f0f0f', 'Planta Urbana'));
legend.add(makeRow('ab5800', 'Montes'));
Map.add(legend);
Map.addLayer (planta_urbana,{color: 'black'});
Map.addLayer(outline, {palette: '001327'}, 'Deptos');