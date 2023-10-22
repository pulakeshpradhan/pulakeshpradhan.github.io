/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var s2Jawa = ee.Image("projects/ee-fa-rs/assets/S2_Jawa_0621_0622_uint16");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Function to start map
function resetMap(){
  Map.clear();
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
    drawingToolsControl: true
  });
  Map.drawingTools().setDrawModes(['point']).setLinked(false);
  Map.centerObject(s2Jawa, 7);
}
resetMap();
// Main panel
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '450px', padding: '15px'}
});
ui.root.add(mainPanel);
// App title
var titleLabel = ui.Label({
  value: 'Land Cover Sampling',
  style: {fontWeight: 'bold', color: 'navy', fontSize: '30px', padding: '10px 0px', stretch: 'horizontal'}
});
mainPanel.add(titleLabel);
// Image panel
var imagePanel = ui.Panel({
  style: {maxWidth: '450px'},
  layout: ui.Panel.Layout.flow('horizontal', true)
});
mainPanel.add(imagePanel);
var bandList = s2Jawa.bandNames().getInfo();
// Band
var selectRed = ui.Select({
  placeholder: 'R',
  value: 'B11',
  items: bandList,
  onChange: function(){
    addImage();
  }
});
imagePanel.add(selectRed);
var selectGreen = ui.Select({
  placeholder: 'G',
  items: bandList,
  value: 'B8',
  onChange: function(){
    addImage();
  }
});
imagePanel.add(selectGreen);
var selectBlue = ui.Select({
  placeholder: 'B',
  value: 'B2',
  items: bandList,
  onChange: function(){
    addImage();
  }
});
imagePanel.add(selectBlue);
var contrastSlider = ui.Slider({
  value: 0.4,
  min: 0.1,
  max: 1,
  step: 0.1,
  style: {stretch: 'horizontal'},
  onChange: function(){
    addImage();
  }
});
imagePanel.add(contrastSlider);
// Main image
function addImage(){
  var layer = Map.layers().get(0);
  if (layer !== undefined) {
    Map.remove(layer);
  }
  var image = s2Jawa;
  var red = selectRed.getValue();
  var green = selectGreen.getValue();
  var blue = selectBlue.getValue();
  var contrast = contrastSlider.getValue()*10000;
  var vis = {bands: [red, green, blue], min: 0, max: contrast};
  Map.addLayer(s2Jawa, vis);
}
addImage();
// Panel to add geojson
var geojsonPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {maxWidth: '450px'}
});
mainPanel.add(geojsonPanel);
var geojsonTextbox = ui.Textbox({
  placeholder: 'Paste GeoJSON string here!',
  style: {stretch: 'horizontal'}
});
geojsonPanel.add(geojsonTextbox);
var geojsonButton = ui.Button({
  label: 'Add GeoJSON to map',
  onClick: function(){
    addGeojson();
  },
  style: {stretch: 'horizontal'}
});
geojsonPanel.add(geojsonButton);
// Add geojson function
function addGeojson(){
  var text = geojsonTextbox.getValue();
  geojsonTextbox.setValue('Adding GeoJSON to map...');
  var json = JSON.parse(text);
  var feature = ee.FeatureCollection(json);
  var classIdList = feature.sort('class_id').aggregate_array('class_id').distinct();
  var classNameList = feature.sort('class_id').aggregate_array('cover').distinct();
  var drawTool = Map.drawingTools();
  var nameLength = classNameList.length().getInfo();
  function looper(i){
    var geos = feature.filter(ee.Filter.eq('cover', classNameList.get(i))).geometry().evaluate(function(obj){
      drawTool.addLayer([obj], classNameList.get(i).getInfo());
    });
  }
  for (var i = 0; i < nameLength; i++){
    looper(i);
  }
  geojsonTextbox.setValue('Succes!');
  geojsonTextbox.setValue(null);
}
// Table panel
var tablePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {margin: '0px', padding: '0px'}
});
mainPanel.add(tablePanel);
// Id column label
var geometryLabel = ui.Label({
  value: 'Geometry',
  style: {fontSize: '15px', width: '130px', fontWeight: 'bold'}
});
tablePanel.add(geometryLabel);
// Id column label
var idLabel = ui.Label({
  value: 'Id',
  style: {fontSize: '15px', width: '50px', fontWeight: 'bold'}
});
tablePanel.add(idLabel);
// Name column label
var nameLabel = ui.Label({
  value: 'Name',
  style: {fontSize: '15px', maxWidth: '150px', fontWeight: 'bold'}
});
tablePanel.add(nameLabel);
var numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10' , '11', '12'];
var cover = ['Dryland Forest', 
              'Freshwater Swamp Forest', 
              'Peat Swamp Forest',
              'Mangrove Forest',
              'Cropland1',
              'Cropland2',
              'Grassland',
              'Wetlands',
              'Built-Up',
              'Bare Land',
              'Other Woody Vegetation',
              'Water Bodies'];
