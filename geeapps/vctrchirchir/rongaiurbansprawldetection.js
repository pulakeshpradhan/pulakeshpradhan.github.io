var point = ui.import && ui.import("point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74734446320541,
            -1.3931374162103138
          ]
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
    ee.Geometry.Point([36.74734446320541, -1.3931374162103138]),
    L7 = ui.import && ui.import("L7", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA"),
    KajiadoNorth = ui.import && ui.import("KajiadoNorth", "table", {
      "id": "users/vctrchirchir/Kajiado_North"
    }) || ee.FeatureCollection("users/vctrchirchir/Kajiado_North"),
    ForestedAreas = ui.import && ui.import("ForestedAreas", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69835569566401,
            -1.3543565886822788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69947149461421,
            -1.3534985214257522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70247556871089,
            -1.3537988450000835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70513632005366,
            -1.3556865923294126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71208860582026,
            -1.3611782125471628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70985700791987,
            -1.3600627282010171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715049764572704,
            -1.3636665988437884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71062948411616,
            -1.3628943413026868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70586588090571,
            -1.36418143706686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70796873277339,
            -1.3642672434266725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69101717179927,
            -1.366197885712819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69384958451899,
            -1.3690723946857284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69749738877925,
            -1.367055948453225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697325727402294,
            -1.360792083408806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707024595200146,
            -1.3671417547103948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69938566392573,
            -1.3555149789966274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69814111894282,
            -1.3586469204038183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69964315599116,
            -1.3616072448506105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71311857408198,
            -1.3628085348939445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64538336888618,
            -1.4035247891702756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64830161229438,
            -1.4025809346621745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65130568639106,
            -1.40198029977698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.643495093739695,
            -1.3972610203221654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64632750645942,
            -1.395802332025513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63920355931587,
            -1.3982048769726625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64066268101997,
            -1.4052408872997169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.649245749867625,
            -1.4061847407335664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.684766082199395,
            -1.3407064397023196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68596771183807,
            -1.344310339083616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690774230392755,
            -1.3542639382674264
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 1
      },
      "color": "#065402",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #065402 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.69835569566401, -1.3543565886822788]),
            {
              "LC": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69947149461421, -1.3534985214257522]),
            {
              "LC": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70247556871089, -1.3537988450000835]),
            {
              "LC": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70513632005366, -1.3556865923294126]),
            {
              "LC": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71208860582026, -1.3611782125471628]),
            {
              "LC": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70985700791987, -1.3600627282010171]),
            {
              "LC": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715049764572704, -1.3636665988437884]),
            {
              "LC": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71062948411616, -1.3628943413026868]),
            {
              "LC": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70586588090571, -1.36418143706686]),
            {
              "LC": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70796873277339, -1.3642672434266725]),
            {
              "LC": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69101717179927, -1.366197885712819]),
            {
              "LC": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69384958451899, -1.3690723946857284]),
            {
              "LC": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69749738877925, -1.367055948453225]),
            {
              "LC": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697325727402294, -1.360792083408806]),
            {
              "LC": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707024595200146, -1.3671417547103948]),
            {
              "LC": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69938566392573, -1.3555149789966274]),
            {
              "LC": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69814111894282, -1.3586469204038183]),
            {
              "LC": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69964315599116, -1.3616072448506105]),
            {
              "LC": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71311857408198, -1.3628085348939445]),
            {
              "LC": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64538336888618, -1.4035247891702756]),
            {
              "LC": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64830161229438, -1.4025809346621745]),
            {
              "LC": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65130568639106, -1.40198029977698]),
            {
              "LC": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.643495093739695, -1.3972610203221654]),
            {
              "LC": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64632750645942, -1.395802332025513]),
            {
              "LC": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63920355931587, -1.3982048769726625]),
            {
              "LC": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64066268101997, -1.4052408872997169]),
            {
              "LC": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.649245749867625, -1.4061847407335664]),
            {
              "LC": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.684766082199395, -1.3407064397023196]),
            {
              "LC": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68596771183807, -1.344310339083616]),
            {
              "LC": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690774230392755, -1.3542639382674264]),
            {
              "LC": 1,
              "system:index": "29"
            })]),
    Vegetation = ui.import && ui.import("Vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.66313740000239,
            -1.3629470802070278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66742893442622,
            -1.3582277232944986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66871639475337,
            -1.358785465955952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.669274294228465,
            -1.3678380403384962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.677673451396636,
            -1.3751463178159553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714666478130034,
            -1.382268202575356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71676932999771,
            -1.3827830367916285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71749889084976,
            -1.3860007481117016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70614097498562,
            -1.4047323355329957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70476768397,
            -1.4064913351902553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69515464686062,
            -1.4041746036577576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69472549341824,
            -1.4020294798209316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65878567043753,
            -1.3878716133403215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66505131069632,
            -1.3846539045611046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69526371304007,
            -1.383195208475032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708394696428975,
            -1.4004618707548877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70783679695388,
            -1.3990889895491938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7594219414364,
            -1.3912513137933342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.763820764220824,
            -1.3917017920286205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76392805258142,
            -1.3907579327702848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7644644943844,
            -1.3921737215161392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73879923064801,
            -1.4027633413509941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73970045287702,
            -1.4033639760351906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74485029418561,
            -1.4017336815336814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74414219100568,
            -1.3994383965617545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.758003847194644,
            -1.4044579888135906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79658474166486,
            -1.388541125174645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78109230239484,
            -1.386825014855562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.780448572231265,
            -1.3872540425520528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764226572109195,
            -1.3987948583158007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75512851913068,
            -1.4013261077308865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75937713821027,
            -1.4014977177617598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741009370876284,
            -1.3909865802262324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72920765121076,
            -1.386653403755183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75383680428755,
            -1.3928563497736366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.753750973599075,
            -1.3934140843391662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73323743905318,
            -1.4032816739976384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72212236489546,
            -1.4161094782730064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72268026437056,
            -1.416281087214934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73164957131636,
            -1.4161952827455542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.732765370266556,
            -1.4091164030981997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75984495248091,
            -1.4107037901063406
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 2
      },
      "color": "#a2ff60",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #a2ff60 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.66313740000239, -1.3629470802070278]),
            {
              "LC": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66742893442622, -1.3582277232944986]),
            {
              "LC": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66871639475337, -1.358785465955952]),
            {
              "LC": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.669274294228465, -1.3678380403384962]),
            {
              "LC": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.677673451396636, -1.3751463178159553]),
            {
              "LC": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714666478130034, -1.382268202575356]),
            {
              "LC": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71676932999771, -1.3827830367916285]),
            {
              "LC": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71749889084976, -1.3860007481117016]),
            {
              "LC": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70614097498562, -1.4047323355329957]),
            {
              "LC": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70476768397, -1.4064913351902553]),
            {
              "LC": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69515464686062, -1.4041746036577576]),
            {
              "LC": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69472549341824, -1.4020294798209316]),
            {
              "LC": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65878567043753, -1.3878716133403215]),
            {
              "LC": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66505131069632, -1.3846539045611046]),
            {
              "LC": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69526371304007, -1.383195208475032]),
            {
              "LC": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708394696428975, -1.4004618707548877]),
            {
              "LC": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70783679695388, -1.3990889895491938]),
            {
              "LC": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7594219414364, -1.3912513137933342]),
            {
              "LC": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.763820764220824, -1.3917017920286205]),
            {
              "LC": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76392805258142, -1.3907579327702848]),
            {
              "LC": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7644644943844, -1.3921737215161392]),
            {
              "LC": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73879923064801, -1.4027633413509941]),
            {
              "LC": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73970045287702, -1.4033639760351906]),
            {
              "LC": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74485029418561, -1.4017336815336814]),
            {
              "LC": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74414219100568, -1.3994383965617545]),
            {
              "LC": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.758003847194644, -1.4044579888135906]),
            {
              "LC": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79658474166486, -1.388541125174645]),
            {
              "LC": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78109230239484, -1.386825014855562]),
            {
              "LC": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.780448572231265, -1.3872540425520528]),
            {
              "LC": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764226572109195, -1.3987948583158007]),
            {
              "LC": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75512851913068, -1.4013261077308865]),
            {
              "LC": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75937713821027, -1.4014977177617598]),
            {
              "LC": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741009370876284, -1.3909865802262324]),
            {
              "LC": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72920765121076, -1.386653403755183]),
            {
              "LC": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75383680428755, -1.3928563497736366]),
            {
              "LC": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.753750973599075, -1.3934140843391662]),
            {
              "LC": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73323743905318, -1.4032816739976384]),
            {
              "LC": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72212236489546, -1.4161094782730064]),
            {
              "LC": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72268026437056, -1.416281087214934]),
            {
              "LC": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73164957131636, -1.4161952827455542]),
            {
              "LC": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.732765370266556, -1.4091164030981997]),
            {
              "LC": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75984495248091, -1.4107037901063406]),
            {
              "LC": 2,
              "system:index": "41"
            })]),
    NonBuilt_Up = ui.import && ui.import("NonBuilt_Up", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.784505960143676,
            -1.403135329783859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77738201300012,
            -1.4007327898875448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78381931463586,
            -1.3954128713567095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81180011907922,
            -1.3897497190546524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.817722436584106,
            -1.3865749156080491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77858364263879,
            -1.403735964372537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.775322076476684,
            -1.4021914751186513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69592868963586,
            -1.4094848876200499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69919025579797,
            -1.3990166884531507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69807445684778,
            -1.3920664648227277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715583917296996,
            -1.3994457139294871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71790134588586,
            -1.3979870269898629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.688589240277715,
            -1.3992741037483771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69073500748963,
            -1.4015050351230804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73742187893221,
            -1.385287831916104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734074482081624,
            -1.3834001079033322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72986877834627,
            -1.3803969075156228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71047104275057,
            -1.3872613599576469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71373260891268,
            -1.3851162207043288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71004188930819,
            -1.3817697995926053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6595851034068,
            -1.367579079162923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66044341029156,
            -1.3652194064032925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683617696180235,
            -1.3640610207462047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68576346339215,
            -1.359513279074997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66147337855328,
            -1.3281078873048113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663619145765196,
            -1.3305963073458755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666365727796446,
            -1.3305104998000088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6919043125873,
            -1.3589340129370213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67963052413515,
            -1.3376109920980768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73757739560607,
            -1.3915531439736455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78718753354552,
            -1.3963582400937276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.793539004492786,
            -1.390523479244615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71781694932504,
            -1.4243232957476761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728717446761564,
            -1.4221781905204411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722194314437345,
            -1.4107661972650007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71292460008188,
            -1.4070765934639262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67189753099008,
            -1.4140267724984563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67112505479379,
            -1.422263994767831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.669236779647306,
            -1.425352945547654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707946420150236,
            -1.422092386269858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682283044295744,
            -1.4080204461552053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711465478377775,
            -1.4303295797510271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.699706674056486,
            -1.4355636144225934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.702968240218595,
            -1.4368506702948758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66322863145395,
            -1.4502360082569523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65018236680551,
            -1.4558990120665702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68108141465707,
            -1.4207195178268268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718482938621314,
            -1.4000167306233848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73453327736643,
            -1.3885188235904444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71787800033185,
            -1.3930877739711838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7231995030174,
            -1.4029553650013147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78431095321271,
            -1.3978070618119631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.786714212490054,
            -1.3995231641313528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682344095302554,
            -1.3841640038790732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687064783168765,
            -1.3821046675422357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71083988387677,
            -1.3901703913031214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73410000045392,
            -1.384593032057558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71964792085427,
            -1.4005437859224397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69853357148904,
            -1.4056062782344716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63819459749001,
            -1.3888742705250967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63802293611306,
            -1.3840691591730203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64119867158669,
            -1.387072354911204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6964736349656,
            -1.399342514953401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711837328202904,
            -1.3923064869395618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73269418550271,
            -1.3890458814642983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74419549775857,
            -1.3872439659812026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7536651429106,
            -1.411518934365389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75521009530318,
            -1.411776348282583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76018827523482,
            -1.4035390888241401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.739245587246536,
            -1.411776348282583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73958891000044,
            -1.4133208311869618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74739950265181,
            -1.40611323552982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74619787301314,
            -1.409974450264053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7756377991606,
            -1.4072286982209936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77254789437544,
            -1.4035390888241401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73495405282271,
            -1.4134924403351676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72319524850142,
            -1.411776348282583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71469801034224,
            -1.404740357639727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71572797860396,
            -1.400535914086561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75941579903853,
            -1.4040539183921208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76336401070845,
            -1.402938454184904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.737786465542435,
            -1.3965030733864305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73409574593794,
            -1.3912689506724671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75186269845259,
            -1.4042255282229246
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 3
      },
      "color": "#fffaab",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fffaab */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.784505960143676, -1.403135329783859]),
            {
              "LC": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77738201300012, -1.4007327898875448]),
            {
              "LC": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78381931463586, -1.3954128713567095]),
            {
              "LC": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81180011907922, -1.3897497190546524]),
            {
              "LC": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.817722436584106, -1.3865749156080491]),
            {
              "LC": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77858364263879, -1.403735964372537]),
            {
              "LC": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.775322076476684, -1.4021914751186513]),
            {
              "LC": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69592868963586, -1.4094848876200499]),
            {
              "LC": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69919025579797, -1.3990166884531507]),
            {
              "LC": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69807445684778, -1.3920664648227277]),
            {
              "LC": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715583917296996, -1.3994457139294871]),
            {
              "LC": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71790134588586, -1.3979870269898629]),
            {
              "LC": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.688589240277715, -1.3992741037483771]),
            {
              "LC": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69073500748963, -1.4015050351230804]),
            {
              "LC": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73742187893221, -1.385287831916104]),
            {
              "LC": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734074482081624, -1.3834001079033322]),
            {
              "LC": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72986877834627, -1.3803969075156228]),
            {
              "LC": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71047104275057, -1.3872613599576469]),
            {
              "LC": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71373260891268, -1.3851162207043288]),
            {
              "LC": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71004188930819, -1.3817697995926053]),
            {
              "LC": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6595851034068, -1.367579079162923]),
            {
              "LC": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66044341029156, -1.3652194064032925]),
            {
              "LC": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683617696180235, -1.3640610207462047]),
            {
              "LC": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68576346339215, -1.359513279074997]),
            {
              "LC": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66147337855328, -1.3281078873048113]),
            {
              "LC": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663619145765196, -1.3305963073458755]),
            {
              "LC": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666365727796446, -1.3305104998000088]),
            {
              "LC": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6919043125873, -1.3589340129370213]),
            {
              "LC": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67963052413515, -1.3376109920980768]),
            {
              "LC": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73757739560607, -1.3915531439736455]),
            {
              "LC": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78718753354552, -1.3963582400937276]),
            {
              "LC": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.793539004492786, -1.390523479244615]),
            {
              "LC": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71781694932504, -1.4243232957476761]),
            {
              "LC": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728717446761564, -1.4221781905204411]),
            {
              "LC": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722194314437345, -1.4107661972650007]),
            {
              "LC": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71292460008188, -1.4070765934639262]),
            {
              "LC": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67189753099008, -1.4140267724984563]),
            {
              "LC": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67112505479379, -1.422263994767831]),
            {
              "LC": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.669236779647306, -1.425352945547654]),
            {
              "LC": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707946420150236, -1.422092386269858]),
            {
              "LC": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682283044295744, -1.4080204461552053]),
            {
              "LC": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711465478377775, -1.4303295797510271]),
            {
              "LC": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.699706674056486, -1.4355636144225934]),
            {
              "LC": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.702968240218595, -1.4368506702948758]),
            {
              "LC": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66322863145395, -1.4502360082569523]),
            {
              "LC": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65018236680551, -1.4558990120665702]),
            {
              "LC": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68108141465707, -1.4207195178268268]),
            {
              "LC": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718482938621314, -1.4000167306233848]),
            {
              "LC": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73453327736643, -1.3885188235904444]),
            {
              "LC": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71787800033185, -1.3930877739711838]),
            {
              "LC": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7231995030174, -1.4029553650013147]),
            {
              "LC": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78431095321271, -1.3978070618119631]),
            {
              "LC": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.786714212490054, -1.3995231641313528]),
            {
              "LC": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682344095302554, -1.3841640038790732]),
            {
              "LC": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687064783168765, -1.3821046675422357]),
            {
              "LC": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71083988387677, -1.3901703913031214]),
            {
              "LC": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73410000045392, -1.384593032057558]),
            {
              "LC": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71964792085427, -1.4005437859224397]),
            {
              "LC": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69853357148904, -1.4056062782344716]),
            {
              "LC": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63819459749001, -1.3888742705250967]),
            {
              "LC": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63802293611306, -1.3840691591730203]),
            {
              "LC": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64119867158669, -1.387072354911204]),
            {
              "LC": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6964736349656, -1.399342514953401]),
            {
              "LC": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711837328202904, -1.3923064869395618]),
            {
              "LC": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73269418550271, -1.3890458814642983]),
            {
              "LC": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74419549775857, -1.3872439659812026]),
            {
              "LC": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7536651429106, -1.411518934365389]),
            {
              "LC": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75521009530318, -1.411776348282583]),
            {
              "LC": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76018827523482, -1.4035390888241401]),
            {
              "LC": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.739245587246536, -1.411776348282583]),
            {
              "LC": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73958891000044, -1.4133208311869618]),
            {
              "LC": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74739950265181, -1.40611323552982]),
            {
              "LC": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74619787301314, -1.409974450264053]),
            {
              "LC": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7756377991606, -1.4072286982209936]),
            {
              "LC": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77254789437544, -1.4035390888241401]),
            {
              "LC": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73495405282271, -1.4134924403351676]),
            {
              "LC": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72319524850142, -1.411776348282583]),
            {
              "LC": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71469801034224, -1.404740357639727]),
            {
              "LC": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71572797860396, -1.400535914086561]),
            {
              "LC": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75941579903853, -1.4040539183921208]),
            {
              "LC": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76336401070845, -1.402938454184904]),
            {
              "LC": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.737786465542435, -1.3965030733864305]),
            {
              "LC": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73409574593794, -1.3912689506724671]),
            {
              "LC": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75186269845259, -1.4042255282229246]),
            {
              "LC": 3,
              "system:index": "83"
            })]),
    Water = ui.import && ui.import("Water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69786288739034,
            -1.4198747090554045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69842078686544,
            -1.4216336972443726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6994936704714,
            -1.4213333822825507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74107007438159,
            -1.4046001738629583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74124173575854,
            -1.4045894482506267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37293886222659,
            -0.7419413732480996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.403494587324246,
            -0.7385084322254182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.41860078849612,
            -0.7494938341045333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38323854484378,
            -0.7560164034593035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36126588859378,
            -0.7831364542297953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.360579243085965,
            -0.8061368663463933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38735841789065,
            -0.7889723917878583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37499879875003,
            -0.7663151771948074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.367789020917996,
            -0.757732867453904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.405554523847684,
            -0.7467474862021364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.408987751386746,
            -0.7683749289813079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.41894411125003,
            -0.7542999387861382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.840062291928795,
            -0.8217125721075922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84615627081063,
            -0.8223991469425624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.843066366025475,
            -0.8164774351179468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83714404852059,
            -0.816563257090886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.831307561704186,
            -0.8148468172841749
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.843323858090905,
            -0.8236006526195272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84495464117196,
            -0.8181938742284599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83971896917489,
            -0.815104283301844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83319583685067,
            -0.8168207229987116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83396831304696,
            -0.8227424343157743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83139339239266,
            -0.8211976409039179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.837830694028405,
            -0.8223991469425624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83577075750497,
            -0.8224849687886358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69795561188362,
            -1.4201771749503296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69821310394905,
            -1.420563294373071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69722605103157,
            -1.4195121913488538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69840622299812,
            -1.4196838000385252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69896412247322,
            -1.421571494783731
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 4
      },
      "color": "#193bc2",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #193bc2 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.69786288739034, -1.4198747090554045]),
            {
              "LC": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69842078686544, -1.4216336972443726]),
            {
              "LC": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6994936704714, -1.4213333822825507]),
            {
              "LC": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74107007438159, -1.4046001738629583]),
            {
              "LC": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74124173575854, -1.4045894482506267]),
            {
              "LC": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37293886222659, -0.7419413732480996]),
            {
              "LC": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.403494587324246, -0.7385084322254182]),
            {
              "LC": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.41860078849612, -0.7494938341045333]),
            {
              "LC": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38323854484378, -0.7560164034593035]),
            {
              "LC": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36126588859378, -0.7831364542297953]),
            {
              "LC": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.360579243085965, -0.8061368663463933]),
            {
              "LC": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38735841789065, -0.7889723917878583]),
            {
              "LC": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37499879875003, -0.7663151771948074]),
            {
              "LC": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.367789020917996, -0.757732867453904]),
            {
              "LC": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.405554523847684, -0.7467474862021364]),
            {
              "LC": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.408987751386746, -0.7683749289813079]),
            {
              "LC": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.41894411125003, -0.7542999387861382]),
            {
              "LC": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.840062291928795, -0.8217125721075922]),
            {
              "LC": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84615627081063, -0.8223991469425624]),
            {
              "LC": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.843066366025475, -0.8164774351179468]),
            {
              "LC": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83714404852059, -0.816563257090886]),
            {
              "LC": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.831307561704186, -0.8148468172841749]),
            {
              "LC": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.843323858090905, -0.8236006526195272]),
            {
              "LC": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84495464117196, -0.8181938742284599]),
            {
              "LC": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83971896917489, -0.815104283301844]),
            {
              "LC": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83319583685067, -0.8168207229987116]),
            {
              "LC": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83396831304696, -0.8227424343157743]),
            {
              "LC": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83139339239266, -0.8211976409039179]),
            {
              "LC": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.837830694028405, -0.8223991469425624]),
            {
              "LC": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83577075750497, -0.8224849687886358]),
            {
              "LC": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69795561188362, -1.4201771749503296]),
            {
              "LC": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69821310394905, -1.420563294373071]),
            {
              "LC": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69722605103157, -1.4195121913488538]),
            {
              "LC": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69840622299812, -1.4196838000385252]),
            {
              "LC": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69896412247322, -1.421571494783731]),
            {
              "LC": 4,
              "system:index": "34"
            })]),
    BuiltUp = ui.import && ui.import("BuiltUp", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74930030301456,
            -1.3927418980185853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76440650418643,
            -1.3964315244079084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75839835599307,
            -1.3971179658882895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75599509671573,
            -1.396517329603918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75376349881534,
            -1.3966889399865476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74955779507999,
            -1.396259914006488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68279161560493,
            -1.3911954469739547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.782971416652394,
            -1.3150634101871064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79198363894243,
            -1.3103439612455712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79533103579302,
            -1.3130898235317066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79653266543169,
            -1.314805985929204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78580382937212,
            -1.3077697126184693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82700255984087,
            -1.3023637819133775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.86991790407915,
            -1.3028786329570743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.831379924953175,
            -1.2959281350062397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.851893459499074,
            -1.3031360584394647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83180907839556,
            -1.3013340795104988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83198073977251,
            -1.3038654304966875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83725932711382,
            -1.2971723613526354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80747607821245,
            -1.3006476110083414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.840392147243215,
            -1.296099752469675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82650393972408,
            -1.2818820082581914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83096713552486,
            -1.2827401001936722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.851995654201616,
            -1.2765618318470793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85165233144771,
            -1.2789644935276718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82418651113521,
            -1.2803374420497675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.827791400051225,
            -1.2770766881106388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76502382798715,
            -1.3964367731315535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749402642684416,
            -1.3930045627321155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75601160569711,
            -1.3966941887096076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76330721421762,
            -1.3960935523169318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.654383118871024,
            -1.3619215824721334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.655584748509696,
            -1.3627367435319402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65644305539446,
            -1.3609348081887487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686312134984306,
            -1.3559151240676846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71980326341025,
            -1.3725570373695202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72151987717978,
            -1.3750883148494515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70469873513472,
            -1.3598210687881298
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC": 0
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
            ee.Geometry.Point([36.74930030301456, -1.3927418980185853]),
            {
              "LC": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76440650418643, -1.3964315244079084]),
            {
              "LC": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75839835599307, -1.3971179658882895]),
            {
              "LC": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75599509671573, -1.396517329603918]),
            {
              "LC": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75376349881534, -1.3966889399865476]),
            {
              "LC": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74955779507999, -1.396259914006488]),
            {
              "LC": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68279161560493, -1.3911954469739547]),
            {
              "LC": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.782971416652394, -1.3150634101871064]),
            {
              "LC": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79198363894243, -1.3103439612455712]),
            {
              "LC": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79533103579302, -1.3130898235317066]),
            {
              "LC": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79653266543169, -1.314805985929204]),
            {
              "LC": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78580382937212, -1.3077697126184693]),
            {
              "LC": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82700255984087, -1.3023637819133775]),
            {
              "LC": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.86991790407915, -1.3028786329570743]),
            {
              "LC": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.831379924953175, -1.2959281350062397]),
            {
              "LC": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.851893459499074, -1.3031360584394647]),
            {
              "LC": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83180907839556, -1.3013340795104988]),
            {
              "LC": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83198073977251, -1.3038654304966875]),
            {
              "LC": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83725932711382, -1.2971723613526354]),
            {
              "LC": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80747607821245, -1.3006476110083414]),
            {
              "LC": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.840392147243215, -1.296099752469675]),
            {
              "LC": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82650393972408, -1.2818820082581914]),
            {
              "LC": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83096713552486, -1.2827401001936722]),
            {
              "LC": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.851995654201616, -1.2765618318470793]),
            {
              "LC": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85165233144771, -1.2789644935276718]),
            {
              "LC": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82418651113521, -1.2803374420497675]),
            {
              "LC": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.827791400051225, -1.2770766881106388]),
            {
              "LC": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76502382798715, -1.3964367731315535]),
            {
              "LC": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749402642684416, -1.3930045627321155]),
            {
              "LC": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75601160569711, -1.3966941887096076]),
            {
              "LC": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76330721421762, -1.3960935523169318]),
            {
              "LC": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.654383118871024, -1.3619215824721334]),
            {
              "LC": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.655584748509696, -1.3627367435319402]),
            {
              "LC": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65644305539446, -1.3609348081887487]),
            {
              "LC": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686312134984306, -1.3559151240676846]),
            {
              "LC": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71980326341025, -1.3725570373695202]),
            {
              "LC": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72151987717978, -1.3750883148494515]),
            {
              "LC": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70469873513472, -1.3598210687881298]),
            {
              "LC": 0,
              "system:index": "37"
            })]),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.68556162354015,
            -1.3964756951222559
          ]
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
    ee.Geometry.Point([36.68556162354015, -1.3964756951222559]),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    point2 = ui.import && ui.import("point2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74734446320541,
            -1.3931374162103138
          ]
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
    ee.Geometry.Point([36.74734446320541, -1.3931374162103138]),
    L72 = ui.import && ui.import("L72", "imageCollection", {
      "id": "LANDSAT/LE07/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA"),
    KajiadoNorth2 = ui.import && ui.import("KajiadoNorth2", "table", {
      "id": "users/vctrchirchir/Kajiado_North"
    }) || ee.FeatureCollection("users/vctrchirchir/Kajiado_North"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.68556162354015,
            -1.3964756951222559
          ]
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
    ee.Geometry.Point([36.68556162354015, -1.3964756951222559]),
    BuiltUp10 = ui.import && ui.import("BuiltUp10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.73823921481147,
            -1.3955929441282324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74879638949409,
            -1.3926755645617581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75008384982124,
            -1.393705228350922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74819557467475,
            -1.3932762018267966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76330177584663,
            -1.3953355284295974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.763645098600534,
            -1.3973090480655321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75222961703315,
            -1.3937910336463684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76424591341987,
            -1.3949923074542556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74931137362495,
            -1.3942200600767056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.740427330903344,
            -1.3958928515653923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744890526704125,
            -1.3954638254400575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.752615288667016,
            -1.3966650983937114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75484688656741,
            -1.3964934880093516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.757850960664086,
            -1.3988960322495272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731672600678735,
            -1.3982095912889125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73064999493258,
            -1.3911866636127448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74262337597506,
            -1.391508433798396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7420011034836,
            -1.39127246899988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74738697918551,
            -1.39189455796323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74631409557955,
            -1.3920447173436066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74732260616915,
            -1.3906718312244137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72889046581881,
            -1.3956270882944122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731980370603964,
            -1.3953267699809473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73043092570002,
            -1.3954400879236344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.735022867533516,
            -1.3950539643400148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73536619028742,
            -1.3952470261397443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7343362220257,
            -1.3953971853063618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73036655268366,
            -1.4000306634451254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73249086222346,
            -1.398464720467513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73324188074763,
            -1.398336012779036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73339208445246,
            -1.399623089346119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73639615854914,
            -1.400717103872743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.738820875498604,
            -1.4008887139482329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74332698664362,
            -1.402047081628915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74545129618342,
            -1.40159660537673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.752054717301974,
            -1.3984686982268515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73604171330786,
            -1.4050935512398324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72045945393149,
            -1.3979420510461538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72801255451743,
            -1.3792130131024942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72818421589438,
            -1.3800710711707418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72887086140219,
            -1.3823878264081044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718099109998384,
            -1.3704608031677932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722562305799165,
            -1.3712759613293388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722304813733736,
            -1.373292404009506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71947240101401,
            -1.3717049918291704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72221898304526,
            -1.374450785205497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72118901478354,
            -1.3791701101909568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.719858639112154,
            -1.377368187208342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723077289930025,
            -1.3773252842635615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7242789195687,
            -1.376467225205958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6888820517941,
            -1.3745222711055285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67253372425627,
            -1.3667486600325827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69010707631289,
            -1.3556065938810542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68285438313662,
            -1.3589530515477326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65590354695498,
            -1.3626856334745852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6543585945624,
            -1.3619133756189394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65667602315127,
            -1.3594678907775133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65762016072451,
            -1.3610982142806303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657534330036036,
            -1.3541907834751772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.647932171596146,
            -1.371165012352465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.651923298610306,
            -1.3718943641902273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658231854213334,
            -1.3693845348741334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67149269558296,
            -1.372838230944329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673423886073685,
            -1.3618550311761262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66329381584591,
            -1.3463013859143804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66629788994259,
            -1.3438987888760046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666469551319544,
            -1.3406381176871354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.676683403248255,
            -1.3350177400551497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.678185440296595,
            -1.3376348640657063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.679429985279505,
            -1.337463249461946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67432305931515,
            -1.3349319326633362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67179105400509,
            -1.335875813808468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67749879478878,
            -1.3349748363596181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.671222838534696,
            -1.351984033803139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67317548669754,
            -1.3526919397536796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71436948209643,
            -1.406793548585257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.681667175654056,
            -1.3909578881884392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6826113132273,
            -1.3912153043654298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64965957641601,
            -1.3707402907879405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65365070343017,
            -1.3794924996978921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65953010559082,
            -1.376660906210856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.677554550170896,
            -1.3804363634450465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67364925384521,
            -1.381380226817506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67347759246826,
            -1.383782786436707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67849868774414,
            -1.3838685920924083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783233585357664,
            -1.4061994078919497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783705654144285,
            -1.4045691153677915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78434938430786,
            -1.4020807719542538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.772933902740476,
            -1.4013943319262157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78885549545288,
            -1.4008795017731528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78855508804321,
            -1.4011798193761964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68519348144531,
            -1.3540509411879873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68922752380371,
            -1.3559386883208597
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC10": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.73823921481147, -1.3955929441282324]),
            {
              "LC10": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74879638949409, -1.3926755645617581]),
            {
              "LC10": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75008384982124, -1.393705228350922]),
            {
              "LC10": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74819557467475, -1.3932762018267966]),
            {
              "LC10": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76330177584663, -1.3953355284295974]),
            {
              "LC10": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.763645098600534, -1.3973090480655321]),
            {
              "LC10": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75222961703315, -1.3937910336463684]),
            {
              "LC10": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76424591341987, -1.3949923074542556]),
            {
              "LC10": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74931137362495, -1.3942200600767056]),
            {
              "LC10": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.740427330903344, -1.3958928515653923]),
            {
              "LC10": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744890526704125, -1.3954638254400575]),
            {
              "LC10": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.752615288667016, -1.3966650983937114]),
            {
              "LC10": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75484688656741, -1.3964934880093516]),
            {
              "LC10": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.757850960664086, -1.3988960322495272]),
            {
              "LC10": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731672600678735, -1.3982095912889125]),
            {
              "LC10": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73064999493258, -1.3911866636127448]),
            {
              "LC10": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74262337597506, -1.391508433798396]),
            {
              "LC10": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7420011034836, -1.39127246899988]),
            {
              "LC10": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74738697918551, -1.39189455796323]),
            {
              "LC10": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74631409557955, -1.3920447173436066]),
            {
              "LC10": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74732260616915, -1.3906718312244137]),
            {
              "LC10": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72889046581881, -1.3956270882944122]),
            {
              "LC10": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731980370603964, -1.3953267699809473]),
            {
              "LC10": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73043092570002, -1.3954400879236344]),
            {
              "LC10": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.735022867533516, -1.3950539643400148]),
            {
              "LC10": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73536619028742, -1.3952470261397443]),
            {
              "LC10": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7343362220257, -1.3953971853063618]),
            {
              "LC10": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73036655268366, -1.4000306634451254]),
            {
              "LC10": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73249086222346, -1.398464720467513]),
            {
              "LC10": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73324188074763, -1.398336012779036]),
            {
              "LC10": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73339208445246, -1.399623089346119]),
            {
              "LC10": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73639615854914, -1.400717103872743]),
            {
              "LC10": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.738820875498604, -1.4008887139482329]),
            {
              "LC10": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74332698664362, -1.402047081628915]),
            {
              "LC10": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74545129618342, -1.40159660537673]),
            {
              "LC10": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.752054717301974, -1.3984686982268515]),
            {
              "LC10": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73604171330786, -1.4050935512398324]),
            {
              "LC10": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72045945393149, -1.3979420510461538]),
            {
              "LC10": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72801255451743, -1.3792130131024942]),
            {
              "LC10": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72818421589438, -1.3800710711707418]),
            {
              "LC10": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72887086140219, -1.3823878264081044]),
            {
              "LC10": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718099109998384, -1.3704608031677932]),
            {
              "LC10": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722562305799165, -1.3712759613293388]),
            {
              "LC10": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722304813733736, -1.373292404009506]),
            {
              "LC10": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71947240101401, -1.3717049918291704]),
            {
              "LC10": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72221898304526, -1.374450785205497]),
            {
              "LC10": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72118901478354, -1.3791701101909568]),
            {
              "LC10": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.719858639112154, -1.377368187208342]),
            {
              "LC10": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723077289930025, -1.3773252842635615]),
            {
              "LC10": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7242789195687, -1.376467225205958]),
            {
              "LC10": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6888820517941, -1.3745222711055285]),
            {
              "LC10": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67253372425627, -1.3667486600325827]),
            {
              "LC10": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69010707631289, -1.3556065938810542]),
            {
              "LC10": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68285438313662, -1.3589530515477326]),
            {
              "LC10": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65590354695498, -1.3626856334745852]),
            {
              "LC10": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6543585945624, -1.3619133756189394]),
            {
              "LC10": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65667602315127, -1.3594678907775133]),
            {
              "LC10": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65762016072451, -1.3610982142806303]),
            {
              "LC10": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657534330036036, -1.3541907834751772]),
            {
              "LC10": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.647932171596146, -1.371165012352465]),
            {
              "LC10": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.651923298610306, -1.3718943641902273]),
            {
              "LC10": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658231854213334, -1.3693845348741334]),
            {
              "LC10": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67149269558296, -1.372838230944329]),
            {
              "LC10": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673423886073685, -1.3618550311761262]),
            {
              "LC10": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66329381584591, -1.3463013859143804]),
            {
              "LC10": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66629788994259, -1.3438987888760046]),
            {
              "LC10": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666469551319544, -1.3406381176871354]),
            {
              "LC10": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.676683403248255, -1.3350177400551497]),
            {
              "LC10": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.678185440296595, -1.3376348640657063]),
            {
              "LC10": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.679429985279505, -1.337463249461946]),
            {
              "LC10": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67432305931515, -1.3349319326633362]),
            {
              "LC10": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67179105400509, -1.335875813808468]),
            {
              "LC10": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67749879478878, -1.3349748363596181]),
            {
              "LC10": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.671222838534696, -1.351984033803139]),
            {
              "LC10": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67317548669754, -1.3526919397536796]),
            {
              "LC10": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71436948209643, -1.406793548585257]),
            {
              "LC10": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.681667175654056, -1.3909578881884392]),
            {
              "LC10": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6826113132273, -1.3912153043654298]),
            {
              "LC10": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64965957641601, -1.3707402907879405]),
            {
              "LC10": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65365070343017, -1.3794924996978921]),
            {
              "LC10": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65953010559082, -1.376660906210856]),
            {
              "LC10": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.677554550170896, -1.3804363634450465]),
            {
              "LC10": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67364925384521, -1.381380226817506]),
            {
              "LC10": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67347759246826, -1.383782786436707]),
            {
              "LC10": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67849868774414, -1.3838685920924083]),
            {
              "LC10": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783233585357664, -1.4061994078919497]),
            {
              "LC10": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783705654144285, -1.4045691153677915]),
            {
              "LC10": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78434938430786, -1.4020807719542538]),
            {
              "LC10": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.772933902740476, -1.4013943319262157]),
            {
              "LC10": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78885549545288, -1.4008795017731528]),
            {
              "LC10": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78855508804321, -1.4011798193761964]),
            {
              "LC10": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68519348144531, -1.3540509411879873]),
            {
              "LC10": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68922752380371, -1.3559386883208597]),
            {
              "LC10": 0,
              "system:index": "92"
            })]),
    ForestedAreas10 = ui.import && ui.import("ForestedAreas10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.70807034143663,
            -1.3706924195682444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709701124517686,
            -1.3693195211176212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70686871179796,
            -1.367260171967512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69727927736799,
            -1.365887271552489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69719344667951,
            -1.3600095327927313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71126967958967,
            -1.3613395333294736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70448905520002,
            -1.3570921096942465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7019999652342,
            -1.3557621068192496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69976836733381,
            -1.3669598500687856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69436103395979,
            -1.3642998544698501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69122821383039,
            -1.3641282417495126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69808147365491,
            -1.3541449712862277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703445891684694,
            -1.354831424932663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71031234676282,
            -1.359550788481216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70979736263196,
            -1.3623824021840867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70799491817395,
            -1.3645275618648607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705677489585085,
            -1.364184336444414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70683620387952,
            -1.3624682086080067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69657943660657,
            -1.3575343342737771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69812438899915,
            -1.3619533700186242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70057056362073,
            -1.3632833694828326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694376507757035,
            -1.370214393646093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64577763094242,
            -1.399704799853781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.646893429892614,
            -1.397473866766591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65071289552982,
            -1.4030511955038032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6487817050391,
            -1.4036518301140708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6453055621558,
            -1.394599392165109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64393227114017,
            -1.394041657880308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6421727420264,
            -1.4081136823845672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64818089021976,
            -1.4078562680623998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69162647942142,
            -1.367317675620301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69969456413822,
            -1.3595092942532752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69789211968021,
            -1.3569350970515062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70896427849369,
            -1.3659447752381397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70922177055912,
            -1.3704925047453287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70664684990482,
            -1.3709215353855753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708792617116735,
            -1.3668028380689625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706303527150915,
            -1.363971229564721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70690434197025,
            -1.3576215499067212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70870678642826,
            -1.3589086484848456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708020140920446,
            -1.3604531658731673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70235531548099,
            -1.3572783235034704
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC10": 1
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
            ee.Geometry.Point([36.70807034143663, -1.3706924195682444]),
            {
              "LC10": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709701124517686, -1.3693195211176212]),
            {
              "LC10": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70686871179796, -1.367260171967512]),
            {
              "LC10": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69727927736799, -1.365887271552489]),
            {
              "LC10": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69719344667951, -1.3600095327927313]),
            {
              "LC10": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71126967958967, -1.3613395333294736]),
            {
              "LC10": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70448905520002, -1.3570921096942465]),
            {
              "LC10": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7019999652342, -1.3557621068192496]),
            {
              "LC10": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69976836733381, -1.3669598500687856]),
            {
              "LC10": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69436103395979, -1.3642998544698501]),
            {
              "LC10": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69122821383039, -1.3641282417495126]),
            {
              "LC10": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69808147365491, -1.3541449712862277]),
            {
              "LC10": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703445891684694, -1.354831424932663]),
            {
              "LC10": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71031234676282, -1.359550788481216]),
            {
              "LC10": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70979736263196, -1.3623824021840867]),
            {
              "LC10": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70799491817395, -1.3645275618648607]),
            {
              "LC10": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705677489585085, -1.364184336444414]),
            {
              "LC10": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70683620387952, -1.3624682086080067]),
            {
              "LC10": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69657943660657, -1.3575343342737771]),
            {
              "LC10": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69812438899915, -1.3619533700186242]),
            {
              "LC10": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70057056362073, -1.3632833694828326]),
            {
              "LC10": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694376507757035, -1.370214393646093]),
            {
              "LC10": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64577763094242, -1.399704799853781]),
            {
              "LC10": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.646893429892614, -1.397473866766591]),
            {
              "LC10": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65071289552982, -1.4030511955038032]),
            {
              "LC10": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6487817050391, -1.4036518301140708]),
            {
              "LC10": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6453055621558, -1.394599392165109]),
            {
              "LC10": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64393227114017, -1.394041657880308]),
            {
              "LC10": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6421727420264, -1.4081136823845672]),
            {
              "LC10": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64818089021976, -1.4078562680623998]),
            {
              "LC10": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69162647942142, -1.367317675620301]),
            {
              "LC10": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69969456413822, -1.3595092942532752]),
            {
              "LC10": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69789211968021, -1.3569350970515062]),
            {
              "LC10": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70896427849369, -1.3659447752381397]),
            {
              "LC10": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70922177055912, -1.3704925047453287]),
            {
              "LC10": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70664684990482, -1.3709215353855753]),
            {
              "LC10": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708792617116735, -1.3668028380689625]),
            {
              "LC10": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706303527150915, -1.363971229564721]),
            {
              "LC10": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70690434197025, -1.3576215499067212]),
            {
              "LC10": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70870678642826, -1.3589086484848456]),
            {
              "LC10": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708020140920446, -1.3604531658731673]),
            {
              "LC10": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70235531548099, -1.3572783235034704]),
            {
              "LC10": 1,
              "system:index": "41"
            })]),
    Vegetation10 = ui.import && ui.import("Vegetation10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.72970630618815,
            -1.3803736339521306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.740263480870766,
            -1.3868090587621276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73022129031901,
            -1.3860368087072628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.721037406652016,
            -1.383548445706928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717432517736,
            -1.3829478059707894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720779914586586,
            -1.3844923078421516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71794750186686,
            -1.383548445706928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68095447513346,
            -1.3875813085650033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68327190372233,
            -1.3870664753910877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65949680301432,
            -1.3880961416268616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65801478697263,
            -1.3860414238948342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69470063351958,
            -1.3875452673771358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6928123583731,
            -1.386773017562492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69195405148833,
            -1.3847994891139652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68191186093657,
            -1.3719286112062201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.675646220677784,
            -1.3733015081602524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66045418881743,
            -1.3739021503297062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65822259091704,
            -1.3734731202240724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72404422541235,
            -1.3945973803457783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.740867040353756,
            -1.3917658049152344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749364278512935,
            -1.4063526721408872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75228252192114,
            -1.408326182490455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76069392939184,
            -1.391165167265387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764127156930904,
            -1.3899638915070054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.768075368600826,
            -1.3998314956523064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76292552729223,
            -1.3987160294340628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77348270197485,
            -1.3950264066291358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77614345331762,
            -1.3929670797559497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71750340218511,
            -1.40131634694483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71449932808843,
            -1.4009731268439374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69772417407247,
            -1.395570300303359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69051439624044,
            -1.4092990967426804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.672833274414266,
            -1.3760066270999025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68364794116231,
            -1.382613675143446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68115885119649,
            -1.3820130351707758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69678003649923,
            -1.3753201794989511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683819602539266,
            -1.3681124677866765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66776926379415,
            -1.3587595715146932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66879923205587,
            -1.3572150530434308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663649390747274,
            -1.3384233329662816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66442186694356,
            -1.3379942965722715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673863242675985,
            -1.3424562713977202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67592317919942,
            -1.3419414285636968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66433603625509,
            -1.3219482817630361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66416437487813,
            -1.322377320947067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67882643613784,
            -1.3479551850889298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.675221547221824,
            -1.350529391824882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659708913614885,
            -1.353277728963094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65241330509438,
            -1.386162704795223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652499135782854,
            -1.3883936485918114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6985854367353,
            -1.41551098976935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68768493929878,
            -1.4161116211655909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693693087492136,
            -1.4153393807704142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69377891818061,
            -1.417999318825826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725192950163034,
            -1.4113923702930475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72879783907905,
            -1.4075311579087355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72484962740913,
            -1.4041847686699611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71257583895698,
            -1.404098963754642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72047226229682,
            -1.4265797433025218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72982780734077,
            -1.4242630318394385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73334686556831,
            -1.4230617731266035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730686114225534,
            -1.4214314924442484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.704679415617136,
            -1.438163265549714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69034569064155,
            -1.4308699435527037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69257728854194,
            -1.4104485189682492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69652550021186,
            -1.409847886107681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694208071622995,
            -1.4073595483209136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698242113981394,
            -1.3980068067277138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71849815646186,
            -1.388997249773596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67232124606147,
            -1.394660403883188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.674209521207956,
            -1.3945745986194327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7165240506269,
            -1.3903701368667638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70084147663799,
            -1.4151313632307412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69530539723125,
            -1.4122998126623005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71229987354961,
            -1.411484668676996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71036868305889,
            -1.4088676255304138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70616297932354,
            -1.409039235007209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6986098787376,
            -1.4080953827284477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69182925434795,
            -1.4150455587188182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69088511677471,
            -1.4252991753646274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68809561939922,
            -1.4235401899702345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725431968886525,
            -1.41633262606429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72487406941143,
            -1.4153887767474778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72676234455791,
            -1.4084815041614271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72804980488506,
            -1.4079237731821512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728908111769826,
            -1.4085244065389113
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC10": 2
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
            ee.Geometry.Point([36.72970630618815, -1.3803736339521306]),
            {
              "LC10": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.740263480870766, -1.3868090587621276]),
            {
              "LC10": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73022129031901, -1.3860368087072628]),
            {
              "LC10": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.721037406652016, -1.383548445706928]),
            {
              "LC10": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717432517736, -1.3829478059707894]),
            {
              "LC10": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720779914586586, -1.3844923078421516]),
            {
              "LC10": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71794750186686, -1.383548445706928]),
            {
              "LC10": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68095447513346, -1.3875813085650033]),
            {
              "LC10": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68327190372233, -1.3870664753910877]),
            {
              "LC10": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65949680301432, -1.3880961416268616]),
            {
              "LC10": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65801478697263, -1.3860414238948342]),
            {
              "LC10": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69470063351958, -1.3875452673771358]),
            {
              "LC10": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6928123583731, -1.386773017562492]),
            {
              "LC10": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69195405148833, -1.3847994891139652]),
            {
              "LC10": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68191186093657, -1.3719286112062201]),
            {
              "LC10": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.675646220677784, -1.3733015081602524]),
            {
              "LC10": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66045418881743, -1.3739021503297062]),
            {
              "LC10": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65822259091704, -1.3734731202240724]),
            {
              "LC10": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72404422541235, -1.3945973803457783]),
            {
              "LC10": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.740867040353756, -1.3917658049152344]),
            {
              "LC10": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749364278512935, -1.4063526721408872]),
            {
              "LC10": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75228252192114, -1.408326182490455]),
            {
              "LC10": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76069392939184, -1.391165167265387]),
            {
              "LC10": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764127156930904, -1.3899638915070054]),
            {
              "LC10": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.768075368600826, -1.3998314956523064]),
            {
              "LC10": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76292552729223, -1.3987160294340628]),
            {
              "LC10": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77348270197485, -1.3950264066291358]),
            {
              "LC10": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77614345331762, -1.3929670797559497]),
            {
              "LC10": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71750340218511, -1.40131634694483]),
            {
              "LC10": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71449932808843, -1.4009731268439374]),
            {
              "LC10": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69772417407247, -1.395570300303359]),
            {
              "LC10": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69051439624044, -1.4092990967426804]),
            {
              "LC10": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.672833274414266, -1.3760066270999025]),
            {
              "LC10": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68364794116231, -1.382613675143446]),
            {
              "LC10": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68115885119649, -1.3820130351707758]),
            {
              "LC10": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69678003649923, -1.3753201794989511]),
            {
              "LC10": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683819602539266, -1.3681124677866765]),
            {
              "LC10": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66776926379415, -1.3587595715146932]),
            {
              "LC10": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66879923205587, -1.3572150530434308]),
            {
              "LC10": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663649390747274, -1.3384233329662816]),
            {
              "LC10": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66442186694356, -1.3379942965722715]),
            {
              "LC10": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673863242675985, -1.3424562713977202]),
            {
              "LC10": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67592317919942, -1.3419414285636968]),
            {
              "LC10": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66433603625509, -1.3219482817630361]),
            {
              "LC10": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66416437487813, -1.322377320947067]),
            {
              "LC10": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67882643613784, -1.3479551850889298]),
            {
              "LC10": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.675221547221824, -1.350529391824882]),
            {
              "LC10": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659708913614885, -1.353277728963094]),
            {
              "LC10": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65241330509438, -1.386162704795223]),
            {
              "LC10": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652499135782854, -1.3883936485918114]),
            {
              "LC10": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6985854367353, -1.41551098976935]),
            {
              "LC10": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68768493929878, -1.4161116211655909]),
            {
              "LC10": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693693087492136, -1.4153393807704142]),
            {
              "LC10": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69377891818061, -1.417999318825826]),
            {
              "LC10": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725192950163034, -1.4113923702930475]),
            {
              "LC10": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72879783907905, -1.4075311579087355]),
            {
              "LC10": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72484962740913, -1.4041847686699611]),
            {
              "LC10": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71257583895698, -1.404098963754642]),
            {
              "LC10": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72047226229682, -1.4265797433025218]),
            {
              "LC10": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72982780734077, -1.4242630318394385]),
            {
              "LC10": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73334686556831, -1.4230617731266035]),
            {
              "LC10": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730686114225534, -1.4214314924442484]),
            {
              "LC10": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.704679415617136, -1.438163265549714]),
            {
              "LC10": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69034569064155, -1.4308699435527037]),
            {
              "LC10": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69257728854194, -1.4104485189682492]),
            {
              "LC10": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69652550021186, -1.409847886107681]),
            {
              "LC10": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694208071622995, -1.4073595483209136]),
            {
              "LC10": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698242113981394, -1.3980068067277138]),
            {
              "LC10": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71849815646186, -1.388997249773596]),
            {
              "LC10": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67232124606147, -1.394660403883188]),
            {
              "LC10": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.674209521207956, -1.3945745986194327]),
            {
              "LC10": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7165240506269, -1.3903701368667638]),
            {
              "LC10": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70084147663799, -1.4151313632307412]),
            {
              "LC10": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69530539723125, -1.4122998126623005]),
            {
              "LC10": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71229987354961, -1.411484668676996]),
            {
              "LC10": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71036868305889, -1.4088676255304138]),
            {
              "LC10": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70616297932354, -1.409039235007209]),
            {
              "LC10": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6986098787376, -1.4080953827284477]),
            {
              "LC10": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69182925434795, -1.4150455587188182]),
            {
              "LC10": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69088511677471, -1.4252991753646274]),
            {
              "LC10": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68809561939922, -1.4235401899702345]),
            {
              "LC10": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725431968886525, -1.41633262606429]),
            {
              "LC10": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72487406941143, -1.4153887767474778]),
            {
              "LC10": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72676234455791, -1.4084815041614271]),
            {
              "LC10": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72804980488506, -1.4079237731821512]),
            {
              "LC10": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728908111769826, -1.4085244065389113]),
            {
              "LC10": 2,
              "system:index": "85"
            })]),
    NonBuilt_Up10 = ui.import && ui.import("NonBuilt_Up10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.780883270842054,
            -1.4017544844681613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78002496395729,
            -1.403556388835104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77830835018776,
            -1.4005532141197123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7821707311692,
            -1.3974642303974343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78671975765846,
            -1.4022693144288643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78345819149635,
            -1.3992661380630702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783887344938734,
            -1.4001241888460156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79092546139381,
            -1.3938604109206278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81796212826393,
            -1.3878540328762645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.817790466886976,
            -1.3900849750770414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74520744375645,
            -1.3876614784134407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71027435354649,
            -1.389291782669431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7124201207584,
            -1.3914369181340722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691938295188585,
            -1.3589181785972935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68910588246886,
            -1.3558291408709273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722074136463775,
            -1.373876272617898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691163399971956,
            -1.3986458568607312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66258178070926,
            -1.3649242056653614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659393290195965,
            -1.322192673277751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68254441831661,
            -1.3590846234450982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68657846067501,
            -1.3510187949821844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68996812209632,
            -1.3554777098689232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68833733901526,
            -1.3559925498387047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77432501653043,
            -1.400016788319232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78719961980192,
            -1.3960697519395677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7876287732443,
            -1.3916936821210741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79286444524137,
            -1.3886904922515864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79492438176481,
            -1.3929807623235058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81166136601774,
            -1.3887762977294311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77621329167692,
            -1.4025051339270727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7916628156027,
            -1.3977858555286604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79741347173063,
            -1.3947826734255908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73263140260279,
            -1.3811395980247896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7318589264065,
            -1.3837137692132215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79861575629733,
            -1.39367525014273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79502235209226,
            -1.396889396785243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7780278757739,
            -1.4034963864076326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724246444702146,
            -1.383182146759892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724246444702146,
            -1.3840402033944983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72664970397949,
            -1.384383425961415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.735747756958006,
            -1.385756315732101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72484725952148,
            -1.3921059205576793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.726306381225584,
            -1.392792363299723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.727765502929685,
            -1.3931355845957663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72819465637207,
            -1.3838685920924083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73171371459961,
            -1.3847266484786513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734546127319334,
            -1.385842121316354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73197120666504,
            -1.4024025406481102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723302307128904,
            -1.40120127063208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71995491027832,
            -1.40111546560735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71240180969238,
            -1.4028315655044292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715320053100584,
            -1.4049766886055164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.716006698608396,
            -1.3909904506756405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.719268264770506,
            -1.3923633366093688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71008438110351,
            -1.3820666726710733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71772331237793,
            -1.3836969807779014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715320053100584,
            -1.3830963410793695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.654080358233706,
            -1.3729270796726403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65468117305304,
            -1.3744286850484329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.650346723284976,
            -1.3723693402927815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64820095607306,
            -1.372026115994371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.650861707415835,
            -1.3727125645419445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64991756984259,
            -1.3721548251120492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.648630109515445,
            -1.372111922073595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652578321185366,
            -1.3724980493919998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65197750636603,
            -1.372626758484272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652835813250796,
            -1.3727983705965254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65377995082404,
            -1.3730557887418215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66141888209845,
            -1.3740854610457502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6597880990174,
            -1.3738280430113665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65871521541144,
            -1.3659767796634736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66077515193488,
            -1.3661483922518818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66017433711554,
            -1.3675212925176348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65970226832892,
            -1.3705245091099905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659358945575015,
            -1.3689370950941566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65841480800177,
            -1.3674783893962064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66030308314826,
            -1.3684222578902876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65717026301886,
            -1.3680361299148691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65335125618785,
            -1.3636610249058572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65305084877818,
            -1.3653342487318965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.653866240318706,
            -1.364991023426573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65575451546519,
            -1.364132959948978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65596909218638,
            -1.3652913455714106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657642790611675,
            -1.364132959948978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65802902870982,
            -1.3649052170925993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663350531395366,
            -1.364862313924455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66300720864146,
            -1.3654200550505653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67648576814569,
            -1.3682044305222623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67923235017694,
            -1.3688050739705915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68249391633905,
            -1.368633461572139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68566965181268,
            -1.3683760429514262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.684811344927915,
            -1.370177972715963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683352223223814,
            -1.3704353911431453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70223497468866,
            -1.3700921665674157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70446657258905,
            -1.370177972715963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.702320805377134,
            -1.3718940950410798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.700775852984556,
            -1.3705211972793903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6852404983703,
            -1.3720657072059144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78430646896362,
            -1.4053842617721368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78216070175171,
            -1.4044833104665813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78490728378296,
            -1.4040542859132674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78331941604614,
            -1.4026385043288263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.785679759979246,
            -1.4026814068136733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78460687637329,
            -1.40559877393652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78164571762085,
            -1.4067142368736016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74282878875732,
            -1.3947229824393699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7414554977417,
            -1.3957097427214566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.735232772827146,
            -1.3950662034539978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73068374633789,
            -1.393864929683832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72866672515869,
            -1.3939507349734512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744502487182615,
            -1.3959671583791264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74570411682129,
            -1.3954952296518621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73836559295654,
            -1.3949803982050386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75263079902885,
            -1.3962761299332762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.756021111223674,
            -1.396919668869563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759754746172405,
            -1.3975632076295708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74641687307406,
            -1.387859414410026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75126630697299,
            -1.3881168309246898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75572950277377,
            -1.388889080300519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75942022237826,
            -1.3891464967030618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73375684652377,
            -1.3936941818521105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731868571377284,
            -1.394251916219237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73388559255648,
            -1.3920209779584038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754570788479334,
            -1.396654462750977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7554290953641,
            -1.3951957740779377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75590116415072,
            -1.3936083765531402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.757274455166346,
            -1.3969976834836677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71922418803396,
            -1.4191313283587474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72025415629568,
            -1.4192600348983955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71257230967703,
            -1.4170720227508518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69866835374619,
            -1.4251720442305427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70055662889268,
            -1.4242711006099833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.702101581285255,
            -1.4244427089458116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70029913682725,
            -1.4251720442305427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70167242784287,
            -1.4253007504332806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71343123216416,
            -1.427188440580015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712572925279396,
            -1.4261587916010277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71596323747422,
            -1.4271455385484226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715362422654884,
            -1.427488754778733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71737944383408,
            -1.427746166917844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.719568126390236,
            -1.4280893830584753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709354274461525,
            -1.426544910022149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697595470140236,
            -1.4250004359490254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.689613216111916,
            -1.4236704713339001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69021403093125,
            -1.4241423943497153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70815264482285,
            -1.4201953988811953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720083110521095,
            -1.4232414503266122
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC10": 3
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
            ee.Geometry.Point([36.780883270842054, -1.4017544844681613]),
            {
              "LC10": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78002496395729, -1.403556388835104]),
            {
              "LC10": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77830835018776, -1.4005532141197123]),
            {
              "LC10": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7821707311692, -1.3974642303974343]),
            {
              "LC10": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78671975765846, -1.4022693144288643]),
            {
              "LC10": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78345819149635, -1.3992661380630702]),
            {
              "LC10": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783887344938734, -1.4001241888460156]),
            {
              "LC10": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79092546139381, -1.3938604109206278]),
            {
              "LC10": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81796212826393, -1.3878540328762645]),
            {
              "LC10": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.817790466886976, -1.3900849750770414]),
            {
              "LC10": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74520744375645, -1.3876614784134407]),
            {
              "LC10": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71027435354649, -1.389291782669431]),
            {
              "LC10": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7124201207584, -1.3914369181340722]),
            {
              "LC10": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691938295188585, -1.3589181785972935]),
            {
              "LC10": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68910588246886, -1.3558291408709273]),
            {
              "LC10": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722074136463775, -1.373876272617898]),
            {
              "LC10": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691163399971956, -1.3986458568607312]),
            {
              "LC10": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66258178070926, -1.3649242056653614]),
            {
              "LC10": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659393290195965, -1.322192673277751]),
            {
              "LC10": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68254441831661, -1.3590846234450982]),
            {
              "LC10": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68657846067501, -1.3510187949821844]),
            {
              "LC10": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68996812209632, -1.3554777098689232]),
            {
              "LC10": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68833733901526, -1.3559925498387047]),
            {
              "LC10": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77432501653043, -1.400016788319232]),
            {
              "LC10": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78719961980192, -1.3960697519395677]),
            {
              "LC10": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7876287732443, -1.3916936821210741]),
            {
              "LC10": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79286444524137, -1.3886904922515864]),
            {
              "LC10": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79492438176481, -1.3929807623235058]),
            {
              "LC10": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81166136601774, -1.3887762977294311]),
            {
              "LC10": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77621329167692, -1.4025051339270727]),
            {
              "LC10": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7916628156027, -1.3977858555286604]),
            {
              "LC10": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79741347173063, -1.3947826734255908]),
            {
              "LC10": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73263140260279, -1.3811395980247896]),
            {
              "LC10": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7318589264065, -1.3837137692132215]),
            {
              "LC10": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79861575629733, -1.39367525014273]),
            {
              "LC10": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79502235209226, -1.396889396785243]),
            {
              "LC10": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7780278757739, -1.4034963864076326]),
            {
              "LC10": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724246444702146, -1.383182146759892]),
            {
              "LC10": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724246444702146, -1.3840402033944983]),
            {
              "LC10": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72664970397949, -1.384383425961415]),
            {
              "LC10": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.735747756958006, -1.385756315732101]),
            {
              "LC10": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72484725952148, -1.3921059205576793]),
            {
              "LC10": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.726306381225584, -1.392792363299723]),
            {
              "LC10": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.727765502929685, -1.3931355845957663]),
            {
              "LC10": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72819465637207, -1.3838685920924083]),
            {
              "LC10": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73171371459961, -1.3847266484786513]),
            {
              "LC10": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734546127319334, -1.385842121316354]),
            {
              "LC10": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73197120666504, -1.4024025406481102]),
            {
              "LC10": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723302307128904, -1.40120127063208]),
            {
              "LC10": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71995491027832, -1.40111546560735]),
            {
              "LC10": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71240180969238, -1.4028315655044292]),
            {
              "LC10": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715320053100584, -1.4049766886055164]),
            {
              "LC10": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.716006698608396, -1.3909904506756405]),
            {
              "LC10": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.719268264770506, -1.3923633366093688]),
            {
              "LC10": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71008438110351, -1.3820666726710733]),
            {
              "LC10": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71772331237793, -1.3836969807779014]),
            {
              "LC10": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715320053100584, -1.3830963410793695]),
            {
              "LC10": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.654080358233706, -1.3729270796726403]),
            {
              "LC10": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65468117305304, -1.3744286850484329]),
            {
              "LC10": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.650346723284976, -1.3723693402927815]),
            {
              "LC10": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64820095607306, -1.372026115994371]),
            {
              "LC10": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.650861707415835, -1.3727125645419445]),
            {
              "LC10": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64991756984259, -1.3721548251120492]),
            {
              "LC10": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.648630109515445, -1.372111922073595]),
            {
              "LC10": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652578321185366, -1.3724980493919998]),
            {
              "LC10": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65197750636603, -1.372626758484272]),
            {
              "LC10": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652835813250796, -1.3727983705965254]),
            {
              "LC10": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65377995082404, -1.3730557887418215]),
            {
              "LC10": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66141888209845, -1.3740854610457502]),
            {
              "LC10": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6597880990174, -1.3738280430113665]),
            {
              "LC10": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65871521541144, -1.3659767796634736]),
            {
              "LC10": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66077515193488, -1.3661483922518818]),
            {
              "LC10": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66017433711554, -1.3675212925176348]),
            {
              "LC10": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65970226832892, -1.3705245091099905]),
            {
              "LC10": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659358945575015, -1.3689370950941566]),
            {
              "LC10": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65841480800177, -1.3674783893962064]),
            {
              "LC10": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66030308314826, -1.3684222578902876]),
            {
              "LC10": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65717026301886, -1.3680361299148691]),
            {
              "LC10": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65335125618785, -1.3636610249058572]),
            {
              "LC10": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65305084877818, -1.3653342487318965]),
            {
              "LC10": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.653866240318706, -1.364991023426573]),
            {
              "LC10": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65575451546519, -1.364132959948978]),
            {
              "LC10": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65596909218638, -1.3652913455714106]),
            {
              "LC10": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657642790611675, -1.364132959948978]),
            {
              "LC10": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65802902870982, -1.3649052170925993]),
            {
              "LC10": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663350531395366, -1.364862313924455]),
            {
              "LC10": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66300720864146, -1.3654200550505653]),
            {
              "LC10": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67648576814569, -1.3682044305222623]),
            {
              "LC10": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67923235017694, -1.3688050739705915]),
            {
              "LC10": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68249391633905, -1.368633461572139]),
            {
              "LC10": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68566965181268, -1.3683760429514262]),
            {
              "LC10": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.684811344927915, -1.370177972715963]),
            {
              "LC10": 3,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683352223223814, -1.3704353911431453]),
            {
              "LC10": 3,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70223497468866, -1.3700921665674157]),
            {
              "LC10": 3,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70446657258905, -1.370177972715963]),
            {
              "LC10": 3,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([36.702320805377134, -1.3718940950410798]),
            {
              "LC10": 3,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([36.700775852984556, -1.3705211972793903]),
            {
              "LC10": 3,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6852404983703, -1.3720657072059144]),
            {
              "LC10": 3,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78430646896362, -1.4053842617721368]),
            {
              "LC10": 3,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78216070175171, -1.4044833104665813]),
            {
              "LC10": 3,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78490728378296, -1.4040542859132674]),
            {
              "LC10": 3,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78331941604614, -1.4026385043288263]),
            {
              "LC10": 3,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([36.785679759979246, -1.4026814068136733]),
            {
              "LC10": 3,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78460687637329, -1.40559877393652]),
            {
              "LC10": 3,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78164571762085, -1.4067142368736016]),
            {
              "LC10": 3,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74282878875732, -1.3947229824393699]),
            {
              "LC10": 3,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7414554977417, -1.3957097427214566]),
            {
              "LC10": 3,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([36.735232772827146, -1.3950662034539978]),
            {
              "LC10": 3,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73068374633789, -1.393864929683832]),
            {
              "LC10": 3,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72866672515869, -1.3939507349734512]),
            {
              "LC10": 3,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744502487182615, -1.3959671583791264]),
            {
              "LC10": 3,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74570411682129, -1.3954952296518621]),
            {
              "LC10": 3,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73836559295654, -1.3949803982050386]),
            {
              "LC10": 3,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75263079902885, -1.3962761299332762]),
            {
              "LC10": 3,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([36.756021111223674, -1.396919668869563]),
            {
              "LC10": 3,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759754746172405, -1.3975632076295708]),
            {
              "LC10": 3,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74641687307406, -1.387859414410026]),
            {
              "LC10": 3,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75126630697299, -1.3881168309246898]),
            {
              "LC10": 3,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75572950277377, -1.388889080300519]),
            {
              "LC10": 3,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75942022237826, -1.3891464967030618]),
            {
              "LC10": 3,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73375684652377, -1.3936941818521105]),
            {
              "LC10": 3,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731868571377284, -1.394251916219237]),
            {
              "LC10": 3,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73388559255648, -1.3920209779584038]),
            {
              "LC10": 3,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754570788479334, -1.396654462750977]),
            {
              "LC10": 3,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7554290953641, -1.3951957740779377]),
            {
              "LC10": 3,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75590116415072, -1.3936083765531402]),
            {
              "LC10": 3,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([36.757274455166346, -1.3969976834836677]),
            {
              "LC10": 3,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71922418803396, -1.4191313283587474]),
            {
              "LC10": 3,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72025415629568, -1.4192600348983955]),
            {
              "LC10": 3,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71257230967703, -1.4170720227508518]),
            {
              "LC10": 3,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69866835374619, -1.4251720442305427]),
            {
              "LC10": 3,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70055662889268, -1.4242711006099833]),
            {
              "LC10": 3,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([36.702101581285255, -1.4244427089458116]),
            {
              "LC10": 3,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70029913682725, -1.4251720442305427]),
            {
              "LC10": 3,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70167242784287, -1.4253007504332806]),
            {
              "LC10": 3,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71343123216416, -1.427188440580015]),
            {
              "LC10": 3,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712572925279396, -1.4261587916010277]),
            {
              "LC10": 3,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71596323747422, -1.4271455385484226]),
            {
              "LC10": 3,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715362422654884, -1.427488754778733]),
            {
              "LC10": 3,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71737944383408, -1.427746166917844]),
            {
              "LC10": 3,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([36.719568126390236, -1.4280893830584753]),
            {
              "LC10": 3,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709354274461525, -1.426544910022149]),
            {
              "LC10": 3,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697595470140236, -1.4250004359490254]),
            {
              "LC10": 3,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([36.689613216111916, -1.4236704713339001]),
            {
              "LC10": 3,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69021403093125, -1.4241423943497153]),
            {
              "LC10": 3,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70815264482285, -1.4201953988811953]),
            {
              "LC10": 3,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720083110521095, -1.4232414503266122]),
            {
              "LC10": 3,
              "system:index": "146"
            })]),
    Water10 = ui.import && ui.import("Water10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.73429227562362,
            -1.389111915612801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734742886738125,
            -1.38979835922582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734013325886075,
            -1.389283526534751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714882862820645,
            -1.3674224876863201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714861405148525,
            -1.3676799064093448
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC10": 4
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
            ee.Geometry.Point([36.73429227562362, -1.389111915612801]),
            {
              "LC10": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734742886738125, -1.38979835922582]),
            {
              "LC10": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734013325886075, -1.389283526534751]),
            {
              "LC10": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714882862820645, -1.3674224876863201]),
            {
              "LC10": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714861405148525, -1.3676799064093448]),
            {
              "LC10": 4,
              "system:index": "4"
            })]),
    BuiltUp12 = ui.import && ui.import("BuiltUp12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.7470285481459,
            -1.39271350995111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75003262224258,
            -1.3933141472064796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747886855030664,
            -1.3926277046164286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76290722551406,
            -1.3959741103527148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75449581804336,
            -1.3965747467759113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75003262224258,
            -1.3941722001627617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.751835066700586,
            -1.3939147843086992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76299305620254,
            -1.3970037726985047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74574108781875,
            -1.3964031363849483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72784111863338,
            -1.3791714561734039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72835610276424,
            -1.3803727374032682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73848412400447,
            -1.3958177275368853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747925499736894,
            -1.39332937484156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682569943716686,
            -1.391377005564408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.643263717785096,
            -1.4076476679709444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6461819611933,
            -1.4063176934014847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65685137355946,
            -1.3592953532044807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.653761468774306,
            -1.361955354332022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65762384975575,
            -1.3604108379053854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67736490810536,
            -1.3364707075477635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673245035058486,
            -1.3350119823419955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69017579075283,
            -1.3553672587127608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72756423814728,
            -1.3841809770628408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72687759263947,
            -1.383580337486862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72215690477326,
            -1.3733265384640656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72091235979035,
            -1.3746565316223025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723444365100406,
            -1.3744420166468687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725718878345035,
            -1.374356210651306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74872150285675,
            -1.3902712045406247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74232711656525,
            -1.3912579666870888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75451507432892,
            -1.3943469585628332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769406698779605,
            -1.3913008693797406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.758162878589175,
            -1.402755860328024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7589782701297,
            -1.4043861541171652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75944058435785,
            -1.390615605814338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764998121436705,
            -1.3903152868621413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75740210550653,
            -1.388255955875391
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76210133570062,
            -1.3869259703262877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.773259325202574,
            -1.3910875355191776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77559821146356,
            -1.391967040626275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75014963550158,
            -1.386625650905277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72088665699454,
            -1.3886777219114117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747150847668365,
            -1.3934184699137548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67565700585797,
            -1.3339154062730536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658173692568155,
            -1.3692752611153587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666413438661905,
            -1.366314946101799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.665426385744425,
            -1.3758394248318417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7046245471277,
            -1.42037160837041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703058137063,
            -1.4203501572912764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703744782570816,
            -1.420028391080479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69595564759157,
            -1.4244473097879746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.701259852451585,
            -1.4212555218647265
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC12": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.7470285481459, -1.39271350995111]),
            {
              "LC12": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75003262224258, -1.3933141472064796]),
            {
              "LC12": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747886855030664, -1.3926277046164286]),
            {
              "LC12": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76290722551406, -1.3959741103527148]),
            {
              "LC12": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75449581804336, -1.3965747467759113]),
            {
              "LC12": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75003262224258, -1.3941722001627617]),
            {
              "LC12": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.751835066700586, -1.3939147843086992]),
            {
              "LC12": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76299305620254, -1.3970037726985047]),
            {
              "LC12": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74574108781875, -1.3964031363849483]),
            {
              "LC12": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72784111863338, -1.3791714561734039]),
            {
              "LC12": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72835610276424, -1.3803727374032682]),
            {
              "LC12": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73848412400447, -1.3958177275368853]),
            {
              "LC12": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747925499736894, -1.39332937484156]),
            {
              "LC12": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682569943716686, -1.391377005564408]),
            {
              "LC12": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.643263717785096, -1.4076476679709444]),
            {
              "LC12": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6461819611933, -1.4063176934014847]),
            {
              "LC12": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65685137355946, -1.3592953532044807]),
            {
              "LC12": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.653761468774306, -1.361955354332022]),
            {
              "LC12": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65762384975575, -1.3604108379053854]),
            {
              "LC12": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67736490810536, -1.3364707075477635]),
            {
              "LC12": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673245035058486, -1.3350119823419955]),
            {
              "LC12": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69017579075283, -1.3553672587127608]),
            {
              "LC12": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72756423814728, -1.3841809770628408]),
            {
              "LC12": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72687759263947, -1.383580337486862]),
            {
              "LC12": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72215690477326, -1.3733265384640656]),
            {
              "LC12": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72091235979035, -1.3746565316223025]),
            {
              "LC12": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723444365100406, -1.3744420166468687]),
            {
              "LC12": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725718878345035, -1.374356210651306]),
            {
              "LC12": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74872150285675, -1.3902712045406247]),
            {
              "LC12": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74232711656525, -1.3912579666870888]),
            {
              "LC12": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75451507432892, -1.3943469585628332]),
            {
              "LC12": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769406698779605, -1.3913008693797406]),
            {
              "LC12": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.758162878589175, -1.402755860328024]),
            {
              "LC12": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7589782701297, -1.4043861541171652]),
            {
              "LC12": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75944058435785, -1.390615605814338]),
            {
              "LC12": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764998121436705, -1.3903152868621413]),
            {
              "LC12": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75740210550653, -1.388255955875391]),
            {
              "LC12": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76210133570062, -1.3869259703262877]),
            {
              "LC12": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.773259325202574, -1.3910875355191776]),
            {
              "LC12": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77559821146356, -1.391967040626275]),
            {
              "LC12": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75014963550158, -1.386625650905277]),
            {
              "LC12": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72088665699454, -1.3886777219114117]),
            {
              "LC12": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747150847668365, -1.3934184699137548]),
            {
              "LC12": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67565700585797, -1.3339154062730536]),
            {
              "LC12": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658173692568155, -1.3692752611153587]),
            {
              "LC12": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666413438661905, -1.366314946101799]),
            {
              "LC12": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.665426385744425, -1.3758394248318417]),
            {
              "LC12": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7046245471277, -1.42037160837041]),
            {
              "LC12": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703058137063, -1.4203501572912764]),
            {
              "LC12": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703744782570816, -1.420028391080479]),
            {
              "LC12": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69595564759157, -1.4244473097879746]),
            {
              "LC12": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.701259852451585, -1.4212555218647265]),
            {
              "LC12": 0,
              "system:index": "51"
            })]),
    ForestedAreas12 = ui.import && ui.import("ForestedAreas12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.6959368153076,
            -1.363810371858208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69937004284666,
            -1.366225945241934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69181694226072,
            -1.36614013895203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68967117504881,
            -1.3648530442359388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692761079833964,
            -1.368199489063303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69645179943846,
            -1.3648530442359388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6973959370117,
            -1.3659685263630494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703747407958964,
            -1.3636517552127103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706751482055644,
            -1.3651962695609434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70786728100584,
            -1.367942070396027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69816841320799,
            -1.3559562391843467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69919838146971,
            -1.3590452767483392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711214677856425,
            -1.3603323745677358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7124163074951,
            -1.3608472135032772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71439041333006,
            -1.3642794702630783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71602119641111,
            -1.3646226956699503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70254577832029,
            -1.3560420458366176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70460571484373,
            -1.3548407524280912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707865168143314,
            -1.3699849283770464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70992510466675,
            -1.3682688046842657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66507723156086,
            -1.3673791369098731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64831567405681,
            -1.4025310853085677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.650718933334154,
            -1.4012440103384667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64127755760173,
            -1.4025310853085677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.639475113143725,
            -1.408966449527802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63904595970134,
            -1.4022736703711538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69465763827566,
            -1.3558026329232016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706673934662376,
            -1.3711619760180382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70778973361257,
            -1.3590632837765837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68435795565847,
            -1.3461064610577504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68658955355886,
            -1.3483374420804415
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC12": 1
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
            ee.Geometry.Point([36.6959368153076, -1.363810371858208]),
            {
              "LC12": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69937004284666, -1.366225945241934]),
            {
              "LC12": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69181694226072, -1.36614013895203]),
            {
              "LC12": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68967117504881, -1.3648530442359388]),
            {
              "LC12": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692761079833964, -1.368199489063303]),
            {
              "LC12": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69645179943846, -1.3648530442359388]),
            {
              "LC12": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6973959370117, -1.3659685263630494]),
            {
              "LC12": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703747407958964, -1.3636517552127103]),
            {
              "LC12": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706751482055644, -1.3651962695609434]),
            {
              "LC12": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70786728100584, -1.367942070396027]),
            {
              "LC12": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69816841320799, -1.3559562391843467]),
            {
              "LC12": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69919838146971, -1.3590452767483392]),
            {
              "LC12": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711214677856425, -1.3603323745677358]),
            {
              "LC12": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7124163074951, -1.3608472135032772]),
            {
              "LC12": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71439041333006, -1.3642794702630783]),
            {
              "LC12": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71602119641111, -1.3646226956699503]),
            {
              "LC12": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70254577832029, -1.3560420458366176]),
            {
              "LC12": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70460571484373, -1.3548407524280912]),
            {
              "LC12": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707865168143314, -1.3699849283770464]),
            {
              "LC12": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70992510466675, -1.3682688046842657]),
            {
              "LC12": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66507723156086, -1.3673791369098731]),
            {
              "LC12": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64831567405681, -1.4025310853085677]),
            {
              "LC12": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.650718933334154, -1.4012440103384667]),
            {
              "LC12": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64127755760173, -1.4025310853085677]),
            {
              "LC12": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.639475113143725, -1.408966449527802]),
            {
              "LC12": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63904595970134, -1.4022736703711538]),
            {
              "LC12": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69465763827566, -1.3558026329232016]),
            {
              "LC12": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706673934662376, -1.3711619760180382]),
            {
              "LC12": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70778973361257, -1.3590632837765837]),
            {
              "LC12": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68435795565847, -1.3461064610577504]),
            {
              "LC12": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68658955355886, -1.3483374420804415]),
            {
              "LC12": 1,
              "system:index": "30"
            })]),
    L82 = ui.import && ui.import("L82", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    S22 = ui.import && ui.import("S22", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    BuiltUp20 = ui.import && ui.import("BuiltUp20", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.748965682983396,
            -1.3925778499643102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750982704162595,
            -1.3939078323290297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.755252780914304,
            -1.3880301626639215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74160570144653,
            -1.3934573545153957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74703449249267,
            -1.3920844692187706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75158351898193,
            -1.3943583100564831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76467269897461,
            -1.3950447521420475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76291316986084,
            -1.3968895642543344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76510185241699,
            -1.39714697978281
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74965232849121,
            -1.3944870179627773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.742227973937986,
            -1.39161253971339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76660388946533,
            -1.392427690617902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73986825488798,
            -1.3959028044673583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72225857175801,
            -1.400042902533168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73755789197896,
            -1.3910977074179944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7549632513208,
            -1.393350524706072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.752366872994386,
            -1.3936079406218118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749405714241945,
            -1.396375159937939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.758117529122316,
            -1.3972117604854757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7635892355127,
            -1.3949593737176869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76144346830078,
            -1.3966969294145428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75801024076172,
            -1.398687848118901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71655401822754,
            -1.369664089675534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71779856321045,
            -1.3699000566187998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72176823255249,
            -1.3737184275579817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72003016111084,
            -1.3726029490374037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72314152356812,
            -1.3782446908220174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72763025757964,
            -1.3837231488668205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657871383785825,
            -1.3583036248809057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65675558483563,
            -1.3596765296188875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65845074093304,
            -1.361070885194192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65815033352337,
            -1.3695228078580488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65495314037762,
            -1.362379433539217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65701307690106,
            -1.360405884943403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656090396999936,
            -1.3630873364460558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68211039666555,
            -1.3902791904334078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6828399575176,
            -1.3918236875183534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686673149321535,
            -1.4284262553702063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68714521810816,
            -1.4296275112825627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68738125250147,
            -1.4303782959086233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69137237951563,
            -1.4269461356146258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.685428604338625,
            -1.424453218495723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.696928343122686,
            -1.4226555165303651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69763644630262,
            -1.4241999921754716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70350101335013,
            -1.4204823381510379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708565602428884,
            -1.4182085227647854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71011055482146,
            -1.4168785542389775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71225325964899,
            -1.4103590244704076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709098981847475,
            -1.4081495527422603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.782660428630464,
            -1.405766124062805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78877847419846,
            -1.4008537909143373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78431527839768,
            -1.4025055372725876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77307145820725,
            -1.400596375792553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.732945611344455,
            -1.4040714775486751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.780001719298205,
            -1.3070499217168645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.793477137389026,
            -1.3106538700890844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7966957882069,
            -1.3156307426449687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79785450250133,
            -1.313099403531587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79442127496227,
            -1.3177759432730178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.789743502440295,
            -1.311211623540735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79532249719127,
            -1.314000388933821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79283340722545,
            -1.3127132668311947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7876191929005,
            -1.3120911575773688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83435400277599,
            -1.3205432493537734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84405287057384,
            -1.3238897549163864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.859631140532336,
            -1.3286949857701973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.870660384001575,
            -1.319813882158372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.86975916177257,
            -1.3207148651333467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83478315621837,
            -1.3164244670924965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87529591070303,
            -1.314280603997204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.88035992132315,
            -1.3191716613832407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68416351318359,
            -1.3825386040803214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68691009521484,
            -1.3814660325600492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69649012800969,
            -1.3804149120004032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70320637938298,
            -1.3869790450141524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70106061217107,
            -1.3837184321929017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71268774289089,
            -1.383892970220685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.721592038397546,
            -1.3876469645774616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718485216465865,
            -1.3914054921629608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71987996515361,
            -1.3907619517196892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71993605925049,
            -1.3970686404841597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71620242430176,
            -1.3965538093818666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72422759367432,
            -1.3965109067849242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73156611753907,
            -1.3973904098658045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72997824980225,
            -1.3993210252296118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73356168104615,
            -1.4003721373708256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.716631577744145,
            -1.4311544966944727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715129540695806,
            -1.4321197905259957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.696151742041245,
            -1.425846885232334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687737749742475,
            -1.4305137711224603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69816617839238,
            -1.4315219671743227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.743421926808914,
            -1.4132401696587265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759107485128006,
            -1.404766951932299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75900019676741,
            -1.4030294022159673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.752262487722,
            -1.4017208762689426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75284184486922,
            -1.4055820982676135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76362520221715,
            -1.402857792297393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.763689575233506,
            -1.4019568400183715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77134996418004,
            -1.4040376102333307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.768453178443956,
            -1.4065259515635034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.774203834571885,
            -1.4064830491492393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.775705871620225,
            -1.397473524716891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77450424198155,
            -1.40028364200906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78107028965001,
            -1.3933548734519368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.773238239326524,
            -1.3912311910782191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.781928596534776,
            -1.3924324661913172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.776242313423204,
            -1.3890860554266249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77858119968419,
            -1.3897724990471632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.767702159919786,
            -1.3895150827128366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76224053403764,
            -1.3865794939086542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759322290629434,
            -1.3883599585252806
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC20": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.748965682983396, -1.3925778499643102]),
            {
              "LC20": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750982704162595, -1.3939078323290297]),
            {
              "LC20": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.755252780914304, -1.3880301626639215]),
            {
              "LC20": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74160570144653, -1.3934573545153957]),
            {
              "LC20": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74703449249267, -1.3920844692187706]),
            {
              "LC20": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75158351898193, -1.3943583100564831]),
            {
              "LC20": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76467269897461, -1.3950447521420475]),
            {
              "LC20": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76291316986084, -1.3968895642543344]),
            {
              "LC20": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76510185241699, -1.39714697978281]),
            {
              "LC20": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74965232849121, -1.3944870179627773]),
            {
              "LC20": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.742227973937986, -1.39161253971339]),
            {
              "LC20": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76660388946533, -1.392427690617902]),
            {
              "LC20": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73986825488798, -1.3959028044673583]),
            {
              "LC20": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72225857175801, -1.400042902533168]),
            {
              "LC20": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73755789197896, -1.3910977074179944]),
            {
              "LC20": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7549632513208, -1.393350524706072]),
            {
              "LC20": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.752366872994386, -1.3936079406218118]),
            {
              "LC20": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749405714241945, -1.396375159937939]),
            {
              "LC20": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.758117529122316, -1.3972117604854757]),
            {
              "LC20": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7635892355127, -1.3949593737176869]),
            {
              "LC20": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76144346830078, -1.3966969294145428]),
            {
              "LC20": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75801024076172, -1.398687848118901]),
            {
              "LC20": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71655401822754, -1.369664089675534]),
            {
              "LC20": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71779856321045, -1.3699000566187998]),
            {
              "LC20": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72176823255249, -1.3737184275579817]),
            {
              "LC20": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72003016111084, -1.3726029490374037]),
            {
              "LC20": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72314152356812, -1.3782446908220174]),
            {
              "LC20": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72763025757964, -1.3837231488668205]),
            {
              "LC20": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657871383785825, -1.3583036248809057]),
            {
              "LC20": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65675558483563, -1.3596765296188875]),
            {
              "LC20": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65845074093304, -1.361070885194192]),
            {
              "LC20": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65815033352337, -1.3695228078580488]),
            {
              "LC20": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65495314037762, -1.362379433539217]),
            {
              "LC20": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65701307690106, -1.360405884943403]),
            {
              "LC20": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656090396999936, -1.3630873364460558]),
            {
              "LC20": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68211039666555, -1.3902791904334078]),
            {
              "LC20": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6828399575176, -1.3918236875183534]),
            {
              "LC20": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686673149321535, -1.4284262553702063]),
            {
              "LC20": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68714521810816, -1.4296275112825627]),
            {
              "LC20": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68738125250147, -1.4303782959086233]),
            {
              "LC20": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69137237951563, -1.4269461356146258]),
            {
              "LC20": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.685428604338625, -1.424453218495723]),
            {
              "LC20": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.696928343122686, -1.4226555165303651]),
            {
              "LC20": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69763644630262, -1.4241999921754716]),
            {
              "LC20": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70350101335013, -1.4204823381510379]),
            {
              "LC20": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708565602428884, -1.4182085227647854]),
            {
              "LC20": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71011055482146, -1.4168785542389775]),
            {
              "LC20": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71225325964899, -1.4103590244704076]),
            {
              "LC20": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709098981847475, -1.4081495527422603]),
            {
              "LC20": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.782660428630464, -1.405766124062805]),
            {
              "LC20": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78877847419846, -1.4008537909143373]),
            {
              "LC20": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78431527839768, -1.4025055372725876]),
            {
              "LC20": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77307145820725, -1.400596375792553]),
            {
              "LC20": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.732945611344455, -1.4040714775486751]),
            {
              "LC20": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.780001719298205, -1.3070499217168645]),
            {
              "LC20": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.793477137389026, -1.3106538700890844]),
            {
              "LC20": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7966957882069, -1.3156307426449687]),
            {
              "LC20": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79785450250133, -1.313099403531587]),
            {
              "LC20": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79442127496227, -1.3177759432730178]),
            {
              "LC20": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.789743502440295, -1.311211623540735]),
            {
              "LC20": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79532249719127, -1.314000388933821]),
            {
              "LC20": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79283340722545, -1.3127132668311947]),
            {
              "LC20": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7876191929005, -1.3120911575773688]),
            {
              "LC20": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83435400277599, -1.3205432493537734]),
            {
              "LC20": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84405287057384, -1.3238897549163864]),
            {
              "LC20": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.859631140532336, -1.3286949857701973]),
            {
              "LC20": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.870660384001575, -1.319813882158372]),
            {
              "LC20": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.86975916177257, -1.3207148651333467]),
            {
              "LC20": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83478315621837, -1.3164244670924965]),
            {
              "LC20": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87529591070303, -1.314280603997204]),
            {
              "LC20": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.88035992132315, -1.3191716613832407]),
            {
              "LC20": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68416351318359, -1.3825386040803214]),
            {
              "LC20": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68691009521484, -1.3814660325600492]),
            {
              "LC20": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69649012800969, -1.3804149120004032]),
            {
              "LC20": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70320637938298, -1.3869790450141524]),
            {
              "LC20": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70106061217107, -1.3837184321929017]),
            {
              "LC20": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71268774289089, -1.383892970220685]),
            {
              "LC20": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.721592038397546, -1.3876469645774616]),
            {
              "LC20": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718485216465865, -1.3914054921629608]),
            {
              "LC20": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71987996515361, -1.3907619517196892]),
            {
              "LC20": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71993605925049, -1.3970686404841597]),
            {
              "LC20": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71620242430176, -1.3965538093818666]),
            {
              "LC20": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72422759367432, -1.3965109067849242]),
            {
              "LC20": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73156611753907, -1.3973904098658045]),
            {
              "LC20": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72997824980225, -1.3993210252296118]),
            {
              "LC20": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73356168104615, -1.4003721373708256]),
            {
              "LC20": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.716631577744145, -1.4311544966944727]),
            {
              "LC20": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715129540695806, -1.4321197905259957]),
            {
              "LC20": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.696151742041245, -1.425846885232334]),
            {
              "LC20": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687737749742475, -1.4305137711224603]),
            {
              "LC20": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69816617839238, -1.4315219671743227]),
            {
              "LC20": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.743421926808914, -1.4132401696587265]),
            {
              "LC20": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759107485128006, -1.404766951932299]),
            {
              "LC20": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75900019676741, -1.4030294022159673]),
            {
              "LC20": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([36.752262487722, -1.4017208762689426]),
            {
              "LC20": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75284184486922, -1.4055820982676135]),
            {
              "LC20": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76362520221715, -1.402857792297393]),
            {
              "LC20": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([36.763689575233506, -1.4019568400183715]),
            {
              "LC20": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77134996418004, -1.4040376102333307]),
            {
              "LC20": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([36.768453178443956, -1.4065259515635034]),
            {
              "LC20": 0,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([36.774203834571885, -1.4064830491492393]),
            {
              "LC20": 0,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([36.775705871620225, -1.397473524716891]),
            {
              "LC20": 0,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77450424198155, -1.40028364200906]),
            {
              "LC20": 0,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78107028965001, -1.3933548734519368]),
            {
              "LC20": 0,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([36.773238239326524, -1.3912311910782191]),
            {
              "LC20": 0,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([36.781928596534776, -1.3924324661913172]),
            {
              "LC20": 0,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([36.776242313423204, -1.3890860554266249]),
            {
              "LC20": 0,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77858119968419, -1.3897724990471632]),
            {
              "LC20": 0,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([36.767702159919786, -1.3895150827128366]),
            {
              "LC20": 0,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76224053403764, -1.3865794939086542]),
            {
              "LC20": 0,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759322290629434, -1.3883599585252806]),
            {
              "LC20": 0,
              "system:index": "110"
            })]),
    ForestedAreas20 = ui.import && ui.import("ForestedAreas20", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.704026062823864,
            -1.364269393624762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703768570758434,
            -1.3655135854967948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697245438434216,
            -1.3635829426612647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69707377705726,
            -1.3695035757736873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69488509450111,
            -1.370704861868719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68831904683265,
            -1.367744548619731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691752274371716,
            -1.367401323658811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708330817719414,
            -1.3697609942733353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705798812409355,
            -1.368731320108884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707343764801934,
            -1.3705761526730662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.649562531653906,
            -1.4034588958697871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64617221945908,
            -1.4038021156061502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65010975954694,
            -1.33279156750861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6815667068736,
            -1.3263130951714655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741662097550595,
            -1.3203065493742414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.737198901749814,
            -1.3201349335664758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750674319840634,
            -1.3244253252030374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744923663712704,
            -1.3244253252030374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.739687991715634,
            -1.3207355888418377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73402316627618,
            -1.3160161506297254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728186679459775,
            -1.3163593828012174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72801501808282,
            -1.3188478146306895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747498584367,
            -1.3245111329600803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73728473243829,
            -1.3170458470024253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.704239917374814,
            -1.3826880983202792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64836413917657,
            -1.3994201499957717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64742000160333,
            -1.399849175398319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.642527652360165,
            -1.395215696901463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63918025550958,
            -1.3982188784512306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64338595924493,
            -1.4067135711461798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64287097511407,
            -1.3880080455552641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64965159950372,
            -1.3814010125188627
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC20": 1
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
            ee.Geometry.Point([36.704026062823864, -1.364269393624762]),
            {
              "LC20": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703768570758434, -1.3655135854967948]),
            {
              "LC20": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697245438434216, -1.3635829426612647]),
            {
              "LC20": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69707377705726, -1.3695035757736873]),
            {
              "LC20": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69488509450111, -1.370704861868719]),
            {
              "LC20": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68831904683265, -1.367744548619731]),
            {
              "LC20": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691752274371716, -1.367401323658811]),
            {
              "LC20": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708330817719414, -1.3697609942733353]),
            {
              "LC20": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705798812409355, -1.368731320108884]),
            {
              "LC20": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707343764801934, -1.3705761526730662]),
            {
              "LC20": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.649562531653906, -1.4034588958697871]),
            {
              "LC20": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64617221945908, -1.4038021156061502]),
            {
              "LC20": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65010975954694, -1.33279156750861]),
            {
              "LC20": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6815667068736, -1.3263130951714655]),
            {
              "LC20": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741662097550595, -1.3203065493742414]),
            {
              "LC20": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.737198901749814, -1.3201349335664758]),
            {
              "LC20": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750674319840634, -1.3244253252030374]),
            {
              "LC20": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744923663712704, -1.3244253252030374]),
            {
              "LC20": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.739687991715634, -1.3207355888418377]),
            {
              "LC20": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73402316627618, -1.3160161506297254]),
            {
              "LC20": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728186679459775, -1.3163593828012174]),
            {
              "LC20": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72801501808282, -1.3188478146306895]),
            {
              "LC20": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747498584367, -1.3245111329600803]),
            {
              "LC20": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73728473243829, -1.3170458470024253]),
            {
              "LC20": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.704239917374814, -1.3826880983202792]),
            {
              "LC20": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64836413917657, -1.3994201499957717]),
            {
              "LC20": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64742000160333, -1.399849175398319]),
            {
              "LC20": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.642527652360165, -1.395215696901463]),
            {
              "LC20": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63918025550958, -1.3982188784512306]),
            {
              "LC20": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64338595924493, -1.4067135711461798]),
            {
              "LC20": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64287097511407, -1.3880080455552641]),
            {
              "LC20": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64965159950372, -1.3814010125188627]),
            {
              "LC20": 1,
              "system:index": "31"
            })]),
    Vegetation20 = ui.import && ui.import("Vegetation20", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.65222652015802,
            -1.3943576443255628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6541147953045,
            -1.3943576443255628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694167768288885,
            -1.3723054669922015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682151471902166,
            -1.3727344973074083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673482572366034,
            -1.3711041817002854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66756025486115,
            -1.3672429034673212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.688245450784,
            -1.3640680700444991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71244970493439,
            -1.40381082867859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71356550388459,
            -1.4014082894756494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724895154763495,
            -1.4248758430028656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722921048928534,
            -1.4158234875764357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723917132347076,
            -1.404926292469574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72936738106534,
            -1.4048025703831148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.772019723451685,
            -1.3960088057996538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.760351702099896,
            -1.3909046277946402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74250874369115,
            -1.389746254624588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.739032600807846,
            -1.3898320600640752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73898968546361,
            -1.3906472115837576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73010620920628,
            -1.3854559786790874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72971997110814,
            -1.3804363459613465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73668060683379,
            -1.3808523435396378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73861179732451,
            -1.381710401016264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73010866326084,
            -1.3770280898134009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72890703362217,
            -1.3781435662655244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73444311302891,
            -1.3838038796677405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76534216088047,
            -1.4019502161573816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75821821373692,
            -1.4069269006127556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75886194390049,
            -1.4058972426297323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76308910530796,
            -1.40471742563258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73978443618336,
            -1.403663042018519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.738733010249526,
            -1.4025475776248835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7239057588152,
            -1.3951254356405751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717554287867934,
            -1.3886596340071449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70768375869313,
            -1.3788293495648203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71815510268727,
            -1.3777996793086345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.753946499781996,
            -1.3917430927641585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76971475639055,
            -1.3895461034668164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764564915081955,
            -1.3899751306694814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.775315208813645,
            -1.393085575556025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690761361144126,
            -1.4090294037377453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68910912039095,
            -1.4091366596547579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.721473258591395,
            -1.417815637464809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717439216233,
            -1.4168288865287695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728189509964686,
            -1.4182446594797349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72801784858773,
            -1.4194459206983252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.726193946457606,
            -1.4213336156378755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73690132484506,
            -1.4226421305428159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73351101265023,
            -1.4219556965868256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73580698356698,
            -1.4181588550831006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759431880570155,
            -1.398745528937784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75537638053964,
            -1.3988098827716793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77669340613311,
            -1.4005357956015356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77853876593536,
            -1.399549037347307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7794829035086,
            -1.4006216006474865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78119951727813,
            -1.4012651383919812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77969748022979,
            -1.4033244579858064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77926832678741,
            -1.4037105802078687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77596384528106,
            -1.4021231884429284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77793795111602,
            -1.4016512609538159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7765646601004,
            -1.402638018322527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77793795111602,
            -1.4038821900638623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77780920508331,
            -1.4048260440466882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77506262305206,
            -1.402638018322527
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC20": 2
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
            ee.Geometry.Point([36.65222652015802, -1.3943576443255628]),
            {
              "LC20": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6541147953045, -1.3943576443255628]),
            {
              "LC20": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694167768288885, -1.3723054669922015]),
            {
              "LC20": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682151471902166, -1.3727344973074083]),
            {
              "LC20": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673482572366034, -1.3711041817002854]),
            {
              "LC20": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66756025486115, -1.3672429034673212]),
            {
              "LC20": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.688245450784, -1.3640680700444991]),
            {
              "LC20": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71244970493439, -1.40381082867859]),
            {
              "LC20": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71356550388459, -1.4014082894756494]),
            {
              "LC20": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724895154763495, -1.4248758430028656]),
            {
              "LC20": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722921048928534, -1.4158234875764357]),
            {
              "LC20": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723917132347076, -1.404926292469574]),
            {
              "LC20": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72936738106534, -1.4048025703831148]),
            {
              "LC20": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.772019723451685, -1.3960088057996538]),
            {
              "LC20": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.760351702099896, -1.3909046277946402]),
            {
              "LC20": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74250874369115, -1.389746254624588]),
            {
              "LC20": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.739032600807846, -1.3898320600640752]),
            {
              "LC20": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73898968546361, -1.3906472115837576]),
            {
              "LC20": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73010620920628, -1.3854559786790874]),
            {
              "LC20": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72971997110814, -1.3804363459613465]),
            {
              "LC20": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73668060683379, -1.3808523435396378]),
            {
              "LC20": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73861179732451, -1.381710401016264]),
            {
              "LC20": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73010866326084, -1.3770280898134009]),
            {
              "LC20": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72890703362217, -1.3781435662655244]),
            {
              "LC20": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73444311302891, -1.3838038796677405]),
            {
              "LC20": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76534216088047, -1.4019502161573816]),
            {
              "LC20": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75821821373692, -1.4069269006127556]),
            {
              "LC20": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75886194390049, -1.4058972426297323]),
            {
              "LC20": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76308910530796, -1.40471742563258]),
            {
              "LC20": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73978443618336, -1.403663042018519]),
            {
              "LC20": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.738733010249526, -1.4025475776248835]),
            {
              "LC20": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7239057588152, -1.3951254356405751]),
            {
              "LC20": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717554287867934, -1.3886596340071449]),
            {
              "LC20": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70768375869313, -1.3788293495648203]),
            {
              "LC20": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71815510268727, -1.3777996793086345]),
            {
              "LC20": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.753946499781996, -1.3917430927641585]),
            {
              "LC20": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76971475639055, -1.3895461034668164]),
            {
              "LC20": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764564915081955, -1.3899751306694814]),
            {
              "LC20": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.775315208813645, -1.393085575556025]),
            {
              "LC20": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690761361144126, -1.4090294037377453]),
            {
              "LC20": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68910912039095, -1.4091366596547579]),
            {
              "LC20": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.721473258591395, -1.417815637464809]),
            {
              "LC20": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717439216233, -1.4168288865287695]),
            {
              "LC20": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728189509964686, -1.4182446594797349]),
            {
              "LC20": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72801784858773, -1.4194459206983252]),
            {
              "LC20": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.726193946457606, -1.4213336156378755]),
            {
              "LC20": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73690132484506, -1.4226421305428159]),
            {
              "LC20": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73351101265023, -1.4219556965868256]),
            {
              "LC20": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73580698356698, -1.4181588550831006]),
            {
              "LC20": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759431880570155, -1.398745528937784]),
            {
              "LC20": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75537638053964, -1.3988098827716793]),
            {
              "LC20": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77669340613311, -1.4005357956015356]),
            {
              "LC20": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77853876593536, -1.399549037347307]),
            {
              "LC20": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7794829035086, -1.4006216006474865]),
            {
              "LC20": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78119951727813, -1.4012651383919812]),
            {
              "LC20": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77969748022979, -1.4033244579858064]),
            {
              "LC20": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77926832678741, -1.4037105802078687]),
            {
              "LC20": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77596384528106, -1.4021231884429284]),
            {
              "LC20": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77793795111602, -1.4016512609538159]),
            {
              "LC20": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7765646601004, -1.402638018322527]),
            {
              "LC20": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77793795111602, -1.4038821900638623]),
            {
              "LC20": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77780920508331, -1.4048260440466882]),
            {
              "LC20": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77506262305206, -1.402638018322527]),
            {
              "LC20": 2,
              "system:index": "62"
            })]),
    NonBuilt_Up20 = ui.import && ui.import("NonBuilt_Up20", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.73795897347105,
            -1.3849757301715722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.737401073995954,
            -1.3859624945279876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73710066658629,
            -1.386520230721503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.735126560751326,
            -1.3854905638001163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74001890999449,
            -1.3864773279420477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74628455025328,
            -1.387893119253261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65900031225277,
            -1.3465178008353225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65953675405575,
            -1.345595375548324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66005173818661,
            -1.3443297216799164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656189357205164,
            -1.3372753087717666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65558854238583,
            -1.3360740061175587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656403933926356,
            -1.334658184378131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656210814877284,
            -1.335923843244475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66378537313534,
            -1.328844725973237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663399135037196,
            -1.329273763962257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66427889959408,
            -1.3298100613437074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66333476202084,
            -1.330110387826427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66299143926693,
            -1.329381023447865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66296998159481,
            -1.3304965218219231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66404286520077,
            -1.3304107142725832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6584640386353,
            -1.3347933592626091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.660352313781786,
            -1.3348791666592443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65970858361821,
            -1.3339781888451905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6599231603394,
            -1.3361233735739648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.678076350952196,
            -1.3417866522491666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66114967139336,
            -1.4046872355637603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66121404440972,
            -1.4050948087808752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72307718477342,
            -1.4025737280425898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72309864244554,
            -1.4038178998181223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72344196519945,
            -1.403002752867523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.50909690953712,
            -1.233886520915619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.50858192540626,
            -1.2359459789886957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.515019227042,
            -1.2385202993338449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.51707916356544,
            -1.2414378593684143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.51716499425392,
            -1.2434115010960982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.53415947057228,
            -1.2463290557290043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.534931946768566,
            -1.2514776736623834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.47463588811378,
            -1.2159949120990268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.464035798086925,
            -1.2180543839348599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.47038726903419,
            -1.219212836150983
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC20": 3
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
            ee.Geometry.Point([36.73795897347105, -1.3849757301715722]),
            {
              "LC20": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.737401073995954, -1.3859624945279876]),
            {
              "LC20": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73710066658629, -1.386520230721503]),
            {
              "LC20": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.735126560751326, -1.3854905638001163]),
            {
              "LC20": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74001890999449, -1.3864773279420477]),
            {
              "LC20": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74628455025328, -1.387893119253261]),
            {
              "LC20": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65900031225277, -1.3465178008353225]),
            {
              "LC20": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65953675405575, -1.345595375548324]),
            {
              "LC20": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66005173818661, -1.3443297216799164]),
            {
              "LC20": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656189357205164, -1.3372753087717666]),
            {
              "LC20": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65558854238583, -1.3360740061175587]),
            {
              "LC20": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656403933926356, -1.334658184378131]),
            {
              "LC20": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656210814877284, -1.335923843244475]),
            {
              "LC20": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66378537313534, -1.328844725973237]),
            {
              "LC20": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663399135037196, -1.329273763962257]),
            {
              "LC20": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66427889959408, -1.3298100613437074]),
            {
              "LC20": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66333476202084, -1.330110387826427]),
            {
              "LC20": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66299143926693, -1.329381023447865]),
            {
              "LC20": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66296998159481, -1.3304965218219231]),
            {
              "LC20": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66404286520077, -1.3304107142725832]),
            {
              "LC20": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6584640386353, -1.3347933592626091]),
            {
              "LC20": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.660352313781786, -1.3348791666592443]),
            {
              "LC20": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65970858361821, -1.3339781888451905]),
            {
              "LC20": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6599231603394, -1.3361233735739648]),
            {
              "LC20": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.678076350952196, -1.3417866522491666]),
            {
              "LC20": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66114967139336, -1.4046872355637603]),
            {
              "LC20": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66121404440972, -1.4050948087808752]),
            {
              "LC20": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72307718477342, -1.4025737280425898]),
            {
              "LC20": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72309864244554, -1.4038178998181223]),
            {
              "LC20": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72344196519945, -1.403002752867523]),
            {
              "LC20": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.50909690953712, -1.233886520915619]),
            {
              "LC20": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.50858192540626, -1.2359459789886957]),
            {
              "LC20": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.515019227042, -1.2385202993338449]),
            {
              "LC20": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.51707916356544, -1.2414378593684143]),
            {
              "LC20": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.51716499425392, -1.2434115010960982]),
            {
              "LC20": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.53415947057228, -1.2463290557290043]),
            {
              "LC20": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.534931946768566, -1.2514776736623834]),
            {
              "LC20": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.47463588811378, -1.2159949120990268]),
            {
              "LC20": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.464035798086925, -1.2180543839348599]),
            {
              "LC20": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.47038726903419, -1.219212836150983]),
            {
              "LC20": 3,
              "system:index": "39"
            })]),
    Water20 = ui.import && ui.import("Water20", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69443595817382,
            -1.4369066407060154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69301975181396,
            -1.43583409422237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69546592643554,
            -1.43883722310719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69495094230468,
            -1.4402529824963846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6939638893872,
            -1.442054856810444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69246185233886,
            -1.4426554812648826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6948651116162,
            -1.4422264638135947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69413555076415,
            -1.444371550260723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69426429679687,
            -1.4463879296747213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6939638893872,
            -1.4487904219562109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69323432853515,
            -1.4497771591196598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69263351371581,
            -1.4507638958530213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.97689789848024,
            -1.1176612938054509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.979472819134536,
            -1.117747108163137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.98058861808473,
            -1.1181761799139232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.98183316306764,
            -1.1182190870855464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.98213357047731,
            -1.1194204876364642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.98264855460817,
            -1.1201499091593907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.98419350700075,
            -1.1215658445384213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.985223475262465,
            -1.1220378228459023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.98312062339479,
            -1.1204931662838356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.96988504634144,
            -1.1174038507173671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.971215422012826,
            -1.1181332727416637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.968726332047005,
            -1.1175325722642333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39911087314024,
            -0.7344903105148043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.40752228061094,
            -0.730885716346032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.41627701083555,
            -0.7375799603460943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.412672121919535,
            -0.7468488969346728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.4190235928668,
            -0.75697604603884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.42074020663633,
            -0.7444458411677196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.399969180025,
            -0.7441025473797234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.387952883638285,
            -0.7454757223713067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39104278842344,
            -0.736721724496608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.384176333345316,
            -0.76006568005486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38383301059141,
            -0.7804915377967188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38486297885313,
            -0.772080902357073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39190109530821,
            -0.7662449414471104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.390184481538675,
            -0.7763720449777965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.380228121675394,
            -0.786155833830107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39979751864805,
            -0.7808348286831331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.409410555757425,
            -0.7686479851410088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.48109300284816,
            -0.8959185362597621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.46000159551704,
            -0.868850666830875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.545832283993605,
            -0.885328228114593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.56265509893501,
            -0.8863580732775592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.53621924688423,
            -0.9193129654692138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.51424659063423,
            -0.9107309911431697
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC20": 4
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
            ee.Geometry.Point([36.69443595817382, -1.4369066407060154]),
            {
              "LC20": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69301975181396, -1.43583409422237]),
            {
              "LC20": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69546592643554, -1.43883722310719]),
            {
              "LC20": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69495094230468, -1.4402529824963846]),
            {
              "LC20": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6939638893872, -1.442054856810444]),
            {
              "LC20": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69246185233886, -1.4426554812648826]),
            {
              "LC20": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6948651116162, -1.4422264638135947]),
            {
              "LC20": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69413555076415, -1.444371550260723]),
            {
              "LC20": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69426429679687, -1.4463879296747213]),
            {
              "LC20": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6939638893872, -1.4487904219562109]),
            {
              "LC20": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69323432853515, -1.4497771591196598]),
            {
              "LC20": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69263351371581, -1.4507638958530213]),
            {
              "LC20": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.97689789848024, -1.1176612938054509]),
            {
              "LC20": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.979472819134536, -1.117747108163137]),
            {
              "LC20": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.98058861808473, -1.1181761799139232]),
            {
              "LC20": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.98183316306764, -1.1182190870855464]),
            {
              "LC20": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.98213357047731, -1.1194204876364642]),
            {
              "LC20": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.98264855460817, -1.1201499091593907]),
            {
              "LC20": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.98419350700075, -1.1215658445384213]),
            {
              "LC20": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.985223475262465, -1.1220378228459023]),
            {
              "LC20": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.98312062339479, -1.1204931662838356]),
            {
              "LC20": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.96988504634144, -1.1174038507173671]),
            {
              "LC20": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.971215422012826, -1.1181332727416637]),
            {
              "LC20": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.968726332047005, -1.1175325722642333]),
            {
              "LC20": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39911087314024, -0.7344903105148043]),
            {
              "LC20": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.40752228061094, -0.730885716346032]),
            {
              "LC20": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.41627701083555, -0.7375799603460943]),
            {
              "LC20": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.412672121919535, -0.7468488969346728]),
            {
              "LC20": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.4190235928668, -0.75697604603884]),
            {
              "LC20": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.42074020663633, -0.7444458411677196]),
            {
              "LC20": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.399969180025, -0.7441025473797234]),
            {
              "LC20": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.387952883638285, -0.7454757223713067]),
            {
              "LC20": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39104278842344, -0.736721724496608]),
            {
              "LC20": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.384176333345316, -0.76006568005486]),
            {
              "LC20": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38383301059141, -0.7804915377967188]),
            {
              "LC20": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38486297885313, -0.772080902357073]),
            {
              "LC20": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39190109530821, -0.7662449414471104]),
            {
              "LC20": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.390184481538675, -0.7763720449777965]),
            {
              "LC20": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.380228121675394, -0.786155833830107]),
            {
              "LC20": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39979751864805, -0.7808348286831331]),
            {
              "LC20": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.409410555757425, -0.7686479851410088]),
            {
              "LC20": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([37.48109300284816, -0.8959185362597621]),
            {
              "LC20": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([37.46000159551704, -0.868850666830875]),
            {
              "LC20": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([37.545832283993605, -0.885328228114593]),
            {
              "LC20": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([37.56265509893501, -0.8863580732775592]),
            {
              "LC20": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([37.53621924688423, -0.9193129654692138]),
            {
              "LC20": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([37.51424659063423, -0.9107309911431697]),
            {
              "LC20": 4,
              "system:index": "46"
            })]),
    vizParamsTrueL8 = ui.import && ui.import("vizParamsTrueL8", "imageVisParam", {
      "params": {
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0,
        "max": 0.5,
        "gamma": [
          0.95,
          1.1,
          1
        ]
      }
    }) || {"bands":["B4","B3","B2"],"min":0,"max":0.5,"gamma":[0.95,1.1,1]},
    vizParamsFalseL8 = ui.import && ui.import("vizParamsFalseL8", "imageVisParam", {
      "params": {
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 0,
        "max": 0.5,
        "gamma": [
          0.95,
          1.1,
          1
        ]
      }
    }) || {"bands":["B5","B4","B3"],"min":0,"max":0.5,"gamma":[0.95,1.1,1]},
    vizParamsTrue = ui.import && ui.import("vizParamsTrue", "imageVisParam", {
      "params": {
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 0,
        "max": 0.5,
        "gamma": [
          0.95,
          1.1,
          1
        ]
      }
    }) || {"bands":["B3","B2","B1"],"min":0,"max":0.5,"gamma":[0.95,1.1,1]},
    vizParamsFalse = ui.import && ui.import("vizParamsFalse", "imageVisParam", {
      "params": {
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0,
        "max": 0.5,
        "gamma": [
          0.95,
          1.1,
          1
        ]
      }
    }) || {"bands":["B4","B3","B2"],"min":0,"max":0.5,"gamma":[0.95,1.1,1]},
    BuiltUp05 = ui.import && ui.import("BuiltUp05", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.745603260984645,
            -1.3915417550557063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74916523455642,
            -1.3929575433309658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74989479540847,
            -1.390469187614699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75813454150222,
            -1.390705152493543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750109372129664,
            -1.3928931893368979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7534104127864,
            -1.3969777687201388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75601770455225,
            -1.396795486397432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76151086861475,
            -1.392902072937703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74179744626515,
            -1.4000351200495789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73508119489186,
            -1.3940073064350642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73757028485768,
            -1.396088083700728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76506291342404,
            -1.393785681624681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748620118361835,
            -1.396597837404063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74383505747927,
            -1.3965763861060816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75125865268271,
            -1.3970148323523195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72297842909535,
            -1.3749023451183604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.721047238604626,
            -1.3758247591980637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720596627490124,
            -1.3728000977448387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73400319795486,
            -1.3889144324448257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73106915047709,
            -1.3874624005585656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85609408388441,
            -1.3289898840805956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.854935369589974,
            -1.3302126420808933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.881423252505094,
            -1.3242027672163328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.860026114035726,
            -1.3134047049982718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.86796545271981,
            -1.3151208671794026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8621289659034,
            -1.318553187999875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.88817857985604,
            -1.3221142158487833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.88171845903779,
            -1.3272539965725332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83662036366499,
            -1.2945427992223413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83816531605757,
            -1.2957441218791976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84018233723677,
            -1.3007210239537461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82571986622847,
            -1.3015791095272908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.855661873336615,
            -1.305064811342089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85476065110761,
            -1.304035110043486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.851670746322455,
            -1.310813969168512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.854159836288275,
            -1.3110713938374816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.852274598614144,
            -1.3031703757398128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87200612368499,
            -1.3095416479450288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75227692050077,
            -1.3986489314359847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75389850077379,
            -1.39045430465278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74849116739977,
            -1.388952709407207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.768339514109975,
            -1.3900467288948217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.775826833082675,
            -1.3956418183441424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74475536456629,
            -1.3987519021672485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74728736987635,
            -1.3949121202306642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718135258364605,
            -1.4131848208500541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72080923108489,
            -1.4110646057848155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711228987807765,
            -1.4090482829691058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711443564528956,
            -1.408469100936522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709504737048356,
            -1.4045676374970164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706255909095056,
            -1.4010583508202954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728341563041255,
            -1.3943344545883753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73514364510302,
            -1.3950852506168008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75130274667029,
            -1.3902157978329313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75961708846889,
            -1.38809249827005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76326678639333,
            -1.3980244109349804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78275243888468,
            -1.395977247207669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749327587039154,
            -1.408377824486077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71156733421226,
            -1.414086993975563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72049117618132,
            -1.3950599554898397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68710489828691,
            -1.4290635307181527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692233281923386,
            -1.4262748992741907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69161100943193,
            -1.4267897237953182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730512084960935,
            -1.3785057326528012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731499137878416,
            -1.3789776647688956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73343032836914,
            -1.3795783055085755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72381729125976,
            -1.378033800443173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73640918801057,
            -1.390508336628649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73087310860383,
            -1.3884490058101884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769079068804814,
            -1.377208460208267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74517522206409,
            -1.373561706903405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74672017445667,
            -1.3690997894084211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73156785577658,
            -1.3866464276509933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734271522463594,
            -1.3869896498403145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73309135049704,
            -1.3877618995842356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73294114679221,
            -1.3888559196231423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728766997417665,
            -1.3797667137516922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72898157413886,
            -1.3807963831567234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73086984928534,
            -1.3825554006916645
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC05": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.745603260984645, -1.3915417550557063]),
            {
              "LC05": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74916523455642, -1.3929575433309658]),
            {
              "LC05": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74989479540847, -1.390469187614699]),
            {
              "LC05": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75813454150222, -1.390705152493543]),
            {
              "LC05": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750109372129664, -1.3928931893368979]),
            {
              "LC05": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7534104127864, -1.3969777687201388]),
            {
              "LC05": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75601770455225, -1.396795486397432]),
            {
              "LC05": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76151086861475, -1.392902072937703]),
            {
              "LC05": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74179744626515, -1.4000351200495789]),
            {
              "LC05": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73508119489186, -1.3940073064350642]),
            {
              "LC05": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73757028485768, -1.396088083700728]),
            {
              "LC05": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76506291342404, -1.393785681624681]),
            {
              "LC05": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748620118361835, -1.396597837404063]),
            {
              "LC05": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74383505747927, -1.3965763861060816]),
            {
              "LC05": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75125865268271, -1.3970148323523195]),
            {
              "LC05": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72297842909535, -1.3749023451183604]),
            {
              "LC05": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.721047238604626, -1.3758247591980637]),
            {
              "LC05": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720596627490124, -1.3728000977448387]),
            {
              "LC05": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73400319795486, -1.3889144324448257]),
            {
              "LC05": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73106915047709, -1.3874624005585656]),
            {
              "LC05": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85609408388441, -1.3289898840805956]),
            {
              "LC05": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.854935369589974, -1.3302126420808933]),
            {
              "LC05": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.881423252505094, -1.3242027672163328]),
            {
              "LC05": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.860026114035726, -1.3134047049982718]),
            {
              "LC05": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.86796545271981, -1.3151208671794026]),
            {
              "LC05": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8621289659034, -1.318553187999875]),
            {
              "LC05": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.88817857985604, -1.3221142158487833]),
            {
              "LC05": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.88171845903779, -1.3272539965725332]),
            {
              "LC05": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83662036366499, -1.2945427992223413]),
            {
              "LC05": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83816531605757, -1.2957441218791976]),
            {
              "LC05": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84018233723677, -1.3007210239537461]),
            {
              "LC05": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82571986622847, -1.3015791095272908]),
            {
              "LC05": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.855661873336615, -1.305064811342089]),
            {
              "LC05": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85476065110761, -1.304035110043486]),
            {
              "LC05": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.851670746322455, -1.310813969168512]),
            {
              "LC05": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.854159836288275, -1.3110713938374816]),
            {
              "LC05": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.852274598614144, -1.3031703757398128]),
            {
              "LC05": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87200612368499, -1.3095416479450288]),
            {
              "LC05": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75227692050077, -1.3986489314359847]),
            {
              "LC05": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75389850077379, -1.39045430465278]),
            {
              "LC05": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74849116739977, -1.388952709407207]),
            {
              "LC05": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.768339514109975, -1.3900467288948217]),
            {
              "LC05": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.775826833082675, -1.3956418183441424]),
            {
              "LC05": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74475536456629, -1.3987519021672485]),
            {
              "LC05": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74728736987635, -1.3949121202306642]),
            {
              "LC05": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718135258364605, -1.4131848208500541]),
            {
              "LC05": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72080923108489, -1.4110646057848155]),
            {
              "LC05": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711228987807765, -1.4090482829691058]),
            {
              "LC05": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711443564528956, -1.408469100936522]),
            {
              "LC05": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709504737048356, -1.4045676374970164]),
            {
              "LC05": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706255909095056, -1.4010583508202954]),
            {
              "LC05": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728341563041255, -1.3943344545883753]),
            {
              "LC05": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73514364510302, -1.3950852506168008]),
            {
              "LC05": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75130274667029, -1.3902157978329313]),
            {
              "LC05": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75961708846889, -1.38809249827005]),
            {
              "LC05": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76326678639333, -1.3980244109349804]),
            {
              "LC05": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78275243888468, -1.395977247207669]),
            {
              "LC05": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749327587039154, -1.408377824486077]),
            {
              "LC05": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71156733421226, -1.414086993975563]),
            {
              "LC05": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72049117618132, -1.3950599554898397]),
            {
              "LC05": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68710489828691, -1.4290635307181527]),
            {
              "LC05": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692233281923386, -1.4262748992741907]),
            {
              "LC05": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69161100943193, -1.4267897237953182]),
            {
              "LC05": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730512084960935, -1.3785057326528012]),
            {
              "LC05": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731499137878416, -1.3789776647688956]),
            {
              "LC05": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73343032836914, -1.3795783055085755]),
            {
              "LC05": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72381729125976, -1.378033800443173]),
            {
              "LC05": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73640918801057, -1.390508336628649]),
            {
              "LC05": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73087310860383, -1.3884490058101884]),
            {
              "LC05": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769079068804814, -1.377208460208267]),
            {
              "LC05": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74517522206409, -1.373561706903405]),
            {
              "LC05": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74672017445667, -1.3690997894084211]),
            {
              "LC05": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73156785577658, -1.3866464276509933]),
            {
              "LC05": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734271522463594, -1.3869896498403145]),
            {
              "LC05": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73309135049704, -1.3877618995842356]),
            {
              "LC05": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73294114679221, -1.3888559196231423]),
            {
              "LC05": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728766997417665, -1.3797667137516922]),
            {
              "LC05": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72898157413886, -1.3807963831567234]),
            {
              "LC05": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73086984928534, -1.3825554006916645]),
            {
              "LC05": 0,
              "system:index": "78"
            })]),
    ForestedAreas05 = ui.import && ui.import("ForestedAreas05", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.70056252733621,
            -1.360920114188036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6998758818284,
            -1.3587320480195726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70159249559793,
            -1.3535059387666133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703180363334745,
            -1.3563804628709353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712729106499836,
            -1.362290553891983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714016566826984,
            -1.3633202308165833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71637691076009,
            -1.3657657117469195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70513309056966,
            -1.3644580071672385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70783675725667,
            -1.3647154262078733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70792258794515,
            -1.3678473556605169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70783675725667,
            -1.3713654085264546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71092666204183,
            -1.3702499289087124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69865287358968,
            -1.368705417811248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70963920171468,
            -1.3618409120246555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698738704278156,
            -1.3546331599080774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.639094330684046,
            -1.4081593783838977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.643600441829065,
            -1.405842648507006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64115426720748,
            -1.4015953044312426
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64756064346548,
            -1.4039301659567198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65189509323355,
            -1.4028576041720873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73678412795322,
            -1.3193420800935045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74013152480381,
            -1.3208866224294993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.742448953392675,
            -1.320114351381447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762861512779544,
            -1.3162378520713374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75925662386353,
            -1.3210430977401209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76612307894165,
            -1.320013403020877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76526477205689,
            -1.3208714819832061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73437470530846,
            -1.310931598820624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.825615637889946,
            -1.2356615086102138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.828662627330864,
            -1.2377209653069756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83179544746026,
            -1.2384074505172737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83179544746026,
            -1.239823325701877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82651686011895,
            -1.2398662309986777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82557272254571,
            -1.2416682528363667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80339512479054,
            -1.2398923715906838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80845913541066,
            -1.2426812143629122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80991825711476,
            -1.245856201011119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80373844754445,
            -1.2474865980739012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80094895016896,
            -1.2453842437782605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79845986020314,
            -1.2407504773723024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70592739173278,
            -1.3643223690502506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710776825631704,
            -1.3617052737602553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71060516425475,
            -1.3603752734251857
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC05": 1
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
            ee.Geometry.Point([36.70056252733621, -1.360920114188036]),
            {
              "LC05": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6998758818284, -1.3587320480195726]),
            {
              "LC05": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70159249559793, -1.3535059387666133]),
            {
              "LC05": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703180363334745, -1.3563804628709353]),
            {
              "LC05": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712729106499836, -1.362290553891983]),
            {
              "LC05": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714016566826984, -1.3633202308165833]),
            {
              "LC05": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71637691076009, -1.3657657117469195]),
            {
              "LC05": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70513309056966, -1.3644580071672385]),
            {
              "LC05": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70783675725667, -1.3647154262078733]),
            {
              "LC05": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70792258794515, -1.3678473556605169]),
            {
              "LC05": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70783675725667, -1.3713654085264546]),
            {
              "LC05": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71092666204183, -1.3702499289087124]),
            {
              "LC05": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69865287358968, -1.368705417811248]),
            {
              "LC05": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70963920171468, -1.3618409120246555]),
            {
              "LC05": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698738704278156, -1.3546331599080774]),
            {
              "LC05": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.639094330684046, -1.4081593783838977]),
            {
              "LC05": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.643600441829065, -1.405842648507006]),
            {
              "LC05": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64115426720748, -1.4015953044312426]),
            {
              "LC05": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64756064346548, -1.4039301659567198]),
            {
              "LC05": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65189509323355, -1.4028576041720873]),
            {
              "LC05": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73678412795322, -1.3193420800935045]),
            {
              "LC05": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74013152480381, -1.3208866224294993]),
            {
              "LC05": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.742448953392675, -1.320114351381447]),
            {
              "LC05": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762861512779544, -1.3162378520713374]),
            {
              "LC05": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75925662386353, -1.3210430977401209]),
            {
              "LC05": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76612307894165, -1.320013403020877]),
            {
              "LC05": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76526477205689, -1.3208714819832061]),
            {
              "LC05": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73437470530846, -1.310931598820624]),
            {
              "LC05": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.825615637889946, -1.2356615086102138]),
            {
              "LC05": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.828662627330864, -1.2377209653069756]),
            {
              "LC05": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83179544746026, -1.2384074505172737]),
            {
              "LC05": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83179544746026, -1.239823325701877]),
            {
              "LC05": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82651686011895, -1.2398662309986777]),
            {
              "LC05": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82557272254571, -1.2416682528363667]),
            {
              "LC05": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80339512479054, -1.2398923715906838]),
            {
              "LC05": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80845913541066, -1.2426812143629122]),
            {
              "LC05": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80991825711476, -1.245856201011119]),
            {
              "LC05": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80373844754445, -1.2474865980739012]),
            {
              "LC05": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80094895016896, -1.2453842437782605]),
            {
              "LC05": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79845986020314, -1.2407504773723024]),
            {
              "LC05": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70592739173278, -1.3643223690502506]),
            {
              "LC05": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710776825631704, -1.3617052737602553]),
            {
              "LC05": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71060516425475, -1.3603752734251857]),
            {
              "LC05": 1,
              "system:index": "42"
            })]),
    Vegetation05 = ui.import && ui.import("Vegetation05", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.65820552893981,
            -1.3397917127465475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65730564270508,
            -1.3415071887989831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6658457962085,
            -1.3398339485433688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66739074860108,
            -1.3444246306093834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663528367619634,
            -1.338804261664065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68138115082276,
            -1.3721830558946198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67957870636475,
            -1.3731269225347684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.696023116630364,
            -1.3751940978035395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69555104784374,
            -1.3834743592262595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717644175394476,
            -1.3859293241617254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71936078916401,
            -1.3868731853485206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741095217997334,
            -1.391870857833375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74126687937429,
            -1.3940588935946923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74637380533864,
            -1.3909699013413652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74538675242116,
            -1.3900689445053593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746287974650166,
            -1.3860789886736704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759206568623135,
            -1.3911096038667512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7571466320997,
            -1.3900370362293384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75530127229745,
            -1.391238311950482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75392798128183,
            -1.39359795890715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.755429884099776,
            -1.4017491799799018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75225414862614,
            -1.401920789979771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7489251061481,
            -1.4056746229044412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75424660883365,
            -1.4079484505608792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.758280651192045,
            -1.4070904026490079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769452093706505,
            -1.3996119235194098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76906585560836,
            -1.4022289770390786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76812171803512,
            -1.4039021736579278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77224159108199,
            -1.395836496904012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77009582387008,
            -1.3970806722545515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68920014660536,
            -1.4090699918998406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69065926830946,
            -1.4076113109635389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691002591063366,
            -1.4093274060879157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69808362286268,
            -1.4096277226047238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.653026036129646,
            -1.4058807563266495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64985030065601,
            -1.4062239757072228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.655257634030036,
            -1.408111681397875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64736121069019,
            -1.3963563984313752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63989394079273,
            -1.3981583069471477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64099260387061,
            -1.3915170406700412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68013892786926,
            -1.3861127249908478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67872880315702,
            -1.3948956440636275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68705437993925,
            -1.3951101571879023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6397568856919,
            -1.384123391977674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.651944843455574,
            -1.3826646955653656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65134402863624,
            -1.3814634154939103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72995549675005,
            -1.4073312421782675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.726350607834036,
            -1.4047141943683814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73999768730181,
            -1.4060441698515382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71447587562174,
            -1.421660599292288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71666455817789,
            -1.4211672246972669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72527082475097,
            -1.4206081792215721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723682957014155,
            -1.4190637011736331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72606475861938,
            -1.420929945351647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72381170304687,
            -1.4253917643973568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69385236414408,
            -1.416058460521175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.695955216011754,
            -1.416101362758791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72622055053711,
            -1.3999570974660218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744759979248045,
            -1.400514830346277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73115581512451,
            -1.4008580505143178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750467720031736,
            -1.395666840109095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73343032836914,
            -1.3964390870116739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73317283630371,
            -1.3949803982050386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728795471191404,
            -1.3912049641554631
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC05": 2
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
            ee.Geometry.Point([36.65820552893981, -1.3397917127465475]),
            {
              "LC05": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65730564270508, -1.3415071887989831]),
            {
              "LC05": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6658457962085, -1.3398339485433688]),
            {
              "LC05": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66739074860108, -1.3444246306093834]),
            {
              "LC05": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663528367619634, -1.338804261664065]),
            {
              "LC05": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68138115082276, -1.3721830558946198]),
            {
              "LC05": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67957870636475, -1.3731269225347684]),
            {
              "LC05": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.696023116630364, -1.3751940978035395]),
            {
              "LC05": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69555104784374, -1.3834743592262595]),
            {
              "LC05": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717644175394476, -1.3859293241617254]),
            {
              "LC05": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71936078916401, -1.3868731853485206]),
            {
              "LC05": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741095217997334, -1.391870857833375]),
            {
              "LC05": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74126687937429, -1.3940588935946923]),
            {
              "LC05": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74637380533864, -1.3909699013413652]),
            {
              "LC05": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74538675242116, -1.3900689445053593]),
            {
              "LC05": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746287974650166, -1.3860789886736704]),
            {
              "LC05": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759206568623135, -1.3911096038667512]),
            {
              "LC05": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7571466320997, -1.3900370362293384]),
            {
              "LC05": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75530127229745, -1.391238311950482]),
            {
              "LC05": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75392798128183, -1.39359795890715]),
            {
              "LC05": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.755429884099776, -1.4017491799799018]),
            {
              "LC05": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75225414862614, -1.401920789979771]),
            {
              "LC05": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7489251061481, -1.4056746229044412]),
            {
              "LC05": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75424660883365, -1.4079484505608792]),
            {
              "LC05": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.758280651192045, -1.4070904026490079]),
            {
              "LC05": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769452093706505, -1.3996119235194098]),
            {
              "LC05": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76906585560836, -1.4022289770390786]),
            {
              "LC05": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76812171803512, -1.4039021736579278]),
            {
              "LC05": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77224159108199, -1.395836496904012]),
            {
              "LC05": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77009582387008, -1.3970806722545515]),
            {
              "LC05": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68920014660536, -1.4090699918998406]),
            {
              "LC05": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69065926830946, -1.4076113109635389]),
            {
              "LC05": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691002591063366, -1.4093274060879157]),
            {
              "LC05": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69808362286268, -1.4096277226047238]),
            {
              "LC05": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.653026036129646, -1.4058807563266495]),
            {
              "LC05": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64985030065601, -1.4062239757072228]),
            {
              "LC05": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.655257634030036, -1.408111681397875]),
            {
              "LC05": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64736121069019, -1.3963563984313752]),
            {
              "LC05": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63989394079273, -1.3981583069471477]),
            {
              "LC05": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64099260387061, -1.3915170406700412]),
            {
              "LC05": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68013892786926, -1.3861127249908478]),
            {
              "LC05": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67872880315702, -1.3948956440636275]),
            {
              "LC05": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68705437993925, -1.3951101571879023]),
            {
              "LC05": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6397568856919, -1.384123391977674]),
            {
              "LC05": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.651944843455574, -1.3826646955653656]),
            {
              "LC05": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65134402863624, -1.3814634154939103]),
            {
              "LC05": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72995549675005, -1.4073312421782675]),
            {
              "LC05": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.726350607834036, -1.4047141943683814]),
            {
              "LC05": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73999768730181, -1.4060441698515382]),
            {
              "LC05": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71447587562174, -1.421660599292288]),
            {
              "LC05": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71666455817789, -1.4211672246972669]),
            {
              "LC05": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72527082475097, -1.4206081792215721]),
            {
              "LC05": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723682957014155, -1.4190637011736331]),
            {
              "LC05": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72606475861938, -1.420929945351647]),
            {
              "LC05": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72381170304687, -1.4253917643973568]),
            {
              "LC05": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69385236414408, -1.416058460521175]),
            {
              "LC05": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.695955216011754, -1.416101362758791]),
            {
              "LC05": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72622055053711, -1.3999570974660218]),
            {
              "LC05": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744759979248045, -1.400514830346277]),
            {
              "LC05": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73115581512451, -1.4008580505143178]),
            {
              "LC05": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750467720031736, -1.395666840109095]),
            {
              "LC05": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73343032836914, -1.3964390870116739]),
            {
              "LC05": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73317283630371, -1.3949803982050386]),
            {
              "LC05": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728795471191404, -1.3912049641554631]),
            {
              "LC05": 2,
              "system:index": "63"
            })]),
    Water05 = ui.import && ui.import("Water05", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.34360565809423,
            -0.7720672957862758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34223236707861,
            -0.8002171113800165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37107147840673,
            -0.8009036898625742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38068451551611,
            -0.7672612108950998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.360771795789546,
            -0.7432307061315377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.35321869520361,
            -0.8022768464825485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36557831434423,
            -0.7597087808853649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.407463690320796,
            -0.750096578161741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8392610333051,
            -0.8228603454734635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8476724407758,
            -0.823203632806982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83977601743596,
            -0.8153080166839652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83153627134221,
            -0.8149647286741081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83393953061955,
            -0.8223454144177995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84423921323674,
            -0.8233752764626538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.842865922221115,
            -0.8171961002145901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.53712140775024,
            -0.8955946886814625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.55360089993774,
            -0.8832365586879459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.56939374661743,
            -0.8811768663449692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.458157174351804,
            -0.8722515197331472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.48218976712524,
            -0.9010871775599539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.51652204251587,
            -0.9175645943061888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.46159040189087,
            -0.9024602984876037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.41077863431274,
            -0.8564604701619791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.55222760892212,
            -0.8907887541592405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.675392108330534,
            -0.8285988118797262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.672645526299284,
            -0.8364944016000299
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC05": 4
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
            ee.Geometry.Point([36.34360565809423, -0.7720672957862758]),
            {
              "LC05": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34223236707861, -0.8002171113800165]),
            {
              "LC05": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37107147840673, -0.8009036898625742]),
            {
              "LC05": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38068451551611, -0.7672612108950998]),
            {
              "LC05": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.360771795789546, -0.7432307061315377]),
            {
              "LC05": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.35321869520361, -0.8022768464825485]),
            {
              "LC05": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36557831434423, -0.7597087808853649]),
            {
              "LC05": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.407463690320796, -0.750096578161741]),
            {
              "LC05": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8392610333051, -0.8228603454734635]),
            {
              "LC05": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8476724407758, -0.823203632806982]),
            {
              "LC05": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83977601743596, -0.8153080166839652]),
            {
              "LC05": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83153627134221, -0.8149647286741081]),
            {
              "LC05": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83393953061955, -0.8223454144177995]),
            {
              "LC05": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84423921323674, -0.8233752764626538]),
            {
              "LC05": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.842865922221115, -0.8171961002145901]),
            {
              "LC05": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([37.53712140775024, -0.8955946886814625]),
            {
              "LC05": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([37.55360089993774, -0.8832365586879459]),
            {
              "LC05": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([37.56939374661743, -0.8811768663449692]),
            {
              "LC05": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([37.458157174351804, -0.8722515197331472]),
            {
              "LC05": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([37.48218976712524, -0.9010871775599539]),
            {
              "LC05": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([37.51652204251587, -0.9175645943061888]),
            {
              "LC05": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([37.46159040189087, -0.9024602984876037]),
            {
              "LC05": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([37.41077863431274, -0.8564604701619791]),
            {
              "LC05": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([37.55222760892212, -0.8907887541592405]),
            {
              "LC05": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([37.675392108330534, -0.8285988118797262]),
            {
              "LC05": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([37.672645526299284, -0.8364944016000299]),
            {
              "LC05": 4,
              "system:index": "25"
            })]),
    BuiltUp15 = ui.import && ui.import("BuiltUp15", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74643367767334,
            -1.3934788058418113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750253143310545,
            -1.393693319095191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74836486816406,
            -1.392878168628425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.765005292892454,
            -1.394905318609618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76263422012329,
            -1.3935967881335856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75482362747192,
            -1.394905318609618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75003856658935,
            -1.3945620975715305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74267514430148,
            -1.3914911058220998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747084547468155,
            -1.3921675001945972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7479213966808,
            -1.3908375168479514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75198052759723,
            -1.3944056979381236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76387664176737,
            -1.3970622539374964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76284667350565,
            -1.3958395298820885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746002400892124,
            -1.396418715040254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749199594037876,
            -1.3966975819173708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75175305702005,
            -1.397362572029213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73315863289174,
            -1.404067441683936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748941579815614,
            -1.3931383026365778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.761880556103456,
            -1.3964632563478585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75725540738016,
            -1.3974713148342297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68898335516672,
            -1.4297647140965934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68730586014834,
            -1.4291097738303418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68694107972232,
            -1.4282302827578746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69213383637515,
            -1.4262353383461586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692776154682456,
            -1.4254541299005214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686038108933495,
            -1.4239969019692782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70084712582678,
            -1.4212992285017703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70460221844763,
            -1.4202910279722722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70861363586987,
            -1.4182102722976642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68235760525251,
            -1.3912864628876473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68186407879377,
            -1.3909217899729465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66286802914917,
            -1.3573563878808899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66452026990235,
            -1.3598876813770897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65917708216229,
            -1.370481169755844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65758921442547,
            -1.3696660113237733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67368058231575,
            -1.3719594394883863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.671513357431714,
            -1.3728389516789732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66563395527107,
            -1.3760137734783693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68884545525123,
            -1.374532195694044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68910294731666,
            -1.3748325166429167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72307800693408,
            -1.4001222646799347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728249305914794,
            -1.402782220112434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71299387247246,
            -1.4066312039962106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741693273450615,
            -1.3975626199058886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74593625155628,
            -1.4093189007724374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73401266073786,
            -1.4181224067655067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71645718815442,
            -1.4106872500779388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72259599160439,
            -1.3786622917138651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722398223333876,
            -1.3734742649693643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76468133214646,
            -1.3975485685496838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76568984273606,
            -1.3958968187009784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769037239586645,
            -1.3984280712419896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80682420018845,
            -1.2625089458250858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80515050176316,
            -1.2612217977225317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.811223022972875,
            -1.2652548596464992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8140554356926,
            -1.2577250421652595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.823968880211645,
            -1.2802071673331556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82577132466965,
            -1.2797781209771395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82903289083176,
            -1.2797781209771395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82735919240647,
            -1.2835108218677038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83126448873215,
            -1.282995966896022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.828432076012426,
            -1.2764315569388835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82281016591721,
            -1.2801213580676902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82937621358567,
            -1.284068581303377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84638636861796,
            -1.269751432382636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84949773107523,
            -1.2668768087655644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85027020727152,
            -1.264602850510157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.854947979793494,
            -1.2652035189223292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82556696821182,
            -1.301564615210859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8453938572499,
            -1.304868241960209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83629580427139,
            -1.3042675828736392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.773191394805906,
            -1.4012133316148745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75793624073457,
            -1.3986820820780241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746787232682,
            -1.4054576834685961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730007333084835,
            -1.3956330055790607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.753144653259056,
            -1.3977352326936832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741471679626244,
            -1.393530776585252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73808136743142,
            -1.3958046160262432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73177281182839,
            -1.3971345965671433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75202885430886,
            -1.3911282268663163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75619895992121,
            -1.3923221869710172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762250023458805,
            -1.3866161244739268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75761516628107,
            -1.388589651407759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754010277365055,
            -1.3916786467778643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75718601283869,
            -1.3920647709148368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750276642416324,
            -1.3869164438961588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74838836726984,
            -1.388589651407759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7552977376922,
            -1.3900912468841131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.766970711325015,
            -1.3906489821035901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77254970607599,
            -1.3910780091058166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76718528804621,
            -1.390906398314282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76555450496515,
            -1.3928370189990553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78100402889093,
            -1.3931802402885975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77933033046564,
            -1.3963550348447742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.771948891256656,
            -1.403777172937814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71244944433653,
            -1.4103686075365973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70923079351866,
            -1.4083521965367396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.654489591145264,
            -1.3622921875290879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65612037422632,
            -1.3601041226050736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65715034248804,
            -1.358173475436216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65586288216089,
            -1.3628499292508527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656721189045655,
            -1.3599754128418446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658738210224854,
            -1.3610479939922766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657236173176514,
            -1.3619918650100389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659982755207764,
            -1.362678316427147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658180310749756,
            -1.3613054133974156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68322278663573,
            -1.391118587342571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68345882102904,
            -1.3923413138497924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.680669323653554,
            -1.3890807084226442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682407395095204,
            -1.3896598952419372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.689199754738816,
            -1.4319116952552073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69381315424443,
            -1.4328340868425622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69407064630986,
            -1.4347003198482036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69841115856744,
            -1.4314328959410212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69738119030572,
            -1.4313685430122736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687274626737604,
            -1.425212104490482
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC15": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.74643367767334, -1.3934788058418113]),
            {
              "LC15": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750253143310545, -1.393693319095191]),
            {
              "LC15": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74836486816406, -1.392878168628425]),
            {
              "LC15": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.765005292892454, -1.394905318609618]),
            {
              "LC15": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76263422012329, -1.3935967881335856]),
            {
              "LC15": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75482362747192, -1.394905318609618]),
            {
              "LC15": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75003856658935, -1.3945620975715305]),
            {
              "LC15": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74267514430148, -1.3914911058220998]),
            {
              "LC15": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747084547468155, -1.3921675001945972]),
            {
              "LC15": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7479213966808, -1.3908375168479514]),
            {
              "LC15": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75198052759723, -1.3944056979381236]),
            {
              "LC15": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76387664176737, -1.3970622539374964]),
            {
              "LC15": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76284667350565, -1.3958395298820885]),
            {
              "LC15": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746002400892124, -1.396418715040254]),
            {
              "LC15": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749199594037876, -1.3966975819173708]),
            {
              "LC15": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75175305702005, -1.397362572029213]),
            {
              "LC15": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73315863289174, -1.404067441683936]),
            {
              "LC15": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748941579815614, -1.3931383026365778]),
            {
              "LC15": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.761880556103456, -1.3964632563478585]),
            {
              "LC15": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75725540738016, -1.3974713148342297]),
            {
              "LC15": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68898335516672, -1.4297647140965934]),
            {
              "LC15": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68730586014834, -1.4291097738303418]),
            {
              "LC15": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68694107972232, -1.4282302827578746]),
            {
              "LC15": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69213383637515, -1.4262353383461586]),
            {
              "LC15": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692776154682456, -1.4254541299005214]),
            {
              "LC15": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686038108933495, -1.4239969019692782]),
            {
              "LC15": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70084712582678, -1.4212992285017703]),
            {
              "LC15": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70460221844763, -1.4202910279722722]),
            {
              "LC15": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70861363586987, -1.4182102722976642]),
            {
              "LC15": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68235760525251, -1.3912864628876473]),
            {
              "LC15": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68186407879377, -1.3909217899729465]),
            {
              "LC15": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66286802914917, -1.3573563878808899]),
            {
              "LC15": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66452026990235, -1.3598876813770897]),
            {
              "LC15": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65917708216229, -1.370481169755844]),
            {
              "LC15": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65758921442547, -1.3696660113237733]),
            {
              "LC15": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67368058231575, -1.3719594394883863]),
            {
              "LC15": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.671513357431714, -1.3728389516789732]),
            {
              "LC15": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66563395527107, -1.3760137734783693]),
            {
              "LC15": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68884545525123, -1.374532195694044]),
            {
              "LC15": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68910294731666, -1.3748325166429167]),
            {
              "LC15": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72307800693408, -1.4001222646799347]),
            {
              "LC15": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728249305914794, -1.402782220112434]),
            {
              "LC15": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71299387247246, -1.4066312039962106]),
            {
              "LC15": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741693273450615, -1.3975626199058886]),
            {
              "LC15": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74593625155628, -1.4093189007724374]),
            {
              "LC15": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73401266073786, -1.4181224067655067]),
            {
              "LC15": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71645718815442, -1.4106872500779388]),
            {
              "LC15": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72259599160439, -1.3786622917138651]),
            {
              "LC15": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722398223333876, -1.3734742649693643]),
            {
              "LC15": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76468133214646, -1.3975485685496838]),
            {
              "LC15": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76568984273606, -1.3958968187009784]),
            {
              "LC15": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769037239586645, -1.3984280712419896]),
            {
              "LC15": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80682420018845, -1.2625089458250858]),
            {
              "LC15": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80515050176316, -1.2612217977225317]),
            {
              "LC15": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.811223022972875, -1.2652548596464992]),
            {
              "LC15": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8140554356926, -1.2577250421652595]),
            {
              "LC15": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.823968880211645, -1.2802071673331556]),
            {
              "LC15": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82577132466965, -1.2797781209771395]),
            {
              "LC15": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82903289083176, -1.2797781209771395]),
            {
              "LC15": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82735919240647, -1.2835108218677038]),
            {
              "LC15": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83126448873215, -1.282995966896022]),
            {
              "LC15": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.828432076012426, -1.2764315569388835]),
            {
              "LC15": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82281016591721, -1.2801213580676902]),
            {
              "LC15": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82937621358567, -1.284068581303377]),
            {
              "LC15": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84638636861796, -1.269751432382636]),
            {
              "LC15": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84949773107523, -1.2668768087655644]),
            {
              "LC15": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85027020727152, -1.264602850510157]),
            {
              "LC15": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.854947979793494, -1.2652035189223292]),
            {
              "LC15": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82556696821182, -1.301564615210859]),
            {
              "LC15": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8453938572499, -1.304868241960209]),
            {
              "LC15": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83629580427139, -1.3042675828736392]),
            {
              "LC15": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.773191394805906, -1.4012133316148745]),
            {
              "LC15": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75793624073457, -1.3986820820780241]),
            {
              "LC15": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746787232682, -1.4054576834685961]),
            {
              "LC15": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730007333084835, -1.3956330055790607]),
            {
              "LC15": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.753144653259056, -1.3977352326936832]),
            {
              "LC15": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741471679626244, -1.393530776585252]),
            {
              "LC15": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73808136743142, -1.3958046160262432]),
            {
              "LC15": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73177281182839, -1.3971345965671433]),
            {
              "LC15": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75202885430886, -1.3911282268663163]),
            {
              "LC15": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75619895992121, -1.3923221869710172]),
            {
              "LC15": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762250023458805, -1.3866161244739268]),
            {
              "LC15": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75761516628107, -1.388589651407759]),
            {
              "LC15": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754010277365055, -1.3916786467778643]),
            {
              "LC15": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75718601283869, -1.3920647709148368]),
            {
              "LC15": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750276642416324, -1.3869164438961588]),
            {
              "LC15": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74838836726984, -1.388589651407759]),
            {
              "LC15": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7552977376922, -1.3900912468841131]),
            {
              "LC15": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.766970711325015, -1.3906489821035901]),
            {
              "LC15": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77254970607599, -1.3910780091058166]),
            {
              "LC15": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76718528804621, -1.390906398314282]),
            {
              "LC15": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76555450496515, -1.3928370189990553]),
            {
              "LC15": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78100402889093, -1.3931802402885975]),
            {
              "LC15": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77933033046564, -1.3963550348447742]),
            {
              "LC15": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([36.771948891256656, -1.403777172937814]),
            {
              "LC15": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71244944433653, -1.4103686075365973]),
            {
              "LC15": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70923079351866, -1.4083521965367396]),
            {
              "LC15": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([36.654489591145264, -1.3622921875290879]),
            {
              "LC15": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65612037422632, -1.3601041226050736]),
            {
              "LC15": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65715034248804, -1.358173475436216]),
            {
              "LC15": 0,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65586288216089, -1.3628499292508527]),
            {
              "LC15": 0,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656721189045655, -1.3599754128418446]),
            {
              "LC15": 0,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658738210224854, -1.3610479939922766]),
            {
              "LC15": 0,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657236173176514, -1.3619918650100389]),
            {
              "LC15": 0,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659982755207764, -1.362678316427147]),
            {
              "LC15": 0,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658180310749756, -1.3613054133974156]),
            {
              "LC15": 0,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68322278663573, -1.391118587342571]),
            {
              "LC15": 0,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68345882102904, -1.3923413138497924]),
            {
              "LC15": 0,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([36.680669323653554, -1.3890807084226442]),
            {
              "LC15": 0,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682407395095204, -1.3896598952419372]),
            {
              "LC15": 0,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([36.689199754738816, -1.4319116952552073]),
            {
              "LC15": 0,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69381315424443, -1.4328340868425622]),
            {
              "LC15": 0,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69407064630986, -1.4347003198482036]),
            {
              "LC15": 0,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69841115856744, -1.4314328959410212]),
            {
              "LC15": 0,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69738119030572, -1.4313685430122736]),
            {
              "LC15": 0,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687274626737604, -1.425212104490482]),
            {
              "LC15": 0,
              "system:index": "115"
            })]),
    ForestedAreas15 = ui.import && ui.import("ForestedAreas15", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.7063341872194,
            -1.3643873041262773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71019656820084,
            -1.3604831118545035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.713286472986,
            -1.3631431116717452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71599013967301,
            -1.3643444009488965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70268752691667,
            -1.3536381202986423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70268752691667,
            -1.3564697409286977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69118621466081,
            -1.3671955465417014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69564941046159,
            -1.3703703758284285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714789653991865,
            -1.3643639385001034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71642043707292,
            -1.3660800649842406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70723655340593,
            -1.3708852126137747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7113564264528,
            -1.3743123066741898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69985511419694,
            -1.3601542750688875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.702773357605146,
            -1.364444596488267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63906777130922,
            -1.4083104480821778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64044106232485,
            -1.4068946690780697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64383137451967,
            -1.4047924501841507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64584839569887,
            -1.4053072794760337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64456093537172,
            -1.4065943522091362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64168560730776,
            -1.4014031545161199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64361679779848,
            -1.4002447865170007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64951402157555,
            -1.3990017030441533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74010165769403,
            -1.3202676521447425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.742419086282894,
            -1.3195811888318383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74748309690301,
            -1.3189805332776436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75125964719598,
            -1.3198386125963857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74653895932977,
            -1.324214812512377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.751345477884456,
            -1.3239573892015422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76679500181024,
            -1.315634021109133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76267512876336,
            -1.3175217977568277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78256442736648,
            -1.3506044148115943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.765484120359645,
            -1.3615018593905677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769947316160426,
            -1.3700824897680912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76539828967117,
            -1.351376676277068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76883151721023,
            -1.3548089464841906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74345416125227,
            -1.32102368754742
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC15": 1
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
            ee.Geometry.Point([36.7063341872194, -1.3643873041262773]),
            {
              "LC15": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71019656820084, -1.3604831118545035]),
            {
              "LC15": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.713286472986, -1.3631431116717452]),
            {
              "LC15": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71599013967301, -1.3643444009488965]),
            {
              "LC15": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70268752691667, -1.3536381202986423]),
            {
              "LC15": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70268752691667, -1.3564697409286977]),
            {
              "LC15": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69118621466081, -1.3671955465417014]),
            {
              "LC15": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69564941046159, -1.3703703758284285]),
            {
              "LC15": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714789653991865, -1.3643639385001034]),
            {
              "LC15": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71642043707292, -1.3660800649842406]),
            {
              "LC15": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70723655340593, -1.3708852126137747]),
            {
              "LC15": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7113564264528, -1.3743123066741898]),
            {
              "LC15": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69985511419694, -1.3601542750688875]),
            {
              "LC15": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.702773357605146, -1.364444596488267]),
            {
              "LC15": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63906777130922, -1.4083104480821778]),
            {
              "LC15": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64044106232485, -1.4068946690780697]),
            {
              "LC15": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64383137451967, -1.4047924501841507]),
            {
              "LC15": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64584839569887, -1.4053072794760337]),
            {
              "LC15": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64456093537172, -1.4065943522091362]),
            {
              "LC15": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64168560730776, -1.4014031545161199]),
            {
              "LC15": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64361679779848, -1.4002447865170007]),
            {
              "LC15": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64951402157555, -1.3990017030441533]),
            {
              "LC15": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74010165769403, -1.3202676521447425]),
            {
              "LC15": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.742419086282894, -1.3195811888318383]),
            {
              "LC15": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74748309690301, -1.3189805332776436]),
            {
              "LC15": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75125964719598, -1.3198386125963857]),
            {
              "LC15": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74653895932977, -1.324214812512377]),
            {
              "LC15": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.751345477884456, -1.3239573892015422]),
            {
              "LC15": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76679500181024, -1.315634021109133]),
            {
              "LC15": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76267512876336, -1.3175217977568277]),
            {
              "LC15": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78256442736648, -1.3506044148115943]),
            {
              "LC15": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.765484120359645, -1.3615018593905677]),
            {
              "LC15": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769947316160426, -1.3700824897680912]),
            {
              "LC15": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76539828967117, -1.351376676277068]),
            {
              "LC15": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76883151721023, -1.3548089464841906]),
            {
              "LC15": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74345416125227, -1.32102368754742]),
            {
              "LC15": 1,
              "system:index": "35"
            })]),
    Vegetation15 = ui.import && ui.import("Vegetation15", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.67830543624673,
            -1.3841864243139101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68130951034341,
            -1.3883050915805277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68032245742593,
            -1.386417369972726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66302174981385,
            -1.3876753681997447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66220635827332,
            -1.3885334232064286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63946515317696,
            -1.3984851558229983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64135342832344,
            -1.3989999865018323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64543038602608,
            -1.3965974423680143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64731866117256,
            -1.3958680981269305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64714699979561,
            -1.4014960681280042
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6499364971711,
            -1.4023541180943104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.642040073831254,
            -1.404713753879064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687861041838886,
            -1.4156140426066457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694105224425556,
            -1.4159143583108729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.689642028624775,
            -1.4092001479357719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69075782757497,
            -1.4083850028647533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.726819981121075,
            -1.408608180108673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74030435184453,
            -1.4060684504555483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73971145184503,
            -1.4036523747839709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.755332780752816,
            -1.3988867188209417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759323907766976,
            -1.4018255419236483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7631648310763,
            -1.4009674917636463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762846357030085,
            -1.4045035566292141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769584066075495,
            -1.3998057335255956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73917671630303,
            -1.3898057654340656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73896213958184,
            -1.3904922088454124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730293240045704,
            -1.3844858222384107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73542162368218,
            -1.3805387598922654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7374601025335,
            -1.381611331831175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.740404130098426,
            -1.3853911064211402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72999715912064,
            -1.3854340092202768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73312997925004,
            -1.3935410530668517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72132825958451,
            -1.3941416901111852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68386377292142,
            -1.3862420591872378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683262958102084,
            -1.3877007533972536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673027648501254,
            -1.3418158139046878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67461551623807,
            -1.3421590424903715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67850766308205,
            -1.3623358063720976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6895960331013,
            -1.356956035472412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690304136281235,
            -1.3565484540009562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69324383736156,
            -1.353781188511915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691381072347596,
            -1.3754063900661582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68105993205829,
            -1.372102858345892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.702558282208294,
            -1.3845644058105433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68719458897099,
            -1.3873959898742194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68964076359257,
            -1.3882540449822867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7199389966248,
            -1.3831486125099055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720239404034466,
            -1.3843927945463907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723500970196575,
            -1.3813466925420623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723973038983196,
            -1.404622622687719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71085526446881,
            -1.433070379669735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64158839968665,
            -1.3915665311846015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65798206118567,
            -1.3863753002988966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75796632643023,
            -1.390194706168003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75384645338335,
            -1.387963764070823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.751035498335746,
            -1.3874274795989514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.765540884688285,
            -1.3899587412381302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.766270445540336,
            -1.3899372898796927
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC15": 2
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
            ee.Geometry.Point([36.67830543624673, -1.3841864243139101]),
            {
              "LC15": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68130951034341, -1.3883050915805277]),
            {
              "LC15": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68032245742593, -1.386417369972726]),
            {
              "LC15": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66302174981385, -1.3876753681997447]),
            {
              "LC15": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66220635827332, -1.3885334232064286]),
            {
              "LC15": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63946515317696, -1.3984851558229983]),
            {
              "LC15": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64135342832344, -1.3989999865018323]),
            {
              "LC15": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64543038602608, -1.3965974423680143]),
            {
              "LC15": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64731866117256, -1.3958680981269305]),
            {
              "LC15": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64714699979561, -1.4014960681280042]),
            {
              "LC15": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6499364971711, -1.4023541180943104]),
            {
              "LC15": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.642040073831254, -1.404713753879064]),
            {
              "LC15": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687861041838886, -1.4156140426066457]),
            {
              "LC15": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694105224425556, -1.4159143583108729]),
            {
              "LC15": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.689642028624775, -1.4092001479357719]),
            {
              "LC15": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69075782757497, -1.4083850028647533]),
            {
              "LC15": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.726819981121075, -1.408608180108673]),
            {
              "LC15": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74030435184453, -1.4060684504555483]),
            {
              "LC15": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73971145184503, -1.4036523747839709]),
            {
              "LC15": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.755332780752816, -1.3988867188209417]),
            {
              "LC15": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759323907766976, -1.4018255419236483]),
            {
              "LC15": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7631648310763, -1.4009674917636463]),
            {
              "LC15": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762846357030085, -1.4045035566292141]),
            {
              "LC15": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769584066075495, -1.3998057335255956]),
            {
              "LC15": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73917671630303, -1.3898057654340656]),
            {
              "LC15": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73896213958184, -1.3904922088454124]),
            {
              "LC15": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730293240045704, -1.3844858222384107]),
            {
              "LC15": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73542162368218, -1.3805387598922654]),
            {
              "LC15": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7374601025335, -1.381611331831175]),
            {
              "LC15": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.740404130098426, -1.3853911064211402]),
            {
              "LC15": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72999715912064, -1.3854340092202768]),
            {
              "LC15": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73312997925004, -1.3935410530668517]),
            {
              "LC15": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72132825958451, -1.3941416901111852]),
            {
              "LC15": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68386377292142, -1.3862420591872378]),
            {
              "LC15": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683262958102084, -1.3877007533972536]),
            {
              "LC15": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673027648501254, -1.3418158139046878]),
            {
              "LC15": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67461551623807, -1.3421590424903715]),
            {
              "LC15": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67850766308205, -1.3623358063720976]),
            {
              "LC15": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6895960331013, -1.356956035472412]),
            {
              "LC15": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690304136281235, -1.3565484540009562]),
            {
              "LC15": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69324383736156, -1.353781188511915]),
            {
              "LC15": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691381072347596, -1.3754063900661582]),
            {
              "LC15": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68105993205829, -1.372102858345892]),
            {
              "LC15": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.702558282208294, -1.3845644058105433]),
            {
              "LC15": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68719458897099, -1.3873959898742194]),
            {
              "LC15": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68964076359257, -1.3882540449822867]),
            {
              "LC15": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7199389966248, -1.3831486125099055]),
            {
              "LC15": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720239404034466, -1.3843927945463907]),
            {
              "LC15": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723500970196575, -1.3813466925420623]),
            {
              "LC15": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723973038983196, -1.404622622687719]),
            {
              "LC15": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71085526446881, -1.433070379669735]),
            {
              "LC15": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64158839968665, -1.3915665311846015]),
            {
              "LC15": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65798206118567, -1.3863753002988966]),
            {
              "LC15": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75796632643023, -1.390194706168003]),
            {
              "LC15": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75384645338335, -1.387963764070823]),
            {
              "LC15": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.751035498335746, -1.3874274795989514]),
            {
              "LC15": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.765540884688285, -1.3899587412381302]),
            {
              "LC15": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.766270445540336, -1.3899372898796927]),
            {
              "LC15": 2,
              "system:index": "57"
            })]),
    NonBuilt_Up15 = ui.import && ui.import("NonBuilt_Up15", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.81759114293267,
            -1.3845943741139917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81802029637505,
            -1.3866966110645178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.818191957752006,
            -1.388498526964686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81686158208062,
            -1.3902575387804172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81355710057427,
            -1.3884556242211072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.812012148181694,
            -1.389571095300841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.810209703723686,
            -1.3904720523268532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80806393651177,
            -1.389914317065571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81664700535943,
            -1.3862246804829519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81862111119439,
            -1.3841653459357488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.794898766130835,
            -1.393079278631057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79545666560593,
            -1.3968118070836382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79773117885056,
            -1.3947095791432038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79957653865281,
            -1.3944521633479308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79125096187058,
            -1.3947095791432038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79159428462449,
            -1.3968547096750974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7948558507866,
            -1.3977127613396672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783182877153784,
            -1.399643376438305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78404118403855,
            -1.400544329607182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78798939570847,
            -1.403418796924723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7797779708556,
            -1.4049130880668885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77681681210316,
            -1.4016525000871185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.778361764495735,
            -1.3995073739395305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74517148456223,
            -1.3879942612057343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693029341312716,
            -1.3577905320697827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69195645770676,
            -1.359678276284293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6579245897258,
            -1.333979087108423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.660370764347384,
            -1.3340219908213202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65968411883957,
            -1.3333355313251833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659598288151095,
            -1.3342794130830045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.664619383426974,
            -1.32865902091867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.661357817264864,
            -1.3295600006772896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65053392945666,
            -1.3399519145539982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65242220460314,
            -1.3294834116732737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65328051148791,
            -1.3338595945267595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68340708314318,
            -1.3613178181028434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.684265390027946,
            -1.3636345914997101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78144066086491,
            -1.4017782144965536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72432433940879,
            -1.383819110316778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72728549816123,
            -1.3833471791621652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72428142406455,
            -1.385985702139167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72782193996421,
            -1.3846342639080955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.5612245736312,
            -1.3574551769367806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.537363642234716,
            -1.3457854511708849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.55092489101401,
            -1.3526500025325232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.52174245693198,
            -1.3478448186125802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.58388387538901,
            -1.3456138371388737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60310994960776,
            -1.394351731137634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.606028193015966,
            -1.394351731137634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.613237970848,
            -1.301851869126081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64516698696128,
            -1.289152174290836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.643021219749365,
            -1.2863204769186145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64482366420737,
            -1.29146901525318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.61804971043889,
            -1.251394341767561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.618908017323655,
            -1.2544835077771093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.61959466283147,
            -1.248905844280194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.61432121308211,
            -1.311603255209868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.62702415497664,
            -1.311603255209868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64891098053816,
            -1.3276493370199556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.665304642037185,
            -1.3329694053876762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663588028267654,
            -1.3292796817707555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652344208077224,
            -1.3443817712772592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659553985909255,
            -1.3374313893511
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC15": 3
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
            ee.Geometry.Point([36.81759114293267, -1.3845943741139917]),
            {
              "LC15": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81802029637505, -1.3866966110645178]),
            {
              "LC15": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.818191957752006, -1.388498526964686]),
            {
              "LC15": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81686158208062, -1.3902575387804172]),
            {
              "LC15": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81355710057427, -1.3884556242211072]),
            {
              "LC15": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.812012148181694, -1.389571095300841]),
            {
              "LC15": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.810209703723686, -1.3904720523268532]),
            {
              "LC15": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80806393651177, -1.389914317065571]),
            {
              "LC15": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81664700535943, -1.3862246804829519]),
            {
              "LC15": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81862111119439, -1.3841653459357488]),
            {
              "LC15": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.794898766130835, -1.393079278631057]),
            {
              "LC15": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79545666560593, -1.3968118070836382]),
            {
              "LC15": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79773117885056, -1.3947095791432038]),
            {
              "LC15": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79957653865281, -1.3944521633479308]),
            {
              "LC15": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79125096187058, -1.3947095791432038]),
            {
              "LC15": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79159428462449, -1.3968547096750974]),
            {
              "LC15": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7948558507866, -1.3977127613396672]),
            {
              "LC15": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783182877153784, -1.399643376438305]),
            {
              "LC15": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78404118403855, -1.400544329607182]),
            {
              "LC15": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78798939570847, -1.403418796924723]),
            {
              "LC15": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7797779708556, -1.4049130880668885]),
            {
              "LC15": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77681681210316, -1.4016525000871185]),
            {
              "LC15": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.778361764495735, -1.3995073739395305]),
            {
              "LC15": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74517148456223, -1.3879942612057343]),
            {
              "LC15": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693029341312716, -1.3577905320697827]),
            {
              "LC15": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69195645770676, -1.359678276284293]),
            {
              "LC15": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6579245897258, -1.333979087108423]),
            {
              "LC15": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.660370764347384, -1.3340219908213202]),
            {
              "LC15": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65968411883957, -1.3333355313251833]),
            {
              "LC15": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659598288151095, -1.3342794130830045]),
            {
              "LC15": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.664619383426974, -1.32865902091867]),
            {
              "LC15": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.661357817264864, -1.3295600006772896]),
            {
              "LC15": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65053392945666, -1.3399519145539982]),
            {
              "LC15": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65242220460314, -1.3294834116732737]),
            {
              "LC15": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65328051148791, -1.3338595945267595]),
            {
              "LC15": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68340708314318, -1.3613178181028434]),
            {
              "LC15": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.684265390027946, -1.3636345914997101]),
            {
              "LC15": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78144066086491, -1.4017782144965536]),
            {
              "LC15": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72432433940879, -1.383819110316778]),
            {
              "LC15": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72728549816123, -1.3833471791621652]),
            {
              "LC15": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72428142406455, -1.385985702139167]),
            {
              "LC15": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72782193996421, -1.3846342639080955]),
            {
              "LC15": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.5612245736312, -1.3574551769367806]),
            {
              "LC15": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.537363642234716, -1.3457854511708849]),
            {
              "LC15": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.55092489101401, -1.3526500025325232]),
            {
              "LC15": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.52174245693198, -1.3478448186125802]),
            {
              "LC15": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.58388387538901, -1.3456138371388737]),
            {
              "LC15": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60310994960776, -1.394351731137634]),
            {
              "LC15": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.606028193015966, -1.394351731137634]),
            {
              "LC15": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.613237970848, -1.301851869126081]),
            {
              "LC15": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64516698696128, -1.289152174290836]),
            {
              "LC15": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.643021219749365, -1.2863204769186145]),
            {
              "LC15": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64482366420737, -1.29146901525318]),
            {
              "LC15": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.61804971043889, -1.251394341767561]),
            {
              "LC15": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.618908017323655, -1.2544835077771093]),
            {
              "LC15": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.61959466283147, -1.248905844280194]),
            {
              "LC15": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.61432121308211, -1.311603255209868]),
            {
              "LC15": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.62702415497664, -1.311603255209868]),
            {
              "LC15": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64891098053816, -1.3276493370199556]),
            {
              "LC15": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.665304642037185, -1.3329694053876762]),
            {
              "LC15": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663588028267654, -1.3292796817707555]),
            {
              "LC15": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652344208077224, -1.3443817712772592]),
            {
              "LC15": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659553985909255, -1.3374313893511]),
            {
              "LC15": 3,
              "system:index": "62"
            })]),
    Water15 = ui.import && ui.import("Water15", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.695461024157396,
            -1.4386818689969008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69486020933806,
            -1.440011824902395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.695461024157396,
            -1.4409985658792273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69528936278044,
            -1.442071109934392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693701495043626,
            -1.4418136994072368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694731463305345,
            -1.4429291448146402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69402544098698,
            -1.4464903993603822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.27586690689574,
            -1.742364714254216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.27449361588012,
            -1.7677586796571132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.27449361588012,
            -1.7783965892423435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.27312032486449,
            -1.7471690043897454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38950673843871,
            -0.7359907678351363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.411136071934806,
            -0.7383938281911592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.416629235997306,
            -0.7514389902065832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39088002945434,
            -0.7490359369528661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38126699234496,
            -0.7644841132663063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39259664322387,
            -0.7819919791737571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39534322525512,
            -0.7912608199016643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38813344742309,
            -0.7957235876960981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.3778337648059,
            -0.7754694493416915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37852041031371,
            -0.7953802980368053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36925069595824,
            -0.803962530920419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37028066421996,
            -0.817007490290809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38161031509887,
            -0.8049923976580037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.375430505528556,
            -0.7816486883818943
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.41903249527465,
            -0.758648142019401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66965810562621,
            -0.7542711584153595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67223302628051,
            -0.7556443302172154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6744646241809,
            -0.7580473798255206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67669622208129,
            -0.7594205504318188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.680301110997306,
            -0.7591630809763515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67901365067016,
            -0.7601071355714301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8483340140158,
            -0.8207836548653104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84232586582244,
            -0.8160634485920019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83709019382537,
            -0.8167500243949423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83125370700896,
            -0.8146902966346572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83151119907439,
            -0.8212985861223034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83528774936736,
            -0.8224142702848377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83906429966033,
            -0.8218993391716312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84335583408416,
            -0.8231866668300843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.846874892311696,
            -0.822070982883408
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC15": 4
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
            ee.Geometry.Point([36.695461024157396, -1.4386818689969008]),
            {
              "LC15": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69486020933806, -1.440011824902395]),
            {
              "LC15": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.695461024157396, -1.4409985658792273]),
            {
              "LC15": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69528936278044, -1.442071109934392]),
            {
              "LC15": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693701495043626, -1.4418136994072368]),
            {
              "LC15": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694731463305345, -1.4429291448146402]),
            {
              "LC15": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69402544098698, -1.4464903993603822]),
            {
              "LC15": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.27586690689574, -1.742364714254216]),
            {
              "LC15": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.27449361588012, -1.7677586796571132]),
            {
              "LC15": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.27449361588012, -1.7783965892423435]),
            {
              "LC15": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.27312032486449, -1.7471690043897454]),
            {
              "LC15": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38950673843871, -0.7359907678351363]),
            {
              "LC15": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.411136071934806, -0.7383938281911592]),
            {
              "LC15": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.416629235997306, -0.7514389902065832]),
            {
              "LC15": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39088002945434, -0.7490359369528661]),
            {
              "LC15": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38126699234496, -0.7644841132663063]),
            {
              "LC15": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39259664322387, -0.7819919791737571]),
            {
              "LC15": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39534322525512, -0.7912608199016643]),
            {
              "LC15": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38813344742309, -0.7957235876960981]),
            {
              "LC15": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.3778337648059, -0.7754694493416915]),
            {
              "LC15": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37852041031371, -0.7953802980368053]),
            {
              "LC15": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36925069595824, -0.803962530920419]),
            {
              "LC15": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37028066421996, -0.817007490290809]),
            {
              "LC15": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38161031509887, -0.8049923976580037]),
            {
              "LC15": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.375430505528556, -0.7816486883818943]),
            {
              "LC15": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.41903249527465, -0.758648142019401]),
            {
              "LC15": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66965810562621, -0.7542711584153595]),
            {
              "LC15": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67223302628051, -0.7556443302172154]),
            {
              "LC15": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6744646241809, -0.7580473798255206]),
            {
              "LC15": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67669622208129, -0.7594205504318188]),
            {
              "LC15": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.680301110997306, -0.7591630809763515]),
            {
              "LC15": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67901365067016, -0.7601071355714301]),
            {
              "LC15": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8483340140158, -0.8207836548653104]),
            {
              "LC15": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84232586582244, -0.8160634485920019]),
            {
              "LC15": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83709019382537, -0.8167500243949423]),
            {
              "LC15": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83125370700896, -0.8146902966346572]),
            {
              "LC15": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83151119907439, -0.8212985861223034]),
            {
              "LC15": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83528774936736, -0.8224142702848377]),
            {
              "LC15": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83906429966033, -0.8218993391716312]),
            {
              "LC15": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84335583408416, -0.8231866668300843]),
            {
              "LC15": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.846874892311696, -0.822070982883408]),
            {
              "LC15": 4,
              "system:index": "40"
            })]),
    NonBuilt_Up05 = ui.import && ui.import("NonBuilt_Up05", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.784249386597345,
            -1.4000306323665517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78210361938543,
            -1.4025189779596854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78691013794012,
            -1.4026047829329797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7954073760993,
            -1.3965984272154486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79935558776922,
            -1.393166217051804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.811457714844416,
            -1.389047558256174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81609257202215,
            -1.3898198073278403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81789501648016,
            -1.3857869482838352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78167446594305,
            -1.3975422841322218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77909954528875,
            -1.3997732171543633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7816284687737,
            -1.405865369584741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73261914565358,
            -1.3826121395237974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73708234145436,
            -1.3841566416136892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.727469304344986,
            -1.3806386076133768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74566541030202,
            -1.3873314483046109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65957524280502,
            -1.3681208811935264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65974690418197,
            -1.3694079741576919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68371503833605,
            -1.362371857532149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68311422351671,
            -1.3666621749993966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68568914417101,
            -1.3587679849542265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65310207707163,
            -1.3321115383414308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65584865910288,
            -1.3323689608028793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66426006657358,
            -1.330309580358593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66365925175425,
            -1.335028991328351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69172588688608,
            -1.358540103085767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65713611943003,
            -1.344553593115543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74582041612831,
            -1.3932769740227138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73962016710059,
            -1.40109546117873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73005004533545,
            -1.3996367752652419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73369784959571,
            -1.400065800628147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759189564073246,
            -1.3949174910981177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73614402421729,
            -1.38573631117304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70981953610821,
            -1.388543536422294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72779063984695,
            -1.4213730313268196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728477285354764,
            -1.4241187666185717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71676139637771,
            -1.4239471582586094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71813468739334,
            -1.4247193957778013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68006247543,
            -1.3380480011828964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66598624251984,
            -1.3308401787202602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66045405803229,
            -1.3296466606662112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.661655687670965,
            -1.330590543837013
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC05": 3
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
            ee.Geometry.Point([36.784249386597345, -1.4000306323665517]),
            {
              "LC05": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78210361938543, -1.4025189779596854]),
            {
              "LC05": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78691013794012, -1.4026047829329797]),
            {
              "LC05": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7954073760993, -1.3965984272154486]),
            {
              "LC05": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79935558776922, -1.393166217051804]),
            {
              "LC05": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.811457714844416, -1.389047558256174]),
            {
              "LC05": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81609257202215, -1.3898198073278403]),
            {
              "LC05": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81789501648016, -1.3857869482838352]),
            {
              "LC05": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78167446594305, -1.3975422841322218]),
            {
              "LC05": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77909954528875, -1.3997732171543633]),
            {
              "LC05": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7816284687737, -1.405865369584741]),
            {
              "LC05": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73261914565358, -1.3826121395237974]),
            {
              "LC05": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73708234145436, -1.3841566416136892]),
            {
              "LC05": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.727469304344986, -1.3806386076133768]),
            {
              "LC05": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74566541030202, -1.3873314483046109]),
            {
              "LC05": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65957524280502, -1.3681208811935264]),
            {
              "LC05": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65974690418197, -1.3694079741576919]),
            {
              "LC05": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68371503833605, -1.362371857532149]),
            {
              "LC05": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68311422351671, -1.3666621749993966]),
            {
              "LC05": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68568914417101, -1.3587679849542265]),
            {
              "LC05": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65310207707163, -1.3321115383414308]),
            {
              "LC05": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65584865910288, -1.3323689608028793]),
            {
              "LC05": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66426006657358, -1.330309580358593]),
            {
              "LC05": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66365925175425, -1.335028991328351]),
            {
              "LC05": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69172588688608, -1.358540103085767]),
            {
              "LC05": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65713611943003, -1.344553593115543]),
            {
              "LC05": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74582041612831, -1.3932769740227138]),
            {
              "LC05": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73962016710059, -1.40109546117873]),
            {
              "LC05": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73005004533545, -1.3996367752652419]),
            {
              "LC05": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73369784959571, -1.400065800628147]),
            {
              "LC05": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759189564073246, -1.3949174910981177]),
            {
              "LC05": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73614402421729, -1.38573631117304]),
            {
              "LC05": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70981953610821, -1.388543536422294]),
            {
              "LC05": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72779063984695, -1.4213730313268196]),
            {
              "LC05": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728477285354764, -1.4241187666185717]),
            {
              "LC05": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71676139637771, -1.4239471582586094]),
            {
              "LC05": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71813468739334, -1.4247193957778013]),
            {
              "LC05": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68006247543, -1.3380480011828964]),
            {
              "LC05": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66598624251984, -1.3308401787202602]),
            {
              "LC05": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66045405803229, -1.3296466606662112]),
            {
              "LC05": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.661655687670965, -1.330590543837013]),
            {
              "LC05": 3,
              "system:index": "40"
            })]);
