//░██████╗░██╗░░░██╗██╗███╗░░██╗███████╗░█████╗░    ░█████╗░██████╗░██████╗░
//██╔════╝░██║░░░██║██║████╗░██║██╔════╝██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗
//██║░░██╗░██║░░░██║██║██╔██╗██║█████╗░░███████║    ███████║██████╔╝██████╔╝
//██║░░╚██╗██║░░░██║██║██║╚████║██╔══╝░░██╔══██║    ██╔══██║██╔═══╝░██╔═══╝░
//╚██████╔╝╚██████╔╝██║██║░╚███║███████╗██║░░██║    ██║░░██║██║░░░░░██║░░░░░
//░╚═════╝░░╚═════╝░╚═╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝    ╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░░░
//█ ░   █▄▄ █▀█ █▀█ █▀▄ █▀▀ █▀█ █▀
//█ ▄   █▄█ █▄█ █▀▄ █▄▀ ██▄ █▀▄ ▄█
// 1.A) National
var guinea = ee.FeatureCollection('users/celiohelder/Guinea/Border5km');
Map.addLayer(guinea,{}, 'Guinea Border 5k');
var regionsWB = ee.FeatureCollection('users/celiohelder/Guinea/Borders/Regions');
Map.addLayer(regionsWB,{color: 'D5D8B5'}, 'Different Regions - WB');
var regionsGADM = ee.FeatureCollection('users/celiohelder/Guinea/Borders/RegionsGADM');
Map.addLayer(regionsGADM,{color: 'FFD9C0'}, 'Different Regions - GADM');
var region1= regionsGADM.filter(ee.Filter.inList('NAME_1',['Boké']));
var region2= regionsGADM.filter(ee.Filter.inList('NAME_1',['Conakry']));
var region3= regionsGADM.filter(ee.Filter.inList('NAME_1',['Faranah']));
var region4= regionsGADM.filter(ee.Filter.inList('NAME_1',['Kankan']));
var region5= regionsGADM.filter(ee.Filter.inList('NAME_1',['Kindia']));
var region6= regionsGADM.filter(ee.Filter.inList('NAME_1',['Labé']));
var region7= regionsGADM.filter(ee.Filter.inList('NAME_1',['Mamou']));
var region8= regionsGADM.filter(ee.Filter.inList('NAME_1',['Nzérékoré']));
var REGION = ui.Map.Layer(ee.Image().paint(regionsGADM, 0, 2), {palette:['black']}, 'Sapo',false);
// 1.B) Coastal Prefectures
// 1.B.1) All together
var coastalPrefectures = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CoastalPrefectures5k');
// 1.B.2) Individual
var boffa = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CPS/Boffaa');
var boke = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CPS/Boke');
var coyah = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CPS/Coyah');
var conakry = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CPS/Conakry');
var dubreka = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CPS/Dubreka');
var forecariah = ee.FeatureCollection('users/celiohelder/Guinea/Borders/CPS/Forecariah');
var allPrefectures = boffa.merge(boke)
                     .merge(coyah)
                     .merge(conakry)                    
                     .merge(dubreka)
                     .merge(forecariah); 
