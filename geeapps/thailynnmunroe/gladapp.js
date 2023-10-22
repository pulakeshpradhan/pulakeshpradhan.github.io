Map.style().set({cursor: 'crosshair'});
Map.setCenter(-61.64775390624999,-5.435884044248108,6)
// Grab the latest GLAD image for your region of interest
var glad_ic = ee.ImageCollection("projects/glad/alert/UpdResult")
print(glad_ic)
var latest = ee.Image(glad_ic.filterMetadata('system:index','contains','SA').toList(400).get(-1)).select(['alertDate20']);
var coords = []
var counter = ee.Number(0)
function handleMapClick(location) {
  coords.push([location.lon, location.lat]);
  Map.addLayer(ee.Geometry.Point([location.lon, location.lat]),{},'clicked point')
  counter.add(1)
}
//Apply it to the app
Map.onClick(handleMapClick)
//Add run button
var button_run = ui.Button('Run analysis');
button_run.onClick(function(){
  Map.clear()
  get_alerts();
  Map.add(panel);
})
var button_clear = ui.Button('Clear');
button_clear.onClick(function(){
  clearResults();
})
var panel = ui.Panel([button_run, button_clear],ui.Panel.Layout.flow("horizontal"))
var panel2 = ui.Panel([ui.Label('This analysis will return the top 5 most concerning deforestation areas in a region of your choice. Instructions: draw an area in South America and click "Run analysis".')])
panel2.style().set({position: 'bottom-center'});
Map.add(panel);
Map.add(panel2);
function clearResults(){
  coords = []
  Map.clear()
  Map.setCenter(-61.64775390624999,-5.435884044248108,6)
  Map.add(panel);
  Map.add(panel2);
  Map.onClick(handleMapClick);
}
function get_alerts(){  
  // Get the julian day value for one month prior to today and set all values to 1
  var geometry = ee.Geometry.Polygon({
    coords: coords
  })
    // Get area raster
  var area = ee.Image.pixelArea().divide(10000).clip(geometry);
  // Get primary forest layer and wdpa
  var primary_forests = ee.Image(ee.ImageCollection("UMD/GLAD/PRIMARY_HUMID_TROPICAL_FORESTS/v1").toList(1).get(0)).clip(geometry);
  var wdpa = ee.Image('users/BR_dcassiday/wdpa_hi_res_final').clip(geometry);
  var one_month = ee.Number.parse(ee.Date(new Date()).format('DD')).subtract(30);
  var glad = latest.where(latest,1);
  // Get weighted input raster 
  var weights = primary_forests.add(wdpa).multiply(area);
  // Get bounding rectangle
  var bounds = geometry.bounds();
  var flat_coords = bounds.coordinates().flatten();
  // Select grid size
  var grid_size = 0.1;
  // Create sequences of latitudes and longitudes
  var lat_seq = ee.List.sequence(flat_coords.get(1),flat_coords.get(5), grid_size);
  var lon_seq = ee.List.sequence(flat_coords.get(0),flat_coords.get(2), grid_size);
  // Make the grid feature collection
  var make_grid = function(i){
    i = ee.Number(i)
    var corners = lat_seq.map(function(j){
      j = ee.Number(j);
      var coords = [i,j,i.add(grid_size),j.add(grid_size)];
      var cell = ee.Feature(ee.Geometry.Rectangle(coords).intersection(geometry));
      return cell
    })
    return corners
  }
  var grid = ee.FeatureCollection(lon_seq.map(make_grid).flatten());
  // Get inputs and area of each grid cell
  var grid_inputs = weights.reduceRegions({
    collection: grid,
    reducer: ee.Reducer.sum(),
    scale: 30
  })
  var grid_area = area.reduceRegions({
    collection: grid,
    reducer: ee.Reducer.sum(),
    scale: 30
  })
  var glad_count = glad.reduceRegions({
    collection: grid,
    reducer: ee.Reducer.sum(),
    scale: 30
  })
  // Calculate scores and get top 5
  var scores = ee.Array(grid_inputs.aggregate_array('sum')).divide(grid_area.aggregate_array('sum')).multiply(glad_count.aggregate_array('sum')).toList();
  var grid_scores = grid.map(function(x){
    return x.set({index: x.id(), score:scores.get(ee.Number.parse(x.id()))})
  })
  var top_5 = scores.sort().reverse().slice(0,5);
  //print(top_5)
  // Filter top five from feature collection
  var top_grid = grid_scores.filter(ee.Filter.inList('score',top_5))
  //print(top_grid)
  // Add layers to map
  //Map.addLayer(grid)
  Map.centerObject(top_grid,8)
  Map.addLayer(wdpa.updateMask(wdpa), {min:0, max:1, palette: 'purple'}, 'WDPA')
  Map.addLayer(primary_forests.updateMask(primary_forests), {min:0, max:1, palette: 'green'}, 'Primary Forests')
  Map.addLayer(top_grid, {}, 'Grid')
  Map.addLayer(glad.updateMask(glad).clip(geometry), {palette: 'pink'}, 'GLAD')
}