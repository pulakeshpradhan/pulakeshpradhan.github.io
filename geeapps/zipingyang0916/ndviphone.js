var sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
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
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-110.31799172792417, 40.91767395502699],
          [-110.31799172792417, 40.90625794637594],
          [-110.30563210878354, 40.90625794637594],
          [-110.30563210878354, 40.91767395502699]]], null, false),
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
    modis9 = ui.import && ui.import("modis9", "imageCollection", {
      "id": "MODIS/006/MOD09GA"
    }) || ee.ImageCollection("MODIS/006/MOD09GA"),
    welcome_geometry = ui.import && ui.import("welcome_geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            138.73018296627112,
            35.371869489722805
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([138.73018296627112, 35.371869489722805]);
var Text = {
  draw: function (text, pos, scale, props) {
    text = ee.String(text);
    var ascii = {};
    for (var i = 32; i < 128; i++) {
        ascii[String.fromCharCode(i)] = i;
    }
    ascii = ee.Dictionary(ascii);
    var fontSize = '16';
    if(props && props.fontSize) {
      fontSize = props.fontSize;
    }
    var glyphs = ee.Image('users/gena/fonts/Arial' + fontSize);
    var proj = glyphs.projection();
    glyphs = glyphs.changeProj(proj, proj.scale(1, -1));
    // get font info
    var font = {
      height: ee.Number(glyphs.get('height')),
      width: ee.Number(glyphs.get('width')),
      cellHeight: ee.Number(glyphs.get('cell_height')),
      cellWidth: ee.Number(glyphs.get('cell_width')),
      charWidths: ee.String(glyphs.get('char_widths')).split(',').map(ee.Number.parse),
    };
    font.columns = font.width.divide(font.cellWidth);
    font.rows = font.height.divide(font.cellHeight);
    function toAscii(text) {
      return ee.List(text.split('').slice(1)
        .iterate(function(char, prev) { return ee.List(prev).add(ascii.get(char)); }, ee.List([])));
    }
    function moveChar(image, xmin, xmax, ymin, ymax, x, y) {
      var ll = ee.Image.pixelLonLat();
      var nxy = ll.floor().round().changeProj(ll.projection(), image.projection());
      var nx = nxy.select(0);
      var ny = nxy.select(1);
      var mask = nx.gte(xmin).and(nx.lt(xmax)).and(ny.gte(ymin)).and(ny.lt(ymax));
      return image.mask(mask).translate(ee.Number(xmin).multiply(-1).add(x), ee.Number(ymin).multiply(-1).subtract(y));
    }
    var codes = toAscii(text);
    // compute width for every char
    var charWidths = codes.map(function(code) { return ee.Number(font.charWidths.get(ee.Number(code))); });
    // compute xpos for every char
    var charX = ee.List(charWidths.iterate(function(w, list) { 
      list = ee.List(list);
      var lastX = ee.Number(list.get(-1));
      var x = lastX.add(w);
      return list.add(x);
    }, ee.List([0]))).slice(0, -1);
    var charPositions = charX.zip(ee.List.sequence(0, charX.size()));
    // compute char glyph positions
    var charGlyphPositions = codes.map(function(code) {
      code = ee.Number(code).subtract(32); // subtract start star (32)
      var y = code.divide(font.columns).floor().multiply(font.cellHeight);
      var x = code.mod(font.columns).multiply(font.cellWidth);
      return [x, y];
    });
    var charGlyphInfo = charGlyphPositions.zip(charWidths).zip(charPositions);
    pos = ee.Geometry(pos).transform(proj).coordinates();
    var xpos = ee.Number(pos.get(0));
    var ypos = ee.Number(pos.get(1));
    // 'look-up' and draw char glyphs
    var textImage = ee.ImageCollection(charGlyphInfo.map(function(o) {
      o = ee.List(o);
      var glyphInfo = ee.List(o.get(0));
      var gw = ee.Number(glyphInfo.get(1));
      var glyphPosition = ee.List(glyphInfo.get(0));
      var gx = ee.Number(glyphPosition.get(0));
      var gy = ee.Number(glyphPosition.get(1));
      var charPositions = ee.List(o.get(1));
      var x = ee.Number(charPositions.get(0));
      var i = ee.Number(charPositions.get(1));
      var glyph = moveChar(glyphs, gx, gx.add(gw), gy, gy.add(font.cellHeight), x, 0, proj);
      return glyph.changeProj(proj, proj.translate(xpos, ypos).scale(scale, scale));
    })).mosaic();
    textImage = textImage.mask(textImage);
    if(props) {
      props = { 
        textColor: props.textColor || 'ffffff', 
        outlineColor: props.outlineColor || '000000', 
        outlineWidth: props.outlineWidth || 0, 
        textOpacity: props.textOpacity || 0.9,
        textWidth: props.textWidth || 1, 
        outlineOpacity: props.outlineOpacity || 0.4 
      };
      var textLine = textImage
        .visualize({opacity:props.textOpacity, palette: [props.textColor], forceRgbOutput:true});
      if(props.textWidth > 1) {
        textLine.focal_max(props.textWidth);
      }
      if(!props || (props && !props.outlineWidth)) {
        return textLine;
      }
      var textOutline = textImage.focal_max(props.outlineWidth)
        .visualize({opacity:props.outlineOpacity, palette: [props.outlineColor], forceRgbOutput:true});
      return ee.ImageCollection.fromImages(ee.List([textOutline, textLine])).mosaic();
    } else {
      return textImage;
    }
  }
};
var get_legend = function(){
  var legend_panel = ui.Panel({
    style:{
      position:'bottom-left',
      height : '200px',
      width : '90px',
      shown:false
    },
    layout:'absolute'
  });
  var legendTitle = ui.Label({
    value: 'NDVI',
    style: {
      fontWeight: 'bold',
      width:'60px',
      fontSize: '14px',
      margin: '-18px 0px 0px 0px',
      position:'top-left'
    }
  });
  legend_panel.add(legendTitle);
  var lon = ee.Image.pixelLonLat().select('latitude'),
      gradient = lon.multiply(ee.Number(0.01)).add(0),//((max-min)/100) + min
      legendImage = gradient.visualize(vis);
  var thumbnail = ui.Thumbnail({
    image: legendImage,
    params: {
      bbox:'0,0,10,100', 
      dimensions:'20x150'
    },
    style: {
      padding: '1px', 
      position: 'bottom-left'}
  });
  legend_panel.add(thumbnail);
  var label1 = ui.Label({
    value:'1',
    style:{
      position:'top-left',
      width:'30px',
      padding:'0px',
      margin:'15px 0px 0px 40px'
    }
  });
  var label2 = ui.Label({
    value:'0.8',
    style:{
      position:'top-left',
      width:'30px',
      padding:'0px',
      margin:'44px 0px 0px 40px'
    }
  });
  var label3 = ui.Label({
    value:'0.6',
    style:{
      position:'top-left',
      width:'30px',
      padding:'0px',
      margin:'73px 0px 0px 40px'
    }
  });
  var label4 = ui.Label({
    value:'0.4',
    style:{
      position:'top-left',
      width:'30px',
      padding:'0px',
      margin:'102px 0px 0px 40px'
    }
  });
  var label5 = ui.Label({
    value:'0.2',
    style:{
      position:'top-left',
      width:'30px',
      padding:'0px',
      margin:'131px 0px 0px 40px'
    }
  });
  var label6 = ui.Label({
    value:'<0',
    style:{
      position:'top-left',
      width:'20px',
      padding:'0px',
      margin:'160px 0px 0px 40px',
      textAlign:'left'
    }
  });
  legend_panel.add(label1);
  legend_panel.add(label2);
  legend_panel.add(label3);
  legend_panel.add(label4);
  legend_panel.add(label5);
  legend_panel.add(label6);
  return legend_panel;
};
var get_image = function(date,geometry,collection){
  var image = ee.Algorithms.If({
    condition:collection == landsat5,
    trueCase:landsat5.filterDate(date.advance(-8,'day'),date.advance(8,'day')).filterBounds(geometry)
                     .map(maskL578cloud).map(L57addFeature)
                     .median(),
    falseCase:ee.Algorithms.If({
      condition:collection == landsat7,
      trueCase:landsat7.filterDate(date.advance(-8,'day'),date.advance(8,'day')).filterBounds(geometry)
                       .map(maskL578cloud).map(L57addFeature)
                       .median(),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat8,
        trueCase:landsat8.filterDate(date.advance(-8,'day'),date.advance(8,'day')).filterBounds(geometry)
                         .map(maskL578cloud).map(L8addFeature)
                         .median(),
        falseCase:ee.Algorithms.If({
          condition:collection == modis9,
          trueCase:modis9.filterDate(date,date.advance(1,'day')).filterBounds(geometry)
                  .map(maskM9cloud).map(M9addFeature)
                  .median(),
          falseCase:sentinel2.filterDate(date.advance(-3,'day'),date.advance(2,'day')).filterBounds(geometry)
                             .map(maskS2cloud).map(S2addFeature)
                             .median()
        })
      })
    })
  });
  return image;
};
var maskL578cloud = function(image) {
  return image.divide(10000).copyProperties(image, image.propertyNames()); 
};
var maskM9cloud = function(image) {
  return image.divide(10000).copyProperties(image, image.propertyNames()); 
};
var maskS2cloud = function(image){
  return image.divide(10000).copyProperties(image, image.propertyNames());
};
var L57addFeature = function(image){
  var ndvi = image.normalizedDifference(['B4','B3']).rename('ndvi');
  return image.addBands(ndvi)
              .select(['B3','B2','B1','ndvi'],['red','green','blue','ndvi'])
              .copyProperties(image, image.propertyNames());
};
var L8addFeature = function(image){
  var ndvi = image.normalizedDifference(['B5','B4']).rename('ndvi');
  return image.addBands(ndvi)
              .select(['B4','B3','B2','ndvi'],['red','green','blue','ndvi'])
              .copyProperties(image, image.propertyNames()) ;
};
var M9addFeature = function(image){
  var ndvi = image.normalizedDifference(['sur_refl_b02','sur_refl_b01']).rename('ndvi');
  return image.addBands(ndvi)
              .select(['sur_refl_b01','sur_refl_b04','sur_refl_b03','ndvi'],['red','green','blue','ndvi'])
              .copyProperties(image, image.propertyNames()) ;
};
var S2addFeature = function(image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('ndvi');
  return image.addBands(ndvi)
              .select(['B4','B3','B2','ndvi'],['red','green','blue','ndvi'])
              .copyProperties(image, image.propertyNames());
};
var vis = {min:0,max:1,palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000'},
    vis_rgb = {min:0,max:0.3,band:['red','green','blue']},
    font_size = '16px',
    legend = get_legend(),
    b_color = 'f1f1f1',
    t_border = '1px solid black';
ui.root.clear();
var root_panel = ui.Panel(null,null,{stretch:'both'});
ui.root.widgets().set(0,root_panel);
var map = ui.Map();
var drawingtool = ui.Map.DrawingTools({
  linked:false
});
map.add(drawingtool);
map.centerObject(welcome_geometry,8);
map.setControlVisibility({
  fullscreenControl:false,
  mapTypeControl:false
});
//tool bar up the map
var tool_bar = ui.Panel({
  style:{
    height:'55px',
    backgroundColor:b_color
  },
  layout:'absolute'
});
var left_panel = ui.Panel({
  widgets:[tool_bar,map],
  style:{
    stretch:'both'
  }
});
root_panel.widgets().set(0,left_panel);
//panel for control
var panel = ui.Panel({
  style:{
    width:'380px',
  },
  layout:'absolute'
});
ui.root.widgets().set(1,panel);
/*
design for tool bar
*/
//tool bar 0 button show view
var button_hide_panel = ui.Button({
  label:"コントロールパネルを隠す",
  style:{
    position:'top-left',
    width:'150px',
    height:'25px',
    padding:'0px',
    border:t_border,
    margin:'0px 0px 0px 0px'
  },
  onClick:function(){
    var cat = panel.style().get('shown');
    if(cat === true){
      button_hide_panel.setLabel('コントロールパネルを表示');
    }else{
      button_hide_panel.setLabel('コントロールパネルを隠す');
    }
    panel.style().set('shown',!cat);
  }
});
tool_bar.widgets().set(0,button_hide_panel);
//tool bar 1 clear map
// var button_clear_map = ui.Button({
//   label:'衛星マップを消す',
//   style:{
//     position:'top-left',
//     padding:'0px',
//     width:'130px',
//     height:'25px',
//     margin:'0px 0px 0px 160px',
//     border:t_border,
//     textAlign:'center'
//   },
//   onClick:function(){
//     map.remove(map.layers().get(0));
//     map.remove(map.layers().get(0));
//     legend.style().set('shown',false);
//     panel_check.style().set('shown',false);
//     label_no_image.style().set('shown',false);
//     label_no_good_image.style().set('shown',false);
//   }
// });
var map2 = ui.Map();
map2.style().set('shown',false);
map2.setControlVisibility({
  // all:false,
  fullscreenControl:false,
  mapTypeControl:false
});
var linker = ui.Map.Linker([map,map2]);
var split = ui.SplitPanel({
  firstPanel:map,
  secondPanel:map2,
  orientation:'horizontal',
  wipe:true,
  style:{
            stretch:'both',
            position:'top-left'
          }
});
var button_split_panel = ui.Button({
  label:'パネル分割',
  style:{
    position:'top-left',
    padding:'0px',
    width:'130px',
    height:'25px',
    margin:'0px 0px 0px 160px',
    border:t_border,
    textAlign:'center'
  },
  onClick:function(){
    var cat = map2.style().get('shown');
    if(cat){
      left_panel.widgets().set(1,map);
      button_split_panel.setLabel('パネル分割');
    }else{
      left_panel.widgets().set(1,split);
      button_split_panel.setLabel('パネルマージ');
    }
    map2.style().set('shown',!cat);
  }
});
tool_bar.widgets().set(1,button_split_panel);
//tool bar 2，3，4 set coordiantes for center
var text_x = ui.Textbox({
  placeholder:'経度',
  style:{
    position:'top-left',
    padding:'0px',
    width:'100px',
    margin:'0px 0px 0px 315px',
    shown:false
  }
});
var text_y = ui.Textbox({
  placeholder:'緯度',
  style:{
    position:'top-left',
    padding:'0px',
    width:'100px',
    margin:'0px 0px 0px 425px',
    shown:false
  }
});
var button_set_coord = ui.Button({
  label:'⇦ 森林位置を設定',
  style:{
    position:'top-left',
    padding:'0px',
    width:'105px',
    margin:'-3px 0px 0px 530px',
    shown:false
  },
  onClick:function(){
    var x = parseFloat(text_x.getValue()),
        y = parseFloat(text_y.getValue());
    map.setCenter(x,y,10);
  }
});
tool_bar.widgets().set(2,text_x);
tool_bar.widgets().set(3,text_y);
tool_bar.widgets().set(4,button_set_coord);
/******************************************************************************************************
design function panel for water
*/
/*
level1 chiba icon and lab
*/
//change-2
// var icon_chiba = ui.Thumbnail({
//   image:chibau_icon.visualize({min:0,max:255,bands:['b1','b2','b3']}),
//   params:{
//     dimnesions:'420x420',
//     format:'png'
//   },
//   style:{
//     height:'120px',
//     width:'120px',
//     padding:'0px',
//     margin:'-20px 0px 0px 0px',
//     position:'top-left'
//   }
// });
var icon_chiba = ui.Button({
  label:"パネルを隠す",
  style:{
    position:'top-left',
    width:'120px',
    // height:'120px',
    padding:'0px',
    // border:t_border,
    margin:'30px 0px'
  },
  onClick:function(){
    var cat = panel.style().get('shown');
    if(cat === true){
      button_hide_panel.setLabel('パネルを表示');
    }else{
      button_hide_panel.setLabel('パネルを隠す');
    }
    panel.style().set('shown',!cat);
  }
});
//change-3
var yang_lab = ui.Label({
  value:'千葉大学\n環境リモートセンシング\n研究センター    楊研究室',
  style:{
    fontSize:'16px',
    fontFamily:'serif',//monospace Times New Roman
    position:'top-left',
    padding:'0px',
    margin:'0px 125px',
    whiteSpace:'pre'
  }
});
var panel_level_icon = ui.Panel({
  style:{
    position:'top-left',
    padding:'0px',
    width:'350px',
    height:'130px',
    margin:'-10px 0px 0px -10px'
  },
  layout:'absolute'
});
panel.widgets().set(0,panel_level_icon);
var label_contact_us = ui.Label({
  value:'お問い合わせ',
  style:{
    fontSize:'16px',
    fontFamily:'serif',
    position:'top-left',
    padding:'0px',
    margin:'-5px 0px 0px 210px',
    shown:false
  },
  targetUrl:'https://yangweilab.github.io/homepage/index.html'
});
var panel_level_icon_divide = ui.Label({
  value:'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 0px'
  }
});
panel_level_icon.widgets().set(0,icon_chiba);
panel_level_icon.widgets().set(1,yang_lab);
panel_level_icon.widgets().set(2,label_contact_us);
panel_level_icon.widgets().set(3,panel_level_icon_divide);
/*
level2-0
select famous lake\satellit\date
*/
var panel_select = ui.Panel({
  style:{
    position:'top-left',
    padding:'0px',
    width:'350px',
    height:'210px',
    margin:'100px 0px 0px 0px'
  },
  layout:'absolute'
});
panel.widgets().set(1,panel_select);
//select famous lake
var label_select_forest = ui.Label({
  value:'森林を選ぶ:',
  style:{
    position:'top-left',
    fontSize:font_size,
    fontWeight:'bold',
    padding:'0px',
    margin:'0px 10px 0px 0px'
  }
});
var amazon = ee.Geometry.Point([-65.0715681083693,-5.134864634870261]);
var malay = ee.Geometry.Point([101.77323484858152,1.835015829259835]);
var fujisan = ee.Geometry.Point([138.73018296627112,35.371869489722805]);
var taihang = ee.Geometry.Point([113.63701221811273,36.92352410049767]);
var qinling = ee.Geometry.Point([108.9012627961189,33.5489138510627]);
var alps = ee.Geometry.Point([7.9720591622806225,46.4559315345027]);
var mongo = ee.Geometry.Point([107.35236666046978,49.41156075846132]);
var tibet = ee.Geometry.Point([92.90951231461673,32.72417824517759]);
var select_forest_item = [{label:'富士山',value:fujisan},
                        {label:'アマゾン（熱帯雨林）',value:amazon},
                        {label:'マレー（熱帯雨林）',value:malay},
                        {label:'太行山（山脈）',value:taihang},
                        {label:'秦岭（山脈）',value:qinling},
                        {label:'アルプス（山脈）',value:alps},
                        {label:'モンゴル（草原）',value:mongo},
                        {label:'青海-チベット（高原）',value:tibet},
                        ];
