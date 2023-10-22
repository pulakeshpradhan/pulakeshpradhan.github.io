/**
 * @license
 * Copyright 2021 The Google Earth Engine Community Authors
 * Code: Modified by Samapriya Roy
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
 * This app shows a map of the most recent Drought Monitor Map Drought Category and
 * a weekly time series chart for a selected county going back to the year 2000.
 * Click on a county polygon and wait a minute to view the time series.
 * The app uses URL parameters to save its state for sharing what you discover with colleagues.
 * Map courtesy of National Drought Monitoring Center.
 */
var mundo = ee.FeatureCollection("FAO/GAUL/2015/level1");
var Spain = mundo.filterMetadata('ADM0_NAME', 'equals', 'Spain')
var header = ui.Label('TimeSeries REFOREST', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
var text = ui.Label('This tool allows detecting the time series of each pine forest polygon of (Spanish Forest Map) MFE..',{fontSize: '15px'});
var autores = ui.Label('Autores',{fontWeight: 'bold'});    
var autor2 = ui.Label('María González Sanchis',{fontSize: '15px'});
var autor1 = ui.Label('Javier Pérez Romero', {fontSize: '15px'});
var autor3 = ui.Label('Antonio J. Molina Herrera', {fontSize: '15px'});
var autor4 = ui.Label('Laura Blanco Cano', {fontSize: '15px'});
var autor5 = ui.Label('Antonio del Campo García', {fontSize: '15px'});
var intro = ui.Panel([ui.Label({value: '____________________________________________',style: {fontWeight: 'bold',  color: '4A997E'},})]);
var indexes = ee.List(['nbr','ndvi','ndii','rvi','msi','rvi','gci','evi2'])
var indexSelector = ui.Select({placeholder: 'please wait..',})
var indexSectionLabel = ui.Label('Select Index to view its graph ',{fontWeight: 'bold'});  
var datesPanel2 = ui.Panel([indexSectionLabel, indexSelector]);
var indexStrings = indexes.map(function(index){
  return ee.String(index)
})
indexStrings.evaluate(function(indexStrings) {
  indexSelector.items().reset(indexStrings)
  indexSelector.setPlaceholder('Select index')
}) 
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
m.chartBounds = {
  min: 0,
  max: 5
};
m.counties = ee.FeatureCollection("users/javierrieju/Pinares_spain");
m.drought = require('users/javierrieju/aprendizaje:Landsat_collection').landsat_yearly;//_monthly.filter(ee.Filter.inList('month', [6,7,8,9]));
m.droughtBand = indexSelector.getValue();
m.dateRange = [m.drought.first().get('date'), ee.Date(Date.now())];
m.USDMScale = 0.01;
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
c.clickMessage = ui.Label('🖱️Click on shapefile to Monitor annual series.');
c.waitMessage = ui.Label('⚙️ Processing, please wait.');
c.noFeaturesMessage = ui.Label('🙃 There are no features intersecting the ' +
  'point you clicked, try again.');
// Element panel.
c.aboutPanel = ui.Panel(
  {style: {margin: '0px -12px 0px -12px'}});
// Show/hide info panel button.
c.aboutButton = ui.Button(
  {label: 'About ❯', style: {margin: '0px 4px 0px 0px'}});
// Information text. 
c.descrLabel = ui.Label(
  'This application displays a map of the average annual'+
  ' index for the last year and a monthly time series graph'+
  'for the selected area. Click on a' + 
  'polygon and wait a minute to view the time series.' +
  'The application uses URL parameters to save your status and share what ' +
  'you discover with your colleagues. '+
  '                 '+  'Map courtesy of the ReforST-UPV team.'
  );
c.datasetLabel = ui.Label('Learn more', null,
  'https://silvadaptnet.webs.upv.es/');
c.descrHolder = ui.Panel([c.descrLabel, c.datasetLabel]);
//
c.infopanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  widgets:[header, text, autores, autor1, autor2, autor3, autor4,autor5,intro,datesPanel2],
  style:{width: '300px',position:'middle-right'}});
