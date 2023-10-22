var train = ui.import && ui.import("train", "table", {
      "id": "users/pramod00/training_buffer"
    }) || ee.FeatureCollection("users/pramod00/training_buffer"),
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/Jyoti/Mangalore"
    }) || ee.FeatureCollection("users/Jyoti/Mangalore");
var collection = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(roi)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10));
Map.setOptions('SATELLITE');
Map.addLayer(roi,{},'ROI');
var l = ee.List([0,1,2,3,4,5,6]);
var n = ee.List(['Open Forest','Closed Forest','Water','Low Vegetation','Barren Land','Built-up','Agriculture']);
var p = ee.List(['green', '807c00', 'blue', '14ff5c', 'yellow','red','pink']);
Map.drawingTools().setShown(false);
Map.centerObject(roi);
var getClassified = function(image)
{
  var bands = ['B2','B3','B4','B8','B11','B12'];
  var training = image.select(bands).sampleRegions(
    {
      collection: train,
      properties:['class'],
      scale:10
    });
  var classifier = ee.Classifier.smileRandomForest(10).train(
    {
      features: training,
      classProperty: 'class',
      inputProperties: bands
    });
  var classified = image.select(bands).classify(classifier);
  return classified;
};
var showLayer = function(year)
{
  Map.layers().reset();
  Map.addLayer(roi,{},'ROI');
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = collection.filterDate(dateRange).median().clip(roi);
  var cl_img = getClassified(image);
  Map.addLayer({
    eeObject: ee.Image(cl_img),
    visParams: {
      min: 0,
      max: 6,
      palette:['green', '807c00', 'blue', '14ff5c', 'yellow','red','pink']
    },
    name: String(year)
  });
  cl_img=cl_img.set('class_values',l).set('class_names',n).set('class_colors',p);
  var lookup_names = ee.Dictionary.fromLists(
    ee.List(cl_img.get('class_values')).map(ee.String),
    cl_img.get('class_names'));
  var lookup_palette = ee.Dictionary.fromLists(
    ee.List(cl_img.get('class_values')).map(ee.String),
    cl_img.get('class_colors'));
  var area_image = ee.Image.pixelArea().addBands(cl_img.select('classification'));
  var reduction = area_image.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'class_value',
  }),
  geometry: roi,
  scale: 10,
  bestEffort: true,
  });
  var roi_stats = ee.List(reduction.get('groups'));
  function createFeature(class_stats) 
  {
  class_stats = ee.Dictionary(class_stats);
  var class_number = class_stats.get('class_value');
  var h = class_stats.get('sum')
  var result = {
      class_number: class_number,
      class_name: lookup_names.get(class_number),
      class_palette: lookup_palette.get(class_number),
      area_h: h
  };
  return ee.Feature(null, result);   // Creates a feature without a geometry.
  }
  var fc = ee.FeatureCollection(roi_stats.map(createFeature));
  var chart = ui.Chart.feature.byFeature({
    features: fc,
    xProperty: 'class_name',
    yProperties: ['area_h', 'class_number']
  })
  .setChartType('PieChart')
  .setOptions({
    title: 'Class Areas',
    backgroundColor:'grey',
    // slices: createPieChartSliceDictionary(fc),
    sliceVisibilityThreshold: 0  // Don't group small slices.
  });
  toolPanel.widgets().set(4,chart);
};
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
var header = ui.Label('LULC - Dakshin Kannada, Karnataka', {fontSize: '24px', color: 'red',backgroundColor:'black'});
var text = ui.Label(
    'This application is used to visualize the Land Use Land Cover Classification map for Dakshin Kannada district from year 2015 to 2019. It also gives the percentage of area wise distribution of each class in the district for the selected year.',
    {fontSize: '20px',backgroundColor:'black',color:'yellow'});
var text2 = ui.Label(
    'Slide through the year to see the results',
    {fontSize: '15px',backgroundColor:'black',color:'pink'});
var toolPanel = ui.Panel([header, text,text2], 'flow', {width: '600px',backgroundColor:'black'});
ui.root.widgets().add(toolPanel);
var slider = ui.Slider({
  min: 2015,
  max: 2019,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal',backgroundColor:'black',color:'white'}
});
toolPanel.add(slider);
// toolPanel.add(ui.Label('[Chart]'));
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'LULC',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette =['green', '807c00', 'blue', '14ff5c', 'yellow','red','pink'];
var names = ['Open Forest','Closed Forest','Water','Low Vegetation','Barren Land','Built-up','Agriculture'];
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  } 
Map.add(legend);