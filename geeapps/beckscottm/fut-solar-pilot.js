var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint();
/************************
 * MAP NOTES:
 * NE States Included in Draft are CT, MA, ME, NH, NY, RI, and VT
 * 
 * 1. 2001 and 2016 solar footprints are visualized in ORANGE
 * 2. 2030 and 2040 solar development projections for each state are visualized in BLUE
 * 3. Example of solar suitability layers for different land uses are included for MA only. They are visualized
 * as a red-green color scheme, where darker green indicates higher suitability for solar.
 * 
 * Solar Model Inputs include:
 * -Slope
 * -Land Values
 * -Distance to transmission infrastructure
 * 
 * Masked areas (restrictions to solar development) include:
 * -Water
 * -Roads
 * -UHD Development
 * -PAD US Level 2 Zones
 * -PALD Areas
 * -State & Federal Lands / Parks
 * -Middle to high composite land value scores
 * MASK NOT YET ADDED: water setback and buffers
 ***********************/
///////////////////////
//MAP SETUP OPTIONS///
/////////////////////
 Map.setCenter(-72.814, 43.352, 7);
 Map.style().set('cursor', 'crosshair');
////////////////////////////////////////////////////////
//CREATE MAP VARIABLES & ADD VARIABLES TO THE MAP//////
//////////////////////////////////////////////////////
var neSuitability = ee.Image("users/beckscottm/solarmodel/NE_Suitability");
var neSolarFP2016 = ee.Image("users/beckscottm/solarmodel/solar_FP_2016");
var neSolarFP2001 = ee.Image("users/beckscottm/solarmodel/solar_fp_2001");
var ct2030 = ee.Image("users/beckscottm/solarmodel/ct2030");
var ct2040 = ee.Image("users/beckscottm/solarmodel/ct2040");
var ma2030 = ee.Image("users/beckscottm/solarmodel/ma2030");
var ma2040 = ee.Image("projects/ee-beckscottm/assets/ma2040r");
var me2030 = ee.Image("users/beckscottm/solarmodel/me2030");
var me2040 = ee.Image("users/beckscottm/solarmodel/me2040");
var nh2030 = ee.Image("users/beckscottm/solarmodel/nh2030");
var nh2040 = ee.Image("users/beckscottm/solarmodel/nh2040");
var ny2030 = ee.Image("users/beckscottm/solarmodel/ny2030");
var ny2040 = ee.Image("users/beckscottm/solarmodel/ny2040");
var ri2030 = ee.Image("users/beckscottm/solarmodel/ri2030");
var ri2040 = ee.Image("users/beckscottm/solarmodel/ri2040");
var vt2030 = ee.Image("users/beckscottm/solarmodel/vt2030");
var vt2040 = ee.Image("users/beckscottm/solarmodel/vt2030");
// Define an SLD style of discrete intervals to apply to the suitability images
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#0000ff" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#ff0000" quantity="0.2" label="1-20" />' +
      '<ColorMapEntry color="#ffff00" quantity="0.4" label="20-40" />' +
      '<ColorMapEntry color="#00ff00" quantity="0.6" label="40-60" />' +
      '<ColorMapEntry color="#30b855" quantity="0.8" label="60-80" />' +
      '<ColorMapEntry color="#007f30" quantity="1" label="80-100" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
