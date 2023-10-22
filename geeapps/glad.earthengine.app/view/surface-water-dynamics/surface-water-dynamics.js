var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
//Load source
var srtm = ee.Image("USGS/SRTMGL1_003"),
    ocean = ee.Image("projects/glad/landBuffer4");
var LASTYEAR = 2021;
var LASTYEARstr = (LASTYEAR).toString()
var Nyears = LASTYEAR-1999+1;
var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var years = ee.List.sequence(1999,LASTYEAR).getInfo();
var list = ee.List([]);
for(var y=0;y<Nyears;y++){
  for(var m=0;m<12;m++){
    list = list.add(years[y]+'-'+monthArray[m]);
}}
//load images
var years = ['1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013',
'2014','2015','2016','2017','2018','2019','2020',LASTYEARstr];
//single months
var indMonth = ee.ImageCollection('projects/glad/water/individualMonths');//
var indMonthI = indMonth.sort('system:time_start').toBands().rename(list).uint8();//print(indMonthI)
indMonth = ee.ImageCollection(indMonth.map(function(i){return ee.Image(i).select(0).rename('Water_Percent')}));
var indmonthlyr = ui.Map.Layer(indMonthI,{bands:[LASTYEARstr+'-Jan'],min:0,max:100},'individual month')
var selYearMonth = ui.Panel([ui.Select({items: years, 
    placeholder: LASTYEARstr,
    onChange: function(lyr){
      var params = indmonthlyr.getVisParams();
      var p = ee.String(params.bands[0]).slice(-4)
      indmonthlyr = indmonthlyr.setVisParams({bands:[ee.String(lyr).cat(p).getInfo()], min:0, max:100});
    }}),
    ui.Select({items: monthArray, 
    placeholder: 'Jan',
    onChange: function(lyr){
      var params = indmonthlyr.getVisParams();
      var p = ee.String(params.bands[0]).slice(0,5)
      indmonthlyr = indmonthlyr.setVisParams({bands:[p.cat(lyr).getInfo()], min:0, max:100});
    }})
    ], ui.Panel.Layout.flow('horizontal'));
//mean months
var defaultlayers = ['Mar','Jul','Nov'];
var mask = ee.ImageCollection('projects/glad/water/monthMeans').toBands().rename(monthArray).mask()
var Smonths = ee.ImageCollection('projects/glad/water/monthMeans').toBands().rename(monthArray).updateMask(ocean.mask().eq(1)).updateMask(mask);// loadSingleMonths();//.where(landmask,0);//singlemonthmean
var months = loadMeanMonths(Smonths);
var maplyr = ui.Map.Layer(Smonths,{bands:defaultlayers, min:0, max:100},'month dropdown');
var selR = ui.Select({items: monthArray, 
    placeholder: defaultlayers[0],
    onChange: function(lyr){
      var params = maplyr.getVisParams();
      maplyr = maplyr.setVisParams({bands:[lyr, params.bands[1],params.bands[2]], min:0, max:100});
    }});
var selG = ui.Select({items: monthArray, 
    placeholder: defaultlayers[1],
    onChange: function(lyr){
      var params = maplyr.getVisParams();
      maplyr = maplyr.setVisParams({bands:[params.bands[0], lyr, params.bands[2]], min:0, max:100});
    }});
var selB = ui.Select({items: monthArray, 
    placeholder: defaultlayers[2],
    onChange: function(lyr){
      var params = maplyr.getVisParams();
      maplyr = maplyr.setVisParams({bands:[params.bands[0], params.bands[1], lyr], min:0, max:100});
    }});
var panelMonth = ui.Panel([selR, selG, selB], ui.Panel.Layout.flow('horizontal'));
//RGB
var prergb18 = ee.Image("projects/glad/water/dynamics18/rgb");
var prergb = ee.Image("projects/glad/water/dynamics21/rgb");
var datamask = prergb18.mask();
var rgb18 = prergb18.updateMask(prergb18.neq(255)).rename(['1_Red','2_Green','3_Blue']);
var rgb = prergb.updateMask(datamask).updateMask(prergb.neq(255)).rename(['1_Red','2_Green','3_Blue']);
var interannuallyr18 = ui.Map.Layer(rgb18,{min:0,max:100},'interannual18');
var interannuallyr21 = ui.Map.Layer(rgb,{min:0,max:100},'interannual21');
var interannualpanel = ui.Panel([
  ui.Thumbnail(ee.Image('users/ahudson2/legendiaw2'),{backgroundColor: bgColor,dimensions:'260', bands:['b1','b2','b3']})
  ]);
