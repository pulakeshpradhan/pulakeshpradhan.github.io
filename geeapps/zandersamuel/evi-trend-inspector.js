/*
// Title: vegetation EVI explorer app
// Author: Zander Venter - zandersameul@gmail.com
*/
///////////////////////////////////////////////////////////////////////////////////////////
// ---- Remote sensing functions
///////////////////////////////////////////////////////////////////////////////////////////
//----- MAKE A DUMMY COLLECTOIN FOR FILLTING MISSING YEARS -----
var dummyCollection = ee.ImageCollection([ee.Image([0,0,0,0,0,0]).mask(ee.Image(0))]); // make an image collection from an image with 6 bands all set to 0 and then make them masked values
//------ L8 to L7 HARMONIZATION FUNCTION -----
// slope and intercept citation: Roy, D.P., Kovalskyy, V., Zhang, H.K., Vermote, E.F., Yan, L., Kumar, S.S, Egorov, A., 2016, Characterization of Landsat-7 to Landsat-8 reflective wavelength and normalized difference vegetation index continuity, Remote Sensing of Environment, 185, 57-70.(http://dx.doi.org/10.1016/j.rse.2015.12.024); Table 2 - reduced major axis (RMA) regression coefficients
var harmonizationRoy = function(oli) {
  var slopes = ee.Image.constant([0.9785, 0.9542, 0.9825, 1.0073, 1.0171, 0.9949]);        // create an image of slopes per band for L8 TO L7 regression line - David Roy
  var itcp = ee.Image.constant([-0.0095, -0.0016, -0.0022, -0.0021, -0.0030, 0.0029]);     // create an image of y-intercepts per band for L8 TO L7 regression line - David Roy
  var y = oli.select(['B2','B3','B4','B5','B6','B7'],['B1', 'B2', 'B3', 'B4', 'B5', 'B7']) // select OLI bands 2-7 and rename them to match L7 band names
             .resample('bicubic')                                                          // ...resample the L8 bands using bicubic
             .subtract(itcp.multiply(10000)).divide(slopes)                                // ...multiply the y-intercept bands by 10000 to match the scale of the L7 bands then apply the line equation - subtract the intercept and divide by the slope
             .set('system:time_start', oli.get('system:time_start'));                      // ...set the output system:time_start metadata to the input image time_start otherwise it is null
  return y.toShort();                                                                       // return the image as short to match the type of the other data
};
//------ RETRIEVE A SENSOR SR COLLECTION FUNCTION -----
var getSRcollection = function(year, startDay, endDay, sensor, aoi) {
  // get a landsat collection for given year, day range, and sensor
  var srCollection = ee.ImageCollection('LANDSAT/'+ sensor + '/C01/T1_SR') // get surface reflectance images
                       .filterBounds(aoi)                                  // ...filter them by intersection with AOI
                       .filterDate(year+'-'+startDay, year+'-'+endDay);    // ...filter them by year and day range
  // apply the harmonization function to LC08 (if LC08), subset bands, unmask, and resample           
  srCollection = srCollection.map(function(img) {
    var dat = ee.Image(
      ee.Algorithms.If(
        sensor == 'LC08',                                                  // condition - if image is OLI
        harmonizationRoy(img.unmask()),                                    // true - then apply the L8 TO L7 alignment function after unmasking pixels that were previosuly masked (why/when are pixels masked)
        img.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7'])                   // false - else select out the reflectance bands from the non-OLI image
           .unmask()                                                       // ...unmask any previously masked pixels 
           .resample('bicubic')                                            // ...resample by bicubic 
           .set('system:time_start', img.get('system:time_start'))         // ...set the output system:time_start metadata to the input image time_start otherwise it is null
      )
    );
    // make a cloud, cloud shadow, and snow mask from fmask band
    var qa = img.select('pixel_qa');                                       // select out the fmask band
    var mask = qa.bitwiseAnd(8).eq(0).and(                                 // include shadow
               qa.bitwiseAnd(16).eq(0)).and(                               // include snow
               qa.bitwiseAnd(32).eq(0));                                   // include clouds
    // apply the mask to the image and return it
    return dat.mask(mask); //apply the mask - 0's in mask will be excluded from computation and set to opacity=0 in display
  });
  return srCollection; // return the prepared collection
};
//------ FUNCTION TO COMBINE LT05, LE07, & LC08 COLLECTIONS -----
var getCombinedSRcollection = function(year, startDay, endDay, aoi) {
    var lt5 = getSRcollection(year, startDay, endDay, 'LT05', aoi);// get TM collection for a given year, date range, and area
    var le7 = getSRcollection(year, startDay, endDay, 'LE07', aoi);// get ETM+ collection for a given year, date range, and area
    var lc8 = getSRcollection(year, startDay, endDay, 'LC08', aoi);// get OLI collection for a given year, date range, and area
    var mergedCollection = ee.ImageCollection(lt5.merge(le7).merge(lc8));    // merge the individual sensor collections into one imageCollection object
    return mergedCollection;                                                // return the Imagecollection
};
//------ All: RETRIEVE A SENSOR SR COLLECTION FUNCTION -----
var getSRcollectionAll = function(startYear, endYear, startDay, endDay, sensor, aoi) {
  // get a landsat collection for given year, day range, and sensor
  var srCollection = ee.ImageCollection('LANDSAT/'+ sensor + '/C01/T1_SR') // get surface reflectance images
                       .filterBounds(aoi)                                  // ...filter them by intersection with AOI
                       .filterDate(startYear+'-'+startDay, endYear+'-'+endDay);    // ...filter them by year and day range
  // apply the harmonization function to LC08 (if LC08), subset bands, unmask, and resample           
  srCollection = srCollection.map(function(img) {
    var dat = ee.Image(
      ee.Algorithms.If(
        sensor == 'LC08',                                                  // condition - if image is OLI
        harmonizationRoy(img.unmask()),                                    // true - then apply the L8 TO L7 alignment function after unmasking pixels that were previosuly masked (why/when are pixels masked)
        img.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B7'])                   // false - else select out the reflectance bands from the non-OLI image
           .unmask()                                                       // ...unmask any previously masked pixels 
           .resample('bicubic')                                            // ...resample by bicubic 
           .set('system:time_start', img.get('system:time_start'))         // ...set the output system:time_start metadata to the input image time_start otherwise it is null
      )
    );
    // make a cloud, cloud shadow, and snow mask from fmask band
    var qa = img.select('pixel_qa');                                       // select out the fmask band
    var mask = qa.bitwiseAnd(8).eq(0).and(                                 // include shadow
               qa.bitwiseAnd(16).eq(0)).and(                               // include snow
               qa.bitwiseAnd(32).eq(0));                                   // include clouds
    // apply the mask to the image and return it
    return dat.mask(mask); //apply the mask - 0's in mask will be excluded from computation and set to opacity=0 in display
  });
  return srCollection; // return the prepared collection
};
//------ All: FUNCTION TO COMBINE LT05, LE07, & LC08 COLLECTIONS -----
var getCombinedSRcollectionAll = function(startYear, endYear, startDay, endDay, aoi) {
    var lt5 = getSRcollectionAll(startYear, endYear,  startDay, endDay, 'LT05', aoi);// get TM collection for a given year, date range, and area
    var le7 = getSRcollectionAll(startYear, endYear, startDay, endDay, 'LE07', aoi);// get ETM+ collection for a given year, date range, and area
    var lc8 = getSRcollectionAll(startYear, endYear,  startDay, endDay, 'LC08', aoi);// get OLI collection for a given year, date range, and area
    var mergedCollection = ee.ImageCollection(lt5.merge(le7).merge(lc8));    // merge the individual sensor collections into one imageCollection object
    return mergedCollection;                                                // return the Imagecollection
};
//------ FUNCTION TO REDUCE COLLECTION TO SINGLE IMAGE PER YEAR BY MEDOID -----
var makeMosaic = function(inCollection, dummyCollection, mosaicMethod) { 
  // fill in missing years with the dummy collection
  var imageCount = inCollection.toList(1).length();                                                            // get the number of images 
  var finalCollection = ee.ImageCollection(ee.Algorithms.If(imageCount.gt(0), inCollection, dummyCollection)); // if the number of images in this year is 0, then use the dummy collection, otherwise use the SR collection
  // calculate median across images in collection per band
  var median = finalCollection.median();       
  // calculate the different between the median and the observation per image per band
  var difFromMedian = finalCollection.map(function(img) {
    var diff = ee.Image(img).subtract(median).pow(ee.Image.constant(2));                                       // get the difference between each image/band and the corresponding band median and take to power of 2 to make negatives positive and make greater differences weight more
    return diff.reduce('sum').addBands(img);                                                                   // per image in collection, sum the powered difference across the bands - set this as the first band add the SR bands to it - now a 7 band image collection
  });
  // get the medoid by selecting the image pixel with the smallest difference between median and observation per band 
  var medoid = ee.ImageCollection(difFromMedian).reduce(ee.Reducer.min(7)).select([1,2,3,4,5,6], ['B1','B2','B3','B4','B5','B7']); // find the powered difference that is the least - what image object is the closest to the median of teh collection - and then subset the SR bands and name them - leave behind the powered difference band
  var output = null
  if (mosaicMethod.toLowerCase() === 'median') {
      output = median.select([0,1,2,3,4,5], ['B1','B2','B3','B4','B5','B7'])
    }
    else {
      output = medoid 
    }
  return output
};
//------ FUNCTION TO APPLY MEDOID COMPOSITING FUNCTION TO A COLLECTION -------------------------------------------
var buildMosaic = function(year, startDay, endDay, aoi, dummyCollection) {                                                                      // create a temp variable to hold the upcoming annual mosiac
  var collection = getCombinedSRcollection(year, startDay, endDay, aoi);  // get the SR collection
  var img = makeMosaic(collection, dummyCollection, mosaicMethod)         // apply the medoidMosaic function to reduce the collection to single image per year by medoid 
              .set('system:time_start', (new Date(year,8,1)).valueOf());  // add the year to each medoid image - the data is hard-coded Aug 1st 
  return ee.Image(img);                                                   // return as image object
};
//------ FUNCTION TO BUILD ANNUAL MOSAIC COLLECTION ------------------------------
var buildMosaicCollection = function(startYear, endYear, startDay, endDay, aoi, dummyCollection) {
  var imgs = [];                                                                    // create empty array to fill
  for (var i = startYear; i <= endYear; i++) {                                      // for each year from hard defined start to end build medoid composite and then add to empty img array
    var tmp = buildMosaic(i, startDay, endDay, aoi, dummyCollection);               // build the medoid mosaic for a given year
    imgs = imgs.concat(tmp.set('system:time_start', (new Date(i,1,1)).valueOf()));  // concatenate the annual image medoid to the collection (img) and set the date of the image - hard coded to the year that is being worked on for Aug 1st
  }
  return ee.ImageCollection(imgs);                                                  // return the array img array as an image collection
};
//calculate the EVI
var add_EVI = function(image) { 
  var evi =   image.expression(
      '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
        'NIR': image.select('B4'),
        'RED': image.select('B3'),
        'BLUE': image.select('B1')
  }).rename('evi')
  return image.addBands(evi)//.set('system:time_start', image.get('system:time_start'));
};
var clampEVI = function(img){
  var out = img.clamp(0,3)
  out = out.unitScale(0,3)
  return out.set('system:time_start', img.get('system:time_start'))
};
//calculate the NDVI
var add_NDVI = function(image) { 
  var ndvi = image.normalizedDifference(['B4', 'B3']).rename('evi').clamp(0,1)
  return image.addBands(ndvi);
};
var createTimeBand = function(collection) {
  var start = ee.Date(ee.Image(collection.first()).get('system:time_start')).get('year')
  collection = collection.map(function(img){
     var year = ee.Date(img.get('system:time_start')).get('year').subtract(ee.Number(start))
    return ee.Image(year).byte().addBands(img).set('system:time_start', img.get('system:time_start'))
  });
  return collection
  }
