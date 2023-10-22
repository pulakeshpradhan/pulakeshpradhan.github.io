////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Demonstrates before / after forest cover maps comparison with a variety of dates
// Last update: 18 Dec. 2020
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import ROI, international boundaries, protected area boundaries
var roi = ee.FeatureCollection("users/servirbz/aoi/lac/cam/bz/projects/bzr_watershed_hs");
var bnds0 = ee.FeatureCollection("projects/servir-wa/aoi/world_country_bounds_esri");
var bnds = ee.Image().byte().paint({featureCollection:bnds0,color:'ffffff',width:1});
var dist0 = ee.FeatureCollection("users/servirbz/aoi/lac/cam/bz/bz_districts");
var dist = ee.Image().byte().paint({featureCollection:dist0,color:'ffffff',width:2});
var bzr0 = ee.FeatureCollection("users/servirbz/compil_geophysical/rivers/bz_rivers_major_topo50k");
var bzr1 = ee.Image().byte().paint({featureCollection:bzr0,color:'ffffff',width:1}).clip(roi);
var msk = ee.Image('UMD/hansen/global_forest_change_2015').select('datamask').eq(1); //Hansen et al. water mask
var pa0 = ee.FeatureCollection('WCMC/WDPA/current/polygons').filter(ee.Filter.inList('ISO3', ['BLZ']));
var pa = ee.Image().byte().paint({featureCollection:pa0,color:'ffffff',width:1});
var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mcd43a4 = ee.ImageCollection("users/servirbz/compil_imagery/optical/modis/mcd43a4_cam/cam_mcd43a4_2000_2018_JFMA");
var mcd43a4_sma = ee.ImageCollection("users/servirbz/compil_imagery/optical/modis/mcd43a4_cam_sma/mes_mcd43a4__sma");
var mcd43a4_fc = ee.ImageCollection("users/servirbz/compil_ecosys/terrestrial/forest_cover_cam_80pct/cam_fcover_80pct_mcd43_2001_2018_JFMA");
var logo = ee.Image("users/servirbz/compil_imagery/_logos/logo_bzsdg_col");
var x_pct = function(img) {return img.multiply(ee.Number(100)).set('system:time_start',img.get('system:time_start'));};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function hillshade(dem, az, ze) {
  function radians(img) {return img.toFloat().multiply(3.1415927).divide(180);}
  var terrain = ee.call('Terrain', dem);
  var slope = radians(terrain.select(['slope']));
  var aspect = radians(terrain.select(['aspect']));
  var azimuth = radians(ee.Image(az));
  var zenith = radians(ee.Image(ze));
  return azimuth.subtract(aspect).cos().multiply(slope.sin()).multiply(zenith.sin()).add(zenith.cos().multiply(slope.cos()));}
