/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var OLMW = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01"),
    OLMS = ee.Image("OpenLandMap/SOL/SOL_SAND-WFRACTION_USDA-3A1A1A_M/v02"),
    indonesia = ee.FeatureCollection("users/sdwijati/IDN_adm2"),
    Sesar = ee.FeatureCollection("users/sdwijati/Sesar_Jawa"),
    sandmean = {"opacity":1,"bands":["mean"],"max":100,"palette":["fbff00","b4ff00","00c4ff","0005ad"]},
    watermean = {"opacity":1,"bands":["mean"],"max":52.974,"palette":["ffffff","ff0000","fbff00","b4ff00","00c4ff","0005ad","000000"]},
    mean = {"opacity":1,"bands":["mean"],"max":100,"palette":["000000","b30000","ff0000","ffa500","fbff00","ffffff"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//---------------------------------------------------------------------------------------------------------------------// 
// Memanggil data shapefile
var nama_prov = ['Jawa Barat', 'Jakarta Raya', 'Jawa Tengah',
                  'Jawa Timur', 'Yogyakarta', 'Banten']
var prov = indonesia.filter(ee.Filter.inList('NAME_1', nama_prov));
//---------------------------------------------------------------------------------------------------------------------//   
// Memanggil data data
var s = OLMS;
var savg = s.reduce(ee.Reducer.mean());
var gtsavg = savg.updateMask(savg.gte(45))
var sandvis= {min: 0, max: 100, palette: ['fbff00','b4ff00','00c4ff','0005ad']};
Map.addLayer(savg.clip(prov), sandmean, 'Kandungan Pasir dalam Tanah')
var n = OLMW
var navg = n.reduce(ee.Reducer.mean())
Map.addLayer(navg.clip(prov), watermean, 'Kandungan Air dalam Tanah');
var xx = gtsavg.add(navg)
Map.addLayer(xx.clip(prov), mean, 'Tanah Dengan Kandungan Pasir dan Air Tinggi')
var sesar = Sesar
var bufferBy = function(size) {
  return function(feature) {
    return feature.buffer(size);   
  };
};
Map.addLayer(sesar.geometry().buffer(25000*4), {}, 'Area Dalam Radius 100Km dari Sesar Aktif Pulau Jawa')
Map.addLayer(sesar, {}, 'Garis Sesar Pulau Jawa')
Map.centerObject(prov, 7)
//---------------------------------------------------------------------------------------------------------------------//   
// Legenda Kategori Kerentanan
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#0CE84A" quantity="45" label="45" />' + // Penghijauan cukup
      '<ColorMapEntry color="#FFF300" quantity="62.658" label="62.658" />' + // Tidak terbakar
      '<ColorMapEntry color="#FF1500" quantity="80.316" label="80.316" />' + // Kebakaran sangat rendah
      '<ColorMapEntry color="#000000" quantity="97.974" label="97.974" />' + // Kebakaran cukup rendah
    '</ColorMap>' +
  '</RasterSymbolizer>';
Map.addLayer(xx.sldStyle(intervals).clip(prov), {}, 'Kategorisasi Kerentanan');
var sarbuff = sesar.map(bufferBy(25000*4))
Map.addLayer(xx.sldStyle(intervals).clipToCollection(sarbuff).clip(prov), {}, 'Area Rentan Likuefaksi Radius 100 Km dari Sesar');
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 10px'
  }});
