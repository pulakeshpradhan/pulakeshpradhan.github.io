var AOI = ui.import && ui.import("AOI", "table", {
      "id": "projects/ee-alexanderfuentealbav/assets/Cuencas_Estudio"
    }) || ee.FeatureCollection("projects/ee-alexanderfuentealbav/assets/Cuencas_Estudio"),
    Masas_Agua = ui.import && ui.import("Masas_Agua", "table", {
      "id": "projects/ee-alexanderfuentealbav/assets/Masas_Lacustres_Estudio"
    }) || ee.FeatureCollection("projects/ee-alexanderfuentealbav/assets/Masas_Lacustres_Estudio"),
    Nieve = ui.import && ui.import("Nieve", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -70.13239853683405,
            -33.599937471161596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14716141525201,
            -33.59207318453084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.167331627044,
            -33.59507599677871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14115326705866,
            -33.58528072359266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08562081161432,
            -33.60751510526777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.0761794358819,
            -33.602797033963824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06879799667291,
            -33.60236810558868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09059899154596,
            -33.61080330531211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05708964926559,
            -33.621692889800684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06635936362106,
            -33.560777051719114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11322291952926,
            -33.572362952244134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12523921591598,
            -33.56735688967147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13279231650192,
            -33.57951396665096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05760463339645,
            -33.59395720852794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05108150107223,
            -33.58866640054704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05846294028122,
            -33.568501158136236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04663942445158,
            -33.55245249091969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02295015443205,
            -33.5644686271693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03136156190276,
            -33.5621799681967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00286577332854,
            -33.55931905918688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98063562501311,
            -33.588138384463086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97200160527288,
            -33.56380372002416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9935451080805,
            -33.55371878362797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96851907576455,
            -33.546146473580514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97735963667763,
            -33.53856345037593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94182573164834,
            -33.55937940116197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94311319197548,
            -33.53384160927236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95873437727822,
            -33.5208909943218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94869218672646,
            -33.52361006880601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94165407027138,
            -33.519817651915844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92543207014931,
            -33.52303763917619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92053972090615,
            -33.538205744170355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91857280981169,
            -33.529696495731486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89917507421599,
            -33.54765328680767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88981952917204,
            -33.539569615448514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89016285192595,
            -33.542931942282245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89642849218474,
            -33.54057117329012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91007557165251,
            -33.54658027661179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92444653690966,
            -33.59248886744119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9297680395952,
            -33.59327532458187
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93989606083544,
            -33.582264272146325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93328709782274,
            -33.57404081653322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9374928015581,
            -33.56903485125442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87286229313524,
            -33.575828590926285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87569470585497,
            -33.580119098395436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89247590073197,
            -33.61045216417962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90638047226517,
            -33.6009445954601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.8847465039951,
            -33.61977081553909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89332957284276,
            -33.62155764224701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.8818282605869,
            -33.60904907724555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88380236642186,
            -33.63249221439558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88139910714452,
            -33.63242075110981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87805171029393,
            -33.6255599996156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88157076852147,
            -33.639495328759494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87590594308202,
            -33.64985603487996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88852305428807,
            -33.64935589150478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88692203864605,
            -33.66667542937057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88391796454937,
            -33.673802750774435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88958278998882,
            -33.67694556767333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89559093818218,
            -33.6807310809705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90408817634136,
            -33.673445605222554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90091244086773,
            -33.68365938257918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88949695930035,
            -33.684302167142455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88778034553081,
            -33.69220932209172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.8885528217271,
            -33.6973509524928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.8735322948522,
            -33.709418553159544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87404727898306,
            -33.72319752511432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88417530022329,
            -33.729051133964056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88700771294302,
            -33.72191253315063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89859485588735,
            -33.72448249784158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90666294060415,
            -33.7246252714016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91876506767935,
            -33.72334030081175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92773337998472,
            -33.71720238603689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91434379258237,
            -33.71905858120739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9435262266644,
            -33.70663558761825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94429870286069,
            -33.700209196092416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95058796100838,
            -33.701170057107056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95779773884041,
            -33.697885308075634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9680974214576,
            -33.694743256706644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9677540987037,
            -33.689744301826565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97813961200936,
            -33.6941005502267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99178669147713,
            -33.69859939463522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97487804584725,
            -33.68595918541677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96140798152555,
            -33.68811826373461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93900617183317,
            -33.672405072530395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98626216722027,
            -33.665761814541206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9810264952232,
            -33.66426165301716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97218593431012,
            -33.661118372614844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98085483384625,
            -33.65204507827551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98265727830426,
            -33.6498301918819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97192844224469,
            -33.64511443745823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97527583909527,
            -33.64397118536034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96663501279086,
            -33.67566743316552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97058322446078,
            -33.678453057158926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93796756283969,
            -33.71787067070606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.911188388035,
            -33.71323004332592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9880112484391,
            -33.68554278241572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9733342007096,
            -33.668614763447295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97796905788734,
            -33.66897192906031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9831120433131,
            -33.65669599330789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04083318131359,
            -33.67334064121519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03675622361095,
            -33.679876177998054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04023236649425,
            -33.678983374399486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01126450913341,
            -33.67601919996967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00615758316906,
            -33.67948334555686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99396962540538,
            -33.68023329684161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9755494994721,
            -33.544459155499844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.985076705893,
            -33.54631907702461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90406163227536,
            -33.59496210170048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90144379627682,
            -33.589135112951666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90204461109616,
            -33.586203595570794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89449151051022,
            -33.58398701630247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89328988087155,
            -33.58194914318912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89277489674069,
            -33.58867036684009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88020070087887,
            -33.58981435276515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89444859516598,
            -33.59549830788121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87771161091305,
            -33.598822711798285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94023614512516,
            -33.59197687350225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93315511332584,
            -33.600949261990706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95489095464241,
            -33.54112271454571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96081327214729,
            -33.53776031732851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9651906372596,
            -33.54004962326186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00218612140667,
            -33.5642310145687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00961047595989,
            -33.56244300000942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01076919025432,
            -33.560476141235874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00823718494426,
            -33.555433625952595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.0445942325909,
            -33.56845067499749
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02656978801082,
            -33.56913007762055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07040336345962,
            -33.57751639103409
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07963016247085,
            -33.5801264241139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07787063335708,
            -33.56950702973282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14455436435361,
            -33.605784196929385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1387178775372,
            -33.60235282906274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14034866061826,
            -33.59999368444347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.17648338046689,
            -33.59906430672155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1757109042706,
            -33.59477474129527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.10052322116513,
            -33.61493384360306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15494194918524,
            -33.67739016097271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1626237958039,
            -33.673318783604046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.17747370976385,
            -33.65606163604253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.18249480503972,
            -33.65445413790384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.18391101139959,
            -33.64998870775016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.17614333409246,
            -33.63959228892236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.17032848887588,
            -33.62722237578565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16719566874649,
            -33.623148624664154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16766773753311,
            -33.617287802731155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13591038279678,
            -33.61571531927272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14303432994033,
            -33.6117839851053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13917194895889,
            -33.6112121397433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1826881080165,
            -33.60470713175494
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 1
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
            ee.Geometry.Point([-70.13239853683405, -33.599937471161596]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14716141525201, -33.59207318453084]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.167331627044, -33.59507599677871]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14115326705866, -33.58528072359266]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08562081161432, -33.60751510526777]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.0761794358819, -33.602797033963824]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06879799667291, -33.60236810558868]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09059899154596, -33.61080330531211]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05708964926559, -33.621692889800684]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06635936362106, -33.560777051719114]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11322291952926, -33.572362952244134]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12523921591598, -33.56735688967147]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13279231650192, -33.57951396665096]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05760463339645, -33.59395720852794]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05108150107223, -33.58866640054704]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05846294028122, -33.568501158136236]),
            {
              "class": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04663942445158, -33.55245249091969]),
            {
              "class": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02295015443205, -33.5644686271693]),
            {
              "class": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03136156190276, -33.5621799681967]),
            {
              "class": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00286577332854, -33.55931905918688]),
            {
              "class": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98063562501311, -33.588138384463086]),
            {
              "class": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97200160527288, -33.56380372002416]),
            {
              "class": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9935451080805, -33.55371878362797]),
            {
              "class": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96851907576455, -33.546146473580514]),
            {
              "class": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97735963667763, -33.53856345037593]),
            {
              "class": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94182573164834, -33.55937940116197]),
            {
              "class": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94311319197548, -33.53384160927236]),
            {
              "class": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95873437727822, -33.5208909943218]),
            {
              "class": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94869218672646, -33.52361006880601]),
            {
              "class": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94165407027138, -33.519817651915844]),
            {
              "class": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92543207014931, -33.52303763917619]),
            {
              "class": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92053972090615, -33.538205744170355]),
            {
              "class": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91857280981169, -33.529696495731486]),
            {
              "class": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89917507421599, -33.54765328680767]),
            {
              "class": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88981952917204, -33.539569615448514]),
            {
              "class": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89016285192595, -33.542931942282245]),
            {
              "class": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89642849218474, -33.54057117329012]),
            {
              "class": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91007557165251, -33.54658027661179]),
            {
              "class": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92444653690966, -33.59248886744119]),
            {
              "class": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9297680395952, -33.59327532458187]),
            {
              "class": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93989606083544, -33.582264272146325]),
            {
              "class": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93328709782274, -33.57404081653322]),
            {
              "class": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9374928015581, -33.56903485125442]),
            {
              "class": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87286229313524, -33.575828590926285]),
            {
              "class": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87569470585497, -33.580119098395436]),
            {
              "class": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89247590073197, -33.61045216417962]),
            {
              "class": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90638047226517, -33.6009445954601]),
            {
              "class": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.8847465039951, -33.61977081553909]),
            {
              "class": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89332957284276, -33.62155764224701]),
            {
              "class": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.8818282605869, -33.60904907724555]),
            {
              "class": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88380236642186, -33.63249221439558]),
            {
              "class": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88139910714452, -33.63242075110981]),
            {
              "class": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87805171029393, -33.6255599996156]),
            {
              "class": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88157076852147, -33.639495328759494]),
            {
              "class": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87590594308202, -33.64985603487996]),
            {
              "class": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88852305428807, -33.64935589150478]),
            {
              "class": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88692203864605, -33.66667542937057]),
            {
              "class": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88391796454937, -33.673802750774435]),
            {
              "class": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88958278998882, -33.67694556767333]),
            {
              "class": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89559093818218, -33.6807310809705]),
            {
              "class": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90408817634136, -33.673445605222554]),
            {
              "class": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90091244086773, -33.68365938257918]),
            {
              "class": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88949695930035, -33.684302167142455]),
            {
              "class": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88778034553081, -33.69220932209172]),
            {
              "class": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.8885528217271, -33.6973509524928]),
            {
              "class": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.8735322948522, -33.709418553159544]),
            {
              "class": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87404727898306, -33.72319752511432]),
            {
              "class": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88417530022329, -33.729051133964056]),
            {
              "class": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88700771294302, -33.72191253315063]),
            {
              "class": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89859485588735, -33.72448249784158]),
            {
              "class": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90666294060415, -33.7246252714016]),
            {
              "class": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91876506767935, -33.72334030081175]),
            {
              "class": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92773337998472, -33.71720238603689]),
            {
              "class": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91434379258237, -33.71905858120739]),
            {
              "class": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9435262266644, -33.70663558761825]),
            {
              "class": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94429870286069, -33.700209196092416]),
            {
              "class": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95058796100838, -33.701170057107056]),
            {
              "class": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95779773884041, -33.697885308075634]),
            {
              "class": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9680974214576, -33.694743256706644]),
            {
              "class": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9677540987037, -33.689744301826565]),
            {
              "class": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97813961200936, -33.6941005502267]),
            {
              "class": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99178669147713, -33.69859939463522]),
            {
              "class": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97487804584725, -33.68595918541677]),
            {
              "class": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96140798152555, -33.68811826373461]),
            {
              "class": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93900617183317, -33.672405072530395]),
            {
              "class": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98626216722027, -33.665761814541206]),
            {
              "class": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9810264952232, -33.66426165301716]),
            {
              "class": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97218593431012, -33.661118372614844]),
            {
              "class": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98085483384625, -33.65204507827551]),
            {
              "class": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98265727830426, -33.6498301918819]),
            {
              "class": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97192844224469, -33.64511443745823]),
            {
              "class": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97527583909527, -33.64397118536034]),
            {
              "class": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96663501279086, -33.67566743316552]),
            {
              "class": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97058322446078, -33.678453057158926]),
            {
              "class": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93796756283969, -33.71787067070606]),
            {
              "class": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.911188388035, -33.71323004332592]),
            {
              "class": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9880112484391, -33.68554278241572]),
            {
              "class": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9733342007096, -33.668614763447295]),
            {
              "class": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97796905788734, -33.66897192906031]),
            {
              "class": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9831120433131, -33.65669599330789]),
            {
              "class": 1,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04083318131359, -33.67334064121519]),
            {
              "class": 1,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03675622361095, -33.679876177998054]),
            {
              "class": 1,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04023236649425, -33.678983374399486]),
            {
              "class": 1,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01126450913341, -33.67601919996967]),
            {
              "class": 1,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00615758316906, -33.67948334555686]),
            {
              "class": 1,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99396962540538, -33.68023329684161]),
            {
              "class": 1,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9755494994721, -33.544459155499844]),
            {
              "class": 1,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.985076705893, -33.54631907702461]),
            {
              "class": 1,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90406163227536, -33.59496210170048]),
            {
              "class": 1,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90144379627682, -33.589135112951666]),
            {
              "class": 1,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90204461109616, -33.586203595570794]),
            {
              "class": 1,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89449151051022, -33.58398701630247]),
            {
              "class": 1,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89328988087155, -33.58194914318912]),
            {
              "class": 1,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89277489674069, -33.58867036684009]),
            {
              "class": 1,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88020070087887, -33.58981435276515]),
            {
              "class": 1,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89444859516598, -33.59549830788121]),
            {
              "class": 1,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87771161091305, -33.598822711798285]),
            {
              "class": 1,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94023614512516, -33.59197687350225]),
            {
              "class": 1,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93315511332584, -33.600949261990706]),
            {
              "class": 1,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95489095464241, -33.54112271454571]),
            {
              "class": 1,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96081327214729, -33.53776031732851]),
            {
              "class": 1,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9651906372596, -33.54004962326186]),
            {
              "class": 1,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00218612140667, -33.5642310145687]),
            {
              "class": 1,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00961047595989, -33.56244300000942]),
            {
              "class": 1,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01076919025432, -33.560476141235874]),
            {
              "class": 1,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00823718494426, -33.555433625952595]),
            {
              "class": 1,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.0445942325909, -33.56845067499749]),
            {
              "class": 1,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02656978801082, -33.56913007762055]),
            {
              "class": 1,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07040336345962, -33.57751639103409]),
            {
              "class": 1,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07963016247085, -33.5801264241139]),
            {
              "class": 1,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07787063335708, -33.56950702973282]),
            {
              "class": 1,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14455436435361, -33.605784196929385]),
            {
              "class": 1,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1387178775372, -33.60235282906274]),
            {
              "class": 1,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14034866061826, -33.59999368444347]),
            {
              "class": 1,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.17648338046689, -33.59906430672155]),
            {
              "class": 1,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1757109042706, -33.59477474129527]),
            {
              "class": 1,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.10052322116513, -33.61493384360306]),
            {
              "class": 1,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15494194918524, -33.67739016097271]),
            {
              "class": 1,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1626237958039, -33.673318783604046]),
            {
              "class": 1,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.17747370976385, -33.65606163604253]),
            {
              "class": 1,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.18249480503972, -33.65445413790384]),
            {
              "class": 1,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.18391101139959, -33.64998870775016]),
            {
              "class": 1,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.17614333409246, -33.63959228892236]),
            {
              "class": 1,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.17032848887588, -33.62722237578565]),
            {
              "class": 1,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16719566874649, -33.623148624664154]),
            {
              "class": 1,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16766773753311, -33.617287802731155]),
            {
              "class": 1,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13591038279678, -33.61571531927272]),
            {
              "class": 1,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14303432994033, -33.6117839851053]),
            {
              "class": 1,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13917194895889, -33.6112121397433]),
            {
              "class": 1,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1826881080165, -33.60470713175494]),
            {
              "class": 1,
              "system:index": "149"
            })]),
    No_Nieve = ui.import && ui.import("No_Nieve", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -70.13444943382612,
            -33.670741604858634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12277646019331,
            -33.65145293638503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12672467186323,
            -33.657740088528726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1308445449101,
            -33.64359335032718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12071652366987,
            -33.634732592953654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08810086204878,
            -33.65016687140911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06372494652143,
            -33.644450794586916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07539792015424,
            -33.65045266528664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08535428001753,
            -33.661169250641386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09874386741987,
            -33.64945238256371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09651226951948,
            -33.654310789753865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09342236473432,
            -33.65931180479491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.10406537010542,
            -33.66345528278966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11505169823042,
            -33.66288378044724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.10440869285932,
            -33.65516812725929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.10870022728315,
            -33.64773758513719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11470837547651,
            -33.644736607442454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11316342308393,
            -33.634732592953654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11093182518354,
            -33.62672854457975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12620968773237,
            -33.67088446774908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12998623802534,
            -33.66388390705502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13513607933393,
            -33.678027309695366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14062924339643,
            -33.68202704202386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14303250267378,
            -33.675884519408044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15899701073042,
            -33.66631273755377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15170140220991,
            -33.66974155798102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14449162437788,
            -33.66666991272558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.17212910606733,
            -33.65738287628261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14423413231245,
            -33.659240363769264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13805432274214,
            -33.662455151199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15307469322553,
            -33.653096213667425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16715092613569,
            -33.64437934122477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16277356102339,
            -33.64816628769641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14123005821577,
            -33.64768533166131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.14723820640913,
            -33.63660976886721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15805287315717,
            -33.640897252505965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16612095787397,
            -33.63589516750648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.160541963123,
            -33.63125011412984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16191525413862,
            -33.638967911286144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15032811119428,
            -33.63125011412984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16470248931559,
            -33.6199580167891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15354449981363,
            -33.612452956328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.16238506072672,
            -33.60923630178424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.15594775909098,
            -33.60651992225112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1390391134611,
            -33.62524690487165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13612087005289,
            -33.62017243748458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.12916858428629,
            -33.627819760065584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.13148601287516,
            -33.62317427119838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.1203280233732,
            -33.61874295610344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11311824554117,
            -33.61824263201793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06876726464345,
            -33.660835184575625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05984087304189,
            -33.656834466624396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07254381493642,
            -33.636113487386744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.085075095454,
            -33.63954351114318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09005327538564,
            -33.62625140810009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06893892602041,
            -33.63168283783473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05966921166494,
            -33.63668516750044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11048097924306,
            -33.61024099164831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11786241845205,
            -33.59308367366353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.10292787865713,
            -33.601376803600566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09503145531728,
            -33.59708735319438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09108324364736,
            -33.583860204796146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.09254236535146,
            -33.581071520095755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.11597414330556,
            -33.579855911382765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08988161400869,
            -33.5754223698051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08662004784658,
            -33.57120314296217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07855196312978,
            -33.571775253602404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07082720116689,
            -33.59558599514871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.07434625939443,
            -33.59401311583222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08687753991201,
            -33.59701586054673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06207247094228,
            -33.58736380910988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06061334923818,
            -33.58378870118599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.06335993126943,
            -33.58142904881151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.08001108483388,
            -33.56190581369825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.05039949730947,
            -33.56147668202609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04070062951162,
            -33.57935536164178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04447717980459,
            -33.5749933053084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03898401574209,
            -33.5942276010643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04456301049306,
            -33.59108176420874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03091593102529,
            -33.58907980829618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03349085167959,
            -33.58028495170724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.0243069680126,
            -33.579855911382765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01606722191885,
            -33.57427819307445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02387781457021,
            -33.58407471527109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02035875634267,
            -33.59265469697713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02308062126171,
            -33.59926355217603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.0429075102998,
            -33.60062186694555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.0319211821748,
            -33.59790521601206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03406694938671,
            -33.60920020277594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02247980644238,
            -33.605697485411326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03355196525585,
            -33.61606225690191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02625635673535,
            -33.622995235876566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02865961601269,
            -33.623209649014235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04084757377636,
            -33.623209649014235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04350832511913,
            -33.61313165478622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04136255790722,
            -33.605197085599286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03655603935253,
            -33.63192866454406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04213503410351,
            -33.63864599260754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04556826164257,
            -33.640360971126995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04925898124706,
            -33.64293337486173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03715685417187,
            -33.64464826798738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03415278007519,
            -33.64271901081927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04007509758007,
            -33.641146991533176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.03209284355175,
            -33.63571615862183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01861742546093,
            -33.63007058768709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01612833549511,
            -33.6331435392791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02179316093456,
            -33.644362454838564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04016092826855,
            -33.655222687410124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.02574137260449,
            -33.662652583292186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01818827201855,
            -33.64950694633806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00582865287792,
            -33.6572231071057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00239542533886,
            -33.64236173622911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99724558403027,
            -33.6269260586212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00582865287792,
            -33.615490439923555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00651529838574,
            -33.602623554977406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.00342539360058,
            -33.58946875451143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98969248344433,
            -33.60290950661744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99587229301464,
            -33.595760431142146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9828260283662,
            -33.628641270523076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98969248344433,
            -33.633215001965155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96462992240917,
            -33.63035644827392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97389963676464,
            -33.61348905062311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94815043022167,
            -33.624639056296374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95467356254589,
            -33.63950348613682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98780420829785,
            -33.611773537091075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99329737236035,
            -33.607198667421976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.98365672507735,
            -33.5754308219473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99584468284102,
            -33.56656305647663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.99687465110274,
            -33.57914929121358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97112544455977,
            -33.57114008142789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95687755027267,
            -33.583868656112024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96065410056563,
            -33.57657498339952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96889384665938,
            -33.5948795037978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96563228049727,
            -33.585870732944066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96906550803634,
            -33.60345841087798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97387202659102,
            -33.60546003306378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95550425925704,
            -33.599169064013765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95430262961837,
            -33.59144770202079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95292933860274,
            -33.61432380130886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96134074607345,
            -33.6148956260274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.96872218528243,
            -33.62161428228269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97782023826095,
            -33.62104250214325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.97009547629806,
            -33.63161982051358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9640873281047,
            -33.63705091174785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94383128562423,
            -33.629761736994325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95687755027267,
            -33.62575957482228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94383128562423,
            -33.615181536963995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94417460837813,
            -33.60317246105825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94983943381759,
            -33.5948795037978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93387492576095,
            -33.610749810866835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93164332786056,
            -33.62447312606671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92237361350509,
            -33.61646812444151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93593486228438,
            -33.615324492076624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93868144431563,
            -33.62202238574813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93130000510665,
            -33.629026351350426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94365962424727,
            -33.63474345214669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95172770896407,
            -33.630455662124916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95756419578048,
            -33.6468910312748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95807917991134,
            -33.65432164647769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95996745505782,
            -33.665323494518546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.955675920634,
            -33.66903808653058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9531009999797,
            -33.67832386472734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.95275767722579,
            -33.685037572004305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94400294700118,
            -33.67575251884312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93593486228438,
            -33.70703200288113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93095668235274,
            -33.701890951848526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93627818503829,
            -33.6934646750937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92803843894454,
            -33.68232358325997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92735179343673,
            -33.670752459509224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92958339133712,
            -33.658751131093894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93232997336837,
            -33.663751888071204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93850978293868,
            -33.6604657090868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.933703264384,
            -33.651320898327896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93833812156173,
            -33.64960613812591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94400294700118,
            -33.64603361131938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.94846614280196,
            -33.641460560663226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93850978293868,
            -33.63831644743675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93490489402267,
            -33.63502929722516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92443355002852,
            -33.64517618282404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9343899098918,
            -33.641746383445536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92443355002852,
            -33.65246405281685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91859706321212,
            -33.65589342518158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92134364524337,
            -33.66175162015948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91842540183517,
            -33.66932381773338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.922716936259,
            -33.672752518127915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91876872458907,
            -33.6758953734095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9149921742961,
            -33.67818101419551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91876872458907,
            -33.692893372181814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92803843894454,
            -33.687465805092344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93078502097579,
            -33.67403824553529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92100032248946,
            -33.70217657386704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92529185691329,
            -33.696463953066974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90761073508712,
            -33.70017719979481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91619380393477,
            -33.69574984875943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90812571921798,
            -33.70346186119832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92374690452071,
            -33.706317986415876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89078792014571,
            -33.70674639700732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88821299949142,
            -33.71188715742493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88392146506759,
            -33.70746040991112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90022929587813,
            -33.703176243453285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89902766623946,
            -33.69817777919072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90743907371017,
            -33.70703200288113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9288967458293,
            -33.70646079018379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9094990102336,
            -33.67632393568475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90589412131759,
            -33.666895072254164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90675242820235,
            -33.65832248125719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91447719016524,
            -33.65074931538968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91636546531173,
            -33.64517618282404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9065807668254,
            -33.64932034143765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92065699973556,
            -33.63874519690958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92958339133712,
            -33.63602974752855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92391856589767,
            -33.63131323720567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91310389914962,
            -33.6353151413549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90967067161056,
            -33.6400314325195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90331920066329,
            -33.635743905770646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90967067161056,
            -33.626739404781894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9179104177043,
            -33.62631059554136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92323192038985,
            -33.62087882709124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93027003684493,
            -33.616161487213894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91636546531173,
            -33.618734613704326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90520747580977,
            -33.621307663366096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90211757102462,
            -33.614588983205024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91430552878829,
            -33.607154939513464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91859706321212,
            -33.59871938283917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.8944786397502,
            -33.60686900195305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90151675620528,
            -33.60558227119554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88786967673751,
            -33.60207940684287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87902911582442,
            -33.595216239701834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89774020591231,
            -33.58699401841892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89645274558517,
            -33.58084471471518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9201420156047,
            -33.583776414163275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91919787803145,
            -33.592427922043264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89679606833907,
            -33.57583914401622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.8985126821086,
            -33.56861630898257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.87894328513595,
            -33.5683302436696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88040240684005,
            -33.55767363557672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88701136985274,
            -33.55588548525762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.92314608970138,
            -33.575410081591215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.89902766623946,
            -33.56382458997203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90357669272872,
            -33.55610006525041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93155749717208,
            -33.54558501877968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.9270943013713,
            -33.54565655403117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91928370871993,
            -33.54451198290129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.91859706321212,
            -33.5498770290514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88323481955977,
            -33.55381118451305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88726886191817,
            -33.550020092388806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88649638572188,
            -33.56546953841149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.88649638572188,
            -33.55874650799977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.90323336997481,
            -33.5597478435711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93481906333419,
            -33.5497339654771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -69.93893893638106,
            -33.54007662658923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.01816066184493,
            -33.66632359276327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -70.04081996360274,
            -33.65832248125719
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 2
      },
      "color": "#000000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #000000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-70.13444943382612, -33.670741604858634]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12277646019331, -33.65145293638503]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12672467186323, -33.657740088528726]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1308445449101, -33.64359335032718]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12071652366987, -33.634732592953654]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08810086204878, -33.65016687140911]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06372494652143, -33.644450794586916]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07539792015424, -33.65045266528664]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08535428001753, -33.661169250641386]),
            {
              "class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09874386741987, -33.64945238256371]),
            {
              "class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09651226951948, -33.654310789753865]),
            {
              "class": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09342236473432, -33.65931180479491]),
            {
              "class": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.10406537010542, -33.66345528278966]),
            {
              "class": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11505169823042, -33.66288378044724]),
            {
              "class": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.10440869285932, -33.65516812725929]),
            {
              "class": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.10870022728315, -33.64773758513719]),
            {
              "class": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11470837547651, -33.644736607442454]),
            {
              "class": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11316342308393, -33.634732592953654]),
            {
              "class": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11093182518354, -33.62672854457975]),
            {
              "class": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12620968773237, -33.67088446774908]),
            {
              "class": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12998623802534, -33.66388390705502]),
            {
              "class": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13513607933393, -33.678027309695366]),
            {
              "class": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14062924339643, -33.68202704202386]),
            {
              "class": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14303250267378, -33.675884519408044]),
            {
              "class": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15899701073042, -33.66631273755377]),
            {
              "class": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15170140220991, -33.66974155798102]),
            {
              "class": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14449162437788, -33.66666991272558]),
            {
              "class": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.17212910606733, -33.65738287628261]),
            {
              "class": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14423413231245, -33.659240363769264]),
            {
              "class": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13805432274214, -33.662455151199]),
            {
              "class": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15307469322553, -33.653096213667425]),
            {
              "class": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16715092613569, -33.64437934122477]),
            {
              "class": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16277356102339, -33.64816628769641]),
            {
              "class": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14123005821577, -33.64768533166131]),
            {
              "class": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.14723820640913, -33.63660976886721]),
            {
              "class": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15805287315717, -33.640897252505965]),
            {
              "class": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16612095787397, -33.63589516750648]),
            {
              "class": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.160541963123, -33.63125011412984]),
            {
              "class": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16191525413862, -33.638967911286144]),
            {
              "class": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15032811119428, -33.63125011412984]),
            {
              "class": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16470248931559, -33.6199580167891]),
            {
              "class": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15354449981363, -33.612452956328]),
            {
              "class": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.16238506072672, -33.60923630178424]),
            {
              "class": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.15594775909098, -33.60651992225112]),
            {
              "class": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1390391134611, -33.62524690487165]),
            {
              "class": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13612087005289, -33.62017243748458]),
            {
              "class": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.12916858428629, -33.627819760065584]),
            {
              "class": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.13148601287516, -33.62317427119838]),
            {
              "class": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.1203280233732, -33.61874295610344]),
            {
              "class": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11311824554117, -33.61824263201793]),
            {
              "class": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06876726464345, -33.660835184575625]),
            {
              "class": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05984087304189, -33.656834466624396]),
            {
              "class": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07254381493642, -33.636113487386744]),
            {
              "class": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.085075095454, -33.63954351114318]),
            {
              "class": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09005327538564, -33.62625140810009]),
            {
              "class": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06893892602041, -33.63168283783473]),
            {
              "class": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05966921166494, -33.63668516750044]),
            {
              "class": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11048097924306, -33.61024099164831]),
            {
              "class": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11786241845205, -33.59308367366353]),
            {
              "class": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.10292787865713, -33.601376803600566]),
            {
              "class": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09503145531728, -33.59708735319438]),
            {
              "class": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09108324364736, -33.583860204796146]),
            {
              "class": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.09254236535146, -33.581071520095755]),
            {
              "class": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.11597414330556, -33.579855911382765]),
            {
              "class": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08988161400869, -33.5754223698051]),
            {
              "class": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08662004784658, -33.57120314296217]),
            {
              "class": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07855196312978, -33.571775253602404]),
            {
              "class": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07082720116689, -33.59558599514871]),
            {
              "class": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.07434625939443, -33.59401311583222]),
            {
              "class": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08687753991201, -33.59701586054673]),
            {
              "class": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06207247094228, -33.58736380910988]),
            {
              "class": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06061334923818, -33.58378870118599]),
            {
              "class": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.06335993126943, -33.58142904881151]),
            {
              "class": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.08001108483388, -33.56190581369825]),
            {
              "class": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.05039949730947, -33.56147668202609]),
            {
              "class": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04070062951162, -33.57935536164178]),
            {
              "class": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04447717980459, -33.5749933053084]),
            {
              "class": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03898401574209, -33.5942276010643]),
            {
              "class": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04456301049306, -33.59108176420874]),
            {
              "class": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03091593102529, -33.58907980829618]),
            {
              "class": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03349085167959, -33.58028495170724]),
            {
              "class": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.0243069680126, -33.579855911382765]),
            {
              "class": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01606722191885, -33.57427819307445]),
            {
              "class": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02387781457021, -33.58407471527109]),
            {
              "class": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02035875634267, -33.59265469697713]),
            {
              "class": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02308062126171, -33.59926355217603]),
            {
              "class": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.0429075102998, -33.60062186694555]),
            {
              "class": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.0319211821748, -33.59790521601206]),
            {
              "class": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03406694938671, -33.60920020277594]),
            {
              "class": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02247980644238, -33.605697485411326]),
            {
              "class": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03355196525585, -33.61606225690191]),
            {
              "class": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02625635673535, -33.622995235876566]),
            {
              "class": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02865961601269, -33.623209649014235]),
            {
              "class": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04084757377636, -33.623209649014235]),
            {
              "class": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04350832511913, -33.61313165478622]),
            {
              "class": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04136255790722, -33.605197085599286]),
            {
              "class": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03655603935253, -33.63192866454406]),
            {
              "class": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04213503410351, -33.63864599260754]),
            {
              "class": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04556826164257, -33.640360971126995]),
            {
              "class": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04925898124706, -33.64293337486173]),
            {
              "class": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03715685417187, -33.64464826798738]),
            {
              "class": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03415278007519, -33.64271901081927]),
            {
              "class": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04007509758007, -33.641146991533176]),
            {
              "class": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.03209284355175, -33.63571615862183]),
            {
              "class": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01861742546093, -33.63007058768709]),
            {
              "class": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01612833549511, -33.6331435392791]),
            {
              "class": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02179316093456, -33.644362454838564]),
            {
              "class": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04016092826855, -33.655222687410124]),
            {
              "class": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.02574137260449, -33.662652583292186]),
            {
              "class": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01818827201855, -33.64950694633806]),
            {
              "class": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00582865287792, -33.6572231071057]),
            {
              "class": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00239542533886, -33.64236173622911]),
            {
              "class": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99724558403027, -33.6269260586212]),
            {
              "class": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00582865287792, -33.615490439923555]),
            {
              "class": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00651529838574, -33.602623554977406]),
            {
              "class": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.00342539360058, -33.58946875451143]),
            {
              "class": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98969248344433, -33.60290950661744]),
            {
              "class": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99587229301464, -33.595760431142146]),
            {
              "class": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9828260283662, -33.628641270523076]),
            {
              "class": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98969248344433, -33.633215001965155]),
            {
              "class": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96462992240917, -33.63035644827392]),
            {
              "class": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97389963676464, -33.61348905062311]),
            {
              "class": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94815043022167, -33.624639056296374]),
            {
              "class": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95467356254589, -33.63950348613682]),
            {
              "class": 2,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98780420829785, -33.611773537091075]),
            {
              "class": 2,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99329737236035, -33.607198667421976]),
            {
              "class": 2,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.98365672507735, -33.5754308219473]),
            {
              "class": 2,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99584468284102, -33.56656305647663]),
            {
              "class": 2,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.99687465110274, -33.57914929121358]),
            {
              "class": 2,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97112544455977, -33.57114008142789]),
            {
              "class": 2,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95687755027267, -33.583868656112024]),
            {
              "class": 2,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96065410056563, -33.57657498339952]),
            {
              "class": 2,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96889384665938, -33.5948795037978]),
            {
              "class": 2,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96563228049727, -33.585870732944066]),
            {
              "class": 2,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96906550803634, -33.60345841087798]),
            {
              "class": 2,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97387202659102, -33.60546003306378]),
            {
              "class": 2,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95550425925704, -33.599169064013765]),
            {
              "class": 2,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95430262961837, -33.59144770202079]),
            {
              "class": 2,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95292933860274, -33.61432380130886]),
            {
              "class": 2,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96134074607345, -33.6148956260274]),
            {
              "class": 2,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.96872218528243, -33.62161428228269]),
            {
              "class": 2,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97782023826095, -33.62104250214325]),
            {
              "class": 2,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.97009547629806, -33.63161982051358]),
            {
              "class": 2,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9640873281047, -33.63705091174785]),
            {
              "class": 2,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94383128562423, -33.629761736994325]),
            {
              "class": 2,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95687755027267, -33.62575957482228]),
            {
              "class": 2,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94383128562423, -33.615181536963995]),
            {
              "class": 2,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94417460837813, -33.60317246105825]),
            {
              "class": 2,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94983943381759, -33.5948795037978]),
            {
              "class": 2,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93387492576095, -33.610749810866835]),
            {
              "class": 2,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93164332786056, -33.62447312606671]),
            {
              "class": 2,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92237361350509, -33.61646812444151]),
            {
              "class": 2,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93593486228438, -33.615324492076624]),
            {
              "class": 2,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93868144431563, -33.62202238574813]),
            {
              "class": 2,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93130000510665, -33.629026351350426]),
            {
              "class": 2,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94365962424727, -33.63474345214669]),
            {
              "class": 2,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95172770896407, -33.630455662124916]),
            {
              "class": 2,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95756419578048, -33.6468910312748]),
            {
              "class": 2,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95807917991134, -33.65432164647769]),
            {
              "class": 2,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95996745505782, -33.665323494518546]),
            {
              "class": 2,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.955675920634, -33.66903808653058]),
            {
              "class": 2,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9531009999797, -33.67832386472734]),
            {
              "class": 2,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.95275767722579, -33.685037572004305]),
            {
              "class": 2,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94400294700118, -33.67575251884312]),
            {
              "class": 2,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93593486228438, -33.70703200288113]),
            {
              "class": 2,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93095668235274, -33.701890951848526]),
            {
              "class": 2,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93627818503829, -33.6934646750937]),
            {
              "class": 2,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92803843894454, -33.68232358325997]),
            {
              "class": 2,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92735179343673, -33.670752459509224]),
            {
              "class": 2,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92958339133712, -33.658751131093894]),
            {
              "class": 2,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93232997336837, -33.663751888071204]),
            {
              "class": 2,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93850978293868, -33.6604657090868]),
            {
              "class": 2,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.933703264384, -33.651320898327896]),
            {
              "class": 2,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93833812156173, -33.64960613812591]),
            {
              "class": 2,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94400294700118, -33.64603361131938]),
            {
              "class": 2,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.94846614280196, -33.641460560663226]),
            {
              "class": 2,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93850978293868, -33.63831644743675]),
            {
              "class": 2,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93490489402267, -33.63502929722516]),
            {
              "class": 2,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92443355002852, -33.64517618282404]),
            {
              "class": 2,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9343899098918, -33.641746383445536]),
            {
              "class": 2,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92443355002852, -33.65246405281685]),
            {
              "class": 2,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91859706321212, -33.65589342518158]),
            {
              "class": 2,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92134364524337, -33.66175162015948]),
            {
              "class": 2,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91842540183517, -33.66932381773338]),
            {
              "class": 2,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.922716936259, -33.672752518127915]),
            {
              "class": 2,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91876872458907, -33.6758953734095]),
            {
              "class": 2,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9149921742961, -33.67818101419551]),
            {
              "class": 2,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91876872458907, -33.692893372181814]),
            {
              "class": 2,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92803843894454, -33.687465805092344]),
            {
              "class": 2,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93078502097579, -33.67403824553529]),
            {
              "class": 2,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92100032248946, -33.70217657386704]),
            {
              "class": 2,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92529185691329, -33.696463953066974]),
            {
              "class": 2,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90761073508712, -33.70017719979481]),
            {
              "class": 2,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91619380393477, -33.69574984875943]),
            {
              "class": 2,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90812571921798, -33.70346186119832]),
            {
              "class": 2,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92374690452071, -33.706317986415876]),
            {
              "class": 2,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89078792014571, -33.70674639700732]),
            {
              "class": 2,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88821299949142, -33.71188715742493]),
            {
              "class": 2,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88392146506759, -33.70746040991112]),
            {
              "class": 2,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90022929587813, -33.703176243453285]),
            {
              "class": 2,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89902766623946, -33.69817777919072]),
            {
              "class": 2,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90743907371017, -33.70703200288113]),
            {
              "class": 2,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9288967458293, -33.70646079018379]),
            {
              "class": 2,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9094990102336, -33.67632393568475]),
            {
              "class": 2,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90589412131759, -33.666895072254164]),
            {
              "class": 2,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90675242820235, -33.65832248125719]),
            {
              "class": 2,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91447719016524, -33.65074931538968]),
            {
              "class": 2,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91636546531173, -33.64517618282404]),
            {
              "class": 2,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9065807668254, -33.64932034143765]),
            {
              "class": 2,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92065699973556, -33.63874519690958]),
            {
              "class": 2,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92958339133712, -33.63602974752855]),
            {
              "class": 2,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92391856589767, -33.63131323720567]),
            {
              "class": 2,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91310389914962, -33.6353151413549]),
            {
              "class": 2,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90967067161056, -33.6400314325195]),
            {
              "class": 2,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90331920066329, -33.635743905770646]),
            {
              "class": 2,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90967067161056, -33.626739404781894]),
            {
              "class": 2,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9179104177043, -33.62631059554136]),
            {
              "class": 2,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92323192038985, -33.62087882709124]),
            {
              "class": 2,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93027003684493, -33.616161487213894]),
            {
              "class": 2,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91636546531173, -33.618734613704326]),
            {
              "class": 2,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90520747580977, -33.621307663366096]),
            {
              "class": 2,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90211757102462, -33.614588983205024]),
            {
              "class": 2,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91430552878829, -33.607154939513464]),
            {
              "class": 2,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91859706321212, -33.59871938283917]),
            {
              "class": 2,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.8944786397502, -33.60686900195305]),
            {
              "class": 2,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90151675620528, -33.60558227119554]),
            {
              "class": 2,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88786967673751, -33.60207940684287]),
            {
              "class": 2,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87902911582442, -33.595216239701834]),
            {
              "class": 2,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89774020591231, -33.58699401841892]),
            {
              "class": 2,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89645274558517, -33.58084471471518]),
            {
              "class": 2,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9201420156047, -33.583776414163275]),
            {
              "class": 2,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91919787803145, -33.592427922043264]),
            {
              "class": 2,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89679606833907, -33.57583914401622]),
            {
              "class": 2,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.8985126821086, -33.56861630898257]),
            {
              "class": 2,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.87894328513595, -33.5683302436696]),
            {
              "class": 2,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88040240684005, -33.55767363557672]),
            {
              "class": 2,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88701136985274, -33.55588548525762]),
            {
              "class": 2,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.92314608970138, -33.575410081591215]),
            {
              "class": 2,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.89902766623946, -33.56382458997203]),
            {
              "class": 2,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90357669272872, -33.55610006525041]),
            {
              "class": 2,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93155749717208, -33.54558501877968]),
            {
              "class": 2,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.9270943013713, -33.54565655403117]),
            {
              "class": 2,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91928370871993, -33.54451198290129]),
            {
              "class": 2,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.91859706321212, -33.5498770290514]),
            {
              "class": 2,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88323481955977, -33.55381118451305]),
            {
              "class": 2,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88726886191817, -33.550020092388806]),
            {
              "class": 2,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88649638572188, -33.56546953841149]),
            {
              "class": 2,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.88649638572188, -33.55874650799977]),
            {
              "class": 2,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.90323336997481, -33.5597478435711]),
            {
              "class": 2,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93481906333419, -33.5497339654771]),
            {
              "class": 2,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Point([-69.93893893638106, -33.54007662658923]),
            {
              "class": 2,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.01816066184493, -33.66632359276327]),
            {
              "class": 2,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Point([-70.04081996360274, -33.65832248125719]),
            {
              "class": 2,
              "system:index": "252"
            })]),
    AOI_V2 = ui.import && ui.import("AOI_V2", "table", {
      "id": "projects/ee-alexanderfuentealbav/assets/Cuencas_Estudio_V2_Lineas"
    }) || ee.FeatureCollection("projects/ee-alexanderfuentealbav/assets/Cuencas_Estudio_V2_Lineas"),
    Red_Hidrografica = ui.import && ui.import("Red_Hidrografica", "table", {
      "id": "projects/ee-alexanderfuentealbav/assets/Red_Hidrografica_AOI"
    }) || ee.FeatureCollection("projects/ee-alexanderfuentealbav/assets/Red_Hidrografica_AOI");
