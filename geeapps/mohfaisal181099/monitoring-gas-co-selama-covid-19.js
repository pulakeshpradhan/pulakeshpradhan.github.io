var table = ui.import && ui.import("table", "table", {
      "id": "users/mohfaisal181099/KP/shp_jawa"
    }) || ee.FeatureCollection("users/mohfaisal181099/KP/shp_jawa"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(),
    data_bmkg = ui.import && ui.import("data_bmkg", "table", {
      "id": "users/mohfaisal181099/Data_BMKG"
    }) || ee.FeatureCollection("users/mohfaisal181099/Data_BMKG");
//Copyright @Moh.Faisal & @Kukuh Adi Prakoso
 var periode1 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-01-01', '2020-01-31')
  .mean()
  .clip(table);
var periode2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-02-01', '2020-02-29')
  .mean()
  .clip(table);
var periode3 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-03-01', '2020-03-31')
  .mean()
  .clip(table);
var periode4 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(table);
var periode5 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-05-01', '2020-05-31')
  .mean()
  .clip(table);
var periode6 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-06-01', '2020-06-30')
  .mean()
  .clip(table);
var periode7 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-07-01', '2020-07-31')
  .mean()
  .clip(table);
var periode8= ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-08-01', '2020-08-31')
  .mean()
  .clip(table);
var periode9= ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-09-01', '2020-09-30')
  .mean()
  .clip(table);
var periode10 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-10-01', '2020-10-31')
  .mean()
  .clip(table);
var periode11 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-11-01', '2020-11-30')
  .mean()
  .clip(table);
var periode12 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2020-12-01', '2020-12-31')
  .mean()
  .clip(table);
 var periode13 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-01-01', '2021-01-31')
  .mean()
  .clip(table);
var periode14 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-02-01', '2021-02-28')
  .mean()
  .clip(table);
var periode15 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-03-01', '2021-03-31')
  .mean()
  .clip(table);
var periode16 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(table);
var periode17 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-05-01', '2021-05-31')
  .mean()
  .clip(table);
var periode18 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-06-01', '2021-06-30')
  .mean()
  .clip(table);
  var periode19 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select('CO_column_number_density')
  .filterDate('2021-07-01', '2021-07-31')
  .mean()
  .clip(table);
var stacked_composite = periode1.addBands(periode2).addBands(periode3)
.addBands(periode4).addBands(periode5).addBands(periode6).addBands(periode7).addBands(periode8).addBands(periode9)
.addBands(periode10).addBands(periode11).addBands(periode12).addBands(periode13).addBands(periode14).addBands(periode15).addBands(periode16).addBands(periode17)
.addBands(periode18).addBands(periode19);
print('CO', stacked_composite.bandNames());
//Uji Korelasi Pearson
// Make a band correlation chart.
//print(ui.Chart.image.series({
//  imageCollection: stacked_composite.select(['CO_column_number_density']),
 // region: table,
 // reducer: ee.Reducer.pearsonsCorrelation(),
 // scale: 30}));
// script parameter grafik
var options = {
 title: 'Graph of CO Concentration Every Month',
 hAxis: {title: 'Timeline (Month)'},
 vAxis: {title: 'CO concentration (mol/m^2)'},
 lineWidth: 1,
 pointSize: 4,
 };
var waktu = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
// Script memunculkan grafik
var chart = ui.Chart.image.regions(
  stacked_composite,table, ee.Reducer.mean(), 30, 'PROVINSI', waktu)
   .setChartType('ScatterChart')
   .setOptions(options);
// Display grafik.
//print(chart);
//Bar chart
var chart2 =
    ui.Chart.image
        .byRegion({
          image: stacked_composite,
          regions: table,
          reducer: ee.Reducer.mean(),
          scale: 500,
          xProperty: 'PROVINSI'
        })
        .setSeriesNames([
          'Jan20', 'Feb20', 'Nov20', 'Dec20', 'Jan21', 'Feb21', 
          'Mar21','Apr21', 'Mei21', 'Jun21','Jul21', 'Mar20', 
          'Apr20', 'Mei20', 'Jun20', 'Jul20', 'Agt20', 'Sept20', 
          'Okt20'
        ])
        .setChartType('BarChart')
        .setOptions({
          title: 'Konsentrasi CO (mol/m^2)',
          hAxis: {
            title: 'Timeline (Periode dalam Bulan)',
            titleTextStyle: {italic: false, bold: true}
          },
          vAxis:
              {title: 'Konsentrasi CO (mol/m^2)', titleTextStyle: {italic: false, bold: true}},
          colors: [
            '604791', '1d6b99', '39a8a7', '0f8755', '76b349', 'f0af07',
            'e37d05', 'cf513e', '96356f', '724173', '9c4f97', '696969',
            '808000', 'FF0000', 'FF00FF', 'FFFF00', '000000', '964B00',
            '0000FF'
          ]
        });
//print(chart2);
var band_viz = {
  min: 0,
  max: 0.05,
  palette: ['008000', 'FFFF00','FF0000','8B0000']
}; 
// Membuat panel grafik
var panel = ui.Panel({style:{
                      width: '400px', 
                      height:'200px', 
                      position: 'bottom-right', 
                      padding: '15px 15px'},
                      layout: ui.Panel.Layout.flow('horizontal')})
      //.add(ui.Label('Grafik Karbon Monoksida CO Bulanan:'))
      .add(chart).add(chart2);
// Menampilkan panel grafik
Map.add(panel);
//memunculkan visualisasi citra
Map.addLayer(periode1, band_viz, 'CO Januari 2020',false);
Map.addLayer(periode2, band_viz, 'CO Februari 2020',false);
Map.addLayer(periode3, band_viz, 'CO Maret 2020',false);
Map.addLayer(periode4, band_viz, 'CO April 2020',false);
Map.addLayer(periode5, band_viz, 'CO Mei 2020',false);
Map.addLayer(periode6, band_viz, 'CO Juni 2020',false);
Map.addLayer(periode7, band_viz, 'CO Juli 2020',false);
Map.addLayer(periode8, band_viz, 'CO Agustus 2020',false);
Map.addLayer(periode9, band_viz, 'CO September 2020',false);
Map.addLayer(periode10, band_viz, 'CO Oktober 2020',false);
Map.addLayer(periode11, band_viz, 'CO November 2020',false);
Map.addLayer(periode12, band_viz, 'CO Desember 2020',false);
Map.addLayer(periode13, band_viz, 'CO Januari 2021',false);
Map.addLayer(periode14, band_viz, 'CO Februari 2021',false);
Map.addLayer(periode15, band_viz, 'CO Maret 2021',false);
Map.addLayer(periode16, band_viz, 'CO April 2021',false);
Map.addLayer(periode17, band_viz, 'CO Mei 2021',false);
Map.addLayer(periode18, band_viz, 'CO Juni 2021',false);
Map.addLayer(periode19, band_viz, 'CO Juli 2021',false);
Map.setCenter(110.10051853263381,-7.384531851672154,7);
//Google Earth Engine: Upload Shapefile and Show Its Label
var text = require('users/gena/packages:text');
var shp = ee.FeatureCollection(table);
//Map.addLayer(shp,{}, 'My Polygon');
var scale = Map.getScale()*1;
var labels = shp.map(function(feat) {
  feat = ee.Feature(feat);
  var name = ee.String(feat.get("PROVINSI"));
  var centroid = feat.geometry().centroid();
  var t = text.draw(name, centroid, scale, {
    fontSize:10, 
    textColor:'black',
    outlineWidth: 0.5,
    outlineColor: 'black'
  });
  return t;
});
var labels_final = ee.ImageCollection(labels);
Map.addLayer(labels_final, {}, 'Provinsi');
//Styling Shapefile in Google Earth Engine
var styling = {color: 'blue' , fillColor:'ffffff00'};
Map.addLayer(table.style(styling), {}, 'Batas Administrasi Provinsi');
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Keterangan',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
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
        style: {
          fontSize: '10px',
          margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['8B0000', 'FF0000','FFF000','008000'];
// name of the legend
var names = ['Sangat Tidak Sehat', 'Tidak Sehat', 'Kurang Sehat', 'Sehat'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
var chirps = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
// Calculate CO2 Emission in 2020
var P = chirps.select("stacked_composite").filterDate('2020-01-01', '2021-07-31').sum()
// create vizualization parameters
var viz = {min:0, max:4.64, palette:['008000', 'FFFF00','FF0000','8B0000']};
// add the map
//Map.addLayer(P, viz);
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '5px 12px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'CO Emission (mol/m^2)',
style: {
fontWeight: 'bold',
fontSize: '11px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x150'},
style: {padding: '1px', position: 'bottom-right'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend);
//Memberikan Keterangan
var header=ui.Label('Peta Sebaran Konsenstrasi Karbon Monoksida (CO) Selama Masa Pandemi COVID-19 Pada Pulau Jawa',
{fontWeight: 'bold', fontSize:'25px', color: 'blue',textAlign: 'center'});
var text_1 = ui.Label('Peta Sebaran Konsentrasi Karbon Monoksida (CO),diperoleh dari Citra Satelit Sentinel-5P secara Time Series Pada Bulan Januari 2020 sampai Juli 2021.',
{fontSize:'15px', textAlign: 'justify'});
var text_2 = ui.Label('Klik "LAYERS" kemudian "CENTANG" untuk memilih citra yang akan ditampilkan',
{fontSize:'17px', color: 'red'});
var text_3 = ui.Label('Dibuat Oleh: Moh.Faisal-03311840000004|Kukuh Adi Prakoso-03311840000078 (Teknik Geomatika ITS),Institut Teknologi Sepuluh Nopember Surabaya Angkatan 2018',
{fontSize:'10px'});
var toolPanel = ui.Panel ([header,text_1,text_2,text_3],
'flow',{width:'300px'});
ui.root.widgets().add(toolPanel);
//Export.image.toDrive({image:periode3 ,description: 'CO Maret 20', region: table});
//Export.image.toDrive({image:periode4, description: 'CO April 20', region: table});
//Export.image.toDrive({image:periode18, description:'CO Juni 21', region: table});
//Export.image.toDrive({image:periode19, description: 'CO Juli 21', region: table});