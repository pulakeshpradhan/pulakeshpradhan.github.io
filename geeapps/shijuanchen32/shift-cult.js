//-----------------User's Interface---------------------
var palettes = require('users/gena/packages:palettes');
var start = 1991;
var end = 2020;
var paletteY = palettes.colorbrewer.RdYlBu[9].reverse();
var vizY = {min:start, max:end, palette: paletteY};
var app_title = ui.Label({value: 'Shifting cultivation and other forest disturbances in Laos',
                      style: {width: '95%', fontSize: '30px', color: 'black'} 
                    });
var app_author = ui.Label('Author: Shijuan Chen',{whiteSpace: 'pre'});
var final_map_l = ui.Label('1. Disturbance types in Laos (1991-2020)');
var final_map_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
var an_dis_map_l = ui.Label('2. Annual disturbance type maps');
var an_lc_map_l = ui.Label('3. Annual land cover maps');
var an_shift_l = ui.Label('4. Annual shifting cultivation (shown as red)');
var year_dis = [];
for (var y = start; y <= end; y++){
  year_dis.push(y.toString());
}
year_dis = ee.List(year_dis);
var an_dis_select = ui.Select({items:year_dis.getInfo(), placeholder:'Select a year to display', style: {width: '95%'}});
var an_shif_select = ui.Select({items:year_dis.getInfo(), placeholder:'Select a year to display', style: {width: '95%'}});
var an_lc_select = ui.Select({items:year_dis.getInfo(), placeholder:'Select a year to display', style: {width: '95%'}});
var annual_shift_Button = ui.Button({label: 'Display ', style: {width: '95%'}});
var zenodo = ui.Label('\nZenodo link for downloading');
var zenodo_link = zenodo.setUrl('https://doi.org/10.5281/zenodo.7782782')
var github = ui.Label('\nGitHub link for GEE ID and documentation');
var github_link = github.setUrl('https://github.com/shijuanchen/shift_cult')
var app_doc1 = ui.Label('\nPlease cite the references:')
var app_paper1 = ui.Label('Chen, S., Olofsson, P., Saphangthong, T., & Woodcock, C. E. (2023). \
Monitoring shifting cultivation in Laos with Landsat time series. Remote Sensing of Environment, 288, 113507.');
var app_link1 = app_paper1.setUrl('https://www.sciencedirect.com/science/article/pii/S0034425723000585');
var app_paper2 = ui.Label('Chen, S., Woodcock, C. E., Saphangthong, T., & Olofsson, P. (2023). \
Satellite data reveals a recent increase in shifting cultivation and associated carbon emissions in Laos. \
Environmental Research Letters 18, 114012.');
var app_link2 = app_paper2.setUrl('https://iopscience.iop.org/article/10.1088/1748-9326/acffdd');
var menuSet = ui.Panel([app_title, app_author,
                        final_map_l, final_map_Button, 
                        an_dis_map_l, an_dis_select,
                        an_lc_map_l, an_lc_select,
                        an_shift_l,   an_shif_select,
                        zenodo_link, github_link,
                        app_doc1, app_link1,
                        app_paper2
                        //, app_link2
                        ], 
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
var Country_border = ee.FeatureCollection('users/shijuanchen32/laos/boundary/laos_country_boundary');
var empty = ee.Image().byte();
var border = empty.paint({  featureCollection: Country_border, color: 1, width: 1});
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
  var viz_min = start;
  var viz_max = end;
  var viz = {min:viz_min, max:viz_max, palette: ['#2c7bb6',  '#abd9e9', '#ffffbf', '#fdae61', '#d7191c']};
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var panel_e = ui.Panel({
  widgets: [ui.Label(end.toString())]});
  legend.add(panel_e);
  var thumbnail = ui.Thumbnail({image: legendImage,
  params: {bbox:'0,0,10,100', dimensions:'10x200'},
  style: {padding: '1px', position: 'bottom-center'}
  });
  legend.add(thumbnail);
  var panel_s = ui.Panel({widgets: [ui.Label(start.toString())]});
  legend.add(panel_s);
  mapPanel.add(legend);
};
final_map_Button.onClick(function() {
  mapPanel.clear();
  /*
1. Stable forest,  2. Non-forest,    3. Shifting cultivation
4. Deforestation,  5. New plantation
*/
  var final_map = ee.Image('users/shijuanchen32/laos/map_products/aggre_simple_map_v15');
  var palette = ['#2C5D3F', 'black','red', 'orange','#9ad607'];
              //green,     black   red    orange,
  var viz = {min:1, max:5, palette: palette};
                                       //green,     light green,black   purple,   , cyan       ,orange, red  
   var names = ['Stable forest', 'Non-forest', 'Shifting cultivation',
            'Deforestation','New plantation']; 
   var title = 'Final Map';
  category_legend(title, names, palette);
  mapPanel.addLayer(final_map, viz, 'final_map');
  mapPanel.addLayer(border, {palette: 'white'}, 'Laos_border');
});
an_dis_select.onChange(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'white'}, 'Laos_border');
  var y = an_dis_select.getValue();
  var annual_col = ee.ImageCollection('users/shijuanchen32/laos_public/annual_dis_type_v15');
  var annual_dis = annual_col.filter(ee.Filter.eq('year', parseInt(y))).first();
  var vis_type = {min:1, max:8, palette: ['#2C5D3F', '#629632', 'black','#551033', '#6d06dd', '#9ad607', 'orange','red']};
                                       //green,     light green,black   pink,    purple,   yellow green,orange, red  
  mapPanel.addLayer(ee.Image(annual_dis), vis_type, 'annual_dis_'+ y.toString(), true);   
  var title = 'Disturbance type';
  var names = ['Forest','Plantation','Non-forest','Subtle disturbances',
              'Severe drought', 'New Plantation', 'Deforestation', 'Shifting cultivation'];
  var palette = ['#2C5D3F', '#629632', 'black','#551033', '#6d06dd', '#9ad607', 'orange','red'];
  category_legend(title, names, palette);
})
an_lc_select.onChange(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'white'}, 'Laos_border');
  var y = an_lc_select.getValue();
   //1:natural forest:green  2:plantation:light green  3:agriculture:orange  4:shrub/grass:yellow  5:wetland/water:blue   6:urban/barren:grey
  var vis =  {min:1, max:6, palette: ['#008000','#00FF00','#FFBF00','#d0e202', '#0000FF', '#808080']}  ;
  var lc = ee.Image('users/shijuanchen32/laos_public/annual_maps_v41/' + y);
  mapPanel.addLayer(lc, vis, y.toString(), true)
  var title = 'Land cover';
  var names = ['Forest', 'Plantation', 'Agriculture', 'Shrub or grass', 'Wetland or water', 'Non-vegetated'];
  var palette = ['#008000','#00FF00','#FFBF00','#d0e202', '#0000FF', '#808080'];
  // name of the legend
  category_legend(title, names, palette)
})
an_shif_select.onChange(function() {
  mapPanel.clear();
  mapPanel.addLayer(border, {palette: 'white'}, 'Laos_border');
  var y = an_shif_select.getValue();
   //1:natural forest:green  2:plantation:light green  3:agriculture:orange  4:shrub/grass:yellow  5:wetland/water:blue   6:urban/barren:grey
  var vis =  {min:1, max:6, palette: ['#008000','#00FF00','#FFBF00','#d0e202', '#0000FF', '#808080']}  ;
  var shift = ee.Image('users/shijuanchen32/laos_public/annual_dis_type_v15/' + y).eq(8).selfMask();
  mapPanel.addLayer(shift, {palette:'red'}, y, true)
})
//-----------------Initialization---------------------
ui.root.clear();
ui.root.add(uiPanel);
mapPanel.centerObject(Country_border);
mapPanel.addLayer(border, {palette: 'white'}, 'Laos_border');