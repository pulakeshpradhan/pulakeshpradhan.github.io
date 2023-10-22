var dem = ui.import && ui.import("dem", "image", {
      "id": "MERIT/DEM/v1_0_3"
    }) || ee.Image("MERIT/DEM/v1_0_3"),
    cntries = ui.import && ui.import("cntries", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    map = ui.import && ui.import("map", "image", {
      "id": "users/savannalabnmsu/treecover_kenya/map_ke_eth"
    }) || ee.Image("users/savannalabnmsu/treecover_kenya/map_ke_eth"),
    eval_plots = ui.import && ui.import("eval_plots", "table", {
      "id": "users/savannalabnmsu/eval_plots"
    }) || ee.FeatureCollection("users/savannalabnmsu/eval_plots"),
    npt = ui.import && ui.import("npt", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                44.27091284301391,
                -1.2014544138373258
              ],
              [
                44.27091284301391,
                -2.4751862885125004
              ],
              [
                45.45743628051391,
                -2.4751862885125004
              ],
              [
                45.45743628051391,
                -1.2014544138373258
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
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[44.27091284301391, -1.2014544138373258],
          [44.27091284301391, -2.4751862885125004],
          [45.45743628051391, -2.4751862885125004],
          [45.45743628051391, -1.2014544138373258]]], null, false),
    ceo = ui.import && ui.import("ceo", "image", {
      "id": "users/savannalabnmsu/treecover_kenya/export_CEO"
    }) || ee.Image("users/savannalabnmsu/treecover_kenya/export_CEO"),
    wv = ui.import && ui.import("wv", "image", {
      "id": "users/savannalabnmsu/treecover_kenya/export_WV"
    }) || ee.Image("users/savannalabnmsu/treecover_kenya/export_WV"),
    combined = ui.import && ui.import("combined", "image", {
      "id": "users/savannalabnmsu/treecover_kenya/export_CEO_WV"
    }) || ee.Image("users/savannalabnmsu/treecover_kenya/export_CEO_WV"),
    regions = ui.import && ui.import("regions", "table", {
      "id": "users/savannalabnmsu/dissolved_regions"
    }) || ee.FeatureCollection("users/savannalabnmsu/dissolved_regions");
var base =   ee.FeatureCollection(
        [ee.Feature(
            npt,
            {
              "MAP": "null",
              "dem": "null",
              "predictedCover_ceo": "null",
              "predictedCover_wv": "null",
              "response": "null",
              "location_id": -999,
              "system:index": "0"
            })]);
var zone = regions.filterMetadata('cluster_na','equals','EA_dry')
var area = zone.geometry()
////////////////////////////basic UI///////////////////////////////
//create viz parameters
//var visParams = {min:0,max:100,palette: 'ce7e45,df923d,f1b555,fcd163,fff705,efff00,91ff00,1bfb00,0abe00,066400'};
var palette = ['saddlebrown','orange','yellow','lightgreen','green']
var visparams = {min:0, max:100,palette:palette}
var classes = ['0-20','20-40','40-60','60-80','80-100']
var pptPalette = [
'#d53e4f',
'#fc8d59',
'#fee08b',
'#e6f598',
'#99d594',
'#3288bd'
]
var pptClasses = ['<200','200-400','400-600','600-800','800-1000','>1000']
//import function to create legend
var createLegend = require('users/savannalabnmsu/misc:makeLegend_alt.js')
// Make inset map to show location of given random plot
var locator = ui.Map()
              .setControlVisibility(false)
              .setOptions('hybrid');
var createInset = function() {
  var bounds = area.bounds();
  locator.centerObject(bounds,3);
  locator.addLayer(zone.style({color:'blue',fillColor:'00000000'}))
  locator.add(ui.Label('Map Locator',{position:'top-right'}))
};
createInset();
var inset = ui.Panel(
  [locator],
  ui.Panel.Layout.flow('horizontal'),
  {width:'100%', height:'150px', backgroundColor:'#ffffff'}
  );
