Map.setOptions('satellite')
Map.setCenter(30,0,3)
//_______________________________________________________________________________________________________________________
// SECTION   - Call density layer
var lc = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V/Global").first().select('discrete_classification');
var waterMaskCCI = lc.unmask(200).neq(200)
var COCONUTdensity = ee.Image("projects/ee-globaloilpalm/assets/_COCONUT/shared/GlobalCoconutLayer_2020_densityMap_1km_v1-2")
var blankNaN = ee.Image(0)
var blankNaN = blankNaN.visualize({"palette":["686868"]});
var blank = ee.Image(0)
var blank = blank.visualize({"palette":["a9a9a9"]});
var blankWhite = ee.Image(0)
var blankWhite = blankWhite.visualize({"palette":["white"]});
var visDesnityParams = {min:0.01, max: 50,palette:["yellow","orange","red","purple"]}
var COCONUTdensityVis = COCONUTdensity.divide(10000).visualize(visDesnityParams)
  .where(COCONUTdensity.gte(0).and(COCONUTdensity.lt(0.01)),blankWhite)
  .where(COCONUTdensity.eq(-1),blank)
  .where(waterMaskCCI.not(),blank)
  .updateMask(1)
Map.addLayer(COCONUTdensityVis, {}, 'Denisity coconut',true);
//_______________________________________________________________________________________________________________________
// SECTION   - Call Global Coconut Layer (v3-1)
var COCONUTfinal = ee.ImageCollection('projects/ee-globaloilpalm/assets/_COCONUT/results/GCL_2020_v1-1')
  .filter(ee.Filter.neq('system:index','GCL_2020_46268_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46422_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46423_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46424_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46578_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46579_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46580_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_46736_v1-1'))
  .filter(ee.Filter.neq('system:index','GCL_2020_05195_v1-1'))
  .mosaic()
//_______________________________________________________________________________________________________________________
// SECTION   - Probabilities
var probs = ee.ImageCollection("projects/ee-globaloilpalm/assets/_COCONUT/shared/GCL_probs_2020_v1-1")
  .max()
//_______________________________________________________________________________________________________________________
// SECTION   - Grid with COCO
var gridCoco = ee.FeatureCollection("projects/ee-globaloilpalm/assets/_COCONUT/shared/Grid_coconut_v1-1")
  .filter(ee.Filter.neq('ID',46268))
  .filter(ee.Filter.neq('ID',46422))
  .filter(ee.Filter.neq('ID',46423))
  .filter(ee.Filter.neq('ID',46424))
  .filter(ee.Filter.neq('ID',46578))
  .filter(ee.Filter.neq('ID',46579))
  .filter(ee.Filter.neq('ID',46580))
  .filter(ee.Filter.neq('ID',46736));
