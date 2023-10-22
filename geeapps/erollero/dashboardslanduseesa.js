var departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015");
// This script generates a Land Use / Land Cover Map of Australia for
// Local Government Areas of Australia
// Anyone can change a few variable to generate a map for another LGA
// Time period can also be changed
// The script exports the LULC classification data for further processing
// Script Author: Palash Basak
// https://www.linkedin.com/in/palashbasak
// July 2022
// Data Source and Algorithms:
// Dynamic World is a 10m near-real-time (NRT) Land Use/Land Cover (LULC) dataset
// Processed from Sentinel-2 Satellite Images of European Space Agency
// https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1
// Instructions for modifying the code to get LULC map for any given council and Year
// Update the following variables
// 
// Find a list of all LGA Name and their Code at the end of the script in alphabetical order
// Choose start and end date between 2015-06-27 to present
// Change the Zoom level depending on the size of the LGA
// Change the opacity to see through the LULC map; no opacity is applied by default
//////////////////////////////////////////////////////////////////////
// LGA name must be the same as the ones in the appendix of this script
// This list came from the Australian Statistical Geography Standard (ASGS) digital boundary shapefile
// The name should be wrapped with a single/double quotation mark
// By default, the script generates a LULC map for Wingecarribee Shire Council of NSW
var total = ee.FeatureCollection("users/joseserafinig/Argentina/provincias");
var lgaBoundary = total.filterMetadata('provincia','equals','Buenos Aires');
var lgaBoundary1 = 'Buenos Aires'; 
// Optional variables to change
var startDate = '2021-01-01'; // Enter the dates in YYYY-mm-dd format, keep the quotatio marks
var endDate = '2021-12-31'; // Must be greater than startDate
var zoomLevel = 8; // Choose a value from 6 to 14, a samller zoom level will show larger area
var opacityLULC = 1; // Choose a value below 1, i.e., 0.80 for 80% opacity level
//////////////////////////////////////////////////////////////////////
// STEP 1: Define the LGA Boundary
// Local Government Areas - 2021 - Shapefile
// Sourced from Australian Statistical Geography Standard (ASGS) Edition 3
// https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026/access-and-downloads/digital-boundary-files
// Extract the Geometry information from the boundary file
var lgaBoundary_geometry = lgaBoundary.geometry();
// Zoom to the LGA Area
Map.centerObject(lgaBoundary, zoomLevel);
// STEP 2: Add Sentinel-2 Satellite Image Composite for the same LULC study period
// By default, the Sentinel-2 image layer will be turned off
// Turn it on from the 'Layers' list
// Sentinel-2 Data Processing
// https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED
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
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate(startDate, endDate)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.042,
  max: 0.36,
  bands: ['B8', 'B11', 'B4'],
  gamma: 0.85
};
Map.addLayer(dataset.median().clip(lgaBoundary), visualization, 'Sentinel-2 Composite Image - Median', false);
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first().clip(lgaBoundary_geometry);
var visualization = {
  bands: ['Map'],
};
Map.addLayer(dataset, visualization, "Landcover",true);
// STEP 3: Process Dynamic World LULC Data
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date(startDate, endDate))
  .filter(ee.Filter.bounds(lgaBoundary_geometry));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: opacityLULC,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#f096ff', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
// Clip the composite and add it to the Map
//Map.addLayer(dwComposite.clip(lgaBoundary_geometry), dwVisParams, 'Classified LULC Composite', false); 
// STEP 4: Create a Top-1 Probability Hillshade Visualization
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(lgaBoundary),
  hillshadeVisParams, 'LULC Probability Hillshade',false);
// STEP 6: Add Legend, title and citation panels
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'LULC Dynamic World (NRT)',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#f096ff', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1'];
// name of the legend
var names = ['Water', 'Trees', 'Grass', 'Flooded Vegetation', 
    'Crops', 'Shrub and Scrub', 'Built Area', 'Bare Ground', 'Snow & Ice'];
