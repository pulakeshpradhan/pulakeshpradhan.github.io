var point = ui.Map.Layer(ee.Geometry.Point(-0.1237, 51.5126), {color: 'FF0000'})
Map.centerObject(ee.Geometry.Point(-0.1237, 51.5126), 6)
Map.layers().set(0, point);
var collection = ee.ImageCollection('COPERNICUS/S2');
var start = ee.Image(collection.first()).date().format().getInfo();
var now = Date.now()
var end = ee.Date(now).format().getInfo();  
var start_date = end
var end_date = end
var s2_data
var geometry
var list_s2_data
var cloud_cover = 100
var n_files
var selected_image
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
  // cloud cover slider
  var slider = ui.Slider({min:0, max:100, step : 1, value: 100, style: slider_style});
  slider.onChange(function(value) {
    cloud_cover = value
    s2_data = collection.filterDate(start_date, end_date)
                            .filterBounds(geometry)
                            .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'not_greater_than', cloud_cover)
    list_s2_data = s2_data.toList(5000, 0)
  });
     panel.widgets().set(1, ui.Label('Start date: ', date_style))
  panel.widgets().set(2, dateSlider_start.setValue(now));
  panel.widgets().set(3, ui.Label('End date: ', date_style));
  panel.widgets().set(4, dateSlider_end.setValue(now));
  panel.widgets().set(5, ui.Label('Cloud cover: ', date_style));
  panel.widgets().set(6, slider)
   ui.root.add(panel);
}
app()