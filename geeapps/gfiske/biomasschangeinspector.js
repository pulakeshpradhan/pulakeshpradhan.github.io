var geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
// for_Ale/global_biomass_change_viewfiles_v5
// V5 introduces cumulative CO2 emissions/removal chart and dark basemap with white in legend
// May 2019
// sgorelik and gfiske, WHRC
//-------------------------------------
// import cumulative image for 2016
// var i2016 = ee.Image("users/gfiske/for_Ale/cumulative2016");
var i2016 = ee.Image("users/sgorelik/global_500m_AGB_net_change_03_16_Mgha");
// import stack of annual (2003-2016) biomass density (Mg/ha) for pixels with statistically significant (95%) change
var agb_stk_a95 = ee.Image("users/gfiske/for_Ale/an03_16_95");
// add years to band names and ensure they are in the correct order.
var years = ['2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015', '2016'];
agb_stk_a95 = agb_stk_a95.select(['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14'], years);
// limit image values to <= 2000 to clear out high values
agb_stk_a95 = agb_stk_a95.updateMask(agb_stk_a95.lte(2000));
agb_stk_a95 = agb_stk_a95.unmask(0); // for charting purposes, replace all masked pixels with a zero
// use biomass density in 2003 to fill in time series for pixels with no statistically significant change 
var agb_2003 = ee.Image("users/gfiske/for_Ale/global_AGB_v5_f2003_Mgha").unmask(0);
var agb_f03 = ee.Image().select([]);
var agb_stk_f03 = years.map(function(year){
  var tmp_agb_f03 = agb_2003.where(agb_stk_a95.select(year).gt(0), agb_stk_a95.select(year)).rename(year);
  agb_f03 = agb_f03.addBands(tmp_agb_f03);
});
//-------------------------------------
// Setup the map
var map = ui.Map();
map.setCenter(-58.761, -5.213, 5);
var res = 463.31269999999796;
// JUST IDEAS:
var vis = {min: -50, max: 50, palette: ['red','white','blue']};
map.addLayer(i2016, vis, "cumulative 2016", true);
var GRAY = [
  {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  },{ // Make land a cleaner canvas.
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [ { color: '#f5f5f5' }]
  },{ // Make water darker to provide more contrast with land.
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [ { color: '#c9c9c9' }]
  }
];
var DARK = [
  { //general style
    elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  { // admin labels outline
    elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }]},
  { // admin labels fill
    elementType: 'labels.text.fill', stylers: [{color: '#505050'}]},
  { // admin boundaries
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#9e7661'}]
  },
  {   // map saturation.
    stylers: [ { saturation: -40 } ]
  },{ // label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 0 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  },{// water
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#606060'}]
  },{// water labels fill
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#A9A9A9'}]
  },{// water labels outline
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#A9A9A9'}]
  }
];
// map.setOptions('Gray', {'Gray': GRAY});
map.setOptions('Dark', {'Dark': DARK});
map.setControlVisibility({
  layerList: false, 
  zoomControl: true, 
  scaleControl: true, 
  mapTypeControl: true, 
  fullscreenControl: true
});
//-------------------------------------
// Create a side panel with charts
var intro = ui.Panel([
  ui.Label({
    value: 'Click a colored pixel to inspect its aboveground woody biomass change',
    style: {fontSize: '20px', fontWeight: 'bold', width: '425px'}
  }),
]);
var introTextBlurb = ui.Panel([
  ui.Label({
    value: 'These data are the result of a time-series analysis of carbon density change between 2003-2016. This visualization includes the ability to select a given change pixel (loss or gain) and display the trajectory of carbon density during the study period. The value of each pixel (463m x 463m) represents the total net carbon density change (Mg/ha).  Only change pixels exhibiting statistical significance at the 95% level are reported.  For further information about these results please see the associated journal article (Baccini et al. 2017, Science).',
    style: {fontSize: '12px', fontWeight: 'bold', width: '425px'}
  })]);
//-------------------------------------
// Data source hyperlink
var link = ui.Label(
    '   Data source: Baccini et al. 2017', {},
    'http://www.thecarbonsource.org/contact');
var lon = ui.Label({style: {
      padding: '0px 0px',
      margin: '0 0 0 10px'
    }});
