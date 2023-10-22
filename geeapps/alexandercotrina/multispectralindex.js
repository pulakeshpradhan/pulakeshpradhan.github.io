var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                8.31450140637501,
                40.49441113867741
              ],
              [
                8.31450140637501,
                40.3501366999645
              ],
              [
                8.60563910168751,
                40.3501366999645
              ],
              [
                8.60563910168751,
                40.49441113867741
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[8.31450140637501, 40.49441113867741],
          [8.31450140637501, 40.3501366999645],
          [8.60563910168751, 40.3501366999645],
          [8.60563910168751, 40.49441113867741]]], null, false);
//geometry, startDate, endDate, cloudsTh, B1, B2, B3, min, max, sensor
var loadInputs = function(){
var startDate        = startDateTexbox        .getValue();
var endDate          = endDateTexbox          .getValue();
var cloudsTh   = cloudsThSlider   .getValue();
var B1               = band1Selector          .getValue();
var B2               = band2Selector          .getValue();
var B3               = band3Selector          .getValue();
var B4               = band3Selector          .getValue();
var B5               = band3Selector          .getValue();
var B8A               = band3Selector          .getValue();
var B11               = band3Selector          .getValue();
var B12               = band3Selector         .getValue();
var cloudProbability = cloudProbabilitySlider .getValue();
var minCol           = minColSlider           .getValue();
var maxCol           = maxColSlider           .getValue();
var sensor           = Sensorselectorbox      .getValue();
return { 
  startDate        : startDate,
  endDate          : endDate,
  B1               : B1,
  B2               : B2,
  B3               : B3,
  cloudThreshold   : cloudsTh,
  cloudProbability : cloudProbability,
  minCol           : minCol,
  maxCol           : maxCol,
  sensor          : sensor
};
}
var runTheFunction = function(){
// load user inputs
var Inputs = loadInputs();
//print(Inputs);
// load functions 
var stuffOnIndices = require("users/alexandercotrina/GEE_Firenze2022:App/Library_App"); 
// stuffOnIndices(aoi, "2022-01-01", "2022-08-31",70, "B1", "B2", "B3", 0, 3000, "MODIS")
// run the function
stuffOnIndices.stuffOnIndices(
geometry,
Inputs.startDate,
Inputs.endDate,
Inputs.cloudThreshold,
Inputs.B1,
Inputs.B2,
Inputs.B3,
Inputs.minCol,
Inputs.maxCol,
Inputs.sensor
);
};
var RemoveLayers = function(){
  Map.clear();
  var widgets = ui.root.widgets();
  if (widgets.length()>2){
  ui.root.remove(ui.root.widgets().get(2));
  }
};
// run boxes 
var run = ui.Button('Run');
run.onClick(runTheFunction); 
var RemoveLayersButton = ui.Button('Remove layers');
RemoveLayersButton.onClick(RemoveLayers); 
// Text boxes
var Title = ui.Label({value: "Time series of spectral indices", style:{
backgroundColor : "#FFFFFF", fontSize: "17px"}});
var YearStart = ui.Label({value: "Start Date", style:{
backgroundColor : "#FEF8D1", fontSize: "10 px"}});
var startDateTexbox = ui.Textbox({
placeholder: 'startDate (e.g. 01-01)',
value: '2022-01-01',
style: {width: '155px'}});
var EndDate = ui.Label({value: "End Date", style:{
backgroundColor : "#FEF8D1", fontSize: "10 px"}});
var endDateTexbox = ui.Textbox({
placeholder: 'endDate (e.g. 09-20)',
value: '2022-07-31',
style: {width: '155px'}});
var SelectIndice = ui.Label({value: "Select Sensor", style:{
backgroundColor : "#EADEEA", fontSize: "10 px"}});
var Sensorselectorbox = ui.Select({
  items: [
    {label: 'Sentinel 2',       value: "S2"},
    {label: 'Landsat 8',       value: "L8"},
    {label: 'MODIS',       value: "MODIS"},
    ]}).setValue("S2");
var CompositeBandS2 = ui.Label({value: "Composite bands Sentinel 2", style:{
backgroundColor : "#EADEEA", fontSize: "10 px"}});
var band1Selector  = ui.Select({
  items: [
    {label: "Blue (B2)",       value: "B2" },
    {label: "Green (B3)",      value: "B3" },
    {label: "Red (B4)",        value: "B4" },
    {label: "Red Edge 1 (B5)", value: "B5" },
    {label: "Red Edge 2 (B6)", value: "B6" },
    {label: "Red Edge 3 (B7)", value: "B7" },
    {label: "NIR (B8)",        value: "B8" },
    {label: "Red Edge 4 (B8A)", value: "B8A" },
    {label: "SWIR 1 (B11)",     value: "B11" },
    {label: "SWIR 2 (B12)",     value: "B12" }
    ]}).setValue('B4');
