/*
  TITLE:  Mount Abe Seasonal Foliage: Coniferous and Deciduous Trees in the Summer and Fall 
  AUTHOR:  Ella Roelofs
  DATE:    4/1/2022
  Purpose: To analyze and show the differences in surface reflectance of 
            coniferous and deciduous trees in summer and fall near Mount Abe, VT. 
*/
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ANALYSIS SECTION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var imageTools = require('users/jhowarth/eePrimer:modules/image_tools.js');
// ----------------------------------------------------------------
// Select the point of interest.  
// ----------------------------------------------------------------
var poi = ee.Geometry.Point([-72.93439776162653, 44.11928870342286]);
// ----------------------------------------------------------------
// Load and filter Sentinel 2 surface reflectance image collection.
// ----------------------------------------------------------------
var collection = ee.ImageCollection("COPERNICUS/S2_SR")     // This example uses Sentinel 2.
  .filterBounds(poi)                                        // Filter by poi.
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))      // Filter by cloud cover threshold.
  ;
// ----------------------------------------------------------------
// Use this function to mask S2 clouds.   
// ----------------------------------------------------------------
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// ----------------------------------------------------------------
// Construct fall and summer scenes by    
// ----------------------------------------------------------------
var fall = collection
  .filter(ee.Filter.calendarRange(10,11, 'month'))          // Filter by time unit.
  .map(maskS2clouds)                                        // Apply cloud mask.  
  .median()                                                   // Reduce collection to image.
  ;
var summer = collection
  .filter(ee.Filter.calendarRange(6,7, 'month'))
  .map(maskS2clouds)
  .median()
  ;
//print('FALL', fall, 'SUMMER', summer);
// ----------------------------------------------------------------
// Construct histogram of bands to determine display ranges.
// ----------------------------------------------------------------
// print(imageTools.makeBoundedHistogram(region, summer, 'B4', 100, 0, 0.7,0,5000));
// print(imageTools.makeBoundedHistogram(region, summer, 'B3', 100, 0, 0.7,0,5000));
// print(imageTools.makeBoundedHistogram(region, summer, 'B2', 100, 0, 0.7,0,5000));
// print(imageTools.makeBoundedHistogram(region, summer, 'B11', 100, 0, 1,0,5000));
// print(imageTools.makeBoundedHistogram(region, summer, 'B8', 100, 0, 1,0,5000));
// ----------------------------------------------------------------
// Construct viz parameters.
// ----------------------------------------------------------------
var viz_natural = {
  min: 0,
  max: 0.25,
  bands: ['B4', 'B3', 'B2']
};  
var viz_false1 = {
  min: 0,
  max: [0.35,0.65,0.25],
  bands: ['B11', 'B8', 'B4'] //SWIR,NIR,red
};  
// ----------------------------------------------------------------
// Construct spectral signature chart.
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
var S2_scale = 10;
var con1 = makeSamplePoint(-72.9382202399315, 44.1201300936048, 'Coniferous 1', S2_scale);
var con2 = makeSamplePoint(-72.93753359442368, 44.11566274405087, 'Coniferous 2', S2_scale);
var con3 = makeSamplePoint(-72.93573114996568, 44.123796148828355, 'Coniferous 3', S2_scale);
var dec1 = makeSamplePoint(-72.95040819769517, 44.117942674990125, 'Deciduous 1', S2_scale);
var dec2 = makeSamplePoint(-72.94963572149888, 44.1098700914355, 'Deciduous 2', S2_scale);
var dec3 = makeSamplePoint(-72.92045328741685, 44.10512462316952, 'Deciduous 3', S2_scale);
// Create lists of sample points.   
var ss_samples = [
  con1,
  con2,
  con3,
  dec1,
  dec2,
  dec3
  ];
// Define colors for land cover classes.  
var con_color = 'Aqua';
var dec_color = 'Blue'; 
// Construct list of colors that match sample point list.
var ss_colors = [
  con_color,
  con_color,
  con_color,
  dec_color,
  dec_color,
  dec_color
  ];
