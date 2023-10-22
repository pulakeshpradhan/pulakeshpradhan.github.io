/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var sentinel2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    s2 = ee.Image("COPERNICUS/S2/20150828T110656_20160412T015159_T30SVG"),
    sentinel1 = ee.ImageCollection("COPERNICUS/S2"),
    table = ee.FeatureCollection("users/amalia22cristina/exampleAssetId"),
    app = {},
    table2 = ee.FeatureCollection("users/amalia22cristina/InputData"),
    elevation = ee.Image("CGIAR/SRTM90_V4"),
    temperature = ee.ImageCollection("MODIS/006/MOD11A1"),
    teritory = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    precipitations = ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational"),
    table3 = ee.FeatureCollection("users/amalia22cristina/PointName"),
    geometry = /* color: #9999ff */ee.Geometry.Polygon(
        [[[23.79263984163981, 46.97462442432037],
          [23.823710550868327, 46.97778679675905],
          [23.823710550868327, 46.99371294038656],
          [23.78869162996989, 46.992073703505575],
          [23.79263984163981, 46.97462442432037]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var geometry2 = /* color: #bf04c2 */ee.Geometry.Polygon(
        { coords: [[23.884941549581296, 46.454103000886896],
          [24.763847799581296, 47.101137437321526],
          [23.731132955831296, 47.2803180629336],
          [23.006035299581296, 46.83123191127901]]});
var romaniaBorder = teritory.filter(ee.Filter.eq('country_co', 'RO'));
//////////////////////////// Cloud Mask ////////////////////////////////
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
/////////////////////////// Visualization ////////////////////////////////
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var visFun = function(img) {
  return img.visualize(rgbVis).copyProperties(img, img.propertyNames());
};
var precipitationVis = {
      min: 0.0,
      max: 11.0,
      palette:
          ['6082b6', 'ffffff', '80daeb', '90ee90', 'efff00', 'ffb103', 'c23b22'],
  };
/////////////////////////// Images  ////////////////////////////////
var images = {
  'First' : showFirst,
  'Max': showMax,
  'Mean': showMean,
  'Median': showMedian,
  'Min': showMin,
  'Product': showProduct,
  'Sum': showSum
};
function showFirst(img){ return img.first(); }
function showMax(img){ return img.max(); }
function showMean(img){ return img.mean(); }
function showMedian(img){ return img.median(); }
function showMin(img){ return img.min(); }
function showProduct(img){ return img.product(); }
function showSum(img){ return img.sum(); }
var maxSize = 3;
//////////////////////////  Main Function //////////////////////////////
var showLayer = function() {
  Map.layers().reset();
  var startD = app.intro.text_sd.getValue();
  var endD = app.intro.text_ed.getValue();
  var image_sentinel = sentinel2.filterBounds(geometry)
                              .filterDate(startD, endD)
                              .map(maskS2clouds);
  var image_sentinel_clouds = sentinel2.filterBounds(geometry)
                              .filterDate(startD, endD)
                              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));
  //print("Images: ", image_sentinel.size());
  //var listOfImages = image_sentinel.toList(image_sentinel.size());
  //print('IMG', listOfImages.get(0));
  Map.addLayer(image_sentinel.map(visFun).median(),{}, String(startD));
////////////////////////////////  Choose Image  //////////////////////////
  var selected_image = image_sentinel.map(visFun);
  var selected_image_first = showFirst(selected_image);
  var selected_image_max = showMax(selected_image);
  var selected_image_mean = showMean(selected_image);
  var selected_image_median = showMedian(selected_image);
  var selected_image_min = showMin(selected_image);
  var selected_image_product = showProduct(selected_image);
  var selected_image_sum = showSum(selected_image);
///////////////////////////////  Bare Soil  ////////////////////////////////
  var bare_soil = image_sentinel_clouds.map(maskScl);
  Map.addLayer(bare_soil, {}, "Bare Soil ");
/////////////////////////  Connected Pixel  /////////////////////////////////
  function connected(image, name){
    var connected_pixels = image.int8().connectedPixelCount(maxSize, false);
    connected_pixels = connected_pixels.updateMask(connected_pixels.gte(maxSize));
    connected_pixels = connected_pixels.select('vis-red').visualize({palette: '0093af'});
    var stats = connected_pixels.reduceRegion({
      reducer: ee.Reducer.count(),
      geometry: geometry,
      scale: 30,
      maxPixels: 1e12
    });
    var connpx = ee.Dictionary(stats).get('vis-red');
    print(name + "- Nb connected pixels: ", connpx);
    return connected_pixels;
 }
  var image_first = connected(selected_image_first, 'First');
  var image_max = connected(selected_image_max, 'Max');
  var image_mean = connected(selected_image_mean, 'Mean');
  var image_median = connected(selected_image_median, 'Median');
  var image_min = connected(selected_image_min, 'Min');
  var image_product = connected(selected_image_product, 'Product');
  var image_sum = connected(selected_image_sum, 'Sum');
  function addToLayer(img){
        var layer_first = img.int8().connectedPixelCount(maxSize, false);
        layer_first = layer_first.updateMask(layer_first.gte(maxSize));
        layer_first = layer_first.select('vis-red').visualize({palette: '0093af'});
        return layer_first;
  }
  var layerForSum = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Sum'), addToLayer(selected_image_sum));
  var layerForProduct = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Product'), addToLayer(selected_image_product), layerForSum);
  var layerForMin = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Min'), addToLayer(selected_image_min), layerForProduct);
  var layerForMedian = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Median'), addToLayer(selected_image_median), layerForMin);
  var layerForMean = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Mean'), addToLayer(selected_image_mean), layerForMedian);
  var layerForMax = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Max'), addToLayer(selected_image_max), layerForMean);
  var layerForFirst = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'First'),addToLayer(selected_image_first),layerForMax);
  Map.addLayer(ee.Image(layerForFirst), {}, 'Connected Pixels');
