var image = ui.import && ui.import("image", "image", {
      "id": "users/kalinggatitonnurihsan/SOLARPV_JABAR"
    }) || ee.Image("users/kalinggatitonnurihsan/SOLARPV_JABAR"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/kalinggatitonnurihsan/Jabar_Geografis"
    }) || ee.Image("users/kalinggatitonnurihsan/Jabar_Geografis"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/kalinggatitonnurihsan/Jabar_Kesesuaian_AKHIR"
    }) || ee.Image("users/kalinggatitonnurihsan/Jabar_Kesesuaian_AKHIR"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/kalinggatitonnurihsan/Jabar_SosioEKonomi"
    }) || ee.Image("users/kalinggatitonnurihsan/Jabar_SosioEKonomi"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//define daerah
var Indonesia = ee.FeatureCollection("users/cokrosantoso/Indonesia");
var Nama_Provinsi = ['Jawa Barat']
var daerah = Indonesia.filter(ee.Filter.inList('NAME_1',Nama_Provinsi));
//Shortwave Bulanan
var dataset1 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
.filterDate('2000-01-01','2020-01-31')
            .map(function(image){return image})
var Shortwave = dataset1.map(function(image) {
  var Shortwave2 = image.expression(
    'band*0.1', {
      'band': image.select('srad'),
}).rename('Shortwave1');
return image.addBands(Shortwave2);
});
/*-------------------------------------------------------------------------------------------
Proses Pemanggilan Data untuk Aplikasi Monitoring
---------------------------------------------------------------------------------------------*/
// Membuat peta utama aplikasi
var mapPanel = ui.Map();
//Membuat tools Pemanggil data 
var drawingTools = mapPanel.drawingTools();
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
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
     //ui.Label('Pilih Lokasi'),
    ui.Button({
      label: symbol.rectangle +'Segiempat',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon +'Area',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + 'Titik',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
      ],
  style: {position: 'bottom-left'},
  layout: null,
});
//visualisasi Peta
mapPanel.add(controlPanel);
//Pembuatan Panel Samping
var inspectorPanel = ui.Panel({style: {width: '25%'}});
// Create a panel to hold title, intro text, chart and legend components.
// add hyperlink to read full paper
var label_url_viewer = ui.Label({
    value:'Click here to read our full paper',
    style: {fontSize: '13px', fontWeight: 'bold'}
  });
label_url_viewer.setUrl('LINK PAPER JIKA ADA');
var intro = ui.Panel([
  ui.Label({
    value: 'PEMODELAN MULTISKENARIO PELETAKAN PLTS DI JAWA BARAT UNTUK MENDUKUNG ENERGI BERSIH BERKELANJUTAN ',
    style: {fontSize: '22px', fontWeight: 'bold'}
  }),
   ui.Label({
    value: 'Kelompok 1 Mata Kuliah Analisis Informasi Geospasial (GD6101)',
    style: {fontSize: '10px', fontWeight: 'bold'}
  }),
    ui.Label({
    value: 'Deskripsi',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Aplikasi ini dapat digunakan dalam mendapatkan informasi awal untuk pembangunan PLTS di Jawa Barat. Kesesuaian pembangunan PLTS ditinjau dari aspek Geografis, Meteorologis dan Sosio-Ekonomi' +
    ' Tata Cara Penggunaan:'+
'  (1.)	Pilih Lokasi yang diingin (dapat menggunakan toolbox search lokasi untuk langsung ke wilayah yang diinginkan'+
'  (2.)	Tampilan peta dapat disesuaikan berdasarkan aspek yang diinnginkan (aspek sosioekonomi, aspek geografis, aspek meteorologis dan campuran) dengan menekan tombol layer dan dapat disesuaikan transparansi tampilan'+
'  (3.)	Dapat melihat potensi radiasi matahari pada suatu wilayah dengan cara menekan tombol titik/area pada wilayah yang diinginkan'+
'  Dalam membaca kesesuaian, warna sangat sesuai menandakan wilayah tersebut sangat sesuai untuk dipasang PLTS berdasakan aspek tersebut'
,
    style: {fontSize: '13px'}
  }),
]);
inspectorPanel.add(intro);
//PEMBUATAN CHART NDDI
function chartNDDITimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!inspectorPanel.style().get('shown')) {
    inspectorPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 30 ? mapScale * 2 : 30;
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection: Shortwave,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'Shortwave1',
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    title: 'Radiasi Matahari',
                    hAxis: {title: 'Tanggal'},
                    vAxis: {title: 'Radiasi Matahari (Watt/m2)'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
   inspectorPanel.widgets().set(1, chart);
}
drawingTools.onDraw(ui.util.debounce(chartNDDITimeSeries, 30));
drawingTools.onEdit(ui.util.debounce(chartNDDITimeSeries, 30));
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
mapPanel.centerObject(image,8);
//layout kesesuaian
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';          
  var imageclip= image.clip(daerah);
  var imageclip2= image2.clip(daerah);
  var imageclip3= image3.clip(daerah);
  var imageclip4= image4.clip(daerah);
//var kesesuaian_classified = image.sldStyle(intervals1);
mapPanel.addLayer(imageclip.sldStyle(intervals1),{}, 'Kesesuaian PV', false);
mapPanel.addLayer(imageclip4.sldStyle(intervals1), {}, 'Kesesuaian Sosio Ekonomi',false);
mapPanel.addLayer(imageclip2.sldStyle(intervals1), {}, 'Kesesuaian Fisik',false);
mapPanel.addLayer(imageclip3.sldStyle(intervals1), {}, 'Kesesuaian ');
//--------Legenda Kesesuaian
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 8px'
  }});
var legendTitle = ui.Label({
  value: 'Kesesuaian',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
    // Judul
  var legendTitle1 = ui.Label({
  value: 'Tingkat Kesesuaian Pembangunan PLTS di Jawa Barat',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
mapPanel.add(legend);
mapPanel.add(legendTitle1);
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
var palette =['ff3900','f6ff04','3aff00','04fddf','1008ff'];
var names = ['Sangat Tinggi','Tinggi','Sedang','Rendah','Sangat Rendah'];
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }