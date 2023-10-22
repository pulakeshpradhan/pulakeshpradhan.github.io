var roi_china = /* color: #0006d6 */ee.Geometry.Polygon(
        [[[73.73786951318232, 40.334788507204195],
          [73.035548979199, 39.04812034063505],
          [74.00440453420674, 38.01655143368365],
          [74.44602501983582, 36.33474275904115],
          [77.43844797833913, 34.68986664687751],
          [78.05470509674001, 34.10959183409938],
          [77.79212752549529, 32.566298892973236],
          [78.93799950180801, 29.477213313002803],
          [87.11905742799831, 26.766671931087856],
          [90.0598580470346, 26.038054562470116],
          [95.60061696493017, 25.881323702627927],
          [96.48047787555333, 24.047829629742992],
          [98.32756072684151, 22.269389279003292],
          [100.94084075861906, 20.79559614534747],
          [102.98870045826754, 21.411688500739455],
          [104.9230122180951, 21.943812286357247],
          [108.52833519536853, 20.714871821785493],
          [108.09731894431218, 19.34630154043706],
          [108.00040468211876, 17.977332505298666],
          [111.16587131123458, 18.06050496688446],
          [111.65144654355481, 20.590313423691633],
          [118.28954235662809, 23.280169807176303],
          [119.87273636831958, 22.26671516906139],
          [120.66372698609666, 21.53200584438928],
          [123.03875537191061, 22.995806641841305],
          [123.21617196112334, 25.798445411089464],
          [123.57139164037403, 31.50599034026623],
          [120.93471691751347, 35.18024249223632],
          [123.13491767592893, 36.53393719298498],
          [123.09251445661039, 38.728410945591285],
          [127.36100041340148, 40.3209888187787],
          [132.90672251429703, 42.75394163034145],
          [133.75059286908572, 45.355633992993305],
          [135.99293190786773, 47.3483263634807],
          [135.20279385146478, 48.527947679856794],
          [134.7565181596492, 48.832629108727375],
          [132.70986851652515, 48.543527326627725],
          [130.64500188320062, 49.267922423936355],
          [128.61385610685807, 50.201718189530176],
          [127.01881866282974, 52.87576622589899],
          [122.99130455838713, 53.89084415954989],
          [119.44384783231067, 53.07927533070498],
          [118.34343484699662, 51.17436065247141],
          [115.7892507608343, 49.51817892038467],
          [114.20333113721699, 46.99941803406862],
          [116.66792307995706, 47.208420223922815],
          [115.17083771067746, 45.81582406683519],
          [112.09037331202467, 45.69373235681619],
          [110.54997787189461, 45.138000127189756],
          [105.005189724523, 43.05313136891349],
          [102.05709216689468, 43.30980456524171],
          [98.36072959626802, 44.26246924979832],
          [94.35562166396767, 46.12222601794417],
          [91.89042089809914, 47.536621276459385],
          [89.55633272932073, 49.660228810148155],
          [85.72714527706808, 49.71574021501318],
          [85.20044186498285, 48.27179434704318],
          [83.74858359104337, 47.85941155527556],
          [81.32887474873394, 47.264330514223744],
          [80.93374203418648, 46.45170303514336],
          [79.30778064048604, 44.570153832480614],
          [78.91373130486647, 42.788234122861795],
          [77.55101624400868, 41.74566100004315],
          [74.25263320891827, 40.851236961389354]]]),
    cities = ee.Image("Oxford/MAP/accessibility_to_cities_2015_v1_0"),
    roi2 = /* color: #d63000 */ee.Geometry.Polygon(
        [[[111.60392376009156, 41.15112213066354],
          [111.47208782259156, 34.60311100711803],
          [117.40470501009156, 34.60311100711803],
          [117.71232219759156, 41.18420356953795]]]),
    roi_us = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-125.73483747205415, 44.35120987025921],
          [-126.35007184705415, 41.586541400264636],
          [-126.61374372205415, 38.492140410082285],
          [-124.15280622205415, 34.24797313503931],
          [-118.79147809705415, 31.142136742615698],
          [-115.36374372205415, 30.916195243403017],
          [-107.36569684705415, 28.93588253183445],
          [-96.73093122205415, 23.981054192707116],
          [-95.85202497205415, 25.972684061319356],
          [-95.06100934705415, 27.620099194557223],
          [-89.69968122205415, 28.24131572726918],
          [-84.07468122205415, 29.396362558378097],
          [-84.77780622205415, 26.3670878220185],
          [-80.38327497205415, 23.981054192707116],
          [-79.06491559705415, 25.893643609658465],
          [-79.72409528455415, 28.125110043724035],
          [-79.68014997205415, 30.576280868084798],
          [-78.01022809705415, 32.78249119041149],
          [-75.85690778455415, 34.39315009299668],
          [-75.15378278455415, 36.962903433305534],
          [-74.36523078496134, 38.49796214445609],
          [-71.72851203496134, 39.96162072833501],
          [-69.09179328496134, 41.3946061559019],
          [-66.71874640996134, 44.167699051132566],
          [-66.14745734746134, 45.384247513800545],
          [-67.11425422246134, 46.302614279839624],
          [-66.71874640996134, 48.298975840222035],
          [-69.09179328496134, 48.12326837451419],
          [-70.76171515996134, 46.81629538776312],
          [-75.59569953496134, 45.599889230913924],
          [-77.88085578496134, 44.48207796082264],
          [-80.16601203496134, 44.60735774525078],
          [-79.90234015996134, 43.3424318601538],
          [-81.83593390996134, 42.699871078085486],
          [-81.66015265996134, 43.66118918371668],
          [-81.74804328496134, 45.90651669437578],
          [-85.96679328496134, 48.12326837451419],
          [-92.47069953496134, 49.22591479620542],
          [-94.31640265996134, 49.85327917244188],
          [-97.56835578496134, 49.51207896021085],
          [-125.34179328496134, 49.28328090666884],
          [-125.78124640996134, 47.651765593039585]]]),
    roi_europe = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-9.733084965770786, 43.90782498220522],
          [-9.820975590770786, 41.71601946257617],
          [-10.524100590770786, 39.78536363173544],
          [-10.260428715770786, 37.241303639708434],
          [-7.360038090770786, 35.900217564837405],
          [-5.865897465770786, 35.686345015315204],
          [-2.262381840770786, 36.46772289079316],
          [1.7805869092292141, 38.214487300849406],
          [5.120430659229214, 38.83333022628005],
          [8.284493159229214, 38.28351023820275],
          [11.800118159229214, 37.937740645972006],
          [12.766915034229214, 36.74993051439661],
          [14.788399409229214, 36.326232225585336],
          [17.249336909229214, 36.96090773211299],
          [20.852852534229214, 36.25539035083559],
          [24.983711909229214, 34.463585096045804],
          [27.971993159229214, 35.04128376721861],
          [28.763008784229214, 36.25539035083559],
          [27.620430659229214, 37.86839045071461],
          [27.620430659229214, 39.85286976671783],
          [29.729805659229214, 39.85286976671783],
          [31.487618159229214, 39.78536363173544],
          [31.311836909229214, 41.38715199535314],
          [28.850899409229214, 42.49846670007323],
          [29.026680659229214, 44.03433297789101],
          [30.081368159229214, 45.40812885649396],
          [32.893868159229214, 44.0974859189078],
          [35.179024409229214, 44.223589663064956],
          [36.497383784229214, 44.600283509204544],
          [37.464180659229214, 45.469798946076125],
          [39.221993159229214, 46.568338424112355],
          [40.891915034229214, 49.50562720234201],
          [39.749336909229214, 50.24196904034105],
          [36.585274409229214, 51.02242669224262],
          [35.003243159229214, 52.330336042064395],
          [33.684883784229214, 53.286594885305874],
          [32.893868159229214, 54.580051959368355],
          [30.04962074353506, 56.69811769037741],
          [28.64337074353506, 57.12992486315894],
          [28.81915199353506, 59.079760262894176],
          [29.08282386853506, 60.53805288755275],
          [31.929360684862218, 62.52855744023558],
          [31.929360684862218, 63.56422457532899],
          [31.050454434862218, 66.28101699796781],
          [30.611001309862218, 67.92185123168679],
          [31.665688809862218, 69.20629726160101],
          [33.24772005986222, 69.82145214704894],
          [28.589516934862218, 71.31207272819539],
          [23.755532559862218, 71.48030603949479],
          [17.954751309862218, 70.47797147703726],
          [12.857095059862218, 69.01828061862142],
          [8.989907559862218, 64.56356036462323],
          [4.068032559862218, 62.48798532807803],
          [3.5406888098622176, 60.604246408371075],
          [5.034829434862218, 57.95686015599176],
          [1.5506833390243173, 56.59118082576912],
          [-1.6133791609757964, 58.29354399629301],
          [-3.8985354109757964, 60.52884930502583],
          [-12.160254160975796, 62.294688795665074],
          [-13.039160410975796, 64.7236875929165],
          [-13.214941660975796, 65.96991597041335],
          [-15.500097910975796, 67.22631805014935],
          [-24.113379160975796, 66.67577210167926],
          [-25.519629160975796, 64.94791998632931],
          [-24.113379160975796, 63.49583668696489],
          [-21.652441660975796, 63.02127618492059],
          [-16.730566660975796, 62.94142224449123],
          [-14.269629160975796, 61.800327759256895],
          [-7.238379160975796, 60.18106977251228],
          [-13.566504160975796, 53.678736492944154],
          [-13.742285410975796, 51.10516316536896],
          [-8.293066660975796, 50.99465955324152],
          [-6.183691660975796, 48.028420242723925],
          [-2.6680666609757964, 45.12964861428676],
          [-6.007910410975796, 44.631433316569016]]]),
    us_10m = ee.Image("users/mengbjfu/US_10m_projection"),
    GUF = ee.ImageCollection("users/mengbjfu/US_GUF"),
    GUF_projection = ee.Image("users/mengbjfu/US_1km_projection");
