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
// print('Test', testLabel.style().set(labelStyles.titleStyle));
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Effects of the California Drought on the Mt. Shasta region in 2000 and 2021.',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: "Due to 20 years of drought, California's water supply is dwindling, as visible in decreasing snowpack and reservoir levels. This study compares snowpack and reservoirs within the Mt. Shasta region with additive false color to visualize the interconnected effects of drought on snowpack and water accessibility.",
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'Use the dropdown menu to toggle between Mt. Shasta, Shasta Lake, and Trinity Lake in March and August. Swipe to compare years.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1wqjqrdVLRGNTfLyzAdOdrj4Vl--CokmJCKxCoMa-qkk/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Annika Hoerner\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: '2000',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: '2021',
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
// Configure the layouts for how the panels flow together.
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
// Compose panels.
var rootPanel = ui.Panel(                         // Highest-level container.
  {
    // layout: ui.Panel.Layout.flow('horizontal'),
    style:
      {
        height: '100%',
        width: '100%'
      }
  }
);
// ---------------------------------------------------------------
// Configure map panels.
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
rightMap.setOptions('HYBRID');
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
// Intialize config dictionary.
var config = {
  month: 3
};
config.poi = ee.Geometry.Point([-122.1959, 41.411]);
// --- Load image data -------
//
// Store assets in config dictionary.
config.mar21_asset = ee.Image('users/ahoerner/shasta_assets/A_MtnMar21');
config.mar00_asset = ee.Image('users/ahoerner/shasta_assets/MtnMar00');
config.aug21_asset = ee.Image ('users/ahoerner/shasta_assets/MtnAug21');
config.aug00_asset = ee.Image('users/ahoerner/shasta_assets/MtnAug00');
config.lakeMar00_asset = ee.Image('users/ahoerner/shasta_assets/LakeMar00');
config.lakeMar21_asset = ee.Image('users/ahoerner/shasta_assets/LakeMar21');
config.lakeAug00_asset = ee.Image('users/ahoerner/shasta_assets/LakeAug00');
config.lakeAug21_asset = ee.Image('users/ahoerner/shasta_assets/LakeAug21');
// Create an image collection from images.
var ic_left = ee.ImageCollection.fromImages([
  config.mar00_asset,
  config.aug00_asset,
  config.lakeMar00_asset,
  config.lakeAug00_asset
  ]
)
;
var ic_right = ee.ImageCollection.fromImages([
  config.mar21_asset,
  config.aug21_asset,
  config.lakeMar21_asset,
  config.lakeAug21_asset
  ]
)
;
// Make visualization parameters.
var palettes = require('users/gena/packages:palettes');
Map.centerObject(config.poi,12);
Map.setOptions('TERRAIN');
config.vizChange = {
  min: 0,
  max:1,
  bands: ['nd','15','21'],
};
config.ndsiViz = {
  min: -1,
  max: 1,
  palette: palettes.colorbrewer.BrBG[11]
};
config.viz = {
  min: 0,
  max: 1,
  bands: config.bands_l7
};
config.vizL8 = {
  min: 0,
  max: 1,
  bands: config.bands_l8
};
// Function to set center and add layers to map.
leftMap.centerObject(config.poi, 12);
var updateMap = function() {
  // leftMap.centerObject(config.poi, 12);
  leftMap.layers().set(
    0,
    ui.Map.Layer(
      ic_left.filter(ee.Filter.calendarRange(config.month,config.month,'month')),
      config.viz,
      '2000',
      true)
    );
  rightMap.layers().set(
    1,
    ui.Map.Layer(
      ic_right.filter(ee.Filter.calendarRange(config.month,config.month,'month')),
      config.vizL8,
      '2021',
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
var months =
  {
    'Mt. Shasta, March': [-122.1959, 41.411,3,12],
    'Mt. Shasta, August': [-122.1959, 41.411,8,12],
    'Shasta Lake, March': [-122.3031, 40.7802,3,12],
    'Shasta Lake, August': [-122.3031, 40.7802,8,12],
    'Trinity Lake, March': [-122.7069, 40.9067,3,11],
    'Trinity Lake, August': [-122.7069, 40.9067,8,11]
  }
;
print(months['March']);
var selectMonths = ui.Select({
  items: Object.keys(months),
  placeholder: 'Choose site and month',
  style: selectStyles,
  onChange: function(key) {
    config.month = (months[key][2]);
    updateMap();
    config.poi = ee.Geometry.Point ([months[key][0],months[key][1]]);
    leftMap.centerObject(config.poi,(months[key][3]));
  }
});
sidePanel.insert(3, selectMonths);