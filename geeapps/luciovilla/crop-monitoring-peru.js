// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $    AUGUST -AUTOMATED GEOPROCESSING ENVIRONMENT CLOUD-BASED  $
// $ =========================================================== $
// $ @tool     : APP MONITORING CROPS SENTINEL-2 BASED           $
// $ @autor    : Lucio Villa                                     $
// $ @e-mail   : luciovilla60@gmail.com                          $
// $ @website  : luciovilla.blogspot.pe                          $
// $ @revision : v1.0 - 17/01/2020                               $
// $                                                             $
// $ (c) 2020 Lucio Villa.                                       $
// $ ............................................................$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//*******************************************************************************************
// 1. Area of Interest (AOI)
//*******************************************************************************************
// 1.1. Regions 
var AMAZONAS =  ee.FeatureCollection("users/luciovilla/AMAZONAS"),
    ANCASH =  ee.FeatureCollection("users/luciovilla/ANCASH"),
    APURIMAC =  ee.FeatureCollection("users/luciovilla/APURIMAC"),
    AREQUIPA =  ee.FeatureCollection("users/luciovilla/AREQUIPA"),
    AYACUCHO =  ee.FeatureCollection("users/luciovilla/AYACUCHO"),
    CAJAMARCA =  ee.FeatureCollection("users/luciovilla/CAJAMARCA"),
    CALLAO =  ee.FeatureCollection("users/luciovilla/CALLAO"),
    CUSCO =  ee.FeatureCollection("users/luciovilla/CUSCO"),
    HUANCAVELICA =  ee.FeatureCollection("users/luciovilla/HUANCAVELICA"),
    HUANUCO =  ee.FeatureCollection("users/luciovilla/HUANUCO"),
    ICA =  ee.FeatureCollection("users/luciovilla/ICA"),
    JUNIN =  ee.FeatureCollection("users/luciovilla/JUNIN"),
    LALIBERTAD =  ee.FeatureCollection("users/luciovilla/LALIBERTAD"),
    LAMBAYEQUE =  ee.FeatureCollection("users/luciovilla/LAMBAYEQUE"),
    LIMA =  ee.FeatureCollection("users/luciovilla/LIMA"),
    LORETO =  ee.FeatureCollection("users/luciovilla/LORETO"),
    MADREDEDIOS =  ee.FeatureCollection("users/luciovilla/MADREDEDIOS"),
    MOQUEGUA =  ee.FeatureCollection("users/luciovilla/MOQUEGUA"),
    PASCO =  ee.FeatureCollection("users/luciovilla/PASCO"),
    PIURA =  ee.FeatureCollection("users/luciovilla/PIURA"),
    PUNO =  ee.FeatureCollection("users/luciovilla/PUNO"),
    SANMARTIN =  ee.FeatureCollection("users/luciovilla/SANMARTIN"),
    TACNA =  ee.FeatureCollection("users/luciovilla/TACNA"),
    TUMBES =  ee.FeatureCollection("users/luciovilla/TUMBES"),
    UCAYALI =  ee.FeatureCollection("users/luciovilla/UCAYALI");
// 1.2. List of Regions
var some = ee.List(['AMAZONAS','ANCASH','APURIMAC','AREQUIPA','AYACUCHO','CAJAMARCA',
                    'CALLAO','CUSCO','HUANCAVELICA','HUANUCO','ICA','JUNIN','LALIBERTAD',
                    'LAMBAYEQUE','LIMA','LORETO','MADREDEDIOS','MOQUEGUA','PASCO','PIURA',
                    'PUNO','SANMARTIN','TACNA','TUMBES','UCAYALI']);
