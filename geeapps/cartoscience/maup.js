// Geovisualizing the modifiable areal unit problem
var img = ee.Image('MODIS/055/MOD17A3/2014_01_01').select('Npp').divide(10000).rename('NPP');
Map.setCenter(30, 20, 2).setOptions('HYBRID'); 
var bounds = ee.Geometry(Map.getBounds(true));
var res = Map.getScale()*10;
var colors = ['e0470e','e6ad0c','ffffc3','13ff92','079b5d'];               
var vis = {min: 1, max: 5, palette: colors};
var design = {
  fontSize: 10,
  legend: {position: 'none'},
  backgroundColor: '080c16',
  series: {0: {color: 'e8e8e8'}},
  hAxis: {format: 'short', textStyle: {color: 'e8e8e8'}},
  vAxis: {format: 'short', textStyle: {color: 'e8e8e8'}}
};
var histogram = ui.Chart.image.histogram(img, bounds, res).setOptions(design);
var legend = ui.Panel(
  [
    ui.Label('Low', {fontSize: '10px', fontWeight: 'bold', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', backgroundColor: '080c16'}), 
    ui.Label({style: {backgroundColor: 'e0470e', padding: '8px', margin: '6px 0 0 0'}}),
    ui.Label({style: {backgroundColor: 'e6ad0c', padding: '8px', margin: '6px 0 0 0'}}),
    ui.Label({style: {backgroundColor: 'ffffc3', padding: '8px', margin: '6px 0 0 0'}}),
    ui.Label({style: {backgroundColor: '13ff92', padding: '8px', margin: '6px 0 0 0'}}),
    ui.Label({style: {backgroundColor: '079b5d', padding: '8px', margin: '6px 0 0 0'}}),
    ui.Label('High', {fontSize: '10px', fontWeight: 'bold', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', backgroundColor: '080c16'}), 
  ],
  ui.Panel.Layout.flow('horizontal'), {width: '200px', position: 'bottom-left', backgroundColor: '080c16', margin: '-5px 0 10px 24px'}
);
var panel = ui.Panel(
  [
    ui.Label('Geovisualizing the Modifiable Areal Unit Problem', {fontSize: '20px', fontWeight: 'bold', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '20px 0 10px 0', backgroundColor: '080c16'}), 
    ui.Label('Pan, zoom, and adjust the browser window to reclassify.', {fontSize: '13px', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '4px 25px 4px 25px', backgroundColor: '080c16'}),
    ui.Label('NASA MODIS Net Primary Productivity', {fontSize: '10px', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '4px 20px 1px 20px', backgroundColor: '080c16'}),
    ui.Label('2014, kg C / m^2', {fontSize: '10px', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '1px 20px 1px 20px', backgroundColor: '080c16'}),
    histogram,
    legend,
    ui.Label('Recategorizes using percentile thresholds (0-20-40-60-80-100) from the data distribution captured in the frame. Zoom in to reveal heterogeneity at local scales.', {fontSize: '10px', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '1px 20px 1px 20px', backgroundColor: '080c16'}),
    ui.Label('© 2019 Cartoscience', {fontSize: '10px', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '20px 20px 0 20px', backgroundColor: '080c16'}),
    ui.Label('cartoscience.com', {fontSize: '10px', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: '1px 85px 1px 85px', backgroundColor: '080c16'}, 'http://cartoscience.com')
  ],
  ui.Panel.Layout.flow('vertical'), {width: '250px', position: 'bottom-left', backgroundColor: '080c16'}
);
ui.root.insert(0, panel);
Map.layers().set(0, ui.Map.Layer(ee.Image(0), {palette:'000000', opacity: 0.8}, 'Dark'));
Map.onChangeBounds(function() {
  var bounds = ee.Geometry(Map.getBounds(true));
  var res = Map.getScale()*10;
  var params = img.reduceRegion({
    reducer: ee.Reducer.percentile([0,20,40,60,80,100]), 
    geometry: bounds,
    scale: res
  });
  var p0 = ee.Number(params.get('NPP_p0'));
  var p20 = ee.Number(params.get('NPP_p20'));
  var p40 = ee.Number(params.get('NPP_p40'));
  var p60 = ee.Number(params.get('NPP_p60'));
  var p80 = ee.Number(params.get('NPP_p80'));
  var p100 = ee.Number(params.get('NPP_p100'));
  var quintiles = img.gt(p0).add(img.gt(p20)).add(img.gt(p40))
                     .add(img.gt(p60)).add(img.gt(p80)).add(img.gt(p100));
  var histogram = ui.Chart.image.histogram(img, bounds, res).setOptions(design);
  panel.widgets().set(4,histogram);
  Map.layers().set(1, ui.Map.Layer(quintiles, vis, 'Quintiles'));
  Map.layers().set(2, ui.Map.Layer(img, {min: 0.13, max: 0.79}, 'MODIS/055/MOD17A3', false));
});