///////////////////////   Connected Pixels For Soil Image   ////////////////////
  function connectedPx(conn_pixel_soil, image, name) {
    var conn_pixelSoil = conn_pixel_soil.eq(image).int8().connectedPixelCount(maxSize, false);
    conn_pixelSoil = conn_pixelSoil.updateMask(conn_pixelSoil.gte(maxSize));
    conn_pixelSoil = conn_pixelSoil.select('vis-red').visualize({palette: 'ff3370'});
    var stats_soil = conn_pixelSoil.reduceRegion({
      reducer: ee.Reducer.count(),
      geometry: geometry,
      scale: 30,
      maxPixels: 1e12
    });
    var connpxSoil = ee.Dictionary(stats_soil).get('vis-red');
    //print(name+ '- Nb connected pixels-soil: ' , connpxSoil);
    return connpxSoil;
}
  var connpxSoil_first = connectedPx(showFirst(bare_soil), image_first, 'First');
  var connpxSoil_max = connectedPx(showMax(bare_soil), image_max, 'Max');
  var connpxSoil_mean = connectedPx(showMean(bare_soil), image_mean, 'Mean');
  var connpxSoil_median = connectedPx(showMedian(bare_soil), image_median, 'Median');
  var connpxSoil_min = connectedPx(showMin(bare_soil), image_min, 'Min');
  var connpxSoil_product = connectedPx(showProduct(bare_soil), image_product, 'Product');
  var connpxSoil_sum = connectedPx(showSum(bare_soil), image_sum, 'Sum');
  function addConnectedToLayer(conn_pixel_soil, image) {
      conn_pixel_soil = conn_pixel_soil.eq(image).int8().connectedPixelCount(maxSize, false);
      conn_pixel_soil = conn_pixel_soil.updateMask(conn_pixel_soil.gte(maxSize));
      conn_pixel_soil = conn_pixel_soil.select('vis-red').visualize({palette: 'ff3370'});
      return conn_pixel_soil;
  }
  var layerForSoilSum = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Sum'), addConnectedToLayer(showSum(bare_soil), image_sum));
  var layerForSoilProduct = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Product'), addConnectedToLayer(showProduct(bare_soil), image_product), layerForSoilSum);
  var layerForSoilMin = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Min'), addConnectedToLayer(showMin(bare_soil), image_min), layerForSoilProduct);
  var layerForSoilMedian = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Median'), addConnectedToLayer(showMedian(bare_soil), image_median), layerForSoilMin);
  var layerForSoilMean = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Mean'), addConnectedToLayer(showMean(bare_soil), image_mean), layerForSoilMedian);
  var layerForSoilMax = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'Max'), addConnectedToLayer(showMax(bare_soil), image_max), layerForSoilMean);
  var layerForSoil = ee.Algorithms.If(ee.Algorithms.IsEqual(ee.String(app.intro.reducer_select.getValue()),'First'), addConnectedToLayer(showFirst(bare_soil), image_first), layerForSoilMax);
  Map.addLayer(ee.Image(layerForSoil), {}, 'Connected Soil Pixels');  
