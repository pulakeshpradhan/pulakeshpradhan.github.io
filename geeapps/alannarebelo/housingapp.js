var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                18.54027998602604,
                -34.04074386751593
              ],
              [
                18.540966631533852,
                -34.086818863639074
              ],
              [
                18.696148516299477,
                -34.08397545361755
              ],
              [
                18.697521807315102,
                -34.037898911121836
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[18.54027998602604, -34.04074386751593],
          [18.540966631533852, -34.086818863639074],
          [18.696148516299477, -34.08397545361755],
          [18.697521807315102, -34.037898911121836]]], null, false),
    Water = ui.import && ui.import("Water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            18.6124312036186,
            -34.08240552509429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.616001758163748,
            -34.080301302930756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.61648241316243,
            -34.084054745981234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.620190294713666,
            -34.08303109422182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.624378836502274,
            -34.08018755700551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.627537404790473,
            -34.083656658728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.63378587786383,
            -34.08047191502375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.59821764108301,
            -34.08251926370163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.64037767369109,
            -34.07990319803247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.597370755059423,
            -34.07114068742247
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Code": 0
      },
      "color": "#1a46ff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #1a46ff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([18.6124312036186, -34.08240552509429]),
            {
              "Code": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([18.616001758163748, -34.080301302930756]),
            {
              "Code": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([18.61648241316243, -34.084054745981234]),
            {
              "Code": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([18.620190294713666, -34.08303109422182]),
            {
              "Code": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([18.624378836502274, -34.08018755700551]),
            {
              "Code": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([18.627537404790473, -34.083656658728]),
            {
              "Code": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([18.63378587786383, -34.08047191502375]),
            {
              "Code": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([18.59821764108301, -34.08251926370163]),
            {
              "Code": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([18.64037767369109, -34.07990319803247]),
            {
              "Code": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([18.597370755059423, -34.07114068742247]),
            {
              "Code": 0,
              "system:index": "9"
            })]),
    Vegetation = ui.import && ui.import("Vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            18.603007685787055,
            -34.074007634517955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.603076349944935,
            -34.07437732705425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.602544199938315,
            -34.072955424833395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.601814639086264,
            -34.073225588257394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.59843290982932,
            -34.07399341577152
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.597823512072104,
            -34.073964977729055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.634635367033997,
            -34.06816710837167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.634274877749494,
            -34.067847159060875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.639999784408946,
            -34.068074679020334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.641089835200336,
            -34.068785673938734
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Code": 1
      },
      "color": "#108b17",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #108b17 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([18.603007685787055, -34.074007634517955]),
            {
              "Code": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([18.603076349944935, -34.07437732705425]),
            {
              "Code": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([18.602544199938315, -34.072955424833395]),
            {
              "Code": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([18.601814639086264, -34.073225588257394]),
            {
              "Code": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([18.59843290982932, -34.07399341577152]),
            {
              "Code": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([18.597823512072104, -34.073964977729055]),
            {
              "Code": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([18.634635367033997, -34.06816710837167]),
            {
              "Code": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([18.634274877749494, -34.067847159060875]),
            {
              "Code": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([18.639999784408946, -34.068074679020334]),
            {
              "Code": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([18.641089835200336, -34.068785673938734]),
            {
              "Code": 1,
              "system:index": "9"
            })]),
    Sand = ui.import && ui.import("Sand", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            18.62334762300804,
            -34.07267554543426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.623313290601683,
            -34.07282484691643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62385402420102,
            -34.07366377346366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.6249011583385,
            -34.07371353980183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62588821125598,
            -34.07411167108199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62811980915637,
            -34.073770416046024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62968192742471,
            -34.07362822590635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.63230834701596,
            -34.07332962551071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.631115300970006,
            -34.07276797003737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62458358505307,
            -34.07411878044559
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Code": 2
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([18.62334762300804, -34.07267554543426]),
            {
              "Code": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([18.623313290601683, -34.07282484691643]),
            {
              "Code": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62385402420102, -34.07366377346366]),
            {
              "Code": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([18.6249011583385, -34.07371353980183]),
            {
              "Code": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62588821125598, -34.07411167108199]),
            {
              "Code": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62811980915637, -34.073770416046024]),
            {
              "Code": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62968192742471, -34.07362822590635]),
            {
              "Code": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([18.63230834701596, -34.07332962551071]),
            {
              "Code": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([18.631115300970006, -34.07276797003737]),
            {
              "Code": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62458358505307, -34.07411878044559]),
            {
              "Code": 2,
              "system:index": "9"
            })]),
    Housing = ui.import && ui.import("Housing", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            18.626453803767802,
            -34.069407693439345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.626333640836677,
            -34.06943435543697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62624566441373,
            -34.0692246141081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62634007812194,
            -34.06917484499724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.625822948215685,
            -34.06939880610494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.62561266304529,
            -34.06937569897688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.628545926881273,
            -34.06914196165642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.672516080028174,
            -34.068231449056036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.67290446386079,
            -34.0682172292045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.6718873701696,
            -34.06843586032795
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Code": 3
      },
      "color": "#000a0a",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #000a0a */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([18.626453803767802, -34.069407693439345]),
            {
              "Code": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([18.626333640836677, -34.06943435543697]),
            {
              "Code": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62624566441373, -34.0692246141081]),
            {
              "Code": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62634007812194, -34.06917484499724]),
            {
              "Code": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([18.625822948215685, -34.06939880610494]),
            {
              "Code": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([18.62561266304529, -34.06937569897688]),
            {
              "Code": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([18.628545926881273, -34.06914196165642]),
            {
              "Code": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([18.672516080028174, -34.068231449056036]),
            {
              "Code": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([18.67290446386079, -34.0682172292045]),
            {
              "Code": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([18.6718873701696, -34.06843586032795]),
            {
              "Code": 3,
              "system:index": "9"
            })]),
    LowDensityVegetation = ui.import && ui.import("LowDensityVegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            18.65561519147527,
            -34.06792604862038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.654748301652624,
            -34.06747811775557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.65613017560613,
            -34.067079955300244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.657409053650234,
            -34.06724348652541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.65779529174838,
            -34.06764164848352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.649512629655554,
            -34.06784783851516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.650199275818203,
            -34.05419198735229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.649752955190387,
            -34.05588442235379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.652220587484088,
            -34.05722483603163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            18.654713969246266,
            -34.05928341328727
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Code": 4
      },
      "color": "#c2b914",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #c2b914 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([18.65561519147527, -34.06792604862038]),
            {
              "Code": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([18.654748301652624, -34.06747811775557]),
            {
              "Code": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([18.65613017560613, -34.067079955300244]),
            {
              "Code": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([18.657409053650234, -34.06724348652541]),
            {
              "Code": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([18.65779529174838, -34.06764164848352]),
            {
              "Code": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([18.649512629655554, -34.06784783851516]),
            {
              "Code": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([18.650199275818203, -34.05419198735229]),
            {
              "Code": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([18.649752955190387, -34.05588442235379]),
            {
              "Code": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([18.652220587484088, -34.05722483603163]),
            {
              "Code": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([18.654713969246266, -34.05928341328727]),
            {
              "Code": 4,
              "system:index": "9"
            })]);
Map.centerObject(roi, 14) //Center map on the Cape Flats with a zoom level of 4
//Training Data
var TrainingData = Water.merge(Vegetation).merge(Sand).merge(Housing).merge(LowDensityVegetation);
//Map.addLayer(TrainingData, {color: 'FF0000'}, 'TrainingData');
print(TrainingData, "Training Data");
var HousingPalette =[
  '0A14F9', // Water // royal blue 3
  'A8A800', // Vegetation // olive green 0
  'FFFFFF', // Sand // white 1
  '808080', // Urban // grey 2
  '74B72E', // Low Density Vegetation // Pear Green 4
  ];
// ---------------------------------------------------------------------------------- //
//2019
var S2019_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2019-12-16", "2019-12-20")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
var S2019_10000 = S2019_10000.mosaic();
var S2019_10000 = S2019_10000.clip(roi);
    print(S2019_10000, "Sentscene2019");
//Map.addLayer(S2019_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2019');
//2018
var S2018_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2018-12-16", "2018-12-20")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2018_10000, "Sentscene2018");
var S2018_10000 = S2018_10000.mosaic();
var S2018_10000 = S2018_10000.clip(roi)
//Map.addLayer(S2018_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2018');
var S2018 = S2018_10000.divide(10000)
///////////////////////////////////////////////////////////
/////               Generating Indices               /////
//////////////////////////////////////////////////////////
// 1 NDVI 
    var NDVI = S2018.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: S2018.select("B4"),    //  RED
          NIR: S2018.select("B8"),    // NIR
        });
// 2 Chlogreen (Chlorophyll Green Index)
    var Chlogreen = S2018.expression(
        "(NIRnarrow) / (GREEN + REDedge1)",
        {
          NIRnarrow: S2018.select("B8A"),    
          GREEN: S2018.select("B3"),    
          REDedge1: S2018.select("B5")    
        });
// 3 LAnthoC (Leaf Anthocynanid Content)
    var LAnthoC = S2018.expression(
        "(REDedge3) / (GREEN + REDedge1)",
        {
          REDedge3: S2018.select("B7"),    
          GREEN: S2018.select("B3"),    
          REDedge1: S2018.select("B5")    
        });
// 4 LCaroC
var LCaroC = S2018.expression(
        "(Rededge3) / (Blue - Rededge1)",
        { Rededge3: S2018.select("B7"),    // Rededge3
          Blue: S2018.select("B2"),    // Blue
          Rededge1: S2018.select("B5"),    // Rededge1
          });
// 5 LChloC
var LChloC = S2018.expression(
        "(Rededge3) / (Rededge1)",
        { Rededge3: S2018.select("B7"),    // Rededge3
          Rededge1: S2018.select("B5"),    // Rededge1
          });
// 6 BAI
var BAI = S2018.expression(
        "(Blue - NIR)/(Blue + NIR)",
        { Blue: S2018.select("B2"),   
          NIR: S2018.select("B8"),    
          });
// 7 GI
var GI = S2018.expression(
        "Green/Red",
        { Green: S2018.select("B3"),   
          Red: S2018.select("B4"),
          });
// 8 gNDVI
var gNDVI = S2018.expression(
        "(NIR - Green)/(NIR + Green)",
        { NIR: S2018.select("B8"),   
          Green: S2018.select("B3"),
          });
// 9 MSI
var MSI = S2018.expression(
        "SWIR1/NIR",
        { SWIR1: S2018.select("B11"),   
          NIR: S2018.select("B8"),
          });
// 10 NDrededgeSWIR
var NDrededgeSWIR = S2018.expression(
        "(Rededge2 - SWIR2) / (Rededge2 + SWIR2)",
        { Rededge2: S2018.select("B6"),   
          SWIR2: S2018.select("B12"),
          });
// 11 NDTI (also referred to as NBR2)
var NDTI = S2018.expression(
        "(SWIR1 - SWIR2) / (SWIR1 + SWIR2)",
        { SWIR1: S2018.select("B11"),   
          SWIR2: S2018.select("B12"),
          });
// 12 NDVIre
var NDVIre = S2018.expression(
        "(NIR - Rededge1) / (NIR + Rededge1)",
        { NIR: S2018.select("B8"),   
          Rededge1: S2018.select("B5"),
          });  
// 13 NDVI1
var NDVI1 = S2018.expression(
        "(NIR - SWIR1) / (NIR + SWIR1)",
        { NIR: S2018.select("B8"),   
          SWIR1: S2018.select("B11"),
          });           
// 14 NDVI2
var NDVI2 = S2018.expression(
        "(Green - NIR) / (Green + NIR)",
        { NIR: S2018.select("B8"),   
          Green: S2018.select("B3"),
          }); 
// 15 NHI
var NHI = S2018.expression(
        "(SWIR1 - Green) / (SWIR1 + Green)",
        { SWIR1: S2018.select("B11"),   
          Green: S2018.select("B3"),
          }); 
// 16 EVI
var EVI = S2018.expression(
        "2.5 * ((NIR - Red) / (NIR + 6*Red-7.5*Blue)+1)",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          Blue: S2018.select("B2"),
          });  
// 17 EVI2
var EVI2 = S2018.expression(
        "2.4 * ((NIR - Red) / (NIR + Red +1))",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          }); 
// 18 EVI2_2          
var EVI2_2 = S2018.expression(
        "2.5 * ((NIR - Red) / (NIR + 2.4 * Red +1))",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          }); 
// 19 MSAVI
var MSAVI = S2018.expression(
        "(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - Red)) ) / 2",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          });   
// 20 Norm-G (Normalised Green)
 var NormG = S2018.expression(
        "(GREEN) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2018.select("B3"),    
          NIRwide: S2018.select("B8"),    
          RED: S2018.select("B4")    
        });
// 21 Norm-NIR (Normalised NIR)
 var NormNIR = S2018.expression(
       "(NIRwide) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2018.select("B3"),    
          NIRwide: S2018.select("B8"),    
          RED: S2018.select("B4")    
        });
// 22 Norm-R (Normalised Red)
 var NormR = S2018.expression(
       "(RED) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2018.select("B3"),    
          NIRwide: S2018.select("B8"),    
          RED: S2018.select("B4")    
        });
// 23 RededgePeakArea (Red-edge peak area)
 var RededgePeakArea = S2018.expression(
        "(RED + Rededge1 + Rededge2 + Rededge3 + NIRnarrow)",
        {
          Rededge1: S2018.select("B5"), 
          Rededge2: S2018.select("B6"), 
          Rededge3: S2018.select("B7"), 
          NIRnarrow: S2018.select("B8A"),    
          RED: S2018.select("B4")    
        });
// 24 RedSWIR1 (Bands difference)
 var RedSWIR1 = S2018.expression(
        "(RED - SWIR)",
        {
          RED: S2018.select("B4"),    
          SWIR: S2018.select("B11")    
        });
// 25 RTVIcore (Red-edge Triangular Vegetation Index)
 var RTVIcore = S2018.expression(
        "(100 * (NIRnarrow - Rededge1) - 10 * (NIRnarrow - Green))",
        {
          NIRnarrow: S2018.select("B8A"),    
          Rededge1: S2018.select("B5"),    
          Green: S2018.select("B3")    
        });
// 26 SAVI (Soil Adjusted Vegetation Index)
 var SAVI = S2018.expression(
        "((NIRnarrow - RED) / (NIRnarrow + RED + 0.5) * 1.5)",
        {
          NIRnarrow: S2018.select("B8A"),    
          RED: S2018.select("B4")    
          });
// 27 SR-BlueRededge1 (Simple Blue and Red-edge 1 Ratio)
 var SRBlueRededge1 = S2018.expression(
        "(BLUE / REDedge1)",
        {
          BLUE: S2018.select("B2"),    
          REDedge1: S2018.select("B5")    
        });
// 28 SR-BlueRededge2 (Simple Blue and Red-edge 2 Ratio)
 var SRBlueRededge2 = S2018.expression(
        "(BLUE / REDedge2)",
        {
          BLUE: S2018.select("B2"),    
          REDedge2: S2018.select("B6")    
        });
// 29 SR-BlueRededge3 (Simple Blue and Red-edge 3 Ratio)
 var SRBlueRededge3 = S2018.expression(
        "(BLUE / REDedge3)",
        {
          BLUE: S2018.select("B2"),    
          REDedge3: S2018.select("B7")    
        });
// 30 SR-NIRnarrowBlue (Simple ratio NIR narrow and Blue)
 var SRNIRnarrowBlue = S2018.expression(
        "(NIRnarrow / BLUE)",
        {
          NIRnarrow: S2018.select("B8A"),    
          BLUE: S2018.select("B2")    
        });
// 31 SR-NIRnarrowGreen (Simple ratio NIR narrow and Green)
 var SRNIRnarrowGreen = S2018.expression(
        "(NIRnarrow / GREEN)",
        {
          NIRnarrow: S2018.select("B8A"),    
          GREEN: S2018.select("B3")    
        });
// 32 SR-NIRnarrowRed (Simple ratio NIR narrow and Red)
 var SRNIRnarrowRed = S2018.expression(
        "(NIRnarrow / RED)",
        {
          NIRnarrow: S2018.select("B8A"),    
          RED: S2018.select("B4")    
        });
// 33 SR-NIRnarrowRededge1 (Simple NIR and Red-edge 1 Ratio)
 var SRNIRnarrowRededge1 = S2018.expression(
        "(NIRnarrow / REDedge1)",
        {
          NIRnarrow: S2018.select("B8A"),    
          REDedge1: S2018.select("B5")    
        });
// 34 SR-NIRnarrowRededge2 (Simple NIR and Red-edge 2 Ratio)
 var SRNIRnarrowRededge2 = S2018.expression(
        "(NIRnarrow / REDedge2)",
        {
          NIRnarrow: S2018.select("B8A"),    
          REDedge2: S2018.select("B6")    
        });
// 35 SR-NIRnarrowRededge3 (Simple NIR and Red-edge 3 Ratio)
 var SRNIRnarrowRededge3 = S2018.expression(
        "(NIRnarrow / REDedge3)",
        {
          NIRnarrow: S2018.select("B8A"),    
          REDedge3: S2018.select("B7")    
        });
// 36 STI (Soil Tillage Index)
 var STI = S2018.expression(
        "(SWIR1 / SWIR2)",
        {
          SWIR1: S2018.select("B11"),    
          SWIR2: S2018.select("B12")
        });
// 37 WBI (Water Body Index)
 var WBI = S2018.expression(
        "(BLUE - RED) / (BLUE + RED)",
        {
          BLUE: S2018.select("B2"),    
          RED: S2018.select("B4")
        });
// 38 NDMI (Normalized Difference Moisture Index)
 var NDMI = S2018.expression(
        "(NIR-SWIR)/(NIR+SWIR)",
        {
          NIR: S2018.select("B8"),    
          SWIR: S2018.select("B11"),    
          });
// 39 NDBR (Normalized Difference Burning Ratio) (also referred to as NBR)
 var NDBR = S2018.expression(
        "(NIR-MIR)/(NIR+MIR)",
        {
          NIR: S2018.select("B8"),    
          MIR: S2018.select("B12"),    
          });
// // adding all the indices into the S2018 as new bands
var S2018 = S2018.addBands(NDVI); 
var S2018 = S2018.addBands(Chlogreen);
var S2018 = S2018.addBands(LAnthoC);
var S2018 = S2018.addBands(LCaroC);
var S2018 = S2018.addBands(LChloC);
var S2018 = S2018.addBands(BAI);
var S2018 = S2018.addBands(GI);
var S2018 = S2018.addBands(gNDVI);
var S2018 = S2018.addBands(MSI);
var S2018 = S2018.addBands(NDrededgeSWIR);
var S2018 = S2018.addBands(NDTI);
var S2018 = S2018.addBands(NDVIre);
var S2018 = S2018.addBands(NDVI1);
var S2018 = S2018.addBands(NDVI2);
var S2018 = S2018.addBands(NHI);
var S2018 = S2018.addBands(EVI);
var S2018 = S2018.addBands(EVI2);
var S2018 = S2018.addBands(EVI2_2);
var S2018 = S2018.addBands(MSAVI);
var S2018 = S2018.addBands(NormG);
var S2018 = S2018.addBands(NormNIR);
var S2018 = S2018.addBands(NormR);
var S2018 = S2018.addBands(RededgePeakArea);
var S2018 = S2018.addBands(RedSWIR1);
var S2018 = S2018.addBands(RTVIcore);
var S2018 = S2018.addBands(SAVI);
var S2018 = S2018.addBands(SRBlueRededge1);
var S2018 = S2018.addBands(SRBlueRededge2);
var S2018 = S2018.addBands(SRBlueRededge3);
var S2018 = S2018.addBands(SRNIRnarrowBlue);
var S2018 = S2018.addBands(SRNIRnarrowGreen);
var S2018 = S2018.addBands(SRNIRnarrowRed);
var S2018 = S2018.addBands(SRNIRnarrowRededge1);
var S2018 = S2018.addBands(SRNIRnarrowRededge2);
var S2018 = S2018.addBands(SRNIRnarrowRededge3);
var S2018 = S2018.addBands(STI);
var S2018 = S2018.addBands(WBI);
var S2018 = S2018.addBands(NDMI);
var S2018 = S2018.addBands(NDBR);
print (S2018, "allindices added");
// Training data
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12', 'B8_1', 'B8A_1', 'B7_1', 'B7_2', 'B7_3', "B2_1", "B3_1", "B8_2", "B11_1", 
                "B6_1", "B11_2", "B8_3", "B8_4", "B3_2", "B11_3", "constant", "constant_1", "constant_2", "constant_3",
                "B3_3", "B8_5", "B4_1", "B4_2", "B4_3", "constant_4", "B8A_2", "B2_2", "B2_3", "B2_4", 
                "B8A_3", "B8A_4", "B8A_5", "B8A_6", "B8A_7", "B8A_8", "B11_4", "B2_5", "B8_6", "B8_7"];
print (bands, "allbands&indices")
var training_data = S2018.select(bands).sampleRegions({ // Generate training data
  collection: TrainingData, 
  properties: ['Code'], 
  geometries: true,
  scale: 10
});
var classifier = ee.Classifier.libsvm().train({ // Train the classifier with training data
  features: training_data, 
  classProperty: 'Code', 
  inputProperties: bands
});
var classified2018 = S2018.select(bands).classify(classifier); // Run the classification 
Map.addLayer(classified2018, {min: 0, max: 4, palette: HousingPalette}, '2018'); //Display classification 
// ---------------------------------------------------------------------------------- //
//2020
var S2020_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2020-12-16", "2020-12-20")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2020_10000, "Sentscene2020");
var S2020_10000 = S2020_10000.mosaic();
var S2020_10000 = S2020_10000.clip(roi)
//Map.addLayer(S2020_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2020');
var S2020 = S2020_10000.divide(10000)
///////////////////////////////////////////////////////////
/////               Generating Indices               /////
//////////////////////////////////////////////////////////
// 1 NDVI 
    var NDVI = S2020.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: S2020.select("B4"),    //  RED
          NIR: S2020.select("B8"),    // NIR
        });
// 2 Chlogreen (Chlorophyll Green Index)
    var Chlogreen = S2020.expression(
        "(NIRnarrow) / (GREEN + REDedge1)",
        {
          NIRnarrow: S2020.select("B8A"),    
          GREEN: S2020.select("B3"),    
          REDedge1: S2020.select("B5")    
        });
// 3 LAnthoC (Leaf Anthocynanid Content)
    var LAnthoC = S2020.expression(
        "(REDedge3) / (GREEN + REDedge1)",
        {
          REDedge3: S2020.select("B7"),    
          GREEN: S2020.select("B3"),    
          REDedge1: S2020.select("B5")    
        });
// 4 LCaroC
var LCaroC = S2020.expression(
        "(Rededge3) / (Blue - Rededge1)",
        { Rededge3: S2020.select("B7"),    // Rededge3
          Blue: S2020.select("B2"),    // Blue
          Rededge1: S2020.select("B5"),    // Rededge1
          });
// 5 LChloC
var LChloC = S2020.expression(
        "(Rededge3) / (Rededge1)",
        { Rededge3: S2020.select("B7"),    // Rededge3
          Rededge1: S2020.select("B5"),    // Rededge1
          });
// 6 BAI
var BAI = S2020.expression(
        "(Blue - NIR)/(Blue + NIR)",
        { Blue: S2020.select("B2"),   
          NIR: S2020.select("B8"),    
          });
// 7 GI
var GI = S2020.expression(
        "Green/Red",
        { Green: S2020.select("B3"),   
          Red: S2020.select("B4"),
          });
// 8 gNDVI
var gNDVI = S2020.expression(
        "(NIR - Green)/(NIR + Green)",
        { NIR: S2020.select("B8"),   
          Green: S2020.select("B3"),
          });
// 9 MSI
var MSI = S2020.expression(
        "SWIR1/NIR",
        { SWIR1: S2020.select("B11"),   
          NIR: S2020.select("B8"),
          });
// 10 NDrededgeSWIR
var NDrededgeSWIR = S2020.expression(
        "(Rededge2 - SWIR2) / (Rededge2 + SWIR2)",
        { Rededge2: S2020.select("B6"),   
          SWIR2: S2020.select("B12"),
          });
// 11 NDTI (also referred to as NBR2)
var NDTI = S2020.expression(
        "(SWIR1 - SWIR2) / (SWIR1 + SWIR2)",
        { SWIR1: S2020.select("B11"),   
          SWIR2: S2020.select("B12"),
          });
// 12 NDVIre
var NDVIre = S2020.expression(
        "(NIR - Rededge1) / (NIR + Rededge1)",
        { NIR: S2020.select("B8"),   
          Rededge1: S2020.select("B5"),
          });  
// 13 NDVI1
var NDVI1 = S2020.expression(
        "(NIR - SWIR1) / (NIR + SWIR1)",
        { NIR: S2020.select("B8"),   
          SWIR1: S2020.select("B11"),
          });           
// 14 NDVI2
var NDVI2 = S2020.expression(
        "(Green - NIR) / (Green + NIR)",
        { NIR: S2020.select("B8"),   
          Green: S2020.select("B3"),
          }); 
// 15 NHI
var NHI = S2020.expression(
        "(SWIR1 - Green) / (SWIR1 + Green)",
        { SWIR1: S2020.select("B11"),   
          Green: S2020.select("B3"),
          }); 
// 16 EVI
var EVI = S2020.expression(
        "2.5 * ((NIR - Red) / (NIR + 6*Red-7.5*Blue)+1)",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          Blue: S2020.select("B2"),
          });  
// 17 EVI2
var EVI2 = S2020.expression(
        "2.4 * ((NIR - Red) / (NIR + Red +1))",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          }); 
// 18 EVI2_2          
var EVI2_2 = S2020.expression(
        "2.5 * ((NIR - Red) / (NIR + 2.4 * Red +1))",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          }); 
// 19 MSAVI
var MSAVI = S2020.expression(
        "(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - Red)) ) / 2",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          });   
// 20 Norm-G (Normalised Green)
 var NormG = S2020.expression(
        "(GREEN) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2020.select("B3"),    
          NIRwide: S2020.select("B8"),    
          RED: S2020.select("B4")    
        });
