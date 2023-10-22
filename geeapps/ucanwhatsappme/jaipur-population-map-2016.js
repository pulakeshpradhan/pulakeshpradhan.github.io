var table = ui.import && ui.import("table", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
var dataset = ee.ImageCollection('JRC/GHSL/P2016/POP_GPW_GLOBE_V1')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var populationCount = dataset.select('population_count');
var populationCountVis = {
  min: 0.0,
  max: 200.0,
  palette: ['060606', '337663', '337663', 'ffffff'],
};
Map.setCenter(75.78, 27.1052, 9);
var clip=populationCount.mean().clip(table);
Map.addLayer(clip, populationCountVis, 'Population 2016');