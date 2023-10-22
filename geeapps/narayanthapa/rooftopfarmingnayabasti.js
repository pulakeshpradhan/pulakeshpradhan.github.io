/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var High = ee.FeatureCollection("users/narayanthapa/High"),
    Low = ee.FeatureCollection("users/narayanthapa/low"),
    Veryhigh = ee.FeatureCollection("users/narayanthapa/Veryhigh"),
    Moderate = ee.FeatureCollection("users/narayanthapa/Moderate");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**** Start of imports. If edited, may not auto-convert in the playground. ****/
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**** Start of imports. If edited, may not auto-convert in the playground. ****/
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("users/narayanthapa/KU"),
    Nayabasti = ee.FeatureCollection("users/narayanthapa/Nayabasti"),
    All_building = ee.FeatureCollection("users/narayanthapa/All_Building"),
    Concrete = ee.FeatureCollection("users/narayanthapa/Building_Concrete"),
    tin = ee.FeatureCollection("users/narayanthapa/Building_tinroof"),
    temporary_house = ee.FeatureCollection("users/narayanthapa/temporary_house"),
    Concrete_tinroof = ee.FeatureCollection("users/narayanthapa/tin_roof"),
    Solar = ee.FeatureCollection("users/narayanthapa/solarpanels"),
    watertanks = ee.FeatureCollection("users/narayanthapa/watertanks"),
    green_roof = ee.FeatureCollection("users/narayanthapa/green_roof");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/************************* Model**************
 * This is the section to define the information about the data present in Map
 * ***********************/
// Color for boundary:
/********************** component section ************************
 * component section to define widgets that will compose app
 * *****************************/
var c={}
// empty panel
c.controlPanel=ui.Panel();
// defining the information
c.info={}
c.info.title=ui.Label("Volunteered GIS in identifying potential of rooftop farming in Nayabasti Banepa");
c.info.author=ui.Label("Reshma Shrestha, Narayan Thapa, Sushma Ghimire, Rehana Shrestha , Sunil Babu Shrestha")
c.info.about=ui.Label("This research aims in identifying the potential area at rooftop farming in Naya Basti Banepa and its methodological implication.     The results of the multi-criteria analysis for rooftop farming suitability revealed interesting findings based on the selected criteria. Among the evaluated rooftop areas, a significant portion, approximately 75.1%, exhibited moderate suitability for rooftop farming. This suggests that these areas possess favorable conditions and potential for successful agricultural activities. Additionally, 14.6% of the rooftop areas were classified as highly suitable, indicating exceptional suitability for rooftop farming. These areas likely fulfilled the criteria of having adequate water facility, a proportionate level of gardening, and a sufficient area for future farming. Conversely, 9.3% of the areas were found to have low suitability, implying potential constraints or limitations for rooftop farming. Notably, a small percentage of 0.9% demonstrated very high suitability, signifying exceptional rooftops that possess outstanding conditions and opportunities for agricultural endeavors. These outcomes highlight the importance of considering multiple criteria in assessing rooftop suitability and provide valuable insights for identifying the most suitable areas for implementing and promoting rooftop farming initiatives.")
c.info.chart_title= ui.Label(" Result of Building");
c.info.building= ui.Label("Total number of building in study area: 1055")
c.info.concrete= ui.Label("Only concrete structure are considered for study as other have no access to roof")
c.info.mixroof=ui.Label("Number of double roof building: 394");
c.info.flatroof=ui.Label("Number of flat roof building: 176");
c.info.greenroof=ui.Label("Number of house doing rooftop farming: 108 ")
c.info.greenroofarea=ui.Label("Area used for rooftop farming: 505.42 square meter")
c.info.estimated=ui.Label("Estimated area for rooftop farming is approximately: 48500 square meter ")
c.info.chart_titles= ui.Label(" Result of Multi-criteria analysis for extract suitable rooftop areas ");
var chart_value = ee.Dictionary({
  Concrete:570,
  CGI:467,
  Temporary:18
})
var chart=ui.Chart.array.values({
  array: chart_value.values(),
  axis: 0,
  xLabels:chart_value.keys()
}).setChartType('PieChart')
.setOptions({
  colors:['#BDB76B',  '#70543e','#D2691E']
});
var building_result = ee.Dictionary({
  VeryHigh:5,
  High:83,
  Moderate:426,
  Low:53
})
var chart_result =ui.Chart.array.values({
  array: building_result.values(),
  axis: 0,
  xLabels:building_result.keys()
}).setChartType('PieChart')
.setOptions({
  colors:['#00FF00','#FFA500','#800000','#008000',]
});
// creating the info panel
c.infoPanel=ui.Panel([c.info.title, c.info.chart_title,c.info.building,chart, c.info.concrete, c.info.mixroof,c.info.flatroof,c.info.greenroof,c.info.greenroofarea,c.info.estimated,c.info.chart_titles, chart_result ]);
// Create a panel and add it to the map.
// defining the default map
ui.root.clear()
c.map=ui.Map();
c.map.setCenter(85.5225,27.6354,15);
c.map.setOptions('TERRAIN')
/*************
// Fetch collection metadata (`.limit(0)`) and apply the
// previously defined function using `evaluate()`. The printed object is a
// dictionary where keys are column names and values are datatypes.
Concrete.properties(0).evaluate(getCols);
var panel = ui.Panel({style: {width: '150px'}})
    .add(ui.Label('Mapping of rooftop farming using Google Earth Engine'));
var label1= ui.Label("Click on the Building");
panel.add(label1);
Map.onClick(function(Concrete) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + Concrete.properties.Area.toFixed(2) + ' ' +
                 'lat: ' 
  panel.widgets().set(1, ui.Label(location));
})
// Chart  section
/*********************** Composition section *******************
 * A section to compose the app add child widgets and widget groups to first level
 * ************
 // clearing the root panel
/********************* Adding to panel
 */
 //Adds a widget to the root panel.