// 21 Norm-NIR (Normalised NIR)
 var NormNIR = S2020.expression(
       "(NIRwide) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2020.select("B3"),    
          NIRwide: S2020.select("B8"),    
          RED: S2020.select("B4")    
        });
// 22 Norm-R (Normalised Red)
 var NormR = S2020.expression(
       "(RED) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2020.select("B3"),    
          NIRwide: S2020.select("B8"),    
          RED: S2020.select("B4")    
        });
// 23 RededgePeakArea (Red-edge peak area)
 var RededgePeakArea = S2020.expression(
        "(RED + Rededge1 + Rededge2 + Rededge3 + NIRnarrow)",
        {
          Rededge1: S2020.select("B5"), 
          Rededge2: S2020.select("B6"), 
          Rededge3: S2020.select("B7"), 
          NIRnarrow: S2020.select("B8A"),    
          RED: S2020.select("B4")    
        });
// 24 RedSWIR1 (Bands difference)
 var RedSWIR1 = S2020.expression(
        "(RED - SWIR)",
        {
          RED: S2020.select("B4"),    
          SWIR: S2020.select("B11")    
        });
// 25 RTVIcore (Red-edge Triangular Vegetation Index)
 var RTVIcore = S2020.expression(
        "(100 * (NIRnarrow - Rededge1) - 10 * (NIRnarrow - Green))",
        {
          NIRnarrow: S2020.select("B8A"),    
          Rededge1: S2020.select("B5"),    
          Green: S2020.select("B3")    
        });
