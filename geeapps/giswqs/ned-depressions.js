//// ********************************************************************//// 
// This script was developed to delineate a national dataset of.            //
// surface depressions and potential water storage.                        //
// Please use Google Chrome. Other browsers might not work properly.       //
// Author: Qiusheng Wu (https://wetlands.io | http://GIShub.org)           //
//// ********************************************************************//// 
// Load modules
var utils = require('users/giswqs/public:Modules/utils');
var datasets = require('users/giswqs/public:Modules/datasets');
var mapping = require('users/giswqs/public:Modules/mapping');
// Visit the following URL to see the source code for the above modules: 
// https://code.earthengine.google.com/?accept_repo=users/giswqs/modules
// Load PPR and National Hydrography Dataset (NHD) 
var PPR = ee.FeatureCollection("users/giswqs/PPR/PPR_USA_v2");
var HUC10 = ee.FeatureCollection('USGS/WBD/2017/HUC10');  // 18,487 HUC10 watersheds in the U.S.
var HUC08 = ee.FeatureCollection('USGS/WBD/2017/HUC08');  // 2,303 HUC08 subbasins in the U.S.
var PPR_HUC10 = HUC10.filterBounds(PPR);                  // 993 HUC10 watersheds in the PPR
var PPR_HUC08 = HUC08.filterBounds(PPR);                  // 132 HUC08 subbasins in the PPR
// Customize parameters
var scale = 2;          // image scale (resolution) for computing statistics
var min_dep_size = 100; // minimum depression/wetland size in pixels
var nclusters = 6;      // number of clusters for the k-means clustering
var years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]; // available NAIP imagery for the PPR
var num_years = years.length;     // number of years with available NAIP imagery
var permanent_threshold = 50;     // threshold (%) for extracting permanent water from JRC Global Water Occurrence 
var cluster_threshold = 0.05;     // A cluster within permanent water must exceed x% of pixels in order to be classified as water
var otsu_delta = 0.20;            // threshold for otsu method
var usda_threshold = 2;           // usda cropland water threshold 1-21.            
// Add HUC layers to the map
Map.setCenter(-99.00, 47.01, 8);
var ned = ee.Image("USGS/3DEP/10m");
var hillshade = ee.Terrain.hillshade(ned);
var conus = ee.Geometry.BBox(-127.18, 19.39, -62.75, 51.29);
var huc8 = ee.FeatureCollection("USGS/WBD/2017/HUC08").filterBounds(conus);
var pipestem_hu8 = ee.FeatureCollection("users/giswqs/Pipestem/Pipestem_HUC8");
var style = {"color": "00000088", "fillColor": "00000000", "width": 1};
Map.addLayer(hillshade, {}, "NED Hillshade", false);
Map.addLayer(huc8.style(style), {}, "NHD-HU8");
Map.addLayer(pipestem_hu8.style({"color": "ffff00ff", "fillColor": "00000000", "width": 2}), {}, "Pipestem HU8");
// Map.addLayer(ee.Image().paint(datasets.ND_HUC08, 0, 2), {palette: ['green']}, 'HUC08 Subbasin');   // HUC08 for the study area
// Map.addLayer(ee.Image().paint(HUC10, 0, 1), {}, 'HUC10 Watershed');   // HUC10 for the PPR
// Map.addLayer(ee.Image().paint(PPR, 0, 3), {}, 'PPR');                     // HUC08 for the study area
// ---------------------------------------------------------------------------------------------------- //
// Interactive UI
// ---------------------------------------------------------------------------------------------------- //
// Add a panel to the left of the map for displaying results 
var panel = ui.Panel();
panel.style().set('width', '400px');
var link_panel = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
var download_label =   ui.Label('Data download link:');
var link_label = ui.Label('https://bit.ly/3INBSh8', {}, 'https://bit.ly/3INBSh8');
link_panel.add(download_label);
link_panel.add(link_label);
var intro = ui.Panel([
  ui.Label({
    value: 'National Depressions Dataset',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'A national dataset of surface depressions and potential water storage',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  link_panel,
  ui.Label('Select datasets', {fontSize: '16px', fontWeight: 'bold'})
]);
panel.add(intro);
var data_panel = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
var add_dep = ui.Checkbox('Depressions', true);
var add_nwi = ui.Checkbox('NWI', true);
var add_nhd = ui.Checkbox('NHD', true);
var add_naip = ui.Checkbox('NAIP', true);
data_panel.add(add_dep);
data_panel.add(add_nwi);
data_panel.add(add_nhd);
data_panel.add(add_naip);
panel.add(data_panel);
var buttons_panel = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
var years_panel = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
var nlayers = Map.layers().length();
// var year_select = ui.Select({
//     items: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
//     value: '2015',
//     onChange: function(key){
//       Map.unlisten();                     // deletes map callback function
//       Map.style().set('cursor', 'hand');  // reset the map's default cursor
//       watershed_button.setDisabled(false);  // enable the activate button
//       deactiv_button.setDisabled(true);   // disable this button
//     }
//   });
// years_panel.add(year_select);
// panel.add(years_panel);
panel.add(ui.Label('Activate the inspector and click on the map to select a watershed to display datasets.'));
var watershed_button  = ui.Button({label: 'Select a Watershed', onClick: function() {
  // register a callback on the map to be invoked when the map is clicked
  // var selected_year = parseInt(year_select.getValue(), 10);
  // var ith_year = years.indexOf(selected_year);
  Map.onClick(function(coords) {
    // get clicked subbasin info
    var clicked_point = ee.Geometry.Point(coords.lon, coords.lat);
    var selected = huc8.filterBounds(clicked_point);
    var huc_id = selected.first().get("huc8").getInfo();    
    var hillshade_clip = hillshade.clipToCollection(selected);
    var ilyr = 3;
    Map.layers().set(ilyr++, ui.Map.Layer(hillshade_clip, {}, "Hillshade"));
    // Map.addLayer(hillshade_clip, {}, "Hillshade");
    Map.layers().set(ilyr++, ui.Map.Layer(selected.style({"color": "ff0000ff", "fillColor": "00000000"}), {}, "HU8-" + huc_id));    
    // Map.addLayer(selected.style({"color": "ff0000ff", "fillColor": "00000000"}), {}, "HU8-" + huc_id);
    var depression_id = "users/giswqs/depressions/" + huc_id;
    var depressions = ee.FeatureCollection(depression_id);
    var nwi_id = "users/giswqs/NWI-HU8/HU8_" + huc_id + "_Wetlands";
    var nwi = ee.FeatureCollection(nwi_id);
    print(depressions.first());
    Map.layers().set(ilyr++, ui.Map.Layer(depressions, {}, "DEP-" + huc_id));  
    if (huc_id == "10160002") {
      var pipestem = ee.FeatureCollection("users/giswqs/Pipestem/Pipestem_HUC10");
      var lidar = ee.Image("users/giswqs/Pipestem/lidar_3m");
      var intensity = ee.Image("users/giswqs/Pipestem/intensity");
      var hillshade_lidar = ee.Terrain.hillshade(lidar);
      var flowpaths = ee.FeatureCollection("users/giswqs/Pipestem/flow_paths");
      var depressions_lidar = ee.FeatureCollection("users/giswqs/Pipestem/depressions");
      var flow_from = ee.FeatureCollection("users/giswqs/Pipestem/flow_from");
      var flow_to = ee.FeatureCollection("users/giswqs/Pipestem/flow_to");
      var catchments = ee.FeatureCollection("users/giswqs/Pipestem/catchments");
      // var nwi = ee.FeatureCollection("users/giswqs/Pipestem/NWI");
      var empty = ee.Image().byte();
      // Map.setCenter(-99.09526, 47.099772, 15);
      Map.layers().set(ilyr++, ui.Map.Layer(intensity, {min: 0, max: 255}, 'LiDAR Intensity', false));    
      Map.layers().set(ilyr++, ui.Map.Layer(lidar, {min: 400, max: 700}, 'LiDAR DEM', false));   
      Map.layers().set(ilyr++, ui.Map.Layer(hillshade_lidar, {}, 'LiDAR Hillshade'));   
      Map.layers().set(ilyr++, ui.Map.Layer(empty.paint(catchments, 0, 2), {'palette': 'pink'}, "LiDAR Catchments", false));   
      Map.layers().set(ilyr++, ui.Map.Layer(depressions_lidar, {}, "liDAR Depressions"));   
      Map.layers().set(ilyr++, ui.Map.Layer(empty.paint(flowpaths, 0, 2), {'palette': "blue"}, 'Flow path'));   
      Map.layers().set(ilyr++, ui.Map.Layer(flow_from, {'color': "red"}, 'Water outlet'));         
      Map.layers().set(ilyr++, ui.Map.Layer(flow_to, {'color': "green"}, 'Water inlet'));   
      // Map.addLayer(intensity, {min: 0, max: 255}, 'LiDAR Intensity', false);
      // Map.addLayer(lidar, {min: 400, max: 700}, 'LiDAR DEM', false);
      // Map.addLayer(hillshade_lidar, {}, 'LiDAR Hillshade');
      // Map.addLayer(empty.paint(catchments, 0, 2), {'palette': 'pink'}, "LiDAR Catchments", false);
      // Map.addLayer(depressions_lidar, {}, "liDAR Depressions");
      // // Map.addLayer(nwi, {}, "NWI", false);
      // Map.addLayer(empty.paint(flowpaths, 0, 2), {'palette': "blue"}, 'Flow path');
      // Map.addLayer(flow_from, {'color': "red"}, 'Water outlet');
      // Map.addLayer(flow_to, {'color': "green"}, 'Water inlet');
      // // Map.addLayer(empty.paint(pipestem, 0, 2), {}, 'Pipestem HUC-10');
    } else {
      if (Map.layers().length() > 6) {
        for (var i = Map.layers().length(); i > 6; i--) {
          Map.layers().remove(Map.layers().get(i));
        }
      }
    }
    // var names = [
    //     "Freshwater Forested/Shrub Wetland",
    //     "Freshwater Emergent Wetland",
    //     "Freshwater Pond",
    //     "Estuarine and Marine Wetland",
    //     "Riverine",
    //     "Lake",
    //     "Estuarine and Marine Deepwater",
    //     "Other",
    // ];
    // var colors = [
    //     "#008837",
    //     "#7FC31C",
    //     "#688CC0",
    //     "#66C2A5",
    //     "#0190BF",
    //     "#13007C",
    //     "#007C88",
    //     "#B28653",
    // ];
    // function dictZip(key_array, val_array) {
    //   if (key_array.length === val_array.length) {
    //     return key_array.reduce((acc, curr, index) => {
    //       acc[curr] = val_array[index];
    //       return acc;
    //     }, {});
    //   } else {
    //     console.error("Wrong length");
    //   }
    // }
    var nwi_colors = {
        "Freshwater Forested/Shrub Wetland": "#008837",
        "Freshwater Emergent Wetland": "#7FC31C",
        "Freshwater Pond": "#688CC0",
        "Estuarine and Marine Wetland": "#66C2A5",
        "Riverine": "#0190BF",
        "Lake": "#13007C",
        "Estuarine and Marine Deepwater": "#007C88",
        "Other": "#B28653",      
    };
    var color_dict = ee.Dictionary(nwi_colors);    
    var nwi_set_color = function(f) {
      return  f.set(
                      {
                          "style": {
                              "width": 1,
                              "color": "00000088",
                              "fillColor": ee.String(
                                  color_dict.get(f.get("WETLAND_TY"))
                              ).cat("99"),
                          }
                      }
                  );
          };
    var nwi_fc = nwi.map(nwi_set_color);
    // Map.addLayer(nwi, {}, 'NWI-' + huc_id);
    // Map.addLayer(nwi_fc.style({"styleProperty": "style"}), {}, "NWI-" + huc_id);
    Map.layers().set(ilyr++, ui.Map.Layer(nwi_fc.style({"styleProperty": "style"}), {}, "NWI-" + huc_id)); 
    // Map.addLayer(depressions, {}, "DEP-" + huc_id);
  //   var clicked_basin_fc   = HUC10.filterBounds(clicked_point);
  //   var clicked_basin      = ee.Feature(clicked_basin_fc.first());
  //   var clicked_basin_geom = clicked_basin.geometry();
  //   var clicked_basin_id   = clicked_basin.get('huc10');
  //   var clicked_basin_name = clicked_basin.get('name');
  //   var clicked_basin_size = clicked_basin_geom.area().divide(1e4).format('%,.2f');
  //   var huc10_id = clicked_basin_id.getInfo();
  //   var huc8_id = huc10_id.substring(0, 8);
  //   var nwi_asset_path = 'users/giswqs/NWI-HU8/HU8_' + huc8_id + '_Wetlands';    // NWI wetlands for the clicked watershed
  //   var clicked_nwi_huc = ee.FeatureCollection(nwi_asset_path).filterBounds(clicked_basin_geom)
  //     .filter(ee.Filter.notEquals({leftField: 'WETLAND_TY', rightValue: 'Riverine'}));  // exclude riverine wetlands
  //   var HUC = utils.findHUC10(huc10_id);    // extract NHD HUC10 for the clicked location
  //   var geom = HUC.geometry();
  //   // var centroid = geom.centroid();
  //   var centroid = ee.FeatureCollection.randomPoints(geom, 1).first().geometry();
  //   var lon = centroid.coordinates().get(0);
  //   // deal with points near the US/Canada border
  //   var lat_tmp = ee.Number.parse(centroid.coordinates().get(1));
  //   var lat = ee.Algorithms.If(lat_tmp.lt(49), lat_tmp, 48.998);
  //   centroid = ee.Geometry.Point([lon, lat]);
  //   var roi = centroid.buffer(5000);
  //   var ilyr = 3; 
  //   Map.layers().set(ilyr++, ui.Map.Layer(ee.Image().paint(geom, 0, 3), {palette: 'red'}, 'HUC-' + huc10_id)); 
  // // Get available surface water products in GEE Data Catalog
  //   var GLCF_Water = ee.ImageCollection('GLCF/GLS_WATER').mosaic().clip(geom).eq(2);  // GLCF: Landsat Global Inland Water (2000)
  //   GLCF_Water = GLCF_Water.updateMask(GLCF_Water);
  //   var GLCF_Water_Area = ee.Number.parse(utils.imgAreaHa(GLCF_Water, geom, 30).get('water')).format('%,.2f');
  //   var JRC_Water = ee.Image("JRC/GSW1_4/GlobalSurfaceWater").clip(geom);   // JRC Global Surface Water Mapping Layers (1984-2015)
  //   var JRC_Water_Max_Extent = JRC_Water.select('max_extent');    // The frequency with which water was present.
  //   var JRC_Water_Max_Area = ee.Number.parse(utils.imgAreaHa(JRC_Water_Max_Extent, geom, 30).get('max_extent')).format('%,.2f');
  //   var JRC_Water_Occurrence = JRC_Water.select('occurrence');  // Binary image containing 1 anywhere water has ever been detected.
  //   var JRC_Permanent_Water = JRC_Water_Occurrence.gt(permanent_threshold);
  //   // calcuate image area
  //   var calArea = function(input, fc) {
  //     var pixelArea = input.multiply(ee.Image.pixelArea()).divide(10000);  
  //     var watershedArea = pixelArea.reduceRegions({
  //       collection: fc,
  //       reducer: ee.Reducer.sum(),
  //       scale: 30
  //   });
  //     return watershedArea;
  //   };
  //   // if the JRC permanent water area is less than 1 ha, change the permanent water threshold
  //   var JRC_Permanent_Water_Area = ee.Number(calArea(JRC_Permanent_Water, HUC).aggregate_sum('sum'));
  //   // print(JRC_Permanent_Water_Area)
  //   JRC_Permanent_Water = ee.Image(ee.Algorithms.If(JRC_Permanent_Water_Area.lt(4), JRC_Water_Occurrence.gt(0), JRC_Permanent_Water));    // print(calArea(JRC_Permanent_Water).aggregate_sum('sum'));
  //   // Get time-series NAIP imagery with NDWI and NDVI bands added
  //   var NAIP = utils.findNAIP(geom);
  //   var time_start = ee.List(NAIP.aggregate_array('system:time_start')); // image acquisition date (starting time)
  //   var time_end = ee.List(NAIP.aggregate_array('system:time_end'));     // image acquisition date (ending time)
  //   var yearList = time_start.map(function(y){
  //     return ee.Date(y).get('year');
  //   });
  //   // Get available NAIP imagery for the watershed
  //   // print(yearList);
  //   // print(yearList.indexOf(selected_year))
  //   // var years = yearList.getInfo();
  //   // var n_years = years.length;
  //   var ith_year = yearList.indexOf(selected_year);
  //   ith_year = ee.Algorithms.If(ith_year.lt(0), 0, ith_year);
  //   // print(ith_year);
  //   // if (ith_year < 0) { ith_year = 0 }
  //   var ithNAIP = ee.Image(NAIP.toList(num_years).get(ith_year));        // selected NAIP imagery to display on the map
  //   // Map.layers().set(ilyr++, ui.Map.Layer(ee.Image().paint(ithNAIP.geometry(), 0, 3), {palette: 'blue'}, 'geom')); 
  //   // Get NWI wetlands for the clicked watershed
  //   var NWI = utils.findNWI(huc8_id).filterBounds(geom);
  //   var NWI_stats = NWI.aggregate_stats('Shape_Area');  
  //   var NWI_summary = utils.summaryStatsNWI(NWI, 'Shape_Area');   // Summary statistics of NWI wetlands for the clicked watershed
  //   var NWI_count = NWI_summary.get(0);   // wetland count
  //   var NWI_total = ee.Number(NWI_summary.get(1)).format('%,.2f');  // total wetland area
  //   var NWI_mean = ee.Number(NWI_summary.get(2)).format('%,.2f');   // mean wetland size
  //   var NWI_sums = utils.groupSum(NWI, 'Shape_Area', 'WETLAND_TY', 'Wetland Type');  // Aggregated wetland area for each wetland type
  //   var NWI_chart = utils.plotSumNWI(NWI_sums);   // plot wetland chart for each wetland type
  //   // var training_samples = ee.FeatureCollection(NWI.sort('Shape_Area', false).toList(50).slice(5, 45));   // select large NWI wetlands as training samples for k-means clustering
  //   // Get NDWI image
  //   var NDWI = NAIP.select(['ndwi']);
  //   var NDWI_mean = ee.ImageCollection(NDWI).mean();  // Create an average NDWI image based on all available NAIP imagery
  //   var hist_NDWI = ee.Dictionary(utils.histogram(NDWI_mean, 'ndwi', geom, scale));  // plot NDWI histogram
  //   var threshold_NDWI = ee.Number.parse(utils.otsu(hist_NDWI).format('%.4f'));      // compute optimal NDWI threshold using Otsu's method 
  //   var threshold_NDWI_delta = threshold_NDWI.subtract(otsu_delta);
  //   threshold_NDWI_delta = ee.Number(ee.Algorithms.If(threshold_NDWI_delta.gt(0), threshold_NDWI_delta, 0));
  //   // print(threshold_NDWI_delta);
  //   var NDWI_water = NDWI_mean.gte(threshold_NDWI_delta);
  //   NDWI_water = NDWI_water.updateMask(NDWI_water);
  //   var get_usda_waters = function(input){
  //       var cropland = ee.ImageCollection('USDA/NASS/CDL')
  //           .filterDate("1997-01-01", "2018-12-31") 
  //           .select('cropland');
  //       var usda_waters = cropland.map(function(img) {return img.remap([83, 87, 111, 190, 195], ee.List.repeat(999, 5)).eq(999).clip(geom).byte().selfMask()});
  //       var usda_water_occurrence = usda_waters.reduce(ee.Reducer.sum()).byte().selfMask();
  //       var usda_water_extent = usda_water_occurrence.gt(usda_threshold).byte().selfMask();
  //       return usda_water_extent;
  //   };
  //   var USDA_water = get_usda_waters(geom);
  //   // get image bound
  //   var getImageBound = function(input){
  //     input = ee.Image(input.select(0)).gt(0);
  //     input = input.updateMask(input);
  //     var fc = input.reduceToVectors({scale: 30, bestEffort: true, maxPixels: 2e10});
  //     return fc.geometry();
  //   };
  //   // extract JRC Monthly History product
  //   var get_JRC_monthly = function(input) {
  //     var start_date = ee.Date(input.get('system:time_start'));
  //     var end_date = ee.Date(input.get('system:time_end'));
  //     var start_year = ee.Number(start_date.get('year'));
  //     start_year = ee.Algorithms.If(start_year.gt(2021), 2021, start_year);  //Between 16 March 1984 and 10 October 2015
  //     var start_month = ee.Number(start_date.get('month'));
  //     var end_month = ee.Number(end_date.get('month')).add(1);
  //     var start = ee.Date.fromYMD(start_year, start_month, 1);
  //     // var end = ee.Date.fromYMD(start_year, end_month, 1);
  //     var end = start.advance(59, 'day');
  //     // var end = ee.Date.fromYMD(start_year, start_month.add(2), 1);
  //     var JRC_monthly_images = ee.ImageCollection("JRC/GSW1_4/MonthlyHistory").filterDate(start, end);
  //     var JRC_monthly_size = ee.Number.parse(JRC_monthly_images.size());
  //     var alt_start = ee.Date.fromYMD(2021, start_month, 1);
  //     var alt_end = alt_start.advance(59, 'day');
  //     var alt_JRC_monthly_images = ee.ImageCollection("JRC/GSW1_4/MonthlyHistory").filterDate(alt_start, alt_end);
  //     JRC_monthly_images = ee.ImageCollection(ee.Algorithms.If(JRC_monthly_size.gt(0), JRC_monthly_images, alt_JRC_monthly_images));
  //     // var JRC_monthly = JRC_monthly_images.max().eq(2).clip(geom);
  //     var JRC_monthly = JRC_monthly_images.max().eq(2).clip(getImageBound(input));
  //     JRC_monthly = JRC_monthly.updateMask(JRC_monthly);
  //     return JRC_monthly.set({'system:time_start': start, 'system:time_end': end});
  //   };
  //   var JRC_monthly_waters = NAIP.map(get_JRC_monthly);
  //   var ithJRCwater = ee.Image(JRC_monthly_waters.toList(num_years).get(ith_year)); 
  //   // function for classifying image using k-means clustering
  //   var classifyImage = function(input){
  //     var imgBound = getImageBound(input);
  //     var centroid = ee.FeatureCollection.randomPoints(imgBound, 1).first().geometry();
  //     var roi = centroid.buffer(5000);
  //     var training = input.sample({
  //       region: roi, // using the sample image to extract training samples
  //       scale: scale,
  //       numPixels: 5000
  //     });
  //     // Instantiate the clusterer and train it.
  //     var clusterer = ee.Clusterer.wekaKMeans(nclusters).train(training);
  //     // Cluster the input using the trained clusterer.
  //     var classifiedImage = input.cluster(clusterer).select('cluster');
  //     return classifiedImage;
  //   };
  //   // classifying the image collection using the map function
  //   var clusteredImages = NAIP.map(classifyImage);
  //   var ithClusterImage = ee.Image(clusteredImages.toList(num_years).get(ith_year));  // selected year of image to display on the map
  //   var getWaterCluster = function(input) {
  //     var clusterImg = input.updateMask(JRC_Permanent_Water);
  //     var frequency = clusterImg.reduceRegion({
  //       reducer: ee.Reducer.frequencyHistogram(),
  //       scale:30,
  //       maxPixels: 2.1E9
  //     });
  //     var dict = ee.Dictionary(frequency.get('cluster'));
  //     var keys = ee.List(dict.keys());
  //     var values = ee.List(dict.values());
  //     var threshold = ee.Number(values.reduce(ee.Reducer.sum())).multiply(cluster_threshold); // make sure each cluster > 10% * sum 
  //     var clusterList = values.map(function (value) {
  //       value = ee.Number.parse(value);
  //       return value.gt(threshold);
  //     });
  //     var indexes = ee.List.sequence(0, keys.size().subtract(1));
  //     var clsLabels = indexes.map(function(index) {
  //       var key = ee.Number.parse(keys.get(index)).add(1);
  //       var value = clusterList.get(index);
  //       return key.multiply(value);
  //     });
  //     clsLabels = clsLabels.removeAll(ee.List([0]));
  //     clsLabels = clsLabels.map(function(x) {
  //       return ee.Number(x).subtract(1);
  //     });
  //     var outList = ee.List.repeat(-1, clsLabels.size());
  //     clusterImg = input.remap(clsLabels, outList).eq(-1);
  //     clusterImg = clusterImg.updateMask(clusterImg);
  //     return clusterImg;
  //   };
  //   // var ithClusterImg = getWaterCluster(ithClusterImage);
  //   var waterImages = clusteredImages.map(getWaterCluster);
  //   var ithWaterImage = ee.Image(waterImages.toList(num_years).get(ith_year));
  //   JRC_Permanent_Water = JRC_Permanent_Water.updateMask(JRC_Permanent_Water);
  //   // // extract water pixels locoated within LiDAR depressions
  //   // var getWaterWithinNDWI = function(input){
  //   //   var output = input.eq(1).and(NDWI_water.eq(1));
  //   //   output = output.updateMask(output);
  //   //   return output;
  //   // };
  //   // // clustered water pixels located within lidar depressions
  //   // var refinedWaterImages = waterImages.map(getWaterWithinNDWI);
  //   // extract water pixels locoated within waters from USDA cropland data
  //   var getWaterWithinUSDA = function(input){
  //     var output = input.eq(1).and(USDA_water.eq(1));
  //     output = output.updateMask(output);
  //     return output;
  //   };
  //   // clustered water pixels located within lidar depressions
  //   var refinedWaterImages = waterImages.map(getWaterWithinUSDA);    
  //   var ithRefinedWater = ee.Image(refinedWaterImages.toList(num_years).get(ith_year));
  //   // smooth resulting image
  //   var smoothImage = function(input) {
  //     var kernel = ee.Kernel.circle({radius: 1});
  //     // Perform an erosion followed by a dilation, display.
  //     var opened = input
  //           .focal_min({kernel: kernel, iterations: 1})
  //           .focal_max({kernel: kernel, iterations: 1});
  //           // .focal_min({kernel: kernel, iterations: 1});
  //     return opened;
  //   };
  //   var smoothImages = refinedWaterImages.map(smoothImage);
  //   // var smoothImages = waterImages.map(smoothImage);
  //   // region group to remove small objects
  //   var regionGroup = function(input){
  //     var patch_size = input.connectedPixelCount(min_dep_size, true);  //stop counting pixels when the object is larger than the specified minimum depression size
  //     var large_patches = patch_size.gte(min_dep_size);
  //     large_patches = large_patches.updateMask(large_patches);
  //     return large_patches;
  //   };
  //   // var regionImages = smoothImages;
  //   // var regionImages = smoothImages.map(regionGroup);
  //   var regionImages = refinedWaterImages;
  //   // add image date to resultant image based on the original NAIP image
  //   var addDate = function(input) {
  //     var sys_index = ee.Number.parse(input.get('system:index'));
  //     var start_index = time_start.get(sys_index);
  //     var end_index = time_end.get(sys_index);
  //     return input.set({'system:time_start': start_index, 'system:time_end': end_index});
  //   };
  //   // regionImages = waterImages.map(addDate);
  //   regionImages = regionImages.map(addDate);
  //   var ithRegionImage = ee.Image(regionImages.toList(num_years).get(ith_year));    // selected year of image to display on the map
  //   var Occurrence = ee.Image(regionImages.sum().toUint8());  // Binary image containing 1 anywhere water has ever been detected.
  //   var Max_Extent = Occurrence.gt(1);
  //   Max_Extent = ee.Image(regionGroup(Max_Extent));
  //   Max_Extent = Max_Extent.updateMask(Max_Extent);
  //   // identify NWI polygons that do not intersect JRC/NAIP water polygons
  //   var JRC_Water_Max_Extent_Vec = JRC_Water_Max_Extent.reduceToVectors({geometry: geom, scale: 30, bestEffort: true, maxPixels: 2e10});
  //   // var OccurrenceBin = ithRegionImage.gt(0);
  //   // OccurrenceBin = OccurrenceBin.updateMask(OccurrenceBin);
  //   // var OccurrenceVec = OccurrenceBin.reduceToVectors({geometry: geom, scale: 10, bestEffort: true, maxPixels: 2e10});
  //   // print(OccurrenceVec.size());
  //   // var NWI_No_Water = NWI.filter(ee.Filter.disjoint({leftValue: JRC_Water_Max_Extent_Vec.geometry(), rightField: '.geo'}));
  //   // // var NWI_No_Water = NWI.filterBounds(OccurrenceVec);
  //   // print(NWI_No_Water.size());
  //   var waterVectors = regionImages.map(utils.rasterToVector).toList(num_years);
  //   var ithWaterVector = ee.FeatureCollection(waterVectors.get(ith_year));
  //   // // export inudation and occurrence images
  //   // for(var i = 0; i < 6; i++) {
  //   //   ithRegionImage = ee.Image(regionImages.toList(num_years).get(i));
  //   //   utils.exportRasterToDrive(ithRegionImage, 'HUC_' + huc10_id + '_Inundation_' + years[i].toString(), 1, geom);
  //   // }
  //   // export inudation and occurrence images
  //   var dates = time_start.map(function(date) {return ee.Date(date).millis()});
  //   dates.evaluate(
  //     function (dates) {
  //       dates.forEach(
  //         function (date) {
  //           var year = new Date(date).getFullYear();
  //           // utils.exportRasterToDrive(ithRegionImage, 'HUC_' + huc10_id + '_Inundation_' + String(year), 1, geom);
  //           });
  //     }
  //   );
  //   // utils.exportRasterToDrive(Occurrence.toInt(), 'HUC_' + huc10_id + '_Occurrence', 1, geom);
  //   utils.exportRasterToDrive(Max_Extent, 'HUC_' + huc10_id + '_Max_Extent', 1, geom);
  //   var NDWI_smooth = smoothImage(NDWI_water);
  //   var NDWI_regions = regionGroup(NDWI_smooth);
  //   var NDWIwaterVectors = utils.rasterToVector(NDWI_regions.clip(geom));
  //   // print(NDWIwaterVectors.size())
  //   // utils.exportVectorToDrive(NDWIwaterVectors,'', 'SHP', 'HUC_' + huc10_id + '_NDWI_Water_Poly');
  //   utils.exportRasterToDrive(NDWI_water, 'HUC_' + huc10_id + '_NDWI_Water', 1, geom);
  //   ithRegionImage = ee.Image(regionImages.toList(num_years).get(ith_year));    // selected year of image to display on the map
  //   // calculate omission error
  //   var calcOmission = function(input) {
  //     var sys_index = ee.Number.parse(input.get('system:index'));
  //     var iJRCwater = ee.Image(JRC_monthly_waters.toList(num_years).get(sys_index)); 
  //     var inputUnmask = input.unmask();
  //     var omissionImage = inputUnmask.eq(0).and(iJRCwater.eq(1));
  //     omissionImage = omissionImage.updateMask(omissionImage);
  //     omissionImage = regionGroup(omissionImage);
  //     return omissionImage;
  //   };
  //   var omissionImages = regionImages.map(calcOmission);
  //   omissionImages = omissionImages.map(addDate);
  //   // calculate pixel area in hectare
  //   var getArea = function(input) {
  //     var pixelArea = input.multiply(ee.Image.pixelArea()).divide(10000);  
  //     var watershedArea = pixelArea.reduceRegions({
  //       collection: HUC,
  //       reducer: ee.Reducer.sum(),
  //       scale: 10
  //     });
  //     watershedArea = watershedArea.map(function(fc) {
  //       var year = ee.Date(input.get('system:time_start')).get('year');
  //       var fieldValue = ee.String('Y').cat(ee.String(year));
  //       return fc.set('year', fieldValue);
  //     });
  //     // watershedArea = watershedArea.map(function(fc) {return fc.set({Y2010ha: fc.get('sum')})});
  //     watershedArea = watershedArea.select(['huc10', 'name', 'year', 'sum']);
  //     return watershedArea;
  //   };
  //   var NAIP_water_areas = regionImages.map(getArea);
  //   NAIP_water_areas = NAIP_water_areas.flatten();
  //   var JRC_water_areas = JRC_monthly_waters.map(getArea);
  //   JRC_water_areas = JRC_water_areas.flatten();
  //   var omission_areas = omissionImages.map(getArea);
  //   omission_areas = omission_areas.flatten();
  //   var NAIP_water_table = ee.FeatureCollection(utils.formatTable(NAIP_water_areas, 'name', 'year'));
  //   var JRC_water_table = ee.FeatureCollection(utils.formatTable(JRC_water_areas, 'name', 'year'));
  //   var omission_table = ee.FeatureCollection(utils.formatTable(omission_areas, 'name', 'year'));
  //   var NAIP_water_table2 = NAIP_water_table.map(function(fc) {
  //     return fc.set({Type: 'NAIP'});
  //   });
  //   var JRC_water_table2 = JRC_water_table.map(function(fc) {
  //     return fc.set({Type: 'JRC'});
  //   });
  //   var omission_table2 = omission_table.map(function(fc) {
  //     return fc.set({Type: 'Omission'});
  //   });
  //   var stats_table = NAIP_water_table2.merge(JRC_water_table2).merge(omission_table2);
  //   stats_table = stats_table.map(function(fc) {
  //     return fc.set({HUC10: huc10_id, basinSize: ee.Number(clicked_basin_size), nwiCount: NWI_count, nwiArea: ee.Number(NWI_total)});
  //   });
  //   stats_table = stats_table.select([".*"], null, false);
  //   // print(stats_table);
  //   utils.exportTableToDrive(stats_table, 'HUC_' + huc10_id + '_Stats', 'CSV', null);
  //   // Make a chart by feature. (rowid: name; colid: year)
  //   var chartH = function(table, title) {return ui.Chart.feature.byFeature(table, 'name')
  //       .setChartType('ColumnChart')
  //       .setOptions({
  //         title: title, //'Total Wetland Inundation Area',
  //         hAxis: {title: 'Watershed'},
  //         vAxis: {title: 'Inundation Area (ha)'}
  //       });
  //   };
  //   // Make a chart by feature. (rowid: year; colid: sum)
  //   var chartV = function(table, title) {return ui.Chart.feature.byFeature(table, 'year', 'sum')
  //       .setChartType('ColumnChart')
  //       .setOptions({
  //         title: title, //'Total Wetland Inundation Area',
  //         hAxis: {title: 'Year'},
  //         vAxis: {title: 'Inundation Area (ha)'}
  //   })};
  //   // add label widgets.
  //   var uid = 4;  // starting widget index. 4 widgets already exist. 
  //   var label_subbasin_id = ui.Label();   // display watershed id
  //   panel.widgets().set(uid++, label_subbasin_id); 
  //   var label_subbasin_name = ui.Label();   // display watershed name  
  //   panel.widgets().set(uid++, label_subbasin_name); 
  //   var label_subbasin_size = ui.Label();   // display watershed size
  //   panel.widgets().set(uid++, label_subbasin_size); 
  //   var label_glcf_water = ui.Label();      // display GLCF water area for the watershed
  //   panel.widgets().set(uid++, label_glcf_water); 
  //   var label_jrc_water = ui.Label();       // display JRC water max extent for the watershed
  //   panel.widgets().set(uid++, label_jrc_water); 
  //   var label_nwi_count = ui.Label();       // display NWI wetland count 
  //   panel.widgets().set(uid++, label_nwi_count); 
  //   var label_nwi_total = ui.Label();       // display total NWI wetland area
  //   panel.widgets().set(uid++, label_nwi_total); 
  //   var label_nwi_mean = ui.Label();        // display average NWI wetland size
  //   panel.widgets().set(uid++, label_nwi_mean); 
  //   // Add widgets to panel (using 'evaluate' for asynchronous calls):
  //   label_subbasin_id.setValue('Watershed id: computing ...');
  //   clicked_basin_id.evaluate(function(result) {
  //     label_subbasin_id.setValue('Watershed id: ' +  result);
  //   });
  //   label_subbasin_name.setValue('Watershed name: computing ...');
  //   clicked_basin_name.evaluate(function(result) {
  //     label_subbasin_name.setValue('Watershed name: ' +  result);
  //   });
  //   label_subbasin_size.setValue('Watershed area: computing ...');
  //   clicked_basin_size.evaluate(function(result) {
  //     label_subbasin_size.setValue('Watershed area: ' +  result + ' ha (1 ha = 10,000 m2)');
  //   });
  //   label_glcf_water.setValue('GLCF Landsat water area (2000): computing ...');
  //   GLCF_Water_Area.evaluate(function(result) {
  //     label_glcf_water.setValue('GLCF Landsat water area (2000): ' +  result + ' (ha)');
  //   });
  //   label_jrc_water.setValue('JRC max water extent (1984-2021): computing ...');
  //   JRC_Water_Max_Area.evaluate(function(result) {
  //     label_jrc_water.setValue('JRC max water extent (1984-2021): ' +  result + ' (ha)');
  //   });
  //   label_nwi_count.setValue('NWI wetlands count: computing ...');
  //   NWI_count.evaluate(function(result) {
  //     label_nwi_count.setValue('NWI wetlands count: ' +  result);
  //   });
  //   label_nwi_total.setValue('NWI wetlands total area: computing ...');
  //   NWI_total.evaluate(function(result) {
  //     label_nwi_total.setValue('NWI wetlands total area: ' +  result + ' (ha)');
  //   });
  //   label_nwi_mean.setValue('NWI wetlands average size: computing ...');
  //   NWI_mean.evaluate(function(result) {
  //     label_nwi_mean.setValue('NWI wetlands average size: ' +  result + ' (ha)');
  //   });
  //   var uid_nwi = uid; uid++;
  //   panel.widgets().set(uid_nwi, ui.Label({
  //     value: 'Loading NWI chart ...',
  //     style: {color: 'gray'}
  //   }));  
  //   NWI_sums.evaluate(function(result) {
  //     panel.widgets().set(uid_nwi, utils.plotSumNWI(result));
  //   });  
  //   // var label_NDWI_id = ui.Label();
  //   // panel.widgets().set(uid++, label_NDWI_id); 
  //   // label_NDWI_id.setValue('NDWI thresholding using Otsu method: computing ...');
  //   // threshold_NDWI.evaluate(function(result) {
  //   //   label_NDWI_id.setValue('NDWI thresholding using Otsu method: ' +  result);
  //   // });
  //   // var uid_ndwi = uid; uid++;
  //   // panel.widgets().set(uid_ndwi, ui.Label({
  //   //   value: 'Loading NDWI chart ...',
  //   //   style: {color: 'gray'}
  //   // }));  
  //   // hist_NDWI = ee.List([hist_NDWI.get('histogram'),hist_NDWI.get('bucketMeans')]);
  //   // hist_NDWI.evaluate(function(result) {
  //   //   panel.widgets().set(uid_ndwi, ui.Chart.array.values(result[0], 0, result[1])
  //   //     .setChartType('ColumnChart')
  //   //     .setOptions({title: 'Histogram of Mean NDWI (2009-2017)' ,
  //   //                                 vAxis: {title: 'Frequency'},
  //   //                                 hAxis: {title: 'NDWI'},
  //   //                                 bar: {groupWidth: "100%"},
  //   //                                 legend: {position: 'none'}}));
  //   // });  
  //   // var uid_waterV_JRC = uid; uid++;
  //   // panel.widgets().set(uid_waterV_JRC, ui.Label({
  //   //   value: 'Loading JRC Surface Water Chart ...',
  //   //   style: {color: 'gray'}
  //   // }));  
  //   // JRC_water_areas.evaluate(function(result) {
  //   //   panel.widgets().set(uid_waterV_JRC, chartV(JRC_water_areas, 'Total Surface Water Area (JRC)'));
  //   // });  
  //   // var uid_waterV = uid; uid++;
  //   // panel.widgets().set(uid_waterV, ui.Label({
  //   //   value: 'Loading NAIP Wetland Inundation Chart ...',
  //   //   style: {color: 'gray'}
  //   // }));  
  //   // NAIP_water_areas.evaluate(function(result) {
  //   //   panel.widgets().set(uid_waterV, chartV(NAIP_water_areas, 'Total Wetland Inundation Area (NAIP)'));
  //   // });  
  //   var uid_waterH_JRC = uid; uid++;
  //   panel.widgets().set(uid_waterH_JRC, ui.Label({
  //     value: 'Loading JRC Surface Water Chart ...',
  //     style: {color: 'gray'}
  //   }));  
  //   NAIP_water_table.evaluate(function(result) {
  //     panel.widgets().set(uid_waterH_JRC, chartH(JRC_water_table, 'Total Surface Water Area (JRC)'));
  //   });  
  //   var uid_waterH = uid; uid++;
  //   panel.widgets().set(uid_waterH, ui.Label({
  //     value: 'Loading NAIP Wetland Inundation Chart ...',
  //     style: {color: 'gray'}
  //   }));  
  //   NAIP_water_table.evaluate(function(result) {
  //     panel.widgets().set(uid_waterH, chartH(NAIP_water_table, 'Total Wetland Inundation Area (NAIP)'));
  //   });  
  //   var uid_omissioni = uid; uid++;
  //   panel.widgets().set(uid_omissioni, ui.Label({
  //     value: 'Loading Omission Chart ...',
  //     style: {color: 'gray'}
  //   }));  
  //   omission_table.evaluate(function(result) {
  //     panel.widgets().set(uid_omissioni, chartH(omission_table, 'Total Omission Area'));
  //   }); 
  //   var nwi_color = mapping.nwi_add_color(NWI);
  //   // add layers to display on the map
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithNAIP, mapping.viz.nir, 'NAIP Imagery', true));    
  //   // Map.layers().set(ilyr++, ui.Map.Layer(NDWI_mean, mapping.viz.ndwi, 'Mean NDWI (2009-2017)', false));  
  //   // Map.layers().set(ilyr++, ui.Map.Layer(NDWI_water, {palette: 'green'}, 'NDWI Water', false)); 
  //   Map.layers().set(ilyr++, ui.Map.Layer(USDA_water, {palette: 'green'}, 'USDA Water', false)); 
  //   // Map.layers().set(ilyr++, ui.Map.Layer(NDWI_water, {palette: 'blue'}, 'NDWI Regions', false));  
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithClusterImage.randomVisualizer(), {}, 'K-means Clusters', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithWaterImage, {}, 'Water Clusters', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithRefinedWater, {palette: 'green'}, 'Refined Water', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithRegionImage, {palette: 'blue'}, 'Inundation Image', true));   
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithWaterVector, {}, 'Inundation Vectors', false));    
  //   // Map.layers().set(ilyr++, ui.Map.Layer(ithOmissionImage, {}, "Omission " + selected_year.toString(), false));   
  //   // Map.layers().set(ilyr++, ui.Map.Layer(ithOmissionImageVec, {}, "Omission Vec" + selected_year.toString(), false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(ithJRCwater, {}, "JRC Monthly History", false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(Occurrence.randomVisualizer(), {}, 'NAIP Water Occurrence', false));    
  //   // Map.layers().set(ilyr++, ui.Map.Layer(Occurrence, {}, 'NAIP Water Occurrence', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(Max_Extent, {palette: 'white'}, 'Max Water Extent', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(JRC_Water_Occurrence, mapping.viz.ndwi, "JRC Water Occurrence", false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(JRC_Permanent_Water.randomVisualizer(), {}, "JRC Permanent Water", false)); 
  //   Map.layers().set(ilyr++, ui.Map.Layer(GLCF_Water.randomVisualizer(), {}, 'GLCF Water (2000)', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(nwi_color, {gamma: 0.3}, 'NWI Wetlands Color', false));    
  //   Map.layers().set(ilyr++, ui.Map.Layer(NWI, {}, 'NWI Wetlands', false));   
  //   // Map.layers().set(ilyr++, ui.Map.Layer(ee.Image().paint(roi, 0, 3), {palette: 'green'}, 'Training Area')); 
  });
    // convert map cursor to crosshair
    Map.style().set('cursor', 'crosshair');
    deactiv_button.setDisabled(true);       // enable the deactivate button
    inspect_button.setDisabled(false);
    watershed_button.setDisabled(true);        // disable this button
}});
var result_label = ui.Label('Results', {fontSize: '16px', fontWeight: 'bold'});
var nwi_type_label = ui.Label('');
var nwi_attr_label = ui.Label('');
var nwi_area_label = ui.Label('');
var dep_area_label = ui.Label('');
var dep_vol_label = ui.Label('');
var dep_maxdepth_label = ui.Label('');
var dep_avgdepth_label = ui.Label('');
var inspect_button  = ui.Button({label: 'Activate inspector', onClick: function() {
  Map.unlisten();  
  Map.style().set('cursor', 'crosshair');
  inspect_button.setDisabled(true);
  deactiv_button.setDisabled(false);       // enable the deactivate button
  watershed_button.setDisabled(false);        // disable this button  
  Map.onClick(function(coords) {
    // get clicked subbasin info
    var clicked_point = ee.Geometry.Point(coords.lon, coords.lat);
    // var sel_dep = depressions.filterBounds(clicked_point).first();
    var selected = huc8.filterBounds(clicked_point);
    var huc_id = selected.first().get("huc8").getInfo();    
    // huc_id.evaluate(function(result) {
    //   info_label.setValue('Clicked location:' + result);
    // });
    var depression_id = "users/giswqs/depressions/" + huc_id;
    var depressions = ee.FeatureCollection(depression_id);
    var nwi_id = "users/giswqs/NWI-HU8/HU8_" + huc_id + "_Wetlands";
    var nwi = ee.FeatureCollection(nwi_id);
    var sel_nwi = nwi.filterBounds(clicked_point);
    var sel_dep = depressions.filterBounds(clicked_point);
    if (sel_nwi.size().getInfo() > 0) {
      sel_nwi = sel_nwi.first();
      sel_nwi.get('WETLAND_TY').evaluate(function(result) {
        nwi_type_label.setValue('NWI Wetland Type: ' + result);
      });
      sel_nwi.get('ATTRIBUTE').evaluate(function(result) {
        nwi_attr_label.setValue('NWI Attribute: ' + result);
      });
      sel_nwi.get('Shape_Area').evaluate(function(result) {
        nwi_area_label.setValue('NWI Area: ' + result + ' m2');
      });      
    } else {
      nwi_type_label.setValue('');
      nwi_attr_label.setValue('');
      nwi_area_label.setValue('');
    }
    if (sel_dep.size().getInfo() > 0) {
      sel_dep = sel_dep.first();
      sel_dep.get('area').evaluate(function(result) {
        dep_area_label.setValue('Depression area: ' + result + ' m2');
      });
      sel_dep.get('volume').evaluate(function(result) {
        dep_vol_label.setValue('Depression volume: ' + result + ' m3');
      });
      sel_dep.get('max_depth').evaluate(function(result) {
        dep_maxdepth_label.setValue('Depression max depth: ' + result + '  m');
      }); 
      sel_dep.get('avg_depth').evaluate(function(result) {
        dep_avgdepth_label.setValue('Depression mean depth: ' + result + '  m');
      }); 
    } else {
      dep_area_label.setValue('');
      dep_vol_label.setValue('');
      dep_maxdepth_label.setValue('');
      dep_avgdepth_label.setValue('');
    }
  });
}});
var deactiv_button  = ui.Button({label: 'Deactivate inspector', onClick: function() {
  Map.unlisten();                     // deletes map callback function
  Map.style().set('cursor', 'hand');  // reset the map's default cursor
  watershed_button.setDisabled(false);  // enable the activate button
  deactiv_button.setDisabled(true);   // disable this button
}, disabled: true});
inspect_button.setDisabled(true);    
// add activate and deacivate buttons
buttons_panel.add(watershed_button);
buttons_panel.add(inspect_button);
buttons_panel.add(deactiv_button);
panel.add(buttons_panel);
panel.add(result_label);
panel.add(nwi_type_label);
panel.add(nwi_attr_label);
panel.add(nwi_area_label);
panel.add(dep_area_label);
panel.add(dep_vol_label);
panel.add(dep_maxdepth_label);
panel.add(dep_avgdepth_label);
ui.root.insert(0, panel);
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Freshwater Forested/Shrub Wetland",
    "Freshwater Emergent Wetland",
    "Freshwater Pond",
    "Estuarine and Marine Wetland",
    "Riverine", 
    "Lake",
    "Estuarine and Marine Deepwater",
    "Other",
  ],
  "colors": ['#008837','#7FC31C','#688CC0','#66C2A5','#0190BF','#13007C','#007C88','#B28653']};
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  return panel;
}
add_nwi.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  if (checked) {
    addCategoricalLegend(legend, dict, 'NWI Wetland Type');
  } else {
    legend.clear();
  }
});
addCategoricalLegend(legend, dict, 'NWI Wetland Type');
Map.add(legend);