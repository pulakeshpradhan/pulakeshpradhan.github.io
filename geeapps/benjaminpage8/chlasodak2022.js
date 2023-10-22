var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -104.02549926624754,
                45.99986206769063
              ],
              [
                -104.02549926624754,
                42.523776744804074
              ],
              [
                -96.31309692249754,
                42.523776744804074
              ],
              [
                -96.31309692249754,
                45.99986206769063
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-104.02549926624754, 45.99986206769063],
          [-104.02549926624754, 42.523776744804074],
          [-96.31309692249754, 42.523776744804074],
          [-96.31309692249754, 45.99986206769063]]], null, false);
Map.centerObject(geometry, 7)
// S2 image search time constraint
var startMonth = 6;
var endMonth = 9;
var startYear = 2022;
var endYear = 2022; 
// or //
// target specific time frame
//start date
var startDate = '2019-06-01';
//end date
var endDate = '2019-09-30';
// cloud filter
var cloudPerc = 0.1; 
// target image index (from console)
var target_image_number = 0;
var tileNum = '10TEN';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import Collections //w
// sentinel-2
var MSI = ee.ImageCollection('COPERNICUS/S2_HARMONIZED');
// toms / omi
var ozone = ee.ImageCollection('TOMS/MERGED');
var JRC = ee.Image('JRC/GSW1_1/GlobalSurfaceWater')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var pi = ee.Image(3.141592);
var mask = JRC.select('occurrence').gt(30)
mask = mask.updateMask(mask.eq(1))
// filter sentinel 2 collection
var FC_S2A = MSI
  //.filterMetadata('MGRS_TILE', 'equals', tileNum)
  .filterBounds(geometry)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', "less_than", cloudPerc)
  .filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
  .filter(ee.Filter.calendarRange(startYear, endYear, 'year'))
  .filterMetadata('SPACECRAFT_NAME', 'equals', 'Sentinel-2A')
  .sort('system:time_start')
var FC_S2A_List = FC_S2A.toList(100000)
print(FC_S2A_List, 'S2A')
// filter sentinel 2 collection
var FC_S2B = MSI
  //.filterMetadata('MGRS_TILE', 'equals', tileNum)
  .filterBounds(geometry)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', "less_than", cloudPerc)
  .filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
  .filter(ee.Filter.calendarRange(startYear, endYear, 'year'))
  .filterMetadata('SPACECRAFT_NAME', 'equals', 'Sentinel-2B')
  .sort('system:time_start')
