/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var clim = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE"),
    grenzen = ee.FeatureCollection("users/wiesehahn/waldsterben/nuts1_germany"),
    wald_nrw = ee.FeatureCollection("users/wiesehahn/waldsterben/nrw/geoportal/basis-dlm_wald_nrw"),
    forstamt = ee.FeatureCollection("users/wiesehahn/waldsterben/nrw/geoportal/forstamtsgrenzen_nrw"),
    change = ee.Image("users/wiesehahn/waldsterben/nrw/lt-gee_nrw_20191001"),
    nbr_171819 = ee.Image("users/wiesehahn/waldsterben/nrw/nbr_171819_nrw");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/////////////////////////// settings ////////////////////////////////////////////////////////////////
var roi = grenzen.filterMetadata('NUTS_NAME', 'equals', 'Nordrhein-Westfalen').geometry();
/////////////////////////// imports ////////////////////////////////////////////////////////////////
// import viridis color palettes for better visualization
var palettes = require('users/gena/packages:palettes');
/////////////////////////// create data ////////////////////////////////////////////////////////////////
var composition = nbr_171819;
var change = change.clip(wald_nrw);
// mask pixels without degradation
var yod =  change.select(['yod']);
var mask = change.select(['yod']).neq(0);
var yod_masked = yod.updateMask(mask);
var lossImage = mask.updateMask(mask);
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
// Visualization for normalized burn ratio
var nbrPalette = palettes.matplotlib.viridis[7];
var nbrVis = {
      min: 0,
      max: 0.75,
      palette: nbrPalette
};
// Visualization for magnitude of change
var minMag = 300;
var maxMag = 600;
var mag17Pal = ['3333FF','000068'];
var mag18Pal = ['FF0040','530015'];
var mag19Pal = ['FF3399','680035'];
var mag17Vis = {min: minMag, max: maxMag, palette: mag17Pal};
var mag18Vis = {min: minMag, max: maxMag, palette: mag18Pal};
var mag19Vis = {min: minMag, max: maxMag, palette: mag19Pal};
// create dictionary for selection menu
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
// set style for region geometry
  var geomStyle = {color: 'FFFFFFD9', fillColor: '00000000', width: 1};
