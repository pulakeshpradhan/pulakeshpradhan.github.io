var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            119.49257811152347,
            -5.151064556867665
          ]
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
    ee.Geometry.Point([119.49257811152347, -5.151064556867665]),
    geom = ui.import && ui.import("geom", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                119.42048033320316,
                -5.103191688054302
              ],
              [
                119.42048033320316,
                -5.2406454980023955
              ],
              [
                119.57222899042972,
                -5.2406454980023955
              ],
              [
                119.57222899042972,
                -5.103191688054302
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[119.42048033320316, -5.103191688054302],
          [119.42048033320316, -5.2406454980023955],
          [119.57222899042972, -5.2406454980023955],
          [119.57222899042972, -5.103191688054302]]], null, false),
    Sent1 = ui.import && ui.import("Sent1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
// Filter the collection for the VV product from the descending track
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi)
    .select(['VV']);
print(collectionVV);
// Filter the collection for the VH product from the descending track
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi)
    .select(['VH']);
print(collectionVH);
//Let's centre the map view over our ROI
Map.centerObject(geom, 11);
var VV = collectionVV.median();
// Adding the VV layer to the map
Map.addLayer(VV, {min: -14, max: -7}, 'VV');
//Calculate the VH layer and add it
var VH = collectionVH.median();
Map.addLayer(VH, {min: -20, max: -7}, 'VH');
// Create a 3 band stack by selecting from different periods (months)
var VV1 = ee.Image(collectionVV.filterDate('2017-01-01', '2017-12-31').median());
var VV2 = ee.Image(collectionVV.filterDate('2018-01-01', '2018-12-31').median());
var VV3 = ee.Image(collectionVV.filterDate('2019-01-01', '2020-01-31').median());
//Add to map
Map.addLayer(VV1.addBands(VV2).addBands(VV3), {min: -12, max: -7}, 'Season composite');
//Export
Export.image.toDrive({
  image: VV1,
  description: 'JanApr2019',
  scale: 30,
  region: geom,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
Export.image.toDrive({
  image: VV2,
  description: 'MayAug2019',
  scale: 30,
  region: geom,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
Export.image.toDrive({
  image: VV3,
  description: 'SeptJan2020',
  scale: 30,
  region: geom,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});