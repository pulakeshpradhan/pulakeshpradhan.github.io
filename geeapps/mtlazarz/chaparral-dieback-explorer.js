var boundary = ui.import && ui.import("boundary", "table", {
      "id": "projects/ee-mitchkade/assets/SouthCoast_boundary"
    }) || ee.FeatureCollection("projects/ee-mitchkade/assets/SouthCoast_boundary"),
    mask = ui.import && ui.import("mask", "image", {
      "id": "projects/ee-mitchkade/assets/chaparral_mask"
    }) || ee.Image("projects/ee-mitchkade/assets/chaparral_mask"),
    fires = ui.import && ui.import("fires", "table", {
      "id": "projects/ee-mitchkade/assets/SCfires_1985_2020"
    }) || ee.FeatureCollection("projects/ee-mitchkade/assets/SCfires_1985_2020"),
    drought = ui.import && ui.import("drought", "imageCollection", {
      "id": "GRIDMET/DROUGHT"
    }) || ee.ImageCollection("GRIDMET/DROUGHT"),
    ls8SR = ui.import && ui.import("ls8SR", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    ls7SR = ui.import && ui.import("ls7SR", "imageCollection", {
      "id": "LANDSAT/LE07/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LE07/C02/T1_L2"),
    ls5SR = ui.import && ui.import("ls5SR", "imageCollection", {
      "id": "LANDSAT/LT05/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT05/C02/T1_L2"),
    AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
// Simplify study area boundary
var boundary = boundary.geometry().simplify(1000);
// -----------------------FUNCTION------------------------------------//
var run = function(xx, yy, zz){
var year_list = ee.List.sequence(1985,2020,1);
//// ------------------- DROUGHT TIME SERIES ------------------------ ////
// All images between June and August regardless of year //
var dry_season_pdsi = drought.filterBounds(boundary).filter(ee.Filter.calendarRange(6, 9, "month"));
dry_season_pdsi = dry_season_pdsi.map(function(img){
                        var img30 = img.resample('bicubic').reproject({crs: "EPSG:4326", scale: 30});
                        return img30});
// All dry season means from 1985 - 2020
var dry_season_means = ee.ImageCollection(year_list.map(function(year){
  var year_filter = dry_season_pdsi.filter(ee.Filter.calendarRange(year, year, "year"));
  var dry_mean = year_filter.select("pdsi").mean().rename("pdsi");
  var year_numb = ee.Number(year).toInt();
  var date = ee.Date(ee.String(year_numb).cat("-06-01"));
  var dry_mean_set = dry_mean.set({"system:time_start": date, "year": year});
  return dry_mean_set;
}));
// All images between November and December //
var wet_season_pdsi1 = drought.filterBounds(boundary).filter(ee.Filter.calendarRange(11, 12, "month"));
wet_season_pdsi1 = wet_season_pdsi1.map(function(img){
                        var img30 = img.resample('bicubic').reproject({crs: "EPSG:4326", scale: 30});
                        return img30});
// All images between January and May //
var wet_season_pdsi2 = drought.filterBounds(boundary).filter(ee.Filter.calendarRange(1, 5, "month"));
wet_season_pdsi2 = wet_season_pdsi2.map(function(img){
                        var img30 = img.resample('bicubic').reproject({crs: "EPSG:4326", scale: 30});
                        return img30});
// Wet seasons means from 1985 - 2020 //
// Function calculates wet season mean //
var wet_season_means = ee.ImageCollection(year_list.map(function(year){
  var year_minus1 = ee.Number(year).subtract(1);
  var year_filter1 = wet_season_pdsi1.filter(ee.Filter.calendarRange(year_minus1, year_minus1, "year"));
  var year_filter2 = wet_season_pdsi2.filter(ee.Filter.calendarRange(year, year, "year"));
  var filter_merge = year_filter1.merge(year_filter2);
  var wet_mean = filter_merge.select("pdsi").mean().rename("pdsi");
  var year_num = ee.Number(year).toInt();
  var date = ee.Date(ee.String(year_num).cat("-01-01"));
  var wet_mean_set = wet_mean.set({"system:time_start": date, "year": year});
  return wet_mean_set;
}));
// Merge wet and dry season pdsi means
var all_seasons_means = wet_season_means.merge(dry_season_means);
//// ----------------------------- CLASSIFY DROUGHT ------------------------------- ////
// Drought Classification:
// EXTREME = < -4 (3)
// SEVERE = -3 - -3.9 (2)
// MODERATE = -2 - -2.9 (1)
// WET / ANYTHING ABOVE -2 (0)
// Both seasons' droughts are classified here
var drought_class = all_seasons_means.map(function(image){
  var pdsi = image.select("pdsi");
  var pdsi_class = ee.Image(0).where(pdsi.lte(-4), 3)
                            .where(pdsi.gt(-4).and(pdsi.lte(-3)), 2)
                            .where(pdsi.gt(-3).and(pdsi.lte(-2)), 1).rename("pdsi_class");
  var all_class = pdsi_class.copyProperties(image, ["system:time_start"]);
  return all_class;
}).sort("system:time_start");  // sort by "system:time_start" to rearrange in chronological order
//// ------------------------- DROUGHT MOVING WINDOW ----------------------------- ////
// Drought conditions to cause potential dieback within 5 year moving window
// 1 extreme drought season
// 2 consecutive severe drought seasons
// 4 consecutive moderate drought seasons
var year_list2 = ee.List.sequence(1990, 2020, 1);
// List for severe moving window
var index1 = ee.List.sequence(0,8,1);
var index2 = ee.List.sequence(1,9,1);
var severe_index = index1.zip(index2);
// List for moderate moving window
var moderate_list = ee.List([]);
for (var i = 0; i < 7; i++){
  var i0 = i;
  var i1 = i+1;
  var i2 = i+2;
  var i3 = i+3;
  var sublist = [i0, i1, i2, i3];
  moderate_list = moderate_list.add(sublist);
}
// Function to create flags for drought conditions during 5 year moving window
var drought_flags = ee.ImageCollection(year_list2.map(function(year){
  var year_date = ee.Date(ee.String(ee.Number(year).toInt()).cat("-01-01"));  // year to date (ex. 1990 to "1990-01-01")
  var year_minus5 = ee.Number(year).subtract(5).toInt();
  var year5_date = ee.Date(ee.String(year_minus5).cat("-01-01"));             // pre-year to date (ex. 1985 to "1985-01-01")
  var window_filter = drought_class.filterDate(year5_date, year_date);        // filter dates (ex. 1985-01-01 to 1990-01-01)
  // Pixels are flagged in moving window if 1 extreme drought season occurred
  var extreme_reclass = ee.ImageCollection(window_filter.map(function(image){                  
    var extreme_class = ee.Image(1).where(ee.Image(image).neq(3), 0);
    return extreme_class}));
  var extreme_cond = extreme_reclass.reduce(ee.Reducer.anyNonZero()).rename("extreme_flag");
  // Pixels are flagged in moving window if 2 consecutive severe drought seasons occurred
  var severe_reclass = window_filter.map(function(image){                  
    var severe_class = ee.Image(1).where(ee.Image(image).lt(2), 0);
    return severe_class}).toList(10);
  var severe_id = ee.ImageCollection(severe_index.map(function(index){
    var index0 = ee.Number(ee.List(index).get(0));
    var index1 = ee.Number(ee.List(index).get(1));
    var flag = ee.Image(severe_reclass.get(index0)).multiply(ee.Image(severe_reclass.get(index1)));  // multiply is a boolean "and"
    return flag;
  }));
  var severe_cond = severe_id.reduce(ee.Reducer.anyNonZero()).rename("severe_flag");  // if any pixel is 1 in the series, return 1.  otherwise 0
  // Pixels are flagged in moving window if 4 consecutive moderate drought seasons occurred
  var moderate_reclass = window_filter.map(function(image){                  
    var moderate_class = ee.Image(1).where(ee.Image(image).lt(1), 0);
    return moderate_class}).toList(10);
  var moderate_id = ee.ImageCollection(moderate_list.map(function(index){
    var index0 = ee.Number(ee.List(index).get(0));
    var index1 = ee.Number(ee.List(index).get(1));
    var index2 = ee.Number(ee.List(index).get(2));
    var index3 = ee.Number(ee.List(index).get(3));
    var flag = ee.Image(moderate_reclass.get(index0))                       // multiply is a boolean "and"
                        .multiply(ee.Image(moderate_reclass.get(index1)))
                        .multiply(ee.Image(moderate_reclass.get(index2)))
                        .multiply(ee.Image(moderate_reclass.get(index3)));  // if any pixel is 1 in the series, return 1.  otherwise 0
    return flag;
  }));
  var moderate_cond = moderate_id.reduce(ee.Reducer.anyNonZero()).rename("moderate_flag");
  // Combine all three drought flag conditions
  var drought_flag = extreme_cond.or(severe_cond).or(moderate_cond).rename("drought_flag");  // if any pixel is 1, return 1. otherwise 0
  var all_conditions = drought_flag.addBands(extreme_cond)
                                   .addBands(severe_cond)
                                   .addBands(moderate_cond)
                                   .set({"year": year});
  return all_conditions;
}));                                                       ////////////// end of drought classification /////////////////
////// OUTPUT = "drought_flags" //////////
/// --------------- NDVI indicator for potential dieback --------------- ///
///////////////
// FUNCTIONS //
///////////////
// SPECTRAL FUNCTIONS TO CREATE COLLECTIONS //
var index_select_8 = ee.List(ee.Algorithms.If(zz, ['SR_B5', 'SR_B4'], ['SR_B5', 'SR_B7']));
var index_select_5_7 = ee.List(ee.Algorithms.If(zz, ['SR_B4', 'SR_B3'], ['SR_B4', 'SR_B7']));
// Landsat 8 NDVI function
var ls8_Indices = function(lsImg){
  var ndvi  = lsImg.normalizedDifference(index_select_8).toFloat();
  var qa = lsImg.select(['QA_PIXEL']);
  return ndvi.addBands([qa])
      .select([0,1], ['ndvi','QA_PIXEL'])
      .copyProperties(lsImg, ['system:time_start']);
  };
// Landsat 5 & 7 NDVI function
var ls5_7_Indices = function(lsImg){
  var ndvi  = lsImg.normalizedDifference(index_select_5_7).toFloat();
  var qa = lsImg.select(['QA_PIXEL']);
  return ndvi.addBands([qa])
      .select([0,1], ['ndvi','QA_PIXEL'])
      .copyProperties(lsImg, ['system:time_start']);
  };
// Cloud and Cloud Shadow Mask function
var lsMask = function(lsImg){
  var pixQa =lsImg.select(['QA_PIXEL']);
  var cloudShadowBitMask = (1 << 3);
  var cloudBitMask = (1 << 4);
  var snowBitMask = (1 << 5);
  var mask = pixQa.bitwiseAnd(cloudShadowBitMask).eq(0)
                .and(pixQa.bitwiseAnd(cloudBitMask).eq(0))
                .and(pixQa.bitwiseAnd(snowBitMask).eq(0));
  return lsImg.updateMask(mask);
};
// Map spectral functions across Landsat 5, 7, 8 Collections
var ls8 = ls8SR.map(ls8_Indices)
                .map(lsMask);
var ls7 = ls7SR.map(ls5_7_Indices)
                .map(lsMask); 
var ls5 = ls5SR.map(ls5_7_Indices)
                .map(lsMask); 
// Merge all Landsat Collections of NDVI---dates 1984-present           
var lsCol = ee.ImageCollection(ls8.merge(ls7).merge(ls5));
///////////////
// OPERATION //
///////////////
// ----------------- NDVI time series 1985 - 2020 for summer months ----------------------- //
// All ndvi images from 1985 - 2020 in summer months
var summer_ndvi = lsCol.filterBounds(boundary).filter(ee.Filter.calendarRange(7, 9, "month"));
// Create summer mean composites 1985 - 2020
var yearly_mean_ndvi_collection = ee.ImageCollection(year_list.map(function(year){
  var year_ndvi_imgs = summer_ndvi.filter(ee.Filter.calendarRange(year, year, "year"));
  var year_ndvi_mean = year_ndvi_imgs.mean().select("ndvi");
  var year_num = ee.Number(year).toInt();
  var date = ee.Date(ee.String(year_num).cat("-01-01"));
  var year_ndvi_mean_setyear = year_ndvi_mean.set({"year" : year, "system:time_start" : date});
  return year_ndvi_mean_setyear;
}));
var ndvi_mean = yearly_mean_ndvi_collection.mean().rename("mean");
var ndvi_std_dev = yearly_mean_ndvi_collection.reduce(ee.Reducer.stdDev()).rename("stdDev");
// Calculate per pixel z-score //
var yearly_zscore = ee.ImageCollection(yearly_mean_ndvi_collection.map(function(image){
  var zscore_img = (image.subtract(ndvi_mean)).divide(ndvi_std_dev).rename("ndvi_z").copyProperties(image);
  return zscore_img;
}));
// ----------------- NDVI 5-year moving window time series 1990 - 2020 ----------------- //
var veg_flag = ee.ImageCollection(year_list2.map(function(year){
  var year_minus5 = ee.Number(year).subtract(5);
  var window_filter = yearly_zscore.filter(ee.Filter.gte("year", year_minus5)).filter(ee.Filter.lt("year", year));       // filter dates (ex. 1985-01-01 to 1990-01-01)
  // Pixels are flagged in moving window if 1 extreme drought season occurred
  var veg_reclass = ee.ImageCollection(window_filter.map(function(image){                  
    var low_veg = ee.Image(1).where(ee.Image(image).gt(xx), 0);                // greater than -1.282 = green & 0; less than = brown/gray & 1
  return low_veg}));
   var dieback_cond = veg_reclass.reduce(ee.Reducer.anyNonZero()).rename("dieback_flag").set({"year": year});
  return dieback_cond;
}));
// -------------------------------- end of NDVI ----------------------------------- //
/// OUTPUT = "veg_flag" ///
// --------------------------- Fire mask time series ---------------------------- //
var correct_fires = fires.map(function(fire){
  var year = ee.Number.parse(fire.get("YEAR_")).toInt();
  return fire.set({"year": year,"mask": 1});
});
var fire_mask_ts = ee.ImageCollection(year_list2.map(function(year){
  year = ee.Number(year).toInt();
  var year_minus5 = ee.Number(year).subtract(5).int();
  var filter_fires = correct_fires.filter(ee.Filter.gte("year",year_minus5))
                                 .filter(ee.Filter.lt("year",year));
  var reduce = filter_fires.reduceToImage(["mask"],ee.Reducer.max());
  var fire_mask = ee.Image(0).where(reduce.eq(1),1)
                              .rename("fire_mask").set({"year": year});
  return fire_mask;
}));
// --------------------------- end of fire mask ----------------------- //
/// OUTPUT = "fire_mask_ts" ///
// ------------------- Create yearly dieback from drought, veg, and fire mask time series ----------------//
var combine = ee.ImageCollection(year_list2.map(function(year){
  var dieback = veg_flag.filterMetadata("year","equals", year).first().select("dieback_flag");
  var drought_flag = drought_flags.filterMetadata("year","equals", year).first().select("drought_flag");
  var fire_mask = fire_mask_ts.filterMetadata("year","equals", year).first().select("fire_mask");
  var combine = ee.Image(1).where(fire_mask.eq(0).and(dieback.eq(1)).and(drought_flag.eq(0)),2)  // 2 = dieback with no drought or fire
                           .where(fire_mask.eq(0).and(dieback.eq(1)).and(drought_flag.eq(1)),3)  // 3 = drought dieback 
                           .where(fire_mask.eq(1).and(dieback.eq(1)).and(drought_flag.eq(0)),4)  // 4 = fire dieback and without drought
                           .where(fire_mask.eq(1).and(dieback.eq(1)).and(drought_flag.eq(1)),5)  // 5 = fire dieback and drought
                           .where(fire_mask.eq(1).and(dieback.eq(0)).and(drought_flag.eq(0)),6)  // 6 = fire no drought no large dieback
                           .where(fire_mask.eq(0).and(dieback.eq(0)).and(drought_flag.eq(1)),7)  // 7 = chaparral - drought, no dieback, no fire
                           .multiply(mask).set({"year":year});                                   // 1 = chapparal - no large dieback in past 5 years
  return combine;                                                                                // 0 = non-chapparal
}));
//               0          1          2        3        4          5         6         7
var palette = ["A9A9A9", "4DA94B", "D185CD", "DD14D4", "DF2B26", "8A1411", "FE908D", "7189D6"];
// Display classification for selected year
var display_image = ui.Map.Layer(combine.filter(ee.Filter.eq("year", yy)).first().clip(boundary)).getEeObject();
// Display fires for selected year
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: correct_fires.filter(ee.Filter.eq("year", yy)),
  color: 1,
  width: 1.5
});
var display_feat = ui.Map.Layer(outline).getEeObject();
// Create Legend Panel
var legend = ui.Panel({style: {width: '230px', position: 'bottom-right', padding: '10px 10px'}});
// Create legend title
var legendTitle = ui.Label({value: "Potential Chaparral Dieback",
                            style: {fontSize: '12px', margin: '0 0 4px 0', fontWeight: "bold"}});
legend.add(legendTitle);
// Creates and styles 1 row of the legend at a time
var makeRow = function(color, name, count) {
              // Create legend patch
              var colorBox = ui.Label({
                            style: {backgroundColor: color, padding: '6px', margin: '0 0 4px 0'}});
              // Create legend labels
              var description = ui.Label({value: name,
                              style: {fontSize: '10px', margin: '0 0 4px 6px'}});
              // Return Legend line
              return ui.Panel({widgets: [colorBox, description],
                              layout: ui.Panel.Layout.Flow('horizontal')});};
// Legend palette which is the same as the symbology
var palette1 = ee.List(palette);
// Legend Labels
var names = ee.List(['Non Chaparral', 'Chaparral - No Dieback Detected', 'Chaparral Dieback - No Drought, No Fire', 'Chaparral Dieback - Drought Induced', 'Fire Dieback - No Drought', 'Fire Dieback - Drought', 'Fire - No Dieback', 'Chaparral - Drought, No Dieback']);
// Add color and and names
for (var j = 0; j < 8; j++) {
    var p = palette1.getString(j).getInfo();
    var n = names.getString(j).getInfo();
    legend.add(makeRow(p, n))}
//--------------- Time series chart -------------------- //
// combine non-classified indices
var combine_ic = ee.ImageCollection(year_list.map(function(year){
  var ndvi = yearly_mean_ndvi_collection.filter(ee.Filter.eq("year", year)).first().select("ndvi").updateMask(mask);
  var dry = dry_season_means.filter(ee.Filter.eq("year", year)).first().select("pdsi").rename("pdsi_dry").updateMask(mask);
  var wet = wet_season_means.filter(ee.Filter.eq("year", year)).first().select("pdsi").rename("pdsi_wet").updateMask(mask);
  var combine = dry.addBands(wet).addBands(ndvi);
  return combine}));
var veg_string = ee.String(ee.Algorithms.If(zz, "NDVI", "NBR")).getInfo();
function chartTS(){
  var aoi = drawingTools.layers().get(0).getEeObject();
  var tschart = ui.Chart.image.series({
          imageCollection: combine_ic,
          region: aoi,
          reducer: ee.Reducer.mean(),
          scale: 30,
          xProperty: 'year'
        })
        .setOptions({
          chartArea: {backgroundColor: 'FAFAFA'},
          series: {0: {targetAxisIndex: 0 , type: "line" , lineWidth: 1 , pointSize: 2 , color: "green", visibleInLegend: false },
                   1: {targetAxisIndex: 1 , type: "line" , lineWidth: 1 , pointSize: 2 , color: "red" },
                   2: {targetAxisIndex: 1 , type: "line" , lineWidth: 1 , pointSize: 2 , color: "blue" }},
          hAxis: {title: 'YEAR', gridlines:{count: 0}, titleTextStyle: {italic: false, bold: true}, format: '####'},
          vAxes: {
            0: {title: veg_string, gridlines:{count: 0}, titleTextStyle: {italic: false, bold: true}},
            1: {title:'PDSI', gridlines:{count: 0}, viewWindow: {max: 8 , min: -8}, titleTextStyle: {italic: false, bold: true}},
            2: {title: 'PDSI', gridlines:{count: 0}, viewWindow: {max: 8 , min: -8}, titleTextStyle: {italic: false, bold: true}}
          }
          });
        panel.widgets().set(1, tschart);
        drawingTools.setShape(null);
}
drawingTools.onDraw(ui.util.debounce(chartTS, 500));
drawingTools.onEdit(ui.util.debounce(chartTS, 500));
map.clear();
map.addLayer(display_image,{palette: palette, min:0, max:7},"Chaparral conditions");
map.addLayer(display_feat,null,yy+" Fires");
map.add(legend);
//map.add(chartPanel);
map.setOptions('Gray', {'Gray': GRAYMAP});
};
// ------------------------------- User Parameters ---------------------------------- //
ui.root.clear();
var c = {};
var map = ui.Map();
ui.root.add(map);
// Drawing tools and functions
var drawingTools = map.drawingTools();
drawingTools.setDrawModes(['rectangle']).setShown(false);
var geometry = ui.Map.GeometryLayer({geometries: null, name: 'AOI', color: 'black'});
drawingTools.layers().add(geometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawShape() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
// Create main panel for user inputs and TOC curve 
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style: {width: '410px'}});
// Insert Panel
ui.root.insert(0, panel);
// Function to take user inputs and map TOC computation
function user_input() {
    var description1 = ui.Panel({widgets: [ui.Label("Chaparral Dieback Explorer", {fontSize: '16px', margin: "10px 0 0 10px", fontWeight: "bold"}), 
                             ui.Label("______________________________________________________________________________________", {fontSize: '10px', fontWeight: "bold", margin: "0 0 0 10px"}),
                             ui.Label("Potential chaparral dieback from drought and fire is determined using a 5-year", {fontSize: '10px', margin: "5px 0 0 10px"}), 
                             ui.Label("moving window of Palmer Drought Severity Index and a selected vegetation index.", {fontSize: '10px', margin: "0px 0 0 10px"}),
                             ui.Label("For the selected year of interest, chaparral conditions from potential dieback", {fontSize: '10px', margin: "0 0 0 10px"}),
                             ui.Label("occurring in the previous 5 years is displayed with the year's fire perimeters.", {fontSize: '10px', margin: "0px 0 0 10px"}),
                             ui.Label("Drought conditions causing potential dieback are classified in the 5-year window", {fontSize: '10px', margin: "5px 0 0 10px"}),
                             ui.Label("if any of the following conditions are met:", {fontSize: '10px', margin: "0px 0 0 10px"}),
                             ui.Label("--     1 extreme drought season (either summer or winter)", {fontSize: '10px', margin: "5px 0 0 10px"}),
                             ui.Label("--     2 consecutive severe drought seasons (e.g. summer/winter or winter/summer)", {fontSize: '10px', margin: "0 0 0 10px"}),
                             ui.Label("--     4 consecutive moderate drought seasons (e.g. summer/winter/summer/winter)", {fontSize: '10px', margin: "0px 0 0 10px"}),
                             ui.Label("______________________________________________________________________________________", {fontSize: '10px', fontWeight: "bold", margin: "0 0 0 10px"}),
                             ui.Label("1.  Select a year of interest, NDVI or NBR for dieback detection, a z-score threshold,", {fontSize: '10px', fontWeight: "bold", margin: "5px 0 0 10px"}), 
                             ui.Label("and click 'Display'.  Zoom in on area of interest for layers to render.", {fontSize: '10px', fontWeight: "bold", margin: "0px 0 0 10px"}),
                             ui.Label("Dieback will be flagged if the per-pixel z-score for the selected index is below the threshold.", {fontSize: '10px', margin: "5px 0 0 10px"}),
                             ui.Label("-2.326 = 1st percentile, -1.960 = 2.5th percentile,", {fontSize: '10px', margin: "5px 0 0 10px"}),
                             ui.Label("-1.645 = 5th percentile, -1.282 = 10th percentile . . . .", {fontSize: '10px', margin: "0px 0 0 10px"}),]});
    var xx;
    var thres_text = ui.Textbox({
                      placeholder: 'Enter z-score threshold',
                      onChange: function(text){
                      var x = ee.Number.parse(text);
                      xx = x}
    });
    var yy;
    var year_slider = ui.Slider({
                          min: 1990,
                          max: 2020,
                          step: 1,
                          style: {width: '390px'},
                          onChange: function(i){
                          yy = i ;
                          }
    });
    var zz;
    var indices = {
            NDVI: [1],
            NBR: [0]};
    var index_select = ui.Select({items: Object.keys(indices),
                                onChange: function(key) {
                                zz = indices[key][0];
    }});
    index_select.setPlaceholder('Select index');
    // Widget for run button
    var run_button = ui.Button({label:"Display", 
                                onClick: function(){run(xx, yy, zz)}, disabled: false});
    var user_panel = ui.Panel([index_select, thres_text, run_button], ui.Panel.Layout.Flow('horizontal'));
    var draw_button = ui.Button({
      label: "Draw Area of Interest",
      onClick: drawShape,
      style: {stretch: 'horizontal'}
    });
    var description2 = ui.Panel({widgets: [ui.Label("______________________________________________________________________________________", {fontSize: '10px', fontWeight: "bold", margin: "0 0 0 10px"}),
                             ui.Label("2. Press 'Draw Area of Interest' and user cursor to draw a rectangle to display the", {fontSize: '10px', fontWeight: "bold", margin: "5px 0 0 10px"}), 
                             ui.Label("35 year vegetation index and drought time series.", {fontSize: '10px', fontWeight: "bold", margin: "0px 0 0 10px"}),
                             ui.Label("To select a different area of interest, press button again and draw a new rectangle.", {fontSize: '10px', margin: "0 0 0 10px"}),
                             ui.Label("______________________________________________________________________________________", {fontSize: '10px', fontWeight: "bold", margin: "0 0 0 10px"})]}); 
    // Add user input widgets
    return ui.Panel([description1, year_slider, user_panel, description2, draw_button], ui.Panel.Layout.Flow('vertical'));
} // end user_input function
// ------------------ Initialize panel UI -------------------- //
var GRAYMAP = [
  {   // Dial down the map saturation.
    stylers: [ { saturation: -75 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
// Display region
var empty0 = ee.Image().byte();
var studyarea_outline = empty0.paint({
  featureCollection: boundary,
  color: 1,
  width: 2
});
map.addLayer(studyarea_outline, null, "CA South Coast Ecoregion");
map.setOptions('Gray', {'Gray': GRAYMAP});
map.centerObject(boundary,8);
function init() {
  panel.widgets().set(0, user_input());
  return panel;
}
var panels = init();