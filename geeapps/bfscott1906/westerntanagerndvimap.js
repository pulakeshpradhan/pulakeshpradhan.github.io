var Offical = ui.import && ui.import("Offical", "table", {
      "id": "users/bfscott1906/Offical_Maps"
    }) || ee.FeatureCollection("users/bfscott1906/Offical_Maps"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/bfscott1906/IUCN/Chlorothraupis_stolzmanni"
    }) || ee.FeatureCollection("users/bfscott1906/IUCN/Chlorothraupis_stolzmanni"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/bfscott1906/IUCN/Cyanoloxia_cyanoides"
    }) || ee.FeatureCollection("users/bfscott1906/IUCN/Cyanoloxia_cyanoides"),
    SEM = ui.import && ui.import("SEM", "table", {
      "id": "users/bfscott1906/Filtered_SEMs/SEM-filtered"
    }) || ee.FeatureCollection("users/bfscott1906/Filtered_SEMs/SEM-filtered"),
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -129.82890625,
                56.01355183652776
              ],
              [
                -129.82890625,
                28.59870036341486
              ],
              [
                -103.0662109375,
                28.59870036341486
              ],
              [
                -103.0662109375,
                56.01355183652776
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
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-129.82890625, 56.01355183652776],
          [-129.82890625, 28.59870036341486],
          [-103.0662109375, 28.59870036341486],
          [-103.0662109375, 56.01355183652776]]], null, false),
    IUCNBreed = ui.import && ui.import("IUCNBreed", "table", {
      "id": "users/bfscott1906/All-breeding"
    }) || ee.FeatureCollection("users/bfscott1906/All-breeding"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/bfscott1906/Breeding/SEM_Piranga_ludoviciana_breeding"
    }) || ee.FeatureCollection("users/bfscott1906/Breeding/SEM_Piranga_ludoviciana_breeding"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/bfscott1906/Breeding/SEM_Passerina_versicolor_breeding"
    }) || ee.FeatureCollection("users/bfscott1906/Breeding/SEM_Passerina_versicolor_breeding"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/bfscott1906/Breeding/SEM_Passerina_amoena_breeding"
    }) || ee.FeatureCollection("users/bfscott1906/Breeding/SEM_Passerina_amoena_breeding"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "users/bfscott1906/IUCN/Habia_cristata"
    }) || ee.FeatureCollection("users/bfscott1906/IUCN/Habia_cristata");
// var mask = Offical.filter(ee.Filter.eq('SCINAME', 'Habia cristata')) // IUCN range maps
// var mask = SEM.filter(ee.Filter.eq('species', 'Cardinalis_sinuatus.KDE')) 
var mask = table2;
Map.addLayer(mask);
// //////////////// Creating GIF /////////////////////////
var col = ee.ImageCollection('MODIS/006/MOD13A2').select('EVI');
////// Must drop polygon around shapefile of interest!!!! //////
// Define the regional bounds of animation frames.
// var region = ee.Geometry.Polygon(
//   [[[-18.698368046353494, 38.1446395611524],
//     [-18.698368046353494, -36.16300755581617],
//     [52.229366328646506, -36.16300755581617],
//     [52.229366328646506, 38.1446395611524]]],
//   null, false
// );
Map.addLayer(region);
col = col.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});
var distinctDOY = col.filterDate('2011-01-01', '2014-01-01');
// breeding times 
 var distinctDOY = distinctDOY.filter
 (ee.Filter.calendarRange(4,9,'month'));
// Define a filter that identifies which images from the complete collection
// match the DOY from the distinct DOY collection.
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
// Define a join.
var join = ee.Join.saveAll('doy_matches');
// Apply the join and convert the resulting FeatureCollection to an
// ImageCollection.
var joinCol = ee.ImageCollection(join.apply(distinctDOY, col, filter));
// Apply median reduction among matching DOY collections.
var comp = joinCol.map(function(img) {
  var doyCol = ee.ImageCollection.fromImages(
    img.get('doy_matches')
  );
  return doyCol.reduce(ee.Reducer.median());
});
// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 9000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
// Create RGB visualization images for use as animation frames.
var rgbVis = comp.map(function(img) {
  return img.visualize(visParams).clip(mask);
});
// Define GIF visualization parameters.
var gifParams = {
  'region': region,
  'dimensions': 600,
  'crs': 'EPSG:3857',
  'framesPerSecond': 10
};
// Print the GIF URL to the console.
print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console.
print(ui.Thumbnail(rgbVis, gifParams));