var KCimp = ui.import && ui.import("KCimp", "image", {
      "id": "users/cnilsen/comb_imp"
    }) || ee.Image("users/cnilsen/comb_imp"),
    NHDPlus = ui.import && ui.import("NHDPlus", "table", {
      "id": "users/cnilsen/PugetLowlandsNHDPlusWatershedsNamed"
    }) || ee.FeatureCollection("users/cnilsen/PugetLowlandsNHDPlusWatershedsNamed"),
    TSS = ui.import && ui.import("TSS", "image", {
      "id": "users/cnilsen/TSSLoad"
    }) || ee.Image("users/cnilsen/TSSLoad"),
    PS_AU = ui.import && ui.import("PS_AU", "table", {
      "id": "users/cnilsen/PS_AU"
    }) || ee.FeatureCollection("users/cnilsen/PS_AU"),
    HUC12 = ui.import && ui.import("HUC12", "table", {
      "id": "USGS/WBD/2017/HUC12"
    }) || ee.FeatureCollection("USGS/WBD/2017/HUC12"),
    table = ui.import && ui.import("table", "table", {
      "id": "USGS/WBD/2017/HUC12"
    }) || ee.FeatureCollection("USGS/WBD/2017/HUC12"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_12"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_12");
/*Load modules 
---------------------------------------------------------------------------------------------------- 
*/
var data  = require('users/stormwaterheatmap/apps:data/data_dict_v3')
var Style = require('users/stormwaterheatmap/apps:Modules/Style')
var charts = require('users/stormwaterheatmap/apps:Modules/chart.js')
var legends = require('users/stormwaterheatmap/apps:Modules/legends')
var helpers = require('users/stormwaterheatmap/apps:Modules/helpers')
var fonts = Style.fonts
var input_layers = data.rasters["Input Data Layers"]
var hydrology_layers = data.rasters["Hydrology Data Layers"]
// var objectMerge = function(){
//     var out = {};
//     if(!arguments.length)
//         return out;
//     for(var i=0; i<arguments.length; i++) {
//         for(var key in arguments[i]){
//             out[key] = arguments[i][key];
//         }
//     }
//     return out;
// }
var layerProperties = data.rasters 
//("layer Properties", layerProperties.Precipitation)
var vectors_dict = data.vectors_dict
var watershed_data_set
var rasters = data.rasters
var layer_types = Object.keys(rasters)
//lay out ui elements 
//---------------------------------------------------------------
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0',width:2};
/* Label */ 
var panel_label = helpers.info_panel("1. Select Layer Type:","null")
panel_label.style().set(fonts.H3)
// var layer_label = ui.Label({value:"Display Layer:"})
/* Style */ 
var panel_layout = ui.Panel.Layout.absolute("bottom-left")
//panel_label//.style().set('fontWeight','500')
var panel_style = {position: 'bottom-left',
   border: '1px solid whitesmoke',
        backgroundColor: 'white', 
        margin: "8px",
        padding: "8px"
}//,width:'300px', height:"80%"}
/* Panel */ 
var panel = ui.Panel({style:panel_style})//, layout:panel_layout})//, })
var legendPanel = ui.Panel({style:{position:'top-right',shown:false, minWidth: "16.66%",
  maxWidth:"20%", //maxHeight: "30%"
}
})
var mainPanel = helpers.makeMainPanel("Compare Watersheds");
mainPanel.style().set({minWidth:"16.66%",maxWidth:"25%",maxHeight:"60%","margin":"8px", "border":"0px"})
var subtitleLabel = ui.Label({value:"Choose a layer to display. Compare differences across watersheds.",style:fonts.subtitle})
mainPanel.add(subtitleLabel)
mainPanel.add(helpers.hline())
/* ui widgets */ 
var layer_select = ui.Select({
        items: Object.keys(rasters),//select_layer_type.getValue()], 
        onChange: function(value) {
          var layer_obj = rasters[value]
          //Map.layers().set(0, ui.Map.Layer(layer_obj.layer)) 
          legendPanel.style().set({shown:true})
          helpers.clear_map_add_layer(layer_obj,legendPanel)
        }
      });
