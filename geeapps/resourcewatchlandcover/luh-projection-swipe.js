// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '6px',
        margin: '10px 0 4px 10px'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {
        margin: '10px 0 4px 4px',
        fontSize: '12px'
      }
    });
    // return the panel
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
};
var breaks = ['≤20','≤40','≤60','≤80','≤100'];
var non_forest_palette = ['#fdc527', '#f89540', '#e66c5c', '#cc4778', '#7e03a8'];
var non_forest_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0088F9" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#fdc527" quantity=".20"/>'+
    '<ColorMapEntry color="#f89540" quantity=".40"/>'+ 
    '<ColorMapEntry color="#e66c5c" quantity=".60"/>'+
    '<ColorMapEntry color="#cc4778" quantity=".80"/>'+
    '<ColorMapEntry color="#7e03a8" quantity="1"/>'+
    '<ColorMapEntry color="#7e03a8" quantity="200"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
var forest_palette = ['#addc30', '#5ec962', '#28ae80', '#21918c', '#3b528b'];
var forest_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0088F9" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#addc30" quantity=".20"/>'+
    '<ColorMapEntry color="#5ec962" quantity=".40"/>'+ 
    '<ColorMapEntry color="#28ae80" quantity=".60"/>'+
    '<ColorMapEntry color="#21918c" quantity=".80"/>'+
    '<ColorMapEntry color="#3b528b" quantity="1.00"/>'+
    '<ColorMapEntry color="#3b528b" quantity="200"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
var cropland_palette = ['#FFE793', '#FEBF5A', '#FD8C3C', '#F43D25', '#C90823'];
var cropland_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0088F9" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#FFE793" quantity=".20"/>'+
    '<ColorMapEntry color="#FEBF5A" quantity=".40"/>'+ 
    '<ColorMapEntry color="#FD8C3C" quantity=".60"/>'+
    '<ColorMapEntry color="#F43D25" quantity=".80"/>'+
    '<ColorMapEntry color="#C90823" quantity="1.00"/>'+
    '<ColorMapEntry color="#C90823" quantity="200"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
var urban_palette = ['#fdd4c2', '#fca082', '#fb694a', '#e32f27', '#b11218'];
var urban_sld = 
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false">'+
    '<ColorMapEntry color="#0088F9" quantity="0" opacity="0"/>'+ 
    '<ColorMapEntry color="#fdd4c2" quantity=".20"/>'+
    '<ColorMapEntry color="#fca082" quantity=".40"/>'+ 
    '<ColorMapEntry color="#fb694a" quantity=".60"/>'+
    '<ColorMapEntry color="#e32f27" quantity=".80"/>'+
    '<ColorMapEntry color="#b11218" quantity="1.00"/>'+
    '<ColorMapEntry color="#b11218" quantity="200"/>'+
    '</ColorMap>'+
  '</RasterSymbolizer>';
var leftmap = ui.Map();
var rightmap = ui.Map();
var linker = ui.Map.Linker([leftmap, rightmap]);
var leftpanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
var rightpanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
var select_labels = ['Cropland','Pastureland','Rangeland',
  'Forest','Non-Forest','Urban',
  'Primary Vegetation','Secondary Land',
  'Agriculture','Primary Forest','Secondary Forest',
  'Primary Non-Forest','Secondary Non-Forest',
  'C3 Annual Crops','C4 Annual Crops','C3 Perennial Crops',
  'C4 Perennial Crops','C3 Nitrogen Fixing Crops','Majority Class'];