var FC_S2B_List = FC_S2B.toList(100000)
print(FC_S2B_List, 'S2B')
// merge s2a and s2b image collections
var FC_combined = FC_S2A.merge(FC_S2B).sort('system:time_start');
print(FC_combined, 'FC_combined')
var FCList = FC_combined.toList(100000)
var target_image = ee.Image(FCList.get(target_image_number))
var outputGeometry = target_image.select('B1').geometry();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Collection Processing //
// atmospheric correction for S2A
var Rrs_S2A = FC_S2A.map(MAIN_S2A);
// atmopsheric correction for S2B
var Rrs_S2B = FC_S2B.map(MAIN_S2B);
// Merge S2A + S2B collections
var Rrs_AB_combined = Rrs_S2A.merge(Rrs_S2B).sort('system:time_start')
// Merged List
var combinedList = Rrs_AB_combined.toList(1000000)
print(Rrs_AB_combined, 'combined Rrs imagery')
var target_rrs_image = ee.Image(combinedList.get(target_image_number));
var index = Rrs_AB_combined.map(ndci)
print(index, 'index')
var index_list = index.toList(1000000);
var target_index = ee.Image(index_list.get(target_image_number));
var bbp = Rrs_AB_combined.map(backscatter);
print(bbp, 'bbp')
var z = Rrs_AB_combined.map(waterClarity)
print(z, 'z')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Map Layers //
//Map.centerObject(geometry, 7)
Map.addLayer(ee.Image(0).clip(geometry), {min: 0, max: 1}, 'black background', false)
Map.addLayer(ee.Image(1).clip(geometry), {min: 0, max: 1}, 'white background', false)
// Map.addLayer(target_image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'rgb ioi', false)
// Map.addLayer(target_rrs_image.select('B1'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B1', false)
// Map.addLayer(target_rrs_image.select('B2'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B2', false)
// Map.addLayer(target_rrs_image.select('B3'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B3', false)
// Map.addLayer(target_rrs_image.select('B4'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B4', false)
// Map.addLayer(target_rrs_image.select('B5'), {min: 0, max: 0.2, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B5', false)
// Map.addLayer(target_rrs_image.select('B6'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B6', false)
// Map.addLayer(target_rrs_image.select('B7'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B7', false)
// Map.addLayer(target_rrs_image.select('B8'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B8', false)
// Map.addLayer(target_rrs_image.select('B8A'), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Rrs_B8A', false)
// Map.addLayer(target_index.clip(geometry), {min: 0, max: 20, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'Chla (mg/m^3)', true)
// Map.addLayer(Rrs_AB_combined.select('B5').median().clip(geometry), {min: 0, max: 0.03, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'median B5', false)
Map.addLayer(index.median().clip(geometry), {min: 0, max: 100, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'median chla', true)
// Map.addLayer(bbp.median().clip(geometry), {min: 0, max: 0.2, palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred']}, 'median bbp', false)
// Map.addLayer(z.median(), {min: 0.9, max: 1.1, palette: ['darkred', 'orangered', 'orange', 'yellow', 'limegreen' ,'cyan', 'blue', 'darkblue']}, 'sd', false)
// Map.addLayer(FC_combined.median().clip(geometry), {bands: ['B4', 'B3', 'B2'], min: 0, max: 2500}, 'rgb median', false)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mapping functions //
// MAIN for S2A
function MAIN_S2A(img){
// msi bands 
var bands = ['B1','B2','B3','B4','B5','B6','B7', 'B8', 'B8A', 'B11', 'B12'];
// rescale
var rescale = img.select(bands).divide(10000)
// tile footprint
var footprint = rescale.geometry()
// dem
//var DEM = ee.Image(1);
var DEM = ee.Image('USGS/SRTMGL1_003'); 
// ozone
var DU = ee.Image(300);
//var DU = ee.Image(ozone.filterDate(startDate,endDate).filterBounds(footprint).mean());
//Julian Day
var imgDate = ee.Date(img.get('system:time_start'));
var FOY = ee.Date.fromYMD(imgDate.get('year'),1,1);
var JD = imgDate.difference(FOY,'day').int().add(1);
// earth-sun distance
var myCos = ((ee.Image(0.0172).multiply(ee.Image(JD).subtract(ee.Image(2)))).cos()).pow(2)
var cosd = myCos.multiply(pi.divide(ee.Image(180))).cos();
var d = ee.Image(1).subtract(ee.Image(0.01673)).multiply(cosd).clip(footprint)
// sun azimuth
var SunAz = ee.Image.constant(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')).clip(footprint);
// sun zenith
var SunZe = ee.Image.constant(img.get('MEAN_SOLAR_ZENITH_ANGLE')).clip(footprint);
var cosdSunZe = SunZe.multiply(pi.divide(ee.Image(180))).cos(); // in degrees
var sindSunZe = SunZe.multiply(pi.divide(ee.Image(180))).sin(); // in degrees
// sat zenith
var SatZe = ee.Image.constant(img.get('MEAN_INCIDENCE_ZENITH_ANGLE_B5')).clip(footprint);
var cosdSatZe = (SatZe).multiply(pi.divide(ee.Image(180))).cos();
var sindSatZe = (SatZe).multiply(pi.divide(ee.Image(180))).sin();
// sat azimuth
var SatAz = ee.Image.constant(img.get('MEAN_INCIDENCE_AZIMUTH_ANGLE_B5')).clip(footprint);
// relative azimuth
var RelAz = SatAz.subtract(SunAz);
var cosdRelAz = RelAz.multiply(pi.divide(ee.Image(180))).cos();
// Pressure
var P = ee.Image(101325).multiply(ee.Image(1).subtract(ee.Image(0.0000225577).multiply(DEM)).pow(5.25588)).multiply(0.01)
var Po = ee.Image(1013.25);
// esun
var ESUN = ee.Image(ee.Array([ee.Image(img.get('SOLAR_IRRADIANCE_B1')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B2')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B3')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B4')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B5')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B6')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B7')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B8')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B8A')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B11')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B12'))]
                  )).toArray().toArray(1);
