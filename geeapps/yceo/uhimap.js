//######################################################################################################## 
//#                                                                                                    #\\
//#                               Global Surface UHI Explorer Version 5                                #\\
//#                                                                                                    #\\
//########################################################################################################
// date: 2018-11-29 (updated: 2022-10-23)
// authors: TC Chakraborty | tc.chakraborty@pnnl.gov | https://tc25.github.io/
// website: https://yceo.users.earthengine.app/view/uhimap
// Web app version 6, but dataset version 5
// Create default map for the app
var map = ui.Map() 
// Set visibility options to remove geometry creator and layer list
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: true, fullscreenControl: false})
//map.setControlVisibility({maxZoom: 5});
ui.root.clear()
//Add custom map 
ui.root.add(map)
//Load Landscan dataset
var urb=ee.FeatureCollection('users/yceo/urban_Schneider_final_paper_vfF');
//Create basemap
var GRAY = [
  {   // Dial down the map saturation. 
    stylers: [ { invert_lightness:true } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 0 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
//Change base map
map.setOptions('Base', {'Base': GRAY});
/*Import MODIS land use and land cover data for 2013 and select the 1st land cover classification type 
(International Geosphere‑Biosphere Programme classification)*/
//var landcover2015=ee.Image('users/tirthankarchakraborty/GOBLandcover1992_2015').select('b24');
/*select all image pixels which represent urban and built up land cover*/
//var urbanurban=landcover2015.eq(190);
// Create layer selector
//var selectionpanel = ui.Panel({style: {width: '250px',position: 'bottom-right'}});
//Load annual means data
var UHI_yearly=ee.Image('projects/ee-yceo/assets/UHI_yearly_v5')
//print(UHI_yearly)
//Input all annual means
//Keep the band names same to get a line chart; otherwise, you will get separate points 
var Day2003 = UHI_yearly.select(['daytime_UHI_2003'],['Daytime']).set( 'system:time_start','2003','system:time_end','2003')
var Night2003 = UHI_yearly.select(['nighttime_UHI_2003'],['Nighttime']).set( 'system:time_start','2003','system:time_end','2003')
var Day2004 = UHI_yearly.select(['daytime_UHI_2004'],['Daytime']).set( 'system:time_start','2004','system:time_end','2004')
var Night2004 = UHI_yearly.select(['nighttime_UHI_2004'],['Nighttime']).set( 'system:time_start','2004','system:time_end','2004')
var Day2005 = UHI_yearly.select(['daytime_UHI_2005'],['Daytime']).set( 'system:time_start','2005','system:time_end','2005')
var Night2005 = UHI_yearly.select(['nighttime_UHI_2005'],['Nighttime']).set( 'system:time_start','2005','system:time_end','2005') 
var Day2006 = UHI_yearly.select(['daytime_UHI_2006'],['Daytime']).set( 'system:time_start','2006','system:time_end','2006')
var Night2006 = UHI_yearly.select(['nighttime_UHI_2006'],['Nighttime']).set( 'system:time_start','2006','system:time_end','2006')
var Day2007 = UHI_yearly.select(['daytime_UHI_2007'],['Daytime']).set( 'system:time_start','2007','system:time_end','2007') 
var Night2007 = UHI_yearly.select(['nighttime_UHI_2007'],['Nighttime']).set( 'system:time_start','2007','system:time_end','2007')
var Day2008 = UHI_yearly.select(['daytime_UHI_2008'],['Daytime']).set( 'system:time_start','2008','system:time_end','2008')
var Night2008 = UHI_yearly.select(['nighttime_UHI_2008'],['Nighttime']).set( 'system:time_start','2008','system:time_end','2008')
var Day2009 = UHI_yearly.select(['daytime_UHI_2009'],['Daytime']).set( 'system:time_start','2009','system:time_end','2009')
var Night2009 = UHI_yearly.select(['nighttime_UHI_2009'],['Nighttime']).set( 'system:time_start','2009','system:time_end','2009')
var Day2010 = UHI_yearly.select(['daytime_UHI_2010'],['Daytime']).set( 'system:time_start','2010','system:time_end','2010')
var Night2010 = UHI_yearly.select(['nighttime_UHI_2010'],['Nighttime']).set( 'system:time_start','2010','system:time_end','2010')
var Day2011 = UHI_yearly.select(['daytime_UHI_2011'],['Daytime']).set( 'system:time_start','2011','system:time_end','2011')
var Night2011 = UHI_yearly.select(['nighttime_UHI_2011'],['Nighttime']).set( 'system:time_start','2011','system:time_end','2011')
var Day2012 = UHI_yearly.select(['daytime_UHI_2012'],['Daytime']).set( 'system:time_start','2012','system:time_end','2012')
var Night2012 = UHI_yearly.select(['nighttime_UHI_2012'],['Nighttime']).set( 'system:time_start','2012','system:time_end','2012')
var Day2013 = UHI_yearly.select(['daytime_UHI_2013'],['Daytime']).set( 'system:time_start','2013','system:time_end','2013')
var Night2013 = UHI_yearly.select(['nighttime_UHI_2013'],['Nighttime']).set( 'system:time_start','2013','system:time_end','2013')
var Day2014 = UHI_yearly.select(['daytime_UHI_2014'],['Daytime']).set( 'system:time_start','2014','system:time_end','2014')
var Night2014 = UHI_yearly.select(['nighttime_UHI_2014'],['Nighttime']).set( 'system:time_start','2014','system:time_end','2014')
var Day2015 = UHI_yearly.select(['daytime_UHI_2015'],['Daytime']).set( 'system:time_start','2015','system:time_end','2015')
var Night2015 = UHI_yearly.select(['nighttime_UHI_2015'],['Nighttime']).set( 'system:time_start','2015','system:time_end','2015')
var Day2016 = UHI_yearly.select(['daytime_UHI_2016'],['Daytime']).set( 'system:time_start','2016','system:time_end','2016')
var Night2016 = UHI_yearly.select(['nighttime_UHI_2016'],['Nighttime']).set( 'system:time_start','2016','system:time_end','2016')
var Day2017 = UHI_yearly.select(['daytime_UHI_2017'],['Daytime']).set( 'system:time_start','2017','system:time_end','2017')
var Night2017 = UHI_yearly.select(['nighttime_UHI_2017'],['Nighttime']).set( 'system:time_start','2017','system:time_end','2017')
var Day2018 = UHI_yearly.select(['daytime_UHI_2018'],['Daytime']).set( 'system:time_start','2018','system:time_end','2018')
var Night2018 = UHI_yearly.select(['nighttime_UHI_2018'],['Nighttime']).set( 'system:time_start','2018','system:time_end','2018')
var Day2019 = UHI_yearly.select(['daytime_UHI_2019'],['Daytime']).set( 'system:time_start','2019','system:time_end','2019')
var Night2019 = UHI_yearly.select(['nighttime_UHI_2019'],['Nighttime']).set( 'system:time_start','2019','system:time_end','2019')
var Day2020 = UHI_yearly.select(['daytime_UHI_2020'],['Daytime']).set( 'system:time_start','2020','system:time_end','2020')
var Night2020 = UHI_yearly.select(['nighttime_UHI_2020'],['Nighttime']).set( 'system:time_start','2020','system:time_end','2020')
//Create  Image collection of annual means
var UHItime=ee.ImageCollection([Day2003.addBands(Night2003), Day2004.addBands(Night2004), Day2005.addBands(Night2005),
Day2006.addBands(Night2006), Day2007.addBands(Night2007), Day2008.addBands(Night2008), Day2009.addBands(Night2009),
Day2010.addBands(Night2010), Day2011.addBands(Night2011), Day2012.addBands(Night2012), Day2013.addBands(Night2013)
, Day2014.addBands(Night2014), Day2015.addBands(Night2015), Day2016.addBands(Night2016), Day2017.addBands(Night2017), Day2018.addBands(Night2018)
, Day2019.addBands(Night2019), Day2020.addBands(Night2020)]);
/*Import the images containing the 16-year mean values of daytime LST and nighttime LST, which you previously exported*/
var AllUHI=ee.Image('projects/ee-yceo/assets/UHI_all_seasons_v5')
//print(AllUHI)
//var AllUHI_1km=ee.Image('users/yceo/UHI_all_seasons_vfF')
//print(AllUHI_1km)
//Load monthly data image
var UHI_monthly=ee.Image('users/tirthankarchakraborty/UHI_monthly_v4');
//Input monthly means
var DayJan = UHI_monthly.select(['Jan_day_UHI'],['Daytime']).set( 'system:time_start',1041394353000,'system:time_end',1041394353000).set('Month', 'Jan');
var NightJan = UHI_monthly.select(['Jan_night_UHI'],['Nighttime']).set( 'system:time_start',1041394353000,'system:time_end',1041394353000).set('Month', 'Jan');
var DayFeb = UHI_monthly.select(['Feb_day_UHI'],['Daytime']).set( 'system:time_start',1044142753000,'system:time_end',1044142753000).set('Month', 'Feb'); 
var NightFeb = UHI_monthly.select(['Feb_night_UHI'],['Nighttime']).set( 'system:time_start',1044142753000,'system:time_end',1044142753000).set('Month', 'Feb'); 
var DayMar = UHI_monthly.select(['Mar_day_UHI'],['Daytime']).set( 'system:time_start',1046561953000,'system:time_end',1046561953000).set('Month', 'Mar'); 
var NightMar = UHI_monthly.select(['Mar_night_UH'],['Nighttime']).set( 'system:time_start',1046561953000,'system:time_end',1046561953000).set('Month', 'Mar'); 
var DayApr = UHI_monthly.select(['Apr_day_UHI'],['Daytime']).set( 'system:time_start',1049240353000,'system:time_end',1049240353000).set('Month', 'Apr'); 
var NightApr = UHI_monthly.select(['Apr_night_UHI'],['Nighttime']).set( 'system:time_start',1049240353000,'system:time_end',1049240353000).set('Month', 'Apr'); 
var DayMay = UHI_monthly.select(['May_day_UHI'],['Daytime']).set( 'system:time_start',1051828753000,'system:time_end',1051828753000).set('Month', 'May'); 
var NightMay = UHI_monthly.select(['May_night_UHI'],['Nighttime']).set( 'system:time_start',1051828753000,'system:time_end',1051828753000).set('Month', 'May'); 
var DayJun = UHI_monthly.select(['Jun_day_UHI'],['Daytime']).set( 'system:time_start',1054507153000,'system:time_end',1054507153000).set('Month', 'Jun');
var NightJun = UHI_monthly.select(['Jun_night_UHI'],['Nighttime']).set( 'system:time_start',1054507153000,'system:time_end',1054507153000).set('Month', 'Jun'); 
var DayJul = UHI_monthly.select(['Jul_day_UHI'],['Daytime']).set( 'system:time_start',1057099153000,'system:time_end',1057099153000).set('Month', 'Jul'); 
var NightJul = UHI_monthly.select(['Jul_night_UHI'],['Nighttime']).set( 'system:time_start',1057099153000,'system:time_end',1057099153000).set('Month', 'Jul'); 
var DayAug = UHI_monthly.select(['Aug_day_UHI'],['Daytime']).set( 'system:time_start',1059777553000,'system:time_end',1059777553000).set('Month', 'Aug'); 
var NightAug = UHI_monthly.select(['Aug_night_UHI'],['Nighttime']).set( 'system:time_start',1059777553000,'system:time_end',1059777553000).set('Month', 'Aug'); 
var DaySep = UHI_monthly.select(['Sep_day_UHI'],['Daytime']).set( 'system:time_start',1062455953000,'system:time_end',1062455953000).set('Month', 'Sep'); 
var NightSep = UHI_monthly.select(['Sep_night_UHI'],['Nighttime']).set( 'system:time_start',1062455953000,'system:time_end',1062455953000).set('Month', "Sep"); 
var DayOct = UHI_monthly.select(['Oct_day_UHI'],['Daytime']).set( 'system:time_start',1065047953000,'system:time_end',1065047953000).set('Month', "Oct"); 
var NightOct = UHI_monthly.select(['Oct_night_UHI'],['Nighttime']).set( 'system:time_start',1065047953000,'system:time_end',1065047953000).set('Month', 'Oct'); 
var DayNov = UHI_monthly.select(['Nov_day_UHI'],['Daytime']).set( 'system:time_start',1067729953000,'system:time_end',1067729953000).set('Month', 'Nov'); 
var NightNov = UHI_monthly.select(['Nov_night_UHI'],['Nighttime']).set( 'system:time_start',1067729953000,'system:time_end',1067729953000).set('Month', 'Nov'); 
var DayDec = UHI_monthly.select(['Dec_day_UHI'],['Daytime']).set( 'system:time_start',1070321953000,'system:time_end',1070321953000).set('Month', 'Dec'); 
var NightDec = UHI_monthly.select(['Dec_night_UHI'],['Nighttime']).set( 'system:time_start',1070321953000,'system:time_end',1070321953000).set('Month', 'Dec'); 
//Create image collection
var UHImonth=ee.ImageCollection([DayJan.addBands(NightJan), DayFeb.addBands(NightFeb), DayMar.addBands(NightMar), 
DayApr.addBands(NightApr), DayMay.addBands(NightMay), DayJun.addBands(NightJun), DayJul.addBands(NightJul), 
DayAug.addBands(NightAug), DaySep.addBands(NightSep), DayOct.addBands(NightOct), DayNov.addBands(NightNov), 
DayDec.addBands(NightDec)])
//Create function to create a panel
function panelcreate() {
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Global Surface UHI Explorer',
    style: {fontSize: '1.4vw', fontWeight: 'bold'}
  }),
  ui.Label({
    value:'This app displays surface urban heat islands (SUHI) at a global scale from 2003 to 2020. Use the search bar or pan over the map to find your urban cluster of interest. Click anywhere within the boundary of an urban cluster, and the cluster mean statistics will be listed in the space below. You also have the option to subset and download the gridded SUHI intensity rasters for the selected urban cluster at the bottom of the panel.',
    style: {fontSize: '.9vw', fontWeight: 'normal', textAlign: 'left'}
})
]);
panel.add(intro);
}
 function downloadoptioncreate(roi){
   //Following parts modified from the stratify app by Charlie Bettigole and Sabrina Szeto
 var exportimagefun = function () {
              var export_annual = UHI_yearly_1km.unmask(-999).clip(roi.geometry()).getDownloadURL({
                      region: JSON.stringify(roi.geometry().bounds().getInfo()),
                      name: 'Annual_gridded_UHI_data', 
                      crs: 'EPSG:4326', 
                      scale: 1000})
             var export_summer = Summer_UHI_yearly_1km.unmask(-999).clip(roi.geometry()).getDownloadURL({
                      region: JSON.stringify(roi.geometry().bounds().getInfo()),
                      name: 'Summertime_gridded_UHI_data', 
                      crs: 'EPSG:4326', 
                      scale: 1000})
              var export_winter = Winter_UHI_yearly_1km.unmask(-999).clip(roi.geometry()).getDownloadURL({
                      region: JSON.stringify(roi.geometry().bounds().getInfo()),
                      name: 'Wintertime_gridded_UHI_data', 
                      crs: 'EPSG:4326', 
                      scale: 1000})
               var link = ui.Chart(
                        [
                          ['Download data'],
                          ['<a target="_blank" href='+export_annual+'>' +
                           'Annual means</a>'],
                          ['<a target="_blank" href='+export_summer+'>' +
                           'Summertime means</a>'],
                           ['<a target="_blank" href='+export_winter+'>' +
                           'Wintertime means</a>']
                        ],
                        'Table', {allowHtml: true});
                    var linkPanel = ui.Panel([link], ui.Panel.Layout.Flow('vertical'));
              panel.add(linkPanel)//.add(printout).add(printout2)
              panel.remove(exportimage)
              }
var exportimage = ui.Button({
  label:"Export yearly images for urban cluster",
  style: {stretch: 'horizontal', fontSize: '.9vw'},
  onClick:exportimagefun
  });
panel.add(exportimage)
 }
