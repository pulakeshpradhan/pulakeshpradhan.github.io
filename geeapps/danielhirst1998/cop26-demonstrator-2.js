var england_peatlands = ui.import && ui.import("england_peatlands", "table", {
      "id": "users/danielhirst1998/peatlands/peatlands_england"
    }) || ee.FeatureCollection("users/danielhirst1998/peatlands/peatlands_england"),
    uk = ui.import && ui.import("uk", "table", {
      "id": "users/danielhirst1998/uk/gb_100km"
    }) || ee.FeatureCollection("users/danielhirst1998/uk/gb_100km");
var startDate = ee.Date("2018-01-01");
var endDate = ee.Date("2019-01-01");
var totalDateRange = ee.DateRange(startDate, endDate)
var percentileBins = ee.List.sequence(0, 100, 1);
var elevation = ee.Image("USGS/SRTMGL1_003").select("elevation")
var maxElevation = elevation.reduceRegion({
  reducer: ee.Reducer.max(), 
  geometry: uk,
  scale: 1000
  }).get("elevation")
print(maxElevation)
var tempChangeAtSeaLevel = ee.Image.constant(maxElevation).subtract(elevation).multiply(ee.Image.constant(0.0065))
var palette = ["845EC2","D65DB1","FF6F91","FF9671","FFC75F","F9F871"]
var layerVis = {"palette": palette,"max":1,"min":0};
// Converts map to satellite image by default
Map.setOptions("SATELLITE")
Map.setCenter(-1.572600, 54.078771, 6);
// Initialise master panel with start date, end date, and run button
var panel = ui.Panel()
panel.style().set({
  position: 'bottom-right',
  width: "250px"
});
var leftPanel = ui.Panel()
leftPanel.style().set({
  position: 'top-left',
  width: "400px"
});
var startDateSlider = ui.DateSlider({
  start: "2000-01-01",
  end: "2021-01-01",
  value: "2018-01-01",
  period: 365,
  onChange: function(value) {
    startDate = value.start();
  }
})
var endDateSlider = ui.DateSlider({
  start: "2000-01-01",
  end: "2021-01-01",
  value: "2019-01-01",
  period: 365,
    onChange: function(value) {
    endDate = value.start();
  }
});
var runButton = ui.Button({
  label: "Run",
  onClick: function () {
    run(startDate, endDate)
  }
})
panel.add(ui.Label({
  value: 'Peatland Health Demonstrator (Internal)',
  style: {fontWeight: 'bold', fontSize: "20px"}
}))
panel.add(ui.Label({
  value: "Set the start and end dates to generate a time series of peat health.\nDraw a geometry on the map to create a time series of that specific area."
}))
panel.add(ui.Label({
  value: 'Start Date',
  style: {fontWeight: 'bold'}
}))
panel.add(startDateSlider)
panel.add(ui.Label({
  value: 'End Date',
  style: {fontWeight: 'bold'}
}))-
panel.add(endDateSlider)
panel.add(runButton)
Map.add(panel)
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label("Unhealthy", {margin: '4px 8px'}),
    ui.Label(
        "|",
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label("Healthy", {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Peatland Health Index',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
leftPanel.add(legendPanel)
/* Master function that runs every time the Run button is run. Generates plot of peat health over date range and geometries specified */
function run(startDate, endDate) {
  // if startDate is after endDate, switch start and end 
  if (endDate.difference(startDate, "day") < 0) {
    print("Start date is after end date, switching the dates")
    var tempDate = startDate;
    startDate = endDate;
    endDate = tempDate;
  }
  totalDateRange = ee.DateRange(startDate, endDate)
  // Split date range into specific years
  var years = ee.List.sequence(0, endDate.difference(startDate,'year').add(1));
  // Find the geometries to clip. If a user has drawn geometries on the map it will clip to those, otherwise it will clip to a collection
  // of all England's peatlands
  var geometriesOnMap = Map.drawingTools().toFeatureCollection()
  var geometries = ee.Algorithms.If(geometriesOnMap.size().eq(0), uk, geometriesOnMap)
  print(geometries)
  // Generate config for each data source so we only need to calculate percentiles onces
  updateConfigStats(evi_config);
  updateConfigStats(alb_config);
  updateConfigStats(lst_config);
  // Find the index for each year in the date range.
  var byYear = ee.ImageCollection.fromImages(
        years.map(function (yearAdd) {
          var year = startDate.get('year').add(yearAdd);
          return getIndex(year)
  }));
  print(byYear)
  print(byYear.reduceToImage(ee.List(["index"]),ee.Reducer.variance()).clipToCollection(geometries).reduce(ee.Reducer.minMax()).getInfo())
  // Add plot of mean peat health each year for the given geometry
  leftPanel.add(ui.Chart.image.series({
    imageCollection: byYear,
    region: geometries,
    scale: 5000,
    xProperty: "year"
  }))
  Map.add(leftPanel)
  // Create slider that will allow user to change the peat health index shown on the map
  var images = byYear.toList(15)
  startDate.get('year').evaluate(function (value) {
    var startYear = value;
    endDate.get('year').evaluate(function (value) {
      var endYear = value;
      var imageSlider = ui.Slider({
        min: startYear, 
        max: endYear,
        step: 1,
        onChange: function (value) {
          Map.remove(Map.layers().get(0))
          Map.addLayer(ee.Image(images.get(ee.Number(value).subtract(startYear))).clipToCollection(geometries), layerVis, value.toString() + " Health Index")
        }
      });
      imageSlider.style().set({width: '580px', position: "top-center"});
      Map.add(imageSlider)
    })
  })
  Map.addLayer(ee.Image(images.get(0)).clipToCollection(geometries), layerVis)  
}
var evi_config = {"collectionName": 'MODIS/006/MOD13A2',
                  "datasetName": 'EVI',
                  "title": 'evi',
                  "min": -423.5,
                  "max": 7273.5
};
var alb_config = {"collectionName": 'MODIS/006/MCD43A3',
                  "datasetName": 'Albedo_WSA_nir',
                  "title": 'albedo',
                  "min": 0,
                  "max": 104.5
};
var lst_config = {"collectionName": 'MODIS/006/MOD11A1',
                  "datasetName": 'LST_Day_1km',
                  "title": 'lst',
                  "min": 14030.5,
                  "max": 15353.5
};
function addLayer(dateRange, config){
  if (~config.percentiles) {
    updateConfigStats(config);
  }
  var collection = ee.ImageCollection(config.collectionName)
                    .filter(ee.Filter.date(dateRange.start(), dateRange.end()))
                    .filterBounds(uk);
  if (config.title == "lst"){
    var image = collection.select(config.datasetName).median().subtract(tempChangeAtSeaLevel);
  } else {
    var image = collection.select(config.datasetName).median();
  }
  var image_list = config.percentiles.map(function(p){return ee.Image.constant(p)});
  var percentile_collection = ee.ImageCollection.fromImages(image_list);
  var lte_masks = percentile_collection.map(function(im){return im.lte(image)});
  var image_percentile = lte_masks.sum();
  return image_percentile;
}
function getIndex(year, geometries) {
  // select 1 year 
  var startDate = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(startDate, startDate.advance(1, 'year'));
  var evi = addLayer(dateRange, evi_config, geometries);
  var albedo = addLayer(dateRange, alb_config);
  var lst = addLayer(dateRange, lst_config);
  lst = ee.Image.constant(100).subtract(lst);
  var index = evi.add(albedo).add(lst).divide(300);
  return index.rename("index").set("year", year);
}
function getPercentiles(image){
  var perc = image.reduceRegion({
    reducer: ee.Reducer.percentile(percentileBins),
    scale: 5000,
    geometry:england_peatlands
  });
  return perc;
}
function updateConfigStats(config){
  // Find the percentile bins for the median of england's peatlands
  var collection = ee.ImageCollection(config.collectionName)
                    .filter(ee.Filter.date(totalDateRange.start(), totalDateRange.end()))
                    .filterBounds(uk);
  var percentiles = getPercentiles(collection.select(config.datasetName).median().clipToCollection(england_peatlands));
  // sort by values (names are out of order)
  var values = percentiles.values().sort();
  // store percentile values into dictionary
  config.percentiles = values;
}