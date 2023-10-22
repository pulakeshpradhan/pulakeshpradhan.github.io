// Mapping Our Human Footprint
// Membuat Panel
var panel = ui.Panel({style: {width: '250px'}})
ui.root.insert(0, panel)
// Insert Logo ke Panel
var logo = ee.Image('users/gheaayunda19/output').visualize({
  bands: ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
})
var thumbnail = ui.Thumbnail({
  image: logo,
  params: {dimensions: '70x60', format: 'png'},
  style: {height: '60px', width: '70px', padding: '2'}
})
panel.add(thumbnail)
// Header
var header1 = ui.Label('BVT Academy', {fontWeight: 'bold', fontSize: '20px', margin: '2px 8px'})
var header2 = ui.Label(' Mapping Our Human Footprint', {fontWeight: 'bold', fontSize: '15px', margin: '0px 10px'})
panel.add(header1).add(header2)
// Description
var description = ui.Label('Google Earth Engine merupakan salah satu platform berbasis cloud untuk analisa data geospatial terutama data dalam bentuk raster. Pada materi ini akan dipaparkan mengenai teori dasar remote sensing hingga  pemanfaatan GEE untuk melakukan pemetaan human footprint menggunakan data-data citra opensource.', {fontSize: '12px', textAlign: 'justify', margin: '2px 10px'})
panel.add(description)
// Select Location
var jakarta = ee.Geometry.Point([106.82, -6.23]),
    bandung = ee.Geometry.Point([107.60, -6.93]),
    surabaya = ee.Geometry.Point([112.75, -7.26]),
    denpasar = ee.Geometry.Point([115.21, -8.67])
var JAKARTA = 'DKI Jakarta',
    BANDUNG = 'Kota Bandung',
    SURABAYA = 'Kota Surabaya',
    DENPASAR = 'Kota Denpasar'
var selectKota = ui.Select({
  items: [JAKARTA, BANDUNG, SURABAYA, DENPASAR],
  placeholder: 'Kota/Kabupaten',
  style: {margin: '2px 10px'},
  onChange: applyFilter1
})
var labelKota = ui.Label({value: 'Pilih Kota/Kabupaten:',
  style: {fontSize: '12px', fontWeight: 'bold', margin: '5px 10px'}})
panel.add(labelKota).add(selectKota)
var kota, namakota, geometry
function applyFilter1(){
    namakota = selectKota.getValue()
    if (namakota == JAKARTA){
      kota = jakarta}
    else if (namakota == BANDUNG){
      kota = bandung}
    else if (namakota == SURABAYA){
      kota = surabaya}
    else if (namakota == DENPASAR){
      kota = denpasar}
geometry = kota
}
// Pembatasan historis dateslider
var start = ee.Date('2017-01-01')
var end = ee.Date(new Date().getTime())
// Import data batas administrasi
var country = ["Indonesia"]
var boundaries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.inList("country_na", country))
// Built Up Area Layer
// Import citra Landsat 8
var image_Landsat = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
                    .filterDate(start, end)
                    .filterMetadata('CLOUD_COVER', 'less_than', 5)
// Perhitungan Built Up Area
var perhitungan_index = image_Landsat.map(function(img) {
  var ndvi = img.normalizedDifference(['B5', 'B4']).rename('NDVI')
  var ndbi = img.expression('(B6-B5)/(B6+B5)',{
              'B6':img.select('B6'),
              'B5':img.select('B5')
  }).rename('NDBI')
  var newBands = img.select().addBands([ndvi, ndbi])
  return(newBands)
});
var built_up_area = perhitungan_index.map(function(img) {
  applyFilter1()
  var diffThreshold = 0.2
  var built_up = img.expression('(NDVI-NDBI)', {
    'NDVI': img.select('NDVI'),
    'NDBI': img.select('NDBI')
  }).lt(diffThreshold).selfMask()
  var built_up_area = img.select().addBands([built_up]).clip(boundaries)
  return(built_up_area)
})
// Visualisasi dan Pembuatan Date Slider Built Up Area
function renderSlider_bua(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 365, // setiap satu tahun
    style: {height:'100px' ,width:'200px', position:'top-center'},
    onChange: renderDateRange_bua
  })
  Map.add(slider)
}
function renderDateRange_bua(dateRange) {
  var image_bua = built_up_area
    .filterDate(dateRange.start(), dateRange.end())
  var vis_bua = {min: 0, max: 1, palette: ['orange']}  
  var layer_bua = ui.Map.Layer(image_bua, vis_bua, 'Built Up Area')
  Map.centerObject(geometry, 11)
  Map.layers().reset([layer_bua])
}
// Nightlights Data Layer
// Import dataset VIIRS
var image_NOAA = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG")
                  .filterDate(start, end)
