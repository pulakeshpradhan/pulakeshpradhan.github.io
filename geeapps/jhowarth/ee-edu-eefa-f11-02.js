// -------------------------------------------------------------
//  Chapter:  F1.1
//  Part:     2
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
  red: {
    viz: {
      min: 0,
      max: 65535,
      bands: ''
      }
    },
  green: {
    viz: {
      min: 0,
      max: 65535,
      bands: ''
      }
    },
  blue: {
    viz: {
      min: 0,
      max: 65535,
      bands: ''
      }
    },
  layer: {
    name: '',
    shown: true,
    opacity: 1
  }
  }
;
var rgb_viz = {
};
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
    width: '20%'
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
var red_panel = ui.Panel({style: {shown: false}});
var green_panel = ui.Panel({style: {shown: false}});
var blue_panel = ui.Panel({style: {shown: false}});
var image_id_panel = ui.Panel();
var red_chart_panel = ui.Panel();
var green_chart_panel = ui.Panel();
var blue_chart_panel = ui.Panel();
var rgb_panel = ui.Panel();
var rgb_chart = ui.Panel();
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
    padding: '0 px',
    whiteSpace: '0 px'
  }
};
var labels = {
  title: 'Natural and False Color',
  author: 'Jeff Howarth',
  book: 'EEAF F1.1',
  rgb: 'Additive color ee-edu-app',
  part: 'Part 2: RGB composites',
  s1: 'Load an image.',
  s2: 'Select a band for red channel.',
  s3: 'Select band for green channel.',
  s4: 'Select band for blue channel'
  }
;
var links = {
  book: 'https://docs.google.com/document/d/1dLSaGXlAnI0jK6LAB6F-gQLBA30NTT0pz1tovHfOmvI/edit#heading=h.czhq6fehjh84',
  author: 'https://jeffhowarth.github.io/',
  rgb: 'https://jhowarth.users.earthengine.app/view/ee-edu-rgb'
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
      whiteSpace: 'pre'
    }
  }
)
;
// var makeCreditLabel = function(title, style, link) {
//   return ui.Label({
//     value: title,
//     style: style,
//     targetUrl: link
//   });
// };
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
var image_check = ui.Checkbox(labels.s1, false);
image_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  image_panel.style().set('shown',checked);
});
var red_check = ui.Checkbox(labels.s2, false);
red_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  red_panel.style().set('shown',checked);
});
var green_check = ui.Checkbox(labels.s3, false);
green_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  green_panel.style().set('shown',checked);
});
var blue_check = ui.Checkbox(labels.s4, false);
blue_check.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  blue_panel.style().set('shown',checked);
});
// -----------------------------------
// Compose panel. 
// -----------------------------------
panel
  .add(ui.Label(labels.title, lettering.h1))
  .add(image_check) 
  .add(image_panel)
  .add(red_check)  
  .add(red_panel)
  .add(green_check)
  .add(green_panel)
  .add(blue_check)
  .add(blue_panel)
  .add(rgb_panel)
  .add(ui.Label(labels.book, lettering.credits, links.book))
  .add(credits_panel)
;
// -----------------------------------
// Update functions. 
// -----------------------------------
// clear panels  
var clearPanels = function() {
  red_chart_panel.clear();
  green_chart_panel.clear();
  blue_chart_panel.clear();
  rgb_chart.clear();
};
// Update chart panel.  
var updateChart = function(panel, channel) {
  panel.clear();
  panel.add(
    tools.makeHistogram(
      config.image, 
      channel.viz.bands, 
      30,
      channel.viz.min,
      channel.viz.max
      )
    );
  };
