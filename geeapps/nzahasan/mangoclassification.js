var sentinel_2 = ee.ImageCollection("COPERNICUS/S2"),
    map_center = /* color: #d63000 */ee.Geometry.Point([88.19517095142703, 24.685790217756864]),
    water = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[88.09680266345822, 24.59391988898883],
                  [88.10238131033122, 24.59610496994296],
                  [88.10117975557421, 24.60187964300128],
                  [88.09766091685128, 24.607029802178662],
                  [88.09345547550163, 24.60702980220604]]]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.01229686516626, 24.64754807713335],
                  [88.0129406580844, 24.644817407331534],
                  [88.01828413899511, 24.64427126620214],
                  [88.01757596685752, 24.647236003610875]]]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.02834811769708, 24.644258641711037],
                  [88.04130808207447, 24.644609685847687],
                  [88.03598677218224, 24.648315091212524],
                  [88.02753275573036, 24.647457007132125]]]),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.11545941304519, 24.703569579592205],
                  [88.12095257710769, 24.717136603198874],
                  [88.11932179402663, 24.718228138537434],
                  [88.11391446065261, 24.70512908278334]]]),
            {
              "class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.10831186251755, 24.68128083244051],
                  [88.10938474612351, 24.6816317851284],
                  [88.1092560000908, 24.6819047476471],
                  [88.10818311648484, 24.681612287782777]]]),
            {
              "class": 0,
              "system:index": "4"
            })]),
    other = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[88.04440270407133, 24.742789531461778],
                  [88.04749260885649, 24.744114692680633],
                  [88.04590474111967, 24.746453178020207],
                  [88.04371605856352, 24.744738293072462]]]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.15708515124436, 24.679974499864613],
                  [88.15719243960496, 24.68067641160672],
                  [88.15637704806443, 24.680734904073553]]]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.15650579409714, 24.679233588738878],
                  [88.15714952426072, 24.679701533119974],
                  [88.15687057452317, 24.679974499864613],
                  [88.15635559039231, 24.67950655650794]]]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.12116500811692, 24.682489665317576],
                  [88.12129375414963, 24.683347539603563],
                  [88.12084314303513, 24.68344502494435],
                  [88.12088605837937, 24.682645642899555]]]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.67590847159704, 24.7589240572292],
                  [88.67814006949743, 24.759976255679998],
                  [88.67775383139929, 24.761262263906005],
                  [88.67517891074499, 24.760054195951476]]]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[88.65083248646715, 24.76274310537111],
                  [88.65362198384264, 24.764301866788166],
                  [88.65306408436754, 24.76570473533767],
                  [88.65104706318834, 24.764145991526767]]]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2221043457389, 24.64292072380673]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2189715256095, 24.64528061212338]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21697596210242, 24.64674333042929]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21652535098792, 24.646470290979437]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21727636951209, 24.645826695628404]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([88.21937922137977, 24.645105084775345]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23206070560218, 24.64416893475264]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23270443576575, 24.64342781100802]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([88.23789719241859, 24.646899352704047]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25385097163917, 24.642267358415918]),
            {
              "class": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([88.258142506063, 24.639741630210665]),
            {
              "class": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17270877706346, 24.63851833187232]),
            {
              "class": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17395332204637, 24.637777174600018]),
            {
              "class": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1756699358159, 24.637231055901495]),
            {
              "class": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([88.175326613062, 24.63664592607532]),
            {
              "class": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15292480336961, 24.6432382302747]),
            {
              "class": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([88.12902095662889, 24.64858203217435]),
            {
              "class": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18608346808162, 24.692205168606275]),
            {
              "class": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([88.18596258498224, 24.720819366923262]),
            {
              "class": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17097440100702, 24.729853215376544]),
            {
              "class": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17144646979364, 24.72983372557891]),
            {
              "class": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([88.17114606238397, 24.729443928985315]),
            {
              "class": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([88.1698270122182, 24.73961175679057]),
            {
              "class": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([88.15724208752033, 24.756847933896616]),
            {
              "class": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([88.16110446850178, 24.756614106901047]),
            {
              "class": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([88.10703113476154, 24.787319618265244]),
            {
              "class": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([88.07947948376057, 24.782176584982135]),
            {
              "class": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([88.04360225597736, 24.783345474900557]),
            {
              "class": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([87.94695690075275, 24.795189604939843]),
            {
              "class": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([87.89417102733967, 24.790436504383866]),
            {
              "class": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([87.88704708019611, 24.791371554949222]),
            {
              "class": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([88.0418248249564, 24.828031619387612]),
            {
              "class": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([88.05849062738321, 24.84924265183668]),
            {
              "class": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([88.042783611392, 24.846127244793234]),
            {
              "class": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([88.05364119348428, 24.846633503775614]),
            {
              "class": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([88.04042026675006, 24.846679570897102]),
            {
              "class": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25488971237564, 24.609207501958668]),
            {
              "class": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25400994781876, 24.61055359188366]),
            {
              "class": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25810836319351, 24.611665568287123]),
            {
              "class": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25694964889908, 24.611197368901085]),
            {
              "class": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25581239227677, 24.609812268789483]),
            {
              "class": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2584302282753, 24.608895363095563]),
            {
              "class": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25906322960282, 24.60937332541289]),
            {
              "class": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25829075340653, 24.608085749289355]),
            {
              "class": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25613425735855, 24.60794918740803]),
            {
              "class": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25974987511063, 24.6071493219665]),
            {
              "class": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26368735794449, 24.60704202255482]),
            {
              "class": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([88.27147649292374, 24.608836836971992]),
            {
              "class": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([88.27090786461258, 24.609002660917604]),
            {
              "class": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([88.27203439239884, 24.60910995864761]),
            {
              "class": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([88.27122972969437, 24.60854420594355]),
            {
              "class": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2708756781044, 24.608729539007722]),
            {
              "class": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([88.27172325615311, 24.60864174969576]),
            {
              "class": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26517866615677, 24.60942209697524]),
            {
              "class": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26304362778092, 24.60959767444225]),
            {
              "class": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26207803253556, 24.60959767444225]),
            {
              "class": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26224969391251, 24.61021219363606]),
            {
              "class": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26223896507645, 24.60999759997491]),
            {
              "class": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26252864365006, 24.60909044997626]),
            {
              "class": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26355861191178, 24.608983152229506]),
            {
              "class": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26242121358109, 24.6074759358323]),
            {
              "class": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2628566174194, 24.605558686344274]),
            {
              "class": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26323212668149, 24.60573914653257]),
            {
              "class": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26372565314023, 24.605934238335223]),
            {
              "class": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([88.2634296963696, 24.605483898819408]),
            {
              "class": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([88.26770001625653, 24.605803804253416]),
            {
              "class": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25679304374398, 24.60656374198126]),
            {
              "class": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25699689162911, 24.60669542811348]),
            {
              "class": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([88.25661870015801, 24.606497898863186]),
            {
              "class": 1,
              "system:index": "74"
            })]),
    region1 = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[87.89440312980446, 24.194437429749183],
          [88.68819581128446, 24.20195366698731],
          [88.68270355321897, 24.85538791282049],
          [87.88890927045247, 24.854141772642745]]]),
    mango = /* color: #d63000 */ee.Feature(
        ee.Geometry({
          "type": "GeometryCollection",
          "geometries": [
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.20400482753655,
                    24.630826828781718
                  ],
                  [
                    88.20838219264886,
                    24.633011401223275
                  ],
                  [
                    88.20503479579827,
                    24.634961880058608
                  ],
                  [
                    88.2016015682592,
                    24.633635557763228
                  ]
                ]
              ],
              "evenOdd": true
            },
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.20979188090018,
                    24.617919867182927
                  ],
                  [
                    88.21120808726005,
                    24.61596912240251
                  ],
                  [
                    88.21361134653739,
                    24.617139572922582
                  ],
                  [
                    88.21240971689872,
                    24.618953749577734
                  ]
                ]
              ],
              "evenOdd": true
            },
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.22176526194266,
                    24.619909595507227
                  ],
                  [
                    88.22210858469657,
                    24.617900359885752
                  ],
                  [
                    88.22500537043265,
                    24.618310012487143
                  ],
                  [
                    88.2244903863018,
                    24.620494803694303
                  ]
                ]
              ],
              "evenOdd": true
            },
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.22974751597098,
                    24.619421919925617
                  ],
                  [
                    88.23206494455985,
                    24.620163186057923
                  ],
                  [
                    88.23163579111747,
                    24.621860278811823
                  ],
                  [
                    88.22927544718436,
                    24.621411624346827
                  ]
                ]
              ],
              "evenOdd": true
            },
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.174279433543,
                    24.628804464318694
                  ],
                  [
                    88.17711184626273,
                    24.629545674815187
                  ],
                  [
                    88.17530940180472,
                    24.631457197386933
                  ],
                  [
                    88.17324946528129,
                    24.629740729478367
                  ]
                ]
              ],
              "evenOdd": true
            },
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.22475538881497,
                    24.63299957424459
                  ],
                  [
                    88.22627888353543,
                    24.633877293571437
                  ],
                  [
                    88.22574244173245,
                    24.634969557900995
                  ],
                  [
                    88.22381125124173,
                    24.63442342692978
                  ]
                ]
              ],
              "evenOdd": true
            },
            {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    88.16590910803541,
                    24.658721553040188
                  ],
                  [
                    88.17002898108228,
                    24.658643549314334
                  ],
                  [
                    88.17020064245924,
                    24.66277767960111
                  ],
                  [
                    88.16599493872388,
                    24.662543675883086
                  ]
                ]
              ],
              "geodesic": true,
              "evenOdd": true
            },
            {
              "type": "Point",
              "coordinates": [
                88.1736338699983,
                24.668705627411775
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.2106432810358,
                24.64532824932444
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27490601234229,
                24.592868847206045
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27565703086645,
                24.59317127047024
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27482018165381,
                24.59234204364624
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27545318298132,
                24.592576178835397
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27594670944006,
                24.592868847206045
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27762577228339,
                24.593405404108506
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27807638339789,
                24.593337115175913
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27839288406165,
                24.593302970695675
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27854040555746,
                24.59217131979476
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27808443002493,
                24.592127419338183
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27794227294714,
                24.59196401194782
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27815684966833,
                24.591898161148116
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27881130866797,
                24.5921835143633
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27876571111472,
                24.5923127767168
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.27841165952475,
                24.592244487188196
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.23829921193715,
                24.588975701977798
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24121477313633,
                24.589348864761853
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24067833133336,
                24.589387888256738
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.23993804164525,
                24.5896903199297
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24033500857945,
                24.589436667608243
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24058177180882,
                24.589241550088218
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24103238292332,
                24.589290329496723
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24123623080845,
                24.589085455853272
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.24132206149693,
                24.588812290473847
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.2293379233621,
                24.589246329276637
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.22999238236173,
                24.589158526296764
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.22852633246703,
                24.588982920152326
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.22825811156554,
                24.589548761291518
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.22865507849974,
                24.589558517150806
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.2286121631555,
                24.588846337425263
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.22798989066405,
                24.589148770406307
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.22879455336852,
                24.589470714389872
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.23266766318602,
                24.588924384716105
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.23213122138304,
                24.589099990942646
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.23279640921874,
                24.588875605165033
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.18759554544704,
                24.579957197430762
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.18709129015224,
                24.57953766263176
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.18634027162807,
                24.57932301637728
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.18590038934963,
                24.579518149351102
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.1866514078738,
                24.57987914455129
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.20237988153713,
                24.578844939306784
              ]
            },
            {
              "type": "Point",
              "coordinates": [
                88.20270174661891,
                24.57915715311055
              ]
            }
          ],
          "coordinates": []
        }),
        {
          "system:index": "0",
          "class": 3
        }),
    mango2 = ee.FeatureCollection("users/nzahasan/mango_pts");
