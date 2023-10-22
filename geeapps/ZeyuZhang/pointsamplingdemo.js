var boundary = ui.import && ui.import("boundary", "table", {
      "id": "users/ZeyuZhang/NAIP_boundary"
    }) || ee.FeatureCollection("users/ZeyuZhang/NAIP_boundary"),
    strata = ui.import && ui.import("strata", "image", {
      "id": "users/ZeyuZhang/newstrata"
    }) || ee.Image("users/ZeyuZhang/newstrata"),
    BT_2010 = ui.import && ui.import("BT_2010", "image", {
      "id": "users/ZeyuZhang/BT_2010"
    }) || ee.Image("users/ZeyuZhang/BT_2010"),
    BT_2012 = ui.import && ui.import("BT_2012", "image", {
      "id": "users/ZeyuZhang/BT_2012"
    }) || ee.Image("users/ZeyuZhang/BT_2012"),
    BT_2014 = ui.import && ui.import("BT_2014", "image", {
      "id": "users/ZeyuZhang/BT_2014"
    }) || ee.Image("users/ZeyuZhang/BT_2014"),
    BT_2016 = ui.import && ui.import("BT_2016", "image", {
      "id": "users/ZeyuZhang/BT_2016"
    }) || ee.Image("users/ZeyuZhang/BT_2016"),
    BT_2018 = ui.import && ui.import("BT_2018", "image", {
      "id": "users/ZeyuZhang/BT_2018"
    }) || ee.Image("users/ZeyuZhang/BT_2018");
//Version:8    
//import NAIP from imagecollection
var NAIP_2010 = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2010-01-01', '2010-12-31'))
                  .map(function(image){return image.clip(boundary)});
var NAIP_2012 = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2012-01-01', '2012-12-31'))
                  .map(function(image){return image.clip(boundary)});
var NAIP_2014 = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2014-01-01', '2014-12-31'))
                  .map(function(image){return image.clip(boundary)});
var NAIP_2016 = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2016-01-01', '2016-12-31'))
                  .map(function(image){return image.clip(boundary)});
var NAIP_2018 = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2018-01-01', '2018-12-31'))
                  .map(function(image){return image.clip(boundary)});
//NDWI
var NDWI_2010 = NAIP_2010.mean().normalizedDifference(['G', 'N']);
var NDWI_2012 = NAIP_2012.mean().normalizedDifference(['G', 'N']);
var NDWI_2014 = NAIP_2014.mean().normalizedDifference(['G', 'N']);
var NDWI_2016 = NAIP_2016.mean().normalizedDifference(['G', 'N']);
var NDWI_2018 = NAIP_2018.mean().normalizedDifference(['G', 'N']);
// Visual Palette-----------------------------------------------------------------------
 var naVis = {bands: ['R', 'G', 'B'], min: 0, max: 255};
 var fcVis = {bands: ['N', 'R', 'G'], min: 0, max: 255};
 var ndwiVis = {min: -0.2, max: 0.2, palette: ['white', 'blue']};
 var highlight = {color: 'fdff32'};
//extract pixel values = 1-----------------------------------------------------------
var alP = strata.updateMask(strata.select('b1').eq(1));
var alA = strata.updateMask(strata.select('b1').eq(2));
var gain = strata.updateMask(strata.select('b1').eq(3));
var loss = strata.updateMask(strata.select('b1').eq(4));
var other = strata.updateMask(strata.select('b1').eq(5));
//Map.addLayer(alA1, straVis,'Always Absense');
//points sampling-------------------------------------------------------------------
var n = 10; // set number of points
var s = 1; // set seed for different sample points
var points_alA = alA.stratifiedSample({
  numPoints: n,
  seed: s,
  geometries:true
});
var points_alP = alP.stratifiedSample({
  numPoints: n,
  seed: s,
  geometries:true
});
var points_gain = gain.stratifiedSample({
  numPoints: n,
  seed: s,
  geometries:true
});
var points_loss = loss.stratifiedSample({
  numPoints: n,
  seed: s,
  geometries:true
});
var points_other = other.stratifiedSample({
  numPoints: 20,
  seed: s,
  geometries:true
});
//Map.addLayer(points_alA);
//merge 5 featurecollections into 1--------------------------------------------------------
var points_alA_alP = points_alA.merge(points_alP);
var points_alA_alP_gain = points_alA_alP.merge(points_gain);
var points_alA_alP_gain_loss = points_alA_alP_gain.merge(points_loss);
var points = points_alA_alP_gain_loss.merge(points_other);
//Map.addLayer(points,{}, 'Points');
// print(points_fc[0])
// print(points_fc)
//get points coordinate----------------------------------------------------------------
var pointsGeometry = points.geometry();
var pointsCoordinate = pointsGeometry.coordinates();
//print(pointsCoordinate)
//extract numbers----------------------------------------------------------------------
var list = [];
var r = [];
for(var i=0; i < ee.Number(pointsCoordinate.length()).getInfo(); i++){
  list[i] = ee.List(ee.Number(pointsCoordinate.get(i)));
}
for(var j=0; j < ee.Number(pointsCoordinate.length()).getInfo(); j++)
{
  r[j] = j;
}
// for (var x = ee.Number(pointsCoordinate.length()).getInfo() - 1; x > 0; x--) {
//         var y = Math.floor(Math.random() * (x + 1));
//         var temp = list[x];
//         list[x] = list[y];
//         list[y] = temp;
//         var tem = r[x];
//         r[x] = r[y];
//         r[y] = tem;
//     }
//create table--------------------------------------------------------------------
var tn;
var title = ui.Label('Please enter your name');
var textbox_n = ui.Textbox({
          placeholder: 'Name',
          onChange: function(text) {
            tn = ee.String(text);
            Map.remove(panel_n);
            var dataTable = [
          ['Stratum',
          'PointID',
          'PointID_R',
          'Latitude',
          'Longitude',
          'Year',
          'Certain',
          'X',
          'Note',
          'Y'
          ]
        ];
        var subdataTable = [
          ['PointID_R',
          'Year',
          'Certain',
          'X'
          ]
        ];
var fc = ee.FeatureCollection([]);
var b_e = ui.Button({
          label: 'Export Table',
          onClick: function() {
            for (var i = 1; i< ee.Number(dataTable.length).getInfo(); i++){
              var fc_point = ee.FeatureCollection([
                ee.Feature(null, {
                  'Labeller': tn.getInfo(),
                  'Stratum': ee.List(ee.List(dataTable).get(i)).get(0),
                  'PointID': ee.List(ee.List(dataTable).get(i)).get(1),
                  'PointID_R': ee.List(ee.List(dataTable).get(i)).get(2),
                  'Latitude': ee.List(ee.List(dataTable).get(i)).get(3),
                  'Longitude': ee.List(ee.List(dataTable).get(i)).get(4),
                  'Year': ee.List(ee.List(dataTable).get(i)).get(5),
                  'Certain': ee.List(ee.List(dataTable).get(i)).get(6),
                  'X': ee.List(ee.List(dataTable).get(i)).get(7),
                  'Note': ee.List(ee.List(dataTable).get(i)).get(8),
                  'Y': ee.List(ee.List(dataTable).get(i)).get(9),
                })
                ]);
            fc = fc.merge(fc_point);
  }
            Export.table.toDrive({
              collection: fc,
              description: 'Sample_points_Table',
              folder: 'Sample_points_Table',
              fileFormat: 'CSV',
              selectors: ['Labeller', 'Stratum', 'PointID','Latitude','Longitude','Year','Certain','X','Note','Y']
            });
          }});
// Export.table.toDrive({
//               collection: points,
//               description: 'points',
//               folder: 'Sample_points_Table',
//               fileFormat: 'CSV',
//             });
var chart = ui.Chart(subdataTable).setChartType('Table');
var panel_dt = ui.Panel();
panel_dt.style().set({
  width: '700px',
  height: '120px',
  position: 'bottom-left'
});
panel_dt.add(chart);
Map.add(panel_dt);
var panel_e = ui.Panel({
    widgets: [
        b_e
    ],
    style: {
        position: 'bottom-right',
    }
});
Map.add(panel_e);
//create ui select widget---------------------------------------------------------
var places = {};
for(var i = 0; i < ee.Number(pointsCoordinate.length()).getInfo(); i++){
  places[i] = [ee.Number(list[i].get(0)).getInfo(), ee.Number(list[i].get(1)).getInfo()];
}
var centerP_lon, centerP_lat,p1,p2,p3,p4,point_lon, point_lat,point_ID,point_ID_R,stra;
var str = [];
str[0] = 'All Absence';
str[1] = 'All Presence';
str[2] = 'Gain';
str[3] = 'Loss';
str[4] = 'Other';
var CurrentPoint = ee.Geometry.Point(
  [ee.Number(places[0][0]).getInfo(), ee.Number(places[0][1]).getInfo()]);
Map.addLayer(CurrentPoint, {palette: 'FFFFFF'},'CurrentPoint');
var removeLayer = function(){
  var layers = Map.layers();
  var layer = layers.get(4);
  Map.remove(layer);
};
var removeAllLayers = function(){
  var layers = Map.layers();
  for(var l = 4; l > -1; l--){
  var layer = layers.get(l);
  Map.remove(layer); 
  }
};
var op, t1;
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    op = ee.Number.parse(key).getInfo();
    label_cp.setValue('Current Point:' + op);
    point_ID_R = key;
    point_ID = r[key];
    t1 = ee.String(point_ID_R);
    if(r[key] < n){
      stra = str[0];
    } else if (r[key] >= n && r[key] < 2*n){
      stra = str[1];
    } else if (r[key] >= 2*n && r[key] < 3*n){
      stra = str[2];
    } else if (r[key] >= 3*n && r[key] < 4*n){
      stra = str[3];
    } else if(r[key] >= 4*n){
      stra = str[4];
    }
    point_lon = places[key][0];
    point_lat = places[key][1];
    p1 = places[key][0] + 0.00005;
    p2 = places[key][0] - 0.00005;
    p3 = places[key][1] + 0.00005;
    p4 = places[key][1] - 0.00005;
    Map.setCenter(places[key][0], places[key][1],19);
    removeLayer();
    CurrentPoint = ee.Geometry.Point(
      [ee.Number(places[key][0]).getInfo(), ee.Number(places[key][1]).getInfo()]);
      Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
    }
});
var bn = ui.Button({
          label: 'Next Point',
          onClick: function() {
            if(op < 5*n){op = op+1;}
            point_ID_R = op;
            point_ID = r[op];
            t1 = ee.Number(point_ID_R);
            point_lon = places[op][0];
            point_lat = places[op][1];
            label_cp.setValue('Current Point:' + op);
            p1 = places[op][0] + 0.00005;
            p2 = places[op][0] - 0.00005;
            p3 = places[op][1] + 0.00005;
            p4 = places[op][1] - 0.00005;
            Map.setCenter(places[op][0], places[op][1],19);
            removeLayer();
            CurrentPoint = ee.Geometry.Point(
              [ee.Number(places[op][0]).getInfo(), ee.Number(places[op][1]).getInfo()]);
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
          }});
