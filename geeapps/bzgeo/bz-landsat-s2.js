////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Demonstrates before / after forest cover maps comparison with a variety of dates
// https://code.earthengine.google.com/1a2d51d1c42fcd04cb3a9d8c573ef0bd (26.05.19)
// Last update: 24 April 2020
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var a = require('users/servirbz/packages:gapfill_l7_bz');
var b = require('users/servirbz/packages:bz/bz');
var c = require('users/servirbz/packages:img_optical');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import ROI, international boundaries, protected area boundaries
var roi = ee.FeatureCollection("users/servirbz/aoi/lac/cam/bz/bz_bounds_swbd_buff60m");
var roi_ = ee.Geometry.Rectangle(-87.34, 15.73, -89.30, 18.60);
var bnds = ee.Image().byte().paint({featureCollection:"projects/servir-wa/aoi/world_country_bounds_esri",width:1});
var dist = ee.Image().byte().paint({featureCollection:"users/servirbz/aoi/lac/cam/bz/bz_districts",width:1});
var msk = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').eq(1);
var pa0 = ee.FeatureCollection('WCMC/WDPA/current/polygons').filter(ee.Filter.inList('ISO3', ['BLZ']));
var pa = ee.Image().byte().paint({featureCollection:pa0,width:1});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var logo = ee.Image("users/servirbz/compil_imagery/_logos/logo_bzsdg_col");
var logo2 = ee.Image("users/servirbz/compil_imagery/_logos/logo_bzgeo1");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MCD43A4 images
var images = {
  '1989-12-27_L5': l5_composite('1989-12-27'),
  '1995-05-18_L5': l5_composite('1995-05-18'),
  '1996-03-17_L5': l5_composite('1996-03-17'),
  '2000-03-28_L5': l5_composite('2000-03-28'),
  '2004-01-27_L7': l7_composite('2004-01-27'),
  '2004-02-12_L7': l7_composite('2004-02-12'),
  '2007-05-11_L7': l7_composite('2007-05-11'),
  '2008-11-05_L7': l7_composite('2008-11-05'),
  '2008-11-21_L7': l7_composite('2008-11-21'),
  '2009-04-14_L7': l7_composite('2009-04-14'),
  '2010-01-11_L7': l7_composite('2010-01-11'),
  '2010-02-12_L7': l7_composite('2010-02-12'),
  '2010-02-28_L7': l7_composite('2010-02-28'),
  '2012-05-08_L7': l7_composite('2012-05-08'),
  '2013-03-24_L7': l7_composite('2013-03-24'),
  '2014-12-24_L7': l7_composite('2014-12-24'),
  '2017-02-23_L8': l8_composite('2017-02-23'),
  '2019-04-20_S2': s2_composite('2019-04-20'),
  '2020-04-20_L8': l8_composite('2020-04-20'),
  '2020-04-24_S2': s2_composite('2020-04-24'),
  '2020-05-24_S2': s2_composite('2020-05-24'),
};
// Landsat, Sentinel-2 composites for set dates
function l5_composite(dat) {
  return c.l5.filterDate(ee.Date(dat), ee.Date(dat).advance(1, 'day')).median().clip(roi_).visualize(c.viz_l8);}
function l7_composite(dat) {
  return a.gapfill_dn_(ee.Date(dat)).visualize(c.viz_l7_);}
function l8_composite(dat) {
  return c.l8.filterDate(ee.Date(dat), ee.Date(dat).advance(1, 'day')).median().clip(roi_).visualize(c.viz_l8);}
function l8_composite_(dat) {
  return c.l8_.filterDate(ee.Date(dat), ee.Date(dat).advance(1, 'day')).median().clip(roi_).visualize(c.viz_l8_);}
function s2_composite(dat) {
  return c.s2.filterDate(ee.Date(dat), ee.Date(dat).advance(1, 'day')).median().clip(roi_).visualize(c.viz_s2);}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: SET UP LEFT AND RIGHT PANEL WINDOWS
// CREATE THE LEFT MAP
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 19, 'top-left');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose mosaic to view');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(1, ui.Map.Layer(bnds, {palette: "black"},"Int'l boundaries"));
    mapToChange.layers().set(2, ui.Map.Layer(dist, {palette: "black"},'District boundaries'));
    mapToChange.layers().set(3, ui.Map.Layer(pa, {palette: "white"},'Protected areas'));
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
var rightSelector = addLayerSelector2(rightMap, 20, 'top-right');
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose mosaic to view');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    mapToChange.layers().set(1, ui.Map.Layer(bnds, {palette: "black"},"Int'l boundaries"));
    mapToChange.layers().set(2, ui.Map.Layer(dist, {palette: "black"},'District boundaries'));
    mapToChange.layers().set(3, ui.Map.Layer(pa, {palette: "white"},'Protected areas'));
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
leftMap.setCenter(-88.35, 17.256, 10);
rightMap.setCenter(-88.35, 17.256, 10);
leftMap.setOptions('TERRAIN');
rightMap.setOptions('TERRAIN');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3: UI PANEL
var main = ui.Panel({style: {width: '320px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Belize Landsat, Sentinel-2 image mosaics, 1989-2020', {fontWeight: 'bold', fontSize: '22px', color: 'mediumseagreen'});
var descr = ui.Label("This app displays image mosaics of Belize from Landsats and the Sentinel-2 satellites; instructions: swipe to change between satellite images", {color: 'black'});
var credits = ui.Label('credits: Landsat data from NASA, USGS; Sentinel data from Copernicus / European Space Agency', {fontSize: '12px', color: 'gray'});
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'133px',height:'123px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a hyperlink to an external reference
var link1 = ui.Chart(
    [
      ['Other visualizations:'],
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