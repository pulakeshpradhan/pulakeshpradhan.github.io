var sidePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    height: '100%',
    width: '10%',
  },
});
var title = ui.Label({
  value: 'Judul Percobaan',
  style: {'fontSize': '24px'}
});
sidePanel.add(title);
var loadComposite = function() {
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-01-01', '2021-12-31') //Line mengganti waktu citra satelit
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',5)) //Line pengganti prosentasi area tertutup awan
                  .map(maskS2clouds)
                  .median() //metode yang digunakan dalam mozaik, menggunakan nilai median antar pixel
                  //bisa nilai mean, min, max
var visualization = {
  min: 0.0,
  max: 1.0,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset, visualization, 'RGB');
};
var button = ui.Button("Generate Landsat 8");
button.onClick(loadComposite);
sidePanel.add(button);
//var map = ui.Map();
//Mengkombinasikan panel panel yang sudah diset sebelumnya
//var splitPanel = ui.SplitPanel({
 // firstPanel: sidePanel,
 // secondPanel: map,
//});
//Menghapus yang ada di tampilan hasil kemudian menambahkan variabel terbaru
//ui.root.clear();
ui.root.add(sidePanel);