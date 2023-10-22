//var show_drawing_tools = false
var magma = ["400b0b","a12424","ee7b06","ffa904","ffdb00"]
var viridis = ["450256","3B1C8C","21908D","5AC865","F9E721","450256","3B1C8C","21908D"]
// This function adds a band representing the image timestamp.
var add_fdi = function(image) {
  /*
  Floating Debris Index Biermann et al., 2020
  correction factor (wavelengths) 
  (nir - red) / (swir - red) =
  Sentinel 2A
  (832.8 - 664.6) / (1613.7 - 664.6) = 0.17722
  Sentinel 2B
  (833.0 - 665.0) / (1610.4 - 665.0) = 0.17770
  */
  var fdi = image.expression(
      'NIR - (RE2 + (SWIR-RE2) * 1.7722)', {
      'RED': image.select('B4').divide(10000),
      'RE2': image.select('B6').divide(10000),
      'NIR': image.select('B8').divide(10000),
      'SWIR': image.select('B11').divide(10000)}
      ).rename(["FDI"])
  return ee.Image.cat([image, fdi]);
};
var init_site_id = 0
// Each map has a name and some visualization parameters.
var MAP_PARAMS = {
  'Natural Color (B4/B3/B2)': {gamma: 1.3, min: 550, max: 700, bands: ['B4', 'B3', 'B2']},
  //'Land/Water (B8/B11/B4)': {gamma: 1.3, min: 0, max: 3000, bands: ['B8', 'B11', 'B4']},
  //'Vegetation (B12/B11/B4)': {gamma: 1.3, min: 0, max: 700, bands: ['B12', 'B12', 'B4']},
  'Color Infrared (B8/B4/B3)': {gamma: 1.3, min: 550, max: 700, bands: ['B8', 'B4', 'B3']},
  //'Floating Algal Index': {"opacity":1,"bands":["FAI"],"min":-200,"max":100,"palette":magma},
  'Normalized Difference Vegetation Index': {"opacity":1,"bands":["NDVI"],"min":-.4,"max":0.4,"palette":viridis},
  'Floating Debris Index (Biermann et al., 2020)': {"opacity":1,"bands":["FDI"],"min":0,"max":0.1,"palette":magma},
};
// Create a map for each visualization option.
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  //map.addLayer(image, getVisualization(name), name);
  map.setControlVisibility(false);
  /*map.drawingTools()
    .setShown(show_drawing_tools)
    .setDrawModes(['point'])
    .setShape('point')
    .setLinked(true);
  */
  maps.push(map);
});
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
var places = {
  "Scottland 2020-4-20": 
    [[-2.49, 56.18],
    "COPERNICUS/S2/20180420T112121_20180420T112137_T30VWH", 
    14,
    'from Biermann et al. (2020): "A recent report on plastic pollution on UK beaches was circulated by the UK Marine Conservation Society, UK. Teir fndings showed that across 135 Scottish beaches, litter dominated by plastics and polystyrene had increased by 14% since 2017". This site is shown in Figure 4 as suspected plastics'],
  "Da Nang 2018-10-05": 
    [[108.16078695663128,16.24727425923829],
    "COPERNICUS/S2/20181005T030549_20181005T031911_T48QZD", 
    14,
    'from Biermann et al. (2020): "In recent years, the coastal area of Da Nang has experienced a number of environmental challenges. Based on an internal monitoring report for Da Nang city coastal waters, action is being taken to minimise and prevent pollution from industrial and wastewater sources, and improve the environmental quality. Eforts from local and international institutions are also focused on tackling the problem of plastic pollution."'], // "COPERNICUS/S2/20181005T030549_20181005T031911_T48PZC"
  "Plastic Litter Project 2018": 
    [[26.566607739006617,39.10798150667329],
    "COPERNICUS/S2/20180607T085601_20180607T090315_T35SMD", 
    17,
    "Topouzelis et al., (2020) floated several artificial plastic islands (circa 10m diameter) on the beach of Mitilini, Greece. This is the only data of confirmed plastics floating in the ocean"],
  "Plastic Litter Project 2020. 2020-06-16": 
    [[26.566607739006617,39.10798150667329],
    "COPERNICUS/S2/20200616T085601_20200616T085601_T35SMD", 
    17,
    "Topouzelis et al., (2020) floated several artificial plastic islands (circa 10m diameter) on the beach of Mitilini, Greece. This is the only data of confirmed plastics floating in the ocean"],
  "Plastic Litter Project 2020. 2020-07-01 ": 
    [[26.566607739006617,39.10798150667329],
    "COPERNICUS/S2/20200701T085559_20200701T085944_T35SMD", 
    17,
    "Topouzelis et al., (2020) floated several artificial plastic islands (circa 10m diameter) on the beach of Mitilini, Greece. This is the only data of confirmed plastics floating in the ocean"],
  "Plastic Litter Project 2020. 2020-07-06 ": 
    [[26.566607739006617,39.10798150667329],
    "COPERNICUS/S2/20200706T085601_20200706T085600_T35SMD", 
    17,
    "Topouzelis et al., (2020) floated several artificial plastic islands (circa 10m diameter) on the beach of Mitilini, Greece. This is the only data of confirmed plastics floating in the ocean"],  
  "Durban. 2019-04-24 ": 
    [[31.086623838094713,-29.867066277821746],
    "COPERNICUS/S2/20190424T073619_20190424T080529_T36JUN", 
    14,
    "Durban, South Africa. Heavy plastic pollution after flooding event in 22nd and 23rd of April 2019. https://www.telegraph.co.uk/news/2019/04/29/pictures-day-29-april-2019/tons-debris-mostly-plastic-wood-swamped-port-durban-transnet/"],
  "Durban. 2019-04-29 ": 
    [[31.086623838094713,-29.867066277821746],
    "COPERNICUS/S2/20190429T073621_20190429T080547_T36JUM", 
    14,
    "Durban, South Africa. Heavy plastic pollution after flooding event in 22nd and 23rd of April 2019. https://www.telegraph.co.uk/news/2019/04/29/pictures-day-29-april-2019/tons-debris-mostly-plastic-wood-swamped-port-durban-transnet/"],
  "Accra, Ghana. 2018-10-31 ": 
    [[0.0874189191328334,5.651999034140515],
    "COPERNICUS/S2/20181031T101139_20181031T101911_T30NZM", 
    12,
    "Accra, Ghana is faced with serious waste management challenges: Van Dyck, I. P., Nunoo, F. K. & Lawson, E. T. An empirical assessment of marine debris, seawater quality and littering in ghana. Journal of Geoscience and Environment Protection, https://www.dw.com/en/saving-ghana-from-its-own-waste/a-19503010"],
};
var zoomBox = ui.Map({style: {stretch: 'both', shown: true}}).setControlVisibility(false);
zoomBox.setZoom(2);
var init_site = function(key) {
          var coords = places[key][0]
          var image = ee.Image(places[key][1]);
          remove_all_layers(zoomBox)
          zoomBox.setCenter(coords[0],coords[1],4)
          zoomBox.addLayer(ee.Geometry.Point([coords[0],coords[1]]), {color: 'FF0000'}, 'geodesic polygon')
          image = add_fdi(image)
          image = add_fai(image)
          image = add_ndvi(image)
          var zoomlevel = places[key][2]
          var description = places[key][3]
          Object.keys(MAP_PARAMS).forEach(function(name, index) {
            remove_all_layers(maps[index])
            if (MAP_PARAMS[name] !== null) {
              maps[index].addLayer(image, MAP_PARAMS[name], name);
            }
          });
          sitelabel.clear()
          sitelabel.add(ui.Label({
            value: description,
            style: {
              fontSize: '14px',
            }
          }));
          maps[0].setCenter(coords[0], coords[1], zoomlevel);
        }
