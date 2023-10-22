var bucuresti = ui.import && ui.import("bucuresti", "table", {
      "id": "users/christinnea/bucharest_simple"
    }) || ee.FeatureCollection("users/christinnea/bucharest_simple"),
    ro = ui.import && ui.import("ro", "table", {
      "id": "users/christinnea/Romania"
    }) || ee.FeatureCollection("users/christinnea/Romania");
//Comparing tropospheric NO2 emissions prior and during the COVID-19 epidemics in Romania.
//Author: Cristina Vrînceanu, Nottingham Geospatial Institute, University of Nottingham
//Contact: cristina.vrinceanu@nottingham.ac.uk
//Script done for geo-spatial.org --- covid19.geo-spatial.org platform
//Daily update
var now=ee.Date(Date.now());
var start = ee.Date('2020-02-20');
var start_month = start.advance(-64, 'day');
var now_2019=now.advance(-1,'year');
var start_2019= start.advance(-1, 'year')
var s1 = start_month.format('YYYY-MMM-dd').cat(' to ').cat(start.format('YYYY-MMM-dd')).getInfo();
var s2 = start.format('YYYY-MMM-dd').cat(' to ').cat(now.format('YYYY-MMM-dd')).getInfo();
var s3 = start_2019.format('YYYY-MMM-dd').cat(' to ').cat(now_2019.format('YYYY-MMM-dd')).getInfo();
//create custom map style using snazzy maps
var mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#54585c"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f7f7f7"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ededed"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
//create list of locations
var locationDict = {
  'Bucharest': {lon:26.100919, lat: 44.428695, zoom: 12},
  'Brașov':{lon:25.605299, lat: 45.651681, zoom:12},
  'Cluj':{lon:23.589345, lat: 46.767983, zoom:12},
  'Jassy':{lon: 27.591432, lat:47.154248, zoom:12},
  'Ișalnița':{lon: 23.732851, lat:44.394089, zoom:12},
  'Ploiești':{lon: 26.018858, lat:44.943132, zoom:12},
  'Rovinari': {lon: 23.150216, lat:44.902939, zoom:12},
  'Timișoara': {lon: 21.230321, lat: 45.751465, zoom: 12},
  'Turceni': {lon: 23.373928, lat: 44.676889, zoom: 12},
};
var defaultLocation = locationDict['Bucharest'];
// Creating feature collection for cities and use as bbox 
var bbox = ee.FeatureCollection([ //Pre-defined bounding boxes for the cities ----are not that accurate
  ee.Feature(    // București.
    ee.Geometry.Rectangle(25.961296, 44.543687, 26.227087, 44.335327), {label: 'București'}),]);
var cities = ee.FeatureCollection([ //Cities boundaries from geometry ---- takes longer to compute statistics -- if too complex, memory might crash
  ee.Feature(bucuresti.geometry(), {label:'București'}),]);
// Importing color palette for visualization
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.PuBuGn[5];
// Masking all the pixels that containg cloud fraction flags (0 to 1). By default the pixels with more than 50% cloud are removed before
// Additional cloud masking is recommended by CAMS: https://bit.ly/2AAJkLz
// Reference date: 20.02.2020
//Importing Sentinel-5P image collections for the year prior (2019) to the COVID-19 case
var no2_2019 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .filterDate(start_2019,now_2019)
  .map(function(image){return image.clip(ro)})
  .map(function maskCloudPixels(image){var cf=image.select('cloud_fraction');
                                   return image.updateMask(cf.lt(0.25))}).select('tropospheric_NO2_column_number_density');
// Importing Sentinel 5P image collections for the period of the pandemic
var no2_during = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .filterDate(start, now)
  .map(function(image){return image.clip(ro)})
  .map(function maskCloudPixels(image){var cf=image.select('cloud_fraction');
                                   return image.updateMask(cf.lt(0.25))}).select('tropospheric_NO2_column_number_density');
