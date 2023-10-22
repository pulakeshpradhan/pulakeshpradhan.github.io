/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var ethiopia = ee.FeatureCollection("users/spareeth/ethiopia"),
    kenya = ee.FeatureCollection("users/spareeth/kenya"),
    landform_alos = ee.Image("CSP/ERGo/1_0/Global/ALOS_landforms"),
    dem_alos = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    MODIS_LC = ee.ImageCollection("MODIS/006/MCD12Q1"),
    dr = ee.ImageCollection("users/spareeth/drought_maps"),
    dr_rf = ee.ImageCollection("users/spareeth/drought_maps_rf"),
    countries = ee.FeatureCollection("users/spareeth/eth_ken_moz");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.setOptions('HYBRID');
var palettes = require('users/gena/packages:palettes');
Map.setCenter(38.96, -6.67, 5);
// Get Days in month
function getDaysInMonth(y,m) {
  var dt = ee.Date.fromYMD(y,m,1);
  var n = dt.advance(1,"month").difference(dt,'day');
  return n;
  //return ee.List.sequence(1,n);
}
//print(dr);
var dr_maps1 = dr_rf.select(['classification'],['SPAEI'])
                .filter(ee.Filter.date('2018-01-01', '2020-01-01'));
//print(dr_maps1);
// var dr_maps1 = dr_maps.toBands().clamp(-2,2);
///Trying map() function ///
var clamp = function(image) {
  return image.focal_median(1.5, 'square').clamp(-2,2).copyProperties(image, ["system:time_start", "system:time_end"]);
};
// Map the function over the collection and display the result.
var dr_maps = dr_maps1.map(clamp);
////////
//print(dr_maps);
///Precipitation ////
var precipdata = ee.ImageCollection('TRMM/3B43V7')
                  .filter(ee.Filter.date('2018-01-01', '2020-01-01'));
var pcp = precipdata.select('precipitation');
//print(pcp);
var monthly = function(image) {
  var dt = ee.Date(image.get("system:time_end"));
  var y = dt.get('year');
  var m = dt.get('month');
  var days = getDaysInMonth(y,m);
  return image.multiply(days).multiply(24).copyProperties(image, ["system:time_start", "system:time_end"]);
};
var pcp_monthly = pcp.map(monthly);
//print(pcp_monthly);
///////////////////////////////////
var landforms = landform_alos.select('constant').rename('lf').clip(countries);
var dem = dem_alos.select('AVE').rename('dem').clip(countries);
var lc_ts = MODIS_LC.select('LC_Type1');
var landcover = lc_ts.mode().rename('lc').clip(countries);
//var mask = landcover.eq(17).not();
var mask = landcover.eq(17).or(landcover.eq(18)).not();
//print(mask);
// Function for zero padding
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
//////////////
var ndvi_coll = ee.ImageCollection('MODIS/006/MOD13Q1')
                  .filter(ee.Filter.date('2003-01-01', '2019-12-30'));
var ndvi = ndvi_coll.select('NDVI');
var tsstart = ee.Date("2003-01-01");
var tsend = ee.Date("2017-12-31");
// long term monthly average of NDVI - 2003 to 2019
var initndvi = ee.Image([]);
for(var i = 1; i <= 12; i++) {
    var styr = tsstart.get('year');
    var enyr = tsend.get('year');
    var m = pad(i, 2);
    var str = 'NDVI'; 
    var dt = str.concat('_', m);
    var nm = ndvi.filter(ee.Filter.calendarRange(styr,enyr,'year'))
      .filter(ee.Filter.calendarRange(i,i,'month')).mean().rename(dt).clip(countries);
    initndvi = initndvi.addBands(nm).set('TimePeriod', 2003-2017);
  }