//create side panel to carry information
var infoPanel = ui.Panel(
  [
    inset,
    ui.Label('Evaluating Woody Canopy Cover in East African Rangelands',{fontSize:'14px',fontWeight:'bold'}),
    ui.Label(
    'The following tool is meant for qualitatively assessing  the accuracy of % woody canopy cover estimated\n'
    +'from  satellite data using Collect Earth Online  (CEO) and classified  worldview-3 (WV-3) plot samples.',
    //+'A link to download data for completed plots, as a CSV file, is provided immediately upon survey of the first plot, and is continuously updated as you complete more plots.',
    {fontSize:'12px', width:'95%'}),
    ui.Label(
      'To avoid losing progress, please download data for completed plots before exiting the application/web page.',
     {fontSize:'12px', width:'95%',color:'red', fontWeight:'bold'})
    ],
  ui.Panel.Layout.flow('vertical'),
  {width:'25%', height:'100%', backgroundColor:'#ffffff'}
  );
  //create 4 (2X2) linked map instances
var map1 = ui.Map().setControlVisibility(false,false,false, true).setOptions('hybrid');
var map2 = ui.Map().setControlVisibility(false,false, false, true).setOptions('hybrid');
var map3 = ui.Map().setControlVisibility(false,false, false, true).setOptions('hybrid');
//var map3 = ui.Map().setControlVisibility(false).setOptions('hybrid');
var map4 = ui.Map().setControlVisibility(false).setOptions('hybrid');
var topPanel = ui.Panel(
  [map1,map2],
  ui.Panel.Layout.flow('horizontal'),
  {width:'100%', height:'50%', backgroundColor:'#ffffff'}
  );
var bottomPanel = ui.Panel(
  [map3,map4],
  ui.Panel.Layout.flow('horizontal'),
  {width:'100%', height:'50%', backgroundColor:'#ffffff'}
  );
var mapPanel = ui.Panel(
  [topPanel,bottomPanel],
  ui.Panel.Layout.flow('vertical'),
  {width:'75%', height:'100%', backgroundColor:'#ffffff'}
  );
var linker = ui.Map.Linker([map1,map2,map3,map4]);
//reset UI with new panels
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'))
ui.root.widgets().reset([mapPanel,infoPanel]);
//ui.root.widgets().add(splitPanel);
//ui.root.widgets().add(infoPanel);
/////////////////create maps///////////////////////////////////
function createMap(input,source,map_instance){
  var classifiedImage = input
  var layer1  = ui.Map.Layer(classifiedImage, visparams,source+' predicted tree cover')
  map_instance.layers().set(0, layer1);
  var label = ui.Label(source+' predicted cover (%)')
  var legend = createLegend.createLegend(classes, palette);
  map_instance.add(ui.Panel([label,legend],'flow',{position: 'top-right'}))
}
createMap(ceo,'CEO',map1)
createMap(wv,'WV-3',map2)
createMap(combined,'combined',map3)
map1.centerObject(area,4)
//create empty fc to be as seed for collecting output
map4.layers().set(0,ui.Map.Layer(base,{},'filler',false))
/*
create tools to assess individual locations  and record response on how accurate the models area
*/
//create 1000 random plots with 1 pixel radius and set location id
var points = ee.FeatureCollection.randomPoints(area, 1000, 0, 1)
         .map(function(f){return f.buffer(80,1).set('location_id',ee.Number.parse(f.id()))});
         //.toList(1000)
