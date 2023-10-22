// The region to reduce within.
var th = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').
              filter(ee.Filter.eq('country_na', 'Thailand'));
Map.centerObject(th);  
// Map.addLayer(amzn, {color: 'red'}, 'geodesic polygon');
//fire 
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_NDVI')
var month = ee.List.sequence(1,12) // list of yrs from 2003-16
print(month)
var maps = ee.ImageCollection(month.map(function(month){
var startDate = ee.Date.fromYMD(2014,month,1)
var endDate = ee.Date.fromYMD(2014,month,28)
var myImg = dataset.filter(ee.Filter.date(startDate,endDate)).max().set("system:time_start",startDate)
return myImg
}))
var textbox = ui.Textbox({
  placeholder: 'Enter text here...',
  onChange: function(text) {
    print('So what you are saying is ' + text + '?');
  }
});
print(textbox);
print(ui.Chart.image.seriesByRegion({imageCollection:maps,
regions:th,
reducer:ee.Reducer.max(),//count 
scale:1000}).setOptions({title: 'Fire count',
lineWidth: 1,
pointSize: 3}));
Map.addLayer(maps.max().clip(th), {min:0,max:1,palette:['red']}, 'Fires');