// Land cover classification according to 
// IPCC top tier land cover classes
// Forest, cropland, grassland, wetland, 
// settlement, other land
var utils = require('projects/GLANCE:ccdcUtilities/utils')
// Globals
var classifier = ee.Classifier.randomForest(50)
var classifierName = 'RF'
var landsatShown = false
var fcs = {
  forest: {
    features: [],
    label: 1,
    color: 'green',
    fc: ee.FeatureCollection([null])
  },
  cropland: {
    features: [],
    label: 2,
    color: 'orange',
    fc: ee.FeatureCollection([null])
  },
  grassland: {
    features: [],
    label: 3,
    color: 'yellow',
    fc: ee.FeatureCollection([null])
  },
  wetland: {
    features: [],
    label: 4,
    color: 'cyan',
    fc: ee.FeatureCollection([null])
  },
  settlement: {
    features: [],
    label: 5,
    color: 'white',
    fc: ee.FeatureCollection([null])
  },
  otherland: {
    features: [],
    label: 6,
    color: 'black',
    fc: ee.FeatureCollection([null])
  },
}
var index = 0
var currentClass = Object.keys(fcs)[index]
var geo; 
var startDate;
var endDate;
var bands = ["BLUE","GREEN","RED","NIR","SWIR1","SWIR2"]
var palette = ['green','orange','yellow','cyan','white','black']
// Visualization parameters
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '590px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'left'
  }
