var visu = ui.import && ui.import("visu", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -73.12308680403896,
                -36.984578094058435
              ],
              [
                -73.12308680403896,
                -36.99184524860084
              ],
              [
                -73.11210047591396,
                -36.99184524860084
              ],
              [
                -73.11210047591396,
                -36.984578094058435
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-73.12308680403896, -36.984578094058435],
          [-73.12308680403896, -36.99184524860084],
          [-73.11210047591396, -36.99184524860084],
          [-73.11210047591396, -36.984578094058435]]], null, false),
    smoothclorofila2019 = ui.import && ui.import("smoothclorofila2019", "image", {
      "id": "users/lucasterres/smoothclorofila2019"
    }) || ee.Image("users/lucasterres/smoothclorofila2019"),
    smoothclorofila2021 = ui.import && ui.import("smoothclorofila2021", "image", {
      "id": "users/lucasterres/smoothclorofila2021"
    }) || ee.Image("users/lucasterres/smoothclorofila2021");
function ndci(image) {
  return image.addBands(
    image.expression("(r-g)/(r+g)", {
      g: image.select("B4"),
      r: image.select("B5")
    })
  );
}
function phyco(image) {
  return image.addBands(
    image.expression("(((1/r)-(0.4/g)-(0.6/vr))/re)", {
      r: image.select("B4"),
      vr: image.select("B5"),
      g: image.select("B3"),
      re: image.select("B6")
    })
  );
}
// clorophill
function clorofila(image) {
  var image_2 = image; //.divide(10000);
  return image.addBands(
    image_2
      .expression("194.325/6 * (ndci*ndci) + 86.115/6 * ndci + 14.039/6", {
        ndci: image_2.select("B5_1")
      })
      .rename("clorofila")
  );
}
// phycocyanin
function phycocyanin(image) {
  var image_3 = image; //.divide(10000);
  return image.addBands(
    image_3
      .expression("462.5/20 * phyco + 22.598/20", {
        phyco: image_3.select("B5_1")
      })
      .rename("phycoc")
  );
}
// phycocyanin
var addNDWI = function(image) {
  var ndwi = image.normalizedDifference(['B3', 'B5'])
  .rename('ndwi')
  .copyProperties(image,['system:time_start']);
  return image.addBands(ndwi);
};
//PC = 462.5 *fbC + 22.598
//(((1/B4)-(0.4/B3)-(0.6/B5))/B6)
// remove clounds
function maskS2clouds(image) {
  var qa = image.select("QA60");
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa
    .bitwiseAnd(cloudBitMask)
    .eq(0)
    .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
var subset = Map.getBounds(true)
var Start_period = ee.Date('2017-03-28')
var End_period = ee.Date(new Date().getTime())
// data_set
var s2 = ee
  .ImageCollection("COPERNICUS/S2_SR")
  .filterDate("2017-03-28", "2021-11-01")
  .filterBounds(subset)
  .filterDate(Start_period, End_period)
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1))
  .map(maskS2clouds)
  .map(ndci)
  .map(clorofila)
  .map(addNDWI)
  .map(phycocyanin);
