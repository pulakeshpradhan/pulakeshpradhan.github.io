var lsib = ee.FeatureCollection("USDOS/LSIB/2013"),
    LandMask = ee.FeatureCollection("users/jamonvdh/gaza/ne_10m_ocean_gaza"),
    imageVisParam = {"opacity":1,"bands":["constant"],"min":0.8,"max":2,"palette":["0000ff","9d02d7","cd34b5","ea5f94","fa8775","ffb14e","ffd700","ffffff"]};
// AUTHOR: ANNA BALLASIOTES 
// CO-AUTHOR: JAMON VAN DEN HOEK 
// Acknowledgements for additional script support:
// Kaspar Hurni for user and app interface code.
// Gena for stylization. 
//-----------------------------------------------
// Define map style:
//-----------------------------------------------
Map.setCenter(34.4412, 31.5713, 9);
var gaza_fc = lsib.filterMetadata("name",'equals',"Gaza Strip")
Map.addLayer(gaza_fc, {color: 'FFFFFF'}, 'Gaza Strip', true, 0.4)
var f = ee.Image().byte().paint(gaza_fc,0,2)
//Map.addLayer(f,{palette:['000000']},'Gaza Strip',true,0.4)
///////Load to Default Style: ///////
var style = require('users/gena/packages:style')
var colorbrewer = require('users/gena/packages:colorbrewer')
style.SetMapStyleDark()
//Map.setOptions('SATELLITE');
var colorbrewer = require('users/gena/packages:colorbrewer')
////////////////////////////////////////////////
////////////////////////////////////////////////
/////// Default Chlorophyll Vis Date ///////////
////////////////////////////////////////////////
////////////////////////////////////////////////
var viirs = ee.ImageCollection('NOAA/VIIRS/001/VNP09GA')
                  .filter(ee.Filter.date('2017-06-05', '2017-06-06'))
function maskVIIRSclouds(image) {
  var qa = image.select(['QF1']);
  var cloudBitMask = 1 << 2;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
  return image.updateMask(mask)
}
var VRScloudMasked = viirs.map(function (image){return maskVIIRSclouds(image)});
var VIIRScomposite = VRScloudMasked.median()
var VIIRScompositeClip = VIIRScomposite.clip(LandMask)
var R = ee.Image(VIIRScompositeClip.select(['M2'])).max(ee.Image(VIIRScompositeClip.select(['M3']))).divide(VIIRScompositeClip.select(['M4']))
R = R.log10() // taking the log of R
var a0 = ee.Image(0.2228) // creates an image with that constant 
var a1 = R.multiply(-2.4683) // 
var a2 = R.pow(2).multiply(1.5867) // take R^2, multiply by... constant
var a3 = R.pow(3).multiply(-0.4275) // take R^3 (image), multiply by.. constant
var a4 = R.pow(4).multiply(-0.7768) // takes R^4 (powering each pixel in the image), multiply by... constant
var chl = ee.Image(ee.Number(10)).pow(a0.add(a1) // creates an image.. 
                                  .add(a2)
                                  .add(a3)
                                  .add(a4))