//image with bands to sample with out put responses
var collect = ee.Image(map1.layers().get(0).get('eeObject')).select([0],['cover_ceo']);  
var wv3 = ee.Image(map2.layers().get(0).get('eeObject')).select([0],['cover_wv3']);
var comb = ee.Image(map3.layers().get(0).get('eeObject')).select([0],['cover_combined']);
var toSample = collect.addBands(wv3).addBands(comb).addBands(map).addBands(dem);
//sample image values at all points
var sampled = points
print(sampled.size())
//Export.table.toAsset(sampled)
//empty container to collect output features 
var outDict = ee.Dictionary({})
print('dict1:',outDict)
//lists to populate select widgets
//extract id from plots to use as values in a "select" drop-down menu
var plot_dict = sampled.map(function(plot) {
  var dict = {
    value: plot.get('location_id'),
    label: plot.id(), 
  };
  return ee.Feature(plot.geometry(), dict);
});
var features = plot_dict.getInfo()['features'];
var locs = [];
for (var i = 0; i < features.length; i++) {
  locs.push({
    label: features[i]['properties']['label'],
    value: features[i]['properties']['value']
  });
}
//list of survey question answers
var answers = [
                'CEO','WV-3','combined','CEO and WV-3','CEO and combined','WV-3 and combined',
                'all are similarly accurate','none is very accurate',
                'null/no imagery','*not sure'
                ]//answers to survey question
var answers2 = [
  'high cover/forest','savanna-medium cover','savanna-low cover','open (bare or grassland)',
  'urban/settlement','cultivated','water','no imagery','*not sure'
  ]//answers to survey question
//select menu to choose location (will be disabled after first location is chosen)
var loc = ui.Select(locs, 'select first plot')
//create select menu for survey responses
var survey = ui.Select(answers, 'select a response')
var survey2 = ui.Select(answers2, 'select a response')
//button to navigate to next location after response
var next  = ui.Button({label:'save response and go to next plot',style:{fontSize:'16px',width:'200px'}})
//Initially disable survey and next
survey.setDisabled(true)
survey2.setDisabled(true)
next.setDisabled(true)
//callback function for starting location/location change
loc.onChange(
  function(val){
    var plot = ee.FeatureCollection(sampled.filterMetadata('location_id','equals',val));
    //sample relevant image data to display on plot
    var pt = toSample.reduceRegions(plot,ee.Reducer.mean(),80)
           .map(function(f){
            var coords = f.centroid(1).geometry().coordinates() 
            return f.set('centerLon',coords.get(0)).set('centerLat',coords.get(1))
           })
    var feat = ee.Feature(pt.first())//get the plot feature
    var ceo = feat.get('cover_ceo')
    var wv  = feat.get('cover_wv3')
    var combined  = feat.get('cover_combined')
    var ceoVal = ee.Algorithms.If(ceo,ee.Number(ceo).format('%.2f'),'null')
    var wvVal = ee.Algorithms.If(wv,ee.Number(wv).format('%.2f'),'null')
    var combVal = ee.Algorithms.If(combined,ee.Number(combined).format('%.2f'),'null')
    var ptLabel = ee.FeatureCollection([feat.centroid(1)])//plot center point to be shown on inset/locator map
    map1.centerObject(pt,18);
    map1.layers().set(1,ui.Map.Layer(pt,{},'plot',false))
    map1.layers().set(2,ui.Map.Layer(pt.style({color:'000000',fillColor:'00000000'}),{},'plot-drawn',true));
    map2.layers().set(1,ui.Map.Layer(pt,{},'plot',false));
    map2.layers().set(2,ui.Map.Layer(pt.style({color:'000000',fillColor:'00000000'}),{},'plot-drawn',true));
    map3.layers().set(1,ui.Map.Layer(pt,{},'plot',false));
    map3.layers().set(2,ui.Map.Layer(pt.style({color:'000000',fillColor:'00000000'}),{},'plot-drawn',true));
    map4.layers().set(1,ui.Map.Layer(pt,{},'plot',false));
    map4.layers().set(2,ui.Map.Layer(pt.style({color:'000000',fillColor:'00000000'}),{},'plot-drawn',true));
    locator.layers().set(1,ui.Map.Layer(ptLabel.draw('red',5)));
    map1.widgets().set(1,ui.Label('plot id: '+val+', mean cover='+ceoVal.getInfo()+'%'))
    map2.widgets().set(1,ui.Label('plot id: '+val+', mean cover='+wvVal.getInfo()+'%'))
    map3.widgets().set(1,ui.Label('plot id: '+val+', mean cover='+combVal.getInfo()+'%'))
    survey.setDisabled(false)//enable survey 1
    next.setDisabled(true)//disable next button
  });
