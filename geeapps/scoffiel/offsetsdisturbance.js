Map.setCenter(-120, 39, 7);
var states = ee.FeatureCollection('TIGER/2016/States');
var cali = states.filter(ee.Filter.eq('NAME', 'California'));
//set background as emapr biomass
var emapr = ee.Image("projects/ca-ecs/eMapR/eMapR_biomass_CA_ARD_all");
var emapr = emapr.select('b33');
Map.addLayer(emapr, {min:0, max:400, palette:['cfffe6','40c27e','006934']}, 'eMapR biomass 2016', 0, 1);
//project polygons and start years
var projects = ee.FeatureCollection("users/scoffiel/offset_projects");
var project_ids = ['ACR173','ACR182','ACR189','ACR200','ACR237','ACR250','ACR262','ACR282','ACR292','ACR296','ACR298','ACR377','ACR378','CAR1013','CAR1041','CAR1046','CAR1066','CAR1067','CAR1070','CAR1095','CAR1098','CAR1099','CAR1100','CAR1102','CAR1103','CAR1104','CAR1139','CAR1140','CAR1141','CAR1180','CAR1191','CAR993']
var project = projects.filter(ee.Filter.eq('project_id', 'CAR1066'));
Map.addLayer(projects, {}, 'Projects', 1, 0.7);
var start_years = ee.Dictionary({
ACR173:2012,
ACR182:2012,
ACR189:2012,
ACR200:2013,
ACR237:2014,
ACR250:2014,
ACR262:2014,
ACR282:2015,
ACR292:2015,
ACR296:2015,
ACR298:2015,
ACR377:2016,
ACR378:2016,
CAR1013:2013,
CAR1041:2013,
CAR1046:2013,
CAR1066:2014,
CAR1067:2013,
CAR1070:2016,
CAR1095:2013,
CAR1098:2016,
CAR1099:2016,
CAR1100:2016,
CAR1102:2015,
CAR1103:2014,
CAR1104:2014,
CAR1139:2015,
CAR1140:2015,
CAR1141:2014,
CAR1180:2015,
CAR1191:2015,
CAR993:2015,
});
var image = ee.ImageCollection([
  ee.Image("users/scoffiel/disturbance/ARD_h01v05_distType"),
  ee.Image("users/scoffiel/disturbance/ARD_h01v06_distType"),
  ee.Image("users/scoffiel/disturbance/ARD_h01v07_distType"),
  ee.Image("users/scoffiel/disturbance/ARD_h01v08_distType"),
  ee.Image("users/scoffiel/disturbance/ARD_h02v06_distType"),
  ]).mosaic();
