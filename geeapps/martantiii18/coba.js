var landsat8SR_T1 = ui.import && ui.import("landsat8SR_T1", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    polygon1 = ui.import && ui.import("polygon1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                121.21174383954435,
                -2.5268545119508583
              ],
              [
                121.42735052899748,
                -2.5803596747279838
              ],
              [
                121.50150824384123,
                -2.5501775490586405
              ],
              [
                121.50150824384123,
                -2.4102331188451487
              ],
              [
                121.16093207196623,
                -2.40474480333633
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                121.27471420385986,
                -2.7222372350056503
              ],
              [
                121.36123153784423,
                -2.955410046231283
              ],
              [
                121.72790023901611,
                -2.952667113868927
              ],
              [
                121.71784253402836,
                -2.629752265285207
              ],
              [
                121.37314648910649,
                -2.631810030749077
              ]
            ]
          ],
          "evenOdd": true
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
    ee.Geometry.MultiPolygon(
        [[[[121.21174383954435, -2.5268545119508583],
           [121.42735052899748, -2.5803596747279838],
           [121.50150824384123, -2.5501775490586405],
           [121.50150824384123, -2.4102331188451487],
           [121.16093207196623, -2.40474480333633]]],
         [[[121.27471420385986, -2.7222372350056503],
           [121.36123153784423, -2.955410046231283],
           [121.72790023901611, -2.952667113868927],
           [121.71784253402836, -2.629752265285207],
           [121.37314648910649, -2.631810030749077]]]]),
    NatcolVisParam = ui.import && ui.import("NatcolVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.0067672674340692775,
        "max": 0.03493132305807914,
        "gamma": 1.4000000000000001
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.0067672674340692775,"max":0.03493132305807914,"gamma":1.4000000000000001},
    ndwiVisParam = ui.import && ui.import("ndwiVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDWI"
        ],
        "min": -0.8685045110219153,
        "max": -0.046039439359888856,
        "palette": [
          "27ff00",
          "0400ff"
        ]
      }
    }) || {"opacity":1,"bands":["NDWI"],"min":-0.8685045110219153,"max":-0.046039439359888856,"palette":["27ff00","0400ff"]},
    boundary = ui.import && ui.import("boundary", "table", {
      "id": "users/forTA/danau"
    }) || ee.FeatureCollection("users/forTA/danau"),
    clhVisParam = ui.import && ui.import("clhVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "min": 0.5180632614343749,
        "max": 0.5535489129446826,
        "palette": [
          "ff0000",
          "fbff00"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"min":0.5180632614343749,"max":0.5535489129446826,"palette":["ff0000","fbff00"]},
    landsat8SR_T2 = ui.import && ui.import("landsat8SR_T2", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T2_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T2_SR");
var polygon = ee.Geometry.Polygon([
  [[121.731876,-2.330221], [121.069735, -2.317823], [121.214026,-2.994612], [121.785511,-2.992766]]
]);
var studyarea= polygon;
//Read the Data
var col= ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
            .filterBounds(studyarea);
print(col,'colection');
//Make a time
var startYear = 2013; 
var endYear = 2020; 
var startdate=ee.Date.fromYMD(startYear,01,01);
var enddate=ee.Date.fromYMD(endYear+1,12,31);
var year_list = ee.List.sequence(startYear, endYear);
//cloud masking area
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.divide(10000).divide(3.141593).updateMask(mask);
}
//visual parameter
var vizParams = {
bands: ['B4', 'B3', 'B2'],
min: 0,
max: 0.03,
gamma: 1.4,
};
//Make a calculate for Clorophil-a
var clh_collection =  ee.ImageCollection.fromImages(year_list.map(function (ynz){
  var image = col.filter(ee.Filter.calendarRange(ynz, ynz, 'year'))
              .map(maskL8sr)
              .median();
            var ndwi = image.normalizedDifference(['B3', 'B5']).rename('NDWI');
            var clh_a = image.expression(
              'exp(-0.9889*((RrsB4)/(RrsB5))+0.3619)',
              {RrsB4: image.select('B4'),
              RrsB5: image.select('B5')}).updateMask(ndwi);
              return clh_a.set('year', ynz)
              .set('month', 1)
              .set('date', ee.Date.fromYMD(ynz,1,1))
              .set('system:time_start',ee.Date.fromYMD(ynz,1,1));
}).flatten());
print(clh_collection, 'Clorophil-a');
//var year = 2016;
var parameter = {min:0, max:1, palette:['blue','green']};
for (var i=2013;i<=2020;i++) {
  var clh = clh_collection.filter(ee.Filter.eq('year', i)).first();
  var clipped = clh.clip(studyarea);
  Map.addLayer(clipped,parameter,'Clorophyl-a '+i);
}
Map.centerObject(studyarea)
//=========================================//
//             Membuat Legenda             //
//=========================================//
//Make a legend
var parameter = {min:0, max:1.5, palette:['blue','green']};
//Membuat palet
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '200x20',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
//Membuat colorbar
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(parameter.palette),
  style: {stretch: 'vertical', margin: '0px 8px', maxHeight: '24px'},
});
//Membuat panel
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(parameter.min, {margin: '4px 5px', textAlign: 'left'}),
    ui.Label(parameter.max, {margin: '4px 170px', textAlign: 'right'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Klorofil-a (µg/l)',
  style: {fontWeight: 'bold'}
});
//Menampilkan legenda
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
//=========================================//
//                 Make a chart            //
//=========================================//
var klo_chart = ui.Chart.image.series({
  imageCollection: clh_collection, 
  region: studyarea,
  scale : 10000,
  xProperty: 'system:time_start'})
  .setOptions({
    title: 'Nilai Klorofil-a',
    vAxis: {title: 'Klorofil-a (µg/l)'},
});
print(klo_chart);
//=================================================================//  
//                       ANIMATED THUMBNAIL                        //  
//=================================================================//  
//Create an animated thumbnail
// Visualization parameters.
var args = {
  crs: 'EPSG:4326',
  dimensions: '800',
  region: studyarea,
  framesPerSecond: 5,
  min:0, 
  max:1, 
  palette:['blue','green'],
};
// // Create the animated thumbnail and add it to the map.
var thumb = ui.Thumbnail({
  image: clh_collection,
  params: args,
  style: {
    position: 'top-right',
    width: '800 px'
  }});
Map.add(thumb);
//=================================================================//  
//                           EXPORT DATA                           //  
//=================================================================//
for (var i=2013;i<=2020;i++) {
  var clh = clh_collection.filter(ee.Filter.eq('year', i)).first();
  var clipped = clh.clip(studyarea);
  Export.image.toDrive({
  image: clipped, 
  description: 'ExportData',
  fileNamePrefix: 'Exported'+i, 
  region: studyarea, 
  scale: 30 // Harus didefinisikan!
});
}