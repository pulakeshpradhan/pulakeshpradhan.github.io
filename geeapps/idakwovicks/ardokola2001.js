var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Ardo_kola"
    }) || ee.FeatureCollection("users/idakwovicks/Ardo_kola"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.317576402202926,
            8.912661500328037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.316203111187301,
            8.91088081487078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.316803926006637,
            8.910541635704597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.312557805614544,
            8.905994242867836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.108187118697405,
            8.827581012802764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.108272949385881,
            8.826393615009824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.106255928206682,
            8.826902500246138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10479680650258,
            8.826351207875122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.107757965255022,
            8.827411384780595
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#fd3900",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fd3900 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.317576402202926, 8.912661500328037]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.316203111187301, 8.91088081487078]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.316803926006637, 8.910541635704597]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.312557805614544, 8.905994242867836]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.108187118697405, 8.827581012802764]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.108272949385881, 8.826393615009824]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.106255928206682, 8.826902500246138]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10479680650258, 8.826351207875122]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.107757965255022, 8.827411384780595]),
            {
              "landcover": 1,
              "system:index": "8"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.483788933728553,
            8.624440354672936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.509538140271522,
            8.622064262766784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.532197442029334,
            8.620706489254642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.56000658509574,
            8.634284004739818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.526704277966834,
            8.65091579532775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.50232836243949,
            8.653970534203733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.483445610974647,
            8.657364659438096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.456666436169959,
            8.668565055444367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.438470330212928,
            8.679086335510931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.473489251111365,
            8.68824979077709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.454949822400428,
            8.702164238986905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.440873589490272,
            8.716078170000463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.437343259427708,
            8.736099746849463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.428760190580052,
            8.731348961401025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.416743894193333,
            8.72388331918897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.401981015775364,
            8.728973545987452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.47648205337302,
            8.724901370101412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.48300518569724,
            8.733724361689697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.484035153958958,
            8.74322581151557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.524547238919896,
            8.716078170000463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.507381101224583,
            8.716756885098702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.549953122708958,
            8.665510435074717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.54514660415427,
            8.611070111120304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.52317394790427,
            8.603941538583666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.507381101224583,
            8.604959914307646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.48472179946677,
            8.604280997462649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.468928952787083,
            8.611070111120304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.451076169583958,
            8.618537995438416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.437686582181614,
            8.599868008303487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.43356670913474,
            8.58628925781764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.417773862455052,
            8.585610307531784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.396487851712864,
            8.587986628217335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.37760510024802,
            8.596812831848647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.370051999662083,
            8.588326101386055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.32929631743119,
            8.729422187946184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.325605597826698,
            8.730609896115272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.32354566130326,
            8.72988878803492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.313460555407264,
            8.732730794155685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.30732366118119,
            8.729337351503723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.301744666430213,
            8.729167678560954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.294933079009185,
            8.73544552605005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.285491703276763,
            8.73400332719163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.281715152983795,
            8.736505962828595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.210879787004187,
            8.692050575378698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.217242368600452,
            8.664923620851178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.173297056100452,
            8.670154520811064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.172438749215686,
            8.679318194135773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.16934884443053,
            8.677621234466232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.162997373483265,
            8.669475721300929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.082259271266594,
            8.661330031561903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.070586297633781,
            8.659802695091273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.076937768581047,
            8.740951510242951
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.067324731471672,
            8.748416810712369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.957525889609698,
            8.890515540081283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.947054545615558,
            8.877945567581357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.924652735923175,
            8.866751482617417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.90456835481966,
            8.865224990041499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.899504344199542,
            8.856150708834944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.892208735679034,
            8.849535671124013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.891779582236651,
            8.83961289162716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.896242778037433,
            8.8418179768442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.87306849214876,
            8.827569501109574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.915227237230276,
            8.811277450615616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.911708179002737,
            8.810598908103408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.937263492738415,
            8.797493801874484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.938808445130993,
            8.808435535778768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.940696720277478,
            8.813015700368675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.983869556581189,
            8.812930883021677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.986873630677868,
            8.8175109918981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.99030685821693,
            8.82285438047193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.956060413514782,
            8.834304238332402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.950824741517712,
            8.8345586755808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.937864307557751,
            8.8365941672455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.953485492860485,
            8.85152076245668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.99061416442793,
            8.86488467196872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.986150968627149,
            8.872405949372622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.975336301879102,
            8.882497446228891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.940239681148375,
            8.894199842624651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.936806453609313,
            8.89513262624845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.934832347774352,
            8.8997965087119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.957248209520536,
            8.915197554717917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.957419870897489,
            8.926096402006475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.079489126675242,
            9.058789010446498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.059233084194773,
            9.068282021687219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.045156851284617,
            9.073028433187561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.118456259243601,
            9.06726492534263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.113134756558054,
            9.061501324972822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.143175497524851,
            9.042175637500556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.141802206509226,
            9.036072573196613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.137167349331492,
            9.031834273265927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.175791159145945,
            9.013354703548014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.200853720181101,
            9.021323074436483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.20737685250532,
            8.991822269328523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.198107138149851,
            8.990635404982145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.185575857632273,
            8.986905234572067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.165148153774851,
            8.9792752209435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.202398672573679,
            8.960792967172663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.180597677700632,
            8.96503209935712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.172357931606882,
            8.971305924179815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.110495990197036,
            9.086823073944846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.104788249413344,
            9.087246841326948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10289997426686,
            9.088475763900071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10015339223561,
            9.087840114819693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.101998752037856,
            9.084534721419859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.095432704369399,
            9.085890783939735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.095317237813841,
            9.083168962997535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.09733425899304,
            9.079694016126652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.094936997212196,
            9.075885933688818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.091117531574989,
            9.075250262281278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.080689102925087,
            9.076733493813089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.076783806599403,
            9.07419080743206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.078328758991981,
            9.07071577356666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.08759847334745,
            9.062070421407249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.085881859577919,
            9.064104640641169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.06811490706327,
            9.067494980426016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.045541435993934,
            9.078004830243804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.05764356306913,
            9.094362290009265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.09309163740995,
            9.107837563226976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.095237404621864,
            9.103515361089936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.109914452351356,
            9.110464758593036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.112231880940223,
            9.113685165268373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.104850441731239,
            9.118783607760353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.100301415241981,
            9.122258174878972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.093778282917762,
            9.122173429741979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.083993584431434,
            9.119376828931268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.070518166340614,
            9.125732708164188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.03119618079813,
            9.133105386182432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.036088530041294,
            9.138359385497035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.021541386295452,
            9.114166066833711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.01682069842924,
            9.111962636790306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.035719937253242,
            9.108724896709848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.028939312863594,
            9.105504445329526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.016751355099922,
            9.102029715250149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.99984270947004,
            9.099656709452715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.992134067031225,
            9.075118687690912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.041804242783039,
            8.881336013709104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.040817189865558,
            8.881336013709104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.033864904098957,
            8.878919160243107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.031762052231281,
            8.87879195698791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.040731359177082,
            8.889561676277806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.041632581406086,
            8.88744167781254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.044851232223957,
            8.886508874601741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02905838554427,
            8.888756078306134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02905838554427,
            8.888756078306134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.0293158776097,
            8.88867127841659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.029537718864585,
            8.868712605510124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02241377172103,
            8.866889303932542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.020482581230308,
            8.866634889039249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.017521422477866,
            8.865320409283205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.015032332512046,
            8.865998851035009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.015633147331382,
            8.867228523516108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.018228062775743,
            8.854470789389575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.01427985110582,
            8.852859437649302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.023342391308976,
            8.94537645514407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.019565841016007,
            8.944359012933306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.01149775629921,
            8.973694121050107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.949871321973038,
            8.978441777035444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.944549819287491,
            8.973863681262367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.945751448926163,
            8.976407074936544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.94832636958046,
            8.971828953485641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.95107295161171,
            8.975559279026486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.33552564017858,
            8.824773844072412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.336126454997917,
            8.823162362454646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.336984761882682,
            8.826639761365216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.331834920574089,
            8.829777873713327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.330719121623893,
            8.831728578743805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.330976613689323,
            8.833679273455227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.329860814739128,
            8.832915959362436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.331234105754753,
            8.830456380981147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.330976613689323,
            8.829099365197342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.333465703655143,
            8.829353806037105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.345310338664909,
            8.821635689169218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.344366201091667,
            8.821466058414442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.250467968914899,
            8.91603187860248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.253300381634626,
            8.917007003201421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.269558151775122,
            8.917388572987875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.27084561210227,
            8.914463194436816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.270201881938696,
            8.912004162458372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.266768654399634,
            8.90780681102369
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#4dff19",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #4dff19 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.483788933728553, 8.624440354672936]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.509538140271522, 8.622064262766784]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.532197442029334, 8.620706489254642]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.56000658509574, 8.634284004739818]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.526704277966834, 8.65091579532775]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.50232836243949, 8.653970534203733]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.483445610974647, 8.657364659438096]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.456666436169959, 8.668565055444367]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.438470330212928, 8.679086335510931]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.473489251111365, 8.68824979077709]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.454949822400428, 8.702164238986905]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.440873589490272, 8.716078170000463]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.437343259427708, 8.736099746849463]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.428760190580052, 8.731348961401025]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.416743894193333, 8.72388331918897]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.401981015775364, 8.728973545987452]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.47648205337302, 8.724901370101412]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.48300518569724, 8.733724361689697]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.484035153958958, 8.74322581151557]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.524547238919896, 8.716078170000463]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([11.507381101224583, 8.716756885098702]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([11.549953122708958, 8.665510435074717]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([11.54514660415427, 8.611070111120304]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([11.52317394790427, 8.603941538583666]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([11.507381101224583, 8.604959914307646]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([11.48472179946677, 8.604280997462649]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([11.468928952787083, 8.611070111120304]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([11.451076169583958, 8.618537995438416]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([11.437686582181614, 8.599868008303487]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([11.43356670913474, 8.58628925781764]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([11.417773862455052, 8.585610307531784]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([11.396487851712864, 8.587986628217335]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([11.37760510024802, 8.596812831848647]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([11.370051999662083, 8.588326101386055]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([11.32929631743119, 8.729422187946184]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([11.325605597826698, 8.730609896115272]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([11.32354566130326, 8.72988878803492]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([11.313460555407264, 8.732730794155685]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([11.30732366118119, 8.729337351503723]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([11.301744666430213, 8.729167678560954]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([11.294933079009185, 8.73544552605005]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([11.285491703276763, 8.73400332719163]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([11.281715152983795, 8.736505962828595]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([11.210879787004187, 8.692050575378698]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([11.217242368600452, 8.664923620851178]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([11.173297056100452, 8.670154520811064]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([11.172438749215686, 8.679318194135773]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([11.16934884443053, 8.677621234466232]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([11.162997373483265, 8.669475721300929]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([11.082259271266594, 8.661330031561903]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.070586297633781, 8.659802695091273]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.076937768581047, 8.740951510242951]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.067324731471672, 8.748416810712369]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([10.957525889609698, 8.890515540081283]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([10.947054545615558, 8.877945567581357]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([10.924652735923175, 8.866751482617417]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([10.90456835481966, 8.865224990041499]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([10.899504344199542, 8.856150708834944]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([10.892208735679034, 8.849535671124013]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([10.891779582236651, 8.83961289162716]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([10.896242778037433, 8.8418179768442]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([10.87306849214876, 8.827569501109574]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([10.915227237230276, 8.811277450615616]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([10.911708179002737, 8.810598908103408]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([10.937263492738415, 8.797493801874484]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([10.938808445130993, 8.808435535778768]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([10.940696720277478, 8.813015700368675]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([10.983869556581189, 8.812930883021677]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([10.986873630677868, 8.8175109918981]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([10.99030685821693, 8.82285438047193]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([10.956060413514782, 8.834304238332402]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([10.950824741517712, 8.8345586755808]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([10.937864307557751, 8.8365941672455]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([10.953485492860485, 8.85152076245668]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([10.99061416442793, 8.86488467196872]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([10.986150968627149, 8.872405949372622]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([10.975336301879102, 8.882497446228891]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([10.940239681148375, 8.894199842624651]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([10.936806453609313, 8.89513262624845]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([10.934832347774352, 8.8997965087119]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([10.957248209520536, 8.915197554717917]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([10.957419870897489, 8.926096402006475]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([11.079489126675242, 9.058789010446498]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([11.059233084194773, 9.068282021687219]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([11.045156851284617, 9.073028433187561]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([11.118456259243601, 9.06726492534263]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([11.113134756558054, 9.061501324972822]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([11.143175497524851, 9.042175637500556]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([11.141802206509226, 9.036072573196613]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([11.137167349331492, 9.031834273265927]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([11.175791159145945, 9.013354703548014]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([11.200853720181101, 9.021323074436483]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([11.20737685250532, 8.991822269328523]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([11.198107138149851, 8.990635404982145]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([11.185575857632273, 8.986905234572067]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([11.165148153774851, 8.9792752209435]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([11.202398672573679, 8.960792967172663]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([11.180597677700632, 8.96503209935712]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([11.172357931606882, 8.971305924179815]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([11.110495990197036, 9.086823073944846]),
            {
              "landcover": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([11.104788249413344, 9.087246841326948]),
            {
              "landcover": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10289997426686, 9.088475763900071]),
            {
              "landcover": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10015339223561, 9.087840114819693]),
            {
              "landcover": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([11.101998752037856, 9.084534721419859]),
            {
              "landcover": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([11.095432704369399, 9.085890783939735]),
            {
              "landcover": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([11.095317237813841, 9.083168962997535]),
            {
              "landcover": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([11.09733425899304, 9.079694016126652]),
            {
              "landcover": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([11.094936997212196, 9.075885933688818]),
            {
              "landcover": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([11.091117531574989, 9.075250262281278]),
            {
              "landcover": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([11.080689102925087, 9.076733493813089]),
            {
              "landcover": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([11.076783806599403, 9.07419080743206]),
            {
              "landcover": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([11.078328758991981, 9.07071577356666]),
            {
              "landcover": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([11.08759847334745, 9.062070421407249]),
            {
              "landcover": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([11.085881859577919, 9.064104640641169]),
            {
              "landcover": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([11.06811490706327, 9.067494980426016]),
            {
              "landcover": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([11.045541435993934, 9.078004830243804]),
            {
              "landcover": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([11.05764356306913, 9.094362290009265]),
            {
              "landcover": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([11.09309163740995, 9.107837563226976]),
            {
              "landcover": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([11.095237404621864, 9.103515361089936]),
            {
              "landcover": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([11.109914452351356, 9.110464758593036]),
            {
              "landcover": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([11.112231880940223, 9.113685165268373]),
            {
              "landcover": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([11.104850441731239, 9.118783607760353]),
            {
              "landcover": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([11.100301415241981, 9.122258174878972]),
            {
              "landcover": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([11.093778282917762, 9.122173429741979]),
            {
              "landcover": 2,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([11.083993584431434, 9.119376828931268]),
            {
              "landcover": 2,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([11.070518166340614, 9.125732708164188]),
            {
              "landcover": 2,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([11.03119618079813, 9.133105386182432]),
            {
              "landcover": 2,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([11.036088530041294, 9.138359385497035]),
            {
              "landcover": 2,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([11.021541386295452, 9.114166066833711]),
            {
              "landcover": 2,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([11.01682069842924, 9.111962636790306]),
            {
              "landcover": 2,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([11.035719937253242, 9.108724896709848]),
            {
              "landcover": 2,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([11.028939312863594, 9.105504445329526]),
            {
              "landcover": 2,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([11.016751355099922, 9.102029715250149]),
            {
              "landcover": 2,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([10.99984270947004, 9.099656709452715]),
            {
              "landcover": 2,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([10.992134067031225, 9.075118687690912]),
            {
              "landcover": 2,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([11.041804242783039, 8.881336013709104]),
            {
              "landcover": 2,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([11.040817189865558, 8.881336013709104]),
            {
              "landcover": 2,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([11.033864904098957, 8.878919160243107]),
            {
              "landcover": 2,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([11.031762052231281, 8.87879195698791]),
            {
              "landcover": 2,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([11.040731359177082, 8.889561676277806]),
            {
              "landcover": 2,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([11.041632581406086, 8.88744167781254]),
            {
              "landcover": 2,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([11.044851232223957, 8.886508874601741]),
            {
              "landcover": 2,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02905838554427, 8.888756078306134]),
            {
              "landcover": 2,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02905838554427, 8.888756078306134]),
            {
              "landcover": 2,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([11.0293158776097, 8.88867127841659]),
            {
              "landcover": 2,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([11.029537718864585, 8.868712605510124]),
            {
              "landcover": 2,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02241377172103, 8.866889303932542]),
            {
              "landcover": 2,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([11.020482581230308, 8.866634889039249]),
            {
              "landcover": 2,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([11.017521422477866, 8.865320409283205]),
            {
              "landcover": 2,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([11.015032332512046, 8.865998851035009]),
            {
              "landcover": 2,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([11.015633147331382, 8.867228523516108]),
            {
              "landcover": 2,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([11.018228062775743, 8.854470789389575]),
            {
              "landcover": 2,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([11.01427985110582, 8.852859437649302]),
            {
              "landcover": 2,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([11.023342391308976, 8.94537645514407]),
            {
              "landcover": 2,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([11.019565841016007, 8.944359012933306]),
            {
              "landcover": 2,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([11.01149775629921, 8.973694121050107]),
            {
              "landcover": 2,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([10.949871321973038, 8.978441777035444]),
            {
              "landcover": 2,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([10.944549819287491, 8.973863681262367]),
            {
              "landcover": 2,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([10.945751448926163, 8.976407074936544]),
            {
              "landcover": 2,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([10.94832636958046, 8.971828953485641]),
            {
              "landcover": 2,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([10.95107295161171, 8.975559279026486]),
            {
              "landcover": 2,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([11.33552564017858, 8.824773844072412]),
            {
              "landcover": 2,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([11.336126454997917, 8.823162362454646]),
            {
              "landcover": 2,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([11.336984761882682, 8.826639761365216]),
            {
              "landcover": 2,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([11.331834920574089, 8.829777873713327]),
            {
              "landcover": 2,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([11.330719121623893, 8.831728578743805]),
            {
              "landcover": 2,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([11.330976613689323, 8.833679273455227]),
            {
              "landcover": 2,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([11.329860814739128, 8.832915959362436]),
            {
              "landcover": 2,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([11.331234105754753, 8.830456380981147]),
            {
              "landcover": 2,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([11.330976613689323, 8.829099365197342]),
            {
              "landcover": 2,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([11.333465703655143, 8.829353806037105]),
            {
              "landcover": 2,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([11.345310338664909, 8.821635689169218]),
            {
              "landcover": 2,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([11.344366201091667, 8.821466058414442]),
            {
              "landcover": 2,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([11.250467968914899, 8.91603187860248]),
            {
              "landcover": 2,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([11.253300381634626, 8.917007003201421]),
            {
              "landcover": 2,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([11.269558151775122, 8.917388572987875]),
            {
              "landcover": 2,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([11.27084561210227, 8.914463194436816]),
            {
              "landcover": 2,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([11.270201881938696, 8.912004162458372]),
            {
              "landcover": 2,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([11.266768654399634, 8.90780681102369]),
            {
              "landcover": 2,
              "system:index": "178"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.014278384658178,
            9.067660056308965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.011016818496069,
            9.061048867122732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02718898579667,
            9.042120534101727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02366992756913,
            9.043052937738093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.03019305989335,
            9.029236164015726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.02641650960038,
            9.032118234165795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.020408361407021,
            9.02296833983404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.060739005470491,
            8.998484298884279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.056619132423616,
            9.000730811533435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.090393508339144,
            8.955797912122677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.088676894569613,
            8.959189268443474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.106830085182406,
            8.96618384089596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.156189538925977,
            8.943835921984258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.15485916325459,
            8.944895759081684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.158077814072461,
            8.942140176210964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.164171792954297,
            8.940656392181223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.181520497845371,
            8.939622913484067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.182421720074375,
            8.941361064815853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.180619275616367,
            8.943904685956916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.194480931805332,
            8.941106701724495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.196369206951816,
            8.943438356744661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.144495383964435,
            8.792294375734967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.147413627372638,
            8.787841189377186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.148354202619686,
            8.736384365501271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.252794886145798,
            8.679625540796227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.251850748572556,
            8.67886191051957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.254940653357712,
            8.678098278689367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.27296509793779,
            8.662867741800548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.26484720424433,
            8.639556272803272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.339993320755472,
            8.595707440020615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.332096897415628,
            8.60359995183406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.314415775589456,
            8.607418850120327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.33968886228056,
            8.574816954279363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.375483209172573,
            8.855682603468352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.374753648320523,
            8.856573081361955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.37307994989523,
            8.85623385194246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.37157791284689,
            8.857802785384056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.385997468510952,
            8.854113660980941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.378358537236538,
            8.85415606491996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.372436219731656,
            8.853689621321946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.35059230951437,
            8.85216307450214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.351193124333706,
            8.847795419450042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.382993394414273,
            8.846565681977095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.381663018742886,
            8.848049847379782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.377714807072964,
            8.84652327716337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.374109918156948,
            8.847116944110933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.381608588658846,
            8.828316588343604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.378218276464022,
            8.828867877777798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.405855758153475,
            8.830776180995265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.412754274096763,
            8.833537716103008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.408548570361411,
            8.834555466159149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.062425251030716,
            8.991259184216064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.061395282768997,
            8.98786812763443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.049378986382278,
            8.95531237098013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.043199176811966,
            8.958364597169558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.030152912163528,
            8.950564412647855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.05384218218306,
            8.948190410241196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.049722309136184,
            8.9515818375084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.084741230034622,
            8.938694245770408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.067918415093216,
            8.947512120994318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.06482851030806,
            8.954634095013633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.226246123719807,
            8.975419530682487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.222469573426839,
            8.986949389661621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.200017052206439,
            9.037601370618093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.193837242636127,
            9.045908258565367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.190232353720111,
            9.04641683731463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.209630089315814,
            9.036414656697945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.211518364462298,
            9.036923248856693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.210316734823627,
            9.03556700150453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.160878258261127,
            9.008271439336985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.159504967245502,
            9.006406449842654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.150921898397845,
            8.995894510977633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.975191077934351,
            8.998383902114853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.973646125541773,
            9.000842349881697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.971071204887476,
            9.001266218497674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.97544856999978,
            8.997451383074615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.974332771049585,
            8.995416787736557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.976135215507593,
            8.995755887753885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.978109321342554,
            8.993212629880386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.974332771049585,
            9.008037179796093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.974504432426539,
            9.007359002471993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.983001670585718,
            9.02473689467718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.074508320136509,
            9.023309817213581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.074207912726841,
            9.024369421917102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.071203838630161,
            9.027632984847674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.077684055610142,
            9.029625015238524
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#f5e344",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f5e344 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.014278384658178, 9.067660056308965]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.011016818496069, 9.061048867122732]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02718898579667, 9.042120534101727]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02366992756913, 9.043052937738093]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.03019305989335, 9.029236164015726]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.02641650960038, 9.032118234165795]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.020408361407021, 9.02296833983404]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.060739005470491, 8.998484298884279]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.056619132423616, 9.000730811533435]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.090393508339144, 8.955797912122677]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.088676894569613, 8.959189268443474]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.106830085182406, 8.96618384089596]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.156189538925977, 8.943835921984258]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.15485916325459, 8.944895759081684]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.158077814072461, 8.942140176210964]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.164171792954297, 8.940656392181223]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.181520497845371, 8.939622913484067]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.182421720074375, 8.941361064815853]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.180619275616367, 8.943904685956916]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.194480931805332, 8.941106701724495]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([11.196369206951816, 8.943438356744661]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([11.144495383964435, 8.792294375734967]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([11.147413627372638, 8.787841189377186]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([11.148354202619686, 8.736384365501271]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([11.252794886145798, 8.679625540796227]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([11.251850748572556, 8.67886191051957]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([11.254940653357712, 8.678098278689367]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([11.27296509793779, 8.662867741800548]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([11.26484720424433, 8.639556272803272]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([11.339993320755472, 8.595707440020615]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([11.332096897415628, 8.60359995183406]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([11.314415775589456, 8.607418850120327]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([11.33968886228056, 8.574816954279363]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([11.375483209172573, 8.855682603468352]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([11.374753648320523, 8.856573081361955]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([11.37307994989523, 8.85623385194246]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([11.37157791284689, 8.857802785384056]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([11.385997468510952, 8.854113660980941]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([11.378358537236538, 8.85415606491996]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([11.372436219731656, 8.853689621321946]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([11.35059230951437, 8.85216307450214]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([11.351193124333706, 8.847795419450042]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([11.382993394414273, 8.846565681977095]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([11.381663018742886, 8.848049847379782]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([11.377714807072964, 8.84652327716337]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([11.374109918156948, 8.847116944110933]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([11.381608588658846, 8.828316588343604]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([11.378218276464022, 8.828867877777798]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([11.405855758153475, 8.830776180995265]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([11.412754274096763, 8.833537716103008]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.408548570361411, 8.834555466159149]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.062425251030716, 8.991259184216064]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.061395282768997, 8.98786812763443]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([11.049378986382278, 8.95531237098013]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([11.043199176811966, 8.958364597169558]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([11.030152912163528, 8.950564412647855]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([11.05384218218306, 8.948190410241196]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([11.049722309136184, 8.9515818375084]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([11.084741230034622, 8.938694245770408]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([11.067918415093216, 8.947512120994318]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([11.06482851030806, 8.954634095013633]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([11.226246123719807, 8.975419530682487]),
            {
              "landcover": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([11.222469573426839, 8.986949389661621]),
            {
              "landcover": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([11.200017052206439, 9.037601370618093]),
            {
              "landcover": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([11.193837242636127, 9.045908258565367]),
            {
              "landcover": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([11.190232353720111, 9.04641683731463]),
            {
              "landcover": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([11.209630089315814, 9.036414656697945]),
            {
              "landcover": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([11.211518364462298, 9.036923248856693]),
            {
              "landcover": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([11.210316734823627, 9.03556700150453]),
            {
              "landcover": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([11.160878258261127, 9.008271439336985]),
            {
              "landcover": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([11.159504967245502, 9.006406449842654]),
            {
              "landcover": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([11.150921898397845, 8.995894510977633]),
            {
              "landcover": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([10.975191077934351, 8.998383902114853]),
            {
              "landcover": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([10.973646125541773, 9.000842349881697]),
            {
              "landcover": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([10.971071204887476, 9.001266218497674]),
            {
              "landcover": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([10.97544856999978, 8.997451383074615]),
            {
              "landcover": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([10.974332771049585, 8.995416787736557]),
            {
              "landcover": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([10.976135215507593, 8.995755887753885]),
            {
              "landcover": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([10.978109321342554, 8.993212629880386]),
            {
              "landcover": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([10.974332771049585, 9.008037179796093]),
            {
              "landcover": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([10.974504432426539, 9.007359002471993]),
            {
              "landcover": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([10.983001670585718, 9.02473689467718]),
            {
              "landcover": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([11.074508320136509, 9.023309817213581]),
            {
              "landcover": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([11.074207912726841, 9.024369421917102]),
            {
              "landcover": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([11.071203838630161, 9.027632984847674]),
            {
              "landcover": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([11.077684055610142, 9.029625015238524]),
            {
              "landcover": 3,
              "system:index": "85"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.413226342883384,
            8.835785243728052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.429334137425222,
            8.828095300166511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.42989203690032,
            8.826823089872647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.442870478088869,
            8.81486121204054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.441969255859865,
            8.810069025347206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.442055086548342,
            8.812655965705114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.944500338112894,
            8.981445475383644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.94982184079844,
            8.98712557790879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.95308340696055,
            8.99292504619182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.962181459939066,
            9.0000461288572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.968331311673087,
            9.013241036765256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.966958020657462,
            9.01001972953072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.974205375243121,
            9.022473912787433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.977552772093707,
            9.030950682900764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.980814338255817,
            9.037392894889685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.990204393297542,
            9.049043067409302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.007569112600892,
            9.068448136982486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.029391043218716,
            9.084706809575884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.040945686663042,
            9.101334118591755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.04274813112105,
            9.110656507034337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.93940896992001,
            8.938737956238253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.939838123362392,
            8.92991986861474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.913573932688564,
            8.89204960695463
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#4841ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #4841ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.413226342883384, 8.835785243728052]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.429334137425222, 8.828095300166511]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.42989203690032, 8.826823089872647]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.442870478088869, 8.81486121204054]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.441969255859865, 8.810069025347206]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.442055086548342, 8.812655965705114]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([10.944500338112894, 8.981445475383644]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([10.94982184079844, 8.98712557790879]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([10.95308340696055, 8.99292504619182]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([10.962181459939066, 9.0000461288572]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([10.968331311673087, 9.013241036765256]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([10.966958020657462, 9.01001972953072]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([10.974205375243121, 9.022473912787433]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([10.977552772093707, 9.030950682900764]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([10.980814338255817, 9.037392894889685]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([10.990204393297542, 9.049043067409302]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.007569112600892, 9.068448136982486]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.029391043218716, 9.084706809575884]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.040945686663042, 9.101334118591755]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.04274813112105, 9.110656507034337]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([10.93940896992001, 8.938737956238253]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([10.939838123362392, 8.92991986861474]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([10.913573932688564, 8.89204960695463]),
            {
              "landcover": 4,
              "system:index": "22"
            })]);
//Determine Land Cover in 2001//
//load Landsat 7 Tier 1 TOA image collection
var landsat_7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
    .filterBounds(table)
    .filterDate('2000-11-15', '2000-12-30')
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
  description:"Ardo_Kola_2000",
  fileNamePrefix:"Ardo_Kola_2000",
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