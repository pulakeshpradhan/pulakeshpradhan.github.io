/*
  TITLE:   The Spillover Effects of Protected Areas on Surrounding Forests
  AUTHOR:  Alana Lutz
  DATE:    3/16/2022
  Purpose: What impact do protected areas have on deforestation
            in the surrounding area?
*/
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ANALYSIS SECTION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Load country features from Large Scale International Boundary (LSIB) dataset.
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Select the three countries of interest.
var countrySelectFunction = function(country_name){
  return ee.Feature(
  countries
    .filter(ee.Filter.eq('country_na', country_name))
    .first()
    )};
var honduras = countrySelectFunction('Honduras');
var ghana = countrySelectFunction('Ghana');
var cameroon = countrySelectFunction('Cameroon');
// Load image of tree cover from the year 2000 for each country.
var treeCoverFunction = function(country){
  return ee.Image('UMD/hansen/global_forest_change_2021_v1_9')
  .select(['treecover2000'])
  .clip(country);
  };
var H_treeCover2000 = treeCoverFunction(honduras);
var G_treeCover2000 = treeCoverFunction(ghana);
var C_treeCover2000 = treeCoverFunction(cameroon);
// Load image of forest loss from 2000-2021 for each country.
var forestLossFunction = function(country){
  return ee.Image('UMD/hansen/global_forest_change_2021_v1_9')
  .select(['loss'])
  .clip(country);
};
var H_loss = forestLossFunction(honduras);
var G_loss = forestLossFunction(ghana);
var C_loss = forestLossFunction(cameroon);
var forestLoss = ee.Image('UMD/hansen/global_forest_change_2021_v1_9')
  .select(['loss']);
// Load zone features for each country from assets.
var H_zones = ee.FeatureCollection('users/arlutz/Honduras_Zones');
var G_zones = ee.FeatureCollection('users/arlutz/Ghana_Zones');
var C_zones = ee.FeatureCollection('users/arlutz/Cameroon_Zones');
var merged_zones = ee.FeatureCollection('users/arlutz/Merged_Zones');
// Make a forest cover layer for all three countries.
var treeCover2000 = treeCoverFunction(merged_zones);
// Convert zone features into an image, color coded by zone.
var imageTools = require('users/jhowarth/eePrimer:modules/image_tools.js');
var zone_image = imageTools
  .makeImageFromFeatures(
    merged_zones,
    'TAG'
    );
var zone_viz = {
  min:1,
  max:4,
  palette: ['yellow','purple','blue','cyan']
};
// --------------------  
// Make legend.
// --------------------
// Labels for legend.
var zoneGrades = [
  'Protected Area',
  'Within 5km of Protected Area',
  '5-10km from Protected Area',
  'Farther than 10km from Protected Area'
  ]
;
// Make legend.
var cart = require('users/jhowarth/eePrimer:modules/cart.js');
var legend = cart.makeLegend(
  'Forest Loss Zones',
  zone_viz.palette,
  zoneGrades,
  'bottom-left'
);
// Add legend to map.
// Map.add(legend);
// ---------------------------------------------------------------
// Compute percent forest loss in each zone in Honduras.
// ---------------------------------------------------------------
// Set scale and tile scale for analysis.
var scale = 30;
var tileScale = 1;
// Multiply forest cover and loss by pixel area in square meters.
var H_lossAreaImage = H_loss.multiply(ee.Image.pixelArea());
var H_forestAreaImage = H_treeCover2000.gt(0).multiply(ee.Image.pixelArea());
// Distant (farther than 10km from protected areas) zone
var H_distant = H_zones.filter(ee.Filter.eq('TAG', 4));
var H_distantLoss = H_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_distant.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_distantTotal = H_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_distant.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_distantPercentage = ee.Number(H_distantLoss.get('loss'))
      .divide(ee.Number(H_distantTotal.get('treecover2000')))
      .multiply(100);
// 5-10km buffer zone
var H_buffer10km = H_zones.filter(ee.Filter.eq('TAG', 3));
var H_buffer10kmLoss = H_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_buffer10km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_buffer10kmTotal = H_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_buffer10km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_buffer10kmPercentage = ee.Number(H_buffer10kmLoss.get('loss'))
      .divide(ee.Number(H_buffer10kmTotal.get('treecover2000')))
      .multiply(100);
// 0-5km buffer zone
var H_buffer5km = H_zones.filter(ee.Filter.eq('TAG', 2));
var H_buffer5kmLoss = H_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_buffer5km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_buffer5kmTotal = H_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_buffer5km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_buffer5kmPercentage = ee.Number(H_buffer5kmLoss.get('loss'))
      .divide(ee.Number(H_buffer5kmTotal.get('treecover2000')))
      .multiply(100);
// Protected Area
var H_PA = H_zones.filter(ee.Filter.eq('TAG', 1));
var H_PALoss = H_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_PA.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_PATotal = H_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: H_PA.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var H_PAPercentage = ee.Number(H_PALoss.get('loss'))
      .divide(ee.Number(H_PATotal.get('treecover2000')))
      .multiply(100);
var x = ee.List(['Protected Areas', 'Within 5km of Protected Area',
  '5-10km from Protected Area', 'Farther than 10km from Protected Area']);
var y = ee.List([H_PAPercentage, H_buffer5kmPercentage, 
  H_buffer10kmPercentage, H_distantPercentage]);
var H_chart = ui.Chart.array.values({
  array: y,
  axis: 0,
  xLabels: x
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Honduras',
    hAxis: {title: 'Zone'},
    vAxis: {title: 'Percent Forest Loss',
      viewWindow: {min: 0, max: 17}
    },
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
    colors: ['green']
  });
// ---------------------------------------------------------------
// Compute percent forest loss in each zone in Ghana.
// ---------------------------------------------------------------
// Multiply forest cover and loss by pixel area in square meters.
var G_lossAreaImage = G_loss.multiply(ee.Image.pixelArea());
var G_forestAreaImage = G_treeCover2000.gt(0).multiply(ee.Image.pixelArea());
// Distant (farther than 10km from protected areas) zone
var G_distant = G_zones.filter(ee.Filter.eq('TAG', 4));
var G_distantLoss = G_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_distant.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_distantTotal = G_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_distant.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_distantPercentage = ee.Number(G_distantLoss.get('loss'))
      .divide(ee.Number(G_distantTotal.get('treecover2000')))
      .multiply(100);
// 5-10km buffer zone
var G_buffer10km = G_zones.filter(ee.Filter.eq('TAG', 3));
var G_buffer10kmLoss = G_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_buffer10km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_buffer10kmTotal = G_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_buffer10km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_buffer10kmPercentage = ee.Number(G_buffer10kmLoss.get('loss'))
      .divide(ee.Number(G_buffer10kmTotal.get('treecover2000')))
      .multiply(100);
// 0-5km buffer zone
var G_buffer5km = G_zones.filter(ee.Filter.eq('TAG', 2));
var G_buffer5kmLoss = G_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_buffer5km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_buffer5kmTotal = G_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_buffer5km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_buffer5kmPercentage = ee.Number(G_buffer5kmLoss.get('loss'))
      .divide(ee.Number(G_buffer5kmTotal.get('treecover2000')))
      .multiply(100);
// Protected Area
var G_PA = G_zones.filter(ee.Filter.eq('TAG', 1));
var G_PALoss = G_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_PA.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_PATotal = G_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: G_PA.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var G_PAPercentage = ee.Number(G_PALoss.get('loss'))
      .divide(ee.Number(G_PATotal.get('treecover2000')))
      .multiply(100);
var y = ee.List([G_PAPercentage, G_buffer5kmPercentage, 
  G_buffer10kmPercentage, G_distantPercentage]);
var G_chart = ui.Chart.array.values({
  array: y,
  axis: 0,
  xLabels: x
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Ghana',
    hAxis: {title: 'Zone'},
    vAxis: {title: 'Percent Forest Loss'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
    colors: ['green']
  });
// ---------------------------------------------------------------
// Compute percent forest loss in each zone in Cameroon.
// ---------------------------------------------------------------
// Multiply forest cover and loss by pixel area in square meters.
var C_lossAreaImage = C_loss.multiply(ee.Image.pixelArea());
var C_forestAreaImage = C_treeCover2000.gt(0).multiply(ee.Image.pixelArea());
// Distant (farther than 10km from protected areas) zone
var C_distant = C_zones.filter(ee.Filter.eq('TAG', 4));
var C_distantLoss = C_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_distant.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_distantTotal = C_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_distant.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_distantPercentage = ee.Number(C_distantLoss.get('loss'))
      .divide(ee.Number(C_distantTotal.get('treecover2000')))
      .multiply(100);
// 5-10km buffer zone
var C_buffer10km = C_zones.filter(ee.Filter.eq('TAG', 3));
var C_buffer10kmLoss = C_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_buffer10km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_buffer10kmTotal = C_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_buffer10km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_buffer10kmPercentage = ee.Number(C_buffer10kmLoss.get('loss'))
      .divide(ee.Number(C_buffer10kmTotal.get('treecover2000')))
      .multiply(100);
// 0-5km buffer zone
var C_buffer5km = C_zones.filter(ee.Filter.eq('TAG', 2));
var C_buffer5kmLoss = C_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_buffer5km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_buffer5kmTotal = C_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_buffer5km.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_buffer5kmPercentage = ee.Number(C_buffer5kmLoss.get('loss'))
      .divide(ee.Number(C_buffer5kmTotal.get('treecover2000')))
      .multiply(100);
// Protected Area
var C_PA = C_zones.filter(ee.Filter.eq('TAG', 1));
var C_PALoss = C_lossAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_PA.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_PATotal = C_forestAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: C_PA.geometry(),
  scale: scale,
  maxPixels: 1e9,
  tileScale: tileScale
});
var C_PAPercentage = ee.Number(C_PALoss.get('loss'))
      .divide(ee.Number(C_PATotal.get('treecover2000')))
      .multiply(100);
