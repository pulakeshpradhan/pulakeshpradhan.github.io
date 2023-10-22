/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var jrc = ee.ImageCollection("JRC/GSW1_2/MonthlyHistory"),
    adm1 = ee.FeatureCollection("users/hkvgee/moz_adm1_line"),
    health = ee.FeatureCollection("users/hkvgee/hotosm_moz_health_facilities_points_shp"),
    education = ee.FeatureCollection("users/hkvgee/hotosm_moz_education_facilities_points_shp"),
    moz_boundaries = ee.FeatureCollection("users/hkvgee/moz_admbnda_adm0_ine_20190607"),
    JRCyearly = ee.ImageCollection("JRC/GSW1_2/YearlyHistory"),
    floodevents = ee.Image("users/hkvgee/wateroccurenceapp_floodevents");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// HydroPC. Water Ocurrence App
// Authors: Nathalia Silva Cancino & Micha Werner (IHE Delft)
Map.style().set('cursor', 'crosshair');
// add the basin outlines
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the basin outlines as a black line
var Outline = empty.paint({
  featureCollection: moz_boundaries,
  color: 1,
  width: 1
});
var adm=empty.paint({
  featureCollection: adm1,
  color: 1,
  width: 2
});
//Map.addLayer(Outline, {palette: '000000'}, 'Admin 0 level',1);
Map.addLayer(adm, {palette: '000000'}, 'Moz. Outline',1);
var countries=ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0")
var country_names = ['Mozambique'];
Map.addLayer(health,{color:'FF5733'}, 'Health Facilities',0)
Map.addLayer(education,{color:'FF3383'}, 'Education Facilities',0)
// Find the country in the countries list
var area = countries.filter(ee.Filter.inList('ADM0_NAME', country_names)).geometry();
Map.centerObject(area,6);
// Global HAND
// Donchyts et al., Global 30m Height Above the Nearest Drainage
var hand = ee.ImageCollection('users/gena/global-hand/hand-100').mosaic().clip(area)
var colors_hand = ['023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b', 'ffffbf', 'fee08b',
'fdae61', 'f46d43', 'd73027'];
Map.addLayer(hand,{palette:colors_hand, min:0,max:10}, 'HAND',0)
//Water observations
//Add water class
var waterclass = ee.ImageCollection(JRCyearly).filterBounds(area);
var visualization = {
  bands: ['waterClass'],
  min: 0.0,
  max: 3.0,
  palette: ['cccccc', 'ffffff', '99d9ea', '0000ff']
};
//Map.addLayer(waterclass, visualization, 'Water Class');
var myjrc=jrc.filterBounds(area);
//Detect observations
var myjrc = myjrc.map(function(img){
// observation is img > 0
var obs = img.gt(0);
return img.addBands(obs.rename('obs').set('system:time_start',img.get('system:time_start')));
});
var myjrc = myjrc.map(function(img){
// if water
var water = img.select('water').eq(2);
return img.addBands(water.rename('onlywater').set('system:time_start',img.get('system:time_start')));
});
var totalWater = myjrc.select("onlywater").sum().toFloat().clip(area);
var maskTW=totalWater.eq(0).not();
totalWater=totalWater.updateMask(maskTW)
var totalObs = myjrc.select("obs").sum().toFloat().clip(area);
Map.addLayer(totalWater,{palette:"grey"},'Maximum Water extent',0 )
//Water classes
var waterclass=waterclass.map(function(img){
  var seasonal=img.select('waterClass').eq(2);
  return img.addBands(seasonal.rename('Seasonal').set('system:time_start',img.get('system:time_start')));
});
var seasonalWater=waterclass.select('Seasonal').sum().toFloat().clip(area);
var maskSe=seasonalWater.eq(0).not();
seasonalWater=seasonalWater.updateMask(maskSe)
Map.addLayer(seasonalWater,{palette:"cyan"},'Seasonal Wet Area' )
var waterclass=waterclass.map(function(img){
  var permanent=img.select('waterClass').eq(3);
  return img.addBands(permanent.rename('Permanent').set('system:time_start',img.get('system:time_start')));
});
var PermanentlWater=waterclass.select('Permanent').sum().toFloat().clip(area);
var maskPermanent=PermanentlWater.eq(0).not();
PermanentlWater=PermanentlWater.updateMask(maskPermanent)
Map.addLayer(PermanentlWater,{palette:"Blue"},'Permanent Wet Area' )
//Water classification legend
//set position of panel
var legend = ui.Panel({
style: {
position: 'top-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Water occurrence',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
//Add the title to the panel
legend.add(legendTitle);
//Creates and styles 1 row of the legend.
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
// Palette with the colors
var palette =['808080','00FFFF','0000FF', 'FF0000'];
// name of the legend
var names = ['Water detected','Seasonal wet area', 'Permanent wet area', 'Flood Events']
// Add color and and names
for (var i = 0; i < 4; i++) {
legend.add(makeRow(palette[i], names[i]));
}
Map.add(legend);
//Legend Facilities
//set position of panel
var legendF = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitleF = ui.Label({
value: 'Facilities',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
//Add the title to the panel
legendF.add(legendTitleF);
//Creates and styles 1 row of the legend.
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
// Palette with the colors
var palette =['FF5733','FF3383'];
// name of the legend
var names = ['Health facilities','Education facilities']
// Add color and and names
for (var i = 0; i < 2; i++) {
legendF.add(makeRow(palette[i], names[i]));
}
Map.add(legendF);
//set position of legend panel
var optionsPanel = ui.Panel({
style: {
position: 'top-left',
padding: '8px 15px'
}
});
var dropboxLabel   = ui.Label({
value: 'Select Province',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
optionsPanel.add(dropboxLabel)
// Create drop down list with provinces
var provinceNames = ['Maputo', 'Maputo City', 'Nampula', 'Niassa', 'Sofala', 'Tete', 'Zambezia', 'Cabo Delgado',
                'Gaza', 'Inhambane', 'Manica'];
var provinceList = provinceNames.map(function(yy) {
    return {
    label: yy,
    value: provinceNames.indexOf(yy)
    };
});
print(provinceList);
var provinceDropbox    = ui.Select(provinceList, 'Province',0); // defaults to first in list
optionsPanel.add(provinceDropbox);
provinceDropbox.onChange(function() {
  var selectedProvinceId = provinceDropbox.getValue();
  print('Selected province ID: ', selectedProvinceId);
  // add code to find geometry and centre/zoom map
  var province=adm1.filter(ee.Filter.eq('ID', selectedProvinceId)).first()
  print(province)
  Map.centerObject(province,8)
});
Map.add(optionsPanel)
//set position of legend panel
var optionsPanel2 = ui.Panel({
style: {
position: 'top-right',
padding: '8px 15px'
}
}); 
var eventLabel   = ui.Label({
value: 'Select Event',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// function to hide/show named layer
var visibleLayer = function(name, visible) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    layers.get(index).setShown(visible);
  } else {
    print('Layer '+name+' not found');
  }
};
// Add a panel to allow layers to be selected 
var layersPanel = ui.Panel({
style: {
position: 'middle-right',
padding: '8px 15px'
}
});
var layerLabel = ui.Label({value: 'Layer Selection',
    style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'}
});
var watercheck=ui.Checkbox('Display Maximum Water extent', false);
var gridLayerCheck = ui.Checkbox('Display Seasonal wet area', true);
var basinLayerCheck = ui.Checkbox('Display Permanent wet area', true);
var healthcheck=ui.Checkbox('Display Health Facilities', false);
var educationcheck=ui.Checkbox('Display Education Facilities', false);
var handcheck=ui.Checkbox('Display HAND', false);
Map.add(layersPanel);
layersPanel.add(layerLabel);
layersPanel.add(watercheck)
layersPanel.add(basinLayerCheck);
layersPanel.add(gridLayerCheck);
layersPanel.add(healthcheck)
layersPanel.add(educationcheck)
layersPanel.add(handcheck)
basinLayerCheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Permanent Wet Area';
  visibleLayer(layerName, checked);
});
gridLayerCheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Seasonal Wet Area';
  visibleLayer(layerName, checked);
});
healthcheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Health Facilities';
  visibleLayer(layerName, checked);
});
educationcheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Education Facilities';
  visibleLayer(layerName, checked);
});
watercheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'Maximum Water extent';
  visibleLayer(layerName, checked);
});
handcheck.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  var layerName = 'HAND';
  visibleLayer(layerName, checked);
});
var bandNames = floodevents.bandNames();
print(bandNames)
var first=floodevents.select(['Idai_2019'])
var second=floodevents.select(['Shire_2015'])
var bandList = bandNames.map(function(yy) {
    return {
    label: yy,
    value: bandNames.indexOf(yy)
    };
});
print(bandList);
var places = {
  Flood_Beira_2019: [34.636117179365655,-19.787211281656543,first,'Flood Extent Idai 2019' ],
  Flood_Shire_2015: [35.19262527325031,-17.331512445683128,second,'Flood Extent Shire 2015'],
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1],9);
    Map.addLayer(places[key][2], {palette:'red'},places[key][3]);
  }
});
optionsPanel2.add(eventLabel)
optionsPanel2.add(select)
Map.add(optionsPanel2)
//set position of legend panel
var optionsPanel3 = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 15px'
}
});
// text
var i_text = ui.Label({
  value: 'Water occurrence calculated using JRC Yearly Water Classification History\n data (https://www.nature.com/articles/sdata201566)\nThe maps show different facets of surface water dynamics.Together the maps show where and when open water was present\non the Earths surface between March 1984 and October 2015.\nThe maps were created from individual full-resolution 185 km2 global reference system II scenes (images) acquired by the Landsat 5,\n7 and 8 satellites. \n\nHealth and education facilities retrieved from https://data.humdata.org/\n\n Height Above Nearest Drainage (HAND) map (doi: 10.1016/j.rse.2008.03.018)\n\nFlood extent maps were calculated using optical and radar images,\nalso it is possible to add shapefiles that represent flood events\n(https://code.earthengine.google.com/de4cddeee9bf5ae816fddc3a430744b4)',
  style: {fontSize: '12px', padding: '0px  0px 0px 0px',whiteSpace:'pre', shown:false},
});
// i button
var test_toggle = function() {
  var current = i_text.style().get('shown');
  if (current === false) {
    i_text.style().set({'shown':true});
  } else {
    i_text.style().set({'shown':false});
  }
};
var i_button = ui.Button('Information', test_toggle);
optionsPanel3.add(i_button)
optionsPanel3.add(i_text)
Map.add(optionsPanel3)
//Add legend HAND
//set position of panel
var legendHAND = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'HAND map',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
//Add the title to the panel
legendHAND.add(legendTitle);
//Creates and styles 1 row of the legend.
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
// Palette with the colors
var palette =['023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b', 'ffffbf', 'fee08b',
'fdae61', 'f46d43', 'd73027'];
// name of the legend
var names = ['0 m','1 m','2 m', '3 m', '4 m','5 m','6 m','7 m', '8 m','9 m','>10 m']
// Add color and and names
for (var i = 0; i < 11; i++) {
legendHAND.add(makeRow(palette[i], names[i]));
}
Map.add(legendHAND);