//// Panel Styles  
var titleStyle1 = {fontSize: '20px', fontWeight: 'bold'};
var titleStyle2 = {fontWeight: 'bold', padding: '12px 0 0 0'};
var titleStyle3 = {fontSize: '12px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'left', padding: '12px 0 0 16px'};
var titleStyle4 = {fontSize: '12px', stretch: 'horizontal', textAlign: 'center', padding: '12px 0 0 0'};
var lightStyle1 = {fontSize: '10px', fontWeight: 'lighter', padding: '12px 10px 0 10px'};
var lightStyle2 = {fontSize: '10px', fontWeight: 'lighter', padding: '0px 10px 0 16px'};
// Styling for the legend footnotes.
var footnoteStyle1 = {fontSize: '10px', stretch: 'horizontal', textAlign: 'left', margin: '0 10px 10px 10px'};
var LEGEND_FOOTNOTE_STYLE = {fontSize: '10px', stretch: 'horizontal', textAlign: 'left', margin: '0 10px 10px 40px'};
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {fontSize: '12px', stretch: 'horizontal', textAlign: 'left', margin: '0 0 4px 0'};
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
leftMap.setCenter(7.5, 51.5, 9);
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
leftMap.addLayer(forstamt.style(geomStyle));
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
rightMap.addLayer(forstamt.style(geomStyle));
/////////////////////////// side panel ////////////////////////////////////////////////////////////////
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Waldschäden aus der Sicht von Satelliten', titleStyle1);
var text = ui.Label(
  'Können Waldschadensflächen automatisiert aus Satellitenbilddaten detektiert werden? Und ist eine Anwendung auch auf großer Fläche effizient machbar? In einer Pilotstudie wurde dies am Beispiel des Landes NRW mithilfe der Google Earth Engine versucht. Hier ist eine Visualisierung der erkannten Störungsflächen für die Jahre 2017 bis 2019 zu sehen.',
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
    leftMap.layers().get(7).setShown(true);
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
    rightMap.layers().get(7).setShown(true);
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
toolPanel.add(ui.Label('Kartenlayer auswählen', titleStyle2));
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
// Assemble the legend panel.
toolPanel.add(ui.Panel(
    [
      //ui.Label('Vitalität', LEGEND_TITLE_STYLE), 
      makeLegend(),
      ui.Label(
          'Dargestellt ist der Normalized Burn Ratio der Monate Juni bis August. Dieser dient als Indikator für den Vitalitätszustand des Waldes.', footnoteStyle1)
    ],
    ui.Panel.Layout.flow('vertical'),
    {position: 'bottom-center', stretch: 'horizontal' }));
toolPanel.add(ui.Label('Schadflächen', {fontSize: '12px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'center'}));
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
          'Bestimmt wurden Flächen im Wald, auf welchen seit 2009 eine starke Abnehme der Vitalität verzeichnet wurde. Dazu wurden Landsat-Zeitreihen von 1986 bis 2019 und eine Implementierung des Landtrendr Algorithmus verwendet.', footnoteStyle1));
// Create a hyperlink to an external reference.
var link = ui.Label(
    'LT-GEE Guide', {fontSize: '12px'},
    'https://emapr.github.io/LT-GEE/');
var linkPanel = ui.Panel(
    [ui.Label('Infos zur Methode:', {fontSize: '12px'}), link], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(linkPanel);
/////////////////////////// charts ////////////////////////////////////////////////////////////////  
//////// select region interface and actions
//// interface
// get the region names
var names = ee.List(forstamt.aggregate_array('Foa_Name'));
// Initialize a selection field 
var locationSelect = ui.Select({items: names.getInfo(), onChange: redraw });
locationSelect.setPlaceholder('wähle Forstamt...'); 
// add to map
var locationPanel = ui.Panel([
  ui.Label('Region auswählen', {fontWeight: 'bold', padding: '0 0 0 0'}), locationSelect]);
  locationPanel.style().set({
  position: 'top-left'
});
leftMap.add(locationPanel);
//// variables
// create image pixel area in ha
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea()).divide(10000);
//// create image for forest types
// remap from string to integer
var old_values = ee.List(['1100', '1200', '1300']);
var new_values = ee.List([1100, 1200, 1300]);
var remapped = wald_nrw.remap(old_values, new_values, 'VEG');
// reduce features to image 
var vegImg = remapped
  .filter(ee.Filter.notNull(['VEG']))
  .reduceToImage({
    properties: ['VEG'],
    reducer: ee.Reducer.first()
}).rename('veg');
// filter change by vegetation type
var deciduousLostImg = lossAreaImage.updateMask(vegImg.eq(1100));
var coniferousLostImg = lossAreaImage.updateMask(vegImg.eq(1200));
var mixedLostImg = lossAreaImage.updateMask(vegImg.eq(1300));
/////////////////////////// area entire state ////////////////////////////////////////////////////////////////
var yod_bands = yod_masked.eq([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]).rename(['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017','2018','2019']);
var yod_area = yod_bands.multiply(ee.Image.pixelArea()).divide(10000);
var yod_area_deciduous = yod_area.updateMask(vegImg.eq(1100));
// chart areas nrw over time
var nrwCol = ee.FeatureCollection([ee.Feature(roi, {label: 'NRW'})]);
var areaHistNrw = ui.Chart.image.regions({image:yod_area, reducer:ee.Reducer.sum(), regions: nrwCol, scale: 30, seriesProperty :'label'})
  .setChartType('ColumnChart');
  areaHistNrw.setOptions({
    title: 'Waldschadensflächen pro Jahr',
    vAxis: {title: 'ha'},
    hAxis: {title: 'Jahr'},
    width: '100%',
    height: 150,
    legend: {position: 'none'},
    bar: {groupWidth: "40%"},
    series: {
      0: {color: '808080'}}
  });
  areaHistNrw.style().set({stretch: 'horizontal'});
//chart areas nrw relative by region   
var foaCol = ee.FeatureCollection([
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Ruhrgebiet')).first().geometry(), {label: 'Ruhrgebiet'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Siegen-Wittgenstein')).first().geometry(), {label: 'Siegen-Wittgenstein'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Kurkölnisches Sauerland')).first().geometry(), {label: 'Kurkölnisches Sauerland'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Bergisches Land')).first().geometry(), {label: 'Bergisches Land'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Märkisches Sauerland')).first().geometry(), {label: 'Märkisches Sauerland'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Arnsberger Wald')).first().geometry(), {label: 'Arnsberger Wald'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Oberes Sauerland')).first().geometry(), {label: 'Oberes Sauerland'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Soest-Sauerland')).first().geometry(), {label: 'Soest-Sauerland'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Münsterland')).first().geometry(), {label: 'Münsterland'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Niederrhein')).first().geometry(), {label: 'Niederrhein'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Rhein-Sieg-Erft')).first().geometry(), {label: 'Rhein-Sieg-Erft'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Rureifel-Jülicher Börde')).first().geometry(), {label: 'Rureifel-Jülicher Börde'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Hocheifel-Zülpicher Börde')).first().geometry(), {label: 'Hocheifel-Zülpicher Börde'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Nationalpark Eifel')).first().geometry(), {label: 'Nationalpark Eifel'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Ostwestfalen-Lippe')).first().geometry(), {label: 'Ostwestfalen-Lippe'}),
  ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', 'Hochstift')).first().geometry(), {label: 'Hochstift'})]);
var areaHistFoa = ui.Chart.image.regions({image:yod_area, reducer:ee.Reducer.sum(), regions: foaCol, scale: 30, seriesProperty :'label'})
  .setChartType('ColumnChart');
  areaHistFoa.setOptions({
    title: 'Waldschadensflächen anteilig',
    hAxis: {title: 'Jahr'},
    width: '100%',
    height: 150,
    legend: {position: 'none'},
    bar: {groupWidth: "40%"},
    isStacked: 'percent',
    //series: {
    //  0: {color: '000000'}}
  });
  areaHistFoa.style().set({stretch: 'horizontal'});
var chartNrwTitle = ui.Label('auf Landesebene', titleStyle3);
var chartNrwFootnote =  ui.Label('aus Landsat-Zeitreihen abgeleitete Waldflächen mit signifikanter Vitalitätsabnahme in den Jahren 2009-2019 ', LEGEND_FOOTNOTE_STYLE);
var chartNRWPanel = ui.Panel({  
  widgets: [chartNrwTitle, areaHistNrw, areaHistFoa, chartNrwFootnote],
  style: {
    position: 'bottom-center',
    padding: '0 0 0 0',
    stretch: 'horizontal'
  },
  layout: ui.Panel.Layout.Flow('vertical')
});
var chartTitle = ui.Label('Statistiken', titleStyle2);
toolPanel.add(chartTitle);
toolPanel.widgets().set(11, chartNRWPanel);
//// actions
// what happens for region select
function redraw(key){
  // get the selected region
  var selectedRegion = ee.Feature(forstamt.filter(ee.Filter.eq('Foa_Name', key)).first());
  //center map at region
  leftMap.centerObject(selectedRegion);
  // store the name of the selected region
  var selectedRegion_Strg = ee.String(selectedRegion.get('Foa_Name'));
  // store the geometry of the selected region
  var selectedRegionGeom= selectedRegion.geometry();
  // convert to featureCollection for styling
    var selectedRegionNamed =  ee.FeatureCollection([
    ee.Feature(selectedRegionGeom, {label: selectedRegion_Strg})]);
/////////////////////////// area ////////////////////////////////////////////////////////////////
// function to reduce change pixels by region of interest and group by year of change
var lossByYearFunc = function(img) {
  var losses = img.addBands(yod_masked).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: selectedRegionGeom,
      maxPixels: 1e13,
      scale: 90
        });
  var statsFormatted = ee.List(losses.get('groups'))
  .map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format(), d.get('sum')];
  });
  var statsDictionary = ee.Dictionary(statsFormatted.flatten());     
  return(statsDictionary);
      };
// apply function for each forest type combine arrays
var deciduousLost = lossByYearFunc(deciduousLostImg);
var coniferousLost = lossByYearFunc(coniferousLostImg);
var mixedLost = lossByYearFunc(mixedLostImg);
// create histogram for damaged areas in selected region per year and forest type
var xValues = deciduousLost.keys();
var yValues = ee.Array.cat([deciduousLost.toArray(), coniferousLost.toArray(), mixedLost.toArray()], 1);
var classNames = (['Laubholz', 'Nadelholz', 'Laub- und Nadelholz']);
var areaHist = ui.Chart.array.values({
  array: yValues.round(),
  axis: 0,
  xLabels: xValues
}).setChartType('ColumnChart')
  .setSeriesNames(classNames)
  .setOptions({
    title: 'Waldschadensflächen',
    vAxis: {title: 'ha'},
    hAxis: {title: 'Jahr'},
    width: '100%',
    height: 150,
    legend: {position: 'bottom'},
//    isStacked: true,
    series: {
      0: {color: '81d732'},
      1: {color: '2c4d77'},
      2: {color: '2cb498'}}
  });
  areaHist.style().set({stretch: 'horizontal'});
/*
var count = yod.eq([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]).rename(['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017','2018','2019']);
var total = count.multiply(ee.Image.pixelArea()).divide(10000);
var selectedRegionNamed =  ee.FeatureCollection([
  ee.Feature(selectedRegion.geometry(), {label: selectedRegion_Strg})]);
// remap from string to integer
var old_values = ['1100', '1200', '1300'];
var new_values = [1100, 1200, 1300];
var remapped = wald_nrw.remap(old_values, new_values, 'VEG');
// reduce features to image 
var vegImg = remapped
  .filter(ee.Filter.notNull(['VEG']))
  .reduceToImage({
    properties: ['VEG'],
    reducer: ee.Reducer.first()
}).rename('veg');
// add vegetation type to change image
var totalClassified = total.addBands(vegImg, ['veg']);
// mask areas without change
var mask0 = total.neq(0);
var mask = mask0.reduce(ee.Reducer.max());
var totalMasked = totalClassified.updateMask(mask);
var totalClipped = totalMasked.clip(selectedRegionNamed);
//var classNames = ee.Dictionary(
 // {1100: 'Laubholz', 
 // 1200: 'Nadelholz', 
 // 1300: 'Laub- und Nadelholz'});
var classNames = (['Laubholz', 'Nadelholz', 'Laub- und Nadelholz']);
var labelNames = ([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]);
//var areaHist = ui.Chart.image.byClass({image:totalClipped, classBand:'veg', region: selectedRegionNamed, reducer:ee.Reducer.sum(), scale: 100, classLabels: classNames, xLabels: labelNames})
var areaHist = ui.Chart.image.byClass(totalClipped, 'veg', selectedRegionNamed, ee.Reducer.sum(), 90, classNames, labelNames)
.setChartType('ColumnChart');
  areaHist.setOptions({
    title: 'Waldschadensflächen',
    vAxis: {title: 'ha'},
    hAxis: {title: 'Jahr'},
    width: '100%',
    height: 150,
    series: {
      0: {color: '81d732'},
      1: {color: '2c4d77'},
      2: {color: '2cb498'}}
  });
  areaHist.style().set({stretch: 'horizontal'});
*/
/*
var areaHist = ui.Chart.image.regions({image:total,reducer:ee.Reducer.sum(), regions: selectedRegionNamed, scale: 30, seriesProperty :'label'})
  .setChartType('ColumnChart');
  areaHist.setOptions({
    title: 'Waldschadensflächen',
    vAxis: {title: 'ha'},
    hAxis: {title: 'Jahr'},
    width: '100%',
    height: 150,
    series: {
      0: {color: '865dff'},
      1: {color: '333333'}}
  });
  areaHist.style().set({stretch: 'horizontal'});
*/
/*
// test chart per forest type
var test = total.addBands(forest.rename('forestType'))
var test2 = test.updateMask(forest.eq(1).or(forest.eq(2)))
print(test)
var testChart = ui.Chart.image.byClass({image:test,classBand:'forestType', reducer:ee.Reducer.sum(), region:roi, scale: 1000})
print(testChart)
*/
/////////////////////////// climate ////////////////////////////////////////////////////////////////
// set start and end year
var startyear = ee.Number(1980); 
var endyear = ee.Number(2018); 
// make a list with years
var years = ee.List.sequence(startyear, endyear);
// set start and end month 
var startmonth = ee.Number(6); 
var endmonth = ee.Number(8); 
// create image collection from climate data set with images as annual sum 
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
// create image collection from climate data set with images as annual mean 
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
  regions: selectedRegionNamed,
  reducer: ee.Reducer.mean(),
  band: 'pr',
  scale: 2500,
  xProperty: 'year',
  seriesProperty: 'label'//'Niederschlag'
}).setOptions({
  title: 'Niederschlag',
  legend: {position: 'none'},
  hAxis: {title: 'Jahr'},
  vAxis: {title: 'Niederschlag (mm)',
    width: '100%',
    height: 150,},
})
  .setChartType('ColumnChart');
