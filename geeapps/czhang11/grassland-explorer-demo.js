var sen2 = ee.ImageCollection("COPERNICUS/S2"),
    aoi = ee.FeatureCollection("users/czhang11/grassland/InsectDecline_LULC_2013_DigiLayer_v02");
// Import lib
var _preprocessing = require('users/czhang11/grassland:/preprocessing');
// The namespace for our application.  All the state is kept in here.
var app = {};
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.BOUNDARY_STYLE = {color: '6e6e6e', fillColor: '00000000', width:1};
  app.HIGHLIGHT_STYLE = {color: '6e6e6e', fillColor: '0065ffC0'};
};
app.createVariables = function() {
  app.aoi = aoi;
  app.aoiBounds = aoi.geometry().bounds();
  app.sen2Collection = ee.ImageCollection([]);
  app.sen2NdviCollection = ee.ImageCollection([]);
  app.sen2Image = ee.Image();
  app.currentMap = ee.Image();
  app.layerList = [];
  app.year = 2018;
  app.doyStart = 1;
  app.doyEnd = 183;
};
app.createPanels = function() {
  // UI
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Grassland Remote Sensing',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Note: Currently the Earth Engine Apps platform does not support the data export function. To export the map for the selected region, the app must be run through the Earth Engine Code Editor.'),
      ui.Label('Developed by Center for Spatial Information Science and Systems, George Mason University'),
      ui.Label('Technical Support: Chen Zhang (czhang11@gmu.edu)')
    ])
  };
  // year selection panel
  app.yearFilter = {
    year: ui.Slider({
      min: 2015,
      max: 2019,
      value: 2018,
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
      value: 1,
      step: 7,
      style: {width: '240px'},
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
      value: 183,
      step: 7,
      style: {width: '240px'},
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
  // product selector
  app.productSelector = {
    product: ui.Select({
      items: ['Annual grass yield/biomass', 'Cutting frequency', 'NDVI', 'Sentinel-2'],
      value : 'NDVI'
    })
  };
  app.productSelector.panel = ui.Panel({
    widgets: [
      ui.Label('Select Product', {fontWeight: 'bold'}),
      app.productSelector.product
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // layer filter
  app.layerFilter = {
    arableCerealsCheckbox: ui.Checkbox({
      label: 'arable_cereals', 
      value: false,
      onChange: function() {
        if(app.layerFilter.arableCerealsCheckbox.getValue()===true) {
          app.layerList.push('arable_cereals');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('arable_cereals'), 1);
        }
      }
    }),
    arableMaizeCheckbox: ui.Checkbox({
      label: 'arable_maize', 
      value: false,
      onChange: function() {
        if(app.layerFilter.arableMaizeCheckbox.getValue()===true) {
          app.layerList.push('arable_maize');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('arable_maize'), 1);
        }
      }
    }),
    arableOilCheckbox: ui.Checkbox({
      label: 'arable_oil_seed_rape', 
      value: false,
      onChange: function() {
        if(app.layerFilter.arableOilCheckbox.getValue()===true) {
          app.layerList.push('arable_oil_seed_rape');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('arable_oil_seed_rape'), 1);
        }
      }
    }),
    arableOrchardsCheckbox: ui.Checkbox({
      label: 'arable_orchards', 
      value: false,
      onChange: function() {
        if(app.layerFilter.arableOrchardsCheckbox.getValue()===true) {
          app.layerList.push('arable_orchards');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('arable_orchards'), 1);
        }
      }
    }),
    arableOtherCheckbox: ui.Checkbox({
      label: 'arable_other', 
      value: false,
      onChange: function() {
        if(app.layerFilter.arableOtherCheckbox.getValue()===true) {
          app.layerList.push('arable_other');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('arable_other'), 1);
        }
      }
    }),
    grasslandMeadowCheckbox: ui.Checkbox({
      label: 'grassland_meadow', 
      value: false,
      onChange: function() {
        if(app.layerFilter.grasslandMeadowCheckbox.getValue()===true) {
          app.layerList.push('arable_cereals');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('grassland_meadow'), 1);
        }
      }
    }),
    grasslandMeadowOrchardCheckbox: ui.Checkbox({
      label: 'grassland_meadow_orchard', 
      value: false,
      onChange: function() {
        if(app.layerFilter.grasslandMeadowOrchardCheckbox.getValue()===true) {
          app.layerList.push('grassland_meadow_orchard');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('grassland_meadow_orchard'), 1);
        }
      }
    }),
    grasslandOtherCheckbox: ui.Checkbox({
      label: 'grassland_other', 
      value: false,
      onChange: function() {
        if(app.layerFilter.grasslandOtherCheckbox.getValue()===true) {
          app.layerList.push('grassland_other');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('grassland_other'), 1);
        }
      }
    }),
    grasslandSilage: ui.Checkbox({
      label: 'grassland_silage', 
      value: false,
      onChange: function() {
        if(app.layerFilter.grasslandSilage.getValue()===true) {
          app.layerList.push('grassland_silage');
        }
        else {
          app.layerList.splice(app.layerList.indexOf('grassland_silage'), 1);
        }
      }
    })
  };
  app.layerFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Specify LULC Types', {fontWeight: 'bold'}),
      app.layerFilter.arableCerealsCheckbox,
      app.layerFilter.arableMaizeCheckbox,
      app.layerFilter.arableOilCheckbox,
      app.layerFilter.arableOrchardsCheckbox,
      app.layerFilter.arableOtherCheckbox,
      app.layerFilter.grasslandMeadowCheckbox,
      app.layerFilter.grasslandMeadowOrchardCheckbox,
      app.layerFilter.grasslandOtherCheckbox,
      app.layerFilter.grasslandSilage
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  // navigator
  app.buttonList = {
    updateButton: ui.Button({
      label: 'Update Map',
      onClick: function() {
        app.refreshLayer();
        app.buttonList.cleanButton.setDisabled(false);
        app.buttonList.exportButton.setDisabled(false);
      }
    }),
    cleanButton: ui.Button({
      label: 'Clean Map',
      disabled: true,
      onClick: function() {
        app.currentMap = ee.Image();
        Map.clear();
        app.buttonList.cleanButton.setDisabled(true);
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
          region: app.roi,
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
  app.secondaryPanel = ui.Panel();
};
app.refreshLayer = function() {
  var statisticPanel = ui.Panel({
    style: {
      position: 'top-right',
      height: '600px',
      width: '300px',
    }
  });
  function updateBoundary() {
    if (app.layerList.length === 0) {
      app.aoi = aoi;
    }
    else {
      app.aoi = aoi.filter(ee.Filter.inList('LULCType_l', app.layerList));
    }
    // Map.addLayer(app.aoi.style(app.BOUNDARY_STYLE), {}, 'Boundary');
  }
  function updateMap() {
    app.year = app.yearFilter.year.getValue();
    app.doyStart = app.doyStartFilter.doy.getValue();
    app.doyEnd = app.doyEndFilter.doy.getValue();
    var initDate = ee.Date.fromYMD(app.year, 1, 1);
    var currentDate = initDate.advance(app.doyEnd, 'day');
    app.sen2Collection = _preprocessing.getSen2Collection(app.aoiBounds, app.year, app.doyStart, app.doyEnd);
    app.sen2NdviCollection = _preprocessing.getSen2NdviCollection(app.sen2Collection);
    if (app.productSelector.product.getValue() == 'Annual grass yield/biomass') {
      print('Annual grass yield/biomass from ', initDate.format('YYYY-MM-dd'), 'to', currentDate.format('YYYY-MM-dd'));
      app.currentMap = app.sen2NdviCollection.sum();
      Map.addLayer(app.currentMap.clip(app.aoi), {bands: ['NDVI'], min: 0, max: app.doyEnd/14}, 'Annual grass yield/biomass');
    }
    else if  (app.productSelector.product.getValue() == 'Cutting frequency') {
    }
    else if  (app.productSelector.product.getValue() == 'NDVI') {
      print('NDVI for ', currentDate.format('YYYY-MM-dd'));
      app.currentMap = _preprocessing.mosaicSen2Image(app.aoiBounds, currentDate).normalizedDifference(['B8','B4']).rename(['NDVI']);
      Map.addLayer(app.currentMap.clip(app.aoi), {bands: ['NDVI'], min: 0, max: 1}, 'NDVI');
    }
    else if  (app.productSelector.product.getValue() == 'Sentinel-2') {
      print('Sentinel-2 for ', currentDate.format('YYYY-MM-dd'));
      app.currentMap = _preprocessing.mosaicSen2Image(app.aoiBounds, currentDate);
      Map.addLayer(app.currentMap.clip(app.aoi), {bands: ['B2', 'B3', 'B4'], min: 0, max: 3000}, 'Sentinel-2');
    }
  }
  function handleMapClick(coords) {
    if (statisticPanel.widgets().length()<=2) {
      Map.add(statisticPanel);
    }
    // update overlay
    var poi = ee.Geometry.Point([coords.lon, coords.lat]);
    var roi = app.aoi.filterBounds(poi);
    var poiLayer = ui.Map.Layer(poi, {color: 'FF0000'}, 'Point of interest');
    var roiLayer = ui.Map.Layer(roi, {color: '00FF00'}, 'Region of interest');
    Map.layers().remove(1);
    Map.layers().remove(2);
    Map.layers().set(1, roiLayer);
    Map.layers().set(2, poiLayer);
    var poiChart;
    var roiChart;
    if (app.productSelector.product.getValue() == 'Annual grass yield/biomass') {
      poiChart = ui.Chart.image.doySeries(app.sen2NdviCollection, poi, ee.Reducer.mean(), 10);
      roiChart = ui.Chart.image.doySeries(app.sen2NdviCollection, roi, ee.Reducer.mean(), 10);
    }
    else if  (app.productSelector.product.getValue() == 'Cutting frequency') {
    }
    else if  (app.productSelector.product.getValue() == 'NDVI') {
      poiChart = ui.Chart.image.doySeries(app.sen2NdviCollection, poi, ee.Reducer.mean(), 10);
      roiChart = ui.Chart.image.doySeries(app.sen2NdviCollection, roi, ee.Reducer.mean(), 10);
    }
    else if  (app.productSelector.product.getValue() == 'Sentinel-2') {
      poiChart = ui.Chart.image.doySeries(app.sen2Collection, poi, ee.Reducer.mean(), 10);
      roiChart = ui.Chart.image.doySeries(app.sen2Collection, roi, ee.Reducer.mean(), 10);
    }
    statisticPanel.clear();
    statisticPanel.add(ui.Label('Statistics for Point of Interest'));  
    statisticPanel.add(poiChart);
    statisticPanel.add(ui.Label('Statistics for Region of Interest'));
    statisticPanel.add(roiChart);
    statisticPanel.add(
      ui.Button({
        label: 'Close',
        onClick: function() {
          statisticPanel.clear();
          Map.remove(statisticPanel);
          Map.remove(roiLayer);
          Map.remove(poiLayer);
        }
      })
    );
  }
  Map.clear();
  updateBoundary();
  updateMap();
  Map.onClick(handleMapClick);
  Map.style().set('cursor', 'crosshair');
};
/** Creates the application interface. */
app.boot = function() {
  // Init map
  Map.setCenter(6.5, 51.4, 14);
  app.createConstants();
  app.createVariables();
  app.createPanels();
  app.main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.yearFilter.panel,
      app.doyStartFilter.panel,
      app.doyEndFilter.panel,
      app.productSelector.panel,
      app.layerFilter.panel,
      app.buttonList.panel
    ],
    style: {width: '400px', padding: '5px'}
  });
  ui.root.insert(0, app.main);
};
app.boot();