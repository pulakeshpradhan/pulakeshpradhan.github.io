var narsapurMandal = ui.import && ui.import("narsapurMandal", "table", {
      "id": "users/rambabu/narsapur_mandal"
    }) || ee.FeatureCollection("users/rambabu/narsapur_mandal"),
    water = ui.import && ui.import("water", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.28446395288265,
                17.727534052288178
              ],
              [
                78.28417427202866,
                17.726818691632303
              ],
              [
                78.28398651984375,
                17.72637925556402
              ],
              [
                78.28461415706707,
                17.726246403138404
              ],
              [
                78.28461415640827,
                17.726333268599262
              ],
              [
                78.28527934492476,
                17.726379256490635
              ],
              [
                78.28526325234336,
                17.726956654051595
              ],
              [
                78.28450686976346,
                17.727074177597594
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.26065715685316,
                17.79719544156002
              ],
              [
                78.26132234468885,
                17.797031995074143
              ],
              [
                78.26157983675428,
                17.797563195605992
              ],
              [
                78.26097902193494,
                17.797644918624414
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#2938c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #2938c2 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[78.28446395288265, 17.727534052288178],
                  [78.28417427202866, 17.726818691632303],
                  [78.28398651984375, 17.72637925556402],
                  [78.28461415706707, 17.726246403138404],
                  [78.28461415640827, 17.726333268599262],
                  [78.28527934492476, 17.726379256490635],
                  [78.28526325234336, 17.726956654051595],
                  [78.28450686976346, 17.727074177597594]]]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.26065715685316, 17.79719544156002],
                  [78.26132234468885, 17.797031995074143],
                  [78.26157983675428, 17.797563195605992],
                  [78.26097902193494, 17.797644918624414]]]),
            {
              "landcover": 0,
              "system:index": "1"
            })]),
    forest = ui.import && ui.import("forest", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.3051492609263,
                17.721995026387933
              ],
              [
                78.30549252304687,
                17.721075300949114
              ],
              [
                78.30866814997809,
                17.71995115827164
              ],
              [
                78.3093226319015,
                17.7203599083897
              ],
              [
                78.30911880827564,
                17.721013933105155
              ],
              [
                78.30720910312314,
                17.721790553902142
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.27653420131163,
                17.717074284619798
              ],
              [
                78.27610504786925,
                17.709306934432878
              ],
              [
                78.27833664576964,
                17.70865282643345
              ],
              [
                78.27962410609679,
                17.72377846377456
              ],
              [
                78.27747833888488,
                17.7242690036267
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.19752305863413,
                17.8075772552309
              ],
              [
                78.19760888932261,
                17.801284823558227
              ],
              [
                78.20232957718882,
                17.799323500790134
              ],
              [
                78.20327371476206,
                17.80340956556329
              ],
              [
                78.20207208512339,
                17.80651491220899
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#0dff0f",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0dff0f */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[78.3051492609263, 17.721995026387933],
                  [78.30549252304687, 17.721075300949114],
                  [78.30866814997809, 17.71995115827164],
                  [78.3093226319015, 17.7203599083897],
                  [78.30911880827564, 17.721013933105155],
                  [78.30720910312314, 17.721790553902142]]]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.27653420131163, 17.717074284619798],
                  [78.27610504786925, 17.709306934432878],
                  [78.27833664576964, 17.70865282643345],
                  [78.27962410609679, 17.72377846377456],
                  [78.27747833888488, 17.7242690036267]]]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.19752305863413, 17.8075772552309],
                  [78.19760888932261, 17.801284823558227],
                  [78.20232957718882, 17.799323500790134],
                  [78.20327371476206, 17.80340956556329],
                  [78.20207208512339, 17.80651491220899]]]),
            {
              "landcover": 1,
              "system:index": "2"
            })]),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.27746875198592,
                17.73922665587616
              ],
              [
                78.27819831283797,
                17.73599751338696
              ],
              [
                78.28133113296737,
                17.73722377688407
              ],
              [
                78.28064448745955,
                17.73910403127536
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.25443610647731,
                17.742583236531708
              ],
              [
                78.25473651388698,
                17.74151028853756
              ],
              [
                78.25575575331264,
                17.741418321267496
              ],
              [
                78.25678572157436,
                17.74220515082921
              ],
              [
                78.25624927977138,
                17.742705858750288
              ],
              [
                78.25494036177211,
                17.742705858750288
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#ff783e",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff783e */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[78.27746875198592, 17.73922665587616],
                  [78.27819831283797, 17.73599751338696],
                  [78.28133113296737, 17.73722377688407],
                  [78.28064448745955, 17.73910403127536]]]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[78.25443610647731, 17.742583236531708],
                  [78.25473651388698, 17.74151028853756],
                  [78.25575575331264, 17.741418321267496],
                  [78.25678572157436, 17.74220515082921],
                  [78.25624927977138, 17.742705858750288],
                  [78.25494036177211, 17.742705858750288]]]),
            {
              "landcover": 2,
              "system:index": "1"
            })]),
    villages = ui.import && ui.import("villages", "table", {
      "id": "users/rambabu/NarsapurVillages"
    }) || ee.FeatureCollection("users/rambabu/NarsapurVillages");
