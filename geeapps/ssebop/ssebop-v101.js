/* https://mygeodata.cloud/result qgis salvar como extensão da camada */ 
// Imports
var SSEBop = require("users/areasirrigadas/projeto2018:ssebop/Agrosatelite/SSEBop.js");
var dailySSEBop = require("users/areasirrigadas/projeto2018:ssebop/Agrosatelite/dailySSEBop.js");
var julianUtils = require("users/areasirrigadas/projeto2018:packages/julianDate.js");
var cloudUtils =  require("users/areasirrigadas/projeto2018:packages/cloud.js");
// Logos
var logoSSEBop = "users/areasirrigadas/apps/logos/SSEBop";
var logoAgrosatelite = "users/areasirrigadas/apps/logos/agrosatelite";
var logoANA = "users/areasirrigadas/apps/logos/ana";
var logoUSGS = "users/areasirrigadas/apps/logos/usgs";
var iconDownload = "users/areasirrigadas/apps/logos/download";
// Collections
var landsat5Collection = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA");
var landsat52Collection = ee.ImageCollection("LANDSAT/LT05/C01/T2_TOA");
var landsat7Collection = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA");
var landsat72Collection = ee.ImageCollection("LANDSAT/LE07/C01/T2_TOA");
var landsat8Collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
var landsat82Collection = ee.ImageCollection("LANDSAT/LC08/C01/T2_TOA");
// Global variables
var currentCollection = null;
var currentImage = null;
var currentDialog = null;
var currentPoint = null;
var areaDeExportacao = null;
// Default CSS Styles
var defaultStyle = {
  //fontFamily: "open_sansregular"
};
var map = ui.Map({
  center: {lon: -51.2688, lat: -14.5554, zoom: 4}, 
  style: defaultStyle
}).setControlVisibility({
  all: false, 
  layerList: true, 
  zoomControl: true, 
  scaleControl: true, 
  mapTypeControl: true, 
  fullscreenControl: false
});
function makeDialog(title, content, windowSize){
  /*
    title: (String)
    content: (String)l
    size: (String, optional): xs, sm, md, lx
  */
  var sizes = {
    "md": {'height': '50%', 'width': '50%'},
    "lg": {'height': '90%', 'width': '50%'},
  };
  var closeButton = ui.Button({
    label: "Close",
    onClick: function(){
      map.remove(currentDialog)     ;         
    },
    style: extend(defaultStyle, {
      'position': 'bottom-right',
      'margin': '0px',
    })
  });
  try{
    map.remove(currentDialog);
  }catch(err){
    console.log(err);
  }
  currentDialog = ui.Panel({
    widgets: [
      ui.Label(title, extend(defaultStyle, {fontSize: '24px', fontWeight: 'bold'})), 
      ui.Label(content), 
      ui.Panel({widgets:[closeButton], style: {position: 'bottom-right'}, layout: ui.Panel.Layout.flow("horizontal")})
    ],
    style: extend(defaultStyle,{
      position: 'top-center',
      height: sizes[windowSize]['height'],
      width: sizes[windowSize]['width'],
      textAlign: 'left',
      margin: '0px',
      padding: '10px',
    }),
    layout: ui.Panel.Layout.flow("vertical"),
  });
  map.add(currentDialog);
}
function makeDialogDownload(title, content, windowSize){
  /*
    title: (String)
    content: (String)
    size: (String, optional): xs, sm, md, lx
  */
  var sizes = {
    "md": {'height': '50%', 'width': '50%'},
    "lg": {'height': '90%', 'width': '50%'},
  };
  var closeButton = ui.Button({
    label: "Close",
    onClick: function(){
      map.remove(currentDialog);          
    },
    style: {
      position: 'bottom-right',
      margin: '0px',
      textAlign: 'right'
    }            
  });
  try{
    map.remove(currentDialog);
  }catch(err){
    console.log(err);
  }
  currentDialog = ui.Panel({
    widgets: [
      ui.Label(title, {fontSize: '24px', fontWeight: 'bold'}), 
      ui.Panel({widgets:[content], style: {width: '100%', position: 'bottom-center', textAlign: 'center'}, layout: ui.Panel.Layout.flow("horizontal")}), 
      ui.Panel({widgets:[closeButton], style: {width: '100%', position: 'bottom-right'}, layout: ui.Panel.Layout.flow("horizontal")})
    ],
    style: extend(defaultStyle,{
        position: 'top-center',
        height: sizes[windowSize]['height'],
        width: sizes[windowSize]['width'],
        textAlign: 'left',
        margin: '0px',
        padding: '10px',
    }),
    layout: ui.Panel.Layout.flow("vertical"),
  });
  map.add(currentDialog); 
}
function Icon(asset, style, onClick, dimensions){
    var logo = ee.Image(asset);
    logo = logo.where(logo.select(3).neq(255), 255);
    if (style['textAlign'] === undefined){
      style['textAlign']   = 'center'
    }
    if (style['margin'] === undefined){
      style['margin']   = '0px'
    }
    if (style['padding'] === undefined){
      style['padding']   = '10px'
    }
    if(dimensions === undefined){
      dimensions = 800;
    }    
    var thumbnail = ui.Thumbnail({
        image: logo,
        params: {
            format: 'png',
            dimensions: dimensions,
            min: 0,
            max: 255,
        },
        onClick: onClick,
        style: style
    });
    return thumbnail;
}
function buildImage(image){
  var bands = ee.Image(ee.Algorithms.If(ee.List(["LANDSAT_5"]).containsAll([image.get('SPACECRAFT_ID')]),
          image.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "TIR1", "SWIR2"]),
          ee.Algorithms.If(ee.List(["LANDSAT_7"]).containsAll([image.get('SPACECRAFT_ID')]),
            image.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2',  'B7'], ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "TIR1", "TIR2", "SWIR2"]),
            ee.Algorithms.If(ee.List(["LANDSAT_8"]).containsAll([image.get('SPACECRAFT_ID')]),
              image.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'], ["BLUE", "GREEN", "RED", "NIR", "SWIR1", "SWIR2",  "TIR1", "TIR2"]),
              ee.Image(0).rename("TIR"))
            )
          ));
  return bands;
}
var headerPanel = ui.Panel({
  widgets: [
    Icon(logoSSEBop, {width: "60px", height: "80px", margin: '0px'}, 600),
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Label("SSEBop", extend(defaultStyle, {"color": "#606978", fontSize: '40px', fontWeight: 'bold', margin: '0px'})),
            ui.Label("BR", extend(defaultStyle, {"color": "#606978", fontSize: '18px', fontWeight: 'bold'}))
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
        }),
        ui.Label("EVAPOTRANSPIRATION", extend(defaultStyle, {"color": "#606978", fontSize: '20px', margin: '0px'})), 
      ],
      layout: ui.Panel.Layout.flow("vertical"),
      style: extend(defaultStyle,{
        position: 'top-center',
        padding: '0px',
        margin: '0px',
      })
    }),
    // ui.Label("Beta", extend(defaultStyle, {"color": "#d9094e", 'fontSize': '20px'})),
  ],  
  layout: ui.Panel.Layout.flow("horizontal"),
});
var instructionsPanel = ui.Panel({
  widgets:[
    ui.Label("Help?", {"margin": '8px 0px 8px 0px'}, "https://drive.google.com/file/d/1pPswCa6bdbp6HxyCR6yImEgjyaCRkcsS/view"),
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
  style: extend(defaultStyle,{
    position: 'top-right',
    width: '100%',
    margin: '0px',
    fontSize: '18px',
    margin: '0px 0px 10px 0px',
  })
});
var startDate = ui.Textbox({
  value: "2016-01-01",
  placeholder:"yyyy-mm-dd",
  style: extend(defaultStyle,{
    width: '50%',
    margin: '0px',
  }),
  onChange: updateTimeSeries,
});
var endDate = ui.Textbox({
  value: "2016-12-31",
  placeholder:"yyyy-mm-dd",
  style: extend(defaultStyle,{
    width: '50%',
    margin: '0px',
  }),
  onChange: updateTimeSeries,
});
var datePanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Date Search", extend(defaultStyle, {backgroundColor: "#337ab7", color: "#ffffff",  position:'top-center', textAlign: 'center'}))],
      style: {backgroundColor: "#337ab7", position:'top-center'},
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({
      widgets: [startDate, endDate], 
      style: {
        margin: '10px 0px 10px 0px'
      },
      layout: ui.Panel.Layout.flow("horizontal"),
    })  
  ],
});
var locationPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Location Information", extend(defaultStyle,{backgroundColor: "#337ab7", color: "#ffffff",  position:'top-center', textAlign: 'center'}))],
      style: {backgroundColor: "#337ab7", position:'top-center'},
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Label("Move the map and put the region of interest in the center of the map.", defaultStyle),
  ], 
});
var weatherDataset = ui.Select({
  items: [
    { label:"Brasil Meteorological Data", value: SSEBop.datasets.xavier },
    { label:"Brasil Meteorological Data (uses historical median)", value: SSEBop.datasets.historical_xavier},
    { label:"GLDAS-2.1: Global Land Data Assimilation System", value: SSEBop.datasets.gldas },
    { label:"CFSV2: NCEP Climate Forecast System Version 2", value: SSEBop.datasets.cfsv2 },
  ],
  value: SSEBop.datasets.xavier,
  onChange: updateTimeSeries,
});
var dTDataset = ui.Select({
  items: [
    { label:"XAVIER", value: SSEBop.datasets.xavier },
    { label:"GLDAS", value: SSEBop.datasets.gldas },
    { label:"CFSv2", value: SSEBop.datasets.cfsv2 },
  ],
  value: SSEBop.datasets.xavier,
  onChange: updateTimeSeries,
});
var dTType = ui.Select({
  items: [
    { label:"Clear Sky", value: SSEBop.dTTypes.clearsky },
    { label:"Average Conditions", value: SSEBop.dTTypes.average},
  ],
  value: SSEBop.dTTypes.clearsky,
  onChange: updateTimeSeries,
});
var cFactorDataset = ui.Select({
  items: [
    { label:"XAVIER", value: SSEBop.datasets.xavier },
    { label:"GLDAS", value: SSEBop.datasets.gldas },
    { label:"CFSv2", value: SSEBop.datasets.cfsv2 },
  ],
  value: SSEBop.datasets.xavier,
  onChange: updateTimeSeries,
});
var cFactor_STD = ui.Select({
  items: [
    {label: "0", value: 0},
    {label: "1", value: 1},
    {label: "2", value: 2}
  ],
  value: 0,
  style: { width: '50px' },
  onChange: updateTimeSeries,
});
var parametersPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: [ui.Label("Parameters", extend(defaultStyle,{backgroundColor: "#337ab7", color: "#ffffff",  position:'top-center', textAlign: 'center'}))],
      style: {backgroundColor: "#337ab7", position:'top-center'},
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({widgets: [ui.Label("Dataset:"), weatherDataset], layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [ui.Label("dT:"), dTDataset], layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [ui.Label("dT Type (only Xavier):"), dTType], layout: ui.Panel.Layout.flow("horizontal")}),
    // ui.Panel({widgets: [ui.Label("C-Factor Std (Mean - X * Std):"), cFactor_STD], layout: ui.Panel.Layout.flow("horizontal")}),
  ], 
});
var imageSelect = null;
function buildImageSelect(items){
  var imageSelect = ui.Select({
    items: items, 
    placeholder: "SELECT YOUR LANDSAT IMAGE", 
    style: {
      minWidth: '100%',
      maxWidth: '100%',
      margin: '0px 0px 10px 0px',
    }
  });
  return imageSelect;
}
var searchButton = null;
function resetImage(image){
  panel.remove(footer);
  panel.remove(products);
  panel.add(products);
  clearAllColorBars();
  panel.add(footer);
}
searchButton = ui.Button({
  label: "SEARCH IMAGES WITH CENTER AT THE SELECTED POINT",
  onClick: function(){
    var start = startDate.getValue();
    var end = endDate.getValue();
    var coords = currentPoint.coordinates();
    var lon = ee.Number(coords.get(0));
    var lat = ee.Number(coords.get(1));
    var lonDist = 0.22;
    var latDist = 0.22;
    areaDeExportacao = ee.Geometry.Rectangle([lon.subtract(lonDist),
                                              lat.subtract(latDist),
                                              lon.add(lonDist),
                                              lat.add(latDist)]);
    var quadroImg = ee.FeatureCollection(areaDeExportacao).style({
      width:2,
      fillColor:'00000000',
      lineType:'dotted',
    });
    apagaQuadro();
    map.centerObject(areaDeExportacao);
    map.addLayer(quadroImg, {}, 'Image export area');
    currentCollection = landsat5Collection.filterDate(start, end).filterBounds(currentPoint)
              .merge(landsat52Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat7Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat72Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat8Collection.filterDate(start, end).filterBounds(currentPoint))
              .merge(landsat82Collection.filterDate(start, end).filterBounds(currentPoint));
    panel.remove(products);
    panel.remove(imageSelect);
    panel.remove(footer);
    var loading = ui.Label("Loadding images....");
    clearAllColorBars();
    panel.add(loading);
    panel.add(footer);
    currentCollection.sort("system:time_start").evaluate(function(col){
      panel.remove(loading);
      var items = [];
      col.features.forEach(function(feature){
        var label = feature.properties.DATE_ACQUIRED + " / "
                 + feature.properties.LANDSAT_SCENE_ID + " / "
                 + "Cloud " + feature.properties.CLOUD_COVER + "% / "
                 + "Tier " + feature.properties.COLLECTION_CATEGORY;
        var value = feature.properties;
        items.push({label: label, value: value});
      });
      panel.remove(imageSelect);
      imageSelect = buildImageSelect(items);
      imageSelect.onChange(function(properties){
        resetImage();
        currentImage = ee.Image(currentCollection
          .filterMetadata("LANDSAT_SCENE_ID", "equals", properties.LANDSAT_SCENE_ID)
          .first()
        );
      });
      panel.remove(footer);
      panel.add(imageSelect);
      panel.add(footer);
    });
  },
  style: extend(defaultStyle, {
    width: '100%',
    margin: '0px',
    padding: '10px 0px 10px 0px',
  })
});
var naturalColorPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Button("TRUE COLOR (RED, GREEN, BLUE)", function(){
            var trueColor = ProductsManager().getTrueColorImage();
            map.addLayer(trueColor, {min: 0, max: 0.27}, imageSelect.getValue().LANDSAT_SCENE_ID + "_TRUE_COLOR");
        }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
        ui.Button("DOWNLOAD", function(){
          var trueColor = ProductsManager().getTrueColorImage();
          var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
          var downloadUrl = trueColor.select("RED", "GREEN", "BLUE").toFloat().getDownloadURL({
            name: filename,
            scale: 30, 
          });
          makeDialogDownload(filename+" - NATURAL COLOR", makeLink(downloadUrl), "md");
        }),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var falseColorPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Button("FALSE COLOR (NIR, SWIR1, RED)", function(){
            var falseColor = ProductsManager().getFalseColorImage();
            map.addLayer(falseColor, {min: 0, max: 0.50}, imageSelect.getValue().LANDSAT_SCENE_ID + "_FALSE_COLOR");
        }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
        ui.Button("DOWNLOAD", function(){
          var falseColor = ProductsManager().getFalseColorImage();
          var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
          var downloadUrl = falseColor.select("NIR", "SWIR1", "RED").toFloat().getDownloadURL({
            name: filename,
            scale: 30, 
          });
          makeDialogDownload(filename + " - FALSE COLOR", makeLink(downloadUrl), "md");
        }),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var cloudMaskPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets: [
            ui.Button("CLOUD MASK", function(){
                var cloudMask = ProductsManager().getCloudMaskImage();
                map.addLayer(cloudMask, {
                  min: 0, 
                  max: 1, 
                  palette: ["000000", "FFFFFF"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_CLOUD_MASK");
            }, false, {width: "100%", margin: '10px 0px 0px 0px'}), 
          ],
          style: {width: "75%", margin: '0px'},
        }),
        ui.Button("DOWNLOAD", function(){
          var cloudMask = ProductsManager().getCloudMaskImage();
          var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
          var downloadUrl = cloudMask.rename("CLOUD_MASK").byte().getDownloadURL({
            name: filename,
            scale: 30, 
          });
          makeDialogDownload(filename + " - CLOUD MASK", makeLink(downloadUrl), "md");
        }),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var vegetationIndexColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px 0px 0px 0px'}});
var vegetationIndexPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets: [
            ui.Button("VEGETATION INDEX (NDVI)", function(){
                var ndvi = ProductsManager().getNDVIImage();
                map.addLayer(ndvi, {
                  min: 0, 
                  max: 1, 
                  palette: ["ce7e45","fad163", "74a909", "3a7405", "1a3b03"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_NDVI");
                vegetationIndexColorBarPanel.clear();
                vegetationIndexColorBarPanel.add(
                  makeColorBar({min: 0, max: 1, palette: ["ce7e45","fad163", "74a909", "3a7405", "1a3b03"]})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var ndvi = ProductsManager().getNDVIImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ndvi.select("NDVI").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - VEGETATION INDEX (NDVI)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'},
        }),
        vegetationIndexColorBarPanel,
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var elevationColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var elevationPanel = ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ELEVATION (DEM)", function(){
                var dem = ProductsManager().getDEMImage();
                map.addLayer(dem, {
                    min: 0, 
                    max: 3500, 
                    palette: ["193d30", "2e675e", "469890", "c7eae5", "bf812d", "54300b"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_NDVI");
                elevationColorBarPanel.clear();
                elevationColorBarPanel.add(
                  makeColorBar({min: 0, max: 3500, palette: ["193d30", "2e675e", "469890", "c7eae5", "bf812d", "54300b"]})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var dem = ProductsManager().getDEMImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = dem.select("DEM").int().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - ELEVATION (DEM)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'},
        }),
        elevationColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }), 
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var surfaceTemperatureColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var surfaceTemperaturePanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("SURFACE TEMPERATURE (Ts)", function(){ 
                var Ts = ProductsManager().getTsImage();
                map.addLayer(Ts, {
                  min: 280, 
                  max: 330, 
                  palette: ["fefccc", "fbd976", "f08c39", "ea4a33", "e43d32", "812026"]
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_Ts");
                surfaceTemperatureColorBarPanel.clear();
                surfaceTemperatureColorBarPanel.add(
                  makeColorBar({min: 280, max: 330, palette: ["fefccc", "fbd976", "f08c39", "ea4a33", "e43d32", "812026"]})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var Ts = ProductsManager().getTsImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = Ts.select("Ts").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - SURFACE TEMPERATURE (Ts)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'}
        }),
        surfaceTemperatureColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var EToColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var EToPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("GRASS REFERENCE ET (ETo)", function(){
                var ETo = ProductsManager().getEToImage();
                map.addLayer(ETo, {
                  min: 8, 
                  max: 10, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETo");
                EToColorBarPanel.clear();
                EToColorBarPanel.add(
                  makeColorBar({min: 8, max: 10, palette: SSEBop.ETaPalette})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var ETo = ProductsManager().getEToImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETo.select("ETo").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - GRASS REFERENCE ET (ETo)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'}
        }),
        EToColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var ETrColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var ETrPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ALFALFA REFERENCE ET (ETr)", function(){
                var ETr = ProductsManager().getETrImage();
                map.addLayer(ETr, {
                  min: 8, 
                  max: 10, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETr");
                ETrColorBarPanel.clear();
                ETrColorBarPanel.add(
                  makeColorBar({min: 8, max: 10, palette: SSEBop.ETaPalette})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var ETr = ProductsManager().getETrImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETr.select("ETr").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - ALFALFA REFERENCE ET (ETr)", makeLink(downloadUrl), "md");
            })
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'}
        }),
        ETrColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    }),
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var temperatureDifferenceColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var temperatureDifferencePanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("TEMPERATURE DIFFERENCE (dT)", function(){
                var dT = ProductsManager().getdTImage();
                map.addLayer(dT, {
                  min: 5, 
                  max: 15, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_dT");
                temperatureDifferenceColorBarPanel.clear();
                temperatureDifferenceColorBarPanel.add(
                  makeColorBar({min: 5, max: 15, palette: SSEBop.ETaPalette})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var dT = ProductsManager().getdTImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = dT.select("dT").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - TEMPERATURE DIFFERENCE (dT)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'}
        }),
        temperatureDifferenceColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var ETFractionColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var ETFractionPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ET FRACTION (ETf)", function(){
                var ETf = ProductsManager().getETfImage();
                map.addLayer(ETf, {
                  min: 0, 
                  max: 1.25, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETf");
                ETFractionColorBarPanel.clear();
                ETFractionColorBarPanel.add(
                  makeColorBar({min: 0, max: 1.25, palette: SSEBop.ETaPalette})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}),
            ui.Button("DOWNLOAD", function(){
              var ETf = ProductsManager().getETfImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETf.select("ETf").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - ET FRACTION (ETf)", makeLink(downloadUrl), "md");
            }),
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'}
        }),
        ETFractionColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var actualETColorBarPanel = ui.Panel({widgets: [], style: {margin: '0px'}});
var actualETPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[
        ui.Panel({
          widgets:[
            ui.Button("ACTUAL ET (ETa)", function(){
                var ETa = ProductsManager().getETaImage();
                map.addLayer(ETa, {
                  min: 0, 
                  max: 10, 
                  palette: SSEBop.ETaPalette
                }, imageSelect.getValue().LANDSAT_SCENE_ID + "_ETa");
                actualETColorBarPanel.clear();
                actualETColorBarPanel.add(
                  makeColorBar({min: 0, max: 10, palette: SSEBop.ETaPalette})
                );
            }, false, {width: "75%", margin: '10px 0px 0px 0px'}), 
            ui.Button("DOWNLOAD", function(){
              var ETa = ProductsManager().getETaImage();
              var filename = imageSelect.getValue().LANDSAT_SCENE_ID;
              var downloadUrl = ETa.select("ETa").toFloat().getDownloadURL({
                name: filename,
                scale: 30, 
              });
              makeDialogDownload(filename + " - ACTUAL ET (ETa)", makeLink(downloadUrl), "md");
            })
          ],
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {width: "100%", margin: '0px'}
        }),
        actualETColorBarPanel
      ], 
      layout: ui.Panel.Layout.flow("vertical"),
      style: {position:'top-center', margin: "0px", width: "100%"},
    })
  ],
  layout: ui.Panel.Layout.flow("vertical"),
});
var products = ui.Panel({
  widgets: [
    ui.Panel({
      widgets:[ui.Label("Products", {backgroundColor: "#337ab7", color: "#ffffff", margin: "0px", textAlign: 'left'})], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {backgroundColor: "#337ab7", position:'top-center', padding: "10px"},
    }),
    naturalColorPanel,
    falseColorPanel,
    cloudMaskPanel,
    vegetationIndexPanel,
    elevationPanel,
    surfaceTemperaturePanel,
    EToPanel,
    ETrPanel,
    temperatureDifferencePanel,
    ETFractionPanel,
    actualETPanel,
  ],
  style: {
    width: "100%",
    padding: '0px',
    margin: '0px',
  }
});
var footer = ui.Panel({
  widgets: [
    ui.Label("Realization:"),
    ui.Panel({
      widgets: [
        ui.Panel({
          widgets: [
            Icon(logoANA, {width: "100%"}),
            ui.Label("www.ana.gov.br", { margin: "0% 0% 0% 20%"}, "http://www.snirh.gov.br")
          ],
          layout: ui.Panel.Layout.flow("vertical"),
          style: {width: "50%", height: "100%", margin: '0px 0px 0px 25%'}
        })
      ],
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Label("Partners:"),
    ui.Panel({
      widgets: [
        Icon(logoUSGS, {width: "50%", height: "100%"}),
        Icon(logoAgrosatelite, {width: "40%", height: "100%", margin: "0% 0% 0% 5%"}),
      ],
      style: {width: "100%"},
      layout: ui.Panel.Layout.flow("horizontal"),
    }),
    ui.Panel({
      widgets: [
        ui.Label("www.usgs.gov", {width: "40%",  margin: "0% 0% 0% 9%"}, "https://earlywarning.usgs.gov/ssebop"),
        ui.Label("www.agrosatelite.com.br", {width: "45%",  margin: "0% 0% 0% 5%"}, "https://agrosatelite.com.br")
      ],
      style: {width: "100%"},
      layout: ui.Panel.Layout.flow("horizontal"),
    })
  ],
  style: {
    position: 'bottom-center',
    padding: '0px',
    margin: '0px',
  }
});
var panel = ui.Panel({
  widgets: [
    headerPanel,
    instructionsPanel,
    datePanel,
    parametersPanel,
    locationPanel,
    searchButton,
    footer
  ],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {
    width: '400px',
    height: '100%',
    maxHeight: 'calc(100vh - 70px)',
    border: '0.5px solid #000000',
    backgroundColor: "#FFFFFF",
    padding: '10px',
  }
});
var panelTimeSeries = ui.Panel({
  layout: ui.Panel.Layout.flow("vertical"),
  style: {
    position: 'bottom-right',
    width: '100%',
    height: '35%',
    border: '0.5px solid #000000',
    backgroundColor: "#FFFFFF",
    padding: '10px',
  }
});
var chartTimeSeries = ui.Label("Click anywhere point on the map to see the evapotranspiration time series.", {
  width: '100%',
  textAlign: 'center',
  fontSize: '20px',
});
panelTimeSeries.add(chartTimeSeries);
map.add(
  ui.Panel({
      widgets:[
        ui.Button("Delete all layers", function(){
          map.layers().reset();
        }, false, {width: "100%", margin: '0px', padding: '0px'}),
      ], 
      layout: ui.Panel.Layout.flow("horizontal"),
      style: {position:'top-right', margin: "0px", padding: '0px'},
  })
);
var panelMain = ui.Panel({
  widgets: [ui.SplitPanel(map, panelTimeSeries, "vertical")],
  layout: ui.Panel.Layout.flow("vertical"),
  style: {
    width: 'calc(100% - 400px)',
    height: '100%',
  }
});
ui.root.clear();
ui.root.insert(0, panel);
ui.root.insert(1, panelMain);
var ProductsManager = function(){
  return new function(){
    this.getTrueColorImage = function(){
      var imageNormalized = buildImage(currentImage);
      return imageNormalized.select("RED", "GREEN", "BLUE");
    };
    this.getFalseColorImage = function(){
      var imageNormalized = buildImage(currentImage);
      return imageNormalized.select("NIR", "SWIR1", "RED");
    };
    this.getNDVIImage = function(){
      var imageNormalized = buildImage(currentImage);
      var NDVI = imageNormalized.normalizedDifference(["NIR", "RED"]).rename("NDVI");
      return NDVI;
    };
    this.getCloudMaskImage = function(){
      var cloudMask = cloudUtils.cloudMask(currentImage);
      return cloudMask;
    };
    this.getDEMImage = function(){
      var dem = ee.Image("USGS/SRTMGL1_003")
        .rename("DEM")
        .clip(currentImage.geometry())
        .set("system:footprint", currentImage.geometry());
      return dem;
    };
    this.getTsImage = function(){
      var Ts = SSEBop.Ts(currentImage);
      return Ts;
    };
    this.getEToImage = function(){
        var ETo = ee.Image(SSEBop.ETo(weatherDataset.getValue(), currentImage.date(), currentImage.geometry()));
      return ETo;
    };
    this.getETrImage = function(){
        var ETr = ee.Image(SSEBop.ETr(weatherDataset.getValue(),currentImage.date(), currentImage.geometry()));
      return ETr;
    };
    this.getdTImage = function(){
      var dT = SSEBop.dT(dTDataset.getValue(), dTType.getValue(), currentImage.date(), currentImage.geometry());
      return dT;
    };
    this.getETfImage = function(){
      var ETf = SSEBop.ETf({
          "weather_dataset": weatherDataset.getValue(),
          "dT_dataset": dTDataset.getValue(),
          "dT_type": dTType.getValue(),
        },
        currentImage, 
        parseInt(cFactor_STD.getValue())
      );
      return ETf;
    };
    this.getETaImage = function(){
      var ETa = SSEBop.ETa({
          "weather_dataset": weatherDataset.getValue(),
          "dT_dataset": dTDataset.getValue(),
          "dT_type": dTType.getValue(),
        },
        currentImage, 
        parseInt(cFactor_STD.getValue())
      );
      return ETa;
    };
  }
};
function updateTimeSeries(){
  var start = startDate.getValue();
  var end = endDate.getValue();
  var roi = currentPoint;
  var currentCollection = landsat5Collection.filterDate(start, end).filterBounds(currentPoint)
    .merge(landsat7Collection.filterDate(start, end).filterBounds(currentPoint))
    //.merge(landsat7Collection.filterDate(start, end).filterDate("2012-01-01", "2013-04-01").filterBounds(currentPoint))
    .merge(landsat8Collection.filterDate(start, end).filterBounds(currentPoint))
    .filterMetadata("CLOUD_COVER", "less_than", 75);
  var currentCollectionETa = currentCollection
    .map(function(image){
      image = ee.Image(image);
      var clippedImage = image
        .clip(roi)
        .set("system:footprint", roi);
      var ndvi = SSEBop.NDVI(clippedImage);
      var ETo = SSEBop.ETo(
        weatherDataset.getValue(),
        image.date(),
        roi
      );
      var ETr = SSEBop.ETr(
        weatherDataset.getValue(),
        image.date(),
        roi
      );
      var ETa = SSEBop.ETa({
          "weather_dataset": weatherDataset.getValue(),
          "dT_dataset": dTDataset.getValue(),
          "dT_type": dTType.getValue(),
        },
        clippedImage, 
        parseFloat(cFactor_STD.getValue())
      );
      var layerStack = ETo
        .addBands(ETr)
        .addBands(ETa)
        .addBands(ndvi)
        .set("system:footprint", roi);
      return ee.Image(layerStack.copyProperties(image, ['system:index', 'system:time_start', 'system:time_end']));
    });
  var series = getSeries(currentCollectionETa, roi);
  var EToValues = series.map(function(item){
    return ee.Number(ee.List(item).get(-4));
  });
  var ETrValues = series.map(function(item){
    return ee.Number(ee.List(item).get(-3));
  });
  var ETaValues = series.map(function(item){
    return ee.Number(ee.List(item).get(-2));
  });
  var NDVIValues = series.map(function(item){
    return ee.Number(ee.List(item).get(-1));
  });
  var xValues = series.map(function(item){
    return julianUtils.millis2JulianDay(ee.Number(ee.List(item).get(-5)));
  });
  var interpolatedETo = dailySSEBop.buildArray(EToValues, xValues, start, end);
  var interpolatedETr = dailySSEBop.buildArray(ETrValues, xValues, start, end);
  var interpolatedETa = dailySSEBop.buildArray(ETaValues, xValues, start, end);
  var interpolatedNDVI = dailySSEBop.buildArray(NDVIValues, xValues, start, end);
  var datesIDW = ee.List(interpolatedETa.get("dates"));
  var xValuesIDW = datesIDW.map(function(value){
    return ee.Date(julianUtils.julianDay2Millis(ee.Number(value))).format("yyyy-MM-dd");
  });
  var observationsValues = datesIDW.map(function(value){
    return xValues.indexOf(value).gte(0).subtract(1);
  });
  var yValuesIDW = ee.Array.cat([
    // interpolatedETo.get("array"), 
    interpolatedETr.get("array"),
    interpolatedETa.get("array"),
    interpolatedNDVI.get("array"), 
    observationsValues,
  ], 1);
  panelTimeSeries.remove(chartTimeSeries);
  if(currentPoint === null || currentPoint == undefined){
    return;
  }
  var coordinates = currentPoint.toGeoJSON()["coordinates"].map(function(x){
    return Math.round(x * 100000) / 100000;
  });
  var title = "Actual Evapotranspiration Estimation (ETa)\n Period:" + String(start) + "/" + String(end) + " Coordinates:" + String(coordinates);
  chartTimeSeries = ui.Chart.array.values(yValuesIDW, 0, xValuesIDW)
  .setChartType('LineChart')
  // .setSeriesNames(['ETo', 'ETr', 'ETa', 'NDVI'])
  .setSeriesNames(['ETr', 'ETa', 'NDVI', 'Landsat Image'])
  .setOptions({
      title: title,
      titleTextStyle: {
         'fontSize': '14'
      },
      // colors: ['#a9e9fc', '#e5f497', '#0000FF', '#00FF00'],
      colors: ['#a9e9fc', '#0000FF', '#00FF00', 'FF0000'],
      series: {
        // 0: {targetAxisIndex:0, axis: 'ETo',  lineWidth: 0, pointSize: 1 },
        // 1: {targetAxisIndex:0, axis: 'ETr',  lineWidth: 0, pointSize: 1 },
        // 2: {targetAxisIndex:0, axis: 'ETa',  lineWidth: 3, pointSize: 0 },
        // 3: {targetAxisIndex:1, axis: 'NDVI', lineWidth: 3, pointSize: 0 },
        0: {targetAxisIndex:0, axis: 'ETr',  lineWidth: 3, pointSize: 0 },
        1: {targetAxisIndex:0, axis: 'ETa',  lineWidth: 3, pointSize: 0 },
        2: {targetAxisIndex:1, axis: 'NDVI', lineWidth: 3, pointSize: 0 },
        3: {targetAxisIndex:1, axis: 'Landsat Image', lineWidth: 0, pointSize: 4 },
      },
      vAxes: {
        0: {
          title: "Evapotranspiration (mm)",
          viewWindowMode:'explicit',
          viewWindow: {min:0, max:10},
        },
        1: {
          title: "NDVI",
          viewWindowMode:'explicit',
          viewWindow: {min:0, max:1}
        }
      },
      hAxis: {
        gridlines: {count: 10},
      },
  });
  chartTimeSeries.style().set({
    position: 'bottom-center',
    width: '100%',
    height: '100%',
  });
  panelTimeSeries.add(chartTimeSeries);
   // When the chart is clicked, update the map and label.
  chartTimeSeries.onClick(function(xValue, yValue, seriesName) {
    if (!xValue || seriesName !== 'Landsat Image'){
      return;
    }
    var date = ee.Date(xValue).getRange("day");
    var image = ee.Image(currentCollection
      .filter(ee.Filter.date(date.start(), date.end()))
      .first()
    );
    image.evaluate(function(feature){
      print(feature);
      var label = feature.properties.DATE_ACQUIRED + " / "
       + feature.properties.LANDSAT_SCENE_ID + " / "
       + "Cloud " + feature.properties.CLOUD_COVER + "% / "
       + "Tier " + feature.properties.COLLECTION_CATEGORY;
      panel.remove(imageSelect);
      imageSelect = buildImageSelect([{label: label, value: feature.properties}]);
      imageSelect.setValue(feature.properties);
      currentImage = image;
      panel.add(imageSelect);
      resetImage();
    });
  });
  map.addLayer(currentPoint,  {color: 'FF0000'}, String(coordinates));
}
map.onClick(function(latlong){
  apagaFeature();
  currentPoint = ee.Geometry.Point([latlong.lon, latlong.lat]);
  updateTimeSeries();
});
map.style().set('cursor', 'crosshair');
map.setOptions('satellite', {});
// ************************ UTILS *********************************
function makeLink(link){
  return ui.Panel({
    widgets: [
      ui.Label("Click", {fontSize: '25px'}),
      ui.Label("here", {fontSize: '25px'}, link),
      ui.Label("to download this product.", {fontSize: '25px'}),
    ], 
    layout: ui.Panel.Layout.flow("horizontal"),
    style: {
      margin: "20px 0px 30px 0px"
    }
  });
}
function getSeries(collection, roi){
  var series = collection
    .sort("system:time_start")
    .getRegion({
      geometry: roi, 
      scale: 30,
    });
  var seriesValues = series
    .slice(1)
    .map(function(list){
        return ee.Algorithms.If(
          ee.Algorithms.IsEqual(ee.List(list).get(-2), null),
          0,
          ee.List(list)
        );
    });
  seriesValues = ee.List(seriesValues).removeAll([0]);
  return seriesValues;
}
function makeColorBar(vis){
  var bar =  ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: vis.palette,
    },
    style: {stretch: 'horizontal', maxHeight: '24px', margin: '0px'},
  });
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 0px'}),
      ui.Label(vis.min + ((vis.max-vis.min) / 2), {margin: '4px 0px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 0px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var colorBar = ui.Panel([bar, legendLabels]);
  return colorBar;
}
function clearAllColorBars(){
  vegetationIndexColorBarPanel.clear();
  elevationColorBarPanel.clear();
  surfaceTemperatureColorBarPanel.clear();
  EToColorBarPanel.clear();
  ETrColorBarPanel.clear();
  temperatureDifferenceColorBarPanel.clear();
  ETFractionColorBarPanel.clear();
  actualETColorBarPanel.clear();
}
function extend(src, obj) {
    Object.keys(src).forEach(function(key) { 
      obj[key] = src[key]; 
    });
    return obj;
}
function apagaQuadro() {
  var element = null;
  var layers = map.layers();
  layers.forEach(function(lyr) {
    if (lyr.get('name') === 'Image export area'){
      element = lyr;
    }
  });
    layers.remove(element);
}
function apagaFeature() {
  var element = null;
  var layers = map.layers();
  layers.forEach(function(lyr) {
    if (lyr.getEeObject() instanceof ee.Feature) {
       element = lyr;
    }
  });
  layers.remove(element);
}