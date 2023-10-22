// Create the application title bar.
Map.add(ui.Label(
    'Peta Kerentanan Covid-19', {fontWeight: 'bold', fontSize: '24px'}));
// Population Density
var dataset1 = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density").first();
var raster = dataset1.select('population_density');
var raster_vis = {
  "max": 1000.0,
  "palette": [
    "ffffe7",
    "FFc869",
    "ffac1d",
    "e17735",
    "f2552c",
    "9f0c21"
  ],
  "min": 200.0
};
Map.setCenter(115, -1, 5);
Map.addLayer(raster, raster_vis, 'Population Density');
// Population
var dataset = ee.ImageCollection('WorldPop/POP');
var population = dataset.select('population');
var populationVis = {
  min: 0.0,
  max: 50.0,
  palette: ['24126c', '1fff4f', 'd4ff50'],
};
//Map.setCenter(113.643, 34.769, 7);
Map.addLayer(population, populationVis, 'Population');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Population (/90m2)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((populationVis.max-populationVis.min)/100.0).add(populationVis.min);
var legendImage = gradient.visualize(populationVis);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(populationVis['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x50'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(populationVis['min'])
    ],
  });
legend.add(panel);
Map.add(legend);