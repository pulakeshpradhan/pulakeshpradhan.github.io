var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor}
var landmask = ee.Image("projects/glad/OceanMask").lte(1)
var visParamMap = {"min":0,"max":255,"palette":["FEFECC","FAFAC3","F7F7BB","F4F4B3","F1F1AB","EDEDA2","EAEA9A","E7E792","E4E48A",
"E0E081","DDDD79","DADA71","D7D769","D3D360","D0D058","CDCD50","CACA48","C6C63F","C3C337","C0C02F","BDBD27","B9B91E","B6B616",
"B3B30E","B0B006","609C60","5C985C","589558","549254","508E50","4C8B4C","488848","448544","408140","3C7E3C","387B38","347834",
"317431","2D712D","296E29","256B25","216721","1D641D","196119","155E15","115A11","0D570D","095409","065106","643700","643a00",
"643d00","644000","644300","644600","644900","654c00","654f00","655200","655500","655800","655a00","655d00","656000","656300",
"666600","666900","666c00","666f00","667200","667500","667800","667b00","ff99ff","FC92FC","F98BF9","F685F6","F37EF3","F077F0",
"ED71ED","EA6AEA","E763E7","E45DE4","E156E1","DE4FDE","DB49DB","D842D8","D53BD5","D235D2","CF2ECF","CC27CC","C921C9","C61AC6",
"C313C3","C00DC0","BD06BD","bb00bb","000003","000004","000005","BFC0C0","B7BDC2","AFBBC4","A8B8C6","A0B6C9","99B3CB","91B1CD",
"89AFD0","82ACD2","7AAAD4","73A7D6","6BA5D9","64A3DB","5CA0DD","549EE0","4D9BE2","4599E4","3E96E6","3694E9","2E92EB","278FED",
"1F8DF0","188AF2","1088F4","0986F7","55A5A5","53A1A2","519E9F","4F9B9C","4D989A","4B9597","499294","478F91","458B8F","43888C",
"418589","3F8286","3D7F84","3B7C81","39797E","37767B","357279","336F76","316C73","2F6970","2D666E","2B636B","296068","285D66",
"bb93b0","B78FAC","B48CA9","B189A6","AE85A2","AA829F","A77F9C","A47B99","A17895","9E7592","9A718F","976E8C","946B88","916885",
"8D6482","8A617F","875E7B","845A78","815775","7D5472","7A506E","774D6B","744A68","714765","de7cbb","DA77B7","D772B3","D46EAF",
"D169AB","CE64A8","CB60A4","C85BA0","C4579C","C15298","BE4D95","BB4991","B8448D","B54089","B23B86","AF3682","AB327E","A82D7A",
"A52976","A22473","9F1F6F","9C1B6B","991667","961264","000000","000000","000000",
"1964EB","1555E4","1147DD","0E39D6","0A2ACF","071CC8","030EC1","0000BA",
"0000BA","040464","0000FF","3051cf","000000","000000","000000","000000",
"000000","000000","000000","000000","000000","000000","000000","000000",
"000000","000000","000000","000000","000000","000000","000000","000000",
"547FC4","4D77BA","466FB1","4067A7","395F9E","335895","335896","335897","ff2828","ffffff","d0ffff","ffe0d0","ff7d00","fac800","c86400",
"fff000","afcd96","afcd96","64dcdc","00ffff","00ffff","00ffff","111133","000000"]};
var change =ee.Image('projects/glad/GLCLU2020/v2/LCLUC').updateMask(landmask);
var m00 = ee.Image('projects/glad/GLCLU2020/v2/LCLUC_2000').updateMask(landmask);
var m05 = ee.Image('projects/glad/GLCLU2020/v2/LCLUC_2005').updateMask(landmask);
var m10 = ee.Image('projects/glad/GLCLU2020/v2/LCLUC_2010').updateMask(landmask);
var m15 = ee.Image('projects/glad/GLCLU2020/v2/LCLUC_2015').updateMask(landmask);
var m20 = ee.Image('projects/glad/GLCLU2020/v2/LCLUC_2020').updateMask(landmask);
var map2000 = ui.Map.Layer(m00,visParamMap,'2000 land cover and land use')
var map2005 = ui.Map.Layer(m05,visParamMap,'2005 land cover and land use')
var map2010 = ui.Map.Layer(m10,visParamMap,'2010 land cover and land use')
var map2015 = ui.Map.Layer(m15,visParamMap,'2015 land cover and land use')
var map2020 = ui.Map.Layer(m20,visParamMap,'2020 land cover and land use')
var mapchange = ui.Map.Layer(change,visParamMap,'2000-2020 land cover and land use change')
//mapPanel.add(map2000);
//mapPanel.add(map2020);
mapPanel.add(mapchange);
//mapPanel.add(maplyr);
mapPanel.setOptions("HYBRID");
mapPanel.setCenter(0,0,3);
var title = ui.Panel([//ui.Thumbnail(ee.Image('users/ahudson2/gladLogo'),{dimensions:'50', bands:['b1','b2','b3']}),
  ui.Label({
    value: 'Global land cover and land use change 2000-2020',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("P.V. Potapov, M.C. Hansen, A.H. Pickens, A. Hernandez-Serna, A. Tyukavina, S. Turubanova, V. Zalles, X. Li, A. Khan, F. Stolle, N. Harris, X.-P. Song, A. Baggett, I. Kommareddy, A. Komareddy (2022).",{margin: '8px 0px 8px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.3389/frsen.2022.856903",{color:'blue',backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.3389/frsen.2022.856903"),
  ui.Panel([ui.Label("Recent advances in Landsat archive data processing and characterization enhanced our capacity to map land cover and land use globally with higher precision, temporal frequency, and thematic detail. Here, we present the first results from a project aimed at annual multidecadal land monitoring providing critical information for tracking global progress towards sustainable development. The global 30-m spatial resolution dataset quantifies changes in forest extent and height, cropland, built-up lands, surface water, and perennial snow and ice extent from the year 2000 to 2020. Landsat Analysis Ready Data served as an input for land cover and use mapping. Each thematic product was independently derived using locally and regionally calibrated machine learning tools. Thematic maps validation using a statistical sample of reference data confirmed their high accuracy (user’s and producer’s accuracies above 85% for all land cover and land use themes, except for built-up lands). Our results revealed dramatic changes in global land cover and land use over the past 20 years. The bitemporal dataset is publicly available and serves as a first input for the global land monitoring system. To share location copy URL.",{backgroundColor: bgColor}),
    //ui.Label("Global Ecosystem Dynamics Investigation (GEDI)",{backgroundColor: bgColor},"gedi.umd.edu"),
    //ui.Label("lidar forest structure measurements and",{backgroundColor: bgColor}),
    //ui.Label("Landsat analysis-ready data time-series",{backgroundColor: bgColor},"https://glad.geog.umd.edu/ard/home"),
    //ui.Label(". The GEDI RH95 (relative height at 95%) metric was used to calibrate the model. The Landsat multi-temporal metrics that represent the surface phenology serve as the independent variables. The “moving window” locally calibrated and applied regression tree ensemble model was implemented to ensure high quality of forest height prediction and global map consistency. The model was extrapolated in the boreal regions (beyond the GLAD data range, 52°N to 52°S) to create the global forest height prototype map.",{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  //ui.Panel([ui.Label("Data download:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),ui.Label("https://glad.umd.edu/dataset/global-land-cover-land-use-v1.0",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.umd.edu/dataset/global-land-cover-land-use-v1.0")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
  ui.Label("Data Access:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),
  ui.Label("https://glad.umd.edu/dataset/GLCLUC2020",{color:'blue',backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://glad.umd.edu/dataset/GLCLUC2020"),
  ui.Label("Earth Engine Assets",{color:'blue',backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://code.earthengine.google.com/f9f56ceb38ed9e911767c4014eeb536d"),
  ui.Label("GeoTIFF download",{color:'blue',backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU2000-2020/v2/download.html"),
  //ui.Label("Legend file",{color:'blue',backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU2000-2020/legend.xlsx")
],'flow',{backgroundColor: bgColor});
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 8px'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px',backgroundColor: bgColor}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
    style:{backgroundColor: bgColor}
  });
};
var mapLegend = ui.Panel([ui.Thumbnail(ee.Image('projects/glad/GLCLU2020/legend'),{stretch:'horizontal',dimensions:'2000',bands:['b1','b2','b3']}),
  //ui.Label("EE Image ID: 'projects/glad/GLCmap2019'",{backgroundColor: bgColor}),
  //ui.Panel([ui.Label("Download Legend",{backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU_2019/legend.xlsx")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor, stretch:'horizontal'});//ui.Label('no legend yet')
var logo = ui.Panel([ui.Thumbnail(ee.Image('projects/glad/glad_logo2'),{stretch:'horizontal',dimensions:'372',bands:['b1','b2','b3'],backgroundColor: bgColor}),
  //ui.Label("EE Image ID: 'projects/glad/GLCmap2019'",{backgroundColor: bgColor}),
  //ui.Panel([ui.Label("Download Legend",{backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU_2019/legend.xlsx")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor});//ui.Label('no legend yet')
var lyrs = {
  '2000-2020 dynamics': mapchange,
  '2000': map2000,
  '2005': map2005,
  '2010': map2010,
  '2015': map2015,
  '2020': map2020,
};
var layerOptions = {
  '2000-2020 dynamics': mapLegend,
  '2000': mapLegend,
  '2005': mapLegend,
  '2010': mapLegend,
  '2015': mapLegend,
  '2020': mapLegend,
}
var layerOptionsPanel = ui.Panel([mapLegend],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var sellayer = ui.Select({items: Object.keys(lyrs),//], 
  placeholder: '2000-2020 dynamics',
  onChange: function(lyr){
    layerOptionsPanel.clear();
    layerOptionsPanel.add(layerOptions[lyr]);
    mapPanel.layers().set(0,lyrs[lyr]);
  }
});
var instructions = ui.Panel([ui.Label("Click for map value:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
//var strataval = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var mapval = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var m00val = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var m05val = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var m10val = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var m15val = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var m20val = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var clickedVal = ui.Panel([latlon,mapval,m00val,m05val,m10val,m15val,m20val], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var panel = ui.Panel();
panel.style().set({
  width: '550px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
//panel.add(logo)
panel.add(title);
panel.add(sellayer);
panel.add(layerOptionsPanel)
panel.add(ui.Label());
panel.add(instructions);
panel.add(clickedVal);
//grabs from URL or sets default
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),0).getInfo();//can replace -9.98 with wherever you would like the default lat to be
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),0).getInfo();//change default long
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),3).getInfo();//change default zoom
//set center
mapPanel.setCenter(startlon,startlat,startzoom);
//a listener
mapPanel.onChangeBounds(changeURL);
function changeURL(input){
  ui.url.set({'lon':input.lon,'lat':input.lat,'zoom':input.zoom});
}
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onClick(getVal);
// Register a function to draw a chart when a user clicks on the map.
function getVal(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  latlon.setValue('Lat: '+coords.lat.toFixed(5)+', Lon: '+coords.lon.toFixed(5));
  //var sval = strata.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  m00val = m00val.setValue('2000: ' + getAnnualMapVal(m00.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo()));
  m05val = m05val.setValue('2005: ' + getAnnualMapVal(m05.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo()));
  m10val = m10val.setValue('2010: ' + getAnnualMapVal(m10.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo()));
  m15val = m15val.setValue('2015: ' + getAnnualMapVal(m15.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo()));
  m20val = m20val.setValue('2020: ' + getAnnualMapVal(m20.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo()));
  var mval = change.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  var maplabel = getMapVal(mval);
  mapval.setValue('Map label: ' +maplabel)// +' (map value: '+mval+')')
  var wetland = '';
  //if(sval >0 && sval<= 7){wetland='Non-wetland';}
  //else 
  //if(sval>=8 && sval<=14 ){wetland ='Wetland';}
  //strataval.setValue('Strata: '+wetland+' '+strataDict[sval]);
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(3, dot);
}
function getMapVal(val){
  var wl,perc,treetype,height,label;
  if(val<100){
    wl = 'Terra firma ';
    if(val==23){perc = 0; label = wl+perc+'% bare ground';}
    else if(val<=24){perc = 100-(val*4); label = wl+perc+'% bare ground';}
    else if (val<=47){height = val-25+3; label = wl+'stable trees, '+height+'m';}
    else if (val==48){label = wl+'stable trees, >25m';}
    else if (val<=71){height = val-49+3; label = wl+'trees with disturbance event, 2020 height '+height+'m';}
    else if (val==72){label = wl+'trees with disturbance event, 2020 height >25m';}
    else if (val<=95){height = val-73+3; label = wl+'tree gain, '+height+'m';}
    else if (val==96){label = wl+'tree gain, >25m';}
    //else if (val==116){label = wl+'non-fire tree cover loss without crops or built-up';}
  } else if(val<=200){
    val = val-100;
    wl = 'Wetland ';
    if(val==23){perc = 0; label = wl+perc+'% bare ground';}
    else if(val<=24){perc = 100-(val*4); label = wl+perc+'% bare ground';}
    else if (val<=47){height = val-25+3; label = wl+'stable trees, '+height+'m';}
    else if (val==48){label = wl+'stable trees, >25m';}
    else if (val<=71){height = val-49+3; label = wl+'trees with disturbance event, 2020 height '+height+'m';}
    else if (val==72){label = wl+'trees with disturbance event, 2020 height >25m';}
    else if (val<=95){height = val-73+3; label = wl+'tree gain, '+height+'m';}
    else if (val==96){label = wl+'tree gain, >25m';}
    //else if (val==116){label = wl+'non-fire tree cover loss without crops or built-up';}
  }
  else if(val==208){label = 'Permanent water';}
  else if(val==209){label = 'Persistent water loss';}
  else if(val==210){label = 'Persistent water gain';}
  else if(val==211){label = 'Variable water presence';}
  else if(val==240){label = 'Tree cover to short vegetation';}
  else if(val==241){label = 'Permanent snow/ice';}
  else if(val==242){label = 'Snow/ice gain';}
  else if(val==243){label = 'Snow/ice loss';}
  else if(val==244){label = 'Stable cropland';}
  else if(val==245){label = 'Cropland gain from trees';}
  else if(val==246){label = 'Cropland gain from wetland vegetation';}
  else if(val==247){label = 'Cropland gain from other';}
  else if(val==248){label = 'Cropland loss to tree';}
  else if(val==249){label = 'Cropland loss to other';}
  else if(val==250){label = 'Stable built-up';}
  else if(val==251){label = 'Built-up gain from trees';}
  else if(val==252){label = 'Built-up gain from crop';}
  else if(val==253){label = 'Built-up gain from other';}
  else if(val==254){label = 'Ocean';}
  else if(val==252){label = 'No-data';}
  return label;
}
function getAnnualMapVal(val){
  var wl,perc,treetype,height,label;
  if(val<100){
    wl = 'Terra firma ';
    if(val==23){perc = 0; label = wl+perc+'% bare ground';}
    else if(val<=24){perc = 100-(val*4); label = wl+perc+'% bare ground';}
    else if (val<=47){height = val-25+3; label = wl+'trees, '+height+'m';}
    else if (val==48){label = wl+'trees, >25m';}
    //else if (val==116){label = wl+'non-fire tree cover loss without crops or built-up';}
  } else if(val<=200){
    val = val-100;
    wl = 'Wetland ';
    if(val==23){perc = 0; label = wl+perc+'% bare ground';}
    else if(val<=24){perc = 100-(val*4); label = wl+perc+'% bare ground';}
    else if (val<=47){height = val-25+3; label = wl+'trees, '+height+'m';}
    else if (val==48){label = wl+'trees, >25m';}
  }
  else if(val>=200 && val<=207){
    perc = ((val-200)*10)+30; label = perc+'% water';}
  else if(val==241){label = 'Permanent snow/ice';}
  else if(val==242){label = 'Snow/ice gain';}
  else if(val==243){label = 'Snow/ice loss';}
  else if(val==244){label = 'Cropland';}
  else if(val==250){label = 'Built-up';}
  else if(val==254){label = 'Ocean';}
  else if(val==252){label = 'No-data';}
  return label;
}