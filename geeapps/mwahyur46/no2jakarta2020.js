var jabodetabek = ui.import && ui.import("jabodetabek", "table", {
      "id": "users/mwahyur46/Batas_Jabodetabek"
    }) || ee.FeatureCollection("users/mwahyur46/Batas_Jabodetabek");
//NO2 Monthly Mean Timeseries
Map.centerObject(jabodetabek, 10)
var date1 = '2020-01-01'
var date2 = '2020-12-31'
var col = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
          .filterBounds(jabodetabek)
          .filterDate(date1, date2)
          .select('NO2_column_number_density')
          .map(function(a) {
            return a.set('month', ee.Image(a).date().get('month'))
          })
//print(col)
//Aggregate
var months = ee.List(col.aggregate_array('month')).distinct()
//print(months)
var mc = months.map(function(x){
  return col.filterMetadata('month', 'equals', x).mean().set('month', x)
})
var final_image = ee.ImageCollection.fromImages(mc)
//Vizualisation
var band_viz = {
  min: 0,
  max: 0.0002,
  opacity: 0.6,
  palette: ['073b4c', '118ab2', '06d6a0', 'ffd166', 'ef476f']
};
Map.addLayer(col.mean().clip(jabodetabek), band_viz, 'S5P N02');
//-------------Plot NO2-------------//
var no2chart = ui.Chart.image.series(final_image, jabodetabek, ee.Reducer.mean(), 100, 'month')
//print(no2chart);
//-------------Create User Interface portion-------------//
//-------------Create a panel to hold widgets-------------//
var panel = ui.Panel();
panel.style().set('width', '300px');
//-------------Create an intro panel with labels-------------//
var intro = ui.Panel([
   ui.Label({
    value: '#30DayMapChallenge 2022 Day 7 - Raster',
    style: {fontWeight: 'bold',color: '415a77'}}),
  ui.Label({
    value: 'How COVID-19 Pandemic Affected Air Quality',
    style: {fontSize: '20px', color: '118ab2', fontWeight: 'bold'}
  }), 
  ui.Label({
    value: 'linkedin.com/in/mwahyur',
    style: {fontWeight: 'bold',color: '415a77'}}),
  ui.Label('This map shows the concentration of Nitrogen Dioxide (NO2) in Jakarta for the full year of 2020 when the pandemic hit. NO2 is the result of anthropogenic activities, especially fossil fuel combustion that enter the atmosphere. The NO2 pattern was quite stagnant in the first five months but gradually increased until reaching its peak in October. Then drastically dropped at the end of the year, in line with the pandemic statistic in Indonesia which increased during that period and the government has announced will impose an emergency public activity restriction (PPKM Darurat).'),
  ui.Label({
    value : 'Data source : Sentinel-5P NRTI NO2: Near Real-Time Nitrogen Dioxide (NO2) Data (European Union/ESA/Copernicus)',
    style: {fontSize: '10px',color: '415a77'}}),
 ui.Label({
    value: 'Click a point on the map to inspect',
    style: {fontWeight: 'bold',color: '415a77'}})
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
// Update the lon/lat panel with values from the click event.
lon.setValue('lon: ' + coords.lon.toFixed(2)),
lat.setValue('lat: ' + coords.lat.toFixed(2));
var point = ee.Geometry.Point(coords.lon, coords.lat);
//Time Series Chart
var chart = ui.Chart.image.series(final_image, point, ee.Reducer.mean(),100, 'month')
.setOptions({
  title:  'NO2 Concentration jakarta Jakarta 2020',
  vAxix: {title:  'Concentration'},
  hAxis: {title: 'Month', gridlines: {count: 7}}
})
panel.widgets().set(2, chart);
});
Map.style().set('cursor', 'crosshair');
panel.add(no2chart);
//Add the panel to the ui.root
ui.root.insert(0, panel)
//---------------Legend---------------//
// Vis parameter:  
  var vis_wff = {
    min: -0.0006,
    max: 0.0096,
    opacity: 0.6,
    palette: ['073b4c', '118ab2', '06d6a0', 'ffd166', 'ef476f']
  };
// Create color bar
  function makeColorBarParams(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      position: 'bottom-left',
      min: 0,
      max: 1,
      palette: palette,
    };
  }
  // Thumbnail for the color bar
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis_wff.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '15px',position: 'bottom-left' },
  });
// Title  
  var legendTitle = ui.Label({
    value: 'NO2 Concentration (μmol/m^2)',
    style: {fontWeight: 'bold',color: '415a77'}
  });
// Labels
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis_wff.min, {margin: '4px 8px'}),
      ui.Label(
          ((vis_wff.max-vis_wff.min) / 2+vis_wff.min),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis_wff.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
// Add the legend to the map
  var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
  legendPanel.style().set({
    position: 'bottom-left'
  });
panel.add(legendPanel);
//--------------Basemap-------------//
var Light = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.setOptions('Light', {'Light': Light});