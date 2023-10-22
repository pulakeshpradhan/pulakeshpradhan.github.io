/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var mask = ee.Image("users/spareeth/nrsc_lulc_2017_18_mask"),
    s1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    imageVisParam = {"opacity":1,"bands":["classification"],"min":1,"max":6,"palette":["07d603","ffeb00","04ffe8","00a114","ffffff","0619ff"]},
    fld = ee.FeatureCollection("users/spareeth/nlbc_fldpoints"),
    eta_ts = ee.ImageCollection("users/spareeth/nlbc_eta"),
    kharif_2016 = ee.Image("users/spareeth/nlbc/ETa_Kharif_2016"),
    kharif_2017 = ee.Image("users/spareeth/nlbc/ETa_Kharif_2017"),
    kharif_2018 = ee.Image("users/spareeth/nlbc/ETa_Kharif_2018"),
    kharif_2019 = ee.Image("users/spareeth/nlbc/ETa_Kharif_2019"),
    command = ee.FeatureCollection("users/spareeth/nlbc/NLBC_CCA");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Get Days in month
function getDaysInMonth(y,m) {
  var dt = ee.Date.fromYMD(y,m,1);
  var n = dt.advance(1,"month").difference(dt,'day');
  return n;
  //return ee.List.sequence(1,n);
}
var monthly = function(image) {
  var dt = ee.Date(image.get("system:time_end"));
  var y = dt.get('year');
  var m = dt.get('month');
  var days = getDaysInMonth(y,m);
  return image.multiply(days).multiply(24).copyProperties(image, ["system:time_start", "system:time_end"]);
};
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
// FUNCTIONS END HERE //
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B8', 'B4', 'B3'],
  gamma: 1.7
};
var ET_PALETTE = [
  'DEC29B', 'E6CDA1', 'EDD9A6', 'F5E4A9', 'FFF4AD', 'C3E683', '6BCC5C', 
  '3BB369', '20998F', '1C8691', '16678A', '114982', '0B2C7A'];
var vis2 = {min:50, max: 1000, palette:ET_PALETTE};
// Define collections //
///Precipitation ////
var precipdata = ee.ImageCollection('TRMM/3B43V7')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-30'));
var pcp = precipdata.select('precipitation');
var pcp_monthly = pcp.map(monthly);
var ndvi = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI')
                  .filterDate('2019-01-01', '2019-12-31');
var et_coll = eta_ts.select(['b1'], ['ETa']) //on the fly changing band name
  .filterDate('2019-01-01','2020-01-01');
// Good images are only from November 2019 and January 2020
var coll_Nov = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2019-11-01', '2019-11-30')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .filterBounds(command)
                  .map(maskS2clouds)
                  .median().updateMask(mask).clip(command);
print('coll_Nov:', coll_Nov);
var coll_Jan = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-01-01', '2020-01-31')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .filterBounds(command)
                  .map(maskS2clouds)
                  .median().updateMask(mask).clip(command);
print('coll_Jan:', coll_Jan);
Map.addLayer(coll_Nov, rgbVis, 'S2 MSI - Nov 19',true);
Map.addLayer(coll_Jan, rgbVis, 'S2 MSI - Jan 20',true);
//Map.addLayer(command,{},'NLBC command area',true, 0.5);
Map.centerObject(command);
Map.addLayer(kharif_2019.clip(command),{min:50, max: 1000, palette:ET_PALETTE}, 'Kharif_2019',true);
Map.addLayer(fld,{},'field points',true);
//CHARTS
// PANELS //
///////////////
function makeLegend2(vis2) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis2.max-vis2.min)/100.0).add(vis2.min);
  var legendImage = gradient.visualize(vis2);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-left',
          padding: '20x 20px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(vis2['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(250)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(500)), //ui.Label(String((vis.max-vis.min)/4)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(750)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(vis2['max'])
    ]
  });
  // Creat legend title //
  var legendTitle = ui.Label({
    value: 'Total Kharif ETa (mm/season)',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'356x15'},  
    style: {padding: '1px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}
Map.add(makeLegend2(vis2));
///UI PANELS
// Create and style widgets.
var intro = ui.Panel([
  // ui.Thumbnail({
  //   image: {},
  // }),
  ui.Label({
    value: 'Test',
    style: {fontSize: '30px', fontWeight: 'bold', color: '#2F4F4F'}
  }),
  ui.Label({
    value: 'Time series plots of variables',
    style: {fontSize: '14px', maxWidth: '400px', color: '#2F4F4F'}
  }),
  ui.Label({
    value:'Click a point on the map to explore variable over time',
    style: {fontSize: '14px', fontWeight: 'bold', maxWidth: '400px', color: '#2F4F4F'}
    //targeUrl: {}
  }),
  // ui.Label({
  //   value: ''
  // })
]);
var outro = ui.Panel([
  // ui.Thumbnail({
  //   image: {},
  // }),
  ui.Label({
    value: ' ',
    style: {fontSize: '14px', maxWidth: '400px', color: '#2F4F4F'}
  }),
]);
var panel2 = ui.Panel({
    style: {fontSize: '20px', color: '114982'}
    });
// var lon = ui.Label();
// var lat = ui.Label();
var cdl = ui.Label();
// Add the widgets to a new panel.
var panel = ui.Panel({
    style: {fontSize: '20px', color: '114982'}
    });
panel.add(intro);
// panel.add(lon);
// panel.add(lat);
panel.add(cdl);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
Map.onClick(function(coords) {
  // Add a red point to the map wherever the user clicks.
   // Add a SEBAL chart.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(5, dot);
  var chart = ui.Chart.image.series({
    imageCollection: et_coll.select('ETa'),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart.setOptions({
    title: 'Monthly ETa',
    vAxis: {title: 'ETa (mm)', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    width: 250,
    height: 250,
    colors: ['#D2691E'],
    interpolateNulls: true,
    curveType: 'function'
  });
  panel.widgets().set(3, chart);
// Add a NDVI chart
  var chart1 = ui.Chart.image.series({
    imageCollection: ndvi.select('NDVI'),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart1.setOptions({
    title: 'Monthly NDVI',
    vAxis: {title: 'NDVI', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    width: 250,
    height: 250,
    colors: ['#006400'],
    interpolateNulls: true,
    curveType: 'function'
  });
  panel.widgets().set(4, chart1);
// Add a GRIDMET chart.
  var chart2 = ui.Chart.image.series({
    imageCollection: pcp_monthly.select(['precipitation']),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart2.setOptions({
    title: 'Monthly Precipitation',
    vAxis: {title: 'P (mm)', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    label: 'ETa',
    width: 250,
    height: 250,
    //interpolateNulls: true,
    //curveType: 'function'
  });
  chart2.setChartType('ColumnChart');
  panel.widgets().set(5, chart2);
});
panel.add(outro);
///////////