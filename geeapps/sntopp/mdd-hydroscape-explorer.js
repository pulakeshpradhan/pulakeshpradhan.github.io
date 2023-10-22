var hydrobasins = ui.import && ui.import("hydrobasins", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_8"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8"),
    basinCenters = ui.import && ui.import("basinCenters", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -69.4777016746201,
            -12.576473368223164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87183619610448,
            -12.631421446135665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.25910426251073,
            -12.652861398316732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91440821758886,
            -12.805568760913916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.84525610775881,
            -12.50731774494869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.47584082455569,
            -12.232328903390181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.75873877377444,
            -13.006908920479578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -71.31492163510256,
            -12.75388811941324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -71.0929044921875,
            -12.284232868355257
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[-69.4777016746201, -12.576473368223164],
         [-69.87183619610448, -12.631421446135665],
         [-70.25910426251073, -12.652861398316732],
         [-69.91440821758886, -12.805568760913916],
         [-70.84525610775881, -12.50731774494869],
         [-70.47584082455569, -12.232328903390181],
         [-70.75873877377444, -13.006908920479578],
         [-71.31492163510256, -12.75388811941324],
         [-71.0929044921875, -12.284232868355257]]),
    chartAreas = ui.import && ui.import("chartAreas", "table", {
      "id": "users/sntopp/MdD/ChartAreas"
    }) || ee.FeatureCollection("users/sntopp/MdD/ChartAreas"),
    UNC_R = ui.import && ui.import("UNC_R", "image", {
      "id": "users/sntopp/UNC_Research"
    }) || ee.Image("users/sntopp/UNC_Research"),
    Duke = ui.import && ui.import("Duke", "image", {
      "id": "users/sntopp/Duke_Logo"
    }) || ee.Image("users/sntopp/Duke_Logo"),
    basinVis = ui.import && ui.import("basinVis", "image", {
      "id": "users/sntopp/MdD/PeruBasins"
    }) || ee.Image("users/sntopp/MdD/PeruBasins");
//Bring in some functions and initial arguments
var hb = hydrobasins.filterBounds(basinCenters)
//Create Dictionary of Basin names for later
var bNames = ee.Dictionary.fromLists(
  ['6080540660','6080548660','6080540560','6080549240', '6080549470','6080548950', '6080552360', '6080552520', '6080546500'],
  ['Basin: Upstream Manu','Basin: Conservacion Area', 'Basin: Manu North', 'Basin: Manu - Co.', 'Basin: Colorado', 'Basin: Co.- In. West','Basin: Co.- In. East','Basin: Inambari', 'Basin: In.- Puerto'])
Map.setOptions("hybrid")
Map.setCenter(-70.3733, -12.6302, 9)
Map.setControlVisibility(false)
/*  
//Make and export the watermasks so the app runs slightly faster
var waterMasks = ee.ImageCollection(ee.List.sequence(1985,2018,1).map(function(i){
  var mask = jrcYearly.filter(ee.Filter.inList('year',[i, ee.Number(i).subtract(1)]))
    .reduce(ee.Reducer.max())
    .gte(2)
    .clip(hb)
    return ee.Image(mask).set('year', i)
  }))
//Visualize change over time by stacking up the layers on top of each other
var waterYears = waterMasks.map(function(i){
  var year = ee.Image(ee.Number(i.get('year'))).updateMask(i).toFloat()
  return year.set('year', i.get('year'))
})
//Export waterYears to an image collection to load faster
//var batch = require('users/fitoprincipe/geetools:batch')
for (var i = 1985; i < 2019; i++) {
  Export.image.toAsset({
  image: ee.Image(waterYears.filter(ee.Filter.eq('year',i)).first()),
  description: 'test', 
  assetId: 'MdD/waterYears/' + i,
  region: hb.geometry(),
  scale: 90})
}
///Paint the basin borders to visualize them
var basinVis = ee.Image().byte().paint(hb, 1, 2)
Export.image.toAsset({
  image: basinVis, 
  description:'StudyBasinRaster', 
  assetId:'PeruBasins',
  region: hb})
*/
//Bring in the above items
var waterYears = ee.ImageCollection('users/sntopp/MdD/waterYears')
var waterStack = waterYears.reduce(ee.Reducer.min());
Map.addLayer(ee.Image(waterStack), 
    {min: 1984, max: 2018, 
    palette:["#F0F921FF", "#FDC328FF", "#F89441FF", "#E56B5DFF", "#CC4678FF"]}, 
    'Historical Surface Waters');
