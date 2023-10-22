var ENMc = ui.import && ui.import("ENMc", "image", {
      "id": "users/lucianolasala/Wild_boar_app/ENM_continuous"
    }) || ee.Image("users/lucianolasala/Wild_boar_app/ENM_continuous"),
    ENMb = ui.import && ui.import("ENMb", "image", {
      "id": "users/lucianolasala/Wild_boar_app/ENM_binary"
    }) || ee.Image("users/lucianolasala/Wild_boar_app/ENM_binary"),
    Puntos = ui.import && ui.import("Puntos", "table", {
      "id": "projects/ee-lucianolasala/assets/S_scrofa"
    }) || ee.FeatureCollection("projects/ee-lucianolasala/assets/S_scrofa"),
    AtlanticForest = ui.import && ui.import("AtlanticForest", "table", {
      "id": "projects/ee-lucianolasala/assets/Atlantic_Forest"
    }) || ee.FeatureCollection("projects/ee-lucianolasala/assets/Atlantic_Forest"),
    Cerrado = ui.import && ui.import("Cerrado", "table", {
      "id": "projects/ee-lucianolasala/assets/Cerrado"
    }) || ee.FeatureCollection("projects/ee-lucianolasala/assets/Cerrado"),
    TropAndes = ui.import && ui.import("TropAndes", "table", {
      "id": "projects/ee-lucianolasala/assets/Tropical_Andes"
    }) || ee.FeatureCollection("projects/ee-lucianolasala/assets/Tropical_Andes"),
    Valdivian_Forests = ui.import && ui.import("Valdivian_Forests", "table", {
      "id": "projects/ee-lucianolasala/assets/Chilean_Winter_Rainfall_Valdivian_Forests"
    }) || ee.FeatureCollection("projects/ee-lucianolasala/assets/Chilean_Winter_Rainfall_Valdivian_Forests"),
    Hotspots = ui.import && ui.import("Hotspots", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Bio_hotspots"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Bio_hotspots"),
    BraPA = ui.import && ui.import("BraPA", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Bra_PA"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Bra_PA"),
    ChiPA = ui.import && ui.import("ChiPA", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Chi_PA"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Chi_PA"),
    PryPA = ui.import && ui.import("PryPA", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Par_PA"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Par_PA"),
    UryPA = ui.import && ui.import("UryPA", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Uru_PA"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Uru_PA"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Study_region_adm0_simpl"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Study_region_adm0_simpl"),
    states = ui.import && ui.import("states", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Study_region_adm1_simpl"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Study_region_adm1_simpl"),
    arg = ui.import && ui.import("arg", "table", {
      "id": "users/lucianolasala/Wild_boar_app/ARG_adm1"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/ARG_adm1"),
    bol = ui.import && ui.import("bol", "table", {
      "id": "users/lucianolasala/Wild_boar_app/BOL_adm1"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/BOL_adm1"),
    ch = ui.import && ui.import("ch", "table", {
      "id": "users/lucianolasala/Wild_boar_app/CHL_adm1_simpl"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/CHL_adm1_simpl"),
    bra = ui.import && ui.import("bra", "table", {
      "id": "users/lucianolasala/Wild_boar_app/BRA_adm1"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/BRA_adm1"),
    pry = ui.import && ui.import("pry", "table", {
      "id": "users/lucianolasala/Wild_boar_app/PRY_adm1"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/PRY_adm1"),
    ury = ui.import && ui.import("ury", "table", {
      "id": "users/lucianolasala/Wild_boar_app/URY_adm1"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/URY_adm1"),
    ECOreg = ui.import && ui.import("ECOreg", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Ecoregions_GEE"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Ecoregions_GEE"),
    ArgPA = ui.import && ui.import("ArgPA", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Arg_PA"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Arg_PA"),
    BolPA = ui.import && ui.import("BolPA", "table", {
      "id": "users/lucianolasala/Wild_boar_app/Bol_PA"
    }) || ee.FeatureCollection("users/lucianolasala/Wild_boar_app/Bol_PA");
// Configure our map with a minimal set of controls.
Map.setControlVisibility(true);  // Layers, Mapa, Satélite and drawing options show up 
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
Map.setCenter(-58.2, -19.2, 3)
var nivelObservacion = {
  'All countries': {'id': countries, 'name': 'NAME_0'},
  'Argentina states': {'id': arg, 'name': 'NAME_1'},
  'Bolivia states': {'id': bol, 'name': 'NAME_1'},
  'Brazil states': {'id': bra, 'name': 'NAME_1'},
  'Chile states': {'id': ch, 'name': 'NAME_1'},
  'Paraguay states': {'id': pry, 'name': 'NAME_1'},
  'Uruguay states': {'id': ury, 'name': 'NAME_1'},
  'Ecorregions': {'id': ECOreg, 'name': 'ECO_NAME'},
  'Biodiversity hotspots': {'id': Hotspots, 'name': 'NAME'},
  'PAs Argentina': {'id': ArgPA, 'name': 'NAME'},
  'PAs Brazil': {'id': BraPA, 'name': 'NAME'},
  'PAs Bolivia': {'id': BolPA, 'name': 'NAME'},
  'PAs Chile': {'id': ChiPA, 'name': 'NAME'},
  'PAs Paraguay': {'id': PryPA, 'name': 'NAME'},
  'PAs Uruguay': {'id': UryPA, 'name': 'NAME'},
};
var selectLevel = ui.Select({
  placeholder: 'Level of analysis',
  items: Object.keys(nivelObservacion),
  onChange: desplegables,
})
var ecoregions = ECOreg
var primeraVuelta = true
//print(ecoregions)
//print(ENMc.projection().nominalScale()) 
// Set up title and summary widgets
// App title
var header1 = ui.Label("Wild pigs in South America (V.1.0)", 
            {fontSize: '18px', fontWeight: 'bold', color: '4A997E'});
// App summary
var text1 = ui.Label(
"This tool allows exploring the potential distribution of wild pigs in six countries " +
"of South America (Argentina, Brazil, Chile, Bolivia, Uruguay, and Paraguay) according " +
"to the analysis presented in the publication \"Wild pigs and their widespread threat to biodiversity " +
"conservation in South America\", published in the Journal for Nature Conservation (https://doi.org/10.1016/j.jnc.2023.126393). ",
{fontSize: '14px'});
var text2 = ui.Label(
"Use the panel below to choose the area of interest from the dropdown menu \"Level of analysis\" " +
"(all countries, individual country and its states, ecoregions, biodiversity hotspots, or protected areas " +
"[PAs] by country). Next, select (left click) single or multiple units of interest (polygons) " + 
"to produce summary graphics of potential " +
"distribution (suitability) based on continuous and binary models. Individual graphics can be zoomed in/out " +
"and panned using the mouse scroll wheel and left button, respectively."
,
{fontSize: '14px'});
var text3 = ui.Label(
"The dropdown menus in the green panel at the bottom of this page allow the selection and rapid visualization " +
"of individual units of interest, but do not produce summary graphics. ",
{fontSize: '14px'});
var text4 = ui.Label(
"For optimal viewing on Google Chrome, click on the vertical ellipsis icon at the top right " +
"of the browser window and set the zoom to 80-90%.",
{fontSize: '14px'});
////////////////////////////////////////////////////////////////////////    
// Create a panel 1 to hold the above text
////////////////////////////////////////////////////////////////////////
var panel1 = ui.Panel({
  widgets:[header1, text1, text2, text3, text4], // Adds header and text
  style:{width: '400px', position:'top-right', backgroundColor: 'white'}});    
////////////////////////////////////////////////////////////////////////  
// Create panel 2 to house instructions for the user
////////////////////////////////////////////////////////////////////////
// This creates another panel to house a line separator and instructions for the user
var panel2 = ui.Panel([
  ui.Label({
    value: '___________________________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  })]);
//  ui.Label({
//    value:'Select polygons from specific layers',
//    style: {fontSize: '14px', fontWeight: 'bold'}
//  })]);
// Add this new panel to the larger panel we created 
panel1.add(panel2)
// Add our main panel to the root of our GUI
ui.root.insert(1, panel1)
var panel2 = ui.Panel([
  ui.Label({
    value:'Select polygons from specific layers',
    style: {fontSize: '16px', fontWeight: 'bold', backgroundColor: 'white', textDecoration: 'underline'}
  }),
  selectLevel]);
//var split = ui.SplitPanel(panel1, panel2, "vertical", {style: {width: '30px'}})
//ui.root.insert(1, split)
///////////////////////////////////////////////////////////////////////////
// Dropdown list for biodiversity hotspots
///////////////////////////////////////////////////////////////////////////
var items1 = Hotspots.aggregate_array('NAME');
items1.evaluate(function(List) {
  dropdown1.items().reset(List),
  List.sort(items1),
  dropdown1.setPlaceholder('Biodiversity hotspots');
});
var dropdown1 = ui.Select({
  placeholder: 'Biodiversity hotspots',  // Please wait...
  onChange : function(key){
    var region = Hotspots.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 4);
    Map.addLayer(region, {color:'black', fillColor:'00000000'}, key);
  }
});
// Main Panel
var panel3 = ui.Panel({
  widgets: [dropdown1],
  style: {width: '400px', backgroundColor: '#82E0AA',
  position: "bottom-left"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for ecoregions
///////////////////////////////////////////////////////////////////////////
var items2 = ECOreg.aggregate_array('ECO_NAME');
items2.evaluate(function(List) {
  dropdown2.items().reset(List),
  List.sort(items2),
  dropdown2.setPlaceholder('Ecoregions');
});
var dropdown2 = ui.Select({
  placeholder: 'Ecoregions',
  onChange : function(key){
    var region = ECOreg.filter(ee.Filter.eq('ECO_NAME', key));
    Map.centerObject(region, 6);
    Map.addLayer(region, {color:'black', fillColor:'FF000000'}, key);
  }
});
// Main Panel
var panel4 = ui.Panel({
  widgets: [dropdown2],
  style: {width: '400px', backgroundColor: '#82E0AA',
    position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical')
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for PAs in Argentina
///////////////////////////////////////////////////////////////////////////
var items3 = ArgPA.aggregate_array('NAME');
items3.evaluate(function(List) {
  dropdown3.items().reset(List),
  List.sort(items3),
  dropdown3.setPlaceholder('PAs Argentina');
});
var dropdown3 = ui.Select({
  placeholder: 'PAs Argentina',
  onChange : function(key){
    var region = ArgPA.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 10);
    Map.addLayer(region, {color:'black', fillColor:'FF000000'}, key);
  }
});
// Main Panel
var panel5 = ui.Panel({
  widgets: [dropdown3],
  style: {width: '400px', backgroundColor: '#82E0AA',
  position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for PAs in Brazil
///////////////////////////////////////////////////////////////////////////
var items4 = BraPA.aggregate_array('NAME');
items4.evaluate(function(List) {
  dropdown4.items().reset(List),
  List.sort(items4),
  dropdown4.setPlaceholder('PAs Brazil');
});
var dropdown4 = ui.Select({
  placeholder: 'PAs Brazil',
  onChange : function(key){
    var region = BraPA.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 10);
    Map.addLayer(region, {color:'black', fillColor:'FF000000'}, key);
  }
});
// Main Panel
var panel6 = ui.Panel({
  widgets: [dropdown4],
  style: {width: '400px', backgroundColor: '#82E0AA',
    position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for PAs in Bolivia
///////////////////////////////////////////////////////////////////////////
var items5 = BolPA.aggregate_array('NAME');
items5.evaluate(function(List) {
  dropdown5.items().reset(List),
  List.sort(items5),
  dropdown5.setPlaceholder('PAs Bolivia');
});
var dropdown5 = ui.Select({
  placeholder: 'PAs Bolivia',
  onChange : function(key){
    var region = BolPA.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 10);
    Map.addLayer(region, {color:'black', fillColor:'FF000000'}, key);
  }
});
// Main Panel
var panel7 = ui.Panel({
  widgets: [dropdown5],
  style: {width: '400px', backgroundColor: '#82E0AA',
    position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for PAs in Chile
///////////////////////////////////////////////////////////////////////////
var items6 = ChiPA.aggregate_array('NAME');
items6.evaluate(function(List) {
  dropdown6.items().reset(List),
  List.sort(items6),
  dropdown6.setPlaceholder('PAs Chile');
});
var dropdown6 = ui.Select({
  placeholder: 'PAs Chile',
  onChange : function(key){
    var region = ChiPA.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 10);
    Map.addLayer(region, {color:'black', fillColor: '00000000'}, key);
  }
});
// Main Panel
var panel8 = ui.Panel({
  widgets: [dropdown6],
  style: {width: '400px', backgroundColor: '#82E0AA',
    position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for PAs in Paraguay
///////////////////////////////////////////////////////////////////////////
var items7 = PryPA.aggregate_array('NAME');
items7.evaluate(function(List) {
  dropdown7.items().reset(List),
  List.sort(items7),
  dropdown7.setPlaceholder('PAs Paraguay');
});
var dropdown7 = ui.Select({
  placeholder: 'PAs Paraguay',
  onChange : function(key){
    var region = PryPA.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 10);
    Map.addLayer(region, {color:'black', fillColor: '00000000'}, key);
  }
});
// Main Panel
var panel9 = ui.Panel({
  widgets: [dropdown7],
  style: {width: '400px', backgroundColor: '#82E0AA',
    position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
///////////////////////////////////////////////////////////////////////////
// Dropdown list for PAs in Uruguay
///////////////////////////////////////////////////////////////////////////
var items8 = UryPA.aggregate_array('NAME');
items8.evaluate(function(List) {
  dropdown8.items().reset(List),
  List.sort(items7),
  dropdown8.setPlaceholder('PAs Uruguay');
});
var dropdown8 = ui.Select({
  placeholder: 'PAs Uruguay',
  onChange : function(key){
    var region = UryPA.filter(ee.Filter.eq('NAME', key));
    Map.centerObject(region, 10);
    Map.addLayer(region, {color:'black', fillColor: '00000000'}, key);
  }
});
// Main Panel
var panel9 = ui.Panel({
  widgets: [dropdown8],
  style: {width: '400px', backgroundColor: '#82E0AA',
    position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
// Displaying the main panel
// Add these new widgets to the panel in the order you want them to appear
panel1.add(panel2)
.add(panel3)
.add(panel4)
.add(panel5)
.add(panel6)
.add(panel7)
.add(panel8)
/*
/////////////////////////////////////////////////////////////////////////////////////
// Country and state selection
/////////////////////////////////////////////////////////////////////////////////////
var countryNames = countries.aggregate_array('NAME_0')
var getStates = function(country) {
  // Given a state get all counties
  var feat = ee.Feature(countries.filterMetadata('NAME_0', 'equals', country).first())
  var statefp = ee.String(feat.get('NAME_0'))
  var filteredStates = states.filterMetadata('NAME_0', 'equals', statefp)
  var filteredStateNames = filteredStates.aggregate_array('NAME_1')
  return ee.List(filteredStateNames)
}
// Empty Dropdowns
var countriesDD = ui.Select([], 'Loading..')
var statesDD = ui.Select([], 'Waiting for a state..')
// Load countries
countryNames.evaluate(function(countries){
  countriesDD.items().reset(countries)
  countriesDD.setPlaceholder('Country')
  countriesDD.onChange(function(country){
    // once you select a state (onChange) get all counties and fill the dropdown
    statesDD.setPlaceholder('Loading...')
    var states = getStates(country)
    states.evaluate(function(statesNames){
      statesDD.items().reset(statesNames)
      statesDD.setPlaceholder('Select a state')
    })
  })
})
var add = ui.Button('Add state to map')
add.onClick(function(){
  var name = statesDD.getValue()
  var state = ee.Feature(states.filterMetadata('NAME_1', 'equals', name).first())
  Map.addLayer(state, {}, name)
})
var panel2 = ui.Panel({
  widgets: [countriesDD, statesDD, add],
  style: {backgroundColor: 'white',
  position: "bottom-right"
  },
  layout: ui.Panel.Layout.flow('vertical'),
});
*/
/////////////////////////////////////////////////
function desplegables(nivel){
  var fc = nivelObservacion[nivel]["id"];
  var campo = nivelObservacion[nivel]["name"];
  Map.layers().remove(Map.layers().get(2));
  Map.layers().set(2, ui.Map.Layer({
    eeObject: fc.style({color:'black',fillColor:'FF000000', width:1}),
    name: "Level of analysis ("+nivel+")", shown:true}))  // Observational units
  var selectedPoints = [];
  // Returns the list of countries the user has selected
  function getSelectedEcoregions() {
    // var fc = panel10.widgets().get(3).widgets().get(0).getValue()
    // print(fc, "selectedUnit")
    // print(ecoregions.filterBounds(ee.Geometry.MultiPoint(selectedPoints)))
    return fc.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
  }
  function updateOverlay() {
    var overlay = getSelectedEcoregions().style(HIGHLIGHT_STYLE);
    Map.layers().set(3, ui.Map.Layer({eeObject: overlay, name:"Selected unit(s)"}));
  }
  function updateOverlay2() {
    var overlay = getSelectedEcoregions().style(HIGHLIGHT_STYLE);
    Map.layers().set(3, ui.Map.Layer({eeObject: overlay, name: "Selected unit(s)"}));
  }
  // Updates the chart using the currently-selected charting function,
  function updateChart() {
    var chartBuilder = chartTypeToggleButton.value;
    var chart = chartBuilder(getSelectedEcoregions());
    resultsPanel.clear().add(chart).add(buttonPanel);
  }
  function updateChart2() {
    var chartBuilder = chartTypeToggleButton2.value;
    var chart = chartBuilder(getSelectedEcoregions());
    resultsPanel2.clear().add(chart).add(buttonPanel2);
  }
  // Clears the set of selected points and resets the overlay and results
  // panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(3));
  var instructionsLabel = ui.Label({
    value: 'F2',
    style: {
    fontWeight: 'serif',
    fontSize: '0px',
    margin: '0 0 0 0',
    padding: '0',
    shown: true,
    }
  }
  );
  resultsPanel.widgets().reset([instructionsLabel]);
}  
function clearResults2() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(3));
  var instructionsLabel = ui.Label({
    value: 'F1',
    style: {
    fontWeight: 'serif',
    fontSize: '0px',
    margin: '0 0 0 0',
    padding: '0',
    shown: true,
    }
  }
  );
  resultsPanel2.widgets().reset([instructionsLabel]);
}  
//  function clearResults() {
//    selectedPoints = [];
//    Map.layers().remove(Map.layers().get(3));
//    var instructionsLabel = ui.Label('F2');
//    resultsPanel.widgets().reset([instructionsLabel]);
//  }
//  function clearResults2() {
//    var selectedPoints = [];
//    Map.layers().remove(Map.layers().get(3));
//    var instructionsLabel = ui.Label('F1');
//    resultsPanel2.widgets().reset([instructionsLabel]);
//  }
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
  function handleMapClick(location) {
    selectedPoints.push([location.lon, location.lat]);
    updateOverlay();
    updateChart();
  }
  function handleMapClick2(location) {
    selectedPoints.push([location.lon, location.lat]);
    updateOverlay2();
    updateChart2();
  }
  Map.onClick(handleMapClick);
  Map.onClick(handleMapClick2);
  // Map.onClick(function(coords){
  //   var myPoint = ee.Geometry.Point(coords.lon,coords.lat);
  //   var selectedUnit = lotesCollection.filter(ee.Filter.contains(".geo", myPoint))
  //   Map.addLayer(selectedUnit.style({fillColor:"FF000000", color:"red"}), {}, "Selected Obs")
  //   makeResultsBarChart(selectedUnit, nombre)
  // })
  // A button widget that toggles (or cycles) between states.
  // To construct a ToggleButton, supply an array of objects describing
  // the desired states, each with 'label' and 'value' properties.
  function ToggleButton(ecos, onClick) {
    var index = 0;
    var button = ui.Button(ecos[index].label);
    button.value = ecos[index].value;
    button.onClick(function() {
      index = ++index % ecos.length;
      button.setLabel(ecos[index].label);
      button.value = ecos[index].value;
      onClick();
    });
    return button;
  }
  function ToggleButton2(ecos, onClick) {
    var index = 0;
    var button = ui.Button(ecos[index].label);
    button.value = ecos[index].value;
    button.onClick(function() {
      index = ++index % ecos.length;
      button.setLabel(ecos[index].label);
      button.value = ecos[index].value;
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
  var chartTypeToggleButton2 = ToggleButton2(
      [
        {
          label: 'Display results as table',
          value: makeResultsBarChart2,
        },
        {
          label: 'Display results as chart',
          value: makeResultsTable2,
        }
      ],
      updateChart2);
  // A panel containing the two buttons.
  // Makes a bar chart of the given FeatureCollection of ecoregions by name
  function makeResultsBarChart(ecoregions) {
    var areasBiModelp = ee.Image.pixelArea().divide(1e10).updateMask(ENMb.eq(1))
    var areasBiModela = ee.Image.pixelArea().divide(1e10).updateMask(ENMb.eq(0))
    //print('areasBiModel selected', ee.FeatureCollection(areasBiModelp))
    //var AbsentArea = areasBiModela.reduceRegions({collection: ecoregions, reducer: ee.Reducer.sum(), scale: ENMc.projection().nominalScale()})
    var PresentArea = areasBiModelp.reduceRegions({
      collection: ecoregions, 
      reducer: ee.Reducer.sum(), 
      scale: ENMc.projection().nominalScale()
    })//.map(function(f){return f.set({label:'Present'})})
    //print(ee.Feature(PresentArea.first()).get('fid'))
    var Area = PresentArea.map(function(f){ 
      var sumA = areasBiModela.reduceRegions({
        collection: ecoregions, 
        reducer: ee.Reducer.sum(), 
        scale: ENMc.projection().nominalScale()
      });
      return f.set({'sumA': ee.Feature(sumA.filter(ee.Filter.eq(campo,ee.Feature(f).get(campo))).first()).get('sum') })
    })//.map(function(f){return f.set({label:'Absent'})})
    //ee.Feature(sumA.first()).get('sum')
    //var Area = PresentArea.merge(AbsentArea)
    // print('PresentArea selected', PresentArea)
    // print('Area selected', Area)
    //var chart = ui.Chart.feature.byFeature(suitMeanSD, 'ECO_NAME','mean');
    // areasBiModel.values().filter(ee.Filter.eq('item','1'))
    //.reduceRegions({collection: ecoregions, reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true), scale: ENMc.projection().nominalScale()})
    // var fABiMo = ee.Feature(null,{'Area':clas_area_f.get(['area']), 'ECO_NAME':ecoregions.get('ECO_NAME')})
    // print(fABiMo)
  //.select('[0-9][0-9]_tmean|label'),
    var chart = ui.Chart.feature.byFeature(Area.select(['sum', 'sumA',campo ]), campo);
    chart.setSeriesNames([
            'Present', 'Absent'
          ])
    chart.setChartType('BarChart');
    chart.setOptions({
      title: 'Binary Model Area',
      titleTextStyle: {italic: true, bold: true},
      explorer: {},
      vAxis: {title: null},
      hAxis: {title: 'Presence area [Millons of hectares]', minValue: 0,
        titleTextStyle: {italic: false, bold: false},
      },
    colors: ['ff0066','ffff66'],
      //backgroundColor:['red']
    }).style().set({stretch: 'both'});
    //chart;
    return chart;
  }
  // Makes a table of the given FeatureCollection of countries by name.
  function makeResultsTable(ecoregions) {
    var areasBiModelp = ee.Image.pixelArea().divide(1e10).updateMask(ENMb.eq(1))
    var areasBiModela = ee.Image.pixelArea().divide(1e10).updateMask(ENMb.eq(0))
    var PresentArea = areasBiModelp.reduceRegions({
      collection: ecoregions, 
      reducer: ee.Reducer.sum(), 
      scale: ENMc.projection().nominalScale()
    })//.map(function(f){return f.set({label:'Present'})})
    //print(ee.Feature(PresentArea.first()).get('fid'))
    var Area = PresentArea.map(function(f){ 
      var sumA = areasBiModela.reduceRegions({
        collection: ecoregions, 
        reducer: ee.Reducer.sum(), 
        scale: ENMc.projection().nominalScale()
      });
      return f.set({
        'sumA': ee.Feature(sumA.filter(ee.Filter.eq(campo,ee.Feature(f).get(campo))).first()).get('sum') })
    })//.map(function(f){return f.set({label:'Absent'})})
    var table = ui.Chart.feature.byFeature(Area.select(['sum', 'sumA',campo ]), campo);
    table.setSeriesNames([
            'Present', 'ABsent'
          ])
    table.setChartType('Table');
    table.setOptions({allowHtml: true, pageSize: 5});
    table.style().set({stretch: 'both'});
    return table;
  }
  function makeResultsBarChart2(ecoregions) {
    var suitMeanSD = ENMc.reduceRegions({
      collection: ecoregions, 
      reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true), 
      scale: ENMc.projection().nominalScale()
    })
    var Hist = ENMc.reduceRegions(ecoregions, ee.Reducer.histogram(), ENMc.projection().nominalScale()) 
    // print(Hist)
    // ui.Chart.feature.histogram({
    //   features: Hist, 
    //histogram within interval [x0,x1] with step m
    var x0 = 0;
    var x1 = 1;
    var m = 200;
    //apply fixedHistogram reducer, it returns a feature collection with all the information as arrays
    var histogram = ENMc.reduceRegions({
      collection: ecoregions,
      reducer: ee.Reducer.fixedHistogram(x0,x1,m),
      scale: ENMc.projection().nominalScale(),
    });
    // print(histogram);
    //set up a display for the arrays
    var x = ee.List.sequence(x0,null,(x1-x0)/m,m);
    var z = ee.List(histogram.aggregate_array('histogram'));
    var y = ee.Array.cat(z, 1).slice({axis:1,start:1,end:null,step:2});
    var coloresEcoregiones = ee.Dictionary({
      0: {color: 'lime'},
      1: {color: 'green'},
      2: {color: 'red'},
      3: {color: 'purple'},
      4: {color: 'orange'},
      5: {color: 'black'}
    })
    var options = {
      title: 'Suitability Histogram',
      titleTextStyle: {italic: false, bold: true},
      explorer: {},
      fontSize: 12,
      hAxis: {title: 'Suitability',
      titleTextStyle: {italic: false, bold: false},
      },
      vAxis: {title: 'Frequency',
      titleTextStyle: {italic: false, bold: false},
      },
        series: 
        coloresEcoregiones.select(coloresEcoregiones.keys().slice(0,ecoregions.size()))
    };
    //print charts
    var chart = ui.Chart.array.values(y, 0, x)
      .setSeriesNames(ecoregions.aggregate_array(campo))
      .setOptions(options)
      .setChartType('ColumnChart');
    return chart;
  }
  function makeResultsTable2(ecoregions) {
    var suitMeanSD = ENMc.reduceRegions({
      collection: ecoregions, 
      reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true), 
      scale: ENMc.projection().nominalScale()
    })
    var table = ui.Chart.feature.byFeature(suitMeanSD, campo,['mean', 'stdDev']);
    table.setChartType('Table');
    table.setOptions({allowHtml: true, pageSize: 5});
    table.style().set({stretch: 'both'});
    return table;
  }
  var buttonPanel = ui.Panel(
      [ui.Button('Clear results', clearResults), chartTypeToggleButton],
      ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
  var buttonPanel2 = ui.Panel(
      [ui.Button('Clear results', clearResults2), chartTypeToggleButton2],
      ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
  if(!primeraVuelta){
    clearResults()
    clearResults2()
  } else{
    Map.add(resultsPanel);
    clearResults();
    Map.add(resultsPanel2);
    clearResults2();
  }
  primeraVuelta = false;
}
var resultsPanel = ui.Panel({style: {position: 'bottom-left'}});
var resultsPanel2 = ui.Panel({style: {position: 'bottom-left'}});
///////////////////////////////////////////////////////////////////////////
Map.setOptions('satellite')
/////////////////////////////////////////////////////
// Add legend for continuous model
/////////////////////////////////////////////////////
var palette = ["00007f","0000ff","007fff","00ffff","7fff7f","ffff00","ff7f00","ff0000","7f0000"]
var vis = {min: 0, max: 1, palette: palette};
var nSteps = 20
// Creates a color bar thumbnail image for use in legend from the given color palette
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, nSteps, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: nSteps,
    palette: palette,
  };
}
// Create the colour bar for the legend
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0).int(),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(vis.min+0.25, {margin: '4px 8px'}),
    ui.Label(
        ((vis.max-vis.min) / 2+vis.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(vis.min+0.75, {margin: '4px 8px'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Legend title
var legendTitle = ui.Label({
  value: 'Suitability (continuous model)',
  style: {fontWeight: 'bold', fontSize: "12px"}
});
// Add the legendPanel to the map
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set({
  width: '200px',
  position: 'bottom-right'
});
Map.add(legendPanel);
/////////////////////////////////////////////////////
// Add legend for binary model
/////////////////////////////////////////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Suitability (binary model)',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Palette with the colors
var palette =['ffff66', 'ff0066'];
// name of the legend
var names = ['Absent','Present'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);  
// Highlight style
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
////////////////////////////////////////////////////////////////////
// Palette for binary and continuous models
////////////////////////////////////////////////////////////////////
var pvENMb = {
  min: 0,
  max: 1,
  palette: ["ffff66","ff0066"],
};
var pvENMc = {
  min: 0,
  max: 1,
  palette: ["00007f","0000ff","007fff","00ffff","7fff7f","ffff00","ff7f00","ff0000","7f0000"],
};
Map.addLayer(ENMc, pvENMc, 'Continuos Niche Model', true)
Map.addLayer(ENMb, pvENMb, 'Binary Niche Model', false)
Map.addLayer(countries.style({color:'black',fillColor:'FF000000', width:1}), null, 'Countries', true)
Map.addLayer(Puntos.style({color:'black', width: 1, fillColor:'white', pointSize:4}), null, 'Wild Boar Occurrences', true)