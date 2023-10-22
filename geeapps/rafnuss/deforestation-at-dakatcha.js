var visu = ui.import && ui.import("visu", "imageVisParam", {
      "params": {
        "bands": [
          "Red",
          "Green",
          "Blue"
        ],
        "min": 0,
        "max": [
          4500,
          3000,
          3000
        ]
      }
    }) || {"bands":["Red","Green","Blue"],"min":0,"max":[4500,3000,3000]},
    allPlot = ui.import && ui.import("allPlot", "table", {
      "id": "users/rafnuss/Dakatcha/AllPlots"
    }) || ee.FeatureCollection("users/rafnuss/Dakatcha/AllPlots"),
    gfc2014 = ui.import && ui.import("gfc2014", "image", {
      "id": "UMD/hansen/global_forest_change_2019_v1_7"
    }) || ee.Image("UMD/hansen/global_forest_change_2019_v1_7"),
    planet = ui.import && ui.import("planet", "imageCollection", {
      "id": "users/rafnuss/Dakatcha/planetYear"
    }) || ee.ImageCollection("users/rafnuss/Dakatcha/planetYear");
var lossYearImage = gfc2014.select(['lossyear']);
// var def = lossYearImage.visualize({palette:['003049','d62828','E75414','f77f00','fcbf49','eae2b7'],min:14, max:19});
var polyAll = allPlot.style({color:'000000', fillColor:"00000000"})
// define possible colorscale
var jet=['0000B6','0000DB','0000FF','0024FF','0049FF','006DFF','0092FF','00B6FF','00DBFF','00FFFF','24FFDB','49FFB6','6DFF92','92FF6D','B6FF49','DBFF24','FFFF00','FFDB00','FFB600','FF9200','FF6D00','FF4900','FF2400','FF0000','DB0000'];
var greens = ["000", "040", "080", "0B0", "0F0"];
var greens2 = ['bbe029', '0a9501', '074b03'];
var viridis = ['#440154FF', '#481567FF', '#482677FF', '#453781FF', '#404788FF', '#39568CFF', '#33638DFF', '#2D708EFF', '#287D8EFF', '#238A8DFF', '#1F968BFF', '#20A387FF', '#29AF7FFF', '#3CBB75FF', '#55C667FF', '#73D055FF', '#95D840FF', '#B8DE29FF', '#DCE319FF', '#FDE725FF'];
var linkedMapL = ui.Map();
var linkedMapR = ui.Map();
var linker = ui.Map.Linker([linkedMapL, linkedMapR]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
linkedMapL.centerObject(allPlot)
var Lyear = 2017
var Ryear = 2021
var pR = linkedMapR.addLayer(polyAll,{},'Plots')
var pL = linkedMapL.addLayer(polyAll,{},'Plots')
var defL = linkedMapR.addLayer(ee.Image.constant(0))
var lR = linkedMapR.addLayer(ee.Image.constant(0))
var lL = linkedMapL.addLayer(ee.Image.constant(0))
function display(info){
  if (info.Map==linkedMapR){
    linkedMapR.remove(lR);
    linkedMapR.remove(pR);
    lR = linkedMapR.addLayer( planet.filterDate(''+info.year,''+(info.year+1)).first(), visu,''+info.year);
    pR = linkedMapR.addLayer(polyAll,{},'Plots')
    Ryear = info.year;
  } else {
    linkedMapL.remove(lL);
    linkedMapL.remove(pL);
    lL = linkedMapL.addLayer( planet.filterDate(''+info.year,''+(info.year+1)).first(), visu,''+info.year);
    pL = linkedMapL.addLayer(polyAll,{},'Plots')
    Lyear = info.year;
  }
  linkedMapR.remove(defL);
  var tmp = lossYearImage.gt(Lyear-2000).and(lossYearImage.lte(Ryear-2000)).selfMask();
  defL = linkedMapR.addLayer(tmp,{palette:['D62828']},'deforestation')
}
function addWidget(Map, position, initialValues){
  initialValues.Map=Map;
  var panel=ui.Panel({layout:ui.Panel.Layout.flow('horizontal'), style: {position: position}});
  Map.add(panel)
  var slider = ui.Slider({
    min:Lyear,
    max:Ryear,
    value:initialValues.year,
    step:1,
    onChange:function(value){
      initialValues.year=value;
      display(initialValues);
    },
    direction:'horizontal',
    style:{width:'200px',margin: '13px'}
  });
  panel.add(slider);
  display(initialValues)
}
addWidget(linkedMapL,'bottom-left',{year:Lyear});
addWidget(linkedMapR,'bottom-right',{year:Ryear});