var cluster5 = ee.Image("users/shugh/amazon/cluster/cluster5_raisg"),
    Ft = ee.Image("users/shugh/amazon/RAISG/Ft_RAISG"),
    Fymin = ee.Image("users/shugh/amazon/RAISG/Fymin_RAISG"),
    Vm = ee.Image("users/shugh/amazon/RAISG/Vm_RAISG"),
    hinterland = ee.Image("users/shugh/amazon/RAISG/hinterland_RAISG"),
    ifl = ee.Image("users/shugh/amazon/RAISG/ifl_RAISG"),
    raisg = ee.FeatureCollection("users/shugh/amazon/RAISG_boundary"),
    primary = ee.Image("users/shugh/amazon/Brazil_primary_2001"),
    patch = ee.Image("users/shugh/amazon/RAISG/cluster5_forestBlock_degraded"),
    patch2 = ee.Image("users/shugh/amazon/RAISG/cluster5_forestBlock2"),
    kayapo = ee.FeatureCollection("users/shugh/amazon/Kayapo"),
    kayapo_class = ee.Image("users/shugh/amazon/kayapo_classification");
//Set up a UI map in the web apps
var col10 = ["#6E462D", "#825F38", "#967C44", "#AB9A50", "#C2BB5F", "#BBBF67", "#98A868", "#738F67", "#547A68", "#306466"];
var col5 = ["#C2523C", "#D97529", "#35E300", "#1E9E84", "#0C2F7A"];
var colPatch = ["#C2523C", "#F7D707", "#0EC441", "#0B2C7A", "#9966cc"];
//var col7 = ["#006100", "#559100", "#A4C400", "#FFFF00", "#FFBB00", "#FF7700", "#FF2600"];
var col7 = ["#9966cc","#006100", "#007FFF","#FFFF00", "#FFBB00", "#FF7700", "#FF2600"];
// Load 2012 MODIS land cover and select the IGBP classification.
var cover = ee.Image('MODIS/051/MCD12Q1/2012_01_01')
  .select('Land_Cover_Type_1');
// Define a palette for the 18 distinct land cover classes.
var igbpPalette = [
  'aec3d4', // water
  '152106', '225129', '369b47', '30eb5b', '387242', // forest
  '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40',  // shrub, grass
  '111149', // wetlands
  'cdb33b', // croplands
  'cc0013', // urban
  '33280d', // crop mosaic
  'd7cdcc', // snow and ice
  'f7e084', // barren
  '6f6f6f'  // tundra
];
var hinter = hinterland.updateMask(hinterland.eq(1))
var ifl2 = ifl.updateMask(ifl.eq(0))
var raisg_boundary = ee.FeatureCollection(raisg)
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: raisg_boundary,
  color: 1,
  width: 3
});
// Create and style widgets.
var intro = ui.Panel([
  ui.Label({
    value: 'Legend',
    style: {fontSize: '20px', fontWeight: 'bold'},
  })
]);
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'cluster classes',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
//  Palette with the colors
var palette = ["C2523C", "D97529", "35E300", "1E9E84", "0C2F7A"]
// name of the legend
var names = ['1','2','3','4','5'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
////////////////////////////////////////////////
//legend 2
/////////////////////////////////////////
// set position of panel
var legend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Vm',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 12px 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle2);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
//  Palette with the colors
// name of the legend
var names = ['high', '','','','low'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
////////////////////////////////////////////////
//legend 3
/////////////////////////////////////////
// set position of panel
var legend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Ft & Fymin',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 12px 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle2);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
//  Palette with the colors
var palette2 = palette.reverse()
// name of the legend
var names = ['high', '','','','low'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette2[i], names[i]));
  }  
////////////////////////////////////////////////
//legend 4
/////////////////////////////////////////
// set position of panel
var legend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle4 = ui.Label({
  value: 'Forest Blocks',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 12px 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle4);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
//  Palette with the colors
var palette2 = ["C2523C", "F7D707", "0EC441", "0B2C7A","9966cc"]
// name of the legend
var names = ['25ha to <2500ha', '2500ha to 10000ha','10000ha to 50000ha', '>50000ha', 'degraded natural forest'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette2[i], names[i]));
  }  
////////////////////////////////////////////////
//legend 4
/////////////////////////////////////////
// set position of panel
var legend5 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle5 = ui.Label({
  value: 'Forest Blocks',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 12px 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle5);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
//  Palette with the colors
var palette5 = ["9966cc","006100", "007FFF","FFFF00", "FFBB00", "FF7700", "FF2600"];
// name of the legend
var names = ["Deforestation", "Primary Forest", "Water", "Not Forest", "Not Forest 2", "Clouds", "Residual"];
// Add color and and names
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette5[i], names[i]));
  }  
// Add the widgets to a new panel.
var panel = ui.Panel();
panel.add(intro);
panel.add(legend);
panel.add(legend2);
panel.add(legend3);
panel.add(legend4);
panel.add(legend5);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
Map.centerObject(cluster5,4)
//Map.setCenter(-62.7464165519786, -4.166838687005242, 4);
Map.addLayer(cover,
             {min: 0, max: 17, palette: igbpPalette},
             'MODIS landcover - IGBP');
Map.addLayer(Ft, {min:0, max:100, palette: col5}, 'Ft');
Map.addLayer(Fymin, {min:0, max:100, palette: col5}, 'Fymin');
Map.addLayer(Vm, {min:0, max:1, palette: col5.reverse()}, 'Vm');
Map.addLayer(cluster5, {min:1, max:5, palette: col5.reverse()}, 'cluster');
Map.addLayer(hinter, {palette:'blue'}, 'hinterland');
Map.addLayer(ifl2, {palette:'indigo'}, 'ifl');
Map.addLayer(outline, {palette: 'FF0000'}, 'RAISG boundary')
Map.addLayer(primary.updateMask(primary.eq(2)), {palette: 'black'}, '2001 primary forest (Turubanova et al. 2018)')
Map.addLayer(patch, {min:1, max:5, palette:colPatch}, 'Forest Blocks c4c5')
Map.addLayer(patch2, {min:1, max:5, palette:colPatch}, 'Forest Blocks c3c4c5')
//print(ee.FeatureCollection(kayapo))
//Map outline of Kayapo boundary
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var outline2 = empty.paint({
  featureCollection: ee.FeatureCollection(kayapo),
  color: 1,
  width: 3
});
Map.addLayer(outline2, {palette: "orange"}, "Kayapo Boundary")
Map.addLayer(kayapo_class, {min:1,max:7, palette: col7}, "Kayapo Classification")
/*
// Create and style widgets.
var intro = ui.Panel([
  ui.Label({
    value: 'Legend',
    style: {fontSize: '20px', fontWeight: 'bold'}
  })
]);
var lon = ui.Label();
var lat = ui.Label();
// Add the widgets to a new panel.
var panel = ui.Panel();
panel.add(intro);
panel.add(lon);
panel.add(lat);
// Add the new panel to the root panel.
ui.root.insert(0, panel);
// Setup the map.
//Map.centerObject(cluster5,4)
Map.setCenter(-62.7464165519786, -4.166838687005242, 4);
Map.addLayer(cluster5, {min:1, max:5, palette: col5}, 'cluster')
Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  // Add a red point to the map wherever the user clicks.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(1, dot);
});
Map.style().set('cursor', 'crosshair');
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
//  Palette with the colors
var palette = deepRedToGreen2.reverse()
// name of the legend
var names = ['High','','','','','','','','', '','Low'];
// Add color and and names
for (var i = 0; i < 11; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
*/