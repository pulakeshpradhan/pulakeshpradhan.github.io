//--------------------------------------------------------
//Harvest area recovery application
///Description: Using Landsat 5 and 8 to plot the recovery 
//              curve of forestry harvest areas
///Written by: Evan R. DeLancey
///email: edelance@ualberta.ca
///Date: 2018-07-06
//--------------------------------------------------------
//--------------------------------------------------------
//Load harvest areas from HFI 2016 and center map on them 
//--------------------------------------------------------
var HAs = ee.FeatureCollection('users/abmigc/HA_1986_2016_o10ha');
Map.centerObject(HAs, 6);
Map.setOptions('HYBRID');
Map.addLayer(HAs, {color: '#6baed6'}, 'Harvest areas');
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//Landsat 5 Processing
//--------------------------------------------------------
//--------------------------------------------------------
//select years 
var years1 = ee.List.sequence(1984, 2011);
//take only "clear" pixels
var maskcloud = function(image) {
  var diff = image.select(['sr_cloud_qa']);
  return image.updateMask(diff.lt(2));
};
// Function to calculate Tasseled Cap Brightness (based on Crist, 1985)
var addTCB = function(image) {
  var TCB = image.expression(
    '((((0.2043*B1) + (0.4158*B2) + (0.5524*B3) + (0.5741*B4) + (0.3124*B5) + (0.2303*B7))*-1)+5000)/40',{
      'B1' : image.select(['B1']),
      'B2' : image.select(['B2']),
      'B3' : image.select(['B3']),
      'B4' : image.select(['B4']),
      'B5' : image.select(['B5']),
      'B7' : image.select(['B7'])
    }).rename('TCB');
  return image.addBands(TCB);
};
//--------------------------------------------------------
//--------------------------------------------------------
//Landsat 8 processing
//--------------------------------------------------------
//--------------------------------------------------------
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask).divide(1)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
//years from Landsat 8
var years2 = ee.List.sequence(2013, 2018);
// Function to calculate Tasseled Cap Brightness (based on Crist, 1985)
var addTCB2 = function(image) {
  var TCB = image.expression(
    '((((0.2043*B1) + (0.4158*B2) + (0.5524*B3) + (0.5741*B4) + (0.3124*B5) + (0.2303*B7))*-1)+3750)/40',{
      'B1' : image.select(['B1']),
      'B2' : image.select(['B2']),
      'B3' : image.select(['B3']),
      'B4' : image.select(['B4']),
      'B5' : image.select(['B5']),
      'B7' : image.select(['B7'])
    }).rename('TCB');
  return image.addBands(TCB);
};
//--------------------------------------------------------
//Theme colors
//--------------------------------------------------------
var C1 = '#2171b5';//blue
var C2 = '#00000000';//black full transparency
var C3 = '#ec7014';//orange
var C4 = '#bdbdbd';//grey
var C5 = '#00000070';//black partial transparency
var C6 = '#000000';//black
var C7 = 'white'
//--------------------------------------------------------
//--------------------------------------------------------
//User interface panels and labels
//--------------------------------------------------------
var logo = ui.Panel({
  widgets: [ui.Label('ABMI',{
    fontSize: '24px',
    backgroundColor: C2,
    color: '#41ab5d',
    fontWeight: 'bold',
  })],
  style: {
    position: 'bottom-right',
    backgroundColor: C2
  }
});
Map.add(logo);
var title = ui.Panel({
  widgets: [
    ui.Label('Select polygon to view the satellite derived recovery plot',{
    fontSize: '15px',
    backgroundColor: C2,
    color: '#238b45',
    fontWeight: 'bold',
  })  
  ],
  style: {
    position: 'top-center',
    backgroundColor: C5
  }
});
Map.add(title);
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//define lat and lon
//--------------------------------------------------------
var lon = ui.Label();
var lat = ui.Label();
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//clip function
//--------------------------------------------------------
//--------------------------------------------------------
//Map on click function to display recovery chart
//--------------------------------------------------------
Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var HA = HAs.filterBounds(point);
  var empty = ee.Image().byte();
  var HAoutline = empty.paint({
    featureCollection: HA,
    width: 2
  });
  Map.addLayer(HAoutline, {palette: C3}, 'Selected');
  //get Landsat 5 for the harvest areas
  var L5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
    .filterBounds(HA)
    .map(maskcloud);
  L5 = L5.map(addTCB);
  //function for computing median TCB per summer season
  var seasonalMean1 = years1.map(function(y) {
    var start = ee.Date.fromYMD(y, 5, 01);
    var stop = start.advance(4, 'month');
    var median = L5.filterDate(start, stop).median();
    return median.set('system:time_start', ee.Date(start.advance(2, 'month')).millis());
  });
//--------------------------------------------------------
//--------------------------------------------------------
// Get Landsat 8 for harvest areas
  var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(HA)
      .map(maskL8sr);
  L8 = L8.map(addTCB2);
  //Landsat 8 seasonal mean function
  var seasonalMean2 = years2.map(function(y) {
    var start = ee.Date.fromYMD(y, 5, 01);
    var stop = start.advance(4, 'month');
    var median = L8.filterDate(start, stop).median();
    return median.set('system:time_start', ee.Date(start.advance(2, 'month')).millis());
  });
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Get seasonal mean image collection and merge Landsat 5 and 8
  //--------------------------------------------------------
  var L5 = ee.ImageCollection(seasonalMean1);
  var L8 = ee.ImageCollection(seasonalMean2);
  var L5TCB = L5.select(['TCB']);
  var L8TCB = L8.select(['TCB']);
  var LandsatSeries = ee.ImageCollection(L5TCB.merge(L8TCB));
  //--------------------------------------------------------
  //--------------------------------------------------------
  var chart = ui.Chart.image.series(LandsatSeries, HA, ee.Reducer.mean(), 30);
  chart.setOptions({
    vAxis: {
      title: 'Scaled recovery', 
      titleTextStyle: {color: C1, italic: false, bold: true, fontSize:13}, 
      gridlines: {color: C7}, 
      textStyle: {color: C1, italic: false, fontSize:11.5}
    },
    hAxis: {
      title: 'Year', 
      titleTextStyle: {color: C1, italic: false, bold: true, fontSize: 13}, 
      gridlines: {color: C7}, 
      textStyle: {color: C1, italic: false, fontSize: 11.5},
    },
    series: {0: {color: C3}},
    backgroundColor: {fill: C7},
    curveType: 'function',
    height: 250,
    fontName: 'Roboto',
    legend: {textStyle: {color:C1}}
  });
  var panel = ui.Panel({
  style: {
    width: '465px', 
    backgroundColor: C2, 
    position: 'top-right'
  }
  });
  Map.add(panel)
  var chartPanel = ui.Panel({
    style: {
      stretch: 'horizontal', 
      backgroundColor: C2
    }
  });
  panel.add(chartPanel);
  panel.remove(chart)
  panel.add(chart);
});
//--------------------------------------------------------
//--------------------------------------------------------
//cross hair cursor
Map.style().set('cursor', 'crosshair');
//END