var command_area = ui.import && ui.import("command_area", "table", {
      "id": "users/seiasia/sciforum/basin_boundary"
    }) || ee.FeatureCollection("users/seiasia/sciforum/basin_boundary");
// var command_area = ee.FeatureCollection("users/seiasia/sciforum/basin_boundary");
var logo = ee.Image("users/seiasia/SEI_GEE_cropped");
Map.setCenter(100.73,13.74,6);
// Map.addLayer(districtlayer)
var veg_weight = []
var gw_weight = []
var meteo_weight = []
var command_area_select
var areaofinterest
var PALETTE = ["#b35a00","#d9963a","#daffa5","#6da7fb","#0051f2"];
// UI ASPECTS
var UI_panel = ui.Panel({style: {position:'top-left', width:'330px'}});
var f_title = {fontSize: '18px',fontWeight: "Bold",color: '#236AB9',padding: '8px 4px 4px 13px'};
var f_subtitle = {fontSize: '14px',fontWeight:'bold', color: 'black'};
var f_score = {fontSize: '14px',fontWeight:'bold', color: '#B85B14'};
var f_best_score = {fontSize: '14px',fontWeight:'bold', color: 'green'};
var f_text = {fontSize: '14px', color: 'black'};
var f_text1 = {fontSize: '12px', color: 'black'};
var f_stats = {fontSize: '12px', color: 'black'};
var f_stats_title = {fontSize: '12px', color: 'black',fontWeight : 'bold'};
var f_submit = {fontSize: '14px',fontWeight:'bold', color: '#341C09',padding: '4px 20px 4px 15px'};
var reset_map = function(index){
  Map.layers().reset();
  Map.setOptions('ROADMAP');
  var removedisplays_1 = Map.layers();
  removedisplays_1.map(function(p){Map.remove(p)});
  var veg_weight = []
  var gw_weight = []
  var meteo_weight = []
  var command_area_select
  var areaofinterest
};
// var getParams = function() {
//     var input_list = UI_panel.widgets(); 
//     print(input_list)
//     var vegwt = input_list.get(2).widgets().get(1).getValue();
//     var metwt = input_list.get(7).widgets().get(1).getValue();
//     var gwwt = input_list.get(9).widgets().get(1).getValue();
//     var oo = ee.List([ee.Number.parse(vegwt), ee.Number.parse(metwt), ee.Number.parse(gwwt)]);
//   return oo
// };
var Loadbutton = ui.Button({
  label: 'Calculate', style:{margin:'15px 20px 0px 50px', width:'120px'},
  onClick: function(){
    var veg_classf
    if (ndvibutton.getValue() === true){
      var featu = "users/seiasia/sciforum/" + areaofinterest + "_ndvi";
      var ndviclip = ee.Image(featu);
      // var ndviclip = ndvidatalayer.clip(command_area_select)//.rename("veg");
      Map.addLayer(ndviclip ,{min:0,max:100, palette:PALETTE},"NDVI",false)
      veg_classf = ndviclip.expression(  // Criteria scores
      '(b < 20) ? 100 \
      : (b <= 40) ? 80 \
      : (b <= 60) ? 60 \
      : (b <= 80) ? 40 \
      : (b > 100) ? 20 \
      : 0', {'b': ndviclip.select('ndvi'),}).rename("veg")
    }
    else {}
    if (vcibutton.getValue() === true){
      var featu1 = "users/seiasia/sciforum/" + areaofinterest + "_vci";
      var vciclip = ee.Image(featu1);
      // var vciclip = (vcidatalayer.clip(command_area_select))//.rename("veg");
      Map.addLayer(vciclip ,{min:0,max:1000, palette:PALETTE},"VCI",false)
       veg_classf = vciclip.expression('(b < 2000) ? 100 \
          : (b <= 4000) ? 80 \
          : (b <= 6000) ? 60 \
          : (b <= 8000) ? 40 \
          : (b > 8000) ? 20 \
          : 0', {'b': vciclip.select('VCI'),}).rename("veg")
    }
    else {}    
    if (tcibutton.getValue() === true){
      var featu2 = "users/seiasia/sciforum/" + areaofinterest + "_tci";
      var tciclip = ee.Image(featu2);
      // var tciclip = (tcidatalayer.clip(command_area_select))//.rename("veg");
      Map.addLayer(tciclip ,{min:0,max:10000, palette:PALETTE},"TCI",false)
      veg_classf = tciclip.expression(  // Criteria scores
    '(b < 2000) ? 100 \
          : (b <= 4000) ? 80 \
          : (b <= 6000) ? 60 \
          : (b <= 8000) ? 40 \
          : (b > 8000) ? 20 \
          : 0',
    {'b': tciclip.select('TCI'),}).rename("veg")
    }
    else {}
    if (vhibutton.getValue() === true){
      var featu3 = "users/seiasia/sciforum/" + areaofinterest + "_vhi";
      var vhiclip = ee.Image(featu3);
      // var vhiclip = (vhidatalayer.clip(command_area_select))//.rename("veg");
      Map.addLayer(vhiclip ,{min:500,max:10000, palette:PALETTE},"VHI",false)
      veg_classf = vhiclip.expression(  // Criteria scores
    '(b < 2000) ? 100 \
          : (b <= 4000) ? 80 \
          : (b <= 6000) ? 60 \
          : (b <= 8000) ? 40 \
          : (b > 8000) ? 20 \
          : 0',
    {'b': vhiclip.select('VHI'),}).rename("veg")
    }
    else {}
    if (kbdibutton.getValue() === true){
      var featu4 = "users/seiasia/sciforum/" + areaofinterest + "_kbdi";
      var kbdiclip = ee.Image(featu4);
      // var kbdiclip = kbdidatalayer.clip(command_area_select)//.rename("met");
      // print(kbdiclip)
      Map.addLayer(kbdiclip ,{min:200,max:700, palette:PALETTE},"KBDI",false)
      var met_classf = kbdiclip.expression(  // Criteria scores
    '(b < 399) ? 20 \
          : (b <= 499) ? 40 \
          : (b <= 500) ? 60 \
          : (b <= 650) ? 80 \
          : (b > 650) ? 100 \
          : 0',
    {'b': kbdiclip.select('KBDI'),}).rename("met")
    } // min 0 to 800
    else {}
    if (dgrbutton.getValue() === true){
      var featu5 = "users/seiasia/sciforum/" + areaofinterest + "_dgr";
      var dgrclipd = ee.Image(featu5);
      // var dgrclip = dgrdatalayer.clip(command_area_select)
      // var dgrclipd = dgrdatalayer.select('b1').clip(command_area_select);
      // print(dgrclipd)
      var stats1 = dgrclipd.reduceRegion({
        reducer: ee.Reducer.percentile([2,98]).combine({
          reducer2: ee.Reducer.minMax(), 
          sharedInputs: true
        }),
        geometry: command_area_select.geometry(), 
        scale: 1000,
        maxPixels: 1e13
      });
      var gw_classf = dgrclipd.expression('(b < 10) ? 20 \
          : (b <= 25) ? 40 \
          : (b <= 45) ? 60 \
          : (b <= 64) ? 80 \
          : (b > 64) ? 100 \
          : 0', {'b': dgrclipd.select('b1'),}).rename('gw');  
      // var selectedareaimage = image.select('b1');         
      var dgrclip = dgrclipd.visualize({ min:stats1.get('b1_min'),max:stats1.get('b1_p98')});
      Map.addLayer(dgrclip ,{palette:PALETTE},"groundwater",false)}
    else {}
    // Weighted Overlay based on user defined weights ++++++++++++++++++++++++++++++++
    var weighted_overlay_neo = function(img_inp, weights){
      // overall score = [criteria score1 X weight1] + [criteria score2 X weight2] + [criteria score3 X weight3] ...........
      var veg_meas = (img_inp.select("veg")).multiply(ee.Number(weights.get(0)));
      var met_meas = (img_inp.select("met")).multiply(ee.Number(weights.get(1)));
      var gw_meas = (img_inp.select("gw")).multiply(ee.Number(weights.get(2)));
      var finale = veg_meas.add(met_meas).add(gw_meas)
      finale = finale.divide(3)
      return finale.selfMask() //veg_meas.add(met_meas).add(gw_meas)//.add(rainf);
    };
    var criteria_weights = ee.List([veg_weight, meteo_weight, gw_weight])//getParams();
    // print(criteria_weights)
    // print(params);
    var compiled = veg_classf.addBands(met_classf).addBands(gw_classf);
    // Map.addLayer(compiled)
    var finalscore = weighted_overlay_neo(compiled,criteria_weights);
    // Map.addLayer(finalscore,{min:0, max:150, palette:colorbrewer.Palettes.Spectral[11].reverse()},"Results");
    Map.addLayer(finalscore,{min:0, max:150, palette:PALETTE.reverse()},"Results");
    var stats_finale = finalscore.reduceRegion({reducer: ee.Reducer.median(),geometry:command_area_select.geometry(),scale: 1000,maxPixels: 1e13})
    var curr = ee.Number(stats_finale.get('veg')).format('%.2f')//.getInfo() //20
    curr = curr.getInfo()//ee.Number(curr).format('%.2f')
    var best = 100
    score_title.setValue('Your Score: ' + curr);
    best_score_title.setValue('Max Score: ' + best);
  }// inside on click
});
// Get the list of IDs and put them into a select
var featurename = command_area.aggregate_array("MBASIN_E");
var featurename = ee.List(featurename).sort();
// Display the image with the given ID.
var show_command = function(id) {
  command_area_select = command_area.filterMetadata('MBASIN_E', "equals", id);
  areaofinterest = id.toLowerCase()
  Map.addLayer(command_area_select,{},"Selected Basin")
  Map.centerObject(command_area_select, 7)};
