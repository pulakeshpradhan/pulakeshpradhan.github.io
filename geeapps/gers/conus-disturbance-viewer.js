var PATH_AGENT_PRODUCT = 'users/ShiQiu/product/conus/disturbance/v041/APRI'
var agentImageCollection = ee.ImageCollection(PATH_AGENT_PRODUCT)
// *** Functions which need to be preloaded
// BU's tool: https://code.earthengine.google.com/cff0a3795e011b9ac00f2e12936835ec 
// Below functions are to convert HEX to RGB, and RGB to HEX
function valueToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16),parseInt(result[2], 16), parseInt(result[3], 16)]: null;
}
function FuncColorGradient(c1, c2, depth) {
  var colorbar = [];
  if (depth === 1) {
    colorbar.push(c1);
  }else{
    c1 = hexToRgb(c1);
    c2 = hexToRgb(c2);
    // Convert to [0, 1] by scaling 255
    c1 = c1.map(function(x) { return x /255; }); 
    c2 = c2.map(function(x) { return x /255; });
    var dr=(c2[0]-c1[0])/(depth-1);
    var dg=(c2[1]-c1[1])/(depth-1);
    var db=(c2[2]-c1[2])/(depth-1);
    for (var i = depth; i >=1; i--) {
      colorbar.push(
        rgbToHex(
          parseInt((c1[0]+dr*(i-1))*255), // R
          parseInt((c1[1]+dg*(i-1))*255), // G
          parseInt((c1[2]+db*(i-1))*255)  // B
          )
        );
    }
  }
  return colorbar;
}
// print(colorGradient('#226633', '#90B298', 36))
function FuncYearStringList(startYear, endYear){
/* This function is to obtain string list of years for creating the iterms for year selection button
* Inputs: year of start and yead of end of the dataset
* Output: string list of year
*/
  var yearList = [];
  for (var iYear = startYear; iYear <= endYear; iYear++) { // Loop selected years
    yearList.push(iYear.toString());
  }
  return yearList;
}
function FuncExtractAgentImagePixelValueList(agentDict){
/* This function is to extract the agent code from the agent dictionary
* Inputs: agent dictionary
* Output: code list and name list for the disturbance agents
*/
  var agentCodeList = [0]; // include 0
  for (var key in agentDict){
      agentCodeList.push(agentDict[key].code);
  }
  agentCodeList.push(255); // include 255
  return agentCodeList;
}
function FuncExtractAgentList(agentDict){
/* This function is to extract the agent name from the agent dictionary
* Inputs: agent dictionary
* Output: code list and name list for the disturbance agents
*/
  var agentNameList = [];
  for (var key in agentDict){
      agentNameList.push(agentDict[key].name);
  }
  return agentNameList;
}
function FuncCreateAgentMapSLD(yearStart, yearEnd){
  /* Function of setting color for Map
  */
  var colorNum        = yearEnd - yearStart + 1;
  var colForestManagement     = FuncColorGradient(AGENT_DICT['forest management'].darkcolor,    AGENT_DICT['forest management'].brightcolor, colorNum);
  var colAgricultureActivity  = FuncColorGradient(AGENT_DICT['agriculture activity'].darkcolor, AGENT_DICT['agriculture activity'].brightcolor, colorNum);
  var colConstruction         = FuncColorGradient(AGENT_DICT['construction'].darkcolor,         AGENT_DICT['construction'].brightcolor, colorNum);
  var colStress               = FuncColorGradient(AGENT_DICT['stress'].darkcolor,               AGENT_DICT['stress'].brightcolor, colorNum);
  var colDebris               = FuncColorGradient(AGENT_DICT['debris'].darkcolor,               AGENT_DICT['debris'].brightcolor, colorNum);
  var colWaterDynamic         = FuncColorGradient(AGENT_DICT['water dynamic'].darkcolor,        AGENT_DICT['water dynamic'].brightcolor, colorNum);
  var colFire                 = FuncColorGradient(AGENT_DICT['fire'].darkcolor,                 AGENT_DICT['fire'].brightcolor, colorNum);
  var colOther                = FuncColorGradient(AGENT_DICT['other'].darkcolor,                AGENT_DICT['other'].brightcolor, colorNum);
  // setup map Properties
  MAP_PROPERTIES['Primary Disturbance Agent'].forest_management.legend     = colForestManagement;
  MAP_PROPERTIES['Primary Disturbance Agent'].agriculture_activity.legend  = colAgricultureActivity;
  MAP_PROPERTIES['Primary Disturbance Agent'].construction.legend          = colConstruction;
  MAP_PROPERTIES['Primary Disturbance Agent'].stress.legend                = colStress;
  MAP_PROPERTIES['Primary Disturbance Agent'].debris.legend                = colDebris;
  MAP_PROPERTIES['Primary Disturbance Agent'].water_dynamic.legend         = colWaterDynamic;
  MAP_PROPERTIES['Primary Disturbance Agent'].fire.legend                  = colFire;
  MAP_PROPERTIES['Primary Disturbance Agent'].other.legend                 = colOther;
  var sld_agent_part = 
    '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >';
  for (var iYear = yearStart; iYear <= yearEnd; iYear++) { // Loop selected years
    var i = iYear - yearStart;
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colForestManagement[i] +'" quantity="'+ (1 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colAgricultureActivity[i] +'" quantity="'+ (2 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colConstruction[i] +'" quantity="'+ (3 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colStress[i] +'" quantity="'+ (4 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colDebris[i] +'" quantity="'+ (5 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colWaterDynamic[i] +'" quantity="'+ (6 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colFire[i] +'" quantity="'+ (7 + 1000*iYear).toString() +'" label=" " />';
    sld_agent_part = sld_agent_part + '<ColorMapEntry color="'+ colOther[i] +'" quantity="'+ (8 + 1000*iYear).toString() +'" label=" " />';
  }
  // '<ColorMapEntry color="#E5D5F2" quantity="41985" label="debris in 1985" />' + 
  sld_agent_part = sld_agent_part + 
    '</ColorMap>' +
    '</RasterSymbolizer>';
  return sld_agent_part;
}
function FuncCreateLegendPanel(checkboxAgent, legend_agent) {
  // Function of setting dynamic legend panel
  var legendList = [];
  var legend = legend_agent;
  var len = ((202 - legend.length)/legend.length).toString(); //  - legend.length for adjusting the 1 pixel margin
  for (var i = 0; i < legend.length; i++) {
    // var colorBox = ui.Label('', { backgroundColor: item, padding: '0px 0px 15px 4.6px', margin: '0px 1px 0px 0px'});
    if (legendList.length === 0) {
      legendList.push(checkboxAgent);
    }
    legendList.push(ui.Label('', { 
      backgroundColor: legend[i],
      padding: '0px 0px 0px 0px', 
      margin: '0px 1px 0px 0px',
      width:len +'px', height: '15px'}
    ));
  }
  return ui.Panel(legendList, ui.Panel.Layout.Flow('horizontal'));
}
// *** Global static parameters
// start year of dataset
var START_YEAR_DEFAULT = 1985;
// end year of dataset
var END_YEAR_DEFAULT   = 2020; 
// total bands
var NUM_YEARS = END_YEAR_DEFAULT - START_YEAR_DEFAULT + 1;
// dictionary of agents
var AGENT_DICT         = {  'forest management':    {code: 1, name: 'For. mgt.', fullname:'forest_management',    darkcolor: '#226633', brightcolor: '#BCD1C1'},
                            'agriculture activity': {code: 2, name: 'Agr. act.', fullname:'agriculture_activity', darkcolor: '#FFFF00', brightcolor: '#FFFFB2'},
                            'construction':         {code: 3, name: 'Constr.', fullname:'construction',           darkcolor: '#DB0000', brightcolor: '#F4B2B2'},
                            'stress':               {code: 4, name: 'Stress', fullname:'stress',                  darkcolor: '#664830', brightcolor: '#D1C8C0'},
                            'debris':               {code: 5, name: 'Debris', fullname:'debris',                  darkcolor: '#5D2C70', brightcolor: '#CEBFD4'},
                            'water dynamic':        {code: 6, name: 'Wat. dyn.', fullname:'water_dynamic',        darkcolor: '#003994', brightcolor: '#B2C3DF'},
                            'fire':                 {code: 7, name: 'Fire', fullname:'fire',                      darkcolor: '#F07605', brightcolor: '#FAD5B3'},
                            'other':                {code: 8, name: 'Other', fullname:'other',                    darkcolor: '#454545', brightcolor: '#C7C7C7'}
}
// color for each disturbance agent that pre-loading to save computing resource
var AGENT_COLOR = [ AGENT_DICT['forest management'].darkcolor, 
                    AGENT_DICT['agriculture activity'].darkcolor, 
                    AGENT_DICT['construction'].darkcolor, 
                    AGENT_DICT['stress'].darkcolor, 
                    AGENT_DICT['debris'].darkcolor, 
                    AGENT_DICT['water dynamic'].darkcolor, 
                    AGENT_DICT['fire'].darkcolor, 
                    AGENT_DICT['other'].darkcolor];
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var LOCATION_DICT      = {  'CONUS':              {lon: -98,     lat: 40,     zoom: 4},
                            'Tornado in Alabama': {lon: -87.332, lat: 33.313, zoom: 11}};
// list of agent code and agent
var AGENT_NAME_LIST = FuncExtractAgentList(AGENT_DICT);
var AGENT_PIXEL_VALUE_LIST_DEFAULT = FuncExtractAgentImagePixelValueList(AGENT_DICT);
var AGENT_PIXEL_VALUE_LIST_DISPLAY = FuncExtractAgentImagePixelValueList(AGENT_DICT); // to display the agent layer or not
AGENT_PIXEL_VALUE_LIST_DISPLAY[-1] = 0; // 255 as 0
var APP_PARAMETER = { 'start year': START_YEAR_DEFAULT,
                      'end year':   END_YEAR_DEFAULT,
                      'number of years': END_YEAR_DEFAULT - START_YEAR_DEFAULT + 1,
};
var globalYearStart    = START_YEAR_DEFAULT; 
var globalYearEnd      = END_YEAR_DEFAULT;
var globalNumYears     = globalYearEnd - globalYearStart + 1; // Number of years
var fullYearList       = FuncYearStringList(START_YEAR_DEFAULT, END_YEAR_DEFAULT);
// Rename band names according to years
agentImageCollection = agentImageCollection.map(function (image) {return image.rename(fullYearList);})
// Define a palette for the 8 distinct land disturbance agent classes. This is same to sld_agent. Since we will not change it, we do not design a function to re-generate it.
var MAP_PROPERTIES = {
  'Primary Disturbance Agent': {
    name:                 'primary disturbance agent',
    forest_management:    {
      legend: FuncColorGradient(AGENT_DICT['forest management'].darkcolor,    AGENT_DICT['forest management'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true},
    agriculture_activity: {
      legend: FuncColorGradient(AGENT_DICT['agriculture activity'].darkcolor, AGENT_DICT['agriculture activity'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true},
    construction:         {
      legend: FuncColorGradient(AGENT_DICT['construction'].darkcolor,         AGENT_DICT['construction'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true},
    stress:               {
      legend: FuncColorGradient(AGENT_DICT['stress'].darkcolor,               AGENT_DICT['stress'].brightcolor, APP_PARAMETER["number of years"]),
      defaultVisibility: true},
    debris:               {
      legend: FuncColorGradient(AGENT_DICT['debris'].darkcolor,               AGENT_DICT['debris'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true},
    water_dynamic:        {
      legend: FuncColorGradient(AGENT_DICT['water dynamic'].darkcolor,        AGENT_DICT['water dynamic'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true},
    fire:                 {
      legend: FuncColorGradient(AGENT_DICT['fire'].darkcolor,                 AGENT_DICT['fire'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true},
    other:                {
      legend: FuncColorGradient(AGENT_DICT['other'].darkcolor,                AGENT_DICT['other'].brightcolor, APP_PARAMETER["number of years"]), 
      defaultVisibility: true}
  }
  //,
  //'Disturbance Time': {}
};
// Default SLD for showing all agents and all years
var AGENT_SLD = FuncCreateAgentMapSLD( START_YEAR_DEFAULT, END_YEAR_DEFAULT);
/*
* Display stype of the back background layer
* Based on Google Maps Documentation: https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyle
* Examples from snazzy maps (https://snazzymaps.com/)
*/
var SNAZZY_BACK = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}, {visibility: 'off'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
  },
  {
    // Change icon properties.
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}, {visibility: 'off'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#ffffff'}, {visibility: 'off'}]
  },
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#dedede'}, {visibility: 'off'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'road.highway', elementType: 'all', stylers: [{visibility: 'off'}]
  },
  {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
  {featureType: 'water', elementType: 'all', stylers: [{color: '#434343'}, {visibility: 'off'}]
  }
];
//******END OF STYPE******
//******START OF FUNCIONS******
var globalAgentPixDicDefault = [0, 1, 2, 3, 4, 5, 6, 7, 8, 255];
var globalAgentPixDicDisplay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 255];
// Update pixel value (disturbance type) as unique value according to disturbance year and disturbance type
function FuncUpdateAgentImage(startYear, endYear, firstYear) {
  // Default SLD for showing all agents and all years
  var stackImage = function(image){
    for (var iYear = startYear; iYear <= endYear; iYear++) { // Loop selected years
      var reflBands = image.select(iYear - firstYear);
      var bandname = reflBands.bandNames(); // keep the band name as orginal one
      // change pixel value to hide the agent we will not display
      reflBands = reflBands.remap({
        from: AGENT_PIXEL_VALUE_LIST_DEFAULT,
        to: AGENT_PIXEL_VALUE_LIST_DISPLAY, // as a zero array of which size same as globalHideCode
        defaultValue: 0
      });
      reflBands = reflBands.rename(bandname);
      //reflBands = reflBands.multiply(10000).add(iYear); // e.g., 0001985, 2551985
      reflBands = reflBands.add(1000*iYear).multiply(reflBands.gt(0)); // e.g., 1985000, 1985001, 1985255, 2020000
      image = image.addBands({srcImg: reflBands, overwrite: true}); // update the band using a same band name
    }
    // Reduce the image to get a one-band maximum value image.
    var maxValue = image.reduce(ee.Reducer.max());
    // Exclude no disturbnace and filled pixels
    //maxValue = maxValue.updateMask(maxValue.gt(endYear) || maxValue.lt(endYear + 2550000)); // 255 *10000
    maxValue = maxValue.updateMask(maxValue.gt(endYear) || maxValue.lt(100*endYear + 255)); // 255 *10000
    return maxValue.sldStyle(AGENT_SLD);
  };
  return stackImage;
}
//******END OF FUNCIONS******
//******START OF Panels
// UI component #1 for interpretaing disturbance agent samples:
var uiLabelHeaderTile        = ui.Label('CONUS Land Disturbance', {fontSize: '16px', fontWeight: 'bold', color: 'red'});
var uiLabelHeaderDescription = ui.Label('Land disturbance products over CONUS between 1985 and 2020 based on the COLD and ODACA algotithems and the Landsat time series.', {fontSize: '12px'});
// pulldown are the keys of the mapProperties dictionary.
var selectMapItems = Object.keys(MAP_PROPERTIES); 
var uiSelectMap = ui.Select({ 
  items: selectMapItems, 
  value: selectMapItems[0],
  style: {width: '200px', margin: '15px 0px 0px 3px'},
  onChange: function(selected) {
    // Single product will not triger this
    mapPanel.layers().forEach(function(element, index) {
      //element.setShown(selected == element.getName());
    });
    setLegend(MAP_PROPERTIES[selected].getValue());
  }
});
// start and end years
var uiLabelSelectYear = ui.Label('Select Year:', {fontWeight: 'bold', 'font-size': '12px', margin: '14px 0px 0px 0px',  padding: '0px 0px 0px 0px'});
var uiLabelYearTo     = ui.Label('to',           {fontWeight: 'bold', 'font-size': '12px', margin: '14px 0px 0px 26px', padding: '0px 30px 0px 0px'});
var uiSelectYearStart = ui.Select({
  items: fullYearList, value:fullYearList[0], style: {width: '59px'},
  onChange: function(selected) {
    // Force to setup the one equal to the selected end year
    if (selected > uiSelectYearEnd.getValue()){
      uiSelectYearStart.setValue(uiSelectYearEnd.getValue()); // will trigger the end year
    } else { // update the year range
      FuncUpdateMapByChangeYearRange(MAP_PROPERTIES[uiSelectMap.getValue()].name, selected, uiSelectYearEnd.getValue());
    }
  }
});
var uiSelectYearEnd   = ui.Select({
  items: fullYearList, 
  value:fullYearList[fullYearList.length - 1], 
  style: {width: '59px'},
  onChange: function(selected) {
    // Force to setup the one equal to the selected start year
    if (selected < uiSelectYearStart.getValue()){
      uiSelectYearEnd.setValue(uiSelectYearStart.getValue()); // will trigger the start year
    }else { // update the year range
      FuncUpdateMapByChangeYearRange(MAP_PROPERTIES[uiSelectMap.getValue()].name, uiSelectYearStart.getValue(), selected);
    }
  }
});
//legend's panel, which is dynamic
var legendPanel = ui.Panel();
// Panel for agent map's setup
var toolPanel1   = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {fontWeight: 'bold', fontSize: '12px', width: '275px', margin: '0 0 0 8px'} // left margin at 8 pixels 
}); 
// Add the select to the rightPanel with available [maps/products]
toolPanel1.add(ui.Panel([ui.Label('Select Layer:', {margin: '22px 0px 0px 0px'}), uiSelectMap], ui.Panel.Layout.Flow('horizontal')));
toolPanel1.add(ui.Panel([uiLabelSelectYear, uiSelectYearStart, uiLabelYearTo, uiSelectYearEnd], ui.Panel.Layout.Flow('horizontal')));
toolPanel1.add(legendPanel);
var labelReference = ui.Label('Qiu, S., Zhu, Z., & Yang, X. (2022). Characterization of land disturbances based on Landsat time series. Authorea Preprints.', 
{fontWeight: 'bold', 'font-size': '12px', margin: '9px 0px 0px 0px', padding: '0px 0px 0px 0px'}, 'https://doi.org/10.1002/essoar.10511010.1');
toolPanel1.add(ui.Label('Reference:', {fontWeight: 'bold', 'font-size': '12px', margin: '9px 0px 0px 0px', padding: '0px 0px 0px 0px'}));
toolPanel1.add(labelReference);
// Sub Panel #2: disturbance information's panel, which is dynamic
// Ansamble all the panels
var rightPanelIF  = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
rightPanelIF.add(ui.Panel([uiLabelHeaderTile], ui.Panel.Layout.Flow('horizontal')) );
rightPanelIF.add(uiLabelHeaderDescription);
rightPanelIF.add(ui.Panel([toolPanel1], ui.Panel.Layout.Flow('horizontal')));
// Create a map panel.
var mapPanel = ui.Map();
// set cursor as crosshair
mapPanel.style().set('cursor', 'crosshair');
// take all tools off the map except the zoom,  mapTypeControl, and fullscreenControl tools.
mapPanel.setControlVisibility({all: true, zoomControl: true, mapTypeControl: true, fullscreenControl: true});
// Add land disturbance agent map
mapPanel.add(ui.Map.Layer(agentImageCollection.map(FuncUpdateAgentImage(APP_PARAMETER['start year'], APP_PARAMETER['end year'], START_YEAR_DEFAULT)), {}, 
'primary disturbance agent'));
// MTBS load
var visParams = {
  color: 'ff5722',
  fillColor: 'ff8a50',
  width: 1,
  opacity: 0.5
};
// function to conditionally set properties of feature collection
var AGENT_POINT_STYLE = ee.Dictionary({
  forest_management:       {color: AGENT_DICT['forest management'].darkcolor,    pointSize: 3, pointShape: 'circle'},
  agriculture_activity:  {color: AGENT_DICT['agriculture activity'].darkcolor, pointSize: 3, pointShape: 'circle'},
  construction: {color: AGENT_DICT['construction'].darkcolor,         pointSize: 3, pointShape: 'circle'},
  stress:       {color: AGENT_DICT['stress'].darkcolor,               pointSize: 3, pointShape: 'circle'},
  debris:       {color: AGENT_DICT['debris'].darkcolor,               pointSize: 3, pointShape: 'circle'},
  water_dynamic:        {color: AGENT_DICT['water dynamic'].darkcolor,        pointSize: 3, pointShape: 'circle'},
  fire:         {color: AGENT_DICT['fire'].darkcolor,                 pointSize: 3, pointShape: 'circle'},
  other:        {color: AGENT_DICT['other'].darkcolor,                pointSize: 3, pointShape: 'circle'},
});
var setPointProperties = function(f){
  // use the class as index to lookup the corresponding display color
  return f.set('style', AGENT_POINT_STYLE.get(f.get('agent')))
}
// Setup the background as back color
mapPanel.setOptions('Black', {'Black': SNAZZY_BACK});
// Move to conus view
mapPanel.setCenter(LOCATION_DICT['CONUS'].lon, LOCATION_DICT['CONUS'].lat, LOCATION_DICT['CONUS'].zoom);
// Add map panel
ui.root.widgets().reset([mapPanel]);
// Set left to right
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add right panel
ui.root.widgets().add(ui.Panel([rightPanelIF], ui.Panel.Layout.Flow('vertical')));
function FuncUpdateMapByChangeYearRange(mapName, yearStart, yearEnd){
  // Update years
  APP_PARAMETER['start year']      = parseInt(yearStart);
  APP_PARAMETER['end year']        = parseInt(yearEnd);
  APP_PARAMETER['number of years'] = APP_PARAMETER['end year'] - APP_PARAMETER['start year'] + 1; // Number of years
  // update the legend color
  AGENT_SLD = FuncCreateAgentMapSLD(APP_PARAMETER['start year'], APP_PARAMETER['end year'] );
  refreshDisplayMap(mapName);
  setLegend(MAP_PROPERTIES[uiSelectMap.getValue()]);
}
function refreshDisplayMap(mapName){
  // Single product will not triger this
  mapPanel.layers().forEach(function(element, index) {
    if (('primary disturbance agent' === mapName) && (element.getName() === mapName)){
      element.setEeObject(agentImageCollection.map(FuncUpdateAgentImage(parseInt(uiSelectYearStart.getValue()), parseInt(uiSelectYearEnd.getValue()), START_YEAR_DEFAULT)));
    }
  });
}
function FuncUpdateAgentPixelValueDisplayList(agentVisible, agentName){
  for (var key in AGENT_DICT){
    var agentcode_k = AGENT_DICT[key].code;
    var agentname_k = AGENT_DICT[key].name;
    if (agentname_k === agentName){
      if (agentVisible) {
        AGENT_PIXEL_VALUE_LIST_DISPLAY[agentcode_k] = AGENT_PIXEL_VALUE_LIST_DEFAULT[agentcode_k];
      } else {
        AGENT_PIXEL_VALUE_LIST_DISPLAY[agentcode_k] = 0; // set as to be invisible
      }
      return; // only one time possiblily
    }
  }
}
// Function of adding the legends
function setAgentLegend() {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  legendPanel.clear();
  var agentLegendCheckboxs = [];
  var icheck = 0;
  for (var key in AGENT_DICT){
    // change the status of the check box
    var checked = AGENT_PIXEL_VALUE_LIST_DISPLAY[AGENT_DICT[key].code] === AGENT_PIXEL_VALUE_LIST_DEFAULT[AGENT_DICT[key].code];
    agentLegendCheckboxs[icheck]  = ui.Checkbox(
      {
      label: AGENT_DICT[key].name, 
      value: checked, 
      style: {padding: '0px 0px 10px 0px', margin: '0px 1px 0px 0px', width: '71px'},
      onChange: function(value, cbxobj) {
        FuncUpdateAgentPixelValueDisplayList(value, cbxobj.getLabel()); // action according to yes/no and label of the selection
        refreshDisplayMap(MAP_PROPERTIES[uiSelectMap.getValue()].name);
      }
    });
    // add the panel to show
    legendPanel.add(
        FuncCreateLegendPanel(
          agentLegendCheckboxs[icheck], 
          FuncColorGradient(AGENT_DICT[key].darkcolor, AGENT_DICT[key].brightcolor, APP_PARAMETER["number of years"])
          )
      );
    icheck++;
  }
  agentLegendCheckboxs = [];
}
function setLegend(mapName){
  if (mapName.name == 'primary disturbance agent') {
    setAgentLegend();
    return;
  }
}
/**
* Get Landsat pixel bounds in a given projection
* @param {ee.Geometry.Point} point A point geometry
* @param {ee.Projection or EPSG code} projection Projection to use for retrieving the pixel bounds
* @returns {ee.Geometry} Bounds of the intersecting pixel in the specified projection
*/
function getBounds(point, projection){
  var toProj = ee.Projection(projection).atScale(30)
  var c1 = point.transform(toProj, 1).coordinates()
    .map(function(p) {
      return ee.Number(p).floor()
    })
  var c2 = c1.map(function(p) { return ee.Number(p).add(1) })
  var p2 =  ee.Geometry.LineString([c1, c2], toProj)
  return p2.bounds()
}
// Set the initial legend
setLegend(MAP_PROPERTIES[uiSelectMap.getValue()]);