ui.root.add(c.controlPanel);
ui.root.add(c.map);
c.controlPanel.add(c.infoPanel);
//Map.addLayer(image,imageVisParam, "KU")
//Map.centerObject(image)
//var kuVIZ=image.visualize(imageVisParam)
//var ku= ui.Map.Layer(kuVIZ,{},'KU orthophoto');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: Nayabasti,
  color: 'red',
  width: 3
});
var Nayabasti_ADD =ui.Map.Layer(outline,{},'Nayabasti');
//Map.addLayer(outline, {palette: 'FF0000'}, 'edges');
var all_building=ui.Map.Layer(All_building,{
  color: '#FF0000',
  fillColor: '#FF0000'
}, 'All Buildings')
var concrete_building=ui.Map.Layer(Concrete,{
  color: '#70543e',
  fillColor: '#70543e'
}, 'Concrete Buildings')
var tin_building=ui.Map.Layer(tin,{
  color: '#BDB76B',
  fillColor:'#BDB76B'
}, 'Buildings with CGI sheet roof')
var Temporary=ui.Map.Layer(temporary_house,{
  color: '#D2691E',
  fillColor:'#D2691E'
}, 'Temporary House')
var green=ui.Map.Layer(green_roof,{
  color:'#00FF00',
  fillColor:'#00FF00'
}, 'Green roof')
var solar=ui.Map.Layer(Solar,{
  color:'#3859AC',
  fillColor:'#3859AC'
}, 'Solar Panel')
var water=ui.Map.Layer(watertanks,{
  color:'#000000',
  fillColor:'#000000'
}, 'Water tank')
var concrete_tin=ui.Map.Layer(Concrete_tinroof,{
  color:'#FFFFFF',
  fillColor:'#FFFFFF'
}, 'Concrete with CGI sheet')
var veryhig_mul=ui.Map.Layer(Veryhigh,{
  color: '#008000',
  fillColor:'#008000',
}, 'Very High Suitability')
var high_mul=ui.Map.Layer(High,{
  color:'#00FF00',
  fillColor:'#00FF00',
}, 'High Suitability')
var moderate_mul=ui.Map.Layer(Moderate,{
  color:'#800000',
  fillcolor:'#800000',
}, 'Moderate Suitability')
var low_mul=ui.Map.Layer(Low,{
  color:'#FFA500',
  fillColor:'#FFA500'
}, 'Low Suitability')
c.map.layers().set(0,Nayabasti_ADD);
//c.map.layers().set(1,all_building);
c.map.layers().set(2,concrete_building);
c.map.layers().set(3,tin_building);
c.map.layers().set(4,Temporary);
//c.map.layers().set(5,green);
//c.map.layers().set(6,water);
//c.map.layers().set(7, solar);
c.map.layers().set(8,veryhig_mul);
c.map.layers().set(9, high_mul);
c.map.layers().set(10, moderate_mul);
c.map.layers().set(11, low_mul);
/*************Style section*************/
var s={
}
c.info.title.style().set({
  fontSize:'20px',
    fontWeight:'bold'
})
// c.info.author.style().set({
//   fontSize:'18px',
//   fontWeight:'bold',
//   color:'orange'
// })
// c.info.about.style().set({
//   padding:'150px',
//   margin:'150px',
// fontSize:'15px',
//   color:'brown'
// })
c.info.chart_title.style().set({
  fontWeight:'bold'
})
c.info.chart_titles.style().set({
   fontWeight:'bold'
})
c.info.flatroof.style().set({
   fontSize:'15px',
  color:'red'
})
c.info.mixroof.style().set({
   fontSize:'15px',
  color:'red'
})
c.info.greenroof.style().set({
   fontSize:'15px',
  color:'red'
})
c.info.greenroofarea.style().set({
   fontSize:'15px',
  color:'green'
})
c.info.estimated.style().set({
   fontSize:'15px',
  color:'green'
})
c.controlPanel.style().set({
  width:'600px',
  padding: '0px',
})
c.map.style().set({
 //height:'600px'
})
 /**************************** Behaviour section **********************
  * A section to define app behavior on UI activity****************/
/****************** Initialization Section ************************************
A section to initialize the app ****************/