var summerndwi21x = ee.ImageCollection(s2).filterBounds(visu).filterDate('2021-06-16', '2021-09-18').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["ndwi"]);
var ndwisummer21x = ee.Image(summerndwi21x.mean());
var mdwiselect = ee.ImageCollection(s2).select(['ndwi']);
var s2filtro = mdwiselect.reduce(ee.Reducer.mean());
var s2clip = ndwisummer21x.clip(visu);
var mndwi = s2clip;
//Map.addLayer(
//  mndwi.clip(visu),
//  { min: -1, max: 1, palette: ["brown", "black", "blue"] },
// "Modified Normalized Difference Water Index MNDWI",
//  false
//);
// Change this threshold to allow more or less water in mask
var ndwiThreshold = 0.1;
var water = mndwi.gt(ndwiThreshold);
//Map.addLayer(
//  water.clip(visu),
//  { min: 0, max: 1, palette: ["black", "blue"] },
//  "water",
//  true
var mdwiselect = ee.ImageCollection(s2).select(['ndwi']);
var s2filtro = mdwiselect.reduce(ee.Reducer.mean());
var s2clip = ndwisummer21x.clip(visu);
var mndwi = s2clip;
// Change this threshold to allow more or less water in mask
var ndwiThreshold = 0.1;
var water = mndwi.gt(ndwiThreshold);
//Map.addLayer(
//  water.clip(visu),
//  { min: 0, max: 1, palette: ["black", "blue"] },
//  "water",
//  true
//);
var clorofila2019sel = ee.ImageCollection(s2).filterBounds(visu).filterDate('2017-03-28', '2019-10-15').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var reducer_cloro = clorofila2019sel.reduce(ee.Reducer.mean());
var clorofila2019 = reducer_cloro.updateMask(water);
var clorofila2021sel = ee.ImageCollection(s2).filterBounds(visu).filterDate('2019-10-15', '2021-11-15').filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 1)).select(["clorofila"]);
var reducer_cloro21 = clorofila2021sel.reduce(ee.Reducer.mean());
var clorofila2021 = reducer_cloro21.updateMask(water);
var visualization2 = {
  min: 1,
  max: 9,
  palette: ["#0000ff", "#00ffff", "#ffff00", "#ff0000"],
};
var boxcar = ee.Kernel.circle({
  radius: 10, units: 'pixels', normalize: true
});
// Smooth the image by convolving with the boxcar kernel.
var smoothclorofila2019x = clorofila2019.convolve(boxcar);
var smoothclorofila2021x = clorofila2021.convolve(boxcar);
//var smoothclorofila2019 = smoothclorofila2019x.reproject(smoothclorofila2019x.projection(), null, 10)
//var smoothclorofila2021 = smoothclorofila2021x.reproject(smoothclorofila2021x.projection(), null, 10)
function createColorBar(titleText, palette, min, max) {
  // Legend Title
  var title = ui.Label({
    value: titleText,
    style: { fontWeight: "bold", textAlign: "center", stretch: "horizontal" }
  });
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: "200x20",
      format: "png",
      min: 0,
      max: 1,
      palette: ["#0000ff", "#00ffff", "#ffff00", "#ff0000"]
    },
    style: { stretch: "horizontal", margin: "8px 8px", maxHeight: "40px" }
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(min, {
        margin: "4px 10px",
        textAlign: "left",
        stretch: "horizontal"
      }),
      ui.Label((min + max) / 2, {
        margin: "4px 20px",
        textAlign: "center",
        stretch: "horizontal"
      }),
      ui.Label(max, {
        margin: "4px 10px",
        textAlign: "right",
        stretch: "horizontal"
      })
    ],
    layout: ui.Panel.Layout.flow("horizontal")
  });
  // Create a panel with all 3 widgets
  var legendPanel = ui.Panel({
    widgets: [title, legend, labels],
    style: {
      stretch: "horizontal",
      position: "bottom-left",
      padding: "4px",
      backgroundColor: "rgba(255,255,255,0.8)",
      width: "306px"
    }
  });
  return legendPanel;
}
// Call the function to create a colorbar legend
var colorBar = createColorBar(
  "Chlorophyll-a",
  ["#0000ff", "#00ffff", "#ffff00", "#ff0000"],
  1,
  9
);
var colorBar2 = createColorBar(
  "Chlorophyll-a",
  ["#0000ff", "#00ffff", "#ffff00", "#ff0000"],
  1,
  9
);
// make left and right maps
var leftMap = ui.Map();
var rightMap = ui.Map();
leftMap.setOptions('SATELLITE');
rightMap.setOptions('SATELLITE');
leftMap.addLayer(smoothclorofila2019,visualization2,"Chlorophyll-a quinenco 2019")
rightMap.addLayer(smoothclorofila2021,visualization2,"Chlorophyll-a quinenco 2021")
leftMap.setControlVisibility(false)
rightMap.setControlVisibility(false)
leftMap.centerObject(visu,16)
rightMap.centerObject(visu,16)
leftMap.add(colorBar);
rightMap.add(colorBar2);
 //borderRadius: 25px;
