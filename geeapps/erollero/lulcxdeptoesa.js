var departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/AmericaSur"
    }) || ee.FeatureCollection("users/erollero/AmericaSur"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/erollero/LimitesDepartamentales"
    }) || ee.FeatureCollection("users/erollero/LimitesDepartamentales"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    esri_lulc10 = ui.import && ui.import("esri_lulc10", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100");
//Indicar deptos.
var roir = departamentos.filterMetadata("LINK","equals","6406");
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first().clip(roir);
var visualization = {
  bands: ['Map'],
};
Map.addLayer(dataset, visualization, "Landcover");
var collection = ee.ImageCollection ("COPERNICUS/S2_SR")
    .filterDate('2021-09-05','2021-09-16')
Map.setOptions("HYBRID")
Map.centerObject(roir,11); 
//Imagen 2021-09-05','2021-09-16
var sendicb = ee.ImageCollection ('COPERNICUS/S2').filterBounds(roir)
           .filterDate('2021-09-05','2021-09-19').select('B4','B8','B11').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 10.0);
var mosdicb = sendicb.median();
//Recorte
var Recdicb = mosdicb.clip(roir);
//Map.addLayer(Recdicb, {max: 4200, min:482, bands:['B8', 'B11', 'B4']}, 'Recdicb');
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}
// Map the cloud masking function over one year of data
var s2filtered = s2.filterDate('2021-09-07','2021-09-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
                  .map(maskS2clouds)
                  .select('B4', 'B8','B11','B8A','B5');
var bands = ('B4', 'B8','B11','B8A','B5');
var composite = s2filtered.median();
// Display the results.
var zona = composite.clip(roir)
//Map.addLayer(zona, {bands: ['B8', 'B11', 'B4'], min: 0.01636, max: 0.398}, 'Sentinel2_15-sept-2021');
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Arboles",
    "Matorral",
    "Pasturas",
    "Cultivos",
    "Construcciones",
    "Escasa vegetación",
    "Nieve - hielo",
    "Espejo de Agua",
    "Humedal herbaceo",
    "Manglar",
    "Musgos"
  ],
  "colors": [
    "#006400",
    "#ffbb22",
    "#ffff4c",
    "#f096ff",
    "#fa0000",
    "#b4b4b4",
    "#f0f0f0",
    "#0064c8",
    "#0096a0",
    "#00cf75",
    "#fae6a0"
  ]};
var paleta  =['#006400','#ffbb22','#ffff4c','#f096ff','#fa0000','#b4b4b4','#f0f0f0','#0064c8','#0096a0','#00cf75','#fae6a0'];
var paleta2 =['#006400','#ffbb22','#ffff4c','#f096ff','#fa0000','#b4b4b4','#f0f0f0','#0064c8','#0096a0','#00cf75','#fae6a0'];
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '7px 13px'
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 3px 5px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  Map.add(panel);
}
/*
  // Display map and legend ///////////////////////////////////////////////////////////////////////////////
*/
// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESA WorldCover 10m v100');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table3,
  color: 1,
  width: 0.05
});
Map.addLayer(outline, {palette: '001327'}, 'Deptos Geosur');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'white'}, 'Paises');
var imagen = dataset;
//-----------------------------------------------------------
//1.7 Visualize using charts
// chart that shows class area distribution
var chart = ui.Chart.image.byClass({
  image: ee.Image.pixelArea().divide(10000)       // pixel area in ha 
            .addBands(imagen.rename('classification')),
  classBand: 'classification',                     
  region: roir,
  reducer: ee.Reducer.sum(),
  scale: 70, //Lin_adjust the resolution
  classLabels: imagen,
})
chart.setOptions({title:'Area por Clase', hAxis: {title: 'Clases'}, vAxis: {title: 'Area (has)'},
                 colors: paleta2})
     .setChartType('ColumnChart')
//print(chart)
chart.style().set({
  position: 'bottom-left',
  width: '450px',
  height: '250px'
});
Map.add(chart);
/******************Grafico de tortas****************************/
/********************************************Gráfico de áreas**************************************************/
var nomes = ['Arboles','Matorral','Pasturas','Cultivos','Construcciones','Escasa vegetación','Nieve - hielo','Agua','Humedal','Manglar','Musgos']
var renomeado = imagen.eq([10,20,30,40,50,60,70,80,90,95,100]).rename(nomes)
print('classes', renomeado)
var area = renomeado.multiply(ee.Image.pixelArea()).divide(10000) //para converter para hectares (ha)
var area_por_classe = area.reduceRegion({
  reducer: ee.Reducer.sum(), //quero somar a área total
  geometry: roir,
  scale:70, 
  crs:'EPSG: 4326', 
 // bestEffort: true, 
  maxPixels:1e13})
var area_total = ee.Number(area_por_classe)
print('area total por clase',area_total)
/*Criando listas array*/
var a = ee.Array(area_por_classe.get('Arboles'))
var b = ee.Array(area_por_classe.get('Matorral'))
var c = ee.Array(area_por_classe.get('Pasturas'))
var d = ee.Array(area_por_classe.get('Cultivos'))
var e = ee.Array(area_por_classe.get('Construcciones'))
var f = ee.Array(area_por_classe.get('Escasa vegetación'))
var g = ee.Array(area_por_classe.get('Nieve - hielo'))
var h = ee.Array(area_por_classe.get('Agua'))
var i = ee.Array(area_por_classe.get('Humedal'))
var j = ee.Array(area_por_classe.get('Manglar'))
var k = ee.Array(area_por_classe.get('Musgos'))
var lista = ee.List([a,b,c,d,e,f,g,h,i,j,k])
var Nomes = ee.List(nomes)
var grafico_area = ui.Chart.array.values(lista,0, Nomes)
.setChartType('PieChart')
.setOptions(
  {width: 350,
  height: 450,
  title: 'Area por clase (Has)',
  is3D: true,
  colors: paleta})
//print(grafico_area)
grafico_area.style().set({
  position: 'bottom-right',
  width: '450px',
  height: '280px'
});
Map.add(grafico_area);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: departamentos,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '001327'}, 'Deptos');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'European Space Agency (ESA) WorldCover 10 m 2020 - Uso del Suelo, partido de Hipólito Yrigoyen ' 
    , {fontWeight: 'bold', fontSize: '20px'}));