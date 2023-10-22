var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NBR"
        ],
        "min": -0.08956053853034973,
        "max": 0.7091371417045593,
        "palette": [
          "ff3102",
          "fcff37",
          "8bff0c"
        ]
      }
    }) || {"opacity":1,"bands":["NBR"],"min":-0.08956053853034973,"max":0.7091371417045593,"palette":["ff3102","fcff37","8bff0c"]},
    alos2 = ui.import && ui.import("alos2", "imageCollection", {
      "id": "JAXA/ALOS/AW3D30/V3_2"
    }) || ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    dataset = ui.import && ui.import("dataset", "imageCollection", {
      "id": "JAXA/ALOS/AW3D30/V3_2"
    }) || ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "slope"
        ],
        "max": 45,
        "palette": [
          "fcff2d",
          "87ff60"
        ]
      }
    }) || {"opacity":1,"bands":["slope"],"max":45,"palette":["fcff2d","87ff60"]},
    ASTER = ui.import && ui.import("ASTER", "imageCollection", {
      "id": "ASTER/AST_L1T_003"
    }) || ee.ImageCollection("ASTER/AST_L1T_003"),
    tmCol = ui.import && ui.import("tmCol", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    etmCol = ui.import && ui.import("etmCol", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    oliCol = ui.import && ui.import("oliCol", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    soralo_area = ui.import && ui.import("soralo_area", "table", {
      "id": "users/dongora/SORALO/soralo_area"
    }) || ee.FeatureCollection("users/dongora/SORALO/soralo_area"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var AOI =  soralo_area
var cloudLevel = 50
var DOYstartWet = 60
var DOYendWet = 120
var DOYstartDry = 180
var DOYendDry = 300
var baselineYearStart = 1985
var baselineYearEnd = 1998
oliCol = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
/////0. Harmonize Landsat 5-7-8 
var coefficients = {
  itcps: ee.Image.constant([0.0003, 0.0088, 0.0061, 0.0412, 0.0254, 0.0172])
             .multiply(10000),
  slopes: ee.Image.constant([0.8474, 0.8483, 0.9047, 0.8462, 0.8937, 0.9071])
};
// Function to get and rename bands of interest from OLI.
function renameOli(img) {
  return img.select(
      ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'],
      ['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']);
}
// Function to get and rename bands of interest from ETM+.
function renameEtm(img) {
  return img.select(
      ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],
      ['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2', 'pixel_qa']);
}
function etmToOli(img) {
  return img.select(['Blue', 'Green', 'Red', 'NIR', 'SWIR1', 'SWIR2'])
      .multiply(coefficients.slopes)
      .add(coefficients.itcps)
      .round()
      .toShort()
      .addBands(img.select('pixel_qa'));
}
function fmask(img) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var qa = img.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask)
                 .eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return img.updateMask(mask);
}
// Define function to prepare OLI images.
function prepOli(img) {
  var orig = img;
  img = renameOli(img);
  img = fmask(img);
  return ee.Image(img.copyProperties(orig, orig.propertyNames()));
}
// Define function to prepare ETM+ images.
function prepEtm(img) {
  var orig = img;
  img = renameEtm(img);
  img = fmask(img);
  img = etmToOli(img);
  return ee.Image(img.copyProperties(orig, orig.propertyNames()));
}
var colFilter = ee.Filter.and(
    ee.Filter.bounds(AOI), 
    ee.Filter.lt('CLOUD_COVER', cloudLevel), 
    ee.Filter.or(
      ee.Filter.eq('SATELLITE', 'LANDSAT_8'),
      ee.Filter.eq('SATELLITE', 'LANDSAT_5'),
      ee.Filter.eq('SATELLITE', 'LANDSAT_7')),
    ee.Filter.lt('GEOMETRIC_RMSE_MODEL', 10),
    ee.Filter.or(
        ee.Filter.eq('IMAGE_QUALITY', 9),
        ee.Filter.eq('IMAGE_QUALITY_OLI', 9)))
    // ee.Filter.or(
    //     ee.Filter.calendarRange(10,12,'month'),
    //     ee.Filter.calendarRange(1,4,'month'));
// Filter collections and prepare them for merging.
oliCol = oliCol.filter(colFilter).map(prepOli);
etmCol = etmCol.filter(colFilter).map(prepEtm);
tmCol = tmCol.filter(colFilter).map(prepEtm);
// Merge the collections.
var col = oliCol.merge(etmCol).merge(tmCol);
var colSize = col.size()
print('number of images in collection:', colSize)
print('Harmonized collection',col)
//CLOUD MASKING (from https://gis.stackexchange.com/questions/271322/cloud-mask-in-surface-reflectance-landsat-8-test)
var col = col.map(function(image){return image.clip(AOI)})
//Select an image to play with
var LS8 = col
      .filterBounds(AOI)
      .filterMetadata('SATELLITE','equals', 'LANDSAT_8')
      .filterMetadata('CLOUD_COVER','less_than',5)
      .sort('CLOUD_COVER')
      .mean()
// Indices computation and mapping over whole collection 
var NBR = col.map(function (image){
  var nbr = image.normalizedDifference(['SWIR1','SWIR2']).rename('NBR')
  return image.addBands(nbr)
})
var NDVI = NBR.map(function (image){
  var ndvi = image.normalizedDifference(['NIR','Red']).rename('NDVI')
  return image.addBands(ndvi)
})
var NDWI = NDVI.map(function(image){
  var ndwi = image.normalizedDifference(['Red','SWIR1']).rename('NDWI')
  return image.addBands(ndwi)
})
var MSAVI = NDWI.map(function(image){
  var msavi = image.expression(
    '(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - R)) ) / 2', {
      'NIR': image.select('NIR'),
      'R': image.select('Red')
    }).rename('MSAVI')
    return image.addBands(msavi)
})
var BSI = MSAVI.map(function(image){
  var bsi = image.expression(
    '((SWIR2+RED)-(NIR+BLUE))/((SWIR2+RED)+(NIR+BLUE))',{
      'SWIR2': image.select('SWIR2'),
      'RED': image.select('Red'),
      'NIR': image.select('NIR'),
      'BLUE': image.select('Blue')
      }).rename('BSI')
      return image.addBands(bsi)
})
var VNSIR = BSI.map(function (image){
  var vnsir = image.expression(
    '1-((2 * RED - GREEN - BLUE)+ 3 *(SWIR2-NIR))', {
      'RED': image.select('Red'),
      'GREEN': image.select('Green'),
      'BLUE': image.select('Blue'),
      'SWIR2': image.select('SWIR2'),
      'NIR': image.select('NIR')})
      .rename('VNSIR')
  return image.addBands(vnsir)
});
// Define threshold levelsss for the bareground map
var ndviLow = -0.25
var ndviHigh = 0.25
var nbrLow = -0.3
var nbrHigh = 0.1
var vnsirHigh = 0.9
var msaviLow = 0.11
var msaviHigh = 0.7
var bareCol = VNSIR.map(function(image){
  var bare = image.select('NDVI').lt(ndviHigh)
            .and(image.select('NDVI').gt(ndviLow))
            .and(image.select('NBR').lt(nbrHigh))
            .and(image.select('NBR').gt(nbrLow))
            .and(image.select('VNSIR').lt(vnsirHigh))
            .rename('bare')
  return image.addBands(bare)
})
print('Bare Collection', bareCol)
//To calculate the frequency over the whole LS 5-7-8 collection
var noNullPixCount = bareCol
        .select('bare')
        .reduce(ee.Reducer.count())
        .rename('bare_pix_Count')
var frequency = bareCol
        .select('bare')
        .reduce(ee.Reducer.sum())
        .divide(noNullPixCount)
        .rename('bare_freq')
var frequency = frequency.mask(frequency.neq(0))
/////////BASELINE DRY FREQUENCY
// var baselineDryNoNullPix = bareCol
//     .select('bare')
//     .filter(ee.Filter.and(
//       ee.Filter.calendarRange(DOYstartDry,DOYendDry,'day_of_year'),
//       ee.Filter.calendarRange(baselineYearStart,baselineYearEnd,'year')))
//     .reduce(ee.Reducer.count())
//     .rename('bare_pix_count');
// var baselineDryFrequency = bareCol
//     .select('bare')
//     .filter(ee.Filter.and(
//       ee.Filter.calendarRange(DOYstartDry,DOYendDry,'day_of_year'),
//       ee.Filter.calendarRange(baselineYearStart,baselineYearEnd,'year')))
//     .reduce(ee.Reducer.sum())
//     .divide(baselineDryNoNullPix)
//     .rename('bare_freq')
// var baselineDryFrequencyMasked = baselineDryFrequency.mask(baselineDryFrequency.neq(0))
  // ee.Filter.or(
    //     ee.Filter.calendarRange(10,12,'month'),
    //     ee.Filter.calendarRange(1,4,'month'));
//To calculate the frequency over a baseline  and control period
var baselineStartDate=ee.Date('2000-01-01')
var baselineEndDate=ee.Date('2010-12-30')
var controlStartDate= ee.Date('2011-01-01')
var controlEndDate= ee.Date('2021-01-31')
var baselineNoPix = bareCol
      .select('bare')
      .filterDate(baselineStartDate,baselineEndDate)
      .reduce(ee.Reducer.count())
      .rename('bare_pix_Count')
var baselineFrequency = bareCol
      .select('bare')
      .filterDate(baselineStartDate,baselineEndDate)
      .reduce(ee.Reducer.sum())
      .divide(baselineNoPix)
      .rename('bare_freq')
var baselineFrequencyMasked = baselineFrequency.mask(baselineFrequency.neq(0))
print('control count',bareCol.select('bare').filterDate(controlStartDate,controlEndDate))
print('baseline count',bareCol.select('bare').filterDate(baselineStartDate,baselineEndDate))
// //To calculate the frequency over a control period
var controlNoPix = bareCol
      .select('bare')
      .filterDate(controlStartDate,controlEndDate)
      .reduce(ee.Reducer.count())
      .rename('bare_pix_Count')
var controlFrequency = bareCol
      .select('bare')
      .filterDate(controlStartDate,controlEndDate)
      .reduce(ee.Reducer.sum())
      .divide(controlNoPix)
      .rename('bare_freq')
var controlFrequencyMasked = controlFrequency.mask(controlFrequency.neq(0))
//bare ground frequency change
var frequencyChange = baselineFrequency.lt(controlFrequency)
var frequencyChange2 = baselineFrequency.subtract(controlFrequency).rename('bareGroundFreqChange')
var frequencyChange2 = frequencyChange2.mask(frequencyChange2.neq(0))
var stack = bareCol.mean()
//SLOPE AND ALTITUDE (TO CHECK: https://github.com/zecojls/tagee)
var elevation = dataset.select('DSM')
var elevationVis = {
  min: 0,
  max: 5000,
  palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']
};
// Reproject an image mosaic using a projection from one of the image tiles,
// rather than using the default projection returned by .mosaic().
var proj = elevation.first().select(0).projection();
var slopeReprojected = ee.Terrain.slope(elevation.mosaic()
                             .setDefaultProjection(proj)).clip(AOI);
Map.addLayer(slopeReprojected, {min: 0, max: 45, palette:['8c510a','bf812d','dfc27d','f6e8c3','c7eae5','80cdc1','35978f','01665e']}, 'Slope',false);
Map.addLayer(elevation, elevationVis, 'Elevation',false);
Map.addLayer(stack,{bands:['VNSIR','NDVI','NBR']},'Index Stack',false)
Map.addLayer(LS8,{bands:['Red','Green','Blue'], min:170, max:2109},'Natural Colors', false)
Map.addLayer(VNSIR,{min:-2881, max:10335},'VNSIR',false)
Map.addLayer(NBR,{min:-0.08, max:0.81},'NBR',false)
//Map.addLayer(result.randomVisualizer(), {}, 'clusters',false)
Map.addLayer(frequency,{palette:['ffffcc','ffeda0','fed976','feb24c','fd8d3c','fc4e2a','e31a1c','b10026'],min:0, max:1, opacity:0.5},'Bare Ground frequency', false)
Map.addLayer(baselineFrequencyMasked,{palette:['ffffcc','ffeda0','fed976','feb24c','fd8d3c','fc4e2a','e31a1c','b10026'],min:0, max:1, opacity:0.5},'Bare Ground Baseline frequency', false)
Map.addLayer(controlFrequencyMasked,{palette:['ffffcc','ffeda0','fed976','feb24c','fd8d3c','fc4e2a','e31a1c','b10026'],min:0, max:1, opacity:0.5},'Bare Ground Control frequency', false)
Map.addLayer(frequencyChange,{},'Frequency Change (lt)', false)
Map.addLayer(frequencyChange2,{min:-0.5,max:0.66,palette:['a50026','d73027','f46d43','fdae61','fee08b','d9ef8b','a6d96a','66bd63','1a9850','006837']},'Frequency Change (subtract)')
Export.image.toDrive({
  image: frequencyChange2,
  description: "FrequencyChangeSoralo_Difference",
  scale:30,
  region:AOI
  })
Map.addLayer(soralo_area.style({color: 'red', fillColor: '00000000'}),{},'AOI')
Map.setCenter(36.11179612578329,-1.9344032380427882, 8);
//////----> CHARTS <-----////From Esmee
//Define Drawing Tools
var drawingTools = Map.drawingTools();
//Remove drawing tools
drawingTools.setShown(false);
//Setup loop to clear all existing geometries (reset)
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
// Initialize a dummy GeometryLayer with null geometry to act as a placeholder for drawn geometries
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
//Define the geometry clearing function
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//define function that will be called when each respective drawing button is clicked
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
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
//Define a panel to hold the time series chart (set the 'shown' stype parameter to 'false' to initially hide the panel unit until the first chart is rendered)
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
//Add the panel to the Map
Map.add(chartPanel);
//Define a function that gets called on geometry drawing completion and editing events to generate an NDVI time series chart
//this is done in the next several steps
function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
var chart_BG = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: bareCol,
                    regions: AOI,
                    reducer: ee.Reducer.count(),
                    band: 'bare',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'Threshold exceedance',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Frequency [-]'},
                    series: {0: {color: '23cba7'}}
                  });
var chart_bg = ui.Chart.image
                  .series({
                    imageCollection: bareCol.select('bare'),
                    region: AOI,
                    scale:scale
                  }).setOptions({
                    titlePostion: 'Bare Ground occurrence',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Occurrence [-]'},
                    series: {0: {color: '23cba7'}}
                  })
chartPanel.widgets().reset([chart_bg])
}
//Set the drawing tools widget to listen for geometry drawing and editing events and respond with the chartNdviTimeSeries function
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
//This section defines the drawing control panel, which contains instructions and drawing tool buttons
// Difine symbols
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
//Define ui.Panel to hold app instructions and drawing buttons
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
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
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
//Add the panel to the Map
Map.add(controlPanel);
//change the basemap
Map.setOptions("HYBRID");