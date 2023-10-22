var Keshkten2005 = ui.import && ui.import("Keshkten2005", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2005_Keshkten"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2005_Keshkten"),
    Kubuqi2005 = ui.import && ui.import("Kubuqi2005", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2005_Kubuqi"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2005_Kubuqi"),
    Aksu2005 = ui.import && ui.import("Aksu2005", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2005_Xinjiang"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2005_Xinjiang"),
    Kubuqi2020 = ui.import && ui.import("Kubuqi2020", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2020_Kubuqi"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2020_Kubuqi"),
    Aksu2020 = ui.import && ui.import("Aksu2020", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2020_Xinjiang"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2020_Xinjiang"),
    Keshkten2010 = ui.import && ui.import("Keshkten2010", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2010_Keshkten"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2010_Keshkten"),
    Kubuqi2010 = ui.import && ui.import("Kubuqi2010", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2010_Kubuqi"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2010_Kubuqi"),
    Aksu2010 = ui.import && ui.import("Aksu2010", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2010_Xinjiang"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2010_Xinjiang"),
    Keshkten2015 = ui.import && ui.import("Keshkten2015", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2015_Keshkten"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2015_Keshkten"),
    Kubuqi2015 = ui.import && ui.import("Kubuqi2015", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2015_Kubuqi"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2015_Kubuqi"),
    Aksu2015 = ui.import && ui.import("Aksu2015", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2015_Xinjiang"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2015_Xinjiang"),
    Keshkten2020 = ui.import && ui.import("Keshkten2020", "image", {
      "id": "users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2020_Keshkten_2"
    }) || ee.Image("users/yidex/NDVI_Vegetation_Cover_Change_2000_and_2020_Keshkten_2");
