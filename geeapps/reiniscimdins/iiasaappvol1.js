var image = ui.import && ui.import("image", "image", {
      "id": "users/reiniscimdins/Fagus_stack"
    }) || ee.Image("users/reiniscimdins/Fagus_stack"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/reiniscimdins/castan_stack"
    }) || ee.Image("users/reiniscimdins/castan_stack"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/reiniscimdins/pseudotsuga_stack"
    }) || ee.Image("users/reiniscimdins/pseudotsuga_stack"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/reiniscimdins/robinia_stack"
    }) || ee.Image("users/reiniscimdins/robinia_stack"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/reiniscimdins/quercus_stack"
    }) || ee.Image("users/reiniscimdins/quercus_stack"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/reiniscimdins/picea_stack"
    }) || ee.Image("users/reiniscimdins/picea_stack"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/reiniscimdins/for_certified_Alps2"
    }) || ee.Image("users/reiniscimdins/for_certified_Alps2"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/reiniscimdins/protected_alps"
    }) || ee.FeatureCollection("users/reiniscimdins/protected_alps");
var m = {};
// Load some images.
m.fagus = image;
m.castan = image2;
m.picea = image6;
m.pseudotsuga = image3;
m.robinia = image4;
m.quercus = image5;
m.certif = image7
m.fagus = m.fagus.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.castan = m.castan.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.picea = m.picea.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.pseudotsuga = m.pseudotsuga.select(['b1', 'b2', 'b3', 'b4'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070'])
m.robinia = m.robinia.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.quercus = m.quercus.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
var shp = ee.FeatureCollection(table)
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
var treeVis = {
  min: 0,
  max: 900,
  palette: [
    "c9c9c9ff","e4a21cff","f5ff26ff","15de1aff","26958bff","1d0776ff"],
};
// create static variable band visulisation setup
m.staticInfo = {
    vis: {
      min:1,
      max:3,
        palette: [
    "cb00fdff",
    "1be949ff",
    "5000ebff"
  ]
}}
// create Static widgets features
c.cert_lbl = ui.Label("add forest management layer", s.topic_style);
c.cert_checkbox = ui.Checkbox('Show layer', true);
// c.cert_button = ui.Button('Add layer');
c.cert_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-left'}});
c.cert_Panel.add(c.cert_lbl);
c.cert_Panel.add(c.cert_checkbox);
// Static function
  var S_layer = ui.Map.Layer({
  eeObject: image7,
  visParams: m.staticInfo.vis,
  });
  leftMap.add(S_layer)
c.cert_checkbox.onChange(function(checked) {
    if(checked){leftMap.add(S_layer)}
    else{leftMap.remove(S_layer)}})
/////////////////////////////////////////////////////////
// create Static widgets features
c.prot_lbl = ui.Label("add protected forest area", s.topic_style);
c.prot_checkbox = ui.Checkbox('Show layer', true);
// c.cert_button = ui.Button('Add layer');
c.prot_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-left'}});
c.cert_Panel.add(c.prot_lbl);
c.cert_Panel.add(c.prot_checkbox);
// protected function
  var p_layer = ui.Map.Layer({
  eeObject: shp,
  // visParams: m.staticInfo.vis,
  });
  leftMap.add(p_layer)
c.prot_checkbox.onChange(function(checked) {
    if(checked){leftMap.add(p_layer)}
    else{leftMap.remove(p_layer)}})
  leftMap.add(c.cert_Panel)
// Make a drop-down menu of bands.
var bandSelect1 = ui.Select({
  placeholder: ('Select prediction'),
  // style: {width: '150px'},
  onChange: function(value) {
    var layer1 = ui.Map.Layer(imageSelect1.getValue().select(value), treeVis);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    leftMap.layers().set(0, layer1);
  }
});
// Make a drop down menu of images.
var imageSelect1 = ui.Select({
  placeholder: ('Select specie'),
  // style: {width: '150px'},
  items: [
    {label: 'Picea abies', value: m.picea},
    {label: 'Fagus sylvatica', value: m.fagus},
    {label: 'Quercus robur', value: m.quercus},
    {label: 'Robinia pseudoacacia', value: m.robinia},
    {label: 'Castanea sativa', value: m.castan},
    {label: 'Pseudotsuga menziesii', value: m.pseudotsuga},
  ],
  onChange: function(value) {
    // Asynchronously get the list of band names.
    value.bandNames().evaluate(function(bands) {
      // Display the bands of the selected image.
      bandSelect1.items().reset(bands);
      // Set the first band to the selected band.
      bandSelect1.setValue(bandSelect1.items().get(0));
    });
  }
});
var bandSelect1_suit = ui.Select({placeholder: ('Select specie')})
var imageSelect1_suit = ui.Select({placeholder: ('Select prediction')})
c.Panel1 = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'top-left'}});
c.Product1_lbl = ui.Label("Productivity estimations", s.topic_style);
c.Suit1_lbl = ui.Label("Suitability estimations (not developed)", s.topic_style);
c.Panel1.add(c.Product1_lbl)
c.Panel1.add(imageSelect1)
c.Panel1.add(bandSelect1)
c.Panel1.add(c.Suit1_lbl)
c.Panel1.add(bandSelect1_suit)
c.Panel1.add(imageSelect1_suit)
// Make a drop-down menu of bands.
var bandSelect2 = ui.Select({
  placeholder: ('Select prediction'),
  // style: {width: '150px'},
  onChange: function(value) {
    var layer2 = ui.Map.Layer(imageSelect2.getValue().select(value), treeVis);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    rightMap.layers().set(0, layer2);
  }
});
// Make a drop down menu of images.
var imageSelect2 = ui.Select({
  placeholder: ('Select specie'),
  // style: {width: '150px'},
  items: [
    {label: 'Picea abies', value: m.picea},
    {label: 'Fagus sylvatica', value: m.fagus},
    {label: 'Quercus robur', value: m.quercus},
    {label: 'Robinia pseudoacacia', value: m.robinia},
    {label: 'Castanea sativa', value: m.castan},
    {label: 'Pseudotsuga menziesii', value: m.pseudotsuga},
  ],
  onChange: function(value) {
    // Asynchronously get the list of band names.
    value.bandNames().evaluate(function(bands) {
      // Display the bands of the selected image.
      bandSelect2.items().reset(bands);
      // Set the first band to the selected band.
      bandSelect2.setValue(bandSelect2.items().get(0));
    });
  }
});
var bandSelect2_suit = ui.Select({placeholder: ('Select specie')})
var imageSelect2_suit = ui.Select({placeholder: ('Select prediction')})
c.Panel2 = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'top-right'}});
c.Product2_lbl = ui.Label("Productivity estimations", s.topic_style);
c.Suit2_lbl = ui.Label("Suitability estimations (not developed)", s.topic_style);
c.Panel2.add(c.Product2_lbl)
c.Panel2.add(imageSelect2)
c.Panel2.add(bandSelect2)
c.Panel2.add(c.Suit2_lbl)
c.Panel2.add(bandSelect2_suit)
c.Panel2.add(imageSelect2_suit)
///////////////////////////////////////
leftMap.add(c.Panel1)
rightMap.add(c.Panel2)
leftMap.setCenter(12.39, 47.30, 8);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap])
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x20',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(treeVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label(treeVis.min, {margin: '4px 8px'}),
    ui.Label(
        (treeVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(treeVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle1 = ui.Label({
  value: 'tree specie productivity',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel1 = ui.Panel([legendTitle1, colorBar1, legendLabels1]);
var desc_panel1 = ui.Panel({style: {position:'bottom-right', width: "275px"}});
var info = {};
info.titleLabel1 = ui.Label("IIASA tree species map");
info.about1 = ui.Label("author: R.Cimdins");
desc_panel1.add(legendPanel1);
desc_panel1.add(info.titleLabel1);
desc_panel1.add(info.about1);
rightMap.add(desc_panel1);