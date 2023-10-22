var MOD_SST_A = ui.import && ui.import("MOD_SST_A", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI"),
    MOD_SST_T = ui.import && ui.import("MOD_SST_T", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Terra/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Terra/L3SMI"),
    tirtajaya = ui.import && ui.import("tirtajaya", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.2258319097166,
                -5.958863779605331
              ],
              [
                107.2258319097166,
                -6.030225865836071
              ],
              [
                107.35011474663067,
                -6.030225865836071
              ],
              [
                107.35011474663067,
                -5.958863779605331
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[107.2258319097166, -5.958863779605331],
          [107.2258319097166, -6.030225865836071],
          [107.35011474663067, -6.030225865836071],
          [107.35011474663067, -5.958863779605331]]], null, false),
    tempuran = ui.import && ui.import("tempuran", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.54925378723644,
                -6.176062073015762
              ],
              [
                107.54925378723644,
                -6.21428966224434
              ],
              [
                107.62023576660656,
                -6.21428966224434
              ],
              [
                107.62023576660656,
                -6.176062073015762
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
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
    ee.Geometry.Polygon(
        [[[107.54925378723644, -6.176062073015762],
          [107.54925378723644, -6.21428966224434],
          [107.62023576660656, -6.21428966224434],
          [107.62023576660656, -6.176062073015762]]], null, false),
    losarang = ui.import && ui.import("losarang", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.13071190157831,
                -6.320488017024501
              ],
              [
                108.13071190157831,
                -6.396663304139111
              ],
              [
                108.25053154269159,
                -6.396663304139111
              ],
              [
                108.25053154269159,
                -6.320488017024501
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.13071190157831, -6.320488017024501],
          [108.13071190157831, -6.396663304139111],
          [108.25053154269159, -6.396663304139111],
          [108.25053154269159, -6.320488017024501]]], null, false),
    krangkeng = ui.import && ui.import("krangkeng", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.49408244272014,
                -6.4595961714923895
              ],
              [
                108.49408244272014,
                -6.535665353212375
              ],
              [
                108.5630903162553,
                -6.535665353212375
              ],
              [
                108.5630903162553,
                -6.4595961714923895
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.49408244272014, -6.4595961714923895],
          [108.49408244272014, -6.535665353212375],
          [108.5630903162553, -6.535665353212375],
          [108.5630903162553, -6.4595961714923895]]], null, false),
    cirebon = ui.import && ui.import("cirebon", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.51892168423701,
                -6.593116194451635
              ],
              [
                108.51892168423701,
                -6.623895199533932
              ],
              [
                108.55497057339717,
                -6.623895199533932
              ],
              [
                108.55497057339717,
                -6.593116194451635
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.51892168423701, -6.593116194451635],
          [108.51892168423701, -6.623895199533932],
          [108.55497057339717, -6.623895199533932],
          [108.55497057339717, -6.593116194451635]]], null, false),
    losari = ui.import && ui.import("losari", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.82339647215771,
                -6.787816457349972
              ],
              [
                108.82339647215771,
                -6.817901378310698
              ],
              [
                108.87343576353955,
                -6.817901378310698
              ],
              [
                108.87343576353955,
                -6.787816457349972
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.82339647215771, -6.787816457349972],
          [108.82339647215771, -6.817901378310698],
          [108.87343576353955, -6.817901378310698],
          [108.87343576353955, -6.787816457349972]]], null, false),
    tanjung = ui.import && ui.import("tanjung", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.86669936894273,
                -6.811473411803456
              ],
              [
                108.86669936894273,
                -6.85757784916308
              ],
              [
                108.92823997258043,
                -6.85757784916308
              ],
              [
                108.92823997258043,
                -6.811473411803456
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.86669936894273, -6.811473411803456],
          [108.86669936894273, -6.85757784916308],
          [108.92823997258043, -6.85757784916308],
          [108.92823997258043, -6.811473411803456]]], null, false),
    wanasari = ui.import && ui.import("wanasari", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.98337919146141,
                -6.781524272250246
              ],
              [
                108.98337919146141,
                -6.8260123707890665
              ],
              [
                109.07659131914696,
                -6.8260123707890665
              ],
              [
                109.07659131914696,
                -6.781524272250246
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.98337919146141, -6.781524272250246],
          [108.98337919146141, -6.8260123707890665],
          [109.07659131914696, -6.8260123707890665],
          [109.07659131914696, -6.781524272250246]]], null, false),
    pati = ui.import && ui.import("pati", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                111.11347522457883,
                -6.611658133526123
              ],
              [
                111.07133235653684,
                -6.6287950679360135
              ],
              [
                111.09444557606794,
                -6.67577303975469
              ],
              [
                111.1434861702878,
                -6.717121956299518
              ],
              [
                111.22347463315141,
                -6.721901157583699
              ],
              [
                111.23373602528133,
                -6.682668536866773
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0000ff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0000ff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[111.11347522457883, -6.611658133526123],
          [111.07133235653684, -6.6287950679360135],
          [111.09444557606794, -6.67577303975469],
          [111.1434861702878, -6.717121956299518],
          [111.22347463315141, -6.721901157583699],
          [111.23373602528133, -6.682668536866773]]]),
    demak = ui.import && ui.import("demak", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                110.51918672521785,
                -6.679778823866755
              ],
              [
                110.51918672521785,
                -6.794509166742897
              ],
              [
                110.67969011266902,
                -6.794509166742897
              ],
              [
                110.67969011266902,
                -6.679778823866755
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#999900",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #999900 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[110.51918672521785, -6.679778823866755],
          [110.51918672521785, -6.794509166742897],
          [110.67969011266902, -6.794509166742897],
          [110.67969011266902, -6.679778823866755]]], null, false),
    sreseh = ui.import && ui.import("sreseh", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                113.0914981807319,
                -7.147579786629192
              ],
              [
                113.0914981807319,
                -7.2301810740159205
              ],
              [
                113.19157676349558,
                -7.2301810740159205
              ],
              [
                113.19157676349558,
                -7.147579786629192
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#009999",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #009999 */ee.Geometry.Polygon(
        [[[113.0914981807319, -7.147579786629192],
          [113.0914981807319, -7.2301810740159205],
          [113.19157676349558, -7.2301810740159205],
          [113.19157676349558, -7.147579786629192]]], null, false);
