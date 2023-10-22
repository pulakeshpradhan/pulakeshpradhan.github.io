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
    vlfr = ui.import && ui.import("vlfr", "table", {
      "id": "users/lmathew/Forest/TZA_VLFR"
    }) || ee.FeatureCollection("users/lmathew/Forest/TZA_VLFR"),
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
    burned_area = ui.import && ui.import("burned_area", "imageCollection", {
      "id": "ESA/CCI/FireCCI/5_1"
    }) || ee.ImageCollection("ESA/CCI/FireCCI/5_1");
//FCD index developed from these publications
//http://www.ijesd.org/vol8/1012-F0032.pdf
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
map.centerObject(urt_eez,6);
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
map.addLayer(visualized, {}, 'Elevations', 0);//// Note that the visualization image doesn't require visualization parameters.
map.addLayer(rgb, {}, 'Styled Elevation',0);
map.addLayer(gsw,{palette: '0000ff'}, "Water",0);
map.addLayer(urt_wdpa_b,{palette: '00ff00'},'URT-WDPAs',0); 
map.addLayer(Tanzania,{palette: '000000'},'Tanzania',0);
map.addLayer(Tanzania_eez,{palette: '555555'},'Tanzania + EEZ',1);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Burned Areas
var getBA = function(mwaka_a,mwaka_b,eneo,jina)
{
  var img_eneo = ee.Geometry.Polygon(eneo.geometry().coordinates());
  var burned_area_a = burned_area.filterDate(mwaka_a,mwaka_b).select('BurnDate').count().clip(img_eneo);
  var burned_area_b = burned_area.filterDate(mwaka_a,mwaka_b).select('LandCover').mean().clip(img_eneo);
  var burned_area_aa = burned_area.filterDate(mwaka_a,mwaka_b).sum().clip(img_eneo);
  var meanDictionary = burned_area_a.reduceRegion({ reducer: ee.Reducer.count(),geometry: eneo.geometry(),scale: 250,maxPixels: 1e9 });
  //print(ee.String(meanDictionary.get('BurnDate')));
  var _BA = meanDictionary.get('BurnDate').getInfo();
  var visParamsBA =  { bands: ['BurnDate'],min: 0,  max: 10, palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000'], forceRgbOutput:true };
  var visParamsBAlc =  { bands: ['LandCover'],min: 0,  max: 200, 
                      palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4','F0F0F0','0032C8','0096A0','FAE6A0','58481F','9900','70663E','00CC00','4E751F','7800','666000','8DB400','8D7400','A0DC00','929900','648C00','0077be'], forceRgbOutput:true };
  map.addLayer(burned_area_b,visParamsBAlc,jina + ': Burned Landcover',1);
  map.addLayer(burned_area_a,visParamsBA,jina + ': Burned Area',1);
  //===================================================================================================================
  //===================================================================================================================
  //var optionsa = { title: jina + ' - Burned Area -' + mwaka_a + '->' + mwaka_b, fontSize: 12, hAxis: {title: 'Covarage'}, vAxis: {title: 'Pixel Counts'},
  //                legend: 'none', lineWidth: 1, pointSize: 4 };
  var optionsa = ui.Label('Burned Area:- ' + jina + '(Dates: ' +  mwaka_a + '->' + mwaka_b + ')', {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  //var histogram = ui.Chart.image.histogram(burned_area_a, eneo, 250).setOptions(options);
  //var optionsb = { title: jina + ' - The Total Burned Area -' + meanDictionary.get('BurnDate'), fontSize: 12, hAxis: {title: 'Covarage'}, vAxis: {title: 'Pixel Counts'},
  //                legend: 'none', lineWidth: 1, pointSize: 4 };
  var optionsb = ui.Label('The Total Burned Area: ' + _BA + '(x6.25Ha)', {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  panel_grafu.widgets().set(1, optionsa);   // Display the Text.
  panel_grafu.widgets().set(2, optionsb);   // Display the Area.
  var optionsL = { title: jina + ' - Burned Landcover(LC) -' + mwaka_a + '->' + mwaka_b, fontSize: 12, hAxis: {title: 'Covarage'}, vAxis: {title: 'Pixel Counts'},
                  legend: 'none', lineWidth: 1, pointSize: 4 };
  var histogramL = ui.Chart.image.histogram(burned_area_b, eneo, 250).setOptions(optionsL);
  panel_grafu.widgets().set(3, histogramL);   // Display the histogram.
  //===================================================================================================================
  var lebel_jina = ui.Label('Burned Area & Landcover Type of ' + jina, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  var lebel_tarehe = ui.Label('Date: ' + mwaka_a + '->' + mwaka_b, {textAlign: 'left', fontSize: '14px', fontWeight: 'bold'});
  panel_takwimu.widgets().set(1, lebel_jina);
  panel_takwimu.widgets().set(2, lebel_tarehe);
  //===================================================================================================================
  //===================================================================================================================
  function downloadImg()
  {
    var img_bound = ee.Geometry.Polygon(eneo.geometry().coordinates());
    var visParamsLCout =  { bands: ['BurnDate'],min: 0,  max: 10, palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000'], forceRgbOutput:true };
    var fcdscale_to_jpeg = burned_area_aa.visualize(visParamsLCout);
    var downloadArgs = {dimensions:1024,region:img_bound, format:"jpg"};
    var url = fcdscale_to_jpeg.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
    var rgb_to_jpeg = burned_area_aa.visualize({bands: ['LandCover'],min: 0,  max: 200, palette: ['282828','FFBB22','FFFF4C','F096FF','FA0000','B4B4B4','F0F0F0','0032C8','0096A0','FAE6A0','58481F','9900','70663E','00CC00','4E751F','7800','666000','8DB400','8D7400','A0DC00','929900','648C00','0077be'], forceRgbOutput:true });
    var downloadArgsRGB = {dimensions:1024,region:img_bound, format:"jpg"};
    var urlrgb = rgb_to_jpeg.getDownloadURL(downloadArgsRGB);
    urlLabelsr.setUrl(urlrgb);
    urlLabelsr.style().set({shown: true});
    var urlfire = "https://climate.esa.int/en/projects/fire/";
    urlLabelfire.setUrl(urlfire);
    urlLabelfire.style().set({shown: true});
    var urlfiregee = "https://developers.google.com/earth-engine/datasets/catalog/ESA_CCI_FireCCI_5_1#bands";
    urlLabelfiregee.setUrl(urlfiregee);
    urlLabelfiregee.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Download ' + jina +' - Burned Area', downloadImg);
  var urlLabel = ui.Label('Download-Burned Area', {shown: false});
  var urlLabelsr = ui.Label('Download-Burned Landcover', {shown: false});
  var urlLabelfire = ui.Label('Link-ESA-CCI-Fire', {shown: false});
  var urlLabelfiregee = ui.Label('Link-ESA-CCI-Fire-GEE', {shown: false});
  downloadButton.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
  panel_takwimu.widgets().set(3, downloadButton);
  panel_takwimu.widgets().set(4, urlLabel);
  panel_takwimu.widgets().set(5, urlLabelsr);
  panel_takwimu.widgets().set(6, urlLabelfire);
  panel_takwimu.widgets().set(7, urlLabelfiregee);
  var geom_img_eneo = empty.paint({featureCollection: img_eneo, width: 5 });
  map.addLayer(geom_img_eneo,{palette: 'ff0000'}, jina);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//===================================================================================================================
//===================================================================================================================
//Define Years
//var miaka = ee.List(['2015','2016','2017','2018','2019','2020',]);
var miaka = ee.List(["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019"]);
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
// Load Sub-Landscape Names
var sub_landscape_majina = sub_landscape.aggregate_array('name').distinct();
var mikoa_majina = sub_landscape.aggregate_array('name').distinct();
var chagua_mkoa = ui.Select([],'Loading ...');    //Mkoa
// Load Mikoa
sub_landscape_majina.evaluate(function(sub_landscapea)
{
  chagua_mkoa.items().reset(sub_landscapea);
  chagua_mkoa.setPlaceholder('Select a Sub-Landscape')
  chagua_mkoa.onChange(function(sub_landscapea)
  {
    var geom_a = sub_landscape.filter(ee.Filter.eq('name', sub_landscapea));
    var geom_b = empty.paint({featureCollection: geom_a.geometry(), width: 4});
    map.addLayer(geom_b,{palette: '000000'},sub_landscapea);
    map.centerObject(geom_a);
    geomjina = sub_landscapea;
    geom_cbo = geom_a;
    chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
    chagua_cfma.items().reset(); cfma_majina.evaluate(function(cfmaa){ chagua_cfma.items().reset(cfmaa);  })
    chagua_cwma.items().reset(); cwma_majina.evaluate(function(cwmaa){ chagua_cwma.items().reset(cwmaa);  })
    chagua_cwua.items().reset(); cwua_majina.evaluate(function(cwuaa){ chagua_cwua.items().reset(cwuaa);  })
    chagua_wdpa.items().reset(); wdpa_majina.evaluate(function(wdpaa){ chagua_wdpa.items().reset(wdpaa);  })
  })
})
//==============================================================================================================================================
//Hifadhi za Jamii (Misitu, Wanyapori,Bahari)
var vlfr_majina = vlfr.aggregate_array('Village').distinct(); 
var cfma_majina = cfma.aggregate_array('FGD_NAMES').distinct(); 
var cwma_majina = cwma.aggregate_array('Name').distinct(); 
var cwua_majina = cwua.aggregate_array('Name').distinct(); 
var wdpa_majina = urt_wdpa_a.aggregate_array('NAME').distinct(); 
var chagua_vlfr = ui.Select([],'Loading ...');
var chagua_cfma = ui.Select([],'Loading ...');
var chagua_cwma = ui.Select([],'Loading ...');
var chagua_cwua = ui.Select([],'Loading ...');
var chagua_wdpa = ui.Select([],'Loading ...');
//VLFRs
vlfr_majina.evaluate(function(vlfra)
{
  chagua_vlfr.items().reset(vlfra);
  chagua_vlfr.setPlaceholder('Select a VLFR')
  chagua_vlfr.onChange(function(vlfra)
  {
    var geom_a = vlfr.filter(ee.Filter.eq('Village', vlfra));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},vlfra);
    map.centerObject(geom_a);
    geomjina = vlfra;
    geom_cbo = geom_a;
    chagua_cwma.items().reset(); cwma_majina.evaluate(function(cfmaa){ chagua_cwma.items().reset(cwmaa);  })
    chagua_cfma.items().reset(); cfma_majina.evaluate(function(cfmaa){ chagua_cfma.items().reset(cfmaa);  })
    chagua_cwua.items().reset(); cwua_majina.evaluate(function(cwuaa){ chagua_cwua.items().reset(cwuaa);  })
    chagua_wdpa.items().reset(); wdpa_majina.evaluate(function(wdpaa){ chagua_wdpa.items().reset(wdpaa);  })
    chagua_mkoa.items().reset(); sub_landscape_majina.evaluate(function(sub_landscapea){ chagua_mkoa.items().reset(sub_landscapea);  })
  })
})
//CFMAs
cfma_majina.evaluate(function(cfmaa)
{
  chagua_cfma.items().reset(cfmaa);
  chagua_cfma.setPlaceholder('Select a CFMAs')
  chagua_cfma.onChange(function(cfmaa)
  {
    var geom_a = cfma.filter(ee.Filter.eq('FGD_NAMES', cfmaa));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},cfmaa);
    map.centerObject(geom_a);
    geomjina = cfmaa;
    geom_cbo = geom_a;
    chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
    chagua_cwma.items().reset(); cwma_majina.evaluate(function(cwmaa){ chagua_cwma.items().reset(cwmaa);  })
    chagua_wdpa.items().reset(); wdpa_majina.evaluate(function(wdpaa){ chagua_wdpa.items().reset(wdpaa);  })
    chagua_cwua.items().reset(); cwua_majina.evaluate(function(cwuaa){ chagua_cwua.items().reset(cwuaa);  })
    chagua_mkoa.items().reset(); sub_landscape_majina.evaluate(function(sub_landscapea){ chagua_mkoa.items().reset(sub_landscapea);  })
  })
})
//CWMAs
cwma_majina.evaluate(function(cwmaa)
{
  chagua_cwma.items().reset(cwmaa);
  chagua_cwma.setPlaceholder('Select a CWMA')
  chagua_cwma.onChange(function(cwmaa)
  {
    var geom_a = cwma.filter(ee.Filter.eq('Name', cwmaa));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},cwmaa);
    map.centerObject(geom_a);
    geomjina = cwmaa;
    geom_cbo = geom_a;
    chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
    chagua_cfma.items().reset(); cfma_majina.evaluate(function(cfmaa){ chagua_cfma.items().reset(cfmaa);  })
    chagua_cwua.items().reset(); cwua_majina.evaluate(function(cwuaa){ chagua_cwua.items().reset(cwuaa);  })
    chagua_wdpa.items().reset(); wdpa_majina.evaluate(function(wdpaa){ chagua_wdpa.items().reset(wdpaa);  })
    chagua_mkoa.items().reset(); sub_landscape_majina.evaluate(function(sub_landscapea){ chagua_mkoa.items().reset(sub_landscapea);  })
  })
})
//WUAs
cwua_majina.evaluate(function(cwuaa)
{
  chagua_cwua.items().reset(cwuaa);
  chagua_cwua.setPlaceholder('Select a Catchment/Basin')
  chagua_cwua.onChange(function(cwuaa)
  {
    var geom_a = cwua.filter(ee.Filter.eq('Name', cwuaa));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},cwuaa);
    map.centerObject(geom_a);
    geomjina = cwuaa;
    geom_cbo = geom_a;
    chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
    chagua_cfma.items().reset(); cfma_majina.evaluate(function(cfmaa){ chagua_cfma.items().reset(cfmaa);  })
    chagua_cwma.items().reset(); cwma_majina.evaluate(function(cwmaa){ chagua_cwma.items().reset(cwmaa);  })
    chagua_wdpa.items().reset(); wdpa_majina.evaluate(function(wdpaa){ chagua_wdpa.items().reset(wdpaa);  })
    chagua_mkoa.items().reset(); sub_landscape_majina.evaluate(function(sub_landscapea){ chagua_mkoa.items().reset(sub_landscapea);  })
  })
})
//WDPAs
wdpa_majina.evaluate(function(wdpaa)
{
  chagua_wdpa.items().reset(wdpaa);
  chagua_wdpa.setPlaceholder('Select a PA')
  chagua_wdpa.onChange(function(wdpaa)
  {
    var geom_a = urt_wdpa_a.filter(ee.Filter.eq('NAME', wdpaa));
    var geom_b = empty.paint({featureCollection: geom_a, width: 4 });
    map.addLayer(geom_b,{palette: 'ffff00'},wdpaa);
    map.centerObject(geom_a);
    geomjina = wdpaa;
    geom_cbo = geom_a;
    chagua_vlfr.items().reset(); vlfr_majina.evaluate(function(vlfra){ chagua_vlfr.items().reset(vlfra);  })
    chagua_cfma.items().reset(); cfma_majina.evaluate(function(cfmaa){ chagua_cfma.items().reset(cfmaa);  })
    chagua_cwma.items().reset(); cwma_majina.evaluate(function(cwmaa){ chagua_cwma.items().reset(cwmaa);  })
    chagua_cwua.items().reset(); cwua_majina.evaluate(function(cwuaa){ chagua_cwua.items().reset(cwuaa);  })
    chagua_mkoa.items().reset(); sub_landscape_majina.evaluate(function(sub_landscapea){ chagua_mkoa.items().reset(sub_landscapea);  })
  })
})
var chora_sasa  = ui.Button({label: '==-> BURNED <-==', style: { margin:'5px', stretch:'horizontal'},  onClick: bonyezo,});
//==============================================================================================================================================
chagua_mwaka.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwaka);
chagua_mwezi.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mwezi);
panel.add(kitenganishia);
chagua_mkoa.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_mkoa);
chagua_vlfr.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_vlfr); //VLFrs
chagua_cfma.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_cfma); //CFMAs
chagua_cwma.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_cwma); //CWMAs
chagua_cwua.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_cwua); //CWUAs
chagua_wdpa.style().set({textAlign:'center', stretch:'horizontal', margin:'5px'});
panel.add(chagua_wdpa); //WDPAs
panel.add(chora_sasa);
//==============================================================================================================================================
function bonyezo()
{
  panel_grafu.clear();
  panel_takwimu.clear();
  if(mwaka !== "Select Year" && miezi !== "Select Months") { getBA(mwaka_mwanzo,mwaka_mwisho,geom_cbo,geomjina);   }
}
//==============================================================================================================================================
var title = ui.Label('Tanzania CBNRM - Burned Area', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel([ panel, ui.Panel(map, null, {stretch: 'both'}), ],
              ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'});
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));