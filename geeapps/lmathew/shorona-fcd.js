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
    table = ui.import && ui.import("table", "table", {
      "id": "users/lmathew/RL-FCD/rl_shoroba"
    }) || ee.FeatureCollection("users/lmathew/RL-FCD/rl_shoroba"),
    shoroba = ui.import && ui.import("shoroba", "table", {
      "id": "users/lmathew/RL-FCD/rl_shoroba"
    }) || ee.FeatureCollection("users/lmathew/RL-FCD/rl_shoroba");
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
//Display Vector Data (Boundaries)
//map.addLayer(Tanzania_eez,{palette: '555555'},'Tanzania + EEZ',1);
//map.addLayer(urt_wdpa_b,{palette: '00ff00'},'URT-WDPAs',0); 
//map.addLayer(Tanzania,{palette: '000000'},'Tanzania',0);
//JRC Water
var gsw = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').clip(urt_eez);
var maji = gsw.select('occurrence').unmask(ee.Image(0)).lte(0)
//map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////FCD Fuction
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
//var region = AOI.map(buffer);
//Map.addLayer(AOI, null, "AOI",false);
Map.centerObject(AOI, 9);
var studyArea = AOI;
var startYear = mwaka_a;
var endYear = mwaka_b;
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Function for acquiring Landsat TOA image collection
function getImageCollection(studyArea,startDate,endDate,startJulian,endJulian){
  var ls;var l4TOAs;var l5TOAs;var l7TOAs;var l8TOAs;var out;
  var sensorBandDictLandsatTOA =ee.Dictionary({L8 : ee.List([1,2,3,4,5,9,6]),
                        L7 : ee.List([0,1,2,3,4,5,7]),
                        L5 : ee.List([0,1,2,3,4,5,6]),
                        L4 : ee.List([0,1,2,3,4,5,6])
  });
  var bandNamesLandsatTOA = ee.List(['blue','green','red','nir','swir1','temp','swir2']);
  l4TOAs = ee.ImageCollection('LANDSAT/LT04/C01/T1_TOA')
      .filterDate(startDate,endDate)
      //.filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .select(sensorBandDictLandsatTOA.get('L4'),bandNamesLandsatTOA);
  l5TOAs = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
//l5TOAs = ee.ImageCollection('LANDSAT/LT5_L1T_TOA')
      .filterDate(startDate,endDate)
      //.filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .select(sensorBandDictLandsatTOA.get('L5'),bandNamesLandsatTOA);
l8TOAs = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
//l8TOAs = ee.ImageCollection('LANDSAT/LC8_L1T_TOA')
      .filterDate(startDate,endDate)
      //.filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .select(sensorBandDictLandsatTOA.get('L8'),bandNamesLandsatTOA);
  l7TOAs = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
      .filterDate(startDate,endDate)
      //.filter(ee.Filter.calendarRange(startJulian,endJulian))
      .filterBounds(studyArea)
      .select(sensorBandDictLandsatTOA.get('L7'),bandNamesLandsatTOA);
//  ls = ee.ImageCollection(l4TOAs.merge(l5TOAs).merge(l7TOAs).merge(l8TOAs));
//  out = ls;
//  return out
//}
  ls = ee.ImageCollection(l4TOAs.merge(l5TOAs).merge(l8TOAs));
  out = ls;
  return out
}
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
///////////////////////////////////////////////////////////////////////////////
// A helper to apply an expression and linearly rescale the output.
// Used in the landsatCloudScore function below.
var rescale = function(img, exp, thresholds) {
  return img.expression(exp, {img: img})
      .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
};
///////////////////////////////////////////////////////////////////////////////
// Compute a cloud score and adds a band that represents the cloud mask.  
// This expects the input image to have the common band names: 
// ["red", "blue", etc], so it can work across sensors.
function landsatCloudScore(img) {
  // Compute several indicators of cloudiness and take the minimum of them.
  var score = ee.Image(1.0);
  // Clouds are reasonably bright in the blue band.
  score = score.min(rescale(img, 'img.blue', [0.1, 0.3]));
  // Clouds are reasonably bright in all visible bands.
  score = score.min(rescale(img, 'img.red + img.green + img.blue', [0.2, 0.8]));
  // Clouds are reasonably bright in all infrared bands.
  score = score.min(
      rescale(img, 'img.nir + img.swir1 + img.swir2', [0.3, 0.8]));
  // Clouds are reasonably cool in temperature.
  score = score.where(img.select(['temp']).mask(),score.min(rescale(img,
      'img.temp', [300, 290])));
  // However, clouds are not snow.
  var ndsi = img.normalizedDifference(['green', 'swir1']);
  score =  score.min(rescale(ndsi, 'img', [0.8, 0.6])).multiply(100).byte();
  score = score.lt(cloudThresh).rename('cloudMask');
  img = img.updateMask(img.mask().and(score));
  return img.addBands(score);
}
///////////////////////////////////////////////////////////////////////////////
//Function for finding dark outliers in time series.
//Original concept written by Carson Stam and adapted by Ian Housman.
//Adds a band that is a mask of pixels that are dark, and dark outliers.
function simpleTDOM2(collection,zScoreThresh,shadowSumThresh,dilatePixels){
  var shadowSumBands = ['nir','swir1'];
  //Get some pixel-wise stats for the time series
  var irStdDev = collection.select(shadowSumBands).reduce(ee.Reducer.stdDev());
  var irMean = collection.select(shadowSumBands).mean();
  //Mask out dark dark outliers
  collection = collection.map(function(img){
    var zScore = img.select(shadowSumBands).subtract(irMean).divide(irStdDev);
    var irSum = img.select(shadowSumBands).reduce(ee.Reducer.sum());
    var TDOMMask = zScore.lt(zScoreThresh).reduce(ee.Reducer.sum()).eq(2)
        .and(irSum.lt(shadowSumThresh)).not();
    TDOMMask = TDOMMask.focal_min(dilatePixels);
    return img.addBands(TDOMMask.rename('TDOMMask'));
  });
  return collection;
}
///////////////////////////////////////////////////////////////////////////////
//Function for wrapping cloud and shadow masking together.
//Assumes image has cloud mask band called "cloudMask" and a TDOM mask called 
//"TDOMMask".
function cloudProject(img,shadowSumThresh,dilatePixels,cloudHeights){
  //Get the cloud mask
  var cloud = img.select('cloudMask').not();
  cloud = cloud.focal_max(dilatePixels);
  cloud = cloud.updateMask(cloud);
  //Get TDOM mask
  var TDOMMask = img.select(['TDOMMask']).not();
  //Project the shadow finding pixels inside the TDOM mask that are dark and 
  //inside the expected area given the solar geometry
  //Find dark pixels
  var darkPixels = img.select(['nir','swir1','swir2'])
      .reduce(ee.Reducer.sum()).lt(shadowSumThresh);//.gte(1);
  //Get scale of image
  var nominalScale = cloud.projection().nominalScale();
  //Find where cloud shadows should be based on solar geometry
  //Convert to radians
  var meanAzimuth = img.get('SUN_AZIMUTH');
  var meanZenith = img.get('SUN_ELEVATION');
  var azR = ee.Number(meanAzimuth).multiply(Math.PI).divide(180.0)
      .add(ee.Number(0.5).multiply(Math.PI ));
  var zenR = ee.Number(0.5).multiply(Math.PI )
      .subtract(ee.Number(meanZenith).multiply(Math.PI).divide(180.0));
  //Find the shadows
  var shadows = cloudHeights.map(function(cloudHeight){
    cloudHeight = ee.Number(cloudHeight);
    var shadowCastedDistance = zenR.tan()
        .multiply(cloudHeight);//Distance shadow is cast
    var x = azR.cos().multiply(shadowCastedDistance)
        .divide(nominalScale).round();//X distance of shadow
    var y = azR.sin().multiply(shadowCastedDistance)
        .divide(nominalScale).round();//Y distance of shadow
    return cloud.changeProj(cloud.projection(), cloud.projection()
        .translate(x, y));
  });
  var shadow = ee.ImageCollection.fromImages(shadows).max();
  //Create shadow mask
  shadow = shadow.updateMask(shadow.mask().and(cloud.mask().not()));
  shadow = shadow.focal_max(dilatePixels);
  shadow = shadow.updateMask(shadow.mask().and(darkPixels).and(TDOMMask));
  //Combine the cloud and shadow masks
  var combinedMask = cloud.mask().or(shadow.mask()).eq(0);
  //Update the image's mask and return the image
  img = img.updateMask(img.mask().and(combinedMask));
  img = img.addBands(combinedMask.rename(['cloudShadowMask']));
  return img;
}
//Function to add common indices
function addIndices(img){
  img = img.addBands(img.normalizedDifference(['nir','red']).rename('NDVI'));
  img = img.addBands(img.normalizedDifference(['nir','swir2']).rename('NBR'));
  return img;
}
///////////////////////////////////////////////////////////////////////////////
// Prepare dates
if(startJulian > endJulian){endJulian = endJulian + 365}
//var startDate = ee.Date.fromYMD(startYear,1,1).advance(startJulian,'day');
//var endDate = ee.Date.fromYMD(endYear,1,1).advance(endJulian,'day');
var startDate = ee.Date(startYear); //.advance(startJulian,'day');
var endDate = ee.Date(endYear); //.advance(endJulian,'day');
//print('Start and end dates:',startDate,endDate);
// Get Landsat 4,5,8,7 Image Collections
var ls = getImageCollection(studyArea,startDate,endDate,startJulian,endJulian);
//Map.addLayer(ls.median(),vizParams,'Landsat before masking composite',false);
// Compute a cloud score and mask clouds
ls = ls.map(landsatCloudScore);
// Find and mask out dark outliers
ls = simpleTDOM2(ls,zScoreThresh,shadowSumThresh,dilatePixels);
// Run cloud project to get the final cloud and shadow masked image collection
ls = ls.map(function(img){return cloudProject(img,shadowSumThresh,dilatePixels,
    cloudHeights)});
