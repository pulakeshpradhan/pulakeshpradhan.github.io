var mangrove = ui.import && ui.import("mangrove", "imageCollection", {
      "id": "projects/ee-ramiqcom-bluecarbon/assets/landsatMangroveYear"
    }) || ee.ImageCollection("projects/ee-ramiqcom-bluecarbon/assets/landsatMangroveYear"),
    indonesia = ui.import && ui.import("indonesia", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.64558599781141,
                5.879321454285523
              ],
              [
                94.64558599781141,
                -10.918641191173833
              ],
              [
                141.4033984978114,
                -10.918641191173833
              ],
              [
                141.4033984978114,
                5.879321454285523
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
        [[[94.64558599781141, 5.879321454285523],
          [94.64558599781141, -10.918641191173833],
          [141.4033984978114, -10.918641191173833],
          [141.4033984978114, 5.879321454285523]]], null, false),
    karimun = ui.import && ui.import("karimun", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                110.39596238861088,
                -5.7519714425785144
              ],
              [
                110.39596238861088,
                -5.903618848577798
              ],
              [
                110.52367845306401,
                -5.903618848577798
              ],
              [
                110.52367845306401,
                -5.7519714425785144
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[110.39596238861088, -5.7519714425785144],
          [110.39596238861088, -5.903618848577798],
          [110.52367845306401, -5.903618848577798],
          [110.52367845306401, -5.7519714425785144]]], null, false),
    adm2 = ui.import && ui.import("adm2", "table", {
      "id": "projects/sat-io/open-datasets/field-maps/edge-matched-humanitarian/adm2_polygons"
    }) || ee.FeatureCollection("projects/sat-io/open-datasets/field-maps/edge-matched-humanitarian/adm2_polygons"),
    klhkMangrove = ui.import && ui.import("klhkMangrove", "table", {
      "id": "projects/ee-ramiqcom-bluecarbon/assets/petamangroveklhk2021"
    }) || ee.FeatureCollection("projects/ee-ramiqcom-bluecarbon/assets/petamangroveklhk2021"),
    klhkMangroveRaster = ui.import && ui.import("klhkMangroveRaster", "image", {
      "id": "projects/ee-ramiqcom-bluecarbon/assets/klhk_mangrove_raster_30m"
    }) || ee.Image("projects/ee-ramiqcom-bluecarbon/assets/klhk_mangrove_raster_30m");
