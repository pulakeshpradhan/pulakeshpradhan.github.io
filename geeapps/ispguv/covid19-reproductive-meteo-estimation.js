// Create the main map and set the layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
var pkg_vis = require('users/kongdd/public:pkg_vis.js');
//This function adds temporal information to any Image collection
var addmonthyearinfo=function(img){
           var d = ee.Date(ee.Number(img.get('system:time_start')));
           var doy = d.getRelative('day', 'year');
           var m = ee.Number(d.get('month'));
            var y = ee.Number(d.get('year'));
            return img.set({'month':m, 'year':y,'day':doy})
            .resample("bilinear");
           };
//Color palete
var pal =["#0d0887","#100788","#130789","#16078a","#19068c","#1b068d","#1d068e","#20068f","#220690","#240691","#260591","#280592","#2a0593","#2c0594","#2e0595","#2f0596","#310597","#330597","#350498","#370499","#38049a","#3a049a","#3c049b","#3e049c","#3f049c","#41049d","#43039e","#44039e","#46039f","#48039f","#4903a0","#4b03a1","#4c02a1","#4e02a2","#5002a2","#5102a3","#5302a3","#5502a4","#5601a4","#5801a4","#5901a5","#5b01a5","#5c01a6","#5e01a6","#6001a6","#6100a7","#6300a7","#6400a7","#6600a7","#6700a8","#6900a8","#6a00a8","#6c00a8","#6e00a8","#6f00a8","#7100a8","#7201a8","#7401a8","#7501a8","#7701a8","#7801a8","#7a02a8","#7b02a8","#7d03a8","#7e03a8","#8004a8","#8104a7","#8305a7","#8405a7","#8606a6","#8707a6","#8808a6","#8a09a5","#8b0aa5","#8d0ba5","#8e0ca4","#8f0da4","#910ea3","#920fa3","#9410a2","#9511a1","#9613a1","#9814a0","#99159f","#9a169f","#9c179e","#9d189d","#9e199d","#a01a9c","#a11b9b","#a21d9a","#a31e9a","#a51f99","#a62098","#a72197","#a82296","#aa2395","#ab2494","#ac2694","#ad2793","#ae2892","#b02991","#b12a90","#b22b8f","#b32c8e","#b42e8d","#b52f8c","#b6308b","#b7318a","#b83289","#ba3388","#bb3488","#bc3587","#bd3786","#be3885","#bf3984","#c03a83","#c13b82","#c23c81","#c33d80","#c43e7f","#c5407e","#c6417d","#c7427c","#c8437b","#c9447a","#ca457a","#cb4679","#cc4778","#cc4977","#cd4a76","#ce4b75","#cf4c74","#d04d73","#d14e72","#d24f71","#d35171","#d45270","#d5536f","#d5546e","#d6556d","#d7566c","#d8576b","#d9586a","#da5a6a","#da5b69","#db5c68","#dc5d67","#dd5e66","#de5f65","#de6164","#df6263","#e06363","#e16462","#e26561","#e26660","#e3685f","#e4695e","#e56a5d","#e56b5d","#e66c5c","#e76e5b","#e76f5a","#e87059","#e97158","#e97257","#ea7457","#eb7556","#eb7655","#ec7754","#ed7953","#ed7a52","#ee7b51","#ef7c51","#ef7e50","#f07f4f","#f0804e","#f1814d","#f1834c","#f2844b","#f3854b","#f3874a","#f48849","#f48948","#f58b47","#f58c46","#f68d45","#f68f44","#f79044","#f79143","#f79342","#f89441","#f89540","#f9973f","#f9983e","#f99a3e","#fa9b3d","#fa9c3c","#fa9e3b","#fb9f3a","#fba139","#fba238","#fca338","#fca537","#fca636","#fca835","#fca934","#fdab33","#fdac33","#fdae32","#fdaf31","#fdb130","#fdb22f","#fdb42f","#fdb52e","#feb72d","#feb82c","#feba2c","#febb2b","#febd2a","#febe2a","#fec029","#fdc229","#fdc328","#fdc527","#fdc627","#fdc827","#fdca26","#fdcb26","#fccd25","#fcce25","#fcd025","#fcd225","#fbd324","#fbd524","#fbd724","#fad824","#fada24","#f9dc24","#f9dd25","#f8df25","#f8e125","#f7e225","#f7e425","#f6e626","#f6e826","#f5e926","#f5eb27","#f4ed27","#f3ee27","#f3f027","#f2f227","#f1f426","#f1f525","#f0f724","#f0f921"];
// Configure our map with a minimal set of controls.
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-0.37739, 39.46975);  // VLC: 39.46975, -0.37739
mapPanel.centerObject(initialPoint, 6);
// Create the application title bar.
//Map.add(ui.Label(
  //  'Effective reproductive number.', {fontWeight: 'bold', fontSize: '24px'}));
