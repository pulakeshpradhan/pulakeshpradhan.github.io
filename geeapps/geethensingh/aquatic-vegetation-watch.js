var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '22px',
  padding: '8px',
  color: '#616161',
  backgroundColor: colors.transparent,
  textAlign: 'center',
};
var SUBTITLE_STYLE = {
  fontWeight: '350',
  fontSize: '16px',
  padding: '8px',
  color: '#616161',
  textAlign: 'center',
  //maxWidth: '450px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  maxWidth: '500px',
  backgroundColor: colors.transparent,
  textAlign: 'center',
  border:'1px solid black',
};
var BUTTON_STYLE = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SELECT_STYLE = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '2px',
  backgroundColor: colors.transparent,
  width: '80px'
};
var LABEL_STYLE = {
  fontWeight: '100',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '450px',
      backgroundColor: colors.gray
    }
});
var mappingPanel = ui.Map({
    center: {'lat': -25.749884020781785, 'lon':27.872830023190637 , 'zoom': 11}
  });
ui.root.clear();
ui.root.add(ui.SplitPanel(mappingPanel, infoPanel));
var TparameterPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
var SparameterPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), 
                            style: {backgroundColor: colors.transparent}});
////////////////////////////
/////// INFO PANEL /////////
////////////////////////////
infoPanel.add(ui.Label('Monitor Water and Aquatic Vegetation', TITLE_STYLE));
var paperLink = ui.Label({
  value: 'Link to research paper',
  style: {fontSize: '11px', color: '#505050', margin: '-4px 8px 0px 8px', backgroundColor: colors.transparent}, 
  targetUrl: 'https://www.mdpi.com/2072-4292/12/24/4021'
});
infoPanel.add(paperLink)
var app_description = 'This tool should not be used in isolation as actual conditions may be different from the model outcomes and require additional verification.' +'This application allows for the monitoring of water'+ 
' and aquatic vegetation at a 10 m (Sentinel-2) '+
'or 30 m (Landsat-8) spatial resolution for '+
'an Area of Interest (AOI).For more information, refer to '+
'Singh, G., Reynolds, C., Byrne, M.,and Rosman, B., A remote sensing method to monitor water, aquatic vegetation and invasive water hyacinth at national extents.'
infoPanel.add(ui.Label(app_description, PARAGRAPH_STYLE));
var locationButton = ui.Button({label:'Zoom to your location', style:BUTTON_STYLE});
infoPanel.add(locationButton);
/////////////////////////////////////////////////////////
// Adding onMapClick function: adding a AOI to the map //
/////////////////////////////////////////////////////////
var drawingTools = mappingPanel.drawingTools();
drawingTools.setShown(false);
mappingPanel.drawingTools().setLinked(true);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
  ////////////////////
 // hyper-parameter//