//annual percent
var all = ee.ImageCollection('projects/glad/water/annual').toBands().rename(years).updateMask(ocean.mask().eq(1));
var annual = all;
var annuallyr = ui.Map.Layer(annual,{bands:[LASTYEARstr],min:0,max:100},'annual')
var selYear = ui.Select({items: years, 
    placeholder: LASTYEARstr,
    onChange: function(lyr){
      annuallyr = annuallyr.setVisParams({bands:[lyr], min:0, max:100});
    }});
//annual classes
var classes18 = ee.Image("projects/glad/water/dynamics18/classes").updateMask(ocean.mask().eq(1));
var classes18lyr = ui.Map.Layer(classes18.selfMask(),
  {palette:['292929','ffffff','007dff','ff7d00','f000f0','00f000','999999','ad7d52','000000','404040','ebebeb','000000'],min:1,max:12},'classes 99-18')
var classes21 = ee.Image("projects/glad/water/dynamics21/classes").updateMask(ocean.mask().eq(1));
var classes21lyr = ui.Map.Layer(classes21.selfMask(),
  {palette:['292929','ffffff','007dff','ff7d00','f000f0','00f000','999999','ad7d52','000000','404040','ebebeb','000000'],min:1,max:12},'classes 99-21')
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
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
var classLegend = ui.Panel(makeRow('292929','Land         1'));
classLegend.style().set({margin:'8px',backgroundColor: bgColor,stretch:'horizontal'})
//classLegend.add()
classLegend.add(makeRow('ffffff','Permanent water  2'))
classLegend.add(makeRow('999999','Stable seasonal  7'))
classLegend.add(makeRow('007dff','Water gain       3'))
classLegend.add(makeRow('ff7d00','Water loss       4'))
classLegend.add(makeRow('f000f0','Dry period       5'))
classLegend.add(makeRow('00f000','Wet period       6'))
classLegend.add(makeRow('ad7d52','High frequency   8'))
classLegend.add(makeRow('404040','Probable permanent land    10'))
classLegend.add(makeRow('ebebeb','Probable permanent water   11'))
classLegend.add(makeRow('000000','Sparse data   12'))
//['292929','ffffff','007dff','ff7d00','f000f0','00f000','999999','ad7d52','000000','404040','ebebeb']
//Side panel elements
// Create panels to hold lon/lat values.
var lon = ui.Label();//.style().set({backgroundColor: bgColor});
var lat = ui.Label();//.style().set({backgroundColor: bgColor});
var subtitlestyle = {color: '#555555', fontWeight: 'bold', backgroundColor:bgColor}
var title = ui.Panel([//ui.Thumbnail(ee.Image('users/ahudson2/gladLogo'),{dimensions:'50', bands:['b1','b2','b3']}),
  ui.Label({
    value: 'GLAD global surface water dynamics 1999-'+LASTYEARstr,
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("A.H. Pickens, M.C. Hansen, M. Hancher, S.V. Stehman, A. Tyukavina, P. Potapov, B. Marroquin, Z. Sherani (2020).",{margin: '0px 0px 8px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.1016/j.rse.2020.111792",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.1016/j.rse.2020.111792"),
  ui.Panel([ui.Label("Global maps derived from all Landsat 5, 7, and 8 scenes 1999-"+LASTYEARstr+" highlight the changes in surface water extent during this period. Maps include the interannual dynamics 1999-"+LASTYEARstr+", discrete dynamics classes, annual water percent, mean monthly water percent, and the water percent for individual months. Water percent is calculated from only the land and water observations. All maps are publically available within Earth Engine and for download. Asset IDs are displayed below for the selected layer. A probability sample-based assessment provides unbiased estimators of the area of permanent water, seasonal water, water loss, water gain, temporary land, temporary water, and high-frequency change 1999-2018."
              ,{backgroundColor: bgColor}),
    //ui.Label("Global Ecosystem Dynamics Investigation (GEDI)",{backgroundColor: bgColor},"gedi.umd.edu"),
    //ui.Label("lidar forest structure measurements and",{backgroundColor: bgColor}),
    //ui.Label("Landsat analysis-ready data time-series",{backgroundColor: bgColor},"https://glad.geog.umd.edu/ard/home"),
  ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  ui.Label("Data download:",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),
  ui.Label("https://glad.umd.edu/dataset/global-surface-water-dynamics",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://glad.umd.edu/dataset/global-surface-water-dynamics"),
  //ui.Label("",{backgroundColor: bgColor,margin: '8px 4px 8px 8px'}),
  //ui.Label("glad.umd.edu/dataset/global-surface-water-dynamics",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://glad.umd.edu/dataset/global-surface-water-dynamics"),
  //ui.Label("Download annual and interannual maps",{backgroundColor: bgColor},"https://console.cloud.google.com/storage/browser/earthenginepartners-hansen/water/"),
  //ui.Label("Download maps for individual months",{backgroundColor: bgColor},"https://console.cloud.google.com/storage/browser/earthenginepartners-hansen/water/individualMonthMaps")
],'flow',{backgroundColor: bgColor});
var instructions = ui.Panel([ui.Label(),ui.Label("Click a location to see its time-series. To share location, copy URL.",subtitlestyle)],'flow',{backgroundColor: bgColor});
//create percent water legend
// Create the color bar for the legend.
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 0.1],dimensions: '150x15',format: 'png',min: 0,max: 1,palette: palette,};}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(['000000','FFFFFF']),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
}); 
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(['000000','FFFFFF']),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
}); 
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [ui.Label(0, {margin: '4px 8px'}),ui.Label(50,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(100, {margin: '4px 8px'})],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendLabels2 = ui.Panel({
  widgets: [ui.Label(0, {margin: '4px 8px'}),ui.Label(50,{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(100, {margin: '4px 8px'})],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({value: 'Percent water'});var legendTitle2 = ui.Label({value: 'Percent water'});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
var images = {
  'Interannual dynamics 1999-2021': interannuallyr21,
  'Interannual dynamics 1999-2018': interannuallyr18,
  'Interannual dynamics classes 1999-2021':classes21lyr,
  'Interannual dynamics classes 1999-2018':classes18lyr,
  'Month R-G-B': maplyr,
  'Year': annuallyr,
  'Individual month': indmonthlyr,
}
var layerOptionsPanel = ui.Panel([],'flow',{backgroundColor: bgColor});//,ui.Panel.Layout.flow('horizontal'));//ui.Panel([ui.Thumbnail(ee.Image('users/ahudson2/legend_iaw'),{dimensions:'400', bands:['b1','b2','b3']})]);
var layerAssets = {
  'Interannual dynamics 1999-2021': ui.Panel([ui.Label("Earth Engine image ID: 'projects/glad/water/dynamics21/rgb'",{margin: '8px 4px 8px 8px'})]),
  'Interannual dynamics 1999-2018': ui.Panel([ui.Label("Earth Engine image ID: 'projects/glad/water/dynamics18/rgb'",{margin: '8px 4px 8px 8px'})]),
  'Interannual dynamics classes 1999-2021': ui.Panel([ui.Label("Earth Engine image ID: 'projects/glad/water/dynamics21/classes'",{margin: '8px 4px 8px 8px'})]),
  'Interannual dynamics classes 1999-2018': ui.Panel([ui.Label("Earth Engine image ID: 'projects/glad/water/dynamics18/classes'",{margin: '8px 4px 8px 8px'})]),
  'Month R-G-B': ui.Panel([ui.Label("Earth Engine collection ID: 'projects/glad/water/monthMeans'",{margin: '8px 4px 8px 8px'})]),
  'Year': ui.Panel([ui.Label("Earth Engine collection ID: 'projects/glad/water/annual'",{margin: '8px 4px 8px 8px'})]),
  'Individual month': ui.Panel([ui.Label("Earth Engine collection ID: 'projects/glad/water/individualMonths'",{margin: '8px 4px 8px 8px'})]),
};
var layerOptions = {
  'Interannual dynamics 1999-2021': interannualpanel,
  'Interannual dynamics 1999-2018': interannualpanel,
  'Interannual dynamics classes 1999-2021': classLegend,
  'Interannual dynamics classes 1999-2018': classLegend,
  'Month R-G-B': ui.Panel([ui.Label('1999-2021 Monthly means. Select months to display in R-G-B:'),panelMonth]),
  'Year': ui.Panel([
    ui.Panel([ui.Label('Select year:'),selYear]),
    legendPanel],
    ui.Panel.Layout.flow('horizontal')),
  'Individual month': ui.Panel([
    ui.Panel([ui.Label('Select year and month:'),selYearMonth]),
    legendPanel2],
    ui.Panel.Layout.flow('horizontal')),
};
var selLayer = ui.Select({items: ['Interannual dynamics 1999-2021','Interannual dynamics 1999-2018','Interannual dynamics classes 1999-2021','Interannual dynamics classes 1999-2018','Month R-G-B','Year','Individual month'],//], 
      placeholder: 'Interannual dynamics 1999-2021',
      onChange: function(lyr){
      mapPanel.layers().set(0,images[lyr]);
      //var last = layerOptionsPanel.widgets().get(0).widgets().length();
      //layerOptionsPanel.widgets().get(0).widgets().get(last).clear()
      //layerOptionsPanel.widgets().get(last).clear()
      layerOptionsPanel.clear();
      layerOptionsPanel.add(layerOptions[lyr]);
      layerOptionsPanel.add(layerAssets[lyr]);
    }});
layerOptionsPanel.add(layerOptions['Interannual dynamics 1999-2021']);
layerOptionsPanel.add(layerAssets['Interannual dynamics 1999-2021']);
//side panel
var panel2 = ui.Panel();
panel2.style().set({
  width: '455px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
panel2.add(title);
panel2.add(ui.Label('Display layer:',subtitlestyle));
panel2.add(selLayer);
panel2.add(layerOptionsPanel);
panel2.add(instructions);
panel2.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var charts = ui.Panel();
panel2.add(charts);
panel2.style().set({backgroundColor: bgColor});
mapPanel.add(interannuallyr21);
//mapPanel.add(ui.Map.Layer(rgb.subtract(rgb19),{min:-100,max:100},'difference'))
//mapPanel.add(ui.Map.Layer(rgb.subtract(rgb19),{min:-100,max:100},'difference'))
//mapPanel.add(ui.Map.Layer(waterCount.lte(3).and(count.gte(8)).and(waterCount.divide(count).lte(0.125))))
mapPanel.setOptions("HYBRID");
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),0).getInfo();
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),0).getInfo();
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),3).getInfo();
var showtimeseries = ee.Algorithms.If(ui.url.get('timeseries'),1,0).getInfo();
if(showtimeseries){makeGraphs2(startlon,startlat);}
mapPanel.setCenter(startlon,startlat,startzoom);
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel2));
mapPanel.onClick(makeGraphs);
////////////////////////////////////////////////////////////////////////////////////////
// Register a function to draw a chart when a user clicks on the map.
function makeGraphs(coords){
  makeGraphs2(coords.lon, coords.lat)
}
function makeGraphs2(lon1,lat1) {
  charts.clear();
  var point = ee.Geometry.Point(lon1, lat1);
  ui.url.set({'lon':lon1,'lat':lat1,'zoom':mapPanel.getZoom(),'timeseries':1})
  var rgbvalues = rgb.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:30});print(rgbvalues)
  var red = ee.Number(rgbvalues.get('1_Red')).multiply(2.55).toUint16().format('%02x');
  var green = ee.Number(rgbvalues.get('2_Green')).multiply(2.55).toUint16().format('%02x');
  var blue = ee.Number(rgbvalues.get('3_Blue')).multiply(2.55).toUint16().format('%02x');
  var pal = red.cat(green).cat(blue).getInfo();
  lon.setValue('Lon: ' + lon1.toFixed(5)),
  lat.setValue('Lat: ' + lat1.toFixed(5));
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  mapPanel.layers().set(1, dot);
  months = months.rename(['01','02','03','04','05','06','07','08','09','10','11','12']).updateMask(months.neq(255));
  Smonths = Smonths.rename(['01','02','03','04','05','06','07','08','09','10','11','12']).updateMask(Smonths.neq(255));
  var chart1 = ui.Chart.image.series(monthseries(Smonths,months), point, null,30,'Month').setOptions({title: 'Monthly Percent', min:0, max:100,colors:['000000','BBBBBB']}); //height: '275px', width: '500px'
  var chart2 = ui.Chart.image.series(timeseries(annual.updateMask(annual.neq(255)),makeMWfromAnnual(annual)), point, null,30).setOptions({title: 'Annual Percent', min:0, max:100,colors:['000000','BBBBBB']}); //height: '275px', width: '500px'
  var chart3 = ui.Chart.image.regions(rgb,point,null,30).setOptions({title: 'RGB Trend Model', min:0, max:100,colors:[pal]});
  var chart4 = ui.Chart.image.series(indMonth,point,ee.Reducer.first(), 1).setOptions({series:{0:{lineWidth:0,pointSize: 2}},colors:['444444'],title:'Individual month water percent'});
  charts.widgets().set(1,chart1);
  charts.widgets().set(2,chart2);
  charts.widgets().set(3,chart3);
  charts.widgets().set(4,chart4);
}
function timeseries(i1,i2){
  var col = ee.ImageCollection([])
  for(var yr=1999; yr<=LASTYEAR;yr++){
    var year = yr.toString()
    col = col.merge(ee.ImageCollection([ee.Image([i2.select(year).rename('3-year mean'),i1.select(year).rename('Annual')]).set('system:time_start',ee.Date.fromYMD(yr,1,1)).set('Year',year)]))
  }
  return col;
}
function meanMonth(i,m1,m2,m3){
  i = ee.Image(i)
  i = i.updateMask(i.neq(255))
  return i.select([m1,m2,m3]).reduce('sum').divide(i.select([m1,m2,m3]).reduce('count'));//.multiply(100);
}
function loadMeanMonths(i){
  var months=meanMonth(i,11,0,1);
  for (var month = 1; month <= 10; ++month) {
    months=months.addBands(meanMonth(i,month-1,month,month+1));
  }
  months=months.addBands(meanMonth(i,10,11,0));
  months = months.rename(monthArray);
  //months = months.where(waterCount.lt(3),0)
  months = months.updateMask(ocean.mask().eq(1));
  //months = months.updateMask(ocean.mask().eq(1));
  //var monthsmean = months.updateMask(months.neq(255)).reduce('mean')
  months = months.updateMask(months.neq(255))
  return months;
}
function monthseries(i1,i2){
  var col = ee.ImageCollection([]);
  for(var m=1; m<=12;m++){
    var monthName = ('0' + m).slice(-2);
    col = col.merge(ee.ImageCollection([ee.Image([i1.select(monthName).rename('single'),i2.select(monthName).rename('3-month mean')]).set('system:time_start',ee.Date('2019-'+monthName+'-15')).set('Month',monthName)]))
  }
  return col;
}
function makeMWfromAnnual(i){
  var years=ee.List.sequence(2000,2018);
  i = i.updateMask(i.neq(255))
  var mw = i.select('1999','2000').reduce('mean').rename('1999')
  for(var yr = 2000; yr<=2020;yr++){
    var year = yr.toString();
    var next =(yr+1).toString();
    var prev =(yr-1).toString();
    mw = mw.addBands(i.select(prev,year,next).reduce('mean').rename(year))
  }
  mw = mw.addBands(i.select('2020','2021').reduce('mean').rename('2021'))
  return mw;
}