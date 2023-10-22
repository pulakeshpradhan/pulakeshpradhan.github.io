var Peat_thickness_median = ui.import && ui.import("Peat_thickness_median", "image", {
      "id": "users/adamhastie50/Peru_Peat_Maps/Peat_thickness_median_LPA_100m"
    }) || ee.Image("users/adamhastie50/Peru_Peat_Maps/Peat_thickness_median_LPA_100m"),
    ROI = ui.import && ui.import("ROI", "table", {
      "id": "users/adamhastie50/Peru_Peat_Maps/Ecozone_selva_baja_hidromorphico2"
    }) || ee.FeatureCollection("users/adamhastie50/Peru_Peat_Maps/Ecozone_selva_baja_hidromorphico2");
/*
This code is used to display modelled peat thickness (cm) distribution across the peatlands of lowland Peruvian Amazonia at 100m resolution, and to calculate mean peat thickness; please refer to (and cite where appropriate) the following paper published in Nature Geoscience for more details,
 "Hastie et al. (2022). Risks to carbon storage from land-use change revealed by peat thickness maps of Peru".
**************************/
var Mean_median = Peat_thickness_median.reduceRegion({
  reducer: ee.Reducer.mean(),
scale: 100,
maxPixels: 1e13});
print('Mean peat thickness (cm) at 100m resolution',Mean_median );
var vis = {min: 0, max: 500, palette: ['black','navy','purple','orange','yellow']};
// Create a legend
// set position of panel
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        ((vis.max-vis.min) / 2+vis.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'}),
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Peat thickness (cm)',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legend.add(legendPanel);
Map.add(legend);
Map.centerObject(ROI, 6); 
Map.addLayer(Peat_thickness_median, {min: 0, max: 500, palette: ['black','navy','purple','orange','yellow']});