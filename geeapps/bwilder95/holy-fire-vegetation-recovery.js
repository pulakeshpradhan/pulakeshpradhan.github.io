var santiago = ui.import && ui.import("santiago", "table", {
      "id": "users/bwilder95/sdsu/Santiago"
    }) || ee.FeatureCollection("users/bwilder95/sdsu/Santiago"),
    site = ui.import && ui.import("site", "table", {
      "id": "users/bwilder95/sdsu/Site"
    }) || ee.FeatureCollection("users/bwilder95/sdsu/Site"),
    fire = ui.import && ui.import("fire", "table", {
      "id": "users/bwilder95/sdsu/HolyFirePerim"
    }) || ee.FeatureCollection("users/bwilder95/sdsu/HolyFirePerim"),
    coldwater = ui.import && ui.import("coldwater", "table", {
      "id": "users/bwilder95/sdsu/coldwater"
    }) || ee.FeatureCollection("users/bwilder95/sdsu/coldwater");
// Application to visualize recovery after 2018 Holy Fire
// Brenton A. Wilder (Referenced from: https://code.earthengine.google.com/46314d510bf295c19e40413af5628055)
// October 2020
// Set dates
var Start_period = ee.Date('2015-01-01')
var End_period = ee.Date(new Date().getTime())
// Import ECOSTRESS image collection
var ecostress_dataset = ee.ImageCollection("users/bwilder95/ECOSTRESS_ET")
    .filterDate(Start_period, End_period)
// Import EVI image collection
var evi_dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_EVI')
    .filterDate(Start_period, End_period)
var EVI = evi_dataset.select('EVI')
                     .map(function(image){return image.clip(site)}) 
// Import NDVI image collection (S2)
var sentinel_dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(site)
    .filterDate(Start_period, End_period)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    // .map(maskS2clouds)
var collection2 = sentinel_dataset.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4'])).rename('NDVI')
});
var collection2 = collection2.select('NDVI')
                                  .map(function(image){return image.clip(site)})