// Berau geometry
var berau = adm2.filter(ee.Filter.eq('adm2_name', 'Berau')).geometry();
// Center the map
Map.setCenter(116.99835716607052,-0.6054515100943982, 5);
// Root
var root = ui.root;
// Main panel
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {
    width: '400px',
    padding: '10px'
  }
});
root.add(panel);
// Title
var titleLabel = ui.Label({
  value: 'Indonesia Mangrove Cover 1990 - 2020',
  style: { color: 'purple', fontSize: '25px', fontWeight: 'bold', margin: '20px' }
});
panel.add(titleLabel);
// Layer panel
var layerPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {
    stretch: 'horizontal',
    padding: '1px',
    border: '0.5px solid black',
    margin: '10px'
  }
});
panel.add(layerPanel);
// Layer list
var layerLabel = ui.Label({
  value: 'Layer list',
  style: { fontSize: '18px', fontWeight: 'bold' }
});
layerPanel.add(layerLabel);
// Layer checkbox 2020
var layerPanel2020 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanel2020);
var checkbox2020 = ui.Checkbox({
  label: '2020',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? mangrove2020Layer.setShown(true) : mangrove2020Layer.setShown(false);
  }
});
layerPanel2020.add(checkbox2020);
var color2020 = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'red',
    width: '50px'
  }
});
layerPanel2020.add(color2020);
// Layer checkbox 2000
var layerPanel2000 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanel2000);
var checkbox2000 = ui.Checkbox({
  label: '2000',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? mangrove2000Layer.setShown(true) : mangrove2000Layer.setShown(false);
  }
});
layerPanel2000.add(checkbox2000);
var color2000 = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'green',
    width: '50px'
  }
});
layerPanel2000.add(color2000);
// Layer checkbox 1990
var layerPanel1990 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanel1990);
var checkbox1990 = ui.Checkbox({
  label: '1990',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? mangrove1990Layer.setShown(true) : mangrove1990Layer.setShown(false);
  }
});
layerPanel1990.add(checkbox1990);
var color1990 = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'blue',
    width: '50px'
  }
});
layerPanel1990.add(color1990);
// Accuracy panel
var accPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(accPanel);
// Overall accuracy
var acccuracyLabel = ui.Label({
  value: 'Overall accuracy: 0.77',
  style: { fontSize: '15px', fontWeight: 'bold' }
});
accPanel.add(acccuracyLabel);
// Kappa index
var kappaLabel = ui.Label({
  value: 'Kappa index: 0.41',
  style: { fontSize: '15px', fontWeight: 'bold' }
});
accPanel.add(kappaLabel);
// Layer checkbox KLHK 2021
var layerPanelKlhk = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanelKlhk);
var checkboxKlhk = ui.Checkbox({
  label: 'KLHK 2021',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? klhkLayer.setShown(true) : klhkLayer.setShown(false);
  }
});
layerPanelKlhk.add(checkboxKlhk);
var colorKlhk = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'orange',
    width: '50px'
  }
});
layerPanelKlhk.add(colorKlhk);
// Area size table
// Table label
var tableLable = ui.Label({
  value: 'Mangrove area',
  style: { fontSize: '18px', fontWeight: 'bold' }
});
panel.add(tableLable);
// Tabel
var dataTable = [
  ['Data', 'Area (Ha)', 'Region'],
  ['1990', 4427522, 'Indonesia'],
  ['2000', 2779534, 'Indonesia'],
  ['2022', 2689252, 'Indonesia'],
  ['KLHK 2021', 3367666, 'Indonesia'],
  ['1990', 65310, 'Berau'],
  ['2000', 51916, 'Berau'],
  ['2022', 46998, 'Berau'],
  ['KLHK 2021', 74224, 'Berau'],
  ['1990', 298, 'Karimunjawa'],
  ['2000', 350, 'Karimunjawa'],
  ['2022', 305, 'Karimunjawa'],
  ['KLHK 2021', 456, 'Karimunjawa'],
];
var tableArea = ui.Chart({
  chartType: 'Table',
  dataTable: dataTable,
});
tableArea.setOptions({
  pageSize: 20,
});
panel.add(tableArea);
// Data source
var sourceLabel = ui.Label({
  value: 'Source:',
  style: { fontSize: '18px', fontWeight: 'bold' }
});
panel.add(sourceLabel);
// Data source
var dataLabel = ui.Label({
  value: 'Landsat 4, 5, 7, 8, and 9 1986 - 2023',
  style: { fontSize: '15px' }
});
panel.add(dataLabel);
// Data source
var klhkLabel = ui.Label({
  value: 'KLHK Mangrove Cover 2021',
  style: { fontSize: '15px' }
});
panel.add(klhkLabel);
// Mangrove image
var klhkLayer = ui.Map.Layer(klhkMangroveRaster, { palette: 'orange' }, 'KLHK 2021');
Map.add(klhkLayer);
var mangrove1990 = mangrove.filter(ee.Filter.eq('year', 1990)).first();
var mangrove1990Layer = ui.Map.Layer(mangrove1990, { palette: 'blue' }, '1990');
Map.add(mangrove1990Layer);
var mangrove2000 = mangrove.filter(ee.Filter.eq('year', 2000)).first();
var mangrove2000Layer = ui.Map.Layer(mangrove2000, { palette: 'green' }, '2000');
Map.add(mangrove2000Layer);
var mangrove2020 = mangrove.filter(ee.Filter.eq('year', 2020)).first();
var mangrove2020Layer = ui.Map.Layer(mangrove2020, { palette: 'red' }, '2020');
Map.add(mangrove2020Layer);
/*
// Area
calculateArea(karimun);
function calculateArea(geometry){
  var imageArea = ee.Image.pixelArea().divide(10000);
  var area1990 = mangrove1990.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('1990', area1990.get('mangrove'));
  var area2000 = mangrove2000.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('2000', area2000.get('mangrove'));
  var area2020 = mangrove2020.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('2020', area2020.get('mangrove'));
  var klhkArea = klhkMangroveRaster.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('KLHK 2021', klhkArea.get('constant'));
}
*/