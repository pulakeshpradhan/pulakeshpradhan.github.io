var adm0 = ui.import && ui.import("adm0", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    adm1 = ui.import && ui.import("adm1", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1"),
    adm2 = ui.import && ui.import("adm2", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    JRC_water = ui.import && ui.import("JRC_water", "image", {
      "id": "JRC/GSW1_2/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_2/GlobalSurfaceWater"),
    JRC_monthly = ui.import && ui.import("JRC_monthly", "imageCollection", {
      "id": "JRC/GSW1_2/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_2/MonthlyHistory"),
    JRC_yearly = ui.import && ui.import("JRC_yearly", "imageCollection", {
      "id": "JRC/GSW1_2/YearlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_2/YearlyHistory"),
    basins5 = ui.import && ui.import("basins5", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_5"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5"),
    basins6 = ui.import && ui.import("basins6", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_6"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_6"),
    basins7 = ui.import && ui.import("basins7", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_7"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7"),
    basins8 = ui.import && ui.import("basins8", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_8"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8"),
    S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_clouds = ui.import && ui.import("S2_clouds", "imageCollection", {
      "id": "COPERNICUS/S2_CLOUD_PROBABILITY"
    }) || ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY"),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_RT_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA"),
    VIIRS = ui.import && ui.import("VIIRS", "imageCollection", {
      "id": "NOAA/VIIRS/001/VNP09GA"
    }) || ee.ImageCollection("NOAA/VIIRS/001/VNP09GA"),
    MERIT = ui.import && ui.import("MERIT", "image", {
      "id": "MERIT/DEM/v1_0_3"
    }) || ee.Image("MERIT/DEM/v1_0_3"),
    MERIT_HAND = ui.import && ui.import("MERIT_HAND", "image", {
      "id": "users/arjenhaag/SERVIR-Mekong/HAND_MERIT"
    }) || ee.Image("users/arjenhaag/SERVIR-Mekong/HAND_MERIT"),
    SentinelAsia_VIIRS = ui.import && ui.import("SentinelAsia_VIIRS", "image", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/KHM_Flood_27-31Oct_NOAA_VIIRS"
    }) || ee.Image("users/arjenhaag/CambodiaFloodsOct2020/KHM_Flood_27-31Oct_NOAA_VIIRS"),
    SentinelAsia_ALOS = ui.import && ui.import("SentinelAsia_ALOS", "image", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/Cambodia_flood2020"
    }) || ee.Image("users/arjenhaag/CambodiaFloodsOct2020/Cambodia_flood2020"),
    SentinelAsia_RS2 = ui.import && ui.import("SentinelAsia_RS2", "table", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/Detected_Flood_Water_in_Cambodia_RS2_20201030"
    }) || ee.FeatureCollection("users/arjenhaag/CambodiaFloodsOct2020/Detected_Flood_Water_in_Cambodia_RS2_20201030"),
    HYDRAFloods_WFP = ui.import && ui.import("HYDRAFloods_WFP", "imageCollection", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_WFP"
    }) || ee.ImageCollection("users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_WFP"),
    HYDRAFloods = ui.import && ui.import("HYDRAFloods", "imageCollection", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods"
    }) || ee.ImageCollection("users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods"),
    HYDRAFloods_daily = ui.import && ui.import("HYDRAFloods_daily", "imageCollection", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_daily"
    }) || ee.ImageCollection("users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_daily"),
    HYDRAFloods_DF = ui.import && ui.import("HYDRAFloods_DF", "imageCollection", {
      "id": "users/kelmarkert/kh_hf_water_oct2020"
    }) || ee.ImageCollection("users/kelmarkert/kh_hf_water_oct2020"),
    rivers = ui.import && ui.import("rivers", "table", {
      "id": "users/gena/HydroRIVERS_v10"
    }) || ee.FeatureCollection("users/gena/HydroRIVERS_v10");
