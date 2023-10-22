var cover2 = ui.import && ui.import("cover2", "image", {
      "id": "projects/ee-slabnmsu-servir-assets/assets/esa_cover_fill"
    }) || ee.Image("projects/ee-slabnmsu-servir-assets/assets/esa_cover_fill");
var center = ee.Geometry.Point([36.8197, 0.3549])
///imports
var collection = ee.ImageCollection("projects/ee-slabnmsu-servir-assets/assets/lai_monthly2")
var cover1 = ee.Image("projects/ee-slabnmsu-servir-assets/assets/east_africa_canopycover_2020")
var wards = ee.FeatureCollection("projects/ee-slabnmsu-servir-assets/assets/kenya_wards");
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
var cover = ee.ImageCollection([cover1,cover2]).mosaic()
var counties = ee.FeatureCollection("FAO/GAUL/2015/level2")
var kenya = counties.filter(ee.Filter.eq('ADM0_NAME','Kenya'))
var kenya_counties = kenya              
                .filter(ee.Filter.or(
                  ee.Filter.eq('ADM2_NAME','Laikipia'),
                  ee.Filter.eq('ADM2_NAME','Marsabit'),
                  ee.Filter.eq('ADM2_NAME','Meru North'),
                  ee.Filter.eq('ADM2_NAME','Meru Central'),
                  ee.Filter.eq('ADM2_NAME','Isiolo'),
                  ee.Filter.eq('ADM2_NAME','Wajir'),
                  ee.Filter.eq('ADM2_NAME','Garissa'),
                  ee.Filter.eq('ADM2_NAME','Mandera'),
                  ee.Filter.eq('ADM2_NAME','Samburu'),
                  ee.Filter.eq('ADM2_NAME','Moyale')
                  ))
