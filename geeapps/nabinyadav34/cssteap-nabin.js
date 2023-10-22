var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                77.99564026851067,
                30.157199736549188
              ],
              [
                77.92768247108734,
                30.1046238820051
              ],
              [
                77.90168847232769,
                30.086209958352175
              ],
              [
                78.12067048210315,
                29.91908557942591
              ],
              [
                78.26214067141984,
                30.05292111424995
              ],
              [
                78.06641291758649,
                30.204386305645574
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[77.99564026851067, 30.157199736549188],
          [77.92768247108734, 30.1046238820051],
          [77.90168847232769, 30.086209958352175],
          [78.12067048210315, 29.91908557942591],
          [78.26214067141984, 30.05292111424995],
          [78.06641291758649, 30.204386305645574]]]);
//  * Author:Nabin Kumar Yadav 
//  * Email:nabin.yadav34@gmail.com
// * Email : nabin.yadav@nepal.gov.np
// *********************************************************************************************************************************************************
// Definition of user interface (for input of the user in a GUI) *******************************************************************************************
var aoi = ee.Geometry.Polygon(
        [[[77.99564026851067, 30.157199736549188],
          [77.92768247108734, 30.1046238820051],
          [77.90168847232769, 30.086209958352175],
          [78.12067048210315, 29.91908557942591],
          [78.26214067141984, 30.05292111424995],
          [78.06641291758649, 30.204386305645574]]]);
Map.style().set('cursor', 'hand');
// Panel 
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-left',
  border : '1px solid #000000',
});
//var Header = ui.Label('Automated Forest  Burnt Scar Area and Severity Mapping',{fontWeight: 'bold', fontSize: '20px', textAlign: 'center'});
//var Subheader0 = ui.Label('Author: Nabin Kr. Yadav' ,{fontWeight: 'bold', fontSize: '10px', textAlign: 'right'});
//var Subheadera = ui.Label('Supervisor: Dr. Hitendra Padalia & Prf. Binod Prasad Heyojoo',{fontWeight: 'bold', fontSize: '10px', textAlign: 'right'});
var Subheader1 = ui.Label('Analysis Period:',{fontWeight: 'bold',color:'red'});
var label_Start_second_select = ui.Label('Start:(YYYY-MM-DD)');
var Start_second_select = ui.Textbox({
  value: '2016-04-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_second = text
  }
});
var label_End_second_select = ui.Label('End:(YYYY-MM-DD)');
var End_second_select = ui.Textbox({
  value: '2016-05-30',
  style: {width : '90px', textAlign: 'right'},
  onChange: function(text) {
    var End_second = text
  }
});
var Subheader2 = ui.Label('Reference Period:',{fontWeight: 'bold',color:'red'});
var label_Start_base_select = ui.Label('Start:(YYYY-MM-DD)');
var Start_base_select = ui.Textbox({
  value: '2017-01-01',
  style: {width : '90px'},
  onChange: function(text) {
    var Start_base = text
  }
});
var label_End_base_select = ui.Label('End:(YYYY-MM-DD)');
var End_base_select = ui.Textbox({
  value: '2017-2-15',
  style: {width : '90px'},
  onChange: function(text) {
    var End_base = text
  }
});
var label_cloud_cover_select = ui.Label('Select Cloud Cover percentage  (1 - 100%):');
var cloud_cover_select = ui.Slider({
  min: 1,
  max: 100, 
  value: 10, 
  step: 1,
  onChange: function(value) {
    var cloud_cover = value
  },
  style: {width: '380px'}
});
var label_Index_select = ui.Label('Index selection:',{fontWeight: 'bold'});
var Index_select = ui.Select({
  items: [{label: 'BAIM', value: 'BAIM'},
    {label: 'NBR', value: 'NBR'},{label: 'BAI', value: 'BAI'},{label: 'BAIS2', value: 'BAIS2'},{label: 'NBRT', value: 'NBRT'}],
  value: 'NBR',
  onChange: function(value) {
    var Index = value
  },
  style: {width: '200px'}
});
var label_Sensor_select = ui.Label('Sensor selection:',{fontWeight: 'bold'});
var Sensor_select = ui.Select({
  items: [
    {label: 'Landsat 8', value: 'L8'},{label: 'Landsat 7', value: 'L7'},{label: 'Landsat 5', value: 'L5'},{label: 'Landsat 4', value: 'L4'},
    {label: 'Sentinel 2', value: 'S2'},{label: 'Sentinel 1 & Sentinel 2', value: 'S1'}],
    //{label: 'Landsat 7/8', value: 'L78'},{label: 'Landsat 5/7', value: 'L57'},{label: 'Landsat 4/5', value: 'L45'},
  value: 'S2',
  onChange: function(value) {
    var Sensor = value
  },
  style: {width: '200px'}
});
var improve_L7_select = ui.Checkbox({
  label: 'Beforehand thresholding Landsat 7',
  value: false,
  onChange: function(value) {
    var improve_L7 = value
  }
});
var label_improve_threshold_select = ui.Label('Setting threshold for Landsat 7 (0 - 0.3):');
var improve_threshold_select = ui.Slider({
  min: 0,
  max: 0.3, 
  value: 0.08, 
  step: 0.001,
  onChange: function(value) {
    var improve_threshold = value
  },
  style: {width: '380px'}
});
var label_sensorerror_bufferdistance_select = ui.Label('Buffer distance for sensor errors (0 - 10 pixel):');
var sensorerror_bufferdistance_select = ui.Slider({
  min: 0,
  max: 10, 
  value: 1, 
  step: 1,
  onChange: function(value) {
    var sensorerror_bufferdistance = value
  },
  style: {width: '380px'}
});
var label_countryname_select = ui.Label('AOI selection or Use Asset shape file:',{fontWeight: 'bold'});
var countryname_select = ui.Select({items: [{label:'Bhagirathi Circle', value:'BC'},
    {label:'Disputed', value:'DC'},
    {label:'Garhwal Circle', value:'GC'},{label:'North Kumaon Circle', value:'NKC'},
    {label:'Shivalik Circle', value:'SC'},{label:'South Kumaon Circle', value:'SKC'},
    {label:'Under Control of Director, Corbett Tiger Reserve', value:'TR'},
    {label:'Under Control of Director, Nanda Devi Biosphere Reserve', value:'NR'},
    {label:'Under control of Director, Rajaji National Park', value:'RN'},
    {label:'Western Circle', value:'WC'},{label:'Yamuna Circle', value:'YC'},{label:'Study Area', value:'aoi'}],
value: 'aoi',
  onChange: function(value) {
    var countryname = value
  },
  style: {width: '200px'}
});
var AOI_selection = ui.Checkbox({
  label: 'Use AOI polygon',  
  value: true,
  onChange: function(value) {
    var AOI_selection = value
  }
});
var firehotspot = ui.Checkbox({
  label: 'MODIS firehotspot',  
  value: true,
  onChange: function(value) {
    var firehotspot = value
  }
});
var Asset_selection = ui.Checkbox({
  label: 'Use Asset shape file',  
  value: false,
  onChange: function(value) {
    var Asset_selection = value
  }
});
var center_select = ui.Checkbox({
  label: 'Center on selected area',  
  value: true,
  onChange: function(value) {
    var center = value
  }
});
var label_zoomlevel_select = ui.Label('Zoomlevel under center option (1 - 24):');
var zoomlevel_select = ui.Slider({
  min: 1,
  max: 24, 
  value: 11, 
  step: 1,
  onChange: function(value) {
    var zoomlevel = value
  },
  style: {width: '380px'}
});
var cloudmasking = ui.Label('Parameters for cloud masking:',{fontWeight: 'bold'});
var cloud_pixel_qa_selection = ui.Checkbox({
  label: 'Cloud flag (Pixel-QA band)', 
  value: true,
  onChange: function(value) {
    var cloud_pixel_qa_select = value
  }
});
var cloud_shadow_pixel_qa_selection = ui.Checkbox({
  label: 'Cloud-shadow flag V1 (Pixel-QA band)', 
  value: true,
  onChange: function(value) {
    var cloud_shadow_pixel_qa_select = value
  }
});
var cloud_conf_qa_selection = ui.Checkbox({
  label: 'Cloud-confidence flag (Pixel-QA band)', 
  value: true,
  onChange: function(value) {
    var cloud_conf_qa_select = value
  }
});
var cirrus_conf_qa_selection = ui.Checkbox({
  label: 'Cirrus-confidence flag (Pixel-QA band)', 
  value: true,
  onChange: function(value) {
    var cirrus_conf_qa_select = value
  }
});
var cloud_shadow_sr_cloud_qa_selection  = ui.Checkbox({
  label: 'Cloud-shadow flag V2 (SR-Cloud-QA band)', 
  value: true,
  onChange: function(value) {
    var cloud_shadow_sr_cloud_qa_select = value
  }
});
var SimpleCloudScore_selection = ui.Checkbox({
  label: 'SimpleCloudScore flag V1 (SimpleCloudScore ToA)', 
  value: true,
  onChange: function(value) {
    var SimpleCloudScore_select = value
  }
});
var UnsureClouds_selection  = ui.Checkbox({
  label: 'SimpleCloudScore flag V2 (SimpleCloudScore ToA)', 
  value: true,
  onChange: function(value) {
    var UnsureClouds_select = value
  }
});
var label_cloud_buffer_select = ui.Label('Cloud buffer (0 - 2,500 meters):');
var cloud_buffer_select = ui.Slider({
  min: 0,
  max: 100, 
  value: 0, 
  step: 10,
  onChange: function(value) {
    var cloud_buffer = value
  },
  style: {width: '380px'}
});
var Label_forest_mask_selection = ui.Label('Forest map selection:',{fontWeight: 'bold'});
var forest_mask_selection  = ui.Select({
  items: [
    {label: 'No forest map', value: 'No_forest_map'},{label: 'Global PALSAR-2/PALSAR Forest/Non-Forest Map(2007-2018)', value: 'PALSAR_Forest'},
    {label: 'Global Forest Cover (200 - 2019)', value: 'Hansen_map'}],
  value: 'Hansen_map',
  onChange: function(value) {
    var forest_mask_select = value
  },
  style: {width: '200px'}
});
var label_forest_mask_year_selection = ui.Label('Year of forest map (2000 - 2019):');
var forest_mask_year_selection = ui.Slider({
  min: 2000,
  max: 2019, 
  value: 2016, 
  step: 1,
  onChange: function(value) {
    var forest_mask_year_select = value
  },
  style: {width: '380px'}
});
var label_hansen_treecover_selection = ui.Label('Select Global Forest Cover percentage (0 - 100%):');
var hansen_treecover_selection = ui.Slider({
  min: 0,
  max: 100, 
  value: 5, 
  step: 1,
  onChange: function(value) {
    var hansen_treecover = value
  },
  style: {width: '380px'}
});
var label_selfreferencing_1 = ui.Label('Self-referencing step:',{fontWeight: 'bold'});
var label_selfreferencing_2 = ui.Label('Radius of circular kernel (0 - 1,000 meters):');
var kernel_size_selection = ui.Slider({
  min: 0,
  max: 1000, 
  value: 150, 
  step: 10,
  onChange: function(value) {
    var kernel_size = value
  },
  style: {width: '380px'}
});
var label_cleaning_select = ui.Label('Filtering isolated pixel:',{fontWeight: 'bold'});
var cleaning_selection  = ui.Checkbox({
  label: 'Apply  filtering',
  value: true,
  onChange: function(value) {
    var cleaning_select = value
  }
});
var label_severity_select = ui.Label('Burn Severity mapping(Optical image based):',{fontWeight: 'bold'});
var severity_selection  = ui.Checkbox({
  label: 'Burn severity classes',
  value: false,
  onChange: function(value) {
    var severity_select = value
  }
});
var label_severity_selects1r = ui.Label('Burn Severity mapping( SAR image based):',{fontWeight: 'bold'});
var severity_selections1r  = ui.Checkbox({
  label: 'Sentinel 1 C SAR (RGB)',
  value: false,
  onChange: function(value) {
    var severity_selects1r = value
  }
});
// Calculate area 
var label_Area = ui.Label('Statistics Section',{fontWeight: 'bold'});
var area_selection  = ui.Checkbox({
  label: 'Calculate area in sq.m',
  value: false,
  onChange: function(value) {
    var area_select = value
  }
});
var severity_selections1  = ui.Checkbox({
  label: 'Burn severity classes(SAR)',
  value: false,
  onChange: function(value) {
    var severity_selects1 = value
  }
});
var label_threshold_conservative_selection = ui.Label('Select threshold for filtering (0 - 0.1):');
var threshold_conservative_selection = ui.Slider({
  min: 0,
  max: 0.1, 
  value: 0.035, 
  step: 0.001,
  onChange: function(value) {
    var threshold_conservative = value
  },
  style: {width: '380px'}
});
var label_kernel_clean_size_selection = ui.Label('Radius of circular kernel for filtering (10 - 500 meters):');
var kernel_clean_size_selection = ui.Slider({
  min: 10,
  max: 500, 
  value: 80, 
  step: 10,
  onChange: function(value) {
    var kernel_clean_size = value
  },
  style: {width: '380px'}
});
var label_min_disturbances = ui.Label('Min. number of disturbance events per cleaning kernel:');
var min_disturbances_selection = ui.Slider({
  min: 2,
  max: 50, 
  value: 3, 
  step: 1,
  onChange: function(value) {
    var min_disturbances = value
  },
  style: {width: '380px'}
});
var label_exporting = ui.Label('Options for export:',{fontWeight: 'bold'});
var export_selection = ui.Checkbox({
  label: 'Allow export of Indices result(s)', 
  value: false,
  onChange: function(value) {
    var export_select = value
  }
});
var export_selection_singleNBRs = ui.Checkbox({
  label: 'Export Cloud free Analysis Composite Image', 
  value: false,
  onChange: function(value) {
    var export_select_singleNBRs = value
  }
});
var export_selection_singleNBRdates = ui.Checkbox({
  label: 'Export Cloud free Reference Composite Image', 
  value: false,
  onChange: function(value) {
    var export_select_singleNBRdates = value
  }
});
var export_selection_forestmask = ui.Checkbox({
  label: '... additional export of forest mask', 
  value: false,
  onChange: function(value) {
    var export_select_forestmask = value
  }
});
//panel.add(Header);
//panel.add(Subheader0);
//panel.add(Subheadera);
panel.add(Subheader1);
panel.add(label_Start_second_select);
panel.add(Start_second_select);
panel.add(label_End_second_select);
panel.add(End_second_select);
panel.add(Subheader2);
panel.add(label_Start_base_select);
panel.add(Start_base_select);
panel.add(label_End_base_select);
panel.add(End_base_select);
panel.add(label_cloud_cover_select);
panel.add(cloud_cover_select);
panel.add(firehotspot);
panel.add(label_Sensor_select);
panel.add(Sensor_select);
panel.add(label_Index_select);
panel.add(Index_select);
//panel.add(improve_L7_select);
//panel.add(label_improve_threshold_select);
//panel.add(improve_threshold_select);
//panel.add(label_sensorerror_bufferdistance_select);
//panel.add(sensorerror_bufferdistance_select);
panel.add(label_countryname_select);
panel.add(countryname_select);
panel.add(AOI_selection);
panel.add(Asset_selection);
panel.add(center_select);
panel.add(label_zoomlevel_select);
panel.add(zoomlevel_select);
panel.add(cloudmasking);
//panel.add(cloud_pixel_qa_selection);
//panel.add(cloud_shadow_pixel_qa_selection);
//panel.add(cloud_conf_qa_selection);
//panel.add(cirrus_conf_qa_selection);
//panel.add(cloud_shadow_sr_cloud_qa_selection);
//panel.add(SimpleCloudScore_selection);
//panel.add(UnsureClouds_selection);
panel.add(label_cloud_buffer_select);
panel.add(cloud_buffer_select);
panel.add(Label_forest_mask_selection);
panel.add(forest_mask_selection);
panel.add(label_forest_mask_year_selection);
panel.add(forest_mask_year_selection);
panel.add(label_hansen_treecover_selection);
panel.add(hansen_treecover_selection);
//panel.add(label_selfreferencing_1); // 
//panel.add(label_selfreferencing_2); //
//panel.add(kernel_size_selection); //
panel.add(label_cleaning_select); //
panel.add(cleaning_selection); //
panel.add(label_severity_select); //
panel.add(severity_selection); //
// SAR Part
panel.add(label_severity_selects1r)//
panel.add(severity_selections1r); //
panel.add(severity_selections1); // Need to work its incomplete part
//panel.add(label_threshold_conservative_selection); //
//panel.add(threshold_conservative_selection); //
//panel.add(label_kernel_clean_size_selection);
//panel.add(kernel_clean_size_selection); //
//panel.add(label_min_disturbances); //
//panel.add(min_disturbances_selection) //
// Calculate are 
panel.add(label_Area) // its Label part 
panel.add(area_selection); // Calculate area in sq.m 
// Export Part
panel.add(label_exporting);
panel.add(export_selection);
panel.add(export_selection_singleNBRs);
panel.add(export_selection_singleNBRdates);
panel.add(export_selection_forestmask);
ui.root.add(panel);
var button = ui.Button('Click!to Run');
button.style().set({
  position: 'bottom-right',
  border : '1px solid #000000',
});
Map.add(button);
// Functions of the script **********************
// **********************************************
button.onClick(function() {
    Map.clear();
    Map.add(button);
    var Start_base = Start_base_select.getValue();
    var Start_base_number = ee.Number.parse(Start_base.replace(/-/g,'')).getInfo();
    var End_base = End_base_select.getValue();
    var End_base_number = ee.Number.parse(End_base.replace(/-/g,'')).getInfo();
    var Start_second = Start_second_select.getValue();
    var Start_second_number = ee.Number.parse(Start_second.replace(/-/g,'')).getInfo();
    var End_second = End_second_select.getValue();
    var End_second_number = ee.Number.parse(End_second.replace(/-/g,'')).getInfo();
    var firehotspot_select = firehotspot.getValue();
    var Index = Index_select.getValue();
    var Sensor = Sensor_select.getValue();
    var improve_L7 = improve_L7_select.getValue();
    var improve_threshold = improve_threshold_select.getValue();
    var sensorerror_bufferdistance = sensorerror_bufferdistance_select.getValue();
    var countryname = countryname_select.getValue();
    var AOI_select = AOI_selection.getValue();
    var Asset_select = Asset_selection.getValue();
    var center = center_select.getValue();
    var zoomlevel = zoomlevel_select.getValue();
    var cloud_pixel_qa_select = cloud_pixel_qa_selection.getValue();
    var cloud_shadow_pixel_qa_select = cloud_shadow_pixel_qa_selection.getValue();
    var cloud_conf_qa_select = cloud_conf_qa_selection.getValue();
    var cirrus_conf_qa_select = cirrus_conf_qa_selection.getValue();
    var cloud_shadow_sr_cloud_qa_select = cloud_shadow_sr_cloud_qa_selection.getValue();
    var SimpleCloudScore_select = SimpleCloudScore_selection.getValue();
    var UnsureClouds_select = UnsureClouds_selection.getValue();
    var cloud_buffer = cloud_buffer_select.getValue();
    var forest_mask_select = forest_mask_selection.getValue();
    var forest_mask_year_select = forest_mask_year_selection.getValue();
    var hansen_treecover = hansen_treecover_selection.getValue();
    var kernel_size = kernel_size_selection.getValue();
    var cleaning_select = cleaning_selection.getValue();
    var severity_select = severity_selection.getValue();
    var area_select = area_selection.getValue(); // Calculation of area 
    // SAR Part for RGB image
    var severity_selects1r = severity_selections1r.getValue();
    var severity_selects1 = severity_selections1.getValue();
    var threshold_conservative = threshold_conservative_selection.getValue();
    var kernel_clean_size = kernel_clean_size_selection.getValue();
    var min_disturbances = min_disturbances_selection.getValue();
    var export_select = export_selection.getValue();
    var export_select_singleNBRs = export_selection_singleNBRs.getValue();
    var export_select_singleNBRdates = export_selection_singleNBRdates.getValue();
    var export_select_forestmask = export_selection_forestmask.getValue();
    // Joining of SR and TOA collections in order to make combined use of pixel_qa band and simpleCloudScore algorithm (Thanks ot George Azzari) ***************
    function joinLandsatCollections(coll1, coll2){
      var eqfilter = ee.Filter.equals({'rightField':'system:time_start',
                                       'leftField':'system:time_start'});
      var join = ee.Join.inner();
      var joined = ee.ImageCollection(join.apply(coll1, coll2, eqfilter));
      //Inner join returns a FeatureCollection with a primary and secondary set of properties. Properties are collapsed into different bands of an image.
      return joined.map(function(element){
                          return ee.Image.cat(element.get('primary'), element.get('secondary'));
                        }).sort('system:time_start');
    }
    // Masking Step 1QB: Masking options for clouds (Landsat 8) ************************************************************************************************
    var Masking_1QB = function(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cirrus_conf_qa_select,SimpleCloudScore_select,UnsureClouds_select) {
      var NoCloudMask = (image.select(BANDS[0]).eq(0)).and(image.select(BANDS[1]).eq(0));
      if (cloud_pixel_qa_select === true){
        var cloud_pixel_qa = image.select('pixel_qa').bitwiseAnd(32).neq(0);
      }
      if (cloud_pixel_qa_select === false){
        var cloud_pixel_qa = NoCloudMask;
      }
      if (cloud_shadow_pixel_qa_select === true){
        var cloud_shadow_pixel_qa = image.select('pixel_qa').bitwiseAnd(8).neq(0);
      }
      if (cloud_shadow_pixel_qa_select === false){
        var cloud_shadow_pixel_qa = NoCloudMask;
      }  
      if (cloud_conf_qa_select === true){
        var cloud_conf_qa = image.select('pixel_qa').bitwiseAnd(64).add(image.select('pixel_qa').bitwiseAnd(128))
                            .interpolate([0, 64, 128, 192], [0, 0, 1, 1], 'clamp').int();
      }
      if (cloud_conf_qa_select === false){
        var cloud_conf_qa = NoCloudMask;
      }   
      if (cirrus_conf_qa_select === true){
        var cirrus_conf_qa = image.select('pixel_qa').bitwiseAnd(256).add(image.select('pixel_qa').bitwiseAnd(512))
                            .interpolate([0, 256, 512, 768], [0, 0, 1, 1], 'clamp').int();
      }
      if (cirrus_conf_qa_select === false){
        var cirrus_conf_qa = NoCloudMask;
      } 
      if (SimpleCloudScore_select === true){
        var SimpleCloudScore = image.select(['cloud']).gte(13);
      }
      if (SimpleCloudScore_select === false){
        var SimpleCloudScore = NoCloudMask;
      }
      if (UnsureClouds_select === true){
        var UnsureClouds = image.select(['cloud']).lt(13).and(image.select(['cloud']).gte(9)).and(image.select(BANDS[3]).lte(292));
      }
      if (UnsureClouds_select === false){
        var UnsureClouds = NoCloudMask;
      }
      var maskedClouds = (NoCloudMask.or(cloud_pixel_qa).or(cloud_shadow_pixel_qa).or(cloud_conf_qa).or(cirrus_conf_qa).or(SimpleCloudScore).or(UnsureClouds)).focal_max(cloud_buffer,'circle','meters',1);
      return image.updateMask((maskedClouds.add(1).unmask(0)).eq(1));
    }
    // Masking Step S2_1: Masking options for clouds (Sentinel-2) (still will be worked on) *******************************************************************
    // Copyright: ThanhGIS/ThanhGEEVN (July 2017)
    // *********************************************************************************************************************************************************
    var Masking_S2_1 = function(image,cloud_buffer,BANDS) {
      var toa = sentinel2toa(image);
      var cloud = sentinelCloudScore(toa);
      var shadow = shadowMask(toa,cloud);
      var mask = cloud.or(shadow).fastDistanceTransform(cloud_buffer,'pixels').gt(cloud_buffer);
      return image.updateMask(mask);
      // Subfunction of S2 cloud masking
      function sentinel2toa(image) {
        var toa = image.select(['B2','B8','B9','B11','B12'])  
           .divide(10000)
           .set('solar_azimuth',image.get('MEAN_SOLAR_AZIMUTH_ANGLE'))
           .set('solar_zenith', image.get('MEAN_SOLAR_ZENITH_ANGLE'))
        return toa;
      }
      // Subfunction of S2 cloud masking
      function sentinelCloudScore(toa) {
        var score = toa.select('B2').multiply(toa.select('B9')).multiply(1e4)
        var cloudScoreThreshold = 135
        var cloud = score.gt(cloudScoreThreshold);
        return cloud;
      }
      // Subfunction of S2 cloud masking
      function shadowMask(toa,cloud){
        var azi = ee.Number(toa.get('solar_azimuth'))
        var zen = ee.Number(toa.get('solar_zenith')).multiply(1.6)
        var azimuth =azi.multiply(Math.PI).divide(180.0).add(ee.Number(0.5).multiply(Math.PI));
        var zenith  =ee.Number(0.5).multiply(Math.PI ).subtract(zen.multiply(Math.PI).divide(180.0));
        var nominalScale = cloud.projection().nominalScale();
        var cloudHeights = ee.List.sequence(200,5000,500);
        function cloudH (cloudHeight){
          cloudHeight = ee.Number(cloudHeight);
          var shadowVector = zenith.tan().multiply(cloudHeight);
          var x = azimuth.cos().multiply(shadowVector).divide(nominalScale).round();
          var y = azimuth.sin().multiply(shadowVector).divide(nominalScale).round();
          return cloud.changeProj(cloud.projection(), cloud.projection().translate(x, y));
        }
        var shadows = cloudHeights.map(cloudH);
        var potentialShadow = ee.ImageCollection.fromImages(shadows).max();
        var potentialShadow1 = potentialShadow.and(cloud.not());
        var darkPixels = toa.select(['B8','B11','B12']).reduce(ee.Reducer.sum()).multiply(1e3).lt(250).rename(['dark_pixels']);
        var shadow = potentialShadow1.and(darkPixels).rename('shadows');
        return shadow;
      }
    }
    // *********************************************************************************************************************************************************
    // End Copyright: ThanhGIS/ThanhGEEVN (July 2017)
    // *********************************************************************************************************************************************************
    // Masking Step 1: Masking options for clouds (any Landsat sensor) *****************************************************************************************
    var Masking_1 = function(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,
                    cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select) {
      var NoCloudMask = (image.select(BANDS[0]).eq(0)).and(image.select(BANDS[1]).eq(0));
      if (cloud_pixel_qa_select === true){
        var cloud_pixel_qa = image.select('pixel_qa').bitwiseAnd(32).neq(0);
      }
      if (cloud_pixel_qa_select === false){
        var cloud_pixel_qa = NoCloudMask;
      }
      if (cloud_shadow_pixel_qa_select === true){
        var cloud_shadow_pixel_qa = image.select('pixel_qa').bitwiseAnd(8).neq(0);
      }
      if (cloud_shadow_pixel_qa_select === false){
        var cloud_shadow_pixel_qa = NoCloudMask;
      }  
      if (cloud_conf_qa_select === true){
        var cloud_conf_qa = image.select('pixel_qa').bitwiseAnd(64).add(image.select('pixel_qa').bitwiseAnd(128))
                            .interpolate([0, 64, 128, 192], [0, 0, 1, 1], 'clamp').int();
      }
      if (cloud_conf_qa_select === false){
        var cloud_conf_qa = NoCloudMask;
      }   
      if (cloud_shadow_sr_cloud_qa_select === true){
        var cloud_shadow_sr_cloud_qa = image.select('sr_cloud_qa').bitwiseAnd(4).neq(0);
      }
      if (cloud_shadow_sr_cloud_qa_select === false){
        var cloud_shadow_sr_cloud_qa = NoCloudMask;
      } 
      if (SimpleCloudScore_select === true){
        var SimpleCloudScore = image.select(['cloud']).gte(13);
      }
      if (SimpleCloudScore_select === false){
        var SimpleCloudScore = NoCloudMask;
      }
      if (UnsureClouds_select === true){
        var UnsureClouds = image.select(['cloud']).lt(13).and(image.select(['cloud']).gte(9)).and(image.select(BANDS[3]).lte(292));
      }
      if (UnsureClouds_select === false){
        var UnsureClouds = NoCloudMask;
      }
      var maskedClouds = (NoCloudMask.or(cloud_pixel_qa).or(cloud_shadow_pixel_qa).or(cloud_conf_qa).or(cloud_shadow_sr_cloud_qa).or(SimpleCloudScore).or(UnsureClouds)).focal_max(cloud_buffer,'circle','meters',1);
      return image.updateMask((maskedClouds.add(1).unmask(0)).eq(1));
    }
    // Masking Step 2: Masking of sensor errors and non-forest areas *******************************************************************************************
    var Masking_2 = function(image,forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance) {
      var sensorError = (image.select(BANDS[0]).lte(0)).or(image.select(BANDS[1]).lte(0)).or(image.select(BANDS[5]).lte(0)).or(image.select(BANDS[6]).lte(0)).or
                        (image.select(BANDS[7]).lte(0)).or(image.select(BANDS[8]).lte(0)).add(1).unmask(0); // Important to handle SLC error in Landsat 7
      var sensorError_buffer = sensorError.focal_min({
        radius: sensorerror_bufferdistance,
        kernelType: 'square',
        units:'pixels',
        iterations: 1})
      if (forest_mask_select === 'No_forest_map'){
        var OUT = image.updateMask(sensorError_buffer.eq(1).and(forest_mask.eq(1)));
      }
      if (forest_mask_select === 'Hansen_map'){
        var OUT = image.updateMask(sensorError_buffer.eq(1)).updateMask(forest_mask.gte(hansen_treecover));
      }
      return OUT;
    };
    // Burnt Index calculation fuction 
    // NBR function, 
     var NBR = function(image) {
      var d = ee.Date(image.get('system:time_start'));
      var doy =ee.Algorithms.Date(ee.Number(image.get("system:time_start")));
      var yearday=(ee.Number(doy.get('year')).multiply(10000).add(ee.Number(doy.get('month')).multiply(100)).add(ee.Number(doy.get('day'))));
      yearday = ee.Image.constant(yearday).toInt32().select([0],['yearday']);
      return (image.select('Band_1').subtract(image.select('Band_2'))).
      divide(((image.select('Band_1')).add(image.select('Band_2')))).
      rename(['NBR']).addBands(yearday);
    };
    // Fuction for BAIM Calculation 
     var BAIM = function(image) {
      var d = ee.Date(image.get('system:time_start'));
      var doy =ee.Algorithms.Date(ee.Number(image.get("system:time_start")));
      var yearday=(ee.Number(doy.get('year')).multiply(10000).add(ee.Number(doy.get('month')).multiply(100)).add(ee.Number(doy.get('day'))));
      yearday = ee.Image.constant(yearday).toInt32().select([0],['yearday']);
      var baim = image.expression('1.0 / ((NIR - 0.05)**2 + (SWIR - 0.2)**2)',{'NIR': image.select('Band_1'),'SWIR': image.select('Band_2'),});
      return baim.rename(['BAIM']).addBands(yearday);
    };
    // Fuction for BAI Calculation 
      var BAI = function(image) {
      var d = ee.Date(image.get('system:time_start'));
      var doy =ee.Algorithms.Date(ee.Number(image.get("system:time_start")));
      var yearday=(ee.Number(doy.get('year')).multiply(10000).add(ee.Number(doy.get('month')).multiply(100)).add(ee.Number(doy.get('day'))));
      yearday = ee.Image.constant(yearday).toInt32().select([0],['yearday']);
      var bai = image.expression('1.0 / ((0.1 - RED)**2 + (0.06 - NIR)**2)',{'NIR': image.select('Band_1'),'RED': image.select('Band_2'),});
      return bai.rename(['BAI']).addBands(yearday);
    };
    // Fuction for BAIS2 Calculation 
      var BAIS2 = function(image) {
      var d = ee.Date(image.get('system:time_start'));
      var doy =ee.Algorithms.Date(ee.Number(image.get("system:time_start")));
      var yearday=(ee.Number(doy.get('year')).multiply(10000).add(ee.Number(doy.get('month')).multiply(100)).add(ee.Number(doy.get('day'))));
      yearday = ee.Image.constant(yearday).toInt32().select([0],['yearday']);
      var bais2 = image.expression('(1.0 - (sqrt(a*b*c))/d) * ((e-(c/(sqrt(e+c))))+ 1.0)', {'a': image.select('B6'),'b': image.select('B7'), 'c': image.select('B8A'),'d': image.select('B4'),'e': image.select('B12')});
      return bais2.rename(['BAIS2']).addBands(yearday);
    };
    // Function to calculate Normalized Burn Ration Thermal (NBRT)
      var NBRT = function(image) {
      var d = ee.Date(image.get('system:time_start'));
      var doy =ee.Algorithms.Date(ee.Number(image.get("system:time_start")));
      var yearday=(ee.Number(doy.get('year')).multiply(10000).add(ee.Number(doy.get('month')).multiply(100)).add(ee.Number(doy.get('day'))));
      yearday = ee.Image.constant(yearday).toInt32().select([0],['yearday']);
      return (image.select('Band_1').subtract(image.select('Band_2'))).
      divide(((image.select('Band_1')).add(image.select('Band_2')))).
      rename(['NBR']).addBands(yearday);
    };
    // Adjustment kernel function, which self-references each NBR input scene (in order to allow inter-scene comparability) ************************************
    var Adjustment_kernel = function(image,kernel_size) {
      return (image.select('NBR').subtract(image.select('NBR').focal_median(kernel_size,"circle","meters"))).addBands(image.select('yearday')); 
    };
    // Capping at 0 and -1 (positive values are set to 0; values <= -1 are set to -1 because the latter mainly refer to active fires) **************************
    var Capping = function(image) {
      return ((image.select('NBR').where(image.select('NBR').gt(0),0).where(image.select('NBR').lt(-1),-1)).multiply(-1)).addBands(image.select('yearday')); 
    };
    var Capping1 = function(image) {
      return ((image.select('BAIM').where(image.select('BAIM').gt(0),0).where(image.select('BAIM').lt(-15),-1)).multiply(-1)).addBands(image.select('yearday')); 
    };
    // *********************************************************************************************************************************************************
    // Definition of study area
    //var country = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata('cc','equals',countryname); // Country border polygons of high accuracy
    var studyarea = aoi  // The study area is set to above selection
    if (AOI_select === true){
      var AOI = geometry;
      var country = ee.FeatureCollection("USDOS/LSIB/2013").filterBounds(geometry);
      var studyarea = geometry;
      countryname = 'Polygon';
    }
    if (Asset_select === true){
      var Asset = table.geometry();
      var country = ee.FeatureCollection("USDOS/LSIB/2013").filterBounds(Asset);
      var studyarea = Asset;
      countryname = 'Asset';
    }    
    // Preparation of variables for export per Degree-tiles
    var bbox = (studyarea.bounds().coordinates().getInfo());
    var minX = bbox[0][0][0];
    var maxY = bbox[0][3][1];
    var minY = bbox[0][1][1];
    var maxX = bbox[0][1][0];
    var min_X = Math.floor(minX);
    var max_X = Math.ceil(maxX);
    var min_Y = Math.floor(minY);
    var max_Y = Math.ceil(maxY);
    var Delta_X = max_X - min_X 
    var Delta_Y = max_Y - min_Y
    // Adjustments according to above user selections
    if (center === true){
      Map.centerObject(studyarea, zoomlevel);
    }
    if (forest_mask_select === 'No_forest_map'){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015_v1_3").clip(studyarea);
      var forest_mask = Hansen_map.select('treecover2000').gte(0); // No forest map selected
      Map.addLayer (forest_mask,{},'No Forest map',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2018){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2018_v1_6"); // Hansen map 2018
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2018',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2017){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2017_v1_5"); // Hansen map 2017
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2017',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2016){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2016_v1_4"); // Hansen map 2016
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2016',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2015){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015_v1_3"); // Hansen map 2015
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2015',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2014){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015"); // Hansen map 2014
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2014',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2013){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2014"); // Hansen map 2013
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2013',false);
    }
    if (forest_mask_select === 'Hansen_map' && forest_mask_year_select === 2012){
      var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2013"); // Hansen map 2012
      var forest_mask = Hansen_map.select('treecover2000').mask(Hansen_map.select('loss').eq(0)).clip(studyarea);
      var forest_mask_display = forest_mask.updateMask(forest_mask.gte(hansen_treecover));
      Map.addLayer (forest_mask_display,{min:[0],max:[100],palette:'ffffcc,006600'},'Global forest cover map 2012',false);
    }
        // Modis Firehotspot
    if (firehotspot_select === true){
      var dataset = ee.ImageCollection('FIRMS').filter(
      ee.Filter.date(Start_second, End_second));
      var fires = dataset.mosaic().clip(studyarea).select('T21');
      var firesVis = {
      min: 325.0,
      max: 400.0,
      palette: ['red', 'orange', 'yellow'],
      };
      Map.addLayer(fires, firesVis, 'MODIS Fires'+Start_second+' - '+End_second,false);
    }
    // 
    if (severity_selects1r === true){
      var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV')
        .map(function(image) {
          var edge = image.lt(-30.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
       var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
       var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
       var pre = ee.Filter.date(Start_second, End_second);
       var post = ee.Filter.date(Start_base, End_base);
       var post = ee.Filter.date(Start_base, End_base);
       var descChange = ee.Image.cat(
        desc.filter(pre).mean(),
        desc.filter(post).mean(),
        desc.filter(post).mean());
      var ascChange = ee.Image.cat(
        asc.filter(pre).mean(),
        asc.filter(post).mean(),
        asc.filter(post).mean());
      Map.addLayer(ascChange.clip(studyarea), {min: -25, max: 5}, 'Multi-T Mean ASC'+Start_second+' - '+End_second, false);
      //Map.addLayer(descChange, {min: -25, max: 5}, 'Multi-T Mean DESC', true);
    } 
    // Sensor
    if (Sensor === 'L8' || Sensor === 'L78'){
      var resolution = 30;
      var BANDS=['B5','B7','fmask','B10','BQA','B2','B3','B4','B6'];
      if (Index === 'NBR'){
        var band_1 = 'B5';
        var band_2 = 'B7';
      }
      // Data preparation and cloud masking ********************************************************************************************************************
      var Imagecollection_base_TOA = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_base_SR = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_base_SR_TOA = joinLandsatCollections(Imagecollection_base_SR, Imagecollection_base_TOA);
      // Imagecollection_base
      var Imagecollection_base = Imagecollection_base_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      var Imagecollection_second_TOA = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_second_SR = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_second_SR_TOA = joinLandsatCollections(Imagecollection_second_SR, Imagecollection_second_TOA);
      //Imagecollection_second
      var Imagecollection_second = Imagecollection_second_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      // Data preparation and masking of sensor errors and non-forest areas ************************************************************************************
      var Imagecollection_base_2 = Imagecollection_base
      .map(function(image){return Masking_1QB(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cirrus_conf_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      var Imagecollection_second_2 = Imagecollection_second
      .map(function(image){return Masking_1QB(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cirrus_conf_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      // Calculation of single scenes of Base-NBR **************************************************************************************************************
      var NBR_Imagecollection_base = Imagecollection_base_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Base-NBR 
      var NBR_Imagecollection_base_normal1 = NBR_Imagecollection_base.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Base-NBR scenes at 0 and -1 
      var NBR_Imagecollection_base_normal2 = NBR_Imagecollection_base_normal1.map(Capping);
      // Condensation of all available self-referenced single Base-NBR scenes per investigation period 
      var NBR_Imagecollection_base_normalized_min = NBR_Imagecollection_base_normal2.qualityMosaic('NBR');
      // Calculation of single scenes of Second-NBR ************************************************************************************************************
      var NBR_Imagecollection_second = Imagecollection_second_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Second-NBR
      var NBR_Imagecollection_second_normal1 = NBR_Imagecollection_second.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Second-NBR scenes at 0 and -1 
      var NBR_Imagecollection_second_normal2 = NBR_Imagecollection_second_normal1.map(Capping);
      // Condensation of all available self-referenced single Second-NBR scenes per investigation period 
      var NBR_Imagecollection_second_normalized_min = NBR_Imagecollection_second_normal2.qualityMosaic('NBR');
      // Derive the Delta-NBR result ***************************************************************************************************************************
      var NBR_difference = NBR_Imagecollection_second_normalized_min.select('NBR').subtract(NBR_Imagecollection_base_normalized_min.select('NBR'));
      var NBR_difference_capped = NBR_difference.select('NBR').where(NBR_difference.select('NBR').lt(0), 0);
      // Display of condensed Base-NBR scene and information about the acquisition dates of the base satellite data per single pixel location ******************
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Reference L8 '+Start_base+' - '+End_base, false);
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('yearday'),{min: Start_base_number, max: End_base_number ,palette: 'ff0000,ffffff'},'Date-Reference L8 '+Start_base+' - '+End_base, false);
      // Display of condensed Second-NBR scene and information about the acquisition dates of the second satellite data per single pixel location **************
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Analysis L8 '+Start_second+' - '+End_second, false);
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('yearday'),{min: Start_second_number, max: End_second_number, palette: 'ff0000,ffffff'},'Date-Analysis L8 '+Start_second+' - '+End_second, false);
      // Just some information regarding the used satellite data ***********************************************************************************************
      print (Imagecollection_base_2,'Reference period L8: '+Start_base+' - '+End_base);
      print (Imagecollection_second_2,'Analysis period L8: '+Start_second+' - '+End_second);
      // *******************************************************************************************************************************************************
      // Prepare data for export (NoData is set to -2) *********************************************************************************************************
      var NBR_Imagecollection_base_normalized_min_Export_L8 = NBR_Imagecollection_base_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_base_normalized_min_date_Export_L8 = NBR_Imagecollection_base_normalized_min.select('yearday').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_Export_L8 = NBR_Imagecollection_second_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_date_Export_L8 = NBR_Imagecollection_second_normalized_min.select('yearday').unmask(-2);
      var NBR_difference_Export_L8 = NBR_difference_capped.unmask(-2);  
      if (Sensor === 'L78'){
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L8 '+Start_second+' - '+End_second, false);
        var NBR_difference_capped_L8 = ee.ImageCollection(NBR_difference_capped);
        // NBR_difference_capped = 0;
      }
      if (Sensor === 'L8'){
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L8 '+Start_second+' - '+End_second, true);
        // NBR_difference_capped = 0;
      }
    }
    if (Sensor === 'L7' || Sensor === 'L78' || Sensor === 'L57'){
      var resolution = 30;
      var BANDS=['B4','B7','fmask','B6','B6','B1','B2','B3','B5'];
      if (Index === 'NBR'){
        var band_1 = 'B4';
        var band_2 = 'B7';
      }
      if (Index === 'BAIM'){
        var band_1 = 'B4';
        var band_2 = 'B5';
      }
      if (Index === 'BAI'){
        var band_1 = 'B4';
        var band_2 = 'B3';
      }
      if (Index === 'NBRT'){
        var band_1 = 'B2';
        var band_2 = 'B4';
      }
      // Data preparation and cloud masking ********************************************************************************************************************
      var Imagecollection_base_TOA = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_base_SR = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_base_SR_TOA = joinLandsatCollections(Imagecollection_base_SR, Imagecollection_base_TOA);
      var Imagecollection_base = Imagecollection_base_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      var Imagecollection_second_TOA = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_second_SR = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_second_SR_TOA = joinLandsatCollections(Imagecollection_second_SR, Imagecollection_second_TOA);
      var Imagecollection_second = Imagecollection_second_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      // Data preparation and masking of sensor errors and non-forest areas ************************************************************************************  
      var Imagecollection_base_2 = Imagecollection_base
      .map(function(image){return Masking_1(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      var Imagecollection_second_2 = Imagecollection_second
      .map(function(image){return Masking_1(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      // Calculation of single scenes of Base-NBR **************************************************************************************************************
      var NBR_Imagecollection_base = Imagecollection_base_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Base-NBR ***************************************************************************************
      var NBR_Imagecollection_base_normal1 = NBR_Imagecollection_base.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Base-NBR scenes at 0 and -1 *****************************************************************************************
      var NBR_Imagecollection_base_normal2 = NBR_Imagecollection_base_normal1.map(Capping);
      // Condensation of all available self-referenced single Base-NBR scenes per investigation period *********************************************************
      var NBR_Imagecollection_base_normalized_min = NBR_Imagecollection_base_normal2.qualityMosaic('NBR');
      // Calculation of single scenes of Second-NBR ************************************************************************************************************
      var NBR_Imagecollection_second = Imagecollection_second_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Second-NBR *************************************************************************************
      var NBR_Imagecollection_second_normal1 = NBR_Imagecollection_second.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Second-NBR scenes at 0 and -1 ***************************************************************************************
      var NBR_Imagecollection_second_normal2 = NBR_Imagecollection_second_normal1.map(Capping);
      // Condensation of all available self-referenced single Second-NBR scenes per investigation period *******************************************************
      var NBR_Imagecollection_second_normalized_min = NBR_Imagecollection_second_normal2.qualityMosaic('NBR');
      // Derive the Delta-NBR result ***************************************************************************************************************************
      var NBR_difference = NBR_Imagecollection_second_normalized_min.select('NBR').subtract(NBR_Imagecollection_base_normalized_min.select('NBR'));
      var NBR_difference_capped = NBR_difference.select('NBR').where(NBR_difference.select('NBR').lt(0), 0);
      // Display of condensed Base-NBR scene and information about the acquisition dates of the base satellite data per single pixel location ******************
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Reference L7 '+Start_base+' - '+End_base, false);
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('yearday'),{min: Start_base_number, max: End_base_number ,palette: 'ff0000,ffffff'},'Date-Reference L7 '+Start_base+' - '+End_base, false);
      // Display of condensed Second-NBR scene and information about the acquisition dates of the second satellite data per single pixel location **************
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Analysis L7 '+Start_second+' - '+End_second, false);
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('yearday'),{min: Start_second_number, max: End_second_number, palette: 'ff0000,ffffff'},'Date-Analysis L7 '+Start_second+' - '+End_second, false);
      // Just some information regarding the used satellite data ***********************************************************************************************
      print (Imagecollection_base_2,'Reference period L7: '+Start_base+' - '+End_base);
      print (Imagecollection_second_2,'Analysis period L7: '+Start_second+' - '+End_second);
      // *******************************************************************************************************************************************************
      // Prepare data for export (NoData is set to -2) *********************************************************************************************************
      var NBR_Imagecollection_base_normalized_min_Export_L7 = NBR_Imagecollection_base_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_base_normalized_min_date_Export_L7 = NBR_Imagecollection_base_normalized_min.select('yearday').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_Export_L7 = NBR_Imagecollection_second_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_date_Export_L7 = NBR_Imagecollection_second_normalized_min.select('yearday').unmask(-2);
      var NBR_difference_Export_L7 = NBR_difference_capped.unmask(-2);  
     // Selecting sensor land sat 7 and 8
      if (Sensor === 'L78' || Sensor === 'L57'){
       if (improve_L7 === true){
          NBR_difference_capped = NBR_difference_capped.where(NBR_difference_capped.lt(improve_threshold),0);
          var NBR_difference_capped_L7 = ee.ImageCollection(NBR_difference_capped);
          // NBR_difference_capped = 0;
        }
        if (improve_L7 === false){
          var NBR_difference_capped_L7 = ee.ImageCollection(NBR_difference_capped);
          // NBR_difference_capped = 0;
        }
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L7 '+Start_second+' - '+End_second, false);
      }
      if (Sensor === 'L7'){
        if (improve_L7 === true){
          NBR_difference_capped = NBR_difference_capped.where(NBR_difference_capped.lt(improve_threshold),0);
          var NBR_difference_capped_L7 = ee.ImageCollection(NBR_difference_capped);
          // NBR_difference_capped = 0;
        }
        if (improve_L7 === false){
          var NBR_difference_capped_L7 = ee.ImageCollection(NBR_difference_capped);
          // NBR_difference_capped = 0;
        }
        Map.addLayer (NBR_difference_capped_L7.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L7 '+Start_second+' - '+End_second, true);
      }
    }
    if (Sensor === 'L5' || Sensor === 'L57'){
      var resolution = 30;
      var BANDS=['B4','B7','fmask','B6','B6','B1','B2','B3','B5'];
      if (Index === 'NBR'){
        var band_1 = 'B4';
        var band_2 = 'B7';
      }
      if (Index === 'BAIM'){
        var band_1 = 'B4';
        var band_2 = 'B5';
      }
      if (Index === 'BAI'){
        var band_1 = 'B4';
        var band_2 = 'B3';
      }
      if (Index === 'NBRT'){
        var band_1 = 'B7';
        var band_2 = 'B4';
      }
      // Data preparation and cloud masking ********************************************************************************************************************
      var Imagecollection_base_TOA = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_base_SR = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_base_SR_TOA = joinLandsatCollections(Imagecollection_base_SR, Imagecollection_base_TOA);
      var Imagecollection_base = Imagecollection_base_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      var Imagecollection_second_TOA = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_second_SR = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_second_SR_TOA = joinLandsatCollections(Imagecollection_second_SR, Imagecollection_second_TOA);
      var Imagecollection_second = Imagecollection_second_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      // Data preparation and masking of sensor errors and non-forest areas ************************************************************************************   
      var Imagecollection_base_2 = Imagecollection_base
      .map(function(image){return Masking_1(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      var Imagecollection_second_2 = Imagecollection_second
      .map(function(image){return Masking_1(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      // Calculation of single scenes of Base-NBR **************************************************************************************************************
      var NBR_Imagecollection_base = Imagecollection_base_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Base-NBR ***************************************************************************************
      var NBR_Imagecollection_base_normal1 = NBR_Imagecollection_base.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Base-NBR scenes at 0 and -1 *****************************************************************************************
      var NBR_Imagecollection_base_normal2 = NBR_Imagecollection_base_normal1.map(Capping);
      // Condensation of all available self-referenced single Base-NBR scenes per investigation period *********************************************************
      var NBR_Imagecollection_base_normalized_min = NBR_Imagecollection_base_normal2.qualityMosaic('NBR');
      // Calculation of single scenes of Second-NBR ************************************************************************************************************
      var NBR_Imagecollection_second = Imagecollection_second_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Second-NBR *************************************************************************************
      var NBR_Imagecollection_second_normal1 = NBR_Imagecollection_second.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Second-NBR scenes at 0 and -1 ***************************************************************************************
      var NBR_Imagecollection_second_normal2 = NBR_Imagecollection_second_normal1.map(Capping);
      // Condensation of all available self-referenced single Second-NBR scenes per investigation period *******************************************************
      var NBR_Imagecollection_second_normalized_min = NBR_Imagecollection_second_normal2.qualityMosaic('NBR');
      // Derive the Delta-NBR result ***************************************************************************************************************************
      var NBR_difference = NBR_Imagecollection_second_normalized_min.select('NBR').subtract(NBR_Imagecollection_base_normalized_min.select('NBR'));
      var NBR_difference_capped = NBR_difference.select('NBR').where(NBR_difference.select('NBR').lt(0), 0);
      // Display of condensed Base-NBR scene and information about the acquisition dates of the base satellite data per single pixel location ******************
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Reference L5 '+Start_base+' - '+End_base, false);
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('yearday'),{min: Start_base_number, max: End_base_number ,palette: 'ff0000,ffffff'},'Date-Reference L5 '+Start_base+' - '+End_base, false);
      // Display of condensed Second-NBR scene and information about the acquisition dates of the second satellite data per single pixel location **************
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Analysis L5 '+Start_second+' - '+End_second, false);
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('yearday'),{min: Start_second_number, max: End_second_number, palette: 'ff0000,ffffff'},'Date-Analysis L5 '+Start_second+' - '+End_second, false);
      // Just some information regarding the used satellite data ***********************************************************************************************
      print (Imagecollection_base_2,'Reference period L5: '+Start_base+' - '+End_base);
      print (Imagecollection_second_2,'Analysis period L5: '+Start_second+' - '+End_second);
      // *******************************************************************************************************************************************************
      // Prepare data for export (NoData is set to -2) *********************************************************************************************************
      var NBR_Imagecollection_base_normalized_min_Export_L5 = NBR_Imagecollection_base_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_base_normalized_min_date_Export_L5 = NBR_Imagecollection_base_normalized_min.select('yearday').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_Export_L5 = NBR_Imagecollection_second_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_date_Export_L5 = NBR_Imagecollection_second_normalized_min.select('yearday').unmask(-2);
      var NBR_difference_Export_L5 = NBR_difference_capped.unmask(-2);  
      if (Sensor === 'L57'){
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L5 '+Start_second+' - '+End_second, false);
        var NBR_difference_capped_L5 = ee.ImageCollection(NBR_difference_capped);
        // NBR_difference_capped = 0;
      }
      if (Sensor === 'L5'){
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L5 '+Start_second+' - '+End_second, true);
        // NBR_difference_capped = 0;
      }
    }
    if (Sensor === 'L4' || Sensor === 'L45'){
      var resolution = 30;
      var BANDS=['B4','B7','fmask','B6','B6','B1','B2','B3','B5'];
      if (Index === 'NBR'){
        var band_1 = 'B4';
        var band_2 = 'B7';
      }
      if (Index === 'BAIM'){
        var band_1 = 'B4';
        var band_2 = 'B5';
      }
      if (Index === 'BAI'){
        var band_1 = 'B4';
        var band_2 = 'B3';
      }
      if (Index === 'NBRT'){
        var band_1 = 'B7';
        var band_2 = 'B4';
      }
      // Data preparation and cloud masking ********************************************************************************************************************
      var Imagecollection_base_TOA = ee.ImageCollection('LANDSAT/LT04/C01/T1_TOA')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_base_SR = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterDate(Start_base, End_base)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_base_SR_TOA = joinLandsatCollections(Imagecollection_base_SR, Imagecollection_base_TOA);
      var Imagecollection_base = Imagecollection_base_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      var Imagecollection_second_TOA = ee.ImageCollection('LANDSAT/LT04/C01/T1_TOA')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous
      .map(ee.Algorithms.Landsat.simpleCloudScore)
      .select('cloud');
      var Imagecollection_second_SR = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterDate(Start_second, End_second)
      .filterBounds(studyarea)
      // .filter(ee.Filter.neq('LANDSAT_SCENE_ID','LC82300672014276LGN00')) // Use this line (or several) to exclude scenes that are erroneous;
      var Imagecollection_second_SR_TOA = joinLandsatCollections(Imagecollection_second_SR, Imagecollection_second_TOA);
      var Imagecollection_second = Imagecollection_second_SR_TOA.map(function(image){return Masking_2(image.clip(image.geometry().
      buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)});
      // Data preparation and masking of sensor errors and non-forest areas ************************************************************************************   
      var Imagecollection_base_2 = Imagecollection_base
      .map(function(image){return Masking_1(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      var Imagecollection_second_2 = Imagecollection_second
      .map(function(image){return Masking_1(image,cloud_buffer,BANDS,cloud_pixel_qa_select,cloud_shadow_pixel_qa_select,cloud_conf_qa_select,cloud_shadow_sr_cloud_qa_select,SimpleCloudScore_select,UnsureClouds_select)}).select([band_1,band_2],['Band_1','Band_2']);
      // Calculation of single scenes of Base-NBR **************************************************************************************************************
      var NBR_Imagecollection_base = Imagecollection_base_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Base-NBR ***************************************************************************************
      var NBR_Imagecollection_base_normal1 = NBR_Imagecollection_base.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Base-NBR scenes at 0 and -1 *****************************************************************************************
      var NBR_Imagecollection_base_normal2 = NBR_Imagecollection_base_normal1.map(Capping);
      // Condensation of all available self-referenced single Base-NBR scenes per investigation period *********************************************************
      var NBR_Imagecollection_base_normalized_min = NBR_Imagecollection_base_normal2.qualityMosaic('NBR');
      // Calculation of single scenes of Second-NBR ************************************************************************************************************
      var NBR_Imagecollection_second = Imagecollection_second_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Second-NBR *************************************************************************************
      var NBR_Imagecollection_second_normal1 = NBR_Imagecollection_second.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Second-NBR scenes at 0 and -1 ***************************************************************************************
      var NBR_Imagecollection_second_normal2 = NBR_Imagecollection_second_normal1.map(Capping);
      // Condensation of all available self-referenced single Second-NBR scenes per investigation period *******************************************************
      var NBR_Imagecollection_second_normalized_min = NBR_Imagecollection_second_normal2.qualityMosaic('NBR');
      // Derive the Delta-NBR result ***************************************************************************************************************************
      var NBR_difference = NBR_Imagecollection_second_normalized_min.select('NBR').subtract(NBR_Imagecollection_base_normalized_min.select('NBR'));
      var NBR_difference_capped = NBR_difference.select('NBR').where(NBR_difference.select('NBR').lt(0), 0);
      // Display of condensed Base-NBR scene and information about the acquisition dates of the base satellite data per single pixel location ******************
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Reference L4 '+Start_base+' - '+End_base, false);
      Map.addLayer (NBR_Imagecollection_base_normalized_min.select('yearday'),{min: Start_base_number, max: End_base_number ,palette: 'ff0000,ffffff'},'Date-Reference L4 '+Start_base+' - '+End_base, false);
      // Display of condensed Second-NBR scene and information about the acquisition dates of the second satellite data per single pixel location **************
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'r'+Index+'-Analysis L4 '+Start_second+' - '+End_second, false);
      Map.addLayer (NBR_Imagecollection_second_normalized_min.select('yearday'),{min: Start_second_number, max: End_second_number, palette: 'ff0000,ffffff'},'Date-Analysis L4 '+Start_second+' - '+End_second, false);
      // Just some information regarding the used satellite data ***********************************************************************************************
      print (Imagecollection_base_2,'Reference period L4: '+Start_base+' - '+End_base);
      print (Imagecollection_second_2,'Analysis period L4: '+Start_second+' - '+End_second);
      // *******************************************************************************************************************************************************
      // Prepare data for export (NoData is set to -2) *********************************************************************************************************
      var NBR_Imagecollection_base_normalized_min_Export_L4 = NBR_Imagecollection_base_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_base_normalized_min_date_Export_L4 = NBR_Imagecollection_base_normalized_min.select('yearday').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_Export_L4 = NBR_Imagecollection_second_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_date_Export_L4 = NBR_Imagecollection_second_normalized_min.select('yearday').unmask(-2);
      var NBR_difference_Export_L4 = NBR_difference_capped.unmask(-2);  
      if (Sensor === 'L45'){
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L4 '+Start_second+' - '+End_second, false);
        var NBR_difference_capped_L4 = ee.ImageCollection(NBR_difference_capped);
        // NBR_difference_capped = 0;
      }
      if (Sensor === 'L4'){
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' L4 '+Start_second+' - '+End_second, true);
        // NBR_difference_capped = 0;
      }
    }
    if (Sensor === 'L78'){
        var NBR_difference_capped_L78 = ee.ImageCollection(NBR_difference_capped_L7.merge(NBR_difference_capped_L8));
        var NBR_difference_capped = NBR_difference_capped_L78.qualityMosaic('NBR');
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' '+Sensor+' '+Start_second+' - '+End_second, true);
        // Prepare data for export (NoData is set to -2) *******************************************************************************************************
        var NBR_difference_Export_L78 = NBR_difference_capped.unmask(-2);
    } 
    if (Sensor === 'L57'){
        var NBR_difference_capped_L57 = ee.ImageCollection(NBR_difference_capped_L5.merge(NBR_difference_capped_L7))
        var NBR_difference_capped = NBR_difference_capped_L57.qualityMosaic('NBR');
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' '+Sensor+' '+Start_second+' - '+End_second, true);
        // Prepare data for export (NoData is set to -2) *******************************************************************************************************
        var NBR_difference_Export_L57 = NBR_difference_capped.unmask(-2);
    } 
    if (Sensor === 'L45'){
        var NBR_difference_capped_L45 = ee.ImageCollection(NBR_difference_capped_L4.merge(NBR_difference_capped_L5))
        var NBR_difference_capped = NBR_difference_capped_L45.qualityMosaic('NBR');
        Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' '+Sensor+' '+Start_second+' - '+End_second, true);
        // Prepare data for export (NoData is set to -2) *******************************************************************************************************
        var NBR_difference_Export_L45 = NBR_difference_capped.unmask(-2);
    } 
    if (Sensor === 'L7'){
        var NBR_difference_capped_L7improved = ee.ImageCollection(NBR_difference_capped_L7);
        var NBR_difference_capped = NBR_difference_capped_L7improved.qualityMosaic('NBR');
        // Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'Delta-r'+Index+' '+Sensor+' '+Start_second+' - '+End_second, true);
        // Prepare data for export (NoData is set to -2) *******************************************************************************************************
        var NBR_difference_Export_L7 = NBR_difference_capped.unmask(-2);
    }
    if (Sensor === 'S2'){
      var resolution = 10;
      var BANDS=['B2','B8','B7','B8A','B9','B11','B12','B3','B4','B5','B6'];
      if (Index === 'NBR'){
        var band_1 = 'B8';
        var band_2 = 'B12';
      }
    if (Index === 'BAIM'){
        var band_1 = 'B8';
        var band_2 = 'B12';
      }
      if (Index === 'BAI'){
        var band_1 = 'B8';
        var band_2 = 'B4';
      }
      if (Index === 'BAIS2'){
        var a = 'B6';
        var b = 'B7';
        var c = 'B8A';
        var d = 'B4';
        var e ='B12';
      }
      // Data preparation and cloud masking ********************************************************************************************************************
      // Reference Period
      var Imagecollection_base = ee.ImageCollection('COPERNICUS/S2').filterDate(Start_base, End_base).filterBounds(studyarea).map(function(image){return Masking_S2_1(image,cloud_buffer,BANDS)});
      // Analysis Period
      var Imagecollection_second = ee.ImageCollection('COPERNICUS/S2').filterDate(Start_second, End_second).filterBounds(studyarea).map(function(image){return Masking_S2_1(image,cloud_buffer,BANDS)});
      // Data preparation and masking of sensor errors and non-forest areas ************************************************************************************
      // Reference
      var Imagecollection_base_2 = Imagecollection_base.map(function(image){return Masking_2(image.clip(image.geometry().buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)})
      .select([band_1,band_2],['Band_1','Band_2']);
      // Analysis 
      var Imagecollection_second_2 = Imagecollection_second.map(function(image){return Masking_2(image.clip(image.geometry().buffer(-500)),forest_mask,hansen_treecover,forest_mask_year_select,forest_mask_select,BANDS,sensorerror_bufferdistance)})
      .select([band_1,band_2],['Band_1','Band_2']);
      // Calculation of single scenes of Base-NBR 
      var NBR_Imagecollection_base = Imagecollection_base_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Base-NBR ***************************************************************************************
      var NBR_Imagecollection_base_normal1 = NBR_Imagecollection_base//.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Base-NBR scenes at 0 and -1 *****************************************************************************************
      var NBR_Imagecollection_base_normal2 = NBR_Imagecollection_base_normal1//.map(Capping);
      // Condensation of all available self-referenced single Base-NBR scenes per investigation period *********************************************************
      var NBR_Imagecollection_base_normalized_min = NBR_Imagecollection_base_normal2.qualityMosaic('NBR');
      // Calculation of single scenes of Second-NBR ************************************************************************************************************
      var NBR_Imagecollection_second = Imagecollection_second_2.map(NBR);
      // 'Self-referencing' or normalizatin of single scenes of Second-NBR *************************************************************************************
      var NBR_Imagecollection_second_normal1 = NBR_Imagecollection_second//.map(function(image){return Adjustment_kernel(image,kernel_size)});
      // Capping of self-referenced single Second-NBR scenes at 0 and -1 ***************************************************************************************
      var NBR_Imagecollection_second_normal2 = NBR_Imagecollection_second_normal1//.map(Capping);
      // Condensation of all available self-referenced single Second-NBR scenes per investigation period *******************************************************
      var NBR_Imagecollection_second_normalized_min = NBR_Imagecollection_second_normal2.qualityMosaic('NBR');
      // Derive the Delta-NBR result ***************************************************************************************************************************
      var NBR_difference = NBR_Imagecollection_second_normalized_min.select('NBR').subtract(NBR_Imagecollection_base_normalized_min.select('NBR'));
      var NBR_difference_capped = NBR_difference.select('NBR').lt(-0.5)
      // Display of condensed Base-NBR scene and information about the acquisition dates of the base satellite data per single pixel location ******************
      Map.addLayer(Imagecollection_base.median().clip(geometry),{bands: ["B12","B8","B4"],min:673, max:2500 }, 'Cloud_Free-Reference S2 '+Start_base+' - '+End_base, false );// Cloud Free 
      Map.addLayer(Imagecollection_second.median().clip(geometry), {bands: ["B12","B8","B4"],min:673, max:2500 }, 'Cloud_Free-Analysis S2 '+Start_second+' - '+End_second, false);
      // Display the Delta-NBR result **************************************************************************************************************************
      Map.addLayer (NBR_difference_capped.select('NBR'),{min:[0],max:[0.3],palette:'D3D3D3,Ce0f0f'},'d'+Index+' S2 '+Start_second+' - '+End_second, true);
      // Prepare data for export (NoData is set to -2) *********************************************************************************************************
      var NBR_Imagecollection_base_normalized_min_Export_S2 = NBR_Imagecollection_base_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_base_normalized_min_date_Export_S2 = NBR_Imagecollection_base_normalized_min.select('yearday').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_Export_S2 = NBR_Imagecollection_second_normalized_min.select('NBR').unmask(-2);
      var NBR_Imagecollection_second_normalized_min_date_Export_S2 = NBR_Imagecollection_second_normalized_min.select('yearday').unmask(-2);
      var NBR_difference_Export_S2 = NBR_difference_capped.unmask(-2);
    }
    // Possible cleaning of the final Delta-NBR result ********************************************************************************************************
    if (cleaning_select === true){
      var NBR_difference_capped_1 = NBR_difference_capped.where(NBR_difference_capped.lt(threshold_conservative),0)
      .and((NBR_difference_capped.where(NBR_difference_capped.gte(threshold_conservative),1)));
      var NBR_difference_capped_2 = NBR_difference_capped_1.reduceNeighborhood({
        reducer: ee.Reducer.sum().unweighted(),
        kernel: ee.Kernel.circle(kernel_clean_size,'meters'),
      })
      var NBR_difference_capped_3 = NBR_difference_capped.where(NBR_difference_capped_2.gte(min_disturbances),1)
      .and((NBR_difference_capped.where(NBR_difference_capped_2.lt(min_disturbances),0))).unmask(-2);
      var NBR_difference_capped_4 = NBR_difference_capped_3.multiply(NBR_difference_capped);
      var NBR_difference_Export_cleaned = NBR_difference_capped_4.unmask(-2);
      // Display the cleaned Delta-NBR result
      Map.addLayer (NBR_difference_capped_4,{min:[0],max:[0.15],palette:'D3D3D3,Ce0f0f'},'d'+Index+' filtered '+Sensor+' '+Start_second+' - '+End_second, true);
    }
    // Severity Mapping
    if (severity_select === true){
            // Scale product to USGS standards
      var pre=NBR_Imagecollection_base_normal2.mean() // Base
      var post=NBR_Imagecollection_second_normal2.mean()
      var diff=pre.select('NBR').subtract(post.select('NBR')).updateMask(NBR_difference_capped)
      var dNBR = diff.select('NBR').multiply(1000);
      // Define an SLD style of discrete intervals to apply to the image.
      var sld_intervals =
       '<RasterSymbolizer>' +
       '<ColorMap type="intervals" extended="false" >' +
       '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
       '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
       '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
       '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
       '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
       '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
       '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
       '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
       '</ColorMap>' +
       '</RasterSymbolizer>';
       // Add the image to the map using both the color ramp and interval schemes.
       Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'dNBR classified');
       // Seperate result into 8 burn severity classes
       var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
       var classified = dNBR.lt(thresholds).reduce('sum').toInt();
      //==========================================================================================
      //                              ADD BURNED AREA STATISTICS
       // count number of pixels in entire layer
       var allpix =  classified.updateMask(classified);  // mask the entire layer
       var pixstats = allpix.reduceRegion({
       reducer: ee.Reducer.count(),               // count pixels in a single class
       geometry: studyarea,
       scale: 10
       });
       var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
       // create an empty list to store area values in
       var arealist = [];
       // create a function to derive extent of one burn severity class
       // arguments are class number and class name
       var areacount = function(cnr, name) {
       var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
       var stats = singleMask.reduceRegion({
       reducer: ee.Reducer.count(),               // count pixels in a single class
       geometry: studyarea,
       scale: 10
       });
       var pix =  ee.Number(stats.get('sum'));
       var hect = pix.multiply(100).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
       var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
       arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
        };
        // severity classes in different order
        var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
       'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
       // execute function for each class
       for (var i = 0; i < 8; i++) {
       areacount(i, names2[i]);
        }
       print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
       //==========================================================================================
       //                                    ADD A LEGEND
       // set position of panel
       var legend = ui.Panel({
       style: {
        position: 'bottom-left',
        padding: '8px 15px'
       }});
       // Create legend title
       var legendTitle = ui.Label({
       value: 'dNBR Classes',
       style: {fontWeight: 'bold',
       fontSize: '18px',
       margin: '0 0 4px 0',
       padding: '0'
       }});
       // Add the title to the panel
       legend.add(legendTitle);
       // Creates and styles 1 row of the legend.
       var makeRow = function(color, name) {
       // Create the label that is actually the colored box.
       var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
       // Create the label filled with the description text.
       var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
       });
       // return the panel
       return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
       })};
       //  Palette with the colors
       var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
       // name of the legend
       var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
       'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
       // Add color and and names
       for (var i = 0; i < 8; i++) {
        legend.add(makeRow(palette[i], names[i]));
        }  
       // add legend to map (alternatively you can also print the legend to the console)
       Map.add(legend);
    } 
    // *********************************************************************************************************************************************************
    // Export of results ***************************************************************************************************************************************
    // *********************************************************************************************************************************************************
    if (export_select === true){
      // Make a collection of the information that will be exported to a CSV file
      var features = ee.FeatureCollection([
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Investigation periods:'}),
        ee.Feature(null, {name: 'Start_analysis: '+Start_second}),
        ee.Feature(null, {name: 'End_analysis: '+End_second}),
        ee.Feature(null, {name: 'Start_reference: '+Start_base}),
        ee.Feature(null, {name: 'End_reference: '+End_base}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Index selection:'}),
        ee.Feature(null, {name: 'Index: '+Index}),
        ee.Feature(null, {name: 'Sensor selection:'}),
        ee.Feature(null, {name: 'Sensor: '+Sensor}),
        ee.Feature(null, {name: 'Improve_L7: '+improve_L7}),
        ee.Feature(null, {name: 'Improve_threshold: '+improve_threshold}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Geographic area analyzed:'}),
        ee.Feature(null, {name: 'Countryname: '+countryname}),
        ee.Feature(null, {name: 'AOI: '+AOI_select}),
        ee.Feature(null, {name: 'Asset: '+Asset_select}),
        ee.Feature(null, {name: 'Center: '+center}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Cloud masking:'}),
        ee.Feature(null, {name: 'Cloud_pixel_qa_select: '+cloud_pixel_qa_select}),
        ee.Feature(null, {name: 'Cloud_shadow_pixel_qa_select: '+cloud_shadow_pixel_qa_select}),
        ee.Feature(null, {name: 'Cloud_conf_qa_select: '+cloud_conf_qa_select}),
        ee.Feature(null, {name: 'Cloud_shadow_sr_cloud_qa_select: '+cloud_shadow_sr_cloud_qa_select}),
        ee.Feature(null, {name: 'Cirrus_conf_qa_select: '+cirrus_conf_qa_select}),
        ee.Feature(null, {name: 'SimpleCloudScore_select: '+SimpleCloudScore_select}),
        ee.Feature(null, {name: 'UnsureClouds_select: '+UnsureClouds_select}),
        ee.Feature(null, {name: 'Cloud_buffer: '+cloud_buffer}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Forest map:'}),
        ee.Feature(null, {name: 'Forest_map_select: '+forest_mask_select}),
        ee.Feature(null, {name: 'Forest_map_year_select: '+forest_mask_year_select}),
        ee.Feature(null, {name: 'Global forest cover: '+hansen_treecover}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Self-referencing:'}),
        ee.Feature(null, {name: 'Kernel_size: '+kernel_size}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Disturbance-density-related filtering:'}),
        ee.Feature(null, {name: 'Cleaning_select: '+cleaning_select}),
        ee.Feature(null, {name: 'Export_file: '+'DeltaNBR_all_cleaned_'+countryname.replace(/ /g,'')+'_'+End_second+'--'+Start_base}), 
        ee.Feature(null, {name: 'Threshold_conservative: '+threshold_conservative}),
        ee.Feature(null, {name: 'Kernel_clean_size: '+kernel_clean_size}),
        ee.Feature(null, {name: 'Min_disturbances: '+min_disturbances}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: 'Export option:'}),
        ee.Feature(null, {name: 'Export_select: '+export_select}),
        ee.Feature(null, {name: 'Export_file: '+'Delta'+Index+'_'+Sensor+'_'+countryname.replace(/ /g,'')+'_'+End_second+'--'+Start_base}),    
        ee.Feature(null, {name: 'Export_select_single_r'+Index+'_'+Sensor+': '+export_select_singleNBRs}),
        ee.Feature(null, {name: 'Export_select_single_dates: '+export_select_singleNBRdates}),
        ee.Feature(null, {name: 'Export_select_forestmask: '+export_select_forestmask}),
        ee.Feature(null, {name: '*************************************************'}),
        ee.Feature(null, {name: '*************************************************'}),
      ]);
      Export.table.toDrive({
        collection: features,
        description:'Report_Delta-r'+Index+'-session_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second,
        fileFormat: 'CSV'
      });
      for (var x = 0 ; x < Delta_X ; x++) {
        for (var y = 0 ; y < Delta_Y ; y++) {
          var x_lower_left = (x) + min_X;
          var y_lower_left = (y) + min_Y;
          var x_higher_right = (x) + min_X+1;
          var y_higher_right = (y) + min_Y+1;
          var region = ee.FeatureCollection(ee.Geometry.Rectangle(x_lower_left, y_lower_left, x_higher_right, y_higher_right));
          var region_intersect = region.filterBounds(country);
          if (region_intersect.size().getInfo() > 0){
            Map.addLayer(region_intersect,{},'Exportbox'+'_'+x+'-'+y,false);
            if (Sensor === 'L8' || Sensor === 'L78'){
              Export.image.toDrive({
                image: NBR_difference_Export_L8,
                description: 'Delta-r'+Index+'_L8_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
              if (export_select_singleNBRs === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_Export_L8,
                  description: 'r'+Index+'_reference_L8_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_Export_L8,
                  description: 'r'+Index+'_analysis_L8_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
              if (export_select_singleNBRdates === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_date_Export_L8,
                  description: 'Date_reference_L8_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_date_Export_L8,
                  description: 'Date_analysis_L8_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
            }
            if (Sensor === 'L7' || Sensor === 'L78' || Sensor === 'L57'){
              Export.image.toDrive({
                image: NBR_difference_Export_L7,
                description: 'Delta-r'+Index+'_L7_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
              if (export_select_singleNBRs === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_Export_L7,
                  description: 'r'+Index+'_reference_L7_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_Export_L7,
                  description: 'r'+Index+'_analysis_L7_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
              if (export_select_singleNBRdates === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_date_Export_L7,
                  description: 'Date_reference_L7_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_date_Export_L7,
                  description: 'Date_analysis_L7_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
            }
            if (Sensor === 'L5' || Sensor === 'L57'){
              Export.image.toDrive({
                image: NBR_difference_Export_L5,
                description: 'Delta-r'+Index+'_L5_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
              if (export_select_singleNBRs === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_Export_L5,
                  description: 'r'+Index+'_reference_L5_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_Export_L5,
                  description: 'r'+Index+'_analysis_L5_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
              if (export_select_singleNBRdates === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_date_Export_L5,
                  description: 'Date_reference_L5_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_date_Export_L5,
                  description: 'Date_analysis_L5_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
            }
            if (Sensor === 'L4' || Sensor === 'L45'){
              Export.image.toDrive({
                image: NBR_difference_Export_L4,
                description: 'Delta-r'+Index+'_L4_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
              if (export_select_singleNBRs === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_Export_L4,
                  description: 'r'+Index+'_reference_L4_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_Export_L4,
                  description: 'r'+Index+'_analysis_L4_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
              if (export_select_singleNBRdates === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_date_Export_L4,
                  description: 'Date_reference_L4_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_date_Export_L4,
                  description: 'Date_analysis_L4_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
            }
            if (Sensor === 'L78'){
              Export.image.toDrive({
                image: NBR_difference_Export_L78,
                description: 'Delta-r'+Index+'_L78_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
            }
            if (Sensor === 'L57'){
                Export.image.toDrive({
                image: NBR_difference_Export_L57,
                description: 'Delta-r'+Index+'_L57_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
            }
            if (Sensor === 'L45'){
                Export.image.toDrive({
                image: NBR_difference_Export_L45,
                description: 'Delta-r'+Index+'_L45_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
            }
            if (Sensor === 'S2'){
              Export.image.toDrive({
                image: NBR_difference_Export_S2,
                description: 'Delta-r'+Index+'_S2_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect 
              })
              if (export_select_singleNBRs === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_Export_S2,
                  description: 'r'+Index+'_reference_S2_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_Export_S2,
                  description: 'r'+Index+'_analysis_S2_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
              if (export_select_singleNBRdates === true){
                Export.image.toDrive({
                  image: NBR_Imagecollection_base_normalized_min_date_Export_S2,
                  description: 'Date_reference_S2_'+countryname.replace(/ /g,'')+'_'+Start_base+'--'+End_base+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
                Export.image.toDrive({
                  image: NBR_Imagecollection_second_normalized_min_date_Export_S2,
                  description: 'Date_analysis_S2_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                  scale: resolution,
                  maxPixels: 1e13,
                  shardSize: 32,
                  region: region_intersect
                });
              }
            }
            if (cleaning_select === true){
              Export.image.toDrive({
                image: NBR_difference_Export_cleaned,
                description: 'Delta-r'+Index+'_filtered_'+Sensor+'_'+countryname.replace(/ /g,'')+'_'+Start_second+'--'+End_second+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect
              });
            }
            if (export_select_forestmask === true){
              Export.image.toDrive({
                image: forest_mask_display,
                description: 'Forestmask_'+countryname.replace(/ /g,'')+'_'+forest_mask_select+'--'+forest_mask_year_select+'__'+x+'-'+y,
                scale: resolution,
                maxPixels: 1e13,
                shardSize: 32,
                region: region_intersect
              });
            }
          }
        }
      }
    }
});
// *********************************************************************************************************************************************************
// ******************************************************************* END *********************************************************************************
// *********************************************************************************************************************************************************