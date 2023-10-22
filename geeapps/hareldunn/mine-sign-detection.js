var colorwheel_discrete = ui.import && ui.import("colorwheel_discrete", "image", {
      "id": "users/hareldunn/colorwheel"
    }) || ee.Image("users/hareldunn/colorwheel"),
    colorwheel_continuous = ui.import && ui.import("colorwheel_continuous", "image", {
      "id": "users/hareldunn/colorwheel_x"
    }) || ee.Image("users/hareldunn/colorwheel_x"),
    mine_sign = ui.import && ui.import("mine_sign", "image", {
      "id": "users/hareldunn/MinefieldSign"
    }) || ee.Image("users/hareldunn/MinefieldSign"),
    Ortho = ui.import && ui.import("Ortho", "image", {
      "id": "users/hareldunn/form/Ortho2018"
    }) || ee.Image("users/hareldunn/form/Ortho2018");
/// Select Image ///
//var image = colorwheel_discrete
var image = mine_sign
Map.centerObject(image,18)
//Map.addLayer(image,{},'colorwheel', false)
/// Break RGB bands and convert to float ///
var r = image.select('b1').divide(256).rename('red')
var g = image.select('b2').divide(256).rename('green')
var b = image.select('b3').divide(256).rename('blue')
var image_rgb = r.addBands(g).addBands(b)
/// Make HSV and add bands///
var hsv = image_rgb.select(['red', 'green', 'blue']).rgbToHsv();
var image_bands = image_rgb
                  .addBands(hsv.select('hue'))
                  .addBands(hsv.select('saturation'))
                  .addBands(hsv.select('value'))
//print(image_bands)                  
/// RGB Colorspace ///
Map.addLayer(image_bands,{bands: ['red','green','blue'], min: 0, max: 1},'RGB',true)
Map.addLayer(image_bands,{bands:'red', palette: ['000000','FF0000' ]},'Red',false)
Map.addLayer(image_bands,{bands:'green', palette: ['000000','00FF00' ]},'Green',false)
Map.addLayer(image_bands,{bands:'blue', palette: ['000000','0000ff' ]},'Blue',false)
/// HSV Colorspace ///
Map.addLayer(image_bands,{bands: ['hue','saturation','value'], min: 0, max: 1},'HSV',false)
Map.addLayer(image_bands,{bands:'hue', palette: ['FF0000','FFFF00', '00FF00', '00FFFF', '0000FF', 'FF00FF','FF0000' ]},'Hue',false)
Map.addLayer(image_bands,{bands:'saturation', palette: ['FFFFFF','000000']},'Saturation',false)
Map.addLayer(image_bands,{bands:'value', palette: ['FFFFFF','000000']},'Value',false)
/// Detect Yellow Sign ///
var yellow_sign = image_bands.select('hue').gte(0.109)
            .and(image_bands.select('hue').lte(0.167))
            .and(image_bands.select('saturation').gte(0.54))
            .and(image_bands.select('value').gte(0.45))
            .selfMask()
Map.addLayer(yellow_sign,{palette: 'FFC400'},'Yellow Sign',false)
var canny = ee.Algorithms.CannyEdgeDetector({
  image: yellow_sign, threshold: 1, sigma: 1});
var edge = canny.gte(0.99).selfMask()  
Map.addLayer(edge,{},'Yellow Edge',false)
/// Detect red letters ///
var red_letter = image_bands.select('red').gte(0.645)
            .and(image_bands.select('green').lte(0.46))
            .and(image_bands.select('hue').gte(0.9).or(image_bands.select('hue').lte(0.077)))
            .selfMask()
