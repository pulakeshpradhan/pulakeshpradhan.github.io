/* https://mygeodata.cloud/result qgis salvar como extensão da camada */
// Imports
var SSEBop = require("users/ssebop/v2:landsat/model/SSEBop_caio.js");
var dailySSEBop = require("users/ssebop/v2:landsat/model/dailySSEBop.js");
var julianUtils = require("users/ssebop/v2:packages/julianDate.js");
var cloudUtils =  require("users/ssebop/v2:packages/cloud.js");
var utilsGeomFunctions = require("users/ssebop/v2:packages/utilsGeomFunctions.js")
var meteo = require("users/ssebop/v2:packages/meteo.js");
// Logos
var logoSSEBop = "projects/ee-ssebop/assets/v2/images/logo/ssebop";
var logoAgrosatelite = "projects/ee-ssebop/assets/v2/images/logo/agrosatelite";
var logoANA = "projects/ee-ssebop/assets/v2/images/logo/ana";
var logoINPE = "projects/ee-ssebop/assets/v2/images/logo/logoinpe";
var logoUSGS = "projects/ee-ssebop/assets/v2/images/logo/usgs";
//var logo_hge = "projects/et-brasil/assets/Logo_HGE";
var logo_iph = "projects/et-brasil/assets/logo_ufrgs";
var figura01 = "projects/ee-ssebop/assets/v2/images/logo/figura_01_en";
var table01 = "projects/ee-ssebop/assets/v2/images/logo/table_01_en";
var table02 = "projects/ee-ssebop/assets/v2/images/logo/table_02_en";
// Bands name
var bandsL8L5C2 = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11','QA_PIXEL'];
var newBandsL8L5C2 = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11','BQA'];
var bandsL7C2 = ['B1','B2','B3','B4','B5','B6_VCID_1','B6_VCID_2','B7','B8','QA_PIXEL'];
var newBandsL7C2 = ['B1','B2','B3','B4','B5','B6_VCID_1','B6_VCID_2','B7','B8','BQA'];
// Collections
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
// var landsat5Collection = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA");
// var landsat52Collection = ee.ImageCollection("LANDSAT/LT05/C01/T2_TOA");
// var landsat7Collection = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA");
// var landsat72Collection = ee.ImageCollection("LANDSAT/LE07/C01/T2_TOA");
// var landsat8Collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
// var landsat82Collection = ee.ImageCollection("LANDSAT/LC08/C01/T2_TOA");
// Colecoes Landsat
var rename_bands = function(collection, old_bands, new_bands){
  return  ee.ImageCollection(collection).select(old_bands, new_bands);
};
var landsat5Collection = rename_bands("LANDSAT/LT05/C02/T1_TOA",
                                            bandsL8L5C2,newBandsL8L5C2);
var landsat52Collection = rename_bands("LANDSAT/LT05/C02/T2_TOA",
                                            bandsL8L5C2,newBandsL8L5C2);                                            
var landsat7Collection = rename_bands("LANDSAT/LE07/C02/T1_TOA",
                                            bandsL7C2,newBandsL7C2);                                          
var landsat72Collection = rename_bands("LANDSAT/LE07/C02/T2_TOA",
                                            bandsL7C2,newBandsL7C2);
var landsat8Collection = rename_bands("LANDSAT/LC08/C02/T1_TOA",
                                            bandsL8L5C2,newBandsL8L5C2);
var landsat82Collection = rename_bands("LANDSAT/LC08/C02/T2_TOA",
                                            bandsL8L5C2,newBandsL8L5C2);
var landsat9Collection =  rename_bands("LANDSAT/LC09/C02/T1_TOA",
                                            bandsL8L5C2,newBandsL8L5C2);
