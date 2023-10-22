var credit1 = ui.Label('', {position:'bottom-left', fontSize:'13px',fontWeight:'bold', color:"black" , backgroundColor: '16ECDA00'});
Map.add(credit1)
var legenda = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '1200px',height: '70px', position: 'bottom-center'}
})
Map.add(legenda)
legenda.add(ui.Label({
    value: 'Scene classification map legend',
    style: {fontWeight: 'bold', color: 'black', fontSize: '10px', backgroundColor: '16ECDA00'} 
  }));
var panel2 = ui.Panel([ui.Label({
    value: 'Animations and charts will be displayed here',
    style: {fontWeight: 'bold', backgroundColor: '16ECDA00'} 
  })]);
panel2.style().set({
  width: '400px',
  height: '450px',
  position: 'top-left',
  backgroundColor: 'ffffff90'
});
Map.add(panel2);
var panel3 = ui.Panel([ui.Label({
    value: 'Data cube class content filter',
    style: {fontWeight: 'bold', color: 'black', fontSize: '10px'} 
  })]);
panel3.style().set({
  width: '150px',
  height: '350px',
  position: 'top-right'
});
Map.add(panel3);
 var panel4 = ui.Panel([ui.Label({
    value: 'Activate data cube class filter',
        style: {fontWeight: 'bold', color: 'black', textAlign: 'center' ,fontSize: '10px'} 
  })]);
panel4.style().set({
  width: '150px',
  height: '105px',
  position: 'top-right'
});
Map.add(panel4);
var panel5 = ui.Panel([
  ui.Label({
    value: '1. Draw your area of interest (AOI).',
    style: {fontWeight: 'bold', color: 'black'} 
  }),
  ui.Label({
    value: '2. Select a date range in the following format: YYYY-MM-DD. Example: 2020-07-10',
    style: {fontWeight: 'bold', color: 'black'} 
  }),
  ui.Label({
    value: 'Processing time depends on AOI and date range size.',
    style: { color: 'black'} 
  })])
