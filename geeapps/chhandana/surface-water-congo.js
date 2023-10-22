var table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-chhandana/assets/SWORD/af_apriori_rivers_reaches_hb13_v08"
    }) || ee.FeatureCollection("projects/ee-chhandana/assets/SWORD/af_apriori_rivers_reaches_hb13_v08");
Map.addLayer(table,{color: 'FF0000'},'SWORD-Congo');
// 3-27-2019
//Congo_HAND
// Goal: The purpose is to classify water from SAR imagery and create
// interactive time series of water pixel count
// Topics addressed:
//  - loading and filtering image collections
//  - prepairing and classify SAR data
//  - creating a time series of water body classification in a region
//  - making interactive time series charts
// Load region defined by polygon and add it to the map
// var roi = ee.Geometry.Polygon(
//        [[[106.5311175986817, 14.88401360239504],
//          [106.70144574301412, 14.88567468158789],
//          [106.68221660149186, 14.996475939738637],
//          [106.67432540134314, 15.050880175819685],
//          [106.61113258648004, 15.046083385875264],
//          [106.53764487153217, 15.035961287202868],
//          [106.52682423644103, 14.968444128060433]]]);
var changeRoi = function(roi) {
  Map.clear();
  var drawingTools = Map.drawingTools();
  drawingTools.setDrawModes(['polygon', 'rectangle']);
  drawingTools.setLinked(false);
  while (drawingTools.layers().length() === 0) {
    roi = ui.Map.GeometryLayer({geometries: null, name: 'roi', color: 'red'});
    drawingTools.layers().add(roi);
  } 
  Map.drawingTools().layers().get(0).setShown(true);
  var drawInstrctn = ui.Label('Use the drawing tools in the top left corner to create your roi. Press the "Done Drawing" button when finished.');
  var doneBtn = ui.Button('Done Drawing');
  Map.add(drawInstrctn);
  Map.add(doneBtn);
  doneBtn.onClick(function() {
    Map.clear();
    getDate();
  });
};
var getDate = function() {
  Map.clear();
  var startDateInput = ui.Textbox({placeholder: 'Please enter the start date in the following format: YYYY-MM-DD, then press enter.', style: {width: '500px'}});
  Map.add(startDateInput);
  startDateInput.onChange(function() {
    var startDate = startDateInput.getValue();
    Map.clear();
    var endDateInput = ui.Textbox({placeholder: 'Please enter the end date in the following format: YYYY-MM-DD, then press enter.', style: {width: '500px'}});
    Map.add(endDateInput);
    endDateInput.onChange(function() {
      var endDate = endDateInput.getValue();
      Map.clear();
      var features = Map.drawingTools().layers().get(0).geometries().map(function(g) {
        return ee.Feature(g);
      });
      var multiPoly = ee.FeatureCollection(features).geometry().dissolve({'maxError': 1});
      updateRoi(multiPoly, startDate, endDate);
      var changeRoiBtn = ui.Button('Change the ROI/Date Range');
      Map.add(changeRoiBtn);
      changeRoiBtn.onClick(changeRoi);
    });
  });
}
var updateRoi = function(roi, startDate, endDate) {
  Map.drawingTools().setShown(false);
  Map.drawingTools().layers().get(0).setShown(false);
  //Load Sentinel-1 SAR collection and filter according to data collection type
  var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(roi)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  var cropImg = function(img) {
    return img.clip(roi);
  }
  function dateSeparate(imgCol){
    var imgList = imgCol.toList(imgCol.size());
    var uniqueDates = imgList.map(function(img){
      return ee.Image(img).date().format("YYYY-MM-dd")
    }).distinct();
    var mosaicImgList = uniqueDates.map(function(d){
      d = ee.Date(d);
      var img = imgCol
        .filterDate(d, d.advance(1, "day"))
        .mosaic();
      return img.set(
          "system:time_start", d.millis(), 
          "system:id", d.format("YYYY-MM-dd"))
    });
    return ee.ImageCollection(mosaicImgList);
  }
  S1 = dateSeparate(S1);
  S1 = S1.filter(ee.Filter.contains('.geo', roi));
  S1 = S1.map(cropImg)
  //Add first image to map to get an idea of what a SAR image looks like  
  Map.addLayer(S1.first(),{bands: 'VV',min: -18, max: 0}, 'SAR image')
  // Filter speckle noise
  var filterSpeckles = function(img) {
    var vv = img.select('VV') //select the VV polarization band
    var vv_smoothed = vv.focal_median(100,'circle','meters').rename('VV_Filtered') //Apply a focal median filter
    return img.addBands(vv_smoothed) // Add filtered VV band to original image
  }
  // Map speckle noise filter across collection. Result is same collection, with smoothed VV band added to each image
  S1 = S1.map(filterSpeckles)
  //Add speckle filtered image to map to sompare with raw SAR image
  Map.addLayer(S1.first(),{bands: 'VV_Filtered',min: -18, max: 0}, 'Filtered SAR image')
  // Map.addLayer(roi, {}, 'ROI')
  //Classify water pixels using a set threshhold 
  //Here we are using -16. This is only an approximation and will result in some errors. Try adjusting the 
  var classifyWater = function(img) {
    var vv = img.select('VV_Filtered')
    var water = vv.lt(-16).rename('Water')  //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
    water = water.updateMask(water) //Remove all pixels equal to 0
    return img.addBands(water)  //Return image with added classified water band
  }
  //Map classification across sentinel-1 collection and print to console to inspect
  S1 = S1.map(classifyWater)
  print(S1)
  //Make time series of water pixels within region
  var ClassChart = ui.Chart.image.series({
    imageCollection: S1.select('Water'),
    region: roi,
    reducer: ee.Reducer.sum(),
    scale: 100,
  })
    .setOptions({
        title: 'Inundated Pixels',
        hAxis: {'title': 'Date'},
        vAxis: {'title': 'Number of Inundated Pixels'},
        lineWidth: 2
      })
  //Set the postion of the chart and add it to the map    
  ClassChart.style().set({
      position: 'bottom-right',
      width: '500px',
      height: '300px'
    });
  var exportBtn = ui.Button('Export time period water maps to Google Drive');
  Map.add(exportBtn);
  exportBtn.onClick(function() {
    var n = S1.size().getInfo();
    for(var i = 0; i < n; i++) {
      var img = ee.Image(S1.toList(n).get(i)).select(['VV']);
      var id = img.id().getInfo();
      Export.image.toDrive({
        image: img,
        description: id,
        region: roi,
        maxPixels: 3784216672400,
      });
    }
  });
  Map.add(ClassChart)
  // Create a label on the map.
  var label = ui.Label('Click a point on the chart to show the image for that date.');
  Map.add(label);
  //Create callbakc function that adds image to the map coresponding with clicked data point on chart
  ClassChart.onClick(function(xValue, yValue, seriesName) {
      if (!xValue) return;  // Selection was cleared.
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      //Find image coresponding with clicked data and clip water classification to roi 
      var classification = ee.Image(S1.filter(equalDate).first()).clip(roi).select('Water'); 
      var SARimage = ee.Image(S1.filter(equalDate).first());
      //Make map layer based on SAR image, reset the map layers, and add this new layer
      var S1Layer = ui.Map.Layer(SARimage, {
        bands: ['VV'],
        max: 0,
        min: -20
      });
      Map.layers().reset([S1Layer]);
      var visParams = {
        min: 0,
        max: 1,
        palette: ['#FFFFFF','#0000FF']
      }
      //Add water classification on top of SAR image
      Map.addLayer(classification,visParams,'Water')
      // Show a label with the date on the map.
      label.setValue((new Date(xValue)).toUTCString());
    });
}
changeRoi();
Map.setCenter(14.62461,-4.90307, 6);