//Function to compute the RH and the Replication
var RH = function(img){
var  res=img.expression(
     '0.263*P*Q/(exp(17.67*(T-273.16)/(T-29.65)))', {
    'T' : img.select('Tair_f_inst'),
    'P' : img.select('Psurf_f_inst'),
    'Q' : img.select('Qair_f_inst'),
    })
    .select([0],['RH']);//I add this to have an understandable name (RH), that's the way to rename the bands
var R = ee.Image(3.011)
    .subtract(ee.Image(0.0233).multiply(img.select('Tair_f_inst').subtract(273.16)))
    .subtract(ee.Image(0.0133).multiply(res))
    .select([0],['R']);
   return img.addBands(res).addBands(R);
};
// R x Urbes
var GHSL = ee.ImageCollection('JRC/GHSL/P2016/SMOD_POP_GLOBE_V1').median();
//Map.addLayer(GHSL, vizGHSL, 'Degree of Urbanization', true);
var masknopeople = GHSL.gt(0);
// Compute RH with the Clausius-Clapeyron formula:
// https://earthscience.stackexchange.com/questions/2360/how-do-i-convert-specific-humidity-to-relative-humidity
// https://gis.stackexchange.com/questions/354296/what-complementary-method-to-reproject-in-a-composite-function-is-necessary
// RH = 26.3 pq (exp(17.67(T-T0)/(T-29.65))^(-1). Assume reference temperature: T0=273.16
// Use a DateSlider to create annual composites of this collection.
//var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// Use the start of the collection and now to bound the slider.
//var start = ee.Image(collection.first()).get('month');
//var end = ee.Date(now).get('month').format();
var start=1;
var end=12;
var now = Date.now()//.get('month').format();
var mes =ee.Date(now).get('month').getInfo();
var nowyear =ee.Date(now).get('year').getInfo();
print(mes)
print(nowyear,'year')
print(start)
//WE are going to create two colctions: 1) with all data from 2019-2020 
//and 2) using 2020 when available and and 2019 if not
//We need to load dinamycally the data depending on user's will
var collection = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
.select(['Tair_f_inst','Psurf_f_inst', 'Qair_f_inst'])
                  .filter(ee.Filter.date('2019-1', '2021-1'))
                  .map(addmonthyearinfo).map(RH).map(function(img){
                                             return img.set('date', img.date().format('YYYY_MM_dd'))
                  });
var collection2 = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
.select(['Tair_f_inst','Psurf_f_inst', 'Qair_f_inst'])
                  .filter(ee.Filter.date('2019-1', '2021-1'))
                  .map(addmonthyearinfo).map(RH);                  
