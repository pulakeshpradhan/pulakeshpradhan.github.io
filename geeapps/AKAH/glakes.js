var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* shown: false */
    ee.Geometry.MultiPoint();
//latest
Map.setCenter(60,30,5)
Map.setOptions('SATELLITE')
var GeojsonPredefinestring = '{"type":"Polygon","coordinates":[[[72.69257629230827,37.843667420399335],[72.69257629230827,37.69521697221909],[73.02113616779656,37.69521697221909],[73.02113616779656,37.843667420399335]]],"geodesic":false,"evenOdd":true}' //'{"type":"Polygon","coordinates":[[[72.48133517473862,38.07278574758517],[72.48133517473862,37.88280795471408],[72.81916476458237,37.88280795471408],[72.81916476458237,38.07278574758517]]],"geodesic":false,"evenOdd":true}'
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);2020-1-1
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
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
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  clear: '⬜',
  SubmitRefresh: '🔄'
};
var Shap2GeoJson = ui.Label('Shapefile to GeoJSON Converter Tool')
Shap2GeoJson.setUrl('https://mapshaper.org')
var JsonTxt = ui.Textbox({value:GeojsonPredefinestring,style: {width: '225px'}})
var controlPanel = ui.Panel({
  widgets: [
 ui.Label('1. Select drawing mode & Draw AOI on map \nor provide GeoJSON text.',
            {whiteSpace: 'pre'}),
    ui.Panel([ui.Button({
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
      label: symbol.clear + ' Clear Drawing',
      onClick: drawClear,
      style: {stretch: 'horizontal'}
    })], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([ui.Label('GeoJSON: '), JsonTxt], ui.Panel.Layout.flow('horizontal')),
    Shap2GeoJson,
  ],
  style: {position: 'bottom-left', stretch: 'both'},
  layout: null,
});
//Map.add(controlPanel);
//var addArea = function(feature) {
  //return feature.set({areaHa: feature.geometry().area().divide(100 * 100)});
//};
//PLK = PLK.map(addArea).filter(ee.Filter.gt('areaHa',1));
var ExportArea = geometry //PLK.union().geometry() //Map.setCenter(57,30,3)//AOI
//Map.centerObject(ExportArea)
var SRTM = ee.Image('USGS/SRTMGL1_003');
var Basin = ee.FeatureCollection(ExportArea);
var palettes = require('users/gena/packages:colorbrewer').Palettes
var animation = require('users/gena/packages:animation')
var utils = require('users/gena/packages:utils')
var text = require('users/gena/packages:text')
//var batch = require('users/fitoprincipe/geetools:batch')
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
}
function SetDateInIndividualImage(image) {
  return image.clip(ExportArea)
  .set({ label: ee.Date(image.get('system:time_start')).format('dd-MM-yyyy')})
  //.copyProperties(image, ['system:time_start', 'CLOUD_COVER'])
}
var MainPanel = ui.Panel(); //{style: {minWidth: '10%', maxWidth: '22%',stretch: 'both',resize:'horizontal'}}
MainPanel.style().set('width', '23.5%');
MainPanel.add(controlPanel)
//var intro = ui.Panel([ui.Label({value: 'Water & Vegetation Monitoring',style: {fontSize: '20px', fontWeight: 'bold'}})]);
//MainPanel.add(intro);
MainPanel.add(ui.Label('2. Set below parameters appropriately.',{whiteSpace: 'pre'}))
var frmDateLbl = ui.Label({value: 'From Date:',style: { width: '60px'}});
var toDateLbl = ui.Label({value: 'To Date:',style: { width: '60px'}});
var frmDate = ui.Textbox({placeholder: 'yyyy-MM-dd',value: '2021-1-1',style: { width: '90px'}});
var ToDate = ui.Textbox({placeholder: 'yyyy-MM-dd',value: '2021-12-31',style: { width: '90px'}});
MainPanel.add(ui.Panel([frmDateLbl, frmDate], ui.Panel.Layout.flow('horizontal')));
MainPanel.add(ui.Panel([toDateLbl, ToDate], ui.Panel.Layout.flow('horizontal')));
var frmMonthLbl = ui.Label({value: 'From Month:',style: { width: '80px'}});
var toMonthLbl = ui.Label({value: 'To Month:',style: { width: '75px'}});
var frmMonth = ui.Textbox({placeholder: 'MM',value: '1',style: { width: '40px'}});
var ToMonth = ui.Textbox({placeholder: 'MM',value: '12',style: { width: '40px'}});
MainPanel.add(ui.Panel([frmMonthLbl, frmMonth,toMonthLbl,ToMonth], ui.Panel.Layout.flow('horizontal')));
//MainPanel.add(ui.Panel([toDateLbl, ToMonth], ui.Panel.Layout.flow('horizontal')));
var ExcludesDatesLbl = ui.Label({value: 'Excludes Images:',style: { width: '120px'}});
var ExcludesDatesTxt = ui.Textbox({placeholder: 'Enter Dates dd-mm-yyyy,',value: '',style: { width: '350'}});
MainPanel.add(ui.Panel([ExcludesDatesLbl, ExcludesDatesTxt], ui.Panel.Layout.flow('horizontal')));
var CloudCoverageLbl = ui.Label({value: 'Choose Images with Max Cloud Coverage (%):',style: { width: '300px'}});
var CloudCoverageSlider = ui.Slider({min: 0,max: 100,value: 25,step: 1,style: {width: '300px'}});
//var CloudCoverageTxt = ui.Textbox({placeholder: 'Between 0 to 100',value: '25',style: { width: '60px'}});
MainPanel.add(ui.Panel([CloudCoverageLbl, CloudCoverageSlider]));
var RemoveCloudyPixelsCheck = ui.Checkbox('Remove Cloudy Pixels').setValue(false);
MainPanel.add(RemoveCloudyPixelsCheck);
var TypeOfAnalysis
var AnalysisOn = ui.Select({
  placeholder: 'Choose Analysis Type...',
  items: [
    {label: 'Each Visit Image', value: 1},
    {label: 'Monthly Over the Period', value: 2},
    {label: 'Monthly Over the Year', value: 3},
    //{label: 'Yearly Mean', value: 4}
  ],
  onChange: function(value) {
  TypeOfAnalysis = value
  }
});
AnalysisOn.setValue(2,true)
var lblAnalysisOn = ui.Label({value: 'Composite & Mosaic: '});
var pnlAnalysisOn= ui.Panel([lblAnalysisOn, AnalysisOn], ui.Panel.Layout.flow('horizontal'));
MainPanel.add(pnlAnalysisOn);
var ExcludesDatesLbl = ui.Label({value: 'Consider water pixel within x degree slope'});
var SlopeAngleSlider = ui.Slider({min: 0,max: 90,value: 20,step: 1,style: {width: '290px'}});
//var DegreeLbl = ui.Label({value: ' degree'});
var pnlSlopeAngleSlider= ui.Panel([SlopeAngleSlider], ui.Panel.Layout.flow('horizontal'));
MainPanel.add(ui.Panel([ExcludesDatesLbl, pnlSlopeAngleSlider]));
var WaterOccurrenceLbl = ui.Label({value: 'Consider those pixels with at least have X time water occurrence:',style: { width: '300px'}});
var WaterOccurrenceSlider = ui.Slider({min: 0,max: 10,value: 0,step: 1,style: {width: '300px'}});
//var CloudCoverageTxt = ui.Textbox({placeholder: 'Between 0 to 100',value: '25',style: { width: '60px'}});
MainPanel.add(ui.Panel([WaterOccurrenceLbl, WaterOccurrenceSlider]));
var MinGLakesLbl = ui.Label({value: 'Min Glacial Lakes size (sq mt) to be considered:',style: { width: '300px'}});
var GLakeSizeSlider = ui.Slider({min: 500,max: 10000,value: 3000,step: 100,style: {width: '300px'}});
//var MinGLakeTxt = ui.Textbox({placeholder: 'Minimum 500',value: '3000',style: { width: '60px'}});
MainPanel.add(ui.Panel([MinGLakesLbl, GLakeSizeSlider]));
var CloudyCoverageCheck = ui.Checkbox('Cloud Coverage Chart').setValue(true);
MainPanel.add(CloudyCoverageCheck);
var NDIMonthlyCheck = ui.Checkbox('Normalized Difference Index Chart').setValue(false);
MainPanel.add(NDIMonthlyCheck);
var NDI_Bands_Selection = ('NDWI') //Change for app
var NDVICheck = ui.Checkbox('Vegetation Area Chart').setValue(false);
//MainPanel.add(NDVICheck); //Change for app
var NDWICheck = ui.Checkbox('Surface Water Area Chart').setValue(false);
MainPanel.add(NDWICheck);
var CalBasinAreaCheck = ui.Checkbox('Calculate Defined/Drawed Area: ').setValue(false);
MainPanel.add(CalBasinAreaCheck);
var ElevationCheck = ui.Checkbox('Add Elevation Map: ').setValue(false);
MainPanel.add(ElevationCheck);
var Visualization = {
    'Natural/True Color': {description: '',
      visParams: {gamma: 0.9, min: 0, max: 2500, bands: ['B4', 'B3', 'B2']}
    //},'False Color': {description: '',
      //visParams: {gamma: 0.9, min: 0, max: 2500, bands: ['B8','B4','B3']}
    },'Land & Water Color': {description: '',
      visParams: {gamma: 0.9, min: 0, max: 2500, bands: ['B8', 'B11', 'B4']}
    //}, 'NDVI': {description: '',
      //visParams: {min:-1, max:1,palette:'blue, white, lime, green', bands: ['NDVI']}
    //}, 'Vegetation': {description: '',
      //visParams: {min:2, max:4, palette:'lime, LimeGreen, green', bands: ['Vegetation']}
    //}, 'MNDVI': {description: '',
      //visParams: {min:-1, max:1, palette:'blue, white, lime, LimeGreen, green', bands: ['MNDVI']}
    }, 'NDWI': {description: '', 
      visParams: {min:-1, max:1, palette:'green, LimeGreen, white, blue, Navy', bands: ['NDWI']}
    }, 'Surface Water': {description: '',
      visParams: {min:1, max:4, palette:'LightSkyBlue, SteelBlue, blue, Navy', bands: ['Surface Water']}
    }, 'Surface Water Occurrence': {description: '',
      visParams: {min:0.1, max:100, palette:'LightSkyBlue, SteelBlue, blue, Navy', bands: ['Surface Water Occurrence']}
    }, 'Surface Water in Mountain': {description: '',
      visParams: {min:50, max:650, palette:'Navy, blue, SteelBlue, LightSkyBlue', bands: ['Surface Water in Mountain']}
    }, 'Surface Water Occurrence in Mountain': {description: '',
      visParams: {min:0, max:100, palette:'LightSkyBlue, SteelBlue, blue, Navy', bands: ['Surface Water Occurrence in Mountain']}        
    //}, 'MNDWI': {description: '',
    //  visParams: {min:-1, max:1, palette:'LimeGreen, yellow, blue, Navy', bands: ['MNDWI']}
    //}, 'MNDWI_Masked': {description: '',
      //visParams: {min:1, max:4, palette:'LightSkyBlue, SteelBlue, blue, Navy', bands: ['MNDWI_Masked']}
    //}, 'Vegetation & Surface Water': {description: '',
      //visParams: {min:1, max:9, palette:'white, white, lime, LimeGreen, green, LightSkyBlue, SteelBlue, blue, Navy', bands: ['Vegetation & Surface Water']}
    //}, 'NDSI': {description: '',
      //visParams: {min:-1, max:1, palette:'LimeGreen, yellow, blue, Navy', bands: ['NDSI']}
    //}, 'NDSI_Masked': {description: '',
      //visParams: {min:-1, max:1, palette:'LimeGreen, yellow, blue, Navy', bands: ['NDSI_Masked']}
    //}, 'NDBI': {description: '',
     // visParams: {min:-0.1, max:0.1,palette:'blue, white, lime, green', bands: ['NDBI']}
    }
  };
    function SetBandsCounts(image) {
        return image.set('count', image.bandNames().length())
    }