// Map.addLayer(gridCoco,{color:'ff0000'},'Grid coconut v1-1',false)
var vPoly = ee.Image().toByte().paint(gridCoco, 2,2); 
var vPoly = vPoly.visualize({palette: 'd6d6d6', max: 3, opacity: 1});
var mask = vPoly.unmask(999)
var visCOCO = {"min":1,"max":2,"palette":["ff0000","e200ff"]};
var OPvis = COCONUTfinal.visualize(visCOCO).unmask(0).where(mask.neq(999),vPoly).updateMask((COCONUTfinal.unmask(0).eq(0).and(mask.eq(999))).not())//.selfMask()
Map.addLayer(OPvis,{},'Global coconut layer',true)
var VisParamProbs = {'min':10,"max":100,"palette":["ffffff","00d0ff","005acc","005acc","000306"]};
Map.addLayer(probs.updateMask(probs.gte(10)),VisParamProbs,'Coconut probability',false)
//_______________________________________________________________________________________________________________________
// SECTION   - LEGENDS
//_______________________________________________________________________________________________________________________
//_______________________________________________________________________________________________________________________
// SECTION   - DENSITY COCONUT
var visParams = visDesnityParams
var TITLE = 'Density coconut'
var LEGEND = 'ha/km2'
function ColorBar() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: visParams['palette'],
    },
    style: {stretch: 'horizontal', margin: '0px 16px'},
  });
}
function makeLegend(a,b) {
  var labelPanel = ui.Panel(
      [
        ui.Label(a, {margin: '4px 8px'}),
        ui.Label(' ',{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(b, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(), labelPanel]);
}
var LEGEND_TITLE_STYLE = {fontSize: '18px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'left', margin: '4px 16px'};
var LEGEND_FOOTNOTE_STYLE = {fontSize: '14px', stretch: 'horizontal', textAlign: 'center', margin: '4px'};
var legend2 = ui.Panel(
    [
      ui.Label(TITLE, LEGEND_TITLE_STYLE), makeLegend(visParams['min'],visParams['max']),
      ui.Label(LEGEND, LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'})
//_______________________________________________________________________________________________________________________
// SECTION   - COCONUT
var TITLE = 'Global coconut layer'
var palette = ['ff0000']
var ClassNames = ['Coconut']
var legend = ui.Panel({style: { position: 'bottom-left',padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: TITLE,
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0'}
});
legend.add(legendTitle);
var makeRow = function(color, name) {
  var colorBox = ui.Label({style: { backgroundColor: '#' + color, padding: '8px',  margin: '0 0 4px 0'}});
  var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < ClassNames.length; i++) {
  legend.add(makeRow(palette[i], ClassNames[i]));
}
//_______________________________________________________________________________________________________________________
// SECTION   - COCONUT PROBABILITY
var visParams = VisParamProbs
var TITLE = 'Coconut probability'
var LEGEND = '%'
function ColorBar() {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: visParams['palette'],
    },
    style: {stretch: 'horizontal', margin: '0px 16px'},
  });
}
function makeLegend(a,b) {
  var labelPanel = ui.Panel(
      [
        ui.Label(a, {margin: '4px 8px'}),
        ui.Label(' ',{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(b, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(), labelPanel]);
}
var LEGEND_TITLE_STYLE = {fontSize: '18px', fontWeight: 'bold', stretch: 'horizontal', textAlign: 'left', margin: '4px 16px'};
var LEGEND_FOOTNOTE_STYLE = {fontSize: '14px', stretch: 'horizontal', textAlign: 'center', margin: '4px'};
var legend3 = ui.Panel(
    [
      ui.Label(TITLE, LEGEND_TITLE_STYLE), makeLegend(visParams['min'],visParams['max']),
      ui.Label(LEGEND, LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'})
//_______________________________________________________________________________________________________________________
// SECTION   - 
var reference1 = ui.Panel([
  ui.Label({
    value: 'ESSD preprint:',
    style: {fontSize: '12px', 
      position:'bottom-right',
      fontWeight: 'bold'
    }
  }),
]);
var reference2 = ui.Panel([
  ui.Label({
    value: 'Descals et al. "High-resolution global map of closed-canopy coconut." Earth System Science Data Discussions (2023): 1-30.',
    style: {fontSize: '12px', 
      position:'bottom-right'
      // fontWeight: 'bold'
    }
  }),
]);
var zenodoDoi = ui.Panel([
  ui.Label({
    value: 'https://doi.org/10.5281/zenodo.7453178',
    style: {fontSize: '12px', 
      position:'bottom-right',
      fontWeight: 'bold'
    }
  }),
]);
var gap1 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'}}),]);
var gap2 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var gap3 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var gap4 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var gap5 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var gap6 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var gap7 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var gap8 = ui.Panel([ ui.Label({value: ' ', style: {fontSize: '10px'} }),]);
var panel = ui.Panel({
  style:{width: '250px',position:'bottom-right'}
})
// panel.add(zenodoDoi);
// panel.add(gap2);
panel.add(gap1);
panel.add(legend);
panel.add(gap2);
panel.add(gap3);
panel.add(legend3);
panel.add(gap4);
panel.add(gap5);
panel.add(legend2);
panel.add(gap6);
// panel.add(reference1);
panel.add(reference2);
ui.root.insert(0, panel);