// Mask iteration (ET)
var maskfunction = function(image){
  var maskarea = image.updateMask(image.gte(0))
  return maskarea
}
var collection = ecostress_dataset.map(maskfunction)
// Convert to mm
// ET (mm/day) = ET(W/m2) *  (86,400 (sec/day) * 1000 (mm/m)  /  2.45E6 (J/kg) * 997(kg/m3))
// latent heat of vaporization = 2.45E6 (J/kg)
// Water density = 997 (kg/m3)
var collection = collection.map(function(image) {
  return image.select().addBands(image.multiply(0.03537142038).rename('ET'))
});
// Define a FeatureCollection
var regions = ee.FeatureCollection([
  ee.Feature(  // Burn scar
    fire.geometry(), {label: '2018 Holy Fire burn scar'}),
  ee.Feature(  // Santiago
    santiago.geometry(), {label: 'Santiago'}),
  ee.Feature(    // Coldwater
    coldwater.geometry(), {label: 'Coldwater'})
]);
// set start and end year
var startyear = 2015;
var endyear = 2250;
// make a date object
var startdate = ee.Date.fromYMD(startyear, 1, 1);
var enddate = ee.Date.fromYMD(endyear + 1, 1, 1);
// make a list with years
var years = ee.List.sequence(startyear, endyear);
// make a list with months
var months = ee.List.sequence(1, 12);
// Aggregate monthly ET (median)
var monthlyET = ee.ImageCollection.fromImages(
 years.map(function (y) {
 return months.map(function(m) {
 var w = collection.filter(ee.Filter.calendarRange(y, y, 'year'))
 .filter(ee.Filter.calendarRange(m, m, 'month'))
 .median();
 return w.set('year', y)
 .set('month', m)
 .set('system:time_start', ee.Date.fromYMD(y, m, 1));
 });
 }).flatten()
);
// Aggregate monthly EVI (median)
var monthlyEVI = ee.ImageCollection.fromImages(
 years.map(function (y) {
 return months.map(function(m) {
 var w = EVI.filter(ee.Filter.calendarRange(y, y, 'year'))
 .filter(ee.Filter.calendarRange(m, m, 'month'))
 .median();
 return w.set('year', y)
 .set('month', m)
 .set('system:time_start', ee.Date.fromYMD(y, m, 1));
 });
 }).flatten()
);
// Aggregate monthly NDVI (median)
var monthlyNDVI = ee.ImageCollection.fromImages(
 years.map(function (y) {
 return months.map(function(m) {
 var w = collection2.filter(ee.Filter.calendarRange(y, y, 'year'))
 .filter(ee.Filter.calendarRange(m, m, 'month'))
 .median();
 return w.set('year', y)
 .set('month', m)
 .set('system:time_start', ee.Date.fromYMD(y, m, 1));
 });
 }).flatten()
);
// Create a time series chart ET
var TimeSeries_et = ui.Chart.image.seriesByRegion(
    monthlyET, regions, ee.Reducer.median(), 'ET', 70, 'system:time_start', 'label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'ECOSTRESS ET Recovery after 2018 Holy Fire',
          vAxis: {title: 'ET (mm/day)'},
          lineWidth: 1,
          pointSize: 4,
          series: {
            0: {color:'ffcc5c'}, // burn scar
            1: {color: '22ff00'}, // santiago  
            2: {color: '4040a1'}, // coldwater
}});
// Create a time series chart EVI
var TimeSeries_evi = ui.Chart.image.seriesByRegion(
    monthlyEVI, regions, ee.Reducer.median(), 'EVI', 30, 'system:time_start', 'label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'L8 EVI Recovery after 2018 Holy Fire',
          vAxis: {title: 'EVI'},
          lineWidth: 1,
          pointSize: 4,
          series: {
            0: {color:'ffcc5c'}, // burn scar
            1: {color: '22ff00'}, // santiago  
            2: {color: '4040a1'}, // coldwater
}});
// Create a time series chart NDVI
var TimeSeries_ndvi = ui.Chart.image.seriesByRegion(
    monthlyNDVI, regions, ee.Reducer.median(), 'NDVI', 10, 'system:time_start', 'label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'S2 NDVI Recovery after 2018 Holy Fire',
          vAxis: {title: 'NDVI'},
          lineWidth: 1,
          pointSize: 4,
          series: {
            0: {color:'ffcc5c'}, // burn scar
            1: {color: '22ff00'}, // santiago  
            2: {color: '4040a1'}, // coldwater
}});
// Display
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '500px'}
});
ui.root.add(panel);
var label = ui.Label('Thank you for visiting the Holy Fire Vegetation Recovery application (funded by Joint Fire Science Program). Please use timeseries to identify monthly composite image you would like to visualize. Once a date range is selected on the slider (found at the top of the screen). You can also click on the "Layers" tab to visualize the Landsat 8 EVI and Sentinel-2 NDVI data. Thank you for stopping by, and please check back next month for an update on the recovery.')
//var hyd_sig = ui.Label('Coldwater Runoff Ratio: WY2019 = 0.30 ; WY2020 = 0.30')
//var hyd_sig2 = ui.Label('Santiago Runoff Ratio: WY2019 = 0.28 ; WY2020 = 0.13')
//var hyd_sig3 = ui.Label('Coldwater R-B Index: WY2019 = 1.68 ; WY2020 = 0.52')
//var hyd_sig4 = ui.Label('Santiago R-B Index: WY2019 = 0.91 ; WY2020 = 0.54')
//panel.add(TimeSeries_et)
panel.add(TimeSeries_evi)
panel.add(TimeSeries_ndvi)
panel.add(label)
//panel.add(hyd_sig)
//panel.add(hyd_sig2)
//panel.add(hyd_sig3)
//panel.add(hyd_sig4)
// UI widgets needs client-side data. evaluate()
// to get client-side values of start and end period
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 30, // Every 30 days
    onChange: renderDateRange
  })
  Map.add(slider)
}
function renderDateRange(dateRange) {
  var image_et = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  var image_evi = EVI
  .filterDate(dateRange.start(), dateRange.end())
  .median()
  var image_NDVI = collection2
  .filterDate(dateRange.start(), dateRange.end())
  .median()
  var vis_et = {min: 0, max: 10, palette: [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301']}  
  var vis_evi = {min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']}  
  var vis_ndvi = {min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']}  
//  var layer_et = ui.Map.Layer(image_et, vis_et, 'ET')
  var shown_evi = true
  var layer_evi = ui.Map.Layer(image_evi, vis_evi, 'EVI',shown_evi)
  var shown_ndvi = true
  var layer_ndvi = ui.Map.Layer(image_NDVI, vis_ndvi, 'NDVI',shown_ndvi)
  Map.layers().reset([layer_evi,layer_ndvi])
  // Map watersheds and fire
  var shown = true; // true or false, 1 or 0 
  var opacity = 0.5; // number [0-1]
  var nameLayerFire = '2018 Holy Fire'; // string
  var nameLayerCold = 'Coldwater' // string
  var nameLayerSant = 'Santiago' // string
  var visParamsFire = {color: 'ffcc5c'}; // dictionary:
  var visParamsCold = {color: '4040a1'}; // dictionary: 
  var visParamsSant = {color: '22ff00'}; // dictionary: 
  Map.setCenter(-117.5341, 33.7266, 11)
  Map.addLayer(fire,visParamsFire, nameLayerFire, shown, opacity)
  Map.addLayer(santiago,visParamsSant, nameLayerSant, shown, opacity)
  Map.addLayer(coldwater,visParamsCold, nameLayerCold, shown, opacity)
}
// Map watersheds and fire
  var shown = true; // true or false, 1 or 0 
  var opacity = 0.5; // number [0-1]
  var nameLayerFire = '2018 Holy Fire'; // string
  var nameLayerCold = 'Coldwater' // string
  var nameLayerSant = 'Santiago' // string
  var visParamsFire = {color: 'ffcc5c'}; // dictionary:
  var visParamsCold = {color: '4040a1'}; // dictionary: 
  var visParamsSant = {color: '22ff00'}; // dictionary: 
  Map.setCenter(-117.5341, 33.7266, 11)
  Map.addLayer(fire,visParamsFire, nameLayerFire, shown, opacity)
  Map.addLayer(santiago,visParamsSant, nameLayerSant, shown, opacity)
  Map.addLayer(coldwater,visParamsCold, nameLayerCold, shown, opacity)
  var vis_et = {min: 0, max: 10, palette: [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301']}  
  var vis_evi = {min: 0, max: 1, palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']}  
   // set position of panel
  var legend_et = ui.Panel({
  style: {
  position: 'bottom-left',
  padding: '8px 15px'
  }
  });
  // set position of panel
  var legend_evi = ui.Panel({
  style: {
  position: 'bottom-right',
  padding: '8px 15px'
  }
  });
  // Create legend title ET
  var legendTitle_et = ui.Label({
  value: 'Average ET (mm/day)',
  style: {
  fontWeight: 'bold',
  fontSize: '12px',
  margin: '0 0 4px 0',
  padding: '0'
  }
  });
  // Create legend title EVI
  var legendTitle_evi = ui.Label({
  value: 'Average EVI/NDVI',
  style: {
  fontWeight: 'bold',
  fontSize: '12px',
  margin: '0 0 4px 0',
  padding: '0'
  }
  });
  // Add the titles to the panel
  //legend_et.add(legendTitle_et);
  legend_evi.add(legendTitle_evi); 
  // create the legend images
  var lon_et = ee.Image.pixelLonLat().select('latitude');
  var gradient_et = lon_et.multiply((vis_et.max-vis_et.min)/100.0).add(vis_et.min);
  var legendImage_et = gradient_et.visualize(vis_et);
  var lon_evi = ee.Image.pixelLonLat().select('latitude');
  var gradient_evi = lon_evi.multiply((vis_evi.max-vis_evi.min)/100.0).add(vis_evi.min);
  var legendImage_evi = gradient_evi.visualize(vis_evi);
  // create text on top of legends
  var panel_et = ui.Panel({
  widgets: [
  ui.Label(vis_et['max'])
  ],
  });
  legend_et.add(panel_et);
  var panel_evi = ui.Panel({
  widgets: [
  ui.Label(vis_evi['max'])
  ],
  });
  legend_evi.add(panel_evi);
  // create thumbnail from the image
  var thumbnail_et = ui.Thumbnail({
  image: legendImage_et,
  params: {bbox:'0,0,10,100', dimensions:'10x100'},
  style: {padding: '1px', position: 'bottom-center'}
  });
  var thumbnail_evi = ui.Thumbnail({
  image: legendImage_evi,
  params: {bbox:'0,0,10,100', dimensions:'10x100'},
  style: {padding: '1px', position: 'bottom-center'}
  });
  // add the thumbnail to the legends
  //legend_et.add(thumbnail_et);
  legend_evi.add(thumbnail_evi);
  // create text on top of legends
  var panelMin_et = ui.Panel({
  widgets: [
  ui.Label(vis_et['min'])
  ],
  });
  var panelMin_evi = ui.Panel({
  widgets: [
  ui.Label(vis_evi['min'])
  ],
  });
  legend_et.add(panelMin_et);
  legend_evi.add(panelMin_evi);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
      };
      //  Palette with the colors
      var palette =['ffcc5c', '22ff00', '4040a1'];
      // name of the legend
      var names = ['2018 Holy Fire Perimeter','Santiago','Coldwater'];
      // Add color and and names
      for (var i = 0; i < 3; i++) {
        legend_et.add(makeRow(palette[i], names[i]));
        }  
    //    Map.add(legend_et);
        Map.add(legend_evi);