//Function to create reference
function referencecreate(){
  // Create a hyperlink to an external reference.
//  var link1 = ui.Chart(
//    [
//      ['Click '+'<a target="_blank" href=https://yceo.yale.edu/research/global-surface-uhi-explorer>' +
//       'here</a>'+' to view methodological details.']
//    ],
//    'Table', {allowHtml: true});
//var reference1 = ui.Panel([link1], ui.Panel.Layout.Flow('vertical'));
 var reference1=ui.Label({value:'Click here to read methodological details',style: {color: 'black',fontWeight: 'bold', textAlign: 'center'},targetUrl:'https://yceo.yale.edu/research/global-surface-uhi-explorer'}) 
  //padding:'1vmin 3.5vmin 1vmin 3.5vmin'
  //border:'.5vmin solid black'
// var link2 = ui.Chart(
//     [
//       ['Reference'],
//       ['<a target="_blank" href=https://doi.org/10.1016/j.jag.2018.09.015>' +
//       '1. Chakraborty, T., & Lee, X. (2018). "A simplified urban-extent algorithm to characterize surface urban heat islands on a global scale and examine vegetation control on their spatiotemporal variability". International J. Appl. Earth Observ. Geoinform.</a>']
//     ],
//     'Table', {allowHtml: true});
// var reference2 = ui.Panel([link2], 'flow', {width: '99%', height: '50%'});
// Add reference to the panel
panel.add(reference1);
// panel.add(reference2);
}
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
// Add a label to the panel.
inspector.add(ui.Label({value: 'Click on an urban cluster to extract its SUHI statistics',
style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
// Add the panel to the default map.
map.add(inspector);
// Set the default map's cursor to a "crosshair".
map.style().set('cursor', 'crosshair');
// Color labels and palette
var colors = ['#313695','#74add1','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026'];
var Name=["<-1.5","-1.5 to 0","0 to 1.5", "1.5 to 3", "3 to 4.5", "4.5 to 6", "6 to 7.5", ">7.5"];
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set({width: '25%', fontSize: '1vw', fontWeight: 'bold'});
//Call funtion to create panel
panelcreate()
//Create label for paper reference
referencecreate()
map.onClick(function(coords) {
//Clear panel
panel.clear()
// Call the panel creation function again
panelcreate()
referencecreate()
// Create panels to hold lon/lat and UHI values.
var lat = ui.Label();
var lon = ui.Label();
var Dayall=ui.Label();
var Nightall=ui.Label();
var Summerdayall=ui.Label();
var Summernightall=ui.Label();
var Winterdayall=ui.Label();
var Winternightall=ui.Label();
//Add panel
panel.add(ui.Panel([lat, lon], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Dayall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Nightall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Summerdayall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Summernightall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Winterdayall], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Winternightall], ui.Panel.Layout.flow('horizontal')))
// Register a callback on the default map to be invoked when the map is clicked.
  // Add a green boundary encompassing the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var outline = ee.Image().toByte()
                 .paint(ee.Feature(urb.filterBounds(point).first()).geometry(), 2,3); 
var urb_boundary = ui.Map.Layer(outline, {palette: 'FF3333,FF0000,000000,0000FF,32CD32,FFFFFF,FFFF00',  
      max: 3,
      opacity: 0.9});
  var dot = ui.Map.Layer(point, {color: 'red'});    
  map.layers().set(1, dot);
  map.layers().set(2, urb_boundary);
//Clear inspector
  inspector.clear()
  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Loading...', style: {color: 'gray',fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
  //Get region of interest to download data of
// Define a spatial filter, with distance 0 m.
var distFilter = ee.Filter.withinDistance({
  distance: 0,
  leftField: '.geo',
  rightField: '.geo',
  maxError: 1
});
// Define a saveAll join.
var distSaveAll = ee.Join.saveAll({
  matchesKey: 'points',
  measureKey: 'distance'
});
// Apply the join.
var ROI = distSaveAll.apply(urb, point, distFilter)
var ROI = ee.Feature(ROI.first())
//Calculate the UHI values at the points from the images
  var sample = ee.Image(AllUHI).sample(point, 30).first().toDictionary();
  sample.evaluate(function(values) {
    // Add a label with the results from the server.
  // Update the lon/lat panel with values from the click event.
  lat.setValue('Lat: ' + coords.lat.toFixed(2)),
  lon.setValue('Lon: ' + coords.lon.toFixed(2));
  Dayall.setValue('Annual daytime SUHI: ' + values.all_daytime_UHI.toFixed(2) + ' °C');
  Nightall.setValue('Annual nightime SUHI: ' + values.all_nighttime_UHI.toFixed(2) + ' °C');
  Summerdayall.setValue('Summer daytime SUHI: ' + values.summer_daytime_UHI.toFixed(2) + ' °C');
  Summernightall.setValue('Summer nighttime SUHI: ' + values.summer_nighttime_UHI.toFixed(2) + ' °C');
  Winterdayall.setValue('Winter daytime SUHI: ' + values.winter_daytime_UHI.toFixed(2) + ' °C');
  Winternightall.setValue('Winter nighttime SUHI: ' + values.winter_nighttime_UHI.toFixed(2) + ' °C');
  // Clear inspector again and display a new label
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Click on another urban cluster...',
style: {fontSize: '1.7vmin', fontWeight: 'bold', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
  });
    // Create a daytime UHI chart.
  var UHIChart = ui.Chart.image.series(UHItime, point).setChartType('LineChart');
  UHIChart.setOptions({
    title: 'Longterm change of annual SUHI intensity',
      vAxes: {
        0: {
          title: 'Annual daytime SUHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#bd0026', italic: false}
        },
        1: {
          title: 'Annual nighttime SUHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#313695', italic: false}
        }
      },
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 18}, titleTextStyle: {bold: true, italic: false}},
     curveType: 'function',
        colors: ['#bd0026','#313695'],
        lineWidth:3,
  pointSize: 5,
        chartArea: {height: '58%'},
       'tooltip' : {
  trigger: 'none'
},
        series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
      }
  });
  panel.widgets().set(9, UHIChart);
   //Months