//obtain image with the lowest amount of cloud cover
var filtered2000=ee.Image(L7.filterBounds(point).filterDate('2000-01-01','2000-12-31').sort('CLOUD_COVER').first());
var bands=['B1','B2','B3','B4','B5'];
var bands2=['B2','B3','B4','B8'];
print(filtered2000);
//center map to area of interest
Map.setCenter(36.69,-1.40,12);
//display image
// Map.addLayer(filtered2000,vizParamsFalse,'false2000');
// Map.addLayer(filtered2000,vizParamsTrue,'True2000');
var KNClip2000=filtered2000.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2000,vizParamsFalse,'KNfalse2000');
// Map.addLayer(KNClip2000,vizParamsTrue,'KNTrue2000');
//merge training data
var merged_fc=BuiltUp.merge(ForestedAreas).merge(Vegetation).merge(NonBuilt_Up).merge(Water);
//define training feature classes, property and the resolution of image
var training=KNClip2000.sampleRegions({
  collection:merged_fc,
  properties:['LC'],
  scale:30
});
//define classifier
var classifier=ee.Classifier.smileCart();
//define training parameters
var classifier=classifier.train({
  features:training,
  classProperty:'LC',
  inputProperties:bands
});
//classify image
var classified2000=KNClip2000.classify(classifier);
print(classified2000);
//display image
Map.addLayer(classified2000,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2000');
//add a panel
var legend=ui.Panel({
  style:{
    position:'bottom-left',
    padding:'5px'
  }
});
//add a title
var title=ui.Label({
  value:'Kajiado North Land Cover Map',
  style:{
    fontSize:'14px',
    fontWeight:'bold',
    margin:'0px'
  }
});
var title2=ui.Label({
  value:'From 2000-2020 With a five year interval',
  style:{
    fontSize:'14px',
    fontWeight:'bold',
    margin:'0px',
    padding:'2px'
  }
});
//add title to panel
legend.add(title);
legend.add(title2);
//construct a legend
var colours=['red','green','#87ff8a','#feffa1','blue'];
var lc_classes=['Built Up Areas','Forested Areas','Vegetation','Bare Ground','Water'];
//function for making a legend
var list_legend=function(color,description){
  var c=ui.Label({
    style:{
      backgroundColor:color,
      padding:'10px',
      margin:'4px'
    }
  });
  var lc=ui.Label({
    value:description,
    style:{
      padding:'10px',
      margin:'4px'
    }
  });
  return ui.Panel({
    widgets:[c,lc],
    layout:ui.Panel.Layout.Flow('horizontal')
  });
};
for (var a=0;a<5;a++){
  legend.add(list_legend(colours[a],lc_classes[a]));
}
Map.add(legend);
//////////////////////////////////////////////////////////////////////////////////
//Land Cover Detection 2005
var filtered2005=ee.Image(L7.filterBounds(point).filterDate('2005-01-01','2005-12-31').sort('CLOUD_COVER').first());
//rectify scan line error
var fill2005=filtered2005.focalMean(1,'square','pixels',20);
var final2005=fill2005.blend(filtered2005);
print(filtered2005);
//display L7 2005 image
// Map.addLayer(filtered2005,vizParamsFalse,'false2005');
// Map.addLayer(filtered2005,vizParamsTrue,'True2005');
// //display scan line rectified image
// Map.addLayer(fill2005,vizParamsFalse,'false_fill2005');
// Map.addLayer(fill2005,vizParamsTrue,'True_fill2005');
// Map.addLayer(final2005,vizParamsFalse,'final_false2005');
// Map.addLayer(final2005,vizParamsTrue,'final_True2005');
var KNClip2005=final2005.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2005,vizParamsFalse,'KNfalse2005');
// Map.addLayer(KNClip2005,vizParamsTrue,'KNTrue2005');
//2005 classification
//merge training data
var merged_fc05=BuiltUp05.merge(ForestedAreas05).merge(Vegetation05).merge(NonBuilt_Up05).merge(Water05);
//define training feature classes, property and the resolution of image
var training05=filtered2005.sampleRegions({
  collection:merged_fc05,
  properties:['LC05'],
  scale:30
});
//define classifier
var classifier05=ee.Classifier.smileCart();
//define training parameters
var classifier05=classifier05.train({
  features:training05,
  classProperty:'LC05',
  inputProperties:bands
});
//classify image
var classified2005=KNClip2005.classify(classifier05);
print(classified2005);
//display image
Map.addLayer(classified2005,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2005');
/////////////////////////////////////////////////////////////////
//2010 Land cover detection
/////2010 land cover detection
//obtain a landsat 7 2010 image with the least land cover
var filtered2010=L7.filterBounds(point).filterDate('2010-01-01','2010-12-30').sort('CLOUD_COVER').first();
//rectify scan line error
var fill2010=filtered2010.focalMean(1,'square','pixels',20);
var final2010=fill2010.blend(filtered2010);
print(filtered2010);
//display L7 2010 image
// Map.addLayer(filtered2010,vizParamsFalse,'false2010');
// Map.addLayer(filtered2010,vizParamsTrue,'True2010');
// //display scan line rectified image
// Map.addLayer(fill2010,vizParamsFalse,'false_fill2010');
// Map.addLayer(fill2010,vizParamsTrue,'True_fill2010');
// Map.addLayer(final2010,vizParamsFalse,'final_false2010');
// Map.addLayer(final2010,vizParamsTrue,'final_True2010');
var KNClip2010=final2010.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2010,vizParamsFalse,'KNfalse2010');
// Map.addLayer(KNClip2010,vizParamsTrue,'KNTrue2010');
//2010 classification
//merge training data
var merged_fc10=BuiltUp10.merge(ForestedAreas10).merge(Vegetation10).merge(NonBuilt_Up10).merge(Water10);
//define training feature classes, property and the resolution of image
var training10=KNClip2010.sampleRegions({
  collection:merged_fc10,
  properties:['LC10'],
  scale:30
});
//define classifier
var classifier10=ee.Classifier.smileCart();
//define training parameters
var classifier10=classifier10.train({
  features:training10,
  classProperty:'LC10',
  inputProperties:bands
});
//classify image
var classified2010=KNClip2010.classify(classifier10);
print(classified2010);
//display image
Map.addLayer(classified2010,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2010');
///////////////////////////////////////////////////////////////////////////////////////
//Land Cover detection 2015 
//obtain image with the least cloud cover
var filtered2015=ee.Image(L8.filterBounds(point).filterDate('2015-01-01','2015-12-31').sort('CLOUD_COVER').first());
//display image
// Map.addLayer(filtered2015,vizParamsFalseL8,'false2015');
// Map.addLayer(filtered2015,vizParamsTrueL8,'True2015');
var KNClip2015=filtered2015.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2015,vizParamsFalseL8,'KNfalse2015');
// Map.addLayer(KNClip2015,vizParamsTrueL8,'KNTrue2015');
//2015 classification
//merge training data
var merged_fc15=BuiltUp15.merge(ForestedAreas15).merge(Vegetation15).merge(NonBuilt_Up15).merge(Water15);
//define training feature classes, property and the resolution of image
var training15=filtered2015.sampleRegions({
  collection:merged_fc15,
  properties:['LC15'],
  scale:30
});
//define classifier
var classifier15=ee.Classifier.smileCart();
//define training parameters
var classifier15=classifier15.train({
  features:training15,
  classProperty:'LC15',
  inputProperties:bands
});
//classify image
var classified2015=KNClip2015.classify(classifier15);
print(classified2015);
//display image
Map.addLayer(classified2015,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2015');
////////////////////////////////////////////////////////////////////////////////////////
//Land Cover Detection 2020
// 2020 Land cover detection
var filtered2020=ee.Image(L8.filterBounds(point).filterDate('2020-01-01','2020-12-31').sort('CLOUD_COVER').first());
//display image
// Map.addLayer(filtered2020,vizParamsFalseL8,'false2020');
// Map.addLayer(filtered2020,vizParamsTrueL8,'True2020');
var KNClip2020=filtered2020.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2020,vizParamsFalseL8,'KNfalse2020');
// Map.addLayer(KNClip2020,vizParamsTrueL8,'KNTrue2020');
//2020 classification
//merge training data
var merged_fc20=BuiltUp20.merge(ForestedAreas20).merge(Vegetation20).merge(NonBuilt_Up20).merge(Water20);
//define training feature classes, property and the resolution of image
var training20=filtered2020.sampleRegions({
  collection:merged_fc20,
  properties:['LC20'],
  scale:30
});
//define classifier
var classifier20=ee.Classifier.smileCart();
//define training parameters
var classifier20=classifier20.train({
  features:training20,
  classProperty:'LC20',
  inputProperties:bands
});
//classify image
var classified2020=KNClip2020.classify(classifier20);
print(classified2020);
//display image
Map.addLayer(classified2020,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2020');