// Initialize panel.
var panel = ui.Panel(
  {style: 
    {
      width: '215px',
      // padding: '12px'
    }
  }
);
// Initialize map.
var map = ui.Map();
//initialize splitPanel
var split_panel =  ui.SplitPanel
  (
    {
      firstPanel: panel,
      secondPanel: map
    }
  )
;
ui.root.clear();
ui.root.add(split_panel);
// --------------------------------------
// config panel widgets
// --------------------------------------
// color codes 
var red = '#ff0000';
var green = '#00ff00';
var blue = '#0000ff';
// Config sliders. 
var slider_params = {
  min: 0, 
  max: 255, 
  value: 0, 
  step: 5,
  direction: 'vertical',
  style: {
    padding: '0px 12px 12px 12px'
  }
  } 
;
// -----------
// make labels  
// -----------
// style dictionary for labels
var styles = {
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '18px'
    },
  subTitle: {
    fontSize: '14px',
    // color: '#478EC9',
    whiteSpace: 'pre'
    // backgroundColor: background
    },
  instruction: {
    fontSize: '14px',
    // color: '#478EC9',
    whiteSpace: 'pre'
    // backgroundColor: background
    },
  credits: {
    fontSize: '10px',
    whiteSpace: 'pre',
    color: '#999999',
    // margin: '1px 8px 1px 8px',
    padding: '18px'
  }
};
var makeTitle = function(value) {
  return ui.Label({
    value: value,
    style: styles.title, 
    // targetUrl, 
    // imageUrl
    }
  );
};
var title = makeTitle('Additive color');
var makeRGBLabel = function(value, color) {
  return ui.Label({
    value: value,
    style: {
      backgroundColor: color,
      color: 'white',
      fontWeight: 'bold',
      padding: '18px',
      fontSize: '18px'
      }, 
    // targetUrl, 
    // imageUrl
    }
  );
};
var label_red = makeRGBLabel('R', red);
var label_green = makeRGBLabel('G', green);
var label_blue = makeRGBLabel('B', blue);
// ------------
// Make sliders. 
// ------------
var slider_red = ui.Slider(slider_params);
slider_red.onChange(function(value){
    config.r = value;
    print(config);
    makeRGB('RGB', 1);
  }
);
var slider_green = ui.Slider(slider_params);
slider_green.onChange(function(value){
    config.g = value;
    print(config);
    makeRGB('RGB', 1);
  }
);
var slider_blue = ui.Slider(slider_params);
slider_blue.onChange(function(value){
    config.b = value;
    print(config);
    makeRGB('RGB', 1);
  }
);
// ------------------------
// Make label-slider panels. 
// ------------------------
var makePanel_label_slider = function(label, slider) {
  return ui.Panel({
    widgets: [label, slider],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      padding: '4px'
      },
    }
  );
};
var panel_red = makePanel_label_slider(label_red, slider_red);
var panel_green = makePanel_label_slider(label_green, slider_green);
var panel_blue = makePanel_label_slider(label_blue, slider_blue);
// -----------------
// Credits
// ----------------- 
// --------------------------------------
// Make credits. 
// --------------------------------------
// Make legend panel.
var credits_panel = ui.Panel(
  {
    style: 
    {
      width: '100%',
      shown: true,
    }
  }
)
;
var makeCreditLabel = function(title, style, link) {
  return ui.Label({
    value: title,
    style: style,
    targetUrl: link
  });
};
credits_panel
  .add(makeCreditLabel(
    'Jeff Howarth,\nGeography Dept\nMiddlebury College',
    styles.credits,
    'https://jeffhowarth.github.io/'
    )
  )
;
// Panel 
var panel_sliders = ui.Panel({
  widgets: [panel_red, panel_green, panel_blue],
  layout: ui.Panel.Layout.flow('horizontal'),
  }
);
panel
  .add(title)
  .add(panel_sliders)
  .add(credits_panel)  
;
// --------------------------------------
// config map layout
// --------------------------------------
map.setControlVisibility({
  all: false
  }
);
var config = {
  r: 0,
  g: 0,
  b: 0
  }
;
var makeImage = function(value) {
    return ee.Image.constant(value);
  };
var makeRGB = function(name, index){
    var R = makeImage(config.r);
    var G = makeImage(config.g);
    var B = makeImage(config.b);
    var RGB = R.addBands(G).addBands(B); 
    return map.layers().set(
      index,
      ui.Map.Layer(RGB, {min:0, max:255}, name)
      );
  }
;
makeRGB('base',0);