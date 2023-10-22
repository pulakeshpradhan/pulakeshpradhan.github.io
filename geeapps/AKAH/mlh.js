var PLK = ui.import && ui.import("PLK", "table", {
      "id": "users/AKAH/PLK/PLK_New20200921"
    }) || ee.FeatureCollection("users/AKAH/PLK/PLK_New20200921"),
    MaliyaTown = ui.import && ui.import("MaliyaTown", "table", {
      "id": "users/AKAH/MaliyaHatina/Town"
    }) || ee.FeatureCollection("users/AKAH/MaliyaHatina/Town"),
    MaliyaTaluka = ui.import && ui.import("MaliyaTaluka", "table", {
      "id": "users/AKAH/MaliyaHatina/Taluka"
    }) || ee.FeatureCollection("users/AKAH/MaliyaHatina/Taluka"),
    MaliyaIncludeArea = ui.import && ui.import("MaliyaIncludeArea", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                70.23906524972038,
                21.008287284288727
              ],
              [
                70.24318512276726,
                21.004601470321294
              ],
              [
                70.24685438469963,
                21.001636727803717
              ],
              [
                70.24987991646843,
                20.998972415703115
              ],
              [
                70.25110300377922,
                20.997750422064758
              ],
              [
                70.25792654351311,
                20.999954009904897
              ],
              [
                70.2935087446066,
                21.007189619990353
              ],
              [
                70.38311598337613,
                21.012317595246728
              ],
              [
                70.44285414255582,
                21.031545932150873
              ],
              [
                70.51117537058316,
                21.068713680682617
              ],
              [
                70.52765486277066,
                21.143661727317014
              ],
              [
                70.53452131784879,
                21.19872758522099
              ],
              [
                70.51048872507535,
                21.237773490468353
              ],
              [
                70.39581892527066,
                21.288325771494343
              ],
              [
                70.31960127390347,
                21.274249665059653
              ],
              [
                70.24613020456754,
                21.24417347262184
              ],
              [
                70.19119856394254,
                21.216651578461597
              ],
              [
                70.16647932566129,
                21.124447887879814
              ],
              [
                70.17550224186863,
                21.085353994209267
              ],
              [
                70.18417114140476,
                21.061246773737448
              ],
              [
                70.19738906743015,
                21.04722915172677
              ],
              [
                70.20974868657078,
                21.034652219076047
              ],
              [
                70.23300880314792,
                21.012940493577204
              ],
              [
                70.23669952275242,
                21.009735543080776
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[70.23906524972038, 21.008287284288727],
          [70.24318512276726, 21.004601470321294],
          [70.24685438469963, 21.001636727803717],
          [70.24987991646843, 20.998972415703115],
          [70.25110300377922, 20.997750422064758],
          [70.25792654351311, 20.999954009904897],
          [70.2935087446066, 21.007189619990353],
          [70.38311598337613, 21.012317595246728],
          [70.44285414255582, 21.031545932150873],
          [70.51117537058316, 21.068713680682617],
          [70.52765486277066, 21.143661727317014],
          [70.53452131784879, 21.19872758522099],
          [70.51048872507535, 21.237773490468353],
          [70.39581892527066, 21.288325771494343],
          [70.31960127390347, 21.274249665059653],
          [70.24613020456754, 21.24417347262184],
          [70.19119856394254, 21.216651578461597],
          [70.16647932566129, 21.124447887879814],
          [70.17550224186863, 21.085353994209267],
          [70.18417114140476, 21.061246773737448],
          [70.19738906743015, 21.04722915172677],
          [70.20974868657078, 21.034652219076047],
          [70.23300880314792, 21.012940493577204],
          [70.23669952275242, 21.009735543080776]]]),
    Ishkashim = ui.import && ui.import("Ishkashim", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                71.5453198088512,
                36.775915512385765
              ],
              [
                71.53708006275745,
                36.75803870640613
              ],
              [
                71.53416254826782,
                36.74607142749262
              ],
              [
                71.53373302179378,
                36.73761179346631
              ],
              [
                71.53296018971058,
                36.729151986325505
              ],
              [
                71.53398983139218,
                36.72048346119736
              ],
              [
                71.5284969939098,
                36.71181473593054
              ],
              [
                71.46652790842373,
                36.67065645971738
              ],
              [
                71.49519468678089,
                36.64628314985293
              ],
              [
                71.5508129729137,
                36.67465030989913
              ],
              [
                71.57450224293324,
                36.685113224144395
              ],
              [
                71.59321391793416,
                36.680709672903454
              ],
              [
                71.60548759069053,
                36.67933251465969
              ],
              [
                71.61535765064808,
                36.679881944911266
              ],
              [
                71.63252378834339,
                36.68263529412118
              ],
              [
                71.64728666676136,
                36.68814169686845
              ],
              [
                71.65827299488636,
                36.70493379017151
              ],
              [
                71.64728666676136,
                36.71704384261801
              ],
              [
                71.63115049732777,
                36.73135326190968
              ],
              [
                71.61227302188662,
                36.74256385793611
              ],
              [
                71.59339114454218,
                36.756248014622415
              ],
              [
                71.58171202076527,
                36.78086527560584
              ],
              [
                71.56969572437855,
                36.78911417063438
              ],
              [
                71.55939604176136,
                36.7893891185092
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[71.5453198088512, 36.775915512385765],
          [71.53708006275745, 36.75803870640613],
          [71.53416254826782, 36.74607142749262],
          [71.53373302179378, 36.73761179346631],
          [71.53296018971058, 36.729151986325505],
          [71.53398983139218, 36.72048346119736],
          [71.5284969939098, 36.71181473593054],
          [71.46652790842373, 36.67065645971738],
          [71.49519468678089, 36.64628314985293],
          [71.5508129729137, 36.67465030989913],
          [71.57450224293324, 36.685113224144395],
          [71.59321391793416, 36.680709672903454],
          [71.60548759069053, 36.67933251465969],
          [71.61535765064808, 36.679881944911266],
          [71.63252378834339, 36.68263529412118],
          [71.64728666676136, 36.68814169686845],
          [71.65827299488636, 36.70493379017151],
          [71.64728666676136, 36.71704384261801],
          [71.63115049732777, 36.73135326190968],
          [71.61227302188662, 36.74256385793611],
          [71.59339114454218, 36.756248014622415],
          [71.58171202076527, 36.78086527560584],
          [71.56969572437855, 36.78911417063438],
          [71.55939604176136, 36.7893891185092]]]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/AKAH/Temp/Ishkashim"
    }) || ee.FeatureCollection("users/AKAH/Temp/Ishkashim");
