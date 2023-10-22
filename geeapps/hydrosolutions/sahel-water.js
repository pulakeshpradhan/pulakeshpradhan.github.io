var SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    LacWegnia = ui.import && ui.import("LacWegnia", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -8.135304129779916,
                13.299599953882819
              ],
              [
                -8.131119830023454,
                13.29724027710312
              ],
              [
                -8.130143515788717,
                13.294807460461548
              ],
              [
                -8.126334822834115,
                13.293794636211661
              ],
              [
                -8.119146508112493,
                13.293523257195389
              ],
              [
                -8.112301505268197,
                13.29417052429832
              ],
              [
                -8.110804812055411,
                13.295099790024388
              ],
              [
                -8.110767228058718,
                13.298117306481986
              ],
              [
                -8.11567028121046,
                13.298305246247898
              ],
              [
                -8.120669997394662,
                13.303275191039683
              ],
              [
                -8.125390685260873,
                13.304026937228006
              ],
              [
                -8.133330061234847,
                13.305614063119988
              ],
              [
                -8.141998923481088,
                13.304945734957512
              ],
              [
                -8.141569771251636,
                13.303943385805244
              ],
              [
                -8.141333735645395,
                13.301855219654264
              ],
              [
                -8.139724384761138,
                13.301145269923076
              ],
              [
                -8.138501281492532,
                13.300226491764302
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
        [[[-8.135304129779916, 13.299599953882819],
          [-8.131119830023454, 13.29724027710312],
          [-8.130143515788717, 13.294807460461548],
          [-8.126334822834115, 13.293794636211661],
          [-8.119146508112493, 13.293523257195389],
          [-8.112301505268197, 13.29417052429832],
          [-8.110804812055411, 13.295099790024388],
          [-8.110767228058718, 13.298117306481986],
          [-8.11567028121046, 13.298305246247898],
          [-8.120669997394662, 13.303275191039683],
          [-8.125390685260873, 13.304026937228006],
          [-8.133330061234847, 13.305614063119988],
          [-8.141998923481088, 13.304945734957512],
          [-8.141569771251636, 13.303943385805244],
          [-8.141333735645395, 13.301855219654264],
          [-8.139724384761138, 13.301145269923076],
          [-8.138501281492532, 13.300226491764302]]]),
    alos = ui.import && ui.import("alos", "image", {
      "id": "JAXA/ALOS/AW3D30/V2_2"
    }) || ee.Image("JAXA/ALOS/AW3D30/V2_2"),
    GSW = ui.import && ui.import("GSW", "imageCollection", {
      "id": "JRC/GSW1_1/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_1/MonthlyHistory"),
    MODIS = ui.import && ui.import("MODIS", "imageCollection", {
      "id": "MODIS/006/MCD19A2_GRANULES"
    }) || ee.ImageCollection("MODIS/006/MCD19A2_GRANULES"),
    Rivers = ui.import && ui.import("Rivers", "table", {
      "id": "WWF/HydroSHEDS/v1/FreeFlowingRivers"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers"),
    Lakes_Sahel_b500 = ui.import && ui.import("Lakes_Sahel_b500", "table", {
      "id": "users/magosilvain/Lakes_Sahel_b500"
    }) || ee.FeatureCollection("users/magosilvain/Lakes_Sahel_b500"),
    Guelta = ui.import && ui.import("Guelta", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            21.77361150054859,
            16.90386777952125
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([21.77361150054859, 16.90386777952125]),
    Lakes_WWF_gt10km2 = ui.import && ui.import("Lakes_WWF_gt10km2", "table", {
      "id": "users/magosilvain/Lakes_WWF_gt10km2"
    }) || ee.FeatureCollection("users/magosilvain/Lakes_WWF_gt10km2"),
    Lakes_WWF_Senegal = ui.import && ui.import("Lakes_WWF_Senegal", "table", {
      "id": "users/magosilvain/Lakes_WWF_remaining_Senegal"
    }) || ee.FeatureCollection("users/magosilvain/Lakes_WWF_remaining_Senegal"),
    Lakes_Sahel_b500_Senegal = ui.import && ui.import("Lakes_Sahel_b500_Senegal", "table", {
      "id": "users/magosilvain/Lakes_Sahel_b500_Senegal_North"
    }) || ee.FeatureCollection("users/magosilvain/Lakes_Sahel_b500_Senegal_North"),
    adm_0 = ui.import && ui.import("adm_0", "table", {
      "id": "USDOS/LSIB/2017"
    }) || ee.FeatureCollection("USDOS/LSIB/2017"),
    DAHITI_all = ui.import && ui.import("DAHITI_all", "table", {
      "id": "users/magosilvain/IDs_Dahiti_all_buffered"
    }) || ee.FeatureCollection("users/magosilvain/IDs_Dahiti_all_buffered");
//USER INPUT: COUNTRY FOR STARTING SCREEN
var cc_thresh = 20;
var cc_pix=50;//10
var nodata_thresh = 20;
var nodata_thresh_l7 = 40; //pixels with no data over AOI, in % (use higher threshold because of scan line failure in L7)
//var mndwi_thresh=-0.3;
var buffer_width=500;
var workwiththisscale=ee.Number(50);
var pixel_per_ha=ee.Number(10000).divide(workwiththisscale.multiply(workwiththisscale)).round();
//Background settings
var satelliteMap = ui.Map();
satelliteMap.setOptions("HYBRID");
//print('Lakes_Sahel_b500',Lakes_Sahel_b500)
var hydrosolutions = ui.Label({ value : "hydrosolutions.ch", style : { shown:true ,color:'blue', fontWeight: '600', fontSize: '11px',margin: '4px 1px 2px 0px'}, targetUrl : "https://www.hydrosolutions.ch/projects/sahel-water"  } );
//var manual = ui.Label({ value : "APP MANUAL", style : { shown:true ,fontFamily:"arial",color:'black', fontWeight: '500', fontSize: '11px',margin: '4px 1px 2px 1px',height:'12px'}, targetUrl : "https://30867c33-1fc0-4c0a-9951-79ede3db345a.filesusr.com/ugd/858ea7_5a2de1ca6e7c42e785c57068b90dbdc5.pdf"  } );
//var hydrosolutions_manual=ui.Panel({widgets: [hydrosolutions],layout: ui.Panel.Layout.flow('horizontal'),style: {position: 'top-center',height: '22px',padding:"2px"}});
Lakes_WWF_gt10km2=Lakes_WWF_gt10km2.map(function(feat){return ee.Feature(feat).set('COUNTRY',ee.String(feat.get('Country'))).set('area',feat.get('Lake_area'))});
//LIST OF COUNTRIES
//country shapes
//var country_list_server=ee.List(['Burkina Faso',	'Chad',	'Eritrea',	'Ethiopia',	'Mali',	'Mauritania',	'Niger',	'Nigeria',	'Senegal',	'Somalia',	'Sudan']);//only Sahel countries
var country_list_server=['Burkina Faso',	'Chad',	'Eritrea',	'Ethiopia',	'Mali',	'Mauritania',	'Niger',	'Nigeria',	'Senegal',	'Somalia',	'Sudan'];//only Sahel countries
//var country_list=country_list_server.remove('Eritrea').getInfo();
var country_list=['Burkina Faso',	'Chad',	'Ethiopia',	'Mali',	'Mauritania',	'Niger',	'Nigeria',	'Senegal',	'Somalia',	'Sudan'];//only Sahel countries
//var country_list=['Burkina Faso',	'Mali', 'Niger','Nigeria'];//only Sahel countries
//var country_list0=country_list_server.remove('Eritrea').add('LargeLakesWWF').getInfo();
var country_list0=['Burkina Faso',	'Chad',	'Ethiopia',	'Mali',	'Mauritania',	'Niger',	'Nigeria',	'Senegal',	'Somalia',	'Sudan','LargeLakesWWF'];//only Sahel countries
print('country_list0',country_list0);
var Table_assets;
var get_dem_from_asset = function(ic){ 
  var id= ee.String(ic.id.split('DEMfrom_SurfWaterFreq_S2_18to20_')[1]);
  return ee.Image(ic.id).set('ID',id);
};
var get_dem_from_asset_10to20 = function(ic){ 
  //var id= ee.String(ic.id.split('DEMfrom_SurfWaterFreq_L8_10to20_')[1]);
  var id = ee.String('ID_').cat(ee.String(ee.Number(ee.Image(ic.id).get('lake_id')).int()));
  return ee.Image(ic.id).set('ID',id);
};
var path;
var country_TS_Landsat;
var country_TS;
var tsids;
//Abijiata DEM:
path= 'users/magosilvain/DEMs_Sahel/SR_atl08and13n_occ00to20/DEMfrom_SurfWaterFreq_L8_00to20_ID_50066';
var Abijiata_DEM=ee.List([ee.Image(ee.data.getAsset(path).id).set('ID','ID_50066')]);
var selectedCountry;//=ee.Feature(adm_0.filter(ee.Filter.eq('COUNTRY_NA', 'Mali')).first());
var dem_collection;
var collection_ids;
var dem;
var get_imgs_from_asset = function(ic){ 
  var id= ee.String(ic.id.split('SurfWaterFreq_S2_18to20_')[1]);
  return ee.Image(ic.id).set('ID',id);
};
//country_list0=country_list_server.add('WWF').getInfo();
country_list0=['Burkina Faso',	'Chad',	'Ethiopia',	'Mali',	'Mauritania',	'Niger',	'Nigeria',	'Senegal',	'Somalia',	'Sudan','WWF'];//only Sahel countries
var Lakes_Sahel0=ee.FeatureCollection([Lakes_Sahel_b500,Lakes_Sahel_b500_Senegal,Lakes_WWF_Senegal,Lakes_WWF_gt10km2,
  DAHITI_all]).flatten();
var Lakes_Sahel;
var lakes_fc;
//VARIABLES
var select_year;
var lakes_list;
var select_adm1=ui.Select({items: []});
var histogram;
var IDs;
var img_water_th_nobuffer;
var point;
//var GSWimage;
var s2_mosaicked;
var feat_area_s2;
var feat_elev_s2;
var edge_img_landsat;
var feat_area_l8;
var feat_elev_l8;
var merged_landsat;
var area_of_interest;
var img_list_landsat;
var img_list_s2;
var img_water_th0;
var img_water_th;
var s2Projection;
var withbands_s2;
var s2_cc_feat;
var s2_cc;
var displacement_L8=ee.Image(0).rename('X').addBands(ee.Image(0).rename('Y'));
var displacement_L7=ee.Image(0).rename('X').addBands(ee.Image(0).rename('Y'));
var withMNDWI_l8;
var withMNDWI_l7;
var iteration_id=0;
//var dust_filter=ee.Filter.and(ee.Filter.neq('otsu_th',99),ee.Filter.neq('dust_storm',1));
var dust_filter=ee.Filter.neq('dust_storm2',1);
//var modis_aero;
var debug = false;
//var scale = 10;
var cannyThreshold = 0.7;
var cannySigma = 0.7;
var minValue = -0.3;
var newfeature=1;
var water_surface_probability_l8;
var water_surface_probability;
var dem_thislake;
var ts_thislake;
var ts_thislake_S2;
var long_term_areas;
var long_term_average;
var elev_range;
var selectedLake;
var name_id;
var name_id_client;
var area_of_interest;
var lake_area;
var drawingMode;
var good_ids;
var country_summary;
var sedzone;
var sedzone_stack;
var sedclick;
var sedsize;
var panel_outputs = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {maxWidth: '400px',border: '1px solid black'},
    widgets: [
      //ui.Label('OUTPUTS', {fontWeight: '450', fontSize: '16px', margin: '7px 1px 1px 10px'}),
      ]
});
ui.root.widgets().reset([satelliteMap,panel_outputs]);
var panel_thisyear=ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {width: '400px',maxHeight: '400px'},
  });
var panel_sedzone=ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {width: '400px'},
  });
var panel_trend=ui.Panel({
      layout: ui.Panel.Layout.flow('vertical'),
      style: {width: '400px',border: '1px solid black',  position: 'bottom-right'},
  });
///OPACITY SLIDER AND LEGEND
// create vizualization parameters
var viz = {min: -1, max: 1, palette: ["red","white","#0ce9ff"]};
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '1px 1px',
    //maxWidth: '80px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '1px 1px 4px 1px',
    padding: '0',
    //maxWidth: '75px'
    }
});
// Add the title to the panel
legend.add(legendTitle);
var thumbnail_erosion = ui.Thumbnail({
  image: ee.Image(1).visualize({min: 1, max: 1, palette: ['blue']}),
  params: {bbox:'0,0,10,100', dimensions:'16x16'},
  style: {padding: '0px', margin: '1px 3px 1px 0px'}
});
//thumbnail_erosion.setImage(ee.Image(1).visualize({min: 1, max: 1, palette: ["blue"]}));
var erosion_panel=ui.Panel([ui.Label('Erosion Area', {fontSize: '14px', margin: '1px 10px 1px 1px'})
  ,thumbnail_erosion], ui.Panel.Layout.Flow('horizontal'));
legend.add(erosion_panel);
//
var thumbnail_sed = ui.Thumbnail({
  image: ee.Image(1).visualize({min: 1, max: 1, palette: ['red']}),
  params: {bbox:'0,0,10,100', dimensions:'16x16'},
  style: {padding: '0px', margin: '1px 3px 1px 0px'}
});
//thumbnail_sed.setImage(ee.Image(1).visualize({min: 1, max: 1, palette: ["red"]}));
var sed_panel=ui.Panel([ui.Label('Deposition Area', { fontSize: '14px', margin: '1px 10px 1px 1px'})
  ,thumbnail_sed], ui.Panel.Layout.Flow('horizontal'));
