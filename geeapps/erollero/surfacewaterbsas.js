var planta_urbana = ui.import && ui.import("planta_urbana", "table", {
      "id": "users/santiagobanchero/curso-gee/planta_urbana"
    }) || ee.FeatureCollection("users/santiagobanchero/curso-gee/planta_urbana"),
    departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
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
          [-61.752246159461464, -34.35817977241649]]]),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR");
//Provincias
var total = ee.FeatureCollection("users/joseserafinig/Argentina/provincias");
var roi = total.filterMetadata('provincia','equals','Buenos Aires');
var collection = ee.ImageCollection ("COPERNICUS/S2_SR")
    .filterDate('2021-08-01','2021-10-30')
Map.setOptions("HYBRID")
Map.setCenter(-61.08436, -36.42598, 14);   
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
var s2filtered = s2.filterDate('2021-08-01','2021-10-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
                  .map(maskS2clouds)
                  .select('B4', 'B8','B11','B8A','B5');
var bands = ('B4', 'B8','B11','B8A','B5');
var composite = s2filtered.median();
// Display the results.
var zona = composite.clip(roi)
Map.addLayer(zona, {bands: ['B8', 'B11', 'B4'], min: 0.01636, max: 0.398}, 'RGB');
//////////////////////////////////////////////////////////////
// Asset List
//////////////////////////////////////////////////////////////
var gsw = ee.Image('JRC/GSW1_3/GlobalSurfaceWater');
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
  name: "Water Occurrence (1984-2020)",
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
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: departamentos,
  color: 1,
  width: 2
});
Map.addLayer (planta_urbana,{color: 'black'}, 'Ejidos');
Map.addLayer(outline, {palette: '001327'}, 'Deptos');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Distribución temporal de las superficies de agua 1984 - 2020 ' 
    , {fontWeight: 'bold', fontSize: '24px'}));