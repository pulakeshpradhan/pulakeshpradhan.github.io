var angiang = ui.import && ui.import("angiang", "table", {
      "id": "projects/ee-lulcvietnam/assets/angiang"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/angiang"),
    baclieu = ui.import && ui.import("baclieu", "table", {
      "id": "projects/ee-lulcvietnam/assets/baclieu"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/baclieu"),
    bentre = ui.import && ui.import("bentre", "table", {
      "id": "projects/ee-lulcvietnam/assets/bentre"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/bentre"),
    camau = ui.import && ui.import("camau", "table", {
      "id": "projects/ee-lulcvietnam/assets/camau"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/camau"),
    cantho = ui.import && ui.import("cantho", "table", {
      "id": "projects/ee-lulcvietnam/assets/cantho"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/cantho"),
    dongthap = ui.import && ui.import("dongthap", "table", {
      "id": "projects/ee-lulcvietnam/assets/dongthap"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/dongthap"),
    haugiang = ui.import && ui.import("haugiang", "table", {
      "id": "projects/ee-lulcvietnam/assets/haugiang"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/haugiang"),
    kiengiang = ui.import && ui.import("kiengiang", "table", {
      "id": "projects/ee-lulcvietnam/assets/kiengiang"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/kiengiang"),
    longan = ui.import && ui.import("longan", "table", {
      "id": "projects/ee-lulcvietnam/assets/longan"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/longan"),
    soctrang = ui.import && ui.import("soctrang", "table", {
      "id": "projects/ee-lulcvietnam/assets/soctrang"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/soctrang"),
    tiengiang = ui.import && ui.import("tiengiang", "table", {
      "id": "projects/ee-lulcvietnam/assets/tiengiang"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/tiengiang"),
    travinh = ui.import && ui.import("travinh", "table", {
      "id": "projects/ee-lulcvietnam/assets/travinh"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/travinh"),
    vinhlong = ui.import && ui.import("vinhlong", "table", {
      "id": "projects/ee-lulcvietnam/assets/vinhlong"
    }) || ee.FeatureCollection("projects/ee-lulcvietnam/assets/vinhlong"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                103.71840986683809,
                11.169034615899646
              ],
              [
                103.71840986683809,
                8.479227820426107
              ],
              [
                107.12966474965059,
                8.479227820426107
              ],
              [
                107.12966474965059,
                11.169034615899646
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[103.71840986683809, 11.169034615899646],
          [103.71840986683809, 8.479227820426107],
          [107.12966474965059, 8.479227820426107],
          [107.12966474965059, 11.169034615899646]]], null, false);
var startDate = '2019-01-01'; // Enter the dates in YYYY-mm-dd format, keep the quotatio marks
var endDate = '2019-12-31';
Map.centerObject(geometry,8);
// STEP 6: Add Legend, title and citation panels
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Chú Giải LULC Type',
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
          backgroundColor: color,
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
var palette =['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1'];
// name of the legend
var names = ['water - Nước ', 'trees- Cây', 'grass- Cỏ', 'vegetation- Thảm thực vật', 'crops- Cây Trồng',
    'shrub- Cây Bụi', 'built- Công trình xây dựng', 'bare', 'snow_and_ice - Tuyết và băng'];
// Add color and and names
for (var i = 0; i <9; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Add the legend to map
Map.add(legend);
// set position of panel
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
// Create legend title
var mapTitle1 = ui.Label({
  value: 'Bản Đồ Land cover LULC 13 tỉnh miền Tây ',
  style: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0',
    textAlign: 'center'
    }
});
var mapTitle2 = ui.Label({
  value: 'Between ' + startDate + ' and ' + endDate,
  style: {
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0',
    textAlign: 'center'
    }
});
// Add the title to the panel
title.add(mapTitle1);
title.add(mapTitle2);
Map.add(title);
// Add Citation
var citation = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '4px 8px',
  }
});
var label = ui.Label('By: Huỳnh Thanh');
citation.add(label);
Map.add(citation);
// STEP 7: Export the Images
// Export the LULC Map for further processing, analysis or visualization 
// in GIS Applications such as ArcGIS Pro or QGIS
// The exported images will be saved in your Google Drive
// Depending on the area of the LGA, you may get multiple tiles
// From the 'Tasks' tab and press the 'RUN' button to start the download process
// Export Raw Composite
// Export.image.toDrive({
//   image: dwComposite.clip(table),
//   description: 'Raw_Composite_Export',
//   fileNamePrefix: 'LGA_Composite_raw',
//   region: table,
//   scale: 10,
//   maxPixels: 1e10});
// Top1 Probability Hillshade Composite
// var hillshadeComposite = probabilityHillshade.visualize(hillshadeVisParams);
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(angiang), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(angiang));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(angiang), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(angiang),
  hillshadeVisParams, 'LULC An Giang');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(angiang.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(angiang),
  description: 'An Giang',
  fileNamePrefix: 'LGA_Composite_raw',
  region: angiang,
  scale: 10,
  maxPixels: 1e10});
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(baclieu), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(baclieu));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(baclieu), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(baclieu),
  hillshadeVisParams, 'LULC Bạc Liêu');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(baclieu.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(baclieu),
  description: 'Bạc Liêu',
  fileNamePrefix: 'LGA_Composite_raw',
  region: baclieu,
  scale: 10,
  maxPixels: 1e10});
  function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(bentre), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(bentre));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(bentre), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(bentre),
  hillshadeVisParams, 'LULC Bến Tre');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(bentre.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(bentre),
  description: 'Bến Tre',
  fileNamePrefix: 'LGA_Composite_raw',
  region: bentre,
  scale: 10,
  maxPixels: 1e10});
    function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(camau), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(camau));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(camau), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(camau),
  hillshadeVisParams, 'LULC Cà Mau');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(camau.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(camau),
  description: 'Cà Mau',
  fileNamePrefix: 'LGA_Composite_raw',
  region: camau,
  scale: 10,
  maxPixels: 1e10});
      function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(cantho), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(cantho));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(cantho), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(cantho),
  hillshadeVisParams, 'LULC Cần Thơ');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(cantho.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(cantho),
  description: 'Cần Thơ',
  fileNamePrefix: 'LGA_Composite_raw',
  region: cantho,
  scale: 10,
  maxPixels: 1e10});
      function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(longan), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(longan));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(longan), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(longan),
  hillshadeVisParams, 'LULC Long An');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(longan.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(longan),
  description: 'Long An',
  fileNamePrefix: 'LGA_Composite_raw',
  region: longan,
  scale: 10,
  maxPixels: 1e10});  
      function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(tiengiang), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(tiengiang));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(tiengiang), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(tiengiang),
  hillshadeVisParams, 'LULC Tiền Giang');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(tiengiang.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(tiengiang),
  description: 'Tiền Giang',
  fileNamePrefix: 'LGA_Composite_raw',
  region: tiengiang,
  scale: 10,
  maxPixels: 1e10});  
        function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(dongthap), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(dongthap));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(dongthap), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(dongthap),
  hillshadeVisParams, 'LULC Đồng Tháp');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(dongthap.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(dongthap),
  description: 'Đồng Tháp',
  fileNamePrefix: 'LGA_Composite_raw',
  region: dongthap,
  scale: 10,
  maxPixels: 1e10}); 
          function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(vinhlong), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(vinhlong));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(vinhlong), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(vinhlong),
  hillshadeVisParams, 'LULC Vĩnh Long');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(vinhlong.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(vinhlong),
  description: 'Vĩnh Long',
  fileNamePrefix: 'LGA_Composite_raw',
  region: vinhlong,
  scale: 10,
  maxPixels: 1e10}); 
          function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(travinh), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(travinh));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(travinh), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(travinh),
  hillshadeVisParams, 'LULC Trà Vinh');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(travinh.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(travinh),
  description: 'Trà Vinh',
  fileNamePrefix: 'LGA_Composite_raw',
  region: travinh,
  scale: 10,
  maxPixels: 1e10}); 
            function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(soctrang), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(soctrang));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(soctrang), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(soctrang),
  hillshadeVisParams, 'LULC Sóc Trăng');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(soctrang.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(soctrang),
  description: 'Sóc Trăng',
  fileNamePrefix: 'LGA_Composite_raw',
  region: soctrang,
  scale: 10,
  maxPixels: 1e10}); 
              function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(haugiang), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(haugiang));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(haugiang), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(haugiang),
  hillshadeVisParams, 'LULC Hậu Giang');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(haugiang.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(haugiang),
  description: 'Hậu Giang',
  fileNamePrefix: 'LGA_Composite_raw',
  region: haugiang,
  scale: 10,
  maxPixels: 1e10}); 
             function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2019-01-01', '2019-12-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
  gamma: 1.4
};
Map.addLayer(dataset.median().clip(kiengiang), visualization, 'Sentinel-2 Composite Image - Median', 0);
// Dynamic World LULC Dataset
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date('2019-01-01', '2019-12-30'))
  .filter(ee.Filter.bounds(kiengiang));
