/*
https://developers.google.com/earth-engine/tutorials/community/introduction-to-dynamic-world-pt-2
https://developers.google.com/earth-engine/guides/ui_panels
https://dynamicworld.app/explore
*/
var startDate = '2020-01-01';
var endDate = '2021-01-01';
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
             .filterDate(startDate, endDate)
var fvLayer = ui.Map.FeatureViewLayer('FAO/GAUL/2015/level2_FeatureView');
var visParams = {
  color: '00909F',
  fillColor: 'b5ffb4',
  opacity: 0.5,
  width: 1,
  pointSize: 1
};
fvLayer.setVisParams(visParams);
fvLayer.setName('Second Level Administrative Units');
Map.setCenter(2.3, 47.2, 5);
Map.add(fvLayer);
var table = ee.FeatureCollection("FAO/GAUL/2015/level2");
var selectionLayer = ui.Map.Layer(null, {}, 'selection')
Map.layers().add(selectionLayer)
var dwVisParams = {
  min: 0,
  max: 8,
  palette: [
    '#419BDF', '#397D49', '#88B053', '#7A87C6', '#E49635', '#DFC35A',
    '#C4281B', '#A59B8F', '#B39FE1'
  ]
}
var dwLayer = ui.Map.Layer(null, dwVisParams, 'landuse')
Map.layers().add(dwLayer)
Map.style().set({ cursor: 'crosshair' })
var labelSelectedRegion = ui.Label('<click on the map to compute landuse zonal statistics>')
var chartZonalStatPanel = ui.Panel([])
var panel = ui.Panel({
  widgets: [
    ui.Label('Loire Zonal Statistics', { fontSize: '16pt' }),
    labelSelectedRegion,
    chartZonalStatPanel
  ],
  style: { width: '400px' }
})
ui.root.insert(1, panel)
function onSelectFeature(pt) {
  pt = ee.Geometry.Point([pt.lon, pt.lat])
  var selection = table.filterBounds(pt)
  selectionLayer.setEeObject(selection.style({ width: 2, color: '000000', fillColor: '00000010' }))
  var f = selection.first()
  var label = ee.String(f.get('ADM1_NAME')).cat(', ').cat(f.get('ADM2_NAME'))
  label.evaluate(function(s) {
    labelSelectedRegion.setValue(s)
  })
  var dwImage = dw
    .filterBounds(selection.geometry())
    .select('label')
    .reduce(ee.Reducer.mode())
    .clip(selection.geometry())
  dwLayer.setEeObject(dwImage)
  var means = ee.Image.pixelArea().addBands(dwImage).reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'label',
    }),
    geometry: selection.geometry(),  
    scale: Map.getScale()
  })
  print(means)
  var dataTable = {
    cols: [{id: 'label', label: 'Label', type: 'string'},
           {id: 'area', label: 'Area', type: 'number'}],
    rows: []
  }
  var list = ee.List(means.get('groups'))
  list.evaluate(function(list) {
    dataTable.rows = list.map(function(o) {
      return { c: [ {v: o.label }, { v: o.sum } ] }
    })
    print(dataTable.rows)
    var colors = list.map(function(o) {
      return dwVisParams.palette[o.label]
    })
    var chart = ui.Chart(dataTable)
    chart.setChartType('PieChart')
    chart.setOptions({colors: colors })
    chartZonalStatPanel.widgets().reset([chart])
  })
}
Map.onClick(onSelectFeature)
Map.setOptions('HYBRID')