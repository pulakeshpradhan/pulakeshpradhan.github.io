var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 1,
        "palette": [
          "00ad1d",
          "61ff00",
          "d7ff00",
          "ffc800",
          "ff8100",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":1,"palette":["00ad1d","61ff00","d7ff00","ffc800","ff8100","ff0000"]},
    coastaldem2 = ui.import && ui.import("coastaldem2", "image", {
      "id": "users/lucasterres/coastaldem_mosaic"
    }) || ee.Image("users/lucasterres/coastaldem_mosaic"),
    coastaldem = ui.import && ui.import("coastaldem", "imageCollection", {
      "id": "JAXA/ALOS/AW3D30/V3_2"
    }) || ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
//Pathway (RCP) 4.5 is 0.46 (0.31 - 0.63(0.32)) and RCP 8.5 is 0.68 (0.50 - 0.90 (0.40))
//var aw3d30x = ee.Image('users/lucasterres/DTM_PC');
//var SEA_LEVEL_PROJECT = 2.4;
//var SEA_LEVEL_RSME = 1.1;
//var DEM_RSME = 4.1;
//var dataset = ee.Image('NOAA/NGDC/ETOPO1');
//var aw3d30x = dataset.select('bedrock');
// Define a boxcar or low-pass kernel.
//var boxcar = ee.Kernel.square({
// radius: 30, units: 'pixels', normalize: true
//});
// Smooth the image by convolving with the boxcar kernel.
//var aw3d30 = aw3d30x.convolve(boxcar);
// Create a map panel.
var mapPanel = ui.Map();
// Add a title
var title = 
  ui.Label({
    value: 'Uncertainty Bathtub Model (uBTM)', 
    style: {fontSize: '24px', color: 'black', fontWeight: 'bold'}
  });
var desc =
  ui.Label({
    value: 'The ubtm...',
    style: {fontSize: '14px', color: 'black'}
  });
// Create panel to hold the widgets
var toolPanel = ui.Panel({
  widgets: [title, desc],
  layout: 'flow', 
  style: {width: '25%'}
});
var uislproject = ui.Textbox({
  value: 0.68,
  placeholder: 'Enter longitude here...',
  style: {width: '50px'},
  onChange: function(value) {
    // set value with a dedicated method
    uislproject.setValue(value);
    return(value);
  }
});
  var TitleSLPROJ =
  ui.Label({
    value: 'RSME of Sea-level Rise',
    style: {fontSize: '12px', color: 'black'}
  });
    var TitleSLRSME =
  ui.Label({
    value: 'RSME of DEM',
    style: {fontSize: '12px', color: 'black'}
  });
   var TitleDEMRSME =
  ui.Label({
    value: 'RSME of DEM',
    style: {fontSize: '12px', color: 'black'}
  });
var uislrsme = ui.Textbox({
  value: 0.40,
  placeholder: 'Enter longitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    uislrsme.setValue(value);
    return(value);
  }
});
var uidemrsme = ui.Textbox({
  value: 2.5,
  placeholder: 'Enter longitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    uidemrsme.setValue(value);
    return(value);
  }
});
var button = ui.Button({
  label: 'Run',
  onClick: function() {
    // you don't have to convert it into EE objects since you are
    // working on the client side
    var SEA_LEVEL_PROJECT = parseFloat(uislproject.getValue());
    var SEA_LEVEL_RSME = parseFloat(uislrsme.getValue());  
    var DEM_RSME = parseFloat(uidemrsme.getValue());  
var aw3d30x = coastaldem2
var elevationVis = {
  min: 1,
  max: 100,
  palette: ['00ad1d', '61ff00', 'd7ff00', 'ffc800', 'ff8100','ff0000'],
};
// Define a boxcar or low-pass kernel.
var boxcar = ee.Kernel.circle({
 radius: 5, units: 'pixels', normalize: true
});
// Smooth the image by convolving with the boxcar kernel.
var aw3d30 = aw3d30x.convolve(boxcar);
var customRemap = function(image, lowerLimit, newValue) {
  var mask = image.gte(lowerLimit);
  return mask.where(mask, newValue);
};
////////////////////////////////////////////////////////////////
var SL_ERROR_POS = SEA_LEVEL_PROJECT + (SEA_LEVEL_RSME/2);
var SL_ERROR_NEG = SEA_LEVEL_PROJECT - (SEA_LEVEL_RSME/2);
var DEM_ERROR_APPLY = DEM_RSME/2;
//
//
//var ERRO_DEM_NEG = aw3d30.add(-DEM_ERROR_APPLY);
//var ERRO_DEM_POS = aw3d30.add(DEM_ERROR_APPLY);
var uplimit = (-DEM_ERROR_APPLY+SL_ERROR_POS);
var half = ((((DEM_ERROR_APPLY+SL_ERROR_NEG)-(-DEM_ERROR_APPLY+SL_ERROR_POS))/2)+(-DEM_ERROR_APPLY+SL_ERROR_POS)); 
var lowerlimit = DEM_ERROR_APPLY+SL_ERROR_NEG;
var halflower = (((half)-(lowerlimit))/2)+lowerlimit;
var halfup = (((uplimit)-(half))/2)+half;
var halfup_2 = (((uplimit)-(halfup))/2)+halfup;
var halflower_2 = (((halflower)-(lowerlimit))/2)+lowerlimit;
///////////////////////////////
var map0 = customRemap(aw3d30,uplimit ,1);
var map12_5 = customRemap(aw3d30,(((uplimit)-(halfup))/2)+halfup,10);
var map25 = customRemap(aw3d30,halfup,100);
var map37_5 = customRemap(aw3d30,(((halfup)-(half))/2)+half,150);
var map50 = customRemap(aw3d30,half,175);
var map62_5 = customRemap(aw3d30,(((half)-(halflower))/2)+halflower,207);
var map75 = customRemap(aw3d30,halflower,502);
var map87_5 = customRemap(aw3d30,(((halflower)-(lowerlimit))/2)+lowerlimit,1000);
var map100 = customRemap(aw3d30, lowerlimit,3000);
//var test = remaped100.d (9999);
var merge = map0.add(map12_5.add(map25.add(map37_5.add(map50.add(map62_5.add(map75.add(map87_5.add(map100))))))));
//var join = map0.Join.simples
var remap = merge.remap([5145,2145,1145,643,436,261,111,11,1],
   [0,12.5,25,37.5,50,62.5,75,87.5,100]);
var layer = ui.Map.Layer(remap,elevationVis); // Name the layer with the selected year
  // Add mosaic to a set layer so that a new layer overwrites the old one
mapPanel.layers().set(0, layer);
Export.image.toDrive({   
 image: remap,
 description: 'Download',
scale: 30,
region: geometry,
 maxPixels: 30e8,
});
//Map.addLayer(aw3d30, elevationVis, 'aw3d');
  }});