Map.addLayer(red_letter,{palette: 'E93301'},'Red letter',false)
var panel = ui.Panel();
panel.style().set({
  width: '277px',
  position: 'bottom-right'
});
Map.add(panel);
// Define Checkbox Layers
var checkbox1 = ui.Checkbox('RGB Image', true);
var checkbox2 = ui.Checkbox('Red Band', false);
var checkbox3 = ui.Checkbox('Green Band', false);
var checkbox4 = ui.Checkbox('Blue Band', false);
var checkbox5 = ui.Checkbox('HSV Image', false);
var checkbox6 = ui.Checkbox('Hue Band', false);
var checkbox7 = ui.Checkbox('Saturation Band', false);
var checkbox8 = ui.Checkbox('Value Band', false);
var checkbox9 = ui.Checkbox('Yellow Sign', false);
var checkbox10 = ui.Checkbox('Yellow Outline', false);
var checkbox11 = ui.Checkbox('Red Letters', false);
// Create Checkboxes Actions
checkbox1.onChange(function(checked) { // predicted pipeline
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked); // Update when layer count or order changes
});
checkbox2.onChange(function(checked) { // pipeline probabilty
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked); // Update when layer count or order changes
});
checkbox3.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked); // Update when layer count or order changes
});
checkbox4.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked); // Update when layer count or order changes
});
checkbox5.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(4).setShown(checked); // Update when layer count or order changes
});
checkbox6.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(5).setShown(checked); // Update when layer count or order changes
});
checkbox7.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(6).setShown(checked); // Update when layer count or order changes
});
checkbox8.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(7).setShown(checked); // Update when layer count or order changes
});
checkbox9.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(8).setShown(checked); // Update when layer count or order changes
});
checkbox10.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(9).setShown(checked); // Update when layer count or order changes
});
checkbox11.onChange(function(checked) { // landcover analysis
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(10).setShown(checked); // Update when layer count or order changes
});
// Add Checkboxes To Panel
panel.add(ui.Label("Final Image")),
panel.add(checkbox11);
panel.add(checkbox10);
panel.add(checkbox9);
panel.add(ui.Label("HSV Colorspcae"))
panel.add(checkbox8);
panel.add(checkbox7);
panel.add(checkbox6);
panel.add(checkbox5);
panel.add(ui.Label("RGB Colorspcae"))
panel.add(checkbox4);
panel.add(checkbox3);
panel.add(checkbox2);
panel.add(checkbox1);
// Set Up Left Panel
var panel_left = ui.Panel();
panel_left.style().set({
  width: '270px',
  position: 'bottom-left',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
});
//Map.add(panel_left);
var rgb_ex = ee.Image("users/hareldunn/rgb_render")
var hsv_ex = ee.Image("users/hareldunn/hsv_cone")
var colorwheel = ee.Image("users/hareldunn/colorwheel");
print(rgb_ex)
var label_rgb = ui.Label("RGB Colorspace", {color: 'black',fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
panel_left.add(label_rgb)
var image_rgb = ui.Thumbnail({image:rgb_ex,params:{bands:['b1','b2','b3']},style:{width:'150px',height:'150px'}});
panel_left.add(image_rgb)
var label_hsv = ui.Label("HSV Colorspace", {color: 'black',fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
panel_left.add(label_hsv)
var image_hsv = ui.Thumbnail({image:hsv_ex,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'250px',height:'250px'}});
panel_left.add(image_hsv)
var label_color = ui.Label("Color Wheel", {color: 'black',fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
panel_left.add(label_color)
var image_color = ui.Thumbnail({image:colorwheel,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'250px',height:'250px'}});
panel_left.add(image_color)
//var main = ui.Panel({style: {width: '300px', padding: '12px'}});
// Select Focus
/*
var places = {
  'Infrastructure': [-80.38361, 37.30337, 15],
  'Oil Wells': [-78.45297, 42.01525, 15]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], places[key][2]);
  }
});
select.setPlaceholder('Choose a location...');
var panel_select = ui.Panel({
  widgets: [select],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '160px',
    padding: '7px'
  }
}); 
panel_left.add(panel_select);
*/
ui.root.insert(0, panel_left);