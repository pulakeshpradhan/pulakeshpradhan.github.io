var gfc2018 = ee.Image("UMD/hansen/global_forest_change_2018_v1_6");
// Load country boundaries from the Large Scale International Boundary (LSIB) dataset.
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var Southamerica = countries.filter(ee.Filter.eq('wld_rgn',  'South America'));
var Brazil = countries.filter(ee.Filter.eq('country_na',  'Brazil'));
var Bolivia = countries.filter(ee.Filter.eq('country_na',  'Bolivia'));
//print(countries)
Map.centerObject(Southamerica,3);
// Load hansen forest cover 2014
var gfc2018 = ee.Image("UMD/hansen/global_forest_change_2018_v1_6")
            .clip(Southamerica);
Map.addLayer(gfc2018,{},'Default visualization');
//print(gfc2018);
// Load the data and select the bands of interest.
var treeCover = gfc2018.select(['treecover2000']);
var lossImage = gfc2018.select(['loss']);
var gainImage = gfc2018.select(['gain']);
// Add the tree cover layer in green.
Map.addLayer(treeCover.updateMask(treeCover),
    {palette: ['000000', '00FF00'], max: 100}, 'Forest cover 2000');
// Add the loss layer in red.
Map.addLayer(lossImage.updateMask(lossImage),
            {palette: ['FF0000']}, 'Forest loss 2000-2018');
// Add the gain layer in blue.
Map.addLayer(gainImage.updateMask(gainImage),
            {palette: ['0000FF']}, 'Forest gain 2000-2018');
/*
// Add forest change, loss, adn gain in one layer
Map.addLayer(gfc2018, {
  bands: ['loss', 'treecover2000', 'gain'],
  max: [1, 255, 1]
}, 'Forest cover, loss, gain');
*/
// Sum the values of forest loss pixels in Southamerica.
var stats = lossImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: Bolivia,
  scale: 30,
  maxPixels: 1e13
});
print('Forest loss in Bolivia: ', stats.get('loss'), '(square meters)');
//----------------------------------------------------------------------
//          optional: creating Chart of Forest Loss by Year  
//----------------------------------------------------------------------
// Calculating yearly forest loss
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea());
var lossYear = gfc2018.select(['lossyear']);
var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1
    }),
  geometry: Bolivia,
  scale: 30,
  maxPixels: 1e13
});
print(lossByYear);
var statsFormatted = ee.List(lossByYear.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("20%02d"), d.get('sum')];
  });
var statsDictionary = ee.Dictionary(statsFormatted.flatten());
//print('Loss by year in square meters', statsDictionary);
/*
var chart = ui.Chart.array.values({
  array: statsDictionary.values(),
  axis: 0,
  xLabels: statsDictionary.keys()
}).setChartType('ColumnChart')
  .setOptions({
    title: 'Yearly Forest Loss',
    hAxis: {title: 'Year', format: '####'},
    vAxis: {title: 'Area (square meters)'},
    legend: { position: "none" },
    lineWidth: 1,
    pointSize: 3
  });
print(chart);
*/
//----------------------------------------------------------------------
//           optional: CREATE LEGEND  
//----------------------------------------------------------------------
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var colors = ['09ff12', 'ff0a0a', '0a2eff'];
var names = ['Tree cover 2000', 'Forest loss 2000-2018', 'Forest gain 2000-2018'];
// Create and add the legend title.
var legend = ui.Panel({style: {position: 'bottom-right'}});
legend.add(ui.Label({
  value: "South America forest change",
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '4px',
    padding: '4px'
  }
}));
var entry;
for (var x = 0; x<3; x++){  //number of legend
  entry = [
    ui.Label({style:{color:colors[x],margin: '0 0 4px 0'}, value:'██'}),
    ui.Label({
      value: names[x],
      style: {
        margin: '0 0 4px 4px'
      }
    })
  ];
  legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
Map.add(legend);