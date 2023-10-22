var toh = ui.import && ui.import("toh", "image", {
      "id": "users/ieco/slf_maxent/establishment/toh_MAXENT"
    }) || ee.Image("users/ieco/slf_maxent/establishment/toh_MAXENT"),
    slf = ui.import && ui.import("slf", "image", {
      "id": "users/ieco/slf_maxent/establishment/slf_MAXENT"
    }) || ee.Image("users/ieco/slf_maxent/establishment/slf_MAXENT"),
    slftoh = ui.import && ui.import("slftoh", "image", {
      "id": "users/ieco/slf_maxent/establishment/slftoh_MAXENT"
    }) || ee.Image("users/ieco/slf_maxent/establishment/slftoh_MAXENT"),
    vino = ui.import && ui.import("vino", "table", {
      "id": "users/ieco/slf_maxent/impact/IVAs_global_WineList_06Aug2020"
    }) || ee.FeatureCollection("users/ieco/slf_maxent/impact/IVAs_global_WineList_06Aug2020"),
    NASS = ui.import && ui.import("NASS", "imageCollection", {
      "id": "USDA/NASS/CDL"
    }) || ee.ImageCollection("USDA/NASS/CDL"),
    EUland = ui.import && ui.import("EUland", "imageCollection", {
      "id": "COPERNICUS/CORINE/V20/100m"
    }) || ee.ImageCollection("COPERNICUS/CORINE/V20/100m"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "min": 5.864472962835031,
        "max": 7.478691314659698,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["constant"],"min":5.864472962835031,"max":7.478691314659698,"gamma":1},
    prodrisk_old = ui.import && ui.import("prodrisk_old", "image", {
      "id": "users/ieco/slf_maxent/impact/impact_risk_01Oct2020"
    }) || ee.Image("users/ieco/slf_maxent/impact/impact_risk_01Oct2020"),
    trapot_old = ui.import && ui.import("trapot_old", "image", {
      "id": "users/ieco/slf_maxent/transport/transport_01Oct2020_4"
    }) || ee.Image("users/ieco/slf_maxent/transport/transport_01Oct2020_4"),
    estab = ui.import && ui.import("estab", "image", {
      "id": "users/ieco/slf_maxent/establishment/slftohEnsembleMean_28Oct20"
    }) || ee.Image("users/ieco/slf_maxent/establishment/slftohEnsembleMean_28Oct20"),
    trustage = ui.import && ui.import("trustage", "image", {
      "id": "users/ieco/slf_maxent/age/trusted_age_estimates_asof2022"
    }) || ee.Image("users/ieco/slf_maxent/age/trusted_age_estimates_asof2022");
/* IF YOU WANT ALL THREE
var popage = ee.Image("users/ieco/slf_maxent/___________________"), // Raw age raster - will not be masked
    trust = ee.Image("users/ieco/slf_maxent/___________________"), // Raw trust raster - will not be masked
    trustage = ee.Image("users/ieco/slf_maxent/___________________"); // Trusted age raster
*/
//Make sure to path to the correct asset. This is just the trust-cropped population age (trusted_age_estimates_asof2022.tif)
//var trustage = ee.Image("users/jmg5214/agetest");
// In all caps put what color you want. Options right now are BLUE, RED, and PURPLE
var agecol = 'BLUE';
/*
Title: Spotted Lanternfly Risk Map
Author: Matthew R. Helmus mrhelmus@temple.edu
Description: Spatial mapping of spotted lanternfly invasion potentials. 
Citation: Huron, Behm, Helmus submitted
Table of Contents
Define variables - where (most) of the parameters are defined
deadfishbowl - where code to add functionality goes to die.
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Define variables */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ><><>< 
var MapParam = {lon:-97.69, lat:39.66, zoom:5}, // lat: 39.8333333,lon: -98.585522, Erie center -79.516, 42.354, US -97.69, 39.66
    toolParam = { // show or hide what elements   Philly lon:-75.209, lat:40.065  France: 5.606, 43.6, Pujaut France lon:4.775994, lat:44.003861 PA center -75.209, 40.065
       all: 0, // show all                        middle atlantic lon:-36.61, lat:17.31,closest vineyard: -75.66735, 40.37386 us center lon:-100.57, lat:38.67 lower center lon:-103.02, lat:30.31
       layerList: 1, // show list of layers       
       zoomControl: 1, 
       scaleControl: 1, // writes out scale in the legend
       mapTypeControl: 1, 
       fullscreenControl: 1, 
       drawingToolsControl: 1
    },
    optionParamHYBRID = {
      mapTypeId: "HYBRID",//{"TERRAIN", "SATELLITE", "HYBRID" , "ROADMAP"}, /* opt_styles? */ /* https://developers.google.com/earth-engine/tutorials/community/customizing-base-map-styles */ 
      styles: null, 
      types: null
    },
    optionParamTERRAIN = {
      mapTypeId: "TERRAIN",//{"TERRAIN", "SATELLITE", "HYBRID" , "ROADMAP"}, /* opt_styles? */ /* https://developers.google.com/earth-engine/tutorials/community/customizing-base-map-styles */ 
      styles: null, 
      types: null
    },
    optionParam = {
      WRD: optionParamTERRAIN,
      PHL: optionParamHYBRID,
      ITA: optionParamHYBRID,//
      FRA: optionParamHYBRID, //
      ESP: optionParamHYBRID,//
      CAL: optionParamHYBRID,
      ERA: optionParamTERRAIN
    };
