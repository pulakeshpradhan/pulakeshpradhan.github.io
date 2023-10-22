/*  TITLE: Project 2: 
    Author: Ella Roelofs
    Date: last updated 5/15/2022
    Purpose: To compare the NPP (Net Primary Productivity) in protected areas of a biome vs. the NPP in a whole biome. 
              This code looks at Australia but can be edited to look at other countries.
*/ 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ANALYSIS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Map.setCenter(133.8, -26.3,5); //Australia
// Establishing country to look at...Can change country name!
var  country = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq('country_na', 'Australia'))
  .union();
//--------------------------------------------------------------------------------------------
//  BIOME DATA. 
//--------------------------------------------------------------------------------------------
//Imported an assest where the biome feature collection was saved.
var biomes = ee.FeatureCollection('users/groelofs/biomes_by_name')
  .filterBounds(country); 
//print(biomes)
//print('Test biomes', biomes.first());
//print('Biome size', biomes.size());
// print('Biomes list', 
//       ee.List(biomes.aggregate_array('biome_ID'))
//       .distinct()
//       .sort()
//       ); 
//For reference: 
// print('Biomes name list',
// [
//   '0: Boreal Forests/Taiga',
//   '1: Deserts & Xeric Shrublands',
//   '2: Flooded Grasslands & Savannas',
//   '3: Mangroves',
//   '4: Mediterranean Forests, Woodlands & Scrub',
//   '5: Montane Grasslands & Shrublands',
//   '6: N/A',
//   '7: Temperate Broadleaf & Mixed Forests',
//   '8: Temperate Conifer Forests',
//   '9: Temperate Grasslands, Savannas & Shrublands',
//   '10: Tropical & Subtropical Coniferous Forests',
//   '11: Tropical & Subtropical Dry Broadleaf Forests',
//   '12: Tropical & Subtropical Grasslands, Savannas & Shrublands',
//   '13: Tropical & Subtropical Moist Broadleaf Forests',
//   '14: Tundra'
// ]);
//import module for making images
var imageTools = require('users/jhowarth/eePrimer:modules/image_tools.js');
var biomes_image = imageTools
  .makeImageFromFeatures(
    biomes, 
    'biome_ID')
    .clip(country); 
var biomes_palette = [
  '#2e9064', //0 seagreen
  '#d6a972', //1 burlywood (light brown)
  '#7eb3ff', //2 lightskyblue
  '#b23188', //3 mediumvioletred
  '#c67135', //4 peru (medium brown)
  '#c6afe9',  //5 thistle (purply)
  '#b2b2b2', //6 darkgray
  '#6fc836', //7 yellowgreen (less bright medium green)
  '#005500', //8 darkgreen
  '#cede85', //9 khaki (light pale green)
  '#447920', //10 darkolivegreen
  '#9b950f', //11 darkgoldenrod (brown lighter olive green)
  '#fedd55', //12 khaki (yellow) 
  '#64ff00', //13 lawngreen
  '#86decc' //14 aquamarine
  ];
var biomes_vis = {
  min: 0,
  max: 14,
  palette: biomes_palette
};
//Map.addLayer(biomes_image, biomes_vis, 'Biomes');
var biomes_labels = [
  'Boreal Forests/Taiga',
  'Deserts & Xeric Shrublands',
  'Flooded Grasslands & Savannas',
  'Mangroves',
  'Mediterranean Forests, Woodlands & Scrub',
  'Montane Grasslands & Shrublands',
  'No data',
  'Temperate Broadleaf & Mixed Forests',
  'Temperate Conifer Forests',
  'Temperate Grasslands, Savannas & Shrublands',
  'Tropical & Subtropical Coniferous Forests',
  'Tropical & Subtropical Dry Broadleaf Forests',
  'Tropical & Subtropical Grasslands, Savannas & Shrublands',
  'Tropical & Subtropical Moist Broadleaf Forests',
  'Tundra'
];
//--------------------------------------------------------------------------------------------
// PROTECTED AREAS DATA. Imported assests for FC and image.
//--------------------------------------------------------------------------------------------
var protected_areas = ee.FeatureCollection('users/groelofs/protected_areas')
  .filterBounds(country);
