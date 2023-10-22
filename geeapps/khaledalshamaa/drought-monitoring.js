/*
Standardized Precipitation Index(SPI) is the number of standard deviations that observed cumulative precipitation deviates 
from the climatological average. It can be calculated for any time scale; various monthly & multi-monthly.
https://twitter.com/singhanil854/status/1185874343080820736
Recommended Practice: Drought monitoring using the Standard Vegetation Index (SVI):
http://www.un-spider.org/advisory-support/recommended-practices/recommended-practice-drought-monitoring-using-standard
Recommended Practice: Drought monitoring using the Vegetation Condition Index (VCI):
http://www.un-spider.org/advisory-support/recommended-practices/recommended-practice-drought-monitoring
Ref: Wilhite, D.A.; and M.H. Glantz. 1985. Understanding the Drought Phenomenon: The Role of Definitions. Water International 10(3):111–120.
https://digitalcommons.unl.edu/droughtfacpub/20/
https://digitalcommons.unl.edu/droughtfacpub/69/
Display an animation with one frame per image in the ImageCollection: ee.ImageCollection.getVideoThumbURL()
https://developers.google.com/earth-engine/ui_widgets#uithumbnail
To-do list:
- We can use MODIS Land Cover (MCD12Q1.006) for crop land mask.
  we can present the % of affected crop land by drought per country (e.g. for a given threshold)
- This kind of app. is important for policymakers to profiling risk and priority as well as community awareness.
- Count for different drought indices, for example: VCI (using NDVI or EVI), NDMI (used to determine vegetation water content), and TCI (using LST data).
- NDMI (https://www.usgs.gov/land-resources/nli/landsat/normalized-difference-moisture-index) 
  vs. NDWI (https://www.sentinel-hub.com/eoproducts/ndwi-normalized-difference-water-index)
- It may be a good idea to composite different drought indices (e.g. VCI, NDMI, and TCI) in one RGB map presentation.
- use GEE ui.url.get and set functions to build a sharable link save the current status of the app visualization (zoom, center coords, and parameters) 
Dr. Chandra advice to add:
- Drought Reconnaissance Index (DRI) which required monthly temperature and precipitation.
- Normalized Difference Water Index (NDWI) and Land Surface Water Index (LSWI) which required satellite images.
https://resourcewatch.org/data/explore/cli023-Standard-Precipitation-Index
https://www.tandfonline.com/doi/pdf/10.1080/2150704X.2016.1264020
https://earthobservatory.nasa.gov/images/145762/a-flash-drought-dries-the-southeast
http://www.bom.gov.au/climate/drought/#tabs2=Water&tabs=Drought
https://bigdata.cgiar.org/rss-article/mapping-drought-induced-changes-in-rice-area-in-india/
https://earthobservatory.nasa.gov/images/145874/long-term-drought-parches-chile
https://www.cimmyt.org/news/agricultural-solutions-to-tackle-humanitys-climate-crisis/
https://www.youtube.com/watch?v=VANNqJP5Feg
*/
//var GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_V05").select("precipitationCal");
//var TRMM = ee.ImageCollection("TRMM/3B43V7").select("precipitation");
var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select("precipitation");
var MOD13Q1 = ee.ImageCollection("MODIS/006/MOD13Q1").select("EVI");
var LSIB = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var indices = {SVI: "SVI", SPI: "SPI"};
var countries = {
  Egypt: "Egypt,Halaib Triangle",
  Ethiopia: "Ethiopia",
  Iran: "Iran",
  Iraq: "Iraq", 
  Jordan: "Jordan", 
  Lebanon: "Lebanon",
  Morocco: "Morocco,Western Sahara",
  Syria: "Syria", 
  Tunisia: "Tunisia",
  Turkey: "Turkey", 
};
var timeScales = {1: 1, 3: 3, 6: 6, 9: 9, 12: 12, 24: 24};
var timeSeries = {5: 5, 10: 10, 15: 15, 20: 20, 25: 25, 30: 30};
var allMonths = {};
for(var i = 1; i <= 12; i++) allMonths[i] = i;
var allYears = {};
var lastYear = new Date().getFullYear();
for (var i = lastYear; i >= 2015; i--) allYears[i] = i;
var index, country, months, minimum, selYear, selMonth, title, dataset, ROI, TS;
var getParams = function() {
  index = selIndex.getValue();
  country = selCountry.getValue();
  months = selTimescale.getValue();
  minimum = selTimeseries.getValue();
  selYear = calcYear.getValue();
  selMonth = calcMonth.getValue();
  if(index == "SPI"){
    title = "Standardized Precipitation Index";
    dataset = CHIRPS;
  }else if(index == "SVI"){
    title = "Standardized Vegetation Index";
    dataset = MOD13Q1;
  }
  ROI = LSIB.filter(ee.Filter.inList("country_na", countries[country].split(",")));
};
var updateMap = function(selection) {
  getParams();
  mapPanel.layers().set(0, ui.Map.Layer(indicator(dataset).select("SI").clip(ROI), siVis, index));
  updateShareLink();
  chartPanel.style().set("shown", false);
  mapTitle.setValue(title);
  legendTitle.setValue(index);
  mapPanel.centerObject(ROI);
};
var selIndex = ui.Select({items: Object.keys(indices)});
var selCountry = ui.Select({items: Object.keys(countries)});
var selTimescale = ui.Select({items: Object.keys(timeScales)});
var selTimeseries = ui.Select({items: Object.keys(timeSeries)});
var calcYear = ui.Select({items: Object.keys(allYears)});
var calcMonth = ui.Select({items: Object.keys(allMonths)});
selIndex.setValue(ui.url.get('index','SVI'));
selCountry.setValue(ui.url.get('country','Egypt'));
selTimescale.setValue(ui.url.get('scale','3').toString());
selTimeseries.setValue(ui.url.get('series','30').toString());
var current = new Date();
current = ee.Date(current.setDate(0));
calcYear.setValue(ui.url.get('year',current.format("YYYY").getInfo()).toString());
calcMonth.setValue(ui.url.get('month',current.format("M").getInfo()).toString());
selIndex.onChange(updateMap);
selCountry.onChange(updateMap);
selTimescale.onChange(updateMap);
selTimeseries.onChange(updateMap);
calcYear.onChange(updateMap);
calcMonth.onChange(updateMap);
var shareLink = ui.Label({value: 'Share Link', targetUrl: '#'});
var updateShareLink = function() {
  ui.url.set('index', selIndex.getValue());
  ui.url.set('country', selCountry.getValue());
  ui.url.set('scale', selTimescale.getValue());
  ui.url.set('series', selTimeseries.getValue());
  ui.url.set('year', calcYear.getValue());
  ui.url.set('month', calcMonth.getValue());
  var link = 'https://khaledalshamaa.users.earthengine.app/view/drought-monitoring#index=' + selIndex.getValue() +
             ';country=' + selCountry.getValue() + ';scale=' + selTimescale.getValue() + ';series=' + 
             selTimeseries.getValue() + ';year=' + calcYear.getValue() + ';month=' + calcMonth.getValue() + ';';
  shareLink.setUrl(link);
};
getParams();
var indicator = function(dataset){
  var from = ee.Date(new Date(selYear, selMonth - months, 2));
  var to = ee.Date(new Date(selYear, selMonth, 1));
  var i, x, image;
  if(index == "SPI"){
    image = dataset.filterDate(from, to).sum().rename("last");
  }else{
    image = dataset.filterDate(from, to).mean().rename("last");
  }
  for(i = 1; i <= minimum; i++){
      var iFrom = ee.Date(new Date(selYear - i, selMonth - months, 2));
      var iTo   = ee.Date(new Date(selYear - i, selMonth, 1));
      var iYear = iTo.format("YYYY");
      if(index == "SPI"){
        x = dataset.filterDate(iFrom, iTo).sum().rename(iYear);  
      }else{
        x = dataset.filterDate(iFrom, iTo).mean().rename(iYear);
      }
      image = image.addBands(x);
  }
  if(index == "SPI"){
    TS = image;  
  }else{
    TS = image.multiply(0.0001);
  }
  var mean = image.reduce(ee.Reducer.mean()).rename("mean");
  var std = image.reduce(ee.Reducer.stdDev()).rename("std");
  var min = image.reduce(ee.Reducer.min()).rename("min");
  var max = image.reduce(ee.Reducer.max()).rename("max");
  image = image.addBands(mean).addBands(std).addBands(min).addBands(max);
  var si = image.expression(
      "(last - mean) / std",
      {
        "last": image.select("last"),
        "mean": image.select("mean"),
        "std": image.select("std")
      }
  ).rename("SI");
  var ci = image.expression(
      "100 * (last - min) / (max - min)",
      {
        "last": image.select("last"),
        "min": image.select("min"),
        "max": image.select("max")
      }
  ).rename("CI");
  return(image.addBands(si).addBands(ci));
};
var droughtPalette = ["8b0000","a53800","d6aa01","ffffff","9bc102","388501","366235"];
var siNames = ["-3.0", "-2.0","-1.0","0.0","1.0","2.0","3.0"];
var siVis = {min: -2.5, max: 2.5, palette: droughtPalette.join(",")};
var ciVis = {min: 0, max: 100, palette: droughtPalette.join(",")};
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(ui.Map.Layer(indicator(dataset).select("SI").clip(ROI), siVis, index));
var mapTitle = ui.Label(title);
mapPanel.add(mapTitle);
var textPanel = ui.Panel({style: {width: "480px"}});
textPanel.add(ui.Label({value: "Drought Indicators and Indices", style: {fontSize: "20px", fontWeight: "bold"}}));
textPanel.add(ui.Panel([ui.Label({value: "Select Drought Index:", style: {height: "30px", width: "200px"}}), selIndex], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Panel([ui.Label({value: "Select Country:", style: {height: "30px", width: "185px"}}), selCountry], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Panel([ui.Label({value: "Select Time Scale (months):", style: {height: "30px", width: "200px"}}), selTimescale], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Panel([ui.Label({value: "Time Series Long (years):", style: {height: "30px", width: "200px"}}), selTimeseries], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Panel([ui.Label({value: "Calculated for:", style: {height: "30px", width: "135px"}}), calcMonth, calcYear], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Panel([shareLink], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Label({value: "In 2009, WMO recommended SPI as the main meteorological drought index that countries \
                                should use to monitor and follow drought conditions (Hayes, 2011). By identifying SPI \
                                as an index for broad use, WMO provided direction for countries trying to establish a \
                                level of drought early warning.", style: {"text-align": "justify"}}));
textPanel.add(ui.Label({value: "SPI uses historical precipitation records for any location to develop a probability of \
                                precipitation that can be computed at any number of timescales, from 1 month to 48 months \
                                or longer.", style: {"text-align": "justify"}}));
textPanel.add(ui.Label({value: "The ability of SPI to be calculated at various timescales allows for multiple applications. \
                                Depending on the drought impact in question, SPI values for 3 months or less might be useful \
                                for basic drought monitoring, values for 6 months or less for monitoring agricultural impacts \
                                and values for 12 months or longer for hydrological impacts.", style: {"text-align": "justify"}}));
textPanel.add(ui.Label({value: "References", style: {fontSize: "16px", fontWeight: "bold"}}));
textPanel.add(ui.Label({value: "* The Lincoln Declaration on Drought Indices, Universal Meteorological Drought Index Recommended", 
                        targetUrl: "https://journals.ametsoc.org/doi/pdf/10.1175/2010BAMS3103.1"}));
textPanel.add(ui.Label({value: "* Handbook of Drought Indicators and Indices", 
                        targetUrl: "https://library.wmo.int/index.php?lvl=notice_display&id=19498"}));
textPanel.add(ui.Label({value: "* Standardized Precipitation Index User Guide", 
                        targetUrl: "https://library.wmo.int/index.php?lvl=notice_display&id=13682"}));
textPanel.add(ui.Label({value: "* Wilhite and Glantz definitions of drought types/categories", 
                        targetUrl: "https://drought.unl.edu/Education/DroughtIn-depth/TypesofDrought.aspx"}));
var pageGrid = ui.Panel([mapPanel,textPanel], ui.Panel.Layout.Flow("horizontal"), {stretch: "both"});
ui.root.widgets().reset([pageGrid]);
var legendTitle;
var legend = function(palette, names, lbl, pos) {
  // set position of panel
  var legend = ui.Panel({style:{position:pos, padding:"8px 15px"}});
  // Create legend title
  legendTitle = ui.Label({value:lbl, style:{margin:"0 0 4px 0", padding:"0"}});
  // Add the title to the panel
  legend.add(legendTitle);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({style:{backgroundColor:"#"+color, border:"1px solid black", padding:"8px", margin:"0 0 4px 0"}});
    // Create the label filled with the description text.
    var description = ui.Label({value:name, style:{margin:"0 0 4px 6px"}});
    // return the panel
    return ui.Panel({widgets:[colorBox, description], layout:ui.Panel.Layout.Flow("horizontal")});
  };
  // Add color and and names
  for (var i = 0; i < palette.length; i++) legend.add(makeRow(palette[i], names[i]));
  return legend;
};
var legendPanel = legend(droughtPalette, siNames, index, "bottom-left");
mapPanel.add(legendPanel);
mapPanel.centerObject(ROI);
updateShareLink();
var chartPanel = ui.Panel();
chartPanel.style().set({width: "600px", height: "250px", position: "bottom-right", shown: false});
mapPanel.add(chartPanel);
function getChart(coords){
  var point = ee.Geometry.Point(coords.lon, coords.lat).buffer(500);
  var graph = ui.Chart.image.regions(TS, point, ee.Reducer.mean(), 250);
  var vTitle;
  if(index == "SPI"){
    vTitle = "Precipitation (mm)";  
  }else{
    vTitle = "EVI";
  }
  graph.setChartType("ColumnChart");
  graph.setOptions({title: "", vAxis: {title: vTitle}, legend: {position: "none"}});
  chartPanel.clear().add(graph);
  chartPanel.style().set("shown", true);
}
mapPanel.onClick(getChart);
mapPanel.style().set("cursor", "crosshair");