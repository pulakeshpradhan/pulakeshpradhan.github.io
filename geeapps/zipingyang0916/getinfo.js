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
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([140.22393414590601, 35.78138263752787]),
    welcome_point = ui.import && ui.import("welcome_point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            140.28161236856224,
            35.76745532254634
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
    ee.Geometry.Point([140.28161236856224, 35.76745532254634]);
Map.centerObject(welcome_point,12);
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
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
};
Map.addLayer(ee.Image(1),{palette:'a7a8bd'},'welcome');
var text = Text.draw('awelcome',inbanuma,250, {fontSize:18});
Map.addLayer(text,{},'welcome_text');
var panel = ui.Panel({
  style:{
    width:'200px',
    height:'200px',
    position:'middle-left',
    backgroundColor:'f8df72'
  }
});
ui.root.setLayout(ui.Panel.Layout.absolute());
var button = ui.Button({
  label:'begin',
  style:{
    position:'middle-left',
    backgroundColor:'a7a8bd'
  },
  onClick:function(){
    removeLayer('welcome_text');
    removeLayer('welcome');
    panel.remove(button);
    ui.root.remove(button)
    ui.root.add(panel);
  }
})
ui.root.add(button)
var bg_color = 'f8df72'
var placeholder1 = ui.Label('----');
placeholder1.style().set('color',bg_color);
var placeholder2 = ui.Label('----');
placeholder2.style().set('color',bg_color);
var lon = ui.Label({
  style:{
    color:'blue',
    backgroundColor:bg_color,
    fontSize:'15px'
  }
});
var lat = ui.Label({
  style:{
    color:'red',
    backgroundColor:bg_color,
    fontSize:'15px'
  }
});
panel.add(ui.Label({
  value:'longitude:',
  style:{
    fontSize:'15px',fontWeight:'bold',color:'black',backgroundColor:bg_color
  }
}))
panel.add(lon)
panel.add(ui.Label({
  value:'latitude:',
  style:{
    fontSize:'15px',fontWeight:'bold',color:'black',backgroundColor:bg_color
  }
}))
panel.add(lat)
Map.onClick(function(mouse){
  lon.setValue(mouse.lon.toFixed(4));
  lat.setValue(mouse.lat.toFixed(4));
});
Map.style().set('cursor', 'crosshair')