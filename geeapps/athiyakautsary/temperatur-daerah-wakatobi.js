var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                123.2537833231043,
                -4.9892519707418375
              ],
              [
                123.2537833231043,
                -6.6177686804476386
              ],
              [
                124.7314444559168,
                -6.6177686804476386
              ],
              [
                124.7314444559168,
                -4.9892519707418375
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
        [[[123.2537833231043, -4.9892519707418375],
          [123.2537833231043, -6.6177686804476386],
          [124.7314444559168, -6.6177686804476386],
          [124.7314444559168, -4.9892519707418375]]], null, false),
    HYCOM = ui.import && ui.import("HYCOM", "imageCollection", {
      "id": "HYCOM/sea_temp_salinity"
    }) || ee.ImageCollection("HYCOM/sea_temp_salinity");
var Kota = geometry
Map.addLayer(Kota,{color:"yellow"}, "Wakatobi");
Map.centerObject(Kota, 8);
var SST_mean = HYCOM
.filter(ee.Filter.date('2018-08-01', '2018-08-15'))
.select('water_temp_0')
.mean();
var SST_median = HYCOM
.filter(ee.Filter.date('2018-08-01', '2018-08-15'))
.select('water_temp_0')
.median();
var SST_min = HYCOM
.filter(ee.Filter.date('2018-08-01', '2018-08-15'))
.select('water_temp_0')
.min();
var SST_max = HYCOM
.filter(ee.Filter.date('2018-08-01', '2018-08-15'))
.select('water_temp_0')
.max();
var SST_ParVis = {
  min: -20000,
  max: 15000,
  palette :[
    '000000', '005aff', '43c8c8', 'fff700', 'ff0000'
    ],
};
Map.addLayer(SST_mean.clip(Kota), SST_ParVis, 'SST_mean');
Map.addLayer(SST_median.clip(Kota), SST_ParVis, 'SST_median');
Map.addLayer(SST_min.clip(Kota), SST_ParVis, 'SST_min');
Map.addLayer(SST_max.clip(Kota), SST_ParVis, 'SST_max');