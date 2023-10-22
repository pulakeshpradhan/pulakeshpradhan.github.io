var hs_coast = ee.FeatureCollection("users/jhnienhuis/DirMapCoast");
var directions = ee.List.sequence(1,360,1);
var hshist = ee.List.sequence(1,100,1);
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
mapPanel.addLayer(hs_coast.select([]),{color:'white'}, 'all locations');
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Local wave and tide data',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see local wave and tide statistics.')
]);
inspectorPanel.add(intro);
var maketable = function(x){
  //print(x.get('m2a'))
  var tidetable = {
  cols:[
    {id:'1',label:'Constituent',type:'string'},
    {id:'2',label:'Amplitude (m)',type:'string'},
    {id:'3',label:'Phase (deg GMT)',type:'string'},
    {id:'4',label:'Period (hr)',type:'string'}
   ],
  rows:[
    {c:[{v:'m2'},{v:(x["m2a"]/1000).toFixed(2)},{v:x["m2p"].toFixed(0)},{v:'12.42'}]},
    {c:[{v:'s2'},{v:(x["s2a"]/1000).toFixed(2)},{v:x["s2p"].toFixed(0)},{v:'12.00'}]},
    {c:[{v:'n2'},{v:(x["n2a"]/1000).toFixed(2)},{v:x["n2p"].toFixed(0)},{v:'12.66'}]},
    {c:[{v:'k1'},{v:(x["k1a"]/1000).toFixed(2)},{v:x["k1p"].toFixed(0)},{v:'23.93'}]},
    {c:[{v:'m4'},{v:(x["m4a"]/1000).toFixed(2)},{v:x["m4p"].toFixed(0)},{v:'06.21'}]},
    {c:[{v:'o1'},{v:(x["o1a"]/1000).toFixed(2)},{v:x["o1p"].toFixed(0)},{v:'25.82'}]},
    ]};
            return tidetable;
};
var temptable = {
  cols:[
    {id:'1',label:'Constituent',type:'string'},
    {id:'2',label:'Amplitude (m)',type:'string'},
    {id:'3',label:'Phase (deg GMT)',type:'string'},
    {id:'4',label:'Period (hr)',type:'string'}
   ],
  rows:[
    {c:[{v:'a'},{v:'a'},{v:'a'},{v:'could'}]},
    {c:[{v:'a'},{v:'a'},{v:'a'},{v:'i'}]},
    {c:[{v:'a'},{v:'a'},{v:'a'},{v:'make'}]},
    {c:[{v:'a'},{v:'a'},{v:'a'},{v:'this'}]},
    {c:[{v:'a'},{v:'a'},{v:'a'},{v:'run'}]},
    {c:[{v:'a'},{v:'a'},{v:'a'},{v:'faster?'}]},
    ]
};
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Make a chart from the time series.
  var distFilter = ee.Filter.withinDistance({distance: 1e5,leftField: '.geo',rightField: '.geo'});
  var hs_coast1 = ee.Join.saveFirst({matchKey: 'hs_coast', measureKey: 'distance'}).apply(hs_coast,point,distFilter);
  hs_coast1 = ee.FeatureCollection(hs_coast1.map(function(f){ return f.set('distance',f.distance(point))  }).limit(1,'distance')).first();
  var dot = ui.Map.Layer(ee.Feature(hs_coast1), {color: 'red',width:100}, 'clicked location');
  hs_coast1 = hs_coast1.set('lon',hs_coast1.geometry().coordinates().get(0)).set('lat',hs_coast1.geometry().coordinates().get(1));
  hs_coast1 = ee.Feature(hs_coast1).toDictionary();
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, dot);
  var spectra_dir = directions.map(function(f){
  var str = ee.String('e').cat(ee.Number(f).format('%d'));
  return ee.Number(hs_coast1.get(str)).divide(100000).divide(32).multiply(1030).multiply(9.81);
  })
  var spectra_hs = hshist.map(function(f){
  var str = ee.String('h').cat(ee.Number(f).format('%d'));
  return ee.Number(hs_coast1.get(str)).divide(100000);
  })
  var sstChart = ui.Chart.array.values(spectra_dir,0,directions);
  var sstChart2 = ui.Chart.array.values(spectra_hs,0,ee.List.sequence(0,4.95,0.05));
    // Customize the chart.
  sstChart.setOptions({
    vAxis: {title: 'Wave Energy (J/m2)'},
    hAxis: {title: 'Wave Direction from North', gridlines: {count: 7}, viewWindow: {min: 0, max: 360}, ticks: [0, 45,90, 135, 180, 225, 270, 315, 360]},
    legend: {position: 'none'},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    //legend: {position: 'right'},
  });
  // Customize the chart.
  sstChart2.setOptions({
    vAxis: {title: 'Fraction'},
    hAxis: {title: 'Significant Wave height (m)', gridlines: {count: 7}},
    legend: {position: 'none'},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
  });
  var sstTable = ui.Chart(temptable).setChartType('Table');
  hs_coast1.evaluate(function(result){sstTable.setDataTable(maketable(result))
  .setChartType('Table').setOptions({width: '100%', height: '10em',page:'disable'})});
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(3, sstChart);
  inspectorPanel.widgets().set(4, sstChart2);
  inspectorPanel.widgets().set(5, sstTable);
  hs_coast1.evaluate(function(result){
     // Update the lon/lat panel with values from the click event.
    lon.setValue('Lon: ' +result["lon"].toFixed(2));
    lat.setValue('Lat: ' + result["lat"].toFixed(2));
    hs.setValue('Wave Height: ' + (result["hs"]/1000).toFixed(1) + ' m');
    tp.setValue('Wave Period: ' + (result["tp"]/1000).toFixed(1) + ' s');
    depth.setValue('Depth: ' + result["depth"].toFixed(0) + ' m');
    time_series.setUrl('https://geo.public.data.uu.nl/vault-changing-shores/WaveWatch_timeseries%5B1564042789%5D/original/WaveWatch_timeseries_' + result["id"].toFixed(0) + '.nc.gz');
  })
 };
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
var hs = ui.Label();
var tp = ui.Label();
var depth = ui.Label();
var time_series = ui.Label('Link to WaveWatch time series for this location',{},0);
inspectorPanel.add(ui.Panel([lon, lat, hs, tp, depth], ui.Panel.Layout.flow('horizontal',1)));
inspectorPanel.add(ui.Panel([time_series], ui.Panel.Layout.flow('horizontal',1)));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Chart2]'));
inspectorPanel.add(ui.Label('[Table]'));
inspectorPanel.add(ui.Panel([ui.Label('Wave Data source', {},'http://polar.ncep.noaa.gov/waves/hindcasts/nopp-phase2.php'),
ui.Label('Tide Data source', {},'http://volkov.oce.orst.edu/tides/tpxo9_atlas.html')], ui.Panel.Layout.flow('horizontal',1)));
inspectorPanel.add(ui.Panel([ui.Label('by Jaap Nienhuis (2019)', {},'http://jhnienhuis.github.io')]));
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(24.22, 34.89);
mapPanel.centerObject(initialPoint, 4);
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
mapPanel.setOptions('SATELLITE');
//mapPanel.setControlVisibility(null, null, false, false, false)
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});