////////////////////
infoPanel.insert(4, ui.Label('Instructions:', SUBTITLE_STYLE));
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.',LABEL_STYLE),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal', backgroundColor: colors.transparent}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal', backgroundColor: colors.transparent}
    }),
    ui.Label('2. Draw a Rectangle or Polygon over the AOI.',LABEL_STYLE),
    ui.Label('3. Set Temporal Parameter.',LABEL_STYLE),
    ui.Label('4. Select a Sensor to Detect Aquatic Vegetation.',LABEL_STYLE),
    ui.Label('5. Charts will be generated below. Repeat 1-4 for New Charts.',LABEL_STYLE)
  ],
  style: {position: 'bottom-left', backgroundColor: colors.transparent},
  layout: null,
});
infoPanel.add(controlPanel);
infoPanel.add(TparameterPanel);
var ws_name = ui.Label('Maximum water extent (months)', LABEL_STYLE);
var sd_name = ui.Label('Set start date (YYYY-MM-DD)', LABEL_STYLE);
var ed_name = ui.Label('Set end date (YYYY-MM-DD)', LABEL_STYLE);
var endDate = ee.Date(Date.now());
var nmonths = endDate.difference(ee.Date('2013-01-01'),'month').round();
var winSlider = ui.Slider({min: 1, max: nmonths.getInfo(), value: 6, step: 1, style: {width: '125px', backgroundColor: colors.transparent}});
var U_start = ui.Textbox({placeholder: 'YYYY-MM-DD',value:endDate.advance(-6, 'month').format('yyyy-MM-dd').getInfo()});
var U_end = ui.Textbox({placeholder: 'YYYY-MM-DD',value: endDate.format('yyyy-MM-dd').getInfo()});
var parameter1 = ui.Panel({style: {backgroundColor: colors.transparent}});
var parameter2 = ui.Panel({style: {backgroundColor: colors.transparent}});
var parameter3 = ui.Panel({style: {backgroundColor: colors.transparent}});
parameter1.add(ws_name).add(winSlider);
parameter2.add(sd_name).add(U_start);
parameter3.add(ed_name).add(U_end);
TparameterPanel.add(parameter1).add(parameter2).add(parameter3);
infoPanel.insert(8, ui.Label('Detect Aquatic Vegetation using:', LABEL_STYLE));
infoPanel.add(SparameterPanel);
var L8_toa = ui.Button({label: 'Landsat-8 TOA', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
var S2_toa = ui.Button({label: 'Sentinel-2 TOA', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
var s1 = ui.Panel({style: {backgroundColor: colors.transparent}});
var s2 = ui.Panel({style: {backgroundColor: colors.transparent}});
s1.add(L8_toa);
s2.add(S2_toa);
SparameterPanel.add(s1).add(s2);
// Create a label on the map.
var label = ui.Label('Click a point on the percentage cover chart to show the images for that date.');
mappingPanel.add(label);
/////////////////////////////////////////////////////////////////////////
//                      Define OTSU+CANNY detector
/***
* Return the DN that maximizes interclass variance in ndvi (in the region).
*/
var otsu = function(histogram) {
    histogram = ee.Dictionary(histogram);
    var counts = ee.Array(histogram.get('histogram'));
    var means = ee.Array(histogram.get('bucketMeans'));
    var size = means.length().get([0]);
    var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
    var mean = sum.divide(total);
    var indices = ee.List.sequence(1, size);
    // Compute between sum of squares, where each mean partitions the data.
    var bss = indices.map(function(i) {
        var aCounts = counts.slice(0, 0, i);
        var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
        var aMeans = means.slice(0, 0, i);
        var aMean = aMeans.multiply(aCounts)
            .reduce(ee.Reducer.sum(), [0]).get([0])
            .divide(aCount);
        var bCount = total.subtract(aCount);
        var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
        return aCount.multiply(aMean.subtract(mean).pow(2)).add(
            bCount.multiply(bMean.subtract(mean).pow(2)));
    });
    // Return the mean value corresponding to the maximum BSS.
    return means.sort(bss).get([-1]);
};
/***
* Compute a threshold using Otsu method (bimodal)
*/
function computeThresholdUsingOtsu(image, scale, bounds, cannyThreshold, cannySigma, minValue, debug) {
    // clip image edges
    var mask = image.mask().gt(0).focal_min(ee.Number(scale).multiply(3), 'circle', 'meters');
    // detect sharp changes
    var edge = ee.Algorithms.CannyEdgeDetector(image, cannyThreshold, cannySigma);
    edge = edge.multiply(mask);
    // buffer around NDVI edges
    var edgeBuffer = edge.focal_max(ee.Number(scale).multiply(5), 'square', 'meters');
    var imageEdge = image.mask(edgeBuffer);
    // compute threshold using Otsu thresholding
    var buckets = 100;
    var hist = ee.Dictionary(ee.Dictionary(imageEdge.reduceRegion(ee.Reducer.histogram(buckets), bounds, scale)).values().get(0));
    var threshold = ee.Algorithms.If(hist.contains('bucketMeans'), otsu(hist), 0.3);
    threshold = ee.Number(threshold);
    if(debug) {
        // Map.addLayer(edge.mask(edge), {palette:['ff0000']}, 'edges', false);
        // print('Threshold: ', threshold);
        // print(ui.Chart.image.histogram(image, bounds, scale, buckets));
        // print(ui.Chart.image.histogram(imageEdge, bounds, scale, buckets));
        // Map.addLayer(mask.mask(mask), {palette:['000000']}, 'image mask', false);
    }
    return minValue !== 'undefined' ? threshold.max(minValue) : threshold;
}
var debug = true;
var cannyThreshold = 0.99;
var cannySigma = 1;
var minValue = 0.3;
function getEdge(mask) {
  return mask.subtract(mask.focal_min(1));
}
//Define visualisation parameters for TCI and FCI
var rgb_vis = {
  min: 0,
  max: 2500,
  gamma: 1.4,
  bands: ['B4', 'B3', 'B2']
};
var gnirg =  {
  min: 185,
  max: 5059,
  gamma: 1,
  bands: ['B8', 'B3', 'B2']
};
var vp = {
  min: -3582.192584905779,
  max: 7106.587003328887,
  gamma: 1,
  bands: ['B4', 'B3', 'B2'],
};
// Zoom to user location
function current_position(point) {
  mappingPanel.addLayer(point);
  mappingPanel.centerObject(point);
}
locationButton.onClick(function() {
  ui.util.getCurrentPosition(current_position);
});
////////////////////////////////////////////////////////////////////////////////////////
//                  Detect water and aquatic vegetation for area within drawn geometry
////////////////////////////////////////
// S2_TOA
///////////////////////////////////////
S2_toa.onClick(function(){
  mappingPanel.layers().reset([]);
  //Import datasets
  var s2 = ee.ImageCollection("COPERNICUS/S2_HARMONIZED");
  var water = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1').select(['water','label']);
  //Main input parameters:
  // 1) window - dicatates frequency of water detection (in months, i.e. monthly (1)
  // , quarterly (3) biannually (6) or annually (12).
  var window = winSlider.getValue();
  // 2) startDate - for level 2A sentinel-2 data, water detection.
  var startDate = ee.Date(U_start.getValue());
  // 3) endDate - for level 2A sentinel-2 data, water detection.
  var endDate = ee.Date(U_end.getValue());
  var scale = 10;
  // Get the drawn geometry; it will define the reduction region.
  var region = drawingTools.layers().get(0).getEeObject();
  mappingPanel.centerObject(region, 13);
  var bounds = ee.Geometry(mappingPanel.getBounds(true));
    // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  //                    Aquatic Vegetation Detection
  // Filter input collections by desired data range and region.
  var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(startDate, endDate), ee.Filter.lte('CLOUD_COVERAGE_ASSESSMENT',5));
  var s2filtered = s2.filter(criteria);
  var s2_cloud_masked = ee.ImageCollection(s2filtered).map(function(i){return i.clip(region)});
  print('Number of Aquatic vegetation observations (n): ', s2_cloud_masked.size());
  mappingPanel.addLayer(s2_cloud_masked.first(), gnirg, 'Sentinel 2 FCI',false);
  mappingPanel.addLayer(s2_cloud_masked.first(), rgb_vis, 'Sentinel 2 TCI');
  function recentMaxWater (w_img){
    return w_img.clip(region).select('water').updateMask(w_img.select('label').eq(0)).gt(0.65).selfMask()
          .addBands(ee.Image.constant(ee.Number.parse(w_img.date().format("YYYYMMdd"))))
          .rename(['water','date']).float();}
  var with_veg = s2_cloud_masked.map(function(img){
    var start = img.date().advance(-(window),'month');
    var recent_water = water.filterBounds(region).filterDate(start,img.date())
                      .map(recentMaxWater)
                      .qualityMosaic('date').select('water');
    var ndvi = img.normalizedDifference(['B8', 'B4']).rename('ndvi')
    .updateMask(recent_water).rename('pre_veg');
    var th = computeThresholdUsingOtsu(ndvi, scale, bounds, cannyThreshold, cannySigma, minValue, debug);
    var veg = ndvi.updateMask(ndvi.gt(th)).rename('veg').copyProperties(img, ['system:time_start']);
    return img.addBands([recent_water, ndvi,veg]);
  });
  mappingPanel.addLayer(with_veg.first().select('water').neq(0),{palette:'0000ff'},'water');
  mappingPanel.addLayer(with_veg.first().select('veg'),{palette:'#10ff2d'},'aquatic vegetation');
  function area(image){
  var varea = ee.Number(ee.Image.pixelArea().multiply(image.select('veg').and(image.select('veg'))).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale:10
      }).get('area')).divide(1e6);
  var warea = ee.Number(ee.Image.pixelArea().multiply(image.select('water')).reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: region,
        scale:30
        }).get('area')).divide(1e6);
    var perc_cover = (varea.divide(warea)).multiply(100);
    var area_image = ee.Image(perc_cover).rename('pcov').addBands([ee.Image(warea).rename('warea')]).copyProperties(image, ['system:time_start']);
    return area_image;
  }
  var areaColl = with_veg.map(area);
  //Create a time series chart.
  var covTimeSeries = ui.Chart.image.seriesByRegion(
      areaColl, region, ee.Reducer.first(), 'pcov', 10, 'system:time_start','label')
          .setChartType('ScatterChart')
          .setOptions({
            title: 'Percentage aquatic vegetation cover',
            hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 8}},
            vAxis: {title: 'Percentage Cover (%)'},
            lineWidth: 1,
            pointSize: 4,
            });
  infoPanel.add(covTimeSeries);
  // Create a time series chart.
  var vegTimeSeries = ui.Chart.image.seriesByRegion(
      with_veg, region, ee.Reducer.mean(), 'veg', 10, 'system:time_start','label')
          .setChartType('ScatterChart')
          .setOptions({
            title: 'NDVI mean',
            hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 8}},
            vAxis: {title: 'NDVI mean'},
            lineWidth: 1,
            pointSize: 4,
            });
  //Display.
  infoPanel.add(vegTimeSeries);
  //Create a time series chart.
  var wTimeSeries = ui.Chart.image.seriesByRegion(
      areaColl, region, ee.Reducer.first(), 'warea', 30, 'system:time_start', 'label')
          .setChartType('ScatterChart')
          .setOptions({
            title: 'Surface water area (km2)',
            hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 8}},
            vAxis: {title: 'Surface water area (km2)'},
            lineWidth: 1,
            pointSize: 4,
            });
  infoPanel.add(wTimeSeries);
  //Create callbakc function that adds image to the map coresponding with clicked data point on chart
  covTimeSeries.onClick(function(xValue, yValue, seriesName) {
      if (!xValue) return;  // Selection was cleared.
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      //Find image coresponding with clicked data
      var img = with_veg.filter(equalDate).first();
      var RGBimage = ee.Image(s2_cloud_masked.filter(equalDate).first());
      //Make map layer based on RGB image, reset the map layers, and add this new layer
      var S2Layer = ui.Map.Layer(RGBimage, {
        bands: ['B8','B3','B2'],
        max: 3500,
        min: 414
      },'FCI image', false);
      mappingPanel.layers().reset([S2Layer]);
      var visParams = vp;
      mappingPanel.addLayer(RGBimage, rgb_vis, 'Sentinel 2 TCI');
      mappingPanel.addLayer(img.select('water'),{palette:'0000ff'},'Water');
      mappingPanel.addLayer(img.select('veg'),{palette:'#10ff2d'},'Aquatic vegetation');
      // Show a label with the date on the map.
      label.setValue((new Date(xValue)).toUTCString());
    });
    clearGeometry();
});
////////////////////////////////////////
// L8_TOA
///////////////////////////////////////
L8_toa.onClick(function(){
  mappingPanel.layers().reset([]);
  //Import datasets
  var l8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA");
  var water = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1').select(['water','label']);
  //Main input parameters:
  // 1) startDate - for Landsat-8 SR data, water detection.
  var startDate = ee.Date(U_start.getValue());
  // 2) endDate - for Landsat-8 SR data, water detection.
  var endDate = ee.Date(U_end.getValue());
  // 3) window - dicatates frequency of water detection (in months, i.e. monthly (1)
  // , quarterly (3) biannually (6) or annually (12).
  var window = winSlider.getValue();
  var scale = 30;
  // Get the drawn geometry; it will define the reduction region.
  var region = drawingTools.layers().get(0).getEeObject();
  mappingPanel.centerObject(region, 13);
  var bounds = ee.Geometry(mappingPanel.getBounds(true));
    // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Function to mask clouds using the quality band of Landsat 8 TOA.
  var maskL8 = function(image) {
    var qa = image.select('QA_PIXEL');
    /// Check that the cloud bit is off.
    // See https://www.usgs.gov/land-resources/nli/landsat/landsat-collection-1-level-1-quality-assessment-band
    var mask = qa.bitwiseAnd(1 << 4).eq(0);
    return image.updateMask(mask);
  };
    //Define visualisation parameters for TCI and FCI
  var rgb_vis = {
    min: 0.030718985944986343,
    max: 0.23067611455917358,
    gamma: 1.4,
    bands: ['B4', 'B3', 'B2']
  };
  var gnirg =  {
    min: 0.02058432810008526,
    max: 0.47125208377838135,
    gamma: 1,
    bands: ['B3', 'B5', 'B3']
  };
  var vp = {
    min: 0.03216123580932617,
    max: 0.204531729221344,
    gamma: 1,
    bands: ['B4', 'B3', 'B2'],
  };
  //                    Aquatic Vegetation Detection
  // Filter input collections by desired data range and region.
  var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(startDate, endDate), ee.Filter.lte('CLOUD_COVER',5));
  var l8_cloud_masked = l8.filter(criteria).map(function(i){return i.clip(region)}).map(maskL8);
  print('Number of Aquatic vegetation observations (n): ', l8_cloud_masked.size());
  mappingPanel.addLayer(l8_cloud_masked.first(), gnirg, 'Landsat 8 FCI',false);
  mappingPanel.addLayer(l8_cloud_masked.first(), rgb_vis, 'Landsat 8 TCI');
  function recentMaxWater (w_img){
  return w_img.clip(region).select('water').updateMask(w_img.select('label').eq(0)).gt(0.65).selfMask()
          .addBands(ee.Image.constant(ee.Number.parse(w_img.date().format("YYYYMMdd"))))
          .rename(['water','date']).float();}
  var with_veg = l8_cloud_masked.map(function(img){
    var start = img.date().advance(-(window),'month');
    var recent_water = water.filterBounds(region).filterDate(start,img.date())
                      .map(recentMaxWater)
                      .qualityMosaic('date').select('water');
    var ndvi = img.normalizedDifference(['B5', 'B4'])
      .updateMask(recent_water).rename('pre_veg');
    var th = computeThresholdUsingOtsu(ndvi, scale, bounds, cannyThreshold, cannySigma, minValue, debug);
    var veg = ndvi.updateMask(ndvi.gt(th)).rename('veg').copyProperties(img, ['system:time_start']);
    return img.addBands([recent_water, ndvi, veg]);
  });
  mappingPanel.addLayer(with_veg.first().select('water'),{palette:'0000ff'},'water');
  mappingPanel.addLayer(with_veg.first().select('veg'),{palette:'#10ff2d'},'aquatic vegetation');
  function area(image){
  var varea = ee.Number(ee.Image.pixelArea().multiply(image.select('veg').and(image.select('veg'))).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale:30
      }).get('area')).divide(1e6);
  var warea = ee.Number(ee.Image.pixelArea().multiply(image.select('water')).reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: region,
        scale:30
        }).get('area')).divide(1e6);
    var perc_cover = (varea.divide(warea)).multiply(100);
    var area_image = ee.Image(perc_cover).rename('pcov').addBands([ee.Image(warea).rename('warea')]).copyProperties(image, ['system:time_start']);
    return area_image;
  }
  var areaColl = with_veg.map(area);
  //Create a time series chart.
  var covTimeSeries = ui.Chart.image.seriesByRegion(
      areaColl, region, ee.Reducer.first(), 'pcov', 30, 'system:time_start', 'label')
          .setChartType('ScatterChart')
          .setOptions({
            title: 'Percentage aquatic vegetation cover',
            hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 8}},
            vAxis: {title: 'Percentage Cover (%)'},
            lineWidth: 1,
            pointSize: 4,
            });
  infoPanel.add(covTimeSeries);
  // print(covTimeSeries);
  // //Create a time series chart.
  var vegTimeSeries = ui.Chart.image.seriesByRegion(
      with_veg, region, ee.Reducer.mean(), 'veg', 30, 'system:time_start', 'label')
          .setChartType('ScatterChart')
          .setOptions({
            title: 'NDVI mean',
            hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 8}},
            vAxis: {title: 'NDVI mean'},
            lineWidth: 1,
            pointSize: 4,
            });
  infoPanel.add(vegTimeSeries);
  //Create a time series chart.
  var wTimeSeries = ui.Chart.image.seriesByRegion({imageCollection:areaColl,
  regions:region, reducer:ee.Reducer.first(), scale:30, band:'warea', xProperty:'system:time_start', seriesProperty:'label'})
          .setChartType('ScatterChart')
          .setOptions({
            title: 'Surface water area (km2)',
            hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 8}},
            vAxis: {title: 'Surface water area (km2)'},
            lineWidth: 1,
            pointSize: 4,
            });
  infoPanel.add(wTimeSeries);
  //Create callbakc function that adds image to the map coresponding with clicked data point on chart
  covTimeSeries.onClick(function(xValue, yValue, seriesName) {
      if (!xValue) return;  // Selection was cleared.
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      //Find image coresponding with clicked data
      var img = with_veg.filter(equalDate).first();
      var RGBimage = ee.Image(l8_cloud_masked.filter(equalDate).first());
      //Make map layer based on RGB image, reset the map layers, and add this new layer
      var L8Layer = ui.Map.Layer(RGBimage, {
        bands: ['B5','B3','B2'],
        max: 3500,
        min: 414
      },'FCI image', false);
      mappingPanel.layers().reset([L8Layer]);
      var visParams = vp;
      mappingPanel.addLayer(RGBimage, rgb_vis, 'Landsat-8 TCI');
      mappingPanel.addLayer(img.select('water'),{palette:'0000ff'},'Water');
      mappingPanel.addLayer(img.select('veg'),{palette:'#10ff2d'},'Aquatic vegetation');
      // Show a label with the date on the map.
      label.setValue((new Date(xValue)).toUTCString());
    });
    clearGeometry();
});
//////////////////////////////////////////
// Adding clear button onClick function //
//////////////////////////////////////////
// Make a panel to host the buttons
var buttonHold = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: colors.transparent, textAlign: 'center', stretch: 'both', padding: '4px'}});
infoPanel.add(buttonHold);
// var clearButton = ui.Button({label: 'Clear map', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
// buttonHold.add(clearButton);
// var clearMap = clearButton.onClick(function() {
//   mappingPanel.layers().reset();
// });