/*
//Buscar imagenes Landsat
var colec_L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")// Colección USGS Landsat 8 Surface Reflectance
  .filterBounds(AOI) // filtro por límites del objeto AOI
  .filterDate('2020-12-01','2020-12-31') // filtro por fecha
  .filterMetadata('WRS_ROW','equals',83)
  ;
print(colec_L8, 'Coleccion_L8'); //Imprime colección en CONSOLE
Map.addLayer(ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20201227'), {bands: 'B4,B3,B2', min: 0, max: 2500},'Imagen Landsat'); //Resultado en el panel de navegación.
*/
// Imagenes representativas del mes
var L_ene = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20200110').clip(AOI);
var L_feb = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20200211').clip(AOI);
var L_mar = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20200314').clip(AOI);
var L_abr = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_232083_20200408').clip(AOI);
var L_may = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_232083_20200510').clip(AOI);
var L_jun = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_232083_20200611').clip(AOI);
var L_jul = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_232083_20200713').clip(AOI);
var L_ago = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_232083_20200814').clip(AOI);
var L_sep = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_232083_20200915').clip(AOI);
var L_oct = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20201008').clip(AOI);
var L_nov = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20201125').clip(AOI);
var L_dic = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_233083_20201211').clip(AOI);
//Colección de imágenes Landsat año 2020
var L_2020_colec = ee.ImageCollection([L_ene,L_feb,L_mar,L_abr,L_may,L_jun,L_jul,L_ago,L_sep,L_oct,L_nov,L_dic]);
var L_2020_img = {
  '10-Enero': L_ene,
  '11-Febrero': L_feb,
  '14-Marzo': L_mar,
  '08-Abril': L_abr,
  '10-Mayo': L_may,
  '11-Junio': L_jun,
  '13-Julio': L_jul,
  '14-Agosto': L_ago,
  '15-Septiembre': L_sep,
  '08-Octubre': L_oct,
  '25-Noviembre':L_nov,
  '11-Diciembre': L_dic};
print(L_2020_colec, L_2020_img);
/*
Map.addLayer(L_ene,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Enero 2020', false);
Map.addLayer(L_feb,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Febrero 2020', false);
Map.addLayer(L_mar,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Marzo 2020', false);
Map.addLayer(L_abr,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Abril 2020', false);
Map.addLayer(L_may,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Mayo 2020', false);
Map.addLayer(L_jun,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Junio 2020', false);
Map.addLayer(L_jul,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Julio 2020', false);
Map.addLayer(L_ago,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Agosto 2020', false);
Map.addLayer(L_sep,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Septiembre 2020', false);
Map.addLayer(L_oct,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Octubre 2020', false);
Map.addLayer(L_nov,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Noviembre 2020', false);
Map.addLayer(L_dic,{bands: 'B4,B3,B2', min: 0, max: 2500},'Landsat Diciembre 2020', false);
*/
//Limite área de estudio con feature importado desde asset
//Map.addLayer(AOI,{color: 'd61344'}, 'AOI', true, 0.5); // Agrega AOI al mapa
//Map.addLayer(Masas_Agua,{color: '7bccc4'}, 'Masas de Agua', true);
//Map.centerObject(AOI, 11.5); // Centra el mapa en AOI, 11.5 corresponde al zoom
//Función para calcular NDSI
var ndsiL8 = function(image){
  var ndsi = image.normalizedDifference(["B3","B6"]).rename("NDSI"); //Calculamos el indice y renombramos la banda por NDSI
  return image.addBands(ndsi); // agregamos NDSI como una banda mas de las imagenes.
};
var L_2020_ndsi = L_2020_colec.map(ndsiL8);
//var L_oct_ndsi = L_oct.map(ndsiL8);
//print("Coleccion sin NDSI:",L_2020_colec);
print("Coleccion con NDSI",L_2020_ndsi);
//print(L_2020_ndsi.select(['NDSI']));
//Map.addLayer(L_2020_ndsi.select(['NDSI']));
//Seleccionar imagen entrenamiento
// Ayuda de la vida
//Existe otra alternativa con imageCollection.toBands()
var stackCollection = function(collection) {
  // Create an initial image.
  var first = ee.Image(collection.first()).select([]);
  // Write a function that appends a band to an image.
  var appendBands = function(image, previous) {
    return ee.Image(previous).addBands(image);
  };
  return ee.Image(collection.iterate(appendBands, first));
};
var stacked = stackCollection(L_2020_ndsi.filterDate('2020-11-01', '2020-11-30'));
//print('stacked image', stacked);
var img_train_bandas = stacked.select('B2','B3','B4','B5','B6','B7','NDSI');
var nombres_bandas = ['B2','B3','B4','B5','B6','B7','NDSI'];
print(img_train_bandas, 'Imagen de entrenamiento: noviembre');
//Preparación de puntos
var ptos_todos = Nieve.merge(No_Nieve);
//print(ptos_todos, 'Puntos todos');
//Extracción información desde las bandas a partir de los puntos
var Puntos_class = img_train_bandas.select(nombres_bandas).sampleRegions({
  collection: ptos_todos, 
  properties: ['class'],
  scale: 30
  });
