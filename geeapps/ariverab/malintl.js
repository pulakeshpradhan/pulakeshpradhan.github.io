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
  palette: ['FFFFFF', 'magenta'],
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
// add layers
Map.addLayer(world, {color: 'FFFFFF', strokeWidth: 1}, 'World boundaries');
Map.addLayer(mali_adm0, {color: '000000', strokeWidth: 10}, 'Mali');
Map.addLayer(mali_ntl_2022, ntlvis, 'Nighttime Lights 2022');
Map.addLayer(mali_ntl_2021, ntlvis, 'Nighttime Lights 2021');
Map.addLayer(mali_ntl_2020, ntlvis, 'Nighttime Lights 2020');
Map.addLayer(mali_ntl_2019, ntlvis, 'Nighttime Lights 2019');
Map.addLayer(mali_ntl_2018, ntlvis, 'Nighttime Lights 2018');
Map.addLayer(mali_ntl_2017, ntlvis, 'Nighttime Lights 2017');
Map.addLayer(mali_ntl_2016, ntlvis, 'Nighttime Lights 2016');
Map.addLayer(mali_ntl_2015, ntlvis, 'Nighttime Lights 2015');
Map.addLayer(mali_ntl_2014, ntlvis, 'Nighttime Lights 2014');
//Map.addLayer(guinea_ntl, ntlvis, 'Nighttime Lights');
//Map.addLayer(mali_adm0);
// obtain count of pixels = 1
var stats2014 = mali_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2014: ', stats2014.get('constant'));
var stats2015 = mali_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2015: ', stats2015.get('constant'));
var stats2016 = mali_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2016: ', stats2016.get('constant'));
var stats2017 = mali_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2017: ', stats2017.get('constant'));
var stats2018 = mali_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2018: ', stats2018.get('constant'));
var stats2019 = mali_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2019: ', stats2019.get('constant'));
var stats2020 = mali_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2020: ', stats2020.get('constant'));
var stats2021 = mali_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2021: ', stats2021.get('constant'));
var stats2022 = mali_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_adm0,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels, 2022: ', stats2022.get('constant'));
// subnational
// mask images for Kayes
var kayes_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_kayes);
var kayes_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_kayes);
var kayes_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_kayes);
var kayes_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_kayes);
var kayes_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_kayes);
var kayes_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_kayes);
var kayes_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_kayes);
var kayes_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_kayes);
var kayes_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_kayes);
var kayes2014 = kayes_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels Kayes, 2014: ', kayes2014.get('constant'));
var kayes2015 = kayes_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2015: ', kayes2015.get('constant'));
var kayes2016 = kayes_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2016: ', kayes2016.get('constant'));
var kayes2017 = kayes_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2017: ', kayes2017.get('constant'));
var kayes2018 = kayes_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2018: ', kayes2018.get('constant'));
var kayes2019 = kayes_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2019: ', kayes2019.get('constant'));
var kayes2020 = kayes_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2020: ', kayes2020.get('constant'));
var kayes2021 = kayes_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2021: ', kayes2021.get('constant'));
var kayes2022 = kayes_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kayes,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kayes, 2022: ', kayes2022.get('constant'));
// mask images for Koulikoro
var koulikoro_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_koulikoro);
var koulikoro_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_koulikoro);
var koulikoro_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_koulikoro);
var koulikoro_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_koulikoro);
var koulikoro_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_koulikoro);
var koulikoro_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_koulikoro);
var koulikoro_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_koulikoro);
var koulikoro_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_koulikoro);
var koulikoro_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_koulikoro);
var koulikoro2014 = koulikoro_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2014: ', koulikoro2014.get('constant'));
var koulikoro2015 = koulikoro_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2015: ', koulikoro2015.get('constant'));
var koulikoro2016 = koulikoro_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2016: ', koulikoro2016.get('constant'));
var koulikoro2017 = koulikoro_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2017: ', koulikoro2017.get('constant'));
var koulikoro2018 = koulikoro_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2018: ', koulikoro2018.get('constant'));
var koulikoro2019 = koulikoro_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2019: ', koulikoro2019.get('constant'));
var koulikoro2020 = koulikoro_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2020: ', koulikoro2020.get('constant'));
var koulikoro2021 = koulikoro_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2021: ', koulikoro2021.get('constant'));
var koulikoro2022 = koulikoro_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_koulikoro,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels koulikoro, 2022: ', koulikoro2022.get('constant'));
// mask images for Mopti
var mopti_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_mopti);
var mopti_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_mopti);
var mopti_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_mopti);
var mopti_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_mopti);
var mopti_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_mopti);
var mopti_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_mopti);
var mopti_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_mopti);
var mopti_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_mopti);
var mopti_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_mopti);
var mopti2014 = mopti_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2014: ', mopti2014.get('constant'));
var mopti2015 = mopti_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2015: ', mopti2015.get('constant'));
var mopti2016 = mopti_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2016: ', mopti2016.get('constant'));
var mopti2017 = mopti_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2017: ', mopti2017.get('constant'));
var mopti2018 = mopti_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2018: ', mopti2018.get('constant'));
var mopti2019 = mopti_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2019: ', mopti2019.get('constant'));
var mopti2020 = mopti_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2020: ', mopti2020.get('constant'));
var mopti2021 = mopti_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2021: ', mopti2021.get('constant'));
var mopti2022 = mopti_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_mopti,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels mopti, 2022: ', mopti2022.get('constant'));
// mask images for Sikasso
var sikasso_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_sikasso);
var sikasso_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_sikasso);
var sikasso_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_sikasso);
var sikasso_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_sikasso);
var sikasso_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_sikasso);
var sikasso_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_sikasso);
var sikasso_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_sikasso);
var sikasso_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_sikasso);
var sikasso_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_sikasso);
var sikasso2014 = sikasso_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2014: ', sikasso2014.get('constant'));
var sikasso2015 = sikasso_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2015: ', sikasso2015.get('constant'));
var sikasso2016 = sikasso_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2016: ', sikasso2016.get('constant'));
var sikasso2017 = sikasso_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2017: ', sikasso2017.get('constant'));
var sikasso2018 = sikasso_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2018: ', sikasso2018.get('constant'));
var sikasso2019 = sikasso_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2019: ', sikasso2019.get('constant'));
var sikasso2020 = sikasso_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2020: ', sikasso2020.get('constant'));
var sikasso2021 = sikasso_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2021: ', sikasso2021.get('constant'));
var sikasso2022 = sikasso_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_sikasso,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels sikasso, 2022: ', sikasso2022.get('constant'));
// mask images for Segou
var segou_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_segou);
var segou_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_segou);
var segou_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_segou);
var segou_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_segou);
var segou_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_segou);
var segou_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_segou);
var segou_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_segou);
var segou_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_segou);
var segou_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_segou);
var segou2014 = segou_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2014: ', segou2014.get('constant'));
var segou2015 = segou_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2015: ', segou2015.get('constant'));
var segou2016 = segou_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2016: ', segou2016.get('constant'));
var segou2017 = segou_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2017: ', segou2017.get('constant'));
var segou2018 = segou_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2018: ', segou2018.get('constant'));
var segou2019 = segou_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2019: ', segou2019.get('constant'));
var segou2020 = segou_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2020: ', segou2020.get('constant'));
var segou2021 = segou_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2021: ', segou2021.get('constant'));
var segou2022 = segou_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_segou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels segou, 2022: ', segou2022.get('constant'));
// mask images for Tomboctou
var tomboctou_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_tomboctou);
var tomboctou_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_tomboctou);
var tomboctou_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_tomboctou);
var tomboctou_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_tomboctou);
var tomboctou_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_tomboctou);
var tomboctou_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_tomboctou);
var tomboctou_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_tomboctou);
var tomboctou_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_tomboctou);
var tomboctou_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_tomboctou);
var tomboctou2014 = tomboctou_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2014: ', tomboctou2014.get('constant'));
var tomboctou2015 = tomboctou_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2015: ', tomboctou2015.get('constant'));
var tomboctou2016 = tomboctou_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2016: ', tomboctou2016.get('constant'));
var tomboctou2017 = tomboctou_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2017: ', tomboctou2017.get('constant'));
var tomboctou2018 = tomboctou_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2018: ', tomboctou2018.get('constant'));
var tomboctou2019 = tomboctou_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2019: ', tomboctou2019.get('constant'));
var tomboctou2020 = tomboctou_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2020: ', tomboctou2020.get('constant'));
var tomboctou2021 = tomboctou_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2021: ', tomboctou2021.get('constant'));
var tomboctou2022 = tomboctou_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_tomboctou,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels tomboctou, 2022: ', tomboctou2022.get('constant'));
// mask images for Gao
var gao_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_gao);
var gao_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_gao);
var gao_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_gao);
var gao_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_gao);
var gao_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_gao);
var gao_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_gao);
var gao_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_gao);
var gao_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_gao);
var gao_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_gao);
var gao2014 = gao_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2014: ', gao2014.get('constant'));
var gao2015 = gao_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2015: ', gao2015.get('constant'));
var gao2016 = gao_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2016: ', gao2016.get('constant'));
var gao2017 = gao_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2017: ', gao2017.get('constant'));
var gao2018 = gao_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2018: ', gao2018.get('constant'));
var gao2019 = gao_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2019: ', gao2019.get('constant'));
var gao2020 = gao_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2020: ', gao2020.get('constant'));
var gao2021 = gao_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2021: ', gao2021.get('constant'));
var gao2022 = gao_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_gao,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels gao, 2022: ', gao2022.get('constant'));
// mask images for Kidal
var kidal_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_kidal);
var kidal_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_kidal);
var kidal_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_kidal);
var kidal_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_kidal);
var kidal_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_kidal);
var kidal_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_kidal);
var kidal_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_kidal);
var kidal_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_kidal);
var kidal_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_kidal);
var kidal2014 = kidal_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2014: ', kidal2014.get('constant'));
var kidal2015 = kidal_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2015: ', kidal2015.get('constant'));
var kidal2016 = kidal_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2016: ', kidal2016.get('constant'));
var kidal2017 = kidal_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2017: ', kidal2017.get('constant'));
var kidal2018 = kidal_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2018: ', kidal2018.get('constant'));
var kidal2019 = kidal_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2019: ', kidal2019.get('constant'));
var kidal2020 = kidal_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2020: ', kidal2020.get('constant'));
var kidal2021 = kidal_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2021: ', kidal2021.get('constant'));
var kidal2022 = kidal_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_kidal,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels kidal, 2022: ', kidal2022.get('constant'));
// mask images for Bamako
var bamako_ntl_2022 = ntl2022_mask.mask(ntl2022_mask).clip(mali_bamako);
var bamako_ntl_2021 = ntl2021_mask.mask(ntl2021_mask).clip(mali_bamako);
var bamako_ntl_2020 = ntl2020_mask.mask(ntl2020_mask).clip(mali_bamako);
var bamako_ntl_2019 = ntl2019_mask.mask(ntl2019_mask).clip(mali_bamako);
var bamako_ntl_2018 = ntl2018_mask.mask(ntl2018_mask).clip(mali_bamako);
var bamako_ntl_2017 = ntl2017_mask.mask(ntl2017_mask).clip(mali_bamako);
var bamako_ntl_2016 = ntl2016_mask.mask(ntl2016_mask).clip(mali_bamako);
var bamako_ntl_2015 = ntl2015_mask.mask(ntl2015_mask).clip(mali_bamako);
var bamako_ntl_2014 = ntl2014_mask.mask(ntl2014_mask).clip(mali_bamako);
var bamako2014 = bamako_ntl_2014.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2014: ', bamako2014.get('constant'));
var bamako2015 = bamako_ntl_2015.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2015: ', bamako2015.get('constant'));
var bamako2016 = bamako_ntl_2016.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2016: ', bamako2016.get('constant'));
var bamako2017 = bamako_ntl_2017.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2017: ', bamako2017.get('constant'));
var bamako2018 = bamako_ntl_2018.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2018: ', bamako2018.get('constant'));
var bamako2019 = bamako_ntl_2019.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2019: ', bamako2019.get('constant'));
var bamako2020 = bamako_ntl_2020.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2020: ', bamako2020.get('constant'));
var bamako2021 = bamako_ntl_2021.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2021: ', bamako2021.get('constant'));
var bamako2022 = bamako_ntl_2022.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: mali_bamako,
  scale: 30,
  maxPixels: 1e13
});
print('Number of urban pixels bamako, 2022: ', bamako2022.get('constant'));
//////////////////////////////////////
// 4. User interface
//////////////////////////////////////
var NAMES = [
  'Google hi-res basemap (2019)',
  'Google hi-res basemap (2019)',
  'Sentinel-2 image (Apr, 2016)',
  'On Sentinel-2 image (Apr, 2016)'
];
  var tileCentroids = {
    Bamako: [-7.767325, 13.266323],
  };
// // Center the maps.
var select = ui.Select({
  items: Object.keys(tileCentroids),
  onChange: function(key) {
    Map.setCenter(tileCentroids[key][0], tileCentroids[key][1],15);
  }
});
var source = [
bamako_ntl_2022
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name, i) {
  var map = ui.Map();
  map.setOptions('SATELLITE') 
  map.add(ui.Label(name));
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
 var select = ui.Select({
  items: Object.keys(tileCentroids),
  onChange: function(key) {
    maps[0].setCenter(tileCentroids[key][0], tileCentroids[key][1],15);
  }
});
  print(select)
// Show the scale (e.g. '500m') on the bottom-right map.
Map.addLayer(bamako_ntl_2022, false);
maps[0].setControlVisibility({scaleControl: true})//.add(select);
// Create a title.
var title = ui.Label('Classified image over different backgrounds in Burkina Faso gazetted forests. [Please zoom to explore]', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0]], null, {stretch: 'both'}),
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
//print(select)
maps[0].centerObject(mali_bamako, 8);
//.add(select)
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));