var SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    aqua500 = ui.import && ui.import("aqua500", "imageCollection", {
      "id": "MODIS/006/MYD09GA"
    }) || ee.ImageCollection("MODIS/006/MYD09GA"),
    aqua250 = ui.import && ui.import("aqua250", "imageCollection", {
      "id": "MODIS/006/MYD09GQ"
    }) || ee.ImageCollection("MODIS/006/MYD09GQ"),
    terra250 = ui.import && ui.import("terra250", "imageCollection", {
      "id": "MODIS/006/MOD09GQ"
    }) || ee.ImageCollection("MODIS/006/MOD09GQ"),
    terra500 = ui.import && ui.import("terra500", "imageCollection", {
      "id": "MODIS/006/MOD09GA"
    }) || ee.ImageCollection("MODIS/006/MOD09GA"),
    country = ui.import && ui.import("country", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    waterMask = ui.import && ui.import("waterMask", "image", {
      "id": "MODIS/MOD44W/MOD44W_005_2000_02_24"
    }) || ee.Image("MODIS/MOD44W/MOD44W_005_2000_02_24"),
    landCover = ui.import && ui.import("landCover", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V-C3/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    geolocator = ui.import && ui.import("geolocator", "imageCollection", {
      "id": "projects/earthimages4unil/assets/PostDocProjects/rafnuss/Geolocator"
    }) || ee.ImageCollection("projects/earthimages4unil/assets/PostDocProjects/rafnuss/Geolocator");
var percentileVal=[90,50,10];
var bandNames=["pressure_threshold","pressure_mismatch","light","combine","graph"];
var displayName=["Pressure threshold","Pressure mismatch","Light","Static","Marginal"];
var selectedBand='Marginal';
var selectedTrack=null;
var selectedPeriod=null;
var displayedMap=null;
var displayedNDVI=null;
var displayedCountry=null;
var displayedLandcover=null;
var displayRevovryLoc=null;
var dataPanel=null;
var periodeSelector=null;
var bandsSelector=null;
var trackSelector=null;
var dateSlider=null;
var NDVIcmap=['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01','012E01', '011D01', '011301'];
var debug=false;
if(debug){
  selectedTrack='16AQ';
  selectedPeriod=1;
}
Map.setOptions('SATELLITE');
var oeel=require('users/OEEL/lib:loadAll');
var property2Display=['GDL_ID','actDuration'];
var voi='NDVI';
function getNDVI(start,end, extraAverage){
  if(extraAverage=="auto")
  {
    var center=ee.Date(ee.Number(end).add(start).divide(2));
    var delta=ee.Number(end).subtract(start).divide(2).divide(1000).max(3600*24*10) //10 days each side
    start=center.advance(delta.multiply(-1), 'seconds');
    end=center.advance(delta, 'seconds');
    extraAverage=false;
  }
  if(extraAverage)
  {
    start=ee.Date(start).advance(-10, 'day');
    end=ee.Date(end).advance(10, 'day');
  }
  var aqua=oeel.ImageCollection.enhancingCollection(aqua500.filterDate(start,end),aqua250.filterDate(start,end));
  var terra=oeel.ImageCollection.enhancingCollection(terra500.filterDate(start,end),terra250.filterDate(start,end));
  aqua=aqua.map(function(im){return im.updateMask(im.select('state_1km').bitwise_and(1).not())});
  terra=terra.map(function(im){return im.updateMask(im.select('state_1km').bitwise_and(1).not())});
  var modis=oeel.ImageCollection.enhancingCollection(terra,aqua,'system:index',
    function(a,b){return ee.ImageCollection([a,b]).mean().copyProperties(a, a.propertyNames()); }).select('sur_refl_.*');
  modis=modis.map(function(im){return im.addBands(im.normalizedDifference(['sur_refl_b02','sur_refl_b01']).rename(voi))});
  return ee.ImageCollection(modis.randomColumn('noise').limit(20,'noise')).mean();
}
// add combine
geolocator=geolocator.map(function(im){
  return im.addBands(im.select([0,1,2]).reduce(ee.Reducer.product()).clip(im.geometry()).rename('combine'));
})
// add display name
geolocator=geolocator.map(function(im){
  var trackName=im.getString('CommonName').cat(" \t(").cat(im.get("GDL_ID")).cat(")");
  var start= ee.Date(im.get("system:time_start")).format("dd-MMM");
  var end= ee.Date(im.get("system:time_end")).format("dd-MMM");
  var duration = ee.Number(ee.Date(im.get("system:time_end")).difference(ee.Date(im.get("system:time_start")),"day")).round().format("%d");
  var step=im.getNumber("staID").format('%d');
  var status = ee.String(ee.Algorithms.If(ee.Algorithms.IsEqual(im.getString('status'),"wintering")," (wintering)",""));
  status = status.cat(ee.Algorithms.If(ee.Algorithms.IsEqual(im.getString('status'),"equipment"),"  (equipment)",""));
  var stepName=step.cat(": ").cat(start).cat(" ➟ ").cat(end).cat(" (").cat(duration).cat(" d.)").cat(status);
  var dispText = ee.Date(im.get("system:time_start")).format("dd-MMM-yyyy HH:mm");
  dispText = dispText.cat(" ➟ ");
  dispText = dispText.cat(ee.Date(im.get("system:time_end")).format("dd-MMM-yyyy HH:mm"));
  dispText = dispText.cat(" | alt:").cat(im.getNumber("alt_mean").round().format("%d")).cat("m (").cat(im.getNumber("alt_q05").round().format("%d")).cat("-").cat(im.getNumber("alt_q95").round().format("%d")).cat(")")
  dispText = dispText.cat(status);
  return im.set('TrackName',trackName,'stepName',stepName,'dispText',dispText);
});
print(geolocator.first())
var displayResult=function(track)
{
  if(!selectedBand || !selectedTrack || !selectedPeriod)
    return;
  selectedBand=bandNames[displayName.indexOf(selectedBand)];
  var im=geolocator.filter(ee.Filter.and(ee.Filter.equals('GDL_ID',selectedTrack),ee.Filter.eq('staID',selectedPeriod))).select(selectedBand).first();
  Map.centerObject(ee.Feature(ee.Geometry.Point([im.getNumber('sp_lon'),im.getNumber('sp_lat')])),8);
  displayRevovryLoc.setEeObject(ee.FeatureCollection([ee.Feature(ee.Geometry.Point([im.getNumber('calib_lon'),im.getNumber('calib_lat')]))]).style({width:2,color:'ffffff',pointSize:4,fillColor:'ff0000'}));
  /*im.toDictionary(property2Display).evaluate(function(properties){
    if(dataPanel)
      dataPanel.setValue(JSON.stringify(properties).replace(/"|\{|\}/g,'').replace(/,/g,',\t'));
  });*/
  im.getString('dispText').evaluate(function(text){dataPanel.setValue(text)});
  var mask=SRTM.gte(im.getNumber("alt_q05")).and(SRTM.lte(im.getNumber("alt_q95")));
  var NDVI_image=getNDVI(im.get('system:time_start'),im.get('system:time_end'),"auto");
  var landCov=landCover.filter(ee.Filter.equals('system:index',im.date().get('years').min(2016).max(2015).format('%d'))).select('discrete_classification').first(); /* ee.Date(im.get('system:time_start')).format().evaluate(function(startTime){dateSlider.setStart(startTime);});
  ee.Date(im.get('system:time_end'  )).format().evaluate(function(  endTime){dateSlider.setStart(endTime  );});*/
  if (selectedBand=='graph')
  {
      im=im.updateMask(mask);
      im=im.unmask(0).resample("bicubic").multiply(mask);
  }else{
    im=im.unmask(0).resample("bicubic") // to remove to get pixelized
  }
  var maxVal=im.reduceRegion({reducer:ee.Reducer.max(), geometry:im.geometry(), scale:im.projection().nominalScale().divide(10)});
  im=im.divide(ee.Number(maxVal.get(selectedBand)));
  NDVI_image=NDVI_image.updateMask(im.gt(0).focalMax(10,'circle','pixels'));
  landCov=landCov.updateMask(im.gt(0).focalMax(10,'circle','pixels'));
  print(im)
  var imDisp=waterMask.select(0).unmask(1).updateMask(im.unmask(0,false).subtract(1).abs());
  displayedLandcover.setEeObject(landCov);
  displayedNDVI.setEeObject(NDVI_image.select(voi));
  displayedMap.setEeObject(imDisp);
};
//add all maps
displayedLandcover= Map.addLayer(ee.Image(),{},'Land cover', 0, 1);
displayedNDVI=      Map.addLayer(ee.Image(),{min:0,max:1, palette: NDVIcmap,  },'NDVI', 0, 1);
displayedMap=       Map.addLayer(ee.Image(),{min:0,max:1,palette:['000000','000022']},'Mask of presence', 1, 1);
displayedCountry=   Map.addLayer(country.style({width:1,color:'ffffff',pointSize:0,fillColor:'00000000'}),{},'Land borders');
displayRevovryLoc=  Map.addLayer(ee.Image(),{},'Recovery location');
var panel=ui.Panel([], ui.Panel.Layout.flow("horizontal"),{backgroundColor:'000000cc'});
var selectStationaryPeriode=function(selectedTrack_cb,widget,index){
  selectedTrack_cb=selectedTrack_cb.slice(-5, -1);
  selectedTrack=selectedTrack_cb;
  periodeSelector.items().reset([]);
  geolocator.filter(ee.Filter.eq('GDL_ID',selectedTrack)).sort("staID").aggregate_array('stepName').evaluate(function(periodes){ 
    periodeSelector.items().reset(periodes);
  });
};
periodeSelector=ui.Select({items:[],onChange:function(selectedPeriod_cb){
  selectedPeriod_cb=ee.String(selectedPeriod_cb);
  selectedPeriod=ee.Number.parse(selectedPeriod_cb.slice(0,selectedPeriod_cb.rindex(':')));
  displayResult(); } });
bandsSelector=ui.Select({items:[],onChange:function(selectedBand_cb){ selectedBand=selectedBand_cb; displayResult(); } });
trackSelector=ui.Select({items:[],onChange:selectStationaryPeriode });
//dateSlider=ui.DateSlider({disabled:false});
panel.add(ui.Label('λ',{fontSize:'32px',margin:'4px',backgroundColor:'00000000', color:'ffffff'}));
panel.add(bandsSelector);
panel.add(ui.Label('🐦',{fontSize:'32px',margin:'2px',backgroundColor:'00000000', color:'ffffff'}));
panel.add(trackSelector);
panel.add(ui.Label('⏸',{fontSize:'29px',margin:'4px',backgroundColor:'00000000', color:'ffffff'}));
panel.add(periodeSelector);
//panel.add(dateSlider);
geolocator.sort("GDL_ID").aggregate_array('TrackName').distinct().evaluate(function(tracks){
  trackSelector.items().reset(tracks);
});
//geolocator.filter(ee.Filter.and(ee.Filter.equals('GDL_ID',selectedTrack),ee.Filter.eq('staID',selectedPeriod))).select(selectedBand).first();
/*geolocator.first().bandNames().evaluate(function(bandNames){
  bandsSelector.items().reset(bandNames);
  bandsSelector.setValue(selectedBand);
});*/
bandsSelector.items().reset(displayName);
bandsSelector.setValue(selectedBand);
// add the panel to display properties
dataPanel=ui.Label('',{fontSize:'16px',height:'30px',backgroundColor:'00000000'});
panel.add(ui.Panel([dataPanel],ui.Panel.Layout.flow('horizontal', true),{stretch:'horizontal',backgroundColor:'00000000', color:'ffffff'}));
var NDVI_Button=ui.Button('🌿 NDVI', function(){
  displayedNDVI       .setShown(true);
  displayedLandcover  .setOpacity(0.0 );
  displayedNDVI       .setOpacity(1.0 );
},false);
var LC_Button=ui.Button('🌻 Land Cover', function(){
  displayedLandcover  .setShown(true);
  displayedLandcover  .setOpacity(1.0 );
  displayedNDVI       .setOpacity(0.0 );
},false);
panel.add(NDVI_Button);
panel.add(LC_Button);
ui.root.setLayout(ui.Panel.Layout.flow("vertical"));
ui.root.insert(0,panel);
var legendData={
'282828':"Unknown. No or not enough satellite data available.",
'FFBB22':"Shrubs. Woody perennial plants with persistent and woody stems and without any defined main stem being less than 5 m tall. The shrub foliage can be either evergreen or deciduous.",
'FFFF4C':"Herbaceous vegetation. Plants without persistent stem or shoots above ground and lacking definite firm structure. Tree and shrub cover is less than 10 %.",
'F096FF':"Cultivated and managed vegetation / agriculture. Lands covered with temporary crops followed by harvest and a bare soil period (e.g., single and multiple cropping systems). Note that perennial woody crops will be classified as the appropriate forest or shrub land cover type.",
'FA0000':"Urban / built up. Land covered by buildings and other man-made structures.",
'B4B4B4':"Bare / sparse vegetation. Lands with exposed soil, sand, or rocks and never has more than 10 % vegetated cover during any time of the year.",
'F0F0F0':"Snow and ice. Lands under snow or ice cover throughout the year.",
'0032C8':"Permanent water bodies. Lakes, reservoirs, and rivers. Can be either fresh or salt-water bodies.",
'0096A0':"Herbaceous wetland. Lands with a permanent mixture of water and herbaceous or woody vegetation. The vegetation can be present in either salt, brackish, or fresh water.",
'FAE6A0':"Moss and lichen.",
'58481F':"Closed forest, evergreen needle leaf. Tree canopy >70 %, almost all needle leaf trees remain green all year. Canopy is never without green foliage.",
'009900':"Closed forest, evergreen broad leaf. Tree canopy >70 %, almost all broadleaf trees remain green year round. Canopy is never without green foliage.",
'70663E':"Closed forest, deciduous needle leaf. Tree canopy >70 %, consists of seasonal needle leaf tree communities with an annual cycle of leaf-on and leaf-off periods.",
'00CC00':"Closed forest, deciduous broad leaf. Tree canopy >70 %, consists of seasonal broadleaf tree communities with an annual cycle of leaf-on and leaf-off periods.",
'4E751F':"Closed forest, mixed.",
'007800':"Closed forest, not matching any of the other definitions.",
'666000':"Open forest, evergreen needle leaf. Top layer- trees 15-70 % and second layer- mixed of shrubs and grassland, almost all needle leaf trees remain green all year. Canopy is never without green foliage.",
'8DB400':"Open forest, evergreen broad leaf. Top layer- trees 15-70 % and second layer- mixed of shrubs and grassland, almost all broadleaf trees remain green year round. Canopy is never without green foliage.",
'8D7400':"Open forest, deciduous needle leaf. Top layer- trees 15-70 % and second layer- mixed of shrubs and grassland, consists of seasonal needle leaf tree communities with an annual cycle of leaf-on and leaf-off periods.",
'A0DC00':"Open forest, deciduous broad leaf. Top layer- trees 15-70 % and second layer- mixed of shrubs and grassland, consists of seasonal broadleaf tree communities with an annual cycle of leaf-on and leaf-off periods.",
'929900':"Open forest, mixed.",
'648C00':"Open forest, not matching any of the other definitions.",
'000080':"Oceans, seas. Can be either fresh or salt-water bodies.",
};
function rawInLegend(color,def){
  var colorBox = ui.Label({value:'⬬',
      style: {
        color: color,
        // Use padding to give the box height and width.
        //padding: '8px',
        margin: '-7px 0 -7px 0',
        fontSize:'20px',
        backgroundColor:'00000000'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: def,
      style: {margin: '0 0 4px 6px',backgroundColor:'00000000', color:'white'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal'),
      style:{backgroundColor:'000000cc'}
    });
}
var legend=ui.Panel([ui.Panel(Object.keys(legendData).map(function(key) {
  return rawInLegend(key,legendData[key])
}))],ui.Panel.Layout.flow('vertical', true),{position:'bottom-right',padding:0,width:"0px",backgroundColor:'00000000'});
// Colorbar
function colorbarNDVI(panelOption){
  /*var RR = ui.Panel({
    widgets:[ui.Label("Net Primary Productivity [mgC/km^2/day]",{ textAlign:'center',stretch:'horizontal',margin:'3px',})], //,{transform: "rotate(90deg);"}
    layout:ui.Panel.Layout.flow('vertical'),
    style:{ margin:'0px',stretch:'horizontal'}
    });*/
  var colorbar=ui.Thumbnail({
    image:ee.Image.pixelLonLat().select(1), 
    params:{
      bbox: [0, 0, 1, 1],
      dimensions: '10x300',
      format: 'png',
      min: 0,
      max: 1,
      palette: NDVIcmap,
    }, 
    style:{margin:'0px',padding:'1px', stretch:'vertical'}
    });
  /*var R=ui.Panel({
    widgets:[colorbar],
    style:{ margin:'0px',stretch :"both"}
    });*/
  //var styleLabel=//, flex:'1'
  var L=ui.Panel({
    widgets:[ui.Label(1,{textAlign:'left', margin:'0px', padding:'0px', position:'top-left',backgroundColor:'00000000'}),
              ui.Label(0.5,{textAlign:'left', margin:'0px', padding:'0px', position:'middle-left',backgroundColor:'00000000' }),
              ui.Label(0,{textAlign:'left', margin:'0px', padding:'0px', position:'bottom-left',backgroundColor:'00000000' })],
    layout:ui.Panel.Layout.absolute(),
    style:{margin:'-12px 0px -13px -8px',stretch:'vertical', width:'30px', padding:'0px',backgroundColor:'00000000', color:'white'}
    });
  return ui.Panel([colorbar,L], ui.Panel.Layout.flow('horizontal'),panelOption)
}
var legendNDVI=colorbarNDVI({position:'bottom-left',padding:'0px',maxWidth:"40px",width:'0px', height:'300px',backgroundColor:'000000cc'});
ui.root.onResize(function(newSize){
  print(newSize)
  legend.style().set('max-width',newSize.width/3+'px')
  legend.style().set('max-height',newSize.height-100+'px')
})
Map.setControlVisibility({all:false, layerList:true, scaleControl:false, mapTypeControl:true})
Map.add(legend)
Map.add(legendNDVI)
var animation2NDVI=null;
var animation2LC=null;
NDVI_Button.onClick(function(){
  ui.util.clearTimeout(animation2LC);
  if(parseInt(legend.style().get('width'), 10)>parseInt(legend.style().get('max-width'), 10))
    legend.style().set('width',legend.style().get('max-width'));
  animation2NDVI=ui.util.setInterval(function(){
    var ns=parseInt(legend.style().get('width'), 10)-10;
    legend.style().set('width',Math.max(ns,0)+'px')
    var nsNDVI=parseInt(legendNDVI.style().get('width'),10)+2;
    legendNDVI.style().set('width',nsNDVI+'px')
    if(ns<1 && (nsNDVI>parseInt(legendNDVI.style().get('max-width')))){
      ui.util.clearTimeout(animation2NDVI);
    }
  }, 25)
})
LC_Button.onClick(function(){
  ui.util.clearTimeout(animation2NDVI);
  if(parseInt(legendNDVI.style().get('width'), 10)>parseInt(legendNDVI.style().get('max-width'), 10))
    legendNDVI.style().set('width',legendNDVI.style().get('max-width'));
  animation2LC=ui.util.setInterval(function(){
    var ns=parseInt(legend.style().get('width'),10)+10;
    legend.style().set('width',ns+'px')
    var nsNDVI=parseInt(legendNDVI.style().get('width'), 10)-2;
    legendNDVI.style().set('width',Math.max(nsNDVI,0)+'px');
    if(ns>parseInt(legend.style().get('max-width')) && nsNDVI<1 ){
      ui.util.clearTimeout(animation2LC);
    }
  }, 25)
});
var gridRatio=0.25;
var gridMap=ee.Image.pixelLonLat().add(0.5).divide(gridRatio);
gridMap=gridMap.subtract(gridMap.floor()).subtract(0.5).zeroCrossing().reduce(ee.Reducer.max()).selfMask();
Map.addLayer(gridMap,{},'0.25 grid', 0, 1)