var vizparam = ui.import && ui.import("vizparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "red",
          "green",
          "blue"
        ],
        "min": 0.025949999690055847,
        "max": 0.259799987077713,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["red","green","blue"],"min":0.025949999690055847,"max":0.259799987077713,"gamma":1};
// Display two visualizations of a map. The separator between the two
// visualizations can be dragged left and right. The left map shows
// the first timeScan image and the right map shows the right
//var aoi = point.buffer(10000)
//var center = Map.getCenter()
// Set a center and zoom level.
//
var center = {lon: 15.5, lat: 2.5, zoom: 11};
//var aoi = geometry
//print(aoi)
// Create two maps.
var leftMap = ui.Map(center).add(ui.Map.DrawingTools());
var rightMap = ui.Map(center).add(ui.Map.DrawingTools());
//var label = new ui.Label('Draw points to calculate mean elevation');
//var inspector = new ui.Panel([label]);
//leftMap.add(inspector);
// Don't make imports that correspond to the drawn points.
//leftMap.drawingTools().setLinked(false);
// Limit the draw modes to points.
//leftMap.drawingTools().setDrawModes(['point']);
// Add an empty layer to hold the drawn points.
//leftMap.drawingTools().addLayer([]);
// Set the geometry type to be point.
//leftMap.drawingTools().setShape('point');
// Enter drawing mode.
//leftMap.drawingTools().draw();
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility({layerList:true});
leftMap.setControlVisibility({layerList:true});
leftMap.setControlVisibility({zoomControl: true});
leftMap.setControlVisibility({drawingToolsControl:false})
rightMap.setControlVisibility({drawingToolsControl:false})
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
//GUI PANEL
//Map.style().set('cursor', 'crosshair');
var panel = ui.Panel();
panel.style().set({
  width: '350px',
  position: 'bottom-right',
  border : '1px solid #000000',
});
var space =ui.Label(' ',{fontWeight: 'bold'});
var label_Start_base_select = ui.Label('Start of pre-deforestation period to compare to:');
var Start_base_select = ui.Textbox({
  value: '2019-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_base = text
  }
});
var label_End_base_select = ui.Label('End of pre-deforestation period:');
var End_base_select = ui.Textbox({
  value: '2019-09-30',
  style: {width : '90px'},
  onChange: function(text) {
    var End_base = text
  }
})
var label_Start_second_select = ui.Label('Start of after-deforestation period:');
var Start_second_select = ui.Textbox({
  value: '2020-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_second_select = ui.Label('End of after-deforestation period:');
var End_second_select = ui.Textbox({
  value: '2020-09-30',
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var End_second = text
  }
});
var title =ui.Label('Sentinel-1 Image Comparison',{fontWeight: 'bold'});
var sub = ui.Label('In the left map, zoom to where you want to see images. Select the dates for before and after the change event to create composites. Try to pick the same season for each time period. The before image will display on the left, after on the right.');
var credits = ui.Label('S1 processing scripts from Andreas Vollrath, ESA')
panel.add(title)
panel.add(sub)
panel.add(label_Start_base_select);
panel.add(Start_base_select);
panel.add(label_End_base_select);
panel.add(End_base_select);
panel.add(label_Start_second_select);
panel.add(Start_second_select);
panel.add(label_End_second_select);
panel.add(End_second_select);
panel.add(space)
panel.add(credits)
//panel.add(space)
var button = ui.Button('process images - with patience!');
button.style().set({
  position: 'bottom-center',
  border : '2px solid blue',
  fontSize: '18px',
  margin: '4px',
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(panel);
ui.root.add(splitPanel);
panel.add(button);
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
button.onClick(function() {
    leftMap.clear();
    rightMap.clear();
    leftMap.setControlVisibility({drawingToolsControl:false});
    rightMap.setControlVisibility({drawingToolsControl:false});
    leftMap.style().set({cursor: 'crosshair'});
    rightMap.style().set({cursor: 'crosshair'});
    leftMap.setOptions('baseChange', {'baseChange': baseChange});
    rightMap.setOptions('baseChange', {'baseChange': baseChange});
  //Map.add(button);
    var startTscan1 = Start_base_select.getValue();
    var endTscan1 = End_base_select.getValue();
    var startTscan2 = Start_second_select.getValue();
    var endTscan2 = End_second_select.getValue();
    var aoi = leftMap.getCenter().buffer(40000);
print('Before Start and end dates:',startTscan1,endTscan1);
print('After Start and end dates:',startTscan2, endTscan2);
//-----------------------------------------------------
// load SAR libraries (readable for everyone)
// those libraries contain the basic pre-processing functions for 
// the creation of the timescan
var s1MtLib = require('users/andreasvollrath/radar:s1MtLib.js');
//-----------------------------------------------------
//-----------------------------------------------------
// create a simple Sentinel-1 timescan
var s1Tscan1 = s1MtLib.s1Timescan(aoi, startTscan1, endTscan1);
var s1Tscan2 = s1MtLib.s1Timescan(aoi, startTscan2, endTscan2);
// create RGB composite
var s1Tscan1RGB = s1Tscan1.select(['VV_min', 'VH_min', 'VV_stdDev']);
var s1Tscan2RGB = s1Tscan2.select(['VV_min', 'VH_min', 'VV_stdDev']);
var visParamsRGB = {min: [-18, -25, 0.3], max: [0, -5, 5]};
leftMap.addLayer(s1Tscan1RGB, visParamsRGB, 'Timescan 1');
rightMap.addLayer(s1Tscan2RGB, visParamsRGB, 'Timescan 2');
// change composites
var s1ChgCompositeVV = s1Tscan1.select('VV_min')
                    .addBands(s1Tscan2.select('VV_min'))
                    .addBands(s1Tscan2.select('VV_min'));
var s1ChgCompositeVH = s1Tscan1.select('VH_min')
                    .addBands(s1Tscan2.select('VH_min'))
                    .addBands(s1Tscan2.select('VH_min'));
//vis parans
var visParamsVVChange = {min: [-18,-18,-18], max: [0,0,0]};
var visParamsVHChange = {min: [-25,-25,-25], max: [-5,-5,-5]};
// add to Map
//leftMap.addLayer(s1ChgCompositeVV, visParamsVVChange, 'VV change', false);
//leftMap.addLayer(s1ChgCompositeVH, visParamsVHChange, 'VH change', false);
//-----------------------------------------------------
}
);