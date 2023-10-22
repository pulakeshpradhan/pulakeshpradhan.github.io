/*******************************************************************************
 =============================
 MODIS Monthly Fog Detection Application
 Last updated: 09-16-2021
 Version: v3.3
 ============================== 
v3.3 update
------------
* Amended Zackary Werner's contact information
 Description:
 ------------
 An interactive application to display monthly fog detection using MODIS-Terra Observation Satellite imagery.
 This incorporates the detection scheme developed by the NASA DEVELOP Fall 2020 Redwoods team at the Colorado Fort Collins node
 in collaboration with the Natural Resource Ecology Laboratory at Colorado State University Fort Collins.
 This app is made in refrence to the paper:
____________________________________________________ <- Add paper here
 Contact:
 -------
* Team Member Name(s): Zackary Werner, Christopher Choi, Anna Winter
* E-mail(s): christopherchoi98@gmail.com
* To Use:
*******************************************************************************/
Map.setOptions('TERRAIN');
////////////////////////////////////////////////
// ROOT FOR FOG TIF ASSETS
////////////////////////////////////////////////
var root = 'users/christopherchoi98/MODIS_fog_tifs/';
////////////////////////////////////////////////
// PRESET REGIONS OF INTEREST
////////////////////////////////////////////////
////----------------------------------------------------- ASSETS -------------------------------------------------------------- ////
// Add ROI with no fill
var empty = ee.Image().byte();
// Study Area // 
var studyArea = ee.FeatureCollection('users/christopherchoi98/MODIS_fog_assets/StudyArea');
// Style
var studyArea_outline = empty.paint({
  featureCollection: studyArea,
  color: 'yellow',
  width: 2
});
// Validation Area // 
var validationArea = ee.FeatureCollection('users/christopherchoi98/MODIS_fog_assets/Torregrosa_et_al_ValidationArea');
// Style
var validationArea_outline = empty.paint({
  featureCollection: validationArea,
  color: 'yellow',
  width: 2
});
// California Coast // 
var californiaCoast = ee.FeatureCollection('users/christopherchoi98/MODIS_fog_assets/CaliforniaCoast');
// Style
var californiaCoast_outline = empty.paint({
  featureCollection: californiaCoast,
  color: 'yellow',
  width: 2
});
////----------------------------------------------------- GEOMETRIES -------------------------------------------------------------- ////
// Bay Area
var sanFranciscoBay = ee.Feature(ee.Geometry.Polygon(
  [[[-123.23868540714996,36.94466955602196],
    [-121.45890025089996,36.94466955602196],
    [-121.45890025089996,38.59459338502336],
    [-123.23868540714996,38.59459338502336],
    [-123.23868540714996,36.94466955602196]]]));
// Monteray Bay
var montereyBay = ee.Feature(ee.Geometry.Polygon(
  [[[-122.27738169621246,36.47992618159073],
    [-121.55777720402496,36.47992618159073],
    [-121.55777720402496,37.08485969895461],
    [-122.27738169621246,37.08485969895461],
    [-122.27738169621246,36.47992618159073]]]));
// Big Sur
var bigSur = ee.Feature(ee.Geometry.Polygon(
  [[[-122.11807993839996,36.139357602594295],
    [-121.44791392277496,36.139357602594295],
    [-121.44791392277496,36.69632322930346],
    [-122.11807993839996,36.69632322930346],
    [-122.11807993839996,36.139357602594295]]]));
// Preset Regions feature class
var presetRegions = ee.FeatureCollection([
  sanFranciscoBay,
  montereyBay
  ]);
