var image = ui.import && ui.import("image", "image", {
      "id": "users/sabenz/GlobalSUHI/SUHI_rgb"
    }) || ee.Image("users/sabenz/GlobalSUHI/SUHI_rgb"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/sabenz/GlobalSUHI/GHS_SUHI"
    }) || ee.FeatureCollection("users/sabenz/GlobalSUHI/GHS_SUHI");
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// load data /////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var M1_d = ee.Image("users/sabenz/GlobalSUHI/AHIDay_1").select(['b1'], ['M1_d']);//winter
var M2_d = ee.Image("users/sabenz/GlobalSUHI/AHIDay_2").select(['b1'], ['M2_d']);//spring
var M3_d = ee.Image("users/sabenz/GlobalSUHI/AHIDay_3").select(['b1'], ['M3_d']);//summer
var M4_d = ee.Image("users/sabenz/GlobalSUHI/AHIDay_4").select(['b1'], ['M4_d']);//fall
var M1_n = ee.Image("users/sabenz/GlobalSUHI/AHINight_1").select(['b1'], ['M1_n']);//winter
var M2_n = ee.Image("users/sabenz/GlobalSUHI/AHINight_2").select(['b1'], ['M2_n']);//spring
var M3_n = ee.Image("users/sabenz/GlobalSUHI/AHINight_3").select(['b1'], ['M3_n']);//summer
var M4_n = ee.Image("users/sabenz/GlobalSUHI/AHINight_4").select(['b1'], ['M4_n']);//fall
var X =ee.Image.cat([M1_d,M2_d,M3_d,M4_d,M1_n,M2_n,M3_n,M4_n]); //combines all images in one multiband image
///////////////////////////////////////////////////////////////////////////////////////////////////
//Prepare map/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
Map.centerObject(image, 2);
Map.style().set('cursor', 'crosshair');
Map.setControlVisibility(false);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
var image2=image.clipToCollection(table);
Map.addLayer(image);
Map.addLayer(outline, {palette: '000000'}, 'edges',false);
////////////////////////////////////////////////////////////////////////////////////////
/// add Legend///////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////
//function to create legend
var pretty = {"opacity":0.8,"min":-5,"max":5,"palette":["0138ff","3bd9ff","fff241","ff712b","ff0000"]};
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // create image of gradient
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  //create title of legend
  var panel1 = ui.Panel({
    widgets: [
      ui.Label('10-Year Mean Surface ΔT')
    ]
  });
  //create labels of legend
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('-5 °C'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('+5 °C')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
  // set position of panel the legend
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
  return legend.add(panel1).add(thumb).add(panel2);
}
///add legend
Map.add(makeLegend(pretty));
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Prepare Select //////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
var scale = {
  'Pixel-based analysis': 'A',
  'City-based analysis': 'C',
};
var mydata = {
  'txt' : 'Click on map for seasonal and diurnal variations.',
  'wrong': 'Please click on a land pixel with data.',
  'what': 'A'
};
var onChange = function (key)
{
if (scale[key] == 'A'){
  mydata['txt']='Click on map for seasonal and diurnal variations.';
  mydata['wrong']='Please click on a land pixel with data.';
  mydata['what']='A';
  Map.layers().set(0, ui.Map.Layer(image));
  Map.layers().get(1).setShown(false);
  panel.widgets().set(3, ui.Label('Click on map for seasonal and diurnal variations.'));
}
else {
  mydata['txt']='Click on any city for mean seasonal and diurnal variations.';
  mydata['wrong']='Please click on a city.';
  mydata['what']='C';
  Map.layers().set(0, ui.Map.Layer(image2));
  Map.layers().get(1).setShown(true);
  panel.widgets().set(3, ui.Label('Click on any city for mean seasonal and diurnal variations.'));
}
};
var select = ui.Select({
  items: Object.keys(scale),
  onChange: onChange,
  value: 'Pixel-based analysis'
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Prepare Panel //////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
var panel = ui.Panel({style: {width: '400px',
  position: 'middle-right'}});
 //prepare heading
  panel.add(ui.Label({
  value: 'Surface Temperature Anomalies ΔT',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    }}));
  panel.add(ui.Label({
  value: '2004 - 2014',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    }}));    
 panel.add(select);
