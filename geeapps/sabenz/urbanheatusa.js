var data = ui.import && ui.import("data", "table", {
      "id": "users/sabenz/AHI_EJ_reduceRegions/perTract2"
    }) || ee.FeatureCollection("users/sabenz/AHI_EJ_reduceRegions/perTract2"),
    counties = ui.import && ui.import("counties", "table", {
      "id": "users/sabenz/AHI_EJ_reduceRegions/perCounty"
    }) || ee.FeatureCollection("users/sabenz/AHI_EJ_reduceRegions/perCounty");
var Day = ee.Image().byte().paint({
  featureCollection: data,
  color: 'day'
 }); 
var Night = ee.Image().byte().paint({
  featureCollection: data,
  color: 'night'
 });
var Black = ee.Image().byte().paint({
  featureCollection: data,
  color: 'Black'
 });
 var White = ee.Image().byte().paint({
  featureCollection: data,
  color: 'White'
 });
 var Hisp = ee.Image().byte().paint({
  featureCollection: data,
  color: 'Hispanic'
 });
 var Asian = ee.Image().byte().paint({
  featureCollection: data,
  color: 'Asian'
 }); 
var Cit = ee.Image().byte().paint({
  featureCollection: data,
  color: 'nonUS'
 });
var HS = ee.Image().byte().paint({
  featureCollection: data,
  color: 'Edu'
 });
var kids = ee.Image().byte().paint({
  featureCollection: data,
  color: 'SP'
 });
var age = ee.Image().byte().paint({
  featureCollection: data,
  color: 'Age'
 }); 
var I = ee.Image().byte().paint({
  featureCollection: data,
  color: 'Income'
 }); 
 I=I.log10();
var countiesoutline = ee.Image().byte().paint({
  featureCollection: counties,
  color: '000000',
  width: 1
});
//VIZUALISATION
var pretty_DT = {"opacity":0.76,"min":-5,"max":5,"palette":["0138ff","3bd9ff","fff241","ff712b","ff0000"]};
var pretty_income = {"opacity":0.76,"min":4,"max":5,"palette":["e0c126","ff0000","bc279c","0300c4"]};
var pretty_share = {"opacity":0.76,"min":0,"max":1,"palette":["ffbafd","c89fff","ae93ff","8374ff","4374ff","1648ff","01409f","000649","000000"]};
var currenttract = counties.first();
Map.addLayer(countiesoutline);
Map.setCenter(-100.248, 40.806,5);
Map.setControlVisibility(false);
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
var myPanel=ui.Panel({
style: {
width: '550px',
margin:'10px'
}
});
myPanel.add(ui.Label({
  value: "Widespread race and class disparities in surface urban heat extremes across the United States",
  style: {
    fontWeight: 'bold',
    fontSize: '20px',
    margin:'10px 2px 2px 10px'
    }}));
var intro = "Elevated summer temperatures affect the health and wellbeing of urban populations. " +
            "Here, we present extreme summer surface temperature anomalies (ΔT = urban temperatures - rural temperatures) "+
            "and census tract level demographic information as used in our study (see link below) to quantify environmental injustice at the county-level in the contiguous US. "+
            "Please be aware that the analysis in our large-scale study includes only counties with more than 10 census tracts, "+
            "as low numbers of tracts can be statistically misleading.";
myPanel.add(ui.Label({value: intro, style:{margin:'2px 10px 10px 10px', textAlign:'justify'}}));
myPanel.add(ui.Label({value: "Select a variable to view on the map.",
                      style:{margin:'10px 2px 2px 10px', fontWeight: 'bold',fontSize: '16px'}}));
var select_panel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),
       style: {stretch: 'horizontal', margin:'2px 2px 2px 10px'}});
