var AOI = ui.import && ui.import("AOI", "table", {
      "id": "users/daprieto24/FFC/AOI_OCHOSUR"
    }) || ee.FeatureCollection("users/daprieto24/FFC/AOI_OCHOSUR"),
    imageVisParam_2016 = ui.import && ui.import("imageVisParam_2016", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.03825800009071827,
        "max": 0.19464199729263781,
        "gamma": 1.006
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.03825800009071827,"max":0.19464199729263781,"gamma":1.006},
    imageVisParam_2017 = ui.import && ui.import("imageVisParam_2017", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.048399997875094414,
        "max": 0.13879999332129955,
        "gamma": 0.56
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.048399997875094414,"max":0.13879999332129955,"gamma":0.56},
    imageVisParam_2018 = ui.import && ui.import("imageVisParam_2018", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.027876000553369522,
        "max": 0.11792400136590003,
        "gamma": 0.803
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.027876000553369522,"max":0.11792400136590003,"gamma":0.803},
    imageVisParam_2020 = ui.import && ui.import("imageVisParam_2020", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.007699999958276749,
        "max": 0.07620000094175339,
        "gamma": 0.511
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.007699999958276749,"max":0.07620000094175339,"gamma":0.511},
    imageVisParam_2019 = ui.import && ui.import("imageVisParam_2019", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.017400000244379044,
        "max": 0.07829999923706055,
        "gamma": 0.701
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.017400000244379044,"max":0.07829999923706055,"gamma":0.701};
//Masking clouds
function maskS2clouds(image) {
var QA = image.select("QA60");
// Bits 10 and 11 are clouds and cirrus, respectively.
var cloudBitMask = 1 << 10;
var cirrusBitMask = 1 << 11;
//Both flgas should be set to zero, indicating clear conditions.
var mask = QA.bitwiseAnd(cloudBitMask).eq(0)
    .and(QA.bitwiseAnd(cirrusBitMask).eq(0));
return image.updateMask(mask).divide(10000);
}
var imageVisParam = {
  bands: ['B4', 'B3', 'B2'],
  gamma: 0.803,
  max: 0.1098,
  min: 0.0384,
  opacity: 1,
};
//######################################################################################################## 
//#                                                                                                    #\\
//#                           LANDTRENDR GREATEST DISTURBANCE MAPPING                                  #\\
//#                                                                                                    #\\
//########################################################################################################
// date: 2018-10-07
// author: Justin Braaten | jstnbraaten@gmail.com
//         Zhiqiang Yang  | zhiqiang.yang@oregonstate.edu
//         Robert Kennedy | rkennedy@coas.oregonstate.edu
// parameter definitions: https://emapr.github.io/LT-GEE/api.html#getchangemap
// website: https://github.com/eMapR/LT-GEE
// notes: 
//   - you must add the LT-GEE API to your GEE account to run this script. 
//     Visit this URL to add it:
//     https://code.earthengine.google.com/?accept_repo=users/emaprlab/public
//   - use this app to help parameterize: 
//     https://emaprlab.users.earthengine.app/view/lt-gee-change-mapper
//##########################################################################################
// START INPUTS
//##########################################################################################
// define collection parameters
var startYear = 2005;
var endYear = 2020;
var startDay = '08-01';
var endDay = '12-31';
var aoi = AOI;
var index = 'NDVI';
var maskThese = ['cloud', 'shadow', 'snow', 'water'];
// define landtrendr parameters
var runParams = { 
  maxSegments:            13,
  spikeThreshold:         0.1,
  vertexCountOvershoot:   14,
  preventOneYearRecovery: false,
  recoveryThreshold:      1,
  pvalThreshold:          0.05,
  bestModelProportion:    0.75,
  minObservationsNeeded:  6
};
// define change parameters
var changeParams = {
  delta:  'loss',
  sort:   'greatest',
  year:   {checked:true, start:2017, end:2020}, //Revisar
  mag:    {checked:false, value:50,  operator:'>'},
  dur:    {checked:false, value:4,    operator:'<'},
  preval: {checked:false, value:400,  operator:'>'},
  mmu:    {checked:false, value:11},
};
//##########################################################################################
// END INPUTS
//##########################################################################################
// load the LandTrendr.js module
var ltgee = require('users/emaprlab/public:Modules/LandTrendr.js'); 
// add index to changeParams object
changeParams.index = index;
// run landtrendr
var lt = ltgee.runLT(startYear, endYear, startDay, endDay, aoi, index, [], runParams, maskThese);
// get the change map layers
var changeImg = ltgee.getChangeMap(lt, changeParams);
// set visualization dictionaries for year and magnitude of loss
var palette1 = ['#33ff00', '#04a710', '#FFFF00', '#FF7F00', '#FF0000']; 
var palette = ['#fff1ab', '#f0ff0c', '#f1cc16', '#ff7f00', '#ff0000']; //
var yodVizParms = {
    min: 2016,
  max: 2020,
  palette: palette1
};
var magVizParms = {
  min: 50,
  max: 600,
  palette: palette
};
// -----add parameters to year and magnitude of gain----
//------------------------------------------------------
// define collection parameters
var startYear1 = 2010;
var endYear1 = 2020;
var startDay1 = '08-01';
var endDay1 = '12-31';
var aoi = AOI;
var index = 'NDVI';
var maskThese = ['cloud', 'shadow', 'snow', 'water'];
// define landtrendr parameters
var runParams1 = { 
  maxSegments:            12,
  spikeThreshold:         0.1,
  vertexCountOvershoot:   13,
  preventOneYearRecovery: false,
  recoveryThreshold:      1,
  pvalThreshold:          0.2,
  bestModelProportion:    0.8,
  minObservationsNeeded:  6
};
// define change parameters
var changeParams1 = {
  delta:  'gain',
  sort:   'greatest',
  year:   {checked:true, start:2017, end:2020}, //Revisar
  mag:    {checked:true, value:100,  operator:'>'},
  dur:    {checked:false, value:4,    operator:'<'},
  preval: {checked:false, value:400,  operator:'>'},
  mmu:    {checked:false, value:11},
};
//##########################################################################################
// END INPUTS
//##########################################################################################
// load the LandTrendr.js module
var ltgee1 = require('users/emaprlab/public:Modules/LandTrendr.js'); 
// add index to changeParams object
changeParams1.index = index;
// run landtrendr
var lt1 = ltgee1.runLT(startYear1, endYear1, startDay1, endDay1, aoi, index, [], runParams1, maskThese);
// get the change map layers
var changeImg1 = ltgee1.getChangeMap(lt1, changeParams1);
// set visualization dictionaries for year and magnitude of gain
var palette2 = ['#041fe4', '#1de0bc', '#ffbf2f', '#c03f01']; 
var palette3 = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']; //
var yodGVizParms = {
    min: 2017,
  max: 2020,
  palette: palette2
};
var magGVizParms = {
  min: 100,
  max: 500,
  palette: palette3
};
//Display results of Landtrender
/*Map.addLayer(changeImg1.select(['mag']).clip(AOI), magGVizParms, 'Magnitude of Change - Gain');
Map.addLayer(changeImg1.select(['yod']).clip(AOI), yodGVizParms, 'Year of Detection - Gain');*/
//// Display AOI with propierties
var RellenoAOI = ee.Image().byte();
var LimiteAOI = RellenoAOI.paint({featureCollection: aoi, width: 5,});
Map.addLayer(LimiteAOI, {palette: 'red', opacity: 0.5}, 'Area of project');
// display the change attribute map - note that there are other layers - print changeImg to console to see all
Map.centerObject(aoi, 10);
/*
Map.addLayer(changeImg.select(['mag']), magVizParms, 'Magnitude of Change');
Map.addLayer(changeImg.select(['yod']), yodVizParms, 'Year of Detection');
*/
/*
// export change data to google drive
var exportImg = changeImg.clip(aoi).unmask(0).short();
Export.image.toDrive({
  image: exportImg, 
  description: 'lt-gee_disturbance_map', 
  folder: 'lt-gee_disturbance_map', 
  fileNamePrefix: 'lt-gee_disturbance_map', 
  region: aoi, 
  scale: 30, 
  crs: 'EPSG: 4326', 
  maxPixels: 1e13
});
*/
////////Add Imagery 2015 - 2020/////////
/// Configure the imagery 2020
//Copernicus Collection
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
              .filterDate('2020-08-25', '2020-08-30')
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2020]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_20 = dataset.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2020 = series_20.min().clip(AOI)
//Print Image 2020
/*Map.addLayer(Image_2020.clip(AOI),imageVisParam_2020,'Image'+" "+ arr[a])*/ //Review or cull comment
}
//// Configure the imagery 2019
//Copernicus Collection
var dataset1 = ee.ImageCollection('COPERNICUS/S2_SR')
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
              .filterDate('2019-08-01', '2019-12-30') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2019]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_19 = dataset1.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2019 = series_19.min().clip(AOI)
