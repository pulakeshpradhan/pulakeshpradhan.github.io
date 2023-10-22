var results2 = ui.import && ui.import("results2", "table", {
      "id": "users/rudiyanto/EAsia_paddy/results_VH_S1_profile_cluster_parcel_50001_100000"
    }) || ee.FeatureCollection("users/rudiyanto/EAsia_paddy/results_VH_S1_profile_cluster_parcel_50001_100000"),
    parcel_japan = ui.import && ui.import("parcel_japan", "table", {
      "id": "users/rudiyanto/EAsia_paddy/nontianfanwei_id"
    }) || ee.FeatureCollection("users/rudiyanto/EAsia_paddy/nontianfanwei_id"),
    results1 = ui.import && ui.import("results1", "table", {
      "id": "users/rudiyanto/EAsia_paddy/results_VH_S1_profile_cluster_parcel_1_50000"
    }) || ee.FeatureCollection("users/rudiyanto/EAsia_paddy/results_VH_S1_profile_cluster_parcel_1_50000"),
    results3 = ui.import && ui.import("results3", "table", {
      "id": "users/rudiyanto/EAsia_paddy/results_VH_S1_profile_cluster_parcel_100001"
    }) || ee.FeatureCollection("users/rudiyanto/EAsia_paddy/results_VH_S1_profile_cluster_parcel_100001"),
    roi_nigata = ui.import && ui.import("roi_nigata", "table", {
      "id": "users/rudiyanto/EAsia_paddy/japanarea"
    }) || ee.FeatureCollection("users/rudiyanto/EAsia_paddy/japanarea");
///
var roi = roi_nigata;//roi_subang;//geometry_banten;//geometry_indramayu;//roi_subang;//roi_vietnam;//roi_nigata;
Map.centerObject(roi);
Map.setOptions( "HYBRID")
var geometry_roi=roi;
var startDate=ee.Date('2021-01-01')
var endDate=ee.Date('2021-12-31')
 function MedianVH(image){
    return image.addBands(image.focal_median({radius: 5,
                                              kernelType: 'square',
                                              units: 'pixels'})
                               .rename(['Sigma0_VH']));
  }
 function Rename_loop_VH(image){
    return image.rename(['VH']);
  }
//s1
var sentinel1_vh = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .select('VH')
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('resolution_meters', 10))
  //.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .filter(ee.Filter.date(startDate, endDate))
  .filter(ee.Filter.bounds(roi))
 // .map(MedianVH)
 // .select('Sigma0_VH');
print(sentinel1_vh)
//var sentinel1_vh =sentinel1_vh.select('Sigma0_VH')
print(sentinel1_vh)
// For month
var month = 1;
// Calculating number of intervals
var months = endDate.difference(startDate,'month').divide(month).toInt();
// Generating a sequence 
var sequence = ee.List.sequence(0, months); 
print(sequence)
var sequence_s1 = sequence.map(function(num){
    num = ee.Number(num);
    var Start_interval = startDate.advance(num.multiply(month), 'month');
    var End_interval = startDate.advance(num.add(1).multiply(month), 'month');
    var subset = sentinel1_vh.filterDate(Start_interval,End_interval);
    return subset.median().set('system:time_start',Start_interval);
});
print('sequence_s1',sequence_s1)
var byMonthYearS1 = ee.ImageCollection.fromImages(sequence_s1);
var multiband = byMonthYearS1.toBands().clip(roi);
//Map.addLayer(multiband ,  {min: -25, max: -10}, 'VH',0);
// Reset the bandnames
var names = multiband.bandNames();
print('bandnames',names)
// rename the bandnames 
print(names.length());
var nMonths =(names.length()).subtract(1) ;
print(nMonths);
var pertama=sentinel1_vh.first();
print('pertama:',pertama);
print(pertama.get('system:index'));
print(pertama.get('system:time_start'));
var systime=pertama.get('system:time_start');
var startDate =(ee.Date(systime));
//var startDate = ee.Date(startDate);
// get a list of time strings to pass into a dictionary later on
var monList = ee.List.sequence(0, nMonths).map(function (n) {
  return startDate.advance(n, 'month').format('yyyy-MM');
})
print('monList',monList);
var multiband1_vh = multiband.rename(monList);//.clip(geometry);
print('multiband1_vh',multiband1_vh);
Map.addLayer(multiband1_vh ,  {min: -25, max: -10}, 'VH',false);
////
print(results2.limit(10))
Map.addLayer( parcel_japan, {color: '0000FF'}, 'parcel boundary',0);
var all_parcel=results1.merge(results2).merge(results3);//riceclassAdded.merge(nonriceclassAdded);
print('all parcel rice non rice',all_parcel.limit(10))
 var palette3 = ['FF0000', '00FF00'];
 // Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
 // Paint the interior of the polygons with different colors.
