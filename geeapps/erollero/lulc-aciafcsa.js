var esri_lulc10 = ui.import && ui.import("esri_lulc10", "imageCollection", {
      "id": "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m"
    }) || ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m"),
    departamentos = ui.import && ui.import("departamentos", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/AmericaSur"
    }) || ee.FeatureCollection("users/erollero/AmericaSur"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/erollero/LimitesDepartamentales"
    }) || ee.FeatureCollection("users/erollero/LimitesDepartamentales"),
    roix = ui.import && ui.import("roix", "table", {
      "id": "users/erollero/ACIAFCSA/disoldeptos"
    }) || ee.FeatureCollection("users/erollero/ACIAFCSA/disoldeptos"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
//Indicar deptos.
var roiz = departamentos.filterMetadata("LINK","equals","6547");
var roir = roiz.merge(roix);
var collection = ee.ImageCollection ("COPERNICUS/S2_SR")
    .filterDate('2021-09-05','2021-09-16')
Map.setOptions("HYBRID")
Map.setCenter(-61.08436, -36.42598, 14);   
//Imagen 2021-09-05','2021-09-16
var sendicb = ee.ImageCollection ('COPERNICUS/S2').filterBounds(roir)
           .filterDate('2021-09-05','2021-09-19').select('B4','B8','B11').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 10.0);
var mosdicb = sendicb.median();
//Recorte
var Recdicb = mosdicb.clip(roir);
Map.addLayer(Recdicb, {max: 4200, min:482, bands:['B8', 'B11', 'B4']}, 'Recdicb');
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
Map.addLayer(zona, {bands: ['B8', 'B11', 'B4'], min: 0.01636, max: 0.398}, 'Sentinel2_15-sept-2021');
Map.setCenter(-57.9905, -35.7482, 8.5);
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "No Data",
    "Water",
    "Trees",
    "Grass",
    "Flooded Vegetation",
    "Crops",
    "Scrub/Shrub",
    "Built Area",
    "Bare Ground",
    "Snow/Ice",
    "Clouds"
  ],
  "colors": [
    "#FFFFFF",
    "#1A5BAB",
    "#358221",
    "#99ff33",
    "#87D19E",
    "#ffff1a",
    "#EECFA8",
    "#ED022A",
    "#EDE9E4",
    "#F2FAFF",
    "#C8C8C8"
  ]};
var paleta =['#FFFFFF','#1A5BAB','#358221','#99ff33','#87D19E','#ffff1a','#EECFA8','#ED022A','#EDE9E4','#F2FAFF','#C8C8C8'];
var paleta2 =['#1A5BAB','#358221','#99ff33','#87D19E','#ffff1a','#EECFA8','#ED022A','#EDE9E4','#F2FAFF','#C8C8C8'];
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
addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover');
// Add image to the map
//Map.addLayer(esri_lulc10.mosaic(), {min:0, max:10, palette:dict['colors']}, 'ESRI LULC 10m')
//Indicar depto.
var roi1 = departamentos.filterMetadata("LINK","equals","6217");
var roi2 = departamentos.filterMetadata("LINK","equals","06466");
var roi = roi1.merge(roi2);
var datasets = esri_lulc10.mosaic().clip(roi);
//Map.addLayer(datasets, {min:0, max:10, palette:dict['colors']}, 'ESRI LULC 10m deptos')
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
var result = esri_lulc10.mosaic().clip(roir);
Map.addLayer(result, {min:0, max:10, palette:dict['colors']}, 'ESRI LULC Deptos ACIAFCSA')
//Definir imagen sobre la cual se quieren realizar los calculos de area
var imagen = result;
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
  classLabels: result,
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
var nomes = ['clase0','clase1','clase2','clase3','clase4','clase5','clase6','clase7','clase8','clase9']
var renomeado = imagen.eq([0,1,2,3,4,5,6,7,8,9]).rename(nomes)
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
var a = ee.Array(area_por_classe.get('clase0'))
var b = ee.Array(area_por_classe.get('clase1'))
var c = ee.Array(area_por_classe.get('clase2'))
var d = ee.Array(area_por_classe.get('clase3'))
var e = ee.Array(area_por_classe.get('clase4'))
var f = ee.Array(area_por_classe.get('clase5'))
var g = ee.Array(area_por_classe.get('clase6'))
var h = ee.Array(area_por_classe.get('clase7'))
var i = ee.Array(area_por_classe.get('clase8'))
var j = ee.Array(area_por_classe.get('clase9'))
var lista = ee.List([a,b,c,d,e,f,g,h,i,j])
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