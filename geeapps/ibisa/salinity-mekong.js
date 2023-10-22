/* SalinityMekong, URL https://code.earthengine.google.com/?scriptPath=users/ibisa/Vietnam:SalinityMekong
*   Calculates and displays NDVI & NDWI + anomalies for many locations. MODIS data
*   Rewritten version designed to separate calculations and selection for display
*   Display split panel: Sentinel RGB on left and Anomalies on the right
*   v0.2: display split panel: Sentinel RGB on left and Anomalies on the right
*   v1.2: matches 1.2 watchNDVITamil
*  -> 2020-08-09, (c) IBISA-2020, author Vu Tien Khang */
//---------------------
//  main code - Parameters
var xGauss = [1, 1.3, 1.96, 3];  // [68%, 80%, 95%, 99.7%] chart parameters, not used here
var severity = 1, xSigma = xGauss[severity];    //  used to call function addxSigmaIndex
//  -initDates: Calculations from last day of studyMonth and count back 'rangeYear' years
var libIBISA = require ('users/ibisa/common:lib');
var studyYear = 2020; var studyMonth = 1, rangeYear = 0.085;   // <--- 1 month = 0.08 year
var studyRange = libIBISA.initDates(studyYear, studyMonth, rangeYear);
//var startStudyDate = stRange[0], endStudyDate = stRange[1], studyRange = stRange[2];
//  -initPoints: extract FeatureCollection of all points to watch without their names
var Vietnam = require ('users/ibisa/common:GPSpts/Vietnam');
// radius of an "assess group", depends on social habits, larger in Niger & smaller in India
var radius = Vietnam.radius;
//  pts is a JSON with the names of the points and their coordinates ee.Geometry.Point
var pts = Vietnam.initPoints();  // specific initPoints for Salinity Mekong
//  boundList is a list with the points as ee.Geometry.Point
var boundList = ee.FeatureCollection(libIBISA.objValueList(pts));
var zoomLevel = 9;
Map.centerObject(libIBISA.objValue(pts, 0), zoomLevel);
//Map.centerObject(boundList, zoomLevel);
//  -initAreas: calculate areas to watch NDVI and NDWI. 'areas' = list of 2 display groups of radius 1km, 2 km
var areas = libIBISA.initAreas (boundList, radius);
var displayGroups = areas[0], displayGroups2 = areas[1];
//  -initVis: Visualisation parameters
var visus = libIBISA.initVis();
var visuIndNDVI = visus[0], visuAnoNDVI = visus[1],
      visuIndNDWI = visus[2], visuAnoNDWI =visus[3], visuRGB =visus[4];
      // visuRGB visualizes SWIR/NIR, not RGB
//  -initImg: image collections to be used, with NDVI and NDWI bands added
var MV = ee.ImageCollection ('MODIS/006/MOD09A1'); //MOD09A1.006 Terra Surface Reflectance 8-Day Global 500m
var bMODIS = require ('users/ibisa/common:spectrBands/bandsMODIS');
var geoBoundedImgs = libIBISA.initImg(MV, displayGroups2, bMODIS.NIR, bMODIS.RED, bMODIS.SWIR);
var geoDateBoundedImgs = geoBoundedImgs.filterDate(studyRange);
//1.-Make 12-mth list of lifetime mean & stdDev over entire lifetime, for NDVI & NDWI
var msdNDVIByMonth = libIBISA.mStdIndexByMonth ('NDVI', geoBoundedImgs);
var msdNDWIByMonth = libIBISA.mStdIndexByMonth ('NDWI', geoBoundedImgs);
//  if applicable, add xSigma to geoDateBoundedImgs and chart
//2.---Calculate the NDVI-NDWI anomalies of all images in geoDateBoundedImgs
var withAnomaly = geoDateBoundedImgs
        .map(libIBISA.subtractIndexMean('NDVI', msdNDVIByMonth))
        .map(libIBISA.subtractIndexMean('NDWI', msdNDWIByMonth));
//------------- end Preparation of data
// overlay the scale of the NDVI anomaly
var legendTitleText = 'Anomaly scale';
libIBISA.legendOverlay (legendTitleText, visuAnoNDVI);
libIBISA.displayBaseLayers(withAnomaly, displayGroups, displayGroups2,
//          visuIndNDVI, visuIndNDWI, visuAnoNDVI, visuAnoNDWI);
          visus, studyMonth, studyYear);
// Ask GEE to make a 2nd map area named linkedMap
var linkedMap = ui.Map();
var imageS2 = ee.ImageCollection('COPERNICUS/S2')
//        .filterBounds(displayGroups2)
        .filterDate(studyRange).sort('CLOUDY_PIXEL_PERCENTAGE',false);
// display RGB least clouds of the month on the linkedMap
linkedMap.addLayer(imageS2, visuRGB, 'Sentinel 2');
// display the selector dropdown box in the linked Map
var selection = 0, boxPosition = 'top-right';
// var pt2watch = libIBISA.objValue(pts, selection);
var watchLib = require ('users/ibisa/common:libs/watchLib');
watchLib.pt2watchSelector(Map, linkedMap, boxPosition, pts, selection, zoomLevel);
// Ask GEE to generate a linked area of the 2 map areas
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Ask GEE to define the split panel from the 2 parts of the linker
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(1),
  secondPanel: linker.get(0),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Ask GEE to replace the browser default list of widgets with this split panel
ui.root.widgets().reset([splitPanel]);
// Ask GEE to display, by setting the center and the zoom level
var pt2watch = libIBISA.objValue(pts, selection);
linker.get(1).centerObject(pt2watch, zoomLevel);
print('NDVI-NDWI anomalies', withAnomaly);
//  end of main code ----------------------------------------
//----------
function initPoints(){
/* users/ibisa/watchLib:initPoints
*   Set the centres of groups to assess. Currently, specific to Tamil -> ramains with main
*   Will import KML in the future.
*   @param {none}
*   @returns {JSON object}  {string, ee.Geometry.Point}
*   @- {ee.String}: name and coordinates for selection
*   @- {ee.Geometry.Point}: lon-lat of the point
*   v0.1: overall structure
*  -> 2020-06-27, (c) IBISA-2020, author Vu Tien Khang */
  return {
  'z1g1, Soc Trang, (106.058E 9.600N)': ee.Geometry.Point(106.058, 9.600),
  'z1g2, Soc Trang (106.374E 9.696N)' : ee.Geometry.Point(106.374, 9.696),
  'z1g3, Tra Vinh (106.390E 9.918N)' : ee.Geometry.Point(106.410, 9.898),
  'z1g4, Tra Vinh (106.639E 10.091N)': ee.Geometry.Point(106.639, 10.091),
  'z1g5, My Tho (106.461E 10.436N)' : ee.Geometry.Point(106.461, 10.436),
  'z1g6, Ca Mau (105.008E 9.550N)': ee.Geometry.Point(105.008, 9.550)
};
} // end of function initPoints