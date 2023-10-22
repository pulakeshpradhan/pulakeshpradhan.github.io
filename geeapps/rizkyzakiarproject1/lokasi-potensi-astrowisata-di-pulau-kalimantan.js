var kasus1          =ee.Image('projects/ee-rizkyzakiar-dipocition/assets/astro_case1');
var kasus2          =ee.Image('projects/ee-rizkyzakiar-dipocition/assets/astro_case2');
var potensialkasus1 =ee.Image('projects/ee-rizkyzakiar-dipocition/assets/kasus1lebihdari075');
var potensialkasus2 =ee.Image('projects/ee-rizkyzakiar-dipocition/assets/kasus2lebihdari075');
var vis = ['000181','1974d3','ffcc98'];
var pis = ['140951','244a80','88deb0']
Map.addLayer(kasus1,{min:0,max:0.8,palette:vis},'Indeks Kasus 1');
Map.addLayer(kasus2,{min:0,max:0.8,palette:pis},'Indeks Kasus 2');
Map.addLayer(potensialkasus1,{palette:['red']},'Lokasi Potensial Skenario 1');
Map.addLayer(potensialkasus2,{palette:['purple']},'Lokasi Potensial Skenario 2');
Map.setCenter(113.679, 0.194, 6.5);
// Menambah label judul platform
Map.add(ui.Label(
    'Lokasi Potensi Astrowisata di Pulau Kalimantan', {fontWeight: 'bold', fontSize: '20px'}));
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
var palette =['ff0000', '800080'];
var names = ['Lokasi Potensial Skenario 1','Lokasi Potensial Skenario 2'];
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
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
  params: makeColorBarParams(vis),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legend.add(colorBar);
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label('Tidak Sesuai', {margin: '4px 8px'}),
    ui.Label(
        ('Sesuai'),
        {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
var legendTitle2 = ui.Label({
  value: 'Skenario 2 : Integrasi dengan Indikasi Kebakaran Hutan',
  style: {fontWeight: 'bold'}
});
legend.add(legendTitle2);
// Create the color bar for the legend.
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(pis),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legend.add(colorBar1);
// Create a panel with three numbers for the legend.
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label("Tidak Sesuai", {margin: '4px 8px'}),
    ui.Label(
        ('Sesuai'),
        {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels1);
Map.add(legend);