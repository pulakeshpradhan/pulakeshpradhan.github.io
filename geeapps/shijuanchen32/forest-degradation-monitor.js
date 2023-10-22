//-----------------User's Interface---------------------
var app_title = ui.Label({value: 'App to display results of forest degradation in Georgia',
                      style: {width: '95%', fontSize: '30px', color: 'black'} 
                    });
var app_author = ui.Label('Author: Shijuan Chen           Date: 08/31/2021\
\nThis app displays products of forest degradation and land cover \nin Georgia',{whiteSpace: 'pre'});
//Display final map button (1987-2019) (let' merge recovery and non-recovery)
var final_map_l = ui.Label('1. Map of deforestation, degradation, stable forest and non-forest (1987-2019)');
var final_map_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
//Display the first year of change
var first_year_l = ui.Label('2. The first year of forest degradation or deforestation');
var first_year_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
//Display the last year of change
var last_year_l = ui.Label('3. The last year of forest degradation or deforestation');
var last_year_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
//Display the annual degradation and deforestation
var annual_deg_def_l = ui.Label('4. Annual forest degradation and deforestation.');
var year_dis = [];
for (var y = 1987; y <= 2019; y++){
  year_dis.push(y.toString());
}
year_dis = ee.List(year_dis);
var annual_deg_def_select = ui.Select({items:year_dis.getInfo(), placeholder:'Select a year to display', style: {width: '95%'}});
var annual_deg_def_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
//Display the abrupt change and gradual change
var ab_gr_l = ui.Label('5. The abrupt disturbance or/and gradual disturbance (1987-2019)');
var ab_gr_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
//Display the abrupt change and gradual change
var seg_dis_l = ui.Label('6. Segment results of abrupt/gradual disturbance');
var seg_dis_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
var year_lc = [];
for (var y = 1986; y <= 2019; y++){
  year_lc.push(y.toString());
}
year_lc = ee.List(year_lc);
var annual_lc_l = ui.Label('7. Annual land cover');
var lc_select = ui.Select({items:year_lc.getInfo(), placeholder:'Select a year to display', style: {width: '95%'}});
var app_doc1 = ui.Label('\nPlease cite the code as:')
var app_paper = ui.Label('Chen, S., Woodcock, C.E., Bullock, E.L., Arévalo, P., Torchinava, P., Peng, S. and Olofsson, P., 2021.\
\nMonitoring temperate forest degradation on Google Earth Engine using Landsat time series analysis. \
\nRemote Sensing of Environment, 265, p.112648.');
var app_paper_l = app_paper.setUrl('https://www.sciencedirect.com/science/article/pii/S0034425721003680');
var app_paper_free = ui.Label('Click here to get 50-day free access.');
var app_paper_free_l = app_paper_free.setUrl('https://authors.elsevier.com/a/1devg7qzStnwW');
var app_doc2 = ui.Label('Please see the guideline of running the apps on:');
var app_link_l = ui.Label('https://github.com/shijuanchen/forest_degradation_georgia');
var app_link = app_link_l.setUrl('https://github.com/shijuanchen/forest_degradation_georgia',{whiteSpace: 'pre'}, {width: '100%'});
var menuSet = ui.Panel([app_title, app_author,
                        final_map_l, final_map_Button, first_year_l, first_year_Button,
                        last_year_l, last_year_Button, annual_deg_def_l,annual_deg_def_select, 
                        ab_gr_l, ab_gr_Button, seg_dis_l, seg_dis_Button, annual_lc_l, lc_select, 
                        app_doc1, app_paper_l, app_paper_free_l,
                        app_doc2, app_link], 
                        ui.Panel.Layout.Flow('vertical'));
var menuUISet = ui.Panel([menuSet]);
var menuPanel = ui.Panel({
  widgets: [menuUISet],
  style: {width: '100%'}});
var mapPanel = ui.Map({style: {cursor: 'crosshair'}});
mapPanel.setOptions('SATELLITE');  
  // ui panel
var controlPanel = ui.Panel({
  style: {width: '30%'},
  widgets:[menuPanel]});
var mapPanel2 = ui.Panel({
  style: {width: '70%'},
  widgets:[mapPanel]});
