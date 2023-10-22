/**
 * @license
 * Copyright 2021 The Google Earth Engine Community Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @description
 * This app shows a CONUS map of the most recent calculation of Palmer Drought
 * Severity Index and a monthly mean time series chart for a selected county
 * going back to the year 2000. Click on a county polygon and wait a minute to
 * view the time series.The app uses URL parameters to save its state for
 * sharing with with colleagues. PDSI are represented by the gridMET
 * dataset.
 */
/*******************************************************************************
 * Model *
 ******************************************************************************/
var m = {};
m.palette = {
  minRgb: [255, 0, 0],
  midRgb: [255, 255, 255],
  maxRgb: [0, 0, 255],
  minVal: -5,
  midVal: 0,
  maxVal: 5
};
m.fvVis = {
  polygonStrokeColor: '484848',
  polygonStrokeOpacity: 0.9,
  polygonStrokeWidth: 1,
  polygonFillOpacity: 0
};
m.counties = ee.FeatureCollection('TIGER/2018/Counties');
m.countiesFv = ui.Map.FeatureViewLayer('TIGER/2018/Counties_FeatureView');
m.drought = ee.ImageCollection('GRIDMET/DROUGHT');
m.droughtBand = 'pdsi';
m.dateRange = ['2000-01-01', Date.now()];
/*******************************************************************************
 * Components *
 ******************************************************************************/
var c = {};
// Panel to hold the chart.
c.chartPanel = ui.Panel();
// Map widget.
c.map = ui.Map();
c.map.setCenter(-99.27, 41.08, 4);
// Map/chart panel
c.mapChartSplitPanel = ui.SplitPanel({
  firstPanel: c.map, //
  secondPanel: c.chartPanel,
  orientation: 'vertical',
  wipe: false,
});
// Messages.
var spinnerUri = 'data:image/gif;base64,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';
var clickUrl = 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/left_click/default/24px.svg';
var warningUrl = 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/warning/grad200/24px.svg';
var iconsStyle = {fontWeight: 'bold', fontSize: '16px', margin: '14px 5px'};
c.clickMessage = ui.Panel([
  ui.Label({imageUrl: clickUrl}),
  ui.Label('Click a county to view its PDSI time series.', iconsStyle)
  ], ui.Panel.Layout.flow('horizontal'));
c.waitMessage = ui.Panel([
  ui.Label({imageUrl: spinnerUri}),
  ui.Label('Processing, please wait', iconsStyle)
  ], ui.Panel.Layout.flow('horizontal'));
c.noFeaturesMessage = ui.Panel([
  ui.Label({imageUrl: warningUrl}),
  ui.Label('There are no features intersecting the ' +
  'point you clicked, try again', iconsStyle)
  ], ui.Panel.Layout.flow('horizontal'));
// Element panel.
c.aboutPanel = ui.Panel(
  {style: {margin: '0px -8px 0px -8px'}});
// Show/hide info panel button.
c.aboutButton = ui.Button(
  {label: 'About ❯', style: {margin: '0px 4px 0px 0px'}});
// Information text. 
c.descrLabel = ui.Label(
  'This app shows a map of the most recent calculation of Palmer ' +
  'Drought Severity Index and a monthly mean time series chart ' +
  'for a selected county going back to the year 2000. Click on a ' +
  'county polygon and wait a minute to view the time series. ' +
  'The app uses URL parameters to save its state for sharing what ' +
  'you discover with colleagues.');
c.gridmetLabel = ui.Label('Learn more about the gridMET dataset.', null,
  'https://developers.google.com/earth-engine/datasets/catalog/GRIDMET_DROUGHT');
