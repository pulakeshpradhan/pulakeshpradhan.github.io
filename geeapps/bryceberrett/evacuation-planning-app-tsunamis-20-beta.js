var AreaOfInterest = ui.import && ui.import("AreaOfInterest", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.MultiPoint(),
    Additional_Safe_Areas = ui.import && ui.import("Additional_Safe_Areas", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#1af600",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1af600 */
    /* shown: false */
    ee.FeatureCollection([]),
    Vertical_Evac_Shelters = ui.import && ui.import("Vertical_Evac_Shelters", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection([]),
    roads = ui.import && ui.import("roads", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#f7f500",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f7f500 */
    /* shown: false */
    ee.FeatureCollection([]),
    CustomTerrain1 = ui.import && ui.import("CustomTerrain1", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d606b3",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d606b3 */
    /* shown: false */
    ee.FeatureCollection([]),
    CustomTerrain2 = ui.import && ui.import("CustomTerrain2", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d6ab0d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d6ab0d */
    /* shown: false */
    ee.FeatureCollection([]),
    CustomTerrain3 = ui.import && ui.import("CustomTerrain3", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffb9",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffb9 */
    /* shown: false */
    ee.FeatureCollection([]),
    CustomTerrain4 = ui.import && ui.import("CustomTerrain4", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#0071ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0071ff */
    /* shown: false */
    ee.FeatureCollection([]),
    DontUseWaterArea = ui.import && ui.import("DontUseWaterArea", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#000492",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #000492 */
    /* shown: false */
    ee.FeatureCollection([]),
    DontUseUrbanArea = ui.import && ui.import("DontUseUrbanArea", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#686048",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #686048 */
    /* shown: false */
    ee.FeatureCollection([]),
    DontUseVegitationArea = ui.import && ui.import("DontUseVegitationArea", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#5e9d00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #5e9d00 */
    /* shown: false */
    ee.FeatureCollection([]);
//OSU 2022 notes:
  //Make sure we are using the best DEM data
  //Change cumulative cost colors: ['darkgreen', 'yellow','blue','cyan','brown','blue','white','red','lightgreen','brown','lightgreen','purple','darkorange','black']
  //Want to be able to export geometries as shapefiles. Export roads and contours most of all.
  //Find automated way to deliniate watersheds/path from contours 
  //Add options to turn contour maker on or off or change the time of contours. (nonessential)
  //Reorder drawing layers
  //Fix the selection problem
  //Check the population unable to evacuate tab (or get rid of this section)
//Code for new landcover dataset
  // var dataset = ee.ImageCollection("ESA/WorldCover/v100").first();
  // var visualization = {
  //   bands: ['Map'],
  // };
  // Map.centerObject(dataset);
  // Map.addLayer(dataset, visualization, "Landcover");
//New things to fix: New
//ZAC
  // ability to save settings and export final rasters.
  // Some kind of hovertext or clickable ‘?’ for each of the parameters that gives a little paragraph explaining what it is. For example, something explaining to a layperson what “response time” means.
  // Once the program is all done, we should add link at the top to download a PDF in both English and Indonesian that explains how to run the program step by step and what all the settings mean.
  // A key for the evacuation color map.
  // I think it’d be nice to file all the more niche settings (like the vegetation difficulty rating, etc etc) under an “advanced” tab so people aren’t overwhelmed with settings when they first open the app.
      // Brierton’s thoughts:
  // He got roped into messing with the sidebar values a lot before realizing that it still runs even with the default values (even if it’s not completely accurate for your location).
  // He would get an error if he pushed “run” before selecting an area of interest. It would be nice for it to refuse to let you run without picking an area of interest.
      // Ron’s thoughts:
  // He had issues displaying the UI properly on a phone screen. (I understand this might not be feasible or worth the time to code for a phone)
  // Thoughts discussed in class:
  // Add polygon options for “known safe locations” and “known unsafe locations” - the latter would let you manually filter out any errors in the DEM.
  // A more descriptive name for “user geometries” might be something like “custom terrain”.
//Bryce
      // Not essential. The layers do that.        // A display box that tells you the program is running (the map is loading) after you click “run” and before it’s fully loaded.
//Make code so that on changing either the dropdown menu or layer, the default draw tool is selected
  //AKA: AOI is Rectangle, Vertical Evac is a point, roads are polylines, and everything else polygons
//Try and make it so that when the layer is selected (.get(1)) using that code 
  //(selects the first layer [AOI in this case], .get(2) selects the second)
  //Maybe there is a booleon "True" or "False" for the user geometry attribute that does that.
  //Or maybe it is when .get(layer).ondraw() then Update _layer_
// Create download option for custom made geometries (roads especially)
//Find a way for the user to upload geometry files. (That way if they download and save roads, they can log in and upload it back to save)
  //Maybe the version of the app you sign into has the ability to save progress. In this case, these two steps would not be needed
//Create Least Cost Path algorithm for the route from one destination to any destination of safety
  //Maybe can use the python part of EE to do it. May have to code it from scratch.
/// Fix the always on check to current layer
// Make mobile friendly using code in example.
Map.setCenter(190, 10, 3); // Center on Indonesia
//Map.setCenter(110.706194, -8.754795, 6); // Center on Indonesia
Map.setOptions("HYBRID");
Map.drawingTools().setLinked(true);
//Used previously. Will start the app ready to draw. Confusing for first time users who don't know to pan with middle mouse button.
//Map.drawingTools().setShape('rectangle');
// Enter drawing mode.
///////////////////////////////////////////////////////////////
///This gives the variable somthing to start out with. Without something, it will fail if the user doesn't add anything.
//Idealy we would find a way to make this work without there being a point floating off the coast of Africa
var usergeometry = ee.Geometry.Point(0,0);
var userVEvac = ee.Geometry.Point(0,0);
var userRoads = ee.Geometry.Point(0,0);
var userGeo1 = ee.Geometry.Point(0,0);
var userGeo2 = ee.Geometry.Point(0,0);
var userGeo3 = ee.Geometry.Point(0,0);
var userGeo4 = ee.Geometry.Point(0,0);
var userNoWat = ee.Geometry.Point(0,0);
var userNoUrb = ee.Geometry.Point(0,0);
var userNoVeg = ee.Geometry.Point(0,0);
var userNoRoads = ee.Geometry.Point(0,0);
// This variable gets changed when the "Select" UI element gets
// changed, allowing the user to choose which variable to merge
var mergeLayer = "AreaOfInterest";
var drawingTools = Map.drawingTools();
// drawingTools.layers().get(0).onDraw()
//Attempt to change a layer based off of selection. Selection does not work.
// drawingTools.layers().get(0))
// (function (geometry) {
//       AreaOfInterest = drawingTools.layers().get(0).toGeometry();
// });
drawingTools.onLayerSelect(function (layer, widget) {mergeLayer = (layer.get('name'))});
//Code to make the draw type (rec, polygon, etc) change when selected. 
//Works but but blocks being able to grab and edit geometries. Script error
  // Map.drawingTools().onLayerSelect(function (geometry) {
  //   // Do something with the geometry
  //   switch(mergeLayer){
  //     case "AreaOfInterest":
  //     Map.drawingTools().setShape('rectangle');
  //       break;
  //     //Edits for updating when being run
  //     case "Additional_Safe_Areas":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "Vertical_Evac_Shelters":
  //   Map.drawingTools().setShape('point');
  //       break;
  //     case "roads":
  //   Map.drawingTools().setShape('line');
  //       break;
  //     case "CustomTerrain1":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "CustomTerrain2":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "CustomTerrain3":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "CustomTerrain4":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "DontUseWaterArea":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "DontUseUrbanArea":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //     case "DontUseVegitationArea":
  //   Map.drawingTools().setShape('polygon');
  //       break;
  //   }
  // });
Map.drawingTools().onDraw(function (geometry) {
  // Do something with the geometry
  switch(mergeLayer){
    case "AreaOfInterest":
      AreaOfInterest = drawingTools.layers().get(0).toGeometry();
      // console.log("Area of Interest Updated");
      // print(AreaOfInterest, 'Area of Interest');
      break;
    //Edits for updating when being run
    case "Additional_Safe_Areas":
      usergeometry = drawingTools.layers().get(1).toGeometry();
      break;
    case "Vertical_Evac_Shelters":
      userVEvac = drawingTools.layers().get(2).toGeometry();
      break;
    case "roads":
      userRoads = drawingTools.layers().get(3).toGeometry();
      break;
    case "CustomTerrain1":
      userGeo1 = drawingTools.layers().get(4).toGeometry();
      break;
    case "CustomTerrain2":
      userGeo2 = drawingTools.layers().get(5).toGeometry();
      break;
    case "CustomTerrain3":
      userGeo3 = drawingTools.layers().get(6).toGeometry();
      break;
    case "CustomTerrain4":
      userGeo4 = drawingTools.layers().get(7).toGeometry();
      break;
     case "DontUseWaterArea":
      userNoWat = drawingTools.layers().get(8).toGeometry();
      break;
    case "DontUseUrbanArea":
      userNoUrb = drawingTools.layers().get(9).toGeometry();
      break;
    case "DontUseVegitationArea":
      userNoVeg = drawingTools.layers().get(10).toGeometry();
      break;
   case "DontUseRoadsArea":
      userNoRoads = drawingTools.layers().get(11).toGeometry();
      break;
  }
});
//What to have happen when you edit:
Map.drawingTools().onEdit(function (geometry) {
  // This updates the geometry whenever an edit happens
  switch(mergeLayer){
    case "AreaOfInterest":
      AreaOfInterest = drawingTools.layers().get(0).toGeometry();
      // console.log("Area of Interest Updated");
      // print(AreaOfInterest, 'Area of Interest');
      break;
    //Edits for updating when being run
    case "Additional_Safe_Areas":
      usergeometry = drawingTools.layers().get(1).toGeometry();
      break;
    case "Vertical_Evac_Shelters":
      userVEvac = drawingTools.layers().get(2).toGeometry();
      break;
    case "roads":
      userRoads = drawingTools.layers().get(3).toGeometry();
      break;
    case "CustomTerrain1":
      userGeo1 = drawingTools.layers().get(4).toGeometry();
      break;
    case "CustomTerrain2":
      userGeo2 = drawingTools.layers().get(5).toGeometry();
      break;
    case "CustomTerrain3":
      userGeo3 = drawingTools.layers().get(6).toGeometry();
      break;
    case "CustomTerrain4":
      userGeo4 = drawingTools.layers().get(7).toGeometry();
      break;
     case "DontUseWaterArea":
      userNoWat = drawingTools.layers().get(8).toGeometry();
      break;
    case "DontUseUrbanArea":
      userNoUrb = drawingTools.layers().get(9).toGeometry();
      break;
    case "DontUseVegitationArea":
      userNoVeg = drawingTools.layers().get(10).toGeometry();
      break;
    case "DontUseRoadsArea":
      userNoRoads = drawingTools.layers().get(11).toGeometry();
      break;
  }
});
//What to have happen when you erase:
Map.drawingTools().onErase(function (geometry) {
  // This updates the geometry whenever an erase happens
  switch(mergeLayer){
    case "AreaOfInterest":
      AreaOfInterest = drawingTools.layers().get(0).toGeometry();
      // console.log("Area of Interest Updated");
      // print(AreaOfInterest, 'Area of Interest');
      break;
    //Edits for updating when being run
    case "Additional_Safe_Areas":
      usergeometry = drawingTools.layers().get(1).toGeometry();
      break;
    case "Vertical_Evac_Shelters":
      userVEvac = drawingTools.layers().get(2).toGeometry();
      break;
    case "roads":
      userRoads = drawingTools.layers().get(3).toGeometry();
      break;
    case "CustomTerrain1":
      userGeo1 = drawingTools.layers().get(4).toGeometry();
      break;
    case "CustomTerrain2":
      userGeo2 = drawingTools.layers().get(5).toGeometry();
      break;
    case "CustomTerrain3":
      userGeo3 = drawingTools.layers().get(6).toGeometry();
      break;
    case "CustomTerrain4":
      userGeo4 = drawingTools.layers().get(7).toGeometry();
      break;
     case "DontUseWaterArea":
      userNoWat = drawingTools.layers().get(8).toGeometry();
      break;
    case "DontUseUrbanArea":
      userNoUrb = drawingTools.layers().get(9).toGeometry();
      break;
    case "DontUseVegitationArea":
      userNoVeg = drawingTools.layers().get(10).toGeometry();
      break;
    case "DontUseRoadsArea":
      userNoRoads = drawingTools.layers().get(11).toGeometry();
      break;
  }
});
//This is where the default terrain values come from. Inverse because of math.
  // Land cover class	Terrain energy coefficient categories (Soule & Goldman, 1972)	Speed conservation value (SCV)
  // Water		No Dataa
  // Buildings and fences		No Data
  // Impervious	Asphalt	1.0000
  // Grass	Dirt Road	0.9091 
  // Dirt/Gravel	Dirt Road	0.9091
  // Light Brush	Light Brush	0.8333
  // Heavy Brush	Heavy Brush	0.6667
  // Wetlands	Swampy Bog	0.5556
  // Sand	Hard Sand	0.5556
  // Shore	Hard Sand	0.5556
//Set up variables used in app input
var showEvacuationArea = false;
var EvacElev = 20;
var arrivalTimeM = 30;
var reacTimeM = 10;
var walkingSpeed = 1.1; // Aligns with difficulty values. May need to change difficulties if this is changed to align better with Soule (1972) & Schmidtlein (2015).
var slopeValue1 = 1;
var slopeValue2 = 1.765;
var slopeValue3 = 2.22;
var slopeValue4 = 2.857;
var slopeValue5 = 4;
var slopeValue6 = 6.67;
var slopeValue7 = 7.69;
var slopeValue8 = 8.33;
var slopeValue9 = 0;
var monthsBackImages = 12;
var roadsvalue = 1;
var watervalue = 0; //'Water value for cost raster'
var urbanvalue = 10; //'Urban value for cost raster'
var NDVIvalue = 3; //'NDVI value for cost raster'
var NDWIcuttoff = -0.1;
var UIcuttoff = -0.1;
var NDVIcuttoff = 0.5;
//var nonroad = 1.2;
var showEvacPop = false;
var showUnablePop = false;
var showSentinel2Image = false;
var showRoads = false;
var USRoads = true;
var showWater = false;
var showUrban = false;
var showVegetation = false;
var treeCover = 1.5; //Based on Heavy brush from Soule (1972) & Schmidtlein (2015)
var shrubland = 1.2; //Based on Light brush from Soule (1972) & Schmidtlein (2015)
var grassland = 1.2; //Based on Light brush from Soule (1972) & Schmidtlein (2015)
var cropland = 1.5; //Based on Heavy brush from Soule (1972) & Schmidtlein (2015)
var buildup = 0;
var bareSparseVeg = 2.1; //Based on Loose Sand from Soule (1972) & Schmidtlein (2015) Could also be similar to dirt roads though.
var snowAndIce = 2;
var PermanentWaterBodies = 0;
var herbaceousWetland = 1.8; //Based on Swampy Bog/Wetlands from Soule (1972) & Schmidtlein (2015)
var mangroves = 1.8; //Based on Swampy Bog/Wetlands from Soule (1972) & Schmidtlein (2015)
var mossAndLichen = 1;
var useLandcover = true;
var landcoverShow = true;
var showLandcoverWeight = true;
var useIndex = false;
var userGeo1Name = "";
var userGeo2Name = "";
var userGeo3Name = "";
var userGeo4Name = "";
var userGeo1Difficulty = 1;
var userGeo2Difficulty = 1;
var userGeo3Difficulty = 1;
var userGeo4Difficulty = 1;
var evacTime = 0;
var legend = null;
var infoDes = {fontSize: '12px', color: 'blue'};
var pixelSize = 10;
// AreaOfInterest = layers.add(AreaOfInterest)
function run(){
// Update AdditionalSafeAreas
      var userFeature = ee.Feature(usergeometry,{value: 1});
      var userFeatureCollection  = ee.FeatureCollection(userFeature);
      Additional_Safe_Areas = userFeatureCollection.set('value', 1);
//       // console.log("Additional Safe Areas Updated");
//       // print(Additional_Safe_Areas, 'Additional Safe Areas');
// Update VertEvacShelters
      var userVEvacFeature = ee.Feature(userVEvac,{value: 1});
      var VEvacFeatureCollection = ee.FeatureCollection(userVEvacFeature);
      Vertical_Evac_Shelters = VEvacFeatureCollection.set('value', 1);
      // print(Vertical_Evac_Shelters, 'Vertical_Evac_Shelters');
      // console.log("Vertical_Evac_Shelters Updated");
// Update Roads
      var userRoadsFeature = ee.Feature(userRoads,{value: 1});
      var roadsFeatureCollection = ee.FeatureCollection(userRoadsFeature);
      roads = roadsFeatureCollection.set('value', 1);
      // print(roads, 'roads');
      // console.log("Roads Updated");
// Update User Geometry 1
      var userGeo1Feature = ee.Feature(userGeo1,{value: 1});
      var userGeo1FeatureCollection = ee.FeatureCollection(userGeo1Feature);
      CustomTerrain1 = userGeo1FeatureCollection.set('value', 1);
      // print(CustomTerrain1, 'CustomTerrain1');
      // console.log("CustomTerrain1 Updated");
// Update User Geometry 2
      var userGeo2Feature = ee.Feature(userGeo2,{value: 1});
      var userGeo2FeatureCollection = ee.FeatureCollection(userGeo2Feature);
      CustomTerrain2 = userGeo2FeatureCollection.set('value', 1);
      // print(CustomTerrain2, 'CustomTerrain2');
      // console.log("CustomTerrain2 Updated");
// Update User Geometry 3
      var userGeo3Feature = ee.Feature(userGeo3,{value: 1});
      var userGeo3FeatureCollection = ee.FeatureCollection(userGeo3Feature);
      CustomTerrain3 = userGeo3FeatureCollection.set('value', 1);
      // print(CustomTerrain3, 'CustomTerrain3');
      // console.log("CustomTerrain3 Updated");
// Update User Geometry 4
      var userGeo4Feature = ee.Feature(userGeo4,{value: 1});
      var userGeo4FeatureCollection = ee.FeatureCollection(userGeo4Feature);
     CustomTerrain4 = userGeo4FeatureCollection.set('value', 1);
      // print(CustomTerrain4, 'CustomTerrain4');
      // console.log("CustomTerrain4 Updated");
// Update No Water Area
      var userNoWatFeature = ee.Feature(userNoWat,{value: 1});
      var userNoWatFeatureCollection = ee.FeatureCollection(userNoWatFeature);
      DontUseWaterArea = userNoWatFeatureCollection.set('value', 1);
      // print(DontUseWaterArea, 'Dont Use Water Area');
      // console.log("Dont Use Water Area Updated");
// Update No Urban Area
      var userNoUrbFeature = ee.Feature(userNoUrb,{value: 1});
      var userNoUrbFeatureCollection = ee.FeatureCollection(userNoUrbFeature);
      DontUseUrbanArea = userNoUrbFeatureCollection.set('value', 1);
      // print(DontUseUrbanArea, 'Dont Use Urban Area');
      // console.log("Dont Use Urban Area Updated");
// Update No Vegitation Area
      var userNoVegFeature = ee.Feature(userNoVeg,{value: 1});
      var userNoVegFeatureCollection = ee.FeatureCollection(userNoVegFeature);
      DontUseVegitationArea =  userNoVegFeatureCollection.set('value', 1);
      // print(DontUseVegitationArea, 'Dont Use Vegitation Area');
      // console.log("Dont Use Vegitation Area Updated");
// Update No Roads Area
      var userNoRoadsFeature = ee.Feature(userNoRoads,{value: 1});
      var userNoRoadsFeatureCollection = ee.FeatureCollection(userNoRoadsFeature);
      var DontUseRoadsArea =  userNoRoadsFeatureCollection.set('value', 1);
      // print(DontUseRoadsArea, 'Dont Use Roads Area');
      // console.log("Dont Use Roads Area Updated");
///////////////
  print(AreaOfInterest, 'area of interest');
  // Delete all the layers that currently exist
  Map.clear();
  var txtBox = ui.Textbox({
    // value: Today, // will be set later, in a callback
    style: {width : '90px'},
    onChange: function(text) {
      var period_former_end = text;
    }
  });
  var eeNow = ee.Date(Date.now());
  // print(txtBox);
  var imageBegin = eeNow.advance(-monthsBackImages, 'month');
  imageBegin.format('YYYY-MM-dd').evaluate(function(dateStr){
    txtBox.setValue(dateStr);
  });
  // Prints the date they start taking the median of the data (up to current date) in a textbox
  print('Sentinel2 median data taken from ', txtBox, 'to the current date. A period of', monthsBackImages, 'months total');
    //These variables should be tied to the interface for the user to input
    // Travel times:
      // Most place impaired or conservitive travel times at .89 m/s
      // If each of our pixels are 10 m in length, then traveling along one would take (10m/.89(m/s) = 
      // 11.236 seconds. That is 11.24 sec per pixel on flat road ground. That is the base.
        // (If using a less conservitive 1.1 m/s, then the time would be 9.09 s/pixel)
      var pixelSpeed = ee.Number(pixelSize).divide(walkingSpeed);
      var mCrossSpeed = ee.Number(1).divide(walkingSpeed);
      var arrivalTime = ee.Number(arrivalTimeM).multiply(60); // Currently in sec. User input //This is the time in seconds it takes for the tsunami to come
      var reacTime = ee.Number(reacTimeM).multiply(60); // Currently in sec. User input but with default (5-20 min) // time in seconds to begin to evacuate
      var evacTime = ee.Number(arrivalTime).subtract(reacTime);
    print("Evacuation Time: ", ee.Number(evacTime).divide(60), "Minutes");
      /// If the user puts 1 as the value for the type of data, it will make it multiply by one and not be used in the analysis
    //These values will have a prefered default that is a fraction of the normal walking speed
    //see journal papers to determine walking speed with raster (10m) resolution to determine m/s velocity
      // // making nonroad "0" makes the analysis only use roads for evacuation
      // var userFeature1Name = 'User Feature 1'; //name for the user1 raster to be identified as
      // var user1value = CustomTerrain1.aggregate_array('value').get(0); print(userFeature1Name,' Value = ', user1value);// ee.Number; //'user1 value for cost raster' // Must change in geometry. This just sets visibility
      // //Setting this value in the geometry to 0 will cut out the area or make it unpassable
      // var userFeature2Name = 'User Feature 2'; //name for the user2 raster to be identified as
      // var user2value = CustomTerrain2.aggregate_array('value').get(0); print(userFeature2Name,' Value = ', user1value); //'user2 value for cost raster'
      // var userFeature3Name = 'User Feature 3';  //name for the user3 raster to be identified as
      // var user3value = CustomTerrain3.aggregate_array('value').get(0); print(userFeature3Name,' Value = ', user1value); //'user3 value for cost raster'
      // var userFeature4Name = 'User Feature 4' ; //name for the user4 raster to be identified as
      // var user4value = CustomTerrain4.aggregate_array('value').get(0); print(userFeature4Name,' Value = ', user1value); //'user4 value for cost raster'
    //These are the three options for the evac area (where to evacuate out of). 
      //Any they choose to use (draw, upload, elevation) will be added together.
        var EvacAreaDraw = "This will be made from drawing on the map, Vertical Evac Shelters can do share this";
        var EvacAreaUpload = 'This will be an uploaded file';
        // Code for Evacuation DEM area option
        var USGS10mDEM = ee.Image("USGS/3DEP/10m").clip(AreaOfInterest);
        var GlobalDEM = ee.Image("USGS/SRTMGL1_003").unmask(0).clip(AreaOfInterest);
        var DEM = GlobalDEM.where(USGS10mDEM.gt(-99999).and(USGS10mDEM.lte(9999999999)), USGS10mDEM)
        //Map.addLayer(USGS10mDEM,{},'USGS/3DEP/10m');
        // Map.addLayer(DEM,{min: 0, max: 500,   palette: [
        // '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
        // 'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
        // '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f']}, 'DEM');
        // var DEM = DEMdataset.select('AVE_DSM')
        // print(DEM, "DEM")
      //These area a few DEM options if ours isn't working well
        // ee.Image("MERIT/DEM/v1_0_3")
          //Decide between these two below
        // ee.Image("JAXA/ALOS/AW3D30/V2_2")
        // ee.Image("USGS/SRTMGL1_003")
          var visualization = {
            bands: ['dem'],
            min: -3,
            max: 30,
            palette: ['000000', '478FCD', '86C58E', 'AFC35E', '8F7131',
                     'B78D4F', 'E2B8A6', 'FFFFFF']
          };
          // Map.addLayer(DEM, visualization, "Elevation");e
              var EvacDEM = ee.Image(1)
              .where(DEM.gt(-1000).and(DEM.lte(EvacElev )), 0)
              .where(DEM.gt(EvacElev ).and(DEM.lte(100000)), 1); //Make sure the value of the high ground is what the evacuation algorithm wants
      // Map.addLayer(EvacDEM.clip(AreaOfInterest),{},'Elevation Evacuation Destination');
  // Make an image out of geometry. This takes the layer and makes it into a 1 raster
        var verticalEvacuation = Vertical_Evac_Shelters
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    var verticalEvacuation = verticalEvacuation.unmask(0);
  // Map.addLayer(verticalEvacuation.clip(AreaOfInterest),{min: 0, max: 1},'Vertical Evacuation Location Raster');
  ///////////////////////////////////
  //Create the safe area the user defines
        var additionalSafeAreasA = Additional_Safe_Areas 
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    var additionalSafeAreas = additionalSafeAreasA.unmask(0);
    // Map.addLayer(additionalSafeAreasA, {},'Additional_Safe_Areas');
  // Map.addLayer(additionalSafeAreas.clip(AreaOfInterest),{min: 0, max: 1},'Additional Safe Areas Raster');
  var Safe_Areas = EvacDEM.select('constant').add(additionalSafeAreas.select('first')).add(verticalEvacuation.select('first'));
  var Safe_Areas = ee.Image(1)
              .where(Safe_Areas.gt(-1).and(Safe_Areas.lte(0)), 0)
              .where(Safe_Areas.gt(.5).and(Safe_Areas.lte(5)), 1)
              .clip(AreaOfInterest);
            if(showEvacuationArea){
               Map.addLayer(Safe_Areas,{min: 0, max: 1, opacity: 0.7},'Evacuation Destination');  // Checkbox
            }
    // Checkbox
  var safeAreaInverse = ee.Image(1)
              .where(Safe_Areas.gt(.5).and(Safe_Areas.lte(1)), 0)
              .where(Safe_Areas.gt(-1).and(Safe_Areas.lte(.4)), 1)
              .clip(AreaOfInterest)
              ;
  // Map.addLayer(safeAreaInverse,{max: 1, min: 0},'Safe Areas Inverse')
  var safeAreasInt = Safe_Areas.mask(safeAreaInverse).toInt().clip(AreaOfInterest)
  // Map.addLayer(safeAreasInt,{max: 1, min: 0},'Safe Areas Interger');d
  var safeAreasPoly = safeAreasInt.reduceToVectors({
    // geometry: AreaOfInterest,
    crs: DEM.projection(),
    scale: 30,
    geometryType: 'polygon',
    eightConnected: false,
    bestEffort: true,
    tileScale: 4,
    // labelProperty: ,
    // reducer: ee.Reducer.mean()
  });
  // Map.addLayer(safeAreasPoly,{},'SafeAreasPolygon');
  ////////////////////////////////////////////////////////////////////////////////////
  //Slope
  var slope = ee.Terrain.slope(DEM);
    var slopeMask = ee.Image(1)
              .where(slope.gt(0).and(slope.lte(6)), slopeValue1)
              .where(slope.gt(6).and(slope.lte(12)), slopeValue2)
              .where(slope.gt(12).and(slope.lte(18)), slopeValue3)
              .where(slope.gt(18).and(slope.lte(24)), slopeValue4)
              .where(slope.gt(24).and(slope.lte(30)), slopeValue5)
              .where(slope.gt(30).and(slope.lte(36)), slopeValue6)            
              .where(slope.gt(36).and(slope.lte(42)), slopeValue7)
              .where(slope.gt(42).and(slope.lte(45)), slopeValue8)
              .where(slope.gt(45).and(slope.lte(90)), slopeValue9)
              ;
    var weightedSlope = ee.Image(1)
              .where(slope.gt(0).and(slope.lte(6)), slopeValue1)
              .where(slope.gt(6).and(slope.lte(12)), slopeValue2)
              .where(slope.gt(12).and(slope.lte(18)), slopeValue3)
              .where(slope.gt(18).and(slope.lte(24)), slopeValue4)
              .where(slope.gt(24).and(slope.lte(30)), slopeValue5)
              .where(slope.gt(30).and(slope.lte(36)), slopeValue6)            
              .where(slope.gt(36).and(slope.lte(42)), slopeValue7)
              .where(slope.gt(42).and(slope.lte(45)), slopeValue8)
              .where(slope.gt(45).and(slope.lte(90)), slopeValue9)
              ;
    var weightedSlope = weightedSlope.mask(slopeMask)       
  // Map.addLayer(weightedSlope.clip(AreaOfInterest),{},'Weighted Slope'); // Checkbox
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  //Inport Imagery to be used
  //Note for improvement: What if we can mask out clouds before making the mean? It would give a better mean without clouds 
    //Improvement maybe not needed
  function maskCloudAndShadows(image) {
    var cloudProb = image.select('MSK_CLDPRB');
    var snowProb = image.select('MSK_SNWPRB');
    var cloud = cloudProb.lt(5);
    var snow = snowProb.lt(3);
    var scl = image.select('SCL'); 
    var shadow = scl.eq(3); // 3 = cloud shadow
    var cirrus = scl.eq(10); // 10 = cirrus
    // Cloud probability less than 5% or cloud shadow classification
    var mask = (cloud.and(snow)).and(cirrus.neq(1)).and(shadow.neq(1));
    return image.updateMask(mask);
  }
  //Imagery to be used
    var Sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR')
                    .filterBounds(AreaOfInterest)//takes images intersecting with the area of interest
                    .filterDate(imageBegin, '2100-12-31')//Calculated to begin a certain number of months before the current date
                    .sort('CLOUDY_PIXEL_PERCENTAGE') // Really only useful if using one image
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) // Only uses images with 20-0% clouds
                    .map(maskCloudAndShadows) //Mask out clouds
                    .median() // Seems best. Uses the median of all photos
                    .clip(AreaOfInterest) //Clips to the area of interest
  ;
  // var Sentinel2Projection = Sentinel2.projection();
  // print('Sentinel2 projection:', Sentinel2Projection); // To check projection if needed
  //This is just to get the number of images used to make median (and see if the months should be increased) Copied from above without median
    var Sentinel2a = ee.ImageCollection('COPERNICUS/S2_SR')
                    .filterBounds(AreaOfInterest)//geometry should be "Area of Interest"
                    .filterDate(imageBegin, '2100-12-31')//It would be good to get code that puts in the current date as the hend bound
                    .sort('CLOUDY_PIXEL_PERCENTAGE')
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));
  print('# of Sentinel2 images used in Collection = ', Sentinel2a.size())
  // print(Sentinel2a);
        var minMax = ee.Dictionary({
            maxVal: 2000
          });
          minMax.evaluate(function(dict) {
            var vizParams = {
              max: dict.maxVal, 
              min: 0,
              bands: ['B4', 'B3', 'B2']
              // min: nonroad
              // palette: ['blue','green','Yellow','red']
            };
            if(showSentinel2Image){
               Map.addLayer(Sentinel2, vizParams, 'Sentinel2');  // Checkbox
            }
          });
    // Map.addLayer(Sentinel2, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Sentinel2');
  // var Sentinel2 = Sentinel2a.map(function(image) { return image.clip(AreaOfInterest) }); // Checkbox
///////////////////////////////////////////////////////////////////////////////////
//US Tiger Roads dataset
//Import Tiger Roads and set new property "value" to be equal to 1
  var tigerRoads = ee.FeatureCollection('TIGER/2016/Roads').filterBounds(AreaOfInterest).map(function(feat){
      return feat.set('value', 1)});
  //user drawn road merge with Tiger dataset
// var combinedRoads = ee.Algorithms.If(USRoads, tigerRoads.merge(roads), roads);
// print(combinedRoads);
// print(roads);
  var combinedRoads = roads;
  if(USRoads){
              combinedRoads = tigerRoads.merge(roads);  // Checkbox
            }
  // if(USRoads){    
  // var combinedRoads = tigerRoads.merge(roads);}
  //Map.addLayer(combinedRoads,{color: 'red', width: 1},'Combined Roads');
    //This is a user drawn featurecollection selected to not use Roads
          var noRoads = DontUseRoadsArea 
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
     //Map.addLayer(noRoads,{},'User defined No Roads')
        // Make an image out of geometry.
        var roadsraster = combinedRoads
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
        var adjRoadsRaster = roadsraster.where(noRoads.gt(-1000).and(noRoads.lte(1000)),0);
        //print(combinedRoads);
//Map.addLayer(roadsraster.clip(AreaOfInterest), {min : 1, max : nonroad},'Roads Raster before resample');
  //Make the areas that are not roads 0 to subtract from other layers
        var minusroads = roadsraster.unmask(0);
        // Map.addLayer(minusroads.clip(AreaOfInterest), {}, 'minusroads');
        //Currently makes the whole base raster ones. Roads are identified because they are cut out of the other layers from minusroads. All areas not classified will have a 1 base (like roads)
    var roadsReclass = ee.Image(1)
      .where(roadsraster.gt(0.999).and(roadsraster.lte(1.0001)), roadsvalue)
      //.where(roadsrasterTiger.gt(0).and(roadsrasterTiger.lte(1)), roadsvalue)
      ;
//Map.addLayer(roadsReclass.clip(AreaOfInterest), {max:roadsvalue, min: 0, palette: ['black','white']}, 'Roads Reclass');
        // //Make the areas not roads become the default background difficulty
        // var roadsfinal = roadsReclass.unmask(nonroad);
        //Makes it so that if roads are 0, they are cut out/ not able to be crossed
        var roadsfinal = roadsReclass.mask(roadsReclass)
            // Display image
              var minMax = ee.Dictionary({
            // maxVal: nonroad,
            minVal: roadsvalue
          });
          minMax.evaluate(function(dict) {
            var vizParams = {
              max: dict.maxVal, 
              min: dict.minVal,
              // min: nonroads
              palette: ['Yellow']
            };
            if(showRoads){
              Map.addLayer(roadsraster.clip(AreaOfInterest), vizParams, 'Roads');  // Checkbox
            }
          });
  //////
    // // // If the user can define the value of the drawn geometry, skip this part. If not, and it is one, do this. Broken, needs fixing
    //     var roadsfinal = ee.Image(1)
    //         .where(roadsraster.gt(-9999).and(roadsraster.lte(-9999)), 1)
    //         .where(roadsraster.gt(1).and(roadsraster.lte(1)), roadsvalue);
    //     Map.addLayer(roadsfinal, {}, 'roads')
  ////////////////////////////////////////////////////////////////////////////////////
  //NDWI index (water)
    //This is a user drawn featurecollection selected to not use the water index
          var noWater = DontUseWaterArea 
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    // Map.addLayer(noWater,{},'User defined No Water')
    //Makes the NDWI water layer out of the Sentinel one
    var NDWI = Sentinel2.normalizedDifference(['B3', 'B8']).rename('ndwi');
      //Map.addLayer(NDWI,{},'NDWI');
      var waterweight = ee.Image(1)
              // .mask(noWater)
              .where(NDWI.gt(-1).and(NDWI.lte(NDWIcuttoff)), 0)
              .where(NDWI.gt(NDWIcuttoff).and(NDWI.lte(1)), 1)
              .where(noWater.gt(-1000).and(noWater.lte(1000)),0)
              ;
       //Map.addLayer(waterweight,{}, 'Water Bodies Reclassified');
    var waterMask = ee.Image(1)
              .where(waterweight.gt(0).and(waterweight.lte(0)), 1)
              .where(waterweight.gt(0.9).and(waterweight.lte(1.1)), watervalue)
              .where(roadsraster.gt(0.9).and(roadsraster.lte(1.1)), roadsvalue); // This adds in the roads so that if there is a water body that has a bridge, the roads will still be taken into account.
    var waterfinal = ee.Image(1)
              .where(waterweight.gt(0).and(waterweight.lte(0)), 1)
              .where(waterweight.gt(0.9).and(waterweight.lte(1.1)), watervalue)
              .where(roadsraster.gt(0.9).and(roadsraster.lte(1.1)), roadsvalue) // This adds in the roads so that if there is a water body that has a bridge, the roads will still be taken into account.
              ;
    var waterfinal = waterfinal.mask(waterMask);
    if(showWater){
      Map.addLayer(waterfinal.clip(AreaOfInterest),{}, 'Water Bodies Final Reclass');  // Checkbox
    }
  //////////////////////////////////////////////////////////////////////////////////////////
  //UI
    //This is a user drawn featurecollection selected to not use the UI index
          var noUI = DontUseUrbanArea 
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    // Map.addLayer(noUI,{},'User defined No UI')
  //Creates the Urban Area from Sentinel 2
  var UI = Sentinel2.normalizedDifference(['B12', 'B8']).rename('UI');
    // Map.addLayer(UI,{},'UI');
    var UIweight = ee.Image(1)
            .where(UI.gt(-1).and(UI.lte(UIcuttoff)), 0)
            .where(UI.gt(UIcuttoff).and(UI.lte(1)), 1)
            .where(noUI.gt(-1000).and(noUI.lte(1000)),0)
            ;
     //Map.addLayer(UIweight,{}, 'Reclassified UI')
  //Subtract water and roads from UI
  // print(UIweight)
  var UImh2o = UIweight.select('constant').subtract(waterweight.select('constant')).subtract(minusroads.select('first'));
  // Map.addLayer(UImh2o,{},'UImh20')
    var UIMask = ee.Image(1)
            .where(UImh2o.gt(-10).and(UImh2o.lte(0)), 1)
            .where(UImh2o.gt(0.01).and(UImh2o.lte(1)), urbanvalue);
    var UIfinal = ee.Image(1)
            .where(UImh2o.gt(-10).and(UImh2o.lte(0)), 1)
            .where(UImh2o.gt(0.01).and(UImh2o.lte(1)), urbanvalue);
    var UIfinal = UIfinal.mask(UIMask); 
    if(showUrban){
      Map.addLayer(UIfinal.clip(AreaOfInterest),{max:urbanvalue}, 'UI Final Reclass');  // Checkbox
    }
  ///////////////////////////////////////////////////////////////////////////////////////
  //NDVI
    //This is a user drawn featurecollection selected to not use the water index
          var noNDVI = DontUseVegitationArea
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    // Map.addLayer(noNDVI,{},'User defined No NDVI');
  var NDVI = Sentinel2.normalizedDifference(['B8', 'B4']).rename('ndvi');
    // Map.addLayer(NDVI,{},'NDVI');
    var NDVIweight = ee.Image(1)
            .where(NDVI.gt(0).and(NDVI.lte(NDVIcuttoff)), 0)
            .where(NDVI.gt(NDVIcuttoff).and(NDVI.lte(1)), 1)
            .where(noNDVI.gt(-1000).and(noNDVI.lte(1000)),0)
            ;
     //Map.addLayer(NDVIweight,{}, 'Reclassified NDVI')
  //Subtract UI and roads from NDVI
  var NDVImUI = NDVIweight.select('constant').subtract(UIweight.select('constant')).subtract(waterweight.select('constant')).subtract(minusroads.select('first'));
    // Map.addLayer(UImh2o,{},'UImh20')
    var NDVIMask = ee.Image(1)
            .where(NDVImUI.gt(-10).and(NDVImUI.lte(0)), 1)
            .where(NDVImUI.gt(0.01).and(NDVImUI.lte(1)), NDVIvalue);
    var NDVIfinal = ee.Image(1)
            .where(NDVImUI.gt(-10).and(NDVImUI.lte(0)), 1)
            .where(NDVImUI.gt(0.01).and(NDVImUI.lte(1)), NDVIvalue);
    var NDVIfinal = NDVIfinal.mask(NDVIMask);
  if(showVegetation){
    Map.addLayer(NDVIfinal.clip(AreaOfInterest),{}, 'Vegitation NDVI'); // Checkbox
  }
  ///////////////////////////////////////////////////////////////////////////////////
  //user1input
    //This is an example of an geometry input from the user
    //Be sure the geometry setting is a feature collection when they draw for this to work
    // Make sure that the feature collection has a property named 'value' taht is set to 1
        // Make an image out of geometry (converts it to raster)
        var userraster1 = CustomTerrain1 
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
  //Map.addLayer(userraster1.clip(AreaOfInterest), {}, 'userraster1')
  /// Maybe useful for future
      // // If the user can define the value of the drawn geometry, skip this part. If not, and it is one, do this. Broken, needs fixing
        // var user1final = ee.Image(1)
        //     // .where(user1raster.gt(0).and(user1raster.lte(0)), null)
        //     .where(user1raster.gt(1).and(user1raster.lte(1)), user1value);
        // Map.addLayer(user1final, {}, userFeature1name)
      //Get value property and put it in a variable
        //only works for features
          // var user1value = CustomTerrain1.get('value')
  ////
// userGeo1Difficulty = 1;
    var user1reclass = ee.Image(1)
      .where(userraster1.gt(-1).and(userraster1.lte(1.5)), userGeo1Difficulty)
  //Map.addLayer(user1reclass.clip(AreaOfInterest), {}, 'user1reclass')
  //Makes it so that if 0 is used, it is deemed uncrossable.
    var user1final = user1reclass.unmask(1);
  //Map.addLayer(user1reclass.clip(AreaOfInterest), {}, 'user1final unmask')
    var user1final = user1final.mask(user1final);
          // Display image
              var minMax = ee.Dictionary({
            maxVal: userGeo1Difficulty
          });
          minMax.evaluate(function(dict) {
            var vizParams = {
              max: dict.maxVal, 
              // palette: ['blue','green','Yellow','red']
            };
            //Map.addLayer(user1final.clip(AreaOfInterest), vizParams, userGeo1Name); // Checkbox
          });
    // print(user1final);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //user2input
        // Make an image out of geometry
        var userraster2 = CustomTerrain2 
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    var user2reclass = ee.Image(1)
      .where(userraster2.gt(-1).and(userraster2.lte(1.5)), userGeo2Difficulty)
    var user2final = user2reclass.unmask(1);
    var user2final = user2final.mask(user2final);
          // Display image
              var minMax = ee.Dictionary({
            maxVal: userGeo2Difficulty
          });
          minMax.evaluate(function(dict) {
            var vizParams = {
              max: dict.maxVal, 
              // palette: ['blue','green','Yellow','red']
            };
            // Map.addLayer(user2final.clip(AreaOfInterest), vizParams, userGeo2Name); // Checkbox
          });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //user3input
        // Make an image out of geometry
        var userraster3 = CustomTerrain3  //'3'
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    var user3reclass = ee.Image(1)
      .where(userraster3.gt(-1).and(userraster3.lte(1.5)), userGeo3Difficulty)
    var user3final = user3reclass.unmask(1);
    var user3final = user3final.mask(user3final);
          // Display image
              var minMax = ee.Dictionary({
            maxVal: userGeo3Difficulty
          });
          minMax.evaluate(function(dict) {
            var vizParams = {
              max: dict.maxVal, 
              // palette: ['blue','green','Yellow','red']
            };
            // Map.addLayer(user3final.clip(AreaOfInterest), vizParams, userGeo3Name); // Checkbox
          });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //user4input
        // Make an image out of geometry
        var userraster4 = CustomTerrain4  //'4'
          .filter(ee.Filter.notNull(['value']))
          .reduceToImage({
            properties: ['value'],
            reducer: ee.Reducer.first()
        });
    var user4reclass = ee.Image(1)
      .where(userraster4.gt(-1).and(userraster4.lte(1.5)), userGeo4Difficulty)
    var user4final = user4reclass.unmask(1);
    var user4final = user4final.mask(user4final);
          // Display image
              var minMax = ee.Dictionary({
            maxVal: userGeo4Difficulty
          });
          minMax.evaluate(function(dict) {
            var vizParams = {
              max: dict.maxVal, 
              // palette: ['blue','green','Yellow','red']
            };
            // Map.addLayer(user4final.clip(AreaOfInterest), vizParams, userGeo4Name); // Checkbox
          });
  //NEW Landcover Data
//Show Landcover
if(landcoverShow){
  var landcover = ee.ImageCollection('ESA/WorldCover/v200').first().clip(AreaOfInterest);
  var landCoverVis = {
  //opacity: 0.8,
  bands: ['Map']
};
Map.addLayer(landcover, landCoverVis, "Landcover");
}
//Create base 0 raster for cost raster. This makes it so that after all the layers are used below, the leftover area is deemed uncrossible. If we want it to be crossible, this needs to be a 1.
var costRaster = ee.Image(0)
//Use Landcover data layers in cost raster generation
if(useLandcover){
  var landcover = ee.ImageCollection('ESA/WorldCover/v200').first().clip(AreaOfInterest);
    costRaster = costRaster
          .where(landcover.gt(9).and(landcover.lte(11)), treeCover)
          .where(landcover.gt(19).and(landcover.lte(21)),  shrubland)
          .where(landcover.gt(29).and(landcover.lte(31)),  grassland)
          .where(landcover.gt(39).and(landcover.lte(41)),  cropland)
          .where(landcover.gt(49).and(landcover.lte(51)),  buildup)            
          .where(landcover.gt(59).and(landcover.lte(61)),  bareSparseVeg)
          .where(landcover.gt(69).and(landcover.lte(71)),  snowAndIce)
          .where(landcover.gt(79).and(landcover.lte(81)),  PermanentWaterBodies)
          .where(landcover.gt(89).and(landcover.lte(91)),  herbaceousWetland)
          .where(landcover.gt(94).and(landcover.lte(96)),  mangroves)
          .where(landcover.gt(99).and(landcover.lte(101)),  mossAndLichen);
}
//Use Index values in Cost Raster Generation
if(useIndex){
    costRaster = costRaster
          .where(NDVIweight.gt(0.9).and(NDVIweight.lte(1.1)), NDVIvalue)
          .where(UIweight.gt(0.9).and(UIweight.lte(1.1)), urbanvalue)
          .where(waterweight.gt(0.9).and(waterweight.lte(1.1)), watervalue)
;
}
//Create the Cost Raster with the user input, weight, and cross speed per meter
    costRaster = costRaster
          .where(userraster1.gt(0.9).and(userraster1.lte(1.1)), userGeo1Difficulty)
          .where(userraster2.gt(0.9).and(userraster2.lte(1.1)), userGeo2Difficulty)
          .where(userraster3.gt(0.9).and(userraster3.lte(1.1)), userGeo3Difficulty)
          .where(userraster4.gt(0.9).and(userraster4.lte(1.1)), userGeo4Difficulty)
          .where(adjRoadsRaster.gt(0.9).and(adjRoadsRaster.lte(1.1)), roadsvalue)
          .multiply(weightedSlope.select('constant'))
          .reproject({
          // crs: Sentinel2Projection,
          crs:'EPSG:3857',
          scale: pixelSize})
          .multiply(mCrossSpeed)
          .clip(AreaOfInterest)
          ;
  //This was to check the pixel size. it is taken into account in cum cost raster. Mjultiply by just mCrossSpeed
    // var pixelArea = ee.Image.pixelArea()
    // .reproject({
    //         crs:'EPSG:3857',
    //         scale: pixelSize //This is to reproject to the same resolution as the other data
    // });
    // Map.addLayer(pixelArea, {}, "Pixel Area");
    var costRaster = costRaster.unmask(1);
    var costRaster = costRaster.mask(costRaster);
    // var landclassFinal = landcoverWeight.unmask(1);
    // var landclassFinal = landclassFinal.mask(landclassFinal);
//show Land Cover Weight
  //Getting Max value to print land cover raster for checking
  var landcoverArray = ee.Array([treeCover, shrubland, grassland, cropland, buildup, bareSparseVeg, snowAndIce, PermanentWaterBodies, herbaceousWetland, mangroves, mossAndLichen]);
  var landcoverList = landcoverArray.toList();
  var landcoverSortList = landcoverList.sort();
  var maxLandValue = landcoverSortList.get(10);
  //print(landcoverSortList);
  //print(maxLandValue);
    var maxLandcoverValue = maxLandValue.getInfo();
    var minMaxLand = ee.Dictionary({
      maxValLand: maxLandcoverValue
    });
// var minMaxLand1 = landclassFinal.reduceRegion(ee.Reducer.minMax(),AreaOfInterest);
// print(minMax);
        if(showLandcoverWeight){    
    minMaxLand.evaluate(function(dict) {
      var vizParamsLand = {
        min: 0,
        max: (dict.maxValLand) 
        * mCrossSpeed * 2
        , 
        palette: ['black', 'white'],
      };
  Map.addLayer(costRaster, vizParamsLand, "Cost Raster");
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////
  //Least Cost Cumulitive raster code
  //Not used steps
      //Run this code if the input is a geometry (Shapefile) file.
      //Starting with a raster skips step one and two.
          // 1. Import & define ALocation of Interest. This is the objective. The Safe Elevation polygon or area outside the flood region.
          // var geometry = ee.Geometry.Rectangle([111.154, -8.2715, 111.0434, -8.156]);
          // // 2. Create a source image where the Obj Polygon is 1, everything else is 0. (not sure why)
          // var sources = ee.Image().toByte().paint(EvacDEM, 1);
  /////
        // 3. Mask the sources image with itself. (Maybe to just run that same area?)
        var source = Safe_Areas; //or one of the other three raster options****!!!
        source = source.updateMask(source);
        //5. Compute the cumulative cost to traverse the land cover.
        var cumulativeCost = costRaster.cumulativeCost({
          source: source,
          //This is how much of the area around the shape will be modeled.
          maxDistance: 10 * 1000 // 10 kilometers //This should just be a large number to not limit the calc, but not too big to run too much data
        }).reproject({
            crs:'EPSG:3857',
            scale: pixelSize //This is to reproject to the same resolution as the other data
        }).clip(safeAreasPoly);
  //Code for contour calculations for cumulative Cost
    var lines = ee.List.sequence(0, evacTime.getInfo()*2, 60)
  var contourlines = lines.map(function(line) {
    var mycontour = cumulativeCost
      .convolve(ee.Kernel.gaussian(3, 3))
      .subtract(ee.Image.constant(line)).zeroCrossing() 
      .multiply(ee.Image.constant(line)).toFloat();
      return mycontour.mask(mycontour);
  })
  contourlines = ee.ImageCollection(contourlines).mosaic()
  Map.addLayer(contourlines, {min: 0, max: evacTime.getInfo()*5/3, palette:['blue','green','Yellow','red','purple','brown']}, 'Cumulative Cost Contours')
  //Maybe useful in large areas
        //       var cumulativeCost = cumulativeCost
        // .reduceResolution({
        //   reducer: ee.Reducer.mean(),
        //   maxPixels: 65535,
        //   // tileScale: 2,
        // // }).reproject({
        // //     // crs: Sentinel2Projection,
        // //     crs:'EPSG:3857',
        // //     scale: 10
        // });
  //This function takes the ee. number for the evacuation time and converts it to Client side to be the max
  var maxCumSymbol = evacTime.getInfo()*5/3;
  var minMax = ee.Dictionary({
    maxVal: maxCumSymbol
  });
  // print(minMax);
  minMax.evaluate(function(dict) {
    var vizParams = {
      max: dict.maxVal, 
      palette: ['blue','green','Yellow','red','purple','brown'],
      opacity: 0.8
    };
    Map.addLayer(cumulativeCost, vizParams, 'Cumulative Cost Map');
  });
  // Code to create adjusted heat map showing the areas already evacuated at arrival time.
  //Thoughts... add on arrival time and clip...
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //Population not safe estimate
  //   // Currently works best if Buildings are not considered "uncrossable or clipped out"
  var cumulativeCost2 = cumulativeCost.unmask(0);
  var notSafePop = ee.Image(1)
            .where(cumulativeCost2.gt(-10000).and(cumulativeCost2 .lte(evacTime)), 0)
            .where(cumulativeCost2.gt(evacTime).and(cumulativeCost2.lte(10000)), 1);
  var populationCountVis = {
    min: 0.0,
    max: 200.0,
    palette: ['060606', '337663', '337663', 'ffffff'],
    opacity: 0.85
  };
  ///////////////////////////
  //World Pop Data
  var worldPopDs = ee.ImageCollection("WorldPop/GP/100m/pop")
                    .filterBounds(AreaOfInterest)
                    .filterDate('2015-01-01', '2100-12-31')
                    .sort('year',false)
                    .first()
                    .clip(AreaOfInterest)
                    .mask(notSafePop)
                    .reproject({
                      crs:'EPSG:3857',
                      scale: 91.46 //This is to reproject to the same resolution as the original data
        })
  ;
  // print(worldPopDs)
  var populationCountWP = worldPopDs.select('population').clip(AreaOfInterest);
  // Map.addLayer(populationCountWP, populationCountVis, 'Population Unable to Evacuate in time'); // Checkbox
  // print(populationCount)
  // Assumes a geometry object that overlays the image.
  var sum = populationCountWP.reduceRegion({
   reducer: ee.Reducer.sum(),
   geometry: AreaOfInterest,
   scale: 91.46,
   maxPixels: 1e10
  });
  // // ee.Dictionary with reducer outputs keyed by bandname.
  // print(sum);
  // ee.Number
  print('Rough Estimate: Population not able to evacuate = ', sum.get('population'), 'people (based on 2020 census and 92 m pixels)');
  // var visualization = {
  //   bands: ['population'],
  //   min: 0.0,
  //   max: 50.0,
  //   palette: ['24126c', '1fff4f', 'd4ff50']
  // };
  // Map.addLayer(worldPopDs, visualization, 'Population');
  ////////////////////////////////////////////////////////////////////////////////////////
  //Total population needing to evacuate
  var unsafeAreas = Safe_Areas.unmask(0);
  var inHarmsWay = ee.Image(1)
            .where(unsafeAreas.gt(0).and(unsafeAreas .lte(0)), 1)
            .where(unsafeAreas.gt(0).and(unsafeAreas.lte(10000)), 0)
            .clip(AreaOfInterest);
  // Map.addLayer(inHarmsWay,{},'Population needing to Evacuate');
  var worldPopDsTotal = ee.ImageCollection("WorldPop/GP/100m/pop")
                    .filterBounds(AreaOfInterest)
                    .filterDate('2015-01-01', '2100-12-31')
                    .sort('year',false)
                    .first()
                    .clip(AreaOfInterest)
                    .mask(inHarmsWay)
                    .reproject({
                      crs:'EPSG:3857',
                      scale: 91.46 //This is to reproject to the same resolution as the original data
        })
  ;
  var evacuationPop = worldPopDsTotal.select('population').clip(AreaOfInterest);
  if(showEvacPop){
    Map.addLayer(evacuationPop, populationCountVis, 'Population needing to Evacuate'); // Checkbox
  }
  // print(populationCount)
  // Assumes a geometry object that overlays the image.
  var sumTotal = evacuationPop.reduceRegion({
   reducer: ee.Reducer.sum(),
   geometry: AreaOfInterest,
   scale: 91.46,
   maxPixels: 1e10
  });
  // // ee.Dictionary with reducer outputs keyed by bandname.
  // print(sum);
  // ee.Number
  print('Rough Estimate: Total Population to Evacuate = ', sumTotal.get('population'), 'people (92 m pixels)');
  // print(sum);
  var evacSafe = ee.Number(sumTotal.get('population')).subtract(sum.get('population'));
  print(evacSafe, 'people projected to evacuate safely');
  var percEvac = ee.Number(sum.get('population')).divide(sumTotal.get('population')).multiply(100)
  print(percEvac, '% unable to evacuate')
  //////Test/////
  // print(AreaOfInterest, 'area of interest')
  Map.setOptions("HYBRID");
  Map.centerObject(AreaOfInterest , 14);
    /////////////////////////LEGENDS///////////////////////////////////////////
// Create the panel for the legend items.
// var panel = ui.Panel({style: {width: '350px'}});
var palette_b = ['brown','purple','Red','Yellow','Green','Blue','white'];
if (legend !== null){
  ui.root.remove(legend)
} 
legend = ui.Panel({
  style: {
    // position: 'top-left',
    padding: '2px 6px',
    //shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'
  }
});
//ui.root.add(legend);
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
/////////////Cumulative Cost Legend/////////////////////////////////
//////////////////////////
//Container Code
var legendShow = true;
function legendButtonHandler() {
  if(legendShow){
    legendShow = false;
    legend.style().set('shown', false);
    //legend.style().set('width', '83px');
    legendButton.setLabel('Show Legend');
  } else {
    legendShow = true;
    legend.style().set('shown', true);
    //legend.style().set('width', '290px');
    legendButton.setLabel('Hide Legend');
  }
}
// Note style.
//var legendStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '11px', fontWeight: '500', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var legendButton = ui.Button({label: 'Hide Legend', onClick: legendButtonHandler, style: {margin: '0px'}});
/////////////////////////////
var CumCost = ui.Label('Evacuation Time');
legend.add(CumCost);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: 
    //legendStyle
    {margin: '0 0 4px 6px' }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//var is evacTime / 60 s to get mins
var evacTimeMins = evacTime.divide(60);
var evacThird = evacTimeMins.divide(3).round();
var evacTwoThird = evacTimeMins.multiply(2).divide(3).round();
var evacFourOverThree = evacTimeMins.multiply(4).divide(3).round();
var evacFiveOverThree = evacTimeMins.multiply(5).divide(3).round();
var names_b = ['>' +evacFiveOverThree.getInfo() + ' min', + evacFourOverThree.getInfo() + ' min', + evacTimeMins.getInfo() + ' min (Arrival)',evacTwoThird.getInfo() + ' min',evacThird.getInfo() + ' min', '0 min', 'Safe']
for (var i = 0; i < names_b.length; i++) {
    legend.add(makeRow(palette_b[i], names_b[i]));
  }
////////////////////////////
//Add legand Container
  var legendContainer = ui.Panel({widgets: [legendButton, legend],
  style: {position: 'bottom-left', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
Map.add(legendContainer);
///////////////////////////////////////////////////////////////////////
//Download Cumulative Cost
// Define a function to generate a download URL of the image
function downloadImg() {
  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  var downloadArgs = {
    name: 'ee_cumulativeCost',
    crs: 'EPSG:3395',
    scale: pixelSize,
    // region: viewBounds.toGeoJSONString()
 };
 var url = cumulativeCost.getDownloadURL(downloadArgs);
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
}
// Add UI elements to the Map.
var downloadButton = ui.Button('Download CumCost Raster', downloadImg);
var urlLabel = ui.Label('Download', {shown: false});
var panel = ui.Panel({widgets: [downloadButton, urlLabel], style: {position: 'bottom-right', padding: '2px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
Map.add(panel);
///////////////////////////////////////////////////////////////////
//Download Cost Raster
// Define a function to generate a download URL of the image
function downloadImg2() {
  // var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  var downloadArgs2 = {
    name: 'ee_CostRaster',
    crs: 'EPSG:3395',
    scale: 10,
    // region: viewBounds.toGeoJSONString()
 };
 var url2 = costRaster.getDownloadURL(downloadArgs2);
 urlLabel2.setUrl(url2);
 urlLabel2.style().set({shown: true});
}
// Add UI elements to the Map.
var downloadButton2 = ui.Button('Download Cost Raster', downloadImg2);
var urlLabel2 = ui.Label('Download', {shown: false});
var panel2 = ui.Panel({widgets: [downloadButton2, urlLabel2], style: {position: 'bottom-right', padding: '2px', backgroundColor: 'rgba(0, 0, 0, 0.5)'}});
Map.add(panel2);
}
////////////////////////////////////////////////////////////////////////
////////BEGIN UI///////
// Set up the tool panel
var header = ui.Label('Evacuation App', {fontSize: '36px', color: 'red'});
//var toolPanel = ui.Panel({style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}}
var toolPanel = ui.Panel([header], 'flow',
{width: '300px'}
// ,backgroundColor: '#D3D3D3'
//backgroundColor: 'rgba(0, 0, 0, 0.5)'
);
ui.root.widgets().add(toolPanel);
// // Layer editing selector
// var editableLayers = ["Area of Interest","Additional Safe Areas","Vertical Evacuation Shelters", "Roads", "User Geometry 1", "User Geometry 2", "User Geometry 3", "User Geometry 4", "Don't Use Water Area", "Don't Use Uban Area", "Don't Use Vegitation Area"]
// var layerSelector = ui.Select({
//   items: editableLayers,
//   onChange: function(key){
//     mergeLayer = key;
//   }
// });
// toolPanel.add(layerSelector);
var appdes = ui.Label('This app is designed to help calculate evacuation times, assess hazard risk, and develop evacuation strategies. This app is in beta form and should not be used for actual final evacuation planning. This app does not consider slope directionality in cost, human traffic and evacuation path congestion and blockages, and does not take into account diagonal vs. horz or vert pixel travel times. The evacuation model is only as good as the input data, so provide accurate data and fine tune for best results. Default Values are provided for a starting point and will allow the model to run with just an Area of Interest layer drawn. Slope difficulties are applied automatically from NASA SRTM Digital Elevation 30m.*', {fontSize: '12px', color: 'darkred'});
toolPanel.add(appdes);
var appdes = ui.Label('Draw your "Area_of_Interest" layer before running. Draw other layers as needed (located in the geometry import dropdown menu near the top left corner of the map interface.)', {fontSize: '14px', color: 'red'});
toolPanel.add(appdes);
// Evac Area Label
var evacAreaLabel = ui.Label('Evacuation Area', {fontSize: '24px', color: 'black'});
toolPanel.add(evacAreaLabel);
var safeAreaWarning = ui.Label('Real calibrated hazard models should be used to determine safe evacuation areas. They can be drawn in under the "Additional_Safe_Areas" geometry', {fontSize: '12px', color: 'red'});
toolPanel.add(safeAreaWarning);
// Show Evacuation Area?
var showEvacuationAreaBoxLabel = ui.Label('Show Evacuation Area', {fontSize: '14px'})
  var showEvacuationBoxPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '300px'}
  });
var showEvacuationAreaBox = ui.Checkbox({value: showEvacuationArea});
showEvacuationAreaBox.onChange(function(checked){
  showEvacuationArea = checked;
});
showEvacuationBoxPanel.add(showEvacuationAreaBox);
showEvacuationBoxPanel.add(showEvacuationAreaBoxLabel)
toolPanel.add(showEvacuationBoxPanel);
  // var landcoverShowBox = ui.Checkbox({
  //   value: landcoverShow,
  //   onChange: function(checked){
  //     landcoverShow = checked;
  //   }
  // });
  // landcoverShowBoxPanel.add(landcoverShowBox);
  // landcoverShowBoxPanel.add(landcoverShowBoxLabel);
  // toolPanel.add(landcoverShowBoxPanel);
// Safe Elevation
var safeElevationPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var elevation = ui.Label('Sets a uniform safe elevation for evacuation. Input 999999 if elevation is not used to determine evacuation destinations', infoDes);
toolPanel.add(elevation);
var safeElevationLabel = ui.Label('Safe Elevation (m)');
safeElevationPanel.add(safeElevationLabel);
var safeElevationInput = ui.Textbox({
  value: EvacElev,
  style: {width: '50px'},
  onChange: function(value){
    EvacElev = parseFloat(value);
  }
});
safeElevationPanel.add(safeElevationInput);
toolPanel.add(safeElevationPanel)
var elevation = ui.Label('Increase if the output Cumulative Cost map does not render or cannot be downloaded. Decreases the output spatial resolution. Actual pixel distances in m varies', infoDes);
toolPanel.add(elevation);
//Variable to adjust output pixel size
var pixelSizeLabel = ui.Label('Aprox Output Pixel Scale (m) (min = 10)', {fontSize: '12px', color: 'black'});
var pixelSizeBox = ui.Textbox({
  value: pixelSize,
  style: {width: '50px'},
  onChange: function(value){
    pixelSize = parseFloat(value);
  }
});
var pixelSizePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
pixelSizePanel.add(pixelSizeLabel);
pixelSizePanel.add(pixelSizeBox);
toolPanel.add(pixelSizePanel);
// Hazard Timing Label
var hazardTimingLabel = ui.Label('Hazard Timing', {fontSize: '24px', color: 'black'});
toolPanel.add(hazardTimingLabel);
var arrival = ui.Label('Time from start of event/warning until the hazard arrives', infoDes);
toolPanel.add(arrival);
// Hazard Arrival Time
var hazardArrivalTimePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var hazardArrivalTimeLabel = ui.Label('Hazard Arrival Time (min)');
hazardArrivalTimePanel.add(hazardArrivalTimeLabel);
var hazardArrivalTimeInput = ui.Textbox({
  value: arrivalTimeM,
  style: {width: '50px'},
  onChange: function(value){
    arrivalTimeM = parseFloat(value);
  }
});
hazardArrivalTimePanel.add(hazardArrivalTimeInput);
toolPanel.add(hazardArrivalTimePanel)
// Response Time
var response = ui.Label('The time it takes after the event/warning to begin evacuation', infoDes);
toolPanel.add(response);
var responseTimePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var responseTimeLabel = ui.Label('Departure Delay (min)');
responseTimePanel.add(responseTimeLabel);
var responseTimeInput = ui.Textbox({
  value: reacTimeM,
  style: {width: '50px'},
  onChange: function(value){
    reacTimeM = parseFloat(value);
  }
});
responseTimePanel.add(responseTimeInput);
toolPanel.add(responseTimePanel)
// Evacuation Speed
var speed = ui.Label('Population travel speed used to model evacuation. Difficulty ratings decrease speed: travel speed = base travel speed / difficulty rating', infoDes);
toolPanel.add(speed);
var walkingSpeedPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var walkingSpeedLabel = ui.Label('Base Travel Speed (m/s)');
walkingSpeedPanel.add(walkingSpeedLabel);
var walkingSpeedInput = ui.Textbox({
  value: walkingSpeed,
  style: {width: '50px'},
  onChange: function(value){
    walkingSpeed = parseFloat(value);
  }
});
walkingSpeedPanel.add(walkingSpeedInput);
toolPanel.add(walkingSpeedPanel)
// Terrain Layers
var terrainLayersLabel = ui.Label('Terrain Layers', {fontSize: '24px', color: 'black'});
toolPanel.add(terrainLayersLabel);
var roadsDifficultyLabel = ui.Label('Difficulty Rating', {fontSize: '12px'})
var difficulty = ui.Label('For difficulty ratings, the difficulty/time required to transverse increases as the number increases. E.g. a terrain difficulty rating of 2 takes twice as long to cross/is half of evacuation travel speed. The resulting cost raster units are seconds/meter within the pixel. Only change the default values when sufficient evidence suggests that the terrain in your area of interest differs from what is included. The rating may differ greatly depending on the area. Use custom terrains to customize further and overwrite the underlying landcover data.', infoDes);
toolPanel.add(difficulty);
//Show Cost Raster
  var landcoverWeightBoxLabel = ui.Label('Show Cost Raster', {fontSize: '14px'})
  var landcoverWeightBoxPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '300px'}
  });
  var landcoverWeightBox = ui.Checkbox({
    value: showLandcoverWeight,
    onChange: function(checked){
      showLandcoverWeight = checked;
    }
  });
  landcoverWeightBoxPanel.add(landcoverWeightBox);
  landcoverWeightBoxPanel.add(landcoverWeightBoxLabel);
  toolPanel.add(landcoverWeightBoxPanel);
// Roads
var roadsLabel = ui.Label('Roads', {fontSize: '20px', color: 'black'});
toolPanel.add(roadsLabel);
var roadsDifficultyLabel = ui.Label('Difficulty Rating', {fontSize: '14px'});
var roadsPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var roadsInput = ui.Textbox({
  value: roadsvalue,
  style: {width: '50px'},
  onChange: function(value){
    roadsvalue = parseFloat(value);
  }
});
roadsPanel.add(roadsDifficultyLabel);
roadsPanel.add(roadsInput);
toolPanel.add(roadsPanel);
var roadsBoxLabel = ui.Label('automated terrain layers Layer', {fontSize: '14px'})
var roadsBoxPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var roadsBox = ui.Checkbox({
  value: showRoads,
  onChange: function(checked){
    showRoads = checked;
  }
});
roadsBoxPanel.add(roadsBox);
roadsBoxPanel.add(roadsBoxLabel);
toolPanel.add(roadsBoxPanel);
var USroadsBoxLabel = ui.Label('Use US 2016 Census Roads', {fontSize: '14px'})
var USroadsBoxPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var USroadsBox = ui.Checkbox({
  value: USRoads,
  onChange: function(checked){
    USRoads = checked;
  }
});
USroadsBoxPanel.add(USroadsBox);
USroadsBoxPanel.add(USroadsBoxLabel);
toolPanel.add(USroadsBoxPanel);
///////////////////////////////////////////////////////////////////////////////////////////////////
//Land Cover Data
var LandcoverLabel = ui.Label('Land Cover Data', {fontSize: '20px', color: 'black'});
toolPanel.add(LandcoverLabel);
//Switch to turn using Landcover data on or off
  var landcoverBoxLabel = ui.Label('Use 2021 Land Cover Data', {fontSize: '14px'})
  var landcoverBoxPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '300px'}
  });
  var landcoverBox = ui.Checkbox({
    value: useLandcover,
    onChange: function(checked){
      useLandcover = checked;
    }
  });
  landcoverBoxPanel.add(landcoverBox);
  landcoverBoxPanel.add(landcoverBoxLabel);
  toolPanel.add(landcoverBoxPanel);
//Show Landcover Data
    var landcoverShowBoxLabel = ui.Label('Show Landcover Data Layer', {fontSize: '14px'})
  var landcoverShowBoxPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '300px'}
  });
  var landcoverShowBox = ui.Checkbox({
    value: landcoverShow,
    onChange: function(checked){
      landcoverShow = checked;
    }
  });
  landcoverShowBoxPanel.add(landcoverShowBox);
  landcoverShowBoxPanel.add(landcoverShowBoxLabel);
  toolPanel.add(landcoverShowBoxPanel);
/////////////////////////////////////////////////////////
//Include inputs for weight for each land cover type here
var LandcoverDiffLabel = ui.Label('Difficulty Ratings', {fontSize: '17px', color: 'black'});
toolPanel.add(LandcoverDiffLabel);
//Tree Cover Input Box
var treeCoverLabel = ui.Label('Tree Cover', {fontSize: '14px', color: 'black'});
var treeCoverBox = ui.Textbox({
  value: treeCover,
  style: {width: '50px'},
  onChange: function(value){
    treeCover = parseFloat(value)
;
  }
});
var treeCoverPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var treeCoverColorBox = ui.Label({
  style: {
    backgroundColor: '006400',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
treeCoverPanel.add(treeCoverColorBox);
treeCoverPanel.add(treeCoverLabel);
treeCoverPanel.add(treeCoverBox);
toolPanel.add(treeCoverPanel);
//shrubland Input Box
var shrublandLabel = ui.Label('Shrublands', {fontSize: '14px', color: 'black'});
var shrublandBox = ui.Textbox({
  value: shrubland,
  style: {width: '50px'},
  onChange: function(value){
    shrubland = parseFloat(value)
;
  }
});
var shrublandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var shrublandColorBox = ui.Label({
  style: {
    backgroundColor: 'ffbb22',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
shrublandPanel.add(shrublandColorBox);
shrublandPanel.add(shrublandLabel);
shrublandPanel.add(shrublandBox);
toolPanel.add(shrublandPanel);
//grassland Input Box
var grasslandLabel = ui.Label('Grassland', {fontSize: '14px', color: 'black'});
var grasslandBox = ui.Textbox({
  value: grassland,
  style: {width: '50px'},
  onChange: function(value){
    grassland = parseFloat(value)
;
  }
});
var grasslandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var grasslandColorBox = ui.Label({
  style: {
    backgroundColor: 'ffff4c',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
grasslandPanel.add(grasslandColorBox);
grasslandPanel.add(grasslandLabel);
grasslandPanel.add(grasslandBox);
toolPanel.add(grasslandPanel);
//cropland Input Box
var croplandLabel = ui.Label('Cropland', {fontSize: '14px', color: 'black'});
var croplandBox = ui.Textbox({
  value: cropland,
  style: {width: '50px'},
  onChange: function(value){
    cropland = parseFloat(value)
;
  }
});
var croplandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var croplandColorBox = ui.Label({
  style: {
    backgroundColor: 'f096ff',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
croplandPanel.add(croplandColorBox);
croplandPanel.add(croplandLabel);
croplandPanel.add(croplandBox);
toolPanel.add(croplandPanel);
//buildup Input Box
var buildupLabel = ui.Label('Buildup Urban', {fontSize: '14px', color: 'black'});
var buildupBox = ui.Textbox({
  value: buildup,
  style: {width: '50px'},
  onChange: function(value){
    buildup = parseFloat(value)
;
  }
});
var buildupPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var buildupColorBox = ui.Label({
  style: {
    backgroundColor: 'fa0000',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
buildupPanel.add(buildupColorBox);
buildupPanel.add(buildupLabel);
buildupPanel.add(buildupBox);
toolPanel.add(buildupPanel);
//bareSparseVeg Input Box
var bareSparseVegLabel = ui.Label('Bare Earth/Sparse Vegitation', {fontSize: '14px', color: 'black'});
var bareSparseVegBox = ui.Textbox({
  value: bareSparseVeg,
  style: {width: '50px'},
  onChange: function(value){
    bareSparseVeg = parseFloat(value)
;
  }
});
var bareSparseVegPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var bareSparseVegColorBox = ui.Label({
  style: {
    backgroundColor: 'b4b4b4',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
bareSparseVegPanel.add(bareSparseVegColorBox);
bareSparseVegPanel.add(bareSparseVegLabel);
bareSparseVegPanel.add(bareSparseVegBox);
toolPanel.add(bareSparseVegPanel);
//snowAndIce Input Box
var snowAndIceLabel = ui.Label('Snow and Ice', {fontSize: '14px', color: 'black'});
var snowAndIceBox = ui.Textbox({
  value: snowAndIce,
  style: {width: '50px'},
  onChange: function(value){
    snowAndIce = parseFloat(value)
;
  }
});
var snowAndIcePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var snowAndIceColorBox = ui.Label({
  style: {
    backgroundColor: 'f0f0f0',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
snowAndIcePanel.add(snowAndIceColorBox);
snowAndIcePanel.add(snowAndIceLabel);
snowAndIcePanel.add(snowAndIceBox);
toolPanel.add(snowAndIcePanel);
//PermanentWaterBodies Input Box
var PermanentWaterBodiesLabel = ui.Label('Permanent Water Bodies', {fontSize: '14px', color: 'black'});
var PermanentWaterBodiesBox = ui.Textbox({
  value: PermanentWaterBodies,
  style: {width: '50px'},
  onChange: function(value){
    PermanentWaterBodies = parseFloat(value)
;
  }
});
var PermanentWaterBodiesPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var PermanentWaterBodiesColorBox = ui.Label({
  style: {
    backgroundColor: '0064c8',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
PermanentWaterBodiesPanel.add(PermanentWaterBodiesColorBox);
PermanentWaterBodiesPanel.add(PermanentWaterBodiesLabel);
PermanentWaterBodiesPanel.add(PermanentWaterBodiesBox);
toolPanel.add(PermanentWaterBodiesPanel);
//herbaceousWetland Input Box
var herbaceousWetlandLabel = ui.Label('Herbaceous Wetland', {fontSize: '14px', color: 'black'});
var herbaceousWetlandBox = ui.Textbox({
  value: herbaceousWetland,
  style: {width: '50px'},
  onChange: function(value){
    herbaceousWetland = parseFloat(value)
;
  }
});
var herbaceousWetlandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var herbaceousWetlandColorBox = ui.Label({
  style: {
    backgroundColor: '0096a0',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
herbaceousWetlandPanel.add(herbaceousWetlandColorBox);
herbaceousWetlandPanel.add(herbaceousWetlandLabel);
herbaceousWetlandPanel.add(herbaceousWetlandBox);
toolPanel.add(herbaceousWetlandPanel);
//mangroves Input Box
var mangrovesLabel = ui.Label('Mangroves', {fontSize: '14px', color: 'black'});
var mangrovesBox = ui.Textbox({
  value: mangroves,
  style: {width: '50px'},
  onChange: function(value){
    mangroves = parseFloat(value)
;
  }
});
var mangrovesPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var mangrovesColorBox = ui.Label({
  style: {
    backgroundColor: '00cf75',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
mangrovesPanel.add(mangrovesColorBox);
mangrovesPanel.add(mangrovesLabel);
mangrovesPanel.add(mangrovesBox);
toolPanel.add(mangrovesPanel);
//mossAndLichen Input Box
var mossAndLichenLabel = ui.Label('Moss and Lichen', {fontSize: '14px', color: 'black'});
var mossAndLichenBox = ui.Textbox({
  value: mossAndLichen,
  style: {width: '50px'},
  onChange: function(value){
    mossAndLichen = parseFloat(value)
;
  }
});
var mossAndLichenPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var mossAndLichenColorBox = ui.Label({
  style: {
    backgroundColor: 'fae6a0',
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '7px 0px 0px 6px'
  }});
mossAndLichenPanel.add(mossAndLichenColorBox);
mossAndLichenPanel.add(mossAndLichenLabel);
mossAndLichenPanel.add(mossAndLichenBox);
toolPanel.add(mossAndLichenPanel);
///////////////////////////////////////////////////////////////////////////////////////
// //Download Roads layer (In progress)
// // Define a function to generate a download URL of the image
// function downloadRoads() {
//   var downloadArgs3 = {
//     filename: 'ee_Roads',
//     // crs: 'EPSG:3395',
//     format: 'kml',
//     // selectors:  roads.propertyNames().getInfo(),
//     // scale: pixelSize,
//     // region: viewBounds.toGeoJSONString()
// };
// var url = roads.getDownloadURL(downloadArgs3);
// urlLabel.setUrl(url);
// urlLabel.style().set({shown: true});
// }
// // Add UI elements to the Map.
// var downloadButton3 = ui.Button('Download Roads Shapefile', downloadRoads);
// var urlLabel3 = ui.Label('Download', {shown: false});
// toolPanel.add(downloadButton3, urlLabel3);
// // Add UI elements to the Map.
/////////////////////////////////////////////////////////////////////////////////////////
// // Non-Roads
// var nonRoadsLabel = ui.Label('Non-Road', {fontSize: '18px', color: 'black'});
// toolPanel.add(nonRoadsLabel);
// var nonRoadsDifficultyLabel = ui.Label('Difficulty Rating', {fontSize: '12px'});
// var nonRoadsPanel = ui.Panel({
//   layout: ui.Panel.Layout.flow('horizontal'),
//   style: {width: '300px'}
// });
// var nonRoadsInput = ui.Textbox({
//   value: nonroad,
//   style: {width: '50px'},
//   onChange: function(value){
//     nonroad = parseFloat(value);
//   }
// });
// nonRoadsPanel.add(nonRoadsDifficultyLabel);
// nonRoadsPanel.add(nonRoadsInput);
// toolPanel.add(nonRoadsPanel);
var automatedTerrains = ui.Label('Automated Terrain Layers', {fontSize: '20px', color: 'black'});
toolPanel.add(automatedTerrains)
var automatedLabel = ui.Label('This section uses a median Sentinel 2 Satellite imagery merge from the past X months to calculate various indices for current self-updating land use difficulty ratings. It is recommended to first run and check the above Landcover data before possibly using these layers. These layers will replace any underlying Landcover difficulty ratings but can be trimmed using the "DontUse..." geometry layers.', {fontSize: '12px', color: 'red'});
toolPanel.add(automatedLabel);
//Check box in order to use the automated layers
  var IndexBoxLabel = ui.Label('Use Automated Sentinel 2 Layers', {fontSize: '14px'})
  var IndexBoxPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '300px'}
  });
  var IndexBox = ui.Checkbox({
    value: useIndex,
    onChange: function(checked){
      useIndex = checked;
    }
  });
  IndexBoxPanel.add(IndexBox);
  IndexBoxPanel.add(IndexBoxLabel);
  toolPanel.add(IndexBoxPanel);
// Sentinel Data
var showSentinel2ImageBoxLabel = ui.Label('Show Sentinel 2 Composite Image', {fontSize: '14px'})
var showSentinel2ImageBoxPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '300px'}
  });
var showSentinel2ImageBox = ui.Checkbox({
  value: showSentinel2Image,
  //label: 'Show Sentinel 2 Image',
  onChange: function(checked){
    showSentinel2Image = checked;
  }
})
showSentinel2ImageBoxPanel.add(showSentinel2ImageBox);
showSentinel2ImageBoxPanel.add(showSentinel2ImageBoxLabel);
toolPanel.add(showSentinel2ImageBoxPanel);
var monthsD = ui.Label('Defines the composite image using the median of "_" months of images (retroactive from the current date) used to compute the automated Water, Urban, and Vegetation layers.', infoDes);
toolPanel.add(monthsD);
// Number of months to use
var monthsBackLabel = ui.Label('Months of Data for Composite', {fontSize: '14px'})
var monthsBackInput = ui.Textbox({
  value: monthsBackImages,
  style: {width: '50px'},
  onChange: function(value){
    monthsBackImages = parseFloat(value);
  }
});
var monthsBackPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
monthsBackPanel.add(monthsBackLabel);
monthsBackPanel.add(monthsBackInput);
toolPanel.add(monthsBackPanel);
//Description
var automatedD = ui.Label('Use a "Difficulty Rating" of "1" to not use a layer or "0" to make the layer impassable', {fontSize: '12px', color: 'blue'});
toolPanel.add(automatedD);
// Water
var waterLabel = ui.Label('Water', {fontSize: '18px', color: 'black'});
toolPanel.add(waterLabel);
var cutoffD = ui.Label('Only use cutoff values if automated terrain layers over or underestimate terrain area. These control the classification threshold value. The smaller the value, the more sensitive the index', {fontSize: '12px', color: 'red'});
toolPanel.add(cutoffD);
var waterIndexLabel = ui.Label('NDWI Cutoff', {fontSize: '14px'})
var waterIndexInput = ui.Textbox({
  value: NDWIcuttoff,
  style: {width: '50px'},
  onChange: function(value){
    NDWIcuttoff = parseFloat(value);
  }
});
var waterIndexPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
waterIndexPanel.add(waterIndexLabel);
waterIndexPanel.add(waterIndexInput);
toolPanel.add(waterIndexPanel);
var waterDifficultyLabel = ui.Label('Difficulty Rating', {fontSize: '14px'})
var waterInput = ui.Textbox({
  value: watervalue,
  style: {width: '50px'},
  onChange: function(value){
    watervalue = parseFloat(value);
  }
});
var waterPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
waterPanel.add(waterDifficultyLabel);
waterPanel.add(waterInput);
toolPanel.add(waterPanel);
var waterBoxLabel = ui.Label('Show NDWI Water Areas', {fontSize: '14px'})
var waterBoxPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var waterBox = ui.Checkbox({
  value: showWater,
  onChange: function(checked){
    showWater = checked;
  }
});
waterBoxPanel.add(waterBox);
waterBoxPanel.add(waterBoxLabel);
toolPanel.add(waterBoxPanel);
// Urban
var urbanLabel = ui.Label('Urban', {fontSize: '18px', color: 'black'});
toolPanel.add(urbanLabel);
var urbanIndexLabel = ui.Label('UI Cutoff', {fontSize: '14px'})
var urbanIndexInput = ui.Textbox({
  value: UIcuttoff,
  style: {width: '50px'},
  onChange: function(value){
    UIcuttoff = parseFloat(value);
  }
});
var urbanIndexPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
urbanIndexPanel.add(urbanIndexLabel);
urbanIndexPanel.add(urbanIndexInput);
toolPanel.add(urbanIndexPanel);
var urbanDifficultyLabel = ui.Label('Difficulty Rating', {fontSize: '14px'})
var urbanInput = ui.Textbox({
  value: urbanvalue,
  style: {width: '50px'},
  onChange: function(value){
    urbanvalue = parseFloat(value);
  }
});
var urbanPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
urbanPanel.add(urbanDifficultyLabel);
urbanPanel.add(urbanInput);
toolPanel.add(urbanPanel);
var urbanBoxLabel = ui.Label('Show UI Urban Areas', {fontSize: '14px'})
var urbanBoxPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var urbanBox = ui.Checkbox({
  value: showUrban,
  onChange: function(checked){
    showUrban = checked;
  }
});
urbanBoxPanel.add(urbanBox);
urbanBoxPanel.add(urbanBoxLabel);
toolPanel.add(urbanBoxPanel);
// Vegetation
var vegetationLabel = ui.Label('Vegetation', {fontSize: '18px', color: 'black'});
toolPanel.add(vegetationLabel);
var vegetationIndexLabel = ui.Label('NDVI Cutoff', {fontSize: '14px'})
var vegetationIndexInput = ui.Textbox({
  value: NDVIcuttoff,
  style: {width: '50px'},
  onChange: function(value){
    NDVIcuttoff = parseFloat(value);
  }
});
var vegetationIndexPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
vegetationIndexPanel.add(vegetationIndexLabel);
vegetationIndexPanel.add(vegetationIndexInput);
toolPanel.add(vegetationIndexPanel);
var vegetationDifficultyLabel = ui.Label('Difficulty Rating', {fontSize: '14px'})
var vegetationInput = ui.Textbox({
  value: NDVIvalue,
  style: {width: '50px'},
  onChange: function(value){
    NDVIvalue = parseFloat(value);
  }
});
var vegetationPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
vegetationPanel.add(vegetationDifficultyLabel);
vegetationPanel.add(vegetationInput);
toolPanel.add(vegetationPanel);
var vegetationBoxLabel = ui.Label('Show NDVI Vegetation Areas', {fontSize: '14px'})
var vegetationBoxPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var vegetationBox = ui.Checkbox({
  value: showVegetation,
  onChange: function(checked){
    showVegetation = checked;
  }
});
vegetationBoxPanel.add(vegetationBox);
vegetationBoxPanel.add(vegetationBoxLabel);
toolPanel.add(vegetationBoxPanel);
// User Geometries
var userGeometriesLabel = ui.Label('Custom Terrains', {fontSize: '18px', color: 'black'});
toolPanel.add(userGeometriesLabel)
var TerrainE = ui.Label('This section is to define the names and difficulty values of the custom user terrains drawn from the Geometry Imports dropdown menu "Custom Terrain" layers.', infoDes);
toolPanel.add(TerrainE);
// Geometry 1
var userGeo1NameLabel = ui.Label('Custom Terrain 1 Name', {fontSize: '14px', color: 'black'});
var userGeo1NameBox = ui.Textbox({
  value: userGeo1Name,
  style: {width: '100px'},
  onChange: function(value){
    userGeo1Name = value;
  }
});
var userGeo1NamePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo1NamePanel.add(userGeo1NameLabel);
userGeo1NamePanel.add(userGeo1NameBox);
toolPanel.add(userGeo1NamePanel);
var userGeo1DifficultyLabel = ui.Label('Custom Terrain 1 Difficulty', {fontSize: '14px', color: 'black'});
var userGeo1DifficultyBox = ui.Textbox({
  value: userGeo1Difficulty,
  style: {width: '50px'},
  onChange: function(value){
    userGeo1Difficulty = parseFloat(value)
;
  }
});
var userGeo1DifficultyPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo1DifficultyPanel.add(userGeo1DifficultyLabel);
userGeo1DifficultyPanel.add(userGeo1DifficultyBox);
toolPanel.add(userGeo1DifficultyPanel);
// Geometry 2
var userGeo2NameLabel = ui.Label('Custom Terrain 2 Name', {fontSize: '14px', color: 'black'});
var userGeo2NameBox = ui.Textbox({
  value: userGeo2Name,
  style: {width: '100px'},
  onChange: function(value){
    userGeo2Name = value;
  }
});
var userGeo2NamePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo2NamePanel.add(userGeo2NameLabel);
userGeo2NamePanel.add(userGeo2NameBox);
toolPanel.add(userGeo2NamePanel);
var userGeo2DifficultyLabel = ui.Label('Custom Terrain 2 Difficulty', {fontSize: '14px', color: 'black'});
var userGeo2DifficultyBox = ui.Textbox({
  value: userGeo2Difficulty,
  style: {width: '50px'},
  onChange: function(value){
    userGeo2Difficulty = parseFloat(value);
  }
});
var userGeo2DifficultyPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo2DifficultyPanel.add(userGeo2DifficultyLabel);
userGeo2DifficultyPanel.add(userGeo2DifficultyBox);
toolPanel.add(userGeo2DifficultyPanel);
// Geometry 3
var userGeo3NameLabel = ui.Label('Custom Terrain 3 Name', {fontSize: '14px', color: 'black'});
var userGeo3NameBox = ui.Textbox({
  value: userGeo3Name,
  style: {width: '100px'},
  onChange: function(value){
    userGeo3Name = value;
  }
});
var userGeo3NamePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo3NamePanel.add(userGeo3NameLabel);
userGeo3NamePanel.add(userGeo3NameBox);
toolPanel.add(userGeo3NamePanel);
var userGeo3DifficultyLabel = ui.Label('Custom Terrain 3 Difficulty', {fontSize: '14px', color: 'black'});
var userGeo3DifficultyBox = ui.Textbox({
  value: userGeo3Difficulty,
  style: {width: '50px'},
  onChange: function(value){
    userGeo3Difficulty = parseFloat(value);
  }
});
var userGeo3DifficultyPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo3DifficultyPanel.add(userGeo3DifficultyLabel);
userGeo3DifficultyPanel.add(userGeo3DifficultyBox);
toolPanel.add(userGeo3DifficultyPanel);
// Geometry 4
var userGeo4NameLabel = ui.Label('Custom Terrain 4 Name', {fontSize: '14px', color: 'black'});
var userGeo4NameBox = ui.Textbox({
  value: userGeo4Name,
  style: {width: '100px'},
  onChange: function(value){
    userGeo4Name = value;
  }
});
var userGeo4NamePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo4NamePanel.add(userGeo4NameLabel);
userGeo4NamePanel.add(userGeo4NameBox);
toolPanel.add(userGeo4NamePanel);
var userGeo4DifficultyLabel = ui.Label('Custom Terrain 4 Difficulty', {fontSize: '14px', color: 'black'});
var userGeo4DifficultyBox = ui.Textbox({
  value: userGeo4Difficulty,
  style: {width: '50px'},
  onChange: function(value){
    userGeo4Difficulty = parseFloat(value);
  }
});
var userGeo4DifficultyPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
userGeo4DifficultyPanel.add(userGeo4DifficultyLabel);
userGeo4DifficultyPanel.add(userGeo4DifficultyBox);
toolPanel.add(userGeo4DifficultyPanel);
// Population Needing To Evacuate
// // Population Unable To Evacuate
// var showEvacPopBox = ui.Checkbox({
//   value: showEvacPop,
//   label: 'Show Population Needing To Evacuate',
//   onChange: function(checked){
//     showEvacPop = checked;
//   }
// });
// toolPanel.add(showEvacPopBox)
// var showUnablePopBox = ui.Checkbox({
//   value: showUnablePop,
//   label: 'Show Population Unable To Evacuate',
//   onChange: function(checked){
//     showUnablePop = checked;
//   }
// });
// toolPanel.add(showUnablePopBox)
var otherLayersD = ui.Label('Other layers are available in the Geometry Import dropdown menu at the lop left of the map interface. These include:', {fontSize: '14px', color: 'red'});
toolPanel.add(otherLayersD);
var ASAD = ui.Label('"Additional Safe Areas" define areas that are deemed safe evacuation locations.', infoDes);
toolPanel.add(ASAD);
var VESD = ui.Label('"Vertical Evacuation Shelters" is a layer that can be used to define safe areas that are point locations (using a pin.) Can be used for potential shelter planning.', infoDes);
toolPanel.add(VESD);
var DNUD = ui.Label('"DontUse..." layers are include so that the user can exclude areas from being used in the model if the Automated Sentinel 2 Terrain Layers are used. e.g. If an area has the DontUseVegitationArea, that area will not use the vegetation terrain layer.', infoDes);
toolPanel.add(DNUD);
//Share what the slope rating is:
var slopeRating = ui.Label('"Slope Difficulty Multipliers automatically applied (Slope in degrees): 0-6 = 1, 6-12 = 1.765, 12-18 = 2.22, 18-24 = 2.857, 24-30 = 4, 30-36 = 6.67, 36-42 = 7.69, 42-45 = 8.33, 45-90 = 0', {fontSize: '12px', color: 'darkred'});
toolPanel.add(slopeRating);
var exportProjectionLabel = ui.Label('Exported rasters in EPSG:3395 projection', {fontSize: '12px', color: 'darkgreen'});
toolPanel.add(exportProjectionLabel);
// Run Button
var runButton = ui.Button({
  label: 'Run',
  onClick: run
});
toolPanel.add(runButton);
////////END UI/////////
/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//Extra broken code not used now but maybe useful later
    // Map.addLayer(cumulativeCost.clip(AreaOfInterest), // These are the max and min values displayed on the map for this output 
    // {min : 1, max : 2000},'CumulativeCost'); //Once we choose default costs, we should make this a default. Maybe just get rid of min and max.
  //   // var shortestPathLayer = shortestPath(costRaster,EvacDEM);
  //   // Map.addLayer(shortestPathLayer,{},'Evacuation Route');
  // }
  // drawMap(30);