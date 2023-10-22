var MODIS = ui.import && ui.import("MODIS", "imageCollection", {
      "id": "users/rafnuss/RedNeckedPhalarope/VGPM_MODIS"
    }) || ee.ImageCollection("users/rafnuss/RedNeckedPhalarope/VGPM_MODIS"),
    SeaWiFS = ui.import && ui.import("SeaWiFS", "imageCollection", {
      "id": "users/rafnuss/RedNeckedPhalarope/VGPM_SeaWiFS"
    }) || ee.ImageCollection("users/rafnuss/RedNeckedPhalarope/VGPM_SeaWiFS"),
    VIIRS = ui.import && ui.import("VIIRS", "imageCollection", {
      "id": "users/rafnuss/RedNeckedPhalarope/VGPM_VIIRS"
    }) || ee.ImageCollection("users/rafnuss/RedNeckedPhalarope/VGPM_VIIRS"),
    precomputedAverage = ui.import && ui.import("precomputedAverage", "imageCollection", {
      "id": "users/rafnuss/RedNeckedPhalarope/meanNPPAverage"
    }) || ee.ImageCollection("users/rafnuss/RedNeckedPhalarope/meanNPPAverage"),
    precomputedAllYearAverage = ui.import && ui.import("precomputedAllYearAverage", "image", {
      "id": "users/rafnuss/RedNeckedPhalarope/meanNPPAllYearAverage"
    }) || ee.Image("users/rafnuss/RedNeckedPhalarope/meanNPPAllYearAverage");
