var table1 = ui.import && ui.import("table1", "table", {
      "id": "users/350343914/FinalResult1"
    }) || ee.FeatureCollection("users/350343914/FinalResult1"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/350343914/FinalResult2"
    }) || ee.FeatureCollection("users/350343914/FinalResult2"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/350343914/FinalResult3"
    }) || ee.FeatureCollection("users/350343914/FinalResult3"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/350343914/FinalResult4"
    }) || ee.FeatureCollection("users/350343914/FinalResult4"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/350343914/FinalResult5"
    }) || ee.FeatureCollection("users/350343914/FinalResult5"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "users/350343914/FinalResult6"
    }) || ee.FeatureCollection("users/350343914/FinalResult6"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "users/350343914/FinalResult7"
    }) || ee.FeatureCollection("users/350343914/FinalResult7"),
    table8 = ui.import && ui.import("table8", "table", {
      "id": "users/350343914/FinalResult8"
    }) || ee.FeatureCollection("users/350343914/FinalResult8"),
    table9 = ui.import && ui.import("table9", "table", {
      "id": "users/350343914/FinalResult9"
    }) || ee.FeatureCollection("users/350343914/FinalResult9"),
    table10 = ui.import && ui.import("table10", "table", {
      "id": "users/350343914/FinalResult10"
    }) || ee.FeatureCollection("users/350343914/FinalResult10"),
    table11 = ui.import && ui.import("table11", "table", {
      "id": "users/350343914/FinalResult11"
    }) || ee.FeatureCollection("users/350343914/FinalResult11"),
    tables = ui.import && ui.import("tables", "table", {
      "id": "users/350343914/FinalResultALL"
    }) || ee.FeatureCollection("users/350343914/FinalResultALL");
var table1 = ee.FeatureCollection("users/350343914/FinalResult1"),
    table2 = ee.FeatureCollection("users/350343914/FinalResult2"),
    table3 = ee.FeatureCollection("users/350343914/FinalResult3"),
    table4 = ee.FeatureCollection("users/350343914/FinalResult4"),
    table5 = ee.FeatureCollection("users/350343914/FinalResult5"),
    table6 = ee.FeatureCollection("users/350343914/FinalResult6"),
    table7 = ee.FeatureCollection("users/350343914/FinalResult7"),
    table8 = ee.FeatureCollection("users/350343914/FinalResult8"),
    table9 = ee.FeatureCollection("users/350343914/FinalResult9"),
    table10 = ee.FeatureCollection("users/350343914/FinalResult10"),
    table11 = ee.FeatureCollection("users/350343914/FinalResult11"),
    tables = ee.FeatureCollection("users/350343914/FinalResultALL");
var display1 = ee.Image(0).updateMask(0).paint(table1, 'fb00ff', 1);
var display2 = ee.Image(0).updateMask(0).paint(table2, 'ff0000', 1);
var display3 = ee.Image(0).updateMask(0).paint(table3, 'ff0000', 1);
var display4 = ee.Image(0).updateMask(0).paint(table4, 'ff0000', 1);
var display5 = ee.Image(0).updateMask(0).paint(table5, 'ff0000', 1);
var display6 = ee.Image(0).updateMask(0).paint(table6, 'ff0000', 1);
var display7 = ee.Image(0).updateMask(0).paint(table7, 'ff0000', 1);
var display8 = ee.Image(0).updateMask(0).paint(table8, 'ff0000', 1);
var display9 = ee.Image(0).updateMask(0).paint(table9, 'ff0000', 1);
var display10 = ee.Image(0).updateMask(0).paint(table10, 'ff0000', 1);
var display11 = ee.Image(0).updateMask(0).paint(table11, 'ff0000', 1);
var displayAll = ee.Image(0).updateMask(0).paint(tables, 'ff0000', 1);
Map.addLayer(display11, {palette: 'ff0000'},'第11批 (2017/10/31,12)',false);
Map.addLayer(display10, {palette: 'ff0000'},'第10批 (2016/11/30,31)',false);
Map.addLayer(display9, {palette: 'ff0000'},'第9批 (2015/11/17,28)',false);
Map.addLayer(display8, {palette: 'ff0000'},'第8批 (2014/11/26,36)',false);
Map.addLayer(display7, {palette: 'ff0000'},'第7批 (2013/11/11,60)',false);
Map.addLayer(display6, {palette: 'ff0000'},'第6批 (2012/12/07,86)',false);
Map.addLayer(display5, {palette: 'ff0000'},'第5批 (2011/12/08,62)',false);
Map.addLayer(display4, {palette: 'ff0000'},'第4批 (2010/11/25,60)',false);
Map.addLayer(display3, {palette: 'ff0000'},'第3批 (2009/11/17,57)',false);
Map.addLayer(display2, {palette: 'ff0000'},'第2批 (2008/12/22,63)',false);
Map.addLayer(display1, {palette: 'ff0000'},'第1批 (2007/12/12,40)',false);
Map.addLayer(displayAll, {palette: 'ff0000'},'第1-11批 (2007~2017,535)');
Map.centerObject(tables, 4);