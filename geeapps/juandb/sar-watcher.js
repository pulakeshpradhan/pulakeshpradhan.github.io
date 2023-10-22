var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection([]);
// A UI to interactively filter a Sentinel-1 collection and
// create a multitemporal RGB mosaic
// Work in progress!!!
// by Juan Doblas
// Any thoughts, write to: juandb@gmail.com
// Based on Sentinel-1 explorer, by unknown. Lee filter programming by Guido Lemoine
// UI Pattern Template by  Tyler Erickson (tylere@google.com), Justin Braaten (braaten@google.com)
//
/***************************************************
 *CHANGE LOG *
 04/jun/21 Code refactoring. EN translation
 13/jun/19 Updated PRODES Info
 11/apr/18
 - Now the Landsat reference image is a mosaic covering the whole canvas, instead of a single scene
 06/apr/18
 - Updated collection name (S1_GRD_FLOAT)
 23/jan/18 
 - Added temporal adaptative filtering (Quegan&Yu,2001)
 - Major change: now the images are collected around three reference dates
 07/jan/18
 - Added new visualization mode: change over the whole period
 15/nov/17
 - Corrected bug that set the visualization status of the base layers to false after redraw
 - Added grid option to help manual mapping
 30/oct/17
 - Updated deforestation layers with last PRODES data
 - Updated initial dates
 - Updated Landsat 8 collection
 - Updated p2-p3 change detection mode 
*****************************************************/
/***************************************************
 * Model *
 ***************************************************/
var stbx=require('users/juandb/SAR_TBX:SAR_TBX')
// Define a JSON object for storing the data model.
var m = {};
m.title  =   'SAR Watcher'
m.subtitle = 'A tool for SAR-based visual monitoring based on the SIRAD methodology'
m.author   = 'Juan Doblas'
// Initial dates and window
m.date1  = ui.url.get('date1','2020-06-01')
m.date2  = ui.url.get('date2','2020-08-01')
m.date3  = ui.url.get('date3','2020-10-01')
m.temporalWindow = ui.url.get('window',30)
// Visualization modes
m.dvizmodes  = {
    'Multitemporal': {
      description: 'Each band represents the mean value of the VV backscattering for every period. ' +
                   'Different colors show changes on land cover.',
      visParams: {gamma: 1, bands: ['p1','p2','p3']},
    },
    'First period': {
      description: 'Mean backscattering intensity around t1.',
      visParams: {gamma: 1, bands: ['p1']},
    },
    'Second period': {
      description: 'Mean backscattering intensity around t2.',
      visParams: {gamma: 1, bands: ['p2']},
    },
    'Third period': {
      description: 'Mean backscattering intensity around t3.',
      visParams: {gamma: 1, bands: ['p3']},
    }
  };
