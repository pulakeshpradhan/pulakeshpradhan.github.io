var optparam = ui.import && ui.import("optparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "swir1",
          "nir",
          "red"
        ],
        "min": 190,
        "max": 3719,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["swir1","nir","red"],"min":190,"max":3719,"gamma":1},
    fnfparam = ui.import && ui.import("fnfparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "fnf_2015"
        ],
        "min": 1,
        "max": 3,
        "palette": [
          "06800f",
          "ffe7b1",
          "1b18ff"
        ]
      }
    }) || {"opacity":1,"bands":["fnf_2015"],"min":1,"max":3,"palette":["06800f","ffe7b1","1b18ff"]},
    tpi = ui.import && ui.import("tpi", "image", {
      "id": "CSP/ERGo/1_0/Global/SRTM_mTPI"
    }) || ee.Image("CSP/ERGo/1_0/Global/SRTM_mTPI"),
    treecover = ui.import && ui.import("treecover", "image", {
      "id": "projects/cafi_fao_congo/regional/treecover_2015_30m"
    }) || ee.Image("projects/cafi_fao_congo/regional/treecover_2015_30m"),
    fnf2015 = ui.import && ui.import("fnf2015", "image", {
      "id": "projects/cafi_fao_congo/classification/FNF_2015"
    }) || ee.Image("projects/cafi_fao_congo/classification/FNF_2015"),
    cafifnfparam = ui.import && ui.import("cafifnfparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 1,
        "max": 3,
        "palette": [
          "166c1d",
          "fbffba",
          "2132ff"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":1,"max":3,"palette":["166c1d","fbffba","2132ff"]},
    palmoil2019 = ui.import && ui.import("palmoil2019", "image", {
      "id": "projects/cafi_fao_congo/regional/palm_oil_2019"
    }) || ee.Image("projects/cafi_fao_congo/regional/palm_oil_2019"),
    histo = ui.import && ui.import("histo", "image", {
      "id": "projects/cafi_fao_congo/regional/histosols_cifor"
    }) || ee.Image("projects/cafi_fao_congo/regional/histosols_cifor"),
    waterparam = ui.import && ui.import("waterparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "waterClass"
        ],
        "max": 3,
        "palette": [
          "fffde7",
          "27ffff",
          "1d24ff"
        ]
      }
    }) || {"opacity":1,"bands":["waterClass"],"max":3,"palette":["fffde7","27ffff","1d24ff"]},
    pas = ui.import && ui.import("pas", "table", {
      "id": "projects/cafi_fao_congo/regional/PAs_Congo_Basin"
    }) || ee.FeatureCollection("projects/cafi_fao_congo/regional/PAs_Congo_Basin"),
    raddparam = ui.import && ui.import("raddparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "Date"
        ],
        "min": 19000,
        "max": 20366,
        "palette": [
          "ffb76c",
          "ff0404"
        ]
      }
    }) || {"opacity":1,"bands":["Date"],"min":19000,"max":20366,"palette":["ffb76c","ff0404"]},
    canopy = ui.import && ui.import("canopy", "image", {
      "id": "projects/cafi_fao_congo/regional/canopy_height_2019"
    }) || ee.Image("projects/cafi_fao_congo/regional/canopy_height_2019"),
    planet = ui.import && ui.import("planet", "imageCollection", {
      "id": "projects/planet-nicfi/assets/basemaps/africa"
    }) || ee.ImageCollection("projects/planet-nicfi/assets/basemaps/africa"),
    JRCparam = ui.import && ui.import("JRCparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1",
          "b2",
          "b3"
        ],
        "min": 9,
        "max": 203,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b1","b2","b3"],"min":9,"max":203,"gamma":1},
    tiling = ui.import && ui.import("tiling", "table", {
      "id": "projects/cafi_fao_congo/regional/cafi_tiling_100km"
    }) || ee.FeatureCollection("projects/cafi_fao_congo/regional/cafi_tiling_100km"),
    validation = ui.import && ui.import("validation", "table", {
      "id": "projects/cafi_fao_congo/change/ceo_cafi_dd_map_validation_points"
    }) || ee.FeatureCollection("projects/cafi_fao_congo/change/ceo_cafi_dd_map_validation_points"),
    burnedparam = ui.import && ui.import("burnedparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "min": 16,
        "max": 19,
        "palette": [
          "a5ffea",
          "85c1ff",
          "d085ff",
          "d427ff"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"min":16,"max":19,"palette":["a5ffea","85c1ff","d085ff","d427ff"]},
    routes = ui.import && ui.import("routes", "table", {
      "id": "projects/cafi_fao_congo/regional/roads_Kleinschroth_etal_2019"
    }) || ee.FeatureCollection("projects/cafi_fao_congo/regional/roads_Kleinschroth_etal_2019"),
    crops2015 = ui.import && ui.import("crops2015", "image", {
      "id": "projects/cafi_fao_congo/regional/croplands2015"
    }) || ee.Image("projects/cafi_fao_congo/regional/croplands2015"),
    crops2019 = ui.import && ui.import("crops2019", "image", {
      "id": "projects/cafi_fao_congo/regional/croplands2019"
    }) || ee.Image("projects/cafi_fao_congo/regional/croplands2019"),
    S2_2020 = ui.import && ui.import("S2_2020", "image", {
      "id": "projects/cafi_fao_congo/imagery/S2_2020_JRC"
    }) || ee.Image("projects/cafi_fao_congo/imagery/S2_2020_JRC"),
    frag2015 = ui.import && ui.import("frag2015", "image", {
      "id": "projects/cafi_fao_congo/classification/fragmentation_2015"
    }) || ee.Image("projects/cafi_fao_congo/classification/fragmentation_2015"),
    worldcover = ui.import && ui.import("worldcover", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100"),
    access = ui.import && ui.import("access", "image", {
      "id": "projects/cafi_fao_congo/modeling/accessibility_2015"
    }) || ee.Image("projects/cafi_fao_congo/modeling/accessibility_2015"),
    bfast_change_mask = ui.import && ui.import("bfast_change_mask", "image", {
      "id": "projects/cafi_fao_congo/change/bfast_change_forest_mask"
    }) || ee.Image("projects/cafi_fao_congo/change/bfast_change_forest_mask"),
    cusum_change_mask = ui.import && ui.import("cusum_change_mask", "image", {
      "id": "projects/cafi_fao_congo/change/cusum_change_forest_mask"
    }) || ee.Image("projects/cafi_fao_congo/change/cusum_change_forest_mask"),
    admin2 = ui.import && ui.import("admin2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    changemap = ui.import && ui.import("changemap", "image", {
      "id": "projects/cafi_fao_congo/change/cafi_change_map"
    }) || ee.Image("projects/cafi_fao_congo/change/cafi_change_map"),
    lc2015 = ui.import && ui.import("lc2015", "image", {
      "id": "projects/cafi_fao_congo/classification/LC_2015"
    }) || ee.Image("projects/cafi_fao_congo/classification/LC_2015"),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/cafi_fao_congo/aoi/aoi_cafi"
    }) || ee.FeatureCollection("projects/cafi_fao_congo/aoi/aoi_cafi"),
    tmfDEF = ui.import && ui.import("tmfDEF", "image", {
      "id": "projects/cafi_fao_congo/change/TMF_Def_2016_2020"
    }) || ee.Image("projects/cafi_fao_congo/change/TMF_Def_2016_2020"),
    tmfDEG = ui.import && ui.import("tmfDEG", "image", {
      "id": "projects/cafi_fao_congo/change/TMF_Deg_2016_2020"
    }) || ee.Image("projects/cafi_fao_congo/change/TMF_Deg_2016_2020"),
    burned = ui.import && ui.import("burned", "image", {
      "id": "projects/cafi_fao_congo/regional/burned_area_2016_2022"
    }) || ee.Image("projects/cafi_fao_congo/regional/burned_area_2016_2022"),
    condition = ui.import && ui.import("condition", "image", {
      "id": "projects/cafi_fao_congo/regional/Congo_Basin_Condition"
    }) || ee.Image("projects/cafi_fao_congo/regional/Congo_Basin_Condition");
