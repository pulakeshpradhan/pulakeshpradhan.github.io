// A UI to interactively filter a Sentinel-1 collection and
// create a multitemporal RGB mosaic
// Work in progress!!!
// by Juan Doblas (Instituto Socioambiental)
// Any thoughts, write to: juan@socioambiental.org
// Based on Sentinel-1 explorer, by unknown. Lee filter programming by Guido Lemoine
// CHANGE LOG
// 11/apr/18
// - Now the Landsat reference image is a mosaic covering the whole canvas, instead of a single scene
// 06/apr/18
// - Updated collection name (S1_GRD_FLOAT)
// 23/jan/18 
// - Added temporal adaptative filtering (Quegan&Yu,2001)
// - Major change: now the images are collected around three reference dates
// 07/jan/18
// - Added new visualization mode: change over the whole period
// 15/nov/17
// - Corrected bug that set the visualization status of the base layers to false after redraw
// - Added grid option to help manual mapping
// 30/oct/17
// - Updated deforestation layers with last PRODES data
// - Updated initial dates
// - Updated Landsat 8 collection
// - Updated p2-p3 change detection mode (still beta)
//
var app = {};
var stack=ee.Image(1)
var l8melhorCena=ee.Image(1)
var gridLines=ee.Image(1)
// Estabelece as coordenadas e nível de zoom iniciais
var LatInicial=-3.22
var LongInicial=-52.17
var ZoomInicial=10
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Script SIRAD',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Sistema de Indicação Radar de Desmatamento ' +
               'utilizando imagens Sentinel-1.')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    selectExtent: ui.Select({
      items: Object.keys(app.EXTENTOPTIONS)
      }),
    t1: ui.Textbox('YYYY-MM-DD', '2018-01-15'),
    t2: ui.Textbox('YYYY-MM-DD', '2018-02-15'),
    t3: ui.Textbox('YYYY-MM-DD', '2018-03-15'),
    tww: ui.Textbox('','27'),
    rotuloNumImg: ui.Label('nd'),
    applyButton: ui.Button('Criar Mosaico', app.applyFilters),
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [ 
      ui.Label('Datas de referência e janela temporal ', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('t1:', app.HELP_TEXT_STYLE), app.filters.t1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('t2:', app.HELP_TEXT_STYLE), app.filters.t2], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('t3:', app.HELP_TEXT_STYLE), app.filters.t3], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('dias:', app.HELP_TEXT_STYLE), app.filters.tww], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Número de imagens promediadas nos três periodos definidos:'),
      app.filters.rotuloNumImg,
      ui.Label('Selecione a extensão do mosaico', {fontWeight: 'bold'}),
      ui.Panel([app.filters.selectExtent,app.filters.applyButton],ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  app.filters.selectExtent.setValue(app.filters.selectExtent.items().get(0));
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
    }),
    LeeOption: ui.Checkbox({
      label: 'Aplicar filtro Lee',
      value: false,
      onChange: function() {
        // Refresh the map layer.
        app.applyFilters();
      }
    }),
    QueganOption: ui.Checkbox({
      label: 'Aplicar filtro temporal',
      value: false,
      onChange: function() {
        // Refresh the map layer.
        app.applyFilters();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('Selecione um tipo de visualização', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label,
      app.vis.LeeOption,
      app.vis.QueganOption
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(4));
  // Base de referencia
  app.baseg = {
    chkProdes2016: ui.Checkbox({
      label: 'Prodes até 2016',
      value: false,
      onChange: function(checked) {
        Map.layers().get(1).setShown(checked)
        app.VIS_BASE.l1=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkProdes2017: ui.Checkbox({
      label: 'Prodes 2017 (definitivo)',
      value: false,
      onChange: function(checked) {
        Map.layers().get(2).setShown(checked)
        app.VIS_BASE.l2=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkUCs: ui.Checkbox({
      label: 'Unidades de Conservação Federais',
      value: false,
      onChange: function(checked) {
        Map.layers().get(3).setShown(checked)
        app.VIS_BASE.l3=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkTIS: ui.Checkbox({
      label: 'Terras Indígenas',
      value: false,
      onChange: function(checked) {
        Map.layers().get(4).setShown(checked)
        app.VIS_BASE.l4=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkMUN: ui.Checkbox({
      label: 'Municipios PA/MT',
      value: false,
      onChange: function(checked) {
        Map.layers().get(5).setShown(checked)
        app.VIS_BASE.l5=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkASS: ui.Checkbox({
      label: 'Assentamentos INCRA',
      value: false,
      onChange: function(checked) {
        Map.layers().get(6).setShown(checked)
        app.VIS_BASE.l6=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkL8: ui.Checkbox({
      label: 'Mosaico Landsat 8 do periodo',
      value: false,
      onChange: function(checked) {
        Map.layers().get(7).setShown(checked)
        app.VIS_BASE.l7=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    chkGrid: ui.Checkbox({
      label: 'Malha de referencia',
      value: false,
      onChange: function(checked) {
        Map.layers().get(8).setShown(checked)
        app.VIS_BASE.l8=checked;
           // Refresh the map layer.
           //app.refreshMapLayer();
      } 
    }),
    labelCreditos: ui.Label('Juan Doblas, Instituto Socioambiental, 2017', {fontSize:'small'})
  }
  app.baseg.panel = ui.Panel({
    widgets:[
      ui.Label('Base de referencia', {fontWeight: 'bold'}),
      app.baseg.chkProdes2016,
      app.baseg.chkProdes2017,
      app.baseg.chkUCs,
      app.baseg.chkTIS,
      app.baseg.chkMUN,
      app.baseg.chkASS,
      app.baseg.chkL8,
      app.baseg.chkGrid,
      app.baseg.labelCreditos
    ],
    style: app.SECTION_STYLE
  }); 
  /* The export section. */
  app.export = {
    ebutton: ui.Button({
      label: 'Exportar o mosaico como imagem',
      // React to the button's click event.
     onClick: function() {
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to GCS.
        Export.image.toDrive({
          image: stack.visualize(visOption.visParams),
          description: 'sentinel1_mosaico_multitemporal_AREA_PERIODO',
          scale: 10,
          maxPixels:2512890090
        })
      }
    }),
    ebutton2: ui.Button({
      label: 'Exportar o mosaico como tiles',
      // React to the button's click event.
     onClick: function() {
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export map to GCS.
        Export.map.toCloudStorage({
          image: stack.visualize(visOption.visParams),
          description: 'sentinel1_mosaico_multitemporal_AREA_PERIODO',
          bucket: 'rmtx',
          minZoom:4,
          maxZoom:15,
          fileFormat: 'png'
        })
      }
    }),
//    ebutton3: ui.Button({
//      label: 'Exportar poligonos como kml',
//      // React to the button's click event.
//      onClick: function() {
//        // Export polygons
//        Export.table.toDrive({
//          collection: geometry,
//          description:'poligonos_mapeados_AREA_DATA',
//          fileFormat: 'KML'
//        });
//      }
//    }),
//    ebutton4: ui.Button({
//      label: 'Duplicar mosaico atual (avançado)',
//      // React to the button's click event.
//      onClick: function() {
//        var stackAux=stack
//        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
//        Map.addLayer(stackAux, visOption.visParams, 'Camada auxiliar');
//      }
//    }),
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
//      ui.Label('4) Start an export', {fontWeight: 'bold'}),
      app.export.ebutton,
      app.export.ebutton2//,
//      app.export.ebutton3,
      //app.export.ebutton4
      ],
    style: app.SECTION_STYLE
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.filters.rotuloNumImg.setValue('Calculando...')
    var filtered = ee.ImageCollection(app.COLLECTION_ID).map(toDB).map(maskEdge)//.select([app.POLARIZATION]);
    var extentOption = app.EXTENTOPTIONS[app.filters.selectExtent.getValue()];
    if (extentOption===0) {
      filtered = filtered.filterBounds(Map.getBounds(true));
    }
    if (extentOption===1) {
      filtered = filtered.filterBounds(Map.getCenter());
    }
    var filtered0=QueganYuFilter(filtered.select(0),5)
    var filtered1=QueganYuFilter(filtered.select(1),5)
    if (app.vis.QueganOption.getValue()){filtered=filtered0.combine(filtered1)}
    // Set filter variables.
    var t1v = app.filters.t1.getValue();
    if (t1v) t1v = ee.Date(t1v);
    var t2v = app.filters.t2.getValue();
    if (t2v) t2v = ee.Date(t2v);
    var t3v = app.filters.t3.getValue();
    if (t3v) t3v = ee.Date(t3v);
    var twwv = app.filters.tww.getValue(); // tww=temporal window width
    if (twwv) twwv = ee.Number.parse(twwv);
    // Calculo das colecoes por periodo
    var midWindow=twwv.add(1).divide(2)
    var t1v1=t1v.advance(midWindow.multiply(-1),'day')
    var t1v2=t1v.advance(midWindow,'day')
    var t2v1=t2v.advance(midWindow.multiply(-1),'day')
    var t2v2=t2v.advance(midWindow,'day')
    var t3v1=t3v.advance(midWindow.multiply(-1),'day')
    var t3v2=t3v.advance(midWindow,'day')
    print ('Datas p1:',t1v1.format('YYYY-MM-dd'),t1v2.format('YYYY-MM-dd'))
    print ('Datas p2:',t2v1.format('YYYY-MM-dd'),t2v2.format('YYYY-MM-dd'))
    print ('Datas p3:',t3v1.format('YYYY-MM-dd'),t3v2.format('YYYY-MM-dd'))
    var im1_col=filtered.filterDate(t1v1,t1v2)
    var im2_col=filtered.filterDate(t2v1,t2v2)
    var im3_col=filtered.filterDate(t3v1,t3v2)
    print('Datas das imagens do periodo p1:')
    print(extractDates(im1_col))
    print('Datas das imagens do periodo p2:')
    print(extractDates(im2_col))
    print('Datas das imagens do periodo p3:')
    print(extractDates(im3_col))
    // Calculo asincrono do total de imagens
    var rotulo1=im1_col.size().format('p1: %s ')
    var rotulo2=im2_col.size().format('p2: %s ')
    var rotulo3=im3_col.size().format('p3: %s')
    var rotulo=rotulo1.cat(rotulo2).cat(rotulo3)
    rotulo.evaluate(function(resultado){
      app.filters.rotuloNumImg.setValue(resultado)
    })
    var im1vv = ee.Image(toDB(im1_col.select(0).map(toNatural).mean()));
    var im2vv = ee.Image(toDB(im2_col.select(0).map(toNatural).mean()));
    var im3vv = ee.Image(toDB(im3_col.select(0).map(toNatural).mean()));
    var im1vh = ee.Image(toDB(im1_col.select(1).map(toNatural).mean()));
    var im2vh = ee.Image(toDB(im2_col.select(1).map(toNatural).mean()));
    var im3vh = ee.Image(toDB(im3_col.select(1).map(toNatural).mean()));
    // Generate a dB version of the RL filtered image stack
    var im1vv_lee= ee.Image(toDB(RefinedLee(toNatural(im1vv))))
    var im2vv_lee= ee.Image(toDB(RefinedLee(toNatural(im2vv))))
    var im3vv_lee= ee.Image(toDB(RefinedLee(toNatural(im3vv))))
    var im1vh_lee= ee.Image(toDB(RefinedLee(toNatural(im1vh))))
    var im2vh_lee= ee.Image(toDB(RefinedLee(toNatural(im2vh))))
    var im3vh_lee= ee.Image(toDB(RefinedLee(toNatural(im3vh))))
    // Generate Lee version
    var stack_lee=im1vv_lee.addBands(im2vv_lee).addBands(im3vv_lee).addBands(im1vh_lee).addBands(im2vh_lee).addBands(im3vh_lee)
    stack=im1vv.addBands(im2vv).addBands(im3vv).addBands(im1vh).addBands(im2vh).addBands(im3vh)
    if (app.vis.LeeOption.getValue()){stack=stack_lee}
    stack=stack.select([0,1,2,3,4,5],['p1vv','p2vv','p3vv','p1vh','p2vh','p3vh'])
    // Get Landsat-8 for comparation purposes
    var l8col=ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA').filterBounds(Map.getBounds(true)).filterDate(t1v1,t3v2).sort('CLOUD_COVER',false);
    l8melhorCena=ee.Image(l8col.mosaic())
    //var datal8 = ee.Date(l8melhorCena.get('system:time_start'));
    //print('Data melhor imagem Landsat: ', datal8); // ee.Date
    var vizParams = {
      bands: ['B6', 'B5', 'B4'],
      min: 0.01,
      max: 0.5,
      gamma: [0.95, 1.1, 1]}
    var vizParamsB8 = {
      bands: ['B8'],
      min: 0.01,
      max: 0.25,
      gamma: [1.3]}
    // Computes mapping aid grid
    gridLines=createGrid(app.gridScale,ee.Feature(Map.getBounds(true)).buffer(app.gridScale).geometry())
    // Redisplay everything
    app.refreshMapLayer();
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    Map.addLayer(stack, visOption.visParams, 'Composite RGB');
    Map.addLayer(ee.Image("users/juandb/SIRAD_DATA/PRODES_desmatAcumulado_2016"),{},'Prodes 2016',app.VIS_BASE.l1)
    Map.addLayer(ee.FeatureCollection("users/juandb/SIRAD_DATA/PRODES_definitivo_2017"),{},'Prodes 2017',app.VIS_BASE.l2)
    Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_UCS), 1, 3),{"palette":["009b2f"]},'Unidades de Conservação',app.VIS_BASE.l3)
    Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_TIS), 1, 3),{"palette":["e59f12"]},'Terras Indígenas',app.VIS_BASE.l4)
    Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_MUN), 1, 1),{"palette":["9212a5"]},'Municípios',app.VIS_BASE.l5)
    Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_ASS), 1, 2),{"palette":["1153a3"]},'Assentamentos',app.VIS_BASE.l6)
    Map.addLayer(ee.Image(l8melhorCena),app.VIS_OPTIONS_L8,'Mosaico L8', app.VIS_BASE.l7)
    Map.addLayer(gridLines ,{'palette': '000000', 'opacity': 0.5},"Malha de referencia",app.VIS_BASE.l8);
    //Map.addLayer(ee.Image(l8melhorCena),app.VIS_OPTIONS_L8B8,'Cena L8B8', false
  };
}   
/** Creates the app constants. */
app.createConstants = function() {
  app.FT_UCS='ft:1DnN6jij1KKPF04OsEdBCqhUUWlrlad_6nN0Nma3I'
  app.FT_TIS='users/juandb/SIRAD_DATA/TIs_mai2018'
  app.FT_MUN='ft:1tHPugMfiZXFfwoNCdZqdOcz1fRpBNQtOT7gGkam5'
  app.FT_ASS='ft:173TRgqGmvCjGxww242guBEFmLwKqKbk1TqXmbEGV'
  app.COLLECTION_ID = 'COPERNICUS/S1_GRD_FLOAT';
  app.gridScale= 18000
  app.POLARIZATION='VH'
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.EXTENTOPTIONS={'Tela completa':0,'Centro':1}
  app.NDVIpalette= ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
  app.VIS_OPTIONS = {
    'composição multitemporal VV': {
      description: 'Cada banda representa a média das observações entre duas datas. ' +
                   'Tons coloridos indicam alteração da cobertura do solo.',
      visParams: {gamma: 1, min: -14, max: -4, bands: ['p1vv','p2vv','p3vv']}
    },
    'Imagem periodo 1 vv': {
      description: 'Imagem de retroespalhamento relativa a ' +
                   'média das observações no periodo t1-t2.',
      visParams: {gamma: 1, min: -14, max: -4, bands: ['p1vv']}
    },
    'Imagem periodo 2 vv': {
      description: 'Imagem de retroespalhamento relativa a ' +
                   'média das observações no periodo t2-t3.',
      visParams: {gamma: 1, min: -14, max: -4, bands: ['p2vv']}
    },
    'Imagem periodo 3 vv': {
      description: 'Imagem de retroespalhamento relativa a ' +
                   'média das observações no periodo t3-t4.',
      visParams: {gamma: 1, min: -14, max: -4, bands: ['p3vv']}
    },
    'composição multitemporal VH': {
      description: 'Cada banda representa a média das observações entre duas datas. ' +
                   'Tons coloridos indicam alteração da cobertura do solo.',
      visParams: {gamma: 1, min: -20, max: -8, bands: ['p1vh','p2vh','p3vh']}
    },
    'Imagem periodo 1 vh': {
      description: 'Imagem de retroespalhamento relativa a ' +
                   'média das observações no periodo t1-t2.',
      visParams: {gamma: 1, min: -20, max: -8, bands: ['p1vh']}
    },
    'Imagem periodo 2 vh': {
      description: 'Imagem de retroespalhamento relativa a ' +
                   'média das observações no periodo t2-t3.',
      visParams: {gamma: 1, min: -20, max: -8, bands: ['p2vh']}
    },
    'Imagem periodo 3 vh': {
      description: 'Imagem de retroespalhamento relativa a ' +
                   'média das observações no periodo t3-t4.',
      visParams: {gamma: 1, min: -20, max: -8, bands: ['p3vh']}
    },
    'Diferença total vh': {
      description: 'Composite RGB (mudança, mínimo, gradiente)' +
                   ' entre a primera e a última data',
      visParams: {min:[0.01,-20,0],max:[0.3,-8,10], bands: ['variation','min','diff_max']}
    }
  };
  app.VIS_OPTIONS_L8 = {  
      bands: ['B6', 'B5', 'B4'],
      min: 0.01,
      max: 0.5,
      gamma: [0.95, 1.1, 1]
  }
  app.VIS_OPTIONS_L8B8 = {
      bands: ['B8'],
      min: 0.01,
      max: 0.25,
      gamma: [1.3]
  }
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  }
  app.VIS_BASE= {
    l1: false,
    l2: false,
    l3: false,
    l4: false,
    l5: false,
    l6: false,
    l7: false,
    l8: false,
  }
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
      app.vis.panel,
      app.export.panel,
      app.baseg.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(LongInicial, LatInicial, ZoomInicial);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();
function toDB(img) {
  return ee.Image(img).log10().multiply(10.0).copyProperties(img,['system:time_start','sliceNumber']);
}
function toNatural(img) {
    return ee.Image(10.0).pow(img.select(0).divide(10.0)).copyProperties(img,['system:time_start','sliceNumber']);
}
function toGamma0(img) {
  return img.select(0).subtract(img.select(1).multiply(Math.PI/180.0).cos().log10().multiply(10.0));
}
// Função para calcular ENL em uma imagem S1, sobre uma area de referencia AOI
function computeENLS1(S1img,AOI){
  // This function computes ENL index on Sentinel-1 bands.
  // It will take in account only the first band
  S1img=ee.Image(S1img)
  S1img=S1img.select([0],['band'])
  var mean=ee.Number(S1img.reduceRegion(ee.Reducer.mean(),AOI,20).get('band'))
  var std=ee.Number(S1img.reduceRegion(ee.Reducer.stdDev(),AOI,20).get('band'))
  return (mean.divide(std)).pow(2)
}
// Função para filtrar uma coleçaõ seguindo a metodologia de Quagan&Yu, 2001
// Importante: a coleção deve estar em numeros naturais. N=tamanho do filtro espacial
function QueganYuFilter(imgCol,N){
  // This function will return a filtered collection
  // the filter is the proposed by Quegan&Yu (2011),
  // Warning: will only work on single scene time series on natural. No mosaics (for now), no DB
  var boxcar = ee.Kernel.square({radius: N, units: 'pixels', normalize: false});
  var imgColMedian = imgCol.map(function(img){return img.convolve(boxcar)})
  var correctionFactorCol=imgCol.map(function(img){return img.divide(img.convolve(boxcar))})
  var numberofsamples=imgCol.map(function(img){return img.divide(img)}).sum()
  var correctionFactor=correctionFactorCol.sum().divide(numberofsamples)
  return imgColMedian.map(function(img){return img.multiply(correctionFactor).copyProperties(img,['system:time_start','sliceNumber'])})
}
function extractDates(col){
  var datesList=ee.List(col.aggregate_array('system:time_start'));
  var datesListFmt=datesList.map(formatDate)
  return datesListFmt
}
function formatDate(date){
  return ee.Date(date).format('YYYY-MM-dd')
}
function maskEdge(img) {
  var mask = img.select(0).unitScale(-25, 5).multiply(255).toByte().connectedComponents(ee.Kernel.rectangle(1,1), 100);
  return img.updateMask(mask.select(0));  
}
// Function to create grid layer
function createGrid(gridScale, gridBounds) {
  var proj = stack.select([0]).projection();                                   // Solicit native projection - can change if desired
  var im = ee.Image.pixelLonLat().clip(gridBounds);                                   // create an image defined by each pixel's location
  var im2 = im.select([0]).add(im.select([1])).multiply(-1000000).int();        // creates an image where each pixel has a unique value --> diagonals aren't unique, but works if eightConnected is set to false below 
      im2 = im2.reproject(proj, null, gridScale);                                 // reproject image at the desired scale (gridScale)
  var grd = im2.reduceToVectors({                                               // vectorize pixels - Polygons
    geometry: gridBounds, 
    scale: gridScale, 
    geometryType: 'polygon',
    eightConnected: false,
    bestEffort: true,
    geometryInNativeProjection: true
  }); 
  var blank = ee.Image(0).mask(0).toByte();                                     // create a blank image,
  var grd_otln = blank.paint(grd, 3, 1);                                        // outline using color 3, width 1.
  return grd_otln
}
// helper to apply Lee filter to db images
function RefinedLeeDb(img){
  return  toDB(RefinedLee(toNatural(img)))
}
// The RL speckle filter
function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB!
  img=ee.Image(img)
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  return(result.arrayFlatten([['sum']]));
}