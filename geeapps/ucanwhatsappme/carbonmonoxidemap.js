var region = ui.import && ui.import("region", "table", {
      "id": "users/ucanwhatsappme/India_Shapefile"
    }) || ee.FeatureCollection("users/ucanwhatsappme/India_Shapefile");
var data=ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
            .filterDate('2019-06-01','2019-06-06')
            .select('CO_column_number_density');
var vis={
   min: 0,
  max: 0.05,
  palette:['black','blue','purple','cyan','green','yellow','red']
};
var clip=data.mean().clip(region);
Map.centerObject(region,5);
Map.addLayer(clip,vis,"Total vertical column of NO2");
//apply legends
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
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
//adding legend title
var legendTitle = ui.Label({
  value: 'Map Legend:Vertically integrated CO column density.',
  style: {fontWeight: 'bold'}
});
var legendPanel=ui.Panel([legendTitle,colorBar,legendLabels]);
Map.add(legendPanel);