ESUN = ESUN.multiply(ee.Image(1))
var ESUNImg = ESUN.arrayProject([0]).arrayFlatten([bands]);
// create empty array for the images
var imgArr = rescale.select(bands).toArray().toArray(1);
// pTOA to Ltoa
var Ltoa = imgArr.multiply(ESUN).multiply(cosdSunZe).divide(pi.multiply(d.pow(2)));
// band centers
var bandCenter = ee.Image(444).divide(1000).addBands(ee.Image(496).divide(1000))
                                        .addBands(ee.Image(560).divide(1000))
                                        .addBands(ee.Image(664).divide(1000))
                                        .addBands(ee.Image(704).divide(1000))
                                        .addBands(ee.Image(740).divide(1000))
                                        .addBands(ee.Image(782).divide(1000))
                                        .addBands(ee.Image(835).divide(1000))
                                        .addBands(ee.Image(865).divide(1000))
                                        .addBands(ee.Image(1613).divide(1000))
                                        .addBands(ee.Image(2202).divide(1000))
                                        .toArray().toArray(1);
// ozone coefficients
var koz = ee.Image(0.0040).addBands(ee.Image(0.0244))
                        .addBands(ee.Image(0.1052))
                        .addBands(ee.Image(0.0516))
                        .addBands(ee.Image(0.0208))
                        .addBands(ee.Image(0.0112))
                        .addBands(ee.Image(0.0079))
                        .addBands(ee.Image(0.0021))
                        .addBands(ee.Image(0.0019))                          
                        .addBands(ee.Image(0))
                        .addBands(ee.Image(0))
                        .toArray().toArray(1);