var agepalettes = {BLUE: ['#faffff','#72f2f2','#72bdf2','#72a7f2','#7287f2','#4c57f5','#2835f7','#0410bf', '#010980'],
                   RED: ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
                   PURPLE: ['#f9f7fa','#d5b4fa', '#a152fa', '#851efa', '#5f04ba', '#47018c']
                  };
var dict = {iw: 0, // Choose layers to show, wine regions
            iu: 0, // us vineyards
            ie: 0, // eu vineyards
            es: 1, // establishment
            tr: 1, // transport
            dr: 1, // risk
            ag: 0, // age
            tu: 0, // trust
            ta: 0  // trusted age
           },
  dictHYBRID = {iw: 0, // Choose layers to show, wine regions
                iu: 1, // us vineyards
                ie: 1, // eu vineyards
                es: 1, // establish
                tr: 0, // transport
                dr: 0, // risk
                ag: 0, // age
                tu: 0, // trust
                ta: 0  // trusted age
               },
  dictPHLAGE = {iw: 0, // Choose layers to show, wine regions
                iu: 1, // us vineyards
                ie: 1, // eu vineyards
                es: 1, // establish
                tr: 0, // transport
                dr: 0, // risk
                ag: 0, // age
                tu: 0, // trust
                ta: 1  // trusted age
               },
  dictTERRAIN = {iw: 1, // Choose layers to show, wine regions
                 iu: 0, // us vineyards
                 ie: 0, // eu vineyards
                 es: 1, // establish
                 tr: 0, // transport
                 dr: 0, // risk
                 ag: 0, // age
                 tu: 0, // trust
                 ta: 1  // trusted age
                }, 
  dictSWITCH = {WRD: dictTERRAIN,
                PHL: dictPHLAGE,
                ITA: dictHYBRID,
                FRA: dictHYBRID,
                ESP: dictHYBRID,
                CAL: dictHYBRID,
                ERA: dictTERRAIN
               }; 
