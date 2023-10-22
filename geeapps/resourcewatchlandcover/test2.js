//var palettes = require('users/gena/packages:palettes')
//var animation = require('users/resourcewatchlandcover/GEE_scripts:animate');
//matplotlib color ramp examples: https://matplotlib.org/examples/color/colormaps_reference.html
//seaborn color hex lookup
//import seaborn as sns
//>>> pal = sns.color_palette("PuRd", 5)
//>>> pal.as_hex()
var select_labels = ['Cropland','Pastureland','Rangeland',
  'Forest','Non-Forest','Urban',
  'Primary Land','Secondary Land',
  'Agriculture','Primary Forest','Secondary Forest',
  'Primary Non-Forest','Secondary Non-Forest',
  'C3 Annual Crops','C4 Annual Crops','C3 Perennial Crops',
  'C4 Perennial Crops','C3 Nitrogen Fixing Crops','Majority Class'];
var dataset_title = ui.Label({
  value: 'Land-Use Harmonization Baseline Historical Land Use',
  style: {
  fontWeight: 'bold',
  fontSize: '18px'
  }
});
var title = ui.Label({
  value: 'Enter year into the textbox and select land use variable to display. Available years include every year between 850 and 2015.',
  style: {
  fontWeight: 'bold',
  }
});
var variable_description_description = ui.Label({
  value: 'Variable description below:',
  style: {
  fontWeight: 'bold',
  }
});
var variable_description = ui.Label({
  value: 'Variable description will appear upon selection'
});
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '200px',
    position: 'bottom-left',
    maxHeight: '400px'
  }
});
var legend_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '140px',
    position: 'bottom-right',
    maxHeight: '400px'
  }
});
var textbox = ui.Textbox('Enter Year');
// create vizualization parameters
var viz = {min:0, max:1, palette:['feff9c','ffdb00']};
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
//Create legend description
var legendDescription = ui.Label({
value: 'Legend',
style: {
fontWeight: 'bold',
fontSize: '18px',
padding: '0'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Percent Cover',
style: {
//fontWeight: 'bold',
fontSize: '16px',
padding: '0'
}
});
//Set legend max text
var legend_max = ui.Label({
  value: viz['max']*100
});
//Set legend min text
var legend_min = ui.Label({
  value: viz['min']
});
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,150', dimensions:'10x150'},
style: {padding: '1px', position: 'bottom-center'}
});
textbox.onChange(function() {
  var variable = select.getValue();
  var result = 0;
  if (variable == 'Urban'){
    addUrban();
  }
  if (variable == 'Primary Forest'){
    addPrimF();
  }
  if (variable == 'Primary Non-Forest'){
    addPrimNF();
  }
  if (variable == 'Secondary Forest'){
    addSecdF();
  }
  if (variable == 'Secondary Non-Forest'){
    addSecdNF();
  }
  if (variable == 'Rangeland'){
    addRangeland();
  }
  if (variable == 'Pastureland'){
    addPastureland();
  }
  if (variable == 'C3 Annual Crops'){
    addC3ann();
  }
  if (variable == 'C4 Annual Crops'){
    addC4ann();
  }
  if (variable == 'C3 Perennial Crops'){
    addC3per();
  }
  if (variable == 'C4 Perennial Crops'){
    addC4per();
  }
  if (variable == 'C3 Nitrogen Fixing Crops'){
    addC3nfx();
  }
  if (variable == 'Primary Land'){
    addPrimary();
  }
  if (variable == 'Secondary Land'){
    addSecondary();
  }
  if (variable == 'Cropland'){
    addCropland();
  }
  if (variable == 'Agriculture'){
    addAgriculture();
  }
  if (variable == 'Forest'){
    addForest();
  }
  if (variable == 'Non-Forest'){
    addNonForest();
  }
  if (variable == 'Majority Class'){
    addMajorityClass();
  }
  return 'Hey!';
});
var select = ui.Select({
  items: select_labels,
  placeholder: 'Select variable to display'
});
select.onChange(function(){
  var variable = select.getValue();
  var result = 0;
  if (variable == 'Urban'){
    addUrban();
  }
  if (variable == 'Primary Forest'){
    addPrimF();
  }
  if (variable == 'Primary Non-Forest'){
    addPrimNF();
  }
  if (variable == 'Secondary Forest'){
    addSecdF();
  }
  if (variable == 'Secondary Non-Forest'){
    addSecdNF();
  }
  if (variable == 'Rangeland'){
    addRangeland();
  }
  if (variable == 'Pastureland'){
    addPastureland();
  }
  if (variable == 'C3 Annual Crops'){
    addC3ann();
  }
  if (variable == 'C4 Annual Crops'){
    addC4ann();
  }
  if (variable == 'C3 Perennial Crops'){
    addC3per();
  }
  if (variable == 'C4 Perennial Crops'){
    addC4per();
  }
  if (variable == 'C3 Nitrogen Fixing Crops'){
    addC3nfx();
  }
  if (variable == 'Primary Land'){
    addPrimary();
  }
  if (variable == 'Secondary Land'){
    addSecondary();
  }
  if (variable == 'Cropland'){
    addCropland();
  }
  if (variable == 'Agriculture'){
    addAgriculture();
  }
  if (variable == 'Forest'){
    addForest();
  }
  if (variable == 'Non-Forest'){
    addNonForest();
  }
  if (variable == 'Majority Class'){
    addMajorityClass();
  }
  return 'Hey!';
});
//>>> pal = sns.color_palette("YlOrRd", 5)
//>>> pal.as_hex()
var addUrban = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('urban');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#fdc527', '#f89540', '#e66c5c', '#cc4778', '#aa2395', '#7e03a8']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  var label = ee.String(year).cat(' Urban Land');
  variable_description.setValue('Urban: fraction of grid cell of urban land');
  Map.clear();
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addPrimF = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('primf');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#addc30', '#5ec962', '#28ae80', '#21918c', '#2c728e', '#3b528b']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  variable_description.setValue('Primary Forest: fraction of grid cell of forested primary land');
  var label = ee.String(year).cat(' Primary Forest');
  Map.clear()
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addPrimNF = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('primn');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#fdc527', '#f89540', '#e66c5c', '#cc4778', '#aa2395', '#7e03a8']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  Map.add(panel)
  Map.add(legend_panel)
  variable_description.setValue('Primary Non-Forest: fraction of grid cell of non-forested primary land');
  var label = ee.String(year).cat(' Primary Non-Forest');
  Map.addLayer(image, viz, label.getInfo());
};
var addSecdF = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('secdf');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#addc30', '#5ec962', '#28ae80', '#21918c', '#2c728e', '#3b528b']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  Map.add(panel)
  Map.add(legend_panel)
  variable_description.setValue('Secondary Forest: fraction of grid cell of potentially forested secondary land');
  var label = ee.String(year).cat(' Secondary Forest');
  Map.addLayer(image, viz, label.getInfo());
};
var addSecdNF = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('secdn');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#fdc527', '#f89540', '#e66c5c', '#cc4778', '#aa2395', '#7e03a8']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  Map.add(panel)
  Map.add(legend_panel)
  variable_description.setValue('Secondary Non-Forest: fraction of grid cell of potentially non-forested secondary land');
  var label = ee.String(year).cat(' Secondary Non-Forest');
  Map.addLayer(image, viz, label.getInfo());
};
var addRangeland = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('range');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffffa4', '#ffff4a', '#fff400', '#ffb500', '#ff7900', '#ff3c00', '#ff0000', '#c00000']};
  thumbnail.setImage(gradient.visualize(viz));
  variable_description.setValue('Rangeland: fraction of grid cell of rangeland');
  var label = ee.String(year).cat(' Rangeland');
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
//Done
//>>> pal = sns.color_palette("YlOrBr", 5)
//>>> pal.as_hex()
var addPastureland = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('pastr');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  variable_description.setValue('Managed Pastureland: Fraction of grid cell of managed pastureland');
  var label = ee.String(year).cat(' Pastureland');
  Map.clear();
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
}; 
var addC3ann = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3ann');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('C3 Annual Crops: Fraction of grid cell of C3 annual crops');
  var label = ee.String(year).cat(' C3 Annual Crops');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addC4ann = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c4ann');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('C4 Annual Crops: fraction of grid cell of C4 annual crops');
  var label = ee.String(year).cat(' C4 Annual Crops');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addC3per = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3per');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('C3 Perennial Crops: fraction of grid cell of C3 perennial crops');
  var label = ee.String(year).cat(' C3 Perennial Crops');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addC4per = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c4per');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('C4 Perennial Crops: fraction of grid cell of C4 perennial crops');
  var label = ee.String(year).cat(' C4 Perennial Crops');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addC3nfx = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3nfx');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('C3 Nitrogen Fixing Crops: fraction of grid cell of C3 nitrogen fixing crops');
  var label = ee.String(year).cat(' C3 Nitrogen Fixing Crops');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image, viz, label.getInfo());
};
var addPrimary = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  var express = image.expression(
    '(primf+primn)', {
      'primf': image.select('primf'),
      'primn': image.select('primn'),
  });
  // Create a binary mask.
  var mask = express.gt(0);
  // Update the composite mask with the water mask.
  express = express.updateMask(mask);
  viz = {min:0, max:1, palette:['#addc30', '#5ec962', '#28ae80', '#21918c', '#2c728e', '#3b528b']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('Primary Land: fraction of grid cell of primary land. This layer is the sum of the primary forest and primary non-forest layers.');
  var label = ee.String(year).cat(' Primary Land');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(express, viz, label.getInfo());
};
var addSecondary = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  var express = image.expression(
    '(c3ann+c3per+c3nfx+c4ann+c4per+range+pastr+secdf+secdn+urban)', {
      'c3ann': image.select('c3ann'),
      'c3per': image.select('c3per'),
      'c3nfx': image.select('c3nfx'),
      'c4ann': image.select('c4ann'),
      'c4per': image.select('c4per'),
      'range': image.select('range'),
      'pastr': image.select('pastr'),
      'secdf': image.select('secdf'),
      'secdn': image.select('secdn'),
      'urban': image.select('urban')
  });
  // Create a binary mask.
  var mask = express.gt(0);
  // Update the composite mask with the water mask.
  express = express.updateMask(mask);
  viz = {min:0, max:1, palette:['#addc30', '#5ec962', '#28ae80', '#21918c', '#2c728e', '#3b528b']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('Secondary Land: fraction of grid cell of secondary land. This layer is the sum of the urban, rangeland, pastureland, secondary non-forest, secondary forest, C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Secondary Land');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(express, viz, label.getInfo());
};
var addAgriculture = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  var express = image.expression(
    '(c3ann+c3per+c3nfx+c4ann+c4per+range+pastr)', {
      'c3ann': image.select('c3ann'),
      'c3per': image.select('c3per'),
      'c3nfx': image.select('c3nfx'),
      'c4ann': image.select('c4ann'),
      'c4per': image.select('c4per'),
      'range': image.select('range'),
      'pastr': image.select('pastr')
  });
  // Create a binary mask.
  var mask = express.gt(0);
  // Update the composite mask with the water mask.
  express = express.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('Agricultural Land: fraction of grid cell of agricultural land. This layer is the sum of the rangeland, pastureland, C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Agricultural Land');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(express, viz, label.getInfo());
};
var addCropland = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  var express = image.expression(
    '(c3ann+c3per+c3nfx+c4ann+c4per)', {
      'c3ann': image.select('c3ann'),
      'c3per': image.select('c3per'),
      'c3nfx': image.select('c3nfx'),
      'c4ann': image.select('c4ann'),
      'c4per': image.select('c4per')
  });
  // Create a binary mask.
  var mask = express.gt(0);
  // Update the composite mask with the water mask.
  express = express.updateMask(mask);
  viz = {min:0, max:1, palette:['#ffff85', '#ffff07', '#ffb000', '#ff5c00', '#ff0800', '#b30000']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('Cropland: fraction of grid cell of cropland. This layer is the sum of the C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Cropland');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(express, viz, label.getInfo());
};
var addForest = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  var express = image.expression(
    '(primf+secdf)', {
      'primf': image.select('primf'),
      'secdf': image.select('secdf')
  });
  // Create a binary mask.
  var mask = express.gt(0);
  // Update the composite mask with the water mask.
  express = express.updateMask(mask);
  viz = {min:0, max:1, palette:['#addc30', '#5ec962', '#28ae80', '#21918c', '#2c728e', '#3b528b']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('Forest: fraction of grid cell of forested land. This layer is the sum of the primary forest and secondary forest layers.');
  var label = ee.String(year).cat(' Forest');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(express, viz, label.getInfo());
};
var addNonForest = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Historical/Baseline/States');
  var image = imageCollection.filterDate(start, end).first();
  var express = image.expression(
    '(primn+secdn)', {
      'primn': image.select('primn'),
      'secdn': image.select('secdn')
  });
  // Create a binary mask.
  var mask = express.gt(0);
  // Update the composite mask with the water mask.
  express = express.updateMask(mask);
  viz = {min:0, max:1, palette:['#fdc527', '#f89540', '#e66c5c', '#cc4778', '#aa2395', '#7e03a8']};
  thumbnail.setImage(gradient.visualize(viz));
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendTitle);
  legend_panel.add(legend_max);
  legend_panel.add(thumbnail);
  legend_panel.add(legend_min);
  Map.clear();
  variable_description.setValue('Non-Forest: fraction of grid cell of non-forested land. This layer is the sum of the primary non-forest and secondary non-forest layers.');
  var label = ee.String(year).cat(' Non-Forest');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(express, viz, label.getInfo());
};
var addMajorityClass = function(){
  var year = textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LUH_Classified/LUH_Max');
  var image = imageCollection.filterDate(start, end).first();
  var sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="values" extended="false">'+
    '<ColorMapEntry color="#fbf858" quantity="0" label="crops" opacity="0"/>'+ 
    '<ColorMapEntry color="#ff0000" quantity="1" label= "urban"/>'+ 
    '<ColorMapEntry color="#fbf858" quantity="2" label="crops"/>'+ 
    '<ColorMapEntry color="#b18d27" quantity="3" label="rangeland"/>'+ 
    '<ColorMapEntry color="#e49724" quantity="4" label="pasture"/>'+ 
    '<ColorMapEntry color="#146d00" quantity="5" label = "forest"/>'+ 
    '<ColorMapEntry color="#97dd73" quantity="6" label="non-forest"/>'+ 
    '<ColorMapEntry color="#6b00c7" quantity="7" label= "mosaic"/>'+ 
    '</ColorMap>'+
  '</RasterSymbolizer>';
  //return ee.List([image, sld])
  // Create legend title
  var legendMaxClassTitle = ui.Label({
    value: 'Majority Class',
    style: {
      //fontWeight: 'bold',
      fontSize: '16px',
      padding: '0'
    }
  });
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 10px'
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
  var max_class_palette =['#ff0000', '#fbf858', '#b18d27','#e49724','#146d00','#97dd73'];
  // name of the legend
  var names = ['Urban','Cropland','Rangeland','Pastureland','Forest','Non-Forest'];
  legend_panel.clear();
  legend_panel.add(legendDescription);
  legend_panel.add(legendMaxClassTitle);
  // Add color and and names
  for (var i = 0; i < 6; i++) {
    legend_panel.add(makeRow(max_class_palette[i], names[i]));
    } 
  Map.clear();
  variable_description.setValue('Majority: grid cells classified by the majority class. Classes include Urban, Cropland, Rangeland, Pastureland, Forest, and Non-Forest. The cropland category is the sum of the C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crops layers. The forest category is the sum of the primary and secondary forest layers. The non-forest category is the sum of the primary and secondary non-forest layers.');
  var label = ee.String(year).cat(' Majority Class');
  Map.add(panel)
  Map.add(legend_panel)
  Map.addLayer(image.sldStyle(sld),{}, label.getInfo());
};
//ADD WIDGETS TO PANEL
// var split_panel = ui.SplitPanel({
//   firstPanel: panel,
//   secondPanel: legend_panel,
//   style: {maxWidth: '400px'}
// });
panel.add(dataset_title);
panel.add(title);
panel.add(textbox);
panel.add(select);
panel.add(variable_description_description);
panel.add(variable_description);
legend_panel.add(legendDescription);
// legend_panel.add(legendTitle);
// legend_panel.add(legend_max);
// legend_panel.add(thumbnail);
// legend_panel.add(legend_min);
//ui.root.add(panel)
//ui.root.add(legend_panel)
Map.add(panel)
Map.add(legend_panel)
Map.setCenter(-25,20,2)
//ui.root.add(split_panel);