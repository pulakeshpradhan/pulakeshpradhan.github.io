var table = ee.FeatureCollection("users/jstnbraaten/Tongass_NF_LT_v04_yodBufferFilled_hist");
//print(table)
var table = ee.FeatureCollection("users/jstnbraaten/tongass-nf/Tongass_NF_LT_v04_yodBufferFilled_hist_smArea");
var geometry = ee.Geometry.Polygon(
        [[[-135.08037109375, 59.787754325502064],
          [-137.01396484375, 58.02945145222409],
          [-135.80546875, 56.72663152286245],
          [-134.20146484375, 55.402009788481074],
          [-133.6521484375, 54.60815376353394],
          [-130.55400390625, 54.55721874093795],
          [-129.67509765625, 55.13913592579041],
          [-129.7849609375, 56.229121789997414],
          [-131.47685546875, 56.798891689135715],
          [-133.49833984375, 58.78909841008452]]]);
var test = table.map(function(ft){
  var hectares = ft.getNumber('yod').multiply(900).divide(10000);
  return ft.set('hectares', hectares)});
// roadless rule goes into effect for AK in 2004
var pre = test.filter(ee.Filter.lte('Year', 2003)).reduceColumns(ee.Reducer.median(), ['hectares'])
var post = test.filter(ee.Filter.gt('Year', 2003)).reduceColumns(ee.Reducer.median(), ['hectares'])
var preMedian = pre.getNumber('median')
var postMedian = post.getNumber('median')
var preCol = test.filter(ee.Filter.lte('Year', 2003))
  .map(function(ft){
    return ft.set('haMedian', preMedian)});
var postCol = test.filter(ee.Filter.gt('Year', 2003))
  .map(function(ft){
    return ft.set('haMedian', postMedian)});
var statCol = preCol.merge(postCol);
var chart = ui.Chart.feature.byFeature(statCol, 'Year', ['hectares', 'haMedian'])
        .setChartType('ColumnChart')
        .setSeriesNames(['Annual', ])
        .setOptions({
          title: null, //'Forest area cut',
          colors: ['EB7852', '0D0887'], // [],
          hAxis: {title: 'Year'},
          vAxis: {title: 'Hectares'},
          legend: { position: 'top'},
          bar: { groupWidth: '80%' },
          series: {
            0: {type: 'bar', visibleInLegend: false},
            1: {type: 'line', labelInLegend: 'Pre-/post-roadless rule median'}},
          titleTextStyle: {
              fontSize: 18,
              //bold: <boolean>,    // true or false
              //italic: <boolean>   // true of false
          }
        });
//var theMap = ui.Map();
//ui.root.clear();
var controlPanel = ui.Panel({
  style: {width: '330px', position: 'bottom-left',
  backgroundColor: 'rgba(255, 255, 255, 1.0)',
    maxHeight: '560px'
  } //, 
});
var yod = ee.Image("users/jstnbraaten/tongass-nf/Tongass_NF_LT_v04_yodBufferFilled").clip(geometry);
var fc = ee.FeatureCollection("users/jstnbraaten/tongass-nf/usda_forest_service_boundaries")
  .filter(ee.Filter.eq('FORESTNAME', 'Tongass National Forest'));
var fcBoundsRaster = ee.Image().byte()
  .paint(fc, 1, 0.5)
  .visualize({min:0, max:1, palette:['36B677']})
  .clip(geometry); //'FFFFFF'  '36B677', '8ED542'
var palette = ['F0F921', 'FBB32F', 'EB7852', 'CB4678', '9A179B', '5B02A3', '0D0887'];
var yodVisArgs = {
  min: 1985,
  max: 2018,
  palette: palette};
// Create a map to be used as the zoom box.
var insetMap = ui.Map({style: {stretch: 'both', shown: true}})
    .setControlVisibility(false);
insetMap.addLayer(fcBoundsRaster)//
insetMap.setCenter(-133.9139, 57.3482, 5)//centerObject(geometry, 5);
//;
var panel = ui.Panel({
  widgets: [insetMap],
  style: {
    position: 'bottom-right',
    height: '300px',
    width: '300px',
  }
});
Map.add(panel)
Map.setCenter(-134.9198, 57.9367, 10);
function getMapBounds(){
  var bounds = Map.getBounds();
  var w = bounds[0], e = bounds [2];
  var n = bounds[1], s = bounds [3];
  var outline = ee.Geometry.MultiLineString([
    [[w, s], [w, n]],
    [[e, s], [e, n]],
    [[w, s], [e, s]],
    [[w, n], [e, n]]],
    null,
    false
  );
  return outline;
}
  //;
