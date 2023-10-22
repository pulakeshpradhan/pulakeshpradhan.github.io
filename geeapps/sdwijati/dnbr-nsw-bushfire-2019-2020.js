var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    Aus = ui.import && ui.import("Aus", "table", {
      "id": "users/sdwijati/AUS_adm2"
    }) || ee.FeatureCollection("users/sdwijati/AUS_adm2"),
    area = ui.import && ui.import("area", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                152.34537336766866,
                -31.194857835635897
              ],
              [
                152.14212629735616,
                -31.185459545822727
              ],
              [
                152.14761946141866,
                -31.265315247610634
              ],
              [
                152.09818098485616,
                -31.373247823370583
              ],
              [
                152.07071516454366,
                -31.48574108767749
              ],
              [
                151.89493391454366,
                -31.48105656394938
              ],
              [
                151.73563215673116,
                -31.509160187452057
              ],
              [
                151.77408430516866,
                -31.551299781655857
              ],
              [
                151.74112532079366,
                -31.62616763909202
              ],
              [
                151.77957746923116,
                -31.8224091504347
              ],
              [
                151.97733137548116,
                -31.990284934069276
              ],
              [
                152.25748274266866,
                -32.14390168117588
              ],
              [
                152.51016828954366,
                -32.17645385907247
              ],
              [
                152.53763410985616,
                -32.07876245571048
              ],
              [
                152.56509993016866,
                -31.990284934069276
              ],
              [
                152.60355207860616,
                -31.91104842136711
              ],
              [
                152.74088118016866,
                -31.850409707574688
              ],
              [
                152.79031965673116,
                -31.724340334248065
              ],
              [
                152.76285383641866,
                -31.677604376298888
              ],
              [
                152.82327864110616,
                -31.607456315201887
              ],
              [
                152.84525129735616,
                -31.53257342065868
              ],
              [
                152.81229231298116,
                -31.368557675970656
              ],
              [
                152.61453840673116,
                -31.25122796853435
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[152.34537336766866, -31.194857835635897],
          [152.14212629735616, -31.185459545822727],
          [152.14761946141866, -31.265315247610634],
          [152.09818098485616, -31.373247823370583],
          [152.07071516454366, -31.48574108767749],
          [151.89493391454366, -31.48105656394938],
          [151.73563215673116, -31.509160187452057],
          [151.77408430516866, -31.551299781655857],
          [151.74112532079366, -31.62616763909202],
          [151.77957746923116, -31.8224091504347],
          [151.97733137548116, -31.990284934069276],
          [152.25748274266866, -32.14390168117588],
          [152.51016828954366, -32.17645385907247],
          [152.53763410985616, -32.07876245571048],
          [152.56509993016866, -31.990284934069276],
          [152.60355207860616, -31.91104842136711],
          [152.74088118016866, -31.850409707574688],
          [152.79031965673116, -31.724340334248065],
          [152.76285383641866, -31.677604376298888],
          [152.82327864110616, -31.607456315201887],
          [152.84525129735616, -31.53257342065868],
          [152.81229231298116, -31.368557675970656],
          [152.61453840673116, -31.25122796853435]]]);
Map.centerObject(area, 9);
var prefire = L8
    .filterDate('2019-04-01', '2019-05-30')
    .filterBounds(area)
    .sort('CLOUD_COVER', false);
var postfire = L8
    .filterDate('2019-12-01', '2020-01-31')
    .filterBounds(area)
    .sort('CLOUD_COVER', false)
var pre_mos = prefire.mosaic().clip(area)
var post_mos = postfire.mosaic().clip(area)
var vis = {bands: ['B4', 'B3', 'B2'], 
          min:0,
          max: 4000,
          gamma:1.5};
Map.addLayer(pre_mos, vis, 'Pre-fire image')
Map.addLayer(post_mos, vis, 'Post-fire image')
function maskL8sr(image){
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