//enter points information-----------------------------------------------------------------
var years = {
  2010: [],
  2012: [],
  2014: [],
  2016: [],
  2018: []
};
var dataTable1, dataTable2;
var c1,c2,year,t0,t2,t3,st,no,y_status;
Map.onClick(function(coords){
      var point = Map.getCenter();
      var coo = point.coordinates();
      if((coords.lon < p1)&& (coords.lon > p2)&&(coords.lat < p3)&&(coords.lat > p4)){
        c1 = ee.Number(point_lat);
        c2 = ee.Number(point_lon);
        t0 = ee.Number(point_ID);
        st = ee.String(stra);
        no = ee.String('');
        var y_point = ee.Geometry.Point(
      [ee.Number(point_lon).getInfo(), ee.Number(point_lat).getInfo()]);
        var select_Y = ui.Select({
          items: Object.keys(years),
          onChange: function(key) {
          year = ee.String(key);
          var clayers = Map.layers();
          if(key == 2010){
            var y_2010 = BT_2010.reduceRegion({
              geometry: y_point,
              scale: 0.6,
              reducer: ee.Reducer.mean()});
            y_status = y_2010.get('b1');  
            if(clayers.get(0)){
              removeAllLayers();
              Map.addLayer(NAIP_2010, naVis, 'TrueColor-2010');
              Map.addLayer(NAIP_2010, fcVis, 'FalseColor-2010',false);
              Map.addLayer(NDWI_2010, ndwiVis, 'NDWI-2010',false);
              Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
            } else {
              Map.addLayer(NAIP_2010, naVis, 'TrueColor-2010');
              Map.addLayer(NAIP_2010, fcVis, 'FalseColor-2010',false);
              Map.addLayer(NDWI_2010, ndwiVis, 'NDWI-2010',false);
              Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');}
            } else if(key == 2012){
              var y_2012 = BT_2012.reduceRegion({
              geometry: y_point,
              scale: 0.6,
              reducer: ee.Reducer.mean()});
            y_status = y_2012.get('b1');
              removeAllLayers();
              Map.addLayer(NAIP_2012, naVis, 'TrueColor-2012');
              Map.addLayer(NAIP_2012, fcVis, 'FalseColor-2012',false);
              Map.addLayer(NDWI_2012, ndwiVis, 'NDWI-2012',false);
              Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
            } else if(key == 2014){
              var y_2014 = BT_2014.reduceRegion({
              geometry: y_point,
              scale: 0.6,
              reducer: ee.Reducer.mean()});
            y_status = y_2014.get('b1');
              removeAllLayers();
              Map.addLayer(NAIP_2014, naVis, 'TrueColor-2014');
              Map.addLayer(NAIP_2014, fcVis, 'FalseColor-2014',false);
              Map.addLayer(NDWI_2014, ndwiVis, 'NDWI-2014',false);
              Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
            } else if(key == 2016){
              var y_2016 = BT_2016.reduceRegion({
              geometry: y_point,
              scale: 0.6,
              reducer: ee.Reducer.mean()});
            y_status = y_2016.get('b1');
              removeAllLayers();
              Map.addLayer(NAIP_2016, naVis, 'TrueColor-2016');
              Map.addLayer(NAIP_2016, fcVis, 'FalseColor-2016',false);
              Map.addLayer(NDWI_2016, ndwiVis, 'NDWI-2016',false);
              Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
            } else if(key == 2018){
              var y_2018 = BT_2018.reduceRegion({
              geometry: y_point,
              scale: 0.6,
              reducer: ee.Reducer.mean()});
            y_status = y_2018.get('b1');
              removeAllLayers();
              Map.addLayer(NAIP_2018, naVis, 'TrueColor-2018');
              Map.addLayer(NAIP_2018, fcVis, 'FalseColor-2018',false);
              Map.addLayer(NDWI_2018, ndwiVis, 'NDWI-2018',false);
              Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
              Map.addLayer(ee.FeatureCollection(CurrentPoint).style(highlight), {},'CurrentPoint');
            }
          var textbox2 = ui.Textbox({
              placeholder: 'Certain',
              onChange: function(text) {
                t2 = ee.String(text);
              }});
          var textbox3 = ui.Textbox({
              placeholder: 'X',
              onChange: function(text) {
                t3 = ee.String(text);
                      }});
          var textbox4 = ui.Textbox({
              placeholder: 'Note',
              onChange: function(text) {
                no = ee.String(text);
                      }});
          var b1 = ui.Button({
          label: 'Save',
          onClick: function() {
            dataTable1 = dataTable.concat([[
                  st.getInfo(),
                  t0.getInfo(),
                  t1.getInfo(),
                  c1.getInfo(),
                  c2.getInfo(),
                  year.getInfo(),
                  t2.getInfo(),
                  t3.getInfo(),
                  no.getInfo(),
                  y_status.getInfo(),
                  ]]);
                dataTable2 = subdataTable.concat([[
                  t1.getInfo(),
                  year.getInfo(),
                  t2.getInfo(),
                  t3.getInfo()
                  ]]);
            dataTable = dataTable1;
            subdataTable = dataTable2;
            panel_dt.clear();
            var chart1 = ui.Chart(subdataTable).setChartType('Table');
            panel_dt.add(chart1);
            panel_t.remove(textbox2);
            panel_t.remove(textbox3);
            panel_t.remove(textbox4);
            panel_t.remove(b1);
            no = ee.String('');
            if(key == 2018){
              Map.remove(panel_t);
            }
          }});
          var twidgets = panel_t.widgets();
          //print('0',twidgets.get(0));
          if(twidgets.get(1)){
            panel_t.remove(textbox2);
            panel_t.remove(textbox3);
            panel_t.remove(textbox4);
            panel_t.remove(b1);
          } else {
          panel_t.add(textbox2);
          panel_t.add(textbox3);
          panel_t.add(textbox4);
          panel_t.add(b1);
          }
          }
        });
        var panel_x = ui.Panel({
          widgets: [
            select_Y
            ],
          layout: ui.Panel.Layout.flow('horizontal'),
          });
        var panel_t = ui.Panel({
          widgets: [
            panel_x,
            ],
          layout: ui.Panel.Layout.flow('horizontal'),
          });
          panel_t.style().set({
            width: '700px',
            position: 'top-center'
            });
          var tpanels = Map.widgets();
          if(tpanels.get(3)){
             Map.remove(panel_t);
          } else{
            Map.add(panel_t);
          }
          select_Y.setPlaceholder('  Choose a year  ');
      }});
// Set a place holder.
select.setPlaceholder('  Choose a point  ');
// create label--------------------------------------------------
var labellink = ui.Label({
  value: 'Manual',
  style: { color: '484848'},
  targetUrl: 'https://docs.google.com/document/d/10jnBwiSRAu9SLVFqABzntkthMKO7k3BDR7IZay73l3o/edit?usp=sharing'
});
var label_cp = ui.Label({
  value: 'Current Point:',
  style: { color: '484848'}
});
// create panel---------------------------------------------------
var panel = ui.Panel({
    widgets: [
        label_cp,
        select,
        bn,
        labellink
    ],
    style: {
        position: 'middle-left',
    }
});
Map.add(panel);
          }});
var panel_n = ui.Panel({
          widgets: [
            title,
            textbox_n
            ],
          layout: ui.Panel.Layout.flow('vertical'),
          });
          panel_n.style().set({
            position: 'top-center'
            });
           Map.add(panel_n);
// //Add map layers---------------------------------------------------------------------------
Map.addLayer(NAIP_2010, naVis, 'TrueColor-2010');
Map.addLayer(NAIP_2010, fcVis, 'FalseColor-2010',false);
Map.addLayer(NDWI_2010, ndwiVis, 'NDWI-2010',false);
 Map.addLayer(points,{palette: 'FFFFFF'}, 'Points');
 Map.centerObject(points,12);