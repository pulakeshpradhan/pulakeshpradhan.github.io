var loadInputs = function(){
var satellite_platform   = satellite_platformTexbox   .getValue();
var year_before          = year_beforeTexbox          .getValue();
var year_before_S        = year_beforeTexbox_S        .getValue();
var year_after           = year_afterTexbox           .getValue();
var year_after_S         = year_afterTexbox_S         .getValue();
var startDate            = startDateselectorbox       .getValue();
var endDate              = endDateselectorbox         .getValue();
var cloudsTh             = cloudsTHSlider             .getValue();
var MaxCloudsProbability = MaxCloudsProbabilitySlider .getValue();
var treshold             = tresholdSlider             .getValue();
return { 
  satellite_platform     : satellite_platform,
  year_before            : year_before,
  year_before            : year_before_S,
  year_after             : year_after,
  year_after             : year_after_S,
  startDate              : startDate,
  endDate                : endDate,
  cloudsTh               : cloudsTh,
  MaxCloudsProbability   : MaxCloudsProbability,
  treshold               : treshold,
};
};
var run = function(){
// load user inputs
var Inputs = loadInputs();
print(Inputs);
// load functions 
var calculateNDVIchange = require("users/parvezsust/PeatMonitoring:library"); 
// run the function
calculateNDVIchange.calculateNDVIchange(
  Inputs.satellite_platform,
  Inputs.year_before,
  Inputs.year_after,
  Inputs.startDate,
  Inputs.endDate,
  Inputs.cloudsTh,
  Inputs.MaxCloudsProbability,
  Inputs.treshold
  );
};
var removeLayers = function(){
  Map.clear();
  var widgets = ui.root.widgets();
  if (widgets.length()>2){
  ui.root.remove(ui.root.widgets().get(2));
  }
};
// # input parameters
// run boxes 
var runcalculateNDVIchangeButton = ui.Button('run');
runcalculateNDVIchangeButton.onClick(run);     
var removeLayersButton = ui.Button('Reset');
removeLayersButton.onClick(removeLayers);
// Text boxes
var Title = ui.Label({value: "Vegetation change detection", style:{
backgroundColor : "#66CCFF", fontSize: "18px"}});
var satellite_platformTexbox = ui.Select({
  items: [
    {label: 'Sentinel 2',       value: "Sentinel 2"},
    {label: 'Landsat'   ,       value: "Landsat"},
    ]});//.setValue("Sentinel 2");
var satellite_platform_Label = ui.Label({value: "Satellite platform", 
                  style:{backgroundColor : "#66CCFF", shown: true}});
var year_beforeTexbox = ui.Select({
  items: [
    {label: '1985',       value: 1985},
    {label: '1986',       value: 1986},
    {label: '1987',       value: 1987},
    {label: '1988',       value: 1988},
    {label: '1989',       value: 1989},
    {label: '1990',       value: 1990},
    {label: '1991',       value: 1991},
    {label: '1992',       value: 1992},
    {label: '1993',       value: 1993},
    {label: '1994',       value: 1994},
    {label: '1995',       value: 1995},
    {label: '1996',       value: 1996},
    {label: '1997',       value: 1997},
    {label: '1998',       value: 1998},
    {label: '1999',       value: 1999},
    {label: '2000',       value: 2000},
    {label: '2001',       value: 2001},
    {label: '2002',       value: 2002},
    {label: '2003',       value: 2003},
    {label: '2004',       value: 2004},
    {label: '2005',       value: 2005},
    {label: '2006',       value: 2006},
    {label: '2007',       value: 2007},
    {label: '2008',       value: 2008},
    {label: '2009',       value: 2009},
    {label: '2010',       value: 2010},
    {label: '2011',       value: 2011},
    {label: '2012',       value: 2012},
    {label: '2013',       value: 2013},
    {label: '2014',       value: 2014},
    {label: '2015',       value: 2015},
    {label: '2016',       value: 2016},
    {label: '2017',       value: 2017},
    {label: '2018',       value: 2018},
    {label: '2019',       value: 2019},
    {label: '2020',       value: 2020},
    {label: '2021',       value: 2021},
    ],style:{shown: false}}).setValue(2010);
var year_beforeTexbox_S = ui.Select({
  items: [    
    {label: '2015',       value: 2015},
    {label: '2016',       value: 2016},
    {label: '2017',       value: 2017},
    {label: '2018',       value: 2018},
    {label: '2019',       value: 2019},
    {label: '2020',       value: 2020},
    {label: '2021',       value: 2021},
    ],style:{shown: false}}).setValue(2015);
var year_before_Label = ui.Label({value: "Year before", 
                  style:{backgroundColor : "#66CCFF", shown: false}});
