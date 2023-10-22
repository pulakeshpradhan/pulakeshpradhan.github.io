var mod11a2 = ee.ImageCollection('MODIS/006/MOD11A2').filterDate('2010-01-01','2019-12-31')
  .select(['LST_Day_1km','LST_Night_1km'])
var threshold = 13657.5 // equivalent to 0°C
var test = function(i) {
  var d = i.select('LST_Day_1km').lte(threshold)
  var n = i.select('LST_Night_1km').lte(threshold)
  var b = d.add(n).neq(0)
  return i.addBands([d,n,b]).select([2,3,4]).rename(['day','night','both'])
}
var freeze = mod11a2.map(test)
Map.addLayer(freeze.first())
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
var colors = ['a9fff3','540391'];
map.layers().set(0, ui.Map.Layer(ee.Image(0),{opacity:0.01},'base'));
map.layers().set(1, ui.Map.Layer(ee.Image(0),{opacity:0.01},'base'));
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
  value: 'When and where does it freeze?',
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
  value: '© 2020 Cartoscience',
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
      var sum = freeze.filter(ee.Filter.calendarRange(month,month,'month')).sum()
      for (var i=0; i<12; i++) {
        panel.widgets().get(i).style().set('color','404040');
      }
      panel.widgets().get(month-1).style().set('color','cc33ff');
      var day = sum.select('day').gt(0)
      var night = sum.select('night').gt(0)
      // 374e6e,1dd8ff
      map.layers().set(0, ui.Map.Layer(night.updateMask(night.neq(0)),{palette:'1dd8ff'},'Frozen ('+b+')'));
      map.layers().set(1, ui.Map.Layer(day.updateMask(day.neq(0)),{palette:'374e6e'},'Frozen ('+b+')'));
    }
  });
  return panel.add(button);
});
panel.widgets().get(0).style().set('color','404040');
var footer = ui.Label({
  value: 'Select a month to generate a freezing occurrence map | MOD11A2.006 Land Surface Temperature (2010–2019)',
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
  widgets: footer,
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
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var palette =['374e6e','1dd8ff'];
var names = ['Day','Night'];
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
}  
map.add(legend);