var AnimationCheck = ui.Checkbox('Create Animation Video').setValue(false);
MainPanel.add(AnimationCheck);    
var SelectMap = ui.Select({
  items: Object.keys(Visualization),
  placeholder: 'Choose Display Image...',
});
SelectMap.setValue('Natural/True Color',true)
var MonthlyImages
var contourlines
var NDVI_Areas = ee.List.sequence(0,0);
var NDWI_Areas = ee.List.sequence(0,0);
var WaterOccurrence_Maksed //Surface Water Occurrence
var WaterOccurrence_DesiredSlope //Surface Water Occurrence within Desired Slope
var WaterOccurrenceMountain_Masked //Surface Water Occurrence in Mountain
var PossibleGlacialLakesVectors // Possible Waterbodies KML file
var PossibleGlacialLakesMountainVectors // Possible Glacial Lakes in mountain KML file
var button = ui.Button({
  label: 'Perform Analysis...',
  onClick: function() {
  WaitMessage.setValue('Error...')
  ExportButton.setDisabled(false);
//Map.style().set('cursor', 'crosshair');
    Map.layers().reset();
    Map.clear()
    drawingTools.setShape(null);
    ExportArea = drawingTools.layers().get(0).getEeObject();//AOI
    var layers = drawingTools.layers();
    if (layers.get(0).geometries().length()){
      JsonTxt.setValue(ee.Serializer.toJSON(ExportArea))//AOI
    } else {
     ExportArea = ee.Deserializer.fromJSON(JsonTxt.getValue());//AOI
     Map.centerObject(ExportArea)
    } 
NDVI_Areas = ee.List.sequence(0,0);
NDWI_Areas = ee.List.sequence(0,0);
var fDate = ee.Date.parse('yyyy-MM-dd', frmDate.getValue())
var tDate = ee.Date.parse('yyyy-MM-dd', ToDate.getValue())
var fMonth = ee.Number.parse(frmMonth.getValue())
var tMonth = ee.Number.parse(ToMonth.getValue())
var CloudCoverages = CloudCoverageSlider.getValue()
var nMonths = ee.Number(tDate.difference(fDate,'month')).round();
var collection = ee.ImageCollection('COPERNICUS/S2') 
    .filterDate(fDate, tDate)
    .filter(ee.Filter.calendarRange(fMonth,tMonth,'month'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',CloudCoverages))
    .filterBounds(ExportArea)
    .sort('CLOUD_COVER')
    .map(SetDateInIndividualImage)
    if (RemoveCloudyPixelsCheck.getValue()){
      collection = collection.map(maskS2clouds)
    }
  if (ExcludesDatesTxt.getValue() || ''){
        var ExcludeImages = ExcludesDatesTxt.getValue().split(",")
        for (var a in ExcludeImages) {
          var start_bad_data = ee.Date(ExcludeImages[a].split('-')[2] + '-' + ExcludeImages[a].split('-')[1] + '-' + ExcludeImages[a].split('-')[0])
          var end_bad_data = start_bad_data.advance(1,'day')
          var bad_data_filter = ee.Filter.date(start_bad_data, end_bad_data);
          collection = collection.filter(bad_data_filter.not());
        }
  }
Map.addLayer(ee.Image(1).clip(ExportArea), {palette: ['white']},'',true);
//Map.addLayer(HiranSW,{},'Sub Watershed', false);
//Map.addLayer(ExportArea,{},'Study Area', false);
  if (TypeOfAnalysis===1){
    var diff = tDate.difference(fDate, 'day')
    var range = ee.List.sequence(0, diff.subtract(1)).map(function(day){return fDate.advance(day,'day')})
    var day_mosaics = function(date, newlist) {
      date = ee.Date(date)
      newlist = ee.List(newlist)
      var filtered = collection.filterDate(date, date.advance(1,'day'))
      var image = ee.Image(filtered.mosaic())
      image = image.copyProperties(filtered.first(), ['system:time_start','label', 'CLOUD_COVER'])
      return ee.List(ee.Algorithms.If(filtered.size(), newlist.add(image), newlist))
    }
    MonthlyImages = ee.ImageCollection(ee.List(range.iterate(day_mosaics, ee.List([]))))
  }
  if (TypeOfAnalysis===2){
    var images = ee.List.sequence(0,nMonths).map(function (n) {
    var ini = fDate.advance(n,'month');// calculate the offset from startDate
    var end = ini.advance(1,'month');  // advance just one month
    var image = collection.filterDate(ini,end).median()
    .clip(ExportArea).set('system:time_start', ini);
    image = image.set('count', image.bandNames().length())
    return image.set({ label: ini.format('YYYY-MM') })
    }).flatten();
    MonthlyImages = ee.ImageCollection(images.filter(ee.Filter.eq('count', 16)));
  }
  if (TypeOfAnalysis===3){
    var months = ee.List.sequence(1, 12);
    var byMonth = ee.ImageCollection.fromImages(
        months.map(function (m) {
          var date = ee.Date.fromYMD(2000,m,1)
          return collection.filter(ee.Filter.calendarRange(m, m, 'month')) 
            .median().clip(ExportArea).set('label', date.format('MMM')).set('system:time_start', date); }));
    MonthlyImages = ee.ImageCollection(byMonth.map(SetBandsCounts).filter(ee.Filter.eq('count', 16)));
    //print(MonthlyImages.aggregate_array('label'))
  }
  if (CalBasinAreaCheck.getValue()) {
    var TotalArea = ee.Image.pixelArea().mask(collection.median().select('B1')).divide(1000000);
    TotalArea = TotalArea.reduceRegion({reducer: ee.Reducer.sum(), geometry: ExportArea,
                scale: 10, maxPixels: 3784216672400, }).get('area')
    var Area = TotalArea.getInfo()
    var Area1 = ee.Number(Area).format("%.5f")
    TotalAreaLbl.setValue("Total Study Area (sq km): " + Area1.getInfo())
  }
MonthlyImages = MonthlyImages
    .map(function(image) {
      //https://developers.google.com/earth-engine/ic_composite_mosaic (NDVI & NDWI)
      //B4=Red, B8=NIR
      var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
      image =  image.addBands(ndvi);
      var NDVI_Masked = image.select('NDVI').updateMask(image.select('NDVI').gte(0.2));
      NDVI_Masked = NDVI_Masked.divide(0.2).ceil().rename('Vegetation')
      image = image.addBands(NDVI_Masked)
      image = image.addBands(NDVI_Masked.unmask(0).remap([0,1,2,3,4],[0,1,1,1,1]).rename('NDVI_Probability').clip(ExportArea))
      var MNDVI = image.normalizedDifference(['B9', 'B12']).rename('MNDVI');
      image =  image.addBands(MNDVI);
      var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI');
      image = image.addBands(ndwi)
      //image = image.addBands(ndwi.clip(MaliyaIncludeArea)) //for Maliya
      var NDWI_Masked = image.select('NDWI').updateMask(image.select('NDWI').gt(0));
      NDWI_Masked = NDWI_Masked.divide(0.1).ceil();
      NDWI_Masked = NDWI_Masked.remap([1,2,3,4,5,6,7],[1,2,3,4,4,4,4]).rename('Surface Water')
      image = image.addBands(NDWI_Masked)
      var NDWI_Occurrence = image.select('NDWI').gt(0)
      image = image.addBands(NDWI_Occurrence.rename('Surface Water Occurrence'))
      var NDWI_Masked_Mountain = image.select('B8').updateMask(image.select('B8').lte(650)).rename('Surface Water in Mountain');
      //NDWI_Masked_Mountain = NDWI_Masked_Mountain.divide(0.1).ceil();
      //NDWI_Masked = NDWI_Masked.remap([1,2,3,4,5,6,7],[1,2,3,4,4,4,4]).rename('Surface Water')
      image = image.addBands(NDWI_Masked_Mountain)
      var NDWI_Mountain_Occurrence = image.select('Surface Water in Mountain').gt(0)
      image = image.addBands(NDWI_Mountain_Occurrence.rename('Surface Water Occurrence in Mountain'))      
      NDVI_Masked =  NDVI_Masked.unmask(0).remap([0,1,2,3,4],[0,2,3,4,5])
      //Map.addLayer(NDVI_Masked, {min:1, max:5, palette:'white, white, lime, LimeGreen, green'}, 'Vegetation', false);
      NDWI_Masked =  NDWI_Masked.unmask(0).remap([0,1,2,3,4],[0,6,7,8,9])
      //Map.addLayer(NDWI_Masked, {min:0, max:9, palette:'white, LightSkyBlue, SteelBlue, blue, Navy'}, 'Surface Water', false);
      var NDVI_NDWI_Masked = NDVI_Masked.add(NDWI_Masked).rename('Vegetation & Surface Water')
      image = image.addBands(NDVI_NDWI_Masked.clip(ExportArea))
      var MNDWI = image.normalizedDifference(['B3', 'B12']).rename('MNDWI');
      image = image.addBands(MNDWI)
      var MNDWI_Masked = image.select('MNDWI').updateMask(image.select('MNDWI').gt(0.03));
      MNDWI_Masked = MNDWI_Masked.divide(0.1).ceil();
      MNDWI_Masked = MNDWI_Masked.remap([1,2,3,4,5,6,7],[1,2,3,4,4,4,4]).rename('MNDWI_Masked')
      image = image.addBands(MNDWI_Masked)
      var NDBI = image.normalizedDifference(['B11', 'B8']).rename('NDBI');
      image = image.addBands(NDBI);
       var NDVI_Area = ee.Image.pixelArea().mask(image.select('Vegetation')).divide(1000000).rename('NDVI_Area');
       image = image.addBands(NDVI_Area);
       var NDWI_Area = ee.Image.pixelArea().mask(image.select('Surface Water')).divide(1000000).rename('NDWI_Area');
       image = image.addBands(NDWI_Area);
      var NDSI = image.normalizedDifference(['B3', 'B11']).rename('NDSI');
      image = image.addBands(NDSI);
      var NDSI_Masked = image.select('NDSI').updateMask(image.select('NDSI').gte(-0.1));
      image = image.addBands(NDSI_Masked.divide(0.2).ceil().rename('NDSI_Masked'))
      //-0.1 and +0.2
      return image;
    })
      if (AnimationCheck.getValue()) {    
        var vis = Visualization[SelectMap.getValue()]
        animation.animate(MonthlyImages, {timeStep:500,position: 'bottom-left',vis:vis.visParams ,label: 'label', maxFrames: 100})
      }
//var Images = ee.Algorithms.If(MonthlyImages.size(), MonthlyImages.size(), 0);
var colList = MonthlyImages.toList(MonthlyImages.size());
//print(MonthlyImages.aggregate_array('Date'))
var n = colList.size().getInfo();
var NDVI_Prob
for (var i = 0; i < n; i++) {
  var img = ee.Image(colList.get(i));
  //var month = ee.Date(img.get('system:time_start')).format('MMM').getInfo()
  //Map.addLayer(img, {bands:['B4_median', 'B3_median', 'B2_median'], min:0, max: 2500}, 'TrueColor-' + month ,false);  
  //Map.addLayer(img.select('NDVI'), {min:-0.3, max:1, palette:'Navy, yellow, lime, green'}, 'NDVI-' + month, false);
  //Map.addLayer(img.select('Vegetation'), {min:2, max:4, palette:'lime, LimeGreen, green'}, 'Vegetation-' + month, false);
  //Map.addLayer(img.select('NDWI'), {min:-1, max:1, palette:'LimeGreen, yellow, blue, Navy'}, 'NDWI-' + month, false);
  //Map.addLayer(img.select('Surface Water'), {min:1, max:4, palette:'LightSkyBlue, SteelBlue, blue, Navy'}, 'Water Masked-' + month, false);
  //Map.addLayer(img.select('MNDWI'), {min:-1, max:1, palette:'LimeGreen, yellow, blue, Navy'}, 'MNDWI-' + month, false);
  //Map.addLayer(img.select('MNDWI_Masked'), {min:1, max:4, palette:'LightSkyBlue, SteelBlue, blue, Navy'}, 'M Water Masked-' + month, false);
  //Map.addLayer(img.select('NDBI'), {min:0.01, max:0.2}, 'NDBI-' + month, false);
  var maskedArea = ee.Image.pixelArea().mask(img.select('Vegetation')).divide(1000000);
  maskedArea = maskedArea.reduceRegion({ reducer: ee.Reducer.sum(), geometry: ExportArea,
               scale: 10, maxPixels: 3784216672400, }).get('area')
  NDVI_Areas = NDVI_Areas.add(maskedArea)
  maskedArea = ee.Image.pixelArea().mask(img.select('Surface Water')).divide(1000000);
  maskedArea = maskedArea.reduceRegion({ reducer: ee.Reducer.sum(), geometry: ExportArea,
               scale: 10, maxPixels: 3784216672400, }).get('area')
  NDWI_Areas = NDWI_Areas.add(maskedArea)
}
    NDVI_Areas = NDVI_Areas.splice(0, 1);
    NDWI_Areas = NDWI_Areas.splice(0, 1);
    var lst2 = MonthlyImages.aggregate_array('label')
var Widgets = 26
    if (NDVICheck.getValue()) {
    var NDVI_Chart = ui.Chart.array.values({array: NDVI_Areas, axis: 0, xLabels: lst2})
    .setSeriesNames(['Vegetation Area'])
    .setChartType('ColumnChart')
    .setOptions({title: 'Vegetation Area',
      vAxis: {title: 'Vegetation Area Sq km', maxValue: 1,lineWidth: 1,pointSize: 2,},
      series: {0: {color: 'green'}, 1: {color: '0000FF'}},
      //hAxis: {title: 'Image Number', format: '0', logScale: false, gridlines: {count: 7}},
      pointSize: 3, legend: {position: 'right-top'},});
        MainPanel.widgets().set(Widgets, NDVI_Chart);
    }
    if (NDWICheck.getValue()) {
    var NDWI_Chart = ui.Chart.array.values({array: NDWI_Areas, axis: 0, xLabels: lst2})
    .setSeriesNames(['Water Area'])
    .setChartType('ColumnChart')
    .setOptions({title: 'Surface Water Area',
      vAxis: {title: 'Surface Water Area Sq km', maxValue: 1,lineWidth: 1,pointSize: 2,},
      series: {0: {color: 'blue'}, 1: {color: '0000FF'}},
      //hAxis: {title: 'Image Number', format: '0', logScale: false, gridlines: {count: 7}},
      pointSize: 3, legend: {position: 'right-top'},});
    MainPanel.widgets().set(Widgets+1, NDWI_Chart);
    }
    if (NDIMonthlyCheck.getValue()){
//print(MonthlyImages.select('NDVI_Area','NDWI_Area'))
    var NDVI_NDWI_Chart = ui.Chart.image.series({imageCollection: MonthlyImages.select(NDI_Bands_Selection),
    region: ExportArea, reducer: ee.Reducer.median(), scale: 20
    }).setOptions({title: 'Normalized Difference Index',
      vAxis: {title: 'Median Value', maxValue: 1,lineWidth: 1,pointSize: 2,},
      series: {0: {color: '00FF00'}, 1: {color: '0000FF'}},
      hAxis: {title: 'Date', format: 'dd-MMM-yyyy', logScale: false, gridlines: {count: 7}},
      legend: {position: 'right-top'},});
      MainPanel.widgets().set(Widgets+2, NDVI_NDWI_Chart);
    }
     if (CloudyCoverageCheck.getValue()){
       var getMetadata = function (ImageCollection, Property) {
        return ImageCollection.toList(ImageCollection.size()).map(
          function (i) { return ee.Image(i).get(Property);}
        );};
       var CloudyChart = ui.Chart.array.values(getMetadata(collection,'CLOUDY_PIXEL_PERCENTAGE'), 0,getMetadata(collection,'system:time_start'))
      .setSeriesNames(['% of Cloud'])
      .setOptions({//title: 'Month wise area',
      hAxis: {'title': 'Date'},vAxis: {'title': '{%}'},
      pointSize: 5,});
      MainPanel.widgets().set(Widgets+3, CloudyChart);
     }
    var ColMedian = collection.max().clip(ExportArea)
    var NDVI = ColMedian.normalizedDifference(['B8', 'B4']).rename('NDVI');
    ColMedian = ColMedian.addBands(NDVI)
    var NDVI_Masked = ColMedian.select('NDVI').updateMask(ColMedian.select('NDVI').gte(0.2));
    ColMedian = ColMedian.addBands(NDVI_Masked.divide(0.2).ceil().rename('Vegetation'))
    var NDWI = ColMedian.normalizedDifference(['B3', 'B8']).rename('NDWI');
    ColMedian = ColMedian.addBands(NDWI)
    var NDWI_Masked = ColMedian.select('NDWI').updateMask(ColMedian.select('NDWI').gt(0));
    NDWI_Masked = NDWI_Masked.divide(0.1).ceil();
    NDWI_Masked = NDWI_Masked.remap([1,2,3,4,5,6,7],[1,2,3,4,4,4,4]).rename('Surface Water')
    ColMedian = ColMedian.addBands(NDWI_Masked) 
    //var WaterOccurrence = MonthlyImages.sum().select('Surface Water Occurrence');
    var WaterOccurrence = MonthlyImages.select('Surface Water Occurrence').reduce(ee.Reducer.sum()).rename('Surface Water Occurrence');
    WaterOccurrence = WaterOccurrence.select('Surface Water Occurrence').updateMask(WaterOccurrence.select('Surface Water Occurrence').gt(WaterOccurrenceSlider.getValue()));
    WaterOccurrence_Maksed = WaterOccurrence.divide(MonthlyImages.select('Surface Water Occurrence').size()).multiply(100);
    //var WaterOccurrence_Maksed = WaterOccurrence.select('Surface Water Occurrence').updateMask(WaterOccurrence.select('Surface Water Occurrence').gt(0));
    //var WaterOccurrenceMountain = MonthlyImages.sum().select('Surface Water Occurrence');
    var WaterOccurrenceMountain = MonthlyImages.select('Surface Water Occurrence in Mountain').reduce(ee.Reducer.sum()).rename('Surface Water Occurrence in Mountain');
    WaterOccurrenceMountain = WaterOccurrenceMountain.select('Surface Water Occurrence in Mountain').updateMask(WaterOccurrenceMountain.select('Surface Water Occurrence in Mountain').gt(WaterOccurrenceSlider.getValue()));
    WaterOccurrenceMountain_Masked = WaterOccurrenceMountain.divide(MonthlyImages.select('Surface Water Occurrence in Mountain').size()).multiply(100);
    var SlopeArea = ee.Terrain.slope(SRTM).clip(ExportArea);
    var IncludedArea = SlopeArea.lte(SlopeAngleSlider.getValue())
    var DesiredSlopeArea = IncludedArea.updateMask(IncludedArea.gte(1));
    Map.addLayer(DesiredSlopeArea,{min: 0, max: 1,palette:'white, gray'},'Less Than Desired Slope Area', false);
    Map.addLayer(MonthlyImages.median(),Visualization['Natural/True Color'].visParams, 'Natural/True Color',false);
    //Map.addLayer(MonthlyImages.median(),Visualization['False Color'].visParams, 'False Color' ,false);
    Map.addLayer(MonthlyImages.median(),Visualization['Land & Water Color'].visParams, 'Land & Water Color' ,true);
    //Change for app Map.addLayer(MonthlyImages.median().select('NDVI'), Visualization['NDVI'].visParams, 'NDVI', false);
    //Change for app Map.addLayer(MonthlyImages.median().select('Vegetation'),Visualization['Vegetation'].visParams, 'Vegetation', false);
    Map.addLayer(MonthlyImages.max().select('NDWI'), Visualization['NDWI'].visParams, 'NDWI', false);
    Map.addLayer(MonthlyImages.max().select('Surface Water'), Visualization['Surface Water'].visParams, 'Surface Water', false);
    Map.addLayer(WaterOccurrence_Maksed.select('Surface Water Occurrence'), Visualization['Surface Water Occurrence'].visParams, 'Surface Water Occurrence', false);
       //Change for app Map.addLayer(MonthlyImages.median().select('Vegetation & Surface Water'), Visualization['Vegetation & Surface Water'].visParams, 'Vegetation & Surface Water', false);
    //Change for app Map.addLayer(MonthlyImages.median().select('NDSI'), Visualization['NDSI'].visParams, 'NDSI', false);
    //Change for app Map.addLayer(MonthlyImages.median().select('NDSI_Masked'), Visualization['NDSI_Masked'].visParams, 'NDSI_Masked', false);
    //Map.addLayer(MonthlyImages.median().select('NDBI'), Visualization['NDBI'].visParams, 'NDBI', false);    
    //Map.addLayer(MonthlyImages.median().select('MNDVI'), Visualization['MNDVI'].visParams, 'MNDVI', false);
    var DesiredSlope_Vectors = DesiredSlopeArea.addBands(DesiredSlopeArea).reduceToVectors({
    geometry: ExportArea,crs: DesiredSlopeArea.projection(), scale: 10,
    geometryType: 'polygon', eightConnected: true, labelProperty: 'zone',
    maxPixels: 3784216672400, reducer: ee.Reducer.mean()});
   WaterOccurrence_DesiredSlope = WaterOccurrence_Maksed.select('Surface Water Occurrence').clip(DesiredSlope_Vectors)
    Map.addLayer(WaterOccurrence_DesiredSlope, Visualization['Surface Water Occurrence'].visParams, 'Surface Water Occurrence within Desired Slope', false);
    WaterOccurrence_DesiredSlope = ee.Image().byte().unmask(0).updateMask(WaterOccurrence_DesiredSlope)
  PossibleGlacialLakesVectors = WaterOccurrence_DesiredSlope.addBands(WaterOccurrence_DesiredSlope).reduceToVectors({
  geometry: ExportArea,crs: WaterOccurrence_DesiredSlope.projection(),
  scale: 10,geometryType: 'polygon',eightConnected: false,
  labelProperty: 'zone',maxPixels: 3784216672400,reducer: ee.Reducer.mean()});
    var FeatureAreaCalculation = function(feature) {
      var fea = feature //.buffer(11).buffer(-11)
      var area = fea.geometry().area(ee.ErrorMargin(1)).divide(1000 * 1000);
      return fea.set('AreaSqKm', area);
    };
    PossibleGlacialLakesVectors = PossibleGlacialLakesVectors.map(FeatureAreaCalculation);
    PossibleGlacialLakesVectors = PossibleGlacialLakesVectors.filter(ee.Filter.gte('AreaSqKm',GLakeSizeSlider.getValue() / 1000000));
    var empty = ee.Image().byte();
    //Map.addLayer(PossibleGlacialLakesVectors,{color:'blue'},'Possible Waterbodies', false,0.3);
    Map.addLayer(empty.paint({featureCollection: PossibleGlacialLakesVectors,color: 'Color',width: 2}),
      {palette: ['FF0000', '00FF00', 'FFE947'], max: 10}, 'Possible Waterbodies', false);
    //var B8_WaterMask = MonthlyImages.median().select('B8').updateMask(MonthlyImages.median().select('B8').lte(650));
    Map.addLayer(MonthlyImages.max().select('Surface Water in Mountain'), Visualization['Surface Water in Mountain'].visParams, 'Surface Water in Mountain', false);
    Map.addLayer(WaterOccurrenceMountain_Masked.select('Surface Water Occurrence in Mountain'), Visualization['Surface Water Occurrence in Mountain'].visParams, 'Surface Water Occurrence in Mountain', false);
    //Map.addLayer(B8_WaterMask, {min:0, max:650, palette:'Navy,blue,SteelBlue,LightSkyBlue'}, 'B8_WaterMask', true);
    var WaterOccurrenceMountain_Masked1 = WaterOccurrenceMountain_Masked.select('Surface Water Occurrence in Mountain').clip(DesiredSlope_Vectors)
    Map.addLayer(WaterOccurrenceMountain_Masked1, Visualization['Surface Water Occurrence in Mountain'].visParams, 'Surface Water Occurrence within Desired Slope in Mountain', true);
    WaterOccurrenceMountain_Masked1 = ee.Image().byte().unmask(0).updateMask(WaterOccurrenceMountain_Masked1)
    var WaterOccurrenceMountain_MaskedVectors = WaterOccurrenceMountain_Masked1.addBands(WaterOccurrenceMountain_Masked1).reduceToVectors({
    geometry: DesiredSlope_Vectors,crs: WaterOccurrenceMountain_Masked1.projection(),
    scale: 10,geometryType: 'polygon',eightConnected: false,
    labelProperty: 'zone',maxPixels: 3784216672400,reducer: ee.Reducer.mean()});
    WaterOccurrenceMountain_MaskedVectors = WaterOccurrenceMountain_MaskedVectors.map(FeatureAreaCalculation);
    PossibleGlacialLakesMountainVectors = WaterOccurrenceMountain_MaskedVectors.filter(ee.Filter.gte('AreaSqKm',GLakeSizeSlider.getValue() / 1000000));
    Map.addLayer(empty.paint({featureCollection: PossibleGlacialLakesMountainVectors,color: 'Color',width: 2}),
      {palette: ['FF0000', '00FF00', 'FFE947'], max: 10}, 'Possible Glacial Lakes', true);
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '300x15',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 22px'},
  });
}
function makeLegend(lowLine, midLine, highLine,lowText, midText, highText, palette) {
  var  labelheader = ui.Label('Water occurrence during investigation period',{margin: '5px 17px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold'});
  var labelLines = ui.Panel(
      [
        ui.Label(lowLine, {margin: '-4px 21px'}),
        ui.Label(midLine, {margin: '-4px 0px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(highLine, {margin: '-4px 21px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
      var labelPanel = ui.Panel(
      [
        ui.Label(lowText, {margin: '0px 14.5px'}),
        ui.Label(midText, {margin: '0px 0px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(highText, {margin: '0px 1px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
    return ui.Panel({
      widgets: [labelheader, ColorBar(palette), labelLines, labelPanel], 
      style: {position:'bottom-right'}});
}
//Map.add(makeLegend('|', '|', '|', "0 %", '50 %', '100%', ['LightSkyBlue', 'SteelBlue', 'blue', 'Navy']));
      var timelapse = {
        bands: ['B4', 'B3', 'B2'],
        region: ExportArea,
        gamma: 0.9,
        min: 0,
        max: 2500,
        property: 'label',
        framesPerSecond: 1};
      var AnimationThumb = ui.Thumbnail({
        image: MonthlyImages, params: timelapse,
        style: {
          position: 'bottom-left',
          width: '360px',
        }});
      MainPanel.widgets().set(Widgets+4, AnimationThumb);
      //MainPanel.add(AnimationThumb);
      //Map.add(AnimationThumb);
      var rgbVis = MonthlyImages.select('B4', 'B3', 'B2').map(function(img) {
        return img.visualize({gamma: 0.9, min: 0, max: 2500}).clip(ExportArea);
      });
      var gifParams = {
        'region': ExportArea,//dx.geometry(),//gaia.geometry(),
        'dimensions': 1000,
        'crs': 'EPSG:4326',
        'framesPerSecond': 1};
      print(rgbVis.getVideoThumbURL(gifParams));  
  var histogram = ui.Chart.image.histogram({
  image: MonthlyImages.median().select('Vegetation').clip(ExportArea),
  region: ExportArea,scale: 10,minBucketWidth: 1,});
  histogram.setOptions({title: 'Chart Value'});
  //print(histogram);
 if (ElevationCheck.getValue()){
    var BufferFeature = function(f) {
      f = ee.Feature(f);
      var buffer_size = f.get('buffer_size');
      return f.buffer(buffer_size).bounds();   
    };
    var BufferFeaturesByDistance = function (fc, buffer_size) {
      var SetBufferSize = function(f) {
        return f.set({'buffer_size': buffer_size});
      };
      return fc.map(SetBufferSize).map(BufferFeature);
    };
    //var ExportAreaBuffer = BufferFeaturesByDistance(ExportArea, 100);
    SRTM = SRTM.clip(ExportArea)
    var SRTM_Min = SRTM.reduceRegion({reducer: ee.Reducer.min(), geometry: ExportArea,scale: 200}).get('elevation');
    var SRTM_Min1 = ee.Number(SRTM_Min).format("%.1f")
    var SRTM_Min2 = ee.Number.parse(SRTM_Min1.getInfo()) 
    var MinElevation = SRTM_Min2.getInfo()
    MinElevLbl.setValue("Minimum Elevation: " + MinElevation)
    var SRTM_Mean = SRTM.reduceRegion({reducer: ee.Reducer.mean(), geometry: ExportArea,scale: 200}).get('elevation');
    var SRTM_Mean1 = ee.Number(SRTM_Mean).format("%.1f")
    var SRTM_Mean2 = ee.Number.parse(SRTM_Mean1.getInfo()) 
    var MeanElevation = SRTM_Mean2.getInfo()
    MeanElevLbl.setValue("Mean Elevation: " + MeanElevation)
    var SRTM_Max = SRTM.reduceRegion({reducer: ee.Reducer.max(), geometry: ExportArea,scale: 200}).get('elevation');
    var SRTM_Max1 = ee.Number(SRTM_Max).format("%.1f")
    var SRTM_Max2 = ee.Number.parse(SRTM_Max1.getInfo())
    var MaxElevation = SRTM_Max2.getInfo()
    MaxElevLbl.setValue("Maximum Elevation: " + MaxElevation)    
    //Map.addLayer(SRTM, {min: MinElevation, max: MaxElevation, palette: ['blue', 'green','yellow','red','white']},'Elevation',true);
    var HillShade = ee.Terrain.hillshade(SRTM);
    //Map.addLayer(HillShade, {min:0, max:255,}, 'Hillshade', true, 0.35);
    var Slope = ee.Terrain.slope(SRTM);
    //Map.addLayer(Slope, {min:0, max:60, pallete: ['FFFFFF']},'Slope',false);
    var Aspect = ee.Terrain.aspect(SRTM);
    // Convert to radians, compute the sin of the aspect.
    var sinImage = Aspect.divide(180).multiply(Math.PI).sin();
    //Map.addLayer(sinImage, {min: -1, max: 1}, 'Aspect', false);
    var ElevationDiff = ee.Number(MaxElevation).subtract(ee.Number(MinElevation)).getInfo();
    var CountourInterval = 1;
     if (ElevationDiff < 10) {
      CountourInterval = 1;
    } else if (ElevationDiff < 25) {
      CountourInterval = 2.5;
    } else if (ElevationDiff < 50) {
      CountourInterval = 5;
    } else if (ElevationDiff < 100) {
      CountourInterval = 10;
    } else if (ElevationDiff < 250) {
      CountourInterval = 25;
    } else if (ElevationDiff < 500) {
      CountourInterval = 50;
    } else if (ElevationDiff < 1000) {
      CountourInterval = 100;
    } else if (ElevationDiff < 2000) {
      CountourInterval = 200;
    } else {
      CountourInterval = 300;
    }
    CountourIntervalLbl.setValue("Countour Interval: " + CountourInterval);
    var lines = ee.List.sequence(MinElevation, MaxElevation,CountourInterval)
    var SRTMContour = lines.map(function(line) {
      var mycontour = SRTM
        .convolve(ee.Kernel.gaussian(5, 3))
        .subtract(ee.Image.constant(line)).zeroCrossing() 
        .multiply(ee.Image.constant(line)).toFloat();
      return mycontour.mask(mycontour);
    });
    SRTMContour = ee.ImageCollection(SRTMContour).mosaic()
    Map.addLayer(SRTMContour, {min: MinElevation, max: MaxElevation,  palette: ['00ff00', 'green','yellow','red']}, 'Contours',false)
      var DEM_normalized = SRTM.subtract(MinElevation).divide(MaxElevation-MinElevation);
      // hue from green for low elevations via yellow to red for high elevations:
      var palettes = require('users/gena/packages:palettes')
      var DEM_styled = SRTM.visualize({ min: MinElevation, max: MaxElevation, palette: palettes.cb.BrBG[11] }).unitScale(0, 255)
      var terrain = DEM_styled.rgbToHsv().addBands(HillShade.divide(256).rename('value'), ['value'], true).hsvToRgb()
      terrain = terrain.visualize().blend(SRTMContour.visualize({palette: ['000000'], opacity: 0.5}));
      Map.addLayer(terrain,{}, 'Mountain Terrain View', false);       
   }
  WaitMessage.setValue('');
  }
});
MainPanel.add(ui.Panel([ui.Label({value: 'Image for Animation: '}),SelectMap], ui.Panel.Layout.flow('horizontal')));
var WaitMessage = ui.Label({value: '',style: { color:'red',fontSize:'20px' ,width: '160px'}});
MainPanel.add(ui.Label('3. Click button and Wait for chart/map to render.'));
MainPanel.add(ui.Panel([button,WaitMessage], ui.Panel.Layout.flow('horizontal')));
var ExportData;
var ExportTypeData = ui.Select({
  placeholder: 'Choose Analysis Type...',
  items: [
    {label: 'Single Composite/Mosaic Image selected for Animation', value: 1},
    {label: 'Each Composite/Mosaic image selected for Animation', value: 2},
    //{label: 'Video (If Animation Tick Mark)', value: 3},    
    //{label: 'Digital Elevation Model', value: 4},
    //{label: 'Surface Water Occurrence within Desired Slope', value: 5},
    {label: 'Possible Waterbodies - KML', value: 6},
    {label: 'Possible Glacial Lakes - KML', value: 7},
  ],
  onChange: function(value) {
  ExportData = value
  }
});
ExportTypeData.setValue(1,true);
MainPanel.add(ui.Label('4. Once analysis is performed successfully, click button to export image and wait for download link.'))
var pnlExportTypeData = ui.Panel([ui.Label('Download'), ExportTypeData], ui.Panel.Layout.flow('horizontal'));
MainPanel.add(pnlExportTypeData);
//var DownloadResolutionTxt = ui.Textbox({value: '10',style: {width: '50px'}});
var DownloadResolutionSlider = ui.Slider({min: 10,max: 100,value: 10,step: 1,style: {width: '300px'}});
var pnlDownloadResolution = ui.Panel([ui.Label('Download Image Resolution (m): '), DownloadResolutionSlider]);
MainPanel.add(pnlDownloadResolution);
var ExportButton = ui.Button({
  label: 'Export Data',
  disabled: true,
  onClick: function() {
  var vis = Visualization[SelectMap.getValue()]
  var bnd = vis.visParams['bands']
  ExportButton.setDisabled(true);
  ExportRefButton.setDisabled(false);
  var DownloadPanel = ui.Panel({
  style:
      {height: '200px', width: '270px', position: 'bottom-right', shown: true}
});
  Map.add(DownloadPanel);
  DownloadPanel.widgets().reset();
  DownloadPanel.style().set('shown', true);
  //var DownloadResolutionValue = ee.Number.parse(DownloadResolutionTxt.getValue())
  if (ExportData===1){
    var ExportImg = MonthlyImages.median().clip(ExportArea).select(bnd)
    if (SelectMap.getValue()==='Surface Water Occurrence'){
      ExportImg = WaterOccurrence_Maksed.select(SelectMap.getValue())
    }
    if (SelectMap.getValue()==='Surface Water Occurrence in Mountain'){
      ExportImg = WaterOccurrenceMountain_Masked.select(SelectMap.getValue())
    }
    ExportImg = ExportImg.unmask(0)
    //Export.image.toDrive({image:ExportImg ,fileNamePrefix: SelectMap.getValue() , folder: 'PLK',
    //description: SelectMap.getValue().replace(' ',''),scale: 10,region:ExportArea,maxPixels: 3784216672400,});
    //Resolution Maliya-40,PLK-10
    var Download_Image = ui.Label('Error: Less than 125 km2 area allowed to download 10m resolution the Natural/True, False and Land&Water color imagery while 350 km2 for others. Solution: Either reduce AOI or reduce download image resolution.')
    DownloadPanel.add(Download_Image)
    var Download_Image = ui.Label(SelectMap.getValue()).setUrl(ExportImg.getDownloadURL({
    image: ExportImg.serialize(),scale: DownloadResolutionSlider.getValue(), name:SelectMap.getValue(), filename: SelectMap.getValue(),
    filePerBand: false, region: ExportArea})) //ExportArea.geometry()
    //DownloadPanel.widgets().set(0, Download_Image);
    DownloadPanel.widgets().reset();
    DownloadPanel.style().set('shown', true);
    DownloadPanel.add(Download_Image);
  }
  if (ExportData===2){
    var Download_Image = ui.Label('Error: Less than 125 km2 area allowed to download the True, False and Land&Water color imagery while 350 km2 for others. Clear the defined area and redraw it with less size.')
    DownloadPanel.add(Download_Image)
    var colList = MonthlyImages.toList(MonthlyImages.size());
    var n = colList.size().getInfo();
      for (var i = 0; i < n; i++) {
      var img = ee.Image(colList.get(i));
      img = img.unmask(0)
      var month = ee.Date(img.get('system:time_start')).format('yyyyMMdd').getInfo()
      var FileName = SelectMap.getValue() + '-' + month
        Export.image.toDrive({image: img.select(bnd),fileNamePrefix: FileName, folder: 'Ishkashim',
        description: SelectMap.getValue() + month,scale: DownloadResolutionSlider.getValue(), region:ExportArea, maxPixels: 3784216672400,});
      var imageLabel = ui.Label(FileName);
      imageLabel.setValue('Error: Less than 125 km2 area allowed to download the 10 m resolution image')
      //Resolution Maliya-40&20,PLK-25&15
      if (SelectMap.getValue()==='Natural/True Color' || SelectMap.getValue()==='False Color' || SelectMap.getValue()==='Land & Water Color' || SelectMap.getValue()==='NDVI' || SelectMap.getValue()==='NDWI'){
        imageLabel.setUrl(img.select(bnd).getDownloadURL({image: img.select(bnd).serialize(),scale: DownloadResolutionSlider.getValue(), 
          name: FileName, filename: FileName,filePerBand: false, region: ExportArea})) //ExportArea.geometry()
      }
      if  (SelectMap.getValue()==='Vegetation' || SelectMap.getValue()==='Surface Water' || SelectMap.getValue()==='Vegetation & Surface Water'){
            imageLabel.setUrl(img.select(bnd).getDownloadURL({image: img.select(bnd).serialize(),scale: DownloadResolutionSlider.getValue(), 
              name: FileName, filename: FileName,filePerBand: false, region: ExportArea})) //ExportArea.geometry()
      }
      imageLabel.setValue('Download ' + FileName)
      DownloadPanel.add(imageLabel);
      }
      DownloadPanel.remove(Download_Image)
  }
  if (ExportData===3){
        var ndvi_video =  MonthlyImages.select(bnd).map(function(image){
        var label =  image.get('label') //start.format('YYYY-MM-dd').cat(' - ').cat(end.format('YYYY-MM-dd'))
        return image.visualize(vis.visParams).clip(ExportArea).set({label: label});
    });
      var annotations = [{position:'left', offset:'1%', margin:'1%', property: 'label', scale: Map.getScale() *1.5}]
    ndvi_video = ndvi_video.map(function(image) {
      return text.annotateImage(image, {}, ExportArea, annotations)})
      Export.video.toDrive({  
      collection: ndvi_video,description: SelectMap.getValue().replace('_','').replace(' ',''),framesPerSecond: 1,// I.e., 1 year / second
      fileNamePrefix: SelectMap.getValue() ,folder: 'Sentinel',region: ExportArea, scale: 10,});
  }
  if (ExportData===4){
    SRTM = SRTM.clip(ExportArea)
    Export.image.toDrive({image: SRTM,fileNamePrefix: 'SRTM DEM-' ,folder: 'Sentinel',
    description: 'SRTMdem', scale: 30,region:ExportArea,maxPixels: 3784216672400,});
    //var SRTM_Vectors = contourlines.addBands(contourlines).reduceToVectors({
    //geometry: ExportArea,crs: contourlines.projection(), scale: 10,
    //geometryType: 'polygon', eightConnected: true, labelProperty: 'zone',
    //maxPixels: 3784216672400, reducer: ee.Reducer.mean()});
    //Export.table.toDrive({collection: SRTM_Vectors,fileNamePrefix: 'SRTM Contour',folder: 'Sentinel',
    //description:'SRTMContour',fileFormat: 'SHP'}); 
  }
  if (ExportData===5){
    var Download_Image = ui.Label('Error: Less than 125 km2 area allowed to download 10m resolution the Natural/True, False and Land&Water color imagery while 350 km2 for others. Solution: Either reduce AOI or reduce download image resolution.')
    DownloadPanel.add(Download_Image)
    var Download_Image = ui.Label('Surface Water Occurrence within Desired Slope').setUrl(WaterOccurrence_DesiredSlope.getDownloadURL({
    image: WaterOccurrence_DesiredSlope.serialize(),scale: DownloadResolutionSlider.getValue(), name:'SurfaceWaterOccurrenceWithinDesiredSlope', filename: 'SurfaceWaterOccurrenceWithinDesiredSlope',
    filePerBand: false, region: ExportArea})) //ExportArea.geometry()
    //DownloadPanel.widgets().set(0, Download_Image);
    DownloadPanel.widgets().reset();
    DownloadPanel.style().set('shown', true);
    DownloadPanel.add(Download_Image);
  }
  if (ExportData===6){
    var Download_Image = ui.Label('Error: Less than 125 km2 area allowed to download 10m resolution the Natural/True, False and Land&Water color imagery while 350 km2 for others. Solution: Either reduce AOI or reduce download image resolution.')
    DownloadPanel.add(Download_Image)
    var Download_Image = ui.Label('Possible Waterbodies').setUrl(ee.FeatureCollection(PossibleGlacialLakesVectors).getDownloadURL({
    format: 'kml',filename: 'Possible Waterbodies - KML'})) //ExportArea.geometry()
    //DownloadPanel.widgets().set(0, Download_Image);
    DownloadPanel.widgets().reset();
    DownloadPanel.style().set('shown', true);
    DownloadPanel.add(Download_Image);
  }
  if (ExportData===7){
    var Download_Image = ui.Label('Error: Less than 125 km2 area allowed to download 10m resolution the Natural/True, False and Land&Water color imagery while 350 km2 for others. Solution: Either reduce AOI or reduce download image resolution.')
    DownloadPanel.add(Download_Image)
    var Download_Image = ui.Label('Possible Glacial Lakes - KML').setUrl(ee.FeatureCollection(PossibleGlacialLakesMountainVectors).getDownloadURL({
    format: 'kml',filename: 'Possible Glacial Lakes - KML'})) //ExportArea.geometry()
    //DownloadPanel.widgets().set(0, Download_Image);
    DownloadPanel.widgets().reset();
    DownloadPanel.style().set('shown', true);
    DownloadPanel.add(Download_Image);
  }  
  //Export.image.toDrive({image: img.select('B4', 'B3', 'B2'),fileNamePrefix: 'NaturalColors_' + month, folder: 'Sentinel',
  //description: 'NaturalColors' + month,scale: 10,region:ExportArea,maxPixels: 3784216672400,});
  //Export.image.toDrive({image: img.select('NDVI'),fileNamePrefix: 'NDVI_' + month,folder: 'Sentinel',
  //description: 'NDVI' + month, scale: 10,region:ExportArea,maxPixels: 3784216672400,});
  //Export.image.toDrive({image: img.select('Vegetation'),fileNamePrefix: 'Vegetation_' + month,folder: 'Sentinel',
  //description: 'NDVImasked' + month, scale: 10,region:ExportArea,maxPixels: 3784216672400,});
  //Export.image.toDrive({image: img.select('NDWI'),fileNamePrefix: 'NDWI_' + month,folder: 'Sentinel',
  //description: 'NDWI' + month, scale: 10,region:ExportArea,maxPixels: 3784216672400,});
  //Export.image.toDrive({image: img.select('Surface Water'),fileNamePrefix: 'NDWI_Masked_' + month,folder: 'Sentinel',
  //description: 'NDWImasked' + month, scale: 10,region:ExportArea,maxPixels: 3784216672400,});
//var Elevation = ui.Label('Elevation (Min / Mean / Max: ' 
  //+ ee.Number(SRTM_Min.get('elevation').getInfo()).format("%.1f") );
}})
//ExportButton.setDisabled(true)
var ExportRefButton = ui.Button({
  label: 'Refresh',
  disabled: true,
  onClick: function() {
      Map.widgets().reset();
      ExportButton.setDisabled(false);
      ExportRefButton.setDisabled(true);
  }})
  ExportRefButton.setDisabled(true);
var pnlExportButton = ui.Panel([ExportButton, ExportRefButton], ui.Panel.Layout.flow('horizontal'));
MainPanel.add(pnlExportButton);
var TotalAreaLbl = ui.Label({value: ''});
MainPanel.add(TotalAreaLbl); // Total Area
var MinElevLbl = ui.Label({value: ''});
MainPanel.add(MinElevLbl); // Min Elevation
var MeanElevLbl = ui.Label({value: ''});
MainPanel.add(MeanElevLbl); // Mean Elevation
var MaxElevLbl = ui.Label({value: ''});
MainPanel.add(MaxElevLbl); // Max Elevation
var CountourIntervalLbl = ui.Label({value: ''});
MainPanel.add(CountourIntervalLbl); // Countour Interval
MainPanel.add(ui.Label('')); // NDIChart
MainPanel.add(ui.Label('')); // NDVI_Chart
MainPanel.add(ui.Label('')); //NDWI_Chart
MainPanel.add(ui.Label('')); //NDVI_NDWI_Chart
MainPanel.add(ui.Label(''));//CloudyChart
MainPanel.add(ui.Label(''));//AnimationThumb
ui.root.insert(0, MainPanel);
//ee.Number(n).format("%.2f")
//https://code.earthengine.google.com/a966ced8ad3f060a5e7ac6660a44f1bb
//var filtered = collectionLS7NDVI0.filter(ee.Filter.date('2005', '2006').not());
//https://code.earthengine.google.com/bb2f654d443d70a91fa89c8fb3cf601d
//print(MonthlyImages.aggregate_array('label'))
// var keepProperties = ['PATH', 'ROW', 'CLOUD_COVER'];
  //.copyProperties(image, keepProperties)
  //https://geohackweek.github.io/GoogleEarthEngine/03-load-imagery/
  //https://medium.com/google-earth/making-it-easier-to-reuse-code-with-earth-engine-script-modules-2e93f49abb13
  //https://www.youtube.com/watch?reload=9&v=Yn_i5kNk-NI
  //https://github.com/sacridini/GEET/blob/master/geet.js
  ////https://custom-scripts.sentinel-hub.com/custom-scripts/sentinel-2/indexdb/