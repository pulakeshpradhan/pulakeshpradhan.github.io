//Burrowing Owl Habitat Loss
//GG150 Final Project
//SK Hurlock
//February 4, 2022
//This project will explore burrowing owl habitat loss on the California coast between
//1984 and 2017 through an anaysis of landcover change from suitable to unsuitable habitat.
// ---------------------------------------------------------------
// UI FORMATTING
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// Make style dictionaries for label hierarchy.
// ---------------------------------------------------------------
// Dictionary for sans and serif pairing.
var labelMaster = {
  font:
    {
      sans: 'Helvetica, sans-serif',
      serif: 'Georgia, serif'
    },
  align:
    {
        padding: '12px',
        margin: '4px',  
        position: 'top-left',
    }
};
// Dictionary for label styles.
//type taxonomy 
//label hierarchy
//title, abstract, instructions, credits, map labels
var labelStyles = {
  titleStyle:
    {
      padding: '12px 16px 12px 16px',
      margin: '0 px',
      backgroundColor: '444444',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  abstractStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '14px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.serif,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  instructionStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: 'black',
      fontSize: '12px',
      fontWeight: 'normal',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'wrap',
      stretch: 'horizontal'
    },
  creditStyle:
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: '#656665',
      fontSize: '10px',
      fontWeight: '400',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'pre',
      stretch: 'horizontal'
    },
  mapLabelStyle:
    {
      // padding: labelMaster.align.padding,
      // margin: '0px 40px 0px 40px',
      color: 'white',
      backgroundColor: '#666666',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: labelMaster.font.sans,
      whiteSpace: 'wrap',
      stretch: 'horizontal',
      height: '30px',
    }
  }
;
//print('Test styles', testLabel.style().set(labelStyles.mapLabelStyle))
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Burrowing Owl Habitat Loss',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'Burrowing Owl populations in the state of California have been slowly declining since the 1940s. The California Department of Fish and Game reports significant habitat loss along the central and southern California coast, particularly in the foothills surrounding Santa Monica and nearby valleys. This map analyzes the causes of that habitat loss, which appear to be due to a combination of urban development and a transition in vegetative cover from desert and barren land to more thickly vegetated grasslands and tree covered areas.',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'To zoom in on areas that have undergone significant landcover change, select locations from the drop down menu.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1Az0x-Qh7X6-vm_sWff3aekYKlMRhq34Ub_OZUHSWtlY/edit'
  }
);
var credits = ui.Label({
  value: 'SK Hurlock\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: '1984',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: '2017',
  style: labelStyles.mapLabelStyle
  }
);
rightLabel.style().set({
  textAlign: 'right',
  position: 'bottom-right',
});
//print(title);
// ---------------------------------------------------------------
// Make root panel.
// ---------------------------------------------------------------
// Configure the layouts to define how the panels flow.
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
// Compose panels.
var rootPanel = ui.Panel(                         // Highest-level container.
  {                      
    layout: ui.Panel.Layout.flow('horizontal'),   
    style:
      {
        height: '100%',
        width: '100%'
      }
  }
); 
// ---------------------------------------------------------------
// Initialize the map panels and swipe layout.
// ---------------------------------------------------------------
// Initialize two maps for swipe panel.
var leftMap = ui.Map({          // Map panel.
  style:
    {
      height: '95%'
    }
  }
);    
leftMap.setOptions('TERRAIN');
leftMap.add(leftLabel);
var rightMap = ui.Map({          // Map panel.
  style:
    {
      height: '95%'
    }
  }
);    
rightMap.setOptions('TERRAIN');
rightMap.add(rightLabel);
// Initialize swipe panel.
var splitMap = ui.SplitPanel(           // Initialize split panel.
  leftMap,                              // Put on left side of panel.
  rightMap,                             // Put on right side of panel.
  'horizontal',                         // Arrange split in horizontal direction.
  true                                  // Make a SWIPT transition.
  )
;
// Link our maps together.
ui.Map.Linker([
    leftMap,
    rightMap
  ])
;
// Initialize a map panel (because you can not add a split panel to a split panel).
var mapPanel = ui.Panel({          // Map panel.
  style:
    {
      stretch: 'vertical'
    }
  }
);             
mapPanel
  .add(splitMap);                 // Add swipe map to map panel.