//prepare plot
panel.widgets().set(3, ui.Label(mydata['txt']));
var dataTable = {
  cols: [{id: 'Day', type: 'number'},
         {id: 'winter', label: 'winter', type: 'number'}],
  rows: [{c: [{v:null}, {v:null}]}]
};
var options = {
    'width':'300px',
     'height':'350px',
     legend: {position: 'none'},
     title:"Location: None Selected",
  hAxis: {title: 'Daytime ΔT [°C]',
     ticks: [-15,-10,-8,-6,-4,-2,0,2,4,6,8,10,15],
    viewWindow: {
        min: -3,
        max: 7
    }},
  vAxis: {title: 'Nighttime ΔT [°C]',
  ticks: [-15,-10,-8,-6,-4,-2,0,2,4,6,8,10,15],
    viewWindow: {
        min: -3,
        max: 7,
         }},
};
var chart = new ui.Chart(dataTable, 'LineChart',options);
panel.widgets().set(4, chart);
//prepare legend of plot
// Creates and styles 1 row of the legend.
var LegendPlot=ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var makedot = function(color) {
      // Create the label that is actually the colored box.
      return ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          margin: '15px 0 0 25px',
          padding: '2px'
        }
      });
};
LegendPlot.add(makedot('32CD32')).add(ui.Label('Spring'));
LegendPlot.add(makedot('CC0066')).add(ui.Label('Summer'));
LegendPlot.add(makedot('FF8000')).add(ui.Label('Fall'));
LegendPlot.add(makedot('0000CC')).add(ui.Label('Winter'));
var LegendPlot_mean=ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
LegendPlot_mean.add(makedot('000000')).add(ui.Label('Annual mean ΔT'));
panel.add(LegendPlot_mean);
panel.add(LegendPlot);
var DOI=ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
});
DOI.add(ui.Label({
  value: 'DOI:',
  style: {
    fontWeight: 'bold',
    }}));
var mylink3 = ui.Label({
  value: '10.1088/1748-9326/ac0661',
  targetUrl:'https://doi.org/10.1088/1748-9326/ac0661',
  });    
DOI.add(mylink3);
panel.add(DOI);
var mylink2 = ui.Label({
  value: 'Susanne A Benz',
  targetUrl:'mailto:sabenz@ucsd.edu',
  });
var mylink = ui.Label({
  value: 'Big Pixel Initiative, UCSD',
  targetUrl:'http://bigpixel.ucsd.edu/',
  });
var bye=ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
});
bye.add(ui.Label({
  value: 'Contact:',
  style: {
    fontWeight: 'bold',
    }}));