// Import asset for the protected areas image 
var protected_areas_image = ee.Image('users/groelofs/protected_areas_image')
  .clip(country);
//Map.addLayer(protected_areas_image.selfMask(), {min: 0, max: 1, palette: 'gold'}, 'Protected areas');
//--------------------------------------------------------------------------------------------
// NPP DATA 
//--------------------------------------------------------------------------------------------
var NPP = ee.ImageCollection('MODIS/006/MYD17A3HGF')
  .select('Npp')
  .mean()
  .clip(country)
;
var npp_vis = {
  min: 0.0,
  max: 19000.0,
  palette: ['bbe029', '0a9501', '074b03'],
};
//Map.addLayer(NPP, npp_vis, 'NPP');
//-------------------------------------------------------------
// ZONAL STATISTICS
//-------------------------------------------------------------
//  ZONAL STATISTIC 1  
//  Derive the mean NPP within each biome.  
var biomes_NPP = NPP
  .reduceRegions({
    collection: biomes,
    reducer: ee.Reducer.mean(),
    scale:500,
    tileScale:2
  }); 
//  ZONAL STATISTIC 2  
//  Derive the mean NPP within each of the protected areas.
var protected_areas_NPP = NPP
.reduceRegions({
    collection: protected_areas,
    reducer: ee.Reducer.mean(), 
    scale:500,
    tileScale:2
  });
//  ZONAL STATISTIC 3  
//  Derive the mean NPP within the protected areas of a biome only. 
var protected_areas_NPP_by_biome = NPP.updateMask(protected_areas_image)
.reduceRegions({
    collection: biomes,
    reducer: ee.Reducer.mean(), 
    scale:500,
    tileScale:2
  });
// //  -------------------------------------------------------------
// //  COMPARING 
// //  -------------------------------------------------------------
// Convert FCs (zonal statistic output) to images.
var  biomes_NPP_image = imageTools.makeImageFromFeatures(
  biomes_NPP, 'mean');
var protected_areas_NPP_image = imageTools.makeImageFromFeatures(
  protected_areas_NPP, 'mean');
var protected_areas_NPP_by_biome_image = imageTools.makeImageFromFeatures(
  protected_areas_NPP_by_biome, 'mean');
// Calculating difference in whole biome NPP vs. protected area NPP 
var diff_in_NPP = protected_areas_NPP_by_biome_image.subtract(biomes_NPP_image).clip(country);
//... if protected has greater NPP, will show as positive 
// Difference visualization:
// Histogram for determining min/max...
    // For making region: draw a geometry in a place where there is big diff in NPP in protected vs. whole biome 
//print(imageTools.makeBoundedHistogram(geometry, diff_in_NPP, 'constant', 500, -12000, 12000, 0, 10000000));
var palettes = require('users/gena/packages:palettes');
var diff_vis = {        //need to check min/max... no idea.  
  min: -2000,
  max: 2000,
  palette: palettes.colorbrewer.PRGn[11] 
}; 
//Map.addLayer(biomes_NPP_image, npp_vis,'NPP by Biome');
//Map.addLayer(protected_areas_NPP_image, npp_vis, 'NPP in Protected Areas');
//Map.addLayer(diff_in_NPP, diff_vis, 'Protected area vs. whole biome NPP ');
// ---------------------------------------------------------------
// Making legends.  
// ---------------------------------------------------------------
// Import cart module.
var cart = require('users/groelofs/GEOG150_S22:Projects/P2_legends_code.js');
var biomes_legend = cart.makeLegend(
    'Biomes',
    biomes_palette,
    biomes_labels,
    'bottom-left'
    );
