var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                34.44073744032448,
                33.57740492840347
              ],
              [
                34.44073744032448,
                31.146379868586077
              ],
              [
                36.61603040907448,
                31.146379868586077
              ],
              [
                36.61603040907448,
                33.57740492840347
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
        [[[34.44073744032448, 33.57740492840347],
          [34.44073744032448, 31.146379868586077],
          [36.61603040907448, 31.146379868586077],
          [36.61603040907448, 33.57740492840347]]], null, false),
    prec = ui.import && ui.import("prec", "image", {
      "id": "OpenLandMap/CLM/CLM_PRECIPITATION_SM2RAIN_M/v01"
    }) || ee.Image("OpenLandMap/CLM/CLM_PRECIPITATION_SM2RAIN_M/v01"),
    hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    s2a = ui.import && ui.import("s2a", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    rainvis = ui.import && ui.import("rainvis", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "ppt"
        ],
        "min": 200,
        "max": 800,
        "palette": [
          "ff390c",
          "ff9780",
          "ffd9d0",
          "fbff12",
          "d5ffc4",
          "8bff50",
          "7dff08",
          "25ffeb",
          "78a1ff",
          "0a4aff"
        ]
      }
    }) || {"opacity":1,"bands":["ppt"],"min":200,"max":800,"palette":["ff390c","ff9780","ffd9d0","fbff12","d5ffc4","8bff50","7dff08","25ffeb","78a1ff","0a4aff"]},
    rain = ui.import && ui.import("rain", "image", {
      "id": "users/rondrori/rain_500m_utm"
    }) || ee.Image("users/rondrori/rain_500m_utm");
// Paper ...
/*
var sumprec =prec.reduce('sum')
Map.addLayer(sumprec,{},'sum precipitation')
var raindiff = sumprec.subtract(rain)
Map.addLayer(raindiff,{},'raindiff')
*/
Map.setOptions( "SATELLITE")
var cmp = function(img){
  var ndvi = img.normalizedDifference(['B8','B4']).rename('ndvi')
  return img.addBands(ndvi)
}
var img = s2a.filterBounds(roi).filterDate('2019-09-22','2019-09-26').map(cmp).qualityMosaic('ndvi').clip(roi)
var rain = rain.select('b1').rename('ppt').subtract(50)
//var rain = prec.clip(roi).reduce(ee.Reducer.sum()).rename('ppt')
var hans = hansen.clip(roi)
var h = hans.select('treecover2000')
var hl = hans.select('loss')
var hg = hans.select('gain')
var mask = h.gt(10)
// p10
//var t_min00 = rain.multiply(0.0013).exp().multiply(0.1074)
// p20
var t_min00 = rain.multiply(0.0016).exp().multiply(0.1169)
var tm =t_min00.gt(0.3)
var t_min0 = t_min00.where(tm, 0.3)
var ndvi = img.normalizedDifference(['B8','B4']).mask(rain.gt(150))//.reproject('EPSG:32636')
var dyn_mask = ndvi.gt(t_min0)
var const_mask = ndvi.gt(0.2)
//Map.centerObject(roi,8)
Map.addLayer(rain,rainvis,'rain',false)
Map.addLayer(img,{bands:['B4','B3','B2'], min:500, max:1500},'s2', false)
Map.addLayer(h.mask(h.gt(0)),{min:0, max:1, palette:['blue']},'hansen blue')
Map.addLayer(hl.mask(hl.gt(0)),{min:0, max:1, palette:['yellow']},'hansen los yellow')
Map.addLayer(hg.mask(hg.gt(0)),{min:0, max:1, palette:['orange']},'hansen gain orange')
Map.addLayer(t_min0,{min:0, max:0.3},'dynamic thresh', false)
Map.addLayer(ndvi,{},'ndvi', false)
Map.addLayer(ndvi.mask(dyn_mask),{palette:['FF0000']},'dyamic - red',true,0.5)
Map.addLayer(ndvi.mask(const_mask),{palette:['00FF00']},'const green ',true,0.5)