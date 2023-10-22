/*
  Wildfire visualization:
  https://pierre-markuse.net/2018/04/30/visualizing-wildfires-burn-scars-sentinel-hub-eo-browser/
  @Pierre_Markuse (https://twitter.com/Pierre_Markuse)
  to-do list:
  - Enable bookmark/share links functionality (i.e. pass lat, long, date, and zoom as get parameters)
  - Compose S2 and L8 scenes for more frequent monitoring (using ee.Join.saveBest functionality)
  - Image description: Wildfire, location (lat, long state, country) - date - NIR/SWIR view with IR overlay - Contains modified Copernicus Sentinel data [year], processed by Khaled Al-Shamaa, ICARDA
  - New reference to read: https://www.cimmyt.org/news/groundwater-conservation-policies-help-fuel-air-pollution-crisis-in-northwestern-india-new-study-finds/
  - Real-time Fire Mapping and Satellite Data: https://www.gislounge.com/real-time-fire-mapping-and-satellite-data/
  - Escape Route Index: A Spatially-Explicit Measure of Wildland Firefighter Egress Capacity https://www.mdpi.com/2571-6255/2/3/40/htm
  - SAR for burn scars detection: https://www.researchgate.net/publication/328277609_Sentinel-1_based_algorithm_to_detect_burned_areas
  - Risk management: GPW and Burn Scars, Accessibility and Active Fire
  - Background: https://pierre-markuse.net/2019/09/17/looking-at-wildfires-and-more-an-introduction/
  - Step by Step: Burn Severity mapping in Google Earth Engine:
    http://www.un-spider.org/advisory-support/recommended-practices/recommended-practice-burn-severity/burn-severity-earth-engine
  - Alternatives to burning can increase Indian farmers’ profits and cut pollution, new study shows
    https://www.cimmyt.org/news/alternatives-to-burning-can-increase-indian-farmers-profits-and-cut-pollution-new-study-shows/
  - Chandra suggestion: land use/land cover layer integration to present pie chart of sub-total by each category/class.
  - How to explore the fires yourself?
    1. Search for the images in the affected areas/dates. When you've found a fire, export a true color image.
    2. Once you have done that, you can use the False color (Urban) visualization to go further, 
       peek through the smoke and detect hot spots with possible active fires. It also makes the burn scar more visible.
    3. Additionally you can then use the SWIR visualization to even better show the burned areas, which show up in reddish tones.
    4. This method is easy and yields good results. If you want more, you can start exploring custom scripts to show fires even better. 
  - Why do fires burn faster uphill?
    1. There's less space between flames & new fuel to burn. 
    2. Radiant heat preheats the fuel in front of a fire, making it easier to ignite. 
    For every 10° in uphill slope, the speed of a fire will double.
    https://twitter.com/BOM_au/status/1194699078606737408
  - Lebanon wildfires, 33.73, 35.47, 2019-10-18 vs. 2019-10-13
    The total burned area in the scene is more than 500 ha. The second processed imagery taken in Oct 18, 2019 
    captured another ongoing activity on the ground related to the protests in Lebanon where demonstrators block 
    roads by burn tires! You can recognize at least two sites at the sea side road.
  - Earth Observation Australia - Understanding Fire in the Australian Landscape:
    https://www.eoa.org.au/meetings-activities-events/2019/12/12/whole-of-community-meeting
    https://www.youtube.com/watch?v=0hgGdU7w9JE
  - Diagnosing spatial uncertainties and relative biases in global fire emissions inventories: #Indonesia as regional case study
    https://globalfires.earthengine.app/view/firecam
    https://www.sciencedirect.com/science/article/pii/S0034425719305772?via%3Dihub
  - Look a little closer - the story of a satellite image and fire fighting missions in Australia
    https://philippgaertner.github.io/2020/01/satelliteimages-airplanes-fire/
  referencies:
  - Wildfires can also affect the dynamics of land cover, at both a spatial and temporal scale; disturbing not 
    only the soil structure, but the composition and competition of species as well. (Lhermitte et al., 2011)
    https://doi.org/10.1016/j.isprsjprs.2010.08.004
  - The burning of crop residue, or stubble, across millions of hectares of cropland between planting seasons is 
    a visible contributor to air pollution in both rural and urban areas. (CIMMYT, A Burning Issue)
    https://www.cimmyt.org/multimedia/a-burning-issue/
  - Reforming agricultural practices such as burning crop residues - which generates air pollution that lowers 
    life expectancy - is key to a healthier planet. (IFPRI, World Environment Day)
  - Gorelick, N., Hancher, M., Dixon, M., Ilyushchenko, S., Thau, D., & Moore, R. (2017). Google Earth Engine: 
    Planetary-scale geospatial analysis for everyone. Remote Sensing of Environment.
    https://doi.org/10.1016/j.rse.2017.06.031
*/
/* 
  Near Infrared (NIR):        Sentinel-2 B8 10m (8.34 µm), Landsat 5-7 B4 30m (0.77 - 0.9 µm), Landsat 8 B5 30m (0.85-0.88 µm)
  Shortwave Infrared (SWIR1): Sentinel-2 B11 20m (1.6 µm), Landsat 5-7 B5 30m (1.55 - 1.75 µm), Landsat 8 B6 30m (1.57-1.65 µm)
  Shortwave Infrared (SWIR2): Sentinel-2 B12 20m (2.2 µm), Landsat 5-7 B7 30m (2.08 - 2.35 µm), Landsat 8 B7 30m (2.11-2.29 µm)
  Land Surface Water Index (LSWI) = (NIR - SWIR1) / (NIR + SWIR1)
  Normalized Burn Ratio (NBR) = (NIR - SWIR2) / (NIR + SWIR2)
*/
var S2 = ee.ImageCollection("COPERNICUS/S2");
var SRTM = ee.Image("USGS/SRTMGL1_003");
var shade = ee.Terrain.hillshade(SRTM);
// A simple natural color band combination
var NaturalColors = function(img){
  var RED   = img.expression("2.9 * B4", {B4: img.select("B4")}).rename("RED");
  var GREEN = img.expression("3.1 * B3", {B3: img.select("B3")}).rename("GREEN");
  var BLUE  = img.expression("3.0 * B2", {B2: img.select("B2")}).rename("BLUE");
  return img.addBands(RED).addBands(GREEN).addBands(BLUE).select(["RED","GREEN","BLUE"]);
};
var NIRSWIRColors = function(img){
  //var RED   = img.expression("2.5 * B12", {B12: img.select("B12")}).rename("RED");
  //var GREEN = img.expression("1.2 * B8 + 0.8 * B11", {B8: img.select("B8"), B11: img.select("B11")}).rename("GREEN");
  //var BLUE  = img.expression("3.5 * B2", {B2: img.select("B2")}).rename("BLUE");
  var RED   = img.expression("B12", {B12: img.select("B12")}).rename("RED");
  var GREEN = img.expression("B7+(B12>1)", {B7: img.select("B7"), B12: img.select("B12")}).rename("GREEN");
  var BLUE  = img.expression("B2", {B2: img.select("B2")}).rename("BLUE");
  return img.addBands(RED).addBands(GREEN).addBands(BLUE).select(["RED","GREEN","BLUE"]);
};
var burnScars = function(img){
  // needs more research and improvements (e.g. use temporal drop of NDVI before and after the wildfire to detect the scars)
  var isBurnScars = img.expression("(((B8A - B12)/(B8A + B12)) + B11) < 0.15", {B8A: img.select("B8A"), B11: img.select("B11"), B12: img.select("B12")});
  return isBurnScars;
};
var activeFire = function(img){
  var isActiveFire = img.expression("B12 > 0.6", {B12: img.select("B12")});
  return isActiveFire;
};
var visParams = {min: 0, max: 1, gamma: 1.5};
var leftMap = ui.Map();
var leftLabel = ui.Label("True Color");
leftMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
leftMap.add(leftLabel);
var rightMap = ui.Map();
var rightLabel = ui.Label("NIR/SWIR");
rightMap.setControlVisibility(false);
rightMap.setControlVisibility({scaleControl: true});
rightMap.add(rightLabel);
var thumbMap = ui.Map().setControlVisibility(false);
var thumbMapStyle = {
  width: "300px", 
  height: "200px", 
  position: "top-right",
  margin:"0px", 
  padding:"0px",
};
var thumbMapPanel = ui.Panel([thumbMap], ui.Panel.Layout.flow("horizontal"), thumbMapStyle);
rightMap.add(thumbMapPanel);
var normalMode = ui.Button({label: "Normal Mode", style: {margin:"0px", padding:"0px"}});
normalMode.onClick(function() {
  textPanel.style().set("shown", true);
  thumbMapPanel.style().set("shown", true);
  normalModePanel.style().set("shown", false);
});
var normalModePanel = ui.Panel({widgets: [normalMode], style:{position:"top-right", shown: false, margin:"0px", padding:"0px",}});
rightMap.add(normalModePanel);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: "both"}
});
var linker = ui.Map.Linker([leftMap, rightMap]);
var image;
var getMap = function() {
  var to = ee.Date(end.getValue()).advance(1, "day");
  var from = to.advance(-60, "day");
  var coord = loc.getValue().split(/,/);
  var ROI = ee.Geometry.Point([parseFloat(coord[1]), parseFloat(coord[0])]);
  image = S2.filterBounds(ROI).filterDate(from, to).sort("system:index", false).first();
  var date = ee.Date(image.get("system:time_start")).format("MMM d, YYYY");
  image = image.multiply(0.0001);
  leftMap.layers().set(0, ui.Map.Layer(NaturalColors(image), visParams));
  rightMap.layers().set(0, ui.Map.Layer(NIRSWIRColors(image), visParams));
  var hsv = NIRSWIRColors(image).visualize({min: 0, max: 1}).divide(255).rgbToHsv();
  var hs = hsv.select(0, 1);
  var v = shade.divide(255);
  var rgb = hs.addBands(v).hsvToRgb().multiply(200).byte();
  rightMap.layers().set(1, ui.Map.Layer(rgb, {}));
  if(get3D.getValue() === false) rightMap.layers().get(1).setShown(false);
  leftLabel.setValue("True Color (" + date.getInfo() + ")");
  rightLabel.setValue("NIR/SWIR (" + date.getInfo() + ")");
  shareLink.setValue("Share/Download Link");
  shareLink.setUrl(getSentinelHubLink());
  ui.url.set('end', end.getValue());
  ui.url.set('loc', loc.getValue());
  //ui.url.set('zoom', leftMap.getZoom());
  leftMap.centerObject(ROI, leftMap.getZoom());
  //leftMap.layers().set(1, ui.Map.Layer(activeFire(image), {}));
  thumbMap.layers().set(1, ui.Map.Layer(ROI, {color: "red"}));
  thumbMap.centerObject(ROI, leftMap.getZoom()-6);
};
var getSentinelHubLink = function(){
  var date = end.getValue();
  var coord = loc.getValue().split(/,/);
  var lat = parseFloat(coord[0]);
  var lng = parseFloat(coord[1]);
  var evalScript = "cmV0dXJuIFtCMTIqMi41LEIwOCoxLjIrQjExKjAuOCxCMDIqMy41XQ%3D%3D";
  var link = "https://apps.sentinel-hub.com/sentinel-playground/?source=S2&lat=" + lat + "&lng=" + lng + 
             "&zoom=13&preset=CUSTOM&layers=B02,B08,B11,B12&maxcc=100&gain=1.0&gamma=1.5&time=" + date +
             "%7C" + date + "&atmFilter=&showDates=false&evalscript=" + evalScript + "&showImage";
  return link;
};
var getExample = function(lat, long, date){
  return ui.Thumbnail({
    image: NIRSWIRColors(S2.filterBounds(ee.Geometry.Point(long,lat)).filterDate(date, ee.Date(date).advance(1, "day")).first().multiply(0.0001)).visualize(visParams),
    params: {
      dimensions: "64x64",
      region: ee.Geometry.Rectangle(long - 0.05, lat - 0.05, long + 0.05, lat + 0.05).toGeoJSON(),
      format: "png"
    },
    onClick: function() {
      leftMap.setZoom(13);
      end.setValue(date);
      loc.setValue(lat + ", " + long);
    },
    style: {height: "64px", width: "64px"}
  });
};
leftMap.onClick(function(coords){loc.setValue(coords.lat.toFixed(4) + ", " + coords.lon.toFixed(4))});
rightMap.onClick(function(coords){loc.setValue(coords.lat.toFixed(4) + ", " + coords.lon.toFixed(4))});
var textPanel = ui.Panel({style: {width: "500px"}});
textPanel.add(ui.Label({
    value: "Mapping Burned Areas",
    style: {fontSize: "20px", fontWeight: "bold"}
}));
var addText = function(url, title, margin, str){
  var css = "";
  if(title) {
    css = {fontSize: "16px", fontWeight: "bold"};
  }else if(margin){
    css = {"text-align": "justify", margin: "-8px 8px 8px 8px"};
  }else{
    css = {"text-align": "justify"};
  }
  textPanel.add(ui.Label({
    targetUrl: url,
    value: str,
    style: css
  }));
};
addText("", false, true, "A simple natural color band combination (left), and NIR/SWIR combination \
        (right) to have good smoke penetration, better visible burn scars vs. healthy vegetation, \
        and nicely highlighted hot spots, showing areas with possible active fires and residual heat \
        in fire-like colors (i.e. IR heat emissions).");
