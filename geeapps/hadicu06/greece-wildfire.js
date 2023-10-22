var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            23.30449536773978,
            38.90554850225627
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([23.30449536773978, 38.90554850225627]);
var sr = ee.ImageCollection("COPERNICUS/S2_SR")
         .filterBounds(geometry)
         .filterDate('2021-08-01', '2021-08-31')
print("sr", sr) // only 3
var sr_list = sr.toList(3)
var visParamRGB = {bands:['B4','B3','B2'], min:[0,0,0], max:[1500,1500,1500]}
var visParamFCC = {bands:['B12','B8A','B5'], min:[0,0,0], max:[2500,4000,3000]}
// Map.addLayer(ee.Image(sr_list.get(0)), visParamRGB, "sr_list.get(0)")
// Map.addLayer(ee.Image(sr_list.get(1)), visParamRGB, "sr_list.get(1)")
// Map.addLayer(ee.Image(sr_list.get(2)), visParamRGB, "sr_list.get(2)")
var sel_scene = ee.Image(sr_list.get(1))
print("sel_scene", sel_scene)
Map.addLayer(sel_scene, visParamRGB, "COPERNICUS/S2_SR/20210806T092031_20210806T092208_T34SFJ")
Map.addLayer(sel_scene, visParamFCC, "COPERNICUS/S2_SR/20210806T092031_20210806T092208_T34SFJ")
Map.setOptions('SATELLITE')
Map.setCenter(23.309249164315844, 38.895054369529475, 11)