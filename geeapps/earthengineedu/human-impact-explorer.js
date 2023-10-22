var legendPanel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
})
var legendPanel2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
var legendPanel3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
var legendPanel4 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// *************************************************************************************
// ***********************************NIGHTLIGHTS***************************************
// *************************************************************************************
// Set position of panel
var nightlightsLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Nightlights Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
nightlightsLegend.add(legendTitle);
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
      })
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px', fontSize: '12px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['000000','60660c', 'c2bd21', 'FFFF00'];
// Name of each legend value
var names = ['Low', 'Moderate', 'High', 'Very High'];
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  nightlightsLegend.add(makeRow(palette[i], names[i]));
  }  
  // *************************************************************************************
// ***********************************NIGHTLIGHTS 2 ***************************************
// *************************************************************************************
// Set position of panel
var nightlightsLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Nightlights Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
nightlightsLegend2.add(legendTitle2);
// Creates and styles 1 row of the legend.
//  Palette with the colors
var palette2 =['000000','60660c', 'c2bd21', 'FFFF00'];
// Name of each legend value
var names2 = ['Low', 'Moderate', 'High', 'Very High'];
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  nightlightsLegend2.add(makeRow(palette2[i], names2[i]));
  }  
  // *************************************************************************************
// ***********************************NIGHTLIGHTS 3 ***************************************
// *************************************************************************************
// Set position of panel
var nightlightsLegend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle3 = ui.Label({
  value: 'Nightlights Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
nightlightsLegend3.add(legendTitle3);
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  nightlightsLegend3.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var nightlightsLegend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle4 = ui.Label({
  value: 'Nightlights Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
nightlightsLegend4.add(legendTitle4);
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  nightlightsLegend4.add(makeRow(palette2[i], names2[i]));
  }    
// *************************************************************************************
// ***********************************ROADS***************************************
// *************************************************************************************
// Roads
var roadsLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var roadsLegendTitle = ui.Label({
  value: 'Roads Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
roadsLegend.add(roadsLegendTitle);
// Roads
var roadsLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var roadsLegendTitle2 = ui.Label({
  value: 'Roads Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
roadsLegend2.add(roadsLegendTitle2);
// Roads
var roadsLegend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var roadsLegendTitle3 = ui.Label({
  value: 'Roads Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
roadsLegend3.add(roadsLegendTitle3);
// Roads
var roadsLegend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var roadsLegendTitle4 = ui.Label({
  value: 'Roads Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
roadsLegend4.add(roadsLegendTitle4);
// Agriculture
var agLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var agLegendTitle = ui.Label({
  value: 'Agricultural Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
agLegend.add(agLegendTitle);
// Agriculture
var agLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var agLegendTitle2 = ui.Label({
  value: 'Agricultural Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
agLegend2.add(agLegendTitle2);
// Agriculture
var agLegend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var agLegendTitle3 = ui.Label({
  value: 'Agricultural Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
agLegend3.add(agLegendTitle3);
// Agriculture
var agLegend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }
});
// Create legend title
var agLegendTitle4 = ui.Label({
  value: 'Agricultural Extent 2000',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 1px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
agLegend4.add(agLegendTitle4);
  // *************************************************************************************
// ***********************************BUILT UP ***************************************
// *************************************************************************************
// Set position of panel
var builtUpLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Impervious Surfaces Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
builtUpLegend.add(legendTitle);
//  Palette with the colors
var palette2 =['ccece6', '99d8c9', '66c2a4', '2ca25f', '006d2c'];
// Name of each legend value
var names2 = ['Not built up', 'Built-up up to 1975 epoch', 'Built-up from 1975 to 1990', 'Built-up from 1990 to 2000', 'Built-up from 2000 to 2014'];
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  builtUpLegend.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var builtUpLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Impervious Surfaces Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
builtUpLegend2.add(legendTitle2);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  builtUpLegend2.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var builtUpLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Impervious Surfaces Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
builtUpLegend2.add(legendTitle2);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  builtUpLegend2.add(makeRow(palette2[i], names2[i]));
  }    
  // Set position of panel
var builtUpLegend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle3 = ui.Label({
  value: 'Impervious Surfaces Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
builtUpLegend3.add(legendTitle3);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  builtUpLegend3.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var builtUpLegend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle4 = ui.Label({
  value: 'Impervious Surfaces Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
builtUpLegend4.add(legendTitle4);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  builtUpLegend4.add(makeRow(palette2[i], names2[i]));
  }    
// *************************************************************************************
// ***********************************POPULATION ***************************************
// *************************************************************************************
// Set position of panel
var populationLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Population Density Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
populationLegend.add(legendTitle);
//  Palette with the colors
var palette2 =["ffffcc","a1dab4","41b6c4","2c7fb8","253494"];
// Name of each legend value
var names2 = ['0 people/km²', '', '', '', '650 people/km²'];
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  populationLegend.add(makeRow(palette2[i], names2[i]));
  }    
// *************************************************************************************
// Set position of panel
var populationLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Population Density Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
populationLegend2.add(legendTitle2);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  populationLegend2.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var populationLegend3 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle3 = ui.Label({
  value: 'Population Density Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
populationLegend3.add(legendTitle3);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  populationLegend3.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var populationLegend4 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle4 = ui.Label({
  value: 'Population Density Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
populationLegend4.add(legendTitle4);
// Add color and and names to legend
for (var i = 0; i < 5; i++) {
  populationLegend4.add(makeRow(palette2[i], names2[i]));
  }    
// *************************************************************************************
// ****************************HUMAN IMPACT LEGEND ***************************************
// *************************************************************************************
// Set position of panel
var humanImpactLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
    maxWidth: '150px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Cumulative Human Impact Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
humanImpactLegend.add(legendTitle);
//  Palette with the colors
var palette2 =["ffffb2","fecc5c","fd8d3c","e31a1c"];
// Name of each legend value
var names2 = ['Low', 'Medium', 'High', 'Very High'];
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  humanImpactLegend.add(makeRow(palette2[i], names2[i]));
  }    
// Set position of panel
var humanImpactLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    // padding: '8px 15px'
        maxWidth: '150px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Cumulative Human Impact Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
humanImpactLegend2.add(legendTitle2);
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  humanImpactLegend2.add(makeRow(palette2[i], names2[i]));
  }   
// Set position of panel
var humanImpactLegend3 = ui.Panel({
  style: {
    position: 'bottom-left',
        maxWidth: '150px'
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle3 = ui.Label({
  value: 'Cumulative Human Impact Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
humanImpactLegend3.add(legendTitle3);
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  humanImpactLegend3.add(makeRow(palette2[i], names2[i]));
  }   
// Set position of panel
var humanImpactLegend4 = ui.Panel({
  style: {
    position: 'bottom-left',
        maxWidth: '150px'
    // padding: '8px 15px'
  }
});
// Create legend title
var legendTitle4 = ui.Label({
  value: 'Cumulative Human Impact Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    // color: '4A997E'
    }
});
// Add the title to the panel
humanImpactLegend4.add(legendTitle4);
// Add color and and names to legend
for (var i = 0; i < 4; i++) {
  humanImpactLegend4.add(makeRow(palette2[i], names2[i]));
  }   
// Global human modification
var gHM = ee.ImageCollection('CSP/HM/GlobalHumanModification')
// Create a land mask
var land = (gHM.mosaic().gt(0).selfMask())
var panel = ui.Panel()
panel.style().set({
  // maxHeight: '700px',
  maxWidth: '400px',
  position: 'top-left'
});
var title = ui.Label({
  value: 'Global Human Influence Mapping',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'Anthropogenic impact on Earth comes in many forms, from transportation infrastructure to population growth. ' +
  'The Global Human Modification Map (gHM) has quantified the cumulative human impact on all terrestrial lands '+
  'on Earth. Explore the gHM Map and associated individual human impact layers on a global scale. ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var amazonFiresText = ui.Label({
  value: 'The following maps show the distribution of fires in the Amazon region during the month of August in 2005, 2010, 2015, and 2019. Maps were acquired from the MODIS FIRMS dataset.',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
  }
})
// Global human modification
var gHM = ee.ImageCollection('CSP/HM/GlobalHumanModification').mosaic()
  .visualize({min: 0, max: 1, palette: ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20','#bd0026']})
// HUMAN SETTLEMENT
var popDensity = ee.ImageCollection('CIESIN/GPWv411/GPW_Population_Density').mosaic()
.updateMask(land)
  .visualize({
              bands: ['population_density'],
              max: 618.7815832432842, 
              opacity: 1,
              palette: ["ffffcc","a1dab4","41b6c4","2c7fb8","253494"]})
// .aside(Map.addLayer, pop_density_vis, 'GPW pop density')
var builtUp = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1')
.select('built')
.visualize({min: 1, max: 6, palette: ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c']})
.updateMask(land)
// .aside(Map.addLayer, {}, 'GHSL built up')
// AGRICULTURE
var crops = ee.Image('users/lgoldberg8000/GEE_Tutorials/Unified_Cropland_Layer')
.select('b1').gt(20).selfMask()
.visualize({palette: '#ffaa2b'})
// .aside(Map.addLayer, {palette: 'FF0000'}, 'crops')
// ROADS
var roadsAfrica=  ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-africa')
var roadsAmericas = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-americas')
var roadsAsia = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-asia')
var roadsOceaniaWest = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-oceania-west')
var roadsOceaniaEast = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-oceania-east')
var roads = roadsAfrica.merge(roadsAmericas).merge(roadsAsia).merge(roadsOceaniaWest).merge(roadsOceaniaEast)
// .aside(Map.addLayer, {}, 'gRoads')
// ELECTRICAL INFRASTRUCTURE
var nightLights = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
  .select('stable_lights')
  .mosaic()
  .updateMask(land)
  .visualize({
    max: 28, 
    opacity: 1,
    palette: ["0c0c0c","fcff21"]})
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
// Maps
var map1= ui.Map()
// map1.addLayer(countries, {}, 'Countries')
var map2 = ui.Map()
// map2.addLayer(countries, {}, 'Countries')
var map3 = ui.Map()
// map3.addLayer(countries, {}, 'Countries')
var map4 = ui.Map()
// map4.addLayer(countries, {}, 'Countries')
map1.add(legendPanel)
map2.add(legendPanel2)
map3.add(legendPanel3)
map4.add(legendPanel4)
var HUMANMOD = 'Global Human Modification'
var POPDENSITY = 'Population Density'
var BUILTUP= 'Built Up'
var AGRICULTURE = 'Agriculture'
var ROADS = 'Roads'
var NIGHTLIGHTS = 'Nightlights'
// Create an empty list of filter constraints.
var constraints = [];
// Create a layer selector that dictates which layer is visible on the Map.
var select1 = ui.Select({
  items: [HUMANMOD, POPDENSITY, BUILTUP, AGRICULTURE, ROADS, NIGHTLIGHTS],
  value: HUMANMOD,
  onChange: redraw,
})
select1.setPlaceholder('Map 1');
// Create a function to render a Map layer configured by the user inputs.
function redraw() {
  var layer = select1.getValue();
  var image;
  var legend;
  if (layer == HUMANMOD){
      map1.layers().remove(map1.layers().get(0))
      map1.addLayer(gHM, {}, HUMANMOD)
      legendPanel.clear()
        legendPanel.add(humanImpactLegend)
    }
      else if (layer == POPDENSITY) {
       map1.layers().remove(map1.layers().get(0))
       map1.addLayer(popDensity, {}, POPDENSITY)
       legendPanel.clear()
        legendPanel.add(populationLegend)
    } else if (layer == BUILTUP) {
       map1.layers().remove(map1.layers().get(0))
       map1.addLayer(builtUp, {}, BUILTUP)
        legendPanel.clear()
        legendPanel.add(builtUpLegend)
      } else if (layer == AGRICULTURE){
        map1.layers().remove(map1.layers().get(0))
        map1.addLayer(crops, {}, AGRICULTURE)
        legendPanel.clear()
        legendPanel.add(agLegend)
        } else if (layer == ROADS){
        map1.layers().remove(map1.layers().get(0))
        map1.addLayer(roads, {}, ROADS)
        legendPanel.clear()
        legendPanel.add(roadsLegend)
        } else if (layer == NIGHTLIGHTS){
        map1.layers().remove(map1.layers().get(0))
        map1.addLayer(nightLights, {}, NIGHTLIGHTS)
        legendPanel.clear()
        legendPanel.add(nightlightsLegend)
        }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
}
// Invoke the redraw function once at start up to initialize the Map.
redraw();
// map1.add(select1)
// Create a layer selector that dictates which layer is visible on the Map.
var select2 = ui.Select({
  items: [HUMANMOD, POPDENSITY, BUILTUP, AGRICULTURE, ROADS, NIGHTLIGHTS],
  value: POPDENSITY,
  onChange: redraw2,
})
.setPlaceholder('Map 2');
// Create a function to render a Map layer configured by the user inputs.
function redraw2() {
  var layer = select2.getValue();
  var image;
  var legend;
  if (layer == HUMANMOD){
      map2.layers().remove(map1.layers().get(0))
       map2.addLayer(gHM, {}, HUMANMOD)
        legendPanel2.clear()
        legendPanel2.add(humanImpactLegend2)
    }
      else if (layer == POPDENSITY) {
       map2.layers().remove(map2.layers().get(0))
       map2.addLayer(popDensity, {}, POPDENSITY)
       legendPanel2.clear()
        legendPanel2.add(populationLegend2)
    } else if (layer == BUILTUP) {
       map2.layers().remove(map2.layers().get(0))
       map2.addLayer(builtUp, {}, BUILTUP)
        legendPanel2.clear()
        legendPanel2.add(builtUpLegend2)
      } else if (layer == AGRICULTURE){
        map2.layers().remove(map2.layers().get(0))
        map2.addLayer(crops, {}, AGRICULTURE)
        legendPanel2.clear()
        legendPanel2.add(agLegend2)
        } else if (layer == ROADS){
        map2.layers().remove(map2.layers().get(0))
        map2.addLayer(roads, {}, ROADS)
        legendPanel2.clear()
        legendPanel2.add(roadsLegend2)
        } else if (layer == NIGHTLIGHTS){
        map2.layers().remove(map2.layers().get(0))
        map2.addLayer(nightLights, {}, NIGHTLIGHTS)
        legendPanel2.clear()
        legendPanel2.add(nightlightsLegend2)
        }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
}
// Invoke the redraw function once at start up to initialize the Map.
redraw2();
// map2.add(select2)
// Create a layer selector that dictates which layer is visible on the Map.
var select3 = ui.Select({
  items: [HUMANMOD, POPDENSITY, BUILTUP, AGRICULTURE, ROADS, NIGHTLIGHTS],
  value: BUILTUP,
  onChange: redraw3,
}).setPlaceholder('Map 3')
;
// Create a function to render a Map layer configured by the user inputs.
function redraw3() {
  var layer = select3.getValue();
  var image;
  var legend;
  if (layer == HUMANMOD){
      map3.layers().remove(map3.layers().get(0))
       map3.addLayer(gHM, {}, HUMANMOD)
       legendPanel3.clear()
        legendPanel3.add(humanImpactLegend3)
    }
      else if (layer == POPDENSITY) {
       map3.layers().remove(map3.layers().get(0))
       map3.addLayer(popDensity, {}, POPDENSITY)
       legendPanel3.clear()
        legendPanel3.add(populationLegend3)
    } else if (layer == BUILTUP) {
       map3.layers().remove(map3.layers().get(0))
       map3.addLayer(builtUp, {}, BUILTUP)
        legendPanel3.clear()
        legendPanel3.add(builtUpLegend3)
      } else if (layer == AGRICULTURE){
        map3.layers().remove(map3.layers().get(0))
        map3.addLayer(crops, {}, AGRICULTURE)
        legendPanel3.clear()
        legendPanel3.add(agLegend3)
        } else if (layer == ROADS){
        map3.layers().remove(map3.layers().get(0))
        map3.addLayer(roads, {}, ROADS)
        legendPanel3.clear()
        legendPanel3.add(roadsLegend3)
        } else if (layer == NIGHTLIGHTS){
        map3.layers().remove(map3.layers().get(0))
        map3.addLayer(nightLights, {}, NIGHTLIGHTS)
        legendPanel3.clear()
        legendPanel3.add(nightlightsLegend3)
        }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
}
// Invoke the redraw function once at start up to initialize the Map.
redraw3();
// map3.add(select3)
// Create a layer selector that dictates which layer is visible on the Map.
var select4 = ui.Select({
  items: [HUMANMOD, POPDENSITY, BUILTUP, AGRICULTURE, ROADS, NIGHTLIGHTS],
  value: AGRICULTURE,
  onChange: redraw4,
})
.setPlaceholder('Map 4');
// Create a function to render a Map layer configured by the user inputs.
function redraw4() {
  var layer = select4.getValue();
  var image;
  var legend;
   if (layer == HUMANMOD){
      map4.layers().remove(map4.layers().get(0))
       map4.addLayer(gHM, {}, HUMANMOD)
       legendPanel4.clear()
        legendPanel4.add(humanImpactLegend4)
    }
      else if (layer == POPDENSITY) {
       map4.layers().remove(map4.layers().get(0))
       map4.addLayer(popDensity, {}, POPDENSITY)
       legendPanel4.clear()
        legendPanel4.add(populationLegend4)
    } else if (layer == BUILTUP) {
       map4.layers().remove(map4.layers().get(0))
       map4.addLayer(builtUp, {}, BUILTUP)
        legendPanel4.clear()
        legendPanel4.add(builtUpLegend4)
      } else if (layer == AGRICULTURE){
        map4.layers().remove(map4.layers().get(0))
        map4.addLayer(crops, {}, AGRICULTURE)
        legendPanel4.clear()
        legendPanel4.add(agLegend4)
        } else if (layer == ROADS){
        map4.layers().remove(map4.layers().get(0))
        map4.addLayer(roads, {}, ROADS)
        legendPanel4.clear()
        legendPanel4.add(roadsLegend4)
        } else if (layer == NIGHTLIGHTS){
        map4.layers().remove(map4.layers().get(0))
        map4.addLayer(nightLights, {}, NIGHTLIGHTS)
        legendPanel4.clear()
        legendPanel4.add(nightlightsLegend4)
        }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
}
// Invoke the redraw function once at start up to initialize the Map.
redraw4();
// map4.add(select4)
var topSelectPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
})
topSelectPanel.add(select1)
topSelectPanel.add(select3)
var bottomSelectPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
})
bottomSelectPanel.add(select2);
bottomSelectPanel.add(select4);
var selectorsPanel = ui.Panel()
selectorsPanel.add(topSelectPanel)
selectorsPanel.add(bottomSelectPanel)
selectorsPanel.style().set({
  padding: '10px 0px 0px 50px'
})
panel.add(title);
panel.add(text);
panel.add(ui.Label({
  value: 'Experiment with the following selectors to view and compare the human influence maps on the left.',
  style: {
      // border: BORDER_STYLE,
      padding: '10px',
      margin: '5px',
      fontSize: '14px',
      fontWeight: '150px',
      color: '#9E9E9E',
  }}));
panel.add(selectorsPanel)
panel.add(ui.Label({
  value: 'Click on a country to calculate national statistics using the cumulative human modification map. ',
  style: {
      // border: BORDER_STYLE,
      padding: '10px',
      margin: '5px',
      fontSize: '14px',
      fontWeight: '150px',
      color: '#9E9E9E',
  }}));
var id = ui.Label({style: {
      // border: BORDER_STYLE,
      padding: '10px',
      margin: '5px',
      fontSize: '14px',
      fontWeight: '150px',
      color: '#9E9E9E',
  }})
panel.add(id)
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([map1, map2], null, {stretch: 'both'}),
      ui.Panel([map3, map4], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
ui.root.clear();
ui.root.add(mapGrid);
ui.Map.Linker([map1, map2, map3, map4], 'change-bounds');
var panel2 = ui.Panel();
function onMapClick(coords){
  panel2.clear()
  // get selected feature
  var selection = ee.Feature((countries.filterBounds(ee.Geometry.Point([coords.lon, coords.lat])).first()));
  selection.get('country_na').getInfo(function(i){
    id.setValue("Country Name: " + i);
  });
  // add it as a layer
  var layer = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Selected Area');
    var layer2 = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Selected Area');
    var layer3 = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Selected Area');
    var layer4 = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Selected Area');
  // map1.layers().set(3, layer);
  map1.layers().remove(map1.layers().get(1));
  map1.layers().set(1, layer);
  map2.layers().remove(map2.layers().get(1));
  map2.layers().set(1, layer2);  
  map3.layers().remove(map3.layers().get(1));
  map3.layers().set(1, layer3);  
  map4.layers().remove(map4.layers().get(1));
  map4.layers().set(1, layer4);  
  var geom = selection.geometry()
   var gHM= ee.ImageCollection('CSP/HM/GlobalHumanModification').mosaic()
    var gHMZones = gHM.gt(0.1).add(gHM.gt(0.4)).add(gHM.gt(0.7))
    var gHMZone1 = gHMZones.eq(0).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 100000,
      maxPixels: 1e13
    }).get('gHM')
     var gHMZone2 = gHMZones.eq(1).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 100000,
      maxPixels: 1e13
    }).get('gHM')
     var gHMZone3 = gHMZones.eq(2).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 100000,
            maxPixels: 1e13
    }).get('gHM')
   var gHMZone4 = gHMZones.eq(3).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 100000,
            maxPixels: 1e13
    }).get('gHM')
    .aside(print, 'gHMZone4')
    // Pop density analysis
    var popDensity = ee.ImageCollection('CIESIN/GPWv4/population-density').mosaic()
    var popDensityMin = popDensity.reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.min(),
      scale: 1000
    }).get('population-density')
    var popDensityMedian = popDensity.reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.median(),
      scale: 1000
    }).get('population-density')
    var popDensityMax = popDensity.reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.max(),
      scale: 1000
    }).get('population-density')
    var popDensityMean = popDensity.reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.mean(),
      scale:1000
    }).get('population-density')
    var popDensityStdDev = popDensity.reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.stdDev(),
      scale: 1000
    }).get('population-density')
    // Agriculture
    var crops = ee.Image('users/lgoldberg8000/GEE_Tutorials/Unified_Cropland_Layer')
     // ROADS
    var roadsAfrica=  ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-africa')
    var roadsAmericas = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-americas')
    var roadsAsia = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-asia')
    var roadsOceaniaWest = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-oceania-west')
    var roadsOceaniaEast = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-oceania-east')
    var gRoads = roadsAfrica.merge(roadsAmericas).merge(roadsAsia).merge(roadsOceaniaWest).merge(roadsOceaniaEast)
    // .aside(Map.addLayer, {}, 'gRoads')
    var distance = gRoads.distance(10000)
    // .aside(Map.addLayer)
    var distanceLevels = distance.gt(50).add(distance.gt(100)).add(distance.gt(150))
      .aside(print)
     var roadsDistanceZone1 = distanceLevels.eq(0).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 1000
    }).get('distance')
    print(roadsDistanceZone1)
     var roadsDistanceZone2 = distanceLevels.eq(1).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 1000
    }).get('distance')
    print(roadsDistanceZone2)
     var roadsDistanceZone3 = distanceLevels.eq(2).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 1000
    }).get('distance')
        print(roadsDistanceZone3)
   var roadsDistanceZone4 = distanceLevels.eq(3).selfMask().multiply(ee.Image.pixelArea()).reduceRegion({
      geometry: geom,
      reducer: ee.Reducer.sum(),
      scale: 1000
    }).get('distance')  
    var feature = ee.Feature(
      geom, {
      Low: gHMZone1, 
      Medium:gHMZone2, 
      High: gHMZone3, 
      Very_High: gHMZone4,
      Minimum: popDensityMin,
      Median: popDensityMedian,
      Maximum: popDensityMax,
      Mean: popDensityMean,
      Standard_Deviation: popDensityStdDev,
      Within_50m: roadsDistanceZone1,
      Between_50m_and_100m: roadsDistanceZone2,
      Between_100m_and_150m: roadsDistanceZone3,
      Greater_than_150m: roadsDistanceZone4,
      });
    print(feature);
