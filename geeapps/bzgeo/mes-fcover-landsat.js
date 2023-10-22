// Last updated: 10 Oct. 2023
var a = require('users/bzgeo/examples:_ancillary/mes');
var b = require('users/servirbz/packages:img_list_landsat_sma_fc__mes');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var img_raw = b.img_raw;
var img_sma = b.img_sma;
var img_for = b.img_for2;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: SET UP LEFT AND RIGHT PANEL WINDOWS
// CREATE LEFT 7 RIGHT MAPS
var leftMap = ui.Map();
leftMap.setOptions('TERRAIN');
leftMap.setControlVisibility(true);
var rightMap = ui.Map();
rightMap.setOptions('TERRAIN');
rightMap.setControlVisibility(true);
//
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose year to visualize');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(img_raw[selection].visualize(b.viz_543),{},"L0_Landsat_imagery", 0));
    mapToChange.layers().set(1, ui.Map.Layer(img_sma[selection].visualize({}),{},"L1_Landsat_SMA", 1));
    mapToChange.layers().set(2, ui.Map.Layer(img_for[selection],{},"L2_Forest_cover", 0));
    mapToChange.layers().set(4, ui.Map.Layer(a.pa_mes_ln.clip(a.mes_bnds),{palette: "yellow"},"Prot. areas", 1));
    mapToChange.layers().set(5, ui.Map.Layer(a.bnds_intl_ln2,{palette: "white"},"Int'l boundaries", 1));
    }
var select = ui.Select({items: Object.keys(img_raw), onChange: updateMap});
  select.setValue(Object.keys(img_raw)[defaultValue], true);
var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
var rightSelector = addLayerSelector2(rightMap, 39, 'top-right');
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose year to visualize');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(img_raw[selection].visualize(b.viz_543),{},"L0_Landsat_imagery", 0));
    mapToChange.layers().set(1, ui.Map.Layer(img_sma[selection].visualize({}),{},"L1_Landsat_SMA", 1));
    mapToChange.layers().set(2, ui.Map.Layer(img_for[selection],{},"L2_Forest_cover", 0));
    mapToChange.layers().set(4, ui.Map.Layer(a.pa_mes_ln.clip(a.mes_bnds),{palette: "yellow"},"Prot. areas", 1));
    mapToChange.layers().set(5, ui.Map.Layer(a.bnds_intl_ln2,{palette: "white"},"Int'l boundaries", 1));
    }
var select = ui.Select({items: Object.keys(img_raw), onChange: updateMap});
  select.setValue(Object.keys(img_raw)[defaultValue], true);
var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2: INITIATE THE SPLIT PANEL
var splitPanel = ui.SplitPanel({firstPanel:leftMap, secondPanel:rightMap, wipe:true, style:{stretch: 'both'}});
var title = ui.Label("Forest cover change, 1984-2023: the Mesoamerican Biological Corridor", {stretch:'horizontal',textAlign:'center',fontWeight:'bold',fontSize:'20px', color: 'green'});
var descr = ui.Label("instructions: swipe images to compare them", {stretch:'horizontal',textAlign:'center',fontSize: '13px', color: 'mediumseagreen'});
var credits = ui.Label("credits: Landsat imagery © NASA, USGS, processed with Kennedy et al. (2018)'s LandTrendr algorithm", {stretch:'horizontal',textAlign:'center',fontSize: '12px', color: 'gray'},
['https://code.earthengine.google.com/b4f58ff122e39d823f55fedf2d85d4ef']);
ui.root.widgets().reset([title, descr, credits, splitPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-88.7547, 17.2487,8);
rightMap.setCenter(-88.7547, 17.2487,8);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////