// Cambodia floods October 2020
/*
Sentinel-Asia page: https://sentinel-asia.org/EO/2020/article20201017KH.html
- add texts (pop-up boxes using 'i' button?) to explain things in more detail
- add text explaining water areas, pros and cons of each dataset/method:
  - Sentinel-Asia datasets only contain (potential) flood water, not other water,
    and since 'other' water is not standard and can be quite a lot in some areas,
    as this really depends on what 'pre-flood' image/classification was used,
    it is hard to compare with each other and with HYDRAFloods
    Only the ALOS one has 'reference' or 'pre-flood' water, which is added to the
    flood water for better comparison. Of course this could lead to overestimation,
    as not all of the previously present water might still be there during the flood.
  - The Sentinel-Asia VIIRS is spread out over multiple days, so because of that could
    also be an overestimation. On the other hand, VIIRS is hindered by clouds, which
    could lead to underestimation. Finally, there is a resolution effect (see below).
  - There can be both over- and underestimations due to resolution effects:
    - higher resolution can include more detailed info, smaller water courses, etc.,
      which could lead to larger total water areas
    - on the other hand, lower resolution can classify large pixels as water while
      these are in fact only partially water/flooded, also leading to larger areas
    - as such, it cannot be said that certain resolution will directly lead to a
      certain outcome, as it can swing both ways, however, in the case of the lower res
      VIIRS flood maps, it seems there is a clear overestimation there.
- Sentinel-2 has a very interesting image on Oct 20, explore in more detail!
*/
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// AoI
var country_na = 'Cambodia';
var amd1_na_1 = ['Battambang', 'Banteay Meanchey', 'Pursat'];
var adm1_na_2 = ['Pursat', 'Battambang', 'Pailin', 'Kampong Speu', 'Kampong Chhnang', 'Banteay Meanchey', 'Phnom Penh'];
// dates
var date_start = '2020-10-01';
var date_end   = '2020-11-01';
var dates = [
  'Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11',
  'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21',
  'Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26', 'Oct 27', 'Oct 28', 'Oct 29', 'Oct 30', 'Oct 31'
];
// bands
var S2_BANDS  = ['B2',   'B3',    'B4',  'B8',  'B11',   'B12'];
var L8_BANDS  = ['B2',   'B3',    'B4',  'B5',  'B6',    'B7'];
var STD_NAMES = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
var VIIRS_BANDS = ['M3',  'M4',   'M5', 'M7', 'M10',  'M11'];
// var VIIRS_BANDS = ['M3',  'M4',   'I1', 'I2', 'I3',  'M11'];
var VIIRS_NAMES = ['blue','green','red','nir','swir1','swir2'];
// visual parameters
var visParams_DEM         = {min:0, max:200, palette:['white','blue','green','yellow','red']};
var visParams_HAND        = {min:0, max:50, palette:['white','blue','green','yellow','red']};
var visParams_S1          = {bands:['VV'], min:-30, max:0};
var visParams_S2_false    = {bands:['swir1','nir','green'], min:0, max:5000};
var visParams_L8_RGB      = {bands:['red','green','blue'], min:0, max:0.5};
var visParams_L8_false    = {bands:['swir1','nir','green'], min:0, max:0.5};
var visParams_VIIRS_RGB   = {bands:['red','green','blue'], min:0, max:10000, gamma:2.5};
var visParams_VIIRS_false = {bands:['swir1','nir','green'], min:0, max:10000, gamma:2.5};
var visParams_MNDWI       = {min:-1, max:1, palette:['white','blue']};
var visParams_water       = {min:0, max:1, palette:['white','blue']};
var visParams_water_diff  = {min:-1,max:1,palette:['green','white','blue']};
var palette_water = ['#209be4', '#0000e0'];  // permanent/regular and flooded water
// UI
var fontSize_intro = '12px';
var fontSize_sub   = '11px';
// choose water maps
// var water = ee.ImageCollection('projects/cemis-camp/assets/dailyWaterV2');
// var water = HYDRAFloods_WFP;
var water = HYDRAFloods_daily;
// var water = HYDRAFloods_DF;
// ----------------------------------------------------------------------------------------- //
// Prep
// ----------------------------------------------------------------------------------------- //
// analysis regions
adm0 = adm0.filter(ee.Filter.eq('ADM0_NAME', country_na));
adm1 = adm1.filter(ee.Filter.eq('ADM0_NAME', country_na));
adm2 = adm2.filter(ee.Filter.eq('ADM0_NAME', country_na));
var adm1_focus_1 = adm1.filter(ee.Filter.inList('ADM1_NAME', amd1_na_1));
var adm1_focus_2 = adm1.filter(ee.Filter.inList('ADM1_NAME', adm1_na_2));
basins5 = basins5.filterBounds(adm0.geometry());
basins6 = basins6.filterBounds(adm0.geometry());
basins7 = basins7.filterBounds(adm0.geometry());
basins8 = basins8.filterBounds(adm0.geometry());
var regions = ee.Dictionary({
  'None': null,
  // 'Admin level 0': adm0,
  'Admin level 1': adm1,
  'Admin level 2': adm2,
  // 'Basins level 5': basins5,
  'Basins level 6': basins6,
  'Basins level 7': basins7,
  'Basins level 8': basins8
});
// filter collections
// water = water.filter(ee.Filter.gte('system:index', date_start.replace('-','').replace('-','')))
//             .filter(ee.Filter.lt('system:index', date_end.replace('-','').replace('-','')));
water = water.filterDate(date_start, date_end);
HYDRAFloods_WFP = HYDRAFloods_WFP.filterDate(date_start, date_end);
// HYDRAFloods_daily = HYDRAFloods_daily.filterDate(date_start, date_end);
HYDRAFloods_DF = HYDRAFloods_DF.filterDate(date_start, date_end);
// print('HYDRAFLoods (WFP) images:', water.size());
// print('HYDRAFLoods (custom) images:', water.size());
// print('HYDRAFLoods (data fusion) images:', HYDRAFloods_DF.size());
// print(HYDRAFloods_DF.aggregate_array('system:time_start').map(function(d){
//   return ee.Date(d);
// }));
S1 = S1.filterDate(date_start, date_end)
       .filterBounds(adm0.geometry().bounds());
// print('Sentinel-1 images:', S1.size());
S2 = S2.filterDate(date_start, date_end)
       .filterBounds(adm0.geometry().bounds())
       .select(S2_BANDS, STD_NAMES);
// print('Landsat 8 images:', L8.size());
L8 = L8.filterDate(date_start, date_end)
       .filterBounds(adm0.geometry().bounds())
       .select(L8_BANDS, STD_NAMES);
