var worldpop = ui.import && ui.import("worldpop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop");
//Worldpop population 
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var Thailand = countries.filter(ee.Filter.eq('country_na', 'Thailand'));
Map.addLayer(Thailand, {}, "Thailand", false);
var meanPopulation = worldpop.reduce(ee.Reducer.mean());
// Select the max precipitation and mask out low precipitation values.
var mask = meanPopulation.gt(1);
var pop = meanPopulation.updateMask(mask);
var visPop = {
  bands: ['population_mean'],
  min: 0.0,
  max: 50.0,
  palette: ['blue', '1fff4f', 'd4ff50']
};
Map.addLayer(pop.clip(Thailand), visPop,"WorldPop Thailand");
Map.centerObject(Thailand, 6);