// check: 1) roi; 2) GUF; 3) projection
var us_Projection = GUF_projection.projection();// define projection same as pre-defined 1km built-up density
var myxm_projection = us_10m.projection();// every 1km pixel is split into 100m*100m pixels
// Load, process, and export GUF
var GUF_mosaic = GUF.mosaic().divide(255)// here GUF
    .reproject({
      crs: myxm_projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10001
    }).toDouble().unmask(0);
var us_GUF = GUF_mosaic
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10001
    })
    .reproject({
      crs: us_Projection}).toDouble();
Export.image.toDrive({
  image: us_GUF,
  description: 'us_GUF',
  region: roi_us,
  maxPixels: 1e13,
  fileFormat: 'TFRecord',
  formatOptions: {
   patchDimensions:[10, 10]
  }
});
var all_as_1 = (GUF_mosaic.add(1)).divide((GUF_mosaic.add(1)));
var buffer = all_as_1.cumulativeCost({
  source: GUF_mosaic,
  maxDistance: 20 // m  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});
var Expand_GUF_mosaic = buffer.unmask(0).add(GUF_mosaic);
//var Expand_GUF_mosaic = GUF_mosaic.focal_max({
//        radius:0,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//        kernelType: "square",
//        units:"meters",
//        iterations:1
//      });
var Expand_GUF_mosaic = Expand_GUF_mosaic.divide(Expand_GUF_mosaic).unmask(0);
var Expand_GUF_mosaic = Expand_GUF_mosaic.unmask(0); // set no data as 0
var Expand_GUF_mosaic_density = Expand_GUF_mosaic
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10001
    });