//print(dictSWITCH["WRD"].tr)
var mask_valueBG = 0.5, // decide on what mask value cuttoff for establishment 
    mask_valueSM = 0.05,
    mask_valueMD = 0.3,
    mask_valueSWITCH = {
    WRD: mask_valueSM,
    PHL: mask_valueBG,
    ITA: mask_valueBG,
    FRA: mask_valueBG,
    ESP: mask_valueBG,
    CAL: mask_valueMD//,
    //ERA: mask_valueSM
    },
    vinesVisParam = {"opacity":0.9,"palette":["800080"]}, // vine cropland for US and EU
    estabVisParam = {"opacity":0.9,"palette":['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000']}, // "#e31a1c","#fd8d3c", "#fecc5c", "#FFFFFF"
    ivaVisParam = {color: "800080"},
    palette =  ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'],//['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'], //['#8c510a','#d8b365','#c7eae5','#5ab4ac','#01665e'],    
    transportVisParam = {palette: palette.reverse(), max: 10, min: 0},
    paleTTe =  ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'],//['#d7191c','#fdae61','#abd9e9','#2c7bb6'],//["ffffff","#fecc5c","#fd8d3c","#e31a1c"],//['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],    
    riskVisParam = {palette: paleTTe.reverse(), max: 10, min: 0},
    ageVisParam = {palette: agepalettes[agecol]};
    /*
    popageVisParam = {"opacity":0.9,"palette":},
    trustVisParam = {"opacity":0.9,"palette":},
    trustageVisParam = {"opacity":0.9,"palette":};
*/
// ><><>< 
//['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'];
//['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#f7f7f7','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b'];
//best ['#a50026','#d73027','#f46d43','#fdae61','#abd9e9','#74add1','#4575b4','#313695'];
//['#ca0020','#f4a582','#bababa','#404040'];
//['#b2182b','#d6604d','#f4a582','#fddbc7','#ffffff','#e0e0e0','#bababa','#878787','#4d4d4d'];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Setup Map */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.setCenter(MapParam);  
Map.setControlVisibility(toolParam);
Map.setOptions(optionParamTERRAIN);
Map.style().set('cursor', 'crosshair');
////////////////////////
/* Establishment */
///////////////////////
// make a mean of the three SLF models as of 14_8 these were not the newest models and still need to be uploaded as assets
if(0){
var comb = ee.ImageCollection([toh,slftoh,slf]);
var comb_mean = comb.mean();
} else {
var comb_mean = estab;
}
// Plot Establishment
var mask_value = .01;
Map.addLayer(slf.updateMask(slf.gte(mask_valueSWITCH['WRD'])),estabVisParam,"model 1",1);
Map.addLayer(slftoh.updateMask(slftoh.gte(mask_valueSWITCH['WRD'])),estabVisParam,"model 2",1);
Map.addLayer(toh.updateMask(toh.gte(mask_valueSWITCH['WRD'])),estabVisParam,"model 3",1);
//////////////////////
/* Impact */
/////////////////////
// US
// edit the US NASS data for vineyards
var NASSList = NASS.toList(NASS.size()); // first make it a list
//print(NASSList);
var recentNASS = ee.Image(NASSList.get(24)); // grab the 2019 image
var USgrape = recentNASS.select("cropland").eq(69); // grape is 58 but 69 picks it up
var USgrape = USgrape.mask(USgrape);
var geometr = ee.Geometry.Rectangle([-124.4993, 32.6201, -114.2835, 42.1078 ]);
Export.image.toAsset({
  image: USgrape,
  description: "US_Grape_Export",
  scale: 30,
  maxPixels: 1e10,
  region: geometr
});
// Europe
//print(EUland);
var EUgrape = ee.Image(EUland.toList(EUland.size()).get(4)) //"landcover_class_values").eq(15);
              .eq(221);
