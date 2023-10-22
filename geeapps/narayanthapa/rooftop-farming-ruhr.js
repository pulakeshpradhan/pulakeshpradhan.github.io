var geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-narayanthapa/assets/Ruhr-Boundary"
    }) || ee.FeatureCollection("projects/ee-narayanthapa/assets/Ruhr-Boundary"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    building = ui.import && ui.import("building", "table", {
      "id": "projects/ee-narayanthapa/assets/buildings-ruhr"
    }) || ee.FeatureCollection("projects/ee-narayanthapa/assets/buildings-ruhr"),
    visParams_ndvi = ui.import && ui.import("visParams_ndvi", "imageVisParam", {
      "params": {
        "max": 1,
        "min": -1,
        "palette": [
          "blue",
          "yellow",
          "green"
        ]
      }
    }) || {"max":1,"min":-1,"palette":["blue","yellow","green"]};
var styleParams = {
  color: 'red',
  width: 3.0,
};
var styleParam = {
  fillcolor:"yellow",
  color: 'yellow',
  width: 1.0,
};
//Defining call function
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Mapping of rooftop farming using Google Earth Engine'));
var label1= ui.Label("Click on the map");
panel.add(label1);
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(ndvi.select("ndvi"), point, ee.Reducer.mean())
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart);
});
// Add the panel to the ui.root.
ui.root.add(panel); 
var start_date="2022-06-27";
var final_date="2023-03-21";
  // importing satellite imagery
 //filter by date
s2= s2.filterDate(start_date, final_date).filterBounds(geometry);
//calculating ndvi
var ndvi= s2.map(function(image){
   var result= image.normalizedDifference(['B8','B4']).rename("ndvi");
   return image.addBands(result);
});
//finding ndvi maximumu
var prop_ndvi= ndvi.select("ndvi").max();
print(prop_ndvi);
//finding the ndvi of building
var house_crops= prop_ndvi.clip(building);
print(house_crops);
// finding only the house with crops
//var house_vegetation= house_crops.updateMask(house_crops.gt(0.35)).updateMask(house_crops.lt(0.48)).selfMask();
var house_vegetation= house_crops.gte(0.48).selfMask();
var house_area_pixel = house_vegetation
  .multiply(ee.Image.pixelArea());
// Sum the area covered by inundated pixels
// 'bestEffort: true' to reduce processing time. Note - for more accurate results set 
// bestEffort to false and increase 'maxPixels'. 
var house_vegetation_area = house_area_pixel.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: building,
  scale: 10, // native resolution
   //maxPixels: 1e9,
  bestEffort: true
  });
var count= house_area_pixel.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: building,
  scale:10,
  bestEffort:true
});
// finding number of house
count=count.getNumber("ndvi").round();
//print(count,"Number of houses");
// var house_count = ui.Label("Number of house doing roof top farming");
// var number2 = ui.Label('Please wait...'); 
//count.evaluate(function(val){number2.setValue(val)});
//panel.add(house_count);
//panel.add(number2);
  //finding the area
//house_vegetation_area= house_vegetation_area.getNumber("ndvi").round();
//print(house_vegetation_area, 'Area meter square');
// var area = ui.Label("Area of building doing  farming");
// var number1 = ui.Label('Please wait...'); 
// house_vegetation_area.evaluate(function(val){number1.setValue(val+' meter square')});
// panel.add(area);
// panel.add(number1);
Map.addLayer(geometry,styleParam,"Ruhr");
Map.addLayer(ndvi.select("ndvi").max().clip(geometry),visParams_ndvi,"NDVI");
Map.addLayer(building,styleParams,"Building")
//finding the area of house-vegetation
Map.addLayer(house_crops,visParams_ndvi,"Building NDVI");
Map.addLayer(house_vegetation,visParams_ndvi,"Rooftop Greenish");
Map.centerObject(geometry);