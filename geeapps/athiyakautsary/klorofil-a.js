var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                92.46345820486268,
                7.851026819477083
              ],
              [
                92.46345820486268,
                -11.729000319308962
              ],
              [
                141.06697382986266,
                -11.729000319308962
              ],
              [
                141.06697382986266,
                7.851026819477083
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
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[92.46345820486268, 7.851026819477083],
          [92.46345820486268, -11.729000319308962],
          [141.06697382986266, -11.729000319308962],
          [141.06697382986266, 7.851026819477083]]], null, false),
    ModisAqua = ui.import && ui.import("ModisAqua", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI");
var Kota = geometry
Map.addLayer(Kota,{color:"green"}, "Indonesia");
Map.centerObject(Kota, 4);
var chlorophyll_a_mean = ModisAqua
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('chlor_a')
.mean();
var chlorophyll_a_median = ModisAqua
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('chlor_a')
.median();
var chlorophyll_a_min = ModisAqua
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('chlor_a')
.min();
var chlorophyll_a_max = ModisAqua
.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
.select('chlor_a')
.max();
var chlorophyll_aVis = {
  min: 0,
  max: 2,
};
Map.addLayer(chlorophyll_a_mean.clip(Kota), chlorophyll_aVis, 'Chlorophyll_a mean');
Map.addLayer(chlorophyll_a_median.clip(Kota), chlorophyll_aVis, 'Chlorophyll_a median');
Map.addLayer(chlorophyll_a_min.clip(Kota), chlorophyll_aVis, 'Chlorophyll_a min');
Map.addLayer(chlorophyll_a_max.clip(Kota), chlorophyll_aVis, 'Chlorophyll_a max');