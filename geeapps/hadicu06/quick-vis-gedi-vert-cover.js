/**
 * Version 0.1
 *  
 * /
/*
--------------------------
About GEDI L2B data, a first look:
--------------------------
User Guide: https://lpdaac.usgs.gov/documents/986/GEDI02_UserGuide_V2.pdf
Data variables include:
 - "cover" 
 - "cover_z0", ... , "cover_z29": 
       Cumulative canopy cover from height (z) to ground (z=0) with a vertical step size of dZ, where cover(z > z_max) = 0;
       Cumulative canopy cover from z=H to z=0, where cover_z(H)=0
 - "pai", "pai_z0", ..., "pai_z29"
 - "pavd_z0", ..., "pavd_z29"
 - "pgap_theta"
Quality flags:
 - "l2b_quality_flag" 
 - "degrade_flag"
 - "sensitivity"
 - "algorithmrun_flag" 
 - "beam" 
    I guess:
      -------  ------
      Decimal: Binary
      -------  ------
      0: BEAM0000 is a Coverage beam
      1: BEAM0001 is a Coverage beam
      2: BEAM0010 is a Coverage beam
      3: BEAM0011 is a Coverage beam
      5: BEAM0101 is a Full power beam
      6: BEAM0110 is a Full power beam
      8: BEAM1000 is a Full power beam
      11: BEAM1011 is a Full power beam
 - "selected_l2a_algorithm"
 - "selected_rg_algorithm"
Potentially useful but not included in rasterized L2B collection (but can maybe link to L2A collection based on "shot_number"):
 - "dz": Vertical step size of foliage profile (m)  <- is it always 5m ?
 - "maxheight_cuttoff": The maximum height above ground value used for foliage profile calculation
 - "pft_class"
 - "region_class"
*/
// var gedi_col_L2A = ee.ImageCollection("LARSE/GEDI/GEDI02_A_002_MONTHLY")     // L2A
var gedi_col_L2B = ee.ImageCollection("LARSE/GEDI/GEDI02_B_002_MONTHLY");        // L2B
///////////////  Map panel
var app = {};
app.mapPanel = ui.Map()
app.mapPanel.setOptions('HYBRID')
app.mapPanel.setControlVisibility({zoomControl:true, layerList:false})
ui.root.clear()
ui.root.add(app.mapPanel)
////////////////////// Text widget: Link to how to use the app
app.info = ui.Label("How to use the app (v0.1)");
app.info.setUrl("https://www.loom.com/share/9a3c17195aeb452bbd594a7838d251fe");
app.info.style().set({
     position: 'top-center',
     fontSize: '18px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 60
});
app.mapPanel.add(app.info);
////////////////////// Text widget: Link to data catalog
app.dataInfo = ui.Label("GEDI L2B Raster Canopy Cover Vertical Profile Metrics (Version 2)");
app.dataInfo.setUrl("https://developers.google.com/earth-engine/datasets/catalog/LARSE_GEDI_GEDI02_B_002_MONTHLY");
app.dataInfo.style().set({
     position: 'bottom-right',
     fontSize: '12px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 60
});
app.mapPanel.add(app.dataInfo);
////////////////////// Text widget: Link to Earth Engine Javascript script
app.codeInfo = ui.Label("Code link (warning: very prelim :-))");
app.codeInfo.setUrl("https://code.earthengine.google.com/4d5257fbfb8dab192b0e5966de4c9307");  // v0.1
app.codeInfo.style().set({
     position: 'bottom-right',
     fontSize: '12px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 60
});
app.mapPanel.add(app.codeInfo);
/////////////// Chart widget
app.chartPanel = ui.Panel();
app.chartPanel.style().set({
    position: 'bottom-left',
    height: '250px',
    width: '400px',
})
// Add the panel to the ui.root.
app.mapPanel.add(app.chartPanel)
////////////////////// Text widget: cover_zi 
app.coverziInfo = ui.Label('cover_zi : "Cumulative canopy cover from height (z) to ground (z=0) with a vertical step size of dZ, where cover(z > z_max) = 0"; dz = 5m (always?)');
app.coverziInfo.style().set({
     position: 'bottom-left',
     fontSize: '12px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 60
});
app.mapPanel.add(app.coverziInfo);
////////////////////// Text widget: Link to L2B data dictionary for exact data variables definition
app.dataDict = ui.Label("L2B Data Dictionary");
app.dataDict.setUrl("https://lpdaac.usgs.gov/documents/980/gedi_l2b_dictionary_P003_v2.html");
app.dataDict.style().set({
     position: 'bottom-left',
     fontSize: '14px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 60
});
app.mapPanel.add(app.dataDict);
/////////////// Drawing tools
app.mapPanel.drawingTools().setShown(true)
app.mapPanel.drawingTools().setDrawModes(['polygon']);   
/////////////// Button to reset i.e. clear map layers and drawing tool layers
app.resetButton = ui.Button({
            label:'Clear geometry',
           });
