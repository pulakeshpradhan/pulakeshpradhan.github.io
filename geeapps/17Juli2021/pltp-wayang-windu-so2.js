var WayangWindu = ui.import && ui.import("WayangWindu", "table", {
      "id": "users/17Juli2021/WayangWinduGeotermal"
    }) || ee.FeatureCollection("users/17Juli2021/WayangWinduGeotermal"),
    WayangWinduPoint = ui.import && ui.import("WayangWinduPoint", "table", {
      "id": "users/17Juli2021/WayangWinduPoint"
    }) || ee.FeatureCollection("users/17Juli2021/WayangWinduPoint"),
    WayangWinduPoint1 = ui.import && ui.import("WayangWinduPoint1", "table", {
      "id": "projects/ichanovianti15/assets/WayangWinduPoint1"
    }) || ee.FeatureCollection("projects/ichanovianti15/assets/WayangWinduPoint1"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.62508356656922,
            -7.199659075074981
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.Point([107.62508356656922, -7.199659075074981]);
//WayangWindu
var WayangWindu = ee.FeatureCollection("users/17Juli2021/WayangWinduGeotermal");
Map.addLayer(WayangWindu,{color:"Blue" })
Map.centerObject(WayangWindu, 10);
var WayangWinduPoint = ee.FeatureCollection("users/17Juli2021/WayangWinduPoint");
Map.addLayer(WayangWinduPoint,{color:"Blue" })
Map.centerObject(WayangWinduPoint, 10);
//Menamanggil Citra yang Dipilih
var s5p = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2020-01-01', '2020-12-01');
//Visualisasi Data
var band_viz = {
  min: 0.0,
  max: 0.0010,
  palette: ['blue','purple','cyan','green','yellow', 'red']
};
//Zoom ke Lokasi Kajian
Map.setCenter(107.62577021207703,-7.196565123746353, 10)
//Menambahkan data ke Peta Utama
Map.addLayer(WayangWindu, {}, 'Area Geotermal Wayang Windu');
Map.addLayer(s5p.mean().clip(WayangWindu), band_viz, 'Emisi SO2 Area Geotermal Wayang Windu');
//Judul Aplikasi
var legendTitle1 = ui.Label({
 value: 'Peta Sebaran Emisi SO2',
 style: {fontWeight: 'bold',
 fontSize: '15px',
 margin: '0 0 4px 0',
 padding: '0'
 }});
Map.add(legendTitle1);
//Memberikan Keterangan
var header = ui.Label('Peta Sebaran Emisi SO2 Area Pembangkit Listrik Tenaga Panas Bumi (PLTP) Wayang Windu', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Peta Emisi SO2 Area Pembangkit Listrik Tenaga Panas Bumi (PLTP) Wayang Windu yang ditangkap oleh Sentinel-5P',{fontSize: '15px'});
var text_2 = ui.Label(
'Pembangkit listrik panas bumi tidak secara langsung mengeluarkan SO2. Setelah H2S dilepaskan, ia menyebar ke udara dan akhirnya berubah menjadi SO2 dan asam sulfat. Ketika membandingkan energi panas bumi dengan batubara, pembangkit panas bumi saat ini sekitar 15 miliar kWh menghindari potensi pelepasan 78.000 ton SO2.',
{fontSize: '12px'});
var text_3 = ui.Label(
'Dibuat Oleh: Icha Novianti (15118041)',
{fontSize: '10px'});
var toolPanel = ui.Panel([header, text_1, text_2, text_3], 'flow', {width: '400px'});
ui.root.widgets().add(toolPanel);
//Membuat legenda
var legendTitle2 = ui.Label({
value: 'Gas Emisi SO2 (mol/m2)',
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
position: 'bottom-left',
padding: '8px 15px',
}
});
var titleTextVis = {
'margin':'0px 0px 15px 0px',
'fontSize': '18px',
'font-weight':"",
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
params: {bbox:'0,0,10,100', dimensions:'10×50'},
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
//========Chart=======//
//Pembuatan Pemanggil data Time Series
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
var layer = drawingTools.layers().get(0);
drawingTools.layers().remove(layer);
}
var dummyGeometry =
ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
var layers = drawingTools.layers();
layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//membuat fungsi agar titik bisa digunakan untuk menandai
function drawPoint() {
clearGeometry();
drawingTools.setShape('point');
drawingTools.draw();
}
var symbol = {
point: '📍',
};
var controlPanel = ui.Panel({
widgets: [
ui.Label('Pilih Titik.'),
ui.Button({
label: symbol.point + ' Point',
onClick: drawPoint,
style: {stretch: 'horizontal'}
}),
],
style: {position: 'bottom-left'},
layout: null,
});
Map.add(controlPanel);
//Pembuatan Data Tampilan Grafik Time Series
var chartPanel = ui.Panel({
style:
{height: '250px', width: '450px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
// //chart time series 
// var so2 = ui.Chart.image.series(s5p,WayangWinduPoint,
// ee.Reducer.mean(),1000,'system:time_start').setOptions({
//   title:'Gas Emisi SO2',
//   vAxis:{title: 'mol/m2'},
// });
// print (so2)
function chartSO2TimeSeries() {
 // Make the chart panel visible the first time a geometry is drawn.
 if (!chartPanel.style().get('shown')) {
 chartPanel.style().set('shown', true);
 }
 // Get the drawn geometry; it will define the reduction region.
 var aoi = drawingTools.layers().get(0).getEeObject();
 // Set the drawing mode back to null; turns drawing off.
 drawingTools.setShape(null);
 // Reduction scale is based on map scale to avoid memory/timeout errors.
 var mapScale = Map.getScale();
 var scale = mapScale > 5000 ? mapScale * 2 : 5000;
 // Chart SO2 time series for the selected area of interest.
 var chart = ui.Chart.image
 .seriesByRegion({
 imageCollection: s5p,
 regions: WayangWindu,
 reducer: ee.Reducer.mean(),
 band: 'SO2_column_number_density',
 scale: scale,
 xProperty: 'system:time_start'
 })
 .setOptions({
 titlePostion: 'none',
 legend: {position: 'none'},
 title: 'Gas Emisi SO2',
 hAxis: {title: 'time'},
 vAxis: {title: 'mol/m2'},
 series: {0: {color: '23cba7'}}
 });
 // Replace the existing chart in the chart panel with the new chart.
 chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartSO2TimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartSO2TimeSeries, 500));