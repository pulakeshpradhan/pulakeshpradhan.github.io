var table = ui.import && ui.import("table", "table", {
      "id": "users/AristidesMairena/saskatchewan_highway"
    }) || ee.FeatureCollection("users/AristidesMairena/saskatchewan_highway"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/AristidesMairena/alberta"
    }) || ee.FeatureCollection("users/AristidesMairena/alberta");
var table = ee.FeatureCollection("users/AristidesMairena/saskatchewan_highway");
var table2 = ee.FeatureCollection("users/AristidesMairena/alberta");
var mapPanel = ui.Map();
var layers = mapPanel.layers();
var skHighways = ee.FeatureCollection(table);
var alberta = ee.FeatureCollection(table2);
var RoadFilter = ee.Filter.inList('TYPE',['trunk','trunk_link','primary','primary_link'])
var road = skHighways.filter(RoadFilter).merge(alberta)
var roadVis = ee.Image().byte().paint({featureCollection: road,  color: 1,  width: 1});
var roadVis2 = {palette: [
   '#A5386A']
};
var roadCover = roadVis.visualize(roadVis2);
var roadCoverLaver = ui.Map.Layer(roadCover).setName('roads');
var chosenDateRange;
var chosenYear;
var chosenCrop;
var chosenCropName;
var aoi;
var BAND_NAME = 'landcover';
var usedPoint = false;
var savedAOI;
var cropCountStorage;
var yearsGrown = 0;
var namesList;
var codesList;
//(146 spring wheat) (140 wheat) (153 canola)(133 Barley)(162 Peas)(136 Oats)
//(174 Lentils)(154 Flax)(131 fallow)(155 Mustard) (158 Soybeans)
//(163 Chickpeas)(196 Canaryseed) (168 Fababeans) (147 Corn)(145 Winter Wheat)(167 Beans)
var cropNumbers = [146, 140, 153, 133, 162, 136, 174, 154, 131, 155, 158, 163, 196, 168, 147, 145, 167,231]
var cropNames = ['spring wheat', 'wheat', 'canola','barley','peas','oats','lentils',
'flax','fallow','mustard','soybeans','chickpeas','canaryseed','fababeans','corn',
'winter wheat', 'beans', 'Aphonomyces susceptible host (lentil or pea)']
var collection = ee.ImageCollection('AAFC/ACI')
                .select(BAND_NAME);
var restoreCollection = collection;
var oldVal = ee.List([10,	20,	30,	34,	35,	50,	80,	110,	120,	122,	130,	131,	132,	133,	134,	135,	136,	137,	138,	139,	140,	141,	142,	145,	146,	147,	148,	149,	150,	151,	152,	153,	154,	155,	156,	157,	158,	160, 162,	167, 174,	175,	176,	177,	178,	179,	180,	181,	182,	183,	185,	188,	189,	190,	191,	192,	193,	194,	195,	196,	197,	198,	199,	200,	210,	220,	230])
var newVal = ee.List([10,	20,	30,	34,	35,	50,	80,	110,	120,	122,	130,	131,	132,	133,	134,	135,	136,	137,	138,	139,	140,	141,	142,	145,	146,	147,	148,	149,	150,	151,	152,	153,	154,	155,	156,	157,	158,	160, 231,	167, 231,	175,	176,	177,	178,	179,	180,	181,	182,	183,	185,	188,	189,	190,	191,	192,	193,	194,	195,	196,	197,	198,	199,	200,	210,	220,	230])
var merged = ee.ImageCollection(collection).map(function(img){
  var mask= img.remap(oldVal,newVal,0, 'landcover').rename('landcover');
  return mask})
  /* The crop picker section. */
