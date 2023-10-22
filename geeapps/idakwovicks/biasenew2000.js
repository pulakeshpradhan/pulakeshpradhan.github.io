var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Biase_LGA"
    }) || ee.FeatureCollection("users/idakwovicks/Biase_LGA"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.102179183419622,
            5.620689793996859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.101878776009954,
            5.620433539871805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.158989304990255,
            5.49833611487199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.156714791745626,
            5.500472005536186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.15461193987795,
            5.501967124439208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.176727459981898,
            5.420297725367386
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.102179183419622, 5.620689793996859]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.101878776009954, 5.620433539871805]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.158989304990255, 5.49833611487199]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.156714791745626, 5.500472005536186]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.15461193987795, 5.501967124439208]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.176727459981898, 5.420297725367386]),
            {
              "landcover": 1,
              "system:index": "5"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            7.932441244557098,
            5.667955296821216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.937591085865692,
            5.668980228619533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935445318653778,
            5.665051313511959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.918708334400848,
            5.658218354027319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.914330969288543,
            5.659157890746059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.938706884815887,
            5.648822902927278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.929179678394989,
            5.660268250354469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.016812811329558,
            5.644295949343656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.014409552052214,
            5.6471146227107685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.025825033619597,
            5.635839847042132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.027112493946746,
            5.6332773674758805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.02925826115866,
            5.632081539809417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.02951575322409,
            5.625675278269341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.031146536305144,
            5.608842163748614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.010633001759246,
            5.585692950344507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.00230492930691,
            5.542158046972361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.998356717636987,
            5.547369221325909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.028795515368254,
            5.441178129905857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.027422224352629,
            5.442887006310369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05444508698903,
            5.327459161758205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05646210816823,
            5.327117321955362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.056032954725847,
            5.327373701825324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9612682702573645,
            5.766588116549752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962255323174845,
            5.766161134690417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.957277143243204,
            5.7723523401903325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.956161344293009,
            5.773120898914489
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#f8ff43",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #f8ff43 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([7.932441244557098, 5.667955296821216]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([7.937591085865692, 5.668980228619533]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935445318653778, 5.665051313511959]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([7.918708334400848, 5.658218354027319]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([7.914330969288543, 5.659157890746059]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.938706884815887, 5.648822902927278]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.929179678394989, 5.660268250354469]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.016812811329558, 5.644295949343656]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.014409552052214, 5.6471146227107685]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.025825033619597, 5.635839847042132]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.027112493946746, 5.6332773674758805]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.02925826115866, 5.632081539809417]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.02951575322409, 5.625675278269341]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.031146536305144, 5.608842163748614]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.010633001759246, 5.585692950344507]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.00230492930691, 5.542158046972361]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([7.998356717636987, 5.547369221325909]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.028795515368254, 5.441178129905857]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.027422224352629, 5.442887006310369]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05444508698903, 5.327459161758205]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05646210816823, 5.327117321955362]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.056032954725847, 5.327373701825324]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9612682702573645, 5.766588116549752]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962255323174845, 5.766161134690417]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([7.957277143243204, 5.7723523401903325]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([7.956161344293009, 5.773120898914489]),
            {
              "landcover": 3,
              "system:index": "25"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.048436938795671,
            5.327630081588306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.046291171583757,
            5.3243398665086445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.043072520765886,
            5.321690589620695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.043287097487077,
            5.319126762412956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.039295970472917,
            5.315879232616854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.03749352601491,
            5.31387088325021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.035047351393327,
            5.312717147673999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.03350239900075,
            5.311905258380858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.030026256117448,
            5.312204375613318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.038652240309343,
            5.308102183769919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.044145404371843,
            5.30904227181167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.049938975844011,
            5.310495132329508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.058479129347429,
            5.312802609642626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.060796557936296,
            5.3104524011866765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.08439999726735,
            5.309170465524495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.082983790907488,
            5.314554577386834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.133727390788245,
            5.289937497938055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.13209660770719,
            5.288313658386216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.131066639445471,
            5.286689814574519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.127890903971839,
            5.285236898080586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.125745136759924,
            5.286604348992783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.11913617374723,
            5.290963078617503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.122311909220862,
            5.292415981669763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.123513538859534,
            5.293783416718995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.136645634196448,
            5.290621218579894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.096011872663492,
            5.330642238002961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.099788422956461,
            5.340128167422345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.096097703351969,
            5.36473962342375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.078849937527082,
            5.393465012725699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.061791133908395,
            5.408975698237805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.044882488278512,
            5.421023817047864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.036728572873239,
            5.429910218733456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.027888011960153,
            5.438198379155518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.022394847897653,
            5.448109843804281
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.015270900754098,
            5.468615802901664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.007299286306035,
            5.659037043312375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.997857910573614,
            5.667065751023832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.990648132741582,
            5.672190399711641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9890262322777295,
            5.696116843372074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.983447237526753,
            5.709098542662585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978984041725972,
            5.7228485745083395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978469057595112,
            5.734207047083564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9664527612083935,
            5.730876390565719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.963620348488667,
            5.729851569265965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.967568560158589,
            5.727716518984441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9752933221214795,
            5.74539449453033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.976323290383198,
            5.750689240388117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.969679677728068,
            5.761933996950164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.96238406920756,
            5.761592408687531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.949337804559122,
            5.7688084170378335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.950925672295939,
            5.771669176005084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.951741063836466,
            5.7725231311079845
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#121eff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #121eff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.048436938795671, 5.327630081588306]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.046291171583757, 5.3243398665086445]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.043072520765886, 5.321690589620695]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.043287097487077, 5.319126762412956]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.039295970472917, 5.315879232616854]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.03749352601491, 5.31387088325021]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.035047351393327, 5.312717147673999]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.03350239900075, 5.311905258380858]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.030026256117448, 5.312204375613318]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.038652240309343, 5.308102183769919]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.044145404371843, 5.30904227181167]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.049938975844011, 5.310495132329508]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.058479129347429, 5.312802609642626]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.060796557936296, 5.3104524011866765]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.08439999726735, 5.309170465524495]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.082983790907488, 5.314554577386834]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([8.133727390788245, 5.289937497938055]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.13209660770719, 5.288313658386216]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.131066639445471, 5.286689814574519]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.127890903971839, 5.285236898080586]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.125745136759924, 5.286604348992783]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.11913617374723, 5.290963078617503]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([8.122311909220862, 5.292415981669763]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([8.123513538859534, 5.293783416718995]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([8.136645634196448, 5.290621218579894]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([8.096011872663492, 5.330642238002961]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([8.099788422956461, 5.340128167422345]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([8.096097703351969, 5.36473962342375]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([8.078849937527082, 5.393465012725699]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([8.061791133908395, 5.408975698237805]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([8.044882488278512, 5.421023817047864]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([8.036728572873239, 5.429910218733456]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([8.027888011960153, 5.438198379155518]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([8.022394847897653, 5.448109843804281]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([8.015270900754098, 5.468615802901664]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([8.007299286306035, 5.659037043312375]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([7.997857910573614, 5.667065751023832]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([7.990648132741582, 5.672190399711641]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9890262322777295, 5.696116843372074]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([7.983447237526753, 5.709098542662585]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978984041725972, 5.7228485745083395]),
            {
              "landcover": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978469057595112, 5.734207047083564]),
            {
              "landcover": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9664527612083935, 5.730876390565719]),
            {
              "landcover": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([7.963620348488667, 5.729851569265965]),
            {
              "landcover": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([7.967568560158589, 5.727716518984441]),
            {
              "landcover": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9752933221214795, 5.74539449453033]),
            {
              "landcover": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([7.976323290383198, 5.750689240388117]),
            {
              "landcover": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([7.969679677728068, 5.761933996950164]),
            {
              "landcover": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([7.96238406920756, 5.761592408687531]),
            {
              "landcover": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([7.949337804559122, 5.7688084170378335]),
            {
              "landcover": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([7.950925672295939, 5.771669176005084]),
            {
              "landcover": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([7.951741063836466, 5.7725231311079845]),
            {
              "landcover": 4,
              "system:index": "51"
            })]),
    vegetation2 = ui.import && ui.import("vegetation2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.130123944700806,
            5.529032260644829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.16170963806018,
            5.550560571741153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.1517532781969,
            5.525614996318089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.123944135130493,
            5.511262270974663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.047726483763306,
            5.469464787769855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.048413129271118,
            5.449642400005374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.026783795775025,
            5.479033981479108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.031246991575806,
            5.460920735492154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.047726483763306,
            5.441098065423559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.067295880735962,
            5.430161140081036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.107464642942993,
            5.407261310351379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.123944135130493,
            5.3713717760877575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.09956821960315,
            5.39529836799836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.137333722532837,
            5.351887999935658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.13973698181018,
            5.378891663547215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.15621647399768,
            5.352571651724737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.141796918333618,
            5.328301545905646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.171322675169556,
            5.340949467447226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.16994938415393,
            5.31291858774036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.15449986022815,
            5.310525648588968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.182652326048462,
            5.335138292627746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.196728558958618,
            5.344367779841043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05763902685034,
            5.385507209924182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.073775196283934,
            5.37080932117319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.95169085887248,
            5.540204957539946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.934868043931074,
            5.535420872319746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.955810731919355,
            5.532687091953144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.974693483384199,
            5.531661921057888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.914268678696699,
            5.55319013630041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05571312877792,
            5.561000148235381
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.042666864129483,
            5.583210679421572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.074252557488858,
            5.59721996643868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.030225839868294,
            5.6933067616444735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.021299448266731,
            5.670417150065196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.907545849609194,
            5.705718484626884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923338696288882,
            5.68487917581378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.142721936034976,
            5.655839537022207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.1495883911131,
            5.639781698656726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.138258740234194,
            5.626115103114283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.941939799050526,
            5.719901536945099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935759989480213,
            5.718022660413521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.929580179909901,
            5.7140940804594145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.92511698410912,
            5.726562958542383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.936618296364979,
            5.730320649289086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935245005349354,
            5.731857879285881
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.963438015266986,
            5.7435437042016515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.967214565559955,
            5.752083620294308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9642963221517515,
            5.756865917313375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.929792385384173,
            5.761648174090841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.948675136849017,
            5.741835705613693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9739093592611265,
            5.730562786603036
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 5
      },
      "color": "#13ba14",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #13ba14 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.130123944700806, 5.529032260644829]),
            {
              "landcover": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.16170963806018, 5.550560571741153]),
            {
              "landcover": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.1517532781969, 5.525614996318089]),
            {
              "landcover": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.123944135130493, 5.511262270974663]),
            {
              "landcover": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.047726483763306, 5.469464787769855]),
            {
              "landcover": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.048413129271118, 5.449642400005374]),
            {
              "landcover": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.026783795775025, 5.479033981479108]),
            {
              "landcover": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.031246991575806, 5.460920735492154]),
            {
              "landcover": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.047726483763306, 5.441098065423559]),
            {
              "landcover": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.067295880735962, 5.430161140081036]),
            {
              "landcover": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.107464642942993, 5.407261310351379]),
            {
              "landcover": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.123944135130493, 5.3713717760877575]),
            {
              "landcover": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.09956821960315, 5.39529836799836]),
            {
              "landcover": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.137333722532837, 5.351887999935658]),
            {
              "landcover": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.13973698181018, 5.378891663547215]),
            {
              "landcover": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.15621647399768, 5.352571651724737]),
            {
              "landcover": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([8.141796918333618, 5.328301545905646]),
            {
              "landcover": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.171322675169556, 5.340949467447226]),
            {
              "landcover": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.16994938415393, 5.31291858774036]),
            {
              "landcover": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.15449986022815, 5.310525648588968]),
            {
              "landcover": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.182652326048462, 5.335138292627746]),
            {
              "landcover": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.196728558958618, 5.344367779841043]),
            {
              "landcover": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05763902685034, 5.385507209924182]),
            {
              "landcover": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([8.073775196283934, 5.37080932117319]),
            {
              "landcover": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([7.95169085887248, 5.540204957539946]),
            {
              "landcover": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([7.934868043931074, 5.535420872319746]),
            {
              "landcover": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([7.955810731919355, 5.532687091953144]),
            {
              "landcover": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([7.974693483384199, 5.531661921057888]),
            {
              "landcover": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([7.914268678696699, 5.55319013630041]),
            {
              "landcover": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05571312877792, 5.561000148235381]),
            {
              "landcover": 5,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([8.042666864129483, 5.583210679421572]),
            {
              "landcover": 5,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([8.074252557488858, 5.59721996643868]),
            {
              "landcover": 5,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([8.030225839868294, 5.6933067616444735]),
            {
              "landcover": 5,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([8.021299448266731, 5.670417150065196]),
            {
              "landcover": 5,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([7.907545849609194, 5.705718484626884]),
            {
              "landcover": 5,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923338696288882, 5.68487917581378]),
            {
              "landcover": 5,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([8.142721936034976, 5.655839537022207]),
            {
              "landcover": 5,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([8.1495883911131, 5.639781698656726]),
            {
              "landcover": 5,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([8.138258740234194, 5.626115103114283]),
            {
              "landcover": 5,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([7.941939799050526, 5.719901536945099]),
            {
              "landcover": 5,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935759989480213, 5.718022660413521]),
            {
              "landcover": 5,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([7.929580179909901, 5.7140940804594145]),
            {
              "landcover": 5,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([7.92511698410912, 5.726562958542383]),
            {
              "landcover": 5,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([7.936618296364979, 5.730320649289086]),
            {
              "landcover": 5,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935245005349354, 5.731857879285881]),
            {
              "landcover": 5,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([7.963438015266986, 5.7435437042016515]),
            {
              "landcover": 5,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([7.967214565559955, 5.752083620294308]),
            {
              "landcover": 5,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9642963221517515, 5.756865917313375]),
            {
              "landcover": 5,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([7.929792385384173, 5.761648174090841]),
            {
              "landcover": 5,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([7.948675136849017, 5.741835705613693]),
            {
              "landcover": 5,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9739093592611265, 5.730562786603036]),
            {
              "landcover": 5,
              "system:index": "50"
            })]),
    vegetation1 = ui.import && ui.import("vegetation1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.056289960179845,
            5.704075239995276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.0538867009025,
            5.6992070945523645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.050195981298009,
            5.695449199661632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.066589642797032,
            5.704331457032339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.06289892319254,
            5.698523842764972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9661767128766,
            5.621670713586024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.950727188950819,
            5.622183220634124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9588811043560925,
            5.627649934392041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9636017922223035,
            5.622183220634124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.968843503740457,
            5.588683257321738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.968500180986551,
            5.591587622106724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.970989270952371,
            5.594150284947503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.97201923921409,
            5.597908836804642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.959402128008035,
            5.584182354252057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.961204572466043,
            5.581705071520709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.156789811500675,
            5.568297271554493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.139537843116885,
            5.564965660818464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.046934887695132,
            5.751152381137762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.053801342773257,
            5.75695946036647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.914744308962991,
            5.674734779312123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.909422806277444,
            5.681396725132144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.912169388308694,
            5.688058593891307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.916632584109475,
            5.684983894814531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.918692520632913,
            5.6798593598562945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.942210129275491,
            5.686350429765909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.940321854129007,
            5.691645722042469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.93723194934385,
            5.7095810267769735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.946844986453225,
            5.708043824653185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.944098404421975,
            5.712655681874083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.95971958972471,
            5.708727065102067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9454716954376,
            5.724441370434576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.929988949149518,
            5.748414706826879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.933078853934674,
            5.7463651254371095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935482113212018,
            5.7479023121712745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.932392208426862,
            5.753367831376478
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#78ff2b",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #78ff2b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.056289960179845, 5.704075239995276]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.0538867009025, 5.6992070945523645]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.050195981298009, 5.695449199661632]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.066589642797032, 5.704331457032339]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.06289892319254, 5.698523842764972]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9661767128766, 5.621670713586024]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.950727188950819, 5.622183220634124]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9588811043560925, 5.627649934392041]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9636017922223035, 5.622183220634124]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([7.968843503740457, 5.588683257321738]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([7.968500180986551, 5.591587622106724]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([7.970989270952371, 5.594150284947503]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([7.97201923921409, 5.597908836804642]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([7.959402128008035, 5.584182354252057]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([7.961204572466043, 5.581705071520709]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.156789811500675, 5.568297271554493]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([8.139537843116885, 5.564965660818464]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.046934887695132, 5.751152381137762]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.053801342773257, 5.75695946036647]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([7.914744308962991, 5.674734779312123]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([7.909422806277444, 5.681396725132144]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([7.912169388308694, 5.688058593891307]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([7.916632584109475, 5.684983894814531]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([7.918692520632913, 5.6798593598562945]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([7.942210129275491, 5.686350429765909]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([7.940321854129007, 5.691645722042469]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([7.93723194934385, 5.7095810267769735]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([7.946844986453225, 5.708043824653185]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([7.944098404421975, 5.712655681874083]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([7.95971958972471, 5.708727065102067]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9454716954376, 5.724441370434576]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([7.929988949149518, 5.748414706826879]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([7.933078853934674, 5.7463651254371095]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935482113212018, 5.7479023121712745]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([7.932392208426862, 5.753367831376478]),
            {
              "landcover": 2,
              "system:index": "34"
            })]);
//Determine Land Cover in 2001//
//load Landsat 7 Tier 1 TOA image collection
var landsat_7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
    .filterBounds(table)
    .filterDate('2000-12-15', '2000-12-31')
    .sort('CLOUD_COVER')
    .median();
    //clip by asset/table
var landsat_2001 = landsat_7.clip(table);
//Display the cliped image collection with visual parameters 
Map.addLayer(landsat_2001, {
 bands: ['B5', 'B4', 'B3'], min: 0, max: 0.3, gamma: 1.4}, 'landsat_2001');
//Merge feature
var classNames = urban.merge(vegetation1).merge(baresurface).merge(waterbody).merge(vegetation2);
print(classNames)
var bands = ['B5', 'B4', 'B3'];
var training = landsat_2001.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);
// Train a CART classifier with default parameters.
var classifier = ee.Classifier.smileCart().train(training, 'landcover', bands);
//Run the classification
var classified = landsat_2001.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 5, palette: ['red', '74A901', 'yellow','blue','056201']},
'classification');
Export.image.toDrive({
  image:classified,
  description:"biase2001",
  fileNamePrefix:"biase2001",
  scale:30,
  folder:"Joseph_facebook",
  region:table,
  maxPixels:5000000000,
  fileFormat:"GeoTIFF"
})                
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['ff0000', '74A901', 'FFFF00','0000ff','056201'];
// name of the legend
var names = ['Builtup','Primary Vegetation','Baresurface','waterbody','Secondary Vegetation'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);