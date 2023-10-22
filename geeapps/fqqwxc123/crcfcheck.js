var JRC_Mon = ui.import && ui.import("JRC_Mon", "imageCollection", {
      "id": "JRC/GSW1_1/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_1/MonthlyHistory"),
    L1 = ui.import && ui.import("L1", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_1"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_1"),
    L2 = ui.import && ui.import("L2", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_2"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_2"),
    L3 = ui.import && ui.import("L3", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_3"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_3"),
    L4 = ui.import && ui.import("L4", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_4"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_4"),
    L5 = ui.import && ui.import("L5", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_5"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5"),
    JRC = ui.import && ui.import("JRC", "image", {
      "id": "JRC/GSW1_1/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_1/GlobalSurfaceWater"),
    L6 = ui.import && ui.import("L6", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_6"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_6"),
    L7 = ui.import && ui.import("L7", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_7"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7"),
    river = ui.import && ui.import("river", "table", {
      "id": "users/fqqwxc123/river"
    }) || ee.FeatureCollection("users/fqqwxc123/river"),
    lake = ui.import && ui.import("lake", "table", {
      "id": "users/fqqwxc123/lake"
    }) || ee.FeatureCollection("users/fqqwxc123/lake"),
    classified2020 = ui.import && ui.import("classified2020", "image", {
      "id": "users/fqqwxc123/classified-08292020"
    }) || ee.Image("users/fqqwxc123/classified-08292020"),
    classified2019 = ui.import && ui.import("classified2019", "image", {
      "id": "users/fqqwxc123/classified-08292019"
    }) || ee.Image("users/fqqwxc123/classified-08292019"),
    classified2018 = ui.import && ui.import("classified2018", "image", {
      "id": "users/fqqwxc123/classified-08292018"
    }) || ee.Image("users/fqqwxc123/classified-08292018"),
    classified2017 = ui.import && ui.import("classified2017", "image", {
      "id": "users/fqqwxc123/classified-08292017"
    }) || ee.Image("users/fqqwxc123/classified-08292017");
//print(JRC)
print(L2)
// Create the left map,set map style
  var leftMap = ui.Map();
  leftMap.setControlVisibility(true);
  leftMap.setOptions('SATELLITE')
  leftMap.setCenter(116.35,29.02,6);
// Create the right map,set map style
  var rightMap = ui.Map();
  rightMap.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
  rightMap.setOptions('SATELLITE')
// creat a splitpanel to show left and right map
  var linker = ui.Map.Linker([leftMap, rightMap]);
  var splitPanel = ui.SplitPanel
  ({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
   });
  ui.root.widgets().reset([splitPanel]);
/* Data process*/
  var layerProperties = 
  {
  'classified2020':
   {
     name:'classified2020',
     ID:'users/fqqwxc123/classified-08292020',
     visParams:
    { max:3,min:1,palette:'#e3b717,#216fe3,#36e321'},
     legend:
     [
      {'CRCF':'#e3b717'},
      {'Ponds':'#216fe3'},
      {'lotus':'#36e321'}
     ],
     defaultVisibility:true
    },
  'classified2019':
   {
    name:'classified2019',
    ID:'users/fqqwxc123/classified-08292019',
     visParams:
    { max:3,min:1,palette:'#e3b717,#216fe3,#36e321'},
     legend:
     [
      {'CRCF':'#e3b717'},
      {'Ponds':'#216fe3'},
      {'lotus':'#36e321'}
     ],
     defaultVisibility:false
    },
  'classified2018':{
     name:'classified2018',
     ID:'users/fqqwxc123/classified-08292018',
     visParams:
    { max:3,min:1,palette:'#e3b717,#216fe3,#36e321'},
     legend:
     [
      {'CRCF':'#e3b717'},
      {'Ponds':'#216fe3'},
      {'lotus':'#36e321'}
     ],
     defaultVisibility:false
    },
  'classified2017':{
    name:'classified2017',
    ID:'users/fqqwxc123/classified-08292017',
   visParams:
    { max:3,min:1,palette:'#e3b717,#216fe3,#36e321'},
     legend:
     [
      {'CRCF':'#e3b717'},
      {'Ponds':'#216fe3'},
      {'lotus':'#36e321'}
     ],
     defaultVisibility:false
    },
  }
  var Fea = [L7,L6,L5,L4,L3];
  var para = [{palette:'#d6a939'},{palette:'#1b91d6'},{palette:'#59d63e'},{palette:'#39d6cb'},{palette:'#430000'}]
  var color = [1,2,3,4,5]
  var width = [1,2,3,4,5]
/*  var layerProperties_1 = [
  {
    name:L1,
    visParams:{color:'#d6a939'},
    defaultVisibility:true
    },
   {
    name:L2,
    visParams:{color:'#1bd6c5'},
    defaultVisibility:false
    },
    { 
    name:L3,
    visParams:{color:'#59d63e'},
    defaultVisibility:false
    },
     {
    name:L4,
    visParams:{color:'#39d6cb'},
    defaultVisibility:false
    },
     {
    name:L5,
    visParams:{color:'#4c37d6'},
    defaultVisibility:false
    }
  ]
Map.setCenter(116.35,29.02);
*/
/*
#########First:View different GRC layers ;#######
*/
// creat a fundmental panel
  var header = ui.Label('Water resource visualization',{fontSize: '36px', color: 'red'});
  var text = ui.Label('Results from analysis of WWF HYdroSHEDS and GRC global surface water.',{fontSize: '11px'});
  var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
  toolPanel.style().set('shown', false)
  var link = ui.Label('Lehner, B., Grill G. (2013): Global river hydrography and network routing: baseline data and new approaches to study the world’s large river systems. Hydrological Processes, 27(15): 2171–2186.  ', {},'http://www.hydrosheds.org');
  var linkPanel = ui.Panel([ui.Label('For more information', {fontWeight: 'bold'}), link]);
  ui.root.widgets().add(toolPanel);
  toolPanel.add(linkPanel); 
//creat a selector  
for (var key in layerProperties) 
  {
    var layer = layerProperties[key];
    var image =ee.Image(layer.ID);
    rightMap.addLayer(image, layer.visParams, key, layer.defaultVisibility);
  }
  var selectItems = Object.keys(layerProperties);
  var layerSelect = ui.Select
  ({
    items: selectItems,
    value: selectItems[0],
    onChange: function(selected) 
    {
     rightMap.layers().forEach
     (function(element, index) 
      {
      element.setShown(selected == element.getName());
      }
     );
   setLegend(layerProperties[selected].legend);
   }
  });
// Add the selector to the toolPanel with some explanatory text.
  toolPanel.add(ui.Label('View Different Layers', {'font-size': '24px'}));
  toolPanel.add(layerSelect);
  var legendPanel = ui.Panel
  ({
    style:{fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
  });
  toolPanel.add(legendPanel);
  var legendTitle = ui.Label
  ('Legend',{fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
  legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
  var keyPanel = ui.Panel();
  legendPanel.add(keyPanel);
  function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
  setLegend(layerProperties[layerSelect.getValue()].legend);
// Add Opacity slider and checkbox
  var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    rightMap.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    layerSelect.setDisabled(!value);
    }
  });
  var opacitySlider = ui.Slider({
    min: 0,
    max: 1,
    value: 1,
    step: 0.01,
  });
  opacitySlider.onSlide(function(value) {
    rightMap.layers().forEach(function(element, index) {
    element.setOpacity(value);
    });
  });
  var viewPanel =
  ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
  toolPanel.add(viewPanel);
// Create a button to open the fundmental panel.
  var button_on = ui.Button({
    label: 'Open settings',
    style:{
    position:'middle-right'},
    onClick: function() {
    // Hide the button.
    button_on.style().set('shown', false);
    // Display the panel.
    toolPanel.style().set('shown', true);
// Temporarily make a map click hide the panel
// and show the button.
    var listenerId = leftMap.onClick(function() {
      toolPanel.style().set('shown', false);
      button_on.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      rightMap.unlisten(listenerId);
      });
    }
  });
// Add the button to the map and the panel to root.
  rightMap.add(button_on);
/* 
############Second: add a zoomBox to show the water resource in detail##########
*/
var showLayer = function(year)
{
  //Map.layers().reset();
  var date = ee.Date.fromYMD(year,6,1);
  var dateRange = ee.DateRange(date,date.advance(1,'year'));
  var image = JRC_Mon.filterDate(dateRange).first();
   zoomBox.addLayer({
    eeObject:ee.Image(image),
    visParams:{
      palette:'ffffff,fffcb8,0905ff',
      min:0,
      max:2
      },
      name:String(year)
    });
  };
Map.style().set('cursor', 'crosshair');    
var zoomBox = ui.Map({style: {stretch: 'both', shown: true}})
    .setControlVisibility(false);
//zoomBox.addLayer(water_resource,{palette:'ffffff,fffcb8,0905ff',min:0,max:2});
zoomBox.setCenter(116.35,29.02,8)
var label_box = ui.Label('water resource for year');
var slider_box = ui.Slider({
  min:2013,
  max:2018,
  step:1,
  onChange:showLayer,
  style:{stretch:'horizontal'}
  })
  slider_box.setValue(2013);
  var panel_box = ui.Panel({
  widgets: [label_box, slider_box],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '6px'
  }
});
toolPanel.add(panel_box) 
var centerZoomBox = function(lon, lat) {
  instructions.style().set('shown', false);
  zoomBox.style().set('shown', true);
  zoomBox.setCenter(lon, lat, 8);
  var bounds = zoomBox.getBounds();
  var w = bounds[0], e = bounds [2];
  var n = bounds[1], s = bounds [3];
  var outline = ee.Geometry.MultiLineString([
    [[w, s], [w, n]],
    [[e, s], [e, n]],
    [[w, s], [e, s]],
    [[w, n], [e, n]],
  ]);
}
 /* var layer = ui.Map.Layer(outline, {color: 'FFFFFF'}, 'Zoom Box Bounds');
  Map.layers().set(1, layer);
};
*/
// Add a label and the zoom box map to the default map.
var instructions = ui.Label('Click the map to see an area in detail.', {
  stretch: 'both',
  textAlign: 'center',
  backgroundColor: '#d3d3d3'
});
var panel = ui.Panel({
  widgets: [zoomBox, instructions],
  style: {
    position: 'bottom-left',
    height: '300px',
    width: '300px',
  }
});
//Map.add(ui.Label('Water Resource Aanlysis'));
toolPanel.add(panel);
/*
Third:Claculate the area of water in zoomBox then show it 
*/
// Create an inspector panel with a horizontal layout.
/*var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
inspector.add(ui.Label('Click to get area'));
Map.add(inspector);
*/
rightMap.onClick(function(coords) {
  centerZoomBox(coords.lon, coords.lat);})
/*  
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
});     
*/
//third:hydro sheds basin visualization
//add layers
  var showLayer = function(key) {
  leftMap.layers().reset();
  var empty = ee.Image().byte();
  var outlines = empty.paint
  ({
    featureCollection: Fea[key-1].filterBounds(ROI),
    color: color[key-1],
    width: width[key-1],
  });
  leftMap.addLayer(outlines,para[key-1],layer[key],true);
}
//a slide box to add layer
  var slider_box = ui.Slider({
    min:1,
    max:5,
    step:1,
    onChange:showLayer,
    style:{stretch:'horizontal',
    }
  })
// set default layer  
  leftMap.addLayer(L7.filterBounds(ROI).draw({color: '#d6a939', strokeWidth: 1}), {}, 'drawn');
  leftMap.addLayer(lake.draw({color:'blue',strokeWidth:1}),{},'lake',false);
  leftMap.addLayer(river.draw({color:'blue',strokeWidth:1}),{},'river',false);
// creat a button to close slider box
  var button_off = ui.Button({
  label: 'close',
  onClick: function() {
    // Hide the button.
    button_off.style().set('shown', false);
    // Display the panel.
    slider_panel.style().set('shown', false);
    }
  })
  var slider_panel = ui.Panel
  ({
  widgets:[button_off,slider_box],
  layout:ui.Panel.Layout.flow('horizontal'),
  style:{stretch:'horizontal',
    height:'60px',
    width:'600px',
    position:'bottom-left'
    }
  })
leftMap.add(slider_panel);