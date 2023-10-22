var lawu = ui.import && ui.import("lawu", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.20082667351228,
            -7.626758322278291
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffed49",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffed49 */
    /* shown: false */
    ee.Geometry.Point([111.20082667351228, -7.626758322278291]),
    batashutan = ui.import && ui.import("batashutan", "table", {
      "id": "users/putriadinda2501/TUGAS_AKHIR/BATAS_HUTAN_POLYGON"
    }) || ee.FeatureCollection("users/putriadinda2501/TUGAS_AKHIR/BATAS_HUTAN_POLYGON"),
    magetan = ui.import && ui.import("magetan", "table", {
      "id": "users/putriadinda2501/TUGAS_AKHIR/MAGETAN"
    }) || ee.FeatureCollection("users/putriadinda2501/TUGAS_AKHIR/MAGETAN"),
    desa = ui.import && ui.import("desa", "table", {
      "id": "users/putriadinda2501/TUGAS_AKHIR/desa"
    }) || ee.FeatureCollection("users/putriadinda2501/TUGAS_AKHIR/desa"),
    sampel = ui.import && ui.import("sampel", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.24446435606212,
            -7.607316308338627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24384208357067,
            -7.607943737937176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24593154615383,
            -7.602340460378218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24574200316516,
            -7.602124224912975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24970220226429,
            -7.601700989343087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2482073179916,
            -7.601637182056943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24847196217785,
            -7.600814776403089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23536751065153,
            -7.611018059974525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23546049411566,
            -7.611464701012519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23875990032275,
            -7.616564029779239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.239206934722,
            -7.6175707310319885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23941793472795,
            -7.618637689543073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24003294632253,
            -7.613966064355195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23897660965262,
            -7.624365455788681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22095249545467,
            -7.615698765077565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24073289243327,
            -7.6248104051746095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19283924017114,
            -7.657034019107039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19931945715112,
            -7.658437595405622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24658416063808,
            -7.634584922484675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24776433260463,
            -7.633117465145594
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([111.24446435606212, -7.607316308338627]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24384208357067, -7.607943737937176]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24593154615383, -7.602340460378218]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24574200316516, -7.602124224912975]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24970220226429, -7.601700989343087]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2482073179916, -7.601637182056943]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24847196217785, -7.600814776403089]),
            {
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23536751065153, -7.611018059974525]),
            {
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23546049411566, -7.611464701012519]),
            {
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23875990032275, -7.616564029779239]),
            {
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([111.239206934722, -7.6175707310319885]),
            {
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23941793472795, -7.618637689543073]),
            {
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24003294632253, -7.613966064355195]),
            {
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23897660965262, -7.624365455788681]),
            {
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22095249545467, -7.615698765077565]),
            {
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24073289243327, -7.6248104051746095]),
            {
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19283924017114, -7.657034019107039]),
            {
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19931945715112, -7.658437595405622]),
            {
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24658416063808, -7.634584922484675]),
            {
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24776433260463, -7.633117465145594]),
            {
              "system:index": "19"
            })]),
    fire1 = ui.import && ui.import("fire1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.24053128513478,
            -7.624861849068073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2404990986266,
            -7.6244683917493195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23894341723425,
            -7.624383319884147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23921521435986,
            -7.624642080034135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23860009448035,
            -7.624071389621269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2379957034369,
            -7.623706288966987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24091037045727,
            -7.623826807736464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2410212352057,
            -7.623840986346191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24160059235291,
            -7.623887066946221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24059208176331,
            -7.624978822747537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24054201397084,
            -7.625177323355618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24389531745872,
            -7.6079266377917225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24431731812545,
            -7.6076997705809415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24446752183029,
            -7.60726021512005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24488236972137,
            -7.60703334788137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23544605938274,
            -7.611122522212773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2353090501433,
            -7.611230445012754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21447163990742,
            -7.642056254891556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21447879268307,
            -7.640276904609551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21478635286839,
            -7.640241459203479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21404963924068,
            -7.640220192023331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21319133235592,
            -7.641070878403267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21274787368965,
            -7.639745224832296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2116749900837,
            -7.639539641699507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21381360484737,
            -7.641219748345554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2149007933498,
            -7.642779335313709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2166460175671,
            -7.642417795255688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2164626364873,
            -7.6434641511856976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21784308027857,
            -7.6440100044357155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21280052733057,
            -7.644541678902908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21249296714525,
            -7.644640924838278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21487141086124,
            -7.646232925241557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21522903851161,
            -7.645878476966584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21629476934191,
            -7.6474734917234635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21620594856738,
            -7.647049225044923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2118821146541,
            -7.644480486695271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20901186541198,
            -7.642214245056226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20873138919944,
            -7.641862386605319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20701134560366,
            -7.649130753806959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20724737999697,
            -7.649570266085981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20776951690348,
            -7.648645162987403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20805204270144,
            -7.650094844675413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2087100780889,
            -7.650300422724683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.209414604881,
            -7.650378400646663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20615323069029,
            -7.652020183599369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20632131567942,
            -7.652020183599369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20849926939951,
            -7.652502226202667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20824177733408,
            -7.652186772092549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2094505597484,
            -7.652480959633491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20971520458949,
            -7.651814606541261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20713313115954,
            -7.652449059777733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20493163312902,
            -7.653144553058331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2044774457904,
            -7.652775933039215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20367635931005,
            -7.652527823050556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20309193888568,
            -7.6525529008574305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20750294564306,
            -7.654380544769335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20671616422288,
            -7.65402964778806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2089155756151,
            -7.653508618404265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2095128140466,
            -7.6543132011429735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20794446548898,
            -7.654713847229202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20819480477876,
            -7.654898156603094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20921404420442,
            -7.655518427531045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21028080225966,
            -7.654065241507303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21068849802992,
            -7.653274836258066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19456620164009,
            -7.6509232273707735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19375081009956,
            -7.650689294185376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19162175627532,
            -7.654382083645287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19160745072402,
            -7.6551547647577385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19376752348724,
            -7.655246919521577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19454715180434,
            -7.655339074265505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19917002772785,
            -7.655334054888975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19948627911045,
            -7.6586713750407345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19958641535023,
            -7.659642533612642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19914295635654,
            -7.660011147368559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19942905886974,
            -7.660330140158929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20267053520197,
            -7.662488087272981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19919342585384,
            -7.636425244403574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20172696573957,
            -7.633681744596816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1933810040963,
            -7.647406574944079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19531934703525,
            -7.649363118145656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19104446714746,
            -7.652739618757179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19312112338282,
            -7.65898732634394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19120925411556,
            -7.660882135235667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19077294789753,
            -7.661378345341419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19952274183713,
            -7.6575179081146425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19832826497411,
            -7.656575100396245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19716921494367,
            -7.653203629712934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19441245632429,
            -7.653719297535807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19250756939701,
            -7.651195697431929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19498235413894,
            -7.650089831040698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19669181578766,
            -7.647871000832872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20490963279767,
            -7.6476648370046245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20860050234269,
            -7.647379157208851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20226333629189,
            -7.649796479470364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20460937532853,
            -7.65043448010013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20576812719452,
            -7.652916438544611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20926877892565,
            -7.65314498345936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2055657869566,
            -7.651519929105959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20590711268339,
            -7.647937394727006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23923203590981,
            -7.617579854146322
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#0658ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0658ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([111.24053128513478, -7.624861849068073]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2404990986266, -7.6244683917493195]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23894341723425, -7.624383319884147]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23921521435986, -7.624642080034135]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23860009448035, -7.624071389621269]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2379957034369, -7.623706288966987]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24091037045727, -7.623826807736464]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2410212352057, -7.623840986346191]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24160059235291, -7.623887066946221]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24059208176331, -7.624978822747537]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24054201397084, -7.625177323355618]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24389531745872, -7.6079266377917225]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24431731812545, -7.6076997705809415]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24446752183029, -7.60726021512005]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24488236972137, -7.60703334788137]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23544605938274, -7.611122522212773]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2353090501433, -7.611230445012754]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21447163990742, -7.642056254891556]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21447879268307, -7.640276904609551]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21478635286839, -7.640241459203479]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21404963924068, -7.640220192023331]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21319133235592, -7.641070878403267]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21274787368965, -7.639745224832296]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2116749900837, -7.639539641699507]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21381360484737, -7.641219748345554]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2149007933498, -7.642779335313709]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2166460175671, -7.642417795255688]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2164626364873, -7.6434641511856976]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21784308027857, -7.6440100044357155]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21280052733057, -7.644541678902908]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21249296714525, -7.644640924838278]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21487141086124, -7.646232925241557]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21522903851161, -7.645878476966584]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21629476934191, -7.6474734917234635]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21620594856738, -7.647049225044923]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2118821146541, -7.644480486695271]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20901186541198, -7.642214245056226]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20873138919944, -7.641862386605319]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20701134560366, -7.649130753806959]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20724737999697, -7.649570266085981]),
            {
              "landcover": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20776951690348, -7.648645162987403]),
            {
              "landcover": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20805204270144, -7.650094844675413]),
            {
              "landcover": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2087100780889, -7.650300422724683]),
            {
              "landcover": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([111.209414604881, -7.650378400646663]),
            {
              "landcover": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20615323069029, -7.652020183599369]),
            {
              "landcover": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20632131567942, -7.652020183599369]),
            {
              "landcover": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20849926939951, -7.652502226202667]),
            {
              "landcover": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20824177733408, -7.652186772092549]),
            {
              "landcover": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2094505597484, -7.652480959633491]),
            {
              "landcover": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20971520458949, -7.651814606541261]),
            {
              "landcover": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20713313115954, -7.652449059777733]),
            {
              "landcover": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20493163312902, -7.653144553058331]),
            {
              "landcover": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2044774457904, -7.652775933039215]),
            {
              "landcover": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20367635931005, -7.652527823050556]),
            {
              "landcover": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20309193888568, -7.6525529008574305]),
            {
              "landcover": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20750294564306, -7.654380544769335]),
            {
              "landcover": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20671616422288, -7.65402964778806]),
            {
              "landcover": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2089155756151, -7.653508618404265]),
            {
              "landcover": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2095128140466, -7.6543132011429735]),
            {
              "landcover": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20794446548898, -7.654713847229202]),
            {
              "landcover": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20819480477876, -7.654898156603094]),
            {
              "landcover": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20921404420442, -7.655518427531045]),
            {
              "landcover": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21028080225966, -7.654065241507303]),
            {
              "landcover": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21068849802992, -7.653274836258066]),
            {
              "landcover": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19456620164009, -7.6509232273707735]),
            {
              "landcover": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19375081009956, -7.650689294185376]),
            {
              "landcover": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19162175627532, -7.654382083645287]),
            {
              "landcover": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19160745072402, -7.6551547647577385]),
            {
              "landcover": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19376752348724, -7.655246919521577]),
            {
              "landcover": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19454715180434, -7.655339074265505]),
            {
              "landcover": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19917002772785, -7.655334054888975]),
            {
              "landcover": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19948627911045, -7.6586713750407345]),
            {
              "landcover": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19958641535023, -7.659642533612642]),
            {
              "landcover": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19914295635654, -7.660011147368559]),
            {
              "landcover": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19942905886974, -7.660330140158929]),
            {
              "landcover": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20267053520197, -7.662488087272981]),
            {
              "landcover": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19919342585384, -7.636425244403574]),
            {
              "landcover": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20172696573957, -7.633681744596816]),
            {
              "landcover": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1933810040963, -7.647406574944079]),
            {
              "landcover": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19531934703525, -7.649363118145656]),
            {
              "landcover": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19104446714746, -7.652739618757179]),
            {
              "landcover": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19312112338282, -7.65898732634394]),
            {
              "landcover": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19120925411556, -7.660882135235667]),
            {
              "landcover": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19077294789753, -7.661378345341419]),
            {
              "landcover": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19952274183713, -7.6575179081146425]),
            {
              "landcover": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19832826497411, -7.656575100396245]),
            {
              "landcover": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19716921494367, -7.653203629712934]),
            {
              "landcover": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19441245632429, -7.653719297535807]),
            {
              "landcover": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19250756939701, -7.651195697431929]),
            {
              "landcover": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19498235413894, -7.650089831040698]),
            {
              "landcover": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19669181578766, -7.647871000832872]),
            {
              "landcover": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20490963279767, -7.6476648370046245]),
            {
              "landcover": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20860050234269, -7.647379157208851]),
            {
              "landcover": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20226333629189, -7.649796479470364]),
            {
              "landcover": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20460937532853, -7.65043448010013]),
            {
              "landcover": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20576812719452, -7.652916438544611]),
            {
              "landcover": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20926877892565, -7.65314498345936]),
            {
              "landcover": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2055657869566, -7.651519929105959]),
            {
              "landcover": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20590711268339, -7.647937394727006]),
            {
              "landcover": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23923203590981, -7.617579854146322]),
            {
              "landcover": 0,
              "system:index": "99"
            })]),
    fire2 = ui.import && ui.import("fire2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.23303030431367,
            -7.616612666943562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23187159001924,
            -7.616527593517818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23454664691332,
            -7.620880495885042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22956846829135,
            -7.6219155433664065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22527693321268,
            -7.620880494586943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21658638057367,
            -7.626268389663517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2185318766157,
            -7.625275888557288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20934007054713,
            -7.627159846086191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20693681126978,
            -7.6256852744023504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20563504604617,
            -7.624054731579225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2093114607542,
            -7.621771962230678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21161458379176,
            -7.6216301744535695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21132848193339,
            -7.619163067145513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20690619717713,
            -7.618856903794729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20570456753846,
            -7.6170136516774924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2031868677797,
            -7.617155440982869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20982444058534,
            -7.616333064435431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21541774219729,
            -7.619679274848091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20134262093939,
            -7.640988328740271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2046041871015,
            -7.639442913161856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20447544106878,
            -7.637727354237055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20062736563864,
            -7.644249277695504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19650749259176,
            -7.645298448285407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1939468761791,
            -7.6446462615704665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19180110896718,
            -7.640066751357727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19259852743971,
            -7.637255836994318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19564551688063,
            -7.635582804113338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19776267429961,
            -7.636220825982416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.197989377033,
            -7.629665183700105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20079317995979,
            -7.633677671833202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19783201989767,
            -7.627263967778009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20700322415554,
            -7.629218734308573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20949231412136,
            -7.630296297623517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21362649140987,
            -7.6291620199306305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2095352294656,
            -7.633996857620625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20787583659161,
            -7.635315439993006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21197501843973,
            -7.635229242324322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21224681605646,
            -7.638731264417668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2145356348524,
            -7.637327623294687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2223966827615,
            -7.634148432708012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2224252938641,
            -7.631695576087388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2288109724379,
            -7.629052835692003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22484845652635,
            -7.630499039316424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22680825681,
            -7.626840985397449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22154397371033,
            -7.627691698402495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21762437248817,
            -7.628911050976101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21841115358093,
            -7.630484861089598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22795679161834,
            -7.636261598769425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21696167151596,
            -7.64501972071142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2161033646312,
            -7.648138860535911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2153308884349,
            -7.649556644359025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21060396901375,
            -7.650776495183304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21117617273048,
            -7.647458884149184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20749975867729,
            -7.646877590454659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20329405494194,
            -7.64509117139551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20612646766166,
            -7.650251916945399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2042095820674,
            -7.651017516769154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21174837775688,
            -7.653456085257754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2102177309156,
            -7.654547764842638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21363665290336,
            -7.657128089181583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21362234866173,
            -7.654065724876374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20771772445127,
            -7.651728808481258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20636460610307,
            -7.655103096592589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1997303876741,
            -7.653468731457394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19812106193774,
            -7.654914852395065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19696234764331,
            -7.656949338194044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19454478314208,
            -7.65670831931248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19166001976582,
            -7.656640425447269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19027242352631,
            -7.657398924808331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19075164476116,
            -7.657951848883145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.18947133720967,
            -7.655414063353675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.18992194832417,
            -7.6544145402818975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19135821887382,
            -7.6516144450080485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19317496888313,
            -7.648771797842659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19486297220489,
            -7.648325195761398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19666383057839,
            -7.650930961070162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19833752900368,
            -7.648705046426074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19777762288889,
            -7.642205135757815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19785535437818,
            -7.6586838194656925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20147454753582,
            -7.659789663563131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20070207133953,
            -7.662214004039275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20103243706595,
            -7.667594938020226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2329048603307,
            -7.650722900919237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22865624125112,
            -7.646909063748251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22609562549329,
            -7.646015855219197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22064537661132,
            -7.648567874627744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23314804684483,
            -7.64546291566919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2436781429605,
            -7.645750521253432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24538045117873,
            -7.641412050543944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24572377393264,
            -7.639866637147696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22649727308163,
            -7.639832577420001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21812878062775,
            -7.63862743460431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23565152358806,
            -7.632167465857767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24424887306895,
            -7.629005726190523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24945687775006,
            -7.626004289032116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24023719580701,
            -7.619336286503734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23676105292371,
            -7.6205131259114065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24017997491147,
            -7.614260241687931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24088410577144,
            -7.610129079367319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2454045211581,
            -7.608739523399393
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#fb05ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fb05ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([111.23303030431367, -7.616612666943562]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23187159001924, -7.616527593517818]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23454664691332, -7.620880495885042]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22956846829135, -7.6219155433664065]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22527693321268, -7.620880494586943]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21658638057367, -7.626268389663517]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2185318766157, -7.625275888557288]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20934007054713, -7.627159846086191]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20693681126978, -7.6256852744023504]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20563504604617, -7.624054731579225]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2093114607542, -7.621771962230678]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21161458379176, -7.6216301744535695]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21132848193339, -7.619163067145513]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20690619717713, -7.618856903794729]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20570456753846, -7.6170136516774924]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2031868677797, -7.617155440982869]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20982444058534, -7.616333064435431]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21541774219729, -7.619679274848091]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20134262093939, -7.640988328740271]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2046041871015, -7.639442913161856]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20447544106878, -7.637727354237055]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20062736563864, -7.644249277695504]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19650749259176, -7.645298448285407]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1939468761791, -7.6446462615704665]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19180110896718, -7.640066751357727]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19259852743971, -7.637255836994318]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19564551688063, -7.635582804113338]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19776267429961, -7.636220825982416]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([111.197989377033, -7.629665183700105]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20079317995979, -7.633677671833202]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19783201989767, -7.627263967778009]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20700322415554, -7.629218734308573]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20949231412136, -7.630296297623517]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21362649140987, -7.6291620199306305]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2095352294656, -7.633996857620625]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20787583659161, -7.635315439993006]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21197501843973, -7.635229242324322]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21224681605646, -7.638731264417668]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2145356348524, -7.637327623294687]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2223966827615, -7.634148432708012]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2224252938641, -7.631695576087388]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2288109724379, -7.629052835692003]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22484845652635, -7.630499039316424]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22680825681, -7.626840985397449]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22154397371033, -7.627691698402495]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21762437248817, -7.628911050976101]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21841115358093, -7.630484861089598]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22795679161834, -7.636261598769425]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21696167151596, -7.64501972071142]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2161033646312, -7.648138860535911]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2153308884349, -7.649556644359025]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21060396901375, -7.650776495183304]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21117617273048, -7.647458884149184]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20749975867729, -7.646877590454659]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20329405494194, -7.64509117139551]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20612646766166, -7.650251916945399]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2042095820674, -7.651017516769154]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21174837775688, -7.653456085257754]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2102177309156, -7.654547764842638]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21363665290336, -7.657128089181583]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21362234866173, -7.654065724876374]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20771772445127, -7.651728808481258]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20636460610307, -7.655103096592589]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1997303876741, -7.653468731457394]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19812106193774, -7.654914852395065]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19696234764331, -7.656949338194044]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19454478314208, -7.65670831931248]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19166001976582, -7.656640425447269]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19027242352631, -7.657398924808331]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19075164476116, -7.657951848883145]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([111.18947133720967, -7.655414063353675]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([111.18992194832417, -7.6544145402818975]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19135821887382, -7.6516144450080485]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19317496888313, -7.648771797842659]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19486297220489, -7.648325195761398]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19666383057839, -7.650930961070162]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19833752900368, -7.648705046426074]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19777762288889, -7.642205135757815]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19785535437818, -7.6586838194656925]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20147454753582, -7.659789663563131]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20070207133953, -7.662214004039275]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20103243706595, -7.667594938020226]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2329048603307, -7.650722900919237]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22865624125112, -7.646909063748251]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22609562549329, -7.646015855219197]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22064537661132, -7.648567874627744]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23314804684483, -7.64546291566919]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2436781429605, -7.645750521253432]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24538045117873, -7.641412050543944]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24572377393264, -7.639866637147696]),
            {
              "landcover": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22649727308163, -7.639832577420001]),
            {
              "landcover": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21812878062775, -7.63862743460431]),
            {
              "landcover": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23565152358806, -7.632167465857767]),
            {
              "landcover": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24424887306895, -7.629005726190523]),
            {
              "landcover": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24945687775006, -7.626004289032116]),
            {
              "landcover": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24023719580701, -7.619336286503734]),
            {
              "landcover": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23676105292371, -7.6205131259114065]),
            {
              "landcover": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24017997491147, -7.614260241687931]),
            {
              "landcover": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24088410577144, -7.610129079367319]),
            {
              "landcover": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2454045211581, -7.608739523399393]),
            {
              "landcover": 1,
              "system:index": "99"
            })]),
    unburn = ui.import && ui.import("unburn", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.20460439228376,
            -7.656612413724971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20383191608747,
            -7.65803016904913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20700055240832,
            -7.659112433507053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19603682969662,
            -7.660561469854856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19815398580593,
            -7.6624470662114526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20389033769223,
            -7.66308504790459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19672298079355,
            -7.654954896327372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19056436875974,
            -7.64227437797131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19295332248578,
            -7.6421467754819465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19966242173825,
            -7.6397932118352765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19707389110236,
            -7.632635218299898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19788928264289,
            -7.634294084617923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19233889768485,
            -7.635882052965787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19544310802131,
            -7.630877096760683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19592948104956,
            -7.6264534029514355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19914813186743,
            -7.626354153117125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19794650222876,
            -7.623787822278008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19617104601592,
            -7.622612600062842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19524121268431,
            -7.620854436692717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1986172206375,
            -7.618103748371759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20046258043975,
            -7.6177492764539805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20170712542266,
            -7.6181604635657925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20528311435703,
            -7.618054264680735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21339310605215,
            -7.615581838731166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21450890500235,
            -7.616857941160543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21688355448676,
            -7.615681091062289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21955861007116,
            -7.613951257441993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22274559598605,
            -7.612772775563811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22404736055483,
            -7.615098129731127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22612160262958,
            -7.6143182868230035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23238815592748,
            -7.6104398663689885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23805298136693,
            -7.609830164547688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24175692982028,
            -7.610894309378503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24395991792774,
            -7.605718909338903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24866630024265,
            -7.603436042011193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2473931454668,
            -7.601777056194309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.25330115742038,
            -7.6047405393922025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2487025191002,
            -7.607350327738199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2378570576233,
            -7.6140428626995424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2385150920285,
            -7.616637609632291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23315041651637,
            -7.6192184187586065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22646992771166,
            -7.619927358571142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22727101435572,
            -7.619076630136042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22197318370256,
            -7.621191652834063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2200133834189,
            -7.618625291373724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2200548770159,
            -7.6280320691239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21193874136834,
            -7.624232207197196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2039624657362,
            -7.630322521229477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20386233080609,
            -7.631967218342472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20755526749787,
            -7.634000915704731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20672466202194,
            -7.639093561395314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20962860053368,
            -7.640539731047658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21375733193268,
            -7.645544080080626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21704750788773,
            -7.641375744292287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22105294045319,
            -7.642722660183125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22218304364502,
            -7.640539237062378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22235470502197,
            -7.644253885473337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21280191947969,
            -7.649883179892595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21654985997972,
            -7.650393580369015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21161185772779,
            -7.656340181606429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21622914860923,
            -7.655681546113226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2189042055033,
            -7.65668815521705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2260710679911,
            -7.653966052466306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22528428755318,
            -7.65232144008218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23054389300407,
            -7.649547234240217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23048667210853,
            -7.645128378079156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22812632817542,
            -7.64517091194947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23639733944626,
            -7.641587544743751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24184758816452,
            -7.641233092936506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24143274027344,
            -7.638142258608716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23658330637451,
            -7.635845385749584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24131829979203,
            -7.636100594454709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24032352874688,
            -7.6315995353007064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23364379667898,
            -7.629510869600345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2338869831931,
            -7.626249807545097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24743226027971,
            -7.622338152602854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24367001553804,
            -7.626818603003623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24287018819832,
            -7.633874927381424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24536533711154,
            -7.63841839228081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24012966511447,
            -7.647095351096721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24045868362674,
            -7.6437635336567995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2360240976189,
            -7.650030164675114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23051371296283,
            -7.655899306346917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22241701714343,
            -7.66039358189437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22685160315127,
            -7.661059922385255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21706507648126,
            -7.663222881356675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21374628942361,
            -7.663789974343744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2283025941069,
            -7.633627681311452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22120725675629,
            -7.636208132120841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22047769590424,
            -7.63086289622967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23031237095209,
            -7.638341862620321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21548449212966,
            -7.632129266264796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21484076196609,
            -7.628216013029018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21583626884379,
            -7.637118823608298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22352077086626,
            -7.63163336980302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22961325285935,
            -7.624756788376924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23396200686905,
            -7.623182957194645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22721158856328,
            -7.610605722409471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23941051679145,
            -7.619456672401011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.23537647443305,
            -7.621611846773912
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
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
            ee.Geometry.Point([111.20460439228376, -7.656612413724971]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20383191608747, -7.65803016904913]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20700055240832, -7.659112433507053]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19603682969662, -7.660561469854856]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19815398580593, -7.6624470662114526]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20389033769223, -7.66308504790459]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19672298079355, -7.654954896327372]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19056436875974, -7.64227437797131]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19295332248578, -7.6421467754819465]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19966242173825, -7.6397932118352765]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19707389110236, -7.632635218299898]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19788928264289, -7.634294084617923]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19233889768485, -7.635882052965787]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19544310802131, -7.630877096760683]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19592948104956, -7.6264534029514355]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19914813186743, -7.626354153117125]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19794650222876, -7.623787822278008]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19617104601592, -7.622612600062842]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19524121268431, -7.620854436692717]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1986172206375, -7.618103748371759]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20046258043975, -7.6177492764539805]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20170712542266, -7.6181604635657925]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20528311435703, -7.618054264680735]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21339310605215, -7.615581838731166]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21450890500235, -7.616857941160543]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21688355448676, -7.615681091062289]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21955861007116, -7.613951257441993]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22274559598605, -7.612772775563811]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22404736055483, -7.615098129731127]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22612160262958, -7.6143182868230035]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23238815592748, -7.6104398663689885]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23805298136693, -7.609830164547688]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24175692982028, -7.610894309378503]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24395991792774, -7.605718909338903]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24866630024265, -7.603436042011193]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2473931454668, -7.601777056194309]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([111.25330115742038, -7.6047405393922025]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2487025191002, -7.607350327738199]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2378570576233, -7.6140428626995424]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2385150920285, -7.616637609632291]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23315041651637, -7.6192184187586065]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22646992771166, -7.619927358571142]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22727101435572, -7.619076630136042]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22197318370256, -7.621191652834063]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2200133834189, -7.618625291373724]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2200548770159, -7.6280320691239]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21193874136834, -7.624232207197196]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2039624657362, -7.630322521229477]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20386233080609, -7.631967218342472]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20755526749787, -7.634000915704731]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20672466202194, -7.639093561395314]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20962860053368, -7.640539731047658]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21375733193268, -7.645544080080626]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21704750788773, -7.641375744292287]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22105294045319, -7.642722660183125]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22218304364502, -7.640539237062378]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22235470502197, -7.644253885473337]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21280191947969, -7.649883179892595]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21654985997972, -7.650393580369015]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21161185772779, -7.656340181606429]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21622914860923, -7.655681546113226]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2189042055033, -7.65668815521705]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2260710679911, -7.653966052466306]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22528428755318, -7.65232144008218]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23054389300407, -7.649547234240217]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23048667210853, -7.645128378079156]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22812632817542, -7.64517091194947]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23639733944626, -7.641587544743751]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24184758816452, -7.641233092936506]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24143274027344, -7.638142258608716]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23658330637451, -7.635845385749584]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24131829979203, -7.636100594454709]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24032352874688, -7.6315995353007064]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23364379667898, -7.629510869600345]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2338869831931, -7.626249807545097]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24743226027971, -7.622338152602854]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24367001553804, -7.626818603003623]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24287018819832, -7.633874927381424]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24536533711154, -7.63841839228081]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24012966511447, -7.647095351096721]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24045868362674, -7.6437635336567995]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2360240976189, -7.650030164675114]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23051371296283, -7.655899306346917]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22241701714343, -7.66039358189437]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22685160315127, -7.661059922385255]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21706507648126, -7.663222881356675]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21374628942361, -7.663789974343744]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2283025941069, -7.633627681311452]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22120725675629, -7.636208132120841]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22047769590424, -7.63086289622967]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23031237095209, -7.638341862620321]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21548449212966, -7.632129266264796]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21484076196609, -7.628216013029018]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21583626884379, -7.637118823608298]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22352077086626, -7.63163336980302]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22961325285935, -7.624756788376924]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23396200686905, -7.623182957194645]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22721158856328, -7.610605722409471]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23941051679145, -7.619456672401011]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([111.23537647443305, -7.621611846773912]),
            {
              "landcover": 2,
              "system:index": "99"
            })]),
    regrowth = ui.import && ui.import("regrowth", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.25017595080661,
            -7.604874440059849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.25007581489425,
            -7.604597943795641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24982547544076,
            -7.604691881676013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24557638817444,
            -7.634374738848032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24584639726984,
            -7.634374738848032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.24512622192016,
            -7.634652043275778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22473971343766,
            -7.641881578454519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22533337548134,
            -7.64198082484598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22647063210366,
            -7.641119506710735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22502581562344,
            -7.640956458691832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2260986992294,
            -7.64239553295817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22453944161293,
            -7.6426082036286935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22424976303932,
            -7.642484145858592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22387783016507,
            -7.6424168000299755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22312936115037,
            -7.640712325247299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22427093073044,
            -7.640332973673647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22034308982008,
            -7.641004277160465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21944257062175,
            -7.640361586132499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22398034311071,
            -7.643842122663799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22356191850439,
            -7.644795592004033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22083340758462,
            -7.646177941697211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2205222713389,
            -7.64561082447004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22038637285794,
            -7.64512877424261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21899877661843,
            -7.644976361064509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2186568499702,
            -7.644598420584665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22123900002191,
            -7.646041215327256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22245493488447,
            -7.646884801105087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22265520638177,
            -7.646863534255856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22254434196077,
            -7.646877712263631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22490727874201,
            -7.648772731614088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22398556027997,
            -7.648263389169397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22420749970213,
            -7.647378037247357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22337422687731,
            -7.6477076728937705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22280917462656,
            -7.647597794427343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22309527713976,
            -7.646945611712826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22352800664255,
            -7.64793097431601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22401795704089,
            -7.6478175514941515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22468668396888,
            -7.6481228485431085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22421461518226,
            -7.648647428912303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22522741581174,
            -7.649371949772762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22578889167467,
            -7.649442839065631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22592836654344,
            -7.649843362018569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22611552965893,
            -7.650212431424069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22652680181702,
            -7.6505881426011015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2264159370686,
            -7.6509142315422265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22709761565793,
            -7.651563858578185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22841726249325,
            -7.650131903851598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22899661996789,
            -7.650567870709029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22965264334823,
            -7.652277231748855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21994919003185,
            -7.655989930695182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2205356996273,
            -7.656408169531124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.22043556404236,
            -7.65597575315257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21940201939282,
            -7.65553979182433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21897286595043,
            -7.6548911656083485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21872828476353,
            -7.654232039017631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21792025549404,
            -7.653030065487421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21656402666756,
            -7.652130454293226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.21395008341534,
            -7.6516950526315055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19998674180134,
            -7.651278910085911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19966831244649,
            -7.65025883611925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19985427871991,
            -7.650219847149106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20053105319609,
            -7.652342274630928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20106749499907,
            -7.653472946068377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19687504600859,
            -7.634551990146214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19672126624334,
            -7.6341018285861635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19708962272978,
            -7.635073042667286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19723982643461,
            -7.634878091172199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19698056904677,
            -7.636025612099952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19676599232558,
            -7.6368585841507635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19690988152877,
            -7.63813936378667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20214070821724,
            -7.6367688213842015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20239820044638,
            -7.637250881047933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20262350600363,
            -7.637637237449109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20199765712435,
            -7.6367510985360125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20310987968672,
            -7.635740898056913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19687102898347,
            -7.629422536306238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19684599492352,
            -7.630035755121105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1968245372514,
            -7.630135004263567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19598411165093,
            -7.630007398149505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19703196152436,
            -7.629411902447146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19457714085411,
            -7.6316078406895835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19359366432445,
            -7.631678732768657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19174397821114,
            -7.634193490778466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1915007915333,
            -7.635586508490376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19097577914648,
            -7.635681798082239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19114207610541,
            -7.635224548596082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.190805300399,
            -7.6367584744917005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1911271654808,
            -7.636903801433269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19103418201666,
            -7.637811207330809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.1910735213005,
            -7.637219266837563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19004355303878,
            -7.6382826320178125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19000779014277,
            -7.636744296310216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19071875030109,
            -7.638962591364171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19271431380817,
            -7.638739285251249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19088960999747,
            -7.640362376552907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19527152964596,
            -7.640538265634506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.19660190531735,
            -7.640208624452286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2026285308076,
            -7.654181618641218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.20340100700389,
            -7.654755813346448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            111.2076370768282,
            -7.657463067745052
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#ffffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffffff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([111.25017595080661, -7.604874440059849]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([111.25007581489425, -7.604597943795641]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24982547544076, -7.604691881676013]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24557638817444, -7.634374738848032]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24584639726984, -7.634374738848032]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([111.24512622192016, -7.634652043275778]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22473971343766, -7.641881578454519]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22533337548134, -7.64198082484598]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22647063210366, -7.641119506710735]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22502581562344, -7.640956458691832]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2260986992294, -7.64239553295817]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22453944161293, -7.6426082036286935]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22424976303932, -7.642484145858592]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22387783016507, -7.6424168000299755]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22312936115037, -7.640712325247299]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22427093073044, -7.640332973673647]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22034308982008, -7.641004277160465]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21944257062175, -7.640361586132499]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22398034311071, -7.643842122663799]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22356191850439, -7.644795592004033]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22083340758462, -7.646177941697211]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2205222713389, -7.64561082447004]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22038637285794, -7.64512877424261]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21899877661843, -7.644976361064509]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2186568499702, -7.644598420584665]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22123900002191, -7.646041215327256]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22245493488447, -7.646884801105087]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22265520638177, -7.646863534255856]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22254434196077, -7.646877712263631]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22490727874201, -7.648772731614088]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22398556027997, -7.648263389169397]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22420749970213, -7.647378037247357]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22337422687731, -7.6477076728937705]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22280917462656, -7.647597794427343]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22309527713976, -7.646945611712826]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22352800664255, -7.64793097431601]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22401795704089, -7.6478175514941515]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22468668396888, -7.6481228485431085]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22421461518226, -7.648647428912303]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22522741581174, -7.649371949772762]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22578889167467, -7.649442839065631]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22592836654344, -7.649843362018569]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22611552965893, -7.650212431424069]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22652680181702, -7.6505881426011015]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2264159370686, -7.6509142315422265]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22709761565793, -7.651563858578185]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22841726249325, -7.650131903851598]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22899661996789, -7.650567870709029]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22965264334823, -7.652277231748855]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21994919003185, -7.655989930695182]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2205356996273, -7.656408169531124]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([111.22043556404236, -7.65597575315257]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21940201939282, -7.65553979182433]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21897286595043, -7.6548911656083485]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21872828476353, -7.654232039017631]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21792025549404, -7.653030065487421]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21656402666756, -7.652130454293226]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([111.21395008341534, -7.6516950526315055]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19998674180134, -7.651278910085911]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19966831244649, -7.65025883611925]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19985427871991, -7.650219847149106]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20053105319609, -7.652342274630928]),
            {
              "landcover": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20106749499907, -7.653472946068377]),
            {
              "landcover": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19687504600859, -7.634551990146214]),
            {
              "landcover": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19672126624334, -7.6341018285861635]),
            {
              "landcover": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19708962272978, -7.635073042667286]),
            {
              "landcover": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19723982643461, -7.634878091172199]),
            {
              "landcover": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19698056904677, -7.636025612099952]),
            {
              "landcover": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19676599232558, -7.6368585841507635]),
            {
              "landcover": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19690988152877, -7.63813936378667]),
            {
              "landcover": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20214070821724, -7.6367688213842015]),
            {
              "landcover": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20239820044638, -7.637250881047933]),
            {
              "landcover": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20262350600363, -7.637637237449109]),
            {
              "landcover": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20199765712435, -7.6367510985360125]),
            {
              "landcover": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20310987968672, -7.635740898056913]),
            {
              "landcover": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19687102898347, -7.629422536306238]),
            {
              "landcover": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19684599492352, -7.630035755121105]),
            {
              "landcover": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1968245372514, -7.630135004263567]),
            {
              "landcover": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19598411165093, -7.630007398149505]),
            {
              "landcover": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19703196152436, -7.629411902447146]),
            {
              "landcover": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19457714085411, -7.6316078406895835]),
            {
              "landcover": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19359366432445, -7.631678732768657]),
            {
              "landcover": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19174397821114, -7.634193490778466]),
            {
              "landcover": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1915007915333, -7.635586508490376]),
            {
              "landcover": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19097577914648, -7.635681798082239]),
            {
              "landcover": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19114207610541, -7.635224548596082]),
            {
              "landcover": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([111.190805300399, -7.6367584744917005]),
            {
              "landcover": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1911271654808, -7.636903801433269]),
            {
              "landcover": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19103418201666, -7.637811207330809]),
            {
              "landcover": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([111.1910735213005, -7.637219266837563]),
            {
              "landcover": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19004355303878, -7.6382826320178125]),
            {
              "landcover": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19000779014277, -7.636744296310216]),
            {
              "landcover": 3,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19071875030109, -7.638962591364171]),
            {
              "landcover": 3,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19271431380817, -7.638739285251249]),
            {
              "landcover": 3,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19088960999747, -7.640362376552907]),
            {
              "landcover": 3,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19527152964596, -7.640538265634506]),
            {
              "landcover": 3,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([111.19660190531735, -7.640208624452286]),
            {
              "landcover": 3,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2026285308076, -7.654181618641218]),
            {
              "landcover": 3,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([111.20340100700389, -7.654755813346448]),
            {
              "landcover": 3,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([111.2076370768282, -7.657463067745052]),
            {
              "landcover": 3,
              "system:index": "99"
            })]),
    batas = ui.import && ui.import("batas", "table", {
      "id": "users/putriadinda2501/TUGAS_AKHIR/BATASWILAYAH"
    }) || ee.FeatureCollection("users/putriadinda2501/TUGAS_AKHIR/BATASWILAYAH");
