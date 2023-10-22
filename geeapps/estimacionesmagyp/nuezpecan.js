var logo = ui.import && ui.import("logo", "image", {
      "id": "users/estimacionesmagyp/min_agricultura_ganaderia"
    }) || ee.Image("users/estimacionesmagyp/min_agricultura_ganaderia"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/estimacionesmagyp/CITIRICOSCOMPLETO"
    }) || ee.FeatureCollection("users/estimacionesmagyp/CITIRICOSCOMPLETO"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/estimacionesmagyp/unitedsur"
    }) || ee.Image("users/estimacionesmagyp/unitedsur"),
    provincias = ui.import && ui.import("provincias", "table", {
      "id": "users/estimacionesmagyp/PROVINCIAS"
    }) || ee.FeatureCollection("users/estimacionesmagyp/PROVINCIAS"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/estimacionesmagyp/DepartamentosIGN2023"
    }) || ee.FeatureCollection("users/estimacionesmagyp/DepartamentosIGN2023"),
    total = ui.import && ui.import("total", "table", {
      "id": "users/estimacionesmagyp/DelegacionesSAGYP"
    }) || ee.FeatureCollection("users/estimacionesmagyp/DelegacionesSAGYP"),
    image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/25_mayo-reclass-g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/25_mayo-reclass-g_20-21"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Bragado_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Bragado_reclass_g_20-21"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Lincoln_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Lincoln_reclass_g_20-21"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/NOeste_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/NOeste_reclass_g_20-21"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/RCuarto_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/RCuarto_reclass_g_20-21"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/VENADO_TUERTO_reclasificacion"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/VENADO_TUERTO_reclasificacion"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/VMaria_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/VMaria_reclass_g_20-21"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/ee-estimacionesmagyp/assets/cartografia_forestal"
    }) || ee.FeatureCollection("projects/ee-estimacionesmagyp/assets/cartografia_forestal"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Salliquelo_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Salliquelo_reclass_g_20-21"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/madariaga_reclass_g_20-21_b"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/madariaga_reclass_g_20-21_b"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/reclass_laboulaye_G20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/reclass_laboulaye_G20-21"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/reclass_mjuarezG20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/reclass_mjuarezG20-21"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/TOTAL_DelPehuajo_G2021_Sieve8x8"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/TOTAL_DelPehuajo_G2021_Sieve8x8"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/La_Plata_reclass_g_20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/La_Plata_reclass_g_20-21"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/reclass_bolivarG20-21_b"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/reclass_bolivarG20-21_b"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/sdeG20-21"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/sdeG20-21"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_SFE_DelegAvellaneda"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_SFE_DelegAvellaneda"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_SFE_DelegRafaela"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_SFE_DelegRafaela"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_CHA_DelegCharata"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_CHA_DelegCharata"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_CHA_DelegRoqueSPenia"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Clasif_Gr2021_CHA_DelegRoqueSPenia"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/Tandil_G2021_UNIFICADO"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/Tandil_G2021_UNIFICADO"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/recSROSAg2021"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/recSROSAg2021"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "projects/ee-estimacionesmagyp/assets/recCanadaG2021"
    }) || ee.Image("projects/ee-estimacionesmagyp/assets/recCanadaG2021");
