// Menambah label judul platform
Map.add(ui.Label(
    'Lokasi Potensi Astrowisata di Pulau Sulawesi', {fontWeight: 'bold', fontSize: '20px'}));
//legenda
// ukuran dan letak legenda
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
//  judul
var legendTitle = ui.Label({
  value: 'Legenda',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
//  judul ke panel
legend.add(legendTitle);
//  style
var makeRow = function(color, name) {
//  box
var colorBox = ui.Label({
style: {
backgroundColor: '#' + color,
padding: '8px',
margin: '0 0 4px 0'}
});
var description = ui.Label({
value: name,
style: {margin: '0 0 4px 6px'}
});
return ui.Panel({
widgets: [colorBox, description],
layout: ui.Panel.Layout.Flow('horizontal')});
};
var palette =['0000ff', '800080'];
var names = ['Lokasi Potensial Skenario 1','Lokasi Potensial Skenario 2'];
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
var vis1 = {min: 0.309834, max: 0.632107, palette: 'green,yellow,red'};
var vis2 = {min: 0.273992, max: 0.620675, palette: 'green,yellow,red'};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var legendTitle1 = ui.Label({
  value: 'Skenario 1',
  style: {fontWeight: 'bold'}
});
legend.add(legendTitle1);
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis1.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legend.add(colorBar);
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis1.min, {margin: '4px 8px'}),
    ui.Label(
        (vis1.max),
        {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
var legendTitle2 = ui.Label({
  value: 'Skenario 2',
  style: {fontWeight: 'bold'}
});
legend.add(legendTitle2);
// Create the color bar for the legend.
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis2.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legend.add(colorBar1);
// Create a panel with three numbers for the legend.
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label(vis2.min, {margin: '4px 8px'}),
    ui.Label(
        (vis2.max),
        {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels1);
Map.add(legend);
var indeks1 = ee.Image("projects/ee-project-cgs-unhas/assets/indeks-skenario-1");
var indeks2 = ee.Image("projects/ee-project-cgs-unhas/assets/indeks-skenario-2");
var lokasi1 = ee.Image("projects/ee-project-cgs-unhas/assets/lokasi-optimal-skenario-1");
var lokasi2 = ee.Image("projects/ee-project-cgs-unhas/assets/lokasi-optimal-skenario-2");
Map.addLayer(indeks1, vis1, 'Indeks Skenario 1')
Map.addLayer(indeks2, vis2, 'Indeks Skenario 2')
Map.addLayer(lokasi1,{palette:'0000ff'}, 'Lokasi Potensi Astrowisata Skenario 1')
Map.addLayer(lokasi2,{palette:'800080'}, 'Lokasi Potensi Astrowisata Skenario 2')
Map.setCenter(121.86,-1.55, 6.5)