var choices = {
  'Summer day ΔT': [Day, pretty_DT,'-5°C', '+5°C'],
  'Summer night ΔT': [Night, pretty_DT,'-5°C', '+5°C'],
  'Share Black': [Black, pretty_share,'0%', '100%'],
  'Share non-Hispanic White': [White, pretty_share,'0%', '100%'],
  'Share Asian': [Asian, pretty_share,'0%', '100%'],
  'Share Hispanic': [Hisp, pretty_share,'0%', '100%'],
  'Share non-US citizen': [Cit, pretty_share,'0%', '100%'],
  'Share w/ high school diploma of less': [HS, pretty_share,'0%', '100%'],
  'Share kids w/ single parent': [age, pretty_share,'0%', '100%'],  
  'Share 75 years or older': [kids, pretty_share,'0%', '100%'],
  'Median income': [I, pretty_income,'$10,000', '$100,000'],
};
var select = ui.Select({
  items: Object.keys(choices),
  placeholder: 'Please select',
  style:{margin:'3px 5px 0px 0px'},
  onChange: function(key) {
   Map.layers().set(1, ui.Map.Layer(choices[key][0],choices[key][1]));
   var mylegend=makeLegend(choices[key][1],choices[key][2],choices[key][3]);
   select_panel.widgets().set(1, mylegend);
  }
});
select_panel.add(select).add(ui.Label());
myPanel.add(select_panel);
// set position of panel
var chartpanel = ui.Panel({
    style:{stretch: 'horizontal'},
    layout: ui.Panel.Layout.flow('horizontal'),
});
chartpanel.add(ui.Label({style: {stretch: 'horizontal'}}));
chartpanel.add(ui.Label('loading...'));
chartpanel.add(ui.Label({style: {stretch: 'horizontal'}}));
var spatialFilter = ee.Filter.equals({
  leftField: 'GEOID',
  rightField: 'county'
});
var makechart = function(tract,txt){
  chartpanel.widgets().set(1, ui.Label('loading...'));
  //var mydata = data.filterBounds(tract.geometry());
  var mydata = data.filter(ee.Filter.eq('county',tract.get('GEOID')));
     var x = ee.List(mydata.aggregate_array(txt));
     x = x.reduce(ee.Reducer.percentile([25,50,75]));
     x = ee.Dictionary(x);
     var A = mydata.filter(ee.Filter.lte(txt,x.get('p25')));
     var d1 = A.aggregate_mean('day'); 
     var n1 = A.aggregate_mean('night');
     A = mydata.filter(ee.Filter.and(ee.Filter.gt(txt,x.get('p25')),ee.Filter.lte(txt,x.get('p50'))));
     var d2 = A.aggregate_mean('day'); 
     var n2 = A.aggregate_mean('night');
     A = mydata.filter(ee.Filter.and(ee.Filter.gt(txt,x.get('p50')),ee.Filter.lte(txt,x.get('p75'))));
     var d3 = A.aggregate_mean('day'); 
     var n3 = A.aggregate_mean('night');
     A = mydata.filter(ee.Filter.gt(txt,x.get('p75')));
     var d4 = A.aggregate_mean('day'); 
     var n4 = A.aggregate_mean('night');
     d1.evaluate(function(d1){
       d2.evaluate(function(d2){
         d3.evaluate(function(d3){
           d4.evaluate(function(d4){
         n1.evaluate(function(n1){
       n2.evaluate(function(n2){
         n3.evaluate(function(n3){
           n4.evaluate(function(n4){         
     var dataTable = {
     cols: [{id: 'Day', type: 'number'},
         {id: 'Night1', label: 'Q1', type: 'number'},
         {id: 'Night2', label: 'Q2', type: 'number'},
         {id: 'Night3', label: 'Q3', type: 'number'},
         {id: 'Night4', label: 'Q4', type: 'number'}],
      rows: [{c: [{v:d1}, {v:n1}, {v:null}, {v:null}, {v:null}]},
         {c: [{v:d2}, {v:null}, {v:n2}, {v:null}, {v:null}]},
         {c: [{v:d3}, {v:null}, {v:null}, {v:n3}, {v:null}]},
         {c: [{v:d4}, {v:null}, {v:null}, {v:null}, {v:n4}]}]
      };
    var axisMIN=Math.floor(Math.min(d1,d2,d3,d4,n1,n2,n3,n4,0))-1;
    var axisMAX=Math.ceil(Math.max(d1,d2,d3,d4,n1,n2,n3,n4,1))+1;
    var options = {
      chartArea:{left:60, top:10, bottom: 60},//, width: "50%", height: "100%"},
     width:'300px',
     height:'300px',
   series: {0: {pointSize: 5, pointShape:'square', color: '66B2FF', lineWidth: 0},
   1: {pointSize: 5,pointShape:'square',  color: 'B266FF', lineWidth: 0},
   2: {pointSize: 5,pointShape:'square', color: 'FF66B2', lineWidth: 0},
   3: {pointSize: 5,pointShape:'square', color: 'FFB266', lineWidth: 0}
   },
  hAxis: {title: 'Summer day ΔT [°C]',
     ticks: [-15,-10,-8,-6,-4,-2,-1,0,1,2,4,6,8,10,15],
    viewWindow: {
        min: axisMIN,
        max: axisMAX
    }},
  vAxis: {title: 'Summer night ΔT [°C]',
  ticks: [-15,-10,-8,-6,-4,-2,-1,0,1,2,4,6,8,10,15],
    viewWindow: {
        min: axisMIN,
        max: axisMAX,
    }},
  legend: {position: 'none'},
};
var chart = ui.Chart(dataTable, 'LineChart',options);
chartpanel.widgets().set(1, chart);
           });});});});});});});});};
