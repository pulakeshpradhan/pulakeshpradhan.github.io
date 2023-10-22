var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/mgibranfadilla/IDN_adm2"
    }) || ee.FeatureCollection("users/mgibranfadilla/IDN_adm2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
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
	.filterDate('2015-01-01', '2020-12-31')
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
// 	Export.table.toDrive({
// 	collection: l8_2_2_time_median_region.select(['.*'],null,false), 
// 	description: 'l8_2_2_time_median_region',
// 	folder:"/gee-analyses",
// 	fileFormat: 'CSV'
// });
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
// 	Export.table.toDrive({
// 	collection: l8_2_2_time_mean_region.select(['.*'],null,false), 
// 	description: 'l8_2_2_time_mean_region',
// 	folder:"/gee-analyses",
// 	fileFormat: 'CSV'
// });
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
// 
//3.2 Mengekspor tabel standar deviasi ke Google Drive
// Export.table.toDrive({
// collection: l8_2_2_time_stdev_region.select(['.*'],null,false), 
// description: 'l8_2_2_time_stdev_region',
// folder:"/gee-analyses",
// fileFormat: 'CSV'
// });
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
// Export.table.toDrive({
// 	collection: l8_2_2_time_count_region.select(['.*'],null,false), 
// 	description: 'l8_2_2_time_count_region',
// 	folder:"/gee-analyses",
// 	fileFormat: 'CSV'
// });
//3.3 Membuat histogram piksel di area penelitian
var l8_2_2_time_hist_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.histogram(null, 0.25, null),
		scale: 100
	});
}).flatten();
// Export.table.toDrive({
// 	collection: l8_2_2_time_hist_region, 
// 	description: 'l8_2_2_time_hist_region',
// 	folder:"/gee-analyses",
// 	fileFormat: 'geoJSON'
// });
//3.4 Membuat gambar rata-rata temperatur area penelitian
var l8_2_2_mean_region_image = l8_2_2.reduce(ee.Reducer.mean());
//Memunculkan gambar rata-rata temperatur area penelitian di peta
Map.addLayer(l8_2_2_mean_region_image.clip(area), {palette:['blue','green','orange','red'],min:0,max:35, scale:30}, 'mean temperature 2015-2020');
print(l8_2_2_mean_region_image);
// Mengekspor gambar ke google drive
// Export.image.toDrive({
// 	image: l8_2_2_mean_region_image.clip(area),
// 	description: 'l8_2_2_mean_region_image',
// 	folder:"/gee-analyses",
// 	scale: 30,
// 	region: area,
// 	crs: 'EPSG:3857',
// 	maxPixels:1e13
// });
//3.5 Membuat gambar median temperatur area penelitian
var l8_2_2_median_region_image = l8_2_2.reduce(ee.Reducer.median());
//Memunculkan gambar median temperatur area penelitian ke peta
Map.addLayer(l8_2_2_median_region_image.clip(area), {palette:['blue','green','orange','red'],min:0,max:35, scale:30}, 'median temperature 2015-2020');
//Mengekspor gambar ke google drive
// Export.image.toDrive({
// 	image: l8_2_2_median_region_image.clip(area),
// 	description: 'l8_2_2_median_region_image',
// 	folder:"/gee-analyses",
// 	scale: 30,
// 	region: area,
// 	crs: 'EPSG:3857',
// 	maxPixels:1e13
//});
//3.6 Membuat gambar yang menunjukkan standar deviasi temperatur di area penelitian 
var l8_2_2_stdev_region_image = l8_2_2.reduce(ee.Reducer.stdDev());
//Mengekspor gambar ke google drive
// Export.image.toDrive({
// 	image: l8_2_2_stdev_region_image.clip(area),
// 	description: 'l8_2_2_stdev_region_image',
// 	folder:"/gee-analyses",
// 	scale: 100,
// 	region: area,
// 	crs: 'EPSG:3857',
// 	maxPixels:1e13
// });
//Pembuatan Pemanggil data Time Series 
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) { var layer = drawingTools.layers().get(0); drawingTools.layers().remove(layer);
}
var dummyGeometry =
ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry); function clearGeometry() {
var layers = drawingTools.layers(); layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPoint() { clearGeometry(); drawingTools.setShape('point'); drawingTools.draw();
}
var symbol = { point: '.',
};
var controlPanel = ui.Panel({ widgets: [
ui.Label('Pilih Titik.'), ui.Button({
label: symbol.point + ' Point', 
onClick: drawPoint,
style: {stretch: 'horizontal'}
}),
],
style: {position: 'bottom-left'}, layout: null,
});
Map.add(controlPanel);
//Pembuatan Data Tampilan Grafik Time Series 
var chartPanel = ui.Panel({
style:
{height: '250px', width: '450px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartTempTimeSeries() {
// Make the chart panel visible the first time a geometry is drawn. 
  if (!chartPanel.style().get('shown')) { chartPanel.style().set('shown', true);
}
// Get the drawn geometry; it will define the reduction region. 
var aoi = drawingTools.layers().get(0).getEeObject();
// Set the drawing mode back to null; turns drawing off. 
drawingTools.setShape(null);
// Reduction scale is based on map scale to avoid memory/timeout errors. 
var mapScale = Map.getScale();
var scale = mapScale > 5000 ? mapScale * 2 : 5000;
// Chart temperature time series for the selected area of interest. 
var chart = ui.Chart.image
.seriesByRegion({ imageCollection: l8_2_2, regions: aoi,
reducer: ee.Reducer.mean(), 
band: 'celsius',
scale: scale,
xProperty: 'system:time_start'
})
.setOptions({ titlePostion: 'none',
legend: {position: 'none'},
title: 'Suhu Permukaan Tanah', hAxis: {title: 'Date'},
vAxis: {title: 'Suhu Permukaan Tanah'}, series: {0: {color: '23cba7'}}
});
// Replace the existing chart in the chart panel with the new chart. 
chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartTempTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartTempTimeSeries, 500));
//Judul Aplikasi
var legendTitle1 = ui.Label({
value: 'Monitoring Suhu Permukaan Tanah Kota Banda Aceh', style: {fontWeight: 'bold',
fontSize: '15px', margin: '0 0 4px 0',
padding: '0'
}});
Map.add(legendTitle1);
//Membuat tampilan simbologi di peta
var panel = ui.Panel({
  style: {
    position: 'top-left',
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