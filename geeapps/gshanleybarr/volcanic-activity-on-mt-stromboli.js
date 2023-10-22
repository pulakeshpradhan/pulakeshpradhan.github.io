// Final Project
// Feb 1st, 2022
// Grayson Shanley Barr
// set requirements.
var customBase = require('users/jhowarth/eePrimer:modules/darkBase.js');
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
// Set basemap
Map.setOptions('darkBase', {'darkBase': customBase.darkBase});
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
// Initialize Labels 
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Mt. Stromboli, Italy: Assessing Impacts of Volcanic Activity on Vegetation',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({  // use wrap to ensure that it fits in there
  value: 'The normalized difference in vegetation index (NDVI) was calculated for the Mount Stromboli region in Italy for the two months prior and and the six weeks following a volcanic eruption in July 2019. Alongside NDVI, natural color, and false color imagery are used to visualize changes in vegetation following  volcanic activity. For both NDVI and false color images, regions that are bright green or red, respectively, have greater indices of healthy vegetation. In the long term volcanic ash offers beneficial nutrients for soil, creating productive agricultural land. However, in the short term, ash deposition from volcanic activity can cause ecological disturbances and disruption to vegetation that can lead to crop failure.',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'Use the layers feature to compare NDVI, natural color, and false color images of Mt. Stromboli before and after the July 2019 volcanic eruption. To change layers on the before panel, ensure that the swipe feature is swiped to the left corner. ',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1PL-W5_S7NJnQO5J9TXW2GEQq_B-PLmZkLJTm7MGKaTg/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Grayson Shanley Barr\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: 'Before Eruption',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: 'After Eruption',
  style: labelStyles.mapLabelStyle
  }
);
rightLabel.style().set({
  textAlign: 'right',
  position: 'bottom-right',
});
// print (title);
// ---------------------------------------------------------------
// Make root panel. 
// Widgets added to flow vertically. make white box to put everything on, wants to flow vertically, then yellow split panel 
// ---------------------------------------------------------------
// Configure the layouts to define how the panels flow.
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
// Compose panels.
var rootPanel = ui.Panel(                         // Highest-level container.
  {                      
    layout: ui.Panel.Layout.flow('horizontal'),   // layout in...
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
  true                                  // Make a SWIPE transition, reveal map underneath it
  )
;
// Link our maps together. will change scale on both maps 
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
//Set initial map center and zoom
config.poi = [15.21425737386369,38.78861364832301];
config.zoom = 14;
// Make a dictionary of poi.
var poi_dict = {
    'Mt. Stromboli, Italy': [15.21425737386369,38.78861364832301],
    'Mt. Taal, Phillipines': [120.99746635274109,14.009593240072684],
    'La Palma Volcano, Cayman Islands': [-61.18194812080567,13.334540336568585],
  }
;
// print('Points of interest', poi_dict);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  Load image data as stored assets in config dictionary
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Config dictionary of image assets
config.image_stromboli_beofre_ndvi_asset = ee.Image('users/gshanleybarr/Stromboli_before_ndvi');
config.image_stromboli_after_ndvi_asset = ee.Image('users/gshanleybarr/Stromboli_after_ndvi');
config.image_stromboli_after_asset = ee.Image('users/gshanleybarr/Stromboli_after');
config.image_stromboli_before_asset = ee.Image('users/gshanleybarr/Stromboli_before');
config.image_stromboli_before_fc_asset = ee.Image('users/gshanleybarr/Stromboli_before_fc');
config.image_stromboli_after_fc_asset = ee.Image('users/gshanleybarr/Stromboli_after_fc');
// Inspect asset image.
// print('Stromboli After', config.image_stromboli_after_asset);
// Create an image collection from images.config dictionaries for images
// Images for left panel
var ic_left = ee.ImageCollection.fromImages([
config.image_stromboli_beofre_ndvi_asset,
config.image_stromboli_before_asset,
config.image_stromboli_before_fc_asset
  ]
)
;
// Images for right panel
var ic_right = ee.ImageCollection.fromImages([
config.image_stromboli_after_ndvi_asset,
config.image_stromboli_after_asset,
config.image_stromboli_after_fc_asset
  ]
)
;
// Make visualization parameters.
config.ndvi_viz = {
  min: 0,
  max: 1,
  palette: ['#2B2B2B', '#2EE62E']
};
config.natural_viz = {
    bands: ['B4','B3','B2'],
    min: 0,
    max: 0.3
};
config.false_viz = {
      bands: ['B8', 'B4', 'B3'], 
      min: 0,
      max: 0.5
};
// Add images to map as layers.
// Function to set center and add layers to map.
// var updateMap = function() {
//  leftMap.setCenter(config.poi[0], config.poi[1], config.zoom);
//   leftMap.layers().set(             // filters map based on poi
//     0,
//     ui.Map.Layer(
//       ic_left.filterBounds(config.poi),  //.select('ndvi'),
//       config.s2_viz, 
//       'Before Eruption', // config.label
//       true)
//     );
//   rightMap.layers().set(
//     1,
//     ui.Map.Layer(
//       ic_right.filterBounds(config.poi), //.select('RGB'),
//       config.s2_viz,
//       'After Eruption',
//       true)
//       );
// };
// updateMap();
// Add images to map as layers.
leftMap.setCenter(config.poi[0], config.poi[1], config.zoom);
leftMap.addLayer(
    config.image_stromboli_before_fc_asset,
    config.false_viz,
    'Before Eruption False Color',
    false);
leftMap.addLayer(
    config.image_stromboli_before_asset,
    config.natural_viz,
    'Before Eruption',
    false);
leftMap.addLayer(
    config.image_stromboli_beofre_ndvi_asset,
    config.ndvi_viz,
    'Before Eruption NDVI',
    true);
rightMap.addLayer(
    config.image_stromboli_after_asset,
    config.false_viz,
    'After Eruption False Color',
    true)
  ;
rightMap.addLayer(
    config.image_stromboli_after_asset,
    config.natural_viz,
    'After Eruption',
    true)
  ;
rightMap.addLayer(
    config.image_stromboli_after_ndvi_asset,
    config.ndvi_viz,
    'After Eruption NDVI',
    true)
  ;
// Construct and add gradient legend
// // Construct legend with title 'Median NDVI' and placement in 'bottom-left'. 
var legend = cart                                                     // module, part of cart module, gradient legend, display legend when data values are continuous, can be any value in range
  .makeGradientLegend(                                                // function - two arguments, min max and pallatte
    config.ndvi_viz,                                                         // viz parameters
    'Mean NDVI',                                                      // legend title 
    'bottom-left'                                                     // position on map
  )
;
// // Place legend on map. 
sidePanel.insert(2, legend);
// ---------------------------------------------------------------
// Make widget to move between study sites.
// ---------------------------------------------------------------
var places =
  {
    'Mt. Stromboli, Italy': [15.21425737386369,38.78861364832301,13],
    'Mt. Taal, Phillipines': [120.99746635274109,14.009593240072684, 12],
    'La Palma Volcano, Spain': [-61.18194812080567,13.334540336568585, 12],
  }
;
print([places['Mt. Stromboli, Italy'][0]]);
// ---------------------------------------------------------------
// Make widget to move between study sites. --> items become keys to the dictionary 
// ---------------------------------------------------------------
var selectStyles =
  {
    padding: labelMaster.align.padding,
    margin: labelMaster.align.margin,  
    stretch: 'horizontal'
  }
;
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    config.poi = places[key];
    config.zoom = 13;
    updateMap();
  }
});
sidePanel.insert(3, selectPlaces);