//var button2 = ui.Button({label: 'Run', onClick: ubtmrun});
var toolPanel = ui.Panel({
  widgets: [title, desc],
  layout: 'flow', 
  style: {width: '30%'}
});
toolPanel.add(TitleSLPROJ).add(uislproject).add(TitleSLRSME).add(uislrsme).add(TitleDEMRSME).add(uidemrsme).add(button);
  // Visualise mosaic  
  //  var layer2 = ui.Map.Layer(aw3d30,elevationVis)
//  mapPanel.layers().set(1, layer2);
// Remap values.
//r classrast = merge.divide(9).ceil();
//p.addLayer(classrast, elevationVis, 'teste');
//p.addLayer(map0, elevationVis, 'map0');
//p.addLayer(map12_5, elevationVis, 'map12_5');
//p.addLayer(map25, elevationVis, 'map25');
//p.addLayer(map37_5, elevationVis, 'map37_5');
//p.addLayer(map50, elevationVis, 'map50');
//p.addLayer(map62_5, elevationVis, 'map62_5');
//p.addLayer(map75, elevationVis, 'map75');
//p.addLayer(map87_5, elevationVis, 'map87_5');
//p.addLayer(map100, elevationVis, 'map100');
//Map.addLayer(aw3d30, elevationVis, 'aw3d');
//Map.addLayer(remap, elevationVis, 'FINAL');
//Export.image.toAsset({   
// image: remap,
// description: 'Final1_3PC',
// scale: 30,
// region: geometry,
// maxPixels: 30e8,
//});
// Replace the root with a SplitPanel that contains the tool panel and map panel
ui.root.clear();
ui.root.add(ui.SplitPanel(toolPanel, mapPanel));