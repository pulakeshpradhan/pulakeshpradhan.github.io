var Start_period = ee.Date('2000-01-01')
var End_period = ee.Date(new Date().getTime())
var weather = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
    .filterDate(Start_period, End_period)
var temp = weather.select("temperature_2m")
var prec = weather.select("total_precipitation_hourly")
// UI widgets needs client-side data. evaluate()
// to get client-side values of start and end period
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    onChange: renderDateRange
  })
  Map.add(slider)
}
function renderDateRange(dateRange) {
  var image = temp 
    .filterDate(dateRange.start(), dateRange.end())
  var vis = {min: 250.0, max: 320.0,  palette: [
    "#000080","#0000D9","#4000FF","#8000FF","#0080FF","#00FFFF",
    "#00FF80","#80FF00","#DAFF00","#FFFF00","#FFF500","#FFDA00",
    "#FFB000","#FFA400","#FF4F00","#FF2500","#FF0A00","#FF00FF",
  ]}  
  var layer = ui.Map.Layer(image, vis)
  Map.layers().reset([layer])
}