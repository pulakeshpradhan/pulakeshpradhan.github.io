var geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
// App to visualize and explore CODED results/* ////////////////////////////////////////////////////////////////
// // Utility functions
// var codedUtils = require('users/bullocke/coded:coded/changeDetection')
// var dataUtils = require('users/bullocke/coded:coded/dataUtils')
// Globals
var result = null
var band = 'post_1'
var bandName = 'Disturbance Type'
var geo = null
var vizParam = {min: 0, max: 10, palette: ['#333333', 'cyan','red','red','red','red','red','red','red','red','red']}
var mask = null
var nonMasked = null
var showFor = false
var extra, extraParams, extraLayer, extraName = null
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
var style = require('users/bullocke/amazon:figures/style')
var darkStyle = style.darkStyle
var newMap = ui.Map().setOptions('Dark',darkStyle)
var mainPanel = ui.Panel({style: {width: '600px'}})
.add(ui.Label('PRELIMINARY CODED Results in Indonesia 2010-2018',visLabels))
var splitPanel = ui.SplitPanel(newMap, mainPanel)
ui.root.clear()
ui.root.add(splitPanel)
////////////////////////////////////////////////////////////////////////////////
// Data for Widgets
var indonesiaCol = ee.ImageCollection([
  ee.Image("projects/AREA2/bullocke/indonesia/Indonesia_CODED_2010_2018"),
  ee.Image("users/bullockebu/CODED_Java_2010_2018"),
  ee.Image("users/bullockebu/CODED_Sumatra_2010_2018")]).select(['dist_1','dist_2','mag_1','mag_2','post_1','post_2']).mosaic()
var resultItems = [
  ee.Image("projects/AREA2/bullocke/indonesia/Indonesia_CODED_2010_2018"),
  ee.Image("users/bullockebu/CODED_Java_2010_2018"),
  ee.Image("users/bullockebu/CODED_Sumatra_2010_2018")
  ]
var resultNames = [
  'Kalimantan','Java','Sumatra']
var extraLayers = [
  '',
  ee.FeatureCollection('WCMC/WDPA/current/polygons'),
  ee.Image('UMD/hansen/global_forest_change_2018_v1_6').select('lossyear').selfMask().add(2000)]    
var extraLayerNames = [
   'None',
  'World Database Protected Areas',
  'Hansen Loss Year',]
  //'JRC Water Occurence']
