var table = ui.import && ui.import("table", "table", {
      "id": "users/AristidesMairena/saskatchewan_highway"
    }) || ee.FeatureCollection("users/AristidesMairena/saskatchewan_highway"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/AristidesMairena/alberta"
    }) || ee.FeatureCollection("users/AristidesMairena/alberta"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/AristidesMairena/manitoba2"
    }) || ee.FeatureCollection("users/AristidesMairena/manitoba2");
var table = ee.FeatureCollection("users/AristidesMairena/saskatchewan_highway");
var table2 = ee.FeatureCollection("users/AristidesMairena/alberta");
var table3 = ee.FeatureCollection("users/AristidesMairena/manitoba2");
var skHighways = ee.FeatureCollection(table);
var alberta = ee.FeatureCollection(table2);
var manitoba = ee.FeatureCollection(table3);
var mapPanel = ui.Map();
var layers = mapPanel.layers();
// SET THE INITIAL BACKGROUND MAP
mapPanel.setOptions('HYBRID');
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
var roadVis2 = {palette: [
   '#A5386A']
};
var RoadFilter = ee.Filter.inList('TYPE',['trunk','trunk_link','primary','primary_link'])
var RoadFilter2 = ee.Filter.inList('ROADCLASS',['Expressway / Highway'])
var road = skHighways.filter(RoadFilter).merge(alberta).merge(manitoba.filter(RoadFilter2))
//var road = manitoba.filter(RoadFilter2).merge(alberta)
var roadVis = ee.Image().byte().paint({featureCollection: road,  color: 1,  width: 1});
var roadCover = roadVis.visualize(roadVis2);
var roadCoverLaver = ui.Map.Layer(roadCover).setName('roads');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOGOS
//var link = ui.Label('Welcome to the Crop Rotation Tool');
var label = ui.Label('Description of the application goes here ')
var link = ui.Label({
  value: 'Welcome to the Crop Rotation Tool',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
// SPLASH PAGE PANEL
var intro_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '700px',
          backgroundColor: 'FFFFFF', //'#150E07',
          border: '10px ridge #B28355',
          position: 'top-center',
          shown: true}})
  .add(link)
  .add(ui.Label({
    value: 'To view a field crop rotation:',
    style: {fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'justify',
            color: '#74491F',
            backgroundColor: 'FFFFFF',
    }}
    ))
  .add(ui.Label({
    value: '1. Select a crop from the dropdown.',
    style: {fontSize: '12px',
            textAlign: 'justify',
            color: '#74491F',
            backgroundColor: 'FFFFFF',
    }}
    ))  
  .add(ui.Label({
    value: '2. Select years to assess.',
    style: {fontSize: '12px',
            textAlign: 'justify',
            color: '#74491F',
            backgroundColor: 'FFFFFF',
    }}
    ))  
  .add(ui.Label({
    value: '3. Draw a region of interest with the rectangle or polygon tools.',
    style: {fontSize: '12px',
            textAlign: 'justify',
            color: '#74491F',
            backgroundColor: 'FFFFFF',
    }}
    ))  
  .add(ui.Label({
    value: '4. Select a field with the point tool.',
    style: {fontSize: '12px',
            textAlign: 'justify',
            color: '#74491F',
            backgroundColor: 'FFFFFF',
    }}
    ))  
  .add(ui.Label({
    value: '5. To change field, click on Point tool and select new field.',
    style: {fontSize: '12px',
            textAlign: 'justify',
            color: '#74491F',
            backgroundColor: 'FFFFFF',
    }}
    ))        