var pkg_trend = require('users/kongdd/public:Math/pkg_trend.js');
var filteredcollection = collection.map(pkg_trend.add_dn(true, 7))
print ('orig ', collection)
var collection3days = pkg_trend.aggregate_prop(filteredcollection, "dn", 'mean');
print ('orig3days',collection3days);                  
var col1lim=(nowyear).toString()+'-'+(mes-1).toString();
var col2limini=(nowyear-1).toString()+'-'+(mes).toString();
var col2limfin=(nowyear-1).toString()+'-12';
//layers.add(compositeLayer, '2017 Composite');
//print(collection.first())
var showMosaic = function(range) {
//var collection2= collection.filterMetadata('month','equals',range).median()
var d = ee.Date(range.start());
var doy = d.getRelative('day', 'year');
var m = ee.Number(d.get('month'));
var y = ee.Number(d.get('year'));
var collection3= ee.Image(collection2.filterMetadata('year','equals',y).filterMetadata('day','equals',doy).mean())//.median()
//var visParams = {bands: ['RH'], min: 0, max:100};
var vis_vi3 = {min: -0.0, max: 3, bands:'R', palette: pal};
var layer = ui.Map.Layer(collection3, vis_vi3,'R map',true);
layers.set(0, layer);
var R3corr       = collection3.select('R').multiply(GHSL.mask(masknopeople).divide(3))
//var layer2 = ui.Map.Layer(R3corr, vis_vi3).setName('R x Urbanization');
var layer2 = ui.Map.Layer(R3corr, vis_vi3,'R x Urbanization',false);
layers.set(1, layer2);
};
// Asynchronously compute the date range and show the slider.
//var mes = ee.DateRange(start, end).evaluate(function(range) {
//var dateSlider = ui.Slider({
  //  min: start,
    //max: end,
    //step: 1,
    //onChange: showMosaic
  //});
// Asynchronously compute the date range and show the slider.
var ini= ee.Image(collection2.first()).date().format();
var now = Date.now();
var fin = ee.Image(collection2.sort('system:time_start',false).first()).date().format();
var di = ee.Date(ini);
var doyi =ee.Number(di.get('day')).getInfo().toString();
var mi = ee.Number(di.get('month')).getInfo().toString();
var yi = ee.Number(di.get('year')).getInfo().toString();
var df = ee.Date(fin);
var doyf =(ee.Number(df.get('day')).getInfo()).toString();
var mf = ee.Number(df.get('month')).getInfo().toString();
var yf = ee.Number(df.get('year')).getInfo().toString();
var dn = ee.Date(now);
var doyn =(ee.Number(df.get('day')).getInfo()-1).toString();
var mn = (ee.Number(df.get('month')).getInfo()).toString();
var yn = ee.Number(df.get('year')).getInfo().toString();
var startdate=yi+'-'+mi+'-'+doyi;
var enddate=yf+'-'+mf+'-'+doyf;
var nowdate='2020-03-19';
//var collectiontemp= collection.filterMetadata('year','equals',y).filterMetadata('day','equals',doy);
//print(collectiontemp.first())
  var dateSlider = ui.DateSlider({
      //start: ini,
      //end: fin,
    start: startdate,
    end: enddate,
    //value: null
   // period: 4,
    onChange: showMosaic
  });
