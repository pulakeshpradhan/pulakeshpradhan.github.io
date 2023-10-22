// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'S1 Polarimetric descriptors',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you visualize/download dual-polarimetric descriptors (Hc, mc, Theta_c, DpRVIc and q) from Sentinel-1 GRD SAR data.'),
      ui.Label('Developed at'),ui.Label('MRSLab',{}, 'http://www.mrslab.in'),
      ui.Label('by Narayanarao B.',{},'https://narayana-rao.github.io'),
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2017-06-15'),
    endDate: ui.Textbox('YYYY-MM-DD', '2017-07-15'),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    }),
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
      app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel,
        // app.filters.tip
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Click "Apply filters" to recalulate for new extent and/or dates')
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
        // Refresh the map layear.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label,
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
var jet_cmap = [' #000080 ', ' #0000bd ', ' #0000fa ', ' #0022ff ', ' #0057ff ', ' #008dff ',
' #00c3ff ', ' #0ff8e8 ', ' #3affbc ', ' #66ff91 ', ' #91ff66 ', ' #bcff3a ', ' #e8ff0f ', ' #ffd500 ',
' #ffa400 ', ' #ff7200 ', ' #ff4000 ', ' #fa0e00 ', ' #bd0000 ', ' #800000 ',]
var flag = ee.Algorithms.IsEqual('Hc', app.vis.select.getValue())
print(flag);
var s = ee.Algorithms.If(flag, "this is true", "this is false");
// print(s);
var cmap = {min:0,max:1,palette:jet_cmap}
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
app.legendPanel = {
  // Create the color bar for the legend.
 colorBar : ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(cmap.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
}),
// Create a panel with three numbers for the legend.
// legendLabels : ui.Panel({
//   widgets: [
//     ui.Label(cmap.min, {margin: '4px 8px'}),
//     ui.Label(
//         (cmap.max / 2),
//         {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
//     ui.Label(cmap.max, {margin: '4px 8px'})
//   ],
//   layout: ui.Panel.Layout.flow('horizontal')
// }),
 legendLabels1 : ui.Panel({
  widgets: [
    ui.Label(0, {margin: '4px 8px'}),
    ui.Label(
        ('0.5'),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('1', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
}),
 legendLabels2 : ui.Panel({
  widgets: [
    ui.Label(0, {margin: '4px 8px'}),
    ui.Label(
        ('22.5'),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('45', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
}),
// legendTitle : ui.Label({
//   value: 'Map Legend: Hc',
//   style: {fontWeight: 'bold'}
// }),
}
// Add the legendPanel to the map.
app.legendPanel.panel = ui.Panel(
  {
  widgets: [
    // app.legendPanel.legendTitle, 
  app.legendPanel.legendLabels1,
  app.legendPanel.colorBar, 
  app.legendPanel.legendLabels2
  ],
  });
// water mask
var waterOcc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").select('occurrence'),
    jrc_data0 = ee.Image("JRC/GSW1_0/Metadata").select('total_obs').lte(0),
    waterOccFilled = waterOcc.unmask(0).max(jrc_data0),
    waterMask = waterOccFilled.lt(50);
waterMask = waterOcc;
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Export to Drive',
      // React to the button's click event.
      onClick: function() {
        // Select the full image id.
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // var image = ee.Image(imageId).select(visOption.visParams.bands).clip(ee.Geometry.Rectangle(Map.getBounds()));
        var image = ee.Image(imageId).clip(ee.Geometry.Rectangle(Map.getBounds()));
        var waterOcc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").select('occurrence'),
        jrc_data0 = ee.Image("JRC/GSW1_0/Metadata").select('total_obs').lte(0),
        waterOccFilled = waterOcc.unmask(0).max(jrc_data0),
        waterMask = waterOccFilled.lt(50);
        waterMask = waterOcc;
        var window_size=1.5;        
      var C22_mean = image.expression( '10 ** (VH / 10)', {'VH': image.select('VH')})
                  .reduceNeighborhood({
                    reducer: ee.Reducer.mean(),
                    kernel: ee.Kernel.square(window_size)
                    });
      var C11_mean  = image.expression( '10 ** (VV / 10)', {'VV': image.select('VV')})
                  .reduceNeighborhood({
                    reducer: ee.Reducer.mean(),
                    kernel: ee.Kernel.square(window_size)
                    });
    var C11_mean_db = C11_mean.log10().multiply(10);//Linear to dB conversion
    var C11_rc = C11_mean_db.expression('b(0)<-17?0:1'); // masking low dB returns (water)
    var span = C11_mean.add(C22_mean);
    var q = C22_mean.divide(C11_mean);
    var vmask = C11_mean.subtract(C22_mean);
    vmask = vmask.expression('b(0) >0? 1:0');
    q = q.expression('b(0) >1? 1:b(0)');
    // q = q.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    var mc = (C11_mean.subtract(C22_mean).abs()).divide(C11_mean.add(C22_mean));
    var theta_c = ((C11_mean.subtract(C22_mean).abs()).multiply(span).multiply(mc))
                        .divide((C11_mean.multiply(C22_mean)).add(span.pow(2).multiply(mc.pow(2))))
                        .atan();
    theta_c = theta_c.multiply(180).divide(Math.PI);
    var p1 = C11_mean.divide(C11_mean.add(C22_mean));
    var p2 = C22_mean.divide(C11_mean.add(C22_mean));
    var cnst = ee.Number(2);
    var Hp1 = p1.multiply((p1.log10()).divide(cnst.log10())).multiply(-1);
    var Hp2 = p2.multiply((p2.log10()).divide(cnst.log10())).multiply(-1);
    var Hc = Hp1.add(Hp2);
    var DpRVIc_n = q.multiply(q.add(ee.Number(3)));
    var DpRVIc_d = (q.add(ee.Number(1))).multiply(q.add(ee.Number(1)));
    var DpRVIc = DpRVIc_n.divide(DpRVIc_d)
    // var d_dpol_rc = d_dpol.expression('b(0) <0.5 ? 1 : b(0) < 0.7 ? 2 : 3');
    // var H_rc = H.expression('b(0) >0 && b(0)<0.3 ? 1 : b(0) > 0.3 && b(0) <0.5? 2 : b(0)>0.5&&b(0) < 0.7  ? 3 :b(0)>0.7 && b(0)<1.0 ? 4: 0');
    // var theta_DP_rc = theta_DP.expression('b(0)>0.0 && b(0) <15 ? 5 :  b(0)>15 &&  b(0)<30 ? 6 : b(0)>30 && b(0) < 45? 7 : 0');
    // var out = d_dpol_rc.multiply(theta_DP_rc).add(C22_rc);
    // var out_rc = out.expression('b(0) ==4 ? 1 : b(0) == 5 ? 2 : b(0) == 7 ? 3:b(0) == 8 ? 4:b(0) == 10 ? 5:b(0) == 14 ? 6:b(0) == 12 ? 7:b(0) == 15 ? 8:b(0) == 21 ? 9: 10');
    // var out = H_rc.multiply(theta_DP_rc).multiply(C11_rc);
    // var out_rc = out.expression('b(0) ==5 ? 1 : b(0) == 6 ? 2 : b(0) == 7 ? 3:b(0) == 10 ? 4:b(0) == 12 ? 5: b(0) == 14 ? 6:b(0) == 15 ? 7:b(0) == 18 ? 8:b(0) == 21 ? 9: b(0) == 20 ? 10: b(0) == 24 ? 11: b(0) == 28 ? 12 : 0');
    // var out_rc = out.expression('b(0) ==7 ? 1 : b(0) == 14 ? 2 : b(0) == 21 ? 3: b(0) == 20 ? 6: b(0) == 24 ? 5: b(0) == 28 ? 4 : 0');
    //Masked values
    m = (m.updateMask(vmask)).updateMask(C11_rc);
    H=(H.updateMask(vmask)).updateMask(C11_rc);
    theta_c=(theta_c.updateMask(vmask)).updateMask(C11_rc);
    DpRVIc=(DpRVIc.updateMask(vmask)).updateMask(C11_rc);
    out_rc=(out_rc.updateMask(vmask)).updateMask(C11_rc);
    ratio=(ratio.updateMask(vmask)).updateMask(C11_rc);
    //Masked values
    // mc=mc.multiply(waterMask).expression('b(0)==0?-9999:b(0)');
    // Hc=Hc.multiply(waterMask).expression('b(0)==0?-9999:b(0)');
    // theta_c = theta_c.multiply(waterMask).expression('b(0)==0?-9999:b(0)');
    // DpRVIc=DpRVIc.multiply(waterMask).expression('b(0)==0?-9999:b(0)');
    // prvi=prvi.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // rvi=rvi.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // out_rc=out_rc.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // ratio=ratio.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // Map.addLayer(m,{min:0,max:1},'m')
    //layerstacking
    Hc = Hc.select(['constant_mean'],['Hc']);
    mc = mc.select(['constant_mean'],['mc']);
    q = q.select(['constant_mean'],['q']);
    theta_c = theta_c.select(['constant_mean'],['theta_c']);
    DpRVIc = DpRVIc.select(['constant_mean'],['dprvi_c']);
    var img = image.addBands([
                                q.select('q'),
                                mc.select('mc'),
                                Hc.select('Hc'),
                                theta_c.select('theta_c'),
                                DpRVIc.select('dprvi_c'),
                                ]);
        // print('imageIdTrailer',imageIdTrailer)
        // Export the image to Drive.
        Export.image.toDrive({
          // ee.Geometry.Rectangle(Map.getBounds())
          // image: ee.Image(imageId).select(visOption.visParams.bands),
          // image: ee.Image(imageId).select(visOption.visParams.bands).clip(ee.Geometry.Rectangle(Map.getBounds())), //extract from 
          image:img.select(visOption.visParams.bands),
          description: 'S1_'+visOption.visParams.bands+'_'+ imageIdTrailer,
        });
      }
    }),
    button1: ui.Button({
      // Define a function to generate a download URL of the image for the
      // viewport region. 
      label:'Download',
      onClick: function() {
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // var image = ee.Image(imageId).select(visOption.visParams.bands).clip(ee.Geometry.Rectangle(Map.getBounds()));
        var image = ee.Image(imageId).clip(ee.Geometry.Rectangle(Map.getBounds()));
        var window_size=1.5;        
        var C22_mean = image.expression( '10 ** (VH / 10)', {'VH': image.select('VH')})
                  .reduceNeighborhood({
                    reducer: ee.Reducer.mean(),
                    kernel: ee.Kernel.square(window_size)
                    });
        var C11_mean  = image.expression( '10 ** (VV / 10)', {'VV': image.select('VV')})
                  .reduceNeighborhood({
                    reducer: ee.Reducer.mean(),
                    kernel: ee.Kernel.square(window_size)
                    });
        var C11_mean_db = C11_mean.log10().multiply(10);//Linear to dB conversion
        var C11_rc = C11_mean_db.expression('b(0)<-17?0:1'); // masking low dB returns (water)
        var span = C11_mean.add(C22_mean);
        var q = C22_mean.divide(C11_mean);
        var vmask = C11_mean.subtract(C22_mean);
        vmask = vmask.expression('b(0) >0? 1:0');
        q = q.expression('b(0)>1?1:b(0)');
        // q = q.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
      // q=q.updateMask(waterMask);
        var mc = (C11_mean.subtract(C22_mean).abs()).divide(C11_mean.add(C22_mean));
        var theta_c = ((C11_mean.subtract(C22_mean).abs()).multiply(span).multiply(mc))
                            .divide((C11_mean.multiply(C22_mean)).add(span.pow(2).multiply(mc.pow(2))))
                            .atan();
        theta_c = theta_c.multiply(180).divide(Math.PI);
        var p1 = C11_mean.divide(C11_mean.add(C22_mean));
        var p2 = C22_mean.divide(C11_mean.add(C22_mean));
        var cnst = ee.Number(2);
        var Hp1 = p1.multiply((p1.log10()).divide(cnst.log10())).multiply(-1);
        var Hp2 = p2.multiply((p2.log10()).divide(cnst.log10())).multiply(-1);
        var Hc = Hp1.add(Hp2);
        var DpRVIc_n = q.multiply(q.add(ee.Number(3)));
        var DpRVIc_d = (q.add(ee.Number(1))).multiply(q.add(ee.Number(1)));
        var DpRVIc = DpRVIc_n.divide(DpRVIc_d)
        //renaming
        Hc = Hc.select(['constant_mean'],['Hc']);
        mc = mc.select(['constant_mean'],['mc']);
        q = q.select(['constant_mean'],['q']);
        theta_c = theta_c.select(['constant_mean'],['theta_c']);
        DpRVIc = DpRVIc.select(['constant_mean'],['dprvi_c']);
        //Masked values
      //   mc = (mc).updateMask(waterMask);
      //   Hc=(Hc).updateMask(waterMask);
      // theta_c=(theta_c).updateMask(waterMask);
      // q=(q).updateMask(waterMask);
      // DpRVIc=(DpRVIc).updateMask(waterMask);
          m = (m.updateMask(vmask)).updateMask(C11_rc);
    H=(H.updateMask(vmask)).updateMask(C11_rc);
    theta_c=(theta_c.updateMask(vmask)).updateMask(C11_rc);
    DpRVIc=(DpRVIc.updateMask(vmask)).updateMask(C11_rc);
    out_rc=(out_rc.updateMask(vmask)).updateMask(C11_rc);
    ratio=(ratio.updateMask(vmask)).updateMask(C11_rc);
        //layer stack
        var img = image.addBands([
                                    q.select('q'),
                                    mc.select('mc'),
                                    Hc.select('Hc'),
                                    theta_c.select('theta_c'),
                                    DpRVIc.select('dprvi_c')
                                    ]);
        var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
        var downloadArgs = {
          name: 'dpd_'+ imageIdTrailer,
          crs: 'EPSG:4326',
          scale: 30,
          region: viewBounds.toGeoJSONString()
       };
      var url = img.getDownloadURL(downloadArgs); //Dowload all bands
      // var url = (img.select(visOption.visParams.bands)).getDownloadURL(downloadArgs);
       app.export.urlLabel.setUrl(url);
       app.export.urlLabel.style().set({shown: true});
      }
    }),
      // downloadButton: ui.Button('Download viewport', downloadImg),
      urlLabel: ui.Label('Download', {shown: false}),
};
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) Start an export', {fontWeight: 'bold'}),
      ui.Label('Click download button & wait till the download URL appears.'),
      ui.Label('In case download URL did not appear, reduce the map extent by zooming in'),
      // app.export.button, // Export to drive.
      app.export.button1, 
      // app.export.downloadButton,
      app.export.urlLabel,
      // ui.Label('Download', {shown: false}),
    ],
    style: app.SECTION_STYLE
  });
