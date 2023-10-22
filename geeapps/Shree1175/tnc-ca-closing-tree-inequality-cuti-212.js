//-------------------------------------------------------
//              suitability_viewer.js
//-------------------------------------------------------
// https://leahscampbell.users.earthengine.app/view/cuti-viewer
//-------------------------------------------------------------------a
//          Set up Panels/Widgets
//--------------------------------------------------------------------
var vizDict = {
  'TREEGAP Closing Score': {min: 0, max: 100, palette: ['ffffff','c40000']},	
  'UHIGAP Closing Score': {min: 0, max: 100, palette: ['ffffff','c40000']},
  'Population Quartile': {min: 1, max: 4, palette: ['efedf5','bcbddc','756bb1']},
  'Income Quartile': {min: 1, max: 4, palette: ['deebf7','9ecae1','3182bd']},
  'Current UHI (°C)': {min:2, max:9, opacity: 0.71, palette:['a7ceff','ffd28f','ff420a','c40000']},
  'UHI Gap (°C)': {min:0,max:9, palette:['ffffff','ff0000']},
  'Current Tree Canopy (%)': {min: 0, max: 100, palette: ['ffffff','629e00','003a00']},
  'Tree Gap (%)': {"min":0,"max":13,"palette":["ffffff","3dc225"]}, //{"opacity":1,"bands":["mode"],"min":2.2319134418597146,"max":12.60646641945085,"palette":["cfda23","ffffff","3dc225"]}
  'Tree Canopy (%) Needed to Close UHI Gap': {"min":0,"max":20,"palette":["ffffff","3dc225"]}};
// --------------SET UP PRIMARY PANELS--------------------------------
//-------- Map Panel-----------------
var map = ui.Map({lon: -121.574, lat: 38.197, zoom: 7});
map.style().set({cursor:'crosshair'});
map.setOptions('TERRAIN');
var currentZoomGroup = ui.Textbox({value:1});
//----- Plot Panel---------------------------
var plotPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '430px'}
});
// Chart Panel (part of plot panel)
var chartPanel = ui.Panel(null, null, {stretch: 'horizontal'});
var title = ui.Panel([
  ui.Label('CUTI: Closing Urban Tree cover Inequity', {position: 'top-center', fontWeight: 'bold', fontSize: '20px',
    margin: '10px 0 4px 25px', padding: '0'})])
// TNC logo
var logo = ee.Image('projects/igde-work/logos/TNC_Logo').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1329x384', //'642x291',
        format: 'png'
        },
    style: {height: '48px', width: '166px',padding :'0'}
    });
var Logo = ui.Panel(thumb, 'flow', {margin: '0 0px 0 200px',position:'top-right'});
var titlePanel = ui.Panel([
  Logo, title]);
var instructions = ui.Panel([
  ui.Label("The CUTI tool (The Nature Conservancy 2021) proposes an approach to strategically plant trees in California's urban areas. Planting trees can reduce Urban Heat Island (UHI) impacts while sequestering carbon and benefiting low-income and disadvantaged communities."),
  ui.Label('Citation : T. Chakraborty et al., (in review). Feasibility of Urban Afforestation as an Equitable Nature-Based Solution to Climate Change.  A manuscript with a full description of the methods used to develop the suitability scores will be made available soon.'),
  ui.Label('Tool developed by : Leah Campbell, T Chakraborty, and Tanushree Biswas (2021). The Nature Conservancy. Please contact tanushree.biswas@tnc.org if you have any questions.'),
  ui.Label('Instructions: Choose layers to visualize below, then click on the map to see more information about individual Census Block Groups.')
]);
chartPanel.add(instructions);
var layerDescriptionPanel = ui.Panel([
  ui.Label('Layer Descriptions:', {fontWeight: 'bold'}),
  ui.Label('Current Tree Canopy (%): The percent of the census block group area covered by tree canopy.'),
  ui.Label('Current UHI (°C): The mean summer urban heat island impact.'),
  ui.Label("Income Quartile: The quartile of the census block group's average income when compared to all census block groups in this city."),
  ui.Label("Population Quartile: The quartile of the census block group's average population when compared to all census block groups in this city."),
  ui.Label('Tree Gap (%): The difference in percent tree cover between this census block group and the highest income quartile for the city.'),
  ui.Label('UHI Gap (°C): The difference in UHI between this census block group and the highest income quartile for the city.'),
  ui.Label('Tree Canopy (%) Needed to Close UHI Gap: The additional canopy cover needed to close the UHI Gap.'),
  ui.Label('TREEGAP Closing Score: Ranked score (0-100) identifying the suitability of census block groups for tree planting to address tree cover disparity.'),
  ui.Label('UHIGAP Closing Score: Ranked score (0-100) identifying the suitability of census block groups for tree planting to address UHI disparity.'),
  ]);
