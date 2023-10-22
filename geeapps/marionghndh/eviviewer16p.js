var geometry_rect = ui.import && ui.import("geometry_rect", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                19.087113589094393,
                -18.22580188345785
              ],
              [
                19.087113589094393,
                -18.429168107965765
              ],
              [
                19.42356988792252,
                -18.429168107965765
              ],
              [
                19.42356988792252,
                -18.22580188345785
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[19.087113589094393, -18.22580188345785],
          [19.087113589094393, -18.429168107965765],
          [19.42356988792252, -18.429168107965765],
          [19.42356988792252, -18.22580188345785]]], null, false),
    geometry_point = ui.import && ui.import("geometry_point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            19.245923734369814,
            -18.322252651460296
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Point([19.245923734369814, -18.322252651460296]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/marionghndh/SASSCAL/cents_new"
    }) || ee.FeatureCollection("users/marionghndh/SASSCAL/cents_new"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/marionghndh/SASSCAL/points_new"
    }) || ee.FeatureCollection("users/marionghndh/SASSCAL/points_new"),
    borders = ui.import && ui.import("borders", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
//-------------------------------------------------------------------
//Maintanance Readme
//-------------------------------------------------------------------
/*
set beginning year in MISC_SENSOR_INTRINSICS
*/
//-------------------------------------------------------------------
//FUNCTIONS
//-------------------------------------------------------------------
var getChartDateSelect = function(POI, IC_DIST){
  var chart = getCHART.distchart(POI, IC_DIST);
  chart.onClick(function(x,y,name){
    date_current = ee.Date(x);
    panel_n.widgets().get(2).widgets().get(1).setValue(date_current.format("Y-M-d").getInfo());
  });
  return(chart);
};
var extractValues = function(IC, POI, band){
  IC = IC.filter(ee.Filter.listContains("bandnames", band)).select(band);
  var ft = ee.FeatureCollection(ee.List([]));
  var fill = function(img, ini) {
    // type cast
    var inift = ee.FeatureCollection(ini);
    // gets the values for the points in the current img
    var ft2 = img.reduceRegions(POI, ee.Reducer.first(),30);
  // gets the date of the img
    var date = img.date().format();
    // writes the date in each feature
    var ft3 = ft2.map(function(f){
      f = f.set("date", date);
      f = f.set("system:index", "dummy");
      return f;
    });
    // merges the FeatureCollections
    return inift.merge(ft3);
  };
  return(ee.FeatureCollection(IC.iterate(fill, ft)));
};
var updateTitle = function(){
  var title_main = sensor_type + ": " + current_raster_name + "\n" + date_current.format("Y-M-d").getInfo() + "\n" + "LON: " + POI.coordinates().get(0).getInfo().toFixed(3)+ " LAT: " +POI.coordinates().get(1).getInfo().toFixed(3);
  panel_t.widgets().set(0, ui.Label(title_main,{whiteSpace: 'pre'}));
};
var updateAll = function(){
  if (buffer_size === 0) {
    Map.centerObject(POI, zoom_0);
  }
  else {
    Map.centerObject(POI, default_zoom);
  }
  current_raster_name = sensormeta[sensor_type][1];
  misc.removeLayer("POI");
  misc.removeLayer("ROI");
  misc.removeLayer(sensormeta["MODIS"][1]);
  misc.removeLayer(sensormeta["S2"][1]);
  Map.addLayer(POI,{},"POI");
  Map.addLayer(ROI,{},"ROI");
  IC_DIST = getIC.getDist(POI, ROI, year_start, date_first, date_last, sensor_type);
  IC_ANO = getIC.getAno(POI, ROI, sensor_type, year_start).merge(getIC.getBurn_Daily(POI, ROI, year_start));
  // IC_ANO = getIC.getAno(POI, ROI, sensor_type, year_start).merge(getIC.getBurn_Daily(POI, ROI, year_start)).merge(getIC.getBurn_Monthly(POI, ROI, year_start));
  var ftable =  extractValues(IC_DIST, POI, current_raster_name);
  print(ftable,"ft");
  print(ftable.select(["date",current_raster_name]),"fts");
  panel_n.widgets().get(7).widgets().get(1).setUrl(ftable.getDownloadURL("csv",["date","first"]));
  var chart_D = getChartDateSelect(POI, IC_DIST);
  var chart_A = getCHART.anochart(POI, IC_ANO);
  panel_d.widgets().set(0, chart_D);
  panel_a.widgets().set(0, chart_A);
  //find first image in 1 month period after date_current and adjust date_current
  IC_DIST = IC_DIST.filter(ee.Filter.listContains("bandnames", current_raster_name)).select(current_raster_name);
  IC_DIST = IC_DIST.map(function(image){
    return image.set(
      'dateDist',
      ee.Number(image.get('system:time_start')).subtract(date_current.millis()).abs()
    );
  });
  IC_DIST = IC_DIST.sort('dateDist');
  current_img = IC_DIST.first();
  date_current = ee.Date(current_img.get("system:time_start"));
  panel_n.widgets().get(2).widgets().get(1).setValue(date_current.format("Y-M-d").getInfo());
  misc.addImage1B(current_img, current_raster_name);
  updateTitle();
};
var showMosaic = function(range) {
    //date_current = range[0];
  };
//-------------------------------------------------------------------
//CONSTANTS
//-------------------------------------------------------------------
//imports
var misc = require('users/marionghndh/SASSCAL_VIEWER:MISC_FUNCTIONS');
var getIC = require('users/marionghndh/SASSCAL_VIEWER:MISC_GETIC');
var getCHART = require('users/marionghndh/SASSCAL_VIEWER:MISC_GETCHART');
var getUI = require('users/marionghndh/SASSCAL_VIEWER:MISC_UI');
var SensorMeta = require('users/marionghndh/SASSCAL_VIEWER:MISC_SENSOR_INTRINSICS');
var sensormeta = SensorMeta.available_sensors;
//other
var default_zoom = 13;
var zoom_0 = 6;
var buffer_max = 10000;
var buffer_min = 1000;
var year_start_sensors = {MODIS: SensorMeta.available_sensors.MODIS[2][0].value,S2: SensorMeta.available_sensors.S2[2][0].value};
var year_start = year_start_sensors.MODIS;
//-------------------------------------------------------------------
//DEFAULT DATA
//-------------------------------------------------------------------
//geometry
var ROI = borders.filter(ee.Filter.inList("country_na",["Angola","Zambia","Namibia","Botswana","South Africa"]));
var POI = geometry_point;
var POI = ee.Geometry.Point([16.995, -16.489]);
var buffer_size = 0;
//sensor setup
var sensor_type = "MODIS";
//dates
var date_last = ee.Date(new Date());
var date_first = date_last.advance(-1,"year");
var date_current = date_last;
var year = ee.Number.parse(ee.Date(new Date()).format("YYYY")).getInfo();
//dataset dynamics
var current_raster_name = sensormeta[sensor_type][1];
var IC_DIST = "";
var IC_ANO = "";
var current_img = "";
//-------------------------------------------------------------------
//UI
//-------------------------------------------------------------------
var panel_d = getUI.panel_dist;
var panel_a = getUI.panel_ano;
var panel_t = getUI.panel_title;
var panel_r = getUI.panel_readme;
Map.add(panel_d);
Map.add(panel_a);
Map.add(panel_t);
Map.add(panel_r);
var readme_on = false;
panel_r.widgets().get(1).onClick(function(tmp){
  if(readme_on){
    print("huhuh");
    panel_r.widgets().get(0).setValue("");
    panel_r.widgets().get(1).setLabel("Readme");
    panel_r.style().set({width: '5%', height: "85px"});
  }
  else{
    print("haha");
    panel_r.widgets().get(0).setValue(getUI.readme_all);
    panel_r.widgets().get(1).setLabel("Understood");
    panel_r.style().set({width: '45%', height: "65%"});
  }
  readme_on = !readme_on;
});
//-------------------------------------------------------------------
var panel_n = getUI.get_panel_nav(sensormeta,
  sensormeta[sensor_type][2],
  [date_first, date_last],
  table.getInfo()['features']
  );
Map.add(panel_n);
panel_n.widgets().get(4).widgets().get(1).setValue(ee.Number(POI.coordinates().get(0)).format("%.6f").getInfo());
panel_n.widgets().get(5).widgets().get(1).setValue(ee.Number(POI.coordinates().get(1)).format("%.6f").getInfo());
//-------------------------------------------------------------------
//--------------onchange
//select sensor
panel_n.widgets().get(0).widgets().get(1).onChange(function(item) {
  print("sensor changed");
  sensor_type = item;
  current_raster_name = sensormeta[sensor_type][1];
  year_start = year_start_sensors[sensor_type];
});
//select year
panel_n.widgets().get(1).widgets().get(1).onChange(function(item) {
  print("year changed");
  year = item;
  date_first = ee.Date.fromYMD(year,1,1);
  date_last = ee.Date.fromYMD(year + 1,1,1);
});
//select observatory
panel_n.widgets().get(3).widgets().get(1).onChange(function(item){
  panel_n.widgets().get(4).widgets().get(1).setValue(ee.Number(item.coordinates[0]).format("%.6f").getInfo());
  panel_n.widgets().get(5).widgets().get(1).setValue(ee.Number(item.coordinates[1]).format("%.6f").getInfo());
});
//buffer size
panel_n.widgets().get(6).widgets().get(1).setValue(ee.Number(buffer_size).format("%d").getInfo());
//apply
panel_n.widgets().get(7).widgets().get(0).onClick(function(){
  buffer_size = ee.Number.parse(panel_n.widgets().get(6).widgets().get(1).getValue()).getInfo();
  date_current = ee.Date(panel_n.widgets().get(2).widgets().get(1).getValue()[1]);
  print(date_current);
  POI = ee.Geometry.Point(ee.Number.parse(panel_n.widgets().get(4).widgets().get(1).getValue()), ee.Number.parse(panel_n.widgets().get(5).widgets().get(1).getValue()));
  //check and apply buffer
  if (sensor_type.localeCompare("S2") === 0){
    print("sensor S2");
    ROI = POI.buffer(buffer_size);
    if (buffer_size === 0) {
      print("buffer 0 setting min");
      buffer_size = buffer_min;
      panel_n.widgets().get(6).widgets().get(1).setValue(ee.Number(buffer_size).format("%d").getInfo());
      ROI = POI.buffer(buffer_size);
    }
    if (buffer_size >= buffer_max) {
      print("buffer too big setting max");
      buffer_size = buffer_max;
      panel_n.widgets().get(6).widgets().get(1).setValue(ee.Number(buffer_size).format("%d").getInfo());
      ROI = POI.buffer(buffer_size);
    }
  }
  if (sensor_type.localeCompare("MODIS") === 0){
    ROI = POI.buffer(buffer_size);
    print("sensor MODIS");
    if (buffer_size === 0) {
      print("buffer 0 setting borders");
      ROI = borders.filter(ee.Filter.inList("country_na",["Angola","Zambia","Namibia","Botswana","South Africa"]));
    }
    if (buffer_size > buffer_max) {
      print("buffer too big setting max");
      buffer_size = buffer_max;
      panel_n.widgets().get(6).widgets().get(1).setValue(ee.Number(buffer_size).format("%d").getInfo());
      ROI = POI.buffer(buffer_size);
    }
  }
  updateAll();
});
//MAP
//-------------------------------------------------------------------
Map.style().set('cursor', 'crosshair');
Map.drawingTools().setShown(false);
Map.setOptions("SATELLITE");
// Map.onTileLoaded(function(item){print(print(item))});
Map.onClick(function(coords) {
  POI = ee.Geometry.Point(coords.lon, coords.lat);
  panel_n.widgets().get(4).widgets().get(1).setValue(ee.Number(POI.coordinates().get(0)).format("%.6f").getInfo());
  panel_n.widgets().get(5).widgets().get(1).setValue(ee.Number(POI.coordinates().get(1)).format("%.6f").getInfo());
  misc.removeLayer("POI");
  Map.addLayer(POI,{},"POI");
});
Map.centerObject(POI, zoom_0);
// updateAll()
// IC_DIST = getIC.getDist(POI, ROI, date_first, date_last, sensor_type);
// IC_ANO = getIC.getAno(POI, ROI, sensor_type);