var location_selection = ui.Panel([ui.Select({
  items: featurename.getInfo(),
  placeholder: "Select Basin",
  onChange: show_command,
  style: {fontSize: '20px',margin: '10px 5px 4px 15px', padding: '1px',width:'230px'}})]);
var ndvibutton = ui.Checkbox({label: 'NDVI', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var tcibutton = ui.Checkbox({label: 'TCI', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var vcibutton = ui.Checkbox({label: 'VCI', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var vhibutton = ui.Checkbox({label: 'VHI', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var dgrbutton = ui.Checkbox({label: 'Groundwater', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var meteobutton = ui.Checkbox({label: 'Precipitation', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var kbdibutton = ui.Checkbox({label: 'KBDI', value:false, style: {fontSize: '14px',margin: '10px 5px 4px 15px', padding: '1px'}})
var title = ui.Panel([
    ui.Label({
        value: 'Drought Game',
        style: f_title
    })
]);
// for slider
function updateComposite_nd(value) {
  // Make a filter out of the slider value.
  veg_weight = Number(value);
}
function updateComposite_met(value) {
  // Make a filter out of the slider value.
  meteo_weight = Number(value);
}
function updateComposite_gw(value) {
  // Make a filter out of the slider value.
  gw_weight = Number(value);
}
var vegindex_title = ui.Panel([ui.Label({value: 'Agricultural Indicator',style: f_subtitle}),
ui.Slider({ min: 0.5, max: 5,step: 0.5,value:0.5, onChange: updateComposite_nd})
// ui.Textbox({placeholder: "1-5",value:veg_weight[0], style:{margin:'5px 20px 0px 30px', width:'50px'}})
], ui.Panel.Layout.flow('horizontal'));
var gwindex_title = ui.Panel([ui.Label({value: 'Groundwater Indicator', style: f_subtitle}),
// ui.Textbox({placeholder: "1-5",value:gw_weight[0], style:{margin:'5px 20px 0px 30px', width:'50px'}})
ui.Slider({ min: 0.5, max: 5,step: 0.5,value:0.5, onChange: updateComposite_gw})],
      ui.Panel.Layout.flow('horizontal'));
var meteoindex_title = ui.Panel([ui.Label({value: 'Meteorological Indicator', style: f_subtitle}),
// ui.Textbox({placeholder: "1-5",value:meteo_weight[0], style:{margin:'5px 20px 0px 30px', width:'50px'}})
ui.Slider({ min: 0.5, max: 5,step: 0.5,value:0.5, onChange: updateComposite_met})],
      ui.Panel.Layout.flow('horizontal'));
var score_title = ui.Label({value: 'Your Score:', style: f_score}); 
var best_score_title = ui.Label({value: 'Max Score:', style: f_best_score})
var submit_score = ui.Label({
        value: 'Submit your score',
        style: f_submit,
        targetUrl:'https://forms.gle/8HP1whZj27DYds5z8'})
ui.root.insert(0, UI_panel);
UI_panel.add(title);
// UI_panel.add(subtitle);
UI_panel.add(location_selection);
// UI_panel.add(veg_index_selection)
UI_panel.add(vegindex_title);
UI_panel.add(ndvibutton);
UI_panel.add(vcibutton);
UI_panel.add(tcibutton);
UI_panel.add(vhibutton);
UI_panel.add(meteoindex_title);
// UI_panel.add(meteobutton);
UI_panel.add(kbdibutton);
UI_panel.add(gwindex_title);
UI_panel.add(dgrbutton);
// UI_panel.add(ui.Panel([ui.Checkbox("aa",false),ui.Checkbox("cv",false)],ui.Panel.Layout.flow('horizontal')))
// UI_panel.add(ui.Panel([dgrbutton,dgrbutton],ui.Panel.Layout.flow('horizontal')))
UI_panel.add(Loadbutton);
UI_panel.add(score_title);
UI_panel.add(best_score_title);
UI_panel.add(submit_score);
// UI_panel.add(Agri_multiplier)
UI_panel.add(ui.Button({
  label:'Reset', 
  onClick: reset_map,
  style:{margin:'15px 20px 0px 50px', width:'120px'}
}));
////////  FOOTERS
var f_footer = {fontSize: '12px', fontWeight: 0,  color: 'black'}; //position: 'bottom-left'
var footer = ui.Panel([ui.Panel([
  // ui.Label({
  //       value: 'To access historical yearly coastline changes check following link',
  //       style: f_footer
  //   }),
    ui.Label({value: 'This is a basic application developed for stakeholder understanding of different parameters used in drought assessment. It is specially designed for SEI Sci Forum 2021.',style: f_footer})]),
        ui.Panel([
      ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'60px',height:'80px'}}),// width = h *0.9
      ui.Panel([ui.Label({
        value: 'This tool is developed by',
        style: f_footer
    }),ui.Label({
        value: 'Stockholm Environment Institute',
        style: f_footer
    }),
      ui.Label({
        value: 'SEI Asia Center',
        style: f_footer,
        targetUrl:'https://www.sei.org/centres/asia'}),
        ], ui.Panel.Layout.flow('vertical'))], ui.Panel.Layout.flow('horizontal')),
    // ui.Label({
    //     value: 'For queries contact: dhyey.bhatpuria@sei.org',
    //     style: f_footer
    // }),
    ui.Label({
        value: 'Disclaimer: Stockholm Environment Institute (SEI) make no express or implied warranty of this application and associated data as to the merchantability or fitness for a particular purpose. SEI shall not be liable for special, consequential or incidental damages attributed to this application and associated data.',
        style: {fontSize: '9px',fontWeight: 0,  color: 'black', position: 'bottom-left'}
    })]
    );
var footer_blank = ui.Panel([
    ui.Label({
          value: '                                                                                                                                                                                                                  ',
        style: {fontSize: '18px', fontWeight: 0,  color: 'black', position: 'bottom-left'}
    })
]);
UI_panel.add(footer_blank);
UI_panel.add(footer);