var sitelabel = ui.Panel()
sitelabel.add(ui.Label({
        value: 'Info about site',
        style: {
          fontSize: '14px',
        }
      }));
//var overviewmap = ui.Map();
//overviewmap.drawingTools().setShown(show_drawing_tools);
//maps.push(overviewmap)
var linker = ui.Map.Linker(maps);
var panels = ui.Panel(
    [
      ui.Label({
        value: 'Floating Debris Index Explorer',
        style: {
          fontWeight: 'bold',
          fontSize: '20px',
          margin: '10px 5px',
          textAlign: 'center',
        }
      }),
      ui.Label({
        value: 'The Floating Debris Index (Biermann et al., 2020) is a spectral index that incorporates Sentinel 2 Red, Red Edge, Near Infrared, and Short-Wave Infrared bands. This Google Earth Engine application visualizes the Floating Debris index alongside a Natural Color (RGB), Color Infrared (NIR,Red,Green) and the Normalized Difference Vegetation Index on several sites of suspected plastic. Select a site below.',
      }), 
      ui.Select({
        items: Object.keys(places),
        onChange: init_site
      }).setPlaceholder(Object.keys(places)[init_site_id]),
      sitelabel,
      //overviewmap,
      zoomBox,
      ui.Label({
        value: 'Floating Debris Index defined by Biermann et al., (2020)',
        style: {
          fontSize: '10px',
        }
      }),     
      ui.Label({
        value: 'Topouzelis, K., Papakonstantinou, A., & Garaba, S. P. (2019). Detection of floating plastics from satellite and unmanned aerial systems (Plastic Litter Project 2018). International Journal of Applied Earth Observation and Geoinformation, 79, 175-183.',
        style: {
          fontSize: '10px',
        }
      }),
      ui.Label({
        value: 'Biermann, L., Clewley, D., Martinez-Vicente, V., & Topouzelis, K. (2020). finding plastic patches in coastal Waters using optical Satellite Data. Scientific reports, 10(1), 1-10.',
        style: {
          fontSize: '10px',
        }
      }),
      ui.Label({
        value: 'application © Marc Rußwurm, Jamila Mifdal (2020)',
        style: {
          fontSize: '10px',
        }
      })
      ],
      ui.Panel.Layout.Flow('vertical'), 
      {'width':'400px'}
  );
