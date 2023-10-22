var aconcagua_cuenca = ui.import && ui.import("aconcagua_cuenca", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_cuenca"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_cuenca"),
    subsubcuencas_ms = ui.import && ui.import("subsubcuencas_ms", "table", {
      "id": "users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"
    }) || ee.FeatureCollection("users/observatorionieves/DGA/aconcagua_subsubcuencas_ms"),
    MYD10A1_yearly = ui.import && ui.import("MYD10A1_yearly", "imageCollection", {
      "id": "users/observatorionieves/MODIS/MYD10A1_Snow_Yearly"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/MYD10A1_Snow_Yearly"),
    MOD10A1_yearly = ui.import && ui.import("MOD10A1_yearly", "imageCollection", {
      "id": "users/observatorionieves/MODIS/MOD10A1_Snow_Yearly"
    }) || ee.ImageCollection("users/observatorionieves/MODIS/MOD10A1_Snow_Yearly"),
    logo_teleamb = ui.import && ui.import("logo_teleamb", "image", {
      "id": "users/observatorionieves/Logos/Logo_TeleAmb"
    }) || ee.Image("users/observatorionieves/Logos/Logo_TeleAmb"),
    logo_observatorio = ui.import && ui.import("logo_observatorio", "image", {
      "id": "users/observatorionieves/Logos/Logo_Observatorio"
    }) || ee.Image("users/observatorionieves/Logos/Logo_Observatorio");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Este código genera una comparación interanual 
// Con el promedio mensual del Índice Normalizado de Nieve
// A través de un Split Panel
// Producto MOD10A1 y MYD10A1 colección 6 de MODIS
// Autor Yael Aguirre & Freddy Saavedra
// Actualizado 21/07/21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------
//////////////////////////// Parámetros de visualización ////////////////////////////
//-----------------------------------------------------------------------------------
var streamflow = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers")
                    .filter(ee.Filter.eq('BAS_ID', 3975615))
                    .style({color: "B2B2B3", width: 2.0,});
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
featureCollection: aconcagua_cuenca,
color: 1,
width: 1
});
// Create an empty image into which to paint the features, cast to byte.
var empty2 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline2 = empty2.paint({
featureCollection: subsubcuencas_ms,
color: 2,
width: 1
});
// Demonstrates before/after imagery comparison with a variety of dates
// Configura los parámetros de visualización
var colorizedVis = {
  bands: ['NDSI_Snow_Cover'],
  min: 0.0,
  max: 100,
  palette: [ //Paleta obtenida de snowcloudmetrics  https://github.com/SnowCloudMetrics/Earth_Engine_Scripts/blob/master/SnowCloudMetrics_app_ui.txt
            'ffffff', //  0 - 10 Blanco
            'ffffd9', // 10 - 20 Blanco
            'edf8b1', // 20 - 30 Azul             //'ffebbe'
            'c7e9b4', // 30 - 40 Celeste
            '7fcdbb', // 40 - 50 Celeste
            '41b6c4', // 50 - 60 azul claro
            '1d91c0', // 60 - 70 crema pálido     //21d291  //179164
            '225ea8', // 70 - 80 celeste          //14dada
            '253494', // 80 - 90 Azul
            '081d58', // 90- 100 Azul
],
};
// Define an NSDI style of discrete intervals to apply to the image.
var nsdi_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#ffffff" quantity="10" label="1-10" />' +
      '<ColorMapEntry color="#ffffd9" quantity="20" label="10-20" />' +
      '<ColorMapEntry color="#edf8b1" quantity="30" label="20-30" />' +
      '<ColorMapEntry color="#c7e9b4" quantity="40" label="30-40" />' +
      '<ColorMapEntry color="#7fcdbb" quantity="50" label="40-50" />' +
      '<ColorMapEntry color="#41b6c4" quantity="60" label="50-60" />' +
      '<ColorMapEntry color="#1d91c0" quantity="70" label="60-70" />' +
      '<ColorMapEntry color="#225ea8" quantity="80" label="70-80" />' +
      '<ColorMapEntry color="#253494" quantity="90" label="80-90" />' +
      '<ColorMapEntry color="#081d58" quantity="100" label="90-100" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
