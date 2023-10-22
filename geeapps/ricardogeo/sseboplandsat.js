//================================================= INPUT SETTINGS ======================================================= 
// Constants for reference ET calculation
var lhv = 2.45; // Latent Heat of Vaporization (?)
var albedo_mean = 0.23;
var Gsc_h = 4.92; // solar constant MJ.m-2.h-1
var Kt = 1.0; // turbidity coefficient (1.0 for clean air and 0.5 for extremely turbid)
var sigma = 0.000000004901; // Stefan-Boltzmann constant MJ.K-4.m-2.d-1
// Constants for SSEBop processing
var k_value = 1.2; // coefficient to scale the grass ETo to the maximum level ET for an aerodynamically rougher crop such as alfalfa
var Gsc = 1367; // solar constant W.m-2
var st_boltz = 0.0000000567; // Stefan-Boltzmann constant W.m-2.K-4
var Cp = 1004; // specific heat of air at constant pressure J.kg-1.K-1
var Cp_SSEBop = 1013; // specific heat of air at constant pressure J.kg-1.°C-1
var LST_LapseRate = 0.0065; // standard environmental lapse rate correction factor (K.m-1) to Land Surface Temperature
// Constraining parameters for producing c factor (Senay et al, 2017)
var ndvi_threshold = 0.8;
var ndvi_percent = 99; // Top % NDVI to select forested areas (where maximum Scene-NDVI is less than 0.8)
var Ts_limit_min = 270;
var Ts_limit_max = 330;
var Tdiff_min = 0;
var Tdiff_max = 30;
// ======================================== VISUALIZATION PARAMETERS =============================================
var ETa_Palette = ['#CA5C25','#BA8949', '#F6CD6C','#E0FF8B', '#90F24F', '#0AC16C','#068A3B','#23548B'];
var visET = {min: 0, max: 8, palette: ETa_Palette};
// =================================================== FUNCTIONS ========================================================
// Cloud and shadow masking
var fmask = function(img) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var qa = img.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask)
                 .eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return img.updateMask(mask);
};
// Functions to stack image colletion series into image bands  
var stackCollection = function(collection) {
  var first = ee.Image(collection.first()).select([]);
  var appendBands = function(image, previous) 
  {return ee.Image(previous).addBands(image);};
  return ee.Image(collection.iterate(appendBands, first));};
// Function to get a scene maximum value
var getSceneMax = function(img,geometry,scale){return img.reduceRegion({
    reducer:ee.Reducer.max(),
    geometry:geometry,
    scale:scale,
    bestEffort:true,
    maxPixels:1e12
  })};
// Function to convert image bands to collection
var img2col = function(datelist,img, bandname){
  var cut_list = ee.List.sequence(0, datelist.length().subtract(1), 1);
  var var_select = ee.ImageCollection(cut_list.map(function (cut) {
    var cut_end = ee.Number(cut).add(1);
      return img.slice(ee.Number(cut), cut_end).rename(bandname);}));
  return var_select.map(function(img){
            var index = ee.Number.parse(img.get('system:index'));
            var dateStr = datelist.get(index);
            var d = ee.Date(dateStr);
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y,'system:time_start':millis});
}).sort('system:time_start', true);
};
// Function to set a month property into a ImageCollection
var setMonth = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var m = ee.Number(d.get('month'));
            return img.set({'month':m});
};
var setYear = function(img){
            var d = ee.Date(img.get('system:time_start'));
            var millis = d.millis();
            var y = ee.Number(d.get('year'));
            return img.set({'year':y});
};
// Datelist Functions
var getYearsDateList = function(y){return ee.Date.fromYMD(y,1,1).format('yyyy-MM-dd')}; 
var setYearsNames = function(list){return ee.String('year_').cat(ee.Number(list).int())};
var getDateList = function(d1,d2){return ee.List.sequence(ee.Date(d1).millis(),ee.Date(d2).millis(),1000 * 60 * 60 * 24).map(function(list){
  return ee.Date(list).format('yyyy-MM-dd')})};