// 26 SAVI (Soil Adjusted Vegetation Index)
 var SAVI = S2020.expression(
        "((NIRnarrow - RED) / (NIRnarrow + RED + 0.5) * 1.5)",
        {
          NIRnarrow: S2020.select("B8A"),    
          RED: S2020.select("B4")    
          });
// 27 SR-BlueRededge1 (Simple Blue and Red-edge 1 Ratio)
 var SRBlueRededge1 = S2020.expression(
        "(BLUE / REDedge1)",
        {
          BLUE: S2020.select("B2"),    
          REDedge1: S2020.select("B5")    
        });
// 28 SR-BlueRededge2 (Simple Blue and Red-edge 2 Ratio)
 var SRBlueRededge2 = S2020.expression(
        "(BLUE / REDedge2)",
        {
          BLUE: S2020.select("B2"),    
          REDedge2: S2020.select("B6")    
        });
// 29 SR-BlueRededge3 (Simple Blue and Red-edge 3 Ratio)
 var SRBlueRededge3 = S2020.expression(
        "(BLUE / REDedge3)",
        {
          BLUE: S2020.select("B2"),    
          REDedge3: S2020.select("B7")    
        });
// 30 SR-NIRnarrowBlue (Simple ratio NIR narrow and Blue)
 var SRNIRnarrowBlue = S2020.expression(
        "(NIRnarrow / BLUE)",
        {
          NIRnarrow: S2020.select("B8A"),    
          BLUE: S2020.select("B2")    
        });
