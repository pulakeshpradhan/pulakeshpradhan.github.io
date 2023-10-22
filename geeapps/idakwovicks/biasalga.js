var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Biase_LGA"
    }) || ee.FeatureCollection("users/idakwovicks/Biase_LGA"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.038297673691277,
            5.734407902872627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.037696858871941,
            5.735005710748777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.037525197494988,
            5.73398089686333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.10168591709064,
            5.620485949480051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.100226795386538,
            5.621340129381364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.102115070533022,
            5.6204432404520865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.101771747779116,
            5.623817244006555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.102329647254214,
            5.619332804625398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.101342594336733,
            5.6185640401203205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.100398456763491,
            5.618435912604139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923783112265581,
            5.734997335380548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923010636069292,
            5.734613030383567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.931423097617141,
            5.585775738051207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.930307298666945,
            5.585989295836356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.928633600241652,
            5.584494389705636
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#ef3600",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ef3600 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.038297673691277, 5.734407902872627]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.037696858871941, 5.735005710748777]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.037525197494988, 5.73398089686333]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.10168591709064, 5.620485949480051]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.100226795386538, 5.621340129381364]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.102115070533022, 5.6204432404520865]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.101771747779116, 5.623817244006555]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.102329647254214, 5.619332804625398]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.101342594336733, 5.6185640401203205]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.100398456763491, 5.618435912604139]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923783112265581, 5.734997335380548]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923010636069292, 5.734613030383567]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([7.931423097617141, 5.585775738051207]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([7.930307298666945, 5.585989295836356]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([7.928633600241652, 5.584494389705636]),
            {
              "landcover": 1,
              "system:index": "14"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.086909283810622,
            5.421124847664257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.072489728146559,
            5.4204412729979445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.091715802365309,
            5.408136796768313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.148707379513747,
            5.412921900615168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.133257855587965,
            5.411896524406063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.119524945431715,
            5.418390544356248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.149394025021559,
            5.392072243049574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.159693707638747,
            5.38762878073673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.164156903439528,
            5.372247314245966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.124229312745856,
            5.309120340092063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.144142032472418,
            5.318008373214376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.153755069581793,
            5.336467723994304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.168174625245856,
            5.322794184058691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.179847598878668,
            5.309804039499208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.18877399048023,
            5.324845234449879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.18877399048023,
            5.343304379709233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.196327091066168,
            5.366548437859315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.151695133058356,
            5.367915707849502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.12285602173023,
            5.383639092189493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.109809757081793,
            5.3802209997084365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.116676212159918,
            5.350824612868638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.107749820558356,
            5.325528916392992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.09264361938648,
            5.304334423019283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.06243121704273,
            5.34945730462129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.038398624269293,
            5.367232073237584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.053504825441168,
            5.395260462812772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.1266325720232,
            5.462219500999205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.145172000734137,
            5.4700800165332115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.14208209594898,
            5.465637129128284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.06243121704273,
            5.455042418490469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.051101566163824,
            5.45213738448879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.042346835939215,
            5.464440961501276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.032047153322027,
            5.461877737113937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.107063175050543,
            5.4661497716655845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.130924106447027,
            5.477598673893212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.12388598999195,
            5.472472326857164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.119594455568121,
            5.494515306832847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.104316593019293,
            5.500154077788416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.088523746339606,
            5.50938104224705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.069469333497809,
            5.4972492630569745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.047153354493902,
            5.503229748517891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.056251407472418,
            5.5133110021191545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.040801883546637,
            5.490072601207065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.030845523683356,
            5.48152884350351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.103286624757574,
            5.507330618078098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.155986667482184,
            5.520829113708808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.145686984864996,
            5.528176267003406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.155300021974371,
            5.530739206008885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.163883090822027,
            5.5322769640840015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.163883090822027,
            5.526809361663128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.158733249513434,
            5.512798400132719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.166483121991751,
            5.505574421477279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.150003629804251,
            5.508308326876879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.189813999323876,
            5.515624980866384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.196852115778954,
            5.5253642964489815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.179685978083642,
            5.557656669138342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.168190320434285,
            5.551320036596532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.157032330932331,
            5.550124041448179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.134373029174519,
            5.539530835722407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.094547589721394,
            5.5337215777199145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.081501325072956,
            5.525691038881565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.060558637084675,
            5.5265453567025045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.046654065551472,
            5.5265453567025045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.031547864379597,
            5.544998320484232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.0344661077878,
            5.5530285968849125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.056610425414753,
            5.559862788489007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.051632245483113,
            5.581731667906556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.076523145141316,
            5.590957356938971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.08613618225069,
            5.591640735529915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.079613049926472,
            5.579510647003769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.068111737670613,
            5.603428890532805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.057468732299519,
            5.601549635375643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.063648541869831,
            5.620171078402412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.079956372680378,
            5.63093365933819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.066566785278035,
            5.636229459349287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.058327039184285,
            5.633837813710451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.121326764526081,
            5.651945742540296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.108452161254597,
            5.649895816728424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.107937177123738,
            5.642208530333343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.11188538879366,
            5.657070525308919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.109653790893269,
            5.66851570949306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.09214433044405,
            5.699092027643714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.086994489135456,
            5.697554709670651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.084247907104206,
            5.695334132000054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.079956372680378,
            5.693796803969187
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.071544965209675,
            5.691576211775363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.065536817016316,
            5.689184795204961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.082531293334675,
            5.702679086903883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.08665116638155,
            5.7122444685899065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.091286023559285,
            5.71856436529912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.099354108276081,
            5.7122444685899065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.102272351684285,
            5.701141778537571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.107250531615925,
            5.702166651239389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.111198743285847,
            5.708486659105858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.114288648071003,
            5.702508275066565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.067253430785847,
            5.729325109842037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.065880139770222,
            5.728983502018444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.057297070922566,
            5.7228183456017545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.055065473022175,
            5.721110284993157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.050773938598347,
            5.731870981598334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.058155377807331,
            5.736995051565315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.07240327209444,
            5.743485474094296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.069141705932331,
            5.748951035713263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.063648541869831,
            5.748780237706931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05592377990694,
            5.746047462635574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.048542340697956,
            5.743656273688921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.044250806274128,
            5.747413851811102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.038929303588581,
            5.747755448592558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.033436139526081,
            5.745193467735741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.047340711059285,
            5.766713748216636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.044079144897175,
            5.767396918371902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.042362531127644,
            5.771325130795459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.041847546996785,
            5.776278055486112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.04768403381319,
            5.781060148574169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05317719787569,
            5.772520668304956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.04596742004366,
            5.792844419703574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.038585980834675,
            5.7913073547942195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.030346234740925,
            5.780889360230909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.021763165893269,
            5.783963542522305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.019359906615925,
            5.78413432993757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.959797027509454,
            5.689156318565946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.959968688886407,
            5.7185358901185275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.96065533439422,
            5.71016628178419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.963573577802423,
            5.7048711603010505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.911388519208673,
            5.704187915257412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.906753662030939,
            5.712899228568744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.920486572187189,
            5.691206104908178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926494720380548,
            5.687277341334456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9395409850289855,
            5.680444645140483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926494720380548,
            5.676174168854963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9422875670602355,
            5.647929334944808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.931816223066095,
            5.646050223531644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923919799726251,
            5.638875378473396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.936451080243829,
            5.626746272050782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.948982360761407,
            5.624012917346629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.961685302655939,
            5.6238420822512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.965976837079767,
            5.6306754469291045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9683800963571105,
            5.630162947364163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.944519164960626,
            5.610004273080006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.937309387128595,
            5.6094917553197465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9326745299508605,
            5.612054339617415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.918426635663751,
            5.615300263559664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.915508392255548,
            5.606929159764963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.912933471601251,
            5.597191194081347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.921001556318048,
            5.5912116610743094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926151397626642,
            5.593090949462492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.932159545820001,
            5.59360348161172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.938854339521173,
            5.594457700862589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.947952392499689,
            5.597362036983245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.953102233808282,
            5.60231645941459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.958252075116876,
            5.604366552958115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.965976837079767,
            5.6108584683463745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.975418212812189,
            5.612737693528284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.979709747236017,
            5.611883501014571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.008548858564142,
            5.6135918847904875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.013870361249689,
            5.621962892891394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.004943969648126,
            5.605904118392186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.984344604413751,
            5.60744167977624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.024685027997736,
            5.617350311471579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.00133908073211,
            5.623158741367921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.967521789472345,
            5.587453066196872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.956878784101251,
            5.567634621956938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935937836264593,
            5.553185856307565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.91053195247553,
            5.538833799903768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.911561920737249,
            5.535074870340913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.914136841391546,
            5.533537119539942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9163684392919365,
            5.533024535051036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.915510132407171,
            5.5220892935294135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926324799155218,
            5.535245731294164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.931302979086858,
            5.524823122841775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9328479314794365,
            5.528923843151169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935937836264593,
            5.525506578198675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.939886047934515,
            5.530119881224212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9452075506200615,
            5.523627074069766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.948125794028265,
            5.5318285028494625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.949155762289983,
            5.530632468229853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.950872376059515,
            5.528411254665705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.952588989829046,
            5.527215213140272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.957910492514593,
            5.526019169198787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.964948608969671,
            5.527727802661325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.97919650325678,
            5.526531759755239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.98795123348139,
            5.527727802661325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.96972567193539,
            5.553542506310091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.965605798888515,
            5.550552525162432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9512720739129295,
            5.5438036548456235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.936595026183437,
            5.545512236907369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9347925817254295,
            5.543889084066177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.933934274840664,
            5.5403864758876935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.932389322448086,
            5.538250728999164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.916768137145351,
            5.542009638358422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.920716348815273,
            5.538677878994526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.91479403131039,
            5.539361318344776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.90955835931332,
            5.543291079262702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923892084288906,
            5.570200694751724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.924407068419765,
            5.577461808647436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.921317163634609,
            5.576607564615607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.915909830260586,
            5.574471949095918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.911360803771328,
            5.571738349894232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.908356729674648,
            5.568150481634841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.912133279967617,
            5.578230627212681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.915137354064297,
            5.581476738934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.931187692809414,
            5.573703125606779
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.934964243102383,
            5.572848876104727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.938054147887539,
            5.573019726104554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.93951326959164,
            5.572763451086169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.945693079161953,
            5.573959400215025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9424315129998435,
            5.580793348485872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.954276148009609,
            5.574642798623445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.956078592467617,
            5.57788893019696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962945047545742,
            5.576436715660019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.077872339415858,
            5.552004803614221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.071950021910975,
            5.55106509443629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.074954096007655,
            5.55234651567113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.045342508483241,
            5.539019598768464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.13349062554867,
            5.524240038128932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.123620096373866,
            5.522787691447972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.115208688903163,
            5.527401015654845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.122847620177577,
            5.5283407624761685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.191330158006677,
            5.3913784184059494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.18824025322152,
            5.393771041223445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.168670856248864,
            5.4047086253347185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.158371173631677,
            5.420089268685591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.173820697557458,
            5.426924984496612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.196823322069177,
            5.4135952669898035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.203689777147302,
            5.42487427788401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.198539935838708,
            5.434785961892335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.202659808885583,
            5.421114630992606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.211929523241052,
            5.418380327638327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.205406390916833,
            5.447431666681715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.187553607713708,
            5.470329967860506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.195106708299646,
            5.472722277184822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.211929523241052,
            5.464861796347727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.205406390916833,
            5.466912366518579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.22669240165902,
            5.465203558530521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.22669240165902,
            5.4542670720060595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.22669240165902,
            5.453925303588286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.230812274705896,
            5.449824067396089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.242485248338708,
            5.447089894373333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.23218556572152,
            5.4289756841362795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.146354877244958,
            5.446064576281816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.143951617967614,
            5.431368158232743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.117515765916833,
            5.435469520296994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.095543109666833,
            5.422481778026429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.065330707323083,
            5.417696749865605
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
            ee.Geometry.Point([8.086909283810622, 5.421124847664257]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.072489728146559, 5.4204412729979445]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.091715802365309, 5.408136796768313]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.148707379513747, 5.412921900615168]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.133257855587965, 5.411896524406063]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.119524945431715, 5.418390544356248]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.149394025021559, 5.392072243049574]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.159693707638747, 5.38762878073673]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.164156903439528, 5.372247314245966]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.124229312745856, 5.309120340092063]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.144142032472418, 5.318008373214376]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.153755069581793, 5.336467723994304]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.168174625245856, 5.322794184058691]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.179847598878668, 5.309804039499208]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.18877399048023, 5.324845234449879]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.18877399048023, 5.343304379709233]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([8.196327091066168, 5.366548437859315]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.151695133058356, 5.367915707849502]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.12285602173023, 5.383639092189493]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.109809757081793, 5.3802209997084365]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.116676212159918, 5.350824612868638]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.107749820558356, 5.325528916392992]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([8.09264361938648, 5.304334423019283]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([8.06243121704273, 5.34945730462129]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([8.038398624269293, 5.367232073237584]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([8.053504825441168, 5.395260462812772]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([8.1266325720232, 5.462219500999205]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([8.145172000734137, 5.4700800165332115]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([8.14208209594898, 5.465637129128284]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([8.06243121704273, 5.455042418490469]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([8.051101566163824, 5.45213738448879]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([8.042346835939215, 5.464440961501276]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([8.032047153322027, 5.461877737113937]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([8.107063175050543, 5.4661497716655845]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([8.130924106447027, 5.477598673893212]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([8.12388598999195, 5.472472326857164]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([8.119594455568121, 5.494515306832847]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([8.104316593019293, 5.500154077788416]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([8.088523746339606, 5.50938104224705]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([8.069469333497809, 5.4972492630569745]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([8.047153354493902, 5.503229748517891]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([8.056251407472418, 5.5133110021191545]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([8.040801883546637, 5.490072601207065]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([8.030845523683356, 5.48152884350351]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([8.103286624757574, 5.507330618078098]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([8.155986667482184, 5.520829113708808]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([8.145686984864996, 5.528176267003406]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([8.155300021974371, 5.530739206008885]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([8.163883090822027, 5.5322769640840015]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([8.163883090822027, 5.526809361663128]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([8.158733249513434, 5.512798400132719]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([8.166483121991751, 5.505574421477279]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([8.150003629804251, 5.508308326876879]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([8.189813999323876, 5.515624980866384]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([8.196852115778954, 5.5253642964489815]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([8.179685978083642, 5.557656669138342]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([8.168190320434285, 5.551320036596532]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([8.157032330932331, 5.550124041448179]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([8.134373029174519, 5.539530835722407]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([8.094547589721394, 5.5337215777199145]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([8.081501325072956, 5.525691038881565]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([8.060558637084675, 5.5265453567025045]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([8.046654065551472, 5.5265453567025045]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([8.031547864379597, 5.544998320484232]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([8.0344661077878, 5.5530285968849125]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([8.056610425414753, 5.559862788489007]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([8.051632245483113, 5.581731667906556]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([8.076523145141316, 5.590957356938971]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([8.08613618225069, 5.591640735529915]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([8.079613049926472, 5.579510647003769]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([8.068111737670613, 5.603428890532805]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([8.057468732299519, 5.601549635375643]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([8.063648541869831, 5.620171078402412]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([8.079956372680378, 5.63093365933819]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([8.066566785278035, 5.636229459349287]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([8.058327039184285, 5.633837813710451]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([8.121326764526081, 5.651945742540296]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([8.108452161254597, 5.649895816728424]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([8.107937177123738, 5.642208530333343]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([8.11188538879366, 5.657070525308919]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([8.109653790893269, 5.66851570949306]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([8.09214433044405, 5.699092027643714]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([8.086994489135456, 5.697554709670651]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([8.084247907104206, 5.695334132000054]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([8.079956372680378, 5.693796803969187]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([8.071544965209675, 5.691576211775363]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([8.065536817016316, 5.689184795204961]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([8.082531293334675, 5.702679086903883]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([8.08665116638155, 5.7122444685899065]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([8.091286023559285, 5.71856436529912]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([8.099354108276081, 5.7122444685899065]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([8.102272351684285, 5.701141778537571]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([8.107250531615925, 5.702166651239389]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([8.111198743285847, 5.708486659105858]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([8.114288648071003, 5.702508275066565]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([8.067253430785847, 5.729325109842037]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([8.065880139770222, 5.728983502018444]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([8.057297070922566, 5.7228183456017545]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([8.055065473022175, 5.721110284993157]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([8.050773938598347, 5.731870981598334]),
            {
              "landcover": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([8.058155377807331, 5.736995051565315]),
            {
              "landcover": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([8.07240327209444, 5.743485474094296]),
            {
              "landcover": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([8.069141705932331, 5.748951035713263]),
            {
              "landcover": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([8.063648541869831, 5.748780237706931]),
            {
              "landcover": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05592377990694, 5.746047462635574]),
            {
              "landcover": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([8.048542340697956, 5.743656273688921]),
            {
              "landcover": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([8.044250806274128, 5.747413851811102]),
            {
              "landcover": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([8.038929303588581, 5.747755448592558]),
            {
              "landcover": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([8.033436139526081, 5.745193467735741]),
            {
              "landcover": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([8.047340711059285, 5.766713748216636]),
            {
              "landcover": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([8.044079144897175, 5.767396918371902]),
            {
              "landcover": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([8.042362531127644, 5.771325130795459]),
            {
              "landcover": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([8.041847546996785, 5.776278055486112]),
            {
              "landcover": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([8.04768403381319, 5.781060148574169]),
            {
              "landcover": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05317719787569, 5.772520668304956]),
            {
              "landcover": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([8.04596742004366, 5.792844419703574]),
            {
              "landcover": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([8.038585980834675, 5.7913073547942195]),
            {
              "landcover": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([8.030346234740925, 5.780889360230909]),
            {
              "landcover": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([8.021763165893269, 5.783963542522305]),
            {
              "landcover": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([8.019359906615925, 5.78413432993757]),
            {
              "landcover": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([7.959797027509454, 5.689156318565946]),
            {
              "landcover": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([7.959968688886407, 5.7185358901185275]),
            {
              "landcover": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([7.96065533439422, 5.71016628178419]),
            {
              "landcover": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([7.963573577802423, 5.7048711603010505]),
            {
              "landcover": 2,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([7.911388519208673, 5.704187915257412]),
            {
              "landcover": 2,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([7.906753662030939, 5.712899228568744]),
            {
              "landcover": 2,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([7.920486572187189, 5.691206104908178]),
            {
              "landcover": 2,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926494720380548, 5.687277341334456]),
            {
              "landcover": 2,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9395409850289855, 5.680444645140483]),
            {
              "landcover": 2,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926494720380548, 5.676174168854963]),
            {
              "landcover": 2,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9422875670602355, 5.647929334944808]),
            {
              "landcover": 2,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([7.931816223066095, 5.646050223531644]),
            {
              "landcover": 2,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923919799726251, 5.638875378473396]),
            {
              "landcover": 2,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([7.936451080243829, 5.626746272050782]),
            {
              "landcover": 2,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([7.948982360761407, 5.624012917346629]),
            {
              "landcover": 2,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([7.961685302655939, 5.6238420822512]),
            {
              "landcover": 2,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([7.965976837079767, 5.6306754469291045]),
            {
              "landcover": 2,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9683800963571105, 5.630162947364163]),
            {
              "landcover": 2,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([7.944519164960626, 5.610004273080006]),
            {
              "landcover": 2,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([7.937309387128595, 5.6094917553197465]),
            {
              "landcover": 2,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9326745299508605, 5.612054339617415]),
            {
              "landcover": 2,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([7.918426635663751, 5.615300263559664]),
            {
              "landcover": 2,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([7.915508392255548, 5.606929159764963]),
            {
              "landcover": 2,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([7.912933471601251, 5.597191194081347]),
            {
              "landcover": 2,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([7.921001556318048, 5.5912116610743094]),
            {
              "landcover": 2,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926151397626642, 5.593090949462492]),
            {
              "landcover": 2,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([7.932159545820001, 5.59360348161172]),
            {
              "landcover": 2,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([7.938854339521173, 5.594457700862589]),
            {
              "landcover": 2,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([7.947952392499689, 5.597362036983245]),
            {
              "landcover": 2,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([7.953102233808282, 5.60231645941459]),
            {
              "landcover": 2,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([7.958252075116876, 5.604366552958115]),
            {
              "landcover": 2,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([7.965976837079767, 5.6108584683463745]),
            {
              "landcover": 2,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([7.975418212812189, 5.612737693528284]),
            {
              "landcover": 2,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([7.979709747236017, 5.611883501014571]),
            {
              "landcover": 2,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([8.008548858564142, 5.6135918847904875]),
            {
              "landcover": 2,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([8.013870361249689, 5.621962892891394]),
            {
              "landcover": 2,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([8.004943969648126, 5.605904118392186]),
            {
              "landcover": 2,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([7.984344604413751, 5.60744167977624]),
            {
              "landcover": 2,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([8.024685027997736, 5.617350311471579]),
            {
              "landcover": 2,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([8.00133908073211, 5.623158741367921]),
            {
              "landcover": 2,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([7.967521789472345, 5.587453066196872]),
            {
              "landcover": 2,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([7.956878784101251, 5.567634621956938]),
            {
              "landcover": 2,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935937836264593, 5.553185856307565]),
            {
              "landcover": 2,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([7.91053195247553, 5.538833799903768]),
            {
              "landcover": 2,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([7.911561920737249, 5.535074870340913]),
            {
              "landcover": 2,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([7.914136841391546, 5.533537119539942]),
            {
              "landcover": 2,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9163684392919365, 5.533024535051036]),
            {
              "landcover": 2,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([7.915510132407171, 5.5220892935294135]),
            {
              "landcover": 2,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926324799155218, 5.535245731294164]),
            {
              "landcover": 2,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([7.931302979086858, 5.524823122841775]),
            {
              "landcover": 2,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9328479314794365, 5.528923843151169]),
            {
              "landcover": 2,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935937836264593, 5.525506578198675]),
            {
              "landcover": 2,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([7.939886047934515, 5.530119881224212]),
            {
              "landcover": 2,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9452075506200615, 5.523627074069766]),
            {
              "landcover": 2,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([7.948125794028265, 5.5318285028494625]),
            {
              "landcover": 2,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([7.949155762289983, 5.530632468229853]),
            {
              "landcover": 2,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([7.950872376059515, 5.528411254665705]),
            {
              "landcover": 2,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([7.952588989829046, 5.527215213140272]),
            {
              "landcover": 2,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([7.957910492514593, 5.526019169198787]),
            {
              "landcover": 2,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([7.964948608969671, 5.527727802661325]),
            {
              "landcover": 2,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([7.97919650325678, 5.526531759755239]),
            {
              "landcover": 2,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([7.98795123348139, 5.527727802661325]),
            {
              "landcover": 2,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([7.96972567193539, 5.553542506310091]),
            {
              "landcover": 2,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([7.965605798888515, 5.550552525162432]),
            {
              "landcover": 2,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9512720739129295, 5.5438036548456235]),
            {
              "landcover": 2,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([7.936595026183437, 5.545512236907369]),
            {
              "landcover": 2,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9347925817254295, 5.543889084066177]),
            {
              "landcover": 2,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([7.933934274840664, 5.5403864758876935]),
            {
              "landcover": 2,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([7.932389322448086, 5.538250728999164]),
            {
              "landcover": 2,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([7.916768137145351, 5.542009638358422]),
            {
              "landcover": 2,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([7.920716348815273, 5.538677878994526]),
            {
              "landcover": 2,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([7.91479403131039, 5.539361318344776]),
            {
              "landcover": 2,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([7.90955835931332, 5.543291079262702]),
            {
              "landcover": 2,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923892084288906, 5.570200694751724]),
            {
              "landcover": 2,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([7.924407068419765, 5.577461808647436]),
            {
              "landcover": 2,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([7.921317163634609, 5.576607564615607]),
            {
              "landcover": 2,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([7.915909830260586, 5.574471949095918]),
            {
              "landcover": 2,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([7.911360803771328, 5.571738349894232]),
            {
              "landcover": 2,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([7.908356729674648, 5.568150481634841]),
            {
              "landcover": 2,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([7.912133279967617, 5.578230627212681]),
            {
              "landcover": 2,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([7.915137354064297, 5.581476738934]),
            {
              "landcover": 2,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([7.931187692809414, 5.573703125606779]),
            {
              "landcover": 2,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([7.934964243102383, 5.572848876104727]),
            {
              "landcover": 2,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([7.938054147887539, 5.573019726104554]),
            {
              "landcover": 2,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([7.93951326959164, 5.572763451086169]),
            {
              "landcover": 2,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([7.945693079161953, 5.573959400215025]),
            {
              "landcover": 2,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9424315129998435, 5.580793348485872]),
            {
              "landcover": 2,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([7.954276148009609, 5.574642798623445]),
            {
              "landcover": 2,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([7.956078592467617, 5.57788893019696]),
            {
              "landcover": 2,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962945047545742, 5.576436715660019]),
            {
              "landcover": 2,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([8.077872339415858, 5.552004803614221]),
            {
              "landcover": 2,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([8.071950021910975, 5.55106509443629]),
            {
              "landcover": 2,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([8.074954096007655, 5.55234651567113]),
            {
              "landcover": 2,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([8.045342508483241, 5.539019598768464]),
            {
              "landcover": 2,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([8.13349062554867, 5.524240038128932]),
            {
              "landcover": 2,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([8.123620096373866, 5.522787691447972]),
            {
              "landcover": 2,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([8.115208688903163, 5.527401015654845]),
            {
              "landcover": 2,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([8.122847620177577, 5.5283407624761685]),
            {
              "landcover": 2,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([8.191330158006677, 5.3913784184059494]),
            {
              "landcover": 2,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([8.18824025322152, 5.393771041223445]),
            {
              "landcover": 2,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([8.168670856248864, 5.4047086253347185]),
            {
              "landcover": 2,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([8.158371173631677, 5.420089268685591]),
            {
              "landcover": 2,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([8.173820697557458, 5.426924984496612]),
            {
              "landcover": 2,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([8.196823322069177, 5.4135952669898035]),
            {
              "landcover": 2,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([8.203689777147302, 5.42487427788401]),
            {
              "landcover": 2,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([8.198539935838708, 5.434785961892335]),
            {
              "landcover": 2,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([8.202659808885583, 5.421114630992606]),
            {
              "landcover": 2,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([8.211929523241052, 5.418380327638327]),
            {
              "landcover": 2,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([8.205406390916833, 5.447431666681715]),
            {
              "landcover": 2,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Point([8.187553607713708, 5.470329967860506]),
            {
              "landcover": 2,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Point([8.195106708299646, 5.472722277184822]),
            {
              "landcover": 2,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Point([8.211929523241052, 5.464861796347727]),
            {
              "landcover": 2,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Point([8.205406390916833, 5.466912366518579]),
            {
              "landcover": 2,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Point([8.22669240165902, 5.465203558530521]),
            {
              "landcover": 2,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Point([8.22669240165902, 5.4542670720060595]),
            {
              "landcover": 2,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Point([8.22669240165902, 5.453925303588286]),
            {
              "landcover": 2,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Point([8.230812274705896, 5.449824067396089]),
            {
              "landcover": 2,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Point([8.242485248338708, 5.447089894373333]),
            {
              "landcover": 2,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Point([8.23218556572152, 5.4289756841362795]),
            {
              "landcover": 2,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Point([8.146354877244958, 5.446064576281816]),
            {
              "landcover": 2,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Point([8.143951617967614, 5.431368158232743]),
            {
              "landcover": 2,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Point([8.117515765916833, 5.435469520296994]),
            {
              "landcover": 2,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Point([8.095543109666833, 5.422481778026429]),
            {
              "landcover": 2,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Point([8.065330707323083, 5.417696749865605]),
            {
              "landcover": 2,
              "system:index": "243"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.178750781168214,
            5.57139290881848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.177377490152589,
            5.580447912740007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.164331225504151,
            5.577885189957476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.011199994887374,
            5.586427555669877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.037511018609761,
            5.613623419851061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.037253526544331,
            5.611146261876883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.036566881036519,
            5.608412833970153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.035193590020894,
            5.61473386656054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978595643134883,
            5.694108585931362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.980226426215937,
            5.691631772352872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.979883103462031,
            5.688984132244479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.981342225166133,
            5.688386276339448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.985462098213008,
            5.688642500374837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9874362040479685,
            5.683859632899372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.990783600898554,
            5.69258714852482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.985462098213008,
            5.704885683438346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.984088807197383,
            5.707020818899067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.979110627265742,
            5.709753780685458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9791964579542185,
            5.71180349347202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978252320380976,
            5.715988300968741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.983831315131953,
            5.7179525878159385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.97765150556164,
            5.7325564219249845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.974304108711054,
            5.730762988720838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9723300028760935,
            5.73546006373525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.982222286442426,
            5.741242944216318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9537392459754575,
            5.705717018807611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.953029652243084,
            5.752252020784032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9683075147919125,
            5.7546431736136165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.940498371725506,
            5.764122287620651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.971998234396405,
            5.73480884867517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.969852467184491,
            5.73839568401303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.977233906393475,
            5.713458172203382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.985130329733319,
            5.6791246165173455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.989765186911053,
            5.668448342051811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.001023753835076,
            5.5431390080967065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.999435886098261,
            5.545317451811372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.998405917836542,
            5.547453173136983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.004113658620232,
            5.548307459502415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.002997859670037,
            5.550699454742479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.003083690358514,
            5.552493444804029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.003212436391228,
            5.5534331517046835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978106960011835,
            5.536560913600005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.980209811879511,
            5.538696666596397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9841580235494325,
            5.536945349708951
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.947934126574396,
            5.711813309663251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.952139830309748,
            5.689266066585447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9577188250607245,
            5.704212254733414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.94887529801414,
            5.68599165667451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.947587837686991,
            5.687785229991491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9506777424721475,
            5.68565002302788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9485319752602335,
            5.689493389856409
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.95136438797996,
            5.686247881776379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.981405128946757,
            5.691713990095599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978229393473124,
            5.693592952829166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.97857271622703,
            5.693251323698136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.979001869669413,
            5.693251323698136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9781435627846475,
            5.692824286998762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.96784388016746,
            5.688126862370288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.968015541544413,
            5.691457767428775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9687421087359045,
            5.671412449319124
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#efe30f",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #efe30f */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.178750781168214, 5.57139290881848]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.177377490152589, 5.580447912740007]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.164331225504151, 5.577885189957476]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.011199994887374, 5.586427555669877]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.037511018609761, 5.613623419851061]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.037253526544331, 5.611146261876883]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.036566881036519, 5.608412833970153]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.035193590020894, 5.61473386656054]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978595643134883, 5.694108585931362]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([7.980226426215937, 5.691631772352872]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([7.979883103462031, 5.688984132244479]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([7.981342225166133, 5.688386276339448]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([7.985462098213008, 5.688642500374837]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9874362040479685, 5.683859632899372]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([7.990783600898554, 5.69258714852482]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([7.985462098213008, 5.704885683438346]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([7.984088807197383, 5.707020818899067]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([7.979110627265742, 5.709753780685458]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9791964579542185, 5.71180349347202]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978252320380976, 5.715988300968741]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([7.983831315131953, 5.7179525878159385]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([7.97765150556164, 5.7325564219249845]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([7.974304108711054, 5.730762988720838]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9723300028760935, 5.73546006373525]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([7.982222286442426, 5.741242944216318]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9537392459754575, 5.705717018807611]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([7.953029652243084, 5.752252020784032]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9683075147919125, 5.7546431736136165]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([7.940498371725506, 5.764122287620651]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([7.971998234396405, 5.73480884867517]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([7.969852467184491, 5.73839568401303]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([7.977233906393475, 5.713458172203382]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([7.985130329733319, 5.6791246165173455]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([7.989765186911053, 5.668448342051811]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([8.001023753835076, 5.5431390080967065]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([7.999435886098261, 5.545317451811372]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([7.998405917836542, 5.547453173136983]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([8.004113658620232, 5.548307459502415]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([8.002997859670037, 5.550699454742479]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([8.003083690358514, 5.552493444804029]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([8.003212436391228, 5.5534331517046835]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978106960011835, 5.536560913600005]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([7.980209811879511, 5.538696666596397]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9841580235494325, 5.536945349708951]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([7.947934126574396, 5.711813309663251]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([7.952139830309748, 5.689266066585447]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9577188250607245, 5.704212254733414]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([7.94887529801414, 5.68599165667451]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([7.947587837686991, 5.687785229991491]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9506777424721475, 5.68565002302788]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9485319752602335, 5.689493389856409]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([7.95136438797996, 5.686247881776379]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([7.981405128946757, 5.691713990095599]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978229393473124, 5.693592952829166]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([7.97857271622703, 5.693251323698136]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([7.979001869669413, 5.693251323698136]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9781435627846475, 5.692824286998762]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([7.96784388016746, 5.688126862370288]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([7.968015541544413, 5.691457767428775]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9687421087359045, 5.671412449319124]),
            {
              "landcover": 3,
              "system:index": "59"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            7.973340010363459,
            5.754684783001313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.968962645251154,
            5.764078499603072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.953255629259943,
            5.772618107070873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9522256609982245,
            5.772703502496074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.969134306628107,
            5.762028974685895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962525343615412,
            5.762114371705177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962439512926935,
            5.758613083385553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.974455809313654,
            5.750158664124613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.975743269640803,
            5.745034712512827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.979519819933771,
            5.738031904094142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9804639575070135,
            5.726929714532696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.967417692858576,
            5.726246495816151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.966387724596857,
            5.732224631875648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.968275999743342,
            5.730089590467224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.963726973254084,
            5.729662581227449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.98054978819549,
            5.715741905267734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9763440844601385,
            5.714460844445223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9865579363888495,
            5.699344110452831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.97505662413299,
            5.6895222902289175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.971880888659357,
            5.686447598974538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.956431364733576,
            5.680383576409969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.977889036852717,
            5.673209157417885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.989647841174006,
            5.675856870061321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9996900317257635,
            5.66629088315312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.01050469847381,
            5.657835102058115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.01247880430877,
            5.64989167992078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.031018233019708,
            5.621362793549218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.007157301623224,
            5.537305517977252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.01900193663299,
            5.532777701808474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.023550963122247,
            5.528249850979437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.022938899783716,
            5.508021109688082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.019934825687036,
            5.4928135941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.016415767459497,
            5.464880217073544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.030749492435083,
            5.435829720825355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.03804510095559,
            5.428395985972774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.04207914331399,
            5.4252344847444105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.078471355228052,
            5.393362210751893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.088170223025903,
            5.379519038948745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.096425941793077,
            5.361060986742196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.099515846578234,
            5.340482961066716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.087824633551186,
            5.320302407722096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.058985522223061,
            5.327566543163735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05126076026017,
            5.329959416039481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.0460250882631,
            5.3250027404555285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.038729479742592,
            5.315174731060011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.035124590826577,
            5.312269028664217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.028773119879311,
            5.312098104567097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.04902916235978,
            5.309876086990721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.039673617315835,
            5.307824986734595
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#273dff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #273dff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([7.973340010363459, 5.754684783001313]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([7.968962645251154, 5.764078499603072]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([7.953255629259943, 5.772618107070873]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9522256609982245, 5.772703502496074]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([7.969134306628107, 5.762028974685895]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962525343615412, 5.762114371705177]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962439512926935, 5.758613083385553]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([7.974455809313654, 5.750158664124613]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([7.975743269640803, 5.745034712512827]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([7.979519819933771, 5.738031904094142]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9804639575070135, 5.726929714532696]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([7.967417692858576, 5.726246495816151]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([7.966387724596857, 5.732224631875648]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([7.968275999743342, 5.730089590467224]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([7.963726973254084, 5.729662581227449]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([7.98054978819549, 5.715741905267734]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9763440844601385, 5.714460844445223]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9865579363888495, 5.699344110452831]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([7.97505662413299, 5.6895222902289175]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([7.971880888659357, 5.686447598974538]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([7.956431364733576, 5.680383576409969]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([7.977889036852717, 5.673209157417885]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([7.989647841174006, 5.675856870061321]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9996900317257635, 5.66629088315312]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([8.01050469847381, 5.657835102058115]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([8.01247880430877, 5.64989167992078]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([8.031018233019708, 5.621362793549218]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([8.007157301623224, 5.537305517977252]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([8.01900193663299, 5.532777701808474]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([8.023550963122247, 5.528249850979437]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([8.022938899783716, 5.508021109688082]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([8.019934825687036, 5.4928135941]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([8.016415767459497, 5.464880217073544]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([8.030749492435083, 5.435829720825355]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([8.03804510095559, 5.428395985972774]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([8.04207914331399, 5.4252344847444105]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([8.078471355228052, 5.393362210751893]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([8.088170223025903, 5.379519038948745]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([8.096425941793077, 5.361060986742196]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([8.099515846578234, 5.340482961066716]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([8.087824633551186, 5.320302407722096]),
            {
              "landcover": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([8.058985522223061, 5.327566543163735]),
            {
              "landcover": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05126076026017, 5.329959416039481]),
            {
              "landcover": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([8.0460250882631, 5.3250027404555285]),
            {
              "landcover": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([8.038729479742592, 5.315174731060011]),
            {
              "landcover": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([8.035124590826577, 5.312269028664217]),
            {
              "landcover": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([8.028773119879311, 5.312098104567097]),
            {
              "landcover": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([8.04902916235978, 5.309876086990721]),
            {
              "landcover": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([8.039673617315835, 5.307824986734595]),
            {
              "landcover": 4,
              "system:index": "48"
            })]);
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(table)
    .filterDate('2019-12-01', '2019-12-30')
    .sort('CLOUD_COVER')
    .median());
//Map.addLayer(image, {bands: ['B6', 'B5', 'B4'],min:0, max: 3000}, 'False colour image');
//Merge feature
// Clip to the output image to the table boundary.
var clipped = image.clipToCollection(table);
Map.addLayer(clipped, {bands: ['B6', 'B5', 'B4'],min:0, max: 3000}, 'true colour image');
//Merge feature
var classNames = urban.merge(vegetation).merge(baresurface).merge(waterbody);
print(classNames)
var bands = ['B6', 'B5', 'B4'];
var training = clipped.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);
// Train a CART classifier with default parameters.
var classifier = ee.Classifier.smileCart().train(training, 'landcover', bands);
//Run the classification
var classified = clipped.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 4, palette: ['red','green','yellow','blue']},
'classification');
print(classified,{min: 1, max: 4, palette: ['red','green','yellow','blue']});
Export.image.toDrive({
      image: classified,
      description:"2018classification",
      folder: "BIU",
      fileNamePrefix:"final2018",
       scale:30,
       region:table,
      fileFormat:"GeoTIFF"
    });
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