chl = chl.convolve(ee.Kernel.gaussian(100))
Map.addLayer(chl,{min:0.8,max:2,palette:["0000ff",
                                        "9d02d7",
                                        "cd34b5",
                                        "ea5f94",
                                        "fa8775",
                                        "ffb14e",
                                        "ffd700",
                                        "ffffff"]}, 'June 5, 2017 Chlorophyll Visualization')
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////// VARIABLE DECLARATION ////////
//I_satellite selection - MODIS, VIIRS
var I_satellite;
//Target Dates for Composite Range
var I_sliderValue
var I_startDate;
var I_compType;
var I_visParams; 
//Slider
var latestviirs = ee.ImageCollection('NOAA/VIIRS/001/VNP09GA').sort('system:time_start', false).first()
var firstviirs = ee.ImageCollection('NOAA/VIIRS/001/VNP09GA').sort('system:time_start').first()
var startdate = ee.Date(firstviirs.get('system:time_start')).format('YYYY-MM-DD')
var enddate = ee.Date(latestviirs.get('system:time_start')).format('YYYY-MM-DD');
print(startdate)
print(enddate)
//can't get this to dynamically work, spending too much time -- do you know what's happening?
// When I put ui.DateSlider(startdate, enddate), it doesn't work. 
// Also for some reason my end date is giving me 147 instead of 27... ugh. 
var I_dateSlider = ui.DateSlider('2012-01-19').setValue('2017-06-05')
//////////////////////////////////////////////////////////////////////
//// Build Composite - when you click "Show Composite", this runs ////
//////////////////////////////////////////////////////////////////////
var buildComposite = function() {
  // clear exceptions from previous run
  panelException.clear();
  // read user Inputs from Graphical User Interface
  //Target Date for First Date of Composite
  I_sliderValue = I_dateSlider.getValue();
  I_startDate = I_sliderValue[0]
  I_startDate = ee.Date(I_startDate)
  //Value for Comp Type -- 1, 3, 5, 7
  I_compType = I_compTypeSelector.getValue(); 
  //Satellite selection - MODIS, VIIRS
  I_satellite = I_satelliteSelector.getValue();
  //----------------------------------------------------//
  // ADD COMPOSITE TO MAP WITH THE USER INPUTS          //
  // creates a satellite image collection based on which the composite is calculated. Satellite images are filtered based on user input.
  var collection = getCollection(); //output of "getCollection" is what is used for functions below
  handleNoImageException(collection);
  // create composite image
  var composite = createImageComposite(collection);
  // add composite to map (has to be started manually)
  addCompositeToMap(composite);
};
///////////////////////////////////////////////////////////////////////////////////////////
////////////////FUNCTIONS FOR IMAGERY: ////////////////////////////////////////////////////
//////////////// Get Collection, Composite the Collection, Display Composite on Map////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////////// FUNCTION TO GET COLLECTION:  /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//clip image collection to Mask
//Dark Style 
//coastal mask 
var maskVIIRSclouds = function(image) {
  var qa = image.select(['QF1']);
  var cloudBitMask = 1 << 2;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
  return image.updateMask(mask)
}
var getCollection = function(){
  var firstDate = I_startDate;
  var endDate = firstDate.advance(I_compType, 'day')
  if (I_satellite == 'VIIRS'){
    var VRS = ee.ImageCollection('NOAA/VIIRS/001/VNP09GA')
                  .filter(ee.Filter.date(firstDate, endDate))
    var VRScloudMasked = VRS.map(function(image){return maskVIIRSclouds(image)});
    return ee.ImageCollection(VRScloudMasked)
  }
  else if (I_satellite == 'MODIS'){
    var MOD = ee.ImageCollection("NASA/OCEANDATA/MODIS-Terra/L3SMI")
                  .filter(ee.Filter.date(firstDate, endDate))
                  .select('chlor_a')
    var MODcloudMasked = MOD.map(function(image){return cloudMask(image, 'MOD')});
    return ee.ImageCollection(MODcloudMasked);
  }
};
/**
 * Makes an error message appear in the console if collection is empty
 */