//var Months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // Create a monthly daytime UHI chart.
  var mUHIChart = ui.Chart.image.series({imageCollection: UHImonth, region: point}).setChartType('LineChart');
  mUHIChart.setOptions({
    title: 'Seasonal variability of SUHI intensity',
      vAxes: {
        0: {
          title: 'Monthly daytime SUHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#bd0026', italic: false}
        },
        1: {
          title: 'Monthly nighttime SUHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#313695', italic: false}
        }
      },
        hAxis: {title: 'Month', format: "MMM", gridlines: {count: 13}, titleTextStyle: {bold: true, italic: false}},
          colors: ['#bd0026','#313695'],
        lineWidth:3,
  pointSize: 5, curveType: 'function',
       'tooltip' : {
  trigger: 'none'
//  format: "MMM"
},
        chartArea: {height: '62%'},
        series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
        }
      });
   panel.widgets().set(10, mUHIChart);
   downloadoptioncreate(ROI)
});
// Add the panel to the ui.root.
ui.root.insert(1, panel);
var legend = ui.Panel({style: {position: 'bottom-left',width: '115px'}});
function legendcreate()
{
legend.add(ui.Label({ 
  value: "SUHI intensity (°C)",
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0px 0px 0px',
    padding: '0px'
  }
  }))};
  //Call legend creation function
  legendcreate()
