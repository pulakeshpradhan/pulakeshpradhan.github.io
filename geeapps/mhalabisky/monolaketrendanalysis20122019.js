var roi = /* color: #749998 */ee.Geometry.Polygon(
        [[[-119.11976039015246, 38.094018797859654],
          [-119.16919886671496, 38.02779109598499],
          [-119.16370570265246, 37.966916951155866],
          [-119.11117732130481, 37.92034798198621],
          [-119.04354273878528, 37.92576449462602],
          [-118.96148860060168, 37.92305628817548],
          [-118.89454066358996, 37.942011638680945],
          [-118.86226832472278, 38.017513675535405],
          [-118.89728724562121, 38.0929380106207],
          [-119.0119570454259, 38.102124192717135]]], null, false),
    SouthParcel = /* color: #bf04c2 */ee.Geometry.Polygon(
        [[[-118.95171298922253, 37.97022057154828],
          [-118.95231380530561, 37.96954393557654],
          [-118.95261422172445, 37.96893495555019],
          [-118.95205635945393, 37.96835981504064],
          [-118.95227088980096, 37.96758165816233],
          [-118.95188465027968, 37.96717566318413],
          [-118.95132673740875, 37.96644825869831],
          [-118.9508546804347, 37.96538248984831],
          [-118.94737852253519, 37.9651794885555],
          [-118.94079099745966, 37.966989685280815],
          [-118.93968590466898, 37.96643984613166],
          [-118.93755087155847, 37.96588999486812],
          [-118.93411769182342, 37.96783541339409],
          [-118.93231517869037, 37.969307110526245],
          [-118.93102780540539, 37.9723349747167],
          [-118.93068444316714, 37.97367974013199],
          [-118.93072732662199, 37.97441977932259],
          [-118.93059854783388, 37.975159818497524],
          [-118.93100625884574, 37.97649605861001],
          [-118.92952566754394, 37.979658973129865],
          [-118.92791063549367, 37.97806359808023],
          [-118.92526568066177, 37.978091913209596],
          [-118.92340898380439, 37.97896035017125],
          [-118.9210688043392, 37.98042650431021],
          [-118.92222477679422, 37.98295282891481],
          [-118.9235068218261, 37.98272869318085],
          [-118.92727262974302, 37.98295701346178],
          [-118.92913944161683, 37.98436080625783],
          [-118.93295891373907, 37.98030169689777],
          [-118.93458970283291, 37.977798459237064],
          [-118.93829030922507, 37.97575924399231],
          [-118.9426773489364, 37.97385520995232],
          [-118.945681434101, 37.97277264420113],
          [-118.9473337248615, 37.97143636109575],
          [-118.95070254787379, 37.970370644431114]]]),
    EastParcel = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-118.92320884647972, 38.04543777948003],
          [-118.91771568241722, 38.03989489628966],
          [-118.91462577763207, 38.03570365727242],
          [-118.91187919560082, 38.03137696540755],
          [-118.90981925907738, 38.02705001796969],
          [-118.90724433842308, 38.021505743079324],
          [-118.90295280399926, 38.02407509335886],
          [-118.90492693193272, 38.02779370279631],
          [-118.90518440189965, 38.02921352363466],
          [-118.90484106773914, 38.03070087987055],
          [-118.90329612675316, 38.03259387332685],
          [-118.90312446537621, 38.03637967978922],
          [-118.90458353380131, 38.038238696751804],
          [-118.90690094832678, 38.03969211649062],
          [-118.90784512452342, 38.04073990268964],
          [-118.911192550093, 38.03935410473349],
          [-118.91428245487816, 38.04354513483486],
          [-118.91994728031761, 38.048682199333356],
          [-118.92595542851097, 38.04814147267582]]]),
    imageVisParam = {"opacity":1,"bands":["scale"],"min":-70365.04476085081,"max":273922.0101102708,"gamma":1.4000000000000001},
    horse_path = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-118.92802106531178, 37.98331531390775],
          [-118.92639038792424, 37.982977165178205],
          [-118.9246738221708, 37.98290949884548],
          [-118.92252800439792, 37.98318000049457],
          [-118.91960976382177, 37.986359485926656],
          [-118.91205673602332, 37.99407089733352],
          [-118.90798001338999, 37.99816302340002],
          [-118.9035595722732, 38.00090224639756],
          [-118.89866726896832, 38.00732720149489],
          [-118.89815228961095, 38.013007743766266],
          [-118.90295876383726, 38.023826622701684],
          [-118.90527620097237, 38.022203901128655],
          [-118.90759357823401, 38.02112204052585],
          [-118.90673527926742, 38.017876429624216],
          [-118.90570532050481, 38.01368396946453],
          [-118.90467536174174, 38.01084377955572],
          [-118.90622031317685, 38.00719195210093],
          [-118.9099968463646, 38.00367519885583],
          [-118.91480348239168, 37.99988768222342],
          [-118.91754986399354, 37.99664118284691],
          [-118.92055399841047, 37.99420614975361],
          [-118.92154101698037, 37.992582766696685],
          [-118.92372961817875, 37.99055350235615],
          [-118.92819275355498, 37.98527711860185]]]),
    viz_params_wetness = {"opacity":1,"bands":["scale"],"min":-1485058159.5857937,"max":2411743123.246192,"gamma":1.4000000000000001},
    viz_params_greeness = {"opacity":1,"bands":["scale"],"min":-1149497028.2313325,"max":2106359778.986501,"gamma":1.4000000000000001},
    imageVisParamNDVItrend = {"opacity":1,"bands":["scale"],"min":-123203.75772132793,"max":343760.48495887994,"gamma":1.4000000000000001},
    NAIP_2018 = ee.Image("users/mhalabisky/naip_2016nir_v2"),
    geometry = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[-118.90168596889782, 38.011032764747945],
         [-118.90825201656628, 38.00626502402336],
         [-118.90548537319467, 38.002982708335594],
         [-118.92061410983882, 37.992006502530536],
         [-118.91379057010494, 37.994847448353184],
         [-118.96067229389513, 37.96183866073878]]),
    NAIP2018VisParam = {"opacity":1,"bands":["b1","b2","b3"],"min":44.02,"max":188.98,"gamma":1},
    NAIP2016VisParam = {"opacity":1,"bands":["N","R","G"],"min":81.44,"max":198.56,"gamma":1.2000000000000002};