/*
  TITLE:   UI Layout (Case 2)
  AUTHOR:  Jeff Howarth
  DATE:    2/22/2022
  Purpose: To make an app layout when images include more than one
            local scene and the select widget draws different layers
            depending on the selected placename. (In other words,
            When you guide the reader to multiple places and each
            place requires a different scene).
            This solution involves stashing copies of images
            in a dictionary and then letting the map user select the
            images to display as map layers from a placename pick list.
*/
// ---------------------------------------------------------------
// Introduction to labels
// ---------------------------------------------------------------
var testLabel = ui.Label(
  {
    value: 'The Quick Brown Fox Jumps Over The Lazy Dog!',
    // targetUrl: 'https://geog0150.github.io/w22/',
  }
);
testLabel.style().set(
    {
      // height: '100px',
      // width: '100%',
      padding: '10px',
      margin: '20px',
      color: 'red',
      // backgroundColor: '#cccccc',
      // border:'4px solid orange',
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'Helvetica, sans-serif',
      textAlign: 'left',
      // textDecoration: 'underline',
      whiteSpace: 'wrap',
      shown: true,
      stretch: 'horizontal'
    }
);
// print(testLabel);
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
  value: 'Dynamics of the Vegetation Cover on Desert Border in Northern China',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'In this app, you will see the patterns of land cover changes along the desert-grassland and desert-farmland border in semi-humid, semi-arid, and arid climate areas of Northern China over the last 15 years. The research questions are: where are the regions that have been through ecological degradation or been restored, and what are the effect of these changes?',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'The green color means increase in vegetation, while the yellow color indicates loss in vegetation. Feel free to move your cursor to the "Layers" button and change the year of map or the transparency. If you want to change the layer of the left map, scroll the slider to the right and change the layer. ',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1SpCjyL0o5piZ5ucZbB03-QMoBvAOljDBcW4YK6X16_k/edit#heading=h.w6lfl18rk9yg'
  }
);
var acknowledgement = ui.Label({
  value: 'Dataset\nUSGS Landsat 7',
  style: labelStyles.creditStyle
  }
);
var credits = ui.Label({
  value: 'Yide Xu\nGeography 150\nWinter 2022\nDirected by Prof. Howarth\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: 'You can choose 2005, 2010, or 2015 layer\non the left map',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: 'You can choose 2010, 2015, or 2020 layer\non the right map',
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
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [
    abstract,
    instructions,
    storyLink,
    acknowledgement,
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
config.poi = ee.Geometry.Point([109.18080922797321,40.468708106566936]);
config.zoom = 10;
var palettes = require('users/gena/packages:palettes');
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
config.ndvi_viz = {
  min: -0.3,
  max: 0.3,
  palette: palettes.colorbrewer.BrBG[9]
};
var legend = cart                                                     // module
  .makeGradientLegend(                                                // function
    config.ndvi_viz,                                                         // viz parameters
    'NDVI Difference:\nan index of green vegetation change',    // legend title
    'top-left'                                                     // position on map
  )
;
sidePanel.insert(1, legend);
// Create an image collection from images.
var ic_left_2005 = [
  Keshkten2005,
  Kubuqi2005,
  Aksu2005
  ]
;
var ic_left_2010 = [
  Keshkten2010,
  Kubuqi2010,
  Aksu2010,
  ]
;
var ic_left_2015 = [
  Keshkten2015,
  Kubuqi2015,
  Aksu2015,
  ]
;
var ic_left_2020 = [
  Keshkten2020,
  Kubuqi2020,
  Aksu2020
  ]
;
var ic_right_2005 = [
  Keshkten2005,
  Kubuqi2005,
  Aksu2005
  ]
;
var ic_right_2010 = [
  Keshkten2010,
  Kubuqi2010,
  Aksu2010,
  ]
;
var ic_right_2015 = [
  Keshkten2015,
  Kubuqi2015,
  Aksu2015,
  ]
;
var ic_right_2020 = [
  Keshkten2020,
  Kubuqi2020,
  Aksu2020
  ]
;
// Make visualization parameters.
var palettes = require('users/gena/packages:palettes');
config.ndvi_viz = {
  min: -0.3,
  max: 0.3,
  palette: palettes.colorbrewer.BrBG[9]
};
// Add images to map as layers.
// Function to set center and add layers to map.
var places =
  {
    'Kubuqi Desert, Inner Mongolia, China': [109.18080922797321,40.468708106566936, 10, 1],
    'Keshkten, Inner Mongolia, China': [119.04592150349178,43.20294929661033, 10, 0],
    'Aksu, Xinjiang, China': [81.1591995503346,40.42482200849365, 10, 2]
  }
;
// var places =
//   {
//     'Kubuqi Desert, Inner Mongolia, China': [109.18080922797321,40.468708106566936, 9],
//     'Keshkten, Inner Mongolia, China': [119.04592150349178,43.20294929661033, 9],
//     'Aksu, Xinjiang, China': [81.1591995503346,40.42482200849365, 9]
//   }
// ;
var updateMap = function(number) {
  leftMap.centerObject(config.poi, config.zoom);
  leftMap.layers().set(
    0,
    ui.Map.Layer(
      ic_left_2015[number],
      config.ndvi_viz,
      '2015',
      true
    ));
  leftMap.layers().set(
    1,
    ui.Map.Layer(
      ic_left_2010[number],
      config.ndvi_viz,
      '2010',
      true
    ));
  leftMap.layers().set(
    2,
    ui.Map.Layer(
      ic_left_2005[number],
      config.ndvi_viz,
      '2005',
      true
    ));
  rightMap.layers().set(
    0,
    ui.Map.Layer(
      ic_right_2010[number],
      config.ndvi_viz,
      '2010',
      true
      ));
  rightMap.layers().set(
    1,
    ui.Map.Layer(
      ic_right_2015[number],
      config.ndvi_viz,
      '2015',
      true
      ));
  rightMap.layers().set(
    2,
    ui.Map.Layer(
      ic_right_2020[number],
      config.ndvi_viz,
      '2020',
      true
      ));
};
updateMap(1);
// var updateMap = function() {
//   leftMap.centerObject(config.poi, config.zoom);
//   leftMap.layers().set(
//     0,
//     ui.Map.Layer(
//       ic_left.filterBounds(config.poi),
//       config.ndvi_viz,
//       '2005',
//       true)
//     );
//   rightMap.layers().set(
//     1,
//     ui.Map.Layer(
//       ic_right.filterBounds(config.poi),
//       config.ndvi_viz,
//       '2020',
//       true)
//       );
// };
// updateMap();
// print('config', config);
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
// print([places['Kubuqi Desert, Inner Mongolia, China'][0]]);
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    config.poi = ee.Geometry.Point([places[key][0],places[key][1]]);
    config.zoom = places[key][2];
    updateMap(places[key][3]);
  }
});
sidePanel.insert(3, selectPlaces);