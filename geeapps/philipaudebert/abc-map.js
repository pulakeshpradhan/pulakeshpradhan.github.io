var region;
var resolution;
var aoi;
var discountRate;
var plotRegion;
var leftPanel;
var rightPanel;
var scaleButton;
var selector;
var scale;
var scaleOfInterest;
var baselineButtonA;
var baselineButtonB;
var baselineButtonC;
var projectButton;
var aoiDrawButton;
var introduction;
var legends;
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Introductory Panel ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// Start with an intro panel
var introPanel = ui.Panel();
introPanel.style().set({
  width: '100%',
  position: 'top-left',
  backgroundColor: 'white'
});
var getIntroductoryPanel = function(introPanel) {
  introduction = introduction || require('users/philipaudebert/OCB:ABC-Map/Intro');
  return introduction.introductoryPanel(introPanel);
}; 
getIntroductoryPanel(introPanel);
var getLegends = function(map) {
  legends = legends || require('users/philipaudebert/OCB:ABC-Map/Legends');
  return legends.setLegends(map);
}; 
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Split panel for Maps /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// Link the Maps from the leftPanel to the rightMap and vice-versa
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
leftMap.drawingTools().setLinked(true);
//getLegends(leftMap);
leftMap.setCenter(0, 20, 2);
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
rightMap.drawingTools().setLinked(true);
//getLegends(rightMap);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Left panel for the baseline situation ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var logo = ee.Image("users/philipaudebert/Viz/PNGs/ABC-Map_white_formatted").visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var baselineLogo = ee.Image("users/philipaudebert/Viz/PNGs/ABC-Map_Logos_Baseline").visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var baselineThumbLogo = ui.Thumbnail({
    image: baselineLogo,
    params: {
        dimensions: '927x176',
        format: 'png'
        },
    style: {height: '53px', width: '255px', padding :'0'} // native resolution is 927x176px
    });
var abcMapBaselineDescription = ui.Label({
        value: 'The Adaptation, Biodiversity and Carbon Mapping Tool (ABC-Map) has two main logical steps: for the first step, you will run a baseline assessment via the left panel. For the second step, you will be able to assess the impact of your project via the right panel.',
        style: {fontSize: '11px', color: '484848'}
      });
var aoiLabel = ui.Label('Fill in name of Area of Interest (AOI)      ',{margin: '0 0 0 10px',fontSize: '11px',color: 'gray'});
var refName = ui.Textbox({placeholder: 'Name',  value: 'Aoi',
  style: {width: '100px'}});
var discountRateLabel = ui.Label('Fill in discount rate in percent (%)      ',{margin: '0 0 0 10px',fontSize: '11px',color: 'gray'});
var discountRateName = ui.Textbox({placeholder: 'Name',  value: '0',
  style: {width: '100px'}});
var scaleLabel = ui.Label('Please select the scale of the reference map', {margin: '0 0 0 10px',fontSize: '11px',color: 'gray'});
var scale10 = 10;
var scale20 = 20;
var scale100 = 100;
var scale300 = 300;
var SCALE10 = ee.String(ee.Number(scale10).format('%s')).cat(ee.String('m (Central America & Europe for 2017)')).getInfo();
var SCALE20 = ee.String(ee.Number(scale20).format('%s')).cat(ee.String('m (Africa for 2016)')).getInfo();
var SCALE100 = ee.String(ee.Number(scale100).format('%s')).cat(ee.String('m (World for 2015-2019)')).getInfo();
var SCALE300 = ee.String(ee.Number(scale300).format('%s')).cat(ee.String('m (World for 1992-2019)')).getInfo();
var selectScale = ui.Select({
      items: ['Please select',SCALE10,SCALE20,SCALE100,SCALE300],
      placeholder: 'Please select',
      value: 'Please select',
    });