// Setting map controls and removing some unnecessary control panels while keeping zoom and scale
var mapPanel = ui.Map();
mapPanel.setOptions('Lighter',{'Lighter': mapStyle});
mapPanel.addLayer(no2_2019.mean().multiply(1e6),{min:0, max:130, palette:palette, opacity:0.50});
mapPanel.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
mapPanel.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
var map = ui.root.widgets().reset([mapPanel]);
// Creating the linked map and adding it to the split widget through a linker
var linkedMap = ui.Map();
linkedMap.setOptions('Lighter',{'Lighter':mapStyle});
linkedMap.addLayer(no2_during.mean().multiply(1e6), {min:0, max: 130, palette: palette, opacity:0.50});
linkedMap.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
linkedMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
//Show bbox/cities on map
//linkedMap.addLayer(bbox,{},'bbox);
//linkedMap.addLayer(cities,{},'cities');
// // Add title labels to the maps
var title_during= linkedMap.add(ui.Label(
    'Average concentration of NO2 during the epidemic '+s2, {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'}));
var title_2019= mapPanel.add(ui.Label(
    'Average concentration of NO2 during '+s3, {fontWeight: 'bold', fontSize: '10px', position: 'bottom-left', color: 'slateGrey'}));
//mapPanel.add(ui.Label(s1,{fontWeight: 'bold', fontSize: '10px', position:'top-left', color: 'slateGrey'}));
//linkedMap.add(ui.Label(s2,{fontWeight: 'bold', fontSize: '10px', position:'top-right', color: 'slateGrey'}));
// Creating the split panel comprising the two maps
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
//Let's add some explanation to the map
// Create side panel and add a header and text
var header = ui.Label('Comparative map of nitrogen dioxide (NO2) tropospheric concentrations during the COVID-19 epidemic', {fontSize: '15px', fontWeight:'bold', color: 'darkSlateGrey'});
var text_1 = ui.Label(
    'The map shows the mean concentration of nitrogen dioxide (NO2) in the troposphere (0-10 km), averaged for the time of the COVID-19 epidemic in Romania (left panel) and the same period in 2019 (right panel). The chosen refrence date is the 20th of February 2020. ',
    {fontSize: '11px'});
var text_2 = ui.Label(
    'Data Source: Sentinel-5P Near Real Time Data (European Comission/ESA/Copernicus)/ processed in Google Earth Engine',
    {fontSize: '11px'});    
var text_3 = ui.Label(
    'The map data update rate is daily. Last update: '+ now.format('YYYY-MMM-dd').getInfo(),
    {fontSize: '11px'}); 
var toolPanel = ui.Panel([header, text_1, text_2, text_3], 'flow', {width: '300px'});
//Create external reference with link
var link1 = ui.Label(
    'Information about in-situ sensing of NO2 (Romanian)', {fontSize:'11px', color:'blue'},
    'https://aerlive.ro/oxizi-de-azot-nox-monoxidul-de-azot-no-dioxidul-de-azot-no2/');
var link2 = ui.Label(
    'Information about the satellite sensing of NO2 (English)', {fontSize:'11px', color:'blue'},
    'http://www.tropomi.eu/data-products/nitrogen-dioxide');
var linkPanel = ui.Panel(
    [ui.Label('More information about nitrogen dioxide emissions:', {fontWeight: 'bold'}), link1, link2]);
toolPanel.add(linkPanel);
//Add layer with NO2 în 2019
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Select urban area:', {'font-size': '15px', 'fontWeight':'bold' }), locationSelect
]);
toolPanel.add(locationPanel);
// Create legend for the data
var vis = {min: 30, max: 180, palette: palette};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x5',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'NO2 Concentration (μmol/m^2)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
toolPanel.widgets().set(6, legendPanel);
// Create an opacity slider for the . This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider1 = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider1.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var title_op_1= ui.Label('Right panel opacity',
    {fontSize: '14px', position:'bottom-center', color:'darkSlateGrey'});
var viewPanel =
    ui.Panel([title_op_1, opacitySlider1], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
//Opacity slider 2
var opacitySlider2 = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider2.onSlide(function(value) {
  linkedMap.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var title_op_2= ui.Label('Left panel opacity',
    {fontSize: '14px', position:'bottom-center', color:'darkSlateGrey'});
var viewPanel =
    ui.Panel([title_op_2, opacitySlider2], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
//Create text for credit
var credit= ui.Label('© geo-spatial.org, 2020. E-mail: covid19@geo-spatial.org. Twitter: @geospatialorg',
    {fontSize: '11px', position:'bottom-center', color:'darkGrey'});
toolPanel.add(credit);
ui.root.widgets().add(toolPanel);
//create second panel
var toolPanel2= ui.Panel({style: {width: '400px'}});
var intro= ui.Label('Statistics panel', {fontSize: '15px', fontWeight:'bold', color:'darkSlateGrey'});
var info= ui.Label('The graphs are automatically generated during map loading. For visualizing an enhanced version and download, please use the button on the side of each graph.', {fontSize:'11px'})
//create layer selector
toolPanel2.add(intro).add(info);
//Add chart for during
var no2duringTS = ui.Chart.image.seriesByRegion(
  no2_during, bbox, ee.Reducer.mean(), 'tropospheric_NO2_column_number_density', 1.1, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'Daily NO2 tropospheric concentration during the epidemic', fontSize:'3px',
          vAxis: {title: '(mol/m^2)'},
          hAxis: {format: 'dd-MM'},
          lineWidth: 1,
          interpolateNulls: true,
          series: {0: {color: '#00868b', opacity:0.75}, // București
}});
toolPanel2.add(no2duringTS);
//Add chart for during 2019
var no2TS2019 = ui.Chart.image.seriesByRegion(
    no2_2019, bbox, ee.Reducer.mean(), 'tropospheric_NO2_column_number_density', 1.1, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'Daily NO2 tropospheric concentration during the same period in 2019', fontSize:'3px',
          vAxis: {title: '(mol/m^2)'},
          hAxis: {format: 'dd-MM'},
          lineWidth: 1,
          interpolateNulls: true,
          series: {0: {color: '#00868b', opacity:0.75}, // București
}});
toolPanel2.add(no2TS2019);
//Add chart for all 2019-2020
var no2all2019 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .filterDate('2019-01-01','2019-12-31')
  .map(function(image){return image.clip(ro)})
  .map(function maskCloudPixels(image){var cf=image.select('cloud_fraction');
                                   return image.updateMask(cf.lt(0.25))}).select('tropospheric_NO2_column_number_density');
var no2all2020 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .filterDate('2020-01-01', now)
  .map(function(image){return image.clip(ro)})
  .map(function maskCloudPixels(image){var cf=image.select('cloud_fraction');
                                   return image.updateMask(cf.lt(0.25))}).select('tropospheric_NO2_column_number_density');
var final = no2all2019.merge(no2all2020);
var no2_all = ui.Chart.image.seriesByRegion(
    final, bbox, ee.Reducer.mean(), 'tropospheric_NO2_column_number_density', 1.1, 'system:time_start', 'label')
        .setChartType('LineChart')
        .setOptions({
          title: 'Daily NO2 tropospheric concentrations from 2019 to 2020', fontSize:'3px',
          vAxis: {title: '(mol/m^2)'},
          hAxis: {format: 'dd-MM'},
          lineWidth: 1,
          interpolateNulls: true,
          series: {0: {color: '#00868b', opacity:0.75}, // București
}});
toolPanel2.add(no2_all);
ui.root.insert(0,toolPanel2);