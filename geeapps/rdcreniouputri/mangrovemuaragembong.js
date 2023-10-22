var AOI = ui.import && ui.import("AOI", "table", {
      "id": "users/rdcreniouputri/BufferMuaraGembong"
    }) || ee.FeatureCollection("users/rdcreniouputri/BufferMuaraGembong"),
    visParImg = ui.import && ui.import("visParImg", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B6",
          "B5",
          "B3"
        ],
        "min": 50,
        "max": 4690,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B6","B5","B3"],"min":50,"max":4690,"gamma":1},
    visParam = ui.import && ui.import("visParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B6",
          "B5",
          "B3"
        ],
        "min": 410,
        "max": 1420,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B6","B5","B3"],"min":410,"max":1420,"gamma":1},
    NonMangrove2020 = ui.import && ui.import("NonMangrove2020", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.01660787661453,
            -6.063762756287617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01480543215652,
            -6.061543639717926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0132175644197,
            -6.060604779959944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0189253052034,
            -6.060263376006588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01454794009109,
            -6.064786960855948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01596414645095,
            -6.062311796486609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00411951144119,
            -6.060860832783216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01180135805984,
            -6.065768488408611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01193010409256,
            -6.056217396039076
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01806699831863,
            -6.055619934123539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00411951144119,
            -6.056686829937595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00901186068435,
            -6.059716802554161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01135074694534,
            -6.049963379685979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01873585398604,
            -6.050539509718784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02405735667159,
            -6.0481069565149745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02320233054405,
            -6.043694697670884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0308766049281,
            -6.040245394725125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02851626099499,
            -6.044833162246704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02030070046736,
            -6.0400428602445295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0154083512242,
            -6.044822674788861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01274759988142,
            -6.040341599889997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98191339065484,
            -6.049881439332352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98791564943245,
            -6.051511922257045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.97822647054963,
            -6.045343108026294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03014387912962,
            -6.035507360643644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02523007221434,
            -6.037321149713503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0230727028643,
            -6.038089415037407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0263342690264,
            -6.032135904851422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02371643302787,
            -6.033352218699549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03076647014773,
            -6.025974223761109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02235911731044,
            -6.020329132578672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02004168872158,
            -6.019176807667058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01491463300437,
            -6.012324216813667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99639666196555,
            -6.02374080530502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00558357176052,
            -6.015498999004559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00762205061184,
            -6.014111928615384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00271978384639,
            -6.012383393334099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0247836352029,
            -6.002673770767319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0225520373025,
            -6.006130843047096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00792179987434,
            -6.007840035880096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01769188283279,
            -6.010225214428385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02485924997738,
            -5.999715403912418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02534119416218,
            -5.99250218216981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01465527344685,
            -5.993867967217882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01268116761189,
            -5.9876365451670335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02141444016438,
            -5.971630854717539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02295939255696,
            -5.972271091323962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03047365178976,
            -5.975728735014101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03390687932882,
            -5.974192175603737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03422874441061,
            -5.971609892437638
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0167309021984,
            -5.958220929178359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01960623026237,
            -5.9577300686035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02200948953971,
            -5.956705662511968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03215896845207,
            -5.9578367774614565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03368246317252,
            -5.959234661585026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03117496308543,
            -5.952437482327623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03220493134715,
            -5.950175227865183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02847309859501,
            -5.947675774959899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02959166576646,
            -5.946149465907446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01913641502641,
            -5.942009058992323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.024286256335,
            -5.944228662449453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01570318748735,
            -5.94149684153884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00724030424824,
            -5.943140204180311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01870923127568,
            -5.947357093234417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00677127107342,
            -5.934717410149639
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00089186891277,
            -5.9351869486123645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9951363755828,
            -5.939180723084554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00300671617897,
            -5.936497678877746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98615838245668,
            -5.938884291790806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00676933863214,
            -5.926261293845581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03737465019152,
            -5.931605137593478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03637205729095,
            -5.93758072670911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04821291800715,
            -5.928786625104649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06892138793201,
            -5.931599454567139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06355696990222,
            -5.931876910730816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05857878997058,
            -5.931023199011936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07592413275191,
            -5.935183802548992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08015129415938,
            -5.935461256908697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08342704024612,
            -5.934433776761652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09598426967092,
            -5.9540566348332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08497013428443,
            -5.9474911685346425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09654450628602,
            -5.948695361347796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10166216108644,
            -5.949335624712875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09969878408754,
            -5.9480230840120925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10009047514113,
            -5.951111477070852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10483262067946,
            -5.9466616882122665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09807305783528,
            -5.9422217039762915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08849509113313,
            -5.93940514910247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09372772901851,
            -5.943203807974936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08429308815727,
            -5.9324885808802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06202627706602,
            -5.937738541596148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02747595133094,
            -5.926936993386813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02936422647743,
            -5.9311628847822755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02366270114305,
            -5.923212671621948
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02081301368513,
            -5.928779703451198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01197245277204,
            -5.9210108345278165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02629699638275,
            -6.04482816444558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02636405131368,
            -6.041541355512637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0289604296401,
            -6.037318150408685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02568733242863,
            -6.026694943288539
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
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
            ee.Geometry.Point([107.01660787661453, -6.063762756287617]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01480543215652, -6.061543639717926]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0132175644197, -6.060604779959944]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0189253052034, -6.060263376006588]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01454794009109, -6.064786960855948]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01596414645095, -6.062311796486609]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00411951144119, -6.060860832783216]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01180135805984, -6.065768488408611]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01193010409256, -6.056217396039076]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01806699831863, -6.055619934123539]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00411951144119, -6.056686829937595]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00901186068435, -6.059716802554161]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01135074694534, -6.049963379685979]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01873585398604, -6.050539509718784]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02405735667159, -6.0481069565149745]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02320233054405, -6.043694697670884]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0308766049281, -6.040245394725125]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02851626099499, -6.044833162246704]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02030070046736, -6.0400428602445295]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0154083512242, -6.044822674788861]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01274759988142, -6.040341599889997]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98191339065484, -6.049881439332352]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98791564943245, -6.051511922257045]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([106.97822647054963, -6.045343108026294]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03014387912962, -6.035507360643644]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02523007221434, -6.037321149713503]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0230727028643, -6.038089415037407]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0263342690264, -6.032135904851422]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02371643302787, -6.033352218699549]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03076647014773, -6.025974223761109]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02235911731044, -6.020329132578672]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02004168872158, -6.019176807667058]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01491463300437, -6.012324216813667]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99639666196555, -6.02374080530502]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00558357176052, -6.015498999004559]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00762205061184, -6.014111928615384]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00271978384639, -6.012383393334099]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0247836352029, -6.002673770767319]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0225520373025, -6.006130843047096]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00792179987434, -6.007840035880096]),
            {
              "landcover": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01769188283279, -6.010225214428385]),
            {
              "landcover": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02485924997738, -5.999715403912418]),
            {
              "landcover": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02534119416218, -5.99250218216981]),
            {
              "landcover": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01465527344685, -5.993867967217882]),
            {
              "landcover": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01268116761189, -5.9876365451670335]),
            {
              "landcover": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02141444016438, -5.971630854717539]),
            {
              "landcover": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02295939255696, -5.972271091323962]),
            {
              "landcover": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03047365178976, -5.975728735014101]),
            {
              "landcover": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03390687932882, -5.974192175603737]),
            {
              "landcover": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03422874441061, -5.971609892437638]),
            {
              "landcover": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0167309021984, -5.958220929178359]),
            {
              "landcover": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01960623026237, -5.9577300686035]),
            {
              "landcover": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02200948953971, -5.956705662511968]),
            {
              "landcover": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03215896845207, -5.9578367774614565]),
            {
              "landcover": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03368246317252, -5.959234661585026]),
            {
              "landcover": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03117496308543, -5.952437482327623]),
            {
              "landcover": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03220493134715, -5.950175227865183]),
            {
              "landcover": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02847309859501, -5.947675774959899]),
            {
              "landcover": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02959166576646, -5.946149465907446]),
            {
              "landcover": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01913641502641, -5.942009058992323]),
            {
              "landcover": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.024286256335, -5.944228662449453]),
            {
              "landcover": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01570318748735, -5.94149684153884]),
            {
              "landcover": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00724030424824, -5.943140204180311]),
            {
              "landcover": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01870923127568, -5.947357093234417]),
            {
              "landcover": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00677127107342, -5.934717410149639]),
            {
              "landcover": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00089186891277, -5.9351869486123645]),
            {
              "landcover": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9951363755828, -5.939180723084554]),
            {
              "landcover": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00300671617897, -5.936497678877746]),
            {
              "landcover": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98615838245668, -5.938884291790806]),
            {
              "landcover": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00676933863214, -5.926261293845581]),
            {
              "landcover": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03737465019152, -5.931605137593478]),
            {
              "landcover": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03637205729095, -5.93758072670911]),
            {
              "landcover": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04821291800715, -5.928786625104649]),
            {
              "landcover": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06892138793201, -5.931599454567139]),
            {
              "landcover": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06355696990222, -5.931876910730816]),
            {
              "landcover": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05857878997058, -5.931023199011936]),
            {
              "landcover": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07592413275191, -5.935183802548992]),
            {
              "landcover": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08015129415938, -5.935461256908697]),
            {
              "landcover": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08342704024612, -5.934433776761652]),
            {
              "landcover": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09598426967092, -5.9540566348332]),
            {
              "landcover": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08497013428443, -5.9474911685346425]),
            {
              "landcover": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09654450628602, -5.948695361347796]),
            {
              "landcover": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10166216108644, -5.949335624712875]),
            {
              "landcover": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09969878408754, -5.9480230840120925]),
            {
              "landcover": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10009047514113, -5.951111477070852]),
            {
              "landcover": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10483262067946, -5.9466616882122665]),
            {
              "landcover": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09807305783528, -5.9422217039762915]),
            {
              "landcover": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08849509113313, -5.93940514910247]),
            {
              "landcover": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09372772901851, -5.943203807974936]),
            {
              "landcover": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08429308815727, -5.9324885808802]),
            {
              "landcover": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06202627706602, -5.937738541596148]),
            {
              "landcover": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02747595133094, -5.926936993386813]),
            {
              "landcover": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02936422647743, -5.9311628847822755]),
            {
              "landcover": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02366270114305, -5.923212671621948]),
            {
              "landcover": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02081301368513, -5.928779703451198]),
            {
              "landcover": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01197245277204, -5.9210108345278165]),
            {
              "landcover": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02629699638275, -6.04482816444558]),
            {
              "landcover": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02636405131368, -6.041541355512637]),
            {
              "landcover": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0289604296401, -6.037318150408685]),
            {
              "landcover": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02568733242863, -6.026694943288539]),
            {
              "landcover": 0,
              "system:index": "99"
            })]),
    Mangrove2020 = ui.import && ui.import("Mangrove2020", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.01098747640172,
            -6.043987907864292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0070433724811,
            -6.067682395285593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00516881292249,
            -6.066033922465058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99915407369573,
            -6.0617437032577905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99864162072048,
            -6.057597267209944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99284191146546,
            -6.051974945188258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0042565538223,
            -6.045939124115196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0071252199338,
            -6.0396501278577475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98073181784713,
            -6.055522324691004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00969173712481,
            -6.037710184838478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01219159037758,
            -6.036775899902989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01412988127964,
            -6.036715404705539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01380782003409,
            -6.0351045241290615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01147695879175,
            -6.033447623949893
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01685976268601,
            -6.033183446479063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02072543093031,
            -6.027050949050541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99738784476486,
            -6.0247234467783235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01866622321005,
            -6.025357960054915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01645436083308,
            -6.025893210594654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01923553255432,
            -6.022182511482335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01209803122867,
            -6.024047668336829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01387297514404,
            -6.022162974511326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01644864899903,
            -6.03177602933056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00989071542213,
            -6.02362985929124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00989071542213,
            -6.02362985929124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00454732312187,
            -6.023994225822485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00404090762785,
            -6.022627649580624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00095586062955,
            -6.021861558675624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00093279928359,
            -6.025253217885949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00093279928359,
            -6.025253217885949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99547567704906,
            -6.021952533166308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01581885113765,
            -6.0293979903138295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99614536756937,
            -6.018596485269011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99839223986919,
            -6.018111724995245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99942540360139,
            -6.01693289982673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99541300992337,
            -6.0142107973684436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9957503115671,
            -6.012194904530089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99541386504666,
            -6.010262143620796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99778974544695,
            -6.012912079426131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99403077990316,
            -6.007549953676152
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00823759693263,
            -6.001126633016569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99591523065877,
            -6.006699633889302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9975383962119,
            -6.007180225686679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99750642353294,
            -6.005307768187236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99939558006716,
            -6.004390142149957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00186699526029,
            -6.0035154922332294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00457196283482,
            -6.001651269530213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00881124740373,
            -5.999252852991257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00814380987947,
            -6.000215690857245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01011791571443,
            -5.994678239627871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01070563098908,
            -5.993435654511645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01053935462504,
            -5.9912067053562374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01216007017528,
            -5.990811183818539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01135796805269,
            -5.989595376063402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01202887918298,
            -5.987082063517914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01333484014219,
            -5.98401592779609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01933477756197,
            -5.985965682573136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0145271712191,
            -5.982625856965123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01331779329274,
            -5.9809606285552634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02060315667083,
            -5.976356288415843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0167354731013,
            -5.98037499071239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01918017802475,
            -5.973805742474224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0148296350026,
            -5.9768468476079315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01939393550623,
            -5.971030176540848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01826384847205,
            -5.970789239540245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01694801303724,
            -5.966520789546241
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01653943665471,
            -5.963198766721799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9894996207958,
            -5.942988441751039
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98953063580292,
            -5.9369206167996476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99784164905932,
            -5.933678983334662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01234997643176,
            -5.922091280519108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01194710709704,
            -5.924190946797991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00364812752868,
            -5.929201585567758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02167525431777,
            -5.921104571086216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01982671525455,
            -5.921172157817257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01813347045675,
            -5.927404266077014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02251083556905,
            -5.923402368901984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03897722837452,
            -5.9269961271592555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99935110600627,
            -5.939215606428078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01012017520107,
            -5.946730780213379
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04144032986797,
            -5.931865736640429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0393695020143,
            -5.932602057838612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04217859914348,
            -5.933575868056502
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04501574462108,
            -5.933650445472692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01365267460997,
            -5.953381208415384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00581537562735,
            -5.941173612181582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04447941857703,
            -5.934736709024019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06501389792021,
            -5.93150729331086
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0533945684677,
            -5.928610001856045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0745671362936,
            -5.934676374706724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08286656874415,
            -5.936302000446495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08835463611351,
            -5.936077903047153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00248473300545,
            -6.067547352386273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00058036460487,
            -6.067627367876577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99941922511087,
            -6.064270489654554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01388054338483,
            -6.03859960608963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99910417493193,
            -6.056242237541653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01784222629344,
            -6.029193390010031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0141842848528,
            -6.028288343072698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99946792789056,
            -6.026478761754625
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#0aa704",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0aa704 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([107.01098747640172, -6.043987907864292]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0070433724811, -6.067682395285593]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00516881292249, -6.066033922465058]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99915407369573, -6.0617437032577905]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99864162072048, -6.057597267209944]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99284191146546, -6.051974945188258]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0042565538223, -6.045939124115196]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0071252199338, -6.0396501278577475]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98073181784713, -6.055522324691004]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00969173712481, -6.037710184838478]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01219159037758, -6.036775899902989]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01412988127964, -6.036715404705539]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01380782003409, -6.0351045241290615]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01147695879175, -6.033447623949893]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01685976268601, -6.033183446479063]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02072543093031, -6.027050949050541]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99738784476486, -6.0247234467783235]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01866622321005, -6.025357960054915]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01645436083308, -6.025893210594654]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01923553255432, -6.022182511482335]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01209803122867, -6.024047668336829]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01387297514404, -6.022162974511326]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01644864899903, -6.03177602933056]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00989071542213, -6.02362985929124]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00989071542213, -6.02362985929124]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00454732312187, -6.023994225822485]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00404090762785, -6.022627649580624]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00095586062955, -6.021861558675624]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00093279928359, -6.025253217885949]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00093279928359, -6.025253217885949]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99547567704906, -6.021952533166308]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01581885113765, -6.0293979903138295]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99614536756937, -6.018596485269011]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99839223986919, -6.018111724995245]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99942540360139, -6.01693289982673]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99541300992337, -6.0142107973684436]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9957503115671, -6.012194904530089]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99541386504666, -6.010262143620796]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99778974544695, -6.012912079426131]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99403077990316, -6.007549953676152]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00823759693263, -6.001126633016569]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99591523065877, -6.006699633889302]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9975383962119, -6.007180225686679]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99750642353294, -6.005307768187236]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99939558006716, -6.004390142149957]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00186699526029, -6.0035154922332294]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00457196283482, -6.001651269530213]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00881124740373, -5.999252852991257]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00814380987947, -6.000215690857245]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01011791571443, -5.994678239627871]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01070563098908, -5.993435654511645]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01053935462504, -5.9912067053562374]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01216007017528, -5.990811183818539]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01135796805269, -5.989595376063402]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01202887918298, -5.987082063517914]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01333484014219, -5.98401592779609]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01933477756197, -5.985965682573136]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0145271712191, -5.982625856965123]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01331779329274, -5.9809606285552634]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02060315667083, -5.976356288415843]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0167354731013, -5.98037499071239]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01918017802475, -5.973805742474224]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0148296350026, -5.9768468476079315]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01939393550623, -5.971030176540848]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01826384847205, -5.970789239540245]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01694801303724, -5.966520789546241]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01653943665471, -5.963198766721799]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9894996207958, -5.942988441751039]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98953063580292, -5.9369206167996476]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99784164905932, -5.933678983334662]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01234997643176, -5.922091280519108]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01194710709704, -5.924190946797991]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00364812752868, -5.929201585567758]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02167525431777, -5.921104571086216]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01982671525455, -5.921172157817257]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01813347045675, -5.927404266077014]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02251083556905, -5.923402368901984]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03897722837452, -5.9269961271592555]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99935110600627, -5.939215606428078]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01012017520107, -5.946730780213379]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04144032986797, -5.931865736640429]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0393695020143, -5.932602057838612]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04217859914348, -5.933575868056502]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04501574462108, -5.933650445472692]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01365267460997, -5.953381208415384]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00581537562735, -5.941173612181582]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04447941857703, -5.934736709024019]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06501389792021, -5.93150729331086]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0533945684677, -5.928610001856045]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0745671362936, -5.934676374706724]),
            {
              "landcover": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08286656874415, -5.936302000446495]),
            {
              "landcover": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08835463611351, -5.936077903047153]),
            {
              "landcover": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00248473300545, -6.067547352386273]),
            {
              "landcover": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00058036460487, -6.067627367876577]),
            {
              "landcover": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99941922511087, -6.064270489654554]),
            {
              "landcover": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01388054338483, -6.03859960608963]),
            {
              "landcover": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99910417493193, -6.056242237541653]),
            {
              "landcover": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01784222629344, -6.029193390010031]),
            {
              "landcover": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0141842848528, -6.028288343072698]),
            {
              "landcover": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99946792789056, -6.026478761754625]),
            {
              "landcover": 1,
              "system:index": "99"
            })]),
    visPar = ui.import && ui.import("visPar", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 50,
        "max": 4650,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":50,"max":4650,"gamma":1},
    visParMang = ui.import && ui.import("visParMang", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 450,
        "max": 1450,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":450,"max":1450,"gamma":1},
    NonMangrove2010 = ui.import && ui.import("NonMangrove2010", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.01027456485309,
            -6.0644482795931705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00883153640308,
            -6.0639361772305405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01438522301052,
            -6.064997630971573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01684212646816,
            -6.063568012116073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01574511892332,
            -6.06171706525156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01254792577757,
            -6.060001192494099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00632762246302,
            -6.060701477873255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00267615903407,
            -6.06392584641064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00457516301661,
            -6.056976240164453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00315895665675,
            -6.057808416990046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01188686479121,
            -6.056560151270683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01503512539047,
            -6.052999572345057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01017496265548,
            -6.053639713191685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00377654178683,
            -6.052824826037506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98281476002835,
            -6.051033907606055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98768756755722,
            -6.045796612456692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01832589500104,
            -6.051982704944939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02066478622005,
            -6.050017832894306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01326188933895,
            -6.049827300714813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00719728148593,
            -6.048476553808204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02380234593095,
            -6.048361470954757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02483418100249,
            -6.0467323378087325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02914245519996,
            -6.043339817380573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0223011445563,
            -6.043691901229578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02456649968973,
            -6.0424631146130565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0315775976544,
            -6.0415055321993165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02742553809935,
            -6.039841127082078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02311104160655,
            -6.038321599056783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0185620151173,
            -6.039164473883484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02989284634958,
            -6.035542999072362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03071896672617,
            -6.034892167439384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02826206326853,
            -6.03510555494616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03128759503733,
            -6.028712623523742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02768270612131,
            -6.030377062819233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03175966382395,
            -6.031828108293927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02489320874582,
            -6.031593380612724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02078964113959,
            -6.0345484614857625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0225311472704,
            -6.027116147980805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02743474369092,
            -6.024422264867446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02071642494579,
            -6.022251317995778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02254032707592,
            -6.020736228985501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01433061351487,
            -6.016950006391701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99515457238591,
            -6.024791140122028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99712867822088,
            -6.022955969926243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0005926742144,
            -6.019789906329246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00485180321053,
            -6.017608062393935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0065693353741,
            -6.015949429171334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00542671433375,
            -6.015074508985712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00519609861855,
            -6.01313213023977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00186445115932,
            -6.0121276997570625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09602071641811,
            -5.952416094537163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09675027727016,
            -5.9539422950613945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10379356283686,
            -5.951737452002376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09699148077509,
            -5.949475194658772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.1035146130993,
            -5.943773979024215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09810727972528,
            -5.94347518652569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0987939252331,
            -5.939643714168072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08520399266985,
            -5.935972664608554
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07045723113103,
            -5.950181520245621
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07067255936612,
            -5.9338355262550735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07817502407232,
            -5.935885208675646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02874782488877,
            -5.9279606303237005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02677842100225,
            -5.924576198895265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03760187587667,
            -5.933628191830418
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03708689174582,
            -5.935556770935423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03650241410405,
            -5.937755547011071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00598708576442,
            -5.925629175590644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99597363081644,
            -5.936219952244597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99892406073282,
            -5.935110135495512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00407329285262,
            -5.935391525456328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00627933939823,
            -5.935673490421395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01171019355482,
            -5.9363989613632295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01687086292537,
            -5.940880718579188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02493217843309,
            -5.94454995496028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02915762949387,
            -5.946127691917105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0308767472981,
            -5.947869246436025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03117434831017,
            -5.9507055521845205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.032969673994,
            -5.953038164276923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0165517266162,
            -5.958239262665632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01928757981139,
            -5.957833769192346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02227019623595,
            -5.9567133251433635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03366409085518,
            -5.959181062476849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02870563421054,
            -5.962595160195727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03406290281244,
            -5.973816753383188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02148870695062,
            -5.9713411746771135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02234701383539,
            -5.972152141347764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03017174799791,
            -5.976496739786519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02646493513933,
            -5.989838903769198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01695382197252,
            -5.994239923913289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02557980616442,
            -5.995989829817405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0238319141648,
            -6.003721757984487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01751338347118,
            -6.010314272372324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01081858977001,
            -6.012490919523109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01956019768681,
            -5.978698858994859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01300354034328,
            -5.927580271846422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08996889421334,
            -5.943476522502049
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
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
            ee.Geometry.Point([107.01027456485309, -6.0644482795931705]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00883153640308, -6.0639361772305405]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01438522301052, -6.064997630971573]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01684212646816, -6.063568012116073]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01574511892332, -6.06171706525156]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01254792577757, -6.060001192494099]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00632762246302, -6.060701477873255]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00267615903407, -6.06392584641064]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00457516301661, -6.056976240164453]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00315895665675, -6.057808416990046]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01188686479121, -6.056560151270683]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01503512539047, -6.052999572345057]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01017496265548, -6.053639713191685]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00377654178683, -6.052824826037506]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98281476002835, -6.051033907606055]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98768756755722, -6.045796612456692]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01832589500104, -6.051982704944939]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02066478622005, -6.050017832894306]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01326188933895, -6.049827300714813]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00719728148593, -6.048476553808204]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02380234593095, -6.048361470954757]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02483418100249, -6.0467323378087325]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02914245519996, -6.043339817380573]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0223011445563, -6.043691901229578]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02456649968973, -6.0424631146130565]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0315775976544, -6.0415055321993165]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02742553809935, -6.039841127082078]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02311104160655, -6.038321599056783]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0185620151173, -6.039164473883484]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02989284634958, -6.035542999072362]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03071896672617, -6.034892167439384]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02826206326853, -6.03510555494616]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03128759503733, -6.028712623523742]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02768270612131, -6.030377062819233]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03175966382395, -6.031828108293927]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02489320874582, -6.031593380612724]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02078964113959, -6.0345484614857625]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0225311472704, -6.027116147980805]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02743474369092, -6.024422264867446]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02071642494579, -6.022251317995778]),
            {
              "landcover": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02254032707592, -6.020736228985501]),
            {
              "landcover": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01433061351487, -6.016950006391701]),
            {
              "landcover": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99515457238591, -6.024791140122028]),
            {
              "landcover": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99712867822088, -6.022955969926243]),
            {
              "landcover": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0005926742144, -6.019789906329246]),
            {
              "landcover": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00485180321053, -6.017608062393935]),
            {
              "landcover": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0065693353741, -6.015949429171334]),
            {
              "landcover": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00542671433375, -6.015074508985712]),
            {
              "landcover": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00519609861855, -6.01313213023977]),
            {
              "landcover": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00186445115932, -6.0121276997570625]),
            {
              "landcover": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09602071641811, -5.952416094537163]),
            {
              "landcover": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09675027727016, -5.9539422950613945]),
            {
              "landcover": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10379356283686, -5.951737452002376]),
            {
              "landcover": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09699148077509, -5.949475194658772]),
            {
              "landcover": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.1035146130993, -5.943773979024215]),
            {
              "landcover": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09810727972528, -5.94347518652569]),
            {
              "landcover": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0987939252331, -5.939643714168072]),
            {
              "landcover": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08520399266985, -5.935972664608554]),
            {
              "landcover": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07045723113103, -5.950181520245621]),
            {
              "landcover": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07067255936612, -5.9338355262550735]),
            {
              "landcover": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07817502407232, -5.935885208675646]),
            {
              "landcover": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02874782488877, -5.9279606303237005]),
            {
              "landcover": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02677842100225, -5.924576198895265]),
            {
              "landcover": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03760187587667, -5.933628191830418]),
            {
              "landcover": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03708689174582, -5.935556770935423]),
            {
              "landcover": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03650241410405, -5.937755547011071]),
            {
              "landcover": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00598708576442, -5.925629175590644]),
            {
              "landcover": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99597363081644, -5.936219952244597]),
            {
              "landcover": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99892406073282, -5.935110135495512]),
            {
              "landcover": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00407329285262, -5.935391525456328]),
            {
              "landcover": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00627933939823, -5.935673490421395]),
            {
              "landcover": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01171019355482, -5.9363989613632295]),
            {
              "landcover": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01687086292537, -5.940880718579188]),
            {
              "landcover": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02493217843309, -5.94454995496028]),
            {
              "landcover": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02915762949387, -5.946127691917105]),
            {
              "landcover": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0308767472981, -5.947869246436025]),
            {
              "landcover": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03117434831017, -5.9507055521845205]),
            {
              "landcover": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.032969673994, -5.953038164276923]),
            {
              "landcover": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0165517266162, -5.958239262665632]),
            {
              "landcover": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01928757981139, -5.957833769192346]),
            {
              "landcover": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02227019623595, -5.9567133251433635]),
            {
              "landcover": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03366409085518, -5.959181062476849]),
            {
              "landcover": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02870563421054, -5.962595160195727]),
            {
              "landcover": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03406290281244, -5.973816753383188]),
            {
              "landcover": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02148870695062, -5.9713411746771135]),
            {
              "landcover": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02234701383539, -5.972152141347764]),
            {
              "landcover": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03017174799791, -5.976496739786519]),
            {
              "landcover": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02646493513933, -5.989838903769198]),
            {
              "landcover": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01695382197252, -5.994239923913289]),
            {
              "landcover": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02557980616442, -5.995989829817405]),
            {
              "landcover": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0238319141648, -6.003721757984487]),
            {
              "landcover": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01751338347118, -6.010314272372324]),
            {
              "landcover": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01081858977001, -6.012490919523109]),
            {
              "landcover": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01956019768681, -5.978698858994859]),
            {
              "landcover": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01300354034328, -5.927580271846422]),
            {
              "landcover": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08996889421334, -5.943476522502049]),
            {
              "landcover": 0,
              "system:index": "95"
            })]),
    Mangrove2010 = ui.import && ui.import("Mangrove2010", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.06304748210508,
            -5.9308557140939095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0639701620062,
            -5.931122499229032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05255586703616,
            -5.9297470064641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05310226726574,
            -5.928109562436051
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0394408095034,
            -5.927082794528437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0395360967561,
            -5.928463450321994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0362659414008,
            -5.923838495764735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03389710813501,
            -5.927077879139569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03021823184777,
            -5.925933787984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02578993831797,
            -5.926079150556383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02234678322901,
            -5.922893594778219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01406266932544,
            -5.9252794896013405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.008831300276,
            -5.922217506959821
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00332762264989,
            -5.928680002036963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0012945082166,
            -5.931233582221745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99926504438034,
            -5.936734326018863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01203209842214,
            -5.946146260869543
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01281713446242,
            -5.950186578307787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01634265478775,
            -5.961901797993862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01634265478775,
            -5.960792033076408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01687243583481,
            -5.96406538863647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01749351181854,
            -5.969512289664109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01828396881776,
            -5.970785881489213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01996034945206,
            -5.97110066506646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02082402075486,
            -5.970985955817735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0196393119729,
            -5.972182862559521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01797944399092,
            -5.973258045835653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02070355132827,
            -5.973828015132628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02202968464186,
            -5.972767161243064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02372507551516,
            -5.974592258660824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0180602500757,
            -5.975723336707938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01584130759223,
            -5.976458997891117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01487333144239,
            -5.978360983339038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0132116198816,
            -5.980925375903832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01452053788087,
            -5.981576272059731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01320302456166,
            -5.98328783407734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01450121372487,
            -5.9830477502714094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01647787639305,
            -5.983896299587991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01834963107578,
            -5.984819160856305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01885965791719,
            -5.986093696066332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0186102124788,
            -5.98728076946226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01345787002815,
            -5.984063459022709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01334606027334,
            -5.985586147203486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01216446892697,
            -5.986813266834317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0109773387981,
            -5.987928082155873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01075786243861,
            -5.990098369672718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01150888096278,
            -5.990887968047394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01043218959667,
            -5.991306748004816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01066074066874,
            -5.992625449220113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01004194687849,
            -5.9941658820135135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01004758112971,
            -5.995186007619228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00784608626311,
            -5.99770465755612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0087015537896,
            -5.998182300937286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01223324463366,
            -5.999920209380747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00758420341367,
            -6.000623614160265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00313031219183,
            -6.002975767046273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00027572116124,
            -6.003994751486168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99921409048974,
            -6.004827009614611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99733567196854,
            -6.004625081350156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99563720269495,
            -6.006947540229118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99486557927408,
            -6.008134130311634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99776725864962,
            -6.010014585142395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9991983545163,
            -6.010524927352286
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99415732796496,
            -6.010050568605739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99438922366076,
            -6.012986852400087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99732572984769,
            -6.014091771658913
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99997216437205,
            -6.01669002522261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99489501093741,
            -6.016542263212361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00105773768998,
            -6.0184303448825895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99781226478196,
            -6.019241241559498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99571288507804,
            -6.02194557552151
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.997620345617,
            -6.0240761635754865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9998140346228,
            -6.021910251327547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0057587899002,
            -6.02359837954116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01041578130022,
            -6.023437905857021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00688591765157,
            -6.022016795437606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01251605167565,
            -6.0229787871499205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01438271495704,
            -6.021853525299756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01270846436839,
            -6.024018410539476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01631701040397,
            -6.025910419109392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01855373796106,
            -6.025440939069307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01471998238605,
            -6.028621339629183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01683550771018,
            -6.028054823677593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01655747403206,
            -6.029900305699464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01578034759214,
            -6.031883073583414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01713218093565,
            -6.0313389320405495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01065534775674,
            -6.038160240508795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00717018503977,
            -6.041959494415487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00447115889607,
            -6.045982237859902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00637861094565,
            -6.050677959219515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99035415089668,
            -6.053387989202417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99856645797665,
            -6.05734232639855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99826749307873,
            -6.058192547530967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00011843442017,
            -6.060679635760711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00705240396115,
            -6.067693522081147
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00610742646745,
            -6.045911762390975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01234080248881,
            -6.021687306464686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01580599873179,
            -6.021527235262807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00035401180888,
            -6.025907152237446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99869640663768,
            -6.0260191825449105
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#0b8b06",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b8b06 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([107.06304748210508, -5.9308557140939095]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0639701620062, -5.931122499229032]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05255586703616, -5.9297470064641]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05310226726574, -5.928109562436051]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0394408095034, -5.927082794528437]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0395360967561, -5.928463450321994]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0362659414008, -5.923838495764735]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03389710813501, -5.927077879139569]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03021823184777, -5.925933787984]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02578993831797, -5.926079150556383]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02234678322901, -5.922893594778219]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01406266932544, -5.9252794896013405]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.008831300276, -5.922217506959821]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00332762264989, -5.928680002036963]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0012945082166, -5.931233582221745]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99926504438034, -5.936734326018863]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01203209842214, -5.946146260869543]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01281713446242, -5.950186578307787]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01634265478775, -5.961901797993862]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01634265478775, -5.960792033076408]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01687243583481, -5.96406538863647]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01749351181854, -5.969512289664109]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01828396881776, -5.970785881489213]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01996034945206, -5.97110066506646]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02082402075486, -5.970985955817735]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0196393119729, -5.972182862559521]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01797944399092, -5.973258045835653]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02070355132827, -5.973828015132628]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02202968464186, -5.972767161243064]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02372507551516, -5.974592258660824]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0180602500757, -5.975723336707938]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01584130759223, -5.976458997891117]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01487333144239, -5.978360983339038]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0132116198816, -5.980925375903832]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01452053788087, -5.981576272059731]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01320302456166, -5.98328783407734]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01450121372487, -5.9830477502714094]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01647787639305, -5.983896299587991]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01834963107578, -5.984819160856305]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01885965791719, -5.986093696066332]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0186102124788, -5.98728076946226]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01345787002815, -5.984063459022709]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01334606027334, -5.985586147203486]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01216446892697, -5.986813266834317]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0109773387981, -5.987928082155873]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01075786243861, -5.990098369672718]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01150888096278, -5.990887968047394]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01043218959667, -5.991306748004816]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01066074066874, -5.992625449220113]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01004194687849, -5.9941658820135135]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01004758112971, -5.995186007619228]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00784608626311, -5.99770465755612]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0087015537896, -5.998182300937286]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01223324463366, -5.999920209380747]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00758420341367, -6.000623614160265]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00313031219183, -6.002975767046273]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00027572116124, -6.003994751486168]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99921409048974, -6.004827009614611]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99733567196854, -6.004625081350156]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99563720269495, -6.006947540229118]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99486557927408, -6.008134130311634]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99776725864962, -6.010014585142395]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9991983545163, -6.010524927352286]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99415732796496, -6.010050568605739]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99438922366076, -6.012986852400087]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99732572984769, -6.014091771658913]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99997216437205, -6.01669002522261]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99489501093741, -6.016542263212361]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00105773768998, -6.0184303448825895]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99781226478196, -6.019241241559498]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99571288507804, -6.02194557552151]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([106.997620345617, -6.0240761635754865]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9998140346228, -6.021910251327547]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0057587899002, -6.02359837954116]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01041578130022, -6.023437905857021]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00688591765157, -6.022016795437606]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01251605167565, -6.0229787871499205]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01438271495704, -6.021853525299756]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01270846436839, -6.024018410539476]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01631701040397, -6.025910419109392]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01855373796106, -6.025440939069307]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01471998238605, -6.028621339629183]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01683550771018, -6.028054823677593]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01655747403206, -6.029900305699464]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01578034759214, -6.031883073583414]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01713218093565, -6.0313389320405495]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01065534775674, -6.038160240508795]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00717018503977, -6.041959494415487]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00447115889607, -6.045982237859902]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00637861094565, -6.050677959219515]),
            {
              "landcover": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99035415089668, -6.053387989202417]),
            {
              "landcover": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99856645797665, -6.05734232639855]),
            {
              "landcover": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99826749307873, -6.058192547530967]),
            {
              "landcover": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00011843442017, -6.060679635760711]),
            {
              "landcover": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00705240396115, -6.067693522081147]),
            {
              "landcover": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00610742646745, -6.045911762390975]),
            {
              "landcover": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01234080248881, -6.021687306464686]),
            {
              "landcover": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01580599873179, -6.021527235262807]),
            {
              "landcover": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00035401180888, -6.025907152237446]),
            {
              "landcover": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99869640663768, -6.0260191825449105]),
            {
              "landcover": 1,
              "system:index": "99"
            })]),
    NonMangrove2000 = ui.import && ui.import("NonMangrove2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.01734712686861,
            -6.063102633797356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01382806864108,
            -6.060371408765812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01953580942477,
            -6.060584786219249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0143001374277,
            -6.064852317566316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00962925574854,
            -6.061996319515085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0058956207998,
            -6.060673381404249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99960153433771,
            -6.063881471307946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00008167205773,
            -6.061365655502099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00455642574016,
            -6.056945433737164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01078987949077,
            -6.055974559097623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.98496835085085,
            -6.050335076052998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01960324944582,
            -6.056879734659308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00076341332522,
            -6.051779955452231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00148182984181,
            -6.0567879039891945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02036458130665,
            -6.048824027220306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02010708924122,
            -6.051128548524389
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01617926105037,
            -6.052046640573501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00722043089547,
            -6.054060480638417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00837699676444,
            -6.047909557754354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01399890685965,
            -6.04522093260658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02629855186406,
            -6.0471501293100385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0232086470789,
            -6.043223873059833
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02887347251836,
            -6.0398950682742045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02938845664922,
            -6.043309226759515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02617854974845,
            -6.039810513813169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02089996240714,
            -6.036722450631682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03253002069572,
            -6.033644112819924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02005238435844,
            -6.033217336571669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02437610529044,
            -6.032619849259669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03171462915519,
            -6.029034911562306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02384428623928,
            -6.027830732679372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03096823338284,
            -6.025355399235041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01963858250393,
            -6.026208963767024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02748723497496,
            -6.023322727229528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02059617089073,
            -6.021925676631213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02244153069297,
            -6.020752015795529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01714311951118,
            -6.019472081649043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02368388376819,
            -6.01720585377409
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02213893137561,
            -6.012724550757307
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00952182016955,
            -6.01562673216332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01464483423052,
            -6.018259696451026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99499523980491,
            -6.024899745671505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99787056786887,
            -6.0224243988619754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00444465383804,
            -6.017900460026904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00519501723768,
            -6.014678849127562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0024055198622,
            -6.013025031533047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01107441939833,
            -6.012470201278073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02193940974914,
            -6.008543694072955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02399934627257,
            -6.000789439124947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01490129329406,
            -6.003862403973979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02708525509921,
            -5.992653358832485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0269565090665,
            -5.99034858945291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02433867306796,
            -5.988598665463423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0174293026456,
            -5.98787308557946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03373599772245,
            -5.9756917073100775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03433681254178,
            -5.970057634678269
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02446628336698,
            -5.973386866421455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0229213309744,
            -5.972319807168897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02159095530301,
            -5.971252745837337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02949847185668,
            -5.9643168353013705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01997126543579,
            -5.962438778547454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03241671526489,
            -5.958155850144448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0279535194641,
            -5.957814381924448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0169671913391,
            -5.958198533657023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01979960405883,
            -5.957643647734798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02306117022094,
            -5.956747292368149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02796607880754,
            -5.953978058879437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03152805237931,
            -5.95295364579001
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0308414068715,
            -5.94700339455658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02204376130265,
            -5.9440154798064535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01354652314348,
            -5.9407287548438825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01015621094865,
            -5.939917741769919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00728088288469,
            -5.934710155686775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00208812623185,
            -5.935307750032316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99238502733597,
            -5.940667803946762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00248080787495,
            -5.93243122479366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00483578739002,
            -5.929123087847154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00714821738251,
            -5.92438685250532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01401467246063,
            -5.920356455281424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03652131955401,
            -5.937729703845773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02600706021563,
            -5.938199239741603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0452545921065,
            -5.934656368101013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04049098889605,
            -5.930910965011394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10428344579118,
            -5.951135250644345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09673034520524,
            -5.95156209107613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0987044510402,
            -5.948787622345075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09343911233164,
            -5.947453092011416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0978218755659,
            -5.944272394930069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10327212428416,
            -5.941433862215542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09868203049554,
            -5.938702027436922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08902607804193,
            -5.940357748343168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05720043515886,
            -5.94672039810482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06942249023446,
            -5.935247409928561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0824243080355,
            -5.936880634920776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06649208480991,
            -5.932030398620787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0577936997199,
            -5.938079136057576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07578837858968,
            -5.952252294578685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08565441740464,
            -5.947677146893789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06754414213609,
            -5.9462685622587115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02789036405991,
            -5.9273956990513454
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d32e19",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d32e19 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([107.01734712686861, -6.063102633797356]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01382806864108, -6.060371408765812]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01953580942477, -6.060584786219249]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0143001374277, -6.064852317566316]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00962925574854, -6.061996319515085]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0058956207998, -6.060673381404249]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99960153433771, -6.063881471307946]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00008167205773, -6.061365655502099]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00455642574016, -6.056945433737164]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01078987949077, -6.055974559097623]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([106.98496835085085, -6.050335076052998]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01960324944582, -6.056879734659308]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00076341332522, -6.051779955452231]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00148182984181, -6.0567879039891945]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02036458130665, -6.048824027220306]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02010708924122, -6.051128548524389]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01617926105037, -6.052046640573501]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00722043089547, -6.054060480638417]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00837699676444, -6.047909557754354]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01399890685965, -6.04522093260658]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02629855186406, -6.0471501293100385]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0232086470789, -6.043223873059833]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02887347251836, -6.0398950682742045]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02938845664922, -6.043309226759515]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02617854974845, -6.039810513813169]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02089996240714, -6.036722450631682]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03253002069572, -6.033644112819924]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02005238435844, -6.033217336571669]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02437610529044, -6.032619849259669]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03171462915519, -6.029034911562306]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02384428623928, -6.027830732679372]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03096823338284, -6.025355399235041]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01963858250393, -6.026208963767024]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02748723497496, -6.023322727229528]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02059617089073, -6.021925676631213]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02244153069297, -6.020752015795529]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01714311951118, -6.019472081649043]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02368388376819, -6.01720585377409]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02213893137561, -6.012724550757307]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00952182016955, -6.01562673216332]),
            {
              "landcover": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01464483423052, -6.018259696451026]),
            {
              "landcover": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99499523980491, -6.024899745671505]),
            {
              "landcover": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99787056786887, -6.0224243988619754]),
            {
              "landcover": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00444465383804, -6.017900460026904]),
            {
              "landcover": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00519501723768, -6.014678849127562]),
            {
              "landcover": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0024055198622, -6.013025031533047]),
            {
              "landcover": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01107441939833, -6.012470201278073]),
            {
              "landcover": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02193940974914, -6.008543694072955]),
            {
              "landcover": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02399934627257, -6.000789439124947]),
            {
              "landcover": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01490129329406, -6.003862403973979]),
            {
              "landcover": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02708525509921, -5.992653358832485]),
            {
              "landcover": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0269565090665, -5.99034858945291]),
            {
              "landcover": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02433867306796, -5.988598665463423]),
            {
              "landcover": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0174293026456, -5.98787308557946]),
            {
              "landcover": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03373599772245, -5.9756917073100775]),
            {
              "landcover": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03433681254178, -5.970057634678269]),
            {
              "landcover": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02446628336698, -5.973386866421455]),
            {
              "landcover": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0229213309744, -5.972319807168897]),
            {
              "landcover": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02159095530301, -5.971252745837337]),
            {
              "landcover": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02949847185668, -5.9643168353013705]),
            {
              "landcover": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01997126543579, -5.962438778547454]),
            {
              "landcover": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03241671526489, -5.958155850144448]),
            {
              "landcover": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0279535194641, -5.957814381924448]),
            {
              "landcover": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0169671913391, -5.958198533657023]),
            {
              "landcover": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01979960405883, -5.957643647734798]),
            {
              "landcover": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02306117022094, -5.956747292368149]),
            {
              "landcover": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02796607880754, -5.953978058879437]),
            {
              "landcover": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03152805237931, -5.95295364579001]),
            {
              "landcover": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0308414068715, -5.94700339455658]),
            {
              "landcover": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02204376130265, -5.9440154798064535]),
            {
              "landcover": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01354652314348, -5.9407287548438825]),
            {
              "landcover": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01015621094865, -5.939917741769919]),
            {
              "landcover": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00728088288469, -5.934710155686775]),
            {
              "landcover": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00208812623185, -5.935307750032316]),
            {
              "landcover": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99238502733597, -5.940667803946762]),
            {
              "landcover": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00248080787495, -5.93243122479366]),
            {
              "landcover": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00483578739002, -5.929123087847154]),
            {
              "landcover": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00714821738251, -5.92438685250532]),
            {
              "landcover": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01401467246063, -5.920356455281424]),
            {
              "landcover": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03652131955401, -5.937729703845773]),
            {
              "landcover": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02600706021563, -5.938199239741603]),
            {
              "landcover": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0452545921065, -5.934656368101013]),
            {
              "landcover": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04049098889605, -5.930910965011394]),
            {
              "landcover": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10428344579118, -5.951135250644345]),
            {
              "landcover": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09673034520524, -5.95156209107613]),
            {
              "landcover": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0987044510402, -5.948787622345075]),
            {
              "landcover": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09343911233164, -5.947453092011416]),
            {
              "landcover": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0978218755659, -5.944272394930069]),
            {
              "landcover": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10327212428416, -5.941433862215542]),
            {
              "landcover": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09868203049554, -5.938702027436922]),
            {
              "landcover": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08902607804193, -5.940357748343168]),
            {
              "landcover": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05720043515886, -5.94672039810482]),
            {
              "landcover": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06942249023446, -5.935247409928561]),
            {
              "landcover": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0824243080355, -5.936880634920776]),
            {
              "landcover": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06649208480991, -5.932030398620787]),
            {
              "landcover": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0577936997199, -5.938079136057576]),
            {
              "landcover": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07578837858968, -5.952252294578685]),
            {
              "landcover": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08565441740464, -5.947677146893789]),
            {
              "landcover": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06754414213609, -5.9462685622587115]),
            {
              "landcover": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02789036405991, -5.9273956990513454]),
            {
              "landcover": 0,
              "system:index": "99"
            })]),
    Mangrove2000 = ui.import && ui.import("Mangrove2000", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.0092188872352,
            -5.920465674847059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01761315261813,
            -5.926655188658117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0259482411754,
            -5.926665583729904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03383822213365,
            -5.928713064601328
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05226526215097,
            -5.9278234282763105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05990637421081,
            -5.929979607828483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.052014395036,
            -5.930583373289479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03927826079476,
            -5.932524504949141
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02242325934517,
            -5.922558620046261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02412540231275,
            -5.932856045659134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99112681373782,
            -5.938383067891603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99651634442948,
            -5.9402608446403375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99840356908983,
            -5.940047008673596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00004145164098,
            -5.939146975136622
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01667366472688,
            -5.963795147023268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0172742440573,
            -5.967819908883181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01536830439962,
            -5.975774485598722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01514881155376,
            -5.978682773366008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01511452140934,
            -5.979851573172319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01641103570576,
            -5.9805497391678335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01456567590351,
            -5.981168624480586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01472698100834,
            -5.981612474739195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0145291338685,
            -5.9827595731910055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01691330604412,
            -5.98444512118546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01850932752437,
            -5.984863114732966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01888420545147,
            -5.986082511777278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01838106995109,
            -5.985434024902161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01125945094617,
            -5.9876954995569935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01237374781371,
            -5.990619696444011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0107848560918,
            -5.991209290376506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00975914498646,
            -5.992621885335083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00920138711902,
            -5.994780190580507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00921211595508,
            -5.995516431434101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00786963219552,
            -5.997677823975547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00791789510427,
            -5.996728916859259
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01371483434626,
            -5.99993505255927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01186947454401,
            -5.999694976074416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00981698546991,
            -5.999289513326587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99655457658548,
            -6.006470720782283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99708747181339,
            -6.005327760361153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00302879084055,
            -6.01429917983824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9951991746735,
            -6.0139734782177365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00005788208958,
            -6.016465754446233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99862009658176,
            -6.015948248741185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99463399129364,
            -6.015964353256704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99517043309662,
            -6.017614364846338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9987309323948,
            -6.020250141500337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99625631596257,
            -6.026799754913924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99848869845742,
            -6.0169530141231204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00715405055226,
            -6.022441510290613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00950367594626,
            -6.02109216713236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00900707734682,
            -6.023577936630916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00977231190342,
            -6.02188752028254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01166805311664,
            -6.020434745744764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01276651537079,
            -6.024377521677974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01314036691359,
            -6.0235715783689505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01392724318681,
            -6.022647870318029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01497243072657,
            -6.0215336766626395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01635319957299,
            -6.025875229946272
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01441128024621,
            -6.02843591706203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01278830967223,
            -6.024625474938898
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01713134121104,
            -6.031070759585616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01573401935194,
            -6.032123715455781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0144330880823,
            -6.037368963026595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01283251357653,
            -6.036217511315432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00566769418063,
            -6.046005383459463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00635502666924,
            -6.0457661821394835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.006739981873,
            -6.068006899935589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00664878676649,
            -6.067658134062802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00107194840137,
            -6.065903718367778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99888362297108,
            -6.057497346101771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99902662567727,
            -6.057200074405414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99850653478984,
            -6.055900884650396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99903951144368,
            -6.056054053731769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9991146132961,
            -6.0565554946238045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02206165030107,
            -6.024015530630059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0121727993645,
            -6.021774877665195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01042364985244,
            -6.0234045157740965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99783615210123,
            -6.007000487721397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99685244574226,
            -6.0057240663484786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00899364788452,
            -5.998860285596717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01024059644341,
            -5.992029164679126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01085853552551,
            -5.987168784553957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01460386342113,
            -5.979732015948541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00138900534728,
            -5.939996069355745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0005792665744,
            -5.9391232930045845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9918495520706,
            -5.938135371779709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00845053120398,
            -5.922048434430075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02431542596628,
            -5.924993828007233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02749292452611,
            -5.928313822354723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02631444371102,
            -5.93042822576567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05264391197734,
            -5.929289360976469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0508545813754,
            -5.9273516001292155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07052854082822,
            -5.933381713200227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01489539651551,
            -5.976605038187491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01862525060375,
            -5.986867219111172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02018274069911,
            -5.985429466699964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01865826870771,
            -5.98743862779626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0166292131513,
            -5.9896126196151185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99487353954827,
            -6.016833802315214
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#32ff46",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #32ff46 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([107.0092188872352, -5.920465674847059]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01761315261813, -5.926655188658117]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0259482411754, -5.926665583729904]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03383822213365, -5.928713064601328]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05226526215097, -5.9278234282763105]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05990637421081, -5.929979607828483]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.052014395036, -5.930583373289479]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03927826079476, -5.932524504949141]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02242325934517, -5.922558620046261]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02412540231275, -5.932856045659134]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99112681373782, -5.938383067891603]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99651634442948, -5.9402608446403375]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99840356908983, -5.940047008673596]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00004145164098, -5.939146975136622]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01667366472688, -5.963795147023268]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0172742440573, -5.967819908883181]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01536830439962, -5.975774485598722]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01514881155376, -5.978682773366008]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01511452140934, -5.979851573172319]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01641103570576, -5.9805497391678335]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01456567590351, -5.981168624480586]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01472698100834, -5.981612474739195]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0145291338685, -5.9827595731910055]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01691330604412, -5.98444512118546]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01850932752437, -5.984863114732966]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01888420545147, -5.986082511777278]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01838106995109, -5.985434024902161]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01125945094617, -5.9876954995569935]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01237374781371, -5.990619696444011]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0107848560918, -5.991209290376506]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00975914498646, -5.992621885335083]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00920138711902, -5.994780190580507]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00921211595508, -5.995516431434101]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00786963219552, -5.997677823975547]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00791789510427, -5.996728916859259]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01371483434626, -5.99993505255927]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01186947454401, -5.999694976074416]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00981698546991, -5.999289513326587]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99655457658548, -6.006470720782283]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99708747181339, -6.005327760361153]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00302879084055, -6.01429917983824]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9951991746735, -6.0139734782177365]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00005788208958, -6.016465754446233]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99862009658176, -6.015948248741185]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99463399129364, -6.015964353256704]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99517043309662, -6.017614364846338]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9987309323948, -6.020250141500337]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99625631596257, -6.026799754913924]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99848869845742, -6.0169530141231204]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00715405055226, -6.022441510290613]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00950367594626, -6.02109216713236]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00900707734682, -6.023577936630916]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00977231190342, -6.02188752028254]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01166805311664, -6.020434745744764]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01276651537079, -6.024377521677974]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01314036691359, -6.0235715783689505]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01392724318681, -6.022647870318029]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01497243072657, -6.0215336766626395]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01635319957299, -6.025875229946272]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01441128024621, -6.02843591706203]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01278830967223, -6.024625474938898]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01713134121104, -6.031070759585616]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01573401935194, -6.032123715455781]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0144330880823, -6.037368963026595]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01283251357653, -6.036217511315432]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00566769418063, -6.046005383459463]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00635502666924, -6.0457661821394835]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([107.006739981873, -6.068006899935589]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00664878676649, -6.067658134062802]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00107194840137, -6.065903718367778]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99888362297108, -6.057497346101771]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99902662567727, -6.057200074405414]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99850653478984, -6.055900884650396]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99903951144368, -6.056054053731769]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9991146132961, -6.0565554946238045]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02206165030107, -6.024015530630059]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0121727993645, -6.021774877665195]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01042364985244, -6.0234045157740965]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99783615210123, -6.007000487721397]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99685244574226, -6.0057240663484786]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00899364788452, -5.998860285596717]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01024059644341, -5.992029164679126]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01085853552551, -5.987168784553957]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01460386342113, -5.979732015948541]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00138900534728, -5.939996069355745]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0005792665744, -5.9391232930045845]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9918495520706, -5.938135371779709]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00845053120398, -5.922048434430075]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02431542596628, -5.924993828007233]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02749292452611, -5.928313822354723]),
            {
              "landcover": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02631444371102, -5.93042822576567]),
            {
              "landcover": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05264391197734, -5.929289360976469]),
            {
              "landcover": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0508545813754, -5.9273516001292155]),
            {
              "landcover": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07052854082822, -5.933381713200227]),
            {
              "landcover": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01489539651551, -5.976605038187491]),
            {
              "landcover": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01862525060375, -5.986867219111172]),
            {
              "landcover": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02018274069911, -5.985429466699964]),
            {
              "landcover": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01865826870771, -5.98743862779626]),
            {
              "landcover": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0166292131513, -5.9896126196151185]),
            {
              "landcover": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99487353954827, -6.016833802315214]),
            {
              "landcover": 1,
              "system:index": "99"
            })]),
    NonMangrove1990 = ui.import && ui.import("NonMangrove1990", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.01467933159269,
            -6.065237610094648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01373519401945,
            -6.064181399984824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01124610405363,
            -6.0641707311852775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00862826805509,
            -6.064394775931326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01670970934869,
            -6.063676258328479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01495018023492,
            -6.061371790569695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.011903190794,
            -6.059408717678619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01737489718438,
            -6.060027513164964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02046480196954,
            -6.059792797719178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00804080981256,
            -6.058917948340185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99471559542657,
            -6.053476780133713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00104560870172,
            -6.052338348989212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00799789446832,
            -6.055240318304098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01170861744349,
            -6.05673397290351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01197027287505,
            -6.050051030823472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02038168034575,
            -6.050456455659649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02196954808257,
            -6.055843792102518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99557661137602,
            -6.050125196994578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02859996876738,
            -6.045251692110587
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02025769082314,
            -6.041299353489789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03077195016152,
            -6.039464239167317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02635166970498,
            -6.039080144684864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02394841042764,
            -6.0378851823308075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02502129403359,
            -6.043390522692752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01918480721719,
            -6.045780420458895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02917658272057,
            -6.037884583800364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02343912980116,
            -6.030489878662244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02806829404966,
            -6.033819283283551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0324830857619,
            -6.030080511660009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0278134281422,
            -6.020569053012066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01987408945811,
            -6.021614678595657
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0042881332465,
            -6.017125858988191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99720710144719,
            -6.023228908379392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00471728668889,
            -6.014138327307431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0103391967841,
            -6.0138395732365835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01845019684514,
            -6.010211832140457
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02275464259677,
            -6.003596477306048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.026037666431,
            -5.994740706597128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0252651902347,
            -5.989362916806355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01684536477123,
            -5.995361909184085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99857881260453,
            -6.004355364302212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01342899784123,
            -6.01627226952809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02261288150822,
            -6.0157601216017245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02254050613313,
            -5.971733375455669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02689641357331,
            -5.969791320202124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03380578399567,
            -5.975468077741665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03423493743806,
            -5.969330213408878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03268998504548,
            -5.958340344697637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01736920715241,
            -5.95808424363861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02075951934724,
            -5.957529357600894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02136033416657,
            -5.960645248851932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03127329455556,
            -5.953362667047514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03071539508046,
            -5.946874677970106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02530806170644,
            -5.946789309182471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01708320489074,
            -5.942110557815905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0095706500841,
            -5.935233554840212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99977207968668,
            -5.934249206933714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00689602683023,
            -5.929596482056043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01002884695963,
            -5.92622429912915
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0272028921018,
            -5.925593660740443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03644458778052,
            -5.93760806296878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0359725189939,
            -5.933296850089105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02828707540417,
            -5.940948224368866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05558483105708,
            -5.927868331705854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04551574656253,
            -5.934609192746263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06698962311438,
            -5.931537108650747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06282683472327,
            -5.932582904349637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0647818020594,
            -5.936807658221028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06991018569587,
            -5.935249647274407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09670257758832,
            -5.9539361059045985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10369777869916,
            -5.951801909650122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10773182105756,
            -5.947490807939625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08309841346478,
            -5.948109730560296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.10039329719281,
            -5.943265317296419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.09940624427533,
            -5.937887022541446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.08998632621503,
            -5.937596217326077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.07161891749149,
            -5.935910574442206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06241081311786,
            -5.946026166877671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05565410746873,
            -5.9406045365098015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0792726022981,
            -5.9353145682003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.04047867583022,
            -5.931166921602503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03469139879745,
            -5.92610871802474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01973521797197,
            -5.9342491139764695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0305400085508,
            -5.9668212677643195
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02545324216426,
            -5.978593181271063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02501318609228,
            -6.026696679343919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02253272399615,
            -6.032848207413699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02436125474162,
            -6.046644377746724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02573454575725,
            -6.047199173046485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01520245051263,
            -6.05133462492976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01215546107171,
            -6.0460427485931385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00155040033917,
            -6.058083292431158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.03033271056671,
            -6.024103113543827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0287454276815,
            -6.023549221559431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02271582181602,
            -6.024594841405072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02305988099873,
            -6.0126889243979775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02005580690205,
            -6.0117713196418405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02005580690205,
            -6.0117713196418405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00593665864766,
            -6.011045770599474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01167786162723,
            -6.001197587180235
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ff2b03",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff2b03 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([107.01467933159269, -6.065237610094648]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01373519401945, -6.064181399984824]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01124610405363, -6.0641707311852775]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00862826805509, -6.064394775931326]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01670970934869, -6.063676258328479]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01495018023492, -6.061371790569695]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.011903190794, -6.059408717678619]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01737489718438, -6.060027513164964]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02046480196954, -6.059792797719178]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00804080981256, -6.058917948340185]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99471559542657, -6.053476780133713]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00104560870172, -6.052338348989212]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00799789446832, -6.055240318304098]),
            {
              "landcover": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01170861744349, -6.05673397290351]),
            {
              "landcover": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01197027287505, -6.050051030823472]),
            {
              "landcover": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02038168034575, -6.050456455659649]),
            {
              "landcover": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02196954808257, -6.055843792102518]),
            {
              "landcover": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99557661137602, -6.050125196994578]),
            {
              "landcover": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02859996876738, -6.045251692110587]),
            {
              "landcover": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02025769082314, -6.041299353489789]),
            {
              "landcover": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03077195016152, -6.039464239167317]),
            {
              "landcover": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02635166970498, -6.039080144684864]),
            {
              "landcover": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02394841042764, -6.0378851823308075]),
            {
              "landcover": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02502129403359, -6.043390522692752]),
            {
              "landcover": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01918480721719, -6.045780420458895]),
            {
              "landcover": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02917658272057, -6.037884583800364]),
            {
              "landcover": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02343912980116, -6.030489878662244]),
            {
              "landcover": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02806829404966, -6.033819283283551]),
            {
              "landcover": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0324830857619, -6.030080511660009]),
            {
              "landcover": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0278134281422, -6.020569053012066]),
            {
              "landcover": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01987408945811, -6.021614678595657]),
            {
              "landcover": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0042881332465, -6.017125858988191]),
            {
              "landcover": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99720710144719, -6.023228908379392]),
            {
              "landcover": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00471728668889, -6.014138327307431]),
            {
              "landcover": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0103391967841, -6.0138395732365835]),
            {
              "landcover": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01845019684514, -6.010211832140457]),
            {
              "landcover": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02275464259677, -6.003596477306048]),
            {
              "landcover": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([107.026037666431, -5.994740706597128]),
            {
              "landcover": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0252651902347, -5.989362916806355]),
            {
              "landcover": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01684536477123, -5.995361909184085]),
            {
              "landcover": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99857881260453, -6.004355364302212]),
            {
              "landcover": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01342899784123, -6.01627226952809]),
            {
              "landcover": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02261288150822, -6.0157601216017245]),
            {
              "landcover": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02254050613313, -5.971733375455669]),
            {
              "landcover": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02689641357331, -5.969791320202124]),
            {
              "landcover": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03380578399567, -5.975468077741665]),
            {
              "landcover": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03423493743806, -5.969330213408878]),
            {
              "landcover": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03268998504548, -5.958340344697637]),
            {
              "landcover": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01736920715241, -5.95808424363861]),
            {
              "landcover": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02075951934724, -5.957529357600894]),
            {
              "landcover": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02136033416657, -5.960645248851932]),
            {
              "landcover": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03127329455556, -5.953362667047514]),
            {
              "landcover": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03071539508046, -5.946874677970106]),
            {
              "landcover": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02530806170644, -5.946789309182471]),
            {
              "landcover": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01708320489074, -5.942110557815905]),
            {
              "landcover": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0095706500841, -5.935233554840212]),
            {
              "landcover": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99977207968668, -5.934249206933714]),
            {
              "landcover": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00689602683023, -5.929596482056043]),
            {
              "landcover": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01002884695963, -5.92622429912915]),
            {
              "landcover": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0272028921018, -5.925593660740443]),
            {
              "landcover": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03644458778052, -5.93760806296878]),
            {
              "landcover": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0359725189939, -5.933296850089105]),
            {
              "landcover": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02828707540417, -5.940948224368866]),
            {
              "landcover": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05558483105708, -5.927868331705854]),
            {
              "landcover": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04551574656253, -5.934609192746263]),
            {
              "landcover": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06698962311438, -5.931537108650747]),
            {
              "landcover": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06282683472327, -5.932582904349637]),
            {
              "landcover": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0647818020594, -5.936807658221028]),
            {
              "landcover": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06991018569587, -5.935249647274407]),
            {
              "landcover": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09670257758832, -5.9539361059045985]),
            {
              "landcover": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10369777869916, -5.951801909650122]),
            {
              "landcover": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10773182105756, -5.947490807939625]),
            {
              "landcover": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08309841346478, -5.948109730560296]),
            {
              "landcover": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.10039329719281, -5.943265317296419]),
            {
              "landcover": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([107.09940624427533, -5.937887022541446]),
            {
              "landcover": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.08998632621503, -5.937596217326077]),
            {
              "landcover": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.07161891749149, -5.935910574442206]),
            {
              "landcover": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06241081311786, -5.946026166877671]),
            {
              "landcover": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05565410746873, -5.9406045365098015]),
            {
              "landcover": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0792726022981, -5.9353145682003]),
            {
              "landcover": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.04047867583022, -5.931166921602503]),
            {
              "landcover": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03469139879745, -5.92610871802474]),
            {
              "landcover": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01973521797197, -5.9342491139764695]),
            {
              "landcover": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0305400085508, -5.9668212677643195]),
            {
              "landcover": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02545324216426, -5.978593181271063]),
            {
              "landcover": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02501318609228, -6.026696679343919]),
            {
              "landcover": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02253272399615, -6.032848207413699]),
            {
              "landcover": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02436125474162, -6.046644377746724]),
            {
              "landcover": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02573454575725, -6.047199173046485]),
            {
              "landcover": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01520245051263, -6.05133462492976]),
            {
              "landcover": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01215546107171, -6.0460427485931385]),
            {
              "landcover": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00155040033917, -6.058083292431158]),
            {
              "landcover": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.03033271056671, -6.024103113543827]),
            {
              "landcover": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0287454276815, -6.023549221559431]),
            {
              "landcover": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02271582181602, -6.024594841405072]),
            {
              "landcover": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02305988099873, -6.0126889243979775]),
            {
              "landcover": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02005580690205, -6.0117713196418405]),
            {
              "landcover": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02005580690205, -6.0117713196418405]),
            {
              "landcover": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00593665864766, -6.011045770599474]),
            {
              "landcover": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01167786162723, -6.001197587180235]),
            {
              "landcover": 0,
              "system:index": "99"
            })]),
    Mangrove1990 = ui.import && ui.import("Mangrove1990", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.01018024868083,
            -6.065522708026338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00778129620332,
            -6.067394090819306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00826945824403,
            -6.0670926989468335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99936097555042,
            -6.0544543564267075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00785125745466,
            -6.051411040104198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01070186456974,
            -6.038155054085244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01015610964082,
            -6.037845771593351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0093097311247,
            -6.037911015425603
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0112698553522,
            -6.037936156184929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01230987039084,
            -6.036760490486473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01284631219382,
            -6.036195015136818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0142194773036,
            -6.037081586877645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01445509726778,
            -6.037404634093595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01590753216641,
            -6.033815414903602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01560965251831,
            -6.032351698939412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01552965739218,
            -6.030206946979083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01691599369445,
            -6.030508200165758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01775462167555,
            -6.030894231749226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01417900193793,
            -6.0282972229261365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01563035834867,
            -6.026741829967724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01447691463468,
            -6.025942644257842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01587568663595,
            -6.026006661575044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01742898192056,
            -6.02530077842194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01927597326514,
            -6.0250967599603795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02200770818845,
            -6.024050076335733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01277128363749,
            -6.024813077715523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01263717318675,
            -6.023957114268416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01409496697987,
            -6.022252097825407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01516785058583,
            -6.021473214567398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01041322850526,
            -6.023480332435801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00942223139168,
            -6.021530876497795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00926666326882,
            -6.019706364961528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00810566585537,
            -6.023715138051252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00619986843881,
            -6.02420569286761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00716809527329,
            -6.022435142517733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99983261960172,
            -6.024609817634581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9984037465589,
            -6.0250900512435015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99495718538888,
            -6.022733648612628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99732065403792,
            -6.0215727174072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99496069747723,
            -6.020831152415435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99820703305743,
            -6.019647104104248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00078345262907,
            -6.018139372387423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99515606159072,
            -6.017573456847016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00001934528751,
            -6.016701287667854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99898401260776,
            -6.016271830663667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9946992239518,
            -6.015484081058243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9975524678541,
            -6.013760888487088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.9951758964432,
            -6.013981713693862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99773569058844,
            -6.013021500975828
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99650297868469,
            -6.009158080533055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99651786298017,
            -6.006190511543361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00021692505521,
            -6.004027265349558
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00874353420063,
            -5.999942629555923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00918341647908,
            -5.999062348606797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00792659494067,
            -5.997701489451707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00990855391026,
            -5.9926108813113075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0113440556598,
            -5.99071053194462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01248523438397,
            -5.989835772549015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01082836382406,
            -5.988035324425191
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01086471922962,
            -5.9871720710605345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01669804363338,
            -5.984679532104228
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.0145834201947,
            -5.9814434112202655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01616592351348,
            -5.980605782214101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01381082453857,
            -5.981491488898889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01510434329676,
            -5.9763336055492555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02021588440566,
            -5.971695449786341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01702150606846,
            -5.96672796720432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00156292615375,
            -5.939889501280474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99975467719766,
            -5.94000533153478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99099306117049,
            -5.936741234702075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99556322592784,
            -5.93422349138227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00348790837913,
            -5.929333818737873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01131365714966,
            -5.9231506598507755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01242865545491,
            -5.924149590209178
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01351763231496,
            -5.925013984083593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01605614764405,
            -5.926872854518276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01958313818928,
            -5.929026609186106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02227578598266,
            -5.9322578354541795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02074620283024,
            -5.921235115549677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02263960883406,
            -5.92175526880283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02382310155036,
            -5.9246924201540505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02365302035555,
            -5.927251944290383
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.02650962521746,
            -5.930451790466692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05173272521697,
            -5.931109733348644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05279520697111,
            -5.929274211803637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05144763383511,
            -5.927603063269402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05004719883314,
            -5.927123417313899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05358551092036,
            -5.927606040284345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06012934395952,
            -5.931832127877616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06061163784003,
            -5.930114316466265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06523053325145,
            -5.931388064852139
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.06282597662072,
            -5.931024368160721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.05085610396151,
            -5.932535183481008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            106.99184638871616,
            -5.935101395858813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.00406182138641,
            -5.940595110047165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01719168770724,
            -5.962528506000202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01933901767735,
            -5.984663609025765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01833594887394,
            -5.9853809727726475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01904984016781,
            -5.98881098695184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            107.01883794565563,
            -5.988242794183694
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#09c224",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #09c224 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([107.01018024868083, -6.065522708026338]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00778129620332, -6.067394090819306]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00826945824403, -6.0670926989468335]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99936097555042, -6.0544543564267075]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00785125745466, -6.051411040104198]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01070186456974, -6.038155054085244]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01015610964082, -6.037845771593351]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0093097311247, -6.037911015425603]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0112698553522, -6.037936156184929]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01230987039084, -6.036760490486473]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01284631219382, -6.036195015136818]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0142194773036, -6.037081586877645]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01445509726778, -6.037404634093595]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01590753216641, -6.033815414903602]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01560965251831, -6.032351698939412]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01552965739218, -6.030206946979083]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01691599369445, -6.030508200165758]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01775462167555, -6.030894231749226]),
            {
              "landcover": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01417900193793, -6.0282972229261365]),
            {
              "landcover": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01563035834867, -6.026741829967724]),
            {
              "landcover": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01447691463468, -6.025942644257842]),
            {
              "landcover": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01587568663595, -6.026006661575044]),
            {
              "landcover": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01742898192056, -6.02530077842194]),
            {
              "landcover": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01927597326514, -6.0250967599603795]),
            {
              "landcover": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02200770818845, -6.024050076335733]),
            {
              "landcover": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01277128363749, -6.024813077715523]),
            {
              "landcover": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01263717318675, -6.023957114268416]),
            {
              "landcover": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01409496697987, -6.022252097825407]),
            {
              "landcover": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01516785058583, -6.021473214567398]),
            {
              "landcover": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01041322850526, -6.023480332435801]),
            {
              "landcover": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00942223139168, -6.021530876497795]),
            {
              "landcover": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00926666326882, -6.019706364961528]),
            {
              "landcover": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00810566585537, -6.023715138051252]),
            {
              "landcover": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00619986843881, -6.02420569286761]),
            {
              "landcover": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00716809527329, -6.022435142517733]),
            {
              "landcover": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99983261960172, -6.024609817634581]),
            {
              "landcover": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9984037465589, -6.0250900512435015]),
            {
              "landcover": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99495718538888, -6.022733648612628]),
            {
              "landcover": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99732065403792, -6.0215727174072]),
            {
              "landcover": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99496069747723, -6.020831152415435]),
            {
              "landcover": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99820703305743, -6.019647104104248]),
            {
              "landcover": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00078345262907, -6.018139372387423]),
            {
              "landcover": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99515606159072, -6.017573456847016]),
            {
              "landcover": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00001934528751, -6.016701287667854]),
            {
              "landcover": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99898401260776, -6.016271830663667]),
            {
              "landcover": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9946992239518, -6.015484081058243]),
            {
              "landcover": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9975524678541, -6.013760888487088]),
            {
              "landcover": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([106.9951758964432, -6.013981713693862]),
            {
              "landcover": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99773569058844, -6.013021500975828]),
            {
              "landcover": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99650297868469, -6.009158080533055]),
            {
              "landcover": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99651786298017, -6.006190511543361]),
            {
              "landcover": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00021692505521, -6.004027265349558]),
            {
              "landcover": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00874353420063, -5.999942629555923]),
            {
              "landcover": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00918341647908, -5.999062348606797]),
            {
              "landcover": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00792659494067, -5.997701489451707]),
            {
              "landcover": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00990855391026, -5.9926108813113075]),
            {
              "landcover": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0113440556598, -5.99071053194462]),
            {
              "landcover": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01248523438397, -5.989835772549015]),
            {
              "landcover": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01082836382406, -5.988035324425191]),
            {
              "landcover": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01086471922962, -5.9871720710605345]),
            {
              "landcover": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01669804363338, -5.984679532104228]),
            {
              "landcover": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([107.0145834201947, -5.9814434112202655]),
            {
              "landcover": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01616592351348, -5.980605782214101]),
            {
              "landcover": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01381082453857, -5.981491488898889]),
            {
              "landcover": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01510434329676, -5.9763336055492555]),
            {
              "landcover": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02021588440566, -5.971695449786341]),
            {
              "landcover": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01702150606846, -5.96672796720432]),
            {
              "landcover": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00156292615375, -5.939889501280474]),
            {
              "landcover": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99975467719766, -5.94000533153478]),
            {
              "landcover": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99099306117049, -5.936741234702075]),
            {
              "landcover": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99556322592784, -5.93422349138227]),
            {
              "landcover": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00348790837913, -5.929333818737873]),
            {
              "landcover": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01131365714966, -5.9231506598507755]),
            {
              "landcover": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01242865545491, -5.924149590209178]),
            {
              "landcover": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01351763231496, -5.925013984083593]),
            {
              "landcover": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01605614764405, -5.926872854518276]),
            {
              "landcover": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01958313818928, -5.929026609186106]),
            {
              "landcover": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02227578598266, -5.9322578354541795]),
            {
              "landcover": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02074620283024, -5.921235115549677]),
            {
              "landcover": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02263960883406, -5.92175526880283]),
            {
              "landcover": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02382310155036, -5.9246924201540505]),
            {
              "landcover": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02365302035555, -5.927251944290383]),
            {
              "landcover": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([107.02650962521746, -5.930451790466692]),
            {
              "landcover": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05173272521697, -5.931109733348644]),
            {
              "landcover": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05279520697111, -5.929274211803637]),
            {
              "landcover": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05144763383511, -5.927603063269402]),
            {
              "landcover": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05004719883314, -5.927123417313899]),
            {
              "landcover": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05358551092036, -5.927606040284345]),
            {
              "landcover": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06012934395952, -5.931832127877616]),
            {
              "landcover": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06061163784003, -5.930114316466265]),
            {
              "landcover": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06523053325145, -5.931388064852139]),
            {
              "landcover": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([107.06282597662072, -5.931024368160721]),
            {
              "landcover": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([107.05085610396151, -5.932535183481008]),
            {
              "landcover": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([106.99184638871616, -5.935101395858813]),
            {
              "landcover": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([107.00406182138641, -5.940595110047165]),
            {
              "landcover": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01719168770724, -5.962528506000202]),
            {
              "landcover": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01933901767735, -5.984663609025765]),
            {
              "landcover": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01833594887394, -5.9853809727726475]),
            {
              "landcover": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01904984016781, -5.98881098695184]),
            {
              "landcover": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([107.01883794565563, -5.988242794183694]),
            {
              "landcover": 1,
              "system:index": "99"
            })]);
