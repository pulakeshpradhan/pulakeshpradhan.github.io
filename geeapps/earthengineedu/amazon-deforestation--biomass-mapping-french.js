var Amazon_Basin = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/Amazon_Basin_Outline');
var indigenous_lands = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/Indigenous_Land_Rights_Brazil');
indigenous_lands = indigenous_lands.filterBounds(Amazon_Basin);
// *********************************************************************************************************************
// EVI ANOMALY
// *********************************************************************************************************************
// Load MODIS EVI imagery.
var collection = ee.ImageCollection('MODIS/006/MYD13A1').select('EVI');
// Define reference conditions from the first 10 years of data.
var reference = collection.filterDate('2001-01-01', '2010-12-31')
  // Sort chronologically in descending order.
  .sort('system:time_start', false);
// Compute the mean of the first 10 years.
var mean = reference.mean();
// Compute anomalies by subtracting the 2001-2010 mean from each image in a
// collection of 2011-2014 images. Copy the date metadata over to the
// computed anomaly images in the new collection.
var series = collection.filterDate('2011-01-01', '2014-12-31').map(function(image) {
    return image.subtract(mean).set('system:time_start', image.get('system:time_start'));
});
// Display cumulative anomalies.
Map.addLayer(series.sum().clipToCollection(indigenous_lands),
    {min: -60000, max: 60000, palette: ['FF0000', '000000', '00FF00']}, 'Couche de NDVI/EVI');
// Get the timestamp from the most recent image in the reference collection.
var time0 = reference.first().get('system:time_start');
// Use imageCollection.iterate() to make a collection of cumulative anomaly over time.
// The initial value for iterate() is a list of anomaly images already processed.
// The first anomaly image in the list is just 0, with the time0 timestamp.
var first = ee.List([
  // Rename the first band 'EVI'.
  ee.Image(0).set('system:time_start', time0).select([0], ['EVI'])
]);
// This is a function to pass to Iterate().
// As anomaly images are computed, add them to the list.
var accumulate = function(image, list) {
  // Get the latest cumulative anomaly image from the end of the list with
  // get(-1).  Since the type of the list argument to the function is unknown,
  // it needs to be cast to a List.  Since the return type of get() is unknown,
  // cast it to Image.
  var previous = ee.Image(ee.List(list).get(-1));
  // Add the current anomaly to make a new cumulative anomaly image.
  var added = image.add(previous)
    // Propagate metadata to the new image.
    .set('system:time_start', image.get('system:time_start'));
  // Return the list with the cumulative anomaly inserted.
  return ee.List(list).add(added);
};
// Create an ImageCollection of cumulative anomaly images by iterating.
// Since the return type of iterate is unknown, it needs to be cast to a List.
var cumulative = ee.ImageCollection(ee.List(series.iterate(accumulate, first)))
// *********************************************************************************************************************
// Hansen global forest change
// *********************************************************************************************************************
var hansen = ee.Image('UMD/hansen/global_forest_change_2018_v1_6');
var loss1 = hansen.select('lossyear').eq(1);
var loss2 = hansen.select('lossyear').eq(2);
var loss3 = hansen.select('lossyear').eq(3);
var loss4 = hansen.select('lossyear').eq(4);
var loss5 = hansen.select('lossyear').eq(5);
var loss2000_2005 = ee.ImageCollection([loss1, loss2, loss3, loss4, loss5]).mosaic().eq(1)
  .selfMask().clip(indigenous_lands); // Actually 2001-2005
var loss6 = hansen.select('lossyear').eq(6);
var loss7 = hansen.select('lossyear').eq(7);
var loss8 = hansen.select('lossyear').eq(8);
var loss9 = hansen.select('lossyear').eq(9);
var loss10 = hansen.select('lossyear').eq(10);
var loss2005_2010 = ee.ImageCollection([loss6, loss7, loss8, loss9, loss10]).mosaic().eq(1)
  .selfMask().clip(indigenous_lands); // Actually 2006-2010
var loss11 = hansen.select('lossyear').eq(11);
var loss12 = hansen.select('lossyear').eq(12);
var loss13 = hansen.select('lossyear').eq(13);
var loss14 = hansen.select('lossyear').eq(14);
var loss15 = hansen.select('lossyear').eq(15);
var loss2010_2015 = ee.ImageCollection([loss11, loss12, loss13, loss14, loss15]).mosaic().eq(1)
  .selfMask().clip(indigenous_lands); // Actually 2011-2015
