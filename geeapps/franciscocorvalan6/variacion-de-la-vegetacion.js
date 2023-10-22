var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/franciscocorvalan6/Poligono_argentina"
    }) || ee.FeatureCollection("users/franciscocorvalan6/Poligono_argentina");
//-------------------------------------------------------------------
//CONSTANTS
//-------------------------------------------------------------------
var clipgeometry = geometry
var date_first = ee.Date.fromYMD(2010,1,1)
var date_last = ee.Date.fromYMD(2020,2,1)
//-------------------------------------------------------------------
//SENTINEL 2 EVI
//-------------------------------------------------------------------
var IC_S2 = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(clipgeometry)
  .filterDate(date_first, date_last)
IC_S2= IC_S2.map(function(image){
var evi = image.expression(
        '2.5 * ((NIR/10000 - RED/10000) / (NIR/10000 + 6 * RED/10000 - 7.5 * BLUE/10000 + 1))', {
        'NIR': image.select("B8"),
        'RED': image.select("B4"),
        'BLUE': image.select("B2")})
  var qual = image.select("QA60").lt(1024)
  var evi_masked = evi.updateMask(qual)
  return image
    .addBands(evi.rename('EVI'))
    .addBands(qual.rename("QUAL"))
    .addBands(evi_masked.rename("S2_EVI_MASKED"))
    .float()
    .clip(clipgeometry)
})
var IC_S2_EVI = ee.ImageCollection(IC_S2.select("S2_EVI_MASKED"))
//-------------------------------------------------------------------
//SENTINEL 2 NDVI
//-------------------------------------------------------------------
var IC_S2_NDVI = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(clipgeometry)
  .filterDate(date_first, date_last)
IC_S2_NDVI= IC_S2_NDVI.map(function(image){
var ndvi = image.expression(
        '((NIR- RED) / (NIR + RED))', {
        'NIR': image.select("B8"),
        'RED': image.select("B4"),
        'BLUE': image.select("B2")})
  var qual_ndvi = image.select("QA60").lt(1024)
  var ndvi_masked = ndvi.updateMask(qual_ndvi)
  return image
    .addBands(ndvi.rename('NDVI'))
    .addBands(qual_ndvi.rename("QUAL_ndvi"))
    .addBands(ndvi_masked.rename("S2_NDVI_MASKED"))
    .float()
    .clip(clipgeometry)
})
var IC_S2_ndvi = ee.ImageCollection(IC_S2_NDVI.select("S2_NDVI_MASKED"))
//-------------------------------------------------------------------
//MODIS EVI
//-------------------------------------------------------------------
var IC_MOD = ee.ImageCollection("MODIS/006/MOD13Q1")
  .filterBounds(clipgeometry)
  .filterDate(date_first, date_last)
  .select(["EVI","SummaryQA"])
  // .filterDate('2019-01-01','2021-01-01')
IC_MOD = IC_MOD.map(function(image){
  var evi = image.expression(
    'EVI/10000', {
      'EVI': image.select("EVI")})
  var qual = image.select("SummaryQA").lt(2)
  var evi_masked = evi.updateMask(qual)
  return image
    .addBands(evi.rename('EVI'),["EVI"],true)
    .addBands(qual.rename("QUAL"))
    .addBands(evi_masked.rename("MOD_EVI_MASKED"))
    .float()
    .clip(clipgeometry)
})
var IC_MOD_EVI = ee.ImageCollection(IC_MOD.select(["MOD_EVI_MASKED"]))
//-------------------------------------------------------------------
//MERGE
//-------------------------------------------------------------------
var IC_ALL = IC_MOD_EVI.merge(IC_S2_EVI).merge(IC_S2_ndvi)
//PRINTS
//-------------------------------------------------------------------
//print(IC_MOD_EVI,"IC_MOD_EVI")
//print(IC_S2_EVI,"IC_S2_EVI")
//print(IC_ALL,"IC_ALL")
//-------------------------------------------------------------------
//MAP
//-------------------------------------------------------------------
Map.style().set('cursor', 'crosshair')
// Map.drawingTools().setShown(false);
Map.setOptions("SATELLITE")
Map.centerObject(clipgeometry, 5)
// Map.setControlVisibility(false)
Map.addLayer(clipgeometry)
Map.onClick(function(coords) {
    var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                  'lat: ' + coords.lat.toFixed(4)
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    // Map.layers().set(1, ui.Map.Layer(point, {color: '0000FF'}));
var chart1 = ui.Chart.image.series(IC_ALL,point,ee.Reducer.mean(), 1)
        .setOptions({
          title: "EVI" + " | lon/lat: " + coords.lon.toFixed(4) + ' / ' + coords.lat.toFixed(4),
          vAxis: {title: "EVI", viewWindow : {max : 1, min : 0}},
          legend: "right",
          interpolateNulls: true,
          series: {
          0: {color: 'ef00ff', lineWidth: 1, pointSize: 0}, // burn
            1: {color: '000000', lineWidth: 1, pointSize: 0},  // r_MOD
            // 4: {color: 'D3D3D3', lineWidth: 1},  // r_S2
          }
        });
    panel.widgets().set(0, chart1);
})
var panel = ui.Panel({style: {
  width: '100%',
  height: '220px',
  position: "bottom-right"}})
    .add(ui.Label('Click on the map to generate historical chart'))
Map.add(panel)