var roi = /* color: #d63000 */ee.Geometry.Polygon(
        [[[73.29528477210158, 22.060892552614984],
          [73.19915440100783, 21.80866497106894],
          [73.28155186194533, 21.568764154081176],
          [73.58764744708367, 21.500238686209084],
          [74.15344334552117, 21.765763332787845],
          [74.08203221270867, 22.079163929952728],
          [73.40362645098992, 22.035889543986023]]]);
//Asset List
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var change = gsw.select('change_abs');
var transition = gsw.select('transition');
var area_image_with_transition_class = ee.Image.pixelArea().addBands(transition);
var reduction_results = area_image_with_transition_class.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'transition_class_value',
  }),
  geometry: roi,
  scale: 30,
  bestEffort: true,
});
print('reduction_results', reduction_results);
var roi_stats = ee.List(reduction_results.get('groups'));
//Constants
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['red', 'blue']
};
var VIS_CHANGE = {
  min:-50,
  max:50,
  palette: ['red','black','limegreen']
}
var VIS_WATER_MASK = {
  palette: ['white','black']
};
//Calculations
var lookup_names = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(ee.String),
    gsw.get('transition_class_names')
    );
var lookup_palette = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(ee.String),
    gsw.get('transition_class_palette')
);
//Helper Functions
function createFeature(transition_class_stats) {
  transition_class_stats = ee.Dictionary(transition_class_stats);
  var class_number = transition_class_stats.get('transition_class_value');
  var result = {
      transition_class_number: class_number,
      transition_class_name: lookup_names.get(class_number),
      transition_class_palette:lookup_palette.get(class_number),
      area_m2: transition_class_stats.get('sum')
};
 return ee.Feature(null, result);
}
function createPieChartSliceDictionary(fc) {
  return ee.List(fc.aggregate_array("transition_class_palette"))
    .map(function(p) { return {'color': p}; }).getInfo();
}  
var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature));
print('transition_fc', transition_fc);
var transition_summary_chart = ui.Chart.feature.byFeature({
  features: transition_fc,
  xProperty: 'transition_class_name',
    yProperties: ['area_m2', 'transition_class_number']
})
.setChartType('PieChart')
  .setOptions({
    title: 'Summary of transition class areas',
    slices: createPieChartSliceDictionary(transition_fc),
    sliceVisibilityThreshold: 0  // Don't group small slices.
  });
print(transition_summary_chart);
//Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(90).unmask(0);
Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask',
  shown: false
});
Map.addLayer({
  eeObject: occurrence,
  name: "Water Occurrence (1984-2015)",
  visParams: VIS_OCCURRENCE
  });
Map.addLayer({
  eeObject: transition,
  name: 'Transition classes (1984-2015)',
});