var loss16 = hansen.select('lossyear').eq(16);
var loss17 = hansen.select('lossyear').eq(17);
var loss18 = hansen.select('lossyear').eq(18);
var loss2015_2018 = ee.ImageCollection([loss16, loss17, loss18]).mosaic().eq(1)
  .selfMask().clip(indigenous_lands); // Actually 2016-2018
var allLosses = hansen.select('loss').eq(1).selfMask().clipToCollection(indigenous_lands);
Map.addLayer(allLosses, {palette: ['FF0000']}, "Couche de Perte de la Forêt de Hansen");
// *********************************************************************************************************************
// Carbon stock
// *********************************************************************************************************************
var carbon = ee.Image('WHRC/biomass/tropical');
var carbonStats = carbon.select(0).clip(indigenous_lands);
var carbonVisParams = {min: 0, max: 305, palette:
    ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400',
    '3E8601', '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']};
Map.addLayer(carbonStats, carbonVisParams, 'Carte de MODIS Biomasse');
// *********************************************************************************************************************
// Land cover
// *********************************************************************************************************************
var landCoverCollection = ee.ImageCollection('MODIS/006/MCD12Q1');
var landCover01_05 = landCoverCollection.select(0).filterDate('2001-01-01', '2005-12-31').mosaic().clip(indigenous_lands);
var landCover06_10 = landCoverCollection.select(0).filterDate('2006-01-01', '2010-12-31').mosaic().clip(indigenous_lands);
var landCover11_15 = landCoverCollection.select(0).filterDate('2011-01-01', '2015-12-31').mosaic().clip(indigenous_lands);
var landCover16_17 = landCoverCollection.select(0).filterDate('2016-01-01', '2017-12-31').mosaic().clip(indigenous_lands);
var landCoverPalette = ['086a10', 'b6ff05', 'fbff13', 'c24f44', 'ff6d4c'];
var landCoverVisParams = {min: 1, max: 17, palette: landCoverPalette};
Map.addLayer(landCover01_05, landCoverVisParams, 'Classification de la Couverture Terrestre 2001-2005');
Map.addLayer(landCover06_10, landCoverVisParams, 'Classification de la Couverture Terrestre 2006-2010');
Map.addLayer(landCover11_15, landCoverVisParams, 'Classification de la Couverture Terrestre 2011-2015');
Map.addLayer(landCover16_17, landCoverVisParams, 'Classification de la Couverture Terrestre 2016-2017');
// *********************************************************************************************************************
// Start of UI script
// *********************************************************************************************************************
// Legend maker
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 6px',
      fontSize: '12px'
    }
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.flow('horizontal')
  });
};
// Debug tools
var debug = true; // True if debugging, used for dev purposes
// Style defaults
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: 'bold',
    fontSize: '32px',
    padding: '8px',
    color: '#616161',
};
var SUBTITLE_STYLE = {
  fontSize: '18px',
  fontWeight: '50',
  padding: '8px',
  color: '#606060',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  backgroundColor: colors.transparent,
};
var BOX_TITLE_STYLE = {
  fontSize: '18px',
  fontWeight: '50',
  // padding: '8px',
  color: '#606060',
  backgroundColor: colors.transparent,
  border: '1px solid gray',
};
var BOX_PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  // padding: '8px',
  backgroundColor: colors.transparent,
  border: '1px solid gray',
};
var THUMBNAIL_WIDTH = '550px';
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
// Index of every layer
var eviIndex = 0;
var hansenIndex = 1;
var carbonIndex = 2;
var landCover01_05Index = 3;
var landCover06_10Index = 4;
var landCover11_15Index = 5;
var landCover16_17Index = 6;
var selectedIndex = 7;
// Booleans indicating if each collapsible section is displayed
// Collapsible sections don't work, leave all as true
var deforestationBool = true;
var carbonBool = true;
var landCoverBool = true; // Leave all as true
// Create a panel to hold our widgets.
var panel = ui.Panel({style: {width: '450px', border: BORDER_STYLE}});
// Create and add title panel.
var title = ui.Panel([
  ui.Label({
    value: 'Déforestation en Amazonie et Cartographie de la Biomasse',
    style: TITLE_STYLE,
  })
]);
panel.add(title);
// Create and add Forest Loss panel
var forestLoss = ui.Panel([
  ui.Label({
    value:  "La déforestation en Amazonie brésilienne a d'importantes répercussions sur les émissions de carbone et la préservation des terres autochtones. "+
            'Utilisez cet outil pour déterminer les emplacements et les facteurs de la perte de forêts dans toute la région, et examinez comment les perturbations forestières à grande échelle ont des impacts environnementaux à grande échelle.',
    style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  }
  })
]);
panel.add(forestLoss);
// Create panels to hold lon/lat values.
var lon = ui.Label({style: LABEL_STYLE});
var lat = ui.Label({style: LABEL_STYLE});
var id = ui.Label({style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#3b7042',
    padding: '0px 0px 0px 8px'}});
