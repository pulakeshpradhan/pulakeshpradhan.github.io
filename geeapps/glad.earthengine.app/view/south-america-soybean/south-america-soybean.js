var image = ui.import && ui.import("image", "image", {
      "id": "projects/glad/soy_annual_SA/2001"
    }) || ee.Image("projects/glad/soy_annual_SA/2001"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "projects/glad/soy_annual_SA/2002"
    }) || ee.Image("projects/glad/soy_annual_SA/2002"),
    soy = ui.import && ui.import("soy", "imageCollection", {
      "id": "projects/glad/soy_annual_SA"
    }) || ee.ImageCollection("projects/glad/soy_annual_SA"),
    gfc = ui.import && ui.import("gfc", "image", {
      "id": "UMD/hansen/global_forest_change_2022_v1_10"
    }) || ee.Image("UMD/hansen/global_forest_change_2022_v1_10");
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
var bgColor = '#F7F7FA';//#F8F9FA';
var subtitlestyle = {color: '#555555', fontWeight: 'bold', fontSize: '16px', backgroundColor:bgColor,margin:'16px 8px 4px'}
var endyear=2023;
var endval=endyear-2000;
var N =soy.size().getInfo();
var visF={min:1,max:endval,palette:["#FFFFCCFF","#FFEDA0FF","#FED976FF","#FEB24CFF","#FD8D3CFF","#FC4E2AFF","#E31A1CFF","#BD0026FF","#800026FF"]}
var visN = {min:1,max:N,palette:["#081D58FF","#253494FF","#225EA8FF","#1D91C0FF","#41B6C4FF","#7FCDBBFF","#C7E9B4FF","#EDF8B1FF","#FFFFD9FF"]}
var Nyears = soy.reduce('sum').selfMask();
//.map(function (l){return l.toString();})
var years = ee.List.sequence(2001,endyear).getInfo().map(function (l){return l.toString();});//['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022']
var soyI = soy.toBands().unmask().rename(years);
var first = soyI.select(0)
for(var yr=2002;yr<=endyear;yr++){
  first = first.where(first.eq(0).and(soyI.select(yr+'')),yr-2000)
}
var soyinforest = first.updateMask(gfc.select('loss').gt(0).and(Nyears.gt(0)))//ee.Image('projects/glad/soy_firstYearForest');//gfc.select('lossyear').gt(0).and(Nyears.gt(0));
var percentsoysincefirst = Nyears.divide(ee.Image(N).subtract(first).add(1)).multiply(100)
//layers
var firstL = ui.Map.Layer(first.selfMask(),visF,'first year')
var firstforestL = ui.Map.Layer(soyinforest,visF,'first year in forest')
var NyearsL = ui.Map.Layer(Nyears.selfMask(),visN,'Nyears')
var percentyearsL = ui.Map.Layer(percentsoysincefirst,{min:0,max:100,palette:["#081D58FF","#253494FF","#225EA8FF","#1D91C0FF","#41B6C4FF","#7FCDBBFF","#C7E9B4FF","#EDF8B1FF","#FFFFD9FF"]},'percent of years')
var annualL = ui.Map.Layer(soyI.selfMask(),{bands:[endyear.toString()],min:0,max:1},'annual')
// Create the color bars for the legends.
function makeColorBarParams(palette){return {bbox: [0, 0, 1, 100],dimensions: '15x150',format: 'png',min: 0,max: 1,palette: palette,};}
var firstYearcolorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').divide(100),
  params: makeColorBarParams(["#FFFFCCFF","#FFEDA0FF","#FED976FF","#FEB24CFF","#FD8D3CFF","#FC4E2AFF","#E31A1CFF","#BD0026FF","#800026FF"]),
    style: {stretch: 'vertical', margin: '8px 0px 8px 8px', height: '100px', width: '15px'},
}); 
var legendLabelsYear = ui.Panel({
  widgets: [ui.Label(endyear.toString(), {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label('...',{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label('2001', {margin: '0px 4px', backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor, stretch: 'vertical'}
});
var legendPanelYear = ui.Panel([firstYearcolorBar, legendLabelsYear],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var NyearscolorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select('latitude').divide(100),
  params: makeColorBarParams(["#081D58FF","#253494FF","#225EA8FF","#1D91C0FF","#41B6C4FF","#7FCDBBFF","#C7E9B4FF","#EDF8B1FF","#FFFFD9FF"]),
    style: {stretch: 'vertical', margin: '8px 0px 8px 8px', height: '100px', width: '15px'},
}); 
var legendLabelsNumber = ui.Panel({
  widgets: [ui.Label(N, {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label('...',{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label('1', {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendPanelNumber = ui.Panel([NyearscolorBar, legendLabelsNumber],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor});
var legendLabelsPercent = ui.Panel({
  widgets: [ui.Label('100%', {margin: '1px 4px 80px',backgroundColor: bgColor}),
    //ui.Label('...',{margin: '0px 4px 32px', textAlign: 'center', stretch: 'vertical',backgroundColor: bgColor}),
    ui.Label('0%', {margin: '0px 4px',backgroundColor: bgColor})],
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor: bgColor}
});
var legendPanelPercent = ui.Panel([ui.Label('Calculated as the percent of years that have soy from the first year with soy through '+endyear+'.',{backgroundColor: bgColor,whiteSpace:'pre-line'})
  ,ui.Panel([NyearscolorBar, legendLabelsPercent],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor})],ui.Panel.Layout.flow({direction:'vertical',wrap:true}),{backgroundColor: bgColor});
ui.Label('Calculated as the percent of years that have soy from the first year with soy through '+endyear+'.',{backgroundColor: bgColor,whiteSpace:'pre-line'})//: \n(number of years with soy from the first year with soy through 2020)/(2020 - first year with soy)
//ui.Panel([ui.Label('Calculated as percent of years with soy since first year with soy (number of years with soy from the first year with soy through 2020)/(2020 - first year with soy)',{backgroundColor: bgColor,whiteSpace:'pre'})],ui.Panel.Layout.flow({direction:'vertical',wrap:true}),{backgroundColor: bgColor,whiteSpace:'normal'});
//legendPanelPercent = legendPanelPercent.add(ui.Panel([NyearscolorBar, legendLabelsPercent],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}))
//print(legendPanelPercent.getLayout())
var selYear = ui.Select({items: years, 
    placeholder: endyear.toString(),
    onChange: function(lyr){
      annualL = annualL.setVisParams({bands:[lyr], min:0, max:1});
    }});
var images = {
  'First year with soy': firstL,
  'First year with soy within 2000-2022 forest loss': firstforestL,
  'Number of years of soy': NyearsL,
  'Interannual intensity': percentyearsL,
  'Year': annualL,
}
var layerOptions = {
  'First year with soy': legendPanelYear,
  'First year with soy within 2000-2022 forest loss': legendPanelYear,
  'Number of years of soy': legendPanelNumber,
  'Interannual intensity': legendPanelPercent,
  'Year': ui.Panel([ui.Label('Select year:',{backgroundColor: bgColor}),selYear], 'flow',{backgroundColor: bgColor})
  };
var layerOptionsPanel = ui.Panel([legendPanelYear],'flow',{backgroundColor: bgColor});
var selLayer = ui.Select({items: Object.keys(images),//], 
      placeholder: Object.keys(images)[0],
      onChange: function(lyr){
      mapPanel.layers().set(0,images[lyr]);
      //var last = layerOptionsPanel.widgets().get(0).widgets().length();
      //layerOptionsPanel.widgets().get(0).widgets().get(last).clear()
      //layerOptionsPanel.widgets().get(last).clear()
      layerOptionsPanel.clear();
      layerOptionsPanel.add(layerOptions[lyr]);
    }});
var title = ui.Panel([//ui.Thumbnail(ee.Image('users/ahudson2/gladLogo'),{dimensions:'50', bands:['b1','b2','b3']}),
  ui.Label({
    value: 'Soybean expansion in South America 2001-'+endyear+', v1.0',
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}
  }),
  ui.Label("X.-P. Song, M.C. Hansen, P. Potapov, B. Adusei, J. Pickering, M. Adami, A. Lima, V. Zalles, S.V. Stehman, C.M. Di Bella, C.M. Cecilia, E.J. Copati, L.B. Fernandes, A. Hernandez-Serna, S.M. Jantz, A.H. Pickens, S. Turubanova, A. Tyukavina (2021).",{margin: '8px 0px 8px 8px',backgroundColor: bgColor}),
  ui.Label("https://doi.org/10.1038/s41893-021-00729-z",{backgroundColor: bgColor, margin: '0px 0px 8px 8px'},"https://doi.org/10.1038/s41893-021-00729-z"),
  ui.Panel([ui.Label("A prominent goal of policies mitigating climate change and biodiversity loss is to achieve zero-deforestation in the global supply chain of key commodities, such as palm oil and soybean. However, the extent and dynamics of deforestation driven by commodity expansion are largely unknown. Here we mapped annual soybean expansion in South America between 2000 and 2019 by combining satellite observations and sample field data. From 2000-2019, the area cultivated with soybean more than doubled from 26.4 Mha to 55.1 Mha. Most soybean expansion occurred on pastures originally converted from natural vegetation for cattle production. The most rapid expansion occurred in the Brazilian Amazon, where soybean area increased more than 10-fold, from 0.4 Mha to 4.6 Mha. Across the continent, 9% of forest loss was converted to soybean by 2016. Soy-driven deforestation was concentrated at the active frontiers, nearly half located in the Brazilian Cerrado. Efforts to limit future deforestation must consider how soybean expansion may drive deforestation indirectly by displacing pasture or other land uses. Holistic approaches that track land use across all commodities coupled with vegetation monitoring are required to maintain critical ecosystem services. The dataset has been updated through "+endyear+".",{backgroundColor: bgColor}),
    //ui.Label("Global Ecosystem Dynamics Investigation (GEDI)",{backgroundColor: bgColor},"gedi.umd.edu"),
    //ui.Label("lidar forest structure measurements and",{backgroundColor: bgColor}),
    //ui.Label("Landsat analysis-ready data time-series",{backgroundColor: bgColor},"https://glad.geog.umd.edu/ard/home"),
    //ui.Label(". The GEDI RH95 (relative height at 95%) metric was used to calibrate the model. The Landsat multi-temporal metrics that represent the surface phenology serve as the independent variables. The “moving window” locally calibrated and applied regression tree ensemble model was implemented to ensure high quality of forest height prediction and global map consistency. The model was extrapolated in the boreal regions (beyond the GLAD data range, 52°N to 52°S) to create the global forest height prototype map.",{backgroundColor: bgColor})
  ],'flow',{backgroundColor: bgColor,whiteSpace:'normal'}),
  ui.Panel([ui.Label("Data download:",{backgroundColor: bgColor,margin: '8px 4px 4px 8px'}),
            ui.Label("https://glad.umd.edu",{backgroundColor: bgColor, margin: '8px 0px 4px'},
                     "https://glad.umd.edu/projects/commodity-crop-mapping-and-monitoring-south-america")],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}),
  ui.Label('Earth Engine Image Collection: \'projects/glad/soy_annual_SA\'',{backgroundColor: bgColor})
],'flow',{backgroundColor: bgColor});
var instructions = ui.Panel([ui.Label("Click for soy time-series:",subtitlestyle)],'flow',{backgroundColor: bgColor});
// Create panels to hold lon/lat values.
var latlon = ui.Label('',{margin: '4px 10px',backgroundColor: bgColor});
var clickedVal = ui.Panel([latlon], ui.Panel.Layout.flow('vertical'),{margin: '4px', backgroundColor: bgColor});
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),-20).getInfo();//can replace -9.98 with wherever you would like the default lat to be
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),-60).getInfo();//change default long
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),5).getInfo();//change default zoom
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
  backgroundColor: bgColor
});
panel.add(charts);
mapPanel.add(firstL);
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
  var intsval = soyI.unmask().reduce('sum').reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('sum').getInfo();
  // Add a red dot for the point clicked on.
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'clicked location');
  mapPanel.layers().set(1, dot);
  var chart = ui.Chart.image.regions(soyI.unmask(),point,null,5)
    .setOptions({min:0, max:1,colors:['#444444'],bar: {groupWidth: '100%'},vAxis: {ticks: [{v:0,f:''},{v:1,f:'soy'}]},legend:{position:'none'}})
    .setChartType('ColumnChart');
  chart.style().set({'stretch': 'horizontal',margin:'0px'});
  charts.add(chart);
}