var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
var snazzyBlack = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry', //labels //all
    stylers: [{visibility: 'on'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
  },
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#ffffff'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#eaeaea'}]
  },
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#dedede'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{color: '#434343'}, {visibility: 'on'}]
  }
];
Map.setOptions(
    'snazzyBlack', {snazzyBlack: snazzyBlack});
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
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
// set position of panel
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    height: '300px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'USDA NASS Cropland Data Layers',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0',
    }
});
// Add the title to the panel
legend.add(legendTitle);
var yr = 2020
var dataset = ee.ImageCollection('USDA/NASS/CDL')
                    .filter(ee.Filter.calendarRange(yr,yr,'year')).first()
var cropLandcover = dataset.select('cropland');
//  Palette with the colors
var palette = cropLandcover.get('cropland_class_palette').getInfo();
// name of the legend
var names = cropLandcover.get('cropland_class_names').getInfo();
// Add color and and names
for (var j = 0; j < names.length; j++) {
  if ((j < 58) || (j > 195)) {
    if (names[j].length > 0) {
      legend.add(makeRow(palette[j], names[j]));
      }
    }
  }
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
function showLayer(yr) {
  var dataset = ee.ImageCollection('USDA/NASS/CDL')
                    .filter(ee.Filter.calendarRange(yr,yr,'year')).first()
  var cropLandcover = dataset.select('cropland');
  var cropMask1 = cropLandcover.lt(58) || cropLandcover.gt(195)
  var cropMask2 = cropLandcover.gt(195) // && cropLandcover.gt(195)
  var cropLandcoverMasked = cropLandcover.updateMask(cropMask1)//.updateMask(cropMask2)//.updateMask(mask176).updateMask(mask152).updateMask(mask142).updateMask(mask141);
  for (var i = 0; i < Map.layers().length(); i++) {
      Map.remove( Map.layers().get(i) )
  }
  Map.addLayer(cropLandcoverMasked, {}, 'Crop Landcover');
  print(cropLandcoverMasked)
}
Map.setCenter(-100.55, 40.71, 4);
showLayer(yr)
var places = {
  '1997': 1997,
  '1998': 1998,
  '1999': 1999,
  '2000': 2000,
  '2001': 2001,
  '2002': 2002,
  '2003': 2003,
  '2004': 2004,
  '2005': 2005,
  '2006': 2006,
  '2007': 2007,
  '2008': 2008,
  '2009': 2009,
  '2010': 2010,
  '2011': 2011,
  '2012': 2012,
  '2013': 2013,
  '2014': 2014,
  '2015': 2015,
  '2016': 2016,
  '2017': 2017,
  '2018': 2018,
  '2019': 2019,
  '2020': 2020
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    showLayer(places[key]);
  }
});
// Set a place holder.
select.setPlaceholder(String(yr));
Map.add(select);