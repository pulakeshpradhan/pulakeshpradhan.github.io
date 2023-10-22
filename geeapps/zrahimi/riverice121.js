var imageCollection = ee.ImageCollection("users/mtemimi/alacons2022"); //Alaska2021
//var imageCollection = ee.ImageCollection("users/zrahimi/Alaska2019"); //northeast 2019
//var imageCollection = ee.ImageCollection("users/zrahimi/northeast2020"); //northeast 2020
//var imageCollection = ee.ImageCollection("users/zrahimi/northeast2021"); //northeast 2021
// The app is divided into two part. The first part is to show that maps as it uploads in the browser
// the second part is deicated to the maps in dateslider. 
var date=ee.Date(Date.now());
print(date)
var now = Date.now();       //getting time at UTC
var eeNow = ee.Date(now);
print("now:",typeof(now),now);
print("eeNow:",typeof(eeNow-1),eeNow);
print("eeNow:",typeof(eeNow),eeNow);
var today='2022-05-8'
//var imageCollection = ee.ImageCollection("users/zrahimi/alacons") //cons&alaska
//load ice concentration
var iceconcentration=ee.ImageCollection("users/mtemimi/ice2022")
.filterDate(today, date)
                  .map(function(image) {
                    var iceconcentration=image.mask(image.gte(0.1)) //here
                     var iceconcentration2=image.mask(image.gte(0.1).and(image.lt(40))) //here
                        return image
                         .addBands(iceconcentration.rename('iceconcentration'))
                          .addBands(iceconcentration2.rename('iceconcentration2'))
                  });
var visice = {
  min: 0.1,
  max: 100,
 // gamma: 1.5,
 palette: [ '0000FF','0000FF','0097FF','00A3FF','00AEFF','00BAFF','#00C5FF','00D1FF','00DCFF','00E8FF','00F3FF','00FFFF']
};
var visice2 = {
  min: 0.1,
  max: 100,
 // gamma: 1.5,
 palette: [ '0000FF','0000FF']
};
var iceconcentrationg2=iceconcentration.select('iceconcentration');
//var iceconcentrationb2=iceconcentration.select('iceconcentration2');
var dataset3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
.filterDate(today, date)
// Select bands for visualization and apply band-specific scale factors.
var rgb = dataset3.select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance'])
              .median()
              // Convert to radiance units.
              .multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]));
var visParams = {
  min: 0,
  max: 2,
  gamma: 1.5,
};
var image1=imageCollection.filterDate(today, date)
.map(function(img) {
                  var imageMasked1=img.mask(img.gte(5).or(img.eq(1)));
                  var imageMaskedice=imageMasked1.mask(imageMasked1.gte(1).and(imageMasked1.lte(5)));
                  var imageMaskedcloud=imageMasked1.mask(imageMasked1.gt(5).and(imageMasked1.lte(7)));
                  var imageMasked2=img.mask(img.gte(1));
                  var imageMasked3=img.mask(img.gte(1).and(img.lte(5)));
                 // var imageMasked3=img.mask(img.eq(5).or(img.eq(1)).or(img.eq(2)).or(img.eq(3)).or(img.eq(4)));
                  var imageMasked4=img.mask(img.eq(5).or(img.eq(1)));
                  var snow01 = img.gte(3).and (img.lt(4));
                  var ice01 = img.mask(img.gte(5).and (img.lt(6)));
          return img
          .addBands(imageMasked1.rename('imageMasked1'))
          .addBands(imageMasked2.rename('imageMasked2'))
          .addBands(imageMasked3.rename('imageMasked3'))
          .addBands(imageMasked4.rename('imageMasked4'))
          .addBands(imageMaskedice.rename('imageMaskedice'))
          .addBands(imageMaskedcloud.rename('imageMaskedcloud'))
          .addBands(snow01.rename('snow01'))
          .addBands(ice01.rename('ice01'))
        })
          .mosaic();
