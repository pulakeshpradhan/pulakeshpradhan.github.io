var visParams = ui.import && ui.import("visParams", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "elevation"
        ],
        "min": 0,
        "max": 2300,
        "palette": [
          "0000ff",
          "008000",
          "ffff00",
          "ffa500",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["elevation"],"min":0,"max":2300,"palette":["0000ff","008000","ffff00","ffa500","ff0000"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                79.17696297723666,
                29.14591484953139
              ],
              [
                79.17696297723666,
                28.790278305507208
              ],
              [
                79.6081763561429,
                28.790278305507208
              ],
              [
                79.6081763561429,
                29.14591484953139
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[79.17696297723666, 29.14591484953139],
          [79.17696297723666, 28.790278305507208],
          [79.6081763561429, 28.790278305507208],
          [79.6081763561429, 29.14591484953139]]], null, false);
// A UI to interactively filter a collection, select an individual image 
// from the results, display it with a variety of visualizations, and export it.
//////chnge line
////
//TEST DATA=https://code.earthengine.google.com/117dd54881fc84c27970fdb947f8b6ba?asset=projects%2Fee-dichay69%2Fassets%2FWheatCoPantagar
//projects/ee-dichay69/assets/WheatCoPantagar
//553
//44-46
//442
//'users/veshilo011/planet/yasura0'
var dict = {
  'STD-2': '990000',
  'STD-1': 'ff0000',
  'MEAN': '00ff00',
  'STD+1': '0000ff',
  'STD+2': '000099'
}
// The namespace for our application.  All the state is kept in here.
var app = {};
var layerProperties = {
  'Year of Loss': {
    name: 'lossyear',
    visParams: {min: 0, max: 1, palette: ['orange', 'orange', 'orange']},
    legend: [
      {'2016': 'red'}, {'...': 'orange'}, {'2000': 'yellow'},
      {'No loss': 'black'}, {'Water or no data': 'grey'}
    ],
    defaultVisibility: true
  },
  'Loss': {
    name: 'loss',
    visParams: {min: 0, max: 0, palette: ['red', 'red']},
    legend:
        [{'Loss': 'red'}, {'No loss': 'black'}, {'Water or no data': 'grey'}],
    defaultVisibility: false
  },
  'Percent Tree Cover': {
    name: 'treecover2000',
    visParams: {min: 0, max: 100, palette: ['black', 'green']},
    legend: [
      {'75-100%': '#000000'}, {'50-75%': '#000000'}, {'25-50%': '#000000'},
      {'0-25%': '#000000'}, {'Water or no data': '#000000'}
    ],
    defaultVisibility: false
  }
};
//COPERNICUS/S2/20180621T051651_20180621T052026_T44RLT
//  variables -----------------------------------------------------------------------
var image_name = 'COPERNICUS/S2/20180621T051651_20180621T052026_T44RLT';
var shp        = 'projects/ee-dichay69/assets/WheatCoPantagar';  //shpfile_name// use this
var column     = 'name';                     //name_of_the_field of the id of the Agricultural fields
//var anomaly    = 0.025; 
var negative_Buffer  = -10;                       // negative Buffer(m)
//var mask_NDVI  = 0.3;   
//-----------------------------------------------------------------------------------
var fc_no_Buffer   = ee.FeatureCollection(shp);
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'anomaly Explorer',
        style: {fontWeight: 'bold', fontSize: '26px', margin: '10px 5px'}
      }),
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2018-11-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2019-04-30'),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
      app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Center on map', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select an image', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
        app.picker.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  /* The export section. *///////////////////////////////////////////////////////////
  app.export = {
    button: ui.Button({
      label: 'Export the current image to Drive',
      // React to the button's click event.
      onClick: function() {
        // Select the full image id.
     //   var imageIdTrailer = app.picker.select.getValue();
     //   var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
      //  var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to Drive.
       // Export.image.toDrive({
       //   image: ee.Image(imageId).select(visOption.visParams.bands),
       ////  description: 'L8_Export-' + imageIdTrailer,
      }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
    ],
    style: app.SECTION_STYLE
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.mapCenter,
      app.picker.select,
      app.picker.centerButton,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var filtered = ee.ImageCollection(app.COLLECTION_ID);
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
      filtered = filtered.filterBounds(Map.getCenter());
    }
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    // Get the list of computed ids.
    var computedIds = filtered
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    var imageId = app.picker.select.getValue();
    var  image_name =imageId
    print(image_name)
    if (imageId) {
      // If an image id is found, create an image.
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      print(image)
      // Add the image to the map with the corresponding visualization options.
 //     var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    // var NDVI = s2ndvi(image)////////////
     var colFunc_real = function(feat) {
     var dis        = feat.get(column);
     var clipped    = NDVI.clip(feat).set(column, dis);
      return clipped;
};   
     // Function to make the Image Collection
var colFunc = function(feat) {
  var dis   = feat.get(column);
  var clipped0 = NDVI.clip(feat).set(column, dis);
  //get mean
  var clipped_mean_for_mask = clipped0.reduceRegion({
    reducer:   ee.Reducer.mean(),
    geometry:  feat.geometry(),
    scale:     10,
    maxPixels: 1e9
});
  var clipped_std1_for_mask = clipped0.reduceRegion({
  reducer: ee.Reducer.stdDev(),
  geometry: feat.geometry(),
  scale: 10,
  maxPixels: 1e9
});
 // MASK all std3 min
    var clipped_mean00 = ee.Number(clipped_mean_for_mask.get("nd"));
    var std1_vale_max_plus = ee.Number(clipped_std1_for_mask.get("nd"));
    //get mean +std3 by std1+std1+std1
    var std1_vale_max = clipped_mean00.add(std1_vale_max_plus);
    var std2_vale_max_plus =  std1_vale_max_plus.add(std1_vale_max_plus);
    var std3_vale_max_plus =  std1_vale_max_plus.add(std2_vale_max_plus);
    //end of get mean +std3 by std1+std1+std1
    var std3_vale_max_min_redy = clipped_mean00.subtract(std3_vale_max_plus);//make vale for mask from std3 min
    var clipped_mask = clipped0.updateMask(clipped0.select('nd').gt(std3_vale_max_min_redy));//mask the vale
  //END FOR MASK
  var clipped_mean = clipped_mask.reduceRegion({
  reducer:   ee.Reducer.mean(),
  geometry:  feat.geometry(),
  scale:     10,
  maxPixels: 1e9
});
  var clipped_std1 = clipped_mask.reduceRegion({
  reducer: ee.Reducer.stdDev(),
  geometry: feat.geometry(),
  scale: 10,
  maxPixels: 1e9
});
//  
  //var delta = ee.Number(anomaly) ;
  var mean_val = ee.Number(clipped_mean.get("nd"));
  var std1_vale_max_plus0 = ee.Number(clipped_std1.get("nd"));
  var std1_vale_max0 = mean_val.add(std1_vale_max_plus0);
  var std2_vale_max_plus0 =  std1_vale_max_plus0.add(std1_vale_max_plus0);
  var std2_vale_max0 = mean_val.add(std2_vale_max_plus0);
  //MIN STD 
  var std1_vale_min = mean_val.subtract(std1_vale_max_plus0);
  var std2_vale_min = mean_val.subtract(std2_vale_max_plus0);
  //to del
  //var min1 = mean_val.subtract(std1_vale_max_plus);
  //var del  = mean_val.multiply(delta);
  //var max1 = mean_val.add(del);
  //var max2 = max1.add(del);
  //var min2 = min1.subtract(del);
  //
  var image_after_Gt = clipped_mask.gt(std2_vale_min).add(clipped_mask.gt(std1_vale_min).add(clipped_mask.gt(std1_vale_max0)).add(clipped_mask.gt(std2_vale_max0)));
  return image_after_Gt;
}; 
  /////////////// TO IMAGECOLLECTION //////////////////////// 
// Function to make the mask Image Collection of low vale
var colFunc_mask = function(feat) {
  var dis = feat.get(column)
  var clipped0 = NDVI.clip(feat).set(column, dis)
  //get mean
  var clipped_mean = clipped0.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: feat.geometry(),
  scale: 10,
  maxPixels: 1e9
});
  var clipped_std1 = clipped0.reduceRegion({
  reducer: ee.Reducer.stdDev(),
  geometry: feat.geometry(),
  scale: 10,
  maxPixels: 1e9
});
    var clipped_mean00 = ee.Number(clipped_mean.get("nd"));
    var std1_vale_max_plus = ee.Number(clipped_std1.get("nd"));
    var std1_vale_max = clipped_mean00.add(std1_vale_max_plus);
    var std2_vale_max_plus =  std1_vale_max_plus.add(std1_vale_max_plus);
    var std3_vale_max_plus =  std1_vale_max_plus.add(std2_vale_max_plus);
    //var std3_vale_max_plus_redy = clipped_mean00.add(std3_vale_max_plus);
    var std3_vale_max_min_redy = clipped_mean00.subtract(std3_vale_max_plus);
   // var std3_vale_min = ee.Number(clipped_std1.get("nd")).multiply(1);
    var clipped = clipped0.updateMask(clipped0.select('nd').gt(std3_vale_max_min_redy));// it works now
    //var clipped = clipped0.updateMask(clipped0.select('nd').lt(std3_vale_max_plus_redy));// it works now
  return clipped.unmask(99)  
}
//     
     var NDVI = image.normalizedDifference(['B8', 'B4']);
     var fc_no_Buffer   = ee.FeatureCollection(fc);
     //Map.addLayer(NDVI.select('nd'));
     //Map.addLayer(fc_no_Buffer);
     // Map the Feature Collection to an Image Collection 
     var imcol_real = ee.ImageCollection(fc.map(colFunc_real));
     var imcol      = ee.ImageCollection(fc.map(colFunc));
     var imcol_mask    = ee.ImageCollection(fc.map(colFunc_mask));
     var palette   = ['990000', 'FF0000', '00FF00', '0000FF', '000099'];
     var paletteBW = ['FFFFFF', 'EEEEEE', 'DDDDDD', 'CCCCCC', 'BBBBBB', 'AAAAAA', '999999', '888888', 
                 '777777', '666666', '555555', '444444', '333333', '222222', '111111', '000000'];
     var palett_emask = ["#0a0a0a","#0a0a0a"];
     var mosaic_real = imcol_real.mosaic();
     var mosaic      = imcol.mosaic();
     var imcol_mask0      = imcol_mask.mosaic();
      // Map the Feature Collection to an Image Collection 
     //
     // print(imcol_real)
     Map.addLayer(imcol);
     Map.addLayer(mosaic_real, paletteBW, 'NDVI_background');
     Map.addLayer(imcol_mask0,palett_emask,'mask');
    Map.addLayer(mosaic, {min: 0, max: 4, palette: palette}, 'split NDVI-auto anomaly');
    print(image)
    print(image.propertyNames());
    var name = image.get('system:id')
    print(ee.String(name))
    var name_slice = ee.String(name).slice(14);
    print(name_slice)
    Export.image.toDrive({
     image: mosaic,
     description: "S2"+name_slice.getInfo(),
     scale: 10,
     region: geometry,
     'crs': 'EPSG:4326'
     });
    var ref = ee.FeatureCollection(shp);
    var empty = ee.Image().byte();
    var outline = empty.paint({ featureCollection: ref, color: 1, width: 1});
    Map.addLayer(outline, {palette: '000000'}, 'edges');
    //Map.addLayer(fc, {color: '000000'},"shp");
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'COPERNICUS/S2';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.IMAGE_COUNT_LIMIT = 100;
  app.VIS_OPTIONS = {
    'False color (B7/B6/B4)': {
      description: 'Vegetation is shades of red, urban areas are ' +
                   'cyan blue, and soils are browns.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B4']}
    },
    'Natural color (B4/B3/B2)': {
      description: 'Ground features appear in colors similar to their ' +
                   'appearance to the human visual system.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
    'Atmospheric (B7/B6/B5)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears blue.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B5']}
    }
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
     // app.vis.panel,
     // app.export.panel
    ],
    style: {width: '420px', padding: '11px'}
  });
  Map.setCenter(79.3367, 29.1181 ,8); 
  ui.root.insert(0, main);
  app.applyFilters();
};
//
//
// function  of  buffer  and NDVI each feature.
var fc = fc_no_Buffer.map(function(f) {
  return f.buffer(negative_Buffer); 
});
//
//function s2ndvi(image){
//  var ndvi = image.normalizedDifference(['B8', 'B4']);
//  return image.addBands(ndvi);
//}
app.boot();
// Create main panel.
var panel = ui.Panel({
  widgets: [
    ui.Label({
      value: 'legend',
      style: {fontSize: '12px', color: '#ff0000'}
    }),
    ui.Label({
      value: 'Class 2',
      style: {fontSize: '12px', color: '#ffff00'}
    }),
    ui.Label({
      value: 'Class 3',
      style: {fontSize: '12px', color: '#ff00ff'}
    }),
  ],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '400px'}
});
//Add a legend
var dict = {
  'STD-2': '990000',
  'STD-1': 'ff0000',
  'MEAN': '00ff00',
  'STD+1': '0000ff',
  'STD+2': '000099'
}
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var dict = {
  'STD-2': '990000',
  'STD-1': 'ff0000',
  'MEAN': '00ff00',
  'STD+1': '0000ff',
  'STD+2': '000099'
}
var palette = ['990000','ff0000','00ff00','0000ff','000099']
var names = ['STD-2','STD-1','MEAN','STD+1','STD+2']
for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
ui.root.add(legend);
/from here david/
var ref = ee.FeatureCollection(shp);
print(ref)
var empty = ee.Image().byte();
var outline = empty.paint({ featureCollection: ref, color: 1, width: 1});
Map.addLayer(outline, {palette: '000000'}, 'edges');