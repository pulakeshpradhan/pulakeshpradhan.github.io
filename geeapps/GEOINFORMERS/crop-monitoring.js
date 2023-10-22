var table = ui.import && ui.import("table", "table", {
      "id": "users/GEOINFORMERS/india_telengana_GeoLatlong"
    }) || ee.FeatureCollection("users/GEOINFORMERS/india_telengana_GeoLatlong"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/GEOINFORMERS/Mar1w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Mar1w_Harvest-2019BRNN"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/GEOINFORMERS/Mar1w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar1w_Harvest-2019MPNN"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/GEOINFORMERS/Mar1w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar1w_Harvest-2019UPNN"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/GEOINFORMERS/Mar1w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/Mar1w_Harvest-2019WB"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019HR"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019PBN"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/GEOINFORMERS/Mar2w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Mar2w_Harvest-2019BRNN"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/GEOINFORMERS/Mar2w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar2w_Harvest-2019MPNN"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/GEOINFORMERS/Mar2w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar2w_Harvest-2019UPNN"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/GEOINFORMERS/Mar2w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/Mar2w_Harvest-2019WB"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/GEOINFORMERS/May2w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/May2w_Harvest-2019HR"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/GEOINFORMERS/May3w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/May3w_Harvest-2019BRNN"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/GEOINFORMERS/May3w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/May3w_Harvest-2019UPNN"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/GEOINFORMERS/May3w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/May3w_Harvest-2019WB"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/GEOINFORMERS/May3w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/May3w_Harvest-2019HR"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/GEOINFORMERS/May4w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/May4w_Harvest-2019BRNN"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/GEOINFORMERS/May4w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/May4w_Harvest-2019HR"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/GEOINFORMERS/May4w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/May4w_Harvest-2019UPNN"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/GEOINFORMERS/May4w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/May4w_Harvest-2019WB"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/GEOINFORMERS/Mar3w_Harvest-20191WB"
    }) || ee.Image("users/GEOINFORMERS/Mar3w_Harvest-20191WB"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/GEOINFORMERS/Mar3w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Mar3w_Harvest-2019BRNN"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/GEOINFORMERS/Mar3w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar3w_Harvest-2019MPNN"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/GEOINFORMERS/Mar3w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar3w_Harvest-2019UPNN"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/GEOINFORMERS/Mar4w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Mar4w_Harvest-2019BRNN"),
    image25 = ui.import && ui.import("image25", "image", {
      "id": "users/GEOINFORMERS/Mar4w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar4w_Harvest-2019MPNN"),
    image26 = ui.import && ui.import("image26", "image", {
      "id": "users/GEOINFORMERS/Mar4w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/Mar4w_Harvest-2019PBN"),
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/GEOINFORMERS/Mar4w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Mar4w_Harvest-2019UPNN"),
    image28 = ui.import && ui.import("image28", "image", {
      "id": "users/GEOINFORMERS/Mar4w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/Mar4w_Harvest-2019WB"),
    image29 = ui.import && ui.import("image29", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019BRNN"),
    image30 = ui.import && ui.import("image30", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019HR"),
    image31 = ui.import && ui.import("image31", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019PBN"),
    image32 = ui.import && ui.import("image32", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019UPNN"),
    image33 = ui.import && ui.import("image33", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr1w_Harvest-2019WB"),
    image34 = ui.import && ui.import("image34", "image", {
      "id": "users/GEOINFORMERS/Apr1w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr1w_Harvest-2019MPNN"),
    image35 = ui.import && ui.import("image35", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr2w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr2w_Harvest-2019BRNN"),
    image36 = ui.import && ui.import("image36", "image", {
      "id": "users/GEOINFORMERS/Harvest2019/Apr2w_Harvest-2019HR1"
    }) || ee.Image("users/GEOINFORMERS/Harvest2019/Apr2w_Harvest-2019HR1"),
    image37 = ui.import && ui.import("image37", "image", {
      "id": "users/GEOINFORMERS/Apr2w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr2w_Harvest-2019MPNN"),
    image38 = ui.import && ui.import("image38", "image", {
      "id": "users/GEOINFORMERS/Apr2w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/Apr2w_Harvest-2019PBN"),
    image39 = ui.import && ui.import("image39", "image", {
      "id": "users/GEOINFORMERS/Apr2w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr2w_Harvest-2019UPNN"),
    image40 = ui.import && ui.import("image40", "image", {
      "id": "users/GEOINFORMERS/Apr2w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/Apr2w_Harvest-2019WB"),
    image41 = ui.import && ui.import("image41", "image", {
      "id": "users/GEOINFORMERS/Apr3w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Apr3w_Harvest-2019BRNN"),
    image42 = ui.import && ui.import("image42", "image", {
      "id": "users/GEOINFORMERS/Apr3w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr3w_Harvest-2019MPNN"),
    image43 = ui.import && ui.import("image43", "image", {
      "id": "users/GEOINFORMERS/Apr3w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr3w_Harvest-2019UPNN"),
    image44 = ui.import && ui.import("image44", "image", {
      "id": "users/GEOINFORMERS/Apr3w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/Apr3w_Harvest-2019PBN"),
    image45 = ui.import && ui.import("image45", "image", {
      "id": "users/GEOINFORMERS/Apr3w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/Apr3w_Harvest-2019HR"),
    image46 = ui.import && ui.import("image46", "image", {
      "id": "users/GEOINFORMERS/Apr4w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/Apr4w_Harvest-2019BRNN"),
    image47 = ui.import && ui.import("image47", "image", {
      "id": "users/GEOINFORMERS/Apr4w_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr4w_Harvest-2019MPNN"),
    image48 = ui.import && ui.import("image48", "image", {
      "id": "users/GEOINFORMERS/Apr4w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/Apr4w_Harvest-2019PBN"),
    image49 = ui.import && ui.import("image49", "image", {
      "id": "users/GEOINFORMERS/Apr4w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/Apr4w_Harvest-2019HR"),
    image50 = ui.import && ui.import("image50", "image", {
      "id": "users/GEOINFORMERS/Apr4w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/Apr4w_Harvest-2019UPNN"),
    image51 = ui.import && ui.import("image51", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019BRNN"),
    image52 = ui.import && ui.import("image52", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019HR"),
    image53 = ui.import && ui.import("image53", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019PBN"),
    image54 = ui.import && ui.import("image54", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019UPNN"),
    image55 = ui.import && ui.import("image55", "image", {
      "id": "users/GEOINFORMERS/May1w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/May1w_Harvest-2019WB"),
    image56 = ui.import && ui.import("image56", "image", {
      "id": "users/GEOINFORMERS/May2w_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/May2w_Harvest-2019BRNN"),
    image57 = ui.import && ui.import("image57", "image", {
      "id": "users/GEOINFORMERS/May2w_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/May2w_Harvest-2019HR"),
    image58 = ui.import && ui.import("image58", "image", {
      "id": "users/GEOINFORMERS/May2w_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/May2w_Harvest-2019UPNN"),
    image59 = ui.import && ui.import("image59", "image", {
      "id": "users/GEOINFORMERS/May2w_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/May2w_Harvest-2019WB"),
    image60 = ui.import && ui.import("image60", "image", {
      "id": "users/GEOINFORMERS/JunFF_Harvest-2019BRNN"
    }) || ee.Image("users/GEOINFORMERS/JunFF_Harvest-2019BRNN"),
    image61 = ui.import && ui.import("image61", "image", {
      "id": "users/GEOINFORMERS/JunFF_Harvest-2019HR"
    }) || ee.Image("users/GEOINFORMERS/JunFF_Harvest-2019HR"),
    image62 = ui.import && ui.import("image62", "image", {
      "id": "users/GEOINFORMERS/JunFF_Harvest-2019MPNN"
    }) || ee.Image("users/GEOINFORMERS/JunFF_Harvest-2019MPNN"),
    image63 = ui.import && ui.import("image63", "image", {
      "id": "users/GEOINFORMERS/JunFF_Harvest-2019PBN"
    }) || ee.Image("users/GEOINFORMERS/JunFF_Harvest-2019PBN"),
    image64 = ui.import && ui.import("image64", "image", {
      "id": "users/GEOINFORMERS/JunFF_Harvest-2019UPNN"
    }) || ee.Image("users/GEOINFORMERS/JunFF_Harvest-2019UPNN"),
    image65 = ui.import && ui.import("image65", "image", {
      "id": "users/GEOINFORMERS/JunFF_Harvest-2019WB"
    }) || ee.Image("users/GEOINFORMERS/JunFF_Harvest-2019WB"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/GEOINFORMERS/Harvest2019/IGP_and_MP"
    }) || ee.FeatureCollection("users/GEOINFORMERS/Harvest2019/IGP_and_MP"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/GEOINFORMERS/Harvest2019/IGP_and_MP_Districts"
    }) || ee.FeatureCollection("users/GEOINFORMERS/Harvest2019/IGP_and_MP_Districts"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
var region4 = table.filter(ee.Filter.eq('NAME_1', 'Punjab')); //subset AOI
var region1 = table.filter(ee.Filter.eq('NAME_1', 'Haryana')); //subset AOI
var region2 = table.filter(ee.Filter.eq('NAME_1', 'Uttar Pradesh')); //subset AOI
var region3 = table.filter(ee.Filter.eq('NAME_1', 'Madhya Pradesh')); //subset AOI
var region5 = table.filter(ee.Filter.eq('NAME_1', 'Bihar')); //subset AOI
var region6 = table.filter(ee.Filter.eq('NAME_1', 'West Bengal')); //subset AOI
//var region7 = table.filter(ee.Filter.eq('NAME_1', 'Delhi')); //subset AOI
var region = region1.merge(region2).merge(region3).merge(region4).merge(region5).merge(region6);
Map.centerObject(region, 5);
var Mar1w = ee.ImageCollection.fromImages([image2, image3, image7, image14, image15]).mosaic();
var Mar2w = ee.ImageCollection.fromImages([image4, image5, image6, image8, image13]).mosaic();
var Mar3w = ee.ImageCollection.fromImages([image20, image21, image22, image23]).mosaic();
var Mar4w = ee.ImageCollection.fromImages([image24, image25, image26, image27, image28]).mosaic();
var Apr1w = ee.ImageCollection.fromImages([image29, image30, image31, image32, image33, image34]).mosaic();
var Apr2w = ee.ImageCollection.fromImages([image35, image36, image37, image38, image39, image40]).mosaic();
var Apr3w = ee.ImageCollection.fromImages([image41, image42, image43, image44, image45]).mosaic();
var Apr4w = ee.ImageCollection.fromImages([image46, image47, image48, image49, image50]).mosaic();
var May1w = ee.ImageCollection.fromImages([image51, image52,image53, image54, image55]).mosaic();
var May2w = ee.ImageCollection.fromImages([image56, image57,image58, image59]).mosaic();
var May3w = ee.ImageCollection.fromImages([image9, image10, image11, image12]).mosaic();
var May4w = ee.ImageCollection.fromImages([image16, image17, image18, image19]).mosaic();
var JuneFF = ee.ImageCollection.fromImages([image60, image61, image62,image63, image64, image65]).mosaic();
//Map.addLayer(Apr2w, {palette: 'F1948A'}, 'Apr 08-15');
//var Apr3w = ee.ImageCollection.fromImages([image2, image8]).mosaic();
Map.addLayer(Mar1w, {palette: 'D2B4DE'}, 'Mar 01-07');
Map.addLayer(Mar2w, {palette: 'BB8FCE'}, 'Mar 08-15');
Map.addLayer(Mar3w, {palette: '8E44AD'}, 'Mar 16-23');
Map.addLayer(Mar4w, {palette: '5B2C6F'}, 'Mar 24-31');
Map.addLayer(Apr1w, {palette: 'F5B7B1'}, 'Apr 01-07');
Map.addLayer(Apr2w, {palette: 'F1948A'}, 'Apr 08-15');
Map.addLayer(Apr3w, {palette: 'E74C3C'}, 'Apr 16-23');
Map.addLayer(Apr4w, {palette: 'F8C471'}, 'Apr 24-31');
Map.addLayer(May1w, {palette: '85C1E9'}, 'May 01-07');
Map.addLayer(May2w, {palette: '5DADE2'}, 'May 08-15');
Map.addLayer(May3w, {palette: '1F618D'}, 'May 16-23');
Map.addLayer(May4w, {palette: '7DCEA0'}, 'May 24-31');
Map.addLayer(JuneFF, {palette: '186A3B'}, 'June 01-15');
/*************************
 * Add Legends
 * **********************/
 // set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Crop Harvesting Progression',
  style: {
    fontWeight: 'bold',
    fontSize: '13px',
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
var palette =['E8DAEF', 'BB8FCE', '8E44AD', '5B2C6F', 'F5B7B1', 'F1948A', 'E74C3C', 'F8C471', '85C1E9', '5DADE2', '1F618D', '7DCEA0', '186A3B']
 // 'fdd0be'
// name of the legend
var names = ['March 01-07', 'March 08-15', 'March 16-23', 'March 24-30', 'April 01-07', 'April 08-15', 'April 16-23', 'April 24-30', 'May 01-07', 'May 08-15', 'May 16-23', 'May 24-30', 'Crop Continuing after May'];
 // 'Lentil',
// Add color and and names
for (var i = 0; i < 13; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend); 
//add India stats Bnd
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: region,
  color: 1,
  width: 0.25
});
Map.addLayer(outline, {palette: 'black'}, 'State Boundary');
/////////////////////////////////////////////////////////////
// Create the title label.
var title = ui.Label('Crop Monitoring Tool');
title.style({fontSize: '14px'}).set('position', 'top-center');
Map.add(title);
/////////////////////////////////////////////////////////////
var states = ee.FeatureCollection("users/GEOINFORMERS/Harvest2019/IGP_and_MP");
var counties = ee.FeatureCollection("users/GEOINFORMERS/Harvest2019/IGP_and_MP_Districts");
//Map.addLayer(outline, {palette: 'black'}, 'State Boundary');
Map.setCenter(79.16, 27.8, 6);
var statesNames = states.aggregate_array('NAME')
var getCounties = function(state) {
  // Given a state get all counties
  var feat = ee.Feature(states.filterMetadata('NAME', 'equals', state).first())
  print(feat);
  var statefp = ee.String(feat.get('STATEFP'))
  print(statefp);
  var filteredCounties = counties.filterMetadata('STATFP', 'equals', statefp)
  print(filteredCounties);
  var filteredCountiesNames = filteredCounties.aggregate_array('NAME')
  return ee.List(filteredCountiesNames)
}
var lblTitle = ui.Label({
    value: 'Select State and District',
    style: {fontSize: '14px', fontWeight: 'bold','color':'E67E22'}
  });
// Empty Dropdowns
var statesDD = ui.Select([], 'Loading..')
var countiesDD = ui.Select([], 'Waiting for a State..')
// Load states
statesNames.evaluate(function(states){
  statesDD.items().reset(states)
  statesDD.setPlaceholder('Select a State')
  statesDD.onChange(function(state){
    // once you select a state (onChange) get all counties and fill the dropdown
    countiesDD.setPlaceholder('Loading...')
    var counties = getCounties(state)
    counties.evaluate(function(countiesNames){
      countiesDD.items().reset(countiesNames)
      countiesDD.setPlaceholder('Select a District')
    })
  })
})
var add = ui.Button('Go To District')
add.onClick(function(){
  var name = countiesDD.getValue()
  var county = ee.Feature(counties.filterMetadata('NAME', 'equals', name).first())
  //add India stats Bnd
  var empty = ee.Image().byte();
  var outline1 = empty.paint({
    featureCollection: county,
    color: 'E67E22',
    width: 3
});
  Map.addLayer(outline1, {}, name);
  Map.centerObject(county, 9);
})
ui.root.insert(0, ui.Panel([lblTitle,statesDD, countiesDD, add]));