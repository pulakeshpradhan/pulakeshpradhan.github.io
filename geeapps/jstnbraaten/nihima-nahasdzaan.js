/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var m = {};
m.landsat = {};
m.landsat.col = ee.ImageCollection('projects/KalmanGFwork/GFLandsat_V1');
m.chaptersFc = ee.FeatureCollection('projects/ee-jstnbraaten/assets/navajo_nation_chapters');
// print(m.chaptersFc.aggregate_array('Chapter').sort());
m.chapterList_english = ["ALAMO","ANETH","BAAHAALII","BACA/PREWITT","BECENTI","BECLAHBITO","BIRD SPRINGS","BLACK MESA","BODAWAY GAP","BURNHAM","CAMERON","CASAMERO LAKE","CHICHILTAH","CHILCHINBETO","CHINLE","CHURCHROCK","COALMINE MESA","COPPERMINE","CORNFIELDS","COUNSELOR","COVE","COYOTE CANYON","CROWNPOINT","CRYSTAL","DENNEHOTSO","DILKON","FOREST LAKE","FORT DEFIANCE","GADIAHI","GANADO","GREASEWOOD SPRINGS","HARD ROCK","HOGBACK","HOUCK","HUERFANO","INDIAN WELLS","INSCRIPTION HOUSE","IYANBITO","JEDDITO","KAIBETO","KAYENTA","KINLICHEE","KLAGETOH","LAKE VALLEY","LECHEE","LEUPP","LITTLEWATER","LOW MOUNTAIN","LUKACHUKAI","LUPTON","MANUELITO","MANY FARMS","MARIANO LAKE","MEXICAN SPRINGS","MEXICAN WATER","NAGEEZI","NAHAT'A'DZIL","NAHODISHGISH","NASCHITTI","NAVAJO MOUNTAIN","NAZLINI","NEWCOMB","OAK SPRINGS","OJO ENCINO","OLJATO","PINEDALE","PINON","PUEBLO PINTADO","RAMAH","RED LAKE","RED MESA","RED ROCK","RED VALLEY","ROCK POINT","ROCK SPRINGS","ROUGH ROCK","ROUND ROCK","SAINT MICHAELS","SAN JUAN / NENAHNEZAD","SANOSTEE","SAWMILL","SHEEP SPRINGS","SHIPROCK","SHONTO","SMITH LAKE","STANDING ROCK","STEAMBOAT","SWEET WATER","TACHEE/BLUEGAP","TEEC NOS POS","TEESTO","THOREAU","TOHAJILEE","TOHATCHI","TOLANI LAKE","TONALEA","TORREON","TSAILE/WHEATFIELDS","TSAYATOH","TSELANI","TUBA CITY","TWIN LAKES","TWO GREY HILLS","UPPER FRUITLAND","WHIPPOORWILL","WHITE CONE","WHITEHORSE LAKE","WHITEROCK","WIDE RUINS"];
m.chapterList = ["AYAAI DIWOZHII BII'TO","AYANI BITO'","BAAH HAALI","BE'AK'ID BAA'A'OOGEED","BE'AK'ID HALCHII'","BE'AK'ID HALGAAI","BE'AK'ID HOTEELI","BE'AK`ID BAA AHOODZANI","BEESH HAAGEED","BILAGAANASNEEZ","BIS DAH LITSO","BIS DOOTL'IZH NIDEESHGIIZH","BITL'AAH BITO'","CH'IHOOTSO","CH'INILI","CHECH'IL BIYAADOO TO DEEZLI","CHECH'ILTAH","CHILCHIN BII' TO","DA'AH'EH HALANI","DENAHOOTSO","DIBE BITO LITSOOI","DLO'AYAZHI","DOO'ALK'AII","DZIL NA'OODILLII","GAD LI'AI","HOOSHDODII TO","HOYEE","JADI HADIT'IIH'","JADI TO","JEED DEEZ'A","K'AABINI NAS LA","K'AI'BII' TO","K'IILTSOOITAH","KIN DAH LICHI'I","KIN HOZHON'I","KIN LIGAAI","KIN NITEEL","KITS'IILI'","LEEJIN HAAGEED","LEEYI'TO","LICHII'DAH AZKANI","LICHII'II","LIILGAII BITO'","LOK'AA'CH'EGAI","LOK'AAH NITEEL","MA'II TEEH YITLIZHI","MA'II TO'I","NA'NEELZHIIN","NA'NI'A","NAAKAII BITO'I","NAAKAII TO","NAATA'A'NII NEEZ","NAATSIS'AAN","NAAYIZI","NAHATA'DZIL","NAHODEESHGIIZH","NAHODEESHGLIZH CH'INILINI","NASHASHCH'IDI","NAZLINI","NI'IIJIIH HASANI","NIINAHNIZAAD","OOLJEE'TO","SHAA'TOHI'","T'AA BIICH'IIDII","T'EEL CHI'INIT'","T'IIS NASBAS","T'IIS NIDEESH GIIZH","T'IIS TO","T'IIS TSOH","T'IISTS'OOZ NIDEESHGIIZH","T'IISTSOH SIKAAD","TL'OHCHINI","TO AL CHI'DI","TO ALTS'ISI","TO BEEWIISGANI","TO HAACH'I'","TO HAHADLEEH","TO HAJIILEEHE","TO LANI","TO LIKAN","TO NANEESDIZI","TO NEHELIIH","TO NILS'ILI","TO'DINEESHZHEE'","TOOHNILI","TS'AH BII'KIN","TSE ALNAOZT'I'I","TSE CH'IZHI","TSE CH'IZHI","TSE DAA T'EES","TSE DILDO'I","TSE HOOTSOOI","TSE LA'AHI","TSE LICHII","TSE LICHII' DAH AZKANI","TSE NAHADZOH","TSE NIKANI","TSE NITSAA DEEZ'AHI","TSE SI'ANI","TSE'DAAK'A","TSE'LANI","TSEHILI/TO DZIS'S/TSE ZHINI","TSELGAII","TSETA'TO AK'OLI","TSEYAA TO","TSIDII TOII","TSIIZIZII","TSIN NAZBAS SI'A","TSINAABAAS HABITIIN","TSIYI BE'AK'ID"];
// Export.table.toFeatureView({
//   collection: m.chaptersFc,
//   assetId: 'projects/ee-jstnbraaten/assets/navajo_nation_chapters_fv',
//   description: 'navajo_nation_chapters_fv',
//   maxFeaturesPerTile: 500
// });
// print(m.landsat.col.first())
// print(m.landsat.col.filter(ee.Filter.eq('year', 2010)))
// Map.addLayer(m.landsat.col.first())
var years = [];
for (var y = 2010; y <= 2020; y++) {years.push(y.toString())} 
var months = [
  {label: 'Jan', value: 1},
  {label: 'Feb', value: 2},
  {label: 'Mar', value: 3},
  {label: 'Apr', value: 4},
  {label: 'May', value: 5},
  {label: 'Jun', value: 6},
  {label: 'Jul', value: 7},
  {label: 'Aug', value: 8},
  {label: 'Sep', value: 9},
  {label: 'Oct', value: 10},
  {label: 'Nov', value: 11},
  {label: 'Dec', value: 12}
];
var bands = [
  {label: 'Blue', value: 'B1_mean_post'},
  {label: 'Green', value: 'B2_mean_post'},
  {label: 'Red', value: 'B3_mean_post'},
  {label: 'NIR', value: 'B4_mean_post'},
  {label: 'SWIR1', value: 'B5_mean_post'},
  {label: 'SWIR2', value: 'B7_mean_post'},
];
var smoothSelectItems = [
  {label: 'No smoothing', value: false},
  {label: 'Median', value: ee.Reducer.median()},
  {label: 'Min', value: ee.Reducer.min()},
  {label: 'Max', value: ee.Reducer.max()},
  {label: 'Mode', value: ee.Reducer.mode()},
];
var defaultVis = {
  trueColor: {
    bands: ['B3_mean_post', 'B2_mean_post', 'B1_mean_post'],
    min: [0, 0, 0],
    max: [0.35, 0.35, 0.35],
    gamma: [1, 1, 1]
  }
};
// For RGB options
// https://code.earthengine.google.com/94dc358134676843a3c9aff288ce914e
var img = m.landsat.col.filter(ee.Filter.eq('year', 2010))
  .filter(ee.Filter.eq('month', 10)).first();