/*
prepare 2012-2022 monthly partioned lai
from previously exported 36-band annual images 
to 3 band monthly images
*/
var bandsToCollection = function(image){
  var names = image.bandNames();
  var splitImages = names.map(function(n){
    var splits = ee.String(n).split('_');
    var year = ee.String(splits.get(0)).slice(1);
    var month = ee.Number.parse(ee.String(splits.get(1))).add(1).format('%02d');
    var bandname = ee.String(splits.get(2)).cat('_').cat(splits.get(3));
    var timeStamp = ee.Date(year.cat('-').cat(month).cat('-01')).millis()
    var date = ee.Date(year.cat('-').cat(month).cat('-01')).format('YYYY-MMM')
    var newImage = image.select([n],[bandname]);
    return newImage.set('year',year)
                   .set('month',month)
                   .set('system:time_start',timeStamp)
                   .set('bandName',bandname)
                   .set('date',date)
                   .updateMask(cover.gte(0));
  });
  return ee.ImageCollection.fromImages(splitImages)
};
var images = collection.map(bandsToCollection).flatten()
print(images)
var aggcol = images.filter(ee.Filter.eq('bandName','Lai_agg'))
var woodycol = images.filter(ee.Filter.eq('bandName','Lai_w'))
var herbcol = images.filter(ee.Filter.eq('bandName','Lai_h'))
//Combine 3 colletions image collections
var filter = ee.Filter.equals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
});
// Create the join.
var simpleJoin = ee.Join.inner();
// first Inner join
//var innerJoin1 = ee.ImageCollection(simpleJoin.apply(aggcol, woodycol, filter));
//var aggPlusWoody = innerJoin1.map(function(feature) {
//  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
//});
// second Inner join
var innerJoin2 = ee.ImageCollection(simpleJoin.apply(woodycol, herbcol, filter));
var partitioned = innerJoin2.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
});
var months = ee.List.sequence(1,12,1);
var calcAnoms = function(m){
  var monthly = partitioned.filter(ee.Filter.calendarRange(m,m,'month'))
                            //.map(function(img){return img.updateMask(img.gte(0))})
  var mean = monthly.mean().rename(['Lai_w_mean','Lai_h_mean']);
  var std = monthly.reduce(ee.Reducer.stdDev());
  return monthly.toList(monthly.size()).map(function(image){
    var img = ee.Image(image)
    var anomaly = img.subtract(mean).divide(std)
    return anomaly.copyProperties(img,img.propertyNames())
  });
};
var Anoms = ee.ImageCollection.fromImages(months.map(calcAnoms).flatten());
print(Anoms)
///////////////////////////////INSPECTOR PANEL////////////////////////////////////////////////////
var map1 = ui.Map().setControlVisibility(false,false,true,true).setOptions('hybrid')//.style().set('cursor', 'crosshair');
var map2 = ui.Map().setControlVisibility(false,false,true,true).setOptions('hybrid')//.style().set('cursor', 'crosshair');
var map3 = ui.Map().setControlVisibility(false,false,true,true).setOptions('hybrid')//.style().set('cursor', 'crosshair');
var map4 = ui.Map().setControlVisibility(false,false,true,true).setOptions('hybrid')//.style().set('cursor', 'crosshair');
var sidePanel = ui.Panel(
  [
    ui.Label(
      'Rangeland Monitoring Using Satellite Derived Leaf Area Index',
      { fontSize:'16px', fontWeight:'bold', width:'95%'}
      ),
    ui.Label(
    'A tool for monitoring Leaf Area Index (LAI) in Kenyan Rangelands. \n'
    +'MODIS derived LAI is disaggregated into woody and herbaceous components for each 500m pixel.\n'
    +'LAI is defined as total leaf surface area per unit ground area, \n'
    +'and is used here as a proxy for crop/forage conditions at a given location.',
    { fontSize:'12px', width:'95%'}),
    ui.Label('See Kahiu and Hanan (2018) for more details on methods.',
    { fontSize:'14px', width:'95%'},
    'https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2017JG004105'
    ),
     ui.Label(
    'Resolution: 500m',
    { fontSize:'13px', width:'95%'})
    ],
  ui.Panel.Layout.flow('vertical'),
  {width:'30%', height:'100%', backgroundColor:'#ffffff'}
  );
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
var upper = ui.Panel([map1,map2], ui.Panel.Layout.Flow('horizontal'), {width:'100%', height:'50%'});
var lower = ui.Panel([map3,map4], ui.Panel.Layout.Flow('horizontal'), {width:'100%', height:'50%'});
var mapPanel = ui.Panel([upper,lower], ui.Panel.Layout.Flow('vertical'), {width:'70%', height:'100%'});
ui.root.widgets().reset([mapPanel,sidePanel]);  
var linker = ui.Map.Linker([map1,map2,map3,map4]);
map1.centerObject(kenya,6)
var admin1 = ui.Map.Layer(wards.style({color:'black',fillColor:'ffffff00'}),{},'area')
var admin2 = ui.Map.Layer(wards.style({color:'black',fillColor:'ffffff00'}),{},'area')
var admin3 = ui.Map.Layer(wards.style({color:'black',fillColor:'ffffff00'}),{},'area')
var admin4 = ui.Map.Layer(wards.style({color:'black',fillColor:'ffffff00'}),{},'area')
//transparency slider for each map with labels
function addTransparencySlider(selected_map,name){
  var checkbox = ui.Checkbox({// visibility checkbox and an opacity slider.
    label: name,
    value: true,
    style: {fontSize: '120%', color: '000000', backgroundColor:'ffffff', fontWeight:'bold', height:'50%', width:'90%', margin:'0px 0px 0px 0px'},
    onChange: function(checked) {
    selected_map.layers().get(0).setShown(checked);
      }
  });
  var opacitySlider = ui.Slider({
    min: 0,
    max: 1,
    value: 1,
    step: 0.01,
    style:{width:'90%', height: '45%',backgroundColor:'ffffff',margin:'0px 0px 0px 0px'}
  });
  opacitySlider.onSlide(function(value) {
    selected_map.layers().get(0).setOpacity(value);
  });
  selected_map.add(ui.Panel([checkbox,opacitySlider],'flow',{position:'bottom-right', backgroundColor:'ffffff',width:'13vw', height: '6vw', margin:'0px 0px 0px 0px'}))
}
addTransparencySlider(map1,'Woody LAI')
addTransparencySlider(map2,'Woody LAI Anomalies')
addTransparencySlider(map3,'Herbaceous LAI')
addTransparencySlider(map4,'Herbaceous LAI Anomalies')
//create legends
var vis1 = {min:0,max:4,palette:['saddlebrown','yellow','green'], opacity:1}
var vis2 = {min:-2,max:2,palette:['red','pink','white','lightblue','blue'], opacity:1}
var createLegend = require('users/savannalabnmsu/misc:colorbar.js')
//var legend1 = createLegend.makeColorBar(vis1, 'Leaf Area Index','95','111px','bottom-right','16px');
//var legend2 = createLegend.makeColorBar(vis2, 'Anomalies','95','111px','bottom-right','16px');
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var makeLegend = function(vis,title,sf){
  var palette = vis['palette']
  var min = vis.min
  var max = vis.max
  var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
   });
  var firstlabel = [ui.Label(min, {margin: '4px 8px'})]
  var lastlabel = [ui.Label(max, {margin: '4px 8px'})]
  var listlabels = ee.List.sequence(min, max, (max-min)/2).slice(1,-1).getInfo()
  var interlabels = []
  for (var i = 0; i < listlabels.length; i++) {
    var val = ee.Number(listlabels[i]).format(sf).getInfo()
    interlabels.push(ui.Label(val,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}))
  }
  var labels = firstlabel.concat(interlabels).concat(lastlabel)
  var legendLabels = ui.Panel({
  widgets: labels,
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '30px'}
   });
 var legendTitle = ui.Label({
  value: title,
  style: {fontWeight: 'bold'},
   });
  return ui.Panel([legendTitle, colorBar, legendLabels])  
}
var legend1 = makeLegend(vis1,'LEAF AREA INDEX','%.0f')
var legend2 = makeLegend(vis2,'ANOMALY','%.0f')
// Make drop-down menus
var mItems = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug', 'Sep','Oct','Nov','Dec'];
var yItems = ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'];
var monthSelect = ui.Select({
  placeholder: 'Select a month...',
  onChange: function(value) {
    var date = yearSelect.getValue()+'-'+value
    var lai_img = partitioned.filter(ee.Filter.eq('date',date)).first()
    var anoms_img = Anoms.filter(ee.Filter.eq('date',date)).first()
    //var month = 
    var woody = ui.Map.Layer(lai_img.select('Lai_w'),vis1);
    var herb = ui.Map.Layer(lai_img.select('Lai_h'),vis1);
    var woodyA = ui.Map.Layer(anoms_img.select('Lai_w'),vis2);
    var herbA = ui.Map.Layer(anoms_img.select('Lai_h'),vis2);
    map1.layers().set(0, woody);
    map2.layers().set(0, woodyA);
    map3.layers().set(0, herb);
    map4.layers().set(0, herbA);
    //map1.layers().set(1, admin1);
    //map2.layers().set(1, admin2);
    //map3.layers().set(1, admin3);
   // map4.layers().set(1, admin4);
    map1.centerObject(center,7)
    // Register a callback on the map to be invoked when the map is clicked.
function displayCharts(mp){
  mp.onClick(function(coords) {
  //point of interest
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var area = //ee.FeatureCollection([point.buffer(1000,1)])
              wards.filterBounds(point)
  var name =  area.first().get('ward').getInfo()
  mp.centerObject(area,9)
  map1.layers().set(1,ui.Map.Layer(area.style({color:'0000ff',fillColor:'0000ff00', width:2,lineType:'dotted'}),{},'area'))
  map2.layers().set(1,ui.Map.Layer(area.style({color:'0000ff',fillColor:'0000ff00', width:2,lineType:'dotted'}),{},'area'))
  map3.layers().set(1,ui.Map.Layer(area.style({color:'0000ff',fillColor:'0000ff00', width:2,lineType:'dotted'}),{},'area'))
  map4.layers().set(1,ui.Map.Layer(area.style({color:'0000ff',fillColor:'0000ff00', width:2,lineType:'dotted'}),{},'area'))
  //Clear the panel and show a loading message.
  inspector1.clear();
  inspector1.style().set('shown', true);
  inspector1.add(ui.Label('Loading...', {color: 'gray'}));
  // display LAI timeseries for each location
  var chart1 = ui.Chart.image.series(partitioned, area, ee.Reducer.mean(), 500)
  .setOptions({
    title: '2012-2022 monthly LAI for ward:'+name, 
    //curveType:'function',
    hAxis: {title: 'Date', textStyle:{fontSize: 11},titleTextStyle:{fontSize: 13,bold:true}}, 
    vAxis: {title: 'Leaf Area Index', textStyle:{fontSize: 11}, titleTextStyle:{fontSize: 13, bold:true},viewWindow: {min:0, max:4}},
    height:'45%',
    width:'100%'
  });
  /*
  var chart2 = ui.Chart.image.series(Anoms, area, ee.Reducer.mean(), 500)
   .setChartType('ColumnChart')
   .setOptions({
    title: '2012-2022 monthly anomalies for ward:'+name, 
    //curveType:'function',
    hAxis: {title: 'Date', textStyle:{fontSize: 11},titleTextStyle:{fontSize: 13,bold:true}}, 
    vAxis: {title: 'anomalies (units of stddev)', textStyle:{fontSize: 11},titleTextStyle:{fontSize: 13,bold:true},viewWindow:{min:-3, max:3}},
    height:'45%',
    width:'100%',
    bar: {
    groupWidth: 50
    }
  })
 */
 var chart2 = ui.Chart.image.byRegion(anoms_img.select([0,1],['woody LAI','herbaceous LAI']),area, ee.Reducer.mean(), 500)
                              .setChartType('BarChart')
                              .setOptions({
                              colors:['yellow','green'],
                              vAxis: {textColor:"#ffffff"},
                              hAxis: {title: 'z-scores', viewWindow: {min: -2, max: 2}, textStyle: {fontSize:10}, ticks:[-2,-1,0,1,2]},
                              height:'45%',
                              width: '100%',
                              title: 'LAI anomalies for ward: '+name, 
                              //stretch:'horizontal',
                              padding:'0px'
                              });
 //display coordinates at selected point 
     inspector0.widgets().set(0,ui.Label({
     value: 'lat/lon: ' + coords.lat.toFixed(2) +', '+ coords.lon.toFixed(2),
      style: {stretch: 'vertical'}
    }));
  // display lai timeseries
   inspector1.widgets().set(0,chart1)
   // anomalies 
   inspector1.widgets().set(1,chart2)
  });  
}
displayCharts(map1);
displayCharts(map2)
displayCharts(map3)
displayCharts(map4)
  }
});
var yearSelect = ui.Select({
  items: yItems,
  placeholder: 'Select a year...',
  onChange: function(value) {
     //reset monthly list
      monthSelect.items().reset(mItems);
  }
});
sidePanel.add(yearSelect)
sidePanel.add(monthSelect)
sidePanel.add(legend1)
sidePanel.add(legend2)
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width:'100%'},
});
// add sub panels for point labels
var inspector0 = ui.Panel({
  widgets:[ui.Label('Click on map to inspect value',{fontSize:'18px',fontWeight:'bold'})],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width:'100%', height:'10%'},
});
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width:'100%', height:'90%'},
});
inspector.add(inspector0);
inspector.add(inspector1);
sidePanel.add(inspector)
map1.style().set('cursor', 'crosshair');
map2.style().set('cursor', 'crosshair');
map3.style().set('cursor', 'crosshair');
map4.style().set('cursor', 'crosshair');
map1.centerObject(center,7)