var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                97.95306162383801,
                16.12078233938427
              ],
              [
                97.97022776153332,
                16.10082705670563
              ],
              [
                98.00782160308606,
                16.061240396428392
              ],
              [
                98.06069330718762,
                16.063219916641852
              ],
              [
                98.08953241851574,
                16.08977657416818
              ],
              [
                98.07494120147473,
                16.117319169847587
              ],
              [
                98.03751902129895,
                16.125069989272664
              ],
              [
                98.0212111904884,
                16.141395191525035
              ],
              [
                97.99649195220715,
                16.14436326552731
              ],
              [
                97.97280268218762,
                16.144528157222506
              ],
              [
                97.95906977203137,
                16.140240928506042
              ],
              [
                97.95048670318371,
                16.13265560413059
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[97.95306162383801, 16.12078233938427],
          [97.97022776153332, 16.10082705670563],
          [98.00782160308606, 16.061240396428392],
          [98.06069330718762, 16.063219916641852],
          [98.08953241851574, 16.08977657416818],
          [98.07494120147473, 16.117319169847587],
          [98.03751902129895, 16.125069989272664],
          [98.0212111904884, 16.141395191525035],
          [97.99649195220715, 16.14436326552731],
          [97.97280268218762, 16.144528157222506],
          [97.95906977203137, 16.140240928506042],
          [97.95048670318371, 16.13265560413059]]]),
    imageVisParamVVMedian = ui.import && ui.import("imageVisParamVVMedian", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV_median"
        ],
        "min": -11.821002869290778,
        "max": -1.8503610152355816,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV_median"],"min":-11.821002869290778,"max":-1.8503610152355816,"gamma":1},
    imageVisParamVV = ui.import && ui.import("imageVisParamVV", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VV"
        ],
        "min": -11.821002869290778,
        "max": -1.8503610152355816,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VV"],"min":-11.821002869290778,"max":-1.8503610152355816,"gamma":1},
    kisg = ui.import && ui.import("kisg", "table", {
      "id": "users/tobyzawthuhtet/kyarinseikgyi_region"
    }) || ee.FeatureCollection("users/tobyzawthuhtet/kyarinseikgyi_region");
Map.setOptions('Satellite');
Map.style().set('cursor', 'crosshair');
Map.centerObject(kisg,10);
Map.addLayer(kisg,{color:'grey'},'Kyar In Sate Gyi');
var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(roi)
  .filterDate('2020-07-01','2020-08-20')
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'));
var Vis = {
min: 0.0,
max: 1.0,
palette: [
'#FFFFFF','#2000ff'
],
};
//Add first image to map to get an idea of what a SAR image looks like  
Map.addLayer(S1.first(),{bands: 'VV',min: -18, max: 0}, 'SAR image', 0);
// Filter speckle noise
var filterSpeckles = function(img) {
  var vv = img.select('VV'); //select the VV polarization band
  var vv_smoothed = vv.focal_median(10,'circle','meters').rename('VV_Filtered'); //Apply a focal median filter
  return img.addBands(vv_smoothed); // Add filtered VV band to original image
};
// Map speckle noise filter across collection. Result is same collection, with smoothed VV band added to each image
S1 = S1.map(filterSpeckles);
//Add speckle filtered image to map to sompare with raw SAR image
Map.addLayer(S1.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image',0);
var classifyWater = function(img) {
  var vv = img.select('VV_Filtered');
  var water = vv.lt(-12.5).rename('Water');  //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
  water = water.updateMask(water); //Remove all pixels equal to 0
  return img.addBands(water);  //Return image with added classified water band
};
//Map classification across sentinel-1 collection and print to console to inspect
S1 = S1.map(classifyWater);
var floodedarea = function(img){
  var floodA = img.select('Water');
  // iterate image here
  var flood_pixelarea = (floodA.multiply(ee.Image.pixelArea())).round().rename('pixelarea');
  return img.addBands(flood_pixelarea);
};
S1 = S1.map(floodedarea);
print(S1);
//Make time series of water pixels within region
var ClassChart = ui.Chart.image.series({
  imageCollection: S1.select('pixelarea'),
  region: kisg,
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
    var S1Layer = ui.Map.Layer(SARimage.clip(kisg), {
      bands: ['VV_Filtered'],
      max: 0,
      min: -20
    });
    Map.layers().reset([S1Layer]);
    var visParams = {
      min: 0,
      max: 1,
      palette: ['#FFFFFF','#0000ff']
    }
    //Add water classification on top of SAR image
    var class1 = classification.clip(kisg)
    Map.addLayer(class1,visParams,'Water')
    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
Map.addLayer(S1.first().clip(kisg),{bands: 'Water',min: -18, max: 0, palette : ['#FFFFFF','#0000ff']}, 'Water Bodies')
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
var palette =['cccccc',  '1500ff'];
// name of the legend
var names = ['Site Location','Water Bodies'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var wb = S1.select('Water')
var batch = require('users/fitoprincipe/geetools:batch') //importing tools for batch download
//batch.Download.ImageCollection.toDrive(wb, 'GEE 2020', 
//                {scale: 10, 
//                region: roi, 
//                type: 'int',
//               fileFormat:'GeoTiff'
//              
//})