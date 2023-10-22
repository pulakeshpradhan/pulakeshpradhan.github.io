var modis_lai = ui.import && ui.import("modis_lai", "imageCollection", {
      "id": "MODIS/006/MCD15A3H"
    }) || ee.ImageCollection("MODIS/006/MCD15A3H"),
    geometryGradientBar = ui.import && ui.import("geometryGradientBar", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              38.09028921775424,
              -0.016976405314431845
            ],
            [
              38.35396109275424,
              0.008429478195858106
            ]
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.LineString(
        [[38.09028921775424, -0.016976405314431845],
         [38.35396109275424, 0.008429478195858106]]),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/savannalabnmsu/tunisia_aoi"
    }) || ee.FeatureCollection("users/savannalabnmsu/tunisia_aoi"),
    wcc = ui.import && ui.import("wcc", "image", {
      "id": "projects/ee-slnmsu-tunisia-peer/assets/tunisia_woody_cover_final"
    }) || ee.Image("projects/ee-slnmsu-tunisia-peer/assets/tunisia_woody_cover_final"),
    maxLAI = ui.import && ui.import("maxLAI", "image", {
      "id": "projects/ee-slnmsu-tunisia-peer/assets/predictedLAI"
    }) || ee.Image("projects/ee-slnmsu-tunisia-peer/assets/predictedLAI"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
/////////////////////////////////////////////////////////////////////////////////////////UI INTERFACE//////////////////////////////////////////////////////////////////////////////////
var map1 = ui.Map().setControlVisibility(false,false,true,true)
var map2 = ui.Map().setControlVisibility(false,false,true,true)
var map3 = ui.Map().setControlVisibility(false,false,true,true)
var map4 = ui.Map().setControlVisibility(false,false,true,true)
var map5 = ui.Map().setOptions('satellite').setControlVisibility(false,false,false,true)
var inset = ui.Panel(
  [map5],
  ui.Panel.Layout.flow('horizontal'),
  {height:'250px',width:'250px', backgroundColor:'white', position:'bottom-left'}
  );
var changeBaseMap = require('users/savannalabnmsu/misc:removeMapIcons.js')
changeBaseMap.removeIcons(map1)
changeBaseMap.removeIcons(map2)
changeBaseMap.removeIcons(map3)
changeBaseMap.removeIcons(map4)
var topPanel = ui.Panel(
  [map1,map2],
  ui.Panel.Layout.flow('horizontal'),
  {width:'100%', height:'50%', backgroundColor:'#ffffff'}
  );
var bottomPanel = ui.Panel(
  [map3,map4],
  ui.Panel.Layout.flow('horizontal'),
  {width:'100%', height:'50%', backgroundColor:'#ffffff'}
  );
var mapPanel = ui.Panel(
  [topPanel,bottomPanel],
  ui.Panel.Layout.flow('vertical'),
  {width:'70%', height:'100%', backgroundColor:'#ffffff'}
  );
var linker = ui.Map.Linker([map1,map2,map3]);
var sidePanel = ui.Panel(
  [
    ui.Label(
      'Monitoring  vegetation conditions in Tunisia',
      { fontSize:'16px', fontWeight:'bold', width:'95%'}
      ),
    ui.Label(
    'A tool for mapping woody cover fraction and monitoring Leaf Area Index (LAI) in Tunisia. \n'
    +'MODIS LAI is disaggregated into woody and herbaceous components for each 500m pixel.\n'
    +'LAI is defined as the sum of one-sided green leaf surface area per unit ground area, \n'
    +'and is indicative of crop/forage conditions at a given location. Woody cover is the fraction of a 40m pixel \n'
    +'covered by the crowns of all woody plants as seen from above.',
    { fontSize:'13px', width:'95%'}),
    ui.Label('See Kahiu and Hanan (2018) for more details on methods.',
    { fontSize:'12px', width:'95%'},
    'https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2017JG004105'
    ),
     ui.Label(
    'Resolution: 500m (LAI), 40m (Woody cover)',
    { fontSize:'13px', width:'95%'}),
     ui.Label(
    'Choose a date',
    { fontSize:'14px', fontWeight:'bold', width:'95%'})
    ],
  ui.Panel.Layout.flow('vertical'),
  {width:'30%', height:'100%', backgroundColor:'#ffffff'}
  );
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
ui.root.widgets().reset([mapPanel,sidePanel]);  
var labelPosition = ee.Geometry.Point([9,35.8]);
//create legend
var visLAI = {min:0,max:5,palette:['saddlebrown','white','darkgreen']}
var visWCC = {min:0.1,max:0.9,palette:["saddlebrown","orange","yellow","green"]}
var createLegend = require('users/savannalabnmsu/misc:colorbar.js')
var legend1 = createLegend.makeColorBar(visLAI, 'Leaf Area Index','75%','10%','bottom-left',12);
var legend2 = createLegend.makeColorBar(visWCC, 'Canopy Cover Fraction','75%','10%','bottom-left',12);
var label1 = ui.Panel([ui.Label('Aggregate LAI',{backgroundColor:'ffffff',fontSize:'17px', fontWeight:'bold'})],'',{position:'top-center',backgroundColor:'ffffff'});
var label2 = ui.Panel([ui.Label('Woody LAI',{backgroundColor:'ffffff',fontSize:'17px', fontWeight:'bold'})],'',{position:'top-center',backgroundColor:'ffffff'});
var label3 = ui.Panel([ui.Label('Herbaceous LAI',{backgroundColor:'ffffff',fontSize:'17px', fontWeight:'bold'})],'',{position:'top-center',backgroundColor:'ffffff'});
var label4 = ui.Panel([ui.Label('Woody Cover Fraction',{backgroundColor:'ffffff',fontSize:'17px', fontWeight:'bold'})],'',{position:'top-center',backgroundColor:'ffffff'});
map1.add(label1)
map2.add(label2)
map3.add(label3)
map4.add(label4)
map4.add(inset)
////////////////////////////////////////////////////////////////////////////////////MAIN ALGORITHM///////////////////////////////////////////////////////////////////////////////////////////
var cntry = countries.filter(ee.Filter.eq("country_na","Tunisia"));
//var col = modis_lf.filterDate('2019-01-01',Date.now())
var prj = modis_lai.first().projection()
/*
var MeanAP = chirps2.filterDate('1981-01-01','2020-01-01')
                    .map(function(image){return image.resample('bilinear')
                    .clip(cntry.geometry().bounds())})
                    .sum()
                    .divide(39)
                    .reproject(prj)
                    .select([0],['MAP'])
//Export.image.toAsset({image:MeanAP,region:cntry.geometry().bounds(),scale:463.312716528,maxPixels:1e13})
*/
var wdc = wcc.select([0],['wcc']).unitScale(0,100)
var wc40 = wdc.where(wdc.lte(0),0).where(wdc.gte(1),1)
var wcc500 = wc40.reproject(prj).select([0],['wcc'])
                     //.unitScale(0,100)
map4.addLayer(wc40,visWCC,'woody canopy cover')
var regions = aoi.style({color:'blue',fillColor:'00000000'})
//Map.addLayer(MeanAP,wiz_map,'MAP')
//Map.addLayer(wcc500,viz_wcc,'tree cover')
//Map.centerObject(cntry,7)
//apply quality filter and cloud mask to modis lai. Bit 0(good quality = 0) and bits 3-4(clear clouds = 0 or 3)
var qualmask = ee.Number(2).pow(0).int()//bit 0
var cloudmask1 = ee.Number(2).pow(3).int()//bit 3
var cloudmask2 = ee.Number(2).pow(4).int()//bit 4
function qualityMask(image) {
  var qb = image.select('FparLai_QC');
  var mask = qb.bitwiseAnd(qualmask).eq(0)//goood qlty
  return image//.updateMask(mask)
  .unmask(0)
  .clipToCollection(cntry);//clip cloud-masked image to area of interest
}
//var masked = col.map(qualityMask);
// Use a DateSlider to create composites for selected weekly intervals.
// Use Jan 1 2017to date of most recent image to bound the slider.
var start = ee.Date('2017-01-01')
var latest = modis_lai.sort('system:time_start',false).first().get('system:time_start')
var end = ee.Date(latest)//ee.Date('2022-01-01')
//retriev ali data 
var laiColl = modis_lai.filterDate(start, end.advance(1,'day'))
                .map(qualityMask)
                .select('Lai')
                //.multiply(0.1)
var peakLAI = laiColl.reduce(ee.Reducer.percentile([99])).multiply(0.1)
var compute_lai = function(img){
  var date = ee.Date(img.get('system:time_start')) 
//create a 16 day maximum LAI composite around given date
  //use predicted peak canopy LAI for areas with less than 80% canopy cover, otherwise use 5 year 99th percentile
  //multiply with wcc to get landscape value
  var LAIwp = maxLAI.multiply(wcc500).where(wcc500.gte(0.8),peakLAI)
  //retrive aggregate lai
  var LAIagg = img.select([0],['Lai_agg']).multiply(0.1)
  //woody lai
  var LAIw = ee.Image(LAIwp.where(LAIwp.gt(LAIagg),LAIagg).where(wcc500.lt(0.05),0)).select([0],['Lai_w'])
// herbaceous lai
  var LAIh = LAIagg.subtract(LAIw).where(wcc500.gte(0.8),0).select([0],['Lai_h'])
  return LAIagg.addBands(LAIw).addBands(LAIh).set('system:time_start',date.millis())
}
var processed = laiColl.map(compute_lai)
/*
var woody = processed.select('Lai_w').toBands()
var herb = processed.select('Lai_h').toBands()
var agg = processed.select('Lai_agg').toBands()
print(woody,herb, agg)
Export.image.toDrive({
  image: woody,
  description:'woody_lai',
  fileNamePrefix:'tunisWoodyLAI',
  region:cntry.geometry(),
  scale:500,
  maxPixels:1e13,
  folder:'tunisLAI',
  crs:'EPSG:4326'
})
Export.image.toDrive({
  image: herb,
  description:'herb_lai',
  fileNamePrefix:'tunisHerbLAI',
  region:cntry.geometry(),
  scale:500,
  maxPixels:1e13,
  folder:'tunisLAI',
  crs:'EPSG:4326'
})
Export.image.toDrive({
  image: agg,
  description:'agg_lai',
  fileNamePrefix:'tunisAggLAI',
  region:cntry.geometry(),
  scale:500,
  maxPixels:1e13,
  folder:'tunisLAI',
  crs:'EPSG:4326'
})
*/
//creat gif animations for each band
var text = require('users/gena/packages:text') ;
var data1 = processed.filterDate(end.advance(-12,'month'),end.advance(1,'day')).map(function(image){
  var date = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd');
  var label = text.draw(date, labelPosition, 1500, { 
      fontSize: 18, textColor: '000000', fontType: 'Consolas',
      outlineColor: 'ffffff', outlineWidth: 2.5, outlineOpacity: 0.6
  });
  return image.select('Lai_agg').clip(aoi).visualize(visLAI).blend(label).blend(regions);
});
var data2 = processed.filterDate(end.advance(-12,'month'),end.advance(1,'day')).map(function(image){
  var date = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd');
  var label = text.draw(date, labelPosition, 1500, { 
      fontSize: 18, textColor: '000000', fontType: 'Consolas',
      outlineColor: 'ffffff', outlineWidth: 2.5, outlineOpacity: 0.6
  });
  return image.select('Lai_w').clip(aoi).visualize(visLAI).blend(label).blend(regions);
});
var data3= processed.filterDate(end.advance(-12,'month'),end.advance(1,'day')).map(function(image){
  var date = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd');
  var label = text.draw(date, labelPosition, 1500, { 
      fontSize: 18, textColor: '000000', fontType: 'Consolas',
      outlineColor: 'ffffff', outlineWidth: 2.5, outlineOpacity: 0.6
  });
  return ee.Image(image.select('Lai_h').clip(aoi).visualize(visLAI).blend(label).blend(regions));
});
/*
print(data1,data2,data3)
var gif1 = ui.Thumbnail(data1,{framesPerSecond:5,region:aoi.geometry().bounds()},{},{height:'200px',width:'200px',position:'bottom-left', backgroundColor:'black'});
var gif2 = ui.Thumbnail(data2,{framesPerSecond:5,region:aoi.geometry().bounds()},{},{height:'200px',width:'200px',position:'bottom-left', backgroundColor:'black'});
var gif3 = ui.Thumbnail(data3,{framesPerSecond:5,region:aoi.geometry().bounds()},{},{height:'200px',width:'200px',position:'bottom-left', backgroundColor:'black'});
*/
data1.evaluate(function(){
  var gif = ui.Thumbnail(data1,{framesPerSecond:5,region:aoi.geometry().bounds()},{},{height:'200px',width:'200px',position:'bottom-left', backgroundColor:'white'});
  map1.add(gif);
})
data2.evaluate(function(){
  var gif = ui.Thumbnail(data2,{framesPerSecond:5,region:aoi.geometry().bounds()},{},{height:'200px',width:'200px',position:'bottom-left', backgroundColor:'white'});
  map2.add(gif);
})
data3.evaluate(function(){
  var gif = ui.Thumbnail(data3,{framesPerSecond:5,region:aoi.geometry().bounds()},{},{height:'200px',width:'200px',position:'bottom-left', backgroundColor:'white'});
  map3.add(gif);
})
//map1.add(gif1);
//map2.add(gif2);
//map3.add(gif3);
//function display specific image
// Run this function on change of the dateSlider.
var display_lai = function(dateRange) {
  var image = processed.filterDate(dateRange.start(),dateRange.end())
                       .sort('system:time_start',false)
                       .first()
  // Asynchronously compute diferent layers and display
  dateRange.start().format('YYYY-MM-dd').evaluate(function(name) {
    //Map.addLayer(LAIWpinc,viz3,'inc LAIw')
    var layer1 = ui.Map.Layer(image.select('Lai_agg'), visLAI, name + ' aggregate LAI');
    var layer2 = ui.Map.Layer(image.select('Lai_w'), visLAI, name + ' woody LAI');
    var layer3 = ui.Map.Layer(image.select('Lai_h'), visLAI, name + ' herbaceous LAI');
    map1.layers().set(0, layer1);
    map2.layers().set(0, layer2);
    map3.layers().set(0, layer3);
    map1.setCenter(9.5,36,8);
    map4.setCenter(9.5,36,7);
    map5.setCenter(9.5,36,6);
  });
};
// Asynchronously compute the date range function and show the slider.
var dateRange = ee.DateRange(start, end.advance(1,'day')).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 4,
    onChange: display_lai,
    style:{width:'95%',height:'100px'}
  });
 sidePanel.add(dateSlider.setValue(end.format('YYYY-MM-dd').getInfo())); 
 sidePanel.add(legend1)
 sidePanel.add(legend2)
 // Add the panel to the UI
 sidePanel.add(inspector);
sidePanel.add(chartPanel);
});
/*
var style = require('users/gena/packages:style')
//var minMax = dem.reduceRegion(ee.Reducer.percentile([1, 99]), Map.getBounds(true), Map.getScale()).values()
//var min = ee.Number(minMax.get(0))
//var max = ee.Number(minMax.get(1))
var palette = ['e47b31','ffd716','ffff00','40d61a','2e9127']
var min = ee.Number(0)
var max = ee.Number(5)
var textProperties = { fontSize:16, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2, outlineOpacity: 0.6 }
var labels = ee.List.sequence(min, max, max.subtract(min).divide(5))
var legend = style.GradientBar.draw(
      geometryGradientBar,
      {min: min, max: max, palette: palette, labels: labels, format: '%.0f', text: textProperties}
      )
*/    
//print(map1.layers())
///////////////////////////////INSPECTOR PANEL////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width:'65%'},
});
// add sub panels for point labels
var inspector0 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
var inspector1 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
var inspector3 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  //style: {width:'60%'},
});
var inspector4 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
  //style: {width:'60%'},
});
inspector.add(ui.Label('Click on map to inspect value',{fontSize:'18px',fontWeight:'bold'}));
inspector.add(inspector0);
inspector.add(inspector1);
inspector.add(inspector2);
inspector.add(inspector3);
inspector.add(inspector4);
map1.style().set('cursor', 'crosshair');
map2.style().set('cursor', 'crosshair');
map3.style().set('cursor', 'crosshair');
map4.style().set('cursor', 'crosshair');
map5.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
function reportVal(mp){
  mp.onClick(function(coords) {
  //Clear the panel and show a loading message.
  inspector0.clear();
  inspector0.style().set('shown', true);
  inspector0.add(ui.Label('Loading...', {color: 'gray'}));
  inspector1.clear();
  inspector1.style().set('shown', true);
  inspector1.add(ui.Label('Loading...', {color: 'gray'}));
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Loading...', {color: 'gray'}));
  inspector3.clear();
  inspector3.style().set('shown', true);
  inspector3.add(ui.Label('Loading...', {color: 'gray'}));
  inspector4.clear();
  inspector4.style().set('shown', true);
  inspector4.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the LAI value at clicked location
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  map5.centerObject(point,14)
  map1.centerObject(point,10)
  map4.centerObject(point,10)
  var pointF = ee.FeatureCollection([point])
  map1.layers().set(1, ui.Map.Layer(pointF.style({color:'blue',pointSize:5}),{}, 'clicked point'))
  map2.layers().set(1, ui.Map.Layer(pointF.style({color:'blue',pointSize:5}),{}, 'clicked point'))
  map3.layers().set(1, ui.Map.Layer(pointF.style({color:'blue',pointSize:5}),{}, 'clicked point'))
  map4.layers().set(1, ui.Map.Layer(pointF.style({color:'blue',pointSize:5}),{}, 'clicked point'))
  map5.layers().set(0, ui.Map.Layer(pointF.style({color:'blue',pointSize:5}),{}, 'clicked point'))
  var agg = ee.Image(map1.layers().get(0).getEeObject())
  var woody = ee.Image(map2.layers().get(0).getEeObject())
  var herb = ee.Image(map3.layers().get(0).getEeObject())
  var wdc = ee.Image(map4.layers().get(0).getEeObject())
  var sampledPoint1 = agg.reduceRegion(ee.Reducer.mean(), point, 500);
  var sampledPoint2 = woody.reduceRegion(ee.Reducer.mean(), point, 500);
  var sampledPoint3 = herb.reduceRegion(ee.Reducer.mean(), point, 500);
  var sampledPoint4 = wdc.reduceRegion(ee.Reducer.mean(), point, 500);
  var aggValue = ee.Algorithms.If(point.intersects(cntry.geometry()),sampledPoint1.get('Lai_agg'),'Null');
  var woodyValue = ee.Algorithms.If(point.intersects(cntry.geometry()),sampledPoint2.get('Lai_w'),'Null');
  var herbValue = ee.Algorithms.If(point.intersects(cntry.geometry()),sampledPoint3.get('Lai_h'),'Null');
  var wdcValue = ee.Algorithms.If(point.intersects(cntry.geometry()),sampledPoint4.get('wcc'),'Null');
  //var covValue = sampledPoint.get('predicted_RF');
  //var bmValue = sampledPoint.get('bm_RF');
 //display coordinates at selected point 
    inspector0.clear();
    inspector0.add(ui.Label({
     value: 'lat/lon: ' + coords.lat.toFixed(2) +', '+ coords.lon.toFixed(2),
      style: {stretch: 'vertical'}
    }));
  //});
  // Request the corresp. aggregate lai value from the server and add as label to inspector panels
   aggValue.evaluate(function(result) {
    inspector1.clear();
    inspector1.add(ui.Label({
      value: 'Aggregate LAI: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
  });
  // do same for woody and herbaceous LAI
   woodyValue.evaluate(function(result) {
    inspector2.clear();
    inspector2.add(ui.Label({
      value: 'Woody LAI: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
   });
   herbValue.evaluate(function(result) {
    inspector3.clear();
    inspector3.add(ui.Label({
      value: 'Herbaceous LAI: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
   });
  wdcValue.evaluate(function(result) {
    inspector4.clear();
    inspector4.add(ui.Label({
      value: 'Woody Cover Fraction: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
   });
  var chart = ui.Chart.image.series(processed, point, ee.Reducer.first(), 500, 'system:time_start')
        .setOptions({
          curveType:'function',
          title: 'LAI 5-year timeseries',
          hAxis: { title: "Date", textStyle:{fontSize:12}},
          vAxis: { title: 'LAI', viewWindow: {min:0, max:7}, textStyle:{fontSize:12}},
          fontSize:12,
          height: '95%',
          width: '95%',
          padding:'0px',
        })
  chartPanel.clear()
  chartPanel.add(chart)
});
}
reportVal(map1);
reportVal(map2);
reportVal(map3);
reportVal(map4);
reportVal(map5);
var chartPanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),style: {width:'100%', height:'20%'}});