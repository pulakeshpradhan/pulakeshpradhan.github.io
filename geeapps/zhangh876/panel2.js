var center = ee.Geometry.Point([-51.29, -16.61]);
var zoom = 12;
var leftMap = ui.Map();
leftMap.centerObject(center, zoom);
var rightMap = ui.Map();
rightMap.centerObject(center, zoom);
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl:true});
var linker = new ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel:leftMap,
  secondPanel:rightMap,
  orientation:"horizontal",
  wipe:true
});
ui.root.clear();
ui.root.add(splitPanel);
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA")
           .filterDate('2020-01-01', '2021-03-31')
           .filterBounds(center)
          .filter(ee.Filter.lt("CLOUD_COVER_LAND", 10))
          .mean();
print("L8", L8);
leftMap.addLayer(L8.select(["B5", "B4", "B3"]), {min:0, max:0.3, gamma:1.5}, "rgb");
rightMap.addLayer(L8.select(["B4", "B3", "B2"]), {min:0, max:0.3, gamma:1.5}, "rgb2");