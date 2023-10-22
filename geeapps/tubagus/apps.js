var batas_jatinangor = ui.import && ui.import("batas_jatinangor", "table", {
      "id": "projects/ee-tubagus/assets/ProjekRS_UNPAD/batas_unpad_jatinangor"
    }) || ee.FeatureCollection("projects/ee-tubagus/assets/ProjekRS_UNPAD/batas_unpad_jatinangor"),
    Jatinangor = ui.import && ui.import("Jatinangor", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.742119209593,
                -6.89291085741258
              ],
              [
                107.742119209593,
                -6.94812392084939
              ],
              [
                107.80323065978831,
                -6.94812392084939
              ],
              [
                107.80323065978831,
                -6.89291085741258
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
        [[[107.742119209593, -6.89291085741258],
          [107.742119209593, -6.94812392084939],
          [107.80323065978831, -6.94812392084939],
          [107.80323065978831, -6.89291085741258]]], null, false),
    FAR = ui.import && ui.import("FAR", "table", {
      "id": "projects/ee-tubagus/assets/ProjekRS_UNPAD/FAR_2021"
    }) || ee.FeatureCollection("projects/ee-tubagus/assets/ProjekRS_UNPAD/FAR_2021"),
    Data_FAR = ui.import && ui.import("Data_FAR", "table", {
      "id": "projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/Table_Jatinangor"
    }) || ee.FeatureCollection("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/Table_Jatinangor"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/FAR_2017"
    }) || ee.FeatureCollection("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/FAR_2017");
