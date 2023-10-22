var image = ui.import && ui.import("image", "image", {
      "id": "projects/glad/GLClegend"
    }) || ee.Image("projects/glad/GLClegend");
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor}
var landmask = ee.Image("projects/glad/landBuffer4").mask();
var map = ee.ImageCollection('projects/glad/GLCmap2019').mosaic().updateMask(landmask);
var strata = ee.Image('projects/glad/GLCstrata2019').updateMask(landmask);
var visParamStrata = {min:0,max:20,palette:['000000','ffffdd','aaaa00','ffff00',
  '008800', '005500','ff00ff', 'ff0000','dddddd', '999999','6699dd', '009999',
  '55bb77', 'bb4477','bb0000', 'ffffff','0000aa', 'ffaa00','00ffff', '111111',
  '000000']};
var visParamMap = {min:0,max:255,palette:['FEFECC','FDFDC8','FCFCC4','FAFAC0','F9F9BC','F7F7B8','F6F6B4','F4F4B0','F2F2AC','F1F1A8','EFEFA4',
'EEEEA1','ECEC9D','EBEB99','E9E995','E8E891','E6E68D','E5E589','E3E385','E2E281','E0E07D','DFDF7A','DDDD76','DBDB72','DADA6E','D8D86A','D5D564',
'D4D460','D2D25C','D1D158','CFCF54','CDCD50','CCCC4D','CACA49','C9C945','C7C741','C6C63D','C4C439','C3C335','C1C131','C0C02D','BEBE29','BDBD26',
'BBBB22','BABA1E','B8B81A','B6B616','B5B512','B3B30E','B2B20A','B0B006','609C60','5E9A5E','5C985C','5A965A','589458','569256','549054','528E52',
'508C50','4E8A4E','4C884C','4A864A','488448','468246','448044','427E42','407C40','3E7A3E','3C783C','3A763A','387438','367236','347034','326E32',
'316D31','2F6C2F','2C6A2C','296829','276627','246524','216321','1E611E','1B5E1B','175B17','145A14','115811','0E560E','0B540B','095309','065106',
'033303','FFABFF','FFA5FF','FF9EFF','FF98FF','FF91FF','FF8AFF','FF83FF','FF7DFF','FF76FF','FF6FFF','FF68FF','FF62FF','FF5AFF','FF53FF','FF4CFF',
'FF45FF','FF3EFF','FF38FF','FF31FF','FF2AFF','FF23FF','FF1CFF','FF16FF','FF0FFF','FF0000','000000','000000','000000','BFC0C0','BCBFC0','B8BEC2',
'B4BCC3','B1BBC4','ADBAC5','A9B9C6','A6B8C7','A2B7C9','9EB6CA','9AB5CB','97B4CC','93B2CD','90B2CE','8DB0CF','89AFD0','85AED1','82ADD3','7EACD4',
'7AABD5','77AAD6','73A9D7','70A8D8','6CA7D9','68A5DA','64A3DC','60A2DD','5CA0DE','589FDF','559EE0','519DE1','4E9CE2','4A9BE3','469AE4','4399E6',
'3F98E7','3B97E8','3895E9','3494EA','3193EB','2E92EC','2A91ED','2690EE','238FF0','1F8EF1','1C8DF2','188CF3','148BF4','118AF5','0D88F6','0986F7',
'9DC7C7','99C5C5','95C3C3','90C1C1','8CBFBF','87BDBD','83BBBB','7FB9B9','7AB7B7','76B5B5','72B3B3','6DB1B1','67AEAE','62ABAB','5EA9A9','5AA7A7',
'55A5A5','51A3A3','4DA1A1','489F9F','449D9D','3F9B9B','3A9999','369797','327C7C','327A7B','31787A','317678','307477','2F7275','2F7074','2F6E73',
'2C6A6F','2B696E','2B676D','2B656C','2A636A','296169','295F67','285D66','275B65','8C7BF0','8B77EF','8B74EF','8A71EE','8A6DEE','896AED','8967ED',
'8864EC','8861EC','875DEB','875AEB','8657EA','8351E7','834EE7','824BE6','8248E6','8144E5','8141E5','803EE4','803BE4','7F38E3','7F34E3','7E31E2',
'7D2EE1','C80000','000000','000000','000000','00F4F4','00E8E8','00DDDD','00D0D0','00C5C5','00B7B7','00ACAC','009F9F','009494','008888','00007D',
'FFFFFF','FF7D00','000000','000032','010101'
  ]};