var imageMaskedcloud=image1.select('imageMaskedcloud') //cloud class
var imageMasked3=image1.select('imageMasked3'); // no cloud class
var imageMasked4=image1.select('imageMaskedice'); // river 
    var image3 = imageMasked3 // nocloud
  //  .filterDate(now-1, date)
    // .mosaic()
 var mask6=imageMaskedcloud  //cloud
 //    .filterDate(now-1, date)
 //    .mosaic()
 var nocloud=image3.multiply(0);
 var cloudfree=mask6.subtract(nocloud).add(6);
 var cloude= nocloud.unmask(mask6); // changed
 var cloud=cloude.mask(cloude.eq(6));
  var image4 = imageMasked4 //ice
var imageCollection2 = ee.ImageCollection("NASA/GLDAS/V021/NOAH/G025/T3H");
var geometry =      ee.Geometry.MultiPolygon(
        [[[[-103.77339957189355, 49.6188915716194],
           [-103.77339957189355, 39.17393095159311],
           [-67.03511832189355, 39.17393095159311],
           [-67.03511832189355, 49.6188915716194]]],
         [[[-166.43941519689355, 71.13507108070854],
           [-166.43941519689355, 58.54618454283651],
           [-141.65425894689355, 58.54618454283651],
           [-141.65425894689355, 71.13507108070854]]]
          ]);
print(imageCollection)
//Map.setCenter(-145, 66.2841, 4); 
var gldas = imageCollection2
   .filterBounds(geometry)
   .filterDate('2021-12-01', date)
.select('AvgSurfT_inst');
// split map
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
//var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
leftMap.setOptions('SATELLITE');
//leftMap.setOptions('baseChange', {'baseChange': baseChange});
  var viz = {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']};
  leftMap.addLayer(cloud, viz, 'cloud')
  leftMap.addLayer(image4, viz , 'River_ice'); //river ice
     var reference2 = gldas//.filterDate('2021-10-01', '2021-11-30')
.map(function(image) {
    var img=image.add(ee.Image([-273.15])).divide(ee.Image([8])).set('system:time_start', image.get('system:time_start'));
    return img
          .addBands(img.rename('CDDF'))}
);
// Load Sentinel-2 TOA reflectance data.
  var dataset = ee.ImageCollection('COPERNICUS/S2')
                 .filterDate(today, date)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .map(maskS2clouds);
  var reference=reference2.select('CDDF').sum();
     var vizcdf = {min:  -600, max: 300, palette: ['3a3a3a','334646', '335D5D','C0C0C0', '00FFFF', 'FFFFFF', '008000', '808000', 'C0C0C0']};
  var viz = {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']};
  var layer = ui.Map.Layer(cloud, viz, 'River_ICE+Cloud') //all classes
// var layer = ui.Map.Layer(image4, viz, 'River_Ice') //river ice
  var rgbVis = {min: 0.03, max: 0.69,  bands:['B4', 'B3', 'B2']};
  //bands:  ['B11', 'B8', 'B2']
var icwv=ee.ImageCollection("users/zrahimi/icwv5")
        //  .filterDate('2020-11-10','2020-11-13')
          .select('b1')
          .mode()
  leftMap.layers().reset([layer])
  leftMap.addLayer(reference,vizcdf,' CDDF',false);
  leftMap.addLayer(image4, viz , ' River_ice',true); //river ice
  leftMap.addLayer(image3, viz, 'All_Classes',false); //All_Classes 
  leftMap.addLayer(dataset, rgbVis, 'Sentinel-2',false);
//  leftMap.addLayer(rgb, visParams, 'Sentinel-3',false);
  leftMap.addLayer(iceconcentrationg2, visice, 'iceconcentration');
 //   leftMap.addLayer(icwv, {min: 0.05, max: 1}, 'icwv',false);
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
//rightMap.setOptions('baseChange', {'baseChange': baseChange});
  rightMap.addLayer(reference,vizcdf,' CDDF',false);
  rightMap.addLayer(image3, viz, 'All_Classes',false); //All_Classes 
  rightMap.addLayer(dataset, rgbVis, 'Sentinel-2',false);
  //rightMap.addLayer(rgb, visParams, 'Sentinel-3',false);
rightMap.setOptions('SATELLITE');
//var viz = {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']};
  rightMap.addLayer(cloud, viz, 'cloud')
  rightMap.addLayer(image4, viz , 'River_ice'); //river ice
   rightMap.addLayer(iceconcentrationg2, visice, 'iceconcentration');
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: rightMap,
  secondPanel: leftMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
//ui.root.widgets().reset([ui.SplitPanel({firstPanel: leftMap, secondPanel: rightMap})])
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-120, 55.2841, 4);
var subset = Map.getBounds(true)
var Start_period = ee.Date('2021-12-01')
var End_period = ee.Date(new Date().getTime())
// UI widgets needs client-side data. evaluate()
// to get client-side values of start and end period
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider) 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: '2022-04-01',
   // start: dates.start.value, 
    end: dates.end.value, 
    period: 1, // Everyday
    onChange: renderDateRange,
  })
  rightMap.add(slider)
}
ee.Dictionary({start: Start_period, end: End_period})
  .evaluate(renderSlider2) 
function renderSlider2(dates) {
  var slider2 = ui.DateSlider({
  //  start: dates.start.value, 
      start: '2022-01-01',
    end: dates.end.value, 
    period: 1, // Everyday
    onChange: renderDateRange2,
  })
  leftMap.add(slider2)
}
var image=imageCollection.select('b1')
                .map(function(img) {
                  var imageMasked1=img.mask(img.gte(5).or(img.eq(1)));
                  var imageMaskedice=imageMasked1.mask(imageMasked1.gte(1).and(imageMasked1.lte(5)));
                  var imageMaskedcloud=imageMasked1.mask(imageMasked1.gt(5).and(imageMasked1.lte(7)));
                  var imageMasked2=img.mask(img.gte(1));
                  var imageMasked3=img.mask(img.gte(1).and(img.lte(5)));
                 // var imageMasked3=img.mask(img.eq(5).or(img.eq(1)).or(img.eq(2)).or(img.eq(3)).or(img.eq(4)));
                  var imageMasked4=img.mask(img.eq(5).or(img.eq(1)));
                  var snow01 = img.gte(3).and (img.lt(4));
                  var ice01 = img.mask(img.gte(5).and (img.lt(6)));
          return img
          .addBands(imageMasked1.rename('imageMasked1'))
          .addBands(imageMasked2.rename('imageMasked2'))
          .addBands(imageMasked3.rename('imageMasked3'))
          .addBands(imageMasked4.rename('imageMasked4'))
          .addBands(imageMaskedice.rename('imageMaskedice'))
          .addBands(imageMaskedcloud.rename('imageMaskedcloud'))
          .addBands(snow01.rename('snow01'))
          .addBands(ice01.rename('ice01'))
        })