// Create ETa chart function
var create_ETaChart = function(img, Panel, panelOrder){
  var chart = ui.Chart.image.series(img.select(['ETa_elvi','ET0']), point, ee.Reducer.mean(), 90);
  chart.setOptions({
    title: 'daily ETa for period: '+StartYear+' to '+EndYear+'.',
    vAxis: {title: 'mm / day'},
    hAxis:{title: 'date'},
    colors: ['Green','Red'],
    lineWidth: 1,
    pointSize: 0,
    });
  Panel.widgets().set(panelOrder, chart);
};
// ------------------------------------------------------ LANDSAT HARMONIZATION FUNCTIONS (START) ---------------------------------------------------
// Define coefficients supplied by Roy et al. (2016) for translating ETM+
// surface reflectance to OLI surface reflectance.
var coefficients = {
  itcps: ee.Image.constant([0.0003, 0.0088, 0.0061, 0.0412, 0.0254, 0.0172]).multiply(10000),
  slopes: ee.Image.constant([0.8474, 0.8483, 0.9047, 0.8462, 0.8937, 0.9071])
};
// Define function to get and rename bands of interest from OLI.
function renameOLI(img) {
  return img.select(
		['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B10', 'pixel_qa'],
		['blue','green','red','nir','swir1','swir2','BT', 'pixel_qa']
	);
}
// Define function to get and rename bands of interest from ETM+.
function renameETM(img) {
  return img.select(
		['B1', 'B2', 'B3', 'B4', 'B5', 'B7','B6', 'pixel_qa'],
		['blue','green','red','nir','swir1','swir2','BT', 'pixel_qa']
  );
}
// Define function to apply harmonization transformation.
var etm2oli = function(img) {
  return img.select(['blue','green','red','nir','swir1','swir2'])
    .multiply(coefficients.slopes)
    .add(coefficients.itcps)
    .round()
    .toShort()
    .addBands([img.select('BT'), img.select('pixel_qa')]
  ).copyProperties(img,img.propertyNames());
};
// ------------------------------------------------------ LANDSAT HARMONIZATION FUNCTIONS (END) ---------------------------------------------------
//========================================================= PROCESSING STEP FUNCTIONS ======================================================
// Function to compute Spectral Indices over SR collection
var computeNDVI = function(img){
  var green = img.select('green').multiply(0.0001);
  var red = img.select('red').multiply(0.0001);
  var nir = img.select('nir').multiply(0.0001);
  var swir1 = img.select('swir1').multiply(0.0001);
  var ndvi = img.normalizedDifference(['nir','red']);
  var mndwi = img.expression('(green - swir1)/(green + swir1)',
    {'green':green,'swir1':swir1});
  return img.addBands([
    ndvi.float().rename('NDVI'),
    mndwi.float().rename('MNDWI')
    ]).copyProperties(img,img.propertyNames());
};
// Function to compute Albedo
var computeAlbedo = function(img){
  var reflect = img.select(['blue','green','red','nir','swir1','swir2']).multiply(0.0001);
  var satname = img.get('SATELLITE');
  var weightL57 = ee.Image.constant([0.254,0.149,0.147,0.311,0.103,0.036]);
  var weightL8 = ee.Image.constant([0.246,0.146,0.191,0.304,0.105,0.008]);
  var albedo = ee.Algorithms.If(ee.Algorithms.IsEqual(satname, 'LANDSAT_8'), 
    reflect.multiply(weightL8).reduce(ee.Reducer.sum()).rename('albedo'), 
    reflect.multiply(weightL57).reduce(ee.Reducer.sum()).rename('albedo'));
  return img.addBands(albedo)
    .copyProperties(img,img.propertyNames());
};
// Compute Land Surface Emissivity (LSE) using NDVI-based approach (NDVI-THM)
// (Sobrino et. al. 2004; Sobrino et. al. 2008)
// LSE for Landsat TM, ETM
var computeLSE_L57 = function(img){
  var BT = img.select('BT');
  // Compute NDVI-based surface emissivity
  var F = ee.Image.constant(0.55);
  var ew = ee.Image.constant(0.9885);// emissivity for water (Prats et al 2018, Lamaro et al 2013, Simon et al 2014)
  var es = ee.Image.constant(0.97);// emissivity for soil (Sobrino et al 2004)
  var ev = ee.Image.constant(0.99);// emissivity for vegetation (Sobrino et al 2004)
  var mndwi = img.select('MNDWI');
  var ndvi = img.select('NDVI');
  var ndvi_soil = ee.Image.constant(0.2);// according to Sobrino et al 2004
  var ndvi_veg = ee.Image.constant(0.86);// according to Prihodko and Goward (1997), Tang et al. (2010)
  var Fv_mix = img.expression('((NDVI - NDVIs)/(NDVIv - NDVIs))**2',
    {'NDVI':ndvi,'NDVIs':ndvi_soil,'NDVIv':ndvi_veg});
  var Fv = Fv_mix.where(ndvi.lt(ndvi_soil),0).where(ndvi.gt(ndvi_veg),1);
  var C = Fv.expression('(1-es)*ev*F*(1-Fv)',{'es':es,'ev':ev,'F':F,'Fv':Fv});
  var e_mix = Fv.expression('ev*Fv+es*(1-Fv)+C',{'es':es,'Fv':Fv,'ev':ev,'C':C});
  var LSE = es.where(mndwi.gt(0),ew).where(ndvi.gt(ndvi_soil),e_mix).where(ndvi.gt(ndvi_veg),ev);
  return img.addBands([LSE.rename('LSE'),BT]).copyProperties(img,img.propertyNames());
};
// LSE for Landsat 8 TIRS
var computeLSE_L8 = function(img){
  var BT = img.select('BT');
  // Compute NDVI-based Land Surface Emissivity (LSE)
  var F = ee.Image.constant(0.55);
  var ew = ee.Image.constant(0.991);// Band 10 - emissivity for water (Wang et. al 2015)
  var es = ee.Image.constant(0.966);// Band 10 - emissivity for soil (Wang et. al 2015)
  var ev = ee.Image.constant(0.973);// Band 10 - emissivity for vegetation (Wang et. al 2015)
  var mndwi = img.select('MNDWI');
  var ndvi = img.select('NDVI');
  var ndvi_soil = ee.Image.constant(0.2);// according to Sobrino et al 2004
  var ndvi_veg = ee.Image.constant(0.86);// according to Prihodko and Goward (1997), Tang et al. (2010)
  var Fv_mix = img.expression('((NDVI - NDVIs)/(NDVIv - NDVIs))**2',
    {'NDVI':ndvi,'NDVIs':ndvi_soil,'NDVIv':ndvi_veg});
  var Fv = Fv_mix.where(ndvi.lt(ndvi_soil),0).where(ndvi.gt(ndvi_veg),1);
  var C = Fv.expression('(1-es)*ev*F*(1-Fv)',{'es':es,'ev':ev,'F':F,'Fv':Fv});
  var e_mix = Fv.expression('ev*Fv+es*(1-Fv)+C',{'es':es,'Fv':Fv,'ev':ev,'C':C});
  var LSE = es.where(mndwi.gt(0),ew).where(ndvi.gt(ndvi_soil),e_mix).where(ndvi.gt(ndvi_veg),ev);
  return img.addBands([LSE.rename('LSE'),BT]).copyProperties(img,img.propertyNames());
};
// Compute LandSurface Temperature (LST)
var computeLST = function(img){
  // Create a mask for each image
  var background = img.select(0).unmask(-9999);
  var mask = background.neq(-9999).selfMask();
  // Input parameters
  var DEM_scene = DEM.updateMask(mask);
  var satname = img.get('SATELLITE');
  var albedo = img.select('albedo');
  var BT = img.select('BT').multiply(0.1);
  var LSE = img.select('LSE');
  var wlgth = ee.Algorithms.If(ee.Algorithms.IsEqual(satname, 'LANDSAT_8'), 
    ee.Image.constant(0.000010895).rename('wlgth'), ee.Image.constant(0.00001145).rename('wlgth'));
  var p = ee.Image.constant(0.01438);
  // Compute LST using NDVI-based LSE
  var LST = BT.expression('BT/(1+((wlgth * BT/p)*log(LSE)))',
    {'BT':BT,'wlgth':wlgth,'p':p,'LSE':LSE});
  // Compute the Elevation Lapse-rate for LST correction (Senay et al.2011)
  var default_lapse_rate = ee.Image(LST_LapseRate);
  // LST correction (For high albedo and Lapse-rate)
  var LST_correction_factor = (mask.multiply(100)).multiply(albedo.subtract(0.25)).unmask(0).updateMask(mask); // Only for albedo > 0.25
  var LST_cor = LST.where(albedo.gt(0.25),LST.add(LST_correction_factor));
  var LST_delapsed = LST_cor.add(default_lapse_rate.multiply(DEM_scene));
  return img.addBands([
    BT.float(),
    LST.float().rename('LST'),
    LST_cor.float().rename('LST_cor'),
    LST_delapsed.float().rename('LST_delapsed')
    ]).copyProperties(img,img.propertyNames());
};  
// Function to compute Clear-Sky Net Radiation (Rn) for bare soil conditions  (FAO56 - Allen et al., 1998)
var computeRn = function(img){
  // Create a mask for each image
  var background = img.select(0).unmask(-9999);
  var mask = background.neq(-9999).selfMask();
  // Create time data for each image in collection
  var d = ee.Date(ee.Number(img.get('system:time_start')));
  var date = d.format('yyyy-MM-dd');
  var doy = img.date().getRelative('day', 'year');
  var doyBand = ee.Image.constant(doy).add(1).uint16().rename('DOY');
  // Generate Latitude raster
  var Lat = ee.Image.pixelLonLat().select('latitude');
  var Lat_rad = Lat.multiply(0.0174532925199433);
  var Long = ee.Image.pixelLonLat().select('longitude');
  var Long_rad = Long.multiply(0.0174532925199433);
  // Compute astronomical parameters
  var es_dist = img.expression('1+0.033*cos(2*PI/365*DOY)',{'DOY':doyBand,'PI':3.14159265358979});
  var sun_decl_rad = img.expression('0.409*sin((2*PI/365)*DOY-1.39)',{'DOY':doyBand,'PI':3.14159265358979});
  var sunset_h_rad = img.expression('acos(-tan(Lat) * tan(decl))',{'Lat':Lat_rad,'decl':sun_decl_rad});
  // extraterrestrial radiation (Ra)
  var Ra = img.expression(
    '24/3.14159265358979 * Gsc * dr * (ws * sin(Lat) * sin(decl) + cos(Lat) * cos(decl) * sin(ws))', 
    {'Gsc': Gsc_h, 'dr': es_dist,'ws': sunset_h_rad, 'Lat': Lat_rad, 'decl': sun_decl_rad,});
  // incoming solar radiation (Rs)
  var Rs = Ra.multiply(DEM.multiply(0.00002).add(0.75)).updateMask(mask);
  // Net Radiation
  var Rns = Rs.multiply(ee.Number(1).subtract(albedo_mean));
  var Rs_Rso = ee.Image(1.0);
  var fcd_day = ee.Image(1.35).multiply(Rs_Rso).subtract(ee.Image(0.35));
  var fcd = fcd_day.where(Rs_Rso.lt(0.3),ee.Image(0.0));
  var Rnl = img.expression('sigma*((Tmax**4 + Tmin**4)/2)*(0.34-0.14*sqrt(ea))*fcd',
    {'sigma':sigma,'fcd':fcd,'ea':EA_kPa.select(date),'Tmax':TMAX_K.select(date),'Tmin':TMIN_K.select(date)});
  var Rn = Rns.subtract(Rnl);
  var Rn_Wm2 = Rn.multiply(ee.Number(1000000).divide(ee.Number(86400))); // Conversion from MJ.m².d to W.m²
  return img.addBands(Rn_Wm2.float().rename('Rn_Wm2').updateMask(mask))
    .copyProperties(img,img.propertyNames());
};
// Function to compute SSEBop model
var computeSSEBop = function(img){
  // Create a mask for each image
  var background = img.select(0).unmask(-9999);
  var mask = background.neq(-9999).selfMask();
  // Create time data for each image in collection
  var d = ee.Date(ee.Number(img.get('system:time_start')));
  var date = d.format('yyyy-MM-dd');
  // Input parameters from computeNDVI, computeLST and computeRn functions
  var ndvi = img.select('NDVI');
  var Ts = img.select('LST');
  var Ts_cor = img.select('LST_cor');
  var Ts_delapsed = img.select('LST_delapsed');
  var DEM_scene = DEM.updateMask(mask);
  var Rn_Wm2 = img.select('Rn_Wm2');
  // NDVI threshold
  var ndvi_thres_default = mask.multiply(ndvi_threshold);
  var ndvi_thres_percent = ndvi.reduceRegion({
    reducer:ee.Reducer.percentile([ndvi_percent]),
    geometry:img.geometry(),
    scale:600,
    bestEffort:true,
    maxPixels:1e12
  }).toImage().updateMask(mask);
  var ndvi_max = ndvi.reduceRegion({
    reducer:ee.Reducer.max(),
    geometry:img.geometry(),
    scale:600,
    bestEffort:true,
    maxPixels:1e12
  }).toImage().updateMask(mask);
  var ndvi_threshold_final = ndvi_thres_default.where(ndvi_max.lt(ndvi_thres_default),ndvi_thres_percent);
  // Generate constraints masks
  var mask_ndvi_limits = ndvi.gte(ndvi_threshold_final).selfMask();
  var mask_Ts_limits_min = Ts_cor.gte(Ts_limit_min).selfMask();
  var mask_Ts_limits_max = Ts_cor.lt(Ts_limit_max).selfMask();
  var mask_Ts_limits = mask_Ts_limits_min.multiply(mask_Ts_limits_max);
  var Tdiff_ini = (TMAX_K.select(date).subtract(Ts_cor)).updateMask(mask);
  var mask_Tdiff_limits = ((Tdiff_ini.gte(0)).bitwiseAnd(Tdiff_ini.lte(30))).selfMask();
  var veget_mask = mask_ndvi_limits.multiply(mask_Ts_limits).multiply(mask_Tdiff_limits);
  // Compute c factor
  var Tair_max_forest_temp = TMAX_K.select(date).updateMask(veget_mask);
  var Ts_forest = Ts_cor.mask(veget_mask);
  var Tcorr = Ts_forest.divide(Tair_max_forest_temp);
  var c_factor = Tcorr.reduceRegion({
    reducer:ee.Reducer.mean(),
    geometry:img.geometry(),
    scale:100,
    bestEffort:true,
    maxPixels:1e12
  }).toImage().updateMask(mask);
  // Compute Cold and Hot Boundary Condition
  var P_kPa = img.expression('101.3*((293-0.0065*z)/293)**5.26',{'z': DEM_scene});
  var T_cold = c_factor.multiply(TMAX_K.select(date));
  var dens_air = ee.Image(3.486).multiply(P_kPa.divide(ee.Image(1.01).multiply(TMEAN_C.select(date).add(273))));
  var rah_fix = ee.Image(110);
  var dT = (Rn_Wm2.multiply(rah_fix)).divide(dens_air.multiply(Cp_SSEBop)).resample('bilinear');
  var T_hot = T_cold.add(dT);
  // Compute ET fraction
  var adjustETf = function(img){
    return (img.where(img.lt(0),0)).where(img.gt(1.3),1.3)};
  // Original ET fraction by SSEBop
  var ETf = adjustETf(((T_hot.subtract(Ts_cor)).divide(T_hot.subtract(T_cold))));
  // ET fraction adjusted for elevation (Senay et al, 2011; Senay et al, 2013)
  var ETf_el = adjustETf(((T_hot.subtract(Ts_delapsed)).divide(T_hot.subtract(T_cold))));
  // ET fraction adjusted using vegetation index (NDVI) (Senay et al, 2011)
  var ndvi_vi = ndvi.where(ndvi.lt(0),0);
  var vi_factor = ((mask.multiply(0.35)).multiply(ndvi_vi.divide(0.7)).add(0.65));
  var ETf_vi = adjustETf(vi_factor.multiply(ETf));
  // ET fraction adjusted for elevation and vegetation index (NDVI)
  var ETf_elvi = adjustETf(vi_factor.multiply(ETf_el));
  // Compute ETa from ETf methods
  var adjustETa = function(img){return (img.where(img.lt(0),0))};
  var ETa = adjustETa(ETf.multiply(k_value).multiply(ET0.select(date)));
  var ETa_el = adjustETa(ETf_el.multiply(k_value).multiply(ET0.select(date)));
  var ETa_vi = adjustETa(ETf_vi.multiply(k_value).multiply(ET0.select(date)));
  var ETa_elvi = adjustETa(ETf_elvi.multiply(k_value).multiply(ET0.select(date)));
  return c_factor.float().rename('c_factor').addBands([
    T_cold.float().rename('T_cold'),
    T_hot.float().rename('T_hot'),
    Ts_delapsed.float().rename('LST'),
    dT.float().rename('dT'),
    ndvi.float().rename('NDVI'),
    //ETf.float().rename('ETf'),
    ETf_elvi.float().rename('ETf_elvi'),
    //ETa.float().rename('ETa'),
    ETa_elvi.float().rename('ETa_elvi'),
    ET0.select(date).rename('ET0')
    ]).copyProperties(img,['system:time_start']);
};
//===================================================== MAIN COLLECTIONS =================================================================== 
// Paraiba do Sul basin limits (from ANA ottobacias)
var BHPS = ee.FeatureCollection('users/ricardogeo/BH_ParaibaDoSul');
var WRS_Landsat = ee.FeatureCollection('users/ricardogeo/WRS_Brasil');
// LandCover from Mapbiomas project (Collection 3.1)
var mapbiomas = ee.Image('projects/mapbiomas-workspace/public/collection3_1/mapbiomas_collection31_integration_v1');
// Input Digital Elevation Model (DEM)
var DEM = ee.Image('USGS/SRTMGL1_003');
//----------------------------------------------- PROCESSED USER DATA (ricardogeo ASSET) --------------------------------------------------------------------  
// Create date list (yyyy-mm-dd) for rename ASSET images
var DateList1987to2017 = getDateList('1987-01-01','2017-12-31'); 
//var DateListStartYeartoEndYear = getDateList(StartYear+'-01-01',EndYear+'-12-31'); 
// Daily ET0 from 1987 to 2017 (CFSv2) for BHPS
var ET0 = ee.Image('users/ricardogeo/CFSv2_daily/ET0_grass_24h_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
// Daily Weather parameters  from 1987 to 2017 (CFSv2) for BHPS
var TMIN_K = ee.Image('users/ricardogeo/CFSv2_daily/Tmin_daily_min_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
var TMAX_K = ee.Image('users/ricardogeo/CFSv2_daily/Tmax_daily_max_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
var TMEAN_K = ee.Image('users/ricardogeo/CFSv2_daily/Tair_daily_mean_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
var PSURF = ee.Image('users/ricardogeo/CFSv2_daily/Psurf_daily_mean_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
var QAIR = ee.Image('users/ricardogeo/CFSv2_daily/Qair_daily_mean_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
var SRDWN = ee.Image('users/ricardogeo/CFSv2_daily/SWdown_daily_mean_1987_to_2017').rename(DateList1987to2017).resample('bilinear');
// Unit conversions
var TMIN_C = TMIN_K.subtract(273.15);
var TMAX_C = TMAX_K.subtract(273.15);
var TMEAN_C = TMEAN_K.subtract(273.15);
var PSURF_kpa = PSURF.multiply(0.001);
 // Compute actual vapor pressure (kPa)
var EA_kPa = TMIN_C.expression('exp((17.27 * T) / (T + 237.3))',{'T': TMIN_C});
// ================================================= CREATE PANELS ================================================
// Create a Map panel.
var mapPanel = ui.Map();
mapPanel.centerObject(BHPS,8);
mapPanel.setOptions("SATELLITE");  
mapPanel.style().set('cursor', 'crosshair');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '610px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Landsat-based actual evapotranspiration using SSEBop model.',
    style: {fontSize: '16px', fontWeight: 'bold'}
  }),
  ui.Label('                        ')
]);
panel.widgets().set(1,intro);
//mapPanel.add(ui.Label('Click a point on the map to show time-series plots'));
// Create a second panel to hold the legends.
var panel2 = ui.Panel();
panel2.style().set('width', '210px');
// Create the first legend title.
var panel2Title =  ui.Panel([
  ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '4px',
    padding: '4px'
    }
  })
]);
panel2.add(panel2Title);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
// For ET
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(ETa_Palette),
  style: {stretch: 'horizontal', margin: '0px 4px', maxHeight: '15px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visET.min),
    ui.Label(('mm/day'),{textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visET.max)
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label('Long-Term daily ETa');
var legendETa = ui.Panel([legendTitle, colorBar, legendLabels]);
legendETa.style().set('width', '230px').set('position','bottom-center');
// Insert References and Notes
var panelLinks = ui.Panel();
// References hyperlinks
var reflink1 = ui.Label('Senay et al (2011). Enhancing the Simplified Surface Energy'+
  ' Balance (SSEB) approach for estimating landscape ET: Validation with the METRIC model.')
  .setUrl('https://www.sciencedirect.com/science/article/abs/pii/S0378377410003355');
var reflink2 = ui.Label(
  'Senay et al (2013). Operational Evapotranspiration Mapping Using Remote Sensing'+
  ' and Weather Datasets: A New Parameterization for the SSEB Approach.')
  .setUrl('https://onlinelibrary.wiley.com/doi/full/10.1111/jawr.12057');
var reflink3 = ui.Label('Senay (2018). Satellite Psychrometric Formulation of the'+
  ' Operational Simplified Surface Energy Balance (SSEBop) Model for Quantifying and'+
  ' Mapping Evapotranspiration.')
  .setUrl('https://elibrary.asabe.org/abstract.asp?aid=48975');
// Notes texts and hyperlinks
var text1_1 = ui.Label('1: Actual ET (ETa) derived from SSEBop model using'); 
var LandsatLink = ui.Label('Landsat collection.').setUrl('https://developers.google.com/earth-engine/datasets/catalog/landsat');
var text2_1 = ui.Label('2: Reference ET (ET0) derived from');
var NCEPlink = ui.Label('NCEP/CFSv2 6h products.').setUrl('https://developers.google.com/earth-engine/datasets/catalog/NOAA_CFSV2_FOR6H');
// References title
var title_references = ui.Label({
  value: 'References:',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '4px',
    padding: '4px',
    }
});
panelLinks.add(ui.Label('______________________________________________________________________________________'));
panelLinks.add(title_references);
panelLinks.add(reflink1);
panelLinks.add(reflink2);
panelLinks.add(reflink3);
panelLinks.add(ui.Label('______________________________________________________________________________________'));
panelLinks.add(ui.Label({value:'Notes',style: {fontWeight: 'bold'}}));
panelLinks.add(ui.Panel([text1_1, LandsatLink], ui.Panel.Layout.flow('horizontal',true)));
panelLinks.add(ui.Panel([text2_1, NCEPlink], ui.Panel.Layout.flow('horizontal',true)));
// Add Textboxes for input parameters to Map
var EnterDate = ui.Textbox({placeholder: 'Enter a Date (yyyy-mm-dd)...',value: ''});
var EnterStartYear = ui.Textbox({placeholder: 'Enter Start Year...',value: ''});
var EnterEndYear = ui.Textbox({placeholder: 'Enter End Year...',value: ''});
var EnterPath = ui.Textbox({placeholder: 'Enter Path...',value: ''});
var EnterRow = ui.Textbox({placeholder: 'Enter Row...',value: ''});
var EnterCloud = ui.Textbox({placeholder: 'Enter Cloud Cover...',value: ''});
EnterStartYear.onChange(function(StartYear){mapPanel.clear();
  EnterEndYear.onChange(function(EndYear){mapPanel.clear();
    EnterPath.onChange(function(Path){mapPanel.clear();
      EnterRow.onChange(function(Row){mapPanel.clear();
        EnterCloud.onChange(function(cloudCover){mapPanel.clear();
          var colFilter = ee.Filter.and(
            ee.Filter.calendarRange(ee.Number.parse(StartYear),ee.Number.parse(EndYear),'year'),
              ee.Filter.eq('WRS_PATH',ee.Number.parse(Path)), ee.Filter.eq('WRS_ROW',ee.Number.parse(Row)),
              ee.Filter.lt('CLOUD_COVER_LAND', ee.Number.parse(cloudCover)),
              ee.Filter.neq('LANDSAT_ID','LT05_L1TP_217075_20010326_20161212_01_T1')
              );
          var L5_SR_col = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').filter(colFilter)
          .map(renameETM).map(fmask).map(etm2oli).map(computeNDVI).map(computeLSE_L57);
          var L7_SR_col = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').filter(colFilter)
          .map(renameETM).map(fmask).map(etm2oli).map(computeNDVI).map(computeLSE_L57);
          var L8_SR_col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filter(colFilter)
          .map(renameOLI).map(fmask).map(computeNDVI).map(computeLSE_L8);
          // Merge SR Landsat collections for whole period
          var Landsat_Collection = L5_SR_col.merge(L7_SR_col).merge(L8_SR_col).sort('system:time_start', true);
          // Compute functions over Landsat collection
          var input_data = Landsat_Collection
            .map(computeAlbedo)
            .map(computeLST)
            .map(computeRn);
          // Execute SSEBop function 
          var SSEBop_model = input_data.map(computeSSEBop);
          var ETa_col = SSEBop_model.select('ETa_elvi');
          var ETa_LT = SSEBop_model.select('ETa_elvi').mean();
          var ETa_LT_map = ui.Map.Layer(ETa_LT,visET,'Long-Term daily ETa: '+StartYear+' to '+EndYear);
          var ETa_col_map = ui.Map.Layer(ETa_col,visET,'map',false);
          var title_map = ui.Label('Period: '+StartYear+'-'+EndYear+'. '+'Path/Row: '+Path+'/'+Row+'. '+'Scenes: '+Landsat_Collection.size().getInfo());
          mapPanel.remove(ETa_LT_map);
          mapPanel.widgets().set(1,title_map);
          mapPanel.widgets().set(2,legendETa);
          mapPanel.layers().set(1, ETa_LT_map);
          mapPanel.centerObject(Landsat_Collection,10);
          // Create panels to hold lon/lat values.
          var lon = ui.Label();
          var lat = ui.Label();
          panel.widgets().set(11, ui.Label({value: 'Clicked Location (Click on map):',style:{fontWeight: 'bold'}}));
          panel.widgets().set(12, ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
          var generateChart = function(coords) {
          // Update the lon/lat panel with values from the click event.
            lon.setValue('lon: ' + coords.lon.toFixed(2)),
            lat.setValue('lat: ' + coords.lat.toFixed(2));
            // Add a red dot for the point clicked on.
            var point = ee.Geometry.Point(coords.lon, coords.lat);
            var dot = ui.Map.Layer(point, {color: 'Red'}, 'clicked location');
            mapPanel.layers().set(1, dot);
            var ETchart = ui.Chart.image.series(SSEBop_model.select(['ETa_elvi','ET0']), point, ee.Reducer.mean(), 90);
            ETchart.setSeriesNames('ETa',1).setOptions({
              title: 'Daily ET: '+StartYear+' to '+EndYear+'. '+'Path/Row: '+Path+'/'+Row,
              vAxis: {title: 'mm / day'},
              hAxis:{title: 'date'},
              colors: ['Green','Red'],
              lineWidth: 1,
              pointSize: 1,
              });
            panel.widgets().set(13, ETchart);
            var ETfNDVIchart = ui.Chart.image.series(SSEBop_model.select(['ETf_elvi','NDVI']), point, ee.Reducer.mean(), 90);
            ETfNDVIchart.setSeriesNames('ETf',0).setOptions({
              title: 'Daily ET fraction and NDVI: '+StartYear+' to '+EndYear+'. '+'Path/Row: '+Path+'/'+Row,
              hAxis:{title: 'date'},
              colors: ['Blue','Green'],
              lineWidth: 1,
              pointSize: 1,
              });
            panel.widgets().set(14, ETfNDVIchart);
            var LSTchart = ui.Chart.image.series(SSEBop_model.select(['LST','T_cold','T_hot']), point, ee.Reducer.mean(), 90);
            LSTchart.setOptions({
              title: 'Daily Cold and Hot boundaries: '+StartYear+' to '+EndYear+'. '+'Path/Row: '+Path+'/'+Row,
              vAxis: {title: 'Kelvin'},
              hAxis:{title: 'date'},
              colors: ['Black','Blue','Red'],
              lineWidth: 1,
              pointSize: 1,
              });
            panel.widgets().set(15, LSTchart);
            var cFactorchart = ui.Chart.image.series(SSEBop_model.select(['c_factor']), point, ee.Reducer.mean(), 90);
            cFactorchart.setSeriesNames('c-factor',0).setOptions({
              title: 'Daily SSEBop c-factor: '+StartYear+' to '+EndYear+'. '+'Path/Row: '+Path+'/'+Row,
              hAxis:{title: 'date'},
              colors: ['Black'],
              lineWidth: 0,
              pointSize: 2,
              });
            panel.widgets().set(16, cFactorchart);
            panel.widgets().set(17, panelLinks);
          };
          mapPanel.onClick(generateChart);
        });
      });
    });
  });
});
// Button to refresh the Map
var CreateMapButton = ui.Button({
  label: 'Generate Map',
  onClick: function() {
    EnterStartYear.setValue(EnterStartYear.getValue());
    EnterEndYear.setValue(EnterEndYear.getValue());
    EnterPath.setValue(EnterPath.getValue());
    EnterRow.setValue(EnterRow.getValue());
    EnterCloud.setValue(EnterCloud.getValue());
    }, style: {width:'150px',textAlign:'center',fontSize :'18px',fontWeight:'bold',color:'Green'}
});
var panelButtonETa = ui.Panel();
panelButtonETa.style()
  .set('width', '600px')
  .set('margin', '5px');
panelButtonETa.add(CreateMapButton);
// Button to refresh the Map
var ClearButton = ui.Button({
  label: 'Clear Map',
  onClick: function() {
    mapPanel.clear();
    EnterStartYear.setValue('',false);
    EnterEndYear.setValue('',false);
    EnterPath.setValue('',false);
    EnterRow.setValue('',false);
    EnterCloud.setValue('',false);
    mapPanel.centerObject(BHPS,8);
    mapPanel.setOptions("SATELLITE");
    mapPanel.style().set('cursor', 'crosshair');
    },
  style: {width:'150px',textAlign:'center',fontSize :'16px',fontWeight:'bold',color:'Red'}
});
var panelButton = ui.Panel();
panelButton.style()
  .set('width', '600px')
  .set('margin', '5px');
panelButton.add(ClearButton);
// Add Textboxes, Chekboxes and button widgets on the right panel.
panel.widgets().set(2, ui.Label('Type the Start and End year (between 1987 and 2017):'));
panel.widgets().set(3, ui.Panel([
  EnterStartYear.setValue('',false), EnterEndYear.setValue('',false)], 
  ui.Panel.Layout.flow('horizontal',true))); 
panel.widgets().set(4, ui.Label('Type the Landsat WRS Path and Row:'));
panel.widgets().set(5, ui.Panel([
  EnterPath.setValue('',false), EnterRow.setValue('',false)], 
  ui.Panel.Layout.flow('horizontal',true))); 
panel.widgets().set(6, ui.Label('Type the scene cloud cover (%):'));
panel.widgets().set(7, EnterCloud.setValue('',false));
panel.widgets().set(8, ui.Panel([CreateMapButton, ClearButton], ui.Panel.Layout.flow('horizontal',true))); 
panel.widgets().set(9, ui.Label({
  value: 'Attention:', style:{fontWeight: 'bold', color: 'Red'}}));
panel.widgets().set(10, ui.Label({
  value: '- This application works for Landsat scenes that cover the Paraíba do Sul river basin'+
  ' (216/74, 216/75, 216/76, 217/74, 217/75, 217/76, 218/75, 218/76 and 219/76).',
  style:{color: 'Red'}}));
panel.widgets().set(11, ui.Label({
  value: '- If the processing time is too long, reduce the time range and/or the cloud cover threshold.',
  style:{color: 'Red'}}));
ui.root.clear();
ui.root.add(ui.SplitPanel(panel, mapPanel));