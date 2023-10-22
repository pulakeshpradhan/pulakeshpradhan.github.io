var image = ui.import && ui.import("image", "image", {
      "id": "ESA/GLOBCOVER_L4_200901_200912_V2_3"
    }) || ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3"),
    popden = ui.import && ui.import("popden", "imageCollection", {
      "id": "CIESIN/GPWv411/GPW_Population_Density"
    }) || ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Density"),
    pop = ui.import && ui.import("pop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    access = ui.import && ui.import("access", "image", {
      "id": "Oxford/MAP/accessibility_to_cities_2015_v1_0"
    }) || ee.Image("Oxford/MAP/accessibility_to_cities_2015_v1_0"),
    ghm = ui.import && ui.import("ghm", "imageCollection", {
      "id": "CSP/HM/GlobalHumanModification"
    }) || ee.ImageCollection("CSP/HM/GlobalHumanModification"),
    light = ui.import && ui.import("light", "imageCollection", {
      "id": "NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"),
    point = ui.import && ui.import("point", "table", {
      "id": "users/aryo/COVID19_point"
    }) || ee.FeatureCollection("users/aryo/COVID19_point"),
    admin = ui.import && ui.import("admin", "table", {
      "id": "users/aryo/COVID19_boundaryadmin"
    }) || ee.FeatureCollection("users/aryo/COVID19_boundaryadmin"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/aryo/COVID19_elder"
    }) || ee.Image("users/aryo/COVID19_elder"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/aryo/underage"
    }) || ee.Image("users/aryo/underage");
var lc = image.select(['landcover']);
var avgvis = light.select(['avg_vis']);
avgvis = avgvis.filterDate('2014-01-01','2014-04-11').median();
popden = popden.filterDate('2020-01-01','2020-04-11').median();
pop = pop.filterDate('2020-01-01','2020-04-11').median();
ghm = ghm.filterDate('2016-01-01','2016-12-31').median();
var elder = image2.rename('elder');
var underage = image3.rename('underage');
var predictor = pop.addBands(elder).addBands(underage).clip(admin);
print(predictor.bandNames())
// Map.addLayer(popden,{min:0,max:50060})
Map.setCenter(106.79696585663798,-6.594236672362915,12)
var band = predictor.bandNames()
var training = predictor.sampleRegions({
  collection: point,
  properties: ['CID'],
  scale: 30,
  tileScale: 16
});
var classifier = ee.Classifier.smileRandomForest({numberOfTrees:25}).setOutputMode('PROBABILITY').train(training,"CID",band);
var classification = predictor.select(band).classify(classifier).clip(admin).multiply(100);
var colormap = require('users/gena/packages:palettes').matplotlib.inferno[7].reverse();
Map.addLayer(classification, {palette:colormap, min:0,max:100}, 'risk')
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Spatial Risk of COVID-19 in Bogor City', {fontWeight: 'bold', fontSize: '24px', color: 'red'});
var text = ui.Label(
    'Sebaran Risiko COVID-19 di Kota Bogor diestimasi menggunakan data titik positif COVID-19 yang diambil secara purposive random sampling berdasarkan data kelurahan dari http://covid19.kotabogor.go.id/. Model dibangun menggunakan algoritma Random Forest menggunakan beberapa prediktor seperti: populasi anak di bawah umur, populasi lansia, kepadatan populasi, serta aksesibilitas. Peta tersebut merepresentasikan wilayah yang memiliki risiko tinggi terhadap COVID-19 dengan update data terbaru tanggal 11 April 2020.',
    {fontSize: '14px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
var text2 = ui.Label(
    'Laboratorium Analisis Lingkungan dan Permodelan Spasial, Fakultas Kehutanan, IPB University, Bogor',
    {fontSize: '14px'});
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Aryo Adhi Condro', {},
    'https://researchgate.net/profile/Aryo_Condro');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel).add(text2);
var viz =  {min:0, max:100, palette:colormap};
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 12px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Risk of COVID-19 (%)',
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
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
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