// 1.3. Dictionary of Regions Names
var places = {
  AMAZONAS : AMAZONAS,
  ANCASH : ANCASH,
  APURIMAC : APURIMAC,
  AREQUIPA : AREQUIPA,
  AYACUCHO : AYACUCHO,
  CAJAMARCA : CAJAMARCA,
  CALLAO : CALLAO,
  CUSCO : CUSCO,
  HUANCAVELICA : HUANCAVELICA,
  HUANUCO : HUANUCO,
  ICA : ICA,
  JUNIN : JUNIN,
  LALIBERTAD : LALIBERTAD,
  LAMBAYEQUE : LAMBAYEQUE,
  LIMA : LIMA,
  LORETO : LORETO,
  MADREDEDIOS : MADREDEDIOS,
  MOQUEGUA : MOQUEGUA,
  PASCO : PASCO,
  PIURA : PIURA,
  PUNO : PUNO,
  SANMARTIN : SANMARTIN,
  TACNA : TACNA,
  TUMBES : TUMBES,
  UCAYALI : UCAYALI
};
//*******************************************************************************************
// 2. Panel parameters
//*******************************************************************************************
// 2.1. Branding
var logo = ee.Image("users/luciovilla/UNALM/minagri");
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'287px',height:'54px'}});
// 2.2. Visualization parameters
var visTitle = {
  fontWeight: 'bold', 
  fontSize: '20px', 
  width: '288px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: '2E3192',//'811F0A',
  backgroundColor: 'E5E5E5',//C4E7C9',
  textAlign: 'center'
  };
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '14px', 
  width: '590px',
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'left'
  };
// 2.3.  Main Panel
var newMap = ui.Map().setOptions('hybrid');
var mainPanel = ui.Panel({style: {width: '315px'}})
    .add(ui.Label('GEOMINAGRI v2.0 - EXPORT',visTitle))
    .add(branding)
    .add(ui.Label('Dirección de Estadística Agraria',{fontSize: '18px', fontWeight: 'bold',textAlign: 'center'}))
    .add(ui.Label('Input parameters:',visLabels));
