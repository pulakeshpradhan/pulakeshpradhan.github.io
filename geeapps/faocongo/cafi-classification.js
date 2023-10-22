var dem = ui.import && ui.import("dem", "image", {
      "id": "projects/cafi_fao_congo/regional/NASAdem_congo"
    }) || ee.Image("projects/cafi_fao_congo/regional/NASAdem_congo"),
    UCL = ui.import && ui.import("UCL", "image", {
      "id": "projects/cafi_fao_congo/regional/congo_basin_vegetation_UCL"
    }) || ee.Image("projects/cafi_fao_congo/regional/congo_basin_vegetation_UCL"),
    optparam = ui.import && ui.import("optparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "swir1",
          "nir",
          "red"
        ],
        "min": 144,
        "max": 3914,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["swir1","nir","red"],"min":144,"max":3914,"gamma":1},
    jaxaparam = ui.import && ui.import("jaxaparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "fnf_2015"
        ],
        "min": 1,
        "max": 3,
        "palette": [
          "0a7e4e",
          "c8ff95",
          "1043ff"
        ]
      }
    }) || {"opacity":1,"bands":["fnf_2015"],"min":1,"max":3,"palette":["0a7e4e","c8ff95","1043ff"]},
    water = ui.import && ui.import("water", "imageCollection", {
      "id": "JRC/GSW1_3/YearlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_3/YearlyHistory"),
    waterparam = ui.import && ui.import("waterparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "waterClass"
        ],
        "min": 1,
        "max": 3,
        "palette": [
          "dadada",
          "b6ffe4",
          "2b1dff"
        ]
      }
    }) || {"opacity":1,"bands":["waterClass"],"min":1,"max":3,"palette":["dadada","b6ffe4","2b1dff"]},
    fnf2015 = ui.import && ui.import("fnf2015", "image", {
      "id": "projects/cafi_fao_congo/classification/FNF_2015"
    }) || ee.Image("projects/cafi_fao_congo/classification/FNF_2015"),
    fnfparam = ui.import && ui.import("fnfparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 1,
        "max": 3,
        "palette": [
          "20560f",
          "faffcc",
          "0e42ff"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":1,"max":3,"palette":["20560f","faffcc","0e42ff"]},
    FNFJAXA = ui.import && ui.import("FNFJAXA", "image", {
      "id": "projects/cafi_fao_congo/regional/kc_fnf_2015"
    }) || ee.Image("projects/cafi_fao_congo/regional/kc_fnf_2015"),
    optical = ui.import && ui.import("optical", "image", {
      "id": "projects/cafi_fao_congo/imagery/cafi_optical_mosaic_2013_2015"
    }) || ee.Image("projects/cafi_fao_congo/imagery/cafi_optical_mosaic_2013_2015"),
    ALOS = ui.import && ui.import("ALOS", "image", {
      "id": "projects/cafi_fao_congo/imagery/alos_mosaic_2015_quegan_rfdi_masked_texture"
    }) || ee.Image("projects/cafi_fao_congo/imagery/alos_mosaic_2015_quegan_rfdi_masked_texture"),
    lc2015 = ui.import && ui.import("lc2015", "image", {
      "id": "projects/cafi_fao_congo/classification/LC_2015"
    }) || ee.Image("projects/cafi_fao_congo/classification/LC_2015"),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/cafi_fao_congo/aoi/aoi_cafi"
    }) || ee.FeatureCollection("projects/cafi_fao_congo/aoi/aoi_cafi");
var aoi = ee.FeatureCollection(aoi)
Map.centerObject(aoi,6)
var aoi_bb = aoi.geometry().bounds()
//Map.addLayer(aoi_bb, {}, 'bb')
Map.addLayer(aoi, {}, 'aoi')
var classpalette = [
  'darkgreen', // 1- foret dense
  'green', // 2 - forest dense seche
  'limegreen',  // 3 - foret secondaire
   'seagreen', // 4 - foret claire seche
  'mediumaquamarine', //5 submontane
  'darkcyan', //6 montane
  'darkmagenta', // 7 -mangrove
  'teal', //8- foret marecageuse
  'darkseagreen', // 9- foret galeries
  'saddlebrown', //10 plantations
  'DarkOliveGreen',//  11 savanne arboree
  'gold', // 12 - savanne arbustive
  'khaki',  // 13 - savanne herbacee
  'steelblue', //14 -prairie aquatique
  'grey', // 15 - sols nus
  'tan', // 16- terres cultivées
  'maroon', //17- zone baties
  'blue', //18 - eau
  'Moccasin', // 19 - savanne arbustive NF
];
Map.addLayer(optical, optparam, 'Mosaique Optique 2015')
Map.addLayer(ALOS,{min: [0, 0, 1], max: [0.5, 0.15, 15]}, 'Mosaique ALOS 2015', false)
Map.addLayer(lc2015, {min:1, max:19, palette: classpalette}, 'Classification Régionale 2015')
//permanent and seasonal JRC data
var water_area = water.mosaic().clip(aoi_bb)
Map.addLayer(water_area,waterparam, 'JRC water',false)
//foret non-foret
Map.addLayer(FNFJAXA,jaxaparam, 'JAXA Foret/Non-Foret', false)
Map.addLayer(fnf2015,fnfparam, 'CAFI Foret/Non-Foret',false)
////////////////////////////legend
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 4px 0'}, value: '██'}),
      ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')))
  } Map.add(legend); }
var palette = [  
  'darkgreen', // 1- foret dense
  'green', // 2 - forest dense seche
  'limegreen',  // 3 - foret secondaire
  'seagreen', // 4 - foret claire seche
  'cadetblue', //5 submontane
  'mediumaquamarine', //6 montane
  'darkmagenta', // 7 -mangrove
  'teal', //8- foret marecageuse
  '#0C343D', // 9- foret galeries
  //'saddlebrown', //10 plantations
  'DarkOliveGreen',//  10 savanne arboree
  'gold', // 11 - savanne arbustive
  'khaki',  // 12 - savanne herbacee
  'steelblue', //13 -prairie aquatique
  'grey', // 14 - sols nus
  'tan', // 15- terres cultivées
  'maroon', //16- zone baties
  'blue', //17 - eau
  'tan', // 19 - savanne arbustive NF
  ]
var labels = ['1-foret dense','2-foret dense seche','3-foret secondaire','4-foret claire seche','5-foret sub-montagnarde','6-foret montagnarde','7-mangrove','8-foret marecageuse','9-foret galerie','11-savane arboree','12-savanne arbustive', 
'13-savane herbacee','14-prairie aquatique','15-sols nus', '16-terres cultivees','17-zones baties','18-eau','19-savane arbustive (non-foret)'];
add_legend('couverture du sol', labels, palette);
//var style = {
//  'Deep': [{
//      featureType: 'all',
//      stylers: [{ color: '#ffffff'}]
//  }]
//};
//Map.setOptions(null, style).setControlVisibility(null, null, false, false, false)