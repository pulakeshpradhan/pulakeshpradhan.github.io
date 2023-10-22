var table = ee.FeatureCollection("WRI/GPPD/power_plants");
// Get a color from a fuel 
var fuelColor = ee.Dictionary({
  'Coal': '000000',
  'Oil': '593704',
  'Gas': 'BC80BD',
  'Hydro': '0565A6',
  'Nuclear': 'E31A1C',
  'Solar': 'FF7F00',
  'Waste': '6A3D9A',
  'Wind': '5CA2D1',
  'Geothermal': 'FDBF6F',
  'Biomass': '229A00'
})
// List of fuels to add to the map
var fuels = ['Coal', 'Oil', 'Gas', 'Hydro', 'Nuclear', 'Solar', 'Waste', 'Wind', 'Geothermal', 'Biomass'];
function addStyle(pt) {
  var size = ee.Number(pt.get('capacitymw')).sqrt().divide(10).add(2);
  var color = fuelColor.get(pt.get('fuel1'));
  return pt.set('styleProperty', ee.Dictionary({'pointSize': size, 'color': color}))
}
// Make a FeatureCollection out of the power plant data table
var pp = ee.FeatureCollection(table).map(addStyle);
print(pp.first())
// Add power plants of a certain fuel to the map 
function addLayer(fuel) {
  print(fuel)
  Map.addLayer(pp.filter(ee.Filter.eq('fuel1', fuel)).style({styleProperty: 'styleProperty', neighborhood: 50}), {}, fuel, true, 0.65);
}
// Apply `addLayer` to each record in `fuels`
fuelColor.keys().getInfo().map(addLayer);