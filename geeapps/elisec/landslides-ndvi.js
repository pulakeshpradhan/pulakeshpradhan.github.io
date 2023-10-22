/*
Title: Landslides
Author: Elise Chan
Last updated: 2/2/2022
Purpose: Use NDVI to visualize landslides before and after the slide occurred.
Case studies:
Oso Landslide
  -121.848,48.28256
  March 22, 2014
West Salt Creek Landslide
  -107.84933,39.170
  May 25, 2014
*/
// Load modules.
// ------------------------------
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
var imageTools = require('users/jhowarth/eePrimer:modules/image_tools.js');
// MAP UI
// ------------------------
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
// print('Test styles', testLabel.style().set(labelStyles.titleStyle));
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'NDVI of Landslide Sites',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'This app was created to visualize landslides using accessible and broad datasets of Earth Engine. NDVI is used because of the contrast with which the scars of past landslides appear, and combined with other factors, can be an indicator of an unstable slope pre-landslide. ',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'Choose a landslide from the dropdown box. Use the slider to view the vegetation cover of the landscape before and after the landslide occurred.\nTo view the layers on the left map, move slider to far right side of screen.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1exkUcs9RUijw4wRqsEoBZNweXbbUz0aF2ge7lP7arN0/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Elise Chan\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: 'Before landslide',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: 'After landslide',
  style: labelStyles.mapLabelStyle
  }
);
rightLabel.style().set({
  textAlign: 'right',
  position: 'bottom-right',
});
// print(title);
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
leftMap.setOptions('SATELLITE');
leftMap.add(leftLabel);
var rightMap = ui.Map({          // Map panel.
  style:
    {
      height: '95%'
    }
  }
);    
rightMap.setOptions('SATELLITE');
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
var sidePanel = ui.Panel(        // Side panel
  {
  widgets: [
    abstract, // position 0
    instructions, // position 1
    storyLink, // etc
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
config.poi = ee.Geometry.Point([-121.848,48.28256]);
config.zoom = 13;
// Put images stored as assets into a config dictionary.
// Oso imagery
config.ndvi_oso_t1 = ee.Image('users/elisec/oso_before_ndvi');
config.ndvi_oso_t2 = ee.Image('users/elisec/oso_after_ndvi');
config.l8_oso_t1 = ee.Image('users/elisec/oso_before_l8');
config.l8_oso_t2 = ee.Image('users/elisec/oso_after_l8');
// WSC imagery
config.ndvi_wsc_t1 = ee.Image('users/elisec/wsc_before_ndvi');
config.ndvi_wsc_t2 = ee.Image('users/elisec/wsc_after_ndvi');
config.l8_wsc_t1 = ee.Image('users/elisec/wsc_before_l8');
config.l8_wsc_t2 = ee.Image('users/elisec/wsc_after_l8');
// Create a image collections from images.
// Image collection of left panel (before images).
var ic_left = ee.ImageCollection.fromImages([
  config.ndvi_oso_t1,
  config.l8_oso_t1,
  config.ndvi_wsc_t1,
  config.l8_wsc_t1
  ]
)
;
// Image collection of right panel (after images).
var ic_right = ee.ImageCollection.fromImages([
  config.ndvi_oso_t2,
  config.l8_oso_t2,
  config.ndvi_wsc_t2,
  config.l8_wsc_t2
  ]
)
;
// Set visual parameters for NDVI.
var ndvi_viz = {
  min: -0.8,
  max: 0.8,
  palette: ['#E62E8A', '#2B2B2B', '#2EE62E'] // min, zero, and max colors
};
// Set visual parameters for Landsat.
var l8_viz = {
  bands:['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 0.3,
};
// Make legend.
// ---------------------------------------
var legend = cart                                                     // module
  .makeGradientLegend(                                                // function
    ndvi_viz,                                                         // viz parameters
    'NDVI of study areas:\nan index of green vegetation',    // legend title
    'bottom-left'                                                     // position on map
  )
;
sidePanel.insert(1, legend);
// Add images to map as layers.
// -----------------------------------------
// Function to set center and add layers to map.
var updateMap = function() {
  leftMap.setOptions('SATELLITE');
  leftMap.centerObject(config.poi, config.zoom);
    leftMap.layers().set(
    0,
    ui.Map.Layer(
      ic_left.filterBounds(config.poi).sort('system:index',false).first(), // take second item in ic with poi
      l8_viz,
      'Before landslide (true color)',
      true));
  leftMap.layers().set(
    1,
    ui.Map.Layer(
      ic_left.filterBounds(config.poi).first(),
      ndvi_viz,
      'Before landslide (NDVI)',
      true));
    rightMap.layers().set(
    0,
    ui.Map.Layer(
      ic_right.filterBounds(config.poi).sort('system:index',false).first(), // take second item in ic with poi  
      l8_viz,
      'After landslide (true color)',
      true)
      );
  rightMap.layers().set(
    1,
    ui.Map.Layer(
      ic_right.filterBounds(config.poi).first(),
      ndvi_viz,
      'After landslide (NDVI)',
      true)
      );
};
updateMap();
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
    'Oso Landslide, WA': [-121.848,48.28256, 13],
    'West Salt Creek Landslide, CO': [-107.8548, 39.1831, 13],
  }
;
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a landslide',
  style: selectStyles,
  onChange: function(key) {
    config.poi = ee.Geometry.Point([places[key][0],places[key][1]]);
    config.zoom = places[key][2];
    updateMap();
  }
});
sidePanel.insert(3, selectPlaces);