var poligono = ee.FeatureCollection("users/eduardo2188/Ambito");
var poligono = ee.FeatureCollection("users/eduardo2188/Ambito");
var mosaico = {
 'Área de Glaciares' : ee.FeatureCollection("users/eduardo2188/Ambito"),
//'Landsat 1975 ': ee.ImageCollection('LANDSAT/LM02/C01/T1')
//                  .filterDate('1975-01-01', '1975-12-31')
//                  .filterMetadata('CLOUD_COVER', 'less_than',20)
//                  .median()
//                  .clip(poligono)
//                  .visualize({bands: ['B6','B5','B4'], min: [0,0,0], max: [120, 120, 120]}),
//  'Landsat 1980 ': ee.ImageCollection('LANDSAT/LM03/C01/T1')
 //                 .filterDate('1980-01-01', '1980-12-31')
 //                 .filterMetadata('CLOUD_COVER', 'less_than',20)
 //                 .median()
 //                 .clip(poligono)
//                  .visualize({bands: ['B6','B5','B4'], min: [0,0,0], max: [120, 120, 120]}),
 'Landsat 1985 ': ee.ImageCollection('LANDSAT/LT05/C01/T1')
                  .filterDate('1985-01-01', '1987-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B5','B4','B3'], min: [0,0,0], max: [120, 120, 120]}),
 'Landsat 1990 ': ee.ImageCollection('LANDSAT/LT05/C01/T1')
                  .filterDate('1990-01-01', '1991-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B5','B4','B3'], min: [0,0,0], max: [125, 125, 125]}),
 'Landsat 1995 ': ee.ImageCollection('LANDSAT/LT05/C01/T1')
                  .filterDate('1995-01-01', '1995-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B5','B4','B3'], min: [0,0,0], max: [125, 125, 125]}),
 'Landsat 2000':  ee.ImageCollection('LANDSAT/LT05/C01/T1')
                  .filterDate('2000-01-01', '2000-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B5','B4','B3'], min: [0,0,0], max: [125, 125, 125]}),
 'Landsat 2005':  ee.ImageCollection('LANDSAT/LT05/C01/T1')
                  .filterDate('2005-01-01', '2005-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B5','B4','B3'], min: [0,0,0], max: [125, 125, 125]}),
 'Landsat 2010':  ee.ImageCollection('LANDSAT/LT05/C01/T1')
                  .filterDate('2010-01-01', '2010-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B5','B4','B3'], min: [0,0,0], max: [125, 125, 125]}),
 'Landsat 2015':  ee.ImageCollection('LANDSAT/LC08/C01/T1')
                  .filterDate('2015-01-01', '2015-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',60)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B6','B5','B4'], min: [0,0,0], max: [32000, 32000, 32000]}),
 'Landsat 2019':  ee.ImageCollection('LANDSAT/LC08/C01/T1')
                  .filterDate('2019-01-01', '2019-12-31')
                  .filterMetadata('CLOUD_COVER', 'less_than',20)
                  .median()
                  .clip(poligono)
                  .visualize({bands: ['B6','B5','B4'], min: [0,0,0], max: [32000, 32000, 32000]}),
};
// Create two maps.
var leftMap = ui.Map();
//leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
//rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Glaciares Estudio');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(mosaico[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(mosaico), onChange: updateMap});
  select.setValue(Object.keys(mosaico)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);