ls = ls.map(addIndices)
// now you have an image collection. 
// One way to convert it to a composite is to calculate the median 
// (it's added to map below as an example).    
var landsat_comp = ls.median().clip(AOI).unitScale(0,1)
//var maji =  ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').clip(AOI).gte(-20);
//maji = landsat_comp.multiply(maji);
//var excludewater = img;  // make a mask image
map.addLayer(landsat_comp,vizParams,jina + ': L8 Image',true);
// Reduce the region. The region parameter is the Feature geometry.
var meanDictionary = landsat_comp.reduceRegion({ reducer: ee.Reducer.mean(), geometry: map_area, scale: 30,
  maxPixels: 1e9, bestEffort:true, tileScale: 16 });
// The result is a Dictionary.  Print it.
//print(meanDictionary, 'band means');
//print(landsat_comp)
var bands = ['blue', 'green', 'red', 'nir', 'swir1','temp','swir2']
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//FCD
/////////////////////////////////////////////
var maxRed = landsat_comp.select('red').reduceRegion({reducer:ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16})
var maxRed = ee.Dictionary(maxRed).toImage();
var maxGreen =landsat_comp.select('green').reduceRegion({reducer:ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16})
var maxGreen = ee.Dictionary(maxGreen).toImage();
var maxBlue =landsat_comp.select('blue').reduceRegion({reducer:ee.Reducer.max(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16})
var maxBlue = ee.Dictionary(maxBlue).toImage();
// Compute the AVI using an expression.
var avi = landsat_comp.expression('(NIR +1) *(MaxRED - RED)* (NIR - RED)', {
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
  var covar = arrays.reduceRegion({
    reducer: ee.Reducer.centeredCovariance(), geometry: AOI, scale: scale, maxPixels: 1e9, tileScale: 16, bestEffort: true });
//print("covariates", covar)
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
  var sdImage = ee.Image(eigenValues.sqrt()) 
    .arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);
  // Turn the PCs into a P-band image, normalized by SD.
  var vdpca = principalComponents
    // Throw out an an unneeded dimension, [[]] -> [].
    .arrayProject([0])
    // Make the one band array image a multi-band image, [] -> image.
    .arrayFlatten([getNewBandNames('pc')])
    // Normalize the PCs by their SDs.
    .divide(sdImage);
////print(vdpca, 'VDPCA')
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
//calculate SI
// ((maxgreen - green)*(maxblue - blue)*(maxred-red))power1/3
var si = landsat_comp.expression('((maxGreen - GREEN) * (maxBlue - BLUE) *(maxRed - RED))', {
      'maxGreen': maxGreen,'RED': landsat_comp.select('red'),'maxRed': maxRed,
      'GREEN': landsat_comp.select('green'),'maxBlue': maxBlue,'BLUE': landsat_comp.select('blue'),
});
var si = si.pow(0.3333).rename('si')
var minsi =si.reduceRegion({reducer:ee.Reducer.min(),geometry:map_area,scale:1000,bestEffort:true,tileScale:16})
var minsi = ee.Dictionary(minsi).toImage()
var maxsi =si.reduceRegion({reducer:ee.Reducer.max(),geometry:map_area,scale:1000,bestEffort:true,tileScale:16})
var maxsi = ee.Dictionary(maxsi).toImage()
var ssiscale = si.subtract(minsi).divide(maxsi.subtract(minsi)).multiply(100)
//calculate FCD = (VD*SSI + 1)^1/2 -1
var fcdm = vdscale.multiply(ssiscale).add(ee.Number(1))
var fcd = fcdm.pow(0.5)
var fcd = fcd.subtract(ee.Number(1)).abs().rename('FCD')
fcd = fcd.mask(maji);
//Map.addLayer(fcd,FCDparam, 'FCD '+year,0)
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
// get a URL to download the visualization as PNG
//var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
//var fcd_url = fcdscale.getDownloadURL({'min': 0,'max': 100,'dimensions':1024,'region': img_bound,'EPSG':4326});
//var fcd_points = fcd.addBands(ee.Image.pixelLonLat());
//var fcd_points = fcd.reduceRegion({reducer: ee.Reducer.toList(),geometry:AOI,scale:1000,bestEffort:true,tileScale:16});
//var fcd_dn_value = ee.List(fcd_points.get('FCD'))
var FCDReparam = {min:0,max:100,palette:["ff3508","d8ff04","06700e"]}
var reclassified = fcdscale.expression('fcdDN <= 10 ? 10 : fcdDN <= 20 ? 20 : fcdDN <= 30 ? 30 : fcdDN <= 40 ? 40 : fcdDN <= 50 ? 50 : fcdDN <= 60 ? 60: fcdDN <= 70 ? 70 : fcdDN <= 80 ? 80 : fcdDN <= 90 ? 90 : fcdDN <= 100 ? 100 : 0',
                                  {'fcdDN': fcdscale.select('FCD')});
reclassified = reclassified.rename('Pixel')                                  
var options = { title: jina + ' - Forest Canopy Density -' + mwaka, fontSize: 12, hAxis: {title: 'Density (%)'}, vAxis: {title: '~ Area(Sq.Km)'},
                  legend: 'none', lineWidth: 1, pointSize: 4 };
// Make the histogram, set the options.
var histogram = ui.Chart.image.histogram(fcdscale, AOI, 1000).setOptions(options);
panel_grafu.widgets().set(1, histogram);   // Display the histogram.
//Takwimu
var takwimu_area = 'Area: ' + '   ' + 'Sq.Km.';
var takwimu_perimeter = 'Perimeter: ' + '  ' + 'Km%';
var takwimu_max = 'Maximum: ' + fcd_max.get('FCD').getInfo() + '%';
var takwimu_min = 'Minimum: ' + fcd_min.get('FCD').getInfo() + '%';
var takwimu_mean = 'Mean: ' + fcd_mean.get('FCD').getInfo() + '%';
var takwimu_median = 'Median: ' + fcd_median.get('FCD').getInfo() + '%';
var takwimu_stdDev = 'Standard Deviation: ' + fcd_stdDev.get('FCD').getInfo() + '%';
//var takwimu_url = 'Download FCD: ' + fcd_url;
var lebel_heading = ui.Label(jina + ' - FCD Statistics:', {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
var lebel_min = ui.Label(takwimu_min, {textAlign: 'left', fontSize: '12px'});
var lebel_max = ui.Label(takwimu_max, {textAlign: 'left', fontSize: '12px'});
var lebel_mean = ui.Label(takwimu_mean, {textAlign: 'left', fontSize: '12px'});
var lebel_median = ui.Label(takwimu_median, {textAlign: 'left', fontSize: '12px'});
var lebel_stdDev = ui.Label(takwimu_stdDev, {textAlign: 'left', fontSize: '12px'});
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
//var lebel_url = ui.Button({label: 'Download ' + jina +' - FCD', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezo_url(),});
//function bonyezo_url()
//  {
//    var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
//    var fcd_url = fcdscale.getDownloadURL({'min': 0,'max': 100,'dimensions':1024,'region': img_bound,'EPSG':4326});
//  }
//panel_takwimu.widgets().set(3, lebel_url);
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//Define Years
//var miaka = ee.List(['2015','2016','2017','2018','2019','2020',]);
var miaka = ee.List(["2015","2016","2017","2018","2019","2020"]);
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
//==============================================================================================================================================
//Hifadhi za Jamii (Misitu, Wanyapori,Bahari)
var corridors_majina = shoroba.aggregate_array('Name').distinct(); 
var chagua_majina = ui.Select([],'Loading ...');
//Shoroba
corridors_majina.evaluate(function(vlfra)
{
  chagua_majina.items().reset(vlfra);
  chagua_majina.setPlaceholder('Select a Corridor')
  chagua_majina.onChange(function(vlfra)
  {
    var geom_a = shoroba.filter(ee.Filter.eq('Name', vlfra));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},vlfra);
    map.centerObject(geom_a);
    geomjina = vlfra;
    geom_cbo = geom_a;
  })
})
var chora_sasa  = ui.Button({label: '==-> Corridor FCD <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyeza,});
//==============================================================================================================================================
chagua_mwaka.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka);
chagua_mwezi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwezi);
panel.add(kitenganishia);
chagua_majina.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_majina); //VLFrs
panel.add(chora_sasa);
//==============================================================================================================================================
//--------------------------------------------------------------------------
function bonyeza()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  if(mwaka === "2015") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2016") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2017") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2018") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2019") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
  if(mwaka === "2020") { URT_FCD(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);  }
}
//==============================================================================================================================================
var title = ui.Label('Wildlife Corridors - Forest Canopy Density', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel([ panel, ui.Panel(map, null, {stretch: 'both'}), ],
              ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));