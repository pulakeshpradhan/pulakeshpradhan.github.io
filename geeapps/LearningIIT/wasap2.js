var imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
 Map.setCenter(78.481, 22.634,5)
var drawTool = Map.drawingTools();
drawTool.setShown(false);
while (drawTool.layers().length() > 0) {
  var layer = drawTool.layers().get(0);
  drawTool.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'ROI', color: '23cba7'});
drawTool.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawTool.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawTool.setShape('rectangle');
  drawTool.draw();
}
function drawPolygon() {
  clearGeometry();
  drawTool.setShape('polygon');
  drawTool.draw();
}
drawTool.onDraw(ui.util.debounce(drawings, 500));
drawTool.onEdit(ui.util.debounce(drawings, 500));
// Get the drawn geometry; it will define the reductidowon region.
  var aoi = drawTool.layers().get(0).getEeObject();
// Set the drawing mode back to null; turns drawing off.
  drawTool.setShape(null);
  var symbol = {
  rectangle: '▢',
  polygon: '⬠',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('Select a Drawing mode.'),
    ui.Button({
      label: symbol.rectangle + '  Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
      }),
    ui.Button({
      label: symbol.polygon + '   Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-right'},
  layout: null,
});
Map.add(controlPanel);
function drawings() {  
var aoi = drawTool.layers().get(0).getEeObject();
drawTool.layers().remove(dummyGeometry);
  var startDate = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      value: '2020-10-01',
      style: {width: '90px'},
      onChange: function(text) {
  var Start_base = text;
      }
    });
  var threshold = ui.Textbox({
      placeholder: 'enter threshold',
      value: 0,
      style: {width: '90px'},
      onChange: function(text) {
  var Start_base = text;
      }
    });
 var getImages = function()
 {
   var start = startDate.getValue();
    if (start) start = ee.Date(start);
      Map.clear();
  var end = start.advance(1,'month');
  var date_range = ee.DateRange(start,end); 
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
// Map the function over one month of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var sent = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(start, end)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                  .filterBounds(aoi)
                  // Pre-filter to get less cloudy granules.
                  .map(maskS2clouds)
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B8', 'B4', 'B3'],
};
Map.addLayer(sent.mosaic().clip(aoi), rgbVis, ' Sentinel 2 Level 1C FCC', 1);
/*Calc NDWI landsat Collections*/
var addNDWI = function(image) {
  var NDWI = image.normalizedDifference(['B3', 'B8']).rename('NDWI');//change here
  return image.addBands(NDWI);
};
 ///For a collection
var withNDWI = sent.map(addNDWI);
var NDWI=withNDWI.select('NDWI').mosaic().clip(aoi).focal_median(100, 'circle', 'meters');
var NDWIParams = {min: -0.5, max: .5, palette: ['yellow', 'blue']};
Map.addLayer(NDWI, NDWIParams, 'NDWI');
return NDWI
}
var hist = function()
{
var sent=getImages();
var histogram = sent.select('NDWI').reduceRegion({  
  reducer: ee.Reducer.histogram(255, 2),
  geometry: aoi, 
  scale:100,
  bestEffort: true,
  maxPixels:1e12
}).get('NDWI');
panel.widgets().set(11, ui.Chart.image.histogram(sent, aoi, 100)); 
return histogram
}
var mapping= function()
{
    var sent = getImages()
    var thresh = parseFloat(threshold.getValue());
    if (thresh) thresh = thresh;
    var flood = ee.Image(sent).gt(thresh);  //value =1
    var img=flood.mask(flood).clip(aoi)
Map.addLayer(img, {palette: 'blue'}, 'Water@( '+thresh+')');
return img
}
///..................Area.............../////////
var area= function()
{
  var thresh = parseFloat(threshold.getValue());
  var flood= mapping()
  var areaImage=flood.mask(flood).multiply(ee.Image.pixelArea())
              .multiply(0.000001).rename('area_Total');
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 100,
  maxPixels: 1e10
}).get('area_Total');
panel.add(ui.Label('For the Date==>   ' +startDate.getValue()));  
panel.add(ui.Label('Using Threshold=>   ' +thresh));
panel.add(ui.Label('Total Water Area (in sq. km.)==> ' +stats.getInfo().toFixed(2)));  
}
var output= function()
{
var img= ee.Image(mapping());
var vectors = img.addBands(img).reduceToVectors({
  geometry: aoi,
  scale: 50,
  //crs: 'EPSG:32643',
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean(),
  maxPixels:1e10
});
Map.addLayer(vectors,{},'Water Vector')
var thresh = parseFloat(threshold.getValue());
// Export.image.toDrive({
//   description: 'TryImage3',
//   image:img ,
//   region: aoi,
//   scale: 10,
//   maxPixels:1e10
// });
var url = vectors.getDownloadURL({ 
       // dimensions: '720'
      // region:aoi,
      filename:startDate.getValue().toString()+'_Th_'+thresh.toString() ,
      format: 'kml',
      // name: 'ImageExport'
    });
    label.setValue(startDate.getValue().toString()+'&Th '+thresh.toString());
    label.setUrl(url);
    label.style().set({shown: true});
}
var label = ui.Label('Click "Generate KML" to activate this link (size limit 32 MB)');
var downloadButton = ui.Button({
  label: 'Generate KML ',
  onClick: function() 
  {
    return output()
  },
      disabled: false,
});
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
  mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: false});
Map.setOptions('SATELLITE');
Map.addLayer(aoi, {color:'23cba7'},"ROI");
controlPanel.clear();
var intro = ui.Panel([
  ui.Label({
    value: 'Water Surface Mapper (WASAP 2.0 (Beta))',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
var panel= ui.Panel();
panel.add(intro);
panel.add(ui.Label('Enter Start Date for Sentinel 2 Monthly Median Composite', {'font-size': '14px'}));
panel.add(ui.Label('Disclaimer: © Sachchidanand Singh & Praveen Kalura, IIT Roorkee', {'font-size': '12px'}));
panel.add(startDate);
var   button2 = ui.Button({
      label: 'Get FCC, NDWI & Histogram',
      onClick: function()
      {
         return hist();
      },
      disabled: false,
      });
panel.add(button2);
panel.add(ui.Label('Enter Threshold', {'font-size': '16px'})); 
panel.add(threshold);
var   button3 = ui.Button({
      label: 'Map Surface Water ',
      onClick: function()
      {
         return mapping();
      },
      disabled: false,
      });
panel.add(button3); 
 var   button4 = ui.Button({
      label: 'Estimate Area',
      onClick: function()
      {
         return area();
      },
      disabled: false,
      }); 
panel.add(button4); 
var download_button = ui.Button({
     // label: 'Download Image',
      onClick: function()
      {
         return exp();
      },
      disabled: false,
      });
panel.add(downloadButton)  
panel.add(label);
ui.root.insert(0, panel);
}