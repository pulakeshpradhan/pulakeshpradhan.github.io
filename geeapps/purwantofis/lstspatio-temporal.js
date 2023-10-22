////////////////////////////////////////////////////////
///Land Surface Temperature Time-series Visualization///
////////////////////////////////////////////////////////
//______________________________________________________
// Preparing the area of interest and LST image collection
// Import area of interest shapefile //
// Import world level of boundary
var world = ee.FeatureCollection("users/purwantofis/world");
// Import national level of boundary
var idn = ee.FeatureCollection("users/purwantofis/idn");
//print('New system:index', idn);
// Import regional level of boundary
var ejv = ee.FeatureCollection("users/anandarianti1807226/JawaTimur");
// Import regency level of boundary
var mlg = ee.FeatureCollection("users/purwantofis/malang");
//______________________________________________________
// Import MODIS and Landsat collection //
// Import gap-filled MODIS (source: Zhang et al. 2018)
var gf_mod_day = ee.ImageCollection("MODIS/006/MOD11A2");
// Import and calculate LST for Landsat collection
// cloudmask for TOA data
var masktoa = function (image) {
  // Extract specific bit for masking the bad pixel quality
  var dilatedCloudMask = 1 << 1;
  var cloudShadowBitMask = 1 << 4;
  var cloudsBitMask = 1 << 3;
  var qa = image.select('QA_PIXEL');
  var ra = image.select('QA_RADSAT').eq(0);
  // Applying cloudmask
  var mask = qa.bitwiseAnd(dilatedCloudMask).eq(0)
                 .and(qa.bitwiseAnd(cloudShadowBitMask).eq(0))
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask).updateMask(ra).toFloat();
};
// cloudmask for SR data
var masksr = function (image) {
  // Extract specific bit for masking the bad pixel quality
  var dilatedCloudMask = 1 << 1;
  var cloudShadowBitMask = 1 << 4;
  var cloudsBitMask = 1 << 3;
  var qa = image.select('QA_PIXEL');
  var ra = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands
  var opticalBands = image.select('SR_B.')
                                .multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149);
  // Applying masks
  var mask = qa.bitwiseAnd(dilatedCloudMask).eq(0)
                 .and(qa.bitwiseAnd(cloudShadowBitMask).eq(0))
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.addBands(opticalBands, null, true)
          .addBands(thermalBands, null, true)
          .updateMask(mask)
          .updateMask(ra)
          .toFloat();
};
// function for NDVI
var NDVI = function(landsat){
  var wrap = function(image){
    // choose bands
    var nir = ee.String(ee.Algorithms.If(landsat==='L8','SR_B5','SR_B4'))
    var red = ee.String(ee.Algorithms.If(landsat==='L8','SR_B4','SR_B3'))
    // compute NDVI 
    return image.addBands(image.expression('(nir-red)/(nir+red)',{
      'nir':image.select(nir).multiply(0.0001),
      'red':image.select(red).multiply(0.0001)
    }).rename('NDVI'))
  }
  return wrap
};
// function for FVC
var FVC = function(landsat){
  var wrap = function(image){
    var ndvi = image.select('NDVI')
    // Compute FVC
    var fvc = image.expression('((ndvi-ndvi_bg)/(ndvi_vg - ndvi_bg))**2',
      {'ndvi':ndvi,'ndvi_bg':0.2,'ndvi_vg':0.86});
    fvc = fvc.where(fvc.lt(0.0),0.0);
    fvc = fvc.where(fvc.gt(1.0),1.0);
    return image.addBands(fvc.rename('FVC'));
  }
  return wrap
};
// function for water vapor image
var NCEP_TPW = function(image){
  // first select the day of interest 
  var date = ee.Date(image.get('system:time_start'))
  var year = ee.Number.parse(date.format('yyyy'))
  var month = ee.Number.parse(date.format('MM'))
  var day = ee.Number.parse(date.format('dd'))
  var date1 = ee.Date.fromYMD(year,month,day)
  var date2 = date1.advance(1,'days')
  // function compute the time difference from landsat image
  var datedist = function(image){
    return image.set('DateDist',
      ee.Number(image.get('system:time_start'))
      .subtract(date.millis()).abs())
  };
  // load atmospheric data collection
  var TPWcollection = ee.ImageCollection('NCEP_RE/surface_wv')
                  .filter(ee.Filter.date(date1.format('yyyy-MM-dd'), date2.format('yyyy-MM-dd')))
                  .map(datedist)
  // select the two closest model times
    var closest = (TPWcollection.sort('DateDist')).toList(2);
  // check if there is atmospheric data in the wanted day
  // if not creates a TPW image with non-realistic values
  // these are then masked in the SMWalgorithm function (prevents errors)
  var tpw1 = ee.Image(ee.Algorithms.If(closest.size().eq(0), ee.Image.constant(-999.0),
                      ee.Image(closest.get(0)).select('pr_wtr') ));
  var tpw2 = ee.Image(ee.Algorithms.If(closest.size().eq(0), ee.Image.constant(-999.0),
                        ee.Algorithms.If(closest.size().eq(1), tpw1,
                        ee.Image(closest.get(1)).select('pr_wtr') )));
  var time1 = ee.Number(ee.Algorithms.If(closest.size().eq(0), 1.0,
                        ee.Number(tpw1.get('DateDist')).divide(ee.Number(21600000)) ));
  var time2 = ee.Number(ee.Algorithms.If(closest.size().lt(2), 0.0,
                        ee.Number(tpw2.get('DateDist')).divide(ee.Number(21600000)) ));
  var tpw = tpw1.expression('tpw1*time2+tpw2*time1',
                            {'tpw1':tpw1,
                            'time1':time1,
                            'tpw2':tpw2,
                            'time2':time2
                            }).clip(image.geometry());
  // SMW coefficients are binned by TPW values
  // find the bin of each TPW value
  var pos = tpw.expression(
    "value = (TPW>0 && TPW<=6) ? 0" +
    ": (TPW>6 && TPW<=12) ? 1" +
    ": (TPW>12 && TPW<=18) ? 2" +
    ": (TPW>18 && TPW<=24) ? 3" +
    ": (TPW>24 && TPW<=30) ? 4" +
    ": (TPW>30 && TPW<=36) ? 5" +
    ": (TPW>36 && TPW<=42) ? 6" +
    ": (TPW>42 && TPW<=48) ? 7" +
    ": (TPW>48 && TPW<=54) ? 8" +
    ": (TPW>54) ? 9" +
    ": 0",{'TPW': tpw})
    .clip(image.geometry());
  // add tpw to image as a band
  var withTPW = (image.addBands(tpw.rename('TPW'),['TPW'])).addBands(pos.rename('TPWpos'),['TPWpos']);
  return withTPW
};
// get ASTER emissivity
var aster = ee.Image("NASA/ASTER_GED/AG100_003")
//get ASTER FVC from NDVI
var aster_ndvi = aster.select('ndvi').multiply(0.01);
var aster_fvc = aster_ndvi.expression('((ndvi-ndvi_bg)/(ndvi_vg - ndvi_bg))**2',
  {'ndvi':aster_ndvi,'ndvi_bg':0.2,'ndvi_vg':0.86});
