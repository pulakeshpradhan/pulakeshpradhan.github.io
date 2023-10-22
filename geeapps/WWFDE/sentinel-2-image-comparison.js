var vizparam = ui.import && ui.import("vizparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "swir1",
          "nir",
          "red"
        ],
        "min": 0.004399999976158142,
        "max": 0.42739999294281006,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["swir1","nir","red"],"min":0.004399999976158142,"max":0.42739999294281006,"gamma":1};
// Display two visualizations of a map. The separator between the two
// visualizations can be dragged left and right. The left map shows
// a RGB Landsat composite, and the right map shows NDVI, EVI or NDWI
// (chosen with the selector box on the top right corner).
Map.style().set({
  cursor: 'crosshair'
})
//Map.centerObject(point,8)
//var aoi = point.buffer(10000)
//var center = Map.getCenter()
// Set a center and zoom level.
//
var center = {lon: 30, lat: 51.5, zoom: 9};
//var aoi = geometry
//print(aoi)
// Create two maps.
var leftMap = ui.Map(center).add(ui.Map.DrawingTools());
var rightMap = ui.Map(center).add(ui.Map.DrawingTools());
//var label = new ui.Label('Draw points to calculate mean elevation');
//var inspector = new ui.Panel([label]);
//leftMap.add(inspector);
// Don't make imports that correspond to the drawn points.
//leftMap.drawingTools().setLinked(false);
// Limit the draw modes to points.
//leftMap.drawingTools().setDrawModes(['point']);
// Add an empty layer to hold the drawn points.
//leftMap.drawingTools().addLayer([]);
// Set the geometry type to be point.
//leftMap.drawingTools().setShape('point');
// Enter drawing mode.
//leftMap.drawingTools().draw();
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility({layerList:true});
leftMap.setControlVisibility({layerList:true});
leftMap.setControlVisibility({zoomControl: true});
leftMap.setControlVisibility({drawingToolsControl:false})
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
//GUI PANEL
//Map.style().set('cursor', 'crosshair');
var panel = ui.Panel();
panel.style().set({
  width: '350px',
  position: 'bottom-right',
  border : '1px solid #000000',
});
var space =ui.Label(' ',{fontWeight: 'bold'});
var label_threshold_select = ui.Label('select cloud threshold. a higher value means more images are composited, but artifacts can remain');
var threshold_select = ui.Slider({
  min: 0,
  max: 50, 
  value: 5, 
  step: 1,
  onChange: function(value) {
    var threshold_value = value
  },
  style: {width: '180px'}
});
var label_Start_base_select = ui.Label('Start of pre-deforestation period to compare to:');
var Start_base_select = ui.Textbox({
  value: '2019-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_base = text
  }
});
var label_End_base_select = ui.Label('End of pre-deforestation period (select 2-3 months for clear image):');
var End_base_select = ui.Textbox({
  value: '2019-09-30',
  style: {width : '90px'},
  onChange: function(text) {
    var End_base = text
  }
})
var label_Start_second_select = ui.Label('Start of after-deforestation period:');
var Start_second_select = ui.Textbox({
  value: '2020-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_second_select = ui.Label('End of after-deforestation period:');
var End_second_select = ui.Textbox({
  value: '2020-09-30',
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var End_second = text
  }
});
var title =ui.Label('Sentinel-2 Image Comparison',{fontWeight: 'bold'});
var sub = ui.Label('In the left map, zoom to where you want to see images. Select the dates for before and after the change event to create composites. Try to pick the same season for each time period. The before image will display on the left, after on the right.');
panel.add(title)
panel.add(sub)
panel.add(label_Start_base_select);
panel.add(Start_base_select);
panel.add(label_End_base_select);
panel.add(End_base_select);
panel.add(label_Start_second_select);
panel.add(Start_second_select);
panel.add(label_End_second_select);
panel.add(End_second_select);
panel.add(space)
panel.add(label_threshold_select);
panel.add(threshold_select);
//panel.add(space)
var button = ui.Button('process images - with patience!');
button.style().set({
  position: 'bottom-center',
  border : '2px solid blue',
  fontSize: '18px',
  margin: '4px',
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(panel);
ui.root.add(splitPanel);
panel.add(button);
button.onClick(function() {
    leftMap.clear();
    rightMap.clear();
  //Map.add(button);
    var befstartDate = Start_base_select.getValue();
    var befendDate = End_base_select.getValue();
    var aftstartDate = Start_second_select.getValue();
    var aftendDate = End_second_select.getValue();
    var metadataCloudCoverMax = threshold_select.getValue();
    var aoi = leftMap.getCenter().buffer(15000);
print('Before Start and end dates:',befstartDate,befendDate);
print('After Start and end dates:',aftstartDate,aftendDate);
var resolution = 10;//Landsat should be set to 30. Sentinel 2 should be set to 10, 20, or 60 depending on which bands are of interest.  Hybrid can be set to 10, 20, 30, or 60 depending on the need.  60 is the finest resolution that all can be divided without a remainder
var crs = 'EPSG:3857'; // EPSG number for output projection. 32651 = WGS84/UTM Zone 51N. For more info- http://spatialreference.org/ref/epsg/  
var noDataValue = -32678;//Choose a value that is not a real value in any exports
//var exportBands = ['blue','green','swir1','swir2','nir','red','temp','NDVI','NBR'];//Bands to export
/////////////////////////////////////////////////////
//Map.centerObject(aoi, 14)
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//Various lookup dictionaries for band numbers and names
var commonBandNames = ee.List(['blue','green','red','nir','swir1','swir2']);//Band names common to all sensors / TOA or SR corrections
////////////////////////////////////////////
//Sentinel2 L1C band numbers and names
var sensorBandDictSentinel2L1C = ee.Dictionary({S2 : ee.List([ 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12','QA60'])});
var bandNamesSentinel2L1C = ee.List(['cb', 'blue', 'green', 'red', 're1','re2','re3','nir', 'nir2', 'waterVapor', 'cirrus','swir1', 'swir2','QA60']);
///////////////////////////////////////////////////////
//Dictionary of metadata fields for azimuth for shadow shift method
var solarAzimuthFieldDict = ee.Dictionary({
  S2:'MEAN_SOLAR_AZIMUTH_ANGLE',
  landsatTOA: 'SUN_AZIMUTH',
  landsatSR : 'solar_azimuth_angle'
});
var solarZenithFieldDict = ee.Dictionary({
  S2:'MEAN_SOLAR_ZENITH_ANGLE',
  landsatTOA: 'SUN_ELEVATION',
  landsatSR : 'solar_zenith_angle'
});
//////////////////////////////////////////////////////////////////////////////////
var vizParams = vizparam;
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////
//Some client-side functions
//////////////////////////////////////////////////////////////
//Function to compute range list
function range(start, stop, step){
  start = parseInt(start);
  stop = parseInt(stop);
    if (typeof stop=='undefined'){
        // one param defined
        stop = start;
        start = 0;
    }
    if (typeof step=='undefined'){
        step = 1;
    }
    if ((step>0 && start>=stop) || (step<0 && start<=stop)){
        return [];
    }
    var result = [];
    for (var i=start; step>0 ? i<stop : i>stop; i+=step){
        result.push(i);
    }
    return result;
}
////////////////////////////////////////////////
function getRandomInt(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomList(min, max,n) {
  var out = [];
  while(n > 0){
    var t = getRandomInt(min,max);
    out.push(t);
  n= n - 1;
}
   return out;
}
/////////////////////////////////////////////////////////////////////////////////
//Function to handle empty collections that will cause subsequent processes to fail
//If the collection is empty, will fill it with an empty image
function fillEmptyCollections(inCollection,dummyImage){                       
  var dummyCollection = ee.ImageCollection([dummyImage.mask(ee.Image(0))]);
  var imageCount = inCollection.toList(1).length();
  return ee.ImageCollection(ee.Algorithms.If(imageCount.gt(0),inCollection,dummyCollection));
}
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//Function for manually setting no data value generally for exporting
function setNoData(image,noDataValue){
  var m = image.mask();
  image = image.mask(ee.Image(1));
  image = image.where(m.not(),noDataValue);
  return image;
}
//////////////////////////////////////////////////////////////////////////
var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {img: img})
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
//////////////////////////////////////////////////////////////////////////////////////////////////
//Function for acquiring Landsat TOA or SR and Sentinel 2 L1C data
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
  //First acquire Sentinel2 if chosen
 var bef_s2s = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(befstartDate,befendDate)
                  //.filter(ee.Filter.calendarRange(startJulian,endJulian))
                  //.filterBounds(Map.getCenter().buffer(100000))
                  .filterBounds(aoi)
                  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',metadataCloudCoverMax)
                  .select( sensorBandDictSentinel2L1C.get('S2'),bandNamesSentinel2L1C)
                  .map(maskS2clouds)
 var aft_s2s = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(aftstartDate,aftendDate)
                  //.filter(ee.Filter.calendarRange(startJulian,endJulian))
                  //.filterBounds(Map.getCenter().buffer(10000))
                  .filterBounds(aoi)
                  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',metadataCloudCoverMax)
                  .select( sensorBandDictSentinel2L1C.get('S2'),bandNamesSentinel2L1C)
                  .map(maskS2clouds)
//var aft_s2s_filter = aft_s2s.filterBounds(Map.getCenter().buffer(10000))
//var bef_s2s_filter = bef_s2s.filterBounds(Map.getCenter().buffer(10000))
print(aft_s2s,'after images')
print(bef_s2s,'before images')
//leftMap.addLayer(bef_s2s.median(),vizParams,'Sentinel 2 Composite Before');
var before_image = bef_s2s.median()
//rightMap.addLayer(aft_s2s.median(),vizParams,'Sentinel 2 Composite After');
var after_image = aft_s2s.median()
//print(allImages.count());
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////
// Add  image to the left map.
leftMap.addLayer(after_image, vizParams,'Sentinel 2 Composite'+ ' '+ befstartDate +'-'+ befendDate);
// Add  image to the right map.
rightMap.addLayer(before_image, vizParams, 'Sentinel 2 Composite'+ ' '+ aftstartDate +'-'+ aftendDate);
}
);