// Calculate ozone optical thickness
var Toz = koz.multiply(DU).divide(ee.Image(1000));
// Calculate TOA radiance in the absense of ozone
var Lt = Ltoa.multiply(((Toz)).multiply((ee.Image(1).divide(cosdSunZe)).add(ee.Image(1).divide(cosdSatZe))).exp());
// Rayleigh optical thickness
var Tr = (P.divide(Po)).multiply(ee.Image(0.008569).multiply(bandCenter.pow(-4))).multiply((ee.Image(1).add(ee.Image(0.0113).multiply(bandCenter.pow(-2))).add(ee.Image(0.00013).multiply(bandCenter.pow(-4)))));
// Specular reflection (s- and p- polarization states)
var theta_V = ee.Image(0.0000000001);
var sin_theta_j = sindSunZe.divide(ee.Image(1.333));
var theta_j = sin_theta_j.asin().multiply(ee.Image(180).divide(pi));
var theta_SZ = SunZe;
var R_theta_SZ_s = (((theta_SZ.multiply(pi.divide(ee.Image(180)))).subtract(theta_j.multiply(pi.divide(ee.Image(180))))).sin().pow(2)).divide((((theta_SZ.multiply(pi.divide(ee.Image(180)))).add(theta_j.multiply(pi.divide(ee.Image(180))))).sin().pow(2)));
var R_theta_V_s = ee.Image(0.0000000001);
var R_theta_SZ_p = (((theta_SZ.multiply(pi.divide(180))).subtract(theta_j.multiply(pi.divide(180)))).tan().pow(2)).divide((((theta_SZ.multiply(pi.divide(180))).add(theta_j.multiply(pi.divide(180)))).tan().pow(2)));
var R_theta_V_p = ee.Image(0.0000000001);
var R_theta_SZ = ee.Image(0.5).multiply(R_theta_SZ_s.add(R_theta_SZ_p));
var R_theta_V = ee.Image(0.5).multiply(R_theta_V_s.add(R_theta_V_p));
// Sun-sensor geometry
var theta_neg = ((cosdSunZe.multiply(ee.Image(-1))).multiply(cosdSatZe)).subtract((sindSunZe).multiply(sindSatZe).multiply(cosdRelAz));
var theta_neg_inv = theta_neg.acos().multiply(ee.Image(180).divide(pi));
var theta_pos = (cosdSunZe.multiply(cosdSatZe)).subtract(sindSunZe.multiply(sindSatZe).multiply(cosdRelAz));
var theta_pos_inv = theta_pos.acos().multiply(ee.Image(180).divide(pi));
var cosd_tni = theta_neg_inv.multiply(pi.divide(180)).cos(); // in degrees
var cosd_tpi = theta_pos_inv.multiply(pi.divide(180)).cos(); // in degrees
var Pr_neg = ee.Image(0.75).multiply((ee.Image(1).add(cosd_tni.pow(2))));
var Pr_pos = ee.Image(0.75).multiply((ee.Image(1).add(cosd_tpi.pow(2))));
// Rayleigh scattering phase function
var Pr = Pr_neg.add((R_theta_SZ.add(R_theta_V)).multiply(Pr_pos));
// rayleigh radiance contribution
var denom = ee.Image(4).multiply(pi).multiply(cosdSatZe);
var Lr = (ESUN.multiply(Tr)).multiply(Pr.divide(denom));
// rayleigh corrected radiance
var Lrc = Lt.subtract(Lr);
var LrcImg = Lrc.arrayProject([0]).arrayFlatten([bands]);
var prcImg = (Lrc.multiply(pi).multiply(d.pow(2)).divide(ESUN.multiply(cosdSunZe)));
prcImg = prcImg.arrayProject([0]).arrayFlatten([bands]);
//var Rrs_S2A = prcImg.arrayProject([0]).arrayFlatten([bands]);
// Aerosol Correction //
// Bands in nm
var bands_nm = ee.Image(444).addBands(ee.Image(496))
                            .addBands(ee.Image(560))
                            .addBands(ee.Image(664))
                            .addBands(ee.Image(703))
                            .addBands(ee.Image(740))
                            .addBands(ee.Image(782))
                            .addBands(ee.Image(835))
                            .addBands(ee.Image(865))                            
                            .addBands(ee.Image(0)) // swir bands used for atm corr
                            .addBands(ee.Image(0))
                            .toArray().toArray(1);
// Lam in SWIR bands
var Lam_10 = LrcImg.select('B11'); // = 0
var Lam_11 = LrcImg.select('B12'); // = 0 
// Calculate aerosol type
var eps = ((((Lam_11).divide(ESUNImg.select('B12'))).log()).subtract(((Lam_10).divide(ESUNImg.select('B11'))).log())).divide(ee.Image(2190).subtract(ee.Image(1610)));
// Calculate multiple scattering of aerosols for each band
var Lam = (Lam_11).multiply(((ESUN).divide(ESUNImg.select('B12')))).multiply((eps.multiply(ee.Image(-1))).multiply((bands_nm.divide(ee.Image(2190)))).exp());
// diffuse transmittance
var trans = Tr.multiply(ee.Image(-1)).divide(ee.Image(2)).multiply(ee.Image(1).divide(cosdSatZe)).exp();
// Compute water-leaving radiance
var Lw = Lrc.subtract(Lam).divide(trans);
// water-leaving reflectance
var pw = (Lw.multiply(pi).multiply(d.pow(2)).divide(ESUN.multiply(cosdSunZe)));
// remote sensing reflectance
var Rrs_S2A = (pw.divide(pi).arrayProject([0]).arrayFlatten([bands]).slice(0,9));
// // // set negatives to null
Rrs_S2A = Rrs_S2A.updateMask(Rrs_S2A.select('B1').gt(0)).multiply(mask)
return(Rrs_S2A.set('system:time_start',img.get('system:time_start')));
}
// MAIN for S2B
function MAIN_S2B(img){
// msi bands 
var bands = ['B1','B2','B3','B4','B5','B6','B7', 'B8', 'B8A', 'B11', 'B12'];
// rescale
var rescale = img.select(bands).divide(10000)
// tile footprint
var footprint = rescale.geometry()
// dem
var DEM = ee.Image('USGS/SRTMGL1_003'); 
// ozone
var DU = ee.Image(300);
//var DU = ee.Image(ozone.filterDate(startDate,endDate).filterBounds(footprint).mean());
//Julian Day
var imgDate = ee.Date(img.get('system:time_start'));
var FOY = ee.Date.fromYMD(imgDate.get('year'),1,1);
var JD = imgDate.difference(FOY,'day').int().add(1);
// earth-sun distance
var myCos = ((ee.Image(0.0172).multiply(ee.Image(JD).subtract(ee.Image(2)))).cos()).pow(2)
var cosd = myCos.multiply(pi.divide(ee.Image(180))).cos();
var d = ee.Image(1).subtract(ee.Image(0.01673)).multiply(cosd).clip(footprint)
// sun azimuth
var SunAz = ee.Image.constant(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')).clip(footprint);
// sun zenith
var SunZe = ee.Image.constant(img.get('MEAN_SOLAR_ZENITH_ANGLE')).clip(footprint);
var cosdSunZe = SunZe.multiply(pi.divide(ee.Image(180))).cos(); // in degrees
var sindSunZe = SunZe.multiply(pi.divide(ee.Image(180))).sin(); // in degrees
// sat zenith
var SatZe = ee.Image.constant(img.get('MEAN_INCIDENCE_ZENITH_ANGLE_B5')).clip(footprint);
var cosdSatZe = (SatZe).multiply(pi.divide(ee.Image(180))).cos();
var sindSatZe = (SatZe).multiply(pi.divide(ee.Image(180))).sin();
// sat azimuth
var SatAz = ee.Image.constant(img.get('MEAN_INCIDENCE_AZIMUTH_ANGLE_B5')).clip(footprint);
// relative azimuth
var RelAz = SatAz.subtract(SunAz);
var cosdRelAz = RelAz.multiply(pi.divide(ee.Image(180))).cos();
// Pressure
var P = ee.Image(101325).multiply(ee.Image(1).subtract(ee.Image(0.0000225577).multiply(DEM)).pow(5.25588)).multiply(0.01)
var Po = ee.Image(1013.25);
// esun
var ESUN = ee.Image(ee.Array([ee.Image(img.get('SOLAR_IRRADIANCE_B1')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B2')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B3')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B4')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B5')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B6')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B7')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B8')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B8A')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B11')),
                  ee.Image(img.get('SOLAR_IRRADIANCE_B12'))]
                  )).toArray().toArray(1);
ESUN = ESUN.multiply(ee.Image(1))
var ESUNImg = ESUN.arrayProject([0]).arrayFlatten([bands]);
// create empty array for the images
var imgArr = rescale.select(bands).toArray().toArray(1);
// pTOA to Ltoa
var Ltoa = imgArr.multiply(ESUN).multiply(cosdSunZe).divide(pi.multiply(d.pow(2)));
// band centers
var bandCenter = ee.Image(442).divide(1000).addBands(ee.Image(492).divide(1000))
                                        .addBands(ee.Image(559).divide(1000))
                                        .addBands(ee.Image(665).divide(1000))
                                        .addBands(ee.Image(703).divide(1000))
                                        .addBands(ee.Image(739).divide(1000))
                                        .addBands(ee.Image(779).divide(1000))
                                        .addBands(ee.Image(833).divide(1000))
                                        .addBands(ee.Image(864).divide(1000))
                                        .addBands(ee.Image(1610).divide(1000))
                                        .addBands(ee.Image(2185).divide(1000))
                                        .toArray().toArray(1);
