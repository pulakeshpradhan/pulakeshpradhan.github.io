var catchments = ee.FeatureCollection("users/gena/water-niger/catchments-homogenized"),
    modisMonthly = ee.ImageCollection("users/gena/water-niger/modis-monthly-upper-niger"),
    rivers = ee.FeatureCollection("users/gena/water-niger/wflow/rivers"),
    catchment = ee.FeatureCollection("users/gena/water-niger/catchment");
var style = require('users/gena/packages:style')
var animation = require('users/gena/packages:animation')
style.SetMapStyleDark()
Map.centerObject(catchments, 7)
Map.addLayer(catchment.style({ width: 3, color: '999999', fillColor: '99999911' }), {}, 'catchment')
var vis = { min: 300, max: 5000, bands: ['sur_refl_b06', 'sur_refl_b02', 'sur_refl_b04'] }
modisMonthly = modisMonthly.map(function(i) {
  return i.set({ label: i.date().format('YYYY-MMM') })
})
var panelCharts = ui.Panel()
var panelMain = ui.Panel([/*panelControls, */panelCharts])
panelMain.style().set({
  'background-color': '#fafafa',
  'position': 'bottom-left',
  'width': '800px',
  'height': '277px'
  //height: '477px'
})
panelMain.style().set({
  shown: false
})
/*panelControls.style().set({
  'background-color': '#fafafa',
})
*/
panelCharts.style().set({
  'background-color': '#fafafa',
})
Map.widgets().add(panelMain)
animation.animate(modisMonthly.filterDate('2016-01-01', '2019-01-01'), {
  maxFrames: 48,
  preload: true,
  preloadCount: 1,
  label: 'label',
  vis: vis,
  position: 'bottom-right',
})
.then(function() {
  Map.addLayer(catchments.style({ width: 1, color: 'ffffff', fillColor: 'ffffff11' }), {}, 'catchments', true)
  Map.addLayer(rivers.style({ width: 1, color: 'cyan'}), {}, 'rivers', false)
  // Map.addLayer(rivers.filter(ee.Filter.gt('UP_CELLS', 700)).style({ width: 2, color: 'cyan'}), {}, 'rivers (large)')
  var land = ee.Image("users/gena/land_polygons_image").mask();
  var waterOccurrence = ee.Image("JRC/GSW1_0/GlobalSurfaceWater")
    .select('occurrence')
    .divide(100)
    .unmask(0)
    .resample('bicubic')
  // PuBu[9]
  // var palette = ["fff7fb","ece7f2","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","045a8d","023858"]
  var palette = ["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","bd0026","800026"].reverse().slice(1)
  // var palette = ['ffffb2', 'fecc5c', 'fd8d3c', 'f03b20', 'bd0026'].reverse()
  Map.addLayer(waterOccurrence.mask(waterOccurrence.multiply(2).multiply(land)), {min: 0, max: 1, palette: palette}, 'water occurrence', false)
  var layerSelection = ui.Map.Layer(ee.Image(), { color: 'yellow' }, 'selection')
  Map.layers().add(layerSelection)
  Map.onClick(function(pt) {
    pt = ee.Geometry.Point([pt.lon, pt.lat])
    var selection = catchments.filterBounds(pt)
    layerSelection.setEeObject(selection)
    var hybasId = ee.Number(ee.Feature(selection.first()).get('HYBAS_ID'))
    var filename = ee.String('water-area-').cat(hybasId.format('%d')).cat('.geojson')
    filename.evaluate(function(filename) {
      var timeSeries = ee.Blob('gs://hydro-engine-waterbodies/time-series-niger/' + filename)
      timeSeries.string().evaluate(function (s) {
  /*      if(!s) {
          panelCharts.clear()
          panelCharts.add(ui.Label('No data (yet) ...'))
            showing = false
        }
  */      
        var json = JSON.parse(s)
/*        print('ID: ', json.features[0].properties.HYBAS_ID)
        print('Area: ', selection.geometry().area().divide(1000000))
*/        
        var axis = 0
        var values = json.features[0].properties.areaMNDWI
        values = values.map(function(v) { return v / 1000000 })
        var chart1 = ui.Chart.array.values(values, axis, json.features[0].properties.times)
          .setOptions({
            title: 'Area(t), km^2', 
            pointSize: 1, 
            lineWidth: 0.25, 
            legend: { 
              position: 'none' 
            },
            backgroundColor: '#fafafa',
            chartArea: { 
              backgroundColor: '#fafafa' 
            }
          })
        panelCharts.clear()
        panelCharts.add(chart1)
        panelMain.style().set({
          shown: true
        })
        //print(chart1)
      })
    })
  })
})
Map.style().set({ cursor: 'crosshair' })