var lat = ui.Label({style: {
      padding: '0px 0px',
      margin: '0 0 0 10px'
    }});
var gain = ui.Label();
var loss = ui.Label();
//-------------------------------------
// Add the widgets to a new map panel.
var panel = ui.Panel();
panel.add(intro);
panel.add(lon);
panel.add(lat);
panel.add(introTextBlurb);
panel.add(link);
//-------------------------------------
// On click
map.onClick(function(coords) {
  panel.clear(); // allows us to avoid the overlapping widgets error
  panel.widgets().set(1, intro);
  panel.widgets().set(2, lon);
  panel.widgets().set(3, lat);
  lon.setValue('Lon: ' + coords.lon);
  lat.setValue('Lat: ' + coords.lat);
  // Add a point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'yellow'}, "point");
  map.layers().set(1, dot);
  //-------------------------------------
  // get actual biomass time series at pixel (returns dictionary)
  var agb_ts_dict = agb_f03.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: point,
    scale: 463.3127
  });
  // convert dictionary to array object for chart
  var agb_ts_arr = agb_ts_dict.toArray();
  // create time series chart of actual biomass values
  var agb_ts_chart = ui.Chart.array.values({
    array: agb_ts_arr, 
    axis: 0, 
    xLabels: agb_ts_dict.keys()})
    .setChartType('ScatterChart')
    .setSeriesNames('Mg/ha', 0)
    .setOptions({
      legend: {position: 'none'},
      title: 'Biomass density',
      vAxis: {title: 'Mg/ha', titleTextStyle: {italic: false}},
      tooltip: {textStyle: {bold: false}},
      lineWidth: 1,
      pointSize: 3
    });
  panel.widgets().set(4, agb_ts_chart);
  // convert actual biomass time series from array to list object
  var agb_ts_list = agb_ts_arr.toList();
  // create index for mapping function
  var seq = ee.List.sequence(0, agb_ts_list.size().subtract(2));
  // map over time series to compute year-to-year difference in biomass density
  var agb_dif_ts_list = seq.map(function(i) {
    var v1 = agb_ts_list.get(i);
    var v2 = agb_ts_list.get(ee.Number(i).add(1));
    var dif = ee.Number(v2).subtract(ee.Number(v1));
    return dif;
  });
  // create annual difference time series chart
  // var agb_dif_ts_chart = ui.Chart.array.values({
  //   array: agb_dif_ts_list, 
  //   axis: 0, 
  //   xLabels: ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015', '2016']})
  //   .setChartType('ScatterChart')
  //   .setSeriesNames('Mg/ha', 0)
  //   .setOptions({
  //     legend: {position: 'none'},
  //     title: 'Biomass density change (Mg/ha)',
  //     vAxis: {title: 'tC per ha'},
  //     tooltip: {textStyle: {bold: false}},
  //     lineWidth: 1,
  //     pointSize: 3
  //   });
  // panel.widgets().set(5, agb_dif_ts_chart);
  // convert yearly biomass density changes to yearly CO2 equivalencies
  agb_dif_ts_list = ee.List.sequence(0, 12).map(function(i){
    var inv_mgha = ee.Number(agb_dif_ts_list.get(i)).multiply(-1); // invert losses and gains
    var inv_mg = inv_mgha.multiply(res).multiply(res).divide(1e4); // convert from Mg/ha to Mg
    var inv_mgC = inv_mg.multiply(0.5); // convert from Mg to MgC 
    var inv_co2 = inv_mgC.multiply(3.664); // convert from MgC to CO2e (note, 1 megagram of carbon = 1 tonne of carbon = 3.664 tonnes of CO2)
    return inv_co2;
  });
  // create index for mapping function
  var seq2 = ee.List.sequence(1, agb_dif_ts_list.size());
  // cumulative sum of yearly CO2 differences
  var agb_cdif_ts_list = seq2.map(function(i) {
    var cumsum = agb_dif_ts_list.slice(0, i).reduce(ee.Reducer.sum());
    return cumsum;
  });
  // create cumulative change time series chart
  var agb_cdif_ts_chart = ui.Chart.array.values({
    array: agb_cdif_ts_list, 
    axis: 0, 
    xLabels: ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015', '2016']})
    .setChartType('ScatterChart')
    .setSeriesNames('tCO2', 0)
    .setOptions({
      legend: {position: 'none'},
      title: 'Cumulative carbon dioxide emissions (positive) or removal (negative)',
      subtitle: 'test',
      vAxis: {title: 'Tonnes of CO2', titleTextStyle: {italic: false}},
      tooltip: {textStyle: {bold: false}},
      lineWidth: 1,
      pointSize: 3
    });
  panel.widgets().set(5, agb_cdif_ts_chart);
  // Add credit line
  panel.widgets().set(6, link);
});
map.style().set('cursor', 'crosshair');
//-------------------------------------
// legend
// mostly taken from here: https://groups.google.com/d/msg/google-earth-engine-developers/reSJJR6ft5Y/P2mT1ivZAwAJ
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // var vis_LOSS = {min: -50, max: 0, palette: ['red','white']};
  // var gradient_LOSS = lon.multiply((vis_LOSS.max-vis_LOSS.min)/100.0).add(vis_LOSS.min);
  // var legendImage_LOSS = gradient_LOSS.visualize(vis_LOSS);
  // var vis_ZERO = {min: 0, max: 100, palette: ['#242f3e']};
  // var gradient_ZERO = lon.multiply((vis_ZERO.max-vis_ZERO.min)/100.0).add(vis_ZERO.min);
  // var legendImage_ZERO = gradient_ZERO.visualize(vis_ZERO);
  // var vis_GAIN = {min: 0, max: 50, palette: ['white','blue']};
  // var gradient_GAIN = lon.multiply((vis_GAIN.max-vis_GAIN.min)/100.0).add(vis_GAIN.min);
  // var legendImage_GAIN = gradient_GAIN.visualize(vis_GAIN);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          //padding: '5px 5px',
          color: '000000'
    },
    widgets: [
      // ui.Label('≤'+String(vis.min)), 
      // ui.Label({style: {stretch: 'horizontal'}}),
      // ui.Label(String(-25)), 
      // ui.Label({style: {stretch: 'horizontal'}}),
      // ui.Label(String(0)), 
      // ui.Label({style: {stretch: 'horizontal'}}),
      // ui.Label(String(25)), 
      // ui.Label({style: {stretch: 'horizontal'}}),
      // ui.Label('≥ '+String(vis.max))
      ui.Label('Loss'),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label('Gain')
    ]
  });
  // Creat legend title //
  var legendTitle = ui.Label({
    value: 'Cumulative biomass change 2003 to 2016',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,0', dimensions:'325x20'},  
    style: {padding: '0px'}
  });
  // var thumb_LOSS = ui.Thumbnail({
  //   image: legendImage_LOSS, 
  //   params: {bbox:'0,0,100,0', dimensions:'162x20'},  
  //   style: {padding: '0px'}
  // });
  // var thumb_ZERO = ui.Thumbnail({
  //   image: legendImage_ZERO, 
  //   params: {bbox:'0,0,100,0', dimensions:'1x20'},  
  //   style: {padding: '0px'}
  // });
  // var thumb_GAIN = ui.Thumbnail({
  //   image: legendImage_GAIN, 
  //   params: {bbox:'0,0,100,0', dimensions:'162x20'},  
  //   style: {padding: '0px'}
  // });
  // var legPanel = ui.Panel({
  //   layout: ui.Panel.Layout.flow('horizontal'),
  //   widgets: [
  //     thumb_LOSS, 
  //     thumb_ZERO,
  //     thumb_GAIN
  //   ]
  // });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}
map.add(makeLegend(vis));
//-------------------------------------
// Transparency slider
var slider = ui.Slider({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  style: {position: 'bottom-right', textAlign: 'right'},
  onChange: function(int) {map.layers().get(0).setOpacity((100-int)/100.0)}
});
map.add(slider);
//-------------------------------------
// This will flush the geometry buttons from the map UI and rebuild the map with all
// of the customizations specified throughout the script. Note, call needs to be at
// end of script, but before the panel is inserted to the root UI.
// More info: https://groups.google.com/d/msg/google-earth-engine-developers/kf_RVcJaC2Q/UP467HAWBgAJ
ui.root.clear();
ui.root.add(map);
// Add the new panel to the root panel.
ui.root.insert(0, panel);