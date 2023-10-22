/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var water = /* color: #0010d6 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([56.112811802264446, 24.783543283719652]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([56.114356754657024, 24.778945593856236]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11191058003544, 24.778945593856236]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([56.1096957886989, 24.794321870599617]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10795771725725, 24.793640079808156]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10891723477482, 24.79381928392297]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11023688161015, 24.780601561102255]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10773718093651, 24.79361405685221]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10971128677147, 24.794023131862655]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([56.12273597561955, 24.800539619834286]),
            {
              "landcover": 1,
              "system:index": "9"
            })]),
    settlement = /* color: #f7ffcc */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([56.1150374174008, 24.79580600808328]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([56.116636013973675, 24.794929429723684]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([56.123663401592694, 24.79952652727489]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([56.116625285137616, 24.798455185024224]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11575264279645, 24.806525675417003]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11656803433698, 24.80578551808944]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([56.121975367711, 24.804324668290292]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10309261624616, 24.807499559904457]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([56.100914662526066, 24.807519037516165]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([56.12370271031659, 24.799523220691597]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11649293248456, 24.79498456176941]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10735196416181, 24.79506248006206]),
            {
              "landcover": 2,
              "system:index": "11"
            })]),
    treecover = /* color: #1b8b06 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([56.110118246067486, 24.788763986915715]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11170074938627, 24.788043204244133]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11468473706043, 24.794033365441614]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11508170399463, 24.79399440597816]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([56.113804972503544, 24.795104745891255]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11819306645191, 24.794228162575358]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11245311776884, 24.799429206374377]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([56.109491959016395, 24.800481061495468]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([56.1026377211291, 24.785356177240804]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([56.071502638884226, 24.801271207833317]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([56.06849856478755, 24.800258316922896]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([56.12293982350468, 24.80559424119555]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([56.121309040423625, 24.797763873059274]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([56.12246775471806, 24.79149143048556]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([56.115343807574504, 24.78580310273943]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([56.104614971514934, 24.7934783876144]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([56.112854717608684, 24.804659297864657]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10150360905766, 24.80571110861614]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11976408803105, 24.80600327668559]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([56.12253212773442, 24.807503061935254]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11852987652151, 24.80361757619217]),
            {
              "landcover": 0,
              "system:index": "20"
            })]),
    rock = /* color: #ff0000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([56.082604624638634, 24.777008295951514]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08923504532345, 24.772877958092394]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08166048706539, 24.772858475041023]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08612368286617, 24.77714467268807]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08518144850632, 24.77072839493254]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10185405974289, 24.778321812857246]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10404274229904, 24.768872588437404]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([56.082520697163545, 24.76234538466203]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09895014607548, 24.801036325860863]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09025978886723, 24.804094432852057]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08543181264042, 24.804620341739515]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([56.109134743616664, 24.78725176833309]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11754615108737, 24.781154130115315]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([56.078093288775676, 24.78903691009151]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08822131001591, 24.754278808352]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11173891865849, 24.753343478390487]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09628939473271, 24.759267115904414]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([56.115630205432694, 24.772988840650264]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09272418349974, 24.79500325193713]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([56.123357621712216, 24.754152410726597]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11827215341998, 24.756997332310938]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([56.113916245979794, 24.750956667709442]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10561212686969, 24.74813109476336]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([56.074660061236614, 24.749757981653644]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([56.07680582844853, 24.777737697929847]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10933503544709, 24.756832261075477]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09963916375182, 24.756103488722935]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09455369545958, 24.757428507991367]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([56.094954392485306, 24.774325893864575]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09667100625484, 24.772182764878252]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([56.11598722286476, 24.7611767078066]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([56.09126798458351, 24.763904561849188]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10577337093605, 24.751979501342593]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([56.1235403234507, 24.748082174618443]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([56.076663994648925, 24.78438249300026]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([56.07906725392627, 24.784070792703407]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([56.08612289180792, 24.79375208422357]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([56.10049509846806, 24.787478459239054]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([56.07504629933476, 24.77364635020411]),
            {
              "landcover": 3,
              "system:index": "38"
            })]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//import AOI
var aoi = ee.FeatureCollection('ft:1bZli-fbuy3oWrAOlh9zgstqqMYgR9hkqDF91IQDx');
var srtm = ee.Image('USGS/SRTMGL1_003'); 
var slope = ee.Terrain.slope(srtm);
var shade = ee.Terrain.hillshade(srtm);
//display AOI on map
//Map.addLayer(aoi, {}, "Study Area"); 
//Define the object with zoom scale 
Map.centerObject(aoi, 13);
var collection2018 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-11-01', '2018-11-30')
    .filterBounds(aoi)
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',40)
    .mosaic();
//print(collection2018);
var image = collection2018.clip(aoi);
Map.addLayer(image, {min:0, max:3000, bands: ["B6", "B5", "B4"]}, 'Sentinel-2 (05 Nov 2018)');
var ndvi = collection2018.normalizedDifference(["B8", "B4"]);
Map.addLayer(ndvi.clip(aoi), {min:0.1, max:1, palette:'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
  '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'}, "NDVI", false);
// the normalize difference water index
var ndwi = collection2018.normalizedDifference(['B3', 'B8']);
Map.addLayer(ndwi.clip(aoi), {min:0.39, max:1, palette:['FFFFFF', '0367A6', '398CBF', '79B4D9', 'A7C6D9', 'F2F2F2', 'FFFFFF','FFFFC1', 'FFFF93', 
  'FFFF6D', 'FFFF3E', 'FFFF00']}, "NDWI", false);
Map.addLayer(srtm.clip(aoi), {min:0, max:8848}, 'DEM', false);
Map.addLayer(slope.clip(aoi), {min:0, max:60}, 'slope', false);
Map.addLayer(shade.clip(aoi), {}, 'hillshade', false);
// Merge the hand-drawn features into a single FeatureCollection.
var newfc = treecover.merge(water).merge(settlement).merge(rock);
var bands = ['B2', 'B3', 'B4', 'B5', 'B6','B8', 'B8A', 'B11', 'B12'];
var points = image.select(bands).sampleRegions({
  collection: newfc, 
  properties: ['landcover'], 
  scale: 10
}).randomColumn();
var training = points.filter(ee.Filter.lt('random', 0.8));
var validation = points.filter(ee.Filter.gte('random', 0.2));
// Get a Random Forest classifier and train it.
var classifier = ee.Classifier.randomForest().train({
  features: training, 
  classProperty: 'landcover', 
  inputProperties: bands
});
// Classify the image.
var classified = image.select(bands).classify(classifier);
// Display the classification results.
var ISBClassified = Map.addLayer(classified.clip(aoi), {min: 0, max: 3, palette: ['1b8b06', '0010d6', 'f7ffcc', 'ffc82d']}, 'Classification-2018');
// Classify the validation data.
var validated = validation.classify(classifier);
print(validated);
// Get a confusion matrix representing expected accuracy.
var testAccuracy = validated.errorMatrix('landcover', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());
// Add legend
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Land cover class',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('1b8b06', 'Forest'));
legend.add(makeRow('0010d6', 'Water'));
legend.add(makeRow('f7ffcc','Settlement'));
legend.add(makeRow('ffc82d', 'Rock'));
// Add the legend to the map.
Map.add(legend);
// Compute pixel area in square kilo meters per landcover type.
var stats = ee.Image.pixelArea().divide(10000).addBands(classified).reduceRegion({
  reducer: ee.Reducer.sum().group(1),
  geometry: aoi,
  scale: 10
});
print('Area per class', stats);
var dataTable = {
  cols: [{id: 'name', label: 'Land cover class', type: 'string'},
         {id: 'year', label: 'Area (ha)', type: 'number'}],
  rows: [{c: [{v: 'Forest'}, {v: 69}]},
         {c: [{v: 'Water'}, {v: 25}]},
         {c: [{v: 'Settlement'}, {v: 47}]},
         {c: [{v: 'Rock'}, {v: 3641}]}]
};
// Define a dictionary of customization options.
var options = {
  title: 'Land cover area estimations',
  palette: ['1b8b06', '0010d6', 'f7ffcc', 'ffc82d'],
  is3D: true,
  vAxis: {title: 'Land cover clsass'},
  legend: {position: 'none'},
   hAxis: {
    title: 'Area (ha)',
    logScale: false
  }
};
// Make a BarChart from the table and the options.
var chart = new ui.Chart(dataTable, 'BarChart', options);
// Print the chart to display it in the console.
//print(chart);
// Create the panel for the legend items.
var legend1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '30px 30px'
  }
});
legend1.add(chart);
// Add the legend to the map.
Map.add(legend1);
//Export classified data 
Export.image(classified, 'Landcover_map', {
  scale: 10,
  'region': aoi,
  maxPixels: 230000000
});