function maskS2clouds(image) {
var qa = image.select('QA10').clip(batas);
// Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//Data Filter Citra
var pre2019 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-08-13', '2019-08-18')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30))
                  .filterBounds(lawu)
                  .map(maskS2clouds);
var post2019 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-11-15', '2019-11-20')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',100))
                  .filterBounds(lawu)
                  .map(maskS2clouds); 
print(pre2019);
var visualization = {
  min: 0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2']};
var vis = {
  min: 0.0,
  max: 3000,
  bands: ['B8', 'B4']};
Map.centerObject(batas, 13);
//Map.addLayer(pre2019.mean(), visualization, 'pre2019');
//Map.addLayer(post2019.mean(), visualization, 'post2019');
var NBR2019A = pre2019.median().normalizedDifference(['B8', 'B11']);
var NBR2019B = post2019.median().normalizedDifference(['B8', 'B11']);
var grey = ['white', 'black'];
Map.addLayer(NBR2019A, {min: -1, max: 1, palette: grey}, 'nbrpra');
Map.addLayer(NBR2019B, {min: -1, max: 1, palette: grey}, 'nbrpost');
// Delta NBR / dNBR
var dNBR_unscaled = NBR2019A.subtract(NBR2019B);
Map.addLayer(dNBR_unscaled, {min: -1, max: 1, palette: grey}, 'dNBR');
// Skala produk sesuai standart USGS
var dNBR = dNBR_unscaled.multiply(1000);
print("Difference Normalized Burn Ratio ", dNBR);
// Menentukan style SLD style interval diskrit untuk diterapkan pada gambar/citra
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
//Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'Klasifikasi USGS');
// Memisahkan hasil dalam 8 kelas klasifikasi
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
// Satukan training sampel yang terkumpul
var training = fire1.merge(fire2).merge(regrowth).merge(unburn);
print(training, 'TRAINING SAMPEL 2019');
var label = 'landcover';
// Sample input citra untuk mendapatkan "FeatureCollection" dari data training.
var trainingA = dNBR.sampleRegions({
  collection: training,
  properties: [label],
  scale:10
});
// Use these bands for prediction.
var bands = ['nd'];
// Train the classifier
// Buat "RANDOM FOREST classifier dan train".
var classifierA = ee.Classifier.smileRandomForest(10).train({
  features: trainingA,
  classProperty: label,
  inputProperties: bands
});
// Klasifikasi citra asupan.
var classifiedA = dNBR.classify(classifierA);
// Definisikan palet untuk mewarnai klasifikasi.
var palette = [
  'e63400', // high severity (0)  // red
  'ffed49', //  low severity (1) // yelow
  'e4e4e4', // unburned (2) // grey
  '4fa71d' // regrowth (3) // green
];
// Tampilkan hasil klasifikasi dan citra asupan.
Map.addLayer(classifiedA, {min: 0, max: 3, palette: palette}, 'Klasifikasi Random Forest');
// Kaji akurasi perhitungan
// Gunakan "confusion matrix" dan "kappa" untuk menunjukkan hasil akurasi.
print('RF error matrix: ', classifierA.confusionMatrix());
print('RF accuracy: ', classifierA.confusionMatrix().accuracy());
var KA = classifierA.confusionMatrix().kappa();
print ('RF KAPPA: ', KA);
/*
Export.image.toDrive({ 
  image: NBR2019A,
  description: 'NBR2019A',
  scale: 10, 
  maxPixels: 1e13, 
  region: batashutan
});
Export.image.toDrive({ 
  image: NBR2019B,
  description: 'NBR2019B',
  scale: 10, 
  maxPixels: 1e13, 
  region: batashutan
});
Export.image.toDrive({ 
  image: dNBR ,
  description: 'dNBR',
  scale: 10, 
  maxPixels: 1e13, 
  region: batashutan
});
Export.image.toDrive({ 
  image: classifiedA ,
  description: 'classifiedA',
  scale: 10, 
  maxPixels: 1e13, 
  region: batashutan
});*/
//==========================================================================================
//                                  STATISTIK BURNED AREA
// Menghitung jumpah pixel di seluruh lapisan
var allpix =  classified.updateMask(classified);  //menutupi seluruh layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: batas,
  scale: 20,
  bestEffort:true,
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract jumlah pixel menjadi angka
// Membuat daftar kosong untuk menyimpan suatu nilai area
var arealist = [];
var luas = [];
// Membuat fungsi untuk memperoleh tingkat satu kelas keparahan luka bakar
// Argumen adalah nomor kelas dan nama kelas
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // menutupi satu kelas
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: batas,
  scale: 20,
  bestEffort:true,
  });
