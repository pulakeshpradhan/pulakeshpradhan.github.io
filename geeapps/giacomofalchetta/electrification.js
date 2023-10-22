var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG");
// Create an empty list of filter constraints.
var constraints = [];
var Countries = ee.FeatureCollection('users/giacomofalchetta/gadm36_1')
var nl20 =  imageCollection.filterDate('2020-01-01', '2021-01-01').select('avg_rad')
var replacement = ee.Image(0);
var conditional = function(image) {
  return image.where(image.lt(0.35), replacement);
};
var output = nl20.map(conditional);
var nl20 = ee.ImageCollection(output).median()
//var noacc = ee.Image('users/giacomofalchetta/pop_noaccess_2014_2020_landscan_1km')
var noacc = ee.Image('users/giacomofalchetta/pop_noaccess_2014_2020_ghs_1km_2').clip(Countries)
var noacc = noacc.mask(noacc.gte(25))
var pop14_noaccess = noacc.select('b1')
var pop15_noaccess = noacc.select('b1_1').rename('b1')
var pop16_noaccess = noacc.select('b1_2').rename('b1')
var pop17_noaccess = noacc.select('b1_3').rename('b1')
var pop18_noaccess = noacc.select('b1_4').rename('b1')
var pop19_noaccess = noacc.select('b1_5').rename('b1')
var pop20_noaccess = noacc.select('b1_6').rename('b1')
var pop14 = noacc.select('b1_7').rename('b1')
var pop15 = noacc.select('b1_8').rename('b1')
var pop16 = noacc.select('b1_9').rename('b1')
var pop17 = noacc.select('b1_10').rename('b1')
var pop18 = noacc.select('b1_11').rename('b1')
var pop19 = noacc.select('b1_12').rename('b1')
var pop20 = noacc.select('b1_13').rename('b1')
var GHSSMOD2015 = ee.ImageCollection("JRC/GHSL/P2016/SMOD_POP_GLOBE_V1").filterDate('2014-01-01', '2016-01-01').median()
var pop20_urban = pop15.mask(GHSSMOD2015.gte(2).and(pop20.gt(0)))
var pop20_rural = pop15.mask(GHSSMOD2015.lte(1).and(pop20.gt(0)))
// include also province and national level electrification layers
var Countries = ee.FeatureCollection('users/giacomofalchetta/gadm36_1')
var no_acc_14 = pop14_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_15 = pop15_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_16 = pop16_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_17 = pop17_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_18 = pop18_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_19 = pop19_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_20 = pop20_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['noacc']),
    collection: Countries,
    scale: 1000
})
var no_acc_14 = pop14.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: no_acc_14,
    scale: 1000
})
var no_acc_15 = pop15.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: no_acc_15,
    scale: 1000
})
var no_acc_16 = pop16.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: no_acc_16,
    scale: 1000
})
var no_acc_17 = pop17.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: no_acc_17,
    scale: 1000
})
var no_acc_18 = pop18.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: no_acc_18,
    scale: 1000
})
var no_acc_19 = pop19_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: Countries,
    scale: 1000
})
var no_acc_20 = pop20_noaccess.reduceRegions({
    reducer: ee.Reducer.sum().setOutputs(['pop']),
    collection: Countries,
    scale: 1000
})
function computeelrate(feature) {
  var uno = ee.Number(1)
  var na = ee.Number(feature.get('noacc'));
  var pop = ee.Number(feature.get('pop'));
  return feature.set({ elrate: uno.subtract(na.divide(pop)) });
}
// generate a new property for all features
var elrate20 = no_acc_20.map(computeelrate);
var elrate19 = no_acc_19.map(computeelrate);
var elrate18 = no_acc_18.map(computeelrate);
var elrate17 = no_acc_17.map(computeelrate);
var elrate16 = no_acc_16.map(computeelrate);
var elrate15 = no_acc_15.map(computeelrate);
var elrate14 = no_acc_14.map(computeelrate);
var elrate20 = elrate20.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first(),
});
var elrate19 = elrate19.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first(),
});
var elrate18 = elrate18.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first(),
});
var elrate17 = elrate17.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first()
});
var elrate16 = elrate16.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first()
});
var elrate15 = elrate15.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first()
});
var elrate14 = elrate14.reduceToImage({
    properties: ['elrate'],
    reducer: ee.Reducer.first()
});
var image02 = elrate14.gte(0);
var image04 = elrate14.gte(0.25);
var image06 = elrate14.gte(0.5);
var image08 = elrate14.gte(0.75);
var elrate14 = image02.add(image04).add(image06).add(image08)
var elrate14 = elrate14.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
var image02 = elrate15.gte(0);
var image04 = elrate15.gte(0.25);
var image06 = elrate15.gte(0.5);
var image08 = elrate15.gte(0.75);
var elrate15 = image02.add(image04).add(image06).add(image08)
var elrate15 = elrate15.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
var image02 = elrate16.gte(0);
var image04 = elrate16.gte(0.25);
var image06 = elrate16.gte(0.5);
var image08 = elrate16.gte(0.75);
var elrate16 = image02.add(image04).add(image06).add(image08)
var elrate16 = elrate16.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
var image02 = elrate17.gte(0);
var image04 = elrate17.gte(0.25);
var image06 = elrate17.gte(0.5);
var image08 = elrate17.gte(0.75);
var elrate17 = image02.add(image04).add(image06).add(image08)
var elrate17 = elrate17.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
var image02 = elrate18.gte(0);
var image04 = elrate18.gte(0.25);
var image06 = elrate18.gte(0.5);
var image08 = elrate18.gte(0.75);
var elrate18 = image02.add(image04).add(image06).add(image08)
var elrate18 = elrate18.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
var image02 = elrate19.gte(0);
var image04 = elrate19.gte(0.25);
var image06 = elrate19.gte(0.5);
var image08 = elrate19.gte(0.75);
var elrate19 = image02.add(image04).add(image06).add(image08)
var elrate19 = elrate19.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
var image02 = elrate20.gte(0);
var image04 = elrate20.gte(0.25);
var image06 = elrate20.gte(0.5);
var image08 = elrate20.gte(0.75);
var elrate20 = image02.add(image04).add(image06).add(image08)
var elrate20 = elrate20.visualize(({bands: ['first'], min:1, max: 4, palette: ['05668D', '00A896', '02C39A', 'F0F3BD'], opacity: 0.8}));
////////
var replacement = ee.Image(4);
var pop14_noaccess = pop14_noaccess.where(pop14_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop14_noaccess = pop14_noaccess.where(pop14_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop14_noaccess = pop14_noaccess.where(pop14_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop14_noaccess = pop14_noaccess.where(pop14_noaccess.gt(25), replacement)
var popVis14 = pop14_noaccess.visualize(({min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
var replacement = ee.Image(4);
var pop15_noaccess = pop15_noaccess.where(pop15_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop15_noaccess = pop15_noaccess.where(pop15_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop15_noaccess = pop15_noaccess.where(pop15_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop15_noaccess = pop15_noaccess.where(pop15_noaccess.gt(25), replacement)
var popVis15 = pop15_noaccess.visualize(({bands: ['b1'], min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
var replacement = ee.Image(4);
var pop16_noaccess = pop16_noaccess.where(pop16_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop16_noaccess = pop16_noaccess.where(pop16_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop16_noaccess = pop16_noaccess.where(pop16_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop16_noaccess = pop16_noaccess.where(pop16_noaccess.gt(25), replacement)
var popVis16 = pop16_noaccess.visualize(({bands: ['b1'], min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
var replacement = ee.Image(4);
var pop17_noaccess = pop17_noaccess.where(pop17_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop17_noaccess = pop17_noaccess.where(pop17_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop17_noaccess = pop17_noaccess.where(pop17_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop17_noaccess = pop17_noaccess.where(pop17_noaccess.gt(25), replacement)
var popVis17 = pop17_noaccess.visualize(({bands: ['b1'], min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
var replacement = ee.Image(4);
var pop18_noaccess = pop18_noaccess.where(pop18_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop18_noaccess = pop18_noaccess.where(pop18_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop18_noaccess = pop18_noaccess.where(pop18_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop18_noaccess = pop18_noaccess.where(pop18_noaccess.gt(25), replacement)
var popVis18 = pop18_noaccess.visualize(({bands: ['b1'], min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
var replacement = ee.Image(4);
var pop19_noaccess = pop19_noaccess.where(pop19_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop19_noaccess = pop19_noaccess.where(pop19_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop19_noaccess = pop19_noaccess.where(pop19_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop19_noaccess = pop19_noaccess.where(pop19_noaccess.gt(25), replacement)
var popVis19 = pop19_noaccess.visualize(({bands: ['b1'], min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
var replacement = ee.Image(4);
var pop20_noaccess = pop20_noaccess.where(pop20_noaccess.gt(250), replacement)
var replacement = ee.Image(3);
var pop20_noaccess = pop20_noaccess.where(pop20_noaccess.gt(100), replacement)
var replacement = ee.Image(2);
var pop20_noaccess = pop20_noaccess.where(pop20_noaccess.gt(50), replacement)
var replacement = ee.Image(1)
var pop20_noaccess = pop20_noaccess.where(pop20_noaccess.gt(25), replacement)
var popVis20 = pop20_noaccess.visualize(({bands: ['b1'], min:1, max: 4, palette: ['FFCDB2', 'E5989B', 'B5838D', '6D6875'], opacity: 0.8}));
//Input values defined in R as quartiles 
var lightcapita20 = nl20
var lightcapita20 = lightcapita20.mask(pop20_rural.gt(0).and(lightcapita20.gt(0)))
var pop20_tier_1 = pop20.mask(pop20.gt(0).and(lightcapita20.gt(0)).and(lightcapita20.lt(0.38)))
var pop20_tier_2 = pop20.mask(pop20.gt(0).and(lightcapita20.gte(0.38)).and(lightcapita20.lt(0.45)))
var pop20_tier_3 = pop20.mask(pop20.gt(0).and(lightcapita20.gte(0.45)).and(lightcapita20.lt(0.68)))
var pop20_tier_4 = pop20.mask(pop20.gt(0).and(lightcapita20.gte(0.68)))
var replacement = ee.Image(1);
var pop20_tier_1 =pop20_tier_2.where(pop20_tier_1.gt(1), replacement);
var replacement = ee.Image(2);
var pop20_tier_2 =pop20_tier_2.where(pop20_tier_2.gt(1), replacement);
var replacement = ee.Image(3);
var pop20_tier_3 =pop20_tier_3.where(pop20_tier_3.gt(1), replacement);
var replacement = ee.Image(4);
var pop20_tier_4 =pop20_tier_4.where(pop20_tier_4.gt(1), replacement);
var tiers_joint_rural = ee.ImageCollection([pop20_tier_1, pop20_tier_2, pop20_tier_3, pop20_tier_4]).mosaic()
var lightcapita20 = nl20
var lightcapita20 = lightcapita20.mask(pop20_urban.gt(0).and(lightcapita20.gt(0)))
var pop20_tier_1 = pop20.mask(pop20.gt(0).and(lightcapita20.gt(0)).and(lightcapita20.lt(0.40)))
var pop20_tier_2 = pop20.mask(pop20.gt(0).and(lightcapita20.gte(0.40)).and(lightcapita20.lt(0.48)))
var pop20_tier_3 = pop20.mask(pop20.gt(0).and(lightcapita20.gte(0.48)).and(lightcapita20.lt(0.88)))
var pop20_tier_4 = pop20.mask(pop20.gt(0).and(lightcapita20.gte(0.88)))
var replacement = ee.Image(1);
var pop20_tier_1 =pop20_tier_2.where(pop20_tier_1.gt(1), replacement);
var replacement = ee.Image(2);
var pop20_tier_2 =pop20_tier_2.where(pop20_tier_2.gt(1), replacement);
var replacement = ee.Image(3);
var pop20_tier_3 =pop20_tier_3.where(pop20_tier_3.gt(1), replacement);
var replacement = ee.Image(4);
var pop20_tier_4 =pop20_tier_4.where(pop20_tier_4.gt(1), replacement);
var tiers_joint_urban = ee.ImageCollection([pop20_tier_1, pop20_tier_2, pop20_tier_3, pop20_tier_4]).mosaic()
var tiers = ee.ImageCollection([tiers_joint_rural, tiers_joint_urban]).mosaic()
var tiersVis = tiers.visualize({min: 1, max: 4, palette: ['29088A', '088A29', 'FFFF00', 'FF8000'], opacity: 0.65});
///
var images_pop = {
  '2020': popVis20,
  '2019': popVis19,
  '2018': popVis18,
  '2017': popVis17,
  '2016': popVis16,
  '2015': popVis15,
  '2014': popVis14,
};
var images = images_pop;
var images_tier = {
  '2020': tiersVis,
  '2019': tiersVis,
  '2018': tiersVis,
  '2017': tiersVis,
  '2016': tiersVis,
  '2015': tiersVis,
  '2014': tiersVis,
};
var images_elrates = {
  '2020': elrate20,
  '2019': elrate19,
  '2018': elrate18,
  '2017': elrate17,
  '2016': elrate16,
  '2015': elrate15,
  '2014': elrate14,
};
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(images, leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(images, rightMap, 1, 'top-right');
var mapUpdate = function(){
  var value = select_layer.getValue()
  if (value == POPULATION)
    var images = images_pop
  else 
    if (value == TIERS)
      var images = images_tier
      else if (value == ELRATES)
     // print(value)
      var images = images_elrates
   var rightSelector = addLayerSelector(images, rightMap, 1, 'top-right');
   var leftSelector = addLayerSelector(images, leftMap, 0, 'top-left');
}
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(images, mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a year to visualise');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
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
leftMap.setCenter(27, 3, 5);
var panel = ui.Panel({style: {width: '250px'}});
var map = ui.Map();
ui.root.add(panel)//.add(map);
//map.setCenter(27, 3, 5);
// Define some constants.
var POPULATION = 'Population without access';
var TIERS = 'Tier';
var GREATER_THAN = 'Greater than';
var LESS_THAN = 'Less than';
var quattordici = '2014'
var quindici = '2015'
var sedici = '2016'
var diciassette = '2017'
var diciotto = '2018'
var diciannove = '2019'
var venti = '2020'
var ELRATES = 'Electrification rates'
// Create an empty list of filter constraints.
var constraints = [];
// Create a layer selector that dictates which layer is visible on the map.
var select_layer = ui.Select({
  items: [POPULATION, ELRATES, TIERS],
  value: POPULATION,
  onChange: mapUpdate//,
  //items: Object.keys(images)
});
// Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
panel.add(ui.Label('Select variable:')).add(select_layer);
var legendtiers = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitletiers = ui.Label({
  value: 'Consumption tier',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendtiers.add(legendTitletiers);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palettetiers =['29088A', '088A29', 'FFFF00', 'FF8000'];
// name of the legend
var namestiers = ['<0.2 KWh/hh/day','<1 KWh/hh/day','<3.4 KWh/hh/day', '>3.4 KWh/hh/day'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legendtiers.add(makeRow(palettetiers[i], namestiers[i]));
  }  
 var legendpop = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '14px 15px'
  }
});
// Create legend title
var legendTitlepop = ui.Label({
  value: 'Pop. without access',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendpop.add(legendTitlepop);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palettepop =['FFCDB2', 'E5989B', 'B5838D', '6D6875'];
// name of the legend
var namespop = ['>25', '>50', '>100', '>250'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legendpop.add(makeRow(palettepop[i], namespop[i]));
  } 
 var legendelrates = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '14px 15px'
  }
});
// Create legend title
var legendTitleelrates = ui.Label({
  value: 'Electr. rate',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legendelrates.add(legendTitleelrates);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var paletteelrates =['05668D', '00A896', '02C39A', 'F0F3BD'];
// name of the legend
var nameselrates = ['<25%', '>25%', '>50%', '>75%'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legendelrates.add(makeRow(paletteelrates[i], nameselrates[i]));
  } 
panel.add(legendpop)
panel.add(legendelrates)
panel.add(legendtiers)
var prova = ui.Label('NB: tiers are only available for 2020.')
var prova2 = ui.Label({value: 'Source code and underlying data:', targetUrl:'https://github.com/giacfalk/Electrification_SSA_data'})
panel.add(prova)
panel.add(prova2)