var temporalAverage = function(collection, unit) {
  var startDate = ee.Date(ee.Image(collection.sort('system:time_start').first().get('system:time_start')));
  startDate = startDate.advance(ee.Number(0).subtract(startDate.getRelative('month',unit)),'month')
    .update(null,null,null,0,0,0);
  var endDate = ee.Date(ee.Image(collection.sort('system:time_start',false).first()).get('system:time_start'));
  endDate = endDate.advance(ee.Number(0).subtract(endDate.getRelative('month',unit)),'month')
    .advance(1,unit).advance(-1,'month')
    .update(null,null,null,23,59,59);
  var dateRanges = ee.List.sequence(0, endDate.difference(startDate,unit).round().subtract(1), 2)
  function makeTimeslice(num) {
    var start = startDate.advance(num, unit);
    var startDateNum = ee.Number.parse(start.format("YYYYMMdd"));
    var end = start.advance(2, unit).advance(-1, 'second');
    // Filter to the date range
    var filtered = collection.filterDate(start, end);
    // Get the mean
    var unitMeans = filtered.median()/////////Can be changed to another statistic!!!
      .set('system:time_start',start.millis(),'system:time_end',end,'date',startDateNum);
    return unitMeans;
  }
  // Aggregate to each timeslice
  var new_collection = ee.ImageCollection(dateRanges.map(makeTimeslice));
  return new_collection;
};
var createLegend = function(title, minVal, maxVal, minLab, maxLab, palette) { 
  var geometry = ee.Geometry.Polygon(
          [[[-54, -4.05],
            [-53, -4.05],
            [-53, -4.00],
            [-54, -4.00]]]);
  var latlong = ee.Image.pixelLonLat();
  var legend = ui.Panel({
      "style": {
          "position": 'top-left',
      }
  });
  // layer 1
  var obj = {
      "title": ui.Label({
          "value": title,
          "style": {
              "fontSize": '14px',
              "margin": '3px 0 0 3px',
          }
      }),
      "bar": ui.Thumbnail({
          "image": latlong.clip(geometry).visualize({
              "bands": ['longitude'],
              "min": -54,
              "max": -53,
              "palette": palette
          }),
          "params": {
              "region": geometry.toGeoJSON(),
              "format": 'png'
          },
          "style": {
              "height": '15px',
              "width": '250px',
              "margin": '-1px 0 0 8px',
              "border": '1px solid gray'
          }
      }),
      "panel1": ui.Panel({
          "layout": ui.Panel.Layout.flow('horizontal'),
      }),
      "panel2": ui.Panel({
          "layout": ui.Panel.Layout.flow('horizontal'),
      }),
      "minAxis": ui.Label({
          "value": minVal,
          "style": {
              "margin": '0 0 0 4px',
              "fontSize": '12px'
          }
      }),
      "maxAxis": ui.Label({
          "value": maxVal,
          "style": {
              "margin": '0 0 0 240px',
              "fontSize": '12px'
          }
      }),
      "minLabel": ui.Label({
          "value": minLab,
          "style": {
              "margin": '0 0 0 6px',
              "fontSize": '12px'
          }
      }),
      "maxLabel": ui.Label({
          "value": maxLab,
          "style": {
              "margin": '0 0 0 200px',
              "fontSize": '12px'
          }
      })
  };
  /**
   *
   */
  var legendAddLayer = function(legend, layer) {
      legend.add(layer.title);
      layer.panel1.add(layer.minAxis);
      layer.panel1.add(layer.maxAxis);
      layer.panel2.add(layer.minLabel);
      layer.panel2.add(layer.maxLabel);
      legend.add(layer.panel1);
      legend.add(layer.bar);
      legend.add(layer.panel2);
      return legend;
  };
  // Add Layers
  return legendAddLayer(legend, obj);
  // legend = legendAddLayer(legend, defIndex2);
}
///////////////////////////////////////////////////////////////////////////////////////////
// ---- UI initialization and functions
///////////////////////////////////////////////////////////////////////////////////////////
//------ Remote sensing global variables
// hardcoding annual date ranges to include in landsat image collection mosaics
var startDay   = '01-01';
var endDay     = '12-30';
// define a geometry placeholder
var aoi = null;
// Choose mosaicing method -- median or medoid
var mosaicMethod = 'median'; // hard coding median here
// Import a water mask to white-out water because they give funky EVI signals
var water =  ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
var waterMask = water.gt(50);
waterMask = waterMask.unmask(ee.Image(0));
waterMask = waterMask.eq(0);
waterMask = waterMask.selfMask();
//------ Start-up UI objects
// Main panel to hold graphing and clicking widgets
var panel = ui.Panel({style: {width: '400px'}});
var label_heading = ui.Label({
    value:'Vegetation change inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
});
var label_colSelect = ui.Label('2) Select the timeseries frequency: ')
var label_click = ui.Label('3) Select an area to get an EVI timeseries')
var dateText1 =ui.Textbox({value:'1984', placeholder:'1984',style: {width: '75px', margin: '10px 1px 1px 10px'}})
var dateText2 =ui.Textbox({value:'2018', placeholder:'2018',style: {width: '75px', margin: '10px 1px 1px 10px'}})
var date_label = ui.Label({value: '1) Enter date range: ', style: {margin: '13px 1px 1px 8px'}})
var datePanel = ui.Panel({"layout": ui.Panel.Layout.flow('horizontal')}).add(date_label).add(dateText1).add(dateText2);
var latText =ui.Textbox({style: {width: '55px', margin: '10px 1px 1px 10px'}})
var lonText =ui.Textbox({onChange: handleCoords, value:'', placeholder:'',style: {width: '55px', margin: '10px 1px 1px 10px'}})
var coord_label = ui.Label({value: '(OR) enter coords manually (Lat-Lon): ', style: {margin: '13px 1px 1px 8px'}})
var coordPanel = ui.Panel({"layout": ui.Panel.Layout.flow('horizontal')}).add(coord_label).add(latText).add(lonText);
var toolsPanel = ui.Panel({
  layout:  ui.Panel.Layout.Flow("horizontal"),
  style: {
    position: 'bottom-center',
    padding: '1px 1px'
  }
});
var drawModeSelect = ui.Select({
  items: ['Point statistics', 'Polygon statistics'],
  value: 'Point statistics',
  onChange: setDrawMode,
  style: {fontWeight: 'bold', fontSize: '14px', padding:'1px, 1px, 1px, 1px'}
});
var instruction = ui.Label({value: 'Click on the map to get statistics',style: {margin: '13px 1px 1px 8px'}});
var warning = ui.Label({value: 'Too large - smaller please',style: {color: 'ff0000', margin: '13px 1px 1px 8px'}});
var colSelect = ui.Select({
  items: ['Annual', 'Bi-weekly'],
  value: 'Annual',
  //onChange: setDrawMode,
  style: {fontWeight: 'bold', fontSize: '14px', padding:'1px, 1px, 1px, 1px'}
});
toolsPanel.widgets().reset([drawModeSelect, instruction]);
function setDrawMode() {
  if (drawModeSelect.getValue() == 'Point statistics') {
    map.style().set('cursor', 'crosshair');
    toolsPanel.clear()
    toolsPanel.widgets().reset([drawModeSelect, instruction]);
    map.onClick(doPointStats)
    geomLayer.geometries().reset();
  } else {
    map.style().set('cursor', 'hand');
    toolsPanel.clear()
    toolsPanel.widgets().reset([drawModeSelect, drawButton]);
    map.unlisten()
  }
}
// Create drawing buttons
var ToggleButton = function(labels, func, tools) {
  var index = 0, l = labels.length;
  var button = ui.Button(labels[index]);
  var toggle = function() {
    var i = index;
    this.setLabel(labels[++index % l]);
    func(labels[i % l], i % l);
  }.bind(button);
  button.toggle = toggle;
  button.onClick(toggle);
  return button;
};
var oldGeometry;
var drawButton = ToggleButton(['Draw', 'Cancel'], function(label) {
  if (label == 'Cancel') {
    map.style().set('cursor', 'hand');
    if (oldGeometry) {
      geomLayer.geometries().reset([oldGeometry]);
    }
    tools.stop();
  } else {
    map.style().set('cursor', 'crosshair');
    oldGeometry = geomLayer.geometries().get(0);
    geomLayer.geometries().reset();
    tools.draw();
  }
});
// Map set to hybrid
var map = ui.Map().setOptions("HYBRID");
// Define a map state which will be used to know whether to reset center and extract trend image
var mapState = {'flag': 0};
// Define a start-up function which will be recalled when the user hits reset button
var tools = ui.Map.DrawingTools();
tools.setLinked(false);
print(tools)
var geomLayer = ui.Map.GeometryLayer();
tools.layers().add(geomLayer)
tools.setShown(false);
tools.setShape('polygon')
tools.onEdit(function(geometry, layer) {
  doGeomStats(geometry);
});
tools.onDraw(function(geometry, layer) {
  tools.stop();
  oldGeometry = null;
  doGeomStats(geometry);
  map.style().set('cursor', 'crosshair');
  map.onClick(doPointStats)
  if (drawButton.getLabel() == 'Cancel') {
    drawButton.toggle();
  }
});
function startUI(){
  ui.root.clear(); 
  map.widgets().reset();
  panel.widgets().reset();
  panel.widgets().reset([label_heading,datePanel,label_colSelect, colSelect, label_click, toolsPanel, coordPanel]);
  ui.root.add(panel).add(map);
  map.setCenter(24.938,-29.19, 5);
  map.style().set('cursor', 'crosshair');
  map.add(tools)
  mapState.flag = 0;
}
// Create reset app button
var resetButton = ui.Button('Reset app', startUI);
var resetLabel = ui.Label('Cick on other areas to redraw graph. To reset app, please refresh web page.');
startUI();
// Create reset button to escape image comparison mode back to trend image
var Return = ui.Button('Return to trend image', returnFun);
function returnFun() {
  ui.root.widgets().reset();
  ui.root.add(panel).add(map);
  panel.clear();
  panel.widgets().reset([label_heading, label_click]);
}
// Create lat and lon placeholders
var lat = null;
var lon = null;
//------ Image comparison UI objects
// Need RGB and EVI image visualization selector widget
var RGB = 'RGB';
var EVI = 'EVI';
var select = ui.Select({
  items: [RGB, EVI],
  value: RGB,
  onChange: redraw,
});
var select_label= ui.Label('Select visualization here: ')
var selectPanel = ui.Panel({"layout": ui.Panel.Layout.flow('horizontal')}).add(select_label).add(select)
var rgb = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1800};
var eviPal = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, 3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
var evi = {bands: ['evi'], min: 0, max: 2.5,  palette: eviPal};
// Create a EVI legend panel to display when EVI viz is selected
var eviLegend = createLegend('EVI', '0', '1', 'Low', 'High', eviPal);
// The redraw function called on change in select widget
function redraw() {
  var layer = select.getValue();
  var leftMap = ui.root.widgets().get(1).getFirstPanel();
  print(leftMap.layers());
  var rightMap = ui.root.widgets().get(1).getSecondPanel();
  if (layer == RGB) {
    leftMap.widgets().remove(eviLegend);
    leftMap.layers().get(0).setVisParams(rgb);
    rightMap.layers().get(0).setVisParams(rgb);
  } else if (layer == EVI) {
    leftMap.widgets().set(1,eviLegend);
    leftMap.layers().get(0).setVisParams(evi);
    rightMap.layers().get(0).setVisParams(evi);
  } 
}
//------ Map click events
//map.onClick(doGeomStats)
//map.unlisten()
function handleCoords(){
  var lat = latText.getValue();
  var lon = lonText.getValue();
  var pgeo = ee.Geometry.Point([ Number(lon),Number(lat)]);
  getGeomStats(pgeo)
}
function doGeomStats(geometry){
  // Check if geometry is too big
  var area = geometry.area();
  area.evaluate(function(val){
    if (val > 100000000){
      print('too big');
      toolsPanel.clear()
      toolsPanel.widgets().reset([drawModeSelect, drawButton, warning]);
    } else {
      getGeomStats(geometry);
    }
  });
}
function doPointStats(coords){
  var pgeo = ee.Geometry.Point([coords.lon, coords.lat]);
  getGeomStats(pgeo)
}
function getGeomStats(geometry){
  // Get start and end years from user input text boxes
  var startYear = dateText1.getValue();
  var endYear = dateText2.getValue();
  panel.widgets().reset();
  panel.widgets().add(label_heading);
  // Location
  var aoi = geometry
  var circle = geometry.buffer(10000);
  lat =ee.List(geometry.centroid().coordinates()).get(1);
  lon = ee.List(geometry.centroid().coordinates()).get(0);
  // If it is the first map click, then center map on click location
  if (mapState.flag === 0) {
    map.centerObject(geometry, 12);
  }
  // build annual surface reflection collection for the selected location
  var annualSRcollection = buildMosaicCollection(startYear, endYear, startDay, endDay, aoi, dummyCollection); // put together the cloud-free medoid surface reflectance annual time series collection
  // add EVI band
  annualSRcollection = annualSRcollection.map(add_EVI); 
  //----- Build non-mosaiced collection ----
  var rawSRcollection = getCombinedSRcollectionAll(startYear, endYear, startDay, endDay, aoi)
  rawSRcollection = rawSRcollection.map(add_EVI);
  //rawSRcollection = temporalAverage(rawSRcollection, 'month');
  if (colSelect.getValue() == 'Annual'){
    var collectionSelect = annualSRcollection;
  } else {
    collectionSelect = rawSRcollection;
  }
  var ptLayer = ui.Map.Layer(geometry, {color: '#ff00cb'}, 'point');
  // Now clamp EVI values and scale between 0 and 1
  var eviClamped = collectionSelect.select('evi').map(clampEVI);
  // Add time band for regression
  eviClamped = createTimeBand(eviClamped);
  // Sens slope is best for non-parametric data
  var eviTrend = eviClamped.reduce({reducer: ee.Reducer.sensSlope()});
  eviTrend = eviTrend.rename(['scale', 'offset']);
  // Calculate slope (annual change) relative to y-intercept
  eviTrend = eviTrend.select('scale')
    .divide(eviTrend.select('offset').clamp(0.05,1)) //clampint y-intercept between 0 and 1 - may reconsider this...
    .multiply(ee.Image(100))
  eviTrend = eviTrend.clip(circle);
  // Hard coding visualisation to -4 and 4. Could get minMax from map bounds
  eviTrend = eviTrend.visualize({min: -4, max: 4, palette:['red','yellow','green']})
  // Mask water with white
  eviTrend = eviTrend.updateMask(waterMask).unmask(ee.Image(1).visualize({min:1, max:1, palette:['ffffff']}))
  // Add trend image layer
  var trendImg = ui.Map.Layer(eviTrend, {}, 'Trend in evi');
  // Add a trend levent which will be displayed on click
  var trendLegend = createLegend('EVI rel change %/year', '-2', '2', 'Decline', 'Increase', '#ff0000, #FFFF00, #008000');
  // If second map click then dont change zoom and map center
  if (mapState.flag === 0) {
    map.layers().reset();
    map.widgets().reset();
    map.layers().add(trendImg);
    map.widgets().set(2,trendLegend);
  }
  map.layers().set(1,ptLayer);
  print('here')
  // Create a chart of evi over time
  var chart = ui.Chart.image.series(eviClamped.select(['evi'],['EVI']), aoi, ee.Reducer.mean(), 200)
    .setOptions({
      title: 'EVI annual medoid with linear trend line',
      vAxis: {title: 'evi'},//viewWindow: {min: 0,max: 1}},
      series: {
        0: {lineWidth: 1,pointSize: 2,curveType: 'function'}
      },
      trendlines: {0: {color: 'ff0000', lineWidth:1,pointSize: 0}}, // this line is not Sens slope but takes too long to manually add it
      colors: ['green']
    });
 // panel.widgets().set(1, ui.Label(location));
  panel.widgets().set(2,resetLabel);
  panel.widgets().set(3, ui.Label('Click on a point in the graph below to display the corresponding image'));
  panel.widgets().set(4, chart);
  //---- Chart click objects
  // Set a center and zoom level.
  //var center = {lon: coords.lon, lat: coords.lat, zoom: 10};
  // Create left and right maps for displaying two image dates
  var leftMap = ui.Map().setOptions("HYBRID");
  leftMap.centerObject(geometry, 12)
  var rightMap = ui.Map().setOptions("HYBRID");
  rightMap.centerObject(geometry, 12)
  // Link them together.
  var linker = new ui.Map.Linker([leftMap, rightMap]);
  // Create a split panel with the two maps.
  var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    orientation: 'horizontal',
    wipe: true
  });
  // Create state flag for three states:
      //0: first graph click add image to left map and change instruction
      //1: second click add image to right map, change isntruction and add visualisation select
  var state = {'flag': 0, 'clickPrev': null};
  // When the chart is clicked, update the map and label.
  chart.onClick(function(xValue, yValue, seriesName) {
    print(state.flag)
    if (state.flag === 0) {
      leftMap.setZoom(map.getZoom())
      rightMap.setZoom(map.getZoom())
      //panel.widgets().remove(Return);
      panel.widgets().remove(selectPanel);
      ui.root.widgets().remove(splitPanel);
      ui.root.widgets().set(1, splitPanel);
      var label = ui.Label('Now click on more recent point to compare images accross time');
      panel.widgets().set(2, label);
      //panel.widgets().set(4, Return);
      panel.widgets().set(4, selectPanel);
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var image = ee.Image(collectionSelect.filter(equalDate).first());
      image = image.clip(circle);
      // Show a label with the date on the map.
      var datePanel1 = ui.Panel({style: {shown: true, position: 'bottom-left'}})
        .add(ui.Label((new Date(xValue)).toUTCString()));
      leftMap.widgets().set(0,datePanel1)
      // For some reason the point layer gets lost so redefining it here
     // var point = ee.Geometry.Point(coords.lon, coords.lat);
      //var ptLayer = ui.Map.Layer(point, {color: 'FF0000'}, 'point');
      // Drop down menu
      var rgb = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1800};
      var eviPal = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, 3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
      var evi = {bands: ['evi'], min: 0, max: 2.5,  palette: eviPal};
      var visParam = null;
      if (select.getValue() == RGB) {
        visParam = rgb
      } else {
        visParam = evi
      } 
      var ImgLayer = ui.Map.Layer(image, visParam, (new Date(xValue)).toUTCString());
      leftMap.layers().reset([ImgLayer, ptLayer]);
      //var location = 'Lon: ' + coords.lon.toFixed(2) + ' ' + 'Lat: ' + coords.lat.toFixed(2)
      state.flag = 1;  
    } else if (state.flag == 2) {
      rightMap.widgets().reset()
      leftMap.widgets().reset()
      rightMap.layers().reset([null, ptLayer]);
      leftMap.layers().reset([null, ptLayer]);
      var label = ui.Label('Click on a point in the graph below to display the corresponding image');
      panel.widgets().set(3, label);
      //panel.widgets().remove(Return);
      panel.widgets().remove(selectPanel);
      //panel.widgets().add(Return);
      state.flag = 0;
    } else if (state.flag == 1) {
      //panel.widgets().remove(Return);
      panel.widgets().remove(selectPanel);
      var label = ui.Label('Click on a point again to reset');
      panel.widgets().set(2, label);
      //panel.widgets().set(4, Return);
      panel.widgets().set(4, selectPanel);
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var image = ee.Image(collectionSelect.filter(equalDate).first());
      image = image.clip(circle);
      // Show a label with the date on the map.
      var datePanel2 = ui.Panel({style: {shown: true, position: 'bottom-right'}})
        .add(ui.Label((new Date(xValue)).toUTCString()));
      rightMap.widgets().set(0,datePanel2)
      //var point = ee.Geometry.Point(coords.lon, coords.lat);
      var ptLayer = ui.Map.Layer(geometry, {color: 'FF0000'}, 'point');
      // Drop down menu
      var rgb = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1800};
      var eviPal = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, 3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
      var evi = {bands: ['evi'], min: 0, max: 2.5,  palette: eviPal};
      var visParam = null;
      if (select.getValue() == RGB) {
        visParam = rgb;
      } else {
        visParam = evi;
      } 
      var ImgLayer = ui.Map.Layer(image, visParam, (new Date(xValue)).toUTCString());
      rightMap.layers().reset([ImgLayer, ptLayer]);
      //var location = 'Lon: ' + coords.lon.toFixed(2) + ' ' + 'Lat: ' + coords.lat.toFixed(2)
      state.flag = 2;
    }
  });
  mapState.flag = 1;
}
setDrawMode()