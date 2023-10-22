var finish = ui.import && ui.import("finish", "image", {
      "id": "users/scottmhaag/cbfdr_f"
    }) || ee.Image("users/scottmhaag/cbfdr_f"),
    discover = ui.import && ui.import("discover", "image", {
      "id": "users/scottmhaag/cbfdr_d"
    }) || ee.Image("users/scottmhaag/cbfdr_d"),
    reference = ui.import && ui.import("reference", "image", {
      "id": "users/scottmhaag/cbfdr_df"
    }) || ee.Image("users/scottmhaag/cbfdr_df"),
    BasinATLAS_v10_lev12 = ui.import && ui.import("BasinATLAS_v10_lev12", "table", {
      "id": "projects/ee-tylere-hydrobasins/assets/BasinATLAS_v10_lev12"
    }) || ee.FeatureCollection("projects/ee-tylere-hydrobasins/assets/BasinATLAS_v10_lev12");
var mask_reference = reference.gte(500);
Map.style().set('cursor', 'crosshair');
var imgPallette = {
  min: 0,
  max: 2178459,
  opacity: 0.2,
};
var refPallette = {
  min: 0,
  max: 10000,
  opacity: 0.5,
  palette: ['purple']
}; 
var blue = {
  min: 0,
  max: 1,
  opacity: 0.8,
  palette: ['blue']
}; 
var map0 = ui.Map();
var temp_point = ee.Geometry.Point(0, 0);
var mappoint = Map.addLayer(temp_point, {color: 'FF0000', strokeWeight: 1}, "Pour Point");
map0.addLayer(ee.Image(0), {palette:'white'}, "Background (white)", false);
map0.addLayer(BasinATLAS_v10_lev12, {}, 'BasinATLAS_v10_lev12', false);
var watershed = Map.addLayer(discover, imgPallette, "Temporary Layer", false, 0);
var downstream = Map.addLayer(discover, imgPallette, "Temporary Layer", false, 0);
map0.addLayer(discover, imgPallette, "discoverLayer", false, 0);
map0.addLayer(finish, imgPallette, "finishLayer", false, 0);
map0.addLayer(reference.updateMask(mask_reference), refPallette, "Stream Layer");
var updateWatershedLayers = function(coords) {
    var click_point = ee.Geometry.Point(coords.lon, coords.lat);
    ui.url.set({'pour_lon':coords.lon, 'pour_lat':coords.lat});
    var disc = discover.reduceRegion(ee.Reducer.first(), click_point, null, null, null, false);
    var discn = ee.Number(disc.get('b1'));
    var fin = finish.reduceRegion(ee.Reducer.first(), click_point, null, null, null, false);
    var finn = ee.Number(fin.get('b1'));
    map0.layers().remove(mappoint);
    map0.layers().remove(watershed);
    var filter = discover.gte(discn).and(discover.lte(finn));
    var watershedLayer = map0.addLayer(filter.updateMask(filter), blue, "Watershed Layer");
    watershed = watershedLayer;
    map0.layers().remove(downstream);
    var filtered2 = discover.lte(discn).and(finish.gte(finn));
    var flowLayer = map0.addLayer(filtered2.updateMask(filtered2), blue, "Flow Layer");
    downstream = flowLayer;
    var pointLayer = map0.addLayer(click_point, {color: 'FF0000', strokeWeight: 1}, "Pour Point");
    mappoint = pointLayer;
};
map0.onClick(updateWatershedLayers);
map0.onChangeCenter(function (center) {
  ui.url.set('lon', center.lon);
  ui.url.set('lat', center.lat);
});
map0.onChangeZoom(function (level) {
  ui.url.set('zoom', level);
});
// Use the URL parameters, if available.
var pour_lon = ui.url.get('pour_lon');
var pour_lat = ui.url.get('pour_lat');
var view_lon = ui.url.get('lon', -77.57);
var view_lat = ui.url.get('lat', 40.43);
var view_zoom = ui.url.get('zoom', 5);
map0.setCenter(view_lon, view_lat, view_zoom);
if (pour_lon && pour_lat ) {
   updateWatershedLayers({'lon':pour_lon, 'lat':pour_lat});
}
var app = {};
app.contact = ui.Panel({
  widgets:[
    ui.Label(
      'Scott Haag (smh362@drexel.edu) ' +
      'and Ali Shokoufandeh (AS79@drexel.edu) ' +
      'College of Computing and Informatics (CCI) ' +
      'Drexel University'
    ),
  ],
  style: {width: '500px'}
});
app.reference = ui.Panel({
  widgets:[
    ui.Label(
      'Haag, Scott, Bahareh Shakibajahromi, and Ali Shokoufandeh. ' +
      '"A new rapid watershed delineation algorithm for 2D flow ' +
      'direction grids" Environmental modelling & software ' +
      '109, 1 (2018): 420-428. doi: 10.1016/j.envsoft.2018.08.017"'
    ),
  ],
  style: {width: '500px'}
});
app.intro = {
  panel: ui.Panel([
    ui.Label({
      value: 'Watershed Delineation Demo',
      style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
    }),
    ui.Label('This app allows you to delineate upstream area and downstream flowlines.'),
    app.contact,
    app.reference
  ])
};
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: app.intro.panel,
  secondPanel: map0,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);