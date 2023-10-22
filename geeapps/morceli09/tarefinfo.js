/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var ulb = ee.FeatureCollection("users/morceli09/el_taref");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Import the following datasets
// First three are public - GPM precipitation data, ALOS Elevation data and WaPOR ET data
// The fourth data is study area boundary which shoulld be available in your assets.
var GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06");
var dsm = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
var ETIa = ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D");
// Below line set the default background map to Google satellite
Map.setOptions('HYBRID');
// Below line set the default cursor style to crosshair (better to pin point pixel)
Map.style().set('cursor', 'crosshair');
// What we are interested is the first band - DSM
// Let us set a palette to visualize this elevation
var elevPalette = ['yellow', 'green', 'Brown'];
var elev = {min: 0, max: 1200, palette: elevPalette};
// But we are only interested to see our study areaa
// See above that the ULB boundary is aleady imported above as variable 'ulb'
Map.centerObject(ulb,10,5);
//Now let us select the first band 'DSM' and mosaic & clip the DSM to ULB boundary
var dsm_ulb = dsm.select('DSM').filterBounds(ulb).mosaic().clip(ulb);
print(dsm_ulb);
// The below command will add clipped DSM to the map view
Map.addLayer(dsm_ulb, elev, 'Elevation (ALOS)');
//////FUNCTIONS DEFINED////////
//below function return number of days in a month
function getDaysInMonth(y,m) {
  var dt = ee.Date.fromYMD(y,m,1);
  var n = dt.advance(1,"month").difference(dt,'day');
  return n;
}
//below function will convert mm/hr to mm/month for the 
// GPM data
var monthly = function(image) {
  var dt = ee.Date(image.get("system:time_end"));
  var y = dt.get('year');
  var m = dt.get('month');
  var days = getDaysInMonth(y,m);
  return image.multiply(days).multiply(24).copyProperties(image, ["system:time_start", "system:time_end"]);
};
//////FUNCTIONS DEFINED END HERE////////
// select the band with precipitation information
// Filter to 2 years from October 2018 to September 2020 (2 years)
var pcp = GPM.filterDate('2018-10-01', '2020-09-30')
              .filterBounds(ulb)
              .select('precipitation');
// Apply the monthly function to image collection 'pcp' to
// convert mm/hr to mm/month
var pcp_monthly = pcp.map(monthly);
// Filter ETIa to ulb
// Filter to 2 years from October 2018 to September 2020 (2 years)
var ETIa_filt = ETIa.filterDate('2018-10-01', '2020-09-30')
                    .filterBounds(ulb);
print(ETIa_filt.size());
//////////////////Add Legend function STARTS here///////////////////////
// For the web application, to display the legend of elevation
// Below function create a legend as a thumbnail inserted to UI (user interface) panel
function makeLegend(elev) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((elev.max-elev.min)/100.0).add(elev.min);
  var legendImage = gradient.visualize(elev);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(elev.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(200)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(400)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(600)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(elev.max)
    ]
  });
  // Create legend title //
  var legendTitle = ui.Label({
    value: 'Elevation (m)',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}
Map.add(makeLegend(elev));
//////////////////Add Legend function ENDS here///////////////////////
// Now For the web application we want to create a left panel which will display
// time series plots on click on map inside ulb
// Let us create two charts i) monthly precipitation and ii) dekadal ETIa of two years
// Also display elevation value on click on a pixel
///////////////////Insert Panels to display charts and results ///////////////
// Create an empty panel and let us add the remaining panels as sub panels to this one
var panel = ui.Panel({
    style: {fontSize: '20px', color: '114982'}
});
// Create a panel to display some labels like text
var text = ui.Panel([
  ui.Label({
    value: 'My first App',
    style: {fontSize: '30px', fontWeight: 'bold', color: '#2F4F4F'}
  }),
  ui.Label({
    value:'Click a point on the map to explore the variable over time',
    style: {fontSize: '14px', fontWeight: 'bold', maxWidth: '400px', color: '#2F4F4F'}
  }),
]);
// Add the new text panel to the root panel.
panel.add(text);
// Create a panel to display elevation value on click
var inspector = ui.Panel([ui.Label('Click to get Elevation')]);
panel.add(inspector);
// Below we are going to define panels to display dynamic objects -
// Elevation values, precipitation chart, ETIa chart
Map.onClick(function(coords) {
   // Add a chart to put monthly precipitation chart
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  var sample = dsm_ulb.sample(point, 30);
  var computedValue = sample.first().get('DSM');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
  // When the server returns the value, show it.
  inspector.widgets().set(0, ui.Label({
  value: 'Elevation: ' + result,
    }));
  });
    var chart1 = ui.Chart.image.series({
    imageCollection: pcp_monthly.select(['precipitation']),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart1.setOptions({
    title: 'Monthly Precipitation 2019',
    vAxis: {title: 'P (mm)', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    label: 'ETa',
    width: 250,
    height: 250,
    //interpolateNulls: true,
    //curveType: 'function'
  });
  chart1.setChartType('ColumnChart');
  panel.widgets().set(2, chart1);
       //////Second chart
    var chart2 = ui.Chart.image.series({
    imageCollection: ETIa_filt.select('L1_AETI_D'),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 250
  });
  chart2.setOptions({
    title: 'Dekadal ETIa',
    vAxis: {title: 'ETIa', gridlines: {count: 10}, maxValue: 0.5, minValue: 0 },
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    width: 250,
    height: 250,
    colors: ['#09F310'],
    interpolateNulls: true,
    curveType: 'function'
  });
  panel.widgets().set(3, chart2);
});
// Add the above defined panel to root
ui.root.insert(0, panel);