var t = function() {
    var c = Map.getCenter();
    var i = ee.ImageCollection('COPERNICUS/S2_SR')
              .filterDate('2022-01-01', '2022-06-01')
              .filterBounds(c)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
              .sort('system:time_start', false)
              .first();
    var date = ee.Date(i.get('system:time_start')).format('dd-MM-YYYY').getInfo();
    print('S2 Timestamp: ' + date);
    Map.addLayer(i, {max: 3000, bands: ['B4', 'B3', 'B2']}, 'S2 '+date);
};
var s = function() {
    var c = Map.getCenter();
    var i = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
              .filterDate('2022-01-01', '2022-06-01')
              .filterBounds(c)
              .filter(ee.Filter.lt('CLOUD_COVER', 20))
              .sort('system:time_start', false)
              .first();
    var date = ee.Date(i.get('system:time_start')).format('dd-MM-YYYY').getInfo();
    print('L8 Timestamp: ' + date);
    Map.addLayer(i, {min: 8000, max: 15000, bands: ['SR_B4', 'SR_B3', 'SR_B2']}, 'L8 ' + date);
};
var button = ui.Button('Get Map Center');
button.onClick(t);
button.onClick(s);
print(button);