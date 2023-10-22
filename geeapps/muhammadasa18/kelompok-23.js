var ERA5 = ui.import && ui.import("ERA5", "imageCollection", {
      "id": "ECMWF/ERA5/DAILY"
    }) || ee.ImageCollection("ECMWF/ERA5/DAILY"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                150.32024694095742,
                -32.76140884333558
              ],
              [
                150.32024694095742,
                -33.16353503753447
              ],
              [
                150.55645299564486,
                -33.16353503753447
              ],
              [
                150.55645299564486,
                -32.76140884333558
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                150.55645299564486,
                -32.91832890331215
              ],
              [
                150.55645299564486,
                -33.05080197187518
              ],
              [
                150.640223747598,
                -33.05080197187518
              ],
              [
                150.640223747598,
                -32.91832890331215
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
        },
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
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[150.32024694095742, -32.76140884333558],
           [150.32024694095742, -33.16353503753447],
           [150.55645299564486, -33.16353503753447],
           [150.55645299564486, -32.76140884333558]]],
         [[[150.55645299564486, -32.91832890331215],
           [150.55645299564486, -33.05080197187518],
           [150.640223747598, -33.05080197187518],
           [150.640223747598, -32.91832890331215]]]], null, false),
    KBDI = ui.import && ui.import("KBDI", "imageCollection", {
      "id": "UTOKYO/WTLAB/KBDI/v1"
    }) || ee.ImageCollection("UTOKYO/WTLAB/KBDI/v1"),
    S5P = ui.import && ui.import("S5P", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_AER_AI"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_AER_AI"),
    Landsat8_T1_SR = ui.import && ui.import("Landsat8_T1_SR", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
//Wilayah Wollemi National Park
var NSW = geometry;
Map.addLayer(NSW,{color:"orange" },"Wollemi National Park");
Map.centerObject(NSW, 10);
//Tingkat Kekeringan
var KBDI_Index = KBDI
.filter(ee.Filter.date('2019-10-01', '2020-01-01'));
var geom = geometry;
var band_viz = {
  min: 0,
  max: 800,
  palette: [
    '001a4d', '003cb3', '80aaff', '336600', 'cccc00', 'cc9900', 'cc6600',
    '660033'
  ]
};
Map.addLayer(KBDI_Index.max().clip(NSW), band_viz, 'KBDI (Indeks Kekeringan) (max)');
Map.addLayer(KBDI_Index.min().clip(NSW), band_viz, 'KBDI (Indeks Kekeringan) (min)');
print(ui.Chart.image.series(KBDI_Index, geom, ee.Reducer.mean(), 30));
//Rata-Rata Temperatur
var ERA5_Temp = ERA5.filterDate('2019-10-01', '2020-01-01')
.select('mean_2m_air_temperature')
var geom = geometry;
var vis2mt = {
  min: 250,
  max: 320,
  palette: [
    '#000080', '#0000D9', '#4000FF', '#8000FF', '#0080FF', '#00FFFF', '#00FF80',
    '#80FF00', '#DAFF00', '#FFFF00', '#FFF500', '#FFDA00', '#FFB000', '#FFA400',
    '#FF4F00', '#FF2500', '#FF0A00', '#FF00FF'
  ]
};
Map.addLayer(ERA5_Temp.max().clip(NSW), vis2mt, 'Temperatur Rata-Rata Harian (max)');
Map.addLayer(ERA5_Temp.min().clip(NSW), vis2mt, 'Temperatur Rata-Rata Harian (min)');
print(ui.Chart.image.series(ERA5_Temp, geom, ee.Reducer.mean(), 30));
//Tingkat Aerosol di Atmosfer
var S5P_Aer = S5P.filterDate('2019-10-01', '2020-01-01')
.select('absorbing_aerosol_index')
var geom = geometry;
var band_viz = {
  min: -1,
  max: 2.0,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(S5P_Aer.max().clip(geometry), band_viz, 'TIngkat Aerosol (max)');
Map.addLayer(S5P_Aer.min().clip(geometry), band_viz, 'Tingkat Aerosol (min)');
print(ui.Chart.image.series(S5P_Aer, geom, ee.Reducer.mean(), 30));
//dNBR
var prefire = ee.ImageCollection(Landsat8_T1_SR
  .filterDate('2019-10-01', '2020-01-01')
  .filterBounds(geometry)
  .sort('CLOUD_COVER', false));
var postfire = ee.ImageCollection(Landsat8_T1_SR
  .filterDate('2020-01-01', '2020-04-01')
  .filterBounds(geometry)
  .sort('CLOUD_COVER', false));
var pre_mos = prefire.mosaic().clip(geometry);
var post_mos = postfire.mosaic().clip(geometry);
var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 4000, gamma: 1.5};
Map.addLayer(pre_mos, vis, 'Pre-fire image');
Map.addLayer(post_mos, vis, 'Post-fire image');
function maskL8sr(image) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var snowBitMask = 1 << 4;
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
var pre_cm_mos = prefire
.map(maskL8sr)
.mosaic()
.clip(geometry);
var post_cm_mos = postfire
.map(maskL8sr)
.mosaic()
.clip(geometry);
Map.addLayer(pre_cm_mos, vis,'Pre-fire - Clouds masked');
Map.addLayer(post_cm_mos, vis,'Post-fire - Clouds masked:');
//NBR = (NIR-SWIR2) / (NIR+SWIR2)
var pre_nir = pre_cm_mos.select('B5');
var pre_SWIR2 = pre_cm_mos.select('B7');
var preNBR = pre_nir.subtract(pre_SWIR2).divide(pre_nir.add(pre_SWIR2)).rename('preNBR ');
var post_nir = post_cm_mos.select('B5');
var post_SWIR2 = post_cm_mos.select('B7');
var postNBR = post_nir.subtract(post_SWIR2).divide(post_nir.add(post_SWIR2)).rename('postNBR ');
Map.addLayer(preNBR, {min: -1, max: 1, palette: ['red', 'white']}, 'Prefire Normalized Burn Ratio');
Map.addLayer(postNBR, {min: -1, max: 1, palette: ['red', 'white']}, 'Postfire Normalized Burn Ratio');
//dNBR (preNBR-postNBR)
var dNBR_unscaled = preNBR.subtract(postNBR);
var dNBR = dNBR_unscaled.multiply(1000);
Map.addLayer(dNBR, {min: -2000, max: 2000, palette: ['green', 'white', 'red']}, 'dNBR');
//Membuat Interval
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' + // NA (terlalu tinggi)
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' + // Penghijauan tinggi
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' + // Penghijauan cukup
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' + // Tidak terbakar
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' + // Kebakaran sangat rendah
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' + // Kebakaran cukup rendah
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' + // Kebakaran cukup tinggi
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' + // Kebakaran sangat tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';
Map.addLayer(dNBR.sldStyle(intervals), {}, 'dNBR classified');
//Legenda Judul
var legend = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'dNBR The Gospers Mountain Fire (2019) on Wollemi National Park',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
//Legenda dNBR
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'Kelas dNBR',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
//Mengisi Legenda dNBR
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
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
var names = ['Penghijauan tinggi','Penghijauan cukup','Tidak terbakar', 'Kebakaran sangat rendah',
'Kebakaran cukup rendah', 'Kebakaran cukup tinggi', 'Kebakaran sangat tinggi', 'NA'];
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }