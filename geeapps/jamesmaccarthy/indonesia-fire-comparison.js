// load country data
var countries = ee.FeatureCollection("FAO/GAUL/2015/level1")
var aois =  [
  'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Tengah',
  'Nangroe Aceh Darussalam', 'Sumatera Utara', 'Riau', 'Sumatera Barat', 'Jambi',
  'Bengkulu', 'Sumatera Selatan', 'Lampung', 'Papua', 'Papua Barat', 'Bangka Belitung'
]
var indo = countries.filter(
  ee.Filter.inList('ADM1_NAME', aois)
)
// center map
Map.centerObject(indo)
// load primary forest data
var primary_forest = ee.Image('users/jamesmaccarthy/drivers_indonesia/primary_forest_asia').clip(indo)
// load sentinel-1 burn data
var suma_2015 = ee.Image('users/jamesmaccarthy/indo_fires/sumatra_2015').selfMask()
var kali_2015 = ee.Image('users/jamesmaccarthy/indo_fires/kalimantan_2015').selfMask()
var papu_2015 = ee.Image('users/jamesmaccarthy/indo_fires/papua_2015').selfMask()
var s1_2015 = ee.ImageCollection([suma_2015, kali_2015, papu_2015]).mosaic()
var suma_2016 = ee.Image('users/jamesmaccarthy/indo_fires/sumatra_2016').selfMask()
var kali_2016 = ee.Image('users/jamesmaccarthy/indo_fires/kalimantan_2016').selfMask()
var papu_2016 = ee.Image('users/jamesmaccarthy/indo_fires/papua_2016').selfMask()
var s1_2016 = ee.ImageCollection([suma_2016, kali_2016, papu_2016]).mosaic()
var tclf = ee.ImageCollection('users/sashatyu/2001-2021_fire_forest_loss_annual').mosaic()
var tclf_2016 = tclf.select('b1').eq(16).selfMask().clip(indo)
var intersection = s1_2015.updateMask(tclf_2016)
Map.addLayer(indo, null, 'admin')
Map.addLayer(primary_forest.selfMask(), {palette: 'green'}, 'primary forest')
Map.addLayer(tclf_2016, {palette:['red']}, 'tclf_2016')
Map.addLayer(s1_2015, {palette:['cyan']}, 's1_2015')
Map.addLayer(intersection, {palette:['pink']}, 'intersection')
Map.addLayer(kali_2016.select('b1'), {palette:['magenta']}, 's1_2016')
// Map.addLayer(tclf_2016.clip(indo), {palette:['#FFDF52']}, 'tclf_2016')
// // Map.addLayer(burn_s1, {palette:['04A777']}, 'burn_s1')
// Map.addLayer(intersection, {palette:['#DF5200']}, 'overlap')