var CA = ui.import && ui.import("CA", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -120.68828125,
            37.42662495543974
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
    ee.Geometry.Point([-120.68828125, 37.42662495543974]),
    CBG_formated = ui.import && ui.import("CBG_formated", "table", {
      "id": "users/sabenz/COVID19/forApp/CBG_CA_formated"
    }) || ee.FeatureCollection("users/sabenz/COVID19/forApp/CBG_CA_formated"),
    BG = ui.import && ui.import("BG", "table", {
      "id": "users/sabenz/COVID19/forApp/CBG_CA"
    }) || ee.FeatureCollection("users/sabenz/COVID19/forApp/CBG_CA"),
    PM25 = ui.import && ui.import("PM25", "table", {
      "id": "users/sabenz/COVID19/forApp/PM25_stations_final"
    }) || ee.FeatureCollection("users/sabenz/COVID19/forApp/PM25_stations_final"),
    NO2 = ui.import && ui.import("NO2", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2");
var PM25_pre = ee.Image().byte().paint({
  featureCollection: PM25,
  color: 'PM25_pre'
 }).focal_max(5); 
var PM25_post = ee.Image().byte().paint({
  featureCollection: PM25,
  color: 'PM25_post'
 }).focal_max(5); 
var PM25_D_pre = ee.Image().byte().paint({
  featureCollection: PM25,
  color: 'PM25_difpre'
 }).focal_max(5); 
var PM25_D_post = ee.Image().byte().paint({
  featureCollection: PM25,
  color: 'PM25_difpos'
 }).focal_max(5); 
 PM25 = PM25.map(function(feature){
   var D = ee.Number(feature.get('PM25_post')).subtract(ee.Number(feature.get('PM25_pre')));
   var DD = ee.Number(feature.get('PM25_difpos')).subtract(ee.Number(feature.get('PM25_difpre')));
  return feature.set('D',D,'DD',DD); 
 });
var mobility_pre = ee.Image().byte().paint({
  featureCollection: BG,
  color: 'pct_away_1'
 }); 
var mobility_post = ee.Image().byte().paint({
  featureCollection: BG,
  color: 'pct_away_t'
 }); 
var income_img = ee.Image().byte().paint({
  featureCollection: BG,
  color: 'income'
 });  
 income_img = income_img.log10();
var hisp_img = ee.Image().byte().paint({
  featureCollection: BG,
  color: 'shr_hsp'
 }); 
var asia_img = ee.Image().byte().paint({
  featureCollection: BG,
  color: 'share_asia'
 }); 
var black_img = ee.Image().byte().paint({
  featureCollection: BG,
  color: 'shr_blc'
 }); 
var CA = ee.Image().byte().paint({
  featureCollection: CA.filterBounds(geometry),
  width: 2
 }); 
var NO2 = NO2.select('tropospheric_NO2_column_number_density');
var doys=ee.List.sequence(1,17);
var dif1 = doys.map(function(weeks){
  var mystart = ee.Date('2020-1-1').advance(ee.Number(weeks).subtract(1),'week');
  var myend = mystart.advance(1,'week');
  var data_2020=NO2.filterDate(mystart,myend).mean();
  mystart = ee.Date('2019-1-1').advance(ee.Number(weeks).subtract(1),'week');
  myend = mystart.advance(1,'week');
  var data_2019=NO2.filterDate(mystart,myend).mean();
  return data_2020.subtract(data_2019).multiply(1000000).set('weeks',weeks);
});
dif1 = ee.ImageCollection(dif1);
var preD = dif1.filter(ee.Filter.lt('weeks',10)).mean();
var postD = dif1.filter(ee.Filter.gt('weeks',11)).mean();
//Export.image.toAsset(postD, 'post_COVID_NO2_dif', 'post_COVID_NO2_dif', null, null,null, 1000, null, null, 1e12);
var X = postD.subtract(preD).rename('NO2_Dif');
var NO2_2020 = doys.map(function(weeks){
  var mystart = ee.Date('2020-1-1').advance(ee.Number(weeks).subtract(1),'week');
  var myend = mystart.advance(1,'week');
  var data_2020=NO2.filterDate(mystart,myend).mean();
  return data_2020.multiply(1000000).set('weeks',weeks);
});
NO2_2020 = ee.ImageCollection(NO2_2020);
var pre2020 = NO2_2020.filter(ee.Filter.lt('weeks',10)).mean();
var post2020 = NO2_2020.filter(ee.Filter.gt('weeks',11)).mean();
//VIZUALISATION
var pretty_NO2_2020 = {"opacity":0.76,"min":0,"max":300,"palette":["ffb714","ff0000","4b00ff"]};
var pretty_NO2_dif = {"opacity":0.76,"min":-40,"max":40,"palette":["042eff","1d82ff","04b9ff","ff6c04","ff3823","bc0000"]};
var pretty_mobility = {"opacity":0.76,"min":0,"max":1, "palette":["00740e","40a32e","c2e01f"]};
var pretty_PM25 = {"min":0,"max":20,"palette":["18cee0","302dff","bc279c"]};
var pretty_PM25D = {"min":-8,"max":8,"palette":["001293","5c70ff","ff7862","ad0808"]};
var pretty_income = {"opacity":0.76,"min":4.3,"max":5.3,"palette":["e0c126","ff0000","bc279c","0300c4"]};
var pretty_hisp = {"opacity":0.76,"min":0,"max":1,"palette":["3b77ff","214780","000000"]};
var pretty_asia = {"opacity":0.76,"min":0,"max":0.5,"palette":["1ea748","17d6cd","1d2df7"]};
var pretty_black = {"opacity":0.76,"min":0,"max":0.2,"palette":["b2bc16","302dff"]};
var leftMap = ui.Map(); //create a new ui.Map()
var rightMap = ui.Map(); 
var centerMap = ui.Map();
leftMap.addLayer(ee.Image());
rightMap.addLayer(ee.Image());
rightMap.addLayer(CA);
leftMap.addLayer(CA);
centerMap.addLayer(ee.Image());
centerMap.addLayer(CA);
var linker = ui.Map.Linker([leftMap, rightMap, centerMap]);
leftMap.setCenter(-120.795, 37.137,6); 
centerMap.setCenter(-120.795, 37.137,6); 
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
centerMap.setControlVisibility(false);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
//make legend
var makeLegend=function(vis,from,to) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // create image of gradient
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'150x20'},  
    style: {margin:'6px 1px 0px 1px', position: 'bottom-center'}
  });
  //create labels of legend
  var panel2 = ui.Panel({
    widgets: [
      ui.Label(from), 
      thumb,
      ui.Label(to)
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal',margin:'2px 2px 2px 10px'}
  });
  // set position of panel the legend
  return panel2;
};
///add legend
// USER INTERACTION
var myclick = function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  CBG_label.setValue('loading...');
  Income_label.setValue('Median household income: -');
  Hisp_label.setValue('Share Hispanic: -');
  Asian_label.setValue('Share Asian: -');
  Black_label.setValue('Share Black: -');
  Mobility_label.setValue('Change in mobility (2020): -');
  Station_label.setValue('Number of PM 2.5 stations: -');
  PM25_label.setValue('Change in PM 2.5 (2020): -');
  PM25d_label.setValue('Change in PM 2.5 (2020-2019): -');
  NO2_label.setValue('Change in NO2 (2020): -');
  NO2d_label.setValue('Change in NO2 (2020-2019): -');
  var mytract = CBG_formated.filterBounds(point);
  if (mytract.size().getInfo()){
     var outline = ee.Image().byte().paint({
      featureCollection: mytract,
      width: 1
     }); 
     leftMap.layers().set(2,ui.Map.Layer(outline));
     rightMap.layers().set(2,ui.Map.Layer(outline));
     leftMap.centerObject(mytract,12);
     centerMap.centerObject(mytract,12);
     centerMap.layers().set(2,ui.Map.Layer(outline));
     mytract = mytract.first();
     mytract.get('NAME').evaluate(function(CBG){
       mytract.get('income').evaluate(function(Income){
       mytract.get('shr_H').evaluate(function(Hisp){
       mytract.get('shr_A').evaluate(function(Asian){ 
       mytract.get('shr_B').evaluate(function(Black){
       mytract.get('Mobility').evaluate(function(Mobility){
       mytract.get('nStations').evaluate(function(Station){
       mytract.get('PM25').evaluate(function(PM25v){
       mytract.get('PM25_dif').evaluate(function(PM25vd){  
       mytract.get('NO2').evaluate(function(NO2v){
       mytract.get('NO2_dif').evaluate(function(NO2vd){   
         Income_label.setValue('Median household income: $' + Income);
         CBG_label.setValue('Selected CBG: ' + CBG);
         Hisp_label.setValue('Share Hispanic: ' + Hisp);
         Asian_label.setValue('Share Asian: ' + Asian);
         Black_label.setValue('Share Black: ' + Black);
         Mobility_label.setValue('Change in mobility (2020): ' +Mobility);
         Station_label.setValue('Number of PM 2.5 stations: ' +Station);
         PM25_label.setValue('Change in PM 2.5 (2020): ' +PM25v);
         PM25d_label.setValue('Change in PM 2.5 (2020-2019): ' +PM25vd);
         NO2_label.setValue('Change in NO2 (2020): ' + NO2v);
         NO2d_label.setValue('Change in NO2 (2020-2019): ' + NO2vd);
       });});});});});});});});});});});
  }
  else{
   leftMap.layers().set(2,ui.Map.Layer(null));
   rightMap.layers().set(2,ui.Map.Layer(null));
   centerMap.layers().set(2,ui.Map.Layer(null));
   leftMap.setCenter(-120.795, 37.137,6); 
   centerMap.setCenter(-120.795, 37.137,6); 
   CBG_label.setValue('Please click WITHIN California');
     }
};
leftMap.onClick(myclick);
rightMap.onClick(myclick);
centerMap.onClick(myclick);
leftMap.style().set('cursor', 'crosshair');
rightMap.style().set('cursor', 'crosshair');
centerMap.style().set('cursor', 'crosshair');
var myPanel=ui.Panel({
style: {
width: '500px',
margin:'10px'
}
});
myPanel.add(ui.Label({
  value: "Disparate air pollution reductions during\nCalifornia’s COVID-19 economic shutdown",
  style: {
    whiteSpace: 'pre',
    fontWeight: 'bold',
    fontSize: '18px',
    margin:'10px 2px 2px 10px'
    }}));
var intro = "Dramatic reductions in air pollution following the COVID-19 economic slowdown in California provide a unique opportunity to observe air pollution distribution inequities that exist, unobserved, in our business-as-usual economy. " +
            "Here, we present in situ and satellite air pollution data, and census block group level demographic and mobility information, as used in our study to quantify environmental injustice in air pollution exposure. ";
myPanel.add(ui.Label({value: intro, style:{margin:'2px 2px 10px 10px', textAlign:'justify'}}));
myPanel.add(ui.Label({value: "Please select a variable to view on the map.",
                      style:{margin:'10px 2px 2px 10px', fontWeight: 'bold'}}));
var select_panel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
       style: {stretch: 'horizontal', margin:'2px 2px 2px 10px'}});
var choices = {
  'log(Median household income)': [income_img, income_img, pretty_income,'4.3', '5.3',centerMap],
  'Share Hispanic': [hisp_img, hisp_img, pretty_hisp,'0%', '100%',centerMap],
  'Share Asian': [asia_img, asia_img, pretty_asia,'0%', '50%',centerMap],
  'Share Black': [black_img, black_img, pretty_black,'0%', '20%',centerMap],
  'Mobility (2020)': [mobility_pre, mobility_post, pretty_mobility,'0%', '100%',splitPanel],
  'PM 2.5 (2020)': [PM25_pre, PM25_post, pretty_PM25,'0 µg/m³', '20 µg/m³',splitPanel],
  'PM 2.5 (2020-2019)': [PM25_D_pre, PM25_D_post, pretty_PM25D,'-8 µg/m³', '+8 µg/m³',splitPanel],
  'NO2 (2020)': [pre2020, post2020, pretty_NO2_2020,'0 µmol/m²', '300 µmol/m²',splitPanel],
  'NO2 (2020-2019)': [preD, postD, pretty_NO2_dif,'-40 µmol/m²', '+40 µmol/m²',splitPanel],
};
var select = ui.Select({
  items: Object.keys(choices),
  placeholder: 'Please select',
  style:{margin:'3px 5px 0px 0px'},
  onChange: function(key) {
    var current = ui.root.widgets().get(1);
    if (current != choices[key][5]){
      ui.root.widgets().set(1,choices[key][5]);}
   centerMap.layers().set(0, ui.Map.Layer(choices[key][0],choices[key][2]));
   leftMap.layers().set(0, ui.Map.Layer(choices[key][0],choices[key][2]));
   rightMap.layers().set(0, ui.Map.Layer(choices[key][1],choices[key][2]));
   var mylegend=makeLegend(choices[key][2],choices[key][3],choices[key][4]);
   select_panel.widgets().set(1, mylegend);
  }
});
select_panel.add(select).add(ui.Label());
myPanel.add(select_panel);
//myPanel.add(ui.Label({value:'',style:{margin:'0px 0px 0px 0px', fontSize: '2px'}}));
myPanel.add(ui.Label({value: "For air pollution (PM2.5, NO2) and mobility, use the slider to compare the pre-COVID-19 (Jan 1 - March 3) " +  
                                "and COVID-19 (March 20 - April 30) time periods. Variables marked '2020-2019' display the difference between air pollution in 2020 and 2019. Mobility is defined as average portion of the day spent away from home. ",
                      style:{margin:'2px 2px 10px 10px', fontSize: '10px',}})); 
