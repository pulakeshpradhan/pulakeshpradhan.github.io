var logo = ui.import && ui.import("logo", "image", {
      "id": "users/estimacionesmagyp/min_agricultura_ganaderia"
    }) || ee.Image("users/estimacionesmagyp/min_agricultura_ganaderia"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/estimacionesmagyp/CITIRICOSCOMPLETO"
    }) || ee.FeatureCollection("users/estimacionesmagyp/CITIRICOSCOMPLETO"),
    provincias = ui.import && ui.import("provincias", "table", {
      "id": "users/estimacionesmagyp/PROVINCIAS"
    }) || ee.FeatureCollection("users/estimacionesmagyp/PROVINCIAS"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/estimacionesmagyp/DepartamentosIGN2023"
    }) || ee.FeatureCollection("users/estimacionesmagyp/DepartamentosIGN2023"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/estimacionesmagyp/recDel3ARROYOS9x8g23"
    }) || ee.Image("users/estimacionesmagyp/recDel3ARROYOS9x8g23"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/estimacionesmagyp/recDelTANDIL9x8g2223"
    }) || ee.Image("users/estimacionesmagyp/recDelTANDIL9x8g2223"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/estimacionesmagyp/recDelPIGUEg23_9x8"
    }) || ee.Image("users/estimacionesmagyp/recDelPIGUEg23_9x8"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/estimacionesmagyp/madariagag2223"
    }) || ee.Image("users/estimacionesmagyp/madariagag2223"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/estimacionesmagyp/LAPLATAg2223"
    }) || ee.Image("users/estimacionesmagyp/LAPLATAg2223"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/estimacionesmagyp/recVillegasg2223"
    }) || ee.Image("users/estimacionesmagyp/recVillegasg2223"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/estimacionesmagyp/recPehuajog2223"
    }) || ee.Image("users/estimacionesmagyp/recPehuajog2223"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/estimacionesmagyp/recPICOg23"
    }) || ee.Image("users/estimacionesmagyp/recPICOg23"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/estimacionesmagyp/recVenadog2223"
    }) || ee.Image("users/estimacionesmagyp/recVenadog2223"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/estimacionesmagyp/recGomezg2223"
    }) || ee.Image("users/estimacionesmagyp/recGomezg2223"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/estimacionesmagyp/recBBlancag23"
    }) || ee.Image("users/estimacionesmagyp/recBBlancag23"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Rclas_AvellanedaG22-23"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Rclas_AvellanedaG22-23"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Reclas_MJG22-23"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Reclas_MJG22-23"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/estimacionesmagyp/reclasSROSAg2223"
    }) || ee.Image("users/estimacionesmagyp/reclasSROSAg2223"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/estimacionesmagyp/DelegacionesIGN23geo"
    }) || ee.FeatureCollection("users/estimacionesmagyp/DelegacionesIGN23geo"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Reclass_Gr2223_Salta_Anta"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Reclass_Gr2223_Salta_Anta"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/estimacionesmagyp/SALIQUELOGRUESA2223"
    }) || ee.Image("users/estimacionesmagyp/SALIQUELOGRUESA2223"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/estimacionesmagyp/Roca2223"
    }) || ee.Image("users/estimacionesmagyp/Roca2223"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/estimacionesmagyp/SaenzPena2223"
    }) || ee.Image("users/estimacionesmagyp/SaenzPena2223");
var roi1 = provincias.filterMetadata("NAM","equals","BUENOS AIRES");
//////////////////////////////////////////////////////////////////////////////////////////////
Map.setCenter(-61.132, -33.133, 6);
//***************************************************************************************************************
//VISUALIZACION EN UNA SOLA CAPA  IMAGECOLLECTION
// Crea una lista de imágenes
var listaImagenes = [image5, image3, image6, image7, image8, 
                     image4, image10, image11, image12, image9, 
                     image13, image15, image16, image14, image17,image,
                     image2, image18];
