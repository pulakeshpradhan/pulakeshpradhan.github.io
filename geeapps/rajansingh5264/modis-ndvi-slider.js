var MODIS = ee.ImageCollection("MODIS/006/MOD13Q1"),
    LSIB = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var index = "NDVI";
var indexPalette = ["FFFFFF","FFFACD","9ACD32","008000","006400"];
var diffPalette  = ["FF0000","FF8888","FFFFFF","8888FF","0000FF"];
var indexNames   = ["0.0","0.2","0.4","0.6","0.8"];
var diffNames    = ["-0.4","-0.2"," 0.0","+0.2","+0.4"];
var mapStyle = [{stylers: [{saturation: -100}]}, 
                {elementType:"labels", stylers:[{visibility:"off"}]},
                {featureType:"road", stylers:[{visibility:"off"}]}];
// ===================== Define the ROI ===========================
var countryList = ["Afghanistan", "Algeria", "Bahrain", "Bangladesh", "Bhutan", "China", "Cyprus", 
                  "Djibouti", "Egypt", "Eritrea", "Ethiopia", "Halaib Triangle", "India", "Gaza Strip", 
                  "Iran", "Iraq", "Israel", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", 
                  "Lebanon", "Libya", "Mauritania", "Morocco", "Nepal", "Oman", "Pakistan", "Qatar", 
                  "Syria", "Saudi Arabia", "Somalia", "South Sudan", "Sudan", "Taiwan", "Tajikistan", 
                  "Tanzania", "Tunisia", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", 
                  "West Bank", "Western Sahara", "Yemen"];
var ROI = LSIB.filter(ee.Filter.or(ee.Filter.inList("country_na", countryList), ee.Filter.and(
                      ee.Filter.eq("country_co", "UU"), ee.Filter.inList("wld_rgn", ["S Asia", "SW Asia"]))));