// print('Landsat 8 images:', L8.size());
VIIRS = VIIRS.filterDate(date_start, date_end).select(VIIRS_BANDS, VIIRS_NAMES);
// print('VIIRS images:', VIIRS.size());
// JRC global surface water
var JRC_occurrence = JRC_water.select('occurrence').clip(adm0.geometry().bounds());
var JRC_max = JRC_water.select('max_extent').clip(adm0.geometry().bounds());
var JRC_Oct = JRC_monthly.filter(ee.Filter.eq('month',10)).map(function(img) {return img.eq(2).copyProperties(img, ['year'])});
var JRC_Oct_max = JRC_Oct.max().clip(adm0.geometry().bounds());
// HYDRAFloods water
var perm_water = ee.Image(HYDRAFloods_WFP.first()).select('permanentwater');
// var water_max = water.select('dailywater').max();
var water_max = water.select('water').max();
// var HYDRAFloods_max = HYDRAFloods_daily.select('water').max();
var HYDRAFloods_WFP_max = HYDRAFloods_WFP.select('dailywater').max();
var HYDRAFloods_DF_max = HYDRAFloods_DF.select('water').max();
// Sentinel-Asia ALOS floodmap (7 and 21 Oct)
var SentinelAsia_ALOS_7oct  = SentinelAsia_ALOS.select(0).gte(100);
// var SentinelAsia_ALOS_21oct = SentinelAsia_ALOS.select(0).lt(100).and(SentinelAsia_ALOS.select(0).gt(0));  // only flood (21)
var SentinelAsia_ALOS_21oct = SentinelAsia_ALOS.select(0).gt(0);  // all water (7+21)
var SentinelAsia_ALOS_water = ee.ImageCollection([
  SentinelAsia_ALOS_7oct.set('day', 7, 'system:time_start', ee.Date('2020-10-07').millis()),
  SentinelAsia_ALOS_21oct.set('day', 21, 'system:time_start', ee.Date('2020-10-21').millis())
]).select(['b1'], ['ALOS']);
// print(SentinelAsia_ALOS_water);
// Sentinel-Asia RS2 floodmap (31 Oct)
var SentinelAsia_RS2_img = SentinelAsia_RS2.reduceToImage(['gridcode'], ee.Reducer.max())
                            .rename('RS2')
                            .set('day', 31, 'system:time_start', ee.Date('2020-10-31').millis());
