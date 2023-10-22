var table = ui.import && ui.import("table", "table", {
      "id": "users/palashbasak/bgd_admbnda_adm0_bbs_20201113"
    }) || ee.FeatureCollection("users/palashbasak/bgd_admbnda_adm0_bbs_20201113"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008"
    }) || ee.FeatureCollection("users/afotesfaye/eth_admbnda_adm0_csa_bofed_20201008");
// Creating Multi-Temporal Composites
// Extract the boundary for Dane County, Wisconsin
// from TIGER: US Countries 2018 dataset
// var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// var filtered = countries.filter(ee.Filter.eq('country_na', 'Bangladesh'));
//var filtered = ee.FeatureCollection("users/palashbasak/bgd_admbnda_adm0_bbs_20201113");
//var geometry = filtered.geometry();
Map.centerObject(table2, 7);
// Filter the Dynamic World NRT collection
// for the year 2020 over the selected region.
var startDate = '2021-01-01';
var endDate = '2022-01-01';
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date(startDate, endDate))
  .filter(ee.Filter.bounds(table2));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
// Clip the composite and add it to the Map
Map.addLayer(dwComposite.clip(table2), dwVisParams, 'Classified Composite', false); 
// Create a Top-1 Probability Hillshade Visualization
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(table2),
  hillshadeVisParams, 'Probability Hillshade');
// // Export the Composite
// // Raw Composite
// Export.image.toDrive({
//   image: dwComposite.clip(geometry),
//   description: 'Raw_Composite_Export',
//   fileNamePrefix: '2021_composite_raw',
//   region: geometry,
//   scale: 10,
//   maxPixels: 1e10});
// // Top1 Probability Hillshade Composite
// var hillshadeComposite = probabilityHillshade.visualize(hillshadeVisParams);
// Export.image.toDrive({
//   image: hillshadeComposite.clip(geometry),
//   description: 'Top1_Probability_Hillshade_Composite_Export',
//   fileNamePrefix: '2021_composite_hillshade',
//   region: geometry,
//   scale: 10,
//   maxPixels: 1e10});
// Legend
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'LULC Type',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1'];
// name of the legend
var names = ['Water', 'Trees', 'Grass', 'Flooded Vegetation', 
    'Crops', 'Shrub and Scrub', 'Built Area', 'Bare Ground', 'Snow & Ice'];
// Add color and and names
for (var i = 0; i <9; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// set position of panel
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
// Create legend title
var mapTitle = ui.Label({
  value: 'Land Use Land Cover of Ethiopia  as of  2021',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
title.add(mapTitle);
Map.add(title);
// ui.Label(value, style, targetUrl, imageUrl)
var label = ui.Label('Data: Dynamic World (DW) | App author: Afework Mekeberiaw', {position: 'bottom-center'});
print(label);
// set position of panel
var authere = ui.Label({
  style: {
    position: 'left-bottom',
    padding: '6px 12px'
  }
});
 var myauthere = ui.Label({
  value : 'Data : Dynamic World App Authoer : Afework Mekeberiaw ',
  Style:{
    fontWeight: 'bold',
    fontSize: '15px',
    margin:'0 0 5px 0',
    padding: '0',
  }
});
authere.add(myauthere);
Map.add(foot);