Map.setCenter(70.309,21.159,1)
Map.setOptions('HYBRID')
var ExportArea = MaliyaTaluka //PLK.filter(ee.Filter.eq('Name', 'D6')).geometry() //Map.setCenter(57,30,3)
Map.centerObject(ExportArea)
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
  return image.updateMask(mask).clip(ExportArea)
  .set({ label: ee.Date(image.get('system:time_start')).format('dd-MM-yyyy')})
  //.copyProperties(image, ['system:time_start', 'CLOUD_COVER'])
}
var MainPanel = ui.Panel();
MainPanel.style().set('width', '22%');
//var intro = ui.Panel([ui.Label({value: 'Water & Vegetation Monitoring',style: {fontSize: '20px', fontWeight: 'bold'}})]);
//MainPanel.add(intro);
var frmDateLbl = ui.Label({value: 'From Date:',style: { width: '75px'}});
var toDateLbl = ui.Label({value: 'To Date:',style: { width: '75px'}});
var frmDate = ui.Textbox({placeholder: 'yyyy-MM-dd',value: '2020-1-1',style: { width: '90px'}});
var ToDate = ui.Textbox({placeholder: 'yyyy-MM-dd',value: '2020-12-31',style: { width: '90px'}});
MainPanel.add(ui.Panel([frmDateLbl, frmDate], ui.Panel.Layout.flow('horizontal')));
MainPanel.add(ui.Panel([toDateLbl, ToDate], ui.Panel.Layout.flow('horizontal')));
var CloudCoverageLbl = ui.Label({value: 'Max Cloud Coverage (%):',style: { width: '160px'}});
var CloudCoverageTxt = ui.Textbox({placeholder: 'Between 0 to 100',value: '10',style: { width: '60px'}});
MainPanel.add(ui.Panel([CloudCoverageLbl, CloudCoverageTxt], ui.Panel.Layout.flow('horizontal')));
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
var CloudyCoverageCheck = ui.Checkbox('Cloud Coverage Chart').setValue(true);
MainPanel.add(CloudyCoverageCheck);
var NDIMonthlyCheck = ui.Checkbox('Normalized Difference Index Chart').setValue(false);
MainPanel.add(NDIMonthlyCheck);
var NDVICheck = ui.Checkbox('Vegitation Area Chart').setValue(false);
MainPanel.add(NDVICheck);
var NDWICheck = ui.Checkbox('Surface Water Area Chart').setValue(false);
MainPanel.add(NDWICheck);
var CalBasinAreaCheck = ui.Checkbox('Calculate Defined Area: ').setValue(false);
MainPanel.add(CalBasinAreaCheck);
var ElevationCheck = ui.Checkbox('Add Elevation Map: ').setValue(false);
MainPanel.add(ElevationCheck);
var Visualization = {
    'Natural/True Color': {description: '',
      visParams: {gamma: 0.9, min: 0, max: 2500, bands: ['B4', 'B3', 'B2']}
    },'False Color': {description: '',
      visParams: {gamma: 0.9, min: 0, max: 2500, bands: ['B8','B4','B3']}
    },'Land & Water Color': {description: '',
      visParams: {gamma: 0.9, min: 0, max: 2500, bands: ['B8', 'B11', 'B4']}
    }, 'NDVI': {description: '',
      visParams: {min:-1, max:1,palette:'blue, white, lime, green', bands: ['NDVI']}
    }, 'Vegetation': {description: '',
      visParams: {min:2, max:4, palette:'lime, LimeGreen, green', bands: ['Vegetation']}
    //}, 'MNDVI': {description: '',
      //visParams: {min:-1, max:1, palette:'blue, white, lime, LimeGreen, green', bands: ['MNDVI']}
    }, 'NDWI': {description: '', 
      visParams: {min:-1, max:1, palette:'green, LimeGreen, white, blue, Navy', bands: ['NDWI']}
    }, 'Surface Water': {description: '',
      visParams: {min:1, max:4, palette:'LightSkyBlue, SteelBlue, blue, Navy', bands: ['Surface Water']}
    //}, 'MNDWI': {description: '',
    //  visParams: {min:-1, max:1, palette:'LimeGreen, yellow, blue, Navy', bands: ['MNDWI']}
    //}, 'MNDWI_Masked': {description: '',
      //visParams: {min:1, max:4, palette:'LightSkyBlue, SteelBlue, blue, Navy', bands: ['MNDWI_Masked']}
    }, 'Vegetation & Surface Water': {description: '',
      visParams: {min:1, max:9, palette:'white, white, lime, LimeGreen, green, LightSkyBlue, SteelBlue, blue, Navy', bands: ['Vegetation & Surface Water']}
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
var AnimationCheck = ui.Checkbox('Create Animation').setValue(false);
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
var button = ui.Button({
  label: 'Perform Analysis...',
  onClick: function() {
  WaitMessage.setValue('Processing...')
  ExportButton.setDisabled(false);
//Map.style().set('cursor', 'crosshair');
    Map.layers().reset();
NDVI_Areas = ee.List.sequence(0,0);
NDWI_Areas = ee.List.sequence(0,0);
var fDate = ee.Date.parse('yyyy-MM-dd', frmDate.getValue())
var tDate = ee.Date.parse('yyyy-MM-dd', ToDate.getValue())
var CloudCoverages = ee.Number.parse(CloudCoverageTxt.getValue())
var nMonths = ee.Number(tDate.difference(fDate,'month')).round();
var collection = ee.ImageCollection('COPERNICUS/S2') 
    .filterDate(fDate, tDate)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',CloudCoverages))
    .filterBounds(ExportArea)
    .sort('CLOUD_COVER')
    .map(maskS2clouds)
Map.addLayer(ee.Image(1).clip(ExportArea), {palette: ['white']},'',true);
//Map.addLayer(HiranSW,{},'Sub Watershed', false);
Map.addLayer(ExportArea,{},'Basin/Area', false);
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
    var Area1 = ee.Number(Area).format("%.1f")
    TotalAreaLbl.setValue("Total Area of Basin/Area (sq km): " + Area1.getInfo())
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
      image = image.addBands(ndwi.clip(MaliyaIncludeArea))
      //image = image.addBands(ndwi.clip(geometry)) //for Maliya
      var NDWI_Masked = image.select('NDWI').updateMask(image.select('NDWI').gt(0));
      NDWI_Masked = NDWI_Masked.divide(0.1).ceil();
      NDWI_Masked = NDWI_Masked.remap([1,2,3,4,5,6,7],[1,2,3,4,4,4,4]).rename('Surface Water')
      image = image.addBands(NDWI_Masked)
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
var Widgets = 18
    if (NDVICheck.getValue()) {
    var NDVI_Chart = ui.Chart.array.values({array: NDVI_Areas, axis: 0, xLabels: lst2})
    .setSeriesNames(['Vegetation Area'])
    .setChartType('ColumnChart')
    .setOptions({title: 'Vegetation Area',
      vAxis: {title: 'Vegetation Area Sq km', maxValue: 1,lineWidth: 1,pointSize: 2,},
      series: {0: {color: 'green'}, 1: {color: '0000FF'}},
      //hAxis: {title: 'Image Number', format: '0', logScale: false, gridlines: {count: 7}},
      pointSize: 3, legend: {position: 'right-top'},});
        MainPanel.widgets().set(Widgets+2, NDVI_Chart);
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
    MainPanel.widgets().set(Widgets+3, NDWI_Chart);
    }
    if (NDIMonthlyCheck.getValue()){
//print(MonthlyImages.select('NDVI_Area','NDWI_Area'))
    var NDVI_NDWI_Chart = ui.Chart.image.series({imageCollection: MonthlyImages.select('NDVI','NDWI'),
    region: ExportArea, reducer: ee.Reducer.median(), scale: 20
    }).setOptions({title: 'Normalized Difference Index',
      vAxis: {title: 'Median Value', maxValue: 1,lineWidth: 1,pointSize: 2,},
      series: {0: {color: '00FF00'}, 1: {color: '0000FF'}},
      hAxis: {title: 'Date', format: 'dd-MMM-yyyy', logScale: false, gridlines: {count: 7}},
      legend: {position: 'right-top'},});
      MainPanel.widgets().set(Widgets+4, NDVI_NDWI_Chart);
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
      MainPanel.widgets().set(Widgets+5, CloudyChart);
     }
    var ColMedian = collection.max().clip(ExportArea)
    var NDVI = ColMedian.normalizedDifference(['B8', 'B4']).rename('NDVI');
    ColMedian = ColMedian.addBands(NDVI)
    var NDVI_Masked = ColMedian.select('NDVI').updateMask(ColMedian.select('NDVI').gte(0.2));
    ColMedian = ColMedian.addBands(NDVI_Masked.divide(0.2).ceil().rename('Vegetation'))
    var NDWI = ColMedian.normalizedDifference(['B3', 'B8']).rename('NDWI');
    ColMedian = ColMedian.addBands(NDWI)
    var NDWI_Masked = ColMedian.select('NDWI').updateMask(ColMedian.select('NDWI').gt(0.03));
    NDWI_Masked = NDWI_Masked.divide(0.1).ceil();
    NDWI_Masked = NDWI_Masked.remap([1,2,3,4,5,6,7],[1,2,3,4,4,4,4]).rename('Surface Water')
    ColMedian = ColMedian.addBands(NDWI_Masked) 
    //Map.addLayer(MonthlyImages.sum().select('NDVI_Probability').clip(ExportArea),{min:0, max:10, palette:'white, lime, LimeGreen, green', bands: ['NDVI_Probability']}, 'NDVI_Probability' ,false);
    Map.addLayer(MonthlyImages.median(),Visualization['Natural/True Color'].visParams, 'Natural/True Color' ,true);
    Map.addLayer(MonthlyImages.median(),Visualization['False Color'].visParams, 'False Color' ,false);
    Map.addLayer(MonthlyImages.median(),Visualization['Land & Water Color'].visParams, 'Land & Water Color' ,false);
    Map.addLayer(MonthlyImages.median().select('NDVI'), Visualization['NDVI'].visParams, 'NDVI', false);
    Map.addLayer(MonthlyImages.median().select('Vegetation'),Visualization['Vegetation'].visParams, 'Vegetation', false);
    Map.addLayer(MonthlyImages.median().select('NDWI'), Visualization['NDWI'].visParams, 'NDWI', false);
    Map.addLayer(MonthlyImages.median().select('Surface Water'), Visualization['Surface Water'].visParams, 'Surface Water', false);
    Map.addLayer(MonthlyImages.median().select('Vegetation & Surface Water'), Visualization['Vegetation & Surface Water'].visParams, 'Vegetation & Surface Water', false);
    //Map.addLayer(MonthlyImages.median().select('NDBI'), Visualization['NDBI'].visParams, 'NDBI', false);    
    //Map.addLayer(MonthlyImages.median().select('MNDVI'), Visualization['MNDVI'].visParams, 'MNDVI', false);
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
    var ExportAreaBuffer = BufferFeaturesByDistance(ExportArea, 100);
    SRTM = SRTM.clip(ExportArea)
    var SRTM_Min = SRTM.reduceRegion({reducer: ee.Reducer.min(), geometry: ExportArea,scale: 30}).get('elevation');
    var SRTM_Min1 = ee.Number(SRTM_Min).format("%.1f")
    var SRTM_Min2 = ee.Number.parse(SRTM_Min1.getInfo()) 
    MinElevLbl.setValue("Minimum Elevation: " + SRTM_Min2.getInfo())
    var MinElevation = SRTM_Min2.getInfo()
    var SRTM_Mean = SRTM.reduceRegion({reducer: ee.Reducer.mean(), geometry: ExportArea,scale: 30}).get('elevation');
    var SRTM_Mean1 = ee.Number(SRTM_Mean).format("%.1f")
    var SRTM_Mean2 = ee.Number.parse(SRTM_Mean1.getInfo()) 
    MeanElevLbl.setValue("Mean Elevation: " + SRTM_Mean2.getInfo())
    var SRTM_Max = SRTM.reduceRegion({reducer: ee.Reducer.max(), geometry: ExportArea,scale: 30}).get('elevation');
    var SRTM_Max1 = ee.Number(SRTM_Max).format("%.1f")
    var SRTM_Max2 = ee.Number.parse(SRTM_Max1.getInfo())
    MaxElevLbl.setValue("Maximum Elevation: " + SRTM_Max2.getInfo())
    var MaxElevation = SRTM_Max2.getInfo()
    Map.addLayer(SRTM, {min: MinElevation, max: MaxElevation, palette: ['blue', 'green','yellow','red','white']},'Elevation',false);
    var lines = ee.List.sequence(MinElevation, MaxElevation, 25)
    contourlines = lines.map(function(line) {
      var mycontour = SRTM
        .convolve(ee.Kernel.gaussian(5, 3))
        .subtract(ee.Image.constant(line)).zeroCrossing() 
        .multiply(ee.Image.constant(line)).toFloat();
      return mycontour.mask(mycontour);
    });
    contourlines = ee.ImageCollection(contourlines).mosaic()
    Map.addLayer(contourlines, {min: MinElevation, max: MaxElevation,  palette: ['blue', 'green','yellow','red','white']}, 'Contours',false)
    }
  WaitMessage.setValue('')
  }
});
MainPanel.add(ui.Panel([ui.Label({value: 'Image for Animation: '}),SelectMap], ui.Panel.Layout.flow('horizontal')));
var WaitMessage = ui.Label({value: '',style: { width: '160px'}});
MainPanel.add(ui.Panel([button,WaitMessage], ui.Panel.Layout.flow('horizontal')));
var ExportData
var ExportTypeData = ui.Select({
  placeholder: 'Choose Analysis Type...',
  items: [
    {label: 'Single/Mean Image', value: 1},
    {label: 'Each Composite & Mosaic:', value: 2},
    //{label: 'Video (If Animation Tick Mark)', value: 3},    
    //{label: 'Digital Elevation Model', value: 4},
  ],
  onChange: function(value) {
  ExportData = value
  }
});
ExportTypeData.setValue(1,true);
var DownloadResolutionTxt = ui.Textbox({value: '25',style: {width: '50px'}});
var pnlDownloadResolution = ui.Panel([ui.Label('Download Image Resolution (m): '), DownloadResolutionTxt], ui.Panel.Layout.flow('horizontal'));
//MainPanel.add(pnlDownloadResolution);
var pnlExportTypeData = ui.Panel([ui.Label('Image Type: '), ExportTypeData], ui.Panel.Layout.flow('horizontal'));
MainPanel.add(pnlExportTypeData);
var DownloadPanel = ui.Panel({
  style:
      {height: '200px', width: '270px', position: 'bottom-right', shown: false}
});
Map.add(DownloadPanel);
var ExportButton = ui.Button({
  label: 'Export Data',
  disabled: true,
  onClick: function() {
  var vis = Visualization[SelectMap.getValue()]
  var bnd = vis.visParams['bands']
  ExportButton.setDisabled(true);
  ExportRefButton.setDisabled(false);
  DownloadPanel.widgets().reset();
  DownloadPanel.style().set('shown', true);
  var DownloadResolutionValue = ee.Number.parse(DownloadResolutionTxt.getValue())
  if (ExportData===1){
    var ExportImg = MonthlyImages.median().clip(ExportArea).select(bnd)
    ExportImg = ExportImg.unmask(0)
    //Export.image.toDrive({image:ExportImg ,fileNamePrefix: SelectMap.getValue() , folder: 'PLK',
    //description: SelectMap.getValue().replace(' ',''),scale: 10,region:ExportArea,maxPixels: 3784216672400,});
    //Resolution Maliya-40,
    var Download_Image = ui.Label(SelectMap.getValue()).setUrl(ExportImg.getDownloadURL({
    image: ExportImg.serialize(),scale: 40, name:SelectMap.getValue(), filename: SelectMap.getValue(),
    filePerBand: false, region: ExportArea.geometry()}))
    DownloadPanel.add(Download_Image);
  }
  if (ExportData===2){
    var colList = MonthlyImages.toList(MonthlyImages.size());
    var n = colList.size().getInfo();
      for (var i = 0; i < n; i++) {
      var img = ee.Image(colList.get(i));
      img = img.unmask(0)
      var month = ee.Date(img.get('system:time_start')).format('yyyyMMdd').getInfo()
      var FileName = SelectMap.getValue() + '-' + month
        Export.image.toDrive({image: img.select(bnd),fileNamePrefix: FileName, folder: 'Ishkashim',
        description: SelectMap.getValue() + month,scale: 10, region:ExportArea, maxPixels: 3784216672400,});
      var imageLabel = ui.Label(FileName);
      imageLabel.setValue('Error: Less than 100 km2 area allowed to download the 10 m resolution image')
      //Resolution Maliya-40&20,
      if (SelectMap.getValue()==='Natural/True Color' || SelectMap.getValue()==='False Color' || SelectMap.getValue()==='Land & Water Color' || SelectMap.getValue()==='NDVI' || SelectMap.getValue()==='NDWI'){
        imageLabel.setUrl(img.select(bnd).getDownloadURL({image: img.select(bnd).serialize(),scale: 40, 
          name: FileName, filename: FileName,filePerBand: false, region: ExportArea.geometry()}))
      }
      if  (SelectMap.getValue()==='Vegetation' || SelectMap.getValue()==='Surface Water' || SelectMap.getValue()==='Vegetation & Surface Water'){
            imageLabel.setUrl(img.select(bnd).getDownloadURL({image: img.select(bnd).serialize(),scale: 20, 
              name: FileName, filename: FileName,filePerBand: false, region: ExportArea.geometry()}))
      }
      imageLabel.setValue('Download ' + FileName)
      DownloadPanel.add(imageLabel);
      }
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
      DownloadPanel.widgets().reset();
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
MainPanel.add(ui.Label('')); // NDIChart
MainPanel.add(ui.Label('')); // NDVI_Chart
MainPanel.add(ui.Label('')); //NDWI_Chart
MainPanel.add(ui.Label('')); //NDVI_NDWI_Chart
MainPanel.add(ui.Label(''));//CloudyChart
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