Map.addLayer(fcBoundsRaster, null, 'Tongass National Forest');
Map.addLayer(yod, yodVisArgs, 'Year of disturbance');
Map.setOptions('HYBRID');
//Map.setControlVisibility(null, null, false, false, false);
Map.add(controlPanel);
//ui.root.add(theMap);
var legend = makeLegend()
//print(legend)
var title = ui.Label('Protect the Tongass N.F.', {color: 'EB7852', fontSize: '20px', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
var blob1 = ui.Label('The state of Alaska has petitioned to lift the 2001 Roadless Rule '+
'which would allow road building and additional timber harvest opportunities in Tongass National Forest (including old-growth). '+
'This map shows the extent of forest cuts from 1985 to 2018*. It is clear that when the roadless rule '+
'was implemented in AK in 2004 there was a major reduction in cutting - the policy is protecting forests.'
, {fontSize: '12px'})
var blob2 = ui.Label('Click here to tell the Forest Service not to lift the 2001 Roadless Rule in AK',
{fontSize: '16px'},
'https://cara.ecosystem-management.org/Public/CommentInput?project=54511')
var blob3 = ui.Label('Click here for more information',
{fontSize: '16px'},
'https://medium.com/@jstnbraaten/a-proposed-end-to-alaskas-roadless-rule-2791c1e04dbf')
var blob4 = ui.Label('*The map is based on 3,565 Landsat images processed with the LandTrendr disturbance detection algorithm. '+
'Large clearcut-like forest disturbances were targeted. Note, however, commission and omission errors are present. '+
'Additionally, the northwestern region of Tongass has been removed from analysis because of errors due to '+
'persistent cloud cover and high inter-annual wetness variability.',
{fontSize: '12px'})
var insetTitle = ui.Label('Tongass National Forest, AK', {position: 'top-center', color: 'EB7852', fontSize: '17px', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.5)'});
var legendLabel = ui.Label('Forest cut year:', {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
var chartLabel = ui.Label('Forest cut area:', {fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.0)'});
insetMap.add(insetTitle)
controlPanel.add(title)
controlPanel.add(blob1)
controlPanel.add(blob2)
controlPanel.add(legendLabel)
controlPanel.add(legend)
controlPanel.add(chartLabel)
controlPanel.add(chart)
controlPanel.add(blob3)
controlPanel.add(blob4)
Map.onChangeCenter(function(){
  mapBoundsGeom = getMapBounds()
  mapBoundsLayer = ui.Map.Layer(mapBoundsGeom, {color: 'EB7852'}, 'Zoom Box Bounds')
  insetMap.layers().set(1, mapBoundsLayer);
  insetMap.setLocked(true)
})
var mapBoundsGeom = getMapBounds()
var mapBoundsLayer = ui.Map.Layer(mapBoundsGeom, {color: 'EB7852'}, 'Zoom Box Bounds')
insetMap.add(mapBoundsLayer)
// A color bar widget. Makes a horizontal color bar to display the given
// color palette.
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x7',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
// Returns our labeled legend, with a color bar and three labels representing
// the minimum, middle, and maximum values.
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(1985, {margin: '4px 8px', fontSize: '12px', backgroundColor: 'rgba(255, 255, 255, 0.0)'}),
        ui.Label(
           2001,
            {margin: '4px 8px', fontSize: '12px', textAlign: 'center', stretch: 'horizontal', backgroundColor: 'rgba(255, 255, 255, 0.0)'}),
        ui.Label(2018, {margin: '4px 8px', fontSize: '12px', backgroundColor: 'rgba(255, 255, 255, 0.0)'})
      ],
      ui.Panel.Layout.flow('horizontal'),{backgroundColor: 'rgba(255, 255, 255, 0.0)'});
  return ui.Panel([ColorBar(palette), labelPanel],null,{backgroundColor: 'rgba(255, 255, 255, 0.0)'});
}