// Select images from a collection with a silder.
var UHI_yearly_1km=ee.Image('projects/ee-yceo/assets/UHI_yearly_300_v5')
var Day2003_1km = UHI_yearly_1km.select(['daytime_UHI_2003'],['Daytime']).set( 'system:time_start','2003','system:time_end','2003')
var Night2003_1km = UHI_yearly_1km.select(['nighttime_UHI_2003'],['Nighttime']).set( 'system:time_start','2003','system:time_end','2003')
var Day2004_1km = UHI_yearly_1km.select(['daytime_UHI_2004'],['Daytime']).set( 'system:time_start','2004','system:time_end','2004')
var Night2004_1km = UHI_yearly_1km.select(['nighttime_UHI_2004'],['Nighttime']).set( 'system:time_start','2004','system:time_end','2004')
var Day2005_1km = UHI_yearly_1km.select(['daytime_UHI_2005'],['Daytime']).set( 'system:time_start','2005','system:time_end','2005')
var Night2005_1km = UHI_yearly_1km.select(['nighttime_UHI_2005'],['Nighttime']).set( 'system:time_start','2005','system:time_end','2005') 
var Day2006_1km = UHI_yearly_1km.select(['daytime_UHI_2006'],['Daytime']).set( 'system:time_start','2006','system:time_end','2006')
var Night2006_1km = UHI_yearly_1km.select(['nighttime_UHI_2006'],['Nighttime']).set( 'system:time_start','2006','system:time_end','2006')
var Day2007_1km = UHI_yearly_1km.select(['daytime_UHI_2007'],['Daytime']).set( 'system:time_start','2007','system:time_end','2007') 
var Night2007_1km = UHI_yearly_1km.select(['nighttime_UHI_2007'],['Nighttime']).set( 'system:time_start','2007','system:time_end','2007')
var Day2008_1km = UHI_yearly_1km.select(['daytime_UHI_2008'],['Daytime']).set( 'system:time_start','2008','system:time_end','2008')
var Night2008_1km = UHI_yearly_1km.select(['nighttime_UHI_2008'],['Nighttime']).set( 'system:time_start','2008','system:time_end','2008')
var Day2009_1km = UHI_yearly_1km.select(['daytime_UHI_2009'],['Daytime']).set( 'system:time_start','2009','system:time_end','2009')
var Night2009_1km = UHI_yearly_1km.select(['nighttime_UHI_2009'],['Nighttime']).set( 'system:time_start','2009','system:time_end','2009')
var Day2010_1km = UHI_yearly_1km.select(['daytime_UHI_2010'],['Daytime']).set( 'system:time_start','2010','system:time_end','2010')
var Night2010_1km = UHI_yearly_1km.select(['nighttime_UHI_2010'],['Nighttime']).set( 'system:time_start','2010','system:time_end','2010')
var Day2011_1km = UHI_yearly_1km.select(['daytime_UHI_2011'],['Daytime']).set( 'system:time_start','2011','system:time_end','2011')
var Night2011_1km = UHI_yearly_1km.select(['nighttime_UHI_2011'],['Nighttime']).set( 'system:time_start','2011','system:time_end','2011')
var Day2012_1km = UHI_yearly_1km.select(['daytime_UHI_2012'],['Daytime']).set( 'system:time_start','2012','system:time_end','2012')
var Night2012_1km = UHI_yearly_1km.select(['nighttime_UHI_2012'],['Nighttime']).set( 'system:time_start','2012','system:time_end','2012')
var Day2013_1km = UHI_yearly_1km.select(['daytime_UHI_2013'],['Daytime']).set( 'system:time_start','2013','system:time_end','2013')
var Night2013_1km = UHI_yearly_1km.select(['nighttime_UHI_2013'],['Nighttime']).set( 'system:time_start','2013','system:time_end','2013')
var Day2014_1km = UHI_yearly_1km.select(['daytime_UHI_2014'],['Daytime']).set( 'system:time_start','2014','system:time_end','2014')
var Night2014_1km = UHI_yearly_1km.select(['nighttime_UHI_2014'],['Nighttime']).set( 'system:time_start','2014','system:time_end','2014')
var Day2015_1km = UHI_yearly_1km.select(['daytime_UHI_2015'],['Daytime']).set( 'system:time_start','2015','system:time_end','2015')
var Night2015_1km = UHI_yearly_1km.select(['nighttime_UHI_2015'],['Nighttime']).set( 'system:time_start','2015','system:time_end','2015')
var Day2016_1km = UHI_yearly_1km.select(['daytime_UHI_2016'],['Daytime']).set( 'system:time_start','2016','system:time_end','2016')
var Night2016_1km = UHI_yearly_1km.select(['nighttime_UHI_2016'],['Nighttime']).set( 'system:time_start','2016','system:time_end','2016')
var Day2017_1km = UHI_yearly_1km.select(['daytime_UHI_2017'],['Daytime']).set( 'system:time_start','2017','system:time_end','2017')
var Night2017_1km = UHI_yearly_1km.select(['nighttime_UHI_2017'],['Nighttime']).set( 'system:time_start','2017','system:time_end','2017')
var Day2018_1km = UHI_yearly_1km.select(['daytime_UHI_2018'],['Daytime']).set( 'system:time_start','2018','system:time_end','2018')
var Night2018_1km = UHI_yearly_1km.select(['nighttime_UHI_2018'],['Nighttime']).set( 'system:time_start','2018','system:time_end','2018')
var Day2019_1km = UHI_yearly_1km.select(['daytime_UHI_2019'],['Daytime']).set( 'system:time_start','2019','system:time_end','2019')
var Night2019_1km = UHI_yearly_1km.select(['nighttime_UHI_2019'],['Nighttime']).set( 'system:time_start','2019','system:time_end','2019')
var Day2020_1km = UHI_yearly_1km.select(['daytime_UHI_2020'],['Daytime']).set( 'system:time_start','2020','system:time_end','2020')
var Night2020_1km = UHI_yearly_1km.select(['nighttime_UHI_2020'],['Nighttime']).set( 'system:time_start','2020','system:time_end','2020')
//Create  Image collection of annual means
var UHItime_1km=ee.ImageCollection([Day2003_1km.addBands(Night2003_1km), Day2004_1km.addBands(Night2004_1km), Day2005_1km.addBands(Night2005_1km),
Day2006_1km.addBands(Night2006_1km), Day2007_1km.addBands(Night2007_1km), Day2008_1km.addBands(Night2008_1km), Day2009_1km.addBands(Night2009_1km),
Day2010_1km.addBands(Night2010_1km), Day2011_1km.addBands(Night2011_1km), Day2012_1km.addBands(Night2012_1km), Day2013_1km.addBands(Night2013_1km)
, Day2014_1km.addBands(Night2014_1km), Day2015_1km.addBands(Night2015_1km), Day2016_1km.addBands(Night2016_1km), Day2017_1km.addBands(Night2017_1km),
Day2018_1km.addBands(Night2018_1km),Day2019_1km.addBands(Night2019_1km),Day2020_1km.addBands(Night2020_1km)]);
var UHIdaytime_1km=UHItime_1km.select('Daytime');
var UHInighttime_1km=UHItime_1km.select('Nighttime');
//Same, for summer
// Select images from a collection with a silder.
var Summer_UHI_yearly_1km=ee.Image('projects/ee-yceo/assets/Summer_UHI_yearly_300_v5');
var Summer_Day2003_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2003'],['Summerdaytime']).set( 'system:time_start','2003','system:time_end','2003');
var Summer_Night2003_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2003'],['Summernighttime']).set( 'system:time_start','2003','system:time_end','2003');
var Summer_Day2004_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2004'],['Summerdaytime']).set( 'system:time_start','2004','system:time_end','2004');
var Summer_Night2004_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2004'],['Summernighttime']).set( 'system:time_start','2004','system:time_end','2004');
var Summer_Day2005_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2005'],['Summerdaytime']).set( 'system:time_start','2005','system:time_end','2005');
var Summer_Night2005_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2005'],['Summernighttime']).set( 'system:time_start','2005','system:time_end','2005') ;
var Summer_Day2006_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2006'],['Summerdaytime']).set( 'system:time_start','2006','system:time_end','2006');
var Summer_Night2006_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2006'],['Summernighttime']).set( 'system:time_start','2006','system:time_end','2006');
var Summer_Day2007_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2007'],['Summerdaytime']).set( 'system:time_start','2007','system:time_end','2007') ;
var Summer_Night2007_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2007'],['Summernighttime']).set( 'system:time_start','2007','system:time_end','2007');
var Summer_Day2008_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2008'],['Summerdaytime']).set( 'system:time_start','2008','system:time_end','2008');
var Summer_Night2008_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2008'],['Summernighttime']).set( 'system:time_start','2008','system:time_end','2008');
var Summer_Day2009_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2009'],['Summerdaytime']).set( 'system:time_start','2009','system:time_end','2009');
var Summer_Night2009_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2009'],['Summernighttime']).set( 'system:time_start','2009','system:time_end','2009');
var Summer_Day2010_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2010'],['Summerdaytime']).set( 'system:time_start','2010','system:time_end','2010');
var Summer_Night2010_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2010'],['Summernighttime']).set( 'system:time_start','2010','system:time_end','2010');
var Summer_Day2011_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2011'],['Summerdaytime']).set( 'system:time_start','2011','system:time_end','2011');
var Summer_Night2011_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2011'],['Summernighttime']).set( 'system:time_start','2011','system:time_end','2011');
var Summer_Day2012_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2012'],['Summerdaytime']).set( 'system:time_start','2012','system:time_end','2012');
var Summer_Night2012_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2012'],['Summernighttime']).set( 'system:time_start','2012','system:time_end','2012');
var Summer_Day2013_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2012'],['Summerdaytime']).set( 'system:time_start','2013','system:time_end','2013');
var Summer_Night2013_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2013'],['Summernighttime']).set( 'system:time_start','2013','system:time_end','2013');
var Summer_Day2014_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2014'],['Summerdaytime']).set( 'system:time_start','2014','system:time_end','2014');
var Summer_Night2014_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2014'],['Summernighttime']).set( 'system:time_start','2014','system:time_end','2014');
var Summer_Day2015_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2015'],['Summerdaytime']).set( 'system:time_start','2015','system:time_end','2015');
var Summer_Night2015_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2015'],['Summernighttime']).set( 'system:time_start','2015','system:time_end','2015');
var Summer_Day2016_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2016'],['Summerdaytime']).set( 'system:time_start','2016','system:time_end','2016');
var Summer_Night2016_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2016'],['Summernighttime']).set( 'system:time_start','2016','system:time_end','2016');
var Summer_Day2017_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2017'],['Summerdaytime']).set( 'system:time_start','2017','system:time_end','2017');
var Summer_Night2017_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2017'],['Summernighttime']).set( 'system:time_start','2017','system:time_end','2017')
var Summer_Day2018_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2018'],['Summerdaytime']).set( 'system:time_start','2018','system:time_end','2018');
var Summer_Night2018_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2018'],['Summernighttime']).set( 'system:time_start','2018','system:time_end','2018')
var Summer_Day2019_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2019'],['Summerdaytime']).set( 'system:time_start','2019','system:time_end','2019');
var Summer_Night2019_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2019'],['Summernighttime']).set( 'system:time_start','2019','system:time_end','2019')
var Summer_Day2020_1km = Summer_UHI_yearly_1km.select(['summerdaytime_UHI_2020'],['Summerdaytime']).set( 'system:time_start','2020','system:time_end','2020');
var Summer_Night2020_1km = Summer_UHI_yearly_1km.select(['summernighttime_UHI_2020'],['Summernighttime']).set( 'system:time_start','2020','system:time_end','2020')
//Create  Image collection of annual means
var Summer_UHItime_1km=ee.ImageCollection([Summer_Day2003_1km.addBands(Summer_Night2003_1km), Summer_Day2004_1km.addBands(Summer_Night2004_1km), Summer_Day2005_1km.addBands(Summer_Night2005_1km),
Summer_Day2006_1km.addBands(Summer_Night2006_1km), Summer_Day2007_1km.addBands(Summer_Night2007_1km), Summer_Day2008_1km.addBands(Summer_Night2008_1km), Summer_Day2009_1km.addBands(Summer_Night2009_1km),
Summer_Day2010_1km.addBands(Summer_Night2010_1km), Summer_Day2011_1km.addBands(Summer_Night2011_1km), Summer_Day2012_1km.addBands(Summer_Night2012_1km), Summer_Day2013_1km.addBands(Summer_Night2013_1km)
, Summer_Day2014_1km.addBands(Summer_Night2014_1km), Summer_Day2015_1km.addBands(Summer_Night2015_1km), Summer_Day2016_1km.addBands(Summer_Night2016_1km), Summer_Day2017_1km.addBands(Summer_Night2017_1km),
 Summer_Day2018_1km.addBands(Summer_Night2018_1km), Summer_Day2019_1km.addBands(Summer_Night2019_1km), Summer_Day2020_1km.addBands(Summer_Night2020_1km)]);
var UHIsummerdaytime_1km=Summer_UHItime_1km.select('Summerdaytime');
var UHIsummernighttime_1km=Summer_UHItime_1km.select('Summernighttime');
//Same for winter
// Select images from a collection with a silder.
var Winter_UHI_yearly_1km=ee.Image('projects/ee-yceo/assets/Winter_UHI_yearly_300_v5')
var Winter_Day2003_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2003'],['Winterdaytime']).set( 'system:time_start','2003','system:time_end','2003')
var Winter_Night2003_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2003'],['Winternighttime']).set( 'system:time_start','2003','system:time_end','2003')
var Winter_Day2004_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2004'],['Winterdaytime']).set( 'system:time_start','2004','system:time_end','2004')
var Winter_Night2004_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2004'],['Winternighttime']).set( 'system:time_start','2004','system:time_end','2004')
var Winter_Day2005_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2005'],['Winterdaytime']).set( 'system:time_start','2005','system:time_end','2005')
var Winter_Night2005_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2005'],['Winternighttime']).set( 'system:time_start','2005','system:time_end','2005') 
var Winter_Day2006_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2006'],['Winterdaytime']).set( 'system:time_start','2006','system:time_end','2006')
var Winter_Night2006_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2006'],['Winternighttime']).set( 'system:time_start','2006','system:time_end','2006')
var Winter_Day2007_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2007'],['Winterdaytime']).set( 'system:time_start','2007','system:time_end','2007') 
var Winter_Night2007_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2007'],['Winternighttime']).set( 'system:time_start','2007','system:time_end','2007')
var Winter_Day2008_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2008'],['Winterdaytime']).set( 'system:time_start','2008','system:time_end','2008')
var Winter_Night2008_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2008'],['Winternighttime']).set( 'system:time_start','2008','system:time_end','2008')
var Winter_Day2009_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2009'],['Winterdaytime']).set( 'system:time_start','2009','system:time_end','2009')
var Winter_Night2009_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2009'],['Winternighttime']).set( 'system:time_start','2009','system:time_end','2009')
var Winter_Day2010_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2010'],['Winterdaytime']).set( 'system:time_start','2010','system:time_end','2010')
var Winter_Night2010_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2010'],['Winternighttime']).set( 'system:time_start','2010','system:time_end','2010')
var Winter_Day2011_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2011'],['Winterdaytime']).set( 'system:time_start','2011','system:time_end','2011')
var Winter_Night2011_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2011'],['Winternighttime']).set( 'system:time_start','2011','system:time_end','2011')
var Winter_Day2012_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2012'],['Winterdaytime']).set( 'system:time_start','2012','system:time_end','2012')
var Winter_Night2012_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2012'],['Winternighttime']).set( 'system:time_start','2012','system:time_end','2012')
var Winter_Day2013_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2013'],['Winterdaytime']).set( 'system:time_start','2013','system:time_end','2013')
var Winter_Night2013_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2013'],['Winternighttime']).set( 'system:time_start','2013','system:time_end','2013')
var Winter_Day2014_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2014'],['Winterdaytime']).set( 'system:time_start','2014','system:time_end','2014')
var Winter_Night2014_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2014'],['Winternighttime']).set( 'system:time_start','2014','system:time_end','2014')
var Winter_Day2015_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2015'],['Winterdaytime']).set( 'system:time_start','2015','system:time_end','2015')
var Winter_Night2015_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2015'],['Winternighttime']).set( 'system:time_start','2015','system:time_end','2015')
var Winter_Day2016_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2016'],['Winterdaytime']).set( 'system:time_start','2016','system:time_end','2016')
var Winter_Night2016_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2016'],['Winternighttime']).set( 'system:time_start','2016','system:time_end','2016')
var Winter_Day2017_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2017'],['Winterdaytime']).set( 'system:time_start','2017','system:time_end','2017')
var Winter_Night2017_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2017'],['Winternighttime']).set( 'system:time_start','2017','system:time_end','2017')
var Winter_Day2018_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2018'],['Winterdaytime']).set( 'system:time_start','2018','system:time_end','2018')
var Winter_Night2018_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2018'],['Winternighttime']).set( 'system:time_start','2018','system:time_end','2018')
var Winter_Day2019_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2018'],['Winterdaytime']).set( 'system:time_start','2019','system:time_end','2019')
var Winter_Night2019_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2018'],['Winternighttime']).set( 'system:time_start','2019','system:time_end','2019')
var Winter_Day2020_1km = Winter_UHI_yearly_1km.select(['winterdaytime_UHI_2020'],['Winterdaytime']).set( 'system:time_start','2020','system:time_end','2020')
var Winter_Night2020_1km = Winter_UHI_yearly_1km.select(['winternighttime_UHI_2020'],['Winternighttime']).set( 'system:time_start','2020','system:time_end','2020')
//Create  Image collection of annual means
var Winter_UHItime_1km=ee.ImageCollection([Winter_Day2003_1km.addBands(Winter_Night2003_1km), Winter_Day2004_1km.addBands(Winter_Night2004_1km), Winter_Day2005_1km.addBands(Winter_Night2005_1km),
Winter_Day2006_1km.addBands(Winter_Night2006_1km), Winter_Day2007_1km.addBands(Winter_Night2007_1km), Winter_Day2008_1km.addBands(Winter_Night2008_1km), Winter_Day2009_1km.addBands(Winter_Night2009_1km),
Winter_Day2010_1km.addBands(Winter_Night2010_1km), Winter_Day2011_1km.addBands(Winter_Night2011_1km), Winter_Day2012_1km.addBands(Winter_Night2012_1km), Winter_Day2013_1km.addBands(Winter_Night2013_1km)
, Winter_Day2014_1km.addBands(Winter_Night2014_1km), Winter_Day2015_1km.addBands(Winter_Night2015_1km), Winter_Day2016_1km.addBands(Winter_Night2016_1km), Winter_Day2017_1km.addBands(Winter_Night2017_1km),
 Winter_Day2018_1km.addBands(Winter_Night2018_1km),Winter_Day2019_1km.addBands(Winter_Night2019_1km),Winter_Day2020_1km.addBands(Winter_Night2020_1km)]);
