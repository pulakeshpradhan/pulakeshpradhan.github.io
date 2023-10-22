var swsc = ee.ImageCollection("users/imazonfred/MapBiomasAGUA/swsc_f");
//--------------------------Variables-----------------------------//
var vegetation ,vegetation_label, veg_ck_box, veg_timeline;
var deforestation, defor_label, defor_ck_box, defor_inter_box, all_defor;
var water, water_label, water_ck_box, freq_box, trans_box, classif_box, water_timeline;
var components;
var instructions;
var years_water = ee.List.sequence(1985, 2018);
var years_vegetation = ee.List.sequence(1985, 2018);
var simple_funcs = require('users/frederickirchhoff/shortcuts:simple_funcs');
var point;
var desm_img = ee.Image('projects/imazon-simex/DEFORESTATION/deforestation-collection-40-3');
var amz = ee.FeatureCollection("users/nicolasalejandromari/Amazonia");
var amz_img = ee.Image(0).mask(0).paint(amz);
//--------------------------Console-----------------------------//
var console = ui.Map();
console.centerObject();
var mini_map_0 = ui.Map();
var mini_map_1 = new ui.Map();
var mini_map = ui.SplitPanel(mini_map_0, mini_map_1, 'horizontal', true);
var linker = ui.Map.Linker([mini_map_0, mini_map_1]);
mini_map_0.addLayer(ee.Image().select(), {}, 'dummy vis', false);
mini_map_0.addLayer(ee.Image().select(), {}, 'dummy ndfi', false);
mini_map_1.addLayer(ee.Image().select(), {}, 'dummy vis', false);
mini_map_1.addLayer(ee.Image().select(), {}, 'dummy ndfi', false);
vegetation_label = ui.Label({
  value: "Vegetation",
  style : {
    textAlign: "center",
    fontSize : "20px",
    margin: "0 auto"
  }
});
veg_ck_box = ui.Checkbox({
  label : "Activate",
  style : {
    textAlign: 'center',
    margin: "5px auto"
  }
});
vegetation = ui.Panel({
  widgets : [vegetation_label, veg_ck_box],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    margin: "5px auto",
    textAlign: "center",
    width: "100%"
  }
});
defor_label = ui.Label({
  value: "Deforestation",
  style : {
    textAlign: "center",
    fontSize : "20px",
    margin: "0 auto",
  }
});
defor_ck_box = ui.Checkbox({
  label : "Activate",
  style : {
    textAlign: 'center',
    margin: "5px auto"
  }
});
defor_inter_box = ui.Checkbox({
  label : "Investigate",
  style : {
    textAlign: 'center',
    margin: "5px auto"
  }
});
all_defor = ui.Panel({
  widgets: [defor_ck_box, defor_inter_box],
  layout: ui.Panel.Layout.flow("horizontal"),
  style: {
    margin: "5px auto",
    width: "100%",
    textAlign: "center"
  }
})
defor_inter_box.onChange(function(state){
  if(state){
    instructions.style().set({shown : true});
  }
  else{
    instructions.style().set({shown : false});
  }
});
deforestation = ui.Panel({
  widgets : [defor_label, all_defor],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    margin: "5px auto",
    textAlign: "center",
    width: "100%"
  }
});
water_label = ui.Label({
  value : "Water",
  style : {
    textAlign: "center",
    fontSize : "20px",
    margin: "0 auto"
  }
});
water_ck_box = ui.Checkbox({
  label : "Activate",
  style : {
    textAlign: 'center',
    margin: "5px auto"
  }
});
freq_box = ui.Checkbox({
  label : "Frequency",
  style : {
    textAlign: 'center'
  }
});
trans_box = ui.Checkbox({
  label : "Transition",
  style : {
    textAlign: 'center'
  }
});
classif_box =ui.Checkbox({
  label : "Classification",
  style : {
    textAlign: 'center'
  }
});
var options = ui.Panel({
  widgets: [freq_box, trans_box, classif_box],
  layout: ui.Panel.Layout.flow("horizontal"),
  style: {
    margin: "5px auto",
    width: "100%",
    textAlign: "center"
  }
});
water = ui.Panel({
  widgets : [water_label, water_ck_box, options],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    margin: "5px auto",
    textAlign: "center",
    width: "100%"
  }
});
components = ui.Panel({
  widgets: [vegetation, deforestation, water],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    textAlign: "center",
    width: "350px",
    position: "top-left"
  }
});
instructions = ui.Label({
  value: "Click on a marked deforestation area",
  style: {
    position: "top-center",
    shown: false
  }
})
var m_mapa = ui.Panel({
  widgets: [mini_map],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    textAlign: "center",
    width: "40%",
    height: '80%',
    position: "top-right",
    shown: false
  }
});
//--------------------------Console Functions-----------------------------//
veg_ck_box.onChange(function(state){
  if (state){
    veg_timeline.style().set({shown : true});
  }
  else{
    veg_timeline.style().set({shown : false});
    console.layers().forEach(function(i){
        if(i.get("name") == "vegetation"){
          console.remove(i);
        }
    });
  }
});
defor_ck_box.onChange(function(state){
  if(state){
    console.remove(console.layers().get(2));
    var desm_vis = {
      'palette': 'ffffcc, ffeda0, fed976, feb24c, fd8d3c, fc4e2a, e31a1c, bd0026, 800026',
      'min': 1990,
      'max': 2017,
    };
    console.layers().insert(2, ui.Map.Layer(desm_img, desm_vis, 'deforestation', true));
  }
  else{
    console.layers().forEach(function(i){
        if(i.get("name") == "deforestation"){
          console.remove(i);
        }
    });
  }
});
console.onClick(function(x){
      if (defor_inter_box.getValue()){
        m_mapa.style().set({shown : true});
        mini_map_0.setCenter(x.lon,x.lat, 10);
        mini_map_0.remove(mini_map_0.layers().get(1));
        mini_map_0.remove(mini_map_0.layers().get(0));
        mini_map_1.remove(mini_map_1.layers().get(1));
        mini_map_1.remove(mini_map_1.layers().get(0));
        point = ee.Geometry.Point([x.lon,x.lat]);
        var year_desm_fc = desm_img.sample({
          region: point, 
          scale: 30, 
          dropNulls: true, 
        });
        var year_to_plot = ee.Number(ee.Feature(year_desm_fc.first()).get('year')).add(1);
        year_to_plot = ee.Number(
          ee.Algorithms.If(
          year_to_plot.gt(2018),
          2018,
          year_to_plot)
          );
        var year_before = year_to_plot.subtract(1);
        year_before = ee.Number(
          ee.Algorithms.If(
          year_before.lt(1985),
          1985,
          year_before)
          );
        var desm_img_before = simple_funcs.mosaic_year(year_before);
        var desm_img_after = simple_funcs.mosaic_year(year_to_plot);
        var mosaic_vis = {bands: ['red', 'green', 'blue'], min:0, max:1500};
        var ndfi_vis = {bands: ['ndfi'], min:0, max:200, palette: 'ffffff, ff00ff, ffff00, 006000'};
        mini_map_0.layers().insert(0, ui.Map.Layer(desm_img_before, mosaic_vis, 'rgb before', true));
        mini_map_0.layers().insert(1, ui.Map.Layer(desm_img_before, ndfi_vis, 'ndfi before', false));
        mini_map_1.layers().insert(0, ui.Map.Layer(desm_img_after, mosaic_vis, 'rgb after', true));
        mini_map_1.layers().insert(1, ui.Map.Layer(desm_img_after, ndfi_vis, 'ndfi after', false));
      }
      else{
      }
});
defor_inter_box.onChange(function(state){
  if(state){
    instructions.style().set({shown : true});
  }
  else{
    instructions.style().set({shown : false});
    m_mapa.style().set({shown : false});
  }
});
water_ck_box.onChange(function(state){
  if(state){
   water_timeline.style().set({shown : true});
  }
  else{
    water_timeline.style().set({shown : false});
  }
});
freq_box.onChange(function(state){
  if(state){
    console.remove(console.layers().get(3));
    var freq_img = simple_funcs.swsc_freq();
    var freq_vis = {
      min:0, 
      max: 34, 
      palette: 'ffffff, 00ffff, 00c6ff, 008bff, 0048ff, 0000ac, 00004e'
    };
    console.layers().insert(3, ui.Map.Layer(freq_img, freq_vis, 'frequency', true, 1));
  }
  else{
    // console.layers().forEach(function(i){
    //     if(i.get("name") == "frequency"){
    //       console.remove(i);
    //     }
    // });
  }
});
trans_box.onChange(function(state){
  if(state){
    console.remove(console.layers().get(3));
    var trans_img = simple_funcs.trans_img();
    var trans_vis = {
      min:0, 
      max: 11, 
      palette: 'ffffff, 6f93e1, 000000, 000000, 000000, 000000, 000000, 000000, 000000, ffb496, 696969'
    };
    console.layers().insert(3, ui.Map.Layer(trans_img, trans_vis, 'transition', true, 1));
  }
  else{
    // console.layers().forEach(function(i){
    //     if(i.get("name") == "transition"){
    //       console.remove(i);
    //     }
    // });
  }
});
classif_box.onChange(function(state){
  if(state){
    console.remove(console.layers().get(3));
    var class_img = simple_funcs.class_img();
    var classif_palette = [
      '0000ff', // natural      1          
      '00ffff', // anthropic    3
      '800080', // hydro power  5
      'DB7093', // mining       6
      '800000', // não água     7
    ];
    var classif_names = [
      'natural',           
      'anthropic',  
      'hydro power', 
      'mining', 
      'not water'
    ];
    var class_vis = {
      min:1, max:5, palette: classif_palette
    };
    var legendize = require('users/frederickirchhoff/shortcuts:legendize');
    var classif_legend = legendize.legendize('water body classification', classif_names, classif_palette, '808080', 'bottom-right');
    console.layers().insert(3, ui.Map.Layer(class_img, class_vis, 'water body classification', true, 1));
    console.add(classif_legend);
  }
  else{
    console.layers().forEach(function(i){
        if(i.get("name") == "water body classification"){
          console.remove(i);
        }
    });
  }
});
console.add(components);
console.add(instructions);
console.add(m_mapa);
console.setCenter(-60.595, -5.817, 5);
console.addLayer(amz_img, {palette: 'black'}, 'limit brazilian amazon', true, 0.6);
console.addLayer(ee.Image().select(), {}, 'dummy layer vegetation', false);
console.addLayer(ee.Image().select(), {}, 'dummy layer deforestation', false);
console.addLayer(ee.Image().select(), {}, 'dummy layer water', false);
//--------------------------Timelines-----------------------------//
years_vegetation = years_vegetation.map(function (year_number) {
    return ee.Feature(null, {
        'year': ee.Number(year_number).format('%d'),
        'band': 'classification_' + year_number,
        'system:yValue': 0
    });
});
years_water = years_water.map(function (year_number) {
    return ee.Feature(null, {
        'year': ee.Number(year_number).format('%d'),
        'band': 'classification_' + year_number,
        'system:yValue': 0
    });
});
water_timeline = ui.Chart.feature.byFeature(years_water, 'year', 'system:yValue')
                .setChartType('LineChart')
                .setOptions({
                  legend: "Vegetation over time",
                  lineWidth: 1,
                  pointSize: 5,
                  height: 100,
                  vAxis: {
                      gridlines: {
                          count: 0
                      }
                  },
                   'chartArea': {
                      left: 30,
                      top: 10,
                      right: 30,
                      width: '100%',
                      height: '80%'
                  },
        hAxis: {
            textPosition: 'in',
            showTextEvery: 1,
            interpolateNulls: true,
            slantedTextAngle: 90,
            slantedText: true,
            textStyle: {
                color: '#000000',
                fontSize: 12,
                fontName: 'Arial',
                bold: false,
                italic: false
            }
        },
        tooltip :{
          trigger: 'none',
        },
        colors: ['#FF0000'],
        crosshair: {
            trigger: 'both',
            orientation: 'vertical',
            focused: {
                color: '#0000ff'
            }
        }
    });
water_timeline.style().set({
    position: 'bottom-center',
    width: '100%',
    height: '150px',
    margin: '0px',
    padding: '0px',
    shown: false
});
veg_timeline = ui.Chart.feature.byFeature(years_vegetation, 'year', 'system:yValue')
                .setChartType('LineChart')
                .setOptions({
                  legend: "Vegetation",
                  lineWidth: 1,
                  pointSize: 5,
                  height: 100,
                  vAxis: {
                      gridlines: {
                          count: 0
                      }
                  },
                   'chartArea': {
                      left: 30,
                      top: 10,
                      right: 30,
                      width: '100%',
                      height: '80%'
                  },
        hAxis: {
            textPosition: 'in',
            showTextEvery: 1,
            interpolateNulls: true,
            slantedTextAngle: 90,
            slantedText: true,
            textStyle: {
                color: '#000000',
                fontSize: 12,
                fontName: 'Arial',
                bold: false,
                italic: false
            }
        },
        tooltip :{
          trigger: 'none',
        },
        colors: ['#FF0000'],
        crosshair: {
            trigger: 'both',
            orientation: 'vertical',
            focused: {
                color: '#0000ff'
            }
        }
    });
veg_timeline.style().set({
    position: 'bottom-center',
    width: '100%',
    height: '150px',
    margin: '0px',
    padding: '0px',
    shown: false
});
var timelines = ui.Panel({
  widgets: [veg_timeline, water_timeline],
  layout : ui.Panel.Layout.flow('vertical')
});
//--------------------------Timeline functions-----------------------------//
water_timeline.onClick(function(x, y, s){
  console.remove(console.layers().get(3));
  var swsc_img = swsc.filter(ee.Filter.eq('year', ee.Number.parse(x, 10))).mosaic();
  console.layers().insert(3, ui.Map.Layer(swsc_img, {palette: 'blue'}, 'water', true, 1));
});
veg_timeline.onClick(function(x, y, s){
  console.remove(console.layers().get(1));
  var veg_func = simple_funcs.veg_func;
  var veg_img = veg_func(x);
  var veg_vis = {min:1, max:3, palette: [
    '006000',
    'ffff00',
    '0000ff'
    ]};
  console.layers().insert(1, ui.Map.Layer(veg_img, veg_vis, 'vegetation', true));
});
ui.root.widgets().reset([console, timelines]);
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));