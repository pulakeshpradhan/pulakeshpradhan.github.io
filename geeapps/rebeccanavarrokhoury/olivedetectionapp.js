var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "cluster"
        ],
        "palette": [
          "639965"
        ]
      }
    }) || {"opacity":1,"bands":["cluster"],"palette":["639965"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var south = ee.Geometry.BBox(-180,-90,180,0) //west, south, east, north
var north  = ee.Geometry.BBox(-180,0,180,90) //west, south, east, north
// Map settings
var map = ui.Map()
map.setCenter(-8.07847, 31.61096,13)
map.setOptions('HYBRID')
var drawingTools = map.drawingTools();
drawingTools.setShown(false); 
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
map.setControlVisibility({
  layerList:false,
drawingToolsControl:false
})
// Components 
var slider = ui.Slider();
slider.setValue(0.9);  // Set a default value.
slider.onChange(function(value) {
  map.layers().get(4).setOpacity(value);
});
// Style
var TITLE_STYLE = {
  fontWeight: '200',
  fontSize: '25px',
  padding: '6px',
  color: '#616161',
  stretch: 'horizontal',
  backgroundColor: '#11ffee00',
};
// About panel.
var aboutPanel = ui.Panel(
  {style: {margin: '0px -8px 0px -8px'}});
// Show/hide info panel button.
var aboutButton = ui.Button(
  {label: 'About ❯', style: {margin: '0px 4px 0px 0px'}});
// Information text. 
var descrLabel = ui.Label('This app allows to detect areas of super^intensive olive cultivation using 10 m pixel size Sentinel-2 imagery. Younger plantations with smaller tree crown size, usually cannot be detected. On the other hand, some mature and densely growing intensive or traditional olive orchards may be included in the classified areas. It is recommended to verify data by ground truthing, since results may vary depending on the diversity of tree crops in the area. In the Saiss area (Fès and Meknès Region, Morocco) it reached an F-Score of 0.9.');
var gridmetLabel = ui.Label('Tool developed and designed by R. Navarro on behalf of BICC within the BMBF funded project I-WALAMAR [grant number: 01LZ1807D].', null,
  'https://www.bicc.de/about/staff/staffmember/member/786-navarro/');
var descrHolder = ui.Panel([descrLabel, gridmetLabel]);
var infoShow = false;
function infoButtonHandler() {
  if(infoShow) {
    infoShow = false;
    descrHolder.style().set('shown', false);
    aboutButton.setLabel('About ❯');
  } else {
    infoShow = true;
    descrHolder.style().set('shown', true);
    aboutButton.setLabel('About ❮');
  }
}
aboutPanel.style().set({
  position: 'bottom-right',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
});
descrLabel.style().set({
  margin: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '13px',
  color: '505050'
});
gridmetLabel.style().set({
  margin: '4px 0px 0px 0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '13px',
  color: '505050'
});
descrHolder.style().set({
  shown: false,
  width: '250px',
  margin: '4px 0px 0px 0px',
  padding: '8px 8px 8px 8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});
aboutButton.style().set({
  margin: '0px 0px 0px 0px'
});
aboutButton.onClick(infoButtonHandler);
aboutPanel.add(aboutButton);
aboutPanel.add(descrHolder);
// Locations
var places = {
  Marrakech: [-8.07641, 31.61352],
  Meknès: [-5.3476, 33.8422],
  Córdoba: [-4.74776, 37.78742],
  Tabernas:  [-2.30316, 37.09092],
  };
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    map.setCenter(places[key][0], places[key][1]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a location...');
// Control Panel 
var waitMessage = ui.Label('⚙️ Please wait until computation is completed. This may take a minute, depending on the size of your AOI.' );
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
var rectangleButton = ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }) ;
var polygonButton = ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    });
var controlPanelTitle = ui.Label('Super intensive olive plantation detection app', TITLE_STYLE);
var controlPanelInst1 =    ui.Label('1. Zoom to your area of interest (AOI) or choose a location from the list.');
var controlPanelInst2 =    ui.Label('2. Select a drawing mode.');
var drawModePanel =     ui.Panel({
      widgets:[
        rectangleButton,
        polygonButton,
        ],
      layout: ui.Panel.Layout.flow('horizontal', true) 
    });
var controlPanelInst3 =  ui.Label('3. Draw a geometry and define your AOI.');
var controlPanel = ui.Panel({
  widgets: [
    controlPanelTitle,
    controlPanelInst1,
    select,
    controlPanelInst2,
    drawModePanel,
    controlPanelInst3
  ],
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '320px',
  position: 'top-left',
  shown: true
  }
});
// Slide panel for opacity control
var slidePanel = ui.Panel({
  widgets:[
    ui.Label('Change opacity'),
    slider],
    style: {position: 'top-right',
    shown:true
    }
});
// Download panel 
var downloadPanel = ui.Panel({
  widgets:[
    ui.Label('4. Donwload the data.'),
    ui.Label('Click on the button to generate a download link. This will create a KML file from the results.'),
    ],
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {width: '320px',
    position: 'bottom-left',
    shown: true
    }
})
// Map/chart panel
var mapChartSplitPanel = ui.SplitPanel({
  firstPanel: controlPanel, //
  secondPanel: map,
  orientation: 'horizontal',
  wipe: false,
});
ui.root.clear();
ui.root.add(mapChartSplitPanel);
map.add(aboutPanel)
// Functions 
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var index = 'NDVI'
if(index=='MSAVI'){
  var addIndex= function addMSAVI(image) {
  var msavi = image.expression(
  '(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', 
  {
    'NIR': image.select('B8'), 
    'RED': image.select('B4')
  }
).rename('MSAVI');
  return image.addBands(msavi)
  .copyProperties(image, ['system:time_start']);
} }
else if(index=='NDVI'){
var addIndex= function(image) {
 var ndvi = image.normalizedDifference(['B8', 'B4'])
    .rename('NDVI')
  return image.addBands(ndvi)
  .copyProperties(image, ['system:time_start'])
}}
// Initialize
function OliveOrchardDetection(){
// clear all panels and the map
map.clear()
//ui.root.clear()
controlPanel.clear()
// add new and old components
map.add(slidePanel)
controlPanel.add(controlPanelTitle)
controlPanel.add(controlPanelInst1)
controlPanel.add(select)
controlPanel.add(controlPanelInst2)
controlPanel.add(drawModePanel)
controlPanel.add(controlPanelInst3)
//ui.root.add(mapChartSplitPanel);
map.add(aboutPanel)
map.setControlVisibility({
  layerList:false,
drawingToolsControl:false
})
map.setOptions('HYBRID')
// define AOI from drawing tools
var aoi = drawingTools.layers().get(0).getEeObject()
drawingTools.layers().get(0).setShown(0)
//paint it on the map
var empty = ee.Image().byte();
var outlineAOI = empty.paint({
  featureCollection: aoi,
  color: '#ffc82d',
  width: 3
});
var VisualizeAOI = {"opacity":1,"bands":["constant"],"palette":["#ffc82d"]};
map.addLayer(outlineAOI, VisualizeAOI, 'AOI')
// Preprocessing
// mask areas with a slope greater than 5 % 
var dem = ee.Image('NASA/NASADEM_HGT/001').select('elevation');
// Calculate slope. Units are degrees, range is [0,90).
var slope = ee.Terrain.slope(dem);
var threshold = slope.lt(10).selfMask()
var contains = north.contains({'right': aoi, 'maxError':1})
var contains = ee.Number(ee.Algorithms.If(contains, 1, 0))
print(contains)
// apply all functions on the Sentinel 2 image collection
var winter_north = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-12-01', '2022-02-28')
                  .filterBounds(aoi)// Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .map(addIndex)
                  .qualityMosaic(index)
                  .mask(threshold)
var winter_south = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2022-06-01', '2022-08-31')
                  .filterBounds(aoi)// Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .map(addIndex)
                  .qualityMosaic(index)
                  .mask(threshold)
var summer_north = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2022-06-01', '2022-08-31')
                  .filterBounds(aoi)// Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .map(addIndex)
                  .qualityMosaic(index)
                  .mask(threshold)
var summer_south = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-12-01', '2022-02-28')
                  .filterBounds(aoi)// Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .map(addIndex)
                  .qualityMosaic(index)
                  .mask(threshold)
// Cluster and masking sequence
var summer = summer_north.where(contains.eq(1), summer_south)
var winter = winter_north.where(contains.eq(1), winter_south)
print(summer, 'summer')
print(winter, 'winter')
//var summer = summer+'_north'
var input = summer.select(index).clip(aoi)
var training = input.sample({
  region: aoi,
  scale: 10,
  numPixels: 2500
});
var clusterer = ee.Clusterer.wekaKMeans(2).train(training);
var unClass = input.cluster(clusterer);
// Select Cluster and create Summer Vegetation Mask
var img1 = input.mask(unClass.select('cluster').eq(1).selfMask());
var img0 =input.mask(unClass.select('cluster').eq(0).selfMask());
var mean1 = img1.reduceRegions({
  collection: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10,
});
var mean0 = img0.reduceRegions({
  collection: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10,
});
var mean1 = ee.Number(mean1.first().get('mean'))
var mean0 = ee.Number(mean0.first().get('mean'))
var cluster = mean1.gt(mean0) 
var summerVeg = unClass.select('cluster').eq(cluster).selfMask();  
// Extract Evergreen Vegetation
var input = winter.select(index).mask(summerVeg).clip(aoi)
var training = input.sample({
  region: aoi,
  scale: 10,
  numPixels: 2500
});
var clusterer = ee.Clusterer.wekaKMeans(2).train(training);
var unClass = input.cluster(clusterer);
var img1 = input.mask(unClass.select('cluster').eq(1).selfMask());
var img0 =input.mask(unClass.select('cluster').eq(0).selfMask());
var mean1 = img1.reduceRegions({
  collection: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10,
});
var mean0 = img0.reduceRegions({
  collection: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10,
});
var mean1 = ee.Number(mean1.first().get('mean'))
var mean0 = ee.Number(mean0.first().get('mean'))
var cluster = mean1.gt(mean0) 
var winterVeg = unClass.select('cluster').eq(cluster).selfMask();  
// Select Dry season image NIR band to enhance separability between deciduous tree crops with 
// winter soil greening or double cropping annuals
var input = summer.select(['B8']).mask(winterVeg);
var training = input.sample({
  region: aoi,
  scale: 10,
  numPixels: 2500
});
var clusterer = ee.Clusterer.wekaKMeans(2).train(training);
var unClass = input.cluster(clusterer);
var img1 = input.mask(unClass.select('cluster').eq(1).selfMask());
var img0 =input.mask(unClass.select('cluster').eq(0).selfMask());
var mean1 = img1.reduceRegions({
  collection: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10,
});
var mean0 = img0.reduceRegions({
  collection: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10,
});
var mean1 = ee.Number(mean1.first().get('mean'))
var mean0 = ee.Number(mean0.first().get('mean'))
var cluster = mean0.gt(mean1) 
// Visualize the clusters 
var visResults = {"opacity":0.5,"bands":["cluster"],"palette":["ff0404"]};
var unClass = unClass.select('cluster').eq(cluster).selfMask();
map.addLayer(unClass, visResults, 'Superintensive olive plantations 2022')
// Convert to vector data
var vectorsRefined = unClass.reduceToVectors({
  geometry: aoi,
  crs: unClass.projection(),
  scale: 10,
  geometryType: 'polygon',
  eightConnected: false,
  maxPixels: 61881870
});
// Create a download link
var urlGeom= ui.Label('⤓ Download KML file', {shown: false})
// Download function
var exportData = function() {
  //downloadPanel.add(ui.Label("Exporting data..."));
  //Set up download arguments
  var downloadArgsGeom = {
    format: 'kml'
  };
  if (map.drawingTools().layers().length() > 0) {
    var features = vectorsRefined;
    var exportGeom = ee.FeatureCollection(features);
    urlGeom.setUrl(exportGeom.getDownloadURL(downloadArgsGeom));
    urlGeom.style().set({shown: true})
    exportDataButton.style().set({shown:false})
    }
    };
// Create a download panel 
var downloadTitle = ui.Label('4. Download the data.')
var downloadDescript = ui.Label('Click on the button to generate a download link.')
var exportDataButton = ui.Button('Generate download link');
exportDataButton.onClick(exportData);
// Include it in the controlPanel
controlPanel.add(downloadPanel)
downloadPanel.clear()
downloadPanel.add(waitMessage)
downloadPanel.add(downloadTitle)
downloadPanel.add(downloadDescript)
downloadPanel.add(exportDataButton);
downloadPanel.add(urlGeom)
  }
  // End of the function for initialization
drawingTools.onDraw(ui.util.debounce(OliveOrchardDetection, 10));
drawingTools.onEdit(ui.util.debounce(OliveOrchardDetection, 10));