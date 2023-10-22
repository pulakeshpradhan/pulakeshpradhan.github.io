var table = ui.import && ui.import("table", "table", {
      "id": "users/alkindigifty/AdmSDA_Geo"
    }) || ee.FeatureCollection("users/alkindigifty/AdmSDA_Geo");
// Import SHP Kabupaten Sidoarjo
var geometry = table;
// Import the Sentinel 2 collection 
var S2 = ee.ImageCollection('COPERNICUS/S2')
// Filter the image collection using filterBounds() and filterDate() method.
// Sort the collection by cloud cover metadata
var image_kemarau = S2
                  .filterBounds(geometry)
                  .filterDate('2019-07-01', '2019-12-31')
                  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                  .mosaic()
                  .clip(geometry);
var image_hujan = S2
                  .filterBounds(geometry)
                  .filterDate('2020-01-01', '2020-06-30')
                  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
                  .map(function(image) {
                    return image.addBands(image.metadata('system:time_start'));
                  })
                  .mosaic()
                  .clip(geometry);
// Menentukan Palette 
var visParams_ndwi = {min:-1, max:1, palette: ['yellow', 'green', 'cyan', 'blue']};
var visParams_water = {min:0.3, max:1, palette: ['darkblue']}
// Menghitung NDWI
var ndwi_kemarau = image_kemarau.normalizedDifference(['B3', 'B8']);
var ndwi_hujan = image_hujan.normalizedDifference(['B3', 'B8']);
// Masking NDWI tanpa non-air
var air_kemarau = ndwi_kemarau.updateMask(ndwi_kemarau.gte(0.3))
var air_hujan = ndwi_hujan.updateMask(ndwi_hujan.gte(0.3))
// Menampilkan NDWI
var image_ndwi_kemarau = ndwi_kemarau.visualize(visParams_ndwi)
var image_ndwi_hujan = ndwi_hujan.visualize(visParams_ndwi)
Map.addLayer(image_ndwi_kemarau, {}, 'NDWI Juli-Desember 2019 ');
Map.addLayer(image_ndwi_hujan, {}, 'NDWI Januari-Juni 2020 ');
// Menampilkan NDWI tanpa non-air atau hasil threshold
var image_genangan_kemarau = air_kemarau.visualize(visParams_water)
var image_genangan_hujan = air_hujan.visualize(visParams_water)
Map.addLayer(image_genangan_kemarau, {}, 'Genangan Juli-Desember 2019');
Map.addLayer(image_genangan_hujan, {}, 'Genangan Januari-Juni 2020');
//======================= Widget =======================//
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img1 = ui.Map.Layer(image_genangan_kemarau); //ini diganti sesuai nama var yang mau ditampilin
var Img2 = ui.Map.Layer(image_genangan_hujan); ////ini diganti sesuai nama var yang mau ditampilin
var Img3 = ui.Map.Layer(image_ndwi_kemarau); ////ini diganti sesuai nama var yang mau ditampilin
var Img4 = ui.Map.Layer(image_ndwi_hujan); ////ini diganti sesuai nama var yang mau ditampilin
// Add default layers to maps.
leftMap.add(Img1);
rightMap.add(Img2);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers = ['Genangan Juli-Desember 2019', 'Genangan Januari-Juni 2020', 'NDWI Juli-Desember 2019', 'NDWI Januari-Juni 2020']; //diganti jika ingin memberi nama layer
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img1;
  if(selection == 'Genangan Januari-Juni 2020') {
    layer = Img2;
  } else if(selection == 'NDWI Juli-Desember 2019') {
    layer = Img3;
  } else if(selection == 'NDWI Januari-Juni 2020') {
    layer = Img4;
}
  return layer;
}
// Make a callback function for when a selection is made for left map.
function selectLeftOnChange(selection) {
  leftMap.layers().set(0, getLayer(selection));
}
// Make a callback function for when a selection is made for right map.
function selectRightOnChange(selection) {
  rightMap.layers().set(0, getLayer(selection));
}
// Define selection buttons for left and right map layers.
var selectLeft = ui.Select(layers, 'Genangan Juli-Desember 2019', 'Genangan Juli-Desember 2019', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'Genangan Januari-Juni 2020', 'Genangan Januari-Juni 2020', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(geometry, 11); //diganti sesuai nama geometry nya
//============= Membuat Legenda 1 ==============//
// Mengatur posisi panel
var legend = ui.Panel({
  style: {
    position: 'middle-right',
    padding: '8px 15px'
  }});
// Membentuk judul legenda
var legendTitle = ui.Label({
  value: 'LEGENDA',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Menambahkan judul di panel
legend.add(legendTitle);
// Menentukan dan mengatur style untuk 1 baris legenda
var makeRow = function(color, name) {
      // Membuat label dengan kotak berwarna
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Mengatur tinggi dan lebar kotak
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Membuat label dengan isi teks deskripsi
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // kembali mengatur panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Membuat pallete dengan warna-warna berbeda
var palette =['00008b'];
 //'darkblue','00008b'
// Keterangan dari legenda
var names = ['Genangan Air'];
// Menambahkan warna dan nama
for (var i = 0; i < 1; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
rightMap.add(legend);
// ===============Membuat Keterangan============== //
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
//Panel Keterangan
var panel3 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '200px',position: 'bottom-right'}
});
// Judul Keterangan 
var judul = ui.Label('Keterangan');
judul.style().set('color', 'Blue');
judul.style().set('fontWeight', 'bold');
judul.style().set({
  fontSize: '13px',
  padding: '0px 0px',
});
// Deskripsi 1
var mapDesc = ui.Label('Genangan air adalah hasil\nthreshold NDWI\nNilai threshold = 0,3 (McFeeters, 2013)',{whiteSpace: 'pre'});
 mapDesc.style().set({
  textAlign: 'left',
  fontSize: '10px',
  padding: '0px 0px',
});
// Deskripsi 2
var mapDesc2 = ui.Label('Oleh: Alkindi Gifty R.', {whiteSpace: 'pre'});
mapDesc2.style().set({
  textAlign: 'center',
  fontSize: '11px',
  padding: '0px 0px',
});
rightMap.add(panel3)
panel3.add(judul)
panel3.add(mapDesc)
panel3.add(mapDesc2)
// ===============Membuat LEGENDA 2============== //
// Membuat Judul Legenda
var legendTitle = ui.Label({
value: 'Nilai NDWI',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Menambahkan Judul pada Panel
legend.add(legendTitle);
// Membuat Gambar Gradasi untuk nilai min-max NDWI
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visParams_ndwi.max-visParams_ndwi.min)/100.0).add(visParams_ndwi.min);
var legendImage = gradient.visualize(visParams_ndwi);
// Membuat Teks pada Legenda Bagian Atas
var panel = ui.Panel({
widgets: [
ui.Label(visParams_ndwi['max'])
],
});
legend.add(panel);
// Membuat Thumbnail dari image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// Menambahkan Thumbnail pada Legenda
legend.add(thumbnail);
// Membuat Teks pada Legenda
var panel = ui.Panel({
widgets: [
ui.Label(visParams_ndwi['min'])
],
});
legend.add(panel);
leftMap.add(legend);
// Export Raster Data
Export.image.toDrive({
  image: image_ndwi_kemarau,
  description: "ndwi kemarau",
  scale:10,
  region: geometry
});
Export.image.toDrive({
  image: image_ndwi_hujan,
  description: "ndwi hujan",
  scale:10,
  region: geometry
});