var pix =  ee.Number(stats.get('sum'));
var hect = pix.multiply(100).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
luas.push({Class: name, Hectares: hect});
};
// Urutan berbeda untuk kelas keparahan 
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// Menjalankan fungsi di setiap kelas
for (var i = 0; i < 8; i++) {
  areacount(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
//==========================================================================================
//                                      MENAMBAHKAN LEGENDA
// Mengatur posisi panel
/*
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Membentuk judul legenda
var legendTitle = ui.Label({
  value: 'Classification USGS',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Menambahkan judul di panel
legend.add(legendTitle);
// Menentukan dan mengatur style untuk 1 baris legenda
var makeRow = function(color, name) {
      // Membuat label dengan kotak berwarna
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Mengatur tinggi dan lebar kotak
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Membuat label dengan isi teks deskripsi
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // kembali mengatur panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Membuat pallete dengan warna-warna berbeda
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// Keterangan dari legenda
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Menambahkan warna dan nama
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]))}  
*/ 
//Map.add(legend);
var legendRF = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '10px 16px'
  }});    
var legendTitleRF = ui.Label({
  value: 'Classification RF',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legendRF.add(legendTitleRF);
var makeRowRF = function(color, name) {
      // Membuat label dengan kotak berwarna
      var colorBoxRF = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Mengatur tinggi dan lebar kotak
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Membuat label dengan isi teks deskripsi
      var descriptionRF = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // kembali mengatur panel
      return ui.Panel({
        widgets: [colorBoxRF, descriptionRF],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var paletteRF =['e63400', 'ffed49', 'e4e4e4', '4fa71d'];
var namesRF = ['High Severity','Low Severity','Unburned', 'Regrowth'];
for (var i = 0; i < 4; i++) {
  legendRF.add(makeRowRF(paletteRF[i], namesRF[i]));
  }  
Map.add(legendRF);
var sampel = dNBR.reduceRegions({
  collection: (sampel),
  reducer: ee.Reducer.mean().setOutputs(['sampel']),
  scale: 20
  });
print('sampel', sampel);
//MENAMPILKAN GRAFIK TIAP KELOMPOK SAMPEL
var grafSAMPEL = ui.Chart.feature.byFeature({
  features: sampel,
  yProperties: ['sampel']}) 
  .setChartType('ColumnChart')
  .setOptions({
      interpolateNulls: false,
      lineWidth: 1,
      pointSize: 3,
      title: 'NILAI PIKSEL API TIAP SAMPEL',
      vAxis: {title: 'DN'},
      hAxis: {title: 'Sampel ke-'}
    });
print(grafSAMPEL);
// Nilai minimum dan maksimum NDVI
{
var min_dnbr = ee.Number(dNBR.reduceRegion({
reducer: ee.Reducer.min(),
geometry: batas,
scale: 10,
bestEffort:true
}).values().get(0));
print('Nilai Minimum dNBR', min_dnbr);
var max_dnbr = ee.Number(dNBR.reduceRegion({
reducer: ee.Reducer.max(),
geometry: batas,
scale: 20,
bestEffort:true
}).values().get(0));
print('Nilai Maksimum dNBR', max_dnbr);
}
//Menghitung Luas Area Klasifikasi
//Mereduksi citra
var areaImage2019 = ee.Image.pixelArea().addBands(classifiedA).reduce('sum');
var areas2019 = areaImage2019.reduceRegion({
      reducer: ee.Reducer.count(),
    geometry: batas,
    scale: 20,
    bestEffort:true
    }); 
// Memisahkan hasil dalam 2 kelas klasifikasi
var classified2_2019 = classifiedA.reduce('sum').toInt();
//Menghitung luasan area Berdasarkan Pixel
var pixstats2019 = classifiedA.reduceRegion({
  reducer: ee.Reducer.count(),                  // menghitung pixel di satu lapisan
  geometry: batas,
  scale: 20,
  bestEffort:true,
  });
var allpixels2019 = ee.Number(areas2019.get('sum')); // extract jumlah pixel menjadi angka
print(allpixels2019,'total piksel');
// Membuat daftar kosong untuk menyimpan suatu nilai area
var arealist2019 = [];
//print('Jumlah Pixel Tahun 2020', allpixels2020);
// Menghitung luas wilayah klasifikasi
var areacount2019 = function(cnr, name) {
 var singleMask2019 =  areaImage2019.updateMask(classified2_2019.eq(cnr));  // menutupi satu kelas
 var stats2019 = singleMask2019.reduceRegion({
  reducer: ee.Reducer.count(),               // menghitung jumlah pixel dalam satu kelas
  geometry: batas,
  scale: 20,
  bestEffort:true,
  });
var pix2019 =  ee.Number(stats2019.get('sum'));
var hect2019 = pix2019.multiply(100).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc2019 = pix2019.divide(allpixels2019).multiply(10000).round().divide(100);   // membentuk presentase area berdasarkan kelas klasifikasi dan dalam bentuk desimal 2 dibelakang koma
arealist2019.push({Class: name, Pixels: pix2019, Hectares: hect2019, Percentage: perc2019});
};
// Jenis Klasifikasi
var names2019 = ['High Severity','Low Severity', 'Unburned','Regrowth'];
// Menjalankan fungsi di setiap kelas
for (var i = 0; i < 4; i++) {
  areacount2019(i, names2019[i]);
  }
print('Hasil Perhitungan Luas Tahun 2020', arealist2019);
var title = ui.Label({
  value: 'Identifikasi Area Bekas Kebakaran Hutan dan Lahan Menggunakan Metode Random Forest pada Google Earth Engine (Studi Kasus : Gunung Lawu, Kab. Magetan)',
  style: {fontSize: '20px'}
});
var sidebar = ui.Panel({
  widgets: [title],
  style: {width: '400px'}
});
// Add the sidebar to the ui.root.
ui.root.add(sidebar);
// Define a DataTable using a JavaScript literal.
var dataTable = {
  cols: [{id: 'Class', label: 'Classification', type: 'string'},
         {id: 'Area', label: 'Area (ha)', type: 'number'}],
  rows: [{c: [{v: 'High Severity'}, {v: 24.01}]},
         {c: [{v: 'Low Severity'}, {v: 388.88}]},
         {c: [{v: 'Unburned'}, {v: 507}]},
         {c: [{v: 'Regrowth'}, {v: 17.79}]}]
};
// Define a dictionary of customization options.
var options = {
  title: 'Luas Area yang Terdampak Kebakaran',
  vAxis: {title: 'Class'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area (hektar)',
    logScale: true
  }
};
// Make a BarChart from the table and the options.
var chart = new ui.Chart(dataTable, 'BarChart', options);
sidebar.add(chart);
// Paint all the polygon edges with the same number and width, display.
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: batas,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '000000'}, 'Batas Desa');
var text = require('users/gena/packages:text');
var shp = ee.FeatureCollection(batas);
//Map.addLayer(shp, {},'Roads Layer');
var Scale = Map.getScale()*2
var labels = shp.map(function(feat){
  feat = ee.Feature(feat)
  var name = ee.String (feat.get("NAMOBJ"))
  var centroid = feat.geometry().centroid()
  var t = text.draw(name, centroid,Scale,{
    fontSize: 10,
    textColor:'black',
    OutlineWidth:0.1,
    OutlineColor:'red'
  })
  return t
  })
  var Labels_Final = ee.ImageCollection(labels)
  Map.addLayer(Labels_Final,{},"Desa")
// We pass the arguments as a dictionary.
var title = ui.Label({
  value: 'Koordinat', 
  style: {
    fontSize: '20px',
    fontWeight: 'bold'
  }
});
var lon = ui.Label();
var lat = ui.Label();
// Add the widgets to a new panel.
var panel = ui.Panel();
sidebar.add(title);
sidebar.add(lon);
sidebar.add(lat);
Map.onClick(function(coords) {
  lon.setValue('Bujur: ' + coords.lon);
  lat.setValue('Lintang: ' + coords.lat);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Add a red point to the map wherever the user clicks.
  var dot = ui.Map.Layer(point, {color: 'blue'}, 'Location');
  Map.layers().set(6, dot);
});
var map = ui.Panel();
ui.root.add(map)
Map.style().set('cursor', 'crosshair');
// Create the inspector panel, initially hiding it.
var label = ui.Label('Klik untuk mengetahui kelas');
var inspector = ui.Panel({
  widgets: [label],
  layout: ui.Panel.Layout.flow('horizontal')
});
var closeButton = ui.Button({
  label: 'Tutup', 
  onClick: function() {
    inspector.clear();
    inspector.style().set('shown', false);
  }
});
function getInfo(classifiedA) {
  var titleLabel = ui.Label({
    value: 'classifiedA:',
    style: {
      fontWeight: 'bold',
    }
  });
  var valueLabel = ui.Label(classifiedA);
  inspector.clear();
  inspector.add(titleLabel);
  inspector.add(valueLabel);
//  inspector.add(closeButton);
}
// Register an onClick handler that populates and shows the inspector panel.
Map.onClick(function (coords) {
  // Gather the image bands into a single Image that we can asynchronously sample.
//  inspector.clear();
  inspector.clear();
  inspector.add(ui.Label('Menghitung...', {color: 'gray'}));
  inspector.style().set('shown', true);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var kelas = ee.Number(classifiedA.reduceRegion({
      reducer: ee.Reducer.median(),
      geometry: point,
      scale: 10}).get('classification'));
    kelas.evaluate(function (kelas) {
    inspector.clear();
    // Display a label that corresponds to a checked checkbox.
    if (kelas===0) {
      inspector.add(ui.Label('Kelas : High Severity ' ));
    }
    if (kelas==1) {
      inspector.add(ui.Label('Kelas : Low Severity' ));
    }
    if (kelas==2) {
      inspector.add(ui.Label('Kelas : Unburned'));
    }
    if (kelas==3) {
      inspector.add(ui.Label('Kelas : Regrowth'));
    }
    inspector.add(ui.Button('Tutup', function() {
      inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
});
Map.add(inspector);