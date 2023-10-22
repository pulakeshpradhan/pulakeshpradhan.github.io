var Forest_height_2000 = ui.import && ui.import("Forest_height_2000", "image", {
      "id": "projects/glad/GLCLU2020/Forest_height_2000"
    }) || ee.Image("projects/glad/GLCLU2020/Forest_height_2000"),
    Forest_height_2020 = ui.import && ui.import("Forest_height_2020", "image", {
      "id": "projects/glad/GLCLU2020/Forest_height_2020"
    }) || ee.Image("projects/glad/GLCLU2020/Forest_height_2020"),
    Forest_height_2020_dist = ui.import && ui.import("Forest_height_2020_dist", "image", {
      "id": "projects/glad/GLCLU2020/Forest_height_disturbance"
    }) || ee.Image("projects/glad/GLCLU2020/Forest_height_disturbance"),
    Forest_height_increase = ui.import && ui.import("Forest_height_increase", "image", {
      "id": "projects/glad/GLCLU2020/Forest_height_netgain"
    }) || ee.Image("projects/glad/GLCLU2020/Forest_height_netgain"),
    Forest_height_decrease = ui.import && ui.import("Forest_height_decrease", "image", {
      "id": "projects/glad/GLCLU2020/Forest_height_netloss"
    }) || ee.Image("projects/glad/GLCLU2020/Forest_height_netloss");
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor}
var visForest = {min:5,max:30,palette:['#DCEDDCFF','green']}
var visForest2 = {min:1,max:30,palette:'white, green'}
var visDist = {min:1,max:30,palette:'white, #d801ff'}
var visLoss = {min:1,max:30,palette:'white, red'}
var visGain = {min:1,max:30,palette:'white, blue'}
var Vf20 = Forest_height_2020.unmask().updateMask(Forest_height_2020.gte(5).or(Forest_height_decrease.gte(5))).visualize(visForest2)
var Vfdist = Forest_height_2020_dist.updateMask(Forest_height_2020_dist.gte(5)).visualize(visDist)
var Vfloss = Forest_height_decrease.updateMask(Forest_height_decrease.gte(5)).visualize(visLoss)
var Vfgain = Forest_height_increase.updateMask(Forest_height_increase.gte(5)).visualize(visGain)
var vis = Vf20.where(Vfdist,Vfdist).where(Vfloss,Vfloss).where(Vfgain,Vfgain)
var forest00 = ui.Map.Layer(Forest_height_2000.updateMask(Forest_height_2000.gte(5)),visForest,'Forest height 2000');
var forest20 = ui.Map.Layer(Forest_height_2020.updateMask(Forest_height_2020.gte(5)),visForest,'Forest height 2020');
var dyn = ui.Map.Layer(vis,{},'Forest dynamic 2000-2020')
mapPanel.add(dyn);
//mapPanel.setOptions("HYBRID");
mapPanel.setCenter(0,0,3);
var title = ui.Panel([
  ui.Label({
    value: 'Global Forest Canopy Height, 2000 and 2020',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("P. Potapov, M.C. Hansen, A.H. Pickens, A. Hernandez-Serna, A. Tyukavina, S. Turubanova, V. Zalles, X. Li, A. Khan, F. Stolle, N. Harris, X.-P. Song, A. Baggett, I. Kommareddy, A. Kommareddy (2022).",{margin: '8px 0px 8px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.3389/frsen.2022.856903",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.3389/frsen.2022.856903"),
  ui.Panel([ui.Label("Our global bitemporal forest height maps portray the reduction of global tree cover extent during the first 20 years of the century. The forest height maps were developed through the integration of the Global Ecosystem Dynamics Investigation (GEDI, https://gedi.umd.edu/) lidar forest structure measurements and 2000-2020 Landsat analysis-ready data time-series (https://glad.umd.edu/ard). Forest height maps were integrated with the annual forest loss data (https://glad.earthengine.app/view/global-forest-change) to highlight the stand-replacement forest dynamic. We define forest as land cover with tree canopy height ≥ 5 m, including natural and planted trees. In the year 2020, the global forest area was 40.2 million km². We found that during the last two decades, 2000-2020, forest extent decreased by 1 million km², or by 2.4% of the year 2000 forest area.",{backgroundColor: bgColor}),
    ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  ui.Panel([ui.Label("Data download:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),ui.Label("https://glad.geog.umd.edu/dataset/GLCLUC2020",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.geog.umd.edu/dataset/GLCLUC2020")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
],'flow',{backgroundColor: bgColor});
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 100],dimensions: '15x150',format: 'png',min: visForest.min,max: visForest.max,palette: palette,};}
var forestBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: makeColorBarParams(visForest.palette),
    style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
}); 
var forestBar00 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: makeColorBarParams(visForest.palette),
    style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
}); 
var forestBar20 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: makeColorBarParams(visForest.palette),
    style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
}); 
var vert = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: {bbox: [0, 0, 1, 100],dimensions: '2x150',format: 'png',palette: ['555555']},
  style: {stretch: 'vertical', margin: '8px 0px 8px 14px', height: '100px', width: '2px'},
}); 
var vert2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: {bbox: [0, 0, 1, 100],dimensions: '2x150',format: 'png',palette: ['555555']},
  style: {stretch: 'vertical', margin: '8px 0px 8px 14px', height: '100px', width: '2px'},
}); 
var distBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: makeColorBarParams(['#FADCFFFF','#D801FFFF']),
  style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
});
var lossBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: makeColorBarParams(['#FFDCDCFF','red']),
  style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
});
var gainBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visForest.max-visForest.min)/100.0).add(visForest.min),
  params: makeColorBarParams(['#DCDCFFFF','blue']),
  style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
});
var legendLabels = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label(18,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visForest.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendLabels2 = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label(18,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visForest.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendLabels3 = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label(18,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visForest.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendLabels4 = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label(18,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visForest.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendLabels5 = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label(18,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visForest.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendLabels6 = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label(18,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visForest.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendTitle = ui.Label('Forest Canopy Height (m)',subtitlestyle)//.style().set();
//var thresholds = ['3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
//var selmin = ui.Select({items: thresholds, 
//    placeholder: '3',
//    onChange: function(thresh){
//      maplyr = maplyr.setEeObject(gf.updateMask(gf.gte(Number(thresh))));
//      maplyrB = maplyrB.setEeObject(gbf.updateMask(gbf.gte(Number(thresh))));
//    }});
var f2000label = ui.Panel([ui.Label('Forest height 2000',{margin: '2px 8px',backgroundColor: bgColor})],'flow',{margin: '4px 0px',backgroundColor: bgColor,width:'85px'})
var f2020label = ui.Panel([ui.Label('Forest height 2020',{margin: '2px 8px',backgroundColor: bgColor})],'flow',{margin: '4px 0px',backgroundColor: bgColor,width:'85px'})
var flabel = ui.Panel([ui.Label('Forest height 2020',{margin: '2px 8px',backgroundColor: bgColor})],'flow',{margin: '4px 0px',backgroundColor: bgColor,width:'85px'})
var losslabel = ui.Panel([ui.Label('Net forest height loss 2000-2020',{margin: '2px 8px',backgroundColor: bgColor})],
  'flow',{margin: '4px 0px 4px 0px',backgroundColor: bgColor,width:'85px'})
var gainlabel = ui.Panel([ui.Label('Net forest height gain 2000-2020',{margin: '2px 8px',backgroundColor: bgColor})],
  'flow',{margin: '4px 0px 4px 0px',backgroundColor: bgColor,width:'85px'})
var distlabel = ui.Panel([ui.Label('Forest height 2020, forest affected by stand-replacement disturbances after 2001',{margin: '2px 8px',backgroundColor: bgColor})],
  'flow',{margin: '4px 0px 4px 0px',backgroundColor: bgColor,width:'165px'})
var legend00 = ui.Panel([forestBar00,legendLabels5,f2000label], ui.Panel.Layout.flow('horizontal'),{margin: '0px 4px',backgroundColor: bgColor})
var legend20 = ui.Panel([forestBar20,legendLabels6,f2020label], ui.Panel.Layout.flow('horizontal'),{margin: '0px 4px',backgroundColor: bgColor})
var legendF = ui.Panel([forestBar,legendLabels,flabel, vert], ui.Panel.Layout.flow('horizontal'),{margin: '0px 4px',backgroundColor: bgColor})
var legendD = ui.Panel([ distBar, legendLabels2,distlabel], ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
var legendL = ui.Panel([ lossBar, legendLabels3,losslabel, vert2], ui.Panel.Layout.flow('horizontal'),{margin: '0px 4px',backgroundColor: bgColor})
var legendG = ui.Panel([gainBar, legendLabels4,gainlabel], ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
//var selectmin = ui.Panel([ui.Label('Select minimum canopy height (m):',{margin: '12px 4px',color: '#555555', fontSize:'16px',fontWeight: 'bold',backgroundColor: bgColor,whiteSpace:'normal'}),selmin], ui.Panel.Layout.flow('horizontal',true),{margin: '4px',backgroundColor: bgColor})
var legendPanelA = ui.Panel([legendF,legendD],ui.Panel.Layout.flow('horizontal',true),{backgroundColor: bgColor});
var legendPanelB = ui.Panel([legendL,legendG],ui.Panel.Layout.flow('horizontal',true),{backgroundColor: bgColor});
var legendPanelVis = ui.Panel([legendPanelA,legendPanelB],'flow',{backgroundColor: bgColor});
var images = {
  'Forest height 2000': forest00,
  'Forest height 2020': forest20,
  'Forest dynamic 2000-2020': dyn,
}
var layerOptions = {
  'Forest dynamic 2000-2020': legendPanelVis,
  'Forest height 2000': legend00,
  'Forest height 2020': legend20,
  };
var layerOptionsPanel = ui.Panel([legendPanelVis],'flow',{backgroundColor: bgColor});
var selLayer = ui.Select({items: ['Forest dynamic 2000-2020','Forest height 2000','Forest height 2020'],//], 
      placeholder: 'Forest dynamic 2000-2020',
      onChange: function(lyr){
      mapPanel.layers().set(0,images[lyr]);
      //var last = layerOptionsPanel.widgets().get(0).widgets().length();
      //layerOptionsPanel.widgets().get(0).widgets().get(last).clear()
      //layerOptionsPanel.widgets().get(last).clear()
      layerOptionsPanel.clear();
      layerOptionsPanel.add(layerOptions[lyr]);
    }});
var instructions = ui.Panel([ui.Label("Click for forest canopy height value:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var height00 = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var height20 = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var clickedHeight = ui.Panel([latlon,height00,height20], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var panel = ui.Panel();
panel.style().set({
  width: '450px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
panel.add(title);
//panel.add(legendPanelA);
//panel.add(legendPanelB);
panel.add(ui.Label('Display layer:',subtitlestyle));
panel.add(selLayer);
panel.add(legendTitle);
panel.add(layerOptionsPanel);
panel.add(ui.Label());
//panel.add(selectmin);
panel.add(instructions);
panel.add(clickedHeight);
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onClick(getHeight);
// Register a function to draw a chart when a user clicks on the map.
function getHeight(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  latlon.setValue('Lat: '+coords.lat.toFixed(5)+', Lon: '+coords.lon.toFixed(5));
  var h00val = Forest_height_2000.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  height00.setValue('Forest height 2000: '+h00val+' meters');
  var h20val = Forest_height_2020.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  height20.setValue('Forest height 2020: '+h20val+' meters');
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(1, dot);
}