print(Puntos_class, 'Puntos class');
//Partición de los datos: 70% entrenamiento y 30% control
var trainingTesting = Puntos_class.randomColumn();// crea una columna con n° pseudo-aleatorios entre 0 y 1 
var trainingSet = trainingTesting
 .filter(ee.Filter.lessThan('random', 0.7));// seleccionada de la columna 'random' valores <= a 0.7
var testingSet = trainingTesting
 .filter(ee.Filter.greaterThanOrEquals('random', 0.7));// seleccionada de la columna 'random' valores >= a 0.7   
print(trainingSet, 'training set');
print(testingSet, 'testing set');
/*
//// Clasificación con Mínima Distancia
var clasificadorMD = ee.Classifier.minimumDistance().train({
 features: trainingSet, // usando puntos de entrenamiento
 classProperty: 'class', // clase 
 inputProperties: nombres_bandas // bandas usadas 
});
var clasificadaMD = img_train_bandas.select(nombres_bandas).classify(clasificadorMD);// Clasifica imagen
*/  
////  Visualizacion clasificacion /Creación paleta de colores
var paleta = [
   '#0014ff', // Nieve
   '#ffffff', // No_Nieve
   ];  
/*  
Map.addLayer(clasificadaMD, {min: 1, max: 2, palette:paleta }, 'clasificación Minima Distancia');
*/
//// Clasificación con Random Forest 
var clasificadorRF = ee.Classifier.smileRandomForest(500).train({
 features: trainingSet, // usando puntos de entrenamiento
 classProperty: 'class', // clase 
 inputProperties: nombres_bandas // bandas usadas 
 });
var clasificadaRF = img_train_bandas.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
Map.addLayer(clasificadaRF, {min: 1, max: 2, palette:paleta }, 'clasificación Random Forest');
Map.addLayer(AOI_V2, {color: '#000000'}, 'Cuencas aportantes');
Map.addLayer(Red_Hidrografica, {color: '#6498d2'}, 'Red Hidrografica');
Map.addLayer(Masas_Agua,{color: '#a5bfdd'}, 'Masas de Agua', true);
Map.centerObject(AOI, 11.5); // Centra el mapa en AOI, 11.5 corresponde al zoom
// Validación RF
var confusionMatrix = ee.ConfusionMatrix(testingSet.classify(clasificadorRF)
   .errorMatrix({
    actual: 'class', 
    predicted: 'classification'
    }));
var pg = confusionMatrix.accuracy();// exactitud general
var pu = confusionMatrix.consumersAccuracy();// exactitud usuario
var pp = confusionMatrix.producersAccuracy();// exactitud productor
var k = confusionMatrix.kappa(); // kappa
print('Confusion matrix', confusionMatrix);
print('Overall Accuracy', pg);
print('Producers Accuracy', pp);
print('Consumers Accuracy', pu);
print('Kappa', k);
//Imagenes predictoras
var Pred_ene = stackCollection(L_2020_ndsi.filterDate('2020-01-01', '2020-01-31'));
var Pred_feb = stackCollection(L_2020_ndsi.filterDate('2020-02-01', '2020-02-29'));
var Pred_mar = stackCollection(L_2020_ndsi.filterDate('2020-03-01', '2020-03-31'));
var Pred_abr = stackCollection(L_2020_ndsi.filterDate('2020-04-01', '2020-04-30'));
var Pred_may = stackCollection(L_2020_ndsi.filterDate('2020-05-01', '2020-05-31'));
var Pred_jun = stackCollection(L_2020_ndsi.filterDate('2020-06-01', '2020-06-30'));
var Pred_jul = stackCollection(L_2020_ndsi.filterDate('2020-07-01', '2020-07-31'));
var Pred_ago = stackCollection(L_2020_ndsi.filterDate('2020-08-01', '2020-08-31'));
var Pred_sep = stackCollection(L_2020_ndsi.filterDate('2020-09-01', '2020-09-30'));
var Pred_oct = stackCollection(L_2020_ndsi.filterDate('2020-10-01', '2020-10-31'));
var Pred_nov = stackCollection(L_2020_ndsi.filterDate('2020-11-01', '2020-11-30'));
var Pred_dic = stackCollection(L_2020_ndsi.filterDate('2020-12-01', '2020-12-31'));
print(Pred_dic, 'Imagen predictora diciembre');
//Imagenes Clasificadas
var clasificadaRF_ene = Pred_ene.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_feb = Pred_feb.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_mar = Pred_mar.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_abr = Pred_abr.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_may = Pred_may.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_jun = Pred_jun.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_jul = Pred_jul.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_ago = Pred_ago.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_sep = Pred_sep.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_oct = Pred_oct.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_nov = Pred_nov.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
var clasificadaRF_dic = Pred_dic.select(nombres_bandas).classify(clasificadorRF);// Clasifica imagen
//Map.addLayer(clasificadaRF_oct, {min: 1, max: 2, palette:paleta }, 'clasificación Octubre ');
var Nieve_2020_img = {
  '10-Enero': clasificadaRF_ene,
  '11-Febrero': clasificadaRF_feb,
  '14-Marzo': clasificadaRF_mar,
  '08-Abril': clasificadaRF_abr,
  '10-Mayo': clasificadaRF_may,
  '11-Junio': clasificadaRF_jun,
  '13-Julio': clasificadaRF_jul,
  '14-Agosto': clasificadaRF_ago,
  '15-Septiembre': clasificadaRF_sep,
  '08-Octubre': clasificadaRF_oct,
  '25-Noviembre':clasificadaRF_nov,
  '11-Diciembre': clasificadaRF_dic};