var band2Selector   = ui.Select({
  items: [
    {label: "Blue (B2)",       value: "B2" },
    {label: "Green (B3)",      value: "B3" },
    {label: "Red (B4)",        value: "B4" },
    {label: "Red Edge 1 (B5)", value: "B5" },
    {label: "Red Edge 2 (B6)", value: "B6" },
    {label: "Red Edge 3 (B7)", value: "B7" },
    {label: "NIR (B8)",        value: "B8" },
    {label: "Red Edge 4 (B8A)", value: "B8A" },
    {label: "SWIR 1 (B11)",     value: "B11" },
    {label: "SWIR 2 (B12)",     value: "B12" }
    ]}).setValue('B3');
var band3Selector   = ui.Select({
  items: [
    {label: "Blue (B2)",       value: "B2" },
    {label: "Green (B3)",      value: "B3" },
    {label: "Red (B4)",        value: "B4" },
    {label: "Red Edge 1 (B5)", value: "B5" },
    {label: "Red Edge 2 (B6)", value: "B6" },
    {label: "Red Edge 3 (B7)", value: "B7" },
    {label: "NIR (B8)",        value: "B8" },
    {label: "Red Edge 4 (B8A)", value: "B8A" },
    {label: "SWIR 1 (B11)",     value: "B11" },
    {label: "SWIR 2 (B12)",     value: "B12" }
    ]}).setValue('B2');
var cloudsThLabel = ui.Label({value: "Maximum percentage of clouds in the image.", 
                   style:{backgroundColor : "#FFFFFF", shown: true}});
var cloudsThSlider = ui.Slider({min: 0, max: 100, value:50, step: 1,
                             style: { width: '165px', backgroundColor : "#FFFFFF", color: "black"}});
var cloudProbabilitySlider = ui.Slider({min: 0, max: 100, value:20, step: 1,
                            style: { width: '165px', backgroundColor : "#FFFFFF", color: "blue"}});
var cloudProbabilityLabel = ui.Label({value: "Maximum probability that the pixel is cloudy.", 
                  style:{backgroundColor : "#FFFFFF", shown: true}});
var minColSlider = ui.Slider({min: 0, max: 10000, step: 10, value:0,
style: { width: '195px', backgroundColor : "#FFFFFF", color: "darkgreen", shown: true}});
var minColLabel = ui.Label({value: "Value (or one per band) to map onto 00", 
                  style:{backgroundColor : "#FFFFFF", shown: true}});
var maxColSlider = ui.Slider({min: 0, max: 10000, step: 10, value:3000,
style: { width: '195px', backgroundColor : "#FFFFFF", color: "darkgreen", shown: true}});
var maxColLabel = ui.Label({value: "Value (or one per band) to map onto FF", 
                  style:{backgroundColor : "#FFFFFF", shown: true}});
var LabelSummerSchool = ui.Label({value: "Summer School 2022, Firenze - Italy ", style:{
backgroundColor : "#D6FA97", fontSize: "12 px"}});
// global  panel
var panel = ui.Panel({style: {width: '300px', backgroundColor: "#EDF5F4", 
border: '1px solid white', textAlign: "center", whiteSpace: "nowrap", shown: true}});
// // adding boxes
panel.add(Title);
panel.add(YearStart);
panel.add(startDateTexbox);
panel.add(EndDate);
panel.add(endDateTexbox);
panel.add(SelectIndice);
panel.add(Sensorselectorbox);
panel.add(CompositeBandS2);
panel.add(band1Selector);
panel.add(band2Selector);
panel.add(band3Selector);
panel.add(cloudsThLabel);
panel.add(cloudsThSlider);
// panel.add(cloudProbabilityLabel);
// panel.add(cloudProbabilitySlider);
// panel.add(minColLabel);
// panel.add(minColSlider);
// panel.add(maxColLabel);
// panel.add(maxColSlider);
// panel.add(runcalculateCompositeButton);
panel.add(run);
panel.add(RemoveLayersButton);
ui.root.add(panel);
panel.add(LabelSummerSchool);
//Map.centerObject(ee.Geometry.Point([12, 42]), 7);
Map.centerObject(geometry, 10);
//Summer School 2022