//█ █ ░   █░░ ▄▀█ █▄█ █▀▀ █▀█ █▀
//█ █ ▄   █▄▄ █▀█ ░█░ ██▄ █▀▄ ▄█
// 2.A) Copernicus Global Land Service Africa Land Cover Maps (100m resolution)
var Copernicus = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019").select('discrete_classification').clip(guinea);
var Copernicus100m = Copernicus.remap([0,20,30,40,50,60,80,90,112,114,116,122,124,126,200],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
// 2.B) GlobCover 2009 - (300m)
var dataset = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var Globcover = dataset.select('landcover').clip(guinea);
var GlobCover = Globcover.remap([11,14,20,30,40,60,110,120,130,140,150,160,170,190,200,210],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
// 2.C) West Africa Land Use Land Cover 2013 - 2km
// Tappan, G. G., Cushing, W.M., Cotillon, S.E., Mathis, M.L., Hutchinson, J.A., Herrmann, S.M., and Dalsted, K.J., 2016, West Africa Land Use Land Cover Time Series: U.S. Geological Survey data release, http://dx.doi.org/10.5066/F73N21JF
var atlasImage = ee.Image('users/celiohelder/WestAfrica2013').clip(guinea);
var WAAtlas = atlasImage.remap([1,2,3,4,6,7,8,9,10,11,12,13,14,15,21,22,23,24,25,27,28,29,31,32,78],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
// 2.D) Stephen van Gordon // check his repository
var atlasGuinea30m2013 = ee.Image('users/mvangordon/LULCmaps/Guinea').clip(guinea);
var WAAtlas30m = atlasGuinea30m2013.remap([1,2,3,4,6,7,8,9,10,11,12,13,14,15,21,22,23,24,25,27,28,29,31,32,78],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
// 2.E) ESA CCI 2016 20m
var ESALCM= ee.Image('users/celiohelder/Guinea/ESA_20m').clip(guinea);
var ESACCI = ESALCM.remap([1,2,3,4,5,7,8,10,200],[1,2,3,4,5,6,7,8,9]);
// 2.F) Midekisa 2015 - 500 m
var Midekisa2015 = ee.Image('users/celiohelder/Guinea/MidekisaLC2015').clip(guinea);
// 2.G) A New Map of Standardized Terrestrial Ecosystems of Africa 2013 100m
// https://rmgsc.cr.usgs.gov/outgoing/ecosystems/AfricaData/
var ecosystems = ee.Image('users/celiohelder/Guinea/Ecosystems2013').clip(guinea);
var Ecosystems = ecosystems.remap([1,3,4,6,66,101,112,113,116,132,133,143,216,800],[1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
// 2.H) Land Surface Form 90m - A Layer used to derive the ecosystem extent map 90m
var land = ee.Image('users/celiohelder/Guinea/LandSurfaceForm').clip(guinea);
var LandForm = land.remap([0,1,2,3,4,5,6,7],[1,2,3,4,5,6,7,8]);
// 2.I) Lithology 90m - A Layer used to derive the ecosystem extent map
var lithology = ee.Image('users/celiohelder/Guinea/Lithology').clip(guinea);
var Lithology = lithology.remap([0,1,3,4,6,7,8,9,10,14,15,18,20],[1,2,3,4,5,6,7,8,9,10,11,12,1]);
// 2.J) Global Forest Cover Change (GFCC)
var datasetgfcc = ee.ImageCollection('NASA/MEASURES/GFCC/TC/v3').filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var GFCCCanopyCover = datasetgfcc.select('tree_canopy_cover').mosaic().clip(guinea);
// 2.K) Global Forest Cover Hansen
var HansenCanopyCover = ee.Image('UMD/hansen/global_forest_change_2021_v1_9').select('treecover2000').clip(guinea);
// 2.L) Tree Height GEDI
var naf = ee.Image('users/potapovpeter/GEDI_V27/GEDI_NAFR_v27').clip(guinea).unmask(); // Guinea is split in two -__-';
var saf = ee.Image('users/potapovpeter/GEDI_V27/GEDI_SAFR_v27').clip(guinea).unmask(); // Guinea is split in two -__-';
var TreeHeight = naf.add(saf).clip(guinea);
// 2.M) Population Count 2016
var PopulationCount = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(guinea);
// 2.N) Mangrove Extent Layers
var Mangrove2000 = ee.Image("users/celiohelder/Guinea/MangroveGuinea2000_v2");
var Mangrove2005 = ee.Image("users/celiohelder/Guinea/MangroveGuinea2005_v2");
var Mangrove2010 = ee.Image("users/celiohelder/Guinea/MangroveGuinea2010_v2");
var Mangrove2015 = ee.Image("users/celiohelder/Guinea/MangroveGuinea2015_v2");
var Mangrove2020 = ee.Image("users/celiohelder/Guinea/MangroveGuinea2020_v2");
var firstYear = Mangrove2000;
var lastYear = Mangrove2020;
var mangLast = lastYear.unmask(0);
var mangFirst = firstYear.unmask(0);
var change = mangLast.subtract(mangFirst).clip(guinea);
var gain = ee.Image(0).where(change.eq(1),1).selfMask();
var loss = ee.Image(0).where(change.eq(-1),1).selfMask();
// 2.O) Land Cover Map 2014 - De Sousa 2021
var LCMNational2014 = ee.Image("users/celiohelder/Guinea/Classification-National/LCM_13_Version2");
// 2.P) Forest/ Non-Forest Map
var MapForest = LCMNational2014.remap([1,2,3,4,5,6,7,8,9,10,11,12,13],[1,1,1,1,1,1,1,1,1,2,2,2,2]);
// 2.Q) Yearly Forest Losses
var Forestlosses = ee.Image("users/celiohelder/Guinea/LossesIII").selfMask();
// 2.R) 1996 - 2020 Coastal Land Cover
var lcm1996 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM1996");
var lcm1997 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM1997");
var lcm1998 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM1998");
var lcm1999 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM1999");
var lcm2000 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2000");
var lcm2001 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2001");
var lcm2002 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2002");
var lcm2003 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2003");
var lcm2004 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2004");
var lcm2005 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2005");
var lcm2006 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2006");
var lcm2007 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2007");
var lcm2008 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2008");
var lcm2009 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2009");
var lcm2010 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2010");
var lcm2011 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2011");
var lcm2012 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2012");
var lcm2013 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2013");
var lcm2014 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2014");
var lcm2015 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2015");
var lcm2016 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2016");
var lcm2017 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2017");
var lcm2018 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2018");
var lcm2019 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2019");
var lcm2020 = ee.Image("users/celiohelder/Guinea/CoastalGuinea1996_2020V2/LCM2020");
// 2001 and 2008 apparently wasn't filtered with focal median
var prj = lcm2001.projection();
var scale = prj.nominalScale();
var lcm2001 = lcm2001.focal_median(30,'square', 'meters').reproject(prj.atScale(scale));
var lcm2008 = lcm2008.focal_median(30,'square', 'meters').reproject(prj.atScale(scale));
var LCMCollection = ee.ImageCollection.fromImages([lcm1996,lcm1997,lcm1998,lcm1999,lcm2000,lcm2001,lcm2002,lcm2003,lcm2004,lcm2005,lcm2006,lcm2007,lcm2008,lcm2009,lcm2010,
lcm2011,lcm2012,lcm2013,lcm2014,lcm2015,lcm2016,lcm2017,lcm2018,lcm2019,lcm2020]);
var text = require('users/gena/packages:text');
//Create year property.
var yearNames = ee.List([ '2000', '2001', '2002','2003',
                          '2004','2005','2006','2007',
                          '2008','2009','2010','2011',
                          '2012','2013','2014','2015',
                          '2016','2017','2018']);
var LCWithYear = LCMCollection.map(function(feat){
  return feat.set('year', yearNames.getString(
                      ee.Number.parse(feat.getString('system:index'))));
});
// 2.S) Inundation Maps WB - Kanfarande
var kanfarande_RP10_noveg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP10_noveg_p50');
var kanfarande_RP10_noveg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP10_noveg_p95');
var kanfarande_RP10_veg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP10_veg_p50');
var kanfarande_RP10_veg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP10_veg_p95');
var kanfarande_RP50_noveg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_noveg_p50');
var kanfarande_RP50_noveg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_noveg_p95');
var kanfarande_RP50_noveg_rcp26_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_noveg_rcp26_p50');
var kanfarande_RP50_noveg_rcp26_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_noveg_rcp26_p95');
var kanfarande_RP50_noveg_rcp85_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_noveg_rcp85_p50');
var kanfarande_RP50_noveg_rcp85_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_noveg_rcp85_p95');
var kanfarande_RP50_veg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_p50');
var kanfarande_RP50_veg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_p95');
var kanfarande_RP50_veg_rcp26_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_rcp26_p50');
var kanfarande_RP50_veg_rcp26_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_rcp26_p95');
var kanfarande_RP50_veg_rcp85_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_rcp85_p50');
var kanfarande_RP50_veg_rcp85_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_rcp85_p95');
var kanfarande_RP50_veg_restored_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_restored_p50');
var kanfarande_RP50_veg_restored_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_restored_p95');
var kanfarande_RP50_veg_restored_rcp26_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_restored_rcp26_p50');
var kanfarande_RP50_veg_restored_rcp26_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_restored_rcp26_p95');
var kanfarande_RP50_veg_restored_rcp85_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_restored_rcp85_p50');
var kanfarande_RP50_veg_restored_rcp85_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP50_veg_restored_rcp85_p95');
var kanfarande_RP100_noveg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP100_noveg_p50');
var kanfarande_RP100_noveg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP100_noveg_p95');
var kanfarande_RP100_veg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP100_noveg_p95');
var kanfarande_RP100_veg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps/kanfarande_RP100_veg_p50');
var kaback_RP10_noveg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP10_noveg_p50');
var kaback_RP10_noveg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP10_noveg_p95');
var kaback_RP10_veg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP10_veg_p50');
var kaback_RP10_veg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP10_veg_p95');
var kaback_RP50_noveg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_noveg_p50');
var kaback_RP50_noveg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_noveg_p95');
var kaback_RP50_noveg_rcp26_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_noveg_rcp26_p50');
var kaback_RP50_noveg_rcp26_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_noveg_rcp26_p95');
var kaback_RP50_noveg_rcp85_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_noveg_rcp85_p50');
var kaback_RP50_noveg_rcp85_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_noveg_rcp85_p95');
var kaback_RP50_veg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_p50');
var kaback_RP50_veg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_p95');
var kaback_RP50_veg_rcp26_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_rcp26_p50');
var kaback_RP50_veg_rcp26_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_rcp26_p95');
var kaback_RP50_veg_rcp85_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_rcp85_p50');
var kaback_RP50_veg_rcp85_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_rcp85_p95');
var kaback_RP50_veg_restored_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_restored_p50');
var kaback_RP50_veg_restored_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_restored_p95');
var kaback_RP50_veg_restored_rcp26_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_restored_rcp26_p50');
var kaback_RP50_veg_restored_rcp26_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_restored_rcp26_p95');
var kaback_RP50_veg_restored_rcp85_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_restored_rcp85_p50');
var kaback_RP50_veg_restored_rcp85_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP50_veg_restored_rcp85_p95');
var kaback_RP100_noveg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP100_noveg_p50');
var kaback_RP100_noveg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP100_noveg_p95');
var kaback_RP100_veg_p50 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP100_noveg_p95');
var kaback_RP100_veg_p95 = ee.Image('users/celiohelder/Guinea/InundationMaps2/kaback_RP100_veg_p50');
//█ █ █ ░   █▀█ ▄▀█ █░░ █▀▀ ▀█▀ ▀█▀ █▀▀ █▀   ▄▀█ █▄░█ █▀▄   █░█ █ █▀   █▀█ ▄▀█ █▀█ ▄▀█ █▀▄▀█ █▀▀ ▀█▀ █▀▀ █▀█ █▀
//█ █ █ ▄   █▀▀ █▀█ █▄▄ ██▄ ░█░ ░█░ ██▄ ▄█   █▀█ █░▀█ █▄▀   ▀▄▀ █ ▄█   █▀▀ █▀█ █▀▄ █▀█ █░▀░█ ██▄ ░█░ ██▄ █▀▄ ▄█
// 3.A) Copernicus Global Land Service Africa Land Cover Maps (100m resolution)
var paletteCopernicus = [
  '000000', // 0: NoData.
  'ffbb22', // 20: Shrubs.
  'ffff4c', // 30: Herbaceous vegetation. 
  'f096ff', // 40: Cultivated and managed vegetation / agriculture.
  'fa0000', // 50: Urban / built up.
  'b4b4b4', // 60: Bare / sparse vegetation.
  '0032c8', // 80: Permanent water bodies.
  '0096a0', // 90: Herbaceous wetland.
  '009900',  // 112: Closed forest, evergreen broad leaf. 
  '00cc00',  // 114: Closed forest, deciduous broad leaf. 
  '007800',  // 116: Closed forest, not matching any of the other definitions.
  '8db400',  // 122:Open forest, evergreen broad leaf.
  'a0dc00',  // 124: Open forest, deciduous broad leaf.
  '648c00',  // 126: Open forest, not matching any of the other definitions.
  '14295f'  // 200: Oceans, seas. Can be either fresh or salt-water bodies.
];
var CopernicusVIS = {min:1, max: 15, palette:paletteCopernicus};
var classLabelsCopernicus = [
'NoData',
'Shrubs',
'Herbaceous vegetation', 
'Cultivated and managed vegetation / agriculture',
'Urban / built up',
'Bare / sparse vegetation',
'Permanent water bodies',
'Herbaceous wetland',
'Closed forest, evergreen broad leaf', 
'Closed forest, deciduous broad leaf', 
'Closed forest, not matching any of the other definitions',
'Open forest, evergreen broad leaf',
'Open forest, deciduous broad leaf',
'Open forest, not matching any of the other definitions',
'Oceans, seas, Can be either fresh or salt-water bodies'
];
var classNumberListCopernicus = ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
var classLabelsListCopernicus = [
'null',
'NoData',
'Shrubs',
'Herbaceous vegetation', 
'Cultivated and managed vegetation / agriculture',
'Urban / built up',
'Bare / sparse vegetation',
'Permanent water bodies',
'Herbaceous wetland',
'Closed forest, evergreen broad leaf', 
'Closed forest, deciduous broad leaf', 
'Closed forest, not matching any of the other definitions',
'Open forest, evergreen broad leaf',
'Open forest, deciduous broad leaf',
'Open forest, not matching any of the other definitions',
'Oceans, seas, Can be either fresh or salt-water bodies'
];
// 3.B) GlobCover 2009 - (300m)
var paletteGlobCover = [
'aaefef', //11 Post-flooding or irrigated croplands
'ffff63', //14 Rainfed croplands
'dcef63', //20 Mosaic cropland (50-70%) / vegetation (grassland, shrubland, forest) (20-50%)
'cdcd64', //30 Mosaic vegetation (grassland, shrubland, forest) (50-70%) / cropland (20-50%)
'006300', //40 Closed to open (>15%) broadleaved evergreen and/or semi-deciduous forest (>5m)
'aac700', //60 Open (15-40%) broadleaved deciduous forest (>5m)
'8d9f00', //110 Mosaic forest-shrubland (50-70%) / grassland (20-50%)
'bd9500', //120 Mosaic grassland (50-70%) / forest-shrubland (20-50%)
'956300', //130 Closed to open (>15%) shrubland (<5m)
'ffb431', //140 Closed to open (>15%) grassland
'ffebae', //150 Sparse (>15%) vegetation (woody vegetation, shrubs, grassland)
'00785a', //160 Closed (>40%) broadleaved forest regularly flooded - Fresh water
'009578', //170 Closed (>40%) broadleaved semi-deciduous and/or evergreen forest regularly flooded - saline water
'c31300', //190 Artificial surfaces and associated areas (urban areas >50%)
'fff5d6', //200 Bare areas
'0046c7', //210 Water bodies
];
var GlobCoverVIS = {min:1, max: 16, palette:paletteGlobCover};
var classLabelsGlobCover = [
'Post-flooding or irrigated croplands',
'Rainfed croplands',
'Mosaic cropland (50-70%) / vegetation (grassland, shrubland, forest) (20-50%)',
'Mosaic vegetation (grassland, shrubland, forest) (50-70%) / cropland (20-50%)',
'Closed to open (>15%) broadleaved evergreen and/or semi-deciduous forest (>5m)',
'Open (15-40%) broadleaved deciduous forest (>5m)',
'Mosaic forest-shrubland (50-70%) / grassland (20-50%)',
'Mosaic grassland (50-70%) / forest-shrubland (20-50%)',
'Closed to open (>15%) shrubland (<5m)',
'Closed to open (>15%) grassland',
'Sparse (>15%) vegetation (woody vegetation, shrubs, grassland)',
'Closed (>40%) broadleaved forest regularly flooded - Fresh water',
'Closed (>40%) broadleaved semi-deciduous and/or evergreen forest regularly flooded - saline water',
'Artificial surfaces and associated areas (urban areas >50%)',
'Bare areas',
'Water bodies'
];
var classNumberListGlobCover = ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
var classLabelsListGlobCover = [
'null',
'Post-flooding or irrigated croplands',
'Rainfed croplands',
'Mosaic cropland (50-70%) / vegetation (grassland, shrubland, forest) (20-50%)',
'Mosaic vegetation (grassland, shrubland, forest) (50-70%) / cropland (20-50%)',
'Closed to open (>15%) broadleaved evergreen and/or semi-deciduous forest (>5m)',
'Open (15-40%) broadleaved deciduous forest (>5m)',
'Mosaic forest-shrubland (50-70%) / grassland (20-50%)',
'Mosaic grassland (50-70%) / forest-shrubland (20-50%)',
'Closed to open (>15%) shrubland (<5m)',
'Closed to open (>15%) grassland',
'Sparse (>15%) vegetation (woody vegetation, shrubs, grassland)',
'Closed (>40%) broadleaved forest regularly flooded - Fresh water',
'Closed (>40%) broadleaved semi-deciduous and/or evergreen forest regularly flooded - saline water',
'Artificial surfaces and associated areas (urban areas >50%)',
'Bare areas',
'Water bodies'
];
// 3.C) West Africa Land Use Land Cover 2013 - 2km
var paletteWAAtlas = [
"8400A8", // 1 Forest
"8BAD8B", // 2 Savanna
"000080", // 3 Wetland - floodplain
"FFCC99", // 4 Steppe
"808000", // 5 Plantation
"33CCCC", // 6 Mangrove
"FFFF96", // 7 Agriculture
"3366FF", // 8 Water bodies
"FF99CC", // 9 Sandy areas
"969696", // 10 Rocky land
"A87000", // 11 Bare soil
"FF0000", // 12 Setllements
"CCFF66", // 13 Irrigated Agriculture
"A95CE6", // 14 Gallery forest and riparian forest
"D296E6", // 15 Degraded Forest
"A83800", // 16 Bowe
"F5A27A", // 17 Thicket
"EBC961", // 18 Agriculture in shallows and recession
"28734B", // 19 Woodland
"EBDF73", // 20 Cropland and fallow with oil palms
"BEFFA6", // 21 Swamp forest
"A6C28C", // 22 Sahelian short grass savanna
"0A9696", // 23 Hearbaceous savanna
"749373", // 24 Shrubland
"505050", // 25 Open mine
];
var WAAtlasVIS = {min:1, max: 25, palette:paletteWAAtlas};
var classLabelsWAAtlas = [
'Forest',
'Savanna',
'Wetland - floodplain',
'Steppe',
'Plantation',
'Mangrove',
'Agriculture',
'Water bodies',
'Sandy areas',
'Rocky land',
'Bare soil',
'Setllements',
'Irrigated Agriculture',
'Gallery forest and riparian forest',
'Degraded Forest',
'Bowe',
'Thicket',
'Agriculture in shallows and recession',
'Woodland',
'Cropland and fallow with oil palms',
'Swamp forest',
'Sahelian short grass savanna',
'Hearbaceous savanna',
'Shrubland',
'Open mine'
];
var classNumberListWAAtlas = ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
var classLabelsListWAAtlas = [
'null',
'Forest',
'Savanna',
'Wetland - floodplain',
'Steppe',
'Plantation',
'Mangrove',
'Agriculture',
'Water bodies',
'Sandy areas',
'Rocky land',
'Bare soil',
'Setllements',
'Irrigated Agriculture',
'Gallery forest and riparian forest',
'Degraded Forest',
'Bowe',
'Thicket',
'Agriculture in shallows and recession',
'Woodland',
'Cropland and fallow with oil palms',
'Swamp forest',
'Sahelian short grass savanna',
'Hearbaceous savanna',
'Shrubland',
'Open mine'
];
// 3.D) West Africa Land Use Land Cover 2013 - 2km
var paletteWAAtlas30m = [
"8400A8", // 1 Forest
"8BAD8B", // 2 Savanna
"000080", // 3 Wetland - floodplain
"FFCC99", // 4 Steppe
"808000", // 5 Plantation
"33CCCC", // 6 Mangrove
"FFFF96", // 7 Agriculture
"3366FF", // 8 Water bodies
"FF99CC", // 9 Sandy areas
"969696", // 10 Rocky land
"A87000", // 11 Bare soil
"FF0000", // 12 Setllements
"CCFF66", // 13 Irrigated Agriculture
"A95CE6", // 14 Gallery forest and riparian forest
"D296E6", // 15 Degraded Forest
"A83800", // 16 Bowe
"F5A27A", // 17 Thicket
"EBC961", // 18 Agriculture in shallows and recession
"28734B", // 19 Woodland
"EBDF73", // 20 Cropland and fallow with oil palms
"BEFFA6", // 21 Swamp forest
"A6C28C", // 22 Sahelian short grass savanna
"0A9696", // 23 Hearbaceous savanna
"749373", // 24 Shrubland
"505050", // 25 Open mine
];
var WAAtlas30mVIS = {min:1, max: 25, palette:paletteWAAtlas};
var classLabelsWAAtlasm30m = [
'Forest',
'Savanna',
'Wetland - floodplain',
'Steppe',
'Plantation',
'Mangrove',
'Agriculture',
'Water bodies',
'Sandy areas',
'Rocky land',
'Bare soil',
'Setllements',
'Irrigated Agriculture',
'Gallery forest and riparian forest',
'Degraded Forest',
'Bowe',
'Thicket',
'Agriculture in shallows and recession',
'Woodland',
'Cropland and fallow with oil palms',
'Swamp forest',
'Sahelian short grass savanna',
'Hearbaceous savanna',
'Shrubland',
'Open mine'
];
var classNumberListWAAtlas30m = ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]);
var classLabelsListWAAtlas30m = [
'null',
'Forest',
'Savanna',
'Wetland - floodplain',
'Steppe',
'Plantation',
'Mangrove',
'Agriculture',
'Water bodies',
'Sandy areas',
'Rocky land',
'Bare soil',
'Setllements',
'Irrigated Agriculture',
'Gallery forest and riparian forest',
'Degraded Forest',
'Bowe',
'Thicket',
'Agriculture in shallows and recession',
'Woodland',
'Cropland and fallow with oil palms',
'Swamp forest',
'Sahelian short grass savanna',
'Hearbaceous savanna',
'Shrubland',
'Open mine'
];
// 3.E) ESA CCI 2016 20m
var paletteESACCI = [
  '287300', // Tree Covered Areas
  'FFAA00', // Shrubs
  'A5FF73', // Grasslands
  'FFAA00', // Cropland
  'C800FF', // Vegetation Aquatic or Regularly Flooded
  '000000', // Lichen and Mosses
  'FF0000', // Built-up areas
  '006EFA', // Open Water
  '828282', // Bare Areas
];
var ESACCIVIS = {min:1, max:9, palette:paletteESACCI}; 
var classLabelsESACCI = [
'Tree Covered Areas',
'Shrubs',
'Grasslands',
'Cropland',
'Vegetation Aquatic or Regularly Flooded',
'Lichen and Mosses',
'Built-up areas',
'Open Water',
'Bare Areas'
];
var classNumberListESACCI = ee.List([1,2,3,4,5,6,7,8,9]);
var classLabelsListESACCI = [
'null',
'Tree Covered Areas',
'Shrubs',
'Grasslands',
'Cropland',
'Vegetation Aquatic or Regularly Flooded',
'Lichen and Mosses',
'Built-up areas',
'Open Water',
'Bare Areas'
];
// 3.F) Midekisa 2015 - 500 m
var paletteMidekisa2015 = [
  '000000', // Impervious Surface
  'aaff00', // Low Biomass
  '448970', // High Biomass
  'a83800', // Bare Soil
  'ffebbe', // Sand
  'f57a7a', // Rock
  '0070ff'  // Water
];
var Midekisa2015VIS = {palette:paletteMidekisa2015, min:1, max:7};
var classLabelsMidekisa2015 = [
'Impervious Surface',
'Low Biomass',
'High Biomass',
'Bare Soil',
'Sand',
'Rock',
'Water'
];
var classNumberListMidekisa2015 = ee.List([1,2,3,4,5,6,7]);
var classLabelsListMidekisa2015 = [
'null',
'Impervious Surface',
'Low Biomass',
'High Biomass',
'Bare Soil',
'Sand',
'Rock',
'Water'
]
// 3.G) A New Map of Standardized Terrestrial Ecosystems of Africa 2013 100m
var paletteEcosystems = [
  '00750a', // Guineo-Congolian Evergreen & Semi-Evergreen Rainforest
  '117b0c', // Guineo-Congolian Semi-deciduous Rainforest
  '076e0a', // Guineo-Congolian Littoral rainforest
  '0c8104', // Eastern Africa Lowland Semi-evergreen Forest
  '2b3e60', // Antostema-Alstoneia Swamp Forest
  '84ff76', // Moist Combretum-Terminalia Woodland and Savanna
  'a6ee96', // Western Africa Mesic Woodland and Grassland
  '7cff63', // Gabono Congolian Mesic Woodland and Grassland
  'ffe379', // Dry Combretum-mixed Woodland and Savanna
  'd7d79e', // Sudano Sahelian Shrub Savanna
  'abcd66', // Sudano Sahelian Treed Savanna
  'c5a570', // AfroMontane Grassland
  '4ce600', // Atlantic Ocean Mangroves
  '0070ff', // Open Water
];
var EcosystemsVIS = {palette: paletteEcosystems,min:1, max:14};
var classLabelsEcosystems = [
'Guineo-Congolian Evergreen & Semi-Evergreen Rainforest',
'Guineo-Congolian Semi-deciduous Rainforest',
'Guineo-Congolian Littoral rainforest',
'Eastern Africa Lowland Semi-evergreen Forest',
'Antostema-Alstoneia Swamp Forest',
'Moist Combretum-Terminalia Woodland and Savanna',
'Western Africa Mesic Woodland and Grassland',
'Gabono Congolian Mesic Woodland and Grassland',
'Dry Combretum-mixed Woodland and Savanna',
'Sudano Sahelian Shrub Savanna',
'Sudano Sahelian Treed Savanna',
'AfroMontane Grassland',
'Atlantic Ocean Mangroves',
'Open Water',
];
var classNumberListEcosystems = ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
var classLabelsListEcosystems = [
'null',
'Guineo-Congolian Evergreen & Semi-Evergreen Rainforest',
'Guineo-Congolian Semi-deciduous Rainforest',
'Guineo-Congolian Littoral rainforest',
'Eastern Africa Lowland Semi-evergreen Forest',
'Antostema-Alstoneia Swamp Forest',
'Moist Combretum-Terminalia Woodland and Savanna',
'Western Africa Mesic Woodland and Grassland',
'Gabono Congolian Mesic Woodland and Grassland',
'Dry Combretum-mixed Woodland and Savanna',
'Sudano Sahelian Shrub Savanna',
'Sudano Sahelian Treed Savanna',
'AfroMontane Grassland',
'Atlantic Ocean Mangroves',
'Open Water',
];
// 3.H) Land Surface Form 90m
var paletteLandForm = [
  '0070ff', // Open Water
  'b3cfca', // Smooth Plains (Flat/Smooth Plains)
  '7d9440', // Irregular Plains
  '666b78', // Escarpments
  'e8deb8', // Hills
  'ffcc66', // Breaks
  'e38f5c', // Low Mountains
  '823033', // High Mountains/Deep Canyons
];
var LandFormVIS = {palette: paletteLandForm, min:1, max:8};
var classLabelsLandForm = [
'Open Water',
'Smooth Plains (Flat/Smooth Plains)',
'Irregular Plains',
'Escarpments',
'Hills',
'Breaks',
'Low Mountains',
'High Mountains/Deep Canyons',
];
var classNumberListLandForm = ee.List([1,2,3,4,5,6,7,8]);
var classLabelsListLandForm = [
'null',
'Open Water',
'Smooth Plains (Flat/Smooth Plains)',
'Irregular Plains',
'Escarpments',
'Hills',
'Breaks',
'Low Mountains',
'High Mountains/Deep Canyons',
];
// 3.I) Lithology 90m
var paletteLithology = [
  '3a6db5', // Open Water
  '95838d', // Carbonate
  'ccac76', // 3. Non-Carbonate
  'c1d9b4', // 4. Metasedimentary
  'cf8b2d', // 6. Silicic
  'cccccc', // 7. Metaigneous
  'd66fb4', // 8. Ultramafic
  '610091', // 9. Extrusive Volcanic
  'a8a091', // 10. Colluvium
  '627239', // 14. Alluvium - Fluvial
  'a58b14', // 15. Alluvium - Beach, Strand, Coastal Dune
  'dfdcb8', // 18. Alluvium - Other
];
var LithologyVIS = {palette: paletteLithology, min:1, max:12};
var classLabelsLithology = [
'Open Water',
'Carbonate',
'Non-Carbonate',
'Metasedimentary',
'Silicic',
'Metaigneous',
'Ultramafic',
'Extrusive Volcanic',
'Colluvium',
'Alluvium - Fluvial',
'Alluvium - Beach, Strand, Coastal Dune',
'Alluvium - Other',
];
var classNumberListLithology = ee.List([1,2,3,4,5,6,7,8,9,10,11,12]);
var classLabelsListLithology = [
'null',
'Open Water',
'Carbonate',
'Non-Carbonate',
'Metasedimentary',
'Silicic',
'Metaigneous',
'Ultramafic',
'Extrusive Volcanic',
'Colluvium',
'Alluvium - Fluvial',
'Alluvium - Beach, Strand, Coastal Dune',
'Alluvium - Other',  
];
// 3.J) Global Forest Cover Change (GFCC)
var paletteGFCCCanopyCover = ['ffffff', 'afce56', '5f9c00', '0e6a00', '003800'];
var GFCCCanopyCoverVIS = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'lightgreen', 'darkgreen'] // ['lightyellow', 'EF9F9F', '371B58']
};
var classLabelsGFCCCanopyCover = [
'0 - 20%',
'20 - 40%',
'40 - 60%',
'60 - 80%',
'80 - 100%'
];
// 3.K) Global Forest Cover Hansen
var paletteHansenCanopyCover = ['ffffff', 'afce56', '5f9c00', '0e6a00', '003800'];
var HansenCanopyCoverVIS = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'lightgreen', 'darkgreen'] // ['lightyellow', 'EF9F9F', '371B58']
};
var classLabelsHansenCanopyCover = [
'0 - 20%',
'20 - 40%',
'40 - 60%',
'60 - 80%',
'80 - 100%'
];
// 3.L) Tree Height GEDI [CONTINUOUS VARIABLE]
var paletteTreeHeight = ['ffffcc','a1dab4','41b6c4','2c7fb8','253494'];
var TreeHeightVIS = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'steelblue', 'darkblue']};
var classLabelsTreeHeight = [
'0 - 3 m',
'3 - 6 m',
'6 - 9 m',
'9 - 12 m',
'12 - 15+ m',
];
// 3.M) Population Count 2016 [CONTINUOUS VARIABLE]
var palettePopulationCount = ['fefed8', 'd5f2bc','a7ce9d','97ae91','929489','8d7982','855e78','6e3e67','45204c','1a0e34'];
var PopulationCountVIS = {  min: 0,
  max: 1,
  palette: ['lightyellow', 'EF9F9F', '371B58']};