// SentinelAsia_RS2_img  = SentinelAsia_RS2_img.unmask(0,false).max(perm_water.unmask(0,false))
//                           .rename('RS2')
//                           .set('day', 31, 'system:time_start', ee.Date('2020-10-31').millis());
// SentinelAsia_RS2_img = SentinelAsia_RS2_img.updateMask(SentinelAsia_RS2_img);
// print(SentinelAsia_RS2_img);
// Map.addLayer(SentinelAsia_RS2_img);
SentinelAsia_RS2_img = ee.ImageCollection([SentinelAsia_RS2_img]);
// Sentinel-Asia VIIRS floodmap (27-31 Oct)
var SentinelAsia_VIIRS_ic = ee.ImageCollection([SentinelAsia_VIIRS.rename('VIIRS').set(
  // 'day', 27, 'system:time_start', ee.Date('2020-10-27').millis()
  'day', 31, 'system:time_start', ee.Date('2020-10-31').millis()
)]);
// comparing HYDRAFloods and JRC
var water_diff_JRC = water_max.subtract(JRC_max);
var water_diff_JRC_Oct = water_max.subtract(JRC_Oct_max);
// derive water/flooded areas (in km2)
var JRC_Oct_area = JRC_Oct.map(function(img) {
  return ee.Image.pixelArea().multiply(img).divide(1e6).copyProperties(img, ['year']);
});
var Oct_area_merged = JRC_Oct_area.merge(ee.ImageCollection([ee.Image.pixelArea().multiply(water_max.updateMask(water_max)).divide(1e6).set('year',2020)]));
var water_area = water.map(function(img) {
  // return ee.Image.pixelArea().multiply(img).divide(1e6).set('day', ee.Date.parse('YYYYMMdd', img.get('system:index')).get('day')).copyProperties(img, ['system:time_start']);
  return ee.Image.pixelArea().multiply(img.select(0)).divide(1e6).rename(['edge']).set('day', ee.Date(img.get('system:time_start')).get('day')).copyProperties(img, ['system:time_start']);
});
// var HYDRAFloods_area = HYDRAFloods_daily.map(function(img) {
//   return ee.Image.pixelArea().multiply(img).divide(1e6).set('day', ee.Date.parse('YYYY-MM-dd', img.get('date')).get('day')).copyProperties(img, ['system:time_start']);
// });
var HYDRAFloods_WFP_area = HYDRAFloods_WFP.map(function(img) {
  return ee.Image.pixelArea().multiply(img.select(0)).divide(1e6).rename(['WFP']).set('day', ee.Date(img.get('system:time_start')).get('day')).copyProperties(img, ['system:time_start']);
});
// set empty images at start for HYDRAFloods WFP
var first_date_WFP = ee.Date(HYDRAFloods_WFP.aggregate_min('system:time_start'));
var imgs_start_WFP = ee.List.sequence(1, first_date_WFP.getRelative('day','month')).map(function(i) {
  return ee.Image.constant(0).rename(['WFP']).set(
    'system:time_start', ee.Date.fromYMD(2020,10,i).millis(),
    'day', i
  );
});
HYDRAFloods_WFP_area = ee.ImageCollection(imgs_start_WFP).merge(HYDRAFloods_WFP_area).sort('system:time_start');
// create full ImageCollection for HYDRAFloods data fusion floodmaps (temporary fix from before it was complete)
HYDRAFloods_DF = HYDRAFloods_DF.map(function(img) {
  return img.set('day', img.date().get('day'));
});
// print(HYDRAFloods_DF.aggregate_array('day'));
// var HYDRAFloods_DF_full = ee.ImageCollection(ee.List.sequence(1, 31).map(function(i) {
//   return ee.Image.constant(0).rename(['water']).set(
//     'system:time_start', ee.Date.fromYMD(2020,10,i).millis(),
//     'day', i,
//     'img_data', HYDRAFloods_DF.filter(ee.Filter.eq('day', i)).size()
//   );
// }));
// HYDRAFloods_DF_full = HYDRAFloods_DF_full.filter(ee.Filter.eq('img_data', 0));
// HYDRAFloods_DF_full = HYDRAFloods_DF_full.merge(HYDRAFloods_DF.select('water')).sort('system:time_start');
// print(HYDRAFloods_DF_full.aggregate_array('day'));
// calculate water area
// var HYDRAFloods_DF_area = HYDRAFloods_DF.select('water').map(function(img) {
// var HYDRAFloods_DF_area = HYDRAFloods_DF_full.map(function(img) {
var HYDRAFloods_DF_area = HYDRAFloods_DF.map(function(img) {
  return ee.Image.pixelArea().multiply(img.select(0)).divide(1e6).rename(['DF']).set('day', ee.Date(img.get('system:time_start')).get('day')).copyProperties(img, ['system:time_start']);
});
// create full ImageCollection for Sentinel-Asia ALOS floodmaps
var SentinelAsia_ALOS_water_full = ee.ImageCollection(ee.List.sequence(1, 31).map(function(i) {
  return ee.Image.constant(0).rename(['ALOS']).set(
    'system:time_start', ee.Date.fromYMD(2020,10,i).millis(),
    'day', i,
    'img_data', SentinelAsia_ALOS_water.filter(ee.Filter.eq('day', i)).size()
  );
}));
SentinelAsia_ALOS_water_full = SentinelAsia_ALOS_water_full.filter(ee.Filter.eq('img_data', 0));
SentinelAsia_ALOS_water_full = SentinelAsia_ALOS_water_full.merge(SentinelAsia_ALOS_water).sort('system:time_start');
// print(SentinelAsia_ALOS_water_full);
var SentinelAsia_ALOS_area = SentinelAsia_ALOS_water_full.map(function(img) {
  return ee.Image.pixelArea().multiply(img.select(0)).divide(1e6).rename(['ALOS']).copyProperties(img, ['day', 'system:time_start']);
});
// print(SentinelAsia_ALOS_area);
// create full ImageCollection for Sentinel-Asia RS2 floodmaps
var SentinelAsia_RS2_full = ee.ImageCollection(ee.List.sequence(1, 31).map(function(i) {
  return ee.Image.constant(0).rename(['RS2']).set(
    'system:time_start', ee.Date.fromYMD(2020,10,i).millis(),
    'day', i,
    'img_data', SentinelAsia_RS2_img.filter(ee.Filter.eq('day', i)).size()
  );
}));
SentinelAsia_RS2_full = SentinelAsia_RS2_full.filter(ee.Filter.eq('img_data', 0));
SentinelAsia_RS2_full = SentinelAsia_RS2_full.merge(SentinelAsia_RS2_img).sort('system:time_start');
// print(SentinelAsia_RS2_full);
var SentinelAsia_RS2_area = SentinelAsia_RS2_full.map(function(img) {
  return ee.Image.pixelArea().multiply(img.select(0)).divide(1e6).rename(['RS2']).copyProperties(img, ['day', 'system:time_start']);
});
// print(SentinelAsia_RS2_area);
var SentinelAsia_VIIRS_full = ee.ImageCollection(ee.List.sequence(1, 31).map(function(i) {
  return ee.Image.constant(0).rename(['VIIRS']).set(
    'system:time_start', ee.Date.fromYMD(2020,10,i).millis(),
    'day', i,
    'img_data', SentinelAsia_VIIRS_ic.filter(ee.Filter.eq('day', i)).size()
  );
}));
SentinelAsia_VIIRS_full = SentinelAsia_VIIRS_full.filter(ee.Filter.eq('img_data', 0));
SentinelAsia_VIIRS_full = SentinelAsia_VIIRS_full.merge(SentinelAsia_VIIRS_ic).sort('system:time_start');
// print(SentinelAsia_VIIRS_full);
var SentinelAsia_VIIRS_area = SentinelAsia_VIIRS_full.map(function(img) {
  return ee.Image.pixelArea().multiply(img.select(0)).divide(1e6).rename(['VIIRS']).copyProperties(img, ['day', 'system:time_start']);
});
// combine areas from multiple sources
var HYDRAFloods_areas = ee.List.sequence(1,31).map(function(i) {
  var temp_date = ee.Date.fromYMD(2020,10,i);
  var img_edge  = water_area.filterDate(temp_date, temp_date.advance(1, 'day'));
  var img_WFP   = HYDRAFloods_WFP_area.filterDate(temp_date, temp_date.advance(1, 'day'));
  var img_DF    = HYDRAFloods_DF_area.filterDate(temp_date, temp_date.advance(1, 'day'));
  var img_ALOS  = SentinelAsia_ALOS_area.filterDate(temp_date, temp_date.advance(1, 'day'));
  var img_RS2   = SentinelAsia_RS2_area.filterDate(temp_date, temp_date.advance(1, 'day'));
  var img_VIIRS = SentinelAsia_VIIRS_area.filterDate(temp_date, temp_date.advance(1, 'day'));
  // return ee.List([img_edge.size(), img_WFP.size(), img_ALOS.size(), img_RS2.size(), img_VIIRS.size()]);
  return ee.Image.cat(ee.Image(img_edge.first()), ee.Image(img_WFP.first()), ee.Image(img_DF.first()), ee.Image(img_ALOS.first()), ee.Image(img_RS2.first()), ee.Image(img_VIIRS.first())).set(
    'system:time_start', ee.Date.fromYMD(2020,10,i).millis(),
    'day', i
  );
});
HYDRAFloods_areas = ee.ImageCollection(HYDRAFloods_areas).sort('system:time_start');
// print(HYDRAFloods_areas.first());
// print(HYDRAFloods_areas);
// HydroRIVERS
rivers = rivers.map(function(f) {
  return f.set({ style: {
      // color: '00ffff', 
      // color: '06baff',
      color: 'b6b6b6',
      gamma: 1.5,
      // width: ee.Number(f.get('DIS_AV_CMS_LOG')).divide(5)
      width: ee.Number(f.get('DIS_AV_CMS')).divide(100).add(0.5).min(3)
    } 
  });
});
var riversImage = rivers.style({ styleProperty: 'style' });
riversImage = riversImage.clipToCollection(adm0);
// MNDWI from optical imagery
S2 = S2.map(calcMNDWI);
L8 = L8.map(calcMNDWI);
var MNDWI_S2_L8 = S2.select('MNDWI').merge(L8.select('MNDWI'));
// ----------------------------------------------------------------------------------------- //
// Functions
// ----------------------------------------------------------------------------------------- //
function calcMNDWI(img) {
  var mndwi = img.normalizedDifference(['green','swir1']).rename('MNDWI');
  return img.addBands(mndwi);
}
// update all elements based on selected region
function updateSelection(lvl) {
  if (lvl !== 'None') {
    // clear relevant map UI
    Map.layers().forEach(function(layer) {
      if (layer.get('name') == 'analysis region(s)') {
        Map.layers().remove(layer);
      } else if (layer.get('name') == 'Cambodia') {
        layer.setShown(false);
      }
    });
    // get regions from selector
    var regions_select = ee.FeatureCollection(regions.get(lvl));
    // update map
    // Map.addLayer(ee.Image().byte().paint(regions_select, 0, 2), {}, 'analysis region(s)', true);
    Map.layers().set(Map.layers().length(), ui.Map.Layer(ee.Image().byte().paint(regions_select, 0, 2), {}, 'analysis region(s)', true));
    // allow clicking a region on the map
    Map.style().set('cursor', 'crosshair');
    Map.onClick(function(coords) {
      // clear charts
      charts_extra.clear();
      // clear any previously clicked region
      Map.layers().forEach(function(layer) {
        if (layer.get('name') == 'clicked region') {
          Map.layers().remove(layer);
        }
      });
      // get clicked region and show on map
      var clicked_region = regions_select.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
      Map.addLayer(clicked_region, {}, 'clicked region', true, 0.5);
      // query analysis for this region and show in charts
      // var chart_water_daily_clicked = createWaterAreaChart(water_area, clicked_region, 'day', 'Day of month', 'Daily water area for October 2020 (HYDRAFloods) at clicked region');
      var chart_water_daily_clicked = createWaterAreaChartBands(HYDRAFloods_areas, clicked_region, 'day', 'Day of month', 'Daily water area for October 2020 at clicked region');
      // var chart_JRC_monthly_clicked = createWaterAreaChart(Oct_area_merged, clicked_region, 'year', 'Year', 'Total water area for October 1984-2019 (JRC) and 2020 (HYDRAFloods) at clicked region');
      charts_extra.add(chart_water_daily_clicked);
      // charts_extra.add(chart_JRC_monthly_clicked);
    });
    // 
  } else {
    // remove map click option
    Map.unlisten();
    Map.style().set('cursor', 'hand');
    // remove charts
    charts_extra.clear();
    // remove analysis/clicked regions from map
    Map.layers().forEach(function(layer) {
      if (layer.get('name') == 'analysis region(s)') {
        Map.layers().remove(layer);
      } else if (layer.get('name') == 'Cambodia') {
        layer.setShown(true);
      }
    });
    Map.layers().forEach(function(layer) {
      if (layer.get('name') == 'clicked region') {
        Map.layers().remove(layer);
      }
    });
  }
}
// update elements based on slider
// var water_list = water.toList(water.size());
var updateSlider = function(i) {
  // get date
  var slider_date = dates[i-1];
  var temp_date   = ee.Date.fromYMD(2020,10,i);
  // get water image
  // var temp_water = ee.Image(water_list.get(i-1));
  // var temp_date = ee.Date.parse('YYYYMMdd', temp_water.get('system:index'));
  // var temp_date = ee.Date(temp_water.get('system:time_start'));
  var temp_water = ee.Image(water.filterDate(temp_date, temp_date.advance(1,'day')).first()).select('water');
  // temp_water = temp_water.select('dailywater').add(temp_water.select('permanentwater'));
  var temp_water_DF = ee.Image(HYDRAFloods_DF.filterDate(temp_date, temp_date.advance(1,'day')).first()).select('water');
  // var temp_HYDRAFloods = ee.Image(HYDRAFloods_daily.filterDate(temp_date, temp_date.advance(1,'day')).first());
  // get VIIRS on same date(s)
  var temp_VIIRS = VIIRS.filterDate(temp_date, temp_date.advance(1,'day'));
  Map.addLayer(temp_VIIRS, visParams_VIIRS_false, 'VIIRS '+ slider_date, true);
  // get Sentinel-1 on same date(s)
  var temp_S1 = S1.filterDate(temp_date, temp_date.advance(1,'day'));
  Map.addLayer(temp_S1, visParams_S1, 'Sentinel-1 '+ slider_date, false);
  // get Sentinel-2 on same date(s)
  var temp_S2 = S2.filterDate(temp_date, temp_date.advance(1,'day'));
  Map.addLayer(temp_S2, visParams_S2_false, 'Sentinel-2 '+ slider_date, false);
  // get Landsat 8 on same date(s)
  var temp_L8 = L8.filterDate(temp_date, temp_date.advance(1,'day'));
  Map.addLayer(temp_L8, visParams_L8_false, 'Landsat 8 '+ slider_date, false);
  // show HYDRAFloods data
  Map.addLayer(temp_water.updateMask(temp_water).clipToCollection(adm0), visParams_water, 'HYDRAFloods (raw) ' + slider_date, false);
  Map.addLayer(temp_water_DF.updateMask(temp_water_DF).clipToCollection(adm0), visParams_water, 'HYDRAFloods DataFusion (raw) ' + slider_date, false);
  temp_water = perm_water.unmask(0).where(temp_water.multiply(perm_water.unmask(0).eq(0)), temp_water.updateMask(temp_water).add(1));
  temp_water = temp_water.updateMask(temp_water);
  temp_water_DF = perm_water.unmask(0).where(temp_water_DF.multiply(perm_water.unmask(0).eq(0)), temp_water_DF.updateMask(temp_water_DF).add(1));
  temp_water_DF = temp_water_DF.updateMask(temp_water_DF);
  // Map.addLayer(temp_water.updateMask(temp_water), visParams_water, 'HYDRAFloods ' + slider_date, true);
  // Map.addLayer(temp_HYDRAFloods.select('water').updateMask(temp_HYDRAFloods.select('water')), visParams_water, 'daily HYDRAFloods ' + slider_date, true);
  // Map.addLayer(temp_water.select('dailywater').updateMask(temp_water.select('dailywater')), visParams_water, 'daily water ' + slider_date, true);
  Map.addLayer(temp_water.updateMask(temp_water).clipToCollection(adm0), {min:1, max:2, palette:palette_water}, 'HYDRAFloods ' + slider_date, true);
  Map.addLayer(temp_water_DF.updateMask(temp_water_DF).clipToCollection(adm0), {min:1, max:2, palette:palette_water}, 'HYDRAFloods DataFusion ' + slider_date, false);
  Map.addLayer(ee.Image().byte().paint(temp_S1.geometry().dissolve(),0,2), {}, 'Sentinel-1 extent '+ slider_date, false);
  // Map.addLayer(ee.Image().byte().paint(temp_L8.geometry().dissolve(),0,2), {}, 'Landsat 8 extent '+ slider_date, false);
  // analysis region(s)
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == 'Affected provinces') {
      var layer_shown = layer.getShown();
      Map.layers().remove(layer);
      Map.addLayer(ee.Image().byte().paint(adm1_focus_2,0,2), {palette:'orange'}, 'Affected provinces', layer_shown);
    }
  });
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == 'Worst affected provinces') {
      var layer_shown = layer.getShown();
      Map.layers().remove(layer);
      Map.addLayer(ee.Image().byte().paint(adm1_focus_1,0,2), {palette:'red'}, 'Worst affected provinces', layer_shown);
    }
  });
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == 'Cambodia') {
      var layer_shown = layer.getShown();
      Map.layers().remove(layer);
      Map.addLayer(ee.Image().byte().paint(adm0,0,2), {}, 'Cambodia', layer_shown);
    }
  });
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == 'analysis region(s)') {
      Map.layers().remove(layer);
      Map.layers().set(Map.layers().length(), layer);
    }
  });
};
function createWaterAreaChart(ic, reg, xProp, hTitle, title) { //, chartType) {
  var chart_water_area = ui.Chart.image.seriesByRegion({
    imageCollection: ic,
    regions: reg,
    reducer: ee.Reducer.sum(),
    scale: 30,
    xProperty: xProp,
    seriesProperty: 'ADM1_NAME'
  });
  // chart_water_area.setChartType(chartType);
  chart_water_area.setOptions({
    title: title,
    vAxis: {title: 'Water area (km2)'},
    hAxis: {title: hTitle}
  });
  return chart_water_area;
}
function createWaterAreaChartBands(ic, reg, xProp, hTitle, title) { //, chartType) {
  // var chart_water_area = ui.Chart.image.series({
  //   imageCollection: ic,
  //   region: reg,
  //   reducer: ee.Reducer.sum(),
  //   scale: 30,
  //   xProperty: xProp
  // });
  var array_water_area = ee.Array(ic.toList(ic.size()).map(function(i) {
    return ee.Image(i).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: reg,
      scale: 30,
      maxPixels: 1e12
    }).values();
  }));
  // print(array_water_area);
  var chart_water_area = ui.Chart.array.values(array_water_area, 0, ic.aggregate_array('day'));
  // chart_water_area.setSeriesNames(['Sentinel-Asia ALOS', 'Sentinel-Asia RS2', 'Sentinel-Asia VIIRS', 'HYDRAFloods WFP', 'HYDRAFloods edgeOtsu']);
  chart_water_area.setSeriesNames(['Sentinel-Asia ALOS', 'HYDRAFloods DataFusion', 'Sentinel-Asia RS2', 'Sentinel-Asia VIIRS', 'HYDRAFloods WFP', 'HYDRAFloods edgeOtsu']);
  chart_water_area.setOptions({
    title: title,
    vAxis: {title: 'Water area (km2)'},
    hAxis: {title: hTitle},//, minValue:ic.aggregate_min('day'), maxValue:ic.aggregate_max('day')},
    // lineWidth: 2,
    // pointSize: 0
    series: {
      0: {lineWidth:0, pointSize:4},
      1: {lineWidth:2, pointSize:0},
      2: {lineWidth:0, pointSize:4},
      3: {lineWidth:0, pointSize:4},
      4: {lineWidth:2, pointSize:0},
      5: {lineWidth:2, pointSize:0}
    }
  });
  // chart_water_area.setChartType(chartType);
  return chart_water_area;
}
var toggleLegends = function() {
  legends.style().set('shown', !legends.style().get('shown'));
};
var toggleCharts = function() {
  charts.style().set('shown', !charts.style().get('shown'));
  charts_extra.style().set('shown', !charts_extra.style().get('shown'));
};
var toggleRefs = function() {
  refs.style().set('shown', !refs.style().get('shown'));
};
// ----------------------------------------------------------------------------------------- //
// User Interface
// ----------------------------------------------------------------------------------------- //
// padding/margin = 1 (all), 2 (top/bottom,right/left), 3 (top,right/left,bottom), 4 (top,right,bottom,left)
// intro
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'Cambodia Floods October 2020',
    style: {fontSize:'20px', fontWeight:'bold'}
  }),
  // intro texts
  ui.Label({
    value: "Quick analysis of EO-based flood maps (WORK-IN-PROGRESS).",
    style: {fontSize:fontSize_intro, padding:'0px'}
  }),
  ui.Panel([
    ui.Label({
      value: "Animation app at",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "this link",
      targetUrl: "https://arjenhaag.users.earthengine.app/view/cambodia-floods-october-2020---animations",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ".",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Flood maps are created using the",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'8px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "HYDRAFloods",
      targetUrl: "http://hydrafloods-servir.adpc.net/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "tool of",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: "SERVIR-Mekong",
      targetUrl: "https://servir.adpc.net/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ",",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "a consortium of",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "ADPC",
      targetUrl: "https://www.adpc.net/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ",",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    }),
    ui.Label({
      value: "SIG",
      targetUrl: "https://sig-gis.com/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ",",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    }),
    ui.Label({
      value: "SEI",
      targetUrl: "https://www.sei.org/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: "and",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "Deltares",
      targetUrl: "https://www.deltares.nl/en/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "supported by",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: "NASA",
      targetUrl: "https://www.nasa.gov/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ".",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "More information on these floods at",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'8px 0px 0px 8px'}
  }),
  ui.Label({
    value: "ReliefWeb",
    targetUrl: "https://reliefweb.int/disaster/fl-2020-000212-khm",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
  })
]);
// region selector
var selector = ui.Select({
  // items: ['None', 'Admin level 0', 'Admin level 1', 'Admin level 2', 'Basins level 5', 'Basins level 6', 'Basins level 7', 'Basins level 8'],
  items: ['None', 'Admin level 1', 'Admin level 2', 'Basins level 6', 'Basins level 7', 'Basins level 8'],
  value: 'None',
  onChange: updateSelection,
  style: {width: '200px'}
});
var selector_panel = ui.Panel([
  ui.Label({value: 'Region selection:', style: {fontWeight: 'bold'}}),
  selector,
  ui.Label({value: "When activated, click on a region on the map to query an analysis. This also includes data from other sources. Select 'None' to de-activate.", style: {fontSize: fontSize_sub}})
]);
// image slider
var slider = ui.Slider({
  min:1,
  max:31,
  value:1,
  step:1,
  onChange: updateSlider,
  style: {width:'200px'}
});
var slider_panel = ui.Panel([
  ui.Label({value: 'Image slider (day of month):', style: {fontWeight: 'bold'}}),
  slider,
  ui.Label({value: 'Use this to check available imagery and flood maps for each day.', style: {fontSize: fontSize_sub}})
]);
// legend(s)
var legend_water = ui.Panel({widgets:[
  ui.Label({value: 'Daily HYDRAFloods:', style: {fontWeight: 'bold'}}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: palette_water[0],
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'Permanent/regular water',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
    ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: palette_water[1],
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'Flooded water',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')})
  ], style:{margin: '0px 0px 10px 0px'}
});
var legend_diff = ui.Panel({widgets:[
  ui.Label({value: 'Difference:', style: {fontWeight: 'bold'}}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'green',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'JRC (1984-2019)',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'blue',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'HYDRAFloods (Oct 2020)',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')})
  ], style:{margin: '0px 0px 10px 0px'}
});
var legend_DEM = ui.Panel({widgets:[
  ui.Label({value: 'Elevation (m):', style: {fontWeight: 'bold'}}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'white',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '0',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'blue',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '50',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'green',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '100',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'yellow',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '150',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'red',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '200+',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')})
  ], style:{margin: '0px 0px 10px 0px'}
});
var legends = ui.Panel({
  widgets: [legend_water, legend_diff, legend_DEM],
  style: {shown:false}
});
var legends_panel = ui.Panel([
  ui.Button('Show/hide legends', toggleLegends, false, {fontWeight: 'bold'})
]);
// charts
var chart_water_daily_focus1 = createWaterAreaChart(water_area, adm1_focus_1, 'day', 'Day of month', 'Daily water area for October 2020 (HYDRAFloods) for worst affected provinces');
// var chart_water_daily_focus1 = createWaterAreaChart(water_area, adm1_focus_1, 'day', 'Day of month', 'Daily water area for October 2020 (HYDRAFloods WFP) for worst affected provinces');
// var chart_water_daily_focus1b = createWaterAreaChart(HYDRAFloods_area, adm1_focus_1, 'day', 'Day of month', 'Daily water area for October 2020 (HYDRAFloods edge) for worst affected provinces');
// var chart_water_daily_focus1b = createWaterAreaChart(HYDRAFloods_WFP_area, adm1_focus_1, 'day', 'Day of month', 'Daily water area for October 2020 (HYDRAFloods WFP) for worst affected provinces');
var chart_JRC_monthly_focus1 = createWaterAreaChart(Oct_area_merged, adm1_focus_1, 'year', 'Year', 'Total water area for October 1984-2019 (JRC) and 2020 (HYDRAFloods) for worst affected provinces');
var charts = ui.Panel([chart_water_daily_focus1, chart_JRC_monthly_focus1]);
// var charts = ui.Panel([chart_water_daily_focus1, chart_water_daily_focus1b]);
// var charts = ui.Panel([chart_water_daily_focus1, chart_water_daily_focus1b, chart_JRC_monthly_focus1]);
var charts_extra = ui.Panel([]);
var charts_panel = ui.Panel([ui.Button('Show/hide charts', toggleCharts, false, {fontWeight: 'bold'})]);
// references
var refs = ui.Panel([
  ui.Panel([
    ui.Label({
      value: "- Sentinel-1:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Copernicus Sentinel data",
      targetUrl: "http://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- Landsat 8:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "U.S. Geological Survey",
      targetUrl: "https://www.usgs.gov/core-science-systems/nli/landsat",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- VIIRS:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Vermote et al. (2016)",
      targetUrl: "https://doi.org/10.5067/VIIRS/VNP09GA.001",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- JRC Surface Water:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Pekel et al. (2016)",
      targetUrl: "https://www.nature.com/articles/nature20584.epdf?author_access_token=C5JSvooRop4jWxyp_qRPLNRgN0jAjWel9jnR3ZoTv0MqBuzCNsmw_DFxRd7sX93nfPzcbm_xTiPLlZMl7XrUhadm6EiT9cGdDNgn1s6EWrPWH3IeadLUjApplBoaS6xH",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- MERIT DEM:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Yamazaki et al. (2017)",
      targetUrl: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2017GL072874",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- HydroBASINS:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Lehner & Grill (2013)",
      targetUrl: "https://onlinelibrary.wiley.com/doi/10.1002/hyp.9740",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Contains modified Copernicus Sentinel data [2020]",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Map layers starting with 'Sentinel-Asia' are provided by the Japan Aerospace Exploration Agency (JAXA)",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Source of Administrative boundaries: The Global Administrative Unit Layers (GAUL) dataset, implemented by FAO within the CountrySTAT and Agricultural Market Information System (AMIS) projects",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  })
], ui.Panel.Layout.flow('vertical'), {shown:false});
var refs_panel = ui.Panel([
  ui.Panel([
    ui.Button({label:'Show/hide references', onClick:toggleRefs})
  ], ui.Panel.Layout.flow('horizontal')),
  refs
]);
var outro = ui.Label({
  value: "For more information on this application, please contact arjen.haag@deltares.nl",
  style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
});
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, selector_panel, slider_panel, legends_panel, legends, charts_panel, charts_extra, charts, refs_panel, outro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '230px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ----------------------------------------------------------------------------------------- //
// Map
// ----------------------------------------------------------------------------------------- //
Map.centerObject(adm0);
Map.setOptions('TERRAIN');
Map.addLayer(MERIT, visParams_DEM, 'MERIT DEM', false);
// Map.addLayer(MERIT_HAND, visParams_HAND, 'MERIT HAND', false);
Map.addLayer(S1.min(), visParams_S1, 'Sentinel-1 (min)', false);
Map.addLayer(S1.median(), visParams_S1, 'Sentinel-1 (median)', false);
// Map.addLayer(S2.qualityMosaic('MNDWI').select('MNDWI'), visParams_MNDWI, 'Sentinel-2 MNDWI (max)', false);
// Map.addLayer(L8.qualityMosaic('MNDWI').select('MNDWI'), visParams_MNDWI, 'Landsat 8 MNDWI (max)', false);
// Map.addLayer(MNDWI_S2_L8.qualityMosaic('MNDWI').select('MNDWI'), visParams_MNDWI, 'S2 + L8 MNDWI (max)', false);
// Map.addLayer(S2.qualityMosaic('MNDWI'), visParams_S2_false, 'Sentinel-2 false colour mosaic', false);
// Map.addLayer(L8.qualityMosaic('MNDWI'), visParams_L8_false, 'Landsat 8 false colour mosaic', false);
Map.addLayer(riversImage, {}, 'rivers', false, 0.5);
Map.addLayer(JRC_occurrence, {min:0, max:100, palette:['white','blue']}, 'JRC water occurrence (1984-2019)', false);
Map.addLayer(JRC_max.updateMask(JRC_max), visParams_water, 'JRC water max extent (1984-2019)', false);
Map.addLayer(JRC_Oct_max.updateMask(JRC_Oct_max), visParams_water, 'JRC water max (Oct 1984-2019)', false);
Map.addLayer(perm_water, visParams_water, 'HYDRAFloods permanent/regular water', false);
Map.addLayer(water_max.updateMask(water_max), visParams_water, 'HYDRAFloods water max (Oct 2020)', false);
// Map.addLayer(water_max.updateMask(water_max), visParams_water, 'HYDRAFloods (WFP) water max (Oct 2020)', false);
// Map.addLayer(HYDRAFloods_max.updateMask(HYDRAFloods_max), visParams_water, 'HYDRAFloods (edge) water max (Oct 2020)', false);
Map.addLayer(HYDRAFloods_WFP_max.updateMask(HYDRAFloods_WFP_max), visParams_water, 'HYDRAFloods WFP water max (Oct 2020)', false);
Map.addLayer(HYDRAFloods_DF_max.updateMask(HYDRAFloods_DF_max), visParams_water, 'HYDRAFloods DataFusion water max (Oct 2020)', false);
Map.addLayer(water_diff_JRC.updateMask(water_diff_JRC.neq(0)), visParams_water_diff, 'HYDRAFloods - JRC difference (full archive)', false);
Map.addLayer(water_diff_JRC_Oct.updateMask(water_diff_JRC_Oct.neq(0)), visParams_water_diff, 'HYDRAFloods - JRC difference (Oct only)', false);
Map.addLayer(SentinelAsia_ALOS.updateMask(SentinelAsia_ALOS.select(3)), {}, 'Sentinel-Asia ALOS-2 (7-21 Oct)', false);
Map.addLayer(SentinelAsia_VIIRS.updateMask(SentinelAsia_VIIRS), visParams_water, 'Sentinel-Asia VIIRS (27-31 Oct)', false);
Map.addLayer(SentinelAsia_RS2, {color:'blue'}, 'Sentinel-Asia RS2 (31 Oct)', false);
// Map.addLayer(SentinelAsia_RS2_img);
Map.addLayer(ee.Image().byte().paint(adm1_focus_2,0,2), {palette:'orange'}, 'Affected provinces', false);
Map.addLayer(ee.Image().byte().paint(adm1_focus_1,0,2), {palette:'red'}, 'Worst affected provinces', true);
Map.addLayer(ee.Image().byte().paint(adm0,0,2), {}, 'Cambodia', true);
// initialize slider
updateSlider(1);