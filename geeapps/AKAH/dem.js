var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                65.8330078125,
                35.23427235143595
              ],
              [
                65.8330078125,
                32.86791915132769
              ],
              [
                69.2607421875,
                32.86791915132769
              ],
              [
                69.2607421875,
                35.23427235143595
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[65.8330078125, 35.23427235143595],
          [65.8330078125, 32.86791915132769],
          [69.2607421875, 32.86791915132769],
          [69.2607421875, 35.23427235143595]]], null, false);
Map.setCenter(57,30,5)
Map.setOptions('HYBRID')
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    //print('Layer '+name+' not found')
  }
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7',shown: false});
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
function drawClear() {
  clearGeometry();
  //drawingTools.setShape('point');
  //drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '400px', width: '500px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNdviTimeSeries() {
chartPanel.style().set('shown', true);
  // Make the chart panel visible the first time a geometry is drawn.
  // Get the drawn geometry; it will define the reduction region.
  var AOI = drawingTools.layers().get(0).getEeObject();
    var layers = drawingTools.layers();
    if (layers.get(0).geometries().length()){
      JsonTxt.setValue(ee.Serializer.toJSON(AOI))
    } else {
     AOI = ee.Deserializer.fromJSON(JsonTxt.getValue());
     Map.centerObject(AOI)
    } 
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
var SRTM = ee.Image('USGS/SRTMGL1_003').clip(AOI);
if (TypeOfDataset===1){
  SRTM = ee.Image('USGS/SRTMGL1_003').clip(AOI);
}
if (TypeOfDataset===2){
  SRTM = ee.Image('CGIAR/SRTM90_V4').clip(AOI);  
}
var options = {
  title: 'Elevation Profile',
  fontSize: 10,
  hAxis: {title: 'Elevation (meters)'},
  vAxis: {title: 'Pixel Count'},
};  //vAxis: {title: 'Pixel Count (1=0.04 km2'},
  var ContourInterval = ee.Number.parse(ContourIntervalTxt.getValue())
  //var DownloadResolution = ee.Number.parse(DownloadResolutionTxt.getValue())
  var histogram = ui.Chart.image.histogram({
  image: SRTM,region: AOI,scale: 200, minBucketWidth: ContourInterval})
    .setOptions(options);
    chartPanel.widgets().reset([histogram]);
    var TotalArea = ee.Image.pixelArea().mask(SRTM).divide(1000000);
    TotalArea = TotalArea.reduceRegion({reducer: ee.Reducer.sum(), geometry: AOI,
                scale: SRTM.projection().nominalScale(), maxPixels: 3784216672400, }).get('area')
    chartPanel.add(ui.Label('Total Area km2: ' + ee.Number(TotalArea.getInfo()).format("%.1f").getInfo()))
    var SRTM_Min = SRTM.reduceRegion({reducer: ee.Reducer.min(), geometry: AOI,scale: 200}).get('elevation');
    var SRTM_Min1 = ee.Number(SRTM_Min).format("%.1f")
    var SRTM_Min2 = ee.Number.parse(SRTM_Min1.getInfo()) 
    //MinElevLbl.setValue("Minimum Elevation: " + SRTM_Min2.getInfo())
    var MinElevation = SRTM_Min2.getInfo()
    var SRTM_Mean = SRTM.reduceRegion({reducer: ee.Reducer.mean(), geometry: AOI,scale: 200}).get('elevation');
    var SRTM_Mean1 = ee.Number(SRTM_Mean).format("%.1f")
    var SRTM_Mean2 = ee.Number.parse(SRTM_Mean1.getInfo()) 
    //MeanElevLbl.setValue("Mean Elevation: " + SRTM_Mean2.getInfo())
    var MeanElevation = SRTM_Mean2.getInfo()
    var SRTM_Max = SRTM.reduceRegion({reducer: ee.Reducer.max(), geometry: AOI,scale: 200}).get('elevation');
    var SRTM_Max1 = ee.Number(SRTM_Max).format("%.1f")
    var SRTM_Max2 = ee.Number.parse(SRTM_Max1.getInfo())
    //MaxElevLbl.setValue("Maximum Elevation: " + SRTM_Max2.getInfo())
    var MaxElevation = SRTM_Max2.getInfo()
    chartPanel.add(ui.Label('Elevation: ' + MinElevation + ' Lowest, ' + MaxElevation + ' Highest, and ' + MeanElevation + ' mean'))
    removeLayer('Elevation')
    Map.addLayer(SRTM, {min: MinElevation, max: MaxElevation, palette: ['blue', 'green','yellow','red','white']},'Elevation',true);
    var HillShade = ee.Terrain.hillshade(SRTM);
    removeLayer('Hillshade')
    Map.addLayer(HillShade, {min:0, max:255,}, 'Hillshade', true, 0.35);
    var Slope = ee.Terrain.slope(SRTM);
    removeLayer('Slope')
    Map.addLayer(Slope, {min:0, max:60, pallete: ['FFFFFF']},'Slope',false);
    // Get the aspect (in degrees).
    var Aspect = ee.Terrain.aspect(SRTM);
    // Convert to radians, compute the sin of the aspect.
    var sinImage = Aspect.divide(180).multiply(Math.PI).sin();
    // Display the result.
    Map.addLayer(sinImage, {min: -1, max: 1}, 'Aspect', false);
    var lines = ee.List.sequence(MinElevation, MaxElevation,ContourInterval)
    var SRTMContour = lines.map(function(line) {
      var mycontour = SRTM
        .convolve(ee.Kernel.gaussian(5, 3))
        .subtract(ee.Image.constant(line)).zeroCrossing() 
        .multiply(ee.Image.constant(line)).toFloat();
      return mycontour.mask(mycontour);
    });
    SRTMContour = ee.ImageCollection(SRTMContour).mosaic()
    removeLayer('Contours')
    Map.addLayer(SRTMContour, {min: MinElevation, max: MaxElevation,  palette: ['00ff00', 'green','yellow','red']}, 'Contours',false)
      var DEM_normalized = SRTM.subtract(MinElevation).divide(MaxElevation-MinElevation);
      // hue from green for low elevations via yellow to red for high elevations:
      var palettes = require('users/gena/packages:palettes')
      var DEM_styled = SRTM.visualize({ min: MinElevation, max: MaxElevation, palette: palettes.cb.BrBG[11] }).unitScale(0, 255)
      var terrain = DEM_styled.rgbToHsv().addBands(HillShade.divide(256).rename('value'), ['value'], true).hsvToRgb()
      terrain = terrain.visualize().blend(SRTMContour.visualize({palette: ['000000'], opacity: 0.5}));
      removeLayer('Mountain Terrain View')
      Map.addLayer(terrain,{}, 'Mountain Terrain View', false);
    var ErrorMsg = 'Error: Less than 12,000-14,000 km2 area allowed to download the SRTM 30 m DEM while less than 125000 km2 area for SRTM 90 m DEM'
    var Download_DEM = ui.Label(ErrorMsg)
    chartPanel.add(Download_DEM)
    Download_DEM.setUrl((SRTM.getDownloadURL({
    image: SRTM.serialize(),scale: SRTM.projection().nominalScale(), name:'SRTM DEM', filename: 'SRTM DEM',
    filePerBand: false,region: AOI})))
    Download_DEM.setValue('Download SRTM DEM')
    var Download_Slope = ui.Label('Download SRTM Slope').setUrl((Slope.getDownloadURL({
    image: Slope.serialize(),scale: Slope.projection().nominalScale(), name:'SRTM Slope', filename: 'SRTM Slope',
    filePerBand: false,region: AOI})))
    chartPanel.add(Download_Slope)
    var Download_Aspect = ui.Label('Download SRTM Aspect').setUrl((sinImage.getDownloadURL({
    image: sinImage.serialize(),scale: sinImage.projection().nominalScale(), name:'SRTM Aspect', filename: 'SRTM Aspect',
    filePerBand: false,region: AOI})))
    chartPanel.add(Download_Aspect)
}
var ContourIntervalTxt = ui.Textbox({value: '100',style: {width: '50px'}})
var JsonTxt = ui.Textbox({value:'',style: {width: '140px'}})
//var DownloadResolutionTxt = ui.Textbox({value: '30',style: {width: '50px'}})
var TypeOfDataset
var Dataset = ui.Select({
  placeholder: 'Choose DEM',
  items: [
    {label: 'SRTM 30 m v3', value: 1},    
    {label: 'SRTM 90 m v4', value: 2}
  ],
  onChange: function(value) {
  TypeOfDataset = value
    if (TypeOfDataset===1){  
      //DownloadResolutionTxt.setValue('30')
    }
    if (TypeOfDataset===2){  
      //DownloadResolutionTxt.setValue('90')
    }    
  }
});
Dataset.setValue(1,true)
var DatasetPanel = ui.Panel([ui.Label('DEM: '), Dataset], ui.Panel.Layout.flow('horizontal'));
//drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
//drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
//Dataset.onChange(ui.util.debounce(chartNdviTimeSeries, 500))
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  clear: '⬜',
  SubmitRefresh: '🔄'
};
var Shap2GeoJson = ui.Label('Shapefile to GeoJSON')
Shap2GeoJson.setUrl('https://mapshaper.org')
var controlPanel = ui.Panel({
  widgets: [
    DatasetPanel,
    ui.Panel([ui.Label('Contour Interval (m): '), ContourIntervalTxt], ui.Panel.Layout.flow('horizontal')),
    //ui.Panel([ui.Label('Download Resolution (m): '), DownloadResolutionTxt], ui.Panel.Layout.flow('horizontal')),
    ui.Label('1. Select a drawing mode, \nRectangle or Polygon.',
            {whiteSpace: 'pre'}),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Panel([ui.Label('GeoJSON: '), JsonTxt], ui.Panel.Layout.flow('horizontal')),
    ui.Label('2. Draw a geometry on map and\nclick on Submit/Refresh',
    {whiteSpace: 'pre'}),    
    ui.Button({
      label: symbol.SubmitRefresh + ' Submit / Refresh',
      onClick: chartNdviTimeSeries,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('3. Wait for chart/map to render.'),
    ui.Label(
        '4. Click on Clear button to see \nelevation map clearly.',
        {whiteSpace: 'pre'}),    
    ui.Button({
      label: symbol.clear + ' Clear Drawing',
      onClick: drawClear,
      style: {stretch: 'horizontal'}
    }),
    Shap2GeoJson
  ],
  style: {position: 'bottom-left', stretch: 'both'},
  layout: null,
});
Map.add(controlPanel);