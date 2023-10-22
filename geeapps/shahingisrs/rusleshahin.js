var table = ui.import && ui.import("table", "table", {
      "id": "users/shahingisrs/Iran"
    }) || ee.FeatureCollection("users/shahingisrs/Iran"),
    LS = ui.import && ui.import("LS", "image", {
      "id": "users/shahingisrs/LS_Factor"
    }) || ee.Image("users/shahingisrs/LS_Factor"),
    P = ui.import && ui.import("P", "image", {
      "id": "users/shahingisrs/P_Factor"
    }) || ee.Image("users/shahingisrs/P_Factor"),
    R = ui.import && ui.import("R", "image", {
      "id": "users/shahingisrs/R_Factor"
    }) || ee.Image("users/shahingisrs/R_Factor"),
    K = ui.import && ui.import("K", "image", {
      "id": "users/shahingisrs/K_Factor"
    }) || ee.Image("users/shahingisrs/K_Factor"),
    Subbasin = ui.import && ui.import("Subbasin", "table", {
      "id": "users/shahingisrs/Subbasin_Iran1"
    }) || ee.FeatureCollection("users/shahingisrs/Subbasin_Iran1"),
    hillshade = ui.import && ui.import("hillshade", "image", {
      "id": "users/shahingisrs/Hillshade_Iran"
    }) || ee.Image("users/shahingisrs/Hillshade_Iran"),
    soilbulk = ui.import && ui.import("soilbulk", "image", {
      "id": "OpenLandMap/SOL/SOL_BULKDENS-FINEEARTH_USDA-4A1H_M/v02"
    }) || ee.Image("OpenLandMap/SOL/SOL_BULKDENS-FINEEARTH_USDA-4A1H_M/v02");
var Hillshade=hillshade;
var Iran=table;
var NDVI = ee.ImageCollection('MODIS/061/MOD13Q1')
.filterBounds(Iran)
.filterDate('2020-01-01','2020-12-30')
.select('NDVI')
.mean()
.clip(Iran);
var NDVI=NDVI.multiply(0.0001);
// Compute the C  Factor using an expression.
var C = NDVI.expression(
    '(1 - (NDVI)) / 2', {
      'NDVI': NDVI,
});
// Compute the EVI using an expression.
var RUSLE_Model = C.expression(
    'R*K*LS*C*P', {
      'R': R,
      'K': K,
      'LS': LS,
      'C': C,
      'P': P,
});
Map.centerObject(Iran,5)
//Remap slope class/reclassification function//
var Erosion_class = ee.Image(1) //In my case i will reclass Erosion into 7 classes (0-2, 2-5,5-10,10-20,20-40,40-80,>45)
          .where(RUSLE_Model.gt(2).and(RUSLE_Model.lte(5)), 2) //gt: greater than and lte: less than or equals to//
          .where(RUSLE_Model.gt(5).and(RUSLE_Model.lte(10)), 3)
          .where(RUSLE_Model.gt(10).and(RUSLE_Model.lte(20)), 4)
          .where(RUSLE_Model.gt(20).and(RUSLE_Model.lte(40)), 5)
          .where(RUSLE_Model.gt(40).and(RUSLE_Model.lte(80)), 6)
          .where(RUSLE_Model.gt(80).and(RUSLE_Model.lte(3000)), 7);
//Define Colors/palettes//
//HTML color codes: https://htmlcolorcodes.com/
var Erosion_palette = ['ECE9E9','4CE500','B2FF18','FFFF00','FFAE00','ff6d66','FF0000'];
//Display Reclassified slope image
Map.addLayer(Erosion_class.clip(Iran), {min:1, max:7, palette:Erosion_palette}, 'Reclassified Soil Erosion');
//Map.addLayer(Subbasin,{}, "Sub-Basin-Iran");
var soilbulk =ee.Image("OpenLandMap/SOL/SOL_BULKDENS-FINEEARTH_USDA-4A1H_M/v02")
.select("b0")
.multiply(10)
.clip(Iran);
var Soil_Depth = RUSLE_Model.expression(
    '((M*0.1)/SBD)*1000', {
      'M': RUSLE_Model,
      'SBD': soilbulk,
});
//Remap slope class/reclassification function//
var Soil_depth_Re = ee.Image(1) //In my case i will reclass Soil Depth into 7 classes (0-2, 2-5,5-10,10-20,20-40,40-80,>45)
          .where(Soil_Depth.gt(1).and(Soil_Depth.lte(5)), 2) //gt: greater than and lte: less than or equals to//
          .where(Soil_Depth.gt(5).and(Soil_Depth.lte(10)), 3)
          .where(Soil_Depth.gt(10).and(Soil_Depth.lte(20)), 4)
          .where(Soil_Depth.gt(20).and(Soil_Depth.lte(40)), 5)
          .where(Soil_Depth.gt(40).and(Soil_Depth.lte(80)), 6)
          .where(Soil_Depth.gt(80).and(Soil_Depth.lte(200)), 7);
