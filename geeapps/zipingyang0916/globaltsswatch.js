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
    legend_arrow = ui.import && ui.import("legend_arrow", "image", {
      "id": "users/zipingyang0916/icon/legend_arrow"
    }) || ee.Image("users/zipingyang0916/icon/legend_arrow"),
    chibau_icon = ui.import && ui.import("chibau_icon", "image", {
      "id": "users/zipingyang0916/icon/chibau_icon"
    }) || ee.Image("users/zipingyang0916/icon/chibau_icon");
//change-1 
var inbanuma = ee.Geometry.Point([140.22687759823785,35.774771098091584]);
var biwako = ee.Geometry.Point([136.00059052771408,35.29217672310297]);
var tako = ee.Geometry.Point([120.15466539908846,31.194736944129765]);
var eruhai = ee.Geometry.Point([100.18663761142415,25.790106682112963]);
var donrisapu = ee.Geometry.Point([104.12106475549763,12.847178928319705]);
var select_lake_item = [{label:'琵琶湖',value:biwako},
                        {label:'印旛沼',value:inbanuma},
                        {label:'太湖',value:tako},
                        {label:'洱海',value:eruhai},
                        {label:'トンレサップ',value:donrisapu}
                        ];
//change-2
var icon_chiba = ui.Thumbnail({
  image:chibau_icon.visualize({min:0,max:255,bands:['b1','b2','b3']}),
  params:{
    dimnesions:'420x420',
    format:'png'
  },
  style:{
    height:'120px',
    width:'120px',
    padding:'0px',
    margin:'-20px 0px 0px 0px',
    position:'top-left',
    shown:false
  }
});
//change-3
// var yang_lab = ui.Label({
//   value:'千葉大学\n環境リモートセンシング\n研究センター    楊研究室',
//   style:{
//     fontSize:'20px',
//     fontFamily:'serif',//monospace Times New Roman
//     position:'top-left',
//     padding:'0px',
//     margin:'-10px 0px 0px 145px',
//     whiteSpace:'pre'
//   }
// });
var yang_lab = ui.Label({
  value:'千葉大学\n環境リモートセンシング\n研究センター    楊研究室',
  style:{
    fontSize:'20px',
    fontFamily:'serif',//monospace Times New Roman
    position:'top-left',
    padding:'0px',
    margin:'-10px 0px 0px 145px',
    whiteSpace:'pre',
    shown:false
  }
});
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
      width : '120px',
      shown:false
    },
    layout:'absolute'
  });
  var legendTitle = ui.Label({
    value: '懸濁物濃度',
    style: {
      fontWeight: 'bold',
      width:'100px',
      fontSize: '14px',
      margin: '-18px 0px 0px 0px',
      position:'top-left'
    }
  });
  legend_panel.add(legendTitle);
  var lon = ee.Image.pixelLonLat().select('latitude'),
      gradient = lon.multiply(ee.Number(0.5)),
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
    value:'50  (汚い)',
    style:{
      position:'top-left',
      padding:'0px',
      margin:'15px 0px 0px 40px'
    }
  });
  var label2 = ui.Label({
    value:'40',
    style:{
      position:'top-left',
      padding:'0px',
      margin:'44px 0px 0px 40px'
    }
  });
  var label3 = ui.Label({
    value:'30',
    style:{
      position:'top-left',
      padding:'0px',
      margin:'73px 0px 0px 40px'
    }
  });
  var label4 = ui.Label({
    value:'20',
    style:{
      position:'top-left',
      padding:'0px',
      margin:'102px 0px 0px 40px'
    }
  });
  var label5 = ui.Label({
    value:'10',
    style:{
      position:'top-left',
      padding:'0px',
      margin:'131px 0px 0px 40px'
    }
  });
  var label6 = ui.Label({
    value:'0 (きれい)',
    style:{
      position:'top-left',
      padding:'0px',
      margin:'160px 0px 0px 40px',
      textAlign:'left'
    }
  });
  var icon_legend_arrow = ui.Thumbnail({
    image:legend_arrow.visualize({min:0,max:1,palette:'white,black'}),
    params:{
      dimnesions:'10x120',
      format:'png'
    },
    style:{
      height:'110px',
      width:'30px',
      padding:'0px',
      margin:'40px 0px 0px 60px',
      position:'top-left'
    }
});
  legend_panel.add(label1);
  legend_panel.add(label2);
  legend_panel.add(label3);
  legend_panel.add(label4);
  legend_panel.add(label5);
  legend_panel.add(label6);
  legend_panel.add(icon_legend_arrow);
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
        falseCase:sentinel2.filterDate(date.advance(-3,'day'),date.advance(2,'day')).filterBounds(geometry)
                           .map(maskS2cloud).map(S2addFeature)
                           .median()
      })
    })
  });
  return image;
};
var get_raw_image = function(date,geometry,collection){
  var image = ee.Algorithms.If({
    condition:collection == landsat5,
    trueCase:landsat5.filterDate(date.advance(-8,'day'),date.advance(8,'day')).filterBounds(geometry)
                     .map(raw_L57addFeature).max(),
    falseCase:ee.Algorithms.If({
      condition:collection == landsat7,
      trueCase:landsat7.filterDate(date.advance(-8,'day'),date.advance(8,'day')).filterBounds(geometry)
                       .map(raw_L57addFeature).max(),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat8,
        trueCase:landsat8.filterDate(date.advance(-8,'day'),date.advance(8,'day')).filterBounds(geometry)
                         .map(raw_L8addFeature).max(),
        falseCase:sentinel2.filterDate(date.advance(-3,'day'),date.advance(2,'day')).filterBounds(geometry)
                           .map(raw_S2addFeature).max()
      })
    })
  })
  return image;
};
var vis = {min:0,max:50,palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000'},
    vis_rgb = {min:0,max:0.3,band:['red','green','blue']},
    vis_type = {min:1,max:4,palette:'red,yellow,green,blue'},
    font_size = '16px',
    legend = get_legend(),
    b_color = 'f1f1f1',
    t_border = '1px solid black';
var maskS2cloud = function(image){
  var qa = image.select('QA60'),
      cloudBitMask = 1<<10,
      cirrusBitMask = 1<<11,
      mask = qa.bitwiseAnd(cloudBitMask).eq(0)
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.divide(10000).copyProperties(image, image.propertyNames()); //.updateMask(mask)
};
var maskL578cloud = function(image) {
  var cloudShadowBitMask = (1 << 3),
      cloudsBitMask = (1 << 5),
      qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
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
var L8addFeature = function(image){
  var tss = image.expression(
    '1245*red*red/3.14159/3.14159+(666.1*red/3.14159)+0.4',
    {
      'red':image.select('B4')
    }
    ).rename('tss');
  var mndwi = image.normalizedDifference(['B3','B6']).rename('mndwi');
  return image.addBands(tss).addBands(mndwi)
              .select(['B4','B3','B2','tss','B5','mndwi'],['red','green','blue','tss','nir','mndwi'])
              .copyProperties(image, image.propertyNames()) ;
};
var L57addFeature = function(image){
  var tss = image.expression(
    '1245*red*red/3.14159/3.14159+(666.1*red/3.14159)+0.4',
    {
      'red':image.select('B3')
    }
    ).rename('tss');
  var mndwi = image.normalizedDifference(['B2','B5']).rename('mndwi');
  return image.addBands(tss).addBands(mndwi)
              .select(['B3','B2','B1','tss','B4','mndwi'],['red','green','blue','tss','nir','mndwi'])
              .copyProperties(image, image.propertyNames());
};
var raw_S2addFeature = function(image){
  return image.select(['B4','B3','B2'],['red','green','blue']).divide(10000)
              .copyProperties(image, image.propertyNames());
};
var raw_L8addFeature = function(image){
  return image.select(['B4','B3','B2'],['red','green','blue']).divide(10000)
              .copyProperties(image, image.propertyNames()) ;
};
var raw_L57addFeature = function(image){
  return image.select(['B3','B2','B1'],['red','green','blue']).divide(10000)
              .copyProperties(image, image.propertyNames());
};
var lake_mask =  water_area.select('occurrence').updateMask(inland_water.select('total_obs')).gt(20);
/*
make base layout
*/
ui.root.clear();
var root_panel = ui.Panel(null,null,{stretch:'both'});
ui.root.widgets().set(0,root_panel);
var map = ui.Map();
var drawingtool = ui.Map.DrawingTools({
  linked:false
});
map.add(drawingtool);
map.centerObject(welcome_geometry,10);
map.setControlVisibility({
  fullscreenControl:false
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
root_panel.add(left_panel);
//panel for control
var panel = ui.Panel({
  style:{
    width:'400px',
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
      button_hide_panel.setLabel('コントロールパネルを表示')
    }else{
      button_hide_panel.setLabel('コントロールパネルを隠す')
    }
    panel.style().set('shown',!cat)
  }
})
tool_bar.widgets().set(0,button_hide_panel);
//tool bar 1 clear map
var button_clear_map = ui.Button({
  label:'衛星マップを消す',
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
    map.remove(map.layers().get(0));
    map.remove(map.layers().get(0));
    map.remove(map.layers().get(0));
    legend.style().set('shown',false);
    panel_check.style().set('shown',false);
    label_no_image.style().set('shown',false);
    label_no_good_image.style().set('shown',false);
  }
});
tool_bar.widgets().set(1,button_clear_map);
//tool bar 2，3，4 set coordiantes for center
var text_x = ui.Textbox({
  placeholder:'経度',
  style:{
    position:'top-left',
    padding:'0px',
    width:'100px',
    margin:'0px 0px 0px 315px'
  }
});
var text_y = ui.Textbox({
  placeholder:'緯度',
  style:{
    position:'top-left',
    padding:'0px',
    width:'100px',
    margin:'0px 0px 0px 425px'
  }
});
var button_set_coord = ui.Button({
  label:'⇦ 湖心位置を設定',
  style:{
    position:'top-left',
    padding:'0px',
    width:'105px',
    margin:'-3px 0px 0px 530px'
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
var panel_level_icon = ui.Panel({
  style:{
    position:'top-left',
    padding:'0px',
    width:'400px',
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
    margin:'-5px 0px 0px 270px',
    shown:false
  },
  targetUrl:'mailto:yangwei@chiba-u.jp'
});
var panel_level_icon_divide = ui.Label({
  value:'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
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
    width:'400px',
    height:'210px',
    margin:'100px 0px 0px -10px'
  },
  layout:'absolute'
});
panel.widgets().set(1,panel_select);
//select famous lake
var label_select_lake = ui.Label({
  value:'湖沼を選ぶ:',
  style:{
    position:'top-left',
    fontSize:font_size,
    fontWeight:'bold',
    padding:'0px',
    margin:'0px 10px 0px 20px'
  }
});
var select_lake = ui.Select({
  items:select_lake_item,
  value:select_lake_item[0],
  style:{
    position:'top-left',
    padding:'0px',
    margin:'-5px 0px 0px 140px',
    width:'230px'
  },
  onChange:function(geom){
    if(geom == inbanuma){
      map.centerObject(geom,12);
    }else{
      map.centerObject(geom,10);
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
    margin:'45px 0px 0px 20px',
  }
});
var select_satellite_item = [{label:'Landsat-5 (1985-2011年)',value:landsat5},
         {label:'Landsat-7 (2001-2020年)',value:landsat7},
         {label:'Landsat-8 (2015-2020年)',value:landsat8},
         {label:'Sentinel-2 (2018-2020年)',value:sentinel2}];
var select_satellite = ui.Select({
  items:select_satellite_item,
  value:select_satellite_item[3],
  style:{
    width:'230px',
    padding:'0px',
    margin:'40px 0px 0px 140px',
    position:'top-left'
  },
  onChange:function(name){
    if(name == landsat5){
      panel_select.widgets().set(5,dateslider5);
    }else if(name == landsat7){
      panel_select.widgets().set(5,dateslider7);
    }else if(name == landsat8){
      panel_select.widgets().set(5,dateslider8);
    }else{
      panel_select.widgets().set(5,dateslider2);
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
    margin:'90px 0px 0px 20px',
    position:'top-left'
  }
});
var dateslider5 = ui.DateSlider({
  start:'1985-01-01',
  end:'2011-12-31',
  value:'2010-01-01',
  period:1,
  style:{
    width:'230px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 140px'
  }
});
var dateslider7 = ui.DateSlider({
  start:'2001-01-01',
  end:'2020-12-31',
  value:'2019-01-01',
  period:1,
  style:{
    width:'230px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 140px'
  }
});
var dateslider8 = ui.DateSlider({
  start:'2015-01-01',
  end:'2020-12-31',
  value:'2019-01-01',
  period:1,
  style:{
    width:'230px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 140px'
  }
});
var dateslider = ui.DateSlider({
  start:'2018-01-01',
  end:'2020-12-31',
  value:'2019-01-01',
  period:1,
  style:{
    width:'230px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 140px'
  }
});
var dateslider2 = ui.DateSlider({
  start:'2018-01-01',
  end:'2020-12-31',
  value:'2019-01-01',
  period:1,
  style:{
    width:'230px',
    position:'top-left',
    padding:'0px',
    margin:'90px 0px 0px 140px'
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
var label_no_good_image = ui.Label({
  value:'この期間の雲なし画像はありません。',
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
    height:'200px',
    margin:'100px 0px 0px -20px',
    backgroundColor:'ffca7a',
    shown:false
  },
  layout:'absolute'
});
var label_check_str_0 = ui.Label({
  value:'水質:',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'0px 0px 0px 0px',
    backgroundColor:'ffca7a',
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
    backgroundColor:'ffca7a',
    fontSize:'20px',
    fontFamily:'serif'
  }
});
var label_check_str_1 = ui.Label({
  value:'診断:',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'50px 0px 0px 0px',
    backgroundColor:'ffca7a',
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
    backgroundColor:'ffca7a',
    fontSize:'20px',
    fontFamily:'serif'
  }
});
var icon_smile = ui.Thumbnail({
  image:smile_icon.visualize({min:0,max:255,bands:['b1','b2','b3']}),
  params:{
    dimnesions:'420x420',
    format:'png'
  },
  style:{
    height:'100px',
    width:'100px',
    padding:'0px',
    margin:'90px 0px 0px 10px',
    position:'top-left',
    shown:false
  }
});
var icon_cry = ui.Thumbnail({
  image:cry_icon.visualize({min:0,max:255,bands:['b1','b2','b3']}),
  params:{
    dimnesions:'420x420',
    format:'png'
  },
  style:{
    height:'100px',
    width:'100px',
    padding:'0px',
    margin:'90px 0px 0px 10px',
    position:'top-left',
    shown:false
  }
});
panel_check.widgets().set(0,label_check_str_0);
panel_check.widgets().set(1,label_check_value_0);
panel_check.widgets().set(2,label_check_str_1);
panel_check.widgets().set(3,label_check_value_1);
panel_check.widgets().set(4,icon_smile);
panel_check.widgets().set(5,icon_cry);
map.widgets().set(0,label_no_image);
map.widgets().set(1,label_no_good_image);
map.widgets().set(2,legend);
map.widgets().set(3,panel_check);
var button_ok_show_image = ui.Button({
  label:'TSS分布図を表示',
  style:{
    position:'top-left',
    width:'100px',
    padding:'0px',
    margin:'120px 0px 0px 20px'
  },
  onClick:function(){
    panel_check.style().set('shown',false);
    dateslider = panel_select.widgets().get(5);
    var start_date = ee.Date(dateslider.getValue()[0]),
        end_date = ee.Date(dateslider.getValue()[1]),
        collection = select_satellite.getValue(),
        geometry = ee.Geometry.Rectangle(map.getBounds()),
        image = ee.Image(get_image(start_date,geometry,collection)),
        raw_image = ee.Image(get_raw_image(start_date,geometry,collection)),
        raw_image_mosaic = ee.ImageCollection.fromImages([raw_image,image.select('red','green','blue')]).mosaic(),
        raw_band_size = raw_image.bandNames().size(),
        band_size = image.bandNames().size();
    var layer_image = ee.Image(ee.Algorithms.If({
      condition:band_size.neq(0),
      trueCase:image.updateMask(lake_mask).updateMask(image.select('blue').lt(0.15)), 
                  //.updateMask(image.select('mndwi').gt(0)),.updateMask(image.select('nir').lt(0.075))
      falseCase:ee.Image.constant(1).select(['constant'],['tss'])
                                    .clip(waste_mask)
    }));
    var raw_layer_image = ee.Image(ee.Algorithms.If({
      condition:band_size.neq(0),
      trueCase:raw_image_mosaic.updateMask(lake_mask),
      falseCase:ee.Algorithms.If({
        condition:raw_band_size.neq(0),
        trueCase:raw_image,
        falseCase:ee.Image.constant(1).select(['constant'],['tss'])
                                    .clip(waste_mask)
      })
    }));
    var layer = ui.Map.Layer(layer_image.select('tss'),vis,'懸濁物濃度(TSS)'),
        layer_rgb = ui.Map.Layer(layer_image,vis_rgb,'雲なし画像'),
        layer_raw_rgb = ui.Map.Layer(raw_layer_image,vis_rgb,'生データ');
    label_no_image.style().set('shown',ee.Algorithms.If({
      condition:raw_band_size.eq(0),
      trueCase:1,
      falseCase:0
    }).getInfo());
    label_no_good_image.style().set('shown',ee.Algorithms.If({
      condition:band_size.eq(0).and(raw_band_size.neq(0)),
      trueCase:1,
      falseCase:0
    }).getInfo());
    map.layers().set(0,layer_raw_rgb);
    map.layers().set(1,layer_rgb);
    map.layers().set(2,layer);
    legend.style().set('shown',true);
  }
});
var button_check_value = ui.Button({
  label:'TSSの値を確認',
  style:{
    position:'top-left',
    width:'100px',
    padding:'0px',
    margin:'150px 0px 0px 20px',
  },
  onClick:function(){
    var cat_padding = button_check_value.style().get('padding');
    if(cat_padding == '0px'){
      button_check_value.style().set('padding','1px 2px 1px 2px');
      button_check_value.style().set('backgroundColor','black');
      map.style().set('cursor','crosshair');
      map.onClick(function(mouse){
        icon_smile.style().set('shown',false);
        icon_cry.style().set('shown',false);
        label_check_value_0.setValue('計算中');
        label_check_value_1.setValue('計算中');
        var lon = mouse.lon,
            lat = mouse.lat,
            m_point = ee.Geometry.Point(lon,lat),
            tss = map.layers().get(2).getEeObject()
                  .reduceRegion({
                    reducer:ee.Reducer.first(),
                    geometry:m_point,
                    scale:10
                  }).get('tss'),
            v = ee.Number(tss);
        var show_value = function(){
          var cat_icon_smile = ee.Algorithms.If({
            condition:v.lt(32),
            trueCase:1,
            falseCase:0
          }).getInfo();
          icon_smile.style().set('shown',cat_icon_smile);
          icon_cry.style().set('shown',!cat_icon_smile);
          var value_0 = ee.Algorithms.If({
            condition:v.lt(1),
            trueCase:'AA (秀)',
            falseCase:ee.Algorithms.If({
              condition:v.lt(5),
              trueCase:'A (優)',
              falseCase:ee.Algorithms.If({
                condition:v.lt(15),
                trueCase:'B (良)',
                falseCase:ee.Algorithms.If({
                  condition:v.lt(60),
                  trueCase:'C (可)',
                  falseCase:'D (ひどい)'
                })
              })
            })
          }).getInfo();
          label_check_value_0.setValue(tss.getInfo().toFixed(2));
          label_check_value_1.setValue(value_0);
          label_cal.style().set('shown',false);
        };
        ui.util.setTimeout(show_value,300);
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
  value:'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
  style:{
    position:'top-left',
    padding:'0px',
    margin:'180px 0px 0px 0px'
  }
})
panel_select.widgets().set(0,label_select_lake);
panel_select.widgets().set(1,select_lake);
panel_select.widgets().set(2,label_select_satellite);
panel_select.widgets().set(3,select_satellite);
panel_select.widgets().set(4,label_slide_date);
panel_select.widgets().set(5,dateslider);
panel_select.widgets().set(6,button_ok_show_image);
panel_select.widgets().set(7,panel_select_divide);
panel_select.widgets().set(8,button_check_value);
map.onChangeBounds(function(){
  label_no_image.style().set('shown',false);
  label_no_good_image.style().set('shown',false);
})
/*
level4 show function
*/
var panel_show_function = ui.Panel({
  style:{
    position:'top-left',
    padding:'0px',
    margin:'300px 0px 0px -10px',
    width:'400px',
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
  }
});
panel_show_function.widgets().set(0,label_select_function);
panel_show_function.widgets().set(1,button_show_gif)
panel_show_function.widgets().set(2,button_show_plot)
/*
function gif
*/
var l5_year = ee.List.sequence(1985,2009,1),
    l7_year = ee.List.sequence(2001,2020,1),
    l8_year = ee.List.sequence(2015,2020,1),
    s2_year = ee.List.sequence(2019,2020,1);
var panel_4_0 = ui.Panel({
  layout:'absolute',
  style:{
    position:'top-left',
    height:'400px',
    width:'400px',
    backgroundColor:'f7f7f7',
    margin:'354px 0px 0px -10px',
    shown:false
  }
});
var panel_4_0_0 = ui.Panel({
  style:{
    position:'top-left',
    width:'400px',
    height:'300px',
    padding:'0px',
    margin:'460px 0px 0px -10px',
    shown:false
  }
});
panel.widgets().set(3,panel_4_0);
panel.widgets().set(4,panel_4_0_0);
var select_gif_type = ui.Select({
  items:[{label:'毎年の春',value:3},{label:'毎年の夏',value:6},{label:'毎年の秋',value:9},
         {label:'毎年の冬',value:12}],
  placeholder:'季節を指定',
  style:{
    width:'140px',
    position:'top-left',
    padding:'0px',
    margin:'10px 0px 0px 10px'
  }
});
var button_gif_ok = ui.Button({
  label:'OK',
  style:{
    width:'140px',
    position:'top-left',
    padding:'0px',
    margin:'40px 0px 0px 10px'
  },
  onClick:function(){
    panel_4_0_0.style().set('shown',true)
    var collection = select_satellite.getValue(),
        bound = map.getBounds(),
        scale = map.getScale()*3,
        geo = ee.Geometry.Rectangle(bound),
        top_left_corner = ee.Geometry.Point([bound[0],bound[3]]),
        start_month = select_gif_type.getValue();
    var str_season = ee.Algorithms.If({
      condition:start_month == 3,
      trueCase:ee.String(' Spring'),
      falseCase:ee.Algorithms.If({
        condition:start_month == 6,
        trueCase:ee.String(' Summer'),
        falseCase:ee.Algorithms.If({
          condition:start_month == 9,
          trueCase:ee.String(' Fall'),
          falseCase:ee.String('Winter')
        })
      })
    });
    var gif_collection = ee.Algorithms.If({
      condition:collection == landsat5,
      trueCase:l5_year.map(function(year){
        year = ee.Number(year).toInt();
        var s_date = ee.Date.fromYMD(year,start_month,1),
            e_date = s_date.advance(3,'month'),
            str = ee.String('aLandsat-5 ').cat(ee.String(year)).cat(str_season),
            text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
            con = ee.Image.constant(1000).updateMask(text.select(0)).rename('tss'),
            img = landsat5.filterDate(s_date,e_date).filterBounds(geo)
                          .map(maskL578cloud).map(L57addFeature)
                          .median().mask(lake_mask).clip(geo).select('tss');
        var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
        f_img = f_img.set('year',year);
        f_img = f_img.set('system:time_start',ee.String(year));
        return f_img;
      }),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat7,
        trueCase:l7_year.map(function(year){
          year = ee.Number(year).toInt();
          var s_date = ee.Date.fromYMD(year,start_month,1),
              e_date = s_date.advance(3,'month'),
              str = ee.String('aLandsat-7 ').cat(ee.String(year)).cat(str_season),
              text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
              con = ee.Image.constant(1000).updateMask(text.select(0)).rename('tss'),
              img = landsat7.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskL578cloud).map(L57addFeature)
                            .median().mask(lake_mask).clip(geo).select('tss');
          var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
          f_img = f_img.set('year',year);
          f_img = f_img.set('system:time_start',ee.String(year));
          return f_img;
        }),
        falseCase:ee.Algorithms.If({
          condition:collection == landsat8,
          trueCase:l8_year.map(function(year){
            year = ee.Number(year).toInt();
            var s_date = ee.Date.fromYMD(year,start_month,1),
                e_date = s_date.advance(3,'month'),
                str = ee.String('aLandsat-8 ').cat(ee.String(year)).cat(str_season),
                text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                con = ee.Image.constant(1000).updateMask(text.select(0)).rename('tss'),
                img = landsat8.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskL578cloud).map(L8addFeature)
                              .median().mask(lake_mask).clip(geo).select('tss');
            var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
            f_img = f_img.set('year',year);
            f_img = f_img.set('system:time_start',ee.String(year));
            return f_img;
          }),
          falseCase:s2_year.map(function(year){
            year = ee.Number(year).toInt();
            var s_date = ee.Date.fromYMD(year,start_month,1),
                e_date = s_date.advance(3,'month'),
                str = ee.String('aSentinel-2 ').cat(ee.String(year)).cat(str_season),
                text = Text.draw(str,top_left_corner,scale, {fontSize:18}),
                con = ee.Image.constant(1000).updateMask(text.select(0)).rename('tss'),
                img = sentinel2.filterDate(s_date,e_date).filterBounds(geo)
                              .map(maskS2cloud).map(S2addFeature)
                              .median().mask(lake_mask).clip(geo).select('tss');
            var f_img = ee.ImageCollection.fromImages([img,con]).mosaic();
            f_img = f_img.set('year',year);
            f_img = f_img.set('system:time_start',ee.String(year));
            return f_img;
          })
        })
      })
    });
    var gif_col = ee.ImageCollection.fromImages(gif_collection);
    var gif_params = {
      crs:'EPSG:32654',
      framesPerSecond: 0.8, 
      region:geo,
      min:0,
      max:60,
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
panel_4_0.widgets().set(0,select_gif_type);
panel_4_0.widgets().set(1,button_gif_ok,select_gif_type);
/*
function plot
*/
var panel_4_1 = ui.Panel({
  layout:'absolute',
  style:{
    position:'top-left',
    height:'140px',
    width:'400px',
    backgroundColor:'f7f7f7',
    margin:'354px 0px 0px -10px',
    shown:false
  }
});
var panel_4_1_1 = ui.Panel({
  style:{
    position:'top-left',
    height:'240px',
    width:'400px',
    padding:'0px',
    margin:'490px 0px 0px -10px',
    shown:false
  }
});
panel.widgets().set(5,panel_4_1);
panel.widgets().set(6,panel_4_1_1);
var label_for_button_select_plot_point = ui.Label({
  value:'ウィンドウ内の赤いラベルをクリックして移動するか、ボタンを使用して移動します。',
  style:{
    fontSize:'10px',
    width:'200px',
    position:'top-left',
    padding:'0px',
    margin:'0px 0px 0px 165px',
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
    margin:'30px 0px 0px 280px'
  }
});
var button_move_point_up = ui.Button({
  label:'⇧  ',
  style:{
    position:'top-left',
    width:'60px',
    padding:'0px',
    margin:'33px 0px 0px 210px',
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
    margin:'64px 0px 0px 240px',
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
    margin:'94px 0px 0px 210px',
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
    margin:'64px 0px 0px 180px',
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
    margin:'10px 0px 0px 10px'
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
    panel_4_1.widgets().set(3,label_for_button_select_plot_point);
    panel_4_1.widgets().set(4,button_move_point_up);
    panel_4_1.widgets().set(5,button_move_point_right);
    panel_4_1.widgets().set(6,button_move_point_left);
    panel_4_1.widgets().set(7,button_move_point_down);
    panel_4_1.widgets().set(8,select_move_point_speed);
  }
});
var select_plot_type = ui.Select({
  items:[{label:'毎年の春',value:3},{label:'毎年の夏',value:6},{label:'毎年の秋',value:9},
         {label:'毎年の冬',value:12},{label:'毎日',value:1}],
  placeholder:'タイプを選択',
  style:{
    width:'140px',
    position:'top-left',
    padding:'0px',
    margin:'50px 0px 0px 10px'
  }
});
//********************************************
var get_collection = function(collection,start_month,geo){
  var image_collection = ee.ImageCollection.fromImages(ee.Algorithms.If({
    condition:collection == landsat5,
    trueCase:l5_year.map(function(year){
      year = ee.Number(year);
      var s_date = ee.Date.fromYMD(year,start_month,1),
          e_date = s_date.advance(3,'month'),
          img = landsat5.filterDate(s_date,e_date).filterBounds(geo)
                .map(maskL578cloud).map(L57addFeature)
                .median().mask(lake_mask).select('tss');
      img = img.set('system:time_start',s_date);
      return img;
    }),
    falseCase:ee.Algorithms.If({
      condition:collection == landsat7,
      trueCase:l7_year.map(function(year){
        year = ee.Number(year);
        var s_date = ee.Date.fromYMD(year,start_month,1),
            e_date = s_date.advance(3,'month'),
            img = landsat7.filterDate(s_date,e_date).filterBounds(geo)
                          .map(maskL578cloud).map(L57addFeature)
                          .median().mask(lake_mask).select('tss');
        img = img.set('system:time_start',s_date);
        return img;
      }),
      falseCase:ee.Algorithms.If({
        condition:collection == landsat8,
        trueCase:l8_year.map(function(year){
          year = ee.Number(year);
          var s_date = ee.Date.fromYMD(year,start_month,1),
              e_date = s_date.advance(3,'month'),
              img = landsat8.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskL578cloud).map(L8addFeature)
                            .median().mask(lake_mask).select('tss');
          img = img.set('system:time_start',s_date);
          return img;
        }),
        falseCase:s2_year.map(function(year){
          year = ee.Number(year);
          var s_date = ee.Date.fromYMD(year,start_month,1),
              e_date = s_date.advance(3,'month'),
              img = sentinel2.filterDate(s_date,e_date).filterBounds(geo)
                            .map(maskS2cloud).map(S2addFeature)
                            .median().mask(lake_mask).select('tss');
          img = img.set('system:time_start',s_date);
          return img;
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
    margin:'90px 0px 0px 10px'
  },
  onClick:function(){
    panel_4_1_1.style().set('shown',true);
    var collection = select_satellite.getValue(),
        geo = drawingtool.layers().get(0).toGeometry(),
        start_month = select_plot_type.getValue();
    var plot_collection = ee.Algorithms.If({
      condition:start_month==3,
      trueCase:get_collection(collection,start_month,geo),
      falseCase:ee.Algorithms.If({
        condition:start_month == 6,
        trueCase:get_collection(collection,start_month,geo),
        falseCase:ee.Algorithms.If({
          condition:start_month == 9,
          trueCase:get_collection(collection,start_month,geo),
          falseCase:ee.Algorithms.If({
            condition:start_month == 12,
            trueCase:get_collection(collection,start_month,geo),
            falseCase:ee.Algorithms.If({
              condition:collection == landsat5,
              trueCase:landsat5.filterDate('1985-01-01','2010-01-01')
                               .filterBounds(geo)
                               .map(maskL578cloud).map(L57addFeature).select('tss'),
              falseCase:ee.Algorithms.If({
                condition:collection == landsat7,
                trueCase:landsat7.filterDate('2001-01-01','2021-01-01')
                                 .filterBounds(geo)
                                 .map(maskL578cloud).map(L57addFeature).select('tss'),
                falseCase:ee.Algorithms.If({
                  condition:collection == landsat8,
                  trueCase:landsat8.filterDate('2015-01-01','2021-01-01')
                                   .filterBounds(geo)
                                   .map(maskL578cloud).map(L8addFeature).select('tss'),
                  falseCase:sentinel2.filterDate('2019-01-01','2021-01-01')
                                     .filterBounds(geo)
                                     .map(maskS2cloud).map(S2addFeature).select('tss')
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
    }).setSeriesNames(['TSS'])
      .setOptions({
        title:'懸濁物濃度（TSS）',
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