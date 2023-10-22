var table = ee.FeatureCollection("users/jhnienhuis/GlobalDeltaBasins_app_shp");
var delta_marker = ee.Geometry.MultiPoint(table.aggregate_array("MouthLon").zip(table.aggregate_array("MouthLat")))
var years_area_change = ee.List.sequence(1,35,1);
var years = ee.List.sequence(1984,2019,1);
var mapPanel = ui.Map();
mapPanel.addLayer(table.select([]),{color:'white'});
mapPanel.addLayer(delta_marker,{strokeWidth: 5})
var inspectorPanel = ui.Panel({style: {width: '30%'}}); 
var intro = ui.Panel([
  ui.Label({
    value: 'River Delta Data',
    style: {fontSize: '20px', fontWeight: 'bold',margin:  '8px 0px 0px 8px' }
  }),
  ui.Label({
    value: 'Published by Nienhuis, Ashton, Edmonds, Hoitink, Kettner, Rowland, Törnqvist',
    style: {fontSize: '10px',margin:  '2px 0px 0px 8px' },
    targetUrl: 'https://doi.org/10.1038/s41586-019-1905-9'}),
  ui.Label({
    value: 'Warning! This app is being phased out, the data will not be updated. Please visit the new global delta app at:',
    style: {color: 'red',fontSize:'15px'}}),
  ui.Label({
      value: 'Global Delta App',
    style: {fontSize: '15px', fontWeight: 'bold', color:'red',margin:  '2px 0px 20px 20px' },
    targetUrl: 'https://jhnienhuis.github.io/globaldeltas'})
  ]);
inspectorPanel.add(intro);
var waterchart = {
  cols: [{id: 'name', label: 'Type', type: 'string'},
         {id: 'year', label: 'Water Discharge (m3/s)', type: 'number'}],
  rows: [{c: [{v: 'Discharge (pristine) [2]'}, {v: 0}]},
         {c: [{v: 'Discharge (disturbed) [2]'}, {v: 0}]},
         {c: [{v: 'Discharge (tidal) [3]'}, {v: 0}]}]};
var fluxchart = {
  cols: [{id: 'name', label: 'Type', type: 'string'},
         {id: 'year', label: 'Sediment flux (kg/s)', type: 'number'}],
  rows: [{c: [{v:('Qriver (pristine) [2]')}, {v: 0}]},
         {c: [{v: 'Qriver (disturbed) [2]'}, {v: 0}]},
         {c: [{v: 'Qwave [4]'}, {v: 0}]},
         {c: [{v: 'Qtide [5]'}, {v: 0}]}]};
var maketable = function (x) {
  var waterchart = {
  cols: [{id: 'name', label: 'Type', type: 'string'},
         {id: 'year', label: 'Water Discharge (m3/s)', type: 'number'}],
  rows: [{c: [{v: 'Discharge (pristine) [2]'}, {v: JSON.parse(x["Dis_pris"]) }]},
         {c: [{v: 'Discharge (disturbed) [2]'}, {v:JSON.parse(x["Dis_dist"]) }]},
         {c: [{v: 'Discharge (tidal) [3]'}, {v: JSON.parse(x["Dis_tide"])}]}]};
         return waterchart;
}
var maketable2 = function (x) {
  var fluxchart = {
  cols: [{id: 'name', label: 'Type', type: 'string'},
         {id: 'year', label: 'Sediment flux (kg/s)', type: 'number'}],
  rows: [{c: [{v:('Qriver (pristine) [2]')}, {v: JSON.parse(x["QRiver_pri"])}]},
         {c: [{v: 'Qriver (disturbed) [2]'}, {v: JSON.parse(x["QRiver_dis"])}]},
         {c: [{v: 'Qwave [4]'}, {v: JSON.parse(x["QWave"])}]},
         {c: [{v: 'Qtide [5]'}, {v: JSON.parse(x["QTide"])}]}]};
         return fluxchart;}
