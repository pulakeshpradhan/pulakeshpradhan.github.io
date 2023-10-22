/*
  Introduction:
    1) To visualize the smoothed annual maximum NDVIs.
  Date:
    11/26/2019.
*/
var point = ee.Geometry.Point([-113.49153672863031, 48.74125005784002]);
if (false) {
  // Load the smoothed annual maximum NDVI data by region.
  var fileName = "Annual_NDVI/Landsat5_7_smdAnlMaxNDVI_1984to2013";
  var northAmerica = ee.Image("users/treeline/Global/North_America/" + 
    fileName);
  var asia = ee.Image("users/ChenyangWei/Global_ATE/Asia/" + 
    fileName);
  // Combine the NDVI data of different regions.
  var combined = ee.ImageCollection.fromImages([northAmerica, asia]).mosaic();
} else if (true) {
  // Study domain.
  var studyDomain = ee.Image("users/treeline/Global/Study_Area/GMBA_Lte60NS/" + 
    "Elv_GTEp80_MODISforestMR__" +
    "AbsElvDist_Lte1000m_avgTLH__" +
    "Lte50MODISpx_forestHorizontalDist");
  // The HydroBASINS watersheds intersected with the study domain.
  var wsd = ee.FeatureCollection("users/ATE/North_America/" + 
    "Study_Area/StudyDomain_HydroBASINS_intersected");
  // Elevational transects in North America.
  var newTrans = ee.FeatureCollection("users/ATE/North_America/Transects/" + 
    "HydroBASINS_studyDomain_Transects_30mBuffered_30px");
  // Elevational transects in the western U.S.
  var transects = ee.FeatureCollection("users/treeline/Global/ATE_Detection/" +
    "StudyDomain_WesternUS/wUS_stpTrct_30mBuf_MaxATEIelv_Trend_Length500to3000m_avgATEIgt075");
  // Segmented study domain in the western U.S.
  var segmented = ee.FeatureCollection("users/treeline/Global/ATE_Detection/StudyDomain_WesternUS/" +
    "SD_wUS_chelsa12_ALOS_maxAbsTLH_Lte1000m_Vec_gte2e5m2_seg4conn");
  //// Load the smoothed annual maximum NDVI data by sub-regions.
  // North America.
  var regions = ee.FeatureCollection("users/treeline/Global/Study_Area/GMBA_Lte60NS/" + 
    "Sub-regions/North_America");
  var fileNames = ee.Dictionary(regions.aggregate_histogram("Name"))
    .keys().getInfo(); // The end index is exclusive.
  // print(fileNames);
  var path1 = "users/ATE/North_America/smdAnlMaxNDVI/Landsat5_7_1984to2013/";
  var path2 = "users/ATE/North_America/smdAnlMaxNDVI/Landsat8_2014to2018/";
  var combined = ee.ImageCollection(fileNames.map(function(fileName) {
    var image1 = ee.Image(path1 + fileName);
    var image2 = ee.Image(path2 + fileName);
    return image1.addBands(image2);
  })).mosaic();
  var pathATEI = "users/RealEarth/North_America/AnnualATEI_ByRegions/";
  var annualATEI = ee.ImageCollection(fileNames.map(function(fileName) {
    var image = ee.Image(pathATEI + fileName);
    return image;
  })).mosaic();
  // Vectorized study domain.
  var vector = ee.FeatureCollection("users/ATE/North_America/Study_Area/" +
    "Vectorized_StudyDomain_gte2e5m2");
}
// Convert the multi-band image to a image collection.
var ndviIC = ee.ImageCollection.fromImages(combined.bandNames().map(function(b) {
  var year = ee.Number.parse(ee.String(b).slice(5, 9)).toInt();
  // var year = ee.String(b).slice(5, 9);
  year = ee.Date.fromYMD(year, 1, 1);
  return combined.select([b], ["NDVI"]).set("year", year);
}));
var ateiIC = ee.ImageCollection.fromImages(annualATEI.bandNames().map(function(b) {
  var year = ee.Number.parse(ee.String(b).slice(5, 9)).toInt();
  year = ee.Date.fromYMD(year, 1, 1);
  return annualATEI.select([b], ["ATEI"]).set("year", year);
}));
// Examine the NDVIs.
// print("Annual NDVIs:", ndviIC);
// Add a null image as an interval in displaying the animation.
var nullAddedIC = ndviIC.merge(ee.Image.constant(0).rename("constant"));
var nullAddedATEIic = ateiIC.merge(ee.Image.constant(0).rename("constant"));
/* Visualize the smoothed annual maximum NDVIs. */
// Show point on the map.
function showPointOnMap(m, point, layer) {
  var dot = ui.Map.Layer(point, {color: "0000FF"}, "Clicked point");
  m.layers().set(layer, dot);
}
// Show the zoom box.
function centerZoomBox(point) {
  showPointOnMap(zoomBox, point, 2);
  zoomBox.centerObject(point, 13);
  // // Create a rectange of the bounding box.
  // var bounds = zoomBox.getBounds();
  // var w = bounds[0], e = bounds[2];
  // var s = bounds[1], n = bounds[3];
  // var outline = ee.Geometry.MultiLineString([
  //   [[w, s], [w, n]],
  //   [[e, s], [e, n]],
  //   [[w, s], [e, s]],
  //   [[w, n], [e, n]],
  // ]);
  // var layer = ui.Map.Layer(outline, {color: 'FFFFFF'}, 'Zoom Box Bounds');
  // map.layers().layers().set(2, layer);
}
// Display an NDVI chart.
function makeChart(point) {
  var chart = ui.Chart.image.series({
    imageCollection: ndviIC, 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30, 
    xProperty: "year"
  });
  chart.setOptions({
    title: "Annual maximum NDVI from 1984 to 2018",
    vAxis: {title: "NDVI", gridlines: {count: 5}},
    hAxis: {title: "Year", gridlines: {count: 10}},
    trendlines: {0: {
      lineWidth: 3,
      pointSize: 0,
      color: 'CC0000'
    }},
    lineWidth: 2,
    pointSize: 4,
    series: {
      0: {color: "228B22"}
    }
  });
  return chart;
}
// Display an ATEI chart.
function makeATEIchart(point) {
  var chart = ui.Chart.image.series({
    imageCollection: ateiIC, 
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30, 
    xProperty: "year"
  });
  chart.setOptions({
    title: "Annual ATEI from 1984 to 2018",
    vAxis: {title: "ATEI", gridlines: {count: 5}},
    hAxis: {title: "Year", gridlines: {count: 10}},
    trendlines: {0: {
      lineWidth: 3,
      pointSize: 0,
      color: "0000FF"
    }},
    lineWidth: 2,
    pointSize: 4,
    series: {
      0: {color: "FF0000"}
    }
  });
  return chart;
}
// Make an NDVI animation.
function makeAnimation(point) {
  var NDVIparams = {
    dimensions: 776,
    region: point.buffer(2e3),
    framesPerSecond: 2,
    crs: 'EPSG:3857',
    min: 0,
    max: 1,
    palette: ndvi_palette
  };
  return ui.Thumbnail(nullAddedIC, NDVIparams);
}
// Make an ATEI animation.
function makeATEIanimation(point) {
  var ATEIparams = {
    dimensions: 776,
    region: point.buffer(2e3),
    framesPerSecond: 2,
    crs: 'EPSG:3857',
    min: 0,
    max: 1,
    palette: "FFFFFF, FF0000"
  };
  return ui.Thumbnail(nullAddedATEIic, ATEIparams);
}
// Initialize the widgets.
function init() {
  // Layer of the clicked point.
  var ptLayer = 8;
  // Create a instruction and chart panel.
  var panel = ui.Panel({
    style: {
      width: '30%',
      border: '3px solid #228B22',
    }
  });
  var title = ui.Label({
    value: 'NDVI & ATEI Explorer',
    style: {
      fontSize: '24px',
      fontWeight: 'bold',
      padding: '10px',
      color: '#228B22',
    }
  });
  var instructions = ui.Label({
    value: 'Click on the map to show the time-series charts and animations of NDVI and ATEI.',
    style: {
      color: 'gray',
      padding: '10px',
    }
  });
  var chartPanel1 = ui.Panel();
  var chartPanel2 = ui.Panel();
  var animationPanel1 = ui.Panel();
  var animationPanel2 = ui.Panel();
  // Create a label and a panel for the zoom box.
  var zoomInstructions = ui.Label({
    value: 'Detailed View', 
    style: {
      fontWeight: 'bold',
      fontSize: "15px",
      padding: '10px',
      stretch: 'horizontal',
      textAlign: 'center',
      color: 'gray'
      // backgroundColor: '#d3d3d3'
    }
  });
  var zoomPanel = ui.Panel({
    style: {
      position: 'bottom-right',
      height: '335px',
      width: '300px',
    }
  });
  // Combine widgets.
  panel.add(title);
  panel.add(instructions);
  panel.add(chartPanel1);
  panel.add(animationPanel1);
  panel.add(chartPanel2);
  panel.add(animationPanel2);
  zoomPanel.add(zoomInstructions);
  zoomPanel.add(zoomBox);
  // Add the zoom box panel to the default map.
  map.add(zoomPanel);
  // Create a split panel.
  var splitPanel = ui.SplitPanel({
    firstPanel: panel,
    secondPanel: map,
  });
  // Display the split panel.
  ui.root.clear();
  ui.root.add(splitPanel);
  // Display the zoom box.
  centerZoomBox(point);
  // Display the pre-determined point.
  showPointOnMap(map, point, ptLayer);
  map.centerObject(point, 9);
  // Generat time-series charts and animations at the pre-determined point.
  chartPanel1.clear();
  chartPanel2.clear();
  animationPanel1.clear();
  animationPanel2.clear();
  chartPanel1.add(makeChart(point));
  chartPanel2.add(makeATEIchart(point));
  animationPanel1.add(makeAnimation(point));
  animationPanel2.add(makeATEIanimation(point));
  // Bind the click handler to the new map.
  map.onClick(function(coordinates){
    var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
    // Display the zoom box.
    centerZoomBox(point);
    // Display the clicked point.
    showPointOnMap(map, point, ptLayer);
    // Generat time-series charts and animations at the pre-determined point.
    chartPanel1.clear();
    chartPanel2.clear();
    animationPanel1.clear();
    animationPanel2.clear();
    chartPanel1.add(makeChart(point));
    chartPanel2.add(makeATEIchart(point));
    animationPanel1.add(makeAnimation(point));
    animationPanel2.add(makeATEIanimation(point));
  });
}
if (true) {
  var ndvi_palette =
      'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
      '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
  var visParams = {min: 0, max: 1, palette: ndvi_palette};
  // Initialize the map.
  var map = ui.Map();
  map.style().set("cursor", "crosshair");
  map.setOptions("hybrid");
  // print(newTrans.first(), newPaths.first())
  map.addLayer(studyDomain, {palette: "FF0000"}, 
    "Global Study Domain", false);
  map.addLayer(ndviIC.mean(), visParams,
    "Temporal average NDVI from 1984 to 2013"); 
  map.addLayer(ateiIC.mean(), {min: 0, max: 1, palette: "FFFFFF, FF0000"},
    "Temporal average ATEI from 1984 to 2013");
  map.addLayer(wsd, {color: "FFFF00"}, 
    "HydroBASINS Watershed", false);
  map.addLayer(newTrans, {color: "228B22"}, 
    "New Elevational Transects", false);
  map.addLayer(segmented, {color: "FFFF00"}, 
    "Segmented Study Domain", false);
  map.addLayer(transects, {color: "228B22"}, 
    "Elevational Transects", false);
  // print(transects.first())
  var transectsColored = ee.Image().double().paint({
    featureCollection: transects,
    color: 'elvTrend',
  });
  map.addLayer(transectsColored, 
    {palette: "0000FF, FFFFFF, FF0000", 
    mina: -1, max: 1}, 
  "Colored Elevational Transects");
  // Create a map to be used as the zoom box.
  var zoomBox = ui.Map({style: {stretch: "both", shown: true}})
      .setControlVisibility({
        all: false,
        layerList: true
      }).setOptions("hybrid");
  zoomBox.addLayer(ndviIC.mean(), visParams,
    "Temporal average NDVI");
  zoomBox.addLayer(ateiIC.mean(), {min: 0, max: 1, 
    palette: "FFFFFF, FF0000"},
    "Temporal average ATEI");
  init();
}