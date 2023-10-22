var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor}
var gf = ee.ImageCollection('users/potapovpeter/GEDI_V27')//.mosaic().unmask();
var gbf = ee.ImageCollection('users/potapovpeter/GEDI_V25_Boreal')//.mosaic().unmask();
var comb = gf.merge(gbf).mosaic()
gf = gf.mosaic().unmask()
gbf = gbf.mosaic().unmask()
//gedi12f = gedi12f.updateMask(gedi12f.gte(5));
//gedi12bf = gedi12bf.updateMask(gedi12bf.gte(5));
var visParam = {min:0,max:30,palette:'white, #006600'};
var maplyr = ui.Map.Layer(gf.updateMask(gf.gte(3)),visParam,'Forest Canopy Height');
var visParamB = {min:0,max:30,palette:'white, #004d4d'};
var maplyrB = ui.Map.Layer(gbf.updateMask(gbf.gte(3)),visParamB,'Forest Canopy Height Boreal');
mapPanel.add(maplyr);
mapPanel.add(maplyrB);
mapPanel.setOptions("HYBRID");
mapPanel.setCenter(0,0,3);
var title = ui.Panel([//ui.Thumbnail(ee.Image('users/ahudson2/gladLogo'),{dimensions:'50', bands:['b1','b2','b3']}),
  ui.Label({
    value: 'Global Forest Canopy Height, 2019',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("P. Potapov, X. Li, A. Hernandez-Serna, A. Tyukavina, M.C. Hansen, A. Kommareddy, A. Pickens, S. Turubanova, H. Tang, C. E. Silva, J. Armston, R. Dubayah, J. B. Blair, M. Hofton (2020).",{margin: '8px 0px 4px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.1016/j.rse.2020.112165",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.1016/j.rse.2020.112165"),
  ui.Panel([ui.Label("A new, 30-m spatial resolution global forest canopy height map was developed through the integration of the Global Ecosystem Dynamics Investigation (GEDI) lidar forest structure measurements and Landsat analysis-ready data time-series (Landsat ARD). The GEDI RH95 (relative height at 95%) metric was used to calibrate the model. The Landsat multi-temporal metrics that represent the surface phenology serve as the independent variables. The “moving window” locally calibrated and applied regression tree ensemble model was implemented to ensure high quality of forest height prediction and global map consistency. The model was extrapolated in the boreal regions (beyond the GEDI data range, 52°N to 52°S) to create the global forest height prototype map.",{backgroundColor: bgColor}),
    //ui.Label("Global Ecosystem Dynamics Investigation (GEDI)",{backgroundColor: bgColor},"gedi.umd.edu"),
    //ui.Label("lidar forest structure measurements and",{backgroundColor: bgColor}),
    //ui.Label("Landsat analysis-ready data time-series",{backgroundColor: bgColor},"https://glad.geog.umd.edu/ard/home"),
    //ui.Label(". The GEDI RH95 (relative height at 95%) metric was used to calibrate the model. The Landsat multi-temporal metrics that represent the surface phenology serve as the independent variables. The “moving window” locally calibrated and applied regression tree ensemble model was implemented to ensure high quality of forest height prediction and global map consistency. The model was extrapolated in the boreal regions (beyond the GLAD data range, 52°N to 52°S) to create the global forest height prototype map.",{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  ui.Panel([ui.Label("GEDI:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),ui.Label("https://gedi.umd.edu",{backgroundColor: bgColor, margin: '8px 0px'},"https://gedi.umd.edu")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}),
  ui.Panel([ui.Label("Landsat ARD:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),ui.Label("https://glad.umd.edu/ard/home",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.umd.edu/ard/home")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}),
  ui.Panel([ui.Label("Data download:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),ui.Label("https://glad.umd.edu/dataset/gedi",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.umd.edu/dataset/gedi/")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
],'flow',{backgroundColor: bgColor});
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 100],dimensions: '15x150',format: 'png',min: visParam.min,max: visParam.max,palette: palette,};}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visParam.max-visParam.min)/100.0).add(visParam.min),
  params: makeColorBarParams(['white','006600']),
    style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
}); 
var vert = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visParam.max-visParam.min)/100.0).add(visParam.min),
  params: {bbox: [0, 0, 1, 100],dimensions: '2x150',format: 'png',palette: ['555555']},
  style: {stretch: 'vertical', margin: '8px 0px 8px 14px', height: '100px', width: '2px'},
}); 
var colorBarB = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').multiply((visParam.max-visParam.min)/100.0).add(visParam.min),
  params: makeColorBarParams(['white','004d4d']),
  style: {stretch: 'vertical', margin: '8px 0px 8px 4px', height: '100px', width: '15px'},
}); 
var legendLabels = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 32px',backgroundColor: bgColor}),
    ui.Label((visParam.max+visParam.min)/2,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visParam.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendLabelsB = ui.Panel({
  widgets: [ui.Label('≥30', {margin: '1px 4px 32px',backgroundColor: bgColor}),
    ui.Label((visParam.max+visParam.min)/2,{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label(visParam.min, {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendTitle = ui.Label('Forest Canopy Height (m)',subtitlestyle)//.style().set();
var thresholds = ['3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
var selmin = ui.Select({items: thresholds, 
    placeholder: '3',
    onChange: function(thresh){
      maplyr = maplyr.setEeObject(gf.updateMask(gf.gte(Number(thresh))));
      maplyrB = maplyrB.setEeObject(gbf.updateMask(gbf.gte(Number(thresh))));
    }});
var southlabel = ui.Panel([ui.Label('GEDI data extent',{margin: '2px 8px',backgroundColor: bgColor})],'flow',{margin: '4px 0px',backgroundColor: bgColor,width:'78px'})
var boreallabel = ui.Panel([ui.Label('Boreal regions (prototype)',{margin: '2px 8px',backgroundColor: bgColor})],
  'flow',{margin: '4px 0px 4px 12px',backgroundColor: bgColor,width:'85px'})
var legend = ui.Panel([southlabel,colorBar, legendLabels,vert], ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
var legendB = ui.Panel([boreallabel,colorBarB, legendLabelsB], ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
var selectmin = ui.Panel([ui.Label('Select minimum canopy height (m):',{margin: '12px 4px',color: '#555555', fontSize:'16px',fontWeight: 'bold',backgroundColor: bgColor,whiteSpace:'normal'}),selmin], ui.Panel.Layout.flow('horizontal',true),{margin: '4px',backgroundColor: bgColor})
var legendPanel = ui.Panel([legend,legendB],ui.Panel.Layout.flow('horizontal',true),{backgroundColor: bgColor});
var instructions = ui.Panel([ui.Label("Click for forest canopy height value:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var height = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var clickedHeight = ui.Panel([latlon,height], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var panel = ui.Panel();
panel.style().set({
  width: '450px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
panel.add(title);
panel.add(legendTitle);
panel.add(legendPanel);
panel.add(ui.Label());
panel.add(selectmin);
panel.add(instructions);
panel.add(clickedHeight);
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onClick(getHeight);
// Register a function to draw a chart when a user clicks on the map.
function getHeight(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  latlon.setValue('Lat: '+coords.lat.toFixed(5)+', Lon: '+coords.lon.toFixed(5));
  var hval = comb.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  height.setValue(hval+' meters');
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(2, dot);
}