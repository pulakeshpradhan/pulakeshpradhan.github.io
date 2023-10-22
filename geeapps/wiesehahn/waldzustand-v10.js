/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var clim = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE"),
    change = ee.Image("users/wiesehahn/waldsterben/lt-gee_ni_hb_2009-2019_10m"),
    forest = ee.Image("users/wiesehahn/waldsterben/FTY_2015_020m_eu_03035_d04_E40N30"),
    goettingen = ee.FeatureCollection("users/wiesehahn/waldsterben/ni/geodata/landkreis_goettingen"),
    niedersachsen = ee.FeatureCollection("users/wiesehahn/waldsterben/ni/geodata/nuts1_ni_hb");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/////////////////////////// imports ////////////////////////////////////////////////////////////////
// import viridis color palettes for better visualization
var palettes = require('users/gena/packages:palettes');
// import corine land cover to mask non forest areas
var corine = ee.ImageCollection('COPERNICUS/CORINE/V18_5_1/100m').first();
// import PALSAR forest/non-forest map to mask non forest areas
var fnf = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
                  .filterDate('2017')
                  .first();
/////////////////////////// functions ////////////////////////////////////////////////////////////////
// Function to mask clouds using the Sentinel-2 QA band
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  // scale back to reflectance values (divide by 10000)
  return image.updateMask(mask).divide(10000);
}
// function to add indices
var addIndices = function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename("NDVI"); // normalized difference vegetation index
    var ndmi = image.normalizedDifference(['B8', 'B11']).rename("NDMI"); // normalized difference moisture index
    var nbr = image.normalizedDifference(['B8A', 'B12']).rename("NBR"); // normalized burn ratio
  return(image.addBands(ndvi).addBands(ndmi).addBands(nbr).float());
};
// function to create image composite per year
var getComposite = function(year) {
    // Load Sentinel-2 surface reflectance data - level 2A
    var col = ee.ImageCollection('COPERNICUS/S2_SR')
                  //select time period for change detection (summer)
                  .filterDate(year+'-06-01', year+'-09-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .map(addIndices)
                  .median()
                  // mask non forest areas
                  .updateMask(corine.gte(23).and(corine.lte(32)))
                  .updateMask(fnf.eq(1))
                  .updateMask(forest.gte(1));
    return(col);
};
/////////////////////////// create data ////////////////////////////////////////////////////////////////
// apply functions to get images per year
var summer17 = getComposite(2017);
var summer18 = getComposite(2018);
var summer19 = getComposite(2019);
var change = change.updateMask(corine.gte(23).and(corine.lte(32))).updateMask(fnf.eq(1));
// mask pixels without degradation
var yod =  change.select(['yod']);
var mask = change.select(['yod']).neq(0);
var yod_masked = yod.updateMask(mask);
// create image composite from  years 2017 2018 2019
var composition = summer17.select('NBR').rename('NBR17')
.addBands(summer18.select('NBR').rename('NBR18'))
.addBands(summer19.select('NBR').rename('NBR19'))
.addBands(yod_masked.select('yod'))
.clip(niedersachsen);
// mask everything until 2017
var yod_act = yod_masked.updateMask(yod_masked.gte(2017));
// mask everything except certain years
var mask17 = change.select(['yod']).eq(2017);
var mask18 = change.select(['yod']).eq(2018);
var mask19 = change.select(['yod']).eq(2019);
var mag = change.select(['mag']);
var mag17 = mag.updateMask(mask17);
var mag18 = mag.updateMask(mask18);
var mag19 = mag.updateMask(mask19);
/////////////////////////// styles ////////////////////////////////////////////////////////////////
var nbrPalette = palettes.matplotlib.viridis[7];
var nbrVis = {
      min: 0,
      max: 0.75,
      palette: nbrPalette
};
var yodPalette = palettes.colorbrewer.Paired[10]; 
/*
var yodVis = {
  min: 2009,
  max: 2019,
  palette: yodPalette
};
var yodPalette_act = ['8000ff','ff00ff','ff0080'];
var yodVis_act = {
  min: 2017,
  max: 2019,
  palette: yodPalette_act
};
*/
// Visualization for magnitude of change
var minMag = 300;
var maxMag = 600;
var mag17Pal = ['3333FF','000068'];
var mag18Pal = ['FF0040','530015'];
var mag19Pal = ['FF3399','680035'];
var mag17Vis = {min: minMag, max: maxMag, palette: mag17Pal};
var mag18Vis = {min: minMag, max: maxMag, palette: mag18Pal};
var mag19Vis = {min: minMag, max: maxMag, palette: mag19Pal};
var layerProperties = {
    'ohne': {
    name: 'NBR17',
    visParams: {
      min: 0,
      max: 0,
      opacity: 0.001
    },
    defaultVisibilityLeft: false,
    defaultVisibilityRight: false
    },
  '2017': {
    name: 'NBR17',
    visParams: nbrVis,
    defaultVisibilityLeft: true,
    defaultVisibilityRight: false
    },
  '2018': {
    name: 'NBR18',
    visParams: nbrVis,
    defaultVisibilityLeft: false,
    defaultVisibilityRight: false
  },
  '2019': {
    name: 'NBR19',
    visParams: nbrVis,
    defaultVisibilityLeft: false,
    defaultVisibilityRight: true
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Übersicht': {lon: 9.3062, lat: 52.6206, zoom: 8},
  'Landkreis Göttingen': {lon: 10.008, lat: 51.557, zoom: 10},
  'Forstrevier Ellershausen': {lon: 9.64408, lat: 51.51779, zoom: 14},
  'Forstrevier Reinhausen': {lon: 9.99775, lat: 51.4472, zoom: 13},
  'Forstrevier Lerbach': {lon: 10.32733, lat: 51.7386, zoom: 13}
};
/////////////////////////// split panel ////////////////////////////////////////////////////////////////
// Create the left map
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
// Create the right map
var rightMap = ui.Map();
rightMap.setControlVisibility({all: false, mapTypeControl: true, scaleControl: true});
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Center the map
var defaultLocation = locationDict['Forstrevier Ellershausen'];
leftMap.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add layers to the left map 
// selectable
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = composition.select(layer.name).visualize(layer.visParams);
  leftMap.add(ui.Map.Layer(image, {}, key, layer.defaultVisibilityLeft));
}
// fixed
leftMap.addLayer(mag17, mag17Vis, 'change 17', true);
leftMap.addLayer(mag18, mag18Vis, 'change 18', true);
leftMap.addLayer(mag19, mag19Vis, 'change 19', true);
// Add layers to the right map 
// selectable
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = composition.select(layer.name).visualize(layer.visParams);
  rightMap.add(ui.Map.Layer(image, {}, key, layer.defaultVisibilityRight));
}
// fixed
//rightMap.addLayer(yod_act, yodVis_act, 'landtrendr', true);
rightMap.addLayer(mag17, mag17Vis, 'change 17', true);
rightMap.addLayer(mag18, mag18Vis, 'change 18', true);
rightMap.addLayer(mag19, mag19Vis, 'change 19', true);
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[2],
  onChange: function(value) {
    var location = locationDict[value];
    leftMap.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Region auswählen', {fontWeight: 'bold', padding: '0 0 0 0'}), locationSelect]);
  locationPanel.style().set({
  position: 'top-left'
});
leftMap.add(locationPanel);
/////////////////////////// side panel ////////////////////////////////////////////////////////////////
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Waldsterben 2.0 ?', {fontSize: '20px', fontWeight: 'bold'});
var text = ui.Label(
    'Hat sich der Zustand des Waldes in den letzten Jahren verändert? Können Aussagen zu Vitalität und Schadflächen aus multi-temporalen Fernerkundungsdaten abgeleitet werden?',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '375px'});