var layer_obj = rasters["Imperviousness"]
var watershedSelectLabel = ui.Label({
    value: '2. Select a watershed dataset to aggregate data:',
});
watershedSelectLabel.style().set(fonts.H3)
var analyzePanel = ui.Panel({
    style: {
        shown: true
    }
})
/*Style defaults  
---------------------------------------------------------------------------------------------------- 
*/
var colors = Style.colors
var fonts = Style.fonts //var panelStyle = Style.panelStyle////(panelStyle)
var featureStyle = {
    color: 'white',
    fillColor: '00000000', 
    width: 1.3
}
//Run at the beginning of the 
var map_init = function(map){
 var m = map || Map
 //m.clear()
 //m.add(panel)
 m.add(legendPanel)
 //select_layer_type.setValue("Input Data Layers")
 //layer_select.setValue("Slope")
 legendPanel.style().set({shown:true})
 //helpers.clear_map_add_layer(layer_obj,legendPanel)
}
var click_instructions = ui.Label({value:'Click on a watershed to display data',style:{shown:false}})
analyzePanel.add(click_instructions)
var reset_button= ui.Button({label:'Reset Map',style: {shown:false,position:'bottom-left'},
onClick: function(){
  map_init
  clearResults
}
})
//----Get vector data 
//Get watershed values from the data list 
var watershedSelect = ui.Select({items: [
"HUC12: USGS Watershed Boundary Dataset", 
"NHDPlus High Resolution Watershed Dataset", 
"Puget Sound Assessment Units"
  ],//Object.keys(data.vector_dict).sort(), 
    placeholder: 'Select a value',
    //value: 'HUC 12'
    onChange: function (selected) {
       // Map.layers().reset()
        //(selected)
        reset_button.style().set({shown:false})//to do: make the reset button reset the data layers.
        var WS = vectors_dict[selected]
        Map.layers().set(2, ui.Map.Layer(WS.style(featureStyle))) 
        watershed_data_set = vectors_dict[selected]//oct
        //analyzePanel.add((buttonPanel))
        click_instructions.style().set({shown:true})
    }
});
helpers.make_tnc_map()
map_init()
// Add widgets to panel
mainPanel.add(panel_label); 
mainPanel.add(layer_select);
//mainPanel.add(helpers.hline())
watershedSelectLabel.style()
mainPanel.add(watershedSelectLabel)
mainPanel.add(watershedSelect)
//mainPanel.add(helpers.hline())
mainPanel.add(analyzePanel)
//mainPanel.add(panel)
//footer panel to hold stuff on the bottom
var footer_panel = ui.Panel()
var tablePanel = ui.Panel({style:{shown:false}})
footer_panel.add(helpers.hline()).add(reset_button)
mainPanel.insert(101,tablePanel)
mainPanel.insert(102,footer_panel)
Map.add(mainPanel)
var vectors_dict = data.vector_dict
//---
/*Global Variables------------------------------------------------------------------------------------- 
 */
