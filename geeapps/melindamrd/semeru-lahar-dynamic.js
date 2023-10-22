var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.018699999898672104,
        "max": 0.16124999523162842,
        "gamma": 2.31
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.018699999898672104,"max":0.16124999523162842,"gamma":2.31},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.08926781143779203,
        "max": 0.25412655895030967,
        "gamma": 0.617
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.08926781143779203,"max":0.25412655895030967,"gamma":0.617},
    AOI = ui.import && ui.import("AOI", "table", {
      "id": "users/melindamrd/DRRE/OroOroOmbo_AR"
    }) || ee.FeatureCollection("users/melindamrd/DRRE/OroOroOmbo_AR"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.92026235516418,
                -8.13720418522701
              ],
              [
                112.92026235516418,
                -8.262255318465943
              ],
              [
                113.08162404950012,
                -8.262255318465943
              ],
              [
                113.08162404950012,
                -8.13720418522701
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
        [[[112.92026235516418, -8.13720418522701],
          [112.92026235516418, -8.262255318465943],
          [113.08162404950012, -8.262255318465943],
          [113.08162404950012, -8.13720418522701]]], null, false),
    lahar2 = ui.import && ui.import("lahar2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B11",
          "B4",
          "B3"
        ],
        "min": 0.08926781143779203,
        "max": 0.25412655895030967,
        "gamma": 0.617
      }
    }) || {"opacity":1,"bands":["B11","B4","B3"],"min":0.08926781143779203,"max":0.25412655895030967,"gamma":0.617},
    lahar = ui.import && ui.import("lahar", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B11",
          "B4",
          "B3"
        ],
        "min": 0.018699999898672104,
        "max": 0.16124999523162842,
        "gamma": 1.0130000000000001
      }
    }) || {"opacity":1,"bands":["B11","B4","B3"],"min":0.018699999898672104,"max":0.16124999523162842,"gamma":1.0130000000000001};
Map.setCenter(113.02335099238601, -8.182855097725778, 14);
Map.setOptions('Satellite');
var center = {lon: 113.02335099238601, lat: -8.182855097725778, zoom: 14};
//----------------------------------------------------------------------------------------
//--------------------------SELECT PRE- AND POST-ERUPTION IMAGES--------------------------
//----------------------------------------------------------------------------------------
// 1. Cloud Masking
function maskS2clouds(image){
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
  .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000)}
// 2. Filter Image Collection
var image1 = ee.ImageCollection('COPERNICUS/S2')
                 .filterDate('2021-01-01','2021-12-01')
                 .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 0.8))
                 .map(maskS2clouds)
                 .median();
var image2 = ee.ImageCollection('COPERNICUS/S2')
                 .filterDate('2021-12-02','2022-10-01')
                 .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 0.5)
                 .map(maskS2clouds)
                 .median();
// 3. Print Selected Imagery to Check Data Aquisition
print('pre-eruption', image1);
print('post-eruption', image2);
// 4. Clip with AOI
var preImage = image1.clip(geometry);
var postImage = image2.clip(geometry);
// 5. Display Image
Map.addLayer(preImage, lahar, 'Pre-Eruption');
Map.addLayer(postImage, lahar2, 'Post-Eruption');
//----------------------------------------------------------------------------------------
//------------------------------------USER INTERFACE------------------------------------
//----------------------------------------------------------------------------------------
// 1. Add Title and Desc.
  var header = ui.Label('Lahar-Extent Change of Semeru Volcano: Pre- and Post-2021 Euption',
                       {fontWeight: 'bold',
                        fontSize: '20px', 
                        color: 'black', 
                        textAlign: 'center'});
  var text = ui.Label(
            'Semeru Volcano is one of the most active and dynamic volcano in East Java, Indonesia. The lahar path is continuously changing from time to time. This map shows the lahar-extent change before and after the 2021 eruption.',
            {fontSize: '14px', textAlign: 'justify'});
  var text2 = ui.Label(
            'LEGEND',
            {fontWeight: 'bold', fontSize: '14px', textAlign: 'justify'});
  var text3 = ui.Label(
            'Sentinel-2A | RGB: B11, B4, B3.',
            {fontSize: '14px', textAlign: 'justify'});
  var text4 = ui.Label(
            '(c) Disaster Risk Reduction and Education 2022',
            {fontSize: '10px', textAlign: 'justify'});
  var toolPanel = ui.Panel([header, text4, text, text2, text3], 'flow', {width: '300px'});
// 2. Legend Panel
  var legendPanel = ui.Panel({
                    style: {
                      fontSize: '12px', 
                      margin: '0 0 0 8px', 
                      padding: '0'}
  });
  var legendTitle = ui.Label(
                    'Legend:',
                    {fontWeight: 'bold', 
                     fontSize: '14px', 
                     margin: '0 0 4px 0', 
                     padding: '0'});
  // 3. Create Legend Style
     var makeRow = function(color, name) {
     var colorBox = ui.Label({
         style: {
         backgroundColor: '#' + color,
        padding: '8px',
        margin: '0 0 4px 0'} });
     var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'} });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal') }); };
// 4. Slider
 // Create Map Options
    var images = {
      'Pre-Eruption' : preImage.visualize(lahar),
      'Post-Eruption' : postImage.visualize(lahar2)
    };
 // 5. Create the Left Map and Display as Layer 0
    var leftMap = ui.Map(center);
    leftMap.setControlVisibility(false)
           .setOptions('Satellite');
    var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
 // 6. Create the Right Map and Display as Layer 1
    var rightMap = ui.Map(center);
    rightMap.setControlVisibility(false)
            .setOptions('Satellite');
    var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// 7. Add Layer Selection Widget
    function addLayerSelector(mapToChange, defaultValue, position) {
    var label = ui.Label('Select Image');
    function updateMap(selection) {
             mapToChange.layers().set(0, ui.Map.Layer(images[selection])); }
 // 8. Add Dropdown
    var select = ui.Select({items: Object.keys(images), onChange: updateMap});
        select.setValue(Object.keys(images)[defaultValue], true);
    var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
        mapToChange.add(controlPanel); }
 // 9. Create a SplitPanel
    var splitPanel = ui.SplitPanel({
      firstPanel: leftMap,
      secondPanel: rightMap,
      wipe: true,
      style: {stretch: 'both'} });
      ui.root.widgets().reset([splitPanel]);
      ui.root.widgets().add(toolPanel);
 // 10. Link the Left and Right Map
      var linker = ui.Map.Linker([leftMap, rightMap]);