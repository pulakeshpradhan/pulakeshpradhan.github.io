var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR_HARMONIZED"
    }) || ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -4.543061110284878,
                37.52429391612843
              ],
              [
                -4.543061110284878,
                37.50291627690839
              ],
              [
                -4.510874602106167,
                37.50291627690839
              ],
              [
                -4.510874602106167,
                37.52429391612843
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
        [[[-4.543061110284878, 37.52429391612843],
          [-4.543061110284878, 37.50291627690839],
          [-4.510874602106167, 37.50291627690839],
          [-4.510874602106167, 37.52429391612843]]], null, false),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "max": 1,
        "gamma": 1.7300000000000002
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"max":1,"gamma":1.7300000000000002},
    imageVisParamNDVI = ui.import && ui.import("imageVisParamNDVI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": 0,
        "palette": [
          "ff0808",
          "fff708",
          "deff27",
          "6bff1f",
          "17c624"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":0,"palette":["ff0808","fff708","deff27","6bff1f","17c624"]},
    sigpac = ui.import && ui.import("sigpac", "table", {
      "id": "users/jimberni/01_SP22_REC_PROV_14"
    }) || ee.FeatureCollection("users/jimberni/01_SP22_REC_PROV_14"),
    imageVisParamChange = ui.import && ui.import("imageVisParamChange", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -0.2,
        "max": 0.3,
        "palette": [
          "ff0808",
          "fff708",
          "deff27",
          "6bff1f",
          "17c624"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-0.2,"max":0.3,"palette":["ff0808","fff708","deff27","6bff1f","17c624"]};
Map.centerObject(roi, 12);
var olivar = sigpac.filter(ee.Filter.and(ee.Filter.eq('CD_USO', 'OV'), ee.Filter.gt('NU_AREA', 20000)));
var simplifiedOlivar = olivar.map(function(feature) {
  return feature.simplify({maxError: 100});
});
var maskOlivar = ee.Image.constant(1).clipToCollection(simplifiedOlivar).mask();
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var b9 = image.select('B9');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0))
      .and(b9.lt(10000))
      .and(maskOlivar);
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename("NDVI");
  // image = image.addBands([ndvi]);
  return ndvi.updateMask(mask);
}
var s2_filtered_summer = s2.filterDate('2021-07-01', '2021-07-30')
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',50))
                    .sort('CLOUDY_PIXEL_PERCENTAGE', false)
                    .map(maskS2clouds);
                    //.first();
var s2_filtered_spring = s2.filterDate('2020-04-15', '2020-05-15')
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',50))
                    .sort('CLOUDY_PIXEL_PERCENTAGE', false)
                    .map(maskS2clouds);
Map.addLayer(s2_filtered_summer.select('NDVI').median(),imageVisParamNDVI,'S2 NDVI Summer', false);
Map.addLayer(s2_filtered_spring.select('NDVI').median(),imageVisParamNDVI,'S2 NDVI Spring', false);
Map.addLayer(s2_filtered_spring.select('NDVI').median().subtract(s2_filtered_summer.select('NDVI').median()),imageVisParamChange,'S2 NDVI Change');
//Map.addLayer(maskOlivar);