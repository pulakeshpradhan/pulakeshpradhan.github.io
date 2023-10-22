Map.setCenter(25.221, 0.5141, 8)
// var dataset = ee.FeatureCollection('WCMC/WDPA/current/polygons');
// var noelkempff = dataset.filter(ee.Filter.eq('NAME', 'Noel Kempff Mercado'));
var tshopo = ee.FeatureCollection("users/jamesmaccarthy/drc_regions")
                .filter(ee.Filter.eq('NAME_1', 'Tshopo'))
var burndata = ee.ImageCollection('MODIS/006/MCD64A1').select('BurnDate');
var boundaries = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1")
// Import primary forest data
var prim_forest = ee.Image('users/jamesmaccarthy/africa/PrimaryForest_Africa').selfMask()
var ifl_2020 = ee.Image('users/jamesmaccarthy/africa/ifl_2020_tshopo').selfMask()
// Load burned area image collection for 2016
var mcd_2000 = burndata.filter(ee.Filter.date('2000-01-01', '2000-12-31'));
var mcd_2001 = burndata.filter(ee.Filter.date('2001-01-01', '2001-12-31'));
var mcd_2002 = burndata.filter(ee.Filter.date('2002-01-01', '2002-12-31'));
var mcd_2003 = burndata.filter(ee.Filter.date('2003-01-01', '2003-12-31'));
var mcd_2004 = burndata.filter(ee.Filter.date('2004-01-01', '2004-12-31'));
var mcd_2005 = burndata.filter(ee.Filter.date('2005-01-01', '2005-12-31'));
var mcd_2006 = burndata.filter(ee.Filter.date('2006-01-01', '2006-12-31'));
var mcd_2007 = burndata.filter(ee.Filter.date('2007-01-01', '2007-12-31'));
var mcd_2008 = burndata.filter(ee.Filter.date('2008-01-01', '2008-12-31'));
var mcd_2009 = burndata.filter(ee.Filter.date('2009-01-01', '2009-12-31'));
var mcd_2010 = burndata.filter(ee.Filter.date('2010-01-01', '2010-12-31'));
var mcd_2011 = burndata.filter(ee.Filter.date('2011-01-01', '2011-12-31'));
var mcd_2012 = burndata.filter(ee.Filter.date('2012-01-01', '2012-12-31'));
var mcd_2013 = burndata.filter(ee.Filter.date('2013-01-01', '2013-12-31'));
var mcd_2014 = burndata.filter(ee.Filter.date('2014-01-01', '2014-12-31'));
var mcd_2015 = burndata.filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var mcd_2016 = burndata.filter(ee.Filter.date('2016-01-01', '2016-12-31'));
var mcd_2017 = burndata.filter(ee.Filter.date('2017-01-01', '2017-12-31'));
var mcd_2018 = burndata.filter(ee.Filter.date('2018-01-01', '2018-12-31'));
var mcd_2019 = burndata.filter(ee.Filter.date('2019-01-01', '2019-12-31'));
var mcd_2020 = burndata.filter(ee.Filter.date('2020-01-01', '2020-12-31'));
var mcd_2021 = burndata.filter(ee.Filter.date('2021-01-01', '2021-12-31'));
// function burned_area(image) {
//   // Clip composite to sankuru boundary and threshold (to change value to 1)
//   var ba = image.clip(tshopo).gte(0).rename('mask')
//   // Multiply the composite by the area of each pixel (outputs image)
//   var area = ba.rename('area').multiply(ee.Image.pixelArea())
//   return area
// }
// // var ba = mcd_2021.min().clip(tshopo).gte(0).rename('mask')
// // var ba_primforest = ba.updateMask(prim_forest)
// // Map.addLayer(prim_forest, {palette:'green'}, 'primforest')
// // Map.addLayer(ba, {palette:'red'}, 'ba')
// // Map.addLayer(ba_primforest, {palette:'yellow'}, 'ba_primforest')
// function burned_primfor(image) {
//   // Clip composite to sankuru boundary and threshold (to change value to 1)
//   var ba = image.clip(tshopo).gte(0).rename('mask')
//   var ba_primforest = ba.updateMask(prim_forest.mask())
//   // Multiply the composite by the area of each pixel (outputs image)
//   var area = ba_primforest.rename('area').multiply(ee.Image.pixelArea())
//   return area
// }
// function burned_ifl(image) {
//   // Clip composite to sankuru boundary and threshold (to change value to 1)
//   var ba = image.clip(tshopo).gte(0).rename('mask')
//   var ba_ifl = ba.updateMask(ifl_2020.mask())
//   // Multiply the composite by the area of each pixel (outputs image)
//   var area = ba_ifl.rename('area').multiply(ee.Image.pixelArea())
//   return area
// }
// var area_sum = mcd_2021.map(burned_area)
// var prim_forest_sum = mcd_2021.map(burned_primfor)
// var ifl_sum = mcd_2021.map(burned_ifl)
// // Map.addLayer(t, null, 't')
// // Map.addLayer(mcd_2021, null, 'ba_2021')
// // Map.addLayer(tshopo.style({fillColor:'ffffff00'}))
// // Calculate area in square meters
// var area_m2 = area_sum.sum().reduceRegion({
//   reducer: ee.Reducer.sum(),
//     geometry: tshopo.geometry(),
//     scale: 30,
//     maxPixels: 1e10
// })
// print(
//   'Area burned:',
//   ee.String(ee.Number(
//     area_m2.get('area')
//   ).divide(1e6).round()).cat(' km2')
// )
// var prim_area_m2 = prim_forest_sum.sum().reduceRegion({
//   reducer: ee.Reducer.sum(),
//     geometry: tshopo.geometry(),
//     scale: 30,
//     maxPixels: 1e10
// })
// print(
//   'Primary forest burned:',
//   ee.String(ee.Number(
//     prim_area_m2.get('area')
//   ).divide(1e6).round()).cat(' km2')
// )
// var ifl_area_m2 = ifl_sum.sum().reduceRegion({
//   reducer: ee.Reducer.sum(),
//     geometry: tshopo.geometry(),
//     scale: 30,
//     maxPixels: 1e10
// })
// print(
//   'IFL burned:',
//   ee.String(ee.Number(
//     ifl_area_m2.get('area')
//   ).divide(1e6).round()).cat(' km2')
// )
var style = {
  color: 'bebebe',
  fillColor: 'bebebe',
  width: 0.5
}
Map.addLayer(boundaries.style(style))
Map.addLayer(prim_forest.clip(tshopo), {palette:'80c965', opacity:1.0}, 'Primary Forest')
Map.addLayer(ifl_2020.clip(tshopo), {palette: '0a7300', opacity:0.7}, 'IFL')
Map.addLayer(mcd_2021.min().clip(tshopo), {palette:'red'}, 'Burned Area')
Map.addLayer(mcd_2021.min().clip(tshopo).updateMask(prim_forest), {palette:'orange'}, 'Primary Forest Burned Area')
Map.addLayer(mcd_2021.min().clip(tshopo).updateMask(ifl_2020), {palette:'yellow'}, 'IFL Burned Area')
Map.addLayer(tshopo.style({fillColor:'00000000', color:'cyan'}), null, 'Tshopo Boundary')
// burned_area_yr(mcd_2020)
// burned_area_yr(mcd_2019)
// burned_area_yr(mcd_2018)
// burned_area_yr(mcd_2017)
// burned_area_yr(mcd_2016)
// burned_area_yr(mcd_2015)
// burned_area_yr(mcd_2014)
// burned_area_yr(mcd_2013)
// burned_area_yr(mcd_2012)
// burned_area_yr(mcd_2011)
// burned_area_yr(mcd_2010)
// burned_area_yr(mcd_2009)
// burned_area_yr(mcd_2008)
// burned_area_yr(mcd_2007)
// burned_area_yr(mcd_2006)
// burned_area_yr(mcd_2005)
// burned_area_yr(mcd_2004)
// burned_area_yr(mcd_2003)
// burned_area_yr(mcd_2002)
// burned_area_yr(mcd_2001)
// burned_area_yr(mcd_2000)
// print(mcd_2020.min().clip(tshopo).gte(0))
// var t = mcd_2020.min().clip(tshopo).gte(0)
// var tt = mcd_2010.min().clip(tshopo)
// var t2 = mcd_2020.min().clip(tshopo).gte(0).blend(tt)
// function multiple_years(yr_data) {
//   var mask = yr_data.min().clip
// }
// var mask2020 = mcd_2020.min().clip(tshopo).gte(0)
// var mask2010 = mcd_2010.min().clip(tshopo).gte(0)
// var areaImage = t.multiply(ee.Image.pixelArea())
// var area = areaImage.reduceRegion({
//   reducer: ee.Reducer.sum(),
//   geometry: tshopo.geometry(),
//   scale: 30,
//   maxPixels: 1e10
// })
// print(ee.Number(area.get('BurnDate')).divide(1e6).round())
// // Map.addLayer(mask2020, {palette:'green'}, '2020 MIN')
// // Map.addLayer(mask2010, {palette:'blue'}, '2010 MIN')
// //
// var mask2001 = mcd_2001.min().clip(tshopo).gte(0)
// var mask2002 = mcd_2002.min().clip(tshopo).gte(0)
// var mask2003 = mcd_2003.min().clip(tshopo).gte(0)
// var mask2004 = mcd_2004.min().clip(tshopo).gte(0)
// var mask2005 = mcd_2005.min().clip(tshopo).gte(0)
// var mask2006 = mcd_2006.min().clip(tshopo).gte(0)
// var mask2007 = mcd_2007.min().clip(tshopo).gte(0)
// var mask2008 = mcd_2008.min().clip(tshopo).gte(0)
// var mask2009 = mcd_2009.min().clip(tshopo).gte(0)
// var mask2010 = mcd_2010.min().clip(tshopo).gte(0)
// var mask2011 = mcd_2011.min().clip(tshopo).gte(0)
// var mask2012 = mcd_2012.min().clip(tshopo).gte(0)
// var mask2013 = mcd_2013.min().clip(tshopo).gte(0)
// var mask2014 = mcd_2014.min().clip(tshopo).gte(0)
// var mask2015 = mcd_2015.min().clip(tshopo).gte(0)
// var mask2016 = mcd_2016.min().clip(tshopo).gte(0)
// var mask2017 = mcd_2017.min().clip(tshopo).gte(0)
// var mask2018 = mcd_2018.min().clip(tshopo).gte(0)
// var mask2019 = mcd_2019.min().clip(tshopo).gte(0)
// var mask2020 = mcd_2020.min().clip(tshopo).gte(0)
// var image3 = mask2020.unmask(0)
//                   .add(mask2001.unmask(0))
//                   .add(mask2002.unmask(0))
//                   .add(mask2003.unmask(0))
//                   .add(mask2004.unmask(0))
//                   .add(mask2005.unmask(0))
//                   .add(mask2006.unmask(0))
//                   .add(mask2007.unmask(0))
//                   .add(mask2008.unmask(0))
//                   .add(mask2009.unmask(0))
//                   .add(mask2010.unmask(0))
//                   .add(mask2011.unmask(0))
//                   .add(mask2012.unmask(0))
//                   .add(mask2013.unmask(0))
//                   .add(mask2014.unmask(0))
//                   .add(mask2015.unmask(0))
//                   .add(mask2016.unmask(0))
//                   .add(mask2017.unmask(0))
//                   .add(mask2018.unmask(0))
//                   .add(mask2019.unmask(0))
//                   .add(mask2020.unmask(0))
// Map.addLayer(image3.mask(image3.gt(0)), {palette: ['yellow', 'red']}, 'test')
// // Map.addLayer(image3.mask(image3.gt(0)), {}, 'mask')
// // Map.addLayer(t2)
// // Map.addLayer(mask2020, {}, '2020 MIN')
// // // Make composite from earliest burn date
// // var composite = mcd_2016.min();
// // // Clip composite to sankuru boundary and threshold (to change value to 1)
// // var composite_noelkempff = composite.clip(noelkempff).gte(0)
// // // Multiply the composite by the area of each pixel (outputs image)
// // var area = composite_noelkempff.multiply(ee.Image.pixelArea())
// // // Calculate area in square meters
// // var area_m2 = area.reduceRegion({
// //     reducer: ee.Reducer.sum(),
// //     geometry: noelkempff.geometry(),
// //     scale: 30,
// //     maxPixels: 1e10
// // })
// // print(area_m2)
// // print(
// //   'Area burned:',
// //   ee.Number(area_m2.get('BurnDate')).divide(1e6).round()
// // )
// // var burnedAreaVis = {
// //   min: 0.0,
// //   max: 365.0,
// //   palette: ['4e0400', '951003', 'c61503', 'ff1901'],
// // };
// // Map.setCenter(24.026, -2.578, 6);
// Map.setCenter(-60.8381, -14.352, 8);
// var styling = {fillColor: '00000000'}
// Map.addLayer(tshopo.style(styling), {}, 'Noel Kempff')
// // Map.addLayer(composite_noelkempff, {}, 'Composite')
// // Map.addLayer(area, {}, 'Area')
// // Map.addLayer(ee.Image.pixelArea())
// // Map.addLayer(burnedArea, burnedAreaVis, 'Burned Area');