// define possible colorscale
var jet=['0000B6','0000DB','0000FF','0024FF','0049FF','006DFF','0092FF','00B6FF','00DBFF','00FFFF','24FFDB','49FFB6','6DFF92','92FF6D','B6FF49','DBFF24','FFFF00','FFDB00','FFB600','FF9200','FF6D00','FF4900','FF2400','FF0000','DB0000'];
var greens = ["000", "040", "080", "0B0", "0F0"];
var greens2 = ['bbe029', '0a9501', '074b03'];
var viridis = ['#440154FF', '#481567FF', '#482677FF', '#453781FF', '#404788FF', '#39568CFF', '#33638DFF', '#2D708EFF', '#287D8EFF', '#238A8DFF', '#1F968BFF', '#20A387FF', '#29AF7FFF', '#3CBB75FF', '#55C667FF', '#73D055FF', '#95D840FF', '#B8DE29FF', '#DCE319FF', '#FDE725FF'];
// define visualization of image
var nppVisu={min:0, max:1000,bands:['NPP'], palette:viridis}; 
// Merge ImageCollection of all sattelie
var npp=MODIS.merge(SeaWiFS).merge(VIIRS);
var listDay=ee.FeatureCollection(ee.List.sequence(ee.Date.fromYMD(1996, 1,1).millis(),ee.Date.fromYMD(2025, 1,1).millis(),1000*3600*24).map(function(t){return ee.Feature(null,{'system:time_start':t});}));
var val=ee.Join.saveAll('matches').apply(listDay, npp, ee.Filter.maxDifference({difference:3600*1000*6, leftField:'system:time_start', rightField:'system:time_start'}));
var nppColl=ee.ImageCollection(val.map(function(ft){return ee.ImageCollection(ee.List(ee.Feature(ft).get('matches'))).mean().copyProperties(ft,['system:time_start']);}));
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
var reducers = {
  mean: ee.Reducer.mean(),
  max: ee.Reducer.max(),
  percentile_75: ee.Reducer.percentile([75]),
  median: ee.Reducer.median(),
  percentile_25: ee.Reducer.percentile([25]),
  min: ee.Reducer.min()
};
var layerDate = function(start, endate, reducerName, isExport){
  if(!isExport && reducerName=='mean' && (endate-start)==1){
    return precomputedAverage.filterDate(''+start,''+endate).first();
  }else
  if(!isExport && reducerName=='mean' && start==1997 && endate==2030){
    return precomputedAllYearAverage;
  }
  else
    return nppColl.filter(ee.Filter.calendarRange(1, 3, 'month')).filterDate(''+start,''+endate).reduce(reducers[reducerName]).rename('NPP')
}
var doExport=false; // put true for export
if(doExport){
  var nomiScale=nppColl.first().projection().nominalScale().getInfo()/8;
  for (var i=1998; i<2021; i++){
    var im=layerDate(i,i+1,'mean',true).set('system:time_start',ee.Date.fromYMD(i, 2,1).millis())
    Export.image.toAsset({
      image:im,
      description:'export_'+i,
      assetId:'projects/earthimages4unil/PostDocProjects/rafnuss/meanNPPAverage/image_'+i,
      scale:nomiScale,
      region:ee.Geometry.BBox(-180, -90, 180, 90)
    })
  }
  Export.image.toAsset({
    image:layerDate(1997,2030,'mean',true).set('system:time_start',ee.Date.fromYMD(1998, 2,1).millis()),
    description:'export_AllAverage',
    assetId:'projects/earthimages4unil/PostDocProjects/rafnuss/meanNPPAllYearAverage',
    scale:nomiScale,
    region:ee.Geometry.BBox(-180, -90, 180, 90)
  })
}
function display(info){
  var value=info.year;
  var reducerName=info.reducerName;
  var Map=info.Map;
  Map.layers().map(function(layer){if(layer){Map.remove(layer)}});
  if(info.singleYear){
    Map.addLayer(layerDate(value,value+1,reducerName),nppVisu,''+value);
  }else{
    Map.addLayer(layerDate(1997,2030,reducerName),nppVisu,'All the years');
  }
}
function addWidget(Map, position, initialValues){
  initialValues.Map=Map;
  var panel=ui.Panel({layout:ui.Panel.Layout.flow('horizontal'), style: {position: position}});
  Map.add(panel)
  var select = ui.Select({
    items: Object.keys(reducers),
    value: initialValues.reducerName,
    onChange: function(name){
      initialValues.reducerName=name;
      display(initialValues);
    }
  });
  panel.add(select)
  var slider = ui.Slider({
    min:1998,
    max:2021,
    value:initialValues.year,
    step:1,
    onChange:function(value){
      initialValues.year=value;
      display(initialValues);
    },
    direction:'horizontal',
    disabled:!initialValues.singleYear,
    style:{width:'200px',margin: '13px'}
  });
  panel.add(slider);
  var checkBox=ui.Checkbox('All years',!initialValues.singleYear,function(val){
    initialValues.singleYear=!val;
    slider.setDisabled(val);
    display(initialValues);
  },false,{margin:'13px 13px 13px -18px'})
  panel.add(checkBox)
  display(initialValues);
}
addWidget(linkedMapL,'bottom-left',{year:1998, reducerName:'mean', singleYear:false});
addWidget(linkedMapR,'bottom-right',{year:2020, reducerName:'mean', singleYear:true});
linkedMapL.setCenter(50,0,5)
// Colorbar
function colorbar(){
  var RR = ui.Panel({
    widgets:[ui.Label("Net Primary Productivity [mgC/km^2/day]",{ textAlign:'center',stretch:'horizontal',margin:'3px',})], //,{transform: "rotate(90deg);"}
    layout:ui.Panel.Layout.flow('vertical'),
    style:{ margin:'0px',stretch:'horizontal'}
    });
  var colorbar=ui.Thumbnail({
    image:ee.Image.pixelLonLat().select(0), 
    params:{
      bbox: [0, 0, 1, 1],
      dimensions: '300x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: viridis,
    }, 
    style:{margin:'0px', stretch:'horizontal'}
    });
  var R=ui.Panel({
    widgets:[colorbar],
    style:{ margin:'0px',stretch :"both"}
    });
  //var styleLabel=//, flex:'1'
  var L=ui.Panel({
    widgets:[ui.Label(0,{textAlign:'left',stretch:'horizontal', margin:'0px' }),
              ui.Label(500,{textAlign:'center',stretch:'horizontal', margin:'0px' }),
              ui.Label(1000,{textAlign:'right',stretch:'horizontal', margin:'0px' })],
    layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px',stretch:'horizontal'}
    });
    var L_bar=ui.Panel({
    widgets:[ui.Label('|',{textAlign:'left',stretch:'horizontal', margin:'0px' }),
              ui.Label('|',{textAlign:'center',stretch:'horizontal', margin:'0px' }),
              ui.Label('|',{textAlign:'right',stretch:'horizontal', margin:'0px' })],
    layout:ui.Panel.Layout.flow('horizontal'),
    style:{margin:'0px',stretch:'horizontal',height:'7px'}
    });
  return ui.Panel([RR,R,L_bar,L], ui.Panel.Layout.flow('vertical'),{position:'bottom-center',margin:'0px',width:'300px'})
}
linkedMapL.add(colorbar())
linkedMapR.add(colorbar())
//ui.root.add(all)
// Export to GeoTIFF
/*
Map.addLayer(layerDate('1998','2000'),nppVisu)*/
//Map.addLayer(mean1998,nppVisu,'1998')
//Map.addLayer(mean2020,nppVisu,'2020')
/*
var resolution=MODIS.first().projection().nominalScale().getInfo();
// export geotiff
Export.image.toDrive({image:meanAll, description:'meanAll', folder:'', fileNamePrefix:'npp_meanAll', region:aoi, scale:resolution, fileFormat:'TIFF'});
Export.image.toDrive({image:mean1998, description:'mean1998', folder:'', fileNamePrefix:'npp_1998', region:aoi, scale:resolution, fileFormat:'TIFF'});
Export.image.toDrive({image:mean2020, description:'mean2020', folder:'', fileNamePrefix:'npp_2020', region:aoi, scale:resolution, fileFormat:'TIFF'});
// export visualisation ready
Export.image.toDrive({image:meanAll.visualize(nppVisu), description:'meanAll_visu', folder:'', fileNamePrefix:'npp_meanAll_visu', region:aoi, scale:resolution, fileFormat:'GEOTIFF'});
Export.image.toDrive({image:mean1998.visualize(nppVisu), description:'mean1998_visu', folder:'', fileNamePrefix:'npp_1998_visu', region:aoi, scale:resolution, fileFormat:'GEOTIFF'});
Export.image.toDrive({image:mean2020.visualize(nppVisu), description:'mean2020_visu', folder:'', fileNamePrefix:'npp_2020_visu', region:aoi, scale:resolution, fileFormat:'GEOTIFF'});
*/