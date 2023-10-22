var Chihuahuan = ui.import && ui.import("Chihuahuan", "table", {
      "id": "users/marcosmendezlordsburg/Desertification/chides_boundary"
    }) || ee.FeatureCollection("users/marcosmendezlordsburg/Desertification/chides_boundary");
var imgColIndexFile = require('users/marcosmendezlordsburg/Desertification:ImageCollections');
var imgColIndexFile30 = require('users/marcosmendezlordsburg/Desertification:ImageCollection30');
var featureStylinge = ({color: '000000', fillColor: '00000000'});
/**Image Collection Datasets****************************************/
var deMartonneCollection = ee.ImageCollection(imgColIndexFile.deMartonne());
var evapotranspirationCollection = ee.ImageCollection(imgColIndexFile.evapotranspiration());
var ndviCollection = ee.ImageCollection(imgColIndexFile.ndvi());
var ppetCollection = ee.ImageCollection(imgColIndexFile.ppet());
var bowenCollection = ee.ImageCollection(imgColIndexFile.bowen());
var deMartonneCollection30 = ee.ImageCollection(imgColIndexFile30.deMartonne30());
var evapotranspirationCollection30 = ee.ImageCollection(imgColIndexFile30.evapotranspiration30());
var ndviCollection30 = ee.ImageCollection(imgColIndexFile30.ndvi30());
var ppetCollection30 = ee.ImageCollection(imgColIndexFile30.ppet30());
var bowenCollection30 = ee.ImageCollection(imgColIndexFile30.bowen30());
/**These will be options later**********************/
var bandSelected = 'Classified';
/******Datasets*******************************************************************/
var datasets = {
    BowenRatio :    
    {
      imgs: bowenCollection,
      visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":4.0,"palette":['0000ff','006600','00ff00','ffff00','ff0000']},
      name:'NDVI',
      legend: [
      {'Extremely Cold': '0000ff'}, 
      {'Extremely Wet':'006600'},
      {'Semi-Wet':'00ff00'},
      {'Semi-Arid':'ffff00'},
      {'Extremely Arid':'ff0000'}],
      startYear: ee.Number.parse(ee.Date((bowenCollection.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY')).getInfo(),
      endYear: ee.Number.parse(ee.Date((bowenCollection.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo()
    },
  deMartonne :
    {
      imgs: deMartonneCollection,
      visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":8.0,"palette":['ff0000','f73507','e78d12','d7d01d','b5d021', '90c825', '6fc029','52b82c','39b02f']},
      name:'deMartonne Index',
      legend: [
        {'Dry or arid': 'ff0000'},
        {'Arid to Semiarid':'f73507'},
        {'Semiarid':'e78d12'},
        {'Moderately Arid':'d7d01d'},
        {'Slightly Humid':'b5d021'},
        {'Moderately Humid':'90c825'},
        {'Humid':'6fc029'},
        {'Very Humid':'52b82c'},
        {'Excessively Humid':'39b02f'},],
      startYear: (ee.Number.parse(ee.Date((deMartonneCollection.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
      endYear: ee.Number.parse(ee.Date((deMartonneCollection.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
    },
  Evapotranspiration :    
    {
      imgs: evapotranspirationCollection,
      visParam: {"opacity":0.56,"bands":[bandSelected],"min":0,"max":9,"palette":['ff0000','ff3800','ff7100','ffaa00','ffe200', 'e2ff00', 'aaff00','71ff00','38ff00','00ff00']},
      name:'Evapotranspiration Index',
      legend: [
      {'100.0': '00ff00'}, 
      {'90.0':'38ff00'},
      {'80.0':'71ff00'},
      {'70.0':'aaff00'},
      {'60.0':'e2ff00'},
      {'50.0':'ffe200'},
      {'40.0':'ffaa00'},
      {'30.0':'ff7100'},
      {'20.0':'ff3800'},
      {'10.0':'ff0000'}],
      startYear: (ee.Number.parse(ee.Date((evapotranspirationCollection.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
      endYear: ee.Number.parse(ee.Date((evapotranspirationCollection.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
    },
  NDVI :    
    {
      imgs: ndviCollection,
      visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":5.0,"palette":['ff0000','f73507','e78d12','d7d01d','b5d021', '90c825', '6fc029','52b82c','39b02f']},
      name:'NDVI',
      legend: [
      {'Barren rock,sand, or snow': 'ff0000'},
      {'':'ffcc00'},
      {'Shurb and grassland':'ffff00'},
      {'':'00ff00'},
      {'Temperate and Tropical rainforests':'006600'}],
      startYear: (ee.Number.parse(ee.Date((ndviCollection.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
      endYear: ee.Number.parse(ee.Date((ndviCollection.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
    },
  PPET :    
    {
      imgs: 
        ppetCollection,
      visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":8.0,"palette":['ff0000','f73507','e78d12','d7d01d','b5d021', '90c825', '6fc029','52b82c','39b02f']},
      name:'deMartonne Index',
      legend: [
      {'Hyper Arid':'eeee44'},
      {'Semiarid':'f2b233'},
      {'Arid':'f67722'},
      {'Dry Subhumid': 'ff0000'},
      {'Humid':'00ff00'}],
      startYear: (ee.Number.parse(ee.Date((ppetCollection.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
      endYear: ee.Number.parse(ee.Date((ppetCollection.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
    },
  //   BowenRatio30Year :    
  //   {
  //     imgs: bowenCollection30,
  //     visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":4.0,"palette":['0000ff','006600','00ff00','ffff00','ff0000']},
  //     name:'NDVI',
  //     legend: [
  //     {'Extremely Cold': '0000ff'}, 
  //     {'Extremely Wet':'006600'},
  //     {'Semi-Wet':'00ff00'},
  //     {'Semi-Arid':'ffff00'},
  //     {'Extremely Arid':'ff0000'}],
  //     startYear: ee.Number.parse(ee.Date((bowenCollection30.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY')).getInfo(),
  //     endYear: ee.Number.parse(ee.Date((bowenCollection30.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo()
  //   },
  // deMartonne30Year :
  //   {
  //     imgs: deMartonneCollection30,
  //     visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":8.0,"palette":['ff0000','f73507','e78d12','d7d01d','b5d021', '90c825', '6fc029','52b82c','39b02f']},
  //     name:'deMartonne Index',
  //     legend: [
  //       {'Dry or arid': 'ff0000'},
  //       {'Arid to Semiarid':'f73507'},
  //       {'Semiarid':'e78d12'},
  //       {'Moderately Arid':'d7d01d'},
  //       {'Slightly Humid':'b5d021'},
  //       {'Moderately Humid':'90c825'},
  //       {'Humid':'6fc029'},
  //       {'Very Humid':'52b82c'},
  //       {'Excessively Humid':'39b02f'},],
  //     startYear: (ee.Number.parse(ee.Date((deMartonneCollection30.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
  //     endYear: ee.Number.parse(ee.Date((deMartonneCollection30.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
  //   },
  // Evapotranspiration30Year :    
  //   {
  //     imgs: evapotranspirationCollection30,
  //     visParam: {"opacity":0.56,"bands":[bandSelected],"min":0,"max":9,"palette":['ff0000','ff3800','ff7100','ffaa00','ffe200', 'e2ff00', 'aaff00','71ff00','38ff00','00ff00']},
  //     name:'Evapotranspiration Index',
  //     legend: [
  //     {'100.0': '00ff00'}, 
  //     {'90.0':'38ff00'},
  //     {'80.0':'71ff00'},
  //     {'70.0':'aaff00'},
  //     {'60.0':'e2ff00'},
  //     {'50.0':'ffe200'},
  //     {'40.0':'ffaa00'},
  //     {'30.0':'ff7100'},
  //     {'20.0':'ff3800'},
  //     {'10.0':'ff0000'}],
  //     startYear: (ee.Number.parse(ee.Date((evapotranspirationCollection30.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
  //     endYear: ee.Number.parse(ee.Date((evapotranspirationCollection30.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
  //   },
  // NDVI30Year :    
  //   {
  //     imgs: ndviCollection30,
  //     visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":5.0,"palette":['ff0000','f73507','e78d12','d7d01d','b5d021', '90c825', '6fc029','52b82c','39b02f']},
  //     name:'NDVI',
  //     legend: [
  //     {'Barren rock,sand, or snow': 'ff0000'},
  //     {'':'ffcc00'},
  //     {'Shurb and grassland':'ffff00'},
  //     {'':'00ff00'},
  //     {'Temperate and Tropical rainforests':'006600'}],
  //     startYear: (ee.Number.parse(ee.Date((ndviCollection30.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
  //     endYear: ee.Number.parse(ee.Date((ndviCollection30.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
  //   },
  // PPET30Year :    
  //   {
  //     imgs: 
  //       ppetCollection30,
  //     visParam: {"opacity":0.56,"bands":[bandSelected],"min":0.0,"max":8.0,"palette":['ff0000','f73507','e78d12','d7d01d','b5d021', '90c825', '6fc029','52b82c','39b02f']},
  //     name:'deMartonne Index',
  //     legend: [
  //     {'Hyper Arid':'eeee44'},
  //     {'Semiarid':'f2b233'},
  //     {'Arid':'f67722'},
  //     {'Dry Subhumid': 'ff0000'},
  //     {'Humid':'00ff00'}],
  //     startYear: (ee.Number.parse(ee.Date((ppetCollection30.reduceColumns(ee.Reducer.min(),["Start_date"])).get('min')).format('YYYY'))).getInfo(),
  //     endYear: ee.Number.parse(ee.Date((ppetCollection30.reduceColumns(ee.Reducer.max(),["Start_date"])).get('max')).format('YYYY')).getInfo(),
  //   },
};
Map.centerObject(Chihuahuan,5);
/****Locations to be added later************************************/
var locationDict = {
  'Chihuahuan Desert': {lon: -103.0, lat: 30.0, zoom: 5}
};
/****Map Split Panel Defaults****************/
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left',datasets.BowenRatio.startYear,datasets.NDVI.endYear);
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right',datasets.BowenRatio.startYear,datasets.NDVI.endYear);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-104, 30, 6);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
/*************Titles****************/
var header = ui.Label('ARIDITY INDICES OVER THE CHIHUAHUAN DESERT', 
  {fontSize: '24px',
  color: 'FF8200',
  backgroundColor:'041E42',
  padding:'5px'
});
var text = ui.Label('Select your climate index',
    {fontSize: '11px',color: 'FF8200',backgroundColor:'041E42',padding:'4px'});
var toolPanel = ui.Panel({
  widgets:[header, text],
  layout:'flow',
  style: {maxWidth: '15pc',minWidth:'5pc',backgroundColor:'041E42'},
  });
// var featureStylinge = {color: '000000', fillColor: '00000000',line:'dashed'};
/*****************Image Collection Selector***************/
var selected  = Object.keys(datasets)[0];
var selectCollection = ui.Select({
  style:{color:'FF8200',backgroundColor:'041E42',border:'ff8200',whiteSpace :'pre',shown:'true'},
  items: Object.keys(datasets),
  value: selected,
  onChange: function(selected){
    addLayerSelector(leftMap, 0, 'top-left',datasets[selected].startYear,datasets[selected].endYear);
    addLayerSelector(rightMap, 1, 'top-right',datasets[selected].startYear,datasets[selected].endYear);
    // selected.add(ui.Map.Layer({eeObject:datasets[selected].imgs,
    //     visParams:datasets[selected].visParam}));
        setLegend(datasets[selected].legend);
    }});
selectCollection.setPlaceholder('holding');
ui.root.widgets().add(toolPanel);
toolPanel.add(selectCollection);
/*********Slider function**************/
//for each map
function addLayerSelector(mapToChange, defaultValue, position,sliderMin,sliderMax) {
  var label = ui.Label('year');
      mapToChange.clear();
  // This function changes the given map to show the selected image.
  function updateMap(year) {
    var editYear = ee.Date.fromYMD(year,01,01);
    var image = ee.ImageCollection(datasets[selectCollection.getValue()].imgs.filterMetadata('Start_date','equals',editYear).select(bandSelected)).first();
    mapToChange.layers().set(0,ui.Map.Layer(image,datasets[selectCollection.getValue()].visParam));
    mapToChange.layers().set(1,ui.Map.Layer(Chihuahuan.style(featureStylinge)));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
var slider = ui.Slider({
  min: sliderMin,
  max: sliderMax,
  step: 1,
  value:sliderMin,
  onChange: updateMap,
  direction:'vertical',
  style: {stretch: 'vertical',width: '35px'}
});
// selected.setValue(Object.keys(imgs)[0], true);
var panel = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: position,
    padding: '7px',
    stretch:'vertical'
  }
});
  mapToChange.add(panel);
  mapToChange.setControlVisibility(false);
}
// 
/*************LEGENDS****************/
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '12px', margin: '0 0 0 8px', padding: '0', color:'ff8200',backgroundColor:'041E42',}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '15px', margin: '0 0 4px 0', padding: '0',color:'ff8200',backgroundColor:'041E42',});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item);
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '10px',
      margin: '4px'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '4px',backgroundColor:'041E42',});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal'),{backgroundColor:'041E42'}));
  }
}
setLegend(datasets[selectCollection.getValue()].legend);