var Expand_GUF_mosaic_sum = Expand_GUF_mosaic
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10001
    }).multiply(10000);
// Load the Sentinel-1 SAR ImageCollection.
// Note: values are already converted to decibels via log scaling (10*log10(x) in GEE archives, [-50,1] estimated.
var SAR_1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filterDate('2014-10-01', '2015-04-30')
  .filterBounds(roi_us);
var SAR_2 = ee.ImageCollection('COPERNICUS/S1_GRD')
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filterDate('2015-10-01', '2016-04-30')
  .filterBounds(roi_us);
var SAR = SAR_1.merge(SAR_2);
var count = SAR.size();// calculate number of SAR scenes used
print('Count: ', count);
//Load, process, and export VV
var us_vv_data = SAR.select('VV').mean();
var us_vv_data = us_vv_data
    .reproject({
      crs: myxm_projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10001
    });
var us_vv_data_norm = (((us_vv_data.add(100)).divide((us_vv_data.add(100)))).multiply(10)).pow(us_vv_data.divide(10));//((us_vv_data.subtract(-65)).divide(70.0)).toDouble();//min:-65; max:5. Need to be modified here!!
var us_vv_subset = us_vv_data_norm.multiply(Expand_GUF_mosaic);
var us_vv_subset = us_vv_data_norm.multiply(Expand_GUF_mosaic).unmask(0);
var us_vv_subset_sum = us_vv_subset
    .reduceResolution({
      reducer: ee.Reducer.mean(),//works the same as mean()
      maxPixels: 10001
    })
    .reproject({
      crs: us_Projection}).multiply(10000);
Export.image.toDrive({
  image: us_vv_subset_sum.divide(Expand_GUF_mosaic_sum),
  description: 'us_vv_subset_Mean',
  region: roi_us,
  maxPixels: 1e13,
  fileFormat: 'TFRecord',
  formatOptions: {
   patchDimensions:[10, 10]
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////
//Load, process, and export VH
var us_vh_data = SAR.select('VH').mean();
Map.addLayer(us_vh_data, {min: -50, max: 1}, 'us_vh_data', 0);
var us_vh_data = us_vh_data
    .reproject({
      crs: myxm_projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),// the output is binary 0-1 
      maxPixels: 10001
    });
var us_vh_data_norm = (((us_vh_data.add(100)).divide((us_vh_data.add(100)))).multiply(10)).pow(us_vh_data.divide(10));//((us_vh_data.subtract(-65)).divide(70.0)).toDouble();//min:-65; max:5. Need to be modified here!!
var glcm = us_vh_data_norm.multiply(1000).toInt().glcmTexture({size: 100});
print (glcm)
var contrast = glcm.select('VH_contrast');
var contrast = contrast
    .reproject({
      crs: myxm_projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10001
    });
var contrast_mean = contrast
    .reduceResolution({
      reducer: ee.Reducer.mean(),//works the same as mean()
      maxPixels: 10001
    })
    .reproject({
      crs: us_Projection}).multiply(10000);
Export.image.toDrive({
  image: contrast_mean,
  description: 'us_contrast_mean',
  region: roi_us,
  maxPixels: 1e13,
  fileFormat: 'TFRecord',
  formatOptions: {
   patchDimensions:[10, 10]
  }
});
var us_vh_subset = us_vh_data_norm.multiply(Expand_GUF_mosaic);
var us_vh_subset = us_vh_data_norm.multiply(Expand_GUF_mosaic).unmask(0);
var us_vh_subset_sum = us_vh_subset
    .reduceResolution({
      reducer: ee.Reducer.mean(),//works the same as mean()
      maxPixels: 10001
    })
    .reproject({
      crs: us_Projection}).multiply(10000);
Export.image.toDrive({
  image: us_vh_subset_sum.divide(Expand_GUF_mosaic_sum),
  description: 'us_vh_subset_Mean',
  region: roi_us,
  maxPixels: 1e13,
  fileFormat: 'TFRecord',
  formatOptions: {
   patchDimensions:[10, 10]
  }
});
// Load, process, and export Slope
var DEM = ee.Image('USGS/GMTED2010');
var DEM = DEM
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
var us_slope = ee.Terrain.slope(DEM);
var us_aspect = ee.Terrain.aspect(DEM)
Export.image.toDrive({
  image: DEM,
  description: 'us_DEM',
  region: roi_us,
  maxPixels: 1e13,
});
Export.image.toDrive({
  image: us_slope,
  description: 'us_slope',
  region: roi_us,
  maxPixels: 1e13,
});
Export.image.toDrive({
  image: us_aspect,
  description: 'us_aspect',
  region: roi_us,
  maxPixels: 1e13,
});
//Load, process, and export  accessibility to cities
var traveltime2cities = ee.Image('Oxford/MAP/accessibility_to_cities_2015_v1_0');
var us_traveltime2cities = traveltime2cities
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 65536
    });
Export.image.toDrive({
  image: us_traveltime2cities,
  description: 'us_traveltime2cities',
  region: roi_us,
  maxPixels: 1e13,
});
// Load, process, and export VIIRS
var VIIRS_Data = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
  //It was also found that NTL of November and December provided the most accurate characterization of urban extent for most areas in the CONUS. https://doi.org/10.1016/j.rse.2019.03.008
  .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
  .filterBounds(roi_us);
var us_VIIRS_rad = VIIRS_Data.select('avg_rad');
var us_VIIRS_raw = us_VIIRS_rad.select('avg_rad').max();
var us_VIIRS = us_VIIRS_raw
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image: us_VIIRS,
  description: 'us_VIIRS',
  region: roi_us,
  maxPixels: 1e13,
});
// Load, process, and export LST (daytime and nighttime)
var LST_Data = ee.ImageCollection('MODIS/006/MOD11A2')
  .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
  .filterBounds(roi_us);
var LST_day = LST_Data.select('LST_Day_1km').mean();
var LST_night = LST_Data.select('LST_Night_1km').mean();
var us_LST_day = LST_day
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
var us_LST_night = LST_night
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image: us_LST_day,
  description: 'us_LST_day',
  region: roi_us,
  maxPixels: 1e13,
});
Export.image.toDrive({
  image: us_LST_night,
  description: 'us_LST_night',
  region: roi_us,
  maxPixels: 1e13,
});
// Load, process, and export EVI.
//Here I choose EVI, rather than NDVI, which is also available in MYD13A2
var VGT_Data = ee.ImageCollection('MODIS/006/MYD13A2')
              .filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var VGT_EVI_max = VGT_Data.select('EVI').max();
