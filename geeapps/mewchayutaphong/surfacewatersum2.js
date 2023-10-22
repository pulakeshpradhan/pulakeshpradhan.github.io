var Thailand_shape = ui.import && ui.import("Thailand_shape", "table", {
      "id": "projects/test-cnn2/assets/thailand_"
    }) || ee.FeatureCollection("projects/test-cnn2/assets/thailand_");
// combine features in Thailand's shape
var Thailand_collection = ee.FeatureCollection(Thailand_shape)
print(Thailand_collection)
print("Provinces", Thailand_collection.size())
// Getting the regions and the coordinates
var myList = ee.List.sequence(0, 76);
var List_thailand = Thailand_collection.toList(77);
// Getting Region Name
var RegionNamesFunc = function(number) {
  return ee.Feature(List_thailand.get(number)).get("ADM1_EN");
};
// Getting Region coordinates
var RegionCoordsFunc = function(number) {
  var value = ee.List(ee.Geometry(ee.Feature(List_thailand.get(number)).geometry().geometries().get(0)).coordinates().get(0))
  return value.get(0)
};
// Mapping Names to list
var RegionNames = myList.map(RegionNamesFunc);
print(RegionNames);
// Mapping coordinates to list
var RegionCoords = myList.map(RegionCoordsFunc);
print(RegionCoords);
// putting names and coordinates into dictionary
var places = ee.Dictionary.fromLists(RegionNames, RegionCoords);
// Fixing data
places = places.set('Chiang Mai', [99.154, 18.949]);
places = places.set('Khon Kaen', [102.8307, 16.4506]);
places = places.set('Maha Sarakham', [103.1782, 15.9951]);
places = places.set('Nakhon Pathom', [100.0717, 13.8052]);
places = places.set('Nonthaburi', [100.52269, 13.85984]);
places = places.set('Phangnga', [98.5846, 8.4798]);
places = places.set('Si Sa Ket', [104.2741, 14.9289]);
places = places.set('Suphan Buri', [100.0485, 14.4851]);
// Importing water image
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var transition = gsw.select("transition")
var change = gsw.select("change_abs");
// Setting up UI pnael
var panel = ui.Panel({
  // layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '800px', position: "bottom-right", padding: "0px 0px 30px 30px"}
});
// Creating a select dropbox
var select = ui.Select({
  items: places.keys().getInfo(),
  onChange: function(key) {
    Map.setCenter(ee.List(places.get(key)).get(0).getInfo(), ee.List(places.get(key)).get(1).getInfo());
    PlottingGraph(key)
    histogram_water(key)
    TransitionPieChart(key)
  },
  style: {width: '300px', textAlign: 'center'}
});
var Title = ui.Label({
  value: 'Thailand Surface Water Explorer',
  style: {width: '400px', height: '100px', fontSize: '25px', color: '484848', textAlign: 'left'}
});
var paragraph = ui.Label({
  value:'This app aims to select a province in Thailand and explore the surface water change \n and the transition class. Get started by selecting a province',
  style: {textAlign: 'left'}
})
ui.root.add(panel)
select.setPlaceholder('Choose a location...');
panel.add(Title)
panel.add(paragraph)
panel.add(select);
// Plotting the graph
function PlottingGraph(region) {
    var Filtered_thailand = Thailand_collection.filter(ee.Filter.eq('ADM1_EN', region))
    var change_filtered = change.clip(Filtered_thailand);
    Map.addLayer(Filtered_thailand)
    print(Filtered_thailand)
    var VIS_OCCURRENCE = {
        min:0,
        max:100,
        palette: ['red', 'blue']
    };
    var VIS_CHANGE = {
        min:-50,
        max:50,
        palette: ['red', 'black', 'limegreen']
    };
    var VIS_WATER_MASK = {
      palette: ['white', 'black']
    };
    // Create a water mask layer, and set the image mask so that non-water areas are transparent.
    var water_mask = occurrence.gt(90).mask(1);
    Map.addLayer({
      eeObject: water_mask,
      visParams: VIS_WATER_MASK,
      name: '90% occurrence water mask',
      shown: false
    });
    Map.addLayer({
      eeObject: occurrence.updateMask(occurrence.divide(100)),
      name: "Water Occurrence (1984-2015)",
      visParams: VIS_OCCURRENCE,
      shown: false
    });
    Map.addLayer({
      eeObject: change_filtered,
      visParams: VIS_CHANGE,
      name: 'occurrence change intensity'
      // shown: false
    });
}
// plotting the histogram
function histogram_water(region) {
  var Filtered_thailand = Thailand_collection.filter(ee.Filter.eq('ADM1_EN', region))
  var histogram = ui.Chart.image.histogram({
    image: change,
    region: Filtered_thailand,
    scale: 50,
    minBucketWidth: 10
  });
  histogram.setOptions({
    title: 'Histogram of surface water change intensity at ' + region
  });
  panel.add(histogram);
}
function TransitionPieChart(region) {
  var Filtered_thailand = Thailand_collection.filter(ee.Filter.eq('ADM1_EN', region))
  var area_image_with_transition_class = ee.Image.pixelArea().addBands(transition);
  var reduction_results = area_image_with_transition_class.reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'transition_class_value',
    }),
    geometry: Filtered_thailand,
    scale: 30,
    bestEffort: true,
  });
  var roi_stats = ee.List(reduction_results.get('groups'));
  function numToString(num) {
    return ee.String(num)
  }
  // Create a dictionary for looking up names of transition classes.
  var lookup_names = ee.Dictionary.fromLists(
      ee.List(gsw.get('transition_class_values')).map(numToString),
      gsw.get('transition_class_names')
  );
  // Create a dictionary for looking up colors of transition classes.
  var lookup_palette = ee.Dictionary.fromLists(
      ee.List(gsw.get('transition_class_values')).map(numToString),
      gsw.get('transition_class_palette')
  );
  // Create a feature for a transition class that includes the area covered.
  function createFeature(transition_class_stats) {
    transition_class_stats = ee.Dictionary(transition_class_stats);
    var class_number = transition_class_stats.get('transition_class_value');
    var result = {
        transition_class_number: class_number,
        transition_class_name: lookup_names.get(class_number),
        transition_class_palette: lookup_palette.get(class_number),
        area_m2: transition_class_stats.get('sum')
    };
    return ee.Feature(null, result);   // Creates a feature without a geometry.
  }
  function createPieChartSliceDictionary(fc) {
    return ee.List(fc.aggregate_array("transition_class_palette"))
      .map(function(p) { return {'color': p}; }).getInfo();
  }
  var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature));
  // Add a summary chart.
  var transition_summary_chart = ui.Chart.feature.byFeature({
      features: transition_fc,
      xProperty: 'transition_class_name',
      yProperties: ['area_m2', 'transition_class_number']
    })
    .setChartType('PieChart')
    .setOptions({
      title: 'Summary of transition class areas at ' + region,
      slices: createPieChartSliceDictionary(transition_fc),
      sliceVisibilityThreshold: 0  // Don't group small slices.
    });
  panel.add(transition_summary_chart);
}