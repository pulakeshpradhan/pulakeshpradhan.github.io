var imageCollection = ee.ImageCollection("COPERNICUS/S3/OLCI");
var seaflower =  ee.FeatureCollection('ft:11V5CkjaOnQu3RrRZOuD3KSTfZBAvA1WyehSPYRP8', 'geometry');
var dataset = ee.ImageCollection('COPERNICUS/S3/OLCI')
                  .filterDate('2017-01-01', '2018-04-04');
// Set a custom basemap style and default to the satellite map type.
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
Map.setOptions('satellite', styles);
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Seaflower - imágenes TºC y Clorofila a en mg/m3',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Add the legend to the map.
Map.setCenter(-113.41842, 40.055489, 6);
Map.add(legend);
// Select bands for visualization and apply band-specific scale factors.
var rgb = dataset.select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance'])
              .mean()
              .clip(seaflower)
//              // Convert to radiance units.
            .multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]));
var visParams = {
  min: 0,
  max: 6,
  gamma: 1.5,
};
Map.setCenter(-80.61088, 13.845, 8);
Map.addLayer(rgb, visParams, 'RGB');
//#########################################################################
//
// Collect data and filter by total dates
var modisNDVI = ee.ImageCollection('MODIS/MCD43A4_NDVI');
var collection05 = ee.ImageCollection(modisNDVI)
  .filterDate('2016-01-01', '2018-04-04');
//Clip to Specified Region
var clipped05 = collection05.mean().clip(seaflower);
// Charts //
//Long-Term Time Series
var TS5 = ui.Chart.image.seriesByRegion(collection05, seaflower,  ee.Reducer.mean(),'NDVI', 500, 'system:time_start').setOptions({
          title: 'Seaflower NDVI MODIS',
          vAxis: {title: 'NDVI'},
});
print(TS5);
var clipped05 = collection05.mean().clip(seaflower)
//##################################################
// SENSOR MODIS AQUA CLOROFILA COCENTRACION mg/m3 EN EL AREA DE SEAFLOWER
var dataset = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI')
                  .filterDate('2016-01-01', '2018-08-31');
var modisaqua = dataset.mean().clip(seaflower)
var clipcloro = modisaqua.select(['chlor_a'])
var clipcoro = {
  min: 0.0,
  max: 0.011,
};
//Paleta NDWI
var palette2 = ['FFFFFF', '00F5FF', '00ECFF', '00E4FF', '00D9FF', '00CDFF',
               '00C5FF', '69CFFC', '69DFFC', '69F5FC', '69FCFB', 'EEFC69',
               'D3FC69', 'ADFC69', '49FB58', '22E332', '14B921'];
Map.addLayer(
    clipcloro, {min: 0, max: 1, palette: palette2},
    'Clorofila a mg/m3');
var Clorofila = ui.Chart.image.seriesByRegion(dataset, seaflower,ee.Reducer.mean(),'chlor_a', 500, 'system:time_start').setOptions({
          title: 'Seaflower Clorofila mg/m3- MODIS',
          vAxis: {title: 'Clorofila (a) mg/m3'},
});
print(Clorofila);
// Export the image to Cloud Storage.
Export.image.toDrive({
  image: clipcloro,
  description: 'Corofila_A',
  fileNamePrefix: 'Clorofila a',
  scale: 1000,
  region: seaflower
});
//##############################################################
// SENSOR MODIS AQUA TEMPERATURA SUPERFICIAL DEL MAR EN EL AREA SEAFLOWER
var clipsst =
    modisaqua.select(['sst'])
var remoteSensingReflectanceVis = {
  min: 0.0,
  max: 30,
};
//Paleta NDWI
var palette1 = ['FFFFFF', '00F5FF', '00ECFF', '00E4FF', '00D9FF', '00CDFF',
               '69ABFC', '69F0FC', '69FCDF', '69FCA6', '76FC69', '99FC69',
               'BDFC69', 'F1FC69', 'FCEC69', 'FCC669', 'FC8269'];
Map.addLayer(
    clipsst, {min: 0, max: 30, palette: palette1},
    'Temperatura Superficial ºC');
var sst = ui.Chart.image.seriesByRegion(dataset, seaflower,ee.Reducer.mean(),'sst', 500, 'system:time_start').setOptions({
          title: 'Seaflower Temperatura superficial ºC MODIS',
          vAxis: {title: 'Temperatura superficial ºC'},
});
print(sst);
// Export the image to Cloud Storage.
Export.image.toDrive({
  image: clipsst,
  description: 'SST',
  fileNamePrefix: 'SST',
  scale: 1000,
  region: seaflower
});