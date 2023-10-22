var site = ee.Geometry.Rectangle(1.40,52,1.53,52.085);
Map.setCenter(1.46,52.04,14);
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterBounds(site);
var composite = dataset.filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than',25)
                  .select(['B2','B3','B4','B8']);
var uct = composite.filterMetadata('MGRS_TILE','equals','31UCT');
var lastimg = uct.limit(1,'system:time_start', false).first();
var date = ee.Date(lastimg.get('system:time_start'));
// print('Timestamp: ', date); // ee.Date
// print(lastimg)
// Define the visualization parameters.
var vizParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 700,
  max: 2500
};
Map.addLayer(lastimg.clip(site), vizParams, 'True Colour');
var cEI = ee.String(lastimg.get('system:index'))
var dT = ((((cEI.slice(6,8)).cat('/')).cat(cEI.slice(4,6))).cat('/')).cat(cEI.slice(2,4))
var dTitle = ee.String('Image acquisition date ').cat(dT).getInfo();
var title = ui.Label(dTitle);
title.style().set('position', 'top-center');
Map.add(title);