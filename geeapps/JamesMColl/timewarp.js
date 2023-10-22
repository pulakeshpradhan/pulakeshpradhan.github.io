// https://code.earthengine.google.com/26d5887d1f17f8979f11a67e183b5c5e
// https://developers.google.com/earth-engine/datasets/catalog/modis?hl=en
// https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MCD43A4#bands
// https://edo.jrc.ec.europa.eu/documents/factsheets/factsheet_ndwi.pdf
// https://developers.google.com/earth-engine/datasets/catalog/USDA_NAIP_DOQQ?hl=en
var app = {};
/** Creates the app constants. */
app.createConstants = function() {
  // Constants 
  app.UserAOI = "Timewarp";
  // app.currentDate =  ee.String(ee.Date(new Date()).format("YYYY-MM-dd kk")).getInfo();
  // app.currentDateStart = ee.String(ee.Date(new Date()).advance(-2, 'month').format("YYYY-MM-dd kk")).getInfo();
  app.currentDate = '2020-08-01 01'; //ee.String(ee.Date.parse('YYYY-MM-dd kk','1992-08-01 01','UTC')).getInfo();
  app.currentDateStart = '2000-08-01 01';//ee.String(ee.Date.parse('YYYY-MM-dd kk','1982-08-01 01','UTC')).getInfo();
  app.RGB = 'RGB';
  app.NDWI = 'NDWI';
  app.MNDWI = 'MNDWI';
  app.QualityFlagMask = true;
  app.printStatements = false;
  app.currentIndex = 0;
  app.NumberOfImages;
  app.RawImages;
  app.FinalImages;
  app.processBounds;
  // Random Data and Structure Containers
  app.text = require('users/gena/packages:text');
  app.ANIMATEDimages = ee.List([]);
  app.HELPER_TEXT_STYLE = {
    // margin: '8px 0 -3px 8px',
    margin: "0 0 0px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'left',
    fontSize: '12px',
    color: 'gray'
  };
  // , style: {fontWeight: "normal", fontSize: "12px", maxWidth: "140px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'left'}
  app.MapBoxString = "Map Bounding Box (on click)";
  app.ETvis = {
    min:0,
    max:70,
    Palette:['ffffff', 'fcd163', '99b718', '66a000', '3e8601', '207401', '056201', '004c00', '011301']
  };
  // Animation
  app.timeout = null;
  app.play = false;
  app.utils = require('users/gena/packages:utils');
  app.text = require('users/gena/packages:text');
  app.textPlay = '▶';
  app.textPause = '⏸';
  app.palettes = require('users/gena/packages:palettes');
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  app.translatept = function(pt, x, y) {
    var x1 = ee.Number(pt.get(0)).add(ee.Number(x));
    var y1 = ee.Number(pt.get(1)).subtract(ee.Number(y));
    // return ee.Geometry.Point(ee.List([x1, y1]));
    // return ee.Algorithms.GeometryConstructors.Point(ee.List([x, y]));
    return ee.Algorithms.GeometryConstructors.Point(ee.List([x1, y1]));
  };
  app.annotate = function(images) {
    var VarSelectValue = app.appcontrols.CollectionViewSelect.getValue();
    var visparam;
    if(VarSelectValue == "RGB") {
      // visparam = {bands: ['R', 'G', 'B'], min: 0.0, max: 0.4, gamma:1.2};
      visparam = {bands: ['R', 'G', 'B'], min: 0.0, max: 0.9, gamma:1.1};
    } else if(VarSelectValue == "NDWI") {
      visparam = {bands: ['NDWI'], min: 0.0, max: 1.0, palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']};
    } else if(VarSelectValue == "MNDWI") {  
      visparam = {bands: ['MNDWI'], min: 0.0, max: 1.0, palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']};
    } 
    var geom = ee.Geometry.Rectangle(Map.getBounds());
    var geomList = ee.List(Map.getBounds());
    var x1 = geomList.get(0).getInfo();
    var x2 = geomList.get(2).getInfo();
    var xmax = ee.Number(Math.max(x1,x2));
    var xmin =ee.Number(Math.min(x1,x2));
    var y1 = geomList.get(1).getInfo();
    var y2 = geomList.get(3).getInfo();
    var ymax = ee.Number(Math.max(y1,y2));
    var ymin =ee.Number(Math.min(y1,y2));
    var upL = ee.Geometry.Point([Math.min(x1,x2),Math.max(y1,y2)]).coordinates();
    var center = Map.getCenter().coordinates();
    var scale = Map.getScale()*2;
    app.text = require('users/gena/packages:text');
    var xinterval = (xmax.subtract(xmin)).divide(10).divide(3);
    var yintervalbase = (ymax.subtract(ymin)).divide(10).divide(5);
    var yinterval = (ymax.subtract(ymin)).divide(10).divide(1.5);
    var y2interval = yinterval.multiply(1.8);
    return images.map(function(i) {
      // add edge around an image    
      var edge = ee.Image(0).toByte().paint(geom, 1, 2);
      edge = edge.mask(edge)
                 .visualize({palette:['cccc00'], opacity: 0.9});
      // define text properties
      var props = {textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2.5, outlineOpacity: 0.9};
      // var pos = app.translatept(center, 0.7, -0.4);
      var pos0 = app.translatept(upL, xinterval, yintervalbase);
      var s0 = ee.String('Platform: ').cat(ee.String(i.get('SPACECRAFT_ID')));
      var textsensor = app.text.draw(s0, pos0, scale, props);
      // var pos = app.translatept(center, 0.7, -0.4);
      var pos = app.translatept(upL, xinterval, yinterval);
      var s = ee.String('DATE: ').cat(ee.String(i.get('DATE_ACQUIRED')));
      var textDate = app.text.draw(s, pos, scale, props);
      var pos1 = app.translatept(upL, xinterval, y2interval);
      var s1 = ee.String('TIME: ').cat(ee.String(i.get('SCENE_CENTER_TIME')).slice(0, 5)).cat(" UTC");
      var textTime = app.text.draw(s1, pos1, scale, props);
      var image = i.visualize(visparam);
      return ee.ImageCollection([image, edge, textsensor, textDate, textTime])
        .mosaic()
        .clip(app.processBounds)
        .set({'name':ee.String(ee.Date(i.get('system:time_start')).format("YYYY-MM-dd"))}); // merge results
    });
  };
  app.processmapbounds = function() {
    app.animation.IndexSlider.setValue(0, false);
    app.processBounds = Map.getBounds(true);
    app.MODDef;
    var RADIX = 2;
    var bitStartCloudConfidence = 5;
    var bitEndCloudConfidence = 6;
    var bitStartShadowConfidence = 7;
    var bitEndShadowConfidence = 8;
    var cloudscorefiltervalue = parseInt(app.appcontrols.cloudscorefilter.getValue(), 10); 
    var startdatefiltervalue = ee.Date.parse('YYYY-MM-dd kk', app.appcontrols.startdatefilter.getValue()); 
    var enddatefiltervalue = ee.Date.parse('YYYY-MM-dd kk', app.appcontrols.enddatefilter.getValue());
    var imagelimitfiltervalue = parseInt(app.appcontrols.imagelimitfilter.getValue(), 10);
    var extractQABits = function (qaBand, bitStart, bitEnd) {
      var numBits = bitEnd - bitStart + 1;
      var qaBits = qaBand.rightShift(bitStart).mod(Math.pow(RADIX, numBits));
      //Map.addLayer(qaBits, {min:0, max:(Math.pow(RADIX, numBits)-1)}, 'qaBits');
      return qaBits;
    };
    var maskL8sr = function(image) {
      var image_qa = image.select('BQA');
      var qaBitsCloudConfidence = extractQABits(image_qa, bitStartCloudConfidence, bitEndCloudConfidence);
      // Test for clouds, based on the Cloud Confidence value.
      var testCloudConfidence = qaBitsCloudConfidence.gte(2);
      // Create a mask for the dual QA bit "Cloud Shadow Confidence".
      var qaBitsShadowConfidence = extractQABits(image_qa, bitStartShadowConfidence, bitEndShadowConfidence);
      // Test for shadows, based on the Cloud Shadow Confidence value.
      var testShadowConfidence = qaBitsShadowConfidence.gte(2);
      var maskComposite = (testCloudConfidence.or(testShadowConfidence)).not();
      return image.updateMask(maskComposite);
    };
    var cloudMaskL457 = function(image) {
      var qa = image.select('pixel_qa');
      // If the cloud bit (5) is set and the cloud confidence (7) is high
      // or the cloud shadow bit is set (3), then it's a bad pixel.
      var cloud = qa.bitwiseAnd(1 << 5)
                      .and(qa.bitwiseAnd(1 << 7))
                      .or(qa.bitwiseAnd(1 << 3));
      // Remove edge pixels that don't occur in all bands
      var mask2 = image.mask().reduce(ee.Reducer.min());
      return image.updateMask(cloud.not()).updateMask(mask2);
    };
    var runningCollecton = ee.ImageCollection([]);
    if(app.appcontrols.useLS8nl.getValue()) {
      var LS8data = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
                      .filterDate(startdatefiltervalue, enddatefiltervalue).filterBounds(app.processBounds)
                      .filterMetadata('CLOUD_COVER_LAND',"not_greater_than",cloudscorefiltervalue*0.01)
                      // .map(cloudMaskL457)
                      .select(['B4', 'B3', 'B2', 'B5'],["R","G","B", "NIR"]);
      runningCollecton = ee.ImageCollection(runningCollecton).merge(LS8data);
    }
    if(app.appcontrols.useLS7nl.getValue()) {
      var LS7data = ee.ImageCollection('LANDSAT/LE07/C01/T1_RT_TOA')
                      .filterDate(startdatefiltervalue, enddatefiltervalue).filterBounds(app.processBounds)
                      .filterMetadata('CLOUD_COVER_LAND',"not_greater_than",cloudscorefiltervalue)
                      // .map(cloudMaskL457)
                      .select(['B3', 'B2', 'B1', 'B4'],["R","G","B", "NIR"]);
      runningCollecton = ee.ImageCollection(runningCollecton).merge(LS7data);
    }
    if(app.appcontrols.useLS5nl.getValue()) {
      var LS5data = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA')
                      .filterDate(startdatefiltervalue, enddatefiltervalue).filterBounds(app.processBounds)
                      // .map(cloudMaskL457)
                      .select(['B3', 'B2', 'B1', 'B4'],["R","G","B", "NIR"]);
      runningCollecton = ee.ImageCollection(runningCollecton).merge(LS5data);
    }
    if(app.appcontrols.useLS4nl.getValue()) {
      var LS4data = ee.ImageCollection('LANDSAT/LT04/C01/T1_TOA')
                      .filterDate(startdatefiltervalue, enddatefiltervalue).filterBounds(app.processBounds)
                      // .map(cloudMaskL457)
                      .select(['B3', 'B2', 'B1', 'B4'],["R","G","B", "NIR"]);
      runningCollecton = ee.ImageCollection(runningCollecton).merge(LS4data);
    }
    if(app.appcontrols.useNAIPnl.getValue()) {
      var NAIPdates = ee.List(ee.FeatureCollection(ee.ImageCollection('USDA/NAIP/DOQQ')
                      .filterDate(startdatefiltervalue, enddatefiltervalue)
                      .filterBounds(app.processBounds))
                      .aggregate_array('system:time_start'))
                      .distinct();
      var NAIPdata = NAIPdates.map(function(imdates) {
        var imMos = ee.Image(ee.ImageCollection('USDA/NAIP/DOQQ')
                      .filterDate(ee.Date(imdates).advance(-2, 'day'), ee.Date(imdates).advance(2, 'day'))
                      .filterBounds(app.processBounds)
                      .mosaic())
        return imMos.divide(255)
                .addBands(ee.Image(1))
                  .set('SPACECRAFT_ID',"NAIP")
                  .set('DATE_ACQUIRED',ee.Date(imdates).format("YYYY_MM_dd"))
                  .set('SCENE_CENTER_TIME',"")
                  .set('system:time_start',imdates)
                  .select(['R', 'G', 'B',"constant"],["R","G","B", "NIR"]);
                      });
      // });                         
      runningCollecton = ee.ImageCollection(runningCollecton).merge(NAIPdata);
    }
    app.RawImages = ee.ImageCollection(runningCollecton)
                      .map(function(image){return image.addBands(image.normalizedDifference(['NIR', 'R']).select(['nd'],['NDWI']))})
                      .map(function(image){return image.addBands(image.normalizedDifference(['NIR', 'G']).select(['nd'],['MNDWI']))})
                      .sort('system:time_start')
                      .limit(imagelimitfiltervalue);
                      // .reverse();
    app.NumberOfImages = app.RawImages.size().getInfo();
    print(app.RawImages)
    app.animation.IndexSlider.setMax(app.NumberOfImages);
    app.FinalImages = app.annotate(app.RawImages);
    app.addImagesToMap(app.FinalImages);
  };
  app.addImagesToMap = function(ImageCollectionToMap) {
    app.WipeMap();
    // Map.layers().insert(0, ui.Map.Layer({eeObject: ee.Image(1)}));
    var collectionSize = ImageCollectionToMap.size().getInfo();
    // print(collectionSize)
    var imagelist = ImageCollectionToMap.toList(collectionSize).reverse();
    // print(imagelist)
    // Map.layers().insert(0, ui.Map.Layer({eeObject: ee.Image(imagelist.get(1))}));
    // print(collectionSize)
    for(var i = 0; i <= collectionSize-1; i++) {
      // print(collectionSize)
      var namestring = ee.String(ee.Image(imagelist.get(i)).get('name')).getInfo();
      Map.layers().insert(0, ui.Map.Layer({eeObject: ee.Image(imagelist.get(i)), opacity:0}).setName(namestring));
      // Map.layers().insert(0, ui.Map.Layer({eeObject: ee.Image(imagelist.get(1))}));
    }
    Map.layers().get(0).setOpacity(1);
    app.animation.IndexSlider.setDisabled(false);
    // return true;
  };
  app.WipeMap = function() {
    Map.clear();    //Would clear but that removes onclick event as well...
    // for(var i = 0; i <= 500; i++) {
    //   app.MainMap.layers().remove(app.MainMap.layers().get(i));
    // }
    // app.MainMap.style().set({cursor: "crosshair"});
    // app.MainMap.onClick(app.MapClickEvent);
  };
  app.nextFrame = function() {
    var index = app.currentIndex + 1;
    if(index > app.NumberOfImages-1) {
      index = 0;
    }
    app.animation.IndexSlider.setValue(index);
    if(app.play) {ui.util.setTimeout(app.nextFrame, app.timeStep);}
  };
  app.showLayer = function(index) {
    var opValue = 1;
    Map.layers().get(app.currentIndex).setOpacity(0);
    Map.layers().get(index).setOpacity(opValue);
    app.currentIndex = index;
    app.animation.IndexSliderImageName.setValue(Map.layers().get(index).getName());
    return true;
  };
  app.delay = function(millis, callback) {
    var before = Date.now();
    function loop() {
      ee.Number(Date.now()).evaluate(function(now) { 
        if(now < before + millis) {
          loop();
        } else {
          callback();
        }
      });
    }
    loop();
  };
  app.setTimeout = function(interval, action) {
    app.delay(interval, function() {
      action();
      app.setTimeout(interval, action);
    });
  };
  app.clearResults = function() {
    app.selectedPoints = [];
    // remove the selectedFeatures Item
    app.MainMap.layers().remove(app.MainMap.layers().get(app.MainMap.layers().length()));
    var instructionsLabel = ui.Label("Awaiting input");
    app.TimeseriesResults.widgets().reset([instructionsLabel]);
  };
  app.onPlayPause = function() {
    app.timeStep = parseInt(app.animation.TimestepValue.getValue(),10);
    if(!app.play && !app.timeout) {
      app.timeout = ui.util.setTimeout(app.nextFrame, app.timeStep);
      app.play = true;
      app.animation.buttonPlayPause.setLabel(app.textPause);
    } else {
      ui.util.clearTimeout(app.timeout);
      app.timeout = null;
      app.play = false;
      app.animation.buttonPlayPause.setLabel(app.textPlay);
    }
  };
  app.ExportImage = function() {
    // index
    Export.image.toDrive({
      image: ee.Image(app.MainMap.layers().get(index).getEeObject()),//.select(stringSeperator),
      region: app.myPointPoly,
      description: app.USLegend.NameLabel.getValue()
    });
  };
  app.ExportVideo = function() {
    var fps = app.timeStep/1000;
    Export.video.toDrive({
      collection: app.FinalImages, 
      description: "timewarpExport",
      framesPerSecond: fps, 
      // dimensions: 1280, 
      region:app.processBounds, 
      scale: 30, 
      maxPixels: 1e13 
    });
  };
};
/** Creates the UI panels. */
app.createPanels = function() {
  app.appcontrols = {
    AOITitle: ui.Label({value: app.UserAOI, style: {fontWeight: "bold", fontSize: "18px", margin: "0 0 4px 0", padding: "0"}}),
    AOIdefine: ui.Button({label: "Process map bounds", onClick: app.processmapbounds, disabled:false}),
    startdatefilterlabel: ui.Label('Start date (YYYY-MM-DD HH UTC):',{fontWeight: "normal", fontSize: "12px", margin: "12px 0px 0px 0px", padding: "0", color: 'gray'}),
    startdatefilter: ui.Textbox({placeholder: 'YYYY-MM-DD HH', value: app.currentDateStart, style:{maxWidth:'110px'}}),
    enddatefilterlabel: ui.Label('End date (YYYY-MM-DD HH UTC):', {fontWeight: "normal", fontSize: "12px", margin: "12px 0px 0px 0px", padding: "0", color: 'gray'}),
    enddatefilter: ui.Textbox({placeholder: 'YYYY-MM-DD HH', value: app.currentDate, style:{maxWidth:'116px'}}),
    cloudscorefilterlabel: ui.Label('Cloud score filter (0-100):', {fontWeight: "normal", fontSize: "12px", margin: "12px 0px 0px 0px", padding: "0", color: 'gray'}),
    cloudscorefilter: ui.Textbox({placeholder: '0-100', value: '5', style:{maxWidth:'158px'}}),
    imagelimitfilterlabel: ui.Label('Image limit (for performance):', {fontWeight: "normal", fontSize: "12px", margin: "12px 0px 0px 0px", padding: "0", color: 'gray'}),
    imagelimitfilter: ui.Textbox({placeholder:'##', value:'24', style:{maxWidth:'133px'}}),
    CollectionViewSelect: ui.Select({items: [app.RGB, app.NDWI, app.MNDWI], value: app.RGB}),
    filtercloudypixels: ui.Checkbox({label: 'filter cloudy pixels when possible', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useLS4nl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useLS5nl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: true}),
    useLS7nl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useLS8nl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: true}),
    useNAIPnl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useMODanl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useMODtnl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useSENT2nl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false}),
    useSENT3nl: ui.Checkbox({label: '', style: {fontWeight: "normal", fontSize: "10px", padding: "0"}, value: false})
  };
  app.animation = {
    buttonPlayPause: ui.Button({label: app.textPlay, onClick: app.onPlayPause}),
    IndexSliderTitle: ui.Label({value: "Index:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    IndexSlider: ui.Slider({min: 0, max: 20, step: 1, disabled:true, style: {stretch: 'horizontal'}}),
    IndexSliderImageName: ui.Label({value: "Blank image", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    TimestepValueTitle: ui.Label("Timestep (ms):", {fontWeight: "normal", fontSize: "12px", margin: "12px 0px 0px 0px", padding: "0", color: 'gray'}),
    TimestepValue: ui.Textbox({placeholder:"##", value: "1000", style:{maxWidth:'80px'}}),
    OpSliderTitle: ui.Label({value: "Opacity:", style: {fontWeight: "normal", fontSize: "12x", margin: "0 0 4px 0", padding: "0"}}),
    OpSlider: ui.Slider({min: 0, max: 1, value: 1, step: 0.1, style: {stretch: 'horizontal'}}),
    buttonExportTile: ui.Button({label: "Export Raster", onClick: app.ExportImage}),
    buttonExportVideo: ui.Button({label: "Export Video", onClick: app.ExportVideo})
  };
  app.animation.IndexSlider.onSlide(app.showLayer);
  app.helper = {
    ls4panel: ui.Panel([
      ui.Label({value: "Landsat 4 (08/1982 - 12/1992)", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }).setUrl("https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LT04_C01_T1_TOA"),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    ls5panel: ui.Panel([
      ui.Label({value: "Landsat 5 (01/1984 - 05/2012)", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }).setUrl("https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LT05_C01_T2_TOA"),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    ls7panel: ui.Panel([
      ui.Label({value: "Landsat 7 (01/1999 - present)", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }).setUrl("https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LE07_C01_T1_RT_TOA"),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    ls8panel: ui.Panel([
      ui.Label({value: "Landsat 8 (04/2013 - present)", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }).setUrl("https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C01_T1_RT_TOA"),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    NAIPpanel: ui.Panel([
      ui.Label({value: "NAIP (01/2003 - 01/2019)", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }).setUrl("https://developers.google.com/earth-engine/datasets/catalog/USDA_NAIP_DOQQ"),
      ui.Label({value: "~yearly return, 1m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    MODapanel: ui.Panel([
      ui.Label({value: "MODIS Aqua", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    MODtpanel: ui.Panel([
      ui.Label({value: "MODIS Terra", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    sent2panel: ui.Panel([
      ui.Label({value: "Sentinal 2", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical')),
    sent3panel: ui.Panel([
      ui.Label({value: "Sentinal 3", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 6px 0px 0px", padding: "0", textAlign:'justify'} }),
      ui.Label({value: "~2 day lag, ~16 day return, 30m pixel", style: {fontWeight: "normal", fontSize: "10px", margin: "0px 0px 0px 0px", padding: "0"} })
    ], ui.Panel.Layout.flow('vertical'))
  };
  app.controlpanel = ui.Panel({
    widgets: [
      ui.Panel([
        ui.Label({
        value: "Timewarp", style: {fontWeight: "bold", fontSize: "22px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'justify'}
        }), 
        ui.Label({
          value: "A GEE enabled rapid observation and timelapse application.  This will look and render best at full screen (>1300 px).  All credit to the phenomenal GEE team for enabling this platform and the amazing things it does.", style: {fontWeight: "normal", fontSize: "12px", maxWidth: "180px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'left'}
        }),
        ui.Label({
          value: "See the video for usage tips.", style: {fontWeight: "normal", fontSize: "14px", maxWidth: "180px", margin: "0 0 4px 0", padding: "0"} }).setUrl("https://www.hydroshare.org/resource/7f43d1ff46d4403495427c59c0e1d790/")
      ], ui.Panel.Layout.flow('vertical')),
      ui.Panel([
        ui.Panel([app.appcontrols.startdatefilterlabel, app.appcontrols.startdatefilter], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.appcontrols.enddatefilterlabel, app.appcontrols.enddatefilter], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.appcontrols.cloudscorefilterlabel, app.appcontrols.cloudscorefilter], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.appcontrols.imagelimitfilterlabel, app.appcontrols.imagelimitfilter], ui.Panel.Layout.flow('horizontal'))
      ], ui.Panel.Layout.flow('vertical'), {padding: "2px 3px 2px 3px"}),
      ui.Panel([
        ui.Panel([
          app.appcontrols.useLS4nl,
          app.helper.ls4panel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useLS5nl,
          app.helper.ls5panel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useLS7nl,
          app.helper.ls7panel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useLS8nl,
          app.helper.ls8panel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useNAIPnl,
          app.helper.NAIPpanel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"})  
      ], ui.Panel.Layout.flow('vertical')),
      ui.Panel([
        ui.Panel([
          app.appcontrols.useMODanl,
          app.helper.MODapanel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useMODtnl,
          app.helper.MODtpanel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useSENT2nl,
          app.helper.sent2panel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"}),
        ui.Panel([
          app.appcontrols.useSENT3nl,
          app.helper.sent3panel
          ], ui.Panel.Layout.flow('horizontal'), {padding: "3px 3px 3px 0px"})
      ], ui.Panel.Layout.flow('vertical')),
      ui.Panel([
        app.appcontrols.filtercloudypixels,
        app.appcontrols.AOIdefine,
        ui.Panel([app.animation.buttonPlayPause,app.animation.IndexSliderImageName], ui.Panel.Layout.flow('horizontal')),
        app.animation.IndexSlider
      ], ui.Panel.Layout.flow('vertical'), {stretch:'horizontal', padding: "5px 4px 4px 4px"}),
      ui.Panel([
        ui.Panel([
          app.appcontrols.CollectionViewSelect,
          ui.Panel([app.animation.TimestepValueTitle,app.animation.TimestepValue], ui.Panel.Layout.flow('vertical'))
          ], ui.Panel.Layout.flow('horizontal'), {position:'bottom-center'}),
        app.animation.buttonExportVideo, 
        app.animation.buttonExportTile], ui.Panel.Layout.flow('vertical'),{padding: "5px 4px 4px 4px"})
    ], 
    layout: ui.Panel.Layout.flow("horizontal"), 
    style: {padding: "8px 15px"} 
  });
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  // app.MainMap = ui.Map();
  // app.MainMap.onTileLoaded(app.processmapbounds());
  // app.MainMap.style().set({cursor: "crosshair"});
  // app.MainMap.setCenter(-98.4771996, 45.4716824, 13);
  ui.root.setLayout(ui.Panel.Layout.flow("vertical"));
  // ui.root.insert(0, app.MainMap);                            
  ui.root.insert(1, app.controlpanel);
};
// Map.setControlVisibility({drawingToolsControl:false});
// Map.layers().insert(0, ui.Map.Layer({eeObject: ee.Image(1), opacity:0}));
// Map.setCenter(-98.4771996, 45.4716824, 13);  // Aberdabber, SD
Map.setCenter(-131.52291933080247,55.11876779551539,13); // HERS Kelly lake
// Map.setCenter(-95.26304428148906,38.96057139570539, 13);  // LFK, 
// -98.61144042283769,34.13298837880668
// ui.root.widgets().reset();
app.boot();
app.processmapbounds();