// Add color and and names
for (var i = 0; i <9; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add the legend to map
//Map.add(legend);
// set position of panel
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
/* 
// Create legend title
var mapTitle1 = ui.Label({
  value: 'Land Use/Land Cover (LULC) of ' + lgaBoundary1 + ' Province ',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0',
    textAlign: 'center'
    }
});
*/
var mapTitle2 = ui.Label({
  value: 'Between ' + startDate + ' and ' + endDate,
  style: {
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0',
    textAlign: 'center'
    }
});
// Add the title to the panel
//title.add(mapTitle1);
//title.add(mapTitle2);
//Map.add(title);
// Add Citation
var citation = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '4px 8px',
  }
});
var label = ui.Label('Author: Eduardo Rollero  |  Data: Dynamic World (DW) - ESA WorldCover 2020');
citation.add(label);
Map.add(citation);
// STEP 7: Export the Images
// Export the LULC Map for further processing, analysis or visualization 
// in GIS Applications such as ArcGIS Pro or QGIS
// The exported images will be saved in your Google Drive
// Depending on the area of the LGA, you may get multiple tiles
// From the 'Tasks' tab and press the 'RUN' button to start the download process
// Export Raw Composite
Export.image.toDrive({
  image: dwComposite.clip(lgaBoundary_geometry),
  description: 'Raw_Composite_Export',
  fileNamePrefix: 'LGA_Composite_raw',
  region: lgaBoundary_geometry,
  scale: 10,
  maxPixels: 1e10});
// Top1 Probability Hillshade Composite
var hillshadeComposite = probabilityHillshade.visualize(hillshadeVisParams);
Export.image.toDrive({
  image: hillshadeComposite.clip(lgaBoundary_geometry),
  description: 'Top1_Probability_Hillshade_Composite_Export',
  fileNamePrefix: 'LGA_Composite_hillshade',
  region: lgaBoundary_geometry,
  scale: 10,
  maxPixels: 1e10});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Indicar deptos.
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first().clip(lgaBoundary_geometry);
var visualization = {
  bands: ['Map'],
};
//Map.addLayer(dataset, visualization, "Landcover",true);
var collection = ee.ImageCollection ("COPERNICUS/S2_SR")
    .filterDate('2021-09-05','2021-09-16')
Map.setOptions("HYBRID")
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
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Arboles",
    "Matorral",
    "Pasturas-CN",
    "Cultivos",
    "Construcciones",
    "Escasa vegetación",
    "Nieve - hielo",
    "Espejo de Agua",
    "Humedal herbaceo",
    "Manglar",
    "Musgos"
  ],
  "colors": [
    "#006400",
    "#ffbb22",
    "#88B053",
    "#f096ff",
    "#fa0000",
    "#b4b4b4",
    "#f0f0f0",
    "#0064c8",
    "#0096a0",
    "#00cf75",
    "#fae6a0"
  ]};
