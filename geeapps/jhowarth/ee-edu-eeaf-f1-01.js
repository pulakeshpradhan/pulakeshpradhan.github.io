// -------------------------------------------------------------
//  Chapter:  F1.1
//  Part:     1
//  Author:   Jeff Howarth
// -------------------------------------------------------------
// var collection = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2")
//   .filterBounds(geometry)
//   .filter(ee.Filter.lt('CLOUD_COVER', 5))
//   .sort('CLOUD_COVER')
//   ;
// print(collection);
// -----------------
// Config 
// -----------------
var config = {
  image: '',
  viz: {
    min: 0,
    max: 65535,
    bands: 'SR_B1'
    },
  layer: {
    name: '',
    shown: true,
    opacity: 1
  }
  }
;
var tools = require('users/jhowarth/eePrimer:modules/image_tools.js');
// ------------------------
// Configure layout panels
// ------------------------
// Initialize result panels.
var map = ui.Map()
  .setControlVisibility({
    layerList: true, 
    zoomControl: true, 
    scaleControl: true, 
    mapTypeControl: true, 
    fullscreenControl: true, 
    drawingToolsControl: false
    }
  )
  .setCenter(121.846696, 31.722399, 8)
;
var panel = ui.Panel({
  style: {
    width: '25%'
  }
});
var split =  ui.SplitPanel
  (
    {
      firstPanel: panel,
      secondPanel: map
    }
  )
;
ui.root.clear();
ui.root.add(split);
// -----------------------------------
// Initialize side panels.
// -----------------------------------
var image_panel = ui.Panel({style: {shown: false}});
var band_panel = ui.Panel({style: {shown: false}});
var range_panel = ui.Panel({style: {shown: false}});
var layer_panel = ui.Panel({style: {shown: false}});
var image_id_panel = ui.Panel();
var band_name_panel = ui.Panel();
var chart_panel = ui.Panel();
// -----------------------------------
// Lettering keys. 
// -----------------------------------
var style = {
  fontFamily: 'Roboto',
  whiteSpace: 'pre',
  // padding: '4px',
  // sMargin: '0px 0px 0px 28px',
};
var lettering = {
  h1: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#204020',
    fontFamily: style.fontFamily,
    // padding: style.padding,
    whiteSpace: style.whiteSpace
  },
  h2: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#204020',
    fontFamily: style.fontFamily,
    whiteSpace: style.whiteSpace
  },
  credits: {
    fontSize: '10px',
    fontWeight: 'regular',
    color: 'black',
    fontFamily: style.fontFamily,
    whiteSpace: style.whiteSpace
  }
};
var labels = {
  title: 'Contrast Enhancement',
  author: 'Jeff Howarth',
  book: 'EEAF F1.1',
  part1: 'Part 1: Grayscale layers',
  part2: 'Part 2: RGB composites',
  p1s1: 'Load an image.',
  p1s2: 'Select a band.',
  p1s3: 'Define data range.',
  p1s4: 'Define layer properties'
  }
;
var links = {
  book: 'https://docs.google.com/document/d/1dLSaGXlAnI0jK6LAB6F-gQLBA30NTT0pz1tovHfOmvI/edit#heading=h.czhq6fehjh84',
  author: 'https://jeffhowarth.github.io/'
};
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
  .add(ui.Label(
    'Jeff Howarth,\nGeography Dept\nMiddlebury College',
    lettering.credits,
    'https://jeffhowarth.github.io/'
    )
  )
;
// -----------------------------------
// Checkboxes. 
// -----------------------------------
var image_check = ui.Checkbox(labels.p1s1, false);
image_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  image_panel.style().set('shown',checked);
});
var band_check = ui.Checkbox(labels.p1s2, false);
band_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  band_panel.style().set('shown',checked);
});
var range_check = ui.Checkbox(labels.p1s3, false);
range_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  range_panel.style().set('shown',checked);
});
var layer_check = ui.Checkbox(labels.p1s4, false);
// layer_check.onChange(function(checked) {
//   // Shows or hides the first map layer based on the checkbox's value.
//   layer_panel.style().set('shown',checked);
// });
// -----------------------------------
// Compose panel. 
// -----------------------------------
panel
  .add(ui.Label(labels.title, lettering.h1))
  .add(image_check) 
  .add(image_panel)
  .add(band_check)  
  .add(band_panel)
  .add(range_check)
  .add(range_panel)
  .add(ui.Label(labels.book, lettering.credits, links.book))
  .add(credits_panel)
  // .add(layer_check)
  // .add(layer_panel)
;
// -----------------------------------
// Update functions. 
// -----------------------------------
// Update chart panel.  
var updateChart = function(panel, image, band, min, max ) {
  chart_panel.clear();
  chart_panel.add(
    tools.makeHistogram(
      config.image, 
      config.viz.bands, 
      30,
      config.viz.min,
      config.viz.max
      )
    );
  };