var y = ee.List([C_PAPercentage, C_buffer5kmPercentage, 
  C_buffer10kmPercentage, C_distantPercentage]);
var C_chart = ui.Chart.array.values({
  array: y,
  axis: 0,
  xLabels: x
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Cameroon',
    hAxis: {title: 'Zone'},
    vAxis: {title: 'Percent Forest Loss'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3,
    colors: ['green']
  });
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
// ---------------------------------------------------------------
// Make labels.
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'The Spillover Effects of Protected Areas on Surrounding Forests',
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'Protected areas can have both positive and negative spillover effects on surrounding areas. Sometimes, the establishment of a reserve can displace deforestation into unprotected adjacent land where it would not have otherwise occurred, a phenomenon known as ‘leakage.’ The opposite spillover effect is known as ‘blockage,’ when protected areas reduce deforestation in nearby areas. This app explores the spillover effects of protected areas in three different countries by visualizing forest loss in different zones of proximity to a reserve and calculating the percent forest loss in each zone.',
  style: labelStyles.abstractStyle
});
var instructions = ui.Label({
  value: 'Use the dropdown menu below to select a country. Swipe to compare the zones of proximity to protected areas with the forest losses within each zone.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'LEARN MORE',
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1mYi5aq4O7YVM11tJfImmwpdp4_2jn_RbyoXu4hvzCsc/edit?usp=sharing'
  }
);
var credits = ui.Label({
  value: 'Alana Lutz\nGeography 150\nSpring 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
var leftLabel = ui.Label({
  value: 'Protected Areas and Surrounding Buffer Zones',
  style: labelStyles.mapLabelStyle
  }
);
leftLabel.style().set({
  textAlign: 'left',
  position: 'bottom-left',
});
var rightLabel = ui.Label({
  value: 'Forest Loss by Zone, 2000-2021',
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
    'Honduras': honduras,
    'Ghana': ghana,
    'Cameroon': cameroon
  }
;
var selectPlaces = ui.Select({
  items: Object.keys(places),
  placeholder: 'Choose a country',
  style: selectStyles,
  onChange: function(key) {
    leftMap.centerObject(places[key], 7);
  }
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
leftMap.add(leftLabel);
var rightMap = ui.Map({          // Map panel.
  style:
    {
      height: '95%'
    }
  }
);
rightMap.add(rightLabel);
// Set base map to darkBase theme.
var customBase = require('users/jhowarth/eePrimer:modules/darkBase.js');
leftMap.setOptions('darkBase', {'darkBase': customBase.darkBase});
rightMap.setOptions('darkBase', {'darkBase': customBase.darkBase});
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
// Compose maps.
// ---------------------------------------------------------------
leftMap.centerObject(honduras, 7);
leftMap.setOptions('darkBase', {'darkBase': customBase.darkBase});
leftMap.addLayer(treeCover2000.updateMask(treeCover2000),
    {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover in 2000', 1, 0.25);
leftMap.addLayer(zone_image, zone_viz, 'Zones', 1, 0.7);
leftMap.add(legend);
rightMap.addLayer(treeCover2000.updateMask(treeCover2000),
    {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover in 2000', 1, 0.25);
rightMap.addLayer(zone_image.updateMask(forestLoss), zone_viz, 'Forest Loss by Zone');
// ---------------------------------------------------------------
// Make side panel.
// ---------------------------------------------------------------
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [
    abstract,
    storyLink,
    instructions,
    selectPlaces,
    H_chart,
    G_chart,
    C_chart,
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