///// MANGROVE DETECTION /////
///// Mangrove Muaragembong /////
// 1. Input Images
var geometry = AOI;
var SRTM = ee.Image("USGS/SRTMGL1_003"); // Data elevasi SRTM
var L8_20 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR") // Year 2020
         .filterBounds(AOI)
         .filterDate('2020-01-01','2020-12-30')
         .sort('CLOUD_COVER')
         .first();
var L5_10 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR") // Year 2010
         .filterBounds(AOI)
         .filterDate('2010-01-01','2010-12-30')
         .sort('CLOUD_COVER')
         .first();
var L7_00 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR") // Year 1999
         .filterBounds(AOI)
         .filterDate('2000-01-01','2000-12-30')
         .sort('CLOUD_COVER')
         .first();
var L5_90 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR") // Year 1990
         .filterBounds(AOI)
         .filterDate('1990-01-01','1990-12-30')
         .sort('CLOUD_COVER')
         .first();
/*
// 2. Print Selected Imagery to Check Data Aquisition
print('2020 Selected Imagery', L8_20);
print('2010 Selected Imagery', L5_10);
print('2000 Selected Imagery', L7_00);
print('1990 Selected Imagery', L5_90);
*/
// 3. Clip with AOI
var Landsat_2020 = L8_20.clip(AOI);
var Landsat_2010 = L5_10.clip(AOI);
var Landsat_2000 = L7_00.clip(AOI);
var Landsat_1990 = L5_90.clip(AOI);
/*
// ADD MAP
// FCC Image (RGB = SWIR, NIR, GREEN)
Map.addLayer(Landsat_2020, visParImg, 'Image Composite 2020');
Map.addLayer(Landsat_2010, visPar, 'Image Composite 2010');
Map.addLayer(Landsat_2000, visPar, 'Image Composite 2000');
Map.addLayer(Landsat_1990, visPar, 'Image Composite 1990');
*/
// 4. Cloud Masking
  //-----------------------------Year 2020-----------------------------
     function maskClouds(Landsat_2020) {
     var cloudShadowBitMask_20 = ee.Number(2).pow(3).int();
     var cloudsBitMask_20 = ee.Number(2).pow(5).int();
     var qa_20 = Landsat_2020.select('pixel_qa');
     var mask_20 = qa.bitwiseAnd(cloudShadowBitMask_20).eq(0).and(qa_20.bitwiseAnd(cloudsBitMask_20).eq(0)); 
     return Landsat_2020.updateMask(mask_20).divide(10000).copyProperties(Landsat_2020, ["system:time_start"]);
     }
  //-----------------------------Year 2010-----------------------------
    var cloudMaskL5_10 = function(Landsat_2010) {
    var qa_10 = Landsat_2010.select('pixel_qa');
    var cloud_10 = qa_10.bitwiseAnd(1 << 5)
                        .and(qa_10.bitwiseAnd(1 << 7))
                        .or(qa_10.bitwiseAnd(1 << 3));
    var mask2_10 = Landsat_2010.mask().reduce(ee.Reducer.min());
    return Landsat_2010.updateMask(cloud_10.not()).updateMask(mask2_10);
    };
  //-----------------------------Year 2000-----------------------------
    function maskClouds(Landsat_2000) {
    var cloudShadowBitMask_00 = ee.Number(2).pow(3).int();
    var cloudsBitMask_00 = ee.Number(2).pow(5).int();
    var qa_00 = Landsat_2000.select('pixel_qa');
    var mask_00 = qa.bitwiseAnd(cloudShadowBitMask_00).eq(0).and(qa_00.bitwiseAnd(cloudsBitMask_00).eq(0)); 
    return Landsat_2000.updateMask(mask_00).divide(10000).copyProperties(Landsat_2000, ["system:time_start"]);
    }
  //-----------------------------Year 1990-----------------------------
    var cloudMaskL5_90 = function(Landsat_1990) {
    var qa_90 = Landsat_1990.select('pixel_qa');
    var cloud_90 = qa.bitwiseAnd(1 << 5)
                     .and(qa_90.bitwiseAnd(1 << 7))
                     .or(qa_90.bitwiseAnd(1 << 3));
    var mask2_90 = Landsat_1990.mask().reduce(ee.Reducer.min());
    return Landsat_1990.updateMask(cloud_90.not()).updateMask(mask2_90);
    };
