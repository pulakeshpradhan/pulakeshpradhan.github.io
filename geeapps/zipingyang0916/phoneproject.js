var sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    water_area = ui.import && ui.import("water_area", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater"),
    inland_water = ui.import && ui.import("inland_water", "image", {
      "id": "JRC/GSW1_2/Metadata"
    }) || ee.Image("JRC/GSW1_2/Metadata"),
    landsat8 = ui.import && ui.import("landsat8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    chibau_icon = ui.import && ui.import("chibau_icon", "image", {
      "id": "users/zipingyang0916/icon/chibau_icon"
    }) || ee.Image("users/zipingyang0916/icon/chibau_icon"),
    landsat7 = ui.import && ui.import("landsat7", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    landsat5 = ui.import && ui.import("landsat5", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    welcome_geometry = ui.import && ui.import("welcome_geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            136.08848115271405,
            35.2876929878714
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([136.08848115271405, 35.2876929878714]),
    waste_mask = ui.import && ui.import("waste_mask", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -110.31799172792417,
                40.91767395502699
              ],
              [
                -110.31799172792417,
                40.90625794637594
              ],
              [
                -110.30563210878354,
                40.90625794637594
              ],
              [
                -110.30563210878354,
                40.91767395502699
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-110.31799172792417, 40.91767395502699],
          [-110.31799172792417, 40.90625794637594],
          [-110.30563210878354, 40.90625794637594],
          [-110.30563210878354, 40.91767395502699]]], null, false),
    sentinel3 = ui.import && ui.import("sentinel3", "imageCollection", {
      "id": "COPERNICUS/S3/OLCI"
    }) || ee.ImageCollection("COPERNICUS/S3/OLCI"),
    smile_icon = ui.import && ui.import("smile_icon", "image", {
      "id": "users/zipingyang0916/icon/smile"
    }) || ee.Image("users/zipingyang0916/icon/smile"),
    cry_icon = ui.import && ui.import("cry_icon", "image", {
      "id": "users/zipingyang0916/icon/cry"
    }) || ee.Image("users/zipingyang0916/icon/cry"),
    compass_icon = ui.import && ui.import("compass_icon", "image", {
      "id": "users/zipingyang0916/icon/compass"
    }) || ee.Image("users/zipingyang0916/icon/compass"),
    landsat7R = ui.import && ui.import("landsat7R", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1"),
    landsat8R = ui.import && ui.import("landsat8R", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1"),
    sentinel2R = ui.import && ui.import("sentinel2R", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    landsat5R = ui.import && ui.import("landsat5R", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1"),
    nobita3 = ui.import && ui.import("nobita3", "image", {
      "id": "users/zipingyang0916/icon/nobita3"
    }) || ee.Image("users/zipingyang0916/icon/nobita3"),
    doraemon = ui.import && ui.import("doraemon", "image", {
      "id": "users/zipingyang0916/icon/doraemon_plane"
    }) || ee.Image("users/zipingyang0916/icon/doraemon_plane"),
    nobita = ui.import && ui.import("nobita", "image", {
      "id": "users/zipingyang0916/icon/nobita"
    }) || ee.Image("users/zipingyang0916/icon/nobita"),
    nobita2 = ui.import && ui.import("nobita2", "image", {
      "id": "users/zipingyang0916/icon/nobita2"
    }) || ee.Image("users/zipingyang0916/icon/nobita2");
var vis = {min:0,max:50,palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000'};
var lake_mask =  water_area.select('occurrence').updateMask(inland_water.select('total_obs')).gt(20);
var removeLayer = function(name) {
  var layers = map.layers();
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    map.remove(layer);
  }
};
var maskS2cloud = function(image){
  var qa = image.select('QA60'),
      cloudBitMask = 1<<10,
      cirrusBitMask = 1<<11,
      mask = qa.bitwiseAnd(cloudBitMask).eq(0)
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.divide(10000).copyProperties(image, image.propertyNames()); //.updateMask(mask)
};
var S2addFeature = function(image){
  var tss = image.expression(
    '1245*red*red/3.14159/3.14159+(666.1*red/3.14159)+0.4',
    {
      'red':image.select('B4')
    }
    ).rename('tss');
  var mndwi = image.normalizedDifference(['B2','B5']).rename('mndwi');
  return image.addBands(tss).addBands(mndwi)
              .select(['B4','B3','B2','tss','B8','mndwi'],['red','green','blue','tss','nir','mndwi'])
              .copyProperties(image, image.propertyNames());
};
ui.root.clear();
var map = ui.Map();
var show_image = function(){
    var geo = ee.Geometry.Rectangle(map.getBounds());
    var image = sentinel2.filterDate('2021-02-01','2021-02-15').filterBounds(geo)
                           .map(maskS2cloud).map(S2addFeature)
                           .median().select('tss').updateMask(lake_mask);
    var layer = ui.Map.Layer(image,vis,'sentinel');
    map.layers().set(0,layer);
};
var root_panel = ui.Panel(null,null,{stretch:'both'});
ui.root.widgets().set(0,root_panel);
var drawingtool = ui.Map.DrawingTools({
  linked:false
});
map.add(drawingtool);
map.centerObject(welcome_geometry,10);
map.setControlVisibility({
  all:false,
  layerList:false
});
var panel_map = ui.Panel({
  widgets:[map],
  style:{
    stretch:'both'
  },
  layout:'absolute'
})
var panel = ui.Panel({
  layout:'absolute',
  style:{
    height:'200px',
  }
})
root_panel.add(panel_map);
root_panel.add(panel);
var get_plane_up = function(p0){
  var x = ee.Number(p0.coordinates().get(0)),
  y = ee.Number(p0.coordinates().get(1)),
  p01 = ee.Geometry.Point([x.subtract(0.015),y.subtract(0.02)]),
  p11 = ee.Geometry.Point([x.add(0.015),y.subtract(0.02)]),
  p02 = ee.Geometry.Point([x.subtract(0.015),y.subtract(0.04)]),
  p12 = ee.Geometry.Point([x.add(0.015),y.subtract(0.04)]),
  p03 = ee.Geometry.Point([x.subtract(0.05),y.subtract(0.06)]),
  p13 = ee.Geometry.Point([x.add(0.05),y.subtract(0.06)]),
  p04 = ee.Geometry.Point([x.subtract(0.015),y.subtract(0.06)]),
  p14 = ee.Geometry.Point([x.add(0.015),y.subtract(0.06)]),
  p05 = ee.Geometry.Point([x.subtract(0.015),y.subtract(0.09)]),
  p15 = ee.Geometry.Point([x.add(0.015),y.subtract(0.09)]),
  p06 = ee.Geometry.Point([x.subtract(0.03),y.subtract(0.1)]),
  p16 = ee.Geometry.Point([x.add(0.03),y.subtract(0.1)]),
  plane = ee.Geometry.LinearRing([p0,p01,p02,p03,p04,p05,p06,p16,p15,p14,p13,p12,p11]);
  return plane;
};
var get_plane_down = function(p0){
  var x = ee.Number(p0.coordinates().get(0)),
  y = ee.Number(p0.coordinates().get(1)).subtract(0.1),
  p00 = ee.Geometry.Point([x,y]),
  p01 = ee.Geometry.Point([x.subtract(0.015),y.add(0.02)]),
  p11 = ee.Geometry.Point([x.add(0.015),y.add(0.02)]),
  p02 = ee.Geometry.Point([x.subtract(0.015),y.add(0.04)]),
  p12 = ee.Geometry.Point([x.add(0.015),y.add(0.04)]),
  p03 = ee.Geometry.Point([x.subtract(0.05),y.add(0.06)]),
  p13 = ee.Geometry.Point([x.add(0.05),y.add(0.06)]),
  p04 = ee.Geometry.Point([x.subtract(0.015),y.add(0.06)]),
  p14 = ee.Geometry.Point([x.add(0.015),y.add(0.06)]),
  p05 = ee.Geometry.Point([x.subtract(0.015),y.add(0.09)]),
  p15 = ee.Geometry.Point([x.add(0.015),y.add(0.09)]),
  p06 = ee.Geometry.Point([x.subtract(0.03),y.add(0.1)]),
  p16 = ee.Geometry.Point([x.add(0.03),y.add(0.1)]),
  plane = ee.Geometry.LinearRing([p00,p01,p02,p03,p04,p05,p06,p16,p15,p14,p13,p12,p11]);
  return plane;
};
var get_plane_right = function(p0){
  var x = ee.Number(p0.coordinates().get(0)).add(select_move_point_speed.getValue()),
  y = ee.Number(p0.coordinates().get(1)),
  p00 = ee.Geometry.Point([x,y]),
  p01 = ee.Geometry.Point([x.subtract(0.026),y.add(0.012)]),
  p11 = ee.Geometry.Point([x.subtract(0.026),y.subtract(0.012)]),
  p02 = ee.Geometry.Point([x.subtract(0.047),y.add(0.012)]),
  p12 = ee.Geometry.Point([x.subtract(0.047),y.subtract(0.012)]),
  p03 = ee.Geometry.Point([x.subtract(0.067),y.add(0.04)]),
  p13 = ee.Geometry.Point([x.subtract(0.067),y.subtract(0.04)]),
  p04 = ee.Geometry.Point([x.subtract(0.067),y.add(0.012)]),
  p14 = ee.Geometry.Point([x.subtract(0.067),y.subtract(0.012)]),
  p05 = ee.Geometry.Point([x.subtract(0.1),y.add(0.012)]),
  p15 = ee.Geometry.Point([x.subtract(0.1),y.subtract(0.012)]),
  p06 = ee.Geometry.Point([x.subtract(0.12),y.add(0.025)]),
  p16 = ee.Geometry.Point([x.subtract(0.12),y.subtract(0.025)]),
  plane = ee.Geometry.LinearRing([p00,p01,p02,p03,p04,p05,p06,p16,p15,p14,p13,p12,p11]);
  return plane;
};
var get_plane_left = function(p0){
  var x = ee.Number(p0.coordinates().get(0)).subtract(select_move_point_speed.getValue()),
  y = ee.Number(p0.coordinates().get(1)),
  p00 = ee.Geometry.Point([x,y]),
  p01 = ee.Geometry.Point([x.add(0.026),y.subtract(0.012)]),
  p11 = ee.Geometry.Point([x.add(0.026),y.add(0.012)]),
  p02 = ee.Geometry.Point([x.add(0.047),y.subtract(0.012)]),
  p12 = ee.Geometry.Point([x.add(0.047),y.add(0.012)]),
  p03 = ee.Geometry.Point([x.add(0.067),y.subtract(0.04)]),
  p13 = ee.Geometry.Point([x.add(0.067),y.add(0.04)]),
  p04 = ee.Geometry.Point([x.add(0.067),y.subtract(0.012)]),
  p14 = ee.Geometry.Point([x.add(0.067),y.add(0.012)]),
  p05 = ee.Geometry.Point([x.add(0.1),y.subtract(0.012)]),
  p15 = ee.Geometry.Point([x.add(0.1),y.add(0.012)]),
  p06 = ee.Geometry.Point([x.add(0.12),y.subtract(0.025)]),
  p16 = ee.Geometry.Point([x.add(0.12),y.add(0.025)]),
  plane = ee.Geometry.LinearRing([p00,p01,p02,p03,p04,p05,p06,p16,p15,p14,p13,p12,p11]);
  return plane;
};
var select_move_point_speed_item = [{label:'30m/click',value:0.0004},
                                    {label:'100m/click',value:0.0012},
                                    {label:'500m/click',value:0.006},
                                    {label:'1km/click',value:0.012},
                                    {label:'5km/click',value:0.06},
                                    {label:'10km/click',value:0.12},
                                    {label:'50km/click',value:0.6},
                                    {label:'100km/click',value:1.2}];
var select_move_point_speed = ui.Select({
  items:select_move_point_speed_item,
  value:select_move_point_speed_item[5],
  style:{
    position:'bottom-right',
    width:'75px',
    padding:'0px',
    margin:'0px 65px 10px 0px'
  }
});
var button_move_point_up = ui.Button({
  label:'⇧  ',
  disabled:true,
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'10px 0px 0px 60px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    show_image();
    var move_distance = select_move_point_speed.getValue();
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)),
        y = ee.Number(p.coordinates().get(1)).add(move_distance),
        p2 = ee.Geometry.Point([x,y]),
        plane = get_plane_up(p2);
    p2.evaluate(function(geo){
      var layer_point = ui.Map.GeometryLayer([geo],'p','black',false);
      drawingtool.layers().set(0,layer_point);
    });
    plane.evaluate(function(geo){
      var layer_plane = ui.Map.GeometryLayer([geo],'p','black');
      drawingtool.layers().set(1,layer_plane);
    });    
    map.centerObject(plane,slider_zoom.getValue());
  }
});
var button_move_point_right = ui.Button({
  label:'⇨',
  disabled:true,
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'50px 0px 0px 110px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = select_move_point_speed.getValue();
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)).add(move_distance),
        y = ee.Number(p.coordinates().get(1)),
        p2 = ee.Geometry.Point([x,y]),
        plane = get_plane_right(p2);
    p2.evaluate(function(geo){
      var layer_point = ui.Map.GeometryLayer([geo],'p','black',false);
      drawingtool.layers().set(0,layer_point);
    });
    plane.evaluate(function(geo){
      var layer_plane = ui.Map.GeometryLayer([geo],'p','black');
      drawingtool.layers().set(1,layer_plane);
    });    
    map.centerObject(plane,slider_zoom.getValue());
    show_image();
  }
});
var button_move_point_down = ui.Button({
  label:'⇩',
  disabled:true,
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'90px 0px 0px 60px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = select_move_point_speed.getValue();
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)),
        y = ee.Number(p.coordinates().get(1)).subtract(move_distance),
        p2 = ee.Geometry.Point([x,y]),
        plane = get_plane_down(p2);
    p2.evaluate(function(geo){
      var layer_point = ui.Map.GeometryLayer([geo],'p','black',false);
      drawingtool.layers().set(0,layer_point);
    });
    plane.evaluate(function(geo){
      var layer_plane = ui.Map.GeometryLayer([geo],'p','black');
      drawingtool.layers().set(1,layer_plane);
    });    
    map.centerObject(plane,slider_zoom.getValue());
    show_image();
  }
});
var button_move_point_left = ui.Button({
  label:'⇦',
  disabled:true,
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'50px 0px 0px 10px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = select_move_point_speed.getValue();
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)).subtract(move_distance),
        y = ee.Number(p.coordinates().get(1)),
        p2 = ee.Geometry.Point([x,y]),
        plane = get_plane_left(p2);
    p2.evaluate(function(geo){
      var layer_point = ui.Map.GeometryLayer([geo],'p','black',false);
      drawingtool.layers().set(0,layer_point);
    });
    plane.evaluate(function(geo){
      var layer_plane = ui.Map.GeometryLayer([geo],'p','black');
      drawingtool.layers().set(1,layer_plane);
    });    
    map.centerObject(plane,slider_zoom.getValue());
    show_image();
  }
});
var points = ee.Number(0);
var button_option = ui.Button({
  label:'restart',
  disabled:true,
  style:{
    position:'top-center',
    width:'60px',
    padding:'0px',
    margin:'140px 0px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    removeLayer('clean');
    points = 0;
    // panel_map.widgets().set(0,map);
    panel.widgets().set(6,button_A);
    map.widgets().set(0,remain_10);
    var set_restart_center = function(){
      var p = drawingtool.layers().get(0).toGeometry();
      map.centerObject(p,slider_zoom.getValue());
    }
    ui.util.setTimeout(set_restart_center,100);
  }
});
var remain_0 = ui.Label({
  value:'* * 残弾0発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_1 = ui.Label({
  value:'* * 残弾1発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_2 = ui.Label({
  value:'* * 残弾2発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_3 = ui.Label({
  value:'* * 残弾3発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_4 = ui.Label({
  value:'* * 残弾4発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_5 = ui.Label({
  value:'* * 残弾5発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_6 = ui.Label({
  value:'* * 残弾6発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_7 = ui.Label({
  value:'* * 残弾7発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_8 = ui.Label({
  value:'* * 残弾8発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_9 = ui.Label({
  value:'* * 残弾9発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var remain_10 = ui.Label({
  value:'* * 残弾10発 * *',
  style:{
    position:'top-center',
    margin:'-10px'
  }
})
var get_point = function(points){
  points = ee.Number(points)
  var plus = ee.Image(map.layers().get(0).getEeObject()).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:map.getCenter().buffer(10000),
      scale:100
    }).get('tss')
    var pt = points.add(ee.Number(plus).divide(100000).ceil());
    return pt
}
var button_A = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(1,clean_layer);
    points = get_point(points)
    panel.widgets().set(6,button_A_1);
    map.widgets().set(0,remain_9);
  }
});
var button_A_1 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(2,clean_layer);
    panel.widgets().set(6,button_A_2);
    points = get_point(points);
    map.widgets().set(0,remain_8);
  }
});
var button_A_2 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(3,clean_layer);
    panel.widgets().set(6,button_A_3);
    points = get_point(points);
    map.widgets().set(0,remain_7);
  }
});
var button_A_3 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(4,clean_layer);
    panel.widgets().set(6,button_A_4);
    points = get_point(points);
    map.widgets().set(0,remain_6);
  }
});
var button_A_4 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(5,clean_layer);
    panel.widgets().set(6,button_A_5);
    points = get_point(points);
    map.widgets().set(0,remain_5);
  }
});
var button_A_5 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(6,clean_layer);
    panel.widgets().set(6,button_A_6);
    points = get_point(points);
    map.widgets().set(0,remain_4);
  }
});
var button_A_6 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(7,clean_layer);
    panel.widgets().set(6,button_A_7);
    points = get_point(points);
    map.widgets().set(0,remain_3);
  }
});
var button_A_7 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(8,clean_layer);
    panel.widgets().set(6,button_A_8);
    points = get_point(points);
    map.widgets().set(0,remain_2);
  }
});
var button_A_8 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(9,clean_layer);
    panel.widgets().set(6,button_A_9);
    points = get_point(points);
    map.widgets().set(0,remain_1);
  }
});
var button_A_9 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    var clean_image = ee.Image(0).updateMask(lake_mask).clip(map.getCenter().buffer(10000)),
        clean_layer = ui.Map.Layer(clean_image,vis,'clean');
    map.layers().set(10,clean_layer);
    points = get_point(points);
    map.widgets().set(0,remain_0);
    button_option.setDisabled(true);
    button_move_point_left.setDisabled(true);
    button_move_point_right.setDisabled(true);
    button_move_point_up.setDisabled(true);
    button_move_point_down.setDisabled(true);
    var set_panel_result = function(){
      panel_map.widgets().set(0,panel_result);
      panel.widgets().set(6,button_A);
      var label_result = ui.Label({
        value:'おめでとうございます、\nあなたの合計スコアは: '+points.getInfo()+'\nもう一度やりますか\n-->press \"A\"<--',
        style:{
          position:'bottom-center',
          width:'90%',
          textAlign:'center',
          margin:'90px 0 0 0',
          border:'1px solid green',
          whiteSpace:'pre'
        }
      });
      var nobita_2 = ui.Thumbnail({
        image:nobita2.visualize({min:0,max:255,bands:['b1','b2','b3']}),
        params:{
          dimnesions:'500x500',
          format:'png'
        },
        style:{
          // height:'80%',
          width:'50%',
          padding:'0px',
          margin:'0px 0px 120px 0px',
          position:'bottom-center'
        }
      });
      panel_result.add(nobita_2);
      panel_result.add(label_result);
      panel.widgets().set(6,button_A_restart);
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      removeLayer('clean');
      };
    ui.util.setTimeout(set_panel_result,1000);
  }
});
var button_A_restart = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    points = 0;
    panel_map.widgets().set(0,map);
    panel.widgets().set(6,button_A);
    map.widgets().set(0,remain_10);
    button_option.setDisabled(false);
    button_move_point_left.setDisabled(false);
    button_move_point_right.setDisabled(false);
    button_move_point_up.setDisabled(false);
    button_move_point_down.setDisabled(false);
    var set_restart_center = function(){
      var p = drawingtool.layers().get(0).toGeometry();
      map.centerObject(p,slider_zoom.getValue());
    }
    ui.util.setTimeout(set_restart_center,100);
  }
});
var panel_result  = ui.Panel({
  layout:'absolute'
})
var button_B = ui.Button({
  label:'B',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'80px 80px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
});
var slider_zoom = ui.Slider({
  min:8,
  max:14,
  step:1,
  value:10,
  direction:'vertical',
  onChange:function(zoom){
    map.setZoom(zoom);
  },
  style:{
    position:'bottom-right',
    margin:'0px 20px 0px 0px'
  }
});
panel.widgets().set(0,button_move_point_up);
panel.widgets().set(1,button_move_point_right);
panel.widgets().set(2,button_move_point_down);
panel.widgets().set(3,button_move_point_left);
panel.widgets().set(4,button_option);
panel.widgets().set(5,slider_zoom);
panel.widgets().set(6,button_A);
panel.widgets().set(7,button_B);
panel.widgets().set(8,select_move_point_speed);
var p0 = welcome_geometry,
    layer_0 = ui.Map.GeometryLayer({
      geometries:[p0],
      name:'point_0',
      color:'red',
      shown:false,
      locked:false
    });