ui.root.widgets().add(toolPanel);
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
//left map
var layerSelect_left = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    leftMap.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    leftMap.layers().get(4).setShown(true);
    leftMap.layers().get(5).setShown(true);
    leftMap.layers().get(6).setShown(true);
  },
  style: {stretch: 'horizontal'}
});
//right map
var layerSelect_right = ui.Select({
  items: selectItems,
  value: selectItems[2],
  onChange: function(selected) {
    rightMap.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    rightMap.layers().get(4).setShown(true);
    rightMap.layers().get(5).setShown(true);
    rightMap.layers().get(6).setShown(true);
  },
  style: {stretch: 'horizontal'}
});
// set initial Opacity
leftMap.layers().get([4]).setOpacity(0);
leftMap.layers().get([5]).setOpacity(0);
leftMap.layers().get([6]).setOpacity(0);
rightMap.layers().get([4]).setOpacity(0);
rightMap.layers().get([5]).setOpacity(0);
rightMap.layers().get([6]).setOpacity(0);
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Kartenlayer auswählen', {fontWeight: 'bold'}));
toolPanel.add(ui.Label('Vegetationszustand im Sommer:',{fontSize: '12px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'center'}));
var layerSelectPanel =
    ui.Panel([layerSelect_left, layerSelect_right], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(layerSelectPanel);
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x2',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style:  {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label('schlecht', {fontSize: '10x', margin: '4px 8px'}),
        ui.Label('',
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label('gut', {fontSize: '12px', margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(nbrVis.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '12px', 
  //fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '0 0 4px 0',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '8px',
};
// Assemble the legend panel.
toolPanel.add(ui.Panel(
    [
      //ui.Label('Vitalität', LEGEND_TITLE_STYLE), 
      makeLegend(),
      ui.Label(
          'Dargestellt ist der Normalized Burn Ratio der Monate Juni bis August. Dieser dient als Indikator für den Vitalitätszustand des Waldes.', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {position: 'bottom-center', stretch: 'horizontal' }));
toolPanel.add(ui.Label('Schadflächen', {fontSize: '12px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'center'}));
//toolPanel.add(opacitySlider, {position: 'top-center'});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  leftMap.layers().get(4).setOpacity(value);
  leftMap.layers().get(5).setOpacity(value);
  leftMap.layers().get(6).setOpacity(value);
  rightMap.layers().get(4).setOpacity(value);
  rightMap.layers().get(5).setOpacity(value);
  rightMap.layers().get(6).setOpacity(value);
});
// set position of panel
var legend = ui.Panel({
  style: {
    padding: '8px 15px', position: 'bottom-left'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Schadensjahr',
  style: LEGEND_TITLE_STYLE
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor:  color,
          // Use padding to give the box height and width.
          padding: '6px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 0px 6px',
          fontSize: '12px'
        }
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette = ['0000e6', 'cc0033','e60077'];
// name of the legend
var names = ['2017','2018','2019'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add to panel
var schadPanel =
    ui.Panel([legend,
              ui.Panel({widgets: [ui.Label('Sichtbarkeit', {fontSize: '12px' }), opacitySlider],layout: ui.Panel.Layout.Flow('vertical')})],
              ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(schadPanel);
// description
toolPanel.add(ui.Label(
          'Bestimmt wurden Flächen im Wald, auf welchen seit 2009 eine starke Abnehme der Vitalität verzeichnet wurde. Dazu wurden Landsat-Zeitreihen von 1986 bis 2019 und eine Implementierung des Landtrendr Algorithmus verwendet.', LEGEND_FOOTNOTE_STYLE));
// Create a hyperlink to an external reference.
var link = ui.Label(
    'LT-GEE Guide', {fontSize: '12px'},
    'https://emapr.github.io/LT-GEE/');
var linkPanel = ui.Panel(
    [ui.Label('Infos zur Methode:', {fontSize: '12px'}), link], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(linkPanel);
/////////////////////////// charts ////////////////////////////////////////////////////////////////  
/////////////////////////// area ////////////////////////////////////////////////////////////////
var roi = niedersachsen;
var count = yod.eq([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]).rename(['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017','2018','2019']);
var total = count.multiply(ee.Image.pixelArea()).divide(10000);
var both = ee.FeatureCollection([
  ee.Feature(goettingen.first().geometry(), {label: 'Landkreis Göttingen'}),
  ee.Feature(niedersachsen.filter(ee.Filter.eq("NUTS_NAME", 'Niedersachsen')).geometry(), {label: 'Niedersachsen'})]);
var areaHist = ui.Chart.image.regions({image:total,reducer:ee.Reducer.sum(), regions: both, scale: 30, seriesProperty :'label'})
  .setChartType('ColumnChart');
  areaHist.setOptions({
    title: 'Waldschadensflächen ',
    vAxis: {title: 'ha'},
    hAxis: {title: 'Jahr', minValue: 1},
    width: '100%',
    height: 150,
    series: {
      0: {color: '865dff'},
      1: {color: '333333'}}
  });
  areaHist.style().set({stretch: 'horizontal'});
/* test chart per forest type
var test = total.addBands(forest.rename('forestType'))
var test = test.updateMask(forest.eq(1).or(forest.eq(2)))
print(test)
var testChart = ui.Chart.image.byClass({image:test,classBand:'forestType', reducer:ee.Reducer.sum(), region:roi, scale: 1000})
print(testChart)
*/
/////////////////////////// climate ////////////////////////////////////////////////////////////////
// set start and end year
var startyear = 1980; 
var endyear = 2018; 
// make a list with years
var years = ee.List.sequence(startyear, endyear);
// make a date object
//var startdate = ee.Date.fromYMD(startyear,6, 1);
//var enddate = ee.Date.fromYMD(endyear + 1, 9, 1);
// set start and end month 
var startmonth = 6; 
var endmonth = 8; 
// Get the geometry
var roi = roi.geometry();
var annualSum = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = clim
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .filter(ee.Filter.calendarRange(startmonth, endmonth, 'month'))
        .sum();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
var annualMean = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = clim
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .filter(ee.Filter.calendarRange(startmonth, endmonth, 'month'))
        .mean();
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
// precipitation chart
var prChart = ui.Chart.image.seriesByRegion({
  imageCollection: annualSum, 
  regions: roi,
  reducer: ee.Reducer.mean(),
  band: 'pr',
  scale: 2500,
  xProperty: 'year',
  seriesProperty: 'SITE'
}).setOptions({
  title: 'Niederschlag',
  hAxis: {title: 'Jahr'},
  vAxis: {title: 'Niederschlag (mm)',
    width: '100%',
    height: 150,},
})
  .setChartType('ColumnChart');
// calculate mean temperature and scale
var calcMean = function(image) {
  //mean Temp
  var mean = (image.select('tmmn').add(image.select('tmmx')).divide(2)).rename('Temperatur');
  //scale to °C
  var temp = mean.divide(10); 
  return image.addBands(temp);
};
var tempMean = annualMean.map(calcMean);
// temperature chart
var tempChart = ui.Chart.image.series({
  imageCollection: tempMean.select(['Temperatur']), 
  region: roi,
  reducer: ee.Reducer.mean(),
  scale: 2500,
  xProperty: 'year',
}).setOptions({
  title: 'Temperatur',
  hAxis: {title: 'Jahr'},
  vAxis: {title: 'Temperatur (°C)', 
          viewWindowMode:'explicit',
              viewWindow:{
                max:20,
                min:15}},
  colors: ['#e0440e'],
  width: '100%',
  height: 150,
})
  .setChartType('LineChart');
// drought chart
var pdsiChart = ui.Chart.image.seriesByRegion({
  imageCollection: annualMean, 
  regions: roi,
  reducer: ee.Reducer.mean(),
  band: 'pdsi',
  scale: 2500,
  xProperty: 'year',
  seriesProperty: 'SITE'
}).setOptions({
  title: 'Palmer Drought Severity Index',
  hAxis: {title: 'Jahr'},
  vAxis: {title: 'PDSI'},
  colors: ['#ffc125'],
  width: '100%',
  height: 150,
})
  .setChartType('LineChart');
/////////////////////////// add charts ////////////////////////////////////////////////////////////////
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'left',
  margin: '0 10px 10px 40px',
};
// add charts to side panel
var chartTitle = ui.Label('Statistiken', {fontWeight: 'bold', padding: '12px 0 0 0'});
var chartSubtitle1 = ui.Label('Flächendaten (2009-2019)', {fontSize: '12px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'center', padding: '12px 0 0 0'});
var chartFootnote1 =  ui.Label('aus Landsat-Zeitreihen abgeleitete Waldflächen mit signifikanter Vitalitätsabnahme in den Jahren 2009-2019 ', LEGEND_FOOTNOTE_STYLE);
var chartSubtitle2 = ui.Label('Klimadaten (1980-2018)', {fontSize: '12px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'center', padding: '12px 0 0 0'});
var chartFootnote21 =  ui.Label('mittlere Niederschlagssumme der Sommermonate (Juni-August) in Niedersachsen', LEGEND_FOOTNOTE_STYLE);
var chartFootnote22 =  ui.Label('mittlere Temperatur der Sommermonate (Juni-August) in Niedersachsen', LEGEND_FOOTNOTE_STYLE);
var chartFootnote23 =  ui.Label('mittlerer Trockenheitsindex der Sommermonate (Juni-August) in Niedersachsen', LEGEND_FOOTNOTE_STYLE);
var chartPanel = ui.Panel({  
  widgets: [chartTitle, 
            chartSubtitle1, areaHist, chartFootnote1,
            chartSubtitle2, prChart, chartFootnote21, tempChart, chartFootnote22, pdsiChart, chartFootnote23],
  style: {
    position: 'bottom-center',
    padding: '0 0 0 0',
    stretch: 'horizontal'
  },
  layout: ui.Panel.Layout.Flow('vertical')
});
toolPanel.add(chartPanel);
// credits
toolPanel.add(ui.Label('by Jens Wiesehahn (2019)    -   wiesehahn.jens@gmail.com', {fontSize: '10px', fontWeight: 'lighter', textAlign: 'right', padding: '12px 10px 0 10px'}));
/////////////////////////// basemap ////////////////////////////////////////////////////////////////
// Set a custom basemap style
var styles = {
  'Map': [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
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
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "weight": 2
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
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "poi.place_of_worship",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "simplified"
      },
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
};
leftMap.setOptions('Map', styles, ['Map', 'satellite']);
rightMap.setOptions('Map', styles, ['Map', 'satellite']);