c.descrHolder = ui.Panel([c.descrLabel, c.gridmetLabel]);
// Define a legend widget group.
c.legend = {};
c.legend.title = ui.Label();
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legend.leftLabel = ui.Label('[min]');
c.legend.centerLabel = ui.Label();
c.legend.rightLabel = ui.Label('[max]');
c.legend.labelPanel = ui.Panel({
  widgets: [
    c.legend.leftLabel,
    c.legend.centerLabel,
    c.legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
c.legend.panel = ui.Panel([
  c.legend.title,
  c.legend.colorbar,
  c.legend.labelPanel
]);
/*******************************************************************************
 * Composition *
 ******************************************************************************/
ui.root.clear();
ui.root.add(c.mapChartSplitPanel);
c.map.add(c.legend.panel);
c.map.add(c.aboutPanel);
c.chartPanel.add(c.clickMessage);
c.aboutPanel.add(c.aboutButton);
c.aboutPanel.add(c.descrHolder);
/*******************************************************************************
 * Styling *
 ******************************************************************************/
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.chartStyle = {
  height: '325px',
  margin: '0px',
  padding: '0px'
};
c.map.style().set('cursor', 'crosshair');
c.map.setOptions('Grey', {Grey: mapStyle()});
c.chartPanel.style().set({
  height: s.chartStyle.height,
  minHeight: s.chartStyle.height,
  maxHeight: s.chartStyle.height
});
c.aboutPanel.style().set({
  position: 'bottom-right',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
});
c.descrLabel.style().set({
  margin: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '13px',
  color: '505050'
});
c.gridmetLabel.style().set({
  margin: '4px 0px 0px 0px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '13px',
  color: '505050'
});
c.descrHolder.style().set({
  shown: false,
  width: '250px',
  margin: '4px 0px 0px 0px',
  padding: '8px 8px 8px 8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});
c.aboutButton.style().set({
  margin: '0px 0px 0px 0px'
});
c.legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
});
c.legend.title.style().set(s.opacityWhiteNone);
c.legend.colorbar.style().set({
  stretch: 'horizontal',
  margin: '0px 8px',
  maxHeight: '20px'
});
c.legend.leftLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.leftLabel.style().set(s.opacityWhiteNone);
c.legend.centerLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel.style().set(s.opacityWhiteNone);
c.legend.rightLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.rightLabel.style().set(s.opacityWhiteNone);
c.legend.panel.style().set({
  position: 'bottom-left',
  width: '200px',
  padding: '0px'});
c.legend.panel.style().set(s.opacityWhiteMed);
c.legend.labelPanel.style().set(s.opacityWhiteNone);
/*******************************************************************************
 * Behaviors *
 ******************************************************************************/
// Converts RGB integer component to hex string. 
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}
// Converts RGB color list to hex color string.
function rgbToHex(rgb) {
  return "#" +
  componentToHex(rgb[0]) +
  componentToHex(rgb[1]) +
  componentToHex(rgb[2]);
}
// Identifies the RGB color for a value in a divergent palette.
function getRgbDivergent(cMin, cMid, cMax, min, mid, max, val) {
  var dif, frac, c1, c2, r, g, b;
  if (val <= mid) {
    val = val < min ? min : val;
    dif = mid - min;
    frac = Math.abs(val/dif);
    c1 = cMin;
    c2 = cMid;
    r = (c1[0] - c2[0]) * frac + c2[0];
    g = (c1[1] - c2[1]) * frac + c2[1];
    b = (c1[2] - c2[2]) * frac + c2[2];
  } else {
    val = val > max ? max : val;
    dif = max - mid;
    frac = Math.abs(val/dif);
    c1 = cMid;
    c2 = cMax;
    r = (c2[0] - c1[0]) * frac + c1[0];
    g = (c2[1] - c1[1]) * frac + c1[1];
    b = (c2[2] - c1[2]) * frac + c1[2];
  }
  var rgb = [];
  [r, g, b].forEach(function(c) {
    rgb.push(Math.round(c));
  });
  return rgb;
}
// Adds date information to images.
function addYearWeek(img) {
  var date = img.date();
  var year = date.get('year');
  var week = date.get('month');
  var id = ee.Algorithms.String(year).cat(ee.Algorithms.String(week));
  return img.set({
    year: year,
    week: week,
    date_id: id,
  });
}
// Calculates mean monthly PDSI image collection.
function getPdsiSummary() {
  var pdsi = m.drought
          .filterDate(m.dateRange[0], m.dateRange[1])
          .map(addYearWeek)
          .select(m.droughtBand);
  var distinctId = pdsi.distinct('date_id');
  var filter = ee.Filter.equals({leftField: 'date_id', rightField: 'date_id'});
  var join = ee.Join.saveAll('id_matches');
  var joinCol = ee.ImageCollection(join.apply(distinctId, pdsi, filter));
  var pdsiSummary = joinCol.map(function(img) {
    var col = ee.ImageCollection.fromImages(img.get('id_matches'));
    var meanTime = col.reduceColumns({
      reducer: ee.Reducer.mean(),
      selectors: ['system:time_start']
    }).get('mean');
    meanTime = ee.Number(meanTime).round();
    return col.median().set('system:time_start', meanTime);
  });
  return pdsiSummary;
}
// Generates a PDSI time series chart and adds it to chart panel.
function drawChart(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var aoi = m.counties.filterBounds(point).first();
  var aoiId = aoi.get('GEOID');
  var aoiName = aoi.get('NAMELSAD');
  m.fvVis['rules'] = [{
    filter: ee.Filter.eq('GEOID', aoiId),
    polygonStrokeWidth: 3,
    polygonStrokeOpacity: 1,
    polygonStrokeColor: 'black',
    polygonFillOpacity: 0
  }];
  m.countiesFv.setVisParams(m.fvVis);
  var pdsiSummary = getPdsiSummary();
  var pdsiDf = pdsiSummary.map(function(img) {
    var stat = img.reduceRegion({
      'geometry': aoi.geometry(),
      'reducer': ee.Reducer.mean(),
      'scale': 4000,
      'crs': 'EPSG:5070'
    });
    return ee.Feature(null, stat)
            .set({'millis': img.date().millis()});  
  }).sort('millis');
  var pdsiVal = pdsiDf.aggregate_array(m.droughtBand);
  var evalInfo = ee.Dictionary({
    pdsiVal: pdsiVal,
    aoiName: aoiName,
  });
  evalInfo.evaluate(function(evalInfo) {
    var colors = [];
    for (var i in evalInfo.pdsiVal) {
      var rgb = getRgbDivergent(
        m.palette.minRgb, m.palette.midRgb, m.palette.maxRgb,
        m.palette.minVal, m.palette.midVal, m.palette.maxVal,
        evalInfo.pdsiVal[i]);
      colors.push(rgbToHex(rgb));
    }
    var chart = ui.Chart.feature.groups(pdsiDf, 'millis', 'pdsi', 'millis')
      .setChartType('ColumnChart')
      .setOptions({
        title: evalInfo.aoiName,
        bar: {groupWidth: '100%'},
        colors: colors,
        legend: {position: 'none'},
        vAxis: {
          title: 'PDSI',
          viewWindow: {min: -7, max: 7},
          titleTextStyle: {italic: false, bold: true}
        },
        hAxis: {
          minorGridlines: {count: 0}
        },
        isStacked: true,
        explorer: {axis: 'horizontal'}
      });
    chart.style().set(s.chartStyle);
    c.chartPanel.widgets().reset([chart]);
  });
}
// Updates the URL parameters for the location clicked.
function updatePtUrl(coords) {
  ui.url.set('ptlon', coords.lon);
  ui.url.set('ptlat', coords.lat);
}
// Checks to see of clicked point intersects data, calls drawChart if so.
function checkPoint(coords) {
  c.chartPanel.widgets().reset([c.waitMessage]);
  var geom = ee.Geometry.Point(coords.lon, coords.lat);
  var aoi = m.counties.filterBounds(geom)
    .filterBounds(m.drought.first().geometry());
  aoi.size().evaluate(function(nFeatures) {
    if (nFeatures === 0) {
      c.chartPanel.widgets().reset([c.noFeaturesMessage]);
      return null;
    } else {
      drawChart(coords);
      updatePtUrl(coords);
    }
  });
}
c.map.onClick(checkPoint);
// Updates URL parameters that control map bounds on load.
function updateUrlParamMap(newMapParams) {
  ui.url.set('lat', newMapParams.lat);
  ui.url.set('lon', newMapParams.lon);
  ui.url.set('zoom', newMapParams.zoom);
}
c.map.onChangeBounds(ui.util.debounce(updateUrlParamMap, 100));
var infoShow = false;
function infoButtonHandler() {
  if(infoShow) {
    infoShow = false;
    c.descrHolder.style().set('shown', false);
    c.aboutButton.setLabel('About ❯');
  } else {
    infoShow = true;
    c.descrHolder.style().set('shown', true);
    c.aboutButton.setLabel('About ❮');
  }
}
c.aboutButton.onClick(infoButtonHandler);
/*******************************************************************************
 * Initialize *
 ******************************************************************************/
// Adds the most recent PDSI image to the map.
function drawRecentPdsi() {
  var recent = m.drought.sort('system:time_start', false).first()
    .select(m.droughtBand);
  var date = recent.date().format('YYYY-MM-dd').getInfo();
  var recentRelLayer = ui.Map.Layer(
    recent, {min: m.palette.minVal, max: m.palette.maxVal,
      palette: ['red', 'white', 'blue']},
      'PDSI for ' + date, true, 0.7);  
  c.map.layers().set(0, recentRelLayer);
  drawLegend(date);
}
// Overlays USA counties on the map.
function drawCounties() {
  m.countiesFv.setVisParams(m.fvVis);
  m.countiesFv.setName('Counties');
  c.map.layers().set(1, m.countiesFv);
}
// Adds PDSI legend to the map.
function drawLegend(imgDate) {
  c.legend.title.setValue('PDSI for ' + imgDate);
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: ['red', 'white', 'blue']
  });
  c.legend.leftLabel.setValue(m.palette.minVal);
  c.legend.centerLabel.setValue(m.palette.midVal);
  c.legend.rightLabel.setValue(m.palette.maxVal);
}
// Set map bounds based on URL params.
c.map.setCenter({
  lon: ui.url.get('lon', -95.20),
  lat: ui.url.get('lat', 34.80),
  zoom: ui.url.get('zoom', 4)
});
// Initialize map.
drawRecentPdsi();
drawCounties();
// Draw chart if a point was clicked according to URL params.
if (ui.url.get('ptlon')) {
  var coords = {
    lon: ui.url.get('ptlon'),
    lat: ui.url.get('ptlat')
  };
  drawChart(coords);
}
/*******************************************************************************
 * Map style *
 ******************************************************************************/
function mapStyle() {
  return [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];
}