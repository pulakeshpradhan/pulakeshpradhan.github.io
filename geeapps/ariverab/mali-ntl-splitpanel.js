var world = ee.FeatureCollection("FAO/GAUL/2015/level0");
var adm1 = ee.FeatureCollection("FAO/GAUL/2015/level1");
var mali_adm0 = ee.FeatureCollection("FAO/GAUL/2015/level0").filter("ADM0_NAME == 'Mali'");
var mali_kayes = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Kayes'");
var mali_koulikoro = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Koulikoro'");
var mali_segou = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Segou'");
var mali_mopti = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Mopti'");
var mali_sikasso = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Sikasso'");
var mali_tomboctou = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Tombouctou'");
var mali_gao = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Gao'");
var mali_kidal = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Kidal'");
var mali_bamako = ee.FeatureCollection("FAO/GAUL/2015/level1").filter("ADM1_NAME == 'Bamako'");
var ntl = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG').select('avg_rad');
//get annual averages
var ntl2022 = ntl.filter(ee.Filter.date('2022-01-01', '2022-12-31')).mean();
var ntl2021 = ntl.filter(ee.Filter.date('2021-01-01', '2021-12-31')).mean();
var ntl2020 = ntl.filter(ee.Filter.date('2020-01-01', '2020-12-31')).mean();
var ntl2019 = ntl.filter(ee.Filter.date('2019-01-01', '2019-12-31')).mean();
var ntl2018 = ntl.filter(ee.Filter.date('2018-01-01', '2018-12-31')).mean();
var ntl2017 = ntl.filter(ee.Filter.date('2017-01-01', '2017-12-31')).mean();
var ntl2016 = ntl.filter(ee.Filter.date('2016-01-01', '2016-12-31')).mean();
var ntl2015 = ntl.filter(ee.Filter.date('2015-01-01', '2015-12-31')).mean();
var ntl2014 = ntl.filter(ee.Filter.date('2014-01-01', '2014-12-31')).mean();
// remap raster
var ntl2022_mask = ee.Image(1)
      .where(ntl2022.lt(1), 0)
      .where(ntl2022.gte(1), 1);
var ntl2021_mask = ee.Image(1)
      .where(ntl2021.lt(1), 0)
      .where(ntl2021.gte(1), 1);
var ntl2020_mask = ee.Image(1)
      .where(ntl2020.lt(1), 0)
      .where(ntl2020.gte(1), 1);
var ntl2019_mask = ee.Image(1)
      .where(ntl2019.lt(1), 0)
      .where(ntl2019.gte(1), 1);
var ntl2018_mask = ee.Image(1)
      .where(ntl2018.lt(1), 0)
      .where(ntl2018.gte(1), 1);
var ntl2017_mask = ee.Image(1)
      .where(ntl2017.lt(1), 0)
      .where(ntl2017.gte(1), 1);
var ntl2016_mask = ee.Image(1)
      .where(ntl2016.lt(1), 0)
      .where(ntl2016.gte(1), 1);
var ntl2015_mask = ee.Image(1)
      .where(ntl2015.lt(1), 0)
      .where(ntl2015.gte(1), 1);
var ntl2014_mask = ee.Image(1)
      .where(ntl2014.lt(1), 0)
      .where(ntl2014.gte(1), 1);
// set visualization parameters
var ntlvis = {
  min: 0.5,
  max: 1.0,
  palette: ['magenta'],
  opacity: 1,
};
// mask images for Mali
var mali_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_adm0);
var mali_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_adm0);
var mali_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_adm0);
var mali_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_adm0);
var mali_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_adm0);
var mali_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_adm0);
var mali_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_adm0);
var mali_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_adm0);
var mali_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_adm0);
var leftMap = ui.Map()
var rightMap = ui.Map()
var mali_2014 = ui.Map.Layer(mali_ntl_2014, ntlvis)
var mali_2022 = ui.Map.Layer(mali_ntl_2022, ntlvis)
var layer_2014 = leftMap.layers()
var layer_2022 = rightMap.layers()
layer_2014.add(mali_2014)
layer_2022.add(mali_2022)
var layer_2014_label = ui.Label('Mali NTL 2014')
layer_2014_label.style().set('position', 'bottom-left')
var layer_2022_label = ui.Label('Mali NTL 2022')
layer_2022_label.style().set('position', 'bottom-right')
leftMap.add(layer_2014_label)
rightMap.add(layer_2022_label)
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
})
ui.root.clear()
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap])
leftMap.centerObject(mali_bamako, 8)
rightMap.centerObject(mali_bamako, 8)