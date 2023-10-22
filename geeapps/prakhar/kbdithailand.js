var gadm = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    geoFrame = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[95.60755650772899, 20.528302478004633],
          [95.60755650772899, 4.541834524032589],
          [109.93372838272899, 4.541834524032589],
          [109.93372838272899, 20.528302478004633]]], null, false);
var shp_thai = gadm.filter(ee.Filter.eq('country_co', 'TH'));
Map.centerObject(shp_thai, 5);
// Source - https://docs.google.com/presentation/d/1gvkqkpI2eDumg2oXxSP3v1U_TkFHCnc2iieov-1_HUE/edit#slide=id.g49e35993ef_0_11
var animation = require('users/gena/packages:animation')
// get collection
var collection = ee.ImageCollection('UTOKYO/WTLAB/KBDI/v1')
  .select('KBDI')
  .filterDate('2018-01-01', '2018-12-30').map(function(img){return img.clip(shp_thai)});
// basic vizualize
var band_viz = {
  min: 0,
  max: 800,
  bands: ["KBDI"],
  palette: [
    '001a4d', '003cb3', '80aaff', '336600', 'cccc00', 'cc9900', 'cc6600',
    '660033'
  ]
};
Map.addLayer(collection.mean(), band_viz, 'KBDI', 0);
animation.animate(collection, {
  vis: band_viz,
  position: 'bottom-right',
  maxFrames: 300,
  width: '500px'
})
// export video
var utils = require('users/gena/packages:utils');
utils.exportVideo(collection, {bounds: geoFrame.bounds(), label: 'KBDI', maxFrames: 100, name: 'KBDIthai', label: 'KBDIthai' });