var gHMLevelsChart = ui.Chart.feature.byProperty(
   feature, ['Low', 'Medium', 'High', 'Very High']
   );
   gHMLevelsChart.setChartType('PieChart');
   gHMLevelsChart.setOptions({
    title: 'Proportion of Area under Human Modification Levels' ,
    // xAxis: {title: 'Epoch of Loss'}, 
    cols: ['Total Loss (km²)', 'Area']
});
// print(gHMLevelsChart);
// panel.add(gHMLevelsChart);
var popDensityMetrics = ui.Chart.feature.byProperty(
   feature, 
   ['Mean','Median', 'Standard_Deviation']
   );
   popDensityMetrics.setChartType('Table');
   popDensityMetrics.setOptions({
    title: 'Population Density' ,
    // xAxis: {title: 'Epoch of Loss'}, 
    vAxis: {title: 'Total Loss (km²)'} 
});
var roadsMetrics = ui.Chart.feature.byProperty(
   feature, 
   ['Within_50m', 'Between_50m_and_100m', 'Between_100m_and_150m', 'Greater_than_150m']
   );
   roadsMetrics.setChartType('PieChart');
   roadsMetrics.setOptions({
    title: 'Proportion of Area within Distance to Roads',
    // xAxis: {title: 'Epoch of Loss'}, 
    vAxis: {title: 'Total Loss (km²)'} 
});
var nightlights = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
.select('stable_lights')
var nightlightsChart = ui.Chart.image.series(nightlights, feature, ee.Reducer.mean(), 500)
.setOptions({
  title: 'Nightlights Time Series 2000-2017'
})
panel2.add(gHMLevelsChart)
// panel2.add(popDensityMetrics);
// panel2.add(roadsMetrics);
// panel2.add(nightlightsChart);
}
map1.onClick(onMapClick)
map2.onClick(onMapClick)
map3.onClick(onMapClick)
map4.onClick(onMapClick)
 panel.add(panel2);
ui.root.add(panel)
map1.setOptions('SATELLITE');
map1.setCenter(8.99218116996451, 48.13877319347906, 4)
map2.setOptions('SATELLITE');
map2.setCenter(8.99218116996451, 48.13877319347906, 4)
map3.setOptions('SATELLITE');
map3.setCenter(8.99218116996451, 48.13877319347906, 4)
map4.setOptions('SATELLITE');
map4.setCenter(8.99218116996451, 48.13877319347906, 4)