//Map.add(biomes_legend);
var npp_legend = cart.makeGradientLegend(
    npp_vis,
    'Net Primary Productivity (kg*C/m^2)',
    'bottom-left'
    );
//Map.add(npp_legend);
var diff_legend = cart.makeGradientLegend(
    diff_vis,
    'Difference in NPP: \nProtected Areas vs. Whole Biome',
    'bottom-left'
    );
//Map.add(diff_legend);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LAYOUT SECTION. 
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
  creditStyle: 
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
};
// ---------------------------------------------------------------
// Make labels. 
// ---------------------------------------------------------------
var title = ui.Label({
  value: 'Comparing the NPP of Protected Areas to the NPP of Entire Biomes in Australia', // Could I do title as a Q?
  style: labelStyles.titleStyle
  }
);
var abstract = ui.Label({
  value: 'Net Primary Productivity (NPP) refers to the net amount of carbon that is assimilated in an ecosystem.  It is the difference between the amount of carbon produced by autotrophs through photosynthesis and the amount of energy that these autotrophs use for respiration. Comparing the average NPP in protected areas of a biome to the NPP of the biome as a whole allows one to see whether protected areas are more productive.',
  style: labelStyles.abstractStyle
});
var abstract2 = ui.Label({
  value: 'In Australia, the NPP is greater in protected areas than it is in the whole biome for some biomes, especially coastal forest biomes, but it is lower or similar for other biomes.',
  style: labelStyles.abstractStyle
});
var instructions1 = ui.Label({
  value: 'Check on and off layers to view biomes, protected areas, NPP, and the NPP difference between protected areas and the whole biome. It may take a moment to load layers. To view other countries, follow the below link to the code and choose a different country name.',
  style: labelStyles.instructionStyle
});
var storyLink = ui.Label({
  value: 'Link for more information', 
  style: labelStyles.creditStyle,
  targetUrl: 'https://docs.google.com/document/d/1pcprqMRSRfE_b2YhBY4bsF8y5ivqjF1DUFo3t3kXZK4/edit?usp=sharing' //once make story check this link 
  }
);
var codeLink = ui.Label({
  value: 'Link to code for choosing other countries', 
  style: labelStyles.creditStyle,
  targetUrl: 'https://code.earthengine.google.com/5d8dac91637bc590a5a7ace7026bf864' //check this
  }
);
var credits = ui.Label({
  value: 'Ella Roelofs\nGeography 150\nSpring 2022\nMiddlebury College',
  style: labelStyles.creditStyle
  }
);
// ---------------------------------------------------------------
// Make root panel. Don't worry about this?
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
// Configure map panels. Not sure I need a widget.
// ---------------------------------------------------------------
// Make main map panel.
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
  .add(map);                 // Add swipe map to map panel.
// Add layers to map
map.setOptions('TERRAIN'); 
map.setCenter(133.8, -26.3,5);
map.addLayer(biomes_image, biomes_vis, 'Biomes',0);
map.addLayer(protected_areas_image.selfMask(), {min: 0, max: 1, palette: 'gold'}, 'Protected areas',0);
map.addLayer(NPP, npp_vis, 'NPP',0);
map.addLayer(biomes_NPP_image, npp_vis,'NPP by Biome',0);
//map.addLayer(protected_areas_NPP_image, npp_vis, 'NPP in Protected Area',0);
map.addLayer(diff_in_NPP, diff_vis, 'Protected area vs. whole biome NPP ');
// map.add(npp_legend);
// map.add(diff_legend);
// ---------------------------------------------------------------
// Make side panel.
// ---------------------------------------------------------------
var sidePanel = ui.Panel(                         // Side panel
  {
  widgets: [         //this list gives order of things in the panel
    abstract,
    abstract2,
    instructions1,
    codeLink,
  diff_legend,
  npp_legend,
  biomes_legend,
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