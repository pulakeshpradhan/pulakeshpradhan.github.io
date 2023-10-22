var table = ui.import && ui.import("table", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// Load Country Boundary
var boundaries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var idn = boundaries.filter(ee.Filter.eq('country_na', 'Indonesia'));
Map.addLayer(idn);
// Default Visualization of Hansen forest change data
var gfc = ee.Image("UMD/hansen/global_forest_change_2020_v1_8");
var treeCover = gfc.select(['treecover2000']);
var lossImage = gfc.select(['loss']);
var gainImage = gfc.select(['gain']);
// Add the tree cover layer in green
var forestcover = treeCover.updateMask(treeCover);
var idn_forestcover = forestcover.clip(idn);
Map.addLayer(idn_forestcover, {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover');
// Add the loss layer in red
var loss = lossImage.updateMask(lossImage);
var idn_loss = loss.clip(idn);
Map.addLayer(idn_loss, {palette: ['FF0000']}, 'Forest Loss');
// Add the gain layer in blue
var gain = gainImage.updateMask(gainImage);
var idn_gain = gain.clip(idn);
Map.addLayer(idn_gain, {palette: ['0000FF']}, 'Forest Gain');
// Tetapkan ukuran dan letak legenda
var legend = ui.Panel({
 style: {
position: 'bottom-left',
padding: '8px 15px'
 }
});
// Membuat judul
var legendTitle = ui.Label({
 value: 'Keterangan',
 style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Menampilkan judul ke panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// Memberi warna
var palette =['00FF00','FF0000','0000FF','FFFFFF'];
// Menamai legenda
var names = ['Area Hutan','Area Kehilangan Hutan','Area Bertambahnya Hutan'];
// Menambahkan warna dan nama
for (var i = 0; i < 4; i++) {
 legend.add(makeRow(palette[i], names[i]));
 } 
 // add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
Map.setCenter(107.63,-6.94, 6);