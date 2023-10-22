var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/rafiisephana/Target1_Fix"
    }) || ee.FeatureCollection("users/rafiisephana/Target1_Fix");
// Ambil data S5
var y2019 =
ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2").filterDate("2021-06-01","2021-06-25");
var y2020 =
ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2").filterDate("2021-07-01","2021-07-25");
// Ambil data negara
var countries =
ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017").filter(ee.Filter.eq("country_co", "ID"))
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2021-06-01', '2021-07-25')
  .filterBounds(geometry);
// make a feature collection with the data set as properties
var feats = collection.map(function(image){
  var reducers = ee.Reducer.mean().combine(ee.Reducer.max(), '', true).combine(ee.Reducer.min(),'', true);
  var stats = image.reduceRegion(reducers, geometry, 1000);
  return ee.Feature(null, stats).set('system:time_start', image.get('system:time_start'));
});
// plot that feature collectioin
var chart = ui.Chart.feature.byFeature(feats, 'system:time_start')
                .setSeriesNames(['NO2 max', 'NO2 mean', 'NO2 min']); // order is by default alfabetically
Map.add(chart, feats);
// var mean=ui.Chart.image.series(collection, geometry, ee.Reducer.mean(), 30).setOptions({title: 'NO2 mean'});
// var max=ui.Chart.image.series(collection, geometry, ee.Reducer.max(), 30).setOptions({title: 'NO2 max'});;
// var min=ui.Chart.image.series(collection, geometry, ee.Reducer.min(), 30).setOptions({title: 'NO2 min'});;
// print(mean, max, min);
// Tampilkan peta
Map.addLayer(y2019.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"Jun 2021");
Map.addLayer(y2020.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"Jul 2021");
Map.centerObject(countries,6);
//AÃ±adimos el mapa de contaminacion del momento posterior y los mapas base que deseamos visualizar
var Comparador = ui.Map();
Comparador.addLayer (y2019.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"Jun 2021");
Comparador.addLayer (y2020.max().select("NO2_column_number_density").clip(countries),{min:0.00002,max:0.0005,palette:"lightblue,orange,yellow,red,purple"},"Jul 2021");
var SWIPE = ui.Map.Linker([ui.root.widgets().get(0), Comparador]);
var SWIPE2 = ui.SplitPanel({
  firstPanel: SWIPE.get(0),
  secondPanel: SWIPE.get(1),
  orientation: 'horizontal', 
  wipe: true,
  style: {stretch: 'both'}});
ui.root.widgets().reset([SWIPE2]);
// Tetapkan ukuran dan letak legenda
var legend = ui.Panel({
 style: {
position: 'bottom-left',
padding: '8px 15px'
 }
});
// Membuat judul
var legendTitle = ui.Label({
 value: 'Kadar NO2',
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
var palette =['C0C0C0','FFA500','FFFF00','FF0000'];
// Menamai legenda
var names = ['Rendah','Sedang','Tinggi','Sangat Tinggi'];
// Menambahkan warna dan nama
for (var i = 0; i < 4; i++) {
 legend.add(makeRow(palette[i], names[i]));
 } 
 // add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
Map.setCenter(107.63,-6.94, 6);