function styleImg(img){
  return ee.Image(img
    .visualize(colorizedVis)
    .copyProperties(img, img.propertyNames()))
    .clip(aconcagua_cuenca);
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Paleta de colores/////////////////////////////////////////////////////////////////////////////////////
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// Define various parameters that need global scope.
// =================================================
// Palettes for SCF and SDD
//var palette_scf = 'ffffff,ffffd9,edf8b1,c7e9b4,7fcdbb,41b6c4,1d91c0,225ea8,253494,081d58';
// Create and add SCF/SDD colorbar legends to map.
// ===============================================
var Etiquetas = ['00 - 10','10 - 20','20 - 30','30 - 40','40 - 50','50 - 60','60 - 70','70 - 80','80 - 90','90 - 100'];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Promedio de presencia de nieve (%)', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['ffffff','ffffd9','edf8b1','c7e9b4','7fcdbb','41b6c4','1d91c0','225ea8','253494','081d58'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 60px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 10; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
//------------------------------------------------------------------------------------
////////////////////////////////// Datos de entrada //////////////////////////////////
//------------------------------------------------------------------------------------
// Imagenes MODIS promedio anual TERRA
var T2000 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2000'); 
var T2001 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2001');
var T2002 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2002');
var T2003 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2003');
var T2004 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2004');
var T2005 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2005');
var T2006 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2006');
var T2007 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2007');
var T2008 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2008');
var T2009 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2009');
var T2010 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2010');
var T2011 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2011');
var T2012 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2012');
var T2013 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2013');
var T2014 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2014');
var T2015 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2015');
var T2016 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2016');
var T2017 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2017');
var T2018 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2018');
var T2019 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2019');
var T2020 = ee.Image('users/observatorionieves/MODIS/MOD10A1_Snow_Yearly/2020');
// Imagenes MODIS promedio anual AQUA
var A2003 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2003');
var A2004 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2004');
var A2005 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2005');
var A2006 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2006');
var A2007 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2007');
var A2008 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2008');
var A2009 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2009');
var A2010 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2010');
var A2011 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2011');
var A2012 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2012');
var A2013 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2013');
var A2014 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2014');
var A2015 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2015');
var A2016 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2016');
var A2017 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2017');
var A2018 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2018');
var A2019 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2019');
var A2020 = ee.Image('users/observatorionieves/MODIS/MYD10A1_Snow_Yearly/2020');
var outImage = T2000;
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Funciones//////////////////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilice un filtro de igual para especificar cómo coinciden las colecciones
var unionFilter = ee.Filter.equals({
  leftField: 'year',
  rightField: 'year'
});
// Defina la unión
var innerJoin = ee.Join.inner('primary', 'secondary');
// Aplique la unión
var toyJoin = innerJoin.apply(MOD10A1_yearly, MYD10A1_yearly, unionFilter);
// Convertir de featureCollection a ImageCollection
var JoinTAYearly = ee.ImageCollection(toyJoin.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
}));
// print('Colección unida TA: Join inner', JoinTAYearly);
// Defina la unión invertida
var invertedJoin = ee.Join.inverted();
// Aplique la unión invertida
var invertedJoined = invertedJoin.apply(MOD10A1_yearly, MYD10A1_yearly, unionFilter);
// print('Colección unida TA: Join inverted ', invertedJoined);
// Fusione el Join inner con Join inverted
var mergedTAYearly = JoinTAYearly.merge(invertedJoined).sort('year');
print('Fusión Join inner y Join inverted', mergedTAYearly);
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////Gráficos/////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
// Serie de tiempo anual /Timelapses 2003-2020 
var chartYear =
  ui.Chart.image.series({
    imageCollection: mergedTAYearly,
    region: subsubcuencas_ms,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'year'
  }).setSeriesNames(["NDSI Terra", "NDSI Aqua"])
    .setOptions({
    title: 'Promedio anual NDSI sobre las subcuencas media y alta del Rio Aconcagua, usando MOD10A1 (Terra) y MYD10A1 (Aqua). 2000-2020',
    vAxis: {title:'Promedio (%)'},
    hAxis: {title:'Años',format:0},
    curveType: 'function',
});
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////UI Gráficos/////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
var panelMonth = ui.Panel();
panelMonth.style().set({
  width: '400px',
  position: 'middle-right'
});
Map.add(panelMonth);
panelMonth.clear();
//panelMonth.add(chartbyMonth);
//Map.add(chartbyMonth);
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////// Split panel //////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
// Create the left map
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
leftMap.setOptions('Satellite');
leftMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
leftMap.addLayer(outline);
leftMap.addLayer(outline2);
leftMap.addLayer(streamflow);
// Create the right map
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.setOptions('Satellite');
rightMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
rightMap.addLayer(outline);
rightMap.addLayer(outline2);
rightMap.addLayer(streamflow);
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-70.8484, -32.839, 9);
rightMap.setCenter(-70.8484, -32.839, 9);
//------------------------------------------------------------------------------------------------------------------------------------------
///////////////////////////////////////////////// Image selectors /////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------------------------------------------------------------
var year = 2000;
var product = 1;
var years = {
  '2000'   : [2000,'2000'],
  '2001'   : [2001,'2001'],
  '2002'   : [2002,'2002'],
  '2003'   : [2003,'2003'],
  '2004'   : [2004,'2004'],
  '2005'   : [2005,'2005'],
  '2006'   : [2006,'2006'],
  '2007'   : [2007,'2007'],
  '2008'   : [2008,'2008'],
  '2009'   : [2009,'2009'],
  '2010'   : [2010,'2010'],
  '2011'   : [2011,'2011'],
  '2012'   : [2012,'2012'],
  '2013'   : [2013,'2013'],
  '2014'   : [2014,'2014'],
  '2015'   : [2015,'2015'],
  '2016'   : [2016,'2016'],
  '2017'   : [2017,'2017'],
  '2018'   : [2018,'2018'],
  '2019'   : [2019,'2019'],
  '2020'   : [2020,'2020'],
};
var products = {
  Terra       : [1,'Terra: MOD10A1'],
  Aqua        : [2,'Aqua: MYD10A1'],
};
var addLayerRight = function(year,product) {
  ////rightMap.remove(outImage);
    if (year == 2000) {
        if(product == 1){
          var outImage = T2000;
        }else {
 //         var outImage = A2000; //Agregar label*** 
        }
    } else if (year == 2001) {
        if(product == 1){
          var outImage = T2001;
        }else {
 //         var outImage = A2001;
        }
    } else if (year == 2002) {
        if(product == 1){
          var outImage = T2002;
        }else {
 //         var outImage = A2002;
        } 
    } else if (year == 2003) {
        if(product == 1){
          var outImage = T2003;
        }else {
          var outImage = A2003;
        }
    } else if (year == 2004) {
        if(product == 1){
          var outImage = T2004;
        }else {
          var outImage = A2004;
        }
    } else if (year == 2005) {
        if(product == 1){
          var outImage = T2005;
        }else {
          var outImage = A2005;
        }
    } else if (year == 2006) {
        if(product == 1){
          var outImage = T2006;
        }else {
          var outImage = A2006;
        }
    } else if (year == 2007) {
        if(product == 1){
          var outImage = T2007;
        }else {
          var outImage = A2007;
        }
    } else if (year == 2008) {
        if(product == 1){
          var outImage = T2008;
        }else {
          var outImage = A2008;
        }
    } else if (year == 2009) {
        if(product == 1){
          var outImage = T2009;
        }else {
          var outImage = A2009;
        }  
    } else if (year == 2010) {
        if(product == 1){
          var outImage = T2010;
        }else {
          var outImage = A2010;
        }
    } else if (year == 2011) {
        if(product == 1){
          var outImage = T2011;
        }else {
          var outImage = A2011;
        }
    } else if (year == 2012) {
        if(product == 1){
          var outImage = T2012;
        }else {
          var outImage = A2012;
        }
    } else if (year == 2013) {
        if(product == 1){
          var outImage = T2013;
        }else {
          var outImage = A2013;
        }
    } else if (year == 2014) {
        if(product == 1){
          var outImage = T2014;
        }else {
          var outImage = A2014;
        }
    } else if (year == 2015) {
        if(product == 1){
          var outImage = T2015;
        }else {
          var outImage = A2015;
        }
    } else if (year == 2016) {
        if(product == 1){
          var outImage = T2016;
        }else {
          var outImage = A2016;
        }
    } else if (year == 2017) {
        if(product == 1){
          var outImage = T2017;
        }else {
          var outImage = A2017;
        }
    } else if (year == 2018) {
        if(product == 1){
          var outImage = T2018;
        }else {
          var outImage = A2018;
        }
    } else if (year == 2019) {
        if(product == 1){
          var outImage = T2019;
        }else {
          var outImage = A2019;
        }
       } else {
        if(product == 1){
          var outImage = T2020;
        }else {
          var outImage = A2020;
        }
    }
  rightMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
  rightMap.addLayer(outline);
  rightMap.addLayer(outline2);
  rightMap.addLayer(streamflow);
};
var selectYearRight = ui.Select({
  items: Object.keys(years),
    value: '2000',
    onChange: function(key) {
     year = years[key][0];
      addLayerRight(year,product);
  }
});
var selectProductRight = ui.Select({
  items: Object.keys(products),
    value: 'Terra',
    onChange: function(key) {
      product = products[key][0];
      addLayerRight(year,product);
  }
});
var inspectorRightLabel = ui.Label('Seleccione satélite y año');
var inspectorRight = ui.Panel({
  widgets: [inspectorRightLabel,selectProductRight, selectYearRight],
  style: {position: 'top-right'}
});
var addLayerLeft = function(year,product) {
  ////leftMap.remove(outImage);
     if (year == 2000) {
        if(product == 1){
          var outImage = T2000;
        }else {
 //         var outImage = eneroA;
        }
     } else if (year == 2001) {
        if(product == 1){
          var outImage = T2001;
        }else {
   //       var outImage = A2001;
        }   
     } else if (year == 2002) {
        if(product == 1){
          var outImage = T2002;
        }else {
   //       var outImage = A2002;
        }     
     } else if (year == 2003) {
        if(product == 1){
          var outImage = T2003;
        }else {
   //       var outImage = A2003;
        }   
       } else if (year == 2004) {
        if(product == 1){
          var outImage = T2004;
        }else {
          var outImage = A2004;
        }
    } else if (year == 2005) {
        if(product == 1){
          var outImage = T2005;
        }else {
          var outImage = A2005;
        }
    } else if (year == 2006) {
        if(product == 1){
          var outImage = T2006;
        }else {
          var outImage = A2006;
        }
    } else if (year == 2007) {
        if(product == 1){
          var outImage = T2007;
        }else {
          var outImage = A2007;
        }
    } else if (year == 2008) {
        if(product == 1){
          var outImage = T2008;
        }else {
          var outImage = A2008;
        }
    } else if (year == 2009) {
        if(product == 1){
          var outImage = T2009;
        }else {
          var outImage = A2009;
        }  
    } else if (year == 2010) {
        if(product == 1){
          var outImage = T2010;
        }else {
          var outImage = A2010;
        }
    } else if (year == 2011) {
        if(product == 1){
          var outImage = T2011;
        }else {
          var outImage = A2011;
        }
    } else if (year == 2012) {
        if(product == 1){
          var outImage = T2012;
        }else {
          var outImage = A2012;
        }
    } else if (year == 2013) {
        if(product == 1){
          var outImage = T2013;
        }else {
          var outImage = A2013;
        }
    } else if (year == 2014) {
        if(product == 1){
          var outImage = T2014;
        }else {
          var outImage = A2014;
        }
    } else if (year == 2015) {
        if(product == 1){
          var outImage = T2015;
        }else {
          var outImage = A2015;
        }
    } else if (year == 2016) {
        if(product == 1){
          var outImage = T2016;
        }else {
          var outImage = A2016;
        }
    } else if (year == 2017) {
        if(product == 1){
          var outImage = T2017;
        }else {
          var outImage = A2017;
        }
    } else if (year == 2018) {
        if(product == 1){
          var outImage = T2018;
        }else {
          var outImage = A2018;
        }
    } else if (year == 2019) {
        if(product == 1){
          var outImage = T2019;
        }else {
          var outImage = A2019;
        }
       } else {
        if(product == 1){
          var outImage = T2020;
        }else {
          var outImage = A2020;
        }
    }
  leftMap.addLayer(outImage.clip(aconcagua_cuenca).sldStyle(nsdi_intervals));
  leftMap.addLayer(outline);
  leftMap.addLayer(outline2);
  leftMap.addLayer(streamflow);
};
var selectYearLeft = ui.Select({
  items: Object.keys(years),
    value: '2000',
    onChange: function(key) {
      year = years[key][0];
      addLayerLeft(year,product);
  }
});
var selectProductLeft = ui.Select({
  items: Object.keys(products),
    value: 'Terra',
    onChange: function(key) {
      product = products[key][0];
      addLayerLeft(year,product);
  }
});
var inspectorLeftLabel = ui.Label('Seleccione satélite y año');
var inspectorLeft = ui.Panel({
  widgets: [inspectorLeftLabel, selectProductLeft, selectYearLeft],
  style: {position: 'top-left'}
});
leftMap.add(inspectorLeft);
rightMap.add(inspectorRight);
//leftMap.add(Leyenda);
//-------------------------------------------------------------------------------
////////////////////////////////// Widget panel /////////////////////////////////
//-------------------------------------------------------------------------------
// Spacer object
var spacer = ui.Label('           ');
// Create UI Panels
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduction 
var intro = ui.Label('Observatorio Satelital de Nieves', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label('A partir de las imágenes satelitales diarias del producto de nieves '+ 
  ' MOD10A1 (Terra) y MYD10A1 (Aqua), se establece una comparación espacio temporal anual de nieves sobre la cuenca del río'+
  ' Aconcagua. La información presentada es recopilada a partir de los valores del promedio anual del'+
  ' Indice Normalizado de Nieve (NDSI). La interfaz de usuario le permite seleccionar un año de interés'+
  ' a analizar, generando la comparación a la izquierda y derecha del panel divisorio con los resultados.', {});
var subtitle2 = ui.Label ('Considere que para el análisis comparativo podrá obtener datos del sensor Terra a partir del año 2000. No obstante, para el sensor Aqua será a partir del año 2003. ',  {});
// Define link para thumbnail
var link = ui.Label('Observatorio Satelital de Nieve', {},'http://observatorionieves.cl/');
// Logo TeleAmb
var branding = ui.Thumbnail({image:logo_teleamb,params:{dimensions: '300x93', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'300px',height:'93px',padding :'0'}});
//Logo observatorio nieves 
var logo_obse = ui.Thumbnail({image:logo_observatorio,params:{dimensions: '250x114', bands:['b1','b2','b3'],min:0,max:255}, style:{width:'250px',height:'114px',padding :'0'}});
panel.add(logo_obse)
     .add(link)
     .add(intro)
     .add(subtitle)
     .add(subtitle2);
//panel.add(makeLegend('Promedio de presencia de nieve', SCFpaletteLabels, palette_scf, 1, 0, 'top-left'));
panel.add(Leyenda);
panel.add(chartYear);
panel.add(branding);