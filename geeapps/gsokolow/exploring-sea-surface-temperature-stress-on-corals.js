//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Grace Sokolow
// UI Design: Coral Reefs and SST Threshold
// February 1, 2022
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// --------------------------------------------
// Initialize Config
var config = {
  poi: [34.4145713981605, 28.31077390734309],                         // default starting location
  zoom: 6,                                                            // default zoom level
  year_image: ee.Image('users/gsokolow/coral_temp_comparison_2020'),  // default temperature year image: 2020.
};
//----------------------------------------------
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
      fontFamily: labelMaster.font.sans,
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
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Temperature Stress & Coral Reefs',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'Warming ocean temperatures are threatening coral reefs worldwide, but some are faring better than others. Use this app to explore the distribution of living corals (a composite of data from 2018-2021) and the proportion of days where temperature is capable of causing stress to corals (data available on an annual basis 2003-2020).',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'Use the first dropdown menu to explore where corals live and the proportion of stress days they experience in their respective locations.\nUse the second dropdown menu to explore the proportion of sea surface temperature days capable of causing coral stress in different years.\nData for coral extent is from the years 2018-2021 and cannot be changed. \nSea surface temperature satellite images of the globe are captured every day or so.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1kg7ZztSVRgXHkaxkNMoCqWWBpNKqEPKyB6ctte3crIE/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Grace Sokolow\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: 'Reef Habitats 2018-2021',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: 'Frequency of Coral Stress Temperatures',
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
leftMap.setOptions('HYBRID');
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
// Make legends.
// ---------------------------------------------------------------
// Load cutom cart module.
var cart = require('users/gsokolow/GEOG150:modules/cart_legends');
// Set up Coral Reef Legend.
config.benthic_palette = [
  '000000',
  'ffffbe',
  'e0d05e',
  'b19c3a',
  '668438',
  'ff6161',
  '9bcc4f'
  ]
;
config.benthic_labels = [
  'Unmapped',
  'Sand',
  'Rubble',
  'Rock',
  'Seagrass',
  'Coral/Algae',
  'Microalgal Mats'
  ]
;
var coral_legend = cart.makeLegend(
  'Benthic Habitat',
  config.benthic_palette,
  config.benthic_labels,
  'top-left');
// Vis Params for SST
// ------------------
// Make visualization parameters.
config.sst_viz = {
  min: 0,
  max: 365,
  palette: ['white', 'red'],
};
var sst_legend = cart.makeGradientLegend(
  config.sst_viz,
  'Frequency of Coral Temperature Stress',
  'bottom-left'
  );
// Add legends to app
sidePanel.insert(1, coral_legend);
sidePanel.insert(2, sst_legend);
// ----------------------------------------------
// Prepare ACA Data
// ---------------------------------------------
// Load ACA dataset
config.coral = ee.Image("ACA/reef_habitat/v1_0");
// Create a benthic habitat layer
config.benthic_habitat = config.coral.select('benthic').selfMask();
// Mitch: The visualisations are baked into the image properties
// Write a function to set center and add layers to right and left maps.
var updateMap = function() {
  leftMap.setCenter(config.poi[0], config.poi[1], config.zoom);
  leftMap.setOptions('SATELLITE');
  leftMap.layers().set(
    0,
    ui.Map.Layer(
      config.benthic_habitat,
      {},
      'Benthic Habitat',
      true)
    );
  rightMap.setOptions('SATELLITE');
  rightMap.layers().set(
    0,
    ui.Map.Layer(
      config.year_image,                       
      config.sst_viz,
      'Frequency of Coral Stress Temperatures.',
      true)
      );
};
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
// Set up user selection of study site.
var places =
  {
    'Great Barrier Reef': [146.8023589369899, -18.28862011434946],
    'Red Sea': [34.4145713981605, 28.31077390734309],
    'Northern Caribbean': [-80.11695211748744, 23.785171100060715]
  }
;
var zoom = {                        
  'Great Barrier Reef': 7,
  'Red Sea': 8,
  'Northern Caribbean': 5
};
// Load SST Data by user selection.
var years = {
  '2003': ee.Image('users/gsokolow/coral_temp_comparison_2003'),
  '2004': ee.Image('users/gsokolow/coral_temp_comparison_2004'),
  '2005': ee.Image('users/gsokolow/coral_temp_comparison_2005'),
  '2006': ee.Image('users/gsokolow/coral_temp_comparison_2006'),
  '2007': ee.Image('users/gsokolow/coral_temp_comparison_2007'),
  '2008': ee.Image('users/gsokolow/coral_temp_comparison_2008'),
  '2009': ee.Image('users/gsokolow/coral_temp_comparison_2009'),
  '2010': ee.Image('users/gsokolow/coral_temp_comparison_2010'),
  '2011': ee.Image('users/gsokolow/coral_temp_comparison_2011'),
  '2012': ee.Image('users/gsokolow/coral_temp_comparison_2012'),
  '2013': ee.Image('users/gsokolow/coral_temp_comparison_2013'),
  '2014': ee.Image('users/gsokolow/coral_temp_comparison_2014'),
  '2015': ee.Image('users/gsokolow/coral_temp_comparison_2015'),
  '2016': ee.Image('users/gsokolow/coral_temp_comparison_2016'),
  '2017': ee.Image('users/gsokolow/coral_temp_comparison_2017'),
  '2018': ee.Image('users/gsokolow/coral_temp_comparison_2018'),
  '2019': ee.Image('users/gsokolow/coral_temp_comparison_2019'),
  '2020': ee.Image('users/gsokolow/coral_temp_comparison_2020')
};
// Create widget to allow for user selection of location.
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    config.poi = places[key];
    config.zoom = zoom[key];
    updateMap();
  }
});
// Create widget to allow for user selection of year.
var selectYear = ui.Select({
  items: Object.keys(years),
  placeholder: 'Choose a year to view temperature data',
  style: selectStyles,
  onChange: function(key) {
    config.year_image = years[key];
    updateMap();
  }
});
sidePanel.insert(2, selectPlaces);
sidePanel.insert(4, selectYear);
// ---------------------------------------------------------------
// Run update function.
// ---------------------------------------------------------------
updateMap();