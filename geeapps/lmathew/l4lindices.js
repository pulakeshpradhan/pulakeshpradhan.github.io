var BSIparam = ui.import && ui.import("BSIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "bsi"
        ],
        "min": 9.901309494966227,
        "max": 89.91521631163606,
        "palette": [
          "fffae4",
          "797e2f"
        ]
      }
    }) || {"opacity":1,"bands":["bsi"],"min":9.901309494966227,"max":89.91521631163606,"palette":["fffae4","797e2f"]},
    AVIparam = ui.import && ui.import("AVIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "avi"
        ],
        "min": 0.052439061178276646,
        "max": 0.32212631210511006,
        "palette": [
          "7ee1ff",
          "2395a7"
        ]
      }
    }) || {"opacity":1,"bands":["avi"],"min":0.052439061178276646,"max":0.32212631210511006,"palette":["7ee1ff","2395a7"]},
    VDparam = ui.import && ui.import("VDparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "pc1"
        ],
        "min": 11.515122225460857,
        "max": 94.90028292758151,
        "palette": [
          "ead8ff",
          "a15aff"
        ]
      }
    }) || {"opacity":1,"bands":["pc1"],"min":11.515122225460857,"max":94.90028292758151,"palette":["ead8ff","a15aff"]},
    SIparam = ui.import && ui.import("SIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "si"
        ],
        "min": 9.987833742627398,
        "max": 95.1447729019521,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["si"],"min":9.987833742627398,"max":95.1447729019521,"gamma":1},
    SSIparam = ui.import && ui.import("SSIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "pc1"
        ],
        "min": 5.975078021326012,
        "max": 95.25634413774992,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["pc1"],"min":5.975078021326012,"max":95.25634413774992,"gamma":1},
    FCDparam = ui.import && ui.import("FCDparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "FCD"
        ],
        "max": 100,
        "palette": [
          "ff3508",
          "d8ff04",
          "06700e"
        ]
      }
    }) || {"opacity":1,"bands":["FCD"],"max":100,"palette":["ff3508","d8ff04","06700e"]},
    TIparam = ui.import && ui.import("TIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "min": 394.48348699325754,
        "max": 402.9623039696998,
        "palette": [
          "ffe7e4",
          "ff8e62"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"min":394.48348699325754,"max":402.9623039696998,"palette":["ffe7e4","ff8e62"]},
    mk = ui.import && ui.import("mk", "table", {
      "id": "users/lmathew/Kilimanjaro/mk_radius_50km"
    }) || ee.FeatureCollection("users/lmathew/Kilimanjaro/mk_radius_50km"),
    urt_eez = ui.import && ui.import("urt_eez", "table", {
      "id": "users/lmathew/Share/TZA"
    }) || ee.FeatureCollection("users/lmathew/Share/TZA"),
    mikoa = ui.import && ui.import("mikoa", "table", {
      "id": "users/lmathew/tza_regions"
    }) || ee.FeatureCollection("users/lmathew/tza_regions"),
    mawilaya = ui.import && ui.import("mawilaya", "table", {
      "id": "users/lmathew/tza_districts"
    }) || ee.FeatureCollection("users/lmathew/tza_districts"),
    urt_wards = ui.import && ui.import("urt_wards", "table", {
      "id": "users/lmathew/tza_kata"
    }) || ee.FeatureCollection("users/lmathew/tza_kata"),
    vlfr = ui.import && ui.import("vlfr", "table", {
      "id": "users/lmathew/Forest/TZA_VLFR"
    }) || ee.FeatureCollection("users/lmathew/Forest/TZA_VLFR"),
    cfma = ui.import && ui.import("cfma", "table", {
      "id": "users/lmathew/Seascape/CFMA-02-2018"
    }) || ee.FeatureCollection("users/lmathew/Seascape/CFMA-02-2018"),
    cwma = ui.import && ui.import("cwma", "table", {
      "id": "users/lmathew/TZA-WMA"
    }) || ee.FeatureCollection("users/lmathew/TZA-WMA"),
    wdpa = ui.import && ui.import("wdpa", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    lsib = ui.import && ui.import("lsib", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    cwua = ui.import && ui.import("cwua", "table", {
      "id": "users/lmathew/tza_basins"
    }) || ee.FeatureCollection("users/lmathew/tza_basins"),
    operational_landscape = ui.import && ui.import("operational_landscape", "table", {
      "id": "users/lmathew/ROA/wwf_africa_operational_landscape"
    }) || ee.FeatureCollection("users/lmathew/ROA/wwf_africa_operational_landscape"),
    l4l_utl_geoscope = ui.import && ui.import("l4l_utl_geoscope", "table", {
      "id": "users/lmathew/SOKNOT/L4L_Geoscope_4326"
    }) || ee.FeatureCollection("users/lmathew/SOKNOT/L4L_Geoscope_4326"),
    nchi = ui.import && ui.import("nchi", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    s2sr = ui.import && ui.import("s2sr", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    l4l_utl_villages = ui.import && ui.import("l4l_utl_villages", "table", {
      "id": "users/lmathew/SOKNOT/l4l_Villages"
    }) || ee.FeatureCollection("users/lmathew/SOKNOT/l4l_Villages"),
    l4l_utl_tz = ui.import && ui.import("l4l_utl_tz", "table", {
      "id": "users/lmathew/SOKNOT/l4l_geoscope_utl_tz"
    }) || ee.FeatureCollection("users/lmathew/SOKNOT/l4l_geoscope_utl_tz"),
    l8sr = ui.import && ui.import("l8sr", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T2_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T2_L2"),
    l8toa = ui.import && ui.import("l8toa", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA"),
    miradi = ui.import && ui.import("miradi", "table", {
      "id": "projects/wwftz-landscape/assets/Projects/projects_areas_082022"
    }) || ee.FeatureCollection("projects/wwftz-landscape/assets/Projects/projects_areas_082022"),
    miradi_vijiji = ui.import && ui.import("miradi_vijiji", "table", {
      "id": "projects/wwftz-landscape/assets/Projects/projects_areas_villages_082022"
    }) || ee.FeatureCollection("projects/wwftz-landscape/assets/Projects/projects_areas_villages_082022"),
    firms = ui.import && ui.import("firms", "imageCollection", {
      "id": "FIRMS"
    }) || ee.ImageCollection("FIRMS"),
    s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
var palettes = require('users/gena/packages:palettes');
//----------------------------------------------------------------------------------------
//=======================================================================================
//Dates
var yeara = ee.Date('2018-01-01');
var yearb = ee.Date('2022-12-31');
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '250px');
// Create an intro panel with labels.
var intro = ui.Panel([ ui.Label({ value: 'Spatial-Temporal Monitoring from Space', style: {fontSize: '20px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(intro);
//thank you Olha Danylo for the help!!
var map = ui.Map(); 
var geom = null;
var geom_cbo = null; 
var geomjina = '';
var mwaka = '';
var mwaka_mwanzo = '';
var mwaka_mwisho = '';
var aina;
map.centerObject(urt_eez,6);
//Graph Panel
var panel_grafu = ui.Panel({ style: { width: '350px',position: 'top-right', padding: '10px 10px' } });
var panel_takwimu = ui.Panel({ style: { width: '350px',position: 'bottom-left', padding: '10px 10px' } });
map.add(panel_grafu);
map.add(panel_takwimu);
// Separator
var kitenganishia = ui.Label({ value: '=============',style: {fontSize: '5px', stretch:'horizontal'}});
var kitenganishib = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var kitenganishib_text = ui.Label({ value: 'Select Project',style: {fontSize: '15px', stretch:'horizontal'}});
var kitenganishic = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var kitenganishic_text = ui.Label({ value: 'Select Village/Ward',style: {fontSize: '15px', stretch:'horizontal'}});
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
// Load a Countries Layer and Protected areas.
  var empty = ee.Image().byte(); //TZ	TZA	834
  var countries = nchi.filter(ee.Filter.eq('country_co', 'TZ')).merge(nchi.filter(ee.Filter.eq('country_co', 'KE')));
  var TZ_KE = empty.paint({featureCollection: countries, color: 1, width: 5 });
  var wdpa_a = wdpa.filter(ee.Filter.eq('PARENT_ISO', 'TZA')).merge(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'KEN')));
  var wdpa_b = empty.paint({featureCollection: wdpa_a, color: 1, width: 2 });
//----------------------------------------------------------------------------------------------------------------------------------------------
// Load Projects Layers
//Projects
  var mradi = miradi;
  var mradi_kijiji = miradi_vijiji;
//----------------------------------------------------------------------------------------------------------------------------------------------
// Load a Global Layers
//JRC Water
  var gsw = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').clip(countries);
  var maji = gsw.select('occurrence').unmask(ee.Image(0)).lte(0)
//Elevations
  var dtm = ee.Image("USGS/GMTED2010").clip(countries);
  var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
  var visParams = {min: 1, max: 3000, palette: elevationPalette};
//Feature View Free Flowing Rivers
  var mito = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers');
  var mito_nchi = mito.filter(ee.Filter.eq('COUNTRY', 'Tanzania'))
                      .merge(mito.filter(ee.Filter.eq('COUNTRY', 'Kenya')));
  var mito_clip = ee.Image().byte().paint(mito_nchi, 'RIV_ORD', 2);
  var mitoVisParams = { min: 1,max: 10,palette: ['08519c', '3182bd', '6baed6', 'bdd7e7', 'eff3ff'] };
//Buildings
  var majengo = ee.FeatureCollection('GOOGLE/Research/open-buildings/v2/polygons').filterBounds(countries);
  var majengo_060_065 = majengo.filter('confidence >= 0.60 && confidence < 0.65');
  var majengo_065_070 = majengo.filter('confidence >= 0.65 && confidence < 0.70');
  var majengo_gte_070 = majengo.filter('confidence >= 0.70');
//----------------------------------------------------------------------------------------------------------------------------------------------
//Display  Data
map.addLayer(dtm,visParams, "Terrain",0);
map.addLayer(mito_clip, mitoVisParams, 'Free flowing rivers',0);
map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
map.addLayer(wdpa_b,{palette: '00ff00'},'TZA-KEN WDPAs',0); 
map.addLayer(majengo_060_065, {color: 'FF0000'}, 'Buildings confidence [0.60; 0.65)',0);
map.addLayer(majengo_065_070, {color: 'FFFF00'}, 'Buildings confidence [0.65; 0.70)',0);
map.addLayer(majengo_gte_070, {color: '00FF00'}, 'Buildings confidence >= 0.70',0);
map.addLayer(TZ_KE,{palette: '555555'},'Tanzania + Kenya',1);
map.setOptions('SATELLITE');
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//https://github.com/gee-community/ee-palettes
var palette_ndvi = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//var palette_ndwi = ['00FFFF', '0000FF'];
//palettes.misc.tol_rainbow[7];
var palette_ndwi = palettes.colorbrewer.BuGn[3,4,5,6,7,8,9];
var palette_ndwi = palettes.colorbrewer.Blues[3,4,5,6,7,8,9];
var palette_ndmi = palettes.colorbrewer.RdBu[3,4,5,6,7,8,9,10,11];
var palette_nbr = palettes.colorbrewer.Reds[3,4,5,6,7,8,9];
var palette_nddi = palettes.colorbrewer.YlOrBr[3,4,5,6,7,8,9];
var palette_fires = palettes.colorbrewer.YlOrRd[3,4,5,6,7,8,9].reverse();
var firesVis = {min: 325.0, max: 400.0, palette: ['red', 'orange', 'yellow'],};
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//Sentinel 2 Images - 
//var s2 = ee.ImageCollection('COPERNICUS/S2_SR');
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");
//--------------------------------------------------------------------------
//Remove Clouds
function maskS2clouds(image)
{
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).set('system:time_start', image.get('system:time_start'));
}
//--------------------------------------------------------------------------
//INDICES
//https://custom-scripts.sentinel-hub.com/custom-scripts/#sentinel-2
function addIndices(img)
{
  img = img.addBands(img.normalizedDifference(['B8', 'B4']).rename('NDVI')); //NDVI
  img = img.addBands(img.normalizedDifference(['B3', 'B8']).rename('NDWI')); //NDWI
  img = img.addBands(img.normalizedDifference(['B8', 'B12']).rename('NBR')); //NBR
  img = img.addBands(img.normalizedDifference(['B8', 'B11']).rename('NDMI')); //NDMI
  //NDDI
  var vi = img.normalizedDifference(['B8', 'B4']).rename('NDVI'); //ndvi(image)
  var wi = img.normalizedDifference(['B3', 'B8']).rename('NDWI'); //ndwi(image);
  var di = vi.subtract(wi).divide(vi.add(wi));
  img = img.addBands(di.rename('NDDI')); //NDDI
  return img;
}
//--------------------------------------------------------------------------
//Function for acquiring Sentinel 2 SR image collection
function getImageCollection(studyArea,startDate,endDate)
{
  return s2.filterBounds(studyArea)
            .filterDate(startDate,endDate)
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
            .map(maskS2clouds).map(addIndices);
}
//-----------------------------------------------------------------------------------------------------
//Landsat 8 - USGS Landsat 8 Level 2, Collection 2, Tier 1 (SR)
var l8sr_t2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');
var bandNamesLandsat = ee.List(['blue','green','red','nir','swir1','temp','swir2']);
var sensorBandDictLandsat8sr = ee.List(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','ST_B10','SR_B7']);
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//-----------------------------------------------------------------------------------------------------
// A function that scales and masks Landsat 8 (C2) surface reflectance images.
function prepSrL8(image)
{
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var getFactorImg = function(factorNames)
  {
    var factorList = image.toDictionary().select(factorNames).values();
    return ee.Image.constant(factorList);
  };
  var scaleImg = getFactorImg(['REFLECTANCE_MULT_BAND_.|TEMPERATURE_MULT_BAND_ST_B10']);
  var offsetImg = getFactorImg(['REFLECTANCE_ADD_BAND_.|TEMPERATURE_ADD_BAND_ST_B10']);
  var scaled = image.select('SR_B.|ST_B10').multiply(scaleImg).add(offsetImg);
  // Replace original bands with scaled bands and apply masks.
  return image.addBands(scaled, null, true).updateMask(qaMask).updateMask(saturationMask);
}
//-----------------------------------------------------------------------------------------------------
//Function for acquiring Landsat 8 SR image collection
function l8toa_image(studyArea,startDate,endDate)
{
  return l8toa.filterDate(startDate,endDate).filterBounds(studyArea).select(['B10'], ['kelvin']);
}               
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
function createLandsatCollection(params)
{
  var defaultParams = {
    region: Map.getBounds(true), 
    start: '1982-01-01', 
    end: formatDate(new Date()), 
    mapImage: function (image) { return image }
  }
  params = mergeObjects([defaultParams, params])
  var filter = ee.Filter.and(ee.Filter.bounds(params.region),ee.Filter.date(params.start, params.end )  )
  var l4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR').merge(ee.ImageCollection('LANDSAT/LT04/C01/T2_SR'))
                  .filter(filter).select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'], ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa'])
  var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').merge(ee.ImageCollection('LANDSAT/LT05/C01/T2_SR'))
                  .filter(filter).select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa'])
  var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').merge(ee.ImageCollection('LANDSAT/LE07/C01/T2_SR'))
                  .filter(filter).select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa'])
  var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').merge(ee.ImageCollection('LANDSAT/LC08/C01/T2_SR'))
                  .filter(filter).select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'],['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'pixel_qa'])
  return l4.merge(l5).merge(l7).merge(l8).map(mapImage).sort('system:time_start')
  function mapImage(image){ return excludeBand('pixel_qa',  mask( params.mapImage(image)).clip(params.region) ) }
  function mask(image)
  { 
    var free = image.select('pixel_qa').bitwiseAnd(2)
    var water = image.select('pixel_qa').bitwiseAnd(4)
    return image.updateMask(free.or(water))
  }
  function excludeBand(bandName, image)
  {
    var bandNames = image.bandNames()
    var bandIndexes = ee.List.sequence(0, bandNames.size().subtract(1)).filter(ee.Filter.neq('item', bandNames.indexOf(bandName)))
    return image.select(bandIndexes)
  }
  function formatDate(date)
  {
    var d = new Date(date),month = '' + (d.getMonth() + 1),day = '' + d.getDate(),year = d.getFullYear()
    if (month.length < 2) 
        month = '0' + month
    if (day.length < 2) 
        day = '0' + day
    return [year, month, day].join('-')
  }
  function mergeObjects(objects) 
  {
    return objects.reduce(function (acc, o)
    {
      for (var a in o) { acc[a] = o[a] }
      return acc
      }, {})
  }
}  
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
//Function for acquiring Landsat TOA image collection
function getLS8ImageCollection(studyArea,startDate,endDate)
{
  //var dataset = l8sr_t2.map(applyScaleFactors);
  var dataset = l8sr_t2.map(prepSrL8)
  var l8sr = dataset.filterDate(startDate,endDate).filterBounds(studyArea);//.select(sensorBandDictLandsat8sr,bandNamesLandsat);
  return l8sr
}
//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
//https://kaflekrishna.com.np/blog-detail/calculating-different-vegetation-indices-google-earth-engine-sentinel-2-images/
function L4L_Indices(startYear,endYear,eneo,jina,type)
{
  var year = mwaka; 
  var AoI = eneo.geometry();
  Map.centerObject(AoI, 8);
  //----------------------------------------------------------------------------------------------------------
  var index = ee.Image().byte();
  var index_to_jpeg = index.visualize();
  var indexJ = "";
  var indexI = '';
  //Sentinel 2
  var s2sr = getImageCollection(eneo,startYear,endYear);
  var s2_vis = { min: 0.0, max: 0.3, bands: ['B4', 'B3', 'B2'], };
  map.addLayer(s2sr.median().clip(eneo),s2_vis, 'Sentinel 2 SR (' + startYear + ' to ' + endYear + ')', 0);
  if(type == "NDVI")
  {
    var index = s2sr.median().clip(eneo).select('NDVI');
    indexI = 'NDVI';
    indexJ = "NDVI";
    var index_to_jpeg = index.visualize({bands:indexI, min:-1, max:1, palette: palette_ndvi, forceRgbOutput:true});
    map.addLayer(index,{min:-1, max:1, palette: palette_ndvi}, 'NDVI', 1);
  }
  else if(type == "NDWI")
  {
    var index = s2sr.median().clip(eneo).select('NDWI');
    indexI = 'NDWI';
    indexJ = "NDWI";
    var index_to_jpeg = index.visualize({bands:'NDWI',min:-1, max:1, palette: palette_ndwi, forceRgbOutput:true});
    map.addLayer(index,{min:-1, max:1, palette: palette_ndwi}, 'NDWI', 1);
  }
  else if(type == "NDMI")
  {
    var index = s2sr.median().clip(eneo).select('NDMI');
    indexI = 'NDMI';
    indexJ = "NDMI";
    var index_to_jpeg = index.visualize({bands:'NDMI',min:-1, max:1, palette: palette_ndwi, forceRgbOutput:true});
    map.addLayer(index,{min:-1, max:1, palette: palette_ndmi}, 'NDMI', 1);
  }
  else if(type == "NDDI")
  {
    var index = s2sr.median().clip(eneo).select('NDDI');
    indexI = 'NDDI';
    indexJ = "NDDI";
    var index_to_jpeg = index.visualize({bands:'NDDI', min:-1, max:1, palette: palette_nddi, forceRgbOutput:true});
    map.addLayer(index,{min:-1, max:1, palette: palette_nddi}, 'NDDI', 1);
  }
  else if(type == "NBR")
  {
    var index = s2sr.median().clip(eneo).select('NBR');;
    indexI = 'NBR';
    indexJ = "NBR";
    var index_to_jpeg = index.visualize({bands:'NBR', min:-1, max:1, palette: palette_nbr, forceRgbOutput:true});
    map.addLayer(index,{min:-1, max:1, palette: palette_nbr}, 'NBR', 1);
  }
  //Thermal hotspots
  else if(type == "Thermal Hotspots")
  {
    //Landsat 8
    var ls8sr = getLS8ImageCollection(eneo,startYear,endYear).select('ST_B10');
    var kelvin = ls8sr.median().clip(eneo);
    var hotspots = kelvin.rename('Hotspots');
    var hotspots_gt50 = kelvin.gte(323.15).selfMask().rename('Hotspots-50');
    var hotspots_gt40 = kelvin.gte(313.15).selfMask().rename('Hotspots-40');
    var hotspots_gt35 = kelvin.gte(308.15).selfMask().rename('Hotspots-35');
    var hotspots_gt30 = kelvin.gte(303.15).selfMask().rename('Hotspots-30');
    map.addLayer(hotspots_gt50, {palette: 'FF0000'}, 'Hotspots > 323.15K(50C)', 0);
    map.addLayer(hotspots_gt40, {palette: 'FF0000'}, 'Hotspots > 313.15K(40C)', 0);
    map.addLayer(hotspots_gt35, {palette: 'FF0000'}, 'Hotspots > 308.15K(35C)', 0);
    map.addLayer(hotspots_gt30, {palette: 'FF0000'}, 'Hotspots > 303.15K(30C)', 0);
    map.addLayer(hotspots, {min:273.15, max:323.15, palette: ['FFFFFF', 'FF0000']}, 'Hotspots', 1);
    index = hotspots;
    indexI = 'Thermal Hotspots';
    indexJ = "Thermal Hotspots";
    //from Celcius 0 to 50.
    var index_to_jpeg = index.visualize({bands:'Hotspots', min:273.15, max:323.15, palette: palette_nbr, forceRgbOutput:true});
  }
  //FIRMS-Fire
  else if(type == "Fire")
  {
    //Fire
    var fires = firms.filter(ee.Filter.date(startYear,endYear));
    var index = fires.sum().select('T21').clip(eneo).rename('Fire');
    //var index = fires.count().clip(countries).select('T21');
    indexI = 'Fire';
    indexJ = "Fire";
    var index_to_jpeg = index.visualize({bands:'Fire', min:300, max:1000, palette: palette_fires, forceRgbOutput:true});
    map.addLayer(index, firesVis, 'FIRMS-Fires', 1);
  }
  //---------------------------------------------------------------------------------------------------
  var options = { title: jina + ' - Index - (' + type + ')=> Date: ' + startYear +  ' to ' + endYear, 
                fontSize: 12, hAxis: {title: 'Index'}, vAxis: {title: 'Pixels'},
                legend: 'none', lineWidth: 1, pointSize: 4 };
  // Make the histogram, set the options.
  var histogram = ui.Chart.image.histogram(index, AoI, 100).setOptions(options);
  panel_grafu.widgets().set(1, histogram);   // Display the histogram.
  var lebel_jina = ui.Label('Index of ' + jina, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  var lebel_tarehe = ui.Label('Date: ' + startYear + ' - ' + endYear, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  panel_takwimu.widgets().set(1, lebel_jina);
  panel_takwimu.widgets().set(2, lebel_tarehe);
  //-----------------------------------------------------------------------------------
  //Download jpgs
  function downloadImg()
  {
    var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
    var downloadArgs = {dimensions:1024,region:img_bound, format:"jpg"};
    var url = index_to_jpeg.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
    var s2sr_visualization = { min: 0.0, max: 0.3, bands: ['B4','B3','B2'],  forceRgbOutput:true};
    //var rgb_to_jpeg = s2sr.median().clip(studyArea).visualize({bands:'B4,B3,B2', 'min': 0.0,'max': 0.3, forceRgbOutput:true});
    var rgb_to_jpeg = s2sr.median().clip(AoI).visualize(s2sr_visualization);
    var downloadArgsRGB = {dimensions:1024,region:img_bound, format:"jpg"};
    var urlrgb = rgb_to_jpeg.getDownloadURL(downloadArgsRGB);
    urlLabelrgb.setUrl(urlrgb);
    urlLabelrgb.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Download ' + jina + ' - ' + indexJ, downloadImg);
  var urlLabel = ui.Label('Download-Index', {shown: false});
  var urlLabelrgb = ui.Label('Download-RGB', {shown: false});
  downloadButton.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
  panel_takwimu.widgets().set(3, downloadButton);
  panel_takwimu.widgets().set(4, urlLabel);
  panel_takwimu.widgets().set(5, urlLabelrgb);
}
//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
//Define Vegetation Indices
  var index_majina = ee.List(['NDVI','NDWI','NDMI','NDDI','NBR','Thermal Hotspots','Fire']);
  var chagua_index = ui.Select([],'Loading ...');    //Indices
  //Mwaka
  index_majina.evaluate(function(aina_jina)
  {
    chagua_index.items().reset(aina_jina);
    chagua_index.setPlaceholder('Select Type of index');
    chagua_index.onChange(function(aina_jina)
    {
      aina = aina_jina;
    })
  })
//---------------------------------------------------------------------------------------
//Define Years
  var miaka = ee.List(["2017","2018","2019","2020","2021","2022","2023"]);
  var miezi = ee.List(["Year (January to December)",
                      "H1 (January to June)","H2 (July to December)",
                      "Q1 (January to March)","Q2 (April to June)",
                      "Q3 (July to September)","Q4 (October to December)"]);
//Load Years
  var chagua_mwaka = ui.Select([],'Loading ...');    //Mwaka
  var chagua_mwezi = ui.Select([],'Loading ...');    //Miezi
//Mwaka
  miaka.evaluate(function(mwakaa)
  {
    chagua_mwaka.items().reset(mwakaa);
    chagua_mwaka.setPlaceholder('Select Year');
    chagua_mwaka.onChange(function(mwakaa)
    {
      mwaka = mwakaa;
      //Mwezi
      miezi.evaluate(function(mwezia)
      {
        chagua_mwezi.items().reset(mwezia);
        chagua_mwezi.setPlaceholder('Select Months');
        chagua_mwezi.onChange(function(mwezia)
        {
          if(mwezia === "Year (January to December)") { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-12-31'; }
          if(mwezia === "H1 (January to June)") { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-06-30'; }
          if(mwezia === "H2 (July to December)") { mwaka_mwanzo = mwaka + '-07-01'; mwaka_mwisho = mwaka + '-12-31'; }
          if(mwezia === "Q1 (January to March)") { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-03-31'; }
          if(mwezia === "Q2 (April to June)") { mwaka_mwanzo = mwaka + '-04-01'; mwaka_mwisho = mwaka + '-06-30'; }
          if(mwezia === "Q3 (July to September)") { mwaka_mwanzo = mwaka + '-07-01'; mwaka_mwisho = mwaka + '-09-30'; }
          if(mwezia === "Q4 (October to December)") { mwaka_mwanzo = mwaka + '-10-01'; mwaka_mwisho = mwaka + '-12-31'; }
        })
      })
    })
  })
//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
// Declare Project & Village UI
  var chagua_mradi = ui.Select([],'Loading ...');
  var chagua_kijiji = ui.Select([],'Loading ...');
  //Load Projects
  var mradi_majina = mradi.aggregate_array('name').distinct();
  mradi_majina.evaluate(function(kamradi)
  {
    chagua_mradi.items().reset(kamradi);
    chagua_mradi.setPlaceholder('Select Project')
    chagua_mradi.onChange(function(kamradi)
    {
      var geom_a = mradi.filter(ee.Filter.eq('name', kamradi));
      var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 4});
      map.addLayer(geom_b,{palette: '000000'}, kamradi);
      map.centerObject(geom_a);
      geomjina = kamradi;
      geom = geom_a;
      // Load Villages after project selection
      var villages_majina = mradi_kijiji.filter(ee.Filter.eq('mradi', geomjina)).aggregate_array('name').distinct();
      villages_majina.evaluate(function(kijiji)
      {
        chagua_kijiji.items().reset(kijiji);
        chagua_kijiji.setPlaceholder('Select a Village')
        chagua_kijiji.onChange(function(kijiji)
        {
          var geom_a = mradi_kijiji.filter(ee.Filter.eq('name', kijiji));
          var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 2});
          map.addLayer(geom_b,{palette: 'FF00FF'},kijiji);
          map.centerObject(geom_a);
          geomjina = kijiji;
          geom_cbo = geom_a;
        })
      })
    })
  })
  var chora_sasa_a  = ui.Button({label: '==-> RUN <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezoa,});
  var chora_sasa_b  = ui.Button({label: '==-> RUN <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezob,});
//==========================================================================================================
//==========================================================================================================
//==========================================================================================================
chagua_index.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_index);
panel.add(kitenganishia);
chagua_mwaka.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka);
chagua_mwezi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwezi);
panel.add(kitenganishib);
panel.add(kitenganishib_text);
chagua_mradi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mradi);
panel.add(chora_sasa_a);
panel.add(kitenganishic);
panel.add(kitenganishic_text);
chagua_kijiji.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_kijiji);
panel.add(chora_sasa_b);
//---------------------------------------------------------------------
//Add fina links
var indicesA = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var indicesB = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var Ex_NDVI = ui.Label({ value: 'More Readings',style: {fontSize: '15px', stretch:'horizontal'}});
Ex_NDVI.setUrl("https://docs.google.com/document/d/1yFMgobR3frLUV6GYfLM6M_u8CTYGKyJgnRcicYTnpuc/edit?usp=sharing")
panel.add(indicesA);
panel.add(indicesB);
panel.add(Ex_NDVI);
//==============================================================================================================================================
//==============================================================================================================================================
//==============================================================================================================================================
function bonyezoa()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  if(mwaka === "2017") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom,geomjina,aina);  }
  if(mwaka === "2018") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom,geomjina,aina);  }
  if(mwaka === "2019") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom,geomjina,aina);  }
  if(mwaka === "2020") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom,geomjina,aina);  }
  if(mwaka === "2021") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom,geomjina,aina);  }
  if(mwaka === "2022") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom,geomjina,aina);  }
}
//--------------------------------------------------------------------------
function bonyezob()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  if(mwaka === "2017") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina,aina);  }
  if(mwaka === "2018") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina,aina);  }
  if(mwaka === "2019") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina,aina);  }
  if(mwaka === "2020") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina,aina);  }
  if(mwaka === "2021") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina,aina);  }
  if(mwaka === "2022") { L4L_Indices(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina,aina);  }
}
//===============================================================================================================
//===============================================================================================================
//===============================================================================================================
//===============================================================================================================
//===============================================================================================================
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel_grafu.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
map.onClick(function(coords)
{
  panel_grafu.clear();
  panel_takwimu.clear();
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(5)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(5));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  map.addLayer(point, {'color': 'black'}, 'WP');
  var pointBuffer = point.buffer({'distance': 100});
  var pointBufferCircle = empty.paint({featureCollection: pointBuffer, color: 1, width: 3 });
  map.addLayer(pointBufferCircle, {'color': 'red'}, 'WP Buffer - 100m');
  var s2sr = getImageCollection(pointBuffer,yeara,yearb);
  var ls8sr = getLS8ImageCollection(pointBuffer,yeara,yearb).select('ST_B10');
  var firms_fire = firms.filterDate(yeara, yearb).select('T21');
  var type = aina;
  //NDVI
  if(type == "NDVI"){
    var ndvi_Chart = ui.Chart.image.series(s2sr.select('NDVI'), pointBuffer, ee.Reducer.mean(), 1000);
    ndvi_Chart.setOptions({ title: 'Sentienel 2 - NDVI', vAxis: {title: 'NDVI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, ndvi_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Normalized Difference Vegetation Index(NDVI):  A simple indicator of green vegetation.', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
  //NDWI
  else if(type == "NDWI") {
    var ndwi_Chart = ui.Chart.image.series(s2sr.select('NDWI'), pointBuffer, ee.Reducer.mean(), 100);
    ndwi_Chart.setOptions({ title: 'Sentienel 2 - NDWI', vAxis: {title: 'NDWI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, ndwi_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Normalized Difference Water Index(NDWI): ', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
  //NBR
  else if(type == "NBR") {
    var nbr_Chart = ui.Chart.image.series(s2sr.select('NBR'), pointBuffer, ee.Reducer.mean(), 250);
    nbr_Chart.setOptions({ title: 'Sentienel 2 - NBR', vAxis: {title: 'NBR', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, nbr_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Normalized Burn Ratio (NBR): ', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
  //NDMI
  else if(type == "NDMI") {
    var ndmi_Chart = ui.Chart.image.series(s2sr.select('NDMI'), pointBuffer, ee.Reducer.mean(), 100);
    ndmi_Chart.setOptions({ title: 'Sentienel 2 - NDMI', vAxis: {title: 'NDMI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, ndmi_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Normalized Difference Moisture Index (NDMI): ', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
  //NDDI
  else if(type == "NDDI") {
    var nddi_Chart = ui.Chart.image.series(s2sr.select('NDDI'), pointBuffer, ee.Reducer.mean(), 100);
    nddi_Chart.setOptions({ title: 'Sentienel 2 - NDDI', vAxis: {title: 'NDDI', maxValue: 1, minValue: -1},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, nddi_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Normalized Difference Drough Index (NDDI):  ', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
  //LST
  else if(type == "Thermal Hotspots") {
    var lst_Chart = ui.Chart.image.series(ls8sr, pointBuffer, ee.Reducer.mean(), 100);
    lst_Chart.setOptions({ title: 'Landsat 8 OLI - LST', vAxis: {title: 'LST (Kelvin)', maxValue: 300, minValue: 400},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, lst_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Land Surface Temperature (LST): ', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
  //Fire
  else if(type == "Fire") {
    var firms_fire_Chart = ui.Chart.image.series(firms_fire.select('T21'), pointBuffer, ee.Reducer.count(), 100);
    firms_fire_Chart.setOptions({ title: 'FIRMS - Wildfire Activities', vAxis: {title: 'Fire Incidences', maxValue: 600, minValue: 300},hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}}, });
    panel_grafu.widgets().set(1, firms_fire_Chart);
    var maelezo = ui.Panel([ ui.Label({ value: 'Fire: Near Real-Time (NRT) active fire data .', style: {fontSize: '12px', }}) ]);
    panel_grafu.widgets().set(2, maelezo);
  }
});
var title = ui.Label('Project Areas - Indices', {stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel([ panel, ui.Panel(map, null, {stretch: 'both'}), ], ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'});
map.style().set('cursor', 'crosshair');
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));