// Update map function.  
var updateMap = function(index, channel, label) {
    map.layers().set(
      index,
      ui.Map.Layer(
        config.image, 
        channel.viz, 
        label, 
        true, 
        1
        )
      )
    ;
};
// Draw RGB composite. 
var updateRGB = function() {
  print(config);
  rgb_viz = { 
    min: [
      Number(config.red.viz.min), 
      Number(config.green.viz.min), 
      Number(config.blue.viz.min)
      ],
    max: [
      Number(config.red.viz.max), 
      Number(config.green.viz.max), 
      Number(config.blue.viz.max)
      ],
    bands: [
      config.red.viz.bands, 
      config.green.viz.bands, 
      config.blue.viz.bands
    ]
  };
  print(rgb_viz);
  map.layers().set(
    3,
    ui.Map.Layer(
      config.image.select(rgb_viz.bands), 
      rgb_viz, 
      'RGB composite', 
        true, 
        1
    )
  );
};
var updateImageID = function() {
  image_id_panel.clear();
  // band_name_panel.clear();
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
    clearPanels();
    updateImageID();
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
// BANDS
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
// -----------------
// Choose a red channel
// -----------------
var red_select = ui.Select({
  placeholder: 'Select red channel ...',
  items: Object.keys(bands),
  onChange: function(key) {
    config.red.viz.bands = bands[key][0];
    // updateBandName();
    updateMap(0, config.red, 'Red channel');
    updateChart(red_chart_panel, config.red);
  }
})
;
// Define max
var red_max = ui.Textbox({
  placeholder: 'Enter max as number',
  onChange: function(text) {
    config.red.viz.max = text;
  updateMap(0, config.red, 'Red channel');
  updateChart(red_chart_panel, config.red);
  }
});
// Define min.
var red_min = ui.Textbox({
  placeholder: 'Enter min as number',
  onChange: function(text) {
    config.red.viz.min = text;
  updateMap(0, config.red, 'Red channel');
  updateChart(red_chart_panel, config.red);
  }
});
red_panel
  .add(red_select)
  .add(red_max)
  .add(red_min)
  .add(red_chart_panel)
;
// -----------------
// Choose a green channel
// -----------------
var green_select = ui.Select({
  placeholder: 'Select green channel ...',
  items: Object.keys(bands),
  onChange: function(key) {
    config.green.viz.bands = bands[key][0];
    // updateBandName();
    updateMap(1, config.green, 'Green channel');
    updateChart(green_chart_panel, config.green);
  }
})
;
// Define max
var green_max = ui.Textbox({
  placeholder: 'Enter max as number',
  onChange: function(text) {
    config.green.viz.max = text;
  updateMap(1, config.green, 'Green channel');
  updateChart(green_chart_panel, config.green);
  }
});
// Define min.
var green_min = ui.Textbox({
  placeholder: 'Enter min as number',
  onChange: function(text) {
    config.green.viz.min = text;
  updateMap(1, config.green, 'Green channel');
  updateChart(green_chart_panel, config.green);
  }
});
green_panel
  .add(green_select)
  .add(green_max)
  .add(green_min)
  .add(green_chart_panel)
;
// -----------------
// Choose a blue channel
// -----------------
var blue_select = ui.Select({
  placeholder: 'Select blue channel ...',
  items: Object.keys(bands),
  onChange: function(key) {
    config.blue.viz.bands = bands[key][0];
    // updateBandName();
    updateMap(2, config.blue, 'Blue channel');
    updateChart(blue_chart_panel, config.blue);
  }
})
;
// Define max
var blue_max = ui.Textbox({
  placeholder: 'Enter max as number',
  onChange: function(text) {
    config.blue.viz.max = text;
  updateMap(2, config.blue, 'Blue channel');
  updateChart(blue_chart_panel, config.blue);
  }
});
// Define min.
var blue_min = ui.Textbox({
  placeholder: 'Enter min as number',
  onChange: function(text) {
    config.blue.viz.min = text;
  updateMap(2, config.blue, 'Blue channel');
  updateChart(blue_chart_panel, config.blue);
  }
});
blue_panel
  .add(blue_select)
  .add(blue_max)
  .add(blue_min)
  .add(blue_chart_panel)
;
// Draw RGB
var rgb_button = ui.Button({
  label: 'Add RGB composite',
  onClick: function() {updateRGB()}
  });
rgb_panel
  .add(rgb_button)
  .add(rgb_chart)
;
// clear rgb chart
var clear_rgb_button = ui.Button({
  label: 'Clear RGB chart',
  onClick: function() {rgb_chart.clear()}
  });
map.onClick(function(coords) {
  rgb_chart.clear();
  var chart = ui.Chart.image.regions({
    image: config.image.select(rgb_viz.bands), 
    regions: ee.Geometry.Point([coords.lon, coords.lat]),
    reducer: ee.Reducer.mean(), 
    scale: 30, 
    })
    .setChartType('ColumnChart');
  var style = {
    reverseCategories: true,
    bar: {
      groupWidth: '38%'
    },
    colors: ['Black'],
    legend: {
      position: 'none'
    },
    vAxis: {
      minValue: 0, 
      maxValue: 20000,
      ticks: [5000, 10000, 15000, 20000]
    }
  };
  chart.setOptions(style);
  rgb_chart.add(chart);
  rgb_chart.add(ui.Label(labels.rgb, lettering.credits, links.rgb));
  rgb_chart.add(clear_rgb_button);
  }
);