// ozone coefficients
var koz = ee.Image(0.0037).addBands(ee.Image(0.0223))
                        .addBands(ee.Image(0.1027))
                        .addBands(ee.Image(0.0505))
                        .addBands(ee.Image(0.0212))
                        .addBands(ee.Image(0.0112))
                        .addBands(ee.Image(0.0085))
                        .addBands(ee.Image(0.0022))
                        .addBands(ee.Image(0.0021))                          
                        .addBands(ee.Image(0))
                        .addBands(ee.Image(0))
                        .toArray().toArray(1);
// Calculate ozone optical thickness
var Toz = koz.multiply(DU).divide(ee.Image(1000));
// Calculate TOA radiance in the absense of ozone
var Lt = Ltoa.multiply(((Toz)).multiply((ee.Image(1).divide(cosdSunZe)).add(ee.Image(1).divide(cosdSatZe))).exp());
// Rayleigh optical thickness
var Tr = (P.divide(Po)).multiply(ee.Image(0.008569).multiply(bandCenter.pow(-4))).multiply((ee.Image(1).add(ee.Image(0.0113).multiply(bandCenter.pow(-2))).add(ee.Image(0.00013).multiply(bandCenter.pow(-4)))));
// Specular reflection (s- and p- polarization states)
var theta_V = ee.Image(0.0000000001);
var sin_theta_j = sindSunZe.divide(ee.Image(1.333));
var theta_j = sin_theta_j.asin().multiply(ee.Image(180).divide(pi));
var theta_SZ = SunZe;
var R_theta_SZ_s = (((theta_SZ.multiply(pi.divide(ee.Image(180)))).subtract(theta_j.multiply(pi.divide(ee.Image(180))))).sin().pow(2)).divide((((theta_SZ.multiply(pi.divide(ee.Image(180)))).add(theta_j.multiply(pi.divide(ee.Image(180))))).sin().pow(2)));
var R_theta_V_s = ee.Image(0.0000000001);
var R_theta_SZ_p = (((theta_SZ.multiply(pi.divide(180))).subtract(theta_j.multiply(pi.divide(180)))).tan().pow(2)).divide((((theta_SZ.multiply(pi.divide(180))).add(theta_j.multiply(pi.divide(180)))).tan().pow(2)));
var R_theta_V_p = ee.Image(0.0000000001);
var R_theta_SZ = ee.Image(0.5).multiply(R_theta_SZ_s.add(R_theta_SZ_p));
var R_theta_V = ee.Image(0.5).multiply(R_theta_V_s.add(R_theta_V_p));
// Sun-sensor geometry
var theta_neg = ((cosdSunZe.multiply(ee.Image(-1))).multiply(cosdSatZe)).subtract((sindSunZe).multiply(sindSatZe).multiply(cosdRelAz));
var theta_neg_inv = theta_neg.acos().multiply(ee.Image(180).divide(pi));
var theta_pos = (cosdSunZe.multiply(cosdSatZe)).subtract(sindSunZe.multiply(sindSatZe).multiply(cosdRelAz));
var theta_pos_inv = theta_pos.acos().multiply(ee.Image(180).divide(pi));
var cosd_tni = theta_neg_inv.multiply(pi.divide(180)).cos(); // in degrees
var cosd_tpi = theta_pos_inv.multiply(pi.divide(180)).cos(); // in degrees
var Pr_neg = ee.Image(0.75).multiply((ee.Image(1).add(cosd_tni.pow(2))));
var Pr_pos = ee.Image(0.75).multiply((ee.Image(1).add(cosd_tpi.pow(2))));
// Rayleigh scattering phase function
var Pr = Pr_neg.add((R_theta_SZ.add(R_theta_V)).multiply(Pr_pos));
// rayleigh radiance contribution
var denom = ee.Image(4).multiply(pi).multiply(cosdSatZe);
var Lr = (ESUN.multiply(Tr)).multiply(Pr.divide(denom));
// rayleigh corrected radiance
var Lrc = Lt.subtract(Lr);
var LrcImg = Lrc.arrayProject([0]).arrayFlatten([bands]);
var prcImg = (Lrc.multiply(pi).multiply(d.pow(2)).divide(ESUN.multiply(cosdSunZe)));
prcImg = prcImg.arrayProject([0]).arrayFlatten([bands]);
//var Rrs_S2B = prcImg.arrayProject([0]).arrayFlatten([bands]);
// // Aerosol Correction //
// Bands in nm
var bands_nm = ee.Image(442).addBands(ee.Image(492))
                            .addBands(ee.Image(559))
                            .addBands(ee.Image(665))
                            .addBands(ee.Image(703))
                            .addBands(ee.Image(739))
                            .addBands(ee.Image(779))
                            .addBands(ee.Image(833))
                            .addBands(ee.Image(864))                            
                            .addBands(ee.Image(0)) // swir bands used for atm corr
                            .addBands(ee.Image(0))
                            .toArray().toArray(1);
