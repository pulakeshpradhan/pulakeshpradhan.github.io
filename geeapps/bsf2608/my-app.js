var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/bsf2608/Study_area"
    }) || ee.FeatureCollection("users/bsf2608/Study_area"),
    Study_area = ui.import && ui.import("Study_area", "table", {
      "id": "users/bsf2608/Study_area"
    }) || ee.FeatureCollection("users/bsf2608/Study_area"),
    Water = ui.import && ui.import("Water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            81.6398397951096,
            20.437097306199988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6400758295029,
            20.43692639624276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63386159020888,
            20.436358325342272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66962221640773,
            20.4328256936537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66996553916164,
            20.432574348433825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6698689796371,
            20.433569673097065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67012647170253,
            20.43349929681735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68897865288591,
            20.429034901989354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68912885659074,
            20.429477279481468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68595312111711,
            20.42931641508608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67585243113089,
            20.426556410601947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67605627901602,
            20.426516193755276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65266266299214,
            20.42412887843016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65274849368062,
            20.423968008442216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68048014251087,
            20.43001249395263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68070544806812,
            20.430233681451977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66179179421479,
            20.41977554672275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66195272675569,
            20.41999674893927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66054188481385,
            20.422535524340354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66054724923188,
            20.422465143012538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64869136484013,
            20.41701014802752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66824608299383,
            20.415228759027087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66099493470821,
            20.414271860081087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65878258490187,
            20.41139506113415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65880940699202,
            20.411646440949873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66434303022533,
            20.410460654105893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67011835998528,
            20.411815760803073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67041876739495,
            20.41217020525611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67876933742572,
            20.420463858174095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.682422506104,
            20.41949609906686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68244664598514,
            20.419448339368934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68249224353839,
            20.41948855806291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68067353574455,
            20.42252506447642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6807003578347,
            20.422326488490974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68098735419929,
            20.42233905659891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68097394315421,
            20.422502441908744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68357344009223,
            20.423220781214788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68349297382179,
            20.423223294821845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68357612230125,
            20.4231529138086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68365927078071,
            20.423225808428867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68665261604133,
            20.423215754000527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68665798045936,
            20.42314034576712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67484126907301,
            20.439962400911554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67484126907301,
            20.439879460883994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67493246417952,
            20.439972454245183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66895037580167,
            20.436185844755318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66905498195325,
            20.436125523258074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66915958810483,
            20.436361782320475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66935538936292,
            20.43628638053148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66944658446943,
            20.436472371544095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63736725269607,
            20.44143709717977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63601634612165,
            20.437318487323935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63610217681013,
            20.437313460570433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63610217681013,
            20.437225492357495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6360082994946,
            20.437235545870085
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 1
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([81.6398397951096, 20.437097306199988]),
            {
              "LC": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6400758295029, 20.43692639624276]),
            {
              "LC": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63386159020888, 20.436358325342272]),
            {
              "LC": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66962221640773, 20.4328256936537]),
            {
              "LC": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66996553916164, 20.432574348433825]),
            {
              "LC": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6698689796371, 20.433569673097065]),
            {
              "LC": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67012647170253, 20.43349929681735]),
            {
              "LC": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68897865288591, 20.429034901989354]),
            {
              "LC": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68912885659074, 20.429477279481468]),
            {
              "LC": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68595312111711, 20.42931641508608]),
            {
              "LC": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67585243113089, 20.426556410601947]),
            {
              "LC": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67605627901602, 20.426516193755276]),
            {
              "LC": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65266266299214, 20.42412887843016]),
            {
              "LC": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65274849368062, 20.423968008442216]),
            {
              "LC": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68048014251087, 20.43001249395263]),
            {
              "LC": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68070544806812, 20.430233681451977]),
            {
              "LC": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66179179421479, 20.41977554672275]),
            {
              "LC": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66195272675569, 20.41999674893927]),
            {
              "LC": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66054188481385, 20.422535524340354]),
            {
              "LC": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66054724923188, 20.422465143012538]),
            {
              "LC": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64869136484013, 20.41701014802752]),
            {
              "LC": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66824608299383, 20.415228759027087]),
            {
              "LC": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66099493470821, 20.414271860081087]),
            {
              "LC": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65878258490187, 20.41139506113415]),
            {
              "LC": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65880940699202, 20.411646440949873]),
            {
              "LC": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66434303022533, 20.410460654105893]),
            {
              "LC": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67011835998528, 20.411815760803073]),
            {
              "LC": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67041876739495, 20.41217020525611]),
            {
              "LC": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67876933742572, 20.420463858174095]),
            {
              "LC": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([81.682422506104, 20.41949609906686]),
            {
              "LC": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68244664598514, 20.419448339368934]),
            {
              "LC": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68249224353839, 20.41948855806291]),
            {
              "LC": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68067353574455, 20.42252506447642]),
            {
              "LC": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6807003578347, 20.422326488490974]),
            {
              "LC": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68098735419929, 20.42233905659891]),
            {
              "LC": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68097394315421, 20.422502441908744]),
            {
              "LC": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68357344009223, 20.423220781214788]),
            {
              "LC": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68349297382179, 20.423223294821845]),
            {
              "LC": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68357612230125, 20.4231529138086]),
            {
              "LC": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68365927078071, 20.423225808428867]),
            {
              "LC": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68665261604133, 20.423215754000527]),
            {
              "LC": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68665798045936, 20.42314034576712]),
            {
              "LC": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67484126907301, 20.439962400911554]),
            {
              "LC": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67484126907301, 20.439879460883994]),
            {
              "LC": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67493246417952, 20.439972454245183]),
            {
              "LC": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66895037580167, 20.436185844755318]),
            {
              "LC": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66905498195325, 20.436125523258074]),
            {
              "LC": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66915958810483, 20.436361782320475]),
            {
              "LC": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66935538936292, 20.43628638053148]),
            {
              "LC": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66944658446943, 20.436472371544095]),
            {
              "LC": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63736725269607, 20.44143709717977]),
            {
              "LC": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63601634612165, 20.437318487323935]),
            {
              "LC": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63610217681013, 20.437313460570433]),
            {
              "LC": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63610217681013, 20.437225492357495]),
            {
              "LC": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6360082994946, 20.437235545870085]),
            {
              "LC": 1,
              "system:index": "54"
            })]),
    forest = ui.import && ui.import("forest", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            81.65621235467701,
            20.437860041171543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65624990560322,
            20.437674051837483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65663077928333,
            20.43762881115463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6567327032259,
            20.437875121377953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65665223695545,
            20.43795554912052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65730133153706,
            20.438262179503074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65739252664356,
            20.438015869899836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65731206037312,
            20.43792538872199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6578485021761,
            20.437960575853026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65760710336475,
            20.437915335254484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66234817415696,
            20.43374493278609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66272368341905,
            20.433770067135246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6624983778618,
            20.433327701989946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66364099890214,
            20.43361926097867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67828381609793,
            20.440573971447176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67821139645453,
            20.440473438474616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67820334982748,
            20.440420658637706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67828381609793,
            20.44042568528963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67879343581076,
            20.440548838210194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67924136471625,
            20.440601618003093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.70053372852236,
            20.437796545343655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.70065442792803,
            20.437794031974743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.70060614816576,
            20.437673390218386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.70031378738314,
            20.437701037295916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64072116496301,
            20.419569788892282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64053341033197,
            20.41966028086754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64034833790994,
            20.419843778320715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64031346919275,
            20.419798532393674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6401418078158,
            20.419519515549705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64128711106515,
            20.419574816225644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65518894051735,
            20.41891262391113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65530427550499,
            20.41899808892076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6552881822509,
            20.41886989138852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65521844481651,
            20.41899808892076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65545447920982,
            20.419008143624662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66541508222483,
            20.414572105571835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66535070920847,
            20.414345868055428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66560283685587,
            20.414300620512257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66548481965921,
            20.414114602695022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6650503017988,
            20.41434084055129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66589251542948,
            20.414773205307306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66590324426554,
            20.414722930398064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66565648103617,
            20.415165349035856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66572085405252,
            20.41525081612617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66572621847055,
            20.415165349035856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6663645842161,
            20.414446418103772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66638604188822,
            20.41451680309854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66601053262613,
            20.41407438259688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64296412329536,
            20.442426310370777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64276027541023,
            20.442416257197614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64273345332008,
            20.442360964733513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64262080054145,
            20.44216995424989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64285147051673,
            20.441913597701486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64293193678718,
            20.442220220189647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6432430730329,
            20.441797985784877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64276027541023,
            20.44142098980056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64256179194312,
            20.44136569697845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64243304591041,
            20.441285271019883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64255106310706,
            20.44127019114796
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 2
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([81.65621235467701, 20.437860041171543]),
            {
              "LC": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65624990560322, 20.437674051837483]),
            {
              "LC": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65663077928333, 20.43762881115463]),
            {
              "LC": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6567327032259, 20.437875121377953]),
            {
              "LC": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65665223695545, 20.43795554912052]),
            {
              "LC": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65730133153706, 20.438262179503074]),
            {
              "LC": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65739252664356, 20.438015869899836]),
            {
              "LC": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65731206037312, 20.43792538872199]),
            {
              "LC": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6578485021761, 20.437960575853026]),
            {
              "LC": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65760710336475, 20.437915335254484]),
            {
              "LC": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66234817415696, 20.43374493278609]),
            {
              "LC": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66272368341905, 20.433770067135246]),
            {
              "LC": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6624983778618, 20.433327701989946]),
            {
              "LC": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66364099890214, 20.43361926097867]),
            {
              "LC": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67828381609793, 20.440573971447176]),
            {
              "LC": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67821139645453, 20.440473438474616]),
            {
              "LC": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67820334982748, 20.440420658637706]),
            {
              "LC": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67828381609793, 20.44042568528963]),
            {
              "LC": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67879343581076, 20.440548838210194]),
            {
              "LC": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67924136471625, 20.440601618003093]),
            {
              "LC": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([81.70053372852236, 20.437796545343655]),
            {
              "LC": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([81.70065442792803, 20.437794031974743]),
            {
              "LC": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([81.70060614816576, 20.437673390218386]),
            {
              "LC": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([81.70031378738314, 20.437701037295916]),
            {
              "LC": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64072116496301, 20.419569788892282]),
            {
              "LC": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64053341033197, 20.41966028086754]),
            {
              "LC": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64034833790994, 20.419843778320715]),
            {
              "LC": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64031346919275, 20.419798532393674]),
            {
              "LC": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6401418078158, 20.419519515549705]),
            {
              "LC": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64128711106515, 20.419574816225644]),
            {
              "LC": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65518894051735, 20.41891262391113]),
            {
              "LC": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65530427550499, 20.41899808892076]),
            {
              "LC": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6552881822509, 20.41886989138852]),
            {
              "LC": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65521844481651, 20.41899808892076]),
            {
              "LC": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65545447920982, 20.419008143624662]),
            {
              "LC": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66541508222483, 20.414572105571835]),
            {
              "LC": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66535070920847, 20.414345868055428]),
            {
              "LC": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66560283685587, 20.414300620512257]),
            {
              "LC": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66548481965921, 20.414114602695022]),
            {
              "LC": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6650503017988, 20.41434084055129]),
            {
              "LC": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66589251542948, 20.414773205307306]),
            {
              "LC": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66590324426554, 20.414722930398064]),
            {
              "LC": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66565648103617, 20.415165349035856]),
            {
              "LC": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66572085405252, 20.41525081612617]),
            {
              "LC": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66572621847055, 20.415165349035856]),
            {
              "LC": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6663645842161, 20.414446418103772]),
            {
              "LC": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66638604188822, 20.41451680309854]),
            {
              "LC": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66601053262613, 20.41407438259688]),
            {
              "LC": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64296412329536, 20.442426310370777]),
            {
              "LC": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64276027541023, 20.442416257197614]),
            {
              "LC": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64273345332008, 20.442360964733513]),
            {
              "LC": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64262080054145, 20.44216995424989]),
            {
              "LC": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64285147051673, 20.441913597701486]),
            {
              "LC": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64293193678718, 20.442220220189647]),
            {
              "LC": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6432430730329, 20.441797985784877]),
            {
              "LC": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64276027541023, 20.44142098980056]),
            {
              "LC": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64256179194312, 20.44136569697845]),
            {
              "LC": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64243304591041, 20.441285271019883]),
            {
              "LC": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64255106310706, 20.44127019114796]),
            {
              "LC": 2,
              "system:index": "58"
            })]),
    agriLand = ui.import && ui.import("agriLand", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            81.64768069798146,
            20.434250167182565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64775579983387,
            20.43419487178161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64758950287495,
            20.433973689978984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64720862919484,
            20.43368213166221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64706114948011,
            20.43435336995861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64713893354154,
            20.434308128298767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64972994744993,
            20.434378504208333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6497621339581,
            20.434293047742536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65015044856989,
            20.432795208742153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65004584241831,
            20.432847991196596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6500619356724,
            20.432757506977886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63609052235861,
            20.430232561193524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63571501309653,
            20.43001640068475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63528049523612,
            20.430498991170072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63635337884207,
            20.42985553685318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63604224259635,
            20.42947851158871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63435075614164,
            20.428816173415548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63420591685484,
            20.428662848883494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.63450364205549,
            20.42889660589583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64396990592965,
            20.42492758434908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64464045818337,
            20.424947692981377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64362277465769,
            20.42413538068954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6437515206904,
            20.424090136024336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64233263212152,
            20.423848830918576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64251234012552,
            20.4238236949483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64255525546976,
            20.423728178223794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64232190328546,
            20.42399964665403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64191878185478,
            20.423208261864495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64197242603508,
            20.42309766310412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64133406028954,
            20.422574831524432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64070642338005,
            20.423323887756258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67740599224656,
            20.436473972139208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67755083153337,
            20.436428731103263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67746500084489,
            20.43668509679762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67807118008226,
            20.43606680233651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67943374226182,
            20.43541834449896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67981998035997,
            20.435086574315328
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 3
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([81.64768069798146, 20.434250167182565]),
            {
              "LC": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64775579983387, 20.43419487178161]),
            {
              "LC": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64758950287495, 20.433973689978984]),
            {
              "LC": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64720862919484, 20.43368213166221]),
            {
              "LC": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64706114948011, 20.43435336995861]),
            {
              "LC": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64713893354154, 20.434308128298767]),
            {
              "LC": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64972994744993, 20.434378504208333]),
            {
              "LC": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6497621339581, 20.434293047742536]),
            {
              "LC": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65015044856989, 20.432795208742153]),
            {
              "LC": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65004584241831, 20.432847991196596]),
            {
              "LC": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6500619356724, 20.432757506977886]),
            {
              "LC": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63609052235861, 20.430232561193524]),
            {
              "LC": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63571501309653, 20.43001640068475]),
            {
              "LC": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63528049523612, 20.430498991170072]),
            {
              "LC": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63635337884207, 20.42985553685318]),
            {
              "LC": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63604224259635, 20.42947851158871]),
            {
              "LC": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63435075614164, 20.428816173415548]),
            {
              "LC": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63420591685484, 20.428662848883494]),
            {
              "LC": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([81.63450364205549, 20.42889660589583]),
            {
              "LC": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64396990592965, 20.42492758434908]),
            {
              "LC": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64464045818337, 20.424947692981377]),
            {
              "LC": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64362277465769, 20.42413538068954]),
            {
              "LC": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6437515206904, 20.424090136024336]),
            {
              "LC": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64233263212152, 20.423848830918576]),
            {
              "LC": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64251234012552, 20.4238236949483]),
            {
              "LC": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64255525546976, 20.423728178223794]),
            {
              "LC": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64232190328546, 20.42399964665403]),
            {
              "LC": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64191878185478, 20.423208261864495]),
            {
              "LC": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64197242603508, 20.42309766310412]),
            {
              "LC": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64133406028954, 20.422574831524432]),
            {
              "LC": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64070642338005, 20.423323887756258]),
            {
              "LC": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67740599224656, 20.436473972139208]),
            {
              "LC": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67755083153337, 20.436428731103263]),
            {
              "LC": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67746500084489, 20.43668509679762]),
            {
              "LC": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67807118008226, 20.43606680233651]),
            {
              "LC": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67943374226182, 20.43541834449896]),
            {
              "LC": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67981998035997, 20.435086574315328]),
            {
              "LC": 3,
              "system:index": "36"
            })]),
    Fallow = ui.import && ui.import("Fallow", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            81.65039702733817,
            20.41530768965395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65053650220695,
            20.415315230862753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65075912555518,
            20.41574005169444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.65076717218223,
            20.415845628287293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66474340503963,
            20.413179986538218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6645395571545,
            20.413350922875832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6913375065792,
            20.430888235326062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.69318894789694,
            20.438896743775434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6931621258068,
            20.439168185434294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.69303874419211,
            20.439464760032212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.69035653517722,
            20.43804722882029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.69054428980826,
            20.437826052558886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67982214921606,
            20.43825895256872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67979532712592,
            20.43816847153392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67984897130621,
            20.437791466649145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67999917501105,
            20.437439594589307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68005818360938,
            20.43770601208008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67994553083075,
            20.437736172521635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68038004869116,
            20.438088043902734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68005281919135,
            20.4380729637172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68010109895361,
            20.43807799044588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68014937871588,
            20.43836451370867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68026203149451,
            20.43745970158585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68039077752722,
            20.43736922008071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6799187087406,
            20.436831356701155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.67981142038,
            20.436801196082094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6806750916828,
            20.436967079413662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6800259971012,
            20.43724857799103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68020838731421,
            20.436926865289106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.68040687078131,
            20.436635312571575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64230068409586,
            20.43179007828207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64219876015329,
            20.43178505134784
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 4
      },
      "color": "#bf04c2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([81.65039702733817, 20.41530768965395]),
            {
              "LC": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65053650220695, 20.415315230862753]),
            {
              "LC": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65075912555518, 20.41574005169444]),
            {
              "LC": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([81.65076717218223, 20.415845628287293]),
            {
              "LC": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66474340503963, 20.413179986538218]),
            {
              "LC": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6645395571545, 20.413350922875832]),
            {
              "LC": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6913375065792, 20.430888235326062]),
            {
              "LC": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([81.69318894789694, 20.438896743775434]),
            {
              "LC": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6931621258068, 20.439168185434294]),
            {
              "LC": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([81.69303874419211, 20.439464760032212]),
            {
              "LC": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([81.69035653517722, 20.43804722882029]),
            {
              "LC": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([81.69054428980826, 20.437826052558886]),
            {
              "LC": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67982214921606, 20.43825895256872]),
            {
              "LC": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67979532712592, 20.43816847153392]),
            {
              "LC": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67984897130621, 20.437791466649145]),
            {
              "LC": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67999917501105, 20.437439594589307]),
            {
              "LC": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68005818360938, 20.43770601208008]),
            {
              "LC": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67994553083075, 20.437736172521635]),
            {
              "LC": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68038004869116, 20.438088043902734]),
            {
              "LC": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68005281919135, 20.4380729637172]),
            {
              "LC": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68010109895361, 20.43807799044588]),
            {
              "LC": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68014937871588, 20.43836451370867]),
            {
              "LC": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68026203149451, 20.43745970158585]),
            {
              "LC": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68039077752722, 20.43736922008071]),
            {
              "LC": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6799187087406, 20.436831356701155]),
            {
              "LC": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([81.67981142038, 20.436801196082094]),
            {
              "LC": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6806750916828, 20.436967079413662]),
            {
              "LC": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6800259971012, 20.43724857799103]),
            {
              "LC": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68020838731421, 20.436926865289106]),
            {
              "LC": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([81.68040687078131, 20.436635312571575]),
            {
              "LC": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64230068409586, 20.43179007828207]),
            {
              "LC": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64219876015329, 20.43178505134784]),
            {
              "LC": 4,
              "system:index": "31"
            })]),
    Satl = ui.import && ui.import("Satl", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            81.662108945752,
            20.423893809883786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66212235679707,
            20.42376058923345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66171197881779,
            20.42384605155069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66143839349827,
            20.423944081797327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66201506843647,
            20.423770643626177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.66328911771855,
            20.424268335245063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.64809222938229,
            20.4228731027574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            81.6480224919479,
            20.422832884947958
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 5
      },
      "color": "#ff0000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([81.662108945752, 20.423893809883786]),
            {
              "LC": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66212235679707, 20.42376058923345]),
            {
              "LC": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66171197881779, 20.42384605155069]),
            {
              "LC": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66143839349827, 20.423944081797327]),
            {
              "LC": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66201506843647, 20.423770643626177]),
            {
              "LC": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([81.66328911771855, 20.424268335245063]),
            {
              "LC": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([81.64809222938229, 20.4228731027574]),
            {
              "LC": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([81.6480224919479, 20.422832884947958]),
            {
              "LC": 5,
              "system:index": "7"
            })]);
 var roi = Study_area;