var geometry = ee.FeatureCollection(tirtajaya).merge(tempuran)
.merge(losarang)
.merge(krangkeng)
.merge(cirebon)
.merge(losari)
.merge(tanjung)
.merge(wanasari)
.merge(pati)
.merge(demak)
.merge(sreseh)
// A simple tool for charting MODIS ocean surface temperature.
// Modified by : Dr Ir Dede Dirgahayu ; Pusfatja; LAPAN; Indonesia
var logo = require('users/dededirgahayu11/Fungsi:DD_Logo.js'); 
/*
 * Map layer configuration
 */
var Times = require('users/dededirgahayu11/Fungsi:DD_Dyn_Time.js');
var Bts_Indonesia = ee.Geometry.Rectangle(90,10,142,-12);
// Compute the mean sea surface temperature (SST) value for each pixel by
// averaging MODIS Aqua data for one year.
var MOD_SST =  MOD_SST_A.merge(MOD_SST_T).sort('system:time_start').filterBounds(Bts_Indonesia);
var HYCOM_SST = ee.ImageCollection('HYCOM/sea_temp_salinity').filterBounds(Bts_Indonesia);
var JumDat = Jum_Dat(MOD_SST,'Obj'),LstImgs_SST,SST_S,SST_E,SST_2,
Tgl_S,Tgl_E,Tgl_2,dT,ResX,Fmt1 = 'YYYY-MM-dd';
var Prd1w_2000_20 = Times.PrdTglDif('2000-09-01',1,'month','2021-06-30');
LstImgs_SST =MOD_SST.toList(JumDat);
SST_S = ee.Image(LstImgs_SST.get(0)); SST_2 = ee.Image(LstImgs_SST.get(1)); 
SST_E = ee.Image(LstImgs_SST.get(JumDat-1));
Tgl_S = ee.Date(SST_S.date()).format(); Tgl_E = ee.Date(SST_E.date()).format(); 
dT = ee.Date(SST_2.date()).difference(ee.Date(Tgl_S),'hour').getInfo();
ResX = SST_E.select('sst').projection().nominalScale().getInfo();
print('Jumlah data = ' + JumDat,'Tgl_S',Tgl_S,'Tgl_E',
Tgl_E,'Res X = ' + ResX.toFixed(2) + ' m','Res Temp = ' + dT + ' day' );
var Tgl_Cek = [Tgl_S,ee.Date(Date.now()).format(Fmt1)];
var Bands = ['chlor_a', 'sst'];
var Bands2 = ['water_temp_0', 'salinity_0'];
var sst =
    MOD_SST.select(Bands).filterDate('2021-01-01', '2021-12-31');
var sst2 =
    HYCOM_SST.select(Bands2).filterDate('2021-01-01', '2021-12-31')
    .map(function scaleAndOffset(image) {
      var sst2 = image.select(Bands2[0]).multiply(0.001).add(20);
      var salin = ee.Image(image.select(Bands2[1])).multiply(0.001).add(20);
      return image.addBands(sst2,null,true).addBands(salin,null,true);
    });