print('image',image)
//var list=imgVV.toList(20)
var imageMaskedcloud=image.select('imageMaskedcloud') //cloud class
var imageMasked3=image.select('imageMasked3'); // no cloud class
var imageMasked4=image.select('imageMaskedice'); // river ice
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Map the function over one year of data and take the median.
function renderDateRange(dateRange) {
    var image3 = imageMasked3 // nocloud
    .filterDate(dateRange.start(), dateRange.end())
     .mosaic()
 var mask6=imageMaskedcloud  //cloud
     .filterDate(dateRange.start(), dateRange.end())
     .mosaic()
 var nocloud=image3.multiply(0);
 var cloudfree=mask6.subtract(nocloud).add(6);
 var cloude= nocloud.unmask(mask6); // changed
 var cloud=cloude.mask(cloude.eq(6));;
  var image4 = imageMasked4 //ice
    .filterDate(dateRange.start(), dateRange.end())
.mode()
// Load Sentinel-2 TOA reflectance data.
  var dataset = ee.ImageCollection('COPERNICUS/S2')
                 // .filterBounds(geometry)
                  //.filterDate('2021-12-01', '2022-01-31')
                  .filterDate(dateRange.start(), dateRange.end())
                  //.filterDate(dateRange.start(), dateRange.start().advance(1, 'month'))
//                  .filterDate('2021-11-01', '2021-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .map(maskS2clouds);
print(dataset)
  var viz = {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']};
  var layer = ui.Map.Layer(cloud, viz, 'cloud')
  rightMap.layers().reset([layer])
  rightMap.addLayer(reference,vizcdf,' CDDF',false);
  rightMap.addLayer(image3, viz, 'All_Classes',false); //All_Classes 
  rightMap.addLayer(dataset, rgbVis, 'Sentinel-2',false);
  rightMap.addLayer(rgb, visParams, 'Sentinel-3',false);
//var viz = {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']};
 // rightMap.addLayer(cloud, viz, 'cloud')
  rightMap.addLayer(image4, viz , 'River_ice'); //river ice
   rightMap.addLayer(iceconcentrationg2, visice, 'iceconcentration');
rightMap.setOptions('SATELLITE');
}
function renderDateRange2(dateRange) {
    var image3 = imageMasked3 // nocloud
    .filterDate(dateRange.start(), dateRange.end())
     .mosaic()
 var mask6=imageMaskedcloud  //cloud
     .filterDate(dateRange.start(), dateRange.end())
     .mosaic()
 var nocloud=image3.multiply(0);
 var cloudfree=mask6.subtract(nocloud).add(6);
 var cloude= nocloud.unmask(mask6); // changed
 var cloud=cloude.mask(cloude.eq(6));;
  var image4 = imageMasked4 //ice
    .filterDate(dateRange.start(), dateRange.end())
.mode()
   var reference2 = gldas//.filterDate('2021-10-01', '2021-11-30')
.map(function(image) {
    var img=image.add(ee.Image([-273.15])).divide(ee.Image([8])).set('system:time_start', image.get('system:time_start'));
    return img
          .addBands(img.rename('CDDF'))}
);
//load ice concentration
var iceconcentration=ee.ImageCollection("users/mtemimi/ice2022")
                  .filterDate(dateRange.start(), dateRange.end())
                  .map(function(image) {
                    var iceconcentration=image.mask(image.gte(0.1)) //here
                     var iceconcentration2=image.mask(image.gte(0.1).and(image.lt(20))) //here
                        return image
                         .addBands(iceconcentration.rename('iceconcentration'))
                          .addBands(iceconcentration2.rename('iceconcentration2'))
                  });
// load Sentinel-3
var dataset3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
                  //.filterDate('2018-04-01', '2018-04-04');
                  .filterDate(dateRange.start(), dateRange.end())
                 // .filterDate(dateRange.start(), dateRange.start().advance(1, 'month'))
// Select bands for visualization and apply band-specific scale factors.
var rgb = dataset3.select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance'])
              .median()
              // Convert to radiance units.
              .multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]));
var visParams = {
  min: 0,
  max: 2,
  gamma: 1.5,
};
var visice = {
  min: 0.1,
  max: 100,
 // gamma: 1.5,
 palette: [ '0000FF','0000FF','0097FF','00A3FF','00AEFF','00BAFF','#00C5FF','00D1FF','00DCFF','00E8FF','00F3FF','00FFFF']
};
var visice2 = {
  min: 0.1,
  max: 100,
 // gamma: 1.5,
 palette: [ '0000FF','0000FF']
};
var iceconcentrationg2=iceconcentration.select('iceconcentration');
var iceconcentrationb2=iceconcentration.select('iceconcentration2');
// Load Sentinel-2 TOA reflectance data.
  var dataset = ee.ImageCollection('COPERNICUS/S2')
                 // .filterBounds(geometry)
                  //.filterDate('2021-12-01', '2022-01-31')
                  .filterDate(dateRange.start(), dateRange.end())
                  //.filterDate(dateRange.start(), dateRange.start().advance(1, 'month'))