Map.addLayer(image.select(6), {min:1,max:3,palette:['ffa50a','f00000','916600']}, 'Disturbance (1990)');
print(image);
//Layer for the sum of all harvest
var mask = image.eq(2);
var harvest = image.mask(mask);
//Map.addLayer(harvest.select(6), {}, 'harvest only');
var sum_bands = harvest.reduce('sum');
Map.addLayer(sum_bands, {min:0, max:8, palette:['00ff80','green','blue']}, 'All harvest', 0, 1);
//slider widget for selecting the year for disturbances --------------------------
var slider = ui.Slider({
  min:1984,
  max:2019,
  value:1990,
  style: {stretch: 'horizontal'}
});
slider.onChange(function(value) {
  var layer = ui.Map.Layer(image.select(value-1984), {min:1,max:3,palette:['ffa50a','f00000','916600']}, 'Disturbance (year)');
  Map.layers().set(2, layer)
});
//selector widget for selecting the project to zoom to ----------------------------
var select = ui.Select({
  items: project_ids,
  onChange: function(selection) {
    var polygon = projects.filter(ee.Filter.eq('project_id', selection));
    var start_year = start_years.get(selection);
    print(start_year);
    print(ee.Number(start_year).subtract(1984));
    Map.centerObject(polygon);
    var layer = ui.Map.Layer(polygon, {}, 'Selected project',1,0.7);
    Map.layers().set(1, layer)
    var layer_pre = harvest.slice(0, ee.Number(start_year).subtract(1984));
    layer_pre = layer_pre.reduce('sum');
    layer_pre = ui.Map.Layer(layer_pre, {min:0, max:8, palette:['00ff80','green','blue']}, 'Pre-project harvest',0,1);
    Map.layers().set(5, layer_pre)
    var layer_post = harvest.slice(ee.Number(start_year).subtract(1984), null);
    layer_post = layer_post.reduce('sum');
    layer_post = ui.Map.Layer(layer_post, {min:0, max:8, palette:['00ff80','green','blue']}, 'Post-project harvest',0,1);
    Map.layers().set(6, layer_post)
    //Map.addLayer(layer_post, {min:0, max:8, palette:['00ff80','green','blue']}, 'Post-project harvest', 0, 1);
  },
  style: {minWidth:'200px'}
});
select.setPlaceholder('Choose an offset project...');
//Calculate stand age layer --------------------------------------
var age = ee.ImageCollection([
  ee.Image.constant(37).clip(cali),
  harvest.remap([1,2,3],[36,36,36],null,'b1'),
  harvest.remap([1,2,3],[35,35,35],null,'b2'),
  harvest.remap([1,2,3],[34,34,34],null,'b3'),
  harvest.remap([1,2,3],[33,33,33],null,'b4'),
  harvest.remap([1,2,3],[32,32,32],null,'b5'),
  harvest.remap([1,2,3],[31,31,31],null,'b6'),
  harvest.remap([1,2,3],[30,30,30],null,'b7'),
  harvest.remap([1,2,3],[29,29,29],null,'b8'),
  harvest.remap([1,2,3],[28,28,28],null,'b9'),
  harvest.remap([1,2,3],[27,27,27],null,'b10'),
  harvest.remap([1,2,3],[26,26,26],null,'b11'),
  harvest.remap([1,2,3],[25,25,25],null,'b12'),
  harvest.remap([1,2,3],[24,24,24],null,'b13'),
  harvest.remap([1,2,3],[23,23,23],null,'b14'),
  harvest.remap([1,2,3],[22,22,22],null,'b15'),
  harvest.remap([1,2,3],[21,21,21],null,'b16'),
  harvest.remap([1,2,3],[20,20,20],null,'b17'),
  harvest.remap([1,2,3],[19,19,19],null,'b18'),
  harvest.remap([1,2,3],[18,18,18],null,'b19'),
  harvest.remap([1,2,3],[17,17,17],null,'b20'),
  harvest.remap([1,2,3],[16,16,16],null,'b21'),
  harvest.remap([1,2,3],[15,15,15],null,'b22'),
  harvest.remap([1,2,3],[14,14,14],null,'b23'),
  harvest.remap([1,2,3],[13,13,13],null,'b24'),
  harvest.remap([1,2,3],[12,12,12],null,'b25'),
  harvest.remap([1,2,3],[11,11,11],null,'b26'),
  harvest.remap([1,2,3],[10,10,10],null,'b27'),
  harvest.remap([1,2,3],[9,9,9],null,'b28'),
  harvest.remap([1,2,3],[8,8,8],null,'b29'),
  harvest.remap([1,2,3],[7,7,7],null,'b30'),
  harvest.remap([1,2,3],[6,6,6],null,'b31'),
  harvest.remap([1,2,3],[5,5,5],null,'b32'),
  harvest.remap([1,2,3],[4,4,4],null,'b33'),
  harvest.remap([1,2,3],[3,3,3],null,'b34'),
  harvest.remap([1,2,3],[2,2,2],null,'b35'),
  harvest.remap([1,2,3],[1,1,1],null,'b36'),
]);
age = age.toBands();
age = age.reduce(ee.Reducer.min());
Map.addLayer(age, {min:0,max:37,palette:['white','black']}, 'Stand age',0,1);
Export.image.toAsset({
  image: age,
  description: 'StandAge',
  maxPixels:1e10,
});
//panel for widgets ----------------------------
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'top-right',
  stretch: 'horizontal'
});
panel.add(slider);
panel.add(select);
Map.add(panel);
//legend for disturbances -----------------------
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Disturbance types',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette = ['ffa50a','f00000','916600'];
var names = ['Fire','Harvest','Die-off'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
Map.add(legend);