// 5. Add Spectral Indices
// p.s. NDBI is used to help idenify nonmangrove (not included as mangrove detection indices)
  //-----------------------------Year 2020-----------------------------
  // NDMI (Normalized Difference Mangrove Index - Shi et al 2016 - New spectral metrics for mangrove forest identification)
  var NDMI = Landsat_2020.normalizedDifference(['B7','B3']);
  // MSAVI2 (Modified Soil Adjusted Vegetation Index)
  var MSAVI = Landsat_2020.expression('(2*NIR+1-sqrt(pow((2*NIR+1),2) - 8*(NIR-RED))/2)',{
  'NIR': Landsat_2020.select('B5'),
  'RED': Landsat_2020.select('B4')
  });
  //Add Additional Bands
  var l8_20 = Landsat_2020.addBands(NDMI.rename('NDMI'))
                          .addBands(MSAVI.rename('MSAVI'));
  //-----------------------------Year 2010-----------------------------
  // NDMI (Normalized Difference Mangrove Index - Shi et al 2016 - New spectral metrics for mangrove forest identification)
  var NDMI = Landsat_2010.normalizedDifference(['B7','B2']);
  // MSAVI (Modified Soil Advance Vegetation Index)
  var MSAVI = Landsat_2010.expression('(2*NIR+1-sqrt(pow((2*NIR+1),2) - 8*(NIR-RED))/2)',{
  'NIR': Landsat_2010.select('B4'),
  'RED': Landsat_2010.select('B2')
  });
  //Add Additional Bands
  var l5_10 = Landsat_2010.addBands(NDMI.rename('NDMI'))
                          .addBands(MSAVI.rename('MSAVI'));
  //-----------------------------Year 2000-----------------------------
  // NDMI (Normalized Difference Mangrove Index - Shi et al 2016 - New spectral metrics for mangrove forest identification)
  var NDMI = Landsat_2000.normalizedDifference(['B7','B2']);
  // MSAVI (Modified Soil Advance Vegetation Index)
  var MSAVI = Landsat_2000.expression('(2*NIR+1-sqrt(pow((2*NIR+1),2) - 8*(NIR-RED))/2)',{
  'NIR': Landsat_2000.select('B4'),
  'RED': Landsat_2000.select('B3')
  });
  //Add Additional Bands
  var l7_00 = Landsat_2000.addBands(NDMI.rename('NDMI'))
                          .addBands(MSAVI.rename('MSAVI'));
  //-----------------------------Year 1990-----------------------------
  // NDMI (Normalized Difference Mangrove Index - Shi et al 2016 - New spectral metrics for mangrove forest identification)
  var NDMI = Landsat_1990.normalizedDifference(['B7','B2']);
  // MSAVI (Modified Soil Advance Vegetation Index)
  var MSAVI = Landsat_1990.expression('(2*NIR+1-sqrt(pow((2*NIR+1),2) - 8*(NIR-RED))/2)',{
  'NIR': Landsat_1990.select('B4'),
  'RED': Landsat_1990.select('B2')
});
  //Add Additional Bands
  var l5_90 = Landsat_1990.addBands(NDMI.rename('NDMI'))
                          .addBands(MSAVI.rename('MSAVI'));