var UHIwinterdaytime_1km=Winter_UHItime_1km.select('Winterdaytime');
var UHIwinternighttime_1km=Winter_UHItime_1km.select('Winternighttime');
// Define some constants.
var SUMMER_DAY_UHI = 'Summer day';
var SUMMER_NIGHT_UHI = 'Summer night';
var WINTER_DAY_UHI = 'Winter day';
var WINTER_NIGHT_UHI = 'Winter night';
var YEARLY_DAY_UHI = 'Annual day';
var YEARLY_NIGHT_UHI = 'Annual night';
var none= "Remove all"
/*Add UHI layers to map to display the 16-year daytime and nightime urban heat islands of the world's 4999 largest cities*/
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [YEARLY_DAY_UHI, YEARLY_NIGHT_UHI, SUMMER_DAY_UHI, SUMMER_NIGHT_UHI, WINTER_DAY_UHI, WINTER_NIGHT_UHI, none],
  value: YEARLY_DAY_UHI,
  onChange: redraw,
});
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}
})).add(select);
function legend_colorbar(text, col){
  var entry
for (var x = 0; x<8; x++){
  entry = [
    ui.Label({style:{color:col[x], margin: '0 0 3px 0'}, value: '████'}),
    ui.Label({
      value: text[x],
      style: {fontSize: '14px',
        margin: '0 0 3px 3px'
      }
    }) 
  ];
  //entry.setValue(entry)
  legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
}
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  var layer = select.getValue();
  if (layer==YEARLY_DAY_UHI)
  {
    // Color labels and palette
colors = ['#313695','#74add1','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']
Name=["<-1.5","-1.5 to 0","0 to 1.5", "1.5 to 3", "3 to 4.5", "4.5 to 6", "6 to 7.5", ">7.5"];
  legend.clear()
  legendcreate()
  slider_panel.clear()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
legend_colorbar(Name, colors);
//Clear legend and create new legend 
// A helper function to show the image for a given year on the default map.
var showLayer_day = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHIdaytime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -1.5,
      max: 7.5,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Daytime SUHI intensity for year', style: {fontSize: '2.0vmin', fontWeight: 'bold'}});  
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_day,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
slider_panel.add(ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
}));
// Set default values on the slider and map.
slider.setValue(2020);
  }
  else if(layer==YEARLY_NIGHT_UHI)  {
//Clear legend and create new legend 
colors = ['#313695','#4575b4','#74add1','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']
Name=["<-2","-2 to -1","-1 to 0", "0 to 1", "1 to 2", "2 to 3", "3 to 4", ">4"];
  legend.clear()
  legendcreate()
  slider_panel.clear()
  legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
  legend_colorbar(Name, colors);
// A helper function to show the image for a given year on the default map.
var showLayer_night = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHInighttime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -2,
      max: 4,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Nighttime SUHI intensity for year',style: {fontSize: '2.0vmin', fontWeight: 'bold'}});
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_night,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
slider_panel.add(ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
}));
// Set default values on the slider and map.
slider.setValue(2020);
  }
   else if(layer==SUMMER_DAY_UHI)  {
colors = ['#313695','#74add1','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']
Name=["<-1.5","-1.5 to 0","0 to 1.5", "1.5 to 3", "3 to 4.5", "4.5 to 6", "6 to 7.5", ">7.5"];
  legend.clear()
  legendcreate()
  slider_panel.clear()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
legend_colorbar(Name, colors);
// A helper function to show the image for a given year on the default map.
var showLayer_day_summer = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHIsummerdaytime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -1.5,
      max: 7.5,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Daytime SUHI intensity for summer of', style: {fontSize: '2.0vmin', fontWeight: 'bold'}});
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_day_summer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
slider_panel.add(ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
}));
// Set default values on the slider and map.
slider.setValue(2020);
  }
    else if(layer==SUMMER_NIGHT_UHI)  {
colors = ['#313695','#4575b4','#74add1','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']
Name=["<-2","-2 to -1","-1 to 0", "0 to 1", "1 to 2", "2 to 3", "3 to 4", ">4"]; 
  legend.clear()
  legendcreate()
  slider_panel.clear()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
legend_colorbar(Name, colors);
// A helper function to show the image for a given year on the default map.
var showLayer_night_summer = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHIsummernighttime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -2,
      max: 4,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Nighttime SUHI intensity for summer of', style: {fontSize: '2.0vmin', fontWeight: 'bold'}});
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_night_summer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
slider_panel.add(ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
}));
// Set default values on the slider and map.
slider.setValue(2020);
  }
      else if(layer==WINTER_DAY_UHI)  {
colors = ['#313695','#4575b4','#74add1','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']
Name=["<-2","-2 to -1","-1 to 0", "0 to 1", "1 to 2", "2 to 3", "3 to 4", ">4"];
 legend.clear()
  legendcreate()
  slider_panel.clear()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
legend_colorbar(Name, colors);
// A helper function to show the image for a given year on the default map.
var showLayer_day_winter = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHIwinterdaytime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -2,
      max: 4,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Daytime SUHI intensity for winter of', style: {fontSize: '2.0vmin', fontWeight: 'bold'}});
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_day_winter,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
slider_panel.add(ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
}));
// Set default values on the slider and map.
slider.setValue(2020);
  }
      else if(layer==WINTER_NIGHT_UHI)  {
colors = ['#313695','#4575b4','#74add1','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']
Name=["<-2","-2 to -1","-1 to 0", "0 to 1", "1 to 2", "2 to 3", "3 to 4", ">4"];
 legend.clear()
  legendcreate()
  slider_panel.clear()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
legend_colorbar(Name, colors);
// A helper function to show the image for a given year on the default map.
var showLayer_night_winter = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHIwinternighttime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -2,
      max: 4,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Nighttime SUHI intensity for winter of', style: {fontSize: '2.0vmin', fontWeight: 'bold'}});
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_night_winter,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
slider_panel.add(ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
}));
// Set default values on the slider and map.
slider.setValue(2020);
  }
   else if (layer==none)
   {
     legend.clear()
  legendcreate()
  legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
  slider_panel.clear()
     map.layers().reset();
   }
}
// Invoke the draw function once at start up to initialize the map.
    // Color labels and palette
colors = ['#313695','#74add1','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']
Name=["<-1.5","-1.5 to 0","0 to 1.5", "1.5 to 3", "3 to 4.5", "4.5 to 6", "6 to 7.5", ">7.5"];
  legend.clear()
  legendcreate()
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
legend_colorbar(Name, colors);
//Clear legend and create new legend 
// A helper function to show the image for a given year on the default map.
var showLayer_day = function(year) {
  map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = UHIdaytime_1km.filterDate(dateRange).first();
  map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: -1.5,
      max: 7.5,
      palette:colors,
      opacity:1
    },
    name: String(year)
  });
};
// Create a label and slider.
var slider_label = ui.Label({value: 'Daytime SUHI intensity for year', style: {fontSize: '2.0vmin', fontWeight: 'bold'}});  
var slider = ui.Slider({
  min: 2003,
  max: 2020,
  step: 1,
  onChange: showLayer_day,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.D
var slider_panel = ui.Panel({
  widgets: [slider_label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    padding: '0px',
    width: '45vmin',
    fontSize: '1.1vmin',
     fontWeight: 'bold'
  }
});
// Add the panel to the map.
map.add(slider_panel);
// Set default values on the slider and map.
slider.setValue(2020);
map.add(legend);