var aaa = ui.Label({style: LABEL_STYLE});
var lon_lat = ui.Panel([id], ui.Panel.Layout.flow('horizontal'));
panel.add(lon_lat);
// Red blurb
var redBlurb = ui.Label({
  value: 'Cliquez sur un polygone pour tracer les tendances de la déforestation dans le temps.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '3b7042',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  },
});
// redBlurb.style().set('color', 'red');
panel.add(redBlurb);
// Forest Greenness Analysis
var eviCheckbox = ui.Checkbox('Couche de NDVI/EVI', true);
eviCheckbox.onChange(function(checked) {
  Map.layers().get(eviIndex).setShown(checked);
});
eviCheckbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'
});
// EVI legend
var eviLegend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var eviLegendTitle = ui.Label({
  value: 'La Légende du Changement de Verdure Forestière',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
  }
});
var eviPalette= ['FF0000', '000000', '00FF00'];
var eviClassifications = ['Perte de Forêt', 'Pas de Changement', 'Gain Forestier'];
for (var i = 0; i < 3; i++) {
  eviLegend.add(makeRow(eviPalette[i], eviClassifications[i]));
}
var fgaPanel = ui.Panel([
  ui.Label({
    value: 'Analyse de la Verdure Forestière',
    style: {fontSize: '16px',
    fontWeight: 'bold',
    color: '#616161',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  },
  }),
  ui.Label({
    value:  "Les changements du couvert forestier ou de la verdure peuvent être mesurés au moyen de l'indice de végétation par différence normalisée (NDVI), qui utilise des images satellites pour calculer la réflexion et l'absorption de la lumière solaire sur les feuilles. Explorez cette couche cartographique pour déterminer les régions de croissance ou de perte de l'indice NDVI de 2000 à 2016.",
    style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
  },
  }),
  eviCheckbox,
  eviLegend
]);
// Deforestation
var deforestationButton = ui.Button({
  label: 'Analyse de la Déforestation',
  style: {padding: '0px 0px 0px 8px' },
});
deforestationButton.onClick(function() {
  deforestationBool = !deforestationBool;
  // Add entire Map.onClick() function once that is complete
});
var hansenCheckbox = ui.Checkbox("Couche de Perte de la Forêt de Hansen", true);
hansenCheckbox.onChange(function(checked) {
  Map.layers().get(hansenIndex).setShown(checked);
});
hansenCheckbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'
});
var deforestationPanel = ui.Panel([
  ui.Label({
    value: 'La Déforestation au Fil du Temps',
    style: {fontSize: '16px',
    fontWeight: 'bold',
    color: '#616161',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  },
  }),
  ui.Label({
    value: "L'ensemble de données Hansen Global Forest Change v1.6 fournit une distribution annuelle de l'ampleur des changements forestiers à l'échelle mondiale. Cliquez sur un polygone pour représenter graphiquement la superficie totale de la perte de forêt chaque année de 2001 à 2018.",
    style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
  },
  }),
  hansenCheckbox,
]);
// Carbon
// Set position of panel
var carbonLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Légende de la Biomasse',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
//  Palette with the colors
var palette =['df923d','fcd163', '3e8601', '023b01'];
// Name of each legend value
var names = ['0 Mg', '90 Mg', '200 Mg', '350 Mg'];
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  carbonLegend.add(makeRow(palette[i], names[i]));
}
var carbonButton = ui.Button({
  label: 'Analyse de la Biomasse',
  style: {padding: '0px 0px 0px 8px' },
});
carbonButton.onClick(function() {
  carbonBool = !carbonBool;
  // Add entire Map.onClick() function once that is complete
});
var carbonCheckbox = ui.Checkbox('Carte de MODIS Biomasse', true);
carbonCheckbox.onChange(function(checked) {
  Map.layers().get(carbonIndex).setShown(checked);
});
carbonCheckbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'
});
var carbonPanel = ui.Panel([
  ui.Label({
    value: 'Implications de la Déforestation sur la Biomasse',
    style: {fontSize: '16px',
    fontWeight: 'bold',
    color: '#616161',
    padding: '0px 0px 0px 8px'}
  }),
  ui.Label({
    value:  'La déforestation entraîne des émissions drastiques de carbone dues à la libération de stocks importants de carbone détenus dans les forêts tropicales. '+
            "La biomasse représente le poids total de la matière ligneuse d'un arbre, tandis que le carbone ne représente qu'une partie de cette matière - habituellement environ 50 % du poids total de l'arbre. "+
            "Utilisez la carte de la biomasse MODIS pour tracer la biomasse totale perdue par la déforestation à chaque époque de l'histoire.",
    style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'},
  }}),
  carbonCheckbox,
    carbonLegend
]);
// Land Cover
var landCoverButton = ui.Button({
  label: "Analyse de l'Évolution de la Couverture Terrestre",
  style: {padding: '0px 0px 0px 8px' },
 });