var paleta  =['#006400','#ffbb22','#88B053','#f096ff','#fa0000','#b4b4b4','#f0f0f0','#0064c8','#0096a0','#00cf75','#fae6a0'];
var paleta2 =['#006400','#ffbb22','#88B053','#f096ff','#fa0000','#b4b4b4','#f0f0f0','#0064c8','#0096a0','#00cf75','#fae6a0'];
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '7px 13px'
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 3px 5px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  Map.add(panel);
}
/*
  // Display map and legend ///////////////////////////////////////////////////////////////////////////////
*/
// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESA WorldCover 10m v100');
var imagen = dataset;
//-----------------------------------------------------------
//1.7 Visualize using charts
// chart that shows class area distribution
/*
var chart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().divide(10000)       // pixel area in ha 
            .addBands(imagen.rename('classification')),
  classBand: 'classification',                     
  region: lgaBoundary,
  reducer: ee.Reducer.sum(),
  scale: 400, //Lin_adjust the resolution
  classLabels: imagen,
})
chart.setOptions({title:'Area por Clase', hAxis: {title: 'Clases'}, vAxis: {title: 'Area (has)'},
                 colors: paleta2})
     .setChartType('ColumnChart')
//print(chart)
chart.style().set({
  position: 'bottom-left',
  width: '450px',
  height: '250px'
});
Map.add(chart);
*/
/******************Grafico de tortas****************************/
/********************************************Gráfico de áreas**************************************************/
var nomes = ['Arboles','Matorral','Pasturas_CN','Cultivos','Construcciones','Escasa vegetación','Nieve - hielo','Agua','Humedal','Manglar','Musgos']
var renomeado = imagen.eq([10,20,30,40,50,60,70,80,90,95,100]).rename(nomes)
print('classes', renomeado)
var area = renomeado.multiply(ee.Image.pixelArea()).divide(10000) //para converter para hectares (ha)
var area_por_classe = area.reduceRegion({
  reducer: ee.Reducer.sum(), //quero somar a área total
  geometry: lgaBoundary,
  scale:100, 
  crs:'EPSG: 4326', 
 // bestEffort: true, 
  maxPixels:1e13})
var area_total = ee.Number(area_por_classe)
print('area total por clase',area_total)
/*Criando listas array*/
var a = ee.Array(area_por_classe.get('Arboles'))
var b = ee.Array(area_por_classe.get('Matorral'))
var c = ee.Array(area_por_classe.get('Pasturas_CN'))
var d = ee.Array(area_por_classe.get('Cultivos'))
var e = ee.Array(area_por_classe.get('Construcciones'))
var f = ee.Array(area_por_classe.get('Escasa vegetación'))
var g = ee.Array(area_por_classe.get('Nieve - hielo'))
var h = ee.Array(area_por_classe.get('Agua'))
var i = ee.Array(area_por_classe.get('Humedal'))
var j = ee.Array(area_por_classe.get('Manglar'))
var k = ee.Array(area_por_classe.get('Musgos'))
var lista = ee.List([a,b,c,d,e,f,g,h,i,j,k])
var Nomes = ee.List(nomes)
var grafico_area = ui.Chart.array.values(lista,0, Nomes)
.setChartType('PieChart')
.setOptions(
  {width: 350,
  height: 450,
  title: 'PROV. BUENOS AIRES; Area por clase (Has)',
  is3D: true,
  colors: paleta})
//print(grafico_area)
grafico_area.style().set({
  position: 'bottom-right',
  width: '450px',
  height: '280px'
});
Map.add(grafico_area);
// Add the maps and title to the ui.root.
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Dashboard LandUse ESA WorldCover 2020 ' 
    , {fontWeight: 'bold', fontSize: '20px'}));
////////////////////////////////////////////////////////////////////////////////////
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(lgaBoundary.style(styling), {}, "LGA Boundary");
//Indicar deptos.
var Districts = departamentos.filterMetadata("LINK","not_equals","Save");
var PA_STYLE = {
  color: '26458d',
  fillColor: '00000000'
};
var HIGHLIGHT_STYLE = {
  color: '8856a7',
  fillColor: '8856a7C0'
};
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
Map.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: true});
Map.style().set({
  cursor: 'crosshair'
});
Map.addLayer(Districts.style(
  PA_STYLE));
// A list of points the user has clicked on, as [lon,lat] tuples
var selectedPoints = [];
// Returns the list of districts the user has selected
function getSelectedDistricts() {
  return Districts.filterBounds(ee
    .Geometry.MultiPoint(
      selectedPoints));
}
var select = ui.Select({
  items: Object.keys( Districts),
  onChange: function(key) {
    print(Districts[key])
    Map.setCenter( Districts[key][0], Districts[key][1]);
  }
});
// Makes a bar chart of the given FeatureCollection of districts areas by name
function makeResultsBarChart(
  Districts) {
  var chart = ui.Chart.image.regions({
      image: area,
      regions: Districts,
      reducer: ee.Reducer.sum(),
      scale: 30,
      seriesProperty: 'DISTRICT'
    })
        .setChartType('ColumnChart');
  chart.setOptions({
    title: 'LULC ESA/partido',
    vAxis: {
     title: 'hectareas'
    },
   hAxis: {
     title: 'Class',
     minValue: 1
    },
    width: 1000,
    height: 300
   });
  chart.style().set({
    stretch: 'both'
  });
  return chart;
 }