Map.addLayer(neSuitability.sldStyle(sld_intervals), {}, 'Solar Siting Suitability', false);
Map.addLayer(neSolarFP2016,{min: 0, max: 1, palette: ['000000', 'ff8c00']}, 'NE Solar Footprints 2016', false);
Map.addLayer(neSolarFP2001,{min: 0, max: 1, palette: ['000000', 'ff8c00']}, 'NE Solar Footprints 2001', false);
Map.addLayer(ct2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'CT_Solar_2030', false);
Map.addLayer(ct2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'CT_Solar_2040', false);
Map.addLayer(ma2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'MA_Solar_2030', false);
Map.addLayer(ma2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'MA_Solar_2040', false);
Map.addLayer(me2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'ME_Solar_2030', false);
Map.addLayer(me2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'ME_Solar_2040', false);
Map.addLayer(nh2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'NH_Solar_2030', false);
Map.addLayer(nh2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'NH_Solar_2040', false);
Map.addLayer(ny2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'NY_Solar_2030', false);
Map.addLayer(ny2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'NY_Solar_2040', false);
Map.addLayer(ri2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'RI_Solar_2030', false);
Map.addLayer(ri2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'RI_Solar_2040', false);
Map.addLayer(vt2030,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'VT_Solar_2030', false);
Map.addLayer(vt2040,{min: 0, max: 1, palette: ['000000', '0000ff']}, 'VT_Solar_2040', false);
//////////////////////////////////////////
//SETUP PANEL & WIDGETS FOR DISPLAY//////
////////////////////////////////////////
//TITLE
var header = ui.Label('Utility Scale Solar Development Projections', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//SUMMARY
var text = ui.Label(
  'This app shows projected utility-scale solar development in New England in 2030 & 2040. ' +
  ' Use the tools below to explore how solar development might expand on the landscape in the future. ',
  {fontSize: '15px'});
//TEXT PANEL
var panel = ui.Panel({
  widgets:[header, text],//adds header and text
  style:{width: '400px',position:'middle-right'}
});
//VARIABLE FOR ADDITIONAL TEXT & SEPERATORS
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
//Add panel to main panel
panel.add(intro);
//Add main to root
ui.root.insert(1,panel);
/////////////////////////////////////
//ADD CHECKBOX WIDGETS AND LEGENDS//
///////////////////////////////////
//Checkbox label
var suit = ui.Label({value:'Solar Siting Suitability: Green = Most Suitable, Red = Least Suitable, Blue = 0 Suitability',
  style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var solar = ui.Label({value:'Solar Development (year)',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
//Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
  var opacitySlider = ui.Slider({
    min: 0,
    max: 1,
    value: 1,
    step: 0.01,
  });
  opacitySlider.onSlide(function(value) {
    Map.layers().forEach(function(element, index) {
      element.setOpacity(value);
    });
  });
var suitCheck = ui.Checkbox('Solar Suitability').setValue(false);
var neCheck = ui.Checkbox('Solar FP 2016').setValue(false); //false = unchecked
var neCheck2 = ui.Checkbox('Solar FP 2001').setValue(false);
var ctCheck = ui.Checkbox('CT 2030').setValue(false); //false = unchecked
var ctCheck2 = ui.Checkbox('CT 2040').setValue(false);
var maCheck = ui.Checkbox('MA 2030').setValue(false);
var maCheck2 = ui.Checkbox('MA 2040').setValue(false);
var meCheck = ui.Checkbox('ME 2030').setValue(false);
var meCheck2 = ui.Checkbox('ME 2040').setValue(false);
var nhCheck = ui.Checkbox('NH 2030').setValue(false);
var nhCheck2 = ui.Checkbox('NH 2040').setValue(false);
var nyCheck = ui.Checkbox('NY 2030').setValue(false);
var nyCheck2 = ui.Checkbox('NY 2040').setValue(false);
var riCheck = ui.Checkbox('RI 2030').setValue(false);
var riCheck2 = ui.Checkbox('RI 2040').setValue(false);
var vtCheck = ui.Checkbox('VT 2030').setValue(false);
var vtCheck2 = ui.Checkbox('VT 2040').setValue(false);
panel.add(opacitySlider)
     .add(suit)
     .add(suitCheck)
     .add(solar)
     .add(neCheck)
     .add(neCheck2)
     .add(ctCheck)
     .add(ctCheck2)
     .add(maCheck)
     .add(maCheck2)
     .add(meCheck)
     .add(meCheck2)
     .add(nhCheck)
     .add(nhCheck2)
     .add(nyCheck)
     .add(nyCheck2)
     .add(riCheck)
     .add(riCheck2)
     .add(vtCheck)
     .add(vtCheck2);
var suitCheckbox = function() {
  suitCheck.onChange(function(checked){
  Map.layers().get(0).setShown(checked);
  })
}
suitCheckbox();
var neCheckbox = function() {
  neCheck.onChange(function(checked){
  Map.layers().get(1).setShown(checked);
  })
}
neCheckbox();
var neCheckbox1 = function() {
  neCheck2.onChange(function(checked){
  Map.layers().get(2).setShown(checked);
  })
}
neCheckbox1();
var ctCheckbox = function() {
  ctCheck.onChange(function(checked){
  Map.layers().get(3).setShown(checked);
  })
}
ctCheckbox();
var ctCheckbox1 = function() {
  ctCheck2.onChange(function(checked){
  Map.layers().get(4).setShown(checked);
  })
}
ctCheckbox1();
var maCheckbox = function() {
  maCheck.onChange(function(checked){
  Map.layers().get(5).setShown(checked);
  })
}
maCheckbox();
var maCheckbox1 = function() {
  maCheck2.onChange(function(checked){
  Map.layers().get(6).setShown(checked);
  })
}
maCheckbox1();
var meCheckbox = function() {
  meCheck.onChange(function(checked){
  Map.layers().get(7).setShown(checked);
  })
}
meCheckbox();
var meCheckbox1 = function() {
  meCheck2.onChange(function(checked){
  Map.layers().get(8).setShown(checked);
  })
}
meCheckbox1();
var nhCheckbox = function() {
  nhCheck.onChange(function(checked){
  Map.layers().get(9).setShown(checked);
  })
}
nhCheckbox();
var nhCheckbox1 = function() {
  nhCheck2.onChange(function(checked){
  Map.layers().get(10).setShown(checked);
  })
}
nhCheckbox1();
var nyCheckbox = function() {
  nyCheck.onChange(function(checked){
  Map.layers().get(11).setShown(checked);
  })
}
nyCheckbox();
var nyCheckbox1 = function() {
  nyCheck2.onChange(function(checked){
  Map.layers().get(12).setShown(checked);
  })
}
nyCheckbox1();
var riCheckbox = function() {
  riCheck.onChange(function(checked){
  Map.layers().get(13).setShown(checked);
  })
}
riCheckbox();
var riCheckbox1 = function() {
  riCheck2.onChange(function(checked){
  Map.layers().get(14).setShown(checked);
  })
}
riCheckbox1();
var vtCheckbox = function() {
  vtCheck.onChange(function(checked){
  Map.layers().get(15).setShown(checked);
  })
}
vtCheckbox();
var vtCheckbox1 = function() {
  vtCheck2.onChange(function(checked){
  Map.layers().get(16).setShown(checked);
  })
}
vtCheckbox1();