var uiPanel = ui.SplitPanel(controlPanel, mapPanel2, 'horizontal');
//----------------Events (Display)---------------------
var Georgia_border = ee.FeatureCollection('users/shijuanchen32/georgia_public/Georgia_boundary');
var empty = ee.Image().byte();
var border = empty.paint({  featureCollection: Georgia_border, color: 1, width: 1});
var category_legend = function(title, names, palette){
  var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
  var legendTitle = ui.Label({value: title,
                   style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
        var colorBox = ui.Label({style: {backgroundColor: color,padding: '8px',margin: '0 0 4px 0'}});
        var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
        return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});
     };
  for (var i = 0; i < names.length; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
  mapPanel.add(legend);
}
var add_year_legend = function(){
  //add lengend
  var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
  var legendTitle = ui.Label({value: 'Disturbance year',
                   style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
  legend.add(legendTitle);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var viz_min = 1987;
  var viz_max = 2019;
  var viz = {min:viz_min, max:viz_max, palette: ['#2c7bb6',  '#abd9e9', '#ffffbf', '#fdae61', '#d7191c']};
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var panel_e = ui.Panel({
  widgets: [ui.Label('2019')]});
  legend.add(panel_e);
  var thumbnail = ui.Thumbnail({image: legendImage,
  params: {bbox:'0,0,10,100', dimensions:'10x200'},
  style: {padding: '1px', position: 'bottom-center'}
  });
  legend.add(thumbnail);
  var panel_s = ui.Panel({widgets: [ui.Label('1987')]});
  legend.add(panel_s);
  mapPanel.add(legend);
};
final_map_Button.onClick(function() {
  mapPanel.clear();
  // (1:forest degradation, 2:deforestation, 3:stable forest, 4:non-forest)
  var final_map = ee.Image('users/shijuanchen32/georgia_public/final_map');
  var palette = ['#FF0000','#FFFF00','#4F7942','#303030'];
  var viz = {min: 1, max: 4, palette: palette};
  var names = ['forest degradation', 'deforestation', 'stable forest', 'non-forest'];
  var title = 'Final Map (1987-2019)';
  category_legend(title, names, palette);
  mapPanel.addLayer(final_map, viz, 'final_map');
});
first_year_Button.onClick(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'red'}, 'Georgia_border');
  add_year_legend();
  var first_year = ee.Image('users/shijuanchen32/georgia_public/first_year_change');
  var viz = {min:1987, max:2019, palette: ['#2c7bb6',  '#abd9e9', '#ffffbf', '#fdae61', '#d7191c']};
  mapPanel.addLayer(first_year, viz, 'first year of disturbance');
});
last_year_Button.onClick(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'red'}, 'Georgia_border');
  add_year_legend();
  var last_year = ee.Image('users/shijuanchen32/georgia_public/last_year_change');
  var viz = {min:1987, max:2019, palette: ['#2c7bb6',  '#abd9e9', '#ffffbf', '#fdae61', '#d7191c']};
  mapPanel.addLayer(last_year, viz, 'last year of disturbance');
});
annual_deg_def_select.onChange(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'red'}, 'Georgia_border');
  var y = annual_deg_def_select.getValue();
  var deg_def = ee.Image('users/shijuanchen32/georgia_public/annual_deg_def/'+y);
  var viz = {min: 1, max: 2, palette: ['#FF0000','#FFFF00']};
  mapPanel.addLayer(deg_def, viz, 'disturbance_map', true);   
  var title = 'Disturbance type';
  var names = ['Forest degradation', 'Deforestation'];
  var palette = ['#FF0000','#FFFF00'];
  category_legend(title, names, palette);
}); 
ab_gr_Button.onClick(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'red'}, 'Georgia_border');
  var seg_dis = ee.Image('users/shijuanchen32/georgia_public/seg_abrupt_gradual');
  var first_year = ee.Image('users/shijuanchen32/georgia_public/first_year_change');
  var ab_gr = ee.ImageCollection([seg_dis.select('S1_forest_loss').rename('deg').toInt8(),seg_dis.select('S2_forest_loss').rename('deg').toInt8(),
                              seg_dis.select('S3_forest_loss').rename('deg').toInt8(),seg_dis.select('S4_forest_loss').rename('deg').toInt8(),
                              seg_dis.select('S5_forest_loss').rename('deg').toInt8(),seg_dis.select('S6_forest_loss').rename('deg').toInt8()]).mosaic();
  var viz = {min: 1, max: 3, palette: ['#FFFF00','#FF0000','#FFA500']};
  ab_gr = ab_gr.updateMask(first_year);
  mapPanel.addLayer(ab_gr, viz, 'disturbance_map', true);   
  var title = 'Disturbance type';
  var names = ['Gradual disturbance', 'Abrupt disturbance', 'Both'];
  var palette =  ['#FFFF00','#FF0000','#FFA500'];
  category_legend(title, names, palette);
});
seg_dis_Button.onClick(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'red'}, 'Georgia_border');
  var seg_dis = ee.Image('users/shijuanchen32/georgia_public/seg_abrupt_gradual');
//  var viz = {min: 1, max: 3, palette: ['yellow','red','orange']};
  var viz = {min: 1, max: 3, palette: ['#FFFF00','#FF0000','#FFA500']};
  mapPanel.addLayer(seg_dis.select('S1_forest_loss'), viz, 'S1', true);
  mapPanel.addLayer(seg_dis.select('S2_forest_loss'), viz, 'S2', true);
  mapPanel.addLayer(seg_dis.select('S3_forest_loss'), viz, 'S3', true);
  mapPanel.addLayer(seg_dis.select('S4_forest_loss'), viz, 'S4', true);
  mapPanel.addLayer(seg_dis.select('S5_forest_loss'), viz, 'S5', true);
  mapPanel.addLayer(seg_dis.select('S6_forest_loss'), viz, 'S6', true);   
  var title = 'Disturbance type';
  var names = ['Gradual disturbance', 'Abrupt disturbance', 'Both'];
  var palette =  ['#FFFF00','#FF0000','#FFA500'];
  category_legend(title, names, palette);
});
lc_select.onChange(function() {
  mapPanel.clear();
  var title = 'Land Cover';
  var names = ['Deciduous Forest', 'Coniferous Forest', 'Mixed Forest', 'Non-vegetated', 'Farmland', 'Shrub/Grass', 'Water/Wetland'];
  var palette = ['#00FF00','#006400','#06a30f','#a09e9e', '#ffac03','#fffd05' , '#0821ff'];
  category_legend(title, names, palette);
  var y = lc_select.getValue();
  var lc = ee.Image('users/shijuanchen32/georgia_public/land_cover/'+y);
  var viz = {min: 1, max: 7, palette: palette};
  mapPanel.addLayer(lc, viz, 'land_cover', true);   
});
//-----------------Initialization---------------------
ui.root.clear();
ui.root.add(uiPanel);
mapPanel.centerObject(Georgia_border);
mapPanel.addLayer(border, {palette: 'red'}, 'Georgia_border');