// 31 SR-NIRnarrowGreen (Simple ratio NIR narrow and Green)
 var SRNIRnarrowGreen = S2020.expression(
        "(NIRnarrow / GREEN)",
        {
          NIRnarrow: S2020.select("B8A"),    
          GREEN: S2020.select("B3")    
        });
// 32 SR-NIRnarrowRed (Simple ratio NIR narrow and Red)
 var SRNIRnarrowRed = S2020.expression(
        "(NIRnarrow / RED)",
        {
          NIRnarrow: S2020.select("B8A"),    
          RED: S2020.select("B4")    
        });
// 33 SR-NIRnarrowRededge1 (Simple NIR and Red-edge 1 Ratio)
 var SRNIRnarrowRededge1 = S2020.expression(
        "(NIRnarrow / REDedge1)",
        {
          NIRnarrow: S2020.select("B8A"),    
          REDedge1: S2020.select("B5")    
        });
// 34 SR-NIRnarrowRededge2 (Simple NIR and Red-edge 2 Ratio)
 var SRNIRnarrowRededge2 = S2020.expression(
        "(NIRnarrow / REDedge2)",
        {
          NIRnarrow: S2020.select("B8A"),    
          REDedge2: S2020.select("B6")    
        });
// 35 SR-NIRnarrowRededge3 (Simple NIR and Red-edge 3 Ratio)
 var SRNIRnarrowRededge3 = S2020.expression(
        "(NIRnarrow / REDedge3)",
        {
          NIRnarrow: S2020.select("B8A"),    
          REDedge3: S2020.select("B7")    
        });