var year_afterTexbox = ui.Select({
  items: [    
    {label: '1985',       value: 1985},
    {label: '1986',       value: 1986},
    {label: '1987',       value: 1987},
    {label: '1988',       value: 1988},
    {label: '1989',       value: 1989},
    {label: '1990',       value: 1990},
    {label: '1991',       value: 1991},
    {label: '1992',       value: 1992},
    {label: '1993',       value: 1993},
    {label: '1994',       value: 1994},
    {label: '1995',       value: 1995},
    {label: '1996',       value: 1996},
    {label: '1997',       value: 1997},
    {label: '1998',       value: 1998},
    {label: '1999',       value: 1999},
    {label: '2000',       value: 2000},
    {label: '2001',       value: 2001},
    {label: '2002',       value: 2002},
    {label: '2003',       value: 2003},
    {label: '2004',       value: 2004},
    {label: '2005',       value: 2005},
    {label: '2006',       value: 2006},
    {label: '2007',       value: 2007},
    {label: '2008',       value: 2008},
    {label: '2009',       value: 2009},
    {label: '2010',       value: 2010},
    {label: '2011',       value: 2011},
    {label: '2012',       value: 2012},
    {label: '2013',       value: 2013},
    {label: '2014',       value: 2014},
    {label: '2015',       value: 2015},
    {label: '2016',       value: 2016},
    {label: '2017',       value: 2017},
    {label: '2018',       value: 2018},
    {label: '2019',       value: 2019},
    {label: '2020',       value: 2020},
    {label: '2021',       value: 2021},
    ], style:{shown: false}}).setValue(2015);
var year_afterTexbox_S = ui.Select({
  items: [    
    {label: '2015',       value: 2015},
    {label: '2016',       value: 2016},
    {label: '2017',       value: 2017},
    {label: '2018',       value: 2018},
    {label: '2019',       value: 2019},
    {label: '2020',       value: 2020},
    {label: '2021',       value: 2021},
    ],style:{shown: false}}).setValue(2017);
var year_after_Label = ui.Label({value: "Year after", 
                  style:{backgroundColor : "#66CCFF", shown: false}});
var startDateselectorbox = ui.Textbox({
placeholder: 'startDate (e.g. 05-20)',
value: '07-01',
style: {width: '155px'}});
var startDateLabel = ui.Label({value: "Beginning of the period (mm-dd) - the same before and after", 
                  style:{backgroundColor : "#66CCFF", shown: true}});
var endDateselectorbox = ui.Textbox({
placeholder: 'endDate (e.g. 09-20)',
value: '08-31',
style: {width: '155px'}});
var endDateLabel = ui.Label({value: "End of the period (mm-dd) - the same before and after", 
                  style:{backgroundColor : "#66CCFF", shown: true}});
var cloudsTHSlider = ui.Slider({min: 0, max: 100, value:70, step: 1,
                             style: { width: '165px', backgroundColor : "#66CCFF", color: "blue"}});
var cloudsTHLabel = ui.Label({value: "Maximum percentage of clouds in the image", 
                  style:{backgroundColor : "#66CCFF", shown: true}});
var MaxCloudsProbabilitySlider = ui.Slider({min: 0, max: 100, value:20, step: 1,
                             style: { width: '165px', backgroundColor : "#66CCFF", color: "blue"}});
var MaxCloudsProbabilityLabel = ui.Label({value: "Maximum probability that the pixel is cloudy", 
                  style:{backgroundColor : "#66CCFF", shown: true}});
var tresholdSlider = ui.Slider({min: 0, max: 182, step: 2,
                             style: { width: '165px', backgroundColor : "#66CCFF", color: "blue"}});
var tresholdLabel = ui.Label({value: "How many days is in your specified time period? (end-start date)", 
                  style:{backgroundColor : "#66CCFF", shown: true}});
// global  panel
var panel = ui.Panel({style: {width: '450px', backgroundColor: "#66CCFF", 
border: '2px solid black', textAlign: "center", whiteSpace: "nowrap", shown: true}});
// adding boxes
satellite_platformTexbox.onChange(function(value){   
                         if(value=="Sentinel 2"){
                         year_beforeTexbox.style().set('shown', false);
                         year_beforeTexbox_S.style().set('shown', true);
                         year_before_Label.style().set('shown', true);
                         }
                         else{
                         year_beforeTexbox.style().set('shown', true);
                         year_beforeTexbox_S.style().set('shown', false);
                         year_before_Label.style().set('shown', true);
                         }});
satellite_platformTexbox.onChange(function(value){   
                         if(value=="Sentinel 2"){
                         year_afterTexbox.style().set('shown', false);
                         year_afterTexbox_S.style().set('shown', true);
                         year_after_Label.style().set('shown', true);
                         tresholdLabel.style().set('shown', false);
                         tresholdSlider.style().set('shown', false);
                         }
                         else{
                         year_afterTexbox.style().set('shown', true);
                         year_afterTexbox_S.style().set('shown', false);
                         year_after_Label.style().set('shown', true);
                         tresholdLabel.style().set('shown', true);
                         tresholdSlider.style().set('shown', true);
                         }});
panel.add(Title);
panel.add(satellite_platform_Label);
panel.add(satellite_platformTexbox);
panel.add(year_before_Label);
panel.add(year_beforeTexbox);
panel.add(year_beforeTexbox_S);
panel.add(year_after_Label);
panel.add(year_afterTexbox);
panel.add(year_afterTexbox_S);
panel.add(startDateLabel);
panel.add(startDateselectorbox);
panel.add(endDateLabel);
panel.add(endDateselectorbox);
panel.add(tresholdLabel);
panel.add(tresholdSlider);
panel.add(cloudsTHLabel);
panel.add(cloudsTHSlider);
panel.add(MaxCloudsProbabilityLabel);
panel.add(MaxCloudsProbabilitySlider);
panel.add(runcalculateNDVIchangeButton);
panel.add(removeLayersButton);
ui.root.add(panel);
// Map.centerObject(ee.Geometry.Point([22, 30]), 4);