var classLabelsPopulationCount = [
'0 - 100',
'100 - 200',
'200 - 300',
'300 - 400',
'400 - 500',
'500 - 600',
'600 - 700',
'700 - 800',
'800 - 900',
'900 - 1000+',
]
// 3.N) Mangrove Extent Layers
var Mangrove2000VIS = {palette: '#d2f6c5'};
var Mangrove2005VIS = {palette: '#bfdcae'};
var Mangrove2010VIS = {palette: '#68b0ab'};
var Mangrove2015VIS = {palette: '#81b214'};
var Mangrove2020VIS = {palette: '#206a5d'};
var mang2000 = ui.Map.Layer(Mangrove2000, {palette: '#d2f6c5'}, 'Mangrove Extent 2000',true);
var mang2005 = ui.Map.Layer(Mangrove2005, {palette: '#bfdcae'}, 'Mangrove Extent 2005',false);
var mang2010 = ui.Map.Layer(Mangrove2010, {palette: '#68b0ab'}, 'Mangrove Extent 2010',false); 
var mang2015 = ui.Map.Layer(Mangrove2015, {palette: '#81b214'}, 'Mangrove Extent 2015',false);
var mang2020 = ui.Map.Layer(Mangrove2020, {palette: '#206a5d'}, 'Mangrove Extent 2020',true);
var losses =  ui.Map.Layer(loss, {palette: ['#FF5D5D']}, 'Mangrove Losses 2020',true);
var gains =  ui.Map.Layer(gain, {palette: ['#14C38E']}, 'Mangrove Losses 2020',true);
// 3.O) Land Cover Map 2014 - De Sousa 2021
var paletteLCMNational2014 = [
  '0e49b5', // Water Bodies
  '9e7540', // Shallow water and mudflats
  'be6283', // Wetlands
  'ff4646', // Settlements
  'e8e9a1', // Rice fields / Paddy 
  'e6b566', // Cropland
  'cdd0cb', // Rocks and exposed soil
  'c0ffb3', // Grasslands 
  '52de97', // Treed Savanna
  '3c9d9b', // Woodlands
  '8559a5', // Mangrove Forests
  '81b214', // Secondary Growth Forests
  '206a5d', // Dense Humid Forests
];
var LCMNational2014VIS = {min:1, max:13, palette:paletteLCMNational2014};
var classLabelsLCMNational2014 = ["Water Bodies", "Shallow Water and Mudflats", "Wetlands", "Settlements", "Rice Fields / Paddy", "Cropland", "Rocks and Exposed Soil", 
"Grasslands", "Treed Savanna", "Woodlands", "Mangrove Forests", "Secondary Growth Forests", "Dense Humid Forests"];
var classNumberListLCMNational2014 = ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13]);
var classLabelsListLCMNational2014 = ["null", "Water Bodies", "Shallow Water and Mudflats", "Wetlands", "Settlements", "Rice Fields / Paddy", "Cropland", "Rocks and Exposed Soil", 
"Grasslands", "Treed Savanna", "Woodlands", "Mangrove Forests", "Secondary Growth Forests", "Dense Humid Forests"];
// 3.P) Forest/ Non-Forest Map
var paletteMapForest =[
 'cdd0cb', // Non-forest
 '206a5d'  // Forest
];
var MapForestVIS = {min: 1, max:2, palette:paletteMapForest};
var classLabelsMapForest = [
'Forest', 'Non-Forest'
]
var classNumberListMapForest = ee.List([1,2]);
var classLabelsListMapForest = ['null', 'Forest', 'Non-Forest'];
// 3.Q) Yearly Forest Losses
var paletteForestlosses = [
  'EB5353', // 2015
  'F9D923', // 2016
  '36AE7C', // 2017
  '187498', // 2018
  '4D4C7D', // 2019
  '354259', // 2020
];
var ForeslossesVIS = {min:1, max:6, palette:paletteForestlosses};
var classLabelsForestlosses = ["2015", "2016", "2017", "2018", "2019", "2020"];
var classNumberListForestlosses = ee.List([1,2,3,4,5,6]);
var classLabelsListForestlosses = ["null", "2015", "2016", "2017", "2018", "2019", "2020"];
// 3.R) 1996 - 2020 Coastal Land Cover
var paletteAnnualLCM = [
  '0e49b5', // Water Bodies
  'be6283', // Wetlands
  'ff4646', // Settlements
  'e8e9a1', // Rice fields / Paddy 
  'e6b566', // Cropland
  'cdd0cb', // Rocks and exposed soil
  'c0ffb3', // Low biomass vegetation (Grasslands and Treed Savanna) 
  '8559a5', // Mangrove Forests
  '81b214', // Forests (Woodlands, Secondary dense forest)
];
var AnnualLCMVIS = {min:1, max:9, palette:paletteAnnualLCM};
var classLabelsAnnualLCM = [
'Water Bodies',
'Wetlands',
'Settlements',
'Rice fields / Paddy ',
'Cropland',
'Rocks and exposed soil',
'Low biomass vegetation (Grasslands and Treed Savanna)',
'Mangrove Forests',
'Forests (Woodlands, Secondary dense forest)',
];
var classNumberListAnnualMap = ee.List([1,2,3,4,5,6,7,8,9]);
var classLabelsListAnnualMap = [
'Null',
'Water Bodies',
'Wetlands',
'Settlements',
'Rice fields / Paddy ',
'Cropland',
'Rocks and exposed soil',
'Low biomass vegetation (Grasslands and Treed Savanna)',
'Mangrove Forests',
'Forests (Woodlands, Secondary dense forest)',
];
//█ █░█ ░   █░░ █▀▀ █▀▀ █▀▀ █▄░█ █▀▄ █▀
//█ ▀▄▀ ▄   █▄▄ ██▄ █▄█ ██▄ █░▀█ █▄▀ ▄█
// Create the legend container and the panel first
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var legendPanel = ui.Panel({style: {position: 'bottom-right', padding: '8px'}});
var legendPanelIM = ui.Panel({style: {position: 'bottom-right', padding: '9px'}});
var legendPanelIM2 = ui.Panel({style: {position: 'bottom-right', padding: '9px'}});
// Add legend label
var legendDescription = ui.Label({
  value: 'Legend', 
  style: {fontSize: '13px',
    fontWeight: 'bold',
    //color: '#9E9E9E',
    padding: '1px'}
});  
// 4.A) Copernicus Global Land Service Africa Land Cover Maps (100m resolution)
// I = 15
var CopernicusLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 15; i++) {
  CopernicusLegend.add(makeRow(paletteCopernicus[i], classLabelsCopernicus[i]));
  }
// 4.B) GlobCover 2009 - (300m)
// I = 16
var GlobCoverLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 16; i++) {
  GlobCoverLegend.add(makeRow(paletteGlobCover[i], classLabelsGlobCover[i]));
  }
// 4.C) West Africa Land Use Land Cover 2013 - 2km
// I = 25
var WAAtlasLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 25; i++) {
  WAAtlasLegend.add(makeRow(paletteWAAtlas[i], classLabelsWAAtlas[i]));
  }
// 4.D) West Africa Land Use Land Cover 2013 Stephen van Gordon
// I = 25
var WAAtlas30mLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 25; i++) {
  WAAtlas30mLegend.add(makeRow(paletteWAAtlas30m[i], classLabelsWAAtlasm30m[i]));
  }
// 4.E) ESA CCI 2016 20m
// I = 9
var ESACCILegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 9; i++) {
  ESACCILegend.add(makeRow(paletteESACCI[i], classLabelsESACCI[i]));
  }
// 4.F) Midekisa 2015 - 500 m
// I = 7
var Midekisa2015Legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 7; i++) {
  Midekisa2015Legend.add(makeRow(paletteMidekisa2015[i], classLabelsMidekisa2015[i]));
  }
// 4.G) A New Map of Standardized Terrestrial Ecosystems of Africa 2013 100m
// I = 14
var EcosystemsLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 14; i++) {
  EcosystemsLegend.add(makeRow(paletteEcosystems[i], classLabelsEcosystems[i]));
  }
// 4.H) Land Surface Form 90m
// I = 8
var LandFormLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 8; i++) {
  LandFormLegend.add(makeRow(paletteLandForm[i], classLabelsLandForm[i]));
  }
// 4.I) Lithology 90m
// I = 12
var LithologyLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 12; i++) {
  LithologyLegend.add(makeRow(paletteLithology[i], classLabelsLithology[i]));
  }
// 4.J) Global Forest Cover Change (GFCC)
// I = 5
var GFCCCanopyCoverLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 5; i++) {
  GFCCCanopyCoverLegend.add(makeRow(paletteGFCCCanopyCover[i], classLabelsGFCCCanopyCover[i]));
  }
