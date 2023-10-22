// A sensor invariant Atmospheric Correction (SIAC) GEE version
// v1 -- 2019-05-06
// Author: Fengn Yin, UCL
// Email: ucfafy@ucl.ac.uk
// Github: https://github.com/MarcYin/SIAC
// DOI: https://eartharxiv.org/ps957/
// LICENSE: GNU GENERAL PUBLIC LICENSE V3
var point = ui.Map.Layer(ee.Geometry.Point(-0.1237, 51.5126), {color: 'FF0000'})
Map.centerObject(ee.Geometry.Point(-0.1237, 51.5126), 6)
Map.layers().set(0, point);
var siac = require('users/marcyinfeng/utils:SIAC')
var inv_prosail = require('users/marcyinfeng/Toa2Lai:S2_Toa2Lai')
var collection = ee.ImageCollection('COPERNICUS/S2');
var start = ee.Image(collection.first()).date().format().getInfo();
Map.style().set('cursor', 'crosshair');
var now = Date.now()
var end = ee.Date(now).format().getInfo();
// Use the start of the collection and now to bound the slider.
var start_date = end
var end_date = end
var s2_data
var geometry
var list_s2_data
var cloud_cover = 100
var n_files
var selected_image
var exportResults = function(image){
  var s2cloud = ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY")
  var cloud = s2cloud.filterMetadata('system:index', 'equals', image.get('system:index')).first()
  var geom = image.geometry()
  var boa = siac.get_sur(image)
  var aot   = boa.select('aot')
  var tcwv  = boa.select('tcwv')
  var tco3  = boa.select('tco3')
  // var cloud = boa.select('MSK_CLDPRB')
  var name     = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A',  'B11', 'B12']
  var new_name = ['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B8A',  'B11', 'B12']
  var boa = boa.select(name, new_name).multiply(10000).toInt()
  var fname = ee.String(image.get('PRODUCT_ID')).getInfo() 
  Export.image.toDrive({
              image: boa.select(['B02', 'B03', 'B04', 'B08']),
              description: fname + '_10m_sur',
              scale: 10,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
  Export.image.toDrive({
              image: boa.select(['B05', 'B06', 'B07', 'B8A', 'B11', 'B12']),
              description: fname + '_20m_sur',
              scale: 20,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
  Export.image.toDrive({
              image: boa.select(['B01']),
              description: fname + '_60m_sur',
              scale: 60,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
  // var cloud = cloud.toByte()//.add(shadow.toByte().multiply(2))
  Export.image.toDrive({
              image: cloud,
              description: fname+ '_cloud',
              scale: 10,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
  aot = aot.multiply(100).toInt().reproject(image.select('B2').projection(), null, 500)
  Export.image.toDrive({
              image: aot,
              description: fname + '_aot',
              scale: 500,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
  tcwv = tcwv.multiply(100).toInt().reproject(image.select('B2').projection(), null, 500)
  Export.image.toDrive({
              image: tcwv,
              description: fname + '_tcwv',
              scale: 60,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
  tco3 = tco3.multiply(100).toInt().reproject(image.select('B2').projection(), null, 500)
  Export.image.toDrive({
              image: tco3,
              description: fname + '_tco3',
              scale: 500,
              fileFormat: 'GeoTIFF',
              folder:'S2_SUR',
              region: geom,
              maxPixels: 1e13
            })
}   
var app = function(){
  var get_fileame = function(image){
    return image.get('PRODUCT_ID')
  }
  var date_style = {fontSize: '20px', 
                      color: '#0066cc',
                      //fontWeight: 'bold',
                      fontFamily : 'serif',
                      textAlign: 'left',
                      stretch: 'both',
    }
  var panel = ui.Panel({style: {width: '500px'}})
      .add(ui.Label({value      :'Please Click a point on the map to set AOI!',
                     style:{
                     color      : 'red', 
                     fontWeight : 'bold', 
                     fontSize   : '16px',
                     fontFamily : 'serif',
                     padding    : '10px'}
                     }));
  var date_slider_style = {
    width: '80%',
    height: '80px',
    stretch: 'both',
    padding: '10px',
    fontFamily : 'serif',
  }
  var slider_style = {
    width: '90%',
    height: '80px',
    stretch: 'both',
    padding: '10px',
    fontFamily : 'serif',
  }
  // AOI setting
  Map.onClick(function(coords) {
    geometry = ee.Geometry.Point(coords.lon, coords.lat);
    var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                   'lat: ' + coords.lat.toFixed(2);
    Map.remove(point)
    point = ui.Map.Layer(geometry, {color: 'FF0000'})
    Map.layers().set(0, point);
    panel.widgets().set(0, ui.Label(location))
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
    list_s2_data = s2_data.toList(5000, 0)
  });
  // cloud cover slider
  var slider = ui.Slider({min:0, max:100, step : 1, value: 100, style: slider_style});
  slider.onChange(function(value) {
    cloud_cover = value
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
    list_s2_data = s2_data.toList(5000, 0)
  });
  // Date range start slider
  var dateSlider_start = ui.DateSlider({
    start: start,
    end: end,
    value: null,
    onChange: function(this_range) {
              start_date = ee.Algorithms.If(this_range, this_range.start(), start)
              s2_data = collection.filterDate(start_date, end_date)
                                      .filterBounds(geometry)
                                      .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
              list_s2_data = s2_data.toList(5000, 0)
              },
    style: date_slider_style
  });
// Date range end slider
  var dateSlider_end = ui.DateSlider({
    start: start,
    end: end,
    value: null,
    onChange: function(this_range) {
              end_date = ee.Algorithms.If(this_range, this_range.end(), end)
              s2_data = collection.filterDate(start_date, end_date)
                                      .filterBounds(geometry)
                                      .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
              list_s2_data = s2_data.toList(5000, 0)
            },
    style: date_slider_style
  });
  panel.widgets().set(1, ui.Label('Start date: ', date_style))
  panel.widgets().set(2, dateSlider_start.setValue(now));
  panel.widgets().set(3, ui.Label('End date: ', date_style));
  panel.widgets().set(4, dateSlider_end.setValue(now));
  panel.widgets().set(5, ui.Label('Cloud cover: ', date_style));
  panel.widgets().set(6, slider)
  var button1 = ui.Button({
    label: 'Search',
    style: {fontFamily : 'serif'},
    onClick: function() {
    panel.remove(panel.widgets().get(8))
    panel.remove(panel.widgets().get(9))
    panel.remove(panel.widgets().get(10))
    panel.remove(panel.widgets().get(11))
    n_files = list_s2_data.size()
    n_files.evaluate(function(result){
      panel.widgets().set(8, ui.Label({value: 'Total '+ result +  ' Sentinel 2 files are found!', 
                                       style:{fontFamily : 'serif',}
      }))
    })
    var fnames = s2_data.aggregate_array('PRODUCT_ID')
    fnames.evaluate(function(result){
        panel.widgets().set(9, ui.Label('Results: '));
        panel.widgets().set(10, ui.Label(result.join('\n')))
      })
    fnames.evaluate(function(result){  
    var select = ui.Select({
        items: result,
        onChange: function(key) {
        var image = ee.Image(s2_data.filterMetadata('PRODUCT_ID', 'equals', key).first())
        selected_image = image
        image = image.visualize({
                                bands: ['B4', 'B3', 'B2'],
                                min: 0,
                                max: 5000,
                                gamma: [1.8, 2.4, 2.2]
                              });
        Map.centerObject(image)
        Map.layers().set(0, image)
        Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}))
      }})
      select.setPlaceholder('Choose a S2 file to preview and correct...')
      panel.widgets().set(11, select);
      panel.widgets().set(12, button2);
      panel.widgets().set(13, button3);
      // panel.widgets().set(14, button4);
    })
    }});
  panel.widgets().set(7, button1);
  var inital    = ui.Label('Initialising...')
  var submitted = ui.Label('Jobs are submitted!')
  var button2 = ui.Button({
    label: 'Do AC for selected image!',
    onClick: function() {
      panel.remove(submitted)
      panel.widgets().set(16, inital);
      exportResults(selected_image)
      panel.remove(inital)
      panel.widgets().set(16, submitted);
      }
    });
  var button3 = ui.Button({
    label: 'Do AC for all the results!',
    onClick: function() {
      panel.remove(submitted)
      panel.widgets().set(16, inital );
      var n = list_s2_data.size();
      n.evaluate(function(value){
        for (var i = 0; i < value; i++) {
          var img = ee.Image(list_s2_data.get(i));
          exportResults(img)
      }
      panel.remove(inital)
      panel.widgets().set(16, submitted);
      })
    }
  });
  // var button4 = ui.Button({
  //   label: 'Do LAI for all the results!',
  //   onClick: function() {
  //     panel.remove(submitted)
  //     panel.widgets().set(16, inital );
  //     var n = list_s2_data.size();
  //     n.evaluate(function(value){
  //       for (var i = 0; i < value; i++) {
  //         var img = ee.Image(list_s2_data.get(i));
  //         inv_prosail.inv_prosail(img)
  //     }
  //     panel.remove(inital)
  //     panel.widgets().set(16, submitted);
  //     })
  //   }
  // });
  ui.root.add(panel);
}
app()