panel5.style().set({
  width: '300px'
});
Map.drawingTools().onDraw(function (geometry) {
 var dataset = ee.ImageCollection("COPERNICUS/S2_SR")
                 .filterDate(prompt('Define FIRST date of timeframe as YYYY-MM-DD (Example: 2020-07-29)'),
                 prompt('Define SECOND date of timeframe as YYYY-MM-DD (Example: 2020-07-29)'))
                 .filterBounds(geometry)
//print('raw dataset')
print(dataset)
var viz = {
  bands: ['SCL'],
  min: 1,
  max: 11,
  palette: ['ff0004','868686','774b0a','10d22c','ffff52','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9']
};
function clase (image){
var img = image.select('SCL').clip(geometry)
var total = img.gte(1).and(img.lte(11)).selfMask();
var satDef = img.gte(1).and(img.lte(1)).selfMask();
var drkPx = img.gte(2).and(img.lte(2)).selfMask();
var cldShd = img.gte(3).and(img.lte(3)).selfMask();
var vegetation = img.gte(4).and(img.lte(4)).selfMask();
var bareSoil = img.gte(5).and(img.lte(5)).selfMask();
var water = img.gte(6).and(img.lte(6)).selfMask();
var cldLpUn = img.gte(7).and(img.lte(7)).selfMask();
var cldMp = img.gte(8).and(img.lte(8)).selfMask();
var cldHp = img.gte(9).and(img.lte(9)).selfMask();
var cirrus = img.gte(10).and(img.lte(10)).selfMask();
var snowIce = img.gte(11).and(img.lte(11)).selfMask();
//INCEPE FUNCTIA
//Total Area START//
var totalArea1 = ee.Image.pixelArea().divide(10000)
var totalArea2 = total.multiply(totalArea1).select([0])
var totalArea3 = totalArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: totalArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var totalArea4 = totalArea3.get('SCL')
var totalArea5 = ee.Number(totalArea4)
//print('Total area is:', totalArea5, 'HA')
//Total Area FINISH//
//Saturated & defective Area START//
var satDefArea1 = ee.Image.pixelArea().divide(10000)
var satDefArea2 = satDef.multiply(satDefArea1).select([0])
var satDefArea3 = satDefArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: satDefArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var satDefArea4 = satDefArea3.get('SCL')
var satDefArea5 = ee.Number(satDefArea4)
//print('Saturated & defective area is:', satDefArea5, 'HA')
var satDefProc = satDefArea5.divide(totalArea5).multiply(100)
//print(satDefProc)
//Saturated & Defective Area FINISH//
//Dark pixel Area START//
var drkPxArea1 = ee.Image.pixelArea().divide(10000)
var drkPxArea2 = drkPx.multiply(drkPxArea1).select([0])
var drkPxArea3 = drkPxArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: drkPxArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var drkPxArea4 = drkPxArea3.get('SCL')
var drkPxArea5 = ee.Number(drkPxArea4)
//print('Dark pixel area is:', drkPxArea5, 'HA')
var drkPxProc = drkPxArea5.divide(totalArea5).multiply(100)
//print(drkPxProc)
//Dark pixel Area FINISH//
//Cloud shadow Area START//
var cldShdArea1 = ee.Image.pixelArea().divide(10000)
var cldShdArea2 = cldShd.multiply(cldShdArea1).select([0])
var cldShdArea3 = cldShdArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: cldShdArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var cldShdArea4 = cldShdArea3.get('SCL')
var cldShdArea5 = ee.Number(cldShdArea4)
//print('Cloud shadow area is:', cldShdArea5, 'HA')
var cldShdProc = cldShdArea5.divide(totalArea5).multiply(100)
//print(cldShdProc)
//Cloud shadow Area FINISH//
//Vegetation Area START//
var vegArea1 = ee.Image.pixelArea().divide(10000)
var vegArea2 = vegetation.multiply(vegArea1).select([0])
var vegArea3 = vegArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: vegArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var vegArea4 = vegArea3.get('SCL')
var vegArea5 = ee.Number(vegArea4)
//print('Vegetation area is:', vegArea5, 'HA')
var vegProc = vegArea5.divide(totalArea5).multiply(100)
//print(vegProc)
//Vegetation Area FINISH//
//Bare soil Area START//
var bareSoilArea1 = ee.Image.pixelArea().divide(10000)
var bareSoilArea2 = bareSoil.multiply(bareSoilArea1).select([0])
var bareSoilArea3 = bareSoilArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: bareSoilArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var bareSoilArea4 = bareSoilArea3.get('SCL')
var bareSoilArea5 = ee.Number(bareSoilArea4)
//print('Bare soil area is:', bareSoilArea5, 'HA')
var bareSoilProc = bareSoilArea5.divide(totalArea5).multiply(100)
//print(bareSoilProc)
//Bare soil Area FINISH//
//Water Area START//
var waterArea1 = ee.Image.pixelArea().divide(10000)
var waterArea2 = water.multiply(waterArea1).select([0])
var waterArea3 = waterArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: waterArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var waterArea4 = waterArea3.get('SCL')
var waterArea5 = ee.Number(waterArea4)
//print('water area is:', waterArea5, 'HA')
var waterProc = waterArea5.divide(totalArea5).multiply(100)
//print(waterProc)
//water Area FINISH//
//Cloud low probability & unclassified START//
var cldLpUnArea1 = ee.Image.pixelArea().divide(10000)
var cldLpUnArea2 = cldLpUn.multiply(cldLpUnArea1).select([0])
var cldLpUnArea3 = cldLpUnArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: cldLpUnArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var cldLpUnArea4 = cldLpUnArea3.get('SCL')
var cldLpUnArea5 = ee.Number(cldLpUnArea4)
//print('cldLpUn area is:', cldLpUnArea5, 'HA')
var cldLpUnProc = cldLpUnArea5.divide(totalArea5).multiply(100)
//print(cldLpUnProc)
//cldLpUn Area FINISH//
//Cloud medium probability START//
var cldMpArea1 = ee.Image.pixelArea().divide(10000)
var cldMpArea2 = cldMp.multiply(cldMpArea1).select([0])
var cldMpArea3 = cldMpArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: cldMpArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var cldMpArea4 = cldMpArea3.get('SCL')
var cldMpArea5 = ee.Number(cldMpArea4)
//print('cldMp area is:', cldMpArea5, 'HA')
var cldMpProc = cldMpArea5.divide(totalArea5).multiply(100)
//print(cldMProc)
//cldMp Area FINISH//
//Cloud high probability Area START//
var cldHpArea1 = ee.Image.pixelArea().divide(10000)
var cldHpArea2 = cldHp.multiply(cldHpArea1).select([0])
var cldHpArea3 = cldHpArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: cldHpArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var cldHpArea4 = cldHpArea3.get('SCL')
var cldHpArea5 = ee.Number(cldHpArea4)
//print('Cloud high probability area is:', cldHpArea5, 'HA')
var cldHpProc = cldHpArea5.divide(totalArea5).multiply(100)
//print(cldHpProc)
//Cloud high probability Area FINISH//
//cirrus Area START//
var cirrusArea1 = ee.Image.pixelArea().divide(10000)
var cirrusArea2 = cirrus.multiply(cirrusArea1).select([0])
var cirrusArea3 = cirrusArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: cirrusArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var cirrusArea4 = cirrusArea3.get('SCL')
var cirrusArea5 = ee.Number(cirrusArea4)
//print('cirrus area is:', cirrusArea5, 'HA')
var cirrusProc = cirrusArea5.divide(totalArea5).multiply(100)
//print(cirrusProc)
//cirrus Area FINISH//
// snowIce Area START//
var snowIceArea1 = ee.Image.pixelArea().divide(10000)
var snowIceArea2 = snowIce.multiply(snowIceArea1).select([0])
var snowIceArea3 = snowIceArea2.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: snowIceArea2.geometry(),
  scale: 20,
  maxPixels:1e13
})
var snowIceArea4 = snowIceArea3.get('SCL')
var snowIceArea5 = ee.Number(snowIceArea4)
var snowIceProc = snowIceArea5.divide(totalArea5).multiply(100);
//SE TERMINA FUNCTIA
return image.set({'MEAN_INCIDENCE_AZIMUTH_ANGLE_B1': satDefProc, 
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B2': drkPxProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B3': cldShdProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B4': vegProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B5': bareSoilProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B6': waterProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B7': cldLpUnProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B8': cldMpProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B9': cldHpProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B10': cirrusProc,
                  'MEAN_INCIDENCE_AZIMUTH_ANGLE_B11': snowIceProc
})
}
var slider1 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider2 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider3 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider4 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider5 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider6 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider7 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider8 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider9 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider10 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
var slider11 = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value:100,
  style: {stretch: 'horizontal', fontSize: '5'},
  onChange: upLayer
})
panel5.add(ui.Label('____________________________________________'));
panel5.add(ui.Label({value: 'Your data cube have been created.', style: {color: 'black', fontWeight: 'bold', textAlign: 'center'} }));
panel5.add(ui.Label({value: 'In "Data cube class content filter" panel you can filter it by the percentage content of each class, lower than the selected value. Then press ⛛ the button', style: {color: 'black'} }));
panel3.add(ui.Label({value: 'Saturated & Defective', style: {color: 'black',  fontSize: '11px'} }));
panel3.add(slider1);
panel3.add(ui.Label({value: 'Dark Pixel', style: {color: 'black', fontSize: '11px'} }));
panel3.add(slider2);
panel3.add(ui.Label({value: 'Cloud Shadow', style: {color: 'black', fontSize: '11px'} }));
panel3.add(slider3);
panel3.add(ui.Label({value: 'Vegetation', style: {color: 'black', fontSize: '11px'} }));
panel3.add(slider4);
panel3.add(ui.Label({value: 'Bare soil', style: {color: 'black',  fontSize: '11px'} }));
panel3.add(slider5);
panel3.add(ui.Label({value: 'Water', style: {color: 'black',  fontSize: '11px'} }));
panel3.add(slider6);
panel3.add(ui.Label({value: 'Cloud Low Probability & Undefined area', style: {color: 'black',  fontSize: '11px'} }));
panel3.add(slider7);
panel3.add(ui.Label({value: 'Cloud Medium Probability', style: {color: 'black', fontSize: '11px'} }));
panel3.add(slider8);
panel3.add(ui.Label({value: 'Cloud High Probability', style: {color: 'black',  fontSize: '11px'} }));
panel3.add(slider9);
panel3.add(ui.Label({value: 'Cirrus', style: {color: 'black',  fontSize: '11px'} }));
panel3.add(slider10);
panel3.add(ui.Label({value: 'Snow / ice', style: {color: 'black', fontSize: '11px'} }));
panel3.add(slider11);
function upLayer(value){
  var sliderVal = slider1.getValue();
  var sliderVa2 = slider2.getValue();
  var sliderVa3 = slider3.getValue();
  var sliderVa4 = slider4.getValue();
  var sliderVa5 = slider5.getValue();
  var sliderVa6 = slider6.getValue();
  var sliderVa7 = slider7.getValue();
  var sliderVa8 = slider8.getValue();
  var sliderVa9 = slider9.getValue();
  var sliderVa10 = slider10.getValue();
  var sliderVa11 = slider11.getValue();
  //Odata apasat butonul de filtrare, se executa tot ce urmeaza pana la urm comentariu la fel
  var button = ui.Button({
  label: '⛛',
  style: {height: '15', width: '50', fontSize: '5px', stretch: 'horizontal',backgroundColor: '16ECDA00'},
  onClick: function() {
  var colec = ee.ImageCollection(dataset.map(clase))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B1', sliderVal))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B2', sliderVa2))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B3', sliderVa3))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B4', sliderVa4))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B5', sliderVa5))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B6', sliderVa6))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B7', sliderVa7))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B8', sliderVa8))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B9', sliderVa9))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B10', sliderVa10))
           .filter(ee.Filter.lte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B11', sliderVa11)).limit(100,'system:index',false)
//print('colec filtrata 1')
print(colec);
//Animation function START
panel5.add(ui.Label('____________________________________________'));
panel2.add(ui.Label({
    value: 'You can make time-series analyses over a pixel by selecting hand (left-top corner) and click over a pixel.',
    style: {fontWeight: 'bold', backgroundColor: '16ECDA00'} 
  }));
panel2.add(ui.Label({
    value: '__________________________________________________________',
    style: {fontWeight: 'bold', backgroundColor: '16ECDA00'} 
  }));
  var animation = ui.Label({
    value: 'In textbox below enter animation speed (frames/second) to generate an animation over filtered class content data cube',
    style: {color: 'black',stretch: 'horizontal',backgroundColor: '16ECDA00'} 
  });
panel2.add(animation);
var textboxAnimation = ui.Textbox({
  placeholder: 'Type here...',
  style: {stretch: 'horizontal'},
  onChange: function(text) {
    var animationProp1 = {
  crs:'EPSG:3857',
  region: geometry,
  bands: ['SCL'],
  min: 1,
  max: 11,
  palette: ['ff0004','868686','774b0a','10d22c','ffff52','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9'],
  framesPerSecond: text,
};
var animationProp2 = {
  crs:'EPSG:3857',
  region: geometry,
  bands: ['B4','B3','B2'],
  min: 150,
  max: 5000,
  gamma: 2.0,
  framesPerSecond: text,
};
var buttonAnimation1 = ui.Button({
  label: 'Display classification map animation',
  style: {height: '15', width: '20', fontSize: '5px'},
  onClick: function() {
    var thumb1 = ui.Thumbnail({
  image: colec,
  params: animationProp1,
  style: {
    position: 'bottom-center',
    width: '350px'
  }});
  var title1 = ui.Label({
    value: 'Scene classification map animation',
    style: {color: 'black',fontWeight: 'bold', backgroundColor: '16ECDA00'} 
  });
panel2.add(title1);
panel2.add(thumb1);
  }
});
var buttonAnimation2 = ui.Button({
  label: 'Display sattelite images animation',
  style: {height: '15', width: '20', fontSize: '5px'},
  onClick: function() {
    var thumb2 = ui.Thumbnail({
  image: colec,
  params: animationProp2,
  style: {
    position: 'bottom-center',
    width: '350px'
  }});
  var title2 = ui.Label({
    value: 'Sattelite images animation',
    style: {color: 'black',fontWeight: 'bold', backgroundColor: '16ECDA00'} 
  });
panel2.add(title2);
panel2.add(thumb2);
  }
});
panel2.add(buttonAnimation1);
panel2.add(buttonAnimation2);
  }
});
panel2.add(textboxAnimation);
//Animation function END
//data cube class filter start
panel5.add(ui.Label({value: 'You can clip a specific class or more from your data cube. It will took some time to process. ', style: {color: 'black', fontSize: '11px'} }));
var checkbox1 = ui.Checkbox('Saturated / defective',false);
var DCsatDef = 0
checkbox1.onChange(function(checked) {
  if (checked){
    DCsatDef = 1
  } else {
    DCsatDef = 0
  }
});
panel5.add(checkbox1);
var checkbox2 = ui.Checkbox('Dark pixel',false);
var DCdrkPx = 0
checkbox2.onChange(function(checked) {
  if (checked){
     DCdrkPx = 2
  } else {
     DCdrkPx = 0
  }
});
panel5.add(checkbox2);
var checkbox3 = ui.Checkbox('Cloud Shadows',false);
var DCcldShd = 0
checkbox3.onChange(function(checked) {
  if (checked){
    DCcldShd = 3
  } else {
    DCcldShd = 0
  }
});
panel5.add(checkbox3);
var checkbox4 = ui.Checkbox('Vegetation',false);
var DCveg = 0;
checkbox4.onChange(function(checked) {
  if (checked){
    DCveg = 4;
  } else {
    DCveg = 0;
  }
});
panel5.add(checkbox4);
var checkbox5 = ui.Checkbox('Bare Soils',false);
var DCbare = 0;
checkbox5.onChange(function(checked) {
  if (checked){
    DCbare = 5;
  } else {
    DCbare = 0;
  }
});
panel5.add(checkbox5);
var checkbox6 = ui.Checkbox('Water',false);
var DCwater = 0;
checkbox6.onChange(function(checked) {
  if (checked){
    DCwater = 6;
  } else {
    DCwater = 0;
  }
});
panel5.add(checkbox6);
var checkbox7 = ui.Checkbox('Clouds Low Probability / Unclassified',false);
var DCcldLpUn = 0;
checkbox7.onChange(function(checked) {
  if (checked){
    DCcldLpUn = 7;
  } else {
    DCcldLpUn = 0;
  }
});
panel5.add(checkbox7);
var checkbox8 = ui.Checkbox('Cloud Medium probability',false);
var DCcldMp = 0;
checkbox8.onChange(function(checked) {
  if (checked){
    DCcldMp = 8;
  } else {
    DCcldMp = 0;
  }
});
panel5.add(checkbox8);
var checkbox9 = ui.Checkbox('Clouds High probability',false);
var DCcldHp = 0;
checkbox9.onChange(function(checked) {
  if (checked){
    DCcldHp = 9;
  } else {
    DCcldHp = 0;
  }
});
panel5.add(checkbox9);
var checkbox10 = ui.Checkbox('Cirrus',false);
var DCcirrus = 0;
checkbox10.onChange(function(checked) {
  if (checked){
    DCcirrus = 10;
  } else {
    DCcirrus = 0;
  }
});
panel5.add(checkbox10);
var checkbox11 = ui.Checkbox('Snow / Ice',false);
var DCsnwIce = 0;
  checkbox11.onChange(function(checked) {
  if (checked){
    DCsnwIce = 11;
  } else {
    DCsnwIce = 0;
  }
});
panel5.add(checkbox11);
var buttonClass = ui.Button({
 label: 'Clip data cube by your classes',
 style: {stretch: 'horizontal'},
 onClick: function() {
//start colection loop                  
function pickClass (image2){
  var img2 = image2.select('SCL').clip(geometry);
  var clas1 = (image2.gte(DCsatDef).and(image2.lte(DCsatDef)))
  var clas2 = (image2.gte(DCdrkPx).and(image2.lte(DCdrkPx)))
  var clas3 = (image2.gte(DCcldShd).and(image2.lte(DCcldShd)))
  var clas4 = (image2.gte(DCveg).and(image2.lte(DCveg)))
  var clas5 = (image2.gte(DCbare).and(image2.lte(DCbare)))
  var clas6 = (image2.gte(DCwater).and(image2.lte(DCwater)))
  var clas7 = (image2.gte(DCcldLpUn).and(image2.lte(DCcldLpUn)))
  var clas8 = (image2.gte(DCcldMp).and(image2.lte(DCcldMp)))
  var clas9 = (image2.gte(DCcldHp).and(image2.lte(DCcldHp)))
  var clas10 = (image2.gte(DCcirrus).and(image2.lte(DCcirrus)))
  var clas11 = (image2.gte(DCsnwIce).and(image2.lte(DCsnwIce)))
  var mosaik = ee.ImageCollection([clas1, clas2, clas3, clas4, clas5, clas6, clas7, clas8, clas9, clas10, clas11]).max().clip(geometry);
  return mosaik;
}
//end collection loop
var dataCubeClassFilt = colec.select(['SCL']).map(pickClass);
print(dataCubeClassFilt);
//var listOfImages2 =dataCubeClassFilt.toList(dataCubeClassFilt.size());
//print('List:',listOfImages2);
//var img1 = ee.Image(listOfImages2.get(0));
var bandsCube= dataCubeClassFilt.toBands()
//Export.image.toDrive({
//  image: bandsCube,
//  description: 'wow4',
//  scale: 20,
//  region: geometry
//});
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
panel5.add(ui.Label({value: 'You can download your clipped by class data cube by copy-paste the downbelow link',style: {fontWeight: 'bold', color: 'black'}}))
var download = ui.Label(bandsCube.getDownloadURL({name: 'wow2', scale: 20, region:geometry, filePerBand: false, format:'GEO_TIFF' }));
panel5.add(download)
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
//Number of bands (124) must be less than or equal to 100 FOR DOWNLOAD
Map.addLayer(bandsCube,{}, 'Class(es) data cube');
}});
//actiune finish
panel5.add(buttonClass);
//datacube class filter end
var listImgColl1 = colec.toList(colec.size());
var img4 = ee.Image(listImgColl1.get(0)).select('SCL').clip(geometry);
Map.addLayer(img4, viz, 'Most recent capture ');
var l1 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'ff0004', backgroundColor: '16ECDA00'})
legenda.add(l1)
var l1m = ui.Label('(1) Saturated or defective', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l1m)
var l2 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'868686', backgroundColor: '16ECDA00'})
legenda.add(l2)
var l2m = ui.Label('(2) Dark Area pixels', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l2m)
var l3 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'774b0a', backgroundColor: '16ECDA00'})
legenda.add(l3)
var l3m = ui.Label('(3) Cloud Shadows', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l3m)
var l32 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'10d22c', backgroundColor: '16ECDA00'})
legenda.add(l32)
var l32m = ui.Label('(4) Vegetation', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l32m)
var l4 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'ffff52', backgroundColor: '16ECDA00'})
legenda.add(l4)
var l4m = ui.Label('(5) Bare Soils', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l4m)
var l5 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'0000ff', backgroundColor: '16ECDA00'})
legenda.add(l5)
var l5m = ui.Label('(6) Water', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l5m)
var l6 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'818181', backgroundColor: '16ECDA00'})
legenda.add(l6)
var l6m = ui.Label('(7) Clouds Low Probability / Unclassified', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l6m)
var l7 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'c0c0c0', backgroundColor: '16ECDA00'})
legenda.add(l7)
var l7m = ui.Label('(8) Clouds Medium probability', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l7m)
var l8 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'f1f1f1', backgroundColor: '16ECDA00'})
legenda.add(l8)
var l8m = ui.Label('(9) Clouds High Probability', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l8m)
var l82 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'bac5eb', backgroundColor: '16ECDA00'})
legenda.add(l82)
var l82m = ui.Label('(10) Cirrus', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l82m)
var l9 = ui.Label('■', {fontWeight:'bold',fontSize:'30px', color:'52fff9', backgroundColor: '16ECDA00'})
legenda.add(l9)
var l9m = ui.Label('(11) Snow / Ice', {fontSize:'9px', backgroundColor: '16ECDA00'})
legenda.add(l9m)
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);//
var chart = ui.Chart.image.series({                                                 
    imageCollection: colec.select('SCL'),                                        
    region: click_point,                                                          
    reducer: ee.Reducer.last()                                                   
    }).setOptions({                                                             
      interpolateNulls: true,                                                  
      lineWidth: 1,                                                           
      pointSize: 5,                                                         
      title: 'Class over region',                                           
      vAxis: {title: 'Class'},                                             
      hAxis: {title: 'Date', format: 'YYYY-MM-dd', gridlines: {count: 20}}
    });                                                                  
panel2.add(chart)});    
  }
});
//Odata apasat butonul de filtrare, se executa tot ce a fost pana la comentariul asemanator.
//Odata cu acest buton se termina si caracterul semantic
//inceputul sfarsitului de interactiune slide class filter
 panel4.clear();
  var labelP4 = ui.Label({
    value: 'Activate data cube class filter',
    style: {fontWeight: 'bold', color: 'black', textAlign: 'center' ,fontSize: '10px'} 
  });
  panel4.add(labelP4);
  panel4.add(button);
}
//sfarsit interactiune slide class filter
//var colec = ee.ImageCollection(dataset.map(clase))
//            .filter(ee.Filter.gte('MEAN_INCIDENCE_AZIMUTH_ANGLE_B5', slider))
//print(colec);
//return image.addBands(image.metadata()
//var calc = totalArea5.add(10)
//print(calc)
//Map.addLayer(vegetation, viz, 'vegetation');
//Map.addLayer(cldHp, viz, 'cldHp');
});
ui.root.insert(1,panel5);