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
    elev = ui.import && ui.import("elev", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    sub_landscape = ui.import && ui.import("sub_landscape", "table", {
      "id": "users/lmathew/landscape_seascape_sub"
    }) || ee.FeatureCollection("users/lmathew/landscape_seascape_sub");
//FCD index developed from these publications
//http://www.ijesd.org/vol8/1012-F0032.pdf
//https://www.agriculturejournals.cz/publicFiles/210529.pdf
//https://www.researchgate.net/publication/319045433_Integration_of_GIS_and_Remote_Sensing_for_Evaluating_Forest_Canopy_Density_Index_in_Thai_Nguyen_Province_Vietnam
//https://scialert.net/fulltext/?doi=rjes.2018.198.212#e3
//http://www.itto.int/files/itto_project_db_input/2056/Technical/pd13-97-3%20rev1(F)%20FCD-Mapper%20User's%20Guide_e.pdf
//create image composite for all Landsat SR for year of interest
//https://zenodo.org/record/1297434#.XwDUKOFfiN9
//thank you Olha Danylo for the help!!
//==============================================================================================================================================
//==============================================================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel(); 
panel.style().set('width', '250px');
// Create an intro panel with labels.
var intro = ui.Panel([ ui.Label({ value: 'Spatial-Temporal Monitoring from Space', style: {fontSize: '20px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(intro);
///////////////////////////////////////////////////////////////////////////
//thank you Olha Danylo for the help!!
var map = ui.Map();
var geom = null;
var geom_cbo = null;
var geomjina = '';
var mwaka = '';
var mwaka_mwanzo = '';
var mwaka_mwisho = '';  
map.centerObject(urt_eez,6);
//Graph Panel
var panel_grafu = ui.Panel({ style: { width: '350px',position: 'top-right', padding: '10px 10px' } });
var panel_takwimu = ui.Panel({ style: { width: '350px',position: 'bottom-left', padding: '10px 10px' } });
map.add(panel_grafu);
map.add(panel_takwimu);
// Separator
var kitenganishia = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var kitenganishib = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
//--------------------------------------------------------------------------------------------
var panel_jira = ui.Panel({ style: { width: '200px',position: 'bottom-right', padding: '10px 10px' } });
map.add(panel_jira);
var kLon;
var kLat;
var pointi = ui.Panel([ ui.Label({ value: 'Add coordinates below to plot on Map ...', style: {fontSize: '15px',}}) ]);
panel_jira.add(pointi);
var iLon = ui.Textbox({ value:37, placeholder: 'enter Longitude...', 
                                  onChange: function(value) { jiLon.setValue(value); return(value); } }) 
//var jLat = ;
panel_jira.add(ui.Panel([iLon]));
//print(lon);
var iLat = ui.Textbox({ value:-3, placeholder: 'enter Latitude...', 
                                  onChange: function(value) { iLat.setValue(value); return(value); } })
panel_jira.add(ui.Panel([iLat]));
//print(lon);
var iButton = ui.Panel([ ui.Button({ label: 'Go to Location', onClick: function()
                                    { 
                                      kLon = parseFloat(iLon.getValue()); 
                                      kLat = parseFloat(iLat.getValue()); 
                                      map.setCenter(kLon, kLat, 12);
                                      var jira = ee.Geometry.Point(kLon, kLat);
                                      map.addLayer(jira, {'color': 'red'}, 'Plotted Point');
                                    } 
                                  }) 
                      ]);
//print(button);
panel_jira.add(iButton);
//--------------------------------------------------------------------------------------------
// On Click results.
var jira = ui.Panel([ ui.Label({ value: 'Click on Your Point of Intrest to obtain Time Series Graphs ...', style: {fontSize: '15px',}}) ]);
panel.add(jira);
//--------------------------------------------------------------------------------------------
//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------
// Load a global elevation image.
var empty = ee.Image().byte(); //TZ	TZA	834
var Tanzania_eez = empty.paint({featureCollection: urt_eez, color: 1, width: 3 });
var urt_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'TZA')));
var urt_wdpa_b = empty.paint({featureCollection: urt_wdpa_a, color: 1, width: 2 });
var urt_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'TZA')));
var urt = ee.FeatureCollection(lsib.filter(ee.Filter.eq('country_co', 'TZ')));
var Tanzania = empty.paint({featureCollection: urt, color: 1, width: 1 });
//EACOP - Admin
var eacop_buffer_100m = ee.FeatureCollection("users/MPA/eacop/eacop_buffer_100m");
map.centerObject(eacop_buffer_100m,6);
var eacop_buffer_100m_b = empty.paint({featureCollection: eacop_buffer_100m, color: 1, width: 1 });
var eacop_lga = ee.FeatureCollection("users/MPA/eacop/lga_eacop");
var eacop_lga_b = empty.paint({featureCollection: eacop_lga, color: 1, width: 1 });
var eacop_wards = ee.FeatureCollection("users/MPA/eacop/wards_eacop");
var eacop_wards_b = empty.paint({featureCollection: eacop_wards, color: 2, width: 1 });
var eacop_regions = ee.FeatureCollection("users/MPA/eacop/regions_eacop");
var eacop_regions_b = empty.paint({featureCollection: eacop_regions, color: 3, width: 3 });
//EACOP Buffer 10km
function bafa(ficha) {
  return ficha.buffer(10000);
}
var eacop_buffer_10km = eacop_buffer_100m.map(bafa); //10Km
//JRC Water
var gsw = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').clip(urt_eez);
var maji = gsw.select('occurrence').unmask(ee.Image(0)).lte(0)
map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
// ===========================================================================================
// ===========================================================================================
//EACOP Buffer 10km
function bafa(ficha) {
  return ficha.buffer(10000);
}
var eacop_buffer_10km = eacop_buffer_100m.map(bafa); //10Km\\
// ===========================================================================================
// Feature View Free Flowing Rivers
// https://developers.google.com/earth-engine/datasets/catalog/WWF_HydroSHEDS_v1_FreeFlowingRivers?hl=en#table-properties
var dataset = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers');
map.addLayer(dataset, null, 'Free flowing rivers', 0);
// ===========================================================================================
// Feature View - Buildings
// https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_Research_open-buildings_v1_polygons?hl=en
var majengo = ee.FeatureCollection('GOOGLE/Research/open-buildings/v1/polygons');
majengo = majengo.filterBounds(eacop_buffer_10km);
map.addLayer(majengo, {color: 'FF0000'}, 'Buildings',0);
//========================================================================================
//========================================================================================
//=====================================================================================================
//Degradation - 
// https://code.earthengine.google.com/6be36b448b13aeed914b4aff7d1510dd
//https://www.wur.nl/en/research-results/chair-groups/environmental-sciences/laboratory-of-geo-information-science-and-remote-sensing/research/sensing-measuring/radd-forest-disturbance-alert.htm
var radd = ee.ImageCollection('projects/radar-wur/raddalert/v1');
print('RADD image collection:', radd);
//Forest Baseline
var geography = 'africa'; 
var forest_baseline = ee.Image(radd.filterMetadata('layer','contains','forest_baseline')
                            .filterMetadata('geography','contains',geography).first());