// Global variables
var currentCollection = null;
var currentImage = null;
var currentDialog = null;
var currentPoint = null;
var areaDeExportacao = null;
var dictBatchResult = [];
var downloadCSVLabel = null
// Default CSS Styles
var defaultStyle = {
  // fontFamily: "lato"
};
var map = ui.Map({
  center: {lon: -51.2688, lat: -14.5554, zoom: 4}, 
  style: defaultStyle
}).setControlVisibility({
  all: false, 
  layerList: true, 
  zoomControl: true, 
  scaleControl: true, 
  mapTypeControl: true, 
  fullscreenControl: false
});
function makeDialog(title, content, windowSize){
  /*
    title: (String)
    content: (String)l
    size: (String, optional): xs, sm, md, lx
  */
  var sizes = {
    "sm": {'height': '159px', 'width': '500px'},
    "md": {'height': '50%', 'width': '50%'},
    "lg": {'height': '90%', 'width': '50%'},
  };
  var closeButton = ui.Button({
    label: "Close",
    onClick: function(){
      map.remove(currentDialog)  ;            
    },
    style: extend(defaultStyle, {
      'position': 'bottom-right',
      'margin': '0px',
    })
  });
  try{
    map.remove(currentDialog);
  }catch(err){
    console.log(err);
  }
  currentDialog = ui.Panel({
    widgets: [
      ui.Label(title, extend(defaultStyle, {fontSize: '24px', fontWeight: 'bold'})), 
      ui.Label(content, defaultStyle), 
      ui.Panel({widgets:[closeButton], style: {position: 'bottom-right'}, layout: ui.Panel.Layout.flow("horizontal")})
    ],
    style: extend(defaultStyle,{
      position: 'top-center',
      height: sizes[windowSize]['height'],
      width: sizes[windowSize]['width'],
      textAlign: 'left',
      margin: '0px',
      padding: '10px',
    }),
    layout: ui.Panel.Layout.flow("vertical"),
  });
  map.add(currentDialog) ;  
}
function makeDialogUrl(title, text, url, windowSize){
  /*
    title: (String)
    content: (String)l
    size: (String, optional): xs, sm, md, lx
  */
  var sizes = {
    "sm": {'height': '100px', 'width': '52%'},
    "md": {'height': '50%', 'width': '50%'},
    "lg": {'height': '90%', 'width': '50%'},
  };
  var closeButton = ui.Button({
    label: "Close",
    onClick: function(){
      map.remove(currentDialog)  ;            
    },
    style: extend(defaultStyle, {
      'position': 'bottom-right',
      'margin': '0 auto',
    })
  });
  try{
    map.remove(currentDialog);
  }catch(err){
    console.log(err);
  }
  currentDialog = ui.Panel({
    widgets: [
      ui.Label(title, extend(defaultStyle, {fontSize: '24px', fontWeight: 'bold'})), 
      ui.Label(text, defaultStyle, url), 
      ui.Panel({widgets:[closeButton], style: {position: 'bottom-right'}, layout: ui.Panel.Layout.flow("horizontal")})
    ],
    style: extend(defaultStyle,{
      position: 'top-center',
      height: sizes[windowSize]['height'],
      width: sizes[windowSize]['width'],
      textAlign: 'left',
      margin: '0px',
      padding: '10px',
    }),
    layout: ui.Panel.Layout.flow("vertical"),
  });
  map.add(currentDialog) ;  
}
function makeDialogBatchResult(title, contents, windowSize){
  /*
    title: (String)
    content: (String)
    size: (String, optional): xs, sm, md, lx
  */
  var sizes = {
    "sm": {'height': '100px', 'width': '52%'},
    "md": {'height': '90%', 'width': '45%'},
    "lg": {'height': '90%', 'width': '50%'},
  };
  var closeButton = ui.Button({
    label: "Close",
    onClick: function(){
      map.remove(currentDialog);         
    },
    style: {
      position: 'bottom-right',
      margin: '0px',
      textAlign: 'right'
    }            
  });
  try{
    map.remove(currentDialog);
  }catch(err){
    console.log(err);
  }
  var widList = [];
//   widList.push(ui.Label(title, {fontSize: '24px', fontWeight: 'bold'}));
//   contents.forEach(function(content){
//     widList.push(ui.Panel({widgets:content, style: {width: '100%', position: 'bottom-center', textAlign: 'center'}, layout: ui.Panel.Layout.flow("vertical")}))
//   });
//   widList.push(ui.Panel({widgets:[closeButton], style: {width: '100%', position: 'bottom-right'}, layout: ui.Panel.Layout.flow("vertical")})
// )
  currentDialog = ui.Panel({
  // widgets: widList,
  widgets: [
      ui.Label(title, {fontSize: '24px', fontWeight: 'bold'}), 
      ui.Panel({widgets:contents, style: {width: '100%', position: 'bottom-center', textAlign: 'center'}, layout: ui.Panel.Layout.flow("vertical")}), 
      ui.Panel({widgets:[closeButton], style: {width: '100%', position: 'bottom-right'}, layout: ui.Panel.Layout.flow("vertical")})
    ],
    style: extend(defaultStyle,{
        position: 'top-center',
        height: sizes[windowSize]['height'],
        width: sizes[windowSize]['width'],
        textAlign: 'left',
        margin: '0px',
        padding: '10px',
    }),
    layout: ui.Panel.Layout.flow("vertical"),
  });
  map.add(currentDialog);
}
function makeDialogDownload(title, content, windowSize){
  /*
    title: (String)
    content: (String)
    size: (String, optional): xs, sm, md, lx
  */
  var sizes = {
    "md": {'height': '50%', 'width': '50%'},
    "lg": {'height': '90%', 'width': '50%'},
  };
  var closeButton = ui.Button({
    label: "Close",
    onClick: function(){
      map.remove(currentDialog);         
    },
    style: {
      position: 'bottom-right',
      margin: '0px',
      textAlign: 'right'
    }            
  });
  try{
    map.remove(currentDialog);
  }catch(err){
    console.log(err);
  }
  currentDialog = ui.Panel({
    widgets: [
      ui.Label(title, {fontSize: '24px', fontWeight: 'bold'}), 
      ui.Panel({widgets:[content], style: {width: '100%', position: 'bottom-center', textAlign: 'center'}, layout: ui.Panel.Layout.flow("horizontal")}), 
      ui.Panel({widgets:[closeButton], style: {width: '100%', position: 'bottom-right'}, layout: ui.Panel.Layout.flow("horizontal")})
    ],
    style: extend(defaultStyle,{
        position: 'top-center',
        height: sizes[windowSize]['height'],
        width: sizes[windowSize]['width'],
        textAlign: 'left',
        margin: '0px',
        padding: '10px',
    }),
    layout: ui.Panel.Layout.flow("vertical"),
  });
  map.add(currentDialog);
}
function Icon(asset, style, onClick, dimensions){
    var logo = ee.Image(asset);
    logo = logo.where(logo.select(3).neq(255), 255);
    if (style['textAlign'] === undefined){
      style['textAlign']   = 'center'
    }
    if (style['margin'] === undefined){
      style['margin']   = '0px'
    }
    if (style['padding'] === undefined){
      style['padding']   = '10px'
    }
    if(dimensions === undefined){
      dimensions = 800;
    }    
    var thumbnail = ui.Thumbnail({
        image: logo,
        params: {
            format: 'png',
            dimensions: dimensions,
            min: 0,
            max: 255,
        },
        onClick: onClick,
        style: style
    });
    return thumbnail;
}
function Icon2(asset, style, onClick, dimensions){
    var logo = ee.Image(asset);
    //logo = logo.where(logo.select(3).neq(255), 255);
    if (style['textAlign'] === undefined){
      style['textAlign']   = 'center';
    }
    if (style['margin'] === undefined){
      style['margin']   = '0px';
    }
    if (style['padding'] === undefined){
      style['padding']   = '10px';
    }
    if(dimensions === undefined){
      dimensions = 800;
    }    
    var thumbnail = ui.Thumbnail({
        image: logo,
        params: {
            format: 'png',
            dimensions: dimensions,
            min: 0,
            max: 255,
        },
        onClick: onClick,
        style: style
    });
    return thumbnail;
}
function buildImage(image){
  var bands = ee.Image(ee.Algorithms.If(ee.List(["LANDSAT_5"]).containsAll([image.get('SPACECRAFT_ID')]),
          image.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
                        ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "TIR1", "SWIR2"]),
          ee.Algorithms.If(ee.List(["LANDSAT_7"]).containsAll([image.get('SPACECRAFT_ID')]),
            image.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2',  'B7'],
                        ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "TIR1", "TIR2", "SWIR2"]),
            ee.Algorithms.If(ee.List(["LANDSAT_8"]).containsAll([image.get('SPACECRAFT_ID')]),
              image.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'],
                        ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "SWIR2",  "TIR1", "TIR2"]),
            ee.Algorithms.If(ee.List(["LANDSAT_9"]).containsAll([image.get('SPACECRAFT_ID')]),
              image.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'],
                        ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "SWIR2",  "TIR1", "TIR2"]),            
                        ee.Image(0).rename("TIR"))
            ))
          ));
  return bands;
}
var headerPanel = ui.Panel({
  widgets: [
    Icon(logoSSEBop, {width: "60px", height: "80px", margin: '0px'}, null, 600),
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Label("SSEBop", extend(defaultStyle, {"color": "#606978", fontSize: '40px', fontWeight: 'bold', margin: '0px'})),
            ui.Label("BR", extend(defaultStyle, {"color": "#606978", fontSize: '18px', fontWeight: 'bold'}))
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
        }),
        ui.Label("EVAPOTRANSPIRAÇÃO", extend(defaultStyle, {"color": "#606978", fontSize: '20px', margin: '0px'})), 
      ],
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle,{
        position: 'top-center',
        padding: '0px',
        margin: '0px',
      })
    }),
    // ui.Label("Beta", extend(defaultStyle, {"color": "#d9094e", 'fontSize': '20px'})),
  ],  
  layout: ui.Panel.Layout.flow("horizontal"),
});
var instructionsPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    widgets:[
      ui.Label(
        { 
          value:'Instructions',
          style: extend(defaultStyle,{ fontSize: '30px', fontWeight: 'bold', textAlign: 'left',padding: '10px',  margin: 'auto'})
        }
      ),
      ui.Label({ value:'O aplicativo SSEBop BR é uma versão do Balanço Energético de Superfície Simplificado Operacional' +
                       ' (SSEBop) Modelo ET para o Brasil que opera na plataforma Google Earth Engine.' +
                       ' O aplicativo do aplicativo SSEBop foi desenvolvido em parceria entre' +
                       ' Agência Nacional de Águas (ANA), United States Geological Survey (USGS), Instituto Nacional de Pesquisas Espaciais (INPE), Universidade Federal do Rio Grande do Sul (UFRGS) e Agrossatélite Tecnologia Aplicada' +
                       ' . O aplicativo SSEBop processa cenas Landsat individuais de qualquer' +
                       ' período de 1984 até o presente e para quase todas as áreas terrestres do globo. Inicialmente,' +
                       ' os resultados do modelo ET estão limitados à extensão geográfica do Brasil.',
         style: extend(defaultStyle,{textAlign: 'left',padding: '10px',  margin: 'auto'})
      }),
      ui.Label({ value:'A referência ET (ETo e ETr) é calculada independentemente usando o dado de clima disponível' +
                       ' data através da equação padronizada de Penman-Monteith. O aplicativo SSEBop usa dados climáticos em grade de Xavier et al. (2016) (https://utexas.app.box.com/v/Xavier-etal-IJOC-DATA) com ' +
                       ' GLDAS 2.0 (ImageCollection ID: NASA/GLDAS/V021/NOAH/G025/T3H) ou' +
                       ' CFSV2 (ImageCollection ID: NOAA/CFSV2/FOR6H) para estimar' +
                       ' evapotranspiração de referência.',
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px',  margin: 'auto'})
      }),
      ui.Label({ value:'A abordagem Psicrométrica por Satélite (Senay 2018) explica que o modelo SSEBop mais' +
                        ' efetivamente do que o princípio do balanço de energia típico porque SSEBop não resolve' +
                        ' todos os termos do balanço de energia de superfície, como fluxos de calor sensível e terrestre. No' +
                        ' aplicativo SSEBop, ETr é calculado usando a "referência de alfafa alta" como definido na equação' +
                        ' ASCE padronizada Penman-Monteith (Walter et al., 2000). ET fraction (ETf)' +
                        " é similar à já tradicional coeficiente de colheita 'crop coefficient'. ETf = ETact / ETr.",
         style: extend(defaultStyle, {textAlign: 'left', padding: '10px',  margin: 'auto'})
      }),
      ui.Label({ value:'To use the SSEBop app, users can specify -begin and -end dates to search in the date' +
                        " window and then move Google Maps into the area of interest. When the 'SEARCH" +
                        " FOR IMAGES IN THE CENTER OF MAP' button is pressed, the SSEBop app will" +
                        ' search the Google Earth Engine Data Catalog (https://developers.google.com/earth-' +
                        ' engine/datasets/catalog/landsat/) archive for those Landsat images that reside within' +
                        ' the date range and path/row in the center of map. For areas that are covered by two' +
                        ' paths, images from both paths will be presented. The SSEBop app will then provide a' +
                        ' list of images for the location and permit the user to select one image to process. The' +
                        ' SSEBop app processes one image (scene) at a time. The list of images available' +
                        ' includes an assessment of percent cloud cover for the entire scene as determined by' +
                        ' the USGS EROS data center.',
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px',  margin: 'auto'})
      }),
      ui.Label({ value:'Once an image has been selected, the SSEBop app will present a list of data layers' +
                        ' that can be displayed in the map window. ET fraction (ETf) and Actual ET (ETa)' +
                        ' images can be downloaded as GeoTIFF files using the hot links on the SSEBop app' +
                        ' site.',
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px',  margin: 'auto'})
      }), 
      ui.Label({ value:'In addition to visualization and download of all input model data layers and output' +
                        ' resulted layers over desired period, users can also left click on a base map and' +
                        ' SSEBop BR will generate a time series graphic with the variation of ETr, Eta and NDVI' +
                        ' along that period. Clicking on the small arrow located on right top corner of this graphicusers will also have access to .csv table of data used to generate it and download the' +
                        ' .png/svg picture of the graphic itself.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '10px',  margin: 'auto'})
      }),
      ui.Label(
        { 
          value:'Model Settings',
          style: extend(defaultStyle,{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left', padding: '2px'})
        }
      ),
      ui.Label({ value:'A reference for general equations used in SSEBop is available at Senay et al. (2013),' +
                      ' Senay et al. (2017) and Senay (2018). Table 1 shows the input data required for the' +
                      ' SSEBop model and the data sources used in the SSEBop app. Table 2 shows the' +
                      ' specified model parameterization for calibration of SSEBop in Brazil.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '10px',  margin: 'auto'})
      }),
      ui.Label({
         value: 'Table 1 - Summary of Data Types and Purposes for the Parameterization and Operation of the SSEBop Model.',
         style: extend(defaultStyle, {textAlign: 'left', fontSize:'14px'})
      }),
      ui.Thumbnail({
        image: ee.Image(table01),
        params: {
            format: 'png',
            dimensions: 1400,
            min: 0,
            max: 255,
        },
        style: extend(defaultStyle, {width: '70%'})
      }),
      ui.Label({
         value: 'Notes: The meteorological datasets available are Xavier et al. (2016), Global Land Data Assimilation System (GLDAS 2.1) and National Centers for Environmental Prediction Climate Forecast System (CFSV2).',
         style: extend(defaultStyle, {textAlign: 'left', fontSize:'14px'})
      }),
      ui.Label({
         value: 'Table 2 – Constraining parameters for producing c-factor by filtering the T corr . Landsat pixels that meet all listed criteria are used for c-factor calculation.',
         style: extend(defaultStyle, {textAlign: 'left', fontSize:'14px'})
      }),
      ui.Thumbnail({
        image: ee.Image(table02),
        params: {
            format: 'png',
            dimensions: 1400,
            min: 0,
            max: 255,
        },
        style: extend(defaultStyle, {width: '70%' })
      }),
       ui.Label({
         value: 'Notes: Some parameters were modified for the use of SSEBop in Brazilian territory and differ from the values published in the mentioned literature (Senay et al. 2017). These values are shown in Table 2.',
         style: extend(defaultStyle, {textAlign: 'left', fontSize:'14px'})
      }),
      ui.Label({
         value: 'Figure 1 - Flowchart of the steps to calculate the actual evapotranspiration (Eta) using the SSEBop app.',
         style: extend(defaultStyle, {textAlign: 'left', fontSize:'14px'})
      }),
      ui.Thumbnail({
        image: ee.Image(figura01),
        params: {
            format: 'png',
            dimensions: 1600,
            min: 0,
            max: 255,
        },
        style: extend(defaultStyle, {width: '85%', margin: '0 auto'})
      }),
      ui.Label(
        { 
          value:'Definitions',
          style: extend(defaultStyle,{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left', padding: '2px'})
        }
      ),
      ui.Label({ value:'TRUE COLOR (RED, GREEN, BLUE)– This is a color composite of the red,'+
                        ' green and blue bands of the Landsat image.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'FALSE COLOR (NIR, SWIR1, RED) – This is a color composite of Landsat 5'+
                        'and 7 bands 4, 5 and 3. For Landsat 8, it is bands 5, 6, 4.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '10px'})
      }),
      ui.Label({ value:'CLOUD MASK - Cloud mask based on Landsat Quality Assessment band.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'VEGETATION INDEX (NDVI) – Normalized Difference Vegetation Index, calculated from the Near Infrared (NIR) band and red band using at-surface reflectance.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'ELEVATION (DEM) – Digital Elevation Model in meters. We use the 30m SRTM.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'SURFACE TEMPERATURE (Ts) – This is the land surface temperature'+
                      ' derived from the Landsat Collection 1 Tier 1 images. The native resolution of'+
                      '  Landsat 5 is 120 m, of Landsat 7 is 60 m, and of Landsat 8 is 100 m. These are'+
                      '  all resampled to 30 m by USGS-EROS using cubic convolution. Units are in Kelvin (K).',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'GRASS REFERENCE ET (ETo) – This is the standardized ASCE reference ET'+
                      ' for the daily clipped, cool season grass Penman-Monteith reference equation'+
                      ' (Walter et al., 2000, Allen et al., 1998) and represents an average maximum'+
                      ' ET rate for clipped grass. ETo tends to be 20 to 40% lower than alfalfa reference'+
                      ' ETr. Units are in millimeters (mm).',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'ALFALFA REFERENCE ET (ETr) – This is the standardized ASCE reference'+
                        ' ET for the daily tall alfalfa Penman-Monteith reference equation (Walter et al.,'+
                        ' 2000) and represents a near maximum ET rate. ETr tends to be 20 to 40%'+
                        ' higher than grass reference ETo. Units are in millimeters (mm).',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'TEMPERATURE DIFFERENCE (dT) – This defines the temperature difference'+
                       ' (dT) in K between the “hot” (bare areas) and “cold” (well vegetated) reference'+
                       '  values for each pixel. The cold limit temperature is expected to be equal to the'+
                       '  air temperature at the canopy level, making dT the difference between surface'+
                       '  and air temperature over the bare/dry surface. The novelty in the SSEBop'+
                       '  model is that dT is predefined for a given pixel, unlike the original SSEB'+
                       '  formulation or similar energy balance models that use a set of reference hot'+
                       '  and cold pixel pairs applicable for a uniform hydro-climatic region.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'ET FRACTION (ETf) – This is the “fraction of alfalfa reference ET” (ETr)'+
                        ' estimated by SSEBop model and is similar to the alfalfa reference-based crop'+
                        ' coefficient under observed conditions. ETf generally should vary from 0 to 1.05.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label({ value:'ACTUAL ET (ETa) – Actual ET (ETa) is estimated as a fraction of the Alfalfa'+
                       ' Reference ET (ETr by default). It is calculated using the ET fraction times the'+
                       ' Referece ET. ETa = ETf * ETr. Units are in millimeters (mm).',
         style: extend(defaultStyle, {textAlign: 'left', padding: '5px'})
      }),
      ui.Label(
        { 
          value:'References',
          style: extend(defaultStyle,{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left', padding: '2px'})
        }
      ),
      ui.Label({
        value: 'Allen, Richard G. et al. Crop evapotranspiration-Guidelines for computing crop water requirements. FAO Irrigation and drainage paper 56. FAO, Rome, v. 300, n. 9, p. D05109, 1998.',
         style: extend(defaultStyle, {textAlign: 'left', padding: '2px', fontSize:'12px'})
      }),
      ui.Label({
        value: "Walter, Ivan A. et al. ASCE's standardized reference evapotranspiration equation. In: Watershed management and operations management 2000. 2000. p. 1-11.",
        style: extend(defaultStyle, {textAlign: 'left', padding: '2px', fontSize:'12px'})
      }),
      ui.Label({
        value: "Xavier, Alexandre C. et al. Daily gridded meteorological variables in Brazil (1980-2013), International Journal of Climatology, 2016, 36 (6), 2644–2659.",
        style: extend(defaultStyle, {textAlign: 'left', padding: '2px', fontSize:'12px'})
      }),
      ui.Label({
        value: "Xavier, Alexandre C. et al. An update of Xavier, King and Scanlon (2016) daily precipitation gridded data set for the Brazil, Proceedings of the 18th Brazilian Symposium on Remote Sensing, May 28-31, 2017, Santos, São Paulo, Brazil.",
        style: extend(defaultStyle, {textAlign: 'left', padding: '2px', fontSize:'12px'})
      }),
      ui.Label({
        value: "Senay, Gabriel B. et al. Operational evapotranspiration mapping using remote sensing and weather datasets: A new parameterization for the SSEB approach. JAWRA Journal of the American Water Resources Association, v. 49, n. 3, p. 577-591, 2013.",
        style: extend(defaultStyle, {textAlign: 'left', padding: '2px', fontSize:'12px'})
      }),
      ui.Label({
        value: "Senay, Gabriel B. et al. Satellite-based water use dynamics using historical Landsat data (1984–2014) in the southwestern United States. Remote Sensing of Environment, v. 202, p. 98-112, 2017.",
        style: extend(defaultStyle, {textAlign: 'left', padding: '2px',   fontSize:'12px'})
      }),
      ui.Label({
        value: "Tasumi, Masahiro et al. At-surface reflectance and albedo from satellite for operational calculation of land surface energy balance. Journal of hydrologic engineering, v. 13, n. 2, p. 51-63, 2008.",
        style: extend(defaultStyle, {textAlign: 'left', padding: '2px', fontSize:'12px'})
      }),
      ui.Button({
        label: "Close",
        onClick: function(){
          map.remove(instructionsPanel);            
        },
        style: extend(defaultStyle, {position: 'bottom-right', margin: '0 0 0 auto'})
      })
    ],
    style:extend(defaultStyle,  {
        position: 'top-center',
        shown: true,
        width: '60%',
        height: '95%',
        padding: '5px',
        margin: '10px',
    })
  });
var FAQPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    widgets:[
      ui.Label({ value:'Frequently Asked Questions (FAQ)',
        style:  extend(defaultStyle, { fontSize: '30px', fontWeight: 'bold', textAlign: 'left',padding: '5px',  margin: 'auto'})
      }),
      ui.Label({ value:'Contact: ssebop.app@gmail.com',
         style: extend(defaultStyle, {textAlign: 'left', fontSize:'18px', padding: '10px',  margin: 'auto'})
      }),
      ui.Label({ value:"Why aren't my downloads working?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"There are two common situations. If the download doesn't even start, your pop-up"+
                        " blocker may be blocking the download. Simply turn it off and try again. If you get a"+
                        " downloaded image but it won't open, or is corrupted, then your internet connection"+
                        " was likely interrupted during the download. We are researching more stable methods for providing downloads.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"Can more than one Landsat scene and date be processed at the same time?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"No. Each date and scene are processed independently. They can be downloaded and stitched together in image processing applications.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"What are the differences between available meteorological datasets?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"Xavier dataset is based on meteorological stations of Brazil data interpolation with a"+
                       " pixel size of 0.25 x 0.25 arc degrees and comprises the period from 1985 to 2017."+
                       " Xavier median is the daily median based on the period from 2005 to 2017. CFSV2 is"+
                       " a daily aggregation based on a fully coupled model representing the interaction"+
                       " between the Earth's atmosphere, oceans, land, and sea ice with a pixel size of 0.2 x"+
                       " 0.2 arc degrees and comprises the period from 1979 to present. GLDAS ingests"+
                       " satellite and ground-based observational data products to generates optimal fields of"+
                       " land surface states and fluxes using advanced land surface modeling and data"+
                       " assimilation techniques. It has a pixel size of 0.25 x 0.25 arc degrees and comprises"+
                       " the period from 2000 to present.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"How was dT estimated?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"It uses 33 years mean (1980-2013) of daily gridded meteorological variables based on"+
                      " Brazil meteorological dataset under clear sky condition (Senay 2013).",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"What do I do with an ETf image once I download it?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"You can use the ETf image as is to show areas of high and low relative ET. These can"+
                       " be useful to assessing areas of water stress, areas of irrigation, and spatial distribution"+
                       " of ET. The ETf image can be 'colorized' using image processing systems. The ETf"+
                       " images can be used to develop crop coefficient curves and to derive estimates of soil"+
                       " moisture. The crop coefficient from this exercise could be lower than published values"+
                       " which are determined under optimum agronomic condition, reflecting type and stage"+
                       " of crop but not under stress conditions. If total (integrated) ET over a time period, such"+
                       " as one month or one growing period or one year is desired, then one will need to"+
                       " process multiple images and then conduct a time-integration. The daily ET values are"+
                       " then summed over the period of interest.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"What are the no-data areas on the images?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"These areas was masked by cloud and shadow filter applied to Landsat images.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"What if the SSEBop app does not successfully produce an ET image (it 'times out' and gives a 'Something went wrong on the server. Please try again.'Message)?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"This may be a bug. If after several attempts you still receive this message email us at the address listed at the top of the FAQ.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"How is SSEBop model calibration for temperature correction (c-factor) performed?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"SSEBop c-factor is uniquely calculated for each Landsat scene from well-"+
                       " watered/vegetated pixels. This temperature correction component is based on a ratio"+
                       "  of maximum air temperature and land surface temperature that has passed through"+
                       "  several conditions such as NDVI limits. Users are advised to refer to general"+
                       "  methodology (Senay et al., 2017) and the specific Brazil implementation in Table 2 of this document.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Label({ value:"How is SSEBop model calibration for temperature correction (c-factor) performed?",
         style: extend(defaultStyle, {textAlign: 'left',padding: '5px', fontWeight: 'bold'})
      }),
      ui.Label({ value:"SSEBop c-factor is uniquely calculated for each Landsat scene from well-"+
                       " watered/vegetated pixels. This temperature correction component is based on a ratio"+
                       "  of maximum air temperature and land surface temperature that has passed through"+
                       "  several conditions such as NDVI limits. Users are advised to refer to general"+
                       "  methodology (Senay et al., 2017) and the specific Brazil implementation in Table 2 of this document.",
         style: extend(defaultStyle, {textAlign: 'left',padding: '10px'})
      }),
      ui.Button({
        label: "Fechar",
        onClick: function(){
          map.remove(FAQPanel);            
        },
        style: extend(defaultStyle, {position: 'bottom-right', margin: '0 0 0 auto'})
      })
    ],
    style: {
      position: 'top-center',
      shown: true,
      width: '60%',
      height: '95%',
      padding: '5px',
      margin: '10px',
    }
  });
var buttonInstructions = ui.Button({
  label: 'Instruções',
  style: extend(defaultStyle, { fontSize: '26px', textAlign: 'top-center', color: '#0a56a0', padding: '2px', margin: 'auto', width: '90px'}),
  onClick: function(){map.add(instructionsPanel)}
});
var buttonPublication = ui.Button({
  label: 'Publicação',
  style: extend(defaultStyle, { fontSize: '26px', textAlign: 'top-center', color: '#0a56a0',padding: '2px', margin: 'auto', width: '90px'}),
  onClick: function(){makeDialogUrl("Abrir Documento", "Publicação", "http://biblioteca.ana.gov.br/asp/download.asp?codigo=139744&tipo_midia=2&iIndexSrv=1&iUsuario=0&obra=82376&tipo=1&iBanner=0&iIdioma=0", "sm")}
});
var buttonSNIRH = ui.Button({
  label: 'SNIRH',
   style: extend(defaultStyle, { fontSize: '26px', textAlign: 'center', fontWeight: 'bold', color: '#0a56a0', margin: 'auto', width: '90px'}),
   onClick: function(){makeDialogUrl("Acessar Portal","Portal SNIRH","https://www.snirh.gov.br/portal/", "sm")}
});
var buttonFAQ = ui.Button({
  label: 'FAQ',
   style: extend(defaultStyle, { fontSize: '26px', textAlign: 'top-center', color: '#0a56a0', padding: '2px', margin: 'auto', width: '90px'}),
   onClick: function(){map.add(FAQPanel)}
});
var buttonsPanel = ui.Panel({
   layout: ui.Panel.Layout.flow('horizontal'),
   style: extend(defaultStyle, { padding: '3px', margin: '0 auto'}),
   widgets: [buttonInstructions, buttonPublication, buttonSNIRH, buttonFAQ]
});
var startDate = ui.Textbox({
  value: "2016-01-01",
  placeholder:"yyyy-mm-dd",
  style: extend(defaultStyle,{
    width: '50%',
    margin: '0px',
  }),
  onChange: updateTimeSeries,
});
var endDate = ui.Textbox({
  // value: "2017-01-01",
  value: "2016-03-01",
  placeholder:"yyyy-mm-dd",
  style: extend(defaultStyle,{
    width: '50%',
    margin: '0px',
  }),
  onChange: updateTimeSeries,
});
var datePanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Data de interesse", extend(defaultStyle, {backgroundColor: "#0e753b", color: "#ffffff",  position:'top-center', fontWeight: 'bold', textAlign: 'center'}))],
      style: extend(defaultStyle, {backgroundColor: "#0e753b", position:'top-center'}),
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({
      widgets: [startDate, endDate], 
      style: extend(defaultStyle, {
        margin: '10px 0px 10px 0px'
      }),
      layout: ui.Panel.Layout.flow("horizontal"),
    })  
  ],
});
var lon_text = ui.Textbox({ 
 placeholder: "Longitude", 
 style: extend(defaultStyle, { color: "#000000", width: '160px'})}); 
var lat_text = ui.Textbox({ 
 placeholder: "Latitude", 
 style: extend(defaultStyle, { color: "#000000", width: '160px'})}); 
var latlon_search = ui.Button({
  label: 'Buscar',
  onClick: function(){
    apagaFeature();
    var coordinates = [parseFloat(lon_text.getValue()), parseFloat(lat_text.getValue())]
    print(coordinates)
    currentPoint = ee.Geometry.Point(coordinates);
    map.layers().reset();
    map.layers().set(1, ui.Map.Layer(currentPoint, extend(defaultStyle, {color: 'red'}),'Point'));
    map.centerObject(currentPoint, 7, function(){
       updateTimeSeries();
    });
  },
  style: extend(defaultStyle, { 
    fontSize: '26px', textAlign: 'top-center', color: '#000000',padding: '10px', margin: 'auto', width: '170px'})
});
var LatLon_location =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    style:extend(defaultStyle,  {position: 'top-center', margin: 'auto'}),
    widgets: [
      ui.Panel({
        layout: ui.Panel.Layout.flow("horizontal"), 
        style: extend(defaultStyle, {position: 'top-center', margin: 'auto'}),
        widgets: [
          lon_text,
          lat_text
        ]
      }),
    latlon_search
  ]
});
var locationPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Local de interesse", extend(defaultStyle,{backgroundColor: "#0e753b", color: "#ffffff",  position:'top-center', fontWeight: 'bold', textAlign: 'center'}))],
      style: extend(defaultStyle, {backgroundColor: "#0e753b", position:'top-center'}),
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Label("Clique no centro da região de interesse no mapa.", defaultStyle),
    ui.Label("Devido às limitações recentes impostas pelo Google Earth Engine, "
              + "o tamanho da região de download dos produtos está temporariamente "
              + "limitado a uma área de aproximadamente 600 km² (0,22° x 0,22°).",
            extend(defaultStyle, {fontSize: '12px', textAlign: 'justify'})),
    LatLon_location
  ], 
});
var cloudCoverField = ui.Slider({min: 0, max: 100, value: 74, style:  extend(defaultStyle,{width: '90%', margin: '10px auto'})});
var inputFieldGeomtry = ui.Textbox({
  value: "",
  style: extend(defaultStyle, {
    width: '90%',
    margin: '10px auto'
  }),
})
var inputSelectField = ui.Select({
  items: ["WKT", "GEOJSON"],
  style: extend(defaultStyle, {
    width: '90%',
    margin: '10px auto'
  }),
  onChange: function(value){
    if(value == "WKT"){
      // inputFieldGeomtry.setValue('POINT (-47.11530033645065 -16.509085600442837),POINT (-47.062307888373766 -16.582113027388193),POINT (-47.09331884595438 -16.545949423323975),POINT (-47.062961617049126 -16.598709210584598),POINT (-47.067178836586365 -16.610246338929286),POINT (-47.02481561753135 -16.673334446504057),POINT (-47.01328451461472 -16.647104397172637),POINT (-47.04499507008511 -16.638438825526734),POINT (-47.03637403261042 -16.6330366810252),POINT (-47.00293180736942 -16.689155615956366),POINT (-46.994349559418346 -16.696370662169315),POINT (-47.048933720566964 -16.821674320533308),POINT (-47.09287346829915 -16.89726907656213),POINT (-47.072172505146874 -16.61543591812242),POINT (-47.10272087856654 -16.52010843617756),POINT (-47.1109666735811 -16.515470767121876),POINT (-47.059709764988106 -16.572062606058743),POINT (-47.05543660977538 -16.561688316753106),POINT (-47.061242465438546 -16.55087051416888),POINT (-47.070615506105085 -16.621140371174167),POINT (-47.06017254446468 -16.63440950451355),POINT (-47.04455329720267 -16.79436855583931),POINT (-47.015566521848285 -16.980240449149782),POINT (-47.11143911899116 -17.514994105670585),POINT (-47.01024484247283 -16.682586593909978),POINT (-47.1147427584456 -17.50916861041401),POINT (-47.1138397769853 -17.47996260127271),POINT (-47.118085798779724 -17.464584249063087),POINT (-47.14515957418589 -17.442584853552862),POINT (-47.08840539809245 -16.541894063197024),POINT (-47.08625018434486 -16.5479746407819)')
      // inputFieldGeomtry.setValue('POINT (-47.11530033645065 -16.509085600442837),POINT (-47.062307888373766 -16.582113027388193),POINT (-47.09331884595438 -16.545949423323975)')
    }else{
      if(value == "GEOJSON"){
        // inputFieldGeomtry.setValue('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":2},"geometry":{"type":"MultiPolygon","coordinates":[[[[-45.782221003210566,-12.941256073884883],[-45.781328631835954,-12.940676269670357],[-45.779114228795244,-12.94019309846172],[-45.77676762258792,-12.94038636705752],[-45.77508203221365,-12.941256073884883],[-45.773594746589296,-12.942383467109085],[-45.772471019673105,-12.944734870857015],[-45.772404918089805,-12.947408357760605],[-45.77356169579764,-12.94969529367783],[-45.77455321954721,-12.951015909084337],[-45.776866774962876,-12.951917788754049],[-45.779114228795244,-12.952111048258512],[-45.78079981916951,-12.9518211589456],[-45.78265066350205,-12.951176959264803],[-45.7840057459598,-12.949147719383335],[-45.78479896495945,-12.946764146671429],[-45.784600660209534,-12.944573816513332],[-45.78393964437648,-12.94289884517082],[-45.782221003210566,-12.941256073884883]]]]}},{"type":"Feature","properties":{"id":3},"geometry":{"type":"MultiPolygon","coordinates":[[[[-45.788930313916005,-12.94583003763441],[-45.79071505666523,-12.946119933917096],[-45.79197098674802,-12.946731936073258],[-45.79296251049759,-12.947923725432986],[-45.7937887802889,-12.949212139951024],[-45.79435064374699,-12.950854858799769],[-45.7937887802889,-12.95259419636375],[-45.793061662872546,-12.953947006073246],[-45.79193793595636,-12.955203179939124],[-45.79048370112366,-12.955815159783802],[-45.78896336470765,-12.956233881968986],[-45.7869803172085,-12.955815159783802],[-45.78588964108398,-12.954913294224694],[-45.784501507834584,-12.953463860591809],[-45.7840057459598,-12.95236872736458],[-45.78367523804327,-12.950951488983002],[-45.784170999918054,-12.94866456459481],[-45.78562523475076,-12.947054041867624],[-45.787178621958425,-12.946280987261783],[-45.788930313916005,-12.94583003763441]]]]}}]}')
      }else{
        alert("Formato não suportado!!");
      }
    }
  }
})
function buildAndAddAccumulatedETaToMap(roi){
  var startDateValue = startDate.getValue();
  var endDateValue = endDate.getValue();
  var cloudCover = cloudCoverField.getValue();
  //var cloudCover = 75;
    print(startDateValue, endDateValue, cloudCover, roi)
  var colL5 = landsat5Collection
    .filterMetadata("CLOUD_COVER", "less_than", cloudCover)
    .filterDate(startDateValue, endDateValue)
    .filterBounds(roi)
    .select("B2", "B3", "B4", "B5","B6", "BQA");
  var colL7 = landsat7Collection
    .filterMetadata("CLOUD_COVER", "less_than", cloudCover)
    .filterDate(startDateValue, endDateValue)
    //.filterDate("2012-01-01", "2013-04-01")
    .filterBounds(roi)
    .select("B2", "B3", "B4", "B5","B6_VCID_2", "BQA");
  var colL8 = landsat8Collection
    .filterMetadata("CLOUD_COVER", "less_than", cloudCover)
    .filterDate(startDateValue, endDateValue)
    .filterBounds(roi)
    .select("B3", "B4", "B5", "B6","B10", "BQA");
  var collection = colL8.merge(colL5).merge(colL7);
  collection = collection.sort("system:time_start");
  var collectionETa = collection
    .map(function(image){
      var roi_in = image.geometry().intersection(roi, ee.ErrorMargin(1));
      var maskedImage = utilsGeomFunctions.maskImage(image, roi_in);
      var ETa = SSEBop.ETa({
          "weather_dataset": SSEBop.datasets.xavier,
          "dT_dataset": SSEBop.datasets.xavier,
          "dT_type": SSEBop.dTTypes.clearsky,
        },
        maskedImage, 
        0
      );
      return ee.Image(ETa.select("ETa")
        .set("system:footprint", roi_in)
        .copyProperties(image, ['system:index', 'system:time_start', 'system:time_end'])
      );
    });
  var accumulated = ee.Image(dailySSEBop.buildSumFromCollection(collectionETa))
    .clip(roi)
    .rename("ETa");  
  var count = collectionETa.count()
    .clip(roi)
    .rename("count");
  var filename = startDateValue + "_" + endDateValue;
  var loading = ui.Label("Loading layers...");
  map.add(loading);
  accumulated.addBands(count).reduceRegion({
      reducer: ee.Reducer.percentile([2, 98]),
      geometry: roi,
      scale: 250,
      maxPixels:1e13
  }).evaluate(function(data){
    map.addLayer(roi, {}, filename + " - ROI");
    // map.addLayer(count, {
    //   min: data["count_p2"], 
    //   max: data["count_p98"], 
    //   palette: ['d7191c', 'fdae61', 'ffffc0', 'a6d96a', '1a9641']
    // }, filename + " - Images availability");
    // map.addLayer(accumulated, {
    //   min: data["ETa_p2"], 
    //   max: data["ETa_p98"], 
    //   palette: SSEBop.ETaPalette
    // }, filename + " - Accumulated ETa");
    map.remove(loading);
  });
  roi.bounds().evaluate(function(data){
    Export.image.toDrive({
      image: accumulated.addBands(count).int16(),
      description: filename + "_ETa",
      fileNamePrefix: filename + "_ETa",
      region: data, 
      scale: 30, 
      maxPixels: 1E13
    });
  })
  //Média dos pixels de ETa (mm)
  var accumulated_mm = accumulated.select('ETa')
                            .reduceRegion({
                              reducer: ee.Reducer.mean(),
                              geometry: roi,
                              scale:30,
                              maxPixels: 1e9
                            });
 var precipitacao = chirps.select('precipitation').filterDate(startDateValue, endDateValue);
  var prec_accum_mm = precipitacao.sum()
                            .reduceRegion({
                            reducer: ee.Reducer.mean(),
                            geometry: roi,
                            scale:30,
                            maxPixels: 1e9
                            });
  //Área do polígono em hectares                      
  var area_perim_ha = roi.area().divide(10000);
  // Apply the toGeoJSONString method to the Geometry object.
var geometryToGeoJSONString = roi.toGeoJSONString();
// Print the result to the console.
var titleGeom = String(String(roi.toGeoJSON()['type']) + ": " + String(roi.toGeoJSON()['coordinates']))
  print('Título: ', titleGeom)
  print('Precipitação média (mm):', prec_accum_mm.get('precipitation'));
  print('ETa média (mm):', accumulated_mm.get('ETa'));
  print('Área do perímetro (ha):', area_perim_ha);
  print('Volume ETa (m3):', ee.Number(accumulated_mm.get('ETa')).multiply(area_perim_ha).multiply(10));
  print('Volume Precipitação (m3):', ee.Number(prec_accum_mm.get('precipitation')).multiply(area_perim_ha).multiply(10));
  dictBatchResult.push(ee.Dictionary({
    title: titleGeom,
    mean_precipitation: prec_accum_mm.get('precipitation'),
    mean_eta: accumulated_mm.get('ETa'),
    geom_area_ha: area_perim_ha,
    eta_volume: ee.Number(accumulated_mm.get('ETa')).multiply(area_perim_ha).multiply(10),
    precipitation_volume: ee.Number(prec_accum_mm.get('precipitation')).multiply(area_perim_ha).multiply(10)
  }));
}
var isValidType = false;
  var listOfFeatures = [];
  var featCollectionFinal = null
  var loadingPanel = ui.Panel({
    widgets: [
      ui.Label("Generating CSV.. Please wait and grab some coffee...", extend(defaultStyle,{position:'top-center', fontWeight: 'bold', textAlign: 'center'})),
      ui.Button({
        label: 'Fechar',
        onClick: function(){
          map.remove(loadingPanel)
        },
        style: extend(defaultStyle, { 
          color: '#000000', position:'bottom-right'})
      }),
    ],
    style: extend(defaultStyle, {position:'top-center'}),
    layout: ui.Panel.Layout.flow("horizontal"),
  });