print('Data SST_Mod 2021: ',sst);
print('Data SST_Hyc 2021: ',sst2);
var vis = {min: 27, max: 32, palette: 'blue,aqua,lightgreen,yellow,red',bands:'sst'};
var vis2 = {min: 27, max: 32, palette: 'blue,aqua,lightgreen,yellow,red',bands:'water_temp_0'};
var vis3 = {min: 32.50968740113771, max: 35.259313413905886, palette: 'blue,aqua,lightgreen,yellow,red',bands:'salinity_0'};
var composite = sst.select('sst').mean().clip(Bts_Indonesia); // .visualize(vis);
var composite2 = sst2.select('water_temp_0').mean().clip(Bts_Indonesia); // .visualize(vis);
var composite3 = sst2.select('salinity_0').mean().clip(Bts_Indonesia); // .visualize(vis);
var compositeLayer = ui.Map.Layer(composite,vis).setName('SST_MOD Composite 2021');
var compositeLayer2 = ui.Map.Layer(composite2,vis2).setName('SST_HYCOM Composite 2021');
var compositeLayer3 = ui.Map.Layer(composite3,vis3).setName('SALIN_HYCOM Composite 2021');
var mapPanel = ui.Map();
mapPanel.layers().add(compositeLayer)
mapPanel.layers().add(compositeLayer2)
mapPanel.layers().add(compositeLayer3)
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var wTmb8BIG = logo.Tmb8BIG()
wTmb8BIG.style().set({border:'2px darkblue solid',margin:'0px 0px 0px 20px'})
var intro = ui.Panel([wTmb8BIG,
  ui.Label({
    value: 'SST,Salinity,Chlorophyl - Time Series Inspector for Salt Pond Cultivation \n (Created by Dr Dede Dirgahayu)',
    style: {color : 'red',fontSize: '18px',textAlign: 'center', fontWeight: 'bold'}
  }),
//  ui.Label('Click a location to see its time series of ocean temperatures.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
// inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
//inspectorPanel.add(ui.Panel(Logo,ui.Panel( ui.Panel.Layout.flow('horizontal'))));
// Add placeholders for the chart and legend.
// inspectorPanel.add(ui.Label('[Chart]'));
// inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
var title_SST =  'Sea Surface Temp & Chlorophyl-a : Time Series at ',
title_Chl_a =  'Chlorophyl: Time Series', Lokasi,Judul = title_SST;
var title_SST2 =  'Sea Surface Temp & Salinity : Time Series at ',
title_Salinity =  'Salinity: Time Series', Lokasi,Judul2 = title_SST2;
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  Lokasi = coords.lon.toFixed(6) + ',' + coords.lat.toFixed(6);
  lon.setValue('Lon: ' + coords.lon.toFixed(6));
  lat.setValue('Lat: ' + coords.lat.toFixed(6));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'black'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(4, dot);
  // Make a chart from the time series.
  var Buf3km = point.buffer(1500);
//var sstChart = ui.Chart.image.series(sst, Buf3km, ee.Reducer.mean(), 500);
var SST_Chl_Graf = GrafTS_2Y(sst,Bands,Buf3km, ee.Reducer.mean(),1000,Judul + Lokasi);
var SST_Salin_Graf = GrafTS_2Y2(sst2,Bands2,Buf3km, ee.Reducer.mean(),1000,Judul2 + Lokasi);
/*  
  // Customize the chart.
  sstChart.setOptions({
    title: 'Sea surface temp: time series',
    vAxis: {title: 'Temp (C)'},
    hAxis: {title: 'Date', format: 'YY-MM', gridlines: {count: 9}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
*/  
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, SST_Chl_Graf);
  inspectorPanel.widgets().set(3, SST_Salin_Graf);
};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
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
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three or 5 numbers for the legend.
var v1 = vis.min,v3 = (vis.min + vis.max) / 2,v5=vis.max,v2 = (v1+v3)/2,v4 = (v3+v5)/2;
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(v1, {fontSize: '12px',margin: '4px 27px'}), ui.Label(v2, {fontSize: '12px',margin: '4px 27px'}),
    ui.Label(
        v3,
        {fontSize: '12px',margin: '4px 27px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(v4, {fontSize: '12px',margin: '4px 27px'}),ui.Label(v5, {fontSize: '12px',margin: '4px 27px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Mean Annual 2021 Ocean Temp (C)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(5, legendPanel);
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis3.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three or 5 numbers for the legend.
var v12 = vis3.min,v32 = (vis3.min + vis3.max) / 2,v52=vis3.max,v22 = (v1+v3)/2,v42 = (v3+v5)/2;
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(v12, {fontSize: '12px',margin: '4px 27px'}), ui.Label(v22, {fontSize: '12px',margin: '4px 27px'}),
    ui.Label(
        v32,
        {fontSize: '12px',margin: '4px 27px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(v42, {fontSize: '12px',margin: '4px 27px'}),ui.Label(v52, {fontSize: '12px',margin: '4px 27px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle2 = ui.Label({
  value: 'Mean Annual 2021 Ocean Salinity (PSU)',
  style: {fontWeight: 'bold'}
});
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
inspectorPanel.widgets().set(6, legendPanel2);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(108.0857, -6.1494); // Indramayu
mapPanel.centerObject(initialPoint, 5);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});
function Jum_Dat(ArrObj,Opsi) {
  if (Opsi == 'Arr') return ee.List(ArrObj).length().getInfo();
  else return ArrObj.size().getInfo();
}
function GrafTS_2Y(ImgC,Bands,Region,Redu,Sc,Judul) {
var chart = ui.Chart.image.series({
                                   imageCollection: ImgC.select(Bands) ,                          // Image collection we want to use for timeseries analysis
                                   region: Region , reducer : Redu,                                      // Pixel we want to use
                                   scale: Sc   ,                                       // [Spatial Resolution]: 500
                                   xProperty: 'system:time_start'                       // Date 
                                  })
                        //  .setSeriesNames(['GPP', 'LAI'])
                          .setSeriesNames(Bands)
                          .setOptions({
                            title: Judul, //'[Time-series Analysis (2019) ]: Tree Pixel' ,
                            legend: {position: 'right'},
                            series: {
                                     0: {
                                         targetAxisIndex: 0 ,
                                        // type: "line" ,
                                         lineWidth: 0 ,
                                         pointSize: 3 ,
                                         color: "green"
                                        } ,
                                     1: {
                                         targetAxisIndex: 1 ,
                                         //type: "line" ,
                                         lineWidth: 0 ,
                                         pointSize: 3 ,
                                         color: "red" 
                                        } ,
                                    } ,
                            hAxis: {
                                    title: 'Date' ,
                                    format: "YY-MM" ,
                                    titleTextStyle: { italic: false, bold: true }
                                   } ,
                            vAxes: {
                                    0: {
                                        title: 'Chl-a',// "GPP (g*C / m^2 / day)" ,
                                        baseline: 0 ,
                                        titleTextStyle: { bold: true , color: 'green' } ,
                                        viewWindow: { min: 0 }
                                      } ,
                                    1: {
                                        title:'Temp (C)' ,// "LAI" ,
                                        baseline: 0  ,
                                        titleTextStyle: { bold: true, color: 'red' } ,
                                        viewWindow: { min: 25 }
                                      }
                                  } ,
                         //   curveType: 'function'
                          });
return chart;
}
function GrafTS_2Y2(ImgC,Bands,Region,Redu,Sc,Judul) {
var chart = ui.Chart.image.series({
                                   imageCollection: ImgC.select(Bands,['1_Temp','0_Salinity']) ,                          // Image collection we want to use for timeseries analysis
                                   region: Region , reducer : Redu,                                      // Pixel we want to use
                                   scale: Sc   ,                                       // [Spatial Resolution]: 500
                                   xProperty: 'system:time_start'                       // Date 
                                  })
                        //  .setSeriesNames(['GPP', 'LAI'])
                          .setSeriesNames(Bands)
                          .setOptions({
                            title: Judul, //'[Time-series Analysis (2019) ]: Tree Pixel' ,
                            legend: {position: 'right'},
                            series: {
                                     0: {
                                         targetAxisIndex: 0 ,
                                        // type: "line" ,
                                         lineWidth: 0 ,
                                         pointSize: 3 ,
                                         color: "red"
                                        } ,
                                     1: {
                                         targetAxisIndex: 1 ,
                                         //type: "line" ,
                                         lineWidth: 0 ,
                                         pointSize: 3 ,
                                         color: "004487" 
                                        } ,
                                    } ,
                            hAxis: {
                                    title: 'Date' ,
                                    format: "YY-MM" ,
                                    titleTextStyle: { italic: false, bold: true }
                                   } ,
                            vAxes: {
                                    0: {
                                        title: 'Temp (C)',// "GPP (g*C / m^2 / day)" ,
                                        baseline: 0 ,
                                        titleTextStyle: { bold: true , color: 'red' } ,
                                        viewWindow: { min: 0 }
                                      } ,
                                    1: {
                                        title:'Salinity (PSU)' ,// "LAI" ,
                                        baseline: 0  ,
                                        titleTextStyle: { bold: true, color: '004487' } ,
                                        viewWindow: { min: 25 }
                                      }
                                  } ,
                         //   curveType: 'function'
                          });
return chart;
}
function Set_Map(No,Obj,Vis,Ket,Opsi,Opac) {
return Map.layers().set(No, ui.Map.Layer(Obj, Vis,Ket,Opsi,Opac));
}