var roi1 = provincias.filterMetadata("NAM","equals","BUENOS AIRES");
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
Map.setCenter(-61.132, -33.133, 6);
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
      ui.Label({value: 'NDVI Campaña 20/21',
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
//////////////////////////////////////////////  IMAGENES GRUESA 2020-2021 //////////////////////////////////////////////////////////////////////////////////
// Create and define visualization parameters and display deleg. Tandil
//var paleta55 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskeda = image3.updateMask(image3.lte(21));
//Map.addLayer(imglpMaskeda, {min: 1, max: 21, palette: paleta55}, 'Deleg. Tandil');
// Create and define visualization parameters and display deleg. Lincoln
var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
var imglpMasked = image4.updateMask(image4.lte(21));
Map.addLayer(imglpMasked, {min: 1, max: 21, palette: paleta6}, 'Deleg. Lincoln');
// Create and define visualization parameters and display deleg. Pehuajo
//var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskedU = image10.updateMask(image10.lte(21));
//Map.addLayer(imglpMaskedU, {min: 1, max: 21, palette: paleta6}, 'Deleg. Pehuajó');
// Create and define visualization parameters and display deleg. Venado Tuerto
var imglpMaskedUps = image7.updateMask(image7.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. V. Tuerto');
// Create and define visualization parameters and display deleg. General Pico
//var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskedUx = image11.updateMask(image11.lte(21));
//Map.addLayer(imglpMaskedUx, {min: 1, max: 21, palette: paleta6}, 'Deleg. Gal. Pico');
// Create and define visualization parameters and display deleg. Santa Rosa
//var paleta6 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskedUxk = image14.updateMask(image14.lte(21));
//Map.addLayer(imglpMaskedUxk, {min: 1, max: 21, palette: paleta6}, 'Deleg. Santa Rosa');
// Create and define visualization parameters and display deleg. Tres Arroyos
//var paleta6 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMasked = image5.updateMask(image5.lte(21));
//Map.addLayer(imglpMasked, {min: 1, max: 21, palette: paleta6}, 'Deleg. Tres Arroyos');
// Create and define visualization parameters and display deleg. B.Blanca
//var paleta6 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskedsi = image13.updateMask(image13.lte(21));
//Map.addLayer(imglpMaskedsi, {min: 1, max: 21, palette: paleta6}, 'Deleg. B.Blanca');
// Create and define visualization parameters and display deleg. Pigue
//var paleta6 =['#499445','#eaea59','#fea458','#b33771','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#9aecdb','#bdc581','#f8efba','#FF3333','#cad3c8'];   
//var imglpMaskeds = image6.updateMask(image6.lte(21));
//Map.addLayer(imglpMaskeds, {min: 1, max: 21, palette: paleta6}, 'Deleg. Pigué');
// Create and define visualization parameters and display deleg. Madariaga
//var imgmadariaga = image10.updateMask(image10.lte(21));
//Map.addLayer(imgmadariaga, {min: 1, max: 21, palette: paleta6}, 'Deleg. G.Madariaga');
// Create and define visualization parameters and display deleg. Pigue
//var imglplata = image8.updateMask(image8.lte(21));
//Map.addLayer(imglplata , {min: 1, max: 21, palette: paleta6}, 'Deleg. La Plata');
// Create and define visualization parameters and display deleg. Pigue
//var imgcanadaga = image9.updateMask(image9.lte(21));
//Map.addLayer(imgcanadaga, {min: 1, max: 21, palette: paleta6}, 'Deleg. Cañada de Gomez');
// Create and define visualization parameters and display deleg. 25 de mayo
var imglpMaskedUps = image.updateMask(image.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. 25 de mayo');
// Create and define visualization parameters and display deleg. Bragado
var imglpMaskedUps = image3.updateMask(image3.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Bragado');
// Create and define visualization parameters and display deleg. Rio Cuarto
var imglpMaskedUps = image6.updateMask(image6.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Río Cuarto');
// Create and define visualization parameters and display deleg. Rio Cuarto
var imglpMaskedUps = image5.updateMask(image5.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. San Francisco');
// Create and define visualization parameters and display deleg. Rio Cuarto
var imglpMaskedUps = image8.updateMask(image8.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Villa María');
// Create and define visualization parameters and display deleg. Salliqueló
var imglpMaskedUps = image9.updateMask(image9.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Salliqueló');
// Create and define visualization parameters and display si hay que enmascarar mas
//var imglpMaskedUps = image10.updateMask(image10.gte(1).unmask(0));
//Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, '');
// Create and define visualization parameters and display deleg. Madariaga
var imglpMaskedUps = image10.updateMask(image10.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Madariaga');
// Create and define visualization parameters and display deleg. Laboulaye
var imglpMaskedUps = image11.updateMask(image11.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Laboulaye');
// Create and define visualization parameters and display deleg. Marcos Juárez
var imglpMaskedUps = image12.updateMask(image12.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Marcos Juárez');
// Create and define visualization parameters and display deleg. Pehuajó
var imglpMaskedUps = image13.updateMask(image13.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Pehuajó');
// Create and define visualization parameters and display deleg. La Plata
var imglpMaskedUps = image14.updateMask(image14.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. La Plata');
// Create and define visualization parameters and display deleg. Bolivar
var imglpMaskedUps = image15.updateMask(image15.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta6}, 'Deleg. Bolivar');
// Create and define visualization parameters and display deleg. Quimil{i y deleg. Santiago del Estero
var paleta7 =['#499445','#eaea59','#FF3333','#b33771','#FF3333','#3b3b98','#FF3333','#82589f','#d6a2e8','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#bdc581','#f8efba','#FF3333','#cad3c8'];  
var imglpMaskedUps = image16.updateMask(image16.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta7}, 'Deleg. Quimilí y Santiago del Estero');
// Create and define visualization parameters and display deleg. Avellaneda
var paleta7 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#3b3b98','#fd7272','#82589f','#d6a2e8','#f97f51','#eab543','#1b9cfc','#58b19f','#6d214f','#182c61','#9aecdb','#bdc581','#f8efba','#fc427b','#cad3c8'];
var imglpMaskedUps = image17.updateMask(image17.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta7}, 'Deleg. Avellaneda');
// Create and define visualization parameters and display deleg. Rafaela
var paleta7 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#3b3b98','#fd7272','#82589f','#d6a2e8','#f97f51','#eab543','#1b9cfc','#58b19f','#6d214f','#182c61','#9aecdb','#bdc581','#f8efba','#fc427b','#cad3c8'];
var imglpMaskedUps = image18.updateMask(image18.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta7}, 'Deleg. Rafaela');
// Create and define visualization parameters and display deleg. Charata
var paleta7 =['#499445','#eaea59','#FF3333','#b33771','#FF3333','#3b3b98','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#bdc581','#FF3333','#FF3333','#cad3c8'];
var imglpMaskedUps = image19.updateMask(image19.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta7}, 'Deleg. Charata');
// Create and define visualization parameters and display deleg. R.Saenz Peña
var paleta7 =['#499445','#eaea59','#FF3333','#b33771','#FF3333','#3b3b98','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#FF3333','#bdc581','#FF3333','#FF3333','#cad3c8'];
var imglpMaskedUps = image20.updateMask(image20.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta7}, 'Deleg. R.Saenz Peña');
// Create and define visualization parameters and display deleg. Tandil
var paleta7 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#3b3b98','#fd7272','#82589f','#d6a2e8','#f97f51','#eab543','#1b9cfc','#58b19f','#6d214f','#182c61','#9aecdb','#bdc581','#f8efba','#fc427b','#cad3c8'];
var imglpMaskedUps = image21.updateMask(image21.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta7}, 'Deleg. Tandil');
// Create and define visualization parameters and display deleg. Santa Rosa
var paleta8 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#bdc581','#f8efba','#cad3c8'];
var imglpMaskedUps = image22.updateMask(image22.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta8}, 'Deleg. Santa Rosa');
// Create and define visualization parameters and display deleg. Cañada de Gómez
var paleta9 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#bdc581','#f8efba','#cad3c8'];
var imglpMaskedUps = image23.updateMask(image23.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta9}, 'Deleg. Cañada de Gómez');
// Create and define visualization parameters and display deleg. Gral. Pico
var paleta9 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#bdc581','#f8efba','#cad3c8'];
var imglpMaskedUps = image24.updateMask(image24.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta9}, 'Deleg. Gral. Pico');
// Create and define visualization parameters and display deleg. Tres Arroyos
var paleta10 =['#499445','#eaea59','#fea458','#b33771','#55e6c1','#bdc581','#f8efba','#cad3c8'];
var imglpMaskedUps = image25.updateMask(image25.lte(21));
Map.addLayer(imglpMaskedUps, {min: 1, max: 21, palette: paleta10}, 'Deleg. Tres Arroyos');
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
var palette = ['ff8eaa'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: Frutales,
  color: 'ff8eaa',
});
Map.addLayer(fills, {palette: palette, max: 14}, 'Cítricos');
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
    'Mapa de Cultivos,  Campaña Gruesa 2020-2021   v01' 
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
legend.add(makeRow('3b3b98', 'Algodón'));
legend.add(makeRow('82589f', 'Poroto'));
legend.add(makeRow('fd7272', 'Arroz'));
legend.add(makeRow('d6a2e8', 'Caña de Azucar'));
legend.add(makeRow('9aecdb', 'Papa/Otros Cultivos'));
legend.add(makeRow('cad3c8', 'No agrícola'));
legend.add(makeRow('fc427b', 'Frutales')); 
Map.add(legend);
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