aster_fvc = aster_fvc.where(aster_fvc.lt(0.0),0.0);
aster_fvc = aster_fvc.where(aster_fvc.gt(1.0),1.0);
// bare ground emissivity functions for each band
var emiss_bare_band10 = function(image){
  return image.expression('(EM - 0.99*fvc)/(1.0-fvc)',{
    'EM':aster.select('emissivity_band10').multiply(0.001),
    'fvc':aster_fvc})
    .clip(image.geometry())
};
var emiss_bare_band11 = function(image){
  return image.expression('(EM - 0.99*fvc)/(1.0-fvc)',{
    'EM':aster.select('emissivity_band11').multiply(0.001),
    'fvc':aster_fvc})
    .clip(image.geometry())
};
var emiss_bare_band12 = function(image){
  return image.expression('(EM - 0.99*fvc)/(1.0-fvc)',{
    'EM':aster.select('emissivity_band12').multiply(0.001),
    'fvc':aster_fvc})
    .clip(image.geometry())
};
var emiss_bare_band13 = function(image){
  return image.expression('(EM - 0.99*fvc)/(1.0-fvc)',{
    'EM':aster.select('emissivity_band13').multiply(0.001),
    'fvc':aster_fvc})
    .clip(image.geometry())
};
var emiss_bare_band14 = function(image){
  return image.expression('(EM - 0.99*fvc)/(1.0-fvc)',{
    'EM':aster.select('emissivity_band14').multiply(0.001),
    'fvc':aster_fvc})
    .clip(image.geometry())
};
// this function computes the emissivity of the 
// Landsat TIR band using ASTER and FVC
var EM = function(landsat, use_ndvi){
  var wrap = function(image){
    var c13 = ee.Number(ee.Algorithms.If(landsat==='L4',0.3222,
                            ee.Algorithms.If(landsat==='L5',-0.0723,
                            ee.Algorithms.If(landsat==='L7',0.2147,
                            0.6820))));
    var c14 = ee.Number(ee.Algorithms.If(landsat==='L4',0.6498,
                            ee.Algorithms.If(landsat==='L5',1.0521,
                            ee.Algorithms.If(landsat==='L7',0.7789,
                            0.2578))));
    var c = ee.Number(ee.Algorithms.If(landsat==='L4',0.0272,
                            ee.Algorithms.If(landsat==='L5',0.0195,
                            ee.Algorithms.If(landsat==='L7',0.0059,
                            0.0584))));
    // get ASTER emissivity
    // convolve to Landsat band
    var emiss_bare = image.expression('c13*EM13 + c14*EM14 + c',{
      'EM13':emiss_bare_band13(image),
      'EM14':emiss_bare_band14(image),
      'c13':ee.Image(c13),
      'c14':ee.Image(c14),
      'c':ee.Image(c)
      });
    // compute the dynamic emissivity for Landsat
    var EMd = image.expression('fvc*0.99+(1-fvc)*em_bare',
      {'fvc':image.select('FVC'),'em_bare':emiss_bare});
    // compute emissivity directly from ASTER
    // without vegetation correction
    // get ASTER emissivity
    var aster = ee.Image("NASA/ASTER_GED/AG100_003")
      .clip(image.geometry());
    var EM0 = image.expression('c13*EM13 + c14*EM14 + c',{
      'EM13':aster.select('emissivity_band13').multiply(0.001),
      'EM14':aster.select('emissivity_band14').multiply(0.001),
      'c13':ee.Image(c13),
      'c14':ee.Image(c14),
      'c':ee.Image(c)
      });
    // select which emissivity to output based on user selection
    var EM = ee.Image(ee.Algorithms.If(use_ndvi,EMd,EM0));
    return image.addBands(EM.rename('EM'));
  }
  return wrap
}
// coefficients for the Statistical Mono-Window Algorithm
var coeff_SMW_L4 = ee.FeatureCollection([
  ee.Feature(null, {'TPWpos': 0, 'A': 0.9755, 'B': -205.2767, 'C': 212.0051}),
  ee.Feature(null, {'TPWpos': 1, 'A': 1.0155, 'B': -233.8902, 'C': 230.4049}),
  ee.Feature(null, {'TPWpos': 2, 'A': 1.0672, 'B': -257.1884, 'C': 239.3072}),
  ee.Feature(null, {'TPWpos': 3, 'A': 1.1499, 'B': -286.2166, 'C': 244.8497}),
  ee.Feature(null, {'TPWpos': 4, 'A': 1.2277, 'B': -316.7643, 'C': 253.0033}),
  ee.Feature(null, {'TPWpos': 5, 'A': 1.3649, 'B': -361.8276, 'C': 258.5471}),
  ee.Feature(null, {'TPWpos': 6, 'A': 1.5085, 'B': -410.1157, 'C': 265.1131}),
  ee.Feature(null, {'TPWpos': 7, 'A': 1.7045, 'B': -472.4909, 'C': 270.7000}),
  ee.Feature(null, {'TPWpos': 8, 'A': 1.5886, 'B': -442.9489, 'C': 277.1511}),
  ee.Feature(null, {'TPWpos': 9, 'A': 2.0215, 'B': -571.8563, 'C': 279.9854})
]);
var coeff_SMW_L5 = ee.FeatureCollection([
  ee.Feature(null, {'TPWpos': 0, 'A': 0.9765, 'B': -204.6584, 'C': 211.1321}),
  ee.Feature(null, {'TPWpos': 1, 'A': 1.0229, 'B': -235.5384, 'C': 230.0619}),
  ee.Feature(null, {'TPWpos': 2, 'A': 1.0817, 'B': -261.3886, 'C': 239.5256}),
  ee.Feature(null, {'TPWpos': 3, 'A': 1.1738, 'B': -293.6128, 'C': 245.6042}),
  ee.Feature(null, {'TPWpos': 4, 'A': 1.2605, 'B': -327.1417, 'C': 254.2301}),
  ee.Feature(null, {'TPWpos': 5, 'A': 1.4166, 'B': -377.7741, 'C': 259.9711}),
  ee.Feature(null, {'TPWpos': 6, 'A': 1.5727, 'B': -430.0388, 'C': 266.9520}),
  ee.Feature(null, {'TPWpos': 7, 'A': 1.7879, 'B': -498.1947, 'C': 272.8413}),
  ee.Feature(null, {'TPWpos': 8, 'A': 1.6347, 'B': -457.8183, 'C': 279.6160}),
  ee.Feature(null, {'TPWpos': 9, 'A': 2.1168, 'B': -600.7079, 'C': 282.4583})
]);
var coeff_SMW_L7 = ee.FeatureCollection([
  ee.Feature(null, {'TPWpos': 0, 'A': 0.9764, 'B': -205.3511, 'C': 211.8507}),
  ee.Feature(null, {'TPWpos': 1, 'A': 1.0201, 'B': -235.2416, 'C': 230.5468}),
  ee.Feature(null, {'TPWpos': 2, 'A': 1.0750, 'B': -259.6560, 'C': 239.6619}),
  ee.Feature(null, {'TPWpos': 3, 'A': 1.1612, 'B': -289.8190, 'C': 245.3286}),
  ee.Feature(null, {'TPWpos': 4, 'A': 1.2425, 'B': -321.4658, 'C': 253.6144}),
  ee.Feature(null, {'TPWpos': 5, 'A': 1.3864, 'B': -368.4078, 'C': 259.1390}),
  ee.Feature(null, {'TPWpos': 6, 'A': 1.5336, 'B': -417.7796, 'C': 265.7486}),
  ee.Feature(null, {'TPWpos': 7, 'A': 1.7345, 'B': -481.5714, 'C': 271.3659}),
  ee.Feature(null, {'TPWpos': 8, 'A': 1.6066, 'B': -448.5071, 'C': 277.9058}),
  ee.Feature(null, {'TPWpos': 9, 'A': 2.0533, 'B': -581.2619, 'C': 280.6800})
]);
var coeff_SMW_L8 = ee.FeatureCollection([
  ee.Feature(null, {'TPWpos': 0, 'A': 0.9751, 'B': -205.8929, 'C': 212.7173}),
  ee.Feature(null, {'TPWpos': 1, 'A': 1.0090, 'B': -232.2750, 'C': 230.5698}),
  ee.Feature(null, {'TPWpos': 2, 'A': 1.0541, 'B': -253.1943, 'C': 238.9548}),
  ee.Feature(null, {'TPWpos': 3, 'A': 1.1282, 'B': -279.4212, 'C': 244.0772}),
  ee.Feature(null, {'TPWpos': 4, 'A': 1.1987, 'B': -307.4497, 'C': 251.8341}),
  ee.Feature(null, {'TPWpos': 5, 'A': 1.3205, 'B': -348.0228, 'C': 257.2740}),
  ee.Feature(null, {'TPWpos': 6, 'A': 1.4540, 'B': -393.1718, 'C': 263.5599}),
  ee.Feature(null, {'TPWpos': 7, 'A': 1.6350, 'B': -451.0790, 'C': 268.9405}),
  ee.Feature(null, {'TPWpos': 8, 'A': 1.5468, 'B': -429.5095, 'C': 275.0895}),
  ee.Feature(null, {'TPWpos': 9, 'A': 1.9403, 'B': -547.2681, 'C': 277.9953})
]);
// Function to create a lookup between two columns in a 
// feature collection
var get_lookup_table = function(fc, prop_1, prop_2) {
  var reducer = ee.Reducer.toList().repeat(2);
  var lookup = fc.reduceColumns(reducer, [prop_1, prop_2]);
  return ee.List(lookup.get('list'));
};
var LST = function(landsat){
  var wrap = function(image){
    // Select algorithm coefficients
    var coeff_SMW = ee.FeatureCollection(ee.Algorithms.If(landsat==='L4',coeff_SMW_L4,
                                        ee.Algorithms.If(landsat==='L5',coeff_SMW_L5,
                                        ee.Algorithms.If(landsat==='L7',coeff_SMW_L7,
                                        coeff_SMW_L8))));
    // Create lookups for the algorithm coefficients
    var A_lookup = get_lookup_table(coeff_SMW, 'TPWpos', 'A');
    var B_lookup = get_lookup_table(coeff_SMW, 'TPWpos', 'B');
    var C_lookup = get_lookup_table(coeff_SMW, 'TPWpos', 'C');
    // Map coefficients to the image using the TPW bin position
    var A_img = image.remap(A_lookup.get(0), A_lookup.get(1),0.0,'TPWpos').resample('bilinear');
    var B_img = image.remap(B_lookup.get(0), B_lookup.get(1),0.0,'TPWpos').resample('bilinear');
    var C_img = image.remap(C_lookup.get(0), C_lookup.get(1),0.0,'TPWpos').resample('bilinear');
    // select TIR band
    var tir = ee.String(ee.Algorithms.If(landsat==='L8','B10',
                        ee.Algorithms.If(landsat==='L7','B6_VCID_1',
                        'B6')));
    // compute the LST in Celcius
    var lst = image.expression(
      'A*Tb1/em1 + B/em1 + C - 273.15',
         {'A': A_img,
          'B': B_img,
          'C': C_img,
          'em1': image.select('EM'),
          'Tb1': image.select(tir)
         }).updateMask(image.select('TPW').lt(0).not());
    return image.addBands(lst.rename('LST'))
  };
  return wrap
}
// MODULES DECLARATION -----------------------------------------------------------
var COLLECTION = ee.Dictionary({
  'L4': {
    'TOA': ee.ImageCollection('LANDSAT/LT04/C02/T1_TOA'),
    'SR': ee.ImageCollection('LANDSAT/LT04/C02/T1_L2'),
    'TIR': ['B6',]
  },
  'L5': {
    'TOA': ee.ImageCollection('LANDSAT/LT05/C02/T1_TOA'),
    'SR': ee.ImageCollection('LANDSAT/LT05/C02/T1_L2'),
    'TIR': ['B6',]
  },
  'L7': {
    'TOA': ee.ImageCollection('LANDSAT/LE07/C02/T1_TOA'),
    'SR': ee.ImageCollection('LANDSAT/LE07/C02/T1_L2'),
    'TIR': ['B6_VCID_1','B6_VCID_2']
  },
  'L8': {
    'TOA': ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA'),
    'SR': ee.ImageCollection('LANDSAT/LC08/C02/T1_L2'),
    'TIR': ['B10','B11']
  }
});
var collection = function(landsat, date_start, date_end, geometry, use_ndvi){
  // load TOA Radiance/Reflectance
  var collection_dict = ee.Dictionary(COLLECTION.get(landsat));
  var landsatTOA = ee.ImageCollection(collection_dict.get('TOA'))
                .filter(ee.Filter.date(date_start, date_end))
                .filterBounds(geometry)
                .map(masktoa);
  // load Surface Reflectance collection for NDVI
  var landsatSR = ee.ImageCollection(collection_dict.get('SR'))
                .filter(ee.Filter.date(date_start, date_end))
                .filterBounds(geometry)
                .map(masksr)
                .map(NDVI(landsat))
                .map(FVC(landsat))
                .map(NCEP_TPW)
                .map(EM(landsat,use_ndvi));
  // combine collections
  // all channels from surface reflectance collection
  // except tir channels: from TOA collection
  // select TIR bands
  var tir = ee.List(collection_dict.get('TIR'));
  var landsatALL = (landsatSR.combine(landsatTOA.select(tir),true));
  // compute the LST
  var landsatLST = landsatALL.map(LST(landsat));
  return landsatLST;
};
//----------------------------------------------------------------------------------------------------
// select region of interest, date range, and landsat satellite_______________________________________
var geometry = mlg;
var satellite = 'L7';
var date_start = '2003-01-01';
var date_end = '2013-04-01';
var use_ndvi = true;
// get landsat collection with added variables: NDVI, FVC, TPW, EM, LST
var LandsatColl1 = collection(satellite, date_start, date_end, geometry, use_ndvi)
// select region of interest, date range, and landsat satellite_______________________________________
var geometry = mlg;
var satellite = 'L8';
var date_start = '2013-04-01';
var date_end = '2020-12-31';
var use_ndvi = true;
// get landsat collection with added variables: NDVI, FVC, TPW, EM, LST
var LandsatColl2 = collection(satellite, date_start, date_end, geometry, use_ndvi)
var lst = LandsatColl1.merge(LandsatColl2);
var lst_mlg = lst.select('LST').mean().clip(mlg);
//print(lst)
// Define a date range for MODIS LST
var date = ee.DateRange('2003-01-01','2020-12-31');
var date1 = ee.DateRange('2020-01-01','2020-12-31');
var modDate = gf_mod_day.filterDate(date)
                        .select('LST_Day_1km');