var nightlight_data = image_NOAA.map(function(img) {
  applyFilter1()
  var filter_image = img.select("avg_rad").clip(boundaries)
  return(filter_image)
})
// Visualisasi dan Pembuatan Date Slider NightLight Data
function renderSlider_nd(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 365, // setiap satu tahun
    style: {height:'100px' ,width:'200px', position:'top-center'},
    onChange: renderDateRange_nd
  })
  Map.add(slider)
}
function renderDateRange_nd(dateRange) {
  var image_nd = nightlight_data
    .filterDate(dateRange.start(), dateRange.end())
    .mean()
  var vis_nd = {min:1,max:10, opacity:0.7, palette:['000000','808080','FFFF00','ffffff','ffffff','ffffff']}  
  var layer_nd = ui.Map.Layer(image_nd, vis_nd, 'Nightlights Data')
  Map.centerObject(geometry, 11)
  Map.layers().reset([layer_nd])
}
// Select Layer
var nama_layer1 = 'Built Up Area',
    nama_layer2 = 'Nightlight Data'
var selectLayer = ui.Select({
  items: [nama_layer1, nama_layer2],
  placeholder: 'Layer',
  style: {margin: '2px 10px'},
  onChange: applyFilter2
})
var labelLayer = ui.Label({value: 'Pilih Layer:',
  style: {fontSize: '12px', fontWeight: 'bold', margin: '5px 10px'}})
panel.add(labelLayer).add(selectLayer)
var layer, namaLayer
function applyFilter2(){
    namaLayer = selectLayer.getValue()
    if (namaLayer == nama_layer1){
      layer = ee.Dictionary({start: start, end: end})
              .evaluate(renderSlider_bua)}
    else if (namaLayer == nama_layer2){
      layer = ee.Dictionary({start: start, end: end})
              .evaluate(renderSlider_nd)}
}
// Reset Map/Clear Map
var resetButton = ui.Button({label: 'Reset Map', onClick: reset, style: {margin: '10px 10px'}});
panel.add(resetButton);
function reset(){
  Map.clear();
}
// Menambahkan legenda built up area
var vis_bua = {min: 0, max: 1, palette: ['orange']}
// Thumbnail Legenda
function buaColorBarParam(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '50x50',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Color bar
var colorBar_bua = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: buaColorBarParam(vis_bua.palette),
  style: {margin: '2px 10px', maxHeight: '15px', border:'1px solid black'},
});
// Keterangan legenda
var judulLegenda_bua = ui.Label({
  value: 'Built Up Area',
  style: {fontSize: '12px', fontWeight: 'bold', margin: '5px 10px'}
});
var legenda_bua = ui.Panel([judulLegenda_bua, colorBar_bua])
panel.add(legenda_bua)
// Menambahkan legenda nightlight data
var vis_nd = {min:1,max:10,palette:['000000','808080','FFFF00','ffffff','ffffff','ffffff']}
// Thumbnail Legenda
function ndColorBarParam(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Color bar
var colorBar_nd = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: ndColorBarParam(vis_nd.palette),
  style: {stretch: 'horizontal', margin: '2px 10px', maxHeight: '15px', border:'1px solid black'},
});
// Keterangan legenda
var labelLegenda_nd = ui.Panel({
  widgets: [
    ui.Label(vis_nd.min, {fontSize: '8px', fontWeight:'bold', margin: '2px 8px'}),
    ui.Label(
        ((vis_nd.max-vis_nd.min) / 2+vis_nd.min),
        {fontSize: '8px', fontWeight:'bold', margin: '2px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis_nd.max, {fontSize: '8px', fontWeight:'bold', margin: '2px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var judulLegenda_nd = ui.Label({
  value: 'Nightlight Data',
  style: {fontSize: '12px', fontWeight: 'bold', margin: '5px 10px'}
});
var legenda_nd = ui.Panel([judulLegenda_nd, colorBar_nd, labelLegenda_nd])
panel.add(legenda_nd)
// Customize Basemap (Adapted from: Matthew Pill)
var DarkTheme =[
   {featureType: 'all',
    elementType: 'geometry',
    stylers:[{color: '#202c3e'}]},
   {featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{gamma: 0.01}, {lightness: 20}, {weight: 1.39}, {color: '#ffffff'}]},
   {featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{weight: 0.96}, {saturation: '9'}, {visibility: 'on'}, {color: '#000000'}]},
    {featureType: 'all',
     elementType: 'labels.icon',
     stylers: [{visibility: 'off'}]},
    {featureType: 'landscape',
     elementType: 'geometry',
     stylers: [{lightness: 30}, {saturation: 9}, {color: '#29446b'}]},
    {featureType: 'poi',
     elementType: 'geometry',
     stylers: [{saturation: 20}]},
    {featureType: 'poi.park',
     elementType: 'geometry',
     stylers: [{lightness: 20}, {saturation: -20}]},
    {featureType: 'road',
     elementType: 'geometry',
     stylers: [{lightness: 10}, {saturation: -30}]},
    {featureType: 'road',
     elementType: 'geometry.fill',
     stylers: [{color: '#193a55'}]},
    {featureType: 'road',
     elementType: 'geometry.stroke',
     stylers: [{saturation: 25}, {lightness: 25}, {weight: 0.01}]},
    {featureType: 'water',
     elementType: 'all',
     stylers: [{lightness: -20}]}
]
Map.setOptions('Dark Basemap', {'Dark Basemap': DarkTheme});