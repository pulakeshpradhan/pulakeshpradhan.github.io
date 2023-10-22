var hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.2,
        "bands": [
          "lossyear"
        ],
        "min": 1,
        "max": 18,
        "palette": [
          "fffffd",
          "4bff71",
          "1eb446",
          "e6ff5a",
          "ffc966",
          "ff7758",
          "ff1010"
        ]
      }
    }) || {"opacity":0.2,"bands":["lossyear"],"min":1,"max":18,"palette":["fffffd","4bff71","1eb446","e6ff5a","ffc966","ff7758","ff1010"]},
    Treatment = ui.import && ui.import("Treatment", "table", {
      "id": "users/Shree1175/ForestProgram/Sagehen_TimberHarvest_Clipped"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/Sagehen_TimberHarvest_Clipped"),
    SagehenStudyArea = ui.import && ui.import("SagehenStudyArea", "table", {
      "id": "users/Shree1175/ForestProgram/Sagehen"
    }) || ee.FeatureCollection("users/Shree1175/ForestProgram/Sagehen");
// Temporal Trend of forest loss from FOREST Loss Year
//Loss and Gain bands = total loss / inviv years
// ----------------------------------------------------------------------------------------
// Load Data
// ----------------------------------------------------------------------------------------
// Polygon assets: Sagehen Study Area, Sagehen Treatments
// Landsat Surface Reflectance Tier 1
var Landsat1985 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR").filterBounds(SagehenStudyArea).filterDate('1985-01-01', '1985-12-31'); // 1985 Landsat 5   
var Landsat2000 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR").filterBounds(SagehenStudyArea).filterDate('2000-01-01', '2000-12-31'); // 2000 Landsat 7
var Landsat2010 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR").filterBounds(SagehenStudyArea).filterDate('2010-01-01', '2010-12-31'); // 2010 Landsat 7
var Landsat2019 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR").filterBounds(SagehenStudyArea).filterDate('2019-01-01', '2019-10-15'); // 2019 Landsat 8
// NAIP 2016
var NAIP = ee.ImageCollection("USDA/NAIP/DOQQ").filterBounds(SagehenStudyArea).filter(ee.Filter.date('2016-01-01', '2016-12-31'));
// ----------------------------------------------------------------------------------------
// Cloud Mask and Composite
// ----------------------------------------------------------------------------------------
// Cloud and snow mask function for Landsat 8 (SR data, pixel_qa band) 
function MaskL8Function(L8image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var L8cloudShadowBitMask = (1 << 3);
  var L8cloudsBitMask = (1 << 5);
  var L8snowBitMask = (1 << 4);
  // Get the pixel QA band.
  var L8qa = L8image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var L8mask = L8qa.bitwiseAnd(L8cloudShadowBitMask).eq(0)
                 .and(L8qa.bitwiseAnd(L8cloudsBitMask).eq(0))
                 .and(L8qa.bitwiseAnd(L8snowBitMask).eq(0));
  return L8image.updateMask(L8mask);
}
// Cloud and snow mask function for Landsat 5 and 7 (SR data, QA band) 
var MaskL7Function = function(L7image) {
  var L7qa = L7image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var L7cloud = L7qa.bitwiseAnd(1 << 5)
          .and(L7qa.bitwiseAnd(1 << 7))
          .or(L7qa.bitwiseAnd(1 << 3))
          .or(L7qa.bitwiseAnd(1 << 4)); // snow bit mask 
  // Remove edge pixels that don't occur in all bands
  var L7mask = L7image.mask().reduce(ee.Reducer.min());
  return L7image.updateMask(L7cloud.not()).updateMask(L7mask);
};
// Map the functions over Landsat collections and take the median composite
var Composite1985 = ee.Image(Landsat1985.map(MaskL7Function).median());  // 1985
var Composite2000 = ee.Image(Landsat2000.map(MaskL7Function).median());  // 2000
var Composite2010 = ee.Image(Landsat2010.map(MaskL7Function).median());  // 2010
var Composite2019 = ee.Image(Landsat2019.map(MaskL8Function).median());  // 2019
// Composite NAIP 
var CompositeNAIP = NAIP.mosaic();
// ----------------------------------------------------------------------------------------
// Indices
// ----------------------------------------------------------------------------------------
// NDVI
var NDVI1985 = Composite1985.normalizedDifference(['B4','B3']).rename('NDVI'); // 1985
var NDVI2000 = Composite2000.normalizedDifference(['B4','B3']).rename('NDVI'); // 2000
var NDVI2010 = Composite2010.normalizedDifference(['B4','B3']).rename('NDVI'); // 2010
var NDVI2019 = Composite2019.normalizedDifference(['B5','B4']).rename('NDVI'); // 2019
var NDVINAIP = CompositeNAIP.normalizedDifference(['N', 'R']).rename('NDVI');  // 2016 NAIP
// NDMI 
var NDMI1985 = Composite1985.normalizedDifference(['B4','B5']).rename('NDMI'); // 1985
var NDMI2000 = Composite2000.normalizedDifference(['B4','B5']).rename('NDMI'); // 2000
var NDMI2010 = Composite2010.normalizedDifference(['B4','B5']).rename('NDMI'); // 2010
var NDMI2019 = Composite2019.normalizedDifference(['B5','B6']).rename('NDMI'); // 2019
// NBR 
var NBR1985 = Composite1985.normalizedDifference(['B4','B7']).rename('NBR'); // 1985
var NBR2000 = Composite2000.normalizedDifference(['B4','B7']).rename('NBR'); // 2000
var NBR2010 = Composite2010.normalizedDifference(['B4','B7']).rename('NBR'); // 2010
var NBR2019 = Composite2019.normalizedDifference(['B5','B7']).rename('NBR'); // 2019
// Landsat time stamps 
var timestamp_1985 = Landsat1985.first().get('system:time_start'); // 1985
var timestamp_2000 = Landsat2000.first().get('system:time_start'); // 2000
var timestamp_2010 = Landsat2010.first().get('system:time_start'); // 2010
var timestamp_NAIP = NAIP.first().get('system:time_start');        // 2016 NAIP
var timestamp_2019 = Landsat2019.first().get('system:time_start'); // 2019
// Combine years and indices into one image collection, add time stamps 
var Indices1985 = NDVI1985.addBands(NDMI1985).addBands(NBR1985).set('system:time_start', timestamp_1985);
var Indices2000 = NDVI2000.addBands(NDMI2000).addBands(NBR2000).set('system:time_start', timestamp_2000);
var Indices2010 = NDVI2010.addBands(NDMI2010).addBands(NBR2010).set('system:time_start', timestamp_2010);
var Indices2019 = NDVI2019.addBands(NDMI2019).addBands(NBR2019).set('system:time_start', timestamp_2019);
var NDVIAll = ee.ImageCollection.fromImages([NDVI1985.set('system:time_start', timestamp_1985), NDVI2000.set('system:time_start', timestamp_2000), NDVI2010.set('system:time_start', timestamp_2010), NDVINAIP.set('system:time_start', timestamp_NAIP), NDVI2019.set('system:time_start', timestamp_2019)]);
var IndicesAll = ee.ImageCollection.fromImages([Indices1985, Indices2000, Indices2010, Indices2019]);
/////////////////////////////////
// Load Hansen Forest Data
////////////////////////////////
//The Hanssen data includes two particularly relevant layers: the "treecover2000" layer and the "loss" layer.  
//The "treecover2000" layer represents an estimate of tree canopy cover in the year 2000, as a percentage 
//in the range 0 to 100.  The loss layer is binary, and represents detections of loss across all sorts of 
//canopy cover.  
var lossyear = ee.Image(hansen).select('lossyear').clip(SagehenStudyArea);
var LOSS_STYLE = {min: 1, max: 18,  palette: ['red']};
Map.addLayer(lossyear,{min:1, max:18, palatte:['23ebff','660548']})
var lossCount = lossyear.eq([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]).
rename(['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'])
var lossArea = lossCount.multiply(ee.Image.pixelArea()).divide(10000);
/*
print(ui.Chart.image.regions({image:lossArea,regions:Treatment,reducer:ee.Reducer.sum(),seriesProperty:'Treatment Polygon'})
.setOptions({title:'Deforestation (Hansen v1.6 2000-2018)',hAxis:{title:'Year'},vAxis:{title:'Hectareas'}}))
.setChartType('BarChart');
 var loss = ee.Image(hansen).select('loss').clip(SagehenStudyArea)
 var gain = ee.Image(hansen).select('gain').clip(SagehenStudyArea)
 */
// ----------------------------------------------------------------------------------------
// Visualize Map
// ----------------------------------------------------------------------------------------
// Center map on study area 
Map.centerObject (SagehenStudyArea, 13);
// Display Landsat
Map.addLayer(Composite1985, {bands: ['B3', 'B2', 'B1'], min: 0, max: 3000}, '1985 Landsat 5');
Map.addLayer(Composite2000, {bands: ['B3', 'B2', 'B1'], min: 0, max: 3000}, '2000 Landsat 7');
Map.addLayer(Composite2010, {bands: ['B3', 'B2', 'B1'], min: 0, max: 3000}, '2010 Landsat 7');
Map.addLayer(Composite2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000,gamma: 1.4}, '2019 Landsat 8');
// Display NAIP 
Map.addLayer(CompositeNAIP.select(['R', 'G', 'B']), {min: 0.0, max: 255.0}, '2016 NAIP');
//Display Hansen 
Map.addLayer(lossyear.mask(lossyear).clip(SagehenStudyArea), LOSS_STYLE,'Forest Loss')
// Display NDVIs 
var NDVIpalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//Map.addLayer(ee.Image(NDVI2019), {min: 0, max: 1, palette: NDVIpalette}, 'NDVI 2019');
// Display Sagehen Study Area  
var empty = ee.Image().byte(); // Create an empty image into which to paint the features, cast to byte
var SagehenOutline = empty.paint({      // Paint the edges with color
  featureCollection: SagehenStudyArea,
  width: 3
}); 
Map.addLayer(SagehenOutline, {color: '000000'}, 'Sagehen Study Area');
// Display Treatments 
Map.addLayer(Treatment, {opacity:0.5, color: '653221'}, 'Sagehen Treatments');
// ----------------------------------------------------------------------------------------
// Create User Interface
// ----------------------------------------------------------------------------------------
// Create a panel for widgets
var panel = ui.Panel();
panel.style().set('width', '450px');
// Create panel title
var intro = ui.Panel([
  ui.Label({
    value: 'Trends in Sagehen Treatment Areas',
    style: {fontSize: '24px', fontWeight: 'bold'}
  }),
  ui.Label('Click in a treatment polygon to see changes in NDVI, NDMI, and NBR.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Select treatment polygon from lon/lat 
  var TreatmentSelection = Treatment.filterBounds(point); 
  Map.addLayer(TreatmentSelection, {color: 'white'}, 'Selected Treatment Polygon');
// Create chart of all indices
var IndicesChart = ui.Chart.image.series(IndicesAll, TreatmentSelection, ee.Reducer.mean(), 30);
IndicesChart.setOptions({
    title: 'Trends from 1985-2019, Landsat',
    vAxis: {title: 'Value', maxValue: 1, minValue: -1},
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 10}},
    series: {0: {color: 'red'},
             1: {color: 'blue'},
             2: {color: 'green'}
    }
  });
  // Create an NDVI chart
  var NDVIChart = ui.Chart.image.series(NDVIAll, TreatmentSelection, ee.Reducer.mean(), 30);
  NDVIChart.setOptions({
    title: 'NDVI Trend, Landsat and NAIP',
    vAxis: {title: 'NDVI', maxValue: 1, minValue: -1},
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 5}},
    series: {0: {color: 'green'}}
  });
  panel.widgets().set(2, IndicesChart);
  panel.widgets().set(3, NDVIChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);