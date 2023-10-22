var sst_agg = ee.ImageCollection("users/spiruel/sst_doy_avg");
print(sst_agg)
print( ee.Image(sst_agg.filter(ee.Filter.eq('day_of_year', 1)).first()) )
// Map.addLayer(sst_agg.filter(ee.Filter.eq('day_of_year', 5)).first(),{},'test')
var anomalyTS = function(image) {
  var startDate = ee.Date(image.get('system:time_start'));
  var day_now = startDate.getRelative('day', 'year');
  sst_agg_now = sst_agg.filterMetadata('day_of_year','equals',day_now+1).first()
  return (image.subtract(sst_agg_now)).multiply(0.01).set('system:time_start', startDate);
};
// Function to subtract DOY image from SST image
var subtractDOY = function(image) {
  var doy = image.date().getRelative('day', 'year');
  var doyImage = ee.Image(sst_agg.filter(ee.Filter.eq('day_of_year', doy)).first());
  var sstSubtracted = image.subtract(doyImage).multiply(0.01);
  return image.addBands(sstSubtracted.rename('sst_anom')).set('system:time_start', image.get('system:time_start')); //sstSubtracted.set('day_of_year', doy);
};
var visParams = {
  min: -10,
  max: 10,
  palette: '0000FF,FFFFFF,FF0000'
};
var sst = ee.ImageCollection("NOAA/CDR/OISST/V2_1")
    .select('sst')
var lastimg=sst.limit(1, 'system:time_start', false).first();
var latestdate = ee.Date(lastimg.get('system:time_start')).format('dd/MM/YYYY').getInfo();
var eeNow = ee.Date(Date.now());
var day_now = eeNow.getRelative('day', 'year');
var sst_agg_now = sst_agg.filterMetadata('day_of_year','equals',day_now).first();
var sstAnomaly = (sst.filter(ee.Filter.date(eeNow.advance(-5, 'day'), eeNow)).mean().subtract(sst_agg_now)).multiply(0.01);
//Map.addLayer(dataset, visParams, 'Mean SST');  
Map.addLayer(sstAnomaly, visParams, 'Mean SST diff from ' + latestdate + ' and 1983-2022 mean');
//var sst_test = sst.filter(ee.Filter.date(eeNow.advance(-5, 'day'), eeNow)).map(subtractDOY)
//Map.addLayer(sst_test.select('sst_anom').filter(ee.Filter.date(eeNow.advance(-5, 'day'), eeNow)).mean(), visParams, 'Mean SST diff TEST');
//408–508N, 358–108W
var northAtlanticRegion = ee.Geometry.Rectangle(-35, 40, -10, 50);
var vis_params = {
    'color': '000000', 
    'pointSize': 3,
    'pointShape': 'circle',
    'width': 2,
    'lineType': 'solid',
    'fillColor': '00000000',
}
Map.addLayer(ee.FeatureCollection(northAtlanticRegion).style(vis_params), {}, 'North Atlantic Region', true, 0.25)
var sstAnomalyNorthAtlantic = sstAnomaly.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: northAtlanticRegion,
  scale: 20000,  // Adjust the scale as per your requirements
  bestEffort: true
});
print('SST Anomaly in the North Atlantic (2023):', sstAnomalyNorthAtlantic);
// Define the chart and print it to the console.
var setdate = ee.Date('2023-06-21');
var filteredCollection = sst.filterDate('2018-01-01',eeNow).filter(ee.Filter.dayOfYear(2, 366));
var chart =
    ui.Chart.image
        .doySeriesByYear({
          imageCollection: filteredCollection.map(subtractDOY), //sst.filter(ee.Filter.date('2020-06-05', '2023-06-10')).map(anomalyTS),
          bandName: 'sst_anom',
          region: northAtlanticRegion,
          regionReducer: ee.Reducer.mean(),
          scale:20000,
          startDay: 1,
          endDay: 366,
          sameDayReducer: ee.Reducer.mean(),
        })
        .setOptions({
          title: 'North Atlantic Anomaly from 1983-2022 mean',
          hAxis: {title: 'Day of year', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'SST anomaly /degC',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 3,
          curveType: 'function'
        });
// Create a panel for the sidebar
var sidebar = ui.Panel({
  style: {
    width: '450px',
    position: 'bottom-right',
    padding: '10px'
  }
});
// Create a label for SST anomalies
var sstAnomalyLabel = ui.Label({
  value: 'Sea Surface Temperature Anomalies',
  style: { fontWeight: 'bold', fontSize: '18px' }
});
// Create a text panel for the explanation
var explanationText = ui.Panel([
  ui.Label({value: 'Latest SST observation dated ' + latestdate + '. Please wait while the data for the last few years is calculated.', style: {fontSize: '10px'}}),
  ui.Label('Sea surface temperature (SST) anomalies refer to the deviation of the sea surface temperature from the long-term average.'),
  ui.Label('Positive anomalies indicate warmer temperatures, while negative anomalies indicate cooler temperatures.'),
  ui.Label('https://twitter.com/EliotJacobson/status/1667198969347440641?s=20').setUrl('https://twitter.com/EliotJacobson/status/1667198969347440641?s=20'),
]);
// Create a label for weather impact
var weatherImpactLabel = ui.Label({
  value: 'Impact of SST on weather',
  style: { fontWeight: 'bold', fontSize: '18px'}
});
// Create a text panel for weather explanation
var weatherExplanationText = ui.Panel([
  ui.Label('Sea surface temperature plays a crucial role in shaping weather patterns.'),
  ui.Label('Warmer SST can lead to increased evaporation, which can fuel the formation of tropical storms such as hurricanes.'),
  ui.Label('It can also influence the position and strength of jet streams, impacting weather systems and precipitation patterns across the globe.')
]);
// Add the explanation and labels to the sidebar
sidebar.add(sstAnomalyLabel);
sidebar.add(chart);
sidebar.add(explanationText);
sidebar.add(weatherImpactLabel);
sidebar.add(weatherExplanationText);
// Add the sidebar to the Map
ui.root.insert(0, sidebar);
// Create a legend for temperature anomalies
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px',
    width: '250px'
  }
});
// Create a color palette for the legend
var palette = ['blue', 'white', 'red'];
// Create the legend title
var legendTitle = ui.Label({
  value: 'SST Anomalies',
  style: { fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0' }
});
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'SST Anomalies',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
var palette =['FF0000', 'FFFFFF', '1500ff'];
// name of the legend
var names = ['Warmer than usual','','Cooler than usual'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add the legend to the Map
Map.add(legend);