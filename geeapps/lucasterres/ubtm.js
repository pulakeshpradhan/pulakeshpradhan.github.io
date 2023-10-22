var coastaldem = ui.import && ui.import("coastaldem", "image", {
      "id": "users/lucasterres/coastaldem_mosaic"
    }) || ee.Image("users/lucasterres/coastaldem_mosaic"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -52.34502064733719,
                -32.09850044868
              ],
              [
                -52.34502064733719,
                -32.423660494788386
              ],
              [
                -51.96049916296219,
                -32.423660494788386
              ],
              [
                -51.96049916296219,
                -32.09850044868
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-52.34502064733719, -32.09850044868],
          [-52.34502064733719, -32.423660494788386],
          [-51.96049916296219, -32.423660494788386],
          [-51.96049916296219, -32.09850044868]]], null, false);
// Set up colors
Map.setCenter(-50.877, -31.3094, 7)
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
// Create download button panel
var downloadPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '200px',
  backgroundColor: colors.gray,
  position: 'top-right',
  shown: true
  },
});
var Panel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '200px',
  backgroundColor: colors.gray,
  position: 'top-left',
  shown: true
  },
});
// Add it to map
Map.add(downloadPanel)
Map.add(Panel2)
// Set up styles
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '20px',
  padding: '6px',
  color: '#616161',
  stretch: 'horizontal',
  //style: {position: 'top-left'},
  backgroundColor: colors.transparent,
};
// Add title to panel
var downloadTitle = ui.Label('Download Links', TITLE_STYLE);
var uislproject = ui.Textbox({
  value: 0.68,
  placeholder: 'Add number',
  style: {width: '50px'},
  onChange: function(value) {
    // set value with a dedicated method
    uislproject.setValue(value);
    return(value);
  }
});
  var TitleSLPROJ =
  ui.Label({
    value: 'Sea-level projection in meters',
    style: {fontSize: '12px', color: 'black'}
  });
    var TitleSLRSME =
  ui.Label({
    value: 'RSME of Sea-level Rise (m)',
    style: {fontSize: '12px', color: 'black'}
  });
   var TitleDEMRSME =
  ui.Label({
    value: 'Vertical Error of Digital Elevation/Terrain Model (DEM/DTM)',
    style: {fontSize: '12px', color: 'black'}
  });
var uislrsme = ui.Textbox({
  value: 0.40,
  placeholder: 'Add number',
  style: {width: '50px'},
  onChange: function(value) {
    // set value with a dedicated method
    uislrsme.setValue(value);
    return(value);
  }
});
var uidemrsme = ui.Textbox({
  value: 2.5,
  placeholder: 'Add number',
  style: {width: '50px'},
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
var aw3d30x = coastaldem
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
// Create download link once KML export is populated, set to shown:false
var urlGeom = ui.Label('Download Result', {shown: false});
downloadPanel.add(urlGeom);
// Download function
var exportData = function() {
  print("Exporting data...");
  //Set up download arguments
  var downloadArgsGeom = {scale: 30,
region: geometry,
 maxPixels: 30e8,
    format: 'TIFF'
  };
  // Run all imports that have been added to the script via user-digitization
  //print(Map.drawingTools().layers())
  // Handle user digitzed geometries
  //var features = []; // reset features to empty array
  if (Map.drawingTools().layers().length() > 0) {
    var features = Map.drawingTools().toFeatureCollection()
    var exportGeom = ee.Image(remap);
    urlGeom.setUrl(exportGeom.getDownloadURL(downloadArgsGeom));
    urlGeom.style().set({shown: true});
  }
}
// Add download button to panel
var exportDataButton = ui.Button('Download');
exportDataButton.onClick(exportData);
downloadPanel.add(exportDataButton);
var layer = ui.Map.Layer(remap,elevationVis); // Name the layer with the selected year
  // Add mosaic to a set layer so that a new layer overwrites the old one
Map.layers().set(0, layer);
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
var panelTitle = ui.Label('Uncertainty Bathtub Model - uBTM', TITLE_STYLE);
downloadPanel.add(downloadTitle);
Panel2.add(panelTitle).add(TitleSLPROJ).add(uislproject).add(TitleSLRSME).add(uislrsme).add(TitleDEMRSME).add(uidemrsme).add(button);