// Convierte la lista en una ImageCollection
var imageCollection = ee.ImageCollection(listaImagenes);
// Puedes imprimir la colección para verificarla
print("Image Collection:", imageCollection);
// Create and define visualization parameters and display ImageCollection
var paleta =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#3b3b98','#fd7272','#82589f','#d6a2e8','#f97f51','#eab543','#1b9cfc','#58b19f','#6d214f','#182c61','#FF3333','#9aecdb','#bdc581','#f8efba','#fc427b','#cad3c8'];   
Map.addLayer(imageCollection, {min:1, max:21, palette: paleta}, 'Mosaico 2023',1);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var l8 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterDate('2022-08-30', '2023-06-30')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5));
    var ndvi = l8.map(function(image) {
      return image.select().addBands(image.normalizedDifference(['B8','B4'])).rename("NDVI");});
    var panel = ui.Panel();
    panel.style().set('width', '300px');
    var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'200px',height:'60px'}});
        panel.add(branding);
    var intro = ui.Panel([
      ui.Label({value: 'NDVI Campaña 22/23',
        style: {fontSize: '20px', fontWeight: 'bold'}  }),
      ui.Label('Realice click sobre un lote.')]);
    panel.add(intro);
    var lat = ui.Label();
    var lon = ui.Label();
    panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
    Map.onClick(function(coords) {
      lat.setValue('lat: ' + coords.lat.toFixed(5)),
      lon.setValue('lon: ' + coords.lon.toFixed(5));
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var dot = ui.Map.Layer(point, {color: 'FF0000'});
      Map.layers().set(1, dot);
      var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
      ndviChart.setOptions({
        title: 'NDVI Serie de Tiempo',vAxis: {title: 'NDVI', gridlines: {count: 6}},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        lineWidth: 2,
        pointSize: 3,
        colors:["green"],
      });  panel.widgets().set(2, ndviChart);});
    Map.style().set('cursor', 'crosshair')
    ui.root.insert(0, panel);
