var katya = ui.import && ui.import("katya", "table", {
      "id": "users/marcosoriaorihuela/ACCA/ACP_Japu"
    }) || ee.FeatureCollection("users/marcosoriaorihuela/ACCA/ACP_Japu");
//*************HALLA NDVI MULTIANUAL****************
///////////////////////////////////////////////////////////
// Variables
///////////////////////////////////////////////////////////
var aoi = katya.style({color: "red", fillColor: "00000000", width: 3}); // cambiar AOI
var anho = [2016,2017,2018,2019,2020,2021]; //valor variable
var dias =[122, 305];//1 mayo al 31 octubre
var nubes = 40; //cambiar segun zona
print("Número de años",anho.length);
///////////////////////////////////////////////////////////
// Funciones
///////////////////////////////////////////////////////////
function maskS2clouds(image) {
                  var qa = image.select('QA60');
                  var cloudBitMask = 1 << 10;
                  var cirrusBitMask = 1 << 11;
                  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
                      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
                  return image.updateMask(mask)} //Enmascaramiento de nubes
function myNDVI_S2 (image){
        return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI').clip(katya).toFloat());  } //NDVI, agregar banda NDVI
function areaFeatureCollection(area){
  return area.set({areaHa: area.geometry().area().divide(10000)});} //calcular area de un FeatureCollection
var lista=[];        
for(var i=0; i< anho.length; i++){
      lista[i] = ee.ImageCollection("COPERNICUS/S2")
            .filter(ee.Filter.calendarRange(anho[i], anho[i], 'year'))
            .filter(ee.Filter.calendarRange(dias[0], dias[1], 'day_of_year'))
            .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE",nubes))
            .filterBounds(katya)
            .map(maskS2clouds)
            .map(myNDVI_S2)
            .median()
            .toFloat();}
print("Resultado de imágenes por año",lista);
///////////////////////////////Unir NDVI por cada año
var ndvi = []; //se usara debajo para calculo de áreas
var ndviHistro=[]; //solo para histograma
for(var i=0; i<lista.length; i++){
  ndvi[i] = lista[i].select([16]); //Select para Imagenes, .get para listas/diccionarios/array
  ndvi[i] = ndvi[i].mask(ndvi[i].gte(0.4)); // Cambiar de acuerdo a necesidad 0.4
  ndviHistro[i] = ndvi[i].rename("NDVI "+ anho[i]); //solo creado para dibujar histograma, no afecta mas abajo
}
print("Resultado de NDVI por año", ndvi);
///////////////////////////////////////////////////////////
// Gráfico 01: Frecuencia de NDVI por cada año
///////////////////////////////////////////////////////////
var grafico1 = ui.Chart.image.histogram(ndviHistro,katya,3)
  .setOptions({
    title: "Distribución de frecuencias de valores de NDVI", //aqui pones tu titulo
    fontSize: 30, //tamanho del titulo del gráfico
    vAxis: {title: "Frecuencia de NDVI", format: "short",scaleType: "mirrorlog"}, //titulo eje y
    hAxis: {title: "Valores de NDVI", format:"none", scaleType:"log"},//titulo eje X
    backgroundColor: "white",//background
    legend: {position: 'right', maxLines: 2}, //leyenda
    pointSize:500, //tamaño
    });
print("Frecuencia de Valores de NDVI",grafico1);
///////////////////////////////////////////////////////////
// Area del poligono
///////////////////////////////////////////////////////////
print("Área(Ha) de área de interés",areaFeatureCollection(katya));
///////////////////////////////////////////////////////////
// Cuantificacion en hectareas
///////////////////////////////////////////////////////////
var arrayAreas =[]; //aqui se agregaran todos los NDVI en numeros capaces de poder ser usados
for(i=0; i<ndvi.length ; i++){
  var areas=[];
  areas[i] = ndvi[i].multiply(ee.Image.pixelArea().divide(10000));//convierte pixel en area medible
  areas[i] = areas[i].reduceRegion({ //reductor de sum
        reducer : ee.Reducer.sum(),
        geometry : katya.geometry(), //nuestro AOI
        scale: 10}); //porque es sentinel
  arrayAreas[i]= ee.Number(areas[i].get('NDVI')); //convierte en numeros los datos IMPORTANTE**
}
print("Áreas en hectáreas", arrayAreas);
var chart = ui.Chart.array.values({
  array : ee.Array(arrayAreas),
  axis :0,
  xLabels: anho})
    .setChartType('LineChart') //ScatterChart', 'LineChart', and 'ColumnChart'
    .setOptions({
      title : "Áreas de cobertura vegetal sana y saludable por año",
      fontSize: 30,
      hAxis : {title: "Año", gridlines: {count:2}, format: "####"},
      vAxis : {title: "Area (Ha)", gridlines: {count:2}},
      legend : {position: "none"},
      lineWidth: 3,
      pointSize: 7,
      pointShape:{type:"circle", sides:4},
      });
print(chart);
///////////////////////////////////////////////////////////
// Parámetros de Visualización
///////////////////////////////////////////////////////////
var vizparmRGB = {min:400,max:6000,gamma: 2.00, bands:["B4","B3","B2"]};
var vizparmNDVI = {min:-1, max:1, palette:["#DFCB09","#B9F3B9","#006F00"]};
Map.centerObject(katya,13);
///////////////////////////////////////////////////////////
// Agregar Mapa NDVI y RGB
///////////////////////////////////////////////////////////
for(var i= 0; i<anho.length; i++){
  Map.addLayer({eeObject: ee.Image(lista[i]).clip(katya), visParams: vizparmRGB, name: anho[i]+" RGB"});
  Map.addLayer({eeObject: ndvi[i], visParams: vizparmNDVI, name: anho[i]+" NDVI"});
  } //agregar mapas RGB
for (var i = 0; i<anho.length; i++){
Export.image.toDrive({image: ee.Image(lista[i]).select("B2","B3","B4"), description:anho[i]+"RGB", folder:"GEE", region:katya , scale: 10});
Export.image.toDrive({image: ndvi[i], description:anho[i]+"NDVI", folder:"GEE", region:katya , scale: 10});}
Map.addLayer({eeObject: aoi, name: "aoi"});