landCoverButton.onClick(function() {
  landCoverBool = !landCoverBool;
  // Add entire Map.onClick() function once that is complete
});
var landCover01_05Checkbox = ui.Checkbox('Classification de la Couverture Terrestre 2001-2005', true);
landCover01_05Checkbox.onChange(function(checked) {
  Map.layers().get(landCover01_05Index).setShown(checked);
});
landCover01_05Checkbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
});
var landCover06_10Checkbox = ui.Checkbox('Classification de la Couverture Terrestre 2006-2010', true);
landCover06_10Checkbox.onChange(function(checked) {
  Map.layers().get(landCover06_10Index).setShown(checked);
});
landCover06_10Checkbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
});
var landCover11_15Checkbox = ui.Checkbox('Classification de la Couverture Terrestre 2011-2015', true);
landCover11_15Checkbox.onChange(function(checked) {
  Map.layers().get(landCover11_15Index).setShown(checked);
});
landCover11_15Checkbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
});
var landCover16_17Checkbox = ui.Checkbox('Classification de la Couverture Terrestre 2016-2017', true);
landCover16_17Checkbox.onChange(function(checked) {
  Map.layers().get(landCover16_17Index).setShown(checked);
});
landCover16_17Checkbox.style().set({fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
});
// Land cover legend
var landCoverLegend = ui.Panel({
  style: {
    padding: '8px 15px'
  }
});
var landCoverLegendTitle = ui.Label({
  value: 'Land Cover Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
  }
});
// landCoverLegend
var landCoverClassifications = ['Forêt à Feuilles Larges à Feuilles Persistantes', 'Pâturages', 'Savanes', 'Terres Cultivées', 'Mosaïques de Végétation Naturelle'];
for (var i = 0; i < landCoverPalette.length; i++) {
  landCoverLegend.add(makeRow(landCoverPalette[i], landCoverClassifications[i]));
}
var landCoverPanel = ui.Panel([
  ui.Label({
    value: 'Impacts de la Modification de la Couverture terrestre',
    style: {fontSize: '16px',
    fontWeight: 'bold',
    color: '#616161',
    padding: '0px 0px 0px 8px'}
  }),
  ui.Label({
    value: "La modification de la couverture terrestre dans la région amazonienne résulte en grande partie de l'action de l'homme, en particulier du développement agricole. "+
    "Utilisez l'ensemble de données MODIS sur l'évolution de la couverture terrestre pour cartographier la distribution spatiale de chaque type d'utilisation du sol au fil du temps. Mettre l'accent en particulier sur la croissance de l'agriculture et des prairies au détriment de la forêt.",
    style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '0px 0px 0px 8px',
    // backgroundColor: colors.transparent,
    // border: '4px solid rgba(97, 97, 97, 0.05)'},
    }
  }),
  landCover01_05Checkbox,
  landCover06_10Checkbox,
  landCover11_15Checkbox,
  landCover16_17Checkbox,
]);
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear everything (since charts are sticky) 
  panel.clear();
  // Add title and "Forest Loss" sections
  panel.add(title);
  panel.add(forestLoss);
  // get selected feature
  var selection = ee.Feature((indigenous_lands.filterBounds(ee.Geometry.Point([coords.lon, coords.lat])).first()));
  selection.get('Name').getInfo(function(i) {
    id.setValue('Nom du territoire autochtone : ' + i);
  });
  // add it as a layer
  var layer = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Zone Sélectionnée');
  Map.layers().set(selectedIndex, layer);
  // Add Landsat
  // panel.add(landsatPanel);
  // Add red blurb
  panel.add(redBlurb);
  // Update the lon/lat panel with values from the click event and add them
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  panel.add(lon_lat);
  // Add Forest Greenness Analysis
  panel.add(fgaPanel);
  // NDVI chart
  var ndviChart = ui.Chart.image.series(cumulative, selection, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'Anomalie EVI au Fil du Temps',
    vAxis: {title: 'EVI'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    colors: ['3b7042']
  });
  panel.add(ndviChart);
  // Add deforestation button
  // panel.add(deforestationButton);
  // Not doing because code doesn't run
  // Add deforestation section if button has been clicked
  if (deforestationBool) {
    panel.add(deforestationPanel);
    // Deforestation Chart
    var lossAreaImage = allLosses.multiply(ee.Image.pixelArea());
    var lossYear = hansen.select(['lossyear']).clip(selection);
    var lossByYear = lossAreaImage.clip(selection).addBands(lossYear).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
      }),
      scale: 30,
      maxPixels: 1e9
    });
    var statsFormatted = ee.List(lossByYear.get('groups'))
    .map(function(el) {
      var d = ee.Dictionary(el);
      return [ee.Number(d.get('group')).format("%02d"), d.get('sum')];
    });
    var statsDictionary = ee.Dictionary(statsFormatted.flatten());
    statsDictionary = statsDictionary.remove(['00']);
    var deforestationChart = ui.Chart.array.values({
      array: statsDictionary.values(),
      axis: 0,
      xLabels: statsDictionary.keys()
    }).setChartType('ColumnChart')
      .setOptions({
        title: 'Perte Annuelle de Forêt',
        hAxis: {title: 'Année', format: '####'},
        vAxis: {title: 'Superficie (mètres carrés)'},
        legend: { position: "none" },
        lineWidth: 1,
        pointSize: 3,
        colors: ['3b7042']
      });
    panel.add(deforestationChart);
  }
  // Add carbon button
  // panel.add(carbonButton);
  // Not doing because code doesn't run
  // Add carbon section if button has been clicked
  if (carbonBool) {
    panel.add(carbonPanel);
    var carbon00_05 = carbonStats.updateMask(loss2000_2005);
    var carbonSum00_05 = carbon00_05.reduceRegion({
      geometry: selection.geometry(),
      scale: 100,
      reducer: ee.Reducer.sum(),
      maxPixels: 1e13
    })
    print(carbonSum00_05)
    var carbon05_10 = carbonStats.updateMask(loss2005_2010);
    var carbonSum05_10 = carbon05_10.reduceRegion({
      geometry: selection.geometry(),
      scale: 100,
      reducer: ee.Reducer.sum(),
      maxPixels: 1e13
    });
    print(carbonSum05_10)
    var carbon10_15 = carbonStats.updateMask(loss2010_2015);
    var carbonSum10_15 = carbon10_15.reduceRegion({
      geometry: selection.geometry(),
      scale: 100,
      reducer: ee.Reducer.sum(),
      maxPixels: 1e13
    });
    print(carbonSum10_15)
    var carbon15_18 = carbonStats.updateMask(loss2015_2018);
    var carbonSum15_18 = carbon15_18.reduceRegion({
      geometry: selection.geometry(),
      scale: 100,
      reducer: ee.Reducer.sum(),
      maxPixels: 1e13
    });
        print(carbonSum15_18)
    var carbonArray = ee.List(
      [carbonSum00_05.get('Mg'), carbonSum05_10.get('Mg'), carbonSum10_15.get('Mg'), carbonSum15_18.get('Mg')]);
    var dates = ee.List([
      '2000-2005', '2005-2010', '2010-2015', '2015-2018']);
    var carbonChart = ui.Chart.array.values({
      array: carbonArray,
      axis: 0,
      xLabels: dates
    }).setChartType('ColumnChart')
      .setOptions({
        title: 'Biomasse Perdue avec le Temps',
        hAxis: {title: 'Année', format: '####'},
        vAxis: {title: 'Biomasse (Mg/Ha)'},
        legend: { position: "none" },
        lineWidth: 1,
        pointSize: 3,
        colors: ['3b7042']
      });
    panel.add(carbonChart);
  }
  // Add land cover change button
  // panel.add(landCoverButton);
  // Not doing because code doesn't run
  // Add land cover change section if button has been clicked
  if (landCoverBool) {
    panel.add(landCoverPanel);
    panel.add(landCoverLegend);
  }
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
// Map.addLayer(indigenous_lands, {}, 'features');
Map.setCenter(-62.22955609188136, -3.216236535632741, 6);
Map.setOptions('SATELLITE');