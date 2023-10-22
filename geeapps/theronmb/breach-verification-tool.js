var imageCollection = ee.ImageCollection("COPERNICUS/S2"),
    geometry = /* color: #0b4a8b */ee.Geometry.Point([32.428638095451106, -13.006157862622993]),
    geometry3 = /* color: #ffc82d */ee.Geometry.MultiPoint(
        [[32.437268714470406, -13.03469473482542],
         [32.438813666862984, -13.03231157767339],
         [32.438813666862984, -13.023698572836825],
         [32.44417808489277, -13.024074875422443],
         [32.43035934404804, -13.025454646678602],
         [32.431518058342476, -13.023322269679547],
         [32.39624164537861, -13.026750788432512],
         [32.406798820061226, -13.020562695727039],
         [32.39401004747822, -13.023614949962392],
         [32.39654205278828, -13.022987777504298],
         [32.433535079521675, -13.018722962683029],
         [32.44323394731953, -13.019350145937134],
         [32.43035934404804, -13.011489334442336],
         [32.4288573069997, -13.011280266903947],
         [32.43538043932392, -13.009691347851518],
         [32.434822539848824, -13.007517021071463],
         [32.43967197374775, -13.004799085791644]]),
    geometry4 = /* color: #00ffff */ee.Geometry.MultiPoint(
        [[32.441560248894234, -13.033942161361605],
         [32.44349143938496, -13.028088734095228],
         [32.44422100023701, -13.027043464663915],
         [32.44237564043476, -13.020019139658451],
         [32.42525241808369, -13.018179402578804],
         [32.42237709001972, -13.022276980132272],
         [32.42387912706806, -13.026750788432512],
         [32.41323612169697, -13.026834410248215],
         [32.43413589434101, -13.020270011838281],
         [32.44233272509052, -13.015670648187127],
         [32.4409594340749, -13.013370934354777],
         [32.4334492488332, -13.01291098902822],
         [32.439285735649605, -13.00839511687351],
         [32.442547301811715, -13.00584444903895],
         [32.38778732256367, -13.011029385625186],
         [32.38568447069599, -13.009816789199496],
         [32.40947351175487, -13.030788456626984],
         [32.43493630375224, -13.035816274367457]]),
    geometry2 = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([31.523953495368687, -13.717016849352898]),
            {
              "Descrip": "Continued Clearing",
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([31.525927601203648, -13.72026875168769]),
            {
              "Descrip": "Continued Clearing",
              "system:index": "1"
            })]),
    new_clear = /* color: #ff0000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([31.523824749335972, -13.717100232026853]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([31.525927601203648, -13.720185370139397]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([31.527815876350132, -13.72364567949511]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([31.524443992012152, -13.713905975513455]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([31.528481066493896, -13.711618657981854]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([31.530026018886474, -13.717038594813232]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([31.530755579738525, -13.720332187605923]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([31.518128243420506, -13.648164880881662]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([31.521132317517186, -13.65233519834159]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([31.519716111157322, -13.659674777991967]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([31.516197052929783, -13.658423729429774]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([31.512120095227147, -13.659466270359262]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([31.51057514283457, -13.658715641354704]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([31.52177604768076, -13.657965009960387]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([31.523707238171482, -13.655629697007829]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([31.4456935459516, -13.73226343677535]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([31.313448609829948, -13.869354481513644]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([31.316238107205436, -13.891935346177913]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([31.324220361233756, -13.896017998299568]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([31.362715425015494, -13.908307179902476]),
            {
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([31.372736157895133, -13.913805856610251]),
            {
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([31.395774584851665, -13.890977884373912]),
            {
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([31.401053172192974, -13.897851724430438]),
            {
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([31.401696902356548, -13.899226467959393]),
            {
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([31.41439984425108, -13.88943644981736]),
            {
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([31.373286944470806, -13.895977061010568]),
            {
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([31.428177060674443, -13.86703133784421]),
            {
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([31.43246859509827, -13.865989721575515]),
            {
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([31.43573016126038, -13.865823062538738]),
            {
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([31.442167462896123, -13.862239864307059]),
            {
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([31.445300283025517, -13.858906607001702]),
            {
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([31.445643605779424, -13.861656547732736]),
            {
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([31.455084981511845, -13.87694729059203]),
            {
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([31.478774251531377, -13.859323266781491]),
            {
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([31.430623235296025, -13.88723776804424]),
            {
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([31.425902547429814, -13.88982073114081]),
            {
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([31.45094365079285, -13.849656567421443]),
            {
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([31.456050576757207, -13.849864905699993]),
            {
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([31.312564846897885, -13.77257522895307]),
            {
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([31.300033566380307, -13.792340238930239]),
            {
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([31.262559902924068, -13.85788854258937]),
            {
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([31.247324955719478, -13.867971543576955]),
            {
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([31.244106304901607, -13.868013207961683]),
            {
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([31.25826836850024, -13.859430186798722]),
            {
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([31.26745225216723, -13.86255510987822]),
            {
              "system:index": "44"
            })]);
var table = ee.FeatureCollection('ft:11tkv8qntwk9CYduHiMmfnH7u7ZJb_yaVrWmaVpVH'); // enter breach fusion table ID here
var table2 = ee.FeatureCollection('ft:1PfnOTDOf4POqBtonNvd0D9wS3t5PIQGcp1D42SzU'); // enter project area fusion table ID here
var table3 = ee.FeatureCollection('ft:19ZChz_WnwZ2e8ShFjJkNshHrQsIxkS0kzL1nDd6J'); // enter leakage belt fusion table ID here
// Enter period of interest
var earlierYear = '2016';
var laterYear = '2018';
var geometry2 = table2.geometry();
var geomImg = ee.Image();
var geomOut = geomImg.paint(geometry2,1,1);
var geometry3 = table3.geometry();
var geomImg1 = ee.Image();
var geomOut1 = geomImg1.paint(geometry3,1,1);
// Load later Sentinel 2 and sort by cloud cover
// Limit date range to April and May to create a low cloud high NDWI scene mosaic
var sentCollection = ee.ImageCollection('COPERNICUS/S2').filterBounds(geometry2).sort('CLOUDY_PIXEL_PERCENTAGE',false);
var sent1 = sentCollection.filterDate({
  start: ee.Date.fromYMD(ee.Number.parse(earlierYear), 4,1), // change date range here, MM,DD
  end: ee.Date.fromYMD(ee.Number.parse(earlierYear),6,1) // change date range here, MM,DD
  }).mosaic();
var sent2 = sentCollection.filterDate({
  start: ee.Date.fromYMD(ee.Number.parse(laterYear), 4,1), // change date range here, MM,DD
  end: ee.Date.fromYMD(ee.Number.parse(laterYear),6,1) // change date range here, MM,DD
  }).mosaic();
  // Define the visualization parameters.
var vizParams = {
  bands: ['B8', 'B3', 'B2'],
  min: [941, 632, 762],
  max: [4160, 1583, 1384],
  gamma: [1, 1, 1]
};
var vizParams2 = {
  bands: ['B4', 'B3', 'B2'],
  min: [357, 567, 755],
  max: [1561, 1365, 1326],
  gamma: [1, 1, 1]
};
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(geometry2);
// Filter VH, IW
var vh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', ('VV', 'VH')))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  // reduce to VH polarization
  .select('VH')
  // filter 10m resolution
  .filter(ee.Filter.eq('resolution_meters', 10));
// Filter to orbitdirection Descending
var vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
// Filter VV, IW
var vv = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', ('VV', 'VH')))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  // reduce to VH polarization
  .select('VV')
  // filter 10m resolution
  .filter(ee.Filter.eq('resolution_meters', 10));
// Filter to orbitdirection Descending
var vvDescending = vv.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
// Filter vh start
var vhend = toDB(RefinedLee(toNatural(vh.filterDate({
  start: ee.Date.fromYMD(ee.Number.parse(laterYear), 9,15), // change date range here, MM,DD
  end: ee.Date.fromYMD(ee.Number.parse(laterYear),10,31) // change date range here, MM,DD
  }).median())));
// Filter vv start
var vvend = toDB(RefinedLee(toNatural(vv.filterDate({
  start: ee.Date.fromYMD(ee.Number.parse(laterYear), 9,15), // change date range here, MM,DD
  end: ee.Date.fromYMD(ee.Number.parse(laterYear),10,31) // change date range here, MM,DD
  }).median())));
var end_stack = ee.Image.cat([vvend, vhend]);
// Compute the EVI using an expression.
var vvovhend = end_stack.expression(
    'VV - VH', {
      'VV': end_stack.select('sum'),
      'VH': end_stack.select('sum_1')
});
var end_stack = ee.Image.cat([vvend, vhend, vvovhend]);
  // Define the visualization parameters.
var vizParams = {
  bands: ["sum", "sum_1", "sum_2"],
  min: [-15.259, -23.395, 4.7484],
  max: [-5.0475, -11.199, 13.795],
  gamma: [1, 1, 1]
};
// Display the selected image.
Map.getCenter();
Map.addLayer(sent1, vizParams2, 'S2 bands 4, 3, 2', 0);
// Display the selected image.
Map.addLayer(sent2, vizParams2, 'S2 bands 4, 3, 2', 0);
Map.addLayer(end_stack, vizParams, 'S1_Dry', 0);
Map.addLayer(table.draw({color: 'ff0000', strokeWidth: 1}), {}, 'breaches');
//Map.addLayer(table, {'palette': 'ff0000',}, 'points');
Map.addLayer(geomOut1,{'palette': 'ff00f1',},   'Leakage_Belt');
Map.addLayer(geomOut,{'palette': 'ff0000',},   'Project_Area');
// Make a collection of points.
var fields_2016 = ee.FeatureCollection([geometry3]);
var fields_2018 = ee.FeatureCollection([geometry4]);
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: fields_2016,
  description:'Mwanya_fields_2016',
  fileFormat: 'KML'
});
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: fields_2018,
  description:'Mwanya_fields_2018',
  fileFormat: 'KML'
});
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: new_clear,
  description:'New_Clearing',
  fileFormat: 'KML'
});
// Functions to convert from/to dB
function toNatural(img) {
  return ee.Image(10.0).pow(img.select(0).divide(10.0));
}
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0);
}
// The RL speckle filter
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return(result);
}