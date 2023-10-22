var clouds = ee.Image("users/cartoscience/mod09ga_006_clouds_0118_tropics");
var latitudes = ee.FeatureCollection([
  ee.Geometry.LineString([[-180,23.5],[180,23.5]], null, false), 
  ee.Geometry.LineString([[-180,-23.5],[180,-23.5]], null, false)
]);
// Create month codes
var months = {
  'January':1,'February':2,'March':3,'April':4,
  'May':5,'June':6,'July':7,'August':8,'September':9,
  'October':10,'November':11,'December':12
};
// Basemap design
var basemap = {
  'basemap': [
    {
      featureType: 'water',
      stylers: [
        { color: '#404040' }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },
  ]
};
// Set map properties
var map = ui.Map();
map.setCenter(21.29,1.61,2.5).setOptions('basemap', basemap);
map.setControlVisibility(null, false, false, true, false, false);
var colors = ['a9fff3','00c4ff','d674ff','a514ff','540391'];
var outline = ee.Image().byte().paint({
  featureCollection: latitudes,
  width: 1
});
map.layers().set(0, ui.Map.Layer(clouds.select('constant_1'),{min:0,max:100,palette:colors},'cloud frequency (January)'));
map.layers().set(1, ui.Map.Layer(outline,{palette:'404040'},'latitudes'));
// Create top panel
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'), 
  style: {
    position: 'top-center',
    padding: '0',
    margin: '-6.5px',
    backgroundColor: '404040'
  }
});
var panelWrap = ui.Panel({
  widgets: [panel],
  layout: ui.Panel.Layout.absolute(),
  style: {
    height: '43px',
    margin: '0 0 0 0',
    backgroundColor: 'f5f5f5'
  }
});
// Create map title
var title = ui.Label({
  value: 'When and where are the tropical clouds?',
  style: {
    stretch: 'horizontal',
    height: '50px',
    fontWeight: 'bold', 
    margin: '-3px 0 -8px 0', 
    textAlign: 'center', 
    fontSize: '16px', 
    color: '404040', 
    backgroundColor: 'f5f5f5'
  }
});
// Create copyright link
var link = ui.Label({
  value: '© 2019 Cartoscience',
  targetUrl: 'https://cartoscience.com',
  style: {
    stretch: 'horizontal',
    height: '30px',
    margin: '-8px 0 -5px 0', 
    textAlign: 'center', 
    fontSize:'10px', 
    backgroundColor: 'f5f5f5'
  }
});
var strip = ui.Panel({
  style: {
    height: '10px',
    backgroundColor: '404040'
  }
});
// Add buttons to panel and create on click function
Object.keys(months).map(function (b) {
  var button = ui.Button({
    label: b,
    style: {
      color: '404040',
      margin: '0',
      padding: '0',
      backgroundColor: 'f5f5f5',
      width: '75px',
      border: '2px solid #f5f5f5'
    },
    onClick: function(m) {
      var month = months[b];
      var frequency = clouds.select(month-1).updateMask(clouds.select('constant_1'));
      for (var i=0; i<12; i++) {
        panel.widgets().get(i).style().set('color','404040');
      }
      panel.widgets().get(month-1).style().set('color','cc33ff');
      map.layers().set(0, ui.Map.Layer(frequency,{min:0,max:100,palette:colors},'cloud frequency ('+b+')'));
    }
  });
  return panel.add(button);
});
panel.widgets().get(0).style().set('color','cc33ff');
// Create legend
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x1',
      format: 'png',
      palette: palette,
    },
    style: {
      stretch: 'horizontal', 
      margin: '3px 0 0 0'
    },
  });
}
var style = {
  min: 0,
  max: 100,
  palette: colors
};
var valStyle = {
  margin: '0 10px 0 10px', 
  fontSize: '14px', 
  backgroundColor: '404040', 
  fontWeight: 'bold', 
  color: 'e8e8e8'
};
var val0 = ui.Label('0', valStyle);
var val100 = ui.Label('100%', valStyle);
var legend =  ui.Panel({
  widgets: [val0, ColorBar(style.palette), val100],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    backgroundColor:'404040', 
    margin: '8px 0 0 0'
  }
});
var footer = ui.Label({
  value: 'Select a month to generate a monthly cloud cover frequency map | MOD09GA.006 Terra Surface Reflectance (2001–2018) | 23.5 N – 23.5 S',
  style: {
    fontSize: '11px',
    stretch: 'horizontal',
    color: 'e8e8e8',
    backgroundColor: '404040',
    textAlign: 'center',
    margin: '5px 0 10px 0'
  }   
});
var legendPanel = ui.Panel({
  widgets: [legend, footer],
  layout: ui.Panel.Layout.flow('vertical'),
  style: { 
    backgroundColor: '404040'
  }
});
// Add elements to display
ui.root.clear();
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
ui.root.insert(0,title);
ui.root.insert(1,link);
ui.root.insert(2,panelWrap);
ui.root.insert(3,legendPanel);
ui.root.insert(4,map);
ui.root.insert(5,strip);