var table = ui.import && ui.import("table", "table", {
      "id": "users/atstahl/HUC8_outline"
    }) || ee.FeatureCollection("users/atstahl/HUC8_outline"),
    county = ui.import && ui.import("county", "table", {
      "id": "users/atstahl/WhitmanCo"
    }) || ee.FeatureCollection("users/atstahl/WhitmanCo");
//This script finds and displays available NAIP imagery by county
    // Whitman Cty has NAIP coverage in 2003 (RGB) and 2004, 2005, 2006, 2009, 2011, 2013, 2015, 2017, 2019 (RGBN)
// *** The lines below set up the map. ***
    // Center map on Whitman County.
    Map.setCenter(-117.5, 46.87, 10);
    // Set visualization parameters for NAIP in true color.
    var visParams = {bands: ['R', 'G', 'B']};
    // Set visualization parameters for NAIP in color infrared.
    var CIRParams = {bands: ['N', 'R', 'G']};
// *** Use these lines to query collection, change dates as desired. ***
    // Load NAIP imagery and filter it to time period & area of interest.
    var collection = ee.ImageCollection('USDA/NAIP/DOQQ')
        .filter(ee.Filter.bounds(county))
        .filterDate('2007-01-01', '2007-12-31');
    //print('Collection: ', collection);
    // Get the number of images. (Should equal the no. of elements 
                             // in the filtered collection.)
    var count = collection.size();
    //print('Count: ', count);
    // Display the images.
    //Map.addLayer(collection, visParams, 'raw NAIP');
// Load NAIP imagery, filter it to year (2003, 04, 05, 06, 07, 09, 11, 13, 15, 17, 19).
var raw = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.bounds(county));
var raw03 = raw.filterDate('2003-01-01', '2003-12-31');
var raw04 = raw.filterDate('2004-01-01', '2004-12-31');
var raw05 = raw.filterDate('2005-01-01', '2005-12-31');
var raw06 = raw.filterDate('2006-01-01', '2006-12-31');
var raw09 = raw.filterDate('2009-01-01', '2009-12-31');
var raw11 = raw.filterDate('2011-01-01', '2011-12-31');
var raw13 = raw.filterDate('2013-01-01', '2013-12-31');
var raw15 = raw.filterDate('2015-01-01', '2015-12-31');
var raw17 = raw.filterDate('2017-01-01', '2017-12-31');
var raw19 = raw.filterDate('2019-01-01', '2019-12-31');
// Reduce the collection by taking the median, clip to county area.
var NAIP03 = raw03.median().clip(county);
var NAIP04 = raw04.median().clip(county);
var NAIP05 = raw05.median().clip(county);
var NAIP06 = raw06.median().clip(county);
var NAIP09 = raw09.median().clip(county);
var NAIP11 = raw11.median().clip(county);
var NAIP13 = raw13.median().clip(county);
var NAIP15 = raw15.median().clip(county);
var NAIP17 = raw17.median().clip(county);
var NAIP19 = raw19.median().clip(county);
// Display the result in true color.
Map.addLayer(NAIP03, visParams, 'NAIP 2003 RGB', false);
Map.addLayer(NAIP04, visParams, 'NAIP 2004 RGB', false);
Map.addLayer(NAIP05, visParams, 'NAIP 2005 RGB', false);
Map.addLayer(NAIP06, visParams, 'NAIP 2006 RGB', false);
Map.addLayer(NAIP09, visParams, 'NAIP 2009 4-band', false);
Map.addLayer(NAIP11, visParams, 'NAIP 2011 4-band', false);
Map.addLayer(NAIP13, visParams, 'NAIP 2013 4-band', false);
Map.addLayer(NAIP15, visParams, 'NAIP 2015 4-band', false);
Map.addLayer(NAIP17, visParams, 'NAIP 2017 4-band', false);
Map.addLayer(NAIP19, visParams, 'NAIP 2019 4-band', false);
  //Create county outline and display.
  var empty = ee.Image().byte();
  var countyOutline = empty.paint({
    featureCollection: county,
    color: 1,
    width: 2
  });
  Map.addLayer(countyOutline, {}, "Whitman Co.");