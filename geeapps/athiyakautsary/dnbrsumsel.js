var Landsat8_T1_SR = ui.import && ui.import("Landsat8_T1_SR", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/athiyakautsary/IDN_adm2"
    }) || ee.FeatureCollection("users/athiyakautsary/IDN_adm2");
var countries = Indonesia
var Nama_Provinsi = ['Sumatera Selatan']
var geometry = countries.filter(ee.Filter.inList('NAME_1', Nama_Provinsi))
var area = ee.FeatureCollection(geometry);
Map.addLayer(geometry,{color:"Blue"}, "Provinsi");
Map.centerObject(area,7);
var prefire = ee.ImageCollection(Landsat8_T1_SR
    .filterDate('2016-01-01', '2017-12-30')
    .filterBounds(area)
    .sort('CLOUD_COVER', false));
var postfire = ee.ImageCollection(Landsat8_T1_SR
      .filterDate('2018-01-01', '2019-12-30')
      .filterBounds(area)
    .sort('CLOUD_COVER', false));
var pre_mos = prefire.mosaic().clip(area);
var post_mos = postfire.mosaic().clip(area);
var vis = {bands: ['B4','B3','B2'], min:0, max:4000, gama:1.5};
Map.addLayer(pre_mos,vis, 'Pre-fire image');
Map.addLayer(post_mos,vis, 'Post-fire image');
function maskL8sr(image) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var snowBitMask = 1 << 4;
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
  return image.updateMask(mask)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
var pre_cm_mos = prefire
.map(maskL8sr)
.mosaic()
.clip(area);
var post_cm_mos = postfire
.map(maskL8sr)
.mosaic()
.clip(area);
Map.addLayer(pre_cm_mos, vis,'Pre-fire - Clouds masked');
Map.addLayer(post_cm_mos, vis,'Post-fire - Clouds masked:');
// NBR = (NIR-SWIR2) / (NIR+SWIR2)
var pre_nir = pre_cm_mos.select('B5');
var pre_SWIR2 = pre_cm_mos.select('B7');
var preNBR = pre_nir.subtract(pre_SWIR2).divide(pre_nir.add(pre_SWIR2)).rename('preNBR ');
var post_nir = post_cm_mos.select('B5');
var post_SWIR2 = post_cm_mos.select('B7');
var postNBR = post_nir.subtract(post_SWIR2).divide(post_nir.add(post_SWIR2)).rename('postNBR ');
Map.addLayer(preNBR, {min: -1, max: 1, palette: ['red', 'white']}, 'Prefire Normalized Burn Ratio');
Map.addLayer(postNBR, {min: -1, max: 1, palette: ['red', 'white']}, 'Postfire Normalized Burn Ratio');
//dNBR (preNBR-postNBR)
var dNBR_unscaled = preNBR.subtract(postNBR);
var dNBR = dNBR_unscaled.multiply(1000);
Map.addLayer(dNBR, {min: -2000, max: 2000, palette: ['green', 'white', 'red']}, 'dNBR');
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' + // NA (terlalu tinggi)
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' + // Penghijauan tinggi
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' + // Penghijauan cukup
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' + // Tidak terbakar
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' + // Kebakaran sangat rendah
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' + // Kebakaran cukup rendah
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' + // Kebakaran cukup tinggi
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' + // Kebakaran sangat tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';
Map.addLayer(dNBR.sldStyle(intervals), {}, 'dNBR classified');
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'Kelas dNBR',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
var makeRow = function(color, name) {
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
var names = ['Penghijauan tinggi','Penghijauan cukup','Tidak terbakar', 'Kebakaran sangat rendah',
'Kebakaran cukup rendah', 'Kebakaran cukup tinggi', 'Kebakaran sangat tinggi', 'NA'];
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }