var District = ui.import && ui.import("District", "table", {
      "id": "users/mastergis01/GEE_JS/Limite_Distrital"
    }) || ee.FeatureCollection("users/mastergis01/GEE_JS/Limite_Distrital");
/**
 Ejemplo: App de Google Earth Engine para descarga de información clasificada
 Este script muestra como se puede descargar información importante para los usuario de forma falcil
 y sencilla
 @author Junior Calvo, Mario caceres, Angelo Tena, Valeria 
**/
Map.setOptions("HYBRID")
Map.setCenter(-77.6597, -9.2469, 5.5);
// ====================== Capas vectoriales de informacion =======================================
// A nivel de Peru
var peru = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0")
          .filter(ee.Filter.eq("ADM0_NAME", "Peru"));
// Para filtrar por 
var distritos = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2")
                .filter(ee.Filter.eq("ADM0_NAME", "Peru"));
Map.addLayer(distritos)
//======================== Capas raster de informacion ============================================
// Raster 30m 
var dataset = ee.Image('USGS/SRTMGL1_003');
// DEM 30m
var elevation = dataset.select('elevation').clip(peru);
var elevaVis = {
  min: 0,
  max: 6500,
  palette: ['black', 'white']
}
// Pendiente
var slope = ee.Terrain.slope(elevation).clip(peru);
var slopeVis = {
    min: 0.0,
    max: 30.0,
    opacity: 0.7,
    palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
  'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
  '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'],
    }; //, '1fff4f'
// Aspect
var aspect = ee.Terrain.aspect(elevation).clip(peru);
var aspectvis = {
  min: 0.0, 
  max: 360, 
  opacity: 0.7,
  palette: [
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef', '3ae237',
  'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08',
  'ff500d', 'ff0000', 'de0101', 'c21301']
};
// Hillshade
var hillshade = ee.Terrain.hillshade(elevation).clip(peru);
var hillshadeVis = {
  min: 0, 
  max: 360,
  palette: ['black', 'grey', 'white']
}
// Landcover
var land = ee.ImageCollection("ESA/WorldCover/v100").first().clip(peru);
var visualization = {
  bands: ['Map'],
};
// Cobertura forestal
var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
var treeCover = gfc2014.select(['treecover2000']).clip(peru);
// Landsat 9
var datasetlad9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .filterDate('2021-01-01', '2022-05-01')
    .filterMetadata ('CLOUD_COVER', 'Less_Than', 70);
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
var land9 = datasetlad9.map(applyScaleFactors).median().clip(peru);
// NDVI
var datasetndvi = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_NDVI')
                  .filterDate('2021-01-01', '2021-12-31');
var ndvi = datasetndvi.select('NDVI').median().clip(peru);
//EVI
var datasetevi = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_EVI')
                  .filterDate('2021-01-01', '2021-12-31');
var evi = datasetevi.select('EVI').median().clip(peru);
//Dosel
var canopy = ee.Image("users/nlang/ETH_GlobalCanopyHeight_2020_10m_v1").clip(peru)
// ========================= Parametros de la capa ===================================================
var m = {};
m.pro = {"Modelo Digital de Elevación (DEM)": elevation, "Mapa de Pendiente": slope, "Mapa de Orientación": aspect, "Mapa de Sombra": hillshade, 
         "Cobertura de Tierra": land,"Cobertura Forestal":treeCover, "Mosaico Landsat 9": land9,  "Indice de Vegetación (NDVI)": ndvi,"Índice de vegetación mejorado (EVI)": evi, "Altura superior del dosel": canopy}
