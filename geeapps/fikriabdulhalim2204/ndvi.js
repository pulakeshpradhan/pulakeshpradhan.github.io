var indo = ui.import && ui.import("indo", "table", {
      "id": "users/egiputranto/indonesia_provinsi"
    }) || ee.FeatureCollection("users/egiputranto/indonesia_provinsi"),
    l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            104.31407235797118,
            -5.337332442463369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            104.25403138271531,
            -5.3726149408532535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            104.23635026088914,
            -5.3632149702075536
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(
        [[104.31407235797118, -5.337332442463369],
         [104.25403138271531, -5.3726149408532535],
         [104.23635026088914, -5.3632149702075536]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI_2018"
        ],
        "min": -1,
        "palette": [
          "ff0000",
          "008000"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI_2018"],"min":-1,"palette":["ff0000","008000"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI_2018"
        ],
        "min": -1,
        "palette": [
          "ff0000",
          "00dc00",
          "2cc822"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI_2018"],"min":-1,"palette":["ff0000","00dc00","2cc822"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI_2018"
        ],
        "min": -1,
        "palette": [
          "ff0000",
          "00bc00",
          "2cc822"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI_2018"],"min":-1,"palette":["ff0000","00bc00","2cc822"]};
//BATAS WILAYAH INDONESIA TINGKAT PROVINSI
var area = ee.FeatureCollection(indo); 
var styling = {color: 'Black', fillColor: '00000000'};
Map.addLayer(area, styling, "Indonesia");
Map.centerObject(area,5)
var landsat8 = l8
.filterDate("2018-01-01","2018-12-31")
.sort('CLOUD_COVER', false)
.mean(); 
var landsat9 = l8
.filterDate("2020-01-01","2020-12-31")
.sort('CLOUD_COVER', false)
.mean(); 
// Compute the Normalized Difference Vegetation Index (NDVI).
var nir = landsat8.select('B5');
var red = landsat8.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI_2018');
var ndviParams = {min: -1, max: 1, palette: ['red', 'yellow', 'green']};
Map.addLayer(ndvi.clip(area), ndviParams, 'NDVI image');
var intervals6 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ff0000" quantity="-1" label="-1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#ff0000" quantity="-0.1" label="-0.1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#29ff02" quantity="0" label="0" />' + // sedang
      '<ColorMapEntry color="#21ce02" quantity="1" label="1" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';
var nir2 = landsat9.select('B5');
var red2 = landsat9.select('B4');
var ndvi2 = nir2.subtract(red2).divide(nir2.add(red2)).rename('NDVI_2018');
var ndviParams = {min: -1, max: 1, palette: ['red','yellow','00dc00']};
Map.addLayer(ndvi2.clip(area), ndviParams, 'NDVI image after');
var dndvi = ndvi2.subtract(ndvi);
Map.addLayer(dndvi.clip(area), ndviParams, 'dNDVI');
Map.addLayer(dndvi.sldStyle(intervals6).clip(area), {}, 'ndvi boy');
var ndvireclass = ee.Image(4) //RECLASS RENTANG NDVI
          .where(ndvi.gt(0).and(ndvi.lte(0.25)), 5)
          .where(ndvi.gt(0.25).and(ndvi.lte(0.5)), 3)
          .where(ndvi.gt(0.5).and(ndvi.lte(0.75)), 2)
          .where(ndvi.gt(0.75).and(ndvi.lte(1)), 1);
var intervals5 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1be907" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#76e704" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#dccf00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#d06d00" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#d63000" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';
var nclass = ndvireclass.sldStyle(intervals).clip(area)
Map.addLayer(ndvireclass.sldStyle(intervals).clip(area), {}, 'ndvi classified');
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'NDVI 2016',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
var makeRow = function(color, name) {
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =['d63000','d06d00','dccf00','76e704','1be907'];
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }