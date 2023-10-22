var imageCollection = ee.ImageCollection("FIRMS"),
    geometry = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-60.88664791666656, -32.2597443375272],
          [-60.89763424479156, -32.51950356353514],
          [-60.48015377604156, -33.211590295861456],
          [-58.60149166666656, -34.42550327574708],
          [-58.33781979166656, -34.16228677266495],
          [-58.46965572916656, -33.431913962698935],
          [-59.51335690104156, -33.14722440039559],
          [-60.65593502604156, -32.18539035346077]]]),
    table = ee.FeatureCollection("users/fernandotentor/ER");
var geometry = table
var images = imageCollection
            .filterBounds(geometry)
            .filterDate('2019-04-18','2019-11-20')
var image = images.mosaic().reproject('EPSG:3857',null,1000)
var table = images.map(function (firms){
            var count = firms.select(['confidence'],['count']).gt(0).reproject('EPSG:3857',null,1000)
                              .reduceRegion(ee.Reducer.sum(),geometry,1000)
            var date = ee.Date(firms.get('system:time_start')).format('yyyy-MM-dd')
            return ee.Feature(null).set({'count':ee.Number(count.get('count')).toInt(),'date':date})
})
var count = image.select(['confidence'],['count']).gt(0).reduceRegion(ee.Reducer.sum(),geometry,1000)
var tot = table.aggregate_sum('count')
print ('Incendios totales en el período \n 2019-04-01  2019-11-20',tot)
var map = ui.Chart.feature.byFeature(table,'date','count')
map.setOptions({title: 'Incendios'})
map.setChartType('ColumnChart')
Map.centerObject(geometry,8)
Map.addLayer(image.clip(geometry).paint(geometry,'black',2),{},'firms')
// Create the title label.
var title = ui.Label('Incendios totales en el período 2019-04-01  2019-11-20');
title.style().set('position', 'top-center');
// Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '600px',
  position: 'bottom-right'
});
Map.add(panel);
panel.add(map)
panel.add(ui.Label('Incendios totales en el período 2019-04-01  2019-11-20'))
panel.add(ui.Label(tot.getInfo()))