var select_forest = ui.Select({
  items:select_forest_item,
  value:select_forest_item[0].value,
  style:{
    position:'top-left',
    padding:'0px',
    margin:'-5px 0px 0px 110px',
    width:'210px'
  },
  onChange:function(geom){
    if(geom == amazon){
      map.centerObject(geom,7);
    }else{
      map.centerObject(geom,7);
    }
  }
});
//select satellite
var label_select_satellite = ui.Label({
  value:'衛星を選ぶ:',
  style:{
    position:'top-left',
    fontSize:font_size,
    fontWeight :'bold',
    padding:'0px',
    margin:'45px 0px 0px 0px',
  }
});
var select_satellite_item = [{label:'Landsat-5 (1985-2011年)',value:landsat5},
         {label:'Landsat-7 (2001-2021年)',value:landsat7},
         {label:'Landsat-8 (2015-2021年)',value:landsat8},
         {label:'MODIS (2001-2021年)',value:modis9},
         {label:'Sentinel-2 (2018-2021年)',value:sentinel2}];
var select_satellite = ui.Select({
  items:select_satellite_item,
  value:select_satellite_item[4].value,
  style:{
    width:'210px',
    padding:'0px',
    margin:'40px 0px 0px 110px',
    position:'top-left'
  },
  onChange:function(name){
    if(name == landsat5){
      panel_select.widgets().set(5,dateslider5);
      panel_4_0.widgets().set(4,select_gif_year5);
      panel_4_0.widgets().set(8,select_gif_year5_oneyear);
      panel_4_1.widgets().set(3,select_plot_year5);
    }else if(name == landsat7){
      panel_select.widgets().set(5,dateslider7);
      panel_4_0.widgets().set(4,select_gif_year7);
      panel_4_0.widgets().set(8,select_gif_year7_oneyear);
      panel_4_1.widgets().set(3,select_plot_year7);
    }else if(name == landsat8){
      panel_select.widgets().set(5,dateslider8);
      panel_4_0.widgets().set(4,select_gif_year8);
      panel_4_0.widgets().set(8,select_gif_year8_oneyear);
      panel_4_1.widgets().set(3,select_plot_year8);
    }else if(name == modis9){
      panel_select.widgets().set(5,dateslider9);
      panel_4_0.widgets().set(4,select_gif_year9);
      panel_4_0.widgets().set(8,select_gif_year9_oneyear);
      panel_4_1.widgets().set(3,select_plot_year9);
    }else{
      panel_select.widgets().set(5,dateslider2);
      panel_4_0.widgets().set(4,select_gif_year2);
      panel_4_0.widgets().set(8,select_gif_year2_oneyear);
      panel_4_1.widgets().set(3,select_plot_year2);
    }
  }
});
//select date
var label_slide_date = ui.Label({
  value:'日付を選ぶ:',
  style:{
    fontSize:font_size,
    fontWeight :'bold',
    padding:'0px',
    margin:'90px 0px 0px 0px',
    position:'top-left'
  }
});
var dateslider5 = ui.DateSlider({
  start:'1985-01-01',
  end:'2011-12-31',
  value:'2010-01-01',
  period:1,
  style:{
    width:'210px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 110px'
  }
});
var dateslider7 = ui.DateSlider({
  start:'2001-01-01',
  end:'2021-04-10',
  value:'2019-01-01',
  period:1,
  style:{
    width:'210px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 110px'
  }
});
var dateslider8 = ui.DateSlider({
  start:'2015-01-01',
  end:'2021-04-10',
  value:'2019-01-01',
  period:1,
  style:{
    width:'210px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 110px'
  }
});
var dateslider9 = ui.DateSlider({
  start:'2001-01-01',
  end:'2021-04-10',
  value:'2019-01-01',
  period:1,
  style:{
    width:'210px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 110px'
  }
});
var dateslider = ui.DateSlider({
  start:'2018-01-01',
  end:'2021-04-20',
  value:'2019-01-01',
  period:1,
  style:{
    width:'210px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 110px'
  }
});
var dateslider2 = ui.DateSlider({
  start:'2018-01-01',
  end:'2021-04-20',
  value:'2019-01-01',
  period:1,
  style:{
    width:'210px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 110px'
  }
});
//show image
var label_no_image = ui.Label({
  value:'この期間の画像はありません。\n日付または地域を変更してください',
  style:{
    //position:'top-left',
    padding:'0px',
    width:'500px',
    height:'50px',
    margin:'200px 0px 0px 0px',
    fontFamily:'serif',
    fontWeight:'bold',
    whiteSpace:'pre',
    textAlign:'center',
    shown:false,
  }
});
var panel_check = ui.Panel({
  style:{
    position:'top-left',
    padding:'0px',
    width:'140px',
    height:'100px',
    margin:'100px 0px 0px -50px',
    backgroundColor:'white',
    shown:false
  },
  layout:'absolute'
});
var label_check_str_0 = ui.Label({
  value:'NDVI:',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'0px 0px 0px 0px',
    backgroundColor:'white',
    fontSize:'20px',
    fontFamily:'serif'
  }
});
var label_check_value_0 = ui.Label({
  value:'計算中',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'0px 0px 0px 60px',
    backgroundColor:'white',
    fontSize:'20px',
    fontFamily:'serif'
  }
});
var label_check_str_1 = ui.Label({
  value:'特徴:',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'50px 0px 0px 0px',
    backgroundColor:'white',
    fontSize:'20px',
    fontFamily:'serif'
  }
});
var label_check_value_1 = ui.Label({
  value:'計算中',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'50px 0px 0px 60px',
    backgroundColor:'white',
    fontSize:'20px',
    fontFamily:'serif'
  }
});
panel_check.widgets().set(0,label_check_str_0);
panel_check.widgets().set(1,label_check_value_0);
panel_check.widgets().set(2,label_check_str_1);
panel_check.widgets().set(3,label_check_value_1);
map.widgets().set(0,label_no_image);
map.widgets().set(1,legend);
map.widgets().set(2,panel_check);
var button_ok_show_image = ui.Button({
  label:'NDVI分布図を表示',
  style:{
    position:'top-left',
    width:'100px',
    padding:'0px',
    margin:'120px 0px 0px 0px'
  },
  onClick:function(){
    panel.style().set('shown',false);
    panel_check.style().set('shown',false);
    dateslider = panel_select.widgets().get(5);
    var start_date = ee.Date(dateslider.getValue()[0]),
        end_date = ee.Date(dateslider.getValue()[1]),
        collection = select_satellite.getValue(),
        geometry = ee.Geometry.Rectangle(map.getBounds()),
        image = ee.Image(get_image(start_date,geometry,collection)),
        band_size = image.bandNames().size();
    var layer_image = ee.Image(ee.Algorithms.If({
      condition:band_size.neq(0),
      trueCase:image,
      falseCase:ee.Image.constant(1).select(['constant'],['ndvi']).clip(waste_mask)
    }));
    var layer = ui.Map.Layer(layer_image.select('ndvi'),vis,'正規化植生指数(NDVI)'),
        layer_rgb = ui.Map.Layer(layer_image,vis_rgb,'生データ');
    label_no_image.style().set('shown',ee.Algorithms.If({
      condition:band_size.eq(0),
      trueCase:1,
      falseCase:0
    }).getInfo());
    map.layers().set(0,layer);
    var show_map2 = function(){
      map2.layers().set(0,layer_rgb);
    };
    ui.util.setTimeout(show_map2,200);
    legend.style().set('shown',true);
  }
});
var button_check_value = ui.Button({
  label:'NDVIの値を確認',
  style:{
    position:'top-left',
    width:'100px',
    padding:'0px',
    margin:'150px 0px 0px 0px',
  },
  onClick:function(){
    var cat_padding = button_check_value.style().get('padding');
    if(cat_padding == '0px'){
      button_check_value.style().set('padding','1px 2px 1px 2px');
      button_check_value.style().set('backgroundColor','black');
      map.style().set('cursor','crosshair');
      map.onClick(function(mouse){
        label_check_value_0.setValue('計算中');
        label_check_value_1.setValue('計算中');
        var lon = mouse.lon,
            lat = mouse.lat,
            m_point = ee.Geometry.Point(lon,lat),
            ndvi = map.layers().get(0).getEeObject()
                  .reduceRegion({
                    reducer:ee.Reducer.first(),
                    geometry:m_point,
                    scale:10
                  }).get('ndvi'),
            v = ee.Number(ndvi);
        var show_value = function(){
          var value_0 = ee.Algorithms.If({
            condition:v.lt(0),
            trueCase:'雲雨雪',
            falseCase:ee.Algorithms.If({
              condition:v.lt(0.2),
              trueCase:'裸地',
              falseCase:ee.Algorithms.If({
                condition:v.lt(0.5),
                trueCase:'植生',
                falseCase:ee.Algorithms.If({
                  condition:v.lte(1),
                  trueCase:'植生',
                  falseCase:'error'
                })
              })
            })
          }).getInfo();
          label_check_value_0.setValue(ndvi.getInfo().toFixed(2));
          label_check_value_1.setValue(value_0);
        };
        ui.util.setTimeout(show_value,200);
        panel_check.style().set('shown',true);
      });
    }else{
      button_check_value.style().set('padding','0px');
      button_check_value.style().set('backgroundColor','white');
      map.style().set('cursor','hand');
      map.unlisten('click');
      panel_check.style().set('shown',false);
    }
  }
});
var panel_select_divide = ui.Label({
  value:'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'180px 0px 0px 0px'
  }
});
panel_select.widgets().set(0,label_select_forest);
panel_select.widgets().set(1,select_forest);
panel_select.widgets().set(2,label_select_satellite);
panel_select.widgets().set(3,select_satellite);
panel_select.widgets().set(4,label_slide_date);
panel_select.widgets().set(5,dateslider);
panel_select.widgets().set(6,button_ok_show_image);
panel_select.widgets().set(7,panel_select_divide);
panel_select.widgets().set(8,button_check_value);
map.onChangeBounds(function(){
  label_no_image.style().set('shown',false);
});
/*
level4 show function
*/
var panel_show_function = ui.Panel({
  style:{
    position:'top-left',
    padding:'0px',
    margin:'300px 0px 0px -10px',
    width:'370px',
    height:'100px'
  },
  layout:'absolute'
});
panel.widgets().set(2,panel_show_function);
var label_select_function = ui.Label({
  value:'機能を選ぶ:',
  style:{
    fontWeight:'bold',
    fontSize:font_size,
    position:'top-left',
    padding:'0px',
    margin:'-10px 0px 0px 20px'
  }
});
var button_show_gif = ui.Button({
  label:'動画 (GIF) 作成',
  style:{
    fontSize:font_size,
    position:'top-left',
    width:'100px',
    padding:'0px',
    margin:'15px 60px 0px 60px'
  },
  onClick:function(){
    var cat_panel_4_0_0 = panel_4_0_0.style().get('shown');
    var cat_panel_4_0 = panel_4_0.style().get('shown');
    var cat_panel_4_1_1 = panel_4_1_1.style().get('shown');
    panel_4_0.style().set('shown',!cat_panel_4_0);
    panel_4_1.style().set('shown',false);
    panel_4_1_1.style().set('shown',false);
    panel_4_1_1.clear();
    panel_4_0_0.style().set('shown',!cat_panel_4_0_0);
    panel_4_0_0.clear();
    drawingtool.clear();
  }
});
var button_show_plot = ui.Button({
  label:'時系列作成',
  style:{
    fontSize:font_size,
    position:'top-left',
    width:'100px',
    padding:'0px',
    margin:'15px 10px 0px 200px'
  },
  onClick:function(){
    var cat_panel_4_0_0 = panel_4_0_0.style().get('shown');
    var cat_panel_4_1 = panel_4_1.style().get('shown');
    var cat_panel_4_1_1 = panel_4_1_1.style().get('shown');
    panel_4_1.style().set('shown',!cat_panel_4_1);
    panel_4_0.style().set('shown',false);
    panel_4_1_1.style().set('shown',false);
    panel_4_1_1.clear();
    panel_4_0_0.style().set('shown',false);
    panel_4_0_0.clear();
    drawingtool.clear();
  }
});
panel_show_function.widgets().set(0,label_select_function);
panel_show_function.widgets().set(1,button_show_gif);
panel_show_function.widgets().set(2,button_show_plot);
/*
function gif
*/
var panel_4_0 = ui.Panel({
  layout:'absolute',
  style:{
    position:'top-left',
    height:'400px',
    width:'360px',
    backgroundColor:'f7f7f7',
    margin:'354px 0px 0px -10px',
    shown:false
  }
});
var panel_4_0_0 = ui.Panel({
  style:{
    position:'top-left',
    width:'360px',
    height:'300px',
    padding:'0px',
    margin:'460px 0px 0px -10px',
    shown:false
  }
});
panel.widgets().set(3,panel_4_0);
panel.widgets().set(4,panel_4_0_0);
//1.single season long year gif
var label_gif_single_season = ui.Label({
  value:'① 長年のシングルシーズン動画，失敗した場合は、開始年を手動で調整できる',
  style:{
    position:'top-left',
    margin:'-10px -10px',
    backgroundColor:'f7f7f7',
    fontSize:'10px'
  }
})
var select_gif_type = ui.Select({
  items:[{label:'毎年の春',value:3},{label:'毎年の夏',value:6},{label:'毎年の秋',value:9},
         {label:'毎年の冬',value:12}],
  placeholder:'季節を指定',
  style:{
    width:'120px',
    position:'top-left',
    padding:'0px',
    margin:'12px 0px 0px 10px'
  }
});
var label_gif_start = ui.Label({
  value:'開始年: ',
  style:{
    position:'top-left',
    padding:0,
    backgroundColor:'f7f7f7',
    margin:'15px 140px'
  }
})
var gif_year_item5 = [{label:'1985',value:1985},{label:'1986',value:1985},{label:'1987',value:1987},{label:'1988',value:1988},{label:'1989',value:1989},
                      {label:'1990',value:1990},{label:'1991',value:1991},{label:'1992',value:1992},{label:'1993',value:1993},{label:'1994',value:1994},
                      {label:'1995',value:1995},{label:'1996',value:1996},{label:'1997',value:1997},{label:'1998',value:1998},{label:'1999',value:1999},
                      {label:'2000',value:2000},{label:'2001',value:2001},{label:'2002',value:2002},{label:'2003',value:2003},{label:'2004',value:2004},
                      {label:'2005',value:2005},{label:'2006',value:2006},{label:'2007',value:2007},{label:'2008',value:2008},{label:'2009',value:2009}];
