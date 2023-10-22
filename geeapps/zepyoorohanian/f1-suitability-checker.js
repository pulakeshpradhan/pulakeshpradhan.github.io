// F1 Suitability Checker -- GEE App
// Zepyoor Ohanian - MAGIST Capstone Project - Class of 2022 
// Import current F1 street circuits (Monaco, Singapore, Sochi, Melbourne, Montreal)
var table = ee.FeatureCollection("users/zepyoorohanian/street_circuits");
// Create interactive panel
ui.root.clear();
var panel = ui.Panel({style: {width: '320px', margin: '30px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.add(ui.Label('F1 Suitability Checker', {fontWeight: 'bold', fontSize: '24px', position: 'top-center'}));
var intro = ui.Label('Formula 1 Grand Prix: Street Circuit Suitability _________________________ Elevation, Slope, and Hospitals/Clinics Checker', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px', textAlign: 'center', color: 'red'}
);
var header = ui.Label('See how your chosen area matches up to F1 standards!', 
  {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px', textAlign: 'center', color: '#f55142'}
);
var subtitle = ui.Label('Use this tool to analyze the elevation & slope of'+
  ' a potential street circuit, and check for nearby hospitals/clinics. Click on any area on the map to see the exact data for those'+
  ' coordinates, and customize the info displayed with the checkboxes. Check out the similarities'+
  ' between the five current street circuits as well, located in Monaco, Singapore, Sochi, Melbourne,'+
  ' and Montreal! _____________________________________________ ', {textAlign:'center'});
panel.add(intro).add(header).add(subtitle);
// Set map to Circuit de Monaco in Monte Carlo
map.setCenter(7.424823, 43.737335, 15.5);
map.style().set('cursor', 'crosshair');
// Define variable names
var ELEVATION = 'Elevation';
var SLOPE = 'Slope';
var HOSPITALS = 'Hospitals/Clinics';
var LESS_THAN = 'Less than';
var GREATER_THAN = 'Greater than';
// Create an empty list for constraints
var constraints = [];
// Import the NASA SRTM 30m Digital Elevation Model, hospitals/clinics, and create slope
var elevation = ee.Image('USGS/SRTMGL1_003');
var elevationVis = elevation.visualize({min: 0, max: 1000, palette: ['006633', 'E5FFCC', '662A00', 'D8D8D8', 'F5F5F5'], opacity: 0.7});
var slope = ee.Terrain.slope(elevation);
var slopeVis = slope.visualize({min: 0, max: 30, palette: ['#49a83e', '#fff200','#ff0000'], opacity: 0.5});
var hospitals = ee.FeatureCollection("projects/f1-suitability/assets/hospitals_clinics");
// First selector for map layer
var select = ui.Select({
  items: [ELEVATION, SLOPE, HOSPITALS],
  style: {width: '270px'},
  value: ELEVATION,
  onChange: redraw,
});
panel.add(ui.Label('Track:',  {fontWeight: 'bold', fontSize: '18px', margin: '5px 5px', color:'#f55142'}));
panel.add(ui.Label("Let's add your track!", {textAlign: 'center'}));
// Textbox for user to paste geoJSON file
var track = ui.Textbox({
  placeholder: 'Paste track here',
  style: {width: '270px'},
  onChange: function(value) {
    track.setValue(value);
    return(value);
  }
});
panel.add(track);
function makeFeature(item) {
  var feature = ee.Feature(null)
    .setGeometry(ee.Geometry.Point(item));
  return feature;
}
// Button to add track, zoom to it, and create an elevation profile
var button = ui.Button({
  label: 'Go to Track',
  style: {width: '270px'},
  onClick: function() {
  var circuitLinear = ee.FeatureCollection(ee.Geometry.LineString(JSON.parse(track.getValue())));
  var circuit = ee.FeatureCollection(ee.Geometry.MultiPoint(JSON.parse(track.getValue()))).geometry().coordinates();
  var circuitFc = ee.FeatureCollection(circuit.map(makeFeature));
  var circuitFc = elevation.sampleRegions({
    collection: circuitFc,
    geometries: true
  });
  var circuitLayer = ui.Map.Layer(circuitLinear, {}, "Your Track");
  map.layers().set(1, circuitLayer);
  map.centerObject(circuitFc, 15.5);
  var chartStyle = {
    title: 'Elevation Along Circuit',
    fontSize: 14,
    hAxis: {
      title: '',
      titleTextStyle: {italic: false, bold: true},
      gridlines: {color: 'FFFFFF'}
  },
  legend: {position: 'none'},
  vAxis: {
    title: 'Elevation (meters)',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  series: {
    0: {lineWidth: 2, color: 'red'}
  },
  chartArea: {backgroundColor: 'EBEBEB'}
  };
  var chart = ui.Chart.feature.byFeature({
    features: circuitFc,
    yProperties: 'elevation'
  });
  var chartPanel = ui.Panel(chart.setChartType('AreaChart'),
    ui.Panel.Layout.flow('horizontal'), 
    {width: '417px', position: 'bottom-left'});
  chart.setOptions(chartStyle);
  map.add(chartPanel);
}});
panel.add(button);
panel.add(ui.Label('Value:',  {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px', color:'#f55142'}));
panel.add(ui.Label("Choose the data to display on the map!"));
panel.add(select);
panel.add(ui.Label('Info box:', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px', color:'#f55142'}));
panel.add(ui.Label("After checking one or both of the boxes, click anywhere on the map to get statistics!"));
// Checkboxes for info box
var elevationCheck = ui.Checkbox(ELEVATION).setValue(false);
panel.add(elevationCheck);
var slopeCheck = ui.Checkbox(SLOPE).setValue(false);
panel.add(slopeCheck);
var inspector = ui.Panel({style: {shown: false, position: 'middle-right'}});
map.add(inspector);
// Allows user to click on any point to get coordinates and provide info depending on which checkboxes are chosen
map.onClick(function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = ee.Image.cat(elevation, slope)
      .unmask(0).sample(point, 30).first().toDictionary();
  sample.evaluate(function(values) {
    inspector.clear();
    if (elevationCheck.getValue()) {
      inspector.add(ui.Label('Elevation: ' + values.elevation + ' meters'));
    }
    if (slopeCheck.getValue()) {
      inspector.add(ui.Label('Slope: ' + Math.round(values.slope) + ' degrees'));
    }
    inspector.add(ui.Button('Close', function() {
      inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
});
panel.add(ui.Label('Filter by Value:', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px', color:'#f55142'}));
panel.add(ui.Label("You can also search for areas greater than/less than a specific elevation and/or slope value!"));
// Constraints to filter layer by value
var constraint = ui.Select({
  items: [ELEVATION, SLOPE],
  style: {width: '270px'},
  placeholder: 'Choose a variable',
  onChange: selectConstraint,
});
panel.add(constraint);
function addConstraint(name, image, defaultValue) {
  panel.add(ui.Label('Filter by ' + name + ':'));
  var subpanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  var mode = ui.Select({
    items: [GREATER_THAN, LESS_THAN],
    value: LESS_THAN,
    onChange: redraw,
  });
  subpanel.add(mode);
  var input = ui.Textbox({
    value: defaultValue,
    style: {width: '100px'},
    onChange: redraw,
  });
  subpanel.add(input);
  panel.add(subpanel);
  constraints.push({
    image: image,
    mode: mode,
    value: input,
  });
  redraw();
}
function selectConstraint(name) {
  if (name == ELEVATION) {
    addConstraint(name, elevation, 20);
  } else if (name == SLOPE) {
    addConstraint(name, slope, 5);
  }
  constraint.setValue(null);
}
// Updates the layers based on what the user chooses
function redraw() {
  var layer = select.getValue();
  var image;
  if (layer == ELEVATION) {
    image = elevationVis;
    var Layer = ui.Map.Layer(image, {}, "Elevation");
    map.layers().set(0, Layer);
  } else if (layer == SLOPE) {
    image = slopeVis;
    var Layer = ui.Map.Layer(image, {}, "Slope");
    map.layers().set(0, Layer);
  } else if (layer == HOSPITALS) {
    var style = {color: 'red'};
    image = hospitals.style(style);
    var Layer = ui.Map.Layer(image, {}, "Hospitals/Clinics");
    map.layers().set(0, Layer);
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    var input = panel.widgets().get(18).widgets().get(1).getValue();
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
      var Layer = ui.Map.Layer(image).setName(ee.String(mode).cat(' ').cat(ee.Number(input)).getInfo());
      map.layers().set(0, Layer);
    } else {
      image = image.updateMask(constraint.image.lt(value));
      var Layer = ui.Map.Layer(image).setName(ee.String(mode).cat(' ').cat(ee.Number(input)).getInfo());
      map.layers().set(0, Layer);
    }
  }
  // Use the following code to make sure the filtered value textbox is widget #18
  // print (panel.widgets().get(18).widgets())
// Adds current F1 street circuits to map
var styling = {color: 'black', fillColor: '00000000'};
var current = ui.Map.Layer(table.style(styling), {}, "Current F1 Street Circuits");
map.layers().set(2, current);
}
// Elevation legend colors
function ColorBar() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: ['006633', 'E5FFCC', '662A00', 'D8D8D8', 'F5F5F5'],
      opacity: 0.7,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Create panel for elevation legend
function makeLegend() {
  var labelPanel = ui.Panel(
      [ui.Label('0', {margin: '4px 8px'}),
        ui.Label('500', {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('1000', {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(), labelPanel]);
}
// Slope legend colors
function ColorBar1() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: ['#49a83e', '#fff200','#ff0000'],
      opacity: 0.7,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Create panel for slope legend
function makeLegend1() {
  var labelPanel1 = ui.Panel(
      [ui.Label('0', {margin: '4px 8px'}),
        ui.Label('15', {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('30', {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar1(), labelPanel1]);
}
// Legend styling
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Legend styling for credits/data source
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Add legend to map
map.add(ui.Panel([ui.Label('Elevation', LEGEND_TITLE_STYLE), makeLegend(),
    ui.Label('(meters)', LEGEND_FOOTNOTE_STYLE), 
    ui.Label('Slope', LEGEND_TITLE_STYLE), makeLegend1(),
    ui.Label('(degrees)', LEGEND_FOOTNOTE_STYLE),
    ui.Label('Source: NASA SRTM Digital Elevation 30m', LEGEND_FOOTNOTE_STYLE)],
    ui.Panel.Layout.flow('vertical'), {width: '230px', position: 'bottom-right'}));
// Call the redraw() function to update the layers
redraw();