var vis_vi3 = {min: -0.0, max: 3, bands:'R', palette: pal };
var lg_vi3  = pkg_vis.grad_legend(vis_vi3  , 'R', false); 
mapPanel.add(lg_vi3)
//mapPanel.add(ui.Label('Estimated effective reproductive number',{fontSize: '30px', color: 'Black'}) )
// Widgets
//var title = Map.add(ui.Label('R, Effective reproductive number', 
//{fontWeight: 'bold', fontSize: '12px', position: 'bottom-left', color: 'slateGrey'}));
var paneltemp= ui.Panel({style: {width: '20%'}});
// Create side panel and add a header and text
var header = ui.Label('Estimation of the effective reproductive number R of #COVID19',{fontSize: '15px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Implementation of the model in [Wang et al, March 2020] to estimate the effective reproductive number for the transmission of COVID-19 from environmental variables. The model implements the relation R = 3.011 - 0.0233*T - 0.0133*RH, where T refers to air temperature and RH is the relative humidity [Wang et al, March 2020] (updated model in April 3th 2020 paper version). We further show a weighted R index, RW, which accounts for the degree of urbanization, RW=R*DU.',
{fontSize: '11px'});
var text_2 = ui.Label(
'Meteorological data were extracted from the GLDAS-2.1: Global Land Data Assimilation System dataset, which ingests satellite and ground-based observational data products. Spatial resolution is 0.25 arc degrees. The predictive model uses air temperature, available in the GLDAS dataset, and the relative humidity, which is estimated from the specific humidity using the Clausius-Clapeyron formula. For the mask layer map the predictive model outputs is weighted times Urbanization (DU) obtained from the GHSL: Global Human Settlement Layers for the last year available 2016, and is simply aimed to mask out inhabitated areas, giving more weight to R in high density areas.',
{fontSize: '11px'});
var header_disclaim = ui.Label('Disclaimer',{fontSize: '10px', color: 'darkSlateGrey'});
var text_disclaim = ui.Label(
'This application was implemented on the Google Earth Engine by the ISP group, http://isp.uv.es. The application implements the model in [Wang et al, 2020] (updated version in April 3rd 2020), and is only aimed to allow users to assess the claims about meteorological impact on COVID19 spread, and hopefully help modelers and experts in the field to test their hypothesis and models. We are aware of the challenge in modeling spread, in which many confounders are present. The presentation of these maps and curves do not imply the expression of any opinion whatsoever',
{fontSize: '11px'});
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
var header2 = ui.Label('References',{fontSize: '10px', color: 'darkSlateGrey'});
var text_3 = ui.Label(
'Wang, Jingyuan and Tang, Ke and Feng, Kai and Lv, Weifeng, High Temperature and High Humidity Reduce the Transmission of COVID-19 (March 9, 2020). Available at SSRN: https://ssrn.com/abstract=3551767',
{fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2, header_disclaim,text_disclaim, header2, text_3], 'flow', {width: '300px'});
var toolPanelf=paneltemp.add(toolPanel);
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  //mapPanel.layers().set(1, dot);
  mapPanel.layers().set(2, dot)
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(collection3days.select('R'), point, ee.Reducer.first(),10000);
  // Customize the chart.
  sstChart.setOptions({
    title: '',
    vAxis: {title: 'Average R'},
    hAxis: {title: 'Weeks', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'purple',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2,
        curveType: 'function',
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  //Map.layers().set(0, sstChart);
var paneltemp1 = ui.Panel({style: {position: 'bottom-right'}});
var headlat    = ui.Label('Click on the map for a different location',{fontSize: '16px', color: 'purple'});
var descrip    = ui.Label('Actual location:');
paneltemp1.add(ui.Panel(headlat))
.add(sstChart)
var latlon=ui.Panel([descrip, lon, lat], ui.Panel.Layout.flow('horizontal'));
//.widgets().set(3,ui.Panel([descrip, lon, lat], ui.Panel.Layout.flow('horizontal')))
//.add(ui.Panel(sstChart)).add(ui.Panel(headlat)).widgets().set(2, sstChart)
//paneltemp2.add(C
//inspectorPanel
//Map.widgets().set(2, paneltemp1)
mapPanel.widgets().set(2, paneltemp1)
};
var paneltemp3 = ui.Panel({style: {position: 'top-right'}});
var text_4 = ui.Label(
  'Date',
  {fontSize: '16px', color: 'purple'}) 
//mapPanel.add(ui.Panel([text_4, dateSlider.setValue(rango.end())]));
mapPanel.add(paneltemp3.add(ui.Panel([text_4, dateSlider.setValue(nowdate)])));
//mapPanel.add(ui.Panel([paneltemp3, text_4]));
//.add(text_4).add(dateSlider.setValue(4))
// Register a callback on the default map to be invoked when the map is clicked.
//Map.onClick(generateChart);
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// And finally add the panel!
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,toolPanelf))