var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-bricker0/assets/Mangrove_large_ortho"
    }) || ee.Image("projects/ee-bricker0/assets/Mangrove_large_ortho"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"gamma":1},
    image2 = ui.import && ui.import("image2", "image", {
      "id": "projects/ee-bricker0/assets/Ortho_Corolita_RGB"
    }) || ee.Image("projects/ee-bricker0/assets/Ortho_Corolita_RGB"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "ndvi"
        ],
        "min": -0.1,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "529400",
          "3e8601",
          "207401",
          "056201",
          "004c00",
          "023b01",
          "012e01",
          "011d01",
          "011301"
        ]
      }
    }) || {"opacity":1,"bands":["ndvi"],"min":-0.1,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","529400","3e8601","207401","056201","004c00","023b01","012e01","011d01","011301"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -70.0808064936809,
                12.703662822856213
              ],
              [
                -70.0808064936809,
                11.914737750630142
              ],
              [
                -68.0758016108684,
                11.914737750630142
              ],
              [
                -68.0758016108684,
                12.703662822856213
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
        [[[-70.0808064936809, 12.703662822856213],
          [-70.0808064936809, 11.914737750630142],
          [-68.0758016108684, 11.914737750630142],
          [-68.0758016108684, 12.703662822856213]]], null, false);
// Sentinel-2/Landsat 5 Normalized Difference Vegetation Index (NDVI) script, written by Will Deadman (william.m.deadman@gmail.com)
var ndvi_palette = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, ' + '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
// Load a country border as a region of interest (roi).
//var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
//var roi = countries.filterMetadata('country_na', 'equals', 'Aruba');
// Sentinel-2 (late 2015-)
var S2_display = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
function addnd(input) {
  var nd = input.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return input.addBands(nd);
}
//Wet Season
var wet_S2_collection = ee.ImageCollection("COPERNICUS/S2")
  .filterDate('2021-12-01', '2021-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .map(addnd);
var wet_S2_mosaic = wet_S2_collection.median();
var wet_ndvi_S2 = wet_S2_collection.select('ndvi').median();
Map.addLayer(wet_S2_mosaic, S2_display, "Wet True Color");
//Dry Season
var dry_S2_collection = ee.ImageCollection("COPERNICUS/S2")
  .filterDate('2021-07-01', '2021-07-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .map(addnd);
var dry_S2_mosaic = dry_S2_collection.median();
var dry_ndvi_S2 = wet_S2_collection.select('ndvi').median();
Map.addLayer(dry_S2_mosaic, S2_display, "Dry True Color");
//Add to map
Map.addLayer(wet_ndvi_S2, {min: -0.1, max: 1, palette: ndvi_palette}, 'Wet 2021 NDVI S2');
Map.addLayer(dry_ndvi_S2, {min: -0.1, max: 1, palette: ndvi_palette}, 'Dry 2021 NDVI S2');
Map.centerObject(geometry);
var dataset = ee.ImageCollection('LANDSAT/MANGROVE_FORESTS');
var mangrovesVis = {
  min: 0,
  max: 1.0,
  palette: ['d40115'],
};
Map.addLayer(dataset, mangrovesVis, 'Mangroves');
// Export the NDVI image
//Export.image.toDrive({
//image: ndvi_S2,
//region: roi,
// description: 'Curacao_wet_2021_NDVI_July',
// scale: 30,
//});