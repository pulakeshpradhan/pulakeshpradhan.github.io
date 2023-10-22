//// ********************************************************************//// 
// This script was developed to map wetland hydrological dynamics in the   //
// Prairie Pothole Region using multi-tempral NAIP imagery and NED data.   //
// The methods used include: k-means clustering, Otsu thresholding,        //
// DEM landform classification, object-based image analysis, etc.          //
// Please use Google Chrome. Other browsers might not work properly.       //
// Author: Qiusheng Wu (https://wetlands.io | https://GIShub.org)         //
//// ********************************************************************//// 
// Load modules
var geelib = require('users/giswqs/public:wetlands.js');
// Visit the following URL to see the source code for the above module: 
// https://code.earthengine.google.com/?accept_repo=users/giswqs/public
// Load PPR and National Hydrography Dataset (NHD) 
var PPR = ee.FeatureCollection("users/wqs/PPR/PPR_USA_v2");
var HUC10 = ee.FeatureCollection('USGS/WBD/2017/HUC10');  // 18,487 HUC10 watersheds in the U.S.
var HUC08 = ee.FeatureCollection('USGS/WBD/2017/HUC08');  // 2,303 HUC08 subbasins in the U.S.
var PPR_HUC10 = HUC10.filterBounds(PPR);                  // 993 HUC10 watersheds in the PPR
var PPR_HUC08 = HUC08.filterBounds(PPR);                  // 132 HUC08 subbasins in the PPR
// Customize parameters
var scale = 2;          // image scale (resolution) for computing statistics
var min_dep_size = 100; // minimum depression/wetland size in pixels
var nclusters = 6;      // number of clusters for the k-means clustering
var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]; // available NAIP imagery for the PPR
var num_years = years.length;     // number of years with available NAIP imagery
var permanent_threshold = 50;     // threshold (%) for extracting permanent water from JRC Global Water Occurrence 
var cluster_threshold = 0.10;     // A cluster within permanent water must exceed x% of pixels in order to be classified as water
var ndwi_threshold = 0.6;         // permanent water based on multi-temporal mean NDWI
// Add HUC layers to the map
// Map.setCenter(-111.37, 48.12, 12);
Map.setCenter(-99.00, 47.01, 8);
Map.addLayer(ee.Image().paint(HUC10, 0, 1), {}, 'US HUC10 Watershed', false);   // HUC10 for the PPR
Map.addLayer(ee.Image().paint(geelib.ND_HUC08, 0, 2), {palette: ['green']}, 'PPR HUC08 Subbasin');   // HUC08 for the study area
Map.addLayer(ee.Image().paint(PPR_HUC10, 0, 1), {}, 'PPR HUC10 Watershed');   // HUC10 for the PPR
Map.addLayer(ee.Image().paint(PPR, 0, 3), {}, 'PPR Extent');                     // HUC08 for the study area
// ---------------------------------------------------------------------------------------------------- //
// Interactive UI
// ---------------------------------------------------------------------------------------------------- //
// Add a panel to the left of the map for displaying results 
var panel = ui.Panel();
panel.style().set('width', '400px');
var intro = ui.Panel([
  ui.Label({
    value: 'Wetland Hydrology Analyst',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Fine-resolution mapping of wetland and surface water dynamics in the Prairie Pothole Region using multi-temporal NAIP imagery',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label('Select the year of NAIP aerial imagery (1-m RGBN) to display on the map. '),
]);
panel.add(intro);
var buttons_panel = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
var years_panel = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
var nlayers = Map.layers().length();
var year_select = ui.Select({
    items: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
    value: '2015',
    onChange: function(key){
      Map.unlisten();                     // deletes map callback function
      Map.style().set('cursor', 'hand');  // reset the map's default cursor
      inspect_button.setDisabled(false);  // enable the activate button
      deactiv_button.setDisabled(true);   // disable this button
    }
  });
years_panel.add(year_select);
panel.add(years_panel);
panel.add(ui.Label('Activate the inspector to click a watershed on the map to inspect its properties and map wetland inundation extent.'));
var inspect_button  = ui.Button({label: 'Activate inspector', onClick: function() {
  // register a callback on the map to be invoked when the map is clicked
  var selected_year = parseInt(year_select.getValue(), 10);
  var ith_year = years.indexOf(selected_year);
  Map.onClick(function(coords) {
    // get clicked subbasin info
    var clicked_point      = ee.Geometry.Point(coords.lon, coords.lat);
    var clicked_basin_fc   = HUC10.filterBounds(clicked_point);
    var clicked_basin      = ee.Feature(clicked_basin_fc.first());
    var clicked_basin_geom = clicked_basin.geometry();
    var clicked_basin_id   = clicked_basin.get('huc10');
    var clicked_basin_name = clicked_basin.get('name');
    var clicked_basin_size = clicked_basin_geom.area().divide(1e4).format('%,.2f');
    var huc10_id = clicked_basin_id.getInfo();
    var huc8_id = huc10_id.substring(0, 8);
    var nwi_asset_path = 'users/wqs/NWI-HU8/HU8_' + huc8_id + '_Wetlands';    // NWI wetlands for the clicked watershed
    var clicked_nwi_huc = ee.FeatureCollection(nwi_asset_path).filterBounds(clicked_basin_geom);
    // .filter(ee.Filter.notEquals({leftField: 'WETLAND_TY', rightValue: 'Riverine'}));  // exclude riverine wetlands
    var HUC = geelib.findHUC10(huc10_id);    // extract NHD HUC10 for the clicked location
    var geom = HUC.geometry();
    var centroid = ee.FeatureCollection.randomPoints(geom, 1).first().geometry();
    var lon = centroid.coordinates().get(0);
    // deal with points near the US/Canada border
    var lat_tmp = ee.Number.parse(centroid.coordinates().get(1));
    var lat = ee.List([lat_tmp, 48.998]).reduce(ee.Reducer.min());
    // var lat = ee.Algorithms.If(lat_tmp.lt(49), lat_tmp, 48.998);
    centroid = ee.Geometry.Point([lon, lat]);
    var roi = centroid.buffer(5000);
    var ilyr = 4; 
    Map.layers().set(ilyr++, ui.Map.Layer(ee.Image().paint(geom, 0, 3), {palette: 'red'}, 'HUC-' + huc10_id)); 
    // Get available surface water products in GEE Data Catalog
    var GLCF_Water = ee.ImageCollection('GLCF/GLS_WATER').mosaic().clip(geom).eq(2);  // GLCF: Landsat Global Inland Water (2000)
    GLCF_Water = GLCF_Water.updateMask(GLCF_Water);
    var GLCF_Water_Area = ee.Number.parse(geelib.imgAreaHa(GLCF_Water, geom, 30).get('water')).format('%,.2f');
    var JRC_Water = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").clip(geom);   // JRC Global Surface Water Mapping Layers (1984-2015)
    var JRC_Water_Max_Extent = JRC_Water.select('max_extent');    // Binary image containing 1 anywhere water has ever been detected.
    var JRC_water_area = ee.Number.parse(geelib.imgAreaHa(JRC_Water_Max_Extent, geom, 30).get('max_extent'));
    var JRC_Water_Max_Area = JRC_water_area.format('%,.2f');
    var JRC_Water_Occurrence = JRC_Water.select('occurrence');    // The frequency with which water was present.
    var JRC_Permanent_Water = JRC_Water_Occurrence.gt(permanent_threshold);
    // get NED and landforms
    var elev = ee.Image("USGS/NED").clip(geom);
    var landforms = ee.Image("CSP/ERGo/1_0/US/landforms").select('constant').clip(geom);
    var landforms_wet = landforms.gt(23);   // including upper slope (flat), lower slope, valley
    // var min_elev = geelib.minValue(elev);
    // var max_elev = geelib.maxValue(elev);
    var hillshade = ee.Terrain.hillshade(elev);
    // calcuate image area
    var calArea = function(input, fc) {
      var pixelArea = input.multiply(ee.Image.pixelArea()).divide(10000);  
      var watershedArea = pixelArea.reduceRegions({
        collection: fc,
        reducer: ee.Reducer.sum(),
        scale: 30
    });
      return watershedArea;
    };
    // if the JRC permanent water area is less than 1 ha, change the permanent water threshold
    var JRC_Permanent_Water_Area = ee.Number(calArea(JRC_Permanent_Water, HUC).aggregate_sum('sum'));
    // print(JRC_Permanent_Water_Area)
    JRC_Permanent_Water = ee.Image(ee.Algorithms.If(JRC_Permanent_Water_Area.lt(4), JRC_Water_Occurrence.gt(0), JRC_Permanent_Water));    
    // Get time-series NAIP imagery with NDWI and NDVI bands added
    var NAIP = geelib.findNAIP(geom);
    var time_start = ee.List(NAIP.aggregate_array('system:time_start')); // image acquisition date (starting time)
    var time_end = ee.List(NAIP.aggregate_array('system:time_end'));     // image acquisition date (ending time)
    var yearList = time_start.map(function(y){
      return ee.Date(y).get('year');
    });
    var ith_year_tmp = yearList.indexOf(selected_year);
    var ith_year = ee.List([ith_year_tmp, 0]).reduce(ee.Reducer.max());
    // ith_year = ee.Algorithms.If(ith_year.lt(0), 0, ith_year);
    var ithNAIP = ee.Image(NAIP.toList(num_years).get(ith_year));        // selected NAIP imagery to display on the map
    // Get NWI wetlands for the clicked watershed
    var NWI = clicked_nwi_huc;
    var NWI_summary = geelib.summaryStatsNWI(NWI, 'Shape_Area');   // Summary statistics of NWI wetlands for the clicked watershed
    var NWI_count = NWI_summary.get(0);   // wetland count
    var NWI_total = ee.Number(NWI_summary.get(1)).format('%,.2f');  // total wetland area
    var NWI_mean = ee.Number(NWI_summary.get(2)).format('%,.2f');   // mean wetland size
    var NWI_sums = geelib.groupSum(NWI, 'Shape_Area', 'WETLAND_TY', 'Wetland Type');  // Aggregated wetland area for each wetland type
    var NWI_chart = geelib.plotSumNWI(NWI_sums);   // plot wetland chart for each wetland type
    // Get NDWI image
    var NDWI = NAIP.select(['ndwi']);
    var NDWI_mean = ee.ImageCollection(NDWI).mean();  // Create an average NDWI image based on all available NAIP imagery
    // get percentage NDWI based on JRC and NDWI water extent
    var basin_area = clicked_basin_geom.area().divide(1e4);
    var pct_JRC_water = ee.Number.parse(JRC_water_area).divide(basin_area);
    var pct_JRC_water_label = pct_JRC_water.multiply(100).format('%.2f');
    var pct_NWI_water = ee.Number(NWI_summary.get(1)).divide(basin_area);
    var pct_NWI_water_label = pct_NWI_water.multiply(100).format('%.2f');
    var pct_lower = ee.Number(1).subtract(pct_NWI_water).multiply(100);
    var pct_upper = ee.Number(1).subtract(pct_JRC_water).multiply(100);
    pct_lower = ee.Number(ee.Algorithms.If(pct_lower.gt(0), pct_lower, pct_upper));  // deal with NWI polygons span acorss watershed boundary
    var pct_median = pct_lower.add(pct_upper).divide(2);
    var percentile = NDWI_mean.reduceRegion(ee.Reducer.percentile([pct_lower, pct_median, pct_upper], ['pct_lower', 'pct_median', 'pct_upper']), geom, 30);
    var pct_ndwi_median = ee.Number.parse(ee.Dictionary(percentile).get('ndwi_pct_median'));
    var hist_NDWI = ee.Dictionary(geelib.histogram(NDWI_mean, 'ndwi', geom, scale));  // plot NDWI histogram
    var threshold_NDWI = ee.Number.parse(geelib.otsu(hist_NDWI).format('%.4f'));      // compute optimal NDWI threshold using Otsu's method 
    var threshold_ndwi = ee.List([pct_ndwi_median, threshold_NDWI, 0]).reduce(ee.Reducer.max());  // choose optimal NDWI threshold
    var threshold_ndwi_label = ee.Number(threshold_ndwi).format('%.4f');
    var NDWI_water = NDWI_mean.gte(ee.Number(threshold_ndwi));
    NDWI_water = NDWI_water.updateMask(NDWI_water);
    // permanent water based on NDWI
    var NDWI_permanent = NDWI_mean.gte(ndwi_threshold);
    // NDWI_permanent = NDWI_permanent.updateMask(NDWI_permanent);
    // get image bound
    var getImageBound = function(input){
      input = ee.Image(input.select(0)).gt(0);
      input = input.updateMask(input);
      var fc = input.reduceToVectors({scale: 30, bestEffort: true, maxPixels: 2e10});
      return fc.geometry();
    };
    // extract JRC Monthly History product
    var get_JRC_monthly = function(input) {
      var start_date = ee.Date(input.get('system:time_start'));
      var end_date = ee.Date(input.get('system:time_end'));
      var start_year_tmp = ee.Number(start_date.get('year'));
      var start_year = ee.List([start_year_tmp, 2015]).reduce(ee.Reducer.min());  //Between 16 March 1984 and 10 October 2015
      var start_month = ee.Number(start_date.get('month'));
      var end_month = ee.Number(end_date.get('month')).add(1);
      var start = ee.Date.fromYMD(start_year, start_month, 1);
      var end = start.advance(59, 'day');
      var JRC_monthly_images = ee.ImageCollection("JRC/GSW1_0/MonthlyHistory").filterDate(start, end);
      var JRC_monthly_size = ee.Number.parse(JRC_monthly_images.size());
      var alt_start = ee.Date.fromYMD(2014, start_month, 1);
      var alt_end = alt_start.advance(59, 'day');
      var alt_JRC_monthly_images = ee.ImageCollection("JRC/GSW1_0/MonthlyHistory").filterDate(alt_start, alt_end);
      JRC_monthly_images = ee.ImageCollection(ee.Algorithms.If(JRC_monthly_size.gt(0), JRC_monthly_images, alt_JRC_monthly_images));
      var JRC_monthly = JRC_monthly_images.max().eq(2).clip(getImageBound(input));
      JRC_monthly = JRC_monthly.updateMask(JRC_monthly);
      return JRC_monthly.set({'system:time_start': start, 'system:time_end': end});
    };
    var JRC_monthly_waters = NAIP.map(get_JRC_monthly);
    var ithJRCwater = ee.Image(JRC_monthly_waters.toList(num_years).get(ith_year)); 
    // function for classifying image using k-means clustering
    var classifyImage = function(input){
      var imgBound = getImageBound(input);
      var centroid = ee.FeatureCollection.randomPoints(imgBound, 1).first().geometry();
      var roi = centroid.buffer(5000);
      var training = input.sample({
        region: roi, // using the sample image to extract training samples
        scale: scale,
        numPixels: 5000
      });
      // Instantiate the clusterer and train it.
      var clusterer = ee.Clusterer.wekaKMeans(nclusters).train(training);
      // Cluster the input using the trained clusterer.
      var classifiedImage = input.cluster(clusterer).select('cluster');
      return classifiedImage;
    };
    // classifying the image collection using the map function
    var clusteredImages = NAIP.map(classifyImage);
    var ithClusterImage = ee.Image(clusteredImages.toList(num_years).get(ith_year));  // selected year of image to display on the map
    var getWaterCluster = function(input) {
      var clusterImg = input.updateMask(JRC_Permanent_Water);
      var frequency = clusterImg.reduceRegion({
        reducer: ee.Reducer.frequencyHistogram(),
        scale:30,
        maxPixels: 2.1E9
      });
      var dict = ee.Dictionary(frequency.get('cluster'));
      var keys = ee.List(dict.keys());
      var values = ee.List(dict.values());
      var threshold = ee.Number(values.reduce(ee.Reducer.sum())).multiply(cluster_threshold); // make sure each cluster > 10% * sum 
      var clusterList = values.map(function (value) {
        value = ee.Number.parse(value);
        return value.gt(threshold);
      });
      var indexes = ee.List.sequence(0, keys.size().subtract(1));
      var clsLabels = indexes.map(function(index) {
        var key = ee.Number.parse(keys.get(index)).add(1);
        var value = clusterList.get(index);
        return key.multiply(value);
      });
      clsLabels = clsLabels.removeAll(ee.List([0]));
      clsLabels = clsLabels.map(function(x) {
        return ee.Number(x).subtract(1);
      });
      var outList = ee.List.repeat(-1, clsLabels.size());
      clusterImg = input.remap(clsLabels, outList).eq(-1);
      clusterImg = clusterImg.updateMask(clusterImg);
      return clusterImg;
    };
    // var ithClusterImg = getWaterCluster(ithClusterImage);
    var waterImages = clusteredImages.map(getWaterCluster);
    var ithWaterImage = ee.Image(waterImages.toList(num_years).get(ith_year));
    JRC_Permanent_Water = JRC_Permanent_Water.updateMask(JRC_Permanent_Water);
    // extract water pixels locoated within multi-temporal NDWI mean
    var getWaterWithinNDWI = function(input){
      var output = ee.Image(input.unmask()).max(NDWI_permanent);
      output = output.updateMask(NDWI_water);
      output = output.updateMask(landforms_wet);
      return output;
    };
    // mask out pixels not located in lower slope and valley landforms
    var getWaterLandforms = function(input) {
      var output = input.updateMask(landforms_wet);
      return output;
    };
    // clustered water pixels located within high NDWI regions
    var refinedWaterImages = waterImages.map(getWaterWithinNDWI);
    // var refinedWaterImages = waterImages.map(getWaterLandforms);
    var ithRefinedWater = ee.Image(refinedWaterImages.toList(num_years).get(ith_year));
    NDWI_permanent = NDWI_permanent.updateMask(NDWI_permanent);
    // smooth resulting image
    var smoothImage = function(input) {
      var kernel = ee.Kernel.circle({radius: 1});
      // Perform an erosion followed by a dilation, display.
      var opened = input
            .focal_min({kernel: kernel, iterations: 1})
            .focal_max({kernel: kernel, iterations: 1});
            // .focal_min({kernel: kernel, iterations: 1});
      return opened;
    };
    var smoothImages = refinedWaterImages.map(smoothImage);
    // var smoothImages = waterImages.map(smoothImage);
    // region group to remove small objects
    var regionGroup = function(input){
      var patch_size = input.connectedPixelCount(min_dep_size, true);  //stop counting pixels when the object is larger than the specified minimum depression size
      var large_patches = patch_size.gte(min_dep_size);
      large_patches = large_patches.updateMask(large_patches);
      return large_patches;
    };
    // var regionImages = smoothImages;
    // var regionImages = smoothImages.map(regionGroup);
    var regionImages = refinedWaterImages;
    // print(regionImages);
    // add image date to resultant image based on the original NAIP image
    var addDate = function(input) {
      var sys_index = ee.Number.parse(input.get('system:index'));
      var start_index = time_start.get(sys_index);
      var end_index = time_end.get(sys_index);
      return input.set({'system:time_start': start_index, 'system:time_end': end_index});
    };
    // regionImages = waterImages.map(addDate);
    regionImages = ee.ImageCollection(regionImages.map(addDate));
    var ithRegionImage = ee.Image(regionImages.toList(num_years).get(ith_year));    // selected year of image to display on the map
    var Occurrence = ee.Image(regionImages.sum().toUint8());  // Binary image containing 1 anywhere water has ever been detected.
    var Max_Extent = Occurrence.gt(1);
    Max_Extent = ee.Image(regionGroup(Max_Extent));
    Max_Extent = Max_Extent.updateMask(Max_Extent);
    // identify NWI polygons that do not intersect JRC/NAIP water polygons
    var JRC_Water_Max_Extent_Vec = JRC_Water_Max_Extent.reduceToVectors({geometry: geom, scale: 30, bestEffort: true, maxPixels: 2e10});
    // var OccurrenceBin = ithRegionImage.gt(0);
    // OccurrenceBin = OccurrenceBin.updateMask(OccurrenceBin);
    // var OccurrenceVec = OccurrenceBin.reduceToVectors({geometry: geom, scale: 10, bestEffort: true, maxPixels: 2e10});
    // print(OccurrenceVec.size());
    // var NWI_No_Water = NWI.filter(ee.Filter.disjoint({leftValue: JRC_Water_Max_Extent_Vec.geometry(), rightField: '.geo'}));
    // // var NWI_No_Water = NWI.filterBounds(OccurrenceVec);
    // print(NWI_No_Water.size());
    var waterVectors = regionImages.map(geelib.rasterToVector).toList(num_years);
    var ithWaterVector = ee.FeatureCollection(waterVectors.get(ith_year));
    // // export inudation and occurrence images
    // for(var i = 0; i < 6; i++) {
    //   ithRegionImage = ee.Image(regionImages.toList(num_years).get(i));
    //   geelib.exportRasterToDrive(ithRegionImage, 'HUC_' + huc10_id + '_Inundation_' + years[i].toString(), 1, geom);
    // }
    // export inudation and occurrence images
    var dates = time_start.map(function(date) {return ee.Date(date).millis()});
    dates.evaluate(
      function (dates) {
        dates.forEach(
          function (date) {
            var year = new Date(date).getFullYear();
            // geelib.exportRasterToDrive(ithRegionImage, 'HUC_' + huc10_id + '_Inundation_' + String(year), 1, geom);
            });
      }
    );
    // geelib.exportRasterToDrive(Occurrence.toInt(), 'HUC_' + huc10_id + '_Occurrence', 1, geom);
    geelib.exportRasterToDrive(Max_Extent, 'HUC_' + huc10_id + '_Max_Extent', 1, geom);
    var NDWI_smooth = smoothImage(NDWI_water);
    var NDWI_regions = regionGroup(NDWI_smooth);
    var NDWIwaterVectors = geelib.rasterToVector(NDWI_regions.clip(geom));
    // print(NDWIwaterVectors.size())
    // geelib.exportVectorToDrive(NDWIwaterVectors,'', 'SHP', 'HUC_' + huc10_id + '_NDWI_Water_Poly');
    geelib.exportRasterToDrive(NDWI_water, 'HUC_' + huc10_id + '_NDWI_Water', 1, geom);
    ithRegionImage = ee.Image(regionImages.toList(num_years).get(ith_year));    // selected year of image to display on the map
    // calculate omission error
    var calcOmission = function(input) {
      var sys_index = ee.Number.parse(input.get('system:index'));
      var iJRCwater = ee.Image(JRC_monthly_waters.toList(num_years).get(sys_index)); 
      var inputUnmask = input.unmask();
      var omissionImage = inputUnmask.eq(0).and(iJRCwater.eq(1));
      omissionImage = omissionImage.updateMask(omissionImage);
      omissionImage = regionGroup(omissionImage);
      return omissionImage;
    };
    var omissionImages = regionImages.map(calcOmission);
    omissionImages = omissionImages.map(addDate);
    // calculate pixel area in hectare
    var getArea = function(input) {
      var pixelArea = input.multiply(ee.Image.pixelArea()).divide(10000);  
      var watershedArea = pixelArea.reduceRegions({
        collection: HUC,
        reducer: ee.Reducer.sum(),
        scale: 10
      });
      watershedArea = watershedArea.map(function(fc) {
        var year = ee.Date(input.get('system:time_start')).get('year');
        var fieldValue = ee.String('Y').cat(ee.String(year));
        return fc.set('year', fieldValue);
      });
      // watershedArea = watershedArea.map(function(fc) {return fc.set({Y2010ha: fc.get('sum')})});
      watershedArea = watershedArea.select(['huc10', 'name', 'year', 'sum']);
      return watershedArea;
    };
    var NAIP_water_areas = regionImages.map(getArea);
    NAIP_water_areas = NAIP_water_areas.flatten();
    var JRC_water_areas = JRC_monthly_waters.map(getArea);
    JRC_water_areas = JRC_water_areas.flatten();
    var omission_areas = omissionImages.map(getArea);
    omission_areas = omission_areas.flatten();
    var NAIP_water_table = ee.FeatureCollection(geelib.formatTable(NAIP_water_areas, 'name', 'year'));
    var JRC_water_table = ee.FeatureCollection(geelib.formatTable(JRC_water_areas, 'name', 'year'));
    var omission_table = ee.FeatureCollection(geelib.formatTable(omission_areas, 'name', 'year'));
    // prepare JRC stats for exporting to csv
    var JRC_dict = JRC_water_table.first().toDictionary().remove(['name']);
    var JRC_dict_keys = JRC_dict.keys();
    var JRC_dict_values = JRC_dict_keys.map(function(key) {
      return ee.Number.parse(ee.Number(JRC_dict.get(key)).format('%.2f'));
    });
    JRC_dict = ee.Dictionary.fromLists(JRC_dict_keys, JRC_dict_values);    
    // prepare NAIP stats for exporting to csv
    var NAIP_dict = NAIP_water_table.first().toDictionary().remove(['name']);
    var NAIP_dict_keys = NAIP_dict.keys();
    var NAIP_dict_values = NAIP_dict_keys.map(function(key) {
      return ee.Number.parse(ee.Number(NAIP_dict.get(key)).format('%.2f'));
    });
    NAIP_dict = ee.Dictionary.fromLists(NAIP_dict_keys, NAIP_dict_values);  
    // prepare omission stats for exporting to csv
    var OMI_dict = omission_table.first().toDictionary().remove(['name']);
    var OMI_dict_keys = OMI_dict.keys();
    var OMI_dict_values = OMI_dict_keys.map(function(key) {
      return ee.Number.parse(ee.Number(OMI_dict.get(key)).format('%.2f'));
    });
    OMI_dict = ee.Dictionary.fromLists(OMI_dict_keys, OMI_dict_values);  
    var NAIP_water_table2 = NAIP_water_table.map(function(fc) {
      return fc.set({Type: 'NAIP'});
    });
    var JRC_water_table2 = JRC_water_table.map(function(fc) {
      return fc.set({Type: 'JRC'});
    });
    var omission_table2 = omission_table.map(function(fc) {
      return fc.set({Type: 'Omission'});
    });
    var stats_table = NAIP_water_table2.merge(JRC_water_table2).merge(omission_table2);
    stats_table = stats_table.map(function(fc) {
      return fc.set({HUC10: huc10_id, basinSize: ee.Number(clicked_basin_size), nwiCount: NWI_count, nwiArea: ee.Number(NWI_total)});
    });
    stats_table = stats_table.select([".*"], null, false);
    geelib.exportTableToDrive(stats_table, 'HUC_' + huc10_id + '_Stats', 'CSV', null);
    var get_nwi_types = function(sums) {
      var getX = function(x) {
        return ee.Dictionary(x).get('Wetland Type');
      };
      var getY = function(y) {
        return ee.Number.parse(ee.Dictionary(y).get('sum')).divide(1e4).format('%.2f');
      };
      var X = ee.List(sums).map(getX);
      var Y = ee.List(sums).map(getY);    
      return ee.Dictionary.fromLists(X, Y);
    };
    var nwi_types = get_nwi_types(NWI_sums);
    var create_data_dict = function() {
      var dict = ee.Dictionary({
        'A_HUC_10': clicked_basin_id, 
        'A_HUC_08': huc8_id,
        'A_HUC_Name': clicked_basin_name,
        'A_HUC_Area': basin_area.format('%.4f'),
        'GLCF2000': GLCF_Water_Area,
        'JRC-Max-Extent': JRC_Water_Max_Area,
        'JRC-Area-Ratio': pct_JRC_water.format('%.4f'),
        'NWI-Area-Ratio': pct_NWI_water.format('%.4f'),
        'NWI-Count': NWI_count,
        'NWI-Total-Area': NWI_total,
        'NWI-Mean-Size': NWI_mean,
        'NDWI-Otsu-Threshold': threshold_NDWI,
        'NDWI-JRC-Threshold': threshold_ndwi,
        'NWI-Emergent': ee.Algorithms.If(nwi_types.contains('Freshwater Emergent Wetland'), nwi_types.get('Freshwater Emergent Wetland'), null),
        'NWI-Forested': ee.Algorithms.If(nwi_types.contains('Freshwater Forested/Shrub Wetland'), nwi_types.get('Freshwater Forested/Shrub Wetland'), null),
        'NWI-Pond': ee.Algorithms.If(nwi_types.contains('Freshwater Pond'), nwi_types.get('Freshwater Pond'), null),
        'NWI-Lake': ee.Algorithms.If(nwi_types.contains('Lake'), nwi_types.get('Lake'), null),
        'NWI-Riverine': ee.Algorithms.If(nwi_types.contains('Riverine'), nwi_types.get('Riverine'), null),
        'JRC-2009': ee.Algorithms.If(JRC_dict.contains('Y2009'), JRC_dict.get('Y2009'), null),
        'JRC-2010': ee.Algorithms.If(JRC_dict.contains('Y2010'), JRC_dict.get('Y2010'), null),
        'JRC-2011': ee.Algorithms.If(JRC_dict.contains('Y2011'), JRC_dict.get('Y2011'), null),
        'JRC-2012': ee.Algorithms.If(JRC_dict.contains('Y2012'), JRC_dict.get('Y2012'), null),
        'JRC-2013': ee.Algorithms.If(JRC_dict.contains('Y2013'), JRC_dict.get('Y2013'), null),
        'JRC-2014': ee.Algorithms.If(JRC_dict.contains('Y2014'), JRC_dict.get('Y2014'), null),
        'JRC-2015': ee.Algorithms.If(JRC_dict.contains('Y2015'), JRC_dict.get('Y2015'), null),
        'NAIP-2009': ee.Algorithms.If(NAIP_dict.contains('Y2009'), NAIP_dict.get('Y2009'), null),
        'NAIP-2010': ee.Algorithms.If(NAIP_dict.contains('Y2010'), NAIP_dict.get('Y2010'), null),
        'NAIP-2011': ee.Algorithms.If(NAIP_dict.contains('Y2011'), NAIP_dict.get('Y2011'), null),
        'NAIP-2012': ee.Algorithms.If(NAIP_dict.contains('Y2012'), NAIP_dict.get('Y2012'), null),
        'NAIP-2013': ee.Algorithms.If(NAIP_dict.contains('Y2013'), NAIP_dict.get('Y2013'), null),
        'NAIP-2014': ee.Algorithms.If(NAIP_dict.contains('Y2014'), NAIP_dict.get('Y2014'), null),
        'NAIP-2015': ee.Algorithms.If(NAIP_dict.contains('Y2015'), NAIP_dict.get('Y2015'), null),
        'NAIP-2016': ee.Algorithms.If(NAIP_dict.contains('Y2016'), NAIP_dict.get('Y2016'), null),
        'NAIP-2017': ee.Algorithms.If(NAIP_dict.contains('Y2017'), NAIP_dict.get('Y2017'), null),
        'OMI-2009': ee.Algorithms.If(OMI_dict.contains('Y2009'), OMI_dict.get('Y2009'), null),
        'OMI-2010': ee.Algorithms.If(OMI_dict.contains('Y2010'), OMI_dict.get('Y2010'), null),
        'OMI-2011': ee.Algorithms.If(OMI_dict.contains('Y2011'), OMI_dict.get('Y2011'), null),
        'OMI-2012': ee.Algorithms.If(OMI_dict.contains('Y2012'), OMI_dict.get('Y2012'), null),
        'OMI-2013': ee.Algorithms.If(OMI_dict.contains('Y2013'), OMI_dict.get('Y2013'), null),
        'OMI-2014': ee.Algorithms.If(OMI_dict.contains('Y2014'), OMI_dict.get('Y2014'), null),
        'OMI-2015': ee.Algorithms.If(OMI_dict.contains('Y2015'), OMI_dict.get('Y2015'), null),
        'OMI-2016': ee.Algorithms.If(OMI_dict.contains('Y2016'), OMI_dict.get('Y2016'), null),
        'OMI-2017': ee.Algorithms.If(OMI_dict.contains('Y2017'), OMI_dict.get('Y2017'), null)
      });
      return dict;
    };
    var data_dict = create_data_dict();
    // print(data_dict);
    var csv_feature = ee.Feature(null, data_dict);
    var csv_feat_col = ee.FeatureCollection([csv_feature]);
    geelib.exportTableToDrive(csv_feat_col, 'HUC_' + huc10_id + '_Data', 'CSV', null);
    // Make a chart by feature. (rowid: name; colid: year)
    var chartH = function(table, title) {return ui.Chart.feature.byFeature(table, 'name')
        .setChartType('ColumnChart')
        .setOptions({
          title: title, //'Total Wetland Inundation Area',
          hAxis: {title: 'Watershed'},
          vAxis: {title: 'Inundation Area (ha)'}
        });
    };
    // Make a chart by feature. (rowid: year; colid: sum)
    var chartV = function(table, title) {return ui.Chart.feature.byFeature(table, 'year', 'sum')
        .setChartType('ColumnChart')
        .setOptions({
          title: title, //'Total Wetland Inundation Area',
          hAxis: {title: 'Year'},
          vAxis: {title: 'Inundation Area (ha)'}
    })};
    // add label widgets.
    var uid = 4;  // starting widget index. 4 widgets already exist. 
    var label_subbasin_id = ui.Label();   // display watershed id
    panel.widgets().set(uid++, label_subbasin_id); 
    var label_subbasin_name = ui.Label();   // display watershed name  
    panel.widgets().set(uid++, label_subbasin_name); 
    var label_subbasin_size = ui.Label();   // display watershed size
    panel.widgets().set(uid++, label_subbasin_size); 
    var label_glcf_water = ui.Label();      // display GLCF water area for the watershed
    panel.widgets().set(uid++, label_glcf_water); 
    var label_jrc_water = ui.Label();       // display JRC water max extent for the watershed
    panel.widgets().set(uid++, label_jrc_water); 
    var label_jrc_pct = ui.Label();        // display the ratio between JRC max water extent and watershed area
    panel.widgets().set(uid++, label_jrc_pct); 
    var label_nwi_count = ui.Label();       // display NWI wetland count 
    panel.widgets().set(uid++, label_nwi_count); 
    var label_nwi_total = ui.Label();       // display total NWI wetland area
    panel.widgets().set(uid++, label_nwi_total); 
    var label_nwi_mean = ui.Label();        // display average NWI wetland size
    panel.widgets().set(uid++, label_nwi_mean); 
    var label_nwi_pct = ui.Label();        // display the ratio between NWI wetland extent and watershed area
    panel.widgets().set(uid++, label_nwi_pct); 
    // Add widgets to panel (using 'evaluate' for asynchronous calls):
    label_subbasin_id.setValue('Watershed id: computing ...');
    clicked_basin_id.evaluate(function(result) {
      label_subbasin_id.setValue('Watershed id: ' +  result);
    });
    label_subbasin_name.setValue('Watershed name: computing ...');
    clicked_basin_name.evaluate(function(result) {
      label_subbasin_name.setValue('Watershed name: ' +  result);
    });
    label_subbasin_size.setValue('Watershed area: computing ...');
    clicked_basin_size.evaluate(function(result) {
      label_subbasin_size.setValue('Watershed area: ' +  result + ' ha (1 ha = 10,000 m2)');
    });
    label_glcf_water.setValue('GLCF Landsat water area (2000): computing ...');
    GLCF_Water_Area.evaluate(function(result) {
      label_glcf_water.setValue('GLCF Landsat water area (2000): ' +  result + ' (ha)');
    });
    label_jrc_water.setValue('JRC max water extent (1984-2015): computing ...');
    JRC_Water_Max_Area.evaluate(function(result) {
      label_jrc_water.setValue('JRC max water extent (1984-2015): ' +  result + ' (ha)');
    });
    label_jrc_pct.setValue('JRC max water extent / watershed area: computing ...');
    pct_JRC_water_label.evaluate(function(result) {
      label_jrc_pct.setValue('JRC max water extent / watershed area: ' +  result + '%');
    });
    label_nwi_count.setValue('NWI wetland count: computing ...');
    NWI_count.evaluate(function(result) {
      label_nwi_count.setValue('NWI wetland count: ' +  result);
    });
    label_nwi_total.setValue('NWI total wetland area: computing ...');
    NWI_total.evaluate(function(result) {
      label_nwi_total.setValue('NWI total wetland area: ' +  result + ' (ha)');
    });
    label_nwi_mean.setValue('NWI average wetland size: computing ...');
    NWI_mean.evaluate(function(result) {
      label_nwi_mean.setValue('NWI average wetland size: ' +  result + ' (ha)');
    });
    label_nwi_pct.setValue('NWI wetland extent / watershed area: computing ...');
    pct_NWI_water_label.evaluate(function(result) {
      label_nwi_pct.setValue('NWI wetland extent / watershed area: ' +  result + '%');
    });
    var uid_nwi = uid; uid++;
    panel.widgets().set(uid_nwi, ui.Label({
      value: 'Loading NWI chart ...',
      style: {color: 'gray'}
    }));  
    NWI_sums.evaluate(function(result) {
      panel.widgets().set(uid_nwi, geelib.plotSumNWI(result));
    });  
    var label_NDWI_id = ui.Label();
    panel.widgets().set(uid++, label_NDWI_id); 
    label_NDWI_id.setValue('NDWI threshold based on Otsu method: computing ...');
    threshold_NDWI.evaluate(function(result) {
      label_NDWI_id.setValue('NDWI threshold based on Otsu method: ' +  result);
    });
    var label_NDWI_revised_id = ui.Label();
    panel.widgets().set(uid++, label_NDWI_revised_id); 
    label_NDWI_revised_id.setValue('NDWI threshold based on JRC coverage ratio: computing ...');
    threshold_ndwi_label.evaluate(function(result) {
      label_NDWI_revised_id.setValue('NDWI threshold based on JRC coverage ratio: ' +  result);
    });
    var uid_ndwi = uid; uid++;
    panel.widgets().set(uid_ndwi, ui.Label({
      value: 'Loading NDWI chart ...',
      style: {color: 'gray'}
    }));  
    hist_NDWI = ee.List([hist_NDWI.get('histogram'),hist_NDWI.get('bucketMeans')]);
    hist_NDWI.evaluate(function(result) {
      panel.widgets().set(uid_ndwi, ui.Chart.array.values(result[0], 0, result[1])
        .setChartType('ColumnChart')
        .setOptions({title: 'Histogram of Mean NDWI (2009-2017)' ,
                                    vAxis: {title: 'Frequency'},
                                    hAxis: {title: 'NDWI'},
                                    bar: {groupWidth: "100%"},
                                    legend: {position: 'none'}}));
    });  
    var uid_waterH_JRC = uid; uid++;
    panel.widgets().set(uid_waterH_JRC, ui.Label({
      value: 'Loading JRC Surface Water Chart ...',
      style: {color: 'gray'}
    }));  
    JRC_water_table.evaluate(function(result) {
      panel.widgets().set(uid_waterH_JRC, chartH(JRC_water_table, 'Total Surface Water Area (JRC)'));
    });  
    var uid_waterH = uid; uid++;
    panel.widgets().set(uid_waterH, ui.Label({
      value: 'Loading NAIP Wetland Inundation Chart ...',
      style: {color: 'gray'}
    }));  
    NAIP_water_table.evaluate(function(result) {
      panel.widgets().set(uid_waterH, chartH(NAIP_water_table, 'Total Wetland Inundation Area (NAIP)'));
    });  
    var uid_omissioni = uid; uid++;
    panel.widgets().set(uid_omissioni, ui.Label({
      value: 'Loading Omission Chart ...',
      style: {color: 'gray'}
    }));  
    omission_table.evaluate(function(result) {
      panel.widgets().set(uid_omissioni, chartH(omission_table, 'Total Omission Area'));
    }); 
    var nwi_color = geelib.nwi_add_color(NWI);
    // add layers to display on the map
    Map.layers().set(ilyr++, ui.Map.Layer(ithNAIP, geelib.viz.nir, 'NAIP Imagery', true));    
    Map.layers().set(ilyr++, ui.Map.Layer(hillshade, {}, 'NED Hillshade', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(landforms, geelib.viz.landforms, 'NED Landform', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(NDWI_mean, geelib.viz.ndwi, 'Mean NDWI (2009-2017)', false));  
    Map.layers().set(ilyr++, ui.Map.Layer(NDWI_water, {palette: 'green'}, 'NDWI Water', false)); 
    Map.layers().set(ilyr++, ui.Map.Layer(NDWI_permanent, {palette: 'cyan'}, 'NDWI Permanent', false)); 
    // Map.layers().set(ilyr++, ui.Map.Layer(ithNDWI, {palette: 'blue'}, 'NDWI Regions', false));  
    Map.layers().set(ilyr++, ui.Map.Layer(ithClusterImage.randomVisualizer(), {}, 'K-means Clusters', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(ithWaterImage, {}, 'Water Clusters', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(ithRefinedWater, {palette: 'green'}, 'Refined Water', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(ithRegionImage, {palette: 'blue'}, 'Inundation Image', true));   
    Map.layers().set(ilyr++, ui.Map.Layer(ithWaterVector, {}, 'Inundation Vectors', false));    
    // Map.layers().set(ilyr++, ui.Map.Layer(ithOmissionImage, {}, "Omission " + selected_year.toString(), false));   
    // Map.layers().set(ilyr++, ui.Map.Layer(ithOmissionImageVec, {}, "Omission Vec" + selected_year.toString(), false));    
    Map.layers().set(ilyr++, ui.Map.Layer(ithJRCwater, {}, "JRC Monthly History", false));    
    Map.layers().set(ilyr++, ui.Map.Layer(Occurrence.randomVisualizer(), {}, 'NAIP Water Occurrence', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(Max_Extent, {palette: 'white'}, 'Max Water Extent', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(JRC_Water_Occurrence, geelib.viz.ndwi, "JRC Water Occurrence", false));    
    Map.layers().set(ilyr++, ui.Map.Layer(JRC_Permanent_Water.randomVisualizer(), {}, "JRC Permanent Water", false)); 
    Map.layers().set(ilyr++, ui.Map.Layer(GLCF_Water.randomVisualizer(), {}, 'GLCF Water (2000)', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(nwi_color, {gamma: 0.3}, 'NWI Wetlands Color', false));    
    Map.layers().set(ilyr++, ui.Map.Layer(NWI, {}, 'NWI Wetlands', false));   
    // Map.layers().set(ilyr++, ui.Map.Layer(ee.Image().paint(roi, 0, 3), {palette: 'green'}, 'Training Area')); 
  });
  // convert map cursor to crosshair
  Map.style().set('cursor', 'crosshair');
  deactiv_button.setDisabled(false);       // enable the deactivate button
  inspect_button.setDisabled(true);        // disable this button
}});
var deactiv_button  = ui.Button({label: 'Deactivate inspector', onClick: function() {
  Map.unlisten();                     // deletes map callback function
  Map.style().set('cursor', 'hand');  // reset the map's default cursor
  inspect_button.setDisabled(false);  // enable the activate button
  deactiv_button.setDisabled(true);   // disable this button
}, disabled: true});
// add activate and deacivate buttons
buttons_panel.add(inspect_button);
buttons_panel.add(deactiv_button);
panel.add(buttons_panel);
ui.root.insert(0, panel);