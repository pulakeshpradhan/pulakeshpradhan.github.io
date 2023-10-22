var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/mgibranfadilla/IDN_adm2"
    }) || ee.FeatureCollection("users/mgibranfadilla/IDN_adm2");
//1. Menentukan area penelitian
var countries = Indonesia //Import SHP DIVA GIS
var Nama_Kota = ['Banda Aceh'] //Liha//Mendefinisikan nama kota Banda Aceh
var geometry = countries.filter(ee.Filter.inList('NAME_2', Nama_Kota));//Mendefinisikan geometri
var area = ee.FeatureCollection(geometry);//Mendefinisikan area yang akan di clip
Map.addLayer(geometry,{color:"Blue" },"Kota");//menambahkan layer baru bernama Kota dengan warna biru
Map.centerObject(area, 12);//zoom ke area yang telah ditentukan dengan tingkat zoom 8
//2.1 Membuat fungsi NDVI untuk dihitung belakangan
var addNDVI = function(image) {
	return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI'));
};
//2.2 Membuat fungsi batas tutupan awan. Membuat limit awan 30%
var cloudMask = function(image) {
	var clouds = ee.Algorithms.Landsat.simpleCloudScore(image).select(['cloud']);
	return image.updateMask(clouds.lte(30));
};
//2.3 Memilih satelit dan batas waktu pengambilan gambar
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
	.filterBounds(area)
	.filterDate('2013-04-01', '2018-12-31')
	.map(addNDVI)
	.map(cloudMask);
print(l8);
//2.4 Memilih kanal yang diperlukan untuk penelitian (B10 dan NDVI)
var l8_2 = l8.select(['B10', 'NDVI']);
var l8_2_NDVI = l8.select(['NDVI']);
//2.5 Membuat fungsi merubah nilai B10 menjadi suhu dalam Celsius
var toCelsius2_l8 = function(image){
	var time = image.get('system:time_start');
	var celsius = image.expression('(B10/(1+(10.8*B10/14388)*log((0.004*((ndvi-0.2)/0.3)+0.986))))-273.15',
	             {'ndvi': image.select('NDVI'), 'B10': image.select('B10')})
	             .rename("celsius")
	             .set('system:time_start',time);
	return celsius;
};
//2.6 Membuat database baru l8_2_2
var l8_2_2 = l8_2.map(toCelsius2_l8);
//3.1 Membuat tabel time-series suhu rata-rata area penelitian
var l8_2_2_time_median_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.median(), 
		scale: 100 //bisa dibuat resolusi 30
	}).filter(ee.Filter.neq('median', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
 //3.1 Mengekspor table ke Google Drive 
 	Export.table.toDrive({
 	collection: l8_2_2_time_median_region.select(['.*'],null,false), 
 	description: 'l8_2_2_time_median_region',
 	folder:"/gee-analyses",
 	fileFormat: 'CSV'
 });
 //mean region
 var l8_2_2_time_mean_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.mean(), 
		scale: 100 //bisa dibuat resolusi 30
	}).filter(ee.Filter.neq('mean', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
// Mengekspor table ke Google Drive 
 	Export.table.toDrive({
 	collection: l8_2_2_time_mean_region.select(['.*'],null,false), 
 	description: 'l8_2_2_time_mean_region',
 	folder:"/gee-analyses",
 	fileFormat: 'CSV'
 });
//3.2 Membuat tabel time-series standar deviasi suhu area penelitian
var l8_2_2_time_stdev_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.stdDev(), 
		scale: 100
	}).filter(ee.Filter.neq('stdDev', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
//3.2 Mengekspor tabel standar deviasi ke Google Drive
Export.table.toDrive({
collection: l8_2_2_time_stdev_region.select(['.*'],null,false), 
description: 'l8_2_2_time_stdev_region',
folder:"/gee-analyses",
fileFormat: 'CSV'
 });
//3.2 Membuat tabel time-series jumlah piksel area penelitian
var l8_2_2_time_count_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.count(), 
		scale: 100
	}).filter(ee.Filter.neq('count', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
 Export.table.toDrive({
 	collection: l8_2_2_time_count_region.select(['.*'],null,false), 
 	description: 'l8_2_2_time_count_region',
 	folder:"/gee-analyses",
 	fileFormat: 'CSV'
 });
//3.3 Membuat histogram piksel di area penelitian
var l8_2_2_time_hist_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.histogram(null, 0.25, null),
		scale: 100
	});
}).flatten();
 Export.table.toDrive({
 	collection: l8_2_2_time_hist_region, 
 	description: 'l8_2_2_time_hist_region',
 	folder:"/gee-analyses",
 	fileFormat: 'geoJSON'
 });