//                  .filterDate('2021-11-01', '2021-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .map(maskS2clouds);
print(dataset)
var reference=reference2.select('CDDF');
   var cddfm=image4.unmask(reference.sum())
     var vizcdf = {min:  -600, max: 300, palette: ['0000FF', 'C0C0C0', '00FFFF', 'FFFFFF', '008000', '808000', 'C0C0C0']};
  var viz = {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']};
  var layer = ui.Map.Layer(cloud, viz, 'River_ICE+Cloud') //all classes
// var layer = ui.Map.Layer(image4, viz, 'River_Ice') //river ice
  var rgbVis = {min: 0.03, max: 0.69,  bands:['B4', 'B3', 'B2']};
  //bands:  ['B11', 'B8', 'B2']
  leftMap.layers().reset([layer])
  leftMap.addLayer(cddfm,vizcdf,' CDDF',false);
  leftMap.addLayer(image4, viz , ' River_ice'); //river ice
  leftMap.addLayer(image3, viz, 'All_Classes',false); //All_Classes 
  leftMap.addLayer(dataset, rgbVis, 'Sentinel-2',false);
  leftMap.addLayer(rgb, visParams, 'Sentinel-3',false);
 // leftMap.addLayer(iceconcentrationb2, visice2, 'ic<20%');
 leftMap.addLayer(iceconcentrationg2, visice, 'iceconcentration');
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
//leftMap.setOptions('baseChange', {'baseChange': baseChange});
//rightMap.setOptions('baseChange', {'baseChange': baseChange});
// Export the visualization image as map tiles.
Export.map.toCloudStorage({
  // All tiles that intersect the region get exported in their entirety.
  // Clip the image to prevent low resolution tiles from appearing outside
  // of the region.
  image: image4.visualize( {min: 1, max: 7, palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']}),
  description: 'mapToCloud',
  bucket: 'wmsfiles',
  maxZoom: 13,
 // region: geometry
});
}
// interactive map panels and time series plots
var drawingTools = rightMap.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
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
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
// add chart panel
leftMap.add(chartPanel);
var chartPanel2 = ui.Panel({
  style:
      {height: '135px', width: '300px', position: 'bottom-right', shown: false}
});
// add chart panel 2
leftMap.add(chartPanel2);
var chartPanel3 = ui.Panel({
  style:
      {height: '400px', width: '400px', position: 'bottom-left', shown: false}
});
// add chart panel 2
rightMap.add(chartPanel3);
//button for removing chart from map
var button2 = ui.Button({
  label: 'Clear the charts',
  style: {
    margin: '-20px 0px 0px 26px', position: 'top-left',
  }
});
rightMap.add(button2);
// control panel
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('T.S.'),
    ui.Button({
      label: symbol.rectangle + '',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + '',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + '',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    })
  ],
  style: {position: 'top-left'},
  layout: null,
});
// add control panel
rightMap.add(controlPanel);
drawingTools.onDraw(ui.util.debounce(chartTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartTimeSeries, 500));
drawingTools.onDraw(ui.util.debounce(chartTimeSeriescddf, 500));
drawingTools.onEdit(ui.util.debounce(chartTimeSeriescddf, 500));
drawingTools.onDraw(ui.util.debounce(chartgetgif, 500));
drawingTools.onEdit(ui.util.debounce(chartgetgif, 500));
function chartTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var length =  ee.ImageCollection("users/mtemimi/alacons2022").size();
var list =  ee.ImageCollection("users/mtemimi/alacons2022").toList(length);
var polygonArea =aoi.area({'maxError': 1});
// Print the result to the console.
print('polygon.area(...) =', polygonArea.multiply(0.0000003861));
var modis= ee.ImageCollection('users/mtemimi/alacons2022').filterBounds(aoi)
var waterThreshold =1; 
var landThreshold=2;
var vegThreshold=3;
var SnowThreshold=4
var iceThreshold = 5; 
var cloudThreshold=6;
//Var shadowThreshold=7;
// water function:
var waterfunction = function(image){
  //get pixels above the threshold
  var water01 = image.mask(image.eq(waterThreshold));//.and (image.gt(iceThreshold));
 // var water01 = image.gt(waterThreshold);
  var land01 = image.gte(waterThreshold).and (image.lt(landThreshold));
  var veg01 = image.gte(landThreshold).and (image.lt(vegThreshold));
  var snow01 = image.gte(4).and (image.lt(5));
  var ice01 = image.gte(5).and (image.lt(6));
  var cloud01 = image.gte(iceThreshold).and (image.lt(cloudThreshold));
  var shadow01 = image.gte(cloudThreshold);//.and (image.gt(iceThreshold));
  //ee.Image.pixelArea: Generate an image in which the value of each pixel is the area of that pixel in square meters.
  // 1 m2 is  3.86102e-7 mi2
  var area = ee.Image.pixelArea().multiply(0.0000003861);
  var waterArea = water01.multiply(area).rename('waterArea');
  image = image.addBands(waterArea);
  var IceArea = ice01.multiply(area).rename('IceArea');
  image = image.addBands(IceArea);
  var LandArea = land01.multiply(area).rename('LandArea');
  image = image.addBands(LandArea);
  var VegArea = veg01.multiply(area).rename('VegArea');
  image = image.addBands(VegArea);
  var SnowArea = snow01.multiply(area).rename('SnowArea');
  image = image.addBands(SnowArea);
  var CloudArea = cloud01.multiply(area).rename('CloudArea');
  image = image.addBands(CloudArea);
  var ShadowArea = shadow01.multiply(area).rename('ShadowArea');
  image = image.addBands(ShadowArea);
  var stats = image.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: aoi, 
    scale: 500,
  });
  return image.set(stats);
};
var collection = modis.map(waterfunction);
print('waterfunction',collection);
  // Chart MODIS time series for the selected area of interest.
  var chart = ui.Chart.image.series({
  imageCollection: collection.select('waterArea','IceArea','SnowArea'),//'LandArea','VegArea','SnowArea','CloudArea','ShadowArea'), 
  region: aoi, 
  reducer: ee.Reducer.sum(), 
  scale: 500
                  })
                  .setOptions({
                   title: 'Classes',
                    hAxis: {
                    title: 'Date',
                    titleTextStyle: {italic: false, bold: true},
                  },
                    vAxis:
                   {title: 'Area [mi2]', titleTextStyle: {italic: false, bold: true}},
                    colors: ['39a8a7','C0C0C0','1d6b99', '0f8755', '76b349', 'f0af07','e37d05','C0C0C0']
});
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
  // function that gets called when the button is clicked on (removes chart from map)