var legendTitle = ui.Label({
  value: 'Kategori Kerentanan Likuefaksi',
  style: {fontWeight: 'bold',
    fontSize: '14px',
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
var palette =['0CE84A', 'FFF300', 'FF1500', '000000'];
var names = ['Sedang', 'Sedang', 'Tinggi', 'Sangat Tinggi'];
for (var i = 1; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
//---------------------------------------------------------------------------------------------------------------------//   
//Legenda Kandungan Air
var P = OLMW.select("b200")
var viz = {min:0, max:52.974, palette:['ffffff','ff0000','fbff00',
                                      'b4ff00','00c4ff','0005ad','000000']};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '3px 6px'
}
});
var legendTitle = ui.Label({
value: 'Kandungan Air Tanah (%)',
style: {
fontWeight: 'bold',
fontSize: '14px',
margin: '0 0 4px 0',
padding: '4'
}
});
legend.add(legendTitle);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
]
});
legend.add(panel);
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'30x150'},
style: {padding: '0px', position: 'bottom-right'}
});
legend.add(thumbnail);
var panel = ui.Panel({
widgets: [ui.Label(viz['min'])
]
});
legend.add(panel);
Map.add(legend);
//---------------------------------------------------------------------------------------------------------------------//   
// Legenda Kandungan Pasir
var q = OLMS.select("b200")
var viz1 = {min:0, max:100, palette:['fbff00','b4ff00','00c4ff','0005ad']};
var legend1 = ui.Panel({
style: {
position: 'top-right',
padding: '8px 15px'
}
});
var legendTitle1 = ui.Label({ value: 'Kandungan Pasir (%)', 
                              style: { fontWeight: 'bold',
                                      fontSize: '14px',
                                      margin: '0 0 4px 0',
                                      padding: '0'
                              }});
legend1.add(legendTitle1);
var lon1 = ee.Image.pixelLonLat().select('latitude');
var gradient11 = lon1.multiply((viz1.max-viz1.min)/100.0).add(viz1.min);
var legendImage = gradient11.visualize(viz1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['max'])
],
});
legend1.add(panel1);
var thumbnail1 = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'30x150'},
style: {padding: '1px', position: 'bottom-left'}
});
legend1.add(thumbnail1);
var panel1 = ui.Panel({
widgets: [
ui.Label(viz1['min'])
],
});
legend1.add(panel1);
Map.add(legend1);
//---------------------------------------------------------------------------------------------------------------------// 
// Menambah label judul platform
Map.add(ui.Label(
    'Pemetaan Potensi Kerentanan Likuefaksi Pulau Jawa', {fontWeight: 'bold', fontSize: '24px'}));
//---------------------------------------------------------------------------------------------------------------------// 
// Menghitung area dengan tiap tingkatan potensi kerentanan
// Luas area dengan kategori kerentanan sangat tinggi
var sgttinggi = xx.updateMask(xx.lte(97.974))
var sgttinggi2 = sgttinggi.updateMask(sgttinggi.gt(80.316))
var stinggi = sgttinggi2.clipToCollection(sarbuff).clip(prov)
var area_pxa = ee.Image.pixelArea().updateMask(stinggi.mask())
  .reduceRegion(ee.Reducer.sum(), prov, 250, null, null, false, 1e13)
  .getNumber('area')
area_pxa = ee.Number(area_pxa).divide(1e6)
print('Area Dengan Potensi Kerentanan Sangat Tinggi (km²)', area_pxa)
// Luas area dengan kategori kerentanan tinggi
var tinggi = xx.updateMask(xx.lte(80.316))
var tinggi2 = tinggi.updateMask(tinggi.gt(62.658))
var tgi = tinggi2.clipToCollection(sarbuff).clip(prov)
var area_pxb = ee.Image.pixelArea().updateMask(tgi.mask())
  .reduceRegion(ee.Reducer.sum(), prov, 250, null, null, false, 1e13)
  .getNumber('area')
area_pxb = ee.Number(area_pxb).divide(1e6)
print('Area Dengan Potensi Kerentanan Tinggi (km²)', area_pxb)
// Luas area dengan kategori kerentanan sedang
var sedang = xx.updateMask(xx.lte(62.658))
var sedang2 = sedang.updateMask(sedang.gt(45))
var sdg = sedang2.clipToCollection(sarbuff).clip(prov)
var area_pxc = ee.Image.pixelArea().updateMask(sdg.mask())
  .reduceRegion(ee.Reducer.sum(), prov, 250, null, null, false, 1e13)
  .getNumber('area')
area_pxc = ee.Number(area_pxc).divide(1e6)
print('Area Dengan Potensi Kerentanan Sedang (km²)', area_pxc)
//Luas area dalam batasan administratif provinsi provinsi di pulau jawa
print('Area administratif provinsi provinsi P. Jawa (km²)', prov.geometry().area().divide(1e6))