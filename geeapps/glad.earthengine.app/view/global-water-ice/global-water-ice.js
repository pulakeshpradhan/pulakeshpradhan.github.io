var srtm = ui.import && ui.import("srtm", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4");
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor,margin:'16px 8px 4px'};
var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var monthpal = ['888888','734573','9C3B62','B33C3C','D6683D','EE963A','FBC73F','FAFA57','7AEB86','00CFB7','00AACA','3C81B3','5F699D','734573','444444','000000'];
var mclasspal =['111111','35748E','50b8bb','85f6eA','888888','000000'];
var visM={min:0,max:15,palette:monthpal};
var visN = {min:0,max:12,palette:['000000',"#081D58FF","#253494FF","#225EA8FF","#1D91C0FF","#41B6C4FF","#7FCDBBFF","#C7E9B4FF","#EDF8B1FF","#FFFFD9FF"]};
var visP = {min:1,max:100,palette:["#081D58FF","#253494FF","#225EA8FF","#1D91C0FF","#41B6C4FF","#7FCDBBFF","#C7E9B4FF","#EDF8B1FF","#FFFFD9FF"]};
var monthsTemp = ee.Image("projects/glad/swi/months4");
var ocean = ee.Image('projects/glad/landBuffer4').mask().eq(0);
var continents = monthsTemp.select(0).unmask().eq(17).or(ocean).eq(0).and(ee.Image("projects/glad/swi/meltmonth_a10").mask());
var permanent = monthsTemp.unmask().select(0).gte(3).and(monthsTemp.select(0).unmask().lte(9));
var seasonal = monthsTemp.unmask().select(0).gte(10).and(monthsTemp.select(0).unmask().lte(16));
var land = monthsTemp.select(0).unmask().lte(1);
var months=monthsTemp.select(0).remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                                      [1,1,1,2,2,3,4,5,2,0, 2, 2, 3, 4, 5, 0, 0, 0]);
for(var m =2;m<=12;m++){
  months = months.addBands(monthsTemp.select(m-1).remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                                                        [1,1,1,2,2,3,4,5,2,0, 2, 2, 3, 4, 5, 0, 0, 0]));
}
months = months.rename(monthNames);
var allice = months.eq(3).or(months.eq(4)).reduce('sum').eq(12);
//layers
var srtm = ee.Image("CGIAR/SRTM90_V4");
var noice = srtm.lt(500).clip(ee.Geometry.Rectangle([-180,-40,180,30],'epsg:4326',false));
var glacier = ee.Terrain.slope(srtm).gt(4);//.and(months.gt(2).reduce('sum').gte(4))
var Ndata = months.gt(0).reduce('sum');
var permnofreeze = ee.Image("projects/glad/swi/freezemonth_a10").unmask().eq(0).and(permanent);
var melt = ee.Image("projects/glad/swi/meltmonth_a10").unmask().updateMask(continents).where(noice,0).divide(2).where(seasonal,14).where(land,15).where(allice,15)
var meltL = ui.Map.Layer(melt,visM,'melt');
var freeze = ee.Image("projects/glad/swi/freezemonth_a10").unmask().updateMask(continents).where(noice,0).divide(2).where(seasonal,14).where(land,15).where(allice,15);
var freezeL = ui.Map.Layer(freeze,visM,'freeze');
var NiceL = ui.Map.Layer(ee.Image("projects/glad/swi/Nice7").unmask().updateMask(continents).where(noice,0).where(allice,14),visN,'Nice');
var NwaterL = ui.Map.Layer(ee.ImageCollection([ee.Image("projects/glad/swi/NwaterS"),ee.Image("projects/glad/swi/NwaterS_south")]).mosaic().updateMask(continents),visN,'Nwater');
var PwaterL = ui.Map.Layer(ee.ImageCollection([ee.Image("projects/glad/swi/NwaterS"),ee.Image("projects/glad/swi/NwaterS_south")]).mosaic().divide(Ndata).multiply(100).updateMask(continents),visP,'Pwater');
var monthsL = ui.Map.Layer(months.unmask().where(land,1).updateMask(continents).where(months.gt(2).and(noice),0).selfMask(),{bands:['Jan'],min:1,max:6,palette:mclasspal},'months')
// Create the color bars for the legends.
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 100],dimensions: '15x150',format: 'png',min: 0,max: 1,palette: palette,};}
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
var monthLegend = ui.Panel(makeRow(monthpal[1],monthNames[0]));
monthLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
//classLegend.add()
for(var i =1; i<12;i++){
  monthLegend.add(makeRow(monthpal[i+1],monthNames[i]))
}
monthLegend.add(makeRow(monthpal[0],'Non-freezing permanent water'))
monthLegend.add(makeRow(monthpal[14],'Seasonal water'))
monthLegend.add(makeRow(monthpal[15],'Land'))
var monthcolorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').divide(100),
  params: makeColorBarParams(['734573','9C3B62','B33C3C','D6683D','EE963A','FBC73F','FAFA57','7AEB86','00CFB7','00AACA','3C81B3','5F699D']),
    style: {stretch: 'vertical', margin: '8px 0px 8px 8px', height: '100px', width: '15px'},
}); 
var legendLabelsMonth = ui.Panel({
  widgets: [ui.Label('Dec', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    ui.Label('Jan', {margin: '0px 4px', backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor, stretch: 'vertical'}
});
var legendPanelMonth = monthLegend;
var NmonthscolorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').divide(100),
  params: makeColorBarParams(['000000',"#081D58FF","#253494FF","#225EA8FF","#1D91C0FF","#41B6C4FF","#7FCDBBFF","#C7E9B4FF","#EDF8B1FF","#FFFFD9FF"]),
    style: {stretch: 'vertical', margin: '8px 0px 8px 8px', height: '100px', width: '15px'},
}); 
var legendLabelsNumber = ui.Panel({
  widgets: [ui.Label('12', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    ui.Label('0', {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendPanelNumber = ui.Panel([NmonthscolorBar, legendLabelsNumber],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var legendLabelsPercent = ui.Panel({
  widgets: [ui.Label('100', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    ui.Label('1', {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendPanelPercent = ui.Panel([NmonthscolorBar, legendLabelsPercent],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var selMonth = ui.Select({items: monthNames, 
    placeholder: 'Jan',
    onChange: function(lyr){
      monthsL = monthsL.setVisParams({bands:[lyr], min:1, max:6,palette:mclasspal});
    }});
var classLegend = ui.Panel(makeRow(mclasspal[0],'Land'));
classLegend.style().set({backgroundColor: bgColor,stretch:'horizontal'})
//classLegend.add()
classLegend.add(makeRow(mclasspal[1],'Water'))
classLegend.add(makeRow(mclasspal[2],'Water and ice'))
classLegend.add(makeRow(mclasspal[3],'Ice'))
classLegend.add(makeRow(mclasspal[4],'Shoulder Month (no data but likely ice)'))
var images = {
  'melt month': meltL,
  'freeze month': freezeL,
  'number of months of ice': NiceL,
  'Percent of months with water': PwaterL,
  'number of months of water': NwaterL,
  'individual months': monthsL,
}
var layerOptions = {
  'melt month': legendPanelMonth,
  'freeze month': legendPanelMonth,
  'number of months of ice': legendPanelNumber,
  'number of months of water': legendPanelNumber,
  'Percent of months with water': legendPanelPercent,
  'individual months': ui.Panel([ui.Label('Select month:',{backgroundColor: bgColor}),selMonth,classLegend], 'flow',{backgroundColor: bgColor})
  };
var layerOptionsPanel = ui.Panel([legendPanelMonth],'flow',{backgroundColor: bgColor});
var selLayer = ui.Select({items: ['melt month','freeze month','number of months of ice','individual months'],//], 
      placeholder: 'melt month',
      onChange: function(lyr){
      mapPanel.layers().set(0,images[lyr]);
      layerOptionsPanel.clear();
      layerOptionsPanel.add(layerOptions[lyr]);
    }});
var title = ui.Panel([
  ui.Label({
    value: 'Seasonal water and ice dynamics, 2019',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("A.H. Pickens, M.C. Hansen, S.V. Stehman, A. Tyukavina, P. Potapov, V. Zalles, J. Higgins. Remote Sensing of Environment",{margin: '8px 0px 8px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.1016/j.rse.2022.112963",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.1016/j.rse.2022.112963"),
  ui.Panel([ui.Label("The seasonal dynamics of surface water globally have not been well quantified, with area estimates only for the total area of seasonal water and not the distribution through the year. Further, global water studies have ignored ice cover on inland water bodies by treating it as no data or not mapping the high latitudes during winter months. However, through a stratified random sample of 10 m Sentinel-2 and 3 m PlanetScope data for 2019, we found that globally only 23% of the total 4.86 ± 0.16 million km2 with some water presence in 2019 was permanent liquid water (1.13 ± 0.19 million km2). 1.97 ± 0.21 million km2 of permanent inland water froze seasonally, totaling 41% of the total water area, and January-March had more ice cover than liquid water. Seasonal water-land transitions covered the remaining 36% of the total water area (1.76 ± 0.19 million km2). Additionally, these preliminary Landsat-based maps of monthly ice cover show multiple month disparities in ice melt timing of neighboring lakes of different sizes. Given the vastly different ecosystem services and climate impacts of liquid versus frozen surface water, these spatially explicit maps of ice cover phenology and monthly area estimates and associated uncertainties of inland surface water and ice cover extent provide important insights into the current state of the global water system. Such spatio-temporally explicit data may be used to inform projections of ongoing and future transitions under the impact of climate change. ",{backgroundColor: bgColor}),
  ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  ui.Label("https://glad.umd.edu/dataset/seasonal-water-ice",{backgroundColor: bgColor, margin: '8px 8px 4px'},"https://glad.umd.edu/dataset/seasonal-water-ice")
],'flow',{backgroundColor: bgColor});
var instructions = ui.Panel([ui.Label("Click for time-series:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var phen = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var clickedVal = ui.Panel([latlon,phen], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),50).getInfo();//can replace -9.98 with wherever you would like the default lat to be
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),-40).getInfo();//change default long
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),3).getInfo();//change default zoom
//side panel
var panel = ui.Panel();
panel.style().set({
  width: '450px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
panel.add(title);
panel.add(ui.Label('Display layer:',subtitlestyle));
panel.add(selLayer);
panel.add(layerOptionsPanel);
panel.add(instructions);
panel.add(clickedVal);
var charts = ui.Panel();
charts.style().set({
  backgroundColor: bgColor,
  margin:'0px'
});
panel.add(charts);
mapPanel.add(meltL);
mapPanel.setOptions("HYBRID");
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
  charts.clear();
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  latlon.setValue('Lat: '+coords.lat.toFixed(5)+', Lon: '+coords.lon.toFixed(5));
  var meltval = melt.unmask().reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('b1').getInfo();
  var freezeval = freeze.unmask().reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('b1').getInfo();
  if(meltval === 0){phen.setValue('Non-freezing permanent water');}
  else if(meltval>12.5){phen.setValue('');}
  else{phen.setValue('melt month: '+ meltval +', freeze month: '+freezeval);}
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(1, dot);
  //print(months)
  months = months.rename(['01','02','03','04','05','06','07','08','09','10','11','12'])
  var chart = ui.Chart.image.series(monthseries(months),point,null,5,'Month').setSeriesNames(['land','water','ice','shoulder ice'])
    .setOptions({min:0, max:1,colors:[mclasspal[0],mclasspal[1],mclasspal[3],mclasspal[4]],bar: {groupWidth: '100%'},isStacked:'relative',vAxis: {ticks: [{v:0,f:''},{v:1,f:''}]},backgroundColor: bgColor})
    .setChartType('ColumnChart');
  chart.style().set({'stretch': 'horizontal',margin:'0px'});
      //print(chart)
  charts.add(chart);
}
function monthseries(i){
  i = i.selfMask();
  var col = ee.ImageCollection([]);
  for(var m=1; m<=12;m++){
    var monthName = ('0' + m).slice(-2);
    var cm = i.select(monthName)
    col = col.merge(ee.ImageCollection([ee.Image([cm.eq(1),cm.eq(2).or(cm.eq(3)),cm.eq(4).or(cm.eq(3)),cm.eq(5)]).rename(['1','2','3','4']).set('system:time_start',ee.Date('2019-'+monthName+'-15')).set('Month',monthName)]))
  }
  return col;
}