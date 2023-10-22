var Indonesia = ui.import && ui.import("Indonesia", "table", {
      "id": "users/manaufaldi21/IDN_adm2"
    }) || ee.FeatureCollection("users/manaufaldi21/IDN_adm2"),
    Landsat8 = ui.import && ui.import("Landsat8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    TNBTS = ui.import && ui.import("TNBTS", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                112.80156658961775,
                -8.137793492511745
              ],
              [
                112.8537516482115,
                -8.152747302586738
              ],
              [
                112.90113018825056,
                -8.165661506840262
              ],
              [
                112.95743511989119,
                -8.162263072503714
              ],
              [
                113.00069378688337,
                -8.139152952868454
              ],
              [
                113.02472637965681,
                -8.108563980449462
              ],
              [
                113.01579998805525,
                -8.063016090531843
              ],
              [
                113.02197979762556,
                -8.022222580499184
              ],
              [
                113.04807232692244,
                -7.980064986275489
              ],
              [
                113.02884625270369,
                -7.961024645919034
              ],
              [
                112.97254132106306,
                -7.96986491411664
              ],
              [
                112.94919537379744,
                -7.97802499219781
              ],
              [
                112.88190411403181,
                -7.97326496643367
              ],
              [
                112.81049298121931,
                -8.017463070607924
              ],
              [
                112.79538678004744,
                -8.116721267631274
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
        [[[112.80156658961775, -8.137793492511745],
          [112.8537516482115, -8.152747302586738],
          [112.90113018825056, -8.165661506840262],
          [112.95743511989119, -8.162263072503714],
          [113.00069378688337, -8.139152952868454],
          [113.02472637965681, -8.108563980449462],
          [113.01579998805525, -8.063016090531843],
          [113.02197979762556, -8.022222580499184],
          [113.04807232692244, -7.980064986275489],
          [113.02884625270369, -7.961024645919034],
          [112.97254132106306, -7.96986491411664],
          [112.94919537379744, -7.97802499219781],
          [112.88190411403181, -7.97326496643367],
          [112.81049298121931, -8.017463070607924],
          [112.79538678004744, -8.116721267631274]]]);
//--------------------------------------------------------------------
var area = ee.FeatureCollection ([TNBTS]);
Map.addLayer(area,{color:"Orange" },"Area");
Map.centerObject (area,11.5);
//--------------------------------------------------------------------
var prefire = ee.ImageCollection(Landsat8
    .filterDate('2019-04-01' , '2019-09-30')
    .filterBounds(area)
    .sort('CLOUD_COVER', false));
var postfire = ee.ImageCollection(Landsat8
    .filterDate('2019-10-01' , '2020-03-28')
    .filterBounds(area)
    .sort('CLOUD_COVER', false));
var pre_mos = prefire
    .mosaic()
    .clip(area);
var post_mos = postfire
    .mosaic()
    .clip(area);
var visParams = {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 3000,
    gamma: 1.4,
};
Map.addLayer (pre_mos, visParams, 'prefire');
Map.addLayer (post_mos, visParams, 'postfire');
//------------------------------------------------------------------------
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
Map.addLayer(pre_cm_mos, visParams,'Pre-fire - Clouds masked');
Map.addLayer(post_cm_mos, visParams,'Post-fire - Clouds masked:');
// NBR = (NIR-SWIR2) / (NIR+SWIR2)------------------------------------------------
var pre_nir = pre_cm_mos.select('B5');
var pre_SWIR2 = pre_cm_mos.select('B7');
var preNBR = pre_nir.subtract(pre_SWIR2).divide(pre_nir.add(pre_SWIR2)).rename('preNBR');
var post_nir = post_cm_mos.select('B5');
var post_SWIR2 = post_cm_mos.select('B7');
var postNBR = pre_nir.subtract(post_SWIR2).divide(pre_nir.add(post_SWIR2)).rename('postNBR');
Map.addLayer(preNBR, {min:-1, max:1, palette:['red','white']}, 'Prefire Normalized Burn Ratio');
Map.addLayer(postNBR, {min:-1, max:1, palette:['red','white']}, 'Postfire Normalized Burn Ratio');
//dNBR = preNBR-postNBR-------------------------------------------------------------------------
var dNBR_unscaled = preNBR.subtract(postNBR);
var dNBR = dNBR_unscaled.multiply(1000);
Map.addLayer(dNBR, {min:-2000, max:2000, palette:['green','white','red']},'delta Normalized Burn Ratio');
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' + // N/A
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
  value: 'Tingkat dNBR Kebakaran Taman Nasional Bromo Tengger Sumeru Tahun 2019',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
//-------------------------------------------------------------------------
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
'Kebakaran cukup rendah', 'Kebakaran cukup tinggi', 'Kebakaran sangat tinggi', 'N/A'];
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }