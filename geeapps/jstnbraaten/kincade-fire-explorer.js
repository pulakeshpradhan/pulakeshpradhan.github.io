var imgExtent = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-123.19319325644301, 38.89502980358753],
          [-123.19319325644301, 38.3962874350579],
          [-122.35136586386488, 38.3962874350579],
          [-122.35136586386488, 38.89502980358753]]], null, false);
var s2 = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(imgExtent);
var s2imgs = s2.sort('system:time_start', false).limit(50);
print('s2imgs:', s2imgs);
var img20191022 = s2.filterDate('2019-10-22', '2019-10-23').mean();
//Map.addLayer(img20191022, {bands:['B11', 'B8', 'B3'], min:500, max:3500}, '2019-10-22');
var img20191025 = s2.filterDate('2019-10-25', '2019-10-26').mean();
//Map.addLayer(img20191025, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.2}, '2019-10-25');
var img20191027 =  s2.filterDate('2019-10-27', '2019-10-28').mean();
//Map.addLayer(img20191027, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, '2019-10-27');
var img20191030 =  s2.filterDate('2019-10-30', '2019-10-31').mean();
//Map.addLayer(img20191030, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, '2019-10-30');
var img20191101 =  s2.filterDate('2019-11-01', '2019-11-02').mean();
//Map.addLayer(img20191101, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, '2019-11-01');
//###########################################################################################################
var firstTime = ee.Date('2019-10-23T08:00:00', 'America/Los_Angeles');
var lastTime = ee.Date('2019-10-30T10:30:00', 'America/Los_Angeles');
var hours = ee.Number(lastTime.difference(firstTime, 'hour')).round().int16();
var endTime = firstTime.advance(1, 'hour');
var col = ee.ImageCollection("NOAA/GOES/17/FDCF")
  .filterDate(firstTime, '2019-11-02')
  .select('Temp');
var startT = ee.Date(col.first().date().millis());
print(startT)
var geometry1 = ee.Geometry.Polygon(
        [[[-123.14924794394301, 38.77736131097894],
          [-123.14924794394301, 38.27779814041941],
          [-122.30742055136488, 38.27779814041941],
          [-122.30742055136488, 38.77736131097894]]], null, false);
var s2 = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(geometry1);
var vidRef = img20191101.visualize({bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1});
var times = ee.List.sequence(0, hours, 3);
var col1 = ee.ImageCollection(times.map(function(t){
  t = ee.Number(t);
  var startTime = startT.advance(t, 'hour');
  var endTime = startT.advance(t.add(3), 'hour');
  var tempVis = col.filterDate(startTime, endTime).max();
  var nBands = ee.List(tempVis.bandNames()).size();
  return tempVis.set('nBands', nBands)}))
  .filter(ee.Filter.eq('nBands', 1))
  .map(function(img){
    img = img.gte(0)
      .visualize({
        min:0,
        max:1,
        opacity: 0.90,
        palette: ['ff1605']});
    return vidRef.blend(img)});
var filler = ee.Image(0).visualize({min:0, max:1, forceRgbOutput:true});
var fillerCol = ee.ImageCollection([filler, filler]);
col1 = col1.merge(fillerCol);
var gifGeom = ee.Geometry.Polygon(
    [[[-123.05456440429685, 38.91984718396708],
      [-123.05456440429685, 38.47720449232112],
      [-122.46267597656248, 38.47720449232112],
      [-122.46267597656248, 38.91984718396708]]], null, false);
var gifArgs = {
  dimensions: 384,
  region: gifGeom,
  framesPerSecond: 6,
  crs: 'EPSG:3857'};
print(col1.getVideoThumbURL(gifArgs));
//###########################################################################################################
var leftMap = ui.Map();
var rightMap = ui.Map();
var leftImg = ee.Image.constant(0);
var rightImg = ee.Image.constant(1);
var style = {min:0, max:1, opacity:0.7};
leftMap.addLayer(img20191022, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1}, '2019-10-22', true);
rightMap.addLayer(img20191025, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.2}, '2019-10-25', false);
rightMap.addLayer(img20191027, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, '2019-10-27', false);
rightMap.addLayer(img20191030, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, '2019-10-30', false);
rightMap.addLayer(img20191101, {bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.05}, '2019-11-01', true);
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
leftMap.setCenter(-122.7744, 38.6586, 11);
var fireName = ui.Label('Kincade fire, CA', {fontWeight:'bold', fontSize:'28px'});
fireName.setUrl('https://twitter.com/hashtag/KINCADEFIRE?src=hash');
var fireExplorerLabel = ui.Label('Fire Explorer', {fontWeight:'bold', fontSize:'18px'});
var infoLabel = ui.Label(
  '- Swipe left and right to view change.\n'+
  '- Left map is reference from Oct. 22nd.\n'+
  '- Right map is most recent image.\n'+
  '- Use "Layers" menu to view other dates.\n'+
  '- Zoom and pan the map.\n'+
  '\n'+
  '* App will be updated as new imagery is available.',
  {whiteSpace:'pre'});
var infoPanel = ui.Panel([fireName, fireExplorerLabel, infoLabel], null, {position: 'bottom-left'});
var fireTempLabel = ui.Label('Fire progression (3-hour interval)', {fontWeight:'bold', fontSize:'16px'});
var fireTempPanel = ui.Panel([fireTempLabel, ui.Thumbnail(col1, gifArgs)], null, {position: 'bottom-right'});
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(infoPanel);
rightMap.add(fireTempPanel);