https://maps.gstatic.com/mapfiles/mv/imgs8.pngvar cafi = ee.FeatureCollection('projects/cafi_fao_congo/regional/congo_basin_lsib')
var JAXAfnf = ee.Image('projects/cafi_fao_congo/regional/kc_fnf_2015')
var ucl = ee.Image('projects/cafi_fao_congo/regional/congo_basin_vegetation_UCL')
var radd = ee.Image('projects/cafi_fao_congo/regional/radd_alerts_2019_2020')
var NASAdem = ee.Image("NASA/NASADEM_HGT/001")
var optical2015 = ee.Image('projects/cafi_fao_congo/imagery/cafi_optical_mosaic_2013_2015')
var palettes = require('users/gena/packages:palettes');
var cafi = aoi
//GUI PANEL
Map.style().set('cursor', 'crosshair');
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Évaluation de la déforestation et de la dégradation des forêts et des moteurs directs associés à laide de SEPAL', {fontSize: '26px', color: 'grey'});
var text = ui.Label(
    'Inventaire de données régionales qui viennent du projet et nos partenaires',
    {fontSize: '14px'});
var panel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(panel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Projet CAFI/FAO Déforestation, dégradation et moteurs directs associes', {},
    'http://www.fao.org/redd/news/deforestation-et-degradation-en-afrique-centrale/fr/');
var linkPanel = ui.Panel(
    [ui.Label('pour en savoir plus:', {fontWeight: 'bold'}), link]);
panel.add(linkPanel);
var background = ee.Image('users/gena/NE1_HR_LC_SR_W').visualize({})
var black = ee.Image(1).visualize({opacity: 0.95, palette: ['000000'], forceRgbOutput: true})  
var white = ee.Image(1).visualize({opacity: 1, palette: ['FFFFFF'], forceRgbOutput: true})  
Map.addLayer(black,{}, 'fond de carte noire')
Map.addLayer(white,{}, 'fond de carte blanc',false)
Map.centerObject(aoi, 6)
Map.addLayer(tiling,{}, 'Tuiles 100km',false)
var uclpalette = palettes.colorbrewer.Set1[9]
Map.addLayer(optical2015.clip(cafi), optparam, 'Mosaique Optique Landsat (2015)')
Map.addLayer(S2_2020,JRCparam,'Sentinel-2 2020 (JRC)', false)
var alos = ee.Image('projects/cafi_fao_congo/imagery/alos_mosaic_2015_quegan_rfdi_masked_texture')
Map.addLayer(alos, {min: [0, 0, 1], max: [0.5, 0.15, 15]}, 'Mosaique ALOS (2015)',false)
//var planet2020 = planet.filterDate('2020-01-01','2020-12-31').filterBounds(aoi)
//Map.addLayer(planet2020.median(), {gain: 0.15, bands:["R", "G", "B"]}, 'Planet Mosaic 2020',false)
var elevpalette = palettes.crameri.batlow[25]
Map.addLayer(NASAdem.select('elevation').clip(cafi), {min:0, max:3300, palette: elevpalette}, 'NASA DEM', false)
Map.addLayer(tpi.clip(cafi), {min:-7, max:11, palette: uclpalette}, 'Index Topographique (NASA)', false)
var canopypalette = palettes.cmocean.Speed[7]
Map.addLayer(canopy,{min:0, max:60, palette:canopypalette}, 'Hauteur de canopée 2019', false)
var conditionpalette = palettes.cmocean.Speed[7]
Map.addLayer(condition,{min:0, max:100, palette:conditionpalette}, 'Forest Condition', false)
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
  'tan', // 19 - savanne arbustive NF
];
var ddpalette = [
                    //'black',        // 0- no data
                    'green',    // 1- foret dense
                    'green',        // 2- forest dense seche
                    'green',    // 3- foret secondaire
                    'green',     // 4- foret claire seche
                    'green',    // 5- submontane
                    'green',    // 6- montane
                    'green',  // 7- mangrove
                    'green',       // 8- foret marecageuse
                    'green', // 9- foret galeries
                    'green',  // 10 plantations
                    'green',    // 11 savanne arboree
                    'green',         // 12 savanne arbustive
                    'grey',        // 13 savanne herbacee
                    'grey',    // 14 prairie aquatique
                    'grey',         // 15 sols nus
                    'grey',          // 16 terres cultivées
                    'grey',       // 17 zone baties
                    'blue'  ,       // 18 eau
                    'grey',     //savanes arbustives NF
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange', //100-154 degradation 
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange',
                    'orange','orange','orange','orange','orange','orange',
                    'red','red','red','red','red','red','red','red','red','red','red','red',          //200-254 deforestation
                    'red','red','red','red','red','red','red','red','red','red','red','red',
                    'red','red','red','red','red','red','red','red','red','red','red','red',          //200-254 deforestation
                    'red','red','red','red','red','red','red','red','red','red','red','red',
                    'red','red','red','red','red','red'
];
var treecoverpalette =  palettes.colorbrewer.Greens[9]
var worldcoverpalette =
['#006400',
'#ffbb22',
'#ffff4c',
'#f096ff',
'#fa0000',
'#b4b4b4',
'#f0f0f0',
'#0064c8',
'#0096a0',
'#00cf75',
'#fae6a0'
]
//1=forest, 2=nonforest 3=water 4 =deg 5=def
var change_water = changemap.eq(18).multiply(3)
var change_def = changemap.gte(200).multiply(5)
var change_deg = changemap.gte(100).and(changemap.lt(200)).multiply(4)
var change_forest = fnf2015.eq(1).and(change_deg.eq(0).and(change_def.eq(0)))
var change_nf = fnf2015.eq(2).and(change_deg.eq(0).and(change_def.eq(0))).multiply(2)
var changemap_rec = change_forest.add(change_nf).add(change_water).add(change_def).add(change_deg)
var changemap_rec = changemap_rec.selfMask()
Map.addLayer(ucl.selfMask(), {min:0, max: 20, palette: uclpalette}, 'Carte de Végétation de UCL (2010)', false)
var worldcover_cafi = worldcover.mosaic()
Map.addLayer(worldcover_cafi.clip(aoi),{min:10,max:100, palette: worldcoverpalette},'ESA World Cover 2020',false)
Map.addLayer(treecover,{min:0, max:100, palette:treecoverpalette}, '% treecover',false)
Map.addLayer(histo, {}, 'Histosols', false)
Map.addLayer(lc2015, {min:1, max:19, palette: classpalette}, 'Classification CAFI (2015)')
Map.addLayer(fnf2015, cafifnfparam, 'CAFI Foret/Non-Foret (2015)',false)
Map.addLayer(frag2015,{min:1,max:6,palette:['brown','yellow','orange','lightgreen','green','grey']}, 'Fragmentation 2015',false)
Map.addLayer(JAXAfnf, fnfparam, 'JAXA Foret/Non-Foret (2015)', false)
Map.addLayer(burned,burnedparam,'Détections de foret brulée MODIS (2015-2020',false)
Map.addLayer(access.clip(aoi),{min:0, max:1000, opacity:0.7, palette:['FFFACD', 'CD8500', '8A360F','68228B']}, 'Accessibilité au villes (2015)',false)
Map.addLayer(crops2015.selfMask(),{palette:['#89584E']},'terres cultivées (2015)',false)
Map.addLayer(crops2019.selfMask(),{palette:['#995244']},'terres cultivées (2019)',false)
Map.addLayer(radd, raddparam, 'Alertes RADD - 2019-2020',false)
Map.addLayer(tmfDEF,{min:2016, max:2020, palette: ["fcff1f","ff7939","ff510e"]},'TMF Déforestation (2016-2020)',false)
Map.addLayer(tmfDEG,{min:2016, max:2020, palette: ["ffdcc8","ff936a","ffb204"]}, 'TMF Dégradation (2016-2020)',false)
Map.addLayer(bfast_change_mask, {min:1,max:5,palette:['green','grey','blue','red','orange']},'CAFI/FAO Stratification BFAST',false)
Map.addLayer(cusum_change_mask, {min:1,max:5,palette:['green','grey','blue','red']},'CAFI/FAO Stratification CUSUM',false)
Map.addLayer(changemap_rec, {min:1,max:5, palette: ['green','grey','blue','orange','red']},'CAFI/FAO carte de déforestation et dégradation')
var flipalette= palettes.crameri.bamako[10].reverse()
Map.addLayer(palmoil2019, {}, 'Plantations huile de palme (2019) de Descals et al., 2021', false)
var water = ee.ImageCollection("JRC/GSW1_3/YearlyHistory")
var water_area = water.mosaic().clip(cafi)//.selfMask()
Map.addLayer(water_area, waterparam, 'Eau surfacique (JRC)', false)
// routes
var emptyroads = ee.Image().byte();
var roads = emptyroads.paint({
  featureCollection: routes,
  color: 1,
  width: 1
});
Map.addLayer(roads,{color: '#505050', opacity:0.6}, 'Routes (Kleinschroth et al., 2019',false)
//level 2 admin
var admin = emptyroads.paint({
  featureCollection: admin2,
  color: 0,
  width: 1
});
var admin = admin.clip(aoi)
Map.addLayer(admin, {color: "3d3d3d", opacity:0.5}, 'Limites Provinces');
//pays
var emptycafi = ee.Image().byte();
var pays = emptycafi.paint({
  featureCollection: cafi,
  color: 0,
  width: 2
});
Map.addLayer(pays, {}, 'Région de létude CAFI/FAO')
Map.addLayer(pas,{color: '#0b9e70'}, 'Aires Protégées', false)
Map.addLayer(validation,{color: 'blue'}, 'points de validation moteurs',false )