//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  name:     rgbLights.js
//  purpose:  RGB of stable nighttime lights (1993-2013)
//
//  author:   Jeff Howarth
//  update:   11/20/2021  
//  license:  Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Initialize panel.
var panel = ui.Panel(
  {style: 
    {
      width: '215px',
      padding: '4px'
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
//  load images, select stable lights band, rename after year
var lights93 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F101993')
  .select('stable_lights').rename('1993');
var lights03 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F152003')
  .select('stable_lights').rename('2003');
var lights13 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182013')
  .select('stable_lights').rename('2013');
//  construct three band image
var changeImage = lights13
  .addBands(lights03)
  .addBands(lights93)
;
//  add image to map
map.setCenter(126.8, 33.485, 5);
map.setOptions('HYBRID');
map.setControlVisibility({drawingToolsControl: false});
map.addLayer(changeImage, {min:0,max:63}, "RGB composite", 1, 1);
// styles  
var styles = {
  title: {
    fontWeight: '900',
    fontSize: '24px',
    // margin: '0 0 4px 0',
    // padding: '0',
    // color:'FFF3DD',
    // backgroundColor:'#000000'
    },
  label: {
    // fontWeight: '800',
    fontSize: '16px',
    // margin: '0 0 4px 0',
    // padding: '0',
    // backgroundColor:'#000000'
    },
  legend: {
    position: 'bottom-left',
    // padding: '8px 15px',
    // backgroundColor: '#000000'
    },
  credits: {
    // fontWeight: '100',
    fontSize: '12px',
    // margin: '0 0 4px 0',
    // padding: '0',
    // color:'FFF3DD',
    // backgroundColor:'#000000'
    },
  instructions: {
    fontSize: '12px',
    whiteSpace: 'pre'
  }
}
;
var legend = ui.Panel(
  // {
  // style: styles.legend 
  // }
);
// labels 
var labels = {
  title: 'CHANGES IN THE NIGHT', 
  red: '2013',
  green: '2003', 
  blue: '1993',
  blurb: 'Brightness of stable nighttime lights\nin 2013, 2003, and 1993.',
  instructions: 'Click on location to chart change.', 
  rgb: 'Additive color ee-edu-app',
  source: 'source'
  }
;
var links = {
  rgb: 'https://jhowarth.users.earthengine.app/view/ee-edu-rgb',
  article: 'https://github.com/jeffhowarth/ee-edu-apps/blob/main/lessons/rgbLights/lights.md',
  source: 'https://developers.google.com/earth-engine/datasets/catalog/NOAA_DMSP-OLS_CALIBRATED_LIGHTS_V4'
  }
;
var title = ui.Label({
  value: labels.title,
  style: styles.title 
  });
var source = ui.Label({
  value: labels.source,
  style: styles.credits, 
  targetUrl: links.source
  }
);
var blurb = ui.Label({
  value: labels.blurb,
  style: styles.instructions
  }
);
var red = ui.Label({
  value: labels.red,
  style: styles.label
  })
  ;
red.style().set({color: '#ff0000'});
var green = ui.Label({
  value: labels.green,
  style:  styles.label
  })
  ;
green.style().set({color: '#00ff00'});
var blue = ui.Label({
  value: labels.blue,
  style: styles.label
  })
  ;
blue.style().set({color: '#0000ff'});
var instructions = ui.Label({
  value: labels.instructions,
  style: styles.instructions
  }
);
var credits = ui.Label({
  value: "more info",
  style: styles.credits,
  targetUrl: links.article
  });
// clear rgb chart
var rgb_chart = ui.Panel();
var clear_rgb_button = ui.Button({
  label: 'Clear RGB chart',
  onClick: function() {rgb_chart.clear()}
  });
map.onClick(function(coords) {
  rgb_chart.clear();
  var chart = ui.Chart.image.regions({
    image: changeImage.select(['2013', '2003', '1993']), 
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
      maxValue: 64,
      ticks: [10, 20, 30, 40, 50, 60]
    }
  };
  chart.setOptions(style);
  rgb_chart.add(chart);
  rgb_chart.add(ui.Label(labels.rgb, styles.credits, links.rgb));
  rgb_chart.add(clear_rgb_button);
  }
);
// Exploration list.  
var patterns = {
  'Flame': [121.454780, 31.222945, 6],
  'Aurora': [129.869311, 34.755374, 6],
  'Holiday lights': [75.171582, 62.896614, 6],
  'Red giant': [-103.072580, 48.261784, 6],
  'Political lines': [74.341854, 30.785147, 6]
};
var select_pattern = ui.Select({
  items: Object.keys(patterns),
  placeholder: 'Explore a pattern',
  onChange: function(key) {
    map.setCenter(patterns[key][0], patterns[key][1], patterns[key][2]);
  }
});
// Compose panel. 
panel
  .add(title)
  .add(legend
    .add(blurb)
    .add(red)
    .add(green)
    .add(blue)
    )
  .add(select_pattern)
  .add(instructions)
  .add(rgb_chart)
  .add(source)
  .add(credits)
  ;