//print(final_image)
/*Map.addLayer(Image_2019.clip(AOI),imageVisParam_2020,'Image'+" "+ arr[a])*/ //Review or cull comment
}
// Configure the imagery 2018
//Copernicus Collection
var dataset2 = ee.ImageCollection('COPERNICUS/S2')
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
              .filterDate('2018-08-01', '2018-12-30') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2018]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_18 = dataset2.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2018 = series_18.min().clip(AOI)
//print(final_image)
/*Map.addLayer(Image_2018.clip(AOI),imageVisParam_2020,'Image'+" "+ arr[a])*/ //Review or cull comment
}
// Configure the imagery 2017
//Copernicus Collection
var dataset3 = ee.ImageCollection('COPERNICUS/S2')
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
              .filterDate('2017-08-01', '2017-12-31') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2017]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_17 = dataset3.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2017 = series_17.min().clip(AOI)
//print(final_image)
/*Map.addLayer(Image_2017.clip(AOI),imageVisParam_2020,'Image'+" "+ arr[a])*/ //Review or cull comment
}
// Configure the imagery 2016
//Copernicus Collection
var dataset4 = ee.ImageCollection('COPERNICUS/S2')
              .filterBounds(AOI)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
              .filterDate('2016-11-10', '2016-11-15') //Revisar
              .sort("CLOUDY_PIXEL_PERCENTAGE")
              .map(function(image){
                return image.set('Year',ee.Image(image).date().get('year'))
              })