m.imgInfo = {bands: {
  "Modelo Digital de Elevación (DEM)": {
    bname: "Modelo Digital de Elevación (DEM)",
    color: "d4e7b0", 
    vis: {
      min: 0,
      max: 6500,
      palette: ['black', 'white']
    }
  },
  "Mapa de Pendiente": {
    bname: "Mapa de Pendiente",
    color: "d2cdc0",
    vis: {
      min: 0.0,
      max: 30.0,
      opacity: 0.7,
      palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
        'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
        '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f']  
    }
  },
  "Mapa de Orientación": {
    bname: "Mapa de Orientación",
    color: "ca9146",
    vis: {
      min: 0.0, 
      max: 360, 
      opacity: 0.7,
      palette: [
        '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef', '3ae237',
        'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08',
        'ff500d', 'ff0000', 'de0101', 'c21301']
    }
  },
  "Mapa de Sombra": {
    bname: "Mapa de Sombra",
    color: "red", 
    vis: {
      min: 0, 
      max: 360,
      palette: ['black', 'grey', 'white']
    }
  },
  "Cobertura de Tierra": {
    bname: "Cobertura de Tierra",
    color: "blue", 
    vis: {
      bands: ['Map'],
    }
  },
  "Cobertura Forestal":{
    bname: "Cobertura Forestal", 
    color: "red",
    vis: {
      min: 0, 
      max: 100, 
      palette: ['000000', '00FF00']
    }
  },
  "Mosaico Landsat 9": {
    bname: "Mosaico Landsat 9",
    color: "red",
    vis: {
      bands: ['SR_B4', 'SR_B3', 'SR_B2'],
      min: 0.0,
      max: 0.4
    }
  },
  "Indice de Vegetación (NDVI)":{
    bname: "Indice de Vegetación (NDVI)",
    color: "red", 
    vis: {
      min: 0, 
      max: 1, 
      palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]
    }
  },
  "Índice de vegetación mejorado (EVI)":{
    bname: "Índice de vegetación mejorado (EVI)",
    color: "blue",
    vis: {
      min: 0,
      max: 1,
      palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]
    }
  },
  "Altura superior del dosel":{
    bname: "Altura superior del dosel",
    color: "red", 
    vis: {
      min: 0, 
      max: 50,
      palette: ["#010005", "#150b37", "#3b0964", "#61136e", "#85216b", "#a92e5e", 
      "#cc4248", "#e75e2e", "#f78410", "#fcae12", "#f5db4c", "#fcffa4"]
    }
  }
}}
// ========================= Selección de capas ===================================================
function oncha(a){
  var mypro = m.pro[a]
  function removeLayersFromMap(layer){
      Map.remove(layer)
    }
  c.push(mypro)
  c.push(m.imgInfo.bands[a].bname)
  Map.layers().map(removeLayersFromMap)
  Map.addLayer(mypro, m.imgInfo.bands[a].vis);
}
// label 
var prolege = ui.Label({
  value: 'Capas clasificadas',
  style: {fontWeight: 'bold', color: '4A997E', fontSize: '18px'}
   })
// Añadir layer al mapa
var capselec = ui.Select({
  items: Object.keys(m.imgInfo.bands),
  placeholder: "Seleccionar Capa", 
  style: {fontWeight: 'bold', stretch: "horizontal", margin: "8px"},
  onChange: oncha
})
// ========================= Selección por distritos ==============================================
var  c = []
var names = District.aggregate_array("DISTRITO").sort() // Obterner y ordenar nombres 
function onNameChanged(name){
  print('Update map for ' + name)
}
// Añadir layer al mapa
function redraw(names){
  var mydis = District.filterMetadata("DISTRITO", "equals", names);
   function removeLayersFromMap(layer){
      Map.remove(layer)
    }
  Map.layers().map(removeLayersFromMap)
  Map.centerObject(mydis)
  Map.addLayer(mydis)
  Map.addLayer(c[0].clip(mydis), m.imgInfo.bands[c[1]].vis)
  c.push(mydis)
}
names.evaluate(
  function(names){
   var nameslege = ui.Label({
     value: 'Distritos de Perú',
  style: {fontWeight: 'bold', color: '4A997E', fontSize: '18px'}
   })
   var currentName = ui.Select({
    items: names,
    placeholder: 'Seleccione',
    onChange: redraw, 
    style: {fontWeight: 'bold', stretch: "horizontal", margin: "8px"}
  });
  var pane = ui.Panel([prolege,capselec, nameslege, currentName, 
  deslege, downloadButton, urlLabel, res]);
  panel.add(pane);
  })
//============================= Descarga de información =============================
// viewport region.
function downloadImg() {
  var viewBounds = c[2];
  var downloadArgs = {
    name: 'ee_image.tiff',
    scale: 30,
    format: "GEO_TIFF",
    region: c[2].geometry()
 };
 var url = c[0].getDownloadURL(downloadArgs);
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
}
// Add UI elements to the Map.
var deslege = ui.Label({
  value: 'Descarga de información',
  style: {fontWeight: 'bold', color: '4A997E', fontSize: '18px'}
   })
var downloadButton = ui.Button('Download viewport', downloadImg);
var urlLabel = ui.Label('Download', {shown: false});
//============================= Creación de Panel ===================================
var panel = ui.Panel({style: {width:'30%'}});
ui.root.insert(1,panel);
// Definir titulo y descripcion 
var title_style = {
  fontWeight: 'bold',
  fontSize: '25px',
  textAlign: 'center',
  padding: '8px',
  color: '4A997E',
  backgroundColor:'white',
}
var header = ui.Label("Descarga de Información Geoespacial", title_style)
var resumen = ui.Label("Encontraras información especial útil para el análisis del territorio a nivel de distrito y permite obtener y descargar mapas a resolución de 30m.",
                {fontSize: '14px'})
var pag = ui.Label({
  value: 'Visita Nuestra Pagina Oficial',
  imageUrl: 'data:image/png;base64,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'
})
var res = ui.Label("Para descargar otra capa tiene que volver a cargar la pagina",
                {fontSize: '12px'})
panel.add(header).add(resumen).add(pag)
// Definir información de las bandas de cada capa 
//ui.Label(value, style, targetUrl, imageUrl)