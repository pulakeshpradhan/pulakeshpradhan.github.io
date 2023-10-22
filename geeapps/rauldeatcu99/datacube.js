///////////////////////////////////////////////////////////
//A U T H O R://///////////////////////////////////////////
//R A U L   D E A T C U////////////////////////////////////
///////////////////////////////////////////////////////////
//W E S T   U N I V E R S I T Y   O F   T I M I S O A R A//
///////////////////////////////////////////////////////////
var credits1 = ui.Label('Author: Raul Deatcu', {position:'bottom-left', fontSize:'13px',fontWeight:'bold', color:"black" , backgroundColor: '16ECDA00'});
var credits2 = ui.Label('West University of Timisoara', {position:'bottom-left', fontSize:'13px',fontWeight:'bold', color:"black" , backgroundColor: '16ECDA00'});
Map.add(credits2);
Map.add(credits1);
var panel2 = ui.Panel([ui.Label({
    value: 'Animations and charts will be displayed here',
    style: {fontWeight: 'bold', backgroundColor: '16ECDA00'} 
  })]);
panel2.style().set({
  width: '400px',
  height: '530px',
  position: 'bottom-left',
  backgroundColor: 'ffffff90'
});
Map.add(panel2);
var panel3 = ui.Panel([
  ui.Label({
    value: '1. Select your dataset for analysis',
    style: {fontWeight: 'bold', color: 'black'} 
  })])
panel3.style().set({
  width: '400px'
});
 var panel4 = ui.Panel([ui.Label({
    value: 'Slider button',
    style: {fontWeight: 'bold', color: 'black', fontSize: '10px'} 
  })]);
panel4.style().set({
  width: '90px',
  height: '90px',
  position: 'top-right'
});
Map.add(panel4);
 var legenda = ui.Panel([ui.Label({
    value: 'Scene classification map legend',
    style: {fontWeight: 'bold', color: 'black', fontSize: '15px'} 
  })]);
legenda.style().set({
  width: '150px',
  height: '300px',
  position: 'top-right'
});
var sen2Class = "Sentinel 2 scene classification map"
var waterClassHistory = "Water classification history"
var brdf = "BRDF Albedo"
var burned = "Burned area"
var climate = "Climate"
var evapotranspiration = "Evapotranspiration"
var butSelect = ui.Select({
  items: [sen2Class, waterClassHistory, brdf, burned, climate, evapotranspiration],
  placeholder: 'Select your data set...',
  onChange: options
})
panel3.add(butSelect)
function options(){
var option = butSelect.getValue()
if (option == sen2Class){
  var step0 = ui.Label({
    value: '  ____________________________________________________________',
    style: {fontWeight: 'bold', color: 'black'} 
  })
  var step1 = ui.Label({
    value: '2. Select your area of interest (AOI) by drawing a polygon/rectangle.',
    style: {fontWeight: 'bold', color: 'black'} 
  })
  var step12 = ui.Label({
    value: '  ____________________________________________________________',
    style: {color: 'black', textAlign: 'center'} 
  })
  var step2 = ui.Label({
    value: '3. Define timeframe as YYYY-MM-DD. Example: 2014-05-26',
    style: {fontWeight: 'bold', color: 'black'} 
  })
  panel3.add(step0)
  panel3.add(step1)
  panel3.add(step12)
  panel3.add(step2)
Map.drawingTools().onDraw(function (geometry) {
  var dataset = ee.ImageCollection("COPERNICUS/S2_SR")
                  .filterDate(prompt('Define FIRST date of timeframe as YYYY-MM-DD (Example: 2020-07-29)'),
                  prompt('Define SECOND date of timeframe as YYYY-MM-DD (Example: 2020-07-29)'))
                  .filterBounds(geometry)
print(dataset)
Map.add(legenda)
var listImgColl = dataset.toList(dataset.size())
print(listImgColl.get(0))
var img = ee.Image(listImgColl.get(0))
Map.addLayer(img.clip(geometry))
var viz = {
  bands: ['SCL'],
  min: 1,
  max: 11,
  palette: ['ff0004','868686','774b0a','10d22c','ffff52','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9']
};
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);//
var chart = ui.Chart.image.series({                                                 
    imageCollection: dataset.select('SCL'),                                        
    region: click_point,                                                          
    reducer: ee.Reducer.last()                                                   
    }).setOptions({                                                             
      interpolateNulls: true,                                                  
      lineWidth: 3,                                                           
      pointSize: 16,                                                         
      title: 'Class over region',                                           
      vAxis: {title: 'Class'},                                             
      hAxis: {title: 'Date', format: 'YYYY-MM-dd', gridlines: {count: 20}}
    })                                                                   
panel2.add(chart)})                                                     
var slider = ui.Slider({
  min: 1,
  max: 11,
  step: 1,
  style: {stretch: 'horizontal'},
  onChange: upLayer
})
var slider2 = ui.Slider({
  min: 1,
  max: 11,
  step: 1,
  style: {stretch: 'horizontal'},
  onChange: upLayer
})
  var esc1 = ui.Label({
    value: '  ____________________________________________________________',
    style: {color: 'black', textAlign: 'center'} 
  })
  var esc2 = ui.Label({
    value: '  ____________________________________________________________',
    style: {color: 'black', textAlign: 'center'} 
  })
  var pasul2 = ui.Label({
    value: '4. Filter by scene classification map (SCL) classes',
    style: {fontWeight: 'bold', color: 'black'} 
  })
    var pasul2_1 = ui.Label({
    value: 'Example: ',
    style: {fontWeight: 'bold', color: 'black'} 
  })
  var pasul2_2 = ui.Label({
    value: 'If you want vegetation class (4) drag both slider to 4. ',
    style: {color: 'black'} 
  })
  var pasul2_3 = ui.Label({
    value: 'If you want vegetation (4), bare soil (5) and water class (6), drag first slider to 4, and second to 6. ',
    style: {color: 'black'} 
  })
  var pasul2_4 = ui.Label({
    value: 'Then press button with ⛛ sign from "Slider button panel" to load your categories ',
    style: {color: 'black'} 
  })
var l1 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'ff0004'})
legenda.add(l1)
var l1m = ui.Label('(1) Saturated or defective', {fontSize:'10px'})
legenda.add(l1m)
var l2 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'868686'})
legenda.add(l2)
var l2m = ui.Label('(2) Dark Area pixels', {fontSize:'10px'})
legenda.add(l2m)
var l3 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'774b0a'})
legenda.add(l3)
var l3m = ui.Label('(3) Cloud Shadows', {fontSize:'10px'})
legenda.add(l3m)
var l32 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'10d22c'})
legenda.add(l32)
var l32m = ui.Label('(4) Vegetation', {fontSize:'10px'})
legenda.add(l32m)
var l4 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'ffff52'})
legenda.add(l4)
var l4m = ui.Label('(5) Bare Soils', {fontSize:'10px'})
legenda.add(l4m)
var l5 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'0000ff'})
legenda.add(l5)
var l5m = ui.Label('(6) Water', {fontSize:'10px'})
legenda.add(l5m)
var l6 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'818181'})
legenda.add(l6)
var l6m = ui.Label('(7) Clouds Low Probability / Unclassified', {fontSize:'10px'})
legenda.add(l6m)
var l7 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'c0c0c0'})
legenda.add(l7)
var l7m = ui.Label('(8) Clouds Medium probability', {fontSize:'10px'})
legenda.add(l7m)
var l8 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'f1f1f1'})
legenda.add(l8)
var l8m = ui.Label('(9) Clouds High Probability', {fontSize:'10px'})
legenda.add(l8m)
var l82 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'bac5eb'})
legenda.add(l82)
var l82m = ui.Label('(10) Cirrus', {fontSize:'10px'})
legenda.add(l82m)
var l9 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'52fff9'})
legenda.add(l9)
var l9m = ui.Label('(11) Snow / Ice', {fontSize:'10px'})
legenda.add(l9m)
panel3.add(esc1) 
panel3.add(pasul2)
panel3.add(pasul2_1)
panel3.add(pasul2_2)
panel3.add(pasul2_3)
panel3.add(pasul2_4)
panel3.add(slider)
panel3.add(slider2)
panel3.add(esc2)
  var animation = ui.Label({
    value: 'In textbox below enter animation speed (frames/second) to generate an animation over the dataset',
    style: {color: 'black', textAlign: 'center'} 
  })
