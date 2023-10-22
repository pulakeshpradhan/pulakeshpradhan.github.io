// #############################################################################
// ### 1 VARIABLES & PARAMETERS ###
// #############################################################################
// datasets
var collection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
var dataBand = 'avg_rad';
var cloudBand = 'cf_cvg';
var borders = ee.FeatureCollection("USDOS/LSIB/2017");
// dates
var dateStart = '2019-06-01';
var dateEnd = '2019-11-30';
// styling
var visParams = {min: 0.0, max: 70, palette: ['black', '#dd6e20', '#dd9740', '#e1b176', '#ecce96', '#ffffff']};
var borderStyle = {color: 'red', width: 1.5, fillColor: 'FF000000'};
// other
var countryName = 'France';
var cloudThreshold = 1;
// globals 
// var country
// #############################################################################
// ### 2 FUNCTIONS ###
// #############################################################################
var applyFilters = function (target_collection ) {
  return target_collection 
    .filter(ee.Filter.bounds(country))
    .filter(ee.Filter.date(dateStart, dateEnd));
};
var maskClouds = function(img) {
  var mask = img.select(cloudBand).gte(cloudThreshold);
  return img.updateMask(mask);
};
var makeComposite = function(target_collection) {
  var composite = target_collection.select(dataBand).mean().clip(country);
  return composite;
};
// GUI
var makePanelBreak = function() {
  var panelBreak = ui.Panel({style: {stretch: 'horizontal', height: '1px', backgroundColor: 'grey', margin: '8px 0px'}});
  return panelBreak;
};
var countryNameHandler = function(selected_name) {
  countryName = selected_name;
  print(countryName);
  updateMap();
  Map.centerObject(country, 6);
  chartPanel.widgets().set(0, chartPlaceHolder);
};
var startDateHandler = function(dateRange) {
  dateStart = dateRange.start();
  updateMap();
};
var endDateHandler = function(dateRange) {
  dateEnd = dateRange.start();
  updateMap();
};
var cloudThreshHandler = function(value) {
  cloudThreshold = value;
  updateMap();
};
var updateMap = function() {
  country = borders.filter(ee.Filter.eq('COUNTRY_NA', countryName));
  filteredColl = applyFilters(collection);
  maskedColl = filteredColl.map(maskClouds);
  print('Images in coll:', maskedColl.size());
  composite = makeComposite(maskedColl);
  var compositeLayer = ui.Map.Layer(composite, visParams, 'time-average composite');
  var borderLayer = ui.Map.Layer(country.style(borderStyle), {}, 'country border');
  Map.layers().set(0, compositeLayer);
  Map.layers().set(1, borderLayer);
};
var mapClickHandler = function(coords) {
  var clickedPoint = ee.Geometry.Point(coords.lon, coords.lat);
  var clickedPointLayer = ui.Map.Layer(clickedPoint, {color: 'pink'}, 'clicked point');
  Map.layers().set(2, clickedPointLayer);
  var chart = ui.Chart.image.series({
    imageCollection: maskedColl.select(dataBand), 
    region: clickedPoint, 
    reducer: ee.Reducer.mean(), 
    scale: 500,  
  })
  .setOptions({
      title: 'Mean radiance across time',
      vAxis: {title: 'radiance, W·sr·e−1·m·e−2'},
      hAxis: {title: 'date'},
      curveType: 'function',
      series: {
        0: { 
          visibleInLegend: false, 
          color: 'orange'
        }
      },
    });
  chartPanel.widgets().set(0, chart);
};
// #############################################################################
// ### 3 IMPLEMENTATION ###
// #############################################################################
// globals
var country;
var filteredColl;
var maskedColl;
var composite;
var countries = borders.aggregate_array('COUNTRY_NA').sort().getInfo();
// UI
var appTitle = ui.Label({
  value: 'Global Night Light Explorer', 
  style: {fontSize: '24px', fontWeight: 'bold', color: 'brown'}//, textAlign : 'center', stretch: 'horizontal'}, 
  // targetUrl
});
var appDescription = ui.Label({
  value: '1. Select country and time period to get mean night light intersity\n2. Click on map to get time-series chart', 
  style: {whiteSpace: 'pre'}, 
  // targetUrl
});
var referencesLabel = ui.Label({
  value: 'References', 
  style: {fontSize: '20px', fontWeight: 'bold'}//, textAlign : 'center', stretch: 'horizontal'}, 
  // targetUrl
});
var ref1Label = ui.Label({
  value: 'Sentinel-5 Satellite. The European Space Agency', 
  style: {fontSize: '10px',},//, textAlign : 'center', stretch: 'horizontal'}, 
  targetUrl: 'https://sentinel.esa.int/web/sentinel/missions/sentinel-5'
});
var ref2Label = ui.Label({
  value: 'H. Eskeset al.: Sentinel-5 precursor/TROPOMI Level 2 Product User Manual Nitrogendioxide, Tech. Rep. S5P-KNMI-L2-0021-MA, Koninklijk Nederlands Meteorologisch Instituut (KNMI), CI-7570-PUM, issue 3.0.0, 2019', 
  style: {fontSize: '10px',},//, textAlign : 'center', stretch: 'horizontal'}, 
  targetUrl: 'https://sentinels.copernicus.eu/documents/247904/2474726/Sentinel-5P-Level-2-Product-User-Manual-Nitrogen-Dioxide'
});
var countrySelector = ui.Select({
  items: countries, 
  placeholder: 'Select a country', 
  value: countryName, 
  onChange: countryNameHandler, 
  // disabled,
  style: {stretch: 'horizontal'}
});
var countryLabel = ui.Label({value: 'Select country', style: {stretch: 'vertical'}});
var countryPanel = ui.Panel({
  widgets: [countryLabel, countrySelector], 
  layout: ui.Panel.Layout.flow('horizontal')
});
var startDateSelector = ui.DateSlider({
  start: '2014-01-01', 
  // end, 
  value: dateStart, 
  period: 1, 
  onChange: startDateHandler, 
  style: {width: '72%'}
});
var endDateSelector = ui.DateSlider({
  start: '2014-01-01', 
  // end, 
  value: dateEnd, 
  period: 1, 
  onChange: endDateHandler, 
  style: {width: '72%'}
});
var startDateLabel = ui.Label({value: 'Start Date: ', style: {stretch: 'both'}});
var endDateLabel = ui.Label({value: 'End Date: ', style: {stretch: 'both', }});
var startDatePanel = ui.Panel({
  widgets: [startDateLabel, startDateSelector], 
  layout: ui.Panel.Layout.flow('horizontal')
});
var endDatePanel = ui.Panel({
  widgets: [endDateLabel, endDateSelector], 
  layout: ui.Panel.Layout.flow('horizontal')
});
var datePanel = ui.Panel({
  widgets: [startDatePanel, endDatePanel], 
});
var cloudSlider = ui.Slider({
  min: 0, 
  max: 60, 
  value: 1, 
  step: 1, 
  onChange: cloudThreshHandler, 
  // direction, 
  // disabled, 
  style: {stretch: 'horizontal'}
});
var cloudPanel = ui.Panel({
  widgets: [ui.Label('Cloud-free aqusitions / month'), cloudSlider], 
  layout: ui.Panel.Layout.flow('horizontal')
});
var authorName = ui.Label({
  value: 'Vasily Lobanov',
  targetUrl: 'https://github.com/bazzile'
});
var chartPlaceHolder = ui.Label('Click on image to compute time series...', {fontWeight: 'bold'});
var chartPanel = ui.Panel();
var authorPanel = ui.Panel({
  widgets: [ui.Label('Author:'), authorName], 
  layout: ui.Panel.Layout.flow('horizontal')
});
var logoRUDN = ui.Thumbnail({
  image: ee.Image('users/lobanov/rsee01/logos/RUDN_logo'), 
  params: {min: 0, max: 255}, 
  style: {
    height: '44px',
    width: '148px'
  }
});
var logoEPF = ui.Thumbnail({
  image: ee.Image('users/lobanov/rsee01/logos/EPF_logo'), 
  params: {min: 0, max: 255}, 
  style: {
    height: '48px',
    width: '120px'
  }
});
var logoPanel = ui.Panel({
  widgets: [logoEPF, logoRUDN], 
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {height: '12%'}
});
var mainPanel = ui.Panel({
  widgets: [
    appTitle, makePanelBreak(), appDescription, makePanelBreak(), 
    countryPanel, datePanel, cloudPanel, makePanelBreak(), 
    // chart,
    chartPanel,
    makePanelBreak(), 
    referencesLabel,
    ref1Label, ref2Label,
    makePanelBreak(),
    logoPanel,
    authorPanel
  ], 
  // layout, 
  style: {width: '25%', border: '1px solid black', padding: '10px'}
});
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: {min: 0, max: 1, palette: visParams.palette, bbox: [0, 0, 1, 0.1], dimensions: '100x10', format: 'png', },
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visParams.min, {margin: '4px 8px', fontSize: '12px'}), //
    ui.Label((visParams.max/2), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '12px'}),
    ui.Label(visParams.max, {margin: '4px 8px', fontSize: '12px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Average DNB radiance, nanoWatts/cm²/sr',
  style: {fontWeight: 'bold', fontSize: '12px'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels], null, {width: '25%'});
var darkMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];
// #############################################################################
// ### 4 VISUALIZATION ###
// #############################################################################
// UI
// Map.add(countrySelector);
// Map.add(monthSelector);
// Map.add(yearSelector);
ui.root.insert(1, mainPanel);
Map.add(legendPanel);
Map.onClick(mapClickHandler);
Map.setOptions({
  mapTypeId: 'Dark Map',
  styles: {"Dark Map": darkMap}, 
  types: ['Dark Map']
});
chartPanel.widgets().set(0, chartPlaceHolder);
updateMap();
Map.centerObject(country, 6);