//----- Options & Filters Panel---------------------------
var optionsFiltersPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '310px', position: 'top-left'}
});
// Initialize sub-panels, more is done using widget functions:
var optionsPanel = ui.Panel(null, null, {stretch: 'horizontal'});
var legendPanel = ui.Panel(null, null);
var blackline1 = ui.Label('_____________________________________________________________');
var blackline2 = ui.Label('_____________________________________________________________');
// -------------Legend Panel----------------------------------------
// Creates a color bar thumbnail image for use in legend from the given color palette.
function makeColorBarParams(palette, min, max) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '150x10',
    format: 'png',
    min: min,
    max: max,
    palette: palette,
  };
}
// Create a panel with three numbers for the legend.
var createColorBarPanel = function(palette, min, middle, max, title){
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', position: 'bottom-right'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 8px'}),
      ui.Label(
          (middle),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value: title,
    style: {fontWeight: 'bold'}
  });
  var legendPanel = ui.Panel({widgets: [legendTitle, colorBar, legendLabels], style: {position: 'bottom-right'}});
  return legendPanel
}
// -------------Legend Panel----------------------------------------
// Creates a color bar thumbnail image for use in legend from the given color palette.
function makeColorBarParams(palette, min, max) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '150x10',
    format: 'png',
    min: min,
    max: max,
    palette: palette,
  };
}
// Create a panel with three numbers for the legend.
var createColorBarPanel = function(palette, min, middle, max, title){
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', position: 'bottom-right'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(min, {margin: '4px 8px'}),
      ui.Label(
          (middle),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value: title,
    style: {fontWeight: 'bold'}
  });
  var legendPanel = ui.Panel({widgets: [legendTitle, colorBar, legendLabels], style: {position: 'bottom-right'}});
  return legendPanel
}
//-------------------------------------------------------------
//                 Widget Functions 
//-------------------------------------------------------------
// Submit Button
var submitButton = ui.Button({
  label: 'Submit',
  style: {stretch: 'horizontal', width: '150px', margin: '30px 5px 5px 120px'} 
});
//----------------------Options----------------------------------
// Options for plotting, i.e. vegetation metric
var makeOptionsPanel = function(){
  var layerList = Object.keys(vizDict);
  // Top Layer Selector
  var topLayerSelectLabel = ui.Label('Top Layer to Display:',{fontWeight: 'bold'});   
  var topLayerDropdownMenu = ui.Select({
    items: layerList,
    value: 'TREEGAP Closing Score',
    style:{stretch: 'horizontal'},
    onChange: function(value){
      topLayerDropdownMenu.setValue(value);
      changeMapDisplay()
    }
  });
  layerList.push('None')
  // Bottom Layer Selector
  var bottomLayerSelectLabel = ui.Label('Bottom Layer to Display:',{fontWeight: 'bold'});   
  var bottomLayerDropdownMenu = ui.Select({
    items: layerList,
    value: 'None',
    style:{stretch: 'horizontal'},
    onChange: function(value){
      bottomLayerDropdownMenu.setValue(value);
      changeMapDisplay()
    }
  });
  return ui.Panel([topLayerSelectLabel, topLayerDropdownMenu,
                  bottomLayerSelectLabel, bottomLayerDropdownMenu],
                  null, {stretch: 'vertical'});
}
var changeMapDisplay = function(){
// --------------PALETTES--------------------------------
  map.clear()
  var bottom_layer = getOptions(optionsPanel).bottom_layer;
  var top_layer = getOptions(optionsPanel).top_layer;
  if (bottom_layer == 'None'){
    bottom_layer = top_layer
    top_layer = 'None'
  }
  if (bottom_layer == 'TREEGAP Closing Score'){
    map.layers().set(0, ui.Map.Layer(A1_ranked, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'UHIGAP Closing Score'){
    map.layers().set(0, ui.Map.Layer(A2_ranked, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'Population Quartile'){
    map.layers().set(0, ui.Map.Layer(populationQuartiles, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'Income Quartile'){
    map.layers().set(0, ui.Map.Layer(incomeQuartiles, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'Current UHI (°C)'){
    map.layers().set(0, ui.Map.Layer(cUHI, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'UHI Gap (°C)'){
    map.layers().set(0, ui.Map.Layer(UhiGap, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'Current Tree Canopy (%)'){
    map.layers().set(0, ui.Map.Layer(cTC_percent, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'Tree Gap (%)'){
    map.layers().set(0, ui.Map.Layer(treeGap_percent, vizDict[bottom_layer], bottom_layer, true))
  }else if (bottom_layer == 'Tree Canopy (%) Needed to Close UHI Gap'){
    map.layers().set(0, ui.Map.Layer(TreeGapUHI_percent, vizDict[bottom_layer], bottom_layer, true))
  }
  if (top_layer !== 'None'){
    if (top_layer == 'TREEGAP Closing Score'){
      map.layers().set(1, ui.Map.Layer(A1_ranked, vizDict[top_layer], top_layer, true))   
    }else if (top_layer == 'UHIGAP Closing Score'){
      map.layers().set(1, ui.Map.Layer(A1_ranked, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'Population Quartile'){
      map.layers().set(1, ui.Map.Layer(populationQuartiles, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'Income Quartile'){
      map.layers().set(1, ui.Map.Layer(incomeQuartiles, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'Current UHI (°C)'){
      map.layers().set(1, ui.Map.Layer(cUHI, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'UHI Gap (°C)'){
      map.layers().set(1, ui.Map.Layer(UhiGap, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'Current Tree Canopy (%)'){
      map.layers().set(1, ui.Map.Layer(cTC_percent, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'Tree Gap (%)'){
      map.layers().set(1, ui.Map.Layer(treeGap_percent, vizDict[top_layer], top_layer, true))
    }else if (top_layer == 'Tree Canopy (%) Needed to Close UHI Gap'){
      map.layers().set(1, ui.Map.Layer(TreeGapUHI_percent, vizDict[top_layer], top_layer, true))
    }
  }
  var bottomLegend = createColorBarPanel(vizDict[bottom_layer]['palette'], vizDict[bottom_layer]['min'], '', vizDict[bottom_layer]['max'], bottom_layer)
  map.add(bottomLegend)
  if (top_layer !== 'None'){
    var topLegend = createColorBarPanel(vizDict[top_layer]['palette'], vizDict[top_layer]['min'], '', vizDict[top_layer]['max'], top_layer)
    map.add(topLegend)
  }
}
// Parser to grab current options/filters
var getOptions = function(optionsPanel){
  return {    
    top_layer: optionsPanel.widgets().get(1).getValue(),
    bottom_layer: optionsPanel.widgets().get(3).getValue()
  };
};
// -------------- Chart Functions --------------------------------
// Chart plotting function, activated by clicking map, with functions below
var plot_charts = function(clicked_polygon){
  chartPanel = chartPanel.clear();
  clicked_polygon = ee.Feature(ee.FeatureCollection(clicked_polygon).first());
  // Get all wells for this polygon
  var polygon_id = clicked_polygon.get('geoid');
  // Polygon Info
  var infoPanel = ui.Panel(ui.Label('Census Block Group Information:', {position: 'top-center', fontWeight: 'bold'}));
  //chartPanel.add(infoPanel);
  clicked_polygon.evaluate(function(clicked_polygon){
    var info = clicked_polygon.properties;
    infoPanel.clear()
    infoPanel.add(ui.Panel([                               
      ui.Label('SELECTED POLYGON:',  {position: 'top-center', fontWeight: 'bold'}),
      ui.Label('City Name: '+info.City_Name),
      ui.Label('ID: '+info.geoid),
      ui.Label('TREEGAP Closing Score: '+parseInt(info.A1_ranked).toString()),
      ui.Label('UHIGAP Closing Score: '+parseInt(info.A2_ranked).toString()),
      ui.Label('Population: '+info.Population),
      ui.Label('Income: $'+info.Income),
      ui.Label('Current UHI: '+parseFloat(info.UHI_Current).toFixed(1).toString()+' °C'),
      ui.Label('UHIGAP: '+parseFloat(info.UHIGap).toFixed(1).toString()+' °C'),
      ui.Label('Current Tree Canopy: '+parseFloat(info.cTC_Percent).toFixed(1).toString()+'%'),
      ui.Label('TREEGAP: '+parseFloat(info.TGTree_Per).toFixed(1).toString()+'%'),
      ui.Label('Tree Canopy Needed to Close UHI Gap: '+parseFloat(info.TGUhi_Perc).toFixed(1).toString()+'%'),
    ],ui.Panel.Layout.Flow('vertical')))
  })
  // Add charts to panel
  chartPanel.add(infoPanel); 
};
// Outline the Clicked Polygon, zoom in, and display wells
var highlightClickedPolygon = function(clicked_polygon){
  map.centerObject(clicked_polygon.geometry())
  var clickedPolyPaint = ee.Image().paint(clicked_polygon,null,2).visualize({min:0, max:0, palette:'000000'});  
  map.layers().set(2, ui.Map.Layer(clickedPolyPaint, {}, 'Selected Polygon', true))
}
//-------------------------------------------------------------
//          Data Prep
//--------------------------------------------------------------------
var cbgTable = ee.FeatureCollection('users/leahscampbell/contour/tnc/urbantree/Suitability_Table_CBG_v10');
print('cbgTable', cbgTable.limit(20))
//----------------------Suitability Scores, Ranked-------------------------
// Tree Gap Closing Score
var A1_ranked = cbgTable.reduceToImage(['A1_ranked'], ee.Reducer.mode());
A1_ranked = A1_ranked.updateMask(A1_ranked.neq(0));
// UHI Gap Closing Score
var A2_ranked = cbgTable.reduceToImage(['A2_ranked'], ee.Reducer.mode());
A2_ranked = A2_ranked.updateMask(A2_ranked.neq(0));
//----------------------Population and Income-------------------------
//Population Quartiles
var populationQuartiles = cbgTable.reduceToImage(['PopQuartile'],ee.Reducer.mode());
//Income Quartiles
var incomeQuartiles = cbgTable.reduceToImage(['IncomeQuartile'],ee.Reducer.mode());
//------------------Current UHI & Tree Canopy-------------------------
// Current UHI
var cUHI = cbgTable.reduceToImage(['UHI_Current'],ee.Reducer.mode());
// Current Tree Canopy (Percent)
var cTC_percent = cbgTable.reduceToImage(['cTC_Percent'], ee.Reducer.mode());
//----------------------UHI Gap-------------------------
// UHI Gap between high and low income
var UhiGap = cbgTable.reduceToImage(['UHIGap'], ee.Reducer.mode());
//----------------------Tree Gap Percent-------------------------
// Tree Gap between high and low income
var treeGap_percent = cbgTable.reduceToImage(['TGTree_Per'], ee.Reducer.mode());
// Modeled Tree Gap
var TreeGapUHI_percent = cbgTable.reduceToImage(['TGUhi_Perc'], ee.Reducer.mode());
//----------------------Tree Gap Acres-------------------------
// Tree Gap between high and low income
var treeGap_acres = cbgTable.reduceToImage(['TGTree_Acr'], ee.Reducer.mode());
// Modeled Tree Gap
var TreeGapUHI_acres = cbgTable.reduceToImage(['TGUhi_Acre'], ee.Reducer.mode());
// //----------------------Suitability Scores, Quartiles-------------------------
// //'A1 = (UHIGap * TreeGap * Population / Income) / ratioCANTree, TreeGap > 0 & UHIGap > 0'
// var A1_quartile = cbgTable.reduceToImage(['A1_quartile'], ee.Reducer.mode());
// A1_quartile = A1_quartile.updateMask(A1_quartile.neq(0));
// //Map.addLayer(A1_quartile, {min: 1, max: 4, palette: palette_wr}, 'A1 Quartiles', false)
// var A1_quartile_layer = ui.Map.Layer(A1_quartile, pallette_suit, 'A1 Quartiles', true)
// //'A2 = (Potential UHI Change * TreeGapUHI * Population / Income) / ratioCANUhi, TreeGapUHI > 0 & MinUHIGap > 0'
// var A2_quartile = cbgTable.reduceToImage(['A2_quartile'], ee.Reducer.mode());
// A2_quartile = A2_quartile.updateMask(A2_quartile.neq(0));
// //Map.addLayer(A2_quartile, {min: 1, max: 4, palette: palette_wr}, 'A2 Quartiles', false)
// var A2_quartile_layer = ui.Map.Layer(A2_quartile, pallette_suit, 'A2 Quartiles', true)
//-------------------------------------------------------------------
//        Add Layers to Map
//--------------------------------------------------------------------
// For polygon outline layer
var displayPolysPaint = ee.Image().paint(cbgTable,null,1).visualize({min:0, max:0, palette:'000000'});  
var displayPolyLayer = ui.Map.Layer(displayPolysPaint, {}, 'Census Block Groups', false);
//------------------------------------
//------------------------------------------------------------
//                      Plot 
//------------------------------------------------------------
plotPanel.add(titlePanel);
plotPanel.add(chartPanel);
plotPanel.add(blackline1);
var optionsPanel = makeOptionsPanel();
plotPanel.add(optionsPanel);
plotPanel.add(blackline2);
plotPanel.add(layerDescriptionPanel);
changeMapDisplay()
ui.root.clear();
ui.root.add(map);
ui.root.add(plotPanel);
// Get coordinates from map click, then plot charts
map.onClick(function(coords) {
  // Get coordinates from click
  var clicked_point = ee.Geometry.Point(coords.lon, coords.lat);
  var clicked_polygon = cbgTable.filterBounds(clicked_point);
  //print('clicked_polygon', clicked_polygon)
  //clearAuxLayers()
  highlightClickedPolygon(clicked_polygon);
  plot_charts(clicked_polygon, clicked_point);
});