/*                              
// 6. Print Final Image with Additional Bands
print('2020 Final Image with Additional Bands', l8_20);
print('2010 Final Image with Additional Bands', l5_10);
print('2000 Final Image with Additional Bands', l7_00);
print('1990 Final Image with Additional Bands', l5_90);
*/
// 7. Mask to Areas <45 mdpl
  // Create SRTM Mask
     var srtmClip = SRTM.clip(AOI);
     var elevationMask = srtmClip.lt(45);
  //-----------------------------Year 2020-----------------------------
     var NDMIMask = l8_20.select('NDMI').gt((-0.70));
     var MSAVIMask = l8_20.select('MSAVI').gt(0.20);
     var compositeNew_20 = l8_20.updateMask(NDMIMask)
                     .updateMask(MSAVIMask)
                     .updateMask(elevationMask);
  //-----------------------------Year 2010-----------------------------
     var NDMIMask = l5_10.select('NDMI').gt((-0.50));
     var MSAVIMask = l5_10.select('MSAVI').gt(0.20);
     var compositeNew_10 = l5_10.updateMask(NDMIMask)
                                .updateMask(MSAVIMask)
                                .updateMask(elevationMask);
  //-----------------------------Year 2000-----------------------------
     var NDMIMask = l7_00.select('NDMI').gt((-0.50));
     var MSAVIMask = l7_00.select('MSAVI').gt(0.20);
     var compositeNew_00 = l7_00.updateMask(NDMIMask)
                                .updateMask(MSAVIMask)
                                .updateMask(elevationMask);
  //-----------------------------Year 1990-----------------------------
     var NDMIMask = l5_90.select('NDMI').gt((-0.50));
     var MSAVIMask = l5_90.select('MSAVI').gt(0.20);
     var compositeNew_90 = l5_90.updateMask(NDMIMask)
                                .updateMask(MSAVIMask)
                                .updateMask(elevationMask);
// 8. Display Mangrove Image and BuiltUp Image FCC
Map.setCenter(107.0530646,-5.9996482,12.5);
var center = {lon: 107.0530646, lat: -5.9996482, zoom: 12.5};
/*
Map.addLayer(compositeNew_20.clip(AOI), visParam, 'Mangrove Composite 2020');
Map.addLayer(compositeNew_10.clip(AOI), visParMang, 'Mangrove Composite 2010');
Map.addLayer(compositeNew_00.clip(AOI), visParMang, 'Mangrove Composite 2000');
Map.addLayer(compositeNew_90.clip(AOI), visParMang, 'Mangrove Composite 1990');
*/
//===========================================================================================
//=======================LAND COVER CLASSIFICATION USING RANDOM FOREST=======================
//===========================================================================================
// 1. Create Training Data and Train the Classifier (After Making Training Samples)
  //-----------------------------Year 2020-----------------------------
    var classes_20 = Mangrove2020.merge(NonMangrove2020);
    var bands_20 = ['B2','B3','B4','B5','B6','B7','NDMI','MSAVI'];
    var training_20 = compositeNew_20.select(bands_20).sampleRegions({
        collection: classes_20,
       properties: ['landcover'],
         scale: 30 });
    var classifier_20 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_20,
        classProperty: 'landcover',
        inputProperties: bands_20 });
    var classified_20 = compositeNew_20.select(bands_20).classify(classifier_20);
  //-----------------------------Year 2010-----------------------------
    var classes_10 = Mangrove2010.merge(NonMangrove2010);
    var band_10 = ['B1','B2','B3','B4','B5','B6','B7','NDMI','MSAVI'];
    var training_10 = l5_10.select(band_10).sampleRegions({
        collection: classes_10,
        properties: ['landcover'],
       scale: 30 });
    var classifier_10 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_10,
        classProperty: 'landcover',
        inputProperties: band_10 });
    var classified_10 = compositeNew_10.select(band_10).classify(classifier_10);
  //-----------------------------Year 2000-----------------------------
    var classes_00 = Mangrove2000.merge(NonMangrove2000);
    var bands_00 = ['B1','B2','B3','B4','B5','B6','NDMI','MSAVI'];
    var training_00 = l7_00.select(bands_00).sampleRegions({
        collection: classes_00,
        properties: ['landcover'],
        scale: 30 });
    var classifier_00 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_00,
        classProperty: 'landcover',
        inputProperties: bands_00 });
    var classified_00 = compositeNew_00.select(bands_00).classify(classifier_00);
  //-----------------------------Year 1990-----------------------------
    var classes_90 = Mangrove1990.merge(NonMangrove1990);
    var bands_90 = ['B1','B2','B3','B4','B5','B6','B7','NDMI','MSAVI'];
    var training_90 = l5_90.select(bands_90).sampleRegions({
        collection: classes_90,
        properties: ['landcover'],
        scale: 30 });
    var classifier_90 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_90,
        classProperty: 'landcover',
        inputProperties: bands_90 });
    var classified_90 = compositeNew_90.select(bands_90).classify(classifier_90);
// 2. Reduce Noise
  //-----------------------------Year 2020-----------------------------
    var pixelcount_20 = classified_20.connectedPixelCount(100, false); //Create an image that shows the number of pixels each pixel is connected to
    var countmask_20 = pixelcount_20.select(0).gt(25); //filter out all pixels connected to 4 or less 
    var classMask_20 = classified_20.select('classification').gt(0);
    var classed_20 = classified_20.updateMask(countmask_20).updateMask(classMask_20);
  //-----------------------------Year 2010-----------------------------
    var pixelcount_10 = classified_10.connectedPixelCount(100, false); //Create an image that shows the number of pixels each pixel is connected to
    var countmask_10 = pixelcount_10.select(0).gt(25); //filter out all pixels connected to 4 or less 
    var classMask_10 = classified_10.select('classification').gt(0);
    var classed_10 = classified_10.updateMask(countmask_10).updateMask(classMask_10);
  //-----------------------------Year 2000-----------------------------
    var pixelcount_00 = classified_00.connectedPixelCount(100, false); //Create an image that shows the number of pixels each pixel is connected to
    var countmask_00 = pixelcount_00.select(0).gt(25); //filter out all pixels connected to 4 or less 
    var classMask_00 = classified_00.select('classification').gt(0);
    var classed_00 = classified_00.updateMask(countmask_00).updateMask(classMask_00);
  //-----------------------------Year 1990-----------------------------
    var pixelcount_90 = classified_90.connectedPixelCount(100, false); //Create an image that shows the number of pixels each pixel is connected to
    var countmask_90 = pixelcount_90.select(0).gt(25); //filter out all pixels connected to 4 or less 
    var classMask_90 = classified_90.select('classification').gt(0);
    var classed_90 = classified_90.updateMask(countmask_90).updateMask(classMask_90);
