// Add AOP flight boxes asset as Feature Collection
var AOPsites = ee.FeatureCollection('users/jnmusinsky/P1_Flight_Box_Complete/P1flightboxesAllSitesV2east_15kmBuff').sort('siteID')
// print('AOPsites:', AOPsites)
var names = AOPsites.aggregate_array('siteID')
function onNameChanged(siteID) {
  print('Update map for ' + siteID)
}
names.evaluate(function(names) {
  // print(names);
  var currentName = ui.Select({
    items: names, 
    placeholder: 'Select NEON Site', 
    onChange: redraw,
  });
  var panel = ui.Panel([currentName]);
   Map.widgets().add(panel);
});
var layers = [
  ui.Map.Layer(AOPsites),
];
// The new value is passed as a parameter to the select onChange callback.
function redraw(names) {
    // Filter the collection to contain only the selected feature
    var mySite = AOPsites.filterMetadata("siteID","equals", names)
    var siteName = AOPsites.filterMetadata("siteID","equals", names)
    var FBsiteID = ee.String(names).getInfo()
// Helper Function to remove all previous layers of the map
    function removeLayersFromMap(layer){
      Map.remove(layer)
    }
    Map.layers().map(removeLayersFromMap)  // Map the function to the Map.layers() object
    //Map.addLayer(mySite,{},"site") // Add the new layer to the map
    Map.centerObject(mySite,10)
    //print(mySite)
var geo = mySite
  // Start with a GOES-16 image collection for a date  range
var goes16col = ee.ImageCollection('NOAA/GOES/16/FDCF') 
    .filter(ee.Filter.dayOfYear(0, 365))
    .filterDate('2020-01-01', '2020-09-30')
    .sort('system:time_start', false).limit(6)
//print('goes16col', goes16col)
// Limit the collection to the most recent images [limit(1)].
var image = goes16col.sort('system:time_start', false).limit(1);
var image2 = goes16col.sort('system:time_start', false).limit(2);
var image3 = goes16col.sort('system:time_start', false).limit(3);
var image4 = goes16col.sort('system:time_start', false).limit(4);
var image5 = goes16col.sort('system:time_start', false).limit(5);
var image6 = goes16col.sort('system:time_start', false).limit(6);
////print('Most recent image from past hour: ', image);
//print('Image from 30 minutes ago: ', image3);
var filterDQF = function(image) {
  var line_number = image.select('line_number')
  var DQFinfo = image.select('DQF');
  var DQF_2 = DQFinfo.eq(2)
  var cloud = DQFinfo.updateMask(DQF_2).rename('cloud')
  return image.addBands(cloud)
}
var DQF_cloud = goes16col.map(filterDQF)
//print('DQF cloud', DQF_cloud)
var result = goes16col.map(function(image) {
  var DQF = image.select('DQF', 'Mask') 
  return ee.Feature(null, DQF.reduceRegion({
  geometry: geo,
  reducer: (ee.Reducer.count().group())
  }));
})
//print('result', result)    
var countIndividualImg = function(image) {
  var countObject = image.reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: geo
  });
  return image.set(countObject)
}
var cloud_ind_count = DQF_cloud.map(countIndividualImg)
//print('cloud_ind_count', cloud_ind_count)
var setPropertiesToBand = function(image) {
  var countProperty = image.get('cloud')
  return image.addBands(image.metadata('cloud'))
}
var cloud_ind_count_band = cloud_ind_count.map(setPropertiesToBand) 
//print ('cloud_ind_count_band', cloud_ind_count_band)
var Cloudratio = cloud_ind_count_band.map(function(image) {
  var totalArea = ee.Number(image.get('DQF'));
  var cloudArea = ee.Number(image.get('cloud'))
  var percentC = cloudArea.divide(totalArea);
  return image.set({'percentCloud': percentC});
});
var pctCloudList = Cloudratio.aggregate_array('percentCloud')
//print('Percent Clouds (most recent first)', pctCloudList)
var SysTime = Cloudratio.aggregate_array('system:time_start');
// Create a panel to hold the chart.
var graphPanel = ui.Panel();
graphPanel.style().set({
  height: '315px',
  width: '550px',
  position: 'bottom-left'
});
Map.clear();// This clears drop-down list; remove if manage to clear graph
Map.add(graphPanel);
// Create and print the chart.
var newChart=(ui.Chart.array.values(pctCloudList, 0, SysTime)
//print(ui.Chart.array.values(pctCloudList, 0, SysTime)
  .setSeriesNames(['% Clouds'])
  .setOptions({
      title: 'NEON Site (15km buffer): ' + FBsiteID,
      hAxis: {'title': 'Time'},
      vAxis: {'title': 'Percent Cloud Cover', maxValue: 1, minValue: 0, format: 'percent', gridlines: { count: 5 }},
      height: 280,
      pointSize: 10,
      pointShape: 'triangle',
}));
graphPanel.add(newChart);
// Create a panel to hold the text box.
var textPanel = ui.Panel();
textPanel.style().set({
  width: '370px',
  position: 'top-center'
});
Map.add(textPanel);
// Create and print the text box with "refresh" text
var newText=(ui.Textbox({}, 'Refresh browser window (F5) to select new NEON site', {}, {}, {width:'340px', fontWeight: 'bold'}))
textPanel.add(newText)
//Start image display
var dqf = image.select('DQF');
var dqf_minus20 = image2.select('DQF');
var dqf_minus30 = image3.select('DQF');
var dqf_minus40 = image4.select('DQF');
var dqf_minus50 = image5.select('DQF');
var dqf_minus60 = image6.select('DQF');
var xmin = -142;  // On station as GOES-E
var xmax = xmin + 135;
//Map.setCenter((xmin+xmax)/2, 15, 3);
var geometry = ee.Geometry.Rectangle([xmin, -65, xmax, 65], null, true);
var DQFVis = {
  min: 0,
  max: 5,
  palette: [
    'blanchedalmond',  // Good quality fire pixel
    'olive',           // Good quality fire free land
    'gray',            // Opaque cloud
//    'teal',         // Opaque cloud
                       // Bad surface type, sunglint, LZA threshold exceeded,
    'darkslateblue',   // off earth, or missing input data
    'burlywood',    // Bad input data
//    'lemonchiffon',    // Bad input data
    'burlywood'        // Algorithm failure
  ]};
