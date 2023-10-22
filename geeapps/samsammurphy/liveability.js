var precipitation = ui.import && ui.import("precipitation", "image", {
      "id": "OpenLandMap/CLM/CLM_PRECIPITATION_SM2RAIN_M/v01"
    }) || ee.Image("OpenLandMap/CLM/CLM_PRECIPITATION_SM2RAIN_M/v01"),
    temperature = ui.import && ui.import("temperature", "image", {
      "id": "OpenLandMap/CLM/CLM_LST_MOD11A2-DAY_M/v01"
    }) || ee.Image("OpenLandMap/CLM/CLM_LST_MOD11A2-DAY_M/v01");
// Map options
Map.centerObject(ee.Geometry.Point(2.57,48.85), 5)
Map.setOptions('SATELLITE');
// Temperature in Celsius
var celsius = temperature.multiply(0.02).subtract(273.15)
// Temperature threshold (average / month)
var min_temp_threshold = 0   // min monthly temperature (celsius)
var max_temp_threshold = 35   // max monthly temperature (celsius)
// Precipiration threshold (total / year)
var min_precip_threshold = 400 // min total precipitation (mm / year)
var max_precip_threshold = 1000 // max total precipitation (mm / year)
// UI panel
var panel = ui.Panel({style:{position: 'bottom-right', width:'200px'}});
var min_temp_textbox = ui.Textbox('min. temperature', min_temp_threshold, update_layers)
var max_temp_textbox = ui.Textbox('max. temperature', max_temp_threshold, update_layers)
var min_precip_textbox = ui.Textbox('min. precipitation', min_precip_threshold, update_layers)
var max_precip_textbox = ui.Textbox('max. precipitation', max_precip_threshold, update_layers)
Map.add(panel)
panel.add(ui.Label('Min. montly temp (oC)'))
panel.add(min_temp_textbox)
panel.add(ui.Label('Max. monthly temp (oC)'))
panel.add(max_temp_textbox)
panel.add(ui.Label('Min. total precipitation (mm/year)'))
panel.add(min_precip_textbox)
panel.add(ui.Label('Max. total precipitation (mm/year'))
panel.add(max_precip_textbox)
// Remove map layers by name
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    //print('Layer '+name+' not found')
  }
}
// Monolithic event handler
function update_layers(){
  removeLayer('total annual precipitation')
  removeLayer('min montly temperature')
  removeLayer('max monthly temperature')
  removeLayer('liveable')
  min_temp_threshold = parseFloat(min_temp_textbox.getValue())
  max_temp_threshold = parseFloat(max_temp_textbox.getValue())
  min_precip_threshold = parseFloat(min_precip_textbox.getValue())
  max_precip_threshold = parseFloat(max_precip_textbox.getValue())
  // temperature statistics (monthly)
  var temperature_min = celsius.reduce(ee.Reducer.min())
  var temperature_max = celsius.reduce(ee.Reducer.max())
  // temperature mask
  var temp_mask = temperature_min.gt(min_temp_threshold).and(temperature_max.lt(max_temp_threshold))
  temperature_min = temperature_min.updateMask(temp_mask)
  temperature_max = temperature_max.updateMask(temp_mask)
  // precipitation statistics (annual)
  var precipitation_sum = precipitation.reduce(ee.Reducer.sum())
  var precip_min = precipitation_sum.reduce(ee.Reducer.min())
  var precip_max = precipitation_sum.reduce(ee.Reducer.max())
  // precipitation mask
  var precip_mask = precip_min.gt(min_precip_threshold).and(precip_max.lt(max_precip_threshold))
  precipitation_sum = precipitation_sum.updateMask(precip_mask)
  // precipitation palete
  var palette = ['FFA07A','FF8C00','B8860B','DAA520','808000','7CFC00','9ACD32','7FFF00','00FA9A','3CB371','20B2AA','00FFFF','00CED1','4682B4','000080','E0FFFF']
  // liveability layer
  var liveable = precip_mask.and(temp_mask)
  liveable = liveable.updateMask(liveable)
  // Map layers
  Map.addLayer(precipitation_sum.select('sum'), {min:0, max:2400, palette: palette}, 'total annual precipitation')
  Map.addLayer(temperature_min.select('min'), {min:0, max:40, palette: ['blue', 'green', 'yellow', 'red']}, 'min montly temperature')
  Map.addLayer(temperature_max.select('max'), {min:0, max:40, palette: ['blue', 'green', 'yellow', 'red']}, 'max monthly temperature')
  Map.addLayer(liveable.select('min'), {min:0, max:1, opacity:0.8, palette: ['white']}, 'liveable')
}
// init
update_layers()