/**
 * @description
 * This app shows a map of the most recent calculation from 
 * the Soil Moisture Active Passive (SMAP) of the standardized
 * soil moisture anomaly index (SSMAI) and monthly mean time series chart 
 * for a selected basin of Thailand going back to the year 2015.  
 * Click on a basin polygon and wait a minute to view the time series.
 * SSMAI are represented by the NASA-USDA Enhanced SMAP Global Soil Moisture dataset.
 */
/*******************************************************************************
 * Model *
 ******************************************************************************/
var m = {};
m.palette = {
  minRgb: [255, 0, 0],
  midRgb: [255, 255, 255],
  maxRgb: [0, 0, 255],
  minVal: -4,
  midVal: 0,
  maxVal: 4
};
//m.basins = ee.FeatureCollection('users/juntakut37/Basin_TH/25basin');
m.basins = ee.FeatureCollection('users/juntakut37/Basin_TH/basin_50');
//m.basins = ee.FeatureCollection('users/juntakut37/Basin_TH/basin_250');
//m.provinces = ee.FeatureCollection('users/juntakut37/TH_Province');
m.drought = ee.ImageCollection('NASA_USDA/HSL/SMAP10KM_soil_moisture');
m.droughtBand = 'ssma';
m.dateRange = ['2015-01-01', Date.now()];
/*******************************************************************************
 * Components *
 ******************************************************************************/
var c = {};
// Panel to hold the chart.
c.chartPanel = ui.Panel();
// Map widget.
c.map = ui.Map();
// Map/chart panel
c.mapChartSplitPanel = ui.SplitPanel({
  firstPanel: c.map, //
  secondPanel: c.chartPanel,
  orientation: 'vertical',
  wipe: false,
});
// Messages.
c.clickMessage = ui.Label('🖱️ Click a basin to view its Standardized Soil Moisture Anomaly Index (SSMAI) time series.');
c.waitMessage = ui.Label('⚙️ Processing, please wait.');
c.noFeaturesMessage = ui.Label('🙃 There are no features intersecting the ' +
  'point you clicked, try again.');
// Element panel.
c.aboutPanel = ui.Panel(
  {style: {margin: '0px -8px 0px -8px'}});
// Show/hide info panel button.
c.aboutButton = ui.Button(
  {label: 'About ❯', style: {margin: '0px 4px 0px 0px'}});
// Information text. 
c.descrLabel = ui.Label(
  'This app shows a map of the most recent calculation from ' + 
  'the Soil Moisture Active Passive (SMAP) of the standardized ' +
  'soil moisture anomaly index (SSMAI) and monthly mean time series chart ' +
  'for a selected basin of Thailand going back to the year 2015. ' + 
  'Click on a basin polygon and wait a minute to view the time series. ' +
  'SSMAI are represented by the NASA-USDA Enhanced SMAP Global Soil Moisture Data. '
  );
c.gridmetLabel = ui.Label('Learn more about the NASA-USDA Enhanced SMAP Global Soil Moisture Data.', null,
  'https://developers.google.com/earth-engine/datasets/catalog/NASA_USDA_HSL_SMAP10KM_soil_moisture#citations');
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
//c.map.setOptions('Grey', {Grey: mapStyle()});
c.map.setOptions('Satellite');
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
// Calculates mean monthly SSMAI image collection.
function getSsmaiSummary() {
  var ssmai = m.drought
          .filterDate(m.dateRange[0], m.dateRange[1])
          .map(addYearWeek)
          .select(m.droughtBand);
  var distinctId = ssmai.distinct('date_id');
  var filter = ee.Filter.equals({leftField: 'date_id', rightField: 'date_id'});
  var join = ee.Join.saveAll('id_matches');
  var joinCol = ee.ImageCollection(join.apply(distinctId, ssmai, filter));
  var ssmaiSummary = joinCol.map(function(img) {
    var col = ee.ImageCollection.fromImages(img.get('id_matches'));
    var meanTime = col.reduceColumns({
      reducer: ee.Reducer.mean(),
      selectors: ['system:time_start']
    }).get('mean');
    meanTime = ee.Number(meanTime).round();
    return col.median().set('system:time_start', meanTime);
  });
  return ssmaiSummary;
}
// Generates a SSMAI time series chart and adds it to chart panel.
function drawChart(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var aoi = m.basins.filterBounds(point);
  var aoiName = aoi.first().get('SB_NAM_E');
  var aoiViz = aoi.draw({color: 'black', strokeWidth: 2});
  var aoiVizLayer = ui.Map.Layer(aoiViz, null, 'Selected Basin');
  c.map.layers().set(2, aoiVizLayer);
  var ssmaiSummary = getSsmaiSummary();
  var ssmaiDf = ssmaiSummary.map(function(img) {
    var stat = img.reduceRegion({
      'geometry': aoi.geometry(),
      'reducer': ee.Reducer.mean(),
      'scale': 4000,
      'crs': 'EPSG:4326'
    });
    return ee.Feature(null, stat)
            .set({'millis': img.date().millis()});  
  }).sort('millis');
  var ssmaiVal = ssmaiDf.aggregate_array(m.droughtBand);
  var evalInfo = ee.Dictionary({
    ssmaiVal: ssmaiVal,
    aoiName: aoiName,
  });
  evalInfo.evaluate(function(evalInfo) {
    var colors = [];
    for (var i in evalInfo.ssmaiVal) {
      var rgb = getRgbDivergent(
        m.palette.minRgb, m.palette.midRgb, m.palette.maxRgb,
        m.palette.minVal, m.palette.midVal, m.palette.maxVal,
        evalInfo.ssmaiVal[i]);
      colors.push(rgbToHex(rgb));
    }
    var chart = ui.Chart.feature.groups(ssmaiDf, 'millis', 'ssma', 'millis')
      .setChartType('ColumnChart')
      .setOptions({
        title: evalInfo.aoiName,
        bar: {groupWidth: '100%'},
        colors: colors,
        legend: {position: 'none'},
        vAxis: {
          title: 'Surface Soil Moisture Anomaly Index',
          viewWindow: {min: -1.5, max: 1.5},
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
  var aoi = m.basins.filterBounds(geom)
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
// Adds the most recent SSMAI image to the map.
function drawRecentSsmai() {
  var recent = m.drought.sort('system:time_start', false).first()
    .select(m.droughtBand).clip(m.basins);
  var date = recent.date().format('YYYY-MM-dd').getInfo();
  var recentRelLayer = ui.Map.Layer(
    recent, {min: m.palette.minVal, max: m.palette.maxVal,
      palette: ['red', 'white', 'blue']},
      'Soil Moisture Anomaly Index for ' + date, true, 0.7);  
  c.map.layers().set(0, recentRelLayer);
  drawLegend(date);
}
// Overlays basins of Thailand on the map.
function drawBasins() {
  var basinsViz = ee.Image().byte().paint({
    featureCollection: m.basins.filterBounds(m.drought.first().geometry()),
    color: 1,
    width: 1.5
  });
  var basinsVizLayer = ui.Map.Layer(basinsViz, {palette: ['484848']}, 'Basins of Thailand');
  c.map.layers().set(1, basinsVizLayer);
}
// Adds SSMAI legend to the map.
function drawLegend(imgDate) {
  c.legend.title.setValue('Surface Soil Moisture Anomaly Index for ' + imgDate);
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
  lon: ui.url.get('lon', 101.01),
  lat: ui.url.get('lat', 13.15),
  zoom: ui.url.get('zoom', 5.6)
});
// Initialize map.
drawRecentSsmai();
drawBasins();
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