// function to calculate mean temperature from min and max and scale it to degrees
var calcMean = function(image) {
  //mean Temp
  var mean = (image.select('tmmn').add(image.select('tmmx')).divide(2)).rename('Temperatur');
  //scale to °C
  var temp = mean.divide(10); 
  return image.addBands(temp);
};
var tempMean = annualMean.map(calcMean);
// temperature chart
var tempChart = ui.Chart.image.seriesByRegion({
  imageCollection: tempMean.select(['Temperatur']), 
  regions: selectedRegionNamed,
  reducer: ee.Reducer.mean(),
  scale: 2500,
  xProperty: 'year',
  seriesProperty: 'label'//'Temperatur'
}).setOptions({
  title: 'Temperatur',
  hAxis: {title: 'Jahr'},
  legend: {position: 'none'},
  vAxis: {title: 'Temperatur (°C)', 
          viewWindowMode:'explicit',
              viewWindow:{
                max:22,
                min:13
              }},
  colors: ['#e0440e'],
  width: '100%',
  height: 150,
})
  .setChartType('LineChart');
// drought chart
var pdsiChart = ui.Chart.image.seriesByRegion({
  imageCollection: annualMean, 
  regions: selectedRegionNamed,
  reducer: ee.Reducer.mean(),
  band: 'pdsi',
  scale: 2500,
  xProperty: 'year',
  seriesProperty: 'label' //'pdsi'
}).setOptions({
  title: 'Palmer Drought Severity Index',
  legend: {position: 'none'},
  hAxis: {title: 'Jahr'},
  vAxis: {title: 'PDSI'},
  colors: ['#ffc125'],
  width: '100%',
  height: 150,
})
  .setChartType('LineChart');
