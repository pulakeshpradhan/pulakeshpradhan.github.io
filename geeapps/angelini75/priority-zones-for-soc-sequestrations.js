var Ndef = ee.Image("users/angelini75/WAD/Ndef"),
    Nsur = ee.Image("users/angelini75/WAD/Nsurplus"),
    ar = ee.Image("users/angelini75/WAD/aridity"),
    built = ee.Image("users/angelini75/WAD/built"),
    fire = ee.Image("users/angelini75/WAD/fire"),
    gni = ee.Image("users/angelini75/WAD/gni"),
    lstk = ee.Image("users/angelini75/WAD/livestock"),
    lpd = ee.Image("users/angelini75/WAD/lpd"),
    negTr = ee.Image("users/angelini75/WAD/neg_veg_trend"),
    pop = ee.Image("users/angelini75/WAD/pop15"),
    popCh = ee.Image("users/angelini75/WAD/pop_change"),
    tloss = ee.Image("users/angelini75/WAD/treeLoss"),
    wstr = ee.Image("users/angelini75/WAD/w_stress"),
    gsocseq = ee.Image("users/angelini75/WAD/GSOCseq_RSR_SSM2");
var countries = ee.FeatureCollection(
    'projects/google/examples/population-explorer/LSIB_SIMPLE-with-GHSL_POP');
// PANELS ------------------------------------------------------------------------------------------------#
// control panel
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '500px'}
});
// map panel
var map = ui.Map();
map.style().set({cursor:'crosshair'});
map.setOptions('HYBRID');
map.setCenter(-17.39, -0.06, 4);
// -------------------------------------------------------------------------------------------------------#
// index panel
var indexList = [['N deficit',1], ['N surplus',2], ['Aridity',3], ['Built',4], ['Fires',5], ['GNI',6],
                ['Livestock exess',7], ['LPD' ,8], ['Neg. Veg. Trend' ,9], ['Population' , 10],
                ['Pop. change' , 11], ['Forest loss'  ,12], ['Water Stress'  , 13]];
