var viirs = ui.import && ui.import("viirs", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"),
    aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.602323535714227,
                14.989834082872624
              ],
              [
                -17.602323535714227,
                14.48515346144871
              ],
              [
                -16.918424609932977,
                14.48515346144871
              ],
              [
                -16.918424609932977,
                14.989834082872624
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
        [[[-17.602323535714227, 14.989834082872624],
          [-17.602323535714227, 14.48515346144871],
          [-16.918424609932977, 14.48515346144871],
          [-16.918424609932977, 14.989834082872624]]], null, false);
// Objective: VIIRS Nighttime light analysis
// Step 1. import an AOI
// Step 2. Run
Map.setOptions('SATELLITE');
Map.setCenter(-17.32, 14.73,9);
// First, define an AOI which will be used to clip the image
// Search for: "VIIRS Nighttime Day/Night Band Composites Version 1"
// And change the name of the variable to viirs
// Select the band "avg_rad" in each image in the image collection
var viirs_avg_rad = viirs.select('avg_rad');
var viirs_old = viirs_avg_rad.filterDate('2020-01-01', '2020-02-01')
//Add this image to the map
Map.addLayer(viirs_old,{min:0, max: 20});
Map.add(ui.Label('Dakar Nighttime lights 2020', {fontWeight: 'bold', fontSize: '24px'}))