// ---------------------------------------------------------------
// Make side panel.
// ---------------------------------------------------------------
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [
    abstract,
    instructions,
    storyLink,
    credits],
  layout: ui.Panel.Layout.flow('vertical'),
  style:
    {
      position: 'top-left',
      height: '90%',
      width: '20%',
      // padding: '10px',
      // margin: '10px',
     // backgroundColor: '#cccccc',
      // border:'4px solid orange',
      shown: true
    }
  }
);
// ---------------------------------------------------------------
// Compose layout.
// ---------------------------------------------------------------
// Initialize split layout.  
var splitLayout = ui.SplitPanel(        // Split panel.      
  sidePanel,                            // Add side panel to left side.
  mapPanel,                             // Add map panel (with swipe map) to right side.
  'horizontal',                         // Make split in horizontal direction.  
  false                                 // Do NOT make swipe transition for split screen.  
);
ui.root.clear();
ui.root.add(title);
ui.root.add(rootPanel);
rootPanel.add(splitLayout);
// ---------------------------------------------------------------
// Make config dictionary
// ---------------------------------------------------------------
var config = {};
// Set initial map center and zoom
config.poi = [-120.444538, 34.950172];
config.zoom = 10;
var point = ee.Geometry.Point(-120.444538, 34.950172);
// ---------------------------------------------------------------
// Add L5 filtered dataset 
// ---------------------------------------------------------------
var L5 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
    .filterBounds(point)
    .filterDate('1984-01-01', '1984-07-01')
    .map(applyScaleFactors)
    .median();
print (L5);
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}
var viz_L5 = {
  bands: ['SR_B7', 'SR_B4', 'SR_B3'],
  min: 0.0,
  max: 0.3,
};
// Map.centerObject(dataset);
//leftMap.addLayer(L5, viz_L5, "1984");
print(L5);
// ---------------------------------------------------------------
// Add L8 filtered dataset 
// ---------------------------------------------------------------
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
var L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(point)
  .filterDate('2017-01-01', '2017-12-31')
  .map(applyScaleFactors)
  .median();
var viz_L8 = {
  bands: ['SR_B7', 'SR_B5', 'SR_B4'],
  min: 0.0,
  max: 0.3,
};
Map.centerObject(point, 10);
// // ---------------------------------------------------------------
// // Make a map key.
// // ---------------------------------------------------------------
// var cart = require('users/jhowarth/eePrimer:modules/cart.js');
 config.lc_palette = [
   '#90FF33',
   '#FAD7A0',
   '#7B9672',
];
 config.lc_labels = [
   'Trees or thick vegetation',
   'Desert or sparse vegetation (ideal habitat)',
   'Urban Development',
   ];
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
var legend = cart.makeLegend(
  'Land cover',
  config.lc_palette,
  config.lc_labels,
  'top-left')
;
sidePanel.insert(1, legend);
// // --------------------------------------------------------------------
// // Add Layers to Map 
// // --------------------------------------------------------------------
var updateMap = function() {
  leftMap.setCenter(config.poi[0], config.poi[1], config.zoom);
  leftMap.layers().set(
    0,
    ui.Map.Layer(
      L5, 
      viz_L5,
      '1984',
      true)
    );
   rightMap.layers().set(
     0,
     ui.Map.Layer(
      L8,
       viz_L8,
       '2017',
       true)
       );
 };
// updateMap()
//abstract is position 0
//instructions is position 1
//story link is position 2
//credits is position 3
//widgets are indexed 0-...
//insert legend in first position
// ---------------------------------------------------------------
// Make widget to move between study sites.
// ---------------------------------------------------------------
var selectStyles =
  {
    padding: labelMaster.align.padding,
    margin: labelMaster.align.margin,  
    stretch: 'horizontal'
  }
;
var places =
  {
    'Santa Maria, California': [-120.444538, 34.950172],
    'New Cuyama, California': [-119.7111, 34.945],
    'Valley Acres, California': [-119.4194, 35.2302],
  }
;
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    config.poi = places[key];
    config.zoom = 12;
    updateMap();
  }
});
sidePanel.insert(3, selectPlaces);
// ---------------------------------------------------------------
// Run update function.
// ---------------------------------------------------------------
updateMap();