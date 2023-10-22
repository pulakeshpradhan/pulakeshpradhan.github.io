var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection([]);
/****************************************************
 * A interactive guide to rain cell radar anomalies *
 * Author: Juan Doblas Prieto                       *
 * Date: 2021-11-01                                 *
 ****************************************************/
var stbx=require('users/juandb/SAR_TBX:SAR_TBX')
var CMI_bands  = ee.List.sequence(1,16).map(function(num){return ee.String("CMI_C").cat(ee.Number(num).format('%02d'))})
var CMIT_bands = ee.List.sequence(1,16).map(function(num){return ee.String("CMI_C").cat(ee.Number(num).format('%02d')).cat('_T')})
var DQF_bands  = ee.List.sequence(1,16).map(function(num){return ee.String("DQF_C").cat(ee.Number(num).format('%02d'))})
// Define a JSON object for storing the data model.
var m = {};
m.title  =   'Storm Watcher'
m.subtitle = 'A visual tour through tropical storm-caused SAR anomalies'
m.author   = 'Juan Doblas'
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
m.goesVizParams = {bands:["CMI_C15_T","DIF_13_08","CMI_C07_T"],min:[210,0,210],max:[290,40,290]}
m.modes = ['IW','EW']
m.dDeviation = ['Absolute values','Deviation from median']
m.bands = {
  'VV': {vizParamsA: [-14,-4], vizParamsD: [-5,5]},
  'VH': {vizParamsA: [-20,-8], vizParamsD: [-5,5]},
  'HH': {vizParamsA: [-14,-4], vizParamsD: [-5,5]},
  'HV': {vizParamsA: [-20,-8], vizParamsD: [-5,5]}
}
// Auxiliary layers
m.l1 = ee.Image()
m.l2 = ee.Image()
m.l3 = ee.Image()
// Interesting places (POIs)
m.POIs = {
          'Bau, Pará - 5 May 2021': {
            params:  {lat:-7.4244,lon:-54.479,zoom:10}, 
            dates:   {d1:'2021-03-01',d2:'2021-05-05 09:15:50',d3:'2021-07-31',w:30}
            },
          'Cujubim, Rondônia - 27 november 2020': {
            params:  {lat:-9,lon:-62.57,zoom:10}, 
            dates:   {d1:'2020-07-01',d2:'2020-10-27 09:49:26',d3:'2021-01-31',w:30}
          },
          'Karitiana, Rondônia - 21 August 2020': {
            params:  {lat:-9.37,lon:-64.22,zoom:12}, 
            dates:   {d1:'2020-06-05',d2:'2020-08-21 09:58:10',d3:'2020-12-31',w:30}
          },
          'Paraupebas, Pará - 14 March 2021': {
            params:  {lat:-5.75041,lon:-49.6627,zoom:10}, 
            dates:   {d1:'2021-01-01',d2:'2021-03-14 08:59:37',d3:'2021-05-31',w:30}
          },
          'Manaus, Amazonas - 26 May 2021': {
            params:  {lat:-2.7956,lon:-59.5258,zoom:10}, 
            dates:   {d1:'2021-03-01',d2:'2021-05-26 09:39:48',d3:'2021-07-31',w:30}
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
// Anomaly selection
c.stitle    = ui.Label('1) Select anomaly:')
c.sselect =   ui.Select({items: Object.keys(m.POIs),style:{fontSize:'10px'}})
c.numImgL   = ui.Label('Number of images displayed:')
c.numImg    = ui.Label('')
c.orbitSel  = ui.Select({items:m.orbits})
c.modeSel   = ui.Select({items:m.modes})
// Data selection
c.dtitle     = ui.Label('2) Select a visualization type')
c.goestitle = ui.Label('GOES layer opacity')
c.goesslider= ui.Slider()
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
// Interesting places
c.ttitle  = ui.Label('Click anywhere to get a time series chart...',{fontSize:'10px'})
/*******************************************************************************
 * Composition *
 *
 ******************************************************************************/
// Intro panel
c.intro       = ui.Panel([c.title,c.subtitle])
// Select dates panel
c.selectAnomaly=ui.Panel([c.stitle, c.sselect])
//Select data panel
c.dpanel      = ui.Panel([c.dtitle,
                          ui.Panel([c.goestitle,c.goesslider], ui.Panel.Layout.flow('horizontal')),
                          ui.Panel([c.dselect,c.bselect,c.dDeviation], ui.Panel.Layout.flow('horizontal')),                
                          ui.Panel([c.orbitSel,c.modeSel], ui.Panel.Layout.flow('horizontal')),
                          c.dlabel,c.numImgL,c.numImg,
                          c.dgamma,
                          c.dfilter1,
                          c.dfilter2])
c.cpanel      = ui.Panel([c.c1,c.c2])
// Export panel
c.mpanel = ui.Panel([c.mtitle,c.mintruc,c.mexport,c.mlink])
// Layers panel
//c.lpanel = ui.Panel({widgets:[c.l1,c.l2,c.l3,c.paname],style:{position:'bottom-right'}})
//c.lpanel = ui.Panel({widgets:[c.l1,c.l2,c.l3],style:{position:'bottom-right'}})
// TS panel
c.ipanel = ui.Panel({style:{position:'bottom-left'}})
// Video panel
c.gpanel = ui.Panel({style:{position:'bottom-right'}})
// Main panel
c.main        = ui.Panel([c.intro,c.selectAnomaly,c.dpanel,c.mpanel,c.cpanel])
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
var box_style2 = {padding:'0px',margin: '5px',height:'220px',width:'600px',border:'.5px solid grey'}
var box_style3 = {padding:'0px',margin: '0px',height:'420px',width:'420px',border:'.5px solid grey'}
var credit_style  = {fontSize: '10px'}
var s = {}
s.title =    {fontWeight: 'bold'  , fontSize: '24px', margin: '10px 5px'}
s.subtitle = {fontWeight: 'normal', fontSize: '18px', margin: '10px 5px'}
s.main =  {width: '320px', padding: '8px'}
c.title.style().set(s.title)
c.subtitle.style().set(s.subtitle)
c.intro.style().set(section_style)
c.stitle.style().set(section_title)
c.sselect.style().set(body_black)
c.numImgL.style().set(body_black)
c.dtitle.style().set(section_title)
c.mtitle.style().set(section_title)
c.dlabel.style().set(body)
c.selectAnomaly.style().set(section_style)
c.dpanel.style().set(section_style)
c.mpanel.style().set(section_style)
//c.lpanel.style().set(box_style1)
c.ipanel.style().set(box_style2)
c.gpanel.style().set(box_style3)
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
c.goesslider.onSlide(changeGoesOpacity)
c.orbitSel.onChange(selectOrbits)
c.modeSel.onChange(selectMode)
//c.createBtn.onClick(refreshMosaic)
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
function changeGoesOpacity(value){
  Map.layers().get(1).setOpacity(value)
  ui.url.set('goesslider',value)
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
c.sselect.onChange(function(value){
  var params = m.POIs[value].params
  var dates  = m.POIs[value].dates
  Map.setCenter(params['lon'],params['lat'],params['zoom'])
  m.st1 = dates['d1']
  m.st2 = dates['d2']
  m.st3 = dates['d3']
  m.stw = dates['w']
  refreshMosaic()
  generateChart(ee.Geometry.Point(params['lon'],params['lat']))
  generateVideo(ee.Geometry.Point(params['lon'],params['lat']))
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
  generateVideo(point);
};
var generateChart = function (point) {
  var s1c = m.S1collection.filterBounds(Map.getBounds(true)).filterDate('2017-01-01',ee.Date(m.st3).advance(1,'month'))
  // Filter orbit types
  if (c.orbitSel.getValue()=='Asc orbits')  {s1c = s1c.filterMetadata('orbitProperties_pass','equals','ASCENDING')}
  if (c.orbitSel.getValue()=='Desc orbits') {s1c = s1c.filterMetadata('orbitProperties_pass','equals','DESCENDING')}
  if (c.modeSel.getValue()=='IW') {s1c = s1c.filterMetadata('instrumentMode','equals','IW')}
  if (c.modeSel.getValue()=='EW') {s1c = s1c.filterMetadata('instrumentMode','equals','EW')}
  // Filter band
  //s1 = s1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', c.bselect.getValue())).select([c.bselect.getValue(),'angle'])
  // Apply gamma correction if needed
  if (c.dgamma.getValue()) {s1c = s1c.map(stbx.toGamma0natural)} 
  s1c = s1c.select(0,1)
  s1c = s1c.map(stbx.toDB)
  // Add a dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the fith layer, so it shows up on top of the composite.
  Map.layers().set(2, dot);
  // Make a chart from the time series.
  var sarChart = ui.Chart.image.series(s1c, point, ee.Reducer.mean(), Map.getScale());
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
  c.ipanel.clear()
  c.ipanel.add(sarChart);
};
//Compute GOES video
function generateVideo(point){
    var datetime = ee.Date.parse('YYYY-MM-dd HH:mm:ss',m.st2)
    var GOEScol_filt2 = ee.ImageCollection("NOAA/GOES/16/MCMIPF").filterDate(datetime.advance(-4,'hours'),datetime.advance(4,'hours')).map(calibrateGOESimg)
    .map(function(img){return img.addBands(img.select(["CMI_C13_T"]).subtract(img.select(["CMI_C08_T"])).rename(["DIF_13_08"]))})
    var region = point.buffer(200000).bounds()
    var rgbVis = GOEScol_filt2.map(function(img) {return img.visualize(m.goesVizParams).clip(region);    })
    var gifParams = {'region': region,'dimensions': 400,'crs': 'EPSG:3857','framesPerSecond': 10}
    // Print the GIF URL to the console.
    c.gpanel.clear()
    c.gpanel.add(ui.Thumbnail(rgbVis, gifParams))
}
function updateLabel(texts){
  c.paname.setValue(texts)
}
function refreshMosaic() {
  ui.url.set('date1',m.st1)
  ui.url.set('date2',m.st2)
  ui.url.set('date3',m.st3)
  ui.url.set('window',m.stw)
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
  var t1v = m.st1
  if (t1v) t1v = ee.Date(t1v)
  var t2v = m.st2
  if (t2v) t2v = ee.Date.parse('YYYY-MM-dd HH:mm:ss',t2v)
  var t3v = m.st3
  if (t3v) t3v = ee.Date(t3v)
  var twwv = parseInt(m.stw)
  if (twwv) twwv = ee.Number(twwv);
  // compute temporal components
  var midWindow=twwv.divide(2)
  var t1v1=t1v.advance(midWindow.multiply(-1),'day')
  var t1v2=t1v.advance(midWindow,'day')
  //var t2v1=t2v.advance(midWindow.multiply(-1),'day')
  //var t2v2=t2v.advance(midWindow,'day')
  var t2v1=t2v.advance(-1,'day')
  var t2v2=t2v.advance(1,'day')
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
    //Map.add(c.lpanel)
    Map.add(c.ipanel)
    Map.add(c.gpanel)
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
    // Compute GOES layers
    var datetime = ee.Date.parse('YYYY-MM-dd HH:mm:ss',m.st2)
    var GOEScol_filt = ee.ImageCollection("NOAA/GOES/16/MCMIPF").filterDate(datetime.advance(-10,'minutes'),datetime)
    var img = calibrateGOESimg(GOEScol_filt.first())
    var goes_img = img.addBands(img.select(["CMI_C13_T"]).subtract(img.select(["CMI_C08_T"])).rename(["DIF_13_08"]))
    // Add layers
    Map.addLayer(m.stack, visParams, 'Composite RGB');
    Map.addLayer(goes_img, m.goesVizParams,'GOES DATA',true,c.goesslider.getValue())
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
// Initial dates and window
m.st1  = ui.url.get('date1','2020-06-01')
m.st2  = ui.url.get('date2','2020-08-01 00:00:00')
m.st3  = ui.url.get('date3','2020-10-01')
m.stw  = ui.url.get('window',10)
// Initial image visualization mode
c.goesslider.setValue(ui.url.get('goesslider',.5),false)
c.orbitSel.setValue(ui.url.get('orbits','Desc orbits'), false)
c.modeSel.setValue(ui.url.get('mode','IW'), false)
c.dselect.setValue(ui.url.get('vizMode1','Multitemporal'), false)
c.bselect.setValue(ui.url.get('band','VH'),false)
c.dDeviation.setValue(ui.url.get('vizMode2','Absolute values'),false)
c.dfilter1.setValue(ui.url.get('f1',false),false)
c.dfilter2.setValue(ui.url.get('f2',false),false)
c.dgamma.setValue(ui.url.get('gamma',true),false)
c.sselect.setValue(ui.url.get('poi','Bau, Pará - 5 May 2021'), true)
// Initialize map
//Map.setCenter(m.Long,m.Lat,m.Zoom)
Map.style().set('cursor', 'crosshair');
//refreshMosaic()
function calibrateGOESimg (image){return ee.Image(CMI_bands.iterate(applyScaleOffsetPerBand,image)).select(CMIT_bands)}
function applyScaleOffsetPerBand(band,image){
  band = ee.String(band)
  image = ee.Image(image)
  var offset = ee.Number(image.get(band.cat('_offset')));
  var scale =  ee.Number(image.get(band.cat('_scale')));
  return image.addBands(image.select(band).multiply(scale).add(offset).rename(band.cat('_T')))
}