myPanel.add(ui.Label({
  value: 'Please click within California for information on a specific census block group (CBG).',
  style: {
    fontWeight: 'bold',
    margin:'10px 2px 5px 10px'
    }}));
var CBG_label = ui.Label({value:'Selected CBG: -',style:{margin:'5px 2px 5px 10px'}}); 
myPanel.add(CBG_label);
var Income_label = ui.Label({value:'Median household income: -',style:{margin:'5px 2px 5px 10px'}});
myPanel.add(Income_label);
var Hisp_label = ui.Label({value:'Share Hispanic: -',style:{margin:'5px 2px 2px 10px'}});
myPanel.add(Hisp_label);
var Asian_label = ui.Label({value:'Share Asian: -',style:{margin:'2px 2px 2px 10px'}});
myPanel.add(Asian_label);
var Black_label = ui.Label({value:'Share Black: -',style:{margin:'2px 2px 5px 10px'}});
myPanel.add(Black_label);
//myPanel.add(ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
//    style: {stretch: 'horizontal',margin:'5px 2px 5px 10px'}}).add(Hisp_label).add(Asian_label).add(Black_label));
var Mobility_label = ui.Label({value:'Change in mobility (2020): -',style:{margin:'5px 2px 5px 10px'}});
myPanel.add(Mobility_label);
var Station_label = ui.Label({value:'Number of PM 2.5 stations: -',style:{margin:'5px 2px 2px 10px'}});
myPanel.add(Station_label);
var PM25_label = ui.Label({value:'Change in PM 2.5 (2020): -',style:{margin:'2px 2px 2px 10px'}});
myPanel.add(PM25_label);
var PM25d_label = ui.Label({value:'Change in PM 2.5 (2020-2019): -',style:{margin:'2px 2px 5px 10px'}});
myPanel.add(PM25d_label);
//myPanel.add(ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
//    style: {stretch: 'horizontal',margin:'2px 2px 5px 10px'}}).add(PM25_label).add(PM25d_label));
var NO2_label = ui.Label({value:'Change in NO2 (2020): -',style:{margin:'5px 2px 2px 10px'}});
myPanel.add(NO2_label);
var NO2d_label = ui.Label({value:'Change in NO2 (2020-2019): -',style:{margin:'2px 2px 10px 10px'}});
myPanel.add(NO2d_label);
//myPanel.add(ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
  //  style: {stretch: 'horizontal',margin:'5px 2px 5px 10px'}}).add(NO2_label).add(NO2d_label));