var extraParamList = [
  {}, 
  {color: 'red'},
  {min: 2001, max: 2018, palette: ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']},
]
var bandItems = [
  'dist_1',
  'post_1',
  'mag_1',
]
var bandNames = [
  'Disturbance Year',
  'Disturbance Type',
  'Disturbance Magnitude']
var bandParams = [
  {min: 2009, max: 2018, palette: ['#333333', '#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']},
  {min: 0, max: 10, palette: ['#333333', 'cyan','red','red','red','red','red','red','red','red','red']},
  {min: 10, max: 100, palette: ['#333333', '#f1eef6','#d7b5d8','#df65b0','#ce1256']},
]
var palsarFNF = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
var hansenCanCover = ee.Image('UMD/hansen/global_forest_change_2018_v1_6').select('treecover2000')
var forestNames = [
  'No Mask',
  'PALSAR-2 F/NF 2007',
  'PALSAR-2 F/NF 2008',
  'PALSAR-2 F/NF 2009',
  'PALSAR-2 F/NF 2010',
  'PALSAR-2 F/NF 2015',
  'PALSAR-2 F/NF 2016',
  'PALSAR-2 F/NF 2017',
  'Hansen Forest Cover (10%)',
  'Hansen Forest Cover (30%)',
  'Hansen Forest Cover (50%)',
  'Hansen Forest Cover (70%)',
  'Hansen Forest Cover (90%)']
var forestImages = [
  '',
  palsarFNF.filterMetadata('system:index','equals','2007').first(),
  palsarFNF.filterMetadata('system:index','equals','2008').first(),
  palsarFNF.filterMetadata('system:index','equals','2009').first(),
  palsarFNF.filterMetadata('system:index','equals','2010').first(),
  palsarFNF.filterMetadata('system:index','equals','2015').first(),
  palsarFNF.filterMetadata('system:index','equals','2016').first(),
  palsarFNF.filterMetadata('system:index','equals','2017').first(),
  hansenCanCover.gt(10),
  hansenCanCover.gt(30),
  hansenCanCover.gt(50),
  hansenCanCover.gt(70),
  hansenCanCover.gt(90)]
var legends = [
  ['#fed976','#fd8d3c','#bd0026'],
  ['grey','cyan','red'],
  ['#f1eef6','#df65b0','#ce1256'],
  ]
var legendValues = [
  [2010, 2014, 2018],
  ['No Change','Degradation','Deforestation'],
  ['Low','Medium','High'], 
  ]
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
var addLegend = function(list, values, label) {
  // Add the legend to the map
  legend.clear()
  legend.add(ui.Label(label + ':'))
  legend.add(makeRow(list[2], values[2]))
  legend.add(makeRow(list[1], values[1]))
  legend.add(makeRow(list[0], values[0]))
  legend.style().set({shown: true})
}
////////////////////////////////////////////////////////////////////////////////
// Functions for widgets
var changeMap = function(col, band, vizParams, bandName, geom) {
  newMap.layers().reset()
  if (showFor) {
    newMap.addLayer(mask.eq(1).selfMask(), {palette: ['#006400']}, 'Forest Mask')
  }
  if (extra) {
    newMap.addLayer(extraLayer, extraParams, extraName, true, .8)
  }
  newMap.addLayer(col.select(band), vizParams, bandName)
  if (geom) {
    newMap.centerObject(col)
  }
}
var changeresult = function(selection, chart) {
  newMap.add(loadPanel)
  ee.String(selection).evaluate(function(obj) {
    maskPanel.widgets().get(1).setDisabled(false)
    var index = resultNames.indexOf(obj)
    result = resultItems[index]
    nonMasked = resultItems[index]
    if (mask) {
      result = result.multiply(mask.eq(1))
    }
    changeMap(result, band, vizParam,bandName, true)
    newMap.remove(loadPanel)
  })
}
var changeBand = function(selection, chart) {
  newMap.add(loadPanel)
  ee.String(selection).evaluate(function(obj) {
    var index = bandNames.indexOf(obj)
    band = bandItems[index]
    bandName = obj
    vizParam = bandParams[index]
    // Legend
    var legNumbs = legendValues[index]
    var legList = legends[index]
    addLegend(legList, legNumbs, bandName)
    if (!result) {
      newMap.remove(loadPanel)
      return
    }
    changeMap(result, band, vizParam,bandName, false)
    newMap.remove(loadPanel)
  })
}
var addExtra = function(selection, value) {
  newMap.add(loadPanel)
  ee.String(selection).evaluate(function(obj) {
    var index = extraLayerNames.indexOf(obj)
    if (index == 0) {
      extra = null
      changeMap(result, band, vizParam,bandName, false)
      newMap.remove(loadPanel)
      return
    }
    extra = true
    extraLayer = extraLayers[index]
    extraName = obj
    extraParams = extraParamList[index]
    if (result) {
      changeMap(result, band, vizParam,bandName, false)
    } else {
      newMap.addLayer(extraLayer, extraParams, extraName)
    }
    newMap.remove(loadPanel)
  })
}
var changeMask= function(selection, chart) {
  newMap.add(loadPanel)
  ee.String(selection).evaluate(function(obj) {
    maskCheckBox.widgets().get(0).setDisabled(false)
    var index = forestNames.indexOf(obj)
    if (!result) {
      return
    }
    if (index > 0) {
      mask = forestImages[index]
      result = result.multiply(mask.eq(1))
      changeMap(result, band, vizParam,bandName, false)
    } else {
      maskCheckBox.widgets().get(0).setDisabled(true)
      mask = null
      result = nonMasked
      changeMap(result, band, vizParam,bandName, false)
    }
    newMap.remove(loadPanel)
  })
}
var displayForest = function(selection, chart) {
  if (selection) {
    showFor = true
    changeMap(result, band, vizParam,bandName, false)
  }
  else {
    showFor = false
    changeMap(result, band, vizParam,bandName, false)
  }
}
////////////////////////////////////////////////////////////////////////////////
// Panels and widgets
var resultPanel = ui.Panel(
  [
    ui.Label({value:'CODED Results:', style:{color:'red'}}),
    ui.Select({items: resultNames,
               placeholder: 'Select Island',
               value: null, 
               onChange: changeresult}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Widget 2: Band selection 
var bandPanel = ui.Panel(
  [
    ui.Label({value:'CODED Layer:', style:{color:'red'}}),
    ui.Select({items: bandNames,
               placeholder: 'Disturbance Type',
               value: null, 
               onChange: changeBand}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Widget 3: Forest/Non-Forest Mask
var maskPanel = ui.Panel(
  [
    ui.Label({value:'Apply Forest Mask:', style:{color:'red'}}),
    ui.Select({items: forestNames,
               placeholder: 'No Mask',
               value: 'No Mask', 
               onChange: changeMask,
               disabled: true
    }) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Widget 4: Show forest
var maskCheckBox = ui.Panel(
  [
    ui.Checkbox({label: 'Show Forest Mask',
              value: false,
              onChange: displayForest,
              disabled: true
    }) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Widget 5: Extra layers
var extraPanel = ui.Panel(
  [
    ui.Label({value:'Add extra layers:', style:{color:'red'}}),
    ui.Select({items: extraLayerNames,
               placeholder: '',
               value: null, 
               onChange: addExtra}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Load panel
var loadPanel = ui.Panel({
  style: {position: 'bottom-left', width: '250px', shown: true}
});
loadPanel.add(ui.Label('Loading...'))
////////////////////////////////////////////////////////////////////////////////
// Legend
var legend = ui.Panel({style: {shown: false, width: '250px'}});
// legend.style().set({position: 'bottom-right'});
addLegend(['grey','cyan','red'], ['No Change','Degradation','Deforestation'], 'First Disturbance Type')
mainPanel.add(resultPanel)
mainPanel.add(bandPanel)
mainPanel.add(maskPanel)
mainPanel.add(maskCheckBox)
mainPanel.add(extraPanel)
mainPanel.add(ui.Label('Legend',visLabels))
mainPanel.add(legend)
newMap.centerObject(ee.Geometry.Point([115.054, -0.168]), 4)
// resultPanel.widgets().get(1).getValue()