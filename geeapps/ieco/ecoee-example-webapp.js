var priorityScores = ui.import && ui.import("priorityScores", "table", {
      "id": "users/ieco/tracts_benefits_april2018_shape"
    }) || ee.FeatureCollection("users/ieco/tracts_benefits_april2018_shape");
/* 
ecoEE Example Web Application
Author: Evan Zangakis, Matthew Helmus
Description:  Visualize ecosystem multifunctionality across Philadelphia PA, USA census tracts
  Visualized data are from
    Tran, Tyler J., Matthew R. Helmus, and Jocelyn E. Behm. "Green infrastructure space 
    and traits (GIST) model: Integrating green infrastructure spatial placement and plant traits 
    to maximize multifunctionality. Urban Forestry & Urban Greening 49 (2020): 126635.
  https://www-sciencedirect-com.libproxy.temple.edu/science/article/pii/S1618866719302778
*/
// Data and Parameters --------------------------------------------------------
// Scale loaded data values to whole numbers (multiply by 100 and round to two digits)
priorityScores = priorityScores.map(function(feat){
  return feat.set({'air':(ee.Number(feat.get('airQlty')).multiply(100)),
    'd-equ':(ee.Number(feat.get('bdvrst2')).multiply(100)),
    'd-com':(ee.Number(feat.get('bdvrst1')).multiply(100)),
    'crime':(ee.Number(feat.get('crime')).multiply(100)),
    'health':(ee.Number(feat.get('health')).multiply(100)),
    'heat':(ee.Number(feat.get('htIslnd')).multiply(100)),
    'overall':(ee.Number(feat.get('ovrllSp')).multiply(20)),
    'property':(ee.Number(feat.get('propVls')).multiply(100)),
    'storm':(ee.Number(feat.get('strmwtr')).multiply(100))
  });
});
// Define Parameters
var chartLabels = ['air', 'd-equ', 'd-com','crime','health','heat','overall','property','storm'];
var colorGI = "black";
var nameGI = "Census Tracts";
var alphaES = 0.8;
//var palette = ['blue', 'purple','red']; // paint palette to color the map   
var palette = ['white', 'silver', '004953', 'black']; // Eagles palette with Midnight Green
//var palette = palette.reverse(); 
// Initiate App -----------------------------------------------------------------------------
var appMap = ui.Map().setOptions('SATELLITE'); // replace all 'appMap' with 'Map' objects for non-webApp code
ui.root.widgets().reset([appMap]);
appMap.setControlVisibility(true);
appMap.setCenter(-75.14648576097875, 40.00005656001049,11); // zoom map to Philadelphia
appMap.addLayer(priorityScores,{color: colorGI},nameGI,0); // add first layer to map
// Make Images out of Features to Apply (Paint) Color Schema to Map
var empty = ee.Image().byte(); // set up your blank canvas (image)
var airQuality = empty.paint({
  featureCollection: priorityScores,// shades are from the 'airQlty' feature property
  color: 'air',                    // shades are from the 'airQlty' feature property
  width: 1                        // paint the polygon outlines with a brush of line width 1 
}),
crime = empty.paint({
  featureCollection: priorityScores,
  color: 'crime',             // NOTE: no width argument given, so paint fills polygons
}),
health = empty.paint({
  featureCollection: priorityScores,
  color: 'health',
}),
bdvrst1 = empty.paint({
  featureCollection: priorityScores,
  color: 'd-equ',
}),
bdvrst2 = empty.paint({
  featureCollection: priorityScores,
  color: 'd-com',
}),
htIslnd = empty.paint({
  featureCollection: priorityScores,
  color: 'heat',
}),
ovrllSp = empty.paint({
  featureCollection: priorityScores,
  color: 'overall',
}).divide(6),
propVls = empty.paint({
  featureCollection: priorityScores,
  color: 'property',
}),
strmwtr = empty.paint({
  featureCollection: priorityScores,
  color: 'storm',
}); 
// decide on the first layer to map in the web app
appMap.addLayer(bdvrst1, {palette: palette, min:0, max: 100}, 'Biodiversity Equity', true, alphaES);
// Floating Panels (5 in total) ----------------------------------------------------------------
// SELECT LAYER panel                            (1)
var layers = {
  'Air Quality': airQuality,
  'Crime': crime,
  'Health': health,
  'Biodiversity complementation': bdvrst2,
  'Biodiversity equity': bdvrst1,
  'Heat Island': htIslnd,
  'Overall Priority': ovrllSp,
  'Property Value': propVls,
  'Storm Water': strmwtr
};
var layerSelect = ui.Select({
  items: Object.keys(layers),
  onChange: function(key) {
    var mapLayers = appMap.layers();
    appMap.remove(mapLayers.get(1));
    appMap.addLayer(layers[key],{palette: palette, min:0, max: 100}, key, true, alphaES);
  }
});
layerSelect.style().set({
  width: '150px',
  position: 'top-left'
});
// Decide on the first layer to load (place holder)
layerSelect.setPlaceholder('Biodiversity Equity');
appMap.add(layerSelect);
// TEXT panel for a clickable url for a citation (2)
var panelText = ui.Panel();
panelText.style().set({
  width: '430px',
  position: 'bottom-right',
  height: '40px'
});
appMap.add(panelText); // add text panel to map
// url text for citation
var url = ui.Label({
  value: "Data from: Tran et al. 2020. Green infrastructure space and traits (GIST) model: Integrating green infrastructure spatial placement and plant traits to maximize multifunctionality. Urban Forestry & Urban Greening. 49 (126635)",
  style: {
    fontSize: '9px',
    fontFamily: 'serif',
    margin: '0 0 0 0',
    padding: '0'
    },
  targetUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S1618866719302778'
});
panelText.add(url); // add url clickable text to the map
// TEXT panel for a clickable url for ecoEE-js    (3)
var panelTextEE = ui.Panel();
panelTextEE.style().set({
  backgroundColor: 'yellow',
  width: '170px',
  position: 'top-center',
  height: '30px',
  stretch: 'both'
});
appMap.add(panelTextEE); // add text panel to map
//  url text for ecoEE
var urlEE = ui.Label({
  value: "ecoEE-js example web app",
  style: {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
    fontSize: '12px',
    fontFamily: 'sans-serif',
    margin: '0 0 0 0',
    padding: '1'
    },
  targetUrl: 'https://github.com/ieco-lab/ecoEE'
});
panelTextEE.add(urlEE); // add url clickable text to the map
// CHART panel                            (4)
var panelChart = ui.Panel();
panelChart.style().set({
  width: '400px',
  //height: '250px',
  position: 'top-right',
  shown: false
});
appMap.add(panelChart);
// TABLE panel                            (5)
var panelTable = ui.Panel();
panelTable.style().set({
  width: '300px',
  position: 'bottom-left',
  shown: false
});
appMap.add(panelTable);
// On-click Action Function ----------------------------------------------------------------
// Function to print table and chart data when clicked
appMap.onClick(function(coords) {
  panelTable.style().set({shown: true});
  panelChart.style().set({shown: true});
  panelTable.clear();
  panelChart.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Check to make sure click is within priorityScores feature
  var district = priorityScores.map(function(feat){
     return ee.Algorithms.If(feat.intersects(point), feat.set({'intersect':1}), feat.set({'intersect':0}));
  });
  // Get Metadata from area clicked
  var area = district.filterMetadata('intersect','equals',1).first();
   print(area);                // Print the clicked location values to the Console
  // Set up On-click Chart and Table ------------------------------------------------------------
  // Chart
   var chart = ui.Chart.feature.byProperty(ee.FeatureCollection([area]),chartLabels);
    chart.setOptions({title: 'Vegetated Green Infrastructure Space & Traits (GIST) Placement Model',
                      hAxis: { title: 'ecosystem service' },
                      vAxis: { title: 'priority score' }, 
                      legend: {position: 'none'},
  });
  panelChart.add(chart);
  // Table
  area.get('NAME10').evaluate(function(name){
        panelTable.add(ui.Label("Location: " + name)) //evaluate converts EE object to javascript primitive
        });
  area.get('air').evaluate(function(airQual){
        panelTable.add(ui.Label("Air Quality: " + (airQual).toFixed(0)))
        }); 
  area.get('d-equ').evaluate(function(bd){
        panelTable.add(ui.Label("Biodiversity Equity: " + (bd).toFixed(0))) //evaluate converts EE object to javascript primitive
        });
  area.get('d-com').evaluate(function(bd){
        panelTable.add(ui.Label("Biodiversity Complementation: " + (bd).toFixed(0))) //evaluate converts EE object to javascript primitive
        });
  area.get('crime').evaluate(function(crime){
        panelTable.add(ui.Label("Crime: " + (crime).toFixed(0)))
        });
  area.get('health').evaluate(function(health){
        panelTable.add(ui.Label("Health: " + (health).toFixed(0)))
        });
  area.get('heat').evaluate(function(heatIsland){
        panelTable.add(ui.Label("Heat Island: " + (heatIsland).toFixed(0))) //evaluate converts EE object to javascript primitive
        });
  area.get('overall').evaluate(function(overallPriority){
        panelTable.add(ui.Label("Overall Priority: " + (overallPriority).toFixed(0))) //evaluate converts EE object to javascript primitive
        });
  area.get('property').evaluate(function(propertyValue){
        panelTable.add(ui.Label("Property Value: " + (propertyValue).toFixed(0))) //evaluate converts EE object to javascript primitive
        });
  area.get('storm').evaluate(function(stormWater){
        panelTable.add(ui.Label("Storm Water: " + (stormWater).toFixed(0))) //evaluate converts EE object to javascript primitive
        });
}); // end function