// 4.K) Global Forest Cover Hansen 
// I = 5
var CC_STYLE = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'lightgreen', 'darkgreen'] // ['lightyellow', 'EF9F9F', '371B58']
};
var CC_VIS_MAX_VALUE = 100;
var CC_VIS_NONLINEARITY = 1;
function colorStretch_CC(image) {
  return image.divide(CC_VIS_MAX_VALUE)
      .pow(1 / CC_VIS_NONLINEARITY);
}
function undoColorStretch_CC(val) {
  return Math.pow(val, CC_VIS_NONLINEARITY) * CC_VIS_MAX_VALUE;
}
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend_CC() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch_CC(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch_CC(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch_CC(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(CC_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE_CC = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE_CC = {
  fontSize: '12px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var HansenCanopyCoverLegend = ui.Panel(
    [
      ui.Label('Canopy Cover (%)', LEGEND_TITLE_STYLE_CC), makeLegend_CC(),
      ui.Label(
          '(Average % canopy cover per 900 m²)', LEGEND_FOOTNOTE_STYLE_CC),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '400px', position: 'bottom-left'});
// 4.L) Tree Height GEDI 
// I = 5
var TREEHEIGHT_STYLE = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'steelblue', 'darkblue'] // ['lightyellow', 'EF9F9F', '371B58']
};
var TREEHEIGHT_VIS_MAX_VALUE = 40;
var TREEHEIGHT_VIS_NONLINEARITY = 1;
function colorStretch_Tree(image) {
  return image.divide(TREEHEIGHT_VIS_MAX_VALUE)
      .pow(1 / TREEHEIGHT_VIS_NONLINEARITY);
}
function undoColorStretch_Tree(val) {
  return Math.pow(val, TREEHEIGHT_VIS_NONLINEARITY) * TREEHEIGHT_VIS_MAX_VALUE;
}
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend_Tree() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch_Tree(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch_Tree(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch_Tree(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(TREEHEIGHT_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE_Tree = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE_Tree = {
  fontSize: '12px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var TreeHeightLegend = ui.Panel(
    [
      ui.Label('Tree Height (meters)', LEGEND_TITLE_STYLE_Tree), makeLegend_Tree(),
      ui.Label(
          '(Average canopy height per 900 m²)', LEGEND_FOOTNOTE_STYLE_Tree),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '400px', position: 'bottom-left'});
// 4.M) Population Count 2016
// I = 10
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'EF9F9F', '371B58']
};
var POPULATION_VIS_MAX_VALUE = 1200;
var POPULATION_VIS_NONLINEARITY = 4;
function colorStretch(image) {
  return image.divide(POPULATION_VIS_MAX_VALUE)
      .pow(1 / POPULATION_VIS_NONLINEARITY);
}
function undoColorStretch(val) {
  return Math.pow(val, POPULATION_VIS_NONLINEARITY) * POPULATION_VIS_MAX_VALUE;
}
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(POPULATION_STYLE.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '12px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var PopulationCountLegend = ui.Panel(
    [
      ui.Label('Population Density', LEGEND_TITLE_STYLE), makeLegend(),
      ui.Label(
          '(thousands of people per square kilometer)', LEGEND_FOOTNOTE_STYLE),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '400px', position: 'bottom-left'});
// 4.N) Mangrove Extent Layers
// I = 1
// Will include as Check Boxes
// 4.O) Land Cover Map 2014 - De Sousa 2021
// I = 13
var LCMNational2014Legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 13; i++) {
  LCMNational2014Legend.add(makeRow(paletteLCMNational2014[i], classLabelsLCMNational2014[i]));
  }
// 4.P) Forest/ Non-Forest Map
// I = 2
var MapForestLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 2; i++) {
  MapForestLegend.add(makeRow(paletteMapForest[i], classLabelsMapForest[i]));
  }
// 4.Q) Yearly Forest Losses
// I = 6
var ForestlossesLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 6; i++) {
  ForestlossesLegend.add(makeRow(paletteForestlosses[i], classLabelsForestlosses[i]));
  }
// 4.R) 1996 - 2020 Coastal Land Cover
// I = 9
var AnnualLCMLegend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
for (var i = 0; i < 9; i++) {
  AnnualLCMLegend.add(makeRow(paletteAnnualLCM[i], classLabelsAnnualLCM[i]));
  }
// 4.S) Inundation Map Kanfarande
var CC_STYLE_IMK = {
  min: 0,
  max: 1,
  palette: ['EEEEEE', '61A4BC','1A132F'] // ['lightyellow', 'EF9F9F', '371B58']
};
var IMK_VIS_MAX_VALUE = 25;
var IMK_VIS_NONLINEARITY = 1;
function colorStretch_IMK(image) {
  return image.divide(IMK_VIS_MAX_VALUE)
      .pow(1 / IMK_VIS_NONLINEARITY);
}
function undoColorStretch_IMK(val) {
  return Math.pow(val, IMK_VIS_NONLINEARITY) * IMK_VIS_MAX_VALUE;
}
function ColorBar_IMK(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend_IMK() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch_IMK(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch_IMK(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch_IMK(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar_IMK(CC_STYLE_IMK.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE_IMK = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE_IMK = {
  fontSize: '10.5px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var IMKLegend = ui.Panel(
    [
      ui.Label('Depth (in meters)', LEGEND_TITLE_STYLE_IMK), makeLegend_IMK(),
      ui.Label(
          'Flood depth (m) per cell (62x62m)', LEGEND_FOOTNOTE_STYLE_IMK),
      ui.Label(
          '(Source: Deltares (2022). Mangroves as a Protection from Erosion and Coastal Flooding in Selected West African Coastal Countries – Detailed modelling report. World Bank Project.)', LEGEND_FOOTNOTE_STYLE_IMK),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '400px', position: 'bottom-left'});
// 4.T) Inundation Map Kaback
var CC_STYLE_IMKB = {
  min: 0,
  max: 1,
  palette: ['EEEEEE', '61A4BC','1A132F'] // ['lightyellow', 'EF9F9F', '371B58']
};
var IMK_VIS_MAX_VALUEkb = 10;
var IMK_VIS_NONLINEARITYkb = 1;
function colorStretch_IMKB(image) {
  return image.divide(IMK_VIS_MAX_VALUEkb)
      .pow(1 / IMK_VIS_NONLINEARITYkb);
}
function undoColorStretch_IMKB(val) {
  return Math.pow(val, IMK_VIS_NONLINEARITYkb) * IMK_VIS_MAX_VALUEkb;
}
function ColorBar_IMKB(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function makeLegend_IMKB() {
  var labelPanel = ui.Panel(
      [
        ui.Label(Math.round(undoColorStretch_IMKB(0)), {margin: '4px 8px'}),
        ui.Label(
            Math.round(undoColorStretch_IMKB(0.5)),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(Math.round(undoColorStretch_IMKB(1)), {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar_IMKB(CC_STYLE_IMKB.palette), labelPanel]);
}
// Styling for the legend title.
var LEGEND_TITLE_STYLE_IMKB = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE_IMKB = {
  fontSize: '10.5px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
var IMKBLegend = ui.Panel([
      ui.Label('Depth (in meters)', LEGEND_TITLE_STYLE_IMKB), makeLegend_IMKB(),
      ui.Label(
          'Flood depth (m) per cell (30x30m)', LEGEND_FOOTNOTE_STYLE_IMKB),
      ui.Label(
          '(Source: Deltares (2022). Mangroves as a Protection from Erosion and Coastal Flooding in Selected West African Coastal Countries – Detailed modelling report. World Bank Project.)', LEGEND_FOOTNOTE_STYLE_IMKB),
    ],
    ui.Panel.Layout.flow('vertical'),{width: '400px', position: 'bottom-left'});
//█░█ ░   █▀▄▀█ ▄▀█ █▀█   █▀█ ▄▀█ █▄░█ █▀▀ █░░   ▄▀█ █▄░█ █▀▄   ▀█▀ █▀▀ ▀▄▀ ▀█▀   █▀ █▀▀ ▀█▀ ▀█▀ █ █▄░█ █▀▀ █▀
//▀▄▀ ▄   █░▀░█ █▀█ █▀▀   █▀▀ █▀█ █░▀█ ██▄ █▄▄   █▀█ █░▀█ █▄▀   ░█░ ██▄ █░█ ░█░   ▄█ ██▄ ░█░ ░█░ █ █░▀█ █▄█ ▄█
// TEXT SETTINGS
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: 'bold',
  fontSize: '30px',
  padding: '6px',
  color: '1F4690',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '10',
  color: '#444444',
  padding: '10px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLEII = {
  fontSize: '14px',
  fontWeight: '10',
  color: '#9E9E9E',
  padding: '10px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLEIII = {
  fontSize: '11px',
  fontWeight: '10',
  color: '#9E9E9E',
  padding: '10px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
// FOR SETTING THE MAP PANEL TO GRAY
var GRAYMAP = [{
    stylers: [ { saturation: -100 } ],},
    { // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];
// SETTING UP THE MAP PANEL
var mapPanel = ui.Map(); 
mapPanel.setControlVisibility(false);
mapPanel.centerObject(coastalPrefectures, 9);
mapPanel.setOptions('Gray Map', {'Gray Map': GRAYMAP}).setControlVisibility(false, false, false, false, false, false);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// SETTING UP THE TOOL PANEL
var toolPanel = ui.Panel({style: {width: '440px', stretch: 'both'}});
ui.root.insert(0, toolPanel);
var logo = ee.Image('users/nmthomas28/logo_celio').visualize({ //users/nmthomas28/RegionsGuinea_reproj
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var regionsFigure = ee.Image('users/nmthomas28/RegionsGuinea_reproj').visualize({ //
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    }); 
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1306x440',
        format: 'png'
        },
    //style: {height: '77px', width: '410px',padding :'0'}
    });
var regionthumb = ui.Thumbnail({
    image: regionsFigure,
    params: {
        dimensions: '1596x1181',
        format: 'png'
        },
    //style: {height: '77px', width: '410px',padding :'0'}
    });
toolPanel.add(thumb);
//█░█ █ ░   ▀█▀ █▀▀ ▀▄▀ ▀█▀ █░█ ▄▀█ █░░   █▀▄ █▀▀ █▀ █▀▀ █▀█ █ █▀█ ▀█▀ █ █▀█ █▄░█ █▀ 
//▀▄▀ █ ▄   ░█░ ██▄ █░█ ░█░ █▄█ █▀█ █▄▄   █▄▀ ██▄ ▄█ █▄▄ █▀▄ █ █▀▀ ░█░ █ █▄█ █░▀█ ▄█ 
// Add the APP Title
var titleLabel = ui.Label('Guinea Dataset Explorer v.2', TITLE_STYLE);
//toolPanel.add(titleLabel);
// Add App Description
var descriptionAppText = 
'This web application is a demonstration site which can be used to explore land-cover and ecosystems-related datasets for Guinea. Some of these products were available through public domain, published in peer-reviewed articles as well as developed by NASA through a one year partnership signed with the World Bank. In this app, you can view these land cover maps, ecosystem extent and forest-cover related layers at regional and national scales by selecting them from the menu below.';
var descriptionAppLabel = ui.Label(descriptionAppText, PARAGRAPH_STYLE);
toolPanel.add(descriptionAppLabel);
var descriptionPanel = ui.Panel();
// Separator
var separator = ui.Panel([
  ui.Label({
    value:'◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈',
    style: {fontSize: '15px', fontWeight: 'bold', color: '36ad47'} //, backgroundColor: 'F9F9F9'
  })]);
var separator2 = ui.Panel([
  ui.Label({
    value:'◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈',
    style: {fontSize: '15px', fontWeight: 'bold', color: '36ad47',}
  })]);
var separator3 = ui.Panel([
  ui.Label({
    value:'◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈-◈',
    style: {fontSize: '15px', fontWeight: 'bold', color: '36ad47',}
  })]);
toolPanel.add(separator3);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// R E G I O N S
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var SELECTREGION = 'Coastal Zone - All Prefectures';
var textSELECTREGION = 'Coastal Zone';
var descriptionLabelSELECTREGION = ui.Label(textSELECTREGION, PARAGRAPH_STYLEII);
var BOFFA = 'Boffa';
var BOKE = 'Boké';
var CONAKRY = 'Conakry';
var COYAH = 'Coyah';
var DUBREKA = 'Dubréka';
var FORECARIAH = 'Forécariah';
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LAYERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Inundation Maps Layers
var introInundation = ui.Panel([
  ui.Label({
    value:'1 - Inundation Maps (Deltares, 2022)',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
var textINUNDATION = 'The inundation maps for the Kaback and Kanfarande regions in Guinea. These layers were created using numerical model output from a Delft3D Flexible Mesh model. The maps show inundation depth in meters for each region. A total of 26 inundation maps is available for both geographical ranges covering three storm return periods (RP 10, 50, 100 years), two sea-level rise scenarios (RCP2.6, RCP8.5 - the RCP2. 6 scenario projects a sea-level rise of between 26 and 60 centimeters, while under the RCP8. 5 scenario sea levels would rise by almost 100 centimeters), with mangroves, without mangroves and with restored mangroves. For two percentiles, 50%-ile (median storm conditions), 95%-ile (high storm conditions).';
var descriptionINUNDATION = ui.Label(textINUNDATION, PARAGRAPH_STYLEII);
var KabackLabel = ui.Label({
  value: 'Kaback', 
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '10px'}
});
var KafarandeLabel = ui.Label({
  value: 'Kafarande', 
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '10px'}
});
var textKABACK = 'The sub-prefecture Kaback is located 60 km south of the capital Conakry in the prefecture Forécariah. Kaback is surrounded by the river Morébaya and the river Forécariah. The Matakong Island is the most advanced rocky outcrop in the south of Kaback. The sub-prefecture consists of flat marshy terrain. The edges house mangroves (mainly Avicennia), and the area has two distinctive higher sandy ridges, so-called “cordonnes”, that run coast parallel. Intertidal areas have been reclaimed and converted to agricultural land (predominantly rice fields) from the 1950s onwards. Levees protected these reclaimed lands against coastal flooding. However, Kaback has experienced levee breaches resulting in flooding and salinization for decades. At present, the western seafront of Kaback is frequently flooded and is unfit for agricultural purposes.';
var descriptionKABACK = ui.Label(textKABACK, PARAGRAPH_STYLEIII);
var textKAFARANDE = 'Kanfarandé is a sub-prefecture located within northern coastal Guinea. It is home to the Tristao Islands, one of the designated Ramsar Sites in the world. Within Guinea, the area is situated at the mouths of the Rio Nunez, Rio Baraban and Rio Komponi. The combination of generally low population densities and low accessibility allows mangroves to remain relatively untouched by locals in this area, as the environmental conditions allow for agriculture activities such as rice farming and fishing to thrive instead.';
var descriptionKAFARANDE = ui.Label(textKAFARANDE, PARAGRAPH_STYLEIII);
// Mangrove Extent Layers
var intromangroves = ui.Panel([
  ui.Label({
    value:'2.1 - Mangrove extent maps',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
var textMANGROVES = 'A historical analysis of spatial distribution of mangroves in Guinea for the years of 2000, 2005, 2010, 2015 and 2020. Select the region below for prefecture-specific extent information.';
var descriptionMANGROVES = ui.Label(textMANGROVES, PARAGRAPH_STYLEII);
var intromangrovesChange = ui.Panel([
  ui.Label({
    value:'2.2 - Mangrove extent change',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
var textMANGROVESCHANGE = 'The spatial distribution of the changes in mangrove extent in Guinea for the 2000-2020 period. Select the layer to display in the map:';
var descriptionMANGROVECHANGE = ui.Label(textMANGROVESCHANGE, PARAGRAPH_STYLEII);
var textMANGROVESCHANGE2 = 'Change statistics by coastal prefecture will be loaded in the map by clicking the button below:';
var descriptionMANGROVECHANGE2 = ui.Label(textMANGROVESCHANGE2, PARAGRAPH_STYLEII);
// External Datasets
var introLayers = ui.Panel([
  ui.Label({
    value:'3 - Other land cover extent maps',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
var textLAYERS = 'A database comprised by earth observation-derived land-cover land-use extent and change data in Guinea, including publicly available datasets and the layers produced during the previous contract between NASA and the World Bank. Select a layer from the drop-down list below to display: ';
var descriptionLayers = ui.Label(textLAYERS, PARAGRAPH_STYLEII);
var textREGIONS = 'The extent of each land cover class will be displayed for the regions below (it may take a few minutes for charts to load):';
var descriptionregions = ui.Label(textREGIONS, PARAGRAPH_STYLEII);
// Individual Layers
var SELECT = '-------- No layer --------';
var textSELECT = ' ';
var descriptionLabelSELECT = ui.Label(textSELECT, PARAGRAPH_STYLEII);
// 6.A) Copernicus Global Land Service Africa Land Cover Maps (100m resolution)
var COPERNICUS = 'Copernicus Global Land Service (CGLS)';
var textCOPERNICUS = 'The 100 m resolution (CGLS-LC100) is a new product in the portfolio of the CGLS and delivers a global land cover map at 100 m spatial resolution. Here, we present the CGLS-LC100 Collection 3 product for the year 2019 for Guinea. Read more: https://land.copernicus.eu/global/products/lc';
var descriptionLabelCOPERNICUS = ui.Label(textCOPERNICUS, PARAGRAPH_STYLEII);
// 6.B) GlobCover 2009 - (300m)
var GLOBCOVER = 'GlobCover: Global Land Cover Map';
var textGLOBCOVER = 'GlobCover 2009 is a global land cover map based on ENVISAT`s Medium Resolution Imaging Spectrometer (MERIS) Level 1B data acquired in full resolution mode with a spatial resolution of approximately 300 meters. Source: http://due.esrin.esa.int/page_globcover.php';
var descriptionLabelGLOBCOVER = ui.Label(textGLOBCOVER, PARAGRAPH_STYLEII);
// 6.C) West Africa Land Use Land Cover 2013 - 2km
var WAATLAS = 'West Africa Land Use Land Cover';
var textWAATLAS = 'West Africa Land Use Dynamics Project produced a series of three-period land use land cover (LULC) datasets (1975, 2000, and 2013) at 2km resolution to assist in monitoring change in West Africa’s land resources. Here we present the 2013 LULC for Guinea. Data source: https://eros.usgs.gov/westafrica/land-cover/land-use-and-land-cover-trends-west-africa';
var descriptionLabelWAATLAS = ui.Label(textWAATLAS, PARAGRAPH_STYLEII);
// 6.D) West Africa Land Use Land Cover 2013 Stephen van Gordon 
var WAATLAS30 = 'West Africa Land Use Land Cover 30m';
var textWAATLAS30 = 'Stephen van Gordon et al. developed a method for producing high resolution land cover maps of West Africa. The spatial (30 meters) and temporal resolution (2016) of this new dataset represents a significant improvement over the previously West Africa Land Use Dynamics’s LULC product.';
var descriptionLabelWAATLAS30 = ui.Label(textWAATLAS30, PARAGRAPH_STYLEII);
// 6.E) ESA CCI 2016 20m
var ESA = 'ESA CCI Land Cover';
var textESA = 'The European Space Agency’s Climate Change Initiative Team has produced a high resolution Sentinel-2 based land cover map at 20m over Africa based on 1 year of Sentinel-2A observations from December 2015 to December 2016. Here, we present the S2 prototype LC map at 20m of Guinea. Source: https://2016africalandcover20m.esrin.esa.int/';
var descriptionLabelESA = ui.Label(textESA, PARAGRAPH_STYLEII);
// 6.F) Midekisa 2015 - 500 m
var MIDEKISA = 'Midekisa et al. (2015) Land Cover';
var textMIDEKISA = 'Midekisa et al. (2015) mapped land cover change over continental Africa using Landsat and Google Earth Engine cloud computing. Here we present their product over Guinea at 500m resolution for the year 2015. Source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0184926';
var descriptionLabelMIDEKISA = ui.Label(textMIDEKISA, PARAGRAPH_STYLEII);
// 6.G) A New Map of Standardized Terrestrial Ecosystems of Africa 2013 100m
var ECOSYSTEMS = 'Standardized Terrestrial Ecosystems';
var textECOSYSTEMS = 'The Terrestrial ecosystems and vegetation of Africa were classified and mapped at 100m resolution for the year 2013 as part of a larger effort and global protocol (GEOSS – the Global Earth Observation System of Systems). To model the potential distribution of ecosystems, new continental datasets for several key physical environment data layers (including coastline, landforms, surficial lithology, and bioclimatic – some of which are included in this web application) were developed at spatial and classification resolutions finer than existing similar data layers. Source: https://pubs.er.usgs.gov/publication/70045097 | https://rmgsc.cr.usgs.gov/outgoing/ecosystems/AfricaData/';
var descriptionLabelECOSYSTEMS = ui.Label(textECOSYSTEMS, PARAGRAPH_STYLEII);
// 6.H) Land Surface Form 90m
var LAND = 'Land Surface Form';
var textLAND = 'To model the potential distribution of ecosystems, new continental datasets for several key physical environment data layers were developed. Here, we present the landform for Guinea at 90m resolution derived from the 90 m NASA/NGA shuttle radar topographic mission (SRTM) digital elevation model as source data for the characterization of regional phys-iography in seven landform classes. Source: https://pubs.er.usgs.gov/publication/70045097 | https://rmgsc.cr.usgs.gov/outgoing/ecosystems/AfricaData/';
var descriptionLabelLAND = ui.Label(textLAND, PARAGRAPH_STYLEII);
// 6.I) Lithology 90m
var LITHOLOGY = 'Lithology';
var textLITHOLOGY = 'To model the potential distribution of ecosystems, new continental datasets for several key physical environment data layers were developed. Here, we present the lithology for Guinea at 90m resolution derived from existing characterizations of geology and rock type at continental, regional, and national scales. The African surficial lithology map is a compilation and reclassification of twelve geology, soil and lithology databases. Source: https://pubs.er.usgs.gov/publication/70045097 | https://rmgsc.cr.usgs.gov/outgoing/ecosystems/AfricaData/';
var descriptionLabelLITHOLOGY = ui.Label(textLITHOLOGY, PARAGRAPH_STYLEII);
// 6.J) Global Forest Cover Change (GFCC)
var GFCC = 'Global Forest Cover Change (GFCC)';
var textGFCC = 'The Global Forest Cover Change (GFCC)’s Landsat Vegetation Continuous Fields (VCF) tree cover layer contains estimates of the percentage of horizontal ground in each 30-m pixel covered by woody vegetation greater than 5 meters in height for the year 2015. Source: https://lpdaac.usgs.gov/products/gfcc30tcv003/';
var descriptionLabelGFCC = ui.Label(textGFCC, PARAGRAPH_STYLEII);
// 6.K) Global Forest Cover Hansen 
var HANSEN = 'Global Forest Change v1.9';
var textHANSEN = 'Hansen`s high-resolution global maps of 21st-Century forest cover change dataset include a Tree canopy cover for year 2000, defined as canopy closure for all vegetation taller than 5m in height. Source: https://www.science.org/doi/10.1126/science.1244693 | https://glad.earthengine.app/view/global-forest-change#dl=1;old=off;bl=off;lon=20;lat=10;zoom=3';
var descriptionLabelHANSEN = ui.Label(textHANSEN, PARAGRAPH_STYLEII);
// 6.L) Tree Height GEDI 
var TREEHEIGHT = 'GEDI-based Forest Canopy Height';
var textTREEHEIGHT = 'A medium resolution (30 m per pixel) map of forest canopy height for the year 2019 based on the integration of GEDI-derived canopy height metrics with Landsat multitemporal surface reflectance data. Source: https://doi.org/10.1016/j.rse.2020.112165';
var descriptionLabelTREEHEIGHT = ui.Label(textTREEHEIGHT, PARAGRAPH_STYLEII);
// 6.M) Population Count 2016 
var POPULATION = 'Population Count';
var textPOPULATION = 'This dataset was produced by The Global Human Settlement Layer (GHSL) project and depicts the distribution and density of population, expressed as the number of people per cell for the epoch of 2015. For more information visit: https://ghsl.jrc.ec.europa.eu/ghs_pop.php.';
var descriptionLabelPOPULATION = ui.Label(textPOPULATION, PARAGRAPH_STYLEII);
// 6.N) Mangrove Extent Layers
// 6.O) Land Cover Map 2014 - De Sousa 2021
var LCMGUINEA2014 = 'Land cover extent 2014';
var textLCMGUINEA2014 = 'The 2014 Guinea land cover map consisting of 13 classes was generated based on a semi-automated methodology and the random forest classification model within GEE described in detaile here: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0227438';
var descriptionLabelLCMGUINEA2014 = ui.Label(textLCMGUINEA2014, PARAGRAPH_STYLEII);
// 6.P) Forest/ Non-Forest Map
var FORESTSNONFORESTS = 'Forest extent 2014';
var textFORESTSNONFORESTS = 'This map was derived from the land cover extent map in which characterization of the different forest classes (i.e. treed savanna, woodlands, secondary dense forests and mature dense forests) was based on different levels of canopy closure and tree height in 2014 and followed Guinea’s adopted forest definition of 10% canopy cover and at least 5 meters of height.';
var descriptionLabelFORESTSNONFORESTS = ui.Label(textFORESTSNONFORESTS, PARAGRAPH_STYLEII);
// 6.Q) Yearly Forest Losses
var FORESTLOSS = 'Yearly Forest Losses 2014-2020';
var textFORESTLOSS = 'The yearly forest extent losses for subsequent years were computed based on the 2014 forest/non-forest map. Each color represents *new areas* of forest loss that was detected since the previous year';
var descriptionLabelFORESTLOSS = ui.Label(textFORESTLOSS, PARAGRAPH_STYLEII);
// 6.R) 1996 - 2020 Coastal Land Cover
// 6.S) INUNDATIONMAPS
var SELECTMAP = 'Select Inundation Map';
var KANFARANDE_RP100_NOVEG_P50 = 'RP100 | No Mangrove | P50';
var KANFARANDE_RP100_NOVEG_P95 = 'RP100 | No Mangrove | P95';
var KANFARANDE_RP100_VEG_P50 = 'RP100 | Mangrove | P50';
var KANFARANDE_RP100_VEG_P95 = 'RP100 | Mangrove | P95';
var KANFARANDE_RP10_NOVEG_P50 = 'RP10 | No Mangrove | P50';
var KANFARANDE_RP10_NOVEG_P95 = 'RP10 | No Mangrove | P95';
var KANFARANDE_RP10_VEG_P50 = 'RP10 | Mangrove | P50';
var KANFARANDE_RP10_VEG_P95 = 'RP10 | Mangrove | P95';
var KANFARANDE_RP50_NOVEG_P50 = 'RP50 | No Mangrove | P50';
var KANFARANDE_RP50_NOVEG_P95 = 'RP50 | No Mangrove | P95';
var KANFARANDE_RP50_NOVEG_RCP26_P50 = 'RP50 | No Mangrove | RCP26_P50';
var KANFARANDE_RP50_NOVEG_RCP26_P95 = 'RP50 | No Mangrove | RCP26_P95';
var KANFARANDE_RP50_NOVEG_RCP85_P50 = 'RP50 | No Mangrove | RCP85_P50';
var KANFARANDE_RP50_NOVEG_RCP85_P95 = 'RP50 | No Mangrove | RCP85_P95';
var KANFARANDE_RP50_VEG_P50 = 'RP50 | Mangrove | P50';
var KANFARANDE_RP50_VEG_P95 = 'RP50 | Mangrove | P95';
var KANFARANDE_RP50_VEG_RCP26_P50  = 'RP50 | Mangrove | RCP26_P50';
var KANFARANDE_RP50_VEG_RCP26_P95 = 'RP50 | Mangrove | RCP26_P95';
var KANFARANDE_RP50_VEG_RCP85_P50  = 'RP50 | Mangrove | RCP85_P50';
var KANFARANDE_RP50_VEG_RCP85_P95 = 'RP50 | Mangrove | RCP85_P95';
var KANFARANDE_RP50_VEG_RESTORED_P50 = 'RP50 | Restored Mangrove | P50'; 
var KANFARANDE_RP50_VEG_RESTORED_P95 = 'RP50 | Restored Mangrove | P95';
var KANFARANDE_RP50_VEG_RESTORED_RCP26_P50 = 'RP50 | Restored Mangrove | RCP26 | P50';
var KANFARANDE_RP50_VEG_RESTORED_RCP26_P95 = 'RP50 | Restored Mangrove | RCP26 | P95';
var KANFARANDE_RP50_VEG_RESTORED_RCP85_P50 = 'RP50 | Restored Mangrove | RCP85 | P50';
var KANFARANDE_RP50_VEG_RESTORED_RCP85_P95 = 'RP50 | Restored Mangrove | RCP85 | P95';
var KABACK_RP100_NOVEG_P50 = 'RP100 | No Mangrove | P50';
var KABACK_RP100_NOVEG_P95 = 'RP100 | No Mangrove | P95';
var KABACK_RP100_VEG_P50 = 'RP100 | Mangrove | P50';
var KABACK_RP100_VEG_P95 = 'RP100 | Mangrove | P95';
var KABACK_RP10_NOVEG_P50 = 'RP10 | No Mangrove | P50';
var KABACK_RP10_NOVEG_P95 = 'RP10 | No Mangrove | P95';
var KABACK_RP10_VEG_P50 = 'RP10 | Mangrove | P50';
var KABACK_RP10_VEG_P95 = 'RP10 | Mangrove | P95';
var KABACK_RP50_NOVEG_P50 = 'RP50 | No Mangrove | P50';
var KABACK_RP50_NOVEG_P95 = 'RP50 | No Mangrove | P95';
var KABACK_RP50_NOVEG_RCP26_P50 = 'RP50 | No Mangrove | RCP26_P50';
var KABACK_RP50_NOVEG_RCP26_P95 = 'RP50 | No Mangrove | RCP26_P95';
var KABACK_RP50_NOVEG_RCP85_P50 = 'RP50 | No Mangrove | RCP85_P50';
var KABACK_RP50_NOVEG_RCP85_P95 = 'RP50 | No Mangrove | RCP85_P95';
var KABACK_RP50_VEG_P50 = 'RP50 | Mangrove | P50';
var KABACK_RP50_VEG_P95 = 'RP50 | Mangrove | P95';
var KABACK_RP50_VEG_RCP26_P50  = 'RP50 | Mangrove | RCP26_P50';
var KABACK_RP50_VEG_RCP26_P95 = 'RP50 | Mangrove | RCP26_P95';
var KABACK_RP50_VEG_RCP85_P50  = 'RP50 | Mangrove | RCP85_P50';
var KABACK_RP50_VEG_RCP85_P95 = 'RP50 | Mangrove | RCP85_P95';
var KABACK_RP50_VEG_RESTORED_P50 = 'RP50 | Restored Mangrove | P50'; 
var KABACK_RP50_VEG_RESTORED_P95 = 'RP50 | Restored Mangrove | P95';
var KABACK_RP50_VEG_RESTORED_RCP26_P50 = 'RP50 | Restored Mangrove | RCP26 | P50';
var KABACK_RP50_VEG_RESTORED_RCP26_P95 = 'RP50 | Restored Mangrove | RCP26 | P95';
var KABACK_RP50_VEG_RESTORED_RCP85_P50 = 'RP50 | Restored Mangrove | RCP85 | P50';
var KABACK_RP50_VEG_RESTORED_RCP85_P95 = 'RP50 | Restored Mangrove | RCP85 | P95';
// PANELS HAS TO BE DEFINED BEFORE EVERYTHING ELSE
//Panel for charts
var chartPanel1 = ui.Panel({style: {width: '440px'}});
var chartPanelRegion = ui.Panel({style: {width: '425px'}});
//Panel for gifs
var gifPanel = ui.Panel({style: {width: '440px'}});
// The Button to remove Graphs
var buttonRemoveGraph = ui.Button({
  label: 'Clear Result',
  onClick: function() {
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
  }
});
var ChangeResultsPanel = ui.Panel({style: {position: 'bottom-left'}});
//█░█ █ █ ░   █ █▄░█ █░█ █▄░█ █▀▄ ▄▀█ ▀█▀ █ █▀█ █▄░█   █▀▄▀█ ▄▀█ █▀█ █▀
//▀▄▀ █ █ ▄   █ █░▀█ █▄█ █░▀█ █▄▀ █▀█ ░█░ █ █▄█ █░▀█   █░▀░█ █▀█ █▀▀ ▄█
toolPanel.add(introInundation);
toolPanel.add(descriptionINUNDATION);
toolPanel.add(KabackLabel);
var constraintS = [];
var selectorIMKB = ui.Select({
  items: [SELECTMAP, KABACK_RP10_NOVEG_P50 ,KABACK_RP10_NOVEG_P95 ,KABACK_RP10_VEG_P50 ,
KABACK_RP10_VEG_P95 ,KABACK_RP50_NOVEG_P50 ,KABACK_RP50_NOVEG_P95 ,KABACK_RP50_NOVEG_RCP26_P50 ,KABACK_RP50_NOVEG_RCP26_P95 ,
KABACK_RP50_NOVEG_RCP85_P50 ,KABACK_RP50_NOVEG_RCP85_P95 ,KABACK_RP50_VEG_P50 ,KABACK_RP50_VEG_P95 ,KABACK_RP50_VEG_RCP26_P50  ,KABACK_RP50_VEG_RCP26_P95 ,KABACK_RP50_VEG_RCP85_P50  ,KABACK_RP50_VEG_RCP85_P95 ,
KABACK_RP50_VEG_RESTORED_P50 ,KABACK_RP50_VEG_RESTORED_P95 ,KABACK_RP50_VEG_RESTORED_RCP26_P50 ,KABACK_RP50_VEG_RESTORED_RCP26_P95 ,KABACK_RP50_VEG_RESTORED_RCP85_P50, KABACK_RP50_VEG_RESTORED_RCP85_P95, KABACK_RP100_NOVEG_P50, KABACK_RP100_NOVEG_P95 , KABACK_RP100_VEG_P50 ,KABACK_RP100_VEG_P95  ],
  value: SELECTMAP,
  onChange: IMKBSelectionFunction,
  style: {padding: '0px 0px 0px 10px'}
});
function IMKBSelectionFunction() {
  mapPanel.layers().reset();
  var layer = selectorIMKB.getValue();
  var imagem;
  if (layer == SELECTMAP) {
    mapPanel.centerObject(coastalPrefectures,9);
    imagem = ee.Image(0).selfMask();
    legendPanelIM2.clear();
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP10_NOVEG_P50) {
    mapPanel.centerObject(kaback_RP10_noveg_p50);
    imagem = colorStretch_IMKB(kaback_RP10_noveg_p50).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP10_NOVEG_P95  ) {
    mapPanel.centerObject(kaback_RP10_noveg_p95 );
    imagem = colorStretch_IMKB(kaback_RP10_noveg_p95).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP10_VEG_P50   ) {
    mapPanel.centerObject(kaback_RP10_veg_p50  );
    imagem = colorStretch_IMKB(kaback_RP10_veg_p50).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP10_VEG_P95    ) {
    mapPanel.centerObject(kaback_RP10_veg_p95   );
    imagem = colorStretch_IMKB(kaback_RP10_veg_p95).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_NOVEG_P50     ) {
    mapPanel.centerObject(kaback_RP50_noveg_p50 );
    imagem = colorStretch_IMKB(kaback_RP50_noveg_p50).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_NOVEG_P95) {
    mapPanel.centerObject(kaback_RP50_noveg_p95  );
    imagem = colorStretch_IMKB(kaback_RP50_noveg_p95 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_NOVEG_RCP26_P50 ) {
    mapPanel.centerObject(kaback_RP50_noveg_rcp26_p50   );
    imagem = colorStretch_IMKB(kaback_RP50_noveg_rcp26_p50 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_NOVEG_RCP26_P95) {
    mapPanel.centerObject(kaback_RP50_noveg_rcp26_p95);
    imagem = colorStretch_IMKB(kaback_RP50_noveg_rcp26_p95 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_NOVEG_RCP85_P50 ) {
    mapPanel.centerObject(kaback_RP50_noveg_rcp85_p50 );
    imagem = colorStretch_IMKB(kaback_RP50_noveg_rcp85_p50  ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_NOVEG_RCP85_P95) {
    mapPanel.centerObject(kaback_RP50_noveg_rcp85_p95);
    imagem = colorStretch_IMKB(kaback_RP50_noveg_rcp85_p95).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_P50 ) {
    mapPanel.centerObject(kaback_RP50_veg_p50 );
    imagem = colorStretch_IMKB(kaback_RP50_veg_p50 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_P95  ) {
    mapPanel.centerObject(kaback_RP50_veg_p95  );
    imagem = colorStretch_IMKB(kaback_RP50_veg_p95  ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RCP26_P50    ) {
    mapPanel.centerObject(kaback_RP50_veg_rcp26_p50   );
    imagem = colorStretch_IMKB(kaback_RP50_veg_rcp26_p50   ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RCP26_P95) {
    mapPanel.centerObject(kaback_RP50_veg_rcp26_p95);
    imagem = colorStretch_IMKB(kaback_RP50_veg_rcp26_p95).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RCP85_P50) {
    mapPanel.centerObject(kaback_RP50_veg_rcp85_p50);
    imagem = colorStretch_IMKB(kaback_RP50_veg_rcp85_p50).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RCP85_P95 ) {
    mapPanel.centerObject    (kaback_RP50_veg_rcp85_p95 );
    imagem = colorStretch_IMKB(kaback_RP50_veg_rcp85_p95 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RESTORED_P50  ) {
    mapPanel.centerObject    (kaback_RP50_veg_restored_p50  );
    imagem = colorStretch_IMKB(kaback_RP50_veg_restored_p50  ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RESTORED_P95  ) {
    mapPanel.centerObject    (kaback_RP50_veg_restored_p95   );
    imagem = colorStretch_IMKB(kaback_RP50_veg_restored_p95   ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RESTORED_RCP26_P50   ) {
    mapPanel.centerObject    (kaback_RP50_veg_restored_rcp26_p50    );
    imagem = colorStretch_IMKB(kaback_RP50_veg_restored_rcp26_p50    ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RESTORED_RCP26_P95) {
    mapPanel.centerObject    (kaback_RP50_veg_restored_rcp26_p95);
    imagem = colorStretch_IMKB(kaback_RP50_veg_restored_rcp26_p95).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RESTORED_RCP85_P50 ) {
    mapPanel.centerObject    (kaback_RP50_veg_restored_rcp85_p50 );
    imagem = colorStretch_IMKB(kaback_RP50_veg_restored_rcp85_p50 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP50_VEG_RESTORED_RCP85_P95  ) {
    mapPanel.centerObject    (kaback_RP50_veg_restored_rcp85_p95  );
    imagem = colorStretch_IMKB(kaback_RP50_veg_restored_rcp85_p95  ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP100_NOVEG_P95) {
    mapPanel.centerObject    (kaback_RP100_noveg_p50 );
    imagem = colorStretch_IMKB(kaback_RP100_noveg_p50).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP100_VEG_P50 ) {
    mapPanel.centerObject    (kaback_RP100_noveg_p95  );
    imagem = colorStretch_IMKB(kaback_RP100_noveg_p95 ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP100_VEG_P50  ) {
    mapPanel.centerObject    (kaback_RP100_veg_p50   );
    imagem = colorStretch_IMKB(kaback_RP100_veg_p50  ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KABACK_RP100_VEG_P95   ) {
    mapPanel.centerObject    (kaback_RP100_veg_p95    );
    imagem = colorStretch_IMKB(kaback_RP100_veg_p95   ).visualize(CC_STYLE_IMKB);
    legendPanelIM2.clear();
    legendPanelIM2.add(IMKBLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  }
  for (var i = 0; i < constraintS.length; ++i) {
    var constraint = constraintS[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = imagem.updateMask(constraint.image.gt(value));
    } else {
      image = imagem.updateMask(constraint.image.lt(value));
    }
  }
  mapPanel.addLayer(imagem);
  mapPanel.add(mang2000);
  mapPanel.add(mang2005);
  mapPanel.add(mang2010);
  mapPanel.add(mang2015);
  mapPanel.add(mang2020);
  mapPanel.add(losses);
  mapPanel.add(gains);
}
toolPanel.add(selectorIMKB);
toolPanel.add(descriptionKABACK);
toolPanel.add(legendPanelIM2);
toolPanel.add(KafarandeLabel);
var constraints = [];
var selectorIMK = ui.Select({
  items: [SELECTMAP, KANFARANDE_RP10_NOVEG_P50 ,KANFARANDE_RP10_NOVEG_P95 ,KANFARANDE_RP10_VEG_P50 ,
KANFARANDE_RP10_VEG_P95 ,KANFARANDE_RP50_NOVEG_P50 ,KANFARANDE_RP50_NOVEG_P95 ,KANFARANDE_RP50_NOVEG_RCP26_P50 ,KANFARANDE_RP50_NOVEG_RCP26_P95 ,
KANFARANDE_RP50_NOVEG_RCP85_P50 ,KANFARANDE_RP50_NOVEG_RCP85_P95 ,KANFARANDE_RP50_VEG_P50 ,KANFARANDE_RP50_VEG_P95 ,KANFARANDE_RP50_VEG_RCP26_P50  ,KANFARANDE_RP50_VEG_RCP26_P95 ,KANFARANDE_RP50_VEG_RCP85_P50  ,KANFARANDE_RP50_VEG_RCP85_P95 ,
KANFARANDE_RP50_VEG_RESTORED_P50 ,KANFARANDE_RP50_VEG_RESTORED_P95 ,KANFARANDE_RP50_VEG_RESTORED_RCP26_P50 ,KANFARANDE_RP50_VEG_RESTORED_RCP26_P95 ,KANFARANDE_RP50_VEG_RESTORED_RCP85_P50, KANFARANDE_RP50_VEG_RESTORED_RCP85_P95, KANFARANDE_RP100_NOVEG_P50, KANFARANDE_RP100_NOVEG_P95 , KANFARANDE_RP100_VEG_P50 ,KANFARANDE_RP100_VEG_P95  ],
  value: SELECTMAP,
  onChange: IMKSelectionFunction,
  style: {padding: '0px 0px 0px 10px'}
});
function IMKSelectionFunction() {
  mapPanel.layers().reset();
  var layer = selectorIMK.getValue();
  var imagem;
  if (layer == SELECTMAP) {
    mapPanel.centerObject(coastalPrefectures,9);
    imagem = ee.Image(0).selfMask();
    legendPanelIM.clear();
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP10_NOVEG_P50) {
    mapPanel.centerObject(kanfarande_RP10_noveg_p50);
    imagem = colorStretch_IMK(kanfarande_RP10_noveg_p50).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP10_NOVEG_P95  ) {
    mapPanel.centerObject(kanfarande_RP10_noveg_p95 );
    imagem = colorStretch_IMK(kanfarande_RP10_noveg_p95).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP10_VEG_P50   ) {
    mapPanel.centerObject(kanfarande_RP10_veg_p50  );
    imagem = colorStretch_IMK(kanfarande_RP10_veg_p50).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP10_VEG_P95    ) {
    mapPanel.centerObject(kanfarande_RP10_veg_p95   );
    imagem = colorStretch_IMK(kanfarande_RP10_veg_p95).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_NOVEG_P50     ) {
    mapPanel.centerObject(kanfarande_RP50_noveg_p50 );
    imagem = colorStretch_IMK(kanfarande_RP50_noveg_p50).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_NOVEG_P95) {
    mapPanel.centerObject(kanfarande_RP50_noveg_p95  );
    imagem = colorStretch_IMK(kanfarande_RP50_noveg_p95 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_NOVEG_RCP26_P50 ) {
    mapPanel.centerObject(kanfarande_RP50_noveg_rcp26_p50   );
    imagem = colorStretch_IMK(kanfarande_RP50_noveg_rcp26_p50 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_NOVEG_RCP26_P95) {
    mapPanel.centerObject(kanfarande_RP50_noveg_rcp26_p95);
    imagem = colorStretch_IMK(kanfarande_RP50_noveg_rcp26_p95 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_NOVEG_RCP85_P50 ) {
    mapPanel.centerObject(kanfarande_RP50_noveg_rcp85_p50 );
    imagem = colorStretch_IMK(kanfarande_RP50_noveg_rcp85_p50  ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_NOVEG_RCP85_P95) {
    mapPanel.centerObject(kanfarande_RP50_noveg_rcp85_p95);
    imagem = colorStretch_IMK(kanfarande_RP50_noveg_rcp85_p95).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_P50 ) {
    mapPanel.centerObject(kanfarande_RP50_veg_p50 );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_p50 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_P95  ) {
    mapPanel.centerObject(kanfarande_RP50_veg_p95  );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_p95  ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RCP26_P50    ) {
    mapPanel.centerObject(kanfarande_RP50_veg_rcp26_p50   );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_rcp26_p50   ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RCP26_P95) {
    mapPanel.centerObject(kanfarande_RP50_veg_rcp26_p95);
    imagem = colorStretch_IMK(kanfarande_RP50_veg_rcp26_p95).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RCP85_P50) {
    mapPanel.centerObject(kanfarande_RP50_veg_rcp85_p50);
    imagem = colorStretch_IMK(kanfarande_RP50_veg_rcp85_p50).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RCP85_P95 ) {
    mapPanel.centerObject    (kanfarande_RP50_veg_rcp85_p95 );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_rcp85_p95 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RESTORED_P50  ) {
    mapPanel.centerObject    (kanfarande_RP50_veg_restored_p50  );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_restored_p50  ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RESTORED_P95  ) {
    mapPanel.centerObject    (kanfarande_RP50_veg_restored_p95   );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_restored_p95   ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RESTORED_RCP26_P50   ) {
    mapPanel.centerObject    (kanfarande_RP50_veg_restored_rcp26_p50    );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_restored_rcp26_p50    ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RESTORED_RCP26_P95) {
    mapPanel.centerObject    (kanfarande_RP50_veg_restored_rcp26_p95);
    imagem = colorStretch_IMK(kanfarande_RP50_veg_restored_rcp26_p95).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RESTORED_RCP85_P50 ) {
    mapPanel.centerObject    (kanfarande_RP50_veg_restored_rcp85_p50 );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_restored_rcp85_p50 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP50_VEG_RESTORED_RCP85_P95  ) {
    mapPanel.centerObject    (kanfarande_RP50_veg_restored_rcp85_p95  );
    imagem = colorStretch_IMK(kanfarande_RP50_veg_restored_rcp85_p95  ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP100_NOVEG_P95) {
    mapPanel.centerObject    (kanfarande_RP100_noveg_p50 );
    imagem = colorStretch_IMK(kanfarande_RP100_noveg_p50).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP100_VEG_P50 ) {
    mapPanel.centerObject    (kanfarande_RP100_noveg_p95  );
    imagem = colorStretch_IMK(kanfarande_RP100_noveg_p95 ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP100_VEG_P50  ) {
    mapPanel.centerObject    (kanfarande_RP100_veg_p50   );
    imagem = colorStretch_IMK(kanfarande_RP100_veg_p50  ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == KANFARANDE_RP100_VEG_P95   ) {
    mapPanel.centerObject    (kanfarande_RP100_veg_p95    );
    imagem = colorStretch_IMK(kanfarande_RP100_veg_p95   ).visualize(CC_STYLE_IMK);
    legendPanelIM.clear();
    legendPanelIM.add(IMKLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = imagem.updateMask(constraint.image.gt(value));
    } else {
      image = imagem.updateMask(constraint.image.lt(value));
    }
  }
  mapPanel.addLayer(imagem);
  mapPanel.add(mang2000);
  mapPanel.add(mang2005);
  mapPanel.add(mang2010);
  mapPanel.add(mang2015);
  mapPanel.add(mang2020);
  mapPanel.add(losses);
  mapPanel.add(gains);
}
IMKSelectionFunction();
toolPanel.add(selectorIMK);
toolPanel.add(descriptionKAFARANDE);
toolPanel.add(legendPanelIM);
toolPanel.add(separator);
//█░█ █ █ ░   █▀▄▀█ ▄▀█ █▄░█ █▀▀ █▀█ █▀█ █░█ █▀▀ 
//▀▄▀ █ █ ▄   █░▀░█ █▀█ █░▀█ █▄█ █▀▄ █▄█ ▀▄▀ ██▄ 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MANGROVE CHANGE FUNCTION
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
toolPanel.add(intromangroves);
toolPanel.add(descriptionMANGROVES);
var COUNTRIES_STYLE = {color: '050505', fillColor: '00000000',width: 2};
var HIGHLIGHT_STYLE = {color: '0092CA', fillColor: 'C7EEFFC0', width: 3};
var selectedPoints = [];
// Returns the list of allPrefectures the user has selected.
function getSelectedCountries() {
  return allPrefectures.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Makes a bar chart of the given FeatureCollection of allPrefectures by name.
function makeResultsBarChart(allPrefectures) {
  var chart = ui.Chart.feature.byFeature(allPrefectures, 'Name');
  chart.setChartType('BarChart');
  chart.setOptions({
    title: 'Mangrove Change Comparison',
    vAxis: {title: null},
    hAxis: {title: 'Mangrove extent changes from 2000-2020 (km²)', minValue: 0},
    colors: ['14C38E', 'FF5D5D']
    }
);
  chart.style().set({stretch: 'both'});
  return chart;
}
// Makes a table of the given FeatureCollection of allPrefectures by name.
function makeResultsTable(allPrefectures) {
  var table = ui.Chart.feature.byFeature(allPrefectures, 'Name');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected allPrefectures.
function updateOverlay() {
  var overlay = getSelectedCountries().style(HIGHLIGHT_STYLE);
  mapPanel.layers().set(1, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedCountries());
  ChangeResultsPanel.clear().add(chart).add(buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  mapPanel.layers().remove(mapPanel.layers().get(1));
  var instructionsLabel = ui.Label('Select prefectures to compare the changes.');
  ChangeResultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handlemapPanelClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
mapPanel.onClick(handlemapPanelClick);
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Display results as table',
        value: makeResultsBarChart,
      },
      {
        label: 'Display results as chart',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Clear results', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Clear results', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// M A N G R O V E   L A Y E R S   C H E C K B O X E S
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var extCheck1 = ui.Checkbox('2000').setValue(true);
toolPanel.add(extCheck1);
var extCheck2 = ui.Checkbox('2005').setValue(false);
toolPanel.add(extCheck2);
var extCheck3 = ui.Checkbox('2010').setValue(false);
toolPanel.add(extCheck3);
var extCheck4 = ui.Checkbox('2015').setValue(false);
toolPanel.add(extCheck4);
var extCheck5 = ui.Checkbox('2020').setValue(true);
toolPanel.add(extCheck5);
var extCheck6 = ui.Checkbox('Losses').setValue(true);
var extCheck7 = ui.Checkbox('Gains').setValue(true);
var doCheckbox1 = function() {
  extCheck1.onChange(function(checked){
  mang2000.setShown(checked);
  });
};
doCheckbox1();
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  mang2005.setShown(checked);
  });
};
doCheckbox2();
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  mang2010.setShown(checked);
  });
};
doCheckbox3();
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  mang2015.setShown(checked);
  });
};
doCheckbox4();
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  mang2020.setShown(checked);
  });
};
doCheckbox5();
var doCheckbox6 = function() {
  extCheck6.onChange(function(checked){
  losses.setShown(checked);
    });
};
var doCheckbox7 = function() {
  extCheck7.onChange(function(checked){
  gains.setShown(checked);
  });
};
var regionCheck = ui.Checkbox('Display regions').setValue(false);
var doregionCheck = function() {
  regionCheck.onChange(function(checked){
  REGION.setShown(checked);
  });
};
var buttonActivateChanges = ui.Button({
  label: '» Start change statistics by prefecture «',
  onClick: function() {
  mapPanel.style().set({cursor: 'crosshair'});
  mapPanel.setCenter(-13.8458, 10.0457, 9);
  mapPanel.remove(ChangeResultsPanel);
  mapPanel.add(ChangeResultsPanel);
  mapPanel.addLayer(allPrefectures.style(COUNTRIES_STYLE));
  clearResults();
  }
});
// GRAPH OF MANGROVE EXTENT FOR GUINEA
var dataTableMangroveExtent = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 2241.524464396918,'color: #d2f6c5'],
  ['2005', 1974.536810036747, 'color: #bfdcae'],
  ['2010', 2020.1408319021664, 'color: #68b0ab'],
  ['2015', 2072.6424317265464, 'color: #81b214'],
  ['2020', 2070.2510900413326, 'color: #206a5d'],
  ];
// Define the chart and print it to the console.
var chartMangroveExtent = ui.Chart(dataTableMangroveExtent).setChartType('ColumnChart').setOptions({
  title: 'Mangrove Extent in Guinea',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (in km²)', titleTextStyle: {italic: false, bold: true}},
});
toolPanel.add(chartMangroveExtent);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// R E G I O N   S E L E C T O R 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var prefectureSelection = ui.Label({
  value: '» Select a coastal prefecture:', 
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '10px'}
});
var selectorRegion = ui.Select({
  items: [SELECTREGION, BOFFA, BOKE, CONAKRY, COYAH, DUBREKA, FORECARIAH],
  value: SELECTREGION,
  onChange: regionSelectionFunction,
  style: {padding: '0px 0px 0px 10px'}
});
var descriptionTS =
 '1996-2020 LandTrendr-based land cover time-series snippet:';
var LabelTS = ui.Label(descriptionTS, PARAGRAPH_STYLEII);
function regionSelectionFunction() {
  var layer = selectorRegion.getValue();
  var image;
//=================================== SELECT ===================================
if (layer == SELECTREGION){
mapPanel.centerObject(coastalPrefectures,8);
mapPanel.addLayer(ee.Image().paint(coastalPrefectures, 0, 2), {palette:['white']}, 'boffa')
chartPanel1.clear();
mapPanel.remove(chartPanel1);
mapPanel.remove(buttonRemoveGraph);
//=================================== BOFFA ===================================
} else if (layer == BOFFA){
    mapPanel.centerObject(boffa,10);
    mapPanel.addLayer(ee.Image().paint(boffa, 0, 2), {palette:['red']}, 'boffa');
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.add(buttonRemoveGraph);
    mapPanel.add(chartPanel1);
// CHART
var dataTableBOFFA = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 490.22230141049,'fill-color: #d2f6c5; stroke-color: red; stroke-width: 2'],
  ['2005', 423.616290088084, 'fill-color: #bfdcae; stroke-color: red; stroke-width: 2'],
  ['2010', 410.104626716549, 'fill-color: #68b0ab; stroke-color: red; stroke-width: 2'],
  ['2015', 442.092045856015, 'fill-color: #81b214; stroke-color: red; stroke-width: 2'],
  ['2020', 450.212264332755, 'fill-color: #206a5d; stroke-color: red; stroke-width: 2'],
  ];
var chartMangroveExtentBOFFA = ui.Chart(dataTableBOFFA).setChartType('ColumnChart').setOptions({
  title: 'Mangrove extent -  Boffa Prefecture',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (km²)', titleTextStyle: {italic: false, bold: true}},
});
chartPanel1.clear();
chartPanel1.add(chartMangroveExtentBOFFA);
// // Enter GIF here in any case
// var gifParams = {
//   region: boffa.geometry().transform(),
//   dimensions: 50,
//   framesPerSecond: 1,
//   format: 'gif'
// };
// //Labeling your images.
// var annotations = [{
//   position: 'bottom',
//   offset: '10%',
//   margin: '20%',
//   property: 'year',
//   scale: 300
//   }];
// var boundingbox = conakry.geometry().transform();
// var timeSeriesgif = LCWithYear.map(function(image) {
//   return text.annotateImage(image, AnnualLCMVIS, boundingbox, annotations);
// });
// var link = ui.Thumbnail(timeSeriesgif, gifParams);
// gifPanel.clear();
// gifPanel.add(LabelTS).add(link)
//=================================== BOKE ===================================
} else if (layer == BOKE){
    mapPanel.centerObject(boke,10);
    mapPanel.addLayer(ee.Image().paint(boke, 0, 2), {palette:['green']}, 'boke');
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.add(buttonRemoveGraph);
    mapPanel.add(chartPanel1);
// CHART
var dataTableBOKE = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 736.163537977454,'fill-color: #d2f6c5; stroke-color: green; stroke-width: 2'],
  ['2005', 662.612969527947, 'fill-color: #bfdcae; stroke-color: green; stroke-width: 2'],
  ['2010', 651.240779006879, 'fill-color: #68b0ab; stroke-color: green; stroke-width: 2'],
  ['2015', 734.258106115707, 'fill-color: #81b214; stroke-color: green; stroke-width: 2'],
  ['2020', 731.306768962771, 'fill-color: #206a5d; stroke-color: green; stroke-width: 2'],
  ];
// Define the chart and print it to the console.
var chartMangroveExtentBOKE = ui.Chart(dataTableBOKE).setChartType('ColumnChart').setOptions({
  title: 'Mangrove extent -  Boké Prefecture',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (km²)', titleTextStyle: {italic: false, bold: true}},
});
chartPanel1.clear();
chartPanel1.add(chartMangroveExtentBOKE);
//=================================== CONAKRY ===================================
} else if (layer == CONAKRY){
    mapPanel.centerObject(conakry,10);
    mapPanel.addLayer(ee.Image().paint(conakry, 0, 2), {palette:['blue']}, 'conakry');
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.add(buttonRemoveGraph);
    mapPanel.add(chartPanel1);
var dataTableCONAKRY = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 163.705339315584,'fill-color: #d2f6c5; stroke-color: blue; stroke-width: 2'],
  ['2005', 134.055604138009, 'fill-color: #bfdcae; stroke-color: blue; stroke-width: 2'],
  ['2010', 145.107188513057, 'fill-color: #68b0ab; stroke-color: blue; stroke-width: 2'],
  ['2015', 129.129653151535, 'fill-color: #81b214; stroke-color: blue; stroke-width: 2'],
  ['2020', 127.199987045114, 'fill-color: #206a5d; stroke-color: blue; stroke-width: 2'],
  ];
// Define the chart and print it to the console.
var chartMangroveExtentCONAKRY = ui.Chart(dataTableCONAKRY).setChartType('ColumnChart').setOptions({
  title: 'Mangrove extent -  Conakry Prefecture',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (km²)', titleTextStyle: {italic: false, bold: true}},
});
// Define the chart and print it to the console.
chartPanel1.clear();
chartPanel1.add(chartMangroveExtentCONAKRY);
//=================================== COYAH ===================================
} else if (layer == COYAH){
    mapPanel.centerObject(coyah,11);
    mapPanel.addLayer(ee.Image().paint(coyah, 0, 2), {palette:['yellow']}, 'coyah');
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.add(buttonRemoveGraph);
    mapPanel.add(chartPanel1);
var dataTableCOYAH = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 88.0151849709161,'fill-color: #d2f6c5; stroke-color: yellow; stroke-width: 2'],
  ['2005', 65.985983611829, 'fill-color: #bfdcae; stroke-color: yellow; stroke-width: 2'],
  ['2010', 80.0674760273614, 'fill-color: #68b0ab; stroke-color: yellow; stroke-width: 2'],
  ['2015', 70.3056248078506, 'fill-color: #81b214; stroke-color: yellow; stroke-width: 2'],
  ['2020', 72.3097970996022, 'fill-color: #206a5d; stroke-color: yellow; stroke-width: 2'],
  ];
var chartMangroveExtentCOYAH = ui.Chart(dataTableCOYAH).setChartType('ColumnChart').setOptions({
  title: 'Mangrove extent - Coyah Prefecture',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (km²)', titleTextStyle: {italic: false, bold: true}},
});
chartPanel1.clear();
chartPanel1.add(chartMangroveExtentCOYAH);
//=================================== DUBREKA ===================================
} else if (layer == DUBREKA){
    mapPanel.centerObject(dubreka,10);
    mapPanel.addLayer(ee.Image().paint(dubreka, 0, 2), {palette:['orange']}, 'dubreka');
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.add(buttonRemoveGraph);
    mapPanel.add(chartPanel1);
var dataTableDUBREKA = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 247.571066128166,'fill-color: #d2f6c5; stroke-color: orange; stroke-width: 2'],
  ['2005', 207.62680930326, 'fill-color: #bfdcae; stroke-color: orange; stroke-width: 2'],
  ['2010', 212.905523560299, 'fill-color: #68b0ab; stroke-color: orange; stroke-width: 2'],
  ['2015', 205.572320532956, 'fill-color: #81b214; stroke-color: orange; stroke-width: 2'],
  ['2020', 194.235242026605, 'fill-color: #206a5d; stroke-color: orange; stroke-width: 2'],
  ];
var chartMangroveExtentDUBREKA = ui.Chart(dataTableDUBREKA).setChartType('ColumnChart').setOptions({
  title: 'Mangrove extent - Dubréka Prefecture',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (km²)', titleTextStyle: {italic: false, bold: true}},
});
chartPanel1.clear();
chartPanel1.add(chartMangroveExtentDUBREKA);   
//=================================== FORECARIAH ===================================
} else if (layer == FORECARIAH){
    mapPanel.centerObject(forecariah,10);
    mapPanel.addLayer(ee.Image().paint(forecariah, 0, 2), {palette:['pink']}, 'forecariah');
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.add(buttonRemoveGraph);
    mapPanel.add(chartPanel1);
var dataTableFORECARIAH = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    //{label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['2000', 515.025396776361,'fill-color: #d2f6c5; stroke-color: pink; stroke-width: 2'],
  ['2005', 479.683254327621, 'fill-color: #bfdcae; stroke-color: pink; stroke-width: 2'],
  ['2010', 514.926899742466, 'fill-color: #68b0ab; stroke-color: pink; stroke-width: 2'],
  ['2015', 482.894601713924, 'fill-color: #81b214; stroke-color: pink; stroke-width: 2'],
  ['2020', 483.660856031128, 'fill-color: #206a5d; stroke-color: pink; stroke-width: 2'],
  ];
var chartMangroveExtentFORECARIAH = ui.Chart(dataTableFORECARIAH).setChartType('ColumnChart').setOptions({
  title: 'Mangrove extent - Forécariah Prefecture',
  legend: {position: 'none'},
  hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Extent (km²)', titleTextStyle: {italic: false, bold: true}},
});
chartPanel1.clear();
chartPanel1.add(chartMangroveExtentFORECARIAH);   
}
} 
toolPanel.add(prefectureSelection);
toolPanel.add(selectorRegion);
var descriptionregionselection =
 'Extent stats for the region of interest will be shown in the map. Click on the upper-right arrow icon in the graph to expand and dowload the data.';
var descriptionLabelRegion = ui.Label(descriptionregionselection, PARAGRAPH_STYLEII);
toolPanel.add(descriptionLabelRegion);
toolPanel.add(gifPanel);
// ===================================
// MANGROVE CHANGE CHECKBOXES
toolPanel.add(intromangrovesChange);
toolPanel.add(descriptionMANGROVECHANGE);
toolPanel.add(extCheck6);
doCheckbox6();
toolPanel.add(extCheck7);
doCheckbox7();
// GRAPH OF MANGROVE CHANGE FOR GUINEA
var dataTableChange = [
  [
    {label: 'Year', role: 'domain', type: 'string'},
    {label: 'Extent (km²)', role: 'data', type: 'number'},
    {label: 'Extent. annotation', role: 'annotation', type: 'string'},
    { role: 'style' }
  ],
  ['Losses', 340.277588073421,'Loss', 'fill-color: #FF5D5D'], //stroke-color: pink; stroke-width: 2'
  ['Gains',169.004213717865, 'Gain','fill-color: #14C38E'],
  ['Net change',-171.27, 'Net change','fill-color: #EFEAD8'],
  ];
// Define the chart and print it to the console.
var chartCHANGE = ui.Chart(dataTableChange).setChartType('BarChart').setOptions({
  title: 'Mangrove Extent Change in Guinea 2000 - 2020',
  legend: {position: 'none'},
  hAxis: {title: 'Total area (km²)', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Change type', titleTextStyle: {italic: false, bold: true}},
});
toolPanel.add(chartCHANGE);
toolPanel.add(descriptionMANGROVECHANGE2);
toolPanel.add(buttonActivateChanges);
toolPanel.add(separator2);
//█░█ █ █ █ ░   █░░ ▄▀█ █▄█ █▀▀ █▀█   █▀ █▀▀ █░░ █▀▀ █▀▀ ▀█▀ █▀█ █▀█
//▀▄▀ █ █ █ ▄   █▄▄ █▀█ ░█░ ██▄ █▀▄   ▄█ ██▄ █▄▄ ██▄ █▄▄ ░█░ █▄█ █▀▄
toolPanel.add(introLayers);
toolPanel.add(descriptionLayers);
var layerselection = ui.Label({
  value: '» Select an extent layer/dataset to display:', 
  style: {fontSize: '14px',
    fontWeight: 'bold',
    color: '#9E9E9E',
    padding: '10px'}
});
toolPanel.add(layerselection);
var constraints = [];
var selectorLayers = ui.Select({
  items: [SELECT, COPERNICUS, GLOBCOVER, WAATLAS, WAATLAS30, ESA, MIDEKISA, ECOSYSTEMS, LAND, LITHOLOGY, GFCC, HANSEN, TREEHEIGHT, POPULATION, LCMGUINEA2014, FORESTSNONFORESTS, FORESTLOSS],
  value: SELECT,
  onChange: selectorFunction,
});
function selectorFunction() {
  mapPanel.layers().reset();
  var layer = selectorLayers.getValue();
  var image;
  if (layer == SELECT) {
    mapPanel.centerObject(guinea,8);
    image = ee.Image(0).selfMask();
    descriptionPanel.clear();
    legendPanel.clear();
    toolPanel.remove(chartPanelRegion);
    toolPanel.remove(regionthumb);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
  } else if (layer == COPERNICUS) {
    mapPanel.centerObject(guinea,8);
    image = Copernicus100m.visualize(CopernicusVIS);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelCOPERNICUS);
    legendPanel.clear();
    legendPanel.add(CopernicusLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
var MAP = Copernicus100m;
var prj = MAP.projection();
var scale = prj.nominalScale();
var classNUMBERlist = classNumberListCopernicus;  
var ClassLabelList = ee.List(classLabelsListCopernicus) ;
var colors = paletteCopernicus;
// AREA
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
mapPanel.remove(ChangeResultsPanel);
  } else if (layer == GLOBCOVER) {
    mapPanel.centerObject(guinea,8);
    image = GlobCover.visualize(GlobCoverVIS);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelGLOBCOVER);
    legendPanel.clear();
    legendPanel.add(GlobCoverLegend);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////
var MAP = GlobCover;
var classNUMBERlist = classNumberListGlobCover;  
var ClassLabelList = ee.List(classLabelsListGlobCover) ;
var colors = paletteGlobCover;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == WAATLAS) {
    mapPanel.centerObject(guinea,8);
    image = WAAtlas.visualize(WAAtlasVIS);
    legendPanel.clear();
    legendPanel.add(WAAtlasLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelWAATLAS);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////
var MAP = WAAtlas;
var classNUMBERlist = classNumberListWAAtlas;  
var ClassLabelList = ee.List(classLabelsListWAAtlas) ;
var colors = paletteWAAtlas;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      //bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == WAATLAS30) {
mapPanel.centerObject(guinea,8);
image = WAAtlas30m.visualize(WAAtlas30mVIS);
    legendPanel.clear();
    legendPanel.add(WAAtlas30mLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelWAATLAS30);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////
var MAP = WAAtlas30m;
var classNUMBERlist = classNumberListWAAtlas30m;  
var ClassLabelList = ee.List(classLabelsListWAAtlas30m) ;
var colors = paletteWAAtlas30m;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == ESA) {
mapPanel.centerObject(guinea,8);
image = ESACCI.visualize(ESACCIVIS);
    legendPanel.clear();
    legendPanel.add(ESACCILegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelESA);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////
var MAP = ESACCI;
var classNUMBERlist = classNumberListESACCI;  
var ClassLabelList = ee.List(classLabelsListESACCI) ;
var colors = paletteESACCI;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == MIDEKISA) {
mapPanel.centerObject(guinea,8);
image = Midekisa2015.visualize(Midekisa2015VIS);
    legendPanel.clear();
    legendPanel.add(Midekisa2015Legend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelMIDEKISA);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////
var MAP = Midekisa2015;
var classNUMBERlist = classNumberListMidekisa2015;  
var ClassLabelList = ee.List(classLabelsListMidekisa2015) ;
var colors = paletteMidekisa2015;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('b1');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == ECOSYSTEMS) {
mapPanel.centerObject(guinea,8);
image = Ecosystems.visualize(EcosystemsVIS);
    legendPanel.clear();
    legendPanel.add(EcosystemsLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelECOSYSTEMS);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////////////////////////////////
var MAP = Ecosystems;
var classNUMBERlist = classNumberListEcosystems;  
var ClassLabelList = ee.List(classLabelsListEcosystems) ;
var colors = paletteEcosystems;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == LAND) {
mapPanel.centerObject(guinea,8);
image = LandForm.visualize(LandFormVIS);
    legendPanel.clear();
    legendPanel.add(LandFormLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelLAND);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////////////////////////////////
var MAP = LandForm;
var classNUMBERlist = classNumberListLandForm;  
var ClassLabelList = ee.List(classLabelsListLandForm) ;
var colors = paletteLandForm;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == LITHOLOGY) {
mapPanel.centerObject(guinea,8);
image = Lithology.visualize(LithologyVIS);
    legendPanel.clear();
    legendPanel.add(LithologyLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelLITHOLOGY);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////////////////////////////////
var MAP = Lithology;
var classNUMBERlist = classNumberListLithology;  
var ClassLabelList = ee.List(classLabelsListLithology) ;
var colors = paletteLithology;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == GFCC) {
mapPanel.centerObject(guinea,8);
image = colorStretch_CC(GFCCCanopyCover).visualize(GFCCCanopyCoverVIS);
    legendPanel.clear();
    legendPanel.add(HansenCanopyCoverLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelGFCC);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
toolPanel.remove(chartPanelRegion);
//toolPanel.add(chartPanelRegion);
  } else if (layer == HANSEN) {
mapPanel.centerObject(guinea,8);
image = colorStretch_CC(HansenCanopyCover).visualize(HansenCanopyCoverVIS);
    legendPanel.clear();
    legendPanel.add(HansenCanopyCoverLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelHANSEN);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
toolPanel.remove(chartPanelRegion);
//toolPanel.add(chartPanelRegion);
  } else if (layer == TREEHEIGHT) {
mapPanel.centerObject(guinea,8);
image = colorStretch_Tree(TreeHeight).visualize(TreeHeightVIS);
    legendPanel.clear();
    legendPanel.add(TreeHeightLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelTREEHEIGHT);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
toolPanel.remove(chartPanelRegion);
//toolPanel.add(chartPanelRegion);
  } else if (layer == POPULATION) {
mapPanel.centerObject(guinea,8);
image = colorStretch(PopulationCount).visualize(PopulationCountVIS);
    legendPanel.clear();
    legendPanel.add(PopulationCountLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelPOPULATION);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
toolPanel.remove(chartPanelRegion);
//toolPanel.add(chartPanelRegion);
  } else if (layer == LCMGUINEA2014) {
mapPanel.centerObject(guinea,8);
image = LCMNational2014.visualize(LCMNational2014VIS);
    legendPanel.clear();
    legendPanel.add(LCMNational2014Legend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelLCMGUINEA2014);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////////////////////////////////
var MAP = LCMNational2014;
var classNUMBERlist = classNumberListLCMNational2014;  
var ClassLabelList = ee.List(classLabelsListLCMNational2014) ;
var colors = paletteLCMNational2014;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
  } else if (layer == FORESTSNONFORESTS) {
mapPanel.centerObject(guinea,8);
image = MapForest.visualize(MapForestVIS);
    legendPanel.clear();
    legendPanel.add(MapForestLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelFORESTSNONFORESTS);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////////////////////////////////
var MAP = MapForest;
var classNUMBERlist = classNumberListMapForest;  
var ClassLabelList = ee.List(classLabelsListMapForest) ;
var colors = paletteMapForest;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('remapped');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8); 
  } else if (layer == FORESTLOSS) {
mapPanel.centerObject(guinea,8);
image = Forestlosses.visualize(ForeslossesVIS);
    legendPanel.clear();
    legendPanel.add(ForestlossesLegend);
    descriptionPanel.clear();
    descriptionPanel.add(descriptionLabelFORESTLOSS);
    mapPanel.remove(chartPanel1);
    mapPanel.remove(buttonRemoveGraph);
    mapPanel.remove(ChangeResultsPanel);
//////////////////////////////////////////////////////
var MAP = Forestlosses;
var classNUMBERlist = classNumberListForestlosses;  
var ClassLabelList = ee.List(classLabelsListForestlosses) ;
var colors = paletteForestlosses;
//////////////////////////
// AREA
var prj = MAP.projection();
var scale = prj.nominalScale();
var getArea1 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region1,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea2 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region2,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea3 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region3,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea4 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region4,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea5 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region5,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea6 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region6,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea7 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region7,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var getArea8 = ee.FeatureCollection(classNUMBERlist.map(function(i){
    var classNum = ee.Number(i);
    var def = MAP.eq(classNum);
    var defArea = def.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:region8,
      scale: scale,
      maxPixels:1e13,
      bestEffort: true,
      tileScale: 16
      }).get('constant');
  return ee.Feature(null).set('Area', defArea).set('Class',classNum);
}));
var withPropertyClass1 = getArea1.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass2 = getArea2.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass3 = getArea3.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass4 = getArea4.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass5 = getArea5.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass6 = getArea6.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass7 = getArea7.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var withPropertyClass8 = getArea8.map(function(f) {
  var num = ee.Number(f.get('Class'));
  var area = f.get('Area');
  return ee.Feature(null).set('Area',area).set('ClassString',ClassLabelList.get(num));
});
var chart1 = ui.Chart.feature.byFeature({
          features: withPropertyClass1.select('Area|ClassString'),
          xProperty: 'ClassString'
        }).setChartType('PieChart').setOptions({
          title: 'Boké',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart2 = ui.Chart.feature.byFeature({
          features: withPropertyClass2.select('Area|ClassString'),
          xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Conakry',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart3 = ui.Chart.feature.byFeature({features: withPropertyClass3.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Faranah',
          hAxis:
              {title: 'Area (Km²)', titleTextStyle: {italic: false, bold: true},
                format:'long'},
          vAxis: {title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart4 = ui.Chart.feature.byFeature({features: withPropertyClass4.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kankan',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart5 = ui.Chart.feature.byFeature({features: withPropertyClass5.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Kindia',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart6 = ui.Chart.feature.byFeature({features: withPropertyClass6.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Labé',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart7 = ui.Chart.feature.byFeature({features: withPropertyClass7.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Mamou',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
var chart8 = ui.Chart.feature.byFeature({features: withPropertyClass8.select('Area|ClassString'),xProperty: 'ClassString'}).setChartType('PieChart').setOptions({
          title: 'Nzérékoré',
          hAxis:
              {title: 'Area (Km²)', 
              titleTextStyle: {italic: false, bold: true},
                format:'long'
              },
          vAxis: {
            title: 'Class',
            titleTextStyle: {italic: false, bold: true}
          },
      colors: colors
});
toolPanel.remove(regionthumb);
toolPanel.add(regionthumb);
toolPanel.remove(chartPanelRegion);
toolPanel.add(chartPanelRegion);
chartPanelRegion.clear().add(chart1)
.add(chart2)
.add(chart3)
.add(chart4)
.add(chart5)
.add(chart6)
.add(chart7)
.add(chart8);
}
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
  mapPanel.add(mang2000);
  mapPanel.add(mang2005);
  mapPanel.add(mang2010);
  mapPanel.add(mang2015);
  mapPanel.add(mang2020);
  mapPanel.add(losses);
  mapPanel.add(gains);
  mapPanel.addLayer(image);
  mapPanel.add(REGION);
}
selectorFunction();
// Add everything to the TOOL PANEL: The selector, the Description Panel to hold layer description and Legend label
toolPanel.add(selectorLayers);
toolPanel.add(descriptionPanel);
toolPanel.add(legendDescription);
toolPanel.add(legendPanel);
toolPanel.add(descriptionregions);
toolPanel.add(regionCheck);
doregionCheck();
//toolPanel.add(chartPanelRegion);