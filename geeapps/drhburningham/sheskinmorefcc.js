var site = ee.Geometry.Rectangle(-8.7,54.72,-8.25,54.95);
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterBounds(site);
var composite = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',51)
                  .select(['B2','B3','B4','B8']);
var uct = composite.filterMetadata('MGRS_TILE','equals','29UNA');
var lastimg = uct.limit(1,'system:time_start', false).first();
var date = ee.Date(lastimg.get('system:time_start'));
// print(uct)
// Centre the map view on Sheskinmore
Map.setCenter(-8.4875,54.808,12);
// Define the visualization parameters.
var vizParams = {
  bands: ['B8', 'B4', 'B3'],
  min: 600,
  max: 4000
};
Map.addLayer(lastimg.clip(site), vizParams, 'FCC');
var cEI = ee.String(lastimg.get('system:index'))
var dT = ((((cEI.slice(6,8)).cat('/')).cat(cEI.slice(4,6))).cat('/')).cat(cEI.slice(2,4))
var dTitle = ee.String('Image acquisition date ').cat(dT).getInfo();
var title = ui.Label(dTitle);
title.style().set('position', 'top-center');
Map.add(title);