// Rutger Hofste 2018-08-03 
// Github: https://github.com/rutgerhofste/drought_app_vo1
// Public URL: https://rutgerhofste.users.earthengine.app/view/droughtappv01
// Add to URL ?summit_preview&accept_repo=users/lks/ee-103
// ee repo URL: https://earthengine.googlesource.com/users/rutgerhofste/drought_app_v01
// Sentinel 2 MSI and landsat8 Surface Reflectance (add sentinel 3?) 
// Sentinel 2 not used due to imperfect cloud removal strategy. 
var ic_s2 = ee.ImageCollection("COPERNICUS/S2"),
    ic_ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
var gadm36_NLD_0 = ee.FeatureCollection("users/rutgerhofste/drought_app_v01/gadm36_NLD_0");
var gadm36_NLD_1 = ee.FeatureCollection("users/rutgerhofste/drought_app_v01/gadm36_NLD_1");
var gadm36_NLD_2 = ee.FeatureCollection("users/rutgerhofste/drought_app_v01/gadm36_NLD_2");
//remove IJsselmeer and Zeeuwse meren since these are not provinces. 
function removeNonProvince(fc){
  var fc_out = fc
  fc_out = fc_out.filterMetadata("NAME_1","not_equals","IJsselmeer")
  fc_out = fc_out.filterMetadata("NAME_1","not_equals","Zeeuwse meren")
  return fc_out
}
gadm36_NLD_1 = removeNonProvince(gadm36_NLD_1)
gadm36_NLD_2 = removeNonProvince(gadm36_NLD_2)
var ivp_s2 = {"opacity":1,"bands":["B4","B3","B2"],"min":0,"max":0.2,"gamma":1.2};
var ivp_ndvi = {"opacity":1,"bands":["nd"],"min":0,"palette":["ffffff","009b28"]};
// ------------- Inputs ---------------
// Define range in days to use since today. 
var window_lookback = 31; // in days
var now = new Date("2018-08-01"); // Remove datestring for moving window calculation.
var end = ee.Date(now);
var start = end.advance(window_lookback*-1,"day")
print(start,end)
// Incl.
var day_start = start.get("day")
var day_end =  end.get("day")
var month_start = start.get("month")
var month_end =  end.get("month")
// Year to include for historic mosaics
var year_post = ee.Date(now).get("year")
var year_pre_min = 2015
var year_pre_max = year_post.subtract(1)
// -------------Sentinel 2 --------------
var rgb_bands_s2 = ["B4","B3","B2","QA60"]
var ic_s2_sel = ic_s2.select(rgb_bands_s2)
// Code from Google Group kudos to Nick Clinton
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}
// Filter all historial July's
var ic_s2_pre = ic_s2.filter(ee.Filter.calendarRange(month_start,month_end, "month"))
                      .filter(ee.Filter.calendarRange(year_pre_min, year_pre_max, "year"))
var ic_s2_post = ic_s2.filter(ee.Filter.calendarRange(month_start, month_end, "month"))
                      .filter(ee.Filter.calendarRange(year_post, year_post, "year"))
// Using slightly higher cloudy threshold since shorter period and 
// dry (clear skies?) month.
var s2_composite_post = ic_s2_post
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 60))
                  .map(maskS2clouds)
                  .median();
var s2_composite_pre = ic_s2_pre
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                  .map(maskS2clouds)
                  .median();
// -------------Landsat 8 --------------
// Function to composite Landsat 8 SR imagery.
var compositeFunctionSR = function(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(
            qa.bitwiseAnd(cloudsBitMask).eq(0));
  // We may want these later.
  // var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // var ndwi = image.normalizedDifference(['B3', 'B5']).rename('NDWI');
  // var ndbi = image.normalizedDifference(['B6', 'B5']).rename('NDBI');
  // var indexMax = ndvi.max(ndwi).max(ndbi).rename('indexMax');
  return image
      // Scale the data to reflectance and temperature.
      .select(['B[1-7]']).multiply(0.0001)
      .addBands(image.select(['B10', 'B11']).multiply(0.1))
      .updateMask(mask);
};
var ic_ls8_pre = ic_ls8.filter(ee.Filter.calendarRange(month_start,month_end, "month"))
                                    .filter(ee.Filter.calendarRange(year_pre_min, year_pre_max, "year"))
var ic_ls8_post = ic_ls8.filter(ee.Filter.calendarRange(month_start, month_end, "month"))
                                    .filter(ee.Filter.calendarRange(year_post, year_post, "year"))
var ls8_composite_pre = ic_ls8_pre.map(compositeFunctionSR)
                                    .median();
var ls8_composite_post = ic_ls8_post.map(compositeFunctionSR)
                                    .median();
// ------------- Landsat 8 Greenness--------------
// This app is meant to be very simple so no NDVI, EVI etc. just greenness
var ls_8_greenness_pre = ls8_composite_pre.expression("G/(R+G+B)",
  {"R":ls8_composite_pre.select("B4"),
   "G":ls8_composite_pre.select("B3"),
   "B":ls8_composite_pre.select("B2")
  })
var ls_8_greenness_post = ls8_composite_post.expression("G/(R+G+B)",
  {"R":ls8_composite_post.select("B4"),
   "G":ls8_composite_post.select("B3"),
   "B":ls8_composite_post.select("B2")
  })
var ls_8ndvi_pre = ls8_composite_pre.normalizedDifference(["B5","B4"])
var ls_8ndvi_post = ls8_composite_post.normalizedDifference(["B5","B4"])
// Percentage difference in greenness
var ls_8_greenness_diff = ((ls_8_greenness_post.subtract(ls_8_greenness_pre)).divide(ls_8_greenness_pre)).multiply(100)
ls_8_greenness_diff = ls_8_greenness_diff.select(["B3"],["greenness_diff"])
var ls_8_ndvi_diff = ((ls_8ndvi_post.subtract(ls_8ndvi_pre)).divide(ls_8ndvi_pre)).multiply(100)
ls_8_ndvi_diff = ls_8_ndvi_diff.select(["nd"],["ndvi_diff"])
// Zonal Statistics
// running into memory issues, using reduceRegion instead of reduceRegions
function reduceRegionsGreenness(feature){
    var geometry= feature.geometry()
    var dict = ls_8_greenness_diff.reduceRegion({reducer:ee.Reducer.mean(),
                                                geometry:geometry,
                                                scale:1000,
                                                bestEffort:false,
                                                maxPixels:1e10,
                                                tileScale:1})
    var mean = dict.get("greenness_diff")    
    var feature_out = ee.Feature(feature)
    feature_out = feature_out.set("greenness_diff",mean)
    return feature_out
}
function reduceRegionsNDVI(feature){
    var geometry= feature.geometry()
    var dict = ls_8_ndvi_diff.reduceRegion({reducer:ee.Reducer.mean(),
                                                geometry:geometry,
                                                scale:1000,
                                                bestEffort:false,
                                                maxPixels:1e10,
                                                tileScale:1})
    var mean = dict.get("ndvi_diff")    
    var feature_out = ee.Feature(feature)
    feature_out = feature_out.set("ndvi_diff",mean)
    return feature_out
}
var fc_greenness_diff_gadm36_NLD_1 = ee.FeatureCollection(gadm36_NLD_1.map(reduceRegionsGreenness))
var fc_greenness_diff_gadm36_NLD_2 = ee.FeatureCollection(gadm36_NLD_2.map(reduceRegionsGreenness))
// ------------- UI stuff  --------------
// Control/Info panel
var title = ui.Label("Extreme droogte in Nederland")
title.style().set('color', '#51504b');
title.style().set('fontWeight', 'bold');
title.style().set({
  fontSize: '20px',
  padding: '10px'
});
var description = ui.Label("Met deze app vergelijkt u satellietbeelden van Nederland in juli 2018 ten opzichte van een normale juli in het recente verleden (2014-2017).") 
var description2 = ui.Label("Schuif de lijn in het midden naar links en rechts om de verschillen tussen juli 2018 en een normale juli te visualiseren. U kunt op een gemeente klikken voor meer details.")
var description3 = ui.Label("De extreme droogte van 2018 laat duidelijk haar sporen na. Complete provincies zijn vergeeld en verdord. Welke effecten van de droogte kunt u vinden?")
var disclaimer = ui.Label(" Created 2018/08/03 by Rutger Hofste. Created for fun and not for scientific purposes. Code and licence on Github: https://github.com/rutgerhofste/drought_app_v01  ")
disclaimer.style().set({
  fontSize: '8px',
});
var button = ui.Button({
  label:"ok",
  onClick: function(){
    ui.root.remove(panel)
  }
});
button.style().set('position', 'bottom-center')
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
panel.add(title)
panel.add(description)
panel.add(description2)
panel.add(description3)
panel.add(disclaimer)
panel.add(button)
// Set a center and zoom level.
var center = {lon: 6, lat: 52, zoom: 10};
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(panel)
ui.root.add(splitPanel);
var title_left = ui.Label("juli 2014-2017 (mediaan)")
title_left.style().set('position', 'top-left')
leftMap.add(title_left)
var title_right = ui.Label("juli 2018")
title_right.style().set('position', 'top-right')
rightMap.add(title_right)
//Map.addLayer(s2_composite_hist,ivp_s2,"Sentinel-2 July 2015-2017",0,1)
//Map.addLayer(s2_composite_2018,ivp_s2,"Sentinel-2 July 2018",0,1)
var left_layer0 = ui.Map.Layer(ls8_composite_pre,ivp_s2,"Landsat-8 July 2014-2017",1,1);
leftMap.layers().set(0,left_layer0)
var right_layer0 = ui.Map.Layer(ls8_composite_post,ivp_s2,"Landsat-8 July 2018",1,1)
rightMap.layers().set(0,right_layer0)
// Add Municipality for reference 
function setStyle(feature){
  feature = ee.Feature(feature)
  feature = feature.set("style",{"fillColor":"#FFFFFF00",
                                 "width":0.1
  }) 
  return feature;
}
gadm36_NLD_2 = gadm36_NLD_2.map(setStyle)
var left_layer1 = ui.Map.Layer(gadm36_NLD_2.style({styleProperty: "style"}),{},"gadm36_NLD_2")
leftMap.layers().set(1,left_layer1)
var right_layer1 = ui.Map.Layer(gadm36_NLD_2.style({styleProperty: "style"}),{},"gadm36_NLD_2")
rightMap.layers().set(1,right_layer1)
// Interactivity
function setStyleHighLight(feature){
  feature = ee.Feature(feature)
  feature = feature.set("style",{"fillColor":"#FFFFFF00",
                                 "width":3
  }) 
  return feature;
}
var inspector = ui.Panel({
  widgets: [],
  layout: ui.Panel.Layout.flow('vertical')
});
// Define callback functions.
function showInfo(feature) {
  var name_2 = feature.properties.NAME_2;
  var greenness_diff = feature.properties.greenness_diff.toFixed(2);
  var rank = feature.properties.rank;
  var name2Title = ui.Label({
    value: 'Gemeente:',
    style: {
      fontWeight: 'bold',
      stretch: 'vertical',
    }
  });
  var name2Label = ui.Label(name_2, {stretch: 'vertical'});
  var greennessTitle = ui.Label({
    value: 'Verschil in groen (%):',
    style: {
      fontWeight: 'bold',
      stretch: 'vertical',
    }
  });
  var greennessLabel = ui.Label(greenness_diff,{stretch: 'vertical'});
  var rankTitle = ui.Label({
    value: 'Rang (max:489):',
    style: {
      fontWeight: 'bold',
      stretch: 'vertical',
    }
  });
  var rankLabel = ui.Label(rank, {stretch: 'vertical'});
  var closeButton = ui.Button({
    label: 'Close', 
    onClick: function() {
      inspector.clear();
      inspector.style().set('shown', false);
    }
  });
  inspector.clear();
  inspector.add(name2Title);
  inspector.add(name2Label);
  inspector.add(greennessTitle)
  inspector.add(greennessLabel);
  inspector.add(rankTitle)
  inspector.add(rankLabel)
  inspector.add(closeButton);
}
function inspect(coords){
  inspector.clear();
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  inspector.style().set('shown', true);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var fc_sel = gadm36_NLD_2.filterBounds(point);
  fc_sel = fc_sel.map(setStyleHighLight);
  leftMap.layers().set(2,ui.Map.Layer(fc_sel.style({styleProperty: "style"})));
  rightMap.layers().set(2,ui.Map.Layer(fc_sel.style({styleProperty: "style"})));
  var feature = ee.Feature(fc_sel.first());
  var feature_out = reduceRegionsGreenness(feature);
  var greennessDiff = feature_out.get("greenness_diff")
  feature_out = feature_out.set("rank",fc_greenness_diff_gadm36_NLD_2.filter(ee.Filter.lte("greenness_diff",greennessDiff)).size());
  feature_out.evaluate(showInfo);
}
leftMap.onClick(inspect);
rightMap.onClick(inspect);
var info_panel  = ui.Panel({layout: ui.Panel.Layout.flow('vertical')
                            });
ui.root.add(info_panel)
ui.root.add(inspector)