var arr = [2016]
for (var a = 0; a < arr.length; a++) {
//  print (arr[0])
var series_16 = dataset4.filterMetadata('Year','equals', arr[a])
             .map(maskS2clouds)
var Image_2016 = series_16.min().clip(AOI)
//print(final_image)
/*Map.addLayer(Image_2017.clip(AOI),imageVisParam_2020,'Image'+" "+ arr[a])*/ //Review or cull comment
}
//*** Adittional component configuration ***
///////////////////////////////////////////////////////////////
//      2) Begin setting up map appearance and app layers   //
///////////////////////////////////////////////////////////////
//2.1) Set up general display
/*
//Set up a satellite background
Map.setOptions('Satellite')
*/
//Center the map to NorthSwaka
Map.centerObject(AOI,12)
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
//Create variables to panel
var magchange_topanel = ui.Map.Layer(changeImg.select(['mag']).clip(AOI), magVizParms, 'Magnitude of change-Loss', false);
var yearofdet_topanel = ui.Map.Layer(changeImg.select(['yod']).clip(AOI), yodVizParms, 'Year of loss', false);
var magchangegain_topanel = ui.Map.Layer(changeImg1.select(['mag']).clip(AOI), magGVizParms, 'Magnitude of change-Gain', false);
var yearofdetgain_topanel = ui.Map.Layer(changeImg1.select(['yod']).clip(AOI), yodGVizParms, 'Year of gain', false);
var year2016_topanel = ui.Map.Layer(Image_2016,imageVisParam_2016, '2016', true);
var year2017_topanel = ui.Map.Layer(Image_2017,imageVisParam_2017,'2017',false);
var year2018_topanel = ui.Map.Layer(Image_2018,imageVisParam_2018,'2018',false);
var year2019_topanel = ui.Map.Layer(Image_2019,imageVisParam_2019,'2019',false);
var year2020_topanel = ui.Map.Layer(Image_2020,imageVisParam_2020,'2020',false);
// add layer to map
Map.add(year2016_topanel);
Map.add(year2017_topanel);
Map.add(year2018_topanel);
Map.add(year2019_topanel);
Map.add(year2020_topanel);
Map.add(magchangegain_topanel);
Map.add(yearofdetgain_topanel);
Map.add(magchange_topanel);
Map.add(yearofdet_topanel);
//Create titles for our app
var header = ui.Label('Detection of changes in Land use during 2017 - 2020', {fontSize:'30px', fontWeight: 'bold', color: 'darkgreen'});
var text = ui.Label('This tool shows the land use changes between 2017'+ 
                    ' and 2020 considering the year of detection of recoveries and losses and the magnitude of change per pixel.',{fontSize: '15px'});