// 36 STI (Soil Tillage Index)
 var STI = S2020.expression(
        "(SWIR1 / SWIR2)",
        {
          SWIR1: S2020.select("B11"),    
          SWIR2: S2020.select("B12")
        });
// 37 WBI (Water Body Index)
 var WBI = S2020.expression(
        "(BLUE - RED) / (BLUE + RED)",
        {
          BLUE: S2020.select("B2"),    
          RED: S2020.select("B4")
        });
// 38 NDMI (Normalized Difference Moisture Index)
 var NDMI = S2020.expression(
        "(NIR-SWIR)/(NIR+SWIR)",
        {
          NIR: S2020.select("B8"),    
          SWIR: S2020.select("B11"),    
          });
// 39 NDBR (Normalized Difference Burning Ratio) (also referred to as NBR)
 var NDBR = S2020.expression(
        "(NIR-MIR)/(NIR+MIR)",
        {
          NIR: S2020.select("B8"),    
          MIR: S2020.select("B12"),    
          });
// // adding all the indices into the S2020 as new bands
var S2020 = S2020.addBands(NDVI); 
var S2020 = S2020.addBands(Chlogreen);
var S2020 = S2020.addBands(LAnthoC);
var S2020 = S2020.addBands(LCaroC);
var S2020 = S2020.addBands(LChloC);
var S2020 = S2020.addBands(BAI);
var S2020 = S2020.addBands(GI);
var S2020 = S2020.addBands(gNDVI);
var S2020 = S2020.addBands(MSI);
var S2020 = S2020.addBands(NDrededgeSWIR);
var S2020 = S2020.addBands(NDTI);
var S2020 = S2020.addBands(NDVIre);
var S2020 = S2020.addBands(NDVI1);
var S2020 = S2020.addBands(NDVI2);
var S2020 = S2020.addBands(NHI);
var S2020 = S2020.addBands(EVI);
var S2020 = S2020.addBands(EVI2);
var S2020 = S2020.addBands(EVI2_2);
var S2020 = S2020.addBands(MSAVI);
var S2020 = S2020.addBands(NormG);
var S2020 = S2020.addBands(NormNIR);
var S2020 = S2020.addBands(NormR);
var S2020 = S2020.addBands(RededgePeakArea);
var S2020 = S2020.addBands(RedSWIR1);
var S2020 = S2020.addBands(RTVIcore);
var S2020 = S2020.addBands(SAVI);
var S2020 = S2020.addBands(SRBlueRededge1);
var S2020 = S2020.addBands(SRBlueRededge2);
var S2020 = S2020.addBands(SRBlueRededge3);
var S2020 = S2020.addBands(SRNIRnarrowBlue);
var S2020 = S2020.addBands(SRNIRnarrowGreen);
var S2020 = S2020.addBands(SRNIRnarrowRed);
var S2020 = S2020.addBands(SRNIRnarrowRededge1);
var S2020 = S2020.addBands(SRNIRnarrowRededge2);
var S2020 = S2020.addBands(SRNIRnarrowRededge3);
var S2020 = S2020.addBands(STI);
var S2020 = S2020.addBands(WBI);
var S2020 = S2020.addBands(NDMI);
var S2020 = S2020.addBands(NDBR);
print (S2020, "allindices added");
var training_data = S2020.select(bands).sampleRegions({ // Generate training data
  collection: TrainingData, 
  properties: ['Code'], 
  geometries: true,
  scale: 10
});
var classifier = ee.Classifier.libsvm().train({ // Train the classifier with training data
  features: training_data, 
  classProperty: 'Code', 
  inputProperties: bands
});
var classified2020 = S2020.select(bands).classify(classifier); // Run the classification 
Map.addLayer(classified2020, {min: 0, max: 4, palette: HousingPalette}, '2020'); //Display classification 
//Configure the imagery
var images = {
  '2018': classified2018.visualize({min: 0, max: 4, palette: HousingPalette}),
  'Sentinel Image 2018': S2018_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  '2020': classified2020.visualize({min: 0, max: 4, palette: HousingPalette}),
  'Sentinel Image 2019': S2019_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel Image 2020': S2020_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
};
// ---------------------------------------------------------------------------------- //
// //Configure the imagery
// var images = {
//   '2017': getWeeklySentinelComposite('2017-12-30'),
//   '2018': getWeeklySentinelComposite('2018-12-30'),
//   '2019': getWeeklySentinelComposite('2019-12-30'),
//   '2020': getWeeklySentinelComposite('2020-12-30'),
// };
// // Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// // given date.
// function getWeeklySentinelComposite(date) {
//   var date = ee.Date(date);
//   // Only include the VV polarization, for consistent compositing.
//   var polarization = 'VV';
//   var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                       .filterDate(date, date.advance(1, 'week'))
//                       .filterBounds(roi)
//                       .filter(ee.Filter.listContains(
//                           'transmitterReceiverPolarisation', polarization))
//                       .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                       .select(polarization)
//                       .mean();
//   return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
// }
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//Tie everything together
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// // Create a title. -TO FINALISE
// var title = ui.Label('Change in alien trees at Tokai Park, South Africa', {
//   stretch: 'horizontal',
//   textAlign: 'center',
//   fontWeight: 'bold',
//   fontSize: '24px'
// });
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(18.59, -34.06, 14);
// ADD A KEY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var main = ui.Panel({style: {width: '310px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Alanna Housing Tool', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("This tool shows changes in housing between 2018-2020", {color: 'black'});
//var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'133px',height:'123px'}});
//var key = ui.Thumbnail({image:key,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'201px',height:'300px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main.add(title);
//main.add(branding);
main.add(descr);
//main.add(key);
ui.root.insert(0, main);
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////