var left_dataset_title = ui.Label({
  value: 'Land-Use Harmonization Projected Land Use under IMAGE Model (RCP 2.6)',
  style: {
  fontWeight: 'bold',
  fontSize: '18px'
  }
});
var left_title = ui.Label({
  value: 'Enter year into the textbox and select land use variable to display. Available years include every year between 2015 and 2100.',
  style: {
  fontWeight: 'bold',
  }
});
var left_variable_description_description = ui.Label({
  value: 'Variable description below: (scroll down)',
  style: {
  fontWeight: 'bold',
  }
});
var left_variable_description = ui.Label({
  value: 'Variable description will appear upon selection'
});
var left_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '180px',
    position: 'top-left',
    maxHeight: '350px',
    padding: '0px',
    margin: '0px'
  }
});
var left_legend_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    maxWidth: '380px',
    position: 'bottom-left',
    maxHeight: '120px',
    padding: '0px',
    margin: '1px',
    whiteSpace: 'normal'
  }
});
var left_textbox = ui.Textbox('Enter Year');
// Create legend title
var left_legendTitle = ui.Label({
value: 'Percent Cover:',
  style: {
    //fontWeight: 'bold',
    fontSize: '14px',
    padding: '0',
    position: 'top-center'
  }
});
var right_dataset_title = ui.Label({
  value: 'Land-Use Harmonization Projected Land Use under REMIND-MAGPIE Model (RCP 8.5)',
  style: {
  fontWeight: 'bold',
  fontSize: '18px'
  }
});
var right_title = ui.Label({
  value: 'Enter year into the textbox and select land use variable to display. Available years include every year between 2015 and 2100.',
  style: {
  fontWeight: 'bold',
  }
});
var right_variable_description_description = ui.Label({
  value: 'Variable description below: (scroll down)',
  style: {
  fontWeight: 'bold',
  }
});
var right_variable_description = ui.Label({
  value: 'Variable description will appear upon selection'
});
var right_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '180px',
    position: 'top-right',
    maxHeight: '350px',
    padding: '0px',
    margin: '0px'
  }
});
var right_legend_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    maxWidth: '380px',
    position: 'bottom-right',
    maxHeight: '120px',
    padding: '0px',
    margin: '1px',
    whiteSpace: 'normal'
  }
});
var right_textbox = ui.Textbox('Enter Year');
// Create legend title
var right_legendTitle = ui.Label({
value: 'Percent Cover:',
  style: {
    //fontWeight: 'bold',
    fontSize: '14px',
    padding: '0',
    position: 'top-center'
  }
});
left_textbox.onChange(function() {
  var variable = left_select.getValue();
  var result = 0;
  if (variable == 'Urban'){
    leftaddUrban();
  }
  if (variable == 'Primary Forest'){
    leftaddPrimF();
  }
  if (variable == 'Primary Non-Forest'){
    leftaddPrimNF();
  }
  if (variable == 'Secondary Forest'){
    leftaddSecdF();
  }
  if (variable == 'Secondary Non-Forest'){
    leftaddSecdNF();
  }
  if (variable == 'Rangeland'){
    leftaddRangeland();
  }
  if (variable == 'Pastureland'){
    leftaddPastureland();
  }
  if (variable == 'C3 Annual Crops'){
    leftaddC3ann();
  }
  if (variable == 'C4 Annual Crops'){
    leftaddC4ann();
  }
  if (variable == 'C3 Perennial Crops'){
    leftaddC3per();
  }
  if (variable == 'C4 Perennial Crops'){
    leftaddC4per();
  }
  if (variable == 'C3 Nitrogen Fixing Crops'){
    leftaddC3nfx();
  }
  if (variable == 'Primary Vegetation'){
    leftaddPrimary();
  }
  if (variable == 'Secondary Land'){
    leftaddSecondary();
  }
  if (variable == 'Cropland'){
    leftaddCropland();
  }
  if (variable == 'Agriculture'){
    leftaddAgriculture();
  }
  if (variable == 'Forest'){
    leftaddForest();
  }
  if (variable == 'Non-Forest'){
    leftaddNonForest();
  }
  if (variable == 'Majority Class'){
    leftaddMajorityClass();
  }
  return 'Hey!';
});
var left_select = ui.Select({
  items: select_labels,
  placeholder: 'Select variable to display'
});
left_select.onChange(function(){
  var variable = left_select.getValue();
  var result = 0;
  if (variable == 'Urban'){
    leftaddUrban();
  }
  if (variable == 'Primary Forest'){
    leftaddPrimF();
  }
  if (variable == 'Primary Non-Forest'){
    leftaddPrimNF();
  }
  if (variable == 'Secondary Forest'){
    leftaddSecdF();
  }
  if (variable == 'Secondary Non-Forest'){
    leftaddSecdNF();
  }
  if (variable == 'Rangeland'){
    leftaddRangeland();
  }
  if (variable == 'Pastureland'){
    leftaddPastureland();
  }
  if (variable == 'C3 Annual Crops'){
    leftaddC3ann();
  }
  if (variable == 'C4 Annual Crops'){
    leftaddC4ann();
  }
  if (variable == 'C3 Perennial Crops'){
    leftaddC3per();
  }
  if (variable == 'C4 Perennial Crops'){
    leftaddC4per();
  }
  if (variable == 'C3 Nitrogen Fixing Crops'){
    leftaddC3nfx();
  }
  if (variable == 'Primary Vegetation'){
    leftaddPrimary();
  }
  if (variable == 'Secondary Land'){
    leftaddSecondary();
  }
  if (variable == 'Cropland'){
    leftaddCropland();
  }
  if (variable == 'Agriculture'){
    leftaddAgriculture();
  }
  if (variable == 'Forest'){
    leftaddForest();
  }
  if (variable == 'Non-Forest'){
    leftaddNonForest();
  }
  if (variable == 'Majority Class'){
    leftaddMajorityClass();
  }
  return 'Hey!';
});
right_textbox.onChange(function() {
  var variable = right_select.getValue();
  var result = 0;
  if (variable == 'Urban'){
    rightaddUrban();
  }
  if (variable == 'Primary Forest'){
    rightaddPrimF();
  }
  if (variable == 'Primary Non-Forest'){
    rightaddPrimNF();
  }
  if (variable == 'Secondary Forest'){
    rightaddSecdF();
  }
  if (variable == 'Secondary Non-Forest'){
    rightaddSecdNF();
  }
  if (variable == 'Rangeland'){
    rightaddRangeland();
  }
  if (variable == 'Pastureland'){
    rightaddPastureland();
  }
  if (variable == 'C3 Annual Crops'){
    rightaddC3ann();
  }
  if (variable == 'C4 Annual Crops'){
    rightaddC4ann();
  }
  if (variable == 'C3 Perennial Crops'){
    rightaddC3per();
  }
  if (variable == 'C4 Perennial Crops'){
    rightaddC4per();
  }
  if (variable == 'C3 Nitrogen Fixing Crops'){
    rightaddC3nfx();
  }
  if (variable == 'Primary Vegetation'){
    rightaddPrimary();
  }
  if (variable == 'Secondary Land'){
    rightaddSecondary();
  }
  if (variable == 'Cropland'){
    rightaddCropland();
  }
  if (variable == 'Agriculture'){
    rightaddAgriculture();
  }
  if (variable == 'Forest'){
    rightaddForest();
  }
  if (variable == 'Non-Forest'){
    rightaddNonForest();
  }
  if (variable == 'Majority Class'){
    rightaddMajorityClass();
  }
  return 'Hey!';
});
var right_select = ui.Select({
  items: select_labels,
  placeholder: 'Select variable to display'
});
right_select.onChange(function(){
  var variable = right_select.getValue();
  var result = 0;
  if (variable == 'Urban'){
    rightaddUrban();
  }
  if (variable == 'Primary Forest'){
    rightaddPrimF();
  }
  if (variable == 'Primary Non-Forest'){
    rightaddPrimNF();
  }
  if (variable == 'Secondary Forest'){
    rightaddSecdF();
  }
  if (variable == 'Secondary Non-Forest'){
    rightaddSecdNF();
  }
  if (variable == 'Rangeland'){
    rightaddRangeland();
  }
  if (variable == 'Pastureland'){
    rightaddPastureland();
  }
  if (variable == 'C3 Annual Crops'){
    rightaddC3ann();
  }
  if (variable == 'C4 Annual Crops'){
    rightaddC4ann();
  }
  if (variable == 'C3 Perennial Crops'){
    rightaddC3per();
  }
  if (variable == 'C4 Perennial Crops'){
    rightaddC4per();
  }
  if (variable == 'C3 Nitrogen Fixing Crops'){
    rightaddC3nfx();
  }
  if (variable == 'Primary Vegetation'){
    rightaddPrimary();
  }
  if (variable == 'Secondary Land'){
    rightaddSecondary();
  }
  if (variable == 'Cropland'){
    rightaddCropland();
  }
  if (variable == 'Agriculture'){
    rightaddAgriculture();
  }
  if (variable == 'Forest'){
    rightaddForest();
  }
  if (variable == 'Non-Forest'){
    rightaddNonForest();
  }
  if (variable == 'Majority Class'){
    rightaddMajorityClass();
  }
  return 'Hey!';
});
var leftaddUrban = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('urban');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(urban_palette[i], breaks[i]));
    }
  var label = ee.String(year).cat(' Urban Land');
  left_variable_description.setValue('Urban: fraction of grid cell of urban land');
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(urban_sld), {}, label.getInfo());
};
var leftaddPrimF = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('primf');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  left_variable_description.setValue('Primary Forest: fraction of grid cell of forested primary land');
  var label = ee.String(year).cat(' Primary Forest');
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(forest_sld), {}, label.getInfo());
};
var leftaddPrimNF = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('primn');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  left_variable_description.setValue('Primary Non-Forest: fraction of grid cell of non-forested primary land');
  var label = ee.String(year).cat(' Primary Non-Forest');
  leftmap.addLayer(image.sldStyle(non_forest_sld), {}, label.getInfo());
};
var leftaddSecdF = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('secdf');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  left_variable_description.setValue('Secondary Forest: fraction of grid cell of potentially forested secondary land');
  var label = ee.String(year).cat(' Secondary Forest');
  leftmap.addLayer(image.sldStyle(forest_sld), {}, label.getInfo());
};
var leftaddSecdNF = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('secdn');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  left_variable_description.setValue('Secondary Non-Forest: fraction of grid cell of potentially non-forested secondary land');
  var label = ee.String(year).cat(' Secondary Non-Forest');
  leftmap.addLayer(image.sldStyle(non_forest_sld), {}, label.getInfo());
};
var leftaddRangeland = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('range');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  left_variable_description.setValue('Rangeland: fraction of grid cell of rangeland');
  var label = ee.String(year).cat(' Rangeland');
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var leftaddPastureland = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('pastr');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  left_variable_description.setValue('Managed Pastureland: Fraction of grid cell of managed pastureland');
  var label = ee.String(year).cat(' Pastureland');
  leftmap.clear();
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
}; 
var leftaddC3ann = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3ann');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('C3 Annual Crops: Fraction of grid cell of C3 annual crops');
  var label = ee.String(year).cat(' C3 Annual Crops');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var leftaddC4ann = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c4ann');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('C4 Annual Crops: fraction of grid cell of C4 annual crops');
  var label = ee.String(year).cat(' C4 Annual Crops');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld),{}, label.getInfo());
};
var leftaddC3per = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3per');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('C3 Perennial Crops: fraction of grid cell of C3 perennial crops');
  var label = ee.String(year).cat(' C3 Perennial Crops');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld),{}, label.getInfo());
};
var leftaddC4per = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c4per');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('C4 Perennial Crops: fraction of grid cell of C4 perennial crops');
  var label = ee.String(year).cat(' C4 Perennial Crops');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld),{}, label.getInfo());
};
var leftaddC3nfx = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3nfx');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('C3 Nitrogen Fixing Crops: fraction of grid cell of C3 nitrogen fixing crops');
  var label = ee.String(year).cat(' C3 Nitrogen Fixing Crops');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(cropland_sld),{}, label.getInfo());
};
var leftaddPrimary = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
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
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('Primary Vegetation: fraction of grid cell of primary vegetation. This layer is the sum of the primary forest and primary non-forest layers. Primary vegetation is land that is either naturally forested or un-forested and has not been utilized by humans since the beginning of the model year.');
  var label = ee.String(year).cat(' Primary Vegetation');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(express.sldStyle(forest_sld),{}, label.getInfo());
};
var leftaddSecondary = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
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
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('Secondary Land: fraction of grid cell of secondary land. This layer is the sum of the urban, rangeland, pastureland, secondary non-forest, secondary forest, C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Secondary Land');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(express.sldStyle(non_forest_sld),{}, label.getInfo());
};
var leftaddAgriculture = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
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
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('Agricultural Land: fraction of grid cell of agricultural land. This layer is the sum of the rangeland, pastureland, C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Agricultural Land');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(express.sldStyle(cropland_sld),{}, label.getInfo());
};
var leftaddCropland = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
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
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('Cropland: fraction of grid cell of cropland. This layer is the sum of the C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Cropland');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(express.sldStyle(cropland_sld),{}, label.getInfo());
};
var leftaddForest = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
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
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('Forest: fraction of grid cell of forested land. This layer is the sum of the primary forest and secondary forest layers.');
  var label = ee.String(year).cat(' Forest');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(express.sldStyle(forest_sld), {}, label.getInfo());
};
var leftaddNonForest = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/IMAGE/States');
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
  left_legend_panel.clear();
  left_legend_panel.add(left_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    left_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  leftmap.clear();
  left_variable_description.setValue('Non-Forest: fraction of grid cell of non-forested land. This layer is the sum of the primary non-forest and secondary non-forest layers.');
  var label = ee.String(year).cat(' Non-Forest');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(express.sldStyle(non_forest_sld), {}, label.getInfo());
};
var leftaddMajorityClass = function(){
  var year = left_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LUH_Classified/LUH_Max_IMAGE');
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
  // Create legend title
  var legendMaxClassTitle = ui.Label({
    value: 'Majority Class:',
    style: {
      //fontWeight: 'bold',
      fontSize: '14px',
      padding: '0px'
    }
  });
  //  Palette with the colors
  var max_class_palette =['#ff0000', '#fbf858', '#b18d27','#e49724','#146d00','#97dd73'];
  // name of the legend
  var names = ['Urban','Cropland','Rangeland','Pastureland','Forest','Non-Forest'];
  left_legend_panel.clear();
  left_legend_panel.add(legendMaxClassTitle);
  // Add color and and names
  for (var i = 0; i < 6; i++) {
    left_legend_panel.add(makeRow(max_class_palette[i], names[i]));
    } 
  leftmap.clear();
  left_variable_description.setValue('Majority: grid cells classified by the majority class. Classes include Urban, Cropland, Rangeland, Pastureland, Forest, and Non-Forest. The cropland category is the sum of the C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crops layers. The forest category is the sum of the primary and secondary forest layers. The non-forest category is the sum of the primary and secondary non-forest layers.');
  var label = ee.String(year).cat(' Majority Class');
  leftmap.add(left_panel);
  leftmap.add(left_legend_panel);
  leftmap.addLayer(image.sldStyle(sld),{}, label.getInfo());
};
var rightaddUrban = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('urban');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(urban_palette[i], breaks[i]));
    }
  var label = ee.String(year).cat(' Urban Land');
  right_variable_description.setValue('Urban: fraction of grid cell of urban land');
  rightmap.clear();
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(urban_sld), {}, label.getInfo());
};
var rightaddPrimF = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('primf');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  right_variable_description.setValue('Primary Forest: fraction of grid cell of forested primary land');
  var label = ee.String(year).cat(' Primary Forest');
  rightmap.clear();
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(forest_sld), {}, label.getInfo());
};
var rightaddPrimNF = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('primn');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  right_variable_description.setValue('Primary Non-Forest: fraction of grid cell of non-forested primary land');
  var label = ee.String(year).cat(' Primary Non-Forest');
  rightmap.addLayer(image.sldStyle(non_forest_sld), {}, label.getInfo());
};
var rightaddSecdF = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('secdf');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  right_variable_description.setValue('Secondary Forest: fraction of grid cell of potentially forested secondary land');
  var label = ee.String(year).cat(' Secondary Forest');
  rightmap.addLayer(image.sldStyle(forest_sld), {}, label.getInfo());
};
var rightaddSecdNF = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('secdn');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  right_variable_description.setValue('Secondary Non-Forest: fraction of grid cell of potentially non-forested secondary land');
  var label = ee.String(year).cat(' Secondary Non-Forest');
  rightmap.addLayer(image.sldStyle(non_forest_sld), {}, label.getInfo());
};
var rightaddRangeland = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('range');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_variable_description.setValue('Rangeland: fraction of grid cell of rangeland');
  var label = ee.String(year).cat(' Rangeland');
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddPastureland = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('pastr');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_variable_description.setValue('Managed Pastureland: Fraction of grid cell of managed pastureland');
  var label = ee.String(year).cat(' Pastureland');
  rightmap.clear();
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
}; 
var rightaddC3ann = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3ann');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('C3 Annual Crops: Fraction of grid cell of C3 annual crops');
  var label = ee.String(year).cat(' C3 Annual Crops');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddC4ann = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c4ann');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('C4 Annual Crops: fraction of grid cell of C4 annual crops');
  var label = ee.String(year).cat(' C4 Annual Crops');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddC3per = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3per');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('C3 Perennial Crops: fraction of grid cell of C3 perennial crops');
  var label = ee.String(year).cat(' C3 Perennial Crops');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddC4per = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c4per');
  // Create a binary mask.
  var mask = image.gt(0);
  // Update the composite mask with the water mask.
  image = image.updateMask(mask);
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('C4 Perennial Crops: fraction of grid cell of C4 perennial crops');
  var label = ee.String(year).cat(' C4 Perennial Crops');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddC3nfx = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
  var image = imageCollection.filterDate(start, end).first();
  image = image.select('c3nfx');
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('C3 Nitrogen Fixing Crops: fraction of grid cell of C3 nitrogen fixing crops');
  var label = ee.String(year).cat(' C3 Nitrogen Fixing Crops');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddPrimary = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
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
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('Primary Vegetation: fraction of grid cell of primary vegetation. This layer is the sum of the primary forest and primary non-forest layers. Primary vegetation is land that is either naturally forested or un-forested and has not been utilized by humans since the beginning of the model year.');
  var label = ee.String(year).cat(' Primary Vegetation');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(express.sldStyle(forest_sld), {}, label.getInfo());
};
var rightaddSecondary = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
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
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('Secondary Land: fraction of grid cell of secondary land. This layer is the sum of the urban, rangeland, pastureland, secondary non-forest, secondary forest, C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Secondary Land');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(express.sldStyle(non_forest_sld), {}, label.getInfo());
};
var rightaddAgriculture = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
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
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('Agricultural Land: fraction of grid cell of agricultural land. This layer is the sum of the rangeland, pastureland, C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Agricultural Land');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(express.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddCropland = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
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
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(cropland_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('Cropland: fraction of grid cell of cropland. This layer is the sum of the C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crop layers.');
  var label = ee.String(year).cat(' Cropland');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(express.sldStyle(cropland_sld), {}, label.getInfo());
};
var rightaddForest = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
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
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('Forest: fraction of grid cell of forested land. This layer is the sum of the primary forest and secondary forest layers.');
  var label = ee.String(year).cat(' Forest');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(express.sldStyle(forest_sld), {}, label.getInfo());
};
var rightaddNonForest = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LandUseHarmonization/Projection/REMINDMAGPIE/States');
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
  right_legend_panel.clear();
  right_legend_panel.add(right_legendTitle);
  // Add color and and names
  for (var i = 0; i < 5; i++) {
    right_legend_panel.add(makeRow(non_forest_palette[i], breaks[i]));
    }
  rightmap.clear();
  right_variable_description.setValue('Non-Forest: fraction of grid cell of non-forested land. This layer is the sum of the primary non-forest and secondary non-forest layers.');
  var label = ee.String(year).cat(' Non-Forest');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(express.sldStyle(non_forest_sld), {}, label.getInfo());
};
var rightaddMajorityClass = function(){
  var year = right_textbox.getValue();
  var num_year = ee.Number.parse(year.slice(0,4));
  var start = ee.Date.fromYMD(num_year,1,1);
  var end = ee.Date.fromYMD(num_year,12,31);
  var imageCollection = ee.ImageCollection('users/resourcewatchlandcover/LUH_Classified/LUH_Max_REMIND');
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
  // Create legend title
  var legendMaxClassTitle = ui.Label({
    value: 'Majority Class:',
    style: {
      //fontWeight: 'bold',
      fontSize: '14px',
      padding: '0px'
    }
  });
  //  Palette with the colors
  var max_class_palette =['#ff0000', '#fbf858', '#b18d27','#e49724','#146d00','#97dd73'];
  // name of the legend
  var names = ['Urban','Cropland','Rangeland','Pastureland','Forest','Non-Forest'];
  right_legend_panel.clear();
  right_legend_panel.add(legendMaxClassTitle);
  // Add color and and names
  for (var i = 0; i < 6; i++) {
    right_legend_panel.add(makeRow(max_class_palette[i], names[i]));
    } 
  rightmap.clear();
  right_variable_description.setValue('Majority: grid cells classified by the majority class. Classes include Urban, Cropland, Rangeland, Pastureland, Forest, and Non-Forest. The cropland category is the sum of the C3 annual crops, C4 annual crops, C3 perennial crops, C4 perennial crops, and C3 nitrogen fixing crops layers. The forest category is the sum of the primary and secondary forest layers. The non-forest category is the sum of the primary and secondary non-forest layers.');
  var label = ee.String(year).cat(' Majority Class');
  rightmap.add(right_panel);
  rightmap.add(right_legend_panel);
  rightmap.addLayer(image.sldStyle(sld),{}, label.getInfo());
};
left_panel.add(left_dataset_title);
left_panel.add(left_title);
left_panel.add(left_textbox);
left_panel.add(left_select);
left_panel.add(left_variable_description_description);
left_panel.add(left_variable_description);
leftmap.add(left_panel);
leftmap.add(left_legend_panel);
right_panel.add(right_dataset_title);
right_panel.add(right_title);
right_panel.add(right_textbox);
right_panel.add(right_select);
right_panel.add(right_variable_description_description);
right_panel.add(right_variable_description);
rightmap.add(right_panel);
leftmap.add(right_legend_panel);
leftmap.setCenter(-25,20,2);
var splitpanel = ui.SplitPanel({
  firstPanel: leftmap,
  secondPanel: rightmap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitpanel]);
left_textbox.setValue('2100')
left_select.setValue('Agriculture')
right_textbox.setValue('2100')
right_select.setValue('Agriculture')