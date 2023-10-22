var PU_PS = ui.import && ui.import("PU_PS", "table", {
      "id": "users/syefiarahania/PETOJO_UTARA_PETOJO_SELATAN"
    }) || ee.FeatureCollection("users/syefiarahania/PETOJO_UTARA_PETOJO_SELATAN");
//Menampilkan asset
var lokasi = ee.FeatureCollection('users/syefiarahania/PETOJO_UTARA_PETOJO_SELATAN');
lokasi = lokasi.geometry();
Map.centerObject(lokasi, 15);
Map.addLayer(lokasi, {color: 'red'}, 'Kelurahan Petojo Utara dan Petojo Selatan');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '700px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Kelurahan Petojo Utara dan Petojo Selatan',
    style: {fontSize: '25px', fontWeight: 'bold'}
  }),
  ui.Label('Syefiara Hania Yumnaristya'),
  ui.Label('TP.160'),
]);
panel.add(intro);
ui.root.insert(0, panel);