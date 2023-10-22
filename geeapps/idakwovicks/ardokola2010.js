var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Ardo_kola"
    }) || ee.FeatureCollection("users/idakwovicks/Ardo_kola"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.317501949723585,
            8.911386004378938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.31638615077339,
            8.908842156476135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3156136745771,
            8.907739816886435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.314841198380812,
            8.906043903334673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.317158626969679,
            8.909011746887188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.315985505344436,
            8.907541879924144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.108081346407598,
            8.827559237387444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.107223039522832,
            8.827304795309923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10876799191541,
            8.827262388279939
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#ed3500",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ed3500 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.317501949723585, 8.911386004378938]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.31638615077339, 8.908842156476135]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3156136745771, 8.907739816886435]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.314841198380812, 8.906043903334673]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.317158626969679, 8.909011746887188]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.315985505344436, 8.907541879924144]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.108081346407598, 8.827559237387444]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.107223039522832, 8.827304795309923]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10876799191541, 8.827262388279939]),
            {
              "landcover": 1,
              "system:index": "8"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.198471923603973,
            8.835178871526397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.194180389180145,
            8.837214359766074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.185597320332489,
            8.838232099670076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.185253997578583,
            8.84349037772016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.170491119160614,
            8.823983485358138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24505186720178,
            8.782263712235011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.230460650160765,
            8.774120482090611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.222220904067015,
            8.779210021875238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.213466173842406,
            8.78582631920876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.19887495680139,
            8.804656672716984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.188918596938109,
            8.790915698349181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.173159295359438,
            8.762102737354843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.174532586375063,
            8.764986911790205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.158053094187563,
            8.757691603760351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.153246575632876,
            8.762781368647236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.12954623635975,
            8.738180193436165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.118388246857798,
            8.75107480528043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.115126680695688,
            8.760660641745115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.103024553620493,
            8.755825339180873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10036380227772,
            8.759642688535179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.089006801250546,
            8.749576735068697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.080509563091367,
            8.74126312142444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.076561351421445,
            8.740754118643247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.018840581236216,
            8.750218928905408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.01472070818934,
            8.752254884113654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02347543841395,
            8.750727918751515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.026822835264536,
            8.750218928905408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.030341893492075,
            8.750218928905408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.01050659881932,
            8.75880824739868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.009304969180649,
            8.763304196469784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.010592429507797,
            8.767884918836364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.015742270816391,
            8.767460780248912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.22072169665388,
            8.671489806086093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.208705400267162,
            8.66588969335877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.20475718859724,
            8.663513862752524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.250992716447405,
            8.659758469366533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.242752970353655,
            8.664510163021077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.227818430558733,
            8.673334577608447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.21116727699428,
            8.689116186609386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.17443174232631,
            8.663661650700377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.051496147622121,
            8.665019269494385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.050981163491262,
            8.66934664667902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.054328560341848,
            8.667564791519116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.04626047562505,
            8.681904243342842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.033385872353566,
            8.68114061770284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.032441734780324,
            8.684534497539993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.053985237587941,
            8.693443285985511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.049607872475637,
            8.695055329841924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.048610806773635,
            8.713098181882275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.078136563609572,
            8.731508038802131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.065565135414491,
            8.741563699901274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.044088811422025,
            8.762888419466446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.040827245259916,
            8.773296281085699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.499420528064043,
            8.619234027589936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.463714961657793,
            8.617197350241979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.450840358386309,
            8.615160661922683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.437450770983965,
            8.613802863615893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.42182958568123,
            8.614651488128905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.411388177716505,
            8.592955701500728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.37207772239424,
            8.593295170221799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.390445489728224,
            8.576660845684579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.460654992902052,
            8.586675475352148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.480739374005568,
            8.597708235933007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.532301555083992,
            8.632143629444084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.520628581451179,
            8.629937303890337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.49378614357499,
            8.631295044218824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.488636302266396,
            8.631464761416506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.495502757344521,
            8.639611097135182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.487263011250771,
            8.662861128501607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.48005323341874,
            8.668970387473498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.472156810078896,
            8.674061360752388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.462543772969521,
            8.67524924458921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.458252238545693,
            8.680509827833701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.427592270747686,
            8.671685581807688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.414374344722296,
            8.674909849590673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.439265244380499,
            8.690691392337353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.444586747066046,
            8.697988010132727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.428198082942016,
            8.706026368023997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.42287658025647,
            8.713153006703305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.447252495783813,
            8.725200110718562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.440729363459594,
            8.731138680949112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.454977257746704,
            8.743354870967746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.451200707453735,
            8.746408855904349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.440901024836547,
            8.745899860153859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.46630690862561,
            8.750820123263429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.466993554133422,
            8.77559011438339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.465276940363891,
            8.783394015928828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.39170097568542,
            8.775932061947419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.394619219093624,
            8.7721148799395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.397365801124874,
            8.788910187014686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.418737642555538,
            8.788486072460524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.419338457374874,
            8.793745058619926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.423029176979366,
            8.792133441762454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.425003282814327,
            8.790097705184037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.467759800014807,
            8.78780748816435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.461923313198401,
            8.787977134354877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.456430149135901,
            8.788995009867273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.4672318836557,
            8.799610493494377
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.198471923603973, 8.835178871526397]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.194180389180145, 8.837214359766074]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.185597320332489, 8.838232099670076]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.185253997578583, 8.84349037772016]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.170491119160614, 8.823983485358138]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24505186720178, 8.782263712235011]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.230460650160765, 8.774120482090611]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.222220904067015, 8.779210021875238]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.213466173842406, 8.78582631920876]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.19887495680139, 8.804656672716984]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.188918596938109, 8.790915698349181]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.173159295359438, 8.762102737354843]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.174532586375063, 8.764986911790205]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.158053094187563, 8.757691603760351]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.153246575632876, 8.762781368647236]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.12954623635975, 8.738180193436165]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.118388246857798, 8.75107480528043]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.115126680695688, 8.760660641745115]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.103024553620493, 8.755825339180873]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10036380227772, 8.759642688535179]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([11.089006801250546, 8.749576735068697]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([11.080509563091367, 8.74126312142444]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([11.076561351421445, 8.740754118643247]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([11.018840581236216, 8.750218928905408]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([11.01472070818934, 8.752254884113654]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02347543841395, 8.750727918751515]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([11.026822835264536, 8.750218928905408]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([11.030341893492075, 8.750218928905408]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([11.01050659881932, 8.75880824739868]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([11.009304969180649, 8.763304196469784]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([11.010592429507797, 8.767884918836364]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([11.015742270816391, 8.767460780248912]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([11.22072169665388, 8.671489806086093]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([11.208705400267162, 8.66588969335877]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([11.20475718859724, 8.663513862752524]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([11.250992716447405, 8.659758469366533]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([11.242752970353655, 8.664510163021077]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([11.227818430558733, 8.673334577608447]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([11.21116727699428, 8.689116186609386]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([11.17443174232631, 8.663661650700377]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([11.051496147622121, 8.665019269494385]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([11.050981163491262, 8.66934664667902]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([11.054328560341848, 8.667564791519116]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([11.04626047562505, 8.681904243342842]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([11.033385872353566, 8.68114061770284]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([11.032441734780324, 8.684534497539993]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([11.053985237587941, 8.693443285985511]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([11.049607872475637, 8.695055329841924]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([11.048610806773635, 8.713098181882275]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([11.078136563609572, 8.731508038802131]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.065565135414491, 8.741563699901274]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.044088811422025, 8.762888419466446]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.040827245259916, 8.773296281085699]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([11.499420528064043, 8.619234027589936]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([11.463714961657793, 8.617197350241979]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([11.450840358386309, 8.615160661922683]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([11.437450770983965, 8.613802863615893]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([11.42182958568123, 8.614651488128905]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([11.411388177716505, 8.592955701500728]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([11.37207772239424, 8.593295170221799]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([11.390445489728224, 8.576660845684579]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([11.460654992902052, 8.586675475352148]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([11.480739374005568, 8.597708235933007]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([11.532301555083992, 8.632143629444084]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([11.520628581451179, 8.629937303890337]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([11.49378614357499, 8.631295044218824]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([11.488636302266396, 8.631464761416506]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([11.495502757344521, 8.639611097135182]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([11.487263011250771, 8.662861128501607]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([11.48005323341874, 8.668970387473498]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([11.472156810078896, 8.674061360752388]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([11.462543772969521, 8.67524924458921]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([11.458252238545693, 8.680509827833701]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([11.427592270747686, 8.671685581807688]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([11.414374344722296, 8.674909849590673]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([11.439265244380499, 8.690691392337353]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([11.444586747066046, 8.697988010132727]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([11.428198082942016, 8.706026368023997]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([11.42287658025647, 8.713153006703305]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([11.447252495783813, 8.725200110718562]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([11.440729363459594, 8.731138680949112]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([11.454977257746704, 8.743354870967746]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([11.451200707453735, 8.746408855904349]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([11.440901024836547, 8.745899860153859]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([11.46630690862561, 8.750820123263429]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([11.466993554133422, 8.77559011438339]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([11.465276940363891, 8.783394015928828]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([11.39170097568542, 8.775932061947419]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([11.394619219093624, 8.7721148799395]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([11.397365801124874, 8.788910187014686]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([11.418737642555538, 8.788486072460524]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([11.419338457374874, 8.793745058619926]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([11.423029176979366, 8.792133441762454]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([11.425003282814327, 8.790097705184037]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([11.467759800014807, 8.78780748816435]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([11.461923313198401, 8.787977134354877]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([11.456430149135901, 8.788995009867273]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([11.4672318836557, 8.799610493494377]),
            {
              "landcover": 2,
              "system:index": "97"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.27150912759614,
            8.815483094096559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.26275439737153,
            8.820911327546586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.267045931795359,
            8.835499309371903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.275972323396921,
            8.846185487878909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.219794953809496,
            8.848374039853017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.22717639301848,
            8.867201201670522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.180658048140359,
            8.873407866676795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.177053159224343,
            8.882057714499828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.141347592818093,
            8.880700889115374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.130532926070046,
            8.890028962203097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.115426724898171,
            8.883584137055323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.056457659158458,
            8.866586963218207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.058860918435801,
            8.86065056491367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.049247881326426,
            8.866078132836536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.034485002908458,
            8.869809539263903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.023130422810743,
            8.88744840147669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.930869430576275,
            8.912875301604597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.93395933536143,
            8.914232007714826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.935847610507915,
            8.923050474575861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.918944128287613,
            8.911882358971312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.904181249869644,
            8.920361712528985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.89954639269191,
            8.91646123434414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.900233038199723,
            8.896110238095464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.89954639269191,
            8.883051086041432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.894031188475788,
            8.870456740640545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.888881347167194,
            8.858583973184535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.883903167235554,
            8.842131075976251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.896262786376179,
            8.822284851016368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.888023040282429,
            8.817704801336786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.877036712157429,
            8.819570754359967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.950894268376423,
            8.800795248962219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.954842480046345,
            8.80724152345146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.969945113181113,
            8.788411301405457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.048427105729418,
            8.794906417581434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.262827626637302,
            8.691165830371986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.26214098112949,
            8.685226625515018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.270037404469333,
            8.705249854141686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.266432515553317,
            8.70932224418268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24514650481113,
            8.71407330985487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.219397298268161,
            8.705249854141686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.25425642813851,
            8.643661297225579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.238635242835775,
            8.641964176689088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.230567158118978,
            8.6324601605348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.222670734779134,
            8.62804750023269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.316569507972494,
            8.631272141681563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.310218037025228,
            8.635005902626753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.305583179847494,
            8.640776187767518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.326525867835775,
            8.633817891787803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.339572132484212,
            8.640436761673806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.373389423743978,
            8.625501711215149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.332190693275228,
            8.602928298595307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.325954317299635,
            8.577132345754647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.38552081510237,
            8.599877027019293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.394103883950025,
            8.613455290517676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.379169344155104,
            8.622111179139921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.345627782609439,
            8.65384773956408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.326724105945102,
            8.663690621605959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.312991195788852,
            8.677436284275238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.254283004870883,
            8.674212038183178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.27934556590604,
            8.675399921543386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.458305541344508,
            8.705379760707094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.508890396684714,
            8.732107837983873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.417919749770759,
            8.779896298288229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.421095485244392,
            8.778284621223165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.428820247207282,
            8.769632340497395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.434570903335212,
            8.766154406145317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.439634913955329,
            8.757417012837742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.434570903335212,
            8.757162522576765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.416031474624274,
            8.76131917503146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.412769908462165,
            8.763185412038125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.399122828994392,
            8.767002685818838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.392599696670173,
            8.762676439238238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.370026225600837,
            8.756568711290681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.369854564223884,
            8.760301223624516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.333719844375251,
            8.759707417350059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.330544108901618,
            8.760301223624516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.328827495132087,
            8.763694384141049
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.300149448159056,
            8.76462749785276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.296201236489134,
            8.764203355546961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.294827945473509,
            8.76471232625585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.302123553994017,
            8.758434972140284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.300321109536009,
            8.758265312450007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.298347003701048,
            8.755296255342781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.295943744423704,
            8.754278287450845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.27337856994758,
            8.743936989343766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.270717818604806,
            8.741391986748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.269773681031564,
            8.736556433932373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.263336379395822,
            8.736980607741872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.314491469727853,
            8.737913788424018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.139151918333106,
            8.711004423520823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.062419282835059,
            8.740400540121664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.059501039426856,
            8.74082470955673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.051003801267676,
            8.73251090065209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.05563865844541,
            8.732171557575892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.063449251096777,
            8.731238362524662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.064736711423926,
            8.731068690446353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.039073335569434,
            8.717494674290398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.03340851012998,
            8.71800370880008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.040189134519629,
            8.707568362798055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.06662498657041,
            8.70968939166429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.036755906980567,
            8.717664352537343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.056138868001666,
            8.703702378270696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.055838460591998,
            8.703702378270696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.052491063741412,
            8.70448716846155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.029320408171705,
            8.70318406468957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.029749561614087,
            8.703131038192542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.03119795448213,
            8.696534483380677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.03267853385835,
            8.69661932726705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.033987451857618,
            8.696640538235627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.034867216414503,
            8.696831436898862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.031387465342094,
            8.692380489331699
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#fffe54",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fffe54 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.27150912759614, 8.815483094096559]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.26275439737153, 8.820911327546586]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.267045931795359, 8.835499309371903]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.275972323396921, 8.846185487878909]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.219794953809496, 8.848374039853017]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.22717639301848, 8.867201201670522]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.180658048140359, 8.873407866676795]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.177053159224343, 8.882057714499828]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.141347592818093, 8.880700889115374]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.130532926070046, 8.890028962203097]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.115426724898171, 8.883584137055323]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.056457659158458, 8.866586963218207]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.058860918435801, 8.86065056491367]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.049247881326426, 8.866078132836536]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.034485002908458, 8.869809539263903]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.023130422810743, 8.88744840147669]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([10.930869430576275, 8.912875301604597]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([10.93395933536143, 8.914232007714826]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([10.935847610507915, 8.923050474575861]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([10.918944128287613, 8.911882358971312]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([10.904181249869644, 8.920361712528985]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([10.89954639269191, 8.91646123434414]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([10.900233038199723, 8.896110238095464]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([10.89954639269191, 8.883051086041432]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([10.894031188475788, 8.870456740640545]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([10.888881347167194, 8.858583973184535]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([10.883903167235554, 8.842131075976251]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([10.896262786376179, 8.822284851016368]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([10.888023040282429, 8.817704801336786]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([10.877036712157429, 8.819570754359967]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([10.950894268376423, 8.800795248962219]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([10.954842480046345, 8.80724152345146]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([10.969945113181113, 8.788411301405457]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([11.048427105729418, 8.794906417581434]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([11.262827626637302, 8.691165830371986]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([11.26214098112949, 8.685226625515018]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([11.270037404469333, 8.705249854141686]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([11.266432515553317, 8.70932224418268]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24514650481113, 8.71407330985487]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([11.219397298268161, 8.705249854141686]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([11.25425642813851, 8.643661297225579]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([11.238635242835775, 8.641964176689088]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([11.230567158118978, 8.6324601605348]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([11.222670734779134, 8.62804750023269]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([11.316569507972494, 8.631272141681563]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([11.310218037025228, 8.635005902626753]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([11.305583179847494, 8.640776187767518]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([11.326525867835775, 8.633817891787803]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([11.339572132484212, 8.640436761673806]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([11.373389423743978, 8.625501711215149]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.332190693275228, 8.602928298595307]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.325954317299635, 8.577132345754647]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.38552081510237, 8.599877027019293]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([11.394103883950025, 8.613455290517676]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([11.379169344155104, 8.622111179139921]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([11.345627782609439, 8.65384773956408]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([11.326724105945102, 8.663690621605959]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([11.312991195788852, 8.677436284275238]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([11.254283004870883, 8.674212038183178]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([11.27934556590604, 8.675399921543386]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([11.458305541344508, 8.705379760707094]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([11.508890396684714, 8.732107837983873]),
            {
              "landcover": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([11.417919749770759, 8.779896298288229]),
            {
              "landcover": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([11.421095485244392, 8.778284621223165]),
            {
              "landcover": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([11.428820247207282, 8.769632340497395]),
            {
              "landcover": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([11.434570903335212, 8.766154406145317]),
            {
              "landcover": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([11.439634913955329, 8.757417012837742]),
            {
              "landcover": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([11.434570903335212, 8.757162522576765]),
            {
              "landcover": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([11.416031474624274, 8.76131917503146]),
            {
              "landcover": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([11.412769908462165, 8.763185412038125]),
            {
              "landcover": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([11.399122828994392, 8.767002685818838]),
            {
              "landcover": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([11.392599696670173, 8.762676439238238]),
            {
              "landcover": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([11.370026225600837, 8.756568711290681]),
            {
              "landcover": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([11.369854564223884, 8.760301223624516]),
            {
              "landcover": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([11.333719844375251, 8.759707417350059]),
            {
              "landcover": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([11.330544108901618, 8.760301223624516]),
            {
              "landcover": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([11.328827495132087, 8.763694384141049]),
            {
              "landcover": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([11.300149448159056, 8.76462749785276]),
            {
              "landcover": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([11.296201236489134, 8.764203355546961]),
            {
              "landcover": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([11.294827945473509, 8.76471232625585]),
            {
              "landcover": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([11.302123553994017, 8.758434972140284]),
            {
              "landcover": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([11.300321109536009, 8.758265312450007]),
            {
              "landcover": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([11.298347003701048, 8.755296255342781]),
            {
              "landcover": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([11.295943744423704, 8.754278287450845]),
            {
              "landcover": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([11.27337856994758, 8.743936989343766]),
            {
              "landcover": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([11.270717818604806, 8.741391986748]),
            {
              "landcover": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([11.269773681031564, 8.736556433932373]),
            {
              "landcover": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([11.263336379395822, 8.736980607741872]),
            {
              "landcover": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([11.314491469727853, 8.737913788424018]),
            {
              "landcover": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([11.139151918333106, 8.711004423520823]),
            {
              "landcover": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([11.062419282835059, 8.740400540121664]),
            {
              "landcover": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([11.059501039426856, 8.74082470955673]),
            {
              "landcover": 3,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([11.051003801267676, 8.73251090065209]),
            {
              "landcover": 3,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([11.05563865844541, 8.732171557575892]),
            {
              "landcover": 3,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([11.063449251096777, 8.731238362524662]),
            {
              "landcover": 3,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([11.064736711423926, 8.731068690446353]),
            {
              "landcover": 3,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([11.039073335569434, 8.717494674290398]),
            {
              "landcover": 3,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([11.03340851012998, 8.71800370880008]),
            {
              "landcover": 3,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([11.040189134519629, 8.707568362798055]),
            {
              "landcover": 3,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([11.06662498657041, 8.70968939166429]),
            {
              "landcover": 3,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([11.036755906980567, 8.717664352537343]),
            {
              "landcover": 3,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([11.056138868001666, 8.703702378270696]),
            {
              "landcover": 3,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([11.055838460591998, 8.703702378270696]),
            {
              "landcover": 3,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([11.052491063741412, 8.70448716846155]),
            {
              "landcover": 3,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([11.029320408171705, 8.70318406468957]),
            {
              "landcover": 3,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([11.029749561614087, 8.703131038192542]),
            {
              "landcover": 3,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([11.03119795448213, 8.696534483380677]),
            {
              "landcover": 3,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([11.03267853385835, 8.69661932726705]),
            {
              "landcover": 3,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([11.033987451857618, 8.696640538235627]),
            {
              "landcover": 3,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([11.034867216414503, 8.696831436898862]),
            {
              "landcover": 3,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([11.031387465342094, 8.692380489331699]),
            {
              "landcover": 3,
              "system:index": "110"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.007617343176705,
            9.070760917396493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.00246750186811,
            9.062285085012256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.99618347674677,
            9.056822720722062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.989832005799505,
            9.046990355235927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.98296555072138,
            9.04003972787406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.97472580462763,
            9.027324818539514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.973180852235052,
            9.021899654078197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.96871765643427,
            9.013083587890192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.960746126608116,
            9.003175848314157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.944781618551476,
            8.983507925459074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.941348391012413,
            8.974690923763898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.939631777242882,
            8.96689108978501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.939116793112023,
            8.955869299633216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.940318422750694,
            8.946712481380366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.936713533834679,
            8.935520501771151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.938773470358116,
            8.928906897671348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.94117672963546,
            8.925345676547193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.926757173971398,
            8.912796334645806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.924010591940148,
            8.909574136747185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.92246563954757,
            8.880441349589951
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.941520052389366,
            8.86381981965606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.944781618551476,
            8.866872810142892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.93843014760421,
            8.861784478570062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.910852860485925,
            8.838216439811266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.906389664685143,
            8.825494488533662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.902269791638268,
            8.816673678142308
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#1b12ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1b12ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.007617343176705, 9.070760917396493]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.00246750186811, 9.062285085012256]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([10.99618347674677, 9.056822720722062]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([10.989832005799505, 9.046990355235927]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([10.98296555072138, 9.04003972787406]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([10.97472580462763, 9.027324818539514]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([10.973180852235052, 9.021899654078197]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([10.96871765643427, 9.013083587890192]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([10.960746126608116, 9.003175848314157]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([10.944781618551476, 8.983507925459074]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([10.941348391012413, 8.974690923763898]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([10.939631777242882, 8.96689108978501]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([10.939116793112023, 8.955869299633216]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([10.940318422750694, 8.946712481380366]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([10.936713533834679, 8.935520501771151]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([10.938773470358116, 8.928906897671348]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([10.94117672963546, 8.925345676547193]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([10.926757173971398, 8.912796334645806]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([10.924010591940148, 8.909574136747185]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([10.92246563954757, 8.880441349589951]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([10.941520052389366, 8.86381981965606]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([10.944781618551476, 8.866872810142892]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([10.93843014760421, 8.861784478570062]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([10.910852860485925, 8.838216439811266]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([10.906389664685143, 8.825494488533662]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([10.902269791638268, 8.816673678142308]),
            {
              "landcover": 4,
              "system:index": "25"
            })]);
//Determine Land Cover in 2011//
//load Landsat 7 Tier 1 TOA image collection
var landsat_7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
    .filterBounds(table)
    .filterDate('2011-11-15', '2011-12-30')
    .sort('CLOUD_COVER')
    .median();
    //clip by asset/table
var landsat_2001 = landsat_7.clip(table);
//Display the cliped image collection with visual parameters 
Map.addLayer(landsat_2001, {
 bands: ['B5', 'B4', 'B3'], min: 0, max: 0.3, gamma: 1.4}, 'landsat_2001');
//Merge feature
var classNames = urban.merge(vegetation).merge(baresurface).merge(waterbody);
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
{min: 1, max: 4, palette: ['red', 'green','yellow', 'blue']},
'classification');
Export.image.toDrive({
  image:classified,
  description:"Ardo_Kola_2010",
  fileNamePrefix:"Ardo_Kola_2010",
  scale:30,
  folder:"Ardo_Kola",
  region:table,
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
var palette =['ff0000', '00ff00', 'FFFF00','0000ff'];
// name of the legend
var names = ['Builtup','Vegetation','Baresurface','waterbody'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);