//call back function for survey widget
survey.onChange(function(answer){
    //get plot from map layers as feature collection and update with response
    var newfc = ee.FeatureCollection(map1.layers().get(1).get('eeObject')).map(function(f){return f.set('best estimate',answer)})
    map1.layers().set(1,ui.Map.Layer(newfc,{},'plot',false))
    //reset toolpanel by removing 'choose location' text
    survey2.setDisabled(false)//enable survey 2 
    toolPanel.widgets().reset([loc,question1,survey,question2,survey2,next,urlPanel])
    loc.style().set('shown',false)//hide location change widget
  })
//call back for second survey widget
survey2.onChange(function(answer){
    //get plot from map layers as feature collection and update with response
    var newfc = ee.FeatureCollection(map1.layers().get(1).get('eeObject')).map(function(f){return f.set('lulc',answer)})
    map1.layers().set(1,ui.Map.Layer(newfc,{},'plot',false))
    //reset toolpanel by removing 'choose location' text
    next.setDisabled(false)//enable next button
    loc.style().set('shown',false)//hide location change widget
  })
//call back for next button  
next.onClick(function(){
    var current = ee.FeatureCollection(map1.layers().get(1).get('eeObject'));
    var old = ee.FeatureCollection(map4.layers().get(0).get('eeObject'));//first one will be a nodata placeholder. merged into new ones 
    var cummulative = ee.FeatureCollection([old,current]).flatten();
    map4.layers().set(0,ui.Map.Layer(cummulative,{},'cummulative',false));//cummulatively merge old into new
    //get output featurecollection from list of dictionary values 
    var outputfc = cummulative.filterMetadata('location_id','not_less_than',0)
    //get max and min plot/location id for filename 
    var max = ee.Number(outputfc.reduceColumns(ee.Reducer.max(),['location_id']).get('max')).format('%03d');
    var min = ee.Number(outputfc.reduceColumns(ee.Reducer.min(),['location_id']).get('min')).format('%03d');
    var outputName = ee.String('plotid_').cat(min).cat('_').cat(max)
    print(outputName)
    //file download params
    var dParams = {
      format:'csv',
      selectors:['location_id','centerLat','centerLon','MAP','dem','cover_ceo','cover_wv3','cover_combined','best estimate','lulc'],
      filename:outputName.getInfo()
    }
    print('output collection:',outputfc);
    //set download link for output in tool panel
    urlPanel.widgets().set(0,ui.Label('Click to down data for completed plots',{fontSize:'16px',fontWeight:'bold'},outputfc.getDownloadURL(dParams)))
    //set downlink to output
    //get current plot id 
    var id = current.first().get('location_id').getInfo();
   //change current loc change value to id+1 to trigger location change
    loc.setValue(id+1)
    loc.style().set('shown',false);//keep hiding location change widget
    survey.items().reset(answers)
    survey2.items().reset(answers2)
    survey2.setDisabled(true)//disable second question
})  
//other info widgets
var question1 = ui.Label(
  'Q1: Using the Google base imagery (bottom right) as visual reference, which percent canopy cover estimate \n'
  +'in your opinion  is most accurate within the circular plot?(Choose one response). You can change responses before moving on to the next plot).',
  {fontWeight:'bold',fontSize:'14px'}
  )
var question2 = ui.Label(
  'Q2: How would you describe the land cover/land use inside the plot?(Choose one response).You can change responses before moving on to the next plot).',
  {fontWeight:'bold',fontSize:'14px'}
  )
var urlPanel = ui.Panel([ui.Label('*Download link will become active as you complete first plot survey.')])//panel to post download url 
var toolPanel  = 
ui.Panel(
    [
      ui.Label('Choose a starting location',{fontWeight:'bold',fontSize:'12px'}),
      ui.Label(
        'For the first time, start from 0. Otherwise you can start from any plot based on previous progress.',
        {fontSize:'12px'}
        ),
      loc,
      question1,
      survey,
      question2,
      survey2,
      next,
      urlPanel,
      ],
    'flow'
    );
infoPanel.add(toolPanel)