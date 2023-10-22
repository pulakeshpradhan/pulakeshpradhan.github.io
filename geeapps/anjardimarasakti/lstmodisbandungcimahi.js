var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/anjardimarasakti/IDN_adm2"
    }) || ee.FeatureCollection("users/anjardimarasakti/IDN_adm2"),
    MOD11A1 = ui.import && ui.import("MOD11A1", "imageCollection", {
      "id": "MODIS/006/MOD11A1"
    }) || ee.ImageCollection("MODIS/006/MOD11A1");
var countries = Indonesia
var Nama_KotaKabupaten = ['Kota Bandung']
var KotaBandung = countries
.filter(ee.Filter.inList('NAME_2', Nama_KotaKabupaten));
var Nama_KotaKabupaten = ['Cimahi']
var Cimahi = countries
.filter(ee.Filter.inList('NAME_2', Nama_KotaKabupaten));
Map.centerObject(KotaBandung, 12);   
var LST_View = MOD11A1
.filter(ee.Filter.date('2018-01-01', '2019-12-30'))
.select('LST_Day_1km')
.mean();
var imageVisParam = { 
  min: 15216,
  max: 15595,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ]
};
Map.addLayer(LST_View.clip(KotaBandung), imageVisParam,'Land Surface Temperature'); 
Map.addLayer(LST_View.clip(Cimahi), imageVisParam,'Land Surface Temperature'); 
var LST = MOD11A1
.filter(ee.Filter.date('2017-01-01', '2019-12-30'))
.select('LST_Day_1km');
var MOD11A1TimeSeries = ui.Chart.image.seriesByRegion(LST, KotaBandung, ee.Reducer.mean(),'',
30, 'system:time_start', 'label')
.setOptions({
title: 'Suhu Permukaan rata-rata Kota Bandung (siang)',
vAxis: {title: 'Suhu Permukaan * 0.02 (Kelvin)'},
hAxis: {title: 'Waktu', format: 'MM-yy', gridlines: {count: 7}},
series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
});
ui.root.widgets().add(MOD11A1TimeSeries);
var MOD11A1TimeSeries = ui.Chart.image.seriesByRegion(LST, Cimahi, ee.Reducer.mean(),'',
30, 'system:time_start', 'label')
.setOptions({
title: 'Suhu Permukaan rata-rata Kota Bandung (siang)',
vAxis: {title: 'Suhu Permukaan * 0.02 (Kelvin)'},
hAxis: {title: 'Waktu', format: 'MM-yy', gridlines: {count: 7}},
series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
});
ui.root.widgets().add(MOD11A1TimeSeries);
//----------------------------------------------------------------------------------------//
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
//----------------------------------------------------------------------------------------//
var lon = ee.Image
.pixelLonLat()
.select('latitude');
var gradient = lon
.multiply((imageVisParam.max-imageVisParam.min)/100.0)
.add(imageVisParam.min);
var legendImage = gradient
.visualize(imageVisParam);
//----------------------------------------------------------------------------------------//
var panel = ui.Panel({
    widgets: [
      ui.Label(imageVisParam[('max')])
    ],
  });
legend.add(panel);
//----------------------------------------------------------------------------------------//
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
legend.add(thumbnail);
//----------------------------------------------------------------------------------------//
var panel = ui.Panel({
    widgets: [
      ui.Label(imageVisParam['min'])
    ],
  });
legend.add(panel);
Map.add(legend);
//----------------------------------------------------------------------------------------//