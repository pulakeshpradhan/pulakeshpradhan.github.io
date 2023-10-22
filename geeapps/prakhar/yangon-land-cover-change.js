var landsat7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    location_Yangon = /* color: #d63000 */ee.Geometry.Point([96.17701096383729, 16.923813306157438]),
    lakel7 = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.13637476723216, 16.839572061924315],
                  [96.13611727516673, 16.83690216035747],
                  [96.13761931221507, 16.836820008942937],
                  [96.14118128578684, 16.837271841281744],
                  [96.13873511116526, 16.838997009383856],
                  [96.13869219582102, 16.840270337660655]]]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.15388422768137, 16.83345177025815],
                  [96.15397005836985, 16.835094821003896],
                  [96.15272551338694, 16.83690216035747],
                  [96.15083723824046, 16.833698228778836]]]),
            {
              "class": 2,
              "system:index": "1"
            })]),
    riverl7 = /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.11633330147288, 16.81956742240317],
                  [96.11564665596507, 16.82597570938777],
                  [96.10886603157542, 16.824332579538602]]]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.11701994698069, 16.80592855203178],
                  [96.11667662422678, 16.801655933062662],
                  [96.1199381903889, 16.801820266340595],
                  [96.12019568245432, 16.807161020390975],
                  [96.11933737556956, 16.811762164841525],
                  [96.11676245491526, 16.8118443271208]]]),
            {
              "class": 1,
              "system:index": "1"
            })]),
    fallowlandl7 = /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.09367399971507, 16.810201074771662],
                  [96.09230070869944, 16.8123373000489],
                  [96.09418898384592, 16.81496646735329],
                  [96.09101324837229, 16.81587023519393],
                  [96.08869581978342, 16.813898372532762]]]),
            {
              "class": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.07273131172678, 16.81562375348285],
                  [96.07135802071116, 16.81734911873074],
                  [96.07170134346507, 16.81956742240317],
                  [96.06912642281077, 16.81858151286487],
                  [96.06912642281077, 16.816034556156627]]]),
            {
              "class": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.07204466621897, 16.792370871716688],
                  [96.0748770789387, 16.794014278485594],
                  [96.07693701546214, 16.795657671028327],
                  [96.07822447578928, 16.797465386392613],
                  [96.07419043343089, 16.798862245563924],
                  [96.07170134346507, 16.79680803734299],
                  [96.0693839148762, 16.794178618380073]]]),
            {
              "class": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.09456314881595, 16.79559262108672],
                  [96.09969153245243, 16.79544882475792],
                  [96.09973444779666, 16.79820147842121],
                  [96.09479918320926, 16.79828364657367]]]),
            {
              "class": 4,
              "system:index": "3"
            })]),
    vegetationl7 = /* color: #00ffff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.13526483824171, 16.798473759647603],
                  [96.13350530912794, 16.79744665621389],
                  [96.13419195463575, 16.796173040237036],
                  [96.13410612394728, 16.794899415714596],
                  [96.13389154722609, 16.794118802912692],
                  [96.13303324034132, 16.79305059071918],
                  [96.13397737791456, 16.791694774279836],
                  [96.13543649961866, 16.791982372515406],
                  [96.13453527738966, 16.793338186901014],
                  [96.13500734617628, 16.795187009095624],
                  [96.13500734617628, 16.79695364459145]]]),
            {
              "class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.14376207640089, 16.79481724609715],
                  [96.1455645208589, 16.795638940671225],
                  [96.14543577482618, 16.7963784627468],
                  [96.14371916105665, 16.79588544834988]]]),
            {
              "class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.14878317167677, 16.795433517361154],
                  [96.14951273252882, 16.795844363759],
                  [96.14908357908644, 16.79674822270416],
                  [96.14835401823439, 16.796460631688458]]]),
            {
              "class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.10014214356693, 16.799680499722598],
                  [96.10009922822269, 16.800378922441546],
                  [96.09947695573123, 16.800378922441546],
                  [96.09913363297733, 16.7999064602953],
                  [96.09904780228885, 16.79910532614168]]]),
            {
              "class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.08780398209842, 16.797503047689055]),
            {
              "class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.08825459321292, 16.797482505569793]),
            {
              "class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.08883395036014, 16.797420879198672]),
            {
              "class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.08919873078617, 16.797461963448317]),
            {
              "class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.08947768052371, 16.797811179211234]),
            {
              "class": 3,
              "system:index": "8"
            })]),
    builtupl7 = /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.12831255247511, 16.81072186823028],
                  [96.12698217680372, 16.81014672812361],
                  [96.12805506040968, 16.807517493996464],
                  [96.13058706571974, 16.804847140782627],
                  [96.1320032720796, 16.80509363650018],
                  [96.12929960539259, 16.807805068254304]]]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.13045831968702, 16.809242933003443],
                  [96.13221784880079, 16.809982402058473],
                  [96.1311020498506, 16.812241872972866],
                  [96.1294283514253, 16.811913224331143]]]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.1634334787434, 16.787385589241648],
                  [96.16875498142895, 16.786687118720987],
                  [96.16888372746166, 16.788536005676043],
                  [96.16283266392406, 16.788741436448877]]]),
            {
              "class": 0,
              "system:index": "2"
            })]),
    redbldgsl7 = /* color: #ff0000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.1536594261554, 16.788611540706842]),
            {
              "class": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1536594261554, 16.78838556668995]),
            {
              "class": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15369161266358, 16.78807741986994]),
            {
              "class": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1540027489093, 16.788087691438676]),
            {
              "class": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15403493541749, 16.78837529513733]),
            {
              "class": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15433534282715, 16.788406109793506]),
            {
              "class": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15433534282715, 16.78856018299935]),
            {
              "class": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15397056240113, 16.788611540706842]),
            {
              "class": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15448554653199, 16.78885805750952]),
            {
              "class": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16549199651195, 16.77602870554319]),
            {
              "class": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16544908116771, 16.77576162762446]),
            {
              "class": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16542762349559, 16.7754534603288]),
            {
              "class": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16540616582347, 16.77508365891447]),
            {
              "class": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16654342244578, 16.77592598331117]),
            {
              "class": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16654342244578, 16.775412371318282]),
            {
              "class": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16652196477366, 16.775104203456358]),
            {
              "class": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16564220021678, 16.77853511079976]),
            {
              "class": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16570657323314, 16.778268036403325]),
            {
              "class": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15446275304271, 16.778021505858074]),
            {
              "class": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15472024510814, 16.778021505858074]),
            {
              "class": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1550206525178, 16.778144771170687]),
            {
              "class": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14964569501853, 16.780153504946252]),
            {
              "class": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1499461024282, 16.780153504946252]),
            {
              "class": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14992464475608, 16.780461664620336]),
            {
              "class": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15018213682151, 16.780461664620336]),
            {
              "class": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1501606791494, 16.780687648063697]),
            {
              "class": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14876593046165, 16.77820181540482]),
            {
              "class": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14895904951072, 16.77826344801264]),
            {
              "class": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14842260770774, 16.778366168981243]),
            {
              "class": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14825094633079, 16.77826344801264]),
            {
              "class": 5,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14185656003929, 16.786585144943356]),
            {
              "class": 5,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14196384839988, 16.786338625190435]),
            {
              "class": 5,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14159906797386, 16.78652351503511]),
            {
              "class": 5,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1453541605947, 16.788166972410828]),
            {
              "class": 5,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14531124525047, 16.787920454711085]),
            {
              "class": 5,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14531124525047, 16.787694479871877]),
            {
              "class": 5,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14554727964378, 16.78771502305019]),
            {
              "class": 5,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14559019498802, 16.787899911554998]),
            {
              "class": 5,
              "system:index": "37"
            })]),
    builtupl8 = /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.14981174468994, 16.77590369657821]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1497688293457, 16.774301222382444]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1517858505249, 16.773643793163153]),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.153244972229, 16.773150719756533]),
            {
              "class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15521907806396, 16.773438346065817]),
            {
              "class": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15543365478516, 16.775410629033864]),
            {
              "class": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15706443786621, 16.775821518742973]),
            {
              "class": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15736484527588, 16.777999219370848]),
            {
              "class": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16088390350342, 16.77767051144114]),
            {
              "class": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16251468658447, 16.776191318721693]),
            {
              "class": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16268634796143, 16.77475320365171]),
            {
              "class": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16354465484619, 16.776232407563807]),
            {
              "class": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1713981628418, 16.77528736194794]),
            {
              "class": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17092609405518, 16.774917560210437]),
            {
              "class": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17191314697266, 16.774958649327896]),
            {
              "class": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17169857025146, 16.77713635984274]),
            {
              "class": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1711835861206, 16.778245749945004]),
            {
              "class": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16895198822021, 16.778245749945004]),
            {
              "class": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16839408874512, 16.777506157263083]),
            {
              "class": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16526126861572, 16.773356167164714]),
            {
              "class": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16307258605957, 16.773397256619706]),
            {
              "class": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15650653839111, 16.77331507770084]),
            {
              "class": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15418910980225, 16.772534376199715]),
            {
              "class": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15105628967285, 16.77306854073108]),
            {
              "class": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14946842193604, 16.773232898746443]),
            {
              "class": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14843845367432, 16.773684882555976]),
            {
              "class": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14805221557617, 16.77553389603988]),
            {
              "class": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14268779754639, 16.77590369657821]),
            {
              "class": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1433744430542, 16.776314585221368]),
            {
              "class": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14380359649658, 16.77528736194794]),
            {
              "class": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14663600921631, 16.775944785482498]),
            {
              "class": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14547729492188, 16.776396762843405]),
            {
              "class": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14560604095459, 16.774054686691667]),
            {
              "class": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14088535308838, 16.7761502298707]),
            {
              "class": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14006996154785, 16.776396762843405]),
            {
              "class": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([96.12925529610948, 16.807580034371526]),
            {
              "class": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13080024850206, 16.806183239378157]),
            {
              "class": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17938041817979, 16.805772415363897]),
            {
              "class": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1774921430333, 16.80248579122276]),
            {
              "class": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19843483102159, 16.795748033766504]),
            {
              "class": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19826316964463, 16.792543406656538]),
            {
              "class": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.19056640825329, 16.880320356355515],
                  [96.19163929185925, 16.881264878133035],
                  [96.19048057756481, 16.881839802118996],
                  [96.18953643999157, 16.880895283217587]]]),
            {
              "class": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.18369995317516, 16.874201383443793],
                  [96.18468700609264, 16.87481739640269],
                  [96.18378578386364, 16.876131550666937],
                  [96.18219791612682, 16.875679811169945]]]),
            {
              "class": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.18164001665173, 16.881675538301657],
                  [96.18219791612682, 16.880936349355032],
                  [96.18275581560192, 16.881921933974073],
                  [96.18168293199597, 16.88307177619348],
                  [96.18056713304577, 16.88249685595917]]]),
            {
              "class": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.19357048234997, 16.86689120964587],
                  [96.19537292680798, 16.868575038793818],
                  [96.19464336595593, 16.869396413421104],
                  [96.19254051408825, 16.868123281226886]]]),
            {
              "class": 0,
              "system:index": "44"
            })]),
    riverl8 = /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.11715316903428, 16.80322528661845],
                  [96.11569404733018, 16.796405386487056],
                  [96.1192989362462, 16.795830202981065],
                  [96.12067222726182, 16.804457772539674],
                  [96.11947059762315, 16.811441708175227],
                  [96.11629486214952, 16.811441708175227]]]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.20942115914659, 16.78062829306734],
                  [96.22014999520616, 16.778245180665984],
                  [96.23293876778916, 16.784819211337332],
                  [96.22787475716905, 16.793940302047538]]]),
            {
              "class": 1,
              "system:index": "1"
            })]),
    lakel8 = /* color: #00ffff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.13706588745117, 16.840442834026423],
                  [96.13543510437012, 16.836253144791396],
                  [96.13801002502441, 16.83633529645189],
                  [96.14144325256348, 16.835842385954283]]]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.14230155944824, 16.83239197654411],
                  [96.14504814147949, 16.83107751832779],
                  [96.14341735839844, 16.835349474173494],
                  [96.14195823669434, 16.8346922564698]]]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.15225791931152, 16.83329565124732],
                  [96.15397453308105, 16.835020855578446],
                  [96.15294456481934, 16.837238952336484],
                  [96.15114212036133, 16.83658174119122],
                  [96.15054130554199, 16.83403502645668]]]),
            {
              "class": 2,
              "system:index": "2"
            })]),
    vegetationl8 = /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.16320133274712, 16.79864533218798],
                  [96.16378068989434, 16.798727500148285],
                  [96.16382360523858, 16.799467010190092],
                  [96.16313695973076, 16.799590261583567]]]),
            {
              "class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16107702320733, 16.800124350030327]),
            {
              "class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16174221104302, 16.800494102689875]),
            {
              "class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16142034596123, 16.80010380819478]),
            {
              "class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16114139622368, 16.79996001528373]),
            {
              "class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16157054966607, 16.799877847857058]),
            {
              "class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16197824543633, 16.800083266357024]),
            {
              "class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1647462851397, 16.79741280851473]),
            {
              "class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16403818195977, 16.796714374880462]),
            {
              "class": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16416692799248, 16.79864533218798]),
            {
              "class": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16348028248467, 16.79813178163017]),
            {
              "class": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16502523487725, 16.798953461855668]),
            {
              "class": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15961790150322, 16.79782365062848]),
            {
              "class": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15918874806084, 16.79751551912654]),
            {
              "class": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15951061314263, 16.797248471420232]),
            {
              "class": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14884615009942, 16.79691979680438]),
            {
              "class": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14835262364068, 16.796632206048635]),
            {
              "class": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14489793777466, 16.796139191056962]),
            {
              "class": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14468336105347, 16.79537912570231]),
            {
              "class": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14597082138062, 16.795564006744357]),
            {
              "class": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14363193511963, 16.79507099023211]),
            {
              "class": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14871740341187, 16.796611662581327]),
            {
              "class": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1589527130127, 16.79355084792565]),
            {
              "class": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15755796432495, 16.792544261764608]),
            {
              "class": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15800857543945, 16.791845810218092]),
            {
              "class": 3,
              "system:index": "24"
            })]),
    fallowlandl8 = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[96.0959529876709, 16.796075441564902],
                  [96.10101699829102, 16.795582426380946],
                  [96.10101699829102, 16.7985404982766],
                  [96.09586715698242, 16.800430353406792]]]),
            {
              "class": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.0959529876709, 16.777011255619566],
                  [96.09621047973633, 16.780544848324986],
                  [96.09200477600098, 16.78038049663295]]]),
            {
              "class": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[96.09380722045898, 16.79648628657338],
                  [96.09389305114746, 16.799280009047063],
                  [96.0904598236084, 16.79796532124075]]]),
            {
              "class": 4,
              "system:index": "2"
            })]),
    redbldgsl8 = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([96.14959716796875, 16.79854170190975]),
            {
              "class": 5,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14543437957764, 16.788147162427048]),
            {
              "class": 5,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14534854888916, 16.787982817312297]),
            {
              "class": 5,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14217281341553, 16.788927799779945]),
            {
              "class": 5,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15371704101562, 16.788516938415253]),
            {
              "class": 5,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([96.18603229522705, 16.821588432299418]),
            {
              "class": 5,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1856460571289, 16.817192926275396]),
            {
              "class": 5,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([96.18551731109619, 16.816946446284014]),
            {
              "class": 5,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([96.18594646453857, 16.81706968631977]),
            {
              "class": 5,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([96.20045185089111, 16.819082595561923]),
            {
              "class": 5,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19925022125244, 16.818507480816752]),
            {
              "class": 5,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([96.19834899902344, 16.817850204685595]),
            {
              "class": 5,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17382287979126, 16.817809726607155]),
            {
              "class": 5,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17373704910278, 16.81707028807756]),
            {
              "class": 5,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17534637451172, 16.815653022833914]),
            {
              "class": 5,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([96.17663383483887, 16.817152448056618]),
            {
              "class": 5,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16638779640198, 16.77543144172622]),
            {
              "class": 5,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16641998291016, 16.774876739270656]),
            {
              "class": 5,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1657977104187, 16.774876739270656]),
            {
              "class": 5,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([96.1652398109436, 16.774876739270656]),
            {
              "class": 5,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([96.16530418395996, 16.77556498096449]),
            {
              "class": 5,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15519762039185, 16.780464477648135]),
            {
              "class": 5,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15590572357178, 16.780361757813832]),
            {
              "class": 5,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15590572357178, 16.7800125099618]),
            {
              "class": 5,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15545511245728, 16.779971421937002]),
            {
              "class": 5,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([96.15463972091675, 16.778142995839183]),
            {
              "class": 5,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14172220230103, 16.77787592120515]),
            {
              "class": 5,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([96.14131450653076, 16.777752655718157]),
            {
              "class": 5,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13279581069946, 16.776314552462416]),
            {
              "class": 5,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([96.13316059112549, 16.776581629604163]),
            {
              "class": 5,
              "system:index": "29"
            })]);
// L7 portion
// --- Step 1. Input image preparation ---
// bands to be considered
var Landsat_8_BANDS = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7' ];
var Landsat_7_BANDS = ['B1',   'B2',    'B3',  'B4',  'B5',  'B7'];
var STD_NAMES       = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
// ---------------------------------------
var imcollection = landsat7;
function getlandsat(start_date, end_date, location){
  var l7_l1t = ee.ImageCollection(imcollection)
  .filterDate(start_date, end_date)
  .filterBounds(location).select(Landsat_7_BANDS, STD_NAMES).median(); 
  return l7_l1t;
}
// make ndvi function
function addNDVI(image) {
  return image
    .addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI'))
  ;
}
// Initialze dates
var start_date = ee.Date.fromYMD(2001, 2, 20); 
var end_date = ee.Date.fromYMD(2001, 2, 28);
var location = location_Yangon;
var bands =['blue', 'green', 'red', 'nir', 'swir1', 'swir2','NDVI' ];
// Get data
var l8_l1t = getlandsat(start_date, end_date, location);
// Map.addLayer(l8_l1t, {bands: ['red', 'green', 'blue'], min:0, max:2000}, 'L7', 1);
//print(l8_l1t)
// add a new band as  NDVI
var newComposite = addNDVI(l8_l1t);
var ndviLayer = newComposite.select('NDVI');
// Map.addLayer(ndviLayer, {bands: ['NDVI']}, 'NDVI', 0);
var training_pts = builtupl7.merge(riverl7).merge(lakel7).merge(vegetationl7).merge(fallowlandl7);
//.merge(redbldgs);
//print (training_pts);
var training = newComposite.select(bands).sampleRegions({
  collection: training_pts, 
  properties: ['class'], 
  scale: 30
});
// print(training)
var classifier = ee.Classifier.cart().train({
  features: training, 
  classProperty: 'class', 
  inputProperties: bands
});
// print(classifier.explain());
var classifiedL7 = newComposite.select(bands).classify(classifier);
// Map.addLayer(classifiedL7, {min: 0, max: 5, palette: ['red', 'blue', 'blue', 'green', 'yellow', 'black']}, 'cartL7', 0);
// Landsat 8 portion
// Map.addLayer(classifiedL7, {min: 0, max: 5, palette: ['red', 'blue', 'blue', 'green', 'yellow', 'black']}, 'cartL7', 0);
// Landsat 8 portion
// --- Step 1. Input image preparation ---
// bands to be considered
var Landsat_8_BANDS = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7' ];
var Landsat_7_BANDS = ['B1',   'B2',    'B3',  'B4',  'B5',  'B7'];
var STD_NAMES       = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
// ---------------------------------------
/// Initial Landsat functions
function getlandsat8(start_date, end_date, location){
  var l8_l1t = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterDate(start_date, end_date)
  .filterBounds(location).select(Landsat_8_BANDS, STD_NAMES).median(); 
  return l8_l1t;
}
function getlandsat7(start_date, end_date, location){
  var l7_l1t = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
  .filterDate(start_date, end_date)
  .filterBounds(location); 
  return l7_l1t;
}
// make ndvi function
function addNDVI(image) {
  return image
    .addBands(image.normalizedDifference(['nir', 'red']).rename('NDVI'))
  ;
}
// Initialze dates
var start_date = ee.Date.fromYMD(2016, 1, 1); 
var end_date = ee.Date.fromYMD(2016, 3, 31);
var start_date = ee.Date.fromYMD(2015, 2, 22); 
var end_date = ee.Date.fromYMD(2015, 2, 27);
var bands =['blue', 'green', 'red', 'nir', 'swir1', 'swir2','NDVI' ];
//var bands =['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
// Get data
var l8_l1t = getlandsat8(start_date, end_date, location);
// Map.addLayer(l8_l1t, {bands: ['red', 'green', 'blue'], min:0, max:2000}, 'L8', 1);
//print(l8_l1t)
// add a new band as  NDVI
var newComposite = addNDVI(l8_l1t);
var ndviLayer = newComposite.select('NDVI');
// Map.addLayer(ndviLayer, {bands: ['NDVI']}, 'NDVI', 0);
var training_pts = builtupl8.merge(riverl8).merge(lakel8).merge(vegetationl8).merge(fallowlandl8).merge(redbldgsl8);
//print (training_pts);
var training = newComposite.select(bands).sampleRegions({
  collection: training_pts, 
  properties: ['class'], 
  scale: 30
});
// print(training)
var classifier = ee.Classifier.cart().train({
  features: training, 
  classProperty: 'class', 
  inputProperties: bands
});
// print(classifier.explain());
var classifiedL8 = newComposite.select(bands).classify(classifier);
Map.addLayer(classifiedL8, {min: 0, max: 5, palette: ['red', 'blue', 'blue', 'green', 'yellow', 'red']}, 'cartL8', 0);
// ------------------------------------------------------------------------------
//             make split map
//-------------------------------------------------------------------------------
/*
 * Set up the maps and control widgets
 */
var images = {
  'Landsat 7': classifiedL7.visualize({min: 0, max: 5, palette: ['red', 'blue', 'blue', 'green', 'yellow', 'black']}),
  'Landsat 8': classifiedL8.visualize({min: 0, max: 5, palette: ['red', 'blue', 'blue', 'green', 'yellow', 'red']})
  };
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
/*
 * Tie everything together
 */
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
leftMap.setCenter(96.16, 16.883, 12);