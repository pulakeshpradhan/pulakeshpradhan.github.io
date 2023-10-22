// Global human modification
var gHM = ee.ImageCollection('CSP/HM/GlobalHumanModification')
// Create a land mask
var land = (gHM.mosaic().gt(0).selfMask())
var panel = ui.Panel()
panel.style().set({
  // maxHeight: '700px',
  maxWidth: '500px',
  position: 'top-left'
});
var title = ui.Label({
  value: 'Cartographie Mondiale de l\'Influence Humaine',
  style: {fontWeight: 'bold',
    fontSize: '32px',
    padding: '10px',
    color: '#616161',}
})
var text = ui.Label({
  value: 'L\'impact anthropique sur la Terre prend de nombreuses formes, allant des infrastructures de transport à la croissance démographique. La Global Human Modification Map (gHM) a quantifié l\'impact humain cumulatif sur toutes les aires terrestres de la Terre. Explorez la carte gHM et les couches d\'impact humain associées à l\'échelle mondiale. ',
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '8px',
    // backgroundColor: colors.transparent,
    border: '4px solid rgba(97, 97, 97, 0.05)'
  }
})
var amazonFiresText = ui.Label({
  value: 'Les cartes suivantes montrent la répartition des incendies dans la région amazonienne au cours du mois d\'août en 2005, 2010, 2015 et 2019. Les cartes ont été acquises à partir de l\'ensemble de données MODIS FIRMS.',
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
var popDensity = ee.ImageCollection('CIESIN/GPWv4/population-density').mosaic()
.updateMask(land)
  .visualize({
              bands: ['population-density'],
              max: 2436.8642578125, 
              opacity: 1,
              palette: ["ffffb2","fecc5c","fd8d3c","f03b20","bd0026"]})
// .aside(Map.addLayer, pop_density_vis, 'GPW pop density')
var builtUp = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1')
.updateMask(land)
// .aside(Map.addLayer, {}, 'GHSL built up')
// AGRICULTURE
var crops = ee.Image('users/lgoldberg8000/GEE_Tutorials/Unified_Cropland_Layer')
.select('b1').gt(20).selfMask()
// .aside(Map.addLayer, {palette: 'FF0000'}, 'crops')
// ROADS
var roadsAfrica=  ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-africa')
var roadsAmericas = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-americas')
var roadsAsia = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-asia')
var roadsOceaniaWest = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-oceania-west')
var roadsOceaniaEast = ee.FeatureCollection('users/lgoldberg8000/GEE_Tutorials/gROADS-v1-oceania-east')
var gRoads = roadsAfrica.merge(roadsAmericas).merge(roadsAsia).merge(roadsOceaniaWest).merge(roadsOceaniaEast)
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
var HUMANMOD = 'Modification Humaine Totale'
var POPDENSITY = 'Densité de la Population'
var BUILTUP= 'Surfaces Imperméables'
var AGRICULTURE = 'Agriculture'
var ROADS = 'Routes'
var NIGHTLIGHTS = 'Lumières de la Nuit'
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
      map1.layers().remove(map1.layers().get(1))
       map1.addLayer(gHM, {}, HUMANMOD)
    }
      else if (layer == POPDENSITY) {
       map1.layers().remove(map1.layers().get(1))
       map1.addLayer(popDensity, {}, POPDENSITY)
    } else if (layer == BUILTUP) {
       map1.layers().remove(map1.layers().get(1))
       map1.addLayer(builtUp, {}, BUILTUP)
      } else if (layer == AGRICULTURE){
        map1.layers().remove(map1.layers().get(1))
        map1.addLayer(crops, {}, AGRICULTURE)
        } else if (layer == ROADS){
        map1.layers().remove(map1.layers().get(1))
        map1.addLayer(roads, {}, ROADS)
        } else if (layer == NIGHTLIGHTS){
        map1.layers().remove(map1.layers().get(1))
        map1.addLayer(nightLights, {}, NIGHTLIGHTS)
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
      map2.layers().remove(map1.layers().get(1))
       map2.addLayer(gHM, {}, HUMANMOD)
    }
      else if (layer == POPDENSITY) {
       map2.layers().remove(map2.layers().get(1))
       map2.addLayer(popDensity, {}, POPDENSITY)
    } else if (layer == BUILTUP) {
       map2.layers().remove(map2.layers().get(1))
       map2.addLayer(builtUp, {}, BUILTUP)
      } else if (layer == AGRICULTURE){
        map2.layers().remove(map2.layers().get(1))
        map2.addLayer(crops, {}, AGRICULTURE)
        } else if (layer == ROADS){
        map2.layers().remove(map2.layers().get(1))
        map2.addLayer(roads, {}, ROADS)
        } else if (layer == NIGHTLIGHTS){
        map2.layers().remove(map2.layers().get(1))
        map2.addLayer(nightLights, {}, NIGHTLIGHTS)
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
      map3.layers().remove(map3.layers().get(1))
       map3.addLayer(gHM, {}, HUMANMOD)
    }
      else if (layer == POPDENSITY) {
       map3.layers().remove(map3.layers().get(1))
       map3.addLayer(popDensity, {}, POPDENSITY)
    } else if (layer == BUILTUP) {
       map3.layers().remove(map3.layers().get(1))
       map3.addLayer(builtUp, {}, BUILTUP)
      } else if (layer == AGRICULTURE){
        map3.layers().remove(map3.layers().get(1))
        map3.addLayer(crops, {}, AGRICULTURE)
        } else if (layer == ROADS){
        map3.layers().remove(map3.layers().get(1))
        map3.addLayer(roads, {}, ROADS)
        } else if (layer == NIGHTLIGHTS){
        map3.layers().remove(map3.layers().get(1))
        map3.addLayer(nightLights, {}, NIGHTLIGHTS)
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
      map4.layers().remove(map4.layers().get(1))
       map4.addLayer(gHM, {}, HUMANMOD)
    }
      else if (layer == POPDENSITY) {
       map4.layers().remove(map4.layers().get(1))
       map4.addLayer(popDensity, {}, POPDENSITY)
    } else if (layer == BUILTUP) {
       map4.layers().remove(map4.layers().get(1))
       map4.addLayer(builtUp, {}, BUILTUP)
      } else if (layer == AGRICULTURE){
        map4.layers().remove(map4.layers().get(1))
        map4.addLayer(crops, {}, AGRICULTURE)
        } else if (layer == ROADS){
        map4.layers().remove(map4.layers().get(1))
        map4.addLayer(roads, {}, ROADS)
        } else if (layer == NIGHTLIGHTS){
        map4.layers().remove(map4.layers().get(1))
        map4.addLayer(nightLights, {}, NIGHTLIGHTS)
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
  padding: '10px 0px 0px 100px'
})
panel.add(title);
panel.add(text);
panel.add(ui.Label({
  value: 'Faites l\'expérience des sélecteurs suivants pour visualiser et comparer les cartes d\'influence humaine à gauche.',
  style: {
      // border: BORDER_STYLE,
      padding: '10px',
      margin: '5px',
      fontSize: '14px',
      fontWeight: '50',
      color: '#9E9E9E',
  }}));