myPanel.add(ui.Label({
  value: 'Select a county. Point and click within an outlined county on the map.',
  style: {
    fontWeight: 'bold',
    margin:'10px 2px 5px 10px',fontSize: '16px'
    }}));
myPanel.add(ui.Label({value: "All values are give as median (25th; 75th percentile).",
                      style:{margin:'2px 2px 10px 10px'}}));   
var County_label = ui.Label({value:'Selected county: -',style:{margin:'5px 2px 2px 10px', fontWeight: 'bold'}}); 
myPanel.add(County_label);
var Tracts_label = ui.Label({value:'Tracts with data: -',style:{margin:'2px 2px 2px 10px'}}); 
myPanel.add(Tracts_label);
var Pop_label = ui.Label({value:'Total population: -',style:{margin:'2px 2px 5px 10px'}}); 
myPanel.add(Pop_label);
var Day_label = ui.Label({value:'Summer day ΔT : -',style:{margin:'5px 2px 2px 10px'}});
myPanel.add(Day_label);
var Night_label = ui.Label({value:'Summer night ΔT: -',style:{margin:'2px 2px 5px 10px'}});
myPanel.add(Night_label);
myPanel.add(ui.Label({value: "Select a demographic. The chart below displays the relationship between summer surface temperature and that demographic in the selected county, by quartile.",
                      style:{margin:'10px 2px 2px 10px', fontWeight: 'bold',fontSize: '16px'}}));