// Lam in SWIR bands
var Lam_10 = LrcImg.select('B11'); // = 0
var Lam_11 = LrcImg.select('B12'); // = 0 
// Calculate aerosol type
var eps = ((((Lam_11).divide(ESUNImg.select('B12'))).log()).subtract(((Lam_10).divide(ESUNImg.select('B11'))).log())).divide(ee.Image(2190).subtract(ee.Image(1610)));
// Calculate multiple scattering of aerosols for each band
var Lam = (Lam_11).multiply(((ESUN).divide(ESUNImg.select('B12')))).multiply((eps.multiply(ee.Image(-1))).multiply((bands_nm.divide(ee.Image(2190)))).exp());
// diffuse transmittance
var trans = Tr.multiply(ee.Image(-1)).divide(ee.Image(2)).multiply(ee.Image(1).divide(cosdSatZe)).exp();
// Compute water-leaving radiance
var Lw = Lrc.subtract(Lam).divide(trans);
// water-leaving reflectance 
var pw = (Lw.multiply(pi).multiply(d.pow(2)).divide(ESUN.multiply(cosdSunZe)));
// remote sensing reflectance
var Rrs_S2B = (pw.divide(pi).arrayProject([0]).arrayFlatten([bands]).slice(0,9));
// set negatives to null
Rrs_S2B = Rrs_S2B.updateMask(Rrs_S2B.select('B1').gt(0)).multiply(mask)
return(Rrs_S2B.set('system:time_start',img.get('system:time_start')));
}
function ndci(img){
  var index = img.normalizedDifference(['B5', 'B4'])
  index = ee.Image(14.039).add(ee.Image(86.111).multiply(index)).add(ee.Image(194.325).multiply(index.pow(2)))
  return(index.set('system:time_start',img.get('system:time_start')))
}
// particle backscatter function
function backscatter(img){
  // aw coefficients taken from Pope et al., 1997
var bbp = (ee.Image(0.429).divide(ee.Image(0.05))).multiply(img.select('B4'));
return(bbp.set('system:time_start',img.get('system:time_start')));
}
function waterClarity(img){
  var b2_log = img.select('B2').log()
  var b3_log = img.select('B3').log()
  var z = b2_log.divide(b3_log)
  return(z.set('system:time_start',img.get('system:time_start')));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //GIF Visualization and animation parameters.
// var params = {
//   framesPerSecond: 8,
//   region: geometry,
//   min: 0,
//   max: 100,
//   palette: ['darkblue','blue','cyan','limegreen','yellow', 'orange', 'orangered', 'darkred'],
// };
// // Display the animation in the console.
// print(ui.Thumbnail(index, params)) //**********
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // Time Series //
// //S2 combined time series
// //var joined_ts = [geometry, geometry2, geometry3];
// var rrsTimeSeries = ui.Chart.image.seriesByRegion(
//     index, geometry2, ee.Reducer.median())
//         .setChartType('ScatterChart')
//         .setOptions({
//           title: 'S2 Time Series',
//           vAxis: {title: 'Y'},
//           lineWidth: 1,
//           pointSize: 4,
// });
// print(rrsTimeSeries)
///////////////////////////////////////////////////
// Export Rrs bands
// var median_index = index.median();
// Export.image.toDrive({
//   image: index.median(),
//   description: 'SoDak_chla_2016_2017',
//   scale: 20,
//   maxPixels: 1E13,
//   region: geometry
// });
// Export.image.toDrive({
//   image: bbp.median(),
//   description: 'SoDak_bbp_2016_2017',
//   scale: 20,
//   maxPixels: 1E13,
//   region: geometry
// });
// Export.image.toDrive({
//   image: target_rrs_image.select('B2'),
//   description: 'Rrs_blue_',
//   scale: 30,
//   maxPixels: 1E13,
//   region: outputGeometry
// });
// Export.image.toDrive({
//   image: target_rrs_image.select('B3'),
//   description: 'Rrs_green_',
//   scale: 30,
//   maxPixels: 1E13,
//   region: outputGeometry
// });
// Export.image.toDrive({
//   image: target_rrs_image.select('B4'),
//   description: 'Rrs_red_',
//   scale: 30,
//   maxPixels: 1E13,
//   region: outputGeometry
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ***Panel*** \\
var viz = {min: 0, max: 50, palette: ['darkblue', 'blue', 'cyan', 'limegreen', 'yellow', 'orange', 'orangered', 'darkred']};
// set position of panel
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '30x 30px',
    color: '000000'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Chl-a mg/m3',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 0 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('100')
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
    params: {bbox:'0,0,10,100', dimensions:'20x200'},  
    style: {padding: '1px', position: 'bottom-center'},
  });
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('0')
    ],
  });