panel.add(selectorsPanel)
panel.add(ui.Label({
  value: 'Cliquez sur un pays pour calculer les statistiques nationales en utilisant la carte mondiale des modifications humaines. ',
  style: {
      // border: BORDER_STYLE,
      padding: '10px',
      margin: '5px',
      fontSize: '14px',
      fontWeight: '50',
      color: '#9E9E9E',
  }}));
var id = ui.Label({style: {
      // border: BORDER_STYLE,
      padding: '0px 0px 0px 10px',
      margin: '5px',
      fontSize: '14px',
      fontWeight: '50',
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
    id.setValue("Nom de Pays: " + i);
  });
  // add it as a layer
  var layer = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Área Seleccionada');
    var layer2 = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Área Seleccionada');
    var layer3 = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Área Seleccionada');
    var layer4 = ui.Map.Layer(selection, {color: 'FFFF00'}, 'Área Seleccionada');
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
      Faible: gHMZone1, 
      Intermédiaire:gHMZone2, 
      Fort: gHMZone3, 
      Très_élevé: gHMZone4,
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
   feature, ['Faible', 'Intermédiaire', 'Fort', 'Très élevé']
   );
   gHMLevelsChart.setChartType('PieChart');
   gHMLevelsChart.setOptions({
    title: 'Proportion de la superficie sous l\'influence des niveaux de modification anthropique' ,
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