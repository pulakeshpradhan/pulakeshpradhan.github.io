/** Datasets */
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE');
var bandsDictionary = {
  'aet': {
    'description': 'Actual evapotranspiration',
    'scale': 0.1,
    'units': 'mm'
  },
  'def': {
    'description': 'Climate water deficit',
    'scale': 0.1,
    'units': 'mm'
  },
  'pdsi': {
    'description': 'Palmer Drought Severity Index',
    'scale': 0.01,
    'units': ''
  },
  'pet': {
    'description': 'Reference evapotranspiration',
    'scale': 0.1,
    'units': 'mm'
  },
  'pr': {
    'description': 'Precipitation accumulation',
    'scale': 1,
    'units': 'mm'
  },
  'ro': {
    'description': 'Runoff',
    'scale': 1,
    'units': 'mm'
  },
  'soil': {
    'description': 'Soil moisture',
    'scale': 0.1,
    'units': 'mm'
  },
  'srad': {
    'description': 'Downward surface shortwave radiation',
    'scale': 0.1,
    'units': 'W/m^2'
  },
  'swe': {
    'description': 'Snow water equivalent',
    'scale': 1,
    'units': 'mm'
  },
  'tmmn': {
    'description': 'Minimum temperature',
    'scale': 0.1,
    'units': '°C'
  },
  'tmmx': {
    'description': 'Maximum temperature',
    'scale': 0.1,
    'units': '°C'
  },
  'vap': {
    'description': 'Vapor pressure',
    'scale': 0.001,
    'units': 'kPa'
  },
  'vpd': {
    'description': 'Vapor pressure deficit',
    'scale': 0.01,
    'units': 'kPa'
  },
  'vs': {
    'description': 'Wind-speed at 10m',
    'scale': 0.01,
    'units': 'm/s'
  }
};
var bands = Object.keys(bandsDictionary);
/** Layers */
var clickedPointLayer = ui.Map.Layer();
/** UI */
var instructionLabel = ui.Label({
  value: 'Click on the map to select a region of interest',
  style: {
    textAlign: 'center',
    stretch: 'horizontal'
  }
});
var instructionPanel = ui.Panel({
  widgets: [instructionLabel],
  style: {
    margin: '4px',
    border: '1px solid #808080'
  }
});
var aet = ui.Checkbox(bands[0]);
var def = ui.Checkbox(bands[1]);
var pdsi = ui.Checkbox(bands[2]);
var pet = ui.Checkbox(bands[3]);
var pr = ui.Checkbox(bands[4]);
var ro = ui.Checkbox(bands[5]);
var soil = ui.Checkbox(bands[6]);
var srad = ui.Checkbox(bands[7]);
var swe = ui.Checkbox(bands[8]);
var tmmn = ui.Checkbox(bands[9]);
var tmmx = ui.Checkbox(bands[10]);
var vap = ui.Checkbox(bands[11]);
var vpd = ui.Checkbox(bands[12]);
var vs = ui.Checkbox(bands[13]);
var checkboxesPanel1 = ui.Panel({
  widgets: [
    aet, def, pdsi, pet, pr, ro, soil
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var checkboxesPanel2 = ui.Panel({
  widgets: [
    srad, swe, tmmn, tmmx, vap, vpd, vs
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var startDateTb = ui.Textbox({
  placeholder: '1958-01-01',
  style: {
    margin: '4px 8px 8px'
  }
});
var endDateTb = ui.Textbox({
  placeholder: '2021-12-01',
  style: {
    margin: '4px 8px 8px'
  }
});
var makeChartButton = ui.Button({
  label: 'Make Chart',
  disabled: true,
});
var clearResultsButton = ui.Button({
  label: 'Clear Results',
  style: {
    shown: false
  },
  onClick: function() {
    chartPanel.style().set('shown', false);
    chartPanel.widgets().reset([]);
    instructionLabel.setValue(
      'Click on the map to select a region of interest'
    );
    step2Panel.style().set('shown', false);
    mainPanel.widgets().reset([
      instructionPanel, step2Panel
    ]);
    clearResultsButton.style().set('shown', false);
    clickedPointLayer.setEeObject(ee.Image());
    checkboxes.forEach(function(checkbox) {
      checkbox.setValue(false);
    });
  }
});
var step2Panel = ui.Panel({
  widgets: [
    ui.Panel({
      style: {
        margin: '8px 8px 8px 44.5px'
      }
    }),
    ui.Panel({
      widgets: [
        ui.Label('Start Date', {
          margin: '8px 8px 0px',
          fontSize: '10px',
          fontWeight: 'bold'
        }),
        startDateTb
      ],
      style: {
        stretch: 'horizontal'
      }
    }),
    ui.Panel({
      widgets: [
        ui.Label('End Date', {
          margin: '8px 8px 0px',
          fontSize: '10px',
          fontWeight: 'bold'
        }),
        endDateTb
      ],
      style: {
        stretch: 'horizontal'
      }
    }),
    ui.Button({
      label: 'Select Bands',
      onClick: selectBands,
      style: {
        margin: '20px 8px 8px'
      }
    }),
    ui.Panel({
      style: {
        margin: '8px 44.5px 8px 8px'
      }
    }),
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    margin: '4px',
    shown: false,
    border: '1px solid #808080'
  }
});
var step3Panel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [checkboxesPanel1, checkboxesPanel2]
    }),
    ui.Panel({
      widgets: [makeChartButton, clearResultsButton],
      layout: ui.Panel.Layout.flow('horizontal')
    })
  ],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    margin: '4px',
    border: '1px solid #808080'
  }
});
var mainPanel = ui.Panel({
  widgets: [
    instructionPanel,
    step2Panel
  ],
  style: {
    padding: '4px',
    width: '550px'
  }
});
var chartPanel = ui.Panel({
  style: {
    position: 'bottom-center',
    shown: false
  }
});
// Checkboxes
var checkboxes = [
  aet, def, pdsi, pet, pr, ro, soil,
  srad, swe, tmmn, tmmx, vap, vpd, vs
];
checkboxes.forEach(function(checkbox) {
  checkbox.style().set('width', '60px');
});
/** Events */
var pt;
var startDate;
var endDate;
var filteredDataset;
var lonLat;
function onClick(coords) {
  if (chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', false);
  }
  pt = ee.Geometry.Point([coords.lon, coords.lat]);
  lonLat = coords.lon.toFixed(3) + ', ' + coords.lat.toFixed(3);
  Map.centerObject(pt, 8);
  clickedPointLayer
    .setEeObject(
      ee.FeatureCollection([pt]).style({
        color: '#ff0000',
        pointSize: 5,
        pointShape: '+',
        width: 3,
        fillColor: '#ff000050'
      })
    );
  instructionLabel.setValue('Select a date range');
  step2Panel.style().set('shown', true);
  mainPanel.widgets().reset([instructionPanel, step2Panel]);
}
function selectBands(coords) {
  startDate = startDateTb.getValue();
  endDate = endDateTb.getValue();
  filteredDataset = dataset
    .filterDate(startDate, endDate);
  instructionLabel.setValue('Select up to three bands');
  var getCheckedBands = function() {
    var checkedBands = [];
    checkboxes.forEach(function(checkbox) {
      if (checkbox.getValue()) {
        checkedBands.push(checkbox);
      }
    });
    return checkedBands;
  };
  checkboxes.forEach(function(checkbox) {
    checkbox.onChange(function() {
      var checkedBands = getCheckedBands();
      if (checkedBands.length >= 1) {
        makeChartButton.setDisabled(false);
      } else {
        makeChartButton.setDisabled(true);
      }
      if (checkedBands.length > 3) {
        checkbox.setValue(false);
        var previousValue = instructionLabel.getValue();
        instructionLabel.setValue('Select up to three bands');
        instructionLabel.style().set('color', '#ff0000');
        makeChartButton.setDisabled(true);
        clearResultsButton.setDisabled(true);
        checkboxes.forEach(function(checkbox) {
          checkbox.setDisabled(true);
        });
        ui.util.setTimeout(function() {
          instructionLabel.setValue(previousValue);
          instructionLabel.style().set('color', '#000000DE');
          makeChartButton.setDisabled(false);
          clearResultsButton.setDisabled(false);
          checkboxes.forEach(function(checkbox) {
            checkbox.setDisabled(false);
          });
        }, 3000);
      }
    });
  });
  mainPanel.widgets().reset([
    instructionPanel, step3Panel
  ]);
  makeChartButton.onClick(function() {
    if (!chartPanel.style().get('shown')) {
      chartPanel.style().set('shown', true);
    }
    clearResultsButton.style().set('shown', true);
    var checkboxes = getCheckedBands();
    var charts = [];
    checkboxes.forEach(function(checkbox) {
      var band = checkbox.getLabel();
      filteredDataset = filteredDataset
        .filterBounds(pt);
      var chart = ui.Chart.image
        .seriesByRegion({
          imageCollection:
            filteredDataset
              .select(band)
              .map(function(image) {
                return image
                  .multiply(bandsDictionary[band].scale)
                  .copyProperties(image, ['system:time_start']);
              }),
          regions: ee.Feature(pt, {'label': band}),
          reducer: ee.Reducer.mean(),
          band: band,
          scale: dataset.first().select(0).projection().nominalScale(),
          seriesProperty: 'label'
        }).setChartType('ColumnChart')
        .setOptions({
          title:
            bandsDictionary[band].description + ' in (lon, lat) ' + lonLat,
          hAxis: {
            titlePosition: 'none'
          },
          vAxis: {
            title:
              bandsDictionary[band].units == '' ? band :
                band + ' - ' + bandsDictionary[band].units
          },
          legend: {
            position: 'none'
          }
        });
      charts.push(chart);
    });
    chartPanel.widgets().reset([
      ui.Panel({
        widgets: charts,
        layout: ui.Panel.Layout.flow('horizontal')
      })
    ]);
  });
}
Map.onClick(onClick);
/** Initialize */
Map.layers().add(clickedPointLayer);
Map.widgets().add(mainPanel);
Map.widgets().add(chartPanel);
Map.setControlVisibility({all: false});
Map.setOptions('SATELLITE');
Map.style().set('cursor', 'crosshair');