// Monitoring trends to wetlands around Mono Lake 10/17/2019
// set region of interest
var geometry = roi
Map.centerObject(EastParcel, 14);
// Set parameters
// Some clouds are still not masked out, which causes problems in linear regression.
// A better cloud mask would help. 
var Cloud_cover =  50; // Percent cloud cover filter. Filters out all scenes above cloud cover percentage. The cloud mask should allow you to keep this fairly high. 
var start_date = '2012-01-01';
var end_date = '2019-12-30';
var start_doy = 91; // Julian day of year (May 1 = 121, April 1 = 91) Can look at time series to see if snow or frost is being picked up and start and end date should be shifted. 
var end_doy = 334; // Julian day of year (Nov.30 = 334) 
// Used Landsat 8 Tier 1 collection
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1')
// Added in elevation
var elevation = ee.Image('USGS/NED');
Map.addLayer(elevation, {min:1800, max:2500},'Elevation', false);
// Image collections L4 , L5 and L8
var image_L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate(start_date, end_date)
        .filterMetadata('CLOUD_COVER', 'less_than', Cloud_cover)
        .filter(ee.Filter.eq('WRS_PATH', 42))
        .filter(ee.Filter.eq('WRS_ROW', 34))
        //.filterBounds(geometry)
        .filter(ee.Filter.calendarRange(start_doy, end_doy, 'day_of_year')); // select days of the year for analysis
// This is a placeholder for future analyses. May want to include a longer time series.
var image_L5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
        .filterDate(start_date, end_date)
        .filterMetadata('CLOUD_COVER', 'less_than', Cloud_cover)
        //.filterBounds(geometry)
        .filter(ee.Filter.eq('WRS_PATH', 42))
        .filter(ee.Filter.eq('WRS_ROW', 34))
        .filter(ee.Filter.calendarRange(start_doy, end_doy, 'day_of_year')); // select days of the year for analysis