var scale = 100; 
// var watershed_data_set
// Inverts the nonlinear stretch we apply to the TSS data for
// visualization, so that we can back out values to display in the legend.
// This uses ordinary JavaScript math functions, rather than Earth Engine
// functions, since we're going to call it from JS to compute label values.
function undoColorStretch(val) {
  return Math.pow(val, TSS_VIS_NONLINEARITY) * TSS_VIS_MAX_VALUE;
}
// Configure our map with a minimal set of controls.
//Map.setControlVisibility(false);
//Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
Map.setOptions('satellite', styles);
Map.setCenter(-122.3, 47.6, 10);
// Add our two base layers to the map: global TSS density and watershed.
//Map.addLayer(colorStretch(TSS.unmask(0).updateMask(1)), TSS_style);
//Map.addLayer(colorStretch(TSS), TSS_style);
// Smooth the image by convolving with the boxcar kernel.
//Map.addLayer((TSS.unmask(0).updateMask(1)), TSS_style);
//Map.addLayer(watershed.style(watershed_STYLE)); //this should be removed and done in the function
//(watershed_data_set)
//var wsSelect = watershed_data_set.filterBounds(ee.Geometry(geometry)); 
//return sum of selected Watersheds
var selectedPoints =[]
// Returns the list of watershed the user has selected.
function getSelectedwatershed() {
var watershed_data_set = vectors_dict[watershedSelect.getValue()]
  var ws_selected =  watershed_data_set.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
  print(ws_selected)
  return(ws_selected)
}
// var wsSelect = watershed_data_set//.filterBounds(ee.Geometry(selectedPoints)); 
var makeResultsBarChart = function (fc) {
  var chart
  var layer_object = rasters[layer_select.getValue()]
  if(layer_object.default_reduction != 'Category')
  {
  var feat = layer_object.layer.eeObject.reduceRegions({
    collection: fc,
    reducer:layer_object.default_reduction,// ee.Reducer.mean(),
    scale: scale
  })
  var title = layer_object.layer.name
  var units = layer_object.units
  //print(feat,title,units)
  feat = feat.select(['Watershed Name', layer_object.default_reduction], [title, units])
   chart = (ui.Chart.feature.byFeature({
    features: feat,
    xProperty: title,
    yProperties: [units]
  }))
  chart.setChartType('ColumnChart')
    .setOptions({
      title: title + ' by watershed'+' ('+layer_object.default_reduction+')',
      hAxis: {
        title: ""
      },
      vAxis: {
        title: units
      }
    })}
    else{
      //var scale = Map.getScale()
      chart = charts.cat_chart(layer_object,fc,scale) // geometry, properties, scale
      //chart = chart.setChartType('ColumnChart')
      ////chart = ui.Chart.feature.byFeature({})
    }
  return (chart)
}
// Makes a bar chart of the given FeatureCollection of watershed by GRIDCODE.
// Makes a table of the given FeatureCollection of watershed by GRIDCODE.
function makeResultsTable(watershed) {
  var table = makeResultsBarChart(watershed)
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected watershed.
function updateOverlay() {
  var overlay = getSelectedwatershed().style(HIGHLIGHT_STYLE);
  Map.layers().insert(1, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedwatershed());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
var infoTablePanel = ui.Panel({style:{shown:false}})
var hideInfoTableButton = ui.Button({label: 'Hide Watershed Info Table', style:{shown:false},
onClick: function() {
  infoTablePanel.style().set({shown:false})
  infoTableButton.style().set({shown: true})
  hideInfoTableButton.style().set({shown:false})
}
})
var infoTableButton = ui.Button({label: 'Show Watershed Info Table', style:{shown:false},
onClick: function() {
  infoTablePanel.style().set({shown:true})
  infoTableButton.style().set({shown: false})
  hideInfoTableButton.style().set({shown:true})
}
})
tablePanel.add(
  ui.Label({value:'Results are displayed graphically in the map window.',style:fonts.Caption1}))
  .add(infoTableButton)
  .add(hideInfoTableButton)
  .add(infoTablePanel);
function updateInfoTable(){
var chart = ui.Chart.feature.byProperty({features: getSelectedwatershed(), 
seriesProperty: "Watershed Name"})
infoTablePanel.clear().add(chart.setChartType('Table'))
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];//clear points 
  Map.layers().reset() //remove(Map.layers().get(2));
  legendPanel.style().set({shown:false})
  var instructionsLabel = ui.Label('Select regions to compare data.');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  infoTableButton.style().set({shown:true})
  click_instructions.style().set({shown:false})
  updateOverlay();
  updateChart();
  updateInfoTable();
  tablePanel.style().set({shown:true})
}
Map.onClick(handleMapClick);
// A button widget that toggles (or cycles) between states.
// To construct a ToggleButton, supply an array of objects describing
// the desired states, each with 'label' and 'value' properties.
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
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
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
    ui.Panel.Layout.Flow('horizontal',true), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right',maxWidth:'30%'}});
Map.add(resultsPanel);
clearResults();
/*Dropdown to select watershed layer to use
*/ 
// Set a place holder.
watershedSelect.setPlaceholder('Choose a watershed data set');
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}