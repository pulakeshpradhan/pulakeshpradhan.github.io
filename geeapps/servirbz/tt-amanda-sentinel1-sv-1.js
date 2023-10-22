////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Displays last 3 Sentinel-1 images
// Domain: El Salvador
// Last update: 8 June 2020 | Spanish
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var c = require('users/servirbz/packages:bz/bz');
var r = require('users/servirbz/packages:img_recent');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctr = ee.Geometry.Point([-88.9661, 13.3683]);
var roi = c.sv_box;
var t1_date = "2020-05-11";
var t2_date = "2020-05-23";
var t3_date = "2020-06-04";
var s1_asc = ee.ImageCollection("COPERNICUS/S1_GRD").filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', 63))
    .filterBounds(roi) // MODIFY GEOGRAPHY *FOR VISUALIZATION* HERE
    ;    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var s1_asc_t3 = s1_asc.filterDate(t3_date, ee.Date(t3_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_asc_t2 = s1_asc.filterDate(t2_date, ee.Date(t2_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_asc_t1 = s1_asc.filterDate(t1_date, ee.Date(t1_date).advance(1, 'day')).median().updateMask(c.msk);
var image = ee.Image.cat([s1_asc_t3, s1_asc_t2]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pal_multi = {min:-19.84,max:-10.1,gamma:10, bands: ["VH_1","VH","VH"]};
//////
var map1 = ui.Map();
map1.setOptions('HYBRID');
map1.centerObject(ctr,8);
map1.setControlVisibility({mapTypeControl: false});
map1.add(ui.Label("Antes:  " + t2_date, {color: "lightseagreen"}));
map1.addLayer(image, pal_multi, "VH antes y después", false);
map1.addLayer(image, { min:-19.84,max:-10.1, bands: ["VH_1"]}, "VH_antes_2020-05-23", true);
map1.addLayer(image, { min:-19.84,max:-10.1, bands: ["VH"]}, "VH_después_2020-06-04", false);
map1.addLayer(c.pa_cam.clip(roi), {palette: "teal"},"Áreas protegidas", false);
map1.addLayer(c.bnds.clip(roi),{palette: "red"},"Limites", true);
var map2 = ui.Map();
map2.setOptions('HYBRID');
map2.centerObject(ctr,8);
map2.setControlVisibility({mapTypeControl: false});
map2.add(ui.Label("Después:  " + t3_date, {color: "blue"}));
map2.addLayer(image, pal_multi, "VH antes y después", false);
map2.addLayer(image, { min:-19.84,max:-10.1, bands: ["VH_1"]}, "VH_antes_2020-05-23", false);
map2.addLayer(image, { min:-19.84,max:-10.1, bands: ["VH"]}, "VH_después_2020-06-04", true);
map2.addLayer(c.pa_cam.clip(roi), {palette: "teal"},"Áreas protegidas", false);
map2.addLayer(c.bnds.clip(roi),{palette: "red"},"Limites", true);
var map3 = ui.Map();
map3.setOptions('HYBRID');
map3.centerObject(ctr,8);
map3.setControlVisibility({mapTypeControl: false});
map3.add(ui.Label("Antes y después", {color: "red"}));
map3.addLayer(image, pal_multi, "VH antes y después", true);
map3.addLayer(image, { min:-19.84,max:-10.1, bands: ["VH_1"]}, "VH_antes_2020-05-26", false);
map3.addLayer(image, { min:-19.84,max:-10.1, bands: ["VH"]}, "VH_después_2020-06-01", false);
map3.addLayer(c.pa_cam.clip(roi), {palette: "teal"},"Áreas protegidas", false);
map3.addLayer(c.bnds.clip(roi),{palette: "gray"},"Limites", true);
//////
var title = ui.Label("Imágenes radar Sentinel-1 después de Tormenta Tropical Amanda (El Salvador)", {stretch:'horizontal',textAlign:'center',fontWeight:'bold',fontSize:'24px'});
var subtitle = ui.Label("ventana derecha: áreas potencialmente inundadas representadas en rojo", {stretch:'horizontal',textAlign:'center',fontSize:'16px', color: "red"});
var credits = ui.Label('crédito: contiene datos modificados de Sentinel de Copernicus / la Agencia Espacia de Europa', {stretch:'horizontal',textAlign:'center',fontSize:'14px'});
var linker = ui.Map.Linker([map1, map2, map3]);
var mapGrid = ui.Panel([map1, map2, map3], ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
ui.root.widgets().reset([title, credits, subtitle, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////