var im_2005 = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.date('2005-01-01', '2005-12-31'));
var im_2008 = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.date('2008-01-01', '2011-12-31'));
var im_2012 = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.date('2012-01-01', '2014-12-31'));
var im_2015 = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.date('2015-01-01', '2017-12-31'));
var im_2018 = ee.ImageCollection('USDA/NAIP/DOQQ').filter(ee.Filter.date('2018-01-01', '2021-12-31'));
var trueColorVis = {
  min: 0.0,
  max: 255.0,
};
var visualisation = [
  {'label': '2005', 'map': im_2005.select(['R', 'G', 'B'])},
  {'label': '2008', 'map': im_2008.select(['R', 'G', 'B'])},
  {'label': '2012', 'map': im_2012.select(['R', 'G', 'B'])},
  {'label': '2015', 'map': im_2015.select(['R', 'G', 'B'])},
  {'label': '2018', 'map': im_2018.select(['R', 'G', 'B'])},
];
function render(vis) {
  var Map = ui.Map().setControlVisibility(false)
  Map.addLayer(vis.map, trueColorVis, vis.label);
  Map.add(ui.Label(vis.label))
  return Map;
}
var maps = visualisation.map(render);
ui.root.widgets().reset(maps)
var linker = ui.Map.Linker(maps)
var places = {
  'Magic Kingdom': [28.4177, -81.5812], 
  'Disney California Adventure Park': [33.8061, -117.9209],
  'Legoland California': [33.1262, -117.3105],
  'Universal Studios Hollywood': [34.1381, -118.3534],
  'Disneyland': [33.8121, -117.9190],
  'Disney Animal Kingdom': [28.3597, -81.5913],
  'EPCOT': [28.3747, -81.5494],
  'Disneys Hollywod Studios': [28.3575, -81.5583],
  'Universal Studios Florida': [28.4790, -81.4685],
  'Islands of Adventures': [28.4717, -81.4710],
  'SeaWorld Orlando': [28.4115, -81.4617],
  'Busch Gardens Tampa Bay': [28.0372, -82.4195],
  'Knotts Berry Farm': [33.8443, -118.0002],
  'SeaWorld San Diego': [32.7648, -117.2266],
  'Cedar Point': [41.4822, -82.6835],
  'Six Flags Magic Mountain': [34.4253, -118.5972],
  'Kings Island': [39.3452, -84.2691],
  'Six Flags Great Adventure': [40.1371, -74.4402],
  'Hersheypark': [40.2888, -76.6547],
  'Six Flags Great America': [42.3704, -87.9360],
  'Legoland Florida': [27.9889, -81.6911],
  'Universals Epic Universe': [28.4416, -81.4428],
  'Six Flags Discovery Kingdom': [38.1382, -122.2340],
  'Six Flags Over Georgia': [33.7707, -84.5512],
  'Six Flags New England': [42.0380, -72.6135],
  'Silver Dollar City': [36.6675, -93.3390],
  '[New] Universals Volcano Bay': [28.4615, -81.4731],
  'Carowinds': [35.1028, -80.9419],
  'Michigans Adventure': [43.3424, -86.2802],
  '[Closed] Geauga Lake': [41.34839, -81.36919],
  '[Closed] Freestyle Music Park': [33.7136, -78.9355],
  '[Closed] Six Flags New Orleans': [30.054, -89.9343]
};
var select = ui.Select({
  items: Object.keys(places),
  style: {position: 'bottom-right'},
  onChange: function(key) {
    maps[0].setCenter(places[key][1], places[key][0]);
  }
});
select.setPlaceholder('Select Another Park');
maps[maps.length - 1].add(select)
maps[0].setCenter(-117.919, 33.8055, 17); // disneyland, CA