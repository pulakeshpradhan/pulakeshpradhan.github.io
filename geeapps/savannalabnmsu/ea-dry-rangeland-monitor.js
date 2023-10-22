var counties = ui.import && ui.import("counties", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    lewa = ui.import && ui.import("lewa", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            37.41405024006693,
            0.22152958809732265
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([37.41405024006693, 0.22152958809732265]),
    wcc = ui.import && ui.import("wcc", "image", {
      "id": "users/savannalabnmsu/treecover_kenya/wcc_ke_eth_2020"
    }) || ee.Image("users/savannalabnmsu/treecover_kenya/wcc_ke_eth_2020"),
    samples = ui.import && ui.import("samples", "table", {
      "id": "users/savannalabnmsu/ke_dry_modis"
    }) || ee.FeatureCollection("users/savannalabnmsu/ke_dry_modis"),
    nbar = ui.import && ui.import("nbar", "imageCollection", {
      "id": "MODIS/006/MCD43A4"
    }) || ee.ImageCollection("MODIS/006/MCD43A4"),
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/savannalabnmsu/kenya_north"
    }) || ee.FeatureCollection("users/savannalabnmsu/kenya_north"),
    longterm = ui.import && ui.import("longterm", "imageCollection", {
      "id": "projects/ee-slnmsu-servir-esa/assets/ke_lca_5y"
    }) || ee.ImageCollection("projects/ee-slnmsu-servir-esa/assets/ke_lca_5y"),
    s2a = ui.import && ui.import("s2a", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR");
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
                  //ee.Filter.eq('ADM2_NAME','Tana River')
                  //ee.Filter.eq('ADM2_NAME','Kitui'),
                  //ee.Filter.eq('ADM2_NAME','Tharaka')
                  //ee.Filter.eq('ADM2_NAME','Mwingi')
                 // ee.Filter.eq('ADM2_NAME','Embu'),
                 // ee.Filter.eq('ADM2_NAME','Nairobi'),
                  //ee.Filter.eq('ADM2_NAME','Thika')
                  ))
var area = kenya_counties
var datepanel = ui.Panel(
  [ui.Label('Choose a date to display data layers',{color:'black',fontWeight:'bold',fontSize:'12px', backgroundColor:'grey'})],
  ui.Panel.Layout.flow('vertical'),
  {height:'30%',width:'75%', position:'bottom-left', backgroundColor:'grey'});
var chartpan = ui.Panel(
  [],
  ui.Panel.Layout.flow('vertical'),
  {height:'37%',width:'95%',
  backgroundColor:'grey', 
  position:'bottom-right',
  padding:  '0px',
  stretch:'both'})
  .add(ui.Label('click on map for location data'));
var rgb = {bands:['nir','red','green'], min:50,max:2500}  ;
var viz_dry = {bands:['lca'], min:0.4,max:0.7,palette:['saddlebrown','white','yellow']};
var viz_ndvi = {bands:['msavi'], min:0.1,max:0.5,palette:['saddlebrown','white','green']};
/*
var toolPanel = ui.Panel(
  [datepanel,chartpan],
  ui.Panel.Layout.flow('horizontal'),
  {height:'35%',width:'100%', stretch:'horizontal'}) ;
*/
var createLegend = require('users/savannalabnmsu/misc:colorbar.js');
//var legend1 = ui.Label('Lignin/Cellulose Absorption Index',{position:'top-center', fontSize:'20px', fontWeight:'bold'});
//var legend2 = ui.Label('Greenness',{position:'top-center', fontSize:'20px', fontWeight:'bold'});
var legend1 = createLegend.makeColorBar(viz_dry, 'Lignin/Cellulose Absorption Index','80%','110px','top-center','16px');
var legend2 = createLegend.makeColorBar(viz_ndvi, 'Greenness (MSAVI)','80%','110px','top-center','16px');  
var map1 = ui.Map().setControlVisibility(false,true, true, true,true).setOptions('terrain');
var map2 = ui.Map().setControlVisibility(false,false, true, true).setOptions('satellite').add(legend1);
var map3 = ui.Map().setControlVisibility(false,false, true, true).setOptions('satellite').add(legend2);
var changeBaseMap = require('users/savannalabnmsu/misc:removeMapIcons.js')
changeBaseMap.removeIcons(map2)
changeBaseMap.removeIcons(map3)
map1.add(datepanel)
map3.add(chartpan)
map1.style().set('cursor', 'crosshair');
map2.style().set('cursor', 'crosshair');
map3.style().set('cursor', 'crosshair');
var maps = [map1,map2,map3];
ui.Map.Linker(maps)//,'change-center');
//ui.Map.Linker([map2,map3]);
var mapPanel = ui.Panel(
  [map1,map2,map3],ui.Panel.Layout.flow('horizontal'),{height:'100%',width:'100%'}
  );
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));
ui.root.widgets().reset([mapPanel]);
//var area = aoi;
map1.centerObject(ee.Geometry.Point([36.5,1.5]),6);
map2.centerObject(ee.Geometry.Point([36.5,1.5]),7);
map3.centerObject(ee.Geometry.Point([36.5,1.5]),7);
///Model/////
var xvars = [
    'blue','green','red','nir',
    'swir12','swirND','swir1','swir2',
    'ndvi',//'msavi'
    ];