// Used to create a water mask for Mono Lake
var cloud_free2016 = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2018-01-01', '2018-12-31'),
  asFloat:true
  })
// Add in NAIP imagery for viewing
var NAIP2005 = ee.ImageCollection('USDA/NAIP/DOQQ')
   .filterDate('2005-01-01', '2005-12-31')
   .mosaic().clip(roi)
var NAIP2010 = ee.ImageCollection('USDA/NAIP/DOQQ')
   .filterDate('2010-01-01', '2010-12-31')
   .mosaic().clip(roi)
var NAIP2016 = ee.ImageCollection('USDA/NAIP/DOQQ')
   .filterDate('2016-01-01', '2016-12-31')
   .mosaic().clip(roi)
var NAIP = ee.ImageCollection('USDA/NAIP/DOQQ')
   .filterBounds(geometry);
//print (NAIP, "NAIP");
//print (image_L5, "L5 image collection");
//print (image_L8, "L8 image collection");
// Define the visualization parameters.
var vizParams = {bands: ['B5', 'B4', 'B3'], min: 0, max: 0.5};
var NAIPvizParams = {bands: ['R', 'G', 'B']};
var realL5 ={"bands": ["B3","B2","B1"], gamma: 1, max: 1922.4, min: 301.6, opacity: 1};
var realL8 = {"bands": ["B4","B3","B2"], gamma: 1, max: 1922.4, min: 301.6, opacity: 1};
// This will sort from least to most cloudy.
var sortedL5 = image_L5.sort('CLOUD_COVER');
var sortedL8 = image_L8.sort('CLOUD_COVER');
var sceneL5 = ee.Image(sortedL5.first()); // Get the first (least cloudy) image.
var sceneL8 = ee.Image(sortedL8.first()); // Get the first (least cloudy) image.
//var sceneL5ex = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_042034_19990818');
//var sceneL8ex = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_042034_20190505'); // placeholder for looking at a particular image scene that looks odd in timeseries
//print(scene);
//Map.addLayer(sceneL5ex, realL5, 'L5 example', false);
//Map.addLayer(sceneL8ex, realL8, 'L8 example', false);
Map.addLayer(NAIP2005, NAIPvizParams, 'NAIP 2005', false);
Map.addLayer(NAIP2010, NAIPvizParams, 'NAIP 2010', false);
Map.addLayer(NAIP2016, NAIP2016VisParam, 'NAIP 2016', true);
Map.addLayer(NAIP_2018, NAIP2018VisParam, 'NAIP 2018', true);
    /////////////
    //Functions//
    /////////////
