var satellite = require('users/fitoprincipe/geetools:satellite')
var cld = require('users/fitoprincipe/geetools:cloud_masks')
var tools = require('users/fitoprincipe/geetools:tools')
// MENU
var buff = ui.Textbox({
  value: 1000
})
var scale = ui.Textbox({
  value: 10
})
var size = ui.Textbox({
  value: 15
})
var compact = ui.Textbox({
  value: 1
})
var conn = ui.Select({
  items: ['4', '8'],
  value: '8'
})
var neigh = ui.Textbox({
  value: 60
})
var callback_size = function(value) {
  neigh.setValue(2*value)
}
size.onChange(callback_size)
var apply_butt = ui.Button({label: 'Compute'})
var menu = ui.Panel({
  widgets: [ui.Label('Buffer (m)'), 
            buff,
            ui.Label('Scale (m)'),
            scale,
            ui.Label('Size (pixels)'),
            size,
            ui.Label('Compactness'),
            compact,
            ui.Label('Connectivity'),
            conn,
            ui.Label('neighborhoodSize'),
            neigh,
            apply_butt
            ],
})
ui.root.add(menu)
var feature;
var sat = new satellite.Sentinel(2)
var proj = ee.Projection('EPSG:4326')
var compute = function(image) {
  proj = proj.atScale(Number(scale.getValue()))
  var clusters = ee.Algorithms.Image.Segmentation.SNIC(
    image, 
    Number(size.getValue()), 
    Number(compact.getValue()), 
    Number(conn.getValue()), 
    Number(neigh.getValue())
    )
  clusters = clusters.reproject(proj)
  return clusters
}
var callback = function(coords) {
  var p = ee.Geometry.Point(coords.lon, coords.lat)
  var buffer = Number(buff.getValue())
  var area = p.buffer(buffer)
  feature = area
  Map.addLayer(feature)
  var filtered = sat.collection.filterBounds(area)
                    .map(cld.sentinel2())
                    .filterMetadata(sat.cloud_cover, 'less_than', 30)
  var mos = filtered.median().select([sat.band.nir, sat.band.swir, sat.band.red])
  var clipped = mos.clip(area)
}
var apply = function() {
  var centroid = feature.centroid()
  var filtered = sat.collection.filterBounds(feature)
                    .map(cld.sentinel2())
                    .filterMetadata(sat.cloud_cover, 'less_than', 30)
  var mos = filtered.median().select([sat.band.nir, sat.band.swir, sat.band.red])
  var clipped = mos.clip(feature)
  var clusters = compute(clipped)
  var name = 'SNIC_'+scale.getValue().toString()+'m_'+size.getValue().toString()+
             'px_'+compact.getValue().toString()+'_'+conn.toString()+'_'+neigh.toString()
  Map.addLayer(clipped, sat.vis.NSR, name+'_NSR', false)
  Map.addLayer(clusters.randomVisualizer(), {min:0, max:255}, name)
}
apply_butt.onClick(apply)
Map.onClick(callback)
var mapstyle = Map.style()
mapstyle.set('cursor', 'crosshair')