var splitPanel = ui.SplitPanel(mainPanel,newMap);
ui.root.clear();
ui.root.add(splitPanel);
// 2.4.  Parameters of main panel
var startDateAnalysis = '2020-01-01';
var endDateAnalysis = '2020-02-01';
var start = ui.Panel(
  [
    ui.Label({value:'Start (yyyy-mm-dd):', style:{color:'red'}}),
    ui.Textbox({value:startDateAnalysis, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var end = ui.Panel(
  [
    ui.Label({value:'End (yyyy-mm-dd):', style:{color:'red'}}),
    ui.Textbox({value:endDateAnalysis, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var outName = ui.Panel(
  [
    ui.Label({value:'Output Name:', style:{color:'red'}}),
    ui.Textbox({value:'Sentinel2_Mosaic_Mes_', style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var CloudsS2 = ui.Panel(
  [
    ui.Label({value:'Clouds(0-100%):', style:{color:'red'}}),
    ui.Textbox({value:40, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
// 2.5. Add parameters to main panel
mainPanel.add(start);
mainPanel.add(end);
mainPanel.add(CloudsS2);
//*******************************************************************************************
// 4. Functions
//*******************************************************************************************
// 4.1. Variables of functions
var rgb_percentile   = 30; 
var NDVI_percentile  = 90; 
var NDWI_percentile  = 90; 
var NDSI_percentile  = 90;
var cld = require('users/fitoprincipe/geetools:cloud_masks');
var timeField = 'system:time_start';
// 4.2. Functions
function mascara(image) {
  var Opaque_clouds = ee.Number(2).pow(10).int();
  var Cirrus_clouds = ee.Number(2).pow(11).int();
  var qa = image.select('QA60');
  var cloud = 300;
  var mask = (qa.bitwiseAnd(Opaque_clouds).eq(0)
  .and(qa.bitwiseAnd(Cirrus_clouds).eq(0)))
  .focal_min(cloud,'circle','meters',1);
  return image.updateMask(mask).divide(10000)
  .set('system:time_start', image.get('system:time_start'));
}
//
function get_collection(date,cloudsS2A){
  var collection = ee.ImageCollection("COPERNICUS/S2")
                      .filterDate(date[0],date[1])
                      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudsS2A))
                      .map(mascara)
                      .map(function (image) {
                            return image;}
                          );
  return collection.map(function(image) {
  var NDVI = image.normalizedDifference(['B8','B4']) .rename('NDVI');
  //var NDWI = image.normalizedDifference(['B3','B8']).rename('NDWI');
  var NDWI = image.normalizedDifference(['B8','B11']).rename('NDWI');
  var NDSI = image.normalizedDifference(['B3','B11']).rename('NDSI');
  var NDMI = image.normalizedDifference(['B8A','B11']).rename('NDMI');
  image = image.addBands(NDVI.toFloat()).addBands(NDWI.toFloat()).addBands(NDMI.toFloat()).addBands(NDSI.toFloat());
  return image.toFloat();
  });
}
//
function get_final(collection) {
  var final = collection.median(); 
  collection = collection.map(function(img) {
  return img});
  var rgb_p = collection.select(["B2","B3","B4","B8","B11","B12"])
  .reduce(ee.Reducer.percentile([rgb_percentile]));
  rgb_p = rgb_p.select(["B2_p" + rgb_percentile,"B3_p" + 
  rgb_percentile,"B4_p" + rgb_percentile,"B8_p" 
  + rgb_percentile,"B12_p" + rgb_percentile,], ["B2", "B3", "B4","B8","B12"]);
  var NDVI_p = collection.select(["NDVI"]).reduce(ee.Reducer.percentile([NDVI_percentile])).select(["NDVI_p" + NDVI_percentile], ["NDVI"]);
  var NDWI_p = collection.select(["NDWI"]).reduce(ee.Reducer.percentile([NDWI_percentile])).select(["NDWI_p" + NDWI_percentile], ["NDWI"]);
  var NDSI_p = collection.select(["NDSI"]).reduce(ee.Reducer.percentile([NDSI_percentile])).select(["NDSI_p" + NDWI_percentile], ["NDSI"]);
  var NDMI_p = collection.select(["NDMI"]).reduce(ee.Reducer.percentile([NDWI_percentile])).select(["NDMI_p" + NDWI_percentile], ["NDMI"]);
  final = final.addBands({srcImg: rgb_p.select("B2").toFloat().rename("B2"),overwrite: true});
  final = final.addBands({srcImg: rgb_p.select("B3").toFloat().rename("B3"),overwrite: true});
  final = final.addBands({srcImg: rgb_p.select("B4").toFloat().rename("B4"),overwrite: true});
  final = final.addBands({srcImg: rgb_p.select("B8").toFloat().rename("B8"),overwrite: true});
  final = final.addBands({srcImg: rgb_p.select("B12").toFloat().rename("B12"),overwrite: true});
  final = final.addBands({srcImg: NDVI_p.select("NDVI").toFloat().rename("NDVI"),overwrite: true});
  final = final.addBands({srcImg: NDWI_p.select("NDWI").toFloat().rename("NDWI"),overwrite: true});
  final = final.addBands({srcImg: NDSI_p.select("NDSI").toFloat().rename("NDSI"),overwrite: true});
  final = final.addBands({srcImg: NDMI_p.select("NDMI").toFloat().rename("NDMI"),overwrite: true});
  return final.toFloat();
}
//
var addVariables = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band
    .addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'))
    .addBands(image.normalizedDifference(['B8','B11']).rename('NDWI'))
    // Add a time band
    .addBands(ee.Image(years).rename('t'))
    .float()
    // Add a constant band
    .addBands(ee.Image.constant(1));
};
//
function S2_Mosaic_SelectionAll(date,roi,cloudsS2A){  
  var S2_SR_Data = ee.ImageCollection('COPERNICUS/S2_SR');
  var S2_SR_Select = S2_SR_Data
      .filterDate(date[0],date[1])
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudsS2A))
      .filterBounds(roi);
  // print(S2_SR_Select,"Funcion S2_SR S2_L2A_clip")
  // print(clouds)
  var startDate = ee.Date(date[0]);
    var maskclouds = function(image) {
                    var masked = cld.sclMask(['cloud_low', 'cloud_medium', 'cloud_high', 'shadow'])(image);
  return masked;
  };
  //
  var S2SR_CloudMasked_NDVI = S2_SR_Select
      .map(maskclouds)
      .map(addVariables);
  var collection_S2L2A = S2SR_CloudMasked_NDVI.mosaic()
      .set('system:time_start', ee.Date(startDate).millis(), 'dateYMD', ee.Date(startDate).format('YYYY-MM-dd'));
  return collection_S2L2A;
}
//
function doCoded(feature,name) {
  // print(feature,"Feature 2");
  //***********
  var Dates = [start.widgets().get(1).getValue(),end.widgets().get(1).getValue()];
  // print(Dates,"Fechas");
  var outputDescription = outName.widgets().get(1).getValue();
  var assetName = outputDescription;
  var cloudsS2A = CloudsS2.widgets().get(1).getValue();
  //***********
  var collection = get_collection(Dates,cloudsS2A);
  // print(collection);
  var S2L1C_final = get_final(collection).toFloat();
  // print(S2L1C_final);
  var paleta_NDVI = {
    min: -0.8,
    max: 0.8,
    palette:['#0d0d0d','#252525','#3d3d3d','#565656','#6e6e6e','#868686','#9e9e9e','#b6b6b6','#cfcfcf','#e7e7e7','#ffffff','#f2f1e1','#bdd997','#ccffcc','#99ff99','#66ff66','#33ff33','#00ff00','#009900','#006600','#004500']
  };
  //***********
  var Paleta_humedad = {
    min: -0.6,
    max: 0.6,
    palette: ['#00ff00','#1aff1a','#33ff33','#4dff4d','#66ff66','#80ff80','#99ff99','#b3ffb3','#ccffcc','#e6ffe6','#ffffff','#e6e6ff','#ccccff','#b3b3ff','#9999ff','#8080ff','#6666ff','#4d4dff','#3333ff','#1a1aff','#0000ff']
  };
  //*********** L2A/L1C
  var S2_L2A_clip = S2_Mosaic_SelectionAll(Dates,feature,cloudsS2A);
  // print(S2_L2A_clip,"S2_L2A_clip");
  var S2_L2A_clip_select = S2_L2A_clip.select(['B2','B3','B4','B8']).clip(feature).uint16();
  // print("Coleccion seleccionada", S2_L2A_clip_select);
  var S2L1C_final_select = S2L1C_final.select(['B2','B3','B4','B8']).clip(feature).multiply(10000).uint16();
  var NDVI_S2_L2A= S2_L2A_clip.select(["NDVI"]).clip(feature).multiply(100).toByte();
  // print(NDVI_S2_L2A,"NDVI L2A");
  var NDWI_S2_L2A= S2_L2A_clip.select(["NDWI"]).clip(feature).multiply(100).toByte();
  // print(NDWI_S2_L2A,"NDWI L2A");
  var NDVI_S2_L1C = S2L1C_final.select(["NDVI"]).clip(feature).multiply(100).toByte();
  // print(NDVI_S2_L1C,"NDVI L1C");
  var NDWI_S2_L1C = S2L1C_final.select(["NDWI"]).clip(feature).multiply(100).toByte();
  // print(NDWI_S2_L1C,"NDWI L1C");
  //************  
  newMap.layers().set(0, ui.Map.Layer(ee.Image(0).updateMask(0).paint(feature,'#000000', 2.5), {palette: '#010000'},"REGION"));
  newMap.layers().set(1, ui.Map.Layer(S2L1C_final_select, {min:0,max:3000,bands:"B4,B3,B2",gamma:1.2}, "S2 L1C Color Real",0));
  newMap.layers().set(2, ui.Map.Layer(S2L1C_final_select, {min:0,max:3000,bands:"B8,B4,B3"}, "S2 L1C Infrarrojo Falso Color"));
  newMap.layers().set(3, ui.Map.Layer(S2L1C_final.select(["NDVI"]).clip(feature),paleta_NDVI,"S2 L1C NDVI"));
  newMap.layers().set(4, ui.Map.Layer(S2L1C_final.select(["NDWI"]).clip(feature),Paleta_humedad,"S2 L1C NDWI"));
  //
  newMap.layers().set(5, ui.Map.Layer(S2_L2A_clip_select,{min:0,max:3000,bands:"B4,B3,B2",gamma:1.5},"S2 L2A Color Real",0));
  newMap.layers().set(6, ui.Map.Layer(S2_L2A_clip_select,{min:0,max:3000,bands:"B8,B4,B3"},"S2 L2A Infrarrojo Falso Color",0));
  newMap.layers().set(7, ui.Map.Layer(S2_L2A_clip.select(["NDVI"]).clip(feature),paleta_NDVI,"S2 L1C NDVI"));
  newMap.layers().set(8, ui.Map.Layer(S2_L2A_clip.select(["NDWI"]).clip(feature),Paleta_humedad,"S2 L1C NDWI"));
  newMap.centerObject(feature,10);
  //************
  // Nombres para exportar
  var export_name_Mosaic_L1C = outputDescription + name + '_Mosaic_L1C';
  var export_name_NDVI_L1C = outputDescription + name + '_NDVI_L1C';
  var export_name_NDWI_L1C = outputDescription + name + '_NDWI_L1C';
  var export_name_Mosaic_L2A = outputDescription + name + '_Mosaic_L2A';
  var export_name_NDVI_L2A = outputDescription + name + '_NDVI_L2A';
  var export_name_NDWI_L2A = outputDescription + name + '_NDWI_L2A';
  var scale = 10;
  var crs = 'EPSG:4326';
  // Export resultats
  // Exp1                
  Export.image.toDrive({
  image: S2L1C_final_select,
  description: export_name_Mosaic_L1C,
  scale: scale,
  region: feature,
  maxPixels: 1e13
  });
  //Exp2
  Export.image.toDrive({
  image: NDVI_S2_L1C,
  description: export_name_NDVI_L1C,
  scale: scale,
  region: feature,
  maxPixels: 1e13
  });
  //Exp3
  Export.image.toDrive({
  image: NDWI_S2_L1C,
  description: export_name_NDWI_L1C,
  scale: scale,
  region: feature,
  maxPixels: 1e13
  });
  //Exp4
  Export.image.toDrive({
  image: S2_L2A_clip_select,
  description: export_name_Mosaic_L2A,
  scale: scale,
  region: feature,
  maxPixels: 1e13
  });
  //Exp5
  Export.image.toDrive({
  image:  NDVI_S2_L2A,
  description: export_name_NDVI_L2A,
  scale: scale,
  region: feature,
  maxPixels: 1e13
  });
  //Exp6
  Export.image.toDrive({
  image:  NDWI_S2_L2A,
  description: export_name_NDWI_L2A,
  scale: scale,
  region: feature,
  maxPixels: 1e13
  });
}
//
function callback(name) {
  // print(name,"Nombre de Region");
  // addFeat(name)
  var feature = places[name];
  // print(feature,"Feature 1");
  doCoded(feature,name);
}
//
var drop = ui.Panel(
  [
    ui.Label({value:'REGION del Peru:', style:{color:'red'}}),
    ui.Select({items: some.getInfo(),
               placeholder: 'Seleccione',
               value: null, 
               onChange: callback}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
//
mainPanel.add(ui.Label('Select and Export Mosaic:',visLabels));
mainPanel.add(outName);
// Adds
mainPanel.add(drop);