var ndvits = initndvi;
//print('NDVI TS:',ndvits);
//print(ndvits.select(['NDVI_06']));
// Compute monthly NDVI from 2010 to 2019
var stdate = ee.Date("2018-01-01");
var initndvi_monthly = ee.Image([]);
for(var i = 0; i < 21; i++) {
    var ndate = stdate.advance(i, "month");
    var yrm = ndate.format("YYYY_MM");
    var yr = ndate.get('year').toInt();
    var m = ndate.get('month').toInt();
    var str = ee.String('NDVI_'); 
    var dt = str.cat(yrm);
    var nm = ndvi.filter(ee.Filter.calendarRange(yr,yr,'year'))
      .filter(ee.Filter.calendarRange(m,m,'month'))
      .mean().rename(dt).clip(countries).multiply(0.0001);
    initndvi_monthly = initndvi_monthly.addBands(nm).set('TimePeriod', 'Monthly');
  }
var ndvi_monthly = initndvi_monthly;
//print('NDVI monthly:', ndvi_monthly);
///////////////////////////////////////////////////////////
// Departure from long term average for NDVI, from Jan 2010 to Sep 2019
// (Monthly_NDVI/long term Monthly NDVI) * 100
var stdate = ee.Date("2018-01-01");
var initDAndvi_monthly = ee.Image([]);
for(var i = 0; i < 21; i++) {
    var ndate = stdate.advance(i, "month");
    var yr = ndate.format("YYYY");
    var m = ndate.format("MM");
    var yrm = ndate.format("YYYY_MM");
    var str = ee.String('NDVI_'); 
    var dt = str.cat(yrm);
    var dt1 = str.cat(m);
    var str1 = ee.String('DA_NDVI_');
    var dt2 = str1.cat(yrm);
    var nm = ndvi_monthly.select(dt).divide(ndvits.select(dt1)).multiply(100).rename(dt2);
    initDAndvi_monthly = initDAndvi_monthly.addBands(nm).set('TimePeriod', 'Monthly');
  }
var DAndvi_monthly = initDAndvi_monthly;
//print('DAndvi_monthly:', DAndvi_monthly);
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
var vis = {
  min: -2.0,
  max: 2.0,
  palette: palettes.misc.warmcool[7],
};
var palette = palettes.misc.warmcool[7];
var vis1 = {
  min: -2.0,
  max: 2.0,
  palette: ['ff0000', '0000ff'],
};
var dr_2019_12 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-12-01', '2020-01-01'))
                .mean().updateMask(mask));
var dr_2019_11 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-11-01', '2019-12-01'))
                .mean().updateMask(mask));
var dr_2019_10 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-10-01', '2019-11-01'))
                .mean().updateMask(mask));
var dr_2019_09 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-09-01', '2019-10-01'))
                .mean().updateMask(mask));
//print(dr_2019_09);
var dr_2019_08 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-08-01', '2019-09-01'))
                .mean().updateMask(mask));
//print(dr_2019_08);
var dr_2019_07 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-07-01', '2019-08-01'))
                .mean().updateMask(mask));
//print(dr_2019_07);
var dr_2019_06 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-06-01', '2019-07-01'))
                .mean().updateMask(mask));
//print(dr_2019_06);
var dr_2019_05 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-05-01', '2019-06-01'))
                .mean().updateMask(mask));
//print(dr_2019_05);
var dr_2019_04 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-04-01', '2019-05-01'))
                .mean().updateMask(mask));
//print(dr_2019_04);
var dr_2019_03 = ee.Image(dr_maps.select('SPAEI')
                .filter(ee.Filter.date('2019-03-01', '2019-04-01'))
                .mean().updateMask(mask));