mapPanel.add(intro_panel);
//create a button to hide the panel
intro_panel.add(ui.Button(
  {label: 'CLOSE',
  style: {color: '#000000',
          stretch: 'horizontal'
  },
  onClick: function() {
  intro_panel.style().set('shown', false);
  //intro_button.style().set('shown', true);  
  }
}));
////////********************* intro panel
//140 & 146 -- combine wheat and spring wheat
//(146 spring wheat) (140 wheat) (153 canola)(133 Barley)(162 Peas)(136 Oats)
//(174 Lentils)(154 Flax)(131 fallow)(155 Mustard) (158 Soybeans)
//(163 Chickpeas)(196 Canaryseed) (168 Fababeans) (147 Corn)(145 Winter Wheat)(167 Beans)
//'spring wheat', 'wheat', 146, 140, 
var cropNumbers = [153, 133, 162, 136, 174, 154, 131, 155, 158, 163, 196, 168, 147, 145, 167,231, 233]
var cropNames = [ 'Canola','barley','peas','oats','lentils',
'flax','fallow','mustard','soybeans','chickpeas','canaryseed','fababeans','corn',
'winter wheat', 'beans', 'Aphonomyces susceptible host (lentil or pea)', 'Spring Wheat']
var collection = ee.ImageCollection('AAFC/ACI')
                .select(BAND_NAME);
