var table = ui.import && ui.import("table", "table", {
      "id": "users/mutindarisper/MERGE2"
    }) || ee.FeatureCollection("users/mutindarisper/MERGE2");
// Map.centerObject(table, 12);
 Map.setCenter(39.6682, -4.0435, 12);
var dateSlider = ui.DateSlider({
  start: '2018-12-01',
  end: '2020-12-31',
  value: ['2019-01-01','2020-01-01'],
  period: 30,
  onChange: function(value){
    var new_value = value
    return new_value, run()
  },
  style: {
    position: 'bottom-left',
    width: '500px',
  }
})
Map.add(dateSlider)
var run = function(){
  Map.clear();
  Map.add(dateSlider)
  var startEnd_Dates = dateSlider.getValue()//Returns the slider's current value, and array with the start and end datetimes 
  var start = startEnd_Dates[0];
  var end = startEnd_Dates[1];
  // var start_date = ee.Date(start)
  // var end_date = ee.Date(end)
  var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
  var country = 'Kenya';
  var table1 = countries.filter(ee.Filter.eq('country_na',country ))
  // print(startEnd_Dates)
  // print(start_date)
  // print(end_date)
  var landsat = ee.ImageCollection("COPERNICUS/S2")
                .filterBounds(table)
                .filterDate(start, end) 
                .mean()
                .clip(table);
  //print(landsat);
  var landsatprojection = landsat.select('B4').projection();
  // print(landsatprojection);
  var Start_period = ee.Date('2019-01-01')
  //var End_period = ee.Date(new Date().getTime())
  var End_period = ee.Date('2020-12-31')
  var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
    .select('SO2_column_number_density')
    .filterBounds(table)
    .filterDate(start, end) 
    .mean()
    .clip(table);
  var collection1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
    .select('NO2_column_number_density')
    .filterBounds(table)
    .filterDate(start, end) 
    .mean()
    .clip(table);
  var collection2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
    .select('CO_column_number_density')
    .filterBounds(table)
    .filterDate(start, end) 
    .mean()
    .clip(table);
  var studyArea = countries.filter(ee.Filter.eq('country_na',country ))
  var defualtProj = function(image){
    var mean = image.setDefaultProjection({crs:'EPSG:4326',scale: 500});
    return mean;
  }
  var no2 = defualtProj(collection1)
  var so2 = defualtProj(collection)
  var co = defualtProj(collection2)
  //var landsat = landsat.setDefaultProjection({crs:'EPSG:4326',scale: 20});
  //print(meanprojection);
  var highressImage = function(image){
    var highress = image.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort: true
     })
     .reproject({
       scale: 100,
       crs: landsatprojection
     });
    return highress;
  }
  var hiress_no2 = highressImage(no2)
  var hiress_so2 = highressImage(so2)
  var hiress_co = highressImage(co)
  var color = 'black, blue, cyan,  yellow, red'
  Map.addLayer(hiress_no2 .resample('bicubic'), {min:0.00003524064675429186, max:0.00004896762285110475, palette: color}, 'S5P_NO2');
  Map.addLayer(hiress_so2.resample('bicubic'), {min:-0.00006246370639521664, max:0.00017055857301304588, palette: color}, 'S5P_SO2');
  Map.addLayer(hiress_co.resample('bicubic'), {min:0.029330795675696665, max:0.031761693684238465, palette: color}, 'S5P_CO');
  //==========================================================================================
//                                    ADD A LEGEND
// // add legend to map (alternatively you can also print the legend to the console)
// Map.add(legend);
  Export.image.toDrive({
    image: hiress_no2,
    description: 'NO2-2019-COVID',
    maxPixels: 1e13,
    fileFormat: 'GeoTIFF',
    formatOptions: {
      cloudOptimized: true
        },
    scale: 500,
    region: table,
  });
  Export.image.toDrive({
    image: hiress_so2,
    description: 'SO2-2019-COVID',
    maxPixels: 1e13,
    fileFormat: 'GeoTIFF',
    formatOptions: {
      cloudOptimized: true
        },
    scale: 500,
    region: table,
  });
  Export.image.toDrive({
    image: hiress_co,
    description: 'CO-2019-COVID',
    maxPixels: 1e13,
    fileFormat: 'GeoTIFF',
    formatOptions: {
      cloudOptimized: true
        },
    scale: 500,
    region: table,
  });
}
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    margin: '10px',
    border: '2px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: 'Concentration Levels',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Palette with the colors
var palette = ['red', 'yellow', 'cyan', 'blue', 'black'];
// name of the legend
var names = ['Very High', 'High','Moderate', 'Low','Very Low'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
var header = ui.Label('Air Quality Monitoring', {fontSize: '36px', color: 'Blue', fontWeight: 'bold'});
var text = ui.Label(
    'Results from analysis of Sentinel 5P images characterizing change in air quality',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text, legend], 'flow', {width: '300px'});
  ui.root.widgets().add(toolPanel);