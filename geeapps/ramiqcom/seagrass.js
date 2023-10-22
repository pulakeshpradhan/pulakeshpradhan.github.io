var indonesia = ui.import && ui.import("indonesia", "geometry", {
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
    allen = ui.import && ui.import("allen", "image", {
      "id": "ACA/reef_habitat/v2_0"
    }) || ee.Image("ACA/reef_habitat/v2_0"),
    wcmc = ui.import && ui.import("wcmc", "table", {
      "id": "projects/ee-ramiqcom-bluecarbon/assets/WCMC013014-Seagrasses-Py-v7_1_Indonesia"
    }) || ee.FeatureCollection("projects/ee-ramiqcom-bluecarbon/assets/WCMC013014-Seagrasses-Py-v7_1_Indonesia"),
    seagrassS2 = ui.import && ui.import("seagrassS2", "image", {
      "id": "projects/ee-ramiqcom-bluecarbon/assets/s2_seagrass_indonesia_2020"
    }) || ee.Image("projects/ee-ramiqcom-bluecarbon/assets/s2_seagrass_indonesia_2020"),
    lipi = ui.import && ui.import("lipi", "table", {
      "id": "projects/ee-ramiqcom-bluecarbon/assets/data_lamun_lipi2018"
    }) || ee.FeatureCollection("projects/ee-ramiqcom-bluecarbon/assets/data_lamun_lipi2018");
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
  value: 'Indonesia Seagrass Cover',
  style: { color: 'forestgreen', fontSize: '25px', fontWeight: 'bold', margin: '20px' }
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
// Layer checkbox S2
var layerPanelS2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanelS2);
var checkboxS2 = ui.Checkbox({
  label: 'Sentinel-2 2020',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? seagrassS2Layer.setShown(true) : seagrassS2Layer.setShown(false);
  }
});
layerPanelS2.add(checkboxS2);
var colorS2 = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'red',
    width: '50px'
  }
});
layerPanelS2.add(colorS2);
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
  value: 'Overall accuracy: 0.81',
  style: { fontSize: '15px', fontWeight: 'bold' }
});
accPanel.add(acccuracyLabel);
// Kappa index
var kappaLabel = ui.Label({
  value: 'Kappa index: 0.70',
  style: { fontSize: '15px', fontWeight: 'bold' }
});
accPanel.add(kappaLabel);
// Layer checkbox Allen
var layerPanelAllen = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanelAllen);
var checkboxAllen = ui.Checkbox({
  label: 'Allen',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? allenSeagrassLayer.setShown(true) : allenSeagrassLayer.setShown(false);
  }
});
layerPanelAllen.add(checkboxAllen);
var colorAllen = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'green',
    width: '50px'
  }
});
layerPanelAllen.add(colorAllen);
// Layer checkbox Lipi
var layerPanelLipi = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanelLipi);
var checkboxLipi = ui.Checkbox({
  label: 'LIPI',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? lipiSeagrassLayer.setShown(true) : lipiSeagrassLayer.setShown(false);
  }
});
layerPanelLipi.add(checkboxLipi);
var colorLipi = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'blue',
    width: '50px'
  }
});
layerPanelLipi.add(colorLipi);
// Layer checkbox wcmc
var layerPanelWcmc = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    stretch: 'horizontal',
  }
});
layerPanel.add(layerPanelWcmc);
var checkboxWcmc = ui.Checkbox({
  label: 'WCMC',
  value: true,
  style: { fontSize: '15px' },
  onChange: function(value){
    value === true ? wcmcSeagrass.setShown(true) : wcmcSeagrass.setShown(false);
  }
});
layerPanelWcmc.add(checkboxWcmc);
var colorWcmc = ui.Label({
  value: '|',
  style: {
    backgroundColor: 'orange',
    width: '50px'
  }
});
layerPanelWcmc.add(colorWcmc);
// Area size table
// Table label
var tableLable = ui.Label({
  value: 'Seagrass area',
  style: { fontSize: '18px', fontWeight: 'bold' }
});
panel.add(tableLable);
// Tabel
var dataTable = [
  ['Data', 'Area (Ha)', 'Region'],
  ['Sentinel-2 2020', 1409564, 'Indonesia'],
  ['Allen', 578026, 'Indonesia'],
  ['LIPI', 286922, 'Indonesia'],
  ['WCMC', 2988677, 'Indonesia'],
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
  value: 'Sentine-2 2020 - 2022',
  style: { fontSize: '15px' }
});
panel.add(dataLabel);
var allenLabel = ui.Label({
  value: 'Allen Coral Atlas',
  style: { fontSize: '15px' }
});
panel.add(allenLabel);
var lipiLabel = ui.Label({
  value: 'LIPI Seagrass Cover',
  style: { fontSize: '15px' }
});
panel.add(lipiLabel);
var wcmcLabel = ui.Label({
  value: 'UNEP-WCMC Seagrass cover',
  style: { fontSize: '15px' }
});
panel.add(wcmcLabel);
// WCMC
var wcmcSeagrass = ui.Map.Layer(wcmc, { color: 'orange' }, 'WCMC Seagrass');
Map.add(wcmcSeagrass);
// LIPI seagrass
var lipiSeagrassLayer = ui.Map.Layer(lipi, { color: 'blue' }, 'LIPI Seagrass');
Map.add(lipiSeagrassLayer);
// Allen seagrass
var allenSeagrass = allen.select('benthic').eq(14).clip(indonesia);
var allenSeagrassLayer = ui.Map.Layer(allenSeagrass, { palette: 'green' }, 'Allen Seagrass');
Map.add(allenSeagrassLayer);
// Seagrass S2
var seagrassS2Layer = ui.Map.Layer(seagrassS2, { palette: 'red' }, 'Seagrass S2');
Map.add(seagrassS2Layer);
/*
// Area
calculateArea(indonesia);
function calculateArea(geometry){
  var imageArea = ee.Image.pixelArea().divide(10000);
  var areaS2 = seagrassS2.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('S2', areaS2.get('benthic'));
  var areaAllen = allenSeagrass.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('Allen', areaAllen.get('benthic'));
  var lipiRaster = ee.Image(0).toByte().paint({
    featureCollection: lipi,
    color: 1
  }).selfMask();
  Map.addLayer(lipiRaster, { palette: 'blue' }, 'LIPI Raster');
  Export.image.toAsset({
    image: lipiRaster,
    scale: 30,
    region: indonesia,
    crs: 'EPSG:4326',
    assetId: 'projects/ee-ramiqcom-bluecarbon/assets/lipi_seagrass_raster_30m',
    maxPixels: 1e13
  });
  var areaLipi = lipiRaster.multiply(imageArea).reduceRegion({
    geometry: geometry,
    scale: 30,
    reducer: ee.Reducer.sum(),
    bestEffort: true
  });
  print('LIPI', areaLipi.get('constant'));
  var areaWcmc = wcmc.geometry(1).area(1).divide(10000);
  print('WCMC', areaWcmc);
}
*/