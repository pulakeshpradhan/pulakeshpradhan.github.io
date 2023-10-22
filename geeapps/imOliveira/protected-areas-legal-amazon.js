/** Packages */
var snazzy = require('users/aazuspan/snazzy:styles');
/** Datasets */
var ROOT = 'users/imOliveira/public/';
var prodes = ee.Image(ROOT + 'PDigital2000_2021_AMZ_raster_v20220915');
var legalAmazon = ee.FeatureCollection(ROOT + 'brazilian_legal_amazon');
var protectedAreas = ee.FeatureCollection('WCMC/WDPA/current/polygons');
/** Preprocessing */
var prodesScale = prodes.select(0).projection().nominalScale();
var prodesMask = prodes.gte(8).and(prodes.lte(21));
var prodesMasked = prodes.updateMask(prodesMask).selfMask();
prodes = prodes
  .updateMask(prodesMask)
  .selfMask()
  .eq([
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
  ])
  .rename([
    '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015',
    '2016', '2017', '2018', '2019', '2020', '2021'
  ])
  .multiply(ee.Image.pixelArea())
  .divide(10000);
legalAmazon = ee.Feature(legalAmazon.first()).geometry();
protectedAreas = protectedAreas.filterBounds(legalAmazon);
/** Styles */
var prodesPalette = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'];
var prodesVisParams = {
  min: 8,
  max: 21,
  palette: prodesPalette
};
var defaultRules = [
  {
    filter: ee.Filter.expression(
      'SUB_LOC == "BR-AC" || SUB_LOC == "BR-RO" || SUB_LOC == "BR_MT"' + '||' +
      'SUB_LOC == "BR-TO" || SUB_LOC == "BR-MA" || SUB_LOC == "BR-PA"' + '||' +
      'SUB_LOC == "BR-AP" || SUB_LOC == "BR-AM" || SUB_LOC == "BR-RR"').not(),
    isVisible: false
  }
];
var protectedAreasVisParams = {
  color: '#829460',
  rules: defaultRules
};
/** Layers */
var prodesLayer = ui.Map.Layer(prodesMasked, prodesVisParams, 'PRODES', true);
var protectedAreasLayer = ui.Map.FeatureViewLayer('WCMC/WDPA/current/polygons_FeatureView', protectedAreasVisParams, 'Protected Areas', true);
var selectedFeatureLayer = ui.Map.FeatureViewLayer('WCMC/WDPA/current/polygons_FeatureView', null, 'Selected Feature', false);
/** Helper Functions & Events */
function createLayerControlWidgets(label, layer, createLegend, palette, minLabel, maxLabel) {
  createLegend = createLegend || false;
  var checkbox = ui.Checkbox({
    label: label,
    value: layer.getShown(),
    onChange: function(shown) {
      layer.setShown(shown);
    },
    style: {
      width: '120px',
      fontSize: '12px',
      margin: '12px 8px 8px'
    }
  });
  var slider = ui.Slider({
    min: 0,
    max: 1,
    value: layer.getOpacity(),
    step: 0.1,
    style: {fontSize: '0px', margin: '10px 8px 8px'}
  });
  slider.onSlide(function(opacity) {
    layer.setOpacity(opacity);
  });
  var widgets = [checkbox, slider];
  if (createLegend) {
    var colorBar = ui.Thumbnail(ee.Image.pixelLonLat().select(0), {
      dimensions: '100x12',
      region: [[0, 0], [0, 1], [1, 1], [1, 0]],
      format: 'png',
      min: 0,
      max: 1,
      palette: palette
    }, null, {
      margin: '0px 0px 2px',
      border: '1px solid #80808080'
    });
    var minLabel = ui.Label(minLabel, {textAlign: 'left'});
    var maxLabel = ui.Label(maxLabel, {textAlign: 'right'});
    var labels = ui.Panel([minLabel, maxLabel], ui.Panel.Layout.flow('horizontal'));
    labels.widgets().forEach(function(label) {
      label.style().set({
        margin: '0px',
        fontSize: '10px',
        stretch: 'horizontal'
      });
    });
    var legend = ui.Panel([colorBar, labels], null, {width: '100px', margin: '5px 0px'});
    widgets.push(legend);
  }
  return ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal')
  });
}
function filterCategory(category) {
  if (selectedFeatureLayer.getShown()) {
    selectedFeatureLayer.setShown(false);
  }
  chartPanel.style().set('shown', false);
  infoPanel.style().set('shown', false);
  var value = iucnCatMap[category];
  if (value !== null) {
    var updatedRules = defaultRules.concat([
      {
        filter: ee.Filter.neq('IUCN_CAT', value),
        isVisible: false
      },
      {
        filter: ee.Filter.eq('IUCN_CAT', value),
        color: '#829460'
      }
    ]);
    protectedAreasLayer.setVisParams({rules: updatedRules});
  } else {
    protectedAreasLayer.setVisParams(protectedAreasVisParams);
  }
}
function highlightSelectedFeature(id) {
  var highlightStyle = {
    width: 2,
    color: '#f96666',
    // fillColor: '#f9666699',
    rules: [
      {
        filter: ee.Filter.neq('system:index', id),
        isVisible: false
      }
    ]
  };
  selectedFeatureLayer.setVisParams(highlightStyle);
  ui.util.setTimeout(function() {
    selectedFeatureLayer.setShown(true);
  }, 2000);
}
function updateInfoPanel(properties) {
  var name = properties['NAME'];
  var designation = properties['DESIG_ENG'];
  var managementAuthority = properties['MANG_AUTH'];
  var managementCategory = properties['IUCN_CAT'];
  var area = properties['REP_AREA'].toFixed(2);
  var managementPlan = properties['MANG_PLAN'];
  var setLabelStyle = function(value) {
    value = value || null;
    return {
      fontSize: '12px',
      margin: '0px',
      padding: value == 'Not Reported' ? '0px 6px' : '0px',
      backgroundColor: value == 'Not Reported' ? '#db443799' : 'rgba(255, 255, 255, 0)',
      fontWeight: value === null ? 'bold' : 'normal'
    };
  };
  var panelStyle = {
    margin: '0px'
  };
  infoPanel.widgets().reset([
    ui.Panel([
      ui.Label('Name: ', setLabelStyle()),
      ui.Label(name, setLabelStyle(name))
    ],
      ui.Panel.Layout.flow('horizontal'),
      panelStyle
    ),
    ui.Panel([
      ui.Label('Designation: ', setLabelStyle()),
      ui.Label(designation, setLabelStyle(designation))
    ],
      ui.Panel.Layout.flow('horizontal'),
      panelStyle
    ),
    ui.Panel([
      ui.Label('Management Authority: ', setLabelStyle()),
      ui.Label(managementAuthority, setLabelStyle(managementAuthority))
    ],
      ui.Panel.Layout.flow('horizontal'),
      panelStyle
    ),
    ui.Panel([
      ui.Label('Management Category: ', setLabelStyle()),
      ui.Label(managementCategory, setLabelStyle(managementCategory))
    ],
      ui.Panel.Layout.flow('horizontal'),
      panelStyle
    ),
    ui.Panel([
      ui.Label('Area (Square Kilometers): ', setLabelStyle()),
      ui.Label(area, setLabelStyle(area))
    ],
      ui.Panel.Layout.flow('horizontal'),
      panelStyle
    ),
    ui.Panel([
      ui.Label('Management Plan: ', setLabelStyle()),
      ui.Label(managementPlan, setLabelStyle(managementPlan))
    ],
      ui.Panel.Layout.flow('horizontal'),
      panelStyle
    )
  ]);
  if (!infoPanel.style().get('shown')) {
    infoPanel.style().set('shown', true);
  }
}
function makeChart(feature) {
  feature = ee.Feature(feature).set('label', 'Area (ha)');
  var options = {
    title: 'Tree loss (Deforestation) 2008-2021',
    titleTextStyle: {
      bold: true
    },
    vAxis: {
      title: null,
      textPosition: 'none'
    },
    hAxis: {
      title: null,
      format: 'yyyy',
      showTextEvery: 1,
      slantedText: false,
      maxAlternation: 2
    },
    legend: {position: 'none'},
    fontName: 'Roboto',
    chartArea: {
      width: '90%'
    },
    colors: ['#829460'],
    fontSize: 12
  };
  var chart = ui.Chart.image.regions({
    image: prodes,
    regions: feature,
    reducer: ee.Reducer.sum(),
    scale: prodesScale,
    seriesProperty: 'label'
  }).setChartType('ColumnChart');
  chart.setOptions(options);
  chart.style().set({
    margin: '0px',
    stretch: 'both'
  });
  return chart;
}
function onClick(coords) {
  logLabel.style().set('shown', true);
  logLabel.setValue('Loading...');
  var pt = ee.Geometry.Point([coords.lon, coords.lat]);
  var filtered = protectedAreas.filterBounds(pt);
  var category = filterSelect.getValue();
  var categoryValue = iucnCatMap[category];
  filtered =
    categoryValue === null ? filtered :
      filtered.filter(ee.Filter.eq('IUCN_CAT', categoryValue));
  filtered.evaluate(function(filtered) {
    if (filtered.features.length > 0) {
      var selected = filtered.features[0];
      var id = selected.id;
      var properties = selected.properties;
      Map.centerObject(ee.Feature(selected), null, function() {
        ui.util.setTimeout(function() {
          logLabel.style().set('shown', false);
          logLabel.setValue('');
        }, 3000);
      });
      highlightSelectedFeature(id);
      updateInfoPanel(properties);
      var chart = makeChart(selected);
      chartPanel.widgets().reset([chart]);
      if (!chartPanel.style().get('shown')) {
        chartPanel.style().set('shown', true);
      }
    } else {
      logLabel.setValue('No protected area found');
      ui.util.setTimeout(function() {
        logLabel.style().set('shown', false);
      }, 3000);
    }
  });
}
/** Widgets */
var prodesControls = createLayerControlWidgets('PRODES', prodesLayer, true, prodesPalette, '2008', '2021');
var protectedAreasControls = createLayerControlWidgets('Protected Areas', protectedAreasLayer);
var iucnCatMap = {
  'All IUCN Categories': null,
  'Strict Nature Reserve': 'Ia',
  'Wilderness Area': 'Ib',
  'National Park': 'II',
  'Natural Monument or Feature': 'III',
  'Habitat/Species Management Area': 'IV',
  'Protected Landscape/Seascape': 'V',
  'Protected area with sustainable use of natural resources': 'VI'
};
var items = Object.keys(iucnCatMap);
var filterSelect = ui.Select({
  items: items,
  placeholder: 'Select an IUCN management category',
  value: items[0],
  onChange: filterCategory
});
var infoPanel = ui.Panel({
  style: {
    shown: false,
    whiteSpace: 'pre',
    margin: '4px 8px'
  }
});
var chartPanel = ui.Panel({
  style: {
    shown: false,
    margin: '4px 8px'
  }
});
var logLabel = ui.Label('', {
  padding: '0px 6px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#ffffff',
  fontSize: '12px',
  shown: false,
  position: 'top-center'
});
var credits = ui.Label('Developed by Iago Mendes & OLAB, 2022 🇧🇷', {
  padding: '0px 6px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#ffffff',
  fontSize: '12px',
  position: 'bottom-center'
}, 'https://www.linkedin.com/in/iago-mendes/');
var mainPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [
        ui.Label('PROTECTED AREAS - LEGAL AMAZON', {fontSize: '14px', fontWeight: 'bold', margin: '8px 8px 8px'}),
        ui.Label('Select a protected area to get the deforestation history.', {fontSize: '12px', margin: '4px 8px'}),
        ui.Label(
          'This App uses deforestation data from PRODES project. For more information about the project, click on the link below:', {fontSize: '12px', margin: '4px 8px'}),
        ui.Label(
          '🔗 PRODES', {fontSize: '12px', margin: '4px 8px'}, 'http://www.obt.inpe.br/OBT/assuntos/programas/amazonia/prodes'
        )
      ],
      style: {
        margin: '4px 8px',
        border: '1px solid #80808080'
      }
    }),
    ui.Panel({
      widgets: [
        ui.Label('LAYERS', {fontSize: '12px', fontWeight: 'bold'}),
        prodesControls,
        protectedAreasControls
      ],
      style: {
        margin: '4px 8px',
        border: '1px solid #80808080'
      }
    }),
    ui.Panel({
      widgets: [
        ui.Label('FILTER', {fontSize: '12px', fontWeight: 'bold'}),
        ui.Label('Filter the Protected Areas layer using the management category property.', {fontSize: '12px', margin: '4px 8px'}),
        filterSelect
      ],
      style: {
        margin: '4px 8px',
        border: '1px solid #80808080'
      }
    }),
    ui.Panel({
      widgets: [
        ui.Label('INFO', {fontSize: '12px', fontWeight: 'bold'}),
        ui.Label('The information from the selected protected area will be shown in the panel below.', {fontSize: '12px', margin: '4px 8px 16px'}),
        chartPanel,
        infoPanel
      ],
      style: {
        margin: '4px 8px',
        border: '1px solid #80808080'
      }
    }),
    // ui.Panel({
    //   widgets: [
    //     ui.Label('UNEP-WCMC and IUCN, Protected Planet: The World Database on Protected Areas (WDPA).', {fontSize: '12px'})
    //   ],
    //   style: {
    //     margin: '4px 8px',
    //     border: '1px solid #80808080'
    //   }
    // })
  ],
  style: {
    width: '400px',
    margin: '0px 0px 4px'
  }
});
/** Composition */
ui.root.insert(0, mainPanel);
Map.layers().add(prodesLayer);
Map.layers().add(protectedAreasLayer);
Map.layers().add(selectedFeatureLayer);
Map.widgets().add(logLabel);
Map.widgets().add(credits);
/** Map */
snazzy.addStyle('https://snazzymaps.com/style/102/clean-grey', 'Clean Grey');
Map.style().set('cursor', 'crosshair');
Map.setControlVisibility({all: false, zoomControl: true});
Map.centerObject(legalAmazon);
Map.onClick(onClick);