app.resetButton.style().set({
     position: 'bottom-center',
     fontSize: '18.5px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 60
});
app.mapPanel.add(app.resetButton);
app.resetButton.onClick(function(){
  app.mapPanel.drawingTools().clear(); 
  var drawingTools = app.mapPanel.drawingTools(); 
  drawingTools.setDrawModes(['polygon']);   
})
/////////////// Button to load GEDI data with the map viewport as bounding box
app.loadButton = ui.Button({
            label:'Load and QA-filter GEDI L2B data',
           });
app.loadButton.style().set({
     position: 'top-center',
     fontSize: '18.5px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 120
});
app.mapPanel.add(app.loadButton);
app.loadButton.onClick(function(){
  var fc = app.mapPanel.getBounds(true);
  // Get GEDI data
  // gedi_col_L2A = gedi_col_L2A     // L2A
  //                .filterBounds(fc);
  gedi_col_L2B = gedi_col_L2B
                     .filterBounds(fc);
  // Apply QA to GEDI
  // var gedi_col_L2A_filt = gedi_col_L2A.map(filterGediImageL2A);              // L2A
  var gedi_col_L2B_filt = gedi_col_L2B.map(filterGediImageL2B);
  // Filter to summer months (just an example fixed seasonal window so same phenology across years; best to let varied per-pixel e.g. based on MODIS phenology product)
  // var gedi_col_L2A_filt_northernSummer = gedi_col_L2A_filt.filter(ee.Filter.inList('month', [6,7,8]));       // L2A
  var gedi_col_L2B_filt_northernSummer = gedi_col_L2B_filt.filter(ee.Filter.inList('month', [6,7,8]));
  // Aggregate monthly GEDI data into all-time median 
  // var regex_rh = "rh.*";             // L2A
  // var gedi_L2A_filt_northernSummer_median = gedi_col_L2A_filt_northernSummer.select(regex_rh).median();    // L2A
  var regex_cover = "cover_z.*";
  var gedi_L2B_filt_northernSummer_median = gedi_col_L2B_filt_northernSummer.select(regex_cover).median();   
  var gedi_L2B_filt_northernSummer_median_COVER = gedi_col_L2B_filt_northernSummer.select(["cover"]).median();   
  //// DISPLAY GEDI FOOTPRINTS
  app.mapPanel.layers().reset()
  app.mapPanel.layers().add(ui.Map.Layer(gedi_L2B_filt_northernSummer_median_COVER, {min:0, max:1, palette:'yellow,green,cyan'}, "total cover (fraction)"));
})
/////////////// Button to create chart 
app.chartButton = ui.Button({
            label:'Plot vertical profile of cover',
           });