var EUgrape = EUgrape.mask(EUgrape);
/////////////////////////////
/* Risk */
////////////////////////////
// Make the Risk Object to Load (Toggle if)
if(0){ // Make sure the viewport is of the entire globe otherwise it get cut off
var risk_ = risk_old.filter(ee.Filter.greaterThan('risk', 0));
//Map.addLayer(risk,{},"risk original");
var empty = ee.Image().byte()//.reproject('EPSG:3857');
var prodrisk = empty.paint({
  featureCollection: risk_,
  color: 'risk'
});
Export.image.toAsset({
  image: prodrisk, 
  description: "impact", 
  assetId: "impact_risk_16Nov2020_v2", 
  scale: 10000})
} 
// fishbowl <>< ><>
// print(prodrisk);
// var prodrisk = prodrisk.reproject('EPSG:3857');
// print(prodrisk.reduceResolution({
//   reducer: ee.Reducer.mean(),
//   maxPixels: 65536
// })); 
// var reprojected = prodrisk
//     .unitScale(-2000, 10000)
//     .reproject('EPSG:4326', null, 500);
// Map.addLayer(reprojected, {}, 'Reprojected');
// <><
/////////////////////////
/* Transport */
////////////////////////
// Make the Transport Object to Load (Toggle if)
if(0){ // Make sure the viewport is of the entire globe otherwise it get cut off
var risk_ = risk_old.filter(ee.Filter.greaterThan('transport', 0));
//Map.addLayer(risk,{},"risk original");
var empty = ee.Image().byte();
var trapot = empty.paint({
  featureCollection: risk_,
  color: 'transport',
  width: 3
});
Export.image.toAsset({
  image: trapot, 
  description: "transport", 
  assetId: "transport_16Nov2020_v2", 
  scale: 5000,
  maxPixels: 1e10 // Need to chose max
})
} 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Plotting Function */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function riskmapPlot(mask_value, dict) {
 // Plot Transport
//Map.addLayer(prodrisk, riskVisParam, 'invasion risk', dict.dr);
//Map.addLayer(trapot, transportVisParam, 'transport potential', dict.tr);
// Plot Establish
var establiz = comb_mean.updateMask(comb_mean.gte(mask_value));
Map.addLayer(establiz, estabVisParam, "DRAFT Ensemble establishment risk", dict.es); ///// 
/*
// Plot Age
Map.addLayer(popage, ageVisParam, "Estimated Population Age", dict.ag); ///// 
Map.addLayer(trust, ageVisParam, "Trust in Estimated Population Age", dict.tu); ///// 
*/
//var trustageliz = trustage.updateMask(trustage.lte(0));
Map.addLayer(trustage, ageVisParam, "Trust-Cropped Population Age", dict.ta); ///// 
// Plot Impact
Map.addLayer(USgrape,vinesVisParam,"vineyards US",dict.iu);
//Map.addLayer(EUgrape,vinesVisParam,"vineyards EU",dict.ie);
Map.addLayer(vino,ivaVisParam,"wine regions",dict.iw);
}
riskmapPlot(mask_valueSWITCH['WRD'], dictTERRAIN);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Add Widgets */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function layerShown(){
    var  dictCURRENT = {
    iw: Map.layers().get(5).get("shown"), // wine regions
    iu: Map.layers().get(3).get("shown"), // us vineyards
    ie: Map.layers().get(4).get("shown"), // eu vineyards
    es: Map.layers().get(2).get("shown"), // establish
    tr: Map.layers().get(1).get("shown"), // transport
    dr: Map.layers().get(0).get("shown")  // risk
    };
    return dictCURRENT;
}
//print(layerShown());
//print(Map.layers().get(1).get("shown"));
// BOTTOM RIGHT
// textbox for the masking instead of the slider
var textbox = ui.Textbox();
textbox.setValue(mask_valueSWITCH['WRD']);  // Set a default value.
textbox.setPlaceholder('0.0-1.0');
textbox.onChange(function(mask_valuz) {
  var dictHOLD = layerShown();
  Map.layers().reset();
  riskmapPlot(Number(mask_valuz),dictHOLD);
  return mask_valuz
});
// HELP
//print(textbox);
var label = ui.Label({value: 'help legend',
                      targetUrl: 'https://ieco-lab.github.io/slfrsk/articles/vignette-040-ee-data.html'});
var eslabel = ui.Label({value: 'establish'});
/////////////////////
// EXPLORE
////////////////////
var places = {
  WRD: MapParam,//
  PHL: {lat:40.415250, lon:-75.675333, zoom:8},//
  ITA: {lon:11.1192, lat:46.0396, zoom:9},//
  FRA: {lon:2.6007325472059417, lat:44.34258969935657, zoom:7}, //
  ESP: {lon:-2.3464, lat:42.4749, zoom:9},//
  CAL: {lon:-122.4988, lat:38.3988, zoom:9}//,//
  //ERA: {lon:67.50754055665384, lat:42.73179014502764, zoom:4}
 // WA: [8.536, 47.376],//
 // NY: [8.536, 47.376],//
 // OR: [8.536, 47.376],//
 // PA: [8.536, 47.376]//
};
var button = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    //Map.setCenter(places[key][0], places[key][1]);
    Map.layers().reset();
    Map.setCenter(places[key]);
    Map.setControlVisibility(toolParam);
    Map.setOptions(optionParam[key]);
    riskmapPlot(mask_valueSWITCH[key],dictSWITCH[key]);
    textbox.setValue(mask_valueSWITCH[key]);
  }
});
// Set a place holder.
button.setPlaceholder('explore');
////////////////////////////
// Plot Bottom Right Panel
////////////////////////////
var panel = ui.Panel({
      widgets: [button,eslabel,textbox,label],
      layout: ui.Panel.Layout.flow('vertical'),
      style: {position: 'bottom-right',
              width: '75px',
              padding: '1px',
              stretch: 'horizontal',
              textAlign: 'right' // <><
      }
    });
// Add the panel to the map.
    //Map.add(panel);
