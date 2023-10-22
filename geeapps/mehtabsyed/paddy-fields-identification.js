var s2 = ee.ImageCollection("COPERNICUS/S2"),
    s1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    Vietnam = /* color: #d63000 */ee.Geometry.Polygon(
        [[[104.51241561027541, 10.141733894193775],
          [104.82003279777541, 10.09847230200776],
          [104.84200545402541, 9.860430182103414],
          [104.75411482902541, 8.406969391233796],
          [106.35811873527541, 9.21036176671156],
          [106.95138045402541, 10.29310330233517],
          [108.88497420402541, 11.091968715524914],
          [109.39034529777541, 11.95315281894206],
          [109.43429061027541, 13.923208869839392],
          [108.85960936318793, 15.411125671284388],
          [105.71751951943793, 18.916489707130054],
          [108.44212889443793, 21.473330548999208],
          [108.11253905068793, 21.840918240459114],
          [107.05785155068793, 22.917737865306254],
          [105.19017576943793, 23.503367635991026],
          [103.41039061318793, 22.95820830256035],
          [102.46556639443793, 22.978438982544205],
          [102.15794920693793, 22.431154427709902],
          [102.48753905068793, 21.145804763195247],
          [104.99242186318793, 20.200157433972223],
          [103.76195311318793, 19.435324857233855],
          [105.12862158964003, 18.508679027787398],
          [107.28194190214003, 16.13860047084626],
          [107.37925716139398, 14.534229952058642],
          [107.42320247389398, 12.612021875111992],
          [106.01695247389398, 11.70988958608949],
          [104.96226497389398, 10.588895368359882],
          [104.45689388014398, 10.41605904682268]]]),
    Paddy = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[102.34977952670158, 13.510835009110654],
          [103.25065843295158, 10.804649824082533],
          [104.81071702670158, 8.573899689227037],
          [109.64470140170158, 12.268561382637138],
          [107.49138108920158, 14.555346879721213]]]);
//Author https://mygeoblog.com/2016/10/26/sentinel-1-2-for-high-resolution-landuse-mapping/?unapproved=4385&moderation-hash=8606d79fb30aeee0e45fc66abdd3361f#comment-4385
// Define period 
//https://mehtabsyed.users.earthengine.app/view/paddy-fields-identification
var startdate = ee.Date.fromYMD(2016,1,1);
var enddate = ee.Date.fromYMD(2018,12,1);
// Define geograpic domain
var Ca = ee.FeatureCollection('ft:1T7GmJ0tJCu4QwclY5qiG9EGBFgNhhNjttq8F7gQm');
Ca = Paddy
Map.centerObject(ee.Geometry.Point([105.7955, 10.8587]),12);
// filter s2 data
var Sentinel2 = s2.filterBounds(Ca)
                .filterDate(startdate, enddate)
                .filterBounds(Ca);
// filter s1 data
var Sentinel1 =  ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filterBounds(Ca)
                    .filterDate(startdate, enddate)
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                    .select('VV');
// cloud function to remove clouds
var cloudfunction_ST2 = function(image){
  //use add the cloud likelihood band to the image
  var quality = image.select("QA60").unmask();
  //get pixels above the threshold
  var cloud01 = quality.gt(0);
  //create a mask from high likelihood pixels
  var cloudmask = image.mask().and(cloud01.not());
  //mask those pixels from the image
  return image.updateMask(cloudmask);
};
// remove the clouds
var ST2_nocloud = Sentinel2.map(cloudfunction_ST2);
// take the median
var st2median = ST2_nocloud.median();
// the normalized difference bare index
var ndbi = st2median.normalizedDifference(['B12', 'B8']);
// the normalized difference vegetation index
var ndvi = st2median.normalizedDifference(['B8', 'B4']);
// the normalize difference water index
var ndwi = st2median.normalizedDifference(['B3', 'B8']);
// define thresholds
var bareThreshold = -0.32
var vegetationThreshold = 0.65
var waterThreshold = 0.2
// show the urban area
var ndbi_th = ndbi.gt(bareThreshold)
var myndbi = ndbi_th.updateMask(ndbi_th).clip(Ca)
var ndbi_viz = {palette:"111101"};
// Map.addLayer(myndbi, ndbi_viz, 'Urban');
// show the water areas
var ndwi_th = ndwi.gt(waterThreshold)
var myndwi = ndwi_th.updateMask(ndwi_th).clip(Ca)
var ndwi_viz = {palette:"24069b"};
// Map.addLayer(myndwi, ndwi_viz, 'Water');
// show the forests
var ndvi_th = ndvi.gt(vegetationThreshold)
var myndvi = ndvi_th.updateMask(ndvi_th).clip(Ca)
var ndvi_viz = {palette:"006b0c"};
// Map.addLayer(myndvi, ndvi_viz, 'Vegetation');
// create a map of the wet and dry conditions from sentinel-1
var wet = Sentinel1.reduce(ee.Reducer.percentile([10]))
var dry = Sentinel1.reduce(ee.Reducer.percentile([90]))
// calculate the difference between wet and dry conditions
var paddies = wet.subtract(dry)
// remove the mountains from the data
var hydrosheds = ee.Image('WWF/HydroSHEDS/03VFDEM');
var terrain = ee.Algorithms.Terrain(hydrosheds);
var slope = terrain.select('slope');
// remove all slopes greater then 2 degrees
paddies = paddies.updateMask(slope.lt(2));
// set the paddy threshold
var paddies_th = -8;
// select areas smaller than the threshold
var paddies_th = paddies.lt(paddies_th);
// mask the areas that are not rice paddies
var mypaddies = paddies_th.updateMask(paddies_th).clip(Ca)
var paddies_viz = {palette:"fc0394"};
Map.addLayer(mypaddies, paddies_viz, 'Rice');