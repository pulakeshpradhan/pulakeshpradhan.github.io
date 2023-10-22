var ssh = ui.import && ui.import("ssh", "imageCollection", {
      "id": "users/fbaart/osu/h_tpxo9_atlas_30"
    }) || ee.ImageCollection("users/fbaart/osu/h_tpxo9_atlas_30");
var m2 = ee.Image('users/fbaart/osu/h_tpxo9_atlas_30/m2')
// Is  this equivalent to amp = abs(b1+i*b2)
var amp = (m2.select('b1').add(m2.select('b2').multiply(-1))).abs()
var amp = m2.select('b1').pow(2).add(m2.select('b2').pow(2)).sqrt()
// atan2(-hIm,hRe)/pi*180;" 
var phase = m2.select('b1').atan2(m2.select('b2'))
// Create a visualisation, h based on phase, s and v based on amplitude
var h = phase.unitScale(-Math.PI,  Math.PI)
var s = amp.unitScale(0, 1000).clamp(0, 0.7)
var v = amp.unitScale(0, 3000).clamp(0, 1)
var hsv = h.addBands(s).addBands(v)
print(hsv)
var rgb = hsv.hsvToRgb()
Map.addLayer(amp, {min: 0, max: 1000}, 'amplitude', false)
Map.addLayer(phase, {}, 'phase', false)
Map.addLayer(rgb, {}, 'rgb', true)