/* // <>< deadfishbowl ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>
// var groundzero = ee.Feature(ee.Geometry.Point([-75.67334, 40.413029])); // Rolling Rock Stone 
var groundzero = ee.Feature(ee.Geometry.Point([40.415250, -75.675333])); // First established population
Map.addLayer(groundzero,{color: "green"},"groundzero",1);
//Map.addLayer(state,{},"state",0);
Map.addLayer(table,{},"stateold",0);
// Make Images out of Features to Apply (Paint) Color Schema to Map
var empty = ee.Image().byte(); // set up your blank canvas (image)
var transport = empty.paint({
  featureCollection: table,// shades are from the 'airQlty' feature property
  color: 'lavg_imass',                    // shades are from the 'airQlty' feature property
  //width: 1                        // paint the polygon outlines with a brush of line width 1 
})
var palette = ['white', 'silver', '#004953', 'black']; // Eagles palette with Midnight Green
var visParam = {palette: palette, min:0, max: 100};
Map.addLayer(transport,visParam,"transport",0);
//Map.addLayer(country,{},"country",0);
// on click
// TABLE panel                            (5)
// var panelTable = ui.Panel();
// panelTable.style().set({
//   width: '150px',
//   position: 'bottom-left',
//   shown: false
// });
//Map.add(panelTable);
// CHART panel                            (4)
var panelChart = ui.Panel();
panelChart.style().set({
  width: '400px',
  //height: '250px',
  position: 'bottom-left',
  shown: false
});
var clickFunc = function(coords) {
  //panelTable.style().set({shown: true});
  panelChart.style().set({shown: true});
  //panelTable.clear();
  panelChart.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Check to make sure click is within priorityScores feature
  var district = table.map(function(feat){
     return ee.Algorithms.If(feat.intersects(point), feat.set({'intersect':1}), feat.set({'intersect':0}));
  });
  // Get Metadata from area clicked
  var area = district.filterMetadata('intersect','equals',1).first();
   //print(area);                // Print the clicked location values to the Console
  // Set up On-click Chart and Table ------------------------------------------------------------
  // Chart
  var chartLabels = ['lavg_imass','gmean_max'];
  var chart = ui.Chart.feature.byProperty(ee.FeatureCollection([area]),chartLabels);
    chart.setOptions({title: 'risk',
                      hAxis: { title: 'invasion stage' },
                      vAxis: { title: 'potential' }, 
                      legend: { position: 'none' },
  });
  panelChart.add(chart);
  // Table
//   area.get('ID').evaluate(function(name){
//         panelTable.add(ui.Label(name)); //evaluate converts EE object to javascript primitive
//         });
//   area.get('lavg_imass').evaluate(function(airQual){
//         panelTable.add(ui.Label("transport" + (airQual).toFixed(0)));
//         }); 
//   area.get('gmean_max').evaluate(function(bd){
//         panelTable.add(ui.Label("establishment " + (bd).toFixed(0))); //evaluate converts EE object to javascript primitive
//         });
//   area.get('lavg_wine').evaluate(function(bd){
//         panelTable.add(ui.Label("impact wine " + (bd).toFixed(0))); //evaluate converts EE object to javascript primitive
//         });
//   area.get('lavg_prod').evaluate(function(crime){
//         panelTable.add(ui.Label("impact grape " + (crime).toFixed(0)));
//         });
}; // end function
Map.onClick(clickFunc);
// ADD DOWNLOAD
// Define a function to generate a download URL of the image for the
// viewport region. 
if(0)
{
// https://gis.stackexchange.com/questions/344680/exporting-image-from-app-side-using-google-earth-engine?rq=1
function downloadEstablish() {
  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  var downloadArgs = {
    name: 'slf_estb',
    crs: 'EPSG:5070',
    scale: 30,
    region: viewBounds.toGeoJSONString()
};
var url = comb_mean.getDownloadURL(downloadArgs);
urlLabel.setUrl(url);
urlLabel.style().set({shown: true});
}
// Add UI elements to the Map.
 var downloadButton = ui.Button('get map', downloadEstablish);
 var urlLabel = ui.Label('Download', {shown: false});
 var panel = ui.Panel({
   widgets: [downloadButton, urlLabel],
   layout: ui.Panel.Layout.flow('vertical'),
      style: {position: 'bottom-left',
              width: '80px',
              padding: '1px',
              stretch: 'horizontal'
      }
 });
 Map.add(panel);
}
// slider for the masking to reduce the extent of the establishment map
if(0){
var slider = ui.Slider();
slider.setValue(mask_value);  // Set a default value.
slider.onChange(function(mask_value) {
  Map.layers().reset();
  //Map.addLayer(slf.updateMask(slf.gte(mask_value)),estabVisParam,"establishment low",0);
  //Map.addLayer(slftoh.updateMask(slftoh.gte(mask_value)),estabVisParam,"establishment mid",0);
  //Map.addLayer(toh.updateMask(toh.gte(mask_value)),estabVisParam,"establishment high",0);
  Map.addLayer(comb_mean.updateMask(comb_mean.gte(mask_value)),estabVisParam,"establishment potential",dict.es); // 
  Map.addLayer(USgrape,vinesVisParam,"impact (US vineyards)", dict.iu);
  Map.addLayer(EUgrape,vinesVisParam,"impact (EU vineyards)", dict.ie);
  Map.addLayer(vino,ivaVisParam,"impact (Wine regions)", dict.iw);
 });
//print(slider);
 // Create a panel that contains both the slider and the label.
var label = ui.Label('risk');
var panel = ui.Panel({
      widgets: [label, slider],
      layout: ui.Panel.Layout.flow('vertical'),
      style: {position: 'bottom-right',
              width: '120px',
              padding: '1px',
              stretch: 'horizontal'
      }
    });
// Add the panel to the map.
    Map.add(panel);
}
/************ OLD CODE *****************/
// Map.addLayer(PAoutline,{},"PA");
// Now clip to PA
// var output = comb_mean.clip(PAoutline);
// Map.addLayer(output,{},"PA SLF");
// Export.image.toDrive({
//   image: output,
//   description: 'slf_maxent_mean_pa',
//   //scale: 5000,
//   maxPixels: 1.0E13,
//   region: PAoutline,
//   fileFormat: 'GeoTIFF'
// });
/* var usa = countries.filter(ee.Filter.eq('iso_num', 840)).filter(ee.Filter.eq("system:index", '00046f219b86290faaf1'));
Map.addLayer(usa,{},"usa"); // this does not seem to be working...
//Map.addLayer(toh,{},"toh");
//Map.addLayer(slftoh,{},"slftoh");
//Map.addLayer(slf,{},"slf");
*/
/* 
// create function to crop with table boundaries
var table_bounds = function(image) {
  // Crop by table extension
  return image.clip(bounds);
};
var outs = comb_mean.clip(usa);
Map.addLayer(outs,{},'outs');
*/
// Export.image.toDrive({
//   image: outs,
//   description: 'slf_maxent_mean_usa',
//   //scale: 5000,
//   maxPixels: 1.0E13,
//   region: usa,
//   fileFormat: 'GeoTIFF'
// });
// Export.image.toDrive({
//   image: comb_mean,
//   description: 'slf_maxent_mean_global',
//   scale: 5000,
//   maxPixels: 1.0E13,
// // region: bounds,
//   fileFormat: 'GeoTIFF'
// });
/*
//print(gHM);
var visParams = {
  palette: ['f5ff64', 'b5ffb4', 'beeaff', 'ffc0e8', '8e8dff', 'adadad'],
  min: 0.0,
  max: 894.0,
  opacity: 0.8,
};
//var image = ee.Image().float().paint(countries, 'iso_num');
//var usa = countries.filter(ee.Filter.eq('iso_num', 840))
//.filter(ee.Filter.eq("system:index", '00046f219b86290faaf1'));
//Map.addLayer(usa,{},"usa");
//print(usa);
//var landcover = dataset.select('landcover');
/*var landcoverVis = {
  min: 11.0,
  max: 95.0,
  palette: [
    '5475A8', 'ffffff', 'E8D1D1', 'E29E8C', 'ff0000', 'B50000', 'D2CDC0',
    '85C77E', '38814E', 'D4E7B0', 'AF963C', 'DCCA8F', 'FDE9AA', 'D1D182',
    'A3CC51', '82BA9E', 'FBF65D', 'CA9146', 'C8E6F8', '64B3D5'
  ],
};
//Map.setCenter(-115.356, 38.686, 5);
//Map.addLayer(landcover, landcoverVis, 'Landcover');
//Map.addLayer(gHM,{},"footprint");
//Map.addLayer(toh,{},"toh_maxent");
// create function to crop with table boundaries
var table_bounds = function(image) {
  // Crop by table extension
  return image.clip(bounds);
};
var outs = gHM.map(table_bounds).reduce(ee.Reducer.first());
Map.addLayer(outs,{},'outs');
print(outs);
/*
Export.image.toDrive({
  image: outs,
  description: 'slf_host_habitat_raster',
//  scale: 30,
  region: bounds,
  fileFormat: 'GeoTIFF'
});
//print(dataset);
//print(landcover);
//print(gHM);
/*
Map.addLayer(image, visParams, 'USDOS/LSIB/2013');
Map.addLayer(countries, null, 'for Inspector', false)
*/ // <>< end deadfishbowl ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>