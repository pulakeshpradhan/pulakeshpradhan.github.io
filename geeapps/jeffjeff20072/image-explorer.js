//Which NDVI and EVI would you like to explore?
//!!PLEASE only change values within "".
//What is your study boundary? 
//!!PLEASE only change values within "".
////"ws" below is the boundary of interest for your NDVI/EVI exploration.
////Example below uses the entire Genesee River watershed boundary
////you can change this boundary of your own interest by following instructions
////step1: save your area of interest(s) into a kml file in any GIS software, preferably QGIS
////step2: https://www.google.com/fusiontables/DataSource?dsrcid=implicit
////step3: click on "Choose File" and select your kml file
////step4: once your fusion table is created, find the Id of your table under "File"\"About this table"
////step5: copy and paste yout ID to replace "1RzHp-n_TLDOELvanKZfzcex68wh_lVgp_Czljo65" below
var ws = ee.FeatureCollection("ft:15jhwPxF34vwcrBO0w3gNnegJruAP6NeWdqMHJg_L", 'geometry');
//What statistics of vegetation index would you like to see?
//options: mean, median, max, min, mode and stdDev(standard deviation).
//please change the "median" below to the option you desire.
//ex. if you want mean instead, change below to "var redu = ee.Reducer.mean();"
var redu = ee.Reducer.median();
//What is the scale you would like to explore? 
//NDVI and EVI composites are at 30m spatial resolution.
//Please keep in mind that smaller scales may require longer computation time.
var scale = 30;
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////code below please do not change!!! ONLY change codes  above//////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////watersheds
///var ws = ee.FeatureCollection('ft:1RzHp-n_TLDOELvanKZfzcex68wh_lVgp_Czljo65', 'geometry');
//print(cbs);
//Map.addLayer(ws,{},'all_watesheds',false);
/////////////////////////NDVI
///display NDVI
//var vis = {min: 0, max: 1, palette: ['99c199', '006400']};
//Map.addLayer(ndviL5, vis, 'NDVI');
//ndvi chart by watershed
//print(ws);
//var filter = ee.Filter.eq("LAKEBASIN","Michigan");
////////region varies here!!!!!!!!!!!!!!///////////////////
//var region = ws;
//Map.addLayer(region,{},'study_region');
// var chart2 = ui.Chart.image.series(ndviL51, region, ee.Reducer.sum(), 300);
// print(chart2);
// var chart3 = ui.Chart.image.series(ndviL7, region, ee.Reducer.sum(), 500);
// print(chart3);
// var chart4 = ui.Chart.image.series(ndviL8, region, ee.Reducer.sum(), 500);
// print(chart4);
// set entire panel width
var panel = ui.Panel();
panel.style().set('width', '400px');
//introduction section of Panel
var intro = ui.Panel({
  widgets: [
    ui.Label({
      value: 'NDVI and EVI Explorer',
      style: {fontSize: '20px', fontWeight: 'bold'}
    }),
    ui.Label('Disclaimer: Use at your own risk! Please use this explorer responsibly and input reasonable amount of durations or area of interest.'),
    ui.Label('Please be considerate to other users on earth engine. ex. large study area will consume more resources'),
    ui.Label('If you have any questions, you can contact Jeff at gpu100@syr.edu'),
  ],
  style: {border: "1px solid black", margin: "2px"}
});
panel.add(intro);
ui.root.insert(0, panel)
/*** (lks)  ***/
var collectionLabel = ui.Label("Choose an image collection");  //image collection box label name (should be changed to selection)
//image collection name box input
var collectionBox = ui.Textbox({         
  placeholder: "Image Collection",
  value: "LANDSAT/LT5_L1T_8DAY_NDVI",
  style: {stretch: "horizontal"} //stretch box across
});
var startDateLabel = ui.Label("Start date"); //start date box label name
//start date box input
var startDateBox = ui.Textbox({
  value: "2011-01-01",
  style: {stretch: "horizontal"} //stretch box across
});
var endDateLabel = ui.Label("End date"); //start date box label name
//end date box input
var endDateBox = ui.Textbox({
  value: "2012-01-01",
  style: {stretch: "horizontal"} //stretch box across
});
//build panel to get everything up to this point together: collection, start and end dates, and their label names
var collectionPanel = ui.Panel(
  [collectionLabel, collectionBox, startDateLabel, startDateBox, endDateLabel, endDateBox],
  ui.Panel.Layout.flow("vertical"),
  {border: "1px solid black", margin: "2px", stretch: "horizontal"}); //add style of borders and margins
panel.add(collectionPanel); //panel to add the collection panel
//select to reduce to min or max
var reducerSelectlabel = ui.Label("Which statistics are you looking for?"); //statistics set up input box label
var reducerSelect = ui.Select([{ 
  label: "min",
  value: ee.Reducer.min() //minimum across region
}, {
  label: "max",
  value: ee.Reducer.max() //maximum across region
}, { 
  label: "mean",
  value: ee.Reducer.mean() //average across region
}], "Select the reducer");
var scaleboxlabel = ui.Label("Type in spatial resolution of your choosing"); //scale input box label
var scaleBox = ui.Textbox({placeholder: "Scale", value: 30}); //scale input box
var boundarylabel= ui.Label("Which area are you looking to investigate?"); //boundary or fusion_table input box label
var fcBox = ui.Textbox({placeholder: "Fusion Table Id", value: "1RzHp-n_TLDOELvanKZfzcex68wh_lVgp_Czljo65"})
//continoue to add more components, reducer select, scalebox and area of interest (fusion table ID)
collectionPanel.add(reducerSelectlabel).add(reducerSelect).add(scaleboxlabel).add(scaleBox).add(boundarylabel).add(fcBox); 
var filters = {
  collection: collectionBox,
  startDate: startDateBox,
  endDate: endDateBox,
  reducer: reducerSelect,
  scale: scaleBox,
  fcId: fcBox,
};
var showChartButton = ui.Button("Show chart"); //triger for getting the chart
collectionPanel.add(showChartButton); //add trigger to panel
/////////////////////////////////////////////////////////////////////////////////////To this point
//function to show chart
var showChart = function() {
  var imageCollection = ee.ImageCollection(filters.collection.getValue()); //get image selection
//get duration of interest
 imageCollection = imageCollection.filterDate(
   filters.startDate.getValue(),
   filters.endDate.getValue()
 );
  // Print an NDVI chart.
  var watershed = ee.FeatureCollection("ft:" + filters.fcId.getValue(), 'geometry');
  var chart = ui.Chart.image.series(imageCollection, watershed, filters.reducer.getValue(), filters.scale.getValue());
  chart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  chartPanel.widgets().reset([chart]);
  // Add a red dot to the map where the user clicked.
  Map.clear();
  Map.centerObject(watershed);
  Map.layers().set(1, ui.Map.Layer(watershed, {color: 'FF0000'}).setName('input area'));
};
showChartButton.onClick(showChart);
var chartPanel = ui.Panel();
var chartWrapper = ui.Panel([
  ui.Label({
    value: 'Chart Output will be shown below',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Please click on icon on right corner of chart to zoom in on chart or export data',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })
])
chartWrapper.add(chartPanel);
panel.add(chartWrapper);
/*** (lks)  ***/