var trainingFeatures = water.merge(other).merge(mango).merge(mango2);
function maskClouds(image) {
  var qa60 = image.select('QA60');
  var opaqueCloudMask = qa60.bitwiseAnd(1<<10).eq(0)
  var cirrusCloudMask = qa60.bitwiseAnd(1<<10).eq(0)
  var totalCloudMask = opaqueCloudMask.and(cirrusCloudMask);
  return image.updateMask(totalCloudMask);
}
var data = sentinel_2
          .filterDate('2018-06-01','2018-12-31')
          //choose where cloud percentage < 20
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
          // select R G B & NIR
          .select(['B2','B3','B4','B8','QA60']);
var dataMasked = data.map(maskClouds);
// composite + scale
var dataMedian = dataMasked.median().divide(10000).clip(region1);
// Map.addLayer(dataMedian,{min:0,max:0.3,bands:['B4','B3','B2'],scale:10});
Map.centerObject(map_center,10);
var polygons = ee.FeatureCollection('users/nzahasan/classification_bari');
// classification
var trainingData = dataMedian.sampleRegions({
  collection: trainingFeatures,
  properties: ['class'],
  scale: 30
});
var svm_classifier = ee.Classifier.svm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});
// Map.addLayer(trainingFeatures);
// var svm_trained_classifier =  svm_classifier.train(trainingData, 'class', ['B4', 'B3', 'B2', 'B8']);
// var svm_classifiedRegions = dataMedian.classify(svm_trained_classifier);
var cart_trained_classifier = ee.Classifier.cart().train(trainingData, 'class', ['B4', 'B3', 'B2', 'B8']);
var cart_classifiedMangoRegions = dataMedian.classify(cart_trained_classifier);
// --- unsupervised
// var clusterer = ee.Clusterer.wekaKMeans(15).train(trainingData);
// var result = dataMedian.cluster(clusterer);
// Map.addLayer(dataMedian,{min:0,max: 0.3,bands: ['B4', 'B3', 'B2']},'Sentinel 2 - RGB');
// Map.addLayer(dataMedian,{max: 0.3,bands: ['B8']},'Sentinel 2 - IR');
// Map.addLayer(mango_points,{},'Mango Points');
// print(
Map.addLayer(cart_classifiedMangoRegions,{min:0,max:3,palette:['yellow','red','green'],opacity:0.7}, 'Classified Mango Regions');
// Export.image.toDrive({
//   image:dataMedian, 
//   description:'Sentinel2_December_2018_cloud_cleared', 
//   // folder, 
//   // fileNamePrefix, 
//   // dimensions, 
//   region:region, 
//   scale:10,
//   // crs:, 
//   // crsTransform:, 
//   maxPixels:1e10, 
//   // shardSize:, 
//   // fileDimensions:, 
//   // skipEmptyTiles:, 
//   // fileFormat:, 
//   formatOptions: {
//     cloudOptimized: true
//   }
// });