var end = ui.Textbox({style: {"width": "130px"}});
var loc = ui.Textbox({style: {"margin": "0px 8px 8px 8px", "width": "130px"}});
end.setValue(ui.url.get('end','2017-08-03').toString());
loc.setValue(ui.url.get('loc','37.2, 9.3').toString());
//leftMap.setZoom(Number(ui.url.get('zoom', '13').toString()));
end.onChange(function(x){end.setValue(x); getMap();});
loc.onChange(function(x){loc.setValue(x); getMap();});
var back = ui.Button({
  label: "Previous",
  onClick: function() {
    end.setValue(ee.Date(end.getValue()).advance(-5, "day").format("YYYY-MM-dd").getInfo());
  }
});
var next = ui.Button({
  label: "Next",
  onClick: function() {
    end.setValue(ee.Date(end.getValue()).advance(5, "day").format("YYYY-MM-dd").getInfo());
  }
});
var today = ui.Button({
  label: "Today",
  onClick: function() {
    end.setValue(ee.Date(Date.now()).format("YYYY-MM-dd").getInfo());
  }
});
textPanel.add(ui.Panel([end, ui.Label({value: "Date (yyyy-mm-dd)", style: {"height": "30px"}}), back, next, today], ui.Panel.Layout.flow("horizontal")));
textPanel.add(ui.Panel([loc, ui.Label({value: "Coordinates (latitude, longitude in DD)", style: {"height": "30px", margin: "-2px 8px 8px 8px"}})], ui.Panel.Layout.flow("horizontal")));
var scarsArea = ui.Checkbox("Calculate Burned Area", false);
scarsArea.onChange(function(checked) {
  if(checked === true){
    // area is expressed in hectares (dividing pixel area by 10000)
    var areaLayer = ee.Image.pixelArea().divide(10000);
    var screenBounds = ee.Geometry.Rectangle(rightMap.getBounds());
    var scars = burnScars(image);
    var areaImage = scars.multiply(areaLayer);
    var area = areaImage.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: screenBounds,
      scale: 20,
      maxPixels: 1e13
    });
    leftMap.layers().set(1, ui.Map.Layer(scars.updateMask(scars.gt(0)), {palette: ["FF0000"]}));
    alert("Estimated total area of burn scars on the screen is " + Math.round(area.values().get(0).getInfo()) + " (ha)");
  }else{
    leftMap.layers().set(1, null);
  }
});
var get3D = ui.Checkbox("3D", false);
get3D.onChange(function(checked){ 
  if(checked === true){
    rightMap.layers().get(1).setShown(true);
  } else {
    rightMap.layers().get(1).setShown(false);
  }
});
var fullScreen = ui.Button("Full Screen Mode");
fullScreen.onClick(function() {
  textPanel.style().set("shown", false);
  thumbMapPanel.style().set("shown", false);
  normalModePanel.style().set("shown", true);
});
var shareLink = ui.Label();
shareLink.setUrl("https://apps.sentinel-hub.com/eo-browser/");
scarsArea.style().set("height", "30px");
get3D.style().set("height", "30px");
shareLink.style().set("height", "30px");
textPanel.add(ui.Panel([scarsArea, get3D, fullScreen, shareLink], ui.Panel.Layout.flow("horizontal")));
var eg1 = getExample(37.2, 9.3, "2017-08-02");
var eg2 = getExample(35.55, 37.7, "2019-05-23");
var eg3 = getExample(36.2, 41.65, "2019-06-29");
var eg4 = getExample(-7.7, -61.5, "2019-08-14");
var eg5 = getExample(29.24, 78.06, "2017-10-22");
textPanel.add(ui.Panel([eg1, eg2, eg3, eg4, eg5], ui.Panel.Layout.flow("horizontal")));
addText("", true, false, "Background");
addText("", false, true, "Stubble burning is intentionally setting fire to the straw stubble that remains after \
        grains, like paddy, wheat, etc., have been harvested. The burning of crop/plant residue across millions \
        of hectares is a visible contributor to number of environmental degradations from loss of soil carbon, \
        air pollution, contributing to global warning. India alone accounts 23 million tons of residue is burnt \
        in paddy fields every October-November to clear the field for conventional wheat sowing because of the \
        narrow window between paddy harvesting and wheat sowing. Residue burning is not limited to Asia, quite \
        widespread to other parts of the world. The efforts here to leverage the technological advances in digital \
        augmentation to estimate the extent of the burned areas, biomass loss, and related analytics on the real-time \
        basis to aid the decision to halt the process and measure the impacts.");
addText("", true, false, "Data Source");
addText("https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2", false, true, 
        "Sentinel-2 MSI: MultiSpectral Instrument, Level-1C dataset provided by the European Union/ESA/Copernicus.");
addText("", true, false, "Acknowledge");
addText("https://pierre-markuse.net/2018/04/30/visualizing-wildfires-burn-scars-sentinel-hub-eo-browser/", false, true,
        "This work is derivative and inspired by @Pierre_Markuse work on the wildfire visualization.");
addText("", true, false, "Disclaimer");
addText("", false, true, "The products elaborated in the framework of this project are realized to \
        the best of our ability, optimizing the available data and information. All geographic information \
        has limitations due to scale, resolution, date and interpretation of the original data sources.");
var pageGrid = ui.Panel([splitPanel,textPanel], ui.Panel.Layout.Flow("horizontal"), {stretch: "both"});
ui.root.widgets().reset([pageGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow("vertical"));
leftMap.setZoom(13);
getMap();