var table = ui.import && ui.import("table", "table", {
      "id": "users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008"
    }) || ee.FeatureCollection("users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008");
// Set up general display
//Set up a satellite background
// Map.setOptions('Satellite')
//Center the map to study area
Map.centerObject(table,8)
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');// maybe easier to see...
// header
//App title
var title = ui.Label({
  value: 'Landcover yearly',
  style: {'fontSize': '24px'}
});
//App summary
var text = ui.Label(
  'This tool helps to map the different landcover types identified in my country  Ethiopia   from 2000 to 2020. The Classification is derived from MODIS imagery. ' +
  'Use the tools below to explore changes in landcover annually.       Afework Mekeberiaw  Worku ,Tel +251911675804.',
    {fontSize: '15px'});
var paper = ui.Label({
  value: 'Contact',
  targetUrl: 'https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3B4coLTQRsSjuVEcSXRhyc%2Fw%3D%3D'
});    
// Panels are the main container widgets
var mainPanel = ui.Panel({
  widgets:[title, text, paper],//Adds header and text
  style: {width: '350px'}
});
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select time period to display',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
// You can add widgets to the panel
//Add this new panel to the larger panel we created 
mainPanel.add(intro)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel);
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })
var button = ui.Button('Load')
dropdownPanel.add(yearSelector)
// dropdownPanel.add(monthSelector) // MAY 26: REMOVED THIS BUTTON AS GEE GROUP SAID IGBP IS ONLY BY YEAR!!!
dropdownPanel.add(button)
// Let's add a dropdown with the years
var years = ee.List.sequence(2001, 2019)
// var months = 1;  
var months = ee.List.sequence(1, 12)
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings =  months.map(function(month){
  return ee.Number(month).format('%02d')
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('select a year')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('select a month')
})
// var loadComposite = function() {
//   var modC = ee.ImageCollection ('MODIS/006/MCD12Q1');
//   var year = yearSelector.getValue()
//   var month = 1; // monthSelector.getValue()
//   var startDate = (ee.Number.parse(year), 1)
//   // var endDate = startDate.advance(1)
//   var filtered = modC.filterDate(startDate)
var loadComposite = function() {
  var modC = ee.ImageCollection ('MODIS/006/MCD12Q1');
  var year = yearSelector.getValue()
  var month =  monthSelector.getValue()
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number.parse(month), 1)
  var endDate = startDate.advance(1, 'month')
  var filtered = modC.filterDate(year) // USED THIS CODE NOW BCOS IGBP SAID ONLY NEED TO CHOOSE YEAR!! AND THE PROBLEM WITH 
  // MONTHS NOT CHANGING MAP (EXCEPT JAN) HAS BEEN SOLVED!!! PRAISES Be!
// var loadComposite = function() {
//   var modC = ee.ImageCollection ('MODIS/006/MCD12Q1');
//   var year = yearSelector.getValue()
//   var month =  monthSelector.getValue()
//   var startDate = ee.Date.fromYMD(
//     ee.Number.parse(year), ee.Number.parse(month), 1)
//   var endDate = startDate.advance(1, 'month')
//   var filtered = modC.filterDate(startDate, endDate)
  print(modC)
  var Myge = ee.Image(filtered.first()).select('LC_Type1')
  var clipped05 = filtered.median().clip(table) 
  var iCover = filtered.select ("LC_Type1")
  print(iCover, 'dd')// in printing did I see that it's not an image collection. It has 0 elements!!!
  print(clipped05, 'Cov') // in printing I see it has ZERO bands!
  var LCvis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '980e0a', 'ea9d0b',  'f11f0e', 'f10ee3', '1ff10e',  '959040',
    '40957a', '4f292f', 'df425b', 'e48e9c', '8e6617', 'ebee16', 'ff6d4c', 'ffff63',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
}
  // var layerName = 'Land Cover ' + year 
  var layerName = 'Land Cover ' + year + '-' + month
  var tango = iCover.mean().clip(table);
  Map.addLayer(tango, LCvis, layerName)
  Map.add(legend)// had to put the legend here bcos the lefgend was disappearing when I did the Reset. TYL!!!!!
}
button.onClick(loadComposite)
Map.setCenter(39, 10, 8)
ui.root.add(mainPanel);
var Rbutton = ui.Button('Reset')
dropdownPanel.add(Rbutton)
var remove = function(){
Map.clear()
//Set up a satellite background
Map.setOptions('Satellite')
}
Rbutton.onClick(remove);
// LEGEND TIME
// var BAND_NAME = 'Land_Cover_Type_1';
// var image = ee.Image('MODIS/051/MCD12Q1/2001_01_01')
//             .select(BAND_NAME);
// // Create the panel for the legend items.
// var legend = ui.Panel({
//   style: {
//     position: 'bottom-left',
//     padding: '8px 15px'
//   }
// });
// // Create and add the legend title.
// var legendTitle = ui.Label({
//   value: 'MODIS Land Cover',
//   style: {
//     fontWeight: 'bold',
//     fontSize: '18px',
//     margin: '0 0 4px 0',
//     padding: '0'
//   }
// });
// legend.add(legendTitle);
// var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
// legend.add(loading);
// // Creates and styles 1 row of the legend.
// var makeRow = function(color, name) {
//   // Create the label that is actually the colored box.
//   var colorBox = ui.Label({
//     style: {
//       backgroundColor: '#' + color,
//       // Use padding to give the box height and width.
//       padding: '8px',
//       margin: '0 0 4px 0'
//     }
//   });
//   // Create the label filled with the description text.
//   var description = ui.Label({
//     value: name,
//     style: {margin: '0 0 4px 6px'}
//   });
//   return ui.Panel({
//     widgets: [colorBox, description],
//     layout: ui.Panel.Layout.Flow('horizontal')
//   });
// };
// // Get the list of palette colors and class names from the image.
// image.toDictionary().select([BAND_NAME + ".*"]).evaluate(function(result) {
//   var palette = result[BAND_NAME + "_class_palette"];
//   var names = result[BAND_NAME + "_class_names"];
//   loading.style().set('shown', false);
//   for (var i = 0; i < names.length; i++) {
//     legend.add(makeRow(palette[i], names[i]));
//   }
//   // Map.addLayer(image.clip(table), {min: 0, max: 17, palette: palette}, 'IGBP classification');
// });
//Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
//Create legend title
var legendTitle = ui.Label({
  value: 'Land cover Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
//Add the title to the panel
legend.add(legendTitle);
//Create and style 1 row of the legend.
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette =['980e0a', 'ea9d0b',  'f11f0e', 'f10ee3', '1ff10e',  '959040',
    '40957a', '4f292f', 'df425b', 'e48e9c', '8e6617', 'ebee16', 'ff6d4c', 'ffff63',
    '69fff8', 'f9ffa4', '1c0dff'];
//Identify names within the legend
var names = [ 'Evergreen Needleleaf Forests', 'Evergreen Broadleaf Forests', 'Deciduous Needleleaf Forests', 'Deciduous Broadleaf Forests',
'Closed Shrublands ', 'Open Shrublands', 'Broadleaf', 'Woody Savannas', 'Savannas', 'Grasslands',
      'Permanent Wetlands', 'Croplands', 'Urban and Built-up Lands','Cropland/Natural Vegetation', 'Permanent Snow and Ice','Barren', 'Water'];
//Add color and names
for (var i = 0; i < 17; i++) {// Make it one bigger than last class
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add the legend to the map, not to the panel.
// Map.add(legend);