//print(Nieve_2020_img);
/*
 * Set up the maps and control widgets
 */
/*
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
  var label = ui.Label('Imagenes Landsat 8, año 2020\nSeleccionar imagen', {whiteSpace: 'pre'});
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(L_2020_img[selection], {bands: 'B4,B3,B2', min: 0, max: 2500}));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(L_2020_img), onChange: updateMap});
  select.setValue(Object.keys(L_2020_img)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
*/
/*
 * Tie everything together
 */
/*
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(AOI, 11.5);
*/
// Show the composite image for November 2019
var map1 = ui.Map();
map1.setControlVisibility(false);
var leftSelector = addLayerSelector(map1, 9, 'top-left');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Imagenes Landsat 8, año 2020\nSeleccionar imagen', {whiteSpace: 'pre'});
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(L_2020_img[selection], {bands: 'B4,B3,B2', min: 0, max: 2500}));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(L_2020_img), onChange: updateMap});
  select.setValue(Object.keys(L_2020_img)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//Map.addLayer(L_oct , {bands: ['B4', 'B3', 'B2'], min: 0, max: 2500}, "Color verdadero octubre", true);
// Split Panels
// Map 2
var map2 = ui.Map();
map2.setControlVisibility(false);
var rightSelector = addLayerSelector2(map2, 9, 'top-right');
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Clasificación RF Nieve\nSeleccionar imagen', {whiteSpace: 'pre'});
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(1, ui.Map.Layer(Nieve_2020_img[selection], {min: 1, max: 2, palette:paleta}));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(Nieve_2020_img), onChange: updateMap});
  select.setValue(Object.keys(Nieve_2020_img)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
map2.addLayer(AOI_V2, {color: '#000000'}, 'Cuencas aportantes');
map2.addLayer(Red_Hidrografica, {color: '#6498d2'}, 'Red Hidrografica');
map2.addLayer(Masas_Agua,{color: '#a5bfdd'}, 'Masas de Agua', true);
// Link the two panels
var linker = ui.Map.Linker([map1, map2]);
// Create the split panels
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the split panels to ui roots
ui.root.widgets().reset([splitPanel]);
// Set the view center
linker.get(0).centerObject(AOI, 11.5);