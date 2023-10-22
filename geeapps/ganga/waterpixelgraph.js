print(roi)
var S1 = ee.ImageCollection('JRC/GSW1_3/MonthlyHistory')
  .filterBounds(roi)
  //.map(function(image){ return image.clip(roi)})
  .filterDate('1985-01-01','2021-12-31').select('water')
var visualization = {
  bands: ['water'],
  min: 0.0,
  max: 2.0,
  palette: ['ffffff', 'fffcb8', 'blue']
};
Map.centerObject(roi);
Map.addLayer(S1, visualization, 'Water');
Map.addLayer(roi, {}, 'ROI')
var classifyWater = function(img) {
  var vv = img.select('water')
  var pix= vv.eq(2);
  var water = pix.rename('Water')   //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
  water = water.updateMask(water) //Remove all pixels equal to 0
  return img.addBands(water)  //Return image with added classified water band
}
//Map classification across sentinel-1 collection and print to console to inspect
S1 = S1.map(classifyWater)
print(S1)
//Make time series of water pixels within region
// for (var i = 1; i<3 ; i++){
// var str = 'roi'
// var year = str.concat(i.toString())
//   print(year)
var ClassChart = ui.Chart.image.seriesByRegion({
  imageCollection: S1.select('Water') ,
  regions : roi,
  reducer: ee.Reducer.sum(),
  scale:30,
})
  .setOptions({
      hAxis: {'title': 'Years'},
      vAxis: {'title': 'Pixel count'},
      lineWidth: 2
    })
//Set the postion of the chart and add it to the map    
ClassChart.style().set({
    position: 'bottom-right',
    width: '900px',
    height: '700px'
  });
print(ClassChart)
// }