var handleNoImageException = function(collection){
  if (collection.size().getInfo() === 0){
    var labelNoImageException = ui.Label('No valid image in the chosen extent. Select a different extent or change satellite, Year, startDate or endDate.');
    labelNoImageException.style().set({color: 'red', fontSize: '20px', padding: '10px'});
    panelException.add(labelNoImageException);
  }
};
////////////////////////////////////////////////////////////////////////////////
///////////////////FUNCTION TO MAKE COMPOSITE: /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var createImageComposite = function(maskedCollection){
  var composite = maskedCollection.median()
  var compositeClip = composite.clip(LandMask)
  var R = ee.Image(compositeClip.select(['M2'])).max(ee.Image(compositeClip.select(['M3']))).divide(compositeClip.select(['M4']))
  R = R.log10() // taking the log of R
  var a0 = ee.Image(0.2228) // creates an image with that constant 
  var a1 = R.multiply(-2.4683) // 
  var a2 = R.pow(2).multiply(1.5867) // take R^2, multiply by... constant
  var a3 = R.pow(3).multiply(-0.4275) // take R^3 (image), multiply by.. constant
  var a4 = R.pow(4).multiply(-0.7768) // takes R^4 (powering each pixel in the image), multiply by... constant
  var chl = ee.Image(ee.Number(10)).pow(a0.add(a1) // creates an image.. 
                                  .add(a2)
                                  .add(a3)
                                  .add(a4))
  chl = chl.convolve(ee.Kernel.gaussian(100))
  return chl;
};
//////////////ADD COMPOSITE TO MAP/////////////
var addCompositeToMap = function(composite){
  var visParams = I_visParams.getValue()
  // create layer
  var compositeLayer = ui.Map.Layer(composite, visParams, 'Composite');
  // remove layer 'Composite' of previous composite call to avoid layer stacking
  var numberOfLayers = ee.Number(Map.layers().length()).getInfo();
  if(numberOfLayers > 1){
    Map.remove(Map.layers().get(1));   
  }
  // add new layer to map
  Map.add(compositeLayer); 
}
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//// USER INTERFACE /////////////////////////////////
//************************************************///
// (S_4) User Interface
//************************************************///
//-----------------------------------------------
// Creation of input fields and adding functionality
//-----------------------------------------------
// Visualization Palette
var blueorange = {min:0.8,max:2,palette:["0000ff","9d02d7","cd34b5", "ea5f94","fa8775","ffb14e","ffd700","ffffff"]}
var yellowred = {min:0.8, max:2, palette: ["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","bd0026","800026"]}
var bluepurple = {min:0.8, max:2, palette: ["f7fcfd","e0ecf4","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","810f7c","4d004b"]}
var viridis = {min:0.8, max:2, palette: ["#440154FF", "#472D7BFF", "#3B528BFF", "#2C728EFF", "#21908CFF", "#27AD81FF", "#5DC863FF", "#AADC32FF", "#FDE725FF"]}
// Dropdowns
var I_visParams = ui.Select({
  items: [
    {label: 'Orange to Blue', value: blueorange},
    {label: 'Red to Yellow', value: yellowred},
    {label: 'Purple to Blue', value: bluepurple},
    {label: 'Viridis', value: viridis}
    ]
}).setValue(blueorange)
//-----------------------------------------------
// Legend
//-----------------------------------------------
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Chlorophyll-a (mg/m³)',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
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
var vispalette = I_visParams.getValue()
var legendpalette = ["000000", "0000ff","9d02d7","cd34b5", "ea5f94","fa8775","ffb14e","ffd700","F9F871", "ffffff"]
I_visParams.onChange(function(vispalette){
                              if (vispalette == blueorange){
                                legendpalette = ["0000ff","9d02d7","cd34b5", "ea5f94","fa8775","ffb14e","ffd700","F9F871", "ffffff"]
                              }
                              else if (vispalette == yellowred) { 
                                legendpalette = ["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","bd0026","800026"]
                              }
                              else if (vispalette == bluepurple) {
                                legendpalette = ["f7fcfd","e0ecf4","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","810f7c","4d004b"];
                              }
                              else (vispalette == viridis); {
                                legendpalette = ["#440154FF", "#472D7BFF", "#3B528BFF", "#2C728EFF", "#21908CFF", "#27AD81FF", "#5DC863FF", "#AADC32FF", "#FDE725FF"]
                              }
                              }); 