// ============= Function to render VI and return the Map ============
var getAnnualMean = function(start, end, index, indexPalette){
  var map = MODIS.filterDate(start, end).select(index).mean().multiply(0.0001).clip(ROI);
  return map.visualize({min: 0, max: 0.8, palette: indexPalette});
};
// ======= Function to render diff. VI map in the right panel ========
var getDiffMap = function(){
  var leftStart, leftEnd, rightStart, rightEnd;
  if (leftSelect.getValue() == "Long term average") {
    leftStart = "2000" + seasonStart;
    leftEnd = lastYear + seasonEnd;
  }else{
    leftStart = leftSelect.getValue().split(" / ")[0] + seasonStart;
    leftEnd = leftSelect.getValue().split(" / ")[1] + seasonEnd;
  }
  if (rightSelect.getValue() == "Long term average") {
    rightStart = "2000" + seasonStart;
    rightEnd = lastYear + seasonEnd;
  }else{
    rightStart = rightSelect.getValue().split(" / ")[0] + seasonStart;
    rightEnd = rightSelect.getValue().split(" / ")[1] + seasonEnd;
  }
  var refMap = MODIS.filterDate(leftStart, leftEnd).select(index).mean().multiply(0.0001).clip(ROI);
  var cmpMap = MODIS.filterDate(rightStart, rightEnd).select(index).mean().multiply(0.0001).clip(ROI);
  var diffMap = cmpMap.subtract(refMap);
  var diffMapVis = diffMap.visualize({min: -0.4, max: 0.4, palette: diffPalette});
  rightMap.layers().set(0, ui.Map.Layer(diffMapVis));
};
// ============ Function to build up the legend panel ===============
var addLegend = function(palette, names, lbl, pos) {
  var legend      = ui.Panel({style:{position:pos, padding:"8px 15px"}});
  var legendTitle = ui.Label({value:lbl, style:{margin:"0 0 4px 0", padding:"0"}});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
    var colorBox    = ui.Label({style:{backgroundColor:"#"+color, border:"1px solid black", padding:"8px", margin:"0 0 4px 0"}});
    var description = ui.Label({value:name, style:{margin:"0 0 4px 6px"}});
    return ui.Panel({widgets:[colorBox, description], layout:ui.Panel.Layout.Flow("horizontal")});
  };
  for (var i = palette.length-1; i >= 0; i--) legend.add(makeRow(palette[i], names[i]));
  return legend;
};
// =================== Get the last year available =================
var now = new Date();
var lastMonth = now.getMonth() + 1;
var lastYear = now.getFullYear() - 1;
if(lastMonth < seasonStart) lastYear--;
// ================== Build up select year options ==================
var seasonStart = "-09-01";
var seasonEnd   = "-08-31";
var years = {};
var NDVI = {};
var EVI = {};
var i;
years["Long term average"] = "Long term average";
NDVI["Long term average"] = getAnnualMean("2000" + seasonStart, lastYear + seasonEnd, "NDVI", indexPalette);
EVI["Long term average"] = getAnnualMean("2000" + seasonStart, lastYear + seasonEnd, "NDVI", indexPalette);
for (i = lastYear; i >= 2000; i--) { 
  years[i+" / "+(i+1)] = i + " / " + (i+1);
  NDVI[i+" / "+(i+1)] = getAnnualMean(i + seasonStart, (i+1) + seasonEnd, "NDVI", indexPalette);
  EVI[i+" / "+(i+1)] = getAnnualMean(i + seasonStart, (i+1) + seasonEnd, "EVI", indexPalette);
}
// == Build up checkbox to switch between actual or diff VI values ==
var doCompare = ui.Checkbox("Difference Map", false);
var diffLegendPanel = addLegend(diffPalette, diffNames, "VI Diff.", "bottom-right");
diffLegendPanel.style().set("shown", false);
doCompare.onChange(function(checked) {
  if(doCompare.getValue() === true) {
    getDiffMap();
    diffLegendPanel.style().set("shown", true);
  }else{
    if(index == "NDVI"){
      rightMap.layers().set(0, ui.Map.Layer(NDVI[rightSelect.getValue()]));
    }else{
      rightMap.layers().set(0, ui.Map.Layer(EVI[rightSelect.getValue()]));
    }
    diffLegendPanel.style().set("shown", false);
  }
  print(index);
});
// ================ Create the left map components ==================
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
leftMap.setOptions("Gray", {"Gray": mapStyle});
var updateLeftMap = function(selection) {
  if(index == "NDVI"){
    leftMap.layers().set(0, ui.Map.Layer(NDVI[selection]));
  }else{
    leftMap.layers().set(0, ui.Map.Layer(EVI[selection]));
  }
  if(doCompare.getValue() === true) getDiffMap();
};
var leftLabel = ui.Label("Choose the season");
var leftSelect = ui.Select({items: Object.keys(years), onChange: updateLeftMap});
leftSelect.setValue(Object.keys(years)[2], true);
var leftNote = ui.Label("Reference Map");
var leftControlPanel = ui.Panel({widgets: [leftLabel, leftSelect, leftNote], style: {position: "bottom-left"}});
leftMap.add(leftControlPanel);
var viLegendPanel = addLegend(indexPalette, indexNames, "VI value", "bottom-left");
leftMap.add(viLegendPanel);
// =============== Create the right map components ==================
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.setControlVisibility({scaleControl: true});
rightMap.setOptions("Gray", {"Gray": mapStyle});
var rightLabel = ui.Label("Choose the season");
var updateRightMap = function(selection) {
  if(doCompare.getValue() === true){
    getDiffMap();
  }else{
    if(index == "NDVI"){
      rightMap.layers().set(0, ui.Map.Layer(NDVI[selection]));
    }else{
      rightMap.layers().set(0, ui.Map.Layer(EVI[selection]));
    }
  }
};
var rightSelect = ui.Select({items: Object.keys(years), onChange: updateRightMap});
rightSelect.setValue(Object.keys(years)[1]);
var rightControlPanel = ui.Panel({widgets: [rightLabel, rightSelect, doCompare], style: {position: "bottom-right"}});
rightMap.add(rightControlPanel);
rightMap.add(diffLegendPanel);
// =============== Select the VI index (i.e. NDVI or VI) =============
var updateIndex = function(selection) {
  index = selection;
  updateLeftMap(leftSelect.getValue());
  updateRightMap(rightSelect.getValue());
};
var viSelect = ui.Select({items: ["NDVI", "EVI"], onChange: updateIndex});
viSelect.setValue("NDVI");
var viLabel = ui.Label("Vegetation Index");
var indexSelectPanel = ui.Panel({widgets: [viLabel,viSelect], style: {position: "top-right"}});
rightMap.add(indexSelectPanel);
// =================== Text panel at the map footer ==================
var refPanel = ui.Panel([
  ui.Label({
    value: "Author & Data Source Reference",
    style: {fontSize: "20px", fontWeight: "bold", margin: "0px 8px 0px 8px"}
  }),
  ui.Label({
    targetUrl: "https://doi.org/10.5067/modis/mod13q1.006", 
    style: {margin: "0px 8px 0px 8px"}, 
    value: "Rajan Kumar Singh. MOD13Q1 MODIS/Terra Vegetation Indices 16-Day L3 Global 250m SIN Grid V006 [Data set]. NASA EOSDIS LP DAAC. doi: 10.5067/MODIS/MOD13Q1.006"
  })
]);
var discPanel = ui.Panel([
  ui.Label({
    value: "MODIS NDVI Slider App - Disclaimer",
    style: {fontSize: "20px", fontWeight: "bold", margin: "8px 8px 0px 8px"}
  }),
  ui.Label({
    style: {margin: "0px 8px 0px 8px"}, 
    value: "The products elaborated in the framework of this project are realized to the best of our ability, optimizing the available data and information. All geographic information has limitations due to scale, resolution, date and interpretation of the original data sources. The project is developed for NASA SPACE APPS CHALLENGE 2022."
  })
]);
var textPanel = ui.Panel({style: {height: "100px"}});
textPanel.add(refPanel);
textPanel.add(discPanel);
// ================ Build up the whole page structure =================
var splitPanel = ui.SplitPanel({firstPanel: leftMap, secondPanel: rightMap, wipe: true, style: {stretch: "both"}});
var linker = ui.Map.Linker([leftMap, rightMap]);
var pageGrid = ui.Panel([splitPanel,textPanel], ui.Panel.Layout.Flow("vertical"), {stretch: "both"});
ui.root.widgets().reset([pageGrid]);
leftMap.centerObject(ROI, 4);