var fills_all= empty.paint({
  featureCollection:  all_parcel,
  color: 'riceclass',
});
Map.addLayer(fills_all, {palette: palette3,min:0, max: 1}, 'colored fills rice non rice');
var palette = ['FF0000', '00FF00', '0000FF'];
//
//
var rice_select = all_parcel.filter(ee.Filter.inList('riceclass', [1]));
print('Count after filtering by size:', rice_select.size());
var rice_area_parcel = ee.Number(
  // Map the difference function over the collection.
  rice_select.reduceColumns(ee.Reducer.sum(), ['areaHa'])
  .get('sum')
)
// Print the result.
print('total rice area Ha=', rice_area_parcel.round());
var nonrice_select = all_parcel.filter(ee.Filter.inList('riceclass', [0]));
print('Count after filtering by size:', nonrice_select.size());
var nonrice_area_parcel = ee.Number(
  // Map the difference function over the collection.
  nonrice_select.reduceColumns(ee.Reducer.sum(), ['areaHa'])
  .get('sum')
)
// Print the result.
print('total non rice area Ha=', nonrice_area_parcel.round());
//
// Define a DataTable using a JavaScript array with a column property header.
var dataTable = [
  [
    {label: 'State', role: 'domain', type: 'string'},
    {label: 'Population', role: 'data', type: 'number'},
    {label: 'Pop. annotation', role: 'annotation', type: 'string'}
  ],
  ['Rice', 20154, '20154'],
  ['Non-Rice', 4211, '4211'],
 // ['IL', 12830632, '12.8e6'],
//  ['MI', 9883640, '9.8e6'],
//  ['OR', 3831074, '3.8e6']
];
// Define the chart and print it to the console.
var chart_area = ui.Chart(dataTable).setChartType('PieChart').setOptions({
  title: 'Rice vs Non-Rice parcel area (ha) (2021)',
  legend: {position: 'none'},
  hAxis: {title: 'State', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Population', titleTextStyle: {italic: false, bold: true}},
  colors: [ 'green','red', '39a8a7', '0f8755', '76b349', 'f0af07']
});
// Create a panel next to the map
var panel = ui.Panel({style:{width: '550px'}});
ui.root.add(panel);
var label1 = ui.Label({
  value: 'Paddy Explorer using SENTINEL-1: Parcel based clustering',
  style: {
    fontSize: '20px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var label2 = ui.Label({
  value: 'Developed by Rudiyanto',
  style: {
    fontSize: '16px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var label3 = ui.Label({
  value: 'Email: rudiyanto@umt.edu.my',
  style: {
    fontSize: '14px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var label_ricearea = ui.Label({
  value: 'Total rice area (ha) = '+rice_area_parcel.round().getInfo(),
  style: {
    fontSize: '14px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var label_ricenumber = ui.Label({
  value: 'Number of rice parcels = '+rice_select.size().getInfo(),
  style: {
    fontSize: '14px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var label_nonricearea = ui.Label({
  value: 'Total non-rice area (ha) = '+nonrice_area_parcel.round().getInfo(),
  style: {
    fontSize: '14px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var label_nonricenumber = ui.Label({
  value: 'Number of non-rice parcels = '+nonrice_select.size().getInfo(),
  style: {
    fontSize: '14px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
});
 var instructions = ui.Label({
  value: 'Click on the map (ROI) to show Sentinel-1 VH chart',
  style: {
    fontSize: '16px',
    color: 'black',
   // fontWeight: 'bold',
    padding: '5px',
  }
}); 
var pointList = ee.List([]); // Empty list to store our clicked points
var count = 0; // Counter to label our points
function make_chart(coords){ // What happens when the map is clicked
 panel.clear();
 count += 1;
 // Make a point with our clicked coordinates
 var point = ee.Feature(ee.Geometry.Point([coords.lon,coords.lat]),{name: 'Point '+count});
 pointList = pointList.add(point); // Add to the list
 var collection = ee.FeatureCollection(pointList) // Turn all points into a collection
 Map.addLayer(collection.style({ // Show the points on the map
 color: 'blue',
 pointSize: 5,
 pointShape: '+'
 }));
 /*
 var chart = ui.Chart.image.seriesByRegion({ // Create the chart
 imageCollection: byMonthYear.select(['nd']),//NDVIs,
 regions: collection,
 reducer: ee.Reducer.mean(),
 scale: 30,
 seriesProperty: 'name'
 })
 .setChartType('ScatterChart')
 .setOptions({ // Set the labelling
 lineWidth:1,
 pointSize:2,
 title: 'NDVI through the Sentinel time series',
 vAxis: {title: 'NDVI'},
 hAxis: {title: 'Date'},
 });
//
*/
//
  var charts1 = ui.Chart.image.seriesByRegion({ // Create the chart
 imageCollection: byMonthYearS1.select(['VH']),//NDVIs,
 regions: collection,
 reducer: ee.Reducer.mean(),
 scale: 60,
 seriesProperty: 'name'
 })
 .setChartType('ScatterChart')
 .setOptions({ // Set the labelling
 lineWidth:1,
 pointSize:2,
 title: 'VH through the Sentinel time series',
 vAxis: {title: 'VH'},
 hAxis: {title: 'Date'},
 });
 // Define the chart and print it to the console.
var chart_area1 = ui.Chart(dataTable).setChartType('PieChart').setOptions({
  title: 'Rice vs Non-Rice parcel area (ha) (2021)',
  legend: {position: 'none'},
  hAxis: {title: 'State', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Population', titleTextStyle: {italic: false, bold: true}},
  colors: [ 'green','red', '39a8a7', '0f8755', '76b349', 'f0af07']
});
 panel.add(label1);
 panel.add(label2);
 panel.add(label3);
 panel.add(label_ricearea);
 panel.add(label_ricenumber);
 panel.add(label_nonricearea);
 panel.add(label_nonricenumber);
   panel.add(chart_area1)
 panel.add(instructions); 
// panel.add(chart); // Add to the panel
  panel.add(charts1);
// chart.clear;
}
 panel.add(label1);
 panel.add(label2);
 panel.add(label3);
 panel.add(label_ricearea);
 panel.add(label_ricenumber);
 panel.add(label_nonricearea);
 panel.add(label_nonricenumber);
  panel.add(chart_area)
 panel.add(instructions); 
Map.onClick(make_chart);
Map.style().set('cursor', 'crosshair');
//print(chart);