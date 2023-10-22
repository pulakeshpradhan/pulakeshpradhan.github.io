var wdpa = ui.import && ui.import("wdpa", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    lsib = ui.import && ui.import("lsib", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    elev = ui.import && ui.import("elev", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    basin = ui.import && ui.import("basin", "table", {
      "id": "users/lmathew/Zambia/Kwando_BHRC"
    }) || ee.FeatureCollection("users/lmathew/Zambia/Kwando_BHRC"),
    kidakio = ui.import && ui.import("kidakio", "table", {
      "id": "users/lmathew/Zambia/Kwando_BHRC_Regions"
    }) || ee.FeatureCollection("users/lmathew/Zambia/Kwando_BHRC_Regions"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    ls8oli = ui.import && ui.import("ls8oli", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1");
//==============================================================================================================================================
//==============================================================================================================================================
// Create User Interface portion
// Create a panel to hold our widgets.
var panel = ui.Panel(); 
panel.style().set('width', '250px');
// Create an intro panel with labels.
var intro = ui.Panel([ ui.Label({ value: 'Spatial-Temporal Monitoring from Space', style: {fontSize: '20px', fontWeight: 'bold', position: 'top-center'}}) ]);
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
//Graph Panel
var panel_grafu = ui.Panel({ style: { width: '350px',position: 'top-right', padding: '10px 10px' } });
var panel_takwimu = ui.Panel({ style: { width: '350px',position: 'bottom-left', padding: '10px 10px' } });
map.add(panel_grafu);
map.add(panel_takwimu);
// Separator
var kitenganishia = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
var kitenganishib = ui.Label({ value: '-------------',style: {fontSize: '5px', stretch:'horizontal'}});
//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------
// Load a global elevation image.
var empty = ee.Image().byte();
var za_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'ZA')));
var za_wdpa_b = empty.paint({featureCollection: za_wdpa_a, color: 1, width: 2 });
var za_wdpa_a = ee.FeatureCollection(wdpa.filter(ee.Filter.eq('PARENT_ISO', 'ZA')));
var za = ee.FeatureCollection(lsib.filter(ee.Filter.eq('country_co', 'ZA')));
var Zambia = empty.paint({featureCollection: za, color: 1, width: 1 });
var kwando = empty.paint({featureCollection: basin, color: 1, width: 3 });
//JRC Water
var gsw = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence').clip(za);
var maji = gsw.select('occurrence').unmask(ee.Image(0)).lte(0)
elev = elev.clip(za);
var shade = ee.Terrain.hillshade(elev);
var sea = elev.lte(0);
// Create a custom elevation palette from hex strings.
var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
// Create a mosaic of the sea and the elevation data
var visParams = {min: 1, max: 3000, palette: elevationPalette};
var visualized = ee.ImageCollection([elev.mask(sea.not()).visualize(visParams),sea.mask(sea).visualize({palette:'000022'})]).mosaic();
// Convert the visualized elevation to HSV, first converting to [0, 1] data.
var hsv = visualized.divide(255).rgbToHsv();
var hs = hsv.select(0, 1); // Select only the hue and saturation bands.
var v = shade.divide(255);// Convert the hillshade to [0, 1] data, as expected by the HSV algorithm.
var rgb = hs.addBands(v).hsvToRgb().multiply(255).byte();
//map.addLayer(rgb, {}, 'Styled Elevation',0);
//Display Vector Data (Boundaries)
map.addLayer(visualized, {}, 'Elevations', 0);//// Note that the visualization image doesn't require visualization parameters.
map.addLayer(rgb, {}, 'Styled Elevation',0);
map.addLayer(za_wdpa_b,{palette: '00ff00'},'Zambia-WDPAs',0); 
map.addLayer(kwando,{palette: '000000'},'Kwando Basin',1);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Landcover Fuction
var l8sr = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'); //USGS Landsat 8 Surface Reflectance(SR) Tier 1
var esa_lc = "COPERNICUS/Landcover/100m/Proba-V-C3/Global/";
var ls8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'); //USGS Landsat 8 Collection 1 Tier 1 Top-Of-Atmosphere (TOA) Reflectance - 
var ls8raw = ee.ImageCollection("LANDSAT/LC08/C01/T1"); //USGS Landsat 8 Collection 1 Tier 1 Raw Scenes
// Function to cloud mask from the Fmask band of Landsat 8 SR data.
function maskL8sr(image)
{
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var getLC= function(mwaka,eneo,jina)
{
  var img_eneo = ee.Geometry.Polygon(eneo.geometry().coordinates());
  var collectionlc = ee.Image(esa_lc + mwaka);//.clip(img_eneo);
  var lceneo = collectionlc.select('discrete_classification');
   var lceneoout = collectionlc.select('discrete_classification').clip(img_eneo);
  var visParamsLC =  { bands: ['discrete_classification'],min: 0,  max: 200, 
                      palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4','F0F0F0','0032C8','0096A0','FAE6A0','58481F','9900','70663E','00CC00','4E751F','7800','666000','8DB400','8D7400','A0DC00','929900','648C00','0077be'], forceRgbOutput:true };
  map.addLayer(collectionlc,visParamsLC,jina + ': Landcover',1);
  //===================================================================================================================
  //===================================================================================================================
  var options = { title: jina + ' - Land Cover -' + mwaka, fontSize: 12, hAxis: {title: 'Covarage'}, vAxis: {title: '~ Area(Ha)'},
                  legend: 'none', lineWidth: 1, pointSize: 4 };
  var histogram = ui.Chart.image.histogram(lceneo, eneo, 100).setOptions(options);
  panel_grafu.widgets().set(1, histogram);   // Display the histogram.
  var lebel_jina = ui.Label('Landcover of ' + jina, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  var lebel_tarehe = ui.Label('Date: ' + mwaka, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  panel_takwimu.widgets().set(1, lebel_jina);
  panel_takwimu.widgets().set(2, lebel_tarehe);
  //===================================================================================================================
  //===================================================================================================================
  function downloadImg()
  {
    var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
    var visParamsLCout =  { bands: ['discrete_classification'],min: 0,  max: 200,
                            //palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4'], forceRgbOutput:true };
                            palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4','F0F0F0','0032C8','0096A0','FAE6A0','58481F','9900','70663E','00CC00','4E751F','7800','666000','8DB400','8D7400','A0DC00','929900','648C00','0077be'], forceRgbOutput:true };
    var fcdscale_to_jpeg = lceneoout.visualize(visParamsLCout);
    var downloadArgs = {dimensions:1024,region:img_bound, format:"jpg"};
    var url = fcdscale_to_jpeg.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Download ' + jina +' - Landcover', downloadImg);
  var urlLabel = ui.Label('Download-LC', {shown: false});
  downloadButton.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
  panel_takwimu.widgets().set(3, downloadButton);
  panel_takwimu.widgets().set(4, urlLabel);
  var geom_img_eneo = empty.paint({featureCollection: img_eneo, width: 5 });
  map.addLayer(geom_img_eneo,{palette: 'ff0000'}, jina);
}
//===================================================================================================================
//===================================================================================================================
//===================================================================================================================
//===================================================================================================================
var getUnS = function(mwakaS,mwakaE,eneo,jina)
{
  var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
  var aoi = eneo;
  var region = aoi.geometry().bounds();
  //Landsat 8
  var ls8oli_a = ls8oli.filterDate(mwakaS,mwakaE);
  var ls8oli_b = ee.Algorithms.Landsat.simpleComposite(ls8oli_a);
  // Filter  study region.
  var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
  var ls8oli_c = ls8oli_b.clipToCollection(aoi).select(bands);
  // Visualize the Composite
  map.addLayer(ls8oli_c, {bands: ['B4', 'B3', 'B2'], max: 0.5, gamma: 2}, 'Landsat SR - ' + jina, false);
  //---------------------------------------------------------------------
  //=====================================================================
  //Classification
  var input_l = ls8oli_c;
 // Make the training dataset.
  var training_l = input_l.sample({ region: region, scale: 30, numPixels: 5000 });
  // Instantiate the clusterer and train it.
  var clusterer_l = ee.Clusterer.wekaKMeans(5).train(training_l);
  // Cluster the input using the trained clusterer.
  var result_l = input_l.cluster(clusterer_l);
  //=====================================================================
  // Display the clusters with random colors.
  map.addLayer(result_l.randomVisualizer(), {}, 'LS8 Clusters - ' + jina,0);
  var options = { title: jina + ' - LS-LULC -' + mwaka, fontSize: 12, hAxis: {title: 'Covarage'}, vAxis: {title: '~ Area(Ha)'},
                  legend: 'none', lineWidth: 1, pointSize: 4 };
  var histogram = ui.Chart.image.histogram(result_l, eneo, 100).setOptions(options);
  panel_grafu.widgets().set(1, histogram);   // Display the histogram.
  var lebel_jina = ui.Label('LS-LULC of ' + jina, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  var lebel_tarehe = ui.Label('Date: ' + mwaka, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  panel_takwimu.widgets().set(1, lebel_jina);
  panel_takwimu.widgets().set(2, lebel_tarehe);
  //===================================================================================================================
  //===================================================================================================================
  function downloadImg()
  {
    var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
    var visParamsLCout =  { bands: ['cluster'],min: 0,  max: 200,
                            //palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4'], forceRgbOutput:true };
                            palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4'], forceRgbOutput:true };
    var fcdscale_to_jpeg = result_l.visualize(visParamsLCout);
    var downloadArgs = {dimensions:1024,region:img_bound, format:"jpg"};
    var url = fcdscale_to_jpeg.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
    var rgb_to_jpeg = ls8oli_c.visualize({bands: ['B4', 'B3', 'B2'], min: 0, max: 0.5, forceRgbOutput:true});
    var downloadArgsRGB = {dimensions:1024,region:img_bound, format:"jpg"};
    var urlrgb = rgb_to_jpeg.getDownloadURL(downloadArgsRGB);
    urlLabelsr.setUrl(urlrgb);
    urlLabelsr.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Download ' + jina +' - Landcover', downloadImg);
  var urlLabel = ui.Label('Download-LC', {shown: false});
  var urlLabelsr = ui.Label('Download-RGB', {shown: false});
  downloadButton.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
  panel_takwimu.widgets().set(3, downloadButton);
  panel_takwimu.widgets().set(4, urlLabel);
  panel_takwimu.widgets().set(5, urlLabelsr);
  var geom_img_eneo = empty.paint({featureCollection: img_bound, width: 5 });
  map.addLayer(geom_img_eneo,{palette: 'ff0000'}, jina);
}
//===================================================================================================================
//===================================================================================================================
//Define Years
var takwimu = ee.List(["ESA-LULC","UnSupervised"]);
var miaka = ee.List(["2015","2016","2017","2018","2019","2020"]);
var miezi = ee.List(["Year (January to December)",
                      "H1 (January to June)","H2 (July to December)",
                      "Q1 (January to March)","Q2 (April to June)",
                      "Q3 (July to September)","Q4 (October to December)"]);
//Load Years
var chagua_mwaka = ui.Select([],'Loading ...');    //Mwaka
var chagua_mwezi = ui.Select([],'Loading ...');    //Miezi
//Mwaka
miaka.evaluate(function(mwakaa)
{
  chagua_mwaka.items().reset(mwakaa);
  chagua_mwaka.setPlaceholder('Select Year');
  chagua_mwaka.onChange(function(mwakaa)
  {
    mwaka = mwakaa;
    //Mwezi
    miezi.evaluate(function(mwezia)
    {
      chagua_mwezi.items().reset(mwezia);
      chagua_mwezi.setPlaceholder('Select Months');
      chagua_mwezi.onChange(function(mwezia)
      {
        if(mwezia === "Year (January to December)") { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-12-31'; }
        if(mwezia === "H1 (January to June)") { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-06-30'; }
        if(mwezia === "H2 (July to December)") { mwaka_mwanzo = mwaka + '-07-01'; mwaka_mwisho = mwaka + '-12-31'; }
        if(mwezia === "Q1 (January to March)") { mwaka_mwanzo = mwaka + '-01-01'; mwaka_mwisho = mwaka + '-03-31'; }
        if(mwezia === "Q2 (April to June)") { mwaka_mwanzo = mwaka + '-04-01'; mwaka_mwisho = mwaka + '-06-30'; }
        if(mwezia === "Q3 (July to September)") { mwaka_mwanzo = mwaka + '-07-01'; mwaka_mwisho = mwaka + '-09-30'; }
        if(mwezia === "Q4 (October to December)") { mwaka_mwanzo = mwaka + '-10-01'; mwaka_mwisho = mwaka + '-12-31'; }
      })
    })
  })
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load Administrative Names
var vidakio_majina = ee.List(["1","2","3","4","5","6","7","8"]);
var chagua_kidakio = ui.Select([],'Loading ...');    //Mkoa
// Load Vidakio
vidakio_majina.evaluate(function(jkidakio)
{
  chagua_kidakio.items().reset(jkidakio);
  chagua_kidakio.setPlaceholder('Select a Catchment')
  chagua_kidakio.onChange(function(jkidakio)
  {
    var eeID = ee.Number.parse(jkidakio)
    var geom_a = kidakio.filter(ee.Filter.eq('GRUOP2_OPT', eeID));
    var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 4});
    map.addLayer(geom_b,{palette: 'ff0000'},jkidakio);
    map.centerObject(geom_a);
    geomjina = jkidakio;
    geom = geom_a;
  })
})
//==============================================================================================================================================
var chora_sasa_a  = ui.Button({label: '==-> Retrive <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezoa,});
var chora_sasa_b  = ui.Button({label: '==-> Classify <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezob,});
//==============================================================================================================================================
chagua_kidakio.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_kidakio);
chagua_mwaka.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka);
panel.add(kitenganishia);
panel.add(chora_sasa_a);
panel.add(kitenganishib);
chagua_mwezi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwezi);
panel.add(chora_sasa_b);
//==============================================================================================================================================
function bonyezoa()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  //var mwaka_mwanzo = '';var mwaka_mwisho = '';
  if(mwaka === "2015") { getLC(mwaka,geom,geomjina);  }
  if(mwaka === "2016") { getLC(mwaka,geom,geomjina);   }
  if(mwaka === "2017") { getLC(mwaka,geom,geomjina);   }
  if(mwaka === "2018") { getLC(mwaka,geom,geomjina);   }
  if(mwaka === "2019") { getLC(mwaka,geom,geomjina);   }
  if(mwaka === "2020") { alert("Not Available");   }
}
//--------------------------------------------------------------------------
function bonyezob()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  if(mwaka === "2015") { getUnS(mwaka_mwanzo,mwaka_mwisho,geom,geomjina);  }
  if(mwaka === "2016") { getUnS(mwaka_mwanzo,mwaka_mwisho,geom,geomjina);  }
  if(mwaka === "2017") { getUnS(mwaka_mwanzo,mwaka_mwisho,geom,geomjina);  }
  if(mwaka === "2018") { getUnS(mwaka_mwanzo,mwaka_mwisho,geom,geomjina);  }
  if(mwaka === "2019") { getUnS(mwaka_mwanzo,mwaka_mwisho,geom,geomjina);  }
  if(mwaka === "2020") { getUnS(mwaka_mwanzo,mwaka_mwisho,geom,geomjina);  }
}
//==============================================================================================================================================
var title = ui.Label('Kwando Basin - Land Cover', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel([ panel, ui.Panel(map, null, {stretch: 'both'}), ],
              ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
map.centerObject(kidakio,6);