//////////////////////// Normalized Difference Vegetation Index //////////////
  var ST2_nocloud = image_sentinel.map(cloudfunction_ST2);
  var st2median = ST2_nocloud.median();
  var ndvi = st2median.normalizedDifference(['B8', 'B4']);
  set_threshold(ndvi);
////////////////////////////  Save Image   /////////////////////////
 // print("Projection: ", image_sentinel.map(visFun).mean().projection());
  // Export.image.toDrive({
  //   image: image_sentinel.map(visFun).min(),
  //   description: String(startD)+'Image',
  //   region: square,
  //   scale: 30,
  //   maxPixels: 1e12
  // });
//////////////////////////  Save Pixels Value  /////////////////////////////
  var pixels = image_sentinel.median()
                             .addBands(elevation)
                             .addBands(getTemperature(startD, endD))
                             .addBands(getInfoPrecipitation(startD, endD))
                             .reduceRegion({
    reducer: ee.Reducer.toList(),
    geometry: geometry,
    scale: 100
  });
  var numberOfPixels = ee.List(pixels.values().get(0)).size();
  var bandNames = image_sentinel.median()
                                .addBands(elevation)
                                .addBands(getTemperature(startD, endD))
                                .addBands(getInfoPrecipitation(startD, endD))
                                .bandNames();
  var features = ee.FeatureCollection(
    ee.List.sequence(0, numberOfPixels.subtract(1))
      .map(function (i) {
        return bandNames.iterate(function (bandName, feature) {
          bandName = ee.String(bandName);
          var pixelValue = ee.List(pixels.get(bandName)).get(i);
          return ee.Feature(feature)
            .set(bandName, pixelValue);
        }, ee.Feature(geometry));
      })
  );
// print(features);
// Export.table.toDrive({
//   collection: features,
//   description:'Pixel_Value_ETP',
//   fileFormat: 'CSV'
// });
/////////////////////////////////////   Chart    /////////////////////////////////
  var eeArray0 = ee.Array([connpxSoil_first]);
  var eeArray1 = ee.Array([connpxSoil_max]);
  var eeArray2 = ee.Array([connpxSoil_mean]);
  var eeArray3 = ee.Array([connpxSoil_median]);
  var eeArray4 = ee.Array([connpxSoil_min]);
  var eeArray5 = ee.Array([connpxSoil_product]);
  var eeArray6 = ee.Array([connpxSoil_sum]);
  var yValues = ee.Array.cat([eeArray0, eeArray1, eeArray2, eeArray3, eeArray4, eeArray5, eeArray6], 1);
  var chart = ui.Chart.array.values(yValues, 0)
    .setSeriesNames(['Soil Pixels-First Reducer', 'Soil Pixels-Max Reducer', 'Soil Pixels-Mean Reducer',
                      'Soil Pixels-Median Reducer', 'Soil Pixels-Min Reducer', 'Soil Pixels-Product Reducer', 
                      'Soil Pixels-Sum Reducer'])
    .setChartType('ColumnChart')
    .setOptions({
        title: 'Number of connected pixels',
        hAxis: {},
        vAxis: {'title': '{Bare Soil Pixels}'}
  });
  print(chart);