myPanel.add(ui.Label({value: "'Change' gives the observed, raw difference between the COVID and pre-COVID time period. Please see our main publication in Nature Sustainability (linked below) for full impact estimates.",
                      style:{margin:'2px 2px 10px 10px', fontSize: '10px'}})); 
var myButton = ui.Button({
  style:{margin:'10px 2px 10px 10px'},
  label: 'Back to default view',
  onClick: function(){leftMap.setCenter(-120.795, 37.137,6);
    centerMap.setCenter(-120.795, 37.137,6);
  }
});
myPanel.add(myButton);
var mylink = ui.Label({
  value: '10.1038/s41893-022-00856-1',
  targetUrl:'https://www.nature.com/articles/s41893-022-00856-1',
  style: {margin:'0px 10px 0px 2px', color: '#0a0fc9'  }});
var mymail = ui.Label({
  value: 'J. Burney',
  targetUrl:'mailto:jburney@ucsd.edu',
  style: {margin:'0px 10px 0px 2px', color: '#0a0fc9'  }});  
var by=ui.Panel({style:{margin:'10px 2px 10px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
by.add(ui.Label({value: 'DOI:',style: {fontWeight: 'bold',margin:'0px 0px 0px 2px'}}));
by.add(mylink);  
by.add(ui.Label({value: 'Contact:',style: {fontWeight: 'bold',margin:'0px 2px 0px 10px'}}));
by.add(mymail); 
myPanel.add(by);
myPanel.add(ui.Label({value: "Data Sources:",
                      style:{margin:'0px 2px 2px 10px', fontSize: '10px',fontWeight: 'bold'}})); 
myPanel.add(ui.Label({value: "Demographics: U.S. Census Bureau 2018 5-yearAmerican Community Survey (ACS).",
                      style:{margin:'2px 2px 2px 10px', fontSize: '10px'}})); 
myPanel.add(ui.Label({value: "Mobility: SafeGraph’s Social Distancing Metrics for 2020.",
                      style:{margin:'2px 2px 2px 10px', fontSize: '10px'}}));  
myPanel.add(ui.Label({value: "PM 2.5:  PurpleAir and the California Air Resources Board (CARB).",
                      style:{margin:'2px 2px 2px 10px', fontSize: '10px'}}));      
myPanel.add(ui.Label({value: "NO2:  Copernicus Sentinel-5 Precursor TROPOspheric Monitoring Instrument (TROPOMI) offline tropospheric NO2 column number density.",
                      style:{margin:'2px 2px 0px 10px', fontSize: '10px'}}));  
// Set the SplitPanel as the default - the only thing in root.
ui.root.widgets().reset([myPanel]);
ui.root.add(centerMap);
//ui.root.add(splitPanel);
leftMap.add(ui.Panel({style: {position: 'top-left'}}).add(ui.Label({value: 'pre-COVID-19',style: {fontWeight: 'bold'}})));
rightMap.add(ui.Panel({style: {position: 'top-right'}})
              .add(ui.Label({value: 'COVID-19',style: {fontWeight: 'bold'}})));
/**/