//*******************************************************************************************************************
// Define an SLD style of discrete intervals to apply to the image.
/*
var paleta =
'<RasterSymbolizer>' +
  '<ColorMap type="values" extended="false">' +
    '<ColorMapEntry color="#499445" quantity="0" label="no data" opacity="0"/>' +
    '<ColorMapEntry color="#499445" quantity="1" label="Soja"/>' +
    '<ColorMapEntry color="#eaea59" quantity="2" label="Maiz"/>' +
    '<ColorMapEntry color="#fea458" quantity="3" label="Girasol"/>' +
    '<ColorMapEntry color="#b33771" quantity="4" label="Sorgo"/>' +
    '<ColorMapEntry color="#55e6c1" quantity="5" label="Mani"/>' +
    '<ColorMapEntry color="#3b3b98" quantity="6" label="Algodon"/>' +
    '<ColorMapEntry color="#fd7272" quantity="7" label="Arroz"/>' +
    '<ColorMapEntry color="#82589f" quantity="8" label="Poroto"/>' +
    '<ColorMapEntry color="#d6a2e8" quantity="9" label="Caña de azucar"/>' +
    '<ColorMapEntry color="#f97f51" quantity="10" label="Cereales de invierno"/>' +
    '<ColorMapEntry color="#eab543" quantity="11" label="Legumbres de invierno"/>' +
    '<ColorMapEntry color="#1b9cfc" quantity="12" label="Colza"/>' +
    '<ColorMapEntry color="#58b19f" quantity="13" label="Lino"/>' +
    '<ColorMapEntry color="#6d214f" quantity="14" label="Tabaco"/>' +
    '<ColorMapEntry color="#182c61" quantity="15" label="Cultivos de cobertura"/>' +
    '<ColorMapEntry color="#9aecdb" quantity="17" label="Otros cultivos"/>' +
    '<ColorMapEntry color="#bdc581" quantity="18" label="Recursos forrajeros"/>' +
    '<ColorMapEntry color="#f8efba" quantity="19" label="Barbecho y forraje"/>' +
    '<ColorMapEntry color="#fc427b" quantity="20" label="Frutales"/>' +
    '<ColorMapEntry color="#cad3c8" quantity="21" label="No agricola" opacity="0"/>' +
      '</ColorMap>' +
'</RasterSymbolizer>';
Map.addLayer(listaImagenes.sldStyle(paleta), {}, 'Mosaico 2023',1);*/
//////////////////////////////////////////////  IMAGENES GRUESA 2023 //////////////////////////////////////////////////////////////////////////////////
/*
// Create and define visualization parameters and display deleg. Tandil
var paleta55 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMaskeda = image3.updateMask(image3.lte(21));
Map.addLayer(imglpMaskeda, {min: 1, max: 21, palette: paleta55}, 'Deleg. Tandil');
// Create and define visualization parameters and display deleg. Lincoln
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMasked = image4.updateMask(image4.lte(21));
Map.addLayer(imglpMasked, {min: 1, max: 21, palette: paleta6}, 'Deleg. Lincoln');
// Create and define visualization parameters and display deleg. Pehuajo
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMaskedU = image10.updateMask(image10.lte(21));
Map.addLayer(imglpMaskedU, {min: 1, max: 21, palette: paleta6}, 'Deleg. Pehuajó');
// Create and define visualization parameters and display deleg. Venado Tuerto
var imglpMaskedUps = image12.updateMask(image12.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. V.Tuerto');
// Create and define visualization parameters and display deleg. General Pico
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMaskedUx = image11.updateMask(image11.lte(21));
Map.addLayer(imglpMaskedUx, {min: 1, max: 21, palette: paleta6}, 'Deleg. Gal. Pico');
// Create and define visualization parameters and display deleg. Santa Rosa
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMaskedUxk = image14.updateMask(image14.lte(21));
Map.addLayer(imglpMaskedUxk, {min: 1, max: 21, palette: paleta6}, 'Deleg. Santa Rosa');
// Create and define visualization parameters and display deleg. Tres Arroyos
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMasked = image5.updateMask(image5.lte(21));
Map.addLayer(imglpMasked, {min: 1, max: 21, palette: paleta6}, 'Deleg. Tres Arroyos');
// Create and define visualization parameters and display deleg. B.Blanca
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMaskedsi = image13.updateMask(image13.lte(21));
Map.addLayer(imglpMaskedsi, {min: 1, max: 21, palette: paleta6}, 'Deleg. B.Blanca');
// Create and define visualization parameters and display deleg. Pigue
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskeds = image6.updateMask(image6.lte(21));
Map.addLayer(image6, {min: 1, max: 21, palette: paleta6}, 'Deleg. Pigué');
// Create and define visualization parameters and display deleg. Pigue
var imgmadariaga = image7.updateMask(image7.lte(21));
Map.addLayer(imgmadariaga, {min: 1, max: 21, palette: paleta6}, 'Deleg. G.Madariaga');
// Create and define visualization parameters and display deleg. Pigue
var imglplata = image8.updateMask(image8.lte(21));
Map.addLayer(imglplata , {min: 1, max: 21, palette: paleta6}, 'Deleg. La Plata');
// Create and define visualization parameters and display deleg. Pigue
var imgcanadaga = image9.updateMask(image9.lte(21));
Map.addLayer(imgcanadaga, {min: 1, max: 21, palette: paleta6}, 'Deleg. Cañada de Gomez');
/*/
var empty1 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty1.paint({
  featureCollection: table,
  color: 0.5,
  width: 0.3
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos',1);
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table2,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Delegaciones SAGyP',1);
///////////////////////////////// Cartografía forestal 
var cartografia_plantaciones = ee.FeatureCollection( 'users/mgaute/macizos_mapa_fina')
/// Estilos borde cartografía 
//Map.addLayer(cartografia_plantaciones.draw({color: '330033', strokeWidth: 1}), {}, 'macizos');
var palette2 = ['FED90D'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 'FED90D',
});
//Map.addLayer(fills, {palette: palette2, max: 14}, 'Macizos');
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var Frutales= ee.FeatureCollection('users/estimacionesmagyp/CITIRICOSCOMPLETO');
var palette = ['fc427b'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: Frutales,
  color: 'fc427b',
});
Map.addLayer(fills, {palette: palette, max: 14}, 'Frutales');
// Cartografía forestal Cortinas
/// Estilos borde cartografía 
var cartografia_plantaciones_cortinas = ee.FeatureCollection( 'users/mgaute/cortinas_mapa_fina')
//Map.addLayer(cartografia_plantaciones_cortinas.draw({color: '330066', strokeWidth: 1}), {}, 'cortinas');
var palette1 = ['#f5cf00'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: cartografia_plantaciones_cortinas,
  color: '#f5cf00',
});
//Map.addLayer(fills, {palette: palette1, max: 14}, 'Cortinas');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Mapa de Cultivos,  Campaña Gruesa 2022-2023   v01' 
    , {fontWeight: 'bold', fontSize: '24px'}));
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("Color - Clase ",{fontWeight: 'bold', fontSize: '18px', color: 'black'});
legend.add(title);
legend.add(descr);
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
legend.add(makeRow('f8efba', 'Rastrojos y Barbechos'));
legend.add(makeRow('bdc581', 'Recursos Forrajeros'));
legend.add(makeRow('eaea59', 'Maíz'));
legend.add(makeRow('499445', 'Soja'));
legend.add(makeRow('fea458', 'Girasol'));
legend.add(makeRow('55e6c1', 'Maní'));
legend.add(makeRow('b33771', 'Sorgo granífero'));
legend.add(makeRow('b17eff', 'Caña de Azucar'));
legend.add(makeRow('9aecdb', 'Papa'));
legend.add(makeRow('00ae4c', 'Tabaco'));
//legend.add(makeRow('cad3c8', 'Bajos'));
legend.add(makeRow('cad3c8', 'No agrícola'));
legend.add(makeRow('fc427b', 'Frutales')); 
Map.add(legend);
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Estimaciones Agrícolas SAGyP', {fontSize: '10px', color: 'red'});
var text = ui.Label(
    'Clasificación de uso y coberturas en base a la verdad de terreno obtenida por las delegaciones SAGyP',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '100px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link2 = ui.Label(
    'DESCARGAS', {},
    'https://docs.google.com/document/d/1NYbMC13R2spZJzjBus_rOPwIgYxNbBOoycjisjzlOrQ/edit');
var link1 = ui.Label(
    'Informe Técnico', {},
    'https://www.magyp.gob.ar/sitio/areas/estimaciones/acerca_de/mapa_cultivo_fina/index.php');
var link = ui.Label(
    'Metodo de Segmentos Aleatorios', {},
    'https://www.magyp.gob.ar/sitio/areas/estimaciones/')
var linkPanel = ui.Panel(
    [ui.Label('Para mayor información', {fontWeight: 'bold'}), link, link1, link2]);
toolPanel.add(linkPanel);
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px',height:'50px'}});
        legend.add(branding);
var dires = ui.Label("Dirección de Estimaciones Agrícolas",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(dires);
/*
//Dirección Nacional de Desarrollo Foresto Industrial
var dires2 = ui.Label("Dirección Nacional de Desarrollo Foresto Industrial",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(dires2);
*/
/*
var image21 = image2.clip(roi1);
var image51 = image56.clip(roi1);
// Exportar imagen de clasificación
Export.image.toDrive({
  image:image21,
  description: 'bsassur',
  folder: 'my_folder',
  scale: 30,
  maxPixels: 1.0E13,
  region: roi1
});
*/
////////////////////////////////////////////////////////////////////////////////////