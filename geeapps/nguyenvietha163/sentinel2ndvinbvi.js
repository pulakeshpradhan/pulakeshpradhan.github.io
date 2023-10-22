/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("projects/ee-nguyenvietha163/assets/Tinh"),
    table2 = ee.FeatureCollection("projects/ee-nguyenvietha163/assets/Huyen");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var s2 = ee.ImageCollection("COPERNICUS/S2"),
    dvhc = ee.FeatureCollection("projects/ee-nguyenvietha163/assets/Tinh"),
    dvhc_huyen = ee.FeatureCollection("projects/ee-nguyenvietha163/assets/Huyen"),
    NDBI = ee.Image,
    ndvi = ee.Image,
    geometry = ee.Geometry,
    tenhuyen = ee.String,
    tentinh = ee.String;
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Anh Ve Tinh',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
});
mainPanel.add(dropdownPanel);
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })
  // Them Lua Chon DVHC
// Them Vung Dia Phan 
// dropdown dvhc
var dvhclist =dvhc.aggregate_array('NAME_EN')
var dvhcSelect = ui.Select({
  placeholder: 'doi 1 chut',
})
var dvhc_huyenSelect = ui.Select({
  placeholder: 'vui long chon tinh',
})
var button = ui.Button('Load theo tinh')
var button_huyen = ui.Button('Load theo huyen')
var button2 = ui.Button('Clear')
var button_save = ui.Button('Luu Anh ve CLOUD')
dropdownPanel.add(yearSelector)
dropdownPanel.add(monthSelector)
dropdownPanel.add(dvhcSelect)
dropdownPanel.add(dvhc_huyenSelect)
dropdownPanel.add(button)
dropdownPanel.add(button_huyen)
dropdownPanel.add(button2)
dropdownPanel.add(button_save)
// Let's add a dropdown with the years
var years = ee.List.sequence(2014, 2020),
 months = ee.List.sequence(1, 12);
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('select a year')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('select a month')
})
dvhclist.evaluate(function(tinhlist){
   dvhcSelect.items().reset(tinhlist)
   dvhcSelect.setPlaceholder('Chọn Tỉnh')
   dvhcSelect.onChange(function(tentinhchon){
                       var dsHuyen = dvhc_huyen.filter(ee.Filter.eq('PROVINCE',tentinhchon)).aggregate_array('NAME_EN')
                       dsHuyen.evaluate(function(huyenlist){
                                       dvhc_huyenSelect.items().reset(huyenlist)
                                       dvhc_huyenSelect.setPlaceholder('chon huyen')
                                                          })
                                           })
                                    })
// Define a function that triggers when any value is changed
var loadComposite = function() {
  var year = yearSelector.getValue()
  var month = monthSelector.getValue()
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number.parse(month), 1)
  var endDate = startDate.advance(3, 'month')
  tentinh = dvhcSelect.getValue()
  var VungTinh= dvhc.filter(ee.Filter.eq('NAME_EN', tentinh))
  geometry = VungTinh.geometry()
  var filtered = s2.filter(ee.Filter.date(startDate, endDate))
                    .filter(ee.Filter.bounds(geometry))
                   // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                    .map(maskS2clouds);
  var image = ee.Image(filtered.median())
 ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);
 NDBI = image.normalizedDifference(['B11','B8']).rename(['NDBI']);
var ndviVis = {min:0, max:1, palette: ['white', 'green']}
var ndbiVIS= {min:0, max:1, palette: ['white', 'red']}
var rgbVis = {min: 0.0, max: 0.3, bands: ['B4', 'B3', 'B2']}
  var layerName = 'Anh ve tinh ' + year + '-' + month
  Map.addLayer(image.clip(geometry), rgbVis, layerName)
  Map.addLayer(ndvi.clip(geometry), ndviVis, 'NDVI')
  Map.addLayer(NDBI.clip(geometry),ndbiVIS,'NBDI')
  Map.centerObject(geometry)
}
button.onClick(loadComposite)
var loadComposite2 = function() {
  var year = yearSelector.getValue()
  var month = monthSelector.getValue()
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number.parse(month), 1)
  var endDate = startDate.advance(2, 'month')
 tenhuyen = dvhc_huyenSelect.getValue()
  var VungHuyen= dvhc_huyen.filter(ee.Filter.eq('NAME_EN', tenhuyen))
   geometry = VungHuyen.geometry()
  var filtered = s2.filter(ee.Filter.date(startDate, endDate))
                    .filter(ee.Filter.bounds(geometry))
                   // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                    .map(maskS2clouds);
  var image = ee.Image(filtered.median())
 ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);
 NDBI = image.normalizedDifference(['B11','B8']).rename(['NDBI']);
var ndviVis = {min:0, max:1, palette: ['white', 'green']}
var ndbiVIS= {min:0, max:1, palette: ['white', 'red']}
var rgbVis = {min: 0.0, max: 0.3, bands: ['B4', 'B3', 'B2']}
  var layerName = 'Ảnh Vệ Tinh ' + year + '-' + month
  Map.addLayer(image.clip(geometry), rgbVis, layerName)
  Map.addLayer(ndvi.clip(geometry), ndviVis, 'NDVI')
  Map.addLayer(NDBI.clip(geometry),ndbiVIS,'NBDI')
  Map.centerObject(geometry)
}
button_huyen.onClick(loadComposite2)
button2.onClick(function(clear){
  Map.clear()})
Map.setCenter(106, 21, 8)
ui.root.add(mainPanel);
button_save.onClick(function(){
 Export.image.toDrive({
    image: NDBI,
    description: 'XuatAnhNDBI',
    folder: 'earthengine',
    fileNamePrefix: 'NDBI_' +tentinh + '-' + tenhuyen,
    region: geometry,
    scale: 10,
    maxPixels: 1e9})
    Export.image.toDrive({
    image: ndvi,
    description: 'XuatAnhNDVI',
    folder: 'earthengine',
    fileNamePrefix: 'NDVI_' +tentinh + '-' + tenhuyen,
    region: geometry,
    scale: 10,
    maxPixels: 1e9})
})