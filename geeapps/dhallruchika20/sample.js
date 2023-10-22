var img = ee.Image("MODIS/006/MOD09GA/2012_03_09"),
    collection = ee.ImageCollection("LANDSAT/LC08/C01/T1");
var label=ui.Label('Welcome to Google Earth Engine');
print(label);
var lon = ui.Textbox({
  //value: 1.0,
  placeholder: 'Enter longitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    lon.setValue(value);
    return(value);
  }
});
print(lon);
var lat = ui.Textbox({
  // value: 1.0,
  placeholder: 'Enter latitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    lat.setValue(value);
    return(value);
  }
});
print(lat);
var Lo;
var La;
var button = ui.Button({
  label: 'Go to Location',
  onClick: function() {
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
      Map.setCenter(Lo, La, 10);
      //Collection of datasets:
    var button2=ui.Button({
      label:'Modis datasets',
      onClick:function(){
    Map.addLayer(img);
    //create a checkbox to calculate the NDVI
    var checkbox = ui.Checkbox('Show NDVI layer', true);
    checkbox.onChange(function(checked){
    var ndvi = img.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']);
// Make a palette: a list of hex strings.
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
            Map.setCenter(Lo, La, 10);
             Map.layers().get(0).setShown(checked);
            Map.addLayer(img.select(['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03']),
         {gain: [0.1, 0.1, 0.1]}, 'MODIS bands 1/4/3');
   Map.addLayer(ndvi, {min: 0, max: 1, palette: palette}, 'NDVI');
    });
print(checkbox);
//Export the Modis Dataset
Export.image.toDrive({ 
  image: img,
  description: "ModisDataExport",
  maxPixels: 1e8, 
  //region: geometry, 
  crs: 'EPSG:32647',
  scale: 1000 });
  }
    });
    print(button2);
  //Button to get the Landsat data sets
  var button1=ui.Button({
    label:'Show the Landsat data collection',
    onClick:function(){
     // Map.addLayer(collection, { min: 0.05, max: 0.8, bands: 'B4, B3, B2' }, 'Landsat Collection');
      //print(landsat8_collection);
      var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: collection.filterDate(range.start(), range.end())
  });
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
    var layer = ui.Map.Layer(mosaic, visParams, name + ' composite');
     Map.setCenter(Lo,La,10);
    Map.layers().set(0, layer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(now));
});
//export the data to drive: 
Export.image.toDrive({ 
  image: collection,
  description: "LandsatDataExport",
  maxPixels: 1e8, 
  //region: geometry, 
  crs: 'EPSG:32647',
  scale: 1000 });
    }
  });
  print(button1);
  }
});
print(button);