var GBTmodel = function(data,yvar,xvars){
 var classifier =  
   ee.Classifier.smileGradientTreeBoost({
                        numberOfTrees:500, 
                        shrinkage:0.01,
                        loss:'Huber',
                        samplingRate:0.9,
                        maxNodes:null
                        })
                        .setOutputMode('REGRESSION') ;
  var trained = classifier.train(data,yvar,xvars);
  return trained//.explain()
};
var model_lca = GBTmodel(samples,'lca',xvars);
var oldNames = ['Nadir_Reflectance_Band3','Nadir_Reflectance_Band4',
                   'Nadir_Reflectance_Band1','Nadir_Reflectance_Band2',
                     'Nadir_Reflectance_Band6','Nadir_Reflectance_Band7'];
var newNames = ['blue','green','red','nir','swir1','swir2'];
function addBands(img){
 var image = img.clip(area)
 var ndvi = image.normalizedDifference(['nir','red']).select([0],['ndvi']);
 var msavi = image.expression(
                           '(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', 
                           {
                             'NIR': image.select('nir').divide(10000), 
                             'RED': image.select('red').divide(10000)
                             })
                             .select([0],['msavi']);
  var swir12 = image.select('swir1').divide(image.select('swir2')).select([0],['swir12']);
  var swirND = image.normalizedDifference(['swir1','swir2']).select([0],['swirND']);
  var stack = image.addBands(ndvi).addBands(msavi).addBands(swir12).addBands(swirND);
  return stack.copyProperties(img,['system:time_start'])
}
var yTD = function(date){
  date = ee.Date(date)
  //var start  = end.advance(-7,'day')
  var d = ee.Number.parse(date.format('DDD'))
  var year = ee.Number.parse(date.format('YYYY'))
  var week = ee.Algorithms.If(d.lte(364),d.divide(7.01).int().add(1),ee.Number(52))
  var criteria = ee.Filter.and(
    ee.Filter.dayOfYear(d.subtract(3), d.add(3)),
    ee.Filter.calendarRange(year,year,'year')
    )
  var weekly_image = nbar.filter(criteria)
                         .select(oldNames,newNames)
                         .map(addBands)
                         .qualityMosaic('msavi')
  //var lca = perDay.median().select([0],['lca'])
  var lca = weekly_image.classify(model_lca,'lca').multiply(10)
  var long = longterm.filter(ee.Filter.eq('week',week)).first()
  return weekly_image.select('nir','green','red','msavi').addBands(lca).addBands(long).set('week',week).set('system:time_start',date.millis())
}
//var SGfilter = require('users/savannalabnmsu/misc:SG_filter')
//var smoothed = ee.ImageCollection.fromImages(SGfilter.SG_filter(collection,'lca',15))
// Use a DateSlider to create composites for selected weekly intervals.
var start = ee.Date('2017-01-01').format();
var end = ee.Date(nbar.sort('system:time_start',false).first().get('system:time_start')).advance(-4,'day').format();
var addLayer = function(range) {
    chartpan.widgets().reset([ui.Label('click on map for location data')])
    maps.map(function(map){
     map.drawingTools().setShown(false).clear()
     })
    var start = range.start() // Asynchronously add layers and display
    var image = yTD(start)
    start.format('YYYY-MM-dd').evaluate(function(name) {
    //map1.setZoom(6);
    map1.layers().set(0,ui.Map.Layer(image,rgb,'False Color RGB'));
    map1.layers().set(1,ui.Map.Layer(area.style({color:'black',fillColor:'00000000'}),{},'Kenyan Rangeland Counties'));
    map2.layers().set(0,ui.Map.Layer(image,viz_dry,name+' LCAI'));
    map3.layers().set(0,ui.Map.Layer(image,viz_ndvi,name+' MSAVI'));
  });
};
// Asynchronously compute the date range function and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 1,
    onChange: addLayer,
    style:{width:'95%',height:'70%',color:'black', backgroundColor:'grey'}
  });
 datepanel.widgets().set(1,dateSlider.setValue(ee.Date(end).format('YYYY-MM-dd').getInfo())); 
});
maps.map(function(map){
 map.onClick(function(coordinates) {
    // get coordinates for clicked point 
    var point = ee.Geometry.Point(coordinates.lon, coordinates.lat);
    var zone = ee.FeatureCollection([point]);
    var current = ee.Image(map1.layers().get(0).get('eeObject'))
                  .select(['lca','lca_mean','lca_upper','lca_lower'],['current value',' median_5yr','median_plus_2sd', 'median_minus_2sd']);
    print(current)
    var date = ee.Date(current.get('system:time_start')).format('YYYY-MM-dd').getInfo()
    var week = ee.Number(current.get('week'))
    //center and further zoom into selected point
    maps.map(function(map){
     var geoLayers = map.drawingTools().setShown(false) 
     var geo = point
     geo.evaluate(
        function(el){geoLayers.clear().addLayer([el], 'point', 'blue', true, true)})
    })
    /*
    map1.layers().set(2,ui.Map.Layer(zone.style({color:'blue',pointSize:10}),{},'zone'));
    map2.layers().set(1,ui.Map.Layer(zone.style({color:'blue',pointSize:10}),{},'zone'));
    map3.layers().set(1,ui.Map.Layer(zone.style({color:'blue',pointSize:10}),{},'zone'));
    */
    map2.centerObject(point,15);
    map1.centerObject(point,10);
  var col = longterm.select(
    [
      'lca_mean','lca_upper','lca_lower'
      ],
                            ['5yr median','CI_95_upper', 'CI_95_lower']
                            )  
  col = col.map(function(image){
    var w = ee.Number(image.get('week'))
    var newImage = ee.Algorithms.If(w.eq(week), current.select(['current value'],['selected']), ee.Image.constant(0).select([0],['selected']))
    return image.addBands(newImage)
  })
  var chart = ui.Chart.image.series(col, point, ee.Reducer.first(), 500,'week')
    //var chart = ui.Chart.array.values(yValues, 1, xLabels)
       .setChartType('LineChart')
       .setSeriesNames(['5yr median','median-2*SD','median+2*SD','selected date ['+date+']'])
       .setOptions({
    colors:['red','orange','yellow','blue'],     
    title: ' Weekly values', 
    curveType:'function',
    hAxis: {title: 'Week of Year (1 - 52)', textStyle:{fontSize: 12},titleTextStyle:{fontSize: 12,bold:true}}, 
    legend: {position: 'top', maxLines: 2},
      vAxes: {
            0:{title: 'Lignin Cellulose Absorption Index', textStyle:{fontSize: 12}, titleTextStyle:{fontSize: 12, bold:true},viewWindow: {min:-0.5, max:1.2}},
     },
      height:'95%',
      width:'100%',
      stretch:'horizontal',
      series: {
        3:{type:'bars'}
      },
    });
  /*
    var chart1 = ui.Chart.image.byRegion(current,point, ee.Reducer.first(), 500)
                              .setChartType('BarChart')
                              .setOptions({
                              colors:['red','brown','orange','yellow'],
                              vAxis: {textColor:"#ffffff"},
                              hAxis: {title: 'Lignin Cellulsoe Absorption Index', viewWindow: {min: 0, max: 1}, textStyle: {fontSize:10}, ticks:[0,0.5,1]},
                              height:'44%',
                              width: '100%',
                              stretch:'horizontal',
                              title: "week of "+date+" (week "+week.format('%02d').getInfo()+")"
                                                        });  
  */
    chartpan.widgets().set(0,chart);
    //chartpan.widgets().set(1,chart1);
      });
});
      //.map(function(img){return })
map1.layers().set(0,ui.Map.Layer(area.style({color:'black',fillColor:'00000000'}),{},'AOI'));