//// Main Panel
var mainPanel = ui.Panel({style: {width: '600px'}})
.add(ui.Label('LC Classsification',visLabels))
ui.root.add(mainPanel)
// var addLayerToMap = function(index, fc, color, name)
// // Add fcs to map
Map.layers().set(0, null)
Map.layers().set(1, fcs.forest.fc.draw(fcs.forest.color))
Map.layers().set(2, fcs.cropland.fc.draw(fcs.cropland.color))
Map.layers().set(3, fcs.grassland.fc.draw(fcs.grassland.color))
Map.layers().set(4, fcs.wetland.fc.draw(fcs.wetland.color))
Map.layers().set(5, fcs.settlement.fc.draw(fcs.settlement.color))
Map.layers().set(6, fcs.otherland.fc.draw(fcs.otherland.color))
////////////////////////////////////////////////////////////////////////////////
// Data for Widgets
var classes = ['Forest','Cropland', 'Grassland', 'Wetland', 
  'Settlement', 'Other land']
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Make legends
var makeRow = function(color, name) {
  // Make a row of a legend
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var changeClass = function(selection) {
  index = classes.indexOf(selection)
  currentClass = currentClass = Object.keys(fcs)[index]
}
var addPoint = function(coords) {
  var latitude = coords.lat
  var longitude = coords.lon
  var label = fcs[currentClass].label
  geo = ee.Feature(ee.Geometry.Point([longitude, latitude])).set('label',label)
  fcs[currentClass].features.push(geo)
  fcs[currentClass].fc = fcs[currentClass].fc.merge(ee.FeatureCollection(geo))
  Map.layers().set(index+1, fcs[currentClass].fc.draw(fcs[currentClass].color))
}
var doClassification = function() {
  var fcToClassify = fcs.forest.fc.merge(
    fcs.cropland.fc).merge(
    fcs.grassland.fc).merge(
    fcs.wetland.fc).merge(
    fcs.settlement.fc).merge(
    fcs.otherland.fc)
  var landsat = getLandsat()
  var features = landsat.reduceRegions({
    collection: fcToClassify,
    reducer: ee.Reducer.mean(),
    scale: 180,
    tileScale: 16
  }).filter(ee.Filter.notNull(['BLUE']))
  var trained = classifier.train(features, 'label',landsat.bandNames())
  var classified = landsat.classify(trained)
  bands = ["BLUE","GREEN","RED","NIR","SWIR1","SWIR2"]
  Map.addLayer(classified, {min: 1, max: 6, palette: palette},'Classification ' + classifierName)
}
var changeClassifier = function(selection) {
  if (selection == 'Random Forest') {
    classifierName = 'RF'
    classifier = ee.Classifier.randomForest(100)
  } else if (selection == 'Naive Bayes') {
    classiferName = 'naiveBayes'
    classifier = ee.Classifier.naiveBayes()
  } else if (selection == 'SVM') {
    classifierName = 'SVM'
    classifier = ee.Classifier.svm()
  }
}
var showLandsat = function() {
  var landsat = getLandsat()
  // if (!landsatShown) {
  Map.layers().set(0, ui.Map.Layer(landsat, {bands: ["SWIR1","NIR","RED"], min: 0, max: [4000, 6000, 7000]}, 'Landsat Composite'))
    // landsatShown = true
  // }
}
var getLandsat = function() {
  var date = startDate.widgets().get(1).getValue()
  var date2 = endDate.widgets().get(1).getValue()
  getBands()
  var landsat = utils.inputs.getLandsat({start: date, end: date2 })
    .filterDate(date, date2)
    .median()
  return landsat
}
var getBands = function() {
  var bandsToAdd = []
  var ndvi = inputs1.widgets().get(0).getValue()
  var nbr = inputs1.widgets().get(1).getValue()
  var evi = inputs1.widgets().get(2).getValue()
  var brightness = inputs2.widgets().get(0).getValue()
  var greenness = inputs2.widgets().get(1).getValue()
  var wetness = inputs2.widgets().get(2).getValue()
  if (ndvi) {
    bandsToAdd.push('NDVI')
  }
  if (evi) {
    bandsToAdd.push('EVI')
  }
  if (nbr) {
    bandsToAdd.push('NBR')
  }
  if (brightness) {
    bandsToAdd.push('BRIGHTNESS')
  }
  if (wetness) {
    bandsToAdd.push('WETNESS')
  }
  if (greenness) {
    bandsToAdd.push('GREENNESS')
  }
  bands = bands.concat(bandsToAdd)
}
////////////////////////////////////////////////////////////////////////////////
// Functions for widgets
////////////////////////////////////////////////////////////////////////////////
// Panels and widgets
var selectClass = ui.Panel(
  [
    ui.Label({value:'Add training points', style:{color:'red'}}),
    ui.Select({items: classes,
              placeholder: 'Forest',
              value: null, 
              onChange: changeClass}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var selectClassifier = ui.Panel(
  [
    ui.Label({value:'Select Classifier:', style:{color:'red'}}),
    ui.Select({items: ['Random Forest','Naive Bayes','SVM'],
              placeholder: 'Random Forest',
              value: null, 
              onChange: changeClassifier}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
startDate = ui.Panel(
  [
    ui.Label({value:'Select Start Date:', style:{color:'red'}}),
    ui.Textbox('2018-01-01','2018-01-01') 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
endDate = ui.Panel(
  [
    ui.Label({value:'Select End Date:', style:{color:'red'}}),
    ui.Textbox('2019-01-01','2019-01-01') 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var doClassification = ui.Panel(
  [ ui.Button('Show Landsat Inputs',showLandsat),
    ui.Button('Run Classification',doClassification) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var inputs1 = ui.Panel(
  [
    ui.Checkbox('NDVI',false),
    ui.Checkbox('NBR',false),
    ui.Checkbox('EVI',false),
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var inputs2 = ui.Panel(
  [
    ui.Checkbox('BRIGHTNESS',false),
    ui.Checkbox('GREENNESS',false),
    ui.Checkbox('WETNESS',false),
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
// Load panel
var loadPanel = ui.Panel({
  style: {position: 'bottom-left', width: '250px', shown: true}
});
loadPanel.add(ui.Label('Loading...'))
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Legend
var legend = ui.Panel({style: {shown: true, width: '250px', padding: '4px 4px 4px 10px',}});
mainPanel.add(ui.Label('Instructions: Add select land cover class in drop down, add training points by clicking on map, select time interval, classifier, and optional spectral indices. Click Show Landsat Inputs to visualize the map to classify. The run the classification. '))
mainPanel.add(selectClass)
mainPanel.add(startDate)
mainPanel.add(endDate)
mainPanel.add(selectClassifier)
mainPanel.add(doClassification)
mainPanel.add(ui.Label('Add Indices:',visLabels))
mainPanel.add(inputs1)
mainPanel.add(inputs2)
mainPanel.add(ui.Label('Legend',visLabels))
mainPanel.add(legend)
legend.add(makeRow(palette[0], classes[0]))
legend.add(makeRow(palette[1], classes[1]))
legend.add(makeRow(palette[2], classes[2]))
legend.add(makeRow(palette[3], classes[3]))
legend.add(makeRow(palette[4], classes[4]))
legend.add(makeRow(palette[5], classes[5]))
legend.style().set({shown: true})
Map.centerObject(ee.Geometry.Point([102.801, -1.915]), 9)
Map.setOptions("SATELLITE")
Map.style().set('cursor','crosshair')
Map.onClick(addPoint)