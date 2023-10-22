var trmm = ee.ImageCollection('TRMM/3B42')
  .filterDate('2008-09-19','2008-09-25')
  .select('precipitation')
  .map(function(image){
    return image.set('label', ee.String(image.get('StartGranuleDateTime')).slice(0, 16))
    .updateMask(image.gte(0.3))
    //.visualize(trmmVis)
  })
print(trmm)
var trmmVis2 = {
  min:0.3,
  max:0.6,
  palette:['008080','009090','00a0a0','00b0b0','00c0c0','00d0d0','00e0e0','00f0f0'],
  maxFrames:48,
  label: 'label',
}
var animation = require('users/gena/packages:animation')
animation.animate(trmm, trmmVis2)
var sc = ee.FeatureCollection('users/wallacesilva/vetor/IBGE_UnidadesFederativas')
  .filter(ee.Filter.eq('nome','Santa Catarina'));
  print(sc)
var scLine = ee.Image(1).paint(sc,'ffffff',0.5);
scLine = scLine.updateMask(scLine.lt(1));
Map.addLayer(scLine,{palette:'900000'},'limite SC',1,0.5);
var scLine = ee.Image(1).updateMask(ee.Image(1).updateMask(ee.Image(1).paint(sc)));
// scLine = scLine.updateMask(scLine.lt(1));
Map.addLayer(scLine,{palette:'000000'},'Mascara de Fundo',1,0.1);
Map.centerObject(sc)
// Map.addLayer(trmm.first(),trmm)
// var utils = require('users/gena/packages:utils')
// utils.exportVideo(frames, {/*label: 'label', */previewFrames: 5, framesPerSecond: 3})
Map.add(ui.Label({
  value:'Precipitação em Santa Catarina',
  style:{
    fontSize:'24px',
    position:'top-right',
    backgroundColor:'ffffff50'
  }}))
Map.add(ui.Label({
  value:'Sensor TRMM/3B42 - Band: precptation - 19/09 a 25/09 de 2008',
  style:{
    fontSize:'12px',
    position:'top-right',
    backgroundColor:'ffffff50'
  }}))