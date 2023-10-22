var aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.55132693574923,
                10.381970165475208
              ],
              [
                105.55132693574923,
                9.514935659436835
              ],
              [
                107.0440942697336,
                9.514935659436835
              ],
              [
                107.0440942697336,
                10.381970165475208
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
        [[[105.55132693574923, 10.381970165475208],
          [105.55132693574923, 9.514935659436835],
          [107.0440942697336, 9.514935659436835],
          [107.0440942697336, 10.381970165475208]]], null, false);
var area = aoi
var zoomLevel = 11
var collectionID = 'LANDSAT/LC08/C01/T1_TOA'
var startDate = '2019-01-01'
var endDate = '2019-12-31'
//filtering Image Collection
var col = ee.ImageCollection(collectionID)
.filterBounds (area)
.filterDate(startDate, endDate)
.filterMetadata('CLOUD_COVER', 'less_than', 20)
.median()
//original image style
var style = {
	bands: ['B6','B5', 'B4'],
	min: 0.01,
	max: 0.42,
	gamma: 1
}
//add original image to the layer
Map.addLayer(col.clip(aoi),style, 'Image')
var calNDVI = function (a){
	return a.addBands(a.normalizedDifference(['B5', 'B4']).rename('ndvi'))
}
var ndvi = calNDVI(col).select('ndvi')
var splitNDVI = function(img){
	var class1 = img.lt(0).selfMask().set('class', 1)
	var class2 = img.gte(0.0).and(img.lte(0.1).selfMask().set('val', 2));
	var class3 = img.gte(0.1).and(img.lte(0.2).selfMask().set('val', 3));
	var class4 = img.gte(0.2).and(img.lte(0.3).selfMask().set('val', 4));
	var class5 = img.gte(0.3).and(img.lte(0.4).selfMask().set('val', 5));
	var class6 = img.gte(0.4).and(img.lte(0.5).selfMask().set('val', 6));
	var class7 = img.gte(0.5).and(img.lte(0.6).selfMask().set('val', 7));
	var class8 = img.gte(0.6).and(img.lte(0.7).selfMask().set('val', 8));
	var class9 = img.gte(0.7).and(img.lte(0.8).selfMask().set('val', 9));
	var class10 = img.gte(0.8).and(img.lte(0.9).selfMask().set('val', 10));
	var class11= img.gte(0.9).selfMask().set('val', 11);
	return ee.ImageCollection.fromImages([
	class1,class2,class3,class4,class5,class6,class7,class8,class9,class10,class11
])
}
var split = splitNDVI(ndvi)
print(split)
var addBands = function(nd, feature){
  var totalClass =11
  var palette=[
    '1921ff',
    'ffa929',
    'ff7423',
    'efff00',
    '6c70ff',
    'f88dff',
    'ff52c2',
    '2bff63',
    '2aaf11',
    'ffd881',
    'ff0023'
    ]
    for (var a=0; a < totalClass; a++){
    var showList= nd.filterMetadata('val','equals', a+ 1).map(function(img){
      return img.clip(feature)
    })
    Map.addLayer (showList, {palette: palette[a]}, 'NDVI Class'+''+(a+1))
}
Map.centerObject(area, zoomLevel)
//create legend
var panel = ui.Panel({
  style:{
    position: 'bottom-right',
    padding: '5px'
  }
})
var title = ui.Label({
  value: 'NDVI Legend',
  style:{
    fontSize: '12px',
    fontWeight:'bold',
    margin: '7px'
  }
})
panel.add(title)
var ndvi_class= [
  '<0.0',
  '0.0-0.1',
  '0.1-0.2',
  '0.2-0.3',
  '0.3-0.4',
  '0.4-0.5',
  '0.5-0.6',
  '0.6-0.7',
  '0.7-0.8',
  '0.8-0.9',
  '0.9-1',
  ]
  var list_legend = function(color, description){
    var c=ui.Label({
      style:{
        backgroundColor: color,
        padding:'4px',
        margin:'7px'
      }
    })
    var ds= ui.Label ({
      value: description,
      style:{
        margin: '5px',
        fontSize:'9px'
      }
    })
    return ui.Panel({
      widgets:[c, ds],
      layout:ui.Panel.Layout.Flow('horizontal')
    })
  }
  for(var a=0;a<11;a++){
  panel.add(list_legend(palette[a], ndvi_class[a]))
  }
  Map.add(panel)
}
addBands(split, area)
//https://www.youtube.com/watch?v=r1unfBs-KQ0