// name of the legend
var names = ['Masked/No Data', '<0.8', '0.95', '1.05', '1.20', '1.35', '1.50', '1.65', '1.80', '>2.00'];
// Add color and and names
for (var i = 0; i < 10; i++) {
  legend.add(makeRow(legendpalette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
//DropDowns
var I_satelliteSelector = ui.Select({
  items: [
    {label: 'VIIRS', value: 'VIIRS'},
    {label: 'MODIS', value: 'MODIS'}
  ],
}).setValue('VIIRS');
var I_compTypeSelector = ui.Select({ 
  items: [
    {label: '1-Day', value: 1},
    {label: '3-Day', value: 3},
    {label: '5-Day', value: 5},
    {label: '7-Day', value: 7},
    ] 
}).setValue(3)
var I_compMonthSelector = ui.Select({
  items: [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'June', value: 6}, 
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12}
    ]
}).setPlaceholder('Select a month...')
var selectableVIIRSYears = [
                              {label: '2012', value: 2012},
                              {label: '2013', value: 2013},
                              {label: '2014', value: 2014},
                              {label: '2015', value: 2015},
                              {label: '2016', value: 2016},
                              {label: '2017', value: 2017},
                              {label: '2018', value: 2018},
                              {label: '2019', value: 2019}
                            ];
var selectableMODISYears = [ 
                              {label: '2000', value: 2000},
                              {label: '2001', value: 2001},
                              {label: '2002', value: 2002},
                              {label: '2003', value: 2003},
                              {label: '2004', value: 2004},
                              {label: '2005', value: 2005},
                              {label: '2006', value: 2006},
                              {label: '2007', value: 2007},
                              {label: '2008', value: 2008},
                              {label: '2009', value: 2009},
                              {label: '2010', value: 2010},
                              {label: '2011', value: 2011},
                              {label: '2012', value: 2012},
                              {label: '2013', value: 2013},
                              {label: '2014', value: 2014},
                              {label: '2015', value: 2015},
                              {label: '2016', value: 2016},
                              {label: '2017', value: 2017},
                              {label: '2018', value: 2018},
                              {label: '2019', value: 2019}
                            ];
I_satelliteSelector.onChange(function(I_satellite){
                              if (I_satellite == 'VIIRS'){
                                I_compYearSelector.items().reset(selectableVIIRSYears); 
                              }
                              else {
                                I_compYearSelector.items().reset(selectableMODISYears);
                              }
                              // Set the first band to the selected band.
                              I_compYearSelector.setValue(2018);
                            });
var I_compYearSelector = ui.Select({ 
  items: [
    {label: '2000', value: 2000},
    {label: '2001', value: 2001},
    {label: '2002', value: 2002},
    {label: '2003', value: 2003},
    {label: '2004', value: 2004},
    {label: '2005', value: 2005},
    {label: '2006', value: 2006},
    {label: '2007', value: 2007},
    {label: '2008', value: 2008},
    {label: '2009', value: 2009},
    {label: '2010', value: 2010},
    {label: '2011', value: 2011},
    {label: '2012', value: 2012},
    {label: '2013', value: 2013},
    {label: '2014', value: 2014},
    {label: '2015', value: 2015},
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019}
    ]     // items are defined dynamically when yearSelector changes
}).setValue(2018);
// Run Button                                     
var runButton = ui.Button('Display composite');
runButton.onClick(buildComposite);  //consider renaming "build composite"   
// Headers
var userInputLabel = ui.Label('Chlorophyll Explorer');    // title user inputs
userInputLabel.style().set('fontWeight', 'bold');
userInputLabel.style().set({
  fontSize: '22px',
});
//-----------------------------------------------
// (UI_3) Adding input fields to pannels.
//-----------------------------------------------
// see https://developers.google.com/earth-engine/ui_panels about the function of panels
var panelAbsolutePosition = ui.Panel({style: {width: '300px', height: '120px'}});
panelAbsolutePosition.setLayout("absolute");
//-----------------------------------------------
// create panel in which buttons are to be added
var panelLeft = ui.Panel({style: {width: '300px'}});
panelLeft.setLayout(ui.Panel.Layout.flow());
panelLeft.style({position: "top-left"});
panelLeft.add(userInputLabel);
//panelLeft.add(panelAbsolutePosition);
panelLeft.add(ui.Label("Satellite"));
panelLeft.add(I_satelliteSelector);
panelLeft.add(ui.Label("Select start date for composite:"));
panelLeft.add(I_dateSlider);
panelLeft.add(ui.Label("Select composite period:"));
panelLeft.add(I_compTypeSelector);
panelLeft.add(ui.Label("Choose a color palette:"));
panelLeft.add(I_visParams);
panelLeft.add(ui.Label("When you have selected your desired settings, visualize the composite by clicking 'Display composite'. As the data is complex and requires computation, please allow for time for composite to load to completion." ))
// panel for run button
var panelRunButton = ui.Panel({style: {width: '300px'}});
panelRunButton.add(runButton);
panelLeft.add(panelRunButton);
var exportPanel = ui.Panel ({style: {width: '300px'}});
var exportButton = ui.Button('Export composite');
exportPanel.add(exportButton)
panelLeft.add(exportButton)
// define panel for no image exception
var panelException = ui.Panel({style: {width: '300px'}});  // , height:'100px'
panelException.setLayout(ui.Panel.Layout.flow());
//---------------------------------------
// Makes pannel appear in console
print(panelException);
ui.root.add(panelLeft);