var restoreCollection = collection;
var oldVal = ee.List([10,	20,	30,	34,	35,	50,	80,	110,	120,	122,	130,	131,	132,	133,	134,	135,	136,	137,	138,	139,	140,	141,	142,	145,	146,	147,	148,	149,	150,	151,	152,	153,	154,	155,	156,	157,	158,	160, 162,	167, 174,	175,	176,	177,	178,	179,	180,	181,	182,	183,	185,	188,	189,	190,	191,	192,	193,	194,	195,	196,	197,	198,	199,	200,	210,	220,	230])
var newVal = ee.List([10,	20,	30,	34,	35,	50,	80,	110,	120,	122,	130,	131,	132,	133,	134,	135,	136,	137,	138,	139,	233,	141,	142,	145,	233,	147,	148,	149,	150,	151,	152,	153,	154,	155,	156,	157,	158,	160, 231,	167, 231,	175,	176,	177,	178,	179,	180,	181,	182,	183,	185,	188,	189,	190,	191,	192,	193,	194,	195,	196,	197,	198,	199,	200,	210,	220,	230])
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
    if(cropID == 231 || cropID == 233){
      print("merged")
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
  //var date = ee.Date.fromYMD(start, 1, 1);
  //var date1 = ee.Date.fromYMD(ee.Number(start), 1, 1);
  //var date2 = ee.Date.fromYMD(end, 12, 31);
  var dateRange = ee.DateRange(start, end);
  //var dateRange = ee.DateRange(date1, date2);
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
  if(chosenCrop){
    var canolaVis = {min: 0, max: 2, palette: [
    '000', '346a34', 'd6ff70', '148fae', '57ecc0']
    };
    var cover = image.eq(chosenCrop).visualize(canolaVis);
    var coverLayer = ui.Map.Layer(cover).setName(chosenCropName + String(start) + String(end));
    layers.add(coverLayer, 'crop');
         //layers.add(roadCoverLaver,'road')
  }else{
      layers.add(cropLayer, String(start) + String(end));
     layers.add(roadCoverLaver,'road')
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
     legend.add(ui.Label('Crops', {fontWeight: 'bold'}))
    for (var i = 0; i < names.length; i++) {
      legend.add(makeRow(palette[i], names[i]));
    }
    legend.add(ui.Label('Application contains information from Agriculture and Agri-Food Canada Annual Crop Inventory, licensed under the Open Government Licence – Canada, version 2.0. ', {fontWeight: 'bold'}))
    legend.add(ui.Label('Application precipitation data generated using Copernicus Climate Change Service information (1990-2021). ', {fontWeight: 'bold'}))
  legend.add(ui.Label('Developed by the Crop Agronomy Lab in collaboration with the Interaction Lab, University of Saskatchewan (2022).', {fontWeight: 'light'}))
  legend.add(ui.Label('Made possible thanks to funding from Saskatchewan Pulse Growers.', {fontWeight: 'light'}))
    //legend.add(makeRow("HELLO HELLO"));
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
    endDate: ui.Textbox('YYYY', '2020'), //'YYYY-MM-DD', '2019-12-31'     'YYYY', '2020'
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
    var actualYearsGrown = yearsGrown.getInfo()
       if(chosenCrop==231){
      var risk =  ui.Label('Risk of amphonomyces 2022:')
      controlPanel.widgets().set(8,risk)
      }else{
        var risk =  ui.Label(' ')
      controlPanel.widgets().set(8,risk)
      }
    var newLabel = ui.Label(chosenCropName + ' was grown '+ actualYearsGrown + ' times in chosen field between '+ start + ' and ' + end + '. ')
    //controlPanel.add(newLabel)
    controlPanel.widgets().set(9,newLabel)
    var extraLabel = ui.Label('Crop grown in 2021 unknown.')
    controlPanel.widgets().set(10,extraLabel)
    //to get which years
    //savedAOI
    var dataset = ee.ImageCollection('AAFC/ACI')
    .filterBounds(p)
    .map(function(img){return img.clip(p)});
    var precipitation = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
      .select('total_precipitation')
      .filter(ee.Filter.date('1990-01-01', '2021-01-01'))
      .filterBounds(p)
      .map(function(img){return img.clip(p)});
    var crop = dataset.map(croptype).toBands()
    var cropRotation = dataset.map(whichCropType).toBands()
    var cropPrecipitation = precipitation.map(whichCropType).toBands()
    //var precipitationValues = cropPrecipitation
    //  .reduceRegion(ee.Reducer.toList(),p,10);
    var precipitationValues = cropPrecipitation.reduceRegion({
        geometry: p,
        reducer: ee.Reducer.mean(),
        scale: 1000,
        bestEffort: true
    });
    //print(zonalStats)
    var newvizParams = {
      opacity: 0.0
    };
    var cropall = ui.Map.Layer(crop,{},'all years',0)
    var cropRotationLayer = ui.Map.Layer(cropRotation,{},'rotation',0)
  //commented out feb28
   // layers.add(cropall, {},'map all')
    //layers.add(cropRotationLayer, {}, 'rotation')
        // layers.add(roadCoverLaver,'road')
    //extract data again
    var data2 = crop
      .select(["2009_2009","2010_2010","2011_2011","2012_2012","2013_2013","2014_2014","2015_2015","2016_2016","2017_2017","2018_2018","2019_2019","2020_2020"])
      .reduceRegion(ee.Reducer.toList(),p,10);
    var dataRotation = cropRotation
      .select(["2009_2009","2010_2010","2011_2011","2012_2012","2013_2013","2014_2014","2015_2015","2016_2016","2017_2017","2018_2018","2019_2019","2020_2020"])
      .reduceRegion(ee.Reducer.toList(),p,10);
      //get Long-term precipitation Value
      var twentyYears = [];
      for (var yr= 2019; yr >= 1999; yr = yr - 1) {
        var may = precipitationValues.get(yr+'05_'+yr+'05')//.getInfo()[0];
        var june = precipitationValues.get(yr+'06_'+yr+'06')//.getInfo()[0];
        var july = precipitationValues.get(yr+'07_'+yr+'07')//.getInfo()[0];
        var aug = precipitationValues.get(yr+'08_'+yr+'08')//.getInfo()[0];
        var sept = precipitationValues.get(yr+'09_'+yr+'09')//.getInfo()[0];
       //var rainfall = (may+june+july+aug+sept/5).toFixed(2);
        var rainfall =  ee.Number(may).add(june)//.add(july)//.add(aug).add(sept)
        twentyYears.push(ee.Number.parse(rainfall))
      }  
      var sum = 0;
      for (var yr= 0; yr < twentyYears.length; yr = yr + 1) {
        sum = ee.Number(sum).add(twentyYears[yr])
      }
      var longTermAvg = sum.divide(twentyYears.length)
     // longTermAvg = longTermAvg.multiply(1000)
      print('long term ', longTermAvg)
      var yearLastGrown = 0;
      var rotationList = []
      var precipList = []
      var precipList2 = []
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
          //special condition if 233
          if(chosenCrop == 233){
            if(rotatedCrop == 140 || rotatedCrop == 146){
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
        if(yr != 2020){
        var may = precipitationValues.get(yr+'05_'+yr+'05')//.getInfo()[0];
        var june = precipitationValues.get(yr+'06_'+yr+'06')//.getInfo()[0];
        //var july = precipitationValues.get(yr+'07_'+yr+'07')//.getInfo()[0];
        //var aug = precipitationValues.get(yr+'08_'+yr+'08')//.getInfo()[0];
        //var sept = precipitationValues.get(yr+'09_'+yr+'09')//.getInfo()[0];
       var rainfall2 = (may+june/2);//+july+aug+sept   .toFixed(2);
        var rainfall =  ee.Number(may).add(june)//.add(july).add(aug).add(sept)
            precipList.push(ee.Number.parse(rainfall))
            precipList2.push(rainfall2)
        }else{
          precipList.push(0)
        }
      }//close year loop 
    var lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' in chosen field. ')
                    controlPanel.widgets().set(11,lastLabel)
    var newDivision = ui.Label('Field Crop History' , {fontWeight: 'bold'})
    controlPanel.widgets().set(12,newDivision)
    var maxI = 0;
    for (var i= 0; i < rotationList.length; i = i + 1) {
      var pofAVG = ee.Number(precipList[i]).divide(longTermAvg)
      var pfff = pofAVG.format('%.2f')
      pfff = ee.Number.parse(pfff).multiply(ee.Number(100)).format('%.0f')
      var precip = ee.Number(precipList[i]);
      precip = precip.multiply(ee.Number(1000))
      var precip2 = precip.format('%.2f')
      //print('percentage ', pfff.getInfo() )
      //var color = 'green';
      var comparison = pfff.getInfo();
      //if(comparison>85){
      //  print("yowza")
      //}
    /*
    if(comparison>125){
      var color = 'cyan'
    }
    if(comparison<125){
      var color = 'green'
    }
    if(comparison<75){
      var color = 'yellow'
    }
    */
    var yearInLoop = parseInt(end) - i;
    var includeStatement = false;
    var color = 'lightgrey'
    if(chosenCrop==231){
      if(yearInLoop==yearLastGrown){
              if(comparison>125 && rotationList[i]=='Chickpeas' || rotationList[i]=='otherpulse'){
                var color = 'red'
                var statement = 'High Estimated risk of Aphomyces Root Rot Forecast for 2022. Do not seed peas or lentils into the field';
                includeStatement = true;
                lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' in chosen field with ' + comparison + '% of normal May-June precipitation.')
                controlPanel.widgets().set(11,lastLabel)
              }else{
                var statement = ' Low Estimated risk of Aphomyces Root Rot Forecast for 2022';
                includeStatement = true;
                var color = '#02CCE8'
                lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' in chosen field with ' + comparison + '% of normal May-June precipitation.')
                controlPanel.widgets().set(11,lastLabel)
              }
              if(yearLastGrown>=2019){
                 color = 'yellow';
                 var statement = 'Moderately low estimated risk of Aphomyces Root Rot Forecast for 2022 due to crop rotation. Consider other factors before planting peas or lentils into the field. Soil test the field for Aphanomyces';
                 includeStatement = true;
                  lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' in chosen field with ' + comparison + '% of normal May-June precipitation.')
                  controlPanel.widgets().set(11,lastLabel)
              }      
              if(actualYearsGrown>=4 && yearLastGrown>=2017){
                 color = 'yellow';
                 var statement = 'Moderate Estimated risk of Aphomyces Root Rot Forecast for 2022. Consider other factors before planting peas or lentils into the field. Soil test the field for Aphanomyces';
                 includeStatement = true;
                  lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' in chosen field with ' + comparison + '% of normal May-June precipitation.')
                  controlPanel.widgets().set(11,lastLabel)
              }              
              if(actualYearsGrown>=6){
                var color = 'red'
                var statement = 'High Estimated risk of Aphomyces Root Rot Forecast for 2022. Do not seed peas or lentils into the field';
                includeStatement = true;
                lastLabel = ui.Label(chosenCropName + ' was last grown in '+ yearLastGrown + ' in chosen field with ' + comparison + '% of normal May-June precipitation.')
                controlPanel.widgets().set(11,lastLabel)
              }
      }
    }
    /*  
      if(comparison>200){
        var color = 'blue'
      }
      if(comparison<200){
       var color = 'lightgray'
      }      
      if(comparison<150){
       var color = 'green'
      }
      if(comparison<115){
       var color = 'cyan'
      }
      if(comparison<85){
       var color = 'yellow'
      }
      if(comparison<65){
       var color = 'orange'
      }
      if(comparison<40){
       var color = 'red'
      }
      */
      if(rotationList[i]=='Wheat'){
        rotationList[i]='Spring Wheat'
      }
      var customLabel =  yearInLoop + ' : ' + rotationList[i] + ', May-June precip: ' + precip2.getInfo() + 'mm, ' +  comparison + '% of normal.'
      //if(chosenCrop == rotatedCrop){
      //  customLabel = customLabel + '\n' + statement;
      //}
      if(yearInLoop == 2020){
        customLabel = yearInLoop + ' : ' + rotationList[i] + ' Precipitation Data Currently Unavailable'
      }
      var rotationLabel =  ui.Label(customLabel)
      //rotationLabel.style().set('backgroundColor',  color);
      if(chosenCropName == rotationList[i]){
            rotationLabel.style().set('backgroundColor',  'lightgrey');
      }
      if(chosenCropName == 'Aphonomyces susceptible host (lentil or pea)' && (rotationList[i] == 'Peas' || rotationList[i] == 'Lentils')){
            rotationLabel.style().set('backgroundColor',  'lightgrey');
      }
      controlPanel.widgets().set(13+i,rotationLabel)
      maxI = (12+i)
   if(includeStatement){
      var risk =  ui.Label(statement)
      risk.style().set('backgroundColor',  color);
      controlPanel.widgets().set(8,risk)
    }
    }
    /*var precipChart = ui.Chart.image.series(precipitation, p, ee.Reducer.mean(), 500);
    precipChart.setOptions({
      title: 'Precipitation Over Time',
      vAxis: {title: 'Precipitation'},
      hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    });
    controlPanel.widgets().set(maxI+2, precipChart);
    */
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
var getPrecipitation = function(){
  var start = Filters.startDate.getValue();
  var end = Filters.endDate.getValue();
  var precipitation = ee.ImageCollection('ECMWF/ERA5/MONTHLY')
      .select('total_precipitation')
      .filter(ee.Filter.date('1990-01-01', '2021-01-01'))
      .filterBounds(p)
      .map(function(img){return img.clip(p)});
    var cropPrecipitation = precipitation.map(whichCropType).toBands()
    var precipitationValues = cropPrecipitation
      .reduceRegion(ee.Reducer.toList(),p,10);
    var twentyYears = [];
      for (var yr= 2019; yr >= 1999; yr = yr - 1) {
        var may = precipitationValues.get(yr+'05_'+yr+'05').getInfo()[0];
        var june = precipitationValues.get(yr+'06_'+yr+'06').getInfo()[0];
        var july = precipitationValues.get(yr+'07_'+yr+'07').getInfo()[0];
        var aug = precipitationValues.get(yr+'08_'+yr+'08').getInfo()[0];
        var sept = precipitationValues.get(yr+'09_'+yr+'09').getInfo()[0];
       //var rainfall = (may+june+july+aug+sept/5).toFixed(2);
        var rainfall =  ee.Number(may).add(june).add(july).add(aug).add(sept)
        twentyYears.push(ee.Number.parse(rainfall))
      }  
      var sum = 0;
      for (var yr= 0; yr < twentyYears.length; yr = yr + 1) {
        sum = ee.Number(sum).add(twentyYears[yr])
      }
      var longTermAvg = sum.divide(twentyYears.length)
      var precipList = []
      var precipList2 = []
      for (var yr= end; yr >= start; yr = yr - 1) {
         if(yr != 2020){
        var may = precipitationValues.get(yr+'05_'+yr+'05').getInfo()[0];
        var june = precipitationValues.get(yr+'06_'+yr+'06').getInfo()[0];
        var july = precipitationValues.get(yr+'07_'+yr+'07').getInfo()[0];
        var aug = precipitationValues.get(yr+'08_'+yr+'08').getInfo()[0];
        var sept = precipitationValues.get(yr+'09_'+yr+'09').getInfo()[0];
       var rainfall2 = (may+june+july+aug+sept/5).toFixed(2);
        var rainfall =  ee.Number(may).add(june).add(july).add(aug).add(sept)
            precipList.push(ee.Number.parse(rainfall))
            precipList2.push(rainfall2)
        }else{
          precipList.push(0)
        }
      }  
}