//3.4 Membuat gambar rata-rata temperatur area penelitian
var l8_2_2_mean_region_image = l8_2_2.reduce(ee.Reducer.mean());
//Memunculkan gambar rata-rata temperatur area penelitian di peta
Map.addLayer(l8_2_2_mean_region_image.clip(area), {palette:['blue','green','orange','red'],min:0,max:35, scale:30}, 'mean temperature 2013-2018');
print(l8_2_2_mean_region_image);
// Mengekspor gambar ke google drive
Export.image.toDrive({
	image: l8_2_2_mean_region_image.clip(area),
	description: 'l8_2_2_mean_region_image',
	folder:"/gee-analyses",
	scale: 30,
	region: area,
	crs: 'EPSG:3857',
	maxPixels:1e13
});
//3.5 Membuat gambar median temperatur area penelitian
var l8_2_2_median_region_image = l8_2_2.reduce(ee.Reducer.median());
//Memunculkan gambar median temperatur area penelitian ke peta
Map.addLayer(l8_2_2_median_region_image.clip(area), {palette:['blue','green','orange','red'],min:0,max:35, scale:30}, 'median temperature 2013-2018');
//Mengekspor gambar ke google drive
Export.image.toDrive({
	image: l8_2_2_median_region_image.clip(area),
	description: 'l8_2_2_median_region_image',
	folder:"/gee-analyses",
	scale: 30,
	region: area,
	crs: 'EPSG:3857',
	maxPixels:1e13
});
//3.6 Membuat gambar yang menunjukkan standar deviasi temperatur di area penelitian 
var l8_2_2_stdev_region_image = l8_2_2.reduce(ee.Reducer.stdDev());
//Mengekspor gambar ke google drive
 Export.image.toDrive({
 	image: l8_2_2_stdev_region_image.clip(area),
 	description: 'l8_2_2_stdev_region_image',
 	folder:"/gee-analyses",
 	scale: 100,
	region: area,
	crs: 'EPSG:3857',
 	maxPixels:1e13
 });
// // 3.7 Membuat gambar rata-rata tahunan
// var l8_2_2_series1_mean = l8_2_2.filterDate('2013-04-11', '2014-12-31').mean();
// var l8_2_2_series2_mean = l8_2_2.filterDate('2015-01-01', '2015-12-31').mean();
// var l8_2_2_series3_mean = l8_2_2.filterDate('2016-01-01', '2016-12-31').mean();
// var l8_2_2_series4_mean = l8_2_2.filterDate('2017-01-01', '2017-12-31').mean();
// var l8_2_2_series5_mean = l8_2_2.filterDate('2018-01-01', '2019-04-30').mean();
//4 Membuat grafik seri waktu masing-masing tata guna lahan
// membuat simbologi
var COLOR = {
  CITY: 'ff0000',
  WATER: '0000ff',
  FOREST: '00ff00'
};
// menentukan area yang ingin dibuat grafik seri waktunya
var kota = ee.Feature(    // Kota.
    ee.Geometry.Point(95.33, 5.56),
    {label: 'Kota'});
var sungai = ee.Feature(  // Sungai.
    ee.Geometry.Point(95.36481054139017,5.565866407052387),
    {label: 'Sungai'});
var hutan = ee.Feature(  // Hutan.
    ee.Geometry.Point(95.30, 5.49),
    {label: 'Hutan'});
var titikpengamatan = new ee.FeatureCollection([kota, sungai, hutan]);
//Membuat grafik time-series area penelitian dan suhu
var tempTimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: l8_2_2,
  regions: titikpengamatan,
  reducer: ee.Reducer.median(),
  band: "celsius",
  scale: 200,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
});
tempTimeSeries.setChartType('ScatterChart');
tempTimeSeries.setOptions({
  title: 'Temperatur di beberapa titik di Banda Aceh',
  vAxis: {
    title: 'Temperatur (Celsius)'
  },
  lineWidth: 0.7,
  pointSize: 2,
  series: {
    0: {color: COLOR.CITY},
    1: {color: COLOR.WATER},
    2: {color: COLOR.FOREST}
  }
});
print(tempTimeSeries);
//Menampilkan polygon di layar 
Map.addLayer(sungai, {color: COLOR.WATER});
Map.addLayer(hutan, {color: COLOR.FOREST});
Map.addLayer(kota, {color: COLOR.CITY});
//####################### Membuat Legenda #######################
var panel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '5px;'
  }
})
var title = ui.Label({
  value: 'Suhu Permukaan (Celcius)',
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0px;'
  }
})
panel.add(title)
var color = ['Red','Orange','Yellow','Green','White']
var lc_class = ['35', '30', '25', '20','0']
var list_legend = function(color, description) {
  var c = ui.Label({
    style: {
      backgroundColor: color,
      padding: '10px',
      margin: '4px'
    }
  })
  var ds = ui.Label({
    value: description,
    style: {
      margin: '5px'
    }
  })
  return ui.Panel({
    widgets: [c, ds],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for(var a = 0; a < 4; a++){
  panel.add(list_legend(color[a], lc_class[a]))
}
Map.add(panel)
//Membuat Judul Peta
//Menentukan posisi Judul Peta
var title = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
//Membuat isi Judul Peta
var textTitle = ui.Label({
  value: 'Peta Suhu Permukaan Tanah Rata-Rata Citra Landsat 8 Tahun 2013-2018',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
title.add(textTitle);
Map.add(title)