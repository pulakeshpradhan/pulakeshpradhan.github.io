var app = {},
    table = ee.FeatureCollection("users/GEE-RRBM/LANDSAT");
var lat_coords;
var long_coords;
var point_name;
var image_select;
var buffer_size;
var checkboxCSV;
var checkboxJSON;
var range;
var imgSize;
var collection_size;
var logo = ee.Image("users/GEE-RRBM/Logo_PNCB")
var logo2 = ee.Image("users/GEE-RRBM/Logo_MINAM6")
Map.setOptions("HYBRID")
// var path = 2
// var row  = 69
// print(path+'_'+row)
// var cuadrante = table.filter(ee.Filter.eq('CUADRANTE',path+'_'+row));
// Map.centerObject(cuadrante,10)
///////////////////////////
var Numero_de_banda =ee.Dictionary({L8: ee.List([1,2,3,4,5,6,7,10]), L7: ee.List([0,1,2,3,4,6,5,9]),L5: ee.List([0,1,2,3,4,6,5,9]),L4: ee.List([0,1,2,3,4,6,5,9])});
var Nombre_de_banda = ee.List(['blue','green','red','nir','swir1','swir2','temp','pixel_qa']);
var landsat5 = (ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').select(Numero_de_banda.get('L5'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY' , 9))
var landsat7 = (ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').select(Numero_de_banda.get('L7'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY' , 9))
.filter(ee.Filter.inList('system:index', ['LE07_004069_20000802']).not());
var landsat = landsat5.merge(landsat7);
//////////////////////////
function sombraynube(image) {
var cloudShadowBitMask = ee.Number(2).pow(3).int();
var cloudsBitMask = ee.Number(2).pow(5).int();
var qa = image.select('pixel_qa');
var cloud_buffer=300;
var mask = 
    (qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0)))
.and(image.select('blue').gt(0)).and(image.select('green').gt(0)).and(image.select('red').gt(0))
.and(image.select('nir').gt(0)).and(image.select('swir1').gt(0)).and(image.select('swir2').gt(0))
.and(image.select('blue').lt(2500)).and(image.select('green').lt(10000)).and(image.select('red').lt(10000))
.and(image.select('nir').lt(10000)).and(image.select('swir1').lt(10000)).and(image.select('swir2').lt(10000))
.focal_min(cloud_buffer,'circle','meters',1);
return image.updateMask(mask).divide(10000).copyProperties(image,['system:time_start','system:time_end']);}
//////////////////////////
function frecuencia(image) {
var cloudShadowBitMask = ee.Number(2).pow(3).int();
var cloudsBitMask = ee.Number(2).pow(5).int();
var qa = image.select('pixel_qa');
var cloud_buffer=300;
var mask = 
    (qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0)))
.and(image.select('blue').gt(0)).and(image.select('green').gt(0)).and(image.select('red').gt(0))
.and(image.select('nir').gt(0)).and(image.select('swir1').gt(0)).and(image.select('swir2').gt(0))
.and(image.select('blue').lt(2500)).and(image.select('green').lt(10000)).and(image.select('red').lt(10000))
.and(image.select('nir').lt(10000)).and(image.select('swir1').lt(10000)).and(image.select('swir2').lt(10000))
.focal_min(cloud_buffer,'circle','meters',1);
return mask.eq(1)}
/////////////////////////// Images  ////////////////////////////////
var rgbVis = {min: [0,0.05,0.02], max: [0.18,0.6,0.35],bands: ['swir2','nir','red'],};
var visFun = function(img) {return img.visualize(rgbVis).copyProperties(img, img.propertyNames());};
/////////////////////////// Images  ////////////////////////////////
var addnbr = function(image) {var nbr = image.normalizedDifference(['swir1','nir']).rename('nbr');
return image.addBands(nbr)};
function umbral(image) {
var maska = image.select('nbr').gt(0).and(image.select('blue').lt(0.15))
return image.updateMask(maska).copyProperties(image,['system:time_start','system:time_end'])}
function showmedoide(inCollection,medoidIncludeBands) {
  var f = ee.Image(inCollection.first());
  var bandNames = f.bandNames();
  var bandNumbers = ee.List.sequence(1,bandNames.length());
  if (medoidIncludeBands === undefined || medoidIncludeBands === null) {
  medoidIncludeBands = bandNames;}
  var median = inCollection.select(medoidIncludeBands).median();
  var medoid = inCollection.map(function(img){
  var diff = ee.Image(img).select(medoidIncludeBands).subtract(median).pow(ee.Image.constant(2));
  return diff.reduce('sum').addBands(img)})
  medoid = ee.ImageCollection(medoid).reduce(ee.Reducer.min(bandNames.length().add(1))).select(bandNumbers,bandNames);
  return medoid;}