var stratalyr = ui.Map.Layer(strata,visParamStrata,'Global Land Strata');
var maplyr = ui.Map.Layer(map,visParamMap,'Global land cover and land use');
mapPanel.add(maplyr);
//mapPanel.add(maplyr);
mapPanel.setOptions("HYBRID");
mapPanel.setCenter(0,0,3);
var title = ui.Panel([//ui.Thumbnail(ee.Image('users/ahudson2/gladLogo'),{dimensions:'50', bands:['b1','b2','b3']}),
  ui.Label({
    value: 'Global land cover and land use 2019, v1.0',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("M.C. Hansen, P.V. Potapov, A.H. Pickens, A. Tyukavina, A. Hernandez-Serna, V. Zalles, S. Turubanova, I. Kommareddy, S.V. Stehman (2022).",{margin: '8px 0px 8px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.1088/1748-9326/ac46ec",{color:'blue',backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.1088/1748-9326/ac46ec"),
  ui.Panel([ui.Label("The appropriation of natural land covers into land use systems is a significant global environmental change dynamic, impacting climate, hydrology, biodiversity and other earth systems.  Here, we present a 2019 global land cover and land use map derived from Landsat satellite imagery, and from it estimate spatial extent and dispersion of land use disaggregated by climate domain and ecozone.  We find that percent of area under land use and distance to land use follow a power law that depicts an increasingly random spatial distribution of land use as it extends across lands of comparable development potential.  For highly developed climate/ecozones, such as temperate and sub-tropical terra firma vegetation on low slopes, land use occupies half of the land surface, and the average distance of all land to land use is less than one kilometer.  For such landscapes, land use is a continuum with remnant natural land cover having low areal extent and high fragmentation.  The tropics generally have the greatest potential for land use expansion, particularly in South America. An exception is Asian humid tropical terra firma vegetated lowland, which has land use intensities comparable to that of temperate breadbaskets. Montane lands have a magnitude smaller percent land use and are one magnitude further from land use than their lowland counterparts. The percent area of wetland ecozones is inversely proportional to percent land use on low slopes, indicating historical wetland loss.  Results implicate planning efforts in maintaining natural systems and associated ecosystem services, as land use dominates where intrinsic factors such as climate and slope are not limiting. To share location copy URL.",{backgroundColor: bgColor}),
    //ui.Label("Global Ecosystem Dynamics Investigation (GEDI)",{backgroundColor: bgColor},"gedi.umd.edu"),
    //ui.Label("lidar forest structure measurements and",{backgroundColor: bgColor}),
    //ui.Label("Landsat analysis-ready data time-series",{backgroundColor: bgColor},"https://glad.geog.umd.edu/ard/home"),
    //ui.Label(". The GEDI RH95 (relative height at 95%) metric was used to calibrate the model. The Landsat multi-temporal metrics that represent the surface phenology serve as the independent variables. The “moving window” locally calibrated and applied regression tree ensemble model was implemented to ensure high quality of forest height prediction and global map consistency. The model was extrapolated in the boreal regions (beyond the GLAD data range, 52°N to 52°S) to create the global forest height prototype map.",{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  //ui.Panel([ui.Label("Data download:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),ui.Label("https://glad.umd.edu/dataset/global-land-cover-land-use-v1.0",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.umd.edu/dataset/global-land-cover-land-use-v1.0")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
  ui.Label("https://glad.umd.edu/dataset/global-land-cover-land-use-v1",{color:'blue',backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://glad.umd.edu/dataset/global-land-cover-land-use-v1"),
  ui.Label("Data Access:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),
  ui.Label("Earth Engine Assets",{color:'blue',backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://code.earthengine.google.com/82b7ef8d9d50c68029b5b1fb2774ab8f#https://glad.umd.edu/dataset/global-land-cover-land-use-v1=https://glad.umd.edu/dataset/global-land-cover-land-use-v1;"),
  ui.Label("GeoTIFF download",{color:'blue',backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU_2019/download.html"),
  ui.Label("Legend file",{color:'blue',backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU_2019/legend.xlsx")
  //ui.Label("Earth Engine access:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),
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
var strataLegend = ui.Panel(ui.Label({value:'Terra firma classes:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}));
strataLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
strataLegend.add(makeRow('ffffdd','True desert'))
strataLegend.add(makeRow('aaaa00','Semi-arid'))
strataLegend.add(makeRow('ffff00','Dense short vegetation'))
strataLegend.add(makeRow('008800','Open tree cover'))
strataLegend.add(makeRow('005500','Dense tree cover'))
strataLegend.add(makeRow('ff00ff','Recent tree cover gain'))
strataLegend.add(makeRow('ff0000','Non-fire loss without 2019 trees, cropland, or built-up'))
strataLegend.add(ui.Label({value:'Wetland classes:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}))
strataLegend.add(makeRow('dddddd','Salt pan'))
strataLegend.add(makeRow('999999','Semi-arid'))
strataLegend.add(makeRow('6699dd','Dense short vegetation'))
strataLegend.add(makeRow('009999','Open tree cover'))
strataLegend.add(makeRow('55bb77','Dense tree cover'))
strataLegend.add(makeRow('bb4477','Recent tree cover gain'))
strataLegend.add(makeRow('bb0000','Non-fire loss without 2019 trees, cropland, or built-up'))
strataLegend.add(ui.Label({value:'Superceding classes:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}))
strataLegend.add(makeRow('ffffff','Ice'))
strataLegend.add(makeRow('0000aa','Water'))
strataLegend.add(makeRow('ffaa00','Cropland'))
strataLegend.add(makeRow('00ffff','Built-up'))
strataLegend.add(makeRow('111111','Ocean'))
var strataDict = ['No data','True desert','Semi-arid','Dense short vegetation'
,'Open tree cover'
,'Dense tree cover'
,'Recent tree cover gain'
,'Non-fire loss'
,'salt pan'
,'semi-arid'
,'dense short vegetation'
,'open tree cover'
,'dense tree cover'
,'recent tree cover gain'
,'non-fire loss without 2019 trees, cropland, or built-up'
,'Ice'
,'Water'
,'Cropland'
,'Built-up'
,'Ocean'];
var wetlandDict = ['Non-wetland','Wetland','']
var mapLegend = ui.Panel([ui.Thumbnail(ee.Image('projects/glad/GLClegend'),{stretch:'horizontal',dimensions:'2000',bands:['b1','b2','b3']}),
  //ui.Label("EE Image ID: 'projects/glad/GLCmap2019'",{backgroundColor: bgColor}),
  //ui.Panel([ui.Label("Download Legend",{backgroundColor: bgColor, margin: '0px 4px 8px 8px'},"https://storage.googleapis.com/earthenginepartners-hansen/GLCLU_2019/legend.xlsx")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor, stretch:'horizontal'});//ui.Label('no legend yet')
var lyrs = {
  'Map': maplyr,
  'Strata': stratalyr,
};
var layerOptions = {
  'Map': mapLegend,
  'Strata': strataLegend,
}
var layerOptionsPanel = ui.Panel([mapLegend],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var sellayer = ui.Select({items: Object.keys(lyrs),//], 
  placeholder: 'Map',
  onChange: function(lyr){
    layerOptionsPanel.clear();
    layerOptionsPanel.add(layerOptions[lyr]);
    mapPanel.layers().set(0,lyrs[lyr]);
  }
});
var instructions = ui.Panel([ui.Label("Click for map value:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var strataval = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var mapval = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var clickedVal = ui.Panel([latlon,strataval,mapval], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var panel = ui.Panel();
panel.style().set({
  width: '450px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
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
  var sval = strata.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  var mval = map.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30}).get('b1').getInfo();
  var maplabel = getMapVal(mval);
  mapval.setValue('Map label: ' +maplabel +' (map value: '+mval+')')
  var wetland = '';
  //if(sval >0 && sval<= 7){wetland='Non-wetland';}
  //else 
  if(sval>=8 && sval<=14 ){wetland ='Wetland';}
  strataval.setValue('Strata: '+wetland+' '+strataDict[sval]);
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(1, dot);
}
function getMapVal(val){
  var wl,perc,treetype,height,label;
  if(val<120){
    wl = 'Terra firma ';
    if(val<=50){perc = 100-(val*2); label = wl+perc+'% bare ground';}
    else if (val<=73){height = val-48; label = wl+'stable open canopy, '+height+'m';}
    else if (val==74){label = wl+'stable open canopy, >25m';}
    else if (val<=90){height = val-65; label = wl+'stable dense canopy, '+height+'m';}
    else if (val==91){label = wl+'stable dense canopy, >25m';}
    else if (val<=114){height = val-89; label = wl+'recent tree gain, '+height+'m';}
    else if (val==115){label = wl+'recent tree gain, >25m';}
    else if (val==116){label = wl+'non-fire tree cover loss without crops or built-up';}
  } else if(val<=236){
    val = val-120;
    wl = 'Wetland ';
    if(val<=50){perc = 100-(val*2); label = wl+perc+'% bare ground';}
    else if (val<=73){height = val-48; label = wl+'stable open canopy, '+height+'m';}
    else if (val==74){label = wl+'stable open canopy, >25m';}
    else if (val<=90){height = val-65; label = wl+'stable dense canopy, '+height+'m';}
    else if (val==91){label = wl+'stable dense canopy, >25m';}
    else if (val<=114){height = val-89; label = wl+'recent tree gain, '+height+'m';}
    else if (val==115){label = wl+'recent tree gain, >25m';}
    else if (val==116){label = wl+'non-fire tree cover loss without crops or built-up';}
  }else if(val<250){
    perc = (val-240)*10;
    var perc2 = perc+10;
    label = perc+'% - '+perc2+'% built-up'
  }else if(val==250){label = 'Water';}
  else if(val==251){label = 'Permanent ice';}
  else if(val==252){label = 'Cropland';}
  else if(val==254){label = 'Ocean';}
  else if(val==252){label = 'No-data';}
  return label;
}