var indexBox = [];
  indexList.forEach(function(name, index) {
  var checkBox = ui.Checkbox(name[0]);
  indexBox.push(checkBox);
});
var indexPanelLabel = ui.Label('Select Issues', {fontWeight : 'bold'});
var indexPanel = ui.Panel(
  [
    ui.Panel([indexBox[0], indexBox[4], indexBox[8], indexBox[12]], null, {stretch: 'horizontal'}),
    ui.Panel([indexBox[1], indexBox[5], indexBox[9]], null, {stretch: 'horizontal'}),
    ui.Panel([indexBox[2], indexBox[6], indexBox[10]], null, {stretch: 'horizontal'}),
    ui.Panel([indexBox[3], indexBox[7], indexBox[11]], null, {stretch: 'horizontal'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}
);
indexBox[0].setValue(0);
// submit panel
var submitButton = ui.Button({label: 'Next step'});
submitButton.style().set('stretch', 'horizontal');
// // map panel
// map.add(ui.Label({
//   value: 'Click a point',
//   style: {position: 'top-center'}
// }));
// map.setOptions('HYBRID');
//########### ADD PANELS TO INTERFACE ################################################
controlPanel.add(indexPanelLabel);
controlPanel.add(indexPanel);
controlPanel.add(submitButton);
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);
// Bind actions to functions -----------------------------------------------------------------------------#
var loadComposite = function() {
  var empty = ee.Image().byte();
  if(indexBox[0].getValue() === true){
    empty = empty.addBands({srcImg:[Ndef]})
  }
  if(indexBox[1].getValue() === true){
    empty = empty.addBands({srcImg:[Nsur]})
  }
  if(indexBox[2].getValue() === true){
    empty = empty.addBands({srcImg:[ar]})
  }
  if(indexBox[3].getValue() === true){
    empty = empty.addBands({srcImg:[built]})
  }
  if(indexBox[4].getValue() === true){
    empty = empty.addBands({srcImg:[fire]})
  }
  if(indexBox[5].getValue() === true){
    empty = empty.addBands({srcImg:[gni]})
  }
  if(indexBox[6].getValue() === true){
    empty = empty.addBands({srcImg:[lstk]})
  }
  if(indexBox[7].getValue() === true){
    empty = empty.addBands({srcImg:[lpd]})
  }
  if(indexBox[8].getValue() === true){
    empty = empty.addBands({srcImg:[negTr]})
  }
  if(indexBox[9].getValue() === true){
    empty = empty.addBands({srcImg:[pop]})
  }
  if(indexBox[10].getValue() === true){
    empty = empty.addBands({srcImg:[popCh]})
  }
  if(indexBox[11].getValue() === true){
    empty = empty.addBands({srcImg:[tloss]})
  }
  if(indexBox[12].getValue() === true){
    empty = empty.addBands({srcImg:[wstr]})
  }
  // delet firts band
  empty = empty.select(
    empty.bandNames().filter(
      ee.Filter.stringEndsWith('item', 'constant').not()))
  var suma = empty.reduce("sum")
  var bands = empty.bandNames().length().getInfo()
  // GSOCseq panel
  var socseqSectionLabel = ui.Label('Define Potential SOCseq Tn C/ha.y',{fontWeight: 'bold'});
  var socseqLabel = ui.Label('SOCseq');
  var socseqslider = ui.Slider({min:0, max:0.2, value:0.07, step:0.005});
  socseqslider.style().set('stretch', 'horizontal');
  var socPanel = ui.Panel(
    [
      socseqSectionLabel,
      ui.Panel([socseqLabel, socseqslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}) 
    ] 
  );
  // threshold Issus panel 
  var issueSectionLabel = ui.Label('Define min number of issues',{fontWeight: 'bold'});
  var issueLabel = ui.Label('Issues');
  var issueSlider = ui.Slider({min:0, max:bands, value:0, step:1});
  issueSlider.style().set('stretch', 'horizontal');
  var issuePanel = ui.Panel(
    [
      issueSectionLabel,
      ui.Panel([issueLabel, issueSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}) 
    ] 
  );
  // add soc panel
  controlPanel.add(socPanel);
  // add issue panel
  controlPanel.add(issuePanel);
  // new submit button
  var submitButton2 = ui.Button({label: 'Submit'});
  submitButton2.style().set('stretch', 'horizontal');
  controlPanel.add(submitButton2);
  // Next Step #######################################################################
  var loadComposite2 = function() {
    var threshold_gsocseq = socseqslider.getValue()
    var threshold_issues = issueSlider.getValue()
    // mask
    var m_i = suma.gte(threshold_issues)
    var m_g = gsocseq.gte(threshold_gsocseq)
    // get layers
    suma = suma.updateMask(m_i)
    gsocseq = gsocseq.updateMask(m_g)
    var result = m_i.multiply(m_g)
    result = result.updateMask(result.gt(0))
    var pal_suma = {
      min: 0,
      max: bands,
      palette: ['b3cde3','8c96c6', '810f7c'],
    };
    var pal_gsoc = {
      min: 0,
      max: 0.2,
      palette: ['ffffcc','78c679', '006837'],
    };
    var pal_res = {
      min: 1,
      max: 1,
      palette: ['c0564c'],
    };
    map.addLayer(suma, pal_suma, 'Sum of issues').set({ shown: false });
    map.addLayer(gsocseq, pal_gsoc, 'GSOCseq').set({ shown: false });
    map.addLayer(result, pal_res, 'Priority areas');
    var COUNTRIES_STYLE = {color: '26458d', fillColor: '00000000'};
    map.addLayer(countries.style(COUNTRIES_STYLE));
  }
  submitButton2.onClick(loadComposite2)
}
submitButton.onClick(loadComposite)