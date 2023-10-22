////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Demonstrates before / after forest cover maps comparison with a variety of dates
// Domain: Mesoamerican Biological Corridor
// Last update: 26 April 2019
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var a = require('users/servirbz/packages:borrowed/anim_gena');
var b = require('users/servirbz/packages:mcd43a4_glob1');
var c = require('users/servirbz/packages:bz/bz');
var d = require('users/servirbz/packages:sma_std3');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import ROI, international boundaries, protected area boundaries
var roi = ee.FeatureCollection("users/servirbz/aoi/lac/cam/bz/bz_bounds_swbd_buff60m");
var bnds0 = ee.FeatureCollection("projects/servir-wa/aoi/world_country_bounds_esri");
var bnds = ee.Image().byte().paint({featureCollection:bnds0,color:'ffffff',width:1});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var mcd43a4_sma = ee.ImageCollection("users/servirbz/compil_imagery/optical/modis/mcd43a4_cam_sma/cam_mcd43a4__sma");
//var mcd43a4_fc = ee.ImageCollection("users/servirbz/compil_ecosys/terrestrial/forest_cover/bz_fcover_mcd43_2001_2018_JFMA");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MCD43A4 images
var images = {
  '2000_época_seca': get_MODIS_composite('2000-04-30'),
  '2001_época_seca': get_MODIS_composite('2001-04-30'),
  '2002_época_seca': get_MODIS_composite('2002-04-30'),
  '2003_época_seca': get_MODIS_composite('2003-04-30'),
  '2004_época_seca': get_MODIS_composite('2004-04-30'),
  '2005_época_seca': get_MODIS_composite('2005-04-30'),
  '2006_época_seca': get_MODIS_composite('2006-04-30'),
  '2007_época_seca': get_MODIS_composite('2007-04-30'),
  '2008_época_seca': get_MODIS_composite('2008-04-30'),
  '2009_época_seca': get_MODIS_composite('2009-04-30'),
  '2010_época_seca': get_MODIS_composite('2010-04-30'),
  '2011_época_seca': get_MODIS_composite('2011-04-30'),
  '2012_época_seca': get_MODIS_composite('2012-04-30'),
  '2013_época_seca': get_MODIS_composite('2013-04-30'),
  '2014_época_seca': get_MODIS_composite('2014-04-30'),
  '2015_época_seca': get_MODIS_composite('2015-04-30'),
  '2016_época_seca': get_MODIS_composite('2016-04-30'),
  '2017_época_seca': get_MODIS_composite('2017-04-30'),
  '2018_época_seca': get_MODIS_composite('2018-04-30'),
  '2019_época_seca': get_MODIS_composite('2019-04-30'),
};
// MCD43A4 composites for set dates
function get_MODIS_composite(dat) {
  var date = ee.Date(dat);
  var mcd43a4_sma_ = b.mcd43a4_sma_.filterDate(date, date.advance(1, 'year')).mean().clip(c.mbc).clip(c.cam_poly).updateMask(c.msk);
  return mcd43a4_sma_.visualize({});}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: SET UP LEFT AND RIGHT PANEL WINDOWS
// CREATE THE LEFT MAP
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'bottom-left');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label("Elige mosaico de MODIS para visualizar");
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(1, ui.Map.Layer(c.bnds_w2, {palette: "white"},"Limites internacionales"));
    mapToChange.layers().set(2, ui.Map.Layer(c.pa_corridors.clip(c.cam_poly), {palette: "yellow"},"Áreas protegidas y corredores biológicos"));
    }
var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
////////////
// Create the right map
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector2(rightMap, 19, 'bottom-right');
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label("Elige mosaico de MODIS para visualizar");
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(1, ui.Map.Layer(c.bnds_w2, {palette: "white"},"Limites internacionales"));
    mapToChange.layers().set(2, ui.Map.Layer(c.pa_corridors.clip(c.cam_poly), {palette: "yellow"},"Áreas protegidas y corredores biológicos"));
    }
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 2: INITIATE THE SPLIT PANEL
//ui.root.clear();
var splitPanel = ui.SplitPanel({firstPanel:leftMap, secondPanel:rightMap, wipe:true, style:{stretch: 'both'}}); // (1)
ui.root.widgets().reset([splitPanel]); // (2)
var linker = ui.Map.Linker([leftMap, rightMap]); // (3)
//ui.root.add(inspectorPanel); // 4
//////////////////////////////
leftMap.setCenter(-85.513, 12.822, 6);
rightMap.setCenter(-85.513, 12.822, 6);
leftMap.setOptions('SATELLITE');
rightMap.setOptions('SATELLITE');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3: UI PANEL
var main = ui.Panel({style: {width: '350px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label("Imágenes de MODIS del Corredor Biológico Mesoamericano: 2000-2019*", {fontWeight: 'bold', fontSize: '22px', color: 'darkgreen'});
var descr = ui.Label("deslizar para cambiar entre imágenes MODIS", {color: 'gray'});
var credits = ui.Label("crédito: derivado de datos de MODIS de NASA", {fontSize: '12px', color: 'gray'});
var branding = ui.Thumbnail({image:c.logo_svr,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'128px',height:'108.5px'}});
var pal = ['salmon','green'];
var pal2 = ['FA8072','008000'];
var vis = {min: 0, max: 1, palette: 'salmon,green'};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a hyperlink to an external reference
var link1 = ui.Chart(
    [
      ['Otras visualizaciones:'],
      ['<a target="_blank" href=https://bzgeo.users.earthengine.app/view/bz-forest-cover-modis-pt1>' +
       'Option 1: compare MODIS image and forest cover map</a>'],
      ['<a target="_blank" href=https://bzgeo.users.earthengine.app/view/bz-forest-cover-modis-pt2>' +
       'Option 2: compare 2 forest cover maps</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel1 = ui.Panel([link1], 'flow', {width: '300px', height: '125px'});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 4: ADD ITEMS TO UI
main.add(title);
main.add(descr);
//main.add(linkPanel1);
main.add(credits);
main.add(branding);
ui.root.insert(0, main);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////