bye.add(mylink2);
bye.add(mylink);
panel.add(bye);
Map.add(panel);
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////define what happens on click imediatly///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//get graph of UHIIs at point location
Map.onClick(function(coords) {
  panel.widgets().set(3, ui.Label('Loading ...'));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(2, ui.Map.Layer(point, {color: '8b0000'}));
//Define what happens if Scale C
if (mydata['what']=='C'){
 var region=table.filterBounds(point).first();
  if (region.getInfo()===null){
   panel.widgets().set(3, ui.Label({value: mydata['wrong'], style: {
    fontWeight: 'bold'}})); 
  }
  else{
  //wait for data to load
region.get('M1_d').evaluate(function(M1_d) {
	region.get('M2_d').evaluate(function(M2_d) {
		region.get('M3_d').evaluate(function(M3_d) {
			region.get('M4_d').evaluate(function(M4_d) {
region.get('M1_n').evaluate(function(M1_n) {
	region.get('M2_n').evaluate(function(M2_n) {
		region.get('M3_n').evaluate(function(M3_n) {
			region.get('M4_n').evaluate(function(M4_n) {
region.get('UC_NM_MN').evaluate(function(location) {
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////plot daytime-nighttime UHII chart//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
panel.widgets().set(3, ui.Label(mydata['txt']));
var Md=(M2_d+M3_d+M4_d+M1_d)/4;
var Mn=(M2_n+M3_n+M4_n+M1_n)/4;
var dataTable = {
  cols: [{id: 'Day', type: 'number'},
         {id: 'Night', label: ' ', type: 'number'},
         {id: 'spring', label: 'spring', type: 'number'},
         {id: 'summer', label: 'summer ', type: 'number'},
         {id: 'fall', label: 'fall', type: 'number'},
         {id: 'winter', label: 'winter', type: 'number'},
         {id: 'mean', label: 'annual mean', type: 'number'}],
  rows: [{c: [{v:M2_d}, {v:M2_n}, {v:M2_n}, {v:null}, {v:null}, {v:null}, {v:null}]},
         {c: [{v:M3_d}, {v:M3_n}, {v:null}, {v:M3_n}, {v:null}, {v:null}, {v:null}]},
         {c: [{v:M4_d}, {v:M4_n}, {v:null}, {v:null}, {v:M4_n}, {v:null}, {v:null}]},
         {c: [{v:M1_d}, {v:M1_n}, {v:null}, {v:null}, {v:null}, {v:M1_n}, {v:null}]},
         {c: [{v:Md}, {v:null}, {v:null}, {v:null}, {v:null}, {v:null}, {v:Mn}]}]
};
var axisMIN=Math.floor(Math.min(M2_d,M2_n,M3_d,M3_n,M4_d,M4_n,M1_d,M1_n,-2))-1;
var axisMAX=Math.ceil(Math.max(M2_d,M2_n,M3_d,M3_n,M4_d,M4_n,M1_d,M1_n,6))+1;
var options = {
     'width':'300px',
     'height':'350px',
   title:location,
   series: {0:{color: 'black'},
     1: {pointSize: 5, color: '32CD32', pointShape: { type: 'square'},lineWidth: 0},
   2: {pointSize: 5, color: 'CC0066', pointShape: { type: 'square'},lineWidth: 0},
   3: {pointSize: 5, color: 'FF8000', pointShape: { type: 'square'},lineWidth: 0},
   4: {pointSize: 5, color: '0000CC', pointShape: { type: 'square'},lineWidth: 0},
   5: {pointSize: 8, color: '000000', pointShape: { type: 'square'},lineWidth: 0}
   },
  hAxis: {title: 'Daytime ΔT [°C]',
     ticks: [-15,-10,-8,-6,-4,-2,0,2,4,6,8,10,15],
    viewWindow: {
        min: axisMIN,
        max: axisMAX
    }},
  vAxis: {title: 'Nighttime ΔT [°C]',
  ticks: [-15,-10,-8,-6,-4,-2,0,2,4,6,8,10,15],
    viewWindow: {
        min: axisMIN,
        max: axisMAX,
    }},
  legend: {position: 'none'},
};
var chart = ui.Chart(dataTable, 'LineChart',options);
panel.widgets().set(4, chart);
//// close the "/wait for data to load" thing 
});});});});});});});});});
}//closes else
}// close if C
////////////////////////////////SCALE A////////////////////////////////////
else {
var location = 'Location: ' + coords.lon.toFixed(2) + ' Lon, ' +
                  coords.lat.toFixed(2)+' Lat' ;
//add point to map
var TData=X.sample(point, 1000).first();
  if (TData.getInfo()===null){
   panel.widgets().set(3, ui.Label({value: mydata['wrong'], style: {
    fontWeight: 'bold'}})); 
  }
  else{
//retriev data
//wait for data to load
TData.get('M1_d').evaluate(function(M1_d) {
	TData.get('M2_d').evaluate(function(M2_d) {
		TData.get('M3_d').evaluate(function(M3_d) {
			TData.get('M4_d').evaluate(function(M4_d) {
TData.get('M1_n').evaluate(function(M1_n) {
	TData.get('M2_n').evaluate(function(M2_n) {
		TData.get('M3_n').evaluate(function(M3_n) {
			TData.get('M4_n').evaluate(function(M4_n) {
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////plot daytime-nighttime UHII chart//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
panel.widgets().set(3, ui.Label(mydata['txt']));
var Md=(M2_d+M3_d+M4_d+M1_d)/4;
var Mn=(M2_n+M3_n+M4_n+M1_n)/4;
var dataTable = {
  cols: [{id: 'Day', type: 'number'},
         {id: 'Night', label: ' ', type: 'number'},
         {id: 'spring', label: 'spring', type: 'number'},
         {id: 'summer', label: 'summer ', type: 'number'},
         {id: 'fall', label: 'fall', type: 'number'},
         {id: 'winter', label: 'winter', type: 'number'},
         {id: 'mean', label: 'annual mean', type: 'number'}],
  rows: [{c: [{v:M2_d}, {v:M2_n}, {v:M2_n}, {v:null}, {v:null}, {v:null}, {v:null}]},
         {c: [{v:M3_d}, {v:M3_n}, {v:null}, {v:M3_n}, {v:null}, {v:null}, {v:null}]},
         {c: [{v:M4_d}, {v:M4_n}, {v:null}, {v:null}, {v:M4_n}, {v:null}, {v:null}]},
         {c: [{v:M1_d}, {v:M1_n}, {v:null}, {v:null}, {v:null}, {v:M1_n}, {v:null}]},
         {c: [{v:Md}, {v:null}, {v:null}, {v:null}, {v:null}, {v:null}, {v:Mn}]}]
};
var axisMIN=Math.floor(Math.min(M2_d,M2_n,M3_d,M3_n,M4_d,M4_n,M1_d,M1_n,-2))-1;
var axisMAX=Math.ceil(Math.max(M2_d,M2_n,M3_d,M3_n,M4_d,M4_n,M1_d,M1_n,6))+1;
var options = {
     'width':'300px',
     'height':'350px',
   title:location,
   series: {0:{color: 'black'},
     1: {pointSize: 5, color: '32CD32', pointShape: { type: 'square'},lineWidth: 0},
   2: {pointSize: 5, color: 'CC0066', pointShape: { type: 'square'},lineWidth: 0},
   3: {pointSize: 5, color: 'FF8000', pointShape: { type: 'square'},lineWidth: 0},
   4: {pointSize: 5, color: '0000CC', pointShape: { type: 'square'},lineWidth: 0},
   5: {pointSize: 8, color: '000000', pointShape: { type: 'square'},lineWidth: 0}
   },
  hAxis: {title: 'Daytime ΔT [°C]',
     ticks: [-15,-10,-8,-6,-4,-2,0,2,4,6,8,10,15],
    viewWindow: {
        min: axisMIN,
        max: axisMAX
    }},
  vAxis: {title: 'Nighttime ΔT [°C]',
  ticks: [-15,-10,-8,-6,-4,-2,0,2,4,6,8,10,15],
    viewWindow: {
        min: axisMIN,
        max: axisMAX,
    }},
  legend: {position: 'none'},
};
var chart = new ui.Chart(dataTable, 'LineChart',options);
panel.widgets().set(4, chart);
//// close the "/wait for data to load" thing 
});});});});});});});});  
}//close else
}///close else B
});