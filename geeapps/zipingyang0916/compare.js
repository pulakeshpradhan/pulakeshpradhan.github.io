var inbanuma = ui.import && ui.import("inbanuma", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            140.22393414590601,
            35.78138263752787
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([140.22393414590601, 35.78138263752787]),
    welcome_point = ui.import && ui.import("welcome_point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            140.29465863321067,
            35.77191232873836
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([140.29465863321067, 35.77191232873836]),
    sentinel2 = ui.import && ui.import("sentinel2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    water_area = ui.import && ui.import("water_area", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater"),
    inland_water = ui.import && ui.import("inland_water", "image", {
      "id": "JRC/GSW1_2/Metadata"
    }) || ee.Image("JRC/GSW1_2/Metadata"),
    choose_geometry = ui.import && ui.import("choose_geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            140.18342206094505,
            35.77831883753071
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([140.18342206094505, 35.77831883753071]);
ui.root.clear();
var Text = {
  draw: function (text, pos, scale, props) {
    text = ee.String(text)
    var ascii = {};
    for (var i = 32; i < 128; i++) {
        ascii[String.fromCharCode(i)] = i;
    }
    ascii = ee.Dictionary(ascii);
    var fontSize = '16';
    if(props && props.fontSize) {
      fontSize = props.fontSize
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
    textImage = textImage.mask(textImage)
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
        .visualize({opacity:props.textOpacity, palette: [props.textColor], forceRgbOutput:true})
      if(props.textWidth > 1) {
        textLine.focal_max(props.textWidth)
      }
      if(!props || (props && !props.outlineWidth)) {
        return textLine;
      }
      var textOutline = textImage.focal_max(props.outlineWidth)
        .visualize({opacity:props.outlineOpacity, palette: [props.outlineColor], forceRgbOutput:true})
      return ee.ImageCollection.fromImages(ee.List([textOutline, textLine])).mosaic()
    } else {
      return textImage;
    }
  }
};
var removeLayer = function(name){
  var layers = map.layers()
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    map.remove(layer)
  }
};
var get_legend = function(){
  var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 15px'
  }});
  var legendTitle = ui.Label({
  value: 'Reflection',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
  }});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '4px',
          margin: '0 0 2px 0'
        }});
      var description = ui.Label({
        value: name,
        style: {
          margin: '0 0 2px 4px',
          fontSize:'10px'
        }
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });},
    palette =['FF0000','FF7F00','FFFF00','00FF00','00FFFF','0000FF'],
    names = ['0.25 - 0.30','0.20 - 0.25','0.15 - 0.20','0.10 - 0.15','0.05 - 0.10','0 - 0.05'];
  for (var i = 0; i < 6; i++) {
    legend.add(makeRow(palette[i], names[i]));}  
  return legend
};
var get_legend_ndvi = function(){
  var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 15px'
  }});
  var legendTitle = ui.Label({
  value: 'NDVI',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
  }});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '4px',
          margin: '0 0 2px 0'
        }});
      var description = ui.Label({
        value: name,
        style: {
          margin: '0 0 2px 4px',
          fontSize:'10px'
        }
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });},
    palette =['FF0000','FF7F00','FFFF00','00FF00','00FFFF','0000FF'],
    names = ['0.82 - 1','0.66 - 0.82','0.50 - 0.66','0.34 - 0.50','0.17 - 0.34','0 - 0.17'];
  for (var i = 0; i < 6; i++) {
    legend.add(makeRow(palette[i], names[i]));}  
  return legend
};
var maskS2cloud = function(image){
  var qa = image.select('QA60'),
      cloudBitMask = 1<<10,
      cirrusBitMask = 1<<11,
      mask = qa.bitwiseAnd(cloudBitMask).eq(0)
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, image.propertyNames());
};
var addFeature = function(image){
  var ndvi = image.normalizedDifference(['NIR','red']).rename('NDVI');
  return image.addBands(ndvi).copyProperties(image, image.propertyNames()) ;
};
var map = ui.Map(),
    welcome_color = 'a7a8bd',
    image_1 = ee.Image.constant(1),
    text = Text.draw('awelcome',inbanuma,250, {fontSize:18}),
    welcome = ui.Map.Layer(image_1,{palette:welcome_color},'welcome'),
    welcome_text = ui.Map.Layer(text,{},'welcome_text'),
    link_map = ui.Map(),
    linker = ui.Map.Linker([map,link_map]),
    vis03 = {min:0,max:0.3,palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000'},
    vis1 = {min:0,max:1,palette:'0000FF,00FFFF,00FF00,FFFF00,FF7F00,FF0000'},
    lake_mask =  water_area.select('occurrence').updateMask(inland_water.select('total_obs')).gt(20),
    s_bands = ['B2','B3','B4','B8','B11','QA60'],
    s_names = ['blue','green','red','NIR','SWIR','QA60'],
    legend1 = get_legend(),
    legend1_ndvi = get_legend_ndvi(),
    legend2 = get_legend(),
    legend2_ndvi = get_legend_ndvi();
var get_collection = function(geometry){
  var months = ee.List([3,6,9,12]),
      season = months.map(function(month){
        var start = ee.Date.fromYMD(2019,month,1),
            end = start.advance(3,'month'),
            image = sentinel2.filterDate(start,end).filterBounds(geometry)
                             .select(s_bands,s_names)
                             .map(maskS2cloud).map(addFeature).mean().updateMask(lake_mask);
        return image;
      });
    return season;
};
var season_dict = ee.Dictionary({
  spring:0,
  summer:1,
  fall:2,
  winter:3        
});
var split_panel = ui.SplitPanel({
  firstPanel:linker.get(0),
  secondPanel:linker.get(1),
  orientation:'horizontal',
  wipe:true,
  style:{
    stretch:'both',
    position:'top-left'
  }
});
var link_removeLayer = function(name){
    var layers = link_map.layers(),
        names = [];
    layers.forEach(function(lay){
      var lay_name = lay.getName();
      names.push(lay_name);
    });
    var index = names.indexOf(name);
    if(index > -1){
      var layer = layers.get(index);
      link_map.remove(layer);
    }
};
var label_season_left = ui.Label({value:'winter'}),
    label_season_right = ui.Label({value:'summer'}),
    label_band_left = ui.Label({value:'red'}),
    label_band_right = ui.Label({value:'red'})
var button_compare = ui.Button({
  label:'Compare',
  style:{
    width:'70px',
    position:'bottom-center',
    backgroundColor:welcome_color,
    padding:'0px'
  },
  onClick:function(){
    map.clear();
    var dataset = get_collection(inbanuma),
        left_image = ee.Image(dataset.get(season_dict.get(label_season_left.getValue()))),
        left_band = label_band_left.getValue(),
        left_layer = ui.Map.Layer(left_image.select(left_band),vis03,'winter'),
        right_image = ee.Image(dataset.get(season_dict.get(label_season_right.getValue()))),
        right_band = label_band_right.getValue(),
        right_layer = ui.Map.Layer(right_image.select(right_band),vis03,'summer');
    var select_season_left = ui.Select({
      items:['spring','summer','fall','winter'],
      value:'winter',
      style:{
        padding:'0px',
        position:'middle-left',
        width:'90px'
      },
      onChange:function(season){
        var geometry = map.getCenter();
        dataset = get_collection(geometry)
        label_season_left.setValue(season)
        var left_image = ee.Image(dataset.get(season_dict.get(label_season_left.getValue()))),
            left_band = label_band_left.getValue();
        if(left_band == 'NDVI'){
          left_layer = ui.Map.Layer(left_image.select(left_band),vis1,season);
          map.widgets().set(0,legend1_ndvi);
        }else{
          left_layer = ui.Map.Layer(left_image.select(left_band),vis03,season);
          map.widgets().set(0,legend1);
        }
      map.layers().set(0,left_layer)
      }
    });
    var select_season_right = ui.Select({
      items:['spring','summer','fall','winter'],
      value:'summer',
      style:{
        padding:'0px',
        position:'middle-right',
        width:'90px'
      },
      onChange:function(season){
        var geometry = map.getCenter();
        dataset = get_collection(geometry)
        label_season_right.setValue(season)
        var right_image = ee.Image(dataset.get(season_dict.get(label_season_right.getValue()))),
            right_band = label_band_right.getValue();
        if(right_band == 'NDVI'){
          right_layer = ui.Map.Layer(right_image.select(right_band),vis1,season);
          link_map.widgets().set(0,legend2_ndvi);
        }else{
          right_layer = ui.Map.Layer(right_image.select(right_band),vis03,season);
          link_map.widgets().set(0,legend2);
        }
      link_map.layers().set(0,right_layer)
      }
    });
    var select_band_left = ui.Select({
      items:['red','green','blue','NIR','NDVI'],
      value:'red',
      style:{
        padding:'0px',
        position:'middle-left',
        width:'90px'
      },
      onChange:function(band){
        var geometry = map.getCenter();
        dataset = get_collection(geometry)
        label_band_left.setValue(band);
        var left_image = ee.Image(dataset.get(season_dict.get(label_season_left.getValue())));
        if(band == 'NDVI'){
          left_layer = ui.Map.Layer(left_image.select(band),vis1,band);
          map.widgets().set(0,legend1_ndvi);
        }else{
          left_layer = ui.Map.Layer(left_image.select(band),vis03,band);
          map.widgets().set(0,legend1);
        }
        map.layers().set(0,left_layer)
      }
    });
    var select_band_right = ui.Select({
      items:['red','green','blue','NIR','NDVI'],
      value:'red',
      style:{
        padding:'0px',
        position:'middle-right',
        width:'90px'
      },
      onChange:function(band){
        var geometry = map.getCenter();
        dataset = get_collection(geometry)
        label_band_right.setValue(band);
        var right_image = ee.Image(dataset.get(season_dict.get(label_season_right.getValue())));
        if(band == 'NDVI'){
          right_layer = ui.Map.Layer(right_image.select(band),vis1,band);
          link_map.widgets().set(0,legend2_ndvi);
        }else{
          right_layer = ui.Map.Layer(right_image.select(band),vis03,band);
          link_map.widgets().set(0,legend2);
        }
        link_map.layers().set(0,right_layer);
      }
    });
    ui.root.widgets().reset([split_panel]);
    map.add(legend1);
    link_map.add(legend2);
    map.layers().set(0,left_layer);
    link_map.layers().set(0,right_layer);
    map.add(select_season_left);
    link_map.add(select_season_right);
    map.add(select_band_left);
    link_map.add(select_band_right);
    map.add(home);
    link_map.add(home2);
  }
});
var button_gif = ui.Button({
  label:'GIF',
  style:{
    width:'70px',
    position:'bottom-center',
    backgroundColor:welcome_color,
    padding:'0px'
  },
  onClick:function(){
    map.clear();
    map.add(home);
    var select_band = ui.Select({
      items:['red','green','blue','NIR','NDVI'],
      placeholder:'select band',
      style:{
        position:'middle-left',
        padding:'0px',
        width:'90px'
      },
      onChange:function(band){
        map.clear();
        map.add(home);
        map.add(select_band);
        var geometry = map.getCenter(),
            dataset = get_collection(geometry),
            spring = ee.Image(dataset.get(0)).select(band),
            summer = ee.Image(dataset.get(1)).select(band),
            fall = ee.Image(dataset.get(2)).select(band),
            winter = ee.Image(dataset.get(3)).select(band),
            scale = map.getScale() * 4,
            delay = 1500,
            t_spring = Text.draw('wSpring',geometry,scale,{fontSize:18}),
            t_summer = Text.draw('wSummer',geometry,scale,{fontSize:18}),
            t_fall = Text.draw('wFall',geometry,scale,{fontSize:18}),
            t_winter = Text.draw('wWinter',geometry,scale,{fontSize:18});
        if(band == 'NDVI'){
          var vis = vis1;
          map.add(legend1_ndvi);
        }else{
          vis = vis03;
          map.add(legend1);
        }
        var l4 = map.addLayer(winter.select(band),vis,'winter'),
            t4 = map.addLayer(t_winter,{},'t_winter'),
            l3 = map.addLayer(fall.select(band),vis,'fall'),
            t3 = map.addLayer(t_fall,{},'t_fall'),
            l2 = map.addLayer(summer.select(band),vis,'summer'),
            t2 = map.addLayer(t_summer,{},'t_summer'),
            l1 = map.addLayer(spring.select(band),vis,'spring'),
            t1 = map.addLayer(t_spring,{},'t_spring');
        var set0 = function(){
          var s0 = function(){
            l1.setOpacity(1);
            t1.setOpacity(1);
            l2.setOpacity(0);
            t2.setOpacity(0);
            l3.setOpacity(0);
            t3.setOpacity(0);
            l4.setOpacity(0);
            t4.setOpacity(0);
          };
          ui.util.setTimeout(s0, delay);
        };
        var set1 = function(){
          var s1 = function(){
            l1.setOpacity(0);
            t1.setOpacity(0);
            l2.setOpacity(1);
            t2.setOpacity(1);
            l3.setOpacity(0);
            t3.setOpacity(0);
            l4.setOpacity(0);
            t4.setOpacity(0);
          };
          ui.util.setTimeout(s1, delay*2);
        };
        var set2 = function(){
          var s2 = function(){
            l1.setOpacity(0);
            t1.setOpacity(0);
            l2.setOpacity(0);
            t2.setOpacity(0);
            l3.setOpacity(1);
            t3.setOpacity(1);
            l4.setOpacity(0);
            t4.setOpacity(0);
          };
          ui.util.setTimeout(s2, delay*3);
        };
        var set3 = function(){
          var s3 = function(){
            l1.setOpacity(0);
            t1.setOpacity(0);
            l2.setOpacity(0);
            t2.setOpacity(0);
            l3.setOpacity(0);
            t3.setOpacity(0);
            l4.setOpacity(1);
            t4.setOpacity(1);
          };
          ui.util.setTimeout(s3, delay*4);
        };
        ui.util.setInterval(set0,  delay*4);
        ui.util.setInterval(set1,  delay*4);
        ui.util.setInterval(set2,  delay*4);
        ui.util.setInterval(set3,  delay*4);
      }
    });
    map.add(select_band);
  }
});
var home = ui.Button({
  label:'home',
  style:{
    width:'70px',
    position:'bottom-center',
    backgroundColor:welcome_color,
    padding:'0px'
  },
  onClick:function(){
    map.clear();
    link_map.clear();
    ui.root.clear();
    ui.root.add(map);
    map.setControlVisibility({all:false});
    map.layers().set(0,welcome);
    map.layers().set(1,welcome_text);
    map.add(button_compare);
    map.add(home);
    map.add(button_gif);
  }
});
var home2 = ui.Button({
  label:'home',
  style:{
    width:'70px',
    position:'bottom-center',
    backgroundColor:welcome_color,
    padding:'0px'
  },
  onClick:function(){
    map.clear();
    link_map.clear();
    ui.root.clear();
    ui.root.add(map);
    map.setControlVisibility({all:false});
    map.layers().set(0,welcome);
    map.layers().set(1,welcome_text);
    map.add(button_compare);
    map.add(home);
    map.add(button_gif);
  }
});
ui.root.add(map);
map.centerObject(welcome_point,11);
map.setControlVisibility({
  all:false
});
map.layers().set(0,welcome);
map.layers().set(1,welcome_text);
map.add(button_compare);
map.add(home);
map.add(button_gif);
print(map.widgets())