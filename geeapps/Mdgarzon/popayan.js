var popayan = ee.Image("users/murillop/UNICAUCA/UNICAUCA-URBANO_POPAYAN-NBR-7-19842018"),
    vis = {"opacity":1,"bands":["nir","swir1","red"],"min":457,"max":3657,"gamma":1},
    ceibas = ee.Image("users/murillop/UNICAUCA/UNICAUCA-ceibas-NBR-7-19972018"),
    palace = ee.Image("users/murillop/UNICAUCA/palace"),
    POLIG = 
    /* color: #d69ebb */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-76.65380677338482, 2.5003141312956427],
          [-76.65380677338482, 2.4209510792260107],
          [-76.53330048676372, 2.4209510792260107],
          [-76.53330048676372, 2.5003141312956427]]], null, false),
    URBANA = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-76.60975371103603, 2.442197128006142]),
            {
              "cobertura": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60943721037228, 2.4406053420115725]),
            {
              "cobertura": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55905766683986, 2.4777402147228784]),
            {
              "cobertura": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5604532335451, 2.478907017439378]),
            {
              "cobertura": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56638125558482, 2.4859615763525316]),
            {
              "cobertura": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5679246643943, 2.485752971794305]),
            {
              "cobertura": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56756376833118, 2.4881752069410554]),
            {
              "cobertura": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56549185009226, 2.4851099202509506]),
            {
              "cobertura": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56836986036524, 2.4830639780531567]),
            {
              "cobertura": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56939155125451, 2.483392090580265]),
            {
              "cobertura": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56680590176416, 2.484721216125015]),
            {
              "cobertura": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56866199040246, 2.486286152551317]),
            {
              "cobertura": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57211916287821, 2.484164124447497]),
            {
              "cobertura": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57234578964426, 2.4842673711808967]),
            {
              "cobertura": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5721904772463, 2.4846031807253315]),
            {
              "cobertura": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56639447623849, 2.484005790534698]),
            {
              "cobertura": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56532179095365, 2.4846061075871018]),
            {
              "cobertura": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56488459088422, 2.483724490110783]),
            {
              "cobertura": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57402555920697, 2.481970431510219]),
            {
              "cobertura": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5770031887937, 2.4803364249267785]),
            {
              "cobertura": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57792526220874, 2.480198820338872]),
            {
              "cobertura": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5796660227864, 2.4798050725246523]),
            {
              "cobertura": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59691933871716, 2.4531910845136453]),
            {
              "cobertura": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60014415162595, 2.4528952772262524]),
            {
              "cobertura": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61709168928655, 2.438791001305113]),
            {
              "cobertura": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62149716603142, 2.4380404868845638]),
            {
              "cobertura": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62686645365267, 2.449823762534906]),
            {
              "cobertura": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61661378386145, 2.441522808294171]),
            {
              "cobertura": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60935010240962, 2.4382438035235157]),
            {
              "cobertura": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61571900771548, 2.442787364014359]),
            {
              "cobertura": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60605769084384, 2.437899451660279]),
            {
              "cobertura": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6233391635268, 2.44308213886205]),
            {
              "cobertura": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60339425729205, 2.4420289884270643]),
            {
              "cobertura": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61605062923286, 2.445617880313528]),
            {
              "cobertura": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61882707389395, 2.4461561300590553]),
            {
              "cobertura": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6176962122604, 2.447753480868885]),
            {
              "cobertura": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61566099573264, 2.4473721945077918]),
            {
              "cobertura": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60507431675086, 2.43680048989844]),
            {
              "cobertura": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62930807520041, 2.4466352596231724]),
            {
              "cobertura": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61157867361197, 2.446361923672099]),
            {
              "cobertura": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6138156359304, 2.4446227553845685]),
            {
              "cobertura": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61152002720121, 2.4437277125830406]),
            {
              "cobertura": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60261375216726, 2.451575395364874]),
            {
              "cobertura": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62598383931402, 2.443613822363404]),
            {
              "cobertura": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61307168511632, 2.440964867118499]),
            {
              "cobertura": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62050140408758, 2.4456008703383505]),
            {
              "cobertura": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60953241054972, 2.433410847288062]),
            {
              "cobertura": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60898956971937, 2.4349996741369457]),
            {
              "cobertura": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62974728104962, 2.444485800180371]),
            {
              "cobertura": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61921156403912, 2.442818983296086]),
            {
              "cobertura": 1,
              "system:index": "49"
            })]),
    BOSQUES = /* color: #31a323 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-76.5583220373328, 2.4440144840201015]),
            {
              "cobertura": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55837697999078, 2.4470694174165826]),
            {
              "cobertura": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5591417588904, 2.4505653777541183]),
            {
              "cobertura": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55645418545748, 2.448003528479075]),
            {
              "cobertura": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56213825529852, 2.448917170572784]),
            {
              "cobertura": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55563658064642, 2.452915365614582]),
            {
              "cobertura": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55562808653053, 2.4505414352071053]),
            {
              "cobertura": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55615860167694, 2.4513608786110264]),
            {
              "cobertura": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55809935693765, 2.452722193204728]),
            {
              "cobertura": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55837204846148, 2.45406206842048]),
            {
              "cobertura": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55674338448682, 2.4470535211090265]),
            {
              "cobertura": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55453877838568, 2.4434480782043653]),
            {
              "cobertura": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55433937704015, 2.4448361985115863]),
            {
              "cobertura": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5553689542433, 2.448300003669402]),
            {
              "cobertura": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55595877290551, 2.4494492448859395]),
            {
              "cobertura": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56025460123186, 2.4461711030019195]),
            {
              "cobertura": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55540149904436, 2.4475398922681815]),
            {
              "cobertura": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55540149904436, 2.4470200183112403]),
            {
              "cobertura": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55647962384461, 2.4524617951065197]),
            {
              "cobertura": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56297818548012, 2.462202644106906]),
            {
              "cobertura": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5656419751898, 2.4591828320466504]),
            {
              "cobertura": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56478366830504, 2.459193551001865]),
            {
              "cobertura": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56613818385756, 2.460552177877578]),
            {
              "cobertura": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56648418882048, 2.4602306095113016]),
            {
              "cobertura": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5605132502622, 2.463889040754364]),
            {
              "cobertura": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55894617055145, 2.464659809001105]),
            {
              "cobertura": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5613494298288, 2.46381301474696]),
            {
              "cobertura": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56240622018066, 2.464102425501995]),
            {
              "cobertura": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56075397942749, 2.463298506582694]),
            {
              "cobertura": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55977100950093, 2.4646168936074933]),
            {
              "cobertura": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56187940140757, 2.4624584179546285]),
            {
              "cobertura": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5619035412887, 2.461642363901094]),
            {
              "cobertura": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56240418318873, 2.4611288851296225]),
            {
              "cobertura": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57263008826146, 2.4619111670811265]),
            {
              "cobertura": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5742930578507, 2.464076389852569]),
            {
              "cobertura": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57162879005944, 2.4643622873539894]),
            {
              "cobertura": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57134611866422, 2.4624379986076765]),
            {
              "cobertura": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.53677136965666, 2.4418657787980327]),
            {
              "cobertura": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.53430689552056, 2.442991283186165]),
            {
              "cobertura": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.53676754340165, 2.4527679973419]),
            {
              "cobertura": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.53648629701831, 2.4510728907618966]),
            {
              "cobertura": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.53489342826282, 2.451379814456235]),
            {
              "cobertura": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55679788261932, 2.4583610235852706]),
            {
              "cobertura": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55858959824127, 2.4583663830661857]),
            {
              "cobertura": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55839307976368, 2.4573167551798325]),
            {
              "cobertura": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.54866748936513, 2.428244957241013]),
            {
              "cobertura": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.54828661568502, 2.4296893689741315]),
            {
              "cobertura": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55126923210958, 2.4255731934355373]),
            {
              "cobertura": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55232065804341, 2.4253588089495217]),
            {
              "cobertura": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.55103319771627, 2.4250586706120307]),
            {
              "cobertura": 2,
              "system:index": "49"
            })]),
    PASTOS = /* color: #fcff3d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-76.59688631844972, 2.4691740822061203]),
            {
              "cobertura": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59671465707277, 2.470696161558034]),
            {
              "cobertura": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.595856350188, 2.4687024516305147]),
            {
              "cobertura": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59587780786012, 2.468177226474314]),
            {
              "cobertura": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60399704674296, 2.46839160411416]),
            {
              "cobertura": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6051021168571, 2.4686274194780418]),
            {
              "cobertura": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60643249252848, 2.4670410244060155]),
            {
              "cobertura": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60484404712446, 2.4664471427393844]),
            {
              "cobertura": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60774833477927, 2.4650670121529603]),
            {
              "cobertura": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60933620251609, 2.4637485858257158]),
            {
              "cobertura": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60769160844575, 2.4634698939146014]),
            {
              "cobertura": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60392198100175, 2.4628910720666934]),
            {
              "cobertura": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60368501611765, 2.462125776135917]),
            {
              "cobertura": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60393223899769, 2.4613432938997324]),
            {
              "cobertura": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61696849630937, 2.4632195379232114]),
            {
              "cobertura": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61797569210046, 2.463185715574803]),
            {
              "cobertura": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61824746524337, 2.464053948060218]),
            {
              "cobertura": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61684198771957, 2.464032510227891]),
            {
              "cobertura": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6211871663237, 2.4643219209352174]),
            {
              "cobertura": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62150366698745, 2.4629713370962065]),
            {
              "cobertura": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62333829795364, 2.464032510227891]),
            {
              "cobertura": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62389619742873, 2.4648257097941793]),
            {
              "cobertura": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6252587596083, 2.464814990884282]),
            {
              "cobertura": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62521584426406, 2.4642897641930688]),
            {
              "cobertura": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62150497853975, 2.467828859261348]),
            {
              "cobertura": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62581518478561, 2.467011440433085]),
            {
              "cobertura": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62048430856032, 2.469515308153348]),
            {
              "cobertura": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62904358995854, 2.4748794450050857]),
            {
              "cobertura": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.63176531391088, 2.474590043004095]),
            {
              "cobertura": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.63043048444297, 2.4808792493866956]),
            {
              "cobertura": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62798430982139, 2.4808899681668137]),
            {
              "cobertura": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62774291101005, 2.4815598917519424]),
            {
              "cobertura": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61843975074089, 2.45507390192724]),
            {
              "cobertura": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61989350802696, 2.454816646184692]),
            {
              "cobertura": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61205757144955, 2.454874245342592]),
            {
              "cobertura": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.618330908124, 2.453973756441813]),
            {
              "cobertura": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60960762871628, 2.456155111638792]),
            {
              "cobertura": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.58939951448082, 2.471633632355674]),
            {
              "cobertura": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59283199187257, 2.4724717712985163]),
            {
              "cobertura": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59637250777223, 2.4726968670915173]),
            {
              "cobertura": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59567585351351, 2.472421183308182]),
            {
              "cobertura": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59613451125506, 2.473572119177815]),
            {
              "cobertura": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59751650827349, 2.4741169345221556]),
            {
              "cobertura": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5885904095095, 2.4729872586188177]),
            {
              "cobertura": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59477355559136, 2.471402291589801]),
            {
              "cobertura": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59402253706719, 2.4714130104465966]),
            {
              "cobertura": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.5940064438131, 2.4708341920561296]),
            {
              "cobertura": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.59048202116753, 2.4692370807443575]),
            {
              "cobertura": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.58938220566438, 2.4703411999662044]),
            {
              "cobertura": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6215461537409, 2.476792819471095]),
            {
              "cobertura": 3,
              "system:index": "49"
            })]),
    AGUA = /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-76.6117986892034, 2.483519282291741]),
            {
              "cobertura": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61258189423575, 2.483572876084424]),
            {
              "cobertura": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61125151856436, 2.4838569231493466]),
            {
              "cobertura": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61069361908926, 2.484114173268636]),
            {
              "cobertura": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61040930493368, 2.4844035795929416]),
            {
              "cobertura": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61902799562046, 2.4858168215046477]),
            {
              "cobertura": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61914869502613, 2.485669438820007]),
            {
              "cobertura": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6193230386121, 2.4854925795767135]),
            {
              "cobertura": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61910577968189, 2.485497938948065]),
            {
              "cobertura": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62401267946944, 2.4868704157247685]),
            {
              "cobertura": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62385577024207, 2.4867565291971965]),
            {
              "cobertura": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62396708191619, 2.4865341154796887]),
            {
              "cobertura": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64480860519609, 2.4946993841343192]),
            {
              "cobertura": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64500440645418, 2.4951254511117043]),
            {
              "cobertura": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64255152631006, 2.4957163173518193]),
            {
              "cobertura": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64231683302125, 2.4962777070255338]),
            {
              "cobertura": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64175220105693, 2.4968601401854014]),
            {
              "cobertura": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64153225991771, 2.497133465737448]),
            {
              "cobertura": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.64176292989299, 2.497346498848882]),
            {
              "cobertura": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.63501026913991, 2.494108126093034]),
            {
              "cobertura": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62400229164092, 2.496212941352007]),
            {
              "cobertura": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61068292956713, 2.4759890777195923]),
            {
              "cobertura": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61124082904223, 2.4757211071984324]),
            {
              "cobertura": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61092164616946, 2.4759408430297842]),
            {
              "cobertura": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61019653785809, 2.4767810228942104]),
            {
              "cobertura": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61229633278691, 2.4789633023378106]),
            {
              "cobertura": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61208175606572, 2.4787221294128603]),
            {
              "cobertura": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61177598423802, 2.4787140903146008]),
            {
              "cobertura": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60474434437452, 2.483013929961675]),
            {
              "cobertura": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60613909306227, 2.4833247740478774]),
            {
              "cobertura": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.60689895930932, 2.483477516373771]),
            {
              "cobertura": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.6091170002997, 2.4912039378917825]),
            {
              "cobertura": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61019369893671, 2.4917190010893666]),
            {
              "cobertura": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61045119100214, 2.491806090459913]),
            {
              "cobertura": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.63393019945408, 2.484707789247428]),
            {
              "cobertura": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61401288620755, 2.4819955418058095]),
            {
              "cobertura": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61395924202725, 2.4821603429014165]),
            {
              "cobertura": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.61425428501889, 2.4817235529608093]),
            {
              "cobertura": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.605074254707, 2.4820196976323974]),
            {
              "cobertura": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.57702888884461, 2.4651797061685383]),
            {
              "cobertura": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56192188831028, 2.4676085022253154]),
            {
              "cobertura": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.56183069320377, 2.467956866021538]),
            {
              "cobertura": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62062405177932, 2.4578226881644674]),
            {
              "cobertura": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.62015466520171, 2.458063864881733]),
            {
              "cobertura": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-76.63470888666745, 2.4645526774487037]),
            {
              "cobertura": 4,
              "system:index": "44"
            })]);
var image = popayan.clip(POLIG)
//Palace solo tiene imagenes desde 2005 por eso si lo corren ven unos errores
//en otros años!
var new_bands =      ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'tcw_ftv', 'tcg_ftv','tcb_ftv','nbr_ftv','ndvi_ftv','rmse']
var DEF_BANDS_1988 = ['b1_ftv_1988', 'b2_ftv_1988','b3_ftv_1988','b4_ftv_1988','b5_ftv_1988','b7_ftv_1988','tcw_ftv_1988', 'tcg_ftv_1988','tcb_ftv_1988','nbr_ftv_1988','ndvi_ftv_1988','rmse__']
var DEF_BANDS_1998 = ['b1_ftv_1998', 'b2_ftv_1998','b3_ftv_1998','b4_ftv_1998','b5_ftv_1998','b7_ftv_1998','tcw_ftv_1998', 'tcg_ftv_1998','tcb_ftv_1998','nbr_ftv_1998','ndvi_ftv_1998','rmse__']
var DEF_BANDS_2008 = ['b1_ftv_2008', 'b2_ftv_2008','b3_ftv_2008','b4_ftv_2008','b5_ftv_2008','b7_ftv_2008','tcw_ftv_2008', 'tcg_ftv_2008','tcb_ftv_2008','nbr_ftv_2008','ndvi_ftv_2008','rmse__']
var DEF_BANDS_2018 = ['b1_ftv_2018', 'b2_ftv_2018','b3_ftv_2018','b4_ftv_2018','b5_ftv_2018','b7_ftv_2018','tcw_ftv_2018', 'tcg_ftv_2018','tcb_ftv_2018','nbr_ftv_2018','ndvi_ftv_2018','rmse__']
var y1988 = image.select(DEF_BANDS_1988).rename(new_bands);
var y1998 = image.select(DEF_BANDS_1998).rename(new_bands)
var y2008 = image.select(DEF_BANDS_2008).rename(new_bands)
var y2018 = image.select(DEF_BANDS_2018).rename(new_bands)
Map.addLayer(y2018, vis, '2018')
Map.addLayer(y2008, vis, '2008')
Map.addLayer(y1998, vis, '1998')
Map.addLayer(y1998, vis, '1988')
var NDVI = image.select('ndvi_ftv_2000', 'ndvi_ftv_2001', 'ndvi_ftv_2002', 'ndvi_ftv_2004')
Map.addLayer(NDVI)
var coberturas = URBANA.merge(BOSQUES).merge(PASTOS).merge(AGUA);
var training = y2018.sampleRegions({
  collection: coberturas, 
  properties: ['cobertura'], 
  scale: 30
});
print ('training', training)
var classifier = ee.Classifier.randomForest().train({
  features: training, 
  classProperty: 'cobertura', 
  inputProperties: new_bands
});
var classified = y2018.classify(classifier);
var palette = [
  '#525252', // URBAN (1)  // grey
  '238b45', // BOSQUE(2) // green
  '#fed976', // PASTOS (3)  // yellow
  '#0c2c84', // AGUA(4) //blue
  ];
Map.addLayer(classified, {min: 1, max: 4, palette: palette}, 'Mapa clasificado 2018');
var areaha = ee.Image.pixelArea().divide(10000)
var class_areas = areaha.addBands(classified)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification', //nombre de la banda despues de aplicar el RF
    }),
    geometry:POLIG,
    scale: 30,  // sample the geometry at 30m intervals
    maxPixels: 1e10
  }).get('groups');
  print('Area para cada clase 2018:', class_areas);
  //
var classified88 = y1988.classify(classifier);
  Map.addLayer(classified88, {min: 1, max: 4, palette: palette}, 'Mapa clasificado 1988');
var areaha = ee.Image.pixelArea().divide(10000)
var class_areas88 = areaha.addBands(classified88)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification', //nombre de la banda despues de aplicar el RF
    }),
    geometry:POLIG,
    scale: 30,  // sample the geometry at 30m intervals
    maxPixels: 1e10
  }).get('groups');
  print('Area para cada clase 1988:', class_areas88);
var classified98 = y1998.classify(classifier);
  Map.addLayer(classified98, {min: 1, max: 4, palette: palette}, 'Mapa clasificado 1998');
var areaha = ee.Image.pixelArea().divide(10000)
var class_areas98 = areaha.addBands(classified98)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification', //nombre de la banda despues de aplicar el RF
    }),
    geometry:POLIG,
    scale: 30,  // sample the geometry at 30m intervals
    maxPixels: 1e10
  }).get('groups');
  print('Area para cada clase 1998:', class_areas98);
var classified08 = y2008.classify(classifier);
  Map.addLayer(classified08, {min: 1, max: 4, palette: palette}, 'Mapa clasificado 2008');
var areaha = ee.Image.pixelArea().divide(10000)
var class_areas08 = areaha.addBands(classified08)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'classification', //nombre de la banda despues de aplicar el RF
    }),
    geometry:POLIG,
    scale: 30,  // sample the geometry at 30m intervals
    maxPixels: 1e10
  }).get('groups');
  print('Area para cada clase 2008:', class_areas08);
 print('RF error matrix: ', classifier.confusionMatrix());
 print('RF accuracy: ', classifier.confusionMatrix().accuracy());