var Azi = ee.Image(90);
var Zen = ee.Image(60);
var hill = hillshade(DEM,Azi,Zen).clip(roi);
////////////
var chart_fc = ui.Chart.image.series(mcd43a4_fc.map(x_pct), roi, ee.Reducer.mean(), 500)
            .setOptions({title: "Mean MODIS-derived canopy cover over Belize (2001-2019)",fontSize: '14px',vAxis:{title:'% canopy cover'},
            hAxis:{title:'year'},pointSize:5,series:{0:{color:'limegreen'}}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MCD43A4 images
var images = {
  '2001_dry_season': get_MODIS_composite('2001-04-30'),
  '2002_dry_season': get_MODIS_composite('2002-04-30'),
  '2003_dry_season': get_MODIS_composite('2003-04-30'),
  '2004_dry_season': get_MODIS_composite('2004-04-30'),
  '2005_dry_season': get_MODIS_composite('2005-04-30'),
  '2006_dry_season': get_MODIS_composite('2006-04-30'),
  '2007_dry_season': get_MODIS_composite('2007-04-30'),
  '2008_dry_season': get_MODIS_composite('2008-04-30'),
  '2009_dry_season': get_MODIS_composite('2009-04-30'),
  '2010_dry_season': get_MODIS_composite('2010-04-30'),
  '2011_dry_season': get_MODIS_composite('2011-04-30'),
  '2012_dry_season': get_MODIS_composite('2012-04-30'),
  '2013_dry_season': get_MODIS_composite('2013-04-30'),
  '2014_dry_season': get_MODIS_composite('2014-04-30'),
  '2015_dry_season': get_MODIS_composite('2015-04-30'),
  '2016_dry_season': get_MODIS_composite('2016-04-30'),
  '2017_dry_season': get_MODIS_composite('2017-04-30'),
  '2018_dry_season': get_MODIS_composite('2018-04-30'),
  '2019_dry_season': get_MODIS_composite('2019-04-30'),
  '2020_dry_season': get_MODIS_composite('2020-04-30'),
  // '2021_dry_season': get_MODIS_composite('2021-04-30'),
};
// MCD43A4 composites for set dates
function get_MODIS_composite(dat) {
  var date = ee.Date(dat);
  var mcd43a4_ = mcd43a4_sma.filterDate(date, date.advance(1, 'week')).mean().clip(roi).updateMask(msk);
  return mcd43a4_.visualize({});}
// Forest cover maps
var images2 = {
  '2001': get_fc_composite('2001-04-30'),
  '2002': get_fc_composite('2002-04-30'),
  '2003': get_fc_composite('2003-04-30'),
  '2004': get_fc_composite('2004-04-30'),
  '2005': get_fc_composite('2005-04-30'),
  '2006': get_fc_composite('2006-04-30'),
  '2007': get_fc_composite('2007-04-30'),
  '2008': get_fc_composite('2008-04-30'),
  '2009': get_fc_composite('2009-04-30'),
  '2010': get_fc_composite('2010-04-30'),
  '2011': get_fc_composite('2011-04-30'),
  '2012': get_fc_composite('2012-04-30'),
  '2013': get_fc_composite('2013-04-30'),
  '2014': get_fc_composite('2014-04-30'),
  '2015': get_fc_composite('2015-04-30'),
  '2016': get_fc_composite('2016-04-30'),
  '2017': get_fc_composite('2017-04-30'),
  '2018': get_fc_composite('2018-04-30'),
  '2019': get_fc_composite('2019-04-30'),
  '2020': get_fc_composite('2020-04-30'),
  //'2021': get_fc_composite('2021-04-30'),
};
// Forest cover maps (MCD43A4-derived) for set dates
function get_fc_composite(dat) {
  var date = ee.Date(dat);
  var mcd43a4_fc_ = mcd43a4_fc.filterDate(date, date.advance(1, 'week')).mean().clip(roi).updateMask(msk);
  var mask = mcd43a4_fc_.select([0]).mask();
  return mcd43a4_fc_.updateMask(mask).visualize({min:0,max:1,palette:['salmon','green']});}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 1: SET UP LEFT AND RIGHT PANEL WINDOWS
// CREATE THE LEFT MAP
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose MODIS image mosaic to view');
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
var rightSelector = addLayerSelector2(rightMap, 19, 'top-right');
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose MODIS image mosaic to view');
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
leftMap.setCenter(-88.35, 17.256, 9);
rightMap.setCenter(-88.35, 17.256, 9);
//leftMap.setOptions('TERRAIN');
//rightMap.setOptions('TERRAIN');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 3: UI PANEL
var main = ui.Panel({style: {width: '350px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Belize River Watershed forest cover change, 2001-2020 (option 3)', {fontWeight: 'bold', fontSize: '22px', color: 'darkgreen'});
var descr = ui.Label("instructions: swipe to change the display of MODIS SMA images", {color: 'gray'});
var credits = ui.Label('credit: derived from NASA MODIS data', {fontSize: '12px', color: 'gray'});
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'100px',height:'92.5px'}});
var pal = ['salmon','green'];
var pal2 = ['FA8072','008000'];
var vis = {min: 0, max: 1, palette: 'salmon,green'};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a hyperlink to an external reference
var link1 = ui.Chart(
    [
      ['Other visualizations:'],
      ['<a target="_blank" href=https://bzgeo.users.earthengine.app/view/bz-forest-cover-modis-pt1>' +
       'Option 1: compare 2 forest cover maps</a>'],
      ['<a target="_blank" href=https://bzgeo.users.earthengine.app/view/bz-forest-cover-modis-pt2>' +
       'Option 2: compare MODIS image and forest cover map</a>']
    ],
    'Table', {allowHtml: true});
var linkPanel1 = ui.Panel([link1], 'flow', {width: '300px', height: '125px'});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COLOR BAR: OPTION 1
//Add color boxes
var makeRow = function(color1, color2) {
    // Create the label that is actually the colored box.
    var colorBox1 = ui.Label({
      style: {
        backgroundColor: '#FA8072',
        padding: '25px',
        margin: '0 0 0 10px'
      }});
     var colorBox2 = ui.Label({
      style: {
        backgroundColor: '#008000',
        padding: '25px',
        margin: '0 0 0 0'
      }});
    return ui.Panel({
      widgets: [colorBox1, colorBox2],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
var legend = ui.Label('Legend:', {margin:'5px 0 5px 10px',fontSize:'11px',color:'black',fontWeight:'bold'});
var nf = ui.Label('non-forest', {margin:'5px 0 10px 10px',fontSize:'11px',color:'salmon',fontWeight:'bold'});
var forest = ui.Label('forest', {margin:'5px 0 10px 10px',fontSize:'11px',color:'green',fontWeight:'bold'});
var textBottom = ui.Panel([nf, forest], ui.Panel.Layout.flow('horizontal'));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PART 4: ADD ITEMS TO UI
main.add(title);
main.add(descr);
//main.add(legend);
//main.add(makeRow(pal2[0], pal2[1]));
//main.add(textBottom);
main.add(linkPanel1);
//main.add(chart_fc);
main.add(credits);
main.add(branding);
ui.root.insert(0, main);
//leftMap.add(ui.Label('Belize River Watershed', {fontWeight: 'bold', fontSize: '14px', color: 'navy'}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////