function runBatchProcessing(){
  var globalBounds = [[[-180,-90],[180,-90],[180,90],[-180,90],[-180,-90]]];
  var inputFormat = inputSelectField.getValue();
  //var inputFormat = "WKT";
  // var isValidType = true;
  dictBatchResult = [];
  // var listOfFeatures = [];
  // var featCollectionFinal = null
  var roi_list = null
  var input = inputFieldGeomtry.getValue();
  var start = startDate.getValue();
  var end = endDate.getValue();
  var _startDate = new Date(start);
  var _endDate = new Date(end);
  var periodDays = ((_endDate - _startDate) / (1000*60*60*24));
  // var _startDate = ee.Date(start);
  // var _endDate = ee.Date(end);
  // var periodDays = ee.Number(_endDate.difference(_startDate, 'days'));
 if(periodDays <= 426 && periodDays >= 30){
  if(inputFormat == "GEOJSON"){
    map.add(loadingPanel)
    var featureCollection = ee.FeatureCollection(utilsGeomFunctions.geojson2FeatureCollection(input));
    var featureCollectionGeometry = featureCollection.geometry();
    isValidType = checkPointMultiPointType(featureCollectionGeometry).getInfo()
    if(isValidType === true){
      roi_list = featureCollection.toList(featureCollection.size()).getInfo()
    }
    else{
      makeDialog("Problema no GeoJson", "Houve um problema com o GeoJson submetido, por favor envie um GeoJson de Point ou MultiPoint válido.", "sm");
    }
    roi_list  = ee.FeatureCollection(roi_list.map(function(geom) {
        var roi = ee.Geometry(geom.geometry);
        isValidType = checkPointMultiPointType(roi)
        return geom;
      }))
      isValidType.evaluate(function(is){
        if(is === true){
          var saida = executeETValue(roi_list)
          // makeDialog("Processamento Concluído", "Seu processamento está concluído, verifique a barra lateral para realizar o Download do seu CSV.", "sm");
        }
        else{
          makeDialog("Problema em um dos Pontos", "Houve um problema em algum dos pontos submetidos, por favor revise o GeoJson e tente novamente.", "sm");
        }
      })
      map.remove(loadingPanel)
  }else{
    if(inputFormat == "WKT"){
      map.add(loadingPanel)
      var listGeoms = input.trim().split("),");
      var roi_list_features  = listGeoms.map(function(geom) {
        var geojson = utilsGeomFunctions.fromWKT2Json(geom);
        var roi = ee.Geometry(geojson);
        isValidType = checkPointMultiPointType(roi)
        return ee.Feature(roi)
      })
      roi_list = ee.FeatureCollection(roi_list_features)
       isValidType.evaluate(function(is){
        if(is === true){
          var saida = executeETValue(roi_list)
          // makeDialog("Processamento Concluído", "Seu processamento está concluído, verifique a barra lateral para realizar o Download do seu CSV.", "sm");
        }
        else{
          makeDialog("Problema em um dos Pontos", "Houve um problema em algum dos pontos submetidos, por favor revise o WKT e tente novamente.", "sm");
        }
      })
    }else{
      alert("Formato não suportado!");
    }
   }
 }else{
   makeDialog("Período de interesse", "O período de interesse deve ser menor ou igual a 426 dias e superior a 30 dias", "sm");
 }
}
function sortFeaturesByDistance(fc) {
  // Get the first point in the FeatureCollection
  var firstPoint = ee.Geometry.Point(fc.first().geometry().coordinates());
  // Define a function to calculate the distance between two points
  function calculateDistance(point1, point2) {
    var distance = point1.distance(point2);
    return distance;
  }
  // Add a new property to each feature representing its distance to the first point
  var fcWithDistances = fc.map(function(feature) {
    var point = ee.Geometry.Point(feature.geometry().coordinates());
    var distance = calculateDistance(firstPoint, point);
    feature = feature.set('id', feature.id())
    return feature.set('distance', distance);
  });
  // Sort the features by their distance to the first point
  var sorted_roi_list_featC = fcWithDistances.sort('distance');
  var sorted_roi_list_ee = sorted_roi_list_featC.toList(sorted_roi_list_featC.size())
  // Return the sorted FeatureCollection
  return sorted_roi_list_ee;
}
function addPropertiesOfFeature (geometry) {
  // var newFeature = feature.set({'newProperty': 'some value'});
  // print(newFeature);
  var feature = ee.Feature(geometry)
  // Get the feature's properties as a dictionary
  var propertiesDict = feature.toDictionary();
  // Get the keys of the dictionary as an ee.List
  var keysList = propertiesDict.keys();
  // Map over the keysList to convert each key-value pair to an ee.Dictionary object
  var propertiesList = keysList.map(function(key) {
    var value = propertiesDict.get(key);
    return ee.Dictionary({'key': key, 'value': value});
  });
  return propertiesList;
}
function executeETValue(roi_list){
  var final_roi_ee = sortFeaturesByDistance(roi_list);
  var featList = final_roi_ee.map(function (geometry) {
      var geom = ee.Feature(geometry)
      var dictionary = geom.toDictionary().remove(['distance']);
      var leng = buildETValues(geom)
      var sizeListLeng = ee.List(leng.get("xValuesIDW")).length()
     // var nSteps = ee.List.sequence(0, leng.interpolatedETa["array"].length - 1).getInfo();
      var nSteps = ee.List.sequence(0, ee.Number(sizeListLeng).subtract(ee.Number(1)));
      var feat = nSteps.map(function(i){
        var dict = ee.Dictionary({
           ETa: ee.List(ee.Dictionary(leng.get("interpolatedETa")).get("array")).get(i),
           ETf: ee.List(ee.Dictionary(leng.get("interpolatedETf")).get("array")).get(i),
           ETo: ee.List(ee.Dictionary(leng.get("interpolatedETo")).get("array")).get(i), 
           ETr: ee.List(ee.Dictionary(leng.get("interpolatedETr")).get("array")).get(i),
           NDVI: ee.List(ee.Dictionary(leng.get("interpolatedNDVI")).get("array")).get(i),
          precipitation: ee.List(ee.Dictionary(leng.get("interpolatedPrecipitation")).get("array")).get(i),
           hasImage: ee.Algorithms.IsEqual(ee.List(leng.get("observationsValues")).get(i), ee.Number(0)),
           date: ee.List(leng.get("xValuesIDW")).get(i), 
           id: geom.id(),
           geom: geom.geometry()
        });
        dict = dict.combine(dictionary, false); //combine both dictionaries
        var feature = ee.Feature(geom.geometry(), dict);
        return feature;
      })
      // listOfFeatures = ee.List(listOfFeatures).cat(feat)
      return feat;
    })
    listOfFeatures = featList.flatten()
    featCollectionFinal = ee.FeatureCollection(listOfFeatures);
    downloadCSVLabel = (ui.Label('Clique aqui para realizar o Download do CSV', extend(defaultStyle, {fontSize: '16px', fontWeight: 'bold', textAlign: 'center'})).setUrl(getUrlLinkCSV(featCollectionFinal)));
    map.remove(loadingPanel)  
    makeDialogBatchResult("Processamento em Batch concluído com Sucesso", downloadCSVLabel, "sm");
    // batchProcessingPanel.add(downloadCSVLabel);
      // map.centerObject(featCollectionFinal);
    return true;
}
function checkPointMultiPointType(roi){
  var res = ee.Algorithms.If(
            ee.Algorithms.IsEqual(roi.type(), "Point"),
            true,
            ee.Algorithms.If(
              ee.Algorithms.IsEqual(roi.type(), "MultiPoint"),
              true,
              false
            )
          )
          return res;
}
var btnRun= ui.Button({
  label: 'Executar',
  onClick: function(){
    if(downloadCSVLabel !== null)
    {
      batchProcessingPanel.remove(downloadCSVLabel)
    }
    runBatchProcessing()
  },
  style: extend(defaultStyle, { 
    color: '#000000',padding: '10px', margin: 'auto', width: '95%'})
});
var batchProcessingPanel = ui.Panel({
  style: extend(defaultStyle, {
    width: '100%'
  }),
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Processamento em Lote", extend(defaultStyle,{backgroundColor: "#0e753b", color: "#ffffff",  position:'top-center', fontWeight: 'bold', textAlign: 'center'}))],
      style: extend(defaultStyle, {backgroundColor: "#0e753b", position:'top-center'}),
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Label("Cobertura de Nuvem", extend(defaultStyle,{textAlign: 'left', margin: '13px 10px -8px 10px'})),
    cloudCoverField,
    ui.Label("Tipo de arquivo", extend(defaultStyle,{textAlign: 'left', margin: '13px 10px -8px 10px'})),
    inputSelectField,
    ui.Label("Região de Interesse (ROI)", extend(defaultStyle,{textAlign: 'left', margin: '13px 10px -8px 10px'})),
    inputFieldGeomtry,
    btnRun,
    ui.Label("Acesse o link a seguir para upload do arquivo, em seguida cole a saida do upload no campo acima.", extend(defaultStyle,{ width: '90%', textAlign: 'left',  margin: '0 auto'})),
    ui.Label("Ir para o APP de Conversão", extend(defaultStyle,{textAlign: 'center', margin: '10px auto', width: '90%'}), "https://webgis-3002.ana.gov.br/"),
    // btnResultBatch
  ], 
});
// SSEBop.datasets
var weatherDataset = ui.Select({
  items: [
    // { label:"INMET- Inst. Nac. de Meteorologia", value: 'xavier' },
    // { label:"INMET- Inst. Nac. de Meteorologia (mediana histórica)", value:'historical_xavier'},
    // { label:"CFSV2: NCEP Climate Forecast System Version 2", value: 'cfsv2' },
    { label:"GLDAS-2.1: Global Land Data Assimilation System", value: 'gldas' },
    { label: "ERA5-Land", value: 'era5'}
  ],
  value: 'era5',
  style: extend(defaultStyle, { width: '50%' }),
  onChange: updateTimeSeries,
});
// SSEBop.datasets
var dTDataset = ui.Select({
  items: [
    { label:"XAVIER", value: 'xavier' },
    { label:"GLDAS", value: 'gldas' },
    { label:"CFSv2", value: 'cfsv2' },
  ],
  value:'xavier',
  style: extend(defaultStyle, { width: '50%' }),
  onChange: updateTimeSeries,
});
// SSEBop.dTTypes
var dTType = ui.Select({
  items: [
    { label:"Clear Sky", value: 'clearsky' },
    { label:"Average Conditions", value: 'average'},
  ],
  value: 'clearsky',
  style: extend(defaultStyle, { width: '50%' }),
  onChange: updateTimeSeries,
});
// SSEBop.datasets
var cFactorDataset = ui.Select({
  items: [
    { label:"XAVIER", value: 'xavier' },
    { label:"GLDAS", value: 'gldas' },
    { label:"CFSv2", value: 'cfsv2' },
  ],
  value: 'xavier',
  style: extend(defaultStyle, { width: '50%' }),
  onChange: updateTimeSeries,
});
var cFactor_STD = ui.Select({
  items: [
    {label: "0", value: 0},
    {label: "1", value: 1},
    {label: "2", value: 2}
  ],
  value: 0,
  style: extend(defaultStyle, { width: '50px' }),
  onChange: updateTimeSeries,
});
var parametersPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Parâmetros", extend(defaultStyle,{backgroundColor: "#0e753b", color: "#ffffff", fontWeight: 'bold',  position:'top-center', textAlign: 'center'}))],
      style: extend(defaultStyle, {backgroundColor: "#0e753b", position:'top-center'}),
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({widgets: [ui.Label("Dados Meteorológicos:", defaultStyle), weatherDataset], layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [ui.Label("dT:"), dTDataset], layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [ui.Label("dT Type (only Xavier):"), dTType], layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [ui.Label("C-Factor Std (Mean - X * Std):"), cFactor_STD], layout: ui.Panel.Layout.flow("horizontal")}),
  ], 
});
var imageSelect = null;
function buildImageSelect(items){
  var imageSelect = ui.Select({
    items: items, 
    placeholder: "SELECIONE A IMAGEM  LANDSAT DE INTERESSE", 
    style:extend(defaultStyle,  {
      minWidth: '100%',
      maxWidth: '100%',
      margin: '0px 0px 10px 0px',
    })
  });
  return imageSelect;
}
var searchButton = null;
function resetImage(image){
  panel.remove(footer);
  panel.remove(batchProcessingPanel);
  panel.remove(productsPanel);
  panel.add(productsPanel);
  clearAllColorBars();
  panel.add(batchProcessingPanel);
  panel.add(footer);
}
searchButton = ui.Button({
  label: "PESQUISAR IMAGENS COM CENTRO NO PONTO SELECIONADO",
  onClick: function(){
    var start = startDate.getValue();
    var end = endDate.getValue();
    var coords = currentPoint.coordinates();
    var lon = ee.Number(coords.get(0));
    var lat = ee.Number(coords.get(1));
    var lonDist = 0.22;
    var latDist = 0.22;
    areaDeExportacao = ee.Geometry.Rectangle([lon.subtract(lonDist),
                                              lat.subtract(latDist),
                                              lon.add(lonDist),
                                              lat.add(latDist)]);
    var quadroImg = ee.FeatureCollection(areaDeExportacao).style({
      width:2,
      fillColor:'00000000',
      lineType:'dotted',
    });
    apagaQuadro();
    map.centerObject(areaDeExportacao);
    map.addLayer(quadroImg, {},'Área de exportação da imagem');
    currentCollection = landsat5Collection.filterDate(start, end).filterBounds(currentPoint)
              .merge(landsat52Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat7Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat72Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat8Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat9Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat82Collection.filterDate(start, end).filterBounds(currentPoint));
    panel.remove(productsPanel);
    panel.remove(imageSelect);
    panel.remove(footer);
    panel.remove(batchProcessingPanel);
    panel.remove(locationPanel);
    var loading = ui.Label("Carregando images....") ;
    clearAllColorBars();
    panel.add(loading);
    panel.add(batchProcessingPanel);
    panel.add(footer);
    currentCollection.sort("system:time_start").evaluate(function(col){
      panel.remove(loading);
      var items = [];
      col.features.forEach(function(feature){
        var label = feature.properties.DATE_ACQUIRED + " / "
                 + feature.properties.LANDSAT_SCENE_ID + " / "
                 + "Cloud " + feature.properties.CLOUD_COVER + "% / "
                 + "Tier " + feature.properties.COLLECTION_CATEGORY;
        var value = feature.properties;
        items.push({label: label, value: value});
      });
      panel.remove(imageSelect);
      imageSelect = buildImageSelect(items);
      imageSelect.onChange(function(properties){
        resetImage();
        currentImage = ee.Image(currentCollection
          .filterMetadata("LANDSAT_SCENE_ID", "equals", properties.LANDSAT_SCENE_ID)
          .first()
        );
      });
      panel.remove(footer);
      panel.remove(batchProcessingPanel);
      panel.add(imageSelect);
      panel.add(batchProcessingPanel);
      panel.add(footer);
    });
  },
  style: extend(defaultStyle, {
    width: '100%',
    margin: '0px',
    padding: '10px 0px 10px 0px',
  })
});
var naturalColorPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Button("LANDSAT VERDADEIRA COR (VERMELHO, VERDE, AZUL)", function(){
            var trueColor = ProductsManager().getTrueColorImage();
            map.addLayer(trueColor, {min: 0, max: 0.27}, imageSelect.getValue().LANDSAT_SCENE_ID + "_VERDADEIRA_COR");
        }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
        ui.Button("DOWNLOAD", function(){
          var trueColor = ProductsManager().getTrueColorImage();
          var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
          var downloadUrl = trueColor.select("RED", "GREEN", "BLUE").toFloat().getDownloadURL({
            name: filename,
            scale: 30,
            region: areaDeExportacao,
          });
          makeDialogDownload(filename+" - VERDADEIRA COR", makeLink(downloadUrl), "md");
        }),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var falseColorPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Button("LANDSAT FALSA COR (NIR, SWIR1, RED)", function(){
            var falseColor = ProductsManager().getFalseColorImage();
            map.addLayer(falseColor, {min: 0, max: 0.50}, imageSelect.getValue().LANDSAT_SCENE_ID + "_FALSA_COR");
        }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
        ui.Button("DOWNLOAD", function(){
          var falseColor = ProductsManager().getFalseColorImage();
          var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
          var downloadUrl = falseColor.select("NIR", "SWIR1", "RED").toFloat().getDownloadURL({
            name: filename,
            scale: 30,
            region: areaDeExportacao,
          });
          makeDialogDownload(filename + " - FALSA COR", makeLink(downloadUrl), "md");
        }),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var cloudMaskPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets: [
            ui.Button("MÁSCARA DE NUVENS", function(){
                var cloudMask = ProductsManager().getCloudMaskImage();
                map.addLayer(cloudMask, {
                  min: 0, 
                  max: 1, 
                  palette: ["000000", "FFFFFF"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_MASCARA_NUVENS");
            }, false, extend(defaultStyle, {width: "100%", margin: '10px 0px 0px 0px'})), 
          ],
          style: extend(defaultStyle, {width: "75%", margin: '0px'}),
        }),
        ui.Button("DOWNLOAD", function(){
          var cloudMask = ProductsManager().getCloudMaskImage();
          var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
          var downloadUrl = cloudMask.rename("CLOUD_MASK").byte().getDownloadURL({
            name: filename,
            scale: 30,
            region: areaDeExportacao,
          });
          makeDialogDownload(filename + " - MASCARA_NUVENS", makeLink(downloadUrl), "md");
        }),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var vegetationIndexColorBarPanel = ui.Panel({widgets: [], style: extend(defaultStyle, {margin: '0px 0px 0px 0px'})});
var vegetationIndexPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets: [
            ui.Button("ÍNDICE DE VEGETAÇÃO (NDVI)", function(){
                var ndvi = ProductsManager().getNDVIImage();
                map.addLayer(ndvi, {
                  min: 0, 
                  max: 1, 
                  palette: ["ce7e45","fad163", "74a909", "3a7405", "1a3b03"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_NDVI");
                vegetationIndexColorBarPanel.clear();
                vegetationIndexColorBarPanel.add(
                  makeColorBar({min: 0, max: 1, palette: ["ce7e45","fad163", "74a909", "3a7405", "1a3b03"]})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var ndvi = ProductsManager().getNDVIImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ndvi.select("NDVI").toFloat().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - ÍNDICE DE VEGETAÇÃO (NDVI)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'}),
        }),
        vegetationIndexColorBarPanel,
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var elevationColorBarPanel = ui.Panel({widgets: [], style: extend(defaultStyle, {margin: '0px'})});
var elevationPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ELEVAÇÃO (MDE)", function(){
                var dem = ProductsManager().getDEMImage();
                map.addLayer(dem, {
                    min: 0, 
                    max: 3500, 
                    palette: ["193d30", "2e675e", "469890", "c7eae5", "bf812d", "54300b"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_NDVI");
                elevationColorBarPanel.clear();
                elevationColorBarPanel.add(
                  makeColorBar({min: 0, max: 3500, palette: ["193d30", "2e675e", "469890", "c7eae5", "bf812d", "54300b"]})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var dem = ProductsManager().getDEMImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = dem.select("DEM").int().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - ELEVAÇÃO (MDE)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'}),
        }),
        elevationColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    }), 
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var surfaceTemperatureColorBarPanel = ui.Panel({widgets: [], style: extend(defaultStyle, {margin: '0px'})});
var surfaceTemperaturePanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("TEMPERATURA DA SUPERFÍCIE (Ts)", function(){ 
                var Ts = ProductsManager().getTsImage();
                map.addLayer(Ts, {
                  min: 280, 
                  max: 330, 
                  palette: ["fefccc", "fbd976", "f08c39", "ea4a33", "e43d32", "812026"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_Ts");
                surfaceTemperatureColorBarPanel.clear();
                surfaceTemperatureColorBarPanel.add(
                  makeColorBar({min: 280, max: 330, palette: ["fefccc", "fbd976", "f08c39", "ea4a33", "e43d32", "812026"]})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var Ts = ProductsManager().getTsImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = Ts.select("Ts").toFloat().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - TEMPERATURA DA SUPERFÍCIE (Ts)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'})
        }),
        surfaceTemperatureColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
})
var EToColorBarPanel = ui.Panel({widgets: [], style: extend(defaultStyle, {margin: '0px'})})
var EToPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ET DE REFERÊNCIA DA GRAMA (ETo)", function(){
                var ETo = ProductsManager().getEToImage();
                map.addLayer(ETo, {
                  min: 8, 
                  max: 10, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETo");
                EToColorBarPanel.clear();
                EToColorBarPanel.add(
                  makeColorBar({min: 8, max: 10, palette: SSEBop.ETaPalette})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var ETo = ProductsManager().getEToImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETo.select("ETo").toFloat().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - ET DE REFERÊNCIA DA GRAMA (ETo)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'})
        }),
        EToColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
})
var ETrColorBarPanel = ui.Panel({widgets: [], style: extend(defaultStyle, {margin: '0px'})})
var ETrPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ET DE REFERÊNCIA DA ALFAFA (ETr)", function(){
                var ETr = ProductsManager().getETrImage();
                map.addLayer(ETr, {
                  min: 8, 
                  max: 10, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETr");
                ETrColorBarPanel.clear();
                ETrColorBarPanel.add(
                  makeColorBar({min: 8, max: 10, palette: SSEBop.ETaPalette})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var ETr = ProductsManager().getETrImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETr.select("ETr").toFloat().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - ET DE REFERÊNCIA DA ALFAFA (ETr)", makeLink(downloadUrl), "md");
            })
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'})
        }),
        ETrColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var temperatureDifferenceColorBarPanel = ui.Panel({widgets: [], style: extend(defaultStyle, {margin: '0px'})});
var temperatureDifferencePanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("DIFERENÇA DE TEMPERATURA (dT)", function(){
                var dT = ProductsManager().getdTImage();
                map.addLayer(dT, {
                  min: 5, 
                  max: 15, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_dT");
                temperatureDifferenceColorBarPanel.clear();
                temperatureDifferenceColorBarPanel.add(
                  makeColorBar({min: 5, max: 15, palette: SSEBop.ETaPalette})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var dT = ProductsManager().getdTImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = dT.select("dT").toFloat().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - DIFERENÇA DE TEMPERATURA (dT)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'})
        }),
        temperatureDifferenceColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var ETFractionColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var ETFractionPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("FRAÇÃO DE ET (ETf)", function(){
                var ETf = ProductsManager().getETfImage();
                map.addLayer(ee.Image(ETf), {
                  min: 0, 
                  max: 1.25, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETf");
                ETFractionColorBarPanel.clear();
                ETFractionColorBarPanel.add(
                  makeColorBar({min: 0, max: 1.25, palette: SSEBop.ETaPalette})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})),
            ui.Button("DOWNLOAD", function(){
              var ETf = ProductsManager().getETfImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETf.select("ETf").toFloat().getDownloadURL({
                name: filename,
                scale: 30,
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - FRAÇÃO DE ET (ETf)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'})
        }),
        ETFractionColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
})
var actualETColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}})
var actualETPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ET REAL (ETa)", function(){
                var ETa = ProductsManager().getETaImage()
                map.addLayer(ETa, {
                  min: 0, 
                  max: 10, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETa");
                actualETColorBarPanel.clear();
                actualETColorBarPanel.add(
                  makeColorBar({min: 0, max: 10, palette: SSEBop.ETaPalette})
                );
            }, false, extend(defaultStyle, {width: "75%", margin: '10px 0px 0px 0px'})), 
            ui.Button("DOWNLOAD", function(){
              var ETa = ProductsManager().getETaImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETa.select("ETa").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
                region: areaDeExportacao,
              });
              makeDialogDownload(filename + " - ET REAL (ETa)", makeLink(downloadUrl), "md");
            })
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: extend(defaultStyle, {width: "100%", margin: '0px'})
        }),
        actualETColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle, {position:'top-center', margin: "0px", width: "100%"}),
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var productsPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[ui.Label("Produtos", extend(defaultStyle, {backgroundColor: "#0e753b", color: "#ffffff", margin: "0px", textAlign: 'left'}))], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: extend(defaultStyle, {backgroundColor: "#0e753b", position:'top-center', padding: "10px"}),
    }),
    naturalColorPanel,
    falseColorPanel,
    cloudMaskPanel,
    vegetationIndexPanel,
    elevationPanel,
    surfaceTemperaturePanel,
    EToPanel,
    ETrPanel,
    temperatureDifferencePanel,
    ETFractionPanel,
    actualETPanel,
  ],
  style: extend(defaultStyle, {
    width: "100%",
    padding: '0px',
    margin: '0px',
  })
})
var footer = ui.Panel({
  widgets: [
    ui.Label("Realização:"),
    ui.Panel({
      widgets: [
        ui.Panel({
          widgets: [
            ui.Thumbnail({
              image: ee.Image(logoANA),
              params: {
                  format: 'png',
                  dimensions: 800,
                  min: 0,
                  max: 255,
              },
              style: extend(defaultStyle, {width: '100%',  margin: "0 auto"})
            }),
            // Icon(logoANA, {width: "50%", margin: "0 auto"}),
            ui.Label("www.ana.gov.br", { margin: "0 auto"}, "http://www.snirh.gov.br")
          ],
          layout: ui.Panel.Layout.flow("vertical"),
          style: {width: "50%", height: "100%", margin: '0 auto'}
        })
      ],
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Label("Parceiros:"),
     ui.Panel({
      widgets: [
        ui.Panel({
          widgets: [
            Icon(logoINPE, {width: "70%", margin: "0 auto"}),
            ui.Label("https://www.gov.br/inpe", { margin: "0 auto", textAlign: "center"}, "https://www.gov.br/inpe/pt-br")
          ],
          layout: ui.Panel.Layout.flow("vertical"),
          style: {width: "50%", height: "100%", margin: '0 auto'}
        })
      ],
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({
      widgets: [
        Icon(logoUSGS, {width: "50%", height: "80%", margin: "0 auto"}),
        Icon(logoAgrosatelite, {width: "40%", height: "100%", margin: "0 auto"}),
      ],
      style: {width: "100%"},
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({
      widgets: [
        ui.Label("www.usgs.gov", {width: "40%",  margin: "0 auto", textAlign: "center"}, "https://earlywarning.usgs.gov/ssebop"),
        ui.Label("www.agrosatelite.com.br", {width: "45%",  margin: "0 auto", textAlign: "center"}, "https://agrosatelite.com.br")
      ],
      style: {width: "100%"},
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({
      widgets: [
        ui.Panel({
          widgets: [
            Icon(logo_iph, {width: "70%", margin: "0 auto"}),
            ui.Label("www.ufrgs.br/iph", { margin: "0 auto", textAlign: "center"}, "www.ufrgs.br/iph")
          ],
          layout: ui.Panel.Layout.flow("vertical"),
          style: {width: "50%", height: "100%", margin: '0 auto'}
        })
      ],
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
  ],
  style: {
    position: 'bottom-center',
    padding: '0px',
    margin: '0px',
  }
});
var panel = ui.Panel({
  widgets: [
    headerPanel,
    buttonsPanel,
    datePanel,
    parametersPanel,
    locationPanel,
    searchButton,
    batchProcessingPanel,
    footer
  ],
  layout: ui.Panel.Layout.flow("vertical"),
  style: extend(defaultStyle, {
    width: '400px',
    height: '100%',
    maxHeight: 'calc(100vh - 70px)',
    border: '0.5px solid #000000',
    backgroundColor: "#FFFFFF",
    padding: '10px',
  })
})
var panelTimeSeries = ui.Panel({
  layout: ui.Panel.Layout.flow("vertical"),
  style: extend(defaultStyle, {
    position: 'bottom-right',
    width: '100%',
    height: '42%',
    border: '0.2px solid #000000',
    backgroundColor: "#FFFFFF",
    padding: '2px',
  })
})
var chartTimeSeries = ui.Label("Clique em qualquer ponto do mapa para ver as séries temporais da evapotranspiração.", extend(defaultStyle, {
  width: '100%',
  textAlign: 'center',
  fontSize: '20px',
}));
var chartPrecipitation = null
var btnETa = ui.Button({
  label: "ETa",
  style:extend(defaultStyle, {fontSize: '20px', width: "50%", margin: '0 auto', textAlign: 'center'})
});
var btnChirps = ui.Button({
  label: "ETa x Precipitação",
  style:extend(defaultStyle, {fontSize: '20px', width: "50%", margin: '0 auto', textAlign: 'center'})
});
var tabPanel = ui.Panel({
  widgets: [
    btnETa,
    btnChirps,
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
  style: extend(defaultStyle, {position: 'top-center', width: "100%", margin: '0 auto', shown: false})
})
panelTimeSeries.add(tabPanel)
panelTimeSeries.add(chartTimeSeries)
var backgroundLogos = "#ffffff00"
map.add(
  ui.Panel({
      widgets:[
        ui.Button("Delete all layers", function(){
          map.layers().reset()
        }, false,  extend(defaultStyle,{width: "100%", margin: '0px', padding: '0px'})),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: extend(defaultStyle, {position:'top-right', margin: "0px", padding: '0px'}),
  })
)
var panelMain = ui.Panel({
  widgets: [ui.SplitPanel(map, panelTimeSeries, "vertical")],
  layout: ui.Panel.Layout.flow("vertical"),
  style: extend(defaultStyle, {
    width: 'calc(100% - 400px)',
    height: '100%',
  })
})
ui.root.clear()
ui.root.insert(0, panel);
ui.root.insert(1, panelMain);
var ProductsManager = function(){
  return new function(){
    this.getTrueColorImage = function(){
      var imageNormalized = buildImage(currentImage)
      return imageNormalized.select("RED", "GREEN", "BLUE")
    }
    this.getFalseColorImage = function(){
      var imageNormalized = buildImage(currentImage)
      return imageNormalized.select("NIR", "SWIR1", "RED")
    }
    this.getNDVIImage = function(){
      var imageNormalized = buildImage(currentImage)
      var NDVI = imageNormalized.normalizedDifference(["NIR", "RED"]).rename("NDVI")
      return NDVI
    }
    this.getCloudMaskImage = function(){
      var cloudMask = cloudUtils.cloudMask(currentImage);
      return cloudMask;
    }
    this.getDEMImage = function(){
      var dem = ee.Image("USGS/SRTMGL1_003")
        .rename("DEM")
        .clip(currentImage.geometry())
        .set("system:footprint", currentImage.geometry());
      return dem
    }
    this.getTsImage = function(){
      var Ts = SSEBop.Ts(currentImage)
      return Ts
    }
    this.getEToImage = function(){
      var time_start = currentImage.get('system:time_start');
      var meteo_data = meteo.meteo(time_start,weatherDataset.getValue());
      var ETo = ee.Image(SSEBop.ETo(time_start, meteo_data, currentImage.geometry()));
        // var ETo = ee.Image(SSEBop.ETo(SSEBop.datasets[weatherDataset.getValue()], currentImage.date(), currentImage.geometry()))
      return ETo
    }
    this.getETrImage = function(){
      var time_start = currentImage.get('system:time_start');
      var meteo_data = meteo.meteo(time_start,weatherDataset.getValue());
      var ETr = ee.Image(SSEBop.ETr(time_start, meteo_data, weatherDataset.getValue()));
        // var ETr = ee.Image(SSEBop.ETr(SSEBop.datasets[weatherDataset.getValue()],currentImage.date(), currentImage.geometry()))
      return ETr
    }
    this.getdTImage = function(){
      var time_start = currentImage.get('system:time_start');
      var meteo_data = meteo.meteo(time_start,weatherDataset.getValue());
      var dT = SSEBop.dT(time_start, meteo_data);
      // var dT = SSEBop.dT(SSEBop.datasets[dTDataset.getValue()], SSEBop.dTTypes[dTType.getValue()], currentImage.date(), currentImage.geometry());
      return dT
    }
    this.getETfImage = function(){
      var time_start = currentImage.get('system:time_start');
      var meteo_data = meteo.meteo(time_start,weatherDataset.getValue());
      var ETf = SSEBop.ETf(currentImage, time_start, meteo_data, parseInt(cFactor_STD.getValue()));
      // var ETf = SSEBop.ETf({
      //     "weather_dataset":SSEBop.datasets[weatherDataset.getValue()],
      //     "dT_dataset": SSEBop.datasets[dTDataset.getValue()],
      //     "dT_type": SSEBop.dTTypes[dTType.getValue()],
      //   },
      //   currentImage, 
      //   parseInt(cFactor_STD.getValue())
      // );
      return ETf;
    };
    this.getETaImage = function(){
      var time_start = currentImage.get('system:time_start');
      var meteo_data = meteo.meteo(time_start,weatherDataset.getValue());
      var dt_data = SSEBop.datasets.gldas; 
      var dt_type = SSEBop.dTTypes.clearsky;
      var ETa = SSEBop.ETa(currentImage, time_start, meteo_data, dt_data, dt_type,  parseInt(cFactor_STD.getValue()));
      return ee.Image(ETa).select('ETa');
      // var ETa = SSEBop.ETa({
      //     "weather_dataset": SSEBop.datasets[weatherDataset.getValue()],
      //     "dT_dataset": SSEBop.datasets[dTDataset.getValue()],
      //     "dT_type": SSEBop.dTTypes[dTType.getValue()],
      //   },
      //   currentImage, 
      //   parseInt(cFactor_STD.getValue())
      // );
      // return ETa;
    };
  }
};
function getUrlLinkCSV(featCollectionFinal){
  // var propFeatCollectionNames = featCollectionFinal.first().propertyNames().getInfo();
  var propertyNames = ee.List(featCollectionFinal.first().propertyNames()).getInfo();
  // print(propertyNames)
  // var jsArray = Array.from(propertyNames);
  // print(jsArray)
  // var propFeatCollectionNames = ['system:index','id','date','hasImage','ETr','ETa','ETf','NDVI','geom'];
  // var propFeatCollectionNames = jsArray
  // var geomIndex = propertyNames.indexOf('geom');
  // if (geomIndex !== -1) {
  //   propertyNames.splice(geomIndex, 1); // remove geom from its current position
  //   propertyNames.push('geom'); // add geom at the end of the list
  // }
  // var idIndex = propertyNames.indexOf('id');
  // propertyNames.splice(idIndex, 1);
  // propertyNames.splice(1, 0, 'id');
  // var hasImageIndex = propertyNames.indexOf('hasImage');
  // propertyNames.splice(hasImageIndex, 1);
  // propertyNames.splice(3, 0, 'hasImage');
  print(propertyNames);
  var urlLink = featCollectionFinal.getDownloadURL({
      format: 'CSV',
      filename: 'batch_processing_result',
      selectors: propertyNames});
  return urlLink
}
function buildETValues(currentPoint){
  var start = startDate.getValue();
  var end = endDate.getValue();
  var roi = currentPoint.geometry();
  var meteo_source = weatherDataset.getValue();
    var currentCollection = landsat5Collection.filterDate(start, end).filterBounds(roi)
    .merge(landsat7Collection.filterDate(start, end).filterBounds(roi))
    .merge(landsat8Collection.filterDate(start, end).filterBounds(roi))
    .filterMetadata("CLOUD_COVER", "less_than", 75)
    var collectionImgSize = currentCollection.size()
    var condit = ee.Algorithms.If(
          ee.Number(collectionImgSize).gt(1),
          "Foram encontradas imagens",
          "NÃO foram encontradas imagens"
    )
    // print(condit)
    // if(collectionImgSize > 1){
      var currentCollectionETa = currentCollection
        .map(function(image){
          // Data da imagem em Epoch time
          var time_start = image.get('system:time_start');
          var meteo_data =  meteo.meteo(time_start,meteo_source);
          // image = ee.Image(image);
          var clippedImage = image
            .clip(roi)
            .set("system:footprint", roi);
          var ndvi = SSEBop.NDVI(clippedImage)
          // Evapotranspiracao de Referencia (ETo)
          var ETo = SSEBop.ETo(time_start, meteo_data, roi);
          // Evapotranspiracao de Referencia da grama (ETr)
          var ETr = SSEBop.ETr(time_start, meteo_data, meteo_source);
          var dt_data = SSEBop.datasets.gldas; 
          var dt_type = SSEBop.dTTypes.clearsky;
          // Evapotranspiracao Atual (ETa)
          var ETa_etf = SSEBop.ETa(image,time_start, meteo_data, dt_data, dt_type, parseFloat(cFactor_STD.getValue()));
          var ETa = ee.Image(ETa_etf).select('ETa');
          var ETf = ee.Image(ETa_etf).select('et_fraction');
          var layerStack = ETo
            .addBands(ETr)
            .addBands(ETa)
            .addBands(ETf)
            .addBands(ndvi)
            .set("system:footprint", roi)
          return ee.Image(layerStack.copyProperties(image, ['system:index', 'system:time_start', 'system:time_end']))
        })
      var series = getSeries(currentCollectionETa, roi)
        var EToValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-5));
        });
        var ETrValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-4));
        });
        var ETaValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-3));
        });
        var ETfValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-2));
        });
        var NDVIValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-1))
        });
        var xValues = series.map(function(item){
          return julianUtils.millis2JulianDay(ee.Number(ee.List(item).get(-6)));
        });
        var interpolatedETo = dailySSEBop.buildArray(EToValues, xValues, start, end)
        var interpolatedETr = dailySSEBop.buildArray(ETrValues, xValues, start, end)
        var interpolatedETa = dailySSEBop.buildArray(ETaValues, xValues, start, end)
        var interpolatedETf = dailySSEBop.buildArray(ETfValues, xValues, start, end)
        var interpolatedNDVI = dailySSEBop.buildArray(NDVIValues, xValues, start, end)
        var datesIDW = ee.List(interpolatedETa.get("dates"));
        var xValuesIDW = datesIDW.map(function(value){
          return ee.Date(julianUtils.julianDay2Millis(ee.Number(value))).format("yyyy-MM-dd")
        });
        var observationsValues = datesIDW.map(function(value){
          return xValues.indexOf(value).gte(0).subtract(1);
        });
        //Área do polígono em hectares                      
        // var area_perim_ha = currentPoint.area().divide(10000);
        var precipitacao_dataset = chirps.select('precipitation').filterDate(start, end).filterBounds(roi);
        var series_precipitation = getSeries(precipitacao_dataset, roi)
        var precipitationValues = series_precipitation.map(function(item){
          return ee.Number(ee.List(item).get(-1));
        });
        var xValues_precipitation = series_precipitation.map(function(item){
          return julianUtils.millis2JulianDay(ee.Number(ee.List(item).get(-2)));
        });
        var interpolatedPrecipitation = dailySSEBop.buildArray(precipitationValues, xValues_precipitation, start, end)
       var dictET =  ee.Dictionary({
          interpolatedETo: interpolatedETo,
          interpolatedETr: interpolatedETr,
          interpolatedETa: interpolatedETa,
          geom_area_ha: 1.0,
          interpolatedETf: interpolatedETf,
          interpolatedNDVI: interpolatedNDVI,
          interpolatedPrecipitation: interpolatedPrecipitation,
          xValuesIDW: xValuesIDW,
          observationsValues: observationsValues
        })
        return dictET;
      // }
      // else{
      //   makeDialog("Série Não Encontrada", "Não há imagens disponíveis suficientes para geração de uma série temporal no período selecionado", "sm");
      // }
    // }
    // else{
    //   makeDialog("Imagem Não Encontrada", "Não há imagens disponíveis no período selecionado", "sm");
    // }
      // });
}
function updateTimeSeries(){
  var start = startDate.getValue();
  var end = endDate.getValue();
  var roi = currentPoint;
  var meteo_source = weatherDataset.getValue();
  var _startDate = new Date(start);
  var _endDate = new Date(end);
  var periodDays = ((_endDate - _startDate) / (1000*60*60*24));
  if(periodDays <= 426){
    // currentPoint = ee.Geometry.Point([-48.46, -14.91]);
     //currentPoint.evaluate(function(geometry){
    var currentCollection = landsat5Collection.filterDate(start, end).filterBounds(currentPoint)
    .merge(landsat7Collection.filterDate(start, end).filterBounds(currentPoint))
    //.merge(landsat7Collection.filterDate(start, end).filterDate("2012-01-01", "2013-04-01").filterBounds(currentPoint))
    .merge(landsat8Collection.filterDate(start, end).filterBounds(currentPoint))
    .merge(landsat9Collection.filterDate(start, end).filterBounds(currentPoint))
    .filterMetadata("CLOUD_COVER", "less_than", 75)
    var collectionImgSize =   currentCollection.size().getInfo()
      var currentCollectionETa = currentCollection
        .map(function(image){
          // Data da imagem em Epoch time
          var time_start = image.get('system:time_start');
          var meteo_data =  meteo.meteo(time_start,meteo_source);
          // image = ee.Image(image);
          var clippedImage = image
            .clip(roi)
            .set("system:footprint", roi);
          var ndvi = SSEBop.NDVI(clippedImage)
          // var weather_dataset = SSEBop.datasets[weatherDataset.getValue()]
          // var dT_dataset = SSEBop.datasets[dTDataset.getValue()]
          // var dT_type = SSEBop.dTTypes[dTType.getValue()]
          // var ETo = SSEBop.ETo(
          //   weather_dataset,
          //   image.date(),
          //   roi
          // )
          // var ETr = SSEBop.ETr(
          //   weather_dataset,
          //   image.date(),
          //   roi
          // )
          // var ETa = SSEBop.ETa({
          //     "weather_dataset": weather_dataset,
          //     "dT_dataset": dT_dataset,
          //     "dT_type": dT_type,
          //   },
          //   clippedImage, 
          //   parseFloat(cFactor_STD.getValue())
          // )
          // var ETf = SSEBop.ETf({
          //     "weather_dataset": weather_dataset,
          //     "dT_dataset": dT_dataset,
          //     "dT_type": dT_type,
          //   },
          //   clippedImage, 
          //   parseFloat(cFactor_STD.getValue())
          // )
          // Evapotranspiracao de Referencia (ETo)
          var ETo = SSEBop.ETo(time_start, meteo_data, roi);
          // Evapotranspiracao de Referencia da grama (ETr)
          var ETr = SSEBop.ETr(time_start, meteo_data, meteo_source);
          var dt_data = SSEBop.datasets.gldas; 
          var dt_type = SSEBop.dTTypes.clearsky;
          // Evapotranspiracao Atual (ETa)
          var ETa_etf = SSEBop.ETa(image,time_start, meteo_data, dt_data, dt_type, parseFloat(cFactor_STD.getValue()));
          var ETa = ee.Image(ETa_etf).select('ETa');
          var ETf = ee.Image(ETa_etf).select('et_fraction');
          var layerStack = ETo
            .addBands(ETr)
            .addBands(ETa)
            .addBands(ETf)
            .addBands(ndvi)
            .set("system:footprint", roi)
          return ee.Image(layerStack.copyProperties(image, ['system:index', 'system:time_start', 'system:time_end']))
        })
      var series = getSeries(currentCollectionETa, roi)
        var start_date = ee.Date(start);
        var end_date = ee.Date(end);
        // Create list of dates for time series
        var n_days = end_date.difference(start_date,'day').round();
        var dates = ee.List.sequence(0,1,n_days);
        var make_datelist = function(n) {
          return start_date.advance(n,'day');
        };
        dates = ee.List.sequence(0,n_days).map(make_datelist);
        var etr_col = dates.map(function(date){
          var meteo_source = weatherDataset.getValue();
          var time_start = ee.Date(date).millis();
          var meteo_data =  meteo.meteo(time_start,meteo_source);
          var ETr = SSEBop.ETr(time_start, meteo_data, meteo_source);
          return ETr.set('system:time_start',time_start)
        });
        var xValues = series.map(function(item){
          return julianUtils.millis2JulianDay(ee.Number(ee.List(item).get(-6)));
        });
        var EToValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-5));
        });
        var ETrValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-4));
        });
        var ETaValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-3));
        });
        var ETfValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-2));
        });
        var NDVIValues = series.map(function(item){
          return ee.Number(ee.List(item).get(-1))
        });
        var interpolatedETo = dailySSEBop.buildArray(EToValues, xValues, start, end)
        var interpolatedETr = dailySSEBop.buildArray(ETrValues, xValues, start, end)
        var interpolatedETa = dailySSEBop.buildArray(ETaValues, xValues, start, end)
        var interpolatedETf = dailySSEBop.buildArray(ETfValues, xValues, start, end)
        var interpolatedNDVI = dailySSEBop.buildArray(NDVIValues, xValues, start, end)
        var datesIDW = ee.List(interpolatedETa.get("dates"));
        var xValuesIDW = datesIDW.map(function(value){
          return ee.Date(julianUtils.julianDay2Millis(ee.Number(value))).format("yyyy-MM-dd")
        });
        var observationsValues = datesIDW.map(function(value){
          return xValues.indexOf(value).gte(0).subtract(1);
        });
        var yValuesIDW = ee.Array.cat([
          // interpolatedETo.get("array"), 
          interpolatedETf.get("array"),
          interpolatedETr.get("array"),
          interpolatedETa.get("array"),
          interpolatedNDVI.get("array"), 
          observationsValues,
        ], 1);
        panelTimeSeries.remove(chartTimeSeries);
        if(chartPrecipitation){
          panelTimeSeries.remove(chartPrecipitation);
        }
        if(currentPoint === null || currentPoint == undefined){
          return;
        }
        var coordinates = null
        coordinates = currentPoint.toGeoJSON()["coordinates"].map(function(x){
          return Math.round(x * 100000) / 100000
        })
        var title = "Estimativa Real de Evapotranspiração (ETa)\n Periodo:" + String(start) + "/" + String(end) + " Coordenadas:" + String(coordinates);
        chartTimeSeries = ui.Chart.array.values(yValuesIDW, 0, xValuesIDW)
        .setChartType('LineChart')
        // .setSeriesNames(['ETo', 'ETr', 'ETa', 'NDVI'])
        .setSeriesNames(['ETf', 'ETr', 'ETa', 'NDVI', 'Imagem LANDSAT'])
        .setOptions({
            title: title,
            titleTextStyle: {
               'fontSize': '14'
            },
            // colors: ['#a9e9fc', '#e5f497', '#0000FF', '#00FF00'],
            colors: ['#fcba03', '#a9e9fc', '#0000FF', '#00FF00', 'FF0000'],
            series: {
              // 0: {targetAxisIndex:0, axis: 'ETo',  lineWidth: 0, pointSize: 1 },
              // 1: {targetAxisIndex:0, axis: 'ETr',  lineWidth: 0, pointSize: 1 },
              // 2: {targetAxisIndex:0, axis: 'ETa',  lineWidth: 3, pointSize: 0 },
              // 3: {targetAxisIndex:1, axis: 'NDVI', lineWidth: 3, pointSize: 0 },
              0: {targetAxisIndex:1, axis: 'ETf',  lineWidth: 3, pointSize: 0 },
              1: {targetAxisIndex:0, axis: 'ETr',  lineWidth: 3, pointSize: 0 },
              2: {targetAxisIndex:0, axis: 'ETa',  lineWidth: 3, pointSize: 0 },
              3: {targetAxisIndex:1, axis: 'NDVI', lineWidth: 3, pointSize: 0 },
              4: {targetAxisIndex:1, axis: 'Imagem LANDSAT', lineWidth: 0, pointSize: 4 },
            },
            vAxes: {
              0: {
                title: "Evapotranspiração (mm)",
                viewWindowMode:'explicit',
                viewWindow: {min:0, max:10},
                gridlines: {count: 1}
              },
              1: {
                title: "NDVI",
                viewWindowMode:'explicit',
                viewWindow: {min:0, max:1.2},
              }
            },
            hAxis: {
              gridlines: {count: 0},
              baselineColor: 'FFFFFF',
              logScale: false
            },
        });
        chartTimeSeries.style().set(extend(defaultStyle, {
          position: 'bottom-center',
          width: '75vw',
          height: '380px',
        }));
        panelTimeSeries.add(chartTimeSeries)
        var precipitacao_dataset = chirps.select('precipitation').filterDate(start, end).filterBounds(currentPoint);
        var series_precipitation = getSeries(precipitacao_dataset, roi)
        var PrecipitationValues = series_precipitation.map(function(item){
          return ee.Number(ee.List(item).get(-1));
        });
        var xValues_precipitation = series_precipitation.map(function(item){
          return julianUtils.millis2JulianDay(ee.Number(ee.List(item).get(-2)));
        });
        var interpolatedPrecipitation = dailySSEBop.buildArray(PrecipitationValues, xValues_precipitation, start, end)
        var yValuesIDWMod = ee.Array.cat([
          interpolatedETa.get("array"),
          interpolatedPrecipitation.get("array"),
          observationsValues
        ], 1);
        var datesIDW_precipitation = ee.List(interpolatedPrecipitation.get("dates"));
        var xValuesIDW_precipitation = datesIDW_precipitation.map(function(value){
          return ee.Date(julianUtils.julianDay2Millis(ee.Number(value))).format("yyyy-MM-dd")
        });
        var titlePrecipitation = "Estimativa Real de Evapotranspiração (ETa) X Precipitação (CHIRPS)\nPeríodo:" + String(start) + " / " + String(end) + "\nCoordenadas:" + String(coordinates);
        chartPrecipitation = ui.Chart.array.values(yValuesIDWMod, 0, xValuesIDW_precipitation)
          .setSeriesNames(['ETa', 'CHIRPS', 'Imagem LANDSAT'])
          .setOptions({
            title: titlePrecipitation,
            titleTextStyle: {
               'fontSize': '14'
            },
            /*series: {
              0: {type: 'bars' , color: '1439cc'},
              1: {type: 'line', color: 'a1121b', lineWidth: 1, pointSize: 0},
            },*/
             series: {
              0: {targetAxisIndex:0, axis: 'ETa', type: 'line' , color: 'blue', lineWidth: 2, pointSize: 0, },
              1: {targetAxisIndex:1, axis: 'CHIRPS', type: 'bars', color: 'a9e9fc', lineWidth: 5, backgroundColor: 'EBEBEB'},
              2: {targetAxisIndex:0, axis: 'Imagem Landsat', type: 'line', color: 'red', lineWidth: 0, pointSize: 4 }
             },
            //chartArea: {backgroundColor: 'EBEBEB'},
            interpolateNulls: true,
            vAxes: {
              0: {
                title: "Evapotranspiração (mm)",
                viewWindowMode:'explicit',
                viewWindow: {min:0, max:10},
                gridlines: {count: 1}
              },
              1: {
                title: "Precipitação (mm)",
                viewWindowMode:'explicit',
                viewWindow: {min:0, max:90}
              }
            },
            hAxis: {
              gridlines: {count: 0},
              baselineColor: 'FFFFFF',
              logScale: false
            },
        })
        chartPrecipitation.style().set(extend(defaultStyle, {
          position: 'bottom-center',
          width: '75vw',
          height: '380px',
          shown: false
        }));
        // panelTimeSeries.add(chartPrecipitation)
        tabPanel.style().set({shown: true});
        btnETa.onClick(function(){
          if(chartPrecipitation){
            chartPrecipitation.style().set({shown: false});
            chartTimeSeries.style().set({shown: true});
          }
        });
        panelTimeSeries.add(chartPrecipitation)
        btnChirps.onClick(function(){
          if(chartTimeSeries){
            chartTimeSeries.style().set({shown: false});
            chartPrecipitation.style().set({shown: true});
          }
        });
         // When the chart is clicked, update the map and label.
        chartTimeSeries.onClick(function(xValue, yValue, seriesName) {
          if (!xValue || seriesName !== 'Landsat Image'){
            return;
          }
          var date = ee.Date(xValue).getRange("day");
          var image = ee.Image(currentCollection
            .filter(ee.Filter.date(date.start(), date.end()))
            .first()
          );
          image.evaluate(function(feature){
            var label = feature.properties.DATE_ACQUIRED + " / "
             + feature.properties.LANDSAT_SCENE_ID + " / "
             + "Cloud " + feature.properties.CLOUD_COVER + "% / "
             + "Tier " + feature.properties.COLLECTION_CATEGORY;
            panel.remove(imageSelect);
            imageSelect = buildImageSelect([{label: label, value: feature.properties}]);
            imageSelect.setValue(feature.properties);
            currentImage = image;
            panel.add(imageSelect);
            resetImage();
          })
        });
        map.addLayer(currentPoint,  {color: 'FF0000'}, String(coordinates))
  } else {
    makeDialog("Período de interesse", "O período de interesse deve ser menor ou igual a 426 dias", "sm");
  }
} 
map.onClick(function(latlong){
  //apagaQuadro();
  apagaFeature();
  lat_text.setValue(latlong.lat)
  lon_text.setValue(latlong.lon)
  currentPoint = ee.Geometry.Point([latlong.lon, latlong.lat]);
  // currentPoint = ee.Geometry.Point([-48.46, -14.91]);
  updateTimeSeries();
})
map.style().set('cursor', 'crosshair');
map.setOptions('satellite', {});
// ************************ UTILS *********************************
function makeLink(link){
  return ui.Panel({
    widgets: [
      ui.Label("Click", {fontSize: '25px'}),
      ui.Label("here", {fontSize: '25px'}, link),
      ui.Label("to download this product.", {fontSize: '25px'}),
    ], 
    layout: ui.Panel.Layout.flow("horizontal"),
    style: extend(defaultStyle, { margin: "20px 0px 30px 0px" })
  });
}
function getSeries(collection, roi){
  var series = collection
    .sort("system:time_start")
    .getRegion({
      geometry: roi, 
      scale: 30,
    })
  var seriesValues = series
    .slice(1)
    .map(function(list){
        return ee.Algorithms.If(
          ee.Algorithms.IsEqual(ee.List(list).get(-2), null),
          0,
          ee.List(list)
        )
    })
  seriesValues = ee.List(seriesValues).removeAll([0]);
  return seriesValues
}
function makeColorBar(vis){
  var bar =  ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: vis.palette,
    },
    style: extend(defaultStyle, {stretch: 'horizontal', maxHeight: '24px', margin: '0px'}),
  })
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 0px'}),
      ui.Label(vis.min + ((vis.max-vis.min) / 2), extend(defaultStyle, {margin: '4px 0px', textAlign: 'center', stretch: 'horizontal'})),
      ui.Label(vis.max, extend(defaultStyle, {margin: '4px 0px'}))
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var colorBar = ui.Panel([bar, legendLabels]);
  return colorBar;
}
function clearAllColorBars(){
  vegetationIndexColorBarPanel.clear();
  elevationColorBarPanel.clear();
  surfaceTemperatureColorBarPanel.clear();
  EToColorBarPanel.clear();
  ETrColorBarPanel.clear();
  temperatureDifferenceColorBarPanel.clear();
  ETFractionColorBarPanel.clear();
  actualETColorBarPanel.clear();
}
function extend(src, obj) {
    Object.keys(src).forEach(function(key) { 
      obj[key] = src[key]; 
    });
    return obj;
}
function apagaQuadro() {
  var element = null;
  var layers = map.layers();
  layers.forEach(function(lyr) {
    if (lyr.get('name') === 'Área de exportação da imagem'){
      element = lyr;
    }
  });
    layers.remove(element);
}
function apagaFeature() {
  var element = null;
  var layers = map.layers();
  layers.forEach(function(lyr) {
    if (lyr.getEeObject() instanceof ee.Feature) {
       element = lyr;
    }
  });
  layers.remove(element);
}