/*******************************************************************************
 * Composition *
 ******************************************************************************/
ui.root.clear();
ui.root.add(c.mapChartSplitPanel);
ui.root.add(c.infopanel);
//c.map.add(c.legend.panel);
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
c.datasetLabel.style().set({
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
/*******************************************************************************
 * Behaviors *
 ******************************************************************************/
// Segments out USDM image collection.
function getusdmSummary() {
  return m.drought
          .filterDate(m.dateRange[0], m.dateRange[1])
}
// Generates a USDM time series chart and adds it to chart panel.
function drawChart(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var aoi = m.counties.filterBounds(point);
  print(aoi)
  var aoiViz = aoi.draw({color: 'black', strokeWidth: 2});
  var aoiVizLayer = ui.Map.Layer(aoiViz, null, 'Selected zone');
  c.map.layers().set(2, aoiVizLayer);
  var USDMSummary = getusdmSummary();
  var USDMDf = USDMSummary.map(function(img) {
    var stat = img.add(1).reduceRegion({
      'geometry': aoi.geometry(),
      'reducer': ee.Reducer.mean(),
      'scale': 4000,
      'crs': 'EPSG:4326',
      'bestEffort': true 
    });
    return ee.Feature(null, stat)
            .set({'millis': img.date().millis()});  
  }).sort('millis').filter(ee.Filter.notNull([indexSelector.getValue()]))
  .map(function (ft){
    var dm = ft.getNumber(indexSelector.getValue()).round()
    return ft.set(indexSelector.getValue(),dm)
  })
  var USDMVal = USDMDf.aggregate_array(m.droughtBand);
  var evalInfo = ee.Dictionary({
    USDMVal: USDMVal,
    ADM2_NAME: aoi.first().getString('NOM_FORARB')
  });
  evalInfo.evaluate(function(evalInfo) {
    var chart = ui.Chart.image.seriesByRegion({
                    imageCollection: m.drought,
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: indexSelector.getValue(),
                    scale: 1000,
                    xProperty: 'date',
                    seriesProperty: 'POLIGON'
                  })
                  //.setSeriesNames(['Selected'])
                  .setOptions({
                    titlePostion: 'Time Series',
                    hAxis: {title: 'Date'},
                    vAxis: {title: indexSelector.getValue()},
                    trendlines: {0:{showR2: true}}
                  });
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
// Adds the most recent USDM image to the map.
function drawRecentUSDM() {
  var recent = m.drought.limit(1, 'date', false).first().select('ndvi').clip(Spain);
  var recentRelLayer = ui.Map.Layer(
    recent, {min: 0, max: 1,
      palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                '012E01', '011D01', '011301']},
      'Last year ndvi', true, 0.5);  
  c.map.layers().set(0, recentRelLayer);
}
// Overlays USA counties on the map.
function drawCounties() {
  var countiesViz = ee.Image().byte().paint({
    featureCollection: m.counties.filterBounds(m.drought.first().geometry()),
    color: 1,
    width: 1.5
  });
  var countiesVizLayer = ui.Map.Layer(countiesViz, {palette: ['484848']}, 'Pines MFE');
  c.map.layers().set(1, countiesVizLayer);
}
// Set map bounds based on URL params.
c.map.setCenter({
  lon: ui.url.get('lon', -5.93),
  lat: ui.url.get('lat', 39.96),
  zoom: ui.url.get('zoom', 5)
});
// Initialize map.
drawRecentUSDM();
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
          "color": "#616161",
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5",
          "visibility": "off"
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
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Low value", //1
    "Low-Medium", //2
    "Medium value", //3
    "Medium-High",//4
    "High value", //5
  ],
  "colors": ['FFFFFF','FCD163','529400','004C00','011301']};
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
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
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  c.map.add(panel);
}
var date = ee.Date(m.drought.sort('date',false).first().get('date')).format('YYYY')
addCategoricalLegend(legend, dict, 'NDVI Mean Yearly '+date.getInfo(),true,0.7);