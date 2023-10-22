var statImg = ui.import && ui.import("statImg", "image", {
      "id": "users/zandersamuel/Collaboration/SA_justice/app_stack_simple_30m"
    }) || ee.Image("users/zandersamuel/Collaboration/SA_justice/app_stack_simple_30m"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            18.57436630251394,
            -33.99118199030321
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([18.57436630251394, -33.99118199030321]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            28.042110503047248,
            -26.210182110304338
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([28.042110503047248, -26.210182110304338]),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            31.027517370497907,
            -29.855589215201036
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([31.027517370497907, -29.855589215201036]),
    geometry4 = ui.import && ui.import("geometry4", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            25.605260501566715,
            -33.94988697206309
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([25.605260501566715, -33.94988697206309]),
    geometry5 = ui.import && ui.import("geometry5", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            27.891817407558825,
            -32.99060298158156
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Point([27.891817407558825, -32.99060298158156]),
    geometry6 = ui.import && ui.import("geometry6", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            26.22329480014866,
            -29.11994218672816
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Point([26.22329480014866, -29.11994218672816]),
    pts = ui.import && ui.import("pts", "table", {
      "id": "users/zandersamuel/Collaboration/SA_justice/people_pts"
    }) || ee.FeatureCollection("users/zandersamuel/Collaboration/SA_justice/people_pts"),
    stats = ui.import && ui.import("stats", "table", {
      "id": "users/zandersamuel/Collaboration/SA_justice/SAL_SA_2013_withStats"
    }) || ee.FeatureCollection("users/zandersamuel/Collaboration/SA_justice/SAL_SA_2013_withStats"),
    geometry7 = ui.import && ui.import("geometry7", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            22.56868500428746,
            -32.3560543360604
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([22.56868500428746, -32.3560543360604]),
    geometry8 = ui.import && ui.import("geometry8", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            21.25032562928746,
            -28.40515861740845
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([21.25032562928746, -28.40515861740845]),
    geometry9 = ui.import && ui.import("geometry9", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.743977973037456,
            -28.723577531294158
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([24.743977973037456, -28.723577531294158]),
    geometry10 = ui.import && ui.import("geometry10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            29.435140082412456,
            -23.880047607304054
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([29.435140082412456, -23.880047607304054]),
    geometry11 = ui.import && ui.import("geometry11", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            28.226643988662456,
            -25.685331565121114
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Point([28.226643988662456, -25.685331565121114]),
    geometry12 = ui.import && ui.import("geometry12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            26.76105419178228,
            -27.99899090457396
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Point([26.76105419178228, -27.99899090457396]),
    geometry13 = ui.import && ui.import("geometry13", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            30.37006298084478,
            -29.601861367480176
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Point([30.37006298084478, -29.601861367480176]),
    geometry14 = ui.import && ui.import("geometry14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            30.974348913922114,
            -25.447477179124455
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ff00 */ee.Geometry.Point([30.974348913922114, -25.447477179124455]);
stats = stats.filterMetadata('raceCat', 'not_equals', 'other')
var GREY = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
var greenPal = ['#D73027', '#FC8D59', '#FEE08B', '#D9EF8B', '#91CF60', '#1A9850'] 
var greenPal2 = ['#d13328', '#f2e48b', '#09c050'] 
var virdis = 'FDE725, B5DE2C,6CCE59,35B779,35B779,1E9E89,25838E,31688E,3E4A89,472878,440154';
var virdis_inv = '440154,472878,3E4A89,31688E,25838E,1E9E89,35B779,6CCE59,B5DE2C,FDE725';
var raceVizImg = statImg.select('racCtNm')//.focal_mode()
  .visualize({min:1, max:4, palette:['#f9837b', '#acae19', '#19c58a', '#c87cff'], opacity:0.7})
var incImg = statImg.select('incmAvC');
var greenImg = statImg.select('ndvi_rl');
var racePtsViz = pts.map(function(ft){
  return ft.set( 'styleManual', {color: ft.get('color'), pointSize: 1})
})
var incDict = {
  min: 0,
  max: 1500,
  palette: virdis_inv,
  opacity:0.7
}
var grnDict = {
  min: -20,
  max: 20,
  palette: greenPal2,
  opacity:0.7
}
var raceDict = {
  'Black African': '#f9837b',
  'Coloured': '#19c58a',
  'Indian': '#c87cff',
  'White':'#acae19'
}
var incomeDict = {
  'Low Income': '#472878',
  'High Income':'#FDE725'
}
var greenDict = {
  'Low Greenery': '#d13328',
  'Moderate Greenery':'#f2e48b',
  'High Greenery':'#09c050'
}
var configGeoms = {
  'Beufort West': geometry7,
  'Bloemfontein': geometry6,
  'Cape Town': geometry,
  'Durban': geometry3,
  'East London': geometry5,
  'Johannesburg': geometry2,
  'Kimberly': geometry9,
  'Nelspruit': geometry14,
  'Pietermatitxburg': geometry13,
  'Polokwane': geometry10,
  'Port Elizabeth': geometry4,
  'Pretoria': geometry11,
  'Uppington': geometry8,
  'Welkom': geometry12,
}
var overlayDict = {
  'Greatest': {
    'checked': false,
    'value': 10
  },
  'Least': {
    'checked': false,
    'value': 10
  }
}
var slideDict = {
  'value': 10
}
var configStyles = {
  titleStyle: {
      fontSize: '20px',
      fontWeight: '100',
      padding: '5px 5px 5px 5px' ,
    },
  textStyle: {
      padding:  '2px 2px 2px 2px' ,
      fontSize: '14px'
    },
  textStyle2: {
      padding:  '2px 2px 2px 2px' ,
      fontSize: '12px'
    }
}
var pieOptions1 = {
  title: 'Share of population',
  titleTextStyle: {fontSize:15},
  slices: {0: {color: '#f9837b'},1: {color: '#19c58a'}, 2:{color:'#c87cff'}, 3:{color:'#acae19'}},
  legend: { position: 'bottom', maxLines: 3},
  chartArea: {backgroundColor: '#000000',width:'50%'}
};
var pieOptions2 = {
  legend: { position: 'bottom', maxLines: 3},
  title: 'Share of per capita income',
  titleTextStyle: {fontSize:15},
  slices: {0: {color: '#f9837b'},1: {color: '#19c58a'}, 2:{color:'#c87cff'}, 3:{color:'#acae19'}},
};
var pieOptions3 = {
  title: 'Share of greenery',
  titleTextStyle: {fontSize:15},
  slices: {0: {color: '#f9837b'},1: {color: '#19c58a'}, 2:{color:'#c87cff'}, 3:{color:'#acae19'}},
  legend: { position: 'bottom', maxLines: 3},
};
var titleText = ui.Label({
    value: "Green apartheid in my city",
    style: configStyles.titleStyle
  });
var paperText = ui.Panel([
    //ui.Label('Refer to scientific paper here:',  configStyles.textStyle2),
    ui.Label('Link to scientific paper',  configStyles.textStyle2, 'https://www.sciencedirect.com/science/article/pii/S0169204620303947')
    ], 
    ui.Panel.Layout.flow('horizontal', true))
var paperText = ui.Label('Link to scientific paper',  configStyles.textStyle2, 'https://www.sciencedirect.com/science/article/pii/S0169204620303947');
var panelBreak25 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '000', margin: '2px 0px 2px 0px'});
var panelBreak75 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '000', margin: '2px 0px 2px 0px'});
/// Make city select panel
var citySelect = ui.Select(Object.keys(configGeoms), 'Durban', 'Durban', handleCitySelect)
var cityInstruct = ui.Label('Zoom to a city:',configStyles.textStyle);
var citySelPanel = ui.Panel([cityInstruct, citySelect])
/// Make toggle panel
function makeSlider(){
  var slider = ui.Slider(0,20,slideDict['value'],1,function(val){slideDict['value'] = val},
    'horizontal', false, {padding: '-10px', fontSize: '13px'})
  var lab1 = ui.Label('Display top ', configStyles.textStyle2)
  var lab2 = ui.Label('suburbs in...', configStyles.textStyle2)
  var holder =  ui.Panel([lab1, slider, lab2], 
    ui.Panel.Layout.flow('horizontal', true))
  return holder
}
function makeCheck(key){
  var check = ui.Checkbox('', overlayDict[key]['checked'], function(val){overlayDict[key]['checked'] = val})
  var lab1 = ui.Label(key, configStyles.textStyle2)
  var holder =  ui.Panel([check, lab1], 
    ui.Panel.Layout.flow('horizontal', true))
  return holder
}
var togglePanel = ui.Panel([
  makeSlider(),
  makeCheck('Greatest'),
  makeCheck('Least'),
  ui.Label('...need of environmental justice.')
])
// Add notes panel
function makeNote(text, url){
  return ui.Label({
    value: text,
    style: configStyles.textStyle2,
    targetUrl:  url
  })
}
var notesText = ui.Panel([
  makeNote( 'Please refer to scientific publication for methodology details and assumptions.',''),
  makeNote('* All statistics represent the state in ca. 2011, based on SA census data and satellite-derived measures of greenness.'),
  makeNote('* Graphs are updated based on the census tracts within the bounds of your map field of view.'),
  makeNote('* At higher zoom levels, race categories are depicted with dots on the map with 1 dot = 10 citizens.'),
  makeNote('* Greenery is defined as the average normalized difference vegetation index (NDVI) over inhabited land.'),
  ],  ui.Panel.Layout.flow('vertical'), {shown: false});
// Add notes button
var notesButton = ui.Button('See notes', handleNotes)
// Add legend button
var legendButton = ui.Button('Hide legends', handleLegend)
// Add swipe option button
var swipeButton = ui.Button('Swipe maps', handleSwipe);
// Add update map button
var updateMapButton = ui.Button('Update maps for this area', updateVizParams);
var mapButtonPanel1 = ui.Panel([updateMapButton],  ui.Panel.Layout.flow('horizontal'));
var mapButtonPanel12= ui.Panel([swipeButton],  ui.Panel.Layout.flow('horizontal'));
var notesPanel = ui.Panel([notesButton, notesText])
// Add update graphs button
var updateGraphButton = ui.Button('Update graphs for this area', updateGraphs);
var mapControlPanel = ui.Panel([
  ui.Label('OR manually zoom and...', configStyles.textStyle),
  //mapButtonPanel1,
  updateGraphButton,
  mapButtonPanel12
  ]);
// Add close graphs button
var graphsButton = ui.Button('Hide graphs', handleGraphClose)
var hidePanel = ui.Panel([legendButton, graphsButton],  ui.Panel.Layout.flow('horizontal'));
// Make maps.
var leftMap = ui.Map();
var middleMap = ui.Map();
var rightMap = ui.Map();
// Set map properties
leftMap.setControlVisibility({mapTypeControl:false, layerList: false, zoomControl: true, fullscreenControl: false});
leftMap.setOptions('Grey', {Grey: GREY})
middleMap.setControlVisibility({mapTypeControl:false, layerList: false, zoomControl: false, fullscreenControl: false});
middleMap.setOptions('Grey', {Grey: GREY})
rightMap.setControlVisibility({mapTypeControl:false, layerList: false, zoomControl: false, fullscreenControl: false});
rightMap.setOptions('Grey', {Grey: GREY})
leftMap.drawingTools().setShown(false);
middleMap.drawingTools().setShown(false);
rightMap.drawingTools().setShown(false);
// Link the default Map to the other map.
var linker = ui.Map.Linker([leftMap, rightMap, middleMap]);
leftMap.centerObject(configGeoms['Cape Town'], 9)
// Define the info panel.
var infoPanel = ui.Panel({style: {width: '15%'}});
infoPanel
  .add(titleText)
  .add(paperText)
  .add(panelBreak25)
  .add(citySelPanel)
  //.add(togglePanel)
  .add(mapControlPanel)
  .add(hidePanel)
  .add(panelBreak75)
  .add(notesPanel);
// Define the graph panel.
var graphPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {height: '30%'}
});
// Define sub graph panels
var chartPan1 =ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {position:'top-center', backgroundColor: '#ffffff66'}
});
var chartPan2 =ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: { position:'top-center', backgroundColor: '#ffffff66'}
});
var chartPan3 =ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {position:'top-center', backgroundColor: '#ffffff66'}
});
leftMap.add(chartPan1)
middleMap.add(chartPan2)
rightMap.add(chartPan3)
var sliderPanelMaps = ui.SplitPanel({
  firstPanel: ui.Panel(leftMap, null, {width: '50%'}),
  secondPanel: ui.Panel(middleMap, null, {width: '50%'}),
  orientation: 'horizontal',
  wipe: false,
  style: {stretch: 'both'}
});
var sliderPanelMaps2 = ui.SplitPanel({
  firstPanel: ui.Panel(sliderPanelMaps),
  secondPanel: ui.Panel(rightMap, null, {width: '33%'}),
  orientation: 'horizontal',
  wipe: false,
  style: {stretch: 'both'}
});
//var mapSplit = ui.SplitPanel({
//  firstPanel: graphPanel, //
//  secondPanel:  ui.Panel(sliderPanelMaps2, null, {height: '70%'}),
//  orientation: 'vertical',
//  wipe: false,
//})
var mapSplitPanel = ui.Panel(sliderPanelMaps2);
// Make the info panel and slider panel split.
var splitPanel = ui.SplitPanel(infoPanel, mapSplitPanel);
// Set the SplitPanel as the only thing in root.
ui.root.clear();
ui.root.widgets().reset([splitPanel]);
///// Functions --------------------------------------------------------------------------
function makeLegendEntry(color, label) {
  label = ui.Label(label, {
    margin: 'auto 0',
    fontWeight: '100',
    color: '#555'
  });
  return makeRow([makeColorBox(color), label]);
}
function makeColorBox(color) {
  return ui.Label('', {
    backgroundColor: color,  
    padding: '8px',
    margin: '5px',
    border: '1px solid gray',
  })
}
function makeRow(widgets) {
  return ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      padding: '0px 5px',
    }
  })
}
function makeLegend(data, title, position) {
  // Start with a ui.Panel:
  var legend = ui.Panel({
    style: {
      //width: '125px',
      position: position,
      border: '1px solid lightgray',
    }
  });
  // Add a title to the legend:
  //legend.add(ui.Label(title, {
  //  fontWeight: '100',
  //  color: 'gray',
  //}));
  Object.keys(data).map(function(label){
    legend.add(makeLegendEntry(data[label], label));
  });
  return legend;
}
var leftLeg = makeLegend(raceDict, '', 'bottom-left')
leftMap.add(leftLeg)
var middleLeg = makeLegend(incomeDict, '', 'bottom-left')
middleMap.add(middleLeg)
var rightLeg = makeLegend(greenDict, '', 'bottom-left')
rightMap.add(rightLeg)
var swipeShow = true;
function handleSwipe() {
  if(swipeShow){
    leftLeg = makeLegend(raceDict, '', 'bottom-left')
    leftMap.widgets().set(1, leftLeg)
    middleLeg = makeLegend(incomeDict, '', 'bottom-center')
    middleMap.widgets().set(1, middleLeg)
    rightLeg = makeLegend(greenDict, '', 'bottom-right')
    rightMap.widgets().set(1, rightLeg)
    swipeShow = false;
    swipeButton.setLabel('Fix maps');
    sliderPanelMaps.setWipe(true);
    sliderPanelMaps2.setWipe(true);
  } else {
    leftLeg = makeLegend(raceDict, '', 'bottom-left')
    leftMap.widgets().set(1, leftLeg)
    middleLeg = makeLegend(incomeDict, '', 'bottom-left')
    middleMap.widgets().set(1,middleLeg)
    rightLeg = makeLegend(greenDict, '', 'bottom-left')
    rightMap.widgets().set(1,rightLeg)
    swipeShow = true;
    swipeButton.setLabel('Swipe maps');  
    sliderPanelMaps.setWipe(false);
    sliderPanelMaps2.setWipe(false);
  }
}
var legShow = true;
function handleLegend(){
  if(legShow){
    legShow = false;
    legendButton.setLabel('See legends');
    leftLeg.style().set('shown', false);
    middleLeg.style().set('shown', false);
    rightLeg.style().set('shown', false);
  } else {
    legShow = true;
    legendButton.setLabel('Hide legends'); 
    leftLeg.style().set('shown', true);
    middleLeg.style().set('shown', true);
    rightLeg.style().set('shown', true);
  }
}
var graphShow = true;
function handleGraphClose(){
  if(graphShow){
    graphShow = false;
    graphsButton.setLabel('See graphs');
    chartPan1.style().set('shown', false);
    chartPan2.style().set('shown', false);
    chartPan3.style().set('shown', false);
  } else {
    graphShow = true;
    graphsButton.setLabel('Hide graphs'); 
    chartPan1.style().set('shown', true);
    chartPan2.style().set('shown', true);
    chartPan3.style().set('shown', true);
  }
}
var notesShow = false;
function handleNotes() {
  if(notesShow){
    notesShow = false;
    notesText.style().set('shown', false);
    notesButton.setLabel('See notes');
  } else {
    notesShow = true;
    notesText.style().set('shown', true);
    notesButton.setLabel('Hide notes');    
  }
}
function updateVizParams(){
  var zoom = leftMap.getZoom();
  if (zoom >= 9){
    updateMapButton.setLabel('Loading maps...').style().set('color','red')
    var geom = ee.Geometry.Rectangle(leftMap.getBounds(), null, false);
    var imgCol = incImg.addBands(greenImg)
    var minmax = imgCol.reduceRegion(ee.Reducer.percentile([1, 97]), geom, 300);
    //print(minmax)
     minmax.evaluate(ui.util.debounce(function(val){
      updateMapButton.setLabel('Update maps for this area')
      updateMapButton.style().set('color','black')
      incDict.min = val['incmAvC_p1']
      incDict.max = val['incmAvC_p97']
      grnDict.min = val['ndvi_rl_p1']
      grnDict.max = val['ndvi_rl_p97']
      updateMaps()
    }, 500))  
  } else {
    updateMapButton.setLabel('Please zoom in further...')
    updateMapButton.style().set('color','red')
  }
}
function handleOverlays(){
  var geom = ee.Geometry.Rectangle(leftMap.getBounds(), null, false);
  var statsSel = stats.filterBounds(geom)
  var thresh = slideDict['value']
  if (overlayDict['Greatest']['checked']){
    var lowerTracts = statsSel.sort('ndvi_rl', true).limit(thresh)
      .style({width:3, color:'#000000'});
    rightMap.layers().add(lowerTracts)
  }
  if (overlayDict['Least']['checked']){
    var topTracts = statsSel.sort('ndvi_rl', false).limit(thresh)
      .style({width:3, color:'#ffffff'});
    rightMap.layers().add(topTracts)
  }
}
function updateMaps(){
  leftMap.layers().reset([ui.Map.Layer(raceVizImg)])
  var incLayer = ui.Map.Layer(incImg, incDict)
  middleMap.layers().reset([incLayer])
  var greenLayer = ui.Map.Layer(greenImg, grnDict)
  rightMap.layers().reset([greenLayer])
  //handleOverlays()
}
//updateVizParams()
var ptsFlag = 0;
function handlePts(){
  if(ptsFlag === 0){
    var ptsLayer = ui.Map.Layer(racePtsViz.style({styleProperty : 'styleManual'}))
    leftMap.layers().reset([ptsLayer]);
  } else if (ptsFlag == 2){
    var raceLayer = ui.Map.Layer(raceVizImg)
    leftMap.layers().reset([raceLayer]);
  }
}
leftMap.onChangeZoom(function(zoom){
  if (zoom > 9){
    updateMapButton.setLabel('Update maps for this area')
    updateMapButton.style().set('color','black')
    if (zoom > 11){
      handlePts()
      ptsFlag = 1
    }
  }
  if (zoom <= 11 && ptsFlag == 1){
      ptsFlag = 2
      handlePts()
      ptsFlag = 0
  }
})
function handleCitySelect(city){
  leftMap.centerObject(configGeoms[city], 10);
  updateVizParams();
  updateGraphs();
}
var graphFlag = 0;
function updateGraphs(){
  var geom = ee.Geometry.Rectangle(leftMap.getBounds(), null, false);
  var statsSel = stats.filterBounds(geom)
  var dummy = ee.FeatureCollection([
    ee.Feature(null,{raceCat:'african', popNum:1, ndviTotal:0,incomAv:0}),
    ee.Feature(null,{raceCat:'coloured', popNum:1, ndviTotal:0,incomAv:0}),
    ee.Feature(null,{raceCat:'indian', popNum:1, ndviTotal:0,incomAv:0}),
    ee.Feature(null,{raceCat:'white', popNum:1, ndviTotal:0,incomAv:0})])
  var sums = statsSel.merge(dummy)
    .filter(ee.Filter.and(
      ee.Filter.neq('incomAv', null),
      ee.Filter.neq('ndviTotal', null)))
    .reduceColumns({
      selectors: ['popNum', 'incomeAv', 'ndviTotal', 'raceCat'],
      reducer: ee.Reducer.sum().repeat(2).combine(ee.Reducer.mean()).group({
      //reducer: ee.Reducer.sum().repeat(4).group({
        groupField: 3,
        groupName: 'race',
      })
  });
  var toPlot = ee.List(sums.get('groups')).map(function(i){
    var dict = ee.Dictionary(i);
    var race = dict.get('race');
    var list = ee.List(dict.get('sum'))
    var pop = ee.Number(list.get(0))
    var inc = ee.Number(list.get(1)).divide(pop)
    var green = ee.Number(ee.List(dict.get('mean')))//.divide(pop)
    //var green = ee.Number(list.get(2)).multiply(area).divide(pop)
    return ee.Feature(null, {race:race, pop:pop, inc:inc, green:green})
  })
  toPlot = ee.FeatureCollection(toPlot)
  var chart1 = ui.Chart.feature.byFeature(toPlot, 'race', 'pop')
    .setChartType('PieChart')
    .setOptions(pieOptions1);
  chartPan1.widgets().reset([chart1]);
  var chart2 = ui.Chart.feature.byFeature(toPlot, 'race', 'inc')
    .setChartType('PieChart')
    .setOptions(pieOptions2);
  chartPan2.widgets().reset([chart2]);
  var chart3 = ui.Chart.feature.byFeature(toPlot, 'race', 'green')
    .setChartType('PieChart')
    .setOptions(pieOptions3);
  chartPan3.widgets().reset([chart3]);
}
var start = ui.util.setTimeout(function (){
  citySelect.setValue('Cape Town', true)
 // leftMapTop.layers().set(0, ui.Map.Layer(ee.Image(1)))
}, 2000)
start