drawingtool.layers().set(0,layer_0);
var plane = get_plane_up(p0);
plane.evaluate(function(geo){
  var layer_plane = ui.Map.GeometryLayer([geo],'p','black');
  drawingtool.layers().set(1,layer_plane);
});
//story_0
//create story panel
//create image icon
//create label
//create button a
//create button b
var panel_story_0 = ui.Panel({
  layout:'absolute'
});
var nobita_3 = ui.Thumbnail({
  image:nobita3.visualize({min:0,max:255,bands:['b1','b2','b3']}),
  params:{
    dimnesions:'500x400',
    format:'png'
  },
  style:{
    // height:'80%',
    width:'90%',
    padding:'0px',
    margin:'0 0',
    position:'bottom-center'
  }
});
var panel_story_0_label_0 = ui.Label({
  value:'ヤバい、ドラえもん、エイリアンが侵入し、\n世界の水が汚染された!!!\n-->press \"A\"<--',
  style:{
    position:'bottom-center',
    width:'90%',
    textAlign:'center',
    margin:'90px 0 0 0',
    border:'1px solid green',
    whiteSpace:'pre'
  }
});
var button_B_back_to_0 = ui.Button({
  label:'B',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'80px 80px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel_map.widgets().set(0,panel_story_0);
    panel.widgets().set(6,button_A_story_0);
    panel.widgets().set(7,button_B);
  }
});
var button_A_story_0 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel_map.widgets().set(0,panel_story_1);
    panel.widgets().set(6,button_A_story_1);
    panel.widgets().set(7,button_B_back_to_0);
  }
});
panel_story_0.add(nobita_3);
panel_story_0.add(panel_story_0_label_0);
panel.widgets().set(6,button_A_story_0);
panel_map.widgets().set(0,panel_story_0);
//story_1
var panel_story_1 = ui.Panel({
  layout:'absolute'
});
var doraemon_plane = ui.Thumbnail({
  image:doraemon.visualize({min:0,max:255,bands:['b1','b2','b3']}),
  params:{
    dimnesions:'500x500',
    format:'png'
  },
  style:{
    // height:'80%',
    width:'90%',
    padding:'0px',
    margin:'200px 0px 0px 0px',
    position:'bottom-center'
  }
});
var panel_story_1_label_0 = ui.Label({
  value:'心配しないでください、\nこれは環境を保護する紙飛行機です\n-->press \"A\"<--',
  style:{
    position:'bottom-center',
    width:'90%',
    textAlign:'center',
    margin:'90px 0 0 0',
    border:'1px solid green',
    whiteSpace:'pre'
  }
});
var button_A_story_1 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel_map.widgets().set(0,panel_story_2);
    panel.widgets().set(6,button_A_story_2);
    panel.widgets().set(7,button_B_back_to_1);
  }
});
var button_B_back_to_1 = ui.Button({
  label:'B',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'80px 80px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel_map.widgets().set(0,panel_story_1);
    panel.widgets().set(6,button_A_story_1);
    panel.widgets().set(7,button_B_back_to_0);
  }
});
panel_story_1.add(doraemon_plane);
panel_story_1.add(panel_story_1_label_0);
//story_2
var panel_story_2 = ui.Panel({
  layout:'absolute'
});
var nobita_1 = ui.Thumbnail({
  image:nobita.visualize({min:0,max:255,bands:['b1','b2','b3']}),
  params:{
    dimnesions:'500x500',
    format:'png'
  },
  style:{
    // height:'80%',
    width:'90%',
    padding:'0px',
    margin:'200px 0px 0px 0px',
    position:'bottom-center'
  }
});
var panel_story_2_label_0 = ui.Label({
  value:'一緒に環境を守り、\nエイリアンを追い出そう\n-->press \"A\"<--',
  style:{
    position:'bottom-center',
    width:'90%',
    textAlign:'center',
    margin:'90px 0 0 0',
    border:'1px solid green',
    whiteSpace:'pre'
  }
});
var button_A_story_2 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel_map.widgets().set(0,panel_story_3);
    panel.widgets().set(6,button_A_story_3);
    panel.widgets().set(7,button_B_back_to_2);
  }
});
var button_B_back_to_2 = ui.Button({
  label:'B',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'80px 80px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel_map.widgets().set(0,panel_story_2);
    panel.widgets().set(6,button_A_story_2);
    panel.widgets().set(7,button_B_back_to_1);
  }
});
panel_story_2.add(nobita_1);
panel_story_2.add(panel_story_2_label_0);
//story 3
var panel_story_3 = ui.Panel({
  layout:'absolute'
});
var panel_story_3_label_0 = ui.Label({
  value:'\"A\"を押して水クリーナーを落とします、\n1ラウンドあたり10発の弾薬\n赤は水質が悪いことを意味し、\n青は水質が良いことを意味します\n-->press \"A\"<--',
  style:{
    position:'bottom-center',
    width:'90%',
    textAlign:'center',
    margin:'90px 0 0 0',
    border:'1px solid green',
    whiteSpace:'pre'
  }
});
var button_A_story_3 = ui.Button({
  label:'A',
  style:{
    position:'top-right',
    width:'60px',
    padding:'0px',
    margin:'20px 10px 0px 0px',
    textAlign:'center',
    backgroundColor:'f7f7f7',
    shown:true
  },
  onClick:function(){
    panel.widgets().set(6,button_A);
    panel.widgets().set(7,button_B);
    panel_map.widgets().set(0,map);
    show_image();
    map.widgets().set(0,remain_10);
    button_move_point_left.setDisabled(false);
    button_move_point_right.setDisabled(false);
    button_move_point_up.setDisabled(false);
    button_move_point_down.setDisabled(false);
    button_option.setDisabled(false);
  }
});
panel_story_3.add(panel_story_3_label_0);