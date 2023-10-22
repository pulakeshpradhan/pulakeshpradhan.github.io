var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -95.37857437133789,
                38.897247820336425
              ],
              [
                -95.12142562866211,
                38.897247820336425
              ],
              [
                -95.12142562866211,
                39.002712948679616
              ],
              [
                -95.37857437133789,
                39.002712948679616
              ],
              [
                -95.37857437133789,
                38.897247820336425
              ]
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-95.37857437133789, 38.897247820336425],
          [-95.12142562866211, 38.897247820336425],
          [-95.12142562866211, 39.002712948679616],
          [-95.37857437133789, 39.002712948679616],
          [-95.37857437133789, 38.897247820336425]]]);
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Thumbnail({
        image: ee.Image('users/JamesMColl/GEEye_geo').visualize({bands:  ['b1','b2','b3'],min: 0,max: 255}),
      params: {
          dimensions: '1630x1042',
          format: 'png'
        },
        style: {width: '420px',padding :'0'} //{height: '127px', width: '320px',padding :'0'}
      }),
      ui.Label({
        value: 'GEyE - satellite scraper',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('A rapid earth remote sensing data wrapper to view and download small scale, near real time and archival satellite imagery.  Zoom to an area on the planet, select your time frame, and hit process!  Note the file downloaded may be cropped to the center of the screen depending on the scale requested and will look and render best at full screen (>1300 px).'),
      ui.Label({
        value: 'Built on Google Earth Engine, developed with <3',
        style: {fontSize: '10px', margin: '10px 5px'}
      }),
       ui.Label({value: '____________________________________________________________________',style: {fontWeight: 'bold',  color: 'black'}}),
    ]),
  };
  app.processed_aoi_chart = ui.Panel();
  app.helper = {
    aoi_size_label: ui.Label({value:'Area processd:'+app.processed_aoi_size+'sq. meters'}),
    table_header:ui.Label({value:' Platform : lag to ingest: NADIR return: pixel size:', style: {fontSize: '11px', margin: '2px 5px'}}),
    row_sent1_header: ui.Label({value:'Sentinel 1:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar"),
    row_sent2_header: ui.Label({value:'Sentinel 2:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://sentinel.esa.int/web/sentinel/user-guides/sentinel-2-msi"),
    row_sent3_header: ui.Label({value:'Sentinel 3:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://sentinel.esa.int/web/sentinel/user-guides/sentinel-3-olci"),
    row_ls9_header: ui.Label({value:'LANDSAT 9:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://www.usgs.gov/landsat-missions/landsat-9"),
    row_ls8_header: ui.Label({value:'LANDSAT 9:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://www.usgs.gov/landsat-missions/landsat-8"),
    row_ls7_header: ui.Label({value:'LANDSAT 9:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://www.usgs.gov/landsat-missions/landsat-7"),
    row_ls5_header: ui.Label({value:'LANDSAT 9:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://www.usgs.gov/landsat-missions/landsat-5"),
    row_MOD_header: ui.Label({value:'MODIS Terra:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://lpdaac.usgs.gov/products/mod09a1v006/"),
    row_MYD_header: ui.Label({value:'MODIS Aqua:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://lpdaac.usgs.gov/products/myd09a1v006/"),
    row_NAIP_header: ui.Label({value:'NAIP:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://www.fsa.usda.gov/programs-and-services/aerial-photography/imagery-programs/naip-imagery/"),
    row_VIIRS_header:ui.Label({value:'VIIRS:', style: {fontSize: '11px', margin: '2px 5px'}}).setUrl("https://lpdaac.usgs.gov/documents/124/VNP09_User_Guide_V1.6.pdf"),
    row_sent1_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_sent1vv_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_sent1vh_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_sent2_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_sent3_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_ls9_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_ls8_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_ls7_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_ls5_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_mod09_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_myd09_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_viirs_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}}),
    row_naip_data:ui.Label({value:'',style:{fontSize:'10px',margin:'2px 5px'}})
  };
  app.credits = {
    credt_title: ui.Label({value: 'App Credits:',style: {fontSize: '12px', fontWeight: 'bold'}}),
    amp: ui.Label({value: "&", style: {fontWeight: "normal", fontSize: "10px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    jim_name: ui.Label({value: "Jim Coll", style: {fontWeight: "normal", fontSize: "10px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}).setUrl("https://jimcoll.github.io/"),
    jim_title: ui.Label({value: " Developer -", style: {fontWeight: "bold", fontSize: "11px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    jude_name: ui.Label({value: "Jude Kastens", style: {fontWeight: "normal", fontSize: "10px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}).setUrl("https://kars.ku.edu/directory/jude-kastens/"),
    jude_title: ui.Label({value: "Principal Investigator -", style: {fontWeight: "bold", fontSize: "11px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    ken_name: ui.Label({value: "Kenneth Ekpetere", style: {fontWeight: "normal", fontSize: "10px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}).setUrl("https://geog.ku.edu/people/kenneth-ekpetere"),
    ken_title: ui.Label({value: "Developer -", style: {fontWeight: "bold", fontSize: "11px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),
    x_name: ui.Label({value: "Xingong Li", style: {fontWeight: "normal", fontSize: "10px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}).setUrl("https://geog.ku.edu/people/xingong-li/"),
    x_title: ui.Label({value: "Advisor -", style: {fontWeight: "bold", fontSize: "11px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}),    
    mike_name: ui.Label({value: "Mike Johnson", style: {fontWeight: "normal", fontSize: "10px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}}).setUrl("https://mikejohnson51.github.io/"),
    mike_title: ui.Label({value: "Developers -", style: {fontWeight: "bold", fontSize: "11px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}})
  };
  app.credits.panel = ui.Panel({
   widgets: [
     app.credits.credt_title,
    // ui.Panel({widgets: [app.credits.jude_title,app.credits.jude_name],layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [app.credits.x_title,app.credits.x_name],layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [app.credits.ken_title,app.credits.ken_name],layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [app.credits.jim_title,app.credits.jim_name],layout: ui.Panel.Layout.flow("horizontal")})
    ui.Panel({widgets: [app.credits.mike_title,app.credits.jim_name,app.credits.amp,app.credits.mike_name],layout: ui.Panel.Layout.flow("horizontal")})
    ] 
  });
  app.export = {
    button: ui.Button({
      label: 'Export the current image to Drive',
      // React to the button's click event.
      onClick: function() {
        ee.Image(ee.Map.layers().get(1)).getDownloadURL({
          params:{name:'GEyE_export', bands:['B1', 'B2', 'B3'],region:geometry,scale:20}, 
        callback:function(URL) {
          download_button.setUrl(URL)
          download_button.style().set({backgroundColor:'#90EE90'})
          download_button.setValue(layerName)
        }
        })
        // Select the full image id.
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to Drive.
        Export.image.toDrive({
          image: ee.Image(imageId).select(visOption.visParams.bands),
          description: 'L8_Export-' + imageIdTrailer,
        });}}),
    export_button:ui.Button('Load'),
    download_button:ui.Label({value:'Load to download',style:{border:'2px solid black', padding:'4px'}})
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('View an image to export', {fontWeight: 'bold'}),
      app.export.download_button
    ]
  });
  /* The AOI definiton section. */
  app.aoi_def = {
    aoi_select: ui.Select({
      items: [app.AOI_SELECT_MAPBOUNDS, app.AOI_SELECT_GEOMETRY], 
      value: app.AOI_SELECT_MAPBOUNDS}),
    button: ui.Button({
      label: 'process current AOI',
      // React to the button's click event.
      onClick: function() {
        app.process_aoi();
      }
    }),
    days_prior_label: ui.Label({value:'Days prior:', style: {fontSize: '11px', margin: '1px 5px'}}),
    days_prior: ui.Textbox({placeholder:"20", value:"20",style: {maxWidth:'50px'}}),
    enddate_label: ui.Label({value:'End date (as YYYY-MM-dd KK):', style: {fontSize: '11px', margin: '1px 5px'}}),
    enddate: ui.Textbox({placeholder:'YYYY-MM-dd KK', value:ee.Date(Date.now()).format('YYYY-MM-dd KK').getInfo(),style: {maxWidth:'500px'}})
  };
  app.aoi_def.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select an AOI and hit process:', {fontWeight: 'bold'}),
      ui.Panel([
        ui.Panel([app.aoi_def.days_prior_label,app.aoi_def.days_prior], ui.Panel.Layout.flow('vertical')),
        ui.Panel([app.aoi_def.enddate_label,app.aoi_def.enddate], ui.Panel.Layout.flow('vertical')),
        app.aoi_def.button
      ], ui.Panel.Layout.flow('horizontal'))
      // ui.Panel([
      //   app.aoi_def.aoi_select,
      //   app.aoi_def.button
      // ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  app.vis = {
    LS5_RGB_button: ui.Button({
      label: 'LandSat 5 - True Color',
      onClick: function() { app.generate_LS5_RGB(); }
    }),
    LS5_543_button: ui.Button({
      label: 'LandSat 5 - 543 False Color',
      onClick: function() { app.generate_LS5_543(); }
    }),
    LS5_NDWI_button: ui.Button({
      label: 'LandSat 5 - NDWI',
      onClick: function() { app.generate_LS5_NDWI(); }
    }),
    LS7_RGB_button: ui.Button({
      label: 'LandSat 7 - True Color',
      onClick: function() { app.generate_LS7_RGB(); }
    }),
    LS7_543_button: ui.Button({
      label: 'LandSat 7 - 543 False Color',
      onClick: function() { app.generate_LS7_543(); }
    }),
    LS7_NDWI_button: ui.Button({
      label: 'LandSat 7 - NDWI',
      onClick: function() { app.generate_LS7_NDWI(); }
    }),
    LS8_RGB_button: ui.Button({
      label: 'LandSat 8 - True Color',
      onClick: function() { app.generate_LS8_RGB(); }
    }),
    LS8_543_button: ui.Button({
      label: 'LandSat 8 - 543 False Color',
      onClick: function() { app.generate_LS8_543(); }
    }),
    LS8_NDWI_button: ui.Button({
      label: 'LandSat 8 - NDWI',
      onClick: function() { app.generate_LS8_NDWI(); }
    }),
    Sentinel1_asc_button: ui.Button({
      label: 'Sentinel 1 - Asc',
      onClick: function() { app.generate_Sent1_a(); }
    }),
    Sentinel1_des_button: ui.Button({
      label: 'Sentinel 1 - Dec',
      onClick: function() { app.generate_Sent1_d(); }
    }),
    Sentinel2_RGB_button: ui.Button({
      label: 'Sentinel 2 - True Color',
      onClick: function() { app.generate_Sentinel2_RGB(); }
    }),
    Sentinel2_843_button: ui.Button({
      label: 'Sentinel 2 - 843 False Color',
      onClick: function() { app.generate_Sentinel2_843(); }
    }),
    Sentinel3_RGB_button:ui.Button({
      label: 'Sentinel-3 OLCI RGB',
      onClick: function() { app.generate_Sentinel3_RGB(); }
    }),
    MOD09_RGB_button: ui.Button({
      label: 'MODIS Terra RGB',
      onClick: function() { app.generate_MOD09_RGB(); }
    }),
    MYD09_RGB_button: ui.Button({
      label: 'MODIS Aqua RGB',
      onClick: function() { app.generate_MYD09_RGB(); }
    }),
    NAIP_RGB_button: ui.Button({
      label: 'NAIP - True Color',
      onClick: function() { app.generate_naip_RGB(); }
    }),
    NAIP_false_button: ui.Button({
      label: 'NAIP - False Color',
      onClick: function() { app.generate_naip_fc(); }
    }),
    radar_label:ui.Label('RADAR:', {fontWeight: 'bold'}),
    optic_label: ui.Label('Optical:', {fontWeight: 'bold'}),
    optic_low_label: ui.Label('Optical (low spatial/temporal res):', {fontWeight: 'bold'})
  };
  app.vis.panel = ui.Panel({
    widgets: [
      app.vis.radar_label,
      ui.Panel([
        app.vis.Sentinel1_asc_button,
        app.vis.Sentinel1_des_button
      ], ui.Panel.Layout.flow('horizontal')),
      app.vis.optic_label,
      ui.Panel([
        app.vis.LS8_RGB_button,
        app.vis.LS8_543_button,
        app.vis.LS8_NDWI_button
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.vis.LS7_RGB_button,
        app.vis.LS7_543_button,
        app.vis.LS7_NDWI_button
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.vis.LS5_RGB_button,
        app.vis.LS5_543_button,
        app.vis.LS5_NDWI_button
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.vis.Sentinel2_RGB_button,
        app.vis.Sentinel2_843_button,
      ], ui.Panel.Layout.flow('horizontal')),
      app.vis.optic_low_label,
      ui.Panel([
        app.vis.Sentinel3_RGB_button,app.vis.MOD09_RGB_button,app.vis.MYD09_RGB_button
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        app.vis.NAIP_RGB_button,
        app.vis.NAIP_false_button,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  app.generate_naip_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.NAIP_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['R', 'G', 'B'],min:0,max:255},'NAIP True Color');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['R', 'G', 'B'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_naip_FC = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.NAIP_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['N', 'R', 'G'],min:0,max:255},'NAIP False Color');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['R', 'G', 'B'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_LS8_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS8_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B4','B3','B2'],min:0,max:0.4},'LandSat 8 RGB');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['B4','B3','B2'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_LS8_543 = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS8_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B5','B4','B3'],min:0,max:0.4},'LandSat 8 543');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['B5','B4','B3'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_LS8_NDWI = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS8_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean().select('B5','B6').normalizedDifference();
    print(dat);
    Map.addLayer(dat,{bands:['N', 'R', 'G'],min:0,max:255},'LandSat 8 NDWI');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['B5','B4','B3'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_LS7_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B3','B2','B1'],min:0,max:0.4},'LandSat 7 RGB');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['B3','B2','B1'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_LS7_543 = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B5','B4','B3'],min:0,max:0.4},'LandSat 7 543');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['B5','B4','B3'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_LS7_NDWI = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean().select('B4','B5').normalizedDifference();
    print(dat);
    Map.addLayer(dat,{bands:['N', 'R', 'G'],min:0,max:255},'LandSat 7 NDWI');
  };
  app.generate_LS5_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS5_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B3','B2','B1'],min: 0.0,max: 0.4,gamma: 1.2},'LandSat 5 RGB');
  };
  app.generate_LS5_543 = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS5_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B5','B4','B3'],min: 0.0,max: 0.4,gamma: 1.2},'LandSat 5 543');
  };
  app.generate_LS5_NDWI = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean().select('B4','B5').normalizedDifference();
    print(dat);
    Map.addLayer(dat,{bands:['N', 'R', 'G'],min:0,max:255},'LandSat 5 NDWI');
  };
  app.generate_Sent1_a = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.SENT1_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')).mean();
    Map.addLayer(dat,{min: -25, max: 5},'Sentinel-1 vv ASC');
  };
  app.generate_Sent1_d = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.SENT1_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')).mean();
    Map.addLayer(dat,{min: -25, max: 5},'Sentinel-1 vv DEC');
  };
  app.generate_Sentinel2_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.SENT2_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B4', 'B3', 'B2'],min:1632,max:3950.75},'Sentinel-2 MSI-1c RGB');
    //filePerBand:false
    dat.getDownloadURL({
      params:{name:'GEyE_export', bands:['B4', 'B3', 'B2'],min:1632,max:3950.75 ,region:app.processed_aoi.geometry(),scale:500}, 
      callback:function(URL) {
        app.export.download_button.setUrl(URL);
        app.export.download_button.style().set({backgroundColor:'#90EE90'});
        app.export.download_button.setValue('Download ready');
      }
    });
  };
  app.generate_Sentinel2_843 = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.SENT2_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['B8', 'B4', 'B3'],min:1632,max:3950.75},'Sentinel-2 MSI-1c 843');
  };
  app.generate_Sentinel3_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.SENT3_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance'],min: 0,max: 6,gamma: 1.5},'NAIP True Color');
  };
  app.generate_MOD09_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.MOD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean().clip(app.processed_aoi.geometry());
    Map.addLayer(dat,{bands:['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'],min: -100.0,max: 8000.0},'MOD09');
    dat.getDownloadURL({
          params:{name:'GEyE_export', bands:['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'],region:app.processed_aoi.geometry(),scale:500}, 
          callback:function(URL) {
            app.export.download_button.setUrl(URL);
            app.export.download_button.style().set({backgroundColor:'#90EE90'});
            app.export.download_button.setValue('Download ready');
          }
        });
  };
  app.generate_MYD09_RGB = function() {
    Map.clear();
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    var dat = app.MYD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).mean();
    Map.addLayer(dat,{bands:['sur_refl_b01', 'sur_refl_b04', 'sur_refl_b03'],min: -100.0,max: 8000.0},'MYD09');
  };
  app.slice_data_out = function() {
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    app.filtered_ls5 = app.LS5_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.filtered_ls7 = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.filtered_ls8 = app.LS8_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.filtered_naip = app.NAIP_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.filtered_sent1vv = app.SENT1_DATA.filterBounds(app.processed_aoi.geometry())
                                       .filterDate(start_date, end_date)
                                       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                                      .select('VV')
                                      .map(function(image) {
                                        var edge = image.lt(-30.0);
                                        var maskedImage = image.mask().and(edge.not());
                                        return image.updateMask(maskedImage);
                                      });
    app.filtered_sent1vh = app.SENT1_DATA.filterBounds(app.processed_aoi.geometry())
                                       .filterDate(start_date, end_date)
                                       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                                      .select('VH')
                                      .map(function(image) {
                                        var edge = image.lt(-30.0);
                                        var maskedImage = image.mask().and(edge.not());
                                        return image.updateMask(maskedImage);
                                      });
    app.filtered_sent2 = app.SENT2_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));
    app.filtered_sent3 = app.SENT3_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance']).map(function(img){return img.multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]))});
    app.filtered_mod09 = app.MOD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.filtered_myd09 = app.MYD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.filtered_viirs = app.VIIRS_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    app.chart_data = ee.ImageCollection(ee.Image());
    if(app.filtered_sent1vv.size().getInfo()>0) {
      app.filtered_sent1vv_size = app.filtered_sent1vv.size().getInfo();
      app.chart_sent1vv = app.filtered_sent1vv.map(function(element) {
        return ee.Image(3).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_sent1vv_data.setValue('~2 day lag:    ~10 day  :     10 m  :'+app.filtered_sent1vv_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_sent1vv);
    }
    if(app.filtered_sent1vh.size().getInfo()>0) {
      app.filtered_sent1vh_size = app.filtered_sent1vh.size().getInfo();
      app.chart_sent1vh = app.filtered_sent1vh.map(function(element) {
        return ee.Image(6).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_sent1vh_data.setValue('~2 day lag:    ~10 day  :     10 m  :'+app.filtered_sent1vh_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_sent1vh);
    }
    if(app.filtered_sent2.size().getInfo()>0) {
      app.filtered_sent2_size = app.filtered_sent2.size().getInfo();
      app.chart_sent2 = app.filtered_sent2.map(function(element) {
        return ee.Image(element.get('CLOUDY_PIXEL_PERCENTAGE')).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_sent2_data.setValue('~2 day lag: ~1 day : 300 m :'+app.filtered_sent2_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_sent2);
    }
    if(app.filtered_sent3.size().getInfo()>0) {
      app.filtered_sent3_size = app.filtered_sent3.size().getInfo();
      app.chart_sent3 = app.filtered_sent3.map(function(element) {
        return ee.Image(element.get('saturatedPixelsPercent')).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_sent3_data.setValue('~2 day lag: ~16 day : 30 m :'+app.filtered_sent3_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_sent3);
    }
    if(app.filtered_ls5.size().getInfo()>0) {
      app.filtered_ls5_size = app.filtered_ls5.size().getInfo();
      app.chart_ls5 = app.filtered_ls5.map(function(element) {
        return ee.Image(element.get('CLOUD_COVER')).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_ls5_data.setValue('~2 day lag: ~16 day : 30 m:'+app.filtered_ls5_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_ls5);
    }
    if(app.filtered_ls7.size().getInfo()>0) {
      app.filtered_ls7_size = app.filtered_ls7.size().getInfo();
      app.chart_ls7 = app.filtered_ls7.map(function(element) {
        return ee.Image(element.get('CLOUD_COVER')).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_ls7_data.setValue('~2 day lag: ~16 day : 30 m:'+app.filtered_ls7_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_ls7);
    }
    if(app.filtered_ls8.size().getInfo()>0) {
      app.filtered_ls8_size = app.filtered_ls8.size().getInfo();
      app.chart_ls8 = app.filtered_ls8.map(function(element) {
        return ee.Image(element.get('CLOUD_COVER')).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_ls8_data.setValue('~2 day lag: ~16 day : 30 m:'+app.filtered_ls8_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_ls8);
    }
    if(app.filtered_naip.size().getInfo()>0) {
      app.filtered_naip_size = app.filtered_naip.size().getInfo();
      app.chart_naip = app.filtered_naip.map(function(element) {
        return ee.Image(9).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_naip_data.setValue('~yearly: ~yearly : 1 m-6 m:'+app.filtered_naip_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_naip);
    }
    if(app.filtered_mod09.size().getInfo()>0) {
      app.filtered_mod09_size = app.filtered_mod09.size().getInfo();
      app.chart_mod09 = app.filtered_mod09.map(function(element) {
        return ee.Image(9).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_mod09_data.setValue('~2 day lag: ~day : 500 m:'+app.filtered_mod09_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_mod09);
    }
    if(app.filtered_myd09.size().getInfo()>0) {
      app.filtered_myd09_size = app.filtered_myd09.size().getInfo();
      app.chart_myd09 = app.filtered_myd09.map(function(element) {
        return ee.Image(11).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_myd09_data.setValue('~2 day lag: ~day : 500 m:'+app.filtered_myd09_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_myd09);
    }
    if(app.filtered_viirs.size().getInfo()>0) {
      app.filtered_viirs_size = app.filtered_viirs.size().getInfo();
      app.chart_viirs = app.filtered_viirs.map(function(element) {
        return ee.Image(14).copyProperties(element,["system:time_start"]);
      });
      app.helper.row_viirs_data.setValue('~2 day lag: ~day : 500 m:'+app.filtered_viirs_size);
      app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_viirs);
    }
    print(app.chart_data)
  };
  //   app.chart_data = ee.ImageCollection(app.chart_LS5).merge(app.chart_LS7);
  //   app.chart_data = ee.ImageCollection(app.chart_data).merge(app.chart_LS8);
  //   print(app.chart_data)
  // };
  app.populate_chart = function() {
    var TotalMonthlyChart = ui.Chart.feature.byFeature(app.chartData.select(app.selectNames), "date YYYY-MM-dd");
    TotalMonthlyChart.setChartType("LineChart");
    TotalMonthlyChart.setSeriesNames(TableNames);
    TotalMonthlyChart.setOptions({
      title: "Time series values",
      vAxis: {title: null},
      hAxis: {title: "Selected statistic through time", minValue: 0}
    });
    TotalMonthlyChart.style().set({stretch: "both"});
    TotalMonthlyChart.onClick(app.LaunchAnimationPanel);
    // return ui.Panel([yearlyTimeSeries, TotalMonthlyChart, SummeryChart], ui.Panel.Layout.Flow("vertical"));
    app.TimeseriesResults.add(ui.Panel([TotalMonthlyChart, SummeryChart], ui.Panel.Layout.Flow("vertical")))
                         .add(app.buttonPanel);
  };
  app.update_ui_features = function() {
    // app.filtered_sent1_size = app.filtered_sent1.size().getInfo();
    // app.filtered_sent2_size = app.filtered_sent2.size().getInfo();
    // app.filtered_sent3_size = app.filtered_sent3.size().getInfo();
    // app.filtered_ls5_size = app.filtered_ls5.size().getInfo();
    // app.filtered_ls7_size = app.filtered_ls7.size().getInfo();
    // app.filtered_ls8_size = app.filtered_ls8.size().getInfo();
    // app.filtered_mod09_size = app.filtered_mod09.size().getInfo();
    // app.filtered_myd09_size = app.filtered_myd09.size().getInfo();
    // app.filtered_viirs_size = app.filtered_viirs.size().getInfo();
    // app.filtered_naip_size = app.filtered_naip.size().getInfo();
    // // update helper text values
    // app.helper.row_sent1_data.setValue('~2 day lag:    ~10 day  :     10 m  :'+app.filtered_sent1_size);
    // app.helper.row_sent2_data.setValue('~2 day lag:     ~1 day  :    300 m  :'+app.filtered_sent2_size);
    // app.helper.row_sent3_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_sent3_size);
    // app.helper.row_ls8_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_ls8_size().getInfo());
    // app.helper.row_ls7_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_ls7_size().getInfo());
    // app.helper.row_ls5_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_ls5_size().getInfo());
    // app.helper.row_MOD_data.setValue('~2 day lag:    ~day  :     500 m  :'+app.filtered_mod09_size().getInfo());
    // app.helper.row_MYD_data.setValue('~2 day lag:    ~day  :     500 m  :'+app.filtered_myd09_size().getInfo());
    // app.helper.row_naip_data.setValue('~yearly:    ~yearly  :     1 m-6 m :'+app.filtered_naip_size().getInfo());
  };
  app.process_aoi = function() {
    Map.clear();
    if(Map.drawingTools().layers().length()>0) {
      app.processed_aoi = ee.Feature(Map.drawingTools().layers().get(0).getEeObject());
    } else {
      app.processed_aoi = ee.Feature(ee.Geometry.Rectangle(Map.getBounds()));
      Map.drawingTools().addLayer({geometries:[ee.Geometry.Rectangle(Map.getBounds()).getInfo()],shown:false});
    }
    Map.drawingTools().clear();
    // Add AOI to map?
    // Map.addLayer(app.processed_aoi)
    //app.update_ui_features();
    // Update helper lables
    app.helper.aoi_size_label.setValue('Area processd: '+app.processed_aoi.area(500).getInfo()+' sq. meters');
    // generate base data
    var end_date = ee.Date.parse('YYYY-MM-dd KK',app.aoi_def.enddate.getValue());
    var start_date = end_date.advance(-app.aoi_def.days_prior.getValue(),'day');
    app.slice_data_out();
    // if(false) {
    //   app.filtered_ls5 = app.LS5_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).clip(app.processed_aoi.geometry());
    //   app.filtered_ls7 = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).clip(app.processed_aoi.geometry());
    //   app.filtered_ls8 = app.LS8_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).clip(app.processed_aoi.geometry());
    //   app.filtered_naip = app.NAIP_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).clip(app.processed_aoi.geometry());
    //   app.filtered_sent1 = app.SENT1_DATA.filterBounds(app.processed_aoi.geometry())
    //                                     .filterDate(start_date, end_date)
    //                                     .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    //                                     .filter(ee.Filter.eq('instrumentMode', 'IW'))
    //                                     .select('VV')
    //                                     .map(function(image) {
    //                                       var edge = image.lt(-30.0);
    //                                       var maskedImage = image.mask().and(edge.not());
    //                                       return image.updateMask(maskedImage);
    //                                     })
    //                                     .clip(app.processed_aoi.geometry());
    //   app.filtered_sent2 = app.SENT2_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).clip(app.processed_aoi.geometry());
    //   app.filtered_sent3 = app.SENT3_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance']).map(function(img){return img.multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]))}).clip(app.processed_aoi.geometry());
    //   app.filtered_mod09 = app.MOD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).clip(app.processed_aoi.geometry());
    //   app.filtered_myd09 = app.MYD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).clip(app.processed_aoi.geometry());
    // } else {
    //   app.filtered_ls5 = app.LS5_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    //   app.filtered_ls7 = app.LS7_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    //   app.filtered_ls8 = app.LS8_TOA_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    //   app.filtered_naip = app.NAIP_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    //   app.filtered_sent1 = app.SENT1_DATA.filterBounds(app.processed_aoi.geometry())
    //                                     .filterDate(start_date, end_date)
    //                                     .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    //                                     .filter(ee.Filter.eq('instrumentMode', 'IW'))
    //                                     .select('VV')
    //                                     .map(function(image) {
    //                                       var edge = image.lt(-30.0);
    //                                       var maskedImage = image.mask().and(edge.not());
    //                                       return image.updateMask(maskedImage);
    //                                     });
    //   app.filtered_sent2 = app.SENT2_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));
    //   app.filtered_sent3 = app.SENT3_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date).select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance']).map(function(img){return img.multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]))});
    //   app.filtered_mod09 = app.MOD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    //   app.filtered_myd09 = app.MYD09_DATA.filterBounds(app.processed_aoi.geometry()).filterDate(start_date, end_date);
    // }
    // app.make_series_charts();
    // app.generate_chart_series_data()
    // update helper text values
    // app.helper.row_sent1_data.setValue('~2 day lag:    ~10 day  :     10 m  :'+app.filtered_sent1.size().getInfo()+":"+app.filtered_sent1.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')).size().getInfo()+":"+app.filtered_sent1.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')).size().getInfo());
    // app.helper.row_sent2_data.setValue('~2 day lag:     ~1 day  :    300 m  :'+app.filtered_sent2.size().getInfo());
    // app.helper.row_sent3_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_sent3.size().getInfo);
    // app.helper.row_ls8_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_ls8.size().getInfo());
    // app.helper.row_ls7_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_ls7.size().getInfo());
    // app.helper.row_ls5_data.setValue('~2 day lag:    ~16 day  :     30 m  :'+app.filtered_ls5.size().getInfo());
    // app.helper.row_MOD_data.setValue('~2 day lag:    ~day  :     500 m  :'+app.filtered_mod09.size().getInfo());
    // app.helper.row_MYD_data.setValue('~2 day lag:    ~day  :     500 m  :'+app.filtered_myd09.size().getInfo());
    // app.helper.row_naip_data.setValue('~yearly:    ~yearly  :     1 m-6 m :'+app.filtered_naip.size().getInfo());
    // assemble chart
    //     radar_label:ui.Label('RADAR:', {fontWeight: 'bold'}),
    // optic_label: ui.Label('Optical:', {fontWeight: 'bold'}),
    // optic_low_label: ui.Label('Optical (low spatial/temporal res):', {fontWeight: 'bold'})
    if(app.filtered_sent1vh.size().getInfo()>0) { 
      app.vis.Sentinel1_asc_button.style().set({shown: true});
      app.vis.Sentinel1_des_button.style().set({shown: true});
      app.vis.radar_label.style().set({shown: true});
    } else { 
      app.vis.Sentinel1_asc_button.style().set({shown: false});
      app.vis.Sentinel1_des_button.style().set({shown: false});
      app.vis.radar_label.style().set({shown: false});
    }
    if(app.filtered_ls8.size().getInfo()>0) { 
      app.vis.LS8_RGB_button.style().set({shown: true});
      app.vis.LS8_543_button.style().set({shown: true});
      app.vis.LS8_NDWI_button.style().set({shown: true});
    } else { 
      app.vis.LS8_RGB_button.style().set({shown: false});
      app.vis.LS8_543_button.style().set({shown: false});
      app.vis.LS8_NDWI_button.style().set({shown: false});
    }
    if(app.filtered_ls7.size().getInfo()>0) { 
      app.vis.LS7_RGB_button.style().set({shown: true});
      app.vis.LS7_543_button.style().set({shown: true});
      app.vis.LS7_NDWI_button.style().set({shown: true});
    } else { 
      app.vis.LS7_RGB_button.style().set({shown: false});
      app.vis.LS7_543_button.style().set({shown: false});
      app.vis.LS7_NDWI_button.style().set({shown: false});
    }
    if(app.filtered_ls5.size().getInfo()>0) { 
      app.vis.LS5_RGB_button.style().set({shown: true});
      app.vis.LS5_543_button.style().set({shown: true});
      app.vis.LS5_NDWI_button.style().set({shown: true});
    } else { 
      app.vis.LS5_RGB_button.style().set({shown: false});
      app.vis.LS5_543_button.style().set({shown: false});
      app.vis.LS5_NDWI_button.style().set({shown: false});
    }
    if(app.filtered_sent2.size().getInfo()>0) { 
      app.vis.Sentinel2_RGB_button.style().set({shown: true});
      app.vis.Sentinel2_843_button.style().set({shown: true});
    } else {
      app.vis.Sentinel2_RGB_button.style().set({shown: false});
      app.vis.Sentinel2_843_button.style().set({shown: false});
    }
    if(app.filtered_sent3.size().getInfo()>0) { 
      app.vis.Sentinel3_RGB_button.style().set({shown: true});
    } else {
      app.vis.Sentinel3_RGB_button.style().set({shown: false});
    }
    if(app.filtered_mod09.size().getInfo()>0) { 
      app.vis.MOD09_RGB_button.style().set({shown: true});
    } else {
      app.vis.MOD09_RGB_button.style().set({shown: false});
    }
    if(app.filtered_myd09.size().getInfo()>0) { 
      app.vis.MYD09_RGB_button.style().set({shown: true});
    } else {
      app.vis.MYD09_RGB_button.style().set({shown: false});
    }
    if(app.filtered_naip.size().getInfo()>0) { 
      app.vis.NAIP_RGB_button.style().set({shown: true});
      app.vis.NAIP_false_button.style().set({shown: true});
    } else {
      app.vis.NAIP_RGB_button.style().set({shown: false});
      app.vis.NAIP_false_button.style().set({shown: false});
    }
    //add to panel
    // ee.Date(Date.now()).format('YYYY-MM-dd KK')
    return(true);
  };
  // legend helper function
  app.makeRow = function(color, name) {
    return ui.Panel({
      widgets: [
        ui.Label({style: {backgroundColor: "#" + color, padding: "8px", margin: "0 0 4px 0"}}), 
        ui.Label({value: name, style: {margin: "0 0 4px 6px"}})],
      layout: ui.Panel.Layout.Flow("horizontal")
    });
  };
  // legend helper function
  app.makeColorBarParams = function(myPalette) {
    return {bbox: [0, 0, 1, 0.1], dimensions: '100x10', format: 'png', min: 0, max: 1, palette: myPalette};
  };
  app.WipeMap = function() {
    app.MainMap.clear();    //Would clear but that removes onclick event as well...
    // for(var i = 0; i <= 500; i++) {
    //   app.MainMap.layers().remove(app.MainMap.layers().get(i));
    // }
    app.MainMap.style().set({cursor: "crosshair"});
    app.MainMap.onClick(app.MapClickEvent);
  };
  app.OpacitySlide = function(OslideValue) {
    app.MainMap.layers().get(app.currentIndex).setOpacity(OslideValue);
  };
  app.nextFrame = function() {
    var index = app.currentIndex + 1;
    if(index > app.USLegend.ImageAnimate) {
      index = 1;
    }
    app.animation.IndexSlider.setValue(index);
    if(app.play) {ui.util.setTimeout(app.nextFrame, app.timeStep);}
  };
  app.showLayer = function(index) { 
    var opValue =  app.animation.OpSlider.getValue();
    app.MainMap.layers().get(app.currentIndex).setOpacity(0);
    app.MainMap.layers().get(index).setOpacity(opValue);
    app.currentIndex = index;
    app.animation.IndexSliderImageName.setValue(app.MainMap.layers().get(index).getName());
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
  // Clears the set of selected points and resets the overlay and results panel to their default state.
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
  app.LaunchAnimationPanel = function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    app.animation.panel1.style().set({shown: true});
    app.animation.panel2.style().set({shown: true});
    app.animation.panel3.style().set({shown: true});
    app.animation.IndexSlider.setMin(1);
    var dateSliderValue = app.LCLegend.dateSlider.getValue();
    var LimitImages = app.USLegend.ImageAnimate.getValue();
    app.addColorLegend();
    var TimeSelectValue = app.USLegend.TimeSeriesSelect.getValue(); 
    if(TimeSelectValue == "Top 5 Percent") {
      TimeSelectValue = "mean";
    }
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    var stringSeperator =  VarSelectValue + "_" + TimeSelectValue;
    app.ANIMATEDimages = ee.ImageCollection(app.MODDef).select(stringSeperator).filterDate(ee.Date(xValue), ee.Date('2020-01-01')).limit(parseInt(LimitImages, 10));
    app.addImagesToMap(app.ANIMATEDimages);
  };
  app.addImagesToMap = function(ImageCollectionToMap) {
    var vis;
    var VarSelectValue = app.USLegend.VarSelect.getValue();
    app.USLegend.ImageAnimate = ImageCollectionToMap.size().getInfo();
    app.animation.IndexSlider.setMax(app.USLegend.ImageAnimate);
    if(VarSelectValue == "K") {
      vis = app.Kvis;
    } else if(VarSelectValue == "ET") {
      vis = app.ETvis;
    } else if(VarSelectValue == "Gpp") {  
      vis = app.Gppvis;
    } else if(VarSelectValue == "LE") {   
      vis = app.LEvis;
    } else if(VarSelectValue == "PLE") {   
      vis = app.PLEvis;
    } else if(VarSelectValue == "PET") {   
      vis = app.PETvis;
    } else if(VarSelectValue == "WUE") {  
      vis = app.WUEvis;
    }
    var orderCorrectedImages = ImageCollectionToMap.toList(900).reverse();
    for(var i = 0; i <= app.USLegend.ImageAnimate-1; i++) {
      app.MainMap.layers().insert(1, ui.Map.Layer(ee.Image(orderCorrectedImages.get(i)), {min:vis.min, max:vis.max, palette:vis.Palette}, ee.String(ee.Date(ee.Image(orderCorrectedImages.get(i)).get("system:time_start")).format("MM-dd-YYYY")).getInfo(), true, 0));
    }
    return true;
  };
  app.iter_num_func = function(image, newlist) {
    var date = ee.Number.parse(image.date().format("YYYYMMdd"));
    newlist = ee.List(newlist);
    return ee.List(newlist.add(date).sort());
  };
  app.iter_str_func = function(image, newlist) {
    var date = ee.Number.parse(image.date().format("YYYY-MM-dd"));
    newlist = ee.List(newlist);
    return ee.List(newlist.add(date).sort());
  };
  app.ymdList = function(imagecollection) {
    var iter_func = function(image, newlist){
        // var date = ee.Number(image.date().format("YYYYMMdd"));
        var date = ee.String(image.date().format("YYYY-MM-dd kk"));
        newlist = ee.List(newlist);
        return ee.List(newlist.add(date).sort());
    };
    var imList = imagecollection.iterate(iter_func, ee.List([]));
    imList = ee.List(imList).distinct().reverse().slice(0, 6); 
    return imList;
  };
  app.UpdateApp = function() {
    var collection = app.filters.CollectionSelect.getValue();
    if(collection == "Sentinel-2 MSI SR") {
      app.IMAGES = ee.ImageCollection("COPERNICUS/S2_SR").filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
                              .filterDate(ee.Date(new Date()).advance(-2, 'month'), ee.Date(new Date()));
    } else if (collection == "Sentinel-2 MSI TOA") {
      app.IMAGES = ee.ImageCollection("COPERNICUS/S2").filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
                               .filterDate(ee.Date(new Date()).advance(-2, 'month'), ee.Date(new Date()));
    } else if (collection == "Sentinel-3 Ocean and Land Color Instrument (OLCI)") {
      app.IMAGES = ee.ImageCollection("COPERNICUS/S3/OLCI").filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
                               .filterDate(ee.Date(new Date()).advance(-2, 'month'), ee.Date(new Date()));
    } else if (collection == "LANDSAT 7 TOA") {
      app.IMAGES = ee.ImageCollection('LANDSAT/LE07/C01/T1_RT_TOA').filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
                               .filterDate(ee.Date(new Date()).advance(-2, 'month'), ee.Date(new Date()));
    } else if (collection == "LANDSAT 8 TOA") {
      app.IMAGES = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA').filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
                               .filterDate(ee.Date(new Date()).advance(-2, 'month'), ee.Date(new Date()));
    }
    var imList = app.ymdList(app.IMAGES);
    // print(ee.String(imList.get(0)))
    app.filters.imageselect.items().reset([
      ee.String(imList.get(0)).getInfo(),
      ee.String(imList.get(1)).getInfo(),
      ee.String(imList.get(2)).getInfo(),
      ee.String(imList.get(3)).getInfo(),
      ee.String(imList.get(4)).getInfo(),
      ee.String(imList.get(5)).getInfo()
    ]);
    app.filters.imageselect.setValue(app.filters.imageselect.items().get(0));
  };
  app.updateMap = function() {
    var collection = app.filters.CollectionSelect.getValue();
    var visMode = app.filters.CollectionViewSelect.getValue();
    var dates = app.filters.imageselect.getValue();
    var finalvis;
    app.IMAGES = null;
    if(collection == "Sentinel-2 MSI SR") {
      app.IMAGES = ee.ImageCollection("COPERNICUS/S2_SR")
        .filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
        .filterDate(
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(-5, 'hour'), 
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(5, 'hour')
        );
        if(visMode=='RGB') {finalvis=app.S2RGBVIS} else if(visMode=='NWDW') {finalvis=app.S2RGBVIS};
    } else if (collection == "Sentinel-2 MSI TOA") {
      app.IMAGES = ee.ImageCollection("COPERNICUS/S2")
      .filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
        .filterDate(
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(-5, 'hour'), 
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(5, 'hour')
        );
        if(visMode=='RGB') {finalvis=app.S2RGBVIS} else if(visMode=='NWDW') {finalvis=app.S2RGBVIS};
    } else if (collection == "Sentinel-3 Ocean and Land Color Instrument (OLCI)") {
      app.IMAGES = ee.ImageCollection("COPERNICUS/S3/OLCI")
      .filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
        .filterDate(
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(-5, 'hour'), 
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(5, 'hour')
        );
        if(visMode=='RGB') {finalvis=app.S3RGBVIS} else if(visMode=='NWDW') {finalvis=app.S3RGBVIS};
    } else if (collection == "LANDSAT 7 TOA") {
      app.IMAGES = ee.ImageCollection('LANDSAT/LE07/C01/T1_RT_TOA')
      .filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
        .filterDate(
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(-5, 'hour'), 
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(5, 'hour')
        );
        if(visMode=='RGB') {finalvis=app.LS7RGBVIS} else if(visMode=='NWDW') {finalvis=app.LS7RGBVIS};
    } else if (collection == "LANDSAT 8 TOA") {
      app.IMAGES = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
      .filterBounds(app.STATESHAPE.filterMetadata('STATEFP','equals','20'))
        .filterDate(
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(-5, 'hour'), 
          ee.Date.parse('YYYY-MM-dd kk',dates).advance(5, 'hour')
        );
        if(visMode=='RGB') {finalvis=app.LS8RGBVIS} else if(visMode=='NWDW') {finalvis=app.LS8RGBVIS};
    }
    Map.clear();
    // print(app.IMAGES)
    Map.addLayer(app.IMAGES, finalvis);
  };
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
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.IMAGES;
  app.AOI_SELECT_MAPBOUNDS = "Current map frame";
  app.AOI_SELECT_GEOMETRY = "Defined with draw tools";
  app.NAIP_DATA = ee.ImageCollection('USDA/NAIP/DOQQ');
  app.LS5_TOA_DATA = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA');
  app.LS7_TOA_DATA = ee.ImageCollection('LANDSAT/LE07/C01/T1_RT_TOA');
  app.LS8_TOA_DATA = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA');
  app.MOD09_DATA = ee.ImageCollection('MODIS/061/MOD09GA');
  app.MYD09_DATA = ee.ImageCollection('MODIS/061/MYD09GA');
  app.SENT1_DATA = ee.ImageCollection('COPERNICUS/S1_GRD');
  app.SENT2_DATA = ee.ImageCollection('COPERNICUS/S2');
  app.SENT3_DATA = ee.ImageCollection('COPERNICUS/S3/OLCI');
  app.VIIRS_DATA = ee.ImageCollection('NOAA/VIIRS/001/VNP09GA');
  app.filtered_ls5;
  app.filtered_ls7;
  app.filtered_ls8;
  app.filtered_naip;
  app.filtered_sent1vv;
  app.filtered_sent1vh;
  app.filtered_sent2;
  app.filtered_sent3;
  app.filtered_viirs;
  app.filtered_sent1_size;
  app.filtered_sent2_size;
  app.filtered_sent3_size;
  app.filtered_ls5_size;
  app.filtered_ls7_size;
  app.filtered_ls8_size;
  app.filtered_mod09_size;
  app.filtered_myd09_size;
  app.filtered_viirs_size;
  app.filtered_naip_size;
  app.geometry;
  app.processed_aoi_size;
  app.LS7STRING = 'LANDSAT 7 TOA';
  app.LS7RGBVIS = {min: 0.0, max: 0.4, gamma: 1.2, bands:['B3', 'B2', 'B1']};
  app.LS8DATA = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA');
  app.LS8STRING = 'LANDSAT 8 TOA';
  app.LS8RGBVIS = {min: 0.0, max: 0.4, bands:['B4', 'B3', 'B2']};
  app.STATESHAPE = ee.FeatureCollection("TIGER/2016/States");
  app.RGB = 'RGB';
  app.NDWI = 'NWDW';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.VIS_OPTIONS = {
    'False color (B7/B6/B4)': {
      description: 'Vegetation is shades of red, urban areas are ' +
                   'cyan blue, and soils are browns.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B4']}
    },
    'Natural color (B4/B3/B2)': {
      description: 'Ground features appear in colors similar to their ' +
                   'appearance to the human visual system.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
    'Atmospheric (B7/B6/B5)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears blue.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B5']}
    }
  };
  // Animation
  app.IMAGE_COUNT_LIMIT = 24;
  app.timeout = null;
  app.play = false;
  app.utils = require('users/gena/packages:utils');
  app.text = require('users/gena/packages:text');
  app.textPlay = '▶';
  app.textPause = '⏸';
  app.palettes = require('users/gena/packages:palettes');
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.aoi_def.panel,
      ui.Label({value: '____________________________________________________________________',style: {fontWeight: 'bold',  color: 'black'}}),
      ui.Label('2) Whats avalible:', {fontWeight: 'bold'}),
      app.helper.aoi_size_label,
      app.helper.table_header,
      ui.Panel({widgets: [app.helper.row_sent1_header,app.helper.row_sent1vv_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_sent1vh_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_ls8_header,app.helper.row_ls8_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_ls7_header,app.helper.row_ls7_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_ls5_header,app.helper.row_ls5_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_sent2_header,app.helper.row_sent2_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_sent3_header,app.helper.row_sent3_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_MOD_header,app.helper.row_mod09_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_MYD_header,app.helper.row_myd09_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_VIIRS_header,app.helper.row_viirs_data],layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Panel({widgets: [app.helper.row_NAIP_header,app.helper.row_naip_data],layout: ui.Panel.Layout.flow("horizontal")}),
      app.vis.panel,
      app.export.panel,
      ui.Label({value: '____________________________________________________________________',style: {fontWeight: 'bold',  color: 'black'}}),
      app.credits.panel
    ],
    style: {width: '470px', padding: '8px'}
  });
  // ee.Feature(ee.Geometry.Rectangle(app.MainMap.getBounds()));
  Map.drawingTools().layers().reset();
  app.drawingTools = Map.drawingTools();
  // app.drawingTools.setDrawModes(['rectangle']);
  app.drawingTools.setDrawModes(['point', 'rectangle']);
  Map.setCenter(-95.25, 38.95, 12);
  ui.root.insert(0, main);
  Map.setCenter(-95.25, 38.95, 12);
  app.process_aoi();
};
// ui.root.clear();
app.boot();