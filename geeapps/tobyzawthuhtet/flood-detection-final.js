var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.75760532426786,
                16.73730362530817
              ],
              [
                94.75760532426786,
                16.712972503972296
              ],
              [
                94.78584362077665,
                16.712972503972296
              ],
              [
                94.78584362077665,
                16.73730362530817
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffd900",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffd900 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[94.75760532426786, 16.73730362530817],
          [94.75760532426786, 16.712972503972296],
          [94.78584362077665, 16.712972503972296],
          [94.78584362077665, 16.73730362530817]]], null, false),
    plantlocation = ui.import && ui.import("plantlocation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            94.77244747145737,
            16.72265325094931
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff1041",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff1041 */ee.Geometry.Point([94.77244747145737, 16.72265325094931]),
    buffer = ui.import && ui.import("buffer", "table", {
      "id": "users/tobyzawthuhtet/flat_buffer"
    }) || ee.FeatureCollection("users/tobyzawthuhtet/flat_buffer"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.76777033425228,
                16.724231698786568
              ],
              [
                94.76759867287532,
                16.723245294727075
              ],
              [
                94.76762013054744,
                16.722423287446386
              ],
              [
                94.76777033425228,
                16.72162182693643
              ],
              [
                94.768184074376,
                16.720800022251453
              ],
              [
                94.76882780453957,
                16.719957453940328
              ],
              [
                94.76975048444069,
                16.71921763479341
              ],
              [
                94.77123106381691,
                16.718560015365004
              ],
              [
                94.77288330457009,
                16.718518914075446
              ],
              [
                94.77408493420876,
                16.71886827475436
              ],
              [
                94.77511490247048,
                16.719299837062557
              ],
              [
                94.77612341306008,
                16.720306811984457
              ],
              [
                94.77676714322365,
                16.721437083625318
              ],
              [
                94.77702463528908,
                16.722485147707
              ],
              [
                94.77700317761696,
                16.723409905348767
              ],
              [
                94.77683151624001,
                16.724416858569576
              ],
              [
                94.77655256650246,
                16.725197757406406
              ],
              [
                94.77610195538796,
                16.725752604636458
              ],
              [
                94.77567280194557,
                16.72626635063204
              ],
              [
                94.7751363601426,
                16.72671844596304
              ],
              [
                94.77442825696266,
                16.727067791620907
              ],
              [
                94.77348411938942,
                16.72743768632563
              ],
              [
                94.77258289716042,
                16.72754043472737
              ],
              [
                94.77146709821022,
                16.72749933537332
              ],
              [
                94.77060879132546,
                16.72723218935605
              ],
              [
                94.77002943417824,
                16.72692394348638
              ],
              [
                94.76929987332619,
                16.726471848642667
              ],
              [
                94.7686346854905,
                16.725773154502853
              ],
              [
                94.76831282040871,
                16.725444356374656
              ],
              [
                94.76811970135964,
                16.72503335791705
              ],
              [
                94.76790512463845,
                16.72460180858312
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[94.76777033425228, 16.724231698786568],
          [94.76759867287532, 16.723245294727075],
          [94.76762013054744, 16.722423287446386],
          [94.76777033425228, 16.72162182693643],
          [94.768184074376, 16.720800022251453],
          [94.76882780453957, 16.719957453940328],
          [94.76975048444069, 16.71921763479341],
          [94.77123106381691, 16.718560015365004],
          [94.77288330457009, 16.718518914075446],
          [94.77408493420876, 16.71886827475436],
          [94.77511490247048, 16.719299837062557],
          [94.77612341306008, 16.720306811984457],
          [94.77676714322365, 16.721437083625318],
          [94.77702463528908, 16.722485147707],
          [94.77700317761696, 16.723409905348767],
          [94.77683151624001, 16.724416858569576],
          [94.77655256650246, 16.725197757406406],
          [94.77610195538796, 16.725752604636458],
          [94.77567280194557, 16.72626635063204],
          [94.7751363601426, 16.72671844596304],
          [94.77442825696266, 16.727067791620907],
          [94.77348411938942, 16.72743768632563],
          [94.77258289716042, 16.72754043472737],
          [94.77146709821022, 16.72749933537332],
          [94.77060879132546, 16.72723218935605],
          [94.77002943417824, 16.72692394348638],
          [94.76929987332619, 16.726471848642667],
          [94.7686346854905, 16.725773154502853],
          [94.76831282040871, 16.725444356374656],
          [94.76811970135964, 16.72503335791705],
          [94.76790512463845, 16.72460180858312]]]),
    Plant_site = ui.import && ui.import("Plant_site", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.77207117667012,
                16.722921887544587
              ],
              [
                94.77194779505544,
                16.722808861561923
              ],
              [
                94.77189951529317,
                16.722546846526264
              ],
              [
                94.77160447230153,
                16.72248005832233
              ],
              [
                94.77143817534261,
                16.72224373064372
              ],
              [
                94.77229111780935,
                16.72200740267223
              ],
              [
                94.77312260260396,
                16.722048503210058
              ],
              [
                94.77327817072683,
                16.722099878869873
              ],
              [
                94.7730331158812,
                16.722538855178865
              ],
              [
                94.772815856951,
                16.72287279586161
              ],
              [
                94.77266565324616,
                16.72286252077239
              ],
              [
                94.77264687778306,
                16.723093710145733
              ],
              [
                94.77205679179978,
                16.723055178602976
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Polygon(
        [[[94.77207117667012, 16.722921887544587],
          [94.77194779505544, 16.722808861561923],
          [94.77189951529317, 16.722546846526264],
          [94.77160447230153, 16.72248005832233],
          [94.77143817534261, 16.72224373064372],
          [94.77229111780935, 16.72200740267223],
          [94.77312260260396, 16.722048503210058],
          [94.77327817072683, 16.722099878869873],
          [94.7730331158812, 16.722538855178865],
          [94.772815856951, 16.72287279586161],
          [94.77266565324616, 16.72286252077239],
          [94.77264687778306, 16.723093710145733],
          [94.77205679179978, 16.723055178602976]]]);
var geometry1 = ee.Geometry.Polygon([
[94.76777033425228,16.724231698786568],
[94.76759867287532,16.723245294727075],
[94.76762013054744,16.722423287446386],
[94.76777033425228,16.72162182693643],
[94.768184074376,16.720800022251453],
[94.76882780453957,16.719957453940328],
[94.76975048444069,16.71921763479341],
[94.77123106381691,16.718560015365004],
[94.77288330457009,16.718518914075446],
[94.77408493420876,16.71886827475436],
[94.77511490247048,16.719299837062557],
[94.77612341306008,16.720306811984457],
[94.77676714322365,16.721437083625318],
[94.77700317761696,16.723409905348767],
[94.77683151624001,16.724416858569576],
[94.77655256650246,16.725197757406406],
[94.77610195538796,16.725752604636458],
[94.77567280194557,16.72626635063204],
[94.7751363601426,16.72671844596304],
[94.77442825696266,16.727067791620907],
[94.77348411938942,16.72743768632563],
[94.77258289716042,16.72754043472737],
[94.77146709821022,16.72749933537332],
[94.77060879132546,16.72723218935605],
[94.77002943417824,16.72692394348638],
[94.76929987332619,16.726471848642667],
[94.7686346854905,16.725773154502853],
[94.76831282040871,16.725444356374656],
[94.76811970135964,16.72503335791705],
[94.76790512463845,16.72460180858312],
[94.76777033425228,16.724231698786568]]
  )
Map.setOptions('Satellite');
Map.style().set('cursor', 'crosshair');
Map.centerObject(Plant_site,15);
var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(roi)
  .filterDate('2014-10-01','2019-04-01')
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
var Vis = {
min: 0.0,
max: 1.0,
palette: [
'#FFFFFF','#2000ff'
],
};
//Add first image to map to get an idea of what a SAR image looks like  
Map.addLayer(S1.first(),{bands: 'VV',min: -18, max: 0}, 'SAR image', 0)
// Filter speckle noise
var filterSpeckles = function(img) {
  var vv = img.select('VV') //select the VV polarization band
  var vv_smoothed = vv.focal_median(100,'circle','meters').rename('VV_Filtered') //Apply a focal median filter
  return img.addBands(vv_smoothed) // Add filtered VV band to original image
}
// Map speckle noise filter across collection. Result is same collection, with smoothed VV band added to each image
S1 = S1.map(filterSpeckles)
//Add speckle filtered image to map to sompare with raw SAR image
Map.addLayer(S1.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image',0)
var classifyWater = function(img) {
  var vv = img.select('VV_Filtered')
  var water = vv.lt(-12.5).rename('Water')  //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
  water = water.updateMask(water) //Remove all pixels equal to 0
  return img.addBands(water)  //Return image with added classified water band
}
//Map classification across sentinel-1 collection and print to console to inspect
S1 = S1.map(classifyWater)
var floodedarea = function(img){
  var floodA = img.select('Water')
  // iterate image here
  var flood_pixelarea = (floodA.multiply(ee.Image.pixelArea())).divide(100000).rename('pixelarea')
  return img.addBands(flood_pixelarea);
}
S1 = S1.map(floodedarea)
print(S1)
//var reducer = floodarea.reduceRegion({
//reducer: ee.Reducer.sum(),
//geometry: roi,
//scale: 30,
//maxPixels: 1E13
//});
// km square
//var area = ee.Number(reducer.get('Water')).multiply(scale).multiply(scale).divide(1000000);
//Map.addLayer(floodarea,Vis , 'floodarea')
//Make time series of water pixels within region
var ClassChart = ui.Chart.image.series({
  imageCollection: S1.select('pixelarea'),
  region: geometry1,
  reducer: ee.Reducer.sum(),
  scale: 100,
})
  .setOptions({
      title: 'Inundated Pixels Area',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Area of Inundated Pixels in Square Meter'},
      lineWidth: 2
    })
//Set the postion of the chart and add it to the map    
ClassChart.style().set({
    position: 'bottom-right',
    width: '500px',
    height: '300px'
  });
Map.add(ClassChart)
var label = ui.Label('Click a point on the chart to visualize the flood extent for that date.');
Map.add(label);
//Create callbakc function that adds image to the map coresponding with clicked data point on chart
ClassChart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    //Find image coresponding with clicked data and clip water classification to roi 
    var classification = ee.Image(S1.filter(equalDate).first()).select('pixelarea'); 
    var SARimage = ee.Image(S1.filter(equalDate).first());
    //Make map layer based on SAR image, reset the map layers, and add this new layer
    var S1Layer = ui.Map.Layer(SARimage, {
      bands: ['VV'],
      max: 0,
      min: -20
    });
    Map.layers().reset([]);
    var visParams = {
      min: 0,
      max: 1,
      palette: ['#0000ff','#FFFFFF']
    }
    //Add water classification on top of SAR image
    var class1 = classification.clip(geometry1)
    Map.addLayer(class1,visParams,'Water')
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
Map.addLayer(S1.first().clip(roi),{bands: 'Water',min: -18, max: 0, palette : ['#FFFFFF','#0000ff']}, 'Water Bodies')
//Add legends
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
//  Palette with the colors
var palette =['FF0000', '22ff00', '1500ff','bf04c2'];
// name of the legend
var names = ['Site Location','Area of Interest','Water Bodies','Site Area'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);