// print('SAMPLES', ss_samples);
// ---------------------------------
// Step 2. Function to make chart.  
// ---------------------------------
var makeSignatureChart = function(image, label){
  // Select bands
  var image_select = image              
    .select(
      'B1',
      'B2',
      'B3',
      'B4',
      'B5',
      'B6',
      'B7',
      'B8',
      'B8A',
      'B9',
      'B11',
      'B12'
      )
    ;
  // Define customization options.
  var plotOptions = {
    title: label,
    hAxis: {
      title: 'Wavelength (nm)',       
      viewWindow: {
        min: 400,
        max: 2300}
      },
    vAxis: {
      title: 'Reflectance',
      viewWindow: {
        min: 0.0,
        max: 0.6}
      },
    lineWidth: 1,
    pointSize: 2,
    colors: ss_colors,
    curveType: 'function'
  };
  // Define a list of wavelengths for X-axis labels.
  var series = {
    wavelengths:  [ 444, 497,  560, 665, 704, 740, 783, 835, 865, 954, 1614, 2202],
    bands:        ['B1','B2', 'B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12']
  };
  // Load sample points as a feature collection.  
  var samples_fc = ee.FeatureCollection(ss_samples);
  var chart = ui.Chart.image.regions({
    image: image_select,
    regions: samples_fc,
    reducer: ee.Reducer.mean(),
    scale: 10,
    seriesProperty: 'name',
    xLabels: series.wavelengths
    });
  // Return the chart and set options.
  return chart
    .setChartType('ScatterChart')
    .setOptions(plotOptions);
};
// ---------------------------------
// Step 3. Apply function.  
// ---------------------------------
var ss_summer = makeSignatureChart(summer, 'Summer Surface Reflectance');
var ss_fall = makeSignatureChart(fall, 'Fall Surface Reflectance');
// print('FALL CHART', ss_fall);
// print('SUMMER CHART', ss_summer);
// ----------------------------------------------------------------
// Add spectral signature sample points to map. 
// ----------------------------------------------------------------
// Function to convert polygons to centroids.
var getCentroid = function(point){
  return point.centroid();
};
// Create feature collections of each land cover class  
var con = ee.FeatureCollection([con1, con2, con3]);
var dec = ee.FeatureCollection([dec1, dec2, dec3]);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
// Dictionary for label styles. (shouldn't have to touch this but could adapt if we want)
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
      fontSize: '16px',
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
  creditStyle: //name at bottom
    {
      padding: labelMaster.align.padding,
      margin: labelMaster.align.margin,
      color: '#656665',
      fontSize: '12px',
      fontWeight: '400',
      fontFamily: labelMaster.font.sans,
      textAlign: 'left',
      position: labelMaster.align.position,
      whiteSpace: 'pre',
      stretch: 'horizontal'
    },
  mapLabelStyle: //labels on map
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
  value: 'Mount Abe Seasonal Foliage: Coniferous and Deciduous Trees in the Summer and Fall',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'False color imagery shows surface reflectance differences between coniferous and deciduous trees in different seasons near Mount Abe, VT. Deciduous trees appear bright green in the summer image and red in the fall image, while coniferous trees are darker green in both.',
  style: labelStyles.abstractStyle
});
var instructions1 = ui.Label({
  value: 'Use the slider on the map to swipe between the summer image (left) and fall image (right). Aqua points are in areas with coniferous trees, blue points are deciduous trees. To view the image in natural color, select the natural color option under layers (swipe map to summer image to view its layer options).',
  style: labelStyles.instructionStyle
});
var instructions2 = ui.Label({
  value: 'The charts show differences in the spectral signatures of coniferous and deciduous trees. To view larger, click the button to open chart in new tab.',
  style: labelStyles.instructionStyle
});
var instructions3 = ui.Label({
  value: 'Choose a location to zoom in on a point.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'Link for more information', 
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1hvJkkTjInFHcqCIIjReoof7G94LxnZdiZL1-MnlQUGY/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Ella Roelofs\nGeography 150\nWinter 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: 'Summer',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: 'Fall',
  style: labelStyles.mapLabelStyle
  }
);
rightLabel.style().set({
  textAlign: 'right',
  position: 'bottom-right',
});
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
    'Coniferous 1': con1,
    'Coniferous 2': con2,
    'Coniferous 3': con3,
    'Deciduous 1': dec1,
    'Deciduous 2': dec2,
    'Deciduous 3': dec3
  }
;
//print(places['Windbreak 1']); //test
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a location',
  style: selectStyles,
  onChange: function(key) {
    leftMap.centerObject(places[key], 15);
  }
});
// print(selectPlaces);
// ---------------------------------------------------------------
// Make root panel. DON'T WORRY AB
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
// Link our maps together. So set center and zoom only for 1 map! 
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
// Compose maps.  
// ---------------------------------------------------------------
leftMap.centerObject(poi, 12); //Maps are linked, so don't need to center both 
leftMap.addLayer(summer, viz_false1, 'Summer, false color');
leftMap.addLayer(summer, viz_natural, 'Summer, natural color',0);
leftMap.addLayer(con.map(getCentroid), {color: con_color}, 'Coniferous points');
leftMap.addLayer(dec.map(getCentroid), {color: dec_color}, 'Deciduous points');
rightMap.addLayer(fall, viz_false1, 'Fall, false color');
rightMap.addLayer(fall, viz_natural, 'Fall, natural color',0);
rightMap.addLayer(con.map(getCentroid), {color: con_color}, 'Coniferous points');
rightMap.addLayer(dec.map(getCentroid), {color: dec_color}, 'Deciduous points');
// ---------------------------------------------------------------
// Make side panel.
// ---------------------------------------------------------------
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [  //this list gives order of things in the panel
    abstract, 
    instructions1,
    instructions2,
    ss_summer,
    ss_fall,
    instructions3,
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