//Create a panel user's interface 
var panel = ui.Panel({
            widgets: [header, text], //add header and text
            style: {width:'300px',position:'middle-left'}
});
// Create more text 
var intro = ui.Panel([
        ui.Label({
          value: '_____________________________________________',
          style: {fontWeight: 'bold',color: 'black'},
          }),
        ui.Label({
          value: 'Select layers to display detection of changes on land use.',
          style: {fontSize: '15 px', fontWeight: 'bold'}
        })  
  ]);
//Add panel to map
panel.add(intro)
ui.root.insert(1,panel)
// Build checkboxes
var extLabel = ui.Label({value:'Losses',
                style:{fontWeight:'bold',fontSize:'16px', margin:'10px 5px'}
  });
// Widgets to checkboxes
var extCheck = ui.Checkbox('Year of loss').setValue(false); //Review
var extCheck2 = ui.Checkbox('Magnitude of change - loss').setValue(false); //Review
//add legend to map
var legendpanel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var title = ui.Label({
  value: 'Year of loss',
  style: {
    fontSize: '15px',
    fontWeight: 'bold',
    margin: '0px'
  }
})
legendpanel.add(title)
var color = ['#33ff00', '#FFFF00', '#FF7F00', '#FF0000']
var lc_class = ['2017', '2018', '2019', '2020']
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px'
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for(var a = 0; a < 4; a++){
  legendpanel.add(list_legend(color[a], lc_class[a]))
}
// Add Legend for magnitude of change./////////////
///////////////////////////////////////////////////
var legend = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Magnitude of change - loss',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((magVizParms.max-magVizParms.min)/100.0).add(magVizParms.min);
var legendImage = gradient.visualize(magVizParms);
// create text on top of legend
var panel2 = ui.Panel({
widgets: [
ui.Label('High')
],
});
legend.add(panel2);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel2 = ui.Panel({
widgets: [
ui.Label('Low')
],
});
legend.add(panel2);
//--------------------Add layers to Gain changes-------------------------------
//-----------------------------------------------------------------------------
// Build checkboxes
var extLabel1 = ui.Label({value:'Recoveries',
                style:{fontWeight:'bold',fontSize:'16px', margin:'10px 5px'}
  });
// Widgets to checkboxes
var extCheck8 = ui.Checkbox('Year of recovery').setValue(false); //Review
var extCheck9 = ui.Checkbox('Magnitude of change - recovery').setValue(false); //Review
//add legend to map
// set position of panel
var legend1 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle1 = ui.Label({
  value: 'Year of recovery',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0px',
    padding: '0'
    }
});
// Add the title to the panel
legend1.add(legendTitle1);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '10px',
          margin: '4px'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '5px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var paletteGain =['041fe4', '1de0bc', 'ffbf2f', 'c03f01'];