map.addLayer(forest_baseline, {palette:['black'], opacity: 0.3},'Forest Baseline',0);
//=====================================================================================================
//-----------------
//Latest RADD alert
//-----------------
var latest_radd_alert =  ee.Image(radd.filterMetadata('layer','contains','alert')
                            .filterMetadata('geography','contains',geography)
                            .sort('system:time_end', false).first());
latest_radd_alert.clip(eacop_buffer_10km);
print('Latest RADD alert '+ geography+':',latest_radd_alert);
//RADD alert: 2 = unconfirmed (low confidence) alert; 3 = confirmed (high confidence) alert
map.addLayer(latest_radd_alert.select('Alert'), {min:2,max:3,palette:['blue','coral']}, 'Disturbance Alert',0);
//RADD alert date: yyDOY (e.g. 22001 = 1 Jan 2022)
map.addLayer(latest_radd_alert.select('Date'), {min:22001,max:23001, palette: ['ffffcc','800026']}, 'Disturbance Alert Date',0);
//=====================================================================================================
elev = elev.clip(urt_eez);
var shade = ee.Terrain.hillshade(elev);
var sea = elev.lte(0);
// Create a custom elevation palette from hex strings.
var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
// Create a mosaic of the sea and the elevation data
var visParams = {min: 1, max: 3000, palette: elevationPalette};
var visualized = ee.ImageCollection([elev.mask(sea.not()).visualize(visParams),sea.mask(sea).visualize({palette:'000022'})]).mosaic();
//visualized = visualized
//map.addLayer(visualized, {}, 'Elevations', 0);//// Note that the visualization image doesn't require visualization parameters.
// Convert the visualized elevation to HSV, first converting to [0, 1] data.
var hsv = visualized.divide(255).rgbToHsv();
var hs = hsv.select(0, 1); // Select only the hue and saturation bands.
var v = shade.divide(255);// Convert the hillshade to [0, 1] data, as expected by the HSV algorithm.
var rgb = hs.addBands(v).hsvToRgb().multiply(255).byte();
//map.addLayer(rgb, {}, 'Styled Elevation',0);
//Display Vector Data (Boundaries)
map.addLayer(visualized, {}, 'Elevations', 0);//// Note that the visualization image doesn't require visualization parameters.
map.addLayer(rgb, {}, 'Styled Elevation',0);
map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
map.addLayer(urt_wdpa_b,{palette: '00ff00'},'URT-WDPAs',0); 
map.addLayer(Tanzania,{palette: '000000'},'Tanzania',0);
map.addLayer(Tanzania_eez,{palette: '555555'},'Tanzania + EEZ',1);
map.addLayer(eacop_buffer_100m_b,{palette: '000000'},'EACOP-100m Buffer',1);
map.addLayer(eacop_wards_b,{palette: '000000'},'EACOP-Wards',0);
map.addLayer(eacop_lga_b,{palette: '000000'},'EACOP-LGAs',0);
map.addLayer(eacop_regions,{palette: '000000'},'EACOP-Regions',0);
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////USGS Landsat 8 Level 2, Collection 2, Tier 1 (SR)
var l8sr_t2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2');
var bandNamesLandsat = ee.List(['blue','green','red','nir','swir1','temp','swir2']);
var sensorBandDictLandsat8sr = ee.List(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','ST_B10','SR_B7']);
//=====================================================================================================
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
//=====================================================================================================
//Function for acquiring Landsat TOA image collection
function getImageCollection(studyArea,startDate,endDate)
{
  //var dataset = l8sr_t2.map(applyScaleFactors);
  var dataset = l8sr_t2.map(prepSrL8)
  var l8sr = dataset.filterDate(startDate,endDate).filterBounds(studyArea)
              .select(sensorBandDictLandsat8sr,bandNamesLandsat);
  return l8sr
}
//=====================================================================================================
//=====================================================================================================
// A helper to apply an expression and linearly rescale the output.
// Used in the landsatCloudScore function below.
var rescale = function(img, exp, thresholds)
{
  return img.expression(exp, {img: img})
      .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
};
//=====================================================================================================
//Function to add common indices
function addIndices(img){
  img = img.addBands(img.normalizedDifference(['nir','red']).rename('NDVI'));
  img = img.addBands(img.normalizedDifference(['nir','swir2']).rename('NBR'));
  return img;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//FCD Fuction
var startJulian = 1;
var endJulian = 365;
var cloudThresh = 95;
var dilatePixels = 1;
var cloudHeights = ee.List.sequence(200,5000,500);
var zScoreThresh = -1.2;
var shadowSumThresh = 0.35;
var vizParams = {'min': 0.05,'max': 0.5, 'bands':'swir1,nir,red', 'gamma':1.6};
function URT_FCD(mwaka_a,mwaka_b,eneo,jina)
{
  var year = mwaka; 
  var AOI = eneo;
  var map_area = eneo;
  var buffer = function(feature) {  return feature.buffer(1000); };
  Map.centerObject(AOI, 8);
  var studyArea = AOI;
  var startYear = mwaka_a;
  var endYear = mwaka_b;
  //=====================================================================================================
  // Prepare dates
  var startDate = ee.Date(startYear);
  var endDate = ee.Date(endYear);
  // Get Landsat 4,5,8,7 Image Collections
  var ls = getImageCollection(studyArea,startDate,endDate);
  ls = ls.map(addIndices);
  // now you have an image collection. 
  // One way to convert it to a composite is to calculate the median 
  // (it's added to map below as an example).    
  var landsat_comp = ls.median().clip(AOI).unitScale(0,1)
  map.addLayer(landsat_comp,vizParams, jina + ': LS8OLI-SR',true);
  // Reduce the region. The region parameter is the Feature geometry.
  var meanDictionary = landsat_comp.reduceRegion({ reducer: ee.Reducer.mean(), geometry: map_area, scale: 30,
  maxPixels: 1e9, bestEffort:true, tileScale: 16 });
  // The result is a Dictionary.  Print it.
  //print(meanDictionary, 'band means');
  //print(landsat_comp)
  var bands = ['blue', 'green', 'red', 'nir', 'swir1','temp','swir2']
  //=====================================================================================================  
  function getNewBandNames(prefix) 
  {
    var seq = ee.List.sequence(1, bandNames.length());
    return seq.map(function(b) 
    {
      return ee.String(prefix).cat(ee.Number(b).int());
    });
  }
  //=====================================================================================================
  //FCD
  var maxRed = landsat_comp.select('red').reduceRegion({reducer:ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16})
  var maxRed = ee.Dictionary(maxRed).toImage();
  var maxGreen =landsat_comp.select('green').reduceRegion({reducer:ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16})
  var maxGreen = ee.Dictionary(maxGreen).toImage();
  var maxBlue =landsat_comp.select('blue').reduceRegion({reducer:ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16})
  var maxBlue = ee.Dictionary(maxBlue).toImage();
  // Compute the AVI using an expression.
  var avi = landsat_comp.expression('(NIR +1) *(MaxRED - RED)* (NIR - RED)',{
                                  'NIR': landsat_comp.select('nir'),'RED': landsat_comp.select('red'),'MaxRED': maxRed });
  var avi = avi.pow(0.3333).rename('avi')
  var zero = landsat_comp.select('nir').lt(landsat_comp.select('red'));
  var avi = avi.where(zero.neq(0), 0);
  //compute bare soil index BSI
  //BSI = (SWIR1 + RED) - (NIR + GREEN)/((SWIR1 + RED) + (NIR + GREEN))
  var bsi = landsat_comp.expression(
    '((SWIR1 + RED) - (NIR + GREEN))/((SWIR1 + RED) + (NIR + GREEN))', {
      'NIR': landsat_comp.select('nir'), 'RED': landsat_comp.select('red'), 'GREEN': landsat_comp.select('green'), 'SWIR1': landsat_comp.select('swir1'), });
  var bsiscale = bsi.multiply(100).add(100)
  var bsiscale = bsiscale.rename('bsi')
  //Map.addLayer(bsiscale, {}, 'BSI', false)
  //print(bsiscale, 'BSI')
  //Vegetation density index
  //calculate VD via PCA of AVI and BI, rescale from 1 to 100%
  var avi_bsi = avi.addBands(bsiscale)
  var bandNames = avi_bsi.bandNames();
  // Set some information about the input to be used later.
  var scale = 1000;
  var bandNames = avi_bsi.bandNames();
  //remove zeros
  var good = avi_bsi.gte(0).or(avi_bsi.lte(0))
  avi_bsi = avi_bsi.updateMask(good)
  // Mean center the data to enable a faster covariance reducer
  // and an SD stretch of the principal components.
  var meanDict = avi_bsi.reduceRegion({ reducer: ee.Reducer.mean(), geometry: AOI, scale: scale, 
                                      maxPixels: 1e9, tileScale: 12, bestEffort: true });
  //Map.addLayer(avi_bsi,{}, "avi_bsi")
  //print("1", meanDict)
  var means = ee.Image.constant(meanDict.values(bandNames));
  //print("2", means)
  var centered = avi_bsi.subtract(means);
  //print(avi_bsi)
  //perform principal components with centered covariance
 // Collapse the bands of the image into a 1D array per pixel.
  var image = centered
  var scale = 1000
  //var region = AOI
  var arrays = centered.toArray();
  //Map.addLayer(centered)
  // Compute the covariance of the bands within the region.
  var covar = arrays.reduceRegion({reducer: ee.Reducer.centeredCovariance(), 
                                            geometry: AOI,  scale: scale, maxPixels: 1e9,
                                            tileScale: 16, bestEffort: true });
  //rint("covariates", covar)
  // Get the 'array' covariance result and cast to an array.
  // This represents the band-to-band covariance within the region.
  var covarArray = ee.Array(covar.get('array'));
  // Perform an eigen analysis and slice apart the values and vectors.
  var eigens = covarArray.eigen(); 
  // This is a P-length vector of Eigenvalues.
  var eigenValues = eigens.slice(1, 0, 1);
  // This is a PxP matrix with eigenvectors in rows.
  var eigenVectors = eigens.slice(1, 1);
  // Convert the array image to 2D arrays for matrix computations.
  var arrayImage = arrays.toArray(1);
  // Left multiply the image array by the matrix of eigenvectors.
  var principalComponents = ee.Image(eigenVectors).matrixMultiply(arrayImage);
  // Turn the square roots of the Eigenvalues into a P-band image.
  var sdImage = ee.Image(eigenValues.sqrt()).arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);
  // Turn the PCs into a P-band image, normalized by SD.
  var vdpca = principalComponents
    // Throw out an an unneeded dimension, [[]] -> [].
    .arrayProject([0])
    // Make the one band array image a multi-band image, [] -> image.
    .arrayFlatten([getNewBandNames('pc')])
    // Normalize the PCs by their SDs.
    .divide(sdImage);
  //print(vdpca, 'VDPCA')
  //that was principle components with centered variance
  var vd = vdpca.select('pc1')//.abs()
  //rescale 0 to 100
  var minvd =vd.reduceRegion({reducer:ee.Reducer.min(),geometry:map_area,scale:1000,bestEffort:true,tileScale:16})
  var minvd = ee.Dictionary(minvd).toImage();
  var maxvd =vd.reduceRegion({reducer:ee.Reducer.max(),geometry:map_area,scale:1000,bestEffort:true,tileScale:16})
  var maxvd = ee.Dictionary(maxvd).toImage();
  var normvd = vd.subtract(minvd).divide(maxvd.subtract(minvd))
  //with zeros back in
  var vdscale = normvd.multiply(100).unmask()
  //print(vdscale)
  //calculate SI
  // ((maxgreen - green)*(maxblue - blue)*(maxred-red))power1/3
  var si = landsat_comp.expression('((maxGreen - GREEN) * (maxBlue - BLUE) *(maxRed - RED))', {
      'maxGreen': maxGreen,'RED': landsat_comp.select('red'),'maxRed': maxRed,
      'GREEN': landsat_comp.select('green'),'maxBlue': maxBlue,'BLUE': landsat_comp.select('blue'),
  });
  //print(si)
  var si = si.pow(0.3333).rename('si')
  var minsi =si.reduceRegion({reducer:ee.Reducer.min(),geometry:map_area,scale:1000,bestEffort:true,tileScale:16})
  var minsi = ee.Dictionary(minsi).toImage()
  var maxsi =si.reduceRegion({reducer:ee.Reducer.max(),geometry:map_area,scale:1000,bestEffort:true,tileScale:16})
  var maxsi = ee.Dictionary(maxsi).toImage()
  var ssiscale = si.subtract(minsi).divide(maxsi.subtract(minsi)).multiply(100)
  //print(ssiscale)
  //calculate FCD = (VD*SSI + 1)^1/2 -1
  var fcdm = vdscale.multiply(ssiscale).add(ee.Number(1))
  var fcd = fcdm.pow(0.5)
  var fcd = fcd.subtract(ee.Number(1)).abs().rename('FCD')
  //===================================================================================================== 
  var fcd_max = fcd.reduceRegion({reducer: ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true });
  var fcd_min = fcd.reduceRegion({reducer: ee.Reducer.min(),geometry:AOI,scale:1000,bestEffort:true });
  var fcd_mean = fcd.reduceRegion({reducer: ee.Reducer.mean(),geometry:AOI,scale:1000,bestEffort:true });
  var fcd_median = fcd.reduceRegion({reducer: ee.Reducer.median(),geometry:AOI,scale:1000,bestEffort:true });
  var fcd_stdDev = fcd.reduceRegion({reducer: ee.Reducer.stdDev(),geometry:AOI,scale:1000,bestEffort:true });
  var minfcd = ee.Dictionary(fcd_min).toImage();
  var maxfcd = ee.Dictionary(fcd_max).toImage();
  var normfcd = fcd.subtract(minfcd).divide(maxfcd.subtract(minfcd))
  var fcdscale = normfcd.multiply(100).rename('FCD'); //.updateMask(fcdscale_water);
  map.addLayer(fcdscale.clip(AOI),FCDparam, jina +'-> FCD-' + year,0)
  var FCDReparam = {min:0,max:100,palette:["ff3508","d8ff04","06700e"]}
  var reclassified = fcdscale.expression('fcdDN <= 10 ? 10 : fcdDN <= 20 ? 20 : fcdDN <= 30 ? 30 : fcdDN <= 40 ? 40 : fcdDN <= 50 ? 50 : fcdDN <= 60 ? 60: fcdDN <= 70 ? 70 : fcdDN <= 80 ? 80 : fcdDN <= 90 ? 90 : fcdDN <= 100 ? 100 : 0',
                                  {'fcdDN': fcdscale.select('FCD')});
  reclassified = reclassified.rename('Pixel');
  var options = { title: jina + ' - Vegetation Density -' + mwaka, fontSize: 12, hAxis: {title: 'Density (%)'}, vAxis: {title: '~ Area(Sq.Km)'},
                  legend: 'none', lineWidth: 1, pointSize: 4 };
  // Make the histogram, set the options.
  var histogram = ui.Chart.image.histogram(fcdscale, AOI, 1000).setOptions(options);
  panel_grafu.widgets().set(1, histogram);   // Display the histogram.
  //===================================================================================================== 
  //Takwimu
  var takwimu_area = 'Area: ' + '   ' + 'Sq.Km.';
  var takwimu_perimeter = 'Perimeter: ' + '  ' + 'Km%';
  var takwimu_max = 'Maximum: ' + fcd_max.get('FCD').getInfo() + '%';
  var takwimu_min = 'Minimum: ' + fcd_min.get('FCD').getInfo() + '%';
  var takwimu_mean = 'Mean: ' + fcd_mean.get('FCD').getInfo() + '%';
  var takwimu_median = 'Median: ' + fcd_median.get('FCD').getInfo() + '%';
  var takwimu_stdDev = 'Standard Deviation: ' + fcd_stdDev.get('FCD').getInfo() + '%';
  //===================================================================================================== 
  var lebel_heading = ui.Label(jina + ' - FCD Statistics:', {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  var lebel_min = ui.Label(takwimu_min, {textAlign: 'left', fontSize: '12px'});
  var lebel_max = ui.Label(takwimu_max, {textAlign: 'left', fontSize: '12px'});
  var lebel_mean = ui.Label(takwimu_mean, {textAlign: 'left', fontSize: '12px'});
  var lebel_median = ui.Label(takwimu_median, {textAlign: 'left', fontSize: '12px'});
  var lebel_stdDev = ui.Label(takwimu_stdDev, {textAlign: 'left', fontSize: '12px'});
  //===================================================================================================== 
  panel_grafu.widgets().set(2, lebel_heading);
  panel_grafu.widgets().set(3, lebel_min);
  panel_grafu.widgets().set(4, lebel_max);
  panel_grafu.widgets().set(5, lebel_mean);
  panel_grafu.widgets().set(6, lebel_median);
  panel_grafu.widgets().set(7, lebel_stdDev);
  var lebel_jina = ui.Label('FCD of ' + jina, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  var lebel_tarehe = ui.Label('Date: ' + mwaka_a + ' - ' + mwaka_b, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  panel_takwimu.widgets().set(1, lebel_jina);
  panel_takwimu.widgets().set(2, lebel_tarehe);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function downloadImg()
  {
    var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
    var fcdscale_to_jpeg = fcdscale.visualize({bands:"FCD", min:0, max:100, palette:["ff3508","d8ff04","06700e"], forceRgbOutput:true});
    var downloadArgs = {dimensions:1024,region:img_bound, format:"jpg"};
    var url = fcdscale_to_jpeg.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
    var rgb_to_jpeg = landsat_comp.visualize({bands:'swir1,nir,red', 'min': 0.05,'max': 0.5, gamma:1.6, forceRgbOutput:true});
    var downloadArgsRGB = {dimensions:1024,region:img_bound, format:"jpg"};
    var urlrgb = rgb_to_jpeg.getDownloadURL(downloadArgsRGB);
    urlLabelrgb.setUrl(urlrgb);
    urlLabelrgb.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Download ' + jina +' - FCD', downloadImg);
  var urlLabel = ui.Label('Download-FCD', {shown: false});
  var urlLabelrgb = ui.Label('Download-RGB', {shown: false});
  downloadButton.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
  panel_takwimu.widgets().set(3, downloadButton);
  panel_takwimu.widgets().set(4, urlLabel);
  panel_takwimu.widgets().set(5, urlLabelrgb);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Define Years
//var miaka = ee.List(['2015','2016','2017','2018','2019','2020',]);
var miaka = ee.List(["2015","2016","2017","2018","2019","2020","2021","2022"]);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load Administrative Names
var mikoa_majina = ee.List(["Kagera","Geita","Shinyanga","Tabora","Singida","Manyara","Dodoma","Tanga"]);
var mikoa_majina = eacop_regions.aggregate_array('REGION').distinct();
//var wilaya_majina = eacop_lga.aggregate_array('DISTRICT').distinct();
//var kata_majina = eacop_wards.aggregate_array('Ward_Name').distinct();
var chagua_mkoa = ui.Select([],'Loading ...');    //Mkoa
var chagua_wilaya = ui.Select([],'Loading ...');  //Wilaya
var chagua_kata = ui.Select([],'Loading ...');    //Kata
// Load Mikoa
mikoa_majina.evaluate(function(mkoa)
{
  chagua_mkoa.items().reset(mkoa);
  chagua_mkoa.setPlaceholder('Select Region')
  chagua_mkoa.onChange(function(mkoa)
  {
    var geom_a = urt_wards.filter(ee.Filter.eq('Region_Nam', mkoa));
    var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 4});
    map.addLayer(geom_b,{palette: 'ff0000'},mkoa);
    map.centerObject(geom_a);
    var jinaM = mkoa;
    chagua_wilaya.items().reset();
    chagua_kata.items().reset();
    // Load Districts
    var wilaya_majina = urt_wards.filter(ee.Filter.eq('Region_Nam', mkoa)).aggregate_array('District_N').distinct();
    wilaya_majina.evaluate(function(wilaya)
    {
      chagua_wilaya.items().reset(wilaya);
      chagua_wilaya.setPlaceholder('Select District')
      chagua_wilaya.onChange(function(wilaya)
      {
        var geom_a = urt_wards.filter(ee.Filter.eq('District_N', wilaya));
        var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 4});
        map.addLayer(geom_b,{palette: 'ff0000'},wilaya);
        map.centerObject(geom_a);
        var jinaW = wilaya;
        chagua_kata.items().reset();
        // Load Kata
        var kata_majina = urt_wards.filter(ee.Filter.eq('District_N', wilaya)).aggregate_array('Ward_Name').distinct();
        kata_majina.evaluate(function(kata)
        {
          chagua_kata.items().reset(kata);
          chagua_kata.setPlaceholder('Select Ward')
          chagua_kata.onChange(function(kata)
          {
            var geom_a = urt_wards.filter(ee.Filter.eq('Ward_Name', kata));
            var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 4});
            map.addLayer(geom_b,{palette: 'ff0000'}, kata);
            map.centerObject(geom_a);
            geomjina = kata;
            geom_cbo = geom_a;
          })
        })
      })
    })
  })
})
//-----------------------------------------------------------------------------------------
var chora_sasa  = ui.Button({label: '==-> Forest Canopy Density <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezo,});
//==============================================================================================================================================
chagua_mwaka.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka);
chagua_mwezi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwezi);
panel.add(kitenganishia);
chagua_mkoa.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mkoa); //Mkoa
chagua_wilaya.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_wilaya); //Wilaya
chagua_kata.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_kata); //Kata
panel.add(chora_sasa);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function bonyezo()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  if(mwaka === "2015") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2016") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2017") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2018") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2019") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2020") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2021") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2022") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2023") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
}
//==============================================================================================================================================
var title = ui.Label('Large Projects -  Canopy Density', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel([ panel, ui.Panel(map, null, {stretch: 'both'}), ],
              ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));