var states = ui.import && ui.import("states", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States"),
    ned = ui.import && ui.import("ned", "image", {
      "id": "USGS/NED"
    }) || ee.Image("USGS/NED"),
    modis = ui.import && ui.import("modis", "imageCollection", {
      "id": "MODIS/006/MOD09GA"
    }) || ee.ImageCollection("MODIS/006/MOD09GA");
var startDate = ee.Date('2000-03-01');
var newDate = new Date();
var endDate = ee.Date(newDate).advance(-1,'day');
var initialStart = ee.Date(newDate).advance(-3, 'day');
var initialEnd = ee.Date(newDate).advance(-2, 'day');
var region = states.filter(ee.Filter.eq('NAME', 'California'));
var landMask = ned.gt(0)
var collection = modis
  .filterDate(startDate, endDate)
  .select(['sur_refl_b07', 'sur_refl_b04','sur_refl_b03', 'sur_refl_b02', 'sur_refl_b01']);
var initialImage = collection
  .filterDate(initialStart, initialEnd);
var initialFC = initialImage
  .select(['sur_refl_b07', 'sur_refl_b02', 'sur_refl_b01'])
  .median();
var initialNC = initialImage
  .select(['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'])
  .median();
var modVis = {
  min: -100.0,
  max: 4000.0,
  };
Map.centerObject(region, 7);
Map.setOptions('HYBRID');
Map.addLayer(initialNC, modVis, 'MODIS Natural Color',0,1);
Map.addLayer(initialFC, modVis, 'MODIS False Color',0,1);
var firms = ee.ImageCollection('FIRMS')
  .filterDate(startDate, endDate)
  .select('T21');
var firmsNow = firms
  .filterDate(initialStart, initialEnd)
  .max();
var firmsVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
Map.addLayer(firmsNow, firmsVis, "FIRMS",1,1);
// UI widgets needs client-side data. evaluate()
// to get client-side values of start and end period
ee.Dictionary({start: startDate, end: endDate})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var sliderStyle = {
    width: '400px',
    position: 'bottom-center'
    };
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 1, // Every day
    onChange: renderDateRange,
    style: sliderStyle
  })
  Map.add(slider)
}
function renderDateRange(dateRange) {
  var imageFC = collection
    .filterDate(dateRange.start(), dateRange.end())
    .select(['sur_refl_b07', 'sur_refl_b02', 'sur_refl_b01'])
    ;
  var imageNC = collection
    .filterDate(dateRange.start(), dateRange.end())
    .select(['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'])
    ;
  var imageFIRMS = firms
    .filterDate(dateRange.start(), dateRange.end());
  var layer = ui.Map.Layer(imageNC, modVis, "MODIS Natural Color",0,1);
  var layer2 = ui.Map.Layer(imageFC, modVis, "MODIS False Color",1,1);  
  var layer3 = ui.Map.Layer(imageFIRMS, firmsVis, "FIRMS",1,1);
  Map.layers().reset([layer, layer2, layer3]);
}