//Display the last X images in the viewer
Map.addLayer(dqf_minus60, DQFVis, 'Cloud Cover 60 minutes ago', 0);
Map.addLayer(dqf_minus50, DQFVis, 'Cloud Cover 50 minutes ago', 0);
Map.addLayer(dqf_minus40, DQFVis, 'Cloud Cover 40 minutes ago', 0);
Map.addLayer(dqf_minus30, DQFVis, 'Cloud Cover 30 minutes ago', 0);
Map.addLayer(dqf_minus20, DQFVis, 'Cloud Cover 20 minutes ago', 0);
Map.addLayer(dqf, DQFVis, 'Cloud Cover most recent image');
Map.addLayer(mySite.style({width: 3, color: "blue", fillColor: "#00000000"}),{},"Flight Box")
//// Create a legend for the map
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create a legend title
var legendTitle = ui.Label({
  value: 'GOES 16/17',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Create and style one row of the legend
var makeRow = function(color, name) {
      // Create a label that is actually the colored box
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with description text
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with colors
var palette =['808000', '808080', '483D8B', 'DEB887'];
// Legend contents
var legendNames = ['Land','Cloud','Water', 'Bad Data'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], legendNames[i]));
  }  
// add legend to map
Map.add(legend);
// End legend section
}
Map.addLayer(AOPsites.style({width: 3, color: "blue", fillColor: "#00000000"}),{},"AOP P1 Flight Boxes")
Map.centerObject(AOPsites,4)