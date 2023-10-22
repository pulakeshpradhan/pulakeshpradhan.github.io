Map.setOptions('SATELLITE')//,{'opacity': 0.5});
var geometry = ee.FeatureCollection("users/delaralfonso/JOHNDEERE/Limites/ADR")
var parcelas = ee.FeatureCollection("users/delaralfonso/JOHNDEERE/Limites/Parcela_ADR")
var image = ee.Image('users/delaralfonso/JOHNDEERE/Classif/S2sr_ADR_E2223_Classif');
var empty = ee.Image().byte();
var outlineDepto = empty.paint({
  featureCollection: geometry,
  color: 1,
  width: 4
});
var outlineParcel = empty.paint({
  featureCollection: parcelas,
  color: 2,
  width: 2
});
Map.setCenter(-59.128117,-37.316937, 11)
Map.addLayer(image, {'min': 1, 'max': 3, 'palette': ['LimeGreen', 'red','yellow']}, 'Cobertura Estivales 2022-23');
Map.addLayer(outlineParcel, {palette: 'black'}, 'Parcelas');
Map.addLayer(outlineDepto, {palette: 'black'}, 'Partidos');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Cultivos Estivales 22-23',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['32CD32','FF0000', 'FFFF00'];
// name of the legend
var names = ['MAIZ','SOJA','GIRASOL'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  */
Map.add(legend);  
// Add reducer output to the Features in the collection.
var maineMeansFeatures = image.reduceRegions({
  collection: geometry,
  reducer: ee.Reducer.mean(),
  scale: 20,
});
// Print the first feature, to illustrate the result.
print(ee.Feature(maineMeansFeatures.first()).select(image.bandNames()));