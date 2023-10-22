var rectangle = ee.Geometry.Polygon(
        [[[93.46209385369593, 8.887241066609505],
          [93.46209385369593, -11.133132648279764],
          [117, -11.133132648279764],
          [117, 8.887241066609505]]], null, false);
var dataset = ee.ImageCollection('FIRMS').filterBounds(rectangle)
    .filter(ee.Filter.date('2019-08-01', '2019-09-21'));
var fires = dataset.select('T21');
var firesVis = {
  min: 325.0,
  max: 400.0,
  palette: ['red', 'orange', 'yellow'],
};
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle);
var date_start = ee.Date("2019-07-01");
var date_end = ee.Date("2019-07-31");
var ic_vvvh = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle)
        .filterDate(date_start,date_end)
        .filterMetadata("transmitterReceiverPolarisation","equals",["VV", "VH"])
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
        .map(function(image) {
          var edge = image.lt(-50.0);
          var maskedImage = image.mask().and(edge.not());
          var image2 = image.focal_mean(20, 'circle', 'meters');
          return image2.updateMask(maskedImage);
        });
        var mean1 = ic_vvvh.reduce(ee.Reducer.mean());
var date_start2 = ee.Date("2019-08-01");
var date_end2 = ee.Date("2019-08-31");
var ic_vvvh2 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle)
        .filterDate(date_start2,date_end2)
        .filterMetadata("transmitterReceiverPolarisation","equals",["VV", "VH"])
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
        .map(function(image) {
          var edge = image.lt(-50.0);
          var maskedImage = image.mask().and(edge.not());
          var image2 = image.focal_mean(20, 'circle', 'meters');
          return image2.updateMask(maskedImage);
        });
        var mean2 = ic_vvvh2.reduce(ee.Reducer.mean());
var date_start3 = ee.Date("2019-09-01");
var date_end3 = ee.Date("2019-09-30");
var ic_vvvh3 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle)
        .filterDate(date_start3,date_end3)
        .filterMetadata("transmitterReceiverPolarisation","equals",["VV", "VH"])
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
        .map(function(image) {
          var edge = image.lt(-50.0);
          var maskedImage = image.mask().and(edge.not());
          var image2 = image.focal_mean(20, 'circle', 'meters');
          return image2.updateMask(maskedImage);
        });
        var mean3 = ic_vvvh3.reduce(ee.Reducer.mean());
  var waterOcc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").select('occurrence'),
    jrc_data0 = ee.Image("JRC/GSW1_0/Metadata").select('total_obs').lte(0),
    waterOccFilled = waterOcc.unmask(0).max(jrc_data0),
    waterMask = waterOccFilled.lt(50);
var ic_vvvh4 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle)
        .filterDate(date_start,date_end)
        .filterMetadata("transmitterReceiverPolarisation","equals",["VV", "VH"])
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
        .map(function(image) {
          var edge = image.lt(-50.0);
          var maskedImage = image.mask().and(edge.not());
          var image2 = image.focal_mean(20, 'circle', 'meters');
          return image2.updateMask(maskedImage);
        });
        var mean4 = ic_vvvh4.reduce(ee.Reducer.mean());
var ic_vvvh5 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle)
        .filterDate(date_start2,date_end2)
        .filterMetadata("transmitterReceiverPolarisation","equals",["VV", "VH"])
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
        .map(function(image) {
          var edge = image.lt(-50.0);
          var maskedImage = image.mask().and(edge.not());
          var image2 = image.focal_mean(20, 'circle', 'meters');
          return image2.updateMask(maskedImage);
        });
        var mean5 = ic_vvvh5.reduce(ee.Reducer.mean());
var ic_vvvh6 = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(rectangle)
        .filterDate(date_start3,date_end3)
        .filterMetadata("transmitterReceiverPolarisation","equals",["VV", "VH"])
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
        .map(function(image) {
          var edge = image.lt(-50.0);
          var maskedImage = image.mask().and(edge.not());
          var image2 = image.focal_mean(20, 'circle', 'meters');
          return image2.updateMask(maskedImage);
        });
        var mean6 = ic_vvvh6.reduce(ee.Reducer.mean());
        var srtm = ee.Image('CGIAR/SRTM90_V4')
        var elevation = srtm.select('elevation');
        var slope = ee.Terrain.slope(elevation);
        var slopemask = slope.lt(5)
        var msk = -2
        var diff1 = mean3.subtract(mean1)
        var md1 = diff1.lt(msk)
        var diff2 = mean3.subtract(mean2)
        var md2 = diff2.lt(msk)
        var diff3 = mean6.subtract(mean4)
        var md3 = diff3.lt(msk)
        var diff4 = mean6.subtract(mean5)
        var md4 = diff4.lt(msk)
        var ivp2 = {"opacity":1,"bands":["VV_mean"],"min":-20,"max":0,"gamma":4.935};
        var ivp = {"opacity":1,"bands":["VH_mean"],"min":-20,"max":-5,"gamma":1};
        var ivp3 = {"opacity":1,"bands":["VV_mean"], palette: ['00FF00', 'FF00FF']};
        var ivp4 = {"opacity":1,"bands":["VH_mean"], palette: ['00FF00', 'FF00FF']};
        Map.setCenter(110.66013678824356,-1.8508632504623732, 10);
        //Map.addLayer(mean1, ivp, "mean VH asc july")
        //Map.addLayer(mean2, ivp, "mean VH asc august")
        //Map.addLayer(mean3, ivp, "mean VH asc september")
        Map.addLayer(mean4, ivp, "mean VH desc july")
        Map.addLayer(mean5, ivp, "mean VH desc august") 
        Map.addLayer(mean6, ivp, "mean VH desc september")
        Map.addLayer(diff1.updateMask(waterMask).updateMask(md1).updateMask(slopemask), ivp3, "VV diff asc sept july")
        Map.addLayer(diff2.updateMask(waterMask).updateMask(md2).updateMask(slopemask), ivp3, "VV diff asc sept  aug")
        Map.addLayer(diff1.updateMask(waterMask).updateMask(md1).updateMask(slopemask), ivp4, "VH diff asc sept july")
        Map.addLayer(diff2.updateMask(waterMask).updateMask(md2).updateMask(slopemask), ivp4, "VH diff asc sept  aug")
        Map.addLayer(diff3.updateMask(waterMask).updateMask(md3).updateMask(slopemask), ivp3, "VV diff desc sept july")
        Map.addLayer(diff4.updateMask(waterMask).updateMask(md4).updateMask(slopemask), ivp3, "VV diff desc sept  aug")
        Map.addLayer(diff3.updateMask(waterMask).updateMask(md3).updateMask(slopemask), ivp4, "VH diff desc sept july")
        Map.addLayer(diff4.updateMask(waterMask).updateMask(md4).updateMask(slopemask), ivp4, "VH diff desc sept  aug")
        Map.addLayer(fires, firesVis, 'Fires')