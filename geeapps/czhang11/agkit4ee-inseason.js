var usCounty = ui.import && ui.import("usCounty", "table", {
      "id": "users/czhang11/boundary/cb_2017_us_county_5m"
    }) || ee.FeatureCollection("users/czhang11/boundary/cb_2017_us_county_5m"),
    usAsd = ui.import && ui.import("usAsd", "table", {
      "id": "users/czhang11/boundary/ASD_2012_500K"
    }) || ee.FeatureCollection("users/czhang11/boundary/ASD_2012_500K"),
    usState = ui.import && ui.import("usState", "table", {
      "id": "users/czhang11/boundary/cb_2017_us_state_5m"
    }) || ee.FeatureCollection("users/czhang11/boundary/cb_2017_us_state_5m"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/czhang11/boundary/sentinel2_tiles_world"
    }) || ee.FeatureCollection("users/czhang11/boundary/sentinel2_tiles_world");
// requried modules
var _export = require('users/czhang11/agkit4ee:/export.js');
var _getRoi = require('users/czhang11/agkit4ee:/getRoi.js');
var _getCdl = require('users/czhang11/agkit4ee:/getCdl.js'); 
var _statistic = require('users/czhang11/agkit4ee:/statistics.js');
var _croplandModeling = require('users/czhang11/agkit4ee:/croplandModeling.js');
var _confidenceModeling = require('users/czhang11/agkit4ee:/confidenceModeling.js');
var _workflow = require('users/czhang11/agkit4ee-inseason:/inseasonCropMappingKit.js');
// The namespace for our application.  All the state is kept in here.
var app = {};
app.createVariables = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.BOUNDARY_STYLE = {color: '6e6e6e', fillColor: '00000000', width:1};
  app.HIGHLIGHT_STYLE = {color: '6e6e6e', fillColor: '0065ffC0'};
  app.currentMap = ee.Image();
  app.cloud = 30;
  app.bands = ['B2', 'B3', 'B4', 'B8', 'B11', 'B12', 'ndvi', 'ndwi'];
};
app.createPanels = function() {
  // UI
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'AgKit4EE - In-season Crop Mapping Kit',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This prototype demonstrates the capability of automating in-season crop mapping with Google Earth Engine.'),
      ui.Label('Developer: Chen Zhang (czhang11@gmu.edu)'),
      ui.Label('Center for Spatial Information Science and Systems, George Mason University')
    ])
  };
  app.tileFilter = {
    tile: ui.Textbox('e.g., 15SYA','15SYA'),
  };
  app.tileFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Sentinel-2 Tile', {fontWeight: 'bold'}),
      app.tileFilter.tile
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // Tile Cloud Filter
  app.cloudFilter = {
    cloud: ui.Slider({
      min: 1,
      max: 100,
      value: 30,
      step: 1,
      style: {width: '240px'}
    })
  };
  app.cloudFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Cloud Cover Percentage Filter', {fontWeight: 'bold'}),
      app.cloudFilter.cloud
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // year selection panel
  app.yearFilter = {
    year: ui.Slider({
      min: 2019,
      max: 2022,
      value: 2021,
      step: 1,
      style: {width: '240px'}
    })
  };
  app.yearFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Year', {fontWeight: 'bold'}),
      app.yearFilter.year
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // doy selection panel
  app.doyStartFilter = {
    doy: ui.Slider({
      min: 1,
      max: 365,
      value: 100,
      step: 1,
      style: {width: '205px'},
      onChange: function() {
        if (app.doyStartFilter.doy.getValue()>app.doyEndFilter.doy.getValue()){
          alert("The start DOY value must be smaller than the end DOY value");
          app.doyStartFilter.doy.setValue(app.doyEndFilter.doy.getValue());
        }
      }
    })
  };
  app.doyStartFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Start DOY', {fontWeight: 'bold'}),
      app.doyStartFilter.doy
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // doy selection panel
  app.doyEndFilter = {
    doy: ui.Slider({
      min: 1,
      max: 365,
      value: 200,
      step: 1,
      style: {width: '205px'},
      onChange: function() {
        if (app.doyStartFilter.doy.getValue()>app.doyEndFilter.doy.getValue()){
          alert("The start DOY value must be smaller than the end DOY value");
          app.doyEndFilter.doy.setValue(app.doyStartFilter.doy.getValue());
        }
      }
    })
  };
  app.doyEndFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select End DOY', {fontWeight: 'bold'}),
      app.doyEndFilter.doy
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // classifier selector
  app.classifierSelector = {
    classifier: ui.Select({
      items: ['randomForest', 'cart', 'svm'],
      value: 'randomForest'
    }),
  };
  app.classifierSelector.panel = ui.Panel({
    widgets: [
      ui.Label('Select Classifier', {fontWeight: 'bold'}),
      app.classifierSelector.classifier,
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // Panel of band of interest
  var updateBands = function(band, value) {
    var index = app.bands.indexOf(band);
    if (value===true) {
      if (index < 0) {
        app.bands.push(band);
      }
    }
    else {
      if (index > -1) {
        app.bands.splice(index, 1);
      }
    }
  };
  app.bandSelector = {
    b1Checkbox: ui.Checkbox({
      label: 'B1 (Costal Aerosol)', 
      value: false,
      onChange: function() {updateBands('B1', app.bandSelector.b1Checkbox.getValue());}
    }),
    b2Checkbox: ui.Checkbox({
      label: 'B2 (Blue)', 
      value: true,
      onChange: function() {updateBands('B2', app.bandSelector.b2Checkbox.getValue());}
    }),
    b3Checkbox: ui.Checkbox({
      label: 'B3 (Green)', 
      value: true,
      onChange: function() {updateBands('B3', app.bandSelector.b3Checkbox.getValue());}
    }),
    b4Checkbox: ui.Checkbox({
      label: 'B4 (Red)', 
      value: true,
      onChange: function() {updateBands('B4', app.bandSelector.b4Checkbox.getValue());}
    }),
    b5Checkbox: ui.Checkbox({
      label: 'B5 (Vegetation Red Edge)', 
      value: false,
      onChange: function() {updateBands('B5', app.bandSelector.b5Checkbox.getValue());}
    }),
    b6Checkbox: ui.Checkbox({
      label: 'B6 (Vegetation Red Edge)', 
      value: false,
      onChange: function() {updateBands('B6', app.bandSelector.b6Checkbox.getValue());}
    }),
    b7Checkbox: ui.Checkbox({
      label: 'B7 (Vegetation Red Edge)', 
      value: false,
      onChange: function() {updateBands('B7', app.bandSelector.b7Checkbox.getValue());}
    }),
    b8Checkbox: ui.Checkbox({
      label: 'B8 (NIR)', 
      value: true,
      onChange: function() {updateBands('B8', app.bandSelector.b8Checkbox.getValue());}
    }),
    b9Checkbox: ui.Checkbox({
      label: 'B9 (Water Vapour)', 
      value: false,
      onChange: function() {updateBands('B9', app.bandSelector.b9Checkbox.getValue());}
    }),
    b10Checkbox: ui.Checkbox({
      label: 'B10 (SWIR/Cirrus)', 
      value: false,
      onChange: function() {updateBands('B10', app.bandSelector.b10Checkbox.getValue());}
    }),
    b11Checkbox: ui.Checkbox({
      label: 'B11 (SWIR-1)', 
      value: true,
      onChange: function() {updateBands('B11', app.bandSelector.b11Checkbox.getValue());}
    }),
    b12Checkbox: ui.Checkbox({
      label: 'B12 (SWIR-2)', 
      value: true,
      onChange: function() {updateBands('B12', app.bandSelector.b12Checkbox.getValue());}
    }),
    ndviCheckbox: ui.Checkbox({
      label: 'NDVI', 
      value: true,
      onChange: function() {updateBands('ndvi', app.bandSelector.ndviCheckbox.getValue());}
    }),
    ndwiCheckbox: ui.Checkbox({
      label: 'NDWI', 
      value: true,
      onChange: function() {updateBands('ndwi', app.bandSelector.ndwiCheckbox.getValue());}
    })
  };
  app.bandSelector.panel = ui.Panel({
    widgets: [
      ui.Label('Select Bands of Interests', {fontWeight: 'bold'}),
      app.bandSelector.b1Checkbox,
      app.bandSelector.b2Checkbox,
      app.bandSelector.b3Checkbox,
      app.bandSelector.b4Checkbox,
      app.bandSelector.b5Checkbox,
      app.bandSelector.b6Checkbox,
      app.bandSelector.b7Checkbox,
      app.bandSelector.b8Checkbox,
      app.bandSelector.b9Checkbox,
      app.bandSelector.b10Checkbox,
      app.bandSelector.b11Checkbox,
      app.bandSelector.b12Checkbox,
      app.bandSelector.ndviCheckbox,
      app.bandSelector.ndwiCheckbox,
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // navigator
  app.buttonList = {
    updateButton: ui.Button({
      label: 'Start Mapping',
      onClick: function() {
        app.cleanLayers();
        app.refreshLayer();
        app.buttonList.exportButton.setDisabled(false);
      }
    }),
    cleanButton: ui.Button({
      label: 'Clean Map',
      onClick: function() {
        app.cleanLayers();
        app.buttonList.exportButton.setDisabled(true);
      }
    }),
    exportButton: ui.Button({
      label: 'Export Map to Drive',
      disabled: true,
      onClick: function () {
        print(app.currentMap);
        Export.image.toDrive({
          image: app.currentMap,
          scale: 30,
          region: _getRoi.getRoiBySen2Tile(app.tile),
          crs: 'EPSG:4326',
          maxPixels: 10e12,
          description: 'export'
        });
      }
    })
  };
  app.buttonList.panel = ui.Panel({
    widgets: [
      app.buttonList.updateButton,
      app.buttonList.cleanButton,
      app.buttonList.exportButton
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
};
// Clean all layers
app.cleanLayers = function() {
  app.currentMap = ee.Image();
  Map.clear();
  // Map.setZoom(5);
  Map.setOptions('Hybrid');
  app.main.widgets().reset(app.main.widgets().getJsArray());
};
// Refresh all layers
app.refreshLayer = function() {
  // function mapTile() {
  app.cloud = app.cloudFilter.cloud.getValue();
  app.year = app.yearFilter.year.getValue();
  app.doyStart = app.doyStartFilter.doy.getValue();
  app.doyEnd = app.doyEndFilter.doy.getValue();
  app.tile = app.tileFilter.tile.getValue();
  app.classifier = app.classifierSelector.classifier.getValue();
  var initDate = ee.Date.fromYMD(app.year, 1, 1);
  var currentDate = initDate.advance(app.doyEnd, 'day');
  app.currentMap = _workflow.mapAllCropsByTile(app.tile, app.year, initDate.format('YYYY-MM-dd'), currentDate.format('YYYY-MM-dd'), app.classifier, {cloudPercentage: app.cloud, bands: app.bands});
  Map.addLayer(app.currentMap, {min: 0, max: 254, palette: _getCdl.getCdlPalette()}, 'inseason_'+app.tile);
  Map.setOptions('Hybrid');
  app.chartByClass = {
    panel: ui.Panel({
      widgets: [
        ui.Chart.image.byClass({
          image: ee.Image.pixelArea().addBands(app.currentMap).mask(ee.Image(app.currentMap).signum()),
          region: app.currentMap.geometry(),
          reducer: ee.Reducer.sum(),
          classBand: 'classification', 
          scale: 500,
          xLabels: ['Crop type category (unit: square meters)']
        })
      ],
      style: app.SECTION_STYLE,
      layout: ui.Panel.Layout.flow('horizontal', true)
    })
  };
  app.main.widgets().add(app.chartByClass.panel);
};
/** Creates the application interface. */
app.boot = function() {
  app.createVariables();
  app.createPanels();
  app.main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.tileFilter.panel,
      app.cloudFilter.panel,
      app.yearFilter.panel,
      app.doyStartFilter.panel,
      app.doyEndFilter.panel,
      app.bandSelector.panel,
      app.classifierSelector.panel,
      app.buttonList.panel
    ],
    style: {width: '480px', padding: '5px'}
  });
  ui.root.insert(0, app.main);
  app.cleanLayers();
};
app.boot();