var gif_year_item7 = [{label:'2001',value:2001},{label:'2002',value:2002},{label:'2003',value:2003},{label:'2004',value:2004},{label:'2005',value:2005},
                      {label:'2006',value:2006},{label:'2007',value:2007},{label:'2008',value:2008},{label:'2009',value:2009},{label:'2010',value:2010},
                      {label:'2011',value:2011},{label:'2012',value:2012},{label:'2013',value:2013},{label:'2014',value:2014},{label:'2015',value:2015},
                      {label:'2016',value:2016},{label:'2017',value:2017},{label:'2018',value:2018},{label:'2019',value:2019},{label:'2020',value:2020}];
var gif_year_item8 = [{label:'2015',value:2015},{label:'2016',value:2016},{label:'2017',value:2017},{label:'2018',value:2018},{label:'2019',value:2019},
                      {label:'2020',value:2020}];
var gif_year_item9 = [{label:'2001',value:2001},{label:'2002',value:2002},{label:'2003',value:2003},{label:'2004',value:2004},{label:'2005',value:2005},
                      {label:'2006',value:2006},{label:'2007',value:2007},{label:'2008',value:2008},{label:'2009',value:2009},{label:'2010',value:2010},
                      {label:'2011',value:2011},{label:'2012',value:2012},{label:'2013',value:2013},{label:'2014',value:2014},{label:'2015',value:2015},
                      {label:'2016',value:2016},{label:'2017',value:2017},{label:'2018',value:2018},{label:'2019',value:2019},{label:'2020',value:2020}];
var gif_year_item2 = [{label:'2019',value:2019},{label:'2020',value:2020}];
var select_gif_year5 = ui.Select({
  items:gif_year_item5,
  value:gif_year_item5[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'12px 190px'
  }
});
var select_gif_year7 = ui.Select({
  items:gif_year_item7,
  value:gif_year_item7[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'12px 190px'
  }
});
var select_gif_year8 = ui.Select({
  items:gif_year_item8,
  value:gif_year_item8[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'12px 190px'
  }
});
var select_gif_year9 = ui.Select({
  items:gif_year_item9,
  value:gif_year_item9[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'12px 190px'
  }
});
var select_gif_year2 = ui.Select({
  items:gif_year_item2,
  value:gif_year_item2[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'12px 190px'
  }
});
var button_gif_ok = ui.Button({
  label:'OK',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'12px 270px'
  },
  onClick:function(){
    panel_4_0_0.style().set('shown',true)
    var collection = select_satellite.getValue(),
        start_year = panel_4_0.widgets().get(4).getValue(),
        start_month = select_gif_type.getValue(),
        bound = map.getBounds(),
        scale = map.getScale()*3,
        geo = ee.Geometry.Rectangle(bound),
        top_left_corner = ee.Geometry.Point([bound[0],bound[3]]);
    var str_season = ee.Algorithms.If({
      condition:start_month == 3,
      trueCase:ee.String(' Spring'),
      falseCase:ee.Algorithms.If({
        condition:start_month == 6,
        trueCase:ee.String(' Summer'),
        falseCase:ee.Algorithms.If({
          condition:start_month == 9,
          trueCase:ee.String(' Fall'),
          falseCase:ee.String(' Winter')
        })
      })
    });
    var gif_collection = ee.Algorithms.If({
      condition:collection == landsat5,
      trueCase:ee.List.sequence(start_year,2009,1).map(function(year){
        year = ee.Number(year).toInt();
        var s_date = ee.Date.fromYMD(year,start_month,1),
            e_date = s_date.advance(3,'month'),
            str = ee.String('aLandsat-5 ').cat(ee.String(year)).cat(str_season),
            text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
            con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
            img = landsat5.filterDate(s_date,e_date).filterBounds(geo)
                          .map(maskL578cloud).map(L57addFeature)
                          .mean().clip(geo).select('ndvi');
        var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
        f_img = f_img.set('year',year);
        f_img = f_img.set('system:time_start',ee.String(year));
        return f_img;
      }),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat7,
        trueCase:ee.List.sequence(start_year,2020,1).map(function(year){
          year = ee.Number(year).toInt();
          var s_date = ee.Date.fromYMD(year,start_month,1),
              e_date = s_date.advance(3,'month'),
              str = ee.String('aLandsat-7 ').cat(ee.String(year)).cat(str_season),
              text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
              con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
              img = landsat7.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskL578cloud).map(L57addFeature)
                            .median().clip(geo).select('ndvi');
          var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
          f_img = f_img.set('year',year);
          f_img = f_img.set('system:time_start',ee.String(year));
          return f_img;
        }),
        falseCase:ee.Algorithms.If({
          condition:collection == landsat8,
          trueCase:ee.List.sequence(start_year,2020,1).map(function(year){
            year = ee.Number(year).toInt();
            var s_date = ee.Date.fromYMD(year,start_month,1),
                e_date = s_date.advance(3,'month'),
                str = ee.String('aLandsat-8 ').cat(ee.String(year)).cat(str_season),
                text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                img = landsat8.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskL578cloud).map(L8addFeature)
                              .median().clip(geo).select('ndvi');
            var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
            f_img = f_img.set('year',year);
            f_img = f_img.set('system:time_start',ee.String(year));
            return f_img;
          }),
          falseCase:ee.Algorithms.If({
            condition:collection == modis9,
            trueCase:ee.List.sequence(start_year,2020,1).map(function(year){
            year = ee.Number(year).toInt();
            var s_date = ee.Date.fromYMD(year,start_month,1),
                e_date = s_date.advance(3,'month'),
                str = ee.String('aMODIS-9 ').cat(ee.String(year)).cat(str_season),
                text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                img = modis9.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskM9cloud).map(M9addFeature)
                              .median().clip(geo).select('ndvi');
            var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
            f_img = f_img.set('year',year);
            f_img = f_img.set('system:time_start',ee.String(year));
            return f_img;
          }),
            falseCase:ee.List.sequence(start_year,2020,1).map(function(year){
              year = ee.Number(year).toInt();
              var s_date = ee.Date.fromYMD(year,start_month,1),
                  e_date = s_date.advance(3,'month'),
                  str = ee.String('aSentinel-2 ').cat(ee.String(year)).cat(str_season),
                  text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                  con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                  img = sentinel2.filterDate(s_date,e_date).filterBounds(geo)
                                .map(maskS2cloud).map(S2addFeature)
                                .median().clip(geo).select('ndvi');
              var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
              f_img = f_img.set('year',year);
              f_img = f_img.set('system:time_start',ee.String(year));
              return f_img;
            })
          })
        })
      })
    });
    var gif_col = ee.ImageCollection.fromImages(gif_collection);
    var gif_params = {
      crs:'EPSG:32654',
      framesPerSecond: 0.7, 
      region:geo,
      min:0,
      max:1,
      palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000',
      dimensions:512
    };
    var gif = ui.Thumbnail({
      image:gif_col, 
      params:gif_params,
      style:{
        width:'300px',
        height:'200px',
        padding:'0px',
        position:'top-left',
        margin:'0px 0px 0px 50px'
      }
    });
    panel_4_0_0.widgets().set(0,gif)
  }
});
//2.single year gif 
var label_gif_one_year = ui.Label({
  value:'② 1年以内に動画を作成する',
  style:{
    position:'top-left',
    margin:'40px -10px',
    backgroundColor:'f7f7f7',
    fontSize:'10px'
  }
});
var select_gif_type_oneyear = ui.Select({
  items:[{label:'季節の比較',value:3},{label:'月間の比較',value:1}],
  placeholder:'種類を指定',
  style:{
    width :'120px',
    position:'top-left',
    padding:'0px',
    margin:'62px 10px'
  }
})
var label_gif_start_oneyear = ui.Label({
  value:'指定年: ',
  style:{
    position:'top-left',
    padding:0,
    backgroundColor:'f7f7f7',
    margin:'65px 140px'
  }
});
var select_gif_year5_oneyear = ui.Select({
  items:gif_year_item5,
  value:gif_year_item5[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'62px 190px'
  }
});
var select_gif_year7_oneyear = ui.Select({
  items:gif_year_item7,
  value:gif_year_item7[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'62px 190px'
  }
});
var select_gif_year8_oneyear = ui.Select({
  items:gif_year_item8,
  value:gif_year_item8[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'62px 190px'
  }
});
var select_gif_year9_oneyear = ui.Select({
  items:gif_year_item9,
  value:gif_year_item9[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'62px 190px'
  }
});
var select_gif_year2_oneyear = ui.Select({
  items:gif_year_item2,
  value:gif_year_item2[0].value,
  style:{
    position:'top-left',
    padding:0,
    margin:'62px 190px'
  }
});
var button_gif_ok_oneyear = ui.Button({
  label:'OK',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'62px 270px'
  },
  onClick:function(){
    panel_4_0_0.style().set('shown',true);
    var collection = select_satellite.getValue(),
        start_year = panel_4_0.widgets().get(8).getValue(),
        start_month = select_gif_type_oneyear.getValue(),
        bound = map.getBounds(),
        scale = map.getScale()*3,
        geo = ee.Geometry.Rectangle(bound),
        top_left_corner = ee.Geometry.Point([bound[0],bound[3]]);
    var get_str_season = function(month){
      var str_season = ee.Algorithms.If({
        condition:month.eq(ee.Number(3)),
        trueCase:ee.String(' Spring'),
        falseCase:ee.Algorithms.If({
          condition:month.eq(ee.Number(6)),
          trueCase:ee.String(' Summer'),
          falseCase:ee.Algorithms.If({
            condition:month.eq(ee.Number(9)),
            trueCase:ee.String(' Fall'),
            falseCase:ee.String(' Winter')
          })
        })
      });
      return str_season;
    };
    var get_str_month = function(month){
      var str_month = ee.Algorithms.If({
        condition:month.eq(ee.Number(1)),
        trueCase:ee.String(' January'),
        falseCase:ee.Algorithms.If({
          condition:month.eq(ee.Number(2)),
          trueCase:ee.String(' February'),
          falseCase:ee.Algorithms.If({
            condition:month.eq(ee.Number(3)),
            trueCase:ee.String(' March'),
            falseCase:ee.Algorithms.If({
              condition:month.eq(ee.Number(4)),
              trueCase:ee.String(' April'),
              falseCase:ee.Algorithms.If({
                condition:month.eq(ee.Number(5)),
                trueCase:ee.String(' May'),
                falseCase:ee.Algorithms.If({
                  condition:month.eq(ee.Number(6)),
                  trueCase:ee.String(' June'),
                  falseCase:ee.Algorithms.If({
                    condition:month.eq(ee.Number(7)),
                    trueCase:ee.String(' July'),
                    falseCase:ee.Algorithms.If({
                      condition:month.eq(ee.Number(8)),
                      trueCase:ee.String(' August'),
                      falseCase:ee.Algorithms.If({
                        condition:month.eq(ee.Number(9)),
                        trueCase:ee.String(' September'),
                        falseCase:ee.Algorithms.If({
                          condition:month.eq(ee.Number(10)),
                          trueCase:ee.String(' October'),
                          falseCase:ee.Algorithms.If({
                            condition:month.eq(ee.Number(11)),
                            trueCase:ee.String(' November'),
                            falseCase:ee.String(' December')
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      });
      return str_month;
    };
    var gif_collection = ee.Algorithms.If({
      condition:start_month == 3,
      trueCase:ee.Algorithms.If({
        condition:collection == landsat5,
        trueCase:ee.List.sequence(3,12,3).map(function(month){
          month = ee.Number(month).toInt();
          var s_date = ee.Date.fromYMD(start_year,month,1),
              e_date = s_date.advance(3,'month'),
              str_season = ee.String(get_str_season(month)),
              str = ee.String('aLandsat-5 ').cat(ee.String(ee.Number(start_year))).cat(str_season),
              text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
              con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
              img = landsat5.filterDate(s_date,e_date).filterBounds(geo)
                          .map(maskL578cloud).map(L57addFeature)
                          .median().clip(geo).select('ndvi');
          var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
          f_img = f_img.set('system:time_start',ee.String(month));
          return f_img;
        }),
        falseCase:ee.Algorithms.If({
          condition:collection == landsat7,
          trueCase:ee.List.sequence(3,12,3).map(function(month){
            month = ee.Number(month).toInt();
            var s_date = ee.Date.fromYMD(start_year,month,1),
                e_date = s_date.advance(3,'month'),
                str_season = ee.String(get_str_season(month)),
                str = ee.String('aLandsat-7 ').cat(ee.String(ee.Number(start_year))).cat(str_season),
                text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                img = landsat7.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskL578cloud).map(L57addFeature)
                            .median().clip(geo).select('ndvi');
            var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
            f_img = f_img.set('system:time_start',ee.String(month));
            return f_img;
          }),
          falseCase:ee.Algorithms.If({
            condition:collection == landsat8,
            trueCase:ee.List.sequence(3,12,3).map(function(month){
              month = ee.Number(month).toInt();
              var s_date = ee.Date.fromYMD(start_year,month,1),
                  e_date = s_date.advance(3,'month'),
                  str_season = ee.String(get_str_season(month)),
                  str = ee.String('aLandsat-8 ').cat(ee.String(ee.Number(start_year))).cat(str_season),
                  text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                  con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                  img = landsat8.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskL578cloud).map(L8addFeature)
                              .median().clip(geo).select('ndvi');
              var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
              f_img = f_img.set('system:time_start',ee.String(month));
              return f_img;
            }),
            falseCase:ee.Algorithms.If({
              condition:collection == modis9,
              trueCase:ee.List.sequence(3,12,3).map(function(month){
                month = ee.Number(month).toInt();
                var s_date = ee.Date.fromYMD(start_year,month,1),
                    e_date = s_date.advance(3,'month'),
                    str_season = ee.String(get_str_season(month)),
                    str = ee.String('aMODIS ').cat(ee.String(ee.Number(start_year))).cat(str_season),
                    text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                    con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                    img = modis9.filterDate(s_date,e_date).filterBounds(geo)
                                .map(maskM9cloud).map(M9addFeature)
                                .median().clip(geo).select('ndvi');
                var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
                f_img = f_img.set('system:time_start',ee.String(month));
                return f_img;
              }),
              falseCase:ee.List.sequence(3,12,3).map(function(month){
                month = ee.Number(month).toInt();
                var s_date = ee.Date.fromYMD(start_year,month,1),
                    e_date = s_date.advance(3,'month'),
                    str_season = ee.String(get_str_season(month)),
                    str = ee.String('aSentinel-2 ').cat(ee.String(ee.Number(start_year))).cat(str_season),
                    text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                    con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                    img = sentinel2.filterDate(s_date,e_date).filterBounds(geo)
                                .map(maskS2cloud).map(S2addFeature)
                                .median().clip(geo).select('ndvi');
                var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
                f_img = f_img.set('system:time_start',ee.String(month));
                return f_img;
              })
            })
          })
        })
      }),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat5,
        trueCase:ee.List.sequence(1,12,1).map(function(month){
          month = ee.Number(month).toInt();
          var s_date = ee.Date.fromYMD(start_year,month,1),
              e_date = s_date.advance(1,'month'),
              str_month = ee.String(get_str_month(month)),
              str = ee.String('aLandsat-5 ').cat(ee.String(ee.Number(start_year))).cat(str_month),
              text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
              con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
              img = landsat5.filterDate(s_date,e_date).filterBounds(geo)
                          .map(maskL578cloud).map(L57addFeature)
                          .median().clip(geo).select('ndvi');
          var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
          f_img = f_img.set('system:time_start',ee.String(month));
          return f_img;
        }),
        falseCase:ee.Algorithms.If({
          condition:collection == landsat7,
          trueCase:ee.List.sequence(1,12,1).map(function(month){
            month = ee.Number(month).toInt();
            var s_date = ee.Date.fromYMD(start_year,month,1),
                e_date = s_date.advance(1,'month'),
                str_month = ee.String(get_str_month(month)),
                str = ee.String('aLandsat-7 ').cat(ee.String(ee.Number(start_year))).cat(str_month),
                text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                img = landsat7.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskL578cloud).map(L57addFeature)
                            .median().clip(geo).select('ndvi');
            var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
            f_img = f_img.set('system:time_start',ee.String(month));
            return f_img;
          }),
          falseCase:ee.Algorithms.If({
            condition:collection == landsat8,
            trueCase:ee.List.sequence(1,12,1).map(function(month){
              month = ee.Number(month).toInt();
              var s_date = ee.Date.fromYMD(start_year,month,1),
                  e_date = s_date.advance(1,'month'),
                  str_month = ee.String(get_str_month(month)),
                  str = ee.String('aLandsat-8 ').cat(ee.String(ee.Number(start_year))).cat(str_month),
                  text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                  con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                  img = landsat8.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskL578cloud).map(L8addFeature)
                              .median().clip(geo).select('ndvi');
              var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
              f_img = f_img.set('system:time_start',ee.String(month));
              return f_img;
            }),
            falseCase:ee.Algorithms.If({
              condition:collection == modis9,
              trueCase:ee.List.sequence(1,12,1).map(function(month){
                month = ee.Number(month).toInt();
                var s_date = ee.Date.fromYMD(start_year,month,1),
                    e_date = s_date.advance(1,'month'),
                    str_month = ee.String(get_str_month(month)),
                    str = ee.String('aMODIS ').cat(ee.String(ee.Number(start_year))).cat(str_month),
                    text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                    con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                    img = modis9.filterDate(s_date,e_date).filterBounds(geo)
                                .map(maskM9cloud).map(M9addFeature)
                                .median().clip(geo).select('ndvi');
                var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
                f_img = f_img.set('system:time_start',ee.String(month));
                return f_img;
              }),
              falseCase:ee.List.sequence(1,12,1).map(function(month){
                month = ee.Number(month).toInt();
                var s_date = ee.Date.fromYMD(start_year,month,1),
                    e_date = s_date.advance(1,'month'),
                    str_month = ee.String(get_str_month(month)),
                    str = ee.String('aSentinel-2 ').cat(ee.String(ee.Number(start_year))).cat(str_month),
                    text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                    con = ee.Image.constant(1).updateMask(text.select(0)).rename('ndvi'),
                    img = sentinel2.filterDate(s_date,e_date).filterBounds(geo)
                                .map(maskS2cloud).map(S2addFeature)
                                .median().clip(geo).select('ndvi');
                var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
                f_img = f_img.set('system:time_start',ee.String(month));
                return f_img;
              })
            })
          })
        })
      })
    });
    var gif_col = ee.ImageCollection.fromImages(gif_collection);
    var gif_params = {
      crs:'EPSG:32654',
      framesPerSecond: 0.7, 
      region:geo,
      min:0,
      max:1,
      palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000',
      dimensions:512
    };
    var gif = ui.Thumbnail({
      image:gif_col, 
      params:gif_params,
      style:{
        width:'300px',
        height:'200px',
        padding:'0px',
        position:'top-left',
        margin:'0px 0px 0px 50px'
      }
    });
    panel_4_0_0.widgets().set(0,gif);
  }
});
panel_4_0.widgets().set(0,label_gif_single_season);
panel_4_0.widgets().set(1,select_gif_type);
panel_4_0.widgets().set(2,button_gif_ok);
panel_4_0.widgets().set(3,label_gif_start);
panel_4_0.widgets().set(4,select_gif_year2);
panel_4_0.widgets().set(5,label_gif_one_year);
panel_4_0.widgets().set(6,select_gif_type_oneyear);
panel_4_0.widgets().set(7,label_gif_start_oneyear);
panel_4_0.widgets().set(8,select_gif_year2_oneyear);
panel_4_0.widgets().set(9,button_gif_ok_oneyear);
/*
function plot
*/
var select_plot_year5 = ui.Select({
  items:gif_year_item5,
  value:gif_year_item5[0].value,
  style:{
    position:'top-left',
    width:'140px',
    padding:0,
    margin:'22px 10px'
  }
});
var select_plot_year7 = ui.Select({
  items:gif_year_item7,
  value:gif_year_item7[0].value,
  style:{
    position:'top-left',
    width:'140px',
    padding:0,
    margin:'22px 10px'
  }
});
var select_plot_year8 = ui.Select({
  items:gif_year_item8,
  value:gif_year_item8[0].value,
  style:{
    position:'top-left',
    width:'140px',
    padding:0,
    margin:'22px 10px'
  }
});
var select_plot_year9 = ui.Select({
  items:gif_year_item9,
  value:gif_year_item9[0].value,
  style:{
    position:'top-left',
    width:'140px',
    padding:0,
    margin:'22px 10px'
  }
});
var panel_4_1 = ui.Panel({
  layout:'absolute',
  style:{
    position:'top-left',
    height:'140px',
    width:'350px',
    backgroundColor:'f7f7f7',
    margin:'354px 0px 0px 0px',
    shown:false
  }
});
var panel_4_1_1 = ui.Panel({
  style:{
    position:'top-left',
    height:'240px',
    width:'350px',
    padding:'0px',
    margin:'490px 0px 0px 0px',
    shown:false
  }
});
panel.widgets().set(5,panel_4_1);
panel.widgets().set(6,panel_4_1_1);
var label_for_button_select_plot_point = ui.Label({
  value:'ウィンドウ内の赤いラベルをクリックして移動するか、ボタンを使用して移動します。',
  style:{
    fontSize:'10px',
    width:'190px',
    position:'top-left',
    padding:'0px',
    margin:'0px 0px 0px 145px',
    backgroundColor:'f7f7f7'
  }
});
var select_move_point_speed = ui.Select({
  items:[{label:'30m/click',value:0.0004},{label:'100m/click',value:0.0012},
         {label:'500m/click',value:0.006},{label:'1km/click',value:0.012},
         {label:'5km/click',value:0.06},{label:'10km/click',value:0.12}],
  placeholder:'1km/click',
  style:{
    position:'top-left',
    width:'85px',
    padding:'0px',
    margin:'30px 0px 0px 250px'
  }
});
var button_move_point_up = ui.Button({
  label:'⇧  ',
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'33px 0px 0px 180px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = ee.Algorithms.If({
      condition:select_move_point_speed.getValue() === null,
      trueCase:0.012,
      falseCase:select_move_point_speed.getValue()
    });
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)),
        y = ee.Number(p.coordinates().get(1)).add(move_distance),
        p2 = ee.Geometry.Point([x,y]);
    p2.evaluate(function(geo){
      var layer2 = ui.Map.GeometryLayer([geo],'p','red');
      drawingtool.layers().set(0,layer2);
    });
  }
});
var button_move_point_right = ui.Button({
  label:'⇨',
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'64px 0px 0px 210px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = ee.Algorithms.If({
      condition:select_move_point_speed.getValue() === null,
      trueCase:0.012,
      falseCase:select_move_point_speed.getValue()
    });
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)).add(move_distance),
        y = ee.Number(p.coordinates().get(1)),
        p2 = ee.Geometry.Point([x,y]);
    p2.evaluate(function(geo){
      var layer2 = ui.Map.GeometryLayer([geo],'p','red');
      drawingtool.layers().set(0,layer2);
    });
  }
});
var button_move_point_down = ui.Button({
  label:'⇩',
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'94px 0px 0px 180px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = ee.Algorithms.If({
      condition:select_move_point_speed.getValue() === null,
      trueCase:0.012,
      falseCase:select_move_point_speed.getValue()
    });
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)),
        y = ee.Number(p.coordinates().get(1)).subtract(move_distance),
        p2 = ee.Geometry.Point([x,y]);
    p2.evaluate(function(geo){
      var layer2 = ui.Map.GeometryLayer([geo],'p','red');
      drawingtool.layers().set(0,layer2);
    });
  }
});
var button_move_point_left = ui.Button({
  label:'⇦',
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'64px 0px 0px 150px',
    textAlign:'center',
    backgroundColor:'f7f7f7'
  },
  onClick:function(){
    var move_distance = ee.Algorithms.If({
      condition:select_move_point_speed.getValue() === null,
      trueCase:0.012,
      falseCase:select_move_point_speed.getValue()
    });
    var p = drawingtool.layers().get(0).toGeometry(),
        x = ee.Number(p.coordinates().get(0)).subtract(move_distance),
        y = ee.Number(p.coordinates().get(1)),
        p2 = ee.Geometry.Point([x,y]);
    p2.evaluate(function(geo){
      var layer2 = ui.Map.GeometryLayer([geo],'p','red');
      drawingtool.layers().set(0,layer2);
    });
  }
});
var button_select_plot_point = ui.Button({
  label:'地点指定',
  style:{
    position:'top-left',
    width:'140px',
    padding:'0px',
    margin:'-8px -8px'
  },
  onClick:function(){
    var point_0 = map.getCenter(),
        layer_0 = ui.Map.GeometryLayer({
          geometries:[point_0],
          name:'point_0',
          color:'red',
          shown:true,
          locked:false
        });
    drawingtool.layers().set(0,layer_0);
    panel_4_1.widgets().set(4,label_for_button_select_plot_point);
    panel_4_1.widgets().set(5,button_move_point_up);
    panel_4_1.widgets().set(6,button_move_point_right);
    panel_4_1.widgets().set(7,button_move_point_left);
    panel_4_1.widgets().set(8,button_move_point_down);
    panel_4_1.widgets().set(9,select_move_point_speed);
  }
});
var select_plot_year2 = ui.Select({
  items:gif_year_item2,
  value:gif_year_item2[0].value,
  style:{
    position:'top-left',
    width:'140px',
    padding:0,
    margin:'22px -8px'
  }
});
var select_plot_type = ui.Select({
  items:[{label:'毎年の春',value:3},{label:'毎年の夏',value:6},{label:'毎年の秋',value:9},
         {label:'毎年の冬',value:12},{label:'すべてのデータ',value:1},{label:'単年毎日',value:11}],
  placeholder:'タイプを選択',
  style:{
    width:'140px',
    position:'top-left',
    padding:'0px',
    margin:'52px -8px'
  }
});
//********************************************
var get_collection = function(collection,start_year,start_month,geo){
  var image_collection = ee.ImageCollection.fromImages(ee.Algorithms.If({
    condition:collection == landsat5,
    trueCase:ee.List.sequence(start_year,2011,1).map(function(year){
      year = ee.Number(year);
      var s_date = ee.Date.fromYMD(year,start_month,1),
          e_date = s_date.advance(3,'month'),
          img = landsat5.filterDate(s_date,e_date).filterBounds(geo)
                .map(maskL578cloud).map(L57addFeature)
                .mean().select('ndvi');
      img = img.set('system:time_start',s_date);
      return img;
    }),
    falseCase:ee.Algorithms.If({
      condition:collection == landsat7,
      trueCase:ee.List.sequence(start_year,2020,1).map(function(year){
        year = ee.Number(year);
        var s_date = ee.Date.fromYMD(year,start_month,1),
            e_date = s_date.advance(3,'month'),
            img = landsat7.filterDate(s_date,e_date).filterBounds(geo)
                          .map(maskL578cloud).map(L57addFeature)
                          .mean().select('ndvi');
        img = img.set('system:time_start',s_date);
        return img;
      }),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat8,
        trueCase:ee.List.sequence(start_year,2015,1).map(function(year){
          year = ee.Number(year);
          var s_date = ee.Date.fromYMD(year,start_month,1),
              e_date = s_date.advance(3,'month'),
              img = landsat8.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskL578cloud).map(L8addFeature)
                            .mean().select('ndvi');
          img = img.set('system:time_start',s_date);
          return img;
        }),
        falseCase:ee.Algorithms.If({
          condition:collection == modis9,
          trueCase:ee.List.sequence(start_year,2020,1).map(function(year){
            year = ee.Number(year);
            var s_date = ee.Date.fromYMD(year,start_month,1),
                e_date = s_date.advance(3,'month'),
                img = modis9.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskM9cloud).map(M9addFeature)
                            .mean().select('ndvi');
            img = img.set('system:time_start',s_date);
            return img;
          }),
          falseCase:ee.List.sequence(start_year,2020,1).map(function(year){
            // year = ee.Number(year);
            var s_date = ee.Date.fromYMD(year,start_month,1),
                e_date = s_date.advance(3,'month'),
                img = sentinel2.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskS2cloud).map(S2addFeature)
                              .mean().select('ndvi');
            img = img.set('system:time_start',s_date);
            return img;
        })
        })
      })
    })
  }));
  return image_collection
}
//******************
var button_ok_plot = ui.Button({
  label:'OK',
  style:{
    position:'top-left',
    width:'140px',
    padding:'0px',
    margin:'90px 0px 0px -8px'
  },
  onClick:function(){
    panel_4_1_1.style().set('shown',true);
    var collection = select_satellite.getValue(),
        geo = drawingtool.layers().get(0).toGeometry(),
        start_year = panel_4_1.widgets().get(3).getValue(),
        start_month = select_plot_type.getValue();
    var plot_collection = ee.Algorithms.If({
      condition:start_month==3,
      trueCase:get_collection(collection,start_year,start_month,geo),
      falseCase:ee.Algorithms.If({
        condition:start_month == 6,
        trueCase:get_collection(collection,start_year,start_month,geo),
        falseCase:ee.Algorithms.If({
          condition:start_month == 9,
          trueCase:get_collection(collection,start_year,start_month,geo),
          falseCase:ee.Algorithms.If({
            condition:start_month == 12,
            trueCase:get_collection(collection,start_year,start_month,geo),
            falseCase:ee.Algorithms.If({
              condition:start_month == 11,
              trueCase:ee.Algorithms.If({
                condition:collection == landsat5,
                trueCase:landsat5.filterDate(ee.Date.fromYMD(start_year,1,1),ee.Date.fromYMD(start_year,12,31))
                                 .filterBounds(geo)
                                 .map(maskL578cloud).map(L57addFeature).select('ndvi'),
                falseCase:ee.Algorithms.If({
                  condition:collection == landsat7,
                  trueCase:landsat7.filterDate(ee.Date.fromYMD(start_year,1,1),ee.Date.fromYMD(start_year,12,31))
                                   .filterBounds(geo)
                                   .map(maskL578cloud).map(L57addFeature).select('ndvi'),
                  falseCase:ee.Algorithms.If({
                    condition:collection == landsat8,
                    trueCase:landsat8.filterDate(ee.Date.fromYMD(start_year,1,1),ee.Date.fromYMD(start_year,12,31))
                                     .filterBounds(geo)
                                     .map(maskL578cloud).map(L8addFeature).select('ndvi'),
                    falseCase:ee.Algorithms.If({
                      condition:collection == modis9,
                      trueCase:modis9.filterDate(ee.Date.fromYMD(start_year,1,1),ee.Date.fromYMD(start_year,12,31))
                                     .filterBounds(geo)
                                     .map(maskM9cloud).map(M9addFeature).select('ndvi'),
                      falseCase:sentinel2.filterDate(ee.Date.fromYMD(start_year,1,1),ee.Date.fromYMD(start_year,12,31))
                                         .filterBounds(geo)
                                         .map(maskS2cloud).map(S2addFeature).select('ndvi')
                    })
                  })
                })
              }),
              falseCase:ee.Algorithms.If({
                condition:collection == landsat5,
                trueCase:landsat5.filterDate(ee.Date.fromYMD(start_year,start_month,1),'2010-01-01')
                                 .filterBounds(geo)
                                 .map(maskL578cloud).map(L57addFeature).select('ndvi'),
                falseCase:ee.Algorithms.If({
                  condition:collection == landsat7,
                  trueCase:landsat7.filterDate(ee.Date.fromYMD(start_year,start_month,1),'2021-04-10')
                                   .filterBounds(geo)
                                   .map(maskL578cloud).map(L57addFeature).select('ndvi'),
                  falseCase:ee.Algorithms.If({
                    condition:collection == landsat8,
                    trueCase:landsat8.filterDate(ee.Date.fromYMD(start_year,start_month,1),'2021-04-10')
                                     .filterBounds(geo)
                                     .map(maskL578cloud).map(L8addFeature).select('ndvi'),
                    falseCase:ee.Algorithms.If({
                      condition:collection == modis9,
                      trueCase:modis9.filterDate(ee.Date.fromYMD(start_year,start_month,1),'2021-04-10')
                                       .filterBounds(geo)
                                       .map(maskM9cloud).map(M9addFeature).select('ndvi'),
                      falseCase:sentinel2.filterDate(ee.Date.fromYMD(start_year,start_month,1),'2021-04-10')
                                       .filterBounds(geo)
                                       .map(maskS2cloud).map(S2addFeature).select('ndvi')
                    })
                  })
                })
              })
            }) 
          })
        })
      })
    });
    var chart = ui.Chart.image.series({
      imageCollection:plot_collection,
      region:geo,
      reducer:ee.Reducer.mean(),
      scale:30,
      xProperty: 'system:time_start'
    }).setSeriesNames(['NDVI'])
      .setOptions({
        title:'正規化植生指数（NDVI）',
        hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
        vAxis: {
          title: 'TSS',
          titleTextStyle: {italic: false, bold: true}
        },
      });
    panel_4_1_1.widgets().set(0,chart);
  }
});
panel_4_1.widgets().set(0,button_select_plot_point);
panel_4_1.widgets().set(1,select_plot_type);
panel_4_1.widgets().set(2,button_ok_plot);
panel_4_1.widgets().set(3,select_plot_year2);