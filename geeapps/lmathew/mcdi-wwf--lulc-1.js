var urt_eez = ui.import && ui.import("urt_eez", "table", {
      "id": "users/lmathew/Share/TZA"
    }) || ee.FeatureCollection("users/lmathew/Share/TZA"),
    mikoa = ui.import && ui.import("mikoa", "table", {
      "id": "users/lmathew/tza_regions"
    }) || ee.FeatureCollection("users/lmathew/tza_regions"),
    mawilaya = ui.import && ui.import("mawilaya", "table", {
      "id": "users/lmathew/tza_districts"
    }) || ee.FeatureCollection("users/lmathew/tza_districts"),
    urt_wards = ui.import && ui.import("urt_wards", "table", {
      "id": "users/lmathew/tza_kata"
    }) || ee.FeatureCollection("users/lmathew/tza_kata"),
    cfma = ui.import && ui.import("cfma", "table", {
      "id": "users/lmathew/Seascape/CFMA-02-2018"
    }) || ee.FeatureCollection("users/lmathew/Seascape/CFMA-02-2018"),
    cwma = ui.import && ui.import("cwma", "table", {
      "id": "users/lmathew/TZA-WMA"
    }) || ee.FeatureCollection("users/lmathew/TZA-WMA"),
    wdpa = ui.import && ui.import("wdpa", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    lsib = ui.import && ui.import("lsib", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    cwua = ui.import && ui.import("cwua", "table", {
      "id": "users/lmathew/tza_basins"
    }) || ee.FeatureCollection("users/lmathew/tza_basins"),
    elev = ui.import && ui.import("elev", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    sub_landscape = ui.import && ui.import("sub_landscape", "table", {
      "id": "users/lmathew/TCO_SUB-LANDSCAPES_022021"
    }) || ee.FeatureCollection("users/lmathew/TCO_SUB-LANDSCAPES_022021"),
    urt_pas = ui.import && ui.import("urt_pas", "table", {
      "id": "users/lmathew/URT/URT_PAs_092020"
    }) || ee.FeatureCollection("users/lmathew/URT/URT_PAs_092020"),
    vlfr = ui.import && ui.import("vlfr", "table", {
      "id": "users/lmathew/Forest-VLFRs/vlfr_bengo_4326"
    }) || ee.FeatureCollection("users/lmathew/Forest-VLFRs/vlfr_bengo_4326");
//FCD index developed from these publications
//http://www.ijesd.org/vol8/1012-F0032.pdf
//==============================================================================================================================================
//==============================================================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '250px');
// Create an intro panel with labels.
var intro = ui.Panel([ ui.Label({ value: 'Sentinel 2 RGB-432 (10m) - Surface Reflectance Data', style: {fontSize: '20px', fontWeight: 'bold', position: 'top-center'}}) ]);
panel.add(intro);
///////////////////////////////////////////////////////////////////////////
//thank you Olha Danylo for the help!!
var map = ui.Map();
var geom = null;
var geom_cbo = null;
var geomjina = '';
var mwaka = '';
var mwaka_mwanzo = '';
var mwaka_mwisho = '';
map.centerObject(urt_eez,6);
//Graph Panel
var panel_grafu = ui.Panel({ style: { width: '350px',position: 'top-right', padding: '10px 10px' } });
var panel_takwimu = ui.Panel({ style: { width: '350px',position: 'bottom-left', padding: '10px 10px' } });
//map.add(panel_grafu);
//map.add(panel_takwimu);
// Separator
var kitenganishia = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var kitenganishib = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------
// Load a global elevation image.
var empty = ee.Image().byte(); //TZ	TZA	834
var Tanzania_eez = empty.paint({featureCollection: urt_eez, color: 1, width: 3 });
var urt_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'TZA')));
var urt_wdpa_b = empty.paint({featureCollection: urt_wdpa_a, color: 1, width: 2 });
var urt_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'TZA')));
var urt = ee.FeatureCollection(lsib.filter(ee.Filter.eq('country_co', 'TZ')));
var Tanzania = empty.paint({featureCollection: urt, color: 1, width: 1 });
//JRC Water
var gsw = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').clip(urt_eez);
var maji = gsw.select('occurrence').unmask(ee.Image(0)).lte(0)
//map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
elev = elev.clip(urt_eez);
var shade = ee.Terrain.hillshade(elev);
var sea = elev.lte(0);
// Create a custom elevation palette from hex strings.
var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
// Create a mosaic of the sea and the elevation data
var visParams = {min: 1, max: 3000, palette: elevationPalette};
var visualized = ee.ImageCollection([elev.mask(sea.not()).visualize(visParams),sea.mask(sea).visualize({palette:'000022'})]).mosaic();
//visualized = visualized
//map.addLayer(visualized, {}, 'Elevations', 0);//// Note that the visualization image doesn't require visualization parameters.
// Convert the visualized elevation to HSV, first converting to [0, 1] data.
var hsv = visualized.divide(255).rgbToHsv();
var hs = hsv.select(0, 1); // Select only the hue and saturation bands.
var v = shade.divide(255);// Convert the hillshade to [0, 1] data, as expected by the HSV algorithm.
var rgb = hs.addBands(v).hsvToRgb().multiply(255).byte();
//map.addLayer(rgb, {}, 'Styled Elevation',0);
//Display Vector Data (Boundaries)
//map.addLayer(visualized, {}, 'Elevations', 0);//// Note that the visualization image doesn't require visualization parameters.
map.addLayer(rgb, {}, 'Styled Elevation',0);
map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
map.addLayer(urt_wdpa_b,{palette: '00ff00'},'URT-WDPAs',0); 
map.addLayer(Tanzania,{palette: '000000'},'Tanzania',0);
map.addLayer(Tanzania_eez,{palette: '555555'},'Tanzania + EEZ',1);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Landcover Fuction
var l8sr = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'); //USGS Landsat 8 Surface Reflectance(SR) Tier 1
var s2sr = ee.ImageCollection('COPERNICUS/S2_SR'); //ESA Corpenicus Sentinel 2 Surface Reflectance(SR)
var esa_lc = "COPERNICUS/Landcover/100m/Proba-V-C3/Global/";
var ls8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'); //USGS Landsat 8 Collection 1 Tier 1 Top-Of-Atmosphere (TOA) Reflectance - 
var ls8raw = ee.ImageCollection("LANDSAT/LC08/C01/T1"); //USGS Landsat 8 Collection 1 Tier 1 Raw Scenes
var lc2019 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019");
var lc2018 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2018");
var lc2017 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2017");
var lc2016 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2016");
var lc2015 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2015");
//======================================================================
//======================================================================
// Function to cloud mask from the Fmask band of Landsat 8 SR data.
function maskL8sr(image)
{
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//======================================================================
//MaskCloud Sentinel 2 
// cloud function to remove clouds
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//======================================================================
//======================================================================
//======================================================================
var getLC = function(eneo,jina,s_date,e_date)
{
  var img_eneo = ee.Geometry.Polygon(eneo.geometry().coordinates());
  var s2a = s2sr.filterDate(s_date,e_date).filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));
  var s2b = s2a.map(maskS2clouds);
  // take the median
  var s2c = s2b.median().clipToCollection(eneo);
  var bands = ['B4', 'B3', 'B2'];
  var rgbVis = {min: 0.0,  max: 0.3, bands: ['B4', 'B3', 'B2'], };
  var s2d = s2c.select(bands);
  map.addLayer(s2d,rgbVis,  'Sentinel 2 RGB-432 of ' + jina + "-" + mwezi + " " + mwaka, 1);
  //======================================================================
  //Unspervised
  var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B11','B12',]; 
  var palette =['green','green', 'yellow', 'cyan','blue'];
  // Make the training dataset.
  var training = s2c.sample({ region: eneo, scale: 10, numPixels: 100 });
  // Instantiate the clusterer and train it.
  var clusterer = ee.Clusterer.wekaKMeans(10).train(training,bands);
  // Cluster the input using the trained clusterer.
  var result = s2c.cluster(clusterer);
  // Display the clusters with random colors.
  map.addLayer(result.randomVisualizer(), {}, 'Clusters of ' + jina + "-" + mwezi + " " + mwaka, 0);
  //======================================================================
  var lc2019a = lc2019.select('discrete_classification').clip(eneo);
  var lc2018a = lc2018.select('discrete_classification').clip(eneo);
  var lc2017a = lc2017.select('discrete_classification').clip(eneo);
  var lc2016a = lc2016.select('discrete_classification').clip(eneo);
  var lc2015a = lc2015.select('discrete_classification').clip(eneo);
  map.addLayer(lc2019a, {}, "Land Cover of " + jina + "-2019", 0);
  map.addLayer(lc2018a, {}, "Land Cover of " + jina + "-2018", 0);
  map.addLayer(lc2017a, {}, "Land Cover of " + jina + "-2017", 0);
  map.addLayer(lc2016a, {}, "Land Cover of " + jina + "-2016", 0);
  map.addLayer(lc2015a, {}, "Land Cover of " + jina + "-2015", 0);
  //======================================================================
  //Export.image.toDrive({image: result.float(), description: 'S2_LC_2019', folder: 'gef7', scale: 10, maxPixels: 3784216672400, });
  //===================================================================================================================
}
//===================================================================================================================
//===================================================================================================================
//Define Years
var mwezi = ee.List(['January','February','March','April','May','June','July','August','September','October','November','December']);
var miaka = ee.List(["2015","2016","2017","2018","2019",'2020','2021']);
//Load Years
var chagua_mwezi = ui.Select([],'Loading ...');    //Mwwzi
var chagua_mwaka = ui.Select([],'Loading ...');    //Mwaka
//==========
//Mwaka
miaka.evaluate(function(mwakaa)
{
  chagua_mwaka.items().reset(mwakaa);
  chagua_mwaka.setPlaceholder('Select Year');
  chagua_mwaka.onChange(function(mwakaa)
  {
    mwaka = mwakaa;
    //Mwezi
    mwezi.evaluate(function(mwezia)
    {
      chagua_mwezi.items().reset(mwezia);
      chagua_mwezi.setPlaceholder('Select Month');
      chagua_mwezi.onChange(function(mwezia)
      {
        mwezi = mwezia
        if(mwezia === "January")   { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-01-31'; }
        if(mwezia === "February")  { mwaka_mwanzo = mwaka + '-02-01'; mwaka_mwisho = mwaka + '-02-28'; }
        if(mwezia === "March")     { mwaka_mwanzo = mwaka + '-03-01'; mwaka_mwisho = mwaka + '-03-31'; }
        if(mwezia === "April")     { mwaka_mwanzo = mwaka + '-04-01'; mwaka_mwisho = mwaka + '-04-30'; }
        if(mwezia === "May")       { mwaka_mwanzo = mwaka + '-05-01'; mwaka_mwisho = mwaka + '-05-31'; }
        if(mwezia === "June")      { mwaka_mwanzo = mwaka + '-06-01'; mwaka_mwisho = mwaka + '-06-30'; }
        if(mwezia === "July")      { mwaka_mwanzo = mwaka + '-07-01'; mwaka_mwisho = mwaka + '-07-31'; }
        if(mwezia === "August")    { mwaka_mwanzo = mwaka + '-08-01'; mwaka_mwisho = mwaka + '-08-31'; }
        if(mwezia === "September") { mwaka_mwanzo = mwaka + '-09-01'; mwaka_mwisho = mwaka + '-09-30'; }
        if(mwezia === "October")   { mwaka_mwanzo = mwaka + '-10-01'; mwaka_mwisho = mwaka + '-10-31'; }
        if(mwezia === "November")  { mwaka_mwanzo = mwaka + '-11-01'; mwaka_mwisho = mwaka + '-11-30'; }
        if(mwezia === "December")  { mwaka_mwanzo = mwaka + '-12-01'; mwaka_mwisho = mwaka + '-12-31'; }
        chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
        chagua_pa.items().reset(); pa_majina.evaluate(function(paa){ chagua_pa.items().reset(paa);  })
      })
    })
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load Sub-Landscape Names
var sub_landscape_majina = sub_landscape.aggregate_array('name').distinct();
var mikoa_majina = urt_wards.aggregate_array('Region_Nam').distinct();
var chagua_sub_landscape = ui.Select([],'Loading ...');    //Sub-landscape
// Load Sub-landscape
sub_landscape_majina.evaluate(function(sub_landscapea)
{
  chagua_sub_landscape.items().reset(sub_landscapea);
  chagua_sub_landscape.setPlaceholder('Select a Sub-Landscape')
  chagua_sub_landscape.onChange(function(sub_landscapea)
  {
    var geom_a = sub_landscape.filter(ee.Filter.eq('name', sub_landscapea));
    var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 2});
    map.addLayer(geom_b,{palette: '000000'},sub_landscapea);
    map.centerObject(geom_a);
    geomjina = sub_landscapea;
    geom = geom_a
    chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
    chagua_pa.items().reset(); pa_majina.evaluate(function(paa){ chagua_pa.items().reset(paa);  })
  })
})
//==============================================================================================================================================
//Hifadhi za Jamii (Misitu, Wanyapori,Bahari)
var vlfr_majina = vlfr.aggregate_array('name').distinct(); // ee.List(["Mchakama","Nainokwe","Liwiti","Mitole","Ngea"]);
var chagua_vlfr = ui.Select([],'Loading ...');
//VLFRs
vlfr_majina.evaluate(function(vlfra)
{
  chagua_vlfr.items().reset(vlfra);
  chagua_vlfr.setPlaceholder('Select a VLFR (BENGO)')
  chagua_vlfr.onChange(function(vlfra)
  {
    var geom_a = vlfr.filter(ee.Filter.eq('name', vlfra));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},vlfra);
    map.centerObject(geom_a);
    geomjina = vlfra;
     if(mwaka != "Select Year" || mwezi != "Select Month") { getLC(geom_a,geomjina,mwaka_mwanzo, mwaka_mwisho);  }
     chagua_pa.items().reset(); pa_majina.evaluate(function(paa){ chagua_pa.items().reset(paa);  })
  })
})
//========================================================
//Hifadhi za Tanzania
var pa_majina = urt_pas.aggregate_array('ORIG_NAME').distinct(); 
var chagua_pa = ui.Select([],'Loading ...');
//PAs
pa_majina.evaluate(function(paa)
{
  chagua_pa.items().reset(paa);
  chagua_pa.setPlaceholder('Select a FR')
  chagua_pa.onChange(function(paa)
  {
    var geom_a = urt_pas.filter(ee.Filter.eq('NAME', paa)); //urt_pas.aggregate_array('NAME').distinct(); 
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},paa);
    map.centerObject(geom_a);
    geomjina = paa;
    if(mwaka != "Select Year" || mwezi != "Select Month") { getLC(geom_a,geomjina,mwaka_mwanzo, mwaka_mwisho);  }
    chagua_pa.items().reset(); pa_majina.evaluate(function(paa){ chagua_pa.items().reset(paa);  })
  })
})
//==============================================================================================================================================
chagua_mwaka.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka);
chagua_mwezi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwezi);
panel.add(kitenganishia);
chagua_sub_landscape.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_sub_landscape);
panel.add(kitenganishib);
chagua_pa.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_pa); //VLFrs
chagua_vlfr.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_vlfr); //VLFrs
//==============================================================================================================================================
//==============================================================================================================================================
var title = ui.Label('MCDI-WWF FOREST - LULC CHANGES', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel([ panel, ui.Panel(map, null, {stretch: 'both'}), ],
              ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));