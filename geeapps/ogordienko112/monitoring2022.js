var poi = ui.import && ui.import("poi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            12.277488315345453,
            42.05436187016037
          ]
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
    ee.Geometry.Point([12.277488315345453, 42.05436187016037]),
    osm_landuse_farmland = ui.import && ui.import("osm_landuse_farmland", "table", {
      "id": "projects/ee-ogordienko112/assets/osm_landuse_farmland"
    }) || ee.FeatureCollection("projects/ee-ogordienko112/assets/osm_landuse_farmland"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                12.076639385010752,
                42.04737123943983
              ],
              [
                12.076639385010752,
                41.83848114031154
              ],
              [
                12.475580425049815,
                41.83848114031154
              ],
              [
                12.475580425049815,
                42.04737123943983
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[12.076639385010752, 42.04737123943983],
          [12.076639385010752, 41.83848114031154],
          [12.475580425049815, 41.83848114031154],
          [12.475580425049815, 42.04737123943983]]], null, false);
// BI Index Sensilize
//Map.addLayer(osm_landuse_farmland,{},'osm_landuse_farmland')
// BI = sqrt( ( (red_factor * red * red_factor * red) + 
// + (green_factor * green * green_factor * green) ) / 2 )
// BI2 = sqrt( ( (red_factor * red * red_factor * red) + (green_factor * green * green_factor * green) + 
// + (IR_factor * near_IR * IR_factor * near_IR) ) / 3 )
var fao = ee.FeatureCollection("FAO/GAUL/2015/level0")
.filter(ee.Filter.eq('ADM0_NAME','Italy'));
//Map.addLayer(fao,{},'fao',false);
var  sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");
var s2Filter_Date = sentinel2
  .filterDate('2018-03-28','2018-08-01')
  .filter(ee.Filter.dayOfYear(121, 274))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var s2_Date_Clouds = s2Filter_Date.map(maskS2clouds);
var s2_clouds_clip = s2_Date_Clouds.filterBounds(fao);
var addindex = function(image) {
  var ndvi = image.expression ('(nir-red)/(nir+red)',{
    'nir': image.select('B8'),
    'red': image.select('B4')
  }).rename('NDVI');
  var bi = image.expression ('(nir-red)/(nir+red)',{
    'nir': image.select('B8'),
    'red': image.select('B4')
  }).rename('BI');
  return image.addBands(ndvi).addBands(bi);
};
var with_index = s2_clouds_clip.map(addindex);
//print(with_index.size());
// var ndvi2 = ee.Image(1)
//           .where(ndvi.gt(0.0).and(ndvi.lte(0.2)), 2)
//           .where(ndvi.gt(0.2).and(ndvi.lte(0.4)), 3)
//           .where(ndvi.gt(0.4).and(ndvi.lte(0.6)), 4)
//           .where(ndvi.gt(0.6), 5)
var ndvi_1 = function(image){
  var ndvi1 = image.expression ('(nir-red)/(nir+red)',{
    'nir': image.select('B8'),
    'red': image.select('B4')
  }).rename('NDVI_gt02');
    return image.addBands(ndvi1).where(ndvi1.gt(0.2),1);
};
var with_class = s2_clouds_clip.map(ndvi_1);
print(with_class.first());
//Map.addLayer(with_class.median(),{},'ndvi gt 02',false);
//Map.addLayer(with_index.first(),{},'show',false);
var image = ee.Image('JRC/D5/EUCROPMAP/V1/2018');
var mask = ee.Image(image)
  .eq(290);
var masked = ee.Image(image)
  .updateMask( image.eq(290) );
//Map.addLayer(masked,{},'masked',false);
var masked_feature = masked.reduceToVectors({
  geometry: geometry,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone'
});
//Map.addLayer(masked_feature, {}, 'EUCROPMAP 2018',false);
print(image);
var osm_landuse_farmland = ee.FeatureCollection(osm_landuse_farmland);
var osmClip = image.clip(osm_landuse_farmland)
Map.addLayer(osmClip)
var addindex1 = function(image) {
var bi = image.expression ('sqrt(((red_factor * red * red_factor * red) + (green_factor * green * green_factor * green))/2)',{
   'red_factor': 1,
    'red': image.select('B4'),
    'green_factor': 1,
    'green': image.select('B3')
  }).rename('BI_1');
  return image.addBands(bi);
}
var bi_ready = s2_clouds_clip.map(addindex1);
var clip_bi = bi_ready.select('BI_1').median().clip(osm_landuse_farmland)
Map.addLayer(clip_bi,{},'BI')