// 3. Accuracy Assessment
  //-----------------------------Year 2020-----------------------------
    var sample_rc20 = training_20.randomColumn('rand');
    var filter_20 = sample_rc20.filter(ee.Filter.lt('rand', 0.8));
    var validation_20 = sample_rc20.filter(ee.Filter.gte('rand', 0.8));
    var classifier_20 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_20,
        classProperty: 'landcover',
        inputProperties: bands_20 });
    var confusionMatrix_20 = ee.ConfusionMatrix(validation_20.classify(classifier_20)
                               .errorMatrix({
        actual:'landcover',
        predicted: 'classification'}));
  //-----------------------------Year 2010-----------------------------
    var sample_rc10 = training_10.randomColumn('rand');
    var filter_10 = sample_rc10.filter(ee.Filter.lt('rand', 0.8));
    var validation_10 = sample_rc10.filter(ee.Filter.gte('rand', 0.8));
    var classifier_10 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_10,
        classProperty: 'landcover',
        inputProperties: band_10 });
    var confusionMatrix_10 = ee.ConfusionMatrix(validation_10.classify(classifier_10)
                               .errorMatrix({
        actual:'landcover',
        predicted: 'classification' }));
  //-----------------------------Year 2000-----------------------------
    var sample_rc00 = training_00.randomColumn('rand');
    var filter_00 = sample_rc00.filter(ee.Filter.lt('rand', 0.8));
    var validation_00 = sample_rc00.filter(ee.Filter.gte('rand', 0.8));
    var classifier_00 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_00,
        classProperty: 'landcover',
        inputProperties: bands_00 });
    var confusionMatrix_00 = ee.ConfusionMatrix(validation_00.classify(classifier_00)
                               .errorMatrix({
        actual:'landcover',
        predicted: 'classification' }));
  //-----------------------------Year 1990-----------------------------
    var sample_rc90 = training_90.randomColumn('rand');
    var filter_90 = sample_rc90.filter(ee.Filter.lt('rand', 0.8));
    var validation_90 = sample_rc90.filter(ee.Filter.gte('rand', 0.8));
    var classifier_90 = ee.Classifier.smileRandomForest(100,5).train({
        features: training_90,
        classProperty: 'landcover',
        inputProperties: bands_90 });
   var confusionMatrix_90 = ee.ConfusionMatrix(validation_90.classify(classifier_90)
                              .errorMatrix({
      actual:'landcover',
      predicted: 'classification' }));