// Create a Mode Composite
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
var dwVisParams = {
  min: 0,
  max: 8,
  opacity: 1,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
    '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};
Map.addLayer(dwComposite.clip(kiengiang), dwVisParams, 'Classified LULC Composite', 0); 
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
// Select probability bands 
var probabilityCol = dw.select(probabilityBands);
// Create a multi-band image with the average pixel-wise probability 
// for each band across the time-period
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());
// Composites have a default projection that is not suitable
// for hillshade computation.
// Set a EPSG:3857 projection with 10m scale
var projection = ee.Projection('EPSG:3857').atScale(10);
var meanProbability = meanProbability.setDefaultProjection(projection);
// Create the Top1 Probability Hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);
var hillshadeVisParams = {min:0, max:0.8};
Map.addLayer(probabilityHillshade.clip(kiengiang),
  hillshadeVisParams, 'LULC Kiên Giang');
// STEP 5: Add LGA Boundary Layer
var styling = {color: 'black', fillColor: '00000000', width: 4};
Map.addLayer(kiengiang.style(styling), {}, "LGA Boundary", 0);
Export.image.toDrive({
  image: dwComposite.clip(kiengiang),
  description: 'Kiên Giang',
  fileNamePrefix: 'LGA_Composite_raw',
  region: kiengiang,
  scale: 10,
  maxPixels: 1e10});