//Map.addLayer(s2, {bands: ['B8', 'B4', 'B3'], max: 4000}, 'S2')
//Export.image.toAsset({ image:s2,
//  assetId:"S2",   description:"s2", region: roi,   scale:10, })
var filtered = s2
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2021-12-01', '2022-01-15'))
  .filter(ee.Filter.bounds(Study_area))
  .select('B.*')
var image2020 = filtered.median().clip(Study_area) 
// Display the input composite.
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B8', 'B3', 'B2'],
};
Map.addLayer(image2020, rgbVis, 'image2022');
// 2017
var filtered = s2
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2017-01-01', '2017-01-31'))
  .filter(ee.Filter.bounds(Study_area))
  .select('B.*')
var image2017 = filtered.median().clip(Study_area) 
// Display the input composite.
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B8', 'B3', 'B2'],
};
Map.addLayer(image2017, rgbVis, 'image2017');
// change training sets according to data
var training_point = Satl.merge(forest).merge(Water).merge(agriLand).merge(Fallow);
 var training_data = image2022.sampleRegions({
   collection: training_point,
   properties: ['LC'],
   scale:10
 })
  print(training_data)
  var classifier = ee.Classifier.smileCart()
  classifier= classifier.train({
    features:training_data,
    classProperty:"LC", 
    inputProperties:['B8','B4','B3']
  })
 print(classifier)
 var classified_image= image2022.classify(classifier)
 Export.image.toAsset({ image:classified_image,
 assetId:"classified_S2",
 description:"classified2022",
 scale:10,   })
 Map.addLayer(classified_image, 
 {palette: ['0215ff','18fff4','56ff00','c0c0c0','ff7ce3'],min:-0.35567,max:4.25565} )
 print(classifier.confusionMatrix())
 Export.image.toDrive({
  image:classified2022,
  description: 'classified2022',
  folder: 'GEE',
  scale: 10,
maxPixels: 357886932,
  region: table,
  fileFormat: 'GeoTIFF',
  formatOptions: {
    cloudOptimized: true
  }
});
//20190310T050649_20190310T051606_T43PGQ
//var s2 = ee.Image('COPERNICUS/S2/20150828T110656_20160412T015159_T30SVG');