/////////////////////////////////////   Temperature And Precipitations    /////////////////////////////////
  Map.addLayer( getTemperature(startD, endD), 
                {min: 20, max: 40, palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']},
                //landSurfaceTemperatureVis,
                'Land Surface Temperature');
 // Map.addLayer( getInfoPrecipitation(startD, endD), precipitationVis, 'Precipitation');
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////  Bare Soil  ///////////////////////////////////////////////////
function maskScl(image) {
  var scl = image.select('SCL').where(image.select('QA60').gte(1024), 1);
  var mask = scl.eq(5);
  return image.updateMask(mask).select('SCL').visualize({palette: 'b38b6d'});
}
////////////////////////////////    Remove Clouds    ///////////////////////////////
var cloudfunction_ST2 = function(image){
  var quality = image.select("QA60").unmask();
  //get pixels above the threshold
  var cloud01 = quality.gt(0);
  //create a mask from high likelihood pixels
  var cloudmask = image.mask().and(cloud01.not());
  return image.updateMask(cloudmask);
};
/////////////////////////////   NDVI Threshold    ///////////////////////////////
var set_threshold = function(image_ndvi) {
      var thresholded = image_ndvi.lt(ee.Number(Number(app.intro.ndvi_textbox.getValue())));
      var myndvi = thresholded.updateMask(thresholded);
      var ndvi_viz = {palette:"66b032"};
      Map.addLayer(myndvi, ndvi_viz, 'NDVI');
};
var panel = ui.Panel();
  panel.style().set({
    width: '400px',
    position: 'bottom-right'
  });
Map.add(panel);
/////////////////////////////////////////////////////////////////////////////
//////////////////////////////      User Interface    ///////////////////////
var lat_coords;
var long_coords;
var point_name;
var buffer_size;
var sizes = {
  '9' : ee.Number(9),
  '18' : ee.Number(18),
  '27' : ee.Number(27),
  '36' : ee.Number(36),
  '45' : ee.Number(45),
  '54' : ee.Number(54), 
  '63' : ee.Number(63)
};
app.createPanels = function(){
  app.intro = {
    panel: ui.Panel ([
      ui.Label({
        value: 'Sentinel-2 Application',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter and combine images from the Sentinel-2 collection.')
      ]),
    date_label: ui.Label ({
      value: '1) Select Date and Reducer Type',
      style: {fontWeight: 'bold'}
      }),
    start_date_label: ui.Label({
      value: 'Start Date',
      style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 10px'}
     }),
    text_sd: ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      value: '2019-04-30',
      style: {}
     }),
    end_date_label: ui.Label({
      value: 'End Date',
      style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '5px 15px 0px 10px'}
     }),
    text_ed: ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      value: '2019-05-31',
      style: {}
     }),
    reducer_label: ui.Label ({
      value: 'Select Reducer Type',
      style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '5px 15px 0px 10px'}
      }),
    reducer_select: ui.Select ({
      items: Object.keys(images),
      style: {width: '130px'}
    }),
    button: ui.Button({
      label: 'Apply filter',
      onClick: showLayer
      }),
    ndvi_label: ui.Label ({
      value: '2) NDVI Threshold',
      style: {fontWeight: 'bold', margin: '30px 0px 5px 10px'}
      }),
    value_label: ui.Label ({
      value: 'Value',
      style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '5px 15px 0px 10px'}
      }),  
    ndvi_textbox:  ui.Textbox({
      placeholder: '0.0 - 1.0',
      value: '0.4',
      onChange: showLayer
     }),
    elevation_label: ui.Label ({
      value: '3) Elevation Histogram',
      style: {fontWeight: 'bold', margin: '30px 0px 5px 10px'}
    }),
    button_elevation: ui.Button({
      label: 'Print Histogram',
      onClick: printHistogram
    }),
    points_label: ui.Label ({
      value: '4) Measurement Points',
      style: {fontWeight: 'bold', margin: '30px 0px 5px 10px'}
    }),
    latitude_panel: ui.Panel([
      ui.Label ({
      value: 'Latitude:',
      style: {color:'grey', fontWeight: 'bold', fontSize:'12px',margin: '15px 15px 0px 10px'}
     }),
      lat_coords = ui.Textbox ({
      style: {color:'#5f9ea0', fontSize:'9px', fontWeight: 'bold', width: '60px'}
     }) 
    ], ui.Panel.Layout.flow('horizontal')),
    longitude_panel: ui.Panel([
      ui.Label ({
      value: 'Longitude:',
      style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 10px'}
     }),
      long_coords = ui.Textbox ({
      style: {color:'#5f9ea0', fontSize:'9px', fontWeight: 'bold', width: '60px'}
     }) 
    ], ui.Panel.Layout.flow('horizontal')),
    buffer_size_panel : ui.Panel([ 
      ui.Label ({
        value: 'Buffer Size',
        style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 10px'}
      }),  
      buffer_size = ui.Select ({
        items: Object.keys(sizes),
        style: {width: '130px'}
        }),
    ], ui.Panel.Layout.flow('horizontal')),
    point_name_panel : ui.Panel([ 
      ui.Label ({
        value: 'Point Name',
        style: {color:'grey', fontWeight: 'bold', fontSize:'12px', margin: '15px 15px 0px 10px'}
      }),  
      point_name = ui.Textbox ({
        placeholder: ' ',
        style: {color:'#5f9ea0', fontSize:'9px', fontWeight: 'bold'}
      })
    ], ui.Panel.Layout.flow('horizontal')),
    button_panel: ui.Panel([ 
      ui.Button({
        label: 'Add to Table',
        onClick: addPointToTable
        }),
      ui.Button({
        label: 'Extract Values',
        onClick: extractValues
      })
    ], ui.Panel.Layout.flow('horizontal')),
    download_label: ui.Label ({
      value: '',
      style: {color:'grey', fontSize:'11px', margin: '15px 15px 0px 10px'}
    }),
    url_label: ui.Label ({
      value: '',
      style: {color:'#acacac', fontSize:'9px', margin: '10px 15px 0px 10px'}
     })
  };
};
app.boot = function(){
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.intro.date_label,
      app.intro.start_date_label,
      app.intro.text_sd,
      app.intro.end_date_label,
      app.intro.text_ed,
      app.intro.reducer_label,
      app.intro.reducer_select,
      app.intro.button,
      app.intro.ndvi_label,
      app.intro.value_label,
      app.intro.ndvi_textbox,
      app.intro.elevation_label,
      app.intro.button_elevation,
      app.intro.points_label,
      app.intro.latitude_panel,
      app.intro.longitude_panel,
      app.intro.buffer_size_panel,
      app.intro.point_name_panel,
      app.intro.button_panel, 
      app.intro.download_label,
      app.intro.url_label
    ],
    style: {width: '330px', padding: '10px'}
  });
  Map.setCenter(23.8, 46.98);
  ui.root.insert(0,main);
};
app.boot();
// Export.table.toDrive({
//   collection: features,
//   description:'InputData',
//   fileFormat: 'GeoJSON'
// });
//////////////////////////////   Table   /////////////////////////////////
function extractValues(){
  //print(table2.size());
  //var counter = ee.String(app.intro.points_textbox.getValue()).decodeJSON();
  //print(counter);
  var collection = ee.Collection.loadTable('users/amalia22cristina/InputData');
  print(collection);
  var label = collection.reduceColumns(ee.Reducer.toList(), ['label']);
    label = ee.List(label.get('list'));
  var lon = collection.reduceColumns(ee.Reducer.toList(), ['lon']);
    lon = ee.List(lon.get('list'));
  var lat = collection.reduceColumns(ee.Reducer.toList(), ['lat']);
    lat = ee.List(lat.get('list'));
  var sizeC = collection.reduceColumns(ee.Reducer.toList(), ['size']);
    sizeC =  ee.List(sizeC.get('list'));
  var soil = collection.reduceColumns(ee.Reducer.toList(), ['soil']);
    soil =  ee.List(soil.get('list'));
  var startD = app.intro.text_sd.getValue();
  var endD = app.intro.text_ed.getValue();
  var selectedImage = sentinel2.filterBounds(romaniaBorder)
                              .filterDate(startD, endD);
// var measurementPoint = ee.Geometry.Point(23.92395294125573, 46.892598988721005);
/////////////////////////////////////////////////////////////////////////////////////
  //var measurementPoint = ee.Geometry.Point([lon.get(0), lat.get(0)]);
  var lat_json = ee.String(lat_coords.getValue()).decodeJSON();
  var lon_json = ee.String(long_coords.getValue()).decodeJSON();
  var measurementPoint = ee.Geometry.Point([lon_json, lat_json]);
  //get projection and scale
  var proj = selectedImage.first().select('B4').projection();
  var scale = proj.nominalScale();
  //get coordinates image
  var latlon = ee.Image.pixelLonLat().reproject(proj);
  //Create a geometry object at the true center of the pixel
  var coords = latlon.select(['longitude', 'latitude'])
                  .reduceRegion({
    reducer: ee.Reducer.toList(),
    geometry: measurementPoint,
    scale: scale
  });
  var lat = ee.List(coords.get('latitude'));
  var lon = ee.List(coords.get('longitude'));
  var point_list = lon.zip(lat);
  var center = ee.Geometry.MultiPoint(point_list);
  // Create your window by buffering by the scale
  var buffer_json = ee.String(buffer_size.getValue()).decodeJSON();
  var mywindow = center.buffer(buffer_json).bounds();
  var coords = latlon.select(['longitude', 'latitude'])
                  .reduceRegion({
    reducer: ee.Reducer.toList(),
    geometry: mywindow,
    scale: scale
  });
  var lat = ee.List(coords.get('latitude'));
  var lon = ee.List(coords.get('longitude'));
  var point_list = lon.zip(lat);
  var centerpoints = ee.Geometry.MultiPoint(point_list);
  //print('pt',point_list);
  Map.addLayer(centerpoints);
  var point_collection = ee.FeatureCollection(point_list.map(function(el){
    el = ee.List(el) ;
    var geom = ee.Geometry.Point([ee.Number(el.get(0)), ee.Number(el.get(1))]);
    ///// return ee.Feature(geom, {'label': label.get(0), 'lat': el.get(1), 'lon': el.get(0), 'soil': soil.get(0)});
    return ee.Feature(geom, {'label': point_name.getValue(), 'lat': el.get(1), 'lon': el.get(0)});
  }));
  print(point_collection);
  Export.table.toAsset({
    collection: point_collection,
    description: point_name.getValue(),
    assetId: point_name.getValue()
    //description:'Point_' + app.intro.points_textbox.getValue(),
    //assetId: 'Point_' + app.intro.points_textbox.getValue()
  });
}
// //////////////////////////////////   Elevation Histogram  ////////////////////////
function printHistogram(){
    var histogram = ui.Chart.image.histogram({
    image: elevation,
    region: geometry,
    // scale: 200,
    // minBucketWidth: 300
  });
  histogram.setOptions({
    title: 'Histogram of Elevation (meters)'
  });
  print(histogram);
}
// //////////////////////////////////   Temperature  ////////////////////////
print(romaniaBorder);
Map.centerObject(romaniaBorder, 6);
//Map.addLayer(romaniaBorder);
function getTemperature(sd, ed){
    var dataset = temperature.filter(ee.Filter.date(sd, ed))
                              .filter(ee.Filter.bounds(geometry));
    var landSurfaceTemperature = dataset.select('LST_Day_1km');
    // var landSurfaceTemperatureVis = {
    //   min: 20,
    //   max: 40,
    //   palette: [
    //     '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    //     '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    //     '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    //     'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    //     'ff0000', 'de0101', 'c21301', 'a71001', '911003'
    //   ],
    // };
    var modLSTc = landSurfaceTemperature.map(function(img) {
      return img
        .multiply(0.02)
        .subtract(273.15)
        .copyProperties(img, ['system:time_start']);
    });
    var clippedSurface = modLSTc.mean().clip(romaniaBorder);
    return clippedSurface;
}
// //////////////////////////////////   Precipitations  ////////////////////////
function getInfoPrecipitation(sd, ed){
    var dataset = precipitations
                      .filter(ee.Filter.date(sd,ed));
                      //.clip(romaniaBorder);
    var precipitation = dataset.select('hourlyPrecipRate');
    var clippedSurface = precipitation.mean().clip(romaniaBorder);
    return clippedSurface;
}
// ///////////////////////////////  Save Measure Points in CSV  /////////////
function exportMeasurePointsValues(assetTable){
  var startD = app.intro.text_sd.getValue();
  var endD = app.intro.text_ed.getValue();
  var image_sentinel = sentinel2.filterBounds(geometry)
                              .filterDate(startD, endD);
  print("Images: ", image_sentinel.size());
  var listOfImages = image_sentinel.toList(image_sentinel.size());
  //print('IMG', listOfImages.get(0));
  print('point_table', assetTable);
  ////// Change image
  var pixels = ee.Image(listOfImages.get(1))
                            .addBands(elevation)
                            .addBands(getTemperature(startD, endD))
                            .addBands(getInfoPrecipitation(startD, endD))
                            .reduceRegion({
    reducer: ee.Reducer.toList(),
    geometry: ee.FeatureCollection(assetTable).geometry(),
    scale: 10
  });
  var listGeom = ee.FeatureCollection(assetTable).geometry().coordinates();
  var numberOfPixels = ee.List(pixels.values().get(0)).size();
  print('px', pixels);
  ////// Change image
  var bandNames = ee.Image(listOfImages.get(1))
                                .addBands(elevation)
                                .addBands(getTemperature(startD, endD))
                                .addBands(getInfoPrecipitation(startD, endD))
                                .bandNames();
  var filterFeature = ee.Filter.inList('SCL', [5]);
  var features = ee.FeatureCollection(
    ee.List.sequence(0, numberOfPixels.subtract(1))
      .map(function (i) {
        return bandNames.iterate(function (bandName, feature) {
          bandName = ee.String(bandName);
          var pixelValue = ee.List(pixels.get(bandName)).get(i);
          return ee.Feature(feature).set(bandName, pixelValue);
        },
        //ee.Feature(ee.FeatureCollection(point0_table).geometry()));
        ee.Feature(ee.Geometry.Point(listGeom.get(i))));
      })
  );
  var label = assetTable.reduceColumns(ee.Reducer.toList(), ['label']);
  label = ee.List(label.get('list'));
// label = ee.String(label.get(0));
  print('label', ee.String(label.get(0)));
  print('Result',features.filter(filterFeature));
  // Export.table.toDrive({
  //   collection: features.filter(filterFeature),
  //   description:'Point_',
  //   fileFormat: 'CSV'
  // });
}
exportMeasurePointsValues(table3);
  var point_list = ee.List([]);
  //var collection = ee.FeatureCollection([]);
function addPointToTable(){
  var features = ee.Feature(null, {"name": point_name.getValue(), 
                                                         "longitude": long_coords.getValue(), 
                                                         "latitude": lat_coords.getValue()});
  point_list = point_list.add(features);
  var coll = ee.FeatureCollection(point_list);
  print('features ', coll);  
  // var full_config = {
  //     type: 'EXPORT_FEATURES',
  //     json: features.serialize(),
  //     element: features,
  //     description: point_name.getValue(),
  //     state: 'UNSUBMITTED',
  //     driveFileNamePrefix: point_name.getValue(),
  //     driveFolder: 'Data',
  //     fileFormat: 'CSV'
  // };
  // print(ee.data.newTaskId());
  // return ee.data.startProcessing(ee.data.newTaskId()[0], full_config);
  app.intro.download_label.setValue('Download Link: ');
  app.intro.url_label.setValue(ee.data.makeTableDownloadUrl(ee.data.getTableDownloadId({table: coll, format: 'JSON', filename: 'File'})));
}
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lat_coords.setValue(coords.lat.toFixed(2));
  long_coords.setValue(coords.lon.toFixed(2));
  point_name.setValue('');
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
});
Map.style().set('cursor', 'crosshair');