// You can add a table of the given FeatureCollection of protected areas by name
// I disabled for now as they are redundant.
 function makeResultsTable(protectedAreas) {
  var table = ui.Chart.image.regions({image:total,regions:Districts,reducer:ee.Reducer.sum(),seriesProperty:'NOMDEP'});
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected district
function updateOverlay() {
  var overlay =
    getSelectedDistricts().style(
      HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(
    overlay));
}
function updateChart() {
  var chartBuilder =
    chartTypeToggleButton.value;
  var chart = chartBuilder(
    getSelectedDistricts());
  resultsPanel.clear().add(chart).add(
    buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(
    2));
  var instructionsLabel = ui.Label(
    ''
    );
  resultsPanel.widgets().reset([
    instructionsLabel
  ]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly
function handleMapClick(location) {
  selectedPoints.push([location.lon,
    location.lat
  ]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index]
    .label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index]
      .label);
    button.value = states[index]
      .value;
    onClick();
  });
  return button;
}
var chartTypeToggleButton =
  ToggleButton(
    [{
        label: 'Display results as a bar chart',
        value: makeResultsBarChart,
      },
      {
        //  label: 'Display results as a table',
        //  value: makeResultsTable,
      }
    ],
    updateChart);
var buttonPanel = ui.Panel(
  [ui.Button('Clear results',
    clearResults)],
  ui.Panel.Layout.Flow(
  'horizontal'), {
    margin: '0 0 0 auto',
    width: '600px',
    height: 'auto'
  });
var resultsPanel = ui.Panel({
  style: {
    position: 'bottom-left'
  }
});
Map.add(resultsPanel);
clearResults();
// Create an inspector panel with a horizontal layout
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow(
    'vertical')
});
// Add a label to the panel
inspector.add(ui.Label(
  'Click to select a District for Stats', {
    fontWeight: 'bold',
    fontSize: '20px'
  }));
// Add the panel to the default map
Map.add(inspector);
// Set the default map's cursor to a "crosshair"
Map.style().set('cursor', 'crosshair');
// Register an onClick handler that populates and shows the inspector panel
Map.onClick(function(coords) {
  inspector.clear();
  inspector.style().set('shown',
    true);
  inspector.add(ui.Label(
    'Loading...', {
      color: 'black'
    }));
  var point = ee.Geometry.Point(
    coords.lon, coords.lat);
  var PApoint = Districts
    .filterBounds(point);
  var o_name = ee.List(PApoint
    .aggregate_array("NOMDEP")).map(
    function(d) {
      return ee.String(d)
    });
  var status = ee.List(PApoint
      .aggregate_array("NOMPROV"))
    .map(function(d) {
      return ee.String(d)
    });
  var y_status = ee.List(PApoint
      .aggregate_array("LINK"))
    .map(function(d) {
      return ee.Number(d)
    });
  var list = ee.List([o_name,status,
    y_status
  ]);
  // Request the value from the server and use the results in a function
  list.evaluate(function(info) {
    inspector.clear();
    // Add a label with the results from the server
    inspector.add(ui.Label({
      value: info +
        '(Name,Province,Code)',
      style: {
        position: 'top-center', fontWeight: 'bold', fontSize: '17px'}}));
    // Add a button to hide the Panel
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector
        .style().set(
          'shown',
          false);
      }
    }));
  });
});