var choices2 = {
  'Share Black': ['black','Black','Least Black', 'Most Black'],
  'Share non-Hispanic White': ['white','White','Least White', 'Most White'],
  'Share Hispanic': ['hisp','Hispanic','Least Hispanic', 'Most Hispanic'],
  'Share Asian': ['asian','Asian','Least Asian', 'Most Asian'],
  'Share non-US-citizen': ['cit','nonUS','Fewer non-US-citizens', 'More non-US-citizens'],
  'Share w/ high school diploma of less': ['HS','Edu','Most educated', 'Least educated'],
  'Share 75 or older': ['alt','Age','Youngest', 'Oldest'],
  'Share kids w/ single parent': ['SP','SP','Fewer single parents', 'More single parents'],
  'Median income': ['Income','Income','Poorest', 'Richest'],
};
var currentcounty = 'Share Black';
var lowlabel = ui.Label('Least Black');
var highlabel = ui.Label('Most Black');
var select2 = ui.Select({
  items: Object.keys(choices2),
  placeholder: 'Please select',
  style:{margin:'2px 2px 10px 10px'},
  onChange: function(key) {
    currentcounty = key;
    makechart(currenttract,choices2[key][1]);
    var b = choices2[key][0];
    currenttract.get(b).evaluate(function(b){
   Black_label.setValue(key+':  '+ b);
   lowlabel.setValue(choices2[key][2]);
   highlabel.setValue(choices2[key][3]);
    });
  }
});
myPanel.add(select2);
var Black_label = ui.Label({value:'Share Black: -',style:{margin:'5px 2px 5px 10px'}});
myPanel.add(Black_label);
// set position of panel
var legendpanel = ui.Panel({
    style:{margin:'-9px 10px 0px 10px',stretch: 'horizontal'},
    layout: ui.Panel.Layout.flow('horizontal'),
});
// Add the title to the panel
legendpanel.add(ui.Label({style: {stretch: 'horizontal'}}));
legendpanel.add(lowlabel);
var makedot = function(color){
return ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '3px',
          margin: '13px 10px 0px 10px'
        }
});};
legendpanel.add(makedot('66B2FF'));
legendpanel.add(makedot('B266FF'));
legendpanel.add(makedot('FF66B2'));
legendpanel.add(makedot('FFB266'));
legendpanel.add(highlabel);
legendpanel.add(ui.Label({style: {stretch: 'horizontal'}}));
myPanel.add(chartpanel);  
myPanel.add(legendpanel);
var myclick = function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  County_label.setValue('loading...');
  Tracts_label.setValue('Tracts with data: -');
  Pop_label.setValue('Total population: -');
  Day_label.setValue('Summer day ΔT: -');
  Night_label.setValue('Summer night ΔT: -');
  Black_label.setValue(currentcounty +': -');
  var mytract = counties.filterBounds(point);
  if (mytract.size().getInfo()){
     var outline = ee.Image().byte().paint({
      featureCollection: mytract,
      width: 4
     }); 
     Map.layers().set(2,ui.Map.Layer(outline));
     //Map.centerObject(mytract,7);
     currenttract = mytract.first();
     makechart(currenttract,choices2[currentcounty][1]);
     var tracts = currenttract.get('tracts');
     tracts = ee.Algorithms.If(ee.Number(tracts).gt(9),ee.String(tracts),ee.String(tracts).cat(' - WARNING  - very few tracts! Results might not be meaningful.'));
     currenttract.get('NAME').evaluate(function(CBG){
       tracts.evaluate(function(tracts){
       currenttract.get('day').evaluate(function(d){
       currenttract.get('Pop').evaluate(function(pop){
         currenttract.get('night').evaluate(function(n){  
         var b = choices2[currentcounty][0];
       currenttract.get(b).evaluate(function(b){
         County_label.setValue('Selected county: '+ CBG);
         Tracts_label.setValue('Tracts with data: '+ tracts);
         Pop_label.setValue('Total population: '+ pop);
         Day_label.setValue('Summer day ΔT: ' + d);
         Night_label.setValue('Summer night ΔT: ' + n);
         Black_label.setValue(currentcounty+':  '+ b);
       });});});});});});
  }
  else{
   Map.layers().set(2,ui.Map.Layer(null));
   chartpanel.widgets().set(1, ui.Label('No county selected'));
   Map.setCenter(-100.248, 40.806,5); 
   County_label.setValue('Please click WITHIN an outlined county');
     }
};
Map.onClick(myclick);
Map.style().set('cursor', 'crosshair');
var myButton = ui.Button({
  style:{margin:'10px 2px 10px 10px'},
  label: 'Zoom to US',
  onClick: function(){Map.setCenter(-100.248, 40.806,5);}
});
myPanel.add(myButton);
var mylink = ui.Label({
  value: "Publication at Earth's Future",
  targetUrl:'https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2021EF002016',
  style: {margin:'0px 10px 0px 2px'  }});
var mymail = ui.Label({
  value: 'Susanne Benz (UCSD)',
  targetUrl:'mailto:sabenz@ucsd.edu',
  style: {margin:'0px 10px 0px 2px'  }});  
var by=ui.Panel({style:{margin:'10px 2px 10px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
by.add(ui.Label({value: 'More Info:',style: {fontWeight: 'bold',margin:'0px 0px 0px 2px'}}));
by.add(mylink);  
by.add(ui.Label({value: 'Contact:',style: {fontWeight: 'bold',margin:'0px 2px 0px 10px'}}));
by.add(mymail); 
myPanel.add(by);
myPanel.add(ui.Label({value: "Data Sources:",
                      style:{margin:'0px 2px 2px 10px', fontSize: '12px',fontWeight: 'bold'}})); 
myPanel.add(ui.Label({value: "Demographics: U.S. Census Bureau 2014 5-year American Community Survey (ACS).",
                      style:{margin:'2px 2px 2px 10px', fontSize: '12px'}})); 
myPanel.add(ui.Label({value: "ΔT: based on MODIS LST V6 products MOD11A1 and MYD11A1, 1 June - 31 August, 2010 - 2014.",
                      style:{margin:'2px 2px 2px 10px', fontSize: '12px'}}));  
myclick({lon:-116.81386623948381,lat:32.986617177888135});
select.setValue('Summer day ΔT');
select2.setValue('Median income');
ui.root.add(myPanel);
/**/