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
    BuiltUp02 = ui.import && ui.import("BuiltUp02", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.76410821748517,
            -1.3962118106275971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76513818574689,
            -1.3973272780356731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75320772004865,
            -1.3967266418048112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.756040132768376,
            -1.3967695443978225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75891546083234,
            -1.3971127651136945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74964574647687,
            -1.396383421032529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7510190374925,
            -1.3964692262303067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7499032385423,
            -1.3927795999000783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74852994752668,
            -1.3923505732074088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.760589159257634,
            -1.3962976158316343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7629065878465,
            -1.3953966610331046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.745568788774236,
            -1.3962547132299972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6545024283006,
            -1.362189802412544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65639070344709,
            -1.3605165764017182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65540365052961,
            -1.362275608843321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656691110856755,
            -1.3611172217699703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67656087977197,
            -1.3346457668885021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.677676678722165,
            -1.333916403852401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67686128718164,
            -1.3355467444579712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67428636652734,
            -1.334903189084896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.662672301160114,
            -1.3463733196922851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666148444043415,
            -1.3423403877217999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69151118650337,
            -1.4265163888572387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75863078489204,
            -1.3398227629451738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78818714014102,
            -1.3093610110719178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7952252565961,
            -1.3130507642720044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79865848413516,
            -1.314595310506952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7926503359418,
            -1.3156250074661717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7831231295209,
            -1.3149385428738956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84671358860742,
            -1.312307637457578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84894518650781,
            -1.3123934456322914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82585673130762,
            -1.3014099754063593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.837873027694336,
            -1.2955749873678213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.869630382430664,
            -1.3028687203090352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85503916538965,
            -1.3014099754063593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87443690098535,
            -1.3020106351744072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.851605937850586,
            -1.3032977627667728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85950236119043,
            -1.3111921309184507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.851090953719726,
            -1.310505665108811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83778719700586,
            -1.2994363780187754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.88499407566797,
            -1.304155847462917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8841357687832,
            -1.3170270826898869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.88241915501367,
            -1.3120502129157667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754240135838785,
            -1.3976015769478556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76604185550431,
            -1.3985454334614489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76805887668351,
            -1.3967435252426765
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC02": 0
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
            ee.Geometry.Point([36.76410821748517, -1.3962118106275971]),
            {
              "LC02": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76513818574689, -1.3973272780356731]),
            {
              "LC02": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75320772004865, -1.3967266418048112]),
            {
              "LC02": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.756040132768376, -1.3967695443978225]),
            {
              "LC02": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75891546083234, -1.3971127651136945]),
            {
              "LC02": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74964574647687, -1.396383421032529]),
            {
              "LC02": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7510190374925, -1.3964692262303067]),
            {
              "LC02": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7499032385423, -1.3927795999000783]),
            {
              "LC02": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74852994752668, -1.3923505732074088]),
            {
              "LC02": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.760589159257634, -1.3962976158316343]),
            {
              "LC02": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7629065878465, -1.3953966610331046]),
            {
              "LC02": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.745568788774236, -1.3962547132299972]),
            {
              "LC02": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6545024283006, -1.362189802412544]),
            {
              "LC02": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65639070344709, -1.3605165764017182]),
            {
              "LC02": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65540365052961, -1.362275608843321]),
            {
              "LC02": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656691110856755, -1.3611172217699703]),
            {
              "LC02": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67656087977197, -1.3346457668885021]),
            {
              "LC02": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.677676678722165, -1.333916403852401]),
            {
              "LC02": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67686128718164, -1.3355467444579712]),
            {
              "LC02": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67428636652734, -1.334903189084896]),
            {
              "LC02": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.662672301160114, -1.3463733196922851]),
            {
              "LC02": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666148444043415, -1.3423403877217999]),
            {
              "LC02": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69151118650337, -1.4265163888572387]),
            {
              "LC02": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75863078489204, -1.3398227629451738]),
            {
              "LC02": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78818714014102, -1.3093610110719178]),
            {
              "LC02": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7952252565961, -1.3130507642720044]),
            {
              "LC02": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79865848413516, -1.314595310506952]),
            {
              "LC02": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7926503359418, -1.3156250074661717]),
            {
              "LC02": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7831231295209, -1.3149385428738956]),
            {
              "LC02": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84671358860742, -1.312307637457578]),
            {
              "LC02": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84894518650781, -1.3123934456322914]),
            {
              "LC02": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82585673130762, -1.3014099754063593]),
            {
              "LC02": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.837873027694336, -1.2955749873678213]),
            {
              "LC02": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.869630382430664, -1.3028687203090352]),
            {
              "LC02": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85503916538965, -1.3014099754063593]),
            {
              "LC02": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87443690098535, -1.3020106351744072]),
            {
              "LC02": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.851605937850586, -1.3032977627667728]),
            {
              "LC02": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85950236119043, -1.3111921309184507]),
            {
              "LC02": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.851090953719726, -1.310505665108811]),
            {
              "LC02": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83778719700586, -1.2994363780187754]),
            {
              "LC02": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.88499407566797, -1.304155847462917]),
            {
              "LC02": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8841357687832, -1.3170270826898869]),
            {
              "LC02": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.88241915501367, -1.3120502129157667]),
            {
              "LC02": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754240135838785, -1.3976015769478556]),
            {
              "LC02": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76604185550431, -1.3985454334614489]),
            {
              "LC02": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76805887668351, -1.3967435252426765]),
            {
              "LC02": 0,
              "system:index": "45"
            })]),
    ForestedAreas02 = ui.import && ui.import("ForestedAreas02", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69795268221016,
            -1.3534230514140386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70284503145332,
            -1.3547101522249887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70971148653145,
            -1.3599443551383688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71468966646309,
            -1.3632050003980203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71657794160957,
            -1.3662082223887186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7113422696125,
            -1.3695546653269988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706535751057814,
            -1.3705843391376706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70619242830391,
            -1.364406289644282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69915431184883,
            -1.3586572571121214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69683688325996,
            -1.3645779023447855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6974376980793,
            -1.3668088663366114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70018428011055,
            -1.3602875811628028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.699240142537306,
            -1.3539378918204337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7124580685627,
            -1.3608024201079112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709968978596876,
            -1.3626043555500815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70456164522285,
            -1.3565978988440108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63913967435158,
            -1.4051545690218934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.643345378086934,
            -1.4016365663713288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65046932523049,
            -1.4018081763794545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63939716641701,
            -1.3985475840760258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.639311335728536,
            -1.3943431294203448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63853885953225,
            -1.3858483920211855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64952518765725,
            -1.406784861137274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64102794949807,
            -1.4044681298959751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.640083811924825,
            -1.3994914402091485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64265873257912,
            -1.3965740654804122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73534533429141,
            -1.3204641377535222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744958371400784,
            -1.321665447999918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75285479474063,
            -1.3208073693117526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75525805401797,
            -1.3151440425477725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76075121808047,
            -1.3153156586994197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76881930279727,
            -1.3148008102090978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76710268902774,
            -1.3208073693117526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74907824444766,
            -1.3230383732842066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73414370465274,
            -1.3135994966521394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73929354596133,
            -1.3201209061478762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70154197784739,
            -1.3628953879399273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71081169220286,
            -1.3607502268055636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71475990387278,
            -1.3641395805225214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69956787201243,
            -1.3660273197638397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697465020144755,
            -1.3680008637484855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69699295135813,
            -1.3604070008469415
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC02": 1
      },
      "color": "#3a6200",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #3a6200 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.69795268221016, -1.3534230514140386]),
            {
              "LC02": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70284503145332, -1.3547101522249887]),
            {
              "LC02": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70971148653145, -1.3599443551383688]),
            {
              "LC02": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71468966646309, -1.3632050003980203]),
            {
              "LC02": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71657794160957, -1.3662082223887186]),
            {
              "LC02": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7113422696125, -1.3695546653269988]),
            {
              "LC02": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706535751057814, -1.3705843391376706]),
            {
              "LC02": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70619242830391, -1.364406289644282]),
            {
              "LC02": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69915431184883, -1.3586572571121214]),
            {
              "LC02": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69683688325996, -1.3645779023447855]),
            {
              "LC02": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6974376980793, -1.3668088663366114]),
            {
              "LC02": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70018428011055, -1.3602875811628028]),
            {
              "LC02": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.699240142537306, -1.3539378918204337]),
            {
              "LC02": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7124580685627, -1.3608024201079112]),
            {
              "LC02": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709968978596876, -1.3626043555500815]),
            {
              "LC02": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70456164522285, -1.3565978988440108]),
            {
              "LC02": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63913967435158, -1.4051545690218934]),
            {
              "LC02": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.643345378086934, -1.4016365663713288]),
            {
              "LC02": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65046932523049, -1.4018081763794545]),
            {
              "LC02": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63939716641701, -1.3985475840760258]),
            {
              "LC02": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.639311335728536, -1.3943431294203448]),
            {
              "LC02": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63853885953225, -1.3858483920211855]),
            {
              "LC02": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64952518765725, -1.406784861137274]),
            {
              "LC02": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64102794949807, -1.4044681298959751]),
            {
              "LC02": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.640083811924825, -1.3994914402091485]),
            {
              "LC02": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64265873257912, -1.3965740654804122]),
            {
              "LC02": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73534533429141, -1.3204641377535222]),
            {
              "LC02": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744958371400784, -1.321665447999918]),
            {
              "LC02": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75285479474063, -1.3208073693117526]),
            {
              "LC02": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75525805401797, -1.3151440425477725]),
            {
              "LC02": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76075121808047, -1.3153156586994197]),
            {
              "LC02": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76881930279727, -1.3148008102090978]),
            {
              "LC02": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76710268902774, -1.3208073693117526]),
            {
              "LC02": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74907824444766, -1.3230383732842066]),
            {
              "LC02": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73414370465274, -1.3135994966521394]),
            {
              "LC02": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73929354596133, -1.3201209061478762]),
            {
              "LC02": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70154197784739, -1.3628953879399273]),
            {
              "LC02": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71081169220286, -1.3607502268055636]),
            {
              "LC02": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71475990387278, -1.3641395805225214]),
            {
              "LC02": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69956787201243, -1.3660273197638397]),
            {
              "LC02": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697465020144755, -1.3680008637484855]),
            {
              "LC02": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69699295135813, -1.3604070008469415]),
            {
              "LC02": 1,
              "system:index": "41"
            })]),
    Vegetation02 = ui.import && ui.import("Vegetation02", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.7056530866596,
            -1.4045943477248393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725050822255305,
            -1.3990170226615113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7261666212055,
            -1.4002182937973255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.727539912221125,
            -1.3993602430488192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.689602747914485,
            -1.3830572194047552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71715439891546,
            -1.3857171941013908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67947472667425,
            -1.3935254896441256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666600123402766,
            -1.3975583354554328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66368187999456,
            -1.3967860889206534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.676485797047455,
            -1.3730330733737928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6748550139664,
            -1.3731188794168856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67442586052402,
            -1.3758646711682543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65760304558261,
            -1.3780956246394158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.655285616993744,
            -1.3771517599641503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6554572783707,
            -1.3702014722251818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.670992632984955,
            -1.3687427672964168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663267871022065,
            -1.361363422901066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66841771233066,
            -1.3589608407761458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6774299346207,
            -1.3632511643197922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659239567460304,
            -1.3806640619940185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66456107014585,
            -1.3794627809112865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67159918660093,
            -1.3792053634574941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66873776946413,
            -1.3893848740639154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6713985208069,
            -1.3823488163604762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6950240958292,
            -1.418429840502792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69051798468418,
            -1.4207036556713928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69137629156894,
            -1.4209610685683918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692320429142185,
            -1.411436772317496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69051798468418,
            -1.4045723904549574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71111734991855,
            -1.413238669202769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712061487491795,
            -1.4243074336170123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70176180487461,
            -1.425594495803917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73240336066074,
            -1.4186014492727534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69470369341348,
            -1.4020082365626374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692300434136136,
            -1.3905103392638483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69393121721719,
            -1.3886226194170816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70096933367227,
            -1.3834742849054367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68079912188028,
            -1.3738044595842047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68097078325723,
            -1.3663393244694826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666637058281644,
            -1.3709728593486548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66449129106973,
            -1.3721741447064975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66148721697305,
            -1.3688277054250029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67024194719766,
            -1.3623922321513169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.676656214317426,
            -1.3883119378055964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71425005587016,
            -1.3986085745039551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70446535738383,
            -1.3989517949510193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71347757967387,
            -1.4225480796335828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72206064852153,
            -1.4161985575023495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70721193941508,
            -1.3899422416128742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69219156893168,
            -1.379559761339109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75522217572592,
            -1.3988596853361717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74818405927084,
            -1.4000609565525812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74676785291098,
            -1.3974868031929266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744836662420255,
            -1.3975726083504003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74397835553549,
            -1.399202905746494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74445042432211,
            -1.4002325666761104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74071678937338,
            -1.3969719721822718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.751316879400235,
            -1.4007902994908208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7576683503475,
            -1.398688075112175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76230822055558,
            -1.3988886539177494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75389681308488,
            -1.4013770007235904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75630007236222,
            -1.402921490515028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764968971898355,
            -1.3988028488083784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75406847446183,
            -1.3926677753675802
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC02": 2
      },
      "color": "#31d20d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #31d20d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.7056530866596, -1.4045943477248393]),
            {
              "LC02": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725050822255305, -1.3990170226615113]),
            {
              "LC02": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7261666212055, -1.4002182937973255]),
            {
              "LC02": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.727539912221125, -1.3993602430488192]),
            {
              "LC02": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.689602747914485, -1.3830572194047552]),
            {
              "LC02": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71715439891546, -1.3857171941013908]),
            {
              "LC02": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67947472667425, -1.3935254896441256]),
            {
              "LC02": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666600123402766, -1.3975583354554328]),
            {
              "LC02": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66368187999456, -1.3967860889206534]),
            {
              "LC02": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.676485797047455, -1.3730330733737928]),
            {
              "LC02": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6748550139664, -1.3731188794168856]),
            {
              "LC02": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67442586052402, -1.3758646711682543]),
            {
              "LC02": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65760304558261, -1.3780956246394158]),
            {
              "LC02": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.655285616993744, -1.3771517599641503]),
            {
              "LC02": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6554572783707, -1.3702014722251818]),
            {
              "LC02": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.670992632984955, -1.3687427672964168]),
            {
              "LC02": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663267871022065, -1.361363422901066]),
            {
              "LC02": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66841771233066, -1.3589608407761458]),
            {
              "LC02": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6774299346207, -1.3632511643197922]),
            {
              "LC02": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659239567460304, -1.3806640619940185]),
            {
              "LC02": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66456107014585, -1.3794627809112865]),
            {
              "LC02": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67159918660093, -1.3792053634574941]),
            {
              "LC02": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66873776946413, -1.3893848740639154]),
            {
              "LC02": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6713985208069, -1.3823488163604762]),
            {
              "LC02": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6950240958292, -1.418429840502792]),
            {
              "LC02": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69051798468418, -1.4207036556713928]),
            {
              "LC02": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69137629156894, -1.4209610685683918]),
            {
              "LC02": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692320429142185, -1.411436772317496]),
            {
              "LC02": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69051798468418, -1.4045723904549574]),
            {
              "LC02": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71111734991855, -1.413238669202769]),
            {
              "LC02": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712061487491795, -1.4243074336170123]),
            {
              "LC02": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70176180487461, -1.425594495803917]),
            {
              "LC02": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73240336066074, -1.4186014492727534]),
            {
              "LC02": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69470369341348, -1.4020082365626374]),
            {
              "LC02": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692300434136136, -1.3905103392638483]),
            {
              "LC02": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69393121721719, -1.3886226194170816]),
            {
              "LC02": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70096933367227, -1.3834742849054367]),
            {
              "LC02": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68079912188028, -1.3738044595842047]),
            {
              "LC02": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68097078325723, -1.3663393244694826]),
            {
              "LC02": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666637058281644, -1.3709728593486548]),
            {
              "LC02": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66449129106973, -1.3721741447064975]),
            {
              "LC02": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66148721697305, -1.3688277054250029]),
            {
              "LC02": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67024194719766, -1.3623922321513169]),
            {
              "LC02": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.676656214317426, -1.3883119378055964]),
            {
              "LC02": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71425005587016, -1.3986085745039551]),
            {
              "LC02": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70446535738383, -1.3989517949510193]),
            {
              "LC02": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71347757967387, -1.4225480796335828]),
            {
              "LC02": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72206064852153, -1.4161985575023495]),
            {
              "LC02": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70721193941508, -1.3899422416128742]),
            {
              "LC02": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69219156893168, -1.379559761339109]),
            {
              "LC02": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75522217572592, -1.3988596853361717]),
            {
              "LC02": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74818405927084, -1.4000609565525812]),
            {
              "LC02": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74676785291098, -1.3974868031929266]),
            {
              "LC02": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744836662420255, -1.3975726083504003]),
            {
              "LC02": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74397835553549, -1.399202905746494]),
            {
              "LC02": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74445042432211, -1.4002325666761104]),
            {
              "LC02": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74071678937338, -1.3969719721822718]),
            {
              "LC02": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.751316879400235, -1.4007902994908208]),
            {
              "LC02": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7576683503475, -1.398688075112175]),
            {
              "LC02": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76230822055558, -1.3988886539177494]),
            {
              "LC02": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75389681308488, -1.4013770007235904]),
            {
              "LC02": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75630007236222, -1.402921490515028]),
            {
              "LC02": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764968971898355, -1.3988028488083784]),
            {
              "LC02": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75406847446183, -1.3926677753675802]),
            {
              "LC02": 2,
              "system:index": "63"
            })]),
    NonBuilt_Up02 = ui.import && ui.import("NonBuilt_Up02", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.81734832705055,
            -1.3843180765702798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81794914186989,
            -1.3891231874170553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81245597780739,
            -1.390067047329033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.809280242333756,
            -1.3896380201430723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.801812972436295,
            -1.3914399338001098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80018218935524,
            -1.389208992879188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.797349776635514,
            -1.3902386581815835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79297241152321,
            -1.3913541284190685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78850921572243,
            -1.3915257391780216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78387435854469,
            -1.394014093779084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78095611513649,
            -1.3972746923782937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78172859133278,
            -1.402937826550464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78499015749489,
            -1.39976304089638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78344520510231,
            -1.3964166405537293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79048332155739,
            -1.3946147307027472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783101882348404,
            -1.4042249005888408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77529128969704,
            -1.401050116680194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77778037966286,
            -1.400878506616523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712205733666764,
            -1.40671324171944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71452316225563,
            -1.4052545593092691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69709953249489,
            -1.3991624052887794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69864448488747,
            -1.3925554034695349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720187987695084,
            -1.4006210914974613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687486495385514,
            -1.397789523322602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69452461184059,
            -1.408515142261091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72971519411598,
            -1.380199402378017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73297676027809,
            -1.383030991652765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73675331057106,
            -1.3845754934699561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74542221010719,
            -1.3840606596426528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7105371892285,
            -1.3875786885661003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71834778187987,
            -1.392812819472142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68315719960448,
            -1.361322054715823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68315719960448,
            -1.3660414055678813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69208359120604,
            -1.3581472134885684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69337105153319,
            -1.3594343117866514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65912460683104,
            -1.367414305894803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66118454335448,
            -1.3650975361380173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65071319936034,
            -1.3478504024805085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65217232106444,
            -1.3435600516912127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65946792958495,
            -1.3348511004209656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66461777089354,
            -1.3316762247162819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66187118886229,
            -1.329101998169227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66092705128905,
            -1.3224948044283666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6636736333203,
            -1.334078833734586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66169952748534,
            -1.324963216911387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66015457509276,
            -1.3294252153635098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66161369679686,
            -1.3350027020853996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69875477515522,
            -1.3963001546578073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710170256722606,
            -1.389778950245661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72826034302878,
            -1.4214574270088405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72868949647116,
            -1.4227444907866968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74448234315085,
            -1.386706435945672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74551231141257,
            -1.3874786857820325
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC02": 3
      },
      "color": "#fdc62d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fdc62d */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.81734832705055, -1.3843180765702798]),
            {
              "LC02": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81794914186989, -1.3891231874170553]),
            {
              "LC02": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81245597780739, -1.390067047329033]),
            {
              "LC02": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.809280242333756, -1.3896380201430723]),
            {
              "LC02": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.801812972436295, -1.3914399338001098]),
            {
              "LC02": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80018218935524, -1.389208992879188]),
            {
              "LC02": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.797349776635514, -1.3902386581815835]),
            {
              "LC02": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79297241152321, -1.3913541284190685]),
            {
              "LC02": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78850921572243, -1.3915257391780216]),
            {
              "LC02": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78387435854469, -1.394014093779084]),
            {
              "LC02": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78095611513649, -1.3972746923782937]),
            {
              "LC02": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78172859133278, -1.402937826550464]),
            {
              "LC02": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78499015749489, -1.39976304089638]),
            {
              "LC02": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78344520510231, -1.3964166405537293]),
            {
              "LC02": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79048332155739, -1.3946147307027472]),
            {
              "LC02": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783101882348404, -1.4042249005888408]),
            {
              "LC02": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77529128969704, -1.401050116680194]),
            {
              "LC02": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77778037966286, -1.400878506616523]),
            {
              "LC02": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712205733666764, -1.40671324171944]),
            {
              "LC02": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71452316225563, -1.4052545593092691]),
            {
              "LC02": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69709953249489, -1.3991624052887794]),
            {
              "LC02": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69864448488747, -1.3925554034695349]),
            {
              "LC02": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720187987695084, -1.4006210914974613]),
            {
              "LC02": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687486495385514, -1.397789523322602]),
            {
              "LC02": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69452461184059, -1.408515142261091]),
            {
              "LC02": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72971519411598, -1.380199402378017]),
            {
              "LC02": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73297676027809, -1.383030991652765]),
            {
              "LC02": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73675331057106, -1.3845754934699561]),
            {
              "LC02": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74542221010719, -1.3840606596426528]),
            {
              "LC02": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7105371892285, -1.3875786885661003]),
            {
              "LC02": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71834778187987, -1.392812819472142]),
            {
              "LC02": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68315719960448, -1.361322054715823]),
            {
              "LC02": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68315719960448, -1.3660414055678813]),
            {
              "LC02": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69208359120604, -1.3581472134885684]),
            {
              "LC02": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69337105153319, -1.3594343117866514]),
            {
              "LC02": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65912460683104, -1.367414305894803]),
            {
              "LC02": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66118454335448, -1.3650975361380173]),
            {
              "LC02": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65071319936034, -1.3478504024805085]),
            {
              "LC02": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65217232106444, -1.3435600516912127]),
            {
              "LC02": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65946792958495, -1.3348511004209656]),
            {
              "LC02": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66461777089354, -1.3316762247162819]),
            {
              "LC02": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66187118886229, -1.329101998169227]),
            {
              "LC02": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66092705128905, -1.3224948044283666]),
            {
              "LC02": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6636736333203, -1.334078833734586]),
            {
              "LC02": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66169952748534, -1.324963216911387]),
            {
              "LC02": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66015457509276, -1.3294252153635098]),
            {
              "LC02": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66161369679686, -1.3350027020853996]),
            {
              "LC02": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69875477515522, -1.3963001546578073]),
            {
              "LC02": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710170256722606, -1.389778950245661]),
            {
              "LC02": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72826034302878, -1.4214574270088405]),
            {
              "LC02": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72868949647116, -1.4227444907866968]),
            {
              "LC02": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74448234315085, -1.386706435945672]),
            {
              "LC02": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74551231141257, -1.3874786857820325]),
            {
              "LC02": 3,
              "system:index": "52"
            })]),
    Water02 = ui.import && ui.import("Water02", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.33535165619607,
            -0.7382316878986561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.32436532807107,
            -0.7746207277352246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.32436532807107,
            -0.7938450009262302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36007089447732,
            -0.789725521264054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.35595102143044,
            -0.7547097814471568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37723703217263,
            -0.7457841551039731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.40813608002419,
            -0.7409780411007858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38204355072732,
            -0.7842328753673667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36144418549294,
            -0.8110094551021934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.33535165619607,
            -0.8041436820802782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34702462982888,
            -0.7663817266870329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.32985849213357,
            -0.7485305036089451
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC02": 4
      },
      "color": "#0a2fff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0a2fff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.33535165619607, -0.7382316878986561]),
            {
              "LC02": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.32436532807107, -0.7746207277352246]),
            {
              "LC02": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.32436532807107, -0.7938450009262302]),
            {
              "LC02": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36007089447732, -0.789725521264054]),
            {
              "LC02": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.35595102143044, -0.7547097814471568]),
            {
              "LC02": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37723703217263, -0.7457841551039731]),
            {
              "LC02": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.40813608002419, -0.7409780411007858]),
            {
              "LC02": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38204355072732, -0.7842328753673667]),
            {
              "LC02": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36144418549294, -0.8110094551021934]),
            {
              "LC02": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.33535165619607, -0.8041436820802782]),
            {
              "LC02": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34702462982888, -0.7663817266870329]),
            {
              "LC02": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.32985849213357, -0.7485305036089451]),
            {
              "LC02": 4,
              "system:index": "11"
            })]),
    BuiltUp04 = ui.import && ui.import("BuiltUp04", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.748212888115035,
            -1.3923608073436633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749672009819136,
            -1.3933475686157548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.761902882927046,
            -1.3958359212918439
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76413448082744,
            -1.3959217265095956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76456363426982,
            -1.396479460348661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75632388817607,
            -1.391931780574775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75460727440654,
            -1.3942485241988511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764649464958296,
            -1.3973375121502871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72928722130595,
            -1.3809057659001813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682509496086226,
            -1.3590251966062334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65495784508525,
            -1.3622858431087441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.674183919304,
            -1.335256667397099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67761714684306,
            -1.336715392457592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67632968651591,
            -1.3343985934276683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65718944298564,
            -1.361129264696603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7487789731243,
            -1.3925288498349095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762941036722935,
            -1.3957036452696956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748435650370396,
            -1.3931723897959456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747191105387486,
            -1.391413380152915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78721360631783,
            -1.3112493899582778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.795281691034624,
            -1.3124507046446259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79511002965767,
            -1.3158830291383337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82755402990181,
            -1.2819028105462935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82635240026314,
            -1.2851635583431096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84952668615181,
            -1.2807014813633077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84454850622017,
            -1.284820321928783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83081559606392,
            -1.282589284112123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83802537389595,
            -1.296833568902945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74918911484884,
            -1.3939075426635106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747043347636925,
            -1.393135294930158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750819897929894,
            -1.3934500961003764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69194004563497,
            -1.426504446423679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687648511211144,
            -1.429850803416107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73951386834483,
            -1.4014211175826232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72303437615733,
            -1.3764517258744746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72080277825694,
            -1.3729105904819574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72038643160835,
            -1.397947815693197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7447705142103,
            -1.398613490110628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748032097072574,
            -1.3983453868960143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75234508916852,
            -1.3986564304631717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73102669275387,
            -1.3978294718480782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73376254594906,
            -1.4000067764309787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73500709093197,
            -1.398902035934529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75604671478271,
            -1.396953918139093
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC04": 0
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
            ee.Geometry.Point([36.748212888115035, -1.3923608073436633]),
            {
              "LC04": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749672009819136, -1.3933475686157548]),
            {
              "LC04": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.761902882927046, -1.3958359212918439]),
            {
              "LC04": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76413448082744, -1.3959217265095956]),
            {
              "LC04": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76456363426982, -1.396479460348661]),
            {
              "LC04": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75632388817607, -1.391931780574775]),
            {
              "LC04": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75460727440654, -1.3942485241988511]),
            {
              "LC04": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764649464958296, -1.3973375121502871]),
            {
              "LC04": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72928722130595, -1.3809057659001813]),
            {
              "LC04": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682509496086226, -1.3590251966062334]),
            {
              "LC04": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65495784508525, -1.3622858431087441]),
            {
              "LC04": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.674183919304, -1.335256667397099]),
            {
              "LC04": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67761714684306, -1.336715392457592]),
            {
              "LC04": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67632968651591, -1.3343985934276683]),
            {
              "LC04": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65718944298564, -1.361129264696603]),
            {
              "LC04": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7487789731243, -1.3925288498349095]),
            {
              "LC04": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762941036722935, -1.3957036452696956]),
            {
              "LC04": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748435650370396, -1.3931723897959456]),
            {
              "LC04": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747191105387486, -1.391413380152915]),
            {
              "LC04": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78721360631783, -1.3112493899582778]),
            {
              "LC04": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.795281691034624, -1.3124507046446259]),
            {
              "LC04": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79511002965767, -1.3158830291383337]),
            {
              "LC04": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82755402990181, -1.2819028105462935]),
            {
              "LC04": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82635240026314, -1.2851635583431096]),
            {
              "LC04": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84952668615181, -1.2807014813633077]),
            {
              "LC04": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84454850622017, -1.284820321928783]),
            {
              "LC04": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83081559606392, -1.282589284112123]),
            {
              "LC04": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83802537389595, -1.296833568902945]),
            {
              "LC04": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74918911484884, -1.3939075426635106]),
            {
              "LC04": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747043347636925, -1.393135294930158]),
            {
              "LC04": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750819897929894, -1.3934500961003764]),
            {
              "LC04": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69194004563497, -1.426504446423679]),
            {
              "LC04": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687648511211144, -1.429850803416107]),
            {
              "LC04": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73951386834483, -1.4014211175826232]),
            {
              "LC04": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72303437615733, -1.3764517258744746]),
            {
              "LC04": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72080277825694, -1.3729105904819574]),
            {
              "LC04": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72038643160835, -1.397947815693197]),
            {
              "LC04": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7447705142103, -1.398613490110628]),
            {
              "LC04": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748032097072574, -1.3983453868960143]),
            {
              "LC04": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75234508916852, -1.3986564304631717]),
            {
              "LC04": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73102669275387, -1.3978294718480782]),
            {
              "LC04": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73376254594906, -1.4000067764309787]),
            {
              "LC04": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73500709093197, -1.398902035934529]),
            {
              "LC04": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75604671478271, -1.396953918139093]),
            {
              "LC04": 0,
              "system:index": "43"
            })]),
    ForestedAreas04 = ui.import && ui.import("ForestedAreas04", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.701833871828576,
            -1.3535430074744121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703636316286584,
            -1.3562888215751696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70947280310299,
            -1.359292052180324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71290603064205,
            -1.3610939887509934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705352930056115,
            -1.3642688260982638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70801368139889,
            -1.3640972133757125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69865813635494,
            -1.3576617274576168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.699859765993615,
            -1.359292052180324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70080390356686,
            -1.3614372146118452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69719901465084,
            -1.3648694705307967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69891562842037,
            -1.3653843084964215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70655455969479,
            -1.3701036513713942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70955863379147,
            -1.3696746205846386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69170585058834,
            -1.3666714029279932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69428077124264,
            -1.368902364974935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71101775549557,
            -1.361008182278144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.702091363894006,
            -1.3544010747151887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70955863379147,
            -1.3755094326931225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71118941687252,
            -1.375766850546202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70655455969479,
            -1.3717339676600846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64486172235209,
            -1.4013519587513907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64760830438334,
            -1.403497083209379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6426301244517,
            -1.398777806808686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64477589166361,
            -1.396804288406552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64889576471049,
            -1.4064144493139015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64010884293585,
            -1.391484360985901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64319874772101,
            -1.392084998554466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74688646390472,
            -1.3211311896291873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75461122586761,
            -1.3221608838851644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75701448514496,
            -1.317012408340893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76216432645355,
            -1.3158110958486313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76662752225433,
            -1.3190717998372505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.770060749793394,
            -1.3156394797310798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76765749051605,
            -1.3225041152089367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76868745877777,
            -1.3271377334287813
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC04": 1
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
            ee.Geometry.Point([36.701833871828576, -1.3535430074744121]),
            {
              "LC04": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703636316286584, -1.3562888215751696]),
            {
              "LC04": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70947280310299, -1.359292052180324]),
            {
              "LC04": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71290603064205, -1.3610939887509934]),
            {
              "LC04": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705352930056115, -1.3642688260982638]),
            {
              "LC04": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70801368139889, -1.3640972133757125]),
            {
              "LC04": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69865813635494, -1.3576617274576168]),
            {
              "LC04": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.699859765993615, -1.359292052180324]),
            {
              "LC04": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70080390356686, -1.3614372146118452]),
            {
              "LC04": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69719901465084, -1.3648694705307967]),
            {
              "LC04": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69891562842037, -1.3653843084964215]),
            {
              "LC04": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70655455969479, -1.3701036513713942]),
            {
              "LC04": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70955863379147, -1.3696746205846386]),
            {
              "LC04": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69170585058834, -1.3666714029279932]),
            {
              "LC04": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69428077124264, -1.368902364974935]),
            {
              "LC04": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71101775549557, -1.361008182278144]),
            {
              "LC04": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.702091363894006, -1.3544010747151887]),
            {
              "LC04": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70955863379147, -1.3755094326931225]),
            {
              "LC04": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71118941687252, -1.375766850546202]),
            {
              "LC04": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70655455969479, -1.3717339676600846]),
            {
              "LC04": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64486172235209, -1.4013519587513907]),
            {
              "LC04": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64760830438334, -1.403497083209379]),
            {
              "LC04": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6426301244517, -1.398777806808686]),
            {
              "LC04": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64477589166361, -1.396804288406552]),
            {
              "LC04": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64889576471049, -1.4064144493139015]),
            {
              "LC04": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64010884293585, -1.391484360985901]),
            {
              "LC04": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64319874772101, -1.392084998554466]),
            {
              "LC04": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74688646390472, -1.3211311896291873]),
            {
              "LC04": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75461122586761, -1.3221608838851644]),
            {
              "LC04": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75701448514496, -1.317012408340893]),
            {
              "LC04": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76216432645355, -1.3158110958486313]),
            {
              "LC04": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76662752225433, -1.3190717998372505]),
            {
              "LC04": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.770060749793394, -1.3156394797310798]),
            {
              "LC04": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76765749051605, -1.3225041152089367]),
            {
              "LC04": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76868745877777, -1.3271377334287813]),
            {
              "LC04": 1,
              "system:index": "34"
            })]),
    Vegetation04 = ui.import && ui.import("Vegetation04", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.72555483846156,
            -1.3999324363908552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725983991903945,
            -1.4011337070575758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694741621298476,
            -1.4018201471620109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705985441488906,
            -1.4046517104644254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725726499838515,
            -1.4168359739229337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72461070088832,
            -1.413403793492959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.732507124228164,
            -1.4194101059089683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73207797078578,
            -1.4092851702819345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.739201917929336,
            -1.4035362465424026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73293627767055,
            -1.4022491721250945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76010169057338,
            -1.391094497598037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.761947050375625,
            -1.3891209727560176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75259150533168,
            -1.3875764739036252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74222214502307,
            -1.3928239820346482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71707375329944,
            -1.3861740596606933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708752053200946,
            -1.3912794856047188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.688474517777856,
            -1.388748225380696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6903198775801,
            -1.3798673418299734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69242272944778,
            -1.379996050524536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69504056544631,
            -1.3793525069820682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67956343078299,
            -1.3811871312311514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.670250801083284,
            -1.376811033901674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66656008147879,
            -1.3745800792287588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.681237129208284,
            -1.3875367483139007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66484346770926,
            -1.3792135981375135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77351611109248,
            -1.3948694461470723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769224576668655,
            -1.4022486864490769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77527564020625,
            -1.3930675351113844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754385756915745,
            -1.3978664000898855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74361400551194,
            -1.4042588746898201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72499985968602,
            -1.3929477338685556
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC04": 2
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
            ee.Geometry.Point([36.72555483846156, -1.3999324363908552]),
            {
              "LC04": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725983991903945, -1.4011337070575758]),
            {
              "LC04": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694741621298476, -1.4018201471620109]),
            {
              "LC04": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705985441488906, -1.4046517104644254]),
            {
              "LC04": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725726499838515, -1.4168359739229337]),
            {
              "LC04": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72461070088832, -1.413403793492959]),
            {
              "LC04": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.732507124228164, -1.4194101059089683]),
            {
              "LC04": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73207797078578, -1.4092851702819345]),
            {
              "LC04": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.739201917929336, -1.4035362465424026]),
            {
              "LC04": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73293627767055, -1.4022491721250945]),
            {
              "LC04": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76010169057338, -1.391094497598037]),
            {
              "LC04": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.761947050375625, -1.3891209727560176]),
            {
              "LC04": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75259150533168, -1.3875764739036252]),
            {
              "LC04": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74222214502307, -1.3928239820346482]),
            {
              "LC04": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71707375329944, -1.3861740596606933]),
            {
              "LC04": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708752053200946, -1.3912794856047188]),
            {
              "LC04": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.688474517777856, -1.388748225380696]),
            {
              "LC04": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6903198775801, -1.3798673418299734]),
            {
              "LC04": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69242272944778, -1.379996050524536]),
            {
              "LC04": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69504056544631, -1.3793525069820682]),
            {
              "LC04": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67956343078299, -1.3811871312311514]),
            {
              "LC04": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.670250801083284, -1.376811033901674]),
            {
              "LC04": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66656008147879, -1.3745800792287588]),
            {
              "LC04": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.681237129208284, -1.3875367483139007]),
            {
              "LC04": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66484346770926, -1.3792135981375135]),
            {
              "LC04": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77351611109248, -1.3948694461470723]),
            {
              "LC04": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769224576668655, -1.4022486864490769]),
            {
              "LC04": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77527564020625, -1.3930675351113844]),
            {
              "LC04": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754385756915745, -1.3978664000898855]),
            {
              "LC04": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74361400551194, -1.4042588746898201]),
            {
              "LC04": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72499985968602, -1.3929477338685556]),
            {
              "LC04": 2,
              "system:index": "30"
            })]),
    NonBuilt_Up04 = ui.import && ui.import("NonBuilt_Up04", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.7833911380167,
            -1.399815712491113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78424944490146,
            -1.401960838356433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.787768503129,
            -1.402647278218357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.778412958085056,
            -1.4000731276986325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77326311677646,
            -1.4004163479313527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.817122598587986,
            -1.3842849428725308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.818410058915134,
            -1.3898623028443422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81549181550693,
            -1.388317804476399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81154360383701,
            -1.3896048865197992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80931200593662,
            -1.3900339137117776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.792145868241306,
            -1.3894332756211945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79257502168369,
            -1.3905487462392518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79652323335361,
            -1.3964693122235488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.787768503129,
            -1.3957828705537212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78605188935947,
            -1.3937235443423321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783219476639744,
            -1.3943241813401277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78459276765537,
            -1.4033337178789012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7808162173624,
            -1.4023040583125597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7449389895792,
            -1.3871165272703434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74511065095615,
            -1.3880603879836046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73644175142002,
            -1.384370748510052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73755755037021,
            -1.385657832700263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73154940217685,
            -1.3814533550931016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731463571488376,
            -1.3837701089821381
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71266665071201,
            -1.381110132102497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.713782449662204,
            -1.3835984976605067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710005899369236,
            -1.3879745824797811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7123233279581,
            -1.3913209948198912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71833147615146,
            -1.3920074377904512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69845035977484,
            -1.3948390129305468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69759205289007,
            -1.3987002462653635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69973782010199,
            -1.3997299074156593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68815067715765,
            -1.3976705846632633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6908972591889,
            -1.3996441023370632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68317249722601,
            -1.3951822339282414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.685833248568784,
            -1.3794798222204234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68763569302679,
            -1.3792224047684756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68317249722601,
            -1.3611173077644974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68317249722601,
            -1.3647211768297007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683773312045346,
            -1.3618037594306938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69184139676214,
            -1.358972145048571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69269970364691,
            -1.3583714991465454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69149807400824,
            -1.3597444038459536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65879658169867,
            -1.366265690491023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66016987271429,
            -1.365922465318736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65974071927191,
            -1.368153428061787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67338779873968,
            -1.3660940779110118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682829174472104,
            -1.366351496776436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734241756869565,
            -1.3842849428725308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71194530730041,
            -1.4032156743298345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.713318598316036,
            -1.4010705496139286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.716837656543575,
            -1.4002124991774094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71864010100158,
            -1.4003841092898446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72396160368713,
            -1.4030440644249114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71426273588928,
            -1.4051033824525676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69572330717834,
            -1.4080207465499945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.719069254443966,
            -1.4241519877956452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71589351897033,
            -1.426468699370455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698384058521114,
            -1.4167728169050102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70379139189514,
            -1.417201839113161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705078852222286,
            -1.4115387395753738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69855571989807,
            -1.4256964624378337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703619730518184,
            -1.4362503447024666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72868229155334,
            -1.4220926866628154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71651124383311,
            -1.39241157370486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74657460499766,
            -1.3866898847228881
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74805518437388,
            -1.3851453842835895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746467316637066,
            -1.3843087794585633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.737755501756695,
            -1.3916236988130863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73556681920054,
            -1.388405995140008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73758384037974,
            -1.3938546374500644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.736510956773785,
            -1.3955707426557948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73835631657603,
            -1.395742353107519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.756509507188824,
            -1.397115236270348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73193317155585,
            -1.39479329081586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.729615742966985,
            -1.3940639460153803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73399310807929,
            -1.3962948823402224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.738327557847356,
            -1.3915326887792978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73742633561835,
            -1.3924765477275802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71622615556464,
            -1.406376971968119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707857663438176,
            -1.408479189434465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73167567949042,
            -1.3961232719288277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74491567299921,
            -1.3962948823402224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74688977883417,
            -1.3963377849411214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75122422860224,
            -1.3970671290364596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7372767417248,
            -1.395136511820234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74242658303339,
            -1.3938494327957525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73448724434931,
            -1.3916184941538507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73354310677607,
            -1.3919617156208044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73594636605341,
            -1.389560205188873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73701924965937,
            -1.389989232388968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74598855660517,
            -1.3883589286141191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75289792702753,
            -1.3887879560323495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75474328682978,
            -1.3899463296724621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74766225503046,
            -1.3882302203734724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74646062539179,
            -1.389045372445897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71151988914031,
            -1.430527721365473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697958640361016,
            -1.4194589867788021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6888605873825,
            -1.4204028344360138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7588689628036,
            -1.4041294148317758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68868541889118,
            -1.391971036728432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714091302680245,
            -1.3859646538783523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68959386571971,
            -1.4248278147577726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698176934567364,
            -1.4266297012107625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69122464880076,
            -1.4246133043718154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69405706152049,
            -1.434609467085529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69311292394725,
            -1.4332366061173483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.701395585385235,
            -1.4340088405132736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70756718831378,
            -1.422296590931585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70881173329669,
            -1.4204088967789803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70894047932941,
            -1.4218246675381236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69695220318637,
            -1.399749877363784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698840478332855,
            -1.3974331391600219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70961222973666,
            -1.3897964674385492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70896849957309,
            -1.3852916775872353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70738063183627,
            -1.3822026738801074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71476207104526,
            -1.392156115837815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71162925091586,
            -1.39121225676128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71038470593295,
            -1.390525813559341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68978534069858,
            -1.3884664827561088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68630919781528,
            -1.3908261324847575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69245522944195,
            -1.4239520904750675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692283568064994,
            -1.4251533487238597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.685545859019584,
            -1.4240807967459714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69507306544048,
            -1.426311704298905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69936459986431,
            -1.429100335698225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69983666865093,
            -1.426097194051213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70635980097515,
            -1.4329186101207272
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC04": 3
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
            ee.Geometry.Point([36.7833911380167, -1.399815712491113]),
            {
              "LC04": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78424944490146, -1.401960838356433]),
            {
              "LC04": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.787768503129, -1.402647278218357]),
            {
              "LC04": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.778412958085056, -1.4000731276986325]),
            {
              "LC04": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77326311677646, -1.4004163479313527]),
            {
              "LC04": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.817122598587986, -1.3842849428725308]),
            {
              "LC04": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.818410058915134, -1.3898623028443422]),
            {
              "LC04": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81549181550693, -1.388317804476399]),
            {
              "LC04": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81154360383701, -1.3896048865197992]),
            {
              "LC04": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80931200593662, -1.3900339137117776]),
            {
              "LC04": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.792145868241306, -1.3894332756211945]),
            {
              "LC04": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79257502168369, -1.3905487462392518]),
            {
              "LC04": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79652323335361, -1.3964693122235488]),
            {
              "LC04": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.787768503129, -1.3957828705537212]),
            {
              "LC04": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78605188935947, -1.3937235443423321]),
            {
              "LC04": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783219476639744, -1.3943241813401277]),
            {
              "LC04": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78459276765537, -1.4033337178789012]),
            {
              "LC04": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7808162173624, -1.4023040583125597]),
            {
              "LC04": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7449389895792, -1.3871165272703434]),
            {
              "LC04": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74511065095615, -1.3880603879836046]),
            {
              "LC04": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73644175142002, -1.384370748510052]),
            {
              "LC04": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73755755037021, -1.385657832700263]),
            {
              "LC04": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73154940217685, -1.3814533550931016]),
            {
              "LC04": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731463571488376, -1.3837701089821381]),
            {
              "LC04": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71266665071201, -1.381110132102497]),
            {
              "LC04": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.713782449662204, -1.3835984976605067]),
            {
              "LC04": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710005899369236, -1.3879745824797811]),
            {
              "LC04": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7123233279581, -1.3913209948198912]),
            {
              "LC04": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71833147615146, -1.3920074377904512]),
            {
              "LC04": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69845035977484, -1.3948390129305468]),
            {
              "LC04": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69759205289007, -1.3987002462653635]),
            {
              "LC04": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69973782010199, -1.3997299074156593]),
            {
              "LC04": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68815067715765, -1.3976705846632633]),
            {
              "LC04": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6908972591889, -1.3996441023370632]),
            {
              "LC04": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68317249722601, -1.3951822339282414]),
            {
              "LC04": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.685833248568784, -1.3794798222204234]),
            {
              "LC04": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68763569302679, -1.3792224047684756]),
            {
              "LC04": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68317249722601, -1.3611173077644974]),
            {
              "LC04": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68317249722601, -1.3647211768297007]),
            {
              "LC04": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683773312045346, -1.3618037594306938]),
            {
              "LC04": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69184139676214, -1.358972145048571]),
            {
              "LC04": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69269970364691, -1.3583714991465454]),
            {
              "LC04": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69149807400824, -1.3597444038459536]),
            {
              "LC04": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65879658169867, -1.366265690491023]),
            {
              "LC04": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66016987271429, -1.365922465318736]),
            {
              "LC04": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65974071927191, -1.368153428061787]),
            {
              "LC04": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67338779873968, -1.3660940779110118]),
            {
              "LC04": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682829174472104, -1.366351496776436]),
            {
              "LC04": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734241756869565, -1.3842849428725308]),
            {
              "LC04": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71194530730041, -1.4032156743298345]),
            {
              "LC04": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.713318598316036, -1.4010705496139286]),
            {
              "LC04": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.716837656543575, -1.4002124991774094]),
            {
              "LC04": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71864010100158, -1.4003841092898446]),
            {
              "LC04": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72396160368713, -1.4030440644249114]),
            {
              "LC04": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71426273588928, -1.4051033824525676]),
            {
              "LC04": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69572330717834, -1.4080207465499945]),
            {
              "LC04": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.719069254443966, -1.4241519877956452]),
            {
              "LC04": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71589351897033, -1.426468699370455]),
            {
              "LC04": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698384058521114, -1.4167728169050102]),
            {
              "LC04": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70379139189514, -1.417201839113161]),
            {
              "LC04": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705078852222286, -1.4115387395753738]),
            {
              "LC04": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69855571989807, -1.4256964624378337]),
            {
              "LC04": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703619730518184, -1.4362503447024666]),
            {
              "LC04": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72868229155334, -1.4220926866628154]),
            {
              "LC04": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71651124383311, -1.39241157370486]),
            {
              "LC04": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74657460499766, -1.3866898847228881]),
            {
              "LC04": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74805518437388, -1.3851453842835895]),
            {
              "LC04": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746467316637066, -1.3843087794585633]),
            {
              "LC04": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.737755501756695, -1.3916236988130863]),
            {
              "LC04": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73556681920054, -1.388405995140008]),
            {
              "LC04": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73758384037974, -1.3938546374500644]),
            {
              "LC04": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.736510956773785, -1.3955707426557948]),
            {
              "LC04": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73835631657603, -1.395742353107519]),
            {
              "LC04": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.756509507188824, -1.397115236270348]),
            {
              "LC04": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73193317155585, -1.39479329081586]),
            {
              "LC04": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.729615742966985, -1.3940639460153803]),
            {
              "LC04": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73399310807929, -1.3962948823402224]),
            {
              "LC04": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.738327557847356, -1.3915326887792978]),
            {
              "LC04": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73742633561835, -1.3924765477275802]),
            {
              "LC04": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71622615556464, -1.406376971968119]),
            {
              "LC04": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707857663438176, -1.408479189434465]),
            {
              "LC04": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73167567949042, -1.3961232719288277]),
            {
              "LC04": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74491567299921, -1.3962948823402224]),
            {
              "LC04": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74688977883417, -1.3963377849411214]),
            {
              "LC04": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75122422860224, -1.3970671290364596]),
            {
              "LC04": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7372767417248, -1.395136511820234]),
            {
              "LC04": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74242658303339, -1.3938494327957525]),
            {
              "LC04": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73448724434931, -1.3916184941538507]),
            {
              "LC04": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73354310677607, -1.3919617156208044]),
            {
              "LC04": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73594636605341, -1.389560205188873]),
            {
              "LC04": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73701924965937, -1.389989232388968]),
            {
              "LC04": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74598855660517, -1.3883589286141191]),
            {
              "LC04": 3,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75289792702753, -1.3887879560323495]),
            {
              "LC04": 3,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75474328682978, -1.3899463296724621]),
            {
              "LC04": 3,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74766225503046, -1.3882302203734724]),
            {
              "LC04": 3,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74646062539179, -1.389045372445897]),
            {
              "LC04": 3,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71151988914031, -1.430527721365473]),
            {
              "LC04": 3,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697958640361016, -1.4194589867788021]),
            {
              "LC04": 3,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6888605873825, -1.4204028344360138]),
            {
              "LC04": 3,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7588689628036, -1.4041294148317758]),
            {
              "LC04": 3,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68868541889118, -1.391971036728432]),
            {
              "LC04": 3,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714091302680245, -1.3859646538783523]),
            {
              "LC04": 3,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68959386571971, -1.4248278147577726]),
            {
              "LC04": 3,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698176934567364, -1.4266297012107625]),
            {
              "LC04": 3,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69122464880076, -1.4246133043718154]),
            {
              "LC04": 3,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69405706152049, -1.434609467085529]),
            {
              "LC04": 3,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69311292394725, -1.4332366061173483]),
            {
              "LC04": 3,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([36.701395585385235, -1.4340088405132736]),
            {
              "LC04": 3,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70756718831378, -1.422296590931585]),
            {
              "LC04": 3,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70881173329669, -1.4204088967789803]),
            {
              "LC04": 3,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70894047932941, -1.4218246675381236]),
            {
              "LC04": 3,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69695220318637, -1.399749877363784]),
            {
              "LC04": 3,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698840478332855, -1.3974331391600219]),
            {
              "LC04": 3,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70961222973666, -1.3897964674385492]),
            {
              "LC04": 3,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70896849957309, -1.3852916775872353]),
            {
              "LC04": 3,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70738063183627, -1.3822026738801074]),
            {
              "LC04": 3,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71476207104526, -1.392156115837815]),
            {
              "LC04": 3,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71162925091586, -1.39121225676128]),
            {
              "LC04": 3,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71038470593295, -1.390525813559341]),
            {
              "LC04": 3,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68978534069858, -1.3884664827561088]),
            {
              "LC04": 3,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68630919781528, -1.3908261324847575]),
            {
              "LC04": 3,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69245522944195, -1.4239520904750675]),
            {
              "LC04": 3,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692283568064994, -1.4251533487238597]),
            {
              "LC04": 3,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([36.685545859019584, -1.4240807967459714]),
            {
              "LC04": 3,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69507306544048, -1.426311704298905]),
            {
              "LC04": 3,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69936459986431, -1.429100335698225]),
            {
              "LC04": 3,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69983666865093, -1.426097194051213]),
            {
              "LC04": 3,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70635980097515, -1.4329186101207272]),
            {
              "LC04": 3,
              "system:index": "127"
            })]),
    Water04 = ui.import && ui.import("Water04", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.350345702945155,
            -0.7425500714034514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37163171368734,
            -0.7442665406801644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34828576642172,
            -0.7676104558817575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34897241192953,
            -0.7851183088698714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.370601745425624,
            -0.7765360370525027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.369571777163905,
            -0.7576549779928194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.40661107081932,
            -0.7454372267723806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39253483790916,
            -0.7499000425726945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38463841456932,
            -0.7900651767822053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36506901759666,
            -0.8037967585274309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34927617091697,
            -0.8110058205108378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34103642482322,
            -0.7921249169563989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.33689799518988,
            -0.8075791203608225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37912669392035,
            -0.7993401844132799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.57052158025915,
            -0.882401752230315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.5458023419779,
            -0.8875509792473834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.5351593366068,
            -0.8999090947591475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.53447269109899,
            -0.9177596319867874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.511126743833366,
            -0.9198193036593266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.50048373846227,
            -0.9029986171175207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.478167759458366,
            -0.8971628504657112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.46752475408727,
            -0.8741629741950097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.457225071470084,
            -0.8604316373842237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.409503208677116,
            -0.8511629570491064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.3865005841654,
            -0.8556256577838601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.35045169500524,
            -0.8453271098389229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.340838657895866,
            -0.8415509687315081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87808267808912,
            -1.1968516549463648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87864057756422,
            -1.1971090908233677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.88280336595533,
            -1.1966800310149284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87864057756422,
            -1.1978813983093302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.87992803789137,
            -1.1968945609275445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.881987974414805,
            -1.1968945609275445
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC04": 4
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
            ee.Geometry.Point([36.350345702945155, -0.7425500714034514]),
            {
              "LC04": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37163171368734, -0.7442665406801644]),
            {
              "LC04": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34828576642172, -0.7676104558817575]),
            {
              "LC04": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34897241192953, -0.7851183088698714]),
            {
              "LC04": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.370601745425624, -0.7765360370525027]),
            {
              "LC04": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.369571777163905, -0.7576549779928194]),
            {
              "LC04": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.40661107081932, -0.7454372267723806]),
            {
              "LC04": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39253483790916, -0.7499000425726945]),
            {
              "LC04": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38463841456932, -0.7900651767822053]),
            {
              "LC04": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36506901759666, -0.8037967585274309]),
            {
              "LC04": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34927617091697, -0.8110058205108378]),
            {
              "LC04": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34103642482322, -0.7921249169563989]),
            {
              "LC04": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.33689799518988, -0.8075791203608225]),
            {
              "LC04": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37912669392035, -0.7993401844132799]),
            {
              "LC04": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([37.57052158025915, -0.882401752230315]),
            {
              "LC04": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([37.5458023419779, -0.8875509792473834]),
            {
              "LC04": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([37.5351593366068, -0.8999090947591475]),
            {
              "LC04": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([37.53447269109899, -0.9177596319867874]),
            {
              "LC04": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([37.511126743833366, -0.9198193036593266]),
            {
              "LC04": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([37.50048373846227, -0.9029986171175207]),
            {
              "LC04": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([37.478167759458366, -0.8971628504657112]),
            {
              "LC04": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([37.46752475408727, -0.8741629741950097]),
            {
              "LC04": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([37.457225071470084, -0.8604316373842237]),
            {
              "LC04": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([37.409503208677116, -0.8511629570491064]),
            {
              "LC04": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([37.3865005841654, -0.8556256577838601]),
            {
              "LC04": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([37.35045169500524, -0.8453271098389229]),
            {
              "LC04": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([37.340838657895866, -0.8415509687315081]),
            {
              "LC04": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87808267808912, -1.1968516549463648]),
            {
              "LC04": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87864057756422, -1.1971090908233677]),
            {
              "LC04": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.88280336595533, -1.1966800310149284]),
            {
              "LC04": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87864057756422, -1.1978813983093302]),
            {
              "LC04": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.87992803789137, -1.1968945609275445]),
            {
              "LC04": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.881987974414805, -1.1968945609275445]),
            {
              "LC04": 4,
              "system:index": "32"
            })]),
    ForestedAreas06 = ui.import && ui.import("ForestedAreas06", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69770834320717,
            -1.3540547315855693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70217153900795,
            -1.3540547315855693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703680210343734,
            -1.3541635443602063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70410936378612,
            -1.356222904700092
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706426792374984,
            -1.3572525842130532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71028917335643,
            -1.3604274266165786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71209161781444,
            -1.3604274266165786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71269243263377,
            -1.3624009751947594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7155248453535,
            -1.3641171030790789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71397989296092,
            -1.3631732328940747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71621149086131,
            -1.365490004505327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.699903660050765,
            -1.359998394103265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70084779762401,
            -1.3616287172478827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7045385172285,
            -1.363945490345701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707113437882796,
            -1.3648035538901768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71123331092967,
            -1.364031296713923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70951669716014,
            -1.3627442008694726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70848672889842,
            -1.3702093471724317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706426792374984,
            -1.3680641925653678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710375004044906,
            -1.3698661225643114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70960252784862,
            -1.3753577103857075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71269243263377,
            -1.3701235410250039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69784372352733,
            -1.3649751665623353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69853036903514,
            -1.367635161413688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6950113108076,
            -1.3698661225643114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6920930673994,
            -1.367291936437132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68883150123729,
            -1.366948711411494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691663913957015,
            -1.3634306520721478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.696899585954085,
            -1.3617145236986463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69732873939647,
            -1.3590545223055543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69183557533397,
            -1.3551074180666696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64016030860802,
            -1.4070881450105726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64333604408165,
            -1.4056315445909746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64702676368614,
            -1.4039154467484192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64934419227501,
            -1.404001251670481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.639473663100205,
            -1.401856127674691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.643679366835556,
            -1.3993677813775351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64187692237755,
            -1.3968794324404172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.640246139296494,
            -1.3916453105631432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.642992721327744,
            -1.3869260103863408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64213441444298,
            -1.3836653974920898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.640932784804306,
            -1.3832363691457992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.647713409193955,
            -1.3983381200682878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64446162781423,
            -1.3321531235271797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64240169129079,
            -1.323229128423128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63999843201345,
            -1.3306085882199818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.646864887091574,
            -1.3196251982101577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.650126453253684,
            -1.3139618687590033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6456632574529,
            -1.311559240261087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64240169129079,
            -1.3058958925396433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64720820984548,
            -1.3040081071273195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.745741840216574,
            -1.3213413561065726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749003406378684,
            -1.3204832773064772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749003406378684,
            -1.3218562032443573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7520548201989,
            -1.3215129718310203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.755659709114916,
            -1.3218562032443573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75960792078484,
            -1.3187671188178047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76407111658562,
            -1.3146483336198453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76836265100945,
            -1.314476717422322
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC06": 1
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
            ee.Geometry.Point([36.69770834320717, -1.3540547315855693]),
            {
              "LC06": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70217153900795, -1.3540547315855693]),
            {
              "LC06": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703680210343734, -1.3541635443602063]),
            {
              "LC06": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70410936378612, -1.356222904700092]),
            {
              "LC06": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706426792374984, -1.3572525842130532]),
            {
              "LC06": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71028917335643, -1.3604274266165786]),
            {
              "LC06": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71209161781444, -1.3604274266165786]),
            {
              "LC06": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71269243263377, -1.3624009751947594]),
            {
              "LC06": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7155248453535, -1.3641171030790789]),
            {
              "LC06": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71397989296092, -1.3631732328940747]),
            {
              "LC06": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71621149086131, -1.365490004505327]),
            {
              "LC06": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.699903660050765, -1.359998394103265]),
            {
              "LC06": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70084779762401, -1.3616287172478827]),
            {
              "LC06": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7045385172285, -1.363945490345701]),
            {
              "LC06": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707113437882796, -1.3648035538901768]),
            {
              "LC06": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71123331092967, -1.364031296713923]),
            {
              "LC06": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70951669716014, -1.3627442008694726]),
            {
              "LC06": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70848672889842, -1.3702093471724317]),
            {
              "LC06": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706426792374984, -1.3680641925653678]),
            {
              "LC06": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710375004044906, -1.3698661225643114]),
            {
              "LC06": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70960252784862, -1.3753577103857075]),
            {
              "LC06": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71269243263377, -1.3701235410250039]),
            {
              "LC06": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69784372352733, -1.3649751665623353]),
            {
              "LC06": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69853036903514, -1.367635161413688]),
            {
              "LC06": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6950113108076, -1.3698661225643114]),
            {
              "LC06": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6920930673994, -1.367291936437132]),
            {
              "LC06": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68883150123729, -1.366948711411494]),
            {
              "LC06": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691663913957015, -1.3634306520721478]),
            {
              "LC06": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.696899585954085, -1.3617145236986463]),
            {
              "LC06": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69732873939647, -1.3590545223055543]),
            {
              "LC06": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69183557533397, -1.3551074180666696]),
            {
              "LC06": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64016030860802, -1.4070881450105726]),
            {
              "LC06": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64333604408165, -1.4056315445909746]),
            {
              "LC06": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64702676368614, -1.4039154467484192]),
            {
              "LC06": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64934419227501, -1.404001251670481]),
            {
              "LC06": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.639473663100205, -1.401856127674691]),
            {
              "LC06": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.643679366835556, -1.3993677813775351]),
            {
              "LC06": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64187692237755, -1.3968794324404172]),
            {
              "LC06": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.640246139296494, -1.3916453105631432]),
            {
              "LC06": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.642992721327744, -1.3869260103863408]),
            {
              "LC06": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64213441444298, -1.3836653974920898]),
            {
              "LC06": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.640932784804306, -1.3832363691457992]),
            {
              "LC06": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.647713409193955, -1.3983381200682878]),
            {
              "LC06": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64446162781423, -1.3321531235271797]),
            {
              "LC06": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64240169129079, -1.323229128423128]),
            {
              "LC06": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63999843201345, -1.3306085882199818]),
            {
              "LC06": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.646864887091574, -1.3196251982101577]),
            {
              "LC06": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.650126453253684, -1.3139618687590033]),
            {
              "LC06": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6456632574529, -1.311559240261087]),
            {
              "LC06": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64240169129079, -1.3058958925396433]),
            {
              "LC06": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64720820984548, -1.3040081071273195]),
            {
              "LC06": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.745741840216574, -1.3213413561065726]),
            {
              "LC06": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749003406378684, -1.3204832773064772]),
            {
              "LC06": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749003406378684, -1.3218562032443573]),
            {
              "LC06": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7520548201989, -1.3215129718310203]),
            {
              "LC06": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.755659709114916, -1.3218562032443573]),
            {
              "LC06": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75960792078484, -1.3187671188178047]),
            {
              "LC06": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76407111658562, -1.3146483336198453]),
            {
              "LC06": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76836265100945, -1.314476717422322]),
            {
              "LC06": 1,
              "system:index": "58"
            })]),
    Vegetation06 = ui.import && ui.import("Vegetation06", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.7171395122596,
            -1.375518626257365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717740327078936,
            -1.3786076386481705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71731941274011,
            -1.3863520332928176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73002235463464,
            -1.3869955749370033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724142952474,
            -1.3863949360745376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72242644883397,
            -1.381546945225493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71444812040345,
            -1.3821187040364207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71706595640199,
            -1.3827622468298297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71552100400941,
            -1.389669595142572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72019877653138,
            -1.3906134548361475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.732129242229625,
            -1.3925869784300027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72386863609974,
            -1.3988066622781365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70060910232644,
            -1.401478127968123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730392351227806,
            -1.4076989831369278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72996319778542,
            -1.4046958137438637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72429837234597,
            -1.4141343330858656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71237207156737,
            -1.41397139947916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70499063235839,
            -1.4037606352405552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7192385266455,
            -1.4067638058364795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71202874881347,
            -1.403503220438442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.670662818795634,
            -1.4167578155511034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67169278705735,
            -1.4159855753712374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.671606956368876,
            -1.4162429887931298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.665943488917264,
            -1.4267388066498128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748383413329144,
            -1.4153164505241367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73954285241606,
            -1.41101784667362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74954212762358,
            -1.4099452881476695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72497109773932,
            -1.4204134381776194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71667139365995,
            -1.4162519251777335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72469656303251,
            -1.41161847923215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72074835136259,
            -1.423673999828656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71225111320341,
            -1.427234871100104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.701565192488076,
            -1.4256903974900055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69220964744413,
            -1.4230733703970186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.699076102522255,
            -1.4214859918606284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71366731956327,
            -1.4224298386895473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6950600182191,
            -1.4169937378768354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693600896515,
            -1.416006986590693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68733525625621,
            -1.4155779641613282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71047200205325,
            -1.4135990863474244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69280257318372,
            -1.4112573557850496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707908774355595,
            -1.396927934661921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71048369500989,
            -1.3973140579377266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697694922426884,
            -1.3964989087254858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.672646271699115,
            -1.3792425057878694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66672395419423,
            -1.3804437869818444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66071580600087,
            -1.3807012043016085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67281793307607,
            -1.3711767449494259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66329072665517,
            -1.3624245056388293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66955636691396,
            -1.3638832144042465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67135881137197,
            -1.3625961184806257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.667668091767474,
            -1.3622528927848065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6840617532665,
            -1.363797408030745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67172493120973,
            -1.3554688238583772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66726173540895,
            -1.351779134193916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6674333967859,
            -1.344828773330497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.660137788265395,
            -1.3460300716875975
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC06": 2
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
            ee.Geometry.Point([36.7171395122596, -1.375518626257365]),
            {
              "LC06": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717740327078936, -1.3786076386481705]),
            {
              "LC06": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71731941274011, -1.3863520332928176]),
            {
              "LC06": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73002235463464, -1.3869955749370033]),
            {
              "LC06": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724142952474, -1.3863949360745376]),
            {
              "LC06": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72242644883397, -1.381546945225493]),
            {
              "LC06": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71444812040345, -1.3821187040364207]),
            {
              "LC06": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71706595640199, -1.3827622468298297]),
            {
              "LC06": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71552100400941, -1.389669595142572]),
            {
              "LC06": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72019877653138, -1.3906134548361475]),
            {
              "LC06": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.732129242229625, -1.3925869784300027]),
            {
              "LC06": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72386863609974, -1.3988066622781365]),
            {
              "LC06": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70060910232644, -1.401478127968123]),
            {
              "LC06": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730392351227806, -1.4076989831369278]),
            {
              "LC06": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72996319778542, -1.4046958137438637]),
            {
              "LC06": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72429837234597, -1.4141343330858656]),
            {
              "LC06": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71237207156737, -1.41397139947916]),
            {
              "LC06": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70499063235839, -1.4037606352405552]),
            {
              "LC06": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7192385266455, -1.4067638058364795]),
            {
              "LC06": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71202874881347, -1.403503220438442]),
            {
              "LC06": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.670662818795634, -1.4167578155511034]),
            {
              "LC06": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67169278705735, -1.4159855753712374]),
            {
              "LC06": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.671606956368876, -1.4162429887931298]),
            {
              "LC06": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.665943488917264, -1.4267388066498128]),
            {
              "LC06": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748383413329144, -1.4153164505241367]),
            {
              "LC06": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73954285241606, -1.41101784667362]),
            {
              "LC06": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74954212762358, -1.4099452881476695]),
            {
              "LC06": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72497109773932, -1.4204134381776194]),
            {
              "LC06": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71667139365995, -1.4162519251777335]),
            {
              "LC06": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72469656303251, -1.41161847923215]),
            {
              "LC06": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72074835136259, -1.423673999828656]),
            {
              "LC06": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71225111320341, -1.427234871100104]),
            {
              "LC06": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.701565192488076, -1.4256903974900055]),
            {
              "LC06": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69220964744413, -1.4230733703970186]),
            {
              "LC06": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.699076102522255, -1.4214859918606284]),
            {
              "LC06": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71366731956327, -1.4224298386895473]),
            {
              "LC06": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6950600182191, -1.4169937378768354]),
            {
              "LC06": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693600896515, -1.416006986590693]),
            {
              "LC06": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68733525625621, -1.4155779641613282]),
            {
              "LC06": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71047200205325, -1.4135990863474244]),
            {
              "LC06": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69280257318372, -1.4112573557850496]),
            {
              "LC06": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707908774355595, -1.396927934661921]),
            {
              "LC06": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71048369500989, -1.3973140579377266]),
            {
              "LC06": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697694922426884, -1.3964989087254858]),
            {
              "LC06": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.672646271699115, -1.3792425057878694]),
            {
              "LC06": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66672395419423, -1.3804437869818444]),
            {
              "LC06": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66071580600087, -1.3807012043016085]),
            {
              "LC06": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67281793307607, -1.3711767449494259]),
            {
              "LC06": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66329072665517, -1.3624245056388293]),
            {
              "LC06": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66955636691396, -1.3638832144042465]),
            {
              "LC06": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67135881137197, -1.3625961184806257]),
            {
              "LC06": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.667668091767474, -1.3622528927848065]),
            {
              "LC06": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6840617532665, -1.363797408030745]),
            {
              "LC06": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67172493120973, -1.3554688238583772]),
            {
              "LC06": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66726173540895, -1.351779134193916]),
            {
              "LC06": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6674333967859, -1.344828773330497]),
            {
              "LC06": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.660137788265395, -1.3460300716875975]),
            {
              "LC06": 2,
              "system:index": "56"
            })]),
    NonBuilt_Up06 = ui.import && ui.import("NonBuilt_Up06", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.81785466401823,
            -1.3858006104931442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81579472749479,
            -1.3883747766194818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.811932346513345,
            -1.3891470259110261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80909993379362,
            -1.3895760531861823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.793478748490884,
            -1.3911205507312652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.789187214067056,
            -1.396354673775103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78652646272428,
            -1.3948101796609353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78515317170866,
            -1.3994436589577262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.775711795976235,
            -1.396440478973924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.745171148175984,
            -1.388188092759275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74611528574923,
            -1.3869010099445773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7427249735544,
            -1.3866864960740555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759064058387644,
            -1.4039029795501046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76344142349995,
            -1.4032594425308653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.771767000282175,
            -1.4048039310794183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77232489975727,
            -1.4021010754500995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78212313037218,
            -1.405077192059271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78654341082872,
            -1.4025459466998504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.781436484864365,
            -1.39675410380593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.795426887086045,
            -1.3964537856364294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.799932998231064,
            -1.3917773977656707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7915645061046,
            -1.3888171107404579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73387123910522,
            -1.383361491098378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73537327615356,
            -1.383146976907447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73211170999145,
            -1.382288919949849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65251601100994,
            -1.3317716914536553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.667193058739436,
            -1.3304845785657065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.679209355126154,
            -1.3381214385170996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686781230644506,
            -1.3906103453226788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73231441088132,
            -1.3831023600583228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.785443607048315,
            -1.4027517794682194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.795142474846166,
            -1.3911680804195008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79188090868406,
            -1.389966804662595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81677180834226,
            -1.3861055570217835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73439323429665,
            -1.3912784392756103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734509005435164,
            -1.3842423872016512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7356677197296,
            -1.3841994843809375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74592448700255,
            -1.38784622136673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759743227847274,
            -1.4040205044841203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7730040692169,
            -1.4042350167737159
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC06": 3
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
            ee.Geometry.Point([36.81785466401823, -1.3858006104931442]),
            {
              "LC06": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81579472749479, -1.3883747766194818]),
            {
              "LC06": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.811932346513345, -1.3891470259110261]),
            {
              "LC06": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80909993379362, -1.3895760531861823]),
            {
              "LC06": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.793478748490884, -1.3911205507312652]),
            {
              "LC06": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.789187214067056, -1.396354673775103]),
            {
              "LC06": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78652646272428, -1.3948101796609353]),
            {
              "LC06": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78515317170866, -1.3994436589577262]),
            {
              "LC06": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.775711795976235, -1.396440478973924]),
            {
              "LC06": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.745171148175984, -1.388188092759275]),
            {
              "LC06": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74611528574923, -1.3869010099445773]),
            {
              "LC06": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7427249735544, -1.3866864960740555]),
            {
              "LC06": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759064058387644, -1.4039029795501046]),
            {
              "LC06": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76344142349995, -1.4032594425308653]),
            {
              "LC06": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.771767000282175, -1.4048039310794183]),
            {
              "LC06": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77232489975727, -1.4021010754500995]),
            {
              "LC06": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78212313037218, -1.405077192059271]),
            {
              "LC06": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78654341082872, -1.4025459466998504]),
            {
              "LC06": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.781436484864365, -1.39675410380593]),
            {
              "LC06": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.795426887086045, -1.3964537856364294]),
            {
              "LC06": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.799932998231064, -1.3917773977656707]),
            {
              "LC06": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7915645061046, -1.3888171107404579]),
            {
              "LC06": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73387123910522, -1.383361491098378]),
            {
              "LC06": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73537327615356, -1.383146976907447]),
            {
              "LC06": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73211170999145, -1.382288919949849]),
            {
              "LC06": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65251601100994, -1.3317716914536553]),
            {
              "LC06": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.667193058739436, -1.3304845785657065]),
            {
              "LC06": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.679209355126154, -1.3381214385170996]),
            {
              "LC06": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686781230644506, -1.3906103453226788]),
            {
              "LC06": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73231441088132, -1.3831023600583228]),
            {
              "LC06": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.785443607048315, -1.4027517794682194]),
            {
              "LC06": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.795142474846166, -1.3911680804195008]),
            {
              "LC06": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79188090868406, -1.389966804662595]),
            {
              "LC06": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81677180834226, -1.3861055570217835]),
            {
              "LC06": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73439323429665, -1.3912784392756103]),
            {
              "LC06": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734509005435164, -1.3842423872016512]),
            {
              "LC06": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7356677197296, -1.3841994843809375]),
            {
              "LC06": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74592448700255, -1.38784622136673]),
            {
              "LC06": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759743227847274, -1.4040205044841203]),
            {
              "LC06": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7730040692169, -1.4042350167737159]),
            {
              "LC06": 3,
              "system:index": "39"
            })]),
    Water06 = ui.import && ui.import("Water06", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74095793400252,
            -1.4046851816220667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67471647098651,
            -1.387906421996242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67475938633075,
            -1.3880565816302104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71478227856244,
            -1.3674430011897132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.361327872365536,
            -0.7869146621393494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36544774541241,
            -0.795840202278064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37849401006085,
            -0.7738696076433779
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36544774541241,
            -0.7601379280035925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37368749150616,
            -0.7436598548690622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38536046513897,
            -0.7402269151782443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38398717412335,
            -0.7800488490258682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37712071904522,
            -0.7930938842824609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60362382146131,
            -0.7062977461025151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.606542064869515,
            -0.7033797235054259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.846292981763106,
            -0.8213939151898382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.844576367993575,
            -0.8232819958525188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83873988117717,
            -0.8167595316037451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.839598188061935,
            -0.8220804900795777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.833075055737716,
            -0.8215655589233318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84200144733928,
            -0.8162445997637438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.47349393569963,
            -0.9011009495645296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.48791349136369,
            -0.9014442298436923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.47246396743791,
            -0.8794742272744634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.53735196792619,
            -0.8887428380656966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.55486142837541,
            -0.8818772026624387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.576490761871504,
            -0.8825637667742581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.45804441177385,
            -0.8623100726205584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.41879500313977,
            -0.8644803773956767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.40986861153821,
            -0.8541818532002721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.51114882394055,
            -0.9073905904473867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.5358680622218,
            -0.9087637089889334
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC06": 4
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
            ee.Geometry.Point([36.74095793400252, -1.4046851816220667]),
            {
              "LC06": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67471647098651, -1.387906421996242]),
            {
              "LC06": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67475938633075, -1.3880565816302104]),
            {
              "LC06": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71478227856244, -1.3674430011897132]),
            {
              "LC06": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.361327872365536, -0.7869146621393494]),
            {
              "LC06": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36544774541241, -0.795840202278064]),
            {
              "LC06": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37849401006085, -0.7738696076433779]),
            {
              "LC06": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36544774541241, -0.7601379280035925]),
            {
              "LC06": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37368749150616, -0.7436598548690622]),
            {
              "LC06": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38536046513897, -0.7402269151782443]),
            {
              "LC06": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38398717412335, -0.7800488490258682]),
            {
              "LC06": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37712071904522, -0.7930938842824609]),
            {
              "LC06": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60362382146131, -0.7062977461025151]),
            {
              "LC06": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.606542064869515, -0.7033797235054259]),
            {
              "LC06": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.846292981763106, -0.8213939151898382]),
            {
              "LC06": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.844576367993575, -0.8232819958525188]),
            {
              "LC06": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83873988117717, -0.8167595316037451]),
            {
              "LC06": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.839598188061935, -0.8220804900795777]),
            {
              "LC06": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.833075055737716, -0.8215655589233318]),
            {
              "LC06": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84200144733928, -0.8162445997637438]),
            {
              "LC06": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([37.47349393569963, -0.9011009495645296]),
            {
              "LC06": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([37.48791349136369, -0.9014442298436923]),
            {
              "LC06": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([37.47246396743791, -0.8794742272744634]),
            {
              "LC06": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([37.53735196792619, -0.8887428380656966]),
            {
              "LC06": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([37.55486142837541, -0.8818772026624387]),
            {
              "LC06": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([37.576490761871504, -0.8825637667742581]),
            {
              "LC06": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([37.45804441177385, -0.8623100726205584]),
            {
              "LC06": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([37.41879500313977, -0.8644803773956767]),
            {
              "LC06": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([37.40986861153821, -0.8541818532002721]),
            {
              "LC06": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([37.51114882394055, -0.9073905904473867]),
            {
              "LC06": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([37.5358680622218, -0.9087637089889334]),
            {
              "LC06": 4,
              "system:index": "30"
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
    BuiltUp08 = ui.import && ui.import("BuiltUp08", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.747680590543894,
            -1.392928209515391
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74974052706733,
            -1.3934430414110162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7645034054853,
            -1.3956739783245664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76295845309272,
            -1.396961056350659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75995437899604,
            -1.3965320304202666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754117892179636,
            -1.3970468615273306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74896805087104,
            -1.396617835612612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75180046359077,
            -1.3934430414110162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659420606731196,
            -1.387937911527927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66251051151635,
            -1.3898256319217746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74652295111046,
            -1.3933239025747666
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728354776373486,
            -1.3802664795478894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.729384744635205,
            -1.3795800331744412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72706731604634,
            -1.381639371700213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724149072638134,
            -1.3830980687426782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72577985571919,
            -1.3839561254077033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74820904773934,
            -1.3934768508817654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75413136524422,
            -1.393734266783689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.756277132456134,
            -1.3921897709502535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76383023304207,
            -1.3969090605922572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764516878549884,
            -1.397423891616703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687631230749446,
            -1.429687446102459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69020615140374,
            -1.4277139539662613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68831787625726,
            -1.4254830477723786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691407781042415,
            -1.426169480677806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673604556563895,
            -1.3349101896781097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67678029203753,
            -1.3354250339885723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67823941374163,
            -1.3374844101515648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65566060690146,
            -1.3615779254862421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65703389791709,
            -1.3590895370338618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65806386617881,
            -1.3609772802327444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65600392965537,
            -1.3629508283607115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65471646932822,
            -1.3622643770212726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67682555034407,
            -1.3366202035465935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82517758678895,
            -1.282509834029533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83084241222841,
            -1.2830246890990484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8385671741913,
            -1.2984702928156564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84972516369325,
            -1.2799355571291449
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82929745983583,
            -1.3036188064705045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.838395512814344,
            -1.3079092264757946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84646359753114,
            -1.3127144881723471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79221860241395,
            -1.3127144881723471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79530850719911,
            -1.3163184283861646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7975401050995,
            -1.3137441859069734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.782433903927625,
            -1.3154603478548041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74587003063661,
            -1.2880016160894516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74964658092958,
            -1.289889413441705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84217206310731,
            -1.2670641339681474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84200040173036,
            -1.2716978537077097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.85144177746278,
            -1.265347939366961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84903851818544,
            -1.2727275680767385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.8605398304413,
            -1.3048201248099742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84303036999208,
            -1.3007013166893628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78681126903993,
            -1.3006155081152864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.825606740231336,
            -1.301301976626171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82732335400087,
            -1.2841402080608117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84431783031923,
            -1.3110841325587064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.86165562939149,
            -1.3047343163761729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83118573498231,
            -1.3037904234112472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.82929745983583,
            -1.2838827806512851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73254113751667,
            -1.3986271185239227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72996621686237,
            -1.3960529635920944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74146752911823,
            -1.39326429256889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75627332288044,
            -1.3999141949312783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73455815869587,
            -1.3948516903257155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73850637036579,
            -1.39523781394254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73176866132038,
            -1.3947229824393699
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC08": 0
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
            ee.Geometry.Point([36.747680590543894, -1.392928209515391]),
            {
              "LC08": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74974052706733, -1.3934430414110162]),
            {
              "LC08": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7645034054853, -1.3956739783245664]),
            {
              "LC08": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76295845309272, -1.396961056350659]),
            {
              "LC08": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75995437899604, -1.3965320304202666]),
            {
              "LC08": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754117892179636, -1.3970468615273306]),
            {
              "LC08": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74896805087104, -1.396617835612612]),
            {
              "LC08": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75180046359077, -1.3934430414110162]),
            {
              "LC08": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659420606731196, -1.387937911527927]),
            {
              "LC08": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66251051151635, -1.3898256319217746]),
            {
              "LC08": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74652295111046, -1.3933239025747666]),
            {
              "LC08": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728354776373486, -1.3802664795478894]),
            {
              "LC08": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.729384744635205, -1.3795800331744412]),
            {
              "LC08": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72706731604634, -1.381639371700213]),
            {
              "LC08": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724149072638134, -1.3830980687426782]),
            {
              "LC08": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72577985571919, -1.3839561254077033]),
            {
              "LC08": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74820904773934, -1.3934768508817654]),
            {
              "LC08": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75413136524422, -1.393734266783689]),
            {
              "LC08": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.756277132456134, -1.3921897709502535]),
            {
              "LC08": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76383023304207, -1.3969090605922572]),
            {
              "LC08": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764516878549884, -1.397423891616703]),
            {
              "LC08": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687631230749446, -1.429687446102459]),
            {
              "LC08": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69020615140374, -1.4277139539662613]),
            {
              "LC08": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68831787625726, -1.4254830477723786]),
            {
              "LC08": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691407781042415, -1.426169480677806]),
            {
              "LC08": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673604556563895, -1.3349101896781097]),
            {
              "LC08": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67678029203753, -1.3354250339885723]),
            {
              "LC08": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67823941374163, -1.3374844101515648]),
            {
              "LC08": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65566060690146, -1.3615779254862421]),
            {
              "LC08": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65703389791709, -1.3590895370338618]),
            {
              "LC08": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65806386617881, -1.3609772802327444]),
            {
              "LC08": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65600392965537, -1.3629508283607115]),
            {
              "LC08": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65471646932822, -1.3622643770212726]),
            {
              "LC08": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67682555034407, -1.3366202035465935]),
            {
              "LC08": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82517758678895, -1.282509834029533]),
            {
              "LC08": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83084241222841, -1.2830246890990484]),
            {
              "LC08": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8385671741913, -1.2984702928156564]),
            {
              "LC08": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84972516369325, -1.2799355571291449]),
            {
              "LC08": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82929745983583, -1.3036188064705045]),
            {
              "LC08": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.838395512814344, -1.3079092264757946]),
            {
              "LC08": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84646359753114, -1.3127144881723471]),
            {
              "LC08": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79221860241395, -1.3127144881723471]),
            {
              "LC08": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79530850719911, -1.3163184283861646]),
            {
              "LC08": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7975401050995, -1.3137441859069734]),
            {
              "LC08": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.782433903927625, -1.3154603478548041]),
            {
              "LC08": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74587003063661, -1.2880016160894516]),
            {
              "LC08": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74964658092958, -1.289889413441705]),
            {
              "LC08": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84217206310731, -1.2670641339681474]),
            {
              "LC08": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84200040173036, -1.2716978537077097]),
            {
              "LC08": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.85144177746278, -1.265347939366961]),
            {
              "LC08": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84903851818544, -1.2727275680767385]),
            {
              "LC08": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.8605398304413, -1.3048201248099742]),
            {
              "LC08": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84303036999208, -1.3007013166893628]),
            {
              "LC08": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78681126903993, -1.3006155081152864]),
            {
              "LC08": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.825606740231336, -1.301301976626171]),
            {
              "LC08": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82732335400087, -1.2841402080608117]),
            {
              "LC08": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84431783031923, -1.3110841325587064]),
            {
              "LC08": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.86165562939149, -1.3047343163761729]),
            {
              "LC08": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83118573498231, -1.3037904234112472]),
            {
              "LC08": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.82929745983583, -1.2838827806512851]),
            {
              "LC08": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73254113751667, -1.3986271185239227]),
            {
              "LC08": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72996621686237, -1.3960529635920944]),
            {
              "LC08": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74146752911823, -1.39326429256889]),
            {
              "LC08": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75627332288044, -1.3999141949312783]),
            {
              "LC08": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73455815869587, -1.3948516903257155]),
            {
              "LC08": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73850637036579, -1.39523781394254]),
            {
              "LC08": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73176866132038, -1.3947229824393699]),
            {
              "LC08": 0,
              "system:index": "66"
            })]),
    ForestedAreas08 = ui.import && ui.import("ForestedAreas08", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.70243970226747,
            -1.3542452901347999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70424214672548,
            -1.356390457045102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711280263180555,
            -1.361024011077231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71608678173524,
            -1.363769816674928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707503712887586,
            -1.3670304567528453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71067944836122,
            -1.3627401399425603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.699263966793836,
            -1.367802712965213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69617406200868,
            -1.3628259463537453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697032368893446,
            -1.3581923957802278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698577321286024,
            -1.3547601303665444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69514409374696,
            -1.3705485108176616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68999425243837,
            -1.3665156191399315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69548741650087,
            -1.364027235789199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70647374462587,
            -1.3590504613724466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71445599865419,
            -1.3639414294208243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70724622082216,
            -1.3690039999126333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.640185118212706,
            -1.4003045872349917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.646193266406065,
            -1.4020206877263004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64078593303204,
            -1.406053518926343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64885401774884,
            -1.4069115672196137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.642931700243956,
            -1.4008194175143862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63932681132794,
            -1.4018490777337465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64765238811017,
            -1.4023639076736485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64336085368634,
            -1.4051096654394546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63941264201642,
            -1.4093141007611925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68224215556622,
            -1.3458177515927592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68370127727032,
            -1.3463325936094945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73502802897931,
            -1.314927033190715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74687266398907,
            -1.3190458179281428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762837172045714,
            -1.3178445064163573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75562739421368,
            -1.320418744659991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748074293627745,
            -1.3217916706335315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73863291789532,
            -1.3171580424351548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73365473796368,
            -1.3219632863268733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72747492839337,
            -1.3150986493572854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750820875658995,
            -1.3216200549283326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75785899211407,
            -1.3154418816550073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.757344007983214,
            -1.3219632863268733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7647254471922,
            -1.318187738336013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76592707683087,
            -1.311837940176436
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC08": 1
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
            ee.Geometry.Point([36.70243970226747, -1.3542452901347999]),
            {
              "LC08": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70424214672548, -1.356390457045102]),
            {
              "LC08": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711280263180555, -1.361024011077231]),
            {
              "LC08": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71608678173524, -1.363769816674928]),
            {
              "LC08": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707503712887586, -1.3670304567528453]),
            {
              "LC08": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71067944836122, -1.3627401399425603]),
            {
              "LC08": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.699263966793836, -1.367802712965213]),
            {
              "LC08": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69617406200868, -1.3628259463537453]),
            {
              "LC08": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697032368893446, -1.3581923957802278]),
            {
              "LC08": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698577321286024, -1.3547601303665444]),
            {
              "LC08": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69514409374696, -1.3705485108176616]),
            {
              "LC08": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68999425243837, -1.3665156191399315]),
            {
              "LC08": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69548741650087, -1.364027235789199]),
            {
              "LC08": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70647374462587, -1.3590504613724466]),
            {
              "LC08": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71445599865419, -1.3639414294208243]),
            {
              "LC08": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70724622082216, -1.3690039999126333]),
            {
              "LC08": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.640185118212706, -1.4003045872349917]),
            {
              "LC08": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.646193266406065, -1.4020206877263004]),
            {
              "LC08": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64078593303204, -1.406053518926343]),
            {
              "LC08": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64885401774884, -1.4069115672196137]),
            {
              "LC08": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.642931700243956, -1.4008194175143862]),
            {
              "LC08": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63932681132794, -1.4018490777337465]),
            {
              "LC08": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64765238811017, -1.4023639076736485]),
            {
              "LC08": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64336085368634, -1.4051096654394546]),
            {
              "LC08": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63941264201642, -1.4093141007611925]),
            {
              "LC08": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68224215556622, -1.3458177515927592]),
            {
              "LC08": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68370127727032, -1.3463325936094945]),
            {
              "LC08": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73502802897931, -1.314927033190715]),
            {
              "LC08": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74687266398907, -1.3190458179281428]),
            {
              "LC08": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762837172045714, -1.3178445064163573]),
            {
              "LC08": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75562739421368, -1.320418744659991]),
            {
              "LC08": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748074293627745, -1.3217916706335315]),
            {
              "LC08": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73863291789532, -1.3171580424351548]),
            {
              "LC08": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73365473796368, -1.3219632863268733]),
            {
              "LC08": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72747492839337, -1.3150986493572854]),
            {
              "LC08": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750820875658995, -1.3216200549283326]),
            {
              "LC08": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75785899211407, -1.3154418816550073]),
            {
              "LC08": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.757344007983214, -1.3219632863268733]),
            {
              "LC08": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7647254471922, -1.318187738336013]),
            {
              "LC08": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76592707683087, -1.311837940176436]),
            {
              "LC08": 1,
              "system:index": "39"
            })]),
    Vegetation08 = ui.import && ui.import("Vegetation08", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.66594607028986,
            -1.3588586112232668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.674166310927916,
            -1.3532257643837717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67330800404315,
            -1.3560573854958082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65983258595233,
            -1.3528825373575393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.678457845351744,
            -1.3620638435464776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70428697048454,
            -1.3769305278054556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70497361599235,
            -1.378904062792236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710895933497234,
            -1.37744536317702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7091793197277,
            -1.375300215062117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6839292137917,
            -1.387976154840307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68186927726826,
            -1.3883193768366828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.740874850127945,
            -1.4047688372819618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748599612090835,
            -1.405455276319524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74009870569302,
            -1.3906967927090257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74121450464322,
            -1.3915119439300285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.729541531010405,
            -1.3859774906380886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74288820306851,
            -1.3846475038089263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73859666864468,
            -1.3872216711891658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7416436580856,
            -1.387736504329304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.760998478337065,
            -1.3905032845077603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762028446598784,
            -1.3914042411779572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74816675152592,
            -1.4004569246763126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77335805859379,
            -1.3950082976496612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77245683636479,
            -1.395952155204899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79009504284672,
            -1.3998991917822792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71705311044941,
            -1.4043170115270027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70581729588986,
            -1.4043818661821572
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706203533988,
            -1.4051112077736865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69062526402951,
            -1.4085434004391533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69075401006222,
            -1.4094014478161063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69496280946194,
            -1.4163182622859267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69397575654446,
            -1.4163182622859267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68758137025296,
            -1.4155460219596026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686369830488324,
            -1.4253878550566987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68830102097905,
            -1.4278761734674255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68971722733891,
            -1.4296351555467515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72547167393869,
            -1.4163849521943743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734870134326876,
            -1.4236354180349424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.733411012622774,
            -1.4187874759385215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73203772160715,
            -1.4188732803118231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75812882031182,
            -1.407132353208011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76263493145684,
            -1.398937979923564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.763407407653126,
            -1.3994528105030375
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC08": 2
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
            ee.Geometry.Point([36.66594607028986, -1.3588586112232668]),
            {
              "LC08": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.674166310927916, -1.3532257643837717]),
            {
              "LC08": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67330800404315, -1.3560573854958082]),
            {
              "LC08": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65983258595233, -1.3528825373575393]),
            {
              "LC08": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.678457845351744, -1.3620638435464776]),
            {
              "LC08": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70428697048454, -1.3769305278054556]),
            {
              "LC08": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70497361599235, -1.378904062792236]),
            {
              "LC08": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710895933497234, -1.37744536317702]),
            {
              "LC08": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7091793197277, -1.375300215062117]),
            {
              "LC08": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6839292137917, -1.387976154840307]),
            {
              "LC08": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68186927726826, -1.3883193768366828]),
            {
              "LC08": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.740874850127945, -1.4047688372819618]),
            {
              "LC08": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748599612090835, -1.405455276319524]),
            {
              "LC08": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74009870569302, -1.3906967927090257]),
            {
              "LC08": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74121450464322, -1.3915119439300285]),
            {
              "LC08": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.729541531010405, -1.3859774906380886]),
            {
              "LC08": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74288820306851, -1.3846475038089263]),
            {
              "LC08": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73859666864468, -1.3872216711891658]),
            {
              "LC08": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7416436580856, -1.387736504329304]),
            {
              "LC08": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.760998478337065, -1.3905032845077603]),
            {
              "LC08": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762028446598784, -1.3914042411779572]),
            {
              "LC08": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74816675152592, -1.4004569246763126]),
            {
              "LC08": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77335805859379, -1.3950082976496612]),
            {
              "LC08": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77245683636479, -1.395952155204899]),
            {
              "LC08": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79009504284672, -1.3998991917822792]),
            {
              "LC08": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71705311044941, -1.4043170115270027]),
            {
              "LC08": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70581729588986, -1.4043818661821572]),
            {
              "LC08": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706203533988, -1.4051112077736865]),
            {
              "LC08": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69062526402951, -1.4085434004391533]),
            {
              "LC08": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69075401006222, -1.4094014478161063]),
            {
              "LC08": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69496280946194, -1.4163182622859267]),
            {
              "LC08": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69397575654446, -1.4163182622859267]),
            {
              "LC08": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68758137025296, -1.4155460219596026]),
            {
              "LC08": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686369830488324, -1.4253878550566987]),
            {
              "LC08": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68830102097905, -1.4278761734674255]),
            {
              "LC08": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68971722733891, -1.4296351555467515]),
            {
              "LC08": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72547167393869, -1.4163849521943743]),
            {
              "LC08": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734870134326876, -1.4236354180349424]),
            {
              "LC08": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.733411012622774, -1.4187874759385215]),
            {
              "LC08": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73203772160715, -1.4188732803118231]),
            {
              "LC08": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75812882031182, -1.407132353208011]),
            {
              "LC08": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76263493145684, -1.398937979923564]),
            {
              "LC08": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.763407407653126, -1.3994528105030375]),
            {
              "LC08": 2,
              "system:index": "42"
            })]),
    NonBuilt_Up08 = ui.import && ui.import("NonBuilt_Up08", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.77628201092461,
            -1.4013405216605797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78023022259453,
            -1.4027134015469158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78572338665703,
            -1.3994528105030375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78349178875664,
            -1.402198571683894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81748074139336,
            -1.384865900480833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81748074139336,
            -1.3884697336967962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81198757733086,
            -1.3894993993214073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77628201092461,
            -1.4028850114760876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.723594892251434,
            -1.4035601220345446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71243690274948,
            -1.4032169022626613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71338104032272,
            -1.4015008026480915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714697975508265,
            -1.3837976601341917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.715727943769984,
            -1.3860286061590132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70911898075729,
            -1.381738323479477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71315302311569,
            -1.3806228487125514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7098056262651,
            -1.390318881065681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71160807072311,
            -1.3928930422686854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73229326664596,
            -1.3820815463793086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73538317143112,
            -1.3843124940185922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73255075871139,
            -1.3836260488145578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74379457890182,
            -1.3873156894482623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746197838179164,
            -1.3866292451144275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65916552006393,
            -1.3658642103770116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65959467350631,
            -1.3680951731741955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683713096968226,
            -1.3612306656455115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68354143559127,
            -1.3637190518879405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692210335127406,
            -1.3572835649609347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69212450443893,
            -1.359342922644841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722175127487674,
            -1.3713607470015095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710673815231814,
            -1.3823439031246396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69340918671137,
            -1.4074309729263892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69589827667719,
            -1.408460630232336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68714354645258,
            -1.3899267294386037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682852012028754,
            -1.390012534871539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66817496429926,
            -1.3876099815713878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703654953971736,
            -1.409655806059167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70537156774127,
            -1.4105138530261974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717645356193415,
            -1.420896196194316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71850366307818,
            -1.4251864070376663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728116700187556,
            -1.4226122814892017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718651140974636,
            -1.4006088413166238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718908633040066,
            -1.3927147639190798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73555978660452,
            -1.3854212993405255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690946505460886,
            -1.3895817994537922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697212145719675,
            -1.3919843507479421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698928759489206,
            -1.3980765234029582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69661133090034,
            -1.3991061848269726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70030205050483,
            -1.3830605764915187
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6945513943769,
            -1.3811728507068473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.688199923429636,
            -1.3811728507068473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69317810336128,
            -1.388895355777836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692748949918894,
            -1.3908688808084115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69412224093452,
            -1.389152772179692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69300644198432,
            -1.392070156106058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69498079523661,
            -1.3997060784184685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68923013910868,
            -1.3992770529897516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692835028024696,
            -1.4084581799964677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69952982172587,
            -1.408715594252149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69214838251688,
            -1.3814295259113878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.706310446115516,
            -1.382630805999993
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.700817282053016,
            -1.374050220633323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69592493280985,
            -1.374050220633323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70322054133036,
            -1.3692450793521378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70425050959208,
            -1.3694166917068133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70373552546122,
            -1.3738786086109518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70176141962626,
            -1.3745650566264567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70802705988505,
            -1.3831456401376292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71377771601298,
            -1.3957385440680825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69772737726786,
            -1.3989991402749171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690603430124305,
            -1.3993423606648332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69403665766337,
            -1.4091241206172673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.701074774118446,
            -1.4002004114198787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70141809687235,
            -1.4094673395204014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71197527155497,
            -1.3965107909470997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.738494338989256,
            -1.396653599995139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74321502685547,
            -1.3972542362446645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748576296209926,
            -1.398435630870664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7541552909609,
            -1.4000659276671215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76050676190817,
            -1.4001517327302728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.787028444647426,
            -1.3950034233886215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7856551536318,
            -1.3948318128829933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66162980878317,
            -1.359136557980621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65562166058981,
            -1.3583642989888685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659484041571254,
            -1.358964944892675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66437639081442,
            -1.3594797841199113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66935457074606,
            -1.3598230102104119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6827441581484,
            -1.3532158994096901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65227426373922,
            -1.3490971718760523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72077557287595,
            -1.376807295644706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720389334777806,
            -1.3773650339877292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724680869201634,
            -1.3754773036848764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71485325537107,
            -1.3759063334303694
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC08": 3
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
            ee.Geometry.Point([36.77628201092461, -1.4013405216605797]),
            {
              "LC08": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78023022259453, -1.4027134015469158]),
            {
              "LC08": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78572338665703, -1.3994528105030375]),
            {
              "LC08": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78349178875664, -1.402198571683894]),
            {
              "LC08": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81748074139336, -1.384865900480833]),
            {
              "LC08": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81748074139336, -1.3884697336967962]),
            {
              "LC08": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81198757733086, -1.3894993993214073]),
            {
              "LC08": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77628201092461, -1.4028850114760876]),
            {
              "LC08": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.723594892251434, -1.4035601220345446]),
            {
              "LC08": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71243690274948, -1.4032169022626613]),
            {
              "LC08": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71338104032272, -1.4015008026480915]),
            {
              "LC08": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714697975508265, -1.3837976601341917]),
            {
              "LC08": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.715727943769984, -1.3860286061590132]),
            {
              "LC08": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70911898075729, -1.381738323479477]),
            {
              "LC08": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71315302311569, -1.3806228487125514]),
            {
              "LC08": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7098056262651, -1.390318881065681]),
            {
              "LC08": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71160807072311, -1.3928930422686854]),
            {
              "LC08": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73229326664596, -1.3820815463793086]),
            {
              "LC08": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73538317143112, -1.3843124940185922]),
            {
              "LC08": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73255075871139, -1.3836260488145578]),
            {
              "LC08": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74379457890182, -1.3873156894482623]),
            {
              "LC08": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746197838179164, -1.3866292451144275]),
            {
              "LC08": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65916552006393, -1.3658642103770116]),
            {
              "LC08": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65959467350631, -1.3680951731741955]),
            {
              "LC08": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683713096968226, -1.3612306656455115]),
            {
              "LC08": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68354143559127, -1.3637190518879405]),
            {
              "LC08": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692210335127406, -1.3572835649609347]),
            {
              "LC08": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69212450443893, -1.359342922644841]),
            {
              "LC08": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722175127487674, -1.3713607470015095]),
            {
              "LC08": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710673815231814, -1.3823439031246396]),
            {
              "LC08": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69340918671137, -1.4074309729263892]),
            {
              "LC08": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69589827667719, -1.408460630232336]),
            {
              "LC08": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68714354645258, -1.3899267294386037]),
            {
              "LC08": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682852012028754, -1.390012534871539]),
            {
              "LC08": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66817496429926, -1.3876099815713878]),
            {
              "LC08": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703654953971736, -1.409655806059167]),
            {
              "LC08": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70537156774127, -1.4105138530261974]),
            {
              "LC08": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717645356193415, -1.420896196194316]),
            {
              "LC08": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71850366307818, -1.4251864070376663]),
            {
              "LC08": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728116700187556, -1.4226122814892017]),
            {
              "LC08": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718651140974636, -1.4006088413166238]),
            {
              "LC08": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718908633040066, -1.3927147639190798]),
            {
              "LC08": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73555978660452, -1.3854212993405255]),
            {
              "LC08": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690946505460886, -1.3895817994537922]),
            {
              "LC08": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697212145719675, -1.3919843507479421]),
            {
              "LC08": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698928759489206, -1.3980765234029582]),
            {
              "LC08": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69661133090034, -1.3991061848269726]),
            {
              "LC08": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70030205050483, -1.3830605764915187]),
            {
              "LC08": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6945513943769, -1.3811728507068473]),
            {
              "LC08": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.688199923429636, -1.3811728507068473]),
            {
              "LC08": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69317810336128, -1.388895355777836]),
            {
              "LC08": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692748949918894, -1.3908688808084115]),
            {
              "LC08": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69412224093452, -1.389152772179692]),
            {
              "LC08": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69300644198432, -1.392070156106058]),
            {
              "LC08": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69498079523661, -1.3997060784184685]),
            {
              "LC08": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68923013910868, -1.3992770529897516]),
            {
              "LC08": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692835028024696, -1.4084581799964677]),
            {
              "LC08": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69952982172587, -1.408715594252149]),
            {
              "LC08": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69214838251688, -1.3814295259113878]),
            {
              "LC08": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.706310446115516, -1.382630805999993]),
            {
              "LC08": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.700817282053016, -1.374050220633323]),
            {
              "LC08": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69592493280985, -1.374050220633323]),
            {
              "LC08": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70322054133036, -1.3692450793521378]),
            {
              "LC08": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70425050959208, -1.3694166917068133]),
            {
              "LC08": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70373552546122, -1.3738786086109518]),
            {
              "LC08": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70176141962626, -1.3745650566264567]),
            {
              "LC08": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70802705988505, -1.3831456401376292]),
            {
              "LC08": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71377771601298, -1.3957385440680825]),
            {
              "LC08": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69772737726786, -1.3989991402749171]),
            {
              "LC08": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690603430124305, -1.3993423606648332]),
            {
              "LC08": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69403665766337, -1.4091241206172673]),
            {
              "LC08": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.701074774118446, -1.4002004114198787]),
            {
              "LC08": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70141809687235, -1.4094673395204014]),
            {
              "LC08": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71197527155497, -1.3965107909470997]),
            {
              "LC08": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.738494338989256, -1.396653599995139]),
            {
              "LC08": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74321502685547, -1.3972542362446645]),
            {
              "LC08": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748576296209926, -1.398435630870664]),
            {
              "LC08": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7541552909609, -1.4000659276671215]),
            {
              "LC08": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76050676190817, -1.4001517327302728]),
            {
              "LC08": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.787028444647426, -1.3950034233886215]),
            {
              "LC08": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7856551536318, -1.3948318128829933]),
            {
              "LC08": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66162980878317, -1.359136557980621]),
            {
              "LC08": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65562166058981, -1.3583642989888685]),
            {
              "LC08": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659484041571254, -1.358964944892675]),
            {
              "LC08": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66437639081442, -1.3594797841199113]),
            {
              "LC08": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66935457074606, -1.3598230102104119]),
            {
              "LC08": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6827441581484, -1.3532158994096901]),
            {
              "LC08": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65227426373922, -1.3490971718760523]),
            {
              "LC08": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72077557287595, -1.376807295644706]),
            {
              "LC08": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720389334777806, -1.3773650339877292]),
            {
              "LC08": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724680869201634, -1.3754773036848764]),
            {
              "LC08": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71485325537107, -1.3759063334303694]),
            {
              "LC08": 3,
              "system:index": "91"
            })]),
    Water08 = ui.import && ui.import("Water08", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.328508048620556,
            -0.7458753727894085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34018102225337,
            -0.7747119448114567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.364213615026806,
            -0.7455320791127825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.377946525183056,
            -0.7826076389495487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.33194127615962,
            -0.7980556930506078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.32438817557368,
            -0.7784881482006332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.31923833426509,
            -0.7561741705809614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.343270927038525,
            -0.7506814814448366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.35666051444087,
            -0.7640698990255593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.353227286901806,
            -0.7757328153828082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34464421805415,
            -0.8052557618270458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36009374197993,
            -0.805942339463258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.3748566203979,
            -0.7949570834626115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.384469657507275,
            -0.7420901373917684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.41159215506587,
            -0.7444931944425589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83827052273142,
            -0.8171345994684306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.840416289943335,
            -0.8221122700481044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.844364501613256,
            -0.8227130229750061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84693942226755,
            -0.8212540514242987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84496531643259,
            -0.8184219286594276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84230456508982,
            -0.8161047358185792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83526644863474,
            -0.8167913116144715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83698306240427,
            -0.8229704884874252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.842647887843725,
            -0.8229704884874252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.088381148952124,
            -1.0060239499093468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.09001193203318,
            -1.0057664975249598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.08726535000193,
            -1.005938132450149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.0858920589863,
            -1.0028487024169552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.08949694790232,
            -1.0062814022734419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.51307826994084,
            -0.9124350023750009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.539170799237716,
            -0.8938978770299361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            37.55908351896428,
            -0.8849725609626219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.781205309246474,
            -1.3913668800069725
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC08": 4
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
            ee.Geometry.Point([36.328508048620556, -0.7458753727894085]),
            {
              "LC08": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34018102225337, -0.7747119448114567]),
            {
              "LC08": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.364213615026806, -0.7455320791127825]),
            {
              "LC08": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.377946525183056, -0.7826076389495487]),
            {
              "LC08": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.33194127615962, -0.7980556930506078]),
            {
              "LC08": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.32438817557368, -0.7784881482006332]),
            {
              "LC08": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.31923833426509, -0.7561741705809614]),
            {
              "LC08": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.343270927038525, -0.7506814814448366]),
            {
              "LC08": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.35666051444087, -0.7640698990255593]),
            {
              "LC08": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.353227286901806, -0.7757328153828082]),
            {
              "LC08": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34464421805415, -0.8052557618270458]),
            {
              "LC08": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36009374197993, -0.805942339463258]),
            {
              "LC08": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.3748566203979, -0.7949570834626115]),
            {
              "LC08": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.384469657507275, -0.7420901373917684]),
            {
              "LC08": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.41159215506587, -0.7444931944425589]),
            {
              "LC08": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83827052273142, -0.8171345994684306]),
            {
              "LC08": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.840416289943335, -0.8221122700481044]),
            {
              "LC08": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.844364501613256, -0.8227130229750061]),
            {
              "LC08": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84693942226755, -0.8212540514242987]),
            {
              "LC08": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84496531643259, -0.8184219286594276]),
            {
              "LC08": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84230456508982, -0.8161047358185792]),
            {
              "LC08": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83526644863474, -0.8167913116144715]),
            {
              "LC08": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83698306240427, -0.8229704884874252]),
            {
              "LC08": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.842647887843725, -0.8229704884874252]),
            {
              "LC08": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([37.088381148952124, -1.0060239499093468]),
            {
              "LC08": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([37.09001193203318, -1.0057664975249598]),
            {
              "LC08": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([37.08726535000193, -1.005938132450149]),
            {
              "LC08": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([37.0858920589863, -1.0028487024169552]),
            {
              "LC08": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([37.08949694790232, -1.0062814022734419]),
            {
              "LC08": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([37.51307826994084, -0.9124350023750009]),
            {
              "LC08": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([37.539170799237716, -0.8938978770299361]),
            {
              "LC08": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([37.55908351896428, -0.8849725609626219]),
            {
              "LC08": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.781205309246474, -1.3913668800069725]),
            {
              "LC08": 4,
              "system:index": "32"
            })]),
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
    Vegetation12 = ui.import && ui.import("Vegetation12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.66007393681039,
            -1.3880742712178515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64033287846078,
            -1.3835265752559347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64419525944223,
            -1.3879884657145243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64016121708383,
            -1.3891897424775923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64919660045296,
            -1.36709132759099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68115849510322,
            -1.3875387319112793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70313115135322,
            -1.3923438362120024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71729321495185,
            -1.3858226208651727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72973866478095,
            -1.3859084264470216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.704504442368844,
            -1.378614940910622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6980671407331,
            -1.3717504635223245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65017361656318,
            -1.3738956148263444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65240521446357,
            -1.3746678688244098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67034382835517,
            -1.37149304523655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67532200828681,
            -1.3729517484897096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67746777549873,
            -1.3625691942474127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66047329918037,
            -1.349784004022858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65935750023017,
            -1.3527872426901715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67396754758965,
            -1.353473696721034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67339836432809,
            -1.3557272322345018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6758767434206,
            -1.342604131447322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.674331791028024,
            -1.34208928864443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74059138572895,
            -1.404561618278262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70237195467421,
            -1.396373647048939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.689583182091205,
            -1.409072782193987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698080420250385,
            -1.4083005394600085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65433501284219,
            -1.400334910760789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65811156313516,
            -1.3864344507874182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66377638857461,
            -1.3876786310982745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67227362673379,
            -1.3943714518709667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69523333590127,
            -1.3980610757041163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69394587557412,
            -1.3940711333972526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68905352633096,
            -1.3965165827112596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68974017183877,
            -1.3936421069397789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705824826062546,
            -1.4047838734418616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.708167388433026,
            -1.3993241179341795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70786698102336,
            -1.3882981377812247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74876530408244,
            -1.4054290002725793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7492802882133,
            -1.4063728536303628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72537644147258,
            -1.4062870487954353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72902424573283,
            -1.4077457305602081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.740042213443104,
            -1.390724691637737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75789499664623,
            -1.3905530808205162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75747658233995,
            -1.3946824729412974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.729923774421685,
            -1.38635934789731
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC12": 2
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
            ee.Geometry.Point([36.66007393681039, -1.3880742712178515]),
            {
              "LC12": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64033287846078, -1.3835265752559347]),
            {
              "LC12": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64419525944223, -1.3879884657145243]),
            {
              "LC12": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64016121708383, -1.3891897424775923]),
            {
              "LC12": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64919660045296, -1.36709132759099]),
            {
              "LC12": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68115849510322, -1.3875387319112793]),
            {
              "LC12": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70313115135322, -1.3923438362120024]),
            {
              "LC12": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71729321495185, -1.3858226208651727]),
            {
              "LC12": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72973866478095, -1.3859084264470216]),
            {
              "LC12": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.704504442368844, -1.378614940910622]),
            {
              "LC12": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6980671407331, -1.3717504635223245]),
            {
              "LC12": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65017361656318, -1.3738956148263444]),
            {
              "LC12": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65240521446357, -1.3746678688244098]),
            {
              "LC12": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67034382835517, -1.37149304523655]),
            {
              "LC12": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67532200828681, -1.3729517484897096]),
            {
              "LC12": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67746777549873, -1.3625691942474127]),
            {
              "LC12": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66047329918037, -1.349784004022858]),
            {
              "LC12": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65935750023017, -1.3527872426901715]),
            {
              "LC12": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67396754758965, -1.353473696721034]),
            {
              "LC12": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67339836432809, -1.3557272322345018]),
            {
              "LC12": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6758767434206, -1.342604131447322]),
            {
              "LC12": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.674331791028024, -1.34208928864443]),
            {
              "LC12": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74059138572895, -1.404561618278262]),
            {
              "LC12": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70237195467421, -1.396373647048939]),
            {
              "LC12": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.689583182091205, -1.409072782193987]),
            {
              "LC12": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698080420250385, -1.4083005394600085]),
            {
              "LC12": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65433501284219, -1.400334910760789]),
            {
              "LC12": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65811156313516, -1.3864344507874182]),
            {
              "LC12": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66377638857461, -1.3876786310982745]),
            {
              "LC12": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67227362673379, -1.3943714518709667]),
            {
              "LC12": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69523333590127, -1.3980610757041163]),
            {
              "LC12": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69394587557412, -1.3940711333972526]),
            {
              "LC12": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68905352633096, -1.3965165827112596]),
            {
              "LC12": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68974017183877, -1.3936421069397789]),
            {
              "LC12": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705824826062546, -1.4047838734418616]),
            {
              "LC12": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.708167388433026, -1.3993241179341795]),
            {
              "LC12": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70786698102336, -1.3882981377812247]),
            {
              "LC12": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74876530408244, -1.4054290002725793]),
            {
              "LC12": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7492802882133, -1.4063728536303628]),
            {
              "LC12": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72537644147258, -1.4062870487954353]),
            {
              "LC12": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72902424573283, -1.4077457305602081]),
            {
              "LC12": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.740042213443104, -1.390724691637737]),
            {
              "LC12": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75789499664623, -1.3905530808205162]),
            {
              "LC12": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75747658233995, -1.3946824729412974]),
            {
              "LC12": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.729923774421685, -1.38635934789731]),
            {
              "LC12": 2,
              "system:index": "44"
            })]),
    NonBuilt_Up12 = ui.import && ui.import("NonBuilt_Up12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.775540340566565,
            -1.4006678269180788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77644156279557,
            -1.4022552196699833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77837275328629,
            -1.4042716359374887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78172015013688,
            -1.4015687796930887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78412340941422,
            -1.39920914073848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7871274835109,
            -1.4012255596291796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78841494383805,
            -1.4031990743094795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.781763065481115,
            -1.3971498175291401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78800246653186,
            -1.3964800472413277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.790534471841916,
            -1.3947639426989085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79491183695422,
            -1.39665165762668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79817340311633,
            -1.3938200846670328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80160663065539,
            -1.3913746325524583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79169318613635,
            -1.3884143450222752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7938818686925,
            -1.3866982346112111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79315230784045,
            -1.3887575669550403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.790534471841916,
            -1.3905594812840145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79512641367541,
            -1.3931336422244067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.797787165018185,
            -1.3897443297340533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79933211741076,
            -1.388886275166973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.800061678262814,
            -1.3931765448829248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.791564440103635,
            -1.3972951964601077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79014823374377,
            -1.3962655342420107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73957613030494,
            -1.3868722632258865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.745155125055916,
            -1.3882022488051797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731937199030526,
            -1.3830968162211486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73425462761939,
            -1.383182621901658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73562791863502,
            -1.3857996936658665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72961977044166,
            -1.3800507125543313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73429754296363,
            -1.3918060769352196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73305299798072,
            -1.3934363783284944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712778598518476,
            -1.401759478354188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712778598518476,
            -1.4032181629455833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69926026508342,
            -1.3992282294071146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69814446613322,
            -1.39274993577404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6976723973466,
            -1.3971689062145172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69848778888713,
            -1.3945089444192926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711791545600995,
            -1.3922780064018738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710994527959514,
            -1.3877976911764331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71335487189262,
            -1.3816625891370162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714470670842815,
            -1.3839364399963767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71455650153129,
            -1.3859957747425171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66196560274029,
            -1.3298152945009418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66488384614849,
            -1.3325611352614393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65398334871197,
            -1.3353927803396168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6556999624815,
            -1.341570903722596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65595745454693,
            -1.3460328720229204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66333889375591,
            -1.334363091597373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65887569795513,
            -1.3308449851444448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.665055507525445,
            -1.329729486927913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.667544597491265,
            -1.3329043651414052
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC12": 3
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
            ee.Geometry.Point([36.775540340566565, -1.4006678269180788]),
            {
              "LC12": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77644156279557, -1.4022552196699833]),
            {
              "LC12": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77837275328629, -1.4042716359374887]),
            {
              "LC12": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78172015013688, -1.4015687796930887]),
            {
              "LC12": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78412340941422, -1.39920914073848]),
            {
              "LC12": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7871274835109, -1.4012255596291796]),
            {
              "LC12": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78841494383805, -1.4031990743094795]),
            {
              "LC12": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.781763065481115, -1.3971498175291401]),
            {
              "LC12": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78800246653186, -1.3964800472413277]),
            {
              "LC12": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.790534471841916, -1.3947639426989085]),
            {
              "LC12": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79491183695422, -1.39665165762668]),
            {
              "LC12": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79817340311633, -1.3938200846670328]),
            {
              "LC12": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80160663065539, -1.3913746325524583]),
            {
              "LC12": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79169318613635, -1.3884143450222752]),
            {
              "LC12": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7938818686925, -1.3866982346112111]),
            {
              "LC12": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79315230784045, -1.3887575669550403]),
            {
              "LC12": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.790534471841916, -1.3905594812840145]),
            {
              "LC12": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79512641367541, -1.3931336422244067]),
            {
              "LC12": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.797787165018185, -1.3897443297340533]),
            {
              "LC12": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79933211741076, -1.388886275166973]),
            {
              "LC12": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.800061678262814, -1.3931765448829248]),
            {
              "LC12": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.791564440103635, -1.3972951964601077]),
            {
              "LC12": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79014823374377, -1.3962655342420107]),
            {
              "LC12": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73957613030494, -1.3868722632258865]),
            {
              "LC12": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.745155125055916, -1.3882022488051797]),
            {
              "LC12": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731937199030526, -1.3830968162211486]),
            {
              "LC12": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73425462761939, -1.383182621901658]),
            {
              "LC12": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73562791863502, -1.3857996936658665]),
            {
              "LC12": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72961977044166, -1.3800507125543313]),
            {
              "LC12": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73429754296363, -1.3918060769352196]),
            {
              "LC12": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73305299798072, -1.3934363783284944]),
            {
              "LC12": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712778598518476, -1.401759478354188]),
            {
              "LC12": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712778598518476, -1.4032181629455833]),
            {
              "LC12": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69926026508342, -1.3992282294071146]),
            {
              "LC12": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69814446613322, -1.39274993577404]),
            {
              "LC12": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6976723973466, -1.3971689062145172]),
            {
              "LC12": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69848778888713, -1.3945089444192926]),
            {
              "LC12": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711791545600995, -1.3922780064018738]),
            {
              "LC12": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710994527959514, -1.3877976911764331]),
            {
              "LC12": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71335487189262, -1.3816625891370162]),
            {
              "LC12": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714470670842815, -1.3839364399963767]),
            {
              "LC12": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71455650153129, -1.3859957747425171]),
            {
              "LC12": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66196560274029, -1.3298152945009418]),
            {
              "LC12": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66488384614849, -1.3325611352614393]),
            {
              "LC12": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65398334871197, -1.3353927803396168]),
            {
              "LC12": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6556999624815, -1.341570903722596]),
            {
              "LC12": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65595745454693, -1.3460328720229204]),
            {
              "LC12": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66333889375591, -1.334363091597373]),
            {
              "LC12": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65887569795513, -1.3308449851444448]),
            {
              "LC12": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.665055507525445, -1.329729486927913]),
            {
              "LC12": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.667544597491265, -1.3329043651414052]),
            {
              "LC12": 3,
              "system:index": "50"
            })]),
    Water12 = ui.import && ui.import("Water12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.3562618371809,
            -0.7401658349400637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38578759401684,
            -0.7425688930365569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37754784792309,
            -0.7779280231981671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.38098107546215,
            -0.7957791228346149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.364158260520746,
            -0.8081375312797271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.33257256716137,
            -0.8033314879873948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.330512630637934,
            -0.7830773866890203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36587487429028,
            -0.7501213528159022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.404670345481684,
            -0.7425688930365569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.417373287376215,
            -0.7487481792762166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.41153680055981,
            -0.7676292774063807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.678813564475824,
            -0.759905201767465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66817055910473,
            -0.754069224339597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.832611540928305,
            -0.821360805709227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83827636636776,
            -0.8165547781441015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.848061064854086,
            -0.8206742306958402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.842567900791586,
            -0.8225623116987892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.351442308781095,
            -0.7616291465589746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34663579022641,
            -0.7987045660185121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.35830876385922,
            -0.7678084057028782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37822148358578,
            -0.7492706017652262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.34663579022641,
            -0.8117495422690855
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC12": 4
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
            ee.Geometry.Point([36.3562618371809, -0.7401658349400637]),
            {
              "LC12": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38578759401684, -0.7425688930365569]),
            {
              "LC12": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37754784792309, -0.7779280231981671]),
            {
              "LC12": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.38098107546215, -0.7957791228346149]),
            {
              "LC12": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.364158260520746, -0.8081375312797271]),
            {
              "LC12": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.33257256716137, -0.8033314879873948]),
            {
              "LC12": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.330512630637934, -0.7830773866890203]),
            {
              "LC12": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36587487429028, -0.7501213528159022]),
            {
              "LC12": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.404670345481684, -0.7425688930365569]),
            {
              "LC12": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.417373287376215, -0.7487481792762166]),
            {
              "LC12": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.41153680055981, -0.7676292774063807]),
            {
              "LC12": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.678813564475824, -0.759905201767465]),
            {
              "LC12": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66817055910473, -0.754069224339597]),
            {
              "LC12": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.832611540928305, -0.821360805709227]),
            {
              "LC12": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83827636636776, -0.8165547781441015]),
            {
              "LC12": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.848061064854086, -0.8206742306958402]),
            {
              "LC12": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.842567900791586, -0.8225623116987892]),
            {
              "LC12": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.351442308781095, -0.7616291465589746]),
            {
              "LC12": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34663579022641, -0.7987045660185121]),
            {
              "LC12": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.35830876385922, -0.7678084057028782]),
            {
              "LC12": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37822148358578, -0.7492706017652262]),
            {
              "LC12": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.34663579022641, -0.8117495422690855]),
            {
              "LC12": 4,
              "system:index": "21"
            })]),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    BuiltUp14 = ui.import && ui.import("BuiltUp14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74849701708566,
            -1.3927573566943359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748411186397185,
            -1.39352960455159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750900276363005,
            -1.3933579939385226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74875450915109,
            -1.3962753726591222
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762916572749724,
            -1.3963611778608438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750127800166716,
            -1.3940444363157691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68849262742963,
            -1.425796543813522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68978008775678,
            -1.425796543813522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68806347398725,
            -1.4294003137902875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70128140001264,
            -1.4211631169840009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70368465928998,
            -1.4199618566576835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68687710814085,
            -1.4285599736428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687735415025614,
            -1.4299328374113955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691426134630106,
            -1.426929696852159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686190462633036,
            -1.4238407481863617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70232663206663,
            -1.4238836502795298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707176065965555,
            -1.4191644152492147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7090214257678,
            -1.417748642860826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71152354008782,
            -1.4115446760596442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709077365466236,
            -1.4079837806565774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7453844958209,
            -1.401589818424707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746843617525,
            -1.4064806988196443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728776257600686,
            -1.395583460108523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73199490841856,
            -1.3953260444088447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73824952870529,
            -1.3958137238729085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74567388325851,
            -1.3965001655337161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7464463594548,
            -1.3923386098919681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.742583978473355,
            -1.3913518481975244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75069497853439,
            -1.3966288733228003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75168203145187,
            -1.3971008018224642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754600274860074,
            -1.3969291914699224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759449708759,
            -1.3961569447283686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75563024312179,
            -1.393239565860942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76464246541183,
            -1.3963714577375836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76614450246017,
            -1.3957708212624425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76502870350998,
            -1.397486925069861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.762797105609586,
            -1.3977872431072793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78034948140304,
            -1.3943891778385558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.773826349078824,
            -1.4000094164413213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77322553425949,
            -1.3911714779377808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76829246126887,
            -1.3945043924312894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76223001866714,
            -1.386610294572563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.761730918921245,
            -1.3961893651071655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68199871802466,
            -1.3906660732046032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.682814109565186,
            -1.3914812244362291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65800282547488,
            -1.3874054654643775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65800282547488,
            -1.388435131552561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65495583603396,
            -1.3619131005292282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65710160324588,
            -1.3617414876387819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.656157465672635,
            -1.3626853583849503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67727181503787,
            -1.3343690762542102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67401024887576,
            -1.3349697280714568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66667499199214,
            -1.3411820465446673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66637458458247,
            -1.3431556107658722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67590179100337,
            -1.3335880998265512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72024540459144,
            -1.374518457611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72217659508216,
            -1.3732313673950247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72573856865394,
            -1.374604263600736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75206848567685,
            -1.3908239938416103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.757218326985445,
            -1.3918965611213252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75631710475644,
            -1.3919394638023614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749493565022554,
            -1.3888933715099332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759449924885836,
            -1.3905665776219367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75181099361142,
            -1.3943849153307724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.751253094136324,
            -1.3899230369499194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.753355946004,
            -1.3894511070123012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74653240627011,
            -1.405582476652428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74751945918759,
            -1.3991042005676826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75155350154599,
            -1.3993616158533035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75657459682187,
            -1.4015496446398936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7548150677081,
            -1.3995332260280142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74854942744931,
            -1.3976455134157755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75159641689023,
            -1.4020215721494889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74211212581357,
            -1.4003054716588292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74206921046933,
            -1.396315533164051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730782474934664,
            -1.4001767640713538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74636074489316,
            -1.393698473052772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.747219051777925,
            -1.3934410571469427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76640221065244,
            -1.3964871435614132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76708885616025,
            -1.397688415992006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76816173976621,
            -1.396444240963237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75910660213193,
            -1.404595720526245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74567409938535,
            -1.4122323440056748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74713322108945,
            -1.4101301299271538
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC14": 0
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
            ee.Geometry.Point([36.74849701708566, -1.3927573566943359]),
            {
              "LC14": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748411186397185, -1.39352960455159]),
            {
              "LC14": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750900276363005, -1.3933579939385226]),
            {
              "LC14": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74875450915109, -1.3962753726591222]),
            {
              "LC14": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762916572749724, -1.3963611778608438]),
            {
              "LC14": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750127800166716, -1.3940444363157691]),
            {
              "LC14": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68849262742963, -1.425796543813522]),
            {
              "LC14": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68978008775678, -1.425796543813522]),
            {
              "LC14": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68806347398725, -1.4294003137902875]),
            {
              "LC14": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70128140001264, -1.4211631169840009]),
            {
              "LC14": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70368465928998, -1.4199618566576835]),
            {
              "LC14": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68687710814085, -1.4285599736428]),
            {
              "LC14": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687735415025614, -1.4299328374113955]),
            {
              "LC14": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691426134630106, -1.426929696852159]),
            {
              "LC14": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686190462633036, -1.4238407481863617]),
            {
              "LC14": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70232663206663, -1.4238836502795298]),
            {
              "LC14": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707176065965555, -1.4191644152492147]),
            {
              "LC14": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7090214257678, -1.417748642860826]),
            {
              "LC14": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71152354008782, -1.4115446760596442]),
            {
              "LC14": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709077365466236, -1.4079837806565774]),
            {
              "LC14": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7453844958209, -1.401589818424707]),
            {
              "LC14": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746843617525, -1.4064806988196443]),
            {
              "LC14": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728776257600686, -1.395583460108523]),
            {
              "LC14": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73199490841856, -1.3953260444088447]),
            {
              "LC14": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73824952870529, -1.3958137238729085]),
            {
              "LC14": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74567388325851, -1.3965001655337161]),
            {
              "LC14": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7464463594548, -1.3923386098919681]),
            {
              "LC14": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.742583978473355, -1.3913518481975244]),
            {
              "LC14": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75069497853439, -1.3966288733228003]),
            {
              "LC14": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75168203145187, -1.3971008018224642]),
            {
              "LC14": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754600274860074, -1.3969291914699224]),
            {
              "LC14": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759449708759, -1.3961569447283686]),
            {
              "LC14": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75563024312179, -1.393239565860942]),
            {
              "LC14": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76464246541183, -1.3963714577375836]),
            {
              "LC14": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76614450246017, -1.3957708212624425]),
            {
              "LC14": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76502870350998, -1.397486925069861]),
            {
              "LC14": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.762797105609586, -1.3977872431072793]),
            {
              "LC14": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78034948140304, -1.3943891778385558]),
            {
              "LC14": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.773826349078824, -1.4000094164413213]),
            {
              "LC14": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77322553425949, -1.3911714779377808]),
            {
              "LC14": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76829246126887, -1.3945043924312894]),
            {
              "LC14": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76223001866714, -1.386610294572563]),
            {
              "LC14": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.761730918921245, -1.3961893651071655]),
            {
              "LC14": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68199871802466, -1.3906660732046032]),
            {
              "LC14": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.682814109565186, -1.3914812244362291]),
            {
              "LC14": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65800282547488, -1.3874054654643775]),
            {
              "LC14": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65800282547488, -1.388435131552561]),
            {
              "LC14": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65495583603396, -1.3619131005292282]),
            {
              "LC14": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65710160324588, -1.3617414876387819]),
            {
              "LC14": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.656157465672635, -1.3626853583849503]),
            {
              "LC14": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67727181503787, -1.3343690762542102]),
            {
              "LC14": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67401024887576, -1.3349697280714568]),
            {
              "LC14": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66667499199214, -1.3411820465446673]),
            {
              "LC14": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66637458458247, -1.3431556107658722]),
            {
              "LC14": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67590179100337, -1.3335880998265512]),
            {
              "LC14": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72024540459144, -1.374518457611]),
            {
              "LC14": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72217659508216, -1.3732313673950247]),
            {
              "LC14": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72573856865394, -1.374604263600736]),
            {
              "LC14": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75206848567685, -1.3908239938416103]),
            {
              "LC14": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.757218326985445, -1.3918965611213252]),
            {
              "LC14": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75631710475644, -1.3919394638023614]),
            {
              "LC14": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749493565022554, -1.3888933715099332]),
            {
              "LC14": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759449924885836, -1.3905665776219367]),
            {
              "LC14": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75181099361142, -1.3943849153307724]),
            {
              "LC14": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.751253094136324, -1.3899230369499194]),
            {
              "LC14": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.753355946004, -1.3894511070123012]),
            {
              "LC14": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74653240627011, -1.405582476652428]),
            {
              "LC14": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74751945918759, -1.3991042005676826]),
            {
              "LC14": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75155350154599, -1.3993616158533035]),
            {
              "LC14": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75657459682187, -1.4015496446398936]),
            {
              "LC14": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7548150677081, -1.3995332260280142]),
            {
              "LC14": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74854942744931, -1.3976455134157755]),
            {
              "LC14": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75159641689023, -1.4020215721494889]),
            {
              "LC14": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74211212581357, -1.4003054716588292]),
            {
              "LC14": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74206921046933, -1.396315533164051]),
            {
              "LC14": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730782474934664, -1.4001767640713538]),
            {
              "LC14": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74636074489316, -1.393698473052772]),
            {
              "LC14": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.747219051777925, -1.3934410571469427]),
            {
              "LC14": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76640221065244, -1.3964871435614132]),
            {
              "LC14": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76708885616025, -1.397688415992006]),
            {
              "LC14": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76816173976621, -1.396444240963237]),
            {
              "LC14": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75910660213193, -1.404595720526245]),
            {
              "LC14": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74567409938535, -1.4122323440056748]),
            {
              "LC14": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74713322108945, -1.4101301299271538]),
            {
              "LC14": 0,
              "system:index": "83"
            })]),
    ForestedAreas14 = ui.import && ui.import("ForestedAreas14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.6987451786691,
            -1.3578719554124397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70097677656949,
            -1.3620764744578013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703380035846834,
            -1.355469369815715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70990316817105,
            -1.3608751840495814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71342222639859,
            -1.3626771194373644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71599714705289,
            -1.364993891526298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70852987715543,
            -1.3693700104897937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707585739582186,
            -1.3652513105095683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7042383427316,
            -1.3641358280497207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6987451786691,
            -1.3673106613830293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69668524214566,
            -1.3614758293285107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.711877274006014,
            -1.3693700104897937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.707328247516756,
            -1.3706571027831675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69668524214566,
            -1.3653371168312014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69144957014859,
            -1.3542680761231396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70174925276578,
            -1.3550403364224692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68604223677457,
            -1.3438854415950297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64300011885022,
            -1.3977956938360045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64068269026135,
            -1.4046600956061566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64651917707776,
            -1.4020001423079365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.638794415114866,
            -1.4074058506732745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.650038235305296,
            -1.4026007771880424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64377259504651,
            -1.4030298020080267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63965272199963,
            -1.3982247195355775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64969491255139,
            -1.4058613638454016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64961425430183,
            -1.3308667399714234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64961425430183,
            -1.334470653804168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64944259292488,
            -1.331724815171716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69261542922859,
            -1.3673231856597818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69364539749031,
            -1.368524472847334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70986739761238,
            -1.3746167057382264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71072570449714,
            -1.3754747654615074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70883742935066,
            -1.3656070600634262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71398727065925,
            -1.3630328693718203
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC14": 1
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
            ee.Geometry.Point([36.6987451786691, -1.3578719554124397]),
            {
              "LC14": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70097677656949, -1.3620764744578013]),
            {
              "LC14": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703380035846834, -1.355469369815715]),
            {
              "LC14": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70990316817105, -1.3608751840495814]),
            {
              "LC14": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71342222639859, -1.3626771194373644]),
            {
              "LC14": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71599714705289, -1.364993891526298]),
            {
              "LC14": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70852987715543, -1.3693700104897937]),
            {
              "LC14": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707585739582186, -1.3652513105095683]),
            {
              "LC14": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7042383427316, -1.3641358280497207]),
            {
              "LC14": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6987451786691, -1.3673106613830293]),
            {
              "LC14": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69668524214566, -1.3614758293285107]),
            {
              "LC14": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.711877274006014, -1.3693700104897937]),
            {
              "LC14": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.707328247516756, -1.3706571027831675]),
            {
              "LC14": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69668524214566, -1.3653371168312014]),
            {
              "LC14": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69144957014859, -1.3542680761231396]),
            {
              "LC14": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70174925276578, -1.3550403364224692]),
            {
              "LC14": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68604223677457, -1.3438854415950297]),
            {
              "LC14": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64300011885022, -1.3977956938360045]),
            {
              "LC14": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64068269026135, -1.4046600956061566]),
            {
              "LC14": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64651917707776, -1.4020001423079365]),
            {
              "LC14": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.638794415114866, -1.4074058506732745]),
            {
              "LC14": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.650038235305296, -1.4026007771880424]),
            {
              "LC14": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64377259504651, -1.4030298020080267]),
            {
              "LC14": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63965272199963, -1.3982247195355775]),
            {
              "LC14": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64969491255139, -1.4058613638454016]),
            {
              "LC14": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64961425430183, -1.3308667399714234]),
            {
              "LC14": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64961425430183, -1.334470653804168]),
            {
              "LC14": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64944259292488, -1.331724815171716]),
            {
              "LC14": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69261542922859, -1.3673231856597818]),
            {
              "LC14": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69364539749031, -1.368524472847334]),
            {
              "LC14": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70986739761238, -1.3746167057382264]),
            {
              "LC14": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71072570449714, -1.3754747654615074]),
            {
              "LC14": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70883742935066, -1.3656070600634262]),
            {
              "LC14": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71398727065925, -1.3630328693718203]),
            {
              "LC14": 1,
              "system:index": "33"
            })]),
    Vegetation14 = ui.import && ui.import("Vegetation14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.65701125118828,
            -1.3404466671258488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65606711361504,
            -1.3444796022222598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.664650182462694,
            -1.3380440643353255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67497830481297,
            -1.3732242851713865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67798237890965,
            -1.3727094488893692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.681501437137186,
            -1.3715081638002962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68321805090672,
            -1.3754552411114727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65386395544773,
            -1.3878112669210019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71789364905125,
            -1.3851107539024408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717207003543436,
            -1.3885429757822818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73042492956883,
            -1.3864836432516268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728708315799295,
            -1.383223029748694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.729738284061014,
            -1.380048217558937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72135610251867,
            -1.4266439942354607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.718695351175896,
            -1.4073379949907252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72504682212316,
            -1.4068231661467279
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7325999227091,
            -1.4021897014433522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77982829922683,
            -1.3893510750862106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6440510044964,
            -1.38761673312787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64817087754327,
            -1.3810096990008562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66671030625421,
            -1.3845277324512382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67417757615167,
            -1.3530368585587778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67366259202081,
            -1.3539807327039795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67340509995538,
            -1.3558684798915703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6773533116253,
            -1.3538091192503587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68413393601495,
            -1.3492613583079414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68164484604913,
            -1.3476310268417075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67774722845654,
            -1.363162034721086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66428991003932,
            -1.3777914571981797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657509285649674,
            -1.3780488748048552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64892621680202,
            -1.367837955124808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66154332800807,
            -1.3108934955088825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65579267188014,
            -1.307632780849693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71641523889775,
            -1.391136017378974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77075215506907,
            -1.397552958749995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769378864053444,
            -1.4002987221557515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72553398162042,
            -1.42440184858345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687768478690735,
            -1.4156498070389802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.721242447196595,
            -1.3905089556282522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67291976958429,
            -1.3939411696642348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66596623307806,
            -1.4038100074706303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.738475700269085,
            -1.3817305137389542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.737445732007366,
            -1.3809582620304681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730193038831096,
            -1.3844333927406045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.727961440930706,
            -1.3857633796899662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.742209335217815,
            -1.3848195180608704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.751178642163616,
            -1.3873078797261231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746457954297405,
            -1.3861066020072983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75375356281791,
            -1.3880801293661544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72105207050834,
            -1.3940007015503066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70542458660033,
            -1.3967520481727154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.704308787650135,
            -1.396323022204182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71832643274869,
            -1.379369971784351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71557985071744,
            -1.382201562047437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73901162867154,
            -1.3906105071417694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74622140650357,
            -1.3903769459153086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74544893030728,
            -1.3907201675628922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72502962571606,
            -1.4255497058541604
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.731896080794186,
            -1.4254639017290693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72185389024243,
            -1.4161112329670096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69464556199536,
            -1.4018676466503455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690697350325436,
            -1.4091610601632623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694988884749264,
            -1.4165402552976627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68117014390454,
            -1.4218601255904881
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6652056358479,
            -1.4158538195304866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66260082996055,
            -1.4103680986142744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68732544489349,
            -1.4268654857765064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69037243433441,
            -1.4308982737360938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692689862923274,
            -1.4235191244416159
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683935132698664,
            -1.435016858376519
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC14": 2
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
            ee.Geometry.Point([36.65701125118828, -1.3404466671258488]),
            {
              "LC14": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65606711361504, -1.3444796022222598]),
            {
              "LC14": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.664650182462694, -1.3380440643353255]),
            {
              "LC14": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67497830481297, -1.3732242851713865]),
            {
              "LC14": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67798237890965, -1.3727094488893692]),
            {
              "LC14": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.681501437137186, -1.3715081638002962]),
            {
              "LC14": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68321805090672, -1.3754552411114727]),
            {
              "LC14": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65386395544773, -1.3878112669210019]),
            {
              "LC14": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71789364905125, -1.3851107539024408]),
            {
              "LC14": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717207003543436, -1.3885429757822818]),
            {
              "LC14": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73042492956883, -1.3864836432516268]),
            {
              "LC14": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728708315799295, -1.383223029748694]),
            {
              "LC14": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.729738284061014, -1.380048217558937]),
            {
              "LC14": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72135610251867, -1.4266439942354607]),
            {
              "LC14": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.718695351175896, -1.4073379949907252]),
            {
              "LC14": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72504682212316, -1.4068231661467279]),
            {
              "LC14": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7325999227091, -1.4021897014433522]),
            {
              "LC14": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77982829922683, -1.3893510750862106]),
            {
              "LC14": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6440510044964, -1.38761673312787]),
            {
              "LC14": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64817087754327, -1.3810096990008562]),
            {
              "LC14": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66671030625421, -1.3845277324512382]),
            {
              "LC14": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67417757615167, -1.3530368585587778]),
            {
              "LC14": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67366259202081, -1.3539807327039795]),
            {
              "LC14": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67340509995538, -1.3558684798915703]),
            {
              "LC14": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6773533116253, -1.3538091192503587]),
            {
              "LC14": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68413393601495, -1.3492613583079414]),
            {
              "LC14": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68164484604913, -1.3476310268417075]),
            {
              "LC14": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67774722845654, -1.363162034721086]),
            {
              "LC14": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66428991003932, -1.3777914571981797]),
            {
              "LC14": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657509285649674, -1.3780488748048552]),
            {
              "LC14": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64892621680202, -1.367837955124808]),
            {
              "LC14": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66154332800807, -1.3108934955088825]),
            {
              "LC14": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65579267188014, -1.307632780849693]),
            {
              "LC14": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71641523889775, -1.391136017378974]),
            {
              "LC14": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77075215506907, -1.397552958749995]),
            {
              "LC14": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769378864053444, -1.4002987221557515]),
            {
              "LC14": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72553398162042, -1.42440184858345]),
            {
              "LC14": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687768478690735, -1.4156498070389802]),
            {
              "LC14": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.721242447196595, -1.3905089556282522]),
            {
              "LC14": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67291976958429, -1.3939411696642348]),
            {
              "LC14": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66596623307806, -1.4038100074706303]),
            {
              "LC14": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.738475700269085, -1.3817305137389542]),
            {
              "LC14": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.737445732007366, -1.3809582620304681]),
            {
              "LC14": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730193038831096, -1.3844333927406045]),
            {
              "LC14": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.727961440930706, -1.3857633796899662]),
            {
              "LC14": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.742209335217815, -1.3848195180608704]),
            {
              "LC14": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.751178642163616, -1.3873078797261231]),
            {
              "LC14": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746457954297405, -1.3861066020072983]),
            {
              "LC14": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75375356281791, -1.3880801293661544]),
            {
              "LC14": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72105207050834, -1.3940007015503066]),
            {
              "LC14": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70542458660033, -1.3967520481727154]),
            {
              "LC14": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.704308787650135, -1.396323022204182]),
            {
              "LC14": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71832643274869, -1.379369971784351]),
            {
              "LC14": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71557985071744, -1.382201562047437]),
            {
              "LC14": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73901162867154, -1.3906105071417694]),
            {
              "LC14": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74622140650357, -1.3903769459153086]),
            {
              "LC14": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74544893030728, -1.3907201675628922]),
            {
              "LC14": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72502962571606, -1.4255497058541604]),
            {
              "LC14": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.731896080794186, -1.4254639017290693]),
            {
              "LC14": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72185389024243, -1.4161112329670096]),
            {
              "LC14": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69464556199536, -1.4018676466503455]),
            {
              "LC14": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690697350325436, -1.4091610601632623]),
            {
              "LC14": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694988884749264, -1.4165402552976627]),
            {
              "LC14": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68117014390454, -1.4218601255904881]),
            {
              "LC14": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6652056358479, -1.4158538195304866]),
            {
              "LC14": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66260082996055, -1.4103680986142744]),
            {
              "LC14": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68732544489349, -1.4268654857765064]),
            {
              "LC14": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69037243433441, -1.4308982737360938]),
            {
              "LC14": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692689862923274, -1.4235191244416159]),
            {
              "LC14": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683935132698664, -1.435016858376519]),
            {
              "LC14": 2,
              "system:index": "69"
            })]),
    NonBuilt_Up14 = ui.import && ui.import("NonBuilt_Up14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.81821637753804,
            -1.385249853720488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.817443901341754,
            -1.3889394918236795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81461148862203,
            -1.3891969082207263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80989080075582,
            -1.3893685191365188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78182416562398,
            -1.4018102772174474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77942090634664,
            -1.4039554012552717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.775472694676715,
            -1.4013812521739466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.777704292577106,
            -1.3998367613667926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78800397519429,
            -1.3958039194655447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7868881762441,
            -1.402839937001059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7843132555898,
            -1.3997509562921022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80928998593648,
            -1.390312378950434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81649976376851,
            -1.3897117409306752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81598477963765,
            -1.3858504928734146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69195943478902,
            -1.359593840032974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68354802731832,
            -1.361481582837315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.685607963841754,
            -1.3595080335067675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69878036825706,
            -1.394468807775101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69886619894554,
            -1.3989306775388646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68350250570823,
            -1.3948120288268016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66007072775413,
            -1.3664103186326695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66032821981956,
            -1.3671825750445088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.650286029267804,
            -1.3396386105026232
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65268928854515,
            -1.3387805380648459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652002643037335,
            -1.3407541042224231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65260345785667,
            -1.3442721964687678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.651401828218,
            -1.3283120301997087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65260345785667,
            -1.3321733702490175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6598132356887,
            -1.3274539538131327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66358978598167,
            -1.3285694530575816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65904075949241,
            -1.3298565669445044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.665735553193585,
            -1.329341721470239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652517627168194,
            -1.3341469417161365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.685766698810085,
            -1.360549883633266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68362093159817,
            -1.3626092385300903
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64112798052945,
            -1.386600521224931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64078465777554,
            -1.3871368058842646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63863889056363,
            -1.3800363871638255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.637694752990384,
            -1.380336707418968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64584866839566,
            -1.3857853683100667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657384338378904,
            -1.3332427224219299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65802806854248,
            -1.3334143373203875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659873428344724,
            -1.3331140112402369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6599592590332,
            -1.3340578930830171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65777057647705,
            -1.334529833868642
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66128963470459,
            -1.3338004707981657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66030258178711,
            -1.3344011227542625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65523857116699,
            -1.3335001447651254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.653393211364744,
            -1.3302823635417784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66128963470459,
            -1.3286520194528646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65871471405029,
            -1.3340578930830171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65871471405029,
            -1.3365463071139525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6544660949707,
            -1.33641759610518
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC14": 3
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
            ee.Geometry.Point([36.81821637753804, -1.385249853720488]),
            {
              "LC14": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.817443901341754, -1.3889394918236795]),
            {
              "LC14": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81461148862203, -1.3891969082207263]),
            {
              "LC14": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80989080075582, -1.3893685191365188]),
            {
              "LC14": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78182416562398, -1.4018102772174474]),
            {
              "LC14": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77942090634664, -1.4039554012552717]),
            {
              "LC14": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.775472694676715, -1.4013812521739466]),
            {
              "LC14": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.777704292577106, -1.3998367613667926]),
            {
              "LC14": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78800397519429, -1.3958039194655447]),
            {
              "LC14": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7868881762441, -1.402839937001059]),
            {
              "LC14": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7843132555898, -1.3997509562921022]),
            {
              "LC14": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80928998593648, -1.390312378950434]),
            {
              "LC14": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81649976376851, -1.3897117409306752]),
            {
              "LC14": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81598477963765, -1.3858504928734146]),
            {
              "LC14": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69195943478902, -1.359593840032974]),
            {
              "LC14": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68354802731832, -1.361481582837315]),
            {
              "LC14": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.685607963841754, -1.3595080335067675]),
            {
              "LC14": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69878036825706, -1.394468807775101]),
            {
              "LC14": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69886619894554, -1.3989306775388646]),
            {
              "LC14": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68350250570823, -1.3948120288268016]),
            {
              "LC14": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66007072775413, -1.3664103186326695]),
            {
              "LC14": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66032821981956, -1.3671825750445088]),
            {
              "LC14": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.650286029267804, -1.3396386105026232]),
            {
              "LC14": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65268928854515, -1.3387805380648459]),
            {
              "LC14": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652002643037335, -1.3407541042224231]),
            {
              "LC14": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65260345785667, -1.3442721964687678]),
            {
              "LC14": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.651401828218, -1.3283120301997087]),
            {
              "LC14": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65260345785667, -1.3321733702490175]),
            {
              "LC14": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6598132356887, -1.3274539538131327]),
            {
              "LC14": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66358978598167, -1.3285694530575816]),
            {
              "LC14": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65904075949241, -1.3298565669445044]),
            {
              "LC14": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.665735553193585, -1.329341721470239]),
            {
              "LC14": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652517627168194, -1.3341469417161365]),
            {
              "LC14": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.685766698810085, -1.360549883633266]),
            {
              "LC14": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68362093159817, -1.3626092385300903]),
            {
              "LC14": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64112798052945, -1.386600521224931]),
            {
              "LC14": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64078465777554, -1.3871368058842646]),
            {
              "LC14": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63863889056363, -1.3800363871638255]),
            {
              "LC14": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.637694752990384, -1.380336707418968]),
            {
              "LC14": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64584866839566, -1.3857853683100667]),
            {
              "LC14": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657384338378904, -1.3332427224219299]),
            {
              "LC14": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65802806854248, -1.3334143373203875]),
            {
              "LC14": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659873428344724, -1.3331140112402369]),
            {
              "LC14": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6599592590332, -1.3340578930830171]),
            {
              "LC14": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65777057647705, -1.334529833868642]),
            {
              "LC14": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66128963470459, -1.3338004707981657]),
            {
              "LC14": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66030258178711, -1.3344011227542625]),
            {
              "LC14": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65523857116699, -1.3335001447651254]),
            {
              "LC14": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.653393211364744, -1.3302823635417784]),
            {
              "LC14": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66128963470459, -1.3286520194528646]),
            {
              "LC14": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65871471405029, -1.3340578930830171]),
            {
              "LC14": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65871471405029, -1.3365463071139525]),
            {
              "LC14": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6544660949707, -1.33641759610518]),
            {
              "LC14": 3,
              "system:index": "52"
            })]),
    Water14 = ui.import && ui.import("Water14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.694473977004144,
            -1.4408047322408077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69490313044653,
            -1.442520802632619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69310068598852,
            -1.4426066061182408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69430231562719,
            -1.4432930338867542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693958992873284,
            -1.4451807091814688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69404482356176,
            -1.4484412355392386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69550394526586,
            -1.4384022315207723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.391757421535125,
            -0.7335069802611136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.404460363429656,
            -0.7403728673780745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.420939855617156,
            -0.7517015578297505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.399997167628875,
            -0.7468954502926435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.372531347316375,
            -0.7506716780873611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.36394827846872,
            -0.7747021415087249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.356051855128875,
            -0.8011354937040538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.370814733546844,
            -0.8100610029676102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.3793978023945,
            -0.7623436342183342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.383517675441375,
            -0.735910041955285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.37115805630075,
            -0.7355667475067129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60586325553561,
            -0.7011067285241194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.604747456585415,
            -0.7053979396852491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.606464070354946,
            -0.7020507953178591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60654990104342,
            -0.704797170360349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66826520949318,
            -0.7540603400529878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67152677565529,
            -0.7554335119213937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673844204244155,
            -0.7577507384649644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67976652174904,
            -0.7598963174928021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68045316725685,
            -0.7571499761466098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.681053982076186,
            -0.7586947933683149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67727743178322,
            -0.7593813786232022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83735304113616,
            -0.8164474084501875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.83984213110198,
            -0.8225407640107905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.844991972410575,
            -0.8224549421659132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.847223570310966,
            -0.8193653545230547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84009962316741,
            -0.815760832595595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.842760374510185,
            -0.8233989823579387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.84833936926116,
            -0.8213392580147398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6947656985095,
            -1.4369924960568914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692641388969705,
            -1.4358341458763337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692888152199075,
            -1.435737616668117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69356406887083,
            -1.4359628514809495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694315087395,
            -1.436606379395291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69492663105039,
            -1.4372177307460257
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC14": 4
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
            ee.Geometry.Point([36.694473977004144, -1.4408047322408077]),
            {
              "LC14": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69490313044653, -1.442520802632619]),
            {
              "LC14": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69310068598852, -1.4426066061182408]),
            {
              "LC14": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69430231562719, -1.4432930338867542]),
            {
              "LC14": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693958992873284, -1.4451807091814688]),
            {
              "LC14": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69404482356176, -1.4484412355392386]),
            {
              "LC14": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69550394526586, -1.4384022315207723]),
            {
              "LC14": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.391757421535125, -0.7335069802611136]),
            {
              "LC14": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.404460363429656, -0.7403728673780745]),
            {
              "LC14": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.420939855617156, -0.7517015578297505]),
            {
              "LC14": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.399997167628875, -0.7468954502926435]),
            {
              "LC14": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.372531347316375, -0.7506716780873611]),
            {
              "LC14": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.36394827846872, -0.7747021415087249]),
            {
              "LC14": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.356051855128875, -0.8011354937040538]),
            {
              "LC14": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.370814733546844, -0.8100610029676102]),
            {
              "LC14": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.3793978023945, -0.7623436342183342]),
            {
              "LC14": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.383517675441375, -0.735910041955285]),
            {
              "LC14": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.37115805630075, -0.7355667475067129]),
            {
              "LC14": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60586325553561, -0.7011067285241194]),
            {
              "LC14": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.604747456585415, -0.7053979396852491]),
            {
              "LC14": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.606464070354946, -0.7020507953178591]),
            {
              "LC14": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60654990104342, -0.704797170360349]),
            {
              "LC14": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66826520949318, -0.7540603400529878]),
            {
              "LC14": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67152677565529, -0.7554335119213937]),
            {
              "LC14": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673844204244155, -0.7577507384649644]),
            {
              "LC14": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67976652174904, -0.7598963174928021]),
            {
              "LC14": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68045316725685, -0.7571499761466098]),
            {
              "LC14": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.681053982076186, -0.7586947933683149]),
            {
              "LC14": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67727743178322, -0.7593813786232022]),
            {
              "LC14": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83735304113616, -0.8164474084501875]),
            {
              "LC14": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.83984213110198, -0.8225407640107905]),
            {
              "LC14": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.844991972410575, -0.8224549421659132]),
            {
              "LC14": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.847223570310966, -0.8193653545230547]),
            {
              "LC14": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84009962316741, -0.815760832595595]),
            {
              "LC14": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.842760374510185, -0.8233989823579387]),
            {
              "LC14": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.84833936926116, -0.8213392580147398]),
            {
              "LC14": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6947656985095, -1.4369924960568914]),
            {
              "LC14": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692641388969705, -1.4358341458763337]),
            {
              "LC14": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692888152199075, -1.435737616668117]),
            {
              "LC14": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69356406887083, -1.4359628514809495]),
            {
              "LC14": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694315087395, -1.436606379395291]),
            {
              "LC14": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69492663105039, -1.4372177307460257]),
            {
              "LC14": 4,
              "system:index": "41"
            })]),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    BuiltUp06 = ui.import && ui.import("BuiltUp06", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.718179297295706,
            -1.4130635860344396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71139867290606,
            -1.408644645616147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71807200893511,
            -1.4109184703748834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.712192606774465,
            -1.4110900797004748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70961768612017,
            -1.4173752625141698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71262176021685,
            -1.4203784155194004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703716826287405,
            -1.4200351982304742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72605426296343,
            -1.4221803054496143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.726397585717336,
            -1.4221803054496143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71603353008379,
            -1.4090450955472886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71912343486895,
            -1.4111473106061458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7531122017218,
            -1.3966032707566938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.753970508606564,
            -1.3965818194587634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74961460116638,
            -1.3963458551686656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74553764346374,
            -1.3960669882498327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74030197146667,
            -1.396045536947004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73828495028747,
            -1.3952303872948797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75564420703186,
            -1.3968177837251723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.759163265259396,
            -1.397590030249532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75435674670471,
            -1.3997351581510307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75223243716491,
            -1.3987054970030375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76212442401184,
            -1.395938280429986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76463497164978,
            -1.3975685789606218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74857523359218,
            -1.3966461733519568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72259855256728,
            -1.3763955396489471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72349977479628,
            -1.3757734466203904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7230706213539,
            -1.3761381218637028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.721139430863175,
            -1.3721052396043583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72156858430556,
            -1.377296501678417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65427582069544,
            -1.3621284442109702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65526287361292,
            -1.3616565087750383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65582077308802,
            -1.3633726371898613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.649855540238896,
            -1.3718674547981313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67453186317591,
            -1.3841376936016252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.674832270585576,
            -1.3798045046037575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67345897956995,
            -1.3838373738271532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69201722465595,
            -1.4262473995761074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69141640983661,
            -1.426697871043784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68746819816669,
            -1.4300227767655074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68779006324848,
            -1.430087129731989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67439631975994,
            -1.3339395567132832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.674310489071466,
            -1.334969245632862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67624167956219,
            -1.3345402086354243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.677314563168146,
            -1.335569897303485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67679957903729,
            -1.3364708745341616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666328235043146,
            -1.3420912488354195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66328124560223,
            -1.3462957952134884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.662637515438654,
            -1.3573219690718925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67246512926922,
            -1.3618268116522485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657873912228204,
            -1.358995197297173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.677357478512384,
            -1.3609687470471594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68267898119793,
            -1.3647442290233174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6858976320158,
            -1.3689916391610972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722289843929865,
            -1.3730674296936056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75109628458862,
            -1.3899506769083523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75452951212768,
            -1.390637120277563
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75375703593139,
            -1.3904655094539682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76234010477905,
            -1.3935545023682019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75650361796264,
            -1.392181617128178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76512960215454,
            -1.3993034506098239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76401380320434,
            -1.3991318404182946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.756975686749264,
            -1.4091710154570436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75779107828979,
            -1.4063823600513932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.742010401767104,
            -1.3967370797149676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74136667160353,
            -1.3980670597280358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75085096268019,
            -1.397466423686353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75733117966017,
            -1.3997831618572663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.757931994479506,
            -1.3989251109495542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74774837458475,
            -1.3988948879261296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74083900416239,
            -1.3989806930321294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74328517878397,
            -1.401769357267712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7310972210203,
            -1.3979510315530532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.739465713146764,
            -1.4018551622684863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7600221630369,
            -1.398337154660633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76109504664286,
            -1.398337154660633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7625970836912,
            -1.399881646455629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7680902477537,
            -1.3965352462820566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.743775703336624,
            -1.3967804356942166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74283156576338,
            -1.3981104156827182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73386225881758,
            -1.3972952667468421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72931323232832,
            -1.3967804356942166
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC06": 0
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
            ee.Geometry.Point([36.718179297295706, -1.4130635860344396]),
            {
              "LC06": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71139867290606, -1.408644645616147]),
            {
              "LC06": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71807200893511, -1.4109184703748834]),
            {
              "LC06": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.712192606774465, -1.4110900797004748]),
            {
              "LC06": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70961768612017, -1.4173752625141698]),
            {
              "LC06": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71262176021685, -1.4203784155194004]),
            {
              "LC06": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703716826287405, -1.4200351982304742]),
            {
              "LC06": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72605426296343, -1.4221803054496143]),
            {
              "LC06": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.726397585717336, -1.4221803054496143]),
            {
              "LC06": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71603353008379, -1.4090450955472886]),
            {
              "LC06": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71912343486895, -1.4111473106061458]),
            {
              "LC06": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7531122017218, -1.3966032707566938]),
            {
              "LC06": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.753970508606564, -1.3965818194587634]),
            {
              "LC06": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74961460116638, -1.3963458551686656]),
            {
              "LC06": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74553764346374, -1.3960669882498327]),
            {
              "LC06": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74030197146667, -1.396045536947004]),
            {
              "LC06": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73828495028747, -1.3952303872948797]),
            {
              "LC06": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75564420703186, -1.3968177837251723]),
            {
              "LC06": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.759163265259396, -1.397590030249532]),
            {
              "LC06": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75435674670471, -1.3997351581510307]),
            {
              "LC06": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75223243716491, -1.3987054970030375]),
            {
              "LC06": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76212442401184, -1.395938280429986]),
            {
              "LC06": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76463497164978, -1.3975685789606218]),
            {
              "LC06": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74857523359218, -1.3966461733519568]),
            {
              "LC06": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72259855256728, -1.3763955396489471]),
            {
              "LC06": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72349977479628, -1.3757734466203904]),
            {
              "LC06": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7230706213539, -1.3761381218637028]),
            {
              "LC06": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.721139430863175, -1.3721052396043583]),
            {
              "LC06": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72156858430556, -1.377296501678417]),
            {
              "LC06": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65427582069544, -1.3621284442109702]),
            {
              "LC06": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65526287361292, -1.3616565087750383]),
            {
              "LC06": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65582077308802, -1.3633726371898613]),
            {
              "LC06": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.649855540238896, -1.3718674547981313]),
            {
              "LC06": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67453186317591, -1.3841376936016252]),
            {
              "LC06": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.674832270585576, -1.3798045046037575]),
            {
              "LC06": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67345897956995, -1.3838373738271532]),
            {
              "LC06": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69201722465595, -1.4262473995761074]),
            {
              "LC06": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69141640983661, -1.426697871043784]),
            {
              "LC06": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68746819816669, -1.4300227767655074]),
            {
              "LC06": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68779006324848, -1.430087129731989]),
            {
              "LC06": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67439631975994, -1.3339395567132832]),
            {
              "LC06": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.674310489071466, -1.334969245632862]),
            {
              "LC06": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67624167956219, -1.3345402086354243]),
            {
              "LC06": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.677314563168146, -1.335569897303485]),
            {
              "LC06": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67679957903729, -1.3364708745341616]),
            {
              "LC06": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666328235043146, -1.3420912488354195]),
            {
              "LC06": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66328124560223, -1.3462957952134884]),
            {
              "LC06": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.662637515438654, -1.3573219690718925]),
            {
              "LC06": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67246512926922, -1.3618268116522485]),
            {
              "LC06": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657873912228204, -1.358995197297173]),
            {
              "LC06": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.677357478512384, -1.3609687470471594]),
            {
              "LC06": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68267898119793, -1.3647442290233174]),
            {
              "LC06": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6858976320158, -1.3689916391610972]),
            {
              "LC06": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722289843929865, -1.3730674296936056]),
            {
              "LC06": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75109628458862, -1.3899506769083523]),
            {
              "LC06": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75452951212768, -1.390637120277563]),
            {
              "LC06": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75375703593139, -1.3904655094539682]),
            {
              "LC06": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76234010477905, -1.3935545023682019]),
            {
              "LC06": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75650361796264, -1.392181617128178]),
            {
              "LC06": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76512960215454, -1.3993034506098239]),
            {
              "LC06": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76401380320434, -1.3991318404182946]),
            {
              "LC06": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.756975686749264, -1.4091710154570436]),
            {
              "LC06": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75779107828979, -1.4063823600513932]),
            {
              "LC06": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.742010401767104, -1.3967370797149676]),
            {
              "LC06": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74136667160353, -1.3980670597280358]),
            {
              "LC06": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75085096268019, -1.397466423686353]),
            {
              "LC06": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75733117966017, -1.3997831618572663]),
            {
              "LC06": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.757931994479506, -1.3989251109495542]),
            {
              "LC06": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74774837458475, -1.3988948879261296]),
            {
              "LC06": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74083900416239, -1.3989806930321294]),
            {
              "LC06": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74328517878397, -1.401769357267712]),
            {
              "LC06": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7310972210203, -1.3979510315530532]),
            {
              "LC06": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.739465713146764, -1.4018551622684863]),
            {
              "LC06": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7600221630369, -1.398337154660633]),
            {
              "LC06": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76109504664286, -1.398337154660633]),
            {
              "LC06": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7625970836912, -1.399881646455629]),
            {
              "LC06": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7680902477537, -1.3965352462820566]),
            {
              "LC06": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.743775703336624, -1.3967804356942166]),
            {
              "LC06": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74283156576338, -1.3981104156827182]),
            {
              "LC06": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73386225881758, -1.3972952667468421]),
            {
              "LC06": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72931323232832, -1.3967804356942166]),
            {
              "LC06": 0,
              "system:index": "80"
            })]),
    BuiltUp16 = ui.import && ui.import("BuiltUp16", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74628516242428,
            -1.393439279101765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750619612192345,
            -1.393911208241331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74847384498043,
            -1.3915515615982912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74825926825924,
            -1.3928815445422023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.744654379343224,
            -1.3964853655185385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74057742164059,
            -1.3956702160188774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75207873389645,
            -1.3936537923587453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750405035471154,
            -1.3896638425839773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76027556464596,
            -1.3947692609800122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7297198395483,
            -1.3964853655185385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76345130011959,
            -1.3955844107919528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76246424720211,
            -1.3963137551210363
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74238720875995,
            -1.3914083608623857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7222599123122,
            -1.373346259388028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71659508687274,
            -1.369828209432145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71921292287128,
            -1.3727027140510148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71526471120136,
            -1.371201107591213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.727076568315006,
            -1.3835653951686937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.724115409562565,
            -1.3874695497158576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73565963716266,
            -1.3950633263528198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.722870864579654,
            -1.3998255127640737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.714888610551334,
            -1.4072905422559971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71330074281452,
            -1.404973811516501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71591857881305,
            -1.4057460553517909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71321491212604,
            -1.4078482733867566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7186651608443,
            -1.4109372433859462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.676195500385944,
            -1.3334845058873652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67733275700826,
            -1.3353079133922137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.673148510945026,
            -1.33479306905721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6748007516982,
            -1.3351577504723124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67971455861348,
            -1.3339993504962528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67778336812276,
            -1.3368738975814818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67881333638448,
            -1.3377534225100884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66668277889702,
            -1.3411503606405364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65621143490288,
            -1.3602852856775223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65775638729546,
            -1.3582259287970369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65801387936089,
            -1.3610146408180237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.654280244412156,
            -1.362258834372048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65496688991997,
            -1.3628165761015352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6800266501164,
            -1.3871676412239162
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68067038027998,
            -1.3891626190631474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68212950198408,
            -1.3909001790345925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68330967395063,
            -1.3921658083319683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68307363955732,
            -1.3886906889736261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66885163774637,
            -1.3652923232096088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68466594209818,
            -1.3717706917551529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67363669862894,
            -1.3720066584907917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657779478932895,
            -1.3697971508734688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67134072771219,
            -1.3731864918197998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68889310350565,
            -1.3746022910458109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687476897145785,
            -1.4256133994264935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68915059557108,
            -1.424712455978562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69159677019266,
            -1.42677175477002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68709065904764,
            -1.4284878356881316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69361379137186,
            -1.4251414767120043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69708993425516,
            -1.4224815468772452
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6956737278953,
            -1.425484693241223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70481469621805,
            -1.4203793420962358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70686115866008,
            -1.4193904601484466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69799914007488,
            -1.431274332351552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69420113210979,
            -1.4345348786008671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69570316915813,
            -1.4343632710192755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78874790139929,
            -1.4008993346077434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76776229806677,
            -1.3960942477700466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77085220285193,
            -1.3955365138396103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.769865149934446,
            -1.3915036645639283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.781623954255735,
            -1.3936917006661758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.779864425141966,
            -1.3907743187453019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7610675043656,
            -1.3997624176286507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75821363397375,
            -1.3990545256461902
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC16": 0
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
            ee.Geometry.Point([36.74628516242428, -1.393439279101765]),
            {
              "LC16": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750619612192345, -1.393911208241331]),
            {
              "LC16": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74847384498043, -1.3915515615982912]),
            {
              "LC16": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74825926825924, -1.3928815445422023]),
            {
              "LC16": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.744654379343224, -1.3964853655185385]),
            {
              "LC16": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74057742164059, -1.3956702160188774]),
            {
              "LC16": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75207873389645, -1.3936537923587453]),
            {
              "LC16": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750405035471154, -1.3896638425839773]),
            {
              "LC16": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76027556464596, -1.3947692609800122]),
            {
              "LC16": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7297198395483, -1.3964853655185385]),
            {
              "LC16": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76345130011959, -1.3955844107919528]),
            {
              "LC16": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76246424720211, -1.3963137551210363]),
            {
              "LC16": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74238720875995, -1.3914083608623857]),
            {
              "LC16": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7222599123122, -1.373346259388028]),
            {
              "LC16": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71659508687274, -1.369828209432145]),
            {
              "LC16": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71921292287128, -1.3727027140510148]),
            {
              "LC16": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71526471120136, -1.371201107591213]),
            {
              "LC16": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.727076568315006, -1.3835653951686937]),
            {
              "LC16": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.724115409562565, -1.3874695497158576]),
            {
              "LC16": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73565963716266, -1.3950633263528198]),
            {
              "LC16": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.722870864579654, -1.3998255127640737]),
            {
              "LC16": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.714888610551334, -1.4072905422559971]),
            {
              "LC16": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71330074281452, -1.404973811516501]),
            {
              "LC16": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71591857881305, -1.4057460553517909]),
            {
              "LC16": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71321491212604, -1.4078482733867566]),
            {
              "LC16": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7186651608443, -1.4109372433859462]),
            {
              "LC16": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.676195500385944, -1.3334845058873652]),
            {
              "LC16": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67733275700826, -1.3353079133922137]),
            {
              "LC16": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.673148510945026, -1.33479306905721]),
            {
              "LC16": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6748007516982, -1.3351577504723124]),
            {
              "LC16": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67971455861348, -1.3339993504962528]),
            {
              "LC16": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67778336812276, -1.3368738975814818]),
            {
              "LC16": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67881333638448, -1.3377534225100884]),
            {
              "LC16": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66668277889702, -1.3411503606405364]),
            {
              "LC16": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65621143490288, -1.3602852856775223]),
            {
              "LC16": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65775638729546, -1.3582259287970369]),
            {
              "LC16": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65801387936089, -1.3610146408180237]),
            {
              "LC16": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.654280244412156, -1.362258834372048]),
            {
              "LC16": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65496688991997, -1.3628165761015352]),
            {
              "LC16": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6800266501164, -1.3871676412239162]),
            {
              "LC16": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68067038027998, -1.3891626190631474]),
            {
              "LC16": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68212950198408, -1.3909001790345925]),
            {
              "LC16": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68330967395063, -1.3921658083319683]),
            {
              "LC16": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68307363955732, -1.3886906889736261]),
            {
              "LC16": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66885163774637, -1.3652923232096088]),
            {
              "LC16": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68466594209818, -1.3717706917551529]),
            {
              "LC16": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67363669862894, -1.3720066584907917]),
            {
              "LC16": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657779478932895, -1.3697971508734688]),
            {
              "LC16": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67134072771219, -1.3731864918197998]),
            {
              "LC16": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68889310350565, -1.3746022910458109]),
            {
              "LC16": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687476897145785, -1.4256133994264935]),
            {
              "LC16": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68915059557108, -1.424712455978562]),
            {
              "LC16": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69159677019266, -1.42677175477002]),
            {
              "LC16": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68709065904764, -1.4284878356881316]),
            {
              "LC16": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69361379137186, -1.4251414767120043]),
            {
              "LC16": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69708993425516, -1.4224815468772452]),
            {
              "LC16": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6956737278953, -1.425484693241223]),
            {
              "LC16": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70481469621805, -1.4203793420962358]),
            {
              "LC16": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70686115866008, -1.4193904601484466]),
            {
              "LC16": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69799914007488, -1.431274332351552]),
            {
              "LC16": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69420113210979, -1.4345348786008671]),
            {
              "LC16": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69570316915813, -1.4343632710192755]),
            {
              "LC16": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78874790139929, -1.4008993346077434]),
            {
              "LC16": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76776229806677, -1.3960942477700466]),
            {
              "LC16": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77085220285193, -1.3955365138396103]),
            {
              "LC16": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.769865149934446, -1.3915036645639283]),
            {
              "LC16": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.781623954255735, -1.3936917006661758]),
            {
              "LC16": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.779864425141966, -1.3907743187453019]),
            {
              "LC16": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7610675043656, -1.3997624176286507]),
            {
              "LC16": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75821363397375, -1.3990545256461902]),
            {
              "LC16": 0,
              "system:index": "69"
            })]),
    ForestedAreas16 = ui.import && ui.import("ForestedAreas16", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.70522805149494,
            -1.363864620340999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70398350651203,
            -1.3654520377109312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70531388218342,
            -1.3650230060926511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70733090336262,
            -1.3669965509025237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70698758060871,
            -1.370686217280821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70947667057453,
            -1.368369450683204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71205159122883,
            -1.3694849311764383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7112361996883,
            -1.3710294417714006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71647187168537,
            -1.3664388101423295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7147123425716,
            -1.364722683914316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71282406742512,
            -1.3624917179874025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.709648331951485,
            -1.3604752662372348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69870491917072,
            -1.3602178467434982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70106526310383,
            -1.3624917179874025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69720288212238,
            -1.3651946187491613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6973316281551,
            -1.3688413848013685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69557209904133,
            -1.3702571865984128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.697932442974434,
            -1.357171713983982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.689177712749824,
            -1.3506504027934525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.646452868301964,
            -1.403384706610741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6455945614172,
            -1.4037279263579814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741677907862496,
            -1.3197309479619137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.733695653834175,
            -1.310549483529197
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74081960097773,
            -1.321103874315454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73961797133906,
            -1.3208464506819328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7375562463777,
            -1.320087715823799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.736440447427505,
            -1.3198302920850395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73438051090407,
            -1.3167412051429739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.735152987100356,
            -1.3113352937882112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72476747379469,
            -1.3150250440759912
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.728200701333755,
            -1.3135663062412202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750430849649184,
            -1.3218038734008226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74605348453688,
            -1.3222329126098145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74777009830641,
            -1.3172560532327366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7566106592195,
            -1.3190580207089067
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC16": 1
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
            ee.Geometry.Point([36.70522805149494, -1.363864620340999]),
            {
              "LC16": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70398350651203, -1.3654520377109312]),
            {
              "LC16": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70531388218342, -1.3650230060926511]),
            {
              "LC16": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70733090336262, -1.3669965509025237]),
            {
              "LC16": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70698758060871, -1.370686217280821]),
            {
              "LC16": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70947667057453, -1.368369450683204]),
            {
              "LC16": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71205159122883, -1.3694849311764383]),
            {
              "LC16": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7112361996883, -1.3710294417714006]),
            {
              "LC16": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71647187168537, -1.3664388101423295]),
            {
              "LC16": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7147123425716, -1.364722683914316]),
            {
              "LC16": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71282406742512, -1.3624917179874025]),
            {
              "LC16": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.709648331951485, -1.3604752662372348]),
            {
              "LC16": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69870491917072, -1.3602178467434982]),
            {
              "LC16": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70106526310383, -1.3624917179874025]),
            {
              "LC16": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69720288212238, -1.3651946187491613]),
            {
              "LC16": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6973316281551, -1.3688413848013685]),
            {
              "LC16": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69557209904133, -1.3702571865984128]),
            {
              "LC16": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.697932442974434, -1.357171713983982]),
            {
              "LC16": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.689177712749824, -1.3506504027934525]),
            {
              "LC16": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.646452868301964, -1.403384706610741]),
            {
              "LC16": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6455945614172, -1.4037279263579814]),
            {
              "LC16": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741677907862496, -1.3197309479619137]),
            {
              "LC16": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.733695653834175, -1.310549483529197]),
            {
              "LC16": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74081960097773, -1.321103874315454]),
            {
              "LC16": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73961797133906, -1.3208464506819328]),
            {
              "LC16": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7375562463777, -1.320087715823799]),
            {
              "LC16": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.736440447427505, -1.3198302920850395]),
            {
              "LC16": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73438051090407, -1.3167412051429739]),
            {
              "LC16": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.735152987100356, -1.3113352937882112]),
            {
              "LC16": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72476747379469, -1.3150250440759912]),
            {
              "LC16": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.728200701333755, -1.3135663062412202]),
            {
              "LC16": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750430849649184, -1.3218038734008226]),
            {
              "LC16": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74605348453688, -1.3222329126098145]),
            {
              "LC16": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74777009830641, -1.3172560532327366]),
            {
              "LC16": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7566106592195, -1.3190580207089067]),
            {
              "LC16": 1,
              "system:index": "34"
            })]),
    Vegetation16 = ui.import && ui.import("Vegetation16", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.73066142972841,
            -1.384805262067485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7297602074994,
            -1.3856204153196536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73315051969423,
            -1.3932571005619059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71740058835878,
            -1.3875939430839412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71834472593202,
            -1.3843333311091253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71564105924501,
            -1.3815875491255836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746411361063856,
            -1.3901681072580925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74250606473817,
            -1.3896103719250188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73332218107118,
            -1.3936861270895047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74100402768983,
            -1.3916697017305746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72143463071718,
            -1.3940293482553234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.705770530070204,
            -1.3858778320778589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69931910624556,
            -1.3945206725486938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6953279792314,
            -1.3981673935809256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69910452952437,
            -1.399797690563789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70052073588423,
            -1.3999263981720778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.696486693525834,
            -1.3998405931006697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67361281504683,
            -1.3899729889935228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.672497016096635,
            -1.3900158917095324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6673042594438,
            -1.3919465131231616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65241263499312,
            -1.3882568797138835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65417216410689,
            -1.3876133384127909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6554167090898,
            -1.3864978664095127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658334952498,
            -1.3866265747444184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65515921702437,
            -1.3942203540940121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64142630686812,
            -1.3829369330376966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64245627512984,
            -1.3965799980622946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64314292063765,
            -1.388085268717394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65267012705855,
            -1.4011276688419028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64717696299605,
            -1.4079920608358565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.652755957747026,
            -1.4094507415338076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72448313185034,
            -1.4037168911835476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69478571363745,
            -1.4022153044104504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70057928510962,
            -1.4016575719350544
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748859047377685,
            -1.4054758916054888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749116539443115,
            -1.4063339401110935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7215219730979,
            -1.4047465501278107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72199404188452,
            -1.4051755745540169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.653501152480224,
            -1.3944928429552985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64088404127417,
            -1.3921760995714816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64294397779761,
            -1.4026443293011066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698068019093206,
            -1.4196791478278217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68952786558979,
            -1.408996482652278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69068657988422,
            -1.4088677755435017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72404726862451,
            -1.4048099857703775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73361739038965,
            -1.3961007731561401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.758594120736326,
            -1.406254836806225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75928076624414,
            -1.3985752912209028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77056750177881,
            -1.3976743372958043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.766147221322264,
            -1.3878925296209663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75799330591699,
            -1.3900805690713327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75919493555566,
            -1.394542447154028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68654436095964,
            -1.4256881126763894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690063419187176,
            -1.4295492947602058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6904085139539,
            -1.4309221579371545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68611697953007,
            -1.4233714003164788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68736152451298,
            -1.4217840219851074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68714694779179,
            -1.422384651752446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6947858790662,
            -1.4300212165699164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693455503394816,
            -1.4293776868053443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691996381690714,
            -1.4295063927726959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69531537728304,
            -1.4327669415370918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.691410080957354,
            -1.4343114103852639
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69643117623323,
            -1.4331530588468002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.693126694726885,
            -1.4299783145912228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68956472115511,
            -1.4331101569267053
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC16": 2
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
            ee.Geometry.Point([36.73066142972841, -1.384805262067485]),
            {
              "LC16": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7297602074994, -1.3856204153196536]),
            {
              "LC16": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73315051969423, -1.3932571005619059]),
            {
              "LC16": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71740058835878, -1.3875939430839412]),
            {
              "LC16": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71834472593202, -1.3843333311091253]),
            {
              "LC16": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71564105924501, -1.3815875491255836]),
            {
              "LC16": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746411361063856, -1.3901681072580925]),
            {
              "LC16": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74250606473817, -1.3896103719250188]),
            {
              "LC16": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73332218107118, -1.3936861270895047]),
            {
              "LC16": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74100402768983, -1.3916697017305746]),
            {
              "LC16": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72143463071718, -1.3940293482553234]),
            {
              "LC16": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.705770530070204, -1.3858778320778589]),
            {
              "LC16": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69931910624556, -1.3945206725486938]),
            {
              "LC16": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6953279792314, -1.3981673935809256]),
            {
              "LC16": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69910452952437, -1.399797690563789]),
            {
              "LC16": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70052073588423, -1.3999263981720778]),
            {
              "LC16": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.696486693525834, -1.3998405931006697]),
            {
              "LC16": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67361281504683, -1.3899729889935228]),
            {
              "LC16": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.672497016096635, -1.3900158917095324]),
            {
              "LC16": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6673042594438, -1.3919465131231616]),
            {
              "LC16": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65241263499312, -1.3882568797138835]),
            {
              "LC16": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65417216410689, -1.3876133384127909]),
            {
              "LC16": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6554167090898, -1.3864978664095127]),
            {
              "LC16": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658334952498, -1.3866265747444184]),
            {
              "LC16": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65515921702437, -1.3942203540940121]),
            {
              "LC16": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64142630686812, -1.3829369330376966]),
            {
              "LC16": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64245627512984, -1.3965799980622946]),
            {
              "LC16": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64314292063765, -1.388085268717394]),
            {
              "LC16": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65267012705855, -1.4011276688419028]),
            {
              "LC16": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64717696299605, -1.4079920608358565]),
            {
              "LC16": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.652755957747026, -1.4094507415338076]),
            {
              "LC16": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72448313185034, -1.4037168911835476]),
            {
              "LC16": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69478571363745, -1.4022153044104504]),
            {
              "LC16": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70057928510962, -1.4016575719350544]),
            {
              "LC16": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748859047377685, -1.4054758916054888]),
            {
              "LC16": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749116539443115, -1.4063339401110935]),
            {
              "LC16": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7215219730979, -1.4047465501278107]),
            {
              "LC16": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72199404188452, -1.4051755745540169]),
            {
              "LC16": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.653501152480224, -1.3944928429552985]),
            {
              "LC16": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64088404127417, -1.3921760995714816]),
            {
              "LC16": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64294397779761, -1.4026443293011066]),
            {
              "LC16": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698068019093206, -1.4196791478278217]),
            {
              "LC16": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68952786558979, -1.408996482652278]),
            {
              "LC16": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69068657988422, -1.4088677755435017]),
            {
              "LC16": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72404726862451, -1.4048099857703775]),
            {
              "LC16": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73361739038965, -1.3961007731561401]),
            {
              "LC16": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.758594120736326, -1.406254836806225]),
            {
              "LC16": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75928076624414, -1.3985752912209028]),
            {
              "LC16": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77056750177881, -1.3976743372958043]),
            {
              "LC16": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.766147221322264, -1.3878925296209663]),
            {
              "LC16": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75799330591699, -1.3900805690713327]),
            {
              "LC16": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75919493555566, -1.394542447154028]),
            {
              "LC16": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68654436095964, -1.4256881126763894]),
            {
              "LC16": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690063419187176, -1.4295492947602058]),
            {
              "LC16": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6904085139539, -1.4309221579371545]),
            {
              "LC16": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68611697953007, -1.4233714003164788]),
            {
              "LC16": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68736152451298, -1.4217840219851074]),
            {
              "LC16": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68714694779179, -1.422384651752446]),
            {
              "LC16": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6947858790662, -1.4300212165699164]),
            {
              "LC16": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693455503394816, -1.4293776868053443]),
            {
              "LC16": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691996381690714, -1.4295063927726959]),
            {
              "LC16": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69531537728304, -1.4327669415370918]),
            {
              "LC16": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.691410080957354, -1.4343114103852639]),
            {
              "LC16": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69643117623323, -1.4331530588468002]),
            {
              "LC16": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.693126694726885, -1.4299783145912228]),
            {
              "LC16": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68956472115511, -1.4331101569267053]),
            {
              "LC16": 2,
              "system:index": "65"
            })]),
    NonBuilt_Up16 = ui.import && ui.import("NonBuilt_Up16", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.81833512548164,
            -1.384718648755735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81807763341621,
            -1.3885798986601348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.810953686272654,
            -1.3895237587891536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.796705791985545,
            -1.3961307691176794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79464585546211,
            -1.397503652053595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78863770726875,
            -1.4033383955685192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.786749432122264,
            -1.4023087360042261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.813185284173045,
            -1.389609564236732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81636101964668,
            -1.387121204992187
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79267174962715,
            -1.3981042880857488
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74651714896093,
            -1.3870766340911116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74533697699438,
            -1.3863258355149346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746216741551265,
            -1.388084848947202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73565032671377,
            -1.386085251473373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73477056215688,
            -1.3856562235650702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.735199715599265,
            -1.385077035765594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72757921741798,
            -1.3838749193963424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72757921741798,
            -1.3846257187492743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72539053486183,
            -1.3851620038557937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72498283909157,
            -1.3855266776589001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72341642902687,
            -1.3827379942094593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.725798230632094,
            -1.3857411916344948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72866514051915,
            -1.3805290342197234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72887971724034,
            -1.3822451490965664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658538807129695,
            -1.3470685695055813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66016959021075,
            -1.3441725826219335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65913962194903,
            -1.3460603374251716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65974043676837,
            -1.3449019426053892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65771629042603,
            -1.3340051990393567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.659626023244634,
            -1.3338979397549635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65874625868775,
            -1.3339408434692857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65795232481934,
            -1.33458439909421
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.787042358969686,
            -1.4033454222750412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78808483532488,
            -1.404266310514424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78591761044085,
            -1.4032366513586412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78512367657244,
            -1.4032581025956705
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC16": 3
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
            ee.Geometry.Point([36.81833512548164, -1.384718648755735]),
            {
              "LC16": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81807763341621, -1.3885798986601348]),
            {
              "LC16": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.810953686272654, -1.3895237587891536]),
            {
              "LC16": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.796705791985545, -1.3961307691176794]),
            {
              "LC16": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79464585546211, -1.397503652053595]),
            {
              "LC16": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78863770726875, -1.4033383955685192]),
            {
              "LC16": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.786749432122264, -1.4023087360042261]),
            {
              "LC16": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.813185284173045, -1.389609564236732]),
            {
              "LC16": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81636101964668, -1.387121204992187]),
            {
              "LC16": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79267174962715, -1.3981042880857488]),
            {
              "LC16": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74651714896093, -1.3870766340911116]),
            {
              "LC16": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74533697699438, -1.3863258355149346]),
            {
              "LC16": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746216741551265, -1.388084848947202]),
            {
              "LC16": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73565032671377, -1.386085251473373]),
            {
              "LC16": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73477056215688, -1.3856562235650702]),
            {
              "LC16": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.735199715599265, -1.385077035765594]),
            {
              "LC16": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72757921741798, -1.3838749193963424]),
            {
              "LC16": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72757921741798, -1.3846257187492743]),
            {
              "LC16": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72539053486183, -1.3851620038557937]),
            {
              "LC16": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72498283909157, -1.3855266776589001]),
            {
              "LC16": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72341642902687, -1.3827379942094593]),
            {
              "LC16": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.725798230632094, -1.3857411916344948]),
            {
              "LC16": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72866514051915, -1.3805290342197234]),
            {
              "LC16": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72887971724034, -1.3822451490965664]),
            {
              "LC16": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658538807129695, -1.3470685695055813]),
            {
              "LC16": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66016959021075, -1.3441725826219335]),
            {
              "LC16": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65913962194903, -1.3460603374251716]),
            {
              "LC16": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65974043676837, -1.3449019426053892]),
            {
              "LC16": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65771629042603, -1.3340051990393567]),
            {
              "LC16": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.659626023244634, -1.3338979397549635]),
            {
              "LC16": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65874625868775, -1.3339408434692857]),
            {
              "LC16": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65795232481934, -1.33458439909421]),
            {
              "LC16": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.787042358969686, -1.4033454222750412]),
            {
              "LC16": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78808483532488, -1.404266310514424]),
            {
              "LC16": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78591761044085, -1.4032366513586412]),
            {
              "LC16": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78512367657244, -1.4032581025956705]),
            {
              "LC16": 3,
              "system:index": "35"
            })]),
    Water16 = ui.import && ui.import("Water16", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69578461368381,
            -1.4387187073279004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694497153356664,
            -1.4407779935285479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.694754645422094,
            -1.442150849961601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69415383060276,
            -1.4434379021154842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692265555456274,
            -1.442150849961601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69389633853733,
            -1.4451539705206446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69406799991428,
            -1.4472990542034638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69355301578342,
            -1.4496157423017981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692265555456274,
            -1.4508169870494152
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78965479741553,
            -1.2308898114894475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79014832387427,
            -1.2311043386879057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79044873128394,
            -1.2314046767367255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7909637154148,
            -1.2315548457484575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77448909579629,
            -1.2267130802945838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77496116458291,
            -1.2270777770920192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77551906405801,
            -1.2274639265880503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7758409291398,
            -1.2280646034710319
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC16": 4
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
            ee.Geometry.Point([36.69578461368381, -1.4387187073279004]),
            {
              "LC16": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694497153356664, -1.4407779935285479]),
            {
              "LC16": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.694754645422094, -1.442150849961601]),
            {
              "LC16": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69415383060276, -1.4434379021154842]),
            {
              "LC16": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692265555456274, -1.442150849961601]),
            {
              "LC16": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69389633853733, -1.4451539705206446]),
            {
              "LC16": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69406799991428, -1.4472990542034638]),
            {
              "LC16": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69355301578342, -1.4496157423017981]),
            {
              "LC16": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692265555456274, -1.4508169870494152]),
            {
              "LC16": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78965479741553, -1.2308898114894475]),
            {
              "LC16": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79014832387427, -1.2311043386879057]),
            {
              "LC16": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79044873128394, -1.2314046767367255]),
            {
              "LC16": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7909637154148, -1.2315548457484575]),
            {
              "LC16": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77448909579629, -1.2267130802945838]),
            {
              "LC16": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77496116458291, -1.2270777770920192]),
            {
              "LC16": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77551906405801, -1.2274639265880503]),
            {
              "LC16": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7758409291398, -1.2280646034710319]),
            {
              "LC16": 4,
              "system:index": "16"
            })]),
    BuiltUp18 = ui.import && ui.import("BuiltUp18", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.74815029144287,
            -1.3922775312619395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.749223175048826,
            -1.3926636553008238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746519508361814,
            -1.3931784872542587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74995273590088,
            -1.3900036884173352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74879402160644,
            -1.390861742578386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74239963531494,
            -1.3914623803055082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750210227966306,
            -1.3867001769878757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.754759254455564,
            -1.3950662034539978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746219100952146,
            -1.3947658850689322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75956577301025,
            -1.3867001769878757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7712816619873,
            -1.3924062392819194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.757977905273435,
            -1.3990990466219462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.760724487304685,
            -1.398198092897897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76102489471435,
            -1.399742584784442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75905078887939,
            -1.4048479812749664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74244255065918,
            -1.3989274364154682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72237038029228,
            -1.4000122070915497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72837852848564,
            -1.4027365163750813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73322796238457,
            -1.4040664929836963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730567211041794,
            -1.4051819566526362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73674402776821,
            -1.3957893941275092
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.748631578122215,
            -1.3932581387459702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75639925542934,
            -1.392185572085649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75219355169399,
            -1.394116191722646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.750605683957176,
            -1.3932152360889407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74974737707241,
            -1.3939445811523252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65808020177944,
            -1.360823508768653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657994371090965,
            -1.3621535088564662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6591530853854,
            -1.3616815734254324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65614901128872,
            -1.359922540550498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65584860387905,
            -1.3609093152480671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65430365148647,
            -1.361938992762902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65486155096157,
            -1.3624538313553631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.655977349911765,
            -1.3581206031054305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6666632706271,
            -1.3409163234367902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66627703252895,
            -1.3433618269579704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66086969915493,
            -1.3487247647004672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66305838171108,
            -1.3464079770429473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65164831419838,
            -1.3727443757510116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.649845869740375,
            -1.3711998662625389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.649373800953754,
            -1.3721437332906514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6581714465226,
            -1.3695695496102094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683019430836566,
            -1.3884468320548118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68173197050942,
            -1.3906777736957983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.683062346180805,
            -1.391750341041987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68400648375405,
            -1.3931661291919708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65721942868564,
            -1.3986700255397115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.663184661534764,
            -1.398712928097215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6587429234061,
            -1.399957101923531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69500638928745,
            -1.3949804026625479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68595125165317,
            -1.397533107480108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68683101621006,
            -1.398777281932001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70841743436191,
            -1.3972327894101972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7137818523917,
            -1.404976693063013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71854545560215,
            -1.403775424368885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.713095206883885,
            -1.4058990953910502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70545627560947,
            -1.4058347417520847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70916845288608,
            -1.4081943740203786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71097089734409,
            -1.4094814451600997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71227981534336,
            -1.4105111015597027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71974708524082,
            -1.4137287748703535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.713631648686864,
            -1.415616474470994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71863128629062,
            -1.4108757714253333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71914627042148,
            -1.4114549528591074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76532318082187,
            -1.3954348005177144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7632203289542,
            -1.3962928527007017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77015115704868,
            -1.3976013816766577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.764743921280655,
            -1.3972868991864795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76661395720357,
            -1.3913938097007272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77081966093892,
            -1.3955124643971695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7887286425648,
            -1.40087528522025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78340713987925,
            -1.4057661671097679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75941746245005,
            -1.390364144902157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.752379345994974,
            -1.3875325643913132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79313369041637,
            -1.3127808187458618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79708190208629,
            -1.3120085451870669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79660983329967,
            -1.3147544056453884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79476447349742,
            -1.3168996070273433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78210444694713,
            -1.3078039405215676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78918547874645,
            -1.3092626817148771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7833060765858,
            -1.3141966529840168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78017325645641,
            -1.3149260218238286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77330680137828,
            -1.3105069014737207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.789442970811876,
            -1.3109788467378465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79510779625133,
            -1.3112791754959605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79330535179332,
            -1.3105069014737207
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.784722282945665,
            -1.3081471738198411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77386470085338,
            -1.3121801615540758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.730528025935236,
            -1.3954397608632654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72537818462664,
            -1.3985716498092675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74121394665057,
            -1.3959545922095578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74859538585955,
            -1.396469423443106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76146998913104,
            -1.3962120078404219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72340548743476,
            -1.4000909098988863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70950091590156,
            -1.4173805662353938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70799887885322,
            -1.4188821432219243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70422232856025,
            -1.4202121105960406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74438975195805,
            -1.4130030118270507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.75589106421391,
            -1.4110724077722019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.733124474095504,
            -1.4155985991937539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73396132330815,
            -1.4182156347538608
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC18": 0
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
            ee.Geometry.Point([36.74815029144287, -1.3922775312619395]),
            {
              "LC18": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.749223175048826, -1.3926636553008238]),
            {
              "LC18": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746519508361814, -1.3931784872542587]),
            {
              "LC18": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74995273590088, -1.3900036884173352]),
            {
              "LC18": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74879402160644, -1.390861742578386]),
            {
              "LC18": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74239963531494, -1.3914623803055082]),
            {
              "LC18": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750210227966306, -1.3867001769878757]),
            {
              "LC18": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.754759254455564, -1.3950662034539978]),
            {
              "LC18": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746219100952146, -1.3947658850689322]),
            {
              "LC18": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75956577301025, -1.3867001769878757]),
            {
              "LC18": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7712816619873, -1.3924062392819194]),
            {
              "LC18": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.757977905273435, -1.3990990466219462]),
            {
              "LC18": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.760724487304685, -1.398198092897897]),
            {
              "LC18": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76102489471435, -1.399742584784442]),
            {
              "LC18": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75905078887939, -1.4048479812749664]),
            {
              "LC18": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74244255065918, -1.3989274364154682]),
            {
              "LC18": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72237038029228, -1.4000122070915497]),
            {
              "LC18": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72837852848564, -1.4027365163750813]),
            {
              "LC18": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73322796238457, -1.4040664929836963]),
            {
              "LC18": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730567211041794, -1.4051819566526362]),
            {
              "LC18": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73674402776821, -1.3957893941275092]),
            {
              "LC18": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.748631578122215, -1.3932581387459702]),
            {
              "LC18": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75639925542934, -1.392185572085649]),
            {
              "LC18": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75219355169399, -1.394116191722646]),
            {
              "LC18": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.750605683957176, -1.3932152360889407]),
            {
              "LC18": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74974737707241, -1.3939445811523252]),
            {
              "LC18": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65808020177944, -1.360823508768653]),
            {
              "LC18": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657994371090965, -1.3621535088564662]),
            {
              "LC18": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6591530853854, -1.3616815734254324]),
            {
              "LC18": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65614901128872, -1.359922540550498]),
            {
              "LC18": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65584860387905, -1.3609093152480671]),
            {
              "LC18": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65430365148647, -1.361938992762902]),
            {
              "LC18": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65486155096157, -1.3624538313553631]),
            {
              "LC18": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.655977349911765, -1.3581206031054305]),
            {
              "LC18": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6666632706271, -1.3409163234367902]),
            {
              "LC18": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66627703252895, -1.3433618269579704]),
            {
              "LC18": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66086969915493, -1.3487247647004672]),
            {
              "LC18": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66305838171108, -1.3464079770429473]),
            {
              "LC18": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65164831419838, -1.3727443757510116]),
            {
              "LC18": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.649845869740375, -1.3711998662625389]),
            {
              "LC18": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.649373800953754, -1.3721437332906514]),
            {
              "LC18": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6581714465226, -1.3695695496102094]),
            {
              "LC18": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683019430836566, -1.3884468320548118]),
            {
              "LC18": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68173197050942, -1.3906777736957983]),
            {
              "LC18": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.683062346180805, -1.391750341041987]),
            {
              "LC18": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68400648375405, -1.3931661291919708]),
            {
              "LC18": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65721942868564, -1.3986700255397115]),
            {
              "LC18": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.663184661534764, -1.398712928097215]),
            {
              "LC18": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6587429234061, -1.399957101923531]),
            {
              "LC18": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69500638928745, -1.3949804026625479]),
            {
              "LC18": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68595125165317, -1.397533107480108]),
            {
              "LC18": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68683101621006, -1.398777281932001]),
            {
              "LC18": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70841743436191, -1.3972327894101972]),
            {
              "LC18": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7137818523917, -1.404976693063013]),
            {
              "LC18": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71854545560215, -1.403775424368885]),
            {
              "LC18": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.713095206883885, -1.4058990953910502]),
            {
              "LC18": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70545627560947, -1.4058347417520847]),
            {
              "LC18": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70916845288608, -1.4081943740203786]),
            {
              "LC18": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71097089734409, -1.4094814451600997]),
            {
              "LC18": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71227981534336, -1.4105111015597027]),
            {
              "LC18": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71974708524082, -1.4137287748703535]),
            {
              "LC18": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.713631648686864, -1.415616474470994]),
            {
              "LC18": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71863128629062, -1.4108757714253333]),
            {
              "LC18": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71914627042148, -1.4114549528591074]),
            {
              "LC18": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76532318082187, -1.3954348005177144]),
            {
              "LC18": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7632203289542, -1.3962928527007017]),
            {
              "LC18": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77015115704868, -1.3976013816766577]),
            {
              "LC18": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.764743921280655, -1.3972868991864795]),
            {
              "LC18": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76661395720357, -1.3913938097007272]),
            {
              "LC18": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77081966093892, -1.3955124643971695]),
            {
              "LC18": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7887286425648, -1.40087528522025]),
            {
              "LC18": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78340713987925, -1.4057661671097679]),
            {
              "LC18": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75941746245005, -1.390364144902157]),
            {
              "LC18": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.752379345994974, -1.3875325643913132]),
            {
              "LC18": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79313369041637, -1.3127808187458618]),
            {
              "LC18": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79708190208629, -1.3120085451870669]),
            {
              "LC18": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79660983329967, -1.3147544056453884]),
            {
              "LC18": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79476447349742, -1.3168996070273433]),
            {
              "LC18": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78210444694713, -1.3078039405215676]),
            {
              "LC18": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78918547874645, -1.3092626817148771]),
            {
              "LC18": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7833060765858, -1.3141966529840168]),
            {
              "LC18": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78017325645641, -1.3149260218238286]),
            {
              "LC18": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77330680137828, -1.3105069014737207]),
            {
              "LC18": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([36.789442970811876, -1.3109788467378465]),
            {
              "LC18": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79510779625133, -1.3112791754959605]),
            {
              "LC18": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79330535179332, -1.3105069014737207]),
            {
              "LC18": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([36.784722282945665, -1.3081471738198411]),
            {
              "LC18": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77386470085338, -1.3121801615540758]),
            {
              "LC18": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([36.730528025935236, -1.3954397608632654]),
            {
              "LC18": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72537818462664, -1.3985716498092675]),
            {
              "LC18": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74121394665057, -1.3959545922095578]),
            {
              "LC18": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74859538585955, -1.396469423443106]),
            {
              "LC18": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76146998913104, -1.3962120078404219]),
            {
              "LC18": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72340548743476, -1.4000909098988863]),
            {
              "LC18": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70950091590156, -1.4173805662353938]),
            {
              "LC18": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70799887885322, -1.4188821432219243]),
            {
              "LC18": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70422232856025, -1.4202121105960406]),
            {
              "LC18": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74438975195805, -1.4130030118270507]),
            {
              "LC18": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([36.75589106421391, -1.4110724077722019]),
            {
              "LC18": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([36.733124474095504, -1.4155985991937539]),
            {
              "LC18": 0,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73396132330815, -1.4182156347538608]),
            {
              "LC18": 0,
              "system:index": "100"
            })]),
    ForestedAreas18 = ui.import && ui.import("ForestedAreas18", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.69840234973034,
            -1.358642371461565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.701663915892446,
            -1.3636191467206937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69728655078014,
            -1.3671372057841968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69162172534069,
            -1.3675662370248942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69411081530651,
            -1.3688533302867087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69402498461803,
            -1.3712559025263888
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70930284716686,
            -1.368939136479593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70689958788952,
            -1.37134170863322
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.703208868285024,
            -1.3553817200406701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710933630247915,
            -1.36018688902025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7142810270985,
            -1.3631901147755419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7102469847401,
            -1.3622462442271404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69960397936901,
            -1.3595862434203898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64122064845063,
            -1.4017143000770758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64976290025134,
            -1.331053687728066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64976290025134,
            -1.3341427568160882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64950540818591,
            -1.3352582530340105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74211672105212,
            -1.3203277234061852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73971346177478,
            -1.3205851470934324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73645189561267,
            -1.3189547966240969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66890314378161,
            -1.298715174530041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79858157953127,
            -1.2405402292919727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79669330438479,
            -1.242256440156442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.802272299135765,
            -1.242256440156442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80373142083987,
            -1.245774668941938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73765128651674,
            -1.320811963334679
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC18": 1
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
            ee.Geometry.Point([36.69840234973034, -1.358642371461565]),
            {
              "LC18": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.701663915892446, -1.3636191467206937]),
            {
              "LC18": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69728655078014, -1.3671372057841968]),
            {
              "LC18": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69162172534069, -1.3675662370248942]),
            {
              "LC18": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69411081530651, -1.3688533302867087]),
            {
              "LC18": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69402498461803, -1.3712559025263888]),
            {
              "LC18": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70930284716686, -1.368939136479593]),
            {
              "LC18": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70689958788952, -1.37134170863322]),
            {
              "LC18": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.703208868285024, -1.3553817200406701]),
            {
              "LC18": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710933630247915, -1.36018688902025]),
            {
              "LC18": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7142810270985, -1.3631901147755419]),
            {
              "LC18": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7102469847401, -1.3622462442271404]),
            {
              "LC18": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69960397936901, -1.3595862434203898]),
            {
              "LC18": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64122064845063, -1.4017143000770758]),
            {
              "LC18": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64976290025134, -1.331053687728066]),
            {
              "LC18": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64976290025134, -1.3341427568160882]),
            {
              "LC18": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64950540818591, -1.3352582530340105]),
            {
              "LC18": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74211672105212, -1.3203277234061852]),
            {
              "LC18": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73971346177478, -1.3205851470934324]),
            {
              "LC18": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73645189561267, -1.3189547966240969]),
            {
              "LC18": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66890314378161, -1.298715174530041]),
            {
              "LC18": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79858157953127, -1.2405402292919727]),
            {
              "LC18": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79669330438479, -1.242256440156442]),
            {
              "LC18": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.802272299135765, -1.242256440156442]),
            {
              "LC18": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80373142083987, -1.245774668941938]),
            {
              "LC18": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73765128651674, -1.320811963334679]),
            {
              "LC18": 1,
              "system:index": "25"
            })]),
    Vegetation18 = ui.import && ui.import("Vegetation18", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.64469665089662,
            -1.401555843147304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6462416032892,
            -1.4024138930917027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64976066151674,
            -1.4024138930917027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64598411122377,
            -1.4077337957179579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6422075609308,
            -1.4048164312618154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69095939198549,
            -1.4095356954706535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68795531788881,
            -1.4157136268830999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68658202687318,
            -1.4260530446705126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68984359303529,
            -1.429613912259667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68997233906801,
            -1.4306435596903857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69370597401674,
            -1.4157565291271024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.734218058977675,
            -1.4235218221900559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69537135120481,
            -1.3979635578866705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69562884327024,
            -1.3981351681636423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74118716884323,
            -1.4046260158198995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.741144253498994,
            -1.4052266500255242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74908359218308,
            -1.4054840646377964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74916942287155,
            -1.4065995276296852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74032886195847,
            -1.4045402109207885
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7394705550737,
            -1.4059559913532582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73870013472822,
            -1.4021376724669068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.733550293419626,
            -1.3959168025220465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.76472153808704,
            -1.3898528265734689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.758284236451296,
            -1.3902818537203978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.785492564698366,
            -1.3941694271507317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.72343824683355,
            -1.3813413250972548
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.720133765327205,
            -1.3846448440006107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.71755884467291,
            -1.3865754698003265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66060821715264,
            -1.3727408585542094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66215316954522,
            -1.372569246437821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67893306914239,
            -1.37312698577104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68159382048516,
            -1.37209731305425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66846172514825,
            -1.3710247368362858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67859085038445,
            -1.3621459946922054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67837627366326,
            -1.3625535752186293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64998777344964,
            -1.343418668058498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65045984223626,
            -1.3429038254271777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.667540149243095,
            -1.3442981906360132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67612321809075,
            -1.3424533380357995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67582281068108,
            -1.342281723769636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.648579514091075,
            -1.3805849949319777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.648322022025646,
            -1.3814859553756613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65218440300709,
            -1.3888223348219924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65617553002125,
            -1.3873207385394437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.64025393730885,
            -1.3841459318341716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63944994010156,
            -1.3983782348909484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68145813635203,
            -1.3882192466930787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68068566015574,
            -1.3878331219272853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68712296179148,
            -1.3874469970984658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6665584668034,
            -1.3584448990164737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657739363562435,
            -1.3568574770336177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.687596740722654,
            -1.4317905601980085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690343322753904,
            -1.4323053834825616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69484943389892,
            -1.4288732260694978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6920170211792,
            -1.4347936943932351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70373291015625,
            -1.4300744817480455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.70115798950195,
            -1.425441063528146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69085830688476,
            -1.429216442041789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69843471318777,
            -1.4362523581517173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6952160623699,
            -1.4329489124255839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69358527928885,
            -1.4281009899443813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.688607099357206,
            -1.4329489124255839
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69957946452914,
            -1.4205302798049189
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69642831183207,
            -1.4176558336257132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.710332883365275,
            -1.413837533929633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.717727905819274,
            -1.4099763256032507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7060978475307,
            -1.4188141929634694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69639897973285,
            -1.412207246751949
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC18": 2
      },
      "color": "#00ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.64469665089662, -1.401555843147304]),
            {
              "LC18": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6462416032892, -1.4024138930917027]),
            {
              "LC18": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64976066151674, -1.4024138930917027]),
            {
              "LC18": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64598411122377, -1.4077337957179579]),
            {
              "LC18": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6422075609308, -1.4048164312618154]),
            {
              "LC18": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69095939198549, -1.4095356954706535]),
            {
              "LC18": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68795531788881, -1.4157136268830999]),
            {
              "LC18": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68658202687318, -1.4260530446705126]),
            {
              "LC18": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68984359303529, -1.429613912259667]),
            {
              "LC18": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68997233906801, -1.4306435596903857]),
            {
              "LC18": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69370597401674, -1.4157565291271024]),
            {
              "LC18": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.734218058977675, -1.4235218221900559]),
            {
              "LC18": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69537135120481, -1.3979635578866705]),
            {
              "LC18": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69562884327024, -1.3981351681636423]),
            {
              "LC18": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74118716884323, -1.4046260158198995]),
            {
              "LC18": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.741144253498994, -1.4052266500255242]),
            {
              "LC18": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74908359218308, -1.4054840646377964]),
            {
              "LC18": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74916942287155, -1.4065995276296852]),
            {
              "LC18": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74032886195847, -1.4045402109207885]),
            {
              "LC18": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7394705550737, -1.4059559913532582]),
            {
              "LC18": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73870013472822, -1.4021376724669068]),
            {
              "LC18": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.733550293419626, -1.3959168025220465]),
            {
              "LC18": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.76472153808704, -1.3898528265734689]),
            {
              "LC18": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.758284236451296, -1.3902818537203978]),
            {
              "LC18": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.785492564698366, -1.3941694271507317]),
            {
              "LC18": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.72343824683355, -1.3813413250972548]),
            {
              "LC18": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.720133765327205, -1.3846448440006107]),
            {
              "LC18": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.71755884467291, -1.3865754698003265]),
            {
              "LC18": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66060821715264, -1.3727408585542094]),
            {
              "LC18": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66215316954522, -1.372569246437821]),
            {
              "LC18": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67893306914239, -1.37312698577104]),
            {
              "LC18": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68159382048516, -1.37209731305425]),
            {
              "LC18": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66846172514825, -1.3710247368362858]),
            {
              "LC18": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67859085038445, -1.3621459946922054]),
            {
              "LC18": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67837627366326, -1.3625535752186293]),
            {
              "LC18": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64998777344964, -1.343418668058498]),
            {
              "LC18": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65045984223626, -1.3429038254271777]),
            {
              "LC18": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.667540149243095, -1.3442981906360132]),
            {
              "LC18": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67612321809075, -1.3424533380357995]),
            {
              "LC18": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67582281068108, -1.342281723769636]),
            {
              "LC18": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.648579514091075, -1.3805849949319777]),
            {
              "LC18": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.648322022025646, -1.3814859553756613]),
            {
              "LC18": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65218440300709, -1.3888223348219924]),
            {
              "LC18": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65617553002125, -1.3873207385394437]),
            {
              "LC18": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.64025393730885, -1.3841459318341716]),
            {
              "LC18": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63944994010156, -1.3983782348909484]),
            {
              "LC18": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68145813635203, -1.3882192466930787]),
            {
              "LC18": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68068566015574, -1.3878331219272853]),
            {
              "LC18": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68712296179148, -1.3874469970984658]),
            {
              "LC18": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6665584668034, -1.3584448990164737]),
            {
              "LC18": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657739363562435, -1.3568574770336177]),
            {
              "LC18": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.687596740722654, -1.4317905601980085]),
            {
              "LC18": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690343322753904, -1.4323053834825616]),
            {
              "LC18": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69484943389892, -1.4288732260694978]),
            {
              "LC18": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6920170211792, -1.4347936943932351]),
            {
              "LC18": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70373291015625, -1.4300744817480455]),
            {
              "LC18": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.70115798950195, -1.425441063528146]),
            {
              "LC18": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69085830688476, -1.429216442041789]),
            {
              "LC18": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69843471318777, -1.4362523581517173]),
            {
              "LC18": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6952160623699, -1.4329489124255839]),
            {
              "LC18": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69358527928885, -1.4281009899443813]),
            {
              "LC18": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.688607099357206, -1.4329489124255839]),
            {
              "LC18": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69957946452914, -1.4205302798049189]),
            {
              "LC18": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69642831183207, -1.4176558336257132]),
            {
              "LC18": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.710332883365275, -1.413837533929633]),
            {
              "LC18": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.717727905819274, -1.4099763256032507]),
            {
              "LC18": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7060978475307, -1.4188141929634694]),
            {
              "LC18": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69639897973285, -1.412207246751949]),
            {
              "LC18": 2,
              "system:index": "67"
            })]),
    NonBuilt_Up18 = ui.import && ui.import("NonBuilt_Up18", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.817934137730674,
            -1.384284830205007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.817419153599815,
            -1.3884893027886986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81879244461544,
            -1.3890041356528282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81312761917599,
            -1.3890041356528282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80926523819454,
            -1.3896905792971697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.816131693272666,
            -1.3863441646483714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.81630335464962,
            -1.3900338010445337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.783983705781154,
            -1.3996054804757394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78484201266592,
            -1.4006351412285551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78149461581533,
            -1.4027802663433915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7797780020458,
            -1.4038957306260638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77608728244131,
            -1.4020080215284525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77874803378408,
            -1.4001203109086784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78226709201162,
            -1.3972887421294249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.78733110263174,
            -1.3973745472941377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79102182223623,
            -1.3946287804697686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79531335666006,
            -1.3969455214392519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.791450975678615,
            -1.396859716258878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.79805993869131,
            -1.3945429752048555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80252313449209,
            -1.39128237282188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.80072069003408,
            -1.3901669025504904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77883386447256,
            -1.4036383158388228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74628257586782,
            -1.3870350024342655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.746239660523585,
            -1.388064668683741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74568176104849,
            -1.3864772663620437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.74570321872061,
            -1.388429342039585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.739501951478175,
            -1.3849971199949402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.7389655096752,
            -1.385855175972622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73411607577627,
            -1.3838601953460163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.732013223908595,
            -1.383516972703377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68815374209707,
            -1.3970742292039475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68823957278555,
            -1.3977177679216157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.698324678681544,
            -1.399734188094575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.696307657502345,
            -1.399734188094575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63798618227213,
            -1.3884020109225534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.63764285951822,
            -1.3859136504075167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66197585970133,
            -1.3902468282345766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.661847113668614,
            -1.3908045634172992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.692999257537366,
            -1.357943610055184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69209803530836,
            -1.3596168378499576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.690510167571546,
            -1.3586729659030916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.68557490298414,
            -1.3587158691814105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.686089887115,
            -1.3604319996889114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66248644778395,
            -1.355884251179333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65061825073706,
            -1.337898016206353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65439480103003,
            -1.337468979720463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65538185394751,
            -1.334422818515249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6561543301438,
            -1.3374260760677545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.655038531193604,
            -1.342059666222041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66139000214087,
            -1.3361389661376581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.6601883725022,
            -1.3373831724142828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.664522822270264,
            -1.332191824816241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.666496928105225,
            -1.3308189046124939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67134636200415,
            -1.3317198835824504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.67138927734839,
            -1.3334789368124258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66709774292456,
            -1.3320631135796264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66636818207251,
            -1.3336934554130433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65134781158911,
            -1.3282446771711942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65220611847388,
            -1.3318056910862321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.646885842115445,
            -1.326786280248782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.56912323835568,
            -1.3480664920559602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.571698159009976,
            -1.350125857568471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.57238480451779,
            -1.3530432890576152
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.571698159009976,
            -1.3204365040356176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.583714455396695,
            -1.3182054977275677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.59864899519162,
            -1.325584972483181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.658585968017576,
            -1.3335859522068736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65965885162353,
            -1.334572737571934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.661632957458494,
            -1.3337575670814008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65931552886963,
            -1.3356882335947737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65789932250976,
            -1.3353021004133852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65875762939453,
            -1.3343582190479808
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65828556060791,
            -1.3339720856577189
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.65579647064209,
            -1.3328136851234462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.657341423034666,
            -1.3338433745141798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.66004508972168,
            -1.3357311372778502
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC18": 3
      },
      "color": "#0000ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0000ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.817934137730674, -1.384284830205007]),
            {
              "LC18": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.817419153599815, -1.3884893027886986]),
            {
              "LC18": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81879244461544, -1.3890041356528282]),
            {
              "LC18": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81312761917599, -1.3890041356528282]),
            {
              "LC18": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80926523819454, -1.3896905792971697]),
            {
              "LC18": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.816131693272666, -1.3863441646483714]),
            {
              "LC18": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.81630335464962, -1.3900338010445337]),
            {
              "LC18": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.783983705781154, -1.3996054804757394]),
            {
              "LC18": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78484201266592, -1.4006351412285551]),
            {
              "LC18": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78149461581533, -1.4027802663433915]),
            {
              "LC18": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7797780020458, -1.4038957306260638]),
            {
              "LC18": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77608728244131, -1.4020080215284525]),
            {
              "LC18": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77874803378408, -1.4001203109086784]),
            {
              "LC18": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78226709201162, -1.3972887421294249]),
            {
              "LC18": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.78733110263174, -1.3973745472941377]),
            {
              "LC18": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79102182223623, -1.3946287804697686]),
            {
              "LC18": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79531335666006, -1.3969455214392519]),
            {
              "LC18": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.791450975678615, -1.396859716258878]),
            {
              "LC18": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.79805993869131, -1.3945429752048555]),
            {
              "LC18": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80252313449209, -1.39128237282188]),
            {
              "LC18": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.80072069003408, -1.3901669025504904]),
            {
              "LC18": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77883386447256, -1.4036383158388228]),
            {
              "LC18": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74628257586782, -1.3870350024342655]),
            {
              "LC18": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.746239660523585, -1.388064668683741]),
            {
              "LC18": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74568176104849, -1.3864772663620437]),
            {
              "LC18": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.74570321872061, -1.388429342039585]),
            {
              "LC18": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.739501951478175, -1.3849971199949402]),
            {
              "LC18": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.7389655096752, -1.385855175972622]),
            {
              "LC18": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73411607577627, -1.3838601953460163]),
            {
              "LC18": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.732013223908595, -1.383516972703377]),
            {
              "LC18": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68815374209707, -1.3970742292039475]),
            {
              "LC18": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68823957278555, -1.3977177679216157]),
            {
              "LC18": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([36.698324678681544, -1.399734188094575]),
            {
              "LC18": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([36.696307657502345, -1.399734188094575]),
            {
              "LC18": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63798618227213, -1.3884020109225534]),
            {
              "LC18": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([36.63764285951822, -1.3859136504075167]),
            {
              "LC18": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66197585970133, -1.3902468282345766]),
            {
              "LC18": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([36.661847113668614, -1.3908045634172992]),
            {
              "LC18": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([36.692999257537366, -1.357943610055184]),
            {
              "LC18": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69209803530836, -1.3596168378499576]),
            {
              "LC18": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([36.690510167571546, -1.3586729659030916]),
            {
              "LC18": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([36.68557490298414, -1.3587158691814105]),
            {
              "LC18": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([36.686089887115, -1.3604319996889114]),
            {
              "LC18": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66248644778395, -1.355884251179333]),
            {
              "LC18": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65061825073706, -1.337898016206353]),
            {
              "LC18": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65439480103003, -1.337468979720463]),
            {
              "LC18": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65538185394751, -1.334422818515249]),
            {
              "LC18": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6561543301438, -1.3374260760677545]),
            {
              "LC18": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([36.655038531193604, -1.342059666222041]),
            {
              "LC18": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66139000214087, -1.3361389661376581]),
            {
              "LC18": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([36.6601883725022, -1.3373831724142828]),
            {
              "LC18": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([36.664522822270264, -1.332191824816241]),
            {
              "LC18": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([36.666496928105225, -1.3308189046124939]),
            {
              "LC18": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67134636200415, -1.3317198835824504]),
            {
              "LC18": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([36.67138927734839, -1.3334789368124258]),
            {
              "LC18": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66709774292456, -1.3320631135796264]),
            {
              "LC18": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66636818207251, -1.3336934554130433]),
            {
              "LC18": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65134781158911, -1.3282446771711942]),
            {
              "LC18": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65220611847388, -1.3318056910862321]),
            {
              "LC18": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([36.646885842115445, -1.326786280248782]),
            {
              "LC18": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([36.56912323835568, -1.3480664920559602]),
            {
              "LC18": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([36.571698159009976, -1.350125857568471]),
            {
              "LC18": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([36.57238480451779, -1.3530432890576152]),
            {
              "LC18": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([36.571698159009976, -1.3204365040356176]),
            {
              "LC18": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([36.583714455396695, -1.3182054977275677]),
            {
              "LC18": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([36.59864899519162, -1.325584972483181]),
            {
              "LC18": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([36.658585968017576, -1.3335859522068736]),
            {
              "LC18": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65965885162353, -1.334572737571934]),
            {
              "LC18": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([36.661632957458494, -1.3337575670814008]),
            {
              "LC18": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65931552886963, -1.3356882335947737]),
            {
              "LC18": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65789932250976, -1.3353021004133852]),
            {
              "LC18": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65875762939453, -1.3343582190479808]),
            {
              "LC18": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65828556060791, -1.3339720856577189]),
            {
              "LC18": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([36.65579647064209, -1.3328136851234462]),
            {
              "LC18": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([36.657341423034666, -1.3338433745141798]),
            {
              "LC18": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([36.66004508972168, -1.3357311372778502]),
            {
              "LC18": 3,
              "system:index": "75"
            })]),
    Water18 = ui.import && ui.import("Water18", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            36.6951607218421,
            -1.4387234190518456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69550404459601,
            -1.4390666335470743
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69550404459601,
            -1.4401820802998015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69468865305548,
            -1.4404823927938057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69438824564581,
            -1.4415549370920793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69537529856329,
            -1.4407398034714518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.69494614512091,
            -1.4416836423739323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.695074891153624,
            -1.4423271686740151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73260176854906,
            -1.299615832840444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.73204386907396,
            -1.2994227634616689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.732451564844226,
            -1.2999161629558786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77003659333084,
            -1.3072778507025955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.770776883018954,
            -1.3078034267816456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.77104510392044,
            -1.308146660079983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.39871656320485,
            -0.7369269530838962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.417599314669694,
            -0.7513452925930969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.3959699811736,
            -0.752375172176662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.384640330294694,
            -0.7712562544517737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.3794904889861,
            -0.8007792326320058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.402836436251725,
            -0.7836147358051989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.387386912325944,
            -0.7877342215158994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.380863780001725,
            -0.8110778963283962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.407299632052506,
            -0.7489422392879311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.40798627756032,
            -0.7328074188979292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60617365016253,
            -0.7017447299430957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.605572835343196,
            -0.7040619841436757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.604113713639094,
            -0.7060359405174258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60291208400042,
            -0.7068083580008746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.60754694117816,
            -0.7040619841436757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            36.605830327408626,
            -0.7055209954571435
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "LC18": 4
      },
      "color": "#999900",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #999900 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([36.6951607218421, -1.4387234190518456]),
            {
              "LC18": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69550404459601, -1.4390666335470743]),
            {
              "LC18": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69550404459601, -1.4401820802998015]),
            {
              "LC18": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69468865305548, -1.4404823927938057]),
            {
              "LC18": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69438824564581, -1.4415549370920793]),
            {
              "LC18": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69537529856329, -1.4407398034714518]),
            {
              "LC18": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([36.69494614512091, -1.4416836423739323]),
            {
              "LC18": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([36.695074891153624, -1.4423271686740151]),
            {
              "LC18": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73260176854906, -1.299615832840444]),
            {
              "LC18": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([36.73204386907396, -1.2994227634616689]),
            {
              "LC18": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([36.732451564844226, -1.2999161629558786]),
            {
              "LC18": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77003659333084, -1.3072778507025955]),
            {
              "LC18": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([36.770776883018954, -1.3078034267816456]),
            {
              "LC18": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([36.77104510392044, -1.308146660079983]),
            {
              "LC18": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([36.39871656320485, -0.7369269530838962]),
            {
              "LC18": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([36.417599314669694, -0.7513452925930969]),
            {
              "LC18": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([36.3959699811736, -0.752375172176662]),
            {
              "LC18": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([36.384640330294694, -0.7712562544517737]),
            {
              "LC18": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([36.3794904889861, -0.8007792326320058]),
            {
              "LC18": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([36.402836436251725, -0.7836147358051989]),
            {
              "LC18": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([36.387386912325944, -0.7877342215158994]),
            {
              "LC18": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([36.380863780001725, -0.8110778963283962]),
            {
              "LC18": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([36.407299632052506, -0.7489422392879311]),
            {
              "LC18": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([36.40798627756032, -0.7328074188979292]),
            {
              "LC18": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60617365016253, -0.7017447299430957]),
            {
              "LC18": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([36.605572835343196, -0.7040619841436757]),
            {
              "LC18": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([36.604113713639094, -0.7060359405174258]),
            {
              "LC18": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60291208400042, -0.7068083580008746]),
            {
              "LC18": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([36.60754694117816, -0.7040619841436757]),
            {
              "LC18": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([36.605830327408626, -0.7055209954571435]),
            {
              "LC18": 4,
              "system:index": "29"
            })]),
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
    }) || {"bands":["B4","B3","B2"],"min":0,"max":0.5,"gamma":[0.95,1.1,1]};
var bands=['B1','B2','B3','B4','B5'];
var bands2=['B2','B3','B4','B8'];
//center map to area of interest
Map.setCenter(36.69,-1.40,12);
var legend=ui.Panel({
  style:{
    position:'bottom-left',
    padding:'5px'
  }
});
//add a title
var title=ui.Label({
  value:'Kajiado North Land Cover Map From 2002-2020',
  style:{
    fontSize:'14px',
    fontWeight:'bold',
    margin:'0px'
  }
});
//add title to panel
legend.add(title);
//construct a legend
var colours=['red','green','#87ff8a','#feffa1','blue'];
var lc_classes=['Built Up Areas','Forested Areas','Vegetation','Non-Built Up area','Water'];
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
/////////////////////////////////////////////////////////////////
//obtain 2002 image with the least cloud cover
var filtered2002=L7.filterBounds(point).filterDate('2002-01-01','2002-12-31').sort('CLOUD_COVER').first();
print(filtered2002);
//display image
// Map.addLayer(filtered2002,vizParamsFalse,'false2002');
// Map.addLayer(filtered2002,vizParamsTrue,'True2002');
var KNClip2002=filtered2002.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2002,vizParamsFalse,'KNfalse2002');
// Map.addLayer(KNClip2002,vizParamsTrue,'KNTrue2002');
//2002 classification
//merge training data
var merged_fc02=BuiltUp02.merge(ForestedAreas02).merge(Vegetation02).merge(NonBuilt_Up02).merge(Water02);
//define training feature classes, property and the resolution of image
var training02=filtered2002.sampleRegions({
  collection:merged_fc02,
  properties:['LC02'],
  scale:30
});
//define classifier
var classifier02=ee.Classifier.smileCart();
//define training parameters
var classifier02=classifier02.train({
  features:training02,
  classProperty:'LC02',
  inputProperties:bands
});
//classify image
var classified2002=KNClip2002.classify(classifier02);
print(classified2002);
//display image
Map.addLayer(classified2002,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2002');
///////////////////////////////////////////////////////////////////////
/////2004 land cover detection
//obtain a landsat 7 2004 image with the least land cover
var filtered2004=L7.filterBounds(point).filterDate('2004-01-01','2004-12-31').sort('CLOUD_COVER').first();
//rectify scan line error
var fill2004=filtered2004.focalMean(1,'square','pixels',20);
var final2004=fill2004.blend(filtered2004);
print(filtered2004);
//display L7 2004 image
// Map.addLayer(filtered2004,vizParamsFalse,'false2004');
// Map.addLayer(filtered2004,vizParamsTrue,'True2004');
// //display scan line rectified image
// Map.addLayer(fill2004,vizParamsFalse,'false_fill2004');
// Map.addLayer(fill2004,vizParamsTrue,'True_fill2004');
// Map.addLayer(final2004,vizParamsFalse,'final_false2004');
// Map.addLayer(final2004,vizParamsTrue,'final_True2004');
var KNClip2004=final2004.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2004,vizParamsFalse,'KNfalse2004');
// Map.addLayer(KNClip2004,vizParamsTrue,'KNTrue2004');
//2004 classification
//merge training data
var merged_fc04=BuiltUp04.merge(ForestedAreas04).merge(Vegetation04).merge(NonBuilt_Up04).merge(Water04);
//define training feature classes, property and the resolution of image
var training04=filtered2004.sampleRegions({
  collection:merged_fc04,
  properties:['LC04'],
  scale:30
});
//define classifier
var classifier04=ee.Classifier.smileCart();
//define training parameters
var classifier04=classifier04.train({
  features:training04,
  classProperty:'LC04',
  inputProperties:bands
});
//classify image
var classified2004=KNClip2004.classify(classifier04);
print(classified2004);
//display image
Map.addLayer(classified2004,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2004');
/////2006 land cover detection
//obtain a landsat 7 2004 image with the least land cover
var filtered2006=L7.filterBounds(point).filterDate('2006-01-01','2006-12-31').sort('CLOUD_COVER').first();
//rectify scan line error
var fill2006=filtered2006.focalMean(1,'square','pixels',20);
var final2006=fill2006.blend(filtered2006);
print(filtered2006);
//display L7 2006 image
// Map.addLayer(filtered2006,vizParamsFalse,'false2006');
// Map.addLayer(filtered2006,vizParamsTrue,'True2006');
// //display scan line rectified image
// Map.addLayer(fill2006,vizParamsFalse,'false_fill2006');
// Map.addLayer(fill2006,vizParamsTrue,'True_fill2006');
// Map.addLayer(final2006,vizParamsFalse,'final_false2006');
// Map.addLayer(final2006,vizParamsTrue,'final_True2006');
var KNClip2006=final2006.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2006,vizParamsFalse,'KNfalse2006');
// Map.addLayer(KNClip2006,vizParamsTrue,'KNTrue2006');
//2006 classification
//merge training data
var merged_fc06=BuiltUp06.merge(ForestedAreas06).merge(Vegetation06).merge(NonBuilt_Up06).merge(Water06);
//define training feature classes, property and the resolution of image
var training06=filtered2006.sampleRegions({
  collection:merged_fc06,
  properties:['LC06'],
  scale:30
});
//define classifier
var classifier06=ee.Classifier.smileCart();
//define training parameters
var classifier06=classifier06.train({
  features:training06,
  classProperty:'LC06',
  inputProperties:bands
});
//classify image
var classified2006=KNClip2006.classify(classifier04);
print(classified2006);
//display image
Map.addLayer(classified2006,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2006');
/////2008 land cover detection
//obtain a landsat 7 2008 image with the least land cover
var filtered2008=L7.filterBounds(point).filterDate('2008-01-01','2008-12-30').sort('CLOUD_COVER').first();
//rectify scan line error
var fill2008=filtered2008.focalMean(1,'square','pixels',20);
var final2008=fill2008.blend(filtered2008);
print(filtered2008);
//display L7 2008 image
// Map.addLayer(filtered2008,vizParamsFalse,'false2008');
// Map.addLayer(filtered2008,vizParamsTrue,'True2008');
// //display scan line rectified image
// Map.addLayer(fill2008,vizParamsFalse,'false_fill2008');
// Map.addLayer(fill2008,vizParamsTrue,'True_fill2008');
// Map.addLayer(final2008,vizParamsFalse,'final_false2008');
// Map.addLayer(final2008,vizParamsTrue,'final_True2008');
var KNClip2008=final2008.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2008,vizParamsFalse,'KNfalse2008');
// Map.addLayer(KNClip2008,vizParamsTrue,'KNTrue2008');
//2008 classification
//merge training data
var merged_fc08=BuiltUp08.merge(ForestedAreas08).merge(Vegetation08).merge(NonBuilt_Up08).merge(Water08);
//define training feature classes, property and the resolution of image
var training08=KNClip2008.sampleRegions({
  collection:merged_fc08,
  properties:['LC08'],
  scale:30
});
//define classifier
var classifier08=ee.Classifier.smileCart();
//define training parameters
var classifier08=classifier08.train({
  features:training08,
  classProperty:'LC08',
  inputProperties:bands
});
//classify image
var classified2008=KNClip2008.classify(classifier08);
print(classified2008);
//display image
Map.addLayer(classified2008,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2008');
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
/////2012 land cover detection
//obtain a landsat 7 2012 image with the least land cover
var filtered2012=L7.filterBounds(point).filterDate('2012-01-01','2012-12-30').sort('CLOUD_COVER').first();
//rectify scan line error
var fill2012=filtered2012.focalMean(1,'square','pixels',20);
var final2012=fill2012.blend(filtered2012);
print(filtered2012);
//display L7 2012 image
// Map.addLayer(filtered2012,vizParamsFalse,'false2012');
// Map.addLayer(filtered2012,vizParamsTrue,'True2012');
// //display scan line rectified image
// Map.addLayer(fill2012,vizParamsFalse,'false_fill2012');
// Map.addLayer(fill2012,vizParamsTrue,'True_fill2012');
// Map.addLayer(final2012,vizParamsFalse,'final_false2012');
// Map.addLayer(final2012,vizParamsTrue,'final_True2012');
var KNClip2012=final2012.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2012,vizParamsFalse,'KNfalse2012');
// Map.addLayer(KNClip2012,vizParamsTrue,'KNTrue2012');
//2012 classification
//merge training data
var merged_fc12=BuiltUp12.merge(ForestedAreas12).merge(Vegetation12).merge(NonBuilt_Up12).merge(Water12);
//define training feature classes, property and the resolution of image
var training12=KNClip2012.sampleRegions({
  collection:merged_fc12,
  properties:['LC12'],
  scale:30
});
//define classifier
var classifier12=ee.Classifier.smileCart();
//define training parameters
var classifier12=classifier12.train({
  features:training12,
  classProperty:'LC12',
  inputProperties:bands
});
//classify image
var classified2012=KNClip2012.classify(classifier12);
print(classified2012);
//display image
Map.addLayer(classified2012,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2012');
// 2014 Land cover detection
var filtered2014=ee.Image(L8.filterBounds(point).filterDate('2014-01-01','2014-12-31').sort('CLOUD_COVER').first());
//display image
// Map.addLayer(filtered2014,vizParamsFalseL8,'false2014');
// Map.addLayer(filtered2014,vizParamsTrueL8,'True2014');
var KNClip2014=filtered2014.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2014,vizParamsFalseL8,'KNfalse2014');
// Map.addLayer(KNClip2014,vizParamsTrueL8,'KNTrue2014');
//2014 classification
//merge training data
var merged_fc14=BuiltUp14.merge(ForestedAreas14).merge(Vegetation14).merge(NonBuilt_Up14).merge(Water14);
//define training feature classes, property and the resolution of image
var training14=filtered2014.sampleRegions({
  collection:merged_fc14,
  properties:['LC14'],
  scale:30
});
//define classifier
var classifier14=ee.Classifier.smileCart();
//define training parameters
var classifier14=classifier14.train({
  features:training14,
  classProperty:'LC14',
  inputProperties:bands
});
//classify image
var classified2014=KNClip2014.classify(classifier14);
print(classified2014);
//display image
Map.addLayer(classified2014,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2014');
// 2016 Land cover detection
var filtered2016=ee.Image(L8.filterBounds(point).filterDate('2016-01-01','2016-12-31').sort('CLOUD_COVER').first());
//display image
// Map.addLayer(filtered2016,vizParamsFalseL8,'false2016');
// Map.addLayer(filtered2016,vizParamsTrueL8,'True2016');
var KNClip2016=filtered2016.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2016,vizParamsFalseL8,'KNfalse2016');
// Map.addLayer(KNClip2016,vizParamsTrueL8,'KNTrue2016');
//2016 classification
//merge training data
var merged_fc16=BuiltUp16.merge(ForestedAreas16).merge(Vegetation16).merge(NonBuilt_Up16).merge(Water16);
//define training feature classes, property and the resolution of image
var training16=filtered2016.sampleRegions({
  collection:merged_fc16,
  properties:['LC16'],
  scale:30
});
//define classifier
var classifier16=ee.Classifier.smileCart();
//define training parameters
var classifier16=classifier16.train({
  features:training16,
  classProperty:'LC16',
  inputProperties:bands
});
//classify image
var classified2016=KNClip2016.classify(classifier16);
print(classified2016);
//display image
Map.addLayer(classified2016,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2016');
// 2018 Land cover detection
var filtered2018=ee.Image(L8.filterBounds(point).filterDate('2018-01-01','2018-12-31').sort('CLOUD_COVER').first());
//display image
// Map.addLayer(filtered2018,vizParamsFalseL8,'false2018');
// Map.addLayer(filtered2018,vizParamsTrueL8,'True2018');
var KNClip2018=filtered2018.clip(KajiadoNorth);
//display cliped image
// Map.addLayer(KNClip2018,vizParamsFalseL8,'KNfalse2018');
// Map.addLayer(KNClip2018,vizParamsTrueL8,'KNTrue2018');
//2018 classification
//merge training data
var merged_fc18=BuiltUp18.merge(ForestedAreas18).merge(Vegetation18).merge(NonBuilt_Up18).merge(Water18);
//define training feature classes, property and the resolution of image
var training18=filtered2018.sampleRegions({
  collection:merged_fc18,
  properties:['LC18'],
  scale:30
});
//define classifier
var classifier18=ee.Classifier.smileCart();
//define training parameters
var classifier18=classifier18.train({
  features:training18,
  classProperty:'LC18',
  inputProperties:bands
});
//classify image
var classified2018=KNClip2018.classify(classifier18);
print(classified2018);
//display image
Map.addLayer(classified2018,{min:0,max:4,palette:'red,green,#87ff8a,#feffa1,blue'},'classified2018');
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