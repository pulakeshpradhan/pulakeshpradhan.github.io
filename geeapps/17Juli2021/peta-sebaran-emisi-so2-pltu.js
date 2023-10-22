var PLTUIndramayuPoint = ui.import && ui.import("PLTUIndramayuPoint", "table", {
      "id": "users/17Juli2021/IndramayuPoint"
    }) || ee.FeatureCollection("users/17Juli2021/IndramayuPoint"),
    PLTUIndramayu = ui.import && ui.import("PLTUIndramayu", "table", {
      "id": "users/17Juli2021/Indramayu"
    }) || ee.FeatureCollection("users/17Juli2021/Indramayu"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//WayangWindu
var PLTUIndramayu = ee.FeatureCollection("users/17Juli2021/Indramayu");
Map.addLayer(PLTUIndramayu,{color:"Blue" })
Map.centerObject(PLTUIndramayu, 10);
var PLTUIndramayuPoint = ee.FeatureCollection("users/17Juli2021/IndramayuPoint");
Map.addLayer(PLTUIndramayuPoint,{color:"Blue" })
Map.centerObject(PLTUIndramayuPoint, 10);
//Menamanggil Citra yang Dipilih
var s5p = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2020-01-01', '2020-12-01');
//Visualisasi Data
var band_viz = {
  min: 0.0,
  max: 0.0005,
  palette: ['blue','purple','cyan','green','yellow', 'red']
};
//Zoom ke Lokasi Kajian
Map.setCenter(107.97050759635485,-6.274722929869918, 10)
//Menambahkan data ke Peta Utama
Map.addLayer(PLTUIndramayu, {}, 'Area PLTU Indramayu');
Map.addLayer(s5p.mean().clip(PLTUIndramayu), band_viz, 'Emisi SO2 Area PLTU Indramayu Sumuradem');
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
var header = ui.Label('Peta Sebaran Emisi SO2 Area Pembangkit Listrik Tenaga Uap (PLTU) Sumuradem Indramayu', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Peta Emisi SO2 Area Pembangkit Listrik Tenaga Uap (PLTU) Sumuradem Indramayu yang ditangkap oleh Sentinel-5P',{fontSize: '15px'});
var text_2 = ui.Label(
'Pembangkit Listrik Tenaga Uap berbahan bakar batubara menghasilkan emisi dari hasil pembakaran batubaranya, salah satunya adalah SOx',
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
//chart time series 
var so2 = ui.Chart.image.series(s5p,PLTUIndramayuPoint,
ee.Reducer.mean(),1000,'system:time_start').setOptions({
  title:'Gas Emisi SO2',
  vAxis:{title: 'mol/m2'},
});
print (so2)
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
 regions: PLTUIndramayu,
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