//variabel peta 
var Map = ui.Map();
Map.setControlVisibility(true);
Map.centerObject(Jatinangor, 14);
var Map2 = ui.Map();
Map2.setControlVisibility(true);
Map2.centerObject(Jatinangor, 14);
var basecolor ={"opacity":1,"bands":["RED","GREEN","BLUE"],
"min":351,"max":1869,"gamma":1};
var base2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/basemap2017");
Map.addLayer(base2017,basecolor, '',0);
Map2.addLayer(base2017,basecolor, '',0);
var base2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/basemap2021");
Map.addLayer(base2021,basecolor, '',0);
Map2.addLayer(base2021,basecolor, '',0);
var ndvicolor = {"opacity":1,"bands":["NDVI"],"min":-1, "max":1,
"palette":["ffffff","ffffff","ffffff","ffffff","ffffff","ffffff","ffffff",
"814f2c","b66f3d","dc903c","f1b555","ffd660","72ce00",
"2da301","006800","025e02","0b3f0a"]
};
var ndvi2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndvi2017");
Map.addLayer(ndvi2017,ndvicolor, '',0);
Map2.addLayer(ndvi2017,ndvicolor, '',0);
var ndvi2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndvi2021");
Map.addLayer(ndvi2021,ndvicolor, '',0);
Map2.addLayer(ndvi2021,ndvicolor, '',0);
var bsicolor = {"opacity":1,"bands":["B11"],"min":-1, "max":1,
"palette":["2cad2a","2eb62c","57c84d","83d475","abe098",
"c5e8b7","c97f2a","c27726","ba6f22","b3671e","ab5f1a","462e1a"]};
var bsi2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/bsi2017");
Map.addLayer(bsi2017,bsicolor, '',0);
Map2.addLayer(bsi2017,bsicolor, '',0);
var bsi2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/bsi2021");
Map.addLayer(bsi2021,bsicolor, '',0);
Map2.addLayer(bsi2021,bsicolor, '',0);
var ndmicolor = {"opacity":1,"bands":["NDMI"],"min":-1, "max":1,"palette":
["ffffff","ffc40c","eeaa0d","de900f","cd7710","bd5d12",
"3cb371","30a478","24957f","188785","0c788c","006993"]};
var ndmi2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndmi2017");
Map.addLayer (ndmi2017, ndmicolor, '',0);
Map2.addLayer (ndmi2017, ndmicolor, '',0);
var ndmi2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndmi2021");
Map.addLayer (ndmi2021, ndmicolor, '',0);
Map2.addLayer (ndmi2021, ndmicolor, '',0);
var ndwicolor = {"opacity":1,"bands":["NDWI"],"min":-1,"max":0.6,
"palette":["ffffff","2eb62c","57c84d","83d475","abe098",
"c5e8b7","0000ff","0000ff","0000ff","0000ff","0000ff","0000ff"]};
var ndwi2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndwi2017");
Map.addLayer (ndwi2017, ndwicolor, '',0);
Map2.addLayer (ndwi2017, ndwicolor, '',0);
var ndwi2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndwi2021");
Map.addLayer (ndwi2021, ndwicolor, '',0);
Map2.addLayer (ndwi2021, ndwicolor, '',0);
var lstcolor = {"opacity":1,"bands":["LST"],"min":20.5,"max":26.7,
"palette":["040274","040281","0502a3","0502b8","0502ce","0502e6",
"0602ff","235cb1","307ef3","269db1","30c8e2","32d3ef","3be285",
"3ff38f","86e26f","3ae237","b5e22e","d6e21f","fff705","ffd611",
"ffb613","ff8b13","ff6e08","ff500d","ff0000","de0101","c21301","a71001","911003"]};
var lst2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/lst2017");
Map.addLayer (lst2017, lstcolor, '',0);
Map2.addLayer (lst2017, lstcolor, '',0);
var lst2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/lst2021");
Map.addLayer (lst2021, lstcolor, '',0);
Map2.addLayer (lst2021, lstcolor, '',0);
var tvdicolor = {"opacity":1,"bands":["LST"],
"palette":["040274","040281","0502a3","0502b8","0502ce",
"0502e6","0602ff","235cb1","307ef3","269db1","30c8e2",
"32d3ef","3be285","3ff38f","86e26f","3ae237","b5e22e",
"d6e21f","fff705","ffd611","ffb613","ff8b13","ff6e08",
"ff500d","ff0000","de0101","c21301","a71001","911003"]};
var tvdi2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/tvdi2017");
Map.addLayer (tvdi2017, tvdicolor, '',0);
Map2.addLayer (tvdi2017, tvdicolor, '',0);
var tvdi2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/tvdi2021");
Map.addLayer (tvdi2021, tvdicolor, '',0);
Map2.addLayer (tvdi2021, tvdicolor, '',0);
var ndbicolor = {"opacity":1,"bands":["NDBI"],"min":-0.3872405582052389,"max":0.22150076412633274,
"palette":["165dff","33ff0e","55ff1d","ff3c10","ff3d1d"]};
var ndbi2017 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndbi2017");
Map.addLayer (ndbi2017, ndbicolor, '',0);
Map2.addLayer (ndbi2017, ndbicolor, '',0);
var ndbi2021 = ee.Image("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/ndbi2021");
Map.addLayer (ndbi2021, ndbicolor, '',0);
Map2.addLayer (ndbi2021, ndbicolor, '',0);
var FAR2017 = ee.FeatureCollection("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/FAR_2017");
Map.addLayer(FAR2017,['red'],'',0)
Map2.addLayer(FAR2017,['red'],'',0)
var FAR2021 = ee.FeatureCollection("projects/ee-tubagus/assets/AppsProjek_FIX/Jatianangor/FAR_2021");
Map.addLayer(FAR2021,['red'],'',0)
Map2.addLayer(FAR2021,['red'],'',0)
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: Map,
  secondPanel: Map2,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([Map, Map2]);
var Type = {
  'Base Map 2017': [0, 1, 2,3,4,5,6,7 ,8,9,10,11,12,13,14,15,16,17],
  'Base Map 2021': [1, 0, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
  'NDVI 2017': [2, 0, 1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
  'NDVI 2021': [3, 0, 1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
  'BSI 2017': [4, 0, 1,2, 3,5,6,7,8,9,10,11,12,13,14,15,16,17],
  'BSI 2021': [5, 0, 1,2, 3, 4,6,7,8,9,10,11,12,13,14,15,16,17],
  'NDMI 2017': [6, 0, 1,2, 3,4, 5,7,8,9,10,11,12,13,14,15,16,17],
  'NDMI 2021': [7, 0, 1,2,3, 4,5,6,8,9,10,11,12,13,14,15,16,17],
  'NDWI 2017': [8, 0, 1,2, 3,4, 5,6,7,9,10,11,12,13,14,15,16,17],
  'NDWI 2021': [9, 0, 1,2,3, 4,5,6,7,8,10,11,12,13,14,15,16,17],
  'LST 2017': [10, 0, 1,2, 3,4, 5,6,7,8,9,11,12,13,14,15,16,17],
  'LST 2021': [11, 0, 1,2,3, 4,5,6,7,8,9,10,12,13,14,15,16,17],
  'TVDI 2017': [12, 0, 1,2,3, 4,5,6,7,8,9,10,11,13,14,15,16,17],
  'TVDI 2021': [13, 0, 1,2,3, 4,5,6,7,8,9,10,11,12,14,15,16,17],
  'NDBI 2017': [14, 0, 1,2,3, 4,5,6,7,8,9,10,11,12,13,15,16,17],
  'NDBI 2021': [15, 0, 1,2,3, 4,5,6,7,8,9,10,11,12,13,14,16,17],
  'FAR 2017': [16, 0, 1,2,3, 4,5,6,7,8,9,10,11,12,13,14,15,17],
  'FAR 2021': [17, 0, 1,2,3, 4,5,6,7,8,9,10,11,12,13,14,15,16]
};
//select box
var select = ui.Select({
  items: Object.keys(Type),
  onChange:
  function(key) {
     Map.layers().get(Type[key][0]).setShown(true);
     Map.layers().get(Type[key][1]).setShown(false);
     Map.layers().get(Type[key][2]).setShown(false);
     Map.layers().get(Type[key][3]).setShown(false);
     Map.layers().get(Type[key][4]).setShown(false);
     Map.layers().get(Type[key][5]).setShown(false);
     Map.layers().get(Type[key][6]).setShown(false);
     Map.layers().get(Type[key][7]).setShown(false);
     Map.layers().get(Type[key][8]).setShown(false);
     Map.layers().get(Type[key][9]).setShown(false);
     Map.layers().get(Type[key][10]).setShown(false);
     Map.layers().get(Type[key][11]).setShown(false);
     Map.layers().get(Type[key][12]).setShown(false);
     Map.layers().get(Type[key][13]).setShown(false);
     Map.layers().get(Type[key][14]).setShown(false);
     Map.layers().get(Type[key][15]).setShown(false);
     Map.layers().get(Type[key][16]).setShown(false);
     Map.layers().get(Type[key][17]).setShown(false);
  }
});
var select2 = ui.Select({
  items: Object.keys(Type),
  onChange: function(key) {
     Map2.layers().get(Type[key][0]).setShown(true);
     Map2.layers().get(Type[key][1]).setShown(false);
     Map2.layers().get(Type[key][2]).setShown(false);
     Map2.layers().get(Type[key][3]).setShown(false);
     Map2.layers().get(Type[key][4]).setShown(false);
     Map2.layers().get(Type[key][5]).setShown(false);
     Map2.layers().get(Type[key][6]).setShown(false);
     Map2.layers().get(Type[key][7]).setShown(false);
     Map2.layers().get(Type[key][8]).setShown(false);
     Map2.layers().get(Type[key][9]).setShown(false);
     Map2.layers().get(Type[key][10]).setShown(false);
     Map2.layers().get(Type[key][11]).setShown(false);
     Map2.layers().get(Type[key][12]).setShown(false);
     Map2.layers().get(Type[key][13]).setShown(false);
     Map2.layers().get(Type[key][14]).setShown(false);
     Map2.layers().get(Type[key][15]).setShown(false);
     Map2.layers().get(Type[key][16]).setShown(false);
     Map2.layers().get(Type[key][17]).setShown(false);
  }
});
//////////////////////////////////////////
var data = ui.Panel([]);
data.style().set({position: 'top-left',border:'1px solid gray',padding:'2px',width:'105px'});
var data2 = ui.Panel([]);
data2.style().set({position: 'top-right',border:'1px solid gray',padding:'2px',width:'105px'});
select.setPlaceholder('Pilih Peta...');
select2.setPlaceholder('Pilih Peta...');
data.add(select);
data2.add(select2);
Map.add(data);
Map2.add(data2);
//////////////////////////////////////////
var text = ui.Label(
    'Aplikasi GEE Universitas Padjadjaran - Kampus Jatinangor', {fontWeight: 'bold',fontSize: '17px'});
var toolPanel = ui.Panel([text], 'flow', {width: '250px'});
ui.root.widgets().add(toolPanel);
ui.root.widgets().reset([toolPanel]);
ui.root.widgets().add(splitPanel);
var link = ui.Label(
    'Panduan penggunaan aplikasi', {},
    'https://sites.google.com/view/antaru-id/panduan');
var tahuntersedia = ui.Panel([
  ui.Label('Perbandingan Peta Tahun 2017 dan 2021', {'font-size': '11px'}), link]);
toolPanel.add(tahuntersedia);
//////////////////////////////////////////
var layerProperties = {
    'BSI': {
    name: 'B11',
   legend: [
      {'Non Vegetasi': '#462e1a'},{'Vegetasi Sedang': '#c5e8b7'}, {'Vegetasi Rapat': '#2cad2a'}
    ],
    defaultVisibility: false
  },
    'LST': {
    name: 'LST',
   legend: [
      {'22°C': '#040274'},{'24°C': '#32d3ef'}, {'26°C': '#3ae237'}, {'28°C': '#fff705'},
      {'30°C': '#a71001'}
    ],
    defaultVisibility: false
  },
   'NDBI': {
    name: 'NDBI',
   legend: [
      {'Lahan Terbangun': '#ff0000'},{'Vegetasi Rendah': '#33ff0e'}, {'Vegetasi Tinggi': '#165dff'}    ],
    defaultVisibility: false
  },
   'NDMI': {
    name: "NDMI",
   legend: [
      {'Kelembaban Tinggi': '#006993'},{'Kelembaban Rendah': '#3cb371'}, {'Kering': '#bd5d12'}
    ],
    defaultVisibility: false
  },
   'NDVI': {
    name: "NDVI",
   legend: [{'Vegetasi Tinggi': '#0b3f0a'},
      {'Vegetasi Rendah': '#0b3f0a'},{'Non Vegetasi': '#f1b555'}
    ],
    defaultVisibility: false
  },
   'NDWI': {
    name: "NDWI",
   legend: [{'Badan Air': '#0000ff'},
      {'Non Badan Air': '#abe098'}
    ],
    defaultVisibility: false
  },
   'TVDI': {
    name: "LST",
   legend: [{'Vegetasi Basah': '#040274'},
      {'Vegetasi Cukup Basah': '#3be285'},{'Vegetasi Kering': '#ffd611'}, {'Vegetasi Sangat Kering': '#a71001'}],
    defaultVisibility: false
  }
};
var mapPanel = ui.Map();
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Pilih Legenda:', {'font-size': '16px', 'fontWeight': 'bold'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
////////////////////////////////////
// Apply a non-linear stretch to the population data for visualization.
function colorStretch(image) {
  return image.divide(POPULATION_VIS_MAX_VALUE)
      .pow(1 / POPULATION_VIS_NONLINEARITY);
}
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
var selectedPoints = [];
function getSelectedCountries() {
  return Data_FAR.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
function makeResultsBarChart(countries) {
  var chart = ui.Chart.feature.byFeature(countries, 'TITLE')
    .setSeriesNames([
          'FAR 2017', 'FAR 2021', 'UGS 2017', 'UGS 2021'
        ]);
  chart.setChartType('ColumnChart');
  chart.setOptions({
    title: 'Floor Area Ratio vs Urban Green Space',
    vAxis: {title: 'Area (Hectares)'},
    hAxis: {title: null, minValue: 0},
    colors: ['#a71001', 'red', '#2cad2a', 'green']
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
function makeResultsTable(countries) {
  var table = ui.Chart.feature.byFeature(countries, 'TITLE')
  .setSeriesNames([
          'FAR 2017', 'FAR 2021', 'UGS 2017', 'UGS 2021'
        ]);
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected countries.
function updateOverlay() {
  var overlay = getSelectedCountries();
  Map.layers().set(2, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedCountries());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('Klik Area Kampus');
  resultsPanel.widgets().reset([instructionsLabel]);
}
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Display results as table',
        value: makeResultsBarChart,
      },
      {
        label: 'Display results as chart',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Clear results', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '600px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-left',border:'1px solid gray'}});
Map.add(resultsPanel);
clearResults();
// Legend creation
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 8px 0 0',
      }
  })
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 4px', fontSize: '12px'}
  })
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin:'0 0 8px 15px'}
  })
}
////////////////////////////////////
Map.addLayer(batas_jatinangor)
Map2.addLayer(batas_jatinangor)