legend.add(panel);
Map.add(legend);
///////////////////////////////////////////////////////////////////////////////////////////
// //Spectral Profile For single point
// // Define customization options.
// var options = {
//   title: 'Spectral profile',
//   hAxis: {title: 'MSI Band'},
//   vAxis: {title: 'Rrs (sr^-1)'},
//   lineWidth: 1,
//   pointSize: 4,
//   series: {
//     0: {color: 'black'}, // spectra
// }};
// // Define a list of bands for X-axis labels.
// var spectraBands = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// // Create the chart and set options.
// var spectraChart = ui.Chart.image.regions(
//     target_rrs_image, joined_ts, ee.Reducer.median(), 20, 'label', spectraBands)
//         .setChartType('LineChart')
//         .setOptions(options);
// // Display the chart.
// print(spectraChart);
//////////////////////////////////////////////////////////
// // Cloud mask function
// function maskS2clouds(image) {
//   var qa = image.select('QA60');
//   // Bits 10 and 11 are clouds and cirrus, respectively.
//   var cloudBitMask = Math.pow(2, 10);
//   var cirrusBitMask = Math.pow(2, 11);
//   // Both flags should be set to zero, indicating clear conditions.
//   var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
//             qa.bitwiseAnd(cirrusBitMask).eq(0));
//   // Return the masked and scaled data.
//   return image.updateMask(mask).select("B.*").copyProperties(image, ["system:time_start"]);
// }
// // extract pixel values
// var pixVals = target_index.reduceRegions({
//   collection: table,
//   reducer: ee.Reducer.median(),
//   scale: 20,
//   tileScale: 2
// });
// print(pixVals, 'pixel values')
// // export table to drive
// Export.table.toDrive(pixVals, 'pixVals')