var mask2 = ui.import && ui.import("mask2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                124.2947699462891,
                -8.163266029473185
              ],
              [
                124.2947699462891,
                -8.341304321023237
              ],
              [
                124.57354802246097,
                -8.341304321023237
              ],
              [
                124.57354802246097,
                -8.163266029473185
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[124.2947699462891, -8.163266029473185],
                  [124.2947699462891, -8.341304321023237],
                  [124.57354802246097, -8.341304321023237],
                  [124.57354802246097, -8.163266029473185]]], null, false),
            {
              "system:index": "0"
            })]),
    mask = ui.import && ui.import("mask", "table", {
      "id": "users/fatwaramdani/LautAlor"
    }) || ee.FeatureCollection("users/fatwaramdani/LautAlor");
var date_st = '04';
var date2_st = '05';
var month_st = '08';
var year_st = '2016';
//var date_st = '07';
//var date2_st = '08';
//var month_st = '04';
//var year_st = '2016';
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
// Map the function over one year of data.
var collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
    .filterDate(year_st+'-'+month_st+'-'+date_st,year_st+'-'+month_st+'-'+date2_st)
    //.map(maskL8sr)
print(collection)
    //.filterDate('2020-05-31','2020-06-01')
var composite = collection.median();
//Map.addLayer(composite, {bands: ['B11'],min: 0, max: 0.5},'BelumClip');
Map.setCenter(124.4012, -8.2737, 13);
// Clip Images 
var Clip = composite.clipToCollection (mask2);
//Map.addLayer(Clip, {bands: ['B11']}, 'Clip');
//print(Clip)
var bands = ['B11']
//var image = Clip.select(bands)
var merged = collection.toBands();
var mergeBands = function(image, previous) {
  return ee.Image(previous).addBands(image);
};
var merged = collection.iterate(mergeBands, ee.Image([]));
//print(merged)
//var pick = merged.select(["B11"]);
var median1 = collection.reduce(ee.Reducer.median());
var Clip1 = median1.clipToCollection (mask2);
var vis_param = {bands: ['B4', 'B3', 'B2'], gamma: 4};
Map.addLayer(composite, vis_param, 'False Colour');
var a = Clip1.select(['B11_median']).multiply(ee.Number(0)).add(ee.Number(1282.71));
var c = Clip1.select(['B11_median']).multiply(ee.Number(0)).add(ee.Number(666.09));
var e = Clip1.select(['B11_median']).multiply(ee.Number(0)).add(ee.Number(1));
var f = Clip1.select(['B11_median']).multiply(ee.Number(0)).add(ee.Number(-273));
var d = c.divide(Clip1.select(['B11_median']))
var g = d.add(e)
var ln = g.log()
var sst = c.divide(ln).add(f).add(f)
var b = -273;
var select1 = Clip1.select(['B11_median']).add(f);
var band_viz = {
  min : 9,
  max : 12,
  opacity:0.5,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
//Clip SST using LautAlor shp (Assets)
var SSTClip = sst.clipToCollection (mask);
//Map.addLayer(select1,visParams3);
Map.addLayer(SSTClip, band_viz, 'SST of Alor, 5 August 2016');
//Export.image.toDrive({
  //image: sst,
  //description: year_st+'-'+month_st+'-'+date_st,
  //scale: 14,
  //region:mask.geometry().bounds(), //(INA sebagai batas region)//
  //maxPixels: 1e13,
//});
//Add cartographic component
var title = ui.Label({
  value: 'Sea surface temperature around Alor Island, Indonesia',
  style:{
  fontWeight: 'bold',
  fontSize: '18px'
  }});
title.style().set('position', 'top-center');
//Show title
Map.add(title);
var header = ui.Label('Map of sea surface temperature around Alor Island for year 2016, Indonesia', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Map of sea surface temperature (SST) around Alor Island captured by Landsat-8, August 2016',
{fontSize: '15px'});
var text_2 = ui.Label(
'Developed by: F. Ramdani, A. Wirastria, and A.R. Jalil (2020)',
{fontSize: '11px'});
var text_3 = ui.Label(
'Acknowledgement: This research is supported by the Program Penelitian Kolaborasi Indonesia (PPKI), 2020',
{fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2, text_3], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
//Membuat legenda
var legendTitle2 = ui.Label({
value: 'SST (degree Celcius)',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});
//Membuat panel aksesoris dan komponen kartografi
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'', 
  'color': '3333ff'
  };
//Membuat judul legenda
var legendTitle = ui.Label('Legenda',titleTextVis);
//Menambahkan judul legenda kedua
legend.add(legendTitle2);
//Membuat gambar legenda
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((band_viz.max-band_viz.min)/100.0).add(band_viz.min);
var legendImage = gradient.visualize(band_viz);
//Membuat teks di atas legenda
var panel = ui.Panel({
widgets: [
ui.Label('> '.concat(band_viz['max']))
],
});
legend.add(panel);
//Menampilkan gambar legenda
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
//Menambahkan gambar ke legenda
legend.add(thumbnail);
//Membuat teks di bawah legenda
var panel = ui.Panel({
widgets: [
ui.Label(band_viz['min'])
],
});
legend.add(panel);
//Menampilkan legenda di peta utama
Map.add(legend);