// Selecting the 1km LST in day
var modDay = modDate.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});
var modDayWorld = modDay.mean().clip(world);
var modDayNational = modDay.mean().clip(idn);
var modDayRegional = modDay.mean().clip(ejv);
////////////////////////////////////////////////////////ANIMATION FUNCTION 
///////////ANIMATION FUNCTION GLOBAL
var mask_glb = ee.FeatureCollection(world);
  // Define the regional bounds of animation frames.
var global_frame = ee.Geometry.Polygon(
    [[[-170.67506502598832,-56.94497418085155],
      [172.44993497401165,-56.94497418085155],
      [172.44993497401165,84.05256097843038],
      [-170.67506502598832,84.05256097843038],
      [-170.67506502598832,-56.94497418085155]]],
    null, false
);
//Group images by composite date
gf_mod_day = modDay.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});
var DOY =  gf_mod_day.filterDate('2019-01-01', '2020-12-31');
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
var join_glb = ee.Join.saveAll('doy_matches');
var joinCol_glb = ee.ImageCollection(join_glb.apply(DOY, gf_mod_day, filter));
//Reduce composite groups
  var comp_glb = joinCol_glb.map(function(img) {
    var doyCol_glb = ee.ImageCollection.fromImages(
      img.get('doy_matches')
    );
    return doyCol_glb.reduce(ee.Reducer.median());
  });