button2.onClick(function(){
  leftMap.remove(chartPanel); //removes the chart from map
  leftMap.remove(chartPanel2); //removes the chart from map
});
}
function chartTimeSeriescddf() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel2.style().get('shown')) {
    chartPanel2.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var length = imageCollection2.size();
var list =  imageCollection2.toList(length);
// Define reference conditions from the first 10 years of data.
var reference2 = gldas.map(function(image) {
    var img=image.add(ee.Image([-273.15])).divide(ee.Image([8])).set('system:time_start', image.get('system:time_start'));
    return img
          .addBands(img.rename('CDDF'))}
);
var reference=reference2.select('CDDF');
var negative = reference.map(function(image){
    //get pixels above the threshold
  var notfreezing = image.mask(image.gt(0))
  var freezing = image.mask(image.lte(0))
  var notfreezingarea=notfreezing.unmask(0)
  var frezzingare=freezing.multiply(notfreezingarea)
  return image
} )
print('reference',negative)
// Display cumulative anomalies.
Map.setCenter(-150.42747102044294,67.2922747836951, 10);
//Map.addLayer(reference.sum(),    {min: -600, max: 300, palette: ['FF0000', '000000', '00FF00']}, ' CDDF');
// Get the timestamp from the most recent image in the reference collection.
var time0 = negative.first().get('system:time_start');
// Use imageCollection.iterate() to make a collection of cumulative anomaly over time.
// The initial value for iterate() is a list of anomaly images already processed.
// The first anomaly image in the list is just 0, with the time0 timestamp.
var first = ee.List([
  // Rename the first band 'EVI'.
  ee.Image(-5).set('system:time_start', time0).select([0], ['CDDF'])
]);
// This is a function to pass to Iterate().
// As anomaly images are computed, add them to the list.
var accumulate = function(image, list) {
  // Get the latest cumulative anomaly image from the end of the list with
  // get(-1).  Since the type of the list argument to the function is unknown,
  // it needs to be cast to a List.  Since the return type of get() is unknown,
  // cast it to Image.
  var previous = ee.Image(ee.List(list).get(-1));
  // Add the current anomaly to make a new cumulative anomaly image.
  var added = image.add(previous)
    // Propagate metadata to the new image.
    .set('system:time_start', image.get('system:time_start'));
  // Return the list with the cumulative anomaly inserted.
  return ee.List(list).add(added);
};
// Create an ImageCollection of cumulative anomaly images by iterating.
// Since the return type of iterate is unknown, it needs to be cast to a List.
var cumulative = ee.ImageCollection(ee.List(negative.iterate(accumulate, first)));
print(cumulative)
var absolut=cumulative.map(function(image) {
    return image.multiply(ee.Image([-1]))//image.abs()
    .set('system:time_start', image.get('system:time_start'));
});
// Predefine the chart titles.
var title = {
  title: 'Temperature anomaly over time',
  hAxis: {title: 'Time'},
  vAxis: {title: 'T_  anomaly [c]'},
};
var title2 = {
//  title: 'Cumulative day deep freezing',
  hAxis: {title: 'Time'},
  vAxis: {title: 'CDDF'},
};
//print('Temperature Anamoly:',
//    Chart.image.series(reference, geometry, ee.Reducer.first(), 27830).setOptions(title));
print('CDDF:', Chart.image.series(absolut, aoi, ee.Reducer.first(), 27830).setOptions(title2));
//print(Chart.image.series(absolut,geometry, ee.Reducer.max(), 27830))
var chart2 = ui.Chart.image.series({
  imageCollection: absolut,
  region: aoi, 
  reducer: ee.Reducer.sum(), 
  scale: 27830
            })
                  .setOptions(title2);
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel2.widgets().reset([chart2]);
}
function chartgetgif() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel3.style().get('shown')) {
    chartPanel3.style().set('shown', true);
  }
// Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
//var modis= ee.ImageCollection('users/zrahimi/alacons').filterBounds(aoi)
//var modis= calculated_list.filterBounds(aoi)
var imageCollection = ee.ImageCollection("users/mtemimi/alacons2022").filterBounds(aoi)
                  .map(function(image) {
                     var image=image.mask(image.gte(1).and(image.lte(6))) //here
                        return image.set('system:time_start', image.get('system:time_start'))
                  }); //Alaska2021
// Difference in days between start and finish
var finish = ee.Date(Date.now());
var start = ee.Date('2022-03-1');
var diff = finish.difference('2022-03-1', 'day')
// Make a list of all dates
var range = ee.List.sequence(0, diff.subtract(1)).map(function(day){return start.advance(day,'day')})
// Funtion for iteraton over the range of dates
var day_mosaics = function(date, newlist) {
  // Cast
  date = ee.Date(date)
  newlist = ee.List(newlist)
  // Filter collection between date and the next day
  var filtered = imageCollection.filterDate(date, date.advance(40,'day'))
                    .map(function(image) {
                     var image=image.mask(image.gte(1).and(image.lt(6))) //here
                        return image.set('system:time_start', image.get('system:time_start'))
                  });
  // Make the mosaic
  var image = ee.Image(filtered.median())
  // Add the mosaic to a list only if the collection has images
  return ee.List(ee.Algorithms.If(filtered.size(), newlist.add(image), newlist))
}
// Iterate over the range to make a new list, and then cast the list to an imagecollection
var newcol = ee.ImageCollection(ee.List(range.iterate(day_mosaics, ee.List([]))))
                  .map(function(image) {
                     var image=image.mask(image.gte(1).and(image.lte(6))) //here
                        return image.set('system:time_start', image.get('system:time_start'))
                  });
print(newcol)
var doy = ee.Date(imageCollection.first().get('system:time_start')).getRelative('day', 'year');
print('doy',doy)
var text = require('users/gena/packages:text'); // Import gena's package which allows text overlay on image
var annotations = [
  {position: 'right', offset: '1%', margin: '1%', property: 'label', scale: 30} //large scale because image if of the whole world. Use smaller scale otherwise
  ]
 // var aaa = /* color: #d63000 */ee.Geometry.Rectangle(aoi);
//  print(aaa)
//print(L8Coll.first().get('CLOUD_COVER'))  
var aaa=ee.Geometry.Point([-79.36259427707736,44.407254864303084]) 
var visualization = {"bands":['b1'],"min":1,"max":7};
// Create RGB visualization images for use as animation frames.
var rgbVis = newcol.map(function(img) {
  return img.visualize(visualization).clip(aoi)
});
print('rgbVis',rgbVis)
// Define GIF visualization parameters.
var gifParams = {
  'region': geometry,
  'dimensions': 500,
  'crs': 'EPSG:3857',
  'framesPerSecond': 3//,  'format': 'gif'
};
  // Define arguments for animation function parameters.
