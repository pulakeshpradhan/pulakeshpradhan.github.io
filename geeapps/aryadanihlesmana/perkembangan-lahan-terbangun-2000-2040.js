var poi1 = ui.import && ui.import("poi1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            106.83528564142304,
            -6.2816139604813905
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([106.83528564142304, -6.2816139604813905]),
    poi2 = ui.import && ui.import("poi2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            106.7584053910472,
            -6.772719868318042
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([106.7584053910472, -6.772719868318042]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/aryadanihlesmana/Jabodetabek"
    }) || ee.FeatureCollection("users/aryadanihlesmana/Jabodetabek"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "red",
          "green",
          "blue"
        ],
        "min": 0.08740746332332493,
        "max": 0.6770811471156776,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["red","green","blue"],"min":0.08740746332332493,"max":0.6770811471156776,"gamma":1},
    image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-aryadanihlesmana/assets/Terbangun_2000"
    }) || ee.Image("projects/ee-aryadanihlesmana/assets/Terbangun_2000"),
    imagee = ui.import && ui.import("imagee", "image", {
      "id": "projects/ee-aryadanihlesmana/assets/Terbangun_2010"
    }) || ee.Image("projects/ee-aryadanihlesmana/assets/Terbangun_2010"),
    imageee = ui.import && ui.import("imageee", "image", {
      "id": "projects/ee-aryadanihlesmana/assets/Terbangun_2020"
    }) || ee.Image("projects/ee-aryadanihlesmana/assets/Terbangun_2020"),
    sim30 = ui.import && ui.import("sim30", "image", {
      "id": "projects/ee-aryadanihlesmana/assets/simulation2030"
    }) || ee.Image("projects/ee-aryadanihlesmana/assets/simulation2030"),
    sim40 = ui.import && ui.import("sim40", "image", {
      "id": "projects/ee-aryadanihlesmana/assets/simulation2040"
    }) || ee.Image("projects/ee-aryadanihlesmana/assets/simulation2040");
//--- Landsat 7 Tahun 2000
// cari citra yang bagus 
var image1 = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
 .filterBounds(poi1)
 .filterDate('2000-01-01', '2000-12-31')
 .sort('CLOUD_COVER')
 .first();
print(image1);
var image2 = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
 .filterBounds(poi2)
 .filterDate('2000-01-01', '2000-12-31')
 .sort('CLOUD_COVER')
 .first();
print(image2);
//mosaik 2 citra di atas bos
var bhnmosaik = ee.ImageCollection ([image1, image2]);
var mosaic = bhnmosaik.mosaic();
//sharpening image
var hsv = mosaic.select(['B3', 'B2', 'B1']).rgbToHsv();
var sharpened = ee.Image.cat([
  hsv.select('hue'), hsv.select('saturation'), mosaic.select('B8')
]).hsvToRgb();
Map.addLayer(sharpened, imageVisParam,'Landsat 7 2000');
//--- Landsat 7 Tahun 2010
  // cari citra yang bagus 
var image1 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
 .filterBounds(poi1)
 .filterDate('2010-01-01', '2010-12-31')
 .sort('CLOUD_COVER')
 .first();
print(image1);
var image2 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
 .filterBounds(poi2)
 .filterDate('2010-01-01', '2010-12-31')
 .sort('CLOUD_COVER')
 .first();
print(image2);
//mosaik 2 citra di atas bos
var bhnmosaik = ee.ImageCollection ([image1, image2]);
var mosaic = bhnmosaik.mosaic();
Map.centerObject(poi1, 8);
//gapfill 
//image 1
var img_fill1 = image1.focal_mean(1, 'square', 'pixels', 8)
var final_image1 = img_fill1.blend(image1)
var img_fill2 = image2.focal_mean(1, 'square', 'pixels', 8)
var final_image2 = img_fill2.blend(image2)
//mosaik 2 citra gapfill di atas bos
var bhnmosaikgapfill = ee.ImageCollection ([final_image1, final_image2]);
var mosaicgapfill = bhnmosaikgapfill.mosaic();
Map.addLayer(mosaicgapfill, {bands: ['B2', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,},'Landsat 7 2010');
//---Landsat 8 2010
  // cari citra yang bagus 
var image1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
 .filterBounds(poi1)
 .filterDate('2020-01-01', '2020-12-31')
 .sort('CLOUD_COVER')
 .first();
print(image1);
var image2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
 .filterBounds(poi2)
 .filterDate('2020-01-01', '2020-12-31')
 .sort('CLOUD_COVER')
 .first();
print(image2);
//mosaik 2 citra di atas bos
var bhnmosaik = ee.ImageCollection ([image1, image2]);
var mosaic = bhnmosaik.mosaic();
Map.centerObject(poi1, 8);
Map.addLayer(mosaic, {bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,},'Landsat 8 2020');
Map.addLayer(image.clip(table), {bands: ['b1'],
  min: 0,
  max: 1,
  palette: ['red','d3d8ff'],},'Lahan Terbangun 2000');
Map.addLayer(imagee.clip(table), {bands: ['b1'],
  min: 0,
  max: 1,
  palette: ['red','d3d8ff'],},'Lahan Terbangun 2010');
Map.addLayer(imageee.clip(table), {bands: ['b1'],
  min: 0,
  max: 1,
  palette: ['red','d3d8ff'],},'Lahan Terbangun 2020');
Map.addLayer(sim30.clip(table), {bands: ['b1'],
  min: 0,
  max: 1,
  palette: ['red','d3d8ff'],},'Prediksi Lahan Terbangun 2030');
Map.addLayer(sim40.clip(table), {bands: ['b1'],
  min: 0,
  max: 1,
  palette: ['red','d3d8ff'],},'Prediksi Lahan Terbangun 2040');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Perkembangan Lahan Terbangun',
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitle1 = ui.Label({
  value: 'Web App ini berisi tentang informasi mengenai perkembangan'+
  'lahan terbangun dari tahun 2000-2020,'+
  'dan prediksi perkembangannya hingga tahun 2040.',
  style: {
    fontWeight: 'regular',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var legendTitle2 = ui.Label({
  value: 'Legenda',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle).add(legendTitle1).add(legendTitle2);
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
var palette =['FF0000', 'd3d8ff', '1500ff'];
// name of the legend
var names = ['Lahan Terbangun','Non Terbangun','Blue'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);  
ui.util.getCurrentPosition(function() {
    print(Map.getCenter());
  })