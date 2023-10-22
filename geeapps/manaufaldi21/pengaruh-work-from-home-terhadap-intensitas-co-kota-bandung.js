var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_O3"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_O3"),
    Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/manaufaldi21/IDN_adm2"
    }) || ee.FeatureCollection("users/manaufaldi21/IDN_adm2"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "CO_column_number_density"
        ],
        "min": 0.028214347031981987,
        "max": 0.031002891202481096,
        "palette": [
          "000000",
          "0000ff",
          "800080",
          "00ffff",
          "008000",
          "ffff00",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["CO_column_number_density"],"min":0.028214347031981987,"max":0.031002891202481096,"palette":["000000","0000ff","800080","00ffff","008000","ffff00","ff0000"]};
var countries = Indonesia ;
var Nama_KotaKabupaten = ['Kota Bandung'];
var KotaKabupaten = countries.filter(ee.Filter.inList('NAME_2', Nama_KotaKabupaten));
Map.centerObject(KotaKabupaten, 11);
Map.addLayer(KotaKabupaten,{color:"red" },"Kota Bandung");
var band_viz = {
  min: 0.02,
  max: 0.04,
  palette: ['black', 'blue', 'green', 'yellow', 'orange', 'red']
};
//Dataset Sebelum Work from Home
var minggu1sebelum = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-03-09', '2020-03-15');
var minggu2sebelum = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-03-02', '2020-03-08');
var minggu3sebelum = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-02-24', '2020-03-01');
var minggu4sebelum = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-02-17', '2020-02-23');
Map.addLayer(minggu4sebelum.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-4 sebelum WFH');
Map.addLayer(minggu3sebelum.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-3 sebelum WFH');
Map.addLayer(minggu2sebelum.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-2 sebelum WFH');
Map.addLayer(minggu1sebelum.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-1 sebelum WFH');
//Dataset Setelah Work from Home
var minggu4WFH = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-04-06', '2020-04-12');
var minggu3WFH = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-03-30', '2020-04-05');
var minggu2WFH = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-03-23', '2020-03-29');
var minggu1WFH = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-03-16', '2020-03-22');
Map.addLayer(minggu1WFH.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-1 WFH');
Map.addLayer(minggu2WFH.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-2 WFH');
Map.addLayer(minggu3WFH.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-3 WFH');
Map.addLayer(minggu4WFH.mean().clip(KotaKabupaten), band_viz, 'CO minggu ke-4 WFH');
//Create a Time Series Chart
var precovid = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .filterDate('2020-02-17' , '2020-03-15')
  .select('CO_column_number_density');
var duringcovid = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .filterDate('2020-03-16' , '2020-04-12')
  .select('CO_column_number_density');
var pre_TimeSeries = ui.Chart.image.seriesByRegion(precovid, KotaKabupaten, ee.Reducer.mean(),
'CO_column_number_density',30, 'system:time_start', 'label')
.setOptions({
  title: 'Intensitas Rata-rata CO Kota Bandung Sebelum WFH',
  vAxis: {title: 'Intensitas CO (mol/m^2)'},
  hAxis: {title: 'Waktu', format: 'dd-MM-yy', gridlines: {count: 5}},
  series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 7,
      },
    },
});
ui.root.widgets().add(pre_TimeSeries);
var during_TimeSeries = ui.Chart.image.seriesByRegion(duringcovid, KotaKabupaten, ee.Reducer.mean(),
'CO_column_number_density',30, 'system:time_start', 'label')
.setOptions({
  title: 'Intensitas Rata-rata CO Kota Bandung Setelah WFH',
  vAxis: {title: 'Intensitas CO (mol/m^2)'},
  hAxis: {title: 'Waktu', format: 'dd-MM-yy', gridlines: {count: 5}},
  series: {
      0: {
        color: 'red',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 7,
      },
    },
});
ui.root.widgets().add(during_TimeSeries);
//Create Gradient Legend================================
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '4px 10px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'CO (mol/m^2)',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((band_viz.max-band_viz.min)/100.0).add(band_viz.min);
var legendImage = gradient.visualize(band_viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(band_viz['max'])
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(band_viz['min'])
],
});
legend.add(panel);
Map.add(legend);