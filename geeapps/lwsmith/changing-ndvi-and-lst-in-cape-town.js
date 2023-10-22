// Final Project UI
// Liam Smith
// GEOG 150
// ---------------------------------------------------------------
// Creating User Interface for Final App
// ---------------------------------------------------------------
// Load modules.
var customBase = require('users/jhowarth/eePrimer:modules/darkBase.js');
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
var palettes = require('users/gena/packages:palettes');
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
// print('Test styles', testLabel.style().set(labelStyles.titleStyle))
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Changes in Green Space and Land Surface Temperature Anomalies in Cape Town over Time',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'This project illustrates how urban growth in Cape Town over the last 30 years has altered green space, and in turn, temperature anomalies within the city. Higher concentrations of green space and lower land surface temperatures are indicative of better living conditions.',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'Swipe left or right to see how green space and heat anomalies have changed over time. Select different layers to visualize a different theme. Note that you must swipe such that the layers panel is located within a given image in order to toggle between layers for that image.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1Zb_XUejppad78GCMY7kdyg3WXa0KvJDo-TcMmB2Hg5s/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Liam Smith\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: '1984-1994',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: '2019-2021',
  style: labelStyles.mapLabelStyle
  }
);
rightLabel.style().set({
  textAlign: 'right',
  position: 'bottom-right',
});
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
leftMap.setOptions('darkBase', {'darkBase': customBase.darkBase});
leftMap.add(leftLabel);
var rightMap = ui.Map({          // Map panel.
  style:
    {
      height: '95%'
    }
  }
);    
rightMap.setOptions('darkBase', {'darkBase': customBase.darkBase});
rightMap.add(rightLabel);
// Initialize swipe panel.
var splitMap = ui.SplitPanel(           // Initialize split panel.
  leftMap,                              // Put on left side of panel.
  rightMap,                             // Put on right side of panel.
  'horizontal',                         // Arrange split in horizontal direction.
  true                                  // Make a SWIPE transition.
  )
;
// Link our maps together. so that if we change the scale on one we change the scale of both
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
config.poi = [18.4241, -33.9249];
config.zoom = 9.75;
// ---------------------------------------------------------------
// Add images as assets
// ---------------------------------------------------------------
config.ndvi_1984 = ee.Image('users/lwsmith/NDVI_1984-1994');
config.ndvi_2021 = ee.Image('users/lwsmith/NDVI_2019-2021');
config.temp_1984 = ee.Image('users/lwsmith/Difference_from_average_temp_1984-1994');
config.temp_2021 = ee.Image('users/lwsmith/Difference_from_average_temp_2019-2021');
// Make visualization parameters.
config.ndvi_viz = {
  min: 0.1,
  max: 0.5,
  palette: ['#2B2B2B', '#2EE62E']
};
config.diff_viz = {
  min:-10,
  max:10,
  palette:palettes.crameri.vik[25]};
// Function to set center and add layers to map.
leftMap.setCenter(config.poi[0], config.poi[1], config.zoom);
rightMap.setCenter(config.poi[0], config.poi[1], config.zoom);
leftMap.addLayer(
  config.temp_1984,
  config.diff_viz,
  'Difference from average temp, 1984-1994');
leftMap.addLayer(
  config.ndvi_1984,
  config.ndvi_viz,
  'NDVI 1984-1994');
rightMap.addLayer(
  config.temp_2021,
  config.diff_viz,
  'Difference from average temp, 2019-2021');
rightMap.addLayer(
  config.ndvi_2021,
  config.ndvi_viz,
  'NDVI 2019-2021');
// Add legends
var legend = cart                                                     // module
  .makeGradientLegend(                                                // function
    config.ndvi_viz,                                                         // viz parameters
    'Mean NDVI',                                                    // legend title. \n creates new line
    'bottom-left'                                                     // position on map
  )
;
sidePanel.insert(1, legend);
var legend2 = cart                         // module
  .makeGradientLegend                     // function
    (                
      config.diff_viz,                            // viz parameters
      'Difference from average summer \nmonth temperatures (F)',            // legend title
      'bottom-left'                       // position on map
    )
;
sidePanel.insert(1, legend2);