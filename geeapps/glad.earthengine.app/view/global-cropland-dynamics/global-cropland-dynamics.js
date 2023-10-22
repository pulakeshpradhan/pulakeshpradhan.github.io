var crop2003 = ui.import && ui.import("crop2003", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_2003"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_2003"),
    crop2007 = ui.import && ui.import("crop2007", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_2007"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_2007"),
    crop2011 = ui.import && ui.import("crop2011", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_2011"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_2011"),
    crop2015 = ui.import && ui.import("crop2015", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_2015"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_2015"),
    crop2019 = ui.import && ui.import("crop2019", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_2019"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_2019"),
    gain = ui.import && ui.import("gain", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_gain"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_gain"),
    loss = ui.import && ui.import("loss", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_loss"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_loss"),
    stable = ui.import && ui.import("stable", "imageCollection", {
      "id": "users/potapovpeter/Global_cropland_stable"
    }) || ee.ImageCollection("users/potapovpeter/Global_cropland_stable");
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor}
var crop2003 = crop2003.mosaic();
var crop2007 = crop2007.mosaic();
var crop2011 = crop2011.mosaic();
var crop2015 = crop2015.mosaic();
var crop2019 = crop2019.mosaic();
var croploss = loss.mosaic();
var cropgain = gain.mosaic();
var cropstable = stable.mosaic();
var cropdyn = cropstable.unmask().where(croploss,3).where(cropgain,2).selfMask();
var cropints = ee.Image([crop2003,crop2007,crop2011,crop2015,crop2019]).rename(['2000-2003','2004-2007','2008-2011','2012-2015','2016-2019']).selfMask();
var int03lyr = ui.Map.Layer(cropints,{bands:['2000-2003'],palette:['#60de57']},'Cropland interval');
var int07lyr = ui.Map.Layer(cropints,{bands:['2004-2007'],palette:['#60de57']},'Cropland interval');
var int11lyr = ui.Map.Layer(cropints,{bands:['2008-2011'],palette:['#60de57']},'Cropland interval');
var int15lyr = ui.Map.Layer(cropints,{bands:['2012-2015'],palette:['#60de57']},'Cropland interval');
var int19lyr = ui.Map.Layer(cropints,{bands:['2016-2019'],palette:['#60de57']},'Cropland interval');
var cropintsUM = cropints.unmask()
var richer = ee.Image([0]).where(cropintsUM.eq(ee.Image([1,0,0,0,0])).reduce('sum').eq(5),1)
    .where(cropintsUM.eq(ee.Image([1,1,0,0,0])).reduce('sum').eq(5),2)
    .where(cropintsUM.eq(ee.Image([1,1,1,0,0])).reduce('sum').eq(5),3)
    .where(cropintsUM.eq(ee.Image([1,1,1,1,0])).reduce('sum').eq(5),4)
    .where(cropintsUM.eq(ee.Image([0,1,1,1,1])).reduce('sum').eq(5),5)
    .where(cropintsUM.eq(ee.Image([0,0,1,1,1])).reduce('sum').eq(5),6)
    .where(cropintsUM.eq(ee.Image([0,0,0,1,1])).reduce('sum').eq(5),7)
    .where(cropintsUM.eq(ee.Image([0,0,0,0,1])).reduce('sum').eq(5),8)
richer = richer.where(richer.eq(0).and(cropints.reduce('sum').gt(0)),cropints.reduce('sum').add(8))
var pal = ['ddaa55','dd9955','dd7755','dd5555','55aadd','5599dd','5577dd','5555dd','b2ddb2','b2ddb2','89dd89','71dd71','4ad84a']
var richlyr = ui.Map.Layer(richer.selfMask(),{min:1,max:13,palette:pal},'Cropland dynamics')
mapPanel.add(richlyr);
//mapPanel.setOptions("HYBRID");
mapPanel.setCenter(0,0,3);
var title = ui.Panel([//ui.Thumbnail(ee.Image('users/ahudson2/gladLogo'),{dimensions:'50', bands:['b1','b2','b3']}),
  ui.Label({
    value: 'Global cropland expansion in the 21st century',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("P. Potapov, S. Turubanova, M.C. Hansen, A. Tyukavina, V. Zalles, A. Khan, X.-P. Song, A. Pickens, Q. Shen, J. Cortez. (2021) Global maps of cropland extent and change show accelerated cropland expansion in the 21st century. Nature Food.",{margin: '8px 0px 2px 8px',backgroundColor: bgColor}),
  ui.Label("https://www.nature.com/articles/s43016-021-00429-z",{backgroundColor: bgColor, margin: '0px 8px'},"https://www.nature.com/articles/s43016-021-00429-z"),
  //ui.Panel([ui.Label("The 2000-2019 globally consistent cropland extent time-series at 30-m spatial resolution derived from the Landsat satellite data archive. Cropland is defined as land used for annual and perennial herbaceous crops for human consumption, forage (including hay), and biofuel. The crop mapping was performed in four-year intervals. The cropland map time series is available for download and as a Google Earth Engine asset at"),
  //  ui.Label("https://glad.umd.edu/dataset/croplands",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://glad.umd.edu/dataset/croplands")],'flow',{backgroundColor: bgColor}),
  ui.Label("The 2000-2019 globally consistent cropland extent time-series at 30-m spatial resolution was derived from the Landsat satellite data archive. Cropland is defined as land used for annual and perennial herbaceous crops for human consumption, forage (including hay), and biofuel. The crop mapping was performed in four-year intervals. ",{margin: '16px 0px 4px 8px',backgroundColor: bgColor,whiteSpace:'normal'}),
  ui.Panel([ui.Label("Data download: ",{backgroundColor: bgColor,margin: '8px 3px 12px 8px'}),ui.Label("https://glad.umd.edu/dataset/croplands",{backgroundColor: bgColor, margin: '8px 0px'},"https://glad.umd.edu/dataset/croplands")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})
],'flow',{backgroundColor: bgColor});
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 8px 12px'
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
var rdynLegend = ui.Panel(ui.Label({value:'Global cropland dynamics 2000-2019:',style: {margin: '0 0 4px 10px',backgroundColor: bgColor}}));
rdynLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
rdynLegend.add(makeRow(pal[12],'Stable cropland'))
rdynLegend.add(makeRow(pal[11],'Intermittent cropland: 4/5 intervals'))
rdynLegend.add(makeRow(pal[10],'Intermittent cropland: 3/5 intervals'))
rdynLegend.add(makeRow(pal[9],'Intermittent cropland: 2/5 intervals'))
rdynLegend.add(makeRow(pal[4],'Cropland gain in 2004-2007'))
rdynLegend.add(makeRow(pal[5],'Cropland gain in 2008-2011'))
rdynLegend.add(makeRow(pal[6],'Cropland gain in 2012-2015'))
rdynLegend.add(makeRow(pal[7],'Cropland gain in 2016-2019'))
rdynLegend.add(makeRow(pal[0],'Cropland loss in 2004-2007'))
rdynLegend.add(makeRow(pal[1],'Cropland loss in 2008-2011'))
rdynLegend.add(makeRow(pal[2],'Cropland loss in 2012-2015'))
rdynLegend.add(makeRow(pal[3],'Cropland loss in 2016-2019'))
var dynDict = ['No cropland','Stable croplands','Cropland gain','Cropland loss','Intermittent cropland'];
var int03Legend = ui.Panel(ui.Label({value:'Global cropland 2000-2003:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}));
int03Legend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
int03Legend.add(makeRow('#60de57','Cropland'))
var int07Legend = ui.Panel(ui.Label({value:'Global cropland 2004-2007:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}));
int07Legend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
int07Legend.add(makeRow('#60de57','Cropland'))
var int11Legend = ui.Panel(ui.Label({value:'Global cropland 2008-2011:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}));
int11Legend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
int11Legend.add(makeRow('#60de57','Cropland'))
var int15Legend = ui.Panel(ui.Label({value:'Global cropland 2012-2015:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}));
int15Legend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
int15Legend.add(makeRow('#60de57','Cropland'))
var int19Legend = ui.Panel(ui.Label({value:'Global cropland 2016-2019:',style: {margin: '0 0 4px 6px',backgroundColor: bgColor}}));
int19Legend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
int19Legend.add(makeRow('#60de57','Cropland'))
var lyrs = {
  'Global cropland dynamics 2000-2019': richlyr,
  'Cropland 2000-2003': int03lyr,
  'Cropland 2004-2007': int07lyr,
  'Cropland 2008-2011': int11lyr,
  'Cropland 2012-2015': int15lyr,
  'Cropland 2016-2019': int19lyr,
};
var layerOptions = {
  'Global cropland dynamics 2000-2019': rdynLegend,
  'Cropland 2000-2003': int03Legend,
  'Cropland 2004-2007': int07Legend,
  'Cropland 2008-2011': int11Legend,
  'Cropland 2012-2015': int15Legend,
  'Cropland 2016-2019': int19Legend,
}
var layerOptionsPanel = ui.Panel([rdynLegend],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var sellayer = ui.Select({items: Object.keys(lyrs),//], 
  placeholder: 'Global cropland dynamics 2000-2019',
  onChange: function(lyr){
    layerOptionsPanel.clear();
    layerOptionsPanel.add(layerOptions[lyr]);
    mapPanel.layers().set(0,lyrs[lyr]);
  }
});
var instructions = ui.Panel([ui.Label("Click for cropland time-series:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var dynval = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});//.style().set({backgroundColor: bgColor});
var clickedVal = ui.Panel([latlon,dynval], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var panel = ui.Panel();
panel.style().set({
  width: '460px',
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
var charts = ui.Panel();
charts.style().set({
  backgroundColor: bgColor
});
panel.add(charts);
//grabs from URL or sets default
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),0).getInfo();//can replace -9.98 with wherever you would like the default lat to be
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),0).getInfo();//change default long
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),3).getInfo();//change default zoom
//set center
mapPanel.setCenter(startlon,startlat,startzoom);
//a listener
//mapPanel.onClick(changeURL);
mapPanel.onChangeBounds(changeURL);
function changeURL(input){
  ui.url.set({'lon':input.lon,'lat':input.lat,'zoom':input.zoom});
}
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onClick(getVal);
// Register a function to draw a chart when a user clicks on the map.
function getVal(coords) {
  charts.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  latlon.setValue('Lat: '+coords.lat.toFixed(5)+', Lon: '+coords.lon.toFixed(5));
  var dval = cropdyn.unmask().reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('b1').getInfo();
  var intsval = cropints.unmask().reduce('sum').reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('sum').getInfo();
  if(dval === 0 && intsval>0){dval=4;}
  dynval.setValue(dynDict[dval]);
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(1, dot);
  var chart = ui.Chart.image.regions(cropints.unmask(),point,null,5)
    .setOptions({title: 'Global cropland', min:0, max:1,colors:['#60de57'],bar: {groupWidth: '100%'},vAxis: {ticks: [{v:0,f:''},{v:1,f:'crop'}]},legend:{position:'none'}})
    .setChartType('ColumnChart');
  chart.style().set({'stretch': 'horizontal',margin:'0px'});
  charts.add(chart);
}