//print(dr_2019_03);
//////////////////////////////////////////////////
//Visualizing farms
var empty = ee.Image().byte();
var outlines = empty.paint({
  featureCollection: countries,
  //color: 'crop_2',
  width: 1
});
var palette = ['000000', '00FF00', '0000FF'];
///////////////////////////////////////////////////////////////////
Map.addLayer(dr_2019_04.clip(countries), vis, 'Drought: April 2019', 0);
Map.addLayer(dr_2019_05.clip(countries), vis, 'Drought: May 2019');
Map.addLayer(dr_2019_06.clip(countries), vis, 'Drought: June 2019', 0);
Map.addLayer(dr_2019_07.clip(countries), vis, 'Drought: July 2019', 0);
Map.addLayer(dr_2019_08.clip(countries), vis, 'Drought: August 2019', 0);
Map.addLayer(dr_2019_09.clip(countries), vis, 'Drought: September 2019', 0);
Map.addLayer(dr_2019_10.clip(countries), vis, 'Drought: October 2019', 0);
Map.addLayer(dr_2019_11.clip(countries), vis, 'Drought: November 2019', 0);
Map.addLayer(dr_2019_12.clip(countries), vis, 'Drought: December 2019', 0);
Map.addLayer(outlines, {palette: palette, max: 14}, 'Country boundray', 0);
//////////////Legend////////////
///////////////
function makeLegend2(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-left',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String('Extreme drought')), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String('')), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String('Normal')), //ui.Label(String((vis.max-vis.min)/4)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String('')), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String('Very moist'))
    ]
  });
  // Creat legend title //
  var legendTitle = ui.Label({
    value: 'Drought intensity',
    style: {
      stretch: 'vertical',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'400x15'},  
    style: {padding: '1px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}
//Map.add(makeLegend2(vis));
///////////////////////////////////////////////////////
////Insert Panels////
// Create and style widgets.
var intro = ui.Panel([
  // ui.Thumbnail({
  //   image: {},
  // }),
  ui.Label({
    value: 'Drought monitoring',
    style: {fontSize: '30px', fontWeight: 'bold', color: '#2F4F4F'}
  }),
  ui.Label({
    value: 'Using Standardised Precipitation Actual Evapotranspiration Index (SPAEI) computed from WaPOR database',
    style: {fontSize: '14px', maxWidth: '400px', color: '#2F4F4F'}
  }),
  ui.Label({
    value:'Click a point on the map to explore SPAEI index over time',
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
    value: 'Contributors: Sajid Pareeth, Poolad Karimi',
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
panel.add(outro);
panel.add(cdl);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
Map.onClick(function(coords) {
  // Add a red point to the map wherever the user clicks.
   // Add a SEBAL chart.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(8, dot);
  var chart = ui.Chart.image.series({
    imageCollection: dr_maps.select('SPAEI'),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 250
  });
  chart.setOptions({
    title: 'Monthly SPAEI 2018/19',
    vAxis: {title: 'SPAEI', gridlines: {count: 10}, maxValue: 1.0, minValue: -1.0 },
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    width: 250,
    height: 250,
    colors: ['#D2691E'],
    interpolateNulls: true,
    curveType: 'function'
  });
  panel.widgets().set(3, chart);
/*
  //////Second chart
   var chart2 = ui.Chart.image.series({
    imageCollection: pcp_monthly.select(['precipitation']),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart2.setOptions({
    title: 'Monthly Precipitation 2018/19',
    vAxis: {title: 'P (mm)', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    label: 'ETa',
    width: 250,
    height: 250,
    //interpolateNulls: true,
    //curveType: 'function'
  });
  chart2.setChartType('ColumnChart');
  panel.widgets().set(4, chart2);
*/
// Add a NDVI chart
/*
  var chart1 = ui.Chart.image.regions({
    image: dr_maps1,
    regions: point,
    reducer: ee.Reducer.mean(),
    scale: 250,
    xLabels: ['2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2']
  });
  chart1.setOptions({
    title: 'Monthly NDVI 2018/19',
    vAxis: {title: 'SPEI', gridlines: {count: 10}, maxValue: 1.5, minValue: -1.5 },
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    width: 250,
    height: 250,
    colors: ['#D2691E'],
    interpolateNulls: true,
    curveType: 'function'
  });
  panel.widgets().set(4, chart1);
*/
// Add a GRIDMET chart.
});
Map.add(makeLegend2(vis));
///////////