var us_VGT_EVI_max = VGT_EVI_max
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_VGT_EVI_max,
  description: 'us_VGT_EVI_max',
  region: roi_us,
  maxPixels: 1e13,
});
var VGT_EVI_min = VGT_Data.select('EVI').min();
var us_VGT_EVI_min = VGT_EVI_min
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_VGT_EVI_min,
  description: 'us_VGT_EVI_min',
  region: roi_us,
  maxPixels: 1e13,
});
var VGT_EVI_mean = VGT_Data.select('EVI').mean();
var us_VGT_EVI_mean = VGT_EVI_mean
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_VGT_EVI_mean,
  description: 'us_VGT_EVI_mean',
  region: roi_us,
  maxPixels: 1e13,
});
// Load, process, and export Water Data
var Water_collection = ee.ImageCollection('JRC/GSW1_0/YearlyHistory')
  .filter(ee.Filter.date('2015-01-01', '2015-12-31'))
  .filterBounds(roi_us);  //0-nodata, 1-nowater, 2, Seasonal water, 3 permanent water
var Water_2015 = Water_collection.mean().unmask(0);
var Water_2015_forSeasonal = Water_2015;
var Permanent_water1 = Water_2015.where(Water_2015.lt(3), 0);
var Permanent_water2 = Permanent_water1.where(Permanent_water1.gt(2), 1.0);
var Permanent_water = Permanent_water2
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
var Seasonal_water1a = Water_2015_forSeasonal.where(Water_2015_forSeasonal.lt(2), 0);
var Seasonal_water1 = Seasonal_water1a.where(Seasonal_water1a.gt(2), 0);// specify nondata,nowater, and permanent water = 0
var Seasonal_water2 = Seasonal_water1.where(Seasonal_water1.eq(2), 1.0);// specify seasonal water = 1.0
var Seasonal_water = Seasonal_water2
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
var Water_all = Permanent_water.add(Seasonal_water);
Export.image.toDrive({
  image:  Permanent_water,
  description: 'Permanent_water',
  region: roi_us,
  maxPixels: 1e13,
});
Export.image.toDrive({
  image:  Seasonal_water,
  description: 'Seasonal_water',
  region: roi_us,
  maxPixels: 1e13,
});
Export.image.toDrive({
  image:  Water_all,
  description: 'Water_all',
  region: roi_us,
  maxPixels: 1e13,
});
/** Landsat
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var Landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2015-01-01', '2015-12-31')
                  .map(maskL8sr);
var us_landsat_B01 = Landsat.select('B1').mean();
var us_landsat_B02 = Landsat.select('B2').mean();
var us_landsat_B03 = Landsat.select('B3').mean();
var us_landsat_B04 = Landsat.select('B4').mean();
var us_landsat_B05 = Landsat.select('B5').mean();
var us_landsat_B06 = Landsat.select('B6').mean();
var us_landsat_B07 = Landsat.select('B7').mean();
var us_landsat_B10 = Landsat.select('B10').mean();
var us_landsat_B11 = Landsat.select('B11').mean();
Map.addLayer(us_landsat_B05, {min: 500, max: 3000}, 'us_landsat_B05', 0);
var us_landsat_B01_1km = us_landsat_B01
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B01_1km,
  description: 'us_landsat_B01_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B02_1km = us_landsat_B02
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B02_1km,
  description: 'us_landsat_B02_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B03_1km = us_landsat_B03
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B03_1km,
  description: 'us_landsat_B03_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B04_1km = us_landsat_B04
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B04_1km,
  description: 'us_landsat_B04_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B05_1km = us_landsat_B05
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B05_1km,
  description: 'us_landsat_B05_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B06_1km = us_landsat_B06
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B06_1km,
  description: 'us_landsat_B06_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B07_1km = us_landsat_B07
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B07_1km,
  description: 'us_landsat_B07_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B10_1km = us_landsat_B10
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B10_1km,
  description: 'us_landsat_B10_1km',
  region: roi_us,
  maxPixels: 1e13,
});
var us_landsat_B11_1km = us_landsat_B11
    .reproject({
      crs: us_Projection})
    .reduceResolution({
      reducer: ee.Reducer.mean(),
      maxPixels: 10000
    });
Export.image.toDrive({
  image:  us_landsat_B11_1km,
  description: 'us_landsat_B11_1km',
  region: roi_us,
  maxPixels: 1e13,
});
// Display something anyway as a test
Map.addLayer(us_slope, {min: 0, max: 1}, 'us_slope', 0);