var samplePanel = ui.Panel({
  style: {maxWidth: '450px'},
  layout: ui.Panel.Layout.flow('horizontal', true),
});
mainPanel.add(samplePanel);
var geometrySelect1 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect1);
var idSelect1 = ui.Select({
  placeholder: 'Id',
  value: '1',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel1.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect1);
var nameLabel1 = ui.Label({
  value: 'Dryland Forest',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel1);
var geometrySelect2 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect2);
var idSelect2 = ui.Select({
  placeholder: 'Id',
  value: '2',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel2.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect2);
var nameLabel2 = ui.Label({
  value: 'Freshwater Swamp Forest',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel2);
var geometrySelect3 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect3);
var idSelect3 = ui.Select({
  placeholder: 'Id',
  value: '3',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel3.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect3);
var nameLabel3 = ui.Label({
  value: 'Peat Swamp Forest',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel3);
var geometrySelect4 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect4);
var idSelect4 = ui.Select({
  placeholder: 'Id',
  value: '4',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel4.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect4);
var nameLabel4 = ui.Label({
  value: 'Mangrove Forest',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel4);
var geometrySelect5 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect5);
var idSelect5 = ui.Select({
  placeholder: 'Id',
  value: '5',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel5.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect5);
var nameLabel5 = ui.Label({
  value: 'Cropland1',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel5);
var geometrySelect6 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect6);
var idSelect6 = ui.Select({
  placeholder: 'Id',
  value: '6',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel6.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect6);
var nameLabel6 = ui.Label({
  value: 'Cropland2',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel6);
var geometrySelect7 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect7);
var idSelect7 = ui.Select({
  placeholder: 'Id',
  value: '7',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel7.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect7);
var nameLabel7 = ui.Label({
  value: 'Grassland',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel7);
var geometrySelect8 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect8);
var idSelect8 = ui.Select({
  placeholder: 'Id',
  value: '8',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel8.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect8);
var nameLabel8 = ui.Label({
  value: 'Wetlands',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel8);
var geometrySelect9 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect9);
var idSelect9 = ui.Select({
  placeholder: 'Id',
  value: '9',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel9.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect9);
var nameLabel9 = ui.Label({
  value: 'Built-Up',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel9);
var geometrySelect10 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect10);
var idSelect10 = ui.Select({
  placeholder: 'Id',
  value: '10',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel10.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect10);
var nameLabel10 = ui.Label({
  value: 'Bare Land',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel10);
var geometrySelect11 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect11);
var idSelect11 = ui.Select({
  placeholder: 'Id',
  value: '11',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel11.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect11);
var nameLabel11 = ui.Label({
  value: 'Other Woody Vegetation',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel11);
var geometrySelect12 = ui.Select({
  placeholder: 'Select geometry',
  style: {width: '130px'}
});
samplePanel.add(geometrySelect12);
var idSelect12 = ui.Select({
  placeholder: 'Id',
  value: '12',
  items: numberList,
  style: {width: '50px'},
  onChange: function(value){
    var classNumber = numberList.indexOf(value);
    var classCover = ee.List(cover).get(classNumber);
    nameLabel12.setValue(classCover.getInfo());
  }
});
samplePanel.add(idSelect12);
var nameLabel12 = ui.Label({
  value: 'Water Bodies',
  style: {maxWidth: '150px'}
});
samplePanel.add(nameLabel12);
// Drawing tools function
function draw(){
  // Drawing tools
  var drawingTools = Map.drawingTools();
  // Function when drawing tools change
  function change() {
    var layer = drawingTools.layers();
    var name = layer.getJsArray().map(function(obj){
      var objName = obj.getName();
      return objName;
    });
    geometrySelect1.items().reset(name);
    geometrySelect2.items().reset(name);
    geometrySelect3.items().reset(name);
    geometrySelect4.items().reset(name);
    geometrySelect5.items().reset(name);
    geometrySelect6.items().reset(name);
    geometrySelect7.items().reset(name);
    geometrySelect8.items().reset(name);
    geometrySelect9.items().reset(name);
    geometrySelect10.items().reset(name);
    geometrySelect11.items().reset(name);
    geometrySelect12.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw();
var downloadButton = ui.Button({
  label: 'Generate download link',
  style: {stretch: 'horizontal'},
  onClick: function(){
    downloadLink();
  }
});
mainPanel.add(downloadButton);
// Download link
var downloadLinkLabel = ui.Label({
  value: 'Link ready',
  style: {shown: false}
});
mainPanel.add(downloadLinkLabel);
// Download function
function downloadLink(){
  downloadLinkLabel.style().set({shown: true});
  downloadLinkLabel.setValue('Link is being generated');
  var drawingTool = Map.drawingTools();
  var geometryCol = drawingTool.layers();
  var layer = ee.FeatureCollection(geometryCol.getJsArray().map(function(obj){
    var name = obj.getName();
    var classId;
    var cover;
    switch (name) {
      case geometrySelect1.getValue():
        classId = idSelect1.getValue();
        cover = nameLabel1.getValue();
        break;
      case geometrySelect2.getValue():
        classId = idSelect2.getValue();
        cover = nameLabel2.getValue();
        break;
      case geometrySelect3.getValue():
        classId = idSelect3.getValue();
        cover = nameLabel3.getValue();
        break;
      case geometrySelect4.getValue():
        classId = idSelect4.getValue();
        cover = nameLabel4.getValue();
        break;
      case geometrySelect5.getValue():
        classId = idSelect5.getValue();
        cover = nameLabel5.getValue();
        break;
      case geometrySelect6.getValue():
        classId = idSelect6.getValue();
        cover = nameLabel6.getValue();
        break;
      case geometrySelect7.getValue():
        classId = idSelect7.getValue();
        cover = nameLabel7.getValue();
        break;
      case geometrySelect8.getValue():
        classId = idSelect8.getValue();
        cover = nameLabel8.getValue();
        break;
      case geometrySelect9.getValue():
        classId = idSelect9.getValue();
        cover = nameLabel9.getValue();
        break;
      case geometrySelect10.getValue():
        classId = idSelect10.getValue();
        cover = nameLabel10.getValue();
        break;
      case geometrySelect11.getValue():
        classId = idSelect11.getValue();
        cover = nameLabel11.getValue();
        break;
      case geometrySelect12.getValue():
        classId = idSelect12.getValue();
        cover = nameLabel12.getValue();
        break;
    }
    return ee.Feature(obj.getEeObject()).set({'name': name, 'class_id': classId, 'cover': cover});
  }));
  layer.getDownloadURL({
    format: 'GeoJSON',
    filename: 'Sample',
    callback: function(url){
      downloadLinkLabel.setValue('Link ready!');
      downloadLinkLabel.setUrl(url);
    }
  });
}