//Define Colors/palettes//
//HTML color codes: https://htmlcolorcodes.com/
var Soil_depth_palette = ['#d9ead3','#ffe599','#ffd966','#f1c232','e69138','#b45f06','#783f04'];
//Display Reclassified Soil_depth_Re
Map.addLayer(Soil_depth_Re.clip(Iran), {min:1, max:7, palette:Soil_depth_palette}, 'Reclassified Erosion Depth');
Map.addLayer(Hillshade,{}, "Hillshade", true, 0.4);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var Subbasin_Boundary = empty.paint({
  featureCollection: Subbasin,
  color: 20,
  width: 1
});
Map.addLayer(Subbasin_Boundary, {palette: '000000'}, 'Subbasin_Boundary');
var panel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '5px;'
  }
})
var title = ui.Label({
  value: 'Soil Erosion',
  style: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '2px;'
  }
})
var heading = ui.Label({
  value: '(ton/ha.year)',
  style: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '2px;'
  }
})
panel.add(title)
panel.add(heading)
var color = ['ECE9E9','4CE500','B2FF18','FFFF00','FFAE00','ff6d66','FF0000']
var lc_class = ['0-2', '2-5','5-10','10-20','20-40','40-80','> 80']
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      fontWeight: 'bold',
      margin: '2px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px'
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for(var a = 0; a < 7; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
Map.add(panel,'Legend')
///   Legend for soil depth//////
var panel1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '20px;'
  }
})
var title = ui.Label({
  value: 'Soil Depth',
  style: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '2px;'
  }
})
var heading = ui.Label({
  value: '(mm)',
  style: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '2px;'
  }
})
panel1.add(title)
panel1.add(heading)
var color = ['#d9ead3','#ffe599','#ffd966','#f1c232','e69138','#b45f06','#783f04'];
var lc_class = ['0-2', '2-5','5-10','10-20','20-40','40-80','> 80']
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      fontWeight: 'bold',
      margin: '2px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px'
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for(var a = 0; a < 7; a++){
  panel1.add(list_legend(color[a], lc_class[a]))
}
Map.add(panel1,'Legend')
// Generate the histogram data.  Use minBucketWidth for nice sized buckets.
var histogram = ui.Chart.image.histogram({
  image: Erosion_class,
  region: Iran,
  maxPixels : 1e13,
  scale: 1000,
  minBucketWidth: 1
});
histogram.setOptions({
  title: 'Histogram of Soil Erosion in Iran (ton/ha.year)'
});
print(histogram);
// Generate the histogram data.  Use minBucketWidth for nice sized buckets.
var histogram1 = ui.Chart.image.histogram({
  image: Soil_depth_Re,
  region: Iran,
  maxPixels : 1e13,
  scale: 1000,
  minBucketWidth: 1
});
histogram.setOptions({
  title: 'Histogram of Soil Erosion Depth in Iran (mm)'
});
print(histogram1)
// Desmontrate asynchronous updating of UI elements through evaluate().
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Click to get RUSLE_Model'));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var temporalMean = RUSLE_Model.reduce(ee.Reducer.mean());
  var sampledPoint = RUSLE_Model.reduceRegion(ee.Reducer.mean(), point, 1000);
  var computedValue = sampledPoint.get('b1');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: 'RUSLE_Model: ' + result,
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
// Use an elevation dataset and terrain functions to create
// a custom visualization of topography.
// Load a global elevation image.
var elev = ee.Image('USGS/GMTED2010').clip(table);
// Use the terrain algorithms to compute a hillshade with 8-bit values.
var shade = ee.Terrain.hillshade(elev);
// Create a "sea" variable to be used for cartographic purposes
var sea = elev.lte(0);
Map.addLayer(sea.mask(sea), {palette:'000022'}, 'sea', false);
// Create a custom elevation palette from hex strings.
var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
// Use these visualization parameters, customized by location.
var visParams = {min: 1, max: 3000, palette: elevationPalette};
// Create a mosaic of the sea and the elevation data
var visualized = ee.ImageCollection([
  // Mask the elevation to get only land
  elev.mask(sea.not()).visualize(visParams),
  // Use the sea mask directly to display sea.
  sea.mask(sea).visualize({palette:'000022'})
]).mosaic();
// Note that the visualization image doesn't require visualization parameters.
// Convert the visualized elevation to HSV, first converting to [0, 1] data.
var hsv = visualized.divide(255).rgbToHsv();
// Select only the hue and saturation bands.
var hs = hsv.select(0, 1);
// Convert the hillshade to [0, 1] data, as expected by the HSV algorithm.
var v = shade.divide(255);
// Create a visualization image by converting back to RGB from HSV.
// Note the cast to byte in order to export the image correctly.
var rgb = hs.addBands(v).hsvToRgb().multiply(255).byte();
Map.addLayer(rgb, {}, 'styled');
// River Stream /////////////////////////
var dataset = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers');
// Paint "RIV_ORD" (river order) value to an image for visualization.
var datasetVis = ee.Image().byte().paint(dataset, 'RIV_ORD', 1)
.clip(Iran);
var visParams = {
  min: 1,
  max: 10,
  palette: ['08519c', '3182bd', '6baed6', 'bdd7e7', 'eff3ff']
};
Map.addLayer(datasetVis, visParams, 'Free flowing rivers');
Map.addLayer(dataset, null, 'FeatureCollection', false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var Subbasin_Boundary = empty.paint({
  featureCollection: Subbasin,
  color: 20,
  width: 1
});
Map.addLayer(Subbasin_Boundary, {palette: '000000'}, 'Subbasin_Boundary');