app.references = {
};
app.references.panel = ui.Panel({
      widgets: [
      ui.Label('5) References', {fontWeight: 'bold'}),
      ui.Label('Narayanarao Bhogapurapu, Subhadip Dey, Avik Bhattacharya, Dipankar Mandal, Juan Lopez-Sanchez, Heather McNairn, Carlos Lopez-Martinez and Y. S. Rao 2021'),
      ui.Label('“Dual-polarimetric descriptors from Sentinel-1 GRD SAR data for crop growth assessment”. ISPRS Journal of Photogrammetry and Remote Sensing. 20-35, 178.',{fontWeight: 'bold'}),
      ui.Label('doi: 10.1016/j.isprsjprs.2021.05.013',{},'https://doi.org/10.1016/j.isprsjprs.2021.05.013'),
      ui.Label('Narayanarao Bhogapurapu, Subhadip Dey, Dipankar Mandal, Avik Bhattacharya, L. Karthikeyan, Heather McNairn and Y. S. Rao 2022'),
      ui.Label('“Soil Moisture Retrieval Over Croplands Using dual-pol L-band GRD SAR Data”. Remote Sensing of Environment. Volume 271, 2022, Pages 112900, ISSN 0034-4257',{fontWeight: 'bold'}),
      ui.Label('doi: 10.1016/j.rse.2022.112900',{},'https://doi.org/10.1016/j.rse.2022.112900'),
      // ui.Label('In case download URL did not appear, reduce the map extent by zooming in'),
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
var window_size = 1.5;
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var filtered = ee.ImageCollection(app.COLLECTION_ID);
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
      filtered = filtered.filterBounds(Map.getCenter());
    }
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    // Get the list of computed ids.
    var computedIds = filtered
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId)
      var C22_mean = image.expression( '10 ** (VH / 10)', {'VH': image.select('VH')})
                  .reduceNeighborhood({
                    reducer: ee.Reducer.mean(),
                    kernel: ee.Kernel.square(window_size)
                    });
      var C11_mean  = image.expression( '10 ** (VV / 10)', {'VV': image.select('VV')})
                  .reduceNeighborhood({
                    reducer: ee.Reducer.mean(),
                    kernel: ee.Kernel.square(window_size)
                    });
    var C11_mean_db = C11_mean.log10().multiply(10);//Linear to dB conversion
    var C11_rc = C11_mean_db.expression('b(0)<-17?0:1'); // masking low dB returns (water)
    var span = C11_mean.add(C22_mean);
    var q = C22_mean.divide(C11_mean);
    var vmask = C11_mean.subtract(C22_mean);
    vmask = vmask.expression('b(0) >0? 1:0');
    q = q.expression('b(0)>1?1:b(0)');
    // q = q.multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    var mc = (C11_mean.subtract(C22_mean).abs()).divide(C11_mean.add(C22_mean));
    var theta_c = ((C11_mean.subtract(C22_mean).abs()).multiply(span).multiply(mc))
                        .divide((C11_mean.multiply(C22_mean)).add(span.pow(2).multiply(mc.pow(2))))
                        .atan();
    theta_c = theta_c.multiply(180).divide(Math.PI);
    var p1 = C11_mean.divide(C11_mean.add(C22_mean));
    var p2 = C22_mean.divide(C11_mean.add(C22_mean));
    var cnst = ee.Number(2);
    var Hp1 = p1.multiply((p1.log10()).divide(cnst.log10())).multiply(-1);
    var Hp2 = p2.multiply((p2.log10()).divide(cnst.log10())).multiply(-1);
    var Hc = Hp1.add(Hp2);
    var DpRVIc_n = q.multiply(q.add(ee.Number(3)));
    var DpRVIc_d = (q.add(ee.Number(1))).multiply(q.add(ee.Number(1)));
    var DpRVIc = DpRVIc_n.divide(DpRVIc_d);
    //Masked values
    // mc=mc.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // Hc=Hc.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // theta_c = theta_c.multiply(vmask).multiply(C11_rc).expression('b(0)==0?-9999:b(0)');
    // Map.addLayer(m,{min:0,max:1},'m')
    //layerstacking
    Hc = Hc.select(['constant_mean'],['Hc']);
    mc = mc.select(['constant_mean'],['mc']);
    q = q.select(['constant_mean'],['q']);
    theta_c = theta_c.select(['constant_mean'],['theta_c']);
    DpRVIc = DpRVIc.select(['constant_mean'],['dprvi_c']);
    //Masked values
      mc = (mc.updateMask(vmask)).updateMask(C11_rc);
      Hc=(Hc.updateMask(vmask)).updateMask(C11_rc);
      theta_c=(theta_c.updateMask(vmask)).updateMask(C11_rc);
      q=(q.updateMask(vmask)).updateMask(C11_rc);
      DpRVIc=(DpRVIc.updateMask(vmask)).updateMask(C11_rc);
    image = image.addBands([
                                q.select('q'),
                                mc.select('mc'),
                                Hc.select('Hc'),
                                theta_c.select('theta_c'),
                                DpRVIc.select('dprvi_c'),
                                ]);
      print(image);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  };
};
var jet_cmap = [' #000080 ', ' #0000bd ', ' #0000fa ', ' #0022ff ', ' #0057ff ', ' #008dff ',
' #00c3ff ', ' #0ff8e8 ', ' #3affbc ', ' #66ff91 ', ' #91ff66 ', ' #bcff3a ', ' #e8ff0f ', ' #ffd500 ',
' #ffa400 ', ' #ff7200 ', ' #ff4000 ', ' #fa0e00 ', ' #bd0000 ', ' #800000 ',]
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'COPERNICUS/S1_GRD';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    'Hc': {
      description: 'Psuedo scattering Entropy (0-1)',
      visParams: {min: 0, max: 1, palette: jet_cmap, bands: ['Hc'] }
    },
    'mc': {
      description: 'Co-pol Purity parameter (0-1)',
      visParams: {min: 0, max: 1,palette: jet_cmap, bands: ['mc']}
    },
    'Theta_c': {
      description: 'Psuedo scattering-type paramter (0-45)',
      visParams: {min: 0, max: 45, palette: jet_cmap, bands: ['theta_c']}
    },
    'DpRVIc': {
      description: 'Dual-pol Radar Vegetation Index for GRD data (0-1)',
      visParams: { min: 0, max: 1, palette: jet_cmap, bands: ['dprvi_c']}
    },
    'q': {
      description: 'Backscatter intensity ratio (0-1)',
      visParams: { min: 0, max: 1, palette: jet_cmap, bands: ['q']}
    },
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
      app.legendPanel.panel,
      app.export.panel,
      app.references.panel,
      // legendPanel
      // app.export1.panel
    ],
    style: {width: '350px', padding: '6px'}
  });
  Map.setCenter(-97.823, 49.6474, 12.5);
  ui.root.insert(0, main);
  app.applyFilters();
};
  /*----------------------------------------*/
  // Creates a color bar thumbnail image for use in legend from the given color