// Add the maps and title to the ui.root.
ui.root.widgets().reset([panels, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('horizontal'));
// This function adds a band representing the image timestamp.
var add_ndvi = function(image) {
  var ndvi = image.expression(
      '(NIR - RED) / (NIR + RED)', {
      'RED': image.select('B4'),
      'NIR': image.select('B8'),
      }).rename(["NDVI"])
  return ee.Image.cat([image, ndvi]);
};
var add_fai = function(image) {
  /*
  Detecting and Quantifying a Massive Invasion of
  Floating Aquatic Plants in the Río de la Plata Turbid
  Waters Using High Spatial Resolution Ocean
  Color Imagery
  wred= 664.6
  wswir=1613.7
  wnir=832.8
  c1 = wnir-wswir = 832.8 - 1613.7 = -780.9
  c2 = wred-wnir  = 664.6 - 832.8 = -168.2
  c3 = wred-wswir = 664.6 - 1613.7 = -949.1
  */
  var fai = image.expression(
      'NIR - ( ( RED * -780.9 + SWIR * -168.2 ) / -949.1 )', {
      'RED': image.select('B4'),
      'NIR': image.select('B8'),
      'SWIR': image.select('B11')}
      ).rename(["FAI"])
  return ee.Image.cat([image, fai]);
};
function remove_all_layers(map){
  var layers = map.layers()
  layers.forEach(function(layer) {
    map.remove(layer)
  })
}
init_site(Object.keys(places)[init_site_id])
/*
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(maps[0].getCenter());
    print(maps[0].getZoom());
  }
});
print(button);
*/