function shownbr(img){return ee.ImageCollection([img.map(addnbr).median().select('blue','green','red','nir','swir1','swir2','nbr'),img.map(addnbr).map(umbral).qualityMosaic('nbr').select('blue','green','red','nir','swir1','swir2','nbr')]).mosaic()}
function showMax(img){return img.max();}
function showMean(img){return img.mean();}
function showMedian(img){return img.median();}
function showMin(img){return img.min();}
function showSum(img){ return img.sum(); }
var showLayer = function() {
  var pathh = app.intro.text_path.getValue()
  var roww  = app.intro.text_row.getValue()
  var cuadrante = table.filter(ee.Filter.eq('CUADRANTE',pathh+'_'+roww));
  var startD = app.intro.text_sd.getValue();
  var endD   = app.intro.text_ed.getValue();
  Map.layers().reset();
  app.intro.chart_panel.clear();
  app.intro.legend.clear()
  //app.intro.legend2.clear()
  var Landsat_path_row =  landsat.filter(ee.Filter.or(ee.Filter.and(ee.Filter.eq('WRS_PATH', ee.Number.parse(pathh)),ee.Filter.eq('WRS_ROW', ee.Number.parse(roww))))).filterDate(startD,endD).map(sombraynube)
  var Landsat_path_row_frecuencia =  landsat.filter(ee.Filter.or(ee.Filter.and(ee.Filter.eq('WRS_PATH', ee.Number.parse(pathh)),ee.Filter.eq('WRS_ROW', ee.Number.parse(roww))))).filterDate(startD,endD).map(frecuencia)
   var bare_soil = Landsat_path_row;
 Map.centerObject(cuadrante,9)
 Map.addLayer(showmedoide(bare_soil,['blue', 'green', 'red', 'nir', 'swir1', 'swir2']).clip(cuadrante), rgbVis, 'Medioide'); 
 Map.addLayer(shownbr(bare_soil).clip(cuadrante), rgbVis, 'Maximo NBR'); 
 Map.addLayer(showMedian(bare_soil).clip(cuadrante), rgbVis, 'Mediana'); 
  Map.addLayer(showMin(bare_soil).clip(cuadrante), rgbVis, 'Minimo'); 
  Map.addLayer(showMax(bare_soil).clip(cuadrante), rgbVis, 'Maximo'); 
  Map.addLayer(showMean(bare_soil).clip(cuadrante), rgbVis, 'Promedio');  
    var paleta =['#000000','#ff7070','#ff4141','#ff0000','#ad0000','#08ffff','#0497ff','#0451ff','#1b00ff','#91ffa4','#54ff71','#0eff2b','#066a12','#efff00','#b8c400','#868f00','#626800','#ffaa2b','#b87b1f','#855917','#50350e','#ff00e0','#a90094','#780069']
var Paleta = {min: 0, max: 23, palette:paleta};
  Map.addLayer(Landsat_path_row_frecuencia.sum().select('pixel_qa').rename('frecuencia').clip(cuadrante), Paleta, 'Frecuencia'); 
var legendTitle = ui.Label({value: 'FRECUENCIA',style: {backgroundColor:'#cefff4',fontWeight: 'bold',fontSize: '12px',margin: '0 0 5px 5px',padding: '0'}});
app.intro.legend.add(legendTitle);
var makeRow = function(color, name) {
var colorBox = ui.Label({style: {backgroundColor: '#' + color,padding: '8px 15px',margin: '0 5px 4px 8px'}});
var description = ui.Label({value: name,style: {backgroundColor:'#cefff4',margin: '0 0 4px 6px'}});
return ui.Panel({style: {backgroundColor:'#cefff4'},widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});};
var palette =['000000','ff7070','ff4141','ff0000','ad0000','08ffff','0497ff','0451ff','1b00ff','91ffa4','54ff71','0eff2b','066a12','efff00','b8c400','868f00','626800','ffaa2b','b87b1f','855917','50350e','ff00e0','a90094','780069'];
var names = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
for (var i = 0; i < 24; i++) {app.intro.legend.add(makeRow(palette[i], names[i]));}  
Map.add(app.intro.legend)
// app.intro.legend2.add(app.intro.inspector);
// Map.add(app.intro.legend2);
// function showhela(hela){
// app.intro.inspector.clear();
// var titleLabel = ui.Label({value: "FRECUENCIA: ",style: {fontWeight: "bold",stretch: "vertical"}})
// var helaLabel = ui.Label(hela +' '+ ' Imágenes', {stretch: "vertical"});
// var closeButton = ui.Button("Cerrar", function(){
// app.intro.inspector.clear();
// app.intro.inspector.style().set("shown",false);})
// app.intro.inspector.add(titleLabel);
// app.intro.inspector.add(helaLabel);
// app.intro.inspector.add(closeButton);}
// function inspect(coords){
// app.intro.inspector.clear();
// app.intro.inspector.style().set("shown", true);
// var pt = ee.Geometry.Point(coords.lon, coords.lat)
// var datos = Landsat_path_row_frecuencia.sum().select('pixel_qa').rename('frecuencia').clip(cuadrante).reduceRegion({reducer: ee.Reducer.first(),geometry: pt,scale: 30}).get("frecuencia");
// datos.evaluate(showhela)}
// Map.onClick(inspect);
Map.setOptions("HYBRID")
}
app.createPanels = function(){
  app.intro = {
   panelpncb: ui.Panel ([ui.Label({value: 'Programa Nacional de Conservación de Bosques',style: {fontWeight: 'bold', fontSize: '20px', margin: '5px 5px',textAlign: 'justify'}}),ui.Label({value:'Este App genera 6 compuestos temporales (Promedio, Máximo, Mínimo, Mediana, Máximo NBR y Medioide) por cuadrantes de las imagenes Landsat 5 y 7 (Reflectancia de Superficie).',style: {fontSize: '14px',margin: '15px 10px 0px 10px',color: 'blue',textAlign: 'justify'}})]),
  legend : ui.Panel({style: {backgroundColor:'#cefff4',position: 'bottom-right',padding: '8px 15px',border: '2px solid black'}}),
  legend2 : ui.Panel({style: {position: 'bottom-left'}}),
inspector : ui.Panel([ui.Label("FRECUENCIA")],ui.Panel.Layout.flow("horizontal")),
   web : ui.Panel([ui.Label('http://www.bosques.gob.pe',{color: 'blue',fontWeight: 'bold',fontSize: '15px', margin: '8px 0 0px 140px'}).setUrl('http://www.bosques.gob.pe')]),
     logominam:ui.Thumbnail({image:logo2,params:{bands:['b1','b2','b3'],min:0,max:255},style:{backgroundColor:'#cefff4', border: '1px solid black', margin: '0px 0px 0px 100px'}}),
      date_label0: ui.Label ({value: '----------------------------------------------------------------------------------------------------------------------',style: {margin: '15px 0px 0px 0px',textAlign: 'justify'}}),
       date_label: ui.Label ({value: '1) Selecciona el Cuadrante y Rango de Fecha',style: {fontWeight: 'bold'}}),
    text_path: ui.Textbox({placeholder: '',value: '2',style: {margin: '15px 15px 0px 220px',fontWeight: 'bold',border: '1px solid black', fontSize: '12px', color: 'black',width:'40px'}}),
    text_row : ui.Textbox({placeholder: '',value: '69',style: {margin: '15px 15px 0px 220px',fontWeight: 'bold',border: '1px solid black', fontSize: '12px', color: 'black',width:'40px'}}),
   start_date_label_path: ui.Label({value: 'Path',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 220px'}}),
   start_date_label_row : ui.Label({value: 'Row',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 220px'}}),
    start_date_label: ui.Label({value: 'Inicio',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 220px'}}),
    text_sd: ui.Textbox({placeholder: 'YYYY-MM-DD',value: '1998-01-01',style: {margin: '15px 15px 0px 190px',fontWeight: 'bold',border: '1px solid black', fontSize: '12px', color: 'black',width:'90px'}}),
    end_date_label: ui.Label({value: 'Fin',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 220px'}}),
    text_ed: ui.Textbox({placeholder: 'YYYY-MM-DD',value: '1998-12-31',style: {margin: '15px 15px 0px 190px',fontWeight: 'bold',border: '1px solid black', fontSize: '12px', color: 'black',width:'90px'}}),
    //reducer_label: ui.Label ({value: 'TIPO DE COMPUESTO',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 110px'}}),
    //reducer_select: ui.Select ({placeholder:'Elegir',items: Object.keys(images),style: {width: '190px',border: '1px solid black', margin: '15px 15px 0px 100px'}}),
    reducer_label1: ui.Label ({value: 'Iniciar Proceso',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 190px'}}),
    button: ui.Button({label: 'Ejecutar',onClick: showLayer,style: {color: 'green',border: '1px solid black', margin: '15px 15px 0px 200px'}}),
    chart_panel: ui.Panel(),
    points_label_frecuencia: ui.Label ({value: '3) Datos disponibles',style: {fontWeight: 'bold', margin: '30px 0px 5px 10px'}}),
    points_label: ui.Label ({value: '2) Identifique el compuesto que mejor detecta la pérdida de Bosque',style: {fontWeight: 'bold', margin: '30px 0px 5px 10px'}}),
    points_ejemplo: ui.Label ({value: 'a = Promedio, b = Maximo, c = Minimo, d = Mediana, f = Maximo NBR , g = Medioide ',style: {color:'green',fontWeight: 'bold',fontSize:'12px', margin: '0px 0px 5px 10px'}}),
    latitude_panel: ui.Panel([ui.Label ({value: 'Latitud:',style: {color:'red', fontWeight: 'bold', fontSize:'12px',margin: '15px 15px 0px 10px'}}),
    lat_coords = ui.Textbox ({value: '',style: {color:'#5f9ea0', fontSize:'9px', fontWeight: 'bold', width: '120px'}})], ui.Panel.Layout.flow('horizontal')),
    longitude_panel: ui.Panel([ui.Label ({value: 'Longitud:',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 10px'}}),
    long_coords = ui.Textbox ({value: '',style: {color:'#5f9ea0', fontSize:'9px', fontWeight: 'bold', width: '120px'}})], ui.Panel.Layout.flow('horizontal')),
    point_name_panel : ui.Panel([ ui.Label ({value: 'Observación',style: {color:'red', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 10px'}}),  
    point_name = ui.Textbox ({placeholder: ' ',style: {color:'#5f9ea0', fontSize:'9px', fontWeight: 'bold'}})], ui.Panel.Layout.flow('horizontal')),
    button_panel: ui.Panel([ui.Button({label: 'Agregar',onClick: addPointToTable,style: {color: '#545aa7', margin: '15px 10px 0px 5px'}}),], ui.Panel.Layout.flow('horizontal')),
       points_label2: ui.Label ({value: '3) Seleccione el formato de salida para la descarga',style: {fontWeight: 'bold', margin: '20px 0px 5px 10px'}}),
   button_panel2: ui.Panel([ui.Panel([checkboxCSV = ui.Checkbox({label: 'CSV',value: false,style: {fontSize:'12px', margin: '10px 15px 0px 150px'}}),], 
    ui.Panel.Layout.flow('vertical'))]),
    download_label: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    download_label2: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    download_label3: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    download_label4: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    download_label5: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    download_label6: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    download_label7: ui.Label ({value: '',style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}}),
    url_label: ui.Label ({value: '',style: {color:'#acacac', fontSize:'9px', margin: '10px 15px 0px 10px'}}),
  };
};
app.boot = function(){
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.logominam,
      app.intro.web,
      app.intro.panelpncb,
      //app.intro.logopncb,
      //app.intro.panel,
      app.intro.date_label0,
      app.intro.date_label,
      app.intro.start_date_label_path,
      app.intro.text_path,
      app.intro.start_date_label_row,
      app.intro.text_row,
      app.intro.start_date_label,
      app.intro.text_sd,
      app.intro.end_date_label,
      app.intro.text_ed,
     // app.intro.reducer_label,
      //app.intro.reducer_select,
      app.intro.reducer_label1,
      app.intro.button,
     app.intro.chart_panel,
      app.intro.points_label,
      app.intro.points_ejemplo,
      app.intro.latitude_panel,
      app.intro.longitude_panel,
      //app.intro.buffer_size_panel,
      app.intro.point_name_panel,
      app.intro.button_panel, 
      app.intro.download_label2,
      app.intro.download_label3,
      app.intro.download_label4,
      app.intro.download_label5,
      app.intro.download_label6,
      app.intro.download_label7,
      app.intro.points_label2,
      app.intro.button_panel2, 
      app.intro.download_label,
    ],
    style: {width: '500px', padding: '10px'}
  });
  //Map.setCenter(23.8, 46.98);
  ui.root.insert(0,main);
};
app.boot();
//////////////////////////////////////////////////////////////////////////////////
  Map.onClick(function(coords) {
  lat_coords.setValue(coords.lat.toFixed(6));
  long_coords.setValue(coords.lon.toFixed(6));
  point_name.setValue('');
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(7, dot);});
  Map.style().set('cursor', 'crosshair');
  var point_list = ee.List([]);
  function addPointToTable(){
    var features = ee.Feature(null, {"Tiempo": app.intro.text_sd.getValue(), "Path":app.intro.text_path.getValue(),"Row":app.intro.text_row.getValue(),"Observacion": point_name.getValue(),"Longitud": long_coords.getValue(),"Latitud": lat_coords.getValue()});
    point_list = point_list.add(features);
    var coll = ee.FeatureCollection(point_list);
    checkboxCSV.onChange(function(checked) {
    if (checked) {app.intro.download_label.setValue('DESCARGAR').style().set({fontWeight: 'bold',    fontSize: '15px',color: "white", padding: '10px 10px 10px 10px', margin: '10px 15px 0px 120px',border: "thick double #312D2C", backgroundColor: "#F3EBE9",});
      var url_indice = ee.data.makeTableDownloadUrl(ee.data.getTableDownloadId({table: coll, format: 'CSV', filename: 'Observaciones'}))
      app.intro.download_label.setUrl(url_indice);}});
    var lat_json = ee.String(lat_coords.getValue()).decodeJSON();
    var lon_json = ee.String(long_coords.getValue()).decodeJSON();
    var Numero_de_banda =ee.Dictionary({L8: ee.List([1,2,3,4,5,6,7,10]), L7: ee.List([0,1,2,3,4,6,5,9]),L5: ee.List([0,1,2,3,4,6,5,9]),L4: ee.List([0,1,2,3,4,6,5,9])});
var Nombre_de_banda = ee.List(['blue','green','red','nir','swir1','swir2','temp','pixel_qa']);
var landsat5 = (ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').select(Numero_de_banda.get('L5'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY' , 9))
var landsat7 = (ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').select(Numero_de_banda.get('L7'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY' , 9)).filter(ee.Filter.inList('system:index', ['LE07_004069_20000802']).not());
var landsat = landsat5.merge(landsat7);
//////////////////////////
function sombraynube(image) {
var cloudShadowBitMask = ee.Number(2).pow(3).int();
var cloudsBitMask = ee.Number(2).pow(5).int();
var qa = image.select('pixel_qa');
var cloud_buffer=300;
var mask = 
    (qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0)))
.and(image.select('blue').gt(0)).and(image.select('green').gt(0)).and(image.select('red').gt(0))
.and(image.select('nir').gt(0)).and(image.select('swir1').gt(0)).and(image.select('swir2').gt(0))
.and(image.select('blue').lt(2500)).and(image.select('green').lt(10000)).and(image.select('red').lt(10000))
.and(image.select('nir').lt(10000)).and(image.select('swir1').lt(10000)).and(image.select('swir2').lt(10000))
.focal_min(cloud_buffer,'circle','meters',1);
return image.updateMask(mask).divide(10000).copyProperties(image,['system:time_start','system:time_end']);}
//////////////////////////
var rgbVis = {min: [0,0.05,0.02], max: [0.18,0.6,0.35],bands: ['swir2','nir','red'],};
var visFun = function(img) {return img.visualize(rgbVis).copyProperties(img, img.propertyNames());};
/////////////////////////// Images  ////////////////////////////////
var addnbr = function(image) {var nbr = image.normalizedDifference(['swir1','nir']).rename('nbr');
return image.addBands(nbr)};
function umbral(image) {
var maska = image.select('nbr').gt(0).and(image.select('blue').lt(0.15))
return image.updateMask(maska).copyProperties(image,['system:time_start','system:time_end'])}
function showmedoide(inCollection,medoidIncludeBands) {
  var f = ee.Image(inCollection.first());
  var bandNames = f.bandNames();
  var bandNumbers = ee.List.sequence(1,bandNames.length());
  if (medoidIncludeBands === undefined || medoidIncludeBands === null) {
  medoidIncludeBands = bandNames;}
  var median = inCollection.select(medoidIncludeBands).median();
  var medoid = inCollection.map(function(img){
  var diff = ee.Image(img).select(medoidIncludeBands).subtract(median).pow(ee.Image.constant(2));
  return diff.reduce('sum').addBands(img)})
  medoid = ee.ImageCollection(medoid).reduce(ee.Reducer.min(bandNames.length().add(1))).select(bandNumbers,bandNames);
  return medoid;}
function shownbr(img){return ee.ImageCollection([img.map(addnbr).median().select('blue','green','red','nir','swir1','swir2','nbr'),img.map(addnbr).map(umbral).qualityMosaic('nbr').select('blue','green','red','nir','swir1','swir2','nbr')]).mosaic()}
function showMax(img){return img.max();}
function showMean(img){return img.mean();}
function showMedian(img){return img.median();}
function showMin(img){return img.min();}
function showSum(img){ return img.sum(); }
var pathh = app.intro.text_path.getValue()
var roww  = app.intro.text_row.getValue()
var cuadrante = table.filter(ee.Filter.eq('CUADRANTE',pathh+'_'+roww));
var startD = app.intro.text_sd.getValue();
var endD   = app.intro.text_ed.getValue();
var Landsat_path_row =  landsat.filter(ee.Filter.or(ee.Filter.and(ee.Filter.eq('WRS_PATH', ee.Number.parse(pathh)),ee.Filter.eq('WRS_ROW', ee.Number.parse(roww))))).filterDate(startD,endD).map(sombraynube)
var bare_soil = Landsat_path_row;
var thumbnailshownbr = shownbr(bare_soil).clip(cuadrante).getThumbURL({region: ee.Geometry.Point([lon_json, lat_json]).buffer(12000),crs:'EPSG:4326',scale: 30,bands: ['swir2','nir','red'],  gamma: 1.4,format: 'png',filename: 'uno',min: [0,0.05,0.02], max: [0.18,0.6,0.35]});
var thumbnailshowMax = showMax(bare_soil).clip(cuadrante).getThumbURL({region: ee.Geometry.Point([lon_json, lat_json]).buffer(12000),crs:'EPSG:4326',scale: 30,bands: ['swir2','nir','red'],  gamma: 1.4,format: 'png',min: [0,0.05,0.02], max: [0.18,0.6,0.35]});
var thumbnailshowMean = showMean(bare_soil).clip(cuadrante).getThumbURL({region: ee.Geometry.Point([lon_json, lat_json]).buffer(12000),crs:'EPSG:4326',scale: 30,bands: ['swir2','nir','red'],  gamma: 1.4,format: 'png',min: [0,0.05,0.02], max: [0.18,0.6,0.35]});
var thumbnailshowMedian = showMedian(bare_soil).clip(cuadrante).getThumbURL({region: ee.Geometry.Point([lon_json, lat_json]).buffer(12000),crs:'EPSG:4326',scale: 30,bands: ['swir2','nir','red'],  gamma: 1.4,format: 'png',min: [0,0.05,0.02], max: [0.18,0.6,0.35]});
var thumbnailshowMin = showMin(bare_soil).clip(cuadrante).getThumbURL({region: ee.Geometry.Point([lon_json, lat_json]).buffer(12000),crs:'EPSG:4326',scale: 30,bands: ['swir2','nir','red'],  gamma: 1.4,format: 'png',min: [0,0.05,0.02], max: [0.18,0.6,0.35]});
var thumbnailshowmedoide = showmedoide(bare_soil).clip(cuadrante).getThumbURL({region: ee.Geometry.Point([lon_json, lat_json]).buffer(12000),crs:'EPSG:4326',scale: 30,bands: ['swir2','nir','red'],  gamma: 1.4,format: 'png',min: [0,0.05,0.02], max: [0.18,0.6,0.35]});
var regionJSON = JSON.stringify(ee.Geometry.Point([lon_json, lat_json]).buffer(10000).getInfo());
app.intro.download_label2.setValue('MEDIODE').style().set({fontWeight: 'bold',fontSize: '10px',color: "white", padding: '5px 5px 5px 5px', margin: '10px 15px 0px 60px',border: "1px solid black", backgroundColor: "yellow",});
var parametros2 = {name:lat_coords.getValue()+'  '+long_coords.getValue()+'  MEDIODE',scale: 30,region: regionJSON,fileFormat: 'GeoTIFF', filePerBand:false }
var url_indice2 = ee.Image(showmedoide(bare_soil).clip(cuadrante).select('swir2','nir','red')).getDownloadURL(parametros2);
app.intro.download_label2.setUrl(url_indice2);
app.intro.download_label3.setValue('MÁXIMO').style().set({fontWeight: 'bold',fontSize: '10px',color: "white", padding: '5px 5px 5px 5px', margin: '-25px 15px 0px 120px',border: "1px solid black", backgroundColor: "yellow",});
var parametros3 = {name:lat_coords.getValue()+'  '+long_coords.getValue()+'  MÁXIMO',scale: 30,region: regionJSON,fileFormat: 'GeoTIFF', filePerBand:false }
var url_indice3 = ee.Image(showMax(bare_soil).clip(cuadrante).select('swir2','nir','red')).getDownloadURL(parametros3);
app.intro.download_label3.setUrl(url_indice3);
app.intro.download_label4.setValue('MÍNIMO').style().set({fontWeight: 'bold',fontSize: '10px',color: "white", padding: '5px 5px 5px 5px', margin: '-25px 15px 0px 178px',border: "1px solid black", backgroundColor: "yellow",});
var parametros4 = {name:lat_coords.getValue()+'  '+long_coords.getValue()+'  MÍNIMO',scale: 30,region: regionJSON,fileFormat: 'GeoTIFF', filePerBand:false }
var url_indice4 = ee.Image(showMin(bare_soil).clip(cuadrante).select('swir2','nir','red')).getDownloadURL(parametros4);
app.intro.download_label4.setUrl(url_indice4);
app.intro.download_label5.setValue('PROMEDIO').style().set({fontWeight: 'bold',fontSize: '10px',color: "white", padding: '5px 5px 5px 5px', margin: '-25px 15px 0px 232px',border: "1px solid black", backgroundColor: "yellow",});
var parametros5 = {name:lat_coords.getValue()+'  '+long_coords.getValue()+'  PROMEDIO',scale: 30,region: regionJSON,fileFormat: 'GeoTIFF', filePerBand:false }
var url_indice5 = ee.Image(showMean(bare_soil).clip(cuadrante).select('swir2','nir','red')).getDownloadURL(parametros5);
app.intro.download_label5.setUrl(url_indice5);
app.intro.download_label6.setValue('MEDIANA').style().set({fontWeight: 'bold',fontSize: '10px',color: "white", padding: '5px 5px 5px 5px', margin: '-25px 15px 0px 298px',border: "1px solid black", backgroundColor: "yellow",});
var parametros6 = {name:lat_coords.getValue()+'  '+long_coords.getValue()+'  MEDIANA',scale: 30,region: regionJSON,fileFormat: 'GeoTIFF', filePerBand:false }
var url_indice6 = ee.Image(showMedian(bare_soil).clip(cuadrante).select('swir2','nir','red')).getDownloadURL(parametros6);
app.intro.download_label6.setUrl(url_indice6);
app.intro.download_label7.setValue('MÁXIMO NBR').style().set({fontWeight: 'bold',fontSize: '10px',color: "white", padding: '5px 5px 5px 5px', margin: '-25px 15px 0px 360px',border: "1px solid black", backgroundColor: "yellow",});
var parametros7 = {name:lat_coords.getValue()+'  '+long_coords.getValue()+'  MÁXIMO NBR',scale: 30,region: regionJSON,fileFormat: 'GeoTIFF', filePerBand:false }
var url_indice7 = ee.Image(shownbr(bare_soil).clip(cuadrante).select('swir2','nir','red')).getDownloadURL(parametros7);
app.intro.download_label7.setUrl(url_indice7);
Map.addLayer(ee.Geometry.Point([lon_json, lat_json]), {color: 'yellow'},point_name.getValue());
return point_list;}
//////////////////////////////////////////////////////////////////////////////////