// 4. Accuracy Test
/*
// Confusion Matrix
print('2020 Confusion Matrix', confusionMatrix_20);
print('2010 Confusion Matrix', confusionMatrix_10);
print('2000 Confusion Matrix', confusionMatrix_00);
print('1990 Confusion Matrix', confusionMatrix_90);
*/
// 5. Overall Accuracy
print('2020 Overall Accuracy', confusionMatrix_20.accuracy());
print('2010 Overall Accuracy', confusionMatrix_10.accuracy());
print('2000 Overall Accuracy', confusionMatrix_00.accuracy());
print('1990 Overall Accuracy', confusionMatrix_90.accuracy());
// 6. Create Color Palette
// p.s. Mangrove (1), NonMangrove (2)
var palette_20 = ['5a9700','0e76d6'];
var palette_10 = ['24a0ff','0e76d6'];
var palette_00 = ['ff0000','0e76d6'];
var palette_90 = ['872197','0e76d6'];
//  7. Display Classification Result
Map.addLayer(classed_20, {min: 0, max: 4, palette:palette_20}, 'Land Cover Map 2020');
Map.addLayer(classed_10, {min: 0, max: 4, palette:palette_10}, 'Land Cover Map 2010');
Map.addLayer(classed_00, {min: 0, max: 4, palette:palette_00}, 'Land Cover Map 2000');
Map.addLayer(classed_90, {min: 0, max: 4, palette:palette_90}, 'Land Cover Map 1990');
//==============================================================================================
//=======================MANGROVE AREA CALCULATION==============================================
//==============================================================================================
// 1. Count
var total_2020 = classified_20.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:AOI,
      scale: 30,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var total_2010 = classified_10.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:AOI,
      scale: 30,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var total_2000 = classified_00.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:AOI,
      scale: 30,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var total_1990 = classified_90.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:AOI,
      scale: 30,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
// 2. Print
print(total_2020, 'Mangrove Extent 2020 in ha');
print(total_2010, 'Mangrove Extent 2010 in ha');
print(total_2000, 'Mangrove Extent 2000 in ha');
print(total_1990, 'Mangrove Extent 1990 in ha');
/*
//======================================================================================
//=======================EXPORT MAP=====================================================
//======================================================================================
// 1. Mangrove Extent
Export.image.toDrive({
  image: classified_20,
  description: '2020MangroveExtent',
  region: geometry,
  scale: 30,
  maxPixels: 1e13 });
Export.image.toDrive({
  image: classified_10,
  description: '2010MangroveExtent',
  region: geometry,
  scale: 30,
  maxPixels: 1e13 });
Export.image.toDrive({
  image: classified_00,
  description: '2000MangroveExtent',
  region: geometry,
  scale: 30,
  maxPixels: 1e13 });
Export.image.toDrive({
  image: classified_90,
  description: '1990MangroveExtent',
  region: geometry,
  scale: 30,
  maxPixels: 1e13});
// 2. Mangrove and NonMangrove
//-----------------------------Year 2020-----------------------------
Export.table.toAsset({
  collection: NonMangrove2020,
  description:'2020NonMangrove',
  assetId: '2020NonMangrove', });
Export.table.toAsset({
  collection: Mangrove2020,
  description:'2020Mangrove',
  assetId: '2020Mangrove', });
//-----------------------------Year 2010-----------------------------
Export.table.toAsset({
  collection: NonMangrove2010,
  description:'2010NonMangrove',
  assetId: '2010NonMangrove', });
Export.table.toAsset({
  collection: Mangrove2010,
  description:'2010Mangrove',
  assetId: '2010Mangrove', });
//-----------------------------Year 2000-----------------------------
Export.table.toAsset({
  collection: NonMangrove2000,
  description:'2000NonMangrove',
  assetId: '2000NonMangrove', });
Export.table.toAsset({
  collection: Mangrove2000,
  description:'2000Mangrove',
  assetId: '2000Mangrove', });
//-----------------------------Year 1990-----------------------------
Export.table.toAsset({
  collection: NonMangrove1990,
  description:'1990NonMangrove',
  assetId: '1990NonMangrove', });
Export.table.toAsset({
  collection: Mangrove1990,
  description:'1990Mangrove',
  assetId: '1990Mangrove', });
*/
//======================================================================================
//==============================VISUALIZATION===========================================
//======================================================================================
// 1. Legend
   // Decide Panel Position for Legend
      var legend = ui.Panel({
          style: {
          position: 'bottom-right',
          padding: '8px 15px' }});
    // Legend Title
       var legendTitle = ui.Label({
           value: 'Mangrove Extent of Muaragembong, Bekasi',
           style: {
           fontWeight: 'bold',
           fontSize: '15px',
           margin: '0 0 4px 0',
           padding: '0' }});
    // Add Title to Panel
       legend.add(legendTitle);
    // Create Legend Style
       var makeRow = function(color, name) {
          var colorBox = ui.Label({
              style: {
              backgroundColor: '#' + color,
              padding: '8px',
              margin: '0 0 4px 0' }});
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px' }});
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal') });};
    //  Create Legend's Item Palette and Name
    var palette =['5a9700', '24a0ff', 'ff0000','872197'];
    var names = ['Year 2020', 'Year 2010', 'Year 2000', 'Year 1990'];
    for (var i = 0; i < 4; i++) {
      legend.add(makeRow(palette[i], names[i]));
      }  
    // Add the Final Legend Using Panel
    Map.add(legend);
// 2. Map Panel
  var mapPanel = ui.Map();
  ui.root.widgets().reset([mapPanel]);
  ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
  // Add Title and Desc.
  var header = ui.Label('MANGROVE EXTENT DYNAMIC OF MUARAGEMBONG, BEKASI',
                       {fontWeight: 'bold',
                        fontSize: '20px', 
                        color: 'black', 
                        textAlign: 'center'});
  var text = ui.Label(
            'A 30-years mangrove detection and changes analysis of Muaragembong, Bekasi using Normalized Difference Mangrove Index (NDMI) & Modified Soil Adjusted Vegetation Index (MSAVI2).',
            {fontSize: '14px', textAlign: 'justify'});
  var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
// 3. Chart
// Mangrove Area Chart Calculation
  //-----------------------------Year 2020-----------------------------
    var areaImage_2020 = ee.Image.pixelArea().divide(10000).addBands(
                         classified_20);
    var get2020 = areaImage_2020.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class',
                        }),
                      geometry:geometry,
                      crs: 'EPSG:32748', // WGS UTM Zona 48S
                      scale: 30,
                      maxPixels: 1e13 }); 
    var list_20 = ee.List(get2020.get('groups'));
    var classes_20 = list_20.map(function(d) {
      return ee.Dictionary(d).get('class'); });
    var sums_20 = list_20.map(function(d) {
      return ee.Dictionary(d).get('sum'); });
    var MAchart_20 = sums_20.get(0);
  //-----------------------------Year 2010-----------------------------
    var areaImage_2010 = ee.Image.pixelArea().divide(10000).addBands(
                         classified_10);
    var get2010 = areaImage_2010.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class', }),
                      geometry:geometry,
                      crs: 'EPSG:32748', // WGS UTM Zona 48S
                      scale: 30,
                      maxPixels: 1e13 }); 
    var list_10 = ee.List(get2010.get('groups'));
    var classes_10 = list_10.map(function(d) {
      return ee.Dictionary(d).get('class'); });
    var sums_10 = list_10.map(function(d) {
      return ee.Dictionary(d).get('sum'); });
    var MAchart_10 = sums_10.get(0);
 //-----------------------------Year 2000-----------------------------
    var areaImage_2000 = ee.Image.pixelArea().divide(10000).addBands(
                         classified_00);
    var get2000 = areaImage_2000.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class', }),
                      geometry:geometry,
                      crs: 'EPSG:32748', // WGS UTM Zona 48S
                      scale: 30,
                      maxPixels: 1e13 }); 
    var list_00 = ee.List(get2000.get('groups'));
    var classes_00 = list_00.map(function(d) {
      return ee.Dictionary(d).get('class'); });
    var sums_00 = list_00.map(function(d) {
      return ee.Dictionary(d).get('sum'); });
    var MAchart_00 = sums_00.get(0);
 //-----------------------------Year 1990-----------------------------
    var areaImage_1990 = ee.Image.pixelArea().divide(10000).addBands(
                         classified_90);
    var get1990 = areaImage_1990.reduceRegion({
                      reducer: ee.Reducer.sum().group({
                        groupField: 1,
                        groupName: 'class', }),
                      geometry:geometry,
                      crs: 'EPSG:32748', // WGS UTM Zona 48S
                      scale: 30,
                      maxPixels: 1e13 }); 
    var list_90 = ee.List(get1990.get('groups'));
    var classes_90 = list_90.map(function(d) {
      return ee.Dictionary(d).get('class'); });
    var sums_90 = list_90.map(function(d) {
      return ee.Dictionary(d).get('sum'); });
    var MAchart_90 = sums_90.get(0);
// Mangrove Area Chart Visualization
   var dataTable = [[
      {label: 'State', role: 'domain', type: 'string'},
      {label: 'Area (ha)', role: 'data', type: 'number'},
      {label: 'Pop. annotation', role: 'annotation', type: 'string'}
   ],
      ['1990', 596.97, '596.97'],
      ['2000', 377.23, '377.23'],
      ['2010', 394.51, '394.51'],
      ['2020', 1094.36, '1094.36'] ];
   // Define and Print Chart Vis. to Console
      var chart_area_mangrove = ui.Chart(dataTable).setChartType('ColumnChart').setOptions({
          title: 'Mangrove Area of Muaragembong Bekasi',
          legend: {position: 'none'},
          hAxis: {title: 'Year', titleTextStyle: {italic: false, bold: true}},
          vAxis: {title: 'Area (ha)', titleTextStyle: {italic: false, bold: true},min:0},
          colors: ['BLACK'] });
// Mangrove Area Percentage Loss/Gain Chart
   var dataTablePer = [[
      {label: 'State', role: 'domain', type: 'string'},
      {label: 'Total Area Change (%)', role: 'data', type: 'number'},
      {label: 'Pop. annotation', role: 'annotation', type: 'string'}
   ],
      ['90-00', -36.81, '-36.81'],
      ['00-10', 4.58, '4.58'],
      ['10-20', 177.4, '177.4'], ];
  // Define and Print Chart Vis. to Console
     var chart_per_change = ui.Chart(dataTablePer).setChartType('ColumnChart').setOptions({
         title: 'Decadal Mangrove Area Change of Muaragembong Bekasi',
         legend: {position: 'none'},
         hAxis: {title: 'Period', titleTextStyle: {italic: false, bold: true}},
         vAxis: {title: 'Total Area Change (%)', titleTextStyle: {italic: false, bold: true},min:0},
         colors: ['BLACK'] });
// 4. Legend Panel
  var legendPanel = ui.Panel({
                    style: {
                      fontSize: '12px', 
                      margin: '0 0 0 8px', 
                      padding: '0'}
  });
  var legendTitle = ui.Label(
                    'Legend:',
                    {fontWeight: 'bold', 
                     fontSize: '14px', 
                     margin: '0 0 4px 0', 
                     padding: '0'});
  // Create Legend Style
     var makeRow = function(color, name) {
     var colorBox = ui.Label({
         style: {
         backgroundColor: '#' + color,
        padding: '8px',
        margin: '0 0 4px 0'} });
     var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'} });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal') }); };
// 5. Slider
 // Create Map Options
    var palette2020 =['5a9700'];
    var palette2010 = ['24a0ff'];
    var palette2000 = ['ff0000'];
    var palette1990 = ['872197'];
    var images = {
      '2020: Mangrove Extent' : classed_20.visualize({min: 0, max: 2, palette:palette2020}),
      '2010: Mangrove Extent' : classed_10.visualize({min: 0, max: 2, palette:palette2010}),
      '2000: Mangrove Extent' : classed_00.visualize({min: 0, max: 2, palette:palette2000}),
      '1990: Mangrove Extent' : classed_90.visualize({min: 0, max: 2, palette:palette1990}),
      '2020: Landsat 8 FCC RGB=653': Landsat_2020.select(['B6','B5','B3']).visualize({min:50,max:4690}),
      '2010: Landsat 5 FCC RGB=543': Landsat_2010.select(['B5', 'B4', 'B3']).visualize({min:50,max:4650}),
      '2000: Landsat 7 FCC RGB=543': Landsat_2000.select(['B5', 'B4', 'B3']).visualize({min:50,max:4650}),
      '1990: Landsat 5 FCC RGB=543': Landsat_1990.select(['B5', 'B4', 'B3']).visualize({min:50,max:4650}) };
 // Create the Left Map and Display as Layer 0
    var leftMap = ui.Map(center);
    leftMap.setControlVisibility(false);
    var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
 // Create the Right Map and Display as Layer 1
    var rightMap = ui.Map(center);
    rightMap.setControlVisibility(false);
    var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Add Layer Selection Widget
    function addLayerSelector(mapToChange, defaultValue, position) {
    var label = ui.Label('Select Image');
    function updateMap(selection) {
             mapToChange.layers().set(0, ui.Map.Layer(images[selection])); }
 // Add Dropdown
    var select = ui.Select({items: Object.keys(images), onChange: updateMap});
        select.setValue(Object.keys(images)[defaultValue], true);
    var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}});
        mapToChange.add(controlPanel); }
 // Create a SplitPanel
    var splitPanel = ui.SplitPanel({
      firstPanel: leftMap,
      secondPanel: rightMap,
      wipe: true,
      style: {stretch: 'both'} });
      ui.root.widgets().reset([splitPanel]);
      ui.root.widgets().add(toolPanel);
 // SplitPanel Legend
      toolPanel.add(legendPanel);
      legendPanel.add(legendTitle);
        for (var i = 0; i < 4; i++) {
      legendPanel.add(makeRow(palette[i], names[i])); }  
        toolPanel.add(ui.Label('MANGROVE EXTENT DYNAMIC', {'fontWeight': 'bold','font-size': '16px'}));
        toolPanel.add(chart_area_mangrove);
        toolPanel.add(chart_per_change);
 // Link the Left and Right Map
      var linker = ui.Map.Linker([leftMap, rightMap]);