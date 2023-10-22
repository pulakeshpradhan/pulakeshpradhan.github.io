var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/iahmadnaufal/IDN_adm2"
    }) || ee.FeatureCollection("users/iahmadnaufal/IDN_adm2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//Menentukan area 
var countries = Indonesia //Import SHP DIVA GIS
var Nama_Kota = ['Palangka Raya'] //mendefinisikan daerah penelitian
var geometry = countries.filter(ee.Filter.inList('NAME_2', Nama_Kota));//Mendefinisikan geometri
var area = ee.FeatureCollection(geometry);//Mendefinisikan area yang akan di clip
Map.addLayer(geometry,{color:"Blue" },"Daerah");//menambahkan layer pembatas area penelitian dengan warna biru
Map.centerObject(area, 10);//zoom ke area penelitian
//Membuat fungsi NDVI 
var addNDVI = function(image) {
	return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI'));
};
//Membuat fungsi batas tutupan awan.
var cloudMask = function(image) {
	var clouds = ee.Algorithms.Landsat.simpleCloudScore(image).select(['cloud']);
	return image.updateMask(clouds.lte(30));//set limit awan 30%
};
//Memilih jenis satelit dan rentang data
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
	.filterBounds(area)
	.filterDate('2013-01-01', '2020-12-31')
	.map(addNDVI)
	.map(cloudMask);
print(l8);
var l8_2 = l8.select(['B10', 'NDVI']);
var l8_2_NDVI = l8.select(['NDVI']);
var toCelsius2_l8 = function(image){
	var time = image.get('system:time_start');
	var celsius = image.expression('(B10/(1+(10.8*B10/14388)*log((0.004*((ndvi-0.2)/0.3)+0.986))))-273.15',
	             {'ndvi': image.select('NDVI'), 'B10': image.select('B10')})
	             .rename("celsius")
	             .set('system:time_start',time);
	return celsius;
};
var l8_2_2 = l8_2.map(toCelsius2_l8);
//Membuat tabel time-series dari suhu rata-rata area penelitian
var l8_2_2_time_median_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.median(), 
		scale: 200
	}).filter(ee.Filter.neq('median', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
 var l8_2_2_time_mean_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.mean(), 
		scale: 200
	}).filter(ee.Filter.neq('mean', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
//Membuat tabel time-series dari standar deviasi suhu area penelitian
var l8_2_2_time_stdev_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.stdDev(), 
		scale: 200
	}).filter(ee.Filter.neq('stdDev', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
//Membuat tabel time-series dari jumlah piksel area penelitian
var l8_2_2_time_count_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.count(), 
		scale: 200
	}).filter(ee.Filter.neq('count', null))
	.map(function(f) { 
		return f.set('system:time_start',null);
	});
}).flatten();
//Membuat histogram
var l8_2_2_time_hist_region = l8_2_2.map(function(i) {
	return i.select('celsius').reduceRegions({
		collection: area, 
		reducer: ee.Reducer.histogram(null, 0.25, null),
		scale: 200
	});
}).flatten();
//Membuat image rata-rata temperatur area penelitian
var l8_2_2_mean_region_image = l8_2_2.reduce(ee.Reducer.mean());
//Memunculkan image rata-rata temperatur area penelitian di peta
Map.addLayer(l8_2_2_mean_region_image.clip(area), {palette:['blue','green','orange','red'],min:0,max:35, scale:30}, 'mean temperature 2013-2020');
print(l8_2_2_mean_region_image);
//Membuat image median temperatur area penelitian
var l8_2_2_median_region_image = l8_2_2.reduce(ee.Reducer.median());
//Memunculkan image median temperatur area penelitian ke peta
Map.addLayer(l8_2_2_median_region_image.clip(area), {palette:['blue','green','orange','red'],min:0,max:35, scale:30}, 'median temperature 2013-2020');
//Membuat image yang menunjukkan standar deviasi temperatur di area penelitian 
var l8_2_2_stdev_region_image = l8_2_2.reduce(ee.Reducer.stdDev());
//memanggil data Time Series 
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
var symbol = { point: ' ',
};
var controlPanel = ui.Panel({ widgets: [
ui.Label('Pilih Titik'), ui.Button({
label: symbol.point + 'Point', 
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
value: 'Monitoring Suhu di Daerah Palangkaraya', style: {fontWeight: 'bold',
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