var select = ui.Select({
  items: cropNames,
  placeholder: ('Choose a Crop'),
  style: {width: '290px'},
  onChange: function(key) {
    layers.reset() 
    collection = restoreCollection;
    usedPoint=false;
    var cropID = cropNumbers[cropNames.indexOf(key)]
    if(cropID == 231){
      collection = merged;
    }
    var image = collection.filterDate(chosenDateRange).first();
    var canolaVis = {min: 0, max: 2, palette: [
    '000', '346a34', 'd6ff70', '148fae', '57ecc0']
    };
    chosenCrop = cropID;
    chosenCropName = String(key)
    var cover = image.eq(cropID).visualize(canolaVis);
    var coverLayer = ui.Map.Layer(cover).setName(String(key) + String(chosenYear));
    //layers.add(cropLayer, String(year));
    layers.add(coverLayer, 'new layr');
     layers.add(roadCoverLaver,'road')
  }
});
//******** geometry panel
var drawingTools = mapPanel.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers2 = drawingTools.layers();
  layers2.get(0).geometries().remove(layers2.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
var count = 0;
function drawPolygon() {
  count+=1;
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  usedPoint = true;
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
drawingTools.onDraw(ui.util.debounce(drawAOI, 500));
drawingTools.onEdit(ui.util.debounce(drawAOI, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('3). Select a drawing mode.', {fontWeight: 'bold'}),
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
    ui.Label('3.1 Draw a geometry.'),
    ui.Label('3.2 Wait for layer to render.'),
    ui.Label(
        '3.3. Repeat 1-3 or edit/move\ngeometry for a new layer.',
        {whiteSpace: 'pre'}),
    ui.Label('4). Select a Field to Inspect.', {fontWeight: 'bold'}),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-left', width: '80%'},
  layout: null,
});
function clearAfterDraw(){
  clearGeometry()
}
// Create and add the legend title.
var legendTitle1 = ui.Label({
  value: '1) Select a Crop',
  style: {
    fontWeight: 'bold',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Crop Land Cover',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
legend.add(legendTitle1);
legend.add(select)
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// A helper function to show the image for a given year on the default map.
var run=false;
var showLayer = function(year) {
  layers.reset() 
  var start = Filters.startDate.getValue();
  var end = Filters.endDate.getValue();
  //Map.layers().reset();
  //var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(start, end);
  chosenDateRange = dateRange;
  chosenYear = String(start) + ' ' + String(end);
  var image = collection.filterDate(dateRange).first();
  var cropLayer = ui.Map.Layer(image).setName(String(chosenYear));
  //var canolaVis = {min: 0, max: 2, palette: [
  //'000', '346a34', 'd6ff70', '148fae', '57ecc0']
  //};
  //var cover = image.eq(cropc).visualize(canolaVis);
  //var coverLayer = ui.Map.Layer(cover).setName('Canola ' + String(year));
  //layers.add(coverLayer, 'canola');
  layers.add(cropLayer, String(start) + String(end));
     layers.add(roadCoverLaver,'road')
  if(chosenCrop){
    var canolaVis = {min: 0, max: 2, palette: [
    '000', '346a34', 'd6ff70', '148fae', '57ecc0']
    };
    var cover = image.eq(chosenCrop).visualize(canolaVis);
    var coverLayer = ui.Map.Layer(cover).setName(chosenCropName + String(start) + String(end));
    layers.add(coverLayer, 'crop');
  }
  if(run==false){
  // Get the list of palette colors and class names from the image.
  image.toDictionary().select([BAND_NAME + ".*"]).evaluate(function(result) {
    var palette = result[BAND_NAME + "_class_palette"];
    var names = result[BAND_NAME + "_class_names"];
    var codes = result[BAND_NAME + "_class_values"];
    namesList = names;
    codesList = codes;
    loading.style().set('shown', false);
     legend.add(ui.Label('Crops, Based on the AAFC Annual Crop Inventory (accuracy ~95%)', {fontWeight: 'bold'}))
    for (var i = 0; i < names.length; i++) {
      legend.add(makeRow(palette[i], names[i]));
    }
    //Map.addLayer(image, {min: 0, max: 17, palette: palette}, 'IGBP classification');
  });
  }
  run = true;
//Map.add(legend);
};
// Create a label and slider.
var label = ui.Label('Crop Year');
var slider = ui.Slider({
  min: 2009,
  max: 2019,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
  /* The collection filter controls. */
  var Filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY', '2009'),
    endDate: ui.Textbox('YYYY', '2020'), //'YYYY-MM-DD', '2019-12-31'
    applyButton: ui.Button('Apply filters', showLayer),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  var DatePickerPanel = ui.Panel({
    widgets: [
      ui.Label('2) Select filters', {fontWeight: 'bold'}),
      ui.Label('Start year', {}), Filters.startDate,
      ui.Label('End year', {}), Filters.endDate,
      ui.Panel([
        Filters.applyButton,
        Filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: {margin: '20px 0 0 0'}
  });
legend.add(DatePickerPanel)
legend.add(controlPanel)
// Add the panel to the map.
//legend.add(panel);
// Set default values on the slider and map.
slider.setValue(2010);
mapPanel.setCenter(-105.8598, 52.4841, 7);
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(legend, mapPanel));
function drawAOI() {
  if(usedPoint){
      // Get the drawn geometry; it will define the reduction region.
    var pointAOI = drawingTools.layers().get(0).getEeObject();
   // Set the drawing mode back to null; turns drawing off.
    drawingTools.setShape(null);
    getValues(pointAOI)
  }else{
  usedPoint=false;
   // Make the chart panel visible the first time a geometry is drawn.
  layers.reset() 
  // Get the drawn geometry; it will define the reduction region.
  aoi = drawingTools.layers().get(0).getEeObject();
  savedAOI = aoi;
 // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Get data just for AOI
  var start = Filters.startDate.getValue();
  var end = Filters.endDate.getValue();
  var dateRange = ee.DateRange(start, end);
  chosenDateRange = dateRange;
  chosenYear = String(start) + ' ' + String(end);
  var cropped = collection
         .filterBounds(aoi)
      .map(function(image){return image.clip(aoi)});
  var image = cropped
        .filterDate(dateRange)
          .filterBounds(aoi)
          .first();
  var cropLayer = ui.Map.Layer(image).setName(String(chosenYear));
  layers.add(cropLayer, String(start) + String(end));
  //layers.add(skHighways.filterBounds(aoi), {}, 'default display');
     layers.add(roadCoverLaver,'road')
  //to map frequency 
  if(chosenCrop){
    layers.reset() 
    var canolaVis = {min: 0, max: 2, palette: [
    '000', '346a34', 'd6ff70', '148fae', '57ecc0']
    };
    //visualize cover of chosen crop in AOI
    var cover = image.eq(chosenCrop).visualize(canolaVis);
    var coverLayer = ui.Map.Layer(cover).setName(chosenCropName + String(start) + String(end));
    //layers.add(coverLayer, 'canola');
    //get range for colour pallete
    var range = end-start
    //now to map frequency on AOI
    var vis4 = {
      min: 0,
      max: range,
      palette: [
        'FFFFFF', '00FF00', 'FFFF00', 'FF9900','CC0033',
      ],
    };
    var start2 = (ee.Date(start))
    var end2 = (ee.Date(end))
    start2 = start2.get('year');
    end2 = end2.get('year');
    var cropCounts = [];
    var years = ee.List.sequence(start2,end2)
        var crop2009 = cropped
    .filter(ee.Filter.date('2009-01-01', '2009-12-31'))
      .filterBounds(aoi)
    .first();
        var crop2010 = cropped
    .filter(ee.Filter.date('2010-01-01', '2010-12-31'))
      .filterBounds(aoi)
    .first();
    var crop2011 = cropped
    .filter(ee.Filter.date('2011-01-01', '2011-12-31'))
      .filterBounds(aoi)
    .first();
    var crop2012 = cropped
        .filter(ee.Filter.date('2012-01-01', '2012-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2013 = cropped
        .filter(ee.Filter.date('2013-01-01', '2013-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2014 = cropped
        .filter(ee.Filter.date('2014-01-01', '2014-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2015 = cropped
        .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2016 = cropped
        .filter(ee.Filter.date('2016-01-01', '2016-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2017 = cropped
        .filter(ee.Filter.date('2017-01-01', '2017-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2018 = cropped
        .filter(ee.Filter.date('2018-01-01', '2018-12-31'))
          .filterBounds(aoi)
        .first();
    var crop2019 = cropped
        .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
          .filterBounds(aoi)
        .first();     
    var crop2020 = cropped
        .filter(ee.Filter.date('2020-01-01', '2020-12-31'))
          .filterBounds(aoi)
        .first();            
    var canb09 =  crop2009.eq(chosenCrop);
    var canb10 =  crop2010.eq(chosenCrop);
    var canb11 =  crop2011.eq(chosenCrop);
    var canb12 =  crop2012.eq(chosenCrop);
    var canb13 =  crop2013.eq(chosenCrop);
    var canb14 =  crop2014.eq(chosenCrop);
    var canb15 =  crop2015.eq(chosenCrop);
    var canb16 =  crop2016.eq(chosenCrop);
    var canb17 =  crop2017.eq(chosenCrop);
    var canb18 =  crop2018.eq(chosenCrop);
    var canb19 =  crop2019.eq(chosenCrop);
    var canb20 =  crop2020.eq(chosenCrop);
    var possibleYears = [] 
    cropCounts.push(canb09,canb10,canb11,canb12,canb13,canb14,canb15,canb16,canb17,canb18,canb19,canb20)
    possibleYears.push(2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020)
    var startIndex = possibleYears.indexOf(start2.getInfo())
    var endIndex = possibleYears.indexOf(end2.getInfo())
    var indices = ee.List.sequence(startIndex,endIndex)
    var spliceLength = indices.length()
    var summaryYears = cropCounts.splice(startIndex,spliceLength.getInfo())
    var summaryCollection = ee.ImageCollection(summaryYears)
    //var cancounte4 = canb09.add(canb10.add(canb11.add(canb12)));
    var cropCount = summaryCollection.sum()
    cropCountStorage = cropCount;
    //var freq = cancounte4.visualize(vis4)
    //var freqLayer = ui.Map.Layer(freq).setName(chosenCropName + String(start) + String(end) + 'freq');
    //layers.add(freqLayer, 'freq');
    var freq = ui.Map.Layer(cropCount,vis4,chosenCropName + String(start) + String(end) + ' frequency')
    layers.add(freq, 'freq');
   // layers.add(skHighways.filterBounds(aoi), {}, 'default display');
     layers.add(roadCoverLaver,'road')
    //point data
    //var p = ee.Geometry.Point(-106.56583, 52.06603)
    // Extract the data
    //var data = cropCount
    //.select("landcover")
    //.reduceRegion(ee.Reducer.first(),p,10)
    //.get("landcover")
    // Convert to Number for further use
    //var dataN = ee.Number(data)
    // Show data
    //print(dataN)
    clearAfterDraw();
  }
   clearAfterDraw();
}
}//closing else
function clearAfterDraw(){
  clearGeometry()
}
function getValues(p){
    //var p = ee.Geometry.Point(-106.56583, 52.06603)
    var start = Filters.startDate.getValue();
    var end = Filters.endDate.getValue();
    // Extract the data
    var data = cropCountStorage
      .select("landcover")
      .reduceRegion(ee.Reducer.first(),p,10)
      .get("landcover")
    // Convert to Number for further use
    var dataN = ee.Number(data)
    // Show data
    yearsGrown = dataN;
    var newLabel = ui.Label(chosenCropName + ' was grown '+ yearsGrown.getInfo() + ' times at chosen field between '+ start + ' and ' + end)
    //controlPanel.add(newLabel)
    controlPanel.widgets().set(8,newLabel)
    //to get which years
    //savedAOI
    var dataset = ee.ImageCollection('AAFC/ACI')
    .filterBounds(p)
    .map(function(img){return img.clip(p)});
   //if chosen crop = merged one:
   //if(chosenCrop == 231){
  //   dataset = ee.ImageCollection(collection).map(function(img){
  //      var mask= img.remap(oldVal,newVal,0, 'landcover').rename('landcover');
  //      return mask})
   //}
    var crop = dataset.map(croptype).toBands()
    var cropRotation = dataset.map(whichCropType).toBands()
    var newvizParams = {
      opacity: 0.0
    };
    var cropall = ui.Map.Layer(crop,{},'all years',0)
    var cropRotationLayer = ui.Map.Layer(cropRotation,{},'rotation',0)
    layers.add(cropall, {},'map all')
    layers.add(cropRotationLayer, {}, 'rotation')
   // layers.add(skHighways.filterBounds(aoi), {}, 'default display');
   //  layers.add(roadCoverLaver,'road')
    //extract data again
    var data2 = crop
      .select(["2009_2009","2010_2010","2011_2011","2012_2012","2013_2013","2014_2014","2015_2015","2016_2016","2017_2017","2018_2018","2019_2019","2020_2020"])
      .reduceRegion(ee.Reducer.toList(),p,10);
    var dataRotation = cropRotation
      .select(["2009_2009","2010_2010","2011_2011","2012_2012","2013_2013","2014_2014","2015_2015","2016_2016","2017_2017","2018_2018","2019_2019","2020_2020"])
      .reduceRegion(ee.Reducer.toList(),p,10);
      var yearLastGrown = 0;
      //var data2020 = data2.get('2020_2020').getInfo()[0];
      var rotationList = []
      for (var yr= end; yr >= start; yr = yr - 1) {
        //if havent found last grown year
        //if(yearLastGrown===0){
        //  var dataYear = data2.get(yr+'_'+yr).getInfo()[0];
        //  if(dataYear === 1){
        //    yearLastGrown = yr;
        //  }
        //}
        var rotatedCrop = dataRotation.get(yr+'_'+yr).getInfo()[0];
        if(yearLastGrown===0){
          //var dataYear = data2.get(yr+'_'+yr).getInfo()[0];
          if(rotatedCrop === chosenCrop){
            yearLastGrown = yr;
          }
           //special condition if 231
          if(chosenCrop == 231){
            if(rotatedCrop == 162 || rotatedCrop == 174){
              yearLastGrown = yr;
            }
          }
        }        
        //change canola name
        if(rotatedCrop === 153){
          rotationList.push('Canola')
        }else{
          var currentIndex = codesList.indexOf(rotatedCrop);
          rotationList.push(namesList[currentIndex])
        }
      } 
    var lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' at chosen field. ')
    //controlPanel.add(newLabel)
    controlPanel.widgets().set(9,lastLabel)
    var newDivision = ui.Label('Field Crop History' , {fontWeight: 'bold'})
    controlPanel.widgets().set(10,newDivision)
    for (var i= 0; i < rotationList.length; i = i + 1) {
      var yearInLoop = parseInt(end) - i;
      //print(rotationList[i])
      var customLabel = yearInLoop + ' : ' + rotationList[i];
      var rotationLabel =  ui.Label(customLabel)
      controlPanel.widgets().set(11+i,rotationLabel)
    }
}
var croptype = function(img){
  var year = ee.String(img.get('system:index'))
  var mask = img.eq(chosenCrop) 
  return mask.rename(year)
}
var whichCropType = function(img){
  var year = ee.String(img.get('system:index'))
  var mask = img//.eq(153) // canola:153, wheat: 140; oat: 136
  // var mask = img.eq(136)
  return mask.rename(year)
}