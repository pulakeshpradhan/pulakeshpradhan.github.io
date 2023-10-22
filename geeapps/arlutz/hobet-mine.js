/*
  TITLE:   Mountaintop Removal and Reforestation at the Hobet Mine
            in Boone County, West Virginia
  AUTHOR:  Alana Lutz
  DATE:    4/6/2022
  Purpose: This app uses Landsat imagery and spectral signature charts to 
            examine the deforestation and reforestation of landscapes impacted
            by the Hobet Mine, a mountaintop removal coal mine that operated
            between 1974 and 2015 in southern West Virginia.
*/
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ANALYSIS SECTION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Set point of interest on Hobet Mine and center map
var poi = ee.Geometry.Point([-81.9025, 38.0884]);
// Map.centerObject(poi, 12);
// Map.setOptions('HYBRID');
// function to apply scale factors
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
  }
// Load Landsat 5 image collection and filter by point of interest
var collection5 = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
.filterBounds(poi);
// print("L5", collection5);
// Filter L5 image collection by date (summer 1984) and cloud cover
var image1984 = collection5
  .filter(ee.Filter.calendarRange(1984, 1984, 'year'))
  .filter(ee.Filter.calendarRange(5, 9, 'month'))
  .filter(ee.Filter.lt('CLOUD_COVER', 5))
  .map(applyScaleFactors)
  .median();
// print("1984", image1984);
// Load Landsat 7 image collection and filter by point of interest
var collection7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2")
.filterBounds(poi);
// print("L7", collection7);
// Filter L7 image collection by date (summer 2002) and cloud cover
var image2002 = collection7
  .filter(ee.Filter.calendarRange(2002, 2002, 'year'))
  .filter(ee.Filter.calendarRange(5, 9, 'month'))
  .filter(ee.Filter.lt('CLOUD_COVER', 5))
  .map(applyScaleFactors)
  .median();
// print("2002", 2002);
// Load Landsat 8 image collection and filter by point of interest
var collection8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
.filterBounds(poi);
// print("L8", collection8);
// Filter L8 image collection by date (summer 2021) and cloud cover
var image2021 = collection8
  .filter(ee.Filter.calendarRange(2021, 2021, 'year'))
  .filter(ee.Filter.calendarRange(5, 9, 'month'))
  .filter(ee.Filter.lt('CLOUD_COVER', 5))
  .map(applyScaleFactors)
  .median();
// print("2021", image2021)
// ----------------------------------------------------------------
// Construct histogram of bands to determine display ranges
// ----------------------------------------------------------------
// var imageTools = require('users/jhowarth/eePrimer:modules/image_tools.js');
// print(imageTools.makeBoundedHistogram(
//   region,       // sample region rectangle
//   image2002,       // image to sample
//   'SR_B2',         // band in the image to sample
//   100,          // scale of image
//   0,            // min of x-axis
//   0.6,            // max of x-axis
//   0,            // min of y-axis
//   1000));     // max of y-axis
// ----------------------------------------------------------------------------
// Set false color composite visualization parameters for L5, L7, and L8 images
// ----------------------------------------------------------------------------
var visualization5 = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: [0.1, 0.01, 0.01],
  max: [.5, 0.1, 0.1] 
};
var visualization7 = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: [0.1, 0, 0],
  max: [.5, 0.2, 0.2] 
};
var visualization8 = {
  bands: ['SR_B5', 'SR_B4', 'SR_B3'],
  min: [0.1, 0, 0.01],
  max: [0.5, 0.16, 0.14]
};
// Add layers to the map, one image for each year
// Map.addLayer(image1984, visualization5, "1984");
// Map.addLayer(image2002, visualization7, "2002");
// Map.addLayer(image2021, visualization8, "2021");
// ----------------------------------------------------------------
// Construct spectral signature chart
// ----------------------------------------------------------------
// ---------------------------------
// Step 1. Collect sample locations.
// ---------------------------------
// Function to make sample points.  
var makeSamplePoint = function(x, y, label, scale){
  return ee.Feature(
    ee.Geometry.Point(
      [x,y]).buffer(scale * 1.5),
    {'name': label});
};
// Make sample points.
var L8_scale = 2.75;
// forest = points that are consistently forested in all three years
var forest1 = makeSamplePoint(-81.8165, 38.0786, 'Forested 1', L8_scale);
var forest2 = makeSamplePoint(-81.9332, 38.0578, 'Forested 2', L8_scale);
var forest3 = makeSamplePoint(-81.9401, 38.1105, 'Forested 3', L8_scale);
// change = points that are forested in 1984, mined in 2002, and
// reforested in 2021
var change1 = makeSamplePoint(-81.96498, 38.08603, 'Change 1', L8_scale);
var change2 = makeSamplePoint(-81.90061, 38.11767, 'Change 2', L8_scale);
var change3 = makeSamplePoint(-81.96636, 38.06532, 'Change 3', L8_scale);
// Create lists of sample points.   
var ss_samples = [
  forest1,
  forest2,
  forest3,
  change1,
  change2,
  change3
  ];
