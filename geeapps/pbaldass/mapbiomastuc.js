var Cuenca = ui.import && ui.import("Cuenca", "table", {
      "id": "users/joanunez/CuencaSuperiorSaliDulce"
    }) || ee.FeatureCollection("users/joanunez/CuencaSuperiorSaliDulce"),
    ParamLULC = ui.import && ui.import("ParamLULC", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "max": 115,
        "palette": [
          "ffffff",
          "129912",
          "1f4423",
          "006400",
          "00ff00",
          "687537",
          "76a5af",
          "29eee4",
          "77a605",
          "935132",
          "bbfcac",
          "45c2a5",
          "b8af4f",
          "f1c232",
          "ffffb2",
          "ffd966",
          "f6b26b",
          "f99f40",
          "e974ed",
          "d5a6bd",
          "c27ba0",
          "fff3bf",
          "ea9999",
          "dd7e6b",
          "aa0000",
          "ff99ff",
          "0000ff",
          "d5d5e5",
          "dd497f",
          "b2ae7c",
          "af2a2a",
          "8a2be2",
          "968c46",
          "0000ff",
          "4fd3ff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"max":115,"palette":["ffffff","129912","1f4423","006400","00ff00","687537","76a5af","29eee4","77a605","935132","bbfcac","45c2a5","b8af4f","f1c232","ffffb2","ffd966","f6b26b","f99f40","e974ed","d5a6bd","c27ba0","fff3bf","ea9999","dd7e6b","aa0000","ff99ff","0000ff","d5d5e5","dd497f","b2ae7c","af2a2a","8a2be2","968c46","0000ff","4fd3ff"]},
    ParamKc = ui.import && ui.import("ParamKc", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "Kc"
        ],
        "min": 0.41950295739130444,
        "max": 1.285552515652174,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["Kc"],"min":0.41950295739130444,"max":1.285552515652174,"gamma":1},
    image = ui.import && ui.import("image", "image", {
      "id": "users/joanunez/UsodeSuelo"
    }) || ee.Image("users/joanunez/UsodeSuelo");
Map.setCenter(-65.4811, -27.3758, 8);
// Mapa Nacional de Cultivos
var MNC = ee.Image('users/joanunez/MNC1819').clip(Cuenca);
//MapBiomas
var MapBiomas = ee.Image("projects/mapbiomas-chaco/public/collection2/mapbiomas_chaco_collection2_integration_v1")
            .select(19).clip(Cuenca);
var palettes = require('users/mapbiomas/modules:Palettes.js');
var MAP_STYLE = {palette:palettes.get('classification2'),min:0,max:34};
Map.addLayer(MapBiomas,MAP_STYLE,'MapBiomas2019');
//MapBiomas
var MapBiomas2 = ee.Image("projects/mapbiomas-chaco/public/collection2/mapbiomas_chaco_collection2_integration_v1")
            .select(0).clip(Cuenca);
Map.addLayer(MapBiomas2,MAP_STYLE,'MapBiomas2000');