// name of the legend
var names = ['2017','2018','2019','2020'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend1.add(makeRow(paletteGain[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
/*Map.add(legend1);*/
// Add Legend for magnitude of change./////////////
///////////////////////////////////////////////////
var legend2 = ui.Panel({
style: {
position: 'bottom-right',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle2 = ui.Label({
value: 'Magnitude of change - recovery',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend2.add(legendTitle2);
// create the legend image
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient1 = lon.multiply((magGVizParms.max-magGVizParms.min)/100.0).add(magGVizParms.min);
var legendImage1 = gradient1.visualize(magGVizParms);
// create text on top of legend
var panel3 = ui.Panel({
widgets: [
ui.Label('High')
],
});
legend2.add(panel3);
// create thumbnail from the image
var thumbnail1 = ui.Thumbnail({
image: legendImage1,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend2.add(thumbnail1);
// create text on top of legend
var panel3 = ui.Panel({
widgets: [
ui.Label('Low')
],
});
legend2.add(panel3);
// Create more text 
var intro2 = ui.Label({
          value: '_____________________________________________',
          style: {fontWeight: 'bold',color: 'black'},
          });
var intro3 = ui.Label({
          value: 'Select images to display.',
          style: {fontSize: '15 px', fontWeight: 'bold'}
        });
// Widgets to checkboxes
var extCheck3 = ui.Checkbox('2016').setValue(true); //Review
var extCheck4 = ui.Checkbox('2017').setValue(false); //Review
var extCheck5 = ui.Checkbox('2018').setValue(false); //Review
var extCheck6 = ui.Checkbox('2019').setValue(false); //Review
var extCheck7 = ui.Checkbox('2020').setValue(false); //Review
// Add widgets to app - legend of thematic raster // REVIEW!!!!
panel.add(extLabel)
     .add(extCheck)
     .add(extCheck2)
     .add(legendpanel)
     .add(legend)
     .add(extLabel1)
     .add(extCheck8)
     .add(extCheck9)
     .add(legend1)
     .add(legend2);
//Add panel to map
panel.add(intro2)
panel.add(intro3);     
// Add widgets to app - Imagery 2016 - 2020
panel.add(extCheck3)
     .add(extCheck4)
     .add(extCheck5)
     .add(extCheck6)
     .add(extCheck7);
//Function to checkboxes
//Year of loss
var doCheckbox = function(){
  extCheck.onChange(function(checked){
  yearofdet_topanel.setShown(checked)
  }
  )}
  doCheckbox();
//Magnitude of change
var doCheckbox2 = function(){
  extCheck2.onChange(function(checked){
  magchange_topanel.setShown(checked)} 
  )}
  doCheckbox2();
//Function to checkboxes - Imagery
//2016
var doCheckbox3 = function(){
  extCheck3.onChange(function(checked){
  year2016_topanel.setShown(checked)
  }
  )}
  doCheckbox3();
//2017
var doCheckbox4 = function(){
  extCheck4.onChange(function(checked){
  year2017_topanel.setShown(checked)
  }
  )}
  doCheckbox4();
//2018
var doCheckbox5 = function(){
  extCheck5.onChange(function(checked){
  year2018_topanel.setShown(checked)
  }
  )}
  doCheckbox5();
//2019
var doCheckbox6 = function(){
  extCheck6.onChange(function(checked){
  year2019_topanel.setShown(checked)
  }
  )}
  doCheckbox6();
//2020
var doCheckbox7 = function(){
  extCheck7.onChange(function(checked){
  year2020_topanel.setShown(checked)
  }
  )}
  doCheckbox7();
//Function to checkboxes for Recoveries
//Year of recovery
var doCheckbox8 = function(){
  extCheck8.onChange(function(checked){
  yearofdetgain_topanel.setShown(checked)
  }
  )}
  doCheckbox8();
//Magnitude of change - recovery  
var doCheckbox9 = function(){
  extCheck9.onChange(function(checked){
  magchangegain_topanel.setShown(checked)
  }
  )}
  doCheckbox9();