// Define colors for land cover classes.  
var forest_color = 'Lime';
var change_color = "blue";
// Construct list of colors that match sample point list.
var ss_colors = [
  forest_color,
  forest_color,
  forest_color,
  change_color,
  change_color,
  change_color
  ];
// print('SAMPLES', ss_samples);
// ---------------------------------
// Step 2. Function to make chart.  
// ---------------------------------
// This function is specific to Landsat 5 and the 1984 image.
var makeSignatureChart5 = function(image){
  // Select bands
  var image_select = image              
    .select(
      'SR_B1',
      'SR_B2',
      'SR_B3',
      'SR_B4',
      'SR_B5',
      'SR_B7'
      )
    ;
  // Define customization options.
  var plotOptions = {
    title: 'Landsat 5 surface reflectance spectra in 1984',
    hAxis: {
      title: 'Wavelength (nanometers)',       
      viewWindow: {
        min: 400,
        max: 2300}
      },
    vAxis: {
      title: 'Reflectance',
      viewWindow: {
        min: 0.0,
        max: 0.5}
      },
    lineWidth: 1,
    pointSize: 2,
    colors: ss_colors,
    curveType: 'function'
  };
  // Define a list of wavelengths for X-axis labels.
  var series = {
    wavelengths:  [ 450, 520,  630, 770, 1550, 2080],
    bands:        ['SR_B1','SR_B2', 'SR_B3','SR_B4','SR_B5','SR_B7']
  };
  // Load sample points as a feature collection.  
  var samples_fc = ee.FeatureCollection(ss_samples);
  var chart = ui.Chart.image.regions({
    image: image_select,
    regions: samples_fc,
    reducer: ee.Reducer.mean(),
    scale: 2.75,
    seriesProperty: 'name',
    xLabels: series.wavelengths
    });
  // Return the chart and set options.
  return chart
    .setChartType('ScatterChart')
    .setOptions(plotOptions);
};
// This function is specific to Landsat 7 and the 2002 image.
var makeSignatureChart7 = function(image){
  var image_select = image              
    .select(
      'SR_B1',
      'SR_B2',
      'SR_B3',
      'SR_B4',
      'SR_B5',
      'SR_B7'
      )
    ;
  var plotOptions = {
    title: 'Landsat 7 surface reflectance spectra in 2002',
    hAxis: {
      title: 'Wavelength (nanometers)',       
      viewWindow: {
        min: 400,
        max: 2300}
      },
    vAxis: {
      title: 'Reflectance',
      viewWindow: {
        min: 0.0,
        max: 0.5}
      },
    lineWidth: 1,
    pointSize: 2,
    colors: ss_colors,
    curveType: 'function'
  };
  var series = {
    wavelengths:  [ 450, 520,  630, 770, 1550, 2080],
    bands:        ['SR_B1','SR_B2', 'SR_B3','SR_B4','SR_B5','SR_B7']
  };
  var samples_fc = ee.FeatureCollection(ss_samples);
  var chart = ui.Chart.image.regions({
    image: image_select,
    regions: samples_fc,
    reducer: ee.Reducer.mean(),
    scale: 2.75,
    seriesProperty: 'name',
    xLabels: series.wavelengths
    });
  return chart
    .setChartType('ScatterChart')
    .setOptions(plotOptions);
};
// This function is specific to Landsat 8 and the 2021 image.
var makeSignatureChart8 = function(image){
  var image_select = image              
    .select(
      'SR_B1',
      'SR_B2',
      'SR_B3',
      'SR_B4',
      'SR_B5',
      'SR_B6',
      'SR_B7'
      )
    ;
  var plotOptions = {
    title: 'Landsat 8 surface reflectance spectra in 2021',
    hAxis: {
      title: 'Wavelength (nanometers)',       
      viewWindow: {
        min: 400,
        max: 2300}
      },
    vAxis: {
      title: 'Reflectance',
      viewWindow: {
        min: 0.0,
        max: 0.5}
      },
    lineWidth: 1,
    pointSize: 2,
    colors: ss_colors,
    curveType: 'function'
  };
  var series = {
    wavelengths:  [ 435, 452,  533, 636, 851, 1566, 2107],
    bands:        ['SR_B1','SR_B2', 'SR_B3','SR_B4','SR_B5', 'SR_B6', 'SR_B7']
  };
  var samples_fc = ee.FeatureCollection(ss_samples);
  var chart = ui.Chart.image.regions({
    image: image_select,
    regions: samples_fc,
    reducer: ee.Reducer.mean(),
    scale: 2.75,
    seriesProperty: 'name',
    xLabels: series.wavelengths
    });
  return chart
    .setChartType('ScatterChart')
    .setOptions(plotOptions);
};
// ---------------------------------
// Step 3. Apply functions.  
// ---------------------------------
var ss_1984 = makeSignatureChart5(image1984);
var ss_2002 = makeSignatureChart7(image2002);
var ss_2021 = makeSignatureChart8(image2021);
// print('1984 CHART', ss_1984);
// print('2002 CHART', ss_2002);
// print('2021 CHART', ss_2021);
// ----------------------------------------------------------------
// Add spectral signature sample points to map
// ----------------------------------------------------------------
// Function to convert polygons to centroids.
var getCentroid = function(point){
  return point.centroid();
};
// Create feature collections of each land cover class  
var forest = ee.FeatureCollection([forest1, forest2, forest3]);
var change = ee.FeatureCollection([change1, change2, change3]);
// Add feature collectoins to map and display with same color
// Map.addLayer(forest.map(getCentroid), {color: forest_color}, 'Forest');
// Map.addLayer(change.map(getCentroid), {color: change_color}, 'Change');
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LAYOUT SECTION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  value: 'Mountaintop Removal and Reforestation at the Hobet Mine in Boone County, West Virginia',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: "Landsat imagery and spectral signature charts provide valuable insight into the deforestation and subsequent reclamation of landscapes impacted by the Hobet Mine, a mountaintop-removal coal mine that operated between 1974 and 2015 in southern West Virginia.",
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: "Hover over the 'Layers' button in the top right to toggle between maps from 1984, 2002, and 2021 and watch the mine advance across the landscape.",
  // short description of instructions for using your map and any widgets
  // that it contains.
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LINK TO STORY',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/19UMRYhXLi08p6Y0WqmWHgLjhDvEUbVvyUBu8PoOXbG8/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Alana Lutz\nGeography 150\nSpring 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
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
    'Forested 1': forest1,
    'Forested 2': forest2,
    'Forested 3': forest3,
    'Change 1': change1,
    'Change 2': change2,
    'Change 3': change3
  }
;
print(places['Forested 1']);
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    map.centerObject(places[key], 14);
  }
});
// print(selectPlaces);
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
var map = ui.Map({          // Map panel.
   style:
     {
        height: '95%'
     }
    }
  );
// Initialize a map panel (because you can not add a split panel to a split panel).
var mapPanel = ui.Panel({          // Map panel.
  style:
    {
      stretch: 'vertical'
    }
  }
);
mapPanel
  .add(map);                 // Add map to map panel.
// ---------------------------------------------------------------
// Compose maps.
// ---------------------------------------------------------------
map.centerObject(poi, 12);
map.setOptions('HYBRID');
map.addLayer(image1984, visualization5, "1984");
map.addLayer(image2002, visualization7, "2002", 0);
map.addLayer(image2021, visualization8, "2021", 0);
map.addLayer(forest.map(getCentroid), {color: forest_color}, 'Forested points');
map.addLayer(change.map(getCentroid), {color: change_color}, 'Change points');
// ---------------------------------------------------------------
// Make side panel.
// ---------------------------------------------------------------
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [
    abstract,
    instructions,
    ss_1984,
    ss_2002,
    ss_2021,
    selectPlaces,
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