//visualization images
  var visParams = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
///////////ANIMATION FUNCTION NATIONAL 
var mask_nat = ee.FeatureCollection(idn);
  // Define the regional bounds of animation frames.
var nasional_frame = ee.Geometry.Polygon(
  [[[94.6504593086104,-11.274519288749092],
    [141.67194368361038,-11.274519288749092],
    [141.67194368361038,6.960022111470247],
    [94.6504593086104,6.960022111470247],
    [94.6504593086104,-11.274519288749092]]],
    null, false
);
//Group images by composite date
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
var join_nat = ee.Join.saveAll('doy_matches');
var joinCol_nat = ee.ImageCollection(join_nat.apply(DOY, gf_mod_day, filter));
//Reduce composite groups
var comp_nat = joinCol_nat.map(function(img) {
   var doyCol_nat = ee.ImageCollection.fromImages(
      img.get('doy_matches')
    );
    return doyCol_nat.reduce(ee.Reducer.median());
});
///////////ANIMATION FUNCTION REGIONAL
var mask_reg = ee.FeatureCollection(ejv);
  // Define the regional bounds of animation frames.
var regional_frame = ee.Geometry.Polygon(
    [[[110.85802715519657,-8.955986168390456],
      [114.64831035832157,-8.955986168390456],
      [114.64831035832157,-6.16823179917024],
      [110.85802715519657,-6.16823179917024],
      [110.85802715519657,-8.955986168390456]]],
    null, false
);
//Group images by composite date
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
var join_reg = ee.Join.saveAll('doy_matches');
var joinCol_reg = ee.ImageCollection(join_reg.apply(DOY, gf_mod_day, filter));
//Reduce composite groups
  var comp_reg = joinCol_reg.map(function(img) {
    var doyCol_reg = ee.ImageCollection.fromImages(
      img.get('doy_matches')
    );
    return doyCol_reg.reduce(ee.Reducer.median());
  });