/////////////////////////// add charts ////////////////////////////////////////////////////////////////
// add charts to side panel
var chartFoaTitle = ui.Label('auf Forstamtsebene', titleStyle3);
var chartSubtitle1 = ui.Label('Flächendaten (2009-2019)', titleStyle4);
var chartFootnote1 =  ui.Label('aus Landsat-Zeitreihen abgeleitete Waldflächen mit signifikanter Vitalitätsabnahme in den Jahren 2009-2019 ', LEGEND_FOOTNOTE_STYLE);
var chartSubtitle2 = ui.Label('Klimadaten (1980-2018)', titleStyle4);
var chartFootnote21 =  ui.Label('mittlere Niederschlagssumme der Sommermonate (Juni-August)', LEGEND_FOOTNOTE_STYLE);
var chartFootnote22 =  ui.Label('mittlere Temperatur der Sommermonate (Juni-August)', LEGEND_FOOTNOTE_STYLE);
var chartFootnote23 =  ui.Label('mittlerer Trockenheitsindex der Sommermonate (Juni-August)', LEGEND_FOOTNOTE_STYLE);
var chartPanel = ui.Panel({  
  widgets: [chartFoaTitle,
            chartSubtitle1, areaHist, chartFootnote1,
            chartSubtitle2, prChart, chartFootnote21, tempChart, chartFootnote22, pdsiChart, chartFootnote23],
  style: {
    position: 'bottom-center',
    padding: '0 0 0 0',
    stretch: 'horizontal'
  },
  layout: ui.Panel.Layout.Flow('vertical')
});
//add layers to side panel and replace if selection changes
toolPanel.remove(licensePanel);
toolPanel.widgets().set(12, chartPanel);
toolPanel.add(licensePanel);
}
// data licenses
var license1 = ui.Label('Daten:', lightStyle1);
var license2 = ui.Label('Forstamtsgrenzen: Land NRW (2019), dl-de/by-2-0', lightStyle2);
var license3 = ui.Label('Basis-DLM: Land NRW (2019), dl-de/by-2-0', lightStyle2);
// credits
var credits = ui.Label('by Jens Wiesehahn (2019)    -   wiesehahn.jens@gmail.com', lightStyle1);
var licensePanel = ui.Panel({  
  widgets: [license1, 
            license2,
            license3,
            credits],
  layout: ui.Panel.Layout.Flow('vertical')
});
toolPanel.widgets().set(98, licensePanel);
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