// Update map function.  
var updateMap = function() {
    map.layers().set(
      0,
      ui.Map.Layer(
        config.image, 
        config.viz, 
        config.layer.name, 
        config.layer.shown, 
        config.layer.opacity
        )
      )
    ;
};
var updateImageID = function() {
  image_id_panel.clear();
  band_name_panel.clear();
  chart_panel.clear();
  var image_id = ui.Label({style: {backgroundColor: 'yellow'}});
  config.image.id()
    .evaluate(
      function(val){image_id.setValue("''"+ val + "''")}
      );
  image_id_panel.add(image_id);
  // updateBandName();
};
var updateBandName = function() {
    band_name_panel.clear();
    band_name_panel.add(
      ui.Label(
        "''" + config.viz.bands + "''", 
        {backgroundColor: 'yellow'}
    )
  );
};
// -----------------
// Pick image. 
// -----------------
// Image dictionary. 
var images = {
  'Shanghai: 04/1984': [ee.Image("LANDSAT/LT05/C02/T1_L2/LT05_118038_19840423")],
  'Shanghai: 03/1990': [ee.Image("LANDSAT/LT05/C02/T1_L2/LT05_118038_19900307")],
  'Shanghai: 04/1995': [ee.Image("LANDSAT/LT05/C02/T1_L2/LT05_118038_19950406")],
  'Shanghai: 06/2000': [ee.Image("LANDSAT/LT05/C02/T1_L2/LT05_118038_20000606")],
  'Shanghai: 06/2006': [ee.Image("LANDSAT/LT05/C02/T1_L2/LT05_118038_20060420")],
  'Shanghai: 01/2010': [ee.Image("LANDSAT/LT05/C02/T1_L2/LT05_118038_20100125")],
  }
;
// Config image id label.
var select = ui.Select({
  placeholder: 'Load image...',
  items: Object.keys(images),
  onChange: function(key) {
    config.image = images[key][0];
    updateImageID();
    map.clear();
    // updateMap();
    // updateChart();
    }
  }
);
image_panel
  .add(select)
  .add(image_id_panel)
;
// -----------------
// Choose a band
// -----------------
var bands = {
  'SR_B1': [config.band = 'SR_B1'],
  'SR_B2': [config.band = 'SR_B2'],
  'SR_B3': [config.band = 'SR_B3'],
  'SR_B4': [config.band = 'SR_B4'],
  'SR_B5': [config.band = 'SR_B5'],
  'SR_B7': [config.band = 'SR_B7'],
  }
;
var select_bands = ui.Select({
  placeholder: 'Select band ...',
  items: Object.keys(bands),
  onChange: function(key) {
    config.viz.bands = bands[key][0];
    updateBandName();
    updateMap();
    updateChart();
  }
})
;
band_panel
  .add(select_bands)
  .add(band_name_panel)
;
// ----------------------------------
// Choose min and max display values. 
// ----------------------------------
// Define max
var textbox_max = ui.Textbox({
  placeholder: 'Enter max as number',
  onChange: function(text) {
    config.viz.max = text;
  updateMap();  
  updateChart();
  }
});
// Define min.
var textbox_min = ui.Textbox({
  placeholder: 'Enter min as number',
  onChange: function(text) {
    config.viz.min = text;
  updateMap();
  updateChart();
  }
});
range_panel
  .add(textbox_max)
  .add(textbox_min)
  .add(chart_panel)
;
// // ----------------------------------
// // Layer properties
// // ----------------------------------
// // Layer name
// var textbox_name = ui.Textbox({
//   placeholder: 'Enter name for layer',
//   onChange: function(text) {
//     config.layer.name = text;
//   updateChart();
//   updateMap();
//     // map.layers().get(0).setName(text);
//   }
// });
// // Layer shown?
// var shown_check = ui.Checkbox('Show layer?', true);
// shown_check.onChange(function(check) {
//   // Shows or hides the first map layer based on the checkbox's value.
//   config.layer.shown = check;
//   updateMap();
//   // map.layers().get(0).setShown(check);
//   })
// ;
// // Layer opacity
// var opacity_slider = ui.Slider({
//   min: 0,
//   max: 1,
//   value:1, 
//   step: 0.1, 
//   style: {width: '100%'},
//   onChange: function(value) {
//     config.layer.opacity = value;
//     updateMap();
//     // map.layers().get(0).setOpacity(value);
//     }
//   }
// );
// layer_panel
//   .add(textbox_name)
//   .add(shown_check)
//   .add(opacity_slider)
//   ;
// // -----------------
// // Select RGB bands 
// // -----------------
// var select_red = ui.Select({
//   placeholder: 'Select red channel',
//   items: Object.keys(bands),
//   onChange: function(key) {
//     config.viz.red = bands[key][0];
//     // updateBandName();
//     // updateMap();   
//   }
// })
// ;
// print(textbox_min);