///////////ANIMATION FUNCTION LOKAL 
var mask_lok = ee.FeatureCollection(mlg);
  // Define the regional bounds of animation frames.
var lokal_frame = ee.Geometry.Polygon(
    [[[112.54202584150201,-8.091057171134361],
      [112.73840645673639,-8.091057171134361],
      [112.73840645673639,-7.872099302433676],
      [112.54202584150201,-7.872099302433676],
      [112.54202584150201,-8.091057171134361]]],
    null, false
);
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
var join_lok = ee.Join.saveAll('doy_matches');
var joinCol_lok = ee.ImageCollection(join_lok.apply(DOY, gf_mod_day, filter));
//Reduce composite groups
  var comp_lok = joinCol_lok.map(function(img) {
    var doyCol_lok = ee.ImageCollection.fromImages(
      img.get('doy_matches')
    );
    return doyCol_lok.reduce(ee.Reducer.median());
  });
//_______________________________________________________________
// Create side panel for hold the chart and visualization panel
// Create a panel---------------------------------------------------------------------
// Create control panel
var ctrlPanel = ui.Panel({
  style: {
    position  : 'top-right', 
    width     : '190px',
    maxHeight : '80%'
  }
});
// Create the info elements in description panel
var infoElements = ui.Panel({
  style: {
    shown : false,
    margin: '0px -9px 0px -9px'
  }
});
// Create the elements in control panel
var ctrlElements = ui.Panel({
  style: {
    shown : false,
    margin: '0px -9px 0px -9px' 
  }
});
// Create instruction panel
var insPanel = ui.Label('Klik panel di bawah ini:',
  {fontSize : '15px',
   color    : '#303030',
   margin   : '0px 0px 7px 0px'}
);
// Create a panel to hold the chart.
var chartPanel = ui.Panel();
chartPanel.style().set({
  width: '400px',
});
// Create a panel to hold the chart.
var animationPanel = ui.Panel();
animationPanel.style().set({
  width: '400px',
});
// Create show/hide info panel button
var infoButton = ui.Button(
  {label: 'Chart ❯', style: {margin: '0px 4px 0px 0px'}}
);
// Create show/hide control button panel
var ctrlButton = ui.Button(
  {label: 'Animation ❯', style: {margin: '0px 0px 0px 0px'}}
);
// Info/control button panel
var buttonPanel = ui.Panel(
  [infoButton, ctrlButton],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal', margin: '0px 0px 0px 0px'});
// Setup UI Elements//
//for show the chart
infoElements.add(chartPanel);
//for show the animation
ctrlElements.add(animationPanel);
//
ctrlPanel.add(insPanel);
ctrlPanel.add(buttonPanel);
ctrlPanel.add(infoElements);
ctrlPanel.add(ctrlElements);
infoButton.onClick(infoButtonHandler);
ctrlButton.onClick(ctrlButtonHandler);
Map.setOptions('SATELLITE');
Map.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
//_____________________________________________________________
// Make a button widget for LST Global
var button = ui.Button('Klik untuk menampilkan LST Global');
Map.add(button);
button.onClick(function(){
  Map.clear();
  Map.add(legendPanel);
  Map.add(ctrlPanel);
  Map.add(button1);
  Map.add(button2);
  Map.add(button3);
  Map.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
  chartPanel.clear();
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var scale = Map.getScale()*10;
  // Chart time series of LST
  var ts1 = ui.Chart.image.series({
  imageCollection: modDay,
  region: world,
  reducer: ee.Reducer.mean(),
  scale: scale,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Global Time Series',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  chartPanel.add(ts1);
  //Animation
  var rgbVis_glb = comp_glb.map(function(img) {
    return img.visualize(visParams).clip(mask_glb);
  });
  // Define GIF visualization parameters.
  var gifParams_glb = {
    'region': global_frame,
    'dimensions': 600,
    'framesPerSecond': 5
  };
  var anim_thumb_glb = ui.Thumbnail(rgbVis_glb, gifParams_glb);
  animationPanel.add(anim_thumb_glb);
    // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.setCenter(30, 20, 2);
Map.addLayer(modDayWorld,viz,'Temperatur Rata-rata, LST Global');
// Hide the button.
    button.style().set('shown', false);
    button1.style().set('shown', true);
    button2.style().set('shown', true);
    button3.style().set('shown', true);
});
//_____________________________________________________________
// Make a button widget for LST National.
var button1 = ui.Button('Klik untuk menampilkan LST Nasional');
Map.add(button1);
button1.onClick(function(){
  Map.clear();
  Map.add(legendPanel)
  Map.add(ctrlPanel);
  Map.add(button);
  Map.add(button2);
  Map.add(button3);
  Map.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
  chartPanel.clear();
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: modDay,
  region: idn,
  reducer: ee.Reducer.mean(),
  scale: scale,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Nasional Time Series',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  chartPanel.add(ts1);
  //Animation
  var rgbVis_nat = comp_nat.map(function(img) {
    return img.visualize(visParams).clip(mask_nat);
  });
  // Define GIF visualization parameters.
  var gifParams_nat = {
    'region': nasional_frame,
    'dimensions': 600,
    'crs': 'EPSG:4326',
    'framesPerSecond': 5
  };
  var anim_thumb_nat = ui.Thumbnail(rgbVis_nat, gifParams_nat);
  animationPanel.add(anim_thumb_nat);
    // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.centerObject(idn);
Map.addLayer(modDayNational,viz,'Temperatur Rata-rata, LST Nasional');
// Hide the button.
    button1.style().set('shown', false);
    button.style().set('shown', true);
    button2.style().set('shown', true);
    button3.style().set('shown', true);
});
//___________________________________________________________
// Make a button widget for LST Regional.
var button2 = ui.Button('Klik untuk menampilkan LST Regional');
Map.add(button2);
button2.onClick(function(){
  Map.clear();
  Map.add(legendPanel);
  Map.add(ctrlPanel);
  Map.add(button);
  Map.add(button1);
  Map.add(button3);
  Map.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
  chartPanel.clear();
    // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 2000 ? mapScale * 2 : 2000;
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: modDay,
  region: ejv,
  reducer: ee.Reducer.mean(),
  scale: 10000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST Regional Time Series',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  chartPanel.add(ts1);
  //Animation
  var rgbVis_reg = comp_reg.map(function(img) {
    return img.visualize(visParams).clip(mask_reg);
  });
  // Define GIF visualization parameters.
  var gifParams_reg = {
    'region': regional_frame,
    'dimensions': 600,
    'framesPerSecond': 5
  };
  var anim_thumb_reg = ui.Thumbnail(rgbVis_reg, gifParams_reg);
  animationPanel.add(anim_thumb_reg);
    // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.centerObject(ejv,7.5);
Map.addLayer(modDayRegional,viz,'Temperatur Rata-rata, LST Regional');
// Hide the button.
    button2.style().set('shown', false);
    button1.style().set('shown', true);
    button.style().set('shown', true);
    button3.style().set('shown', true);
});
//___________________________________________________________
// Make a button widget for LST Local.
var button3 = ui.Button('Klik untuk menampilkan LST Lokal');
Map.add(button3);
button3.onClick(function(){
  Map.clear();
  Map.add(legendPanel);
  Map.add(ctrlPanel);
  Map.add(button);
  Map.add(button1);
  Map.add(button2);
  Map.setControlVisibility(
  {layerList: false, fullscreenControl: false, zoomControl: false, drawingToolsControl: false});
  chartPanel.clear();
  // Chart time series of LST .
  var ts1 = ui.Chart.image.series({
  imageCollection: lst.select('LST'),
  region: mlg,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'LST lokal Time Series',
     interpolateNulls: true,
     curveType: 'function',
     vAxis: {title: 'LST Celsius'},hAxis: {title: 'Date'}});
  chartPanel.add(ts1);
  //Animation
  var rgbVis_lok = comp_lok.map(function(img) {
    return img.visualize(visParams).clip(mask_lok);
  });
  // Define GIF visualization parameters.
  var gifParams_lok = {
    'region': lokal_frame,
    'dimensions': 400,
    'framesPerSecond': 5
  };
  var anim_thumb_lok = ui.Thumbnail(rgbVis_lok, gifParams_lok);
  animationPanel.add(anim_thumb_lok);
    // create vizualization parameters
var viz = {min:20, max:50, palette:['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']};
// Add clipped image layer to the map.
Map.centerObject(mlg,11);
Map.addLayer(lst_mlg,viz,'Temperatur Rata-rata, LST Lokal');
// Hide the button.
    button3.style().set('shown', false);
    button1.style().set('shown', true);
    button2.style().set('shown', true);
    button.style().set('shown', true);
});
//Creates NDVI colorbar
// Create the colorbar image.
var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {bbox: [0, 0, 1, 0.1], dimensions: '400x40', format: 'png', min: 0, max: 1, palette: ['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69']},
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
//Create colorbar panel with numbers
var legendLabels = ui.Panel({
    widgets: [
      ui.Label(20),
      ui.Label(
          (50 / 2),
          {textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(50)
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//Create colorbar title
var legendTitle = ui.Label({
    value: 'Land Surface Temperature (Celcius)',
    style: {fontWeight: 'bold', textAlign:'center', stretch: 'horizontal'}
  });
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels], "flow",{padding: '0px', position: 'bottom-right'});
//Map.add(legendPanel);
// Show/hide the info panel function
var infoShow = false;
function infoButtonHandler() {
  if(infoShow) {
    infoShow = false;
    infoElements.style().set('shown', false);
    infoButton.setLabel('Chart ❯');
  } else {
    infoShow = true;
    infoElements.style().set('shown', true);
    infoButton.setLabel('Chart ❮');
  }
  if(infoShow | ctrlShow) {
    ctrlPanel.style().set('width', '400px');
  } else {
    ctrlPanel.style().set('width', '190px');
  }
}
// Show/hide the control panel function
var ctrlShow = false;
function ctrlButtonHandler() {
  if(ctrlShow) {
    ctrlShow = false;
    ctrlElements.style().set('shown', false);
    ctrlButton.setLabel('Animasi ❯');
  } else {
    ctrlShow = true;
    ctrlElements.style().set('shown', true);
    ctrlButton.setLabel('Animasi ❮');
  }
  if(infoShow | ctrlShow) {
    ctrlPanel.style().set('width', '400px');
  } else {
    ctrlPanel.style().set('width', '190px');
  }
}