// namespace for our application
var afn = {}
var point = ee.Geometry.Point([-124.1819, 49.0377])
Map.centerObject(point, 11)
var distPalette = ['blue']
var defaultImage = ee.Image("users/flaviecpelletier/accAss_v10/Pacific_Maritime2019")
// var mask = ee.Image("users/flaviecpelletier/accAss_v10/Boreal_Cordillera2019")/*.select(1).gt(1)*/
var proj = ee.Projection("EPSG:4326").atScale(30)
// function that create the UI panel
afn.createPanels = function() {
  // Title and intro labels
  afn.intro = {
    panel: ui.Panel([
        ui.Label({
          value: 'Visualization Tool',
          // style: {fontWeight: 'bold', fontSize: '24px', margin '10px 5px'}
          style: {fontWeight: 'bold', fontSize: '24px'}
        }),
        // ui.Label('This app allows you to despeckle SAR collections using different filters')
      ])
  }
  afn.zonePicker = {
    label: ui.Label(), 
    select: ui.Select({
      items: Object.keys(afn.FILTER_OPTIONS),
      onChange: function(){
        var option = afn.FILTER_OPTIONS[afn.zonePicker.select.getValue()]
        afn.zonePicker.label.setValue(option.description);
        afn.refreshMapLayer();
      }
    }), 
    centerButton: ui.Button('Center on point', function() {
      // Map.centerObject(Map.layers().get(0).get('eeObject'));
      Map.centerObject(point, 11)
    })
  }
  afn.zonePicker.panel = ui.Panel({
    widgets: [
      ui.Label('Select an ecozone', {fontWeight: 'bold'}),
      ui.Panel([
        afn.zonePicker.select,
        afn.zonePicker.centerButton
      ], ui.Panel.Layout.flow('horizontal')), 
      afn.zonePicker.label, 
      ],
      style: afn.SECTION_STYLE
  })
  // default to first option
  afn.zonePicker.select.setValue(afn.zonePicker.select.items().get(0))
}
afn.createHelpers = function(){
  /** Refreshes the current map layer based on the UI widget states. */
  afn.refreshMapLayer = function() {
    Map.clear();
    var filterOption = afn.FILTER_OPTIONS[afn.zonePicker.select.getValue()];
    var image = ee.Image(afn.FILTER_OPTIONS[afn.zonePicker.select.getValue()].path)
    // var mask = image.select(1).gt(1)
    Map.addLayer(image/*.select(1).updateMask(mask)*/.reproject(proj), filterOption.visParams, filterOption.title, true, 1);
    Map.centerObject(image, 11)
    Map.addLayer(point)
  };
}
afn.createConstants = function() {
  afn.COLLECTION = 
  afn.SECTION_STYLE = {margin: '20px 0 0 0'};
  afn.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  afn.FILTER_OPTIONS = {
    'Pacific Maritime': {
      title: 'Pacific Maritime',
      path: 'users/flaviecpelletier/accAss_v10/Pacific_Maritime2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Montane Cordillera': {
      title: 'Montane Cordillera',
      path: 'users/flaviecpelletier/accAss_v10/Montane_Cordillera2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Boreal Cordillera': {
      title: 'Boreal Cordillera',
      path: 'users/flaviecpelletier/accAss_v10/Boreal_Cordillera2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Taiga Cordillera': {
      title: 'Taiga Cordillera',
      path: 'users/flaviecpelletier/accAss_v10/Taiga_Cordillera2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Taiga Plains': {
      title: 'TaigaPlains',
      path: 'users/clelabbulc/flavie/Taiga_Plains2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Boreal Plains': {
      title: 'Boreal Plains',
      path: 'users/clelabbulc/flavie/Boreal_Plains2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Boreal Shield West': {
      title: 'Boreal Shield West',
      path: 'users/clelabbulc/flavie/Boreal_Shield_West2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Boreal Shield East': {
      title: 'Boreal Shield East',
      path: 'users/clelabbulc/flavie/Boreal_Shield_East2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Taiga Shield West': {
      title: 'Taiga Shield West',
      path: 'users/flaviecpelletier/accAss_v10/Taiga_Shield_West2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Taiga Shield East': {
      title: 'TaigaShieldEast',
      path: 'users/flaviecpelletier/accAss_v10/Taiga_Shield_East2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Atlantic Maritime': {
      title: 'Atlantic Maritime',
      path: 'users/flaviecpelletier/accAss_v10/Atlantic_Maritime2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
    'Hudson Plains': {
      title: 'Hudson Plains',
      path: 'users/clelabbulc/flavie/Hudson_Plains2019',
      visParams: {min: 2, max: 5, palette: distPalette}
    },
  };
}
/** Creates the application interface. */
afn.boot = function() {
  afn.createConstants();
  afn.createHelpers();
  afn.createPanels();
  var main = ui.Panel({
    widgets: [
      afn.intro.panel,
      afn.zonePicker.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  // Map.setCenter(-139.2940958901333, 64.69985625342404, 11);
  // Map.addLayer(defaultImage.select(1).updateMask(mask).reproject(proj), {min: 2, max: 5, palette: distPalette}, 'borealCordillera', true)
  ui.root.insert(0, main);
};
afn.boot();