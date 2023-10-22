var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.73141847232945,
            30.376251086040472
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d00fd8",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #d00fd8 */
    /* locked: true */
    ee.Geometry.Point([79.73141847232945, 30.376251086040472]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.62740491690559,
            30.49330481020068
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#3393ff",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #3393ff */
    /* locked: true */
    ee.Geometry.Point([79.62740491690559, 30.49330481020068]),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            79.74355058423802,
            30.480181661664904
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#3cc61e",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #3cc61e */
    /* locked: true */
    ee.Geometry.Point([79.74355058423802, 30.480181661664904]);
var geometry = 
    ee.Geometry.Polygon(
        [[[79.56028209510418, 30.645892545539443],
          [79.56028209510418, 30.198261419626455],
          [80.15766368690106, 30.198261419626455],
          [80.15766368690106, 30.645892545539443]]], null, false);
var leftDate = ui.Label('2021-02-05', {
  position: 'top-left', fontSize: '28px', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 1)'});
var rightDate = ui.Label('2021-02-10', {
  position: 'top-right', fontSize: '28px', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255,1)'});
var dims = ['30px', '30px'];
var txt = {fontSize: '16px', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'};
var ppColor = ui.Panel({style: {width: dims[0], height: dims[1], backgroundColor: '#3393ff'}});
var ppMsg = ui.Label({value: 'Rishiganga power project flooding', style: txt});
var ppPanel = ui.Panel([ppColor, ppMsg], ui.Panel.Layout.flow('horizontal'),
{backgroundColor: 'rgba(255, 255, 255, 0.0)'});
var snowColor = ui.Panel({style: {width: dims[0], height: dims[1], backgroundColor: '#3cc61e'}});
var snowMsg = ui.Label({value: 'Rapid snow melt', style: txt});
var snowPanel = ui.Panel([snowColor, snowMsg], ui.Panel.Layout.flow('horizontal'),
{backgroundColor: 'rgba(255, 255, 255, 0.0)'});
var lsColor = ui.Panel({style: {width: dims[0], height: dims[1], backgroundColor: '#d00fd8'}});
var lsMsg = ui.Label({value: 'Nanda Devi glacier / landslide', style: txt});
var lsPanel = ui.Panel([lsColor, lsMsg], ui.Panel.Layout.flow('horizontal'),
{backgroundColor: 'rgba(255, 255, 255, 0.0)'});
var title = ui.Label('2021 Uttarakhand Flood', {fontSize: '18px', fontWeight: 'bold'});
var note = ui.Label('Before and after event imagery from ESA Sentinel-2 (false color RGB: NIR, red, green). Move the slider back and forth to inspect changes.');
var url = ui.Label('More info', null, 'https://en.wikipedia.org/wiki/2021_Uttarakhand_flood');
var check = ui.Checkbox('Show base layer');
var infoPanel = ui.Panel([
  title, note, ppPanel, snowPanel, lsPanel, check, url
  ], null,
  {width: '300px',
  backgroundColor: 'rgba(255, 255, 255, 1)', position: 'bottom-left'});
// var s2 = ee.ImageCollection('COPERNICUS/S2');
// var t1 = s2.filterBounds(geometry).filterDate('2021-02-05', '2021-02-06').first().resample('bicubic');
// var t2 = s2.filterBounds(geometry).filterDate('2021-02-10', '2021-02-11').first().resample('bicubic');
var t1 = ee.Image('COPERNICUS/S2/20210205T052011_20210205T052211_T44RLU').resample('bicubic');
var t2 = ee.Image('COPERNICUS/S2/20210210T051939_20210210T052401_T44RLU').resample('bicubic');
var visParams = {bands: ['B8', 'B4', 'B3'], min: 100, max: 4500};
var leftMap = ui.Map();
var rightMap = ui.Map();
leftMap.setCenter(79.6856, 30.4454, 12);
leftMap.drawingTools().setLinked(true);
rightMap.drawingTools().setLinked(true);
leftMap.addLayer(t1, visParams, '2021-02-05');
rightMap.addLayer(t2, visParams,  '2021-02-10');
leftMap.setControlVisibility({layerList: false, drawingToolsControl: false, fullscreenControl: false});
rightMap.setControlVisibility({layerList: false, drawingToolsControl: false, fullscreenControl: false});
leftMap.setOptions('HYBRID');
rightMap.setOptions('HYBRID');
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
function hideLayers(checked) {
  if(checked) {
    leftMap.layers().get(0).setOpacity(0);
    rightMap.layers().get(0).setOpacity(0);
    leftDate.style().set('shown', false);
    rightDate.style().set('shown', false);
  } else {
    leftMap.layers().get(0).setOpacity(1);
    rightMap.layers().get(0).setOpacity(1);
    leftDate.style().set('shown', true);
    rightDate.style().set('shown', true);
  }
}
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(infoPanel);
leftMap.add(leftDate);
rightMap.add(rightDate);
check.onChange(hideLayers);