var thumbParams = {
  'redGreenBlue': {
    bands: ['B3_mean_post', 'B2_mean_post', 'B1_mean_post'],
    min: [0.01, 0.01, 0.01],
    max: [0.27, 0.27, 0.27],
    gamma: [0.9, 0.9, 0.9],
  },
  'swir1NirRed': {
    bands: ['B5_mean_post', 'B4_mean_post', 'B3_mean_post'],
    min: [0.01, 0.01, 0.01],
    max: [0.45, 0.45, 0.45],
    gamma: [0.9, 0.9, 0.9],
  },
  'nirRedGreen': {
    bands: ['B4_mean_post', 'B3_mean_post', 'B2_mean_post'],
    min: [0.01, 0.01, 0.01],
    max: [0.3, 0.3, 0.3],
    gamma: [0.9, 0.9, 0.9],
  },
  'nirSwir1Red': {
    bands: ['B4_mean_post', 'B5_mean_post', 'B3_mean_post'],
    min: [0.01, 0.01, 0.01],
    max: [0.45, 0.45, 0.45],
    gamma: [0.9, 0.9, 0.9],
  }
};
m.landsat.years = years;
m.landsat.months = months;
m.landsat.bands = bands;
/*******************************************************************************
 * Components *
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
function makeYearMonthSelector(title, yearList, monthList) {
  var yearLabel = ui.Label('Year:', {fontSize: '12px', margin: '16px 0px 0px 0px'});
  var yearSelector = ui.Select(yearList, null, '2010');
  var monthLabel = ui.Label('Month:', {fontSize: '12px', margin: '16px 0px 0px 26px'});
  var monthSelector = ui.Select(monthList, null, 7);
  return ui.Panel([
    yearLabel, yearSelector, monthLabel, monthSelector], ui.Panel.Layout.flow('horizontal'), {margin: '0px 8px', stretch: 'horizontal'});
}
c.smoothKernLabel = ui.Label('Radius:', {fontSize: '12px'});
c.smoothKernSlider = ui.Slider({
  min: 1, max: 7, value: 3, step:1, style: {stretch: 'horizontal'}});
c.smoothKernPanel = ui.Panel([c.smoothKernLabel, c.smoothKernSlider], ui.Panel.Layout.flow('horizontal'));
c.imgSelectionLabel = ui.Label('Image', {color: 'grey', fontWeight: 'bold'});
c.imgSelection = makeYearMonthSelector('Select ', m.landsat.years, m.landsat.months);
c.chapterSelectorTitle = ui.Label('Chapter', {color: 'grey', fontWeight: 'bold'});
c.chapterSelectorLabel = ui.Label('Chapter:', {fontSize: '12px', margin: '16px 0px 0px 0px'});
c.chapterSelector = ui.Select(m.chapterList, 'Select a Chapter', null, null, null, {stretch: 'horizontal', margin: '8px 0px 8px 8px'});
c.chaperHighlightCkbx = ui.Checkbox({label: 'Highlight boundary', value: true, style: {fontSize: '12px'}});
c.chapterPanel = ui.Panel([c.chapterSelectorLabel, c.chapterSelector], ui.Panel.Layout.flow('horizontal'), {margin: '0px 8px'});
function makeBandSelector(label, hexColor) {
  var color = ui.Label(label, {height: '29px', width: '240px', margin: '8px 0px 0px 0px', padding: '4px', color: '#ffffff', fontWeight: 'bold', fontSize: '12px', backgroundColor: hexColor})
  //var color = ui.Panel({style: {height: '29px', width: '240px', margin: '8px 0px 0px 0px', backgroundColor: hexColor}});
  var colorSelector = ui.Select({items: m.landsat.bands, style: {width: '105px'}});
  return ui.Panel([color, colorSelector], ui.Panel.Layout.flow('horizontal'));
}
function makeVisParamSlider(reduceMargin) {
  var labelStyle = {fontSize: '12px', margin: '8px 0px 0px 0px'};
  var textStyle = {fontSize: '12px'};
  var lessMargin = '0px 0px 0px -30px';
  var min = ui.Panel([
    ui.Label('Min:', labelStyle),
    ui.Slider(0, 1, 0.0, 0.01, null, 'horizontal', false, textStyle)
  ], ui.Panel.Layout.flow('horizontal'));
  var max = ui.Panel([
    ui.Label('Max:', labelStyle),
    ui.Slider(0, 1, 0.4, 0.01, null, 'horizontal', false, textStyle)
  ], ui.Panel.Layout.flow('horizontal'));
  max.style().set('margin', lessMargin);
  var gamma = ui.Panel([
    ui.Label('Gamma:', labelStyle),
    ui.Slider(0, 3, 1, 0.1, null, 'horizontal', false, textStyle)
  ], ui.Panel.Layout.flow('horizontal'));
  gamma.style().set('margin', lessMargin);
  var minMaxGam = ui.Panel([min, max, gamma], ui.Panel.Layout.flow('horizontal'));
  if (reduceMargin) {
    minMaxGam.style().set({margin: '-8px 0px 0px 0px'});
  }
  return minMaxGam;
}
c.r = {};
c.g = {};
c.b = {};
c.rgb = {};
function makeRgbPanel() {
  var extraTopMargin = {margin: '4px 0px 0px 0px'};
  var rBand = makeBandSelector('Red color channel settings', '#ff0000');  //   '#e74c3c'
  var rVis = makeVisParamSlider(true);
  var gBand = makeBandSelector('Green color channel settings', '#447821');  //   '#2ecc71'
  var gVis = makeVisParamSlider(true);
  var bBand = makeBandSelector('Blue color channel settings', '#0044aa'); // '#3498db'
  var bVis = makeVisParamSlider(true);
  var rgbVis = makeVisParamSlider(false);
  gBand.style().set(extraTopMargin);
  bBand.style().set(extraTopMargin);
  c.r.band = rBand.widgets().get(1);
  c.r.min = rVis.widgets().get(0).widgets().get(1);
  c.r.max = rVis.widgets().get(1).widgets().get(1);
  c.r.gamma = rVis.widgets().get(2).widgets().get(1);
  c.g.band = gBand.widgets().get(1);
  c.g.min = gVis.widgets().get(0).widgets().get(1);
  c.g.max = gVis.widgets().get(1).widgets().get(1);
  c.g.gamma = gVis.widgets().get(2).widgets().get(1);
  c.b.band = bBand.widgets().get(1);
  c.b.min = bVis.widgets().get(0).widgets().get(1);
  c.b.max = bVis.widgets().get(1).widgets().get(1);
  c.b.gamma = bVis.widgets().get(2).widgets().get(1);
  c.rgb.min = rgbVis.widgets().get(0).widgets().get(1);
  c.rgb.max = rgbVis.widgets().get(1).widgets().get(1);
  c.rgb.gamma = rgbVis.widgets().get(2).widgets().get(1);
  c.rgb.label = ui.Label('All color channels', {height: '29px', stretch: 'horizontal', fontSize: '12px', fontWeight: 'bold', margin: '8px 0px 0px 0px', padding: '4px', backgroundColor: 'grey', color: '#ffffff'});
  return ui.Panel([
    rBand,
    rVis,
    gBand,
    gVis,
    bBand,
    bVis,
    c.rgb.label,
    rgbVis
  ], null, {margin: '0px 8px'});
}
c.rgbLabel = ui.Label('Custom color', {color: 'grey', fontWeight: 'bold'});
c.rgbPanel = makeRgbPanel();
c.hillLabel = ui.Label('Hillshade', {color: 'grey', fontWeight: 'bold'});
c.hillExagLabel = ui.Label('Intensity:', {fontSize: '12px'});
c.hillExagSlider = ui.Slider({
  min: 0, max: 10, value: 0, step: 1, style: {stretch: 'horizontal'}});
c.hillPanel = ui.Panel([
  c.hillExagLabel, c.hillExagSlider], ui.Panel.Layout.flow('horizontal'));
c.smoothLabel = ui.Label('Smoothing', {color: 'grey', fontWeight: 'bold'});
c.smoothMethodLabel = ui.Label('Method:', {fontSize: '12px'});
c.smoothMethodSelect = ui.Select(smoothSelectItems, null, false, null, null, {stretch: 'horizontal'});
c.smoothMethodPanel = ui.Panel([
  c.smoothMethodLabel, c.smoothMethodSelect], ui.Panel.Layout.flow('horizontal'));
c.smoothKernLabel = ui.Label('Radius:', {fontSize: '12px'});
c.smoothKernSlider = ui.Slider({
  min: 1, max: 7, value: 3, step:1, style: {stretch: 'horizontal'}});
c.smoothKernPanel = ui.Panel([c.smoothKernLabel, c.smoothKernSlider], ui.Panel.Layout.flow('horizontal'));
c.resetVisButton = ui.Button({label: 'Reset visualization', style: {stretch: 'horizontal'}});
c.resetVisButton.onClick(setDefault);
c.thumbGallery = ui.Panel(null, ui.Panel.Layout.flow('horizontal', true), {width: '356px', margin: '0px 8px'});
function makeThumb(visParams) {
  var region = ee.Geometry.BBox(-109.1756, 36.7679, -108.8927, 36.8294);
  var img = m.landsat.col.filter(ee.Filter.eq('year', 2010))
    .filter(ee.Filter.eq('month', 10)).first();
  var imgVis = img.divide(10000).visualize(visParams);
  return ui.Thumbnail(imgVis, {dimensions: 173, region: region}, null, 
  {width: '173px', height: '60px', margin: '2px'});
}
c.thumb1 = makeThumb(thumbParams.redGreenBlue);
c.thumb1.style().set({border: '4px solid #0044aa'});
c.thumb2 = makeThumb(thumbParams.swir1NirRed);
c.thumb2.style().set({border: '4px solid white'});
c.thumb3 = makeThumb(thumbParams.nirRedGreen);
c.thumb3.style().set({border: '4px solid white'});
c.thumb4 = makeThumb(thumbParams.nirSwir1Red);
c.thumb4.style().set({border: '4px solid white'});
c.thumbGallery.add(c.thumb1);
c.thumbGallery.add(c.thumb2);
c.thumbGallery.add(c.thumb3);
c.thumbGallery.add(c.thumb4);
c.thumbGalleryLabel = ui.Label('Present color', {color: 'grey', fontWeight: 'bold'});
c.exportImg = ui.Button('Export image', null, null, {color: '#0044aa'});
c.exportLink = ui.Label('Download image', {shown: false, backgroundColor: 'rgba(0,0,0,0.0)'});
c.exportPanel = ui.Panel([c.exportImg, c.exportLink], null, {position: 'bottom-right', backgroundColor: 'rgba(255,255,255,0.85)'});
c.aboutDataButton = ui.Button('About the imagery', null, null, {stretch: 'horizontal'});
c.aboutDataLabel = ui.Label('The imagery used in this app are monthly Landsat composites from the HISTARFM database. ' +
  'Each Landsat satellite collects a new image of the same location every 16 days. Clouds and data anomalies can be ' +
  'present in each image. Removing clouds and filling gaps with clear pixels from similar time periods produces continuous ' +
  'image mosaics. Note that the image processing procedure sets water and snow as a background value which is shown as black ' +
  'in this app.', {fontSize: '12px', margin: '4px 8px 0px 8px', color: 'grey'});
c.aboutDataLink = ui.Label('Learn more about the HISTARFM database', {fontSize: '12px'}, 'https://developers.google.com/earth-engine/tutorials/community/histarfm-cloud-and-gap-free-landsat');
c.aboutDataPanel = ui.Panel([c.aboutDataLabel, c.aboutDataLink], null, {shown: false});
c.aboutData = ui.Panel([c.aboutDataButton, c.aboutDataPanel]);
function showAboutData() {
  if (c.aboutDataPanel.style().get('shown')) {
    c.aboutDataPanel.style().set('shown', false);
  } else {
    c.aboutDataPanel.style().set('shown', true);
  }
}
c.aboutDataButton.onClick(showAboutData);
c.dividers = {};
c.dividers.divider0 = ui.Panel();
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
c.dividers.divider5 = ui.Panel();
var s = {};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '8px 0px'  // '20px 0px'
};
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
c.compareButton = ui.Button('Compare another date', null, null, {stretch: 'horizontal'});
c.controlPanel = ui.Panel([
  c.imgSelectionLabel,
  c.imgSelection,
  c.compareButton,
  c.dividers.divider0,
  c.chapterSelectorTitle,
  c.chapterPanel,
  c.chaperHighlightCkbx,
  c.dividers.divider1,
  c.thumbGalleryLabel,
  c.thumbGallery,
  c.dividers.divider2,
  c.rgbLabel,
  c.rgbPanel,
  c.dividers.divider3,
  c.hillLabel,
  c.hillPanel,
  c.dividers.divider4,
  c.smoothLabel,
  c.smoothMethodPanel,
  c.smoothKernPanel,
  c.dividers.divider5,
  c.resetVisButton,
  c.aboutData
  ], null, {width: '375px', maxWidth: '375px'});
c.map = ui.Map();
c.map.setControlVisibility({zoomControl: false})
c.splitPanel = ui.SplitPanel(c.controlPanel, c.map);
c.imgSelection2Label = ui.Label(
  'Select a second image date\nto compare with left side',
  {whiteSpace: 'pre'});
c.imgSelection2 = makeYearMonthSelector('Select ', m.landsat.years, m.landsat.months);
c.imgSelection2.widgets().get(1).setValue('2020', false);
c.imgSelection2.widgets().get(3).setValue(7, false);  // Jul
c.swipe = ui.Button('Compare using wipe', null, null, {stretch: 'horizontal'});
c.comparePanel = ui.Panel([
  c.imgSelection2, c.swipe
], null, {position: 'top-right'});
c.mapL = ui.Map();
c.mapR = ui.Map();
c.mapR.add(c.comparePanel);
c.split = ui.SplitPanel(c.mapL, c.mapR);
c.mapLinker = ui.Map.Linker([c.map, c.mapL, c.mapR]);
c.splitPanelPanel = ui.Panel([c.split]);
function switchMap() {
  if (c.compareButton.getLabel() == 'Compare another date') {
    ui.root.widgets().get(0).setSecondPanel(c.splitPanelPanel);
    c.compareButton.setLabel('Stop comparing dates');
    //c.mapL.centerObject(c.map.getCenter(), c.map.getZoom());
  } else {
    ui.root.widgets().get(0).setSecondPanel(c.map);
    c.compareButton.setLabel('Compare another date');   
  }
  // c.mapL.layers().forEach(function(layer) {
  //   layer.setOpacity(1)
  // })
  // c.mapR.layers().forEach(function(layer) {
  //   layer.setOpacity(1)
  // })
}
c.compareButton.onClick(switchMap);
function switchCompareMethod() {
  if (c.swipe.getLabel() == 'Compare using wipe') {
    c.swipe.setLabel('Compare using side-by-side');
    c.split.setWipe(true);
  } else {
    c.swipe.setLabel('Compare using wipe');
    c.split.setWipe(false);    
  }
}
c.swipe.onClick(switchCompareMethod);
c.map.add(c.exportPanel);
var text = 
'Did you know that the light tells stories? We’ve seen Mother Earth\n' +
'from our eyes on the ground, but how can we see her, as a whole, from above?\n\n' +
'Satellite imagery can capture the point in time when the sky meets the Earth,\n' +
'allowing us to see the energy we are all apart of, revealing different layers of light.\n' +
'Use this app to change the layers of the satellite imagery to see what different\n' +
'combinations of layers reveal on the Earth’s surface. Choose a year, month, location,\n' +
'and a different wavelength of light for red, green, and blue. Play with sliders to\n' +
'see how the imagery changes. What stories can the light tell?\n\n' +
'Want to print your image? Click the button on the bottom right to export the display.\n';
var spinnerUri = 'data:image/png;base64,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';
// I made it by finding a GIF spinner, resizing it, then uploading to https://www.base64-image.de/
// Copy the resulting data URI for HTML <img> and paste in the Code Editor or add to JSON object
// like shown above. You can also create the URI in Python with the base64 library.
var logo = ui.Label({imageUrl: spinnerUri, style: {backgroundColor: 'rgba(0,0,0,0.0)', textAlign: 'center', stretch: 'horizontal', whiteSpace: 'pre', margin: '0px 0px 0px 0px'}});
// var aboutTitle = ui.Label('Nihimá Nahasdzáán', {textAlign: 'center', stretch: 'horizontal', whiteSpace: 'pre', fontFamily: 'mono', fontSize: '45px', fontWeight: 'bold', margin: '70px'})
// var aboutLabel = ui.Label(text, {textAlign: 'center', whiteSpace: 'pre', stretch: 'horizontal', fontFamily: 'monospace', fontSize: '30px'})
// var goTo = ui.Button('Start exploring', null, null, {stretch: 'horizontal'})
// var aboutPanel = ui.Panel([aboutTitle, aboutLabel, goTo], null, {stretch: 'horizontal', backgroundColor: 'white'});
// var aboutTitle = ui.Label('Nihimá Nahasdzáán', {stretch: 'horizontal', whiteSpace: 'pre', fontFamily: 'mono', fontSize: '45px', fontWeight: 'bold', margin: '70px 8px'})
// var aboutLabel = ui.Label(text, {whiteSpace: 'pre', stretch: 'horizontal', fontFamily: 'mono', fontSize: '30px'})
// var goTo = ui.Button('Start exploring')
// var aboutPanel = ui.Panel([aboutTitle, aboutLabel, goTo], null, {stretch: 'horizontal', backgroundColor: 'white'});
var aboutTitle = ui.Label('Nihimá Nahasdzáán', {textAlign: 'left', stretch: 'horizontal', whiteSpace: 'pre', fontFamily: 'Arial', fontSize: '40px', fontWeight: 'bold', margin: '50px 0px 20px 0px', backgroundColor: 'rgba(0,0,0,0.0)', color: '#505050'})
var aboutSubtitle = ui.Label('What is your home sunshine story?', {textAlign: 'left', stretch: 'horizontal', whiteSpace: 'pre', fontFamily: 'Arial', fontSize: '23px', fontWeight: 'bold', margin: '10px 0px 20px 0px', backgroundColor: 'rgba(0,0,0,0.0)', color: '#505050'})
var aboutLabel = ui.Label(text, {textAlign: 'center', whiteSpace: 'pre', stretch: 'horizontal', fontFamily: 'Arial', fontSize: '20px', backgroundColor: 'rgba(0,0,0,0.0)', color: '#505050'})
var goTo = ui.Button('START EXPLORING  🔍', null, null, {textAlign: 'center', stretch: 'horizontal', color: '#0044aa', margin: '10px 8px 0px 280px', width: '250px'})
var aboutPanel = ui.Panel([ui.Panel([logo, ui.Panel([aboutTitle, aboutSubtitle], null, {backgroundColor: 'rgba(0,0,0,0.0)'})], ui.Panel.Layout.flow('horizontal'), {stretch: 'horizontal', backgroundColor: 'rgba(0,0,0,0.0)'}), aboutLabel, goTo], null, {stretch: 'horizontal', backgroundColor: 'rgba(255,255,255,0.85)', padding: '20px 20px 20px 20px', position: 'top-left'});
var aboutApp = ui.Button('About this app', null, null, {margin: '8px 0px 8px 50px', shown: true, color: '#0044aa'});
function showHideAboutApp() {
  if (aboutPanel.style().get('shown')) {
    aboutPanel.style().set('shown', false)
    c.map.setControlVisibility({zoomControl: true})
    //aboutApp.style().set('shown', true)
  } else {
    aboutPanel.style().set('shown', true)
    c.map.setControlVisibility({zoomControl: false})
    //aboutApp.style().set('shown', false)    
  }
}
aboutApp.onClick(showHideAboutApp)
goTo.onClick(showHideAboutApp)
c.map.add(aboutPanel)
//c.map.add(aboutApp)
c.imgSelection.add(aboutApp)
ui.root.widgets().reset([c.splitPanel]);
// ui.root.widgets().reset([aboutPanel]);
// function switchToApp() {
//   
// }
// goTo.onClick(switchToApp)
/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
/* Example
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
*/
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define a JSON object for defining CSS-like class style properties.
var s = {};
/* Example
s.legend.title = {
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
};
c.legend.title.style().set(s.legend.title);
*/
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
function addHillshade(img) {
  var mult = -0.5 + c.hillExagSlider.getValue();
  var hillshade = ee.Terrain.hillshade({
    input: ee.Image('NASA/NASADEM_HGT/001').select('elevation').multiply(mult),
    azimuth: 150,
    elevation: 45 // 30
  }).divide(255);
  var max = 160 + (mult * 2.5);  // 135
  var imgHill = img.multiply(hillshade);
  return imgHill.visualize({min: 0, max: max, gamma: 1});
}
var fvParams = {
  polygonStrokeOpacity: 0.8,
  polygonStrokeWidth: 1.5,
  polygonStrokeColor: 'black',
  polygonFillOpacity: 0
};
var fvLayer = ui.Map.FeatureViewLayer({
  assetId: 'projects/ee-jstnbraaten/assets/navajo_nation_chapters_fv',
  visParams: fvParams,
  name: 'Chapters'
});
var fvLayerL = ui.Map.FeatureViewLayer({
  assetId: 'projects/ee-jstnbraaten/assets/navajo_nation_chapters_fv',
  visParams: fvParams,
  name: 'Chapters'
});
var fvLayerR = ui.Map.FeatureViewLayer({
  assetId: 'projects/ee-jstnbraaten/assets/navajo_nation_chapters_fv',
  visParams: fvParams,
  name: 'Chapters'
});
function makeRgbImg(imgInfo) {
  var visParams = {
    bands: [c.r.band.getValue(), c.g.band.getValue(), c.b.band.getValue()],
    min: [c.r.min.getValue()*10000, c.g.min.getValue()*10000, c.b.min.getValue()*10000],
    max: [c.r.max.getValue()*10000, c.g.max.getValue()*10000, c.b.max.getValue()*10000],
    gamma: [c.r.gamma.getValue(), c.g.gamma.getValue(), c.b.gamma.getValue()],
  };
  var img = m.landsat.col.filter(ee.Filter.eq('year', imgInfo.year))
    .filter(ee.Filter.eq('month', imgInfo.month)).first();
  var imgVis = img.visualize(visParams);
  if (c.hillExagSlider.getValue() > 0) {
    imgVis = addHillshade(imgVis);
  }
  if (c.smoothMethodSelect.getValue()) {
    imgVis = smooth(imgVis);
  }
  return ee.Image(0).visualize().blend(imgVis).floor().toByte();
}
c.map.setOptions('TERRAIN');
function updateImage() {
  var imgInfo = {
    year: parseInt(c.imgSelection.widgets().get(1).getValue()),
    month: c.imgSelection.widgets().get(3).getValue(),
  };
  var rgbImg = makeRgbImg(imgInfo);
  var imgLayer = ui.Map.Layer(rgbImg, null, 'Image');
  var imgLayerL = ui.Map.Layer(rgbImg, null, 'Image');
  c.map.layers().set(0, imgLayer);
  c.mapL.layers().set(0, imgLayerL);
  if (c.map.layers().length() == 1) {
    c.map.layers().set(1, fvLayer);
    c.mapL.layers().set(1, fvLayerL);
    // c.mapL.layers().get(1).setOpacity(1);
  }
  hideDownloadLink();
}
function updateCompareImage() {
  var imgInfo = {
    year: parseInt(c.imgSelection2.widgets().get(1).getValue()),
    month: c.imgSelection2.widgets().get(3).getValue(),
  };
  var rgbImg = makeRgbImg(imgInfo);
  var imgLayer = ui.Map.Layer(rgbImg, null, 'Image');
  c.mapR.layers().set(0, imgLayer);
  if (c.mapR.layers().length() == 1) {
    c.mapR.layers().set(1, fvLayerR);
  }
}
c.imgSelection.widgets().get(1).onChange(updateImage);
c.imgSelection.widgets().get(3).onChange(updateImage);
c.imgSelection2.widgets().get(1).onChange(updateCompareImage);
c.imgSelection2.widgets().get(3).onChange(updateCompareImage);
c.r.band.onChange(updateImage);
c.r.min.onChange(updateImage);
c.r.max.onChange(updateImage);
c.r.gamma.onChange(updateImage);
c.r.band.onChange(updateCompareImage);
c.r.min.onChange(updateCompareImage);
c.r.max.onChange(updateCompareImage);
c.r.gamma.onChange(updateCompareImage);
c.g.band.onChange(updateImage);
c.g.min.onChange(updateImage);
c.g.max.onChange(updateImage);
c.g.gamma.onChange(updateImage);
c.g.band.onChange(updateCompareImage);
c.g.min.onChange(updateCompareImage);
c.g.max.onChange(updateCompareImage);
c.g.gamma.onChange(updateCompareImage);
c.b.band.onChange(updateImage);
c.b.min.onChange(updateImage);
c.b.max.onChange(updateImage);
c.b.gamma.onChange(updateImage);
c.b.band.onChange(updateCompareImage);
c.b.min.onChange(updateCompareImage);
c.b.max.onChange(updateCompareImage);
c.b.gamma.onChange(updateCompareImage);
c.rgb.min.onChange(changeRgb);
c.rgb.max.onChange(changeRgb);
c.rgb.gamma.onChange(changeRgb);
// c.hillCheck.onChange(updateImage);
c.hillExagSlider.onChange(updateImage);
c.hillExagSlider.onChange(updateCompareImage);
c.smoothMethodSelect.onChange(updateImage);
c.smoothMethodSelect.onChange(updateCompareImage);
c.smoothKernSlider.onChange(updateImage);
c.smoothKernSlider.onChange(updateCompareImage);
function changeRgb() {
  var min = c.rgb.min.getValue();
  var max = c.rgb.max.getValue();
  var gamma = c.rgb.gamma.getValue();
  c.r.min.setValue(min, false);
  c.r.max.setValue(max, false);
  c.r.gamma.setValue(gamma, false);
  c.g.min.setValue(min, false);
  c.g.max.setValue(max, false);
  c.g.gamma.setValue(gamma, false);
  c.b.min.setValue(min, false);
  c.b.max.setValue(max, false);
  c.b.gamma.setValue(gamma, false);
  updateImage();
  updateCompareImage();
}
function setDefault() {
  var dflt = defaultVis.trueColor
  c.r.band.setValue(dflt.bands[0], false);
  c.r.min.setValue(dflt.min[0], false);
  c.r.max.setValue(dflt.max[0], false);
  c.r.gamma.setValue(dflt.gamma[0], false);
  c.g.band.setValue(dflt.bands[1], false);
  c.g.min.setValue(dflt.min[1], false);
  c.g.max.setValue(dflt.max[1], false);
  c.g.gamma.setValue(dflt.gamma[1], false);
  c.b.band.setValue(dflt.bands[2], false);
  c.b.min.setValue(dflt.min[2], false);
  c.b.max.setValue(dflt.max[2], false);
  c.b.gamma.setValue(dflt.gamma[2], false);
  c.hillExagSlider.setValue(0);
  c.thumbGallery.widgets().forEach(function(el) {
    el.style().set('border', '3px solid white');
  });
  c.thumbGallery.widgets().get(0).style().set({border: '3px solid #0044aa'});
  c.smoothMethodSelect.setValue(false, false);
  updateImage();
  updateCompareImage();
}
function setVisBands(visParams) {
  c.r.band.setValue(visParams.bands[0], false);
  c.r.min.setValue(visParams.min[0], false);
  c.r.max.setValue(visParams.max[0], false);
  c.r.gamma.setValue(visParams.gamma[0], false);
  c.g.band.setValue(visParams.bands[1], false);
  c.g.min.setValue(visParams.min[1], false);
  c.g.max.setValue(visParams.max[1], false);
  c.g.gamma.setValue(visParams.gamma[1], false);
  c.b.band.setValue(visParams.bands[2], false);
  c.b.min.setValue(visParams.min[2], false);
  c.b.max.setValue(visParams.max[2], false);
  c.b.gamma.setValue(visParams.gamma[2], false);
  updateImage();
  updateCompareImage();
}
function smooth(img) {
  return img.reduceNeighborhood({
      reducer: c.smoothMethodSelect.getValue(),
      kernel: ee.Kernel.circle(c.smoothKernSlider.getValue())
  });
}
function updateThumbBorder(thisThumb) {
  c.thumbGallery.widgets().forEach(function(el) {
    el.style().set('border', '3px solid white');
  });
  thisThumb.style().set({border: '3px solid #0044aa'});
}
c.thumb1.onClick(function(thisThumb) {
  updateThumbBorder(thisThumb);
  setVisBands(thumbParams.redGreenBlue);
});
c.thumb2.onClick(function(thisThumb) {
  updateThumbBorder(thisThumb);
  setVisBands(thumbParams.swir1NirRed);
});
c.thumb3.onClick(function(thisThumb) {
  updateThumbBorder(thisThumb);
  setVisBands(thumbParams.nirRedGreen);
});
c.thumb4.onClick(function(thisThumb) {
  updateThumbBorder(thisThumb);
  setVisBands(thumbParams.nirSwir1Red);
});
function chapterHighlight() {
  if (c.chaperHighlightCkbx.getValue()) {
    fvParams.rules = [{
      filter: ee.Filter.eq('NAVNAME', c.chapterSelector.getValue()),
      polygonStrokeWidth: 4,
      polygonStrokeColor: 'blue'
    }];
  } else {
    fvParams.rules = []; 
  }
  fvLayer.setVisParams(fvParams);
  fvLayerL.setVisParams(fvParams);
  fvLayerR.setVisParams(fvParams);
}
c.chaperHighlightCkbx.onChange(chapterHighlight);
function zoomCenter() {
  chapterHighlight();
  c.map.centerObject(
    m.chaptersFc.filter(
      ee.Filter.eq('NAVNAME', c.chapterSelector.getValue())), 10);
  c.mapL.centerObject(
    m.chaptersFc.filter(
      ee.Filter.eq('NAVNAME', c.chapterSelector.getValue())), 10);
}
c.chapterSelector.onChange(zoomCenter);
function exportImg() {
  var imgInfo = {
    year: parseInt(c.imgSelection.widgets().get(1).getValue()),
    month: c.imgSelection.widgets().get(3).getValue(),
  };
  var rgbImg = makeRgbImg(imgInfo);
  var url = rgbImg.getThumbURL({
    dimensions: 1920,
    format: 'PNG',
    crs: 'EPSG:3857',
    region: ee.Geometry.Rectangle(c.map.getBounds())
  });
  c.exportLink.setUrl(url);
  c.exportLink.style().set('shown', true);
}
c.exportImg.onClick(exportImg);
function hideDownloadLink() {
  c.exportLink.style().set('shown', false);
}
c.map.onChangeBounds(hideDownloadLink);
// function hsv(img) {
//   return img.divide(255).rgbToHsv().visualize();
// }
/* Example
// Handles updating the legend when band selector changes.
function updateLegend() {
  c.legend.title.setValue(c.bandSelect.getValue() + ' (%)');
}
*/
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
/* Example
// Selected year.
m.year = 2020;
*/
setDefault();
c.map.setCenter(-109.4383, 36.111, 8);