var generateChart = function (coords) {
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var table0 = table.filterBounds(point);
 // if table0.size==0,return point;
  var table1 = table0.first().toDictionary();
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, ui.Map.Layer(table0.select([]), {color: 'red',width:100}, 'clicked location'));
  var sstTable1 = ui.Chart(waterchart);
  var sstTable2 = ui.Chart(fluxchart);  
  table1.evaluate(function(result){
    //print(result["Discharge_t"])
    sstTable1.setDataTable(maketable(result))
    .setChartType('BarChart')
    .setOptions({
    hAxis: {title: 'Water Discharge (m3/s)', viewWindow: {min: 0}},
    legend: {position: 'none'},
    height: 180,
    colors: ['#0e23e0']});
    sstTable2.setDataTable(maketable2(result))
    .setChartType('BarChart')
    .setOptions({
    hAxis: {title: 'Sediment flux (kg/s)', viewWindow: {min: 0}},
    legend: {position: 'none'},
    height: 200,
    colors: ['#e00e0e']});
  });
  //delta area chart: 
  var nr = table.filter(ee.Filter.eq('BasinID2',ee.Number.parse(table1.get("BasinID2")))).first();
  //var x = nr.get(ee.String('rate_y_').cat(ee.Number(12).format('%d'))).getInfo();
  //print(isNaN(x))
  var area_change_plot = years_area_change.map(function(f){
    return nr.get(ee.String('rate_y_').cat(ee.Number(f).format('%d')));
    });
  //print(ee.Number.parse(NaN))  
  //ee.Number.parse
  var area_change_linear = years_area_change.map(function(f) {
    return (ee.Number(f).subtract(17.5)).multiply(ee.Number(nr.get("rate")))});
  var area_change = (ee.List([0]).cat(area_change_plot)).zip(ee.List([0]).cat(area_change_linear));
  var sstChart = ui.Chart.array.values(area_change, 0, years)
  .setOptions({
    hAxis: {title: 'Year', gridlines: {count: 7}, viewWindow: {min: 1985, max: 2020}, ticks: ee.List.sequence(1985,2020,5), format: '####'},
    vAxis: {title: 'Land Area Change (km2)'},
    height: 200,
    series: {0: {pointSize: 4}, 1: {pointSize: 0, lineWidth: 2}}});
    ee.String('Trend: ').cat(ee.Number(nr.get("rate")).format('%.2f')).cat(' km2/yr').evaluate(function(result){
      sstChart.setSeriesNames(['Yearly average [1]',result])
    })
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, sstChart);
  inspectorPanel.widgets().set(3, sstTable1);
  inspectorPanel.widgets().set(4, sstTable2);
  //add basinID and basin area to top of panel
  table1.get("BasinID2").evaluate(function(result){BasinID2.setValue('HydroSheds BasinID2: ' + result)});
  ee.Number.parse(table1.get("BasinArea")).format('%1.2e').evaluate(function(result){BasinArea.setValue('Drainage Basin Area: ' + result +' km2' )});
};
// Add ID and basin area for deltas
var BasinID2 = ui.Label();
var BasinArea = ui.Label();
inspectorPanel.add(ui.Panel([BasinID2, BasinArea], ui.Panel.Layout.flow('horizontal',1)));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart1]'));
inspectorPanel.add(ui.Label('[Table1]'));
inspectorPanel.add(ui.Label('[Table2]'));
inspectorPanel.add(ui.Panel([
  ui.Panel([ui.Label('[1] Yearly delta land area deviation from 34 year mean, from',{fontSize: '10px',margin:  '2px 0px 0px 8px'}), ui.Label('EC JRC / Google', {fontSize: '10px',margin:  '2px 0px 0px 8px'},'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_GlobalSurfaceWater#description')], ui.Panel.Layout.flow('horizontal',1)),
  ui.Panel([ui.Label('[2] Pristine (pre-human-influence) and disturbed (modern) river water and sediment discharge, from',{fontSize: '10px',margin:  '2px 0px 0px 8px'}), ui.Label('Cohen et al 2014', {fontSize: '10px',margin:  '2px 0px 0px 8px'},'https://doi.org/10.1016/j.gloplacha.2014.01.011')], ui.Panel.Layout.flow('horizontal',1)),
  ui.Panel([ui.Label('[3] Tidal water discharge amplitude at the river mouth, from',{fontSize: '10px',margin:  '2px 0px 0px 8px'}), ui.Label('Nienhuis et al 2018', {fontSize: '10px',margin:  '2px 0px 0px 8px'},'https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2018GL077638')], ui.Panel.Layout.flow('horizontal',1)),
  ui.Panel([ui.Label('[4] Maximum potential wave-driven alongshore sediment transport away from the river mouth, from',{fontSize: '10px',margin:  '2px 0px 0px 8px'}), ui.Label('Nienhuis et al 2015', {fontSize: '10px',margin:  '2px 0px 0px 8px'},'https://doi.org/10.1130/G36518.1')], ui.Panel.Layout.flow('horizontal',1)),
  ui.Panel([ui.Label('[5] Tidal sediment discharge amplitude at the river mouth, from',{fontSize: '10px',margin:  '2px 0px 0px 8px'}), ui.Label('Nienhuis et al 2020', {fontSize: '10px',margin:  '2px 0px 0px 8px'},'https://doi.org/10.1038/s41586-019-1905-9')], ui.Panel.Layout.flow('horizontal',1)),
  ui.Panel([ui.Label('Detailed documentation and references to model code can be found',{margin:  '16px 0px 0px 8px' }), ui.Label('here', {margin:  '16px 0px 0px 8px' },'https://github.com/jhnienhuis/GlobalDeltaChange')], ui.Panel.Layout.flow('horizontal',1)),
  ui.Label('Download the data',{margin:  '8px 0px 0px 8px' },'https://osf.io/s28qb/')]));
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(105,11);
//var initialPoint = ee.Geometry.Point(23,45);
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