//"#440154FF", 
Map.addLayer(basinVis,{palette:'black'},'Basins');
//////// Now start on the UI
//Bring in the logos
var logos = ui.Panel({
  widgets: [
  ui.Thumbnail({image:UNC_R,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px', padding:'5px'}}),
  ui.Thumbnail({image:Duke,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'120px'}})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Create an intro panel.
var panel = ui.Panel({widgets:[
  ui.Label({
    value: 'Madre de Dios Hydroscape Explorer',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on a watershed (outlined in black) to visualize historical changes (1985-2018) in surface water extent.  This text will then be replaced by charts detailing landscape changes, and a gif of surface water extent over time will load to the right.  Click on a new watershed to update each visualization.'),
  ui.Label('The Madre de Dios region of Peru has undergone extensive artisanal and small scale gold mining.  This has led to large increases in lake density within mining-impacted watersheds.  In the map to the right, the colors represent the first year water was detected in a given area.  Waters that predate satellite records (e.g. river channels) appear in yellow. The darker pink patches show the recent extensive growth of lakes, primarily in the form of mining ponds. Basin visualizations take ~15 seconds to load.'),
  ui.Label('Read the accompanying Science Advances publication here.').setUrl('https://advances.sciencemag.org/content/6/48/eabd4953'),
  logos,
  ui.Label({value:'Watermasks: Pekel et al., 2016 (Nature); Deforestation: Hansen et al., 2013 (Science)',
            style:{fontSize:'10px'}})
  ], style:{'width':'350px', 'position':'bottom-left', 'padding':'7px'
}});
//Build a legend
var vis = {palette: ["#F0F921FF", "#FDC328FF", "#F89441FF", "#E56B5DFF", "#CC4678FF"], min: 1985, max: 2018};
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
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(2001,
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Year',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
//Placeholder for GIF box
var gifHolder = ui.Label({
    value: 'GIF will load here',
    style: {fontSize: '12px',
            color: 'white', 
            backgroundColor: 'black',  
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%',
            padding: '5px'
    }})
// Add the legend to a new panel that will hold the GIF
var panelGif = ui.Panel({
  widgets:[legendPanel, gifHolder],
  style:{'width':'50%', 'maxHeight': '90%', 'position':'bottom-right'}});
////Add them both to the map
ui.root.insert(0,panel)
Map.add(panelGif)
// Create the GIF function
Map.onClick(function(coords) {
  // Filter to the selected basin
  var basin = hb.filterBounds(ee.Geometry.Point(coords.lon, coords.lat));
  var basinVis = ui.Map.Layer(basin, {color: 'black'}, 'Basin');
  Map.layers().set(2, basinVis);
  //Pull basin name for labels
  var bLabel = bNames.get(ee.String(basin.first().get('HYBAS_ID'))).getInfo()
  //Right Label
  var bLabelVis = ui.Panel({widgets:[ 
    ui.Label({
    value: bLabel,
    style: {fontSize: '12px',
            color: 'white', 
            backgroundColor: 'black',  
            fontWeight: 'bold',
            textAlign: 'center',
            width: '75%',
            padding: '5px'
    }}),
    ui.Button('Close', function(){
      panelGif.clear();
      panelGif.widgets().set(1,legendPanel).set(2,gifHolder);
      //panelGif.widgets().set(1,gifHolder)
      })],
      layout: ui.Panel.Layout.flow('horizontal')
  });
  //Left Label
  var bLabelLeft = ui.Panel({widgets:[
    ui.Label({
    value: 'Madre de Dios Hydroscape Explorer',
    style: {fontSize: '20px',
            fontWeight: 'bold'
    }}),
    ui.Label({value: bLabel,
      style: {fontSize: '15px',
              fontWeight: 'bold'
    }})]});
  // Make a quick gif!
  var filmParams = {
    region: basin.geometry(),
    framesPerSecond: 5,
    dimensions: 650, 
  };
//Basic that just displays water mask    
  /*var rivGif = waterYears.map(function(img){
    return img.visualize({min: 1984, 
              max: 2018, 
              palette:["#F0F921FF", "#FDC328FF", "#F89441FF", "#E56B5DFF", "#CC4678FF"]})})//"#3B528BFF", "#21908CFF", "#5DC863FF", "#FDE725FF"]})})
  */
//Alternate that includes basin boundary
  var rivGif = waterYears.map(function(img){
    var basinBoundary = ee.Image().toByte().paint(basin, 1, 2).visualize({palette: ['white']})//.paint(ee.Geometry.LineString(basin.geometry().coordinates().get(0)), 1).visualize({palette: ['white']});
    var watermask = img.visualize({min: 1984, max: 2018, palette:["#F0F921FF", "#FDC328FF", "#F89441FF", "#E56B5DFF", "#CC4678FF"]});
    var output = ee.ImageCollection.fromImages([watermask, basinBoundary]).mosaic();
    return output});
  //Display the GIF along with the legend
  panelGif.widgets().set(1, ui.Thumbnail(rivGif, filmParams)).set(2, bLabelVis)
  //panelGif.widgets().set(2, bLabelVis).set(1, ui.Thumbnail(rivGif, filmParams))
  // Put together some charts of lotic, lentic, and deforestation
  var chartData = chartAreas.filter(ee.Filter.eq('BasinID', basin.first().get('HYBAS_ID')))
  var lotic = chartData.filter(ee.Filter.eq('feature', 'rivArea')).aggregate_array('areapercent')
  var lentic = chartData.filter(ee.Filter.eq('feature', 'nonRivArea')).aggregate_array('areapercent')
  var deforestation = chartData.filter(ee.Filter.eq('feature', 'cum.defor')).aggregate_array('area')
  var years = ee.List.sequence(1985,2018,1)//chartData.aggregate_array('year').aside(print)
  var yearsDefor = ee.List.sequence(2001,2018,1)//chartData.filter(ee.Filter.gt('year',2000)).aggregate_array('year')
  var yValues = ee.Array.cat([lotic, lentic], 1)
  var loticChart = ui.Chart.array.values(yValues,0,years)
      .setSeriesNames(["Lotic", "Lentic"])
      .setChartType('ScatterChart')
      .setOptions({
        series: {
            0: { color: "#A6611A"},
            1: { color: "#0571B0"}},
        title: 'Variation in Surface Water Extent',
        hAxis: {
          format: '####',
          title: 'Year',
          ticks: [1985, 1990, 1995, 2000, 2005, 2010, 2015]
        },
        vAxis: {
          title: 'Area (% of mean)',
          format: '%####'
        },
        lineWidth: 1,
        pointSize: 3
        //legend: {position: 'none'}
      });
  var deforChart = ui.Chart.array.values(deforestation,0,yearsDefor)
      .setChartType('ColumnChart')
      .setOptions({
        title: 'Cumulative Deforestation',
        hAxis: {
          format: '####',
          title: 'Year',
          ticks: [2001, 2005, 2010, 2015]
        },
        vAxis: {
          title: 'Area (sq. km.)'
        },
        lineWidth: 1,
        pointSize: 3,
        legend: {position: 'none'}
      });
  ///Add the charts to the left hand panel.
  panel.widgets().set(2,loticChart)
  panel.widgets().set(1, deforChart)
  panel.widgets().set(0, bLabelLeft)
});
Map.style().set('cursor', 'crosshair');