// Simple cloud mask using cloud score in metadata
function maskcloud_sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// This function adds a time band to the image.
var createTimeBand_indices = function(image) {
  // Scale milliseconds by a large constant to avoid very small slopes
  // in the linear regression output.
  return image.addBands(image.metadata('system:time_start').divide(1e18));
};
var addindexL8 = function(image) {
  return image
  // NDVI
  .addBands(image.normalizedDifference(['B5','B4']).rename('NDVI'))
  // NDWI  green and short wave infrared
  .addBands(image.normalizedDifference(['B3','B6']).rename('NDWI')) // McFeeters et al. for waterbodies
  // NDWI2  infrared and short wave infrared
  .addBands(image.normalizedDifference(['B5','B6']).rename('NDWI2')); // Gao 1996 - Prefer this one for most applications. Designed to measure water content in leaves
};
var addindexL5 = function(image) {
  return image
  // NDVI
  .addBands(image.normalizedDifference(['B4','B3']).rename('NDVI'))
  // NDWI  green and short wave infrared
  .addBands(image.normalizedDifference(['B2','B5']).rename('NDWI'))
  // NDWI2  infrared and short wave infrared
  .addBands(image.normalizedDifference(['B4','B5']).rename('NDWI2'));
};
// I need to double check on TC calculations as I believe these are for at sensor reflectance, not surface reflectance. Not sure how much it matters, but this could be improved. 
var tasseled_cap_transformation = function(image) {
    // Calculate tasseled cap transformation
    var brightness = image.expression(
        '(L1 * B2) + (L2 * B3) + (L3 * B4) + (L4 * B5) + (L5 * B6) + (L6 * B7)',
        {
            'L1': image.select("B2"),
            'B2': 0.3029,
            'L2': image.select("B3"),
            'B3': 0.2786,
            'L3': image.select("B4"),
            'B4': 0.4733,
            'L4': image.select("B5"),
            'B5': 0.5599,
            'L5': image.select("B6"),
            'B6': 0.508,
            'L6': image.select("B7"),
            'B7':  0.1872,
        });
    var greenness = image.expression(
        '(L1 * B2) + (L2 * B3) + (L3 * B4) + (L4 * B5) + (L5 * B6) + (L6 * B7)',
        {
            'L1': image.select("B2"),//     
            'B2': -0.2941,
            'L2': image.select("B3"),
            'B3': -0.243,
            'L3': image.select("B4"),
            'B4': -0.5424,
            'L4': image.select("B5"),
            'B5': 0.7276,
            'L5': image.select("B6"),
            'B6': 0.0713,
            'L6': image.select("B7"),
            'B7': -0.1608,
        });
    var wetness = image.expression(
        '(L1 * B2) + (L2 * B3) + (L3 * B4) + (L4 * B5) + (L5 * B6) + (L6 * B7)',
        {
            'L1': image.select("B2"),// Wetness 0.1511 0.1973 0.3283 0.3407 −0.7117 −0.4559
            'B2': 0.1511,
            'L2': image.select("B3"),
            'B3': 0.1973,
            'L3': image.select("B4"),
            'B4': 0.3283,
            'L4': image.select("B5"),
            'B5': 0.3407,
            'L5': image.select("B6"),
            'B6': -0.7117 ,
            'L6': image.select("B7"),
            'B7': -0.4559,
        });
    //var bright = brightness.reduce(ee.call("Reducer.sum"));
    var bright =  ee.Image(brightness);
    var green = ee.Image(greenness);
    var wet = ee.Image(wetness);
    var tasseled_cap = ee.Image(image).addBands(bright).addBands(green).addBands(wet);
    return tasseled_cap;//.rename('B1','B2','B3','B4','B5','B7','brightness','greenness','wetness');
};
// Add indices
// NDVI NDWI NDWI2
var L8index = image_L8
.map(maskcloud_sr)
.map(addindexL8)
.map(createTimeBand_indices)
.map(tasseled_cap_transformation);
print(L8index, "l8index");
var L5index = image_L5
.map(maskcloud_sr)
.map(addindexL5)
.map(createTimeBand_indices);
// Merge indices
var indices_all = L5index.merge(L8index); //Just using L8 for now.
///  Calculate indices, Selected mean reducer, but sum or median could be explored. 
// If you want to export data
//var indices_wetlands = indices_all.map(function(i) {
//return i.reduceRegions(SouthParcel, ee.Reducer.mean()); 
//});
//var indices_wetlands_flattened = indices_wetlands.flatten(); // flatten collection
//var Indices_wetlands = indices_wetlands_flattened.select([".*"], null, false); // remove geometry (makes it a much smaller file and easier to export)
var TimeSeriesNDVI= indices_all.select('system:time_start','NDVI' );
var trendNDVI = TimeSeriesNDVI.reduce(ee.Reducer.linearFit());
var trendNDVI_slp = trendNDVI.select('scale');
//var TimeSeriesNDWI= indices_all.select('system:time_start','NDWI' );
//var trendNDWI = TimeSeriesNDWI.reduce(ee.Reducer.linearFit());
//var trendNDWI_slp = trendNDWI.select('scale');
var TimeSeriesgreeness= indices_all.select('system:time_start','B2_2' );
var trendgreeness = TimeSeriesgreeness.reduce(ee.Reducer.linearFit());
var trendgreeness_slp = trendgreeness.select('scale');
var TimeSerieswetness= indices_all.select('system:time_start','B2_3' );
var trendwetness = TimeSerieswetness.reduce(ee.Reducer.linearFit());
var trendwetness_slp = trendwetness.select('scale');
var TimeSeriesbrightness= indices_all.select('system:time_start','B2_3' );
var trendbrightness = TimeSeriesbrightness.reduce(ee.Reducer.linearFit());
var trendbrightness_slp = trendbrightness.select('scale');
// Map trends
Map.addLayer(cloud_free2016, {},'cloud_free2016', false);
var vizParamsSlp = {bands: 'scale',min: 0,max: 1,gamma: 1.4};
//  Mask out open water - trends are distracting in open water - If desired could be a separate analysis.
var L8_ndvi_2016 = cloud_free2016.clip(roi).normalizedDifference(['B5','B4']).rename('NDVI');
var watermask2016 = L8_ndvi_2016.gte(0);
var trendwetness_slp_mask = trendwetness_slp.mask(watermask2016);
Map.addLayer(trendwetness_slp_mask, viz_params_wetness,'trend wetness', false);
var trendbrightness_slp_mask = trendbrightness_slp.mask(watermask2016);
Map.addLayer(trendbrightness_slp_mask, viz_params_wetness,'trend brightness', false);
var trendgreeness_slp_mask = trendgreeness_slp.mask(watermask2016);
Map.addLayer(trendgreeness_slp_mask, viz_params_greeness,'trend greeness', false);
var trendNDVI_slp_mask = trendNDVI_slp.mask(watermask2016);
Map.addLayer(trendNDVI_slp_mask, imageVisParamNDVItrend,'trend NDVI', true);
//var trendNDWI_slp_mask = trendNDWI_slp.mask(watermask2016);
//Map.addLayer(trendNDWI_slp_mask, imageVisParamNDVItrend,'trend NDWI', true);
var TimeSeries2 = ui.Chart.image.seriesByRegion(indices_all, EastParcel,
    ee.Reducer.mean(), 'B2_2' , 30, 'system:time_start'); 
