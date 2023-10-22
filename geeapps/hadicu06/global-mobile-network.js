//===================================================
// Global mobile network coverage in 2018 for a total of 910 entities running 2391 networks in 229 countries and territories, representing 2G (CDMA, 1XRTT, GSM, GPRS, EDGE) 3G (EVDO, UMTS,
// HDPA/+), and 4G (WiMax, LTE), developed and supplied by Mosaik LLC (since acquired by Ookla,
// https://www.ookla.com/).
// Source: https://zenodo.org/record/4082121#.X9T0kdhKjZs
var all_tech = ee.Image("users/hadicu06/fun/all_tech_byte_4326")
var lcPalette = ["#1b9e77ff", "#d95f02ff", "#7570b3ff"]; 
// Make land cover legend
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px', fontSize: '14px'}      // 10px -> 12px
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var legendMaps = ui.Panel({style: {shown: true, width: '150px'}});  // 420
legendMaps.style().set({position: 'bottom-left'});
legendMaps.add(ui.Label('Network coverage across croplands', {fontWeight: 'bold', fontSize: '14px'}));
legendMaps.add(makeRow('#1b9e77ff', '1: 2G'))
legendMaps.add(makeRow('#d95f02ff', '2: 3G'))
legendMaps.add(makeRow('#7570b3ff', '3: 4G'))
Map.addLayer(all_tech, {palette:lcPalette, min:1, max:3}, "all_tech_byte_4326.tif")
var text = ui.Panel({
  widgets: [
    ui.Label('Data source see:'),
    ui.Label('link').setUrl("https://zenodo.org/record/4082121#.X9T0kdhKjZs"),
    ui.Label("(note here reprojected to EPSG:4326 with nearest neighbour resampling)")
  ], 
  layout: ui.Panel.Layout.flow('horizontal'), 
  style: {'position':'bottom-left', 'height':'30px', 'padding':'0px'}
})
Map.add(text)
Map.add(legendMaps)
//===================================================
// Facebook high resolution settlement layer (30 m, between 2011 and 2015 Digital Globe imagery, gridded population estimate GPW 2015)
var fb_hrsl = ee.ImageCollection("projects/sat-io/open-datasets/hrslpop")
//Create a spatial mosaic so image collection becomes a single image
fb_hrsl = fb_hrsl.mosaic()
// Map.addLayer(fb_hrsl.neq(0), {palette:'yellow'}, "fb_hrsl bin", false)
Map.setOptions('SATELLITE')
Map.setCenter(115.396, 0.565)