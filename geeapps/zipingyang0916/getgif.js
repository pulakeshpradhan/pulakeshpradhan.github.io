var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            140.67326072776052,
            40.8450218805867
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
    ee.Geometry.Point([140.67326072776052, 40.8450218805867]);
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
}
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
    print('')
  }
}
function setpro(image){
  var time_start = image.get('system:time_start');
  return image.set('system:time_start',time_start);
}
var delay = 1500
Map.centerObject(geometry,12)
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var sentinel1 = ee.ImageCollection('COPERNICUS/S2').filterDate('2018-05-01', '2018-09-01')
.map(maskS2clouds).select('B2','B3','B4');
var sentinel2 = ee.ImageCollection('COPERNICUS/S2').filterDate('2019-05-01', '2019-09-01')
.map(maskS2clouds).select('B2','B3','B4');
var sentinel3 = ee.ImageCollection('COPERNICUS/S2').filterDate('2020-05-01', '2020-09-01')
.map(maskS2clouds).select('B2','B3','B4');
Map.onClick(function(mouse){
  removeLayer('t1')
  removeLayer('t2')
  removeLayer('t3')
  removeLayer('sen')
  removeLayer('sen2')
  removeLayer('sen3')
  var lon = ee.Number(mouse.lon)
  var lat = ee.Number(mouse.lat)
  var width = 0.05
  var height = 0.03
  var roi = ee.Geometry.Polygon([[lon.add(width),lat.add(height)],[lon.add(width),lat.subtract(height)],[lon.subtract(width),lat.subtract(height)],[lon.subtract(width),lat.add(height)]])
  var pt = ee.Geometry.Point(lon,lat)
  Map.centerObject(pt,13)
  var sen3 = sentinel3.median().clip(roi)
  var sen2 = sentinel2.median().clip(roi)
  var sen = sentinel1.median().clip(roi)
  var scale = Map.getScale() * 2
  var text1 = Text.draw('wThis year',pt,scale, {fontSize:18})
  var text2 = Text.draw('wLast year',pt,scale, {fontSize:18})
  var text3 = Text.draw('wLast last year',pt,scale, {fontSize:18})
  var l3 = Map.addLayer(sen3,rgbVis,'sen3')
  var t3 = Map.addLayer(text3,{},'t3')
  var l2 = Map.addLayer(sen2,rgbVis,'sen2')
  var t2 = Map.addLayer(text2,{},'t2')
  var l1 = Map.addLayer(sen,rgbVis,'sen')
  var t1 = Map.addLayer(text1,{},'t1')
  var start = ee.Date('2018-01-01')
  var end = ee.Date('2020-09-01')
  function get_year(year){
    year = ee.Number(year);
    var s_day = ee.Date.fromYMD(year,5,1);
    var e_day = ee.Date.fromYMD(year,8,31);
    var sen = ee.ImageCollection("COPERNICUS/S2").filterDate(s_day,e_day).filterBounds(roi).map(maskS2clouds).map(setpro).select('B2','B3','B4')
    var img = sen.median()
    img.set('year',year);
    img.set('system:time_start',year);
    return img
  }
  var year_list = ee.List.sequence(start.get('year'),end.get('year'))
  var image_list = year_list.map(get_year)
  var imgCol = ee.ImageCollection.fromImages(image_list)
  var params = {
    crs:'EPSG:32654',
    framesPerSecond:1,
    region:roi,
    min:0.0,
    max:0.3,
    bands:['B4','B3','B2'],
    dimensions:512}
  print(ui.Thumbnail(imgCol, params)); 
  print(imgCol.getVideoThumbURL(params)); 
  var set0 = function(){
    var s0 = function(){
      //print('101')
      l1.setOpacity(1)
      l2.setOpacity(1)
      t1.setOpacity(1)
      t2.setOpacity(0)
      t3.setOpacity(0)
    }
    ui.util.setTimeout(s0, delay)
  }
  var set1 = function(){
    var s1 = function(){
      //print('011')
      l1.setOpacity(0)
      l2.setOpacity(1)
      t1.setOpacity(0)
      t2.setOpacity(1)
      t3.setOpacity(0)
    }
    ui.util.setTimeout(s1, delay*2)
  }
  var set2 = function(){
    var s2 = function(){
      //print('001')
      l1.setOpacity(0)
      l2.setOpacity(0)
      t1.setOpacity(0)
      t2.setOpacity(0)
      t3.setOpacity(1)
    }
    ui.util.setTimeout(s2, delay*3)
  }
  ui.util.setInterval(set0,  delay*3)
  ui.util.setInterval(set1,  delay*3)
  ui.util.setInterval(set2,  delay*3)
})
Map.style().set('cursor','crosshair')