m.modes = ['IW','EW']
m.dDeviation = ['Absolute values','Deviation from median']
m.bands = {
  'VV': {vizParamsA: [-14,-4], vizParamsD: [-5,5]},
  'VH': {vizParamsA: [-20,-8], vizParamsD: [-5,5]},
  'HH': {vizParamsA: [-14,-4], vizParamsD: [-5,5]},
  'HV': {vizParamsA: [-20,-8], vizParamsD: [-5,5]}
}
// Auxiliary layers
m.l1 = ee.Image("users/detersaree/DETER_SAR_ANCILLARY/PDigital2000_2020_AMZ_consolidada")
          .remap([28,22,20,21,26,19,24,25,18,23,11,13,12,10,14,9 , 8,16,17,15,29,27, 7, 6],
          [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
m.l2 = ee.Image("users/detersaree/DETER_SAR_ANCILLARY/PDigital2000_2020_AMZ_consolidada")
          .remap([29],[ 1])
m.l3 = ee.FeatureCollection("WCMC/WDPA/current/polygons")
// Interesting places (POIs)
m.POIs = {
          'Santarem (BR)': {
            params : {lat:-2.228,lon:-54.378,zoom:10},
            dates: {d1:'2018-08-01',d2:'2019-01-01',d3:'2020-06-01',w:60}
            },
          'Altamira (BR)': {
            params : {lat:-3.378481149375213,lon:-51.85414306640626,zoom:11},
            dates: {d1:'2018-08-01',d2:'2019-01-01',d3:'2020-06-01',w:60}
            },
          'Munduruku Territory (PA)': {
            params : {lat:-6.704471697452841,lon:-57.61016739549452,zoom:13},
            dates: {d1:'2021-01-01',d2:'2021-03-01',d3:'2021-05-01',w:30}
           },
          'Porto Velho (BR)': {
            params : {lat:-8.807287415323826,lon:-63.64514996817009,zoom:11.0},
            dates: {d1:'2021-01-01',d2:'2021-03-01',d3:'2021-05-01',w:30}
            },
          'Guaporé (BR/BOL)':{
            params: {lat:-12.467326,lon:-63.1551,zoom:11.0},
            dates: {d1:'2018-08-01',d2:'2019-01-01',d3:'2020-06-01',w:60}
          },
          'Pemba 2019 floodings': {
            params : {lat:-12.942368711420524,lon:40.49458166703919,zoom:12.0},
            dates: {d1:'2019-03-01',d2:'2019-04-01',d3:'2019-05-01',w:15}
            },
          'Suez canal (Egypt)': {
            params : {lat:29.92258832753121,lon:32.58506651232045,zoom:12.0},
            dates: {d1:'2021-01-01',d2:'2021-03-01',d3:'2021-05-01',w:30}
          }
}
m.orbits = ['Desc orbits','Asc orbits','All orbits']
// Sentinel-1 data collection
m.S1collection = ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT')
                   //.filterMetadata('instrumentMode','equals','IW')
                   //.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                   //.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                   //.map(stbx.maskEdgesDESCimg)
                   //.map(stbx.toGamma0natural)
                   //.select('VV','VH')
                   //.select('VVg0','VHg0')
m.stack = ee.Image()
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
var c = {}
// Title
c.title    = ui.Label({value: m.title})
c.subtitle = ui.Label({value: m.subtitle})
// Date selection
c.stitle    = ui.Label('1) Select central dates and temporal window:')
c.sl1       = ui.Label('t1:',{padding: '6px 0'})
c.sl2       = ui.Label('t2:',{padding: '6px 0'})
c.sl3       = ui.Label('t3:',{padding: '6px 0'})
c.st1       = ui.Textbox('YYYY-MM-DD',m.date1)
c.st2       = ui.Textbox('YYYY-MM-DD',m.date2)
c.st3       = ui.Textbox('YYYY-MM-DD',m.date3)
c.slw       = ui.Label('Temporal window (days):',{padding: '6px 0'})
c.stw       = ui.Textbox(30,m.temporalWindow)
c.numImgL   = ui.Label('Number of images for the selected period and band:')
c.numImg    = ui.Label('Please click on Create mosaic button')
c.orbitSel  = ui.Select({items:m.orbits})
c.modeSel   = ui.Select({items:m.modes})
c.createBtn = ui.Button('Create mosaic')
// Data selection
c.dtitle     = ui.Label('2) Select a visualization type')
c.dselect    = ui.Select({items: Object.keys(m.dvizmodes)})
c.bselect    = ui.Select({items: Object.keys(m.bands)})
c.dlabel     = ui.Label()
c.dDeviation = ui.Select({items:m.dDeviation})
c.dgamma     = ui.Checkbox({label:'Apply Terrain correction', value: ui.url.get('gamma',true)})
c.dfilter1   = ui.Checkbox({label:'Apply Lee Filter'})
c.dfilter2   = ui.Checkbox({label:'Apply Temporal Filter'})
// Additional features section
c.l1     = ui.Checkbox({label: 'Historical Clearcut Deforestation (BLA)', value: ui.url.get('l1',false)})
c.l2     = ui.Checkbox({label: '2020 Clearcut Deforestation (BLA)', value: ui.url.get('l2',false)})
c.l3     = ui.Checkbox({label: 'Protected Areas (worldwide)', value: ui.url.get('l3',false)})
//c.paname = ui.Label('Click on the map to get PA names',{fontSize:'10px'})
// Interesting places
c.ititle  = ui.Label('Poins of interest:',{fontSize:'10px'})
c.iselect = ui.Select({items: Object.keys(m.POIs),style:{fontSize:'10px'}})
c.ttitle  = ui.Label('Click anywhere to get a time series chart...',{fontSize:'10px'})
// Export user mapping section
c.mtitle  = ui.Label('3) Map anomalies and export them')
c.mintruc = ui.Label('Draw freely using the draw tools. '
                      +'When you are ready, press the Export button to export the drawn features')
c.mexport = ui.Button('Export geometries') 
c.mlink   = ui.Label()
// Credits
var credit_text = "Author: Juan Doblas | "+
              "Refined Lee coding: Guido Lemoine | "+
              "Protected areas: WDPA | "+
              "Brazil deforestation: INPE/PRODES | "+
              "BLA: Brazilian Legal Amazon"
var correspondance = "Thoughts, suggestions: write to juandb@gmail.com"              
c.c1 = ui.Label(credit_text)
c.c2 = ui.Label(correspondance)
/*******************************************************************************
 * Composition *
 *
 ******************************************************************************/
// Intro panel
c.intro       = ui.Panel([c.title,c.subtitle])
// Select dates panel
c.selectDates = ui.Panel([c.stitle,
                ui.Panel([c.sl1,c.st1], ui.Panel.Layout.flow('horizontal')),
                ui.Panel([c.sl2,c.st2], ui.Panel.Layout.flow('horizontal')),
                ui.Panel([c.sl3,c.st3], ui.Panel.Layout.flow('horizontal')),
                ui.Panel([c.slw,c.stw], ui.Panel.Layout.flow('horizontal')),
                ui.Panel([c.orbitSel,c.modeSel,c.createBtn], ui.Panel.Layout.flow('horizontal')),
                c.numImgL,
                c.numImg,
                ])
//Select data panel
c.dpanel      = ui.Panel([c.dtitle,
                          ui.Panel([c.dselect,c.bselect,c.dDeviation], ui.Panel.Layout.flow('horizontal')),
                          c.dlabel,
                          c.dgamma,
                          c.dfilter1,
                          c.dfilter2])
c.cpanel      = ui.Panel([c.c1,c.c2])
// Export panel
c.mpanel = ui.Panel([c.mtitle,c.mintruc,c.mexport,c.mlink])
// Layers panel
//c.lpanel = ui.Panel({widgets:[c.l1,c.l2,c.l3,c.paname],style:{position:'bottom-right'}})
c.lpanel = ui.Panel({widgets:[c.l1,c.l2,c.l3],style:{position:'bottom-right'}})
// POIs panel
c.ipanel = ui.Panel({widgets:[c.ititle,c.iselect,c.ttitle],style:{position:'bottom-left'}})
// Main panel
c.main        = ui.Panel([c.intro,c.selectDates,c.dpanel,c.mpanel,c.cpanel])
//ui.root.clear()
ui.root.insert(0,c.main)
/*******************************************************************************
 * Styling *
 *
 ******************************************************************************/
var body =  {
      margin: '8px 0 0px 8px',
      fontSize: '12px',
      color: 'gray'
  }
var body_textbox =  {
      margin: '8px 0 0px 8px',
      fontSize: '12px',
      color: 'black',
      width: '120px'
  }
var body_black =  {
      margin: '8px 0 0px 8px',
      fontSize: '12px',
      color: 'black'
  }
var section_title = {
  fontWeight:'bold'
}
var section_style = {margin: '10px 0 0 0'};
var box_style1 = {margin: '5px',width:'300px',border:'.5px solid grey'}
var box_style2 = {padding:'0px',margin: '5px',width:'150px',border:'.5px solid grey'}
var credit_style  = {fontSize: '10px'}
var s = {}
s.title =    {fontWeight: 'bold'  , fontSize: '24px', margin: '10px 5px'}
s.subtitle = {fontWeight: 'normal', fontSize: '18px', margin: '10px 5px'}
s.main =  {width: '320px', padding: '8px'}
c.title.style().set(s.title)
c.subtitle.style().set(s.subtitle)
c.intro.style().set(section_style)
c.stitle.style().set(section_title)
c.sl1.style().set(body)
c.sl2.style().set(body)
c.sl3.style().set(body)
c.slw.style().set(body)
c.st1.style().set(body_textbox)
c.st2.style().set(body_textbox)
c.st3.style().set(body_textbox)
c.stw.style().set(body_textbox).set({width:'37px'})
c.numImgL.style().set(body_black)
c.numImg.style().set(body)
c.dtitle.style().set(section_title)
c.mtitle.style().set(section_title)
c.dlabel.style().set(body)
c.selectDates.style().set(section_style)
c.dpanel.style().set(section_style)
c.mpanel.style().set(section_style)
c.lpanel.style().set(box_style1)
c.ipanel.style().set(box_style2)
c.mlink.style().set(body_textbox)
c.c1.style().set(credit_style)
c.c2.style().set(credit_style)
c.main.style().set(s.main)
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
c.orbitSel.onChange(selectOrbits)
c.modeSel.onChange(selectMode)
c.createBtn.onClick(refreshMosaic)
c.dselect.onChange(changeDoptions)
c.bselect.onChange(changeDoptions)
c.dDeviation.onChange(changeDoptions)
c.dgamma.onChange(changeDoptions)
c.dfilter1.onChange(changeDoptions)
c.dfilter2.onChange(changeDoptions)
function selectOrbits(value){
  ui.url.set('orbits',value)
  refreshMosaic()
}
function selectMode(value){
  ui.url.set('mode',value)
  refreshMosaic()
}
function changeDoptions(value){
  c.dlabel.setValue(m.dvizmodes[c.dselect.getValue()].description)
  ui.url.set('vizMode1',c.dselect.getValue())
  ui.url.set('vizMode2',c.dDeviation.getValue())
  ui.url.set('band',c.bselect.getValue())
  ui.url.set('gamma',c.dgamma.getValue())
  ui.url.set('vizFilter1',c.dfilter1.getValue())
  ui.url.set('vizFilter2',c.dfilter2.getValue())
  refreshMosaic()
}
c.l1.onChange(function(value){Map.layers().get(1).setShown(value);ui.url.set('l1',value)})
c.l2.onChange(function(value){Map.layers().get(2).setShown(value);ui.url.set('l2',value)})
c.l3.onChange(function(value){Map.layers().get(3).setShown(value);ui.url.set('l3',value)})
c.iselect.onChange(function(value){
  var params = m.POIs[value].params
  var dates  = m.POIs[value].dates
  Map.setCenter(params['lon'],params['lat'],params['zoom'])
  c.st1.setValue(dates['d1'])
  c.st2.setValue(dates['d2'])
  c.st3.setValue(dates['d3'])
  c.stw.setValue(dates['w'])
  refreshMosaic()
})
c.mexport.onClick(function(){
  c.mlink.setValue('[computing url...]')
  var layer = Map.drawingTools().layers().get(0)
  var fc= layer.getEeObject();
  print (fc)
  fc.getDownloadURL('KML', undefined, 'geometries',updateLink)
})
function updateLink(text){
  c.mlink.setValue('Click here to download geometries')
  c.mlink.setUrl(text)
}
function changeMapState(mapState) {
  ui.url.set('lat', mapState.lat)
  ui.url.set('lon', mapState.lon)
  ui.url.set('zoom', mapState.zoom)
}
/*
var clickHandler = function(click) {
  var point = ee.Geometry.Point([click.lon, click.lat]);
  var feats = m.l3.filterBounds(point);
  c.paname.setValue('[loading]');
  var names = feats.aggregate_array('NAME')
  var engs = feats.aggregate_array('DESIG_ENG')
  var texts = names.zip(engs).map(function(pair){
    return ee.String(ee.List(pair).get(0)).cat(" (").cat(ee.String(ee.List(pair).get(1))).cat(")")})
  texts.evaluate(updateLabel);
};
*/
var clickHandler = function(click) {
  var point = ee.Geometry.Point([click.lon, click.lat]);
  generateChart(point);
};
var resetiPanel = function(){
  c.ipanel = ui.Panel({widgets:[c.ititle,c.iselect,c.ttitle],style:{position:'bottom-left'}})
}
var generateChart = function (point) {
  var s1 = m.S1collection.filterBounds(Map.getBounds(true)).filterDate('2017-01-01',ee.Date(c.st3.getValue()).advance(1,'month'))
  // Filter orbit types
  if (c.orbitSel.getValue()=='Asc orbits')  {s1 = s1.filterMetadata('orbitProperties_pass','equals','ASCENDING')}
  if (c.orbitSel.getValue()=='Desc orbits') {s1 = s1.filterMetadata('orbitProperties_pass','equals','DESCENDING')}
  if (c.modeSel.getValue()=='IW') {s1 = s1.filterMetadata('instrumentMode','equals','IW')}
  if (c.modeSel.getValue()=='EW') {s1 = s1.filterMetadata('instrumentMode','equals','EW')}
  // Filter band
  s1 = s1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', c.bselect.getValue())).select([c.bselect.getValue(),'angle'])
  // Apply gamma correction if needed
  if (c.dgamma.getValue()) {s1 = s1.map(stbx.toGamma0natural).select(0)} 
  s1 = s1.select(0).map(stbx.toDB)
  // Add a dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  Map.layers().set(4, dot);
  // Make a chart from the time series.
  var sarChart = ui.Chart.image.series(s1, point, ee.Reducer.mean(), Map.getScale());
  // Customize the chart.
  sarChart.setOptions({
    title: 'Sentinel-1: time series. Resolution: ' + ee.Number(Map.getScale()).round().getInfo() +  
    'm.',
    vAxis: {title: 'Backscattering'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  c.ipanel.widgets().set(2, sarChart);
};
function updateLabel(texts){
  c.paname.setValue(texts)
}
function refreshMosaic() {
  ui.url.set('date1',c.st1.getValue())
  ui.url.set('date2',c.st2.getValue())
  ui.url.set('date3',c.st3.getValue())
  ui.url.set('window',c.stw.getValue())
  ui.url.set('mode',c.modeSel.getValue())
  ui.url.set('orbits',c.orbitSel.getValue())
  ui.url.set('band',c.bselect.getValue())
  // COMPUTE COLLECTION
  c.numImg.setValue('Computing...')
  var s1 = m.S1collection.filterBounds(Map.getBounds(true))
  // Filter orbit types
  if (c.orbitSel.getValue()=='Asc orbits')  {s1 = s1.filterMetadata('orbitProperties_pass','equals','ASCENDING')}
  if (c.orbitSel.getValue()=='Desc orbits') {s1 = s1.filterMetadata('orbitProperties_pass','equals','DESCENDING')}
  if (c.modeSel.getValue()=='IW') {s1 = s1.filterMetadata('instrumentMode','equals','IW')}
  if (c.modeSel.getValue()=='EW') {s1 = s1.filterMetadata('instrumentMode','equals','EW')}
  // Filter band
  s1 = s1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', c.bselect.getValue())).select([c.bselect.getValue(),'angle'])
  // Apply gamma correction if needed
  if (c.dgamma.getValue()) {s1 = s1.map(stbx.toGamma0natural).select(0)} 
  s1 = s1.select(0)
  // Get dates
  var t1v = c.st1.getValue()
  if (t1v) t1v = ee.Date(t1v)
  var t2v = c.st2.getValue()
  if (t2v) t2v = ee.Date(t2v)
  var t3v = c.st3.getValue()
  if (t3v) t3v = ee.Date(t3v)
  var twwv = parseInt(c.stw.getValue())
  if (twwv) twwv = ee.Number(twwv);
  // compute temporal components
  var midWindow=twwv.divide(2)
  var t1v1=t1v.advance(midWindow.multiply(-1),'day')
  var t1v2=t1v.advance(midWindow,'day')
  var t2v1=t2v.advance(midWindow.multiply(-1),'day')
  var t2v2=t2v.advance(midWindow,'day')
  var t3v1=t3v.advance(midWindow.multiply(-1),'day')
  var t3v2=t3v.advance(midWindow,'day')
  // Apply temporal filter to the collection
  if (c.dfilter2.getValue()){
    s1 = stbx.QueganYuFilter(s1.filterDate(t1v1.advance(-2,'years'),t3v2),stbx.makeMedianFilter(5))
  }
  // Compute deviation if selected
  if (c.dDeviation.getValue()==m.dDeviation[1]){
    var median = s1.filterDate(t1v1.advance(-2,'years'),t1v1).median()
    s1 = s1.map(function (img){return img.divide(median).copyProperties(img,['system:time_start'])})
  }
  var im1_col=s1.filterDate(t1v1,t1v2).aside(print)
  var im2_col=s1.filterDate(t2v1,t2v2).aside(print)
  var im3_col=s1.filterDate(t3v1,t3v2).aside(print)
  // Asinchronous computing of qt. of images
  var l1=im1_col.size().format('p1: %s ')
  var l2=im2_col.size().format('p2: %s ')
  var l3=im3_col.size().format('p3: %s ')
  var l=l1.cat(l2).cat(l3)
  l.evaluate(function(result){c.numImg.setValue(result)})
  var im1 = ee.Image(stbx.toDB(im1_col.mean()));
  var im2 = ee.Image(stbx.toDB(im2_col.mean()));
  var im3 = ee.Image(stbx.toDB(im3_col.mean()));
  // Generate a RL filtered image stack version
  if (c.dfilter1.getValue()){
    var im1 = ee.Image(stbx.toDB(stbx.refinedLeeFilter(stbx.toNatural(im1))))
    var im2 = ee.Image(stbx.toDB(stbx.refinedLeeFilter(stbx.toNatural(im2))))
    var im3 = ee.Image(stbx.toDB(stbx.refinedLeeFilter(stbx.toNatural(im3))))
  }
  m.stack=im1.addBands(im2).addBands(im3)
  m.stack=m.stack.select([0,1,2],['p1','p2','p3'])
  refreshMapLayer()
}
function refreshMapLayer() {
    Map.clear();
    Map.onChangeBounds(changeMapState)
    Map.onClick(clickHandler)
    Map.add(c.lpanel)
    Map.add(c.ipanel)
    //c.ipanel.widgets().set(2, c.ttitle);
    // Change viz options
    var visOption = m.dvizmodes[c.dselect.getValue()];
    var visParams = visOption.visParams
    visParams.min = m.bands[c.bselect.getValue()].vizParamsA[0]
    visParams.max = m.bands[c.bselect.getValue()].vizParamsA[1]
    if (c.dDeviation.getValue()==m.dDeviation[1]){
      visParams.min = m.bands[c.bselect.getValue()].vizParamsD[0]
      visParams.max = m.bands[c.bselect.getValue()].vizParamsD[1]
    }
    // Add layers
    Map.addLayer(m.stack, visParams, 'Composite RGB');
    Map.addLayer(m.l1,{palette:["555500"]},"Historical deforestation (BLA)",c.l1.getValue())
    Map.addLayer(m.l2,{palette:["FF0000"]},"2020 deforestation (BLA)",c.l2.getValue())
    Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(m.l3), 1, 3),{palette:["009b2f"]},"Protected Areas",c.l3.getValue())
    //Map.addLayer(ee.Image(app.P2019),{color:"999999"},'Prodes até 2019 (provisório)',app.VIS_BASE.l1)
    //Map.addLayer(ee.FeatureCollection(app.DTjan2020).filterMetadata("CLASSNAME","equals","DESMATAMENTO_CR").filterMetadata("VIEW_DATE","greater_than",ee.Date("2019-08-01").millis()),{color:"FF0000"},'DETER até jan 2020',app.VIS_BASE.l2)
    //Map.addLayer(ee.FeatureCollection(app.DTjan2020).filterMetadata("CLASSNAME","not_equals","DESMATAMENTO_CR").filterMetadata("VIEW_DATE","greater_than",ee.Date("2019-08-01").millis()),{color:"654321"},'DETER até jan 2020',app.VIS_BASE.l2)
    //Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_UCS), 1, 3),{"palette":["009b2f"]},'Unidades de Conservação',app.VIS_BASE.l3)
    //Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_TIS), 1, 3),{"palette":["e59f12"]},'Terras Indígenas',app.VIS_BASE.l4)
    //Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_MUN), 1, 1),{"palette":["9212a5"]},'Municípios',app.VIS_BASE.l5)
    //Map.addLayer(ee.Image().toByte().paint(ee.FeatureCollection(app.FT_ASS), 1, 2),{"palette":["1153a3"]},'Assentamentos',app.VIS_BASE.l6)
    //Map.addLayer(l8melhorCena,app.VIS_OPTIONS_L8,'Mosaico L8', app.VIS_BASE.l7)
    //Map.addLayer(gridLines ,{'palette': '000000', 'opacity': 0.5},"Malha de referencia",app.VIS_BASE.l8);
  }
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
// Initial position and zoom
m.Lat  = ui.url.get('lat',-2.228)
m.Long = ui.url.get('lon',-54.378)
m.Zoom = ui.url.get('zoom',10)
//
// Initial image visualization mode
c.orbitSel.setValue(ui.url.get('orbits','Desc orbits'), false)
c.modeSel.setValue(ui.url.get('mode','IW'), false)
c.dselect.setValue(ui.url.get('vizMode1','Multitemporal'), false)
c.bselect.setValue(ui.url.get('band','VH'),false)
c.dDeviation.setValue(ui.url.get('vizMode2','Absolute values'),false)
c.dfilter1.setValue(ui.url.get('f1',false),false)
c.dfilter2.setValue(ui.url.get('f2',false),false)
c.dgamma.setValue(ui.url.get('gamma',true),false)
// Initialize map
Map.setCenter(m.Long,m.Lat,m.Zoom)
Map.style().set('cursor', 'crosshair');
refreshMosaic()