// Create a panel to display elevation value on click
var inspectorleft = ui.Panel([ui.Label('Click to get Chlorophyll Value')]);
inspectorleft.style().set('position', 'bottom-center');
inspectorleft.style().set('backgroundColor', "rgba(255, 255, 255,0.9)");
inspectorleft.style().set('fontWeight', 'bold');
leftMap.add(inspectorleft);
 var inspectorright = ui.Panel([ui.Label('Click to get Chlorophyll Value')]);
inspectorright.style().set('position', 'bottom-center');
inspectorright.style().set('backgroundColor', "rgba(255, 255, 255,0.9)");
inspectorright.style().set('fontWeight', 'bold');
rightMap.add(inspectorright);
// Below we are going to define panels to display dynamic objects -
// Elevation values, precipitation chart, ETIa chart
rightMap.onClick(function(coords) {
   // Add a chart to put monthly precipitation chart
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
 Map.layers().set(1, dot);
  var sample = smoothclorofila2021.sample(point, 10);
  var computedValue = sample.first().get("clorofila_mean");
  // Request the value from the server.
  computedValue.evaluate(function(result) {
  // When the server returns the value, show it.
  inspectorright.widgets().set(0, ui.Label({
  value: 'Chlorophyll-a: ' + result,
    }));
  })});
leftMap.onClick(function(coords) {
   // Add a chart to put monthly precipitation chart
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
 Map.layers().set(1, dot);
  var sample = smoothclorofila2019.sample(point, 10);
  var computedValue = sample.first().get("clorofila_mean");
  // Request the value from the server.
  computedValue.evaluate(function(result) {
  // When the server returns the value, show it.
  inspectorleft.widgets().set(0, ui.Label({
  value: 'Chlorophyll-a: ' + result,
    }));
  })});
// Export the image to an Earth Engine asset.
Export.image.toAsset({
  image: smoothclorofila2019,
  description: 'smoothclorofila2019',
  assetId: 'smoothclorofila2019',
  scale: 10
});
// Export the image to an Earth Engine asset.
Export.image.toAsset({
  image: smoothclorofila2021,
  description: 'smoothclorofila2021',
  assetId: 'smoothclorofila2021',
 scale: 10
});
// Define a UI widget and add it to the map.
var widget = ui.Label({
  value: 'Mean Convolutional Reducer of Chlorophyll-a between 28/03/2017 to 15/10/2019',
  style: {fontWeight: 'bold', height: '50px',fontSize: '14px', color: '484848'}
});
leftMap.add(widget);
// View the UI widget's style properties; an ActiveDictionary.
// ActiveDictionaries are mutable; set a style property.
widget.style().set('backgroundColor', "rgba(255, 255, 255,0.8)");
// Define the UI widget's style ActiveDictionary as a variable.
var widgetStyle = widget.style();
// Set the UI widget's style properties from the ActiveDictionary variable.
//widgetStyle.set({border: '3px solid darkgray'});
// Define a UI widget and add it to the map.
var widget = ui.Label({
  value: 'Mean Convolutional Reducer of Chlorophyll-a between 15/10/2019 to 15/15/2021',
  style: {fontWeight: 'bold', height: '50px', fontSize: '14px', color: 'FFFFFF'}
});
rightMap.add(widget);
// View the UI widget's style properties; an ActiveDictionary.
// ActiveDictionaries are mutable; set a style property.
widget.style().set('backgroundColor',"rgba(0, 102, 204,0.5)");
// Define the UI widget's style ActiveDictionary as a variable.
var widgetStyle = widget.style();
// Set the UI widget's style properties from the ActiveDictionary variable.
//widgetStyle.set({border: '3px solid darkgray'});
//print(widgetStyle);
// Define a MultiPoint object.
var multiPoint = ee.Geometry.MultiPoint([[-73.119100,-36.987000], [-73.115700,-36.989100] ]);
// Apply the coordinates method to the MultiPoint object.
var multiPointCoordinates = multiPoint.coordinates();
// Print the result to the console.
print('multiPoint.coordinates(...) =', multiPointCoordinates);
// Display relevant geometries on the map.
leftMap.addLayer(multiPoint,
             {'color': 'grey','pointShape': 'square'},
             'MCP Buoy');
rightMap.addLayer(multiPoint,
             {'color': 'black','pointShape': 'square'},
             'MCP Buoy');
// link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// clear the root and add the splitPanel
ui.root.clear();
ui.root.add(splitPanel);