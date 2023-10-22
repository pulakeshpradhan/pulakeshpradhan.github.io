////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Displays last 3 Sentinel-1 images
// Domain: Guatemala
// Last update: 8 June 2020 | Spanish
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var c = require('users/servirbz/packages:bz/bz');
var r = require('users/servirbz/packages:img_recent');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctr = ee.Geometry.Point([-90.4703, 16.2516]);
var roi = c.gt_box;
var t1_date = "2020-05-20";
var t2_date = "2020-05-26";
var t3_date = "2020-06-01";
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD")
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filter(ee.Filter.eq('relativeOrbitNumber_start', 26))
    .filterBounds(roi) // MODIFY GEOGRAPHY *FOR VISUALIZATION* HERE
    ;
var s1_t3 = s1.filterDate(t3_date, ee.Date(t3_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_t2 = s1.filterDate(t2_date, ee.Date(t2_date).advance(1, 'day')).median().updateMask(c.msk);
var s1_t1 = s1.filterDate(t1_date, ee.Date(t1_date).advance(1, 'day')).median().updateMask(c.msk);
var image = ee.Image.cat([s1_t3, s1_t2]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pal_multi = {min:-19.84,max:-10.1,gamma:10, bands: ["VH_1","VH","VH"]};
//////
var map1 = ui.Map();
map1.setOptions('HYBRID');
map1.centerObject(ctr,8);
map1.setControlVisibility({mapTypeControl: false});
map1.addLayer(image, pal_multi, "VH antes y después", true);
map1.addLayer(image, {min:-19.84,max:-10.1, bands: ["VH_1"]}, "VH_antes_2020-05-26", false);
map1.addLayer(image, {min:-19.84,max:-10.1, bands: ["VH"]}, "VH_después_2020-06-01", false);
map1.addLayer(c.pa_cam.clip(roi), {palette: "teal"},"Áreas protegidas", false);
map1.addLayer(c.bnds.clip(roi),{palette: "gray"},"Limites", true);
var map2 = ui.Map();
map2.setOptions('HYBRID');
map2.centerObject(ctr,8);
map2.setControlVisibility({mapTypeControl: false});
map2.addLayer(image, pal_multi, "VH antes y después", false);
map2.addLayer(image, {min:-19.84,max:-10.1, bands: ["VH_1"]}, "VH_antes_2020-05-26", false);
map2.addLayer(image, {min:-19.84,max:-10.1, bands: ["VH"]}, "VH_después_2020-06-01", false);
map2.addLayer(c.pa_cam.clip(roi), {palette: "lime"},"Áreas protegidas", true);
map2.addLayer(c.bnds.clip(roi),{palette: "white"},"Limites", true);
var title = ui.Label("Imágenes radar Sentinel-1 después de Tormenta Tropical Amanda (Guatemala)", {stretch:'horizontal',textAlign:'left',fontWeight:'bold',fontSize:'22px'});
var subtitle1 = ui.Label('datos de: ' + t2_date + " , " + t3_date, {stretch:'horizontal',textAlign:'left',fontSize:'14px', color: "blue"});
var subtitle2 = ui.Label("ventana derecha: áreas potencialmente inundadas representadas en rojo", {stretch:'horizontal',textAlign:'left',fontSize:'14px', color: "red"});
var credits = ui.Label('crédito: contiene datos modificados de Sentinel de Copernicus / la Agencia Espacia de Europa', {stretch:'horizontal',textAlign:'left',fontSize:'14px', color: "gray"});
var branding = ui.Thumbnail({image:ee.Image("users/servirbz/compil_imagery/_logos/logos_nasa_sica_svr1"),params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'157.5px',height:'52px'}});
var linker = ui.Map.Linker([map1, map2]);
var splitPanel = ui.SplitPanel({firstPanel:map1, secondPanel:map2, wipe:true, style:{stretch: 'both'}}); // (1)
ui.root.widgets().reset([splitPanel]);
var main = ui.Panel({style: {width: '335px', padding: '8px'}});
main.add(title);
main.add(subtitle1);
main.add(subtitle2);
main.add(credits);
//main.add(branding);
ui.root.insert(0, main);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////