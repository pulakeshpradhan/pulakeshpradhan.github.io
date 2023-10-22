//Setting visualization parameters for Landsat-7 (l7) and
// Landsat-8 (l8) false color composite (fcc) 
var l7_fcc_vis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var l8_fcc_vis = {min: 0, max: 3000, bands: ['B5', 'B4', 'B3']};
var l5_fcc_vis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
//Setting up region of interest
//var roi = ee.Geometry.Point([54.420933, 24.455191])
//set the uploaded Uttarakhand state boundary as ROI
//var roi = ee.FeatureCollection("projects/ee-rahulaus/assets/UAE_3Site");
var roi = ee.FeatureCollection("users/rahulaus/AOI_UAE");
          //.buffer(5000);
Map.addLayer(roi, {}, "ROI", false);
Map.setOptions('Satellite');
Map.centerObject(roi, 10);
//Filtering L5 data for year 1985
var L5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
        .filterDate('1985-01-01', '1985-12-31')
        .filterBounds(roi)
        .filterMetadata('CLOUD_COVER', 'less_than', 30);
//Generate median (cloud free) image
var L5_1985_median_image = ee.Image(L5.median());
//Filtering L5 data for year 1995
var L5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
        .filterDate('1995-01-01', '1995-12-31')
        .filterBounds(roi)
        .filterMetadata('CLOUD_COVER', 'less_than', 30);
//Generate median (cloud free) image
var L5_1995_median_image = ee.Image(L5.median());
//Filtering L7 data for year 2005
var L7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
        .filterDate('2005-01-01', '2005-12-31')
        .filterBounds(roi)
        .filterMetadata('CLOUD_COVER', 'less_than', 30);
//Generate median (cloud free) image
var L7_2005_median_image = ee.Image(L7.median());
//Filtering L8 data for year 2015
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
        .filterDate('2015-01-01', '2015-12-31')
        .filterBounds(roi)
        .filterMetadata('CLOUD_COVER', 'less_than', 30);
//Generate median (cloud free) image
var L8_2015_median_image = ee.Image(L8.median());
//Map.addLayer(L8_2019_median_image, l8_fcc_vis, 'L8_2019_median_image', false);
//Filtering L8 data for year 2021
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
        .filterDate('2021-01-01', '2021-12-31')
        .filterBounds(roi)
        .filterMetadata('CLOUD_COVER', 'less_than', 30);
//Generate median (cloud free) image
var L8_2021_median_image = ee.Image(L8.median());
var ndvi_c_1985 = L5_1985_median_image
                  .normalizedDifference(['B4', 'B3']);
var ndvi_c_1995 = L5_1995_median_image
                  .normalizedDifference(['B4', 'B3']);                  
var ndvi_c_2005 = L7_2005_median_image
                  .normalizedDifference(['B4', 'B3']);
 var ndvi_c_2015 = L8_2015_median_image
                  .normalizedDifference(['B5', 'B4']); 
 var ndvi_c_2021 = L8_2021_median_image
                  .normalizedDifference(['B5', 'B4']);                 
//var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
var ndvi_crop1=ndvi_c_1985.clip(roi);
var ndvi_crop2=ndvi_c_1995.clip(roi);
var ndvi_crop3=ndvi_c_2005.clip(roi);
var ndvi_crop4=ndvi_c_2015.clip(roi);
var ndvi_crop5=ndvi_c_2021.clip(roi);
//histograme//
//var histogram = ui.Chart.image.histogram({
  //image: ndvi_crop1,
  //region: roi,
  //scale: 200,
// // minBucketWidth: 300
//});
//histogram.setOptions({
 // title: 'Histogram of Elevation in Colorado (meters)'
//});
//print(histogram);
//Map.addLayer(ndvi_crop1.clip(roi));
//color ramp
var ndviParams = {min: -1, max: 1, palette:[ 'C5AF20','9B8A00','736600','4F4400','352400']};
//var ndviParams = {min: -1, max: 1, palette:['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',//
               //'74A901', '66A000', '529400', '3E8601', '207401', '056201',//
              // '004C00', '023B01', '012E01', '011D01', '011301']};//
