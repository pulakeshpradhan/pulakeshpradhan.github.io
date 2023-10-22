var image = ui.import && ui.import("image", "image", {
      "id": "users/reiniscimdins/comb1"
    }) || ee.Image("users/reiniscimdins/comb1"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/reiniscimdins/ba_r"
    }) || ee.Image("users/reiniscimdins/ba_r");
var m = {};
// Load some images.
m.fagus = image;
m.castan = image2;
var s = {};
s.topic_style = {fontSize: '13px', 
                      color: '#000000',
                      //fontWeight: 'bold',
                      fontFamily : 'roboto',
                      textAlign: 'left',
                      stretch: 'both',
                      fontWeight: 'bold',
                      margin: '2px 0 2px 0',
                      padding: '0'
};
var leftMap = ui.Map();
var rightMap = ui.Map();
var c = {};
// create static variable band visulisation setup
m.vis1 = {
    vis: {
      min:0,
      max:1,
        palette:   [
    "b3b3b3ff","bb0000ff"] 
}}
// create static variable band visulisation setup
m.vis2 = {
    vis: {
      min:0,
      max:1,
        palette:   [
    "b3b3b3ff","1d0776ff","26958bff","15de1aff","e4a21cff","bb0000ff"] 
}}
// create Static widgets features
c.lbl1 = ui.Label("MODIS burned area", s.topic_style);
c.checkbox1 = ui.Checkbox('Show layer', true);
c.Panel1 = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-left'}});
c.Panel1.add(c.lbl1);
c.Panel1.add(c.checkbox1);
var ba_remap=image2
.where(image2.gt(0),1)
// Static function
  var C_layer = ui.Map.Layer({
  eeObject: ba_remap,
  visParams: m.vis1.vis,
  });
  leftMap.add(C_layer)
c.checkbox1.onChange(function(checked) {
    if(checked){leftMap.add(C_layer)}
    else{leftMap.remove(C_layer)}})
c.opacity1 = ui.Label('Opacity', s.topic_style);
c.all_Slider1 = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
c.all_Slider1.onSlide(function(value) {
  leftMap.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
c.Panel1.add(c.all_Slider1);
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px', width: '170px'
  }
});
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '5px',
          margin: '0 0 px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =["b3b3b3ff","bb0000ff"];
// name of the legend
var names = ['non burned','burned'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
c.Panel1.add(legend)
/////////////////////////////////////////////////////////
// create Static widgets features
c.lbl2 = ui.Label("model prediction layer", s.topic_style);
c.checkbox2 = ui.Checkbox('Show layer', true);
// c.cert_button = ui.Button('Add layer');
c.Panel2 = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-right'}});
c.Panel2.add(c.lbl2);
c.Panel2.add(c.checkbox2);
// Static function
  var B_layer = ui.Map.Layer({
  eeObject: image,
  visParams: m.vis2.vis,
  });
  rightMap.add(B_layer)
c.checkbox2.onChange(function(checked) {
    if(checked){rightMap.add(B_layer)}
    else{rightMap.remove(B_layer)}})
leftMap.add(c.Panel1);
rightMap.add(c.Panel2);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap])
leftMap.setCenter(14.8, 62.30, 4.9);
c.opacity2 = ui.Label('Opacity', s.topic_style);
c.all_Slider2 = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
c.all_Slider2.onSlide(function(value) {
  rightMap.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
c.Panel2.add(c.all_Slider2);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x20',
    format: 'png',
    min: 0,
    max: 1,
    palette:palette,
  };
}
// Create the color bar for the legend.
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(m.vis2.vis.palette),
  style: {stretch: 'horizontal', margin: '2px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label(m.vis2.vis.min, {margin: '4px 8px'}),
    ui.Label(
        (m.vis2.vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(m.vis2.vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle1 = ui.Label('probability value', s.topic_style2);
var legendPanel1 = ui.Panel([legendTitle1, colorBar1, legendLabels1]);
c.Panel2.add(legendPanel1);