////----------------------------------------------------- FIRST VIEW -------------------------------------------------------------- ////
Map.addLayer(studyArea_outline, {pallete: 'yellow'}, 'Study Area', true, 0.8);
Map.centerObject(studyArea, 6);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////// User Interface ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// style templates ////
var reminderTxtStyle = {fontSize: '12px', color: 'gray', margin: '0 0 0 10px'};
var borderStyle = '5px double steelblue';
var optionsTitleStyle = {fontSize: '16px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue'};
////-----------------------------------------------------Title /*1*/-------------------------------------------------------------- ////
// Title
var title = ui.Label('MODIS Fog Detection',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
////------------------------------------------------------Description /*2*/----------------------------------------------------------- ////
// Description
var description = ui.Label('This application is used to'+
  ' detect fog across coastal California and southern Oregon.' +
  ' This tool utilizes the Terra-MODIS cloud flag and cirrus' +
  ' cloud flag to determine fog presence. This application is' +
  ' meant to be a data visualization tool to accompany the' +
  ' research paper: "MODIS sensors can monitor spatiotemporal trends in fog and low cloud cover at 1 km spatial resolution along the U.S. Pacific Coast"' +
  ', which can be found below.', {});
  // 'The monthly fog presence' +
  // ' were developped through joint project between the NASA' +
  // ' DEVELOP National Program and the Natural Resource Ecology Lab' +
  // ' at the Colorado State University. The accompanying research paper:' +
  // ' ______________________, can be found below.', {});
var description2 = ui.Label("Link to Associated Research Paper",
  {color: 'blue'})
  .setUrl('https://doi.org/10.1016/j.rsase.2022.100832')
var description3 = ui.Label('How to use:', {fontWeight: 'bold', fontSize:'16px'});
var description4 = ui.Label('Select date you would like to generate a fog image for and click on "Generate Image".' +
  ' Click on a pixel on the generated image to see the fog days per month detected.' +
  ' To export the image, click "Export Iamge".' +
  ' Zoom to areas of pre-defined areas of Interest by choosing a region and clicking "Go To"' +
  ' Remove map layers by clicking "Reset".')
////--------------------------------------------------Select Date PANEL /*3*/-------------------------------------------------------- ////
// Define labels for each year (For Select Year Drop Down)
var A = '2000',
    B = '2001',
    C = '2002',
    D = '2003',
    E = '2004',
    F = '2005',
    G = '2006',
    H = '2007',
    I = '2008',
    J = '2009',
    K = '2010',
    L = '2011',
    M = '2012',
    N = '2013',
    O = '2014',
    P = '2015',
    Q = '2016',
    R = '2017',
    S = '2018',
    T = '2019',
    U = '2020',
    V = '2021',
    Q = '2022';
// Define labels for each month (For Select Month Drop Down)
var Jun = '06',
    Jul = '07',
    Aug = '08',
    Sep = '09';
////////////////////////////////////////////////////////////////
/*1*/
// Select Year Drop Down GUI
var selectYr = ui.Select({
  items:[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, Q],
  placeholder:'Select year',
  });
////////////////////////////////////////////////////////////////
/*2*/
// Select Month Drop Down
var selectMn = ui.Select({
  items:[Jun, Jul, Aug, Sep],
  placeholder:'Select month',
  });
////////////////////////////////////////////////////////////////
/*3*/
// Generate Image Button
var inspector = ui.Panel([ui.Label('Click to get fog days per month')]);
Map.add(inspector);
var generateImage = ui.Button({
  label: 'Generate Image',
  onClick: function(){
    // Set Yr and Mn values from drop down selection
    var fogYr = selectYr.getValue(); // Set selected year from dropdown as year
    var fogMn = selectMn.getValue(); // Set selected month from drowdown as month
    // Asset name
    var fogDate = fogYr + '-' + fogMn;
    var image_name = ee.String(root + fogYr + '-' + fogMn);
    var image =  ee.Image(image_name);
  Map.addLayer(image.clip(studyArea), {
    min: 0, 
      max:31, 
      palette: '#BFE9FF, #006EFF, #004CA8, #002673, #002673', 
      opacity: 0.7}, 
    fogDate,
    print(image)
    );                                
      Map.style().set('cursor', 'crosshair');
  //var inspector = ui.Panel([ui.Label('Click to get fog days per month')]);
  //Map.add(inspector);
  Map.onClick(function(coords){
    //show the loading label/
    inspector.widgets().set(0, ui.Label({
      value: 'Loading...',
      style: {color: 'gray'}
    }));
    //Determine value
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var sample = image.sample(point, 2445.98490512564);
    var computedValue = sample.first().get('b1');
    print(computedValue);
    // Set Yr and Mn values from drop down selection
    var fogYr = selectYr.getValue(); // Set selected year from dropdown as year
    var fogMn = selectMn.getValue(); // Set selected month from drowdown as month
    // Asset name
    var fogDate = fogYr + '-' + fogMn;
  // Request the value from the server.
    computedValue.evaluate(function(result) {
      // When the server returns the value, show it.
      inspector.widgets().set(0, ui.Label({
        value: 'Fog Days per Month: ' + result,
      }));
    });
  }
  )}});
////////////////////////////////////////////////////////////////
/*4*/
// Export Image
// Define export image function
function downloadImg() {
  // Pull selected image name
  var fogYr = selectYr.getValue(); // Set selected year from dropdown as year
    var fogMn = selectMn.getValue(); // Set selected month from drowdown as month
    // Asset name
    var fogDate = fogYr + '-' + fogMn;
    var image_name = ee.String(root + fogYr + '-' + fogMn);
    var image =  ee.Image(image_name);
  // Actual export function
  var bounds = studyArea.geometry(); // turn study area FC to geom
  var downloadArgs = {
    name: 'MODISMondlyFLCC' + '_' + fogDate,
    crs: 'EPSG:4326',
    scale: 1000,
    region: bounds
  };
  var url = image.getDownloadURL(downloadArgs);
  urlLabel.setUrl(url);
  urlLabel.style().set({shown: true});
}
// Generate Button for export images
var exportImage = ui.Button('Export image', downloadImg);
var urlLabel = ui.Label('Download', {shown: false});
////////////////////////////////////////////////
/////// Select Date PANEL
////////////////////////////////////////////////
var date_panel = ui.Panel({
  widgets: [
    ui.Label({
      value: 'Choose fog month',
      style: optionsTitleStyle,
    }),
    /*1*/ selectYr,
    /*2*/ selectMn,
    /*3*/ generateImage,
    ui.Label({
      value: 'Export fog image',
      style: optionsTitleStyle,
    }),
    /*4*/ exportImage, urlLabel
    ],
    layout: ui.Panel.Layout.flow('vertical', 'true'),
    style: {margin: '10px 0px 0px 0px', border: borderStyle}
});
////----------------------------------------------- Zoom to Regions PANEL /*4*/ ----------------------------------------------------- ////
 /*1*/ // Select Regions Drop Down
 //Define labels for each month
 var studyArea_label = 'Study Area',
      validationArea_label = 'GOES Validation Area (Torregrosa et al. 2013)',
      californiaCoast_label = 'California Coast',
      sanFranciscoBay_label = 'San Francisco Bay',
      montereyBay_label = 'Monterey Bay',
      bigSur_label = 'Big Sur';
//////////////////////////////////////////////////////
  // Drop Down GUI
var selectRegion = ui.Select({
    items:[studyArea_label, 
      validationArea_label, 
      //californiaCoast_label,
      //montereyBay_label,
      bigSur_label,
      sanFranciscoBay_label
      ],
    placeholder:'Study Area',
    });
/*2*/ // Go To Regions Button  
  // Button GUI
var goTo_button = ui.Button({
  label: 'Go To',
  onClick: function(){
    var roi_output = function(selectRegion){
    var output;
    if(selectRegion.getValue() == 'Study Area'){
      output = (studyArea);
    }
    else if(selectRegion.getValue() == 'GOES Validation Area (Torregrosa et al. 2013)'){
      output = (validationArea);
    }
    /*else if(selectRegion.getValue() == 'California Coast'){
      output = (californiaCoast);
    }*/
    else if(selectRegion.getValue() == 'San Francisco Bay'){
      output = (sanFranciscoBay);
    }
    /*else if(selectRegion.getValue() == 'Monterey Bay'){
      output = (montereyBay);
    } */
    else if(selectRegion.getValue() == 'Big Sur'){
      output = (bigSur)
    }
       print("ROI Output", output);
    return output;
  };
  var zoom_area = roi_output(selectRegion);
  //Map.addLayer = zoom_area + '_outline';
  Map.centerObject(zoom_area);
  /* THIS NEEDS WORKING OUT. NEED TO ADD LAYER WE'RE ZOOMING INTO, THEN REMOVE PREVIOUS OUTLINES
  Map.addLayer(zoom_area + '_outline');
  */
  }
});
//////////////////////////////////////////////////////
  // Zoom  Panel
   var zoom_panel = ui.Panel({
    widgets: [
      ui.Label({
        value: 'Choose region to zoom to',
        style: optionsTitleStyle,
      }),
      /*1*/ selectRegion,
      /*2*/ goTo_button,
      ],
    layout: ui.Panel.Layout.flow('vertical', 'true'),
    style: {margin: '10px 0px 0px 0px', border: borderStyle}
  });
// ////----------------------------------------------- Reset PANEL /*6*/----------------------------------------------------- ////
var reset_button = ui.Button({
  label: 'Reset',
  onClick: (function reset(){
    Map.layers().reset(),
    Map.addLayer(studyArea_outline, {pallete: 'yellow'}, 'Study Area', true, 0.8);//,
    //inspector.remove(inspector);
  })
});
//////////////////////////////////////////////////////
// Reset Panel
var reset_panel = ui.Panel({
  widgets: [
    reset_button],
    layout: ui.Panel.Layout.flow('vertical', 'true'),
    style: {margin: '10px 0px 0px 0px', border: borderStyle}
})
// ////----------------------------------------------- Links PANEL /*7*/----------------------------------------------------- ////
var links = ui.Label('Other Links',
  {fontWeight: 'Bold', fontSize: '16px'})
var links1 = ui.Label("This application's code (The release for this application's Google Earth Engine code is pending approval." + 
  " Future versions of this application will allow you to detect fog up to the most recent month this application is being accessed." +
  " We appreciate your patience and understanding.)", {fontWeight: 'italic', color: 'blue'})
  .setUrl('Insert Link Here')
var links2 = ui.Label("Torregrosa, A., Combs, C., Pters,  J., 2016. GOES-derived fog and low cloud indices for coastal north and central California ecological analyses. Earth and Space Science, 3(2), 46-67.",
  {color: 'blue'})
  .setUrl('https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2015EA000119')
// ////----------------------------------------------- App info PANEL /*5*/----------------------------------------------------- ////
var info1 = ui.Label('Application Version: Alpha v3.2, Release Date: 09/13/2022')
var info2 = ui.Label('Affiliations: Evangelista Laboratory (Colorado State University), NASA DEVELOP National Program')
var info3 = ui.Label("Collaborators: Zackary Werner, Christopher Tsz Hin Choi, Anna Winter, Anthony G. Vorster, Anika Berger, Kristen O'Shea, Paul Evangelista, Brian Woodward")
var info4 = ui.Label('Primary Project Contact: Zackary Werner (zwerner.author@gmail.com)')
var info5 = ui.Label('GEE App Contact: Christopher Tsz Hin Choi (Christopher.Choi@colostate.edu)')
////--------------------------------------------------FULL LEFT PANEL----------------------------------------------------- ////
var allPanels = ui.Panel({
  widgets: [
    /*1*/ title,
    /*2*/ description, description2, description3, description4,
    /*3*/ date_panel,
    /*4*/ zoom_panel,
    /*5*/ reset_panel,
    /*6*/ links, links1, links2,
    /*7*/ info1, info2, info3, info4, info5
    ],
    style: {width: '400px', padding: '8px'}
});
ui.root.insert(0, allPanels);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// Legend /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var vis = {min: 0, max: 30, palette: '#BFE9FF, #006EFF, #004CA8, #002673, #002673'};
// Create color bar thumbnail image for use in legend 
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '500x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Fog Days Per Month',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel({
  widgets: [
    legendTitle, 
    colorBar,
    legendLabels,
  ],
  style: {
    position: 'bottom-left',
  }
});
Map.add(legendPanel);