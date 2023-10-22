var ssh = ee.ImageCollection("users/fbaart/ssh_grids_v1609"),
    trend = ee.Image("users/fbaart/ssh-trend"),
    gia = ee.Image("users/fbaart/utoronto/dsea12mgrid_512-center-0");
var palettes = require('users/gena/packages:palettes')
var style = require('users/gena/packages:style')
style.SetMapStyleDark()
var timeSeries = ssh.map(function(i) {
    var t = i.date().millis()
    i = i.set('t', t)
    i = i.set('v', i.get('b1'))
    return i
})
var monthSeries = timeSeries.map(function(i) {
    var yearmonth = ee.Number(i.date().format('YM'))
    i = i.set('yearmonth', yearmonth)
    return i
})
var monthMeans = monthSeries.reduceColumns({
  reducer: ee.Reducer.mean().repeat(1).group({
    groupField: 0,
    groupName: 'yearmonth',
  }), 
  selectors: ['yearmonth', 'b1']
})
var subsidenceVis = {
    bands: ['b1'],
    min: -10, 
    max: 10, 
    palette: palettes.cmocean.Curl[7]
}
var trendVis = {
    bands: ['time'],
    min: -10, 
    max: 10, 
    palette: palettes.cmocean.Curl[7]
}
Map.addLayer(ssh, {}, 'ssh', false)
Map.addLayer(gia, subsidenceVis, 'subsidence gia-component, src: Peltier)', false)
Map.addLayer(trend.multiply(1000), trendVis, 'trend (1993-2017) [mm/year]', false)
Map.addLayer(trend.multiply(1000).add(gia.rename('time')), trendVis, 'relative sea-level trend (1993-2017) [mm/year]', true)
var panel = ui.Panel();
var label = ui.Label('select a point')
panel.add(label)
panel.style().set({
  width: '400px',
  position: 'bottom-left'
});
Map.add(panel);
Map.onClick(function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // fastest way to lookup values
  var sshList = ssh.getRegion({
    geometry: point, 
    scale: 30, 
    crs: 'EPSG:4326'
  })
  // Lookup relevant columns
  var sshRows = sshList.slice(1).map(function(row) {
    // convert to features
    return ee.Feature(null, ee.Dictionary.fromLists(
      ['t', 'v'],
      ee.List(row).slice(3, 5)
      )
    )
  })
  // Add chart
  var chart = ui.Chart.feature.byFeature(
    ee.FeatureCollection(
      sshRows
    ), 
    't', 
    'v'
  )
  chart.setOptions({
    title: 'Sea surface height',
    vAxis: {title: 'Sea surface height [m]'},
    hAxis: {title: 'Time [year]'},
    lineWidth: 1,
    label: 'Satellite (MEASURES )'
  });
  panel.clear();
  panel.add(chart);
});