var OS_9Mar20_Balikpapan = ui.import && ui.import("OS_9Mar20_Balikpapan", "table", {
      "id": "users/salmanddd14/shp/OS_09Mar20_Balikpapan"
    }) || ee.FeatureCollection("users/salmanddd14/shp/OS_09Mar20_Balikpapan");
/* A UI to interactively filter a collection, select an individual image
  from the results, display it with a variety of visualizations, and export it.
  The namespace for our application.  All the state is kept in here.
  Utk ubah data ada di baris 231 , var COLLECTION_ID. Datanya  di baris
*/
var Img,AOI_Point = ee.Geometry.Point(117.5211,-0.9474);
var app = {}; // Struktur Aplikasi
var KoleksiImg = ['LANDSAT/LC08/C01/T1_SR','COPERNICUS/S2_SR','COPERNICUS/S1_GRD'];
/** Creates the UI panels. */
app.createPanels = function() { // Panel menampung bbrp obyek/fungsi
  /* The introduction section. */
  app.intro = { // App_1 : Intro
    panel: ui.Panel([
      ui.Label({
        value: 'SENTINEL-1 Explorer',
        style: {fontWeight: 'bold', fontSize: '20px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter and export images ' +
               'from the Sentinel-1 GRD collection.' + '(by Dr Dede Dirgahayu. LAPAN)')
    ])
  };
  /* The collection filter controls. */
  app.filters = { //  App_2 : filters waktu
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2020-02-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2020-03-11'),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    applyButton2: ui.Button('Fase Padi', app.applyFilters2),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({ // Multi struktur dari app.
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
      app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Center on map', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select an image', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
        app.picker.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Export the current image to Drive',
      // React to the button's click event.
      onClick: function() {
        // Select the full image id.
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to Drive.
        Export.image.toDrive({
        //  image: ee.Image(imageId).select(visOption.visParams.bands),
          image:Img.select('VV_Cor','VH_Cor','VV-VH').multiply(10).toInt16(),
          description: 'S1_Export-' + imageIdTrailer,
          scale : 10,
        });
      }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) Start an export', {fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.mapCenter,
      app.picker.select,
      app.picker.centerButton,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var filtered = ee.ImageCollection(app.COLLECTION_ID);
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
   filtered = filtered.filterBounds(Map.getCenter());
  // filtered = filtered.filterBounds(Map.getBounds());
    }
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    var Ls8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
   // .filterDate('2017-10-01', '2018-12-31')
    .filter(filtered)
   // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
  //  .map(maskL8sr)
    .map(addBands_Idx);
    // Get the list of computed ids.
    var computedIds = filtered
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
     //   var JumList = computedIds.size().getInfo();
     //   print ('Jumlah List Img : ' + JumList);
        print ('List Id Img : ',computedIds);
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  /** Refreshes the current map layer based on the UI widget states. */
  // Tampilkan 1 Citra terpilih
  app.refreshMapLayer = function() {
    Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
Img = ee.Image(app.COLLECTION_ID + '/' + imageId);
    var VV_Corr = Img.select('VV').subtract(Img.select('angle').multiply(Math.PI/180.0).cos().
    log10().multiply(10.0)).rename('VV_Cor').toFloat();
    var VH_Corr = Img.select('VH').subtract(Img.select('angle').multiply(Math.PI/180.0).cos().
    log10().multiply(10.0)).rename('VH_Cor').toFloat() ;
//    var VV_VH = VV_Corr.subtract(VH_Corr).rename('VV-VH').toFloat();
var VV_VH = Img.select('VV').subtract(Img.select('VH')).toFloat().rename('VV-VH');
//Img = Img.addBands(VV_VH);
Img = Img.addBands(VV_Corr).addBands(VH_Corr).addBands(VV_VH);
Img = Img.select('VV_Cor','VH_Cor','VV-VH');
  //  var ImgMsk = maskL8sr(image); // Mask dg Awan
 //   var ImgIdx = addBands_Idx(ImgMsk).select('NDBI','EVI','NDWI');
 //   var ImgSc = image.divide(10000); // Reflektan diadikan 0 - 1
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
 var VisRGB_S1 = {bands:['VV_Cor','VH_Cor','VV-VH'],min: [-16,-24,1], max : [0,-7,24]};
//  var VisRGB_S1 = {bands:['VV','VH','VV-VH'],min: [-28.2,-35.9,3.4], max : [9.9,3.5,10.7]};
     // Map.addLayer(Ls8,{}, 'List data Landsat 8_', false);
   //   Map.addLayer(ImgIdx,VisRGB_Idx, 'RGB(NDBI,EVI,NDWI)_'+ imageId);
  //    Map.addLayer(ImgSc, visOption.visParams, imageId);
      Map.addLayer(Img, VisRGB_S1, 'RGB Sentinel 1 ');
      Map.addLayer(OS_9Mar20_Balikpapan, {color : 'red'}, 'Lokasi Oil Spill');
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
app.COLLECTION_ID = KoleksiImg[2];
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 215;
  app.VIS_OPTIONS = {
    'Natural Color S2 (B11/B8/B4)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears green.',
      visParams: {gamma: 1.3, min: 0, max: 0.45, bands: ['B11', 'B8', 'B4']}
              },
      'Natural Color L8 (B6/B5/B4)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears green.',
      visParams: {gamma: 1.3, min: 0, max: 0.45, bands: ['B6', 'B5', 'B4']}
              },
    'False color (B7/B6/B4)': {
      description: 'Vegetation is shades of red, urban areas are ' +
                   'cyan blue, and soils are browns.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B4']}
    },
    'Natural color 2 (B4/B3/B2)': {
      description: 'Ground features appear in colors similar to their ' +
                   'appearance to the human visual system.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
    'Atmospheric (B7/B6/B5)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears blue.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B5']}
    },
    'False Color 1 (B5/B4/B2)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears red.',
      visParams: {gamma: 1.3, min: 0, max: 0.35, bands: ['B5', 'B4', 'B2']}
    },
    'False Color 3 (B4/B5/B3)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears red. Mangrove Detection',
      visParams: {gamma: 1.3, min: 0, max: 0.35, bands: ['B4', 'B5', 'B3']}
    }
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
      app.export.panel
    ],
    style: {width: '250px', padding: '8px'}
  });
 // Map.setCenter(107.0, -6.5, 7);
 Map.centerObject(OS_9Mar20_Balikpapan, 13); 
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();
// FUNGSI2
function KorAng(img) { // Koreksi Inc angle menjadi Gamma
  var VV_Corr = img.select('VV').subtract(img.select('angle').multiply(Math.PI/180.0).cos().
    log10().multiply(10.0)).rename('VV').toFloat();
    var VH_Corr = img.select('VH').subtract(img.select('angle').multiply(Math.PI/180.0).cos().
    log10().multiply(10.0)).rename('VH').toFloat() ;
    var VV_VH = VV_Corr.select('VV').subtract(VH_Corr.select('VH')).rename('VV-VH').toFloat();
    var VV_Int = VV_Corr.expression('10**(VV/10)',{VV : VV_Corr.select('VV')}).rename('VV_Int').toFloat();
    var VH_Int = VH_Corr.expression('10**(VH/10)',{VH : VH_Corr.select('VH')}).rename('VH_Int').toFloat();
 return VV_Corr.addBands(VH_Corr).addBands(VV_VH).addBands(VV_VH).addBands(VV_VH)
 .copyProperties(img, ["system:time_start"])
 ;
}
// Pilih LS8 SR (Surface Reflectance)
 function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000) // Reflektan dijadikan 0-1
  //  return image.updateMask(mask)  // Scaled Reflektan 0-10000
      .select("B[0-9]*") // Pilih Band Reflektan 1-7, and Suhu Brightness B10,B11 (dlm K, dikali 10)
    //  .copyProperties(image, ["system:time_start"])
      ;
}
function addBands_Idx(image){
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B7']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B5', 'B6']).rename('NDBI');
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))"+
  ":1.5*((NIR-RED)/(L/2+NIR+RED))"
    ,{NIR: image.select('B5'),RED: image.select('B4'),BLUE: image.select('B2'),L : 1}).rename('EVI');
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).toFloat(); 
}