// palette.
var jet_cmap = [' #000080 ', ' #0000bd ', ' #0000fa ', ' #0022ff ', ' #0057ff ', ' #008dff ',
' #00c3ff ', ' #0ff8e8 ', ' #3affbc ', ' #66ff91 ', ' #91ff66 ', ' #bcff3a ', ' #e8ff0f ', ' #ffd500 ',
' #ffa400 ', ' #ff7200 ', ' #ff4000 ', ' #fa0e00 ', ' #bd0000 ', ' #800000 ',]
var cmap = {min: 0, max: 1, palette: jet_cmap};
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(cmap.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(cmap.min, {margin: '4px 8px'}),
    ui.Label(
        (cmap.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(cmap.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: Hc',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
// function downloadImg() {
//   // var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
//   var downloadArgs = {
//     name: 'ee_image',
//     crs: 'EPSG:5070',
//     scale: 30,
//     // region: viewBounds.toGeoJSONString()
// };
// var url = img.getDownloadURL(downloadArgs);
// urlLabel.setUrl(url);
// urlLabel.style().set({shown: true});
// }
// // Add UI elements to the Map.
// var downloadButton = ui.Button('Download viewport', downloadImg);
// var urlLabel = ui.Label('Download', {shown: false});
// var panel = ui.Panel([downloadButton, urlLabel]);
// Map.add(panel);
app.boot();