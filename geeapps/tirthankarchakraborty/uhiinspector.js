var geometry = /* color: #d63000 */ee.Geometry.MultiPoint();
// Create default map for the app
var map = ui.Map()
// Set visibility options to remove geometry creator and layer list
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: true, fullscreenControl: false})
//map.setControlVisibility({maxZoom: 5});
ui.root.clear()
//Add custom map 
ui.root.add(map)
//Load Landscan dataset
var urb=ee.FeatureCollection('users/tirthankarchakraborty/urban_Schneider_final_paper');
//Create basemap
var GRAY = [
  {   // Dial down the map saturation. 
    stylers: [ { saturation: -100 } ]
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
/*Import MODIS land use and land cover data for 2013 and select the 1st land cover classification type (International Geosphere‑Biosphere Programme classification)*/
var landcover2013=ee.Image('MODIS/051/MCD12Q1/2013_01_01').select('Land_Cover_Type_1');
/*select all image pixels which represent urban and built up land cover*/
var urbanurban=landcover2013.eq(13);
// Color labels and palette
var colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#74add1','#4575b4','#313695'].reverse()
var Name=["<0","0 to 1","1 to 2", "2 to 3", "3 to 4", "4 to 5", "5 to 6", ">6"];
/*Import the images containing the 16-year mean values of daytime LST and nighttime LST, which you previously exported*/
var AllUHI=ee.Image('users/tirthankarchakraborty/UHI_all_seasons')
var AllUHI_1km=ee.Image('users/tirthankarchakraborty/UHI_all_seasons_1km')
// Create layer selector
//var selectionpanel = ui.Panel({style: {width: '250px',position: 'bottom-right'}});
//Load annual means data
var UHI_yearly=ee.Image('users/tirthankarchakraborty/UHI_yearly')
//print(UHI_yearly)
//Input all annual means
//Keep the band names same to get a line chart; otherwise, you will get separate points 
var Day2003 = UHI_yearly.select(['a_daytime_UHI'],['Daytime']).set( 'system:time_start','2003','system:time_end','2003')
var Night2003 = UHI_yearly.select(['a_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2003','system:time_end','2003')
var Day2004 = UHI_yearly.select(['b_daytime_UHI'],['Daytime']).set( 'system:time_start','2004','system:time_end','2004')
var Night2004 = UHI_yearly.select(['b_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2004','system:time_end','2004')
var Day2005 = UHI_yearly.select(['c_daytime_UHI'],['Daytime']).set( 'system:time_start','2005','system:time_end','2005')
var Night2005 = UHI_yearly.select(['c_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2005','system:time_end','2005') 
var Day2006 = UHI_yearly.select(['d_daytime_UHI'],['Daytime']).set( 'system:time_start','2006','system:time_end','2006')
var Night2006 = UHI_yearly.select(['d_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2006','system:time_end','2006')
var Day2007 = UHI_yearly.select(['e_daytime_UHI'],['Daytime']).set( 'system:time_start','2007','system:time_end','2007') 
var Night2007 = UHI_yearly.select(['e_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2007','system:time_end','2007')
var Day2008 = UHI_yearly.select(['f_daytime_UHI'],['Daytime']).set( 'system:time_start','2008','system:time_end','2008')
var Night2008 = UHI_yearly.select(['f_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2008','system:time_end','2008')
var Day2009 = UHI_yearly.select(['g_daytime_UHI'],['Daytime']).set( 'system:time_start','2009','system:time_end','2009')
var Night2009 = UHI_yearly.select(['g_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2009','system:time_end','2009')
var Day2010 = UHI_yearly.select(['h_daytime_UHI'],['Daytime']).set( 'system:time_start','2010','system:time_end','2010')
var Night2010 = UHI_yearly.select(['h_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2010','system:time_end','2010')
var Day2011 = UHI_yearly.select(['i_daytime_UHI'],['Daytime']).set( 'system:time_start','2011','system:time_end','2011')
var Night2011 = UHI_yearly.select(['i_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2011','system:time_end','2011')
var Day2012 = UHI_yearly.select(['j_daytime_UHI'],['Daytime']).set( 'system:time_start','2012','system:time_end','2012')
var Night2012 = UHI_yearly.select(['j_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2012','system:time_end','2012')
var Day2013 = UHI_yearly.select(['k_daytime_UHI'],['Daytime']).set( 'system:time_start','2013','system:time_end','2013')
var Night2013 = UHI_yearly.select(['k_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2013','system:time_end','2013')
var Day2014 = UHI_yearly.select(['l_daytime_UHI'],['Daytime']).set( 'system:time_start','2014','system:time_end','2014')
var Night2014 = UHI_yearly.select(['l_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2014','system:time_end','2014')
var Day2015 = UHI_yearly.select(['m_daytime_UHI'],['Daytime']).set( 'system:time_start','2015','system:time_end','2015')
var Night2015 = UHI_yearly.select(['m_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2015','system:time_end','2015')
var Day2016 = UHI_yearly.select(['n_daytime_UHI'],['Daytime']).set( 'system:time_start','2016','system:time_end','2016')
var Night2016 = UHI_yearly.select(['n_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2016','system:time_end','2016')
var Day2017 = UHI_yearly.select(['o_daytime_UHI'],['Daytime']).set( 'system:time_start','2017','system:time_end','2017')
var Night2017 = UHI_yearly.select(['o_nighttime_UHI'],['Nighttime']).set( 'system:time_start','2017','system:time_end','2017')
//Create  Image collection of annual means
var UHItime=ee.ImageCollection([Day2003.addBands(Night2003), Day2004.addBands(Night2004), Day2005.addBands(Night2005),
Day2006.addBands(Night2006), Day2007.addBands(Night2007), Day2008.addBands(Night2008), Day2009.addBands(Night2009),
Day2010.addBands(Night2010), Day2011.addBands(Night2011), Day2012.addBands(Night2012), Day2013.addBands(Night2013)
, Day2014.addBands(Night2014), Day2015.addBands(Night2015), Day2016.addBands(Night2016), Day2017.addBands(Night2017)]);
//Load monthly data image
var UHI_monthly=ee.Image('users/tirthankarchakraborty/UHI_monthly');
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
    value:'Welcome to the Global Surface Urban Heat Island (UHI) Explorer. This interactive app displays the spatial variation of the annual, summertime, and wintertime surface UHI for almost all urban areas on Earth. You can search for a city of interest using the search bar at the top. You can also generate charts of seasonal and long-term surface UHI variability by clicking on the urban area of interest. Click on the generated charts to download the corresponding queried data. All values are calculated using the simplified urban-extent (SUE) algorithm [1].',
    style: {fontSize: '.9vw', fontWeight: 'normal', textAlign: 'left'}
})
]);
panel.add(intro);
}
//Function to create reference
function referencecreate(){
  var reference = ui.Panel([//ui.Label({value: 'Reference:'
//,style: {fontSize: '8px', fontWeight: 'bold'}
  //}), 
  ui.Label({value: '1. Chakraborty, T., & Lee, X. (2018). A simplified urban-extent algorithm to characterize surface urban heat islands on a global scale and examine vegetation control on their spatiotemporal variability. International Journal of Applied Earth Observation and Geoinformation.'
,style: {fontSize: '.7vw', fontWeight: 'normal'}
})
]);
// Add reference to the panel
panel.add(reference);
}
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
// Add a label to the panel.
inspector.add(ui.Label({value: 'Click on an urban cluster to extract its UHI estimates',
style: {fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
// Add the panel to the default map.
map.add(inspector);
// Set the default map's cursor to a "crosshair".
map.style().set('cursor', 'crosshair');
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
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  map.layers().set(1, dot);
//Clear inspector
  inspector.clear()
  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Loading...', style: {color: 'gray',fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
//Calculate the UHI values at the points from the images
  var sample = ee.Image(AllUHI).unmask(0).sample(point, 30).first().toDictionary();
  sample.evaluate(function(values) {
    // Add a label with the results from the server.
  // Update the lon/lat panel with values from the click event.
  lat.setValue('Lat: ' + coords.lat.toFixed(2)),
  lon.setValue('Lon: ' + coords.lon.toFixed(2));
  Dayall.setValue('Annual daytime UHI: ' + values.all_daytime_UHI.toFixed(2) + ' °C');
  Nightall.setValue('Annual nightime UHI: ' + values.all_nighttime_UHI.toFixed(2) + ' °C');
  Summerdayall.setValue('Summer daytime UHI: ' + values.summer_daytime_UHI.toFixed(2) + ' °C');
  Summernightall.setValue('Summer nighttime UHI: ' + values.summer_nighttime_UHI.toFixed(2) + ' °C');
  Winterdayall.setValue('Winter daytime UHI: ' + values.winter_daytime_UHI.toFixed(2) + ' °C');
  Winternightall.setValue('Winter nighttime UHI: ' + values.winter_nighttime_UHI.toFixed(2) + ' °C');
  // Add the reference again under all the charts.
  referencecreate()
  // Clear inspector again and display a new label
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Click on another urban cluster...',
style: {fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
  });
    // Create a daytime UHI chart.
  var UHIChart = ui.Chart.image.series(UHItime, point).setChartType('LineChart');
  UHIChart.setOptions({
    title: 'Longterm change of annual UHI intensity',
      vAxes: {
        0: {
          title: 'Annual daytime UHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#993333', italic: false}
        },
        1: {
          title: 'Annual nighttime UHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#6600ff', italic: false}
        }
      },
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 15}, titleTextStyle: {bold: true, italic: false}},
     curveType: 'function',
        colors: ["#993333","#6600ff"],
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
  panel.widgets().set(8, UHIChart);
   //Months
//var Months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // Create a monthly daytime UHI chart.
  var mUHIChart = ui.Chart.image.series({imageCollection: UHImonth, region: point}).setChartType('LineChart');
  mUHIChart.setOptions({
    title: 'Seasonal variability of UHI intensity',
      vAxes: {
        0: {
          title: 'Monthly daytime UHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#993333', italic: false}
        },
        1: {
          title: 'Monthly nighttime UHI (°C)', format: '#.##',  titleTextStyle: {bold: true, color: '#6600ff', italic: false}
        }
      },
        hAxis: {title: 'Month', format: "MMM", gridlines: {count: 13}, titleTextStyle: {bold: true, italic: false}},
          colors: ["#993333","#6600ff"],
        lineWidth:3,
  pointSize: 5, curveType: 'function',
 //       'tooltip' : {
//  trigger: 'none'
//  format: "MMM"
//},
        chartArea: {height: '62%'},
        series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
        }
      });
   panel.widgets().set(9, mUHIChart);
});
// Add the panel to the ui.root.
ui.root.insert(1, panel);
var legend = ui.Panel({style: {position: 'bottom-left',width: '115px'}});
function legendcreate()
{
legend.add(ui.Label({ 
  value: "Surface UHI intensity (°C)",
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0px 0px 0px',
    padding: '0px'
  }
  }))};
  //Call legend creation function
  legendcreate()
// Define some constants.
var DAY_UHI = 'Annual day';
var NIGHT_UHI = 'Annual night';
var SUMMER_DAY_UHI = 'Summer day';
var SUMMER_NIGHT_UHI = 'Summer night';
var WINTER_DAY_UHI = 'Winter day';
var WINTER_NIGHT_UHI = 'Winter night';
var none= "Remove layer"
/*Add UHI layers to map to display the 16-year daytime and nightime urban heat islands of the world's 4999 largest cities*/
//Map.addLayer(DayUHI, {min:-1, max: 5, palette:colors ,opacity:1} , 'Daytime UHI' )
var DayUHIVis = AllUHI_1km.mask(urbanurban).clip(urb).select('all_daytime_UHI').visualize({min:0, max:6,palette:colors ,opacity:1})
var NightUHIVis = AllUHI_1km.mask(urbanurban).clip(urb).select('all_nighttime_UHI').visualize({min:-1, max:2,palette:colors ,opacity:1})
var DaysummerUHIVis = AllUHI_1km.mask(urbanurban).clip(urb).select('summer_daytime_UHI').visualize({min:0, max:6,palette:colors ,opacity:1} )
var NightsummerUHIVis = AllUHI_1km.mask(urbanurban).clip(urb).select('summer_nighttime_UHI').visualize({min:0, max:3,palette:colors ,opacity:1})
var DaywinterUHIVis = AllUHI_1km.mask(urbanurban).clip(urb).select('winter_daytime_UHI').visualize({min:0, max:3,palette:colors ,opacity:1} )
var NightwinterUHIVis = AllUHI_1km.mask(urbanurban).clip(urb).select('winter_nighttime_UHI').visualize({min:-1, max:2,palette:colors ,opacity:1})
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [DAY_UHI, NIGHT_UHI, SUMMER_DAY_UHI, SUMMER_NIGHT_UHI, WINTER_DAY_UHI, WINTER_NIGHT_UHI, none],
  value: DAY_UHI,
  onChange: redraw,
});
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}
})).add(select);
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  //Clear legend and create new legend 
  legend.clear()
  legendcreate()
  //Change legend label based on map displayed
legend.add(ui.Label({value:'Choose display layer:',style: {fontSize: '13px', fontWeight: 'normal', textAlign: 'left'}})).add(select);
  //var Name=custom_leg
  var layer = select.getValue();
  var image;
  if (layer == DAY_UHI) {
    var Name=["<0","0 to 1","1 to 2", "2 to 3", "3 to 4", "4 to 5", "5 to 6", ">6"];
    image = DayUHIVis;
  } else if (layer == NIGHT_UHI) {
    var Name=["<-1","-1 to -0.5", "-0.5 to 0", "0 to 0.5", "0.5 to 1", "1 to 1.5", "1.5 to 2", ">2"];
    image = NightUHIVis;
  } else if (layer == SUMMER_DAY_UHI) {
    var Name=["<0","0 to 1","1 to 2", "2 to 3", "3 to 4", "4 to 5", "5 to 6", ">6"];
      image = DaysummerUHIVis;
  }
 else if (layer == SUMMER_NIGHT_UHI) {
    image = NightsummerUHIVis;
    var Name=["<0","0 to 0.5", "0.5 to 1", "1 to 1.5", "1.5 to 2", "2 to 2.5", "2.5 to 3", ">3"];  
    } 
    else if (layer == WINTER_DAY_UHI) {
    image = DaywinterUHIVis;
    var Name=["<0","0 to 0.5", "0.5 to 1", "1 to 1.5", "1.5 to 2", "2 to 2.5", "2.5 to 3", ">3"];
  } else if (layer == WINTER_NIGHT_UHI) {
    image = NightwinterUHIVis;
    var Name=["<-1","-1 to -0.5", "-0.5 to 0", "0 to 0.5", "0.5 to 1", "1 to 1.5", "1.5 to 2", ">2"];
   }
  map.addLayer(image, {}, layer);
  // Create legend color blocks for each range
  var entry
for (var x = 0; x<8; x++){
  entry = [
    ui.Label({style:{color:colors[x], margin: '0 0 3px 0'}, value: '████'}),
    ui.Label({
      value: Name[x],
      style: {fontSize: '14px',
        margin: '0 0 3px 3px'
      }
    })
  ];
  //entry.setValue(entry)
  legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  if (layer==none)
   {
     map.layers().reset();
   }
}
}
// Invoke the redraw function once at start up to initialize the map.
redraw();
map.add(legend);
//var outline = ee.Image().paint(urb, 0, 1)
//map.addLayer(outline,null)