legend.add(sed_panel);
///function to convert stack of annual edge anomalies to sedzone image
function stacktoimage(aoi,img){
  aoi=ee.Geometry(aoi);
  var bands=ee.Image(img).bandNames();
  var annual_deltah=//ee.List.sequence(0,bands.length().subtract(1))
    bands.map(function(str){
    var x=ee.Number.parse(ee.String(str).slice(1));
    return ee.Image(img).select(ee.String('t').cat(x.int())).rename('sed_diff')
    .addBands(ee.Image(x).clip(aoi).rename('t').float())
    .set('system:time_start',ee.Date.fromYMD(x.add(2000), 1, 1));
  });
  var correlation = ee.ImageCollection(annual_deltah).select('t', 'sed_diff').reduce(ee.Reducer.pearsonsCorrelation());
  var reducerSensSlope=ee.Reducer.sensSlope();
  var im_reduced_sens=ee.ImageCollection(annual_deltah).select('t', 'sed_diff').reduce(reducerSensSlope)//8
    .addBands(ee.ImageCollection(annual_deltah).select('sed_diff').count().rename('count'))
    .addBands(correlation.select('p-value'))
        .clip(aoi);
  var slope=im_reduced_sens.select('slope');
  var count=im_reduced_sens.select('count');
  var sed_zone_collection=ee.ImageCollection(ee.Image(img).bandNames().map(function(b){
    var nr=ee.Number.parse(ee.String(b).slice(1));
    return ee.Image(img).select(ee.String(b)).rename('b1').set('t',nr);
  }));
  //number of values from 2000 to 2010
  var count2=sed_zone_collection.filter(ee.Filter.lte('t', 10)).count().rename('count');
  //how about 2011-2020? find those pixels with relevant slope that were not representing water edge before 2011!!
  var count3=sed_zone_collection.filter(ee.Filter.gt('t', 10)).count().rename('count');
  count3=count3.where(count2.gte(2),0);
  slope=slope.updateMask(count.gte(5)).updateMask(count2.gt(1));
  var slope11to20=im_reduced_sens.select('slope').updateMask(count3.gte(5));
  var sedzones=slope//.where(sedpos.gte(-0.2),0).where(sedneg.lte(0.2),0);
      .where(im_reduced_sens.select('p-value').gt(0.05),0)
      .where(slope.abs().lte(0.01),0);  
  var sedzones11to20=slope11to20//.where(sedpos.gte(-0.2),0).where(sedneg.lte(0.2),0);
      .where(im_reduced_sens.select('p-value').gt(0.05),0)
      .where(slope11to20.abs().lte(0.01),0);  
  var mean_movement=ee.Number(sedzones11to20.blend(sedzones).clip(aoi).rename('slope')
    .reduceRegion({'reducer':ee.Reducer.mean(),'scale':10}).get('slope')).multiply(1000).round();      
  //print('mean_movement',mean_movement);
  sedzones= sedzones.updateMask(sedzones.neq(0));   
  sedzones11to20= sedzones11to20.updateMask(sedzones11to20.neq(0));  
  var sedfrac=slope.where(slope.gt(-100),0).where(sedzones.abs().gt(0.01),1).rename('b1');
  var sedfrac11to20=slope11to20.where(slope11to20.gt(-100),0).where(sedzones11to20.abs().gt(0.01),1)
      .rename('b1');
  sedfrac=sedfrac11to20.blend(sedfrac).clip(aoi).rename('b1');
  sedfrac= ee.Number(sedfrac.reduceRegion({'reducer':ee.Reducer.mean(),'scale':10}).get('b1'));
  sedfrac=ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(sedfrac,null),0,sedfrac.multiply(1000).round().divide(10)));  
  //print('sedfrac',sedfrac);
  var sedfrac2=slope.where(slope.gt(-100),0).where(sedzones.abs().gt(0.05),1).rename('b1').clip(aoi);
  var sedfrac2_11to20=slope.where(slope11to20.gt(-100),0).where(sedzones11to20.abs().gt(0.05),1)
    .rename('b1');
  sedfrac2=sedfrac2_11to20.blend(sedfrac2).clip(aoi).rename('b1');
  sedfrac2= ee.Number(sedfrac2.reduceRegion({'reducer':ee.Reducer.mean(),'scale':10}).get('b1'));
  sedfrac2=ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(sedfrac2,null),0,sedfrac2.multiply(1000).round().divide(10)));  
  //print('sedfrac2',sedfrac2);
  var sedzones_tmp=slope.where(im_reduced_sens.select('p-value').gt(0.05),0);
  var sedzones_tmp11to20=slope11to20.where(im_reduced_sens.select('p-value').gt(0.05),0);//.updateMask(sedzones_tmp.neq(0)) ;   
  sedzones_tmp=sedzones_tmp11to20.blend(sedzones_tmp);
  var sedzone_filled=sedzones_tmp;//.focal_mean({radius: 1, kernelType :'circle',units: 'pixels',iterations: 1}).blend(sedzones_tmp);
  sedzone_filled=sedzone_filled.where(sedzone_filled.abs().lte(0.01),0).rename('sedzone_filled');//.updateMask(sedzone_filled.abs().gt(0.01))
  //.reproject({crs: sedzone_filled.projection().crs(), scale:10});
  var slope_final=im_reduced_sens.select('slope').updateMask(count.gte(6))
    .focal_mean({radius: 2, kernelType :'circle',units: 'pixels',iterations: 1})
    .blend(im_reduced_sens.select('slope').updateMask(count.gte(6))
    .focal_mean({radius: 1, kernelType :'circle',units: 'pixels',iterations: 1}).updateMask(count.gte(6)))
    .reproject({crs: count.projection().crs(), scale:10});
  //var ndvi_wetseason=ee.Image(1).where(merged_landsat.mean().select('NDVI').gte(0.5),0);//.reproject({crs: count.projection().crs(), scale:10})
  slope_final=slope_final
    //.updateMask(ndvi_wetseason.focal_min({radius: 10,kernelType:'square', units: 'meters'}))
    .updateMask(count.gte(1))
    .reproject({crs: count.projection().crs(), scale:10});
  var mean_movement21=ee.Number(slope_final
    .reduceRegion(ee.Reducer.mean(),aoi).get('slope')).multiply(1000).round();
  var erosion_area=ee.Number(slope_final.updateMask(slope_final.gte(0.01))
    .reduceRegion(ee.Reducer.count(),aoi).get('slope'))
    .divide(ee.Number(slope_final.reduceRegion(ee.Reducer.count(),aoi).get('slope')))
    .multiply(100);
  var deposition_area=ee.Number(slope_final.updateMask(slope_final.lte(-0.01))
    .reduceRegion(ee.Reducer.count(),aoi).get('slope'))
    .divide(ee.Number(slope_final.reduceRegion(ee.Reducer.count(),aoi).get('slope')))
    .multiply(100);
  var neutral_area=ee.Number(slope_final.updateMask(slope_final.abs().lt(0.01))
    .reduceRegion(ee.Reducer.count(),aoi).get('slope')) 
    .divide(ee.Number(slope_final.reduceRegion(ee.Reducer.count(),aoi).get('slope')))
    .multiply(100); 
  return im_reduced_sens.addBands(sedzone_filled).clip(aoi)
    .set('sedfrac',sedfrac)
    .set('sedfrac_1m',sedfrac2)
    .set('mean_movement',mean_movement)
    .set('mean_movement21',mean_movement21)
    .set('erosion_area',erosion_area.multiply(100).round().divide(100))
    .set('deposition_area',deposition_area.multiply(100).round().divide(100))
    .set('neutral_area',neutral_area.multiply(100).round().divide(100));
}
var slider1 = ui.Slider({direction: 'horizontal',style: {width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 0px 1px 1px'}}).setValue(1);
//var slider = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(1);
slider1.onSlide(function(value) {
  satelliteMap.layers().get(8).setShown(true);
  satelliteMap.layers().get(8).setOpacity(value);
});
var slider2 = ui.Slider({direction: 'horizontal',style: {width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 0px 1px 1px'}}).setValue(1);
//var slider2 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(1);
slider2.onSlide(function(value) {
  satelliteMap.layers().get(7).setShown(true);
  satelliteMap.layers().get(7).setOpacity(value);
});
var slider3 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(1);
slider3.onSlide(function(value) {
  satelliteMap.layers().get(6).setShown(true);
  satelliteMap.layers().get(6).setOpacity(value);
});
var slider4 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(1);
slider4.onSlide(function(value) {
  satelliteMap.layers().get(4).setShown(true);
  satelliteMap.layers().get(4).setOpacity(value);
});
var slider5 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider5.onSlide(function(value) {
  satelliteMap.layers().get(3).setShown(true);
  satelliteMap.layers().get(3).setOpacity(value);
});
var slider6 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider6.onSlide(function(value) {
  satelliteMap.layers().get(2).setShown(true);
  satelliteMap.layers().get(2).setOpacity(value);
});
var slider7 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider7.onSlide(function(value) {
  //satelliteMap.remove(legend);
  //satelliteMap.add(legend);
  satelliteMap.layers().get(1).setShown(true);
  satelliteMap.layers().get(1).setOpacity(value);
});
var slider8 = ui.Slider({style: {stretch: 'both',width:'80px',fontWeight: '450', fontSize: '12px', margin: '1px 1px 1px 1px'}}).setValue(0);
slider8.onSlide(function(value) {
  satelliteMap.layers().get(0).setShown(true);
  satelliteMap.layers().get(0).setOpacity(value);
});
var sliderPanel = ui.Panel({style :{position : "top-left",maxWidth: "200px"}});//
var sliderPanel_base = ui.Panel({style :{}});//
var sliderPanel_scenes = ui.Panel({style :{}});//
sliderPanel_base.widgets().set(0,ui.Label('Frequency Landsat', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
sliderPanel_base.widgets().set(1,slider5);
sliderPanel_base.widgets().set(2,ui.Label('Frequency S2', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
sliderPanel_base.widgets().set(3,slider6);
sliderPanel_base.widgets().set(4,ui.Label('Deposition/Erosion', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));//Frequency GSW
sliderPanel_base.widgets().set(5,slider7);
sliderPanel_base.widgets().set(6,ui.Label('Bathymetry', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));//Frequency GSW
sliderPanel_base.widgets().set(7,slider8);
sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
sliderPanel.widgets().set(1,sliderPanel_base);
var thumbnail_s2 = ui.Thumbnail({
  image: ee.Image(1).visualize({min: 1, max: 1, palette: ['#008000']}),
  params: {bbox:'0,0,10,100', dimensions:'16x16'},
  style: {padding: '0px', margin: '1px 1px 1px 0px'}
});
var thumbnail_l8 = ui.Thumbnail({
  image: ee.Image(1).visualize({min: 1, max: 1, palette: ['00FF00']}),
  params: {bbox:'0,0,10,100', dimensions:'16x16'},
  style: {padding: '0px', margin: '1px 1px 1px 0px'}
});
var slider1_panel=ui.Panel([slider1,thumbnail_s2], ui.Panel.Layout.Flow('horizontal'));
var slider2_panel=ui.Panel([slider2,thumbnail_l8], ui.Panel.Layout.Flow('horizontal'));
var comps= ui.Panel();
var header = ui.Label({value: 'Select a Country and a Lake', style : {color:'black', fontWeight: '600', fontSize: '12px',margin: '1px 1px 1px 7px'}});
var header_first = ui.Label({value: 'Select a Country', style : {color:'black', fontWeight: '600', fontSize: '12px',margin: '1px 1px 1px 7px'}});
var year_label = ui.Label({value: 'Select a Year', style : {color:'black', fontWeight: '600', fontSize: '12px',margin: '1px 1px 1px 7px'}});
var thisyear=new Date().getFullYear();
var year_list=ee.List.sequence(1999,ee.Number(thisyear)).map(function(nb){
        return {label: ee.String(ee.Number(nb).int()), value: nb};
  });
///TRENDLINE SCATTERPLOTS  
var options_trend={
    hAxis: {titleTextStyle:{fontSize: 10},viewWindowMode: 'maximized',textStyle:{fontSize: 10},gridlines: { count: 12 }},
    trendlines: {
        0: {color: '00FF00',labelInLegend: 'Trendline',
                      showR2: true,
                      lineWidth: 4,
                      opacity: 0.2,
                      visibleInLegend: true}
      },
    lineWidth: 1,
    pointSize: 2,
    legend: {position:"top",textStyle:{fontSize: 10}},
    fontSize: 22,
    series: {0: {color: '00FF00',pointShape: 'diamond',labelInLegend: 'Landsat 7/8'}}, 
    vAxes: {0: {title: 'Anomaly [m]',titleTextStyle:{fontSize: 12},textStyle:{fontSize: 10}}},
    vAxis: {gridlines: { count: 0 }}
  };  
  //WEEKLY AVERAGES
var getweeklyLevels=function(daily_levels){  
    var annual_levels=ee.List.sequence(2015, 2020).map(function(year) {
      var weekly_levels0=ee.List.sequence(1,53).map(function(weeks) {
        var date0=ee.Date.fromYMD(ee.Number(year),1,1);
        var collection_Levels=daily_levels.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
              .filterDate(date0.advance(ee.Number(weeks).subtract(1),'week'), date0.advance(ee.Number(weeks),'week'))      ;
        var col_mean= ee.Feature(null,{'hweekly':collection_Levels.reduceColumns(ee.Reducer.mean(),['dem_elev']).get('mean'),'system:time_start': date0.advance(ee.Number(weeks).subtract(1),'week')});    
        var col_empty=ee.Feature(null).set('hweekly',-99).set('system:time_start',date0.advance(ee.Number(weeks).subtract(1),'week'));    
        return ee.Feature(ee.Algorithms.If(collection_Levels.size().eq(0),col_empty,col_mean));
      });
      return weekly_levels0;
    });
    return annual_levels.flatten();
};  
  //MONTHLY LONG-TERM AVERAGE AREAS
var getmonthlyAreas=function(daily_areas){  
    var annual_areas=ee.List.sequence(1999, 2020).map(function(year) {
      var monthly_areas0=ee.List.sequence(1,12).map(function(month) { //4,10
        var collection_Areas=daily_areas.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
        .filter(ee.Filter.calendarRange(ee.Number(month),ee.Number(month), 'month'));
        var col_mean= ee.Feature(null,{'amonthly':collection_Areas.reduceColumns(ee.Reducer.median(),['area_Landsat']).get('median'),'system:time_start': ee.Date.fromYMD(ee.Number(year), ee.Number(month), 15),'month':ee.Number(month)});    
        var col_empty=ee.Feature(null).set('system:time_start',ee.Date.fromYMD(ee.Number(year), ee.Number(month), 1)).set('month',ee.Number(month));    
        return ee.Feature(ee.Algorithms.If(collection_Areas.size().eq(0),col_empty,col_mean));
      });
      return monthly_areas0;
    });
    var monthly_area=ee.List.sequence(1,12).map(function(month) {
      var col=ee.FeatureCollection(annual_areas.flatten()).filter(ee.Filter.eq('month',ee.Number(month)));
      var col_median= ee.Feature(null,{'amonthly':col.reduceColumns(ee.Reducer.mean(),['amonthly']).get('mean'),'system:time_start': ee.Date.fromYMD(ee.Number(year), ee.Number(month), 15),'month':ee.Number(month)});    
      return col_median;
    });
    return monthly_area;
};
  //MONTHLY LONG-TERM AVERAGE LEVELS
var getmonthlyLevels=function(daily_levels){  
    var annual_levels=ee.List.sequence(1999, 2020).map(function(year) {
      var monthly_levels0=ee.List.sequence(1,12).map(function(month) { //4,10
        var collection_Levels=daily_levels.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
        .filter(ee.Filter.calendarRange(ee.Number(month),ee.Number(month), 'month'));
        var level=ee.Number(collection_Levels.reduceColumns(ee.Reducer.median(),['dem_elev_Landsat']).get('median'));
        level=ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(level,null),-99,level));
        var outofbounds=ee.Number(ee.Algorithms.If(level.lt(ee.Number(dem_thislake.get('min_elev_perc_fit'))),1,0));            
        var col_mean= ee.Feature(null,{'hmonthly':level,'system:time_start': ee.Date.fromYMD(ee.Number(year), ee.Number(month), 15)
          ,'month':ee.Number(month),'year':ee.Number(year),'outofbounds':outofbounds});    
        var col_empty=ee.Feature(null).set('system:time_start',ee.Date.fromYMD(ee.Number(year), ee.Number(month), 1)).set('month',ee.Number(month)).set('year',ee.Number(year));    
        return ee.Feature(ee.Algorithms.If(collection_Levels.size().eq(0),col_empty,col_mean));
      });
      return monthly_levels0;
    });
    var monthly_level=ee.List.sequence(1,12).map(function(month) {
      var col=ee.FeatureCollection(annual_levels.flatten()).filter(ee.Filter.eq('month',ee.Number(month)));
      var outofbounds_sum=ee.Number(col.aggregate_array('outofbounds').reduce(ee.Reducer.sum()));
      var col_median= ee.Feature(null,{'hmonthly':col.reduceColumns(ee.Reducer.mean(),['hmonthly']).get('mean'),'outofbounds_sum':outofbounds_sum,
        'system:time_start': ee.Date.fromYMD(ee.Number(year), ee.Number(month), 15),'month':ee.Number(month)});    
      return col_median;
    });
    return monthly_level;
};  
//MONTHLY MEDIAN ANOMALIESs
var getmonthlyAnomalies=function(daily_levels){  
    var annual_levels=ee.List.sequence(1999, 2020).map(function(year) {
      var monthly_levels0=ee.List.sequence(1,12).map(function(months) {
        var date0=ee.Date.fromYMD(ee.Number(year),1,1);
        var collection_Levels=daily_levels.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
              .filterDate(date0.advance(ee.Number(months).subtract(1),'month'), date0.advance(ee.Number(months),'month'));
        var level=ee.Number(collection_Levels.reduceColumns(ee.Reducer.median(),['dem_elev']).get('median'));
        level=ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(level,null),-99,level));
        /*var outofbounds=ee.Number(ee.Algorithms.If(level.gt(ee.Number(dem_thislake.get('max_elev_perc_fit'))),1,
          ee.Number(ee.Algorithms.If(level.lt(ee.Number(dem_thislake.get('min_elev_perc_fit'))),1,0))));*/
        var outofbounds=ee.Number(ee.Algorithms.If(level.lt(ee.Number(dem_thislake.get('min_elev_perc_fit'))),1,0));
        var outofbounds_sum=ee.Number(long_term_average.filter(ee.Filter.eq('month',ee.Number(months))).first().get('outofbounds_sum'));
        //outofbounds=ee.Number(ee.Algorithms.If(outofbounds.gt(0),1,0));
        var col_mean= ee.Feature(null,{'year':year,'month':months,
        'hmonthly':level.subtract(ee.Number(long_term_average.filter(ee.Filter.eq('month',ee.Number(months))).first().get('hmonthly'))),
        'system:time_start': date0.advance(ee.Number(months).subtract(1),'month')})
        .set('outofbounds_sum',outofbounds_sum)
        .set('outofbounds',outofbounds);    
        var col_empty=ee.Feature(null).set('year',year).set('hmonthly',-99).set('month',months)
          .set('system:time_start',date0.advance(ee.Number(months).subtract(1),'month'));    
        return ee.Feature(ee.Algorithms.If(collection_Levels.size().eq(0),col_empty,col_mean));
      });
      return monthly_levels0;
    });
    return annual_levels.flatten();
};    
//Oct to May, excluding months which are out of bounds
var getannualLevels=function(monthly_levels){  
    //the hydrological year starts in October
    var annual_levels=ee.List.sequence(2000, 2020).map(function(year) {
        var date0=ee.Date.fromYMD(ee.Number(year),1,1);
        var collection_Levels1=monthly_levels.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
          .filter(ee.Filter.lte('month', 5))
          .filter(ee.Filter.gt('hmonthly', -99));
        var collection_Levels2=monthly_levels.filter(ee.Filter.calendarRange(ee.Number(year).subtract(1),ee.Number(year).subtract(1), 'year'))
          .filter(ee.Filter.gte('month', 10))
          .filter(ee.Filter.gt('hmonthly', -99));
        var collection_Levels=ee.FeatureCollection([collection_Levels1,collection_Levels2]).flatten()
          .filter(ee.Filter.lte('outofbounds_sum', 1));//or maybe also allow 1 or 2 but skip the concerning years
        var outofbounds=collection_Levels.filter(ee.Filter.eq('outofbounds', 1)).size();
        collection_Levels=ee.FeatureCollection(ee.Algorithms.If(outofbounds.gt(0),ee.FeatureCollection([]),collection_Levels));
        var col_mean= ee.Feature(null,{'year':year,'hannual':collection_Levels.reduceColumns(ee.Reducer.mean(),['hmonthly']).get('mean'),'system:time_start': date0});    
        var col_empty=ee.Feature(null).set('year',year).set('hannual',-99).set('year',year).set('system:time_start',date0);    
        return ee.Feature(ee.Algorithms.If(collection_Levels.size().eq(0),col_empty,col_mean));
      });
    return annual_levels.flatten();
};  
//Oct to May, not excluding months which are out of bounds
var getannualLevels1=function(monthly_levels){  
    var annual_levels=ee.List.sequence(2000, 2020).map(function(year) {
        var date0=ee.Date.fromYMD(ee.Number(year),1,1);
        var collection_Levels1=monthly_levels.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
          .filter(ee.Filter.lte('month', 5))
          .filter(ee.Filter.gt('hmonthly', -99));
        var collection_Levels2=monthly_levels.filter(ee.Filter.calendarRange(ee.Number(year).subtract(1),ee.Number(year).subtract(1), 'year'))
          .filter(ee.Filter.gte('month', 10))
          .filter(ee.Filter.gt('hmonthly', -99));
        var collection_Levels=ee.FeatureCollection([collection_Levels1,collection_Levels2]).flatten();
        var col_mean= ee.Feature(null,{'year':year,'hannual':collection_Levels.reduceColumns(ee.Reducer.mean(),['hmonthly']).get('mean'),'system:time_start': date0});    
        var col_empty=ee.Feature(null).set('year',year).set('hannual',-99).set('year',year).set('system:time_start',date0);    
        return ee.Feature(ee.Algorithms.If(collection_Levels.size().eq(0),col_empty,col_mean));
      });
    return annual_levels.flatten();
};  
//Per Trimester
var getSeasonalLevels=function(monthly_levels,x){  
    var annual_levels=ee.List.sequence(1999, 2020).map(function(year) {
        var month_start=(ee.Number(x).subtract(1)).multiply(3).add(1);
        var month_end=(ee.Number(x).subtract(1)).multiply(3).add(3);
        var date0=ee.Date.fromYMD(ee.Number(year),1,1);
        var collection_Levels1=monthly_levels.filter(ee.Filter.calendarRange(ee.Number(year),ee.Number(year), 'year'))
          .filter(ee.Filter.rangeContains('month',month_start,month_end))
          .filter(ee.Filter.gt('hmonthly', -99));
        var collection_Levels=collection_Levels1;
        var col_mean= ee.Feature(null,{'year':year,'hannual':collection_Levels.reduceColumns(ee.Reducer.mean(),['hmonthly']).get('mean'),'system:time_start': date0});    
        var col_empty=ee.Feature(null).set('year',year).set('hannual',-99).set('year',year).set('system:time_start',date0);    
        return ee.Feature(ee.Algorithms.If(collection_Levels.size().eq(0),col_empty,col_mean));
      });
    return annual_levels.flatten();
};
var sensslope; var pvalue; var annual_average_L8;
var sensslope_ideal; var pvalue_ideal; var annual_average_L8_ideal;
var monthly_anomalies_L8; var season=0;
function print_and_plot_trend(input_ts,x,plot,aoi){
  var monthly_anomalies_L8=ee.FeatureCollection(input_ts);
  var reducerSensSlope=ee.Reducer.sensSlope();
  if (x===0){
    annual_average_L8=ee.FeatureCollection(getannualLevels1(monthly_anomalies_L8))
      .filter(ee.Filter.gt('hannual', -99));
    //if the anomalies cannot be calculated because the levels are out of bounds
    /*annual_average_L8=ee.FeatureCollection(ee.Algorithms.If(annual_average_L8.size().gt(0),annual_average_L8,
      ee.FeatureCollection(getannualLevels1(monthly_anomalies_L8))));*/
    annual_average_L8_ideal=ee.FeatureCollection(getannualLevels(monthly_anomalies_L8));
    sensslope_ideal = annual_average_L8_ideal.reduceColumns(reducerSensSlope, ['year','hannual']).get('slope');
    //pvalue_ideal = annual_average_L8_ideal.reduceColumns(ee.Reducer.pearsonsCorrelation(), ['year','hannual']).get('p-value');
    var coll_ideal=ee.ImageCollection(annual_average_L8_ideal.map(function(feat){
      return ee.Image(ee.Number(ee.Feature(feat).get('hannual')).multiply(100000)).round().add(ee.Image.random(ee.Number(ee.Feature(feat).get('year'))).multiply(ee.Image(100)).round()).clip(aoi)
      .set('system:time_start',ee.Date(ee.Feature(feat).get('system:time_start')).millis());
    }));
    pvalue_ideal =ee.Number(ee.Image(morefunctions.kendallpvalue(coll_ideal)).reduceRegion(ee.Reducer.mean(),aoi,100).get('constant'));
    pvalue_ideal = ee.Number(ee.Algorithms.If(ee.Number(sensslope_ideal).eq(0),0.5,pvalue_ideal));
  } else {
    annual_average_L8=ee.FeatureCollection(getSeasonalLevels(monthly_anomalies_L8,x))
      .filter(ee.Filter.gt('hannual', -99));
  }
  var coll=ee.ImageCollection(annual_average_L8.map(function(feat){
    //Mann-Kendall algorithm has problems with ties. Therefore add a random number with the year as a seed.
    return ee.Image(ee.Number(ee.Feature(feat).get('hannual')).multiply(100000)).round().add(ee.Image.random(ee.Number(ee.Feature(feat).get('year'))).multiply(ee.Image(100)).round()).clip(aoi)
    .set('system:time_start',ee.Date(ee.Feature(feat).get('system:time_start')).millis());
  }));
  sensslope = annual_average_L8.reduceColumns(reducerSensSlope, ['year','hannual']).get('slope');
  //pvalue = annual_average_L8.reduceColumns(ee.Reducer.pearsonsCorrelation(), ['year','hannual']).get('p-value');
  pvalue = ee.Number(ee.Image(morefunctions.kendallpvalue(coll)).reduceRegion(ee.Reducer.mean(),aoi,100).get('constant'));
  if (plot){
    print('annual_average_L8_ideal',annual_average_L8_ideal);
    print('annual_average_L8',annual_average_L8.aggregate_array('hannual'));  
    print('Levels Trimester',x,'Sensslope:',sensslope,'pvalue',pvalue);
    var plot_trend_l8 = ui.Chart.feature.byFeature(annual_average_L8, 'year',['hannual'])//
      .setChartType('ScatterChart')
      .setOptions(options_trend);
    //print(plot_trend_l8);      
    panel_trend.widgets().set(2,plot_trend_l8); 
  }
}
var feat_centroids;
var plot_centroids=function(x){
  //feat_centroids=ee.FeatureCollection(feat_centroids);
  var pvalue_select='pvalue' + x;
  var trend_select='trend' + x;
  var feat_centroids_neg=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.01),ee.Filter.lt(trend_select, 0),ee.Filter.gte(trend_select, -0.05)));
  var feat_centroids_pos=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.01),ee.Filter.gt(trend_select, 0),ee.Filter.lte(trend_select, 0.05)));
  var feat_centroids_neg0=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.1),ee.Filter.gt(pvalue_select, 0.01),ee.Filter.lt(trend_select, 0),ee.Filter.gte(trend_select, -0.05)));
  var feat_centroids_pos0=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.1),ee.Filter.gt(pvalue_select, 0.01),ee.Filter.gt(trend_select, 0),ee.Filter.lte(trend_select, 0.05)));
  var feat_centroids_neg_1=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.01),ee.Filter.lt(trend_select, -0.05)));
  var feat_centroids_pos_1=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.01),ee.Filter.gt(trend_select, 0.05)));
  var feat_centroids_neg0_1=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.1),ee.Filter.gt(pvalue_select, 0.01),ee.Filter.lt(trend_select, -0.05)));
  var feat_centroids_pos0_1=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.1),ee.Filter.gt(pvalue_select, 0.01),ee.Filter.gt(trend_select, 0.05)));
  /*var feat_centroids_neg_2=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.01),ee.Filter.lt(trend_select, 0)));
  var feat_centroids_pos_2=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.01),ee.Filter.gt(trend_select, 0)));
  var feat_centroids_neg0_2=feat_centroids.filter(ee.Filter.and(ee.Filter.lt(pvalue_select, 0.2),ee.Filter.gt(pvalue_select, 0.01),ee.Filter.lt(trend_select, 0)));
  var feat_centroids_pos0_2=feat_centroids.filter(ee.Filter.and(ee.Filter.lt(pvalue_select, 0.2),ee.Filter.gt(pvalue_select, 0.01),ee.Filter.gt(trend_select, 0)));
*/
  var feat_centroids_neutral=feat_centroids.filter(ee.Filter.gt(pvalue_select, 0.1));
  print('highly significant drying', ee.Number(feat_centroids_neg_1.size()).add(ee.Number(feat_centroids_neg.size())))
  print('highly significant wetting', ee.Number(feat_centroids_pos_1.size()).add(ee.Number(feat_centroids_pos.size())))
  print('feat_centroids_pos',feat_centroids_pos.sort('trend3').aggregate_array('ID'))
  print('feat_centroids_pos_1',feat_centroids_pos_1.sort('trend3').aggregate_array('ID'))
  //print('feat_centroids_pos',feat_centroids_pos1.sort('trend0'))
  var centroids_neutral=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neutral.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neutral.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_pos=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_pos0=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos0.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos0.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg0=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg0.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg0.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_pos_1=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos_1.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos_1.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg_1=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg_1.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg_1.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_pos0_1=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos0_1.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos0_1.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg0_1=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg0_1.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg0_1.toList(999).get(ee.Number(x))).geometry()}));
 /* var centroids_pos_2=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos_2.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos_2.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg_2=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg_2.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg_2.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_pos0_2=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos0_2.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos0_2.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg0_2=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg0_2.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg0_2.toList(999).get(ee.Number(x))).geometry()}));
*/
  satelliteMap.layers().set(8, ui.Map.Layer(centroids_neg,{color: 'red',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Negative1").setShown(true));
  satelliteMap.layers().set(7, ui.Map.Layer(centroids_neg0,{color: '#ffa5a5',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Negative0").setShown(true));
  satelliteMap.layers().set(6, ui.Map.Layer(centroids_pos,{color: 'blue',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Positive1").setShown(true));
  satelliteMap.layers().set(5, ui.Map.Layer(centroids_pos0,{color: 'cyan',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Positive0").setShown(true));
  satelliteMap.layers().set(4, ui.Map.Layer(centroids_neutral,{color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Neutral").setShown(true));
  satelliteMap.layers().set(3, ui.Map.Layer(ee.FeatureCollection(centroids_neg_1).style({color: 'red',pointSize:10}),{}, "Negative1").setShown(true));
  satelliteMap.layers().set(1, ui.Map.Layer(ee.FeatureCollection(centroids_neg0_1).style({color: '#ffa5a5',pointSize:10}),{}, "Negative0").setShown(true));
  satelliteMap.layers().set(2, ui.Map.Layer(ee.FeatureCollection(centroids_pos_1).style({color: 'blue',pointSize:10}),{}, "Positive1").setShown(true));
  satelliteMap.layers().set(0, ui.Map.Layer(ee.FeatureCollection(centroids_pos0_1).style({color: 'cyan',pointSize:10}),{}, "Positive0").setShown(true));
};
var plot_centroids0=function(x){
  //feat_centroids=ee.FeatureCollection(feat_centroids);
  var pvalue_select='pvalue' + x;
  var trend_select='trend' + x;
  var feat_centroids_neg=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.1),ee.Filter.lt(trend_select, 0)));
  var feat_centroids_pos=feat_centroids.filter(ee.Filter.and(ee.Filter.lte(pvalue_select, 0.1),ee.Filter.gt(trend_select, 0)));
  var feat_centroids_neutral=feat_centroids.filter(ee.Filter.gt(pvalue_select, 0.1));
  print('feat_centroids_neutral',feat_centroids_neutral)
  var centroids_neutral=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neutral.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neutral.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_pos=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos.toList(999).get(ee.Number(x))).geometry()}));
  var centroids_neg=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg.toList(999).get(ee.Number(x))).geometry()}));
  satelliteMap.layers().set(4, ui.Map.Layer(centroids_neg,{color: 'red',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Negative1").setShown(true));
  satelliteMap.layers().set(2, ui.Map.Layer(centroids_pos,{color: 'blue',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Positive1").setShown(true));
  satelliteMap.layers().set(0, ui.Map.Layer(centroids_neutral,{color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Neutral Centroids").setShown(true));
};
var season_labels=['Dry Season (Oct-May)','January-March','April-June','July-September','October-December'];
var season_overall;
var select_season = ui.Panel([ui.Select({items: [ 
    {label:  'Dry Season (Oct-May)', value: 0},
    {label:  'Jan-March', value: 1},
    {label:  'Apr-June', value: 2},
    {label:  'July-Sep', value: 3},
    {label:  'Oct-Dec', value: 4}
     ],
  onChange: function(key){
    season_overall=key;
    plot_centroids(key);
  }}).setPlaceholder('Dry Season (Oct-May)'),
  ui.Label('○', {color:'black', fontWeight: '1000',fontSize: '18px', margin: '12px 3px 0px 1px'}),
  ui.Label('Trend ≤ 5 cm/year', {fontSize: '14px', margin: '16px 3px 0px 1px'}),
  ui.Label('○', {color:'black', fontWeight: '600',fontSize: '40px', margin: '0px 3px 0px 1px'}),
  ui.Label('Trend > 5 cm/year', {fontSize: '14px', margin: '16px 1px 0px 1px'})
  ],ui.Panel.Layout.Flow('horizontal'));
var trend_panel = ui.Panel([ui.Label('Water level trend analysis 2000-2020:', {fontSize: '14px', margin: '1px 10px 1px 1px'}),select_season], ui.Panel.Layout.Flow('vertical'));
var trend_neg_panel=ui.Panel([ui.Label('●', {color:'red', fontWeight: '600',fontSize: '18px', margin: '0px 3px 0px 1px'}),
  ui.Label('Decreasing Trend (p-Value<=0.01)', {fontSize: '14px', margin: '4px 3px 0px 1px'}),ui.Label('●', {color:'#ffa5a5', fontWeight: '600',fontSize: '18px', margin: '0px 3px 0px 1px'}),
  ui.Label('Decreasing Trend (0.1>p-Value>0.01) ', {fontSize: '14px', margin: '4px 1px 0px 1px'})
  ], ui.Panel.Layout.Flow('horizontal'));
trend_panel.add(trend_neg_panel);
//
var trend_pos_panel=ui.Panel([ui.Label('●', {color:'blue', fontWeight: '600',fontSize: '18px', margin: '0px 3px 0px 1px'}),
  ui.Label('Increasing Trend (p-Value<=0.01)', { fontSize: '14px', margin: '4px 7px 0px 1px'}),ui.Label('●', {color:'cyan', fontWeight: '600',fontSize: '18px', margin: '0px 3px 0px 1px'}),
  ui.Label('Increasing Trend (0.1>p-Value>0.01) ', {fontSize: '14px', margin: '4px 1px 0px 1px'})
  ], ui.Panel.Layout.Flow('horizontal'));
trend_panel.add(trend_pos_panel);
//
var trend_neutral_panel=ui.Panel([ui.Label('●', {color:'black', fontWeight: '600',fontSize: '18px', margin: '0px 3px 0px 1px'}),
  ui.Label('No significant Trend', { fontSize: '14px', margin: '4px 1px 0px 1px'})
  ], ui.Panel.Layout.Flow('horizontal'));
trend_panel.add(trend_neutral_panel);
path= 'users/hydrosolutions/SedZones/LargeLakesWWF_stack';
    var get_ID_from_asset = function(ic){ 
      var id= ee.String(ic.id.split('SedZone_L8_00to20_')[1]);
      return ee.Image(ic.id).set('ID',id);
    };
var sed_collection_WWF=ee.ImageCollection(ee.data.listAssets(path).assets.map(get_ID_from_asset));
/////////////////////////////////////////////////////////  
var lake_label = ui.Label({style : {color:'black', fontWeight: '200', fontSize: '12px',margin: '7px 1px 1px 1px',maxWidth: '90px'}});
var year=thisyear;//2020;
var select_adm0 = ui.Select({items: country_list}).setPlaceholder('Select a Country ...'); 
comps.add(year_label);
//select_year = ui.Select({items:[{label: '2020', value: 2020}]}).setValue(2020,false); 
select_year = ui.Select({items:[{label: thisyear, value: thisyear}]}).setValue(thisyear,false); 
var country_name='Mali';
//USER INPUT: YEAR FOR STARTING SCREEN (attention, further modifications in code required)
var start_date = ee.Date.fromYMD(thisyear,1,1);
//var start_date_GSW = ee.Date.fromYMD(2018,1,1);
var end_date = ee.Date.fromYMD(thisyear + 1, 1, 1);
//USER INPUT:cloud and nodata thresholds
comps.add(select_year);
comps.add(header);
var comps_first= ui.Panel();
comps_first.add(header_first)
var select_adm0_panel = ui.Panel([select_adm0,lake_label], ui.Panel.Layout.Flow('horizontal'));
comps.add(select_adm0_panel);
var selectPanel = ui.Panel({ widgets : [/*ui.Label({ value : "hydrosolutions.ch", style : { shown:true ,color:'blue', fontWeight: '400', fontSize: '11px',margin: '1px 1px 6px 7px'}, targetUrl : "https://www.hydrosolutions.ch/projects/sahel-water"  } ),*/
  comps],layout: ui.Panel.Layout.flow('vertical'), style :{position : "top-left",maxWidth: "250px"}});
var Logo_HydroSolutions= ee.Image("projects/ee-hsol/assets/logo_hsol_projected").resample('bicubic').resample('bicubic')
var Logo_SAWEL= ee.Image("projects/ee-hsol/assets/SaWeL_logo_projected").resample('bicubic').resample('bicubic');
var logo_hsol=ui.Thumbnail({
  image:Logo_HydroSolutions,//,
  params:{bands:['b1','b2','b3'],
  min:0,max:255},
  style:{width:'90px',height:'auto', margin: 'auto'}});
var logo_sawel=ui.Thumbnail({
  image:Logo_SAWEL,//,
  params:{bands:['b1','b2','b3'],
  min:0,max:255},
  style:{width:'90px',height:'auto', margin: 'auto'}});
var Logos_PANEL=ui.Panel({
    style: {
    width: '110px',
    height: 'auto',
    padding: '10px',
    position: 'bottom-right'
    },
    widgets:[logo_hsol,hydrosolutions,logo_sawel
    ]
  });
//satelliteMap.add(sliderPanel);
year_list.evaluate(function(years) {
      select_year.items().reset(years); 
      //select_year.setPlaceholder('2020');
      //select_year.setPlaceholder(years.reverse()[0]);
  //country_list.evaluate(function(names) {
  //});
});
var start_redraw=0;
function select_another_date(keyD){
  year=keyD;
  satelliteMap.remove(img_select_s2);
  //satelliteMap.remove(legend);
  if (year >= 2015 && start_redraw!==1){
    satelliteMap.add(img_select_s2);
  }
  start_date = ee.Date.fromYMD(keyD,1,1);
  //start_date_GSW = ee.Date.fromYMD(Math.min(2018,keyD),1,1);
  end_date = ee.Date.fromYMD(keyD, 12, 31);
  if (start_redraw!==1){
    newfeature=0;
    iteration_id=iteration_id + 1;
    //slider5.setValue(0,false);
    //slider6.setValue(0,false);
    //slider7.setValue(0,false);
    //slider8.setValue(0,false);
    //get_new_GSW();
    //getmodisdata();
    get_new_s2();
    get_new_l8();
    //panel_outputs.remove(panel_thisyear);
    panel_thisyear.clear();
    get_annual_ts();
    //panel_outputs.add(panel_thisyear);
    sliderPanel.clear();
    sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
    sliderPanel.add(sliderPanel_base);
    start_l8=0;
    start_s2=0;
    for (var i=4; i<9; i++) {
      satelliteMap.layers().get(i).setShown(false);
    }
    satelliteMap.layers().set(9, ui.Map.Layer(dd,null, "area_of_interest"));
    //satelliteMap.layers().set(10, ui.Map.Layer(dl,{color: 'blue'}, "Lakes",false).setOpacity(0.2));  
  }
}
select_year.onChange(select_another_date);
var title = ui.Label({value:'Select an ID in the drop-down menu above or click on a point on the map',style : {color:'red', fontWeight: '400'}});
var title_first = ui.Label({value:'Select a country in the drop-down menu above click on a point on the map',style : {color:'red', fontWeight: '400'}});
var title2 = ui.Label({value:'SELECTION UNSUCCESSFUL, PLEASE ZOOM IN FIRST',style : {color:'red', fontWeight: '800', fontSize: '20px'}});
title2.style().set('position', 'bottom-center');
//var sed_collection;
function redraw(key){
  // get the selected country
  satelliteMap.remove(selectPanel_first);
  satelliteMap.remove(selectPanel);
  satelliteMap.add(selectPanel);
  satelliteMap.remove(Logos_PANEL);
  satelliteMap.add(Logos_PANEL);
  satelliteMap.remove(sliderPanel);
  satelliteMap.add(sliderPanel);
  start_redraw=1;
  season=0;
  panel_outputs.remove(panel_thisyear);
  panel_outputs.remove(panel_trend);
  panel_outputs.remove(panel_sedzone);
  satelliteMap.remove(legend);
  satelliteMap.remove(trend_panel);
  panel_thisyear.clear();
  panel_sedzone.clear();
  panel_trend.clear();
  selectedCountry = ee.Feature(adm_0.filter(ee.Filter.eq('COUNTRY_NA', key)).first());
  country_name = key;
  print('country_name',country_name);
  /*path='users/magosilvain/DEMs_Sahel_2020/' +country_name + '_DEMs_Otsu';
  path=path.replace(' ','');
  Table_assets=ee.ImageCollection(ee.List(ee.data.listAssets(path).assets.map(get_dem_from_asset))
      .cat(
        ee.ImageCollection(ee.data.listAssets('users/magosilvain/DEMs_Sahel_2020/LargeLakesWWF_DEMs_Otsu').assets.map(get_dem_from_asset_10to20))
          .filter(ee.Filter.eq('Tier', 1)).toList(99))
      .cat(Abijiata_DEM))
    .filterBounds(selectedCountry.geometry());
  dem_collection=ee.ImageCollection(Table_assets);
  //dem = ee.ImageCollection(Table_assets).mosaic().rename('b1');
  print('dem_collection',dem_collection);*/
  path='users/magosilvain/Sahel_Timeseries/' + country_name.replace(' ','');
  path=path.replace(' ','');
  //if (ee.data.listAssets(path).assets.length>0){
    var stats_thiscountry=ee.FeatureCollection(country_summaries.filter(ee.Filter.eq('COUNTRY', country_name.replace(' ','') + '_final')).first());
    /*path= 'users/magosilvain/Sahel_Timeseries/country_summaries/country_summary_' + country_name.replace(' ','');
    var stats_thiscountry=ee.FeatureCollection(ee.data.getAsset(path).id).set('COUNTRY',country_name);
    */
    collection_ids=stats_thiscountry.aggregate_array('ID').map(function(x){return ee.Number.parse(ee.String(x).slice(3))});
    Lakes_Sahel = Lakes_Sahel0.filter(ee.Filter.inList("ID", collection_ids))
      .map(function(feat){return ee.Feature(feat).set('Name',ee.String('ID_').cat(ee.Number.parse(feat.get('ID'))))});
    lakes_fc=Lakes_Sahel.filter(ee.Filter.eq('COUNTRY', country_name));
    print('lakes_fc',lakes_fc);
    print('stats_thiscountry',stats_thiscountry.sort('ID'));
    print('stats_thiscountry pdry perfect',stats_thiscountry.sort('ID').aggregate_array('trend_perfect'));
    print('stats_thiscountry pdry',stats_thiscountry.sort('ID').aggregate_array('trend0'));
    print('stats_thiscountry outofbounds',stats_thiscountry.sort('ID').aggregate_array('months_outofbounds'));
    /*Export.table.toDrive({ 
      collection: stats_thiscountry,
      description: 'country_summary_' + country_name.replace(' ','') +'_fromAsset',
      fileFormat: 'CSV',
    });*/
    country_summary=stats_thiscountry
      /*.filter(ee.Filter.lt('bias', 0.3))*/
      .filter(ee.Filter.lt('bias_rel', 10))
      /*.filter(ee.Filter.lt('rmse', 0.6))*/
      .filter(ee.Filter.lt('rmse_rel', 20))
      .filter(ee.Filter.gt('correlation', 0.8))
      .filter(ee.Filter.or(ee.Filter.lt('bias_rel_fitted', 10),ee.Filter.lt('rmse_rel_fitted', 20)));//??
      //.filter(ee.Filter.or(ee.Filter.lt('rmse', 0.5),ee.Filter.lt('bias', 0.25)))//??
    good_ids= country_summary.sort('ID').aggregate_array('ID');
  satelliteMap.remove(img_select_s2);
  satelliteMap.remove(img_select_l8);
  //satelliteMap.centerObject(selectedCountry,7);
    /*select_adm0 = ui.Select({items: [],
        onChange: redraw}).setPlaceholder(key); 
    select_adm0.setDisabled(true);*/
    selectPanel.widgets().set(2,ui.Select({style: {color: 'red',fontWeight: '450',border: '1px solid black',margin: '1px 1px 1px 7px'}}).setPlaceholder('Please Wait...'));
    //satelliteMap.remove(title);
    //FIRST OPTION: CLICK ON LAKE TO SELECT IT
    satelliteMap.style().set('cursor', 'crosshair');
    title.style().set('position', 'bottom-center');
    //satelliteMap.add(title);
    feat_centroids=ee.FeatureCollection(country_summary.map(function(feat){return ee.Feature(feat).centroid()}));
    print('feat_centroids',feat_centroids);
    satelliteMap.add(trend_panel);
    drawingMode=true;
    satelliteMap.unlisten(sedclick);
    satelliteMap.unlisten(pointclick);
    pointclick_incountry=satelliteMap.onClick(function(coords) {
        if(drawingMode ){
          //point = ee.Geometry.Point(coords.lon, coords.lat);
          point = ee.Geometry.Point(coords.lon, coords.lat).buffer(5000,500);
          //get the name of selected lake
          //var lake_name=ee.Feature(Lakes_Sahel.filterBounds(point).first()).get('Name');
          var lake_name=ee.Feature(country_summary.filterBounds(point).first()).get('ID');
          satelliteMap.style().set('cursor', 'hand');
          drawingMode=false;
          ee.Number(Lakes_Sahel.filterBounds(point).size()).evaluate(function(result){
            if (result===0){
              satelliteMap.style().set('cursor', 'crosshair');
              drawingMode=true;
              satelliteMap.add(title2);    
              var task2= ui.util.debounce( function() {
                satelliteMap.remove(title2);
              },5000);
              task2();
            } else {
              //satelliteMap.remove(title);
              satelliteMap.centerObject(point,11);
              print('lake_name',lake_name);
              print('lake_area',ee.Feature(Lakes_Sahel.filterBounds(point).first()).get('area'));
              //if the lake are is smaller than 1 km2 proportionally increase workwiththisscale
              //var Lake_area=ee.Number(ee.Feature(Lakes_Sahel.filterBounds(point).first()).get('area'));
              //workwiththisscale=ee.Number(100).min(ee.Number(40).multiply(Lake_area).add(10).round().max(10));              
              //print('workwiththisscale',workwiththisscale);
              //name_id_client=key2;
              ee.String(lake_name).evaluate(function(xx) {
                redraw2(xx);
              });
              //redraw2(lake_name.getInfo());
            }
          });
        }  
      });
    lake_label.setValue("");
    //lakes_fc=Lakes_Sahel.filter(ee.Filter.eq('COUNTRY', key));
    //dl = ee.Image().paint(ee.FeatureCollection(lakes_fc), 0, 2);
    sliderPanel.clear();
    sliderPanel.add(title);
    start_l8=0;
    start_s2=0;
    //switch off other layers
    for (var i=0; i<=10; i++) {
      satelliteMap.layers().get(i).setShown(false);
    }
    //satelliteMap.layers().set(4, ui.Map.Layer(dl,{color: 'blue'}, "Lakes").setOpacity(0.9));
    //satelliteMap.layers().set(4, ui.Map.Layer(lakes_fc,{color: 'blue'}, "Lakes").setShown(true));
    satelliteMap.centerObject(lakes_fc,7);
    /*country_summary=country_summary.map(function(feat){ //remove those lines once the country summaries are updated with the correct geometries
      var selectedLake = ee.Feature(Lakes_Sahel.filter(ee.Filter.eq('Name', ee.String(ee.Feature(feat).get('ID')))).first()).geometry();
      return ee.Feature(selectedLake).copyProperties(ee.Feature(feat));
    });*/
    /*
    var feat_centroids_neg=feat_centroids.filter(ee.Filter.and(ee.Filter.lte('pvalue0', 0.01),ee.Filter.lt('trend0', 0)));
    var feat_centroids_pos=feat_centroids.filter(ee.Filter.and(ee.Filter.lte('pvalue0', 0.01),ee.Filter.gt('trend0', 0)));
    var feat_centroids_neutral=feat_centroids.filter(ee.Filter.gt('pvalue0', 0.01));
    var centroids_neutral=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neutral.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neutral.toList(999).get(ee.Number(x))).geometry()}));
    var centroids_pos=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_pos.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_pos.toList(999).get(ee.Number(x))).geometry()}));
    var centroids_neg=ee.Geometry.MultiPoint(ee.List.sequence(0,feat_centroids_neg.size().subtract(1)).map(function(x){return ee.Feature(feat_centroids_neg.toList(999).get(ee.Number(x))).geometry()}));
    satelliteMap.layers().set(4, ui.Map.Layer(centroids_neg,{color: 'red',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Negative Centroids").setShown(true));
    satelliteMap.layers().set(3, ui.Map.Layer(centroids_pos,{color: 'blue',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Positive Centroids").setShown(true));
    satelliteMap.layers().set(2, ui.Map.Layer(centroids_neutral,{color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}, "Neutral Centroids").setShown(true));
    */
    plot_centroids(season_overall);
    //SECOND OPTION: SELECT LAKE FROM DROP-DOWN MENU
    select_adm1 = ui.Select({items: [],
        onChange: redraw2}).setPlaceholder('Select Lake ...'); 
    select_adm1.style().set({color: 'red',fontWeight: '450',border: '1px solid black',margin: '1px 1px 1px 7px'}); 
    //GET A LIST OF LAKE NAMES FROM SELECTED COUNTRY
    //var lakes_names=ee.FeatureCollection(lakes_fc).aggregate_array('Name');
    //lakes_list=ee.Dictionary.fromLists(lakes_names.distinct(), lakes_names.distinct()).keys();
    //print('lakes_list',lakes_list);
    /*lakes_list*/good_ids.evaluate(function(names) {
      selectPanel.clear();
      /*selectPanel.widgets().set(0,header);
      selectPanel.widgets().set(1,select_adm0);*/
      //selectPanel.add(ui.Label({ value : "hydrosolutions.ch", style : { shown:true ,color:'blue', fontWeight: '400', fontSize: '11px',margin: '1px 1px 6px 7px'}, targetUrl : "https://www.hydrosolutions.ch/projects/sahel-water"  } ));
      selectPanel.add(comps);
      selectPanel.widgets().set(2,select_adm1);
      // Display the bands of the selected image.
      select_adm1.items().reset(names);
      //select_adm0.setDisabled(false);
      //select_adm0.items().reset(country_list);
      select_adm0.setValue(null, false);
      select_adm0.setPlaceholder(key); 
      //});
    });
}
select_adm0.onChange(redraw);
var button = ui.Button({label : "Resume Selection", style : {color:'black', fontWeight: '600', fontSize: '12px',margin: '1px 1px 1px 7px'}, onClick: function(){ reselect()/*select_adm0.setValue(country_name,true)*/}, disabled: true});
var stats_thislake;
function redraw2(key2){
  satelliteMap.setControlVisibility(true);
  satelliteMap.remove(selectPanel_first);
  satelliteMap.remove(selectPanel);
  satelliteMap.add(selectPanel);
  satelliteMap.remove(Logos_PANEL);
  satelliteMap.add(Logos_PANEL);
  iteration_id=iteration_id + 1;
  drawingMode=false;
  newfeature=1;
  satelliteMap.remove(trend_panel);
  satelliteMap.remove(legend);
  satelliteMap.style().set('cursor', 'hand');
  // get the selected Water Body
  selectedLake = ee.Feature(Lakes_Sahel.filter(ee.Filter.eq('Name', key2)).first()).geometry();
  //print('selectedLake',selectedLake);
  name_id= ee.String(key2);
  name_id_client=key2;
  area_of_interest = selectedLake.simplify(100).buffer(buffer_width);//geometry;
  lake_area=selectedLake.area().divide(1000).divide(1000);
  print('lake_area',lake_area);
  //stats_thislake=country_summary.filter(ee.Filter.eq('ID',key2)).first();
  stats_thislake=feat_centroids.filter(ee.Filter.eq('ID',key2)).first();
  print('stats thislake',stats_thislake);
  //workwiththisscale=ee.Number(50);//ee.Number(100).min(ee.Number(40).multiply(lake_area).add(10).round().max(10));              
  //print('workwiththisscale',workwiththisscale);
  satelliteMap.centerObject(area_of_interest);
  //print('WWF Rivers @ AoI', Rivers.filterBounds(area_of_interest));
  var key_number=parseInt(key2.split('ID_')[1],10);
    if (key_number>100000){
    path= 'users/magosilvain/DEMs_Sahel/Dahiti_DEMs_final4upload_n2';
    dem_thislake= ee.Image(ee.data.getAsset(path + '/DEMfrom_SurfWaterFreq_S2_18to20_' + key2).id).set('ID',key2);
    path='users/hydrosolutions/Sahel_Timeseries/Dahiti_2nd';
    country_TS_Landsat=ee.FeatureCollection(ee.data.getAsset(path + '/Elev_L8_00to20_' + key2).id).set('ID',key2).set('satellite','L8');
    country_TS_Landsat=country_TS_Landsat.filter(ee.Filter.neq('area_Landsat', 0));
    path='users/magosilvain/Sahel_Timeseries/Dahiti';
    country_TS=ee.FeatureCollection(ee.data.getAsset(path + '/Elev_S2_00to20_' + key2).id).set('ID',key2).set('satellite','S2');
    country_TS=country_TS.filter(ee.Filter.neq('area_water', 0));
  } else {
  if (key_number>=50000){
    path= 'users/magosilvain/DEMs_Sahel_2020/LargeLakesWWF_DEMs_Otsu';
    dem_thislake= ee.Image(ee.data.getAsset(path + '/DEMfrom_SurfWaterFreq_L8_10to20_' + key2).id).set('ID',key2);
    path= 'users/magosilvain/Sahel_Timeseries/LargeLakesWWF';
    country_TS=ee.FeatureCollection(ee.data.getAsset(path + '/Elev_S2_00to20_' + key2).id).set('ID',key2).set('satellite','S2');
    country_TS=country_TS.filter(ee.Filter.neq('area_water', 0));
    sedsize=sed_collection_WWF.filter(ee.Filter.eq('ID', key2)).size();
    if (sedsize.getInfo()>0){
      path='users/hydrosolutions/Sahel_Timeseries/LargeLakesWWF_2nd';
      print('sedzones available!');
    } else {
      path='users/magosilvain/Sahel_Timeseries/LargeLakesWWF';
    }
    country_TS_Landsat=ee.FeatureCollection(ee.data.getAsset(path + '/Elev_L8_00to20_' + key2).id).set('ID',key2).set('satellite','L8');
    country_TS_Landsat=country_TS_Landsat.filter(ee.Filter.neq('area_Landsat', 0));
  } else {
    path='users/magosilvain/DEMs_Sahel_2020/' +country_name.replace(' ','') + '_DEMs_Otsu';
    dem_thislake= ee.Image(ee.data.getAsset(path + '/DEMfrom_SurfWaterFreq_S2_18to20_' + key2).id).set('ID',key2);
    path='users/hydrosolutions/Sahel_Timeseries/' + country_name.replace(' ','') + '_2nd';
    country_TS_Landsat=ee.FeatureCollection(ee.data.getAsset(path + '/Elev_L8_00to20_' + key2).id).set('ID',key2).set('satellite','L8');
    path='users/magosilvain/Sahel_Timeseries/' + country_name.replace(' ','');
    country_TS=ee.FeatureCollection(ee.data.getAsset(path + '/Elev_S2_00to20_' + key2).id).set('ID',key2).set('satellite','S2');
  }}
  //dem_thislake=ee.Image(dem_collection.filter(ee.Filter.eq('ID', key2)).first());
  print('dem_thislake',dem_thislake);
  ts_thislake=country_TS_Landsat;//ee.FeatureCollection(country_TS.filter(ee.Filter.eq('ID', key2)).filter(ee.Filter.eq('satellite', 'L8')).first());
  ts_thislake_S2=country_TS;//ee.FeatureCollection(country_TS.filter(ee.Filter.eq('ID', key2)).filter(ee.Filter.eq('satellite', 'S2')).first());
  print('ts_thislake_S2',ts_thislake_S2);
  print('ts_thislake',ts_thislake.sort('system:time_start'));
      /*Export.table.toDrive({ 
      collection: ts_thislake_S2,//country_TS.filter(ee.Filter.eq('satellite', 'S2')).first(),
      description: 'lake_levels_Wegnia_S2',
      fileFormat: 'CSV',
    });*/
    Export.table.toDrive({
      collection: ts_thislake,//country_TS.filter(ee.Filter.eq('satellite', 'L8')).first(),
      description: 'lake_levels_Wegnia_L8',
      fileFormat: 'CSV',
    });
  //var water_area_ts_L8_long=ee.FeatureCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(ts_thislake,null),feat_area_l8.filter(dust_filter),ts_thislake));
  var water_area_ts_L8_long=ts_thislake
      .filter(ee.Filter.gt('otsu_th', -0.3));
  long_term_areas=ee.FeatureCollection(getmonthlyAreas(water_area_ts_L8_long));
  //var water_level_ts_L8_long=ee.FeatureCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(ts_thislake,null),feat_elev_l8.filter(dust_filter),ts_thislake))
  var water_level_ts_L8_long=ts_thislake
      .filter(ee.Filter.gt('otsu_th', -0.3));
    //.filter(ee.Filter.lt('edge_sedfrac', 0.5));
  print('% sedfrac',ee.Number(1).subtract(water_level_ts_L8_long.size().divide(ts_thislake.size())).multiply(100));
  water_level_ts_L8_long=water_level_ts_L8_long
            .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
            .merge(
              water_level_ts_L8_long
              .filter(ee.Filter.neq('otsu_th', 99))
              .filter(ee.Filter.and(ee.Filter.eq('SATELLITE', 'ALOS'),ee.Filter.gt('dem_elev_Landsat', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
              );
  //get the bottom elevation of the lake - use it for the long-term average
  var min_level=ee.Number(water_level_ts_L8_long.aggregate_array('dem_elev_Landsat').reduce(ee.Reducer.min()));
  print('min_level Landsat',min_level);//this is assumed to be the level when the lake is empty
  water_level_ts_L8_long=water_level_ts_L8_long.filter(ee.Filter.neq('area_Landsat', 0))
    .merge(ee.FeatureCollection(ts_thislake.filter(ee.Filter.eq('area_Landsat', 0))
    .map(function(feat){return ee.Feature(feat).set('dem_elev_Landsat',min_level)})))
    .sort('system:time_start');
  print('water_level_ts_L8_long',water_level_ts_L8_long);
  //print('show me this:',ee.FeatureCollection(getmonthlyLevels(water_level_ts_L8_long)));
  long_term_average=ee.FeatureCollection(getmonthlyLevels(water_level_ts_L8_long));
  print('long_term_average',long_term_average);
  elev_range=long_term_areas.map(function(feat){return ee.Feature(null)
    .set('min_bound',ee.Number(dem_thislake.get('min_elev_perc_fit')))
    .set('max_bound',ee.Number(dem_thislake.get('max_elev_perc_fit')))
    .set('month',ee.Feature(feat).get('month'))
    .set('system:time_start',ee.Feature(feat).get('system:time_start'))});
  /*var water_level_ts_S2_long=ts_thislake_S2
    .filter(ee.Filter.gt('otsu_th', -0.3));
    .filter(ee.Filter.neq('otsu_th', 99));*/
  var water_level_ts_S2_long=ts_thislake_S2
            .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
            .merge(
              ts_thislake_S2
              .filter(ee.Filter.neq('otsu_th', 99))
              .filter(ee.Filter.and(ee.Filter.eq('SATELLITE', 'ALOS'),ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
              );
  //get the bottom elevation of the lake - use it for the long-term average
  min_level=ee.Number(water_level_ts_S2_long.aggregate_array('dem_elev').reduce(ee.Reducer.min()));
  print('min_level S2',min_level);//this is assumed to be the level when the lake is empty
  water_level_ts_S2_long=water_level_ts_S2_long.filter(ee.Filter.neq('area_water', 0))
    .merge(water_level_ts_S2_long.filter(ee.Filter.eq('area_water', 0))
    .map(function(img){return ee.Image(img).set('dem_elev',min_level)}));
  //print('water_level_ts_S2_long',water_level_ts_S2_long);
  /*
  var weekly_average_L8=ee.FeatureCollection(getweeklyLevels(water_level_ts_L8_long.map(function(feat){
    return ee.Feature(feat).set('dem_elev',ee.Number(ee.Feature(feat).get('dem_elev_Landsat')));
  })));
  var weekly_average_S2=ee.FeatureCollection(getweeklyLevels(water_level_ts_S2_long));
  //print('weekly_average_L8',weekly_average_L8);
  //print('weekly_average_S2',weekly_average_S2);
  var x=weekly_average_L8.aggregate_array('hweekly');
  var y=weekly_average_S2.aggregate_array('hweekly');
  var xy = x.zip(y);
  //print('xy',xy);
  xy=ee.List(xy.iterate(function(x,input){
    //check if it contains null values
    var ind=ee.Number(ee.List(x).indexOf(-99));
    return ee.List(ee.Algorithms.If(ind.eq(-1),ee.List(input).add(ee.List(x)),ee.List(input)));
  },[]));
  //print('xy',xy);
  //var linearfit = xy.reduce(ee.Reducer.linearFit());
  var correlation = ee.Dictionary(xy.reduce(ee.Reducer.pearsonsCorrelation())).get('correlation');
  //print('linearfit', linearfit);
  print('correlation', correlation);
  x=xy.map(function(list){return ee.Number(ee.List(list).get(0))});
  y=xy.map(function(list){return ee.Number(ee.List(list).get(1))});
  var range=ee.Number(x.reduce(ee.Reducer.max())).max(ee.Number(y.reduce(ee.Reducer.max())))
    .subtract(ee.Number(x.reduce(ee.Reducer.min())).min(ee.Number(y.reduce(ee.Reducer.min()))));
  print('range',range);
  var bias=ee.Number(x.reduce(ee.Reducer.mean()))
    .subtract(ee.Number(y.reduce(ee.Reducer.mean()))).abs();
  print('bias',bias);
   print('bias relative',bias.divide(range).multiply(100));
  var rmse=ee.Number(ee.List(xy.map(function(list){
    return ee.Number(ee.List(list).get(0)).subtract(ee.Number(ee.List(list).get(1))).pow(2);
  })).reduce(ee.Reducer.sum())).divide(ee.Number(xy.length())).sqrt();
  print('rmse',rmse);
   print('rmse relative',rmse.divide(range).multiply(100));
  */
  monthly_anomalies_L8=ee.FeatureCollection(getmonthlyAnomalies(water_level_ts_L8_long.map(function(feat){
    return ee.Feature(feat).set('dem_elev',ee.Number(ee.Feature(feat).get('dem_elev_Landsat')));
  })));
  print('monthly anomalies',monthly_anomalies_L8); 
  //there can be a strange case where the anomaly of one year is higher than of another, although no water is in the lake in both years
  //this happens because in some months the anomaly of no water is higher than in other months. But in reality simply there is not data for every month.
  print('outofbounds_sum',long_term_average.aggregate_array('outofbounds_sum'));
    var outofbounds_list=long_term_average.aggregate_array('outofbounds_sum');
  var dryseason_outofbounds=outofbounds_list.slice(0,5).cat(outofbounds_list.slice(9));
  dryseason_outofbounds=dryseason_outofbounds.removeAll(ee.List([0,1]));
  var months_outofbounds=dryseason_outofbounds.length();
  print('months_outofbounds',months_outofbounds);
  /*
  //GENERATE TRENDLINES FROM MONTHLY ANOMALIES
  print_and_plot_trend(monthly_anomalies_L8,0,true,selectedLake);
  print_and_plot_trend(monthly_anomalies_L8,1,true,selectedLake);
  print_and_plot_trend(monthly_anomalies_L8,2,true,selectedLake);
  print_and_plot_trend(monthly_anomalies_L8,3,true,selectedLake);
  print_and_plot_trend(monthly_anomalies_L8,4,true,selectedLake);
  */
  /*occ_map=ee.Image(occ_maps_assets.filter(ee.Filter.eq('ID', key2)).first());
  print('occ_map',occ_map);*/
  /*max_occ_elev = ee.Number(dem
    .updateMask(dem_thislake.lt(ee.Number(dem_thislake.get('max_elev_perc_fit'))))
    .updateMask(dem_thislake.gt(ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
    .reduceRegion({
      reducer: 'mean',
      geometry: area_of_interest,
      scale: 10,
      tileScale: 4,
      maxPixels: 1e13,
    }).get('b1'));
  print('max_occ_elev',max_occ_elev);
  max_occ_alos = ee.Number(alos.select('AVE_DSM')
  .updateMask(dem_thislake.lt(ee.Number(dem_thislake.get('max_elev_perc_fit'))))
  .updateMask(dem_thislake.gt(ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
  .reduceRegion({
    reducer: 'mean',
    geometry: area_of_interest,
    scale: 10,
    tileScale: 4,
    maxPixels: 1e13,
  }).get('AVE_DSM'));
  delta_alos=max_occ_alos.subtract(max_occ_elev);
  print('delta_alos',delta_alos);*/
  //satelliteMap.layers().set(4, ui.Map.Layer(occ_map, {min:0,max:1,palette:'white,blue'}, 'OccMapAsset',false).setOpacity(1));
  /*lakes_list.evaluate(function(names_l) {
      select_adm1 = ui.Select({items: names_l,
      onChange: redraw2}).setPlaceholder(xx);
  });*/
  //select_adm0.setValue('Somalia',false);
  //print('country_name',country_name)
  //select_adm0.setPlaceholder(country_name);
  select_adm1.setValue(null, false);
  select_adm1.setPlaceholder(key2);
  //select_adm0.items().reset(country_list)
  //button.onClick(select_adm0.setValue(country_name))
  selectPanel.remove(button);
  selectPanel.widgets().set(2,button);
  button.setDisabled(false);
  ee.String(key2).evaluate(function(xx) {
      //select_adm0_panel.remove(lake_label);
      //lake_label = ui.Label({value: xx, style : {color:'black', fontWeight: '200', fontSize: '12px',margin: '1px 1px 1px 7px'}})
      lake_label.setValue("Current Lake ID: " + xx);
      //selectPanel.widgets().set(1,select_adm1);
  });
  dd = ee.Image().paint(area_of_interest, 0, 2);
  //var mind=ee.Number(dem_thislake.get('min_elev_perc_fit'));
  var maxd=ee.Number(dem_thislake.get('max_elev_perc_fit'));
  slider8.setDisabled(true);
  min_level.evaluate(function(minDEM){
    maxd.evaluate(function(maxDEM){
      satelliteMap.layers().set(0, ui.Map.Layer(dem_thislake, {min:minDEM,max:maxDEM,palette:'white,black'},'DEM',false));
      slider8.setDisabled(false);
    });
  });
  img_select_l8.items().reset();
  img_select_s2.items().reset();
  img_select_l8.setPlaceholder('Please wait...');
  img_select_s2.setPlaceholder('Please wait...');
  if (year >= 2015){
    satelliteMap.add(img_select_s2);
  }
  satelliteMap.add(img_select_l8);
  //slider3.setValue(0,false);
  //slider4.setValue(0,false);
  slider5.setValue(0,false);
  slider6.setValue(0,false);
  slider7.setValue(1);
  slider8.setValue(0,false);
  satelliteMap.remove(sliderPanel);
  satelliteMap.add(legend);
  satelliteMap.add(sliderPanel);
  sliderPanel.clear();
  sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
  sliderPanel.add(sliderPanel_base);
  start_l8=0;
  start_s2=0;
  //this is really only necessary for 2021. For the other years we just need a list of Images.
  //getmodisdata();
  get_new_s2();
  get_new_l8();
  panel_outputs.add(panel_thisyear);
  panel_outputs.add(panel_trend);
  get_annual_ts();
  get_trend_panel();
  for (var i=0; i<=10; i++) {
    satelliteMap.layers().get(i).setShown(false);
  }
  //get_new_GSW();
  //var key_number=ee.Number.parse(ee.String(key2).splice(3));
  //print('key_number',key_number);
  function sedzoneanalysis(){
    satelliteMap.style().set('cursor', 'crosshair');
    slider7.setDisabled(false);
    panel_outputs.add(panel_sedzone);
    sedzone=ee.Image(stacktoimage(area_of_interest,sedzone_stack));
    /*
    path= 'users/magosilvain/SedZones/' + country_name.replace(' ','') + '/SedZone_L8_00to20_' + key2;
    sedzone=ee.Image(ee.data.getAsset(path).id).set('ID',key2);*/
    print('sedzone thislake',sedzone);
    panel_sedzone.widgets().set(0,ui.Label('Deposition/Erosion',{fontWeight: 'bold',fontSize: '16px',margin: '1px 10px 1px 1px',padding: '0'}));
    panel_sedzone.widgets().set(1,ui.Label('Sediment balance: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    var balance=ee.Number(0).subtract(ee.Number(sedzone.get('mean_movement21')));
    balance.evaluate(function(result){
      print('Sediment balance',result);
      panel_sedzone.widgets().set(1,ui.Label('Sediment balance: ' + (result<0?"":"+") + result +' mm/year', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
    /*panel_sedzone.widgets().set(2,ui.Label('Pixels with mean changes > 1cm/year: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    var sedfrac=ee.Number(sedzone.get('sedfrac'));
    sedfrac.evaluate(function(result){
        panel_sedzone.widgets().set(2,ui.Label('Pixels with mean changes > 1cm/year: ' + result + '%', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });*/
    panel_sedzone.widgets().set(2,ui.Label('Erosion Zones (\u0394 h < -1cm/year): ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    var erosion_area=ee.Number(sedzone.get('erosion_area'));
    erosion_area.evaluate(function(result){
        panel_sedzone.widgets().set(2,ui.Label('Erosion Zones (\u0394 h < -1cm/year): ' + result + '%', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });    
    panel_sedzone.widgets().set(3,ui.Label('Deposition Zones (\u0394 h > +1cm/year): ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    var deposition_area=ee.Number(sedzone.get('deposition_area'));
    deposition_area.evaluate(function(result){
        panel_sedzone.widgets().set(3,ui.Label('Deposition Zones (\u0394 h > +1cm/year): ' + result + '%', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
    panel_sedzone.widgets().set(4,ui.Label({value:'Please click on the map to inspect pixel-level terrain height changes',style :{color: 'red',}})); 
    var bands=sedzone_stack.bandNames().size();
    var new_sed_zone_col=ee.ImageCollection(ee.List.sequence(0,bands.subtract(1)).map(function(band){
      var bandname=ee.String(sedzone_stack.bandNames().get(ee.Number(band)));
      var nr=ee.Number.parse(bandname.slice(1));
      return sedzone_stack.select(bandname).rename('delta')
        .multiply(ee.Image(-1))
        .set('t',nr.add(2000)).set('Name',bandname);
    }));
    satelliteMap.layers().set(1, ui.Map.Layer(sedzone.updateMask(sedzone.select('sedzone_filled').neq(0)), {bands: ['sedzone_filled'], palette:['red', 'white','blue'],min: -0.04, max: 0.04}, "sedzone_filled",true));
    sedclick=satelliteMap.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
          //satelliteMap.addLayer(ee.FeatureCollection(point).style({color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}),{},"Point of Interest");
      satelliteMap.layers().set(10, ui.Map.Layer(ee.FeatureCollection(point).style({color: 'black',pointShape:'star6',pointSize:5,fillColor : 'white'}), {},'point'));
                       var chart=ui.Chart.image.series(new_sed_zone_col.select('delta'), point, null, 10,'t')
                      .setChartType('ScatterChart')
                      .setOptions({
                          instruct: 'delta per year and linear trendline',
                          trendlines: {0: { 
                            color: 'CC0000',
                            labelInLegend: 'Trendline',
                            showR2: true,
                            visibleInLegend: true
                          }},
                          lineWidth: 1, 
                          pointSize: 3,
                          //legend: {position:"none"},
                          //hAxis:{format: 'yyyy'},// {minValue: new Date(1985, 1, 1),maxValue: new Date(2020, 1, 1)},//--> "a.getTime is not a function"??
                          vAxis: {minValue:-0.5,maxValue:0.5,ticks: [-0.5, 0, 0.5],title: '\u0394 h [m]'},
                          hAxis: {title:'Year',ticks: [2000,2005,2010,2015,2020],viewWindowMode: 'maximized'}
                        }); 
      panel_sedzone.widgets().set(4,chart);
      //print('chart',chart);
    });
  }
  if (key_number>100000 ){
    path= 'users/hydrosolutions/SedZones/Dahiti_stack/SedZone_L8_00to20_' + key2;
    sedzone_stack=ee.Image(ee.data.getAsset(path).id).set('ID',key2);
    sedzoneanalysis();
  } else {  
  if (key_number>=50000){
    sedsize=sed_collection_WWF.filter(ee.Filter.eq('ID', key2)).size();
    sedsize.evaluate(function(result){
      if (result>0){
        sedzone_stack=sed_collection_WWF.filter(ee.Filter.eq('ID', key2)).first();
        sedzoneanalysis();
      } else {
        print('no sedzone image available');
        slider7.setDisabled(true);
      }
    });
  } else { 
    path= 'users/hydrosolutions/SedZones/' + country_name.replace(' ','') + '_stack/SedZone_L8_00to20_' + key2;
    sedzone_stack=ee.Image(ee.data.getAsset(path).id).set('ID',key2);
    sedzoneanalysis();
  }}
  satelliteMap.layers().set(9, ui.Map.Layer(dd,null, "area_of_interest"));
  satelliteMap.layers().set(5, ui.Map.Layer(dl,{color: 'blue'}, "Lakes",false).setOpacity(0.2));
  //satelliteMap.layers().set(4, ui.Map.Layer(lakes_fc,{color: 'blue'}, "Lakes").setShown(true));
  //end drawing mode
  start_redraw=0;
}
//------------------------------------------------------
// import the hydrafloods module with exposed functions
//var hydrafloods = require('users/kelmarkert/hydrafloods:main.js');
var morefunctions = require('users/magosilvain/Tabea_METRIC:Otsu_thresholding');
//var srtm = ee.Image('USGS/SRTMGL1_003');
//dem = srtm.rename('b1');
//var alos= ee.Image('JAXA/ALOS/AW3D30/V2_2').select('AVE_DSM')
//Map.addLayer(dem.clip(area_of_interest),  {bands: ['b1'], min:328, max: 336},'DEM',false);    
//Map.addLayer(Ortho,  {bands: (['b1', 'b2', 'b3']), min: 30, max: 220},'Ortho RGB');    
var palette =['white', 'green'];
//var dd = ee.Image().paint(area_of_interest, 0, 2);
//Map.addLayer(d,null,'area_of_interest');
//satelliteMap.addLayer(srtm, {min: 280, max: 500, palette: ['white', 'black']}, "SRTM",false);
//satelliteMap.addLayer(alos, {bands: ['AVE_DSM'],min: 280, max: 500, palette: ['white', 'black']}, "alos",false);
//satelliteMap.centerObject(area_of_interest,14);
//print('WWF Rivers @ Wegnia', Rivers.filterBounds(area_of_interest));
//satelliteMap.addLayer(GSWimage, {bands: ['water'],min: 1, max: 2, palette: ['white', 'blue']}, "Global Surface Water Database",false);
//---------------------------------
//COREGISTRATION STUFF
function coreg_getdisplacement(date,sat,bounds){
  bounds=ee.Geometry(bounds);
  date=ee.Date(date);
  //var bound = area_of_interest.bounds(10).buffer(5000);
  var bandIn = ['B2','B3','B4','B5','B6','B7'];
  var bandIn_l7 = ['B1','B2','B3','B4','B5','B7'];
  var bandIn_s2 = ['B2','B3','B4','B8','B11','B12'];
  var bandOut = ['blue','green','red','nir','swir1','swir2'];
  var imgS2col= ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(bounds)
         .filterDate(date,date.advance(1,'day')).select(bandIn_s2,bandOut);//.clip(bound);
  var proj=imgS2col.first().select('green').projection();
  var imgS2a= ee.Image(imgS2col.mosaic().copyProperties(imgS2col.first()).set('system:time_start',imgS2col.first().get('system:time_start')))
    .clip(bounds.buffer(10000,100)).reproject({crs: proj.crs(), scale:10});
  var imgS2b=imgS2col.first();
  var imgS2= ee.Image(ee.Algorithms.If(imgS2col.size().gt(1),imgS2a,imgS2b));
  var imgL7col = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').filterBounds(bounds)
         .filterDate(date,date.advance(1,'day')).select(bandIn_l7,bandOut);//.clip(bound);
  var imgL7a=ee.Image(imgL7col.mosaic().copyProperties(imgL7col.first()).set('system:time_start',imgL7col.first().get('system:time_start')))
    .clip(bounds.buffer(10000,100)).setDefaultProjection(proj);
    //.set('system:footprint',imgS2.get('system:footprint'));
  var imgL7b=imgL7col.first();
  var imgL7= ee.Image(ee.Algorithms.If(imgL7col.size().gt(1),imgL7a,imgL7b));
  var imgL8col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterBounds(bounds)
         .filterDate(date,date.advance(1,'day')).select(bandIn,bandOut);//.clip(bound);
  var imgL8a=ee.Image(imgL8col.mosaic().copyProperties(imgL8col.first()).set('system:time_start',imgL8col.first().get('system:time_start')))
    .clip(bounds.buffer(10000,100)).setDefaultProjection(proj);
    //.set('system:footprint',imgS2.get('system:footprint'));
  var imgL8b=imgL8col.first();
  var imgL8= ee.Image(ee.Algorithms.If(imgL8col.size().gt(1),imgL8a,imgL8b));
  var imgL =ee.Image(ee.Algorithms.If(ee.String(sat).compareTo('LANDSAT_7').eq(0),imgL7,imgL8));
  //var imgL =ee.Image(ee.ImageCollection.fromImages([imgL7,imgL8]).filter(ee.Filter.eq('SATELLITE', ee.String(sat))).first());
  //var LProjection = imgL.select('green').projection();
  // Choose to register using only the 'Red' band.
  var LRedBand = imgL.select('green');
  var S2RedBand = imgS2.select('green');
  var displacement = LRedBand.displacement({
    referenceImage: S2RedBand,
    maxOffset: 50.0,//The maximum offset allowed when attempting to align the input images, in meters
    projection: s2Projection,
    //stiffness: 5,
    patchWidth: 100 // Small enough to capture texture and large enough that ignorable 
    //objects are small within the patch. Automatically ditermined if not provided 
  });//.reproject(LProjection.crs(), null, 30);
  return displacement;
}
var coreg_L7=function(img){
  return ee.Image(img).clip(area_of_interest.buffer(10000).simplify(1000)).displace(displacement_L7);
};
var coreg_L8=function(img){
  return ee.Image(img).clip(area_of_interest.buffer(10000).simplify(1000)).displace(displacement_L8);
};
//------------------------------------------------------
//FUNCTIONS REQUIRED BY THE CLASSIFICATION ALGORITHM
//RETRIEVE WATER LEVEL ELEVATION IN BUFFER AROUND WATER SURFACE
//------------------------------------------------------
//////////THE MAPPING ALGORITHM STARTS HERE///////////
//------------------------------------------------------
///MODIS///
// helper function to extract the QA bits
function getQABits(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
}
function joinCollections(imageCollection1, imageCollection2) {
  var filterTimeEq = ee.Filter.equals({
    leftField:'system:time_start', 
    rightField: 'system:time_start'
  });
  var joined = ee.Join.inner().apply(imageCollection1, imageCollection2, filterTimeEq);
  return joined.map(function(feature) {
    var prop2copy=ee.Feature(feature.get('secondary')).get('dem_elev');
    return ee.Feature(feature.get('primary'))
    .set('alos_elev',prop2copy);
    //.copyProperties(ee.Feature(feature.get('secondary')));
});
}
/////////s2////////
var cloudscore_sen = function(image) {
  //no data treated as clouds
  //var mask = ee.Image(100).where(image.select('QA60').lt(1024),ee.Image(100).where(image.select('B').gt(0),0)).rename('cloud')
  var mask = ee.Image(100).where(image.select('QA60').neq(1024),ee.Image(100).where(image.select('B').gt(0),0)).rename('cloud')
  .where(image.select('probability').gt(50),100);
  //no data ignored
  var mask3 = ee.Image(100).where(image.select('QA60').lt(1024),0).rename('cloud').updateMask(image.select('B').gt(0))
  .where(image.select('probability').gt(50),100);
  //cirus clouds (QA60 = 2048) are ok? not on 2021-06-29!
  var mask2 = ee.Image(100).where(image.select('QA60').neq(1024),0).rename('cloud').updateMask(image.select('B').gt(0)) 
  .where(image.select('probability').gt(50),100);
  var cloudPixels = ee.Number(mask.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': image.get('system:footprint'), 'scale': 50,'maxPixels': 1e13,'tileScale':8}).get('cloud'));
  var cloudPixels2 = ee.Number(mask2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': image.get('system:footprint'), 'scale': 50,'maxPixels': 1e13,'tileScale':8}).get('cloud'));//'geometry': area_of_interest, 
  var cloudPixels3 = ee.Number(mask3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': image.get('system:footprint'), 'scale': 50,'maxPixels': 1e13,'tileScale':8}).get('cloud'));//'geometry': area_of_interest, 
  cloudPixels2=ee.Number(ee.Algorithms.If(cloudPixels3.gt(80),cloudPixels3,cloudPixels2));
  // Return the image with added bands. 
  return image.updateMask(mask.not()).addBands(mask2).addBands({'srcImg': image.select('probability'),'overwrite':true})
    .set({'nodata_cover': cloudPixels})//
    .set({'cloud_cover': cloudPixels2})
    .set({'cirrus_cover': cloudPixels3})
    .set({'CLOUD_COVER': image.get('CLOUDY_PIXEL_PERCENTAGE')})
    .set({'SATELLITE': 'SENTINEL-2'});
};  
var addbands_sen = function(image){
  var mndwi = image.normalizedDifference(['B3', 'B11']).rename('MNDWI');
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  var bands = ['B2', 'B3', 'B4', 'B8','B11','QA60'];
  var newbands = ['B', 'G', 'R', 'NIR','SWIR1','QA60'];  
  return image.select(bands).rename(newbands).addBands(mndwi).addBands(ndvi)
    .set({'SENSING_TIME': ee.Date(image.get('system:time_start')).format('YYYY-MM-dd')});
};
var coreg_S2=function(img){
  return ee.Image(img).displace(displacement_S2_ortho);
};
function getEdge(mask) {
  //get a buffer around edge +- 1m
  return mask.focal_max(1).subtract(mask.focal_min(1));
}
function getEdge10m(mask) {
  //get a buffer around edge +- 1m
  return mask.focal_max({radius: 10, units: 'meters'}).subtract(mask.focal_min({radius: 10, units: 'meters'}));
}
var edgeOtsu_func_optical = function(image) {
  var bounds=area_of_interest;
  //var ndwi = ee.Image(image).normalizedDifference(['G', 'NIR']);
  var mndwi = ee.Image(image).select('MNDWI');
  var imgcloud = ee.Image(image).select('cloud');
  var maxValue=0.3;
  mndwi=mndwi.where(mndwi.gt(maxValue),maxValue);//bcs we do not want to detect edges between free water and vegetation overgrown water
  //OTSU THRESHOLD
  var scale=ee.Number(30);
  //var scale = ee.Number(ee.Algorithms.If(ee.String(mndwi.get('SATELLITE')).compareTo(ee.String('SENTINEL-2')).eq(0),20,30));
  var th = morefunctions.computeThresholdUsingOtsu(mndwi.updateMask(imgcloud.lt(100)), scale, bounds, cannyThreshold, cannySigma, minValue, debug);
  //filter outliers? if the minimum elevation of the area that is water covered is larger than 'min_elev_perc_fit'
  //tested with ID_592 in Chad. Means water bodies with different water levels.
  var dem_min_elevation = ee.Number(ee.Algorithms.If(ee.Number(th).eq(99),null,
  //.updateMask(dem.gte(ee.Number(dem_thislake.get('min_elev_perc_fit'))))
  ee.Number(dem_thislake.updateMask(mndwi.gt(th)).updateMask(imgcloud.lt(100)).reduceRegion({
    reducer: 'min',
    geometry: area_of_interest,
    scale: 10,
    tileScale: 4,
  }).get('b1'))));
  th=ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(dem_min_elevation,null),th,ee.Number(ee.Algorithms.If(dem_min_elevation.gt(ee.Number(dem_thislake.get('min_elev_perc_fit')).add(0.1)),99,th))));
  var dem_edge=/*dem_new dem_thislake.updateMask(occ_map.lt(1)).updateMask(occ_map.gt(0))*/dem_thislake.updateMask(getEdge10m(mndwi.gt(th)))
  .updateMask(imgcloud.lt(100));
  var th_veg =  0.5;
  var veg_edge=ee.Image(1).updateMask(
    ee.Image(image).select('NDVI').gt(th_veg).focal_max({radius: 10, units: 'meters'}));
  veg_edge=ee.Image(0).where(veg_edge.eq(1),1);
  //dem_edge=dem_edge.updateMask(veg_edge.neq(1));
  /*var edge_prob = ee.Number(ee.Algorithms.If(ee.Number(th).eq(99),-99,
    ee.Number(occ_map.updateMask(dem_edge.gt(-100)).reduceRegion({
      reducer: 'median',
      geometry: selectedLake,//area_of_interest, 
      scale: 10,
      tileScale: 4,
      maxPixels: 1e13,
      bestEffort: true,
    }).get('remapped_sum'))));*/
  //var area_img = ee.Image(0).rename('remapped').where(mndwi.gt(th),1)
    //.reproject({crs: s2Projection.crs(), scale:workwiththisscale});
  var area_img=mndwi.gt(th).rename('remapped');
 /*return ee.Image(1).mask(getEdge(mndwi.gt(th)))//.updateMask(ee.Image(1).clip(LacWegnia.difference(sedimentation_zone)).eq(1))//dem.updateMask(dem.lt(9999))
    */
  return area_img.clip(area_of_interest)//.setDefaultProjection({crs: s2Projection.crs(), scale:10})
    .addBands(dem_edge.rename('dem_edge'))
    .addBands(mndwi.rename('mndwi'))
    .addBands(veg_edge.rename('veg_edge'))
    //.set('dem_elev',median_elevation)
    //.set('dem_elev',dem_elevation)
    .set('otsu_th',th)
    //.set('area_water',total_area)
    //.set('mndwi_p10',mndwi_prc)
    //.set('edge_prob',edge_prob)
    .copyProperties(image, ['system:time_start','SENSING_TIME', 'SATELLITE','cloud_cover','nodata_cover','ID']);  
};
//get_corrected_elevation_DEM should be used for comparison with results stored in assets.
//But for the app it is not necessary, since we need to recompute only for 2021 on
//for 2021 the DEM of 2018-2020 is still valid (dep/erosion patterns not relevant)
var get_elevation_DEM=function(image){
  //var bounds=ee.Image(image).get('system:footprint');
  var dem_edge=ee.Image(image).select('dem_edge');
  var veg_edge=ee.Image(image).select('veg_edge');
  var dem_elevation = 
    ee.Number(dem_edge.updateMask(veg_edge.neq(1)).reduceRegion({
      reducer: 'median',
      //selectedlake or buffered lake: makes a big difference. E.g. ID_1331 (Mali) which is too close to a river. Should be removed from database.
      geometry: selectedLake,//area_of_interest,
      scale: 10,
      tileScale: 4,
    }).get('dem_edge'));
  return image.set('dem_elev',dem_elevation);
};
var get_elevation_ALOS=function(image){
  var dem_edge=ee.Image(image).select('dem_edge');
  var veg_edge=ee.Image(image).select('veg_edge');
  var alos_elevation = 
    ee.Number(/*srtm*/alos.select('AVE_DSM').updateMask(dem_edge.gt(-100)).reduceRegion({
      reducer: 'mean',
      geometry: area_of_interest,
      scale: 10,
      tileScale: 4,
    }).get('AVE_DSM'/*'elevation'*/));
  var dem_elevation=alos_elevation;//.subtract(delta_alos);
  var dem_elevation_noveg = 
    ee.Number(/*srtm*/alos.select('AVE_DSM').updateMask(dem_edge.gt(-100)).updateMask(veg_edge.neq(1)).reduceRegion({
      reducer: 'mean',
      geometry: area_of_interest,
      scale: 10,
      tileScale: 4,
    }).get('AVE_DSM'/*'elevation'*/));
  dem_elevation =ee.Number(ee.Algorithms.If(dem_elevation_noveg.gt(dem_elevation),dem_elevation_noveg,dem_elevation));
  return image.select('remapped').set('dem_elev',dem_elevation);
};
var img_addMODIS = function(image) {
  var bounds=area_of_interest;//image.get('system:footprint');
    //use MODIS dust model to understand if there is no water or no contrast becaues of dust storm
  var img_s2=ee.Image(image);
  //var img_mod_col=ee.ImageCollection(modis_input).filter(ee.Filter.eq('SENSING_TIME', img_s2.get('SENSING_TIME')));
  var img_mod_col=ee.ImageCollection("MODIS/006/MCD19A2_GRANULES").filterBounds(bounds)
    .filterDate(ee.Date(img_s2.get('system:time_start')).advance(-12,'hour'), ee.Date(img_s2.get('system:time_start')).advance(12,'hour'))  
    .map(function(img){
      //Bit 13-14: 10 – Dust model (dust detected)
      var dust1 =   getQABits(img.select('AOD_QA'),13,14,'B13');
    return dust1.eq(2);
    //.set({'SENSING_TIME': ee.Date(img.get('system:time_start')).format('YYYY-MM-dd')})
    //.copyProperties(img,['system:time_start']);
    });
  //Check if any of the TERRA or ACQUA satellites identified dust on this day
  //var img_mod=ee.Image(ee.Algorithms.If(img_mod_col.size().gt(0),img_mod_col.max(),ee.Image(0).rename('B13')));  
  var img_mod=img_mod_col.merge(ee.Image(0).rename('B13')).max();  
  var dust_storm = ee.Number(img_mod.select('B13').reduceRegion({
    reducer: 'max',
    geometry: bounds,//.difference(sedimentation_zone),
    scale: 500,
    //tileScale: 8,
  }).get('B13'));
  dust_storm = ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(dust_storm,null),0,dust_storm));
  var th=ee.Number(image.get('otsu_th'));
  var image1=image.set('dust_storm',dust_storm)
     .set('dust_storm2',th.eq(99).multiply(dust_storm))
     .set('th0',th);
     //.set('area_water',total_area);
  return image1;
};
var img2feat_area=function(image){
  var th=ee.Number(image.get('otsu_th'));
  //var area_img=ee.Image(image).select('remapped');
  var mndwi=ee.Image(image).select('mndwi');
  var area_img=mndwi.gt(th).rename('remapped');
  var pa = ee.Image.pixelArea().multiply(1e-6);
    //Get the area of the surface
  var total_area = ee.Number(area_img.rename('b1').multiply(pa).reduceRegion({
    //für einigermassen genaue Flächen:.reproject({crs:'EPSG:4326',scale:10})
    reducer: 'sum',
    geometry: area_of_interest,//.difference(sedimentation_zone),
    scale: 10,
    tileScale: 4,
  }).get('b1'));
  //if no threshold can be identified - check with MNDWI if the whole area is water covered
  var mndwi_prc = ee.Number(mndwi.reduceRegion({
    reducer: ee.Reducer.percentile([10]),
    geometry: area_of_interest,//.difference(sedimentation_zone),
    scale: workwiththisscale,
    tileScale: 1,
  }).get('mndwi'));
  total_area=ee.Number(ee.Algorithms.If(th.eq(99),ee.Number(ee.Algorithms.If(mndwi_prc.gt(0),lake_area,total_area)),total_area));
  var dust_storm=ee.Number(image.get('dust_storm'));
  total_area=ee.Number(ee.Algorithms.If(th.eq(99),ee.Number(ee.Algorithms.If(dust_storm.eq(1),null,total_area)),total_area));
  var image1=image.set('area_water',total_area);
  //return ee.Feature(null).copyProperties(image1, ['dust_storm2','dust_storm','area_water','otsu_th','system:time_start','SENSING_TIME', 'SATELLITE','cloud_cover','ID','edge_prob',/*'mndwi_p10',*/'nodata_cover'/*,'dem_elev'*/,'dem_elev']);
    return ee.Feature(null).copyProperties(image1, ['dust_storm2','dust_storm','area_water','otsu_th','system:time_start','SENSING_TIME', 'SATELLITE','cloud_cover','ID','nodata_cover']);
};
var img2feat_elev=function(image){
    return ee.Feature(null).copyProperties(image, ['dust_storm2','dust_storm','otsu_th','system:time_start','SENSING_TIME', 'SATELLITE','cloud_cover','ID',/*'edge_prob','mndwi_p10',*/'nodata_cover'/*,'dem_elev'*/,'dem_elev']);
};
var cc_feat=function(image){
  return ee.Feature(null).copyProperties(image,['cloud_cover','system:time_start','SENSING_TIME']);
};
  ///////////////
var img_select_s2 = ui.Select({
    items: [],
    style: {position:'top-center',padding:'1px', fontWeight:'bold', backgroundColor: 'red'},
    //onChange: draw_s2
});
img_select_s2.setDisabled(true); 
//img_select_s2.setPlaceholder('Select Sentinel-2 Scene');
satelliteMap.add(img_select_s2);
  img_select_s2.setPlaceholder('Please wait...');
var img_select_l8 = ui.Select({
    items: [],
    style: {position:'top-center',padding:'1px', fontWeight:'bold', backgroundColor: 'red'},
});
satelliteMap.add(img_select_l8);
img_select_l8.setDisabled(true); 
  img_select_l8.setPlaceholder('Please wait...');
/*function getmodisdata(){
  // MODIS DUST MODEL
  modis_aero=ee.ImageCollection("MODIS/006/MCD19A2_GRANULES").filterBounds(area_of_interest)
    .filterDate(start_date, end_date)
    .map(function(img){
      //Bit 13-14: 10 – Dust model (dust detected)
      var dust1 =   getQABits(img.select('AOD_QA'),13,14,'B13');
    return dust1.eq(2)
    .set({'SENSING_TIME': ee.Date(img.get('system:time_start')).format('YYYY-MM-dd')})
    //.set({'SENSING_TIME_hh': ee.Date(img.get('system:time_start')).format('YYYY-MM-dd HH:mm')})
    .copyProperties(img,['system:time_start']);
    });
  //print('modis_aero',modis_aero.filterDate(ee.Date.fromYMD(2017,4,15),ee.Date.fromYMD(2017,4,17)));
}*/
var edge_img4ALOS_landsat;
var edge_img4ALOS_s2;
function get_new_s2(){ 
  withbands_s2 = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(area_of_interest)
    .filterDate(start_date, end_date)
    .map(addbands_sen);//.map(slc_gapfill);
  print('withbands_s2',withbands_s2);
  withbands_s2=withbands_s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cc_pix));
  s2_cc =ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY")
    .filterBounds(area_of_interest)
    .filterDate(start_date, end_date)
    .map(function(image){
      return image.set({'SENSING_TIME': ee.Date(image.get('system:time_start')).format('YYYY-MM-dd')});
    });
  //print('s2_cc',s2_cc);
  //withbands_s2=ee.ImageCollection(joinCollections(withbands_s2,s2_cc));
  //s2_coregistrated=withbands_s2.sort('system:time_start');//.select(['B', 'G', 'R', 'NIR','MNDWI'])
  //.map(coreg_S2);
  var img_names_s2=withbands_s2.sort('system:time_start').aggregate_array('SENSING_TIME');
  img_list_s2=ee.Dictionary.fromLists(img_names_s2.distinct(), img_names_s2.distinct()).keys();
  print('img_list_s2',img_list_s2);  
  s2_mosaicked=ee.ImageCollection(img_list_s2.map(function(x){
    var img1=ee.Image(withbands_s2.filter(ee.Filter.eq('SENSING_TIME', x)).first());
    var s2_cloud_col=s2_cc.filter(ee.Filter.eq('SENSING_TIME', x));
    var s2_cloud=ee.Image(s2_cloud_col.mosaic());
    //Mosaic the available Sentinel-2 images
    return ee.Image(withbands_s2.filter(ee.Filter.eq('SENSING_TIME', x)).mosaic())
    .addBands(ee.Image(ee.Algorithms.If(s2_cloud_col.size().gt(0),s2_cloud,ee.Image(0).rename('probability'))))
    .clip(area_of_interest).copyProperties(img1)
    .set('system:time_start',img1.get('system:time_start'));
  })).map(cloudscore_sen);
  //ee.ImageCollection.fromImages([s2_cloud,ee.Image(0).rename('probability')]).max();  
  print('s2_mosaicked',s2_mosaicked);
  //for s2_cc_feat we need the cloud cover information before filtering
  s2_cc_feat=s2_mosaicked.map(cc_feat);
  //print('s2Projection',s2Projection);
  var edge_img_s20 = s2_mosaicked
    .filter(ee.Filter.lt('cloud_cover', cc_thresh)).filter(ee.Filter.lt('nodata_cover', nodata_thresh))
    .map(edgeOtsu_func_optical);
  print('edge_img_s20',edge_img_s20);
  var edge_img_s2=edge_img_s20.map(img_addMODIS);
    //.map(function(img){return img_addMODIS(img,modis_aero)})
  print('edge_img_s2',edge_img_s2);
  feat_area_s2 = ee.FeatureCollection(edge_img_s2.map(img2feat_area));
  print('feat_area_s2',feat_area_s2);
    var edge_img4DEM=edge_img_s2.filter(ee.Filter.neq('otsu_th', 99))
      .map(get_elevation_DEM);
    print('edge_img4DEM',edge_img4DEM);      
    var edge_img4ALOS_s2=edge_img4DEM
      .filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
      .merge(ee.FeatureCollection(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
      .sort('dem_elev',false).toList(99).slice(0,3)))
      .map(get_elevation_ALOS);
    var edge_img2join=edge_img4DEM
        .filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
        .filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))))
        /*.merge(ee.FeatureCollection(edge_img4DEM.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))))
        .sort('dem_elev').toList(99).slice(0,3)))*/
        .merge(ee.FeatureCollection(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
        .sort('dem_elev',false).toList(99).slice(0,3)));
    var edge_img_joined=joinCollections(edge_img2join, edge_img4ALOS_s2);
    print('edge_img_joined',edge_img_joined);
    var delta_alos=ee.Number(ee.Algorithms.If(edge_img_joined.size().gt(0),ee.Number(edge_img_joined.aggregate_array('alos_elev').reduce(ee.Reducer.mean())).subtract(
      ee.Number(edge_img_joined.aggregate_array('dem_elev').reduce(ee.Reducer.mean()))),999));
    print('delta_alos s2',delta_alos);
    edge_img4ALOS_s2=edge_img4ALOS_s2
      .map(function(img){return ee.Image(img).set('dem_elev',ee.Number(ee.Image(img).get('dem_elev')).subtract(delta_alos))});
      //.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))));
    edge_img4ALOS_s2=ee.ImageCollection(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))).aggregate_array('SENSING_TIME')
      .iterate(function(x,alos_input){
      return ee.FeatureCollection(alos_input).filter(ee.Filter.neq('SENSING_TIME', x));
      },edge_img4ALOS_s2));
    print('edge_img4ALOS_s2',edge_img4ALOS_s2);
    var edge_img_s2_merged=edge_img4ALOS_s2
    .merge(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
    .merge(edge_img_s2.filter(ee.Filter.eq('otsu_th', 99))).filter(dust_filter)
    .sort('system:time_start');
    print('edge_img_s2_merged',edge_img_s2_merged);
  feat_elev_s2 = ee.FeatureCollection(edge_img_s2_merged.map(img2feat_elev));
  print('feat_elev_s2',feat_elev_s2);
  //withouth modis information the processing is faster:
  var s2_size=ee.Number(edge_img_s20.filter(ee.Filter.neq('otsu_th', 99)).size());
  var iteration_id_tmp = iteration_id;
  //per default set the slider to disabled
  slider6.setDisabled(true);
  s2_size.evaluate(function(x){
    if (iteration_id == iteration_id_tmp){
      if (x>0){
        slider6.setDisabled(false);
      }
    }
  });
  var summed = edge_img_s20.select('remapped').reduce(ee.Reducer.sum());
  var prob = summed.divide(ee.Image(edge_img_s20.filter(ee.Filter.neq('otsu_th', 99)).size()));
  water_surface_probability = ee.Image(ee.Algorithms.If(s2_size.gt(0),prob.clip(area_of_interest),ee.Image(0)));
  satelliteMap.layers().set(2, ui.Map.Layer(water_surface_probability, {min:0,max:1,palette:'white,blue'}, 'water surface probability S2',false).setOpacity(0));
  img_select_s2.items().reset();
  img_select_s2.setDisabled(true);  
  img_select_s2.setPlaceholder('Please wait...');
  img_list_s2.evaluate(function(result1b){
    img_select_s2.items().reset(result1b);
    img_select_s2.setPlaceholder('Select Sentinel-2 Scene');
    img_select_s2.setDisabled(false);
    img_select_s2.onChange(draw_s2);
  });  
}
///LANDSAT 8 algorithms
var cloudscore_L8_nodata = function(image) {
  var image2 = ee.Image(100).rename('cloud').where(image.select('pixel_qa').eq(322),0).where(image.select('pixel_qa').eq(386),0)
  .where(image.select('pixel_qa').eq(834),0).where(image.select('pixel_qa').eq(898),0).where(image.select('pixel_qa').eq(1346),0)
  //water should also not be treated as clouds
  //https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1368_L8_SurfaceReflectanceCode-LASRC_ProductGuide-v2.pdf
  .where(image.select('pixel_qa').eq(324),0).where(image.select('pixel_qa').eq(388),0)
  .where(image.select('pixel_qa').eq(836),0).where(image.select('pixel_qa').eq(890),0).where(image.select('pixel_qa').eq(1348),0);
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  return image/*.addBands({srcImg:image2,overwrite:true})*/.set({'nodata_cover': cloudPixels})
    //.clip(area_of_interest);
};
var cloudscore_L7_nodata = function(image) {
  var image2 = ee.Image(100).rename('cloud').where(image.select('pixel_qa').eq(66),0).where(image.select('pixel_qa').eq(130),0)
      //water should also not be treated as clouds
      .where(image.select('pixel_qa').eq(68),0).where(image.select('pixel_qa').eq(132),0);
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  return image/*.addBands({srcImg:image2,overwrite:true})*/.set({'nodata_cover': cloudPixels});
};
var cloudscore_L8_pro = function(image) {
  //create an image which is 100 where there might be clouds and zero where the scene is clear or where there is water
  //according to the landsat quality band
  var image2 = ee.Image(100).rename('cloud').where(image.select('pixel_qa').eq(322),0).where(image.select('pixel_qa').eq(386),0)
  .where(image.select('pixel_qa').eq(834),0).where(image.select('pixel_qa').eq(898),0).where(image.select('pixel_qa').eq(1346),0)
  //water should also not be treated as clouds
  //https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/atoms/files/LSDS-1368_L8_SurfaceReflectanceCode-LASRC_ProductGuide-v2.pdf
  .where(image.select('pixel_qa').eq(324),0).where(image.select('pixel_qa').eq(388),0)
  .where(image.select('pixel_qa').eq(836),0).where(image.select('pixel_qa').eq(890),0).where(image.select('pixel_qa').eq(1348),0);
  var image3 =  image2.updateMask(ee.Image(image).select('pixel_qa').gt(1));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
      return ee.Image(image).updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
        .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'));
};
var cloudscore_L8_T1L2 = function(image) {
 // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  // Develop masks for unwanted pixels (fill, cloud, cloud shadow).
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  //var saturationMask = image.select('QA_RADSAT').eq(0);  
  var mask = qaMask;//.add(saturationMask);
  var image2 = ee.Image(100).rename('cloud').where(qaMask.eq(1),0);//.where(saturationMask.eq(1),0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').neq(0));
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
                 'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
      return ee.Image(image).addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .addBands(mask.rename('mask'))
        .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
        .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'))
      .set('SATELLITE','LANDSAT_8');
};
var cloudscore_L8_mosaic = function(image) {
  return ee.Image(image)
    .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'));
};
var cloudscore_L7_pro = function(image) {
//create an image which is 100 where there might be clouds and zero where the scene is clear or where there is water
//according to the landsat quality band
  var image2 = ee.Image(100).rename('cloud').where(image.select('pixel_qa').eq(66),0).where(image.select('pixel_qa').eq(130),0)
      //water should also not be treated as clouds
      .where(image.select('pixel_qa').eq(68),0).where(image.select('pixel_qa').eq(132),0)
  var image3 = image2.updateMask(ee.Image(image).select('pixel_qa').gt(1));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  return ee.Image(image).updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
    .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
    .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'));
};
var cloudscore_L7_T1L2 = function(image) {
//create an image which is 100 where there might be clouds and zero where the scene is clear or where there is water
//according to the landsat quality band
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var mask = qaMask;
  var image2 = ee.Image(100).rename('cloud').where(qaMask.eq(1),0);
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  var image3 =  image2.updateMask(ee.Image(image).select('QA_PIXEL').neq(0));
  var cloudPixels = ee.Number(image2.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  var cloudPixels2 = ee.Number(image3.select("cloud").reduceRegion({'reducer': ee.Reducer.mean(), 
             'geometry': area_of_interest, 'scale': 100,'tileScale':1}).get('cloud'));
  return ee.Image(image).addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true)
    .updateMask(image2.select(['cloud']).lt(100)).addBands(image2)
        .addBands(mask.rename('mask'))
    .set({'nodata_cover': cloudPixels}).set({'cloud_cover': cloudPixels2})
    .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'))
    .set('SATELLITE','LANDSAT_7');
};
var cloudscore_L7_mosaic = function(image) {
  return ee.Image(image)
    .set('SENSING_TIME',ee.Date(image.get('system:time_start')).format('YYYY-MM-dd'));
};
var addbands_l8 = function(image) {
  var mndwi = image.normalizedDifference(['SR_B3', 'SR_B6']).rename('MNDWI');
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  var bands = ['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5','SR_B6', 'cloud','QA_PIXEL','mask'];
  var newbands = ['B', 'G', 'R', 'NIR','SWIR1', 'cloud','QA_PIXEL','mask'];
  return image.select(bands).rename(newbands).addBands(mndwi).addBands(ndvi);
};
var addbands_l7 = function(image) {
  var mndwi = image.normalizedDifference(['SR_B2', 'SR_B5']).rename('MNDWI');
  var ndvi = image.normalizedDifference(['SR_B4', 'SR_B3']).rename('NDVI');
  var bands = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4','SR_B5', 'cloud','QA_PIXEL','mask'];
  var newbands = ['B', 'G', 'R', 'NIR','SWIR1', 'cloud','QA_PIXEL','mask'];
  return image.select(bands).rename(newbands).addBands(mndwi).addBands(ndvi);
};
//LANDSAT gapfilling
var slc_gapfill = function(image){
  //var l8Projection = image.select('MNDWI').projection();
  var filled1 = image.select('MNDWI')//.reproject(l8Projection)//.clip(area_of_interest)
        .focal_mean({radius: 30, kernelType :'circle',units: 'meters',iterations: 8});
        //.focal_mean({radius: 1, kernelType :'circle',units: 'pixels',iterations: 8});
        //fill only at scan line error pixels, clouds will remain no-data
        //lets fill also at clouds..
        var filled2=filled1;//.updateMask(image.select('cloud').lte(100));
        // combines unfilled image w/ result of focal mean operation
        var new_img= ee.Image(filled2.blend(image.select(['MNDWI'])));
        return image.addBands({srcImg:new_img, overwrite:true});//.reproject(l8Projection);//.addBands(image.select('cloud'))
        //return new_img//image.addBands({srcImg:new_img, overwrite:true})
};
function get2020img4coreg_L8(aoi){
      aoi=ee.Geometry(aoi);
      var img_names_l8=ee.ImageCollection(withMNDWI_l8.sort('SENSING_TIME',false).sort('nodata_cover')).aggregate_array('SENSING_TIME');
      var l8_index=img_names_l8.map(function(x){ return ee.Algorithms.If(img_list_s2.indexOf(x).eq(-1),-1,img_list_s2.get(img_list_s2.indexOf(x)))});
      l8_index=l8_index.filter(ee.Filter.neq('item',-1));
      //check if a S2-SR image is indeed available
      l8_index=l8_index.map(function(x){
        var s2imgc=ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(aoi)
         .filterDate(ee.Date(x),ee.Date(x).advance(1,'day'));
        return ee.Algorithms.If(s2imgc.size().gt(0),x,-1);
      }).filter(ee.Filter.neq('item',-1));
      //but check also for dust storms!
      var l8_index_tmp=l8_index.map(function(x){
          var img_mod_col=ee.ImageCollection("MODIS/006/MCD19A2_GRANULES").filterBounds(aoi)
          .filterDate(ee.Date(x), ee.Date(x).advance(1,'day'))
          .map(function(img){
                //Bit 13-14: 10 – Dust model (dust detected)
                var dust1 =   getQABits(img.select('AOD_QA'),13,14,'B13');
              return dust1.eq(2);
              });
          //Check if any of the TERRA or ACQUA satellites identified dust on this day
          var img_mod=ee.Image(ee.Algorithms.If(img_mod_col.size().gt(0),img_mod_col.max(),ee.Image(0).rename('B13')));  
          //var img_mod=img_mod_col.merge(ee.Image(0).rename('B13')).max();  
          var dust_storm = ee.Number(img_mod.select('B13').reduceRegion({
            reducer: 'max',
            geometry: aoi,//.difference(sedimentation_zone),
            scale: 500,
          }).get('B13'));
          return ee.Algorithms.If(dust_storm.eq(1),-1,x);
      }).filter(ee.Filter.neq('item',-1));
      //if dust storms are too frequent and there are no other choices - keep the images anyway
      l8_index=ee.List(ee.Algorithms.If(l8_index_tmp.length().gt(0),l8_index_tmp,l8_index));
      return l8_index;
}
var get_new_withMNDWI_l8 = function(){
      var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterBounds(area_of_interest)
       .filterDate(start_date, end_date);//
      var withMNDWI_l8 = ee.ImageCollection(l8).map(cloudscore_L8_mosaic);
      var img_names_l8=withMNDWI_l8.sort('system:time_start').aggregate_array('SENSING_TIME');
      var img_list_l8=ee.Dictionary.fromLists(img_names_l8.distinct(), img_names_l8.distinct()).keys();
      withMNDWI_l8=ee.ImageCollection(img_list_l8.map(function(x){
        var img1=ee.Image(withMNDWI_l8.filter(ee.Filter.eq('SENSING_TIME', x)).first());
        //Mosaic the available Landsat 7 images
        return ee.Image(withMNDWI_l8.filter(ee.Filter.eq('SENSING_TIME', x)).mosaic()).clip(area_of_interest)
        .copyProperties(img1)
        .set('system:time_start',img1.get('system:time_start'));
      })).map(cloudscore_L8_T1L2).map(addbands_l8); 
      return withMNDWI_l8;
};
var get_new_withMNDWI_l7 = function(){
      var l7 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterBounds(area_of_interest)
       .filterDate(start_date, end_date);
      var withMNDWI_l7=l7.map(cloudscore_L7_mosaic); 
      var img_names_l7=withMNDWI_l7.sort('system:time_start').aggregate_array('SENSING_TIME');
      var img_list_l7=ee.Dictionary.fromLists(img_names_l7.distinct(), img_names_l7.distinct()).keys();
      withMNDWI_l7=ee.ImageCollection(img_list_l7.map(function(x){
        var img1=ee.Image(withMNDWI_l7.filter(ee.Filter.eq('SENSING_TIME', x)).first());
        //Mosaic the available Landsat 7 images
        return ee.Image(withMNDWI_l7.filter(ee.Filter.eq('SENSING_TIME', x)).mosaic()).clip(area_of_interest)
        .copyProperties(img1)
        .set('system:time_start',img1.get('system:time_start'));
      })).map(cloudscore_L7_T1L2).map(addbands_l7); 
      return withMNDWI_l7;
};
function get2020img4coreg_L7(aoi){
      aoi=ee.Geometry(aoi);
      var img_names_l7=ee.ImageCollection(withMNDWI_l7.sort('SENSING_TIME',false).sort('nodata_cover')).aggregate_array('SENSING_TIME');
      var l7_index=img_names_l7.map(function(x){ return ee.Algorithms.If(img_list_s2.indexOf(x).eq(-1),-1,img_list_s2.get(img_list_s2.indexOf(x)))});
      l7_index=l7_index.filter(ee.Filter.neq('item',-1));
      //check if a S2 image is indeed available
      l7_index=l7_index.map(function(x){
        var s2imgc=ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(aoi)
         .filterDate(ee.Date(x),ee.Date(x).advance(1,'day'));
        return ee.Algorithms.If(s2imgc.size().gt(0),x,-1);
      }).filter(ee.Filter.neq('item',-1));
      //check also for dust storms!
      var l7_index_tmp=l7_index.map(function(x){
          var img_mod_col=ee.ImageCollection("MODIS/006/MCD19A2_GRANULES").filterBounds(aoi)
          .filterDate(ee.Date(x), ee.Date(x).advance(1,'day'))
          .map(function(img){
                //Bit 13-14: 10 – Dust model (dust detected)
                var dust1 =   getQABits(img.select('AOD_QA'),13,14,'B13');
              return dust1.eq(2);
              });
          var img_mod=ee.Image(ee.Algorithms.If(img_mod_col.size().gt(0),img_mod_col.max(),ee.Image(0).rename('B13')));  
          var dust_storm = ee.Number(img_mod.select('B13').reduceRegion({
            reducer: 'max',
            geometry: aoi,//.difference(sedimentation_zone),
            scale: 500,
          }).get('B13'));
          return ee.Algorithms.If(dust_storm.eq(1),-1,x);
      }).filter(ee.Filter.neq('item',-1));
      //if dust storms are too frequent and there are no other choices - keep the images anyway
      l7_index=ee.List(ee.Algorithms.If(l7_index_tmp.length().gt(0),l7_index_tmp,l7_index));
      return l7_index;
}
function get_new_displacment(){
  var aoi= area_of_interest;
  var start_date_tmp=start_date;
  var end_date_tmp=end_date;
  var img_list_s2_tmp=img_list_s2;
  var withbands_s2_tmp=withbands_s2;
  if (year != 2030){//because if its 2020 we can coregister with the images that we need anyway
    start_date=ee.Date.fromYMD(2019, 1,1);
    end_date=ee.Date.fromYMD(2021,1,1);
    withbands_s2 = ee.ImageCollection('COPERNICUS/S2')
      .filterBounds(aoi)
    //get image from dry season
     .filterDate(start_date, end_date)
     .map(addbands_sen)
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cc_pix));
    var s2_cc =ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY")
      .filterBounds(aoi)
      .filterDate(start_date, end_date)
      .map(function(image){
        return image.set({'SENSING_TIME': ee.Date(image.get('system:time_start')).format('YYYY-MM-dd')});
      });
    var img_names_s2=withbands_s2.sort('system:time_start').aggregate_array('SENSING_TIME');
    img_list_s2=ee.Dictionary.fromLists(img_names_s2.distinct(), img_names_s2.distinct()).keys();
  }
  s2Projection = withbands_s2.first().select('MNDWI').projection();
  withMNDWI_l8=get_new_withMNDWI_l8();
  withMNDWI_l8=withMNDWI_l8.filter(ee.Filter.lt('cloud_cover', cc_thresh))
    .filter(ee.Filter.lt('nodata_cover', nodata_thresh));        
  var l8_index=get2020img4coreg_L8(aoi);
  displacement_L8=ee.Image(0).rename('X').addBands(ee.Image(0).rename('Y'));    
  var l8_img_tocoregister=ee.Algorithms.If(ee.Number(l8_index.length()).gt(0),l8_index.get(0),ee.String('no image to coregister!'));
  print('l8_img_tocoregister',l8_img_tocoregister);
  displacement_L8=ee.Image(ee.Algorithms.If(ee.Number(l8_index.length()).gt(0),coreg_getdisplacement(l8_index.get(0),'LANDSAT_8',area_of_interest),displacement_L8));
  ////////////////////////////
  //NOW LANDSAT 7
  displacement_L7=ee.Image(0).rename('X').addBands(ee.Image(0).rename('Y'));
  withMNDWI_l7=get_new_withMNDWI_l7();
  withMNDWI_l7=withMNDWI_l7.filter(ee.Filter.lt('cloud_cover', cc_thresh))
    .filter(ee.Filter.lt('nodata_cover', nodata_thresh_l7));
  var l7_index=get2020img4coreg_L7(aoi,withMNDWI_l7);
  //print('l7_index',l7_index)
  var l7_img_tocoregister=ee.Algorithms.If(ee.Number(l7_index.length()).gt(0),l7_index.get(0),ee.String('no image to coregister!'));
  print('l7_img_tocoregister',l7_img_tocoregister);
  displacement_L7=ee.Image(ee.Algorithms.If(ee.Number(l7_index.length()).gt(0),coreg_getdisplacement(l7_index.get(0),'LANDSAT_7',area_of_interest),displacement_L7));
  //print('displacement_L7',displacement_L7);
  start_date=start_date_tmp;
  end_date=end_date_tmp;
  img_list_s2=img_list_s2_tmp;
  withbands_s2=withbands_s2_tmp;
}
//var l8_img_tocoregister;
//var l7_img_tocoregister;
var l8Projection;
function get_new_l8(){ 
    //COREGISTRATION: ONLY ONCE FOR EACH FEATURE
    /*if (newfeature==1){
      get_new_displacment();
    }*/
      withMNDWI_l8=get_new_withMNDWI_l8();
      print('withMNDWI_l8 SENSING_TIME',withMNDWI_l8.aggregate_array('SENSING_TIME'));
      print('withMNDWI_l8 cloud_cover',withMNDWI_l8.aggregate_array('cloud_cover'));
      print('withMNDWI_l8 nodata_cover',withMNDWI_l8.aggregate_array('nodata_cover'));
      withMNDWI_l8=withMNDWI_l8.filter(ee.Filter.lt('cloud_cover', cc_thresh))
        .filter(ee.Filter.lt('nodata_cover', nodata_thresh));
    l8Projection = ee.Projection(ee.Algorithms.If(withMNDWI_l8.size().gt(0),withMNDWI_l8.first().select('B3').projection(),ee.Projection('EPSG:4326')));
      //displacement does not work for ID_592 (Chad)!
      //satelliteMap.layers().set(9, ui.Map.Layer(displacement_L8, {bands: (['dy']), palette:['yellow', 'white','red'],min: -50, max: 50}, "displacement L8"));
      withMNDWI_l8=withMNDWI_l8.map(slc_gapfill).map(coreg_L8); //.map(addbands_l8)
      print('withMNDWI_l8',withMNDWI_l8);
      //due to coregistration nodata fraction might increase - recalculate
      //withMNDWI_l8=withMNDWI_l8.map(cloudscore_L8_nodata);
      print('withMNDWI_l8 nodata_cover2',withMNDWI_l8.aggregate_array('nodata_cover'));
      withMNDWI_l8=withMNDWI_l8.filter(ee.Filter.lt('nodata_cover', nodata_thresh));
      ////////NOW LANDSAT 7//////////////
      if (year != 2030){//otherwise we have it already from coregistration
        withMNDWI_l7=get_new_withMNDWI_l7()
        //l8Projection = withMNDWI_l7.first().select('B2').projection();
        print('withMNDWI_l7 SENSING_TIME',withMNDWI_l7.aggregate_array('SENSING_TIME'));
        print('withMNDWI_l7 cloud_cover',withMNDWI_l7.aggregate_array('cloud_cover'));
        print('withMNDWI_l7 nodata_cover',withMNDWI_l7.aggregate_array('nodata_cover'));       
        withMNDWI_l7=withMNDWI_l7.filter(ee.Filter.lt('cloud_cover', cc_thresh))
          .filter(ee.Filter.lt('nodata_cover', nodata_thresh_l7));
      }
      //displacement does not work for ID_592 (Chad)!
      //satelliteMap.layers().set(10, ui.Map.Layer(displacement_L7, {bands: (['dy']), palette:['yellow', 'white','red'],min: -50, max: 50}, "displacement L7"));
      withMNDWI_l7=withMNDWI_l7.map(slc_gapfill).map(coreg_L7);      //.map(addbands_l7)
      //due to coregistration nodata fraction might increase - recalculate
      //withMNDWI_l7=withMNDWI_l7.map(cloudscore_L7_nodata);
      print('withMNDWI_l7 nodata_cover2',withMNDWI_l7.aggregate_array('nodata_cover'));
      withMNDWI_l7=withMNDWI_l7.filter(ee.Filter.lt('nodata_cover', nodata_thresh_l7));
    merged_landsat=withMNDWI_l7.merge(withMNDWI_l8).select(['B', 'G', 'R', 'NIR','SWIR1','MNDWI','cloud','NDVI'])
      .sort('system:time_start');
    var edge_img_landsat0 = merged_landsat
      .map(edgeOtsu_func_optical);
    edge_img_landsat=edge_img_landsat0.map(img_addMODIS);
    //.map(function(img){return img_addMODIS(img,modis_aero)})
    print('edge_img_landsat',edge_img_landsat);
    feat_area_l8 = ee.FeatureCollection(edge_img_landsat.map(img2feat_area))
    feat_area_l8 = ee.FeatureCollection(feat_area_l8.map(function(feat){
      return ee.Feature(null).copyProperties(feat,null,['area_water']).set('area_Landsat',feat.get('area_water')).set('system:time_start',feat.get('system:time_start'));
    }));
    print('feat_area_l8',feat_area_l8)
    var edge_img4DEM=edge_img_landsat.filter(ee.Filter.neq('otsu_th', 99))
      .map(get_elevation_DEM);
    print('edge_img4DEM',edge_img4DEM);      
    var edge_img4ALOS_landsat=edge_img4DEM
    .filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
    .merge(ee.FeatureCollection(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
    .sort('dem_elev',false).toList(99).slice(0,3)))
      .map(get_elevation_ALOS);
    //.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))));
    var edge_img2join=edge_img4DEM
        .filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
        .filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))))
        /*.merge(ee.FeatureCollection(edge_img4DEM.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))))
        .sort('dem_elev').toList(99).slice(0,3)))*/
        .merge(ee.FeatureCollection(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')).subtract(0.5)))
        .sort('dem_elev',false).toList(99).slice(0,3)));
    var edge_img_joined=joinCollections(edge_img2join, edge_img4ALOS_landsat);
    print('edge_img_joined',edge_img_joined);
    var delta_alos=ee.Number(ee.Algorithms.If(edge_img_joined.size().gt(0),ee.Number(edge_img_joined.aggregate_array('alos_elev').reduce(ee.Reducer.mean())).subtract(
      ee.Number(edge_img_joined.aggregate_array('dem_elev').reduce(ee.Reducer.mean()))),999));
    print('delta_alos landsat',delta_alos);
    edge_img4ALOS_landsat=edge_img4ALOS_landsat
      .map(function(img){return ee.Image(img).set('dem_elev',ee.Number(ee.Image(img).get('dem_elev')).subtract(delta_alos))});
    edge_img4ALOS_landsat=ee.ImageCollection(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))).aggregate_array('SENSING_TIME')
      .iterate(function(x,alos_input){
      return ee.FeatureCollection(alos_input).filter(ee.Filter.neq('SENSING_TIME', x));
    },edge_img4ALOS_landsat));
    print('edge_img4ALOS_landsat 0',edge_img4ALOS_landsat);
    //edge_img4ALOS_landsat=edge_img4ALOS_landsat.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))));
    //print('edge_img4ALOS_landsat 1',edge_img4ALOS_landsat);
    var edge_img_landsat_merged=edge_img4ALOS_landsat
    .merge(edge_img4DEM.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
    .merge(edge_img_landsat.filter(ee.Filter.eq('otsu_th', 99))).filter(dust_filter)
    .sort('system:time_start');
    feat_elev_l8 = ee.FeatureCollection(edge_img_landsat_merged.map(img2feat_elev).map(function(feat){
      return ee.Feature(null).copyProperties(feat,null,['dem_elev']).set('dem_elev_Landsat',feat.get('dem_elev')).set('system:time_start',feat.get('system:time_start'));
    }));
    print('feat_elev_l8 Landsat',feat_elev_l8);    
    var summed = edge_img_landsat0.select('remapped').reduce(ee.Reducer.sum());
    var prob = summed.divide(ee.Image(edge_img_landsat0.filter(ee.Filter.neq('otsu_th', 99)).size()));
    water_surface_probability_l8 = prob.clip(area_of_interest);
    var l8_size=ee.Number(edge_img_landsat0.filter(ee.Filter.neq('otsu_th', 99)).size());
    //per default set the slider to disabled
    slider5.setDisabled(true);
    var iteration_id_tmp = iteration_id;
    l8_size.evaluate(function(x){
      if (iteration_id == iteration_id_tmp){
        if (x>0){
          slider5.setDisabled(false);
        }
      }
    });
    satelliteMap.layers().set(3, ui.Map.Layer(water_surface_probability_l8, {min:0,max:1,palette:'white,blue'}, 'water surface probability L8',false).setOpacity(0));
    img_select_l8.setDisabled(true);
    img_select_l8.items().reset();
    img_select_l8.setPlaceholder('Please wait...');
    var img_names_l7l8=ee.ImageCollection(merged_landsat).aggregate_array('SENSING_TIME');
    img_list_landsat=ee.Dictionary.fromLists(img_names_l7l8.distinct(), img_names_l7l8.distinct()).keys();
    print('img_list_landsat',img_list_landsat);
    img_list_landsat.evaluate(function(result1){
    img_select_l8.items().reset(result1);
      img_select_l8.setPlaceholder('Select Landsat Scene');
      img_select_l8.setDisabled(false);
      img_select_l8.onChange(draw_l8);
    });
}
//////////////////////
var start_s2=0;
var start_l8=0;
/*
  var displacement = water_surface_probability_l8.displacement({
    referenceImage: water_surface_probability,
    maxOffset: 100.0,//The maximum offset allowed when attempting to align the input images, in meters
    projection: s2Projection,
    //stiffness: 5,
    patchWidth: 100 // Small enough to capture texture and large enough that ignorable 
    //objects are small within the patch. Automatically ditermined if not provided 
  });
  print('displacement',displacement)
  satelliteMap.layers().set(77, ui.Map.Layer(displacement, {bands:'dx',min:-100,max:100,palette:'white,blue'}, 'displacement L8',false));
*/
//-----------------------------------------------------------------------------------------
//VISUALIZATION
//-----------------------------------------------------------------------------------------
var draw_s2 = function(key){
          if (start_s2===0){
            start_s2=1;
            sliderPanel.clear();
            if (start_l8===0){
              satelliteMap.layers().get(4).setShown(false);//Lake polygon
              sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(1,ui.Label('Edge S-2', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(2,slider1_panel);
              sliderPanel.widgets().set(3,ui.Label('S2 RGB', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(4,slider3);
              sliderPanel.add(sliderPanel_base);
              satelliteMap.layers().set(9, ui.Map.Layer(dd,null, "area_of_interest"));
              //satelliteMap.layers().set(10, ui.Map.Layer(dl,{color: 'blue'}, "Lakes",false).setOpacity(0.2));
            } else {
              sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(1,ui.Label('Edge S-2', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(2,slider1_panel);
              sliderPanel.widgets().set(3,ui.Label('Edge Landsat', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(4,slider2_panel);
              sliderPanel.widgets().set(5,ui.Label('S2 RGB', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(6,slider3);
              sliderPanel.widgets().set(7,ui.Label('Landsat RGB', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(8,slider4);     
              sliderPanel.add(sliderPanel_base);
            }
          }
            var img1 = ee.Image(withbands_s2.filter(ee.Filter.eq('SENSING_TIME', key)).mosaic())
              //.addBands(ee.Image(modis_aero.filter(ee.Filter.eq('SENSING_TIME', key)).max()))
              //.addBands(ee.Image(s2_cc.filter(ee.Filter.eq('SENSING_TIME', key)).mosaic()))
              .addBands(ee.Image(s2_mosaicked.filter(ee.Filter.eq('SENSING_TIME', key)).first()).select(['cloud','probability']));
          //print('modis aero',modis_aero.filter(ee.Filter.eq('SENSING_TIME', key)));
            var feature4 = ee.Feature(feat_elev_s2.filter(ee.Filter.eq('SENSING_TIME', key)).first());
            satelliteMap.layers().set(6, ui.Map.Layer(img1, {bands: (['R', 'G', 'B']), min: 0, max: 3000}, 's2 RGB'));
            slider3.setValue(1);
            slider1.setValue(1);
            print('Lake shore scene: ', feature4);
          img_list_s2.evaluate(function(names) {
            img_select_s2.items().reset(names);
            img_select_s2.setPlaceholder('Sen-2: ' + key);
          });
          //DEBUGGING: LOOK AT HISTOGRAMS AND COMPARE X-MEANS WITH OTSU
          // compute threshold using Otsu thresholding
          var image=img1;
          var bounds=area_of_interest;
          var mndwi = image.select('MNDWI');
          var imgcloud = image.select('cloud');
          var maxValue=0.3;
          mndwi=mndwi.where(mndwi.gt(maxValue),maxValue);//bcs we do not want to detect edges between free water and vegetation overgrown water
          //OTSU THRESHOLD
          var scale=ee.Number(30);
          var th = morefunctions.computeThresholdUsingOtsu(mndwi.updateMask(imgcloud.lt(100)), scale, bounds, cannyThreshold, cannySigma, minValue, debug);
          /*print('th',th)
          var dem_min_elevation = ee.Number(ee.Algorithms.If(ee.Number(th).eq(99),null,
            ee.Number(dem.updateMask(dem.gte(ee.Number(dem_thislake.get('min_elev_perc_fit')))).updateMask(mndwi.gt(th)).reduceRegion({
              reducer: 'min',
              geometry: area_of_interest,
              scale: 10,
              tileScale: 16,
            }).get('b1'))));
          print('dem_min_elevation',dem_min_elevation);
            th=ee.Number(ee.Algorithms.If(ee.Algorithms.IsEqual(dem_min_elevation,null),th,ee.Number(ee.Algorithms.If(dem_min_elevation.gt(ee.Number(dem_thislake.get('min_elev_perc_fit')).add(0.1)),99,th))));
          print('th',th)*/
          //satelliteMap.layers().set(8, ui.Map.Layer(ee.Image(1).mask(getEdge(mndwi.gt(th))).clip(area_of_interest).updateMask(imgcloud.eq(0)), {palette:'#008000'}, 'water edge S2 xmeans'));
          //satelliteMap.layers().set(9, ui.Map.Layer(mndwi, {min: -0.3, max: 0.3}, 'mndwi',false));
          //satelliteMap.layers().set(10, ui.Map.Layer(show_second, {palette:'#04fff3'}, 'water edge S2',false));
          var th_veg = 0.5;
          var veg_edge=ee.Image(1).updateMask(
            img1.select('NDVI').gt(th_veg).focal_max({radius: 30, units: 'meters'}).subtract(img1.select('NDVI').gt(th_veg).focal_min({radius: 30, units: 'meters'}))
            );
          veg_edge=ee.Image(0).where(veg_edge.eq(1),1);  
          var dem_edge=ee.Image(1).mask(getEdge10m(mndwi.gt(th))).updateMask(imgcloud.lt(100));//.updateMask(veg_edge.neq(1))
          satelliteMap.layers().set(8, ui.Map.Layer(dem_edge.clip(area_of_interest), {palette:'#008000'}, 'Edge S2'));//.difference(sedimentation_zone)
        };
//-----------------------------------------------------------------------------------------
//VISUALIZATION
//-----------------------------------------------------------------------------------------
//workwiththisscale=Math.min(100, Math.max(40 * lakes.first().get('Lake_area') + 10, 10));              
//print('workwiththisscale',workwiththisscale);
var draw_l8 = function(key3){
          if (start_l8===0){
            start_l8=1;
            sliderPanel.clear();
            if (start_s2===0){
              sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(1,ui.Label('Edge Landsat', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(2,slider2_panel);
              sliderPanel.widgets().set(3,ui.Label('Landsat RGB', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(4,slider4); 
              sliderPanel.add(sliderPanel_base);
              //satelliteMap.layers().set(9, ui.Map.Layer(dd,null, "area_of_interest"));
              //satelliteMap.layers().set(10, ui.Map.Layer(dl,{color: 'blue'}, "Lakes",false).setOpacity(0.2));
            } else {
              sliderPanel.widgets().set(0,ui.Label('Opacity', {fontWeight: '450', fontSize: '14px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(1,ui.Label('Edge S-2', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(2,slider1_panel);
              sliderPanel.widgets().set(3,ui.Label('Edge Landsat', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(4,slider2_panel);
              sliderPanel.widgets().set(5,ui.Label('S2 RGB', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(6,slider3);
              sliderPanel.widgets().set(7,ui.Label('Landsat RGB', {fontWeight: '450', fontSize: '10px', margin: '1px 1px 1px 1px'}));
              sliderPanel.widgets().set(8,slider4);     
              sliderPanel.add(sliderPanel_base);
            }
          }
          var img1 = ee.Image(merged_landsat.filter(ee.Filter.eq('SENSING_TIME', key3)).first());
              //.addBands(ee.Image(modis_aero.filter(ee.Filter.eq('SENSING_TIME', key3)).max()));
          satelliteMap.layers().set(4, ui.Map.Layer(img1, {bands: (['R', 'G', 'B']), min: 0, max: 0.3}, 'RGB Landsat'));
          slider4.setValue(1);
          satelliteMap.layers().set(5, ui.Map.Layer(img1, {bands: 'MNDWI', min: -0.3, max: 0.3}, 'MNDWI',false));
          var feature2 = ee.Feature(feat_elev_l8.filter(ee.Filter.eq('SENSING_TIME', key3)).first());
          slider2.setValue(1);
          print('Lake shore scene Landsat: ', feature2);
            var plac=ee.String(feature2.get('SATELLITE')).cat(ee.String(' ')).cat(ee.Date(feature2.get('system:time_start')).format('YYYY/MM/dd'));
            plac.evaluate(function(result3){
              img_list_landsat.evaluate(function(names) {
                img_select_l8.items().reset(names);
                img_select_l8.setPlaceholder(result3);
              });
            });  
          //DEBUGGING: LOOK AT HISTOGRAMS AND COMPARE X-MEANS WITH OTSU
          var image=img1;
          var bounds=area_of_interest;
          var mndwi = image.select('MNDWI');
          var imgcloud = image.select('cloud');
          var maxValue=0.3;
          mndwi=mndwi.where(mndwi.gt(maxValue),maxValue);//bcs we do not want to detect edges between free water and vegetation overgrown water
          //OTSU THRESHOLD
          var scale=ee.Number(30);
          var th = morefunctions.computeThresholdUsingOtsu(mndwi.updateMask(imgcloud.lt(100)), scale, bounds, cannyThreshold, cannySigma, minValue, debug);
          //satelliteMap.layers().set(7, ui.Map.Layer(ee.Image(1).mask(getEdge(mndwi.gt(th))).clip(area_of_interest), {palette:'00FF00'}, 'Edge Landsat'));//.difference(sedimentation_zone)
          var th_veg = 0.5;
          var veg_edge=ee.Image(1).updateMask(
            img1.select('NDVI').gt(th_veg).focal_max({radius: 30, units: 'meters'}).subtract(img1.select('NDVI').gt(th_veg).focal_min({radius: 30, units: 'meters'}))
            );
          veg_edge=ee.Image(0).where(veg_edge.eq(1),1);  
          var dem_edge=ee.Image(1).mask(getEdge10m(mndwi.gt(th))).updateMask(imgcloud.lt(100));//.updateMask(veg_edge.neq(1))
          satelliteMap.layers().set(7, ui.Map.Layer(dem_edge.clip(area_of_interest), {palette:'00FF00'}, 'Edge Landsat'));//.difference(sedimentation_zone)
          //satelliteMap.layers().set(7, ui.Map.Layer(dem_edge.updateMask(veg_edge.neq(1)).clip(area_of_interest), {palette:'00FF00'}, 'Edge Landsat'));
          //var show_first=ee.Image(edge_img_landsat.filter(ee.Filter.eq('SENSING_TIME', key3)).first()).select('dem_edge');
          //satelliteMap.layers().set(7, ui.Map.Layer(show_first, {palette:'00FF00'}, 'Edge Landsat'));//.difference(sedimentation_zone)
          //satelliteMap.layers().set(9, ui.Map.Layer(show_second, {bands: 'b1', palette:'yellow'}, 'Otsu Landsat',false));//.difference(sedimentation_zone)
          //dem_edge=dem_thislake.mask(getEdge10m(mndwi.gt(th))).updateMask(imgcloud.lt(100));//.updateMask(veg_edge.neq(1))
          //satelliteMap.layers().set(9, ui.Map.Layer(dem_edge.clip(area_of_interest), {palette:'00FF00'}, 'Edge Landsat'));//.difference(sedimentation_zone)
          //var canny=ee.Algorithms.CannyEdgeDetector(mndwi.updateMask(imgcloud.lt(100)).gt(th),cannyThreshold, cannySigma);
          //canny = canny.updateMask(canny).reproject({crs: s2Projection.crs(), scale:10});
          //satelliteMap.layers().set(9, ui.Map.Layer(canny,{min: 0, max: 1, palette: 'FF0000'}, 'Canny',false));//.difference(sedimentation_zone)
};          
/////////CHARTS//////
var options_dic={
        //title: 'Surface Area Lac Wegnia',
        hAxis: {/*title:'Year',*/titleTextStyle:{fontSize: 12},viewWindowMode: 'maximized',textStyle:{fontSize: 10},gridlines: { count: 12 }},//
        /*trendlines: {
          0: {color: '00FF00',labelInLegend: 'Trendline L8',
                        showR2: false,
                        lineWidth: 4,
                        opacity: 0.2,
                        visibleInLegend: true},
          1: {color: '#008000',labelInLegend: 'Trendline S2',
                        showR2: false,
                        lineWidth: 4,
                        opacity: 0.2,
                        visibleInLegend: true}          
        }, */ 
        lineWidth: 1,
        pointSize: 2,
        legend: {position:"top",textStyle:{fontSize: 10}},
        fontSize: 22,
        series: {
          0: {color: '00FF00',pointShape: 'diamond',labelInLegend: 'Landsat 7/8'}, 
          1: {color: '#008000',labelInLegend: 'Sentinel-2'}, // 
          2: {color: 'red',labelInLegend: 'Average 2000-2020',lineWidth: 2,opacity: 0.2,}, // 
          //2: {color: '#d63000'},
        },
    vAxis: {title: 'Surface Area [km2]',titleTextStyle:{fontSize: 12},gridlines: { count: 0 },minValue: 0,textStyle:{fontSize: 10} }
};  
var options_dic2={
          //title: 'Surface Area Lac Wegnia',
        hAxis: {/*title:'Year',*/titleTextStyle:{fontSize: 10},viewWindowMode: 'maximized',textStyle:{fontSize: 10},gridlines: { count: 12 }},//
        lineWidth: 1,
        pointSize: 2,
        legend: {position:"top",textStyle:{fontSize: 10}},
        fontSize: 22,
        series: {
          //0: {targetAxisIndex: 0,color: 'black',labelInLegend: 'Sylvatrop DEM'}, 
          3: {color: '00FF00',pointShape: 'diamond',labelInLegend: 'Landsat 7/8'}, 
          4: {color: '#008000',labelInLegend: 'Sentinel-2'}, // 
          2: {color: 'red',labelInLegend: 'Average 2000-2020',lineWidth: 2,opacity: 0.2,}, 
          0: {color: 'grey',labelInLegend: 'Fitted Range',lineWidth: 1,visibleInLegend : true,pointsVisible: false},
          1: {color: 'grey',labelInLegend: 'Fitted Range',lineWidth: 1,visibleInLegend : false,pointsVisible: false},          
          //0: {targetAxisIndex: 0,color: '00FF00',labelInLegend: 'Icesat-2 DEM L7/L8',pointSize: 7,pointShape: 'triangle'}, // 
          //1: {targetAxisIndex: 0,color: '#008000',labelInLegend: 'Icesat-2 DEM S2',pointSize: 5},
        },
        vAxes: {
          0: {title: 'Level [m asl]',titleTextStyle:{fontSize: 12},textStyle:{fontSize: 10}}, //00FF00
          //1: {viewWindowMode:{max: 100},title: 'Cloud Cover'}
        },
        vAxis: {gridlines: { count: 0 } },//title: 'Dust Storm [no:0, yes:1]',gridlines: { count: 0 }
};  
function get_annual_ts(){
  panel_thisyear.widgets().set(0,ui.Label('Annual time-series:',{fontWeight: 'bold',fontSize: '16px',margin: '1px 10px 1px 1px',padding: '0'}));
  //var water_areas_s=ee.FeatureCollection(joinCollections(water_areas_s,ee.FeatureCollection(feat_area_s2)));
  //Filter out scenes with no water and dust storm
    var water_area_ts_S2;
    var water_area_ts_L8;
    var water_areas_s;
    long_term_areas=long_term_areas.map(function(feat){
      var month=ee.Number(ee.Feature(feat).get('month'));
      return ee.Feature(feat).set('system:time_start', ee.Date.fromYMD(ee.Number(year), month, 15));
    });
    long_term_average=long_term_average.map(function(feat){
      var month=ee.Number(ee.Feature(feat).get('month'));
      return ee.Feature(feat).set('system:time_start', ee.Date.fromYMD(ee.Number(year), month, 15));
    });
    elev_range=elev_range.map(function(feat){
      var month=ee.Number(ee.Feature(feat).get('month'));
      return ee.Feature(feat).set('system:time_start', ee.Date.fromYMD(ee.Number(year), month, 15));
    });
    if (year < 2021){
        //if (tsids)
        /*water_area_ts_S2=feat_area_s2.filter(dust_filter);
        water_area_ts_L8=feat_area_l8.filter(dust_filter);*/
      water_area_ts_S2=ee.FeatureCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(ts_thislake_S2,null),feat_area_s2.filter(dust_filter),ts_thislake_S2));  
      water_area_ts_S2=water_area_ts_S2.filterDate(start_date, end_date).sort('system:time_start')
        .filter(ee.Filter.gt('otsu_th', -0.3))
        .filter(ee.Filter.lt('cloud_cover', 5))
        .merge(water_area_ts_S2.filter(ee.Filter.gte('cloud_cover', 5)).map(function(img){return ee.Image(img).set('area_water',null)}))
        .sort('system:time_start');
      print('water_area_ts_S2',water_area_ts_S2);
      water_area_ts_L8=ee.FeatureCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(ts_thislake,null),feat_area_l8.filter(dust_filter),ts_thislake));  
      water_area_ts_L8=water_area_ts_L8.filterDate(start_date, end_date).sort('system:time_start')
        .filter(ee.Filter.gt('otsu_th', -0.3))
        .filter(ee.Filter.lt('cloud_cover', 10))
        .merge(water_area_ts_L8.filter(ee.Filter.gte('cloud_cover', 10)).map(function(img){return ee.Image(img).set('area_Landsat',null)}))
        .sort('system:time_start');
      print('water_area_ts_L8',water_area_ts_L8);
    } else {
      water_area_ts_S2=feat_area_s2.filter(dust_filter)
              .filter(ee.Filter.gt('otsu_th', -0.3));
      water_area_ts_L8=feat_area_l8.filter(dust_filter)
              .filter(ee.Filter.gt('otsu_th', -0.3));
    }
    if (year >= 2013 & year < 2021){ //only if not enough L8 images are available
      water_areas_s=ee.FeatureCollection([water_area_ts_L8.filter(ee.Filter.neq('SATELLITE', 'LANDSAT_7')),water_area_ts_S2,long_term_areas]).flatten();
    } else {
      water_areas_s=ee.FeatureCollection([water_area_ts_L8,water_area_ts_S2,long_term_areas]).flatten();
    }
  var completelist1=ee.List(['area_Landsat','area_water','amonthly']);
  var llist1=ee.List(['area_Landsat','amonthly']);
  var listofvariablestoplot1=completelist1;
  if (year <= 2015){
    var plot_waterarea_s2 = ui.Chart.feature.byFeature(water_areas_s, 'system:time_start',['area_Landsat','amonthly'])//
    //.setDataTable(ee.FeatureCollection(feat_area_s2))
    .setChartType('ScatterChart')
    .setOptions(options_dic)
    .setOptions({
      hAxis: {titleTextStyle:{fontSize: 10},viewWindowMode: 'maximized',textStyle:{fontSize: 10},gridlines: { count: 12 }},
      lineWidth: 1,
      pointSize: 2,
      legend: {position:"top",textStyle:{fontSize: 10}},
      fontSize: 22,
      series: {0: {color: '00FF00',pointShape: 'diamond',labelInLegend: 'Landsat 7/8'},
          1: {color: 'red',labelInLegend: 'Average 2000-2020',lineWidth: 2,opacity: 0.2,}}, 
      vAxes: {0: {title: 'Surface Area [km2]',titleTextStyle:{fontSize: 12},textStyle:{fontSize: 10}}},
      vAxis: {gridlines: { count: 0 }}
    });
    panel_thisyear.widgets().set(1,plot_waterarea_s2);
    //}
    var iteration_id_tmp=iteration_id;
  } else {
     /* if (year == 2015){
    //why may there be no S2 data? Because of sandstorms! Especially in 2015
    listofvariablestoplot1=ee.List(ee.Algorithms.If(ee.Number(edge_img_s2.filter(dust_filter).size()).gt(0),completelist1,llist1));
      }*/
       //sometimes feat_area_s2 arrives much quicker than feat_area_l8 (because no coregistration is necessary?). Plot the chart already without Landsat data! Need to find a solution.
        //in case no Sentinel images are available - show only Landsat areas
      print('Lake area plot',water_areas_s);
      print('listofvariablestoplot1',listofvariablestoplot1);
      //if (iteration_id == iteration_id_tmp){
        var plot_waterarea = ui.Chart.feature.byFeature(water_areas_s, 'system:time_start',['area_Landsat','area_water','amonthly'])//
        //.setDataTable(ee.FeatureCollection(feat_area_s2))
        .setChartType('ScatterChart')
        .setOptions(options_dic);
        panel_thisyear.widgets().set(1,plot_waterarea);
      //}
    //});
  }
  //now the water level plot
  var completelist2=ee.List(['dem_elev_Landsat','dem_elev']);
  var llist2=ee.List(['dem_elev_Landsat']);
  var listofvariablestoplot2=completelist2;
  //print('listofvariablestoplot2',listofvariablestoplot2);
  var water_level_ts_S2;
  var water_level_ts_L8;
  if (year < 2021){
    print('name_id_client',name_id_client);
      water_level_ts_S2=ee.FeatureCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(ts_thislake_S2,null),feat_elev_s2.filter(dust_filter),ts_thislake_S2))
        .filterDate(start_date, end_date)
        .filter(ee.Filter.gt('otsu_th', -0.3))
        .filter(ee.Filter.neq('otsu_th', 99));
      water_level_ts_S2=water_level_ts_S2
        .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
        .merge(
          water_level_ts_S2.filter(ee.Filter.and(ee.Filter.eq('SATELLITE', 'ALOS'),ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
          )
        .sort('system:time_start');
      print('water_level_ts_S2',water_level_ts_S2);
      water_level_ts_L8=ee.FeatureCollection(ee.Algorithms.If(ee.Algorithms.IsEqual(ts_thislake,null),feat_elev_l8.filter(dust_filter),ts_thislake/*.filter(ee.Filter.lt('edge_sedfrac', 0.5))*/))
        .filterDate(start_date, end_date)
        .filter(ee.Filter.gt('otsu_th', -0.3))
        .filter(ee.Filter.neq('otsu_th', 99));
      water_level_ts_L8=water_level_ts_L8
        .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
        .merge(
          water_level_ts_L8.filter(ee.Filter.and(ee.Filter.eq('SATELLITE', 'ALOS'),ee.Filter.gt('dem_elev_Landsat', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
          )
        .sort('system:time_start');
      print('water_level_ts_L8',water_level_ts_L8);
  } else {
      water_level_ts_S2=feat_elev_s2.filter(dust_filter)        
        .filter(ee.Filter.gt('otsu_th', -0.3));
      water_level_ts_L8=feat_elev_l8.filter(dust_filter)
        .filter(ee.Filter.gt('otsu_th', -0.3)); 
  }
  //ATTENTION: null VALUES CREATE PROBLEMS IF THEY APPEAR FIRST IN THE LIST OF FEATURES
  // it leads to the error “All series on a given axis must be of the same data type”
  // API is somehow assuming that the data type of that column is null...
  var water_level_ts_S2_2plot=water_level_ts_S2     
          /*.filter(ee.Filter.gte('dem_elev', ee.Number(dem_thislake.get('min_elev_perc_fit'))))
          .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
          .merge(water_level_ts_S2.filter(ee.Filter.lt('dem_elev', ee.Number(dem_thislake.get('min_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev',null)}))
          .merge(water_level_ts_S2.filter(ee.Filter.neq('SATELLITE', 'ALOS')).map(function(img){return ee.Image(img).set('dem_elev',null)}))
          */.sort('system:time_start');
  var water_level_ts_L8_2plot=water_level_ts_L8     
          /*.filter(ee.Filter.gte('dem_elev_Landsat', ee.Number(dem_thislake.get('min_elev_perc_fit'))))
          .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
          .merge(water_level_ts_L8.filter(ee.Filter.lt('dem_elev_Landsat', ee.Number(dem_thislake.get('min_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev_Landsat',null)}))
          .merge(water_level_ts_L8.filter(ee.Filter.neq('SATELLITE', 'ALOS')).map(function(img){return ee.Image(img).set('dem_elev_Landsat',null)}))
          */.sort('system:time_start');
  /*water_level_ts_S2=water_level_ts_S2.merge(edge_img4ALOS_s2).sort('system:time_start');
  water_level_ts_L8=water_level_ts_L8.merge(edge_img4ALOS_landsat.map(function(img){
      return ee.Feature(null).copyProperties(img,null,['dem_elev']).set('dem_elev_Landsat',img.get('dem_elev')).set('system:time_start',img.get('system:time_start'))}))
    .sort('system:time_start');*/
  function addALOS(checked){
    if (checked==1){
      water_level_ts_S2_2plot=water_level_ts_S2_2plot.merge(water_level_ts_S2     
          //.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
          .filter(ee.Filter.eq('SATELLITE', 'ALOS')))
        //.merge(edge_img4ALOS_s2)
        .sort('system:time_start');
      water_level_ts_L8_2plot=water_level_ts_L8_2plot.merge(water_level_ts_L8
          .filter(ee.Filter.eq('SATELLITE', 'ALOS')))
          //.filter(ee.Filter.gt('dem_elev_Landsat', ee.Number(dem_thislake.get('max_elev_perc_fit')))))
        .sort('system:time_start');
        /*.merge(edge_img4ALOS_landsat.map(function(img){
          return ee.Feature(null).copyProperties(img,null,['dem_elev']).set('dem_elev_Landsat',img.get('dem_elev')).set('system:time_start',img.get('system:time_start'))}))
        .sort('system:time_start');*/
    } else {
      water_level_ts_S2_2plot=water_level_ts_S2_2plot
          .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
            //.filter(ee.Filter.lte('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit'))))
          //.merge(water_level_ts_S2.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev',null)}))
          .merge(water_level_ts_S2.filter(ee.Filter.neq('SATELLITE', 'ALOS')).map(function(img){return ee.Image(img).set('dem_elev',null)}))
            .sort('system:time_start');
      water_level_ts_L8_2plot=water_level_ts_L8_2plot
          .filter(ee.Filter.neq('SATELLITE', 'ALOS'))
            //.filter(ee.Filter.lte('dem_elev_Landsat', ee.Number(dem_thislake.get('max_elev_perc_fit'))))        
            //.merge(water_level_ts_L8.filter(ee.Filter.gt('dem_elev_Landsat', ee.Number(dem_thislake.get('max_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev_Landsat',null)}))
            .merge(water_level_ts_L8.filter(ee.Filter.neq('SATELLITE', 'ALOS')).map(function(img){return ee.Image(img).set('dem_elev_Landsat',null)}))
            .sort('system:time_start');
    }
    plotelevation();
  }
  function addExtra(checked){
    if (checked==1){
      water_level_ts_S2_2plot=water_level_ts_S2_2plot.filter(ee.Filter.neq('dem_elev', null))
            .merge(water_level_ts_S2.filter(ee.Filter.lt('dem_elev', ee.Number(dem_thislake.get('min_elev_perc_fit'))))
            //.merge(water_level_ts_S2.filter(ee.Filter.gt('dem_elev', ee.Number(dem_thislake.get('max_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev',null)}))
        ).sort('system:time_start');
      water_level_ts_L8_2plot=water_level_ts_L8_2plot.filter(ee.Filter.neq('dem_elev_Landsat', null))
            .merge(water_level_ts_L8.filter(ee.Filter.lt('dem_elev_Landsat', ee.Number(dem_thislake.get('min_elev_perc_fit'))))
            //.merge(water_level_ts_L8.filter(ee.Filter.gt('dem_elev_Landsat', ee.Number(dem_thislake.get('max_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev_Landsat',null)}))
        ).sort('system:time_start');
    } else {
      water_level_ts_S2_2plot=water_level_ts_S2_2plot          
          .filter(ee.Filter.gte('dem_elev', ee.Number(dem_thislake.get('min_elev_perc_fit'))))
          .merge(water_level_ts_S2.filter(ee.Filter.lt('dem_elev', ee.Number(dem_thislake.get('min_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev',null)}))
        .sort('system:time_start');
      water_level_ts_L8_2plot=water_level_ts_L8_2plot         
          .filter(ee.Filter.gte('dem_elev_Landsat', ee.Number(dem_thislake.get('min_elev_perc_fit'))))
          .merge(water_level_ts_L8.filter(ee.Filter.lt('dem_elev_Landsat', ee.Number(dem_thislake.get('min_elev_perc_fit')))).map(function(img){return ee.Image(img).set('dem_elev_Landsat',null)}))
          .sort('system:time_start');      
    }
    plotelevation();
  }  
  function plotelevation(){
    var prop_s2=ee.FeatureCollection([water_level_ts_S2_2plot,water_level_ts_L8_2plot,long_term_average,elev_range]).flatten();//.filter(ee.Filter.gt('dem_elev', -10))
    print('prop_s2',prop_s2);
    if (year <= 2015){
      var plot_waterlevel_S2 = ui.Chart.feature.byFeature(ee.FeatureCollection([elev_range,long_term_average,water_level_ts_L8_2plot]).flatten(), 'system:time_start',['min_bound','max_bound','hmonthly','dem_elev_Landsat'])
        .setChartType('ScatterChart')
        .setOptions({
          hAxis: {titleTextStyle:{fontSize: 10},viewWindowMode: 'maximized',textStyle:{fontSize: 10},gridlines: { count: 12 }},
          lineWidth: 1,
          pointSize: 2,
          legend: {position:"top",textStyle:{fontSize: 10}},
          fontSize: 22,
          /*categories:{
            0: { type: 'number'} , 
            1: { type: 'number'} 
          },*/
      series: {3: {color: '00FF00',pointShape: 'diamond',labelInLegend: 'Landsat 7/8'},
          2: {color: 'red',labelInLegend: 'Average 2000-2020',lineWidth: 2,opacity: 0.2,},
          0: {color: 'grey',labelInLegend: 'Fitted Range',lineWidth: 1,visibleInLegend : true,pointsVisible: false},
          1: {color: 'grey',labelInLegend: 'Fitted Range',lineWidth: 1,visibleInLegend : false,pointsVisible: false},          
      },  vAxes: {0: {title: 'Water Level [m asl]',titleTextStyle:{fontSize: 12},textStyle:{fontSize: 10}}},
          vAxis: {gridlines: { count: 0 }}
        });
      panel_thisyear.widgets().set(2,plot_waterlevel_S2);
    }  else {
      print('Lake elevation plot',prop_s2);
      var plot_waterlevel = ui.Chart.feature.byFeature(prop_s2, 'system:time_start',['min_bound','max_bound','hmonthly','dem_elev_Landsat','dem_elev'])
        .setChartType('ScatterChart')
        .setOptions(options_dic2);
      panel_thisyear.widgets().set(2,plot_waterlevel); 
      //}
    //});
    }
  }
  //var prop_s2=ee.FeatureCollection([s2_cc_feat,feat_elev_s2,feat_elev_l8]).flatten().sort('system:time_start');
  //print('feat_elev_l8.filter(dust_filter)',feat_elev_l8.filter(dust_filter))
  //var alospanel;
  var alos_checkbox=ui.Checkbox({label:'Use ALOS DEM data above fitted range',value: true,style:{width: '190px'}});
  var extrapolate_checkbox=ui.Checkbox({label:'Extrapolate below fitted range',value: true,style:{width: '190px'}});
  var checkbox_panel=ui.Panel([alos_checkbox,extrapolate_checkbox], ui.Panel.Layout.Flow('horizontal'));
  plotelevation();
  alos_checkbox.onChange(function(checked) {
    addALOS(checked);
    //alos_checkbox.setDisabled(true);
  });
  extrapolate_checkbox.onChange(function(checked) {
    addExtra(checked);
    //extrapolate_checkbox.setDisabled(true);
  });
  //extrapolate_checkbox.setValue(true);
  //alos_checkbox.setValue(true);
}
function get_trend_panel(){
    panel_trend.widgets().set(0,ui.Label('Water Level Trend Analysis:',{fontWeight: 'bold',fontSize: '16px',margin: '1px 10px 1px 1px',padding: '0'}));
  panel_trend.widgets().set(1, 
     ui.Panel([ui.Label('Trend analysis plot:', {fontSize: '14px', margin: '15px 10px 1px 1px'}),ui.Select({items: [ 
      {label:  'Dry Season (Oct-May)', value: 0},
      {label:  'Jan-March', value: 1},
      {label:  'Apr-June', value: 2},
      {label:  'July-Sep', value: 3},
      {label:  'Oct-Dec', value: 4}
     ],
    onChange: function(key){
      season=key;
      print_and_plot_trend(monthly_anomalies_L8,season,true,selectedLake);
    }}).setPlaceholder(season_labels[season])
      ], ui.Panel.Layout.Flow('horizontal'))
  ); 
  print_and_plot_trend(monthly_anomalies_L8,season,true,selectedLake);  
  panel_trend.widgets().set(3,ui.Label('Dry Season Trend [mm/year]: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
  var trend0=ee.Number(stats_thislake.get('trend0')).multiply(1000).round();
  var pval0=ee.Number(stats_thislake.get('pvalue0')).multiply(10000).round().divide(10000);
  trend0.evaluate(function(result){
    pval0.evaluate(function(result2){
      panel_trend.widgets().set(3,ui.Label('Dry Season Trend: '+ result + ' mm/year (p-value: ' + result2 + ')', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
  });
  panel_trend.widgets().set(4,ui.Label('Dry Season Trend, fitted elevation range [mm/year]: ', {fontSize: '10px',maxWidth: '380px', margin: '1px 1px 1px 1px'}));
  var trend5=ee.Number(stats_thislake.get('trend_perfect')).multiply(1000).round();
  var pval5=ee.Number(stats_thislake.get('pvalue_perfect')).multiply(10000).round().divide(10000);
  trend5.evaluate(function(result){
    pval5.evaluate(function(result2){
      panel_trend.widgets().set(4,ui.Label('Dry Season Trend, fitted elevation range: '+ result + ' mm/year (p-value: ' + result2 + ')', {fontSize: '10px',maxWidth: '380px', margin: '1px 1px 1px 1px'}));
    });
  });
  panel_trend.widgets().set(5,ui.Label('January-March Trend [mm/year]: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
  var trend1=ee.Number(stats_thislake.get('trend1')).multiply(1000).round();
  var pval1=ee.Number(stats_thislake.get('pvalue1')).multiply(10000).round().divide(10000);
  trend1.evaluate(function(result){
    pval1.evaluate(function(result2){
      panel_trend.widgets().set(5,ui.Label('January-March Trend: '+ result + ' mm/year (p-value: ' + result2 + ')', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
  });
  panel_trend.widgets().set(6,ui.Label('April-June Trend [mm/year]: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
  var trend2=ee.Number(stats_thislake.get('trend2')).multiply(1000).round();
  var pval2=ee.Number(stats_thislake.get('pvalue2')).multiply(10000).round().divide(10000);
  trend2.evaluate(function(result){
    pval2.evaluate(function(result2){
      panel_trend.widgets().set(6,ui.Label('April-June Trend: '+ result + ' mm/year (p-value: ' + result2 + ')', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
  });
  panel_trend.widgets().set(7,ui.Label('July-September Trend [mm/year]: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
  var trend3=ee.Number(stats_thislake.get('trend3')).multiply(1000).round();
  var pval3=ee.Number(stats_thislake.get('pvalue3')).multiply(10000).round().divide(10000);
  trend3.evaluate(function(result){
    pval3.evaluate(function(result2){
      panel_trend.widgets().set(7,ui.Label('July-September Trend: '+ result + ' mm/year (p-value: ' + result2 + ')', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
  });
  panel_trend.widgets().set(8,ui.Label('October-December Trend [mm/year]: ', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
  var trend4=ee.Number(stats_thislake.get('trend4')).multiply(1000).round();
  var pval4=ee.Number(stats_thislake.get('pvalue4')).multiply(10000).round().divide(10000);
  trend4.evaluate(function(result){
    pval4.evaluate(function(result2){
      panel_trend.widgets().set(8,ui.Label('October-December Trend: '+ result + ' mm/year (p-value: ' + result2 + ')', {fontSize: '10px', margin: '1px 1px 1px 1px'}));
    });
  });
}
//panel_outputs.add(panel_thisyear);
//print('panel_thisyear',panel_thisyear.widgets().get(0).getOptions());
var dl = ee.Image().paint(ee.FeatureCollection([]), 0, 2);
var dd=dl;
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
satelliteMap.addLayer(dl,null,'dummy layer',false);
//satelliteMap.addLayer(Rivers,null,'WWF Rivers');
//Map.addLayer(lakes.geometry().buffer(1000,5),false)
//select_adm0.setValue(country_name);
    /*country_summary=country_summary.map(function(feat){ //remove those lines once the country summaries are updated with the correct geometries
      var selectedLake = ee.Feature(Lakes_Sahel.filter(ee.Filter.eq('Name', ee.String(ee.Feature(feat).get('ID')))).first()).geometry();
      return ee.Feature(selectedLake).copyProperties(ee.Feature(feat));
    });*/
var pointclick;
var pointclick_incountry;
var select_adm0b = ui.Select({items: country_list,onChange:function(key) {
    redraw(key);
    //select_adm0b.items().reset(country_list);
    select_adm0b.setValue(null, false);
    select_adm0b.setPlaceholder('Select a Country ...');
    select_adm0.setPlaceholder(key);
}}).setPlaceholder('Select a Country ...'); 
var select_adm0_first = ui.Panel([select_adm0b], ui.Panel.Layout.Flow('horizontal'));
comps_first.add(select_adm0_first);
var selectPanel_first = ui.Panel({widgets : [/*hydrosolutions_manual,*/comps_first],layout: ui.Panel.Layout.flow('vertical'), style :{position : "top-left",maxWidth: "250px"}});
//var country_list1=['BurkinaFaso',	'Chad','Mali',	'Mauritania',	'Nigeria','Niger'];//only Sahel countries
var country_list1=['BurkinaFaso',	'Chad',	'Ethiopia',	'Mali',	'Mauritania',	'Niger',	'Nigeria',	'Senegal',	'Somalia',	'Sudan'];//only Sahel countries
var country_summaries=ee.FeatureCollection(ee.data.listAssets('users/magosilvain/Sahel_Timeseries/country_summaries').assets.map(function(ic){ 
      var country= ee.String(ic.id.split('_summary_')[1]);
      return ee.FeatureCollection(ic.id).set('COUNTRY',country);
    }));
print('country_summaries',country_summaries);
function reselect(){
  satelliteMap.add(selectPanel_first);
  satelliteMap.remove(selectPanel);
  satelliteMap.remove(sliderPanel);
  satelliteMap.add(sliderPanel);
  satelliteMap.remove(Logos_PANEL);
  satelliteMap.add(Logos_PANEL);
  season=0;
  panel_outputs.remove(panel_thisyear);
  panel_outputs.remove(panel_trend);
  panel_outputs.remove(panel_sedzone);
  satelliteMap.remove(legend);
  satelliteMap.remove(trend_panel);
  panel_thisyear.clear();
  panel_sedzone.clear();
  panel_trend.clear();
    satelliteMap.centerObject(Lakes_Sahel0,5);
    satelliteMap.remove(img_select_s2);
    satelliteMap.remove(img_select_l8);
  //satelliteMap.centerObject(selectedCountry,7);
    satelliteMap.add(trend_panel);
    satelliteMap.unlisten(sedclick);
    satelliteMap.unlisten(pointclick_incountry);
    lake_label.setValue("");
    satelliteMap.style().set('cursor', 'crosshair');
    satelliteMap.setControlVisibility(false);
    satelliteMap.setControlVisibility({zoomControl: true, layerList: true});
    sliderPanel.clear();
    sliderPanel.add(title_first);
    feat_centroids=country_list1.map(function(x){
      var country_name= x;
      /*var path= 'users/magosilvain/Sahel_Timeseries/country_summaries/country_summary_' + country_name;
      var stats_thiscountry=ee.FeatureCollection(ee.data.getAsset(path).id).set('COUNTRY',country_name);
      */
      var stats_thiscountry=ee.FeatureCollection(country_summaries.filter(ee.Filter.eq('COUNTRY', country_name.replace(' ','') + '_final')).first());
      var country_summary=stats_thiscountry
      /*.filter(ee.Filter.lt('bias', 0.3))*/
      .filter(ee.Filter.lt('bias_rel', 10))
      /*.filter(ee.Filter.lt('rmse', 0.6))*/
        .filter(ee.Filter.lt('rmse_rel', 20))
        .filter(ee.Filter.gt('correlation', 0.8))
        .filter(ee.Filter.or(ee.Filter.lt('bias_rel_fitted', 10),ee.Filter.lt('rmse_rel_fitted', 20)));//??
      var centroids_thiscountry=ee.FeatureCollection(country_summary.map(function(feat){return ee.Feature(feat).centroid()}));
      return centroids_thiscountry;
    });
   /* Export.table.toDrive({ 
      collection: ee.FeatureCollection(feat_centroids).flatten().map(function(feat){return ee.Feature(feat).set('Name',ee.Number.parse(ee.String(ee.Feature(feat).get('ID')).slice(3)))}),
      description: 'feature_stats_and_centroids',
      fileFormat: 'KML',
    });*/
    print('feat_centroids',feat_centroids);
    feat_centroids=ee.FeatureCollection(feat_centroids).flatten();
    print('total number of features',feat_centroids.size());
    collection_ids=feat_centroids.aggregate_array('ID').map(function(x){return ee.Number.parse(ee.String(x).slice(3))});
    Lakes_Sahel = Lakes_Sahel0.filter(ee.Filter.inList("ID", collection_ids))
      .map(function(feat){return ee.Feature(feat).set('Name',ee.String('ID_').cat(ee.Number.parse(feat.get('ID'))))});
    drawingMode=true;
    season_overall=0;
    plot_centroids(season_overall);
  pointclick=satelliteMap.onClick(function(coords) {
    if(drawingMode){
      //point = ee.Geometry.Point(coords.lon, coords.lat);
      point = ee.Geometry.Point(coords.lon, coords.lat).buffer(5000,500);
      //get the name of selected lake
      //var lake_name=ee.Feature(Lakes_Sahel.filterBounds(point).first()).get('Name');
      //var lake_name=ee.Feature(country_summary.filterBounds(point).first()).get('ID');
      var lake_name=ee.Feature(feat_centroids.filterBounds(point).first()).get('ID');
      satelliteMap.style().set('cursor', 'hand');
      drawingMode=false;
      ee.Number(feat_centroids.filterBounds(point).size()).evaluate(function(result){
        if (result===0){
          satelliteMap.style().set('cursor', 'crosshair');
          drawingMode=true;
          satelliteMap.add(title2);    
          var task2= ui.util.debounce( function() {
            satelliteMap.remove(title2);
          },5000);
          task2();
        } else {
          //satelliteMap.remove(title);
          selectedCountry = ee.Feature(adm_0.filterBounds(point).first());
          country_name = selectedCountry.get('COUNTRY_NA')
          print('country_name',country_name);
          satelliteMap.centerObject(point,11);
          print('lake_name',lake_name);
          print('lake_area',ee.Feature(Lakes_Sahel.filterBounds(point).first()).get('area'));
          //if the lake are is smaller than 1 km2 proportionally increase workwiththisscale
          //var Lake_area=ee.Number(ee.Feature(Lakes_Sahel.filterBounds(point).first()).get('area'));
          //workwiththisscale=ee.Number(100).min(ee.Number(40).multiply(Lake_area).add(10).round().max(10));              
          //print('workwiththisscale',workwiththisscale);
          //name_id_client=key2;
          ee.String(lake_name).evaluate(function(xx) {
            ee.String(country_name).evaluate(function(yy) {
              country_name=yy;
              redraw2(xx);
            });
          });
          //redraw2(lake_name.getInfo());
        }
      });
    }  
  });
}
reselect();