var videoArgs = {
  dimensions: 500,
  region: aoi,
  framesPerSecond: 3,
  crs: 'EPSG:3857',
  min: 1,
  max: 7,
  palette: ['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0']
};
// Print the animation to the console as a ui.Thumbnail using the above defined
// arguments. Note that ui.Thumbnail produces an animation when the first input
// is an ee.ImageCollection instead of an ee.Image.
var text = require('users/gena/packages:text'); // Import gena's package which allows text overlay on image
var annotations = [
  {position: 'right', offset: '1%', margin: '1%', property: 'label', scale: 30} //large scale because image if of the whole world. Use smaller scale otherwise
  ]
//print(L8Coll.first().get('CLOUD_COVER'))  
function addText(image){
  var timeStamp = image.get('DATE_ACQUIRED'); // get the time stamp of each frame. This can be any string. Date, Years, Hours, etc.
  var timeStamp = ee.String(timeStamp); //convert time stamp to string 
  var image = image.visualize({ //convert each frame to RGB image explicitly since it is a 1 band image
      forceRgbOutput: true,
      bands: ['b1'],
      min: 1,
      max: 7,
//      palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red']
    }).set({'label':timeStamp}); // set a property called label for each image
  var annotated = text.annotateImage(image, {}, aaa, annotations); // create a new image with the label overlayed using gena's package
  return annotated 
}
var tempCol = newcol.map(addText) //add time stamp to all images
//print(ui.Thumbnail(newcol, videoArgs));
///print(newcol.getVideoThumbURL(videoArgs));
//print(ui.Thumbnail(tempCol, videoArgs)); //print gif
var chart3=ui.Thumbnail(newcol, videoArgs)
//print(ui.Thumbnail(tempCol, videoArgs));
// Print the GIF URL to the console.
// Register a function to draw a chart when a user clicks on the map.
//Map.onClick(function(coords) {
  //panel.clear();
 // var point = ee.Geometry.Point(coords.lon, coords.lat);
//  var chart = ui.Chart.image.regions(image, point, null, 30);
 // chart.setOptions({title: 'Band values'});
  chartPanel3.add(chart3);
//});
  // should paste it here
  chartPanel3.widgets().reset([chart3]);
  button2.onClick(function(){
  rightMap.remove(chartPanel3); //removes the chart from map
 // leftMap.remove(chartPanel2); //removes the chart from map
});
}
//********************* LEGEND
function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 13px'
    }
  });
// Create legend title
  var legendTitle = ui.Label({
    value: 'Legend',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
// Add the title to the panel
  legend.add(legendTitle); 
 // Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '6px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 2px 4px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['0000FF', '808000', '008000', 'FFFFFF', '00FFFF', 'C0C0C0', 'C0C0C0'];
// name of the legend
var names = ['Water','Land','Vegetation','Snow','River Ice','Cloud','Cloud Shadow'];
// Add color and and names
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
  return legend;
}
// Legend for ic
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'top-right',
    padding: '3px 5px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Ice Concentration',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0px 0px 0px 0px',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// The max label code
var max_label = ui.Label({
  value: '100',
  style: {
    fontWeight: 'normal',
    fontSize: '11px',
    margin: '0px 0px 0px 36px',   // margin positions the title or text based on the parameters you give
    padding: '5px'                // padding spaces the label a certain amount from other labels around it
    }
});
legend.add(max_label);
// Creating the color bar
function makeColorBarParams(palette) {
  return {
    bbox: [0, 1, 2, 0,],  
    dimensions: '20x150',
    format: 'png',
    palette: palette,
  };
}
var  palette= [ '0000FF','00FFFF'];
// the colorbar to show the different soil moisture
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(1),
  params: makeColorBarParams(palette),
  style: {stretch: 'vertical', margin: '0px 50px', maxHeight: '200px'},
});
legend.add(colorBar)
// The min label code
var min_label = ui.Label({
  value: '0.0',
  style: {
    fontWeight: 'normal',
    fontSize: '11px',
    margin: '0px 0px 0px 36px',   // margin positions the title or text based on the parameters you give
    padding: '5px'                // padding spaces the label a certain amount from other labels around it
    }
});
legend.add(min_label);
leftMap.add(legend);