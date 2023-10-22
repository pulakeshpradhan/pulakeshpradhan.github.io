var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.27011952152802,
                9.829825789993354
              ],
              [
                -75.27011952152802,
                8.109856135973848
              ],
              [
                -73.74301991215302,
                8.109856135973848
              ],
              [
                -73.74301991215302,
                9.829825789993354
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-75.27011952152802, 9.829825789993354],
          [-75.27011952152802, 8.109856135973848],
          [-73.74301991215302, 8.109856135973848],
          [-73.74301991215302, 9.829825789993354]]], null, false),
    center = ui.import && ui.import("center", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -74.27723011723123,
            9.081160583427708
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Point([-74.27723011723123, 9.081160583427708]);
var l7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2");
var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");
var scaler = function(img) {
  var bands = img.select("SR_B.").multiply(2.75e-5).add(-0.2);
  return img.addBands(bands, null, true);
};
l7 = l7.map(scaler);
l8 = l8.map(scaler);
var cloud_masker = function(img) {
  var cirrus_mask = img.select("QA_PIXEL").bitwiseAnd((1 << 2)).eq(0);
  var clouds_mask = img.select("QA_PIXEL").bitwiseAnd((1 << 3)).eq(0);
  var shadow_mask = img.select("QA_PIXEL").bitwiseAnd((1 << 4)).eq(0);
  var snow_mask = img.select("QA_PIXEL").bitwiseAnd((1 << 5)).eq(0);
  return img.updateMask(cirrus_mask)
            .updateMask(clouds_mask)
            .updateMask(shadow_mask)
            .updateMask(snow_mask);
};
l7 = l7.map(cloud_masker);
l8 = l8.map(cloud_masker);
var renamer7 = function(img) {
  return img.select(["SR_B1", "SR_B2", "SR_B3", "SR_B4", "SR_B5"])
            .rename(["Blue", "Green", "Red", "NIR", "SWIR"]);
};
var renamer8 = function(img) {
  return img.select(["SR_B2", "SR_B3", "SR_B4", "SR_B5", "SR_B6"])
            .rename(["Blue", "Green", "Red", "NIR", "SWIR"]);
};
var ic00 = l7.filterDate("2000-01-01", "2000-12-31").filterBounds(roi).map(renamer7);
var ic10 = l7.filterDate("2010-01-01", "2010-12-31").filterBounds(roi).map(renamer7);
var ic20 = l8.filterDate("2020-01-01", "2020-12-31").filterBounds(roi).map(renamer8);
var addIndices = function(img) {
  var fmndwi = "(b('Green')-b('SWIR'))/(b('Green')+b('SWIR'))";
  var fndvi = "(b('NIR')-b('Red'))/(b('NIR')+b('Red'))";
  var fevi = 
      "2.5*(b('NIR')-b('Red'))/(b('NIR')+6*b('Red')-7.5*b('Blue')+1)";
  var mndwi = img.expression(fmndwi).rename("mNDWI");
  var ndvi = img.expression(fndvi).rename("NDVI");
  var evi = img.expression(fevi).rename("EVI");
  return img.addBands(mndwi)
            .addBands(ndvi)
            .addBands(evi);
};
ic00 = ic00.map(addIndices);
ic10 = ic10.map(addIndices);
ic20 = ic20.map(addIndices);
var wbExtracter = function(img) {
  var fzou = 
      "(b('mNDWI')>b('NDVI') || b('mNDWI')>b('EVI')) && (b('EVI') < 0.1) ? 1" +
      ": 0";
  var wb = img.expression(fzou).rename("Water Bodies");
  return img.addBands(wb);
};
ic00 = ic00.map(wbExtracter);
ic10 = ic10.map(wbExtracter);
ic20 = ic20.map(wbExtracter);
var img00 = ic00.mean();
var wbs00 = img00.updateMask(img00.select("Water Bodies").gt(0));
var img10 = ic10.mean();
var wbs10 = img10.updateMask(img10.select("Water Bodies").gt(0));
var img20 = ic20.mean();
var wbs20 = img20.updateMask(img20.select("Water Bodies").gt(0));
var t00 = img00.select("Water Bodies")
               .expression("b('Water Bodies') > 0 ? 1 : 0")
               .rename("2000");
var t10 = img10.select("Water Bodies")
               .expression("b('Water Bodies') > 0 ? 1 : 0")
               .rename("2010");               
var t20 = img20.select("Water Bodies")
               .expression("b('Water Bodies') > 0 ? 1 : 0")
               .rename("2020");               
var tsum = t00.add(t10).add(t20);
var imgT = t00.addBands(t10).addBands(t20)
                            .updateMask(tsum.gt(0))
                            .clip(roi);
var stats = imgT.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 30,
  bestEffort: true,
});
var countToArea = function(key, value) {
  return ee.Number(value).multiply(30*30).divide(10000);
};
stats = stats.map(countToArea);
var FC = ee.FeatureCollection([
  ee.Feature(roi, {"area": stats.get("2000"), "year": "2000"}),
  ee.Feature(roi, {"area": stats.get("2010"), "year": "2010"}),
  ee.Feature(roi, {"area": stats.get("2020"), "year": "2020"}),
]);
var chart =
    ui.Chart.feature.byFeature({
      features: FC,
      xProperty: "year"
    }).setChartType("ColumnChart")
      .setOptions({
        title: "Water Coverage by Year",
        vAxis: {title: "Area [ha]", titleTextStyle: {italic: false}},
        hAxis: {title: "Time [Y]", titleTextStyle: {italic: false}},
        legend: {position: "none"}
      });
var vis = {bands: ["Red", "Green", "Blue"], min: 0.0, max: 0.3};
var vis_b = {min: -1.0, max: 1.0, palette: ["red", "yellow", "blue"]};
var vis_g = {min: -1.0, max: 1.0, palette: ["red", "yellow", "green"]};
var vis_wb = {min:0.0, max: 1.0, palette: ["white", "blue"]};
var visT = {bands: ["2000", "2010", "2020"], min: 0.0, max: 1.0};
ui.root.setLayout(ui.Panel.Layout.absolute());
var pc = ui.Panel({style: {position: "bottom-right"}}).add(chart);
var title = ui.Panel({style: {position: "bottom-left"}}).add(
  ui.Label({
    value: "Total water coverage of Depresión Momposina",
    style: {fontWeight: "bold", fontSize: "14pt"}
  }));
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: "8px",
      margin: "0 0 4px 0"
    }
  });
  var label = ui.Label({
    value: name,
    style: {margin: "0 0 4px 6px"}
  });
  return ui.Panel({
    widgets: [colorBox, label],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var colors = ["#FF0000", "#00FF00", "#0000FF",
              "#FFFF00", "#FF00FF", "#00FFFF", 
              "#FFFFFF"]
var classes = ["Water in 2000", "Water in 2010", "Water in 2020",
               "Water in 2000 and 2010", "Water in 2000 and 2020",
               "Water in 2010 and 2020", "Water in 2000, 2010 and 2020"]
var legend = ui.Panel({style: {position: "top-right"}}).add(
  ui.Label({
    value: "Water Coverage classification",
    style: {fontWeight: "bold"}
  }));
for (var i = 0; i < classes.length; i++) {
  legend.add(makeRow(colors[i], classes[i]));
}
Map.centerObject(center, 9);
Map.addLayer(imgT, visT, "Composición (2000, 2010, 2020)");
Map.setOptions('SATELLITE');
Map.setControlVisibility(false);
Map.add(title);
Map.add(pc);
Map.add(legend);