var zona = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-73.93338136073658, 2.4914635367661773],
          [-73.92994813319751, 2.2794740618160314],
          [-73.83381776210376, 2.2835906689502092],
          [-73.84343079921314, 2.4907775401592924]]]),
    l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
// Set a custom basemap style and default to the satellite map type.
var styles = {
  'Soft Blue': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
Map.setOptions('satellite', styles);
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Severity Fire in Colombia Amazon 2018',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Add the legend to the map.
Map.setCenter(-113.41842, 40.055489, 6);
Map.add(legend);
var incendio = ee.FeatureCollection('ft:1_mHwXHgxImRn3QkJ-UDippyzL4EHhcAH-3gmMQOa')
var pre = ee.Image(l8 
.filterDate("2018-01-05", "2018-01-06")
.filterBounds(zona)
.first());
 print("Imagen Landsat 8, 1 de enero de 2018. Pre:", pre);
var prerecorte = pre.clip(incendio);
Map.addLayer(prerecorte, {bands: 'B4,B3,B2', min: 0, max: 0.2, gamma: 0.8},'Imagen Landsat 8, 1 de enero de 2018. Pre', false);
var pos = ee.Image(l8 
.filterDate("2018-03-26", "2018-03-27")
.filterBounds(zona)
.first());
 print("Imagen Landsat 8, 26 de marzo de 2018. Pos:", pos);
var posrecorte = pos.clip(incendio)
Map.addLayer(posrecorte, {bands: 'B4,B3,B2', min: 0, max: 0.2, gamma: 0.8},'Imagen Landsat 8, 26 de marzo de 2018. Pos', false);
Map.centerObject(zona, 12);
var NBRpre = pre.normalizedDifference(['B5', 'B7']).rename('NBRpre');
Map.addLayer (NBRpre, {min: 0, max: 1, gamma: 3.6}, "NBRpre", false);
var NBRpreRecorte = NBRpre.clip(incendio)
var NBRpos = pos.normalizedDifference(['B5', 'B7']).rename('NBRpos');
Map.addLayer (NBRpos, {min: 0, max: 1, gamma: 0.8}, "NBRpos", false);
var dNBR = NBRpre.subtract(NBRpos).rename('dNBR');
var dNBRecorte = dNBR.clip(incendio)
Map.addLayer (dNBRecorte, {min: 0, max: 1, gamma: 0.8}, "dNBR", false);
//Clasificar por rango de valores
var palette = ['fb0000','fb6212','f5ff36','24fe4f'];
var thresholds = ee.Image([-0.099, 0.269, 0.439, 0.659]);
var dNBRClases = dNBR.lt(thresholds).reduce('sum');
var dNBRClasesrecorte = dNBRClases.clip(incendio);
Map.addLayer(dNBRClasesrecorte, {min: 0, max: 4, palette: palette}, 'dNBR clasificado');
// Export the image to Cloud Storage as an Asset.
Export.image.toDrive({
  image: dNBRClasesrecorte,
  description: 'dNBRCLases',
  fileNamePrefix: 'dNBRCLases1',
  scale: 10,
  region: incendio
});
// Export the image to Cloud Storage as an Asset.
Export.image.toDrive({
  image: dNBRecorte,
  description: 'dNBR',
  fileNamePrefix: 'dNBRC1',
  scale: 10,
  region: incendio
});
// Histogram dNBR
var options = {
	title: 'Histograma dNBR ',
	fontSize: 20,
	hAxis: {title: 'dNBR'},
	vAxis: {title: 'Conteo'},
	series: {
		0: {color: 'blue'}}
};
var histogramdNBR = Chart.image.histogram(dNBRecorte, incendio)
	.setSeriesNames(['dNBR'])
	.setOptions(options);
print(histogramdNBR);
// Histogram dNBRclases
var options = {
	title: 'Histogramav dNBR clases ',
	fontSize: 20,
	hAxis: {title: 'dNBR Clases'},
	vAxis: {title: 'Conteo'},
	series: {
		0: {color: 'red'}}
};
var histogramdNBRclas = Chart.image.histogram(dNBRClasesrecorte, incendio)
	.setSeriesNames(['dNBR Clases'])
	.setOptions(options);
print(histogramdNBRclas);
/////////////////////////////////////////////////////////////////////////
// Calculando RdNBR
var div1000 = NBRpreRecorte.divide(1000)
var preraiz = ee.Image((div1000)
.sqrt());
var RdNBR = dNBRecorte.divide(preraiz);
Map.addLayer (RdNBR, {min: 0, max: 1, gamma: 0.8}, "RdNBR");
var thresholds1 = ee.Image([-0.099, 0.269, 0.439, 0.659]);
var RdNBRClasesrecorte = RdNBR.lt(thresholds1).reduce('sum');
Map.addLayer(RdNBRClasesrecorte, {min: 0, max: 4,palette: palette}, 'RdNBR clasificado');
// Histogram RdNBR
var options = {
	title: 'Histograma RdNBR ',
	fontSize: 20,
	hAxis: {title: 'RdNBR'},
	vAxis: {title: 'Conteo'},
	series: {
		0: {color: 'blue'}}
};
var histogram = Chart.image.histogram(RdNBR, incendio)
	.setSeriesNames(['RdNBR'])
	.setOptions(options);
print(histogram);
// Histogram RdNBR
var options = {
	title: 'Histograma RdNBR Clases ',
	fontSize: 20,
	hAxis: {title: 'RdNBR'},
	vAxis: {title: 'Conteo'},
	series: {
		0: {color: 'red'}}
};
var histogram = Chart.image.histogram(RdNBRClasesrecorte, incendio)
	.setSeriesNames(['RdNBR Clases'])
	.setOptions(options);
print(histogram);
/////////////////////////////////////////////////////////////////////////
// Calculadno RBR
var denominador = NBRpreRecorte.add(1001)
var RBR = dNBRecorte.divide(denominador)
Map.addLayer (RBR, {}, "RBR");
var thresholds3 = ee.Image([-0.00019, 0.0002, 0.0003, 0.0004]);
var RBRClasesrecorte = RBR.lt(thresholds3).reduce('sum');
Map.addLayer(RBRClasesrecorte, {min: 0, max: 4,palette: palette}, 'RdNBR clasificado');
// Histogram RdNBR
var options = {
	title: 'Histograma RBR ',
	fontSize: 20,
	hAxis: {title: 'RBR'},
	vAxis: {title: 'Conteo'},
	series: {
		0: {color: 'blue'}}
};
var histogram = Chart.image.histogram(RBR, incendio)
	.setSeriesNames(['RBR'])
	.setOptions(options);
print(histogram);
// Histogram RdNBR
var options = {
	title: 'Histograma RBR Clases ',
	fontSize: 20,
	hAxis: {title: 'RBR Clases'},
	vAxis: {title: 'Conteo'},
	series: {
		0: {color: 'red'}}
};
var histogram = Chart.image.histogram(RBRClasesrecorte, incendio)
	.setSeriesNames(['RBR Clases'])
	.setOptions(options);
print(histogram);