TimeSeries2 = TimeSeries2.setChartType('ScatterChart');
TimeSeries2 = TimeSeries2.setOptions({
  title: 'East Parcel',
  vAxis: {
    title:('hydrograph')
  },
  lineWidth: 1,
  pointSize: 4,
  colors:['#0000FF']
  }
);
print(TimeSeries2, "EastParcel - greeness (veg cover/health)");
var TimeSeries2b = ui.Chart.image.seriesByRegion(indices_all, SouthParcel,
    ee.Reducer.mean(), 'B2_2' , 30, 'system:time_start'); 
TimeSeries2b = TimeSeries2b.setChartType('ScatterChart');
TimeSeries2b = TimeSeries2b.setOptions({
  title: 'South Parcel',
  vAxis: {
    title:('hydrograph')
  },
  lineWidth: 1,
  pointSize: 4,
  colors:['#0000FF']
  }
);
print(TimeSeries2b, "SouthParcel - greeness (veg cover/health)");
var TimeSeries3 = ui.Chart.image.seriesByRegion(indices_all, horse_path,
    ee.Reducer.mean(), 'B2_2' , 30, 'system:time_start'); 
TimeSeries3 = TimeSeries3.setChartType('ScatterChart');
TimeSeries3 = TimeSeries3.setOptions({
  title: 'Horse Path',
  vAxis: {
    title:('hydrograph')
  },
  lineWidth: 1,
  pointSize: 4,
  colors:['#0000FF']
  }
);
print(TimeSeries3, "Horse Path - greeness (veg cover/health)");
/// Charts for Brightness
var TimeSeriesB3 = ui.Chart.image.seriesByRegion(indices_all, horse_path,
    ee.Reducer.mean(), 'B2_1' , 30, 'system:time_start'); 
TimeSeriesB3 = TimeSeriesB3.setChartType('ScatterChart');
TimeSeriesB3 = TimeSeriesB3.setOptions({
  title: 'Horse Path',
  vAxis: {
    title:('hydrograph')
  },
  lineWidth: 1,
  pointSize: 4,
  colors:['#0000FF']
  }
);
print(TimeSeriesB3, "Horse Path - brightness (bare earth cover)");