panel3.add(animation)
var textbox = ui.Textbox({
  placeholder: 'TEXTBOX',
  onChange: function(text) {
    var args1 = {
  crs:'EPSG:3857',
  region: geometry,
  bands: ['SCL'],
  min: 1,
  max: 11,
  palette: ['ff0004','868686','774b0a','10d22c','ffff52','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9'],
  framesPerSecond: text,
};
var args2 = {
  crs:'EPSG:3857',
  region: geometry,
  bands: ['B4','B3','B2'],
  min: 150,
  max: 5000,
  gamma: 2.0,
  framesPerSecond: text,
};
var button1 = ui.Button({
  label: 'Display classification map animation',
  style: {height: '15', width: '20', fontSize: '5px'},
  onClick: function() {
    var thumb1 = ui.Thumbnail({
  image: dataset,
  params: args1,
  style: {
    position: 'bottom-center',
    width: '350px'
  }});
  var title1 = ui.Label({
    value: 'Scene classification map animation',
    style: {color: 'black', backgroundColor: '16ECDA00'} 
  })
panel2.add(title1)
panel2.add(thumb1)
  }
});
var button2 = ui.Button({
  label: 'Display sattelite images animation',
  style: {height: '15', width: '20', fontSize: '5px'},
  onClick: function() {
    var thumb2 = ui.Thumbnail({
  image: dataset,
  params: args2,
  style: {
    position: 'bottom-center',
    width: '350px'
  }});
  var title2 = ui.Label({
    value: 'Sattelite images animation',
    style: {color: 'black', backgroundColor: '16ECDA00'} 
  })
panel2.add(title2)
panel2.add(thumb2);
  }
})
panel3.add(button1);
panel3.add(button2);
  }
});
panel3.add(textbox);
var comp = dataset.mosaic().select('SCL').clip(geometry);
var comp2 = dataset.mosaic().select('SCL').clip(geometry);
Map.addLayer(comp2,viz);
print(comp)
function upLayer(value){
  var sliderVal = slider.getValue();
  var sliderVal2 = slider2.getValue();
  print(sliderVal,sliderVal2);
  var clas = (comp.gte(sliderVal).and(comp.lte(sliderVal2))).selfMask();
  var button = ui.Button({
  label: '⛛',
  style: {height: '15', width: '20', fontSize: '5px'},
  onClick: function() {
    Map.addLayer(clas.clip(geometry), {palette: 'black'}, "yea" );
  }
});
 panel4.clear();
  var labelP4 = ui.Label({
    value: 'Slider button',
    style: {fontWeight: 'bold', color: 'black', fontSize: '10px'} 
  });
  panel4.add(labelP4);
  panel4.add(button);
}
});
}
else {
  print('Dataset not supported yet');
}}
ui.root.insert(1,panel3);