app.chartButton.style().set({
     position: 'bottom-center',
     fontSize: '18.5px', margin: '6px 0 4px 0', // 18.5px
     fontWeight: 'bold',
     width: 120
});
app.mapPanel.add(app.chartButton);
app.chartButton.onClick(function(){
  var layer = app.mapPanel.drawingTools().layers().get(0);
  var fc = ee.FeatureCollection(layer.getEeObject());
  // Get and filterBound GEDI data to the polygon area
  // gedi_col_L2A = gedi_col_L2A    // L2A
  //                .filterBounds(fc);
  gedi_col_L2B = gedi_col_L2B
                 .filterBounds(fc);
  // Apply QA to GEDI
  // var gedi_col_L2A_filt = gedi_col_L2A.map(filterGediImageL2A);                // L2A
  var gedi_col_L2B_filt = gedi_col_L2B.map(filterGediImageL2B);
  // Filter to summer months 
  // var gedi_col_L2A_filt_northernSummer = gedi_col_L2A_filt.filter(ee.Filter.inList('month', [6,7,8]));     // L2A
  var gedi_col_L2B_filt_northernSummer = gedi_col_L2B_filt.filter(ee.Filter.inList('month', [6,7,8]));
  // Aggregate monthly GEDI data into all-time median 
  // var regex_rh = "rh.*";       // L2A
  // var gedi_L2A_filt_northernSummer_median = gedi_col_L2A_filt_northernSummer.select(regex_rh).median();     // L2A   
  var regex_cover = "cover_z.*";
  var gedi_L2B_filt_northernSummer_median = gedi_col_L2B_filt_northernSummer.select(regex_cover).median();   
  var gedi_L2B_filt_northernSummer_median_COVER = gedi_col_L2B_filt_northernSummer.select(["cover"]).median();   
  ////// Format data for chart API
  var selZ = ee.List.sequence(0,14).map(function(n){return ee.String("cover_z").cat(ee.Number(n).format("%.0f")) });
  var gedi_L2B_filt_northernSummer_median_selZ = gedi_L2B_filt_northernSummer_median.select(selZ)
  var res_L2B_pixel_medianReduc = gedi_L2B_filt_northernSummer_median_selZ.reduceRegion({
    reducer: ee.Reducer.median(), 
    geometry: fc, 
    scale: 25, 
    maxPixels: 1e12,
    tileScale: 8
  });
  // print("res_L2B_pixel_medianReduc", res_L2B_pixel_medianReduc)  // debug
  var res_L2B_fc = ee.Dictionary(res_L2B_pixel_medianReduc).map(objToFc_coverz);
  // print("res_L2B_fc", res_L2B_fc); // debug
  res_L2B_fc = ee.FeatureCollection(res_L2B_fc.values());
  /// cover = 0 set to null for plotting
  res_L2B_fc = res_L2B_fc.map(function(ft){
    return ee.Feature(ft).set('cover_z_val_null', ee.Algorithms.If(ee.Feature(ft).getNumber("cover_z_val").gt(0), ee.Feature(ft).getNumber("cover_z_val")));
  });
  res_L2B_fc = res_L2B_fc.select(["z_number", "cover_z_val_null"])
  // MAKE THE CHART
  var chart =
    ui.Chart.feature
        .byFeature({
          features: res_L2B_fc,
          xProperty: 'cover_z_val_null',
        })
        .setChartType('ScatterChart')
        .setOptions({
          title: 'cover_zi: "Cumulative canopy cover from height (z) to ground (z=0) with a vertical step size of dZ, where cover(z > z_max) = 0; dz = 5m (always?)"',
          hAxis:
              {title: 'cover_zi (fraction)', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'i-th (dz = 5m)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineSize: 0,
          pointSize: 4
        });
  // Insert the chart widget into the panel          
  app.chartPanel.widgets().set(0, chart);
})
///=======================================================================================
/////////////////////// Helper functions called above
// function filterGediImageL2A(img){                                       // L2A
//   var quality_mask = img.select('quality_flag').eq(1);
//   var degrade_mask = img.select("degrade_flag").eq(0);
//   var sensitivity_mask = (img.select("pft_class").eq(2).and(img.select('sensitivity').gt(0.98))).or(
//     img.select("pft_class").neq(2).and(img.select('sensitivity').gt(0.95)));
//   var leafOffOn_mask = img.select("leaf_off_flag").eq(0);
//   var beamMask = img.select('beam').remap([5, 6, 8, 11], [1, 1, 1, 1]); // only "full power" beam
//   return img.updateMask(quality_mask)
//             .updateMask(degrade_mask)
//             .updateMask(sensitivity_mask)
//             .updateMask(leafOffOn_mask)
//             .updateMask(beamMask)
//             .copyProperties(img, img.propertyNames());
// }
function filterGediImageL2B(img){  
  var quality_mask = img.select('l2b_quality_flag').neq(0); 
  var degrade_mask = img.select("degrade_flag").lt(1);
  /// pft = 2 i.e. Evergreen Broadleaf Tree
  // var sensitivity_mask = (img.select("pft_class").eq(2).and(img.select('sensitivity').gt(0.98))).or(
  //   img.select("pft_class").neq(2).and(img.select('sensitivity').gt(0.95)));
  // no "pft_class" property in the rasterized L2B collection, maybe need to link to L2A based on "shot_number"
  var sensitivity_mask = img.select('sensitivity').gt(0.98); 
  // var leafOffOn_mask = img.select("leaf_off_flag").eq(0);
  // no "leaf_off_flag" property in the rasterized L2B collection, maybe need to link to L2A based on "shot_number"
  var beamMask = img.select('beam').remap([5, 6, 8, 11], [1, 1, 1, 1]); // only "full power" beam
  return img.updateMask(quality_mask)
            .updateMask(degrade_mask)
            .updateMask(sensitivity_mask)
            // .updateMask(leafOffOn_mask)
            .updateMask(beamMask)
            .copyProperties(img, img.propertyNames());
}
function objToFc_coverz(objKey, objVal) {
  var z_number_str = ee.String(objKey).slice(7);
  var z_number = ee.Number.parse(z_number_str);
  var cover_z_val = ee.Number(objVal);
  return ee.Feature(null, {'z_number': z_number, 'cover_z_val': cover_z_val});
}