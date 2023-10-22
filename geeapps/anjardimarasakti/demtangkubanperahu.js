var SRTM_30 = ui.import && ui.import("SRTM_30", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.52025004066311,
                -6.700598502371858
              ],
              [
                107.52025004066311,
                -6.818562421790541
              ],
              [
                107.65551920570218,
                -6.818562421790541
              ],
              [
                107.65551920570218,
                -6.700598502371858
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
      "color": "#0ec249",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0ec249 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[107.52025004066311, -6.700598502371858],
          [107.52025004066311, -6.818562421790541],
          [107.65551920570218, -6.818562421790541],
          [107.65551920570218, -6.700598502371858]]], null, false);
var DEM_SRTM30 = SRTM_30
.select('elevation'); 
var Slope_SRTM30= ee.Terrain.slope(DEM_SRTM30)
var Aspect_SRTM30= ee.Terrain.aspect(DEM_SRTM30);
var Hillshade_SRTM30= ee.Terrain.hillshade(DEM_SRTM30);
var Parameter_DEM = {min: 0, max: 3000};
var Parameter_Slope = {min: 0, max: 60};
var Parameter_Aspect = {min: 0, max: 350};
var Parameter_Hillshade = {min: 0, max: 255};
Map.addLayer(DEM_SRTM30.clip(geometry), Parameter_DEM, 'DEM_SRTM30')
Map.addLayer(Slope_SRTM30.clip(geometry), Parameter_Slope, 'Slope_SRTM30')
Map.addLayer(Aspect_SRTM30.clip(geometry), Parameter_Aspect, 'Aspect_SRTM30') 
Map.addLayer(Hillshade_SRTM30.clip(geometry), Parameter_Hillshade, 'Hillshade_SRTM30') 
Map.centerObject(geometry, 12)