var FieldData = ee.Geometry.Point([78.262295, 17.740298]);
print(FieldData);
Map.addLayer(FieldData, {}, 'feature');
var CropFieldData = ee.FeatureCollection("users/rambabu/Narsapur/CropData1");
print('Crop Field Data: ' + CropFieldData.size().getInfo(),CropFieldData);
var points = CropFieldData;
//Filter By Crop Type -------------- 
points = CropFieldData.filter("ndvi>0.65");
print('Crops: ' +  points.size().getInfo(),points);
//---------------------------
var FromDate='2020-01-01';  
var ToDate='2020-10-06';
Map.centerObject(narsapurMandal,12);
Map.addLayer(narsapurMandal,null,"Narsapur Mandal",true,0.1);
Map.style().set('cursor', 'crosshair');
var village = villages.filter(ee.Filter.eq("NAME",'Awancha')); 
print(village)
 // Adding a NDVI band
  var addNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi').multiply(100).round().divide(100)
    return image.addBands([ndvi])
  }
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);//.divide(10000);
}
// Load the Landsat 8 scaled radiance image collection.
var images = ee.ImageCollection('COPERNICUS/S2')
      .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 19))
      .filter(ee.Filter.eq("MGRS_TILE","43QHV")) //44QKE or 43QHV
      .filter("CLOUD_COVERAGE_ASSESSMENT<80")
      //.map(maskS2clouds)
      .map(addNDVI)
      .filterBounds(narsapurMandal)
      .filterDate(FromDate, ToDate);
//Show Recent True Color Image
var image = images.limit(10, 'system:time_start', false).first(); //false for descending order
print(image);
// Define a boxcar or low-pass kernel.
var boxcar = ee.Kernel.square({
radius: 1, units: 'pixels', normalize: true, magnitude:1
});
var composite = image.clip(narsapurMandal);
print(composite);
// Visualize the Composite
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min:0, max: 3000, gamma: 2}, 'Sentinel Image', false);
var date = ee.Date(composite.get('system:time_start')).format('dd-MMM-yyyy');
print('Timestamp: ', date); // ee.Date
// Merge points together
var newfc = water.merge(urban).merge(forest).merge(points);
print(newfc, 'newfc')
// Select the bands for training
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
// Sample the input imagery to get a FeatureCollection of training data.
var training = composite.select(bands).sampleRegions({
  collection: newfc,
  properties: ['landcover'],
  scale: 10,
  geometries:true
});
// Make a Random Forest classifier and train it.
var classifier = ee.Classifier.randomForest().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});
// Classify the input imagery.
var classified = composite.select(bands).classify(classifier);
// Define a palette for the Land Use classification.
var palette = [
  '0000ff', // water (0)  // blue
  '74A901', //  forest (1) // green
  'D3D3D3', // urban (2)  // grey
  '008000', // crops (3)  // dark green
  '000000', // bare soil (4)  // 
  'ff0000', //paddy (5)
  'ffff00', //cotton (6)
  '00ffff' //maize (7)
];
// Display the classification result and the input image.
//Map.addLayer(classified, {min: 0, max: 7, palette: palette}, 'Classification');
var CalculateArea = function(crop)
{
  var cropArea = crop.divide(crop)
                     .multiply(ee.Image.pixelArea())
                     .rename('CropArea')
                     .divide(1e4);
  // calculate area 
  var stats = cropArea.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: narsapurMandal, 
    scale: 10,
  })
  return parseInt(stats.get("CropArea").getInfo());
  //print("Crop Area (hectares):", parseInt(stats.get("CropArea").getInfo()));
}
var waterLayer = classified.eq(0);
var waterPalette = ['white','0000ff'];
Map.addLayer(waterLayer.updateMask(waterLayer), {min: 0, max: 1, palette: waterPalette}, "Water");
var cropLayer = classified.eq(5);
var cropPalette = ['white','00ff00'];
Map.addLayer(cropLayer.updateMask(cropLayer), {min: 0, max: 1, palette: cropPalette}, "Paddy");
var cottonLayer = classified.eq(6);
var cottonPalette = ['white','ffff00'];
Map.addLayer(cottonLayer.updateMask(cottonLayer), {min: 0, max: 1, palette: cottonPalette}, "Cotton");
var maizeLayer = classified.eq(7);
var maizePalette = ['white','00ffff'];
Map.addLayer(maizeLayer.updateMask(maizeLayer), {min: 0, max: 1, palette: maizePalette}, "Maize");
var redgramLayer = classified.eq(10);
var redgramPalette = ['white','FFAE00'];
Map.addLayer(redgramLayer.updateMask(redgramLayer), {min: 0, max: 1, palette: redgramPalette}, "Redgram");
// Show the farm locations in red
Map.addLayer(points, {color: 'red'}, 'Field Data')
//-----------------------------------------
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
var CropPalette = [
  '0000ff', // water (0)  // blue
  '00ff00', //paddy (5)
  'ffff00', //cotton (6)
  '00ffff', //maize (7),
  'FFAE00', //redgram (9)
  'ff0000' //Field Data
];
// name of the legend
var names = [
  'Water',
  'Paddy (' + CalculateArea(cropLayer) + " ha)",
  'Cotton (' + CalculateArea(cottonLayer) + " ha)",
  'Maize (' + CalculateArea(maizeLayer) + " ha)",
  'Redgram (' + CalculateArea(redgramLayer) + " ha)",
  'field data'
];
//var names = ['Red','Green','Blue'];
// Add color and and names
for (var i = 0; i < names.length; i++) {
  legend.add(makeRow(CropPalette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);  
//Add Map Title at Top
var titlePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'bottom-center', padding:'1px'}
});
var MapTitle = "Narsapur Mandal (" + date.getInfo() + ")";
titlePanel.add(ui.Label({value: MapTitle,
    style: {color:'black',fontSize: '18px'}
  }));
Map.add(titlePanel);