var NDVI1985 = Map.addLayer(ndvi_crop1,ndviParams, 'NDVI 1985', false);
var NDVI1995 = Map.addLayer(ndvi_crop2,ndviParams, 'NDVI 1995', false);
var NDVI2005 = Map.addLayer(ndvi_crop3, ndviParams, 'NDVI 2005', false);
var NDVI2015 = Map.addLayer(ndvi_crop4, ndviParams, 'NDVI 2015', false);
var NDVI2021 = Map.addLayer(ndvi_crop5, ndviParams, 'NDVI 2021', false);
//Map.addLayer(ndvi_crop1, false);
//Map.addLayer(ndvi_crop2, false);
//Map.addLayer(ndvi_crop3, false);
//Map.addLayer(ndvi_crop4, false);
//Map.addLayer(ndvi_crop5, false);
//App summary
var text = ui.Label(
  'NDVI for  UAE from 1985 to 2021 using Landsat imagery.LANDAST5,LANDSAT7 and LANDSAT8 ' +
  'Use the tools below to explore changes in NDVI.',
    {fontSize: '15px'});
//3.2) Create a panel to hold text
var header = ui.Label('UAE NDVI', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
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
panel.add(intro);
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel);
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//4.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'NDVI Year',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var extCheck1 = ui.Checkbox('NDVI - 1985').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('NDVI - 1995').setValue(false); 
var extCheck3 = ui.Checkbox('NDVI - 2005').setValue(false);
var extCheck4 = ui.Checkbox('NDVI - 2015').setValue(false);
var extCheck5 = ui.Checkbox('NDVI - 2021').setValue(false);
//Now do the same for the Simard Height map
var heightLab = ui.Label({value:'NDVI',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var heightCheck = ui.Checkbox('2000').setValue(false);
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
//Create a palette using the same colors we used for each extent layer
//var paletteMAPa = [
//'6D63EB',//2000
//'34BFDE',//2010
//'71F4B7',//2020
//];
// Name of each legend value
//var namesa = ['2000','2010','2020']; 
// Add color and names to legend
//for (var i = 0; i < 3; i++) {
  //extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
  //}  
//Height Legend
///////////////
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend2 (viridis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((viridis.max-viridis.min)/100.0).add(viridis.min);
  var legendImage = gradient.visualize(viridis);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('-1'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('1')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(extLabel)
      .add(extCheck1)
      .add(extCheck2)
      .add(extCheck3)
      .add(extCheck4)
      .add(extCheck5)
      .add(extentLegend)
      .add(heightLab)//
      .add(makeLegend2(ndviParams));
      //.add(heightCheck)//
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
// Add map title
var mapTitle = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
var mapTitle2 = ui.Label({
  value: 'Map of NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '0 0 3px 0',
    padding: '0'
    }
});
mapTitle.add(mapTitle2);
Map.add(mapTitle);
// Add map legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legend2 = ui.Label({
  value: 'Legend (NDVI)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legend2);
// Creates the content of the legend
var content = function(color, label) {
      // Create the color boxes
      var box = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Set box height and width
          padding: '9px',
          margin: '0 0 4px 0'
        }
      });
      // Create the labels
      var labels = ui.Label({
        value: label,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [box, labels],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Set legend colors
var classcolor = ['C5AF20','9B8A00','736600','4F4400','352400'];
// Set legend labels
//var labelName = ['<=0','0 - 0.2','0.2 - 0.4','0.4 - 0.6', '>0.6'];//
var labelName = ['-1','-0.5', '0','0.5','1'];
// Combine legend colou and labels
for (var i = 0; i < 5; i++) {
  legend.add(content(classcolor[i], labelName[i]));
  }  
// Add legend
Map.add(legend);
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent 1985
var doCheckbox = function() {
  extCheck1.onChange(function(checked){
 NDVI1985.setShown(checked);
  });
};
doCheckbox();
//Extent 1995
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  NDVI1995.setShown(checked);
  });
};
doCheckbox2();
//Extent 2005
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  NDVI2005.setShown(checked);
  });
};
doCheckbox3();
//Extent 2015
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  NDVI2015.setShown(checked);
  });
};
doCheckbox4();
//Extent 2021
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  NDVI2021.setShown(checked);
  });
};
doCheckbox5();
///////////////////////////////////////////////////////////////
//https://rgawai.users.earthengine.app/view/newndvi