function setScaleOfInterest(){
    scale = selectScale.getValue();
    if (scale == SCALE10){
        scaleOfInterest = scale10;
    }//sets the scale to 10m
      else if(scale == SCALE20){
          scaleOfInterest = scale20;
      }//sets the scale to 20m
        else if (scale == SCALE100){
            scaleOfInterest = scale100;
        }//sets the scale to 100m
          else if (scale == SCALE300){
              scaleOfInterest = scale300;
          }//sets the scale to 300m
            else if (scale == 'Please select'){
                scaleOfInterest = scale300;
            }//default is 300m
    //print(scaleOfInterest);
    return ee.Number(scaleOfInterest);
}
var drawAoiButtonLabel = ui.Label('Click button to select and draw Area of Interest      ',{margin: '0 0 0 10px',fontSize: '11px',color: 'gray'});
var getDrawAoiButton = function (panel, widgetNumber, map, style, showArea) {
  aoiDrawButton = require("users/philipaudebert/OCB:Biodiversity/B-MAP/Utils/Visualization/DrawingTools/drawAoi");
  return aoiDrawButton.addDrawPolygonButton(panel, widgetNumber, map, style, showArea);
};
var baselineAssessmentLabel = ui.Label('Click button to submit Baseline assessment      ',{margin: '0 0 0 10px',fontSize: '11px',color: 'gray'});
var getBaselineAssessmentA = function (panel, map, resolution, discountRate, aoi, maxPrThresholdHeavy, maxPrThresholdViolent) {
  baselineButtonA = require("users/philipaudebert/OCB:Adaptation/A-MAP/Baseline/BaselinePanel/baselineAssessment");
  return baselineButtonA.baselineAssessment(panel, map, resolution, discountRate, aoi, maxPrThresholdHeavy, maxPrThresholdViolent);
};
var submitBaselineA = ui.Button({label: 'Submit adaptation baseline', onClick: function() {
  //rightMap.drawingTools().layers().get(0).setShown(false);
  leftMap.drawingTools().layers().get(0).setShown(false);
  aoi = refName.getValue();
  discountRate = ee.Number.parse(ee.String(discountRateName.getValue()));
  resolution = ee.Number(setScaleOfInterest()).getInfo();
  ui.util.debounce(getBaselineAssessmentA(leftPanel, rightMap, resolution, discountRate, aoi, 60, 100), 500);
}});
var getBaselineAssessmentB = function (panel, map, resolution, discountRate, aoi) {
  baselineButtonB = require("users/philipaudebert/OCB:Biodiversity/B-MAP/Tools/Baseline/baselineAssessment");
  return baselineButtonB.baselineAssessment(panel, map, resolution, discountRate, aoi);
};
var submitBaselineB = ui.Button({label: 'Submit biodiversity baseline', onClick: function() {
  //rightMap.drawingTools().layers().get(0).setShown(false);
  rightMap.clear();
  getLegends(leftMap);
  getLegends(rightMap);
  leftMap.drawingTools().layers().get(0).setShown(false);
  aoi = refName.getValue();
  discountRate = ee.Number.parse(ee.String(discountRateName.getValue()));
  resolution = ee.Number(setScaleOfInterest()).getInfo();
  ui.util.debounce(getBaselineAssessmentB(leftPanel, rightMap, resolution, discountRate, aoi), 500);
}});
var getBaselineAssessmentC = function (panel, map, resolution, discountRate, aoi) {
  baselineButtonC = require("users/philipaudebert/OCB:Carbon/Tools/Baseline/BaselinePanel/baselineAssessment");
  return baselineButtonC.baselineAssessment(panel, map, resolution, discountRate, aoi);
};
var submitBaselineC = ui.Button({label: 'Submit carbon baseline', onClick: function() {
  //rightMap.drawingTools().layers().get(0).setShown(false);
  leftMap.drawingTools().layers().get(0).setShown(false);
  aoi = refName.getValue();
  discountRate = ee.Number.parse(ee.String(discountRateName.getValue()));
  resolution = ee.Number(setScaleOfInterest()).getInfo();
  ui.util.debounce(getBaselineAssessmentC(leftPanel, rightMap, resolution, discountRate, aoi), 500);
}});
// The layout is vertical flow by default.
var leftPanel = ui.Panel({style: {width: '300px'}});
leftPanel.widgets().set(1, baselineThumbLogo);
leftPanel.widgets().set(2, abcMapBaselineDescription);
leftPanel.widgets().set(3, aoiLabel);
leftPanel.widgets().set(4, refName);
leftPanel.widgets().set(5, scaleLabel);
leftPanel.widgets().set(6, selectScale);
leftPanel.widgets().set(7, discountRateLabel);
leftPanel.widgets().set(8, discountRateName);
leftPanel.widgets().set(9, drawAoiButtonLabel);
getDrawAoiButton(leftPanel, 10, rightMap, {position : "top-right"}, true);
leftPanel.widgets().set(11, baselineAssessmentLabel);
leftPanel.widgets().set(12, submitBaselineA);
leftPanel.widgets().set(13, submitBaselineB);
leftPanel.widgets().set(14, submitBaselineC);
//ui.root.insert(1, leftPanel);
//////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Right panel for the project situation ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var projectLogo = ee.Image("users/philipaudebert/Viz/PNGs/ABC-Map_Logos_Project").visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var projectThumbLogo = ui.Thumbnail({
    image: projectLogo,
    params: {
        dimensions: '922x177',
        format: 'png'
        },
    style: {height: '53px', width: '250px', padding :'0'} // native resolution is 1004x178px
    });
var abcMapProjectDescription = ui.Label({
        value: 'Based on the AOI on the left panel, you can run a project assessment in this section. Please fill in your first and last year of intervention before activating the Plotter.',
        style: {fontSize: '11px', color: '484848'}
      });
var startYearLabel = ui.Label({value: 'Please insert the first year of intervention', style: {margin: '0 0 0 10px',fontSize: '11px',color: 'gray'}});
var startYearTextbox = ui.Textbox({value: 2021, style: {width: '100px', fontSize: '11px'}});
var endYearLabel = ui.Label({value: 'Please insert the last year of intervention', style: {margin: '0 0 0 10px',fontSize: '11px',color: 'gray'}});
var endYearTextbox = ui.Textbox({value: 2026, style: {width: '100px', fontSize: '11px'}});
var implementationDynamicsLabel = ui.Label({value: 'Specify implementation dynamic (optional)', style: {margin: '0 0 0 10px',fontSize: '11px',color: 'gray'}});
var implementationDynamicsSelect = ui.Select({
  items: [
    {label:'sigmoid', value: 1}, 
    {label:'linear', value: 2}
    ], 
  placeholder: 'default (sigmoid)',
  style: {margin: '3px 0px 3px 9px', width: '120px', textAlign: 'center', fontSize: '11px', color: '484848'}
});   
var getProjectAssessment = function (panel, leftMap, rightMap, region, resolution, aoi, startYearTextbox, endYearTextbox, implementationDynamicsSelect, discountRate, plotRegion) {
  projectButton = require("users/philipaudebert/OCB:Biodiversity/B-MAP/Tools/Project/projectAssessment");
  return projectButton.plotter(panel, leftMap, rightMap, region, resolution, aoi, startYearTextbox, endYearTextbox, implementationDynamicsSelect, discountRate, plotRegion);
}; 
var plotterLabel = ui.Label({value: 'Please click to activate the Plotter', style: {margin: '5px 0px 0px 10px',fontSize: '11px',color: 'gray'}});
var plotterButton = ui.Button({
  label: 'Activate Plotter', 
  onClick: function() {
    aoi = refName.getValue();
    discountRate = ee.Number.parse(ee.String(discountRateName.getValue()));
    resolution = ee.Number(setScaleOfInterest()).getInfo();
    var region = ee.FeatureCollection(ee.Feature(rightMap.drawingTools().toFeatureCollection().first()));
    rightMap.centerObject(region.geometry());
    ui.util.debounce(getProjectAssessment(rightPanel, leftMap, rightMap, region, resolution, aoi, startYearTextbox, endYearTextbox, implementationDynamicsSelect, discountRate, plotRegion), 500);
  }, 
  style: {margin: '3px 0px 3px 9px', width: '120px', textAlign: 'center', fontSize: '11px', color: '484848'}
});
// The layout is vertical flow by default.
var rightPanel = ui.Panel({style: {width: '300px'}});
rightPanel.widgets().set(1, projectThumbLogo);
rightPanel.widgets().set(2, abcMapProjectDescription);
rightPanel.widgets().set(3, startYearLabel);
rightPanel.widgets().set(4, startYearTextbox);
rightPanel.widgets().set(5, endYearLabel);
rightPanel.widgets().set(6, endYearTextbox);
rightPanel.widgets().set(7, implementationDynamicsLabel);
rightPanel.widgets().set(8, implementationDynamicsSelect);
rightPanel.widgets().set(9, plotterLabel);
rightPanel.widgets().set(10, plotterButton);
//ui.root.insert(3, rightPanel);
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([introPanel, leftPanel, splitPanel, rightPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
//leftMap.setCenter(0, 0, 2);