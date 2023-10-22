///////////////////////////////////////////////////////////////
//                    1) Import Layers of Interest           //
///////////////////////////////////////////////////////////////
var ResNet = ee.Image("users/lexisgis/Wetlands_Parkland_Grassland_NR/ResNET_PGNR")
var SA = ee.FeatureCollection("users/lexisgis/Alberta/PGNR")
// var RF = ee.Image("users/lexisgis/Wetlands_Parkland_Grassland_NR/RF_PGNR")
// var SVM = ee.Image("users/lexisgis/Wetlands_Parkland_Grassland_NR/SVM_PGNR")
///////////////////////////////////////////////////////////////
//      2) Set up map appearance and app layers              //
///////////////////////////////////////////////////////////////
//Set up a satellite background
Map.setOptions('HYBRID')
//Center the map to Parkland Grassland Natural Region of Alberta
Map.centerObject(SA,7)
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
// Set up map colour scheme for wetlands (Marsh, Open Water, Swamp)
var Apal =['E53935', '0000ff','2e7d32'];
//Add layers to Map
// set styling
var styling = {color: 'F5F5F5', fillColor: '00000000', width: 1.5};
//Set layer visibility to false
var extresnet = ui.Map.Layer(ResNet, {min:1, max:3, palette:Apal}, 'Wetland Inventory',false)
//Add layers to map
Map.addLayer(SA.style(styling),{},'Study Area');
Map.add(extresnet)
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Alberta Parkland & Grassland Region Wetland Inventory', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'This app presents a large-scale wetland inventory of the Parkland and Grassland Natural Region in Alberta. The product was developed using a deep learning Convolutional Neural Network (CNN) model.' + 
  'A key objective of the study was to compare the performance of the ResU-Net model with two shallow learning techniques (namely Random Forest and Support Vector Machine).', 
   {fontSize: '15px'});
// Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  })]);
 //Add this new panel to the larger panel we created 
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel) 
var link = ui.Label(
    'Based on the outcomes of a recent study (Onojeghuo et al. 2021), a 25-band multi-seasonal (summer/fall months of 2017 to 2020) image stack was selected for this study.' + 
    'This dataset comprised of S1 and S2 images (near-infrared (band 8), shortwave infrared (band 11), dual-polarization vertical-horizontal (VH) bands), and ALOS-derived Topographic Wetness Index (TWI).' + 
    'The dataset used used as input data of the ResU-Net model and the two shallow learning models (RF and SVM) for wetland-cover classification.',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Input variables explored in the study.', {fontSize: '15px', fontWeight: 'bold'}), link]);
panel.add(linkPanel);
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  })]);
 //Add this new panel to the larger panel we created 
panel.add(intro)
var link = ui.Label(
    'Average F1 Score = 0.77; Marsh F1 Score = 0.64; Open Water F1 Score = 0.73; Swamp F1 Score = 0.9; & Upland F1 Score = 0.82.' + 
    ' Overall Accuracy = 74%.',{fontSize: '12px'});
var linkPanel = ui.Panel(
    [ui.Label('Accuracy assessment results (summary)', {fontWeight: 'bold'}), link]);
panel.add(linkPanel);
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
///////////////////////////////////////////////////////////////
//      4) Add legend of Prediction to Map Layout            //
/////////////////////////////////////////////////////////////// 
//Add legend of Prediction to Map Layout
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
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
// Legend palette with the colors
var palette =['E53935', '0000ff','2e7d32'];
// Name of the legend
var names = ['Marsh', 'Open Water', 'Swamp'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);
//-----------------------------------------------------------------------------------------------------------------------------------
// // Map.setOptions('Gray', {'Gray map': GRAYMAP})
// var GRAYMAP = [
//   {
//     featureType: 'administrative',
//     elementType: 'all',
//     stylers: [{visibility: 'on'}]
//   },
//   {
//     featureType: 'administrative',
//     elementType: 'labels.text.fill',
//     stylers: [{saturation: -100 }]
//   },
//   { // Dial down the label darkness.
//     elementType: 'labels',
//     stylers: [ { lightness: 20 } ]
//   },
//   {
//     featureType: 'landscape',
//     elementType: 'all',
//     stylers: [{color: '#000000'}, {visibility: 'on'}]
//   },
//   {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
//     featureType: 'road',
//     elementType: 'all',
//     stylers: [{saturation: -100}, {lightness: 45}]
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.fill',
//     stylers: [{color: '#ffffff'}]
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#eaeaea'}]
//   },
//   {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#dedede'}]
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.icon',
//     stylers: [{visibility: 'off'}]
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'all',
//     stylers: [{visibility: 'off'}]
//   },
//   {
//     featureType: 'road.arterial',
//     elementType: 'labels.icon',
//     stylers: [{visibility: 'off'}]
//   },
//   {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
//   {
//     featureType: 'water',
//     elementType: 'all',
//     stylers: [{color: '#434343'}, {visibility: 'on'}]
//   }
// ]; 
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//4.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'Wetland Extent',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var extCheck = ui.Checkbox('ResNet Prediction').setValue(false); //false = unchecked
// var extCheck2 = ui.Checkbox('2010').setValue(false);
// var extCheck3 = ui.Checkbox('2020').setValue(false);
//Now do the same for the Simard Height map
// var heightLab = ui.Label({value:'Mangrove Height (Simard et al. 2019)',
// style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
// });
var heightCheck = ui.Checkbox('ResNet Prediction').setValue(false);
//4.3) Create legends
//The following code creates legends we can add to the panel
//Extent Legend
///////////////
// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
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
// //Create a palette using the same colors we used for each extent layer
// var paletteMAPa = [
// '6D63EB',//2000
// '34BFDE',//2010
// '71F4B7',//2020
// ];
// // Name of each legend value
// var namesa = ['2000','2010','2020']; 
// // Add color and names to legend
// for (var i = 0; i < 3; i++) {
//   extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
//   }  
//Height Legend
///////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
// function makeLegend2 (viridis) {
//   var lon = ee.Image.pixelLonLat().select('longitude');
//   var gradient = lon.multiply((viridis.max-viridis.min)/100.0).add(viridis.min);
//   var legendImage = gradient.visualize(viridis);
//   var thumb = ui.Thumbnail({
//     image: legendImage, 
//     params: {bbox:'0,0,100,8', dimensions:'256x20'},  
//     style: {position: 'bottom-center'}
//   });
//   var panel2 = ui.Panel({
//     widgets: [
//       ui.Label('5 m'), 
//       ui.Label({style: {stretch: 'horizontal'}}), 
//       ui.Label('45 m')
//     ],
//     layout: ui.Panel.Layout.flow('horizontal'),
//     style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
//   });
//   return ui.Panel().add(panel2).add(thumb);
// }
//4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(extLabel)
      .add(extCheck)
      // .add(extCheck2)
      // .add(extCheck3)
      // .add(extentLegend)
      // .add(heightLab)
      // .add(makeLegend2(viridis))
      // .add(heightCheck)
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent 2000
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  extresnet.setShown(checked)
  })
}
doCheckbox();
// //Extent 2010
// var doCheckbox2 = function() {
//   extCheck2.onChange(function(checked){
//   ext2010.setShown(checked)
//   })
// }
// doCheckbox2();
// //Extent 2020
// var doCheckbox3 